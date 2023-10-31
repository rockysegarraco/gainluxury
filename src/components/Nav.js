import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Example() {
  return (
    <div className="bg-white">
      <>
        <div className="mx-auto max-w-full px-4 lg:px-20">
          <div className="flex h-16 justify-between">
            <div className="flex px-2 lg:px-0">
              <div className="flex flex-shrink-0 items-center mr-4">
                <Bars3Icon className="h-6" />
              </div>
              <div className="flex flex-shrink-0 items-center">
                <img className="h-6 w-auto" src="logo.svg" alt="Your Company" />
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="w-full max-w-lg lg:max-w-xs hidden lg:block">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="hidden lg:ml-4 lg:flex lg:items-center">
              <button
                type="button"
                className="relative flex-shrink-0 rounded-full px-4 py-2 mr-2 text-sm text-slate-950 hover:bg-slate-100 hover:text-slate-800 hidden lg:block font-inter"
              >
                Pricing
              </button>
              <button
                type="button"
                className="relative flex-shrink-0 rounded-full px-4 py-2 mr-2 text-sm text-slate-950 hover:bg-slate-100 hover:text-slate-800 hidden lg:block font-inter"
              >
                Sell with us
              </button>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="rounded-full border border-slate-950 px-4 py-2 mr-0 text-sm text-slate-950 hover:bg-white hover:text-slate-800 font-inter"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-full px-4 lg:px-20 py-2 bg-slate-100 block lg:hidden">
          <div className="w-full max-w-lg lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
