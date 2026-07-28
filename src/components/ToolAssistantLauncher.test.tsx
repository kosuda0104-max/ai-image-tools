import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ToolAssistantLauncher from "@/src/components/ToolAssistantLauncher";
import { getAllToolItems } from "@/src/data/tool-directory";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ToolAssistantLauncher", () => {
  it("opens the Wisp assistant from a persistent launcher", () => {
    render(<ToolAssistantLauncher locale="ja" tools={getAllToolItems("ja")} />);

    const launcher = screen.getByRole("button", { name: "ウィスプに相談" });
    const panel = screen.getByRole("region", { hidden: true });

    expect(launcher).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("hidden");

    fireEvent.click(launcher);

    expect(launcher).toHaveAttribute("aria-expanded", "true");
    expect(panel).not.toHaveAttribute("hidden");
    expect(screen.getByLabelText("困りごとを入力")).toBeInTheDocument();
  });

  it("finds a tool from a plain-language problem", () => {
    render(<ToolAssistantLauncher locale="en" tools={getAllToolItems("en")} />);
    fireEvent.click(screen.getByRole("button", { name: "Ask Wisp" }));

    fireEvent.change(screen.getByLabelText("Describe the problem"), {
      target: { value: "CSV opens in one column" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ask" }));

    expect(screen.getByText("CSV Delimiter Converter")).toBeInTheDocument();
    expect(screen.getByText(/closest matches/)).toBeInTheDocument();
  });

  it("supports one-tap Japanese problem suggestions", () => {
    render(<ToolAssistantLauncher locale="ja" tools={getAllToolItems("ja")} />);
    fireEvent.click(screen.getByRole("button", { name: "ウィスプに相談" }));
    fireEvent.click(
      screen.getByRole("button", {
        name: "iPhoneの写真がWindowsで開けない",
      }),
    );

    expect(screen.getByText("HEIC を JPG に変換")).toBeInTheDocument();
    expect(screen.getByText("このあたりが近そうです。まずは一番上から試してください。")).toBeInTheDocument();
  });

  it("records an unresolved answer before asking for optional detail", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    render(<ToolAssistantLauncher locale="en" tools={getAllToolItems("en")} />);
    fireEvent.click(screen.getByRole("button", { name: "Ask Wisp" }));
    fireEvent.change(screen.getByLabelText("Describe the problem"), {
      target: { value: "Parquet to CSV" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ask" }));
    fireEvent.click(screen.getByRole("button", { name: "Not solved" }));

    expect(screen.getByLabelText("What got in the way?")).toBeInTheDocument();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      event: "rating",
      status: "unresolved",
      query: "Parquet to CSV",
      recommendationSlugs: expect.arrayContaining(["parquet-to-csv"]),
    });
  });
});
