"use client";
import { useState } from "react";
import { MoreVertical, Trash2, Plus } from "lucide-react";

interface ImageItem {
  id: number;
  prompt: string;
  url: string;
}

const ImagenGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const IMAGES_LIMIT = 3;

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const newImage: ImageItem = {
        id: Date.now(),
        prompt,
        url: `https://picsum.photos/seed/${Date.now()}/800/400`,
      };

      setImages((prev) => [newImage, ...prev]);
      setPrompt("");
      setLoading(false);
    }, 1500);
  };

  const handleDelete = (id: number) => {
    setImages(images.filter((img) => img.id !== id));
    setActiveMenu(null);
  };

  return (
<div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[60vh] max-h-[90vh] w-full">
      {/* MAIN IMAGE AREA */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 overflow-hidden">

        <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
          {images.length === 0 && (
            <div className="flex h-full items-center justify-center text-gray-500">
              Describe algo para generar una imagen profesional
            </div>
          )}

          {(expanded ? images : images.slice(0, IMAGES_LIMIT)).map((img) => (
            <div key={img.id} className="relative rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md">
              <img
                src={img.url}
                alt={img.prompt}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black/50 p-2 text-white text-sm">
                {img.prompt}
              </div>
            </div>
          ))}

          {images.length > IMAGES_LIMIT && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline self-start mt-2"
            >
              {expanded ? "Ver menos" : "Ver más"}
            </button>
          )}

          {loading && (
            <div className="text-gray-400 text-sm mt-2">Generando imagen...</div>
          )}
        </div>

        {/* INPUT */}
        <div className="mt-4 border-t pt-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Describe la imagen..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
            />
            <button
              onClick={handleGenerate}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              {loading ? "Generando..." : "Generar Imagen"}
            </button>
          </div>
        </div>
      </div>

      {/* SIDEBAR HISTORIAL */}
      <div className="hidden lg:flex w-[300px] flex-col p-5 gap-3 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-y-auto">
        <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-2">Historial de Imágenes</h3>
        <div className="space-y-2">
          {images.map((img) => (
            <div key={img.id} className="relative flex items-center justify-between rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm cursor-pointer hover:shadow-md">
              <span className="truncate text-sm text-gray-700 dark:text-gray-200">{img.prompt}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === img.id ? null : img.id);
                }}
                className="text-gray-400 hover:text-white"
              >
                <MoreVertical size={16} />
              </button>

              {activeMenu === img.id && (
                <div className="absolute right-0 top-8 z-10 w-28 rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700"
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

export default ImagenGenerator;