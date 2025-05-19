import React from "react";
import dayjs from "dayjs";
import "./InterviewCard.css";
import Image from "next/image";
import Link from "next/link";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "../ui/button";
import DisplayTechIcons from "../DisplayTechIcons/DisplayTechIcons";

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D ,YYYY");

  return (
    <div className="card">
      <div className=" interview-card w-[360px] h-[380px] max-sm:w-full">
        <div className="relative p-2 flex flex-col gap-2">
          <div className="absolute top-1 right-1 interview-type">
            <p>{normalizedType}</p>
          </div>
          <Image
            className="rounded-full"
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={70}
            height={70}
          />
          <h3 className="text-xl font-bold mt-6">{role} Interview</h3>
          <div className="flex gap-1 text-[var(--col4)]">
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
              className="px-3 py-1 border-2 border-[var(--col3)] text-[var(--col3)] font-bold rounded-full transition duration-300 ease-in-out hover:bg-[var(--col3)] hover:text-white"
            >
              <Link
                href={
                  feedback
                    ? `/interview/${interviewId}/feedback`
                    : `/interview/${interviewId}`
                }
              >
                {feedback ? "View feedback" : "View interview"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
