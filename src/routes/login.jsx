import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { useTitle } from "../utils";
import Heading from "../components/Heading";

const Login = () => {
  useTitle("Login");

  return (
    <>
      <div className="mx-auto max-w-8xl lg:p-6 p-3">
        <Heading title="Sign In">
          <div className="flex">
            <div className="flex flex-1 items-center justify-center lg:py-16 py-8">
              <SignIn path="/login" signUpUrl="/signup" routing="path" />
            </div>
          </div>
        </Heading>
      </div>
    </>
  );
};

export default Login;
