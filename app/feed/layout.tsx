import AuthButton from "@/components/AuthButton";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen flex flex-row">
      <nav className="flex-1 max-w-44 bg-gray-300 p-4">
        <p>item</p>
        <p>item</p>
        <p>item</p>
        <p>item</p>
        <p>item</p>
        <p>item</p>
      </nav>
      <div className="flex flex-col w-full">
        <header className="flex justify-between items-center p-4 bg-gray-600">
          <h1>Read Realm</h1>
          <AuthButton />
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
