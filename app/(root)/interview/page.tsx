import React from "react";
import Agent from "@/components/Agent/Agent";
const page = () => {
  return (
    <>
      <h3 className="font-900 tracking-[1px] text-2xl flex py-[1rem] px-[2rem] md:px-[4rem]">
        Interview Generation
      </h3>
      <Agent userName="You" userId="user1" type="generate" />
    </>
  );
};

export default page;
