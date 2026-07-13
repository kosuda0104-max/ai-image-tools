import { describe, expect, it } from "vitest";
import { jsonLinesToTable, parseJsonLines } from "@/src/lib/jsonl";

describe("JSON Lines helpers", () => {
  it("parses one value per non-empty line", () => {
    expect(parseJsonLines('{"id":1}\n\n{"id":2}\r\n')).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it("flattens nested objects and preserves arrays as JSON", () => {
    const table = jsonLinesToTable([
      { id: 1, user: { name: "Ada" }, tags: ["alpha", "beta"] },
      { id: 2, user: { name: "Lin", active: true } },
    ]);

    expect(table.columns).toEqual([
      "id",
      "user.name",
      "tags",
      "user.active",
    ]);
    expect(table.rows).toEqual([
      [1, "Ada", '["alpha","beta"]', ""],
      [2, "Lin", "", true],
    ]);
  });

  it("reports the original line number for invalid JSON", () => {
    expect(() => parseJsonLines('{"ok":true}\n\nnot-json')).toThrow(
      "Invalid JSON on line 3.",
    );
  });
});
