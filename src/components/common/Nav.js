import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Searchbar from "../Dialog/Searchbar";
import CategoryDialog from "../Dialog/CategoryDialog";
import SubNav from "../SubNav";

export default function Navbar({ handleDrawerOpen }) {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handlePage = () => {
    navigate("/");
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,ms,de,ta,zh-CN,he", // include this for selected languages
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  return (
    <>
      <div className="bg-white border-b">
        <div className="mx-auto max-w-full px-4 lg:px-20">
          <div className="flex h-16 justify-between">
            <div className="flex px-2 lg:px-0">
              <div
                onClick={handleDrawerOpen}
                className="flex flex-shrink-0 items-center mr-4 cursor-pointer"
              >
                <Bars3Icon className="h-6" />
              </div>
              <div
                onClick={handlePage}
                className="flex flex-shrink-0 items-center cursor-pointer"
              >
                <img
                  className="h-6 w-auto"
                  src="/logo.svg"
                  alt="Your Company"
                />
              </div>
              <div className="hidden lg:block">
                <SubNav />
              </div>
            </div>
            {/*           <div className="lg:flex flex-1 hidden items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <Searchbar />
                          <div className="hidden lg:block">
                <div id="google_translate_element"></div>
              </div>
          </div> */}
            <div className="flex items-center">
              <button
                onClick={() => navigate("/pricing")}
                className="relative flex-shrink-0 rounded-full px-4 py-2 mr-2 text-sm text-black hover:bg-slate-100 hover:text-slate-800 hidden lg:block font-inter"
              >
                Pricing
              </button>
              <button
                onClick={() => setOpen(true)}
                className="relative flex-shrink-0 rounded-full px-4 py-2 mr-2 text-sm text-black hover:bg-slate-100 hover:text-slate-800 hidden lg:block font-inter"
              >
                Sell with us
              </button>
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/login" />
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-full border border-1 border-slate-950 px-4 py-2 mr-0 text-sm text-slate-950 hover:bg-white hover:text-slate-800 font-inter"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-full px-4 lg:px-20 py-2 bg-slate-100 hidden">
          <Searchbar />
        </div>
        <CategoryDialog open={open} handleClose={() => setOpen(false)} />
      </div>
    </>
  );
}
