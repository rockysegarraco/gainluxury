import { useUser } from "@clerk/clerk-react";
//
import Gallery from "./Gallery";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Done from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";

import Breadcrumb from "../components/Breadcrumb";
import Popconfirm from "./Popconfirm";
import Footer from "../components/Footer";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";

export default function PostDetail({ data, handleSold, handleDelete }) {
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    title,
    description,
    price,
    gallery,
    userId,
    slug,
    address,
    yearModel,
    kilometersRun,
    engineCapacity,
    condition,
    email,
    status,
    pricingType,
    location,
    brand,
    agentName,
    state,
    country,
  } = data;

  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: location,
      map,
      title: address?.split(" ")[0],
    });
    return marker;
  };

  const people = [
    {
      name: "Leslie Alexander",
      role: "ABC Company, Co.",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <>
      <div className="py-4">
        <div className="mx-auto max-w-full lg:max-w-[90%] max-h-full px-6 lg:px-0 flex flex-row justify-between">
          <Breadcrumb />
        </div>

        {/* User Edit*/}
        {user?.id === userId && (
          <div className="mx-auto max-w-full max-h-full px-4 lg:px-20 flex flex-row justify-between mt-8">
            <div className="flex gap-2">
              <Button
                className="text-xs lg:text-xs rounded-full"
                onClick={() =>
                  handleSold(status === "sold" ? "unsold" : "sold")
                }
                variant={status && status === "sold" ? "contained" : "outlined"}
                startIcon={status && status === "sold" && <Done />}
              >
                {status && status === "sold"
                  ? "Mark as Unsold"
                  : "Mark as Sold"}
              </Button>
              <Button
                className="text-xs lg:text-xs rounded-full"
                onClick={() => navigate(`/edit-post/${slug}`)}
                variant="outlined"
                startIcon={<Edit />}
              >
                Edit Post
              </Button>
              <Popconfirm title="Are you sure?" onConfirm={handleDelete}>
                <Button
                  className="text-xs lg:text-xs rounded-full"
                  variant="outlined"
                  startIcon={<Delete />}
                >
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </div>
        )}

        {/* Image gallery */}
        <div className="mx-auto py-3 max-w-full max-h-full lg:px-20 px-6">
          {gallery?.length > 0 && <Gallery images={gallery} />}
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-full px-6 py-4 lg:px-20 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:pr-8">
            <h3 className="pt-0 pb-3">
              Orlando, {state.value} :: {country.value}
            </h3>
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 fancy py-2">
              {title}
            </h1>
            <h2 className="text-2xl lg:text-4xl text-gray-900 fancy py-2">
              {price ? `$${price}` : pricingType.value}
            </h2>
            <div className="py-4">
              <div className="bg-black/75">
                <div className="mx-auto max-w-full">
                  <div className="grid grid-cols-2 gap-px sm:grid-cols-2 lg:grid-cols-4 bg-white/5">
                    <div className="bg-gray-900 p-6 sm:px-6 lg:px-8">
                      <p className="text-sm font-medium leading-6 text-gray-400">
                        Year
                      </p>
                      <p className="mt-2 flex items-baseline gap-x-2">
                        <span className="text-4xl font-semibold tracking-tight text-white">
                          {yearModel}
                        </span>
                        <span className="text-sm text-gray-400"></span>
                      </p>
                    </div>
                    <div className="bg-gray-900 p-6 sm:px-6 lg:px-8">
                      <p className="text-sm font-medium leading-6 text-gray-400">
                        Miles
                      </p>
                      <p className="mt-2 flex items-baseline gap-x-2">
                        <span className="text-4xl font-semibold tracking-tight text-white">
                          {kilometersRun}
                        </span>
                        <span className="text-sm text-gray-400">km</span>
                      </p>
                    </div>
                    <div className="bg-gray-900 p-6 sm:px-6 lg:px-8">
                      <p className="text-sm font-medium leading-6 text-gray-400">
                        Engine Type
                      </p>
                      <p className="mt-2 flex items-baseline gap-x-2">
                        <span className="text-4xl font-semibold tracking-tight text-white">
                          {engineCapacity}
                        </span>
                        <span className="text-sm text-gray-400"></span>
                      </p>
                    </div>
                    <div className="bg-gray-900 p-6 sm:px-6 lg:px-8">
                      <p className="text-sm font-medium leading-6 text-gray-400">
                        Condition
                      </p>
                      <p className="mt-2 flex items-baseline gap-x-2">
                        <span className="text-2xl font-semibold tracking-tight text-white">
                          {condition.label}
                        </span>
                        <span className="text-sm text-gray-400"></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="">
                  <h3 className="text-2xl font-bold mb-2 fancy">Features</h3>
                  <p className="text-base text-gray-900">{description}</p>
                </div>
              </div>
            </div>
            <div className="mt-1 h-[300px] w-full">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_MAP_KEY,
                  libraries: ["places"],
                }}
                defaultCenter={location}
                defaultZoom={15}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
              ></GoogleMapReact>
            </div>
          </div>

          {/* Aside */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <div className="border border-gray-200 bg-white lg:mb-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 border-b p-4">
                {people.map((person) => (
                  <div className="relative flex items-center space-x-3 rounded-lg bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 mb-2">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-16 rounded-full"
                        src={person.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-xl font-semibold text-slate-900">
                        {agentName}
                      </p>
                      <p className="truncate text-sm text-slate-900">
                        {person.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 px-4">
                <Link to={`mailto:${email}?subject=Gain Luxury`}>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center border border-transparent bg-black px-8 py-3 uppercase text-sm tracking-wider font-semibold text-white"
                  >
                    Contact
                  </button>
                </Link>
              </div>
              <div className="pt-2 pb-4 px-4">
                <Link to={`mailto:${email}`}>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center border border-2 border-black px-8 py-3 uppercase text-sm tracking-wider font-semibold text-black"
                  >
                    Show Number
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
