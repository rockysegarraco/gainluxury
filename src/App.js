import Container from "./components/container.js";
import Select from "./components/Select.js";
import Breadcrumb from "./components/Breadcrumb";
import CardCar from "./components/cardCar";
import Pagination from "./components/Pagination";

import SelectCountries from "./components/Selects/SelectCountries";
import SelectStates from "./components/Selects/SelectStates";
import SelectMakes from "./components/Selects/SelectMakes";
import SelectPrice from "./components/Selects/SelectPrice";
import Filters from "./components/Filters";

function App() {
  return (
    <>
      <div className="border-b">
        <div className="mx-auto max-w-[90%] flex py-1 gap-0">
          <SelectCountries />
          <SelectStates />
          <SelectMakes />
          <SelectPrice />
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

export default App;
