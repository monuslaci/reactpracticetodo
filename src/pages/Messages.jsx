import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { FaBars, FaPaperPlane, FaPlus, FaTimes, FaUsers } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import LeftNavBar from "../components/LeftNavBar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {
  SOCKET_URL,
  createDirectRoom,
  createGroupRoom,
  getRoomMessages,
  getUsers,
  seedMockUsers,
  getRooms
} from "../api/messagesApi.js";
import Select from "react-select";

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
  const isTypingRef = useRef(false);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false); //indicates whether the other user is currently typing
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false); //indicates whether the modal for creating a group chat is open
  const [groupName, setGroupName] = useState(""); //the name of the group chat being created
  const [selectedGroupUserIds, setSelectedGroupUserIds] = useState([]); //the IDs of the users selected to be in the group chat being created
  const [rooms, setRooms] = useState([]);

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 1023px)"
  });

  const currentUser = users.find((user) => user.id === currentUserId); //the user currently logged in
  const selectedUser = users.find((user) => user.id === selectedUserId); //the person being chatted with

  const availableUsers = useMemo( //filters out the current user from the list of available users
    () => users.filter((user) => user.id !== currentUserId),
    [currentUserId, users]
  );

  const groupUserOptions = useMemo(
  () =>
      users.map((user) => ({
        value: user.id,
        label: user.displayName
      })),
    [users]
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

    socket.on("message:new", (message) => {
      setMessages((currentMessages) => {
        if (message.roomId !== activeRoomIdRef.current) {
          return currentMessages;
        }

        if (
          currentMessages.some(
            (currentMessage) => currentMessage.id === message.id
          )
        ) {
          return currentMessages;
        }

        return [...currentMessages, message];
      });

      setRooms((currentRooms) =>
        currentRooms.map((room) => {
          if (room.id !== message.roomId) {
            return room;
          }

          const isActiveRoom =
            message.roomId === activeRoomIdRef.current;

          return {
            ...room,
            lastMessage: message,
            unreadCount:
              message.senderId === currentUserId || isActiveRoom
                ? 0
                : (room.unreadCount || 0) + 1
          };
        })
      );
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

    useEffect(() => { //loads the list of rooms when the current user changes
      if (!currentUserId) return;

      const loadRooms = async () => {
        const loadedRooms = await getRooms(currentUserId);
        setRooms(loadedRooms);
      };

      loadRooms();
    }, [currentUserId]);

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
      setRooms((currentRooms) => [ //adds the new room to the list of rooms in state, and removes any previous room with the same ID to prevent duplicates
        room,
        ...currentRooms.filter(
          (currentRoom) => currentRoom.id !== room.id
        )
      ]);
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

  const handleTyping = (event) => { //handles typing in the message input field, and emits "typing:start" and "typing:stop" events to the server when the user starts and stops typing
    const value = event.target.value;

    setDraft(value);

    if (!activeRoom || socketStatus !== "online") return;

    if (value.trim() && !isTypingRef.current) { //if the user starts typing and is not already marked as typing, emits a "typing:start" event to the server
      socketRef.current?.emit("typing:start", {
        roomId: activeRoom.id
      });

      isTypingRef.current = true;
    }

    if (!value.trim() && isTypingRef.current) { //if the user stops typing and is currently marked as typing, emits a "typing:stop" event to the server
      socketRef.current?.emit("typing:stop", {
        roomId: activeRoom.id
      });

      isTypingRef.current = false;
    }
  };
  const handleTypingStop = () => {
    if (
      activeRoom &&
      socketStatus === "online" && 
      isTypingRef.current
    ) {
      socketRef.current.emit("typing:stop", { //emits a "typing:stop" event to the server when the user stops typing
        roomId: activeRoom.id
      });

      isTypingRef.current = false;
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || !selectedGroupUserIds.length) {
      setError("Enter a group name and select at least one user.");
      return;
    }

    try {
      setError("");

      const room = await createGroupRoom({ //calls the API to create a new group room with the specified name and participants
        name: groupName.trim(),
        participantIds: [
          currentUserId,
          ...selectedGroupUserIds
        ],
        createdBy: currentUserId
      });

      setRooms((currentRooms) => [ //sets the list of rooms in state to include the new group room, and removes any previous room with the same ID to prevent duplicates
        room,
        ...currentRooms.filter(
          (currentRoom) => currentRoom.id !== room.id
        )
      ]);

      setActiveRoom(room);
      activeRoomIdRef.current = room.id;
      setSelectedUserId("");
      setMessages([]);

      socketRef.current?.emit("room:join", { //emits a "room:join" event to the server to join the new group room
        roomId: room.id
      });

      const roomMessages = await getRoomMessages(
        room.id,
        currentUserId
      );

      setMessages(roomMessages); //sets the list of messages in state to the messages for the new group room

      setGroupName("");
      setSelectedGroupUserIds([]);
      setIsGroupModalOpen(false);
    } catch (createError) {
      setError(createError.message);
    }
  };

  const getRoomTitle = (room) => {  //returns the title of the room, which is either the group name or the display name of the other user in a direct chat
    if (room.type === "group") {
      return room.name;
    }

    const otherUser = users.find( //finds the other user in a direct chat by filtering out the current user from the list of participants
      (user) =>
        room.participantIds?.includes(user.id) &&
        user.id !== currentUserId
    );

    return otherUser?.displayName || "Direct chat";
  };



  const handleSelectRoom = async (room) => { //handles selecting a room from the list of rooms, and loads the messages for that room
    if (!room?.id || !currentUserId) return;

    if (activeRoom?.id && activeRoom.id !== room.id) {
      socketRef.current?.emit("room:leave", {
        roomId: activeRoom.id
      });
    }

    setActiveRoom(room);
    activeRoomIdRef.current = room.id;
    setMessages([]);
    setIsLoadingMessages(true);
    setIsOtherUserTyping(false);
    setError("");

    setRooms((currentRooms) => //updates the list of rooms in state to set the unread count for the selected room to 0
      currentRooms.map((currentRoom) =>
        currentRoom.id === room.id
          ? { ...currentRoom, unreadCount: 0 }
          : currentRoom
      )
    );

    if (room.type === "direct") { //if the selected room is a direct chat, finds the other user in the chat and sets the selected user ID in state
      const otherUserId = room.participantIds?.find(
        (participantId) => participantId !== currentUserId
      );

      setSelectedUserId(otherUserId || "");
    } else {
      setSelectedUserId("");
    }

    try {
      socketRef.current?.emit("room:join", {
        roomId: room.id
      });

      const roomMessages = await getRoomMessages(
        room.id,
        currentUserId
      );

      setMessages(roomMessages);
    } catch (selectError) {
      setError(selectError.message);
    } finally {
      setIsLoadingMessages(false);
    }
  };


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
                    onClick={() => setIsGroupModalOpen(true)}
                    >
                  <FaPlus className="text-xs" />
                  Create Group
                </button>
                {isGroupModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Create group</h2>

                        <button
                          type="button"
                          onClick={() => setIsGroupModalOpen(false)}
                          className="text-xl text-gray-500"
                        >
                          <FaTimes />
                        </button>
                      </div>

                      <input
                        className="mb-4 h-10 w-full rounded-lg border px-3 text-sm"
                        value={groupName}
                        onChange={(event) => setGroupName(event.target.value)}
                        placeholder="Group name"
                      />

                      <div className="mb-5">
                        <Select
                          isMulti
                          options={groupUserOptions}
                          value={groupUserOptions.filter((option) =>
                            selectedGroupUserIds.includes(option.value)
                          )}
                          onChange={(selectedOptions) => {
                            setSelectedGroupUserIds(
                              (selectedOptions ?? []).map((option) => option.value)
                            );
                          }}
                          isLoading={isLoadingUsers}
                          closeMenuOnSelect={false}
                          placeholder="Select group members..."
                          noOptionsMessage={() => "No users found"}
                          menuPortalTarget={document.body}
                          menuPosition="fixed"
                          styles={{
                            menuPortal: (base) => ({
                              ...base,
                              zIndex: 9999
                            })
                          }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleCreateGroup}
                        className="w-full rounded-lg bg-[#916EE8] px-4 py-2 text-sm text-white"
                      >
                        Create group
                      </button>
                    </div>
                  </div>
                )}
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
                    Chats
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
                      rooms.map((room) => {
                      const otherUser = users.find(
                        (user) =>
                          room.type === "direct" &&
                          room.participantIds?.includes(user.id) &&
                          user.id !== currentUserId
                      );

                      const title =
                        room.type === "group"
                          ? room.name
                          : otherUser?.displayName || "Direct chat";

                      return (
                        <button
                          key={room.id}
                          type="button"
                          onClick={() => handleSelectRoom(room)}
                          className="flex w-full items-center gap-3 border-b px-4 py-3 text-left"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7E6EB]">
                            {title.charAt(0)}
                          </span>

                          <span>
                            <span className="block text-sm font-semibold">
                              {title}
                            </span>

                            <span className="block text-xs text-[#747474]">
                              {room.lastMessage?.text || "No messages yet"}
                            </span>
                            {room.unreadCount > 0 && (
                              <span className="rounded-full bg-[#916EE8] px-2 py-1 text-xs text-white">
                                {room.unreadCount}
                              </span>
                            )}
                          </span>
                        </button>
                      );
                    })}

                  {!isLoadingUsers && !rooms.length && (
                    <p className="px-4 py-4 text-sm text-[#747474]">Seed users to start a chat.</p>
                  )}
                </div>
              </aside>

              <div className="flex min-h-[520px] min-w-0 flex-col">
                <header className="flex min-h-18 items-center justify-between border-b border-[#E7E6EB] px-5 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-[#08060d]">
                      {activeRoom?.type === "group"
                      ? activeRoom.name
                      : selectedUser?.displayName || "Select a person"}
                    </p>
                    <p className="text-xs text-[#747474]">Socket: {socketStatus}</p>
                  </div>
                </header>

                <div className="flex-1 overflow-y-auto bg-[#FBFAFD] px-5 py-5">
                  {!activeRoom && (
                    <div className="flex h-full items-center justify-center text-center text-sm text-[#747474]">
                      Choose a user from the list to start a 1-to-1 conversation.
                    </div>
                  )}

                  {activeRoom && isLoadingMessages && (
                    <p className="text-sm text-[#747474]">Loading messages...</p>
                  )}

                  {activeRoom && !isLoadingMessages && (
                    <div className="flex flex-col gap-3">
                      {messages.map((message) => {
                        const isMine = message.senderId === currentUserId;
                        const otherParticipantIds =
                        activeRoom?.participantIds?.filter(
                          (participantId) => participantId !== currentUserId
                        ) || [];

                        const isRead = activeRoom?.type === "group"
                          ? otherParticipantIds.length > 0 &&
                            otherParticipantIds.every((participantId) =>
                              message.readBy?.includes(participantId)
                            )
                          : message.readBy?.includes(selectedUserId);

                          const sender = users.find(
                            (user) => user.id === message.senderId
                          );

                          const senderName =
                            message.senderId === currentUserId
                              ? "You"
                              : sender?.displayName || "Unknown user";


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
                              {activeRoom?.type === "group" && (
                                <p className={`mb-1 text-xs font-semibold ${isMine ? "text-white" : "text-[#916EE8]"}`}>
                                  {senderName}
                                </p>
                              )}
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
                                    {isRead ? "Read" : "Sent"}
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
                      {activeRoom?.type === "group"
                        ? "Someone is typing..."
                        : `${selectedUser?.displayName} is typing...`}
                    </p>
                  )}
                <form className="flex items-center gap-3 border-t border-[#E7E6EB] bg-white p-4" onSubmit={handleSendMessage}>
                  <input
                    className="h-11 min-w-0 flex-1 rounded-lg border border-[#E7E6EB] px-4 text-sm text-[#08060d] outline-none focus:border-[#916EE8]"
                    value={draft}
                    onChange={(event) => { handleTyping(event); }}       
                    onBlur={() => {handleTypingStop(); }} //sends a "typing:stop" event when the input loses focus
                    placeholder={activeRoom ? "Write a message" : "Select a user first"}
                    disabled={!activeRoom || socketStatus !== "online"}
                  />

                  <button
                    type="submit"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#916EE8] text-white disabled:cursor-not-allowed disabled:bg-[#C9C1DD]"
                    disabled={!draft.trim() || !activeRoom || socketStatus !== "online"}
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
