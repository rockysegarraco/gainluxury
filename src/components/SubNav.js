import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-transparent shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-[100vw] px-2 sm:px-6 lg:px-20 sticky top-[100px] overflow-scroll">
            <div className="relative flex h-12 justify-between">
              <div className="flex flex-1 items-center sm:items-stretch sm:justify-start lg:px-0 px-2">
                <div className="flex space-x-8">
                  <a
                    href="#"
                    className="w-24 inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-slate-900 hover:border-gray-300 hover:text-gray-700"
                  >
                    Real Estate
                  </a>
                  <a
                    href="/home/cars"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-slate-900 hover:border-gray-300 hover:text-gray-700"
                  >
                    Cars
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-slate-900 hover:border-gray-300 hover:text-gray-700"
                  >
                    Marine
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-slate-900 hover:border-gray-300 hover:text-gray-700"
                  >
                    Aviation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
