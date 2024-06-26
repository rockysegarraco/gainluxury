import { Disclosure } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTab } from "../store/tabSlice";

const array = [
  { title: "Real Estate", path: "/home/realestate" },
  { title: "Cars", path: "/home/cars" },
  { title: "Art", path: "/home/arts" },
  { title: "Marine", path: "/home/marine" },
  { title: "Aviation", path: "/home/aviation" },
];

export default function Tabs() {
  const navigate = useNavigate();
  const tab = useSelector((state) => state.tabSlice.tab);
  const dispatch = useDispatch();

  console.log(tab);
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto font-inter ml-10 h-[64px]">
            <div className="relative flex  justify-between">
              <div className="flex flex-1 items-stretch justify-start">
                <div className="sm:flex space-x-4 lg:space-x-8">
                  {array.map((item) =>
                    tab === item.title ? (
                      <span
                        key={item.title}
                        className="cursor-pointer inline-flex items-center border-b-2 border-white px-1 pt-1 text-base font-normal text-white h-[64px]"
                      >
                        {item.title}
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          navigate(item.path);
                          dispatch(setTab(item.title));
                        }}
                        key={item.title}
                        className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-base font-normal text-white hover:border-white hover:text-white h-[64px]"
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
