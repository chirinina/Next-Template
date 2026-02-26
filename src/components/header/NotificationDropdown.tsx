"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

// --- Tipado para las notificaciones ---
interface Notification {
  id: number;
  user: {
    name: string;
    image: string;
    status: "online" | "offline" | "busy";
  };
  text: string;
  project: string;
  time: string;
  isRead: boolean;
  type: "request" | "alert" | "update";
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archive">("all");

  // --- Datos Iniciales (Simulando una API) ---
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      user: { name: "Terry Franci", image: "/images/user/user-02.jpg", status: "online" },
      text: "solicito permiso para modificar",
      project: "Project - Nganter App",
      time: "5 min ago",
      isRead: false,
      type: "request",
    },
    {
      id: 2,
      user: { name: "Alena Franci", image: "/images/user/user-03.jpg", status: "online" },
      text: "ha comentado en",
      project: "Dashboard UI Kit",
      time: "12 min ago",
      isRead: false,
      type: "update",
    },
    {
      id: 3,
      user: { name: "Jocelyn Kenter", image: "/images/user/user-04.jpg", status: "online" },
      text: "solicito permiso para modificar",
      project: "Project - Nganter App",
      time: "1 hr ago",
      isRead: true,
      type: "request",
    },
    {
      id: 4,
      user: { name: "Brandon Philips", image: "/images/user/user-05.jpg", status: "busy" },
      text: "envió un nuevo archivo en",
      project: "Nganter App",
      time: "3 hr ago",
      isRead: true,
      type: "update",
    },
  ]);

  // --- Lógica Avanzada ---
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = useMemo(() => {
    if (activeTab === "unread") return notifications.filter((n) => !n.isRead);
    if (activeTab === "archive") return []; // Aquí podrías filtrar por un flag 'isArchived'
    return notifications;
  }, [notifications, activeTab]);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleToggleRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* Botón Campana con Ping Dinámico */}
      <button
        className="relative flex items-center justify-center transition-all bg-white border border-gray-200 rounded-full dropdown-toggle text-gray-500 hover:text-brand-500 h-11 w-11 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
        onClick={toggleDropdown}
      >
        {unreadCount > 0 && (
          <span className="absolute right-0 top-0.5 z-10 flex h-2.5 w-2.5">
            <span className="absolute inline-flex w-full h-full bg-orange-500 rounded-full opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </span>
        )}
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z" />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[520px] w-[380px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-dark sm:w-[400px] lg:right-0 overflow-hidden"
      >
        {/* Header con Acciones Rápidas */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h5 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Notificaciones
              </h5>
              <p className="text-xs text-gray-500 mt-0.5">
                Tienes {unreadCount} mensajes sin leer
              </p>
            </div>
            <button
              onClick={handleMarkAllRead}
              className="text-xs font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Marcar todo como leído
            </button>
          </div>

          {/* Sistema de Tabs */}
          <div className="flex gap-2 p-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            {(["all", "unread", "archive"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-white text-gray-800 shadow-sm dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {tab === "all" ? "Todas" : tab === "unread" ? "No leídas" : "Archivo"}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Notificaciones */}
        <ul className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-transparent">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <li key={notification.id} className="group relative border-b border-gray-50 dark:border-gray-800 last:border-0">
                <DropdownItem
                  onItemClick={() => handleToggleRead(notification.id)}
                  className={`flex gap-4 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${
                    !notification.isRead ? "bg-brand-50/30 dark:bg-brand-500/5" : ""
                  }`}
                >
                  {/* Avatar con Indicador de Estado */}
                  <div className="relative shrink-0">
                    <Image
                      width={44}
                      height={44}
                      src={notification.user.image}
                      alt={notification.user.name}
                      className="rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    />
                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 ${
                      notification.user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></span>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-tight mb-1">
                      <span className="font-bold text-gray-900 dark:text-white mr-1">
                        {notification.user.name}
                      </span>
                      {notification.text}
                      <span className="block font-semibold text-gray-800 dark:text-gray-200 mt-0.5 italic">
                        {notification.project}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-gray-400">
                        {notification.time}
                      </span>
                      {!notification.isRead && (
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
                      )}
                    </div>
                  </div>

                  {/* Botones de Acción (Aparecen al hacer hover) */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-1 rounded-lg">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification.id);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10"
                      title="Eliminar"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleRead(notification.id);
                      }}
                      className="p-1.5 text-gray-400 hover:text-brand-500 rounded-md hover:bg-brand-50 dark:hover:bg-brand-500/10"
                      title={notification.isRead ? "Marcar como no leído" : "Marcar como leído"}
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    </button>
                  </div>
                </DropdownItem>
              </li>
            ))
          ) : (
            /* Estado Vacío */
            <div className="flex flex-col items-center justify-center h-full py-20 px-10 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <svg className="text-gray-400" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h6 className="text-sm font-semibold text-gray-800 dark:text-white">No hay notificaciones</h6>
              <p className="text-xs text-gray-500 mt-1">Todo está al día por aquí.</p>
            </div>
          )}
        </ul>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20">
          <Link
            href="/notifications"
            className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-gray-700 transition-all bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Ver todo el historial
            <svg className="ml-2" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </Dropdown>
    </div>
  );
}