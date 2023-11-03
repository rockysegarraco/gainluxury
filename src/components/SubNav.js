import { Disclosure } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const array = [
  { title: "Cars", path: "/home/cars" },
  { title: "Properties", path: "/home/realestate" },
  { title: "Marine", path: "/home/marine" },
  { title: "Aviation", path: "/home/aviation" },
  { title: "Arts", path: "/home/arts" },
];

export default function Tabs({ selected }) {
  const navigate = useNavigate();
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto font-inter ml-10 h-[64px]">
            <div className="relative flex  justify-between">
              <div className="flex flex-1 items-stretch justify-start">
                <div className="sm:flex space-x-4 lg:space-x-8">
                  {array.map((item) =>
                    selected === item.title ? (
                      <span
                        key={item.title}
                        className="cursor-pointer inline-flex items-center border-b-2 border-slate-900 px-1 pt-1 text-sm font-semibold text-slate-900 h-[64px]"
                      >
                        {item.title}
                      </span>
                    ) : (
                      <span
                        onClick={() => navigate(item.path)}
                        key={item}
                        className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-base font-normal text-slate-900 hover:border-slate-900 hover:text-gray-700 h-[64px]"
                      >
                        {item.title}
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
