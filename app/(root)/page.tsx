import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard/InterviewCard";
import {
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

import { getCurrentUser } from "@/lib/actions/auth.action";
const page = async () => {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = latestInterviews?.length! > 0;
  return (
    <>
      <section className="px-4 md:px-[10%] mt-16 py-1 flex flex-col-reverse lg:flex-row items-center gap-8">
        <div className="card-cta !border-none flex flex-col lg:flex-row items-center">
          <div className="flex flex-col gap-3 max-w-2xl">
            <h3 className="text-5xl font-[700]">
              Prepare for interviews & get feedback, with{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Assistant
            </h3>
            <p className="text-lg text-purple-300 mt-4 font-[600]">
              Level up your interview game with smart AI practice sessions
              tailored only for you and detailed feedback.
            </p>
            <div className="flex gap-4 flex-col mt-8 md:flex-row md:gap-8">
              <Button
                asChild
                className="max-sm:w-full w-[12em] font-[600] py-4 text-2xl rounded-full text-white bg-purple-600 mt-4 transition duration-200 ease-in-out hover:bg-[#8655c3]  hover:text-white"
              >
                <Link className="text-[var(--col2)]" href="/interview">
                  View Interviews
                </Link>
              </Button>
              <Button
                asChild
                className="group max-sm:w-full w-[12em] font-[600] py-4 text-2xl rounded-full border-2 border-pink-500 mt-4 transition duration-200 ease-in-out hover:bg-pink-500 hover:text-white"
              >
                <Link
                  href="/interview"
                  className="flex items-center justify-center gap-2  text-white"
                >
                  Start Interview
                  <Image
                    src="/arrow.svg"
                    alt="arrow"
                    height={32}
                    width={32}
                    className="transition-transform duration-300 -ml-3 ease-in-out group-hover:translate-x-1 relative top-[2px]"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8 px-[4rem] pt-[6rem]">
        <h2 className="text-2xl font-bold">Your Interviews</h2>
        <div className="flex flex-wrap gap-8">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8 mb-8 px-[4rem] pt-[6rem]">
        <h2 className="text-2xl font-bold">Take An Interview</h2>
        <div className="flex flex-wrap gap-8">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There arent&apos;t any new interviews yet</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
