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
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://img.jamesedition.com/listing_images/2023/09/22/12/50/23/37e5400f-c693-45dd-a0de-4fce82764c98/je/2200xxs.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$8,276,007",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://www.jamesedition.com/stories/wp-content/uploads/2023/10/Zoe-Saldana-hero.webp",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$8,276,007",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://www.jamesedition.com/stories/wp-content/uploads/2023/10/Zoe-Saldana-hero.webp",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$8,276,007",
    color: "Black",
  },
  {
    id: 4,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://www.jamesedition.com/stories/wp-content/uploads/2023/10/Zoe-Saldana-hero.webp",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$8,276,007",
    color: "Black",
  },
  // More products...
];

export default function Example() {
  return (
    <div className="section">
      <div className="mx-auto max-w-[90%]">
        <div className="mx-auto max-w-full">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl fancy">
            Featured Listings
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
