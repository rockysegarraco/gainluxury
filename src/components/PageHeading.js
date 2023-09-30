function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({tabData, tabIndex, setIndex}) {
  return (
    <div className="border-b border-gray-200 pb-5 sm:pb-0">
      <h3 className="text-3xl font-semibold leading-8 text-gray-900">
        My Listings
      </h3>
      <div className="mt-3 sm:mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={tabData.find((tab) => tab.current).name}
          >
            {tabData.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabData.map((tab, i) => (
              <span
                key={tab.name}
                onClick={() => setIndex(i)}
                className={classNames(
                  tabIndex === i
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 pb-4 text-base font-medium cursor-pointer"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
