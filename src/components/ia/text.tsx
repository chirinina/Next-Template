"use client";
import { useState } from "react";
import { MoreVertical, Edit2, Trash2, Plus } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

const TextGenerator = () => {
  const [textPrompt, setTextPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const [chats, setChats] = useState<Chat[]>([
    { id: 1, title: "New Chat", messages: [] },
  ]);
  const [activeChatId, setActiveChatId] = useState<number>(1);

  const [showAllChats, setShowAllChats] = useState(false);
  const MAX_VISIBLE_CHATS = 10;

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const handleGenerate = () => {
    if (!textPrompt.trim() || !activeChat) return;

    const newMessage: Message = { id: Date.now(), type: "user", content: textPrompt };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              title: chat.messages.length === 0 ? textPrompt.slice(0, 30) : chat.title,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );

    setLoading(true);
    setTextPrompt("");

    // Simula respuesta AI
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: `Respuesta profesional generada automáticamente:\n\n"${newMessage.content}"`,
      };
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId ? { ...chat, messages: [...chat.messages, aiMessage] } : chat
        )
      );
      setLoading(false);
    }, 1200);
  };

  const handleNewChat = () => {
    const newChat: Chat = { id: Date.now(), title: "New Chat", messages: [] };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setTextPrompt("");
  };

  const handleDelete = (id: number) => {
    const filtered = chats.filter((chat) => chat.id !== id);
    setChats(filtered);
    if (id === activeChatId && filtered.length > 0) setActiveChatId(filtered[0].id);
    setActiveMenu(null);
  };

  const handleRename = (id: number) => {
    const newName = window.prompt("Enter new name:");
    if (!newName) return;
    setChats((prev) => prev.map((chat) => (chat.id === id ? { ...chat, title: newName } : chat)));
    setActiveMenu(null);
  };

  const visibleChats = showAllChats ? chats : chats.slice(0, MAX_VISIBLE_CHATS);

  return (
<div className="flex flex-col lg:flex-row flex-1 gap-6 min-h-[60vh] max-h-[90vh] w-full">
        {/* MAIN CHAT AREA */}
      <div className="flex flex-1 flex-col shadow-xl bg-white dark:bg-gray-900 rounded-2xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeChat?.messages.length === 0 && (
            <div className="flex h-full items-center justify-center text-gray-500">
              Ingresa tu texto para generar una respuesta profesional
            </div>
          )}

          {activeChat?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-lg rounded-xl p-4 shadow-md text-sm whitespace-pre-wrap ${
                  msg.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-400 text-sm">Generando respuesta...</div>
          )}
        </div>

        {/* INPUT */}
        <div className="border-t p-4 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
          <div className="flex items-center gap-3 px-4 py-3">
            <input
              type="text"
              placeholder="Escribe tu texto aquí..."
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
              className="flex-1 border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
            />
            <button
              onClick={handleGenerate}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              {loading ? "Generando..." : "Generar"}
            </button>
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="hidden w-[300px] flex-col p-5 lg:flex">
        <button
          onClick={handleNewChat}
          className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-2.5 text-sm font-medium shadow-md hover:opacity-90"
        >
          <Plus size={16} /> Nuevo Chat
        </button>

        <div className="space-y-3 overflow-y-auto text-sm">
          {visibleChats.map((chat) => (
            <div
              key={chat.id}
              className={`relative flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer ${
                chat.id === activeChatId ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => setActiveChatId(chat.id)}
            >
              <span className="truncate">{chat.title}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === chat.id ? null : chat.id);
                }}
                className="text-gray-400 hover:text-white"
              >
                <MoreVertical size={16} />
              </button>

              {activeMenu === chat.id && (
                <div className="absolute right-0 top-10 z-10 w-36 rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
                  <button
                    onClick={() => handleRename(chat.id)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                  >
                    <Edit2 size={14} /> Cambiar
                  </button>
                  <button
                    onClick={() => handleDelete(chat.id)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700"
                  >
                    <Trash2 size={14} /> Quitar
                  </button>
                </div>
              )}
            </div>
          ))}

          {chats.length > MAX_VISIBLE_CHATS && (
            <button
              onClick={() => setShowAllChats(!showAllChats)}
              className="w-full mt-2 text-center text-sm text-blue-500 hover:underline"
            >
              {showAllChats ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextGenerator;