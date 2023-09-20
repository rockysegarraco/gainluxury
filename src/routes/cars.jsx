import React from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import Container from "../components/container.js";
import Breadcrumb from "../components/Breadcrumb";
import CardCar from "../components/cardCar";
import Pagination from "../components/Pagination";

import SelectCountries from "../components/Selects/SelectCountries"
import SelectStates from "../components/Selects/SelectStates";
import SelectMakes from "../components/Selects/SelectMakes";
import SelectPrice from "../components/Selects/SelectPrice";
import SelectYears from "../components/Selects/YearSelect";
import Filters from "../components/Filters";

const Cars = () => {
  return (
    <>
    <div className="border-b pb-4">
        <div className="flex flex-row  max-w-[90%] items-center justify-between mx-auto">
          <div className="flex space-x-2">
            <SelectCountries />
            <SelectStates />
            <SelectMakes />
            <SelectPrice />
            <SelectYears />
            <div className="flex w-full min-w-2xl">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative flex">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="flex w-full rounded border-0 bg-gray-100 py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
          </div>
        </div>
      </div>
      <Container>
        <div className="py-4">
          <Breadcrumb />
        </div>
        <h1 className="text-4xl">Cars for Sale</h1>
        <Filters />
        <div className="grid grid-cols-3 mt-8 gap-8">
          <div>
            <CardCar />
          </div>
          <div>
            <CardCar />
          </div>
          <div>
            <CardCar />
          </div>
        </div>
        <Pagination count={10} />
      </Container>

    </>
  )
}

export default Cars;
