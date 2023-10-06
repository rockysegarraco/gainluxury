import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//
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
//
import db from "../firebase";
import Stack from '@mui/material/Stack';

const Cars = () => {
  const [post, setPost] = useState([]);
  const [sortOptions, setSortOption] = useState([
    { name: "Price lowest first", current: true, label: 'price', value: 'asc' },
    { name: "Price highest first", current: false, label: 'price', value: 'desc' },
    { name: "Mileage Low to High", current: false, label: 'kilometersRun', value: 'asc' },
    { name: "Mileage High to Low", current: false, label: 'kilometersRun', value: 'desc' },
    { name: "Year Low to High", current: false, label: 'yearModel', value: 'asc' },
    { name: "Year High to Low", current: false, label: 'yearModel', value: 'desc' },
  ])

  const collections = collection(db, "cars");
  let q = query(collections,
    where("category.value", "==", "cars"));

  const [minYear, setMinYear] = React.useState("Min");
  const [maxYear, setMaxYear] = React.useState("Max");

  const [maxPrice, setMaxPrice] = React.useState("Max");
  const [minPrice, setMinPrice] = React.useState("Min");

  const [brand, setBrand] = React.useState("All");


  const [sort, setSort] = useState({ label: 'price', value: 'asc', name: 'Price lowest first' });

  useEffect(() => {
    getData();
  }, [minYear, maxYear, maxPrice, minPrice, brand]);

  const handleSort = (obj, index) => {
    const data = JSON.parse(JSON.stringify(sortOptions));
    data.forEach((value, i) => value.current = i === index)
    setSortOption(data);
    setSort(obj)
  }

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
      q = query(q, where("yearModel", ">=", minYear))
    }
    if (maxYear !== "Max") {
      q = query(q, where("yearModel", "<=", maxYear))
    }

    // Price filter
    if (minPrice !== "Min" && minPrice.length >= 2) {
      console.log(typeof minPrice);
      q = query(q, where("price", ">=", Number(minPrice)))
    }
    if (maxPrice !== "Max" && maxPrice.length >= 2) {
      q = query(q, where("price", "<=", Number(minPrice)))
    }

    // Brand Filter
    if (brand !== "All") {
      q = query(q, where("brand.value", "==", brand))
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
    setMaxPrice("Max")
    setMinPrice("Min")
    setMaxYear("Max")
    setMinYear("Min")
  }

  return (
    <>
      <div className="border-b pb-4">
        <div className="flex flex-row  max-w-[90%] items-center justify-between mx-auto">
          <div className="flex space-x-2 mt-4">
            <SelectCountries />
            <SelectStates />
            <SelectMakes handleBrand={(value) => setBrand(value)} brand={brand} />
            <SelectPrice
              minValue={minPrice}
              maxValue={maxPrice}
              handleMin={(value) => setMinPrice(value)}
              handleMax={(value) => setMaxPrice(value)}
            />
            <SelectYears
              minValue={minYear}
              maxValue={maxYear}
              handleMin={(value) => setMinYear(value)}
              handleMax={(value) => setMaxYear(value)} />
            <div className="flex w-full min-w-2xl">
              <label htmlFor="search" className="sr-only">
                Search cars
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
                  placeholder="Search Cars"
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
        <Stack sx={{ display: 'flex', flexDirection: "row", mt: 2, justifyContent: "space-between" }}>
          <Filters sort={sort} sortOptions={sortOptions} handleSort={handleSort} />
          <span>{post.length} Listings</span>
        </Stack>

        {post.length === 0 && (
            <Stack sx={{ mt: 4 }}>
              <Typography sx={{ fontWeight: "bold", fontSize: 20}}>No Results</Typography>
              <Box>
              <Typography 
              onClick={handleReset}
              component="span"
              style={{ display: "inline"}} 
              sx={{ cursor: "pointer", color: "blueviolet", "&:hover": { textDecoration: "underline",}  }}>
                Reset all filters {" "}
              </Typography>
              <Typography style={{ display: "inline"}} sx={{ color: "black"}}>
                 or remove one of your filters above to see more listings
                </Typography>
              </Box>
            </Stack>
          )}

        <div className="grid grid-cols-3 mt-8 gap-8">
          {post.map((item, index) => (
            <CardCar item={item} i={index} />
          ))}
        </div>
        {/* <Pagination count={10} /> */}
      </Container>

    </>
  )
}

export default Cars;
