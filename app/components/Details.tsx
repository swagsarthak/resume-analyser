import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import { cn } from "~/lib/utils";

type Tip = {
  type: "good" | "improve";
  tip: string;
  explanation: string;
};

type ScoreBadgeProps = {
  score: number;
};

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const isStrong = score > 69;
  const isOk = score > 39;

  const badgeClass = cn(
    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
    isStrong
      ? "bg-green-100 text-green-700"
      : isOk
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700"
  );

  return (
    <span className={badgeClass}>
      {isStrong ? (
        <svg
          className="h-3 w-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg
          className="h-3 w-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M12 9v4m0 4h.01M10.29 3.86l-7.1 12.3A2 2 0 0 0 4.93 19h14.14a2 2 0 0 0 1.74-2.84l-7.1-12.3a2 2 0 0 0-3.46 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span>{score}/100</span>
    </span>
  );
};

type CategoryHeaderProps = {
  title: string;
  categoryScore: number;
};

const CategoryHeader = ({ title, categoryScore }: CategoryHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-lg font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

type CategoryContentProps = {
  tips: Tip[];
};

const CategoryContent = ({ tips }: CategoryContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {tips.map((tip, index) => (
          <div
            key={`${tip.type}-${index}`}
            className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3"
          >
            <span
              className={cn(
                "mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                tip.type === "good"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              )}
            >
              {tip.type === "good" ? "✓" : "!"}
            </span>
            <p className="text-sm text-gray-700">{tip.tip}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {tips.map((tip, index) => (
          <div
            key={`${tip.type}-explanation-${index}`}
            className={cn(
              "rounded-lg border px-4 py-3 text-sm",
              tip.type === "good"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-yellow-200 bg-yellow-50 text-yellow-700"
            )}
          >
            {tip.explanation}
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  const sections = [
    {
      id: "tone-style",
      title: "Tone & Style",
      score: feedback.toneAndStyle.score,
      tips: feedback.toneAndStyle.tips,
    },
    {
      id: "content",
      title: "Content",
      score: feedback.content.score,
      tips: feedback.content.tips,
    },
    {
      id: "structure",
      title: "Structure",
      score: feedback.structure.score,
      tips: feedback.structure.tips,
    },
    {
      id: "skills",
      title: "Skills",
      score: feedback.skills.score,
      tips: feedback.skills.tips,
    },
  ];

  return (
    <Accordion className="rounded-2xl bg-white shadow-md">
      {sections.map((section) => (
        <AccordionItem key={section.id} id={section.id}>
          <AccordionHeader itemId={section.id}>
            <CategoryHeader
              title={section.title}
              categoryScore={section.score}
            />
          </AccordionHeader>
          <AccordionContent itemId={section.id}>
            <CategoryContent tips={section.tips} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Details;
