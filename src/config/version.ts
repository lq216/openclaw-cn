export type ClawdbotVersion = {
  major: number;
  minor: number;
  patch: number;
  revision: number;
};

const VERSION_RE = /^v?(\d+)\.(\d+)\.(\d+)(?:-(\d+))?/;

export function parseClawdbotVersion(raw: string | null | undefined): ClawdbotVersion | null {
  if (!raw) return null;
  const match = raw.trim().match(VERSION_RE);
  if (!match) return null;
  const [, major, minor, patch, revision] = match;
  return {
    major: Number.parseInt(major, 10),
    minor: Number.parseInt(minor, 10),
    patch: Number.parseInt(patch, 10),
    revision: revision ? Number.parseInt(revision, 10) : 0,
  };
}

/**
 * Detect if a version looks like a date-based version (e.g., 2026.2.5)
 * vs a semantic version (e.g., 0.1.0).
 * Date versions have major >= 2000.
 */
export function isDateBasedVersion(v: ClawdbotVersion): boolean {
  return v.major >= 2000;
}

export function compareClawdbotVersions(
  a: string | null | undefined,
  b: string | null | undefined,
): number | null {
  const parsedA = parseClawdbotVersion(a);
  const parsedB = parseClawdbotVersion(b);
  if (!parsedA || !parsedB) return null;
  // Skip comparison if version formats are incompatible (date vs semver)
  if (isDateBasedVersion(parsedA) !== isDateBasedVersion(parsedB)) return null;
  if (parsedA.major !== parsedB.major) return parsedA.major < parsedB.major ? -1 : 1;
  if (parsedA.minor !== parsedB.minor) return parsedA.minor < parsedB.minor ? -1 : 1;
  if (parsedA.patch !== parsedB.patch) return parsedA.patch < parsedB.patch ? -1 : 1;
  if (parsedA.revision !== parsedB.revision) return parsedA.revision < parsedB.revision ? -1 : 1;
  return 0;
}
