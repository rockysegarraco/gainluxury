export default function Example(props) {
  return (
    <>
      <article className="border">
        <div className="relative w-full">
          <img
            src={props.ImageUrl}
            alt={props.Alt}
            className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <div className="absolute inset-0" />
        </div>
        <div className="mx-auto max-w-full p-3">
          <div className="group relative">
            <div className="flex justify-between">
              <div>
                <div className="font-bold text-base text-black/100">
                  {props.Price}
                </div>
                <div className="text-sm text-black/75">
                  <a href={props.Link}>
                    {props.Title}
                    <span aria-hidden="true" className="absolute inset-0" />
                  </a>
                </div>
              </div>
              <div>
                <button
                  className="rounded bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() =>
                    (window.location = "mailto:rockysegarra@icloud.com")
                  }
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
