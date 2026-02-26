"use client";

import React, { useState } from "react";
import { 
  Save, Bot, Clock, Palette, ShieldCheck, Zap, 
  Code, MessageSquare, Globe, AtSign, Database, 
  ShieldAlert, Eye, Plus, Trash2, Copy, ExternalLink,
  Check, Menu, X
} from "lucide-react";

// --- TIPOS ---
type ConfigState = {
  aiEnabled: boolean;
  aiModel: string;
  aiTone: string;
  primaryColor: string;
  widgetPosition: "right" | "left";
  welcomeMessage: string;
  officeHours: { day: string; open: string; close: string; active: boolean }[];
  webhooks: { id: string; url: string; event: string }[];
  securityLevel: "standard" | "high" | "strict";
  allowedDomains: string[];
};

export default function SupportSettingsPage() {
  const [activeTab, setActiveTab] = useState("ai");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- ESTADO DE CONFIGURACIÓN ---
  const [config, setConfig] = useState<ConfigState>({
    aiEnabled: true,
    aiModel: "gpt-4-turbo",
    aiTone: "profesional y empático",
    primaryColor: "#2563eb",
    widgetPosition: "right",
    welcomeMessage: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
    officeHours: [
      { day: "Lunes", open: "09:00", close: "18:00", active: true },
      { day: "Martes", open: "09:00", close: "18:00", active: true },
      { day: "Miércoles", open: "09:00", close: "18:00", active: true },
      { day: "Jueves", open: "09:00", close: "18:00", active: true },
      { day: "Viernes", open: "09:00", close: "17:00", active: true },
      { day: "Sábado", open: "10:00", close: "14:00", active: false },
      { day: "Domingo", open: "00:00", close: "00:00", active: false },
    ],
    webhooks: [
      { id: "1", url: "https://api.slack.com/events/...", event: "Nuevo Mensaje" }
    ],
    securityLevel: "high",
    allowedDomains: ["tuempresa.com", "soporte.tuempresa.com"]
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  // Componente Auxiliar para los Toggles
  const Toggle = ({ enabled, onChange }: { enabled: boolean, onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  const menuItems = [
    { id: "ai", icon: Bot, label: "IA", fullLabel: "IA y Automatización", color: "text-purple-500" },
    { id: "design", icon: Palette, label: "Diseño", fullLabel: "Widget y Diseño", color: "text-pink-500" },
    { id: "hours", icon: Clock, label: "Horarios", fullLabel: "Horarios Laborales", color: "text-amber-500" },
    { id: "security", icon: ShieldCheck, label: "Seguridad", fullLabel: "Seguridad y Privacidad", color: "text-emerald-500" },
    { id: "webhooks", icon: Code, label: "API", fullLabel: "Integraciones API", color: "text-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 md:p-8 font-sans text-gray-900 dark:text-gray-100">
      
      {/* HEADER SUPERIOR RESPONSIVO */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        

          <div className="flex flex-wrap items-center gap-4">
            {showSuccess && (
              <span className="flex items-center gap-1 text-green-600 text-xs md:text-sm font-bold animate-pulse">
                <Check size={16} /> ¡Guardado!
              </span>
            )}
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95"
            >
              {isSaving ? <Zap className="animate-spin" size={18} /> : <Save size={18} />}
              {isSaving ? "Sincronizando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* NAVEGACIÓN LATERAL (Scrollable en móvil, Sticky en desktop) */}
        <nav className="lg:col-span-3 flex lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-2 no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap min-w-max lg:w-full ${
                activeTab === item.id 
                ? "bg-white dark:bg-gray-900 shadow-md border border-gray-100 dark:border-gray-800 text-blue-600" 
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800/50"
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? item.color : "text-gray-400"} />
              <span className="hidden sm:inline">{item.fullLabel}</span>
              <span className="sm:hidden">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* CONTENIDO CENTRAL */}
        <main className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            
            {/* SECCIÓN IA */}
            {activeTab === "ai" && (
              <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Motor de IA</h3>
                    <p className="text-sm text-gray-500">Configura la inteligencia de tu chat.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="pr-4">
                      <h4 className="font-bold text-sm md:text-base">Copilot para Agentes</h4>
                      <p className="text-xs text-gray-500">Sugiere respuestas en tiempo real.</p>
                    </div>
                    <Toggle enabled={config.aiEnabled} onChange={() => setConfig({...config, aiEnabled: !config.aiEnabled})} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Modelo</label>
                      <select 
                        value={config.aiModel}
                        onChange={(e) => setConfig({...config, aiModel: e.target.value})}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="gpt-4-turbo">GPT-4 Turbo</option>
                        <option value="claude-3-opus">Claude 3 Opus</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tono</label>
                      <input 
                        type="text"
                        value={config.aiTone}
                        onChange={(e) => setConfig({...config, aiTone: e.target.value})}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Instrucciones del Sistema</label>
                    <textarea 
                      rows={4}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Define límites y personalidad de la IA..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN DISEÑO */}
            {activeTab === "design" && (
              <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-2xl text-pink-600">
                    <Palette size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Identidad Visual</h3>
                    <p className="text-sm text-gray-500">Personaliza la interfaz del cliente.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Color de Marca</label>
                      <div className="flex gap-3">
                        <input 
                          type="color" 
                          value={config.primaryColor}
                          onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                          className="h-12 w-12 rounded-xl cursor-pointer bg-transparent border-none p-0" 
                        />
                        <input 
                          type="text" 
                          value={config.primaryColor}
                          className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Posición</label>
                      <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl">
                        <button 
                          onClick={() => setConfig({...config, widgetPosition: 'left'})}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${config.widgetPosition === 'left' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-gray-500'}`}
                        >Izquierda</button>
                        <button 
                          onClick={() => setConfig({...config, widgetPosition: 'right'})}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${config.widgetPosition === 'right' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-gray-500'}`}
                        >Derecha</button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Mensaje Inicial</label>
                    <textarea 
                      value={config.welcomeMessage}
                      onChange={(e) => setConfig({...config, welcomeMessage: e.target.value})}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm min-h-[140px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN HORARIOS */}
            {activeTab === "hours" && (
              <div className="p-6 md:p-8 space-y-6 animate-in fade-in duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl text-amber-600">
                      <Clock size={24} />
                    </div>
                    <h3 className="text-xl font-bold">Horario de Operaciones</h3>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/10 px-4 py-2 rounded-xl border border-amber-100 dark:border-amber-900/20">
                    <p className="text-[10px] font-bold text-amber-600 uppercase">Zona Horaria</p>
                    <p className="text-xs font-bold">GMT-05:00 (Bogotá)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {config.officeHours.map((item, idx) => (
                    <div key={item.day} className="flex flex-wrap items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-100 group">
                      <div className="flex items-center gap-4 w-full sm:w-32 mb-4 sm:mb-0">
                        <Toggle enabled={item.active} onChange={() => {
                          const newHours = [...config.officeHours];
                          newHours[idx].active = !newHours[idx].active;
                          setConfig({...config, officeHours: newHours});
                        }} />
                        <span className={`text-sm font-bold ${item.active ? '' : 'text-gray-400'}`}>{item.day}</span>
                      </div>
                      <div className={`flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end ${!item.active && 'opacity-30 pointer-events-none'}`}>
                        <input type="time" defaultValue={item.open} className="flex-1 sm:flex-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-2 text-xs font-bold" />
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-tighter">hasta</span>
                        <input type="time" defaultValue={item.close} className="flex-1 sm:flex-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-2 text-xs font-bold" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN SEGURIDAD */}
            {activeTab === "security" && (
              <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Seguridad y Privacidad</h3>
                </div>

                <div className="space-y-6">
                  <div className="p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl flex gap-4">
                    <ShieldAlert className="text-blue-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-300">Protección Automática</p>
                      <p className="text-xs text-blue-700 dark:text-blue-400/80 mt-1">
                        El sistema anonimiza datos sensibles (tarjetas, contraseñas) antes de ser procesados por la IA.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Dominios Autorizados</label>
                    <div className="flex flex-wrap gap-2">
                      {config.allowedDomains.map(domain => (
                        <span key={domain} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl text-xs font-bold border border-gray-200 dark:border-gray-700">
                          {domain}
                          <Trash2 size={14} className="text-red-500 cursor-pointer hover:scale-110 transition-transform" />
                        </span>
                      ))}
                      <button className="px-4 py-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-all">
                        + Añadir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN API / WEBHOOKS */}
            {activeTab === "webhooks" && (
              <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600">
                    <Code size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Integraciones</h3>
                    <p className="text-sm text-gray-500">Conecta con tus sistemas externos.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">API Keys</h4>
                    <button className="text-xs font-bold text-blue-600 flex items-center gap-1">+ Nueva Clave</button>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                        <Database size={18} className="text-gray-400" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">Production_Key_Main</p>
                        <p className="text-[10px] font-mono text-gray-400">sk_live_••••••••92a1</p>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"><Copy size={16}/></button>
                      <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition"><Trash2 size={16}/></button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-950 p-6 rounded-3xl text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe size={20} className="text-blue-400" />
                    <h4 className="font-bold text-sm">Instalación Rápida</h4>
                  </div>
                  <div className="bg-black/50 p-4 rounded-2xl font-mono text-[10px] relative border border-white/10">
                    <pre className="text-blue-300 overflow-x-auto">
{`<script 
  src="https://cdn.ai.com/widget.js" 
  data-id="ID_6782"
  async>
</script>`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* VISTA PREVIA (Sticky en Desktop, Final en Móvil) */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-8 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Eye size={14} /> Vista Previa
              </h4>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>

            {/* SIMULADOR DE IPHONE */}
            <div className="relative mx-auto w-full max-w-[280px] aspect-[9/19] bg-white dark:bg-black rounded-[3rem] border-[8px] border-gray-900 dark:border-gray-800 shadow-2xl overflow-hidden ring-4 ring-gray-200 dark:ring-gray-900/50">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 flex justify-center items-end pb-1.5 z-20">
                <div className="w-16 h-4 bg-black rounded-full"></div>
              </div>
              
              <div className="h-full flex flex-col">
                <div 
                  className="p-6 pt-10 text-white transition-colors duration-500" 
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <p className="text-[10px] opacity-70 font-bold uppercase tracking-wider">Soporte Online</p>
                  <h5 className="font-black text-xl">¡Hola! 👋</h5>
                </div>
                
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none text-[11px] font-medium leading-relaxed">
                    {config.welcomeMessage}
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-[11px] shadow-sm font-medium">
                      Hola, ¿cómo configuro mi API?
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none text-[11px] inline-flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-full px-4 py-2 text-[11px] text-gray-400 border border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    Escribe un mensaje...
                    <Zap size={14} className="text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-center text-gray-400 font-bold px-4 leading-tight">
              Diseño adaptativo basado en tu marca y configuración de posición.
            </p>
          </div>
        </aside>

      </div>

      {/* Estilos Extra para ocultar scrollbar en el menú móvil */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}