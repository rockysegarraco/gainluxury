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
    name: "Luxury Mansion In Front Of The Sea, Javea Costa Blanca Spain | 2.300m2 House · Heliport Licence",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3550&q=80",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$8,276,007",
    location: "Atlanta, Georgia, USA",
  },
  {
    id: 2,
    name: "Luxury Mansion In Front Of The Sea, Javea Costa Blanca Spain | 2.300m2 House · Heliport Licence",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1512914890251-2f96a9b0bbe2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3542&q=80",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$2,236,000",
    location: "Atlanta, Georgia, USA",
  },
  {
    id: 3,
    name: "2018 Bugatti Chiron awd",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1562141960-c9a127257324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "Price on Request",
    location: "Atlanta, Georgia, USA",
  },
  {
    id: 4,
    name: "2018 Bugatti Chiron awd",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1566023999520-4e2232ec65d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3449&q=80",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "Price on Request",
    location: "Atlanta, Georgia, USA",
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
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 h-80">
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
                  <p className="mt-1 text-sm text-gray-500">
                    {product.location}
                  </p>
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
