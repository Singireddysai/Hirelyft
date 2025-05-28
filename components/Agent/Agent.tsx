"use client";

import React, { useEffect, useState } from "react";
import "./Agent.css";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import Lottie from "lottie-react";
import animationData from "../../public/connecting-animation.json";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  type,
  interviewId,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [isSpeaking, setisSpeaking] = useState(false);
  const [callStatus, setcallStatus] = useState<CallStatus>(CallStatus.INACTIVE);

  const [messages, setmessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => {
      setcallStatus(CallStatus.ACTIVE);
    };
    const onCallEnd = () => {
      setcallStatus(CallStatus.FINISHED);
    };
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setmessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = () => setisSpeaking(true);
    const onSpeechEnd = () => setisSpeaking(false);
    const onError = (error: Error) => console.log("Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    console.log("Generate feedback here.");

    const { success, feedbackId: id } = await createFeedback({
      interviewId: interviewId!,
      userId: userId!,
      transcript: messages,
    });
    if (success && id) {
      router.push(`/interview/${interviewId}/feedback`);
    } else {
      console.log("Error saving feedback");
      router.push("/");
    }
  };
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, type, userId]);

  const handleCall = async () => {
    setcallStatus(CallStatus.CONNECTING);
    try {
      if (type === "generate") {
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            username: userName,
            userid: userId,
          },
          //@ts-expect-error
          clientMessages: ["transcript"],
          serverMessages: [],
        });
      } else {
        let formattedQuestions = "";
        if (questions) {
          formattedQuestions = questions
            .map((question) => `-${question}`)
            .join("\n");
        }
        await vapi.start(interviewer, {
          variableValues: {
            questions: formattedQuestions,
          },
          //@ts-expect-error
          clientMessages: ["transcript"],
          serverMessages: [],
        });
      }
    } catch (error) {
      console.error("vapi.start error:", error);
      setcallStatus(CallStatus.INACTIVE);
    }
  };
  const handleDisconnet = async () => {
    setcallStatus(CallStatus.FINISHED);
    vapi.stop();
  };
  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;
  return (
    <>
      <div className="interview-pane justify-center items-center pt-3 flex gap-6">
        <div className="bg-card !p-[0px]">
          <div className="ai interview-card border-3 border-solid border-slate-500">
            <div className="wave-container">
              {isSpeaking && (
                <>
                  <div className="ripple"></div>
                  <div className="ripple delay-1"></div>
                  <div className="ripple delay-2"></div>
                </>
              )}
              <div className="center-dot">
                <Image src={"/chat-logo.svg"} alt="AI" height={90} width={90} />
              </div>
            </div>

            <p className="text-3xl mt-2 font-[600] tracking-[1px]">
              AI Interviewer
            </p>
          </div>
        </div>
        <div className="bg-card hidden md:block">
          <div className="user interview-card">
            <Image
              className="rounded-full"
              src={"/you.png"}
              alt="user"
              height={90}
              width={90}
            />
            <p className="text-3xl mt-2 font-[600] capitalize">{userName}</p>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="px-[10%] mt-[2rem] md:px-[21%]">
          <div className="interview-txt-div">
            <div className="interview-txt py-[8px] px-[16px] flex justify-center items-center text-lg font-semibold">
              <p
                key={latestMessage}
                className={cn(
                  "transition-opacity duration-500 opacity-0",
                  "animate-fadeIn opacity-100"
                )}
              >
                {latestMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full mt-[2rem] flex flex-col gap-4  items-center justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="call group" onClick={handleCall}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span>
              {isCallInactiveOrFinished ? (
                <Image
                  className="transition-transform duration-300 ease-in-out group-hover:-rotate-8"
                  src={"/call.svg"}
                  alt="call"
                  height={28}
                  width={28}
                />
              ) : (
                <Lottie
                  height={30}
                  width={30}
                  autoplay
                  loop
                  animationData={animationData}
                />
              )}
            </span>
          </button>
        ) : (
          <button className="end group" onClick={handleDisconnet}>
            <Image
              className="transition-transform duration-300 ease-in-out group-hover:-rotate-8"
              src={"/end-call.svg"}
              alt="end"
              height={32}
              width={32}
            />
          </button>
        )}
        <Button className="px-4 py-2 border-2 rounded-[20px] h-[2.5rem] w-[8rem] border-pink-600 hover:bg-pink-600">
          <Link className="font-[600] text-xl" href={"/"}>
            Back
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Agent;
