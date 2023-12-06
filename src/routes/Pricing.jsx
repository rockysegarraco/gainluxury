import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

//
import Heading from "../components/Heading";
import CategoryDialog from "../components/Dialog/CategoryDialog";

const includedFeatures = [
  "5 Photos / Upload your Video / Price / Year- (Make and Model if a Car) / Features / Map of Location / Contact Information (Example Below)",
  "Maximum Visibility: Reach a wide audience of potential buyers, both locally and globally, ensuring your listing gets the attention it deserves.",
  "Easy to Use: Our user-friendly interface makes listing a breeze, and you can manage your ad with ease at any time.",
  "Safe and Secure. Rest easy knowing that we prioritize safety.",
  "Stay Connected: Communicate effortlessly with potential buyers, schedule viewings, and answer inquiries. ",
];

export default function Pricing() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="mx-auto max-w-8xl lg:p-6 p-3">
        <Heading title={"Pricing"}>
          <div className="bg-black py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-3xl sm:text-center">
                <h2 className="text-3xl font-bold sm:text-4xl fancy text-white">
                  Gain Luxury Listings
                </h2>
                <p className="mt-6 text-base leading-8 text-white">
                  Gain Luxury makes Lisings Simplified. Real Estate, Cars, Art,
                  Marine, and Aviation.
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                  <h3 className="text-2xl font-bold text-white fancy">
                    Streamlined Listing Service
                  </h3>
                  <p className="mt-6 text-base leading-7 text-white">
                    Ready to take the hassle out of selling your listings? List
                    with us today and watch your listings attract the right
                    buyers. It's time to maximize your sale and move forward
                    with confidence!
                  </p>
                  <div className="mt-10 flex items-center gap-x-4">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-white">
                      What’s included
                    </h4>
                    <div className="h-px flex-auto bg-gray-100" />
                  </div>
                  <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-white sm:grid-cols-2 sm:gap-6">
                    {includedFeatures.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          className="h-6 w-5 flex-none text-indigo-600"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                  <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                      <p className="mt-6 text-base font-bold text-gray-600">
                        Free Listings
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
