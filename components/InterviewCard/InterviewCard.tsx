import React from "react";
import dayjs from "dayjs";
import "./InterviewCard.css";
import Image from "next/image";
import Link from "next/link";
import { getInterviewCover, getRandomInterviewCover } from "@/lib/utils";
import { Button } from "../ui/button";
import DisplayTechIcons from "../DisplayTechIcons/DisplayTechIcons";
import { getFeedbackById } from "@/lib/actions/general.action";

const InterviewCard = async ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && id ? await getFeedbackById({ interviewId: id, userId }) : null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D ,YYYY");

  return (
    <div className="p-0.5 rounded-[20px] bg-gradient-to-b from-[#444242] to-[#1b1a1a]">
      <div className=" rounded-[20px] bg-gradient-to-b from-[#1b1a1a] to-black w-[320px] h-[340px] max-sm:w-full">
        <div className="relative p-3 flex flex-col gap-2">
          <div className="absolute top-1 right-1 px-3 py-1.5 bg-neutral-800 rounded-full text-purple-400 font-medium">
            <p className="font-bold capitalize">{normalizedType}</p>
          </div>
          <Image
            className="rounded-full"
            src={getInterviewCover(role)}
            alt="cover-image"
            width={80}
            height={80}
          />
          <h3 className="text-xl font-bold mt-6 capitalize">
            {role} Interview
          </h3>
          <div className="flex gap-1 text-white">
            <Image
              src={"/calendar.svg"}
              alt="calender-logo"
              height={22}
              width={22}
            />
            {formattedDate}
            <div className="flex gap-1">
              <Image
                src={"/star.png"}
                alt="star-logo"
                width={22}
                height={22}
                className="ml-2 rounded-full"
              />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You've not yet taken any interviews! Start an interview to get feedback"}
          </p>
          <div className="flex justify-between items-center mt-8">
            <DisplayTechIcons techStack={techstack} />
            <Button
              asChild
              className="px-3 py-1 border-2 border-purple-400 text-purple-400 font-bold rounded-full transition duration-300 ease-in-out hover:bg-purple-400 hover:text-white"
            >
              <Link
                href={
                  feedback ? `/interview/${id}/feedback` : `/interview/${id}`
                }
              >
                {feedback ? "Check Feedback" : "View interview"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
