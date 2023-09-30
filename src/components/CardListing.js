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

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[90%] px-0 py-8 sm:px-6 sm:py-8 lg:max-w-[90%] lg:px-0">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-1 p-4">
                <h3 className="text-3xl font-bold text-gray-900">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="text-2xl font-medium text-gray-900">
                  {product.price}
                </p>
                <p className="text-base font-medium text-gray-900">
                  {product.location}
                </p>
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-base text-gray-500">{product.options}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
