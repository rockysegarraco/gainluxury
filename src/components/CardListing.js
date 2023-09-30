/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
  {
    id: 1,
    name: "2023 Bugatti Chiron",
    location: "Atlanta, Georgia, United States",
    href: "#",
    price: "$256",
    options: "Edit",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
    imageAlt: "Name of Photo",
  },
  // More products...
];

export default function Example({item, index}) {
  return (
    <div
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <img
                  src={item.gallery[0]}
                  alt={index}
                  className="h-full w-full object-fill sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-1 p-4">
                <h3 className="text-3xl font-bold text-gray-900">
                  <a href={`/${item.category.value}/${item.slug}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.title}
                  </a>
                </h3>
                <p className="text-2xl font-medium text-gray-900">
                  {item.price}
                </p>
                <p className="text-base font-medium text-gray-900">
                  {item.state.value}
                </p>
              </div>
            </div>
  );
}
