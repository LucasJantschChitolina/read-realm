import AuthButton from "@/components/auth-button";
import NavBar from "@/components/nav-bar";
import { ReactNode } from "react";
import AppBreadcrumb from "./components/breadcrumb";

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
          <AuthButton />
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
