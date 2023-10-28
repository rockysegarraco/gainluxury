import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
//
import Container from "../container.js";
import CardCar from "../cardCar.js";

import SelectCountries from "../Selects/SelectCountries.js";
import SelectStates from "../Selects/SelectStates.js";
import SelectYears from "../Selects/YearSelect.js";
import SelectPrice from "../Selects/SelectPrice.js";
import Filters from "../Filters.js";
import Searchbar from "../Dialog/Searchbar.js";
//
import db from "../../firebase.js";
import { COUNTRY } from "../../utils/constants.js";

const Aviation = () => {
  const [post, setPost] = useState([]);
  const [sortOptions, setSortOption] = useState([
    { name: "Price lowest first", current: true, label: "price", value: "asc" },
    {
      name: "Price highest first",
      current: false,
      label: "price",
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
    where("category.value", "==", "properties"),
    where("postStatus", "==", "Live"),
    orderBy("postDate", "asc")
  );

  const [minYear, setMinYear] = React.useState("Min");
  const [maxYear, setMaxYear] = React.useState("Max");

  const [maxPrice, setMaxPrice] = React.useState("Max");
  const [minPrice, setMinPrice] = React.useState("Min");

  const [state, setState] = React.useState("All");
  const [country, setCountry] = React.useState("All");

  const [stateData, setStateData] = React.useState([]);
  const [modelData, setModelData] = React.useState([]);

  const [sort, setSort] = useState({
    label: "price",
    value: "asc",
    name: "Price lowest first",
  });

  useEffect(() => {
    getData();
  }, [minYear, maxYear, maxPrice, minPrice, state, country]);

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

    // Country Filter
    if (country !== "All") {
      q = query(q, where("country.value", "==", country));
    }

    // State Filter
    if (state !== "All") {
      q = query(q, where("state.value", "==", state));
    }

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
    setCountry("All");
    setState("All");
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


  const handleSearch = (modal, brand) => {
    
  };

  const handleOption = (brand) => {
    //setBrand(brand);
  };

  return (
    <>
      <div className="w-full block lg:hidden">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative flex px-4 pt-3">
        <Searchbar handleClick={handleSearch} handleOption={handleOption} />
        </div>
      </div>
      <div className="flex flex-col">
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
              <div className="w-full min-w-4xl hidden lg:block">
                <Searchbar handleClick={handleSearch} handleOption={handleOption} />
              </div>
            </div>
          </div>
        </div>
        <Container>
          <h1 className="text-2xl lg:text-4xl fancy pt-4">Aviation for Sale</h1>
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
      </div>
    </>
  );
};

export default Aviation;
