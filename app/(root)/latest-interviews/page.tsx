import { getCurrentUser } from "@/lib/actions/auth.action";
import { getLatestInterviews } from "@/lib/actions/general.action";
import InterviewCard from "@/components/InterviewCard/InterviewCard";
import React from "react";
import FadeInAnimation from "@/components/animations/FadeIn";
import InterviewCardAnimation from "@/components/animations/InterviewCardAnimation";

const page = async () => {
  const user = await getCurrentUser();
  const latestInterviews = await getLatestInterviews({
    userId: user?.id!,
    limit: 20,
  });
  const hasUpcomingInterviews = latestInterviews?.length! > 0;

  return (
    <FadeInAnimation>
      <div>
        <section className="flex flex-col gap-6 mt-2 mb-8 px-[4rem] pt-[2rem]">
          <h2 className="fade-in-delay1 opacity-0 text-3xl -ml-8 md:ml-2 font-bold">
            Latest{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Interviews
            </span>{" "}
            :
          </h2>
          <InterviewCardAnimation>
            <div className="flex flex-wrap gap-8">
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
          </InterviewCardAnimation>
        </section>
      </div>
    </FadeInAnimation>
  );
};

export default page;
