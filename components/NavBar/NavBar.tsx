"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { serverSignOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import NavFadeInAnimation from "../animations/NavBarAnimation";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleMouseEnter() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  }

  async function handleSignOut() {
    await serverSignOut();
    toast("Signed-out successfully");
    redirect("/");
  }

  return (
    <NavFadeInAnimation>
      <nav className="flex items-center gap-14 md:justify-between px-4 mt-2 py-3 md:px-[5%] ">
        <Link className="flex items-center gap-1 nav" href="/">
          <Image src="/chat-logo.svg" alt="logo" height={40} width={40} />
          <h2 className=" font-bold text-3xl md:text-4xl justify-center">
            <span className="text-pink-500">Hire</span>lyft
          </h2>
        </Link>

        <div className="w-full mt-4 md:mt-0 md:w-auto flex flex-wrap justify-center md:justify-end gap-2">
          {[
            { href: "/", icon: "/home.svg", label: "Home" },
            { href: "/features", icon: "/features.svg", label: "Features" },
            { href: "/support", icon: "/support.svg", label: "Support" },
          ].map(({ href, icon, label }, idx) => (
            <Link
              key={idx}
              href={href}
              className="group  nav flex flex-col items-center gap-1"
            >
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <Image src={icon} alt={label} width={28} height={28} />
              </div>
              <span className="text-xs sm:text-sm text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {label}
              </span>
            </Link>
          ))}

          <div
            className="relative flex flex-col items-center gap-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="transition-transform -mt-1 duration-300 hover:-translate-y-1 cursor-pointer">
              <Image
                className="nav"
                src="/profile-check.svg"
                alt="profile"
                width={36}
                height={36}
              />
            </div>

            {/* Popover */}
            <div
              className={`
              absolute top-full -mt-2 w-24 rounded-md bg-gray-800 text-white
              shadow-lg
              transform transition-all duration-300 origin-top
              ${
                isOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }
              z-10
            `}
            >
              <button
                onClick={handleSignOut}
                className="w-full text-sm px-3 py-2 hover:bg-red-600 rounded-md text-center"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </NavFadeInAnimation>
  );
}
