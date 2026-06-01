"use client";
import { useState } from "react";

// Every answer here is manually verified:
// Q1: 4x−7=13 → 4x=20 → x=5 ✓
// Q2: √(25+144) = √169 = 13 ✓  (NOT 5+12=17 — can't split √(a+b))
// Q3: (a−b)² = a²−2ab+b² ✓
// Q4: log₂(32) = 5  because 2⁵=32 ✓
// Q5: x²+4=0 has no real solution because x²≥0 always ✓
const problems = [
  {
    question: "Melyik az egyenlet helyes megoldása?",
    formula: "4x − 7 = 13",
    options: ["x = 5", "x = 20", "x = 6", "x = 1,5"],
    correct: 0,
    explanation:
      "4x = 13 + 7 = 20, tehát x = 20 ÷ 4 = 5. Ellenőrzés: 4·5 − 7 = 13 ✓",
    trap: "A leggyakoribb hiba: elfelejtenek elosztani 4-gyel, és x = 20-at írnak.",
  },
  {
    question: "Mennyi az értéke?",
    formula: "√(25 + 144)",
    options: ["13", "17", "7", "√169"],
    correct: 0,
    explanation:
      "Először össze kell adni a gyök alatt: 25 + 144 = 169, majd √169 = 13.",
    trap: "Sokan √25 + √144 = 5 + 12 = 17-et írnak — de √(a+b) ≠ √a + √b!",
  },
  {
    question: "Melyik a helyes kifejtés?",
    formula: "(a − b)²",
    options: ["a² − 2ab + b²", "a² − b²", "a² + 2ab + b²", "a² − 2ab − b²"],
    correct: 0,
    explanation:
      "(a−b)(a−b) = a² − ab − ab + b² = a² − 2ab + b². A b² előjele mindig pozitív, hiszen (−b)·(−b) = +b².",
    trap: "Tipikus hiba: az utolsó tag elé mínuszt írni (a²−2ab−b²), pedig (−b)²=+b².",
  },
  {
    question: "Mi az értéke?",
    formula: "log₂(32)",
    options: ["5", "4", "16", "6"],
    correct: 0,
    explanation:
      "Azt keressük, amire 2-t emelve 32-t kapunk: 2⁵ = 2·2·2·2·2 = 32. Tehát log₂(32) = 5.",
    trap: "Sokszor tévesztik össze a szomszédos hatványokkal: 2⁴=16 és 2⁶=64.",
  },
  {
    question: "Hány valós megoldása van az egyenletnek?",
    formula: "x² + 4 = 0",
    options: [
      "Nincs valós megoldása",
      "2 megoldása van",
      "1 megoldása van",
      "x = ±2",
    ],
    correct: 0,
    explanation:
      "x² = −4 — de négyzetszám soha nem lehet negatív (x² ≥ 0 minden valós x-re). Nincs valós megoldás.",
    trap: "x = ±2 csábító, de 2²=4, nem −4. Csak komplex megoldások léteznek.",
  },
];

export default function FindTheMistake() {
  const [pIndex, setPIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<Set<number>>(new Set());

  const problem = problems[pIndex];
  const isAnswered = picked !== null;
  const isCorrect = picked === problem.correct;

  const handlePick = (i: number) => {
    if (isAnswered) return;
    setPicked(i);
    if (i === problem.correct && !answered.has(pIndex)) {
      setScore((s) => s + 1);
      setAnswered((prev) => new Set(prev).add(pIndex));
    }
  };

  const next = () => {
    setPIndex((i) => (i + 1) % problems.length);
    setPicked(null);
  };

  const allDone = score === problems.length;

  return (
    <section
      id="talald-meg"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.05] graph-paper"
        style={{ filter: "invert(1)" }}
      />

      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-10">
          <p
            className="text-sm font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--mustard)" }}
          >
            Interaktív · próbáld ki
          </p>
          <h2
            className="font-display font-bold text-4xl mb-4"
            style={{ color: "var(--paper)" }}
          >
            🎯 Melyik a helyes megoldás?
          </h2>
          <p
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(251,246,238,0.65)" }}
          >
            Válaszd ki a négy lehetőség közül a helyeset! Ugyanezeket a
            csapdákat kerüljük el együtt az órákon is.
          </p>
        </div>

        {/* score */}
        <div className="flex justify-center mb-6">
          <span
            className="text-sm font-bold px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(224,167,63,0.15)",
              color: "var(--mustard)",
              border: "1px solid rgba(224,167,63,0.3)",
            }}
          >
            Helyes válaszok: {score} / {problems.length}
          </span>
        </div>

        {/* problem card */}
        <div
          className="rounded-3xl p-7 sm:p-9"
          style={{
            background: "#2b2320",
            border: "1px solid rgba(251,246,238,0.1)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          }}
        >
          {/* progress dots */}
          <div className="flex gap-2 mb-6">
            {problems.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all flex-1"
                style={{
                  background:
                    i === pIndex
                      ? "var(--mustard)"
                      : answered.has(i)
                      ? "var(--teal)"
                      : "rgba(251,246,238,0.12)",
                }}
              />
            ))}
          </div>

          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--mustard)" }}
          >
            {pIndex + 1}. kérdés
          </p>
          <p
            className="text-base mb-2"
            style={{ color: "rgba(251,246,238,0.75)" }}
          >
            {problem.question}
          </p>
          <p
            className="font-display text-2xl sm:text-3xl mb-8"
            style={{ color: "var(--paper)" }}
          >
            {problem.formula}
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {problem.options.map((opt, i) => {
              const isThisCorrect = i === problem.correct;
              const isThisPicked = i === picked;

              let bg = "rgba(251,246,238,0.04)";
              let border = "rgba(251,246,238,0.14)";
              let color = "var(--paper)";

              if (isAnswered) {
                if (isThisCorrect) {
                  bg = "rgba(47,125,107,0.22)";
                  border = "var(--teal)";
                  color = "#7fd4c0";
                } else if (isThisPicked && !isThisCorrect) {
                  bg = "rgba(210,96,58,0.18)";
                  border = "var(--rust)";
                  color = "#f3b9a6";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handlePick(i)}
                  disabled={isAnswered}
                  className="text-left rounded-xl px-5 py-4 font-display text-lg transition-all flex items-center justify-between gap-3 disabled:cursor-default"
                  style={{ background: bg, border: `1.5px solid ${border}`, color }}
                >
                  <span>
                    <span className="opacity-40 mr-2 text-sm font-sans">
                      {String.fromCharCode(65 + i)})
                    </span>
                    {opt}
                  </span>
                  {isAnswered && isThisCorrect && <span>✓</span>}
                  {isAnswered && isThisPicked && !isThisCorrect && (
                    <span>✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* feedback */}
          {isAnswered && (
            <div
              className="mt-6 rounded-xl px-5 py-5 animate-pop flex flex-col gap-2"
              style={{
                background: isCorrect
                  ? "rgba(47,125,107,0.15)"
                  : "rgba(210,96,58,0.12)",
                border: `1px solid ${
                  isCorrect
                    ? "rgba(47,125,107,0.4)"
                    : "rgba(210,96,58,0.3)"
                }`,
              }}
            >
              <p
                className="font-display font-bold text-lg"
                style={{ color: isCorrect ? "#7fd4c0" : "#f3b9a6" }}
              >
                {isCorrect ? "🎉 Helyes!" : "❌ Nem egészen…"}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(251,246,238,0.85)" }}
              >
                {problem.explanation}
              </p>
              {!isCorrect && (
                <p
                  className="text-xs leading-relaxed mt-1"
                  style={{ color: "rgba(251,246,238,0.55)" }}
                >
                  💡 {problem.trap}
                </p>
              )}
            </div>
          )}

          <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <button
              onClick={next}
              className="font-bold px-6 py-3 rounded-full text-sm transition-transform hover:scale-105"
              style={{ background: "var(--mustard)", color: "var(--ink)" }}
            >
              {pIndex < problems.length - 1 ? "Következő kérdés →" : "Újra az elejétől →"}
            </button>
            {allDone && (
              <a
                href="#kapcsolat"
                className="text-sm font-bold no-underline text-center sm:text-right transition-opacity hover:opacity-80"
                style={{ color: "#7fd4c0" }}
              >
                Mindet helyesen! 👏 Foglalj ingyenes órát →
              </a>
            )}
          </div>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "rgba(251,246,238,0.4)" }}
        >
          Tipp: az első érzés sokszor helyes — de érdemes kétszer is végiggondolni.
        </p>
      </div>
    </section>
  );
}
