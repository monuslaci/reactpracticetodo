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

const formatMessageTime = (createdAt) => {
  const millis = createdAt?._seconds ? createdAt._seconds * 1000 : null;

  if (!millis) return "";

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(millis));
};

const Messages = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [socketStatus, setSocketStatus] = useState("offline");
  const socketRef = useRef(null);
  const activeRoomIdRef = useRef("");
  const bottomRef = useRef(null);

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 1023px)"
  });

  const currentUser = users.find((user) => user.id === currentUserId);
  const selectedUser = users.find((user) => user.id === selectedUserId);

  const availableUsers = useMemo(
    () => users.filter((user) => user.id !== currentUserId),
    [currentUserId, users]
  );

  useEffect(() => {
    let isMounted = true;

    const loadInitialUsers = async () => {
      try {
        const loadedUsers = await getUsers();

        if (!isMounted) return;

        setUsers(loadedUsers);

        if (loadedUsers.length) {
          setCurrentUserId(loadedUsers[0].id);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      } finally {
        if (isMounted) {
          setIsLoadingUsers(false);
        }
      }
    };

    loadInitialUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!currentUserId) return undefined;

    socketRef.current?.disconnect();

    const socket = io(SOCKET_URL, {
      auth: { userId: currentUserId }
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketStatus("online");
      setError("");
    });

    socket.on("disconnect", () => {
      setSocketStatus("offline");
    });

    socket.on("connect_error", (socketError) => {
      setSocketStatus("offline");
      setError(socketError.message);
    });

    socket.on("socket:error", (socketError) => {
      setError(socketError.message);
    });

    socket.on("message:new", (message) => {
      setMessages((currentMessages) => {
        if (message.roomId !== activeRoomIdRef.current) {
          return currentMessages;
        }

        if (currentMessages.some((currentMessage) => currentMessage.id === message.id)) {
          return currentMessages;
        }

        return [...currentMessages, message];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSeedUsers = async () => {
    setError("");

    try {
      const seededUsers = await seedMockUsers();
      setUsers(seededUsers);

      if (!currentUserId && seededUsers.length) {
        setCurrentUserId(seededUsers[0].id);
      }
    } catch (seedError) {
      setError(seedError.message);
    }
  };

  const handleSelectUser = async (userId) => {
    if (!currentUserId || userId === currentUserId) return;

    setSelectedUserId(userId);
    setMessages([]);
    setIsLoadingMessages(true);
    setError("");

    try {
      if (activeRoom?.id) {
        socketRef.current?.emit("room:leave", { roomId: activeRoom.id });
      }

      const room = await createDirectRoom([currentUserId, userId]);
      setActiveRoom(room);
      activeRoomIdRef.current = room.id;
      socketRef.current?.emit("room:join", { roomId: room.id });

      const roomMessages = await getRoomMessages(room.id, currentUserId);
      setMessages(roomMessages);
    } catch (selectError) {
      setError(selectError.message);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (!draft.trim() || !activeRoom || socketStatus !== "online") return;

    socketRef.current?.emit("message:send", {
      roomId: activeRoom.id,
      text: draft.trim()
    });
    setDraft("");
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
                              <p className={`mt-1 text-[11px] ${isMine ? "text-white/75" : "text-[#747474]"}`}>
                                {formatMessageTime(message.createdAt)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={bottomRef} />
                    </div>
                  )}
                </div>

                <form className="flex items-center gap-3 border-t border-[#E7E6EB] bg-white p-4" onSubmit={handleSendMessage}>
                  <input
                    className="h-11 min-w-0 flex-1 rounded-lg border border-[#E7E6EB] px-4 text-sm text-[#08060d] outline-none focus:border-[#916EE8]"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
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
