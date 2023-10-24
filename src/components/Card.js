import { Link } from "react-router-dom";
import Carousel from "./Carousel/CarouselCard";
import { EnvelopeIcon } from "@heroicons/react/20/solid";

export default function Example(props) {
  return (
    <>
      <article className="border">
        <div className="relative w-full">
          <Carousel content={props.ImageUrl} link={props.Link} />
        </div>
        <div className="mx-auto max-w-full p-3">
          <div className="group relative">
            <div className="flex justify-between">
              <Link to={props.Link}>
                <div className="font-bold text-base text-black/100">
                  {props.Price}
                </div>
              </Link>
              <div>
                <button
                  className="rounded bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => (window.location = `mailto:${props.email}`)}
                >
                  <div className="flex">
                    <div className="mr-1">
                      <EnvelopeIcon className="h-4" />
                    </div>
                    <div>Contact</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex flex-grow justify-between mt-4">
              <div className="basis-3/4 mt-1 text-sm text-black/50">
                <span className="text-black font-semibold">{props.Title}</span>
                <br />
                {props.Location}
              </div>
              <div className="flex-none">
                <Link to="/">
                  <img
                    className="h-12 w-full aspect-square rounded-full"
                    src={props.avatar}
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
