import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Example() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="py-4">
      <div className="mx-auto max-w-full lg:px-20 px-6">
        <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="">
            <img className="h-14 w-auto" src="/mark.svg" alt="Gain Luxury" />
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={goBack}
              type="button"
              className="relative inline-flex items-center bg-[#F2F2F2] rounded-md px-4 py-4 text-sm text-gray-900 hover:bg-gray-200"
            >
              <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
