import AuthButton from "@/components/AuthButton";
import NavBar from "@/components/NavBar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen flex flex-row">
      <NavBar />
      <div className="flex flex-col w-full bg-yellow-400">
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
