import { ClerkProvider } from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
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
import AddMarine from "./routes/AddMarine";
import AddAviation from "./routes/AddAviation";
import AddArt from "./routes/AddArt";
import SuperUser from "./routes/SuperUser";
import UserListings from "./routes/UserListings";
import { useEffect } from "react";
import PropertyDetail from "./routes/PropertyDetail";
import Art from "./routes/art";
import MarineDetail from "./routes/MarineDetail";
import AviationDetail from "./routes/AviationDetail";
import ArtDetail from "./routes/ArtDetail";
import Contact from "./routes/Contact";
import Terms from "./routes/Terms";
import EditProperty from "./routes/EditProperty";
import EditMarine from "./routes/EditMarine";
import EditAviation from "./routes/EditAviation";
import EditArt from "./routes/EditArt";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Drawer routes */}
          <Route index element={<Home path="/home" />} />
          <Route
            path="/home/realestate"
            element={<RealEstate path="/home/realestate" />}
          />
          <Route path="/home/cars" element={<Cars path="/home/cars" />} />
          <Route path="/home/marine" element={<Marine path="/home/marine" />} />
          <Route
            path="/home/aviation"
            element={<Aviator path="/home/aviation" />}
          />
          <Route path="/home/arts" element={<Art path="/home/arts" />} />
          <Route path="/settings" element={<Settings path="/settings" />} />
          <Route path="/my-post" element={<MyPost path="/my-post" />} />
          <Route path="/aviation/:slug" element={<AviationDetail />} />
          <Route path="/arts/:slug" element={<ArtDetail />} />
          <Route path="/cars/:slug" element={<PostDetail />} />
          <Route path="/contact" element={<Contact path="/contact" />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/marine/:slug" element={<MarineDetail />} />
          <Route path="/listings/:uid" element={<UserListings />} />
          <Route path="/contact" element={<Contact path="/contact" />} />
          <Route path="/success" element={<Success path="/success" />} />
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
          path="/create-marine-post"
          element={<AddMarine path="/create-marine-post" />}
        />
        <Route
          path="/create-aviation-post"
          element={<AddAviation path="/create-aviation-post" />}
        />
        <Route
          path="/create-art-post"
          element={<AddArt path="/create-art-post" />}
        />
        <Route
          path="/edit-post/:slug"
          element={<EditPost path="/edit-post" />}
        />
        <Route
          path="/edit-property/:slug"
          element={<EditProperty path="/edit-property" />}
        />
        <Route
          path="/edit-marine/:slug"
          element={<EditMarine path="/edit-marine" />}
        />
        <Route
          path="/edit-aviation/:slug"
          element={<EditAviation path="/edit-aviation" />}
        />
        <Route
          path="/edit-arts/:slug"
          element={<EditArt path="/edit-arts" />}
        />
        <Route path="/edit-art/:slug" element={<EditArt path="/edit-art" />} />
        <Route path="/cancel" element={<Cancel path="/cancel" />} />
        <Route path="/login" element={<Login path="/login" />} />
        <Route path="/signup" element={<Register path="/signup" />} />
        <Route path="/pricing" element={<Pricing path="/pricing" />} />
        <Route path="/terms" element={<Terms path="/terms" />} />
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
