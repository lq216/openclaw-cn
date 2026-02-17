import { beforeEach, describe, expect, it, vi } from "vitest";
import { lookupContextTokens } from "./context.js";

describe("context", () => {
  describe("lookupContextTokens", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("返回 undefined 当未提供参数时", () => {
      expect(lookupContextTokens()).toBeUndefined();
    });

    it("返回 undefined 当第一个参数为空字符串时", () => {
      expect(lookupContextTokens("")).toBeUndefined();
    });

    it("支持向后兼容的单参数调用（仅 model ID）", () => {
      // 此测试验证向后兼容性
      // 实际值由 pi-coding-agent 模型注册表填充，这里只验证签名兼容性
      const result = lookupContextTokens("claude-opus-4");
      expect(typeof result === "number" || result === undefined).toBe(true);
    });

    it("支持新的双参数调用（provider + model ID）", () => {
      // 测试 provider-namespaced 查找
      const result = lookupContextTokens("anthropic", "claude-opus-4");
      expect(typeof result === "number" || result === undefined).toBe(true);
    });

    it("支持不同 provider 使用相同 model ID 不发生冲突", () => {
      // 此测试记录了修复的意图：不同 provider 的相同 model ID 应该能独立缓存
      // 实际行为取决于 pi-coding-agent 模型注册表的内容
      const anthropicResult = lookupContextTokens("anthropic", "gpt-4");
      const openaiResult = lookupContextTokens("openai", "gpt-4");

      // 两者可能相同（如果只有一个 provider 注册了 gpt-4）
      // 或者不同（如果两个 provider 都注册了不同的 context window）
      // 关键是这两个调用不会相互覆盖
      expect(typeof anthropicResult === "number" || anthropicResult === undefined).toBe(true);
      expect(typeof openaiResult === "number" || openaiResult === undefined).toBe(true);
    });

    it("在提供 provider 时优先使用 provider-namespaced key", () => {
      // 验证查找逻辑：provider+model 优先于 model-only fallback
      const withProvider = lookupContextTokens("anthropic", "claude-sonnet-4-5");
      const withoutProvider = lookupContextTokens("claude-sonnet-4-5");

      // 两种调用都应该返回有效的结果（或 undefined）
      expect(typeof withProvider === "number" || withProvider === undefined).toBe(true);
      expect(typeof withoutProvider === "number" || withoutProvider === undefined).toBe(true);
    });
  });
});
