"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  let pageTitle = "";
  if (pathname.includes("view-available-tickets")) {
    pageTitle = "View Available Tickets";
  } else if (pathname.includes("view-booked-tickets")) {
    pageTitle = "Edit Booked Tickets";
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#2d2d2d] text-white flex flex-col fixed h-full hidden md:flex">
        <div className="border-b border-white-600">
          <h2 className="pt-2 pl-6 text-3xl font-extrabold tracking-wider">
            Acceloka
          </h2>
          <p className="pl-6 pb-2 text-sm text-gray-300 italic">Admin Control</p>
        </div>

        <nav className="flex-1 p-2 space-y-2 mt-4">
          <Link
            href="/admin/view-available-tickets"
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              pathname === "/admin/view-available-tickets"
                ? "bg-yellow-600/10"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            View Tickets
          </Link>

          <Link
            href="/admin/view-booked-tickets"
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              pathname === "/admin/view-booked-tickets"
                ? "bg-yellow-600/10"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            Edit Booked Tickets
          </Link>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <Link href="/" className="text-xs text-slate-500 hover:text-red-400">
            Go back
          </Link>
        </div>
      </aside>

      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="bg-white p-5 shadow-sm flex justify-between items-center border-b sticky top-0 z-10">
          <h1 className="text-2xl ml-10 font-bold text-gray-800">
            {pageTitle}
          </h1>
          <span className="text-xs text-amber-600 bg-amber-100 p-2 rounded-lg md:hidden">
            ⚠️ Please use Desktop for Admin
          </span>
        </header>

        <main className="pt-2 p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}
