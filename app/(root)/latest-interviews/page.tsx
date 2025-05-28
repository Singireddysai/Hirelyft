import { getCurrentUser } from "@/lib/actions/auth.action";
import { getLatestInterviews } from "@/lib/actions/general.action";
import InterviewCard from "@/components/InterviewCard/InterviewCard";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();
  const latestInterviews = await getLatestInterviews({
    userId: user?.id!,
    limit: 20,
  });
  const hasUpcomingInterviews = latestInterviews?.length! > 0;

  return (
    <div>
      <section className="flex flex-col gap-6 mt-2 mb-8 px-[4rem] pt-[2rem]">
        <h2 className="text-3xl -ml-8 md:ml-2 font-bold">
          Latest{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Interviews
          </span>{" "}
          :
        </h2>
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
    </div>
  );
};

export default page;
