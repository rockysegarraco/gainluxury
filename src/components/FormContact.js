import React from "react";
import { Widget } from "@typeform/embed-react";

const FormContact = () => {
  return (
    <>
      <h1 className="text-2xl lg:text-4xl fancy pb-8 mt-24 px-20">
        Contact Us
      </h1>
      <div className="py-16 px-6 lg:pt-0 lg:px-20">
        <Widget
          id="uHKwTrw0"
          style={{ width: "100%", height: "1000px" }}
          className="my-form"
        />
      </div>
    </>
  );
};

export default FormContact;
