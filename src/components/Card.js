import { Link } from "react-router-dom";
import Carousel from "./Carousel/CarouselCard";

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
                <div className="text-sm text-black/75">
                  {props.Title}
                  {/* <span aria-hidden="true" className="absolute inset-0" /> REmove this line */}
                </div>
              </Link>
              <div>
                <button
                  className="rounded bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => (window.location = `mailto:${props.email}`)}
                >
                  Contact
                </button>
              </div>
            </div>
            <p className="mt-1 text-sm text-black/50">{props.Location}</p>
          </div>
        </div>
      </article>
    </>
  );
}
