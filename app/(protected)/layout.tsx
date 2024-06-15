import AuthButton from "@/components/auth-button";
import NavBar from "@/components/nav-bar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen flex flex-row">
      <NavBar />
      <div className="flex flex-col w-full">
        <header className="flex justify-between items-center p-4">
          <h1>Read Realm</h1>
          <AuthButton />
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
