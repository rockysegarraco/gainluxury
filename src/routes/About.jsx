import { useState } from "react";

//
import Heading from "../components/Heading";
import CategoryDialog from "../components/Dialog/CategoryDialog";

export default function Pricing() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="mx-auto max-w-8xl lg:p-6 p-3">
        <Heading title={"About"}>
          <div className="bg-black py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-3xl sm:text-center">
                <h2 className="text-3xl font-bold sm:text-4xl fancy text-white">
                  About Gain Luxury Listings
                </h2>
                <p className="mt-6 text-base leading-8 text-white">
                  Gain Luxury makes Lisings Simplified. Real Estate, Cars, Art,
                  Marine, and Aviation.
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                  <h3 className="text-2xl font-bold text-white fancy">
                    About us
                  </h3>
                  <p className="mt-6 text-base leading-7 text-white">
                    With decades of experience in all aspects of Real Estate,
                    Boating, Travel and Art it was inevitable that this platform
                    was built to help Buyers and Sellers connect from around the
                    globe.
                    <br /> <br />
                    We have our sites on every continent to make our world in
                    luxury buying or selling more convenient. Time is money and
                    we want you to enjoy Gain Luxury viewing experience. <br />{" "}
                    <br />
                    As a Luxury Platform we decided to make it affordable for
                    everyone to participate in either the buying or selling
                    process.
                    <br /> <br />
                    Please Visit our Pricing Schedule Page to see our
                    Transparency with No Commission / No up-charges / and No
                    Extra Fees. <br /> <br />
                    Our philosophy is to be upfront and honest so everyone can
                    have a great experience on our website. Please enjoy and
                    most of all tell your family and friends about
                    GainLuxury.com
                  </p>
                </div>
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                  <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                      <p className="text-base font-semibold text-gray-600">
                        Per listing
                      </p>
                      <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-5xl font-bold text-gray-900">
                          <del>$7</del>
                        </span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                          USD
                        </span>
                      </p>
                      <p className="mt-6 text-base font-bold text-gray-600">
                        Free Listings til 2024!
                      </p>
                      <button
                        onClick={() => setOpen(true)}
                        className="mt-4 block w-full rounded-md bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Get Started
                      </button>

                      <p className="mt-6 text-xs leading-5 text-gray-600">
                        No Commisions, No upcharge <br /> and No extra fees.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Heading>
        <CategoryDialog open={open} handleClose={() => setOpen(false)} />
      </div>
    </>
  );
}
