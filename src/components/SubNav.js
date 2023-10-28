import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const array = ['Cars', 'Properties', 'Marine', 'Aviation'];

export default function Tabs({ selected, handleSelected }) {

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-20">
            <div className="relative flex h-12 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {array.map((item, i) => selected === item ? (
                    <span
                      key={item}
                      className="cursor-pointer inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      {item}
                    </span>
                  ) : (<span
                    onClick={() => handleSelected(item)}
                    key={item}
                    className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    {item}
                  </span>))}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
            {array.map((item, i) => selected === item ? (
               <Disclosure.Button
               key={item}
               className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
             >
               {item}
             </Disclosure.Button>
            ) : (
              <Disclosure.Button
                key={item}
                onClick={() => handleSelected(item)}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                {item}
              </Disclosure.Button>
            ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
