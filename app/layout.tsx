import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Read Realm",
  description: "The best place to read and share stories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className="bg-background text-foreground">
          <main className="w-screen h-screen flex flex-row justify-center">
            {children}
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}
