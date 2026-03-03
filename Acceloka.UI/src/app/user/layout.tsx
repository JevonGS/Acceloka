"use client";
import { useState } from "react";
import Link from "next/link";
import Footer from "./Footer";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Link
            href="/user/home"
            className="text-xl md:text-2xl font-bold text-[#2d2d2d] shrink-0"
          >
            Acceloka
          </Link>

          <div className="hidden md:flex items-center gap-6 font-semibold text-sm text-gray-700">
            <Link
              href="/user/view-tickets"
              className="hover:text-yellow-800 transition"
            >
              Buy Tickets
            </Link>
            <Link
              href="/user/view-cart"
              className="hover:text-yellow-800 transition"
            >
              View Cart
            </Link>
            <Link href="#" className="hover:text-yellow-800 transition">
              Deals
            </Link>
            <Link href="#" className="hover:text-yellow-800 transition">
              Tickets
            </Link>
            <Link href="#" className="hover:text-yellow-800 transition">
              Setting
            </Link>
          </div>


          <div className="flex items-center gap-3">
            <button className="hidden sm:block text-sm font-semibold text-yellow-900 px-2">
              Sign in
            </button>
            <button className="text-sm font-semibold bg-[#2d2d2d] text-white px-5 py-2 rounded-full whitespace-nowrap">
              Get Started
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 focus:outline-none"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden bg-white border-t transition-all duration-300 ease-in-out ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
        >
          <div className="flex flex-col p-4 gap-4 font-semibold text-gray-700">
            <Link
              href="/user/view-tickets"
              onClick={() => setIsOpen(false)}
            >
              Buy Tickets
            </Link>
            <Link
              href="/user/view-cart"
              onClick={() => setIsOpen(false)}
            >
              View Cart
            </Link>
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
            >
              Deals
            </Link>
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
            >
              Tickets
            </Link>
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
            >
              Setting
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-full bg-white min-h-screen pt-15 md:px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
