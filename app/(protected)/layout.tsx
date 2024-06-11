import AuthButton from "@/components/AuthButton";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="w-44 bg-gray-300 p-4">
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
    </>
  );
}
