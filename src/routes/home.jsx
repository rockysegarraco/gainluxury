import { UserButton } from "@clerk/clerk-react";

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

function Home() {
  return (
    <>
      <div className="border-b">
        <div className="flex flex-row py-1 max-w-[90%] items-center justify-between mx-auto">
          <div className="flex">
            <SelectCountries />
            <SelectStates />
            <SelectMakes />
            <SelectPrice />
            <SelectYears />
          </div>
          <UserButton userProfileMode="navigation" userProfileUrl="/profile" />
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
  );
}

export default Home;
