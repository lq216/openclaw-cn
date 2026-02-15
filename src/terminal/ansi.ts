const ANSI_SGR_PATTERN = "\\x1b\\[[0-9;]*m";
// OSC-8 hyperlinks: ESC ] 8 ; ; url ST ... ESC ] 8 ; ; ST
const OSC8_PATTERN = "\\x1b\\]8;;.*?\\x1b\\\\|\\x1b\\]8;;\\x1b\\\\";

const ANSI_REGEX = new RegExp(ANSI_SGR_PATTERN, "g");
const OSC8_REGEX = new RegExp(OSC8_PATTERN, "g");

export function stripAnsi(input: string): string {
  return input.replace(OSC8_REGEX, "").replace(ANSI_REGEX, "");
}

/**
 * Check whether a Unicode code point occupies two terminal columns
 * (East Asian Wide / Fullwidth characters, plus common emoji ranges).
 */
function isFullwidthCodePoint(cp: number): boolean {
  return (
    cp >= 0x1100 &&
    (cp <= 0x115f || // Hangul Jamo
      cp === 0x2329 ||
      cp === 0x232a ||
      (cp >= 0x2e80 && cp <= 0x303e) || // CJK Radicals, Kangxi, Ideographic Desc, CJK Symbols
      (cp >= 0x3040 && cp <= 0x33bf) || // Hiragana, Katakana, Bopomofo, Kanbun, CJK Compat
      (cp >= 0x3400 && cp <= 0x4dbf) || // CJK Unified Extension A
      (cp >= 0x4e00 && cp <= 0xa4cf) || // CJK Unified Ideographs, Yi
      (cp >= 0xac00 && cp <= 0xd7af) || // Hangul Syllables
      (cp >= 0xf900 && cp <= 0xfaff) || // CJK Compatibility Ideographs
      (cp >= 0xfe10 && cp <= 0xfe19) || // Vertical Forms
      (cp >= 0xfe30 && cp <= 0xfe6f) || // CJK Compatibility Forms + Small Form Variants
      (cp >= 0xff01 && cp <= 0xff60) || // Fullwidth Forms
      (cp >= 0xffe0 && cp <= 0xffe6) || // Fullwidth Signs
      (cp >= 0x1f000 && cp <= 0x1fbff) || // Emoji & symbols (Mahjong through Symbols Extended-A)
      (cp >= 0x20000 && cp <= 0x2fa1f)) // CJK Unified Extensions B-G, Compatibility Supplement
  );
}

/**
 * Compute the visible terminal column width of a string,
 * accounting for ANSI escape codes and East Asian wide characters.
 */
export function visibleWidth(input: string): number {
  const stripped = stripAnsi(input);
  let width = 0;
  for (const char of stripped) {
    const cp = char.codePointAt(0);
    if (cp !== undefined) {
      width += isFullwidthCodePoint(cp) ? 2 : 1;
    }
  }
  return width;
}
