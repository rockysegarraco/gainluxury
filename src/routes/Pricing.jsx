import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";

//
import Heading from "../components/Heading";
import CategoryDialog from "../components/Dialog/CategoryDialog";

const includedFeatures = [
  "Maximum Visibility: Reach a wide audience of potential buyers, both locally and beyond, ensuring your listing gets the attention it deserves.",
  "Safe and Secure: Rest easy knowing that we prioritize safety. We verify all buyers and provide tips to protect you during the sales process.",
  "Easy to Use: Our user-friendly interface makes listing a breeze, and you can manage your ad with ease at any time.",
  "Stay Connected: Communicate effortlessly with potential buyers, schedule viewings, and answer inquiries.",
];

export default function Pricing() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div className="mx-auto max-w-8xl lg:p-6 p-3">
        <Heading title={t("PRICING")}>
          <div className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-4xl sm:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {t("TITLE1")}
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Are you looking to sell your car, yacht, aviation and property
                  quickly and efficiently? Say hello to our streamlined listing
                  service – your ticket to a successful sale.
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                    Streamlined Listing Service
                  </h3>
                  <p className="mt-6 text-base leading-7 text-gray-600">
                    Ready to take the hassle out of selling your listings? List
                    with us today and watch your listings attract the right
                    buyers. It's time to maximize your sale and move forward
                    with confidence! 🚀
                  </p>
                  <div className="mt-10 flex items-center gap-x-4">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-slate-950">
                      What’s included
                    </h4>
                    <div className="h-px flex-auto bg-gray-100" />
                  </div>
                  <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
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
                      <p className="text-base font-semibold text-gray-600">
                        Per listing
                      </p>
                      <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-5xl font-bold tracking-tight text-gray-900">
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
