import React from "react";
import "./Agent.css";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
const Agent = ({ userName }: AgentProps) => {
  const isSpeaking = true;
  const callStatus = CallStatus.ACTIVE;
  const messages = [
    "What's your name?",
    "My name is Jhon Doe, nice to meet you!",
  ];
  const lastMessage = messages[messages.length - 1];
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
                key={lastMessage}
                className={cn(
                  "transition-opacity duration-500 opacity-0",
                  "animate-fadeIn opacity-100"
                )}
              >
                {lastMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full mt-[2rem] flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span>
              {callStatus === "INACTIVE" || callStatus === "FINISHED" ? (
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
          <button className="end">
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
