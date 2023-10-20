import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { useTitle } from "../utils";
import Heading from "../components/Heading";

const Login = () => {
  useTitle("Login");

  return (
    <>
      <Heading title="Log In" />
      <div className="flex">
        <div className="flex flex-1 items-center justify-center mt-16 lg:mt-24">
          <SignIn path="/login" signUpUrl="/signup" routing="path" />
        </div>
      </div>
    </>
  );
};

export default Login;
