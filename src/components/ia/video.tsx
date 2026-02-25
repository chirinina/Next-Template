"use client";
import { useState } from "react";
import { MoreVertical, Edit2, Trash2, Plus } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "video";
  content: string;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

const VideoGenerator = () => {
  const [videoPrompt, setVideoPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: "New Chat",
      messages: [],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState<number>(1);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const handleGenerate = () => {
    if (!videoPrompt.trim() || !activeChat) return;

    const newMessage: Message = {
      id: Date.now(),
      type: "user",
      content: videoPrompt,
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              title:
                chat.messages.length === 0
                  ? videoPrompt.slice(0, 30)
                  : chat.title,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );

    setLoading(true);
    setVideoPrompt("");

    setTimeout(() => {
      const videoMessage: Message = {
        id: Date.now() + 1,
        type: "video",
        content: "https://www.w3schools.com/html/mov_bbb.mp4",
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [...chat.messages, videoMessage],
              }
            : chat
        )
      );

      setLoading(false);
    }, 1500);
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setVideoPrompt("");
  };

  const handleDelete = (id: number) => {
    const filtered = chats.filter((chat) => chat.id !== id);
    setChats(filtered);
    if (id === activeChatId && filtered.length > 0) {
      setActiveChatId(filtered[0].id);
    }
    setActiveMenu(null);
  };

  const handleRename = (id: number) => {
    const newName = window.prompt("Enter new name:");
    if (!newName) return;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, title: newName } : chat
      )
    );

    setActiveMenu(null);
  };

  return (
    <div className="flex h-[calc(80vh-110px)] w-full gap-6">

      {/* MAIN CHAT AREA */}
      <div className="flex flex-1 flex-col  shadow-xl">

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {activeChat?.messages.length === 0 && (
            <div className="flex h-full items-center justify-center text-gray-500">
              ¿Que Video desea?
            </div>
          )}

          {activeChat?.messages.map((msg) =>
            msg.type === "user" ? (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-lg rounded-xl bg-primary px-4 py-3 text-sm text-white shadow-md">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex justify-start">
                <div className="w-full max-w-3xl   p-4 shadow-lg">
                  <video controls className="w-full rounded-xl">
                    <source src={msg.content} />
                  </video>
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="text-gray-400 text-sm">
              Generando video...
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3  px-4 py-3">
            <input
              type="text"
              placeholder="Ecribe la descripcion de tu video..."
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />
            <button
              onClick={handleGenerate}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              Generar
            </button>
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="hidden w-[300px] flex-col   p-5 lg:flex">

        <button
          onClick={handleNewChat}
          className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-2.5 text-sm font-medium shadow-md hover:opacity-90"        >
          <Plus size={16} />
          Nuevo Chat
        </button>

        <div className="space-y-3 overflow-y-auto text-sm">

          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`relative flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer ${
                chat.id === activeChatId
                  ? "bg-[#111827] text-white"
                  : "text-gray-400 hover:bg-[#111827"
              }`}
              onClick={() => setActiveChatId(chat.id)}
            >
              <span className="truncate">{chat.title}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(
                    activeMenu === chat.id ? null : chat.id
                  );
                }}
                className="text-gray-400 hover:text-white"
              >
                <MoreVertical size={16} />
              </button>

              {activeMenu === chat.id && (
                <div className="absolute right-0 top-10 z-10 w-36 rounded-lg border border-gray-700 bg-[#111827] shadow-lg">
                  <button
                    onClick={() => handleRename(chat.id)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-300 hover:bg-[#1F2937]"
                  >
                    <Edit2 size={14} /> Cambiar
                  </button>
                  <button
                    onClick={() => handleDelete(chat.id)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-400 hover:bg-[#1F2937]"
                  >
                    <Trash2 size={14} /> Quitar
                  </button>
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;