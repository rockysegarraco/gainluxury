import { Disclosure } from "@headlessui/react";

const array = ["Home", "Cars", "Properties", "Marine", "Aviation"];

export default function Tabs({ selected, handleSelected }) {
  return (
    <Disclosure as="nav" className="bg-white border border-bottom">
      {({ open }) => (
        <>
          <div className="mx-auto px-6 lg:px-20 font-inter">
            <div className="relative flex  justify-between">
              <div className="flex flex-1 items-stretch justify-start">
                <div className="sm:flex space-x-4 lg:space-x-8">
                  {array.map((item, i) =>
                    selected === item ? (
                      <span
                        key={item}
                        className="cursor-pointer inline-flex items-center border-b-2 border-slate-900 px-1 pt-1 text-sm font-medium text-slate-900 h-12"
                      >
                        {item}
                      </span>
                    ) : (
                      <span
                        onClick={() => handleSelected(item)}
                        key={item}
                        className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-normal text-slate-900 hover:border-slate-900 hover:text-gray-700 h-12"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
