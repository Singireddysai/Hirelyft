import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import Image from "next/image";
import React from "react";
import { getInterviewCover, getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "@/components/DisplayTechIcons/DisplayTechIcons";
import Agent from "@/components/Agent/Agent";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const interview = await getInterviewById(id);
  const user = await getCurrentUser();

  if (!interview) redirect("/");
  return (
    <>
      <div className="flex flex-row gap-4 justify-between items-center px-[10%] md:px-[21%]">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col ">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getInterviewCover(interview.role)}
              alt="cover-image"
              height={70}
              width={70}
              className="rounded-full object-cover size-[70px]"
            />
            <h3 className="capitalize text-xl md:text-3xl  font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                {interview.role}
              </span>{" "}
              Interview
            </h3>
            <p className="bg-neutral-800 px-4 py-2 rounded-lg h-fit font-bold capitalize">
              {interview.type}
            </p>
          </div>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
      </div>
      <Agent
        userName={user?.name || ""}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
      />
    </>
  );
};

export default page;
