"use client";

import React, { useState } from "react";
import Image from "next/image";
import FadeInAnimation from "@/components/animations/FadeIn";

const SupportPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "95c6eb57-a79f-44b3-9d7b-e0674fc565b9");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        e.currentTarget.reset();
      } else {
        const result = await response.json();
        setError(result.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeInAnimation>
      <div className="min-h-screen  px-6 py-4 md:px-[10%] text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="fade-in text-4xl md:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Support & Contact
          </h1>
          <p className="fade-in-delay1 text-center text-lg text-gray-300 font-light mb-6">
            Need help? Fill out this form and we&apos;ll respond as soon as
            possible.
          </p>

          {submitted ? (
            <div className="text-center text-green-400 text-xl font-medium">
              ✅ Thank you! Your message has been sent successfully.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#141414] fade-appear opacity-0 border-2 border-neutral-800 p-8 rounded-2xl shadow-xl space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-md font-semibold text-gray-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-md bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-semibold text-gray-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your-email@gmail.com"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-md bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-md font-semibold text-gray-200"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Type your issue..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-md bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
                ></textarea>
              </div>

              {error && (
                <div className="text-red-400 text-sm font-medium text-center">
                  ⚠ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-md text-white text-lg font-semibold hover:opacity-90 transition-opacity duration-300"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </FadeInAnimation>
  );
};

export default SupportPage;
