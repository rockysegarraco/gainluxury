import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./routes/home";
import AddPost from "./routes/AddPost";
import Success from "./routes/success";
import Cancel from "./routes/cancel";
import MainLayout from './components/common/MainLayout';
import Settings from "./routes/Settings";
import RealEstate from './routes/realestate';
import Cars from "./routes/cars";
import Marine from './routes/marine';
import Aviator from './routes/aviator';
import MyPost from "./routes/MyPost";
import PostDetail from "./routes/PostDetail";
import EditPost from "./routes/EditPost";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <MainLayout />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        >

          {/* Drawer routes */}
          <Route index element={<Home path="/home" />} />
          <Route path="/home/real-estate" element={<RealEstate path="/home/real-estate" />} />
          <Route path="/home/cars" element={<Cars path="/home/cars" />} />
          <Route path="/home/marine" element={<Marine path="/home/marine" />} />
          <Route path="/home/aviation" element={<Aviator path="/home/aviation" />} />
          <Route path="/settings" element={<Settings path="/settings" />} />
          <Route path="/my-post" element={<MyPost path="/my-post" />} />
          <Route path="/aviation/:slug" element={<PostDetail />} />
          <Route path="/cars/:slug" element={<PostDetail />} />
          <Route path="/property/:slug" element={<PostDetail />} />
          <Route path="/yatch/:slug" element={<PostDetail />} />

        </Route>

        {/* Global routes */}
        <Route path="/create-post" element={<AddPost path="/create-post" />} />
        <Route path="/edit-post/:slug" element={<EditPost path="/edit-post" />} />
        <Route path="/success" element={<Success path="/success" />} />
        <Route path="/cancel" element={<Cancel path="/cancel" />} />


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
