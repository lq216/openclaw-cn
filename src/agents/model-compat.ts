import type { Api, Model } from "@mariozechner/pi-ai";

function isOpenAiCompletionsModel(model: Model<Api>): model is Model<"openai-completions"> {
  return model.api === "openai-completions";
}

export function normalizeModelCompat(model: Model<Api>): Model<Api> {
  if (!isOpenAiCompletionsModel(model)) return model;

  const baseUrl = model.baseUrl ?? "";
  // Providers that don't support developer role (must use system role instead)
  const isZai = model.provider === "zai" || baseUrl.includes("api.z.ai");
  const isXiaomi = model.provider === "xiaomi" || baseUrl.includes("api.xiaomimimo.com");

  if (!isZai && !isXiaomi) return model;

  const openaiModel = model as Model<"openai-completions">;
  const compat = openaiModel.compat ?? undefined;
  if (compat?.supportsDeveloperRole === false) return model;

  openaiModel.compat = compat
    ? { ...compat, supportsDeveloperRole: false }
    : { supportsDeveloperRole: false };
  return openaiModel;
}
