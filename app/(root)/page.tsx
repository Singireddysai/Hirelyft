import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard/InterviewCard";
import HeroFadeInAnimation from "@/components/animations/HeroAnimation";
import {
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import InterviewCardAnimation from "@/components/animations/InterviewCardAnimation";
import FadeInAnimation from "@/components/animations/FadeIn";

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
      <section className="px-4 md:px-[10%] mt-22 py-1 flex flex-col-reverse lg:flex-row items-center gap-8">
        <HeroFadeInAnimation>
          <div className="card-cta !border-none flex flex-col lg:flex-row items-center">
            <div className="flex flex-col gap-3 max-w-4xl">
              <h3 className="hero-animation text-5xl md:text-6xl font-[700]">
                Prepare for your interviews & get feedback, with{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  AI-Powered
                </span>{" "}
                Assistant
              </h3>
              <p className="hero-animation text-xl text-purple-300 mt-4 font-[600]">
                Level up your interview game with smart AI practice sessions
                tailored only for you and get detailed feedback.
              </p>
              <div className="hero-animation flex gap-4 flex-col mt-8 md:flex-row md:gap-8">
                <Button
                  asChild
                  className="max-sm:w-full w-[12em] font-[600] py-5 text-2xl rounded-full text-white bg-purple-600 mt-4 transition duration-200 ease-in-out hover:bg-[#8545d3]  hover:text-white"
                >
                  <Link
                    className="text-[var(--col2)]"
                    href="/latest-interviews"
                  >
                    View Interviews
                  </Link>
                </Button>
                <Button
                  asChild
                  className="group max-sm:w-full w-[12em] font-[600] py-5 text-2xl rounded-full border-2 border-pink-500 mt-4 transition duration-200 ease-in-out hover:bg-pink-500 hover:text-white"
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
            <FadeInAnimation>
              <div className="fade-appear opacity-0 relative w-[300px] h-[350px] ml-30 hidden md:block group">
                {/* Robot Image */}
                <Image
                  src="/robot.png"
                  alt="robot"
                  height={350}
                  width={300}
                  className="z-10 relative"
                />

                {/* Left Side Icons */}
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg"
                  alt="css"
                  width={50}
                  height={50}
                  className="absolute left-[-30px] top-[10%] transition-all rotate-12 duration-500 ease-out group-hover:-translate-x-5 group-hover:-translate-y-2"
                />
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg"
                  alt="vue"
                  width={50}
                  height={50}
                  className="absolute left-[-32px] top-[30%] transition-all rotate-3 duration-500 ease-out group-hover:-translate-x-5 group-hover:-translate-y-1"
                />
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"
                  alt="bootstrap"
                  width={50}
                  height={50}
                  className="absolute left-[-34px] top-[50%] transition-all duration-500 ease-out group-hover:-translate-x-5"
                />
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg"
                  alt="angular"
                  width={50}
                  height={50}
                  className="absolute left-[-32px] top-[70%] transition-all -rotate-3 duration-500 ease-out group-hover:-translate-x-5 group-hover:translate-y-1"
                />

                {/* Right Side Icons */}
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
                  alt="react"
                  width={50}
                  height={50}
                  className="absolute right-[-30px] top-[10%] transition-all -rotate-12 duration-500 ease-out group-hover:translate-x-5 group-hover:-translate-y-2"
                />
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
                  alt="tailwind"
                  width={50}
                  height={50}
                  className="absolute right-[-32px] top-[30%] transition-all -rotate-3 duration-500 ease-out group-hover:translate-x-5 group-hover:-translate-y-1"
                />
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg"
                  alt="mongo-db"
                  width={60}
                  height={60}
                  className="absolute right-[-34px] top-[50%] transition-all duration-500 ease-out group-hover:translate-x-5"
                />
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg"
                  alt="node"
                  width={60}
                  height={60}
                  className="absolute right-[-30px] top-[70%] transition-all rotate-3 duration-500 ease-out group-hover:translate-x-5 group-hover:translate-y-2"
                />
              </div>
            </FadeInAnimation>
          </div>
        </HeroFadeInAnimation>
      </section>
      <InterviewCardAnimation>
        <section className="interview-section flex flex-col gap-6 mt-8 px-[4rem] pt-[6rem]">
          <h2 className="text-2xl font-bold">Your Interviews</h2>
          <div className=" interview-container flex flex-wrap gap-8">
            {hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <div className="interview-card" key={interview.id}>
                  <InterviewCard {...interview} key={interview.id} />
                </div>
              ))
            ) : (
              <p>You haven&apos;t taken any interviews yet</p>
            )}
          </div>
        </section>
        <section className="interview-section flex flex-col gap-6 mt-8 mb-8 px-[4rem] pt-[6rem]">
          <h2 className="text-2xl font-bold">Take An Interview</h2>
          <div className=" interview-container flex flex-wrap gap-8">
            {hasUpcomingInterviews ? (
              latestInterviews?.map((interview) => (
                <div className="interview-card" key={interview.id}>
                  <InterviewCard {...interview} key={interview.id} />
                </div>
              ))
            ) : (
              <p>There arent&apos;t any new interviews yet</p>
            )}
          </div>
        </section>
      </InterviewCardAnimation>
    </>
  );
};

export default page;
