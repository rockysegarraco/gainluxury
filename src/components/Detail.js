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

import Breadcrumb from "../components/Breadcrumb";
import Popconfirm from "./Popconfirm";

export default function PostDetail({data, handleSold, handleDelete}) {
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
  } = data;

  
  return (
    <>
      <div className="bg-white">
        <div className="pt-6">
          <div className="mx-auto max-w-full lg:max-w-[90%] max-h-full px-4 lg:px-0 flex flex-row justify-between">
            <Breadcrumb />
            {user?.id === userId && (<div className="flex gap-2">
            <Button
                onClick={() => handleSold(status === "sold" ? "unsold" : "sold")}
                variant={status && status === "sold" ? "contained" : "outlined"}
                startIcon={status && status === "sold" && <Done />}
              >
               {status && status === "sold" ? "Mark as Unsold" : "Mark as Sold"}
              </Button>
              <Button
                onClick={() => navigate(`/edit-post/${slug}`)}
                variant="outlined"
                startIcon={<Edit />}
              >
                Edit Post
              </Button>
              <Popconfirm title="Are you sure?" onConfirm={handleDelete}>
              <Button
                variant="outlined"
                startIcon={<Delete />}
              >
                Delete
              </Button>
              </Popconfirm>
            </div>)}
          </div>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl lg:max-w-[90%] max-h-full">
            {gallery?.length > 0 && <Gallery images={gallery} />}
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-[90%] pb-16 pt-10 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:pb-24 lg:pt-6">
            <div className="lg:col-span-2 lg:pr-8">
              <Stack
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              </Stack>
              <h2 className="text-2xl text-gray-900">{price ? `$${price}` : pricingType.value}</h2>
              <h3 className="py-2">{address}</h3>
              <div className="py-4">
                <div className="bg-gray-900">
                  <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-2 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
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
                      <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
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
                      <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
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
                      <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
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
                    <h3 className="text-2xl font-bold mb-2">
                      About this "type"
                    </h3>
                    <p className="text-base text-gray-900">{description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Aside */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <div className="border border-gray-200 bg-white px-4 py-5 sm:px-6 mb-0 lg:mb-4">
                <p className="text-2xl font-semibold">"Khan Exclusive®"</p>
                <div className="py-2">Show Number</div>
                <div className="py-4">
                  <Link to={`mailto:${email}`}>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-full border border-transparent bg-indigo-600 px-8 py-3 uppercase text-sm tracking-wider font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Send Email
                    </button>
                  </Link>
                </div>
                <div className="mt-4">MAP GOES HERE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
