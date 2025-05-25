"use client";

import React, { useEffect, useState } from "react";
import "./Agent.css";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";
import { generator } from "@/constants";

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

const Agent = ({ userName, userId, type }: AgentProps) => {
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
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) router.push("/");
  }, [messages, callStatus, type, userId]);

  const handleCall = async () => {
    setcallStatus(CallStatus.CONNECTING);
    try {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!);
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
      <div className="interview-pane justify-center items-center pt-8 flex gap-6">
        <div className="auth-card">
          <div className="ai interview-card ">
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

            <p className="text-3xl mt-2 font-600 tracking-[1px]">
              AI Interviewer
            </p>
          </div>
        </div>
        <div className="auth-card hidden md:block">
          <div className="user interview-card">
            <Image
              className="rounded-full"
              src={"/user-avatar.png"}
              alt="user"
              height={90}
              width={90}
            />
            <p className="text-3xl mt-2 font-600">{userName}</p>
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

      <div className="w-full mt-[2rem] flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="call" onClick={handleCall}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span>
              {isCallInactiveOrFinished ? (
                <Image
                  src={"/call.svg"}
                  alt="end call"
                  height={32}
                  width={32}
                />
              ) : (
                "..."
              )}
            </span>
          </button>
        ) : (
          <button className="end" onClick={handleDisconnet}>
            <Image
              src={"/end-call.svg"}
              alt="end call"
              height={32}
              width={32}
            />
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
