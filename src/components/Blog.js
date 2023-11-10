const posts = [
  {
    id: 1,
    title: "The State of Bugatti",
    href: "https://blog.gainluxury.com/the-state-of-bugatti/",
    description:
      "Bugatti is a name that has long been synonymous with unparalleled luxury and unrivaled performance in the…",
    imageUrl:
      "https://blog.gainluxury.com/wp-content/uploads/2023/11/tim-meyer-AsT9Dt11FkA-unsplash-1536x1024.jpg",
    date: "Nov 10, 2023",
    datetime: "2023-11-10",
    category: {
      title: "Cars",
      href: "https://blog.gainluxury.com/category/cars/",
    },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "Mastering the Art of Selling Art",
    href: "https://blog.gainluxury.com/mastering-the-art-of-selling-art/",
    description:
      "In the realm of artistic creation, there’s a bridge that often poses a challenge—selling art. The process of…",
    imageUrl:
      "https://blog.gainluxury.com/wp-content/uploads/2023/11/ryan-stefan-5K98ScREEUY-unsplash-380x250.jpg",
    date: "Nov 10, 2023",
    datetime: "2023-11-10",
    category: {
      title: "Art",
      href: "https://blog.gainluxury.com/category/art/",
    },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "Navigating the Skies of Aviation Buying",
    href: "https://blog.gainluxury.com/navigating-the-skies-of-aviation-buying/",
    description:
      "The aviation industry is an intricate web of technology, innovation, and high-stakes investments.",
    imageUrl:
      "https://blog.gainluxury.com/wp-content/uploads/2023/11/yaroslav-muzychenko-cp3hc2N39WA-unsplash-380x250.jpg",
    date: "Nov 10, 2023",
    datetime: "2023-11-10",
    category: {
      title: "Aviation",
      href: "https://blog.gainluxury.com/category/aviation/",
    },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 4,
    title: "A Comprehensive Guide to Buying a Boat",
    href: "https://blog.gainluxury.com/charting-your-course-a-comprehensive-guide-to-buying-a-boat/",
    description:
      "The allure of the open waters, the freedom of exploration, and the promise of adventure beckon to…",
    imageUrl:
      "https://blog.gainluxury.com/wp-content/uploads/2023/11/canada-380x250.jpg",
    date: "Nov 10, 2023",
    datetime: "2023-11-10",
    category: {
      title: "Marine",
      href: "https://blog.gainluxury.com/category/marine/",
    },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function Example() {
  return (
    <div className="bg-slate-200 py-16">
      <div className="mx-auto max-w-full px-6 lg:px-20">
        <div className="mx-auto max-w-full">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl fancy">
            From the blog
          </h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-2xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600 fancy">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 font-inter">
                    {post.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
