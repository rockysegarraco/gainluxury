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
import Profile from "./routes/profile";
import AddPost from "./routes/AddPost";
import Success from "./routes/success";
import Cancel from "./routes/cancel";
import User from "./routes/user";

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
                <Home />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        ></Route>
        <Route path="/profile" element={<Profile path="/profile" />} />
        <Route path="/create-post" element={<AddPost path="/create-post" />} />
        <Route path="/success" element={<Success path="/success" />} />
        <Route path="/cancel" element={<Cancel path="/cancel" />} />
        <Route path="/user" element={<User path="/user" />} />
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
