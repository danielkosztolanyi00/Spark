"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import QuestionerSection from "@/components/QuestionerSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [quizSummary, setQuizSummary] = useState<Record<string, string>>({});

  function handleQuizComplete(summary: Record<string, string>) {
    setQuizSummary(summary);
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  }

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <QuestionerSection onComplete={handleQuizComplete} />
        <Contact prefill={quizSummary} />
      </main>
      <Footer />
    </>
  );
}
