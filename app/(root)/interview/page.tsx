import React from "react";
import Agent from "@/components/Agent/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
const page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3 className="font-900 tracking-[1px] text-2xl flex py-[1rem] px-[2rem] md:px-[4rem]">
        Interview Generation
      </h3>
      <Agent userName={user?.name!} userId={user?.id} type="generate" />
    </>
  );
};

export default page;
