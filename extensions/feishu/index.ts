import type { ClawdbotPluginApi } from "moltbot-cn/plugin-sdk";
import { emptyPluginConfigSchema } from "moltbot-cn/plugin-sdk";
import { feishuPlugin } from "./src/channel.js";
import { setFeishuRuntime } from "./src/runtime.js";

const plugin = {
  id: "feishu",
  name: "Feishu",
  description: "Feishu channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: ClawdbotPluginApi) {
    setFeishuRuntime(api.runtime);
    api.registerChannel({ plugin: feishuPlugin });
  },
};

export default plugin;
