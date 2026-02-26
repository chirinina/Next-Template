"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, ArrowLeft } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
  time: string;
}

interface Conversation {
  id: number;
  userName: string;
  userAvatar: string;
  online: boolean;
  messages: Message[];
}

export default function SupportChatPage() {
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const [conversations, setConversations] = useState<Conversation[]>(
    Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      userName: [
        "Carlos Méndez",
        "María López",
        "Andrés Gómez",
        "Lucía Fernández",
        "Sofía Herrera",
        "Miguel Torres",
        "Camila Ruiz",
        "David Rojas",
        "Valentina Castro",
        "Javier Morales",
      ][i],
      userAvatar: `https://i.pravatar.cc/150?img=${i + 10}`,
      online: Math.random() > 0.5,
      messages: [
        {
          id: 1,
          text: "Hola, necesito ayuda con mi cuenta.",
          sender: "user",
          time: "09:45",
        },
      ],
    }))
  );

  const [activeConversationId, setActiveConversationId] = useState(1);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  const handleSend = () => {
    if (!message.trim() || !activeConversation) return;

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: "support",
      time: now,
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      )
    );

    setMessage("");

    setTimeout(() => {
      const autoReply: Message = {
        id: Date.now() + 1,
        text: "Gracias por tu mensaje. Nuestro equipo está revisando tu caso.",
        sender: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, autoReply] }
            : conv
        )
      );
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  return (
    <div className="h-[calc(100vh-80px)] w-full flex rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`${
          showMobileChat ? "hidden" : "flex"
        } md:flex w-full md:w-[360px] border-r border-gray-200 dark:border-gray-800 flex-col bg-white dark:bg-gray-900`}
      >
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Bandeja de Entrada
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Conversaciones activas
          </p>
        </div>

        <div className="flex-1 overflow-y-auto chat-scroll">
          {conversations.map((conv) => {
            const lastMessage = conv.messages[conv.messages.length - 1];

            return (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConversationId(conv.id);
                  setShowMobileChat(true);
                }}
                className={`flex gap-4 px-6 py-4 cursor-pointer transition-all border-l-4 ${
                  activeConversationId === conv.id
                    ? "bg-gray-50 dark:bg-gray-800 border-primary"
                    : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.userAvatar}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm text-gray-800 dark:text-white truncate">
                      {conv.userName}
                    </p>
                    <span className="text-xs text-gray-400">
                      {lastMessage?.time}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 truncate mt-1">
                    {lastMessage?.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHAT AREA */}
      <div
        className={`${
          showMobileChat ? "flex" : "hidden"
        } md:flex flex-1 flex-col bg-gray-50 dark:bg-gray-950`}
      >
        {activeConversation && (
          <>
            {/* HEADER */}
            <div className="px-4 md:px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileChat(false)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeft size={18} />
                </button>

                <img
                  src={activeConversation.userAvatar}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {activeConversation.userName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activeConversation.online
                      ? "En línea"
                      : "Desconectado"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowProfile(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <User size={18} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* MENSAJES */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-5 chat-scroll">
              {activeConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "support"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-md px-4 md:px-5 py-3 rounded-xl text-sm shadow-sm ${
                      msg.sender === "support"
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block mt-2 text-[11px] opacity-60 text-right">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* INPUT */}
            <div className="px-4 md:px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Escribe una respuesta..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />

                <button
                  onClick={handleSend}
                  className="px-4 md:px-5 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
                >
                  <Send size={16} />
                  <span className="hidden sm:inline">Enviar</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* PROFILE PANEL DESKTOP */}
      {showProfile && activeConversation && (
        <div className="hidden lg:flex w-[300px] border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex-col p-6">
          <div className="text-center">
            <img
              src={activeConversation.userAvatar}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {activeConversation.userName}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {activeConversation.online
                ? "Usuario en línea"
                : "Usuario desconectado"}
            </p>
          </div>

          <button
            onClick={() => setShowProfile(false)}
            className="mt-auto w-full py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            Cerrar perfil
          </button>
        </div>
      )}
    </div>
  );
}