import { SignUp } from "@clerk/clerk-react";
import React from "react";
import Heading from "../components/Heading";

const Register = () => {
  return (
    <>
      <div className="mx-auto max-w-8xl lg:p-6 p-3">
        <Heading title="Sign Up">
          <div className="flex">
            <div className="flex flex-1 items-center justify-center lg:py-16 py-8">
              <SignUp />
            </div>
          </div>
        </Heading>
      </div>
    </>
  );
};

export default Register;
