import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  return (
    <div className="root-layout min-h-screen flex flex-col">
      <nav className="flex flex-wrap items-center justify-between px-4 py-3 md:px-[5%] ">
        <Link className="flex items-center gap-2" href="/">
          <Image src="/chat-logo.svg" alt="logo" height={40} width={40} />
          <h2 className="font-semibold text-2xl sm:text-3xl tracking-wide text-[var(--col4)]">
            InterviewAssist
          </h2>
        </Link>

        <div className="w-full mt-4 md:mt-0 md:w-auto flex flex-wrap justify-center md:justify-end gap-6">
          {[
            { href: "/", icon: "/home.svg", label: "Home" },
            { href: "/features", icon: "/features.svg", label: "Features" },
            { href: "/help", icon: "/support.svg", label: "Support" },
          ].map(({ href, icon, label }, idx) => (
            <Link
              key={idx}
              href={href}
              className="group flex flex-col items-center gap-1"
            >
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <Image src={icon} alt={label} width={28} height={28} />
              </div>
              <span className="text-xs sm:text-sm text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {label}
              </span>
            </Link>
          ))}

          <Link
            href="/profile"
            className="group flex flex-col items-center gap-1"
          >
            <div className="transition-transform duration-300 group-hover:-translate-y-1">
              <Image
                src="/profile-check.svg"
                alt="profile"
                width={36}
                height={36}
              />
            </div>
            <span className="text-xs sm:text-sm text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              Profile
            </span>
          </Link>
        </div>
      </nav>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default RootLayout;
