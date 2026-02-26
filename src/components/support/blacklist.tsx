"use client";

import React, { useState, useMemo } from "react";
import { 
  UserX, Search, Filter, Trash2, ShieldAlert, 
  UserPlus, FileText, X, ShieldCheck, Globe,
  Download, ChevronDown, MoreVertical, CheckCircle2,
  AlertOctagon, AlertTriangle, ArrowUpDown, History
} from "lucide-react";

// --- Tipados ---
interface BlockedUser {
  id: string;
  name: string;
  email: string;
  reason: string;
  date: string;
  severity: "low" | "medium" | "high";
  ip: string;
  status: "active" | "expired";
}

type Severity = "all" | "low" | "medium" | "high";

export default function BlacklistPage() {
  // --- Estado ---
  const [list, setList] = useState<BlockedUser[]>([
    { id: "1", name: "Carlos Spam", email: "spam@bot.com", reason: "Publicidad no deseada en comentarios", date: "2024-03-10", severity: "medium", ip: "192.168.1.1", status: "active" },
    { id: "2", name: "Hack Nexus", email: "admin@nexus.io", reason: "Intento de fuerza bruta (SSH)", date: "2024-03-12", severity: "high", ip: "45.12.88.9", status: "active" },
    { id: "3", name: "User 99", email: "test@user.com", reason: "Comportamiento sospechoso", date: "2024-03-15", severity: "low", ip: "10.0.0.5", status: "active" },
  ]);
  
  const [search, setSearch] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<Severity>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", reason: "", severity: "low", ip: "" });

  // --- Lógica de Filtrado y Búsqueda ---
  const filteredList = useMemo(() => {
    return list.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.ip.includes(search) || u.email.toLowerCase().includes(search.toLowerCase());
      const matchesSeverity = filterSeverity === "all" || u.severity === filterSeverity;
      return matchesSearch && matchesSeverity;
    });
  }, [search, list, filterSeverity]);

  // --- Acciones ---
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: BlockedUser = { 
      ...newUser, 
      id: Date.now().toString(), 
      date: new Date().toISOString().split('T')[0],
      severity: newUser.severity as any,
      status: "active"
    };
    setList([entry, ...list]);
    setIsFormOpen(false);
    setNewUser({ name: "", email: "", reason: "", severity: "low", ip: "" });
  };

  const deleteUser = (id: string) => setList(list.filter(u => u.id !== id));

  const deleteSelected = () => {
    setList(list.filter(u => !selectedIds.includes(u.id)));
    setSelectedIds([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const exportToCSV = () => {
    const headers = "Nombre,Email,IP,Motivo,Severidad,Fecha\n";
    const csv = list.map(u => `${u.name},${u.email},${u.ip},${u.reason},${u.severity},${u.date}`).join("\n");
    const blob = new Blob([headers + csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'blacklist.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // --- Helpers de UI ---
  const getSeverityBadge = (sev: string) => {
    const styles = {
      high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
      medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
    };
    return styles[sev as keyof typeof styles] || styles.low;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      
      {/* --- PANEL LATERAL DE FILTROS/ACCIONES (Responsive) --- */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-800 ${isFormOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black dark:text-white flex items-center gap-2">
              <UserPlus className="text-blue-500" /> Nuevo Bloqueo
            </h2>
            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
              <X size={24} className="dark:text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleAdd} className="space-y-5 flex-1 overflow-y-auto pr-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Información del Usuario</label>
              <input 
                required placeholder="Nombre del infractor" 
                className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition dark:text-white"
                onChange={e => setNewUser({...newUser, name: e.target.value})}
              />
            </div>
            
            <input 
              required type="email" placeholder="Correo electrónico" 
              className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition dark:text-white"
              onChange={e => setNewUser({...newUser, email: e.target.value})}
            />

            <input 
              required placeholder="Dirección IP (ej: 1.1.1.1)" 
              className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition font-mono dark:text-white"
              onChange={e => setNewUser({...newUser, ip: e.target.value})}
            />

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Gravedad del Incidente</label>
              <select 
                className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition dark:text-white appearance-none"
                onChange={e => setNewUser({...newUser, severity: e.target.value as any})}
              >
                <option value="low">Severidad Baja</option>
                <option value="medium">Severidad Media</option>
                <option value="high">Severidad Alta</option>
              </select>
            </div>

            <textarea 
              placeholder="Detalla el motivo del bloqueo..." 
              className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition h-32 dark:text-white resize-none"
              onChange={e => setNewUser({...newUser, reason: e.target.value})}
            />

            <div className="pt-4 pb-10">
              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                GUARDAR EN BLACKLIST
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-x-hidden">
        
        {/* HEADER & STATS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
         
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={exportToCSV}
              className="flex-1 md:flex-none px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-600 dark:text-gray-300 font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <Download size={18} /> Exportar
            </button>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="flex-1 md:flex-none px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-80 transition shadow-lg"
            >
              <UserPlus size={18} /> Añadir Bloqueo
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bloqueos", val: list.length, icon: UserX, color: "text-gray-600" },
            { label: "Alertas Rojas", val: list.filter(u => u.severity === 'high').length, icon: AlertOctagon, color: "text-red-500" },
            { label: "IPs Activas", val: new Set(list.map(u => u.ip)).size, icon: Globe, color: "text-blue-500" },
            { label: "Historial", val: "+12 hoy", icon: History, color: "text-emerald-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black dark:text-white">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BARRA DE ACCIÓN Y FILTROS */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden mb-6">
          <div className="p-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
            
            {/* BUSCADOR */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por nombre, IP o email..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
              {/* FILTRO SEVERIDAD */}
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                {["all", "low", "medium", "high"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterSeverity(s as Severity)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${filterSeverity === s ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-white" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    {s === "all" ? "Todos" : s}
                  </button>
                ))}
              </div>

              {/* ACCIONES POR LOTE */}
              {selectedIds.length > 0 && (
                <button 
                  onClick={deleteSelected}
                  className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-100 transition animate-in fade-in zoom-in"
                >
                  <Trash2 size={16} /> Eliminar ({selectedIds.length})
                </button>
              )}
            </div>
          </div>

          {/* TABLA (Desktop: visible de md en adelante) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-y border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4 text-left">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      onChange={(e) => setSelectedIds(e.target.checked ? list.map(u => u.id) : [])}
                      checked={selectedIds.length === list.length && list.length > 0}
                    />
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Infractor</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Dirección IP</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Motivo</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Severidad</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredList.map((u) => (
                  <tr key={u.id} className={`hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors ${selectedIds.includes(u.id) ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(u.id)}
                        onChange={() => toggleSelect(u.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-300 font-black">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{u.name}</p>
                          <p className="text-[11px] text-gray-400 font-medium">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg font-mono text-xs font-bold border border-gray-200 dark:border-gray-700">
                          {u.ip}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{u.reason}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${getSeverityBadge(u.severity)}`}>
                        {u.severity === 'high' && <AlertTriangle size={12} className="mr-1" />}
                        {u.severity}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                          <FileText size={18} />
                        </button>
                        <button onClick={() => deleteUser(u.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* VISTA MÓVIL (Tarjetas - Visible solo en < md) */}
          <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800">
            {filteredList.map((u) => (
              <div key={u.id} className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(u.id)}
                      onChange={() => toggleSelect(u.id)}
                      className="rounded border-gray-300 text-blue-600 h-5 w-5"
                    />
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold dark:text-white">
                      {u.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold dark:text-white">{u.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{u.ip}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${getSeverityBadge(u.severity)}`}>
                    {u.severity}
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl italic">
                  "{u.reason}"
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-gray-400 font-bold">{u.date}</span>
                  <div className="flex gap-4">
                    <button className="text-gray-400"><FileText size={18} /></button>
                    <button onClick={() => deleteUser(u.id)} className="text-red-400"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredList.length === 0 && (
            <div className="p-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={40} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold dark:text-white">Sin amenazas detectadas</h3>
              <p className="text-gray-400 text-sm max-w-xs">No hay usuarios bloqueados que coincidan con tu búsqueda actual.</p>
            </div>
          )}
        </div>

        {/* Paginación simple (Decorativa para el layout) */}
        <div className="flex justify-between items-center px-4">
          <p className="text-xs font-bold text-gray-400 uppercase">Mostrando {filteredList.length} entradas</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-bold dark:text-white opacity-50 cursor-not-allowed">Anterior</button>
            <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-bold dark:text-white hover:bg-gray-50">Siguiente</button>
          </div>
        </div>
      </main>

      {/* Overlay para cerrar el formulario lateral al hacer clic fuera en móviles */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}