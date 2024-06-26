import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

//
import Gallery from "./Gallery";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Done from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";

import Popconfirm from "./Popconfirm";
import Footer from "./Footer";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IosShareIcon from "@mui/icons-material/IosShare";
import ShareDialog from "./Dialog/ShareDialog";
import { currencyFormat } from "../utils";

export default function AviationDetail({
  data,
  handleSold,
  handleDelete,
  listingSize,
}) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    title,
    description,
    price,
    gallery,
    userId,
    slug,
    address,
    yearModel,
    condition,
    email,
    status,
    pricingType,
    location,
    agentName,
    state,
    country,
    agentCompany,
    avatar,
    category,
    totaltime,
    aviationtype,
  } = data;

  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: location,
      map,
      title: address?.split(" ")[0],
    });
    return marker;
  };

  return (
    <>
      {/* SHARE / BUTTON */}
      <div className="mx-auto max-w-full max-h-full px-6 lg:px-20 flex flex-row justify-between pt-20 pb-1">
        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-full px-0 py-1.5 text-sm text-slate-900 hover:text-slate-600 focus-visible:outline underline underline-offset-4"
          >
            {" "}
            <span className="mr-1">
              <KeyboardBackspaceIcon />
            </span>{" "}
            back to search
          </button>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-x-1.5 rounded-full px-0 py-1.5 text-sm text-slate-900 hover:text-slate-600 focus-visible:outline underline underline-offset-4"
        >
          <IosShareIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Share
        </button>
      </div>

      {/* USER EDITS */}
      {user?.id === userId && (
        <div className="mx-auto max-w-full max-h-full px-4 lg:px-20 flex flex-row justify-between mt-4">
          <div className="flex gap-2">
            <Button
              className={`text-xs lg:text-xs rounded-full ${
                status === "sold" && "bg-blue-500"
              }`}
              onClick={() => handleSold(status === "sold" ? "unsold" : "sold")}
              variant={status && status === "sold" ? "contained" : "outlined"}
              startIcon={status && status === "sold" && <Done />}
            >
              {status && status === "sold" ? "Mark as Unsold" : "Mark as Sold"}
            </Button>
            <Button
              className="text-xs lg:text-xs rounded-full"
              onClick={() => navigate(`/edit-aviation/${slug}`)}
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

      {/* IMAGE GALLERY */}
      <div className="mx-auto pt-3 pb-0  max-w-full max-h-full lg:px-20 px-6">
        {gallery?.length > 0 && <Gallery images={gallery} />}
      </div>

      {/* LISTING INFO */}
      <div className="mx-auto max-w-full px-6 py-4 lg:py-8 lg:px-20 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 fancy">
            {title}
          </h1>
          <h2 className="font-inter">
            {state?.value}, {country?.value}
          </h2>
          <h3 className="text-xl font-bold text-slate-900 font-inter py-4">
            {price ? `${currencyFormat(price)}` : pricingType.value}
          </h3>
          <hr className="lg:hidden block" />
          {/* INFO BOX */}
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
                      Total Time
                    </p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                      <span className="text-4xl font-semibold tracking-tight text-white">
                        {totaltime}
                      </span>
                      <span className="text-sm text-gray-400">hrs</span>
                    </p>
                  </div>
                  <div className="bg-gray-900 p-6 sm:px-6 lg:px-8">
                    <p className="text-sm font-medium leading-6 text-gray-400">
                      Type
                    </p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                      <span className="text-4xl font-semibold tracking-tight text-white">
                        {aviationtype.label}
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
          {/* DESCRIPTION */}
          <div className="py-4 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
            <h3 className="sr-only">Description</h3>
            <div className="">
              <h3 className="text-2xl font-bold mb-2 fancy">Features</h3>
              <p className="text-base text-slate-900">{description}</p>
            </div>
          </div>
          {/* MAP */}
          <div className="py-3 h-[600px] w-full">
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

        {/* ASIDE */}
        <div className="lg:row-span-3">
          <div className="border border-gray-200 bg-white lg:mb-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 border-b p-4">
              <div className="relative flex items-center space-x-3 rounded-lg bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 mb-2">
                <div className="flex-shrink-0">
                  <img
                    onClick={() => navigate(`/listings/${userId}`)}
                    className="h-16 w-16 rounded-full cursor-pointer"
                    src={avatar}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xl font-semibold text-slate-900 capitalize">
                    {agentName}
                  </p>
                  <p className="truncate text-sm text-slate-900">
                    {agentCompany}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4 px-4">
              <Link to={`mailto:${email}?subject=Gain Luxury`}>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center border border-transparent bg-black px-8 py-3 uppercase text-sm tracking-wider font-semibold text-white"
                >
                  <span className="mr-2">
                    <MailOutlineIcon />
                  </span>{" "}
                  Contact
                </button>
              </Link>
            </div>
            <div className="pt-4 pb-4 px-4">
              {listingSize > 0 && (
                <Link className="underline" to={`/listings/${userId}`}>
                  {listingSize} listings for sale
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ShareDialog
        open={open}
        handleClose={() => setOpen(false)}
        link={`${category.value}/${slug}`}
      />
    </>
  );
}
