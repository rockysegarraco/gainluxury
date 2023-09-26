/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";

import Specifics from "../components/Specifics";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Cars", href: "#" },
    { id: 2, name: "Brand", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example(props) {
  const { title, description, price } = props.data;
  return (
    <>
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-[2xl] items-center space-x-2 max-w-[90%]"
            >
              {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto max-w-[90%] mt-4 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8  bg-slate-100">
            IMAGE GALLERY GOES HERE
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-[90%] pb-16 pt-10 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:pb-24 lg:pt-6">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <h2 className="text-2xl text-gray-900">${price}</h2>
              <h3 className="py-2">Atlanta, Georgia, United States</h3>
              <div className="py-4">
                <Specifics />
              </div>
              <div className="py-4 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="">
                    <h3 className="text-2xl font-bold mb-2">
                      About this "type"
                    </h3>
                    <p className="text-base text-gray-900">{description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Aside */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <div className="border border-gray-200 bg-white px-4 py-5 sm:px-6 mb-0 lg:mb-4">
                <p className="text-2xl font-semibold">"Khan Exclusive®"</p>
                <div className="py-2">Show Number</div>
                <div className="py-4">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-full border border-transparent bg-indigo-600 px-8 py-3 uppercase text-sm tracking-wider font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Send Email
                  </button>
                </div>
                <div className="mt-4">MAP GOES HERE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
