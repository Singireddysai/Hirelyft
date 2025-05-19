import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard/InterviewCard";

const page = () => {
  return (
    <>
      <section className="px-4 sm:px-10 lg:px-32 py-1 flex flex-col-reverse lg:flex-row justify-center items-center gap-8">
        <div className="card-cta !border-none flex flex-col lg:flex-row items-center gap-34">
          <div className="flex flex-col gap-3 max-w-lg">
            <h3 className="text-3xl font-[500]">
              Prepare for interviews & get feedback, with AI-powered Assistant
            </h3>
            <p className="text-lg text-[var(--col3)]">
              Get interview ready with effective practice using AI & get instant
              feedback on peformance.
            </p>
            <div className="flex gap-4 flex-col md:flex-row md:gap-8">
              <Button
                asChild
                className="max-sm:w-full w-[12em] font-[600] text-lg rounded-full bg-[var(--col3)] mt-4 transition duration-200 ease-in-out hover:bg-[#5684a7] hover:scale-105 hover:text-white"
              >
                <Link className="text-[var(--col2)]" href="/interview">
                  start an interview
                </Link>
              </Button>
              <Button
                asChild
                className="max-sm:w-full w-[12em] font-[600] text-lg rounded-full border-2 border-[var(--col3)] mt-4 transition duration-200 ease-in-out hover:bg-[#5684a7] hover:scale-105 hover:text-white"
              >
                <Link className="text-white" href="/interview">
                  View interviews
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src="/robot.png"
            alt="robot"
            width={400}
            height={350}
            className="max-sm:hidden"
          />
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8 px-[4rem] pt-[6rem]">
        <h2 className="text-2xl font-bold">Your interviews</h2>
        <div className="flex flex-wrap gap-8">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8 px-[4rem] pt-[6rem]">
        <h2 className="text-2xl font-bold">Take an interview</h2>
        <div className="flex flex-wrap gap-8">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
