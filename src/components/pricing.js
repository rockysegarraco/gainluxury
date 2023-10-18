export default function Pricing(props) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-full px-6 lg:px-0">
        <div className="mx-auto mt-8 lg:mt-8 max-w-full rounded-3xl bg-slate-50 lg:mx-0 lg:flex lg:max-w-full">
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-xs lg:flex-shrink-0">
            <div className="rounded-2xl bg-blue-700 py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-10">
              <div className="mx-auto max-w-xs">
                <p className="text-3xl font-semibold text-white fancy">
                  Per Listing
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-semibold tracking-tight text-white">
                    ${props.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-white">
                    USD
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 lg:p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-3xl font-bold text-slate-900 fancy">
              Get started now!
            </h3>
            <p className="mt-2 text-base leading-7 text-slate-900">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
              amet indis perferendis blanditi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
