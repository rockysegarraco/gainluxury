import CardCar from "./cardCar.js";

export default function RecentListings({ post, selected }) {
  return (
    <div className="section">
      <div className="mx-auto max-w-full lg:px-20 px-6">
        <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {post.length > 0 ? (
            post.map((item, index) => (
              <CardCar key={index} item={item} i={index} />
            ))
          ) : (
            <span>No {selected} listing found</span>
          )}
        </div>
      </div>
    </div>
  );
}
