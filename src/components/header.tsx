"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  "Productos",
  "Logística",
  "Financiación",
  "Sostenibilidad",
  "Equipo",
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-4 left-0 right-0 z-50 flex justify-center px-4 sm:top-6 sm:px-8 lg:top-8 lg:px-12">
      <div className="relative w-full max-w-[1440px]">
        {/* Nav bar — always pill */}
        <nav className="glass relative z-20 flex items-center justify-between rounded-full px-5 h-12 sm:px-8 sm:h-14 lg:px-10 lg:h-16">
          <a href="/" className="shrink-0" aria-label="Atalant home">
            <Image
              src="/logo.svg"
              alt="Atalant"
              width={136}
              height={40}
              className="h-6 w-auto sm:h-7 lg:h-8"
              priority
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="font-sans text-[13px] text-foreground transition-opacity hover:opacity-70"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
            <div className="hidden items-center gap-6 sm:flex">
              <span className="font-mono text-[11px] font-medium text-foreground">
                ES
              </span>
              <div className="h-4 w-px bg-foreground/10" />
            </div>

            <a
              href="#contacto"
              className="hidden h-9 items-center overflow-hidden rounded bg-primary text-white sm:flex"
            >
              <span className="border-r border-white/10 px-5 font-mono text-[10px] uppercase tracking-[2px]">
                Contacto
              </span>
              <span className="flex items-center justify-center px-3">
                <ChevronDown className="h-2 w-2 -rotate-90" />
              </span>
            </a>

            {/* Mobile/tablet menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Dropdown — 1/3 width, right-aligned */}
        <div
          className={`glass absolute right-0 top-full mt-2 w-1/3 min-w-[200px] rounded-2xl lg:hidden transition-all duration-300 ease-in-out origin-top ${
            open
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-90 pointer-events-none"
          }`}
        >
          <div className="px-5 pt-4 pb-5">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="block font-sans text-[15px] text-foreground transition-opacity hover:opacity-70"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-4 border-t border-foreground/5 pt-4 sm:hidden">
              <span className="font-mono text-[11px] font-medium text-foreground">ES</span>
              <div className="h-4 w-px bg-foreground/10" />
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="flex h-9 items-center overflow-hidden rounded bg-primary text-white"
              >
                <span className="border-r border-white/10 px-5 font-mono text-[10px] uppercase tracking-[2px]">
                  Contacto
                </span>
                <span className="flex items-center justify-center px-3">
                  <ChevronDown className="h-2 w-2 -rotate-90" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
