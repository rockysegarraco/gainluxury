import React, {useState, useEffect} from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

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

const Cars = () => {
  const [post, setPost] = useState([]);
  const [sortOptions, setSortOption] = useState([
    { name: "Price lowest first", current: true, label: 'price', value: 'asc'  },
    { name: "Price highest first", current: false, label: 'price', value: 'desc' },
    { name: "Mileage Low to High", current: false, label: 'kilometersRun', value: 'asc' },
    { name: "Mileage High to Low", current: false, label: 'kilometersRun', value: 'desc' },
    { name: "Year Low to High", current: false, label: 'yearModel', value: 'asc' },
    { name: "Year High to Low", current: false, label: 'yearModel', value: 'desc' },
  ])

  const [sort, setSort] = useState({label: 'price', value: 'asc'});

  useEffect(() => {
    getData();
  }, [sort]);


  const handleSort = (obj, index) => {
    const data = JSON.parse(JSON.stringify(sortOptions));
    data.forEach((value, i) => value.current = i === index)
    setSortOption(data);
    setSort(obj)
  }


  const getData = async () => {
      let data = [];
      const collections = collection(db, "cars");
      const q = query(collections, 
        where("category.value", "==", "cars"), orderBy(sort.label, sort.value));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      });
      setPost(data);
  };

  return (
    <>
    <div className="border-b pb-4">
        <div className="flex flex-row  max-w-[90%] items-center justify-between mx-auto">
          <div className="flex space-x-2 mt-4">
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
        <Filters sortOptions={sortOptions} handleSort={handleSort} />
        <div className="grid grid-cols-3 mt-8 gap-8">
          {post.map((item, index) => (
            <CardCar item={item} i={index} />
          ))}
        </div>
        <Pagination count={10} />
      </Container>

    </>
  )
}

export default Cars;
