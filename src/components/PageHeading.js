function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabData, tabIndex, setIndex }) {
  return (
    <>
      <h1 className="text-3xl fancy">My Listings</h1>
      <div className="mt-4">
        <nav className="flex lg:space-x-8 space-x-2">
          {tabData.map((tab, i) => (
            <span
              key={tab.name}
              onClick={() => setIndex(i)}
              className={classNames(
                tabIndex === i
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-500",
                "whitespace-nowrap border-b-2 px-1 pb-4 text-base font-medium cursor-pointer"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.name}
            </span>
          ))}
        </nav>
      </div>
    </>
  );
}
