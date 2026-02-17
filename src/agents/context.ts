// Lazy-load pi-coding-agent model metadata so we can infer context windows when
// the agent reports a model id. This includes custom models.json entries.

import { loadConfig } from "../config/config.js";
import { resolveClawdbotAgentDir } from "./agent-paths.js";
import { ensureOpenClawModelsJson } from "./models-config.js";
import { modelKey } from "./model-selection.js";

type ModelEntry = { id: string; provider?: string; contextWindow?: number };

// 使用 provider-namespaced key 防止不同 Provider 间的缓存键冲突
const MODEL_CACHE = new Map<string, number>();
const loadPromise = (async () => {
  try {
    const { discoverAuthStorage, discoverModels } = await import("@mariozechner/pi-coding-agent");
    const cfg = loadConfig();
    await ensureOpenClawModelsJson(cfg);
    const agentDir = resolveClawdbotAgentDir();
    const authStorage = discoverAuthStorage(agentDir);
    const modelRegistry = discoverModels(authStorage, agentDir);
    const models = modelRegistry.getAll() as ModelEntry[];
    for (const m of models) {
      if (!m?.id) continue;
      if (typeof m.contextWindow === "number" && m.contextWindow > 0) {
        // 使用 provider/model 格式的 key，避免缓存冲突
        const provider = m.provider ?? "unknown";
        const key = modelKey(provider, m.id);
        MODEL_CACHE.set(key, m.contextWindow);
        // 为了向后兼容，也保留纯 model ID 的 fallback（仅当该 model ID 尚未存在时）
        if (!MODEL_CACHE.has(m.id)) {
          MODEL_CACHE.set(m.id, m.contextWindow);
        }
      }
    }
  } catch {
    // 如果 pi-ai 不可用，缓存保持为空；lookup 会回退到默认值
  }
})();

export function lookupContextTokens(
  providerOrModel?: string,
  modelId?: string,
): number | undefined {
  if (!providerOrModel) return undefined;

  // Best-effort: kick off loading, but don't block.
  void loadPromise;

  // 如果提供了两个参数，使用 provider-namespaced key（推荐方式）
  if (modelId) {
    const key = modelKey(providerOrModel, modelId);
    const result = MODEL_CACHE.get(key);
    if (result !== undefined) return result;
    // Fallback: 尝试仅用 model ID 查找
    return MODEL_CACHE.get(modelId);
  }

  // 如果只提供了一个参数，作为 model ID 处理（向后兼容）
  return MODEL_CACHE.get(providerOrModel);
}
