"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
  style?: React.CSSProperties;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function Typewriter({
  words,
  className,
  style,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 1800,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    const currentWord = words[wordIndex % words.length] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseDuration);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className} style={style}>
      {text}
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "3px",
          marginLeft: "4px",
          animation: "typewriter-blink 1s step-end infinite",
          backgroundColor: "currentColor",
          verticalAlign: "-0.1em",
          height: "0.9em",
        }}
      />
      <style jsx>{`
        @keyframes typewriter-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
