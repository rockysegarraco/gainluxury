import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function CardCar({ item, i }) {
  return (
    <div className="mx-auto max-w-2xl mt-4 grid grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
      <article key={i} className="border">
        <div className="relative w-full">
          <img
            src={item.gallery[0]}
            alt=""
            className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <div className="absolute inset-0" />
        </div>
        <div className="mx-auto max-w-full p-4">
          <div className="group relative">
            <div className="flex justify-between">
              <div>
                <div className="font-bold text-base text-gray-700">
                  {item.pricingType.value === "Fixed"
                    ? `$${item.price}`
                    : item.pricingType.value}
                </div>
                <div className="text-sm text-gray-700">{item.title}</div>
              </div>
              <div className="text-sm font-semibold text-gray-600 text-right uppercase">
                <button
                  type="button"
                  className="rounded bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Contact
                </button>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">Location</p>
          </div>
        </div>
      </article>
    </div>
  );
}
