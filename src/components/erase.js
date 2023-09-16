import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  BookOpenIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

const engagement = [
  { name: "About", href: "#", icon: InformationCircleIcon },
  { name: "Customers", href: "#", icon: UsersIcon },
  { name: "Press", href: "#", icon: NewspaperIcon },
  { name: "Careers", href: "#", icon: BriefcaseIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];
const resources = [
  { name: "Community", href: "#", icon: UserGroupIcon },
  { name: "Partners", href: "#", icon: GlobeAltIcon },
  { name: "Guides", href: "#", icon: BookOpenIcon },
  { name: "Webinars", href: "#", icon: VideoCameraIcon },
];
const recentPosts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    date: "Mar 16, 2023",
    datetime: "2023-03-16",
    category: { title: "Marketing", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    description:
      "Et et dolore officia quis nostrud esse aute cillum irure do esse. Eiusmod ad deserunt cupidatat est magna Lorem.",
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    date: "Mar 10, 2023",
    datetime: "2023-03-10",
    category: { title: "Sales", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et.",
  },
];

export default function Example() {
  return (
    <Popover className="relative isolate z-50 shadow">
      <div className="bg-white py-5">
        <div className="px-6 lg:px-8">
          <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            Solutions
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </Popover.Button>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Panel className="absolute inset-x-0 top-0 -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5 bg-slate-900">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-2 lg:px-8">
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
              <div>
                <h3 className="text-sm font-medium leading-6 text-gray-500">
                  Engagement
                </h3>
                <div className="mt-6 flow-root">
                  <div className="-my-2">
                    {engagement.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                      >
                        <item.icon
                          className="h-6 w-6 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium leading-6 text-gray-500">
                  Resources
                </h3>
                <div className="mt-6 flow-root">
                  <div className="-my-2">
                    {resources.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                      >
                        <item.icon
                          className="h-6 w-6 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
              <h3 className="sr-only">Recent posts</h3>
              {recentPosts.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                ></article>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
