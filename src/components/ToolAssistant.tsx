"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import type { ToolDirectoryItem } from "@/src/data/tool-directory";
import {
  buildToolAssistantReply,
  type ToolAssistantReply,
} from "@/src/lib/tool-assistant";
import type {
  ToolFeedbackEvent,
  ToolFeedbackReason,
  ToolFeedbackStatus,
} from "@/src/lib/tool-feedback";
import type { ToolFinderLocale } from "@/src/lib/tool-finder";
import { ToolIcon } from "@/src/lib/tool-visuals";

type Props = {
  locale: ToolFinderLocale;
  tools: ToolDirectoryItem[];
};

type AssistantTurn = {
  id: string;
  query: string;
  reply: ToolAssistantReply;
  feedbackId: string;
};

const assistantCopy = {
  ja: {
    heading: "ファイルの困りごとを相談",
    label: "困りごとを入力",
    placeholder: "例：iPhoneの写真がWindowsで開けない",
    send: "相談する",
    suggestions: [
      "iPhoneの写真がWindowsで開けない",
      "ParquetをCSVにしたい",
      "PDFの容量を小さくしたい",
    ],
    userLabel: "相談",
    answerLabel: "回答",
    guideLabel: "あわせて読む",
    resolvedQuestion: "この案内で解決しましたか？",
    resolved: "解決した",
    unresolved: "解決しなかった",
    thanks: "回答ありがとうございます。今後の案内改善に使います。",
    unresolvedPrompt: "どこで詰まりましたか？",
    unresolvedReasons: {
      no_matching_tool: "合うツールがなかった",
      instructions_unclear: "使い方が分からなかった",
      conversion_failed: "変換できなかった",
      other: "その他",
    },
    commentLabel: "補足（任意）",
    commentPlaceholder: "分からなかった点や、探していた機能",
    submitDetail: "内容を送る",
    detailThanks: "内容を受け取りました。ありがとうございます。",
    feedbackError: "送信できませんでした。時間をおいてもう一度お試しください。",
    privacy: "相談文、候補ツール、回答だけを匿名で送ります。ファイルは送信しません。",
  },
  en: {
    heading: "Ask about a file problem",
    label: "Describe the problem",
    placeholder: "Example: My iPhone photo will not open on Windows",
    send: "Ask",
    suggestions: [
      "My iPhone photo will not open on Windows",
      "Convert Parquet to CSV",
      "Make a PDF file smaller",
    ],
    userLabel: "Question",
    answerLabel: "Answer",
    guideLabel: "Related guide",
    resolvedQuestion: "Did this answer solve the problem?",
    resolved: "Solved",
    unresolved: "Not solved",
    thanks: "Thanks. Your answer will help improve these suggestions.",
    unresolvedPrompt: "What got in the way?",
    unresolvedReasons: {
      no_matching_tool: "No matching tool",
      instructions_unclear: "Instructions were unclear",
      conversion_failed: "Conversion did not work",
      other: "Something else",
    },
    commentLabel: "More detail (optional)",
    commentPlaceholder: "What was missing or where you got stuck",
    submitDetail: "Send details",
    detailThanks: "Thanks. Your feedback has been recorded.",
    feedbackError: "Feedback could not be sent. Please try again later.",
    privacy: "Only the question, suggested tools, and your answer are sent anonymously. Files are never sent.",
  },
} as const;

function createFeedbackId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `feedback-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

async function postFeedback(payload: {
  feedbackId: string;
  event: ToolFeedbackEvent;
  status: ToolFeedbackStatus;
  locale: ToolFinderLocale;
  query: string;
  recommendationSlugs: string[];
  reason: ToolFeedbackReason;
  comment: string;
}) {
  const response = await fetch("/api/tool-feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      page: window.location.pathname,
    }),
  });

  if (!response.ok) throw new Error("feedback_failed");
}

function FeedbackPanel({
  locale,
  query,
  recommendationSlugs,
  feedbackId,
}: {
  locale: ToolFinderLocale;
  query: string;
  recommendationSlugs: string[];
  feedbackId: string;
}) {
  const t = assistantCopy[locale];
  const reasonId = useId();
  const commentId = useId();
  const [choice, setChoice] = useState<ToolFeedbackStatus | null>(null);
  const [reason, setReason] = useState<ToolFeedbackReason>("no_matching_tool");
  const [comment, setComment] = useState("");
  const [detailSent, setDetailSent] = useState(false);
  const [error, setError] = useState(false);

  const submitRating = async (status: ToolFeedbackStatus) => {
    setChoice(status);
    setError(false);
    try {
      await postFeedback({
        feedbackId,
        event: "rating",
        status,
        locale,
        query,
        recommendationSlugs,
        reason: "not_specified",
        comment: "",
      });
    } catch {
      setError(true);
    }
  };

  const submitDetail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    try {
      await postFeedback({
        feedbackId,
        event: "detail",
        status: "unresolved",
        locale,
        query,
        recommendationSlugs,
        reason,
        comment,
      });
      setDetailSent(true);
    } catch {
      setError(true);
    }
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      {!choice ? (
        <>
          <p className="text-sm font-semibold text-gray-900">{t.resolvedQuestion}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void submitRating("resolved")}
              className="min-h-10 rounded-md border border-teal-700 bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
            >
              {t.resolved}
            </button>
            <button
              type="button"
              onClick={() => void submitRating("unresolved")}
              className="min-h-10 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:border-gray-500"
            >
              {t.unresolved}
            </button>
          </div>
        </>
      ) : choice === "resolved" ? (
        <p className="text-sm font-medium text-teal-800">{t.thanks}</p>
      ) : detailSent ? (
        <p className="text-sm font-medium text-teal-800">{t.detailThanks}</p>
      ) : (
        <form onSubmit={submitDetail} className="space-y-3">
          <div>
            <label htmlFor={reasonId} className="block text-sm font-semibold text-gray-900">
              {t.unresolvedPrompt}
            </label>
            <select
              id={reasonId}
              value={reason}
              onChange={(event) => setReason(event.target.value as ToolFeedbackReason)}
              className="mt-2 min-h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              {Object.entries(t.unresolvedReasons).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={commentId} className="block text-sm font-medium text-gray-700">
              {t.commentLabel}
            </label>
            <textarea
              id={commentId}
              value={comment}
              maxLength={600}
              rows={3}
              onChange={(event) => setComment(event.target.value)}
              placeholder={t.commentPlaceholder}
              className="mt-1 w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950 outline-none placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </div>
          <button
            type="submit"
            className="min-h-10 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
          >
            {t.submitDetail}
          </button>
        </form>
      )}

      {error ? <p className="mt-2 text-sm text-red-700">{t.feedbackError}</p> : null}
      <p className="mt-3 text-xs leading-5 text-gray-500">{t.privacy}</p>
    </div>
  );
}

export default function ToolAssistant({ locale, tools }: Props) {
  const t = assistantCopy[locale];
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [clarificationContext, setClarificationContext] = useState("");
  const [turns, setTurns] = useState<AssistantTurn[]>([]);

  const ask = (rawQuery: string) => {
    const trimmedQuery = rawQuery.trim();
    if (!trimmedQuery) return;

    const completeQuery = clarificationContext
      ? `${clarificationContext} ${trimmedQuery}`
      : trimmedQuery;
    const reply = buildToolAssistantReply(tools, completeQuery, locale);
    const turn: AssistantTurn = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      query: completeQuery,
      reply,
      feedbackId: createFeedbackId(),
    };

    setTurns((current) => [...current, turn].slice(-2));
    setClarificationContext(reply.kind === "clarification" ? completeQuery : "");
    setQuery("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(query);
  };

  return (
    <div>
      <h2 className="text-left text-base font-bold text-gray-900">{t.heading}</h2>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <label htmlFor={inputId} className="sr-only">
          {t.label}
        </label>
        <input
          id={inputId}
          type="text"
          value={query}
          maxLength={300}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.placeholder}
          className="h-12 min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="h-12 shrink-0 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-300 sm:px-5"
        >
          {t.send}
        </button>
      </form>

      {turns.length === 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {t.suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => ask(suggestion)}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-xs font-medium text-gray-700 hover:border-teal-300 hover:text-teal-800"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-4 space-y-5 text-left" aria-live="polite">
        {turns.map((turn) => (
          <div key={turn.id} className="border-t border-gray-200 pt-4 first:border-t-0 first:pt-0">
            <p className="text-xs font-semibold text-gray-500">{t.userLabel}</p>
            <p className="mt-1 break-words text-sm text-gray-800">{turn.query}</p>

            <p className="mt-4 text-xs font-semibold text-teal-800">{t.answerLabel}</p>
            <p className="mt-1 text-sm leading-6 text-gray-800">{turn.reply.message}</p>

            {turn.reply.kind === "recommendations" ? (
              <>
                <div className="mt-3 divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white">
                  {turn.reply.recommendations.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={tool.href}
                      className="group flex min-h-16 items-start gap-3 px-3 py-3 hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none"
                    >
                      <ToolIcon name={tool.name} href={tool.href} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-gray-900 group-hover:text-teal-700">
                          {tool.name}
                        </span>
                        <span className="mt-0.5 block break-words text-xs leading-5 text-gray-500">
                          {tool.reason}
                        </span>
                      </span>
                      <span aria-hidden="true" className="pt-1 text-lg text-gray-300 group-hover:text-teal-600">
                        ›
                      </span>
                    </Link>
                  ))}
                </div>

                {turn.reply.guide ? (
                  <div className="mt-3 text-sm">
                    <span className="text-gray-500">{t.guideLabel}: </span>
                    <Link
                      href={turn.reply.guide.href}
                      className="font-semibold text-teal-700 hover:text-teal-900"
                    >
                      {turn.reply.guide.title}
                    </Link>
                  </div>
                ) : null}

                <FeedbackPanel
                  locale={locale}
                  query={turn.query}
                  recommendationSlugs={turn.reply.recommendations.map((tool) => tool.slug)}
                  feedbackId={turn.feedbackId}
                />
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
