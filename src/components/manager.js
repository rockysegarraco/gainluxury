import { FingerPrintIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const secondaryNavigation = [
  { name: "Profile", href: "#", icon: UserCircleIcon, current: true },
  { name: "My Listings", href: "#", icon: FingerPrintIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ children }) {
  return (
    <>
      <div className="mx-auto max-w-full lg:max-w-[90%] lg:flex lg:gap-x-16 lg:px-4">
        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-16">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="px-4 py-8 sm:px-6 lg:flex-auto lg:px-0 lg:py-16">
          {children}
        </main>
      </div>
    </>
  );
}
