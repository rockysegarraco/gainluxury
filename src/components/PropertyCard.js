import * as React from "react";
import Card from "../components/Card.js";
import { currencyFormat } from "../utils/index.js";

export default function PropertyCard({ item, i, from }) {
  return (
    <>
      <Card
        key={i}
        Link={`/${item.category?.value}/${item.slug}`}
        Title={item.title}
        ImageUrl={item.gallery}
        Alt={item.title}
        Price={
          item.priceType?.value === "Fixed"
            ? `${currencyFormat(item.price)}`
            : item.pricingType.value
        }
        Location={`${item.state?.value}, ${item.country?.value}`}
        email={item.email}
        avatar={item.avatar}
        userId={item.userId}
        from={from}
        status={item.status}
      />
    </>
  );
}
