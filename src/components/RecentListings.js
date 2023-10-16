import CardCar from "./cardCar.js";

export default function RecentListings({ post }) {



  return (
    <div className="section">
      <div className="mx-auto max-w-[90%]">
        <div className="mx-auto max-w-full">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl fancy">
            Recent Listings
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {post.map((item, index) => (
            <CardCar key={index} item={item} i={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
