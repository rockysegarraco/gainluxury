import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CarouselCars from "../components/Carousel/CarouselCars";
//
import Container from "../components/container.js";
import CardCar from "../components/cardCar.js";
import Footer from "../components/Footer";

import SelectCountries from "../components/Selects/SelectCountries";
import SelectStates from "../components/Selects/SelectStates";
import SelectMakes from "../components/Selects/SelectMakes";
import SelectPrice from "../components/Selects/SelectPrice";
import SelectYears from "../components/Selects/YearSelect";
import SelectModel from "../components/Selects/SelectModel.js";
import SelectCondition from "../components/Selects/SelectCondition.js";
import Filters from "../components/Filters";
//
import db from "../firebase";
import { BRAND, COUNTRY } from "../utils/constants.js";

// redux
import { setBrand, setModel, setModelData } from "../store/brandSerchSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Cars = () => {
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

  const [state, setState] = React.useState("All");
  const [country, setCountry] = React.useState("All");
  const [condition, setCondition] = React.useState("All");

  const [stateData, setStateData] = React.useState([]);

  const brand = useSelector((state) => state.brandSearch.brand);
  const model = useSelector((state) => state.brandSearch.model);
  const modelData = useSelector((state) => state.brandSearch.modelData);

  const dispatch = useDispatch();

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
    brand,
    state,
    country,
    model,
    condition,
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

    // Condition Filter
    if (condition !== "All") {
      q = query(q, where("condition.value", "==", condition));
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
    setCountry("All");
    setState("All");
    dispatch(setBrand("All"));
    dispatch(setModel("All"));
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
    dispatch(setBrand(data));
    if (modal) {
      dispatch(setModelData(modal));
    } else {
      dispatch(setModel("All"));
      dispatch(setModelData([]));
    }
  };

  return (
    <>
      <CarouselCars />
      <div className="flex flex-col">
        {/* <Tabs selected="Cars" /> */}

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
                  handleModel={(value) => dispatch(setModel(value))}
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
              <SelectCondition
                handleCondition={(value) => setCondition(value)}
                condition={condition}
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
              <CardCar key={index} item={item} i={index} from="home/cars" />
            ))}
          </div>
          {/* <Pagination count={10} /> */}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Cars;
