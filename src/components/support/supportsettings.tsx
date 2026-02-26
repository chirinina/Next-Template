"use client";

import React, { useState, useEffect } from "react";
import { 
  Save, Bot, Clock, Palette, ShieldCheck, Zap, 
  Code, MessageSquare, Globe, AtSign, Database, 
  ShieldAlert, Eye, Laptop, Smartphone, Check, AlertCircle,
  Plus, Trash2, Copy, ExternalLink
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

  // --- ESTADO REAL DE CONFIGURACIÓN ---
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
    // Simulación de llamada API
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
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      
      {/* HEADER SUPERIOR */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        

        <div className="flex items-center gap-3">
          {showSuccess && (
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium animate-bounce">
              <Check size={16} /> Cambios aplicados con éxito
            </span>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            {isSaving ? <Zap className="animate-spin" size={18} /> : <Save size={18} />}
            {isSaving ? "Sincronizando..." : "Guardar Configuración"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR DE NAVEGACIÓN */}
        <aside className="lg:col-span-3 space-y-2">
          {[
            { id: "ai", icon: Bot, label: "IA y Automatización", color: "text-purple-500" },
            { id: "design", icon: Palette, label: "Widget y Diseño", color: "text-pink-500" },
            { id: "hours", icon: Clock, label: "Horarios Laborales", color: "text-amber-500" },
            { id: "security", icon: ShieldCheck, label: "Seguridad y Privacidad", color: "text-emerald-500" },
            { id: "webhooks", icon: Code, label: "Integraciones API", color: "text-blue-500" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === item.id 
                ? "bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 text-blue-600 dark:text-blue-400" 
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={activeTab === item.id ? item.color : "text-gray-400"} />
                {item.label}
              </div>
              {activeTab === item.id && <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
            </button>
          ))}
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-all">
            
            {/* SECCIÓN IA */}
            {activeTab === "ai" && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold dark:text-white">Motor de Inteligencia Artificial</h3>
                    <p className="text-sm text-gray-500 italic">Configura cómo la IA interactúa con tus clientes.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200">Activar Copilot para Agentes</h4>
                      <p className="text-xs text-gray-500">Sugiere respuestas en tiempo real basadas en chats anteriores.</p>
                    </div>
                    <Toggle enabled={config.aiEnabled} onChange={() => setConfig({...config, aiEnabled: !config.aiEnabled})} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Modelo de Lenguaje</label>
                      <select 
                        value={config.aiModel}
                        onChange={(e) => setConfig({...config, aiModel: e.target.value})}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      >
                        <option value="gpt-4-turbo">GPT-4 Turbo (Recomendado)</option>
                        <option value="gpt-3.5-ultra">GPT-3.5 Ultra</option>
                        <option value="claude-3-opus">Claude 3 Opus</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Tono de Voz</label>
                      <input 
                        type="text"
                        value={config.aiTone}
                        onChange={(e) => setConfig({...config, aiTone: e.target.value})}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        placeholder="Ej: Empático, Técnico, Divertido"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Instrucciones Críticas (System Prompt)</label>
                    <textarea 
                      rows={4}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      placeholder="Indica a la IA que no puede dar reembolsos superiores a $100 sin supervisión..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN DISEÑO */}
            {activeTab === "design" && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-2xl text-pink-600">
                    <Palette size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold dark:text-white">Identidad Visual</h3>
                    <p className="text-sm text-gray-500">Personaliza la interfaz que ven tus usuarios finales.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500">Color de Marca</label>
                      <div className="flex gap-3">
                        <input 
                          type="color" 
                          value={config.primaryColor}
                          onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                          className="h-12 w-12 rounded-lg cursor-pointer bg-transparent border-none" 
                        />
                        <input 
                          type="text" 
                          value={config.primaryColor}
                          className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm uppercase dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500">Posición</label>
                      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                        <button 
                          onClick={() => setConfig({...config, widgetPosition: 'left'})}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${config.widgetPosition === 'left' ? 'bg-white dark:bg-gray-700 shadow text-blue-600' : 'text-gray-500'}`}
                        >Izquierda</button>
                        <button 
                          onClick={() => setConfig({...config, widgetPosition: 'right'})}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${config.widgetPosition === 'right' ? 'bg-white dark:bg-gray-700 shadow text-blue-600' : 'text-gray-500'}`}
                        >Derecha</button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500">Mensaje de Bienvenida</label>
                      <textarea 
                        value={config.welcomeMessage}
                        onChange={(e) => setConfig({...config, welcomeMessage: e.target.value})}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm dark:text-white"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN HORARIOS */}
            {activeTab === "hours" && (
              <div className="p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl text-amber-600">
                      <Clock size={24} />
                    </div>
                    <h3 className="text-xl font-bold dark:text-white">Horario de Operaciones</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-500">Zona Horaria</p>
                    <p className="text-xs dark:text-gray-300">GMT-05:00 (Bogotá/Lima/Quito)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {config.officeHours.map((item, idx) => (
                    <div key={item.day} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                      <div className="flex items-center gap-4 w-32">
                        <Toggle enabled={item.active} onChange={() => {
                          const newHours = [...config.officeHours];
                          newHours[idx].active = !newHours[idx].active;
                          setConfig({...config, officeHours: newHours});
                        }} />
                        <span className={`text-sm font-bold ${item.active ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'}`}>{item.day}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${!item.active && 'opacity-30 pointer-events-none'}`}>
                        <input type="time" defaultValue={item.open} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-1.5 text-xs dark:text-white" />
                        <span className="text-gray-400 text-xs font-bold">A</span>
                        <input type="time" defaultValue={item.close} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-1.5 text-xs dark:text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN SEGURIDAD */}
            {activeTab === "security" && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">Seguridad y Cumplimiento</h3>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl flex gap-4">
                    <ShieldAlert className="text-blue-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-300">Protección de Datos Activa</p>
                      <p className="text-xs text-blue-700 dark:text-blue-400/80 mt-1">
                        El sistema está anonimizando automáticamente números de tarjeta de crédito y contraseñas detectadas en el chat.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-gray-500">Dominios Permitidos (CORS)</label>
                    <div className="flex flex-wrap gap-2">
                      {config.allowedDomains.map(domain => (
                        <span key={domain} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold dark:text-gray-300">
                          {domain}
                          <Trash2 size={12} className="text-red-500 cursor-pointer" />
                        </span>
                      ))}
                      <button className="px-3 py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-all">
                        + Añadir Dominio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* SECCIÓN INTEGRACIONES API & WEBHOOKS */}
            {activeTab === "webhooks" && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600">
                    <Code size={24} />
                    </div>
                    <div>
                    <h3 className="text-xl font-bold dark:text-white">Desarrolladores e Integraciones</h3>
                    <p className="text-sm text-gray-500">Conecta tu chat con Slack, Zapier o tus propios sistemas.</p>
                    </div>
                </div>
                </div>

                {/* GESTIÓN DE API KEYS */}
                <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">Claves de API Privadas</h4>
                    <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    <Plus size={14} /> Generar nueva clave
                    </button>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                        <Database size={18} className="text-gray-500" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold dark:text-gray-200">Producción - Main Key</p>
                        <p className="text-xs font-mono text-gray-400">sk_live_4e53...92a1</p>
                    </div>
                    </div>
                    <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition" title="Copiar">
                        <Copy size={16} className="text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition" title="Revocar">
                        <Trash2 size={16} className="text-red-500" />
                    </button>
                    </div>
                </div>
                </div>

                {/* GESTIÓN DE WEBHOOKS */}
                <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">Webhooks Activos</h4>
                
                {/* Formulario para añadir nuevo (Simulado) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
                    <div className="md:col-span-2">
                    <input 
                        type="text" 
                        placeholder="https://tu-servidor.com/webhook"
                        className="w-full p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                    </div>
                    <button className="bg-gray-900 dark:bg-blue-600 text-white font-bold py-2 rounded-xl text-sm hover:opacity-90 transition">
                    Añadir Endpoint
                    </button>
                </div>

                {/* Lista de Webhooks */}
                <div className="space-y-3">
                    {config.webhooks.map((webhook) => (
                    <div key={webhook.id} className="group p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:border-blue-400 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600">
                            <Zap size={18} />
                            </div>
                            <div className="overflow-hidden">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-bold dark:text-gray-200 truncate">{webhook.url}</p>
                                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 text-[10px] font-bold rounded-full">Activo</span>
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                <AtSign size={12} /> Evento: <b>{webhook.event}</b>
                                </span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                <ExternalLink size={12} /> Latencia: 142ms
                                </span>
                            </div>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="px-3 py-1.5 text-xs font-bold bg-gray-100 dark:bg-gray-800 rounded-lg dark:text-gray-300 hover:bg-gray-200">
                            Probar
                            </button>
                            <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                            <Trash2 size={16} />
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* DOCUMENTACIÓN RÁPIDA */}
                <div className="bg-gray-900 dark:bg-black p-6 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Globe size={20} className="text-blue-400" />
                    </div>
                    <h4 className="font-bold">¿Cómo integrar el widget?</h4>
                </div>
                <p className="text-sm text-gray-400 mb-4">Copia y pega este script en el <code className="text-pink-400">{'<head>'}</code> de tu sitio web:</p>
                <div className="bg-gray-800 dark:bg-gray-900 p-4 rounded-xl font-mono text-[11px] relative group">
                    <pre className="text-blue-300">
                    {`<script 
            src="https://cdn.tusoporte.com/widget.js" 
            data-id="APP_ID_6782"
            async>
            </script>`}
                    </pre>
                    <button className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                    <Copy size={14} />
                    </button>
                </div>
                </div>
            </div>
            )}
          </div>
        </main>

        {/* VISTA PREVIA DEL WIDGET (SOLO DESKTOP) */}
        <aside className="lg:col-span-3">
          <div className="sticky top-8 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Eye size={14} /> Vista Previa Real
              </h4>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>

            {/* SIMULADOR DE TELÉFONO/WIDGET */}
            <div className="relative mx-auto w-full aspect-[9/16] max-w-[280px] bg-white dark:bg-gray-950 rounded-[2.5rem] border-[6px] border-gray-800 dark:border-gray-800 shadow-2xl overflow-hidden">
              <div className="absolute top-0 w-full h-6 bg-gray-800 flex justify-center items-end pb-1">
                <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
              </div>
              
              {/* INTERFAZ DEL CHAT SIMULADA */}
              <div className="h-full flex flex-col">
                <div 
                  className="p-6 text-white pt-10" 
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <p className="text-xs opacity-80">Soporte en vivo</p>
                  <h5 className="font-bold">Hola 👋</h5>
                </div>
                
                <div className="flex-1 p-4 space-y-3">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none text-[10px] dark:text-gray-300">
                    {config.welcomeMessage}
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-[10px] shadow-sm">
                      Tengo una duda sobre mi pedido.
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none text-[10px] dark:text-gray-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  </div>
                </div>

                <div className="p-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-full px-4 py-2 text-[10px] text-gray-400 border border-gray-200 dark:border-gray-800">
                    Escribe aquí...
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-center text-gray-500 px-4">
              * El diseño del widget se ajusta automáticamente al color de marca y posición seleccionada.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}