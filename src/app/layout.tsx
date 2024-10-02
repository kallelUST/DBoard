"use client";
import { useState } from "react";
import {
  UsersIcon,
  BellAlertIcon,
  ChartPieIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentPage, setCurrentPage] = useState("Team");

  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        <div className="w-64 bg-blue-900">
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Meerkat UI</h2>
          </div>

          <nav className="mt-6">
            {["Team", "Alerts", "Stats"].map((item) => (
              <button
                key={item}
                className={`flex items-center px-6 py-3 w-full ${
                  currentPage === item
                    ? "bg-blue-700 text-white"
                    : "text-gray-300 hover:bg-blue-800"
                }`}
                onClick={() => setCurrentPage(item)}
              >
                {item === "Team" && <UsersIcon className="mr-3 size-6" />}
                {item === "Alerts" && <BellAlertIcon className="mr-3 size-6" />}
                {item === "Stats" && <ChartPieIcon className="mr-3 size-6" />}
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="w-full bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex flex-col space-y-2">
                <div aria-label="Breadcrumb" className="flex text-gray-800">
                  <ol role="list" className="flex items-center space-x-2">
                    <li>
                      <div>
                        <a href="#" className="opacity-60">
                          {currentPage === "Team" && (
                            <UsersIcon className="mr-3 size-4" />
                          )}
                          {currentPage === "Alerts" && (
                            <BellAlertIcon className="mr-3 size-4" />
                          )}
                          {currentPage === "Stats" && (
                            <ChartPieIcon className="mr-3 size-4" />
                          )}
                          <span className="sr-only">Home</span>
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-shrink-0  opacity-60"
                        />
                        <div className="ml-4 text-sm font-normal opacity-60">
                          Meerkat
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-shrink-0 opacity-60"
                        />
                        <div className="ml-4 text-sm font-normal opacity-90">
                          {currentPage}
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
                <h1 className="text-base font-bold text-gray-800">
                  {currentPage}
                </h1>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f0f8ff]">
            <div className="container mx-auto px-6 pt-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-semibold text-[#000066]">
                  Team Management
                </h2>
              </div>
            </div>

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
