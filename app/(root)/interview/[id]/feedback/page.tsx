import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Image from "next/image";
import dayjs from "dayjs";
import {
  getFeedbackById,
  getInterviewById,
} from "@/lib/actions/general.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import FadeInAnimation from "@/components/animations/FadeIn";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);
  if (!interview) {
    redirect("/");
  }
  const feedback = await getFeedbackById({
    interviewId: id,
    userId: user?.id!,
  });
  return (
    <>
      <FadeInAnimation>
        <section className="px-[5%] md:px-[20%] py-10  text-gray-200 min-h-screen">
          <div className="text-center mb-10">
            <h1 className="fade-in-delay1 text-3xl md:text-4xl font-extrabold capitalize">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent ">
                Feedback Summary
              </span>{" "}
              : {interview.role} Interview
            </h1>
          </div>

          <div className="fade-in-delay1 flex flex-col md:flex-row justify-center items-center gap-6 mb-10 text-lg">
            <div className="flex items-center gap-2">
              <Image src="/star.png" width={22} height={22} alt="star" />
              <span className="font-medium">
                Overall Impression:{" "}
                <span className="font-bold text-purple-400">
                  {feedback?.totalScore ?? "N/A"}/100
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <span>
                {feedback?.createdAt
                  ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                  : "N/A"}
              </span>
            </div>
          </div>
          <div className="fade-appear bg-gradient-to-b from-[#444242] to-[#1b1a1a] rounded-2xl p-[2px]">
            <div className="bg-gradient-to-b from-[#1b1a1a] to-black rounded-2xl shadow-xl p-6 md:p-10 space-y-8">
              <div>
                <p className="text-lg leading-relaxed">
                  <span className="text-xl md:text-2xl font-semibold text-pink-400">
                    Final Assessment:
                  </span>{" "}
                  {feedback?.finalAssessment ?? "Not available"}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-purple-300 mb-4">
                  Interview Breakdown
                </h2>
                <div className="space-y-4">
                  {feedback?.categoryScores?.map((category, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 p-4 rounded-md border border-gray-600"
                    >
                      <p className="font-semibold text-gray-100">
                        {index + 1}. {category.name} —{" "}
                        <span className="text-purple-400">
                          {category.score}/100
                        </span>
                      </p>
                      <p className="text-gray-300 mt-1">{category.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  Strengths
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-300">
                  {feedback?.strengths && feedback.strengths.length > 0 ? (
                    feedback.strengths.map((strength, idx) => (
                      <li key={idx}>{strength}</li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">
                      No notable strengths identified.
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-2">
                  Areas for Improvement
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-300">
                  {feedback?.areasForImprovement?.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-6">
                <Link href="/" className="w-full">
                  <Button className="w-full text-lg bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold rounded-lg py-3">
                    Back to Dashboard
                  </Button>
                </Link>

                <Link href={`/interview/${id}`} className="w-full">
                  <Button className="w-full text-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-lg py-3">
                    Retake Interview
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInAnimation>
    </>
  );
};

export default page;
