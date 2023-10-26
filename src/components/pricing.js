export default function Pricing(props) {
  return (
    <div>
      <div className="mx-auto max-w-full mb-8">
        <div className="mx-auto mt-8 lg:mt-0 max-w-full rounded-3xl bg-white lg:mx-0 lg:flex lg:max-w-full">
          <div className="-mt-2 p-4 lg:mt-0 lg:w-full lg:max-w-xs lg:flex-shrink-0">
            <div className="rounded-2xl bg-slate-950 py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-10">
              <div className="mx-auto max-w-xs">
                <p className="text-3xl font-semibold text-white fancy">
                  Per Listing
                </p>
                <p className="mt-2 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-semibold tracking-tight text-white fancy">
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
            <h3 className="text-4xl font-bold text-slate-950 fancy">
              Get started now!
            </h3>
            <p className="mt-2 text-base leading-6 text-slate-900">
              Are you looking to sell your car quickly and efficiently? Say
              hello to our streamlined car listing service – your ticket to a
              successful sale. Our user-friendly interface makes listing your
              car a breeze, and you can manage your ad with ease at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
