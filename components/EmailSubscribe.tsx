"use client";

import { useState, FormEvent } from "react";

export default function EmailSubscribe() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    // Add your email handling logic here
    setEmail("");
  };
  const [loading, setLoading] = useState(false);

  return (
    <section className="w-full py-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug max-w-md">
          Build with <span className="text-[#A10F1A]">Structure.</span> Engineer
          with <span className="text-[#A10F1A]">Purpose.</span>
        </h2>

        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-3xl"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            className="flex-1 px-5 py-3 border border-red-700 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700/30 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-md transition-colors whitespace-nowrap"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </section>
  );
}
