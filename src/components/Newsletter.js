/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
  return (
    <div className="pt-8 pb-16">
      <div className="mx-auto grid max-w-[90%] grid-cols-1 gap-10 px-0 lg:grid-cols-12 lg:gap-8 border-t pt-8">
        <div className="max-w-full text-3xl font-bold text-gray-900 sm:text-4xl lg:col-span-8">
          <h2 className="inline sm:block lg:inline xl:block fancy">
            Want product news and updates?
          </h2>{" "}
          <p className="inline sm:block lg:inline xl:block fancy">
            Sign up for our newsletter.
          </p>
        </div>
        <form className="w-full lg:col-span-4 lg:pt-2">
          <div className="flex">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
          </div>
          <div className="py-3">
            <button
              type="submit"
              className="flex-none bg-slate-900 px-3.5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
            >
              Subscribe
            </button>
          </div>
          <p className="text-sm leading-6 text-gray-900">
            We care about your data. Read our{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              privacy&nbsp;policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
