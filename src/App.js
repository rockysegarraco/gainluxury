import Page from "./components/page.js";
import Container from "./components/container.js";
import Select from "./components/Select.js";
import Breadcrumb from "./components/Breadcrumb";

function App() {
  return (
    <>
      <div className="border-b">
        <Breadcrumb />
        <div className="mx-auto max-w-[90%] flex py-3 gap-2">
          <Select name="Type" />
          <Select name="Price" />
          <Select name="Beds" />
        </div>
      </div>
      <Container>
        <div className="py-6">Real Estate / ...</div>
        <h1 className="text-4xl">Real Estate for Sale "#Location"</h1>
        <div className="grid grid-cols-3 mt-16">
          <div>
            <div className="max-w-sm bg-white border">
              <a href="#">
                <img
                  src="https://img.jamesedition.com/listing_images/2023/07/14/20/40/43/c3019525-1dab-4793-a29e-9bf823b57e9d/je/556x342xcxm.jpg"
                  alt=""
                />
              </a>
              <div className="p-5">
                <p className="mb-1 font-bold text-sm text-gray-400 uppercase">
                  <a href="/">House</a>
                </p>
                <a href="#">
                  <div className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                    $3,850,000
                  </div>
                </a>
                <p className="mb-1 font-normal text-base text-gray-900">
                  7 Beds • 8 Baths • 8751 Sqft
                </p>
                <p className="mb-4 font-normal text-base text-gray-400">
                  Orlando, Florida, United States
                </p>
                <div class="bg-gray-50 px-0 py-0 sm:rounded-lg sm:p-0 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                  <dl class="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                    <div class="flex justify-between pt-0 font-medium text-gray-900 md:block md:pt-0">
                      <div class="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                          alt="Emily Selman."
                          class="h-10 w-10 rounded-full"
                        />
                        <div class="ml-4">
                          <span class="text-sm font-normal text-gray-900">
                            Emily Selman
                          </span>
                        </div>
                      </div>
                    </div>
                  </dl>
                  <div class="mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                    <a
                      href="#"
                      class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
                    >
                      Contact
                      <span class="sr-only">for order WU88191111</span>
                    </a>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div>1</div>
          <div>1</div>
        </div>
      </Container>
    </>
  );
}

export default App;
