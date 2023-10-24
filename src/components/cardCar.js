import * as React from "react";
import Card from "../components/Card.js";

export default function CardCar({ item, i }) {
  return (
    <>
      <Card
        key={i}
        Link={`/${item.category.value}/${item.slug}`}
        Title={item.title}
        ImageUrl={item.gallery}
        Alt={item.title}
        Price={
          item.pricingType.value === "Fixed"
            ? `$${item.price}`
            : item.pricingType.value
        }
        Location={`${item.state?.value}, ${item.country?.value}`}
        email={item.email}
        avatar={item.avatar}
      />
    </>
  );
}
