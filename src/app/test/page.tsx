"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
const items = [1, "...", 2, , 3, 4, 5, 6, 7, 8, 9, "...", 10];

export default function Pagination() {
  const [currentI, setCurrentI] = useState(1);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <a
              key={"right"}
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </a>

            {items.map((item, index, arr) => {
              if (index == 0) {
                return (
                  <a
                    key={index}
                    onClick={() => {
                      console.log(item);
                      setCurrentI(10);
                    }}
                    aria-current="page"
                    className={`relative inline-flex items-center px-4 py-2 text-sm 
                        font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                  >
                    {item}
                  </a>
                );
              } else if (index == 1) {
                return (
                  <span
                    key={index}
                    className={`${
                      currentI < 6 ? "hidden" : ""
                    }  cursor-pointer relative inline-flex items-center 
                px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0`}
                  >
                    ...
                  </span>
                );
              } else if (index == arr.length - 2) {
                return (
                  <span
                    key={index}
                    className={`${
                      currentI < arr.length - 4 ? "" : "hidden"
                    } cursor-pointer relative inline-flex items-center 
                      px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0`}
                  >
                    ...
                  </span>
                );
              } else if (index == arr.length - 1) {
                return (
                  <a
                    key={index}
                    aria-current="page"
                    className={` relative inline-flex items-center px-4 py-2 text-sm 
                      font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                  >
                    {item}
                  </a>
                );
              } else if (index >= 1 && index <= 4) {
                return (
                  <a
                    key={index}
                    aria-current="page"
                    className={`${
                      currentI < 4 ||
                      currentI == index + 1 ||
                      currentI == index - 1 ||
                      currentI == index
                        ? ""
                        : "hidden"
                    } relative inline-flex items-center px-4 py-2 text-sm 
                font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                  >
                    {item}
                  </a>
                );
              }
              return (
                <a
                  key={index}
                  aria-current="page"
                  className={`${
                    currentI > arr.length - 4 ||
                    currentI == index + 1 ||
                    currentI == index - 1 ||
                    currentI == index
                      ? ""
                      : "hidden"
                  }  relative inline-flex items-center px-4 py-2 text-sm 
                  font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                >
                  {item}
                </a>
              );
            })}

            <a
              href="#"
              key={"left"}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
