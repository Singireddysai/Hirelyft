import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";
import NavBar from "@/components/NavBar/NavBar";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  const user = await getCurrentUser();
  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  return (
    <div className="root-layout min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default RootLayout;
