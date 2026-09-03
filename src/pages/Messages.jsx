import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { FaBars, FaPaperPlane, FaPlus, FaTimes, FaUsers } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import LeftNavBar from "../components/LeftNavBar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {
  SOCKET_URL,
  createDirectRoom,
  getRoomMessages,
  getUsers,
  seedMockUsers
} from "../api/messagesApi.js";

const formatMessageTime = (createdAt) => { //formats Firestore-style timestamps
  const millis = createdAt?._seconds ? createdAt._seconds * 1000 : null;

  if (!millis) return "";

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(millis));
};

const Messages = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState([]); //all available users
  const [currentUserId, setCurrentUserId] = useState(""); //the user currently pretending to be logged in
  const [selectedUserId, setSelectedUserId] = useState(""); //the person being chatted with
  const [activeRoom, setActiveRoom] = useState(null); //the chat room between the two users
  const [messages, setMessages] = useState([]); //messages in the currently selected room
  const [draft, setDraft] = useState(""); //text currently typed into the input
  const [error, setError] = useState(""); //error messages
  const [isLoadingUsers, setIsLoadingUsers] = useState(true); //indicates whether the list of users is still being loaded
  const [isLoadingMessages, setIsLoadingMessages] = useState(false); //indicates whether the messages for the selected room are still being loaded
  const [socketStatus, setSocketStatus] = useState("offline"); //indicates whether the socket is connected or disconnected
  const socketRef = useRef(null); //a ref to the socket instance, so it can be accessed in event handlers without needing to be in the dependency array of useEffect
  const activeRoomIdRef = useRef(""); //a ref to the active room ID, so it can be accessed in the socket event handler without needing to be in the dependency array of useEffect
  const bottomRef = useRef(null); //a ref to the bottom of the messages list, so it can be scrolled into view when new messages arrive
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false); //indicates whether the other user is currently typing

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 1023px)"
  });

  const currentUser = users.find((user) => user.id === currentUserId); //the user currently logged in
  const selectedUser = users.find((user) => user.id === selectedUserId); //the person being chatted with

  const availableUsers = useMemo( //filters out the current user from the list of available users
    () => users.filter((user) => user.id !== currentUserId),
    [currentUserId, users]
  );

  useEffect(() => {
    let isMounted = true; //a flag to prevent state updates on unmounted components

    const loadInitialUsers = async () => { //loads the list of users when the component mounts
      try {
        const loadedUsers = await getUsers(); //fetches the list of users from the API

        if (!isMounted) return; //prevents state updates if the component has unmounted before the API call completes

        setUsers(loadedUsers); //sets the list of users in state

        if (loadedUsers.length) { //if there are any users, sets the first user as the current user
          setCurrentUserId(loadedUsers[0].id);
        }
      } catch (loadError) {
        if (isMounted) { //prevents state updates if the component has unmounted before the API call completes
          setError(loadError.message); //sets the error message in state if the API call fails
        }
      } finally {
        if (isMounted) { //prevents state updates if the component has unmounted before the API call completes
          setIsLoadingUsers(false); //indicates that the list of users has finished loading, regardless of whether it was successful or not
        }
      }
    };

    loadInitialUsers(); //calls the function to load the initial list of users

    return () => {
      isMounted = false; //sets the flag to false when the component unmounts, so that state updates are not attempted on an unmounted component
    };
  }, []);

  useEffect(() => {
    if (!currentUserId) return undefined; //if there is no current user, the socket connection is not established

    socketRef.current?.disconnect(); //disconnects the previous socket connection if it exists, to prevent multiple connections from being open at the same time

    const socket = io(SOCKET_URL, { //creates a new socket connection
      auth: { userId: currentUserId }
    });

    socketRef.current = socket; //stores the socket instance in a ref, so it can be accessed in event handlers without needing to be in the dependency array of useEffect

    socket.on("connect", () => { //sets the socket status to online when the connection is established
      setSocketStatus("online");
      setError("");
    });

    socket.on("disconnect", () => { //sets the socket status to offline when the connection is lost
      setError("Disconnected from server");
      setSocketStatus("offline");
    });

    socket.on("connect_error", (socketError) => { //sets the socket status to offline and displays the error message when there is a connection error
      setSocketStatus("offline");
      setError(socketError.message); 
    });

    socket.on("socket:error", (socketError) => { //sets the socket status to offline and displays the error message when there is a socket error
      setSocketStatus("offline");
      setError(socketError.message);
    });

    socket.on("message:new", (message) => { //adds the new message to the list of messages if it belongs to the active room and is not a duplicate
      setMessages((currentMessages) => {
        if (message.roomId !== activeRoomIdRef.current) {
          return currentMessages;
        }

        if (currentMessages.some((currentMessage) => currentMessage.id === message.id)) { //prevents duplicate messages from being added to the list of messages
          return currentMessages;
        }

        return [...currentMessages, message]; //adds the new message to the list of messages if it belongs to the active room and is not a duplicate
      });
    });

    socket.on("typing:update", ({ roomId, userId, isTyping }) => { //updates the typing indicator if the other user is typing in the active room
      if (roomId === activeRoomIdRef.current && userId !== currentUserId) {
        setIsOtherUserTyping(isTyping);
      }
    });

    socket.on("message:read",({ roomId, messageId, userId, message }) => {
        if (
          roomId === activeRoomIdRef.current &&
          userId !== currentUserId
        ) {
          setMessages((currentMessages) =>
            currentMessages.map((currentMessage) =>
              currentMessage.id === messageId
                ? { ...currentMessage, ...message }
                : currentMessage
            )
          );
        }
      }
    );

    return () => {
      socket.disconnect(); //disconnects the socket connection when the component unmounts or when the current user changes, to prevent multiple connections from being open at the same time
    };
  }, [currentUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" }); //scrolls to the bottom of the messages list when new messages arrive
  }, [messages]);

  useEffect(() => { //marks all messages in the active room as read when the active room changes or when new messages arrive
  if (!activeRoom?.id || socketStatus !== "online") return;

  messages.forEach((message) => {
    const alreadyRead = message.readBy?.includes(currentUserId);

    if (message.senderId !== currentUserId && !alreadyRead) {
      socketRef.current?.emit("message:read", {
        roomId: activeRoom.id,
        messageId: message.id
      });
    }
  });
}, [messages, activeRoom?.id, currentUserId, socketStatus]);

  const handleSeedUsers = async () => { //seeds the database with mock users when the "Seed Users" button is clicked
    setError("");

    try {
      const seededUsers = await seedMockUsers(); //calls the API to seed the database with mock users
      setUsers(seededUsers);

      if (!currentUserId && seededUsers.length) { //if there is no current user and there are seeded users, sets the first seeded user as the current user
        setCurrentUserId(seededUsers[0].id);
      }
    } catch (seedError) {
      setError(seedError.message);
    }
  };

  const handleSelectUser = async (userId) => {
    if (!currentUserId || userId === currentUserId) return; //prevents selecting the current user or a user when there is no current user

    setSelectedUserId(userId); //sets the selected user ID in state
    // setActiveRoom(null); //clears the active room when a new user is selected
    // activeRoomIdRef.current = ""; //clears the active room ID ref when a new user is selected
    setMessages([]); //clears the list of messages when a new user is selected
    setIsLoadingMessages(true); //indicates that the messages for the selected room are still being loaded
    setError(""); //clears any previous error messages

    try {
      if (activeRoom?.id) { //if there is an active room, leaves the room before joining a new one
        socketRef.current?.emit("room:leave", { roomId: activeRoom.id }); //emits a "room:leave" event to the server to leave the current room
      }

      const room = await createDirectRoom([currentUserId, userId]); //calls the API to create a direct room between the current user and the selected user
      setActiveRoom(room); //sets the active room in state
      activeRoomIdRef.current = room.id; //sets the active room ID ref to the new room ID, so it can be accessed in the socket event handler without needing to be in the dependency array of useEffect
      socketRef.current?.emit("room:join", { roomId: room.id }); //emits a "room:join" event to the server to join the new room

      const roomMessages = await getRoomMessages(room.id, currentUserId); //calls the API to get the messages for the new room
      setMessages(roomMessages); //sets the list of messages in state to the messages for the new room
    } catch (selectError) {
      setError(selectError.message);
    } finally {
      setIsLoadingMessages(false);
      setIsOtherUserTyping(false);
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault(); //

    if (!draft.trim() || !activeRoom || socketStatus !== "online") return; //prevents sending a message if the draft is empty, there is no active room, or the socket is not connected

    socketRef.current?.emit("message:send", {
      roomId: activeRoom.id, //emits a "message:send" event to the server to send the message
      text: draft.trim()
    });
    socketRef.current?.emit("typing:stop", {
      roomId: activeRoom.id
    });
    setDraft("");
  };

  const handleTyping = (event) => { 
    const value = event.target.value;
    setDraft(value);

    if (!activeRoom || socketStatus !== "online") return; //prevents sending a "typing:start" event if there is no active room or the socket is not connected
 
    if (value.trim()) {
      socketRef.current?.emit("typing:start", { roomId: activeRoom.id }); //emits a "typing:start" event to the server to indicate that the user is typing
    } else {
      socketRef.current?.emit("typing:stop", { roomId: activeRoom.id }); //emits a "typing:stop" event to the server to indicate that the user has stopped typing
    }
  };

  const handleTypingStop = () => {
    if (!activeRoom || socketStatus !== "online") return; //prevents sending a "typing:stop" event if there is no active room or the socket is not connected

    socketRef.current?.emit("typing:stop", { roomId: activeRoom.id });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F5F8]">
      <div className="hidden lg:block">
        <LeftNavBar />
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex h-full w-full max-w-277.75 flex-col px-4">
          {isSmallScreen && (
            <div className="flex justify-start mt-4">
              <button
                type="button"
                className="text-2xl"
                onClick={() => setIsMenuOpen((current) => !current)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          )}

          <SearchBar />

          <section className="mb-6 flex min-h-0 flex-1 flex-col gap-4 text-left">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="m-0 text-[28px] font-[var(--font-menu)] text-[#08060d]">
                  Messages
                </h1>
                <p className="text-sm text-[#747474]">
                  {currentUser ? `Signed in as ${currentUser.displayName}` : "No user selected"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  className="h-10 rounded-lg border border-[#E7E6EB] bg-white px-3 text-sm text-[#08060d]"
                  value={currentUserId}
                  onChange={(event) => {
                    setCurrentUserId(event.target.value);
                    setSelectedUserId("");
                    setActiveRoom(null);
                    activeRoomIdRef.current = "";
                    setMessages([]);
                    setSocketStatus("connecting");
                  }}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.displayName}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#916EE8] px-4 text-sm font-medium text-white"
                  onClick={() => window.alert("Group messaging will be added after 1-to-1 chat is stable.")}
                >
                  <FaPlus className="text-xs" />
                  Create Group
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-2xl bg-white lg:grid-cols-[310px_1fr]">
              <aside className="min-h-[220px] border-b border-[#E7E6EB] lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between border-b border-[#E7E6EB] px-4 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#08060d]">
                    <FaUsers className="text-[#916EE8]" />
                    People
                  </div>

                  <button
                    type="button"
                    className="rounded-lg border border-[#E7E6EB] px-3 py-2 text-xs font-medium text-[#08060d]"
                    onClick={handleSeedUsers}
                  >
                    Seed Users
                  </button>
                </div>

                <div className="max-h-[280px] overflow-y-auto lg:max-h-none">
                  {isLoadingUsers && <p className="px-4 py-4 text-sm text-[#747474]">Loading users...</p>}

                  {!isLoadingUsers &&
                    availableUsers.map((user) => {
                      const isSelected = user.id === selectedUserId;

                      return (
                        <button
                          key={user.id}
                          type="button"
                          className={`flex w-full items-center gap-3 border-b border-[#F0EFF3] px-4 py-3 text-left ${
                            isSelected ? "bg-[#F6F2FF]" : "bg-white"
                          }`}
                          onClick={() => handleSelectUser(user.id)}
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7E6EB] text-sm font-semibold text-[#08060d]">
                            {user.displayName?.charAt(0) || "U"}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-[#08060d]">
                              {user.displayName}
                            </span>
                            <span className="block truncate text-xs text-[#747474]">{user.email}</span>
                          </span>

                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              user.status === "online" ? "bg-[#00C61F]" : "bg-[#A1A3AB]"
                            }`}
                          />
                        </button>
                      );
                    })}

                  {!isLoadingUsers && !availableUsers.length && (
                    <p className="px-4 py-4 text-sm text-[#747474]">Seed users to start a chat.</p>
                  )}
                </div>
              </aside>

              <div className="flex min-h-[520px] min-w-0 flex-col">
                <header className="flex min-h-18 items-center justify-between border-b border-[#E7E6EB] px-5 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-[#08060d]">
                      {selectedUser ? selectedUser.displayName : "Select a person"}
                    </p>
                    <p className="text-xs text-[#747474]">Socket: {socketStatus}</p>
                  </div>
                </header>

                <div className="flex-1 overflow-y-auto bg-[#FBFAFD] px-5 py-5">
                  {!selectedUser && (
                    <div className="flex h-full items-center justify-center text-center text-sm text-[#747474]">
                      Choose a user from the list to start a 1-to-1 conversation.
                    </div>
                  )}

                  {selectedUser && isLoadingMessages && (
                    <p className="text-sm text-[#747474]">Loading messages...</p>
                  )}

                  {selectedUser && !isLoadingMessages && (
                    <div className="flex flex-col gap-3">
                      {messages.map((message) => {
                        const isMine = message.senderId === currentUserId;

                        return (
                          <div
                            key={message.id}
                            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                                isMine
                                  ? "bg-[#916EE8] text-white"
                                  : "border border-[#E7E6EB] bg-white text-[#08060d]"
                              }`}
                            >
                              <p className="break-words text-sm">{message.text}</p>

                              <div className="mt-1 flex items-center gap-2">
                                <p
                                  className={`text-[11px] ${
                                    isMine ? "text-white/75" : "text-[#747474]"
                                  }`}
                                >
                                  {formatMessageTime(message.createdAt)}
                                </p>

                                {isMine && (
                                  <span className="text-[11px] text-white/75">
                                    {message.readBy?.includes(selectedUserId) ? "Read" : "Sent"}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <div ref={bottomRef} />
                    </div>
                  )}
                </div>
                  {isOtherUserTyping && (
                    <p className="text-xs text-[#747474]">
                      {selectedUser?.displayName} is typing...
                    </p>
                  )}
                <form className="flex items-center gap-3 border-t border-[#E7E6EB] bg-white p-4" onSubmit={handleSendMessage}>
                  <input
                    className="h-11 min-w-0 flex-1 rounded-lg border border-[#E7E6EB] px-4 text-sm text-[#08060d] outline-none focus:border-[#916EE8]"
                    value={draft}
                    onChange={(event) => { handleTyping(event); }}       
                    onBlur={() => {handleTypingStop(); }} //sends a "typing:stop" event when the input loses focus
                    placeholder={selectedUser ? "Write a message" : "Select a user first"}
                    disabled={!selectedUser || socketStatus !== "online"}
                  />

                  <button
                    type="submit"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#916EE8] text-white disabled:cursor-not-allowed disabled:bg-[#C9C1DD]"
                    disabled={!draft.trim() || !selectedUser || socketStatus !== "online"}
                    aria-label="Send message"
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Messages;
