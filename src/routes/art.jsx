import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CarouselArt from "../components/Carousel/CarouselArt";
//
import Container from "../components/container.js";

import SelectCountries from "../components/Selects/SelectCountries.js";
import SelectStates from "../components/Selects/SelectStates.js";
import SelectPrice from "../components/Selects/SelectPrice.js";
import Filters from "../components/Filters.js";
import Footer from "../components/Footer";

import SelectArtsize from "../components/Selects/SelectArtsize.js";
import SelectArtsubject from "../components/Selects/SelectArtsubject.js";
import SelectArtcategory from "../components/Selects/SelectArtcategory.js";

//
import db from "../firebase.js";
import { COUNTRY } from "../utils/constants.js";
import PropertyCard from "../components/PropertyCard.js";

const Art = () => {
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

  const collections = collection(db, "arts");
  let q = query(collections, where("postStatus", "==", "Live"));

  const [minYear, setMinYear] = React.useState("Min");
  const [maxYear, setMaxYear] = React.useState("Max");

  const [maxPrice, setMaxPrice] = React.useState("Max");
  const [minPrice, setMinPrice] = React.useState("Min");

  const [state, setState] = React.useState("All");
  const [country, setCountry] = React.useState("All");
  const [artsize, setArtsize] = React.useState("All");
  const [artsubject, setArtsubject] = React.useState("All");
  const [artcategory, setArtcategory] = React.useState("All");

  const [stateData, setStateData] = React.useState([]);

  const [sort, setSort] = useState({
    label: "price",
    value: "asc",
    name: "Price lowest first",
  });

  useEffect(() => {
    getData();
  }, [
    minYear,
    maxYear,
    maxPrice,
    minPrice,
    state,
    country,
    artsize,
    artsubject,
    artcategory,
  ]);

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

    // Price filter
    if (minPrice !== "Min" && minPrice.length >= 2) {
      q = query(q, where("price", ">=", Number(minPrice)));
    }
    if (maxPrice !== "Max" && maxPrice.length >= 2) {
      q = query(q, where("price", "<=", Number(minPrice)));
    }

    // Country Filter
    if (country !== "All") {
      q = query(q, where("country.value", "==", country));
    }

    // Art category Filter
    if (artcategory !== "All") {
      q = query(q, where("artcategory.value", "==", artcategory));
    }

    // Art subject Filter
    if (artsubject !== "All") {
      q = query(q, where("artsubject.value", "==", artsubject));
    }

    // Art size Filter
    if (artsize !== "All") {
      q = query(q, where("artsize.value", "==", artsize));
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
    setCountry("All");
    setState("All");
    setArtcategory("All");
    setArtsize("All");
    setArtsubject("All");
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

  return (
    <>
      {/* <Tabs selected="Arts" /> */}
      <CarouselArt />
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
              <SelectArtcategory
                handleArtcategory={(value) => setArtcategory(value)}
                artcategory={artcategory}
              />
              <SelectArtsubject
                handleArtsubject={(value) => setArtsubject(value)}
                artsubject={artsubject}
              />
            </div>
          </div>
        </div>
        <Container>
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

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6 mt-4 mb-16">
            {post.map((item, index) => (
              <PropertyCard key={index} item={item} i={index} from="home" />
            ))}
          </div>
          {/* <Pagination count={10} /> */}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Art;
