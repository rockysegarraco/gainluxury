const posts = [
  {
    id: 1,
    title: "Real Estate",
    href: "#",
    imageUrl: "img/featuredImages/ryan-parker-ucnZANGmyxM-unsplash.jpg",
    listings: "(#)",
  },
  {
    id: 2,
    title: "Cars",
    href: "#",
    imageUrl: "img/featuredImages/vlad-grebenyev-WylEpB8ODgw-unsplash.jpg",
    listings: "(#)",
  },
  {
    id: 3,
    title: "Marine",
    href: "#",
    imageUrl: "img/featuredImages/super-straho-sql39w5NXN8-unsplash.jpg",
    listings: "(#)",
  },
  {
    id: 4,
    title: "Aviation",
    href: "#",
    imageUrl: "img/featuredImages/jakob-rosen-SU8yDgHIb0U-unsplash.jpg",
    listings: "(#)",
  },
];

export default function Example() {
  return (
    <div className="section">
      <div className="mx-auto max-w-[90%]">
        <div className="mx-auto max-w-full">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl fancy">
            Featured Categories
          </h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-full auto-rows-fr grid-cols-2 gap-4 lg:gap-8 sm:mt-8 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden bg-gray-900 px-8 pb-8 pt-24 sm:pt-48 lg:pt-80"
            >
              <img
                src={post.imageUrl}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10" />
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                Listings {post.listings}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
