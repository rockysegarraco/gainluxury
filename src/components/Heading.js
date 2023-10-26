import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Example(props) {
  const { children } = props; // Destructure 'children' from 'props'
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <style>{"body { background-color: #f5f5f7; }"}</style>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6 font-bold text-xl">
          <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="fancy text-2xl">{props.title}</div>
            <div className="flex-shrink-0">
              <button
                onClick={goBack}
                type="button"
                className="relative inline-flex items-center bg-[#F2F2F2] rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-gray-200"
              >
                <XMarkIcon
                  className="h-5 w-5 text-gray-900"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">{children}</div>
      </div>
    </>
  );
}
