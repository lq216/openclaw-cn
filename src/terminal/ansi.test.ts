import { describe, expect, it } from "vitest";
import { stripAnsi, visibleWidth } from "./ansi.js";

describe("stripAnsi", () => {
  it("removes SGR codes", () => {
    expect(stripAnsi("\x1b[31mhello\x1b[0m")).toBe("hello");
  });

  it("removes OSC-8 hyperlinks", () => {
    expect(stripAnsi("\x1b]8;;https://example.com\x1b\\link\x1b]8;;\x1b\\")).toBe("link");
  });
});

describe("visibleWidth", () => {
  it("returns length for ASCII", () => {
    expect(visibleWidth("hello")).toBe(5);
  });

  it("strips ANSI before measuring", () => {
    expect(visibleWidth("\x1b[31mhello\x1b[0m")).toBe(5);
  });

  it("counts CJK characters as width 2", () => {
    expect(visibleWidth("你好")).toBe(4); // 2 chars × 2 columns
  });

  it("counts mixed ASCII + CJK correctly", () => {
    expect(visibleWidth("hello你好")).toBe(9); // 5 + 4
  });

  it("handles fullwidth punctuation", () => {
    // Fullwidth forms like ！ (U+FF01) should be width 2
    expect(visibleWidth("！")).toBe(2);
    expect(visibleWidth("（）")).toBe(4);
  });

  it("handles CJK punctuation like 、 and 。", () => {
    // These are in the CJK Symbols range (U+3000-U+303E)
    expect(visibleWidth("、")).toBe(2);
    expect(visibleWidth("。")).toBe(2);
  });

  it("counts empty string as 0", () => {
    expect(visibleWidth("")).toBe(0);
  });

  it("handles a realistic Chinese line", () => {
    const line = "安全警告 — 请阅读。";
    // 安(2) 全(2) 警(2) 告(2) (1) —(1) (1) 请(2) 阅(2) 读(2) 。(2)
    expect(visibleWidth(line)).toBe(19);
  });
});
