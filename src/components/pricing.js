export default function Pricing() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-8 lg:mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-6 lg:p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              Create Your Listing
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
              amet indis perferendis blanditi
            </p>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-xs lg:flex-shrink-0">
            <div className="rounded-2xl bg-slate-900 py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-10">
              <div className="mx-auto max-w-xs px-0">
                <p className="text-xl font-semibold text-white">
                  Per Ad Listing
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    $6.99
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
