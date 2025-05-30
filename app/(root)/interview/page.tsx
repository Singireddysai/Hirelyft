import React from "react";
import Agent from "@/components/Agent/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Image from "next/image";
import FadeInAnimation from "@/components/animations/FadeIn";

const page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <FadeInAnimation>
        <div className="px-[5%] md:px-[22%] mt-16 flex justify-between items-center">
          <h3 className=" font-[600] tracking-[1px] text-4xl  flex items-center py-[1rem]  group">
            <span className="font-bold bg-gradient-to-r mr-1 from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Generate
            </span>{" "}
            Interview{" "}
            <Image
              src={"/arrow.svg"}
              alt="arrow"
              height={32}
              width={32}
              className="transition-transform duration-300 ease-in-out group-hover:translate-x-2"
            />
          </h3>
        </div>

        <Agent userName={user?.name!} userId={user?.id} type="generate" />
      </FadeInAnimation>
    </>
  );
};

export default page;
