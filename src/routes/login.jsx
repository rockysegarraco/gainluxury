import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { useTitle } from "../utils";
import Headings from "../components/Headings";

const Login = () => {
  useTitle("Login");

  return (
    <>
      <Headings />
      <div className="flex h-screen">
        <div className="flex flex-1 items-center justify-center">
          <SignIn path="/login" signUpUrl="/signup" routing="path" />
        </div>
        <div className="flex flex-1 items-center justify-center bg-slate-500">
          Add your design here
        </div>
      </div>
    </>
  );
};

export default Login;
