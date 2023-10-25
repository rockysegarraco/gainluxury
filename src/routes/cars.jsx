import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { collection, getDocs, query, where } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//
import Container from "../components/container.js";
import CardCar from "../components/cardCar.js";
import Footer from "../components/Footer";

import SelectCountries from "../components/Selects/SelectCountries";
import SelectStates from "../components/Selects/SelectStates";
import SelectMakes from "../components/Selects/SelectMakes";
import SelectPrice from "../components/Selects/SelectPrice";
import SelectYears from "../components/Selects/YearSelect";
import Filters from "../components/Filters";
//
import db from "../firebase";
import Stack from "@mui/material/Stack";
import { BRAND, COUNTRY } from "../utils/constants.js";
import SelectModel from "../components/Selects/SelectModel.js";
import SearchDialog from "../components/Dialog/SearchDialog.js";

const Cars = () => {
  const [post, setPost] = useState([]);
  const [isSearchDialogOpen, setDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortOptions, setSortOption] = useState([
    { name: "Price lowest first", current: true, label: "price", value: "asc" },
    {
      name: "Price highest first",
      current: false,
      label: "price",
      value: "desc",
    },
    {
      name: "Mileage Low to High",
      current: false,
      label: "kilometersRun",
      value: "asc",
    },
    {
      name: "Mileage High to Low",
      current: false,
      label: "kilometersRun",
      value: "desc",
    },
    {
      name: "Year Low to High",
      current: false,
      label: "yearModel",
      value: "asc",
    },
    {
      name: "Year High to Low",
      current: false,
      label: "yearModel",
      value: "desc",
    },
  ]);

  const collections = collection(db, "cars");
  let q = query(
    collections,
    where("category.value", "==", "cars"),
    where("postStatus", "==", "Live")
  );

  const [minYear, setMinYear] = React.useState("Min");
  const [maxYear, setMaxYear] = React.useState("Max");

  const [maxPrice, setMaxPrice] = React.useState("Max");
  const [minPrice, setMinPrice] = React.useState("Min");

  const [brand, setBrand] = React.useState("All");
  const [state, setState] = React.useState("All");
  const [country, setCountry] = React.useState("All");
  const [model, setModel] = React.useState("All");

  const [stateData, setStateData] = React.useState([]);
  const [modelData, setModelData] = React.useState([]);

  const [sort, setSort] = useState({
    label: "price",
    value: "asc",
    name: "Price lowest first",
  });

  useEffect(() => {
    getData();
  }, [minYear, maxYear, maxPrice, minPrice, brand, state, country, model]);

  const handleSort = (obj, index) => {
    const data = JSON.parse(JSON.stringify(sortOptions));
    data.forEach((value, i) => (value.current = i === index));
    setSortOption(data);
    setSort(obj);
  };

  useEffect(() => {
    const data = JSON.parse(JSON.stringify(post));
    if (sort.value === "asc") {
      data.sort((a, b) => a[sort.label] - b[sort.label]);
    } else {
      data.sort((a, b) => b[sort.label] - a[sort.label]);
    }
    setPost(data);
  }, [sort]);

  const getData = async () => {
    let data = [];

    // Year filter
    if (minYear !== "Min") {
      q = query(q, where("yearModel", ">=", minYear));
    }
    if (maxYear !== "Max") {
      q = query(q, where("yearModel", "<=", maxYear));
    }

    // Price filter
    if (minPrice !== "Min" && minPrice.length >= 2) {
      console.log(typeof minPrice);
      q = query(q, where("price", ">=", Number(minPrice)));
    }
    if (maxPrice !== "Max" && maxPrice.length >= 2) {
      q = query(q, where("price", "<=", Number(minPrice)));
    }

    // Brand Filter
    if (brand !== "All") {
      q = query(q, where("brand.value", "==", brand));
    }

    // Model Filter
    if (model !== "All") {
      q = query(q, where("model.value", "==", model));
    }

    // Country Filter
    if (country !== "All") {
      q = query(q, where("country.value", "==", country));
    }

    // State Filter
    if (state !== "All") {
      q = query(q, where("state.value", "==", state));
    }

    //   q = query(q, orderBy(sort.label, sort.value))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    if (sort.value === "asc") {
      data.sort((a, b) => a[sort.label] - b[sort.label]);
    } else {
      data.sort((a, b) => b[sort.label] - a[sort.label]);
    }
    setPost(data);
  };

  const handleReset = () => {
    setMaxPrice("Max");
    setMinPrice("Min");
    setMaxYear("Max");
    setMinYear("Min");
    setBrand("All");
    setCountry("All");
    setState("All");
    setModel("All");
    setSearchText("");
  };

  const handleCountry = (data) => {
    const state = COUNTRY.find((table) => table.value === data)?.state;
    setCountry(data);
    if (state) {
      setStateData(state);
    } else {
      setStateData([]);
    }
  };

  const handleBrand = (data) => {
    const modal = BRAND.find((table) => table.label === data)?.modal;
    setBrand(data);
    if (modal) {
      setModelData(modal);
    } else {
      setModelData([]);
    }
  };

  const handleSearch = (modal, brand) => {
    setSearchText(`${modal}, ${brand}`);
    setBrand(brand);
    setModel(modal);
    setDialogOpen(false);
  };

  const handleOption = (brand) => {
    setSearchText(brand);
    setBrand(brand);
    setDialogOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSearchText("");
    setModel("All");
    setBrand("All");
  };

  return (
    <>
      <div className="w-full block lg:hidden">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative flex px-4 pt-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6 pt-2">
            <MagnifyingGlassIcon
              onClick={handleClear}
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            onClick={() => setDialogOpen(true)}
            className="flex w-full rounded border-0 bg-gray-100 py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search Cars"
            style={{ minWidth: "100%" }}
            value={searchText}
          />
        </div>
      </div>
      <div className="flex flex-col overflow-hidden">
        <div className="border-b py-3 lg:py-3 max-w-[100vw]">
          <div className="flex flex-row mx-auto px-4 lg:px-20 overflow-scroll">
            <div className="flex space-x-2">
              <SelectCountries
                handleCountry={handleCountry}
                country={country}
              />
              {stateData?.length > 0 && (
                <SelectStates
                  handleState={(value) => setState(value)}
                  state={state}
                  stateData={stateData}
                />
              )}
              <SelectMakes handleBrand={handleBrand} brand={brand} />
              {modelData?.length > 0 && (
                <SelectModel
                  handleModel={(value) => setModel(value)}
                  model={model}
                  modelData={modelData}
                />
              )}
              <SelectPrice
                minValue={minPrice}
                maxValue={maxPrice}
                handleMin={(value) =>
                  setMinYear("Min") | setMaxYear("Max") | setMinPrice(value)
                }
                handleMax={(value) =>
                  setMinYear("Min") | setMaxYear("Max") | setMaxPrice(value)
                }
              />
              <SelectYears
                minValue={minYear}
                maxValue={maxYear}
                handleMin={(value) =>
                  setMinPrice("Min") | setMaxPrice("Max") | setMinYear(value)
                }
                handleMax={(value) =>
                  setMinPrice("Min") | setMaxPrice("Max") | setMaxYear(value)
                }
              />
              <div className="relative w-full min-w-4xl hidden lg:block">
                <label htmlFor="search" className="sr-only">
                  Search cars
                </label>
                <div className="relative flex">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                      onClick={handleClear}
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    onClick={() => setDialogOpen(true)}
                    className="flex w-full rounded border-0 bg-gray-100 py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search Cars"
                    style={{ minWidth: "300px" }}
                    value={searchText}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container>
          <h1 className="text-2xl lg:text-4xl fancy pt-4">Cars for Sale</h1>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 2,
              justifyContent: "space-between",
            }}
          >
            <Filters
              sort={sort}
              sortOptions={sortOptions}
              handleSort={handleSort}
            />
            <span className="text-sm text-gray-700">
              {post.length} Listings
            </span>
          </Stack>

          {post.length === 0 && (
            <Stack sx={{ mt: 4 }}>
              <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                No Results
              </Typography>
              <Box>
                <Typography
                  onClick={handleReset}
                  component="span"
                  style={{ display: "inline" }}
                  sx={{
                    cursor: "pointer",
                    color: "blueviolet",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Reset all filters{" "}
                </Typography>
                <Typography
                  style={{ display: "inline" }}
                  sx={{ color: "black" }}
                >
                  or remove one of your filters above to see more listings
                </Typography>
              </Box>
            </Stack>
          )}

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-6 mt-4 mb-16">
            {post.map((item, index) => (
              <CardCar key={index} item={item} i={index} />
            ))}
          </div>
          {/* <Pagination count={10} /> */}
        </Container>
        <SearchDialog
          handleClick={handleSearch}
          handleOption={handleOption}
          setOpen={() => setDialogOpen(false)}
          open={isSearchDialogOpen}
        />
      </div>
      <Footer />
    </>
  );
};

export default Cars;
