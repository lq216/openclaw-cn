import type { ClawdbotConfig } from "../config/config.js";
import { DEFAULT_PROVIDER } from "../agents/defaults.js";
import { resolveAllowlistModelKey } from "../agents/model-selection.js";

export function ensureModelAllowlistEntry(params: {
  cfg: ClawdbotConfig;
  modelRef: string;
  defaultProvider?: string;
}): ClawdbotConfig {
  const rawModelRef = params.modelRef.trim();
  if (!rawModelRef) {
    return params.cfg;
  }

  const models = { ...params.cfg.agents?.defaults?.models };
  const keySet = new Set<string>([rawModelRef]);
  const canonicalKey = resolveAllowlistModelKey(
    rawModelRef,
    // @ts-ignore -- cherry-pick upstream type mismatch
    // @ts-ignore -- cherry-pick upstream type mismatch
    params.defaultProvider ?? DEFAULT_PROVIDER,
  );
  if (canonicalKey) {
    keySet.add(canonicalKey);
  }

  for (const key of keySet) {
    models[key] = {
      ...models[key],
    };
  }

  return {
    ...params.cfg,
    agents: {
      ...params.cfg.agents,
      defaults: {
        ...params.cfg.agents?.defaults,
        models,
      },
    },
  };
}
