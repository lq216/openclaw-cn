import chalk from "chalk";
import { visibleWidth } from "./ansi.js";
import { stylePromptTitle } from "./prompt-style.js";

const isUnicodeSupported = () =>
  process.platform !== "win32" ||
  Boolean(process.env.CI) ||
  Boolean(process.env.WT_SESSION) ||
  process.env.TERM_PROGRAM === "vscode" ||
  process.env.TERM === "xterm-256color" ||
  process.env.TERM === "alacritty";

const rich = isUnicodeSupported();
const BAR = rich ? "\u2502" : "|";
const HBAR = rich ? "\u2500" : "-";
const CORNER_TL = rich ? "\u25C7" : "o"; // ◇ (open diamond – matches @clack title marker)
const CORNER_TR = rich ? "\u256E" : "+"; // ╮
const CONNECTOR_L = rich ? "\u251C" : "+"; // ├
const CORNER_BR = rich ? "\u256F" : "+"; // ╯

function splitLongWord(word: string, maxLen: number): string[] {
  if (maxLen <= 0) return [word];
  const chars = Array.from(word);
  const parts: string[] = [];
  let current = "";
  let currentW = 0;
  for (const ch of chars) {
    const cw = visibleWidth(ch);
    if (currentW + cw > maxLen && current.length > 0) {
      parts.push(current);
      current = "";
      currentW = 0;
    }
    current += ch;
    currentW += cw;
  }
  if (current) parts.push(current);
  return parts.length > 0 ? parts : [word];
}

function wrapLine(line: string, maxWidth: number): string[] {
  if (line.trim().length === 0) return [line];
  const match = line.match(/^(\s*)([-*\u2022]\s+)?(.*)$/);
  const indent = match?.[1] ?? "";
  const bullet = match?.[2] ?? "";
  const content = match?.[3] ?? "";
  const firstPrefix = `${indent}${bullet}`;
  const nextPrefix = `${indent}${bullet ? " ".repeat(bullet.length) : ""}`;
  const firstWidth = Math.max(10, maxWidth - visibleWidth(firstPrefix));
  const nextWidth = Math.max(10, maxWidth - visibleWidth(nextPrefix));

  const words = content.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  let prefix = firstPrefix;
  let available = firstWidth;

  for (const word of words) {
    if (!current) {
      if (visibleWidth(word) > available) {
        const parts = splitLongWord(word, available);
        const first = parts.shift() ?? "";
        lines.push(prefix + first);
        prefix = nextPrefix;
        available = nextWidth;
        for (const part of parts) lines.push(prefix + part);
        continue;
      }
      current = word;
      continue;
    }

    const candidate = `${current} ${word}`;
    if (visibleWidth(candidate) <= available) {
      current = candidate;
      continue;
    }

    lines.push(prefix + current);
    prefix = nextPrefix;
    available = nextWidth;

    if (visibleWidth(word) > available) {
      const parts = splitLongWord(word, available);
      const first = parts.shift() ?? "";
      lines.push(prefix + first);
      for (const part of parts) lines.push(prefix + part);
      current = "";
      continue;
    }
    current = word;
  }

  if (current || words.length === 0) {
    lines.push(prefix + current);
  }

  return lines;
}

export function wrapNoteMessage(
  message: string,
  options: { maxWidth?: number; columns?: number } = {},
): string {
  const columns = options.columns ?? process.stdout.columns ?? 80;
  const maxWidth = options.maxWidth ?? Math.max(40, Math.min(88, columns - 10));
  return message
    .split("\n")
    .flatMap((line) => wrapLine(line, maxWidth))
    .join("\n");
}

export function note(message: string, title?: string) {
  const wrapped = wrapNoteMessage(message);
  const lines = wrapped.split("\n");

  // Compute the max visible width across all lines and the title
  const styledTitle = (title ? stylePromptTitle(title) : "") ?? "";
  const titleW = visibleWidth(styledTitle);
  const maxContentW = lines.reduce((max, l) => Math.max(max, visibleWidth(l)), 0);
  const boxInner = Math.max(maxContentW, titleW) + 2; // 2 = left/right padding inside the box

  // Top: │ then ◇  title ────╮
  const topLine =
    chalk.gray(BAR) +
    "\n" +
    chalk.green(CORNER_TL) +
    "  " +
    chalk.reset(styledTitle) +
    " " +
    chalk.gray(HBAR.repeat(Math.max(boxInner - titleW - 1, 1)) + CORNER_TR);

  // Body lines: │  content   padding│
  const body = lines
    .map((l) => {
      const lw = visibleWidth(l);
      const pad = Math.max(0, boxInner - lw);
      return chalk.gray(BAR) + "  " + chalk.dim(l) + " ".repeat(pad) + chalk.gray(BAR);
    })
    .join("\n");

  // Bottom: ├──────────────╯
  const bottom = chalk.gray(CONNECTOR_L + HBAR.repeat(boxInner + 2) + CORNER_BR);

  process.stdout.write(topLine + "\n" + body + "\n" + bottom + "\n");
}
