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
    <div className="root-layout">
      <nav className="flex items-center px-[1rem] py-[1rem] md:px-[2rem]">
        <Link className="flex justify-center items-center gap-2 " href="/">
          <Image src="/chat-logo.svg" alt="logo" height="40" width="40" />
          <h2 className="font-[600] text-3xl tracking-[1px]">
            InterviewAssist
          </h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
