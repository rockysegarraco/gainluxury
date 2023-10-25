import { ClerkProvider } from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./routes/home";
import Pricing from "./routes/Pricing";
import AddPost from "./routes/AddPost";
import Success from "./routes/success";
import Cancel from "./routes/cancel";
import MainLayout from "./components/common/MainLayout";
import Settings from "./routes/Settings";
import RealEstate from "./routes/realestate";
import Cars from "./routes/cars";
import Marine from "./routes/marine";
import Aviator from "./routes/aviator";
import MyPost from "./routes/MyPost";
import PostDetail from "./routes/PostDetail";
import EditPost from "./routes/EditPost";
import Login from "./routes/login";
import Register from "./routes/Register";
import AddProperty from "./routes/AddProperty";
import SuperUser from "./routes/SuperUser";
import UserListings from "./routes/UserListings";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Drawer routes */}
          <Route index element={<Home path="/home" />} />
          <Route
            path="/home/real-estate"
            element={<RealEstate path="/home/real-estate" />}
          />
          <Route path="/home/cars" element={<Cars path="/home/cars" />} />
          <Route path="/home/marine" element={<Marine path="/home/marine" />} />
          <Route
            path="/home/aviation"
            element={<Aviator path="/home/aviation" />}
          />
          <Route path="/settings" element={<Settings path="/settings" />} />
          <Route path="/my-post" element={<MyPost path="/my-post" />} />
          <Route path="/aviation/:slug" element={<PostDetail />} />
          <Route path="/cars/:slug" element={<PostDetail />} />
          <Route path="/property/:slug" element={<PostDetail />} />
          <Route path="/yatch/:slug" element={<PostDetail />} />
          <Route path="/listings/:uid" element={<UserListings />} />
        </Route>

        {/* Global routes */}
        <Route
          path="/create-car-post"
          element={<AddPost path="/create-car-post" />}
        />
        <Route
          path="/create-property-post"
          element={<AddProperty path="/create-property-post" />}
        />
        <Route
          path="/edit-post/:slug"
          element={<EditPost path="/edit-post" />}
        />
        <Route path="/success" element={<Success path="/success" />} />
        <Route path="/cancel" element={<Cancel path="/cancel" />} />
        <Route path="/login" element={<Login path="/login" />} />
        <Route path="/signup" element={<Register path="/signup" />} />
        <Route path="/pricing" element={<Pricing path="/pricing" />} />
        <Route path="/super-user" element={<SuperUser path="/super-user" />} />
      </Routes>
    </ClerkProvider>
  );
}

function Routers() {
  return (
    <Router>
      <ClerkProviderWithRoutes />
    </Router>
  );
}

export default Routers;
