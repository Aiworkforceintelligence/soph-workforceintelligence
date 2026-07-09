import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AWorD-OS Workforce Intelligence",
  description: "AI-ready workforce intelligence operating system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-[#f7f8f5] text-[#151713]">
          <header className="border-b border-[#d9ded1] bg-white">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
              <a href="/" className="text-lg font-semibold">AWorD-OS</a>
              <nav className="flex flex-wrap items-center gap-2 text-sm text-[#4b5147]">
                <a className="nav-link" href="/roles">Roles</a>
                <a className="nav-link" href="/employees">Employees</a>
                <a className="nav-link" href="/arde">ARDE</a>
                <a className="nav-link" href="/headcount-plans">Headcount</a>
                <a className="nav-link" href="/alerts">Alerts</a>
                <a className="nav-link" href="/learning">Learning</a>
                <a className="nav-link" href="/action-plans">Action Plans</a>
              </nav>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <a className="persona-link" href="/dashboard/ceo">CEO</a>
                <a className="persona-link" href="/dashboard/cto">CTO</a>
                <a className="persona-link" href="/dashboard/chro">CHRO</a>
                <a className="persona-link" href="/dashboard/head-of-ai">Head of AI</a>
              </div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
