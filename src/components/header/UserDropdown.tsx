"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

// Definición de tipos para el estado de usuario
type UserStatus = "online" | "away" | "busy";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<UserStatus>("online");
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- FUNCIONES AVANZADAS ---

  // 1. Alternar Dropdown
  const toggleDropdown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  // 2. Cerrar Dropdown
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 3. Copiar Email al portapapeles (Función Pro)
  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    const email = "randomuser@pimjo.com";
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 4. Manejo de clics fuera del componente (Cierre automático)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  // 5. Manejo de tecla Escape para accesibilidad
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDropdown();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* TRIGGER: Botón de Perfil */}
      <button
        onClick={toggleDropdown}
        className="relative flex items-center p-1.5 transition-all duration-200 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 group"
        aria-expanded={isOpen}
      >
        <div className="relative">
          <span className="block overflow-hidden rounded-full h-11 w-11 border-2 border-transparent group-hover:border-brand-500 transition-all">
            <Image
              width={44}
              height={44}
              src="/images/user/owner.jpg"
              alt="User"
              className="object-cover"
            />
          </span>
          {/* Indicador de Estado Visual */}
          <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 
            ${status === 'online' ? 'bg-success-500' : status === 'away' ? 'bg-warning-500' : 'bg-error-500'}`} 
          />
        </div>

        <div className="hidden ml-3 text-left lg:block mr-2">
          <span className="block font-semibold text-gray-800 text-theme-sm dark:text-white/90">
            Musharof
          </span>
          <span className="block text-xs text-gray-500 dark:text-gray-400">
            Account Owner
          </span>
        </div>

        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* DROPDOWN MENU */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-3 flex w-[300px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-dark animate-in fade-in zoom-in duration-200"
      >
        {/* Header: Información de Usuario */}
        <div className="px-5 py-4 bg-gray-50/50 dark:bg-white/5 rounded-t-2xl border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">Diolay</span>
            <button 
              onClick={copyEmail}
              className="text-[10px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              {copied ? "¡Copiado!" : "ID: #9921"}
            </button>
          </div>
          <span className="block font-bold text-gray-800 text-base dark:text-white">
            Jhoind Marlon
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 truncate block">
            randomuser@pimjo.com
          </span>

          {/* Barra de Progreso de Perfil (Pro Feature) */}
          <div className="mt-4">
            <div className="flex justify-between text-[10px] mb-1 font-medium">
              <span className="text-gray-500">Perfil completado</span>
              <span className="text-brand-500">85%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-brand-500 h-full w-[85%] rounded-full" />
            </div>
          </div>
        </div>

        {/* Sección 1: Gestión de Estado */}
        <div className="p-2 border-b border-gray-100 dark:border-gray-800">
          <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estado</p>
          <div className="grid grid-cols-3 gap-1 p-1">
            {(['online', 'away', 'busy'] as UserStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`py-1.5 px-2 text-xs rounded-lg capitalize transition-all ${
                  status === s 
                  ? 'bg-brand-50 text-brand-600 border border-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:border-brand-500/20' 
                  : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Sección 2: Navegación Principal */}
        <ul className="flex flex-col gap-0.5 p-2">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl group hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 opacity-70 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Editar Perfil
              </div>
              <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">⌘P</span>
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/settings"
              className="flex items-center gap-3 px-3 py-2.5 font-medium text-gray-700 rounded-xl group hover:bg-gray-100 dark:hover:bg-white/5 transition-all dark:text-gray-300"
            >
              <svg className="w-5 h-5 opacity-70 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Configuracion de Cuenta
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/support"
              className="flex items-center gap-3 px-3 py-2.5 font-medium text-gray-700 rounded-xl group hover:bg-gray-100 dark:hover:bg-white/5 transition-all dark:text-gray-300"
            >
              <svg className="w-5 h-5 opacity-70 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Soporte Tecnico
            </DropdownItem>
          </li>
        </ul>

        {/* Footer: Acción de Cierre de Sesión */}
        <div className="p-2 mt-1 border-t border-gray-100 dark:border-gray-800">
          <Link
            href="/signin"
            className="flex items-center gap-3 px-3 py-2.5 font-semibold text-error-500 rounded-xl group hover:bg-error-50 dark:hover:bg-error-500/10 transition-all"
          >
            <svg
              className="fill-current transition-transform group-hover:-translate-x-1"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
            </svg>
            Cerrar Sesión
          </Link>
        </div>
      </Dropdown>
    </div>
  );
}