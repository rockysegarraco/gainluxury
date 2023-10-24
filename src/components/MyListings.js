import Card from "../components/Card.js";
export default function MyListings({ item, index }) {
  return (
    <>
      <Card
        key={index}
        Link={`/${item.category.value}/${item.slug}`}
        Title={item.title}
        ImageUrl={item.gallery}
        Alt={item.title}
        Price={
          item.pricingType.value === "Fixed"
            ? `$${item.price}`
            : item.pricingType.value
        }
        Location={item.address}
        avatar={item.avatar}
      />
    </>
  );
}
