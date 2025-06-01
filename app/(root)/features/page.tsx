import React from "react";
import Link from "next/link";
import FadeInAnimation from "@/components/animations/FadeIn";

const features = [
  {
    title: "Real-time Personalized Interviews",
    description:
      "Simulate job interviews tailored to your role and level. Choose interview domains, difficulty, and company styles to get hyper-relevant practice.",
    cta: { label: "Try Interview", href: "/interview" },
  },
  {
    title: "Human-like Voice Agents",
    description:
      "Interact with AI voice agents powered by Vapi — trained to respond with human-level fluency and empathy, making interviews more immersive.",
    cta: { label: "Learn About Vapi", href: "https://vapi.ai", external: true },
  },
  {
    title: "Powered by Gemini's Intelligence",
    description:
      "Interviews generated with Gemini ensure your questions reflect current industry standards, trends, and role-specific nuances.",
    cta: {
      label: "How Gemini Helps",
      href: "https://deepmind.google/technologies/gemini/",
      external: true,
    },
  },
  {
    title: "Clear, Actionable Feedback",
    description:
      "Get structured, transparent feedback after every interview. Know what went well, what didn’t, and how to improve — instantly.",
    cta: { label: "View Your Feedbacks", href: "/" },
  },
];

const FeaturesPage = () => {
  return (
    <FadeInAnimation>
      <div className="min-h-screen px-6 py-12 md:px-[10%] text-white">
        {/* Page Title */}
        <h1 className="fade-in opacity-0 text-4xl md:text-5xl font-extrabold text-center mb-12 ">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Features
          </span>{" "}
          that Redefine{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Interview
          </span>{" "}
          Preparation
        </h1>

        {/* Features Grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {features.map(({ title, description, cta }, idx) => (
            <div
              key={idx}
              className="fade-appear opacity-0 group bg-[#141414] border border-[#1f1f1f] rounded-2xl p-6 shadow-xl transition transform hover:scale-[1.02] hover:shadow-[0_0_20px_#9b7ebd55]"
            >
              <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-500 group-hover:to-red-500 group-hover:bg-clip-text transition duration-300">
                {title}
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {description}
              </p>
              {cta && (
                <Link
                  href={cta.href}
                  target={cta.external ? "_blank" : "_self"}
                  rel={cta.external ? "noopener noreferrer" : ""}
                  className="inline-block px-4 py-2 mt-2 text-sm font-medium text-white border-2 border-pink-500 rounded-md transition hover:bg-pink-600"
                >
                  {cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-16 text-center text-sm text-gray-500">
          More updates coming soon (jus kiddin' 😝).{" "}
          <Link href="/" className="underline hover:text-pink-400">
            View Dashboard
          </Link>
        </p>
      </div>
    </FadeInAnimation>
  );
};

export default FeaturesPage;
