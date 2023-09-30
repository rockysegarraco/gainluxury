import { SignUp } from "@clerk/clerk-react";
import React from "react";
import Heading from "../components/Heading";

const Register = () => {
  return (
    <>
      <Heading />
      <div className="flex">
        <div className="flex flex-1 items-center justify-center mt-16 lg:mt-24">
          <SignUp />
        </div>
      </div>
    </>
  );
};

export default Register;
