import { Toaster } from "@/components/ui/sonner";
import AuthButton from "@/components/auth-button";
import NavBar from "@/components/nav-bar";
import { ReactNode } from "react";
import AppBreadcrumb from "./components/breadcrumb";
import { ModeToggle } from "@/components/theme-toggle";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen flex flex-row">
      <NavBar />
      <div className="flex flex-col w-full">
        <header className="flex justify-between items-center p-4">
          <div>
            <h1 className="font-bold">Read Realm</h1>
            <AppBreadcrumb />
          </div>
          <div className="flex gap-4">
            <AuthButton />
            <ModeToggle />
          </div>
        </header>
        {children}
      </div>
      <Toaster richColors />
    </div>
  );
};

export default Layout;
