import { UserProfile } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useDispatch } from "react-redux";
//
import FullScreenDialog from "../components/Dialog/FullScreenDialog";
import { setPrice } from "../store/addPostSlice";
//
import Header from "../components/header";

const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(false);
  };

  const setItems = (item) => {
    setOpen(false);
    dispatch(setPrice(item));
    navigate("/create-post");
  };

  // In case the user signs out while on the page.
  if (!isLoaded || !isSignedIn) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl p-24 gap-0">
        <div>
          <div className="flex">
            <div>
              <img
                className="inline-block h-24 w-24 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-2xl font-medium text-gray-700 group-hover:text-gray-900">
                Tom Cook
              </p>
              <p className="text-lg font-medium text-gray-500 group-hover:text-gray-700">
                brandalist@gmail.com
              </p>
              <div className="py-4">
                <button
                  type="button"
                  className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 relative">
        <UserProfile />
        <Tooltip title="Add Post" placement="right">
          <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <FullScreenDialog open={open} setOpen={handleOpen} setItem={setItems} />
      </div>
    </>
  );
};
export default Profile;
