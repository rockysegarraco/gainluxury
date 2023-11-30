const navigation = {
  solutions: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Real Estate", href: "/home/realestate" },
    { name: "Cars", href: "/home/cars" },
    { name: "Marine", href: "/home/marine" },
    { name: "Aviation", href: "/home/aviation" },
    { name: "Art", href: "/home/arts" },
  ],
  company: [{ name: "Pricing", href: "/pricing" }],
  legal: [
    {
      name: "Privacy Policy",
      href: "https://www.iubenda.com/privacy-policy/47904645",
    },
    {
      name: "Cookie Policy",
      href: "https://www.iubenda.com/privacy-policy/47904645/cookie-policy",
    },
  ],
  social: [],
};

export default function Example() {
  return (
    <footer className="bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-[90%] px-6 pb-8 pt-16 sm:pt-24 lg:px-0 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img src="logo-dark.svg" className="h-8" />
            <div className="flex space-x-6">
              {navigation.social.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-400"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase">
                  GainLuxury
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.solutions.map((item, i) => (
                    <li key={i}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-xs font-semibold leading-6 text-white uppercase">
                  Categories
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.support.map((item, i) => (
                    <li key={i}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-semibold leading-6 text-white uppercase">
                  Company
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.company.map((item, i) => (
                    <li key={i}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-xs font-semibold leading-6 text-white uppercase">
                  Legal
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.legal.map((item, i) => (
                    <li key={i}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; 2023 Gain Luxury, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
