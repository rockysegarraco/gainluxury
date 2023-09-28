import { UserProfile } from "@clerk/clerk-react";
import React from "react";

const Settings = () => {
  return (
    <div className="mx-auto max-w-[92%]">
      <h1 className="text-3xl my-4">Settings</h1>
      <UserProfile />
    </div>
  );
};

export default Settings;
