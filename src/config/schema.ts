import { CHANNEL_IDS } from "../channels/registry.js";
import { VERSION } from "../version.js";
import { ClawdbotSchema } from "./zod-schema.js";

export type ConfigUiHint = {
  label?: string;
  help?: string;
  group?: string;
  order?: number;
  advanced?: boolean;
  sensitive?: boolean;
  placeholder?: string;
  itemTemplate?: unknown;
};

export type ConfigUiHints = Record<string, ConfigUiHint>;

export type ConfigSchema = ReturnType<typeof ClawdbotSchema.toJSONSchema>;

type JsonSchemaNode = Record<string, unknown>;

export type ConfigSchemaResponse = {
  schema: ConfigSchema;
  uiHints: ConfigUiHints;
  version: string;
  generatedAt: string;
};

export type PluginUiMetadata = {
  id: string;
  name?: string;
  description?: string;
  configUiHints?: Record<
    string,
    Pick<ConfigUiHint, "label" | "help" | "advanced" | "sensitive" | "placeholder">
  >;
  configSchema?: JsonSchemaNode;
};

export type ChannelUiMetadata = {
  id: string;
  label?: string;
  description?: string;
  configSchema?: JsonSchemaNode;
  configUiHints?: Record<string, ConfigUiHint>;
};

const GROUP_LABELS: Record<string, string> = {
  wizard: "向导",
  update: "更新",
  diagnostics: "诊断",
  logging: "日志",
  gateway: "网关",
  nodeHost: "节点主机",
  agents: "代理",
  tools: "工具",
  bindings: "绑定",
  audio: "音频",
  models: "模型",
  messages: "消息",
  commands: "命令",
  session: "会话",
  cron: "定时任务",
  hooks: "钩子",
  ui: "用户界面",
  browser: "浏览器",
  talk: "语音",
  channels: "消息通道",
  skills: "技能",
  plugins: "插件",
  discovery: "发现",
  presence: "状态",
  voicewake: "语音唤醒",
};

const GROUP_ORDER: Record<string, number> = {
  wizard: 20,
  update: 25,
  diagnostics: 27,
  gateway: 30,
  nodeHost: 35,
  agents: 40,
  tools: 50,
  bindings: 55,
  audio: 60,
  models: 70,
  messages: 80,
  commands: 85,
  session: 90,
  cron: 100,
  hooks: 110,
  ui: 120,
  browser: 130,
  talk: 140,
  channels: 150,
  skills: 200,
  plugins: 205,
  discovery: 210,
  presence: 220,
  voicewake: 230,
  logging: 900,
};

const FIELD_LABELS: Record<string, string> = {
  "meta.lastTouchedVersion": "配置上次修改版本",
  "meta.lastTouchedAt": "配置上次修改时间",
  "update.channel": "更新通道",
  "update.checkOnStart": "启动时检查更新",
  "diagnostics.enabled": "诊断启用",
  "diagnostics.flags": "诊断标志",
  "diagnostics.otel.enabled": "OpenTelemetry启用",
  "diagnostics.otel.endpoint": "OpenTelemetry端点",
  "diagnostics.otel.protocol": "OpenTelemetry协议",
  "diagnostics.otel.headers": "OpenTelemetry头部",
  "diagnostics.otel.serviceName": "OpenTelemetry服务名称",
  "diagnostics.otel.traces": "OpenTelemetry追踪启用",
  "diagnostics.otel.metrics": "OpenTelemetry指标启用",
  "diagnostics.otel.logs": "OpenTelemetry日志启用",
  "diagnostics.otel.sampleRate": "OpenTelemetry追踪采样率",
  "diagnostics.otel.flushIntervalMs": "OpenTelemetry刷新间隔(毫秒)",
  "diagnostics.cacheTrace.enabled": "缓存追踪启用",
  "diagnostics.cacheTrace.filePath": "缓存追踪文件路径",
  "diagnostics.cacheTrace.includeMessages": "缓存追踪包含消息",
  "diagnostics.cacheTrace.includePrompt": "缓存追踪包含提示",
  "diagnostics.cacheTrace.includeSystem": "缓存追踪包含系统",
  "agents.list.*.identity.avatar": "身份头像",
  "agents.list.*.skills": "代理技能过滤",
  "gateway.remote.url": "远程网关URL",
  "gateway.remote.sshTarget": "远程网关SSH目标",
  "gateway.remote.sshIdentity": "远程网关SSH身份",
  "gateway.remote.token": "远程网关令牌",
  "gateway.remote.password": "远程网关密码",
  "gateway.remote.tlsFingerprint": "远程网关TLS指纹",
  "gateway.auth.token": "网关令牌",
  "gateway.auth.password": "网关密码",
  "tools.media.image.enabled": "启用图像理解",
  "tools.media.image.maxBytes": "图像理解最大字节数",
  "tools.media.image.maxChars": "图像理解最大字符数",
  "tools.media.image.prompt": "图像理解提示",
  "tools.media.image.timeoutSeconds": "图像理解超时(秒)",
  "tools.media.image.attachments": "图像理解附件策略",
  "tools.media.image.models": "图像理解模型",
  "tools.media.image.scope": "图像理解范围",
  "tools.media.models": "媒体理解共享模型",
  "tools.media.concurrency": "媒体理解并发数",
  "tools.media.audio.enabled": "启用音频理解",
  "tools.media.audio.maxBytes": "音频理解最大字节数",
  "tools.media.audio.maxChars": "音频理解最大字符数",
  "tools.media.audio.prompt": "音频理解提示",
  "tools.media.audio.timeoutSeconds": "音频理解超时(秒)",
  "tools.media.audio.language": "音频理解语言",
  "tools.media.audio.attachments": "音频理解附件策略",
  "tools.media.audio.models": "音频理解模型",
  "tools.media.audio.scope": "音频理解范围",
  "tools.media.video.enabled": "启用视频理解",
  "tools.media.video.maxBytes": "视频理解最大字节数",
  "tools.media.video.maxChars": "视频理解最大字符数",
  "tools.media.video.prompt": "视频理解提示",
  "tools.media.video.timeoutSeconds": "视频理解超时(秒)",
  "tools.media.video.attachments": "视频理解附件策略",
  "tools.media.video.models": "视频理解模型",
  "tools.media.video.scope": "视频理解范围",
  "tools.links.enabled": "启用链接理解",
  "tools.links.maxLinks": "链接理解最大链接数",
  "tools.links.timeoutSeconds": "链接理解超时(秒)",
  "tools.links.models": "链接理解模型",
  "tools.links.scope": "链接理解范围",
  "tools.profile": "工具配置",
  "tools.alsoAllow": "工具白名单附加",
  "agents.list[].tools.profile": "代理工具配置",
  "agents.list[].tools.alsoAllow": "代理工具白名单附加",
  "tools.byProvider": "按提供商划分的工具策略",
  "agents.list[].tools.byProvider": "按提供商划分的代理工具策略",
  "tools.exec.applyPatch.enabled": "启用apply_patch",
  "tools.exec.applyPatch.allowModels": "apply_patch模型白名单",
  "tools.exec.notifyOnExit": "退出时执行通知",
  "tools.exec.approvalRunningNoticeMs": "执行批准运行通知(毫秒)",
  "tools.exec.host": "执行主机",
  "tools.exec.security": "执行安全",
  "tools.exec.ask": "执行询问",
  "tools.exec.node": "执行节点绑定",
  "tools.exec.pathPrepend": "执行PATH前置",
  "tools.exec.safeBins": "执行安全二进制文件",
  "tools.message.allowCrossContextSend": "允许跨上下文消息",
  "tools.message.crossContext.allowWithinProvider": "允许跨上下文(同一提供商)",
  "tools.message.crossContext.allowAcrossProviders": "允许跨上下文(跨提供商)",
  "tools.message.crossContext.marker.enabled": "跨上下文标记",
  "tools.message.crossContext.marker.prefix": "跨上下文标记前缀",
  "tools.message.crossContext.marker.suffix": "跨上下文标记后缀",
  "tools.message.broadcast.enabled": "启用消息广播",
  "tools.web.search.enabled": "启用网络搜索工具",
  "tools.web.search.provider": "网络搜索提供商",
  "tools.web.search.apiKey": "Brave搜索API密钥",
  "tools.web.search.maxResults": "网络搜索最大结果数",
  "tools.web.search.timeoutSeconds": "网络搜索超时(秒)",
  "tools.web.search.cacheTtlMinutes": "网络搜索缓存TTL(分钟)",
  "tools.web.fetch.enabled": "启用网络获取工具",
  "tools.web.fetch.maxChars": "网络获取最大字符数",
  "tools.web.fetch.timeoutSeconds": "网络获取超时(秒)",
  "tools.web.fetch.cacheTtlMinutes": "网络获取缓存TTL(分钟)",
  "tools.web.fetch.maxRedirects": "网络获取最大重定向次数",
  "tools.web.fetch.userAgent": "网络获取用户代理",
  "gateway.controlUi.basePath": "控制UI基础路径",
  "gateway.controlUi.root": "控制UI资源根目录",
  "gateway.controlUi.allowedOrigins": "控制UI允许的来源",
  "gateway.controlUi.allowInsecureAuth": "允许不安全的控制UI认证",
  "gateway.controlUi.dangerouslyDisableDeviceAuth": "危险：禁用控制UI设备认证",
  "gateway.http.endpoints.chatCompletions.enabled": "OpenAI聊天完成端点",
  "gateway.reload.mode": "配置重载模式",
  "gateway.reload.debounceMs": "配置重载防抖(毫秒)",
  "gateway.nodes.browser.mode": "网关节点浏览器模式",
  "gateway.nodes.browser.node": "网关节点浏览器固定",
  "gateway.nodes.allowCommands": "网关节点白名单(额外命令)",
  "gateway.nodes.denyCommands": "网关节点黑名单",
  "nodeHost.browserProxy.enabled": "节点浏览器代理启用",
  "nodeHost.browserProxy.allowProfiles": "节点浏览器代理允许配置文件",
  "skills.load.watch": "监视技能",
  "skills.load.watchDebounceMs": "技能监视防抖(毫秒)",
  "agents.defaults.workspace": "工作区",
  "agents.defaults.repoRoot": "仓库根目录",
  "agents.defaults.bootstrapMaxChars": "引导最大字符数",
  "agents.defaults.envelopeTimezone": "信封时区",
  "agents.defaults.envelopeTimestamp": "信封时间戳",
  "agents.defaults.envelopeElapsed": "信封经过时间",
  "agents.defaults.memorySearch": "内存搜索",
  "agents.defaults.memorySearch.enabled": "启用内存搜索",
  "agents.defaults.memorySearch.sources": "内存搜索源",
  "agents.defaults.memorySearch.extraPaths": "额外内存路径",
  "agents.defaults.memorySearch.experimental.sessionMemory": "内存搜索会话索引(实验性)",
  "agents.defaults.memorySearch.provider": "内存搜索提供商",
  "agents.defaults.memorySearch.remote.baseUrl": "远程嵌入基础URL",
  "agents.defaults.memorySearch.remote.apiKey": "远程嵌入API密钥",
  "agents.defaults.memorySearch.remote.headers": "远程嵌入头部",
  "agents.defaults.memorySearch.remote.batch.concurrency": "远程批量并发数",
  "agents.defaults.memorySearch.model": "内存搜索模型",
  "agents.defaults.memorySearch.fallback": "内存搜索备用",
  "agents.defaults.memorySearch.local.modelPath": "本地嵌入模型路径",
  "agents.defaults.memorySearch.store.path": "内存搜索索引路径",
  "agents.defaults.memorySearch.store.vector.enabled": "内存搜索向量索引",
  "agents.defaults.memorySearch.store.vector.extensionPath": "内存搜索向量扩展路径",
  "agents.defaults.memorySearch.chunking.tokens": "内存块标记",
  "agents.defaults.memorySearch.chunking.overlap": "内存块重叠标记",
  "agents.defaults.memorySearch.sync.onSessionStart": "会话开始时建立索引",
  "agents.defaults.memorySearch.sync.onSearch": "搜索时建立索引(懒加载)",
  "agents.defaults.memorySearch.sync.watch": "监视内存文件",
  "agents.defaults.memorySearch.sync.watchDebounceMs": "内存监视防抖(毫秒)",
  "agents.defaults.memorySearch.sync.sessions.deltaBytes": "会话增量字节数",
  "agents.defaults.memorySearch.sync.sessions.deltaMessages": "会话增量消息数",
  "agents.defaults.memorySearch.query.maxResults": "内存搜索最大结果数",
  "agents.defaults.memorySearch.query.minScore": "内存搜索最小分数",
  "agents.defaults.memorySearch.query.hybrid.enabled": "内存搜索混合模式",
  "agents.defaults.memorySearch.query.hybrid.vectorWeight": "内存搜索向量权重",
  "agents.defaults.memorySearch.query.hybrid.textWeight": "内存搜索文本权重",
  "agents.defaults.memorySearch.query.hybrid.candidateMultiplier": "内存搜索混合候选倍数",
  "agents.defaults.memorySearch.cache.enabled": "内存搜索嵌入缓存",
  "agents.defaults.memorySearch.cache.maxEntries": "内存搜索嵌入缓存最大条目",
  memory: "内存",
  "memory.backend": "内存后端",
  "memory.citations": "内存引用模式",
  "memory.qmd.command": "QMD二进制文件",
  "memory.qmd.includeDefaultMemory": "QMD包含默认内存",
  "memory.qmd.paths": "QMD额外路径",
  "memory.qmd.paths.path": "QMD路径",
  "memory.qmd.paths.pattern": "QMD路径模式",
  "memory.qmd.paths.name": "QMD路径名称",
  "memory.qmd.sessions.enabled": "QMD会话索引",
  "memory.qmd.sessions.exportDir": "QMD会话导出目录",
  "memory.qmd.sessions.retentionDays": "QMD会话保留(天)",
  "memory.qmd.update.interval": "QMD更新间隔",
  "memory.qmd.update.debounceMs": "QMD更新防抖(毫秒)",
  "memory.qmd.update.onBoot": "QMD启动时更新",
  "memory.qmd.update.embedInterval": "QMD嵌入间隔",
  "memory.qmd.limits.maxResults": "QMD最大结果数",
  "memory.qmd.limits.maxSnippetChars": "QMD最大片段字符数",
  "memory.qmd.limits.maxInjectedChars": "QMD最大注入字符数",
  "memory.qmd.limits.timeoutMs": "QMD搜索超时(毫秒)",
  "memory.qmd.scope": "QMD显示范围",
  "auth.profiles": "认证配置文件",
  "auth.order": "认证配置文件顺序",
  "auth.cooldowns.billingBackoffHours": "计费退避(小时)",
  "auth.cooldowns.billingBackoffHoursByProvider": "计费退避覆盖",
  "auth.cooldowns.billingMaxHours": "计费退避上限(小时)",
  "auth.cooldowns.failureWindowHours": "故障转移窗口(小时)",
  "agents.defaults.models": "模型",
  "agents.defaults.model.primary": "主要模型",
  "agents.defaults.model.fallbacks": "模型备用",
  "agents.defaults.imageModel.primary": "图像模型",
  "agents.defaults.imageModel.fallbacks": "图像模型备用",
  "agents.defaults.humanDelay.mode": "人类延迟模式",
  "agents.defaults.humanDelay.minMs": "人类延迟最小值(毫秒)",
  "agents.defaults.humanDelay.maxMs": "人类延迟最大值(毫秒)",
  "agents.defaults.cliBackends": "CLI后端",
  "commands.native": "原生命令",
  "commands.nativeSkills": "原生技能命令",
  "commands.text": "文本命令",
  "commands.bash": "允许Bash聊天命令",
  "commands.bashForegroundMs": "Bash前台窗口(毫秒)",
  "commands.config": "允许/config",
  "commands.debug": "允许/debug",
  "commands.restart": "允许重启",
  "commands.useAccessGroups": "使用访问组",
  "commands.ownerAllowFrom": "命令所有者",
  "ui.seamColor": "强调色",
  "ui.assistant.name": "助手名称",
  "ui.assistant.avatar": "助手头像",
  "browser.controlUrl": "浏览器控制URL",
  "browser.evaluateEnabled": "浏览器评估启用",
  "browser.snapshotDefaults": "浏览器快照默认设置",
  "browser.snapshotDefaults.mode": "浏览器快照模式",
  "browser.remoteCdpTimeoutMs": "远程CDP超时(毫秒)",
  "browser.remoteCdpHandshakeTimeoutMs": "远程CDP握手超时(毫秒)",
  "session.dmScope": "私信会话范围",
  "session.agentToAgent.maxPingPongTurns": "代理间往返轮次",
  "messages.ackReaction": "确认反应表情",
  "messages.ackReactionScope": "确认反应范围",
  "messages.inbound.debounceMs": "入站消息防抖(毫秒)",
  "talk.apiKey": "语音API密钥",
  "channels.whatsapp": "WhatsApp",
  "channels.telegram": "Telegram",
  "channels.telegram.customCommands": "Telegram自定义命令",
  "channels.discord": "Discord",
  "channels.slack": "Slack",
  "channels.mattermost": "Mattermost",
  "channels.signal": "Signal",
  "channels.imessage": "iMessage",
  "channels.bluebubbles": "BlueBubbles",
  "channels.msteams": "MS Teams",
  "channels.telegram.botToken": "Telegram机器人令牌",
  "channels.telegram.dmPolicy": "Telegram私信策略",
  "channels.telegram.streamMode": "Telegram草稿流模式",
  "channels.telegram.draftChunk.minChars": "Telegram草稿块最小字符数",
  "channels.telegram.draftChunk.maxChars": "Telegram草稿块最大字符数",
  "channels.telegram.draftChunk.breakPreference": "Telegram草稿块断点偏好",
  "channels.telegram.retry.attempts": "Telegram重试次数",
  "channels.telegram.retry.minDelayMs": "Telegram重试最小延迟(毫秒)",
  "channels.telegram.retry.maxDelayMs": "Telegram重试最大延迟(毫秒)",
  "channels.telegram.retry.jitter": "Telegram重试抖动",
  "channels.telegram.timeoutSeconds": "Telegram API超时(秒)",
  "channels.telegram.capabilities.inlineButtons": "Telegram内联按钮",
  "channels.whatsapp.dmPolicy": "WhatsApp私信策略",
  "channels.whatsapp.selfChatMode": "WhatsApp自用手机模式",
  "channels.whatsapp.debounceMs": "WhatsApp消息防抖(毫秒)",
  "channels.signal.dmPolicy": "Signal私信策略",
  "channels.imessage.dmPolicy": "iMessage私信策略",
  "channels.bluebubbles.dmPolicy": "BlueBubbles私信策略",
  "channels.discord.dm.policy": "Discord私信策略",
  "channels.discord.retry.attempts": "Discord重试次数",
  "channels.discord.retry.minDelayMs": "Discord重试最小延迟(毫秒)",
  "channels.discord.retry.maxDelayMs": "Discord重试最大延迟(毫秒)",
  "channels.discord.retry.jitter": "Discord重试抖动",
  "channels.discord.maxLinesPerMessage": "Discord每条消息最大行数",
  "channels.discord.intents.presence": "Discord状态意图",
  "channels.discord.intents.guildMembers": "Discord公会成员意图",
  "channels.slack.dm.policy": "Slack私信策略",
  "channels.slack.allowBots": "Slack允许机器人消息",
  "channels.discord.token": "Discord机器人令牌",
  "channels.slack.botToken": "Slack机器人令牌",
  "channels.slack.appToken": "Slack应用令牌",
  "channels.slack.userToken": "Slack用户令牌",
  "channels.slack.userTokenReadOnly": "Slack用户令牌只读",
  "channels.slack.thread.historyScope": "Slack主题历史范围",
  "channels.slack.thread.inheritParent": "Slack主题父级继承",
  "channels.mattermost.botToken": "Mattermost机器人令牌",
  "channels.mattermost.baseUrl": "Mattermost基础URL",
  "channels.mattermost.chatmode": "Mattermost聊天模式",
  "channels.mattermost.oncharPrefixes": "Mattermost字符前缀",
  "channels.mattermost.requireMention": "Mattermost需要提及",
  "channels.signal.account": "Signal账户",
  "channels.imessage.cliPath": "iMessage CLI路径",
  "agents.list[].identity.avatar": "代理头像",
  "discovery.mdns.mode": "mDNS发现模式",
  "plugins.enabled": "启用插件",
  "plugins.allow": "插件白名单",
  "plugins.deny": "插件黑名单",
  "plugins.load.paths": "插件加载路径",
  "plugins.slots": "插件槽位",
  "plugins.slots.memory": "内存插件",
  "plugins.entries": "插件条目",
  "plugins.entries.*.enabled": "插件启用",
  "plugins.entries.*.config": "插件配置",
  "plugins.installs": "插件安装记录",
  "plugins.installs.*.source": "插件安装来源",
  "plugins.installs.*.spec": "插件安装规格",
  "plugins.installs.*.sourcePath": "插件安装源路径",
  "plugins.installs.*.installPath": "插件安装路径",
  "plugins.installs.*.version": "插件安装版本",
  "plugins.installs.*.installedAt": "插件安装时间",
};

const FIELD_HELP: Record<string, string> = {
  "meta.lastTouchedVersion": "当Clawdbot写入配置时自动设置。",
  "meta.lastTouchedAt": "最后一次配置写入的ISO时间戳(自动设置)。",
  "update.channel": 'Git + npm安装的更新通道("stable"、"beta"或"dev")。',
  "update.checkOnStart": "网关启动时检查npm更新(默认: true)。",
  "gateway.remote.url": "远程网关WebSocket URL (ws:// 或 wss://)。",
  "gateway.remote.tlsFingerprint": "远程网关的预期sha256 TLS指纹(MITM防护)。",
  "gateway.remote.sshTarget":
    "通过SSH的远程网关(将网关端口隧道传输到localhost)。格式: user@host 或 user@host:port。",
  "gateway.remote.sshIdentity": "可选的SSH身份文件路径(传递给ssh -i)。",
  "agents.list[].identity.avatar": "头像图片路径(仅相对于代理工作区)或远程URL/data URL。",
  "discovery.mdns.mode": 'mDNS广播模式("minimal"默认，"full"包含cliPath/sshPort，"off"禁用mDNS)。',
  "gateway.auth.token": "网关访问的默认必需项(除非使用Tailscale Serve身份);非环回绑定必需。",
  "gateway.auth.password": "Tailscale隧道所需。",
  "gateway.controlUi.basePath": "控制UI服务的可选URL前缀(例如 /clawdbot)。",
  "gateway.controlUi.allowInsecureAuth": "允许通过不安全HTTP进行控制UI认证(仅令牌;不推荐)。",
  "gateway.controlUi.dangerouslyDisableDeviceAuth": "危险。禁用控制UI设备身份验证(仅令牌/密码)。",
  "gateway.http.endpoints.chatCompletions.enabled":
    "启用与OpenAI兼容的`POST /v1/chat/completions`端点(默认: false)。",
  "gateway.reload.mode": '配置更改的热重载策略("hybrid"推荐)。',
  "gateway.reload.debounceMs": "应用配置更改前的防抖窗口(毫秒)。",
  "gateway.nodes.browser.mode":
    '节点浏览器路由("auto" = 选择单个已连接的浏览器节点，"manual" = 需要节点参数，"off" = 禁用)。',
  "gateway.nodes.browser.node": "将浏览器路由固定到特定节点ID或名称(可选)。",
  "gateway.nodes.allowCommands": "网关默认之外允许的额外node.invoke命令(命令字符串数组)。",
  "gateway.nodes.denyCommands": "即使存在于节点声明或默认白名单中也要阻止的命令。",
  "nodeHost.browserProxy.enabled": "通过节点代理暴露本地浏览器控制服务器。",
  "nodeHost.browserProxy.allowProfiles": "通过节点代理公开的浏览器配置文件名称的可选白名单。",
  "diagnostics.flags":
    '按标志启用针对性诊断日志(例如["telegram.http"])。支持通配符如"telegram.*"或"*"。',
  "diagnostics.cacheTrace.enabled": "为嵌入式代理运行记录缓存跟踪快照(默认: false)。",
  "diagnostics.cacheTrace.filePath":
    "缓存跟踪日志的JSONL输出路径(默认: $OPENCLAW_STATE_DIR/logs/cache-trace.jsonl)。",
  "diagnostics.cacheTrace.includeMessages": "在跟踪输出中包含完整消息负载(默认: true)。",
  "diagnostics.cacheTrace.includePrompt": "在跟踪输出中包含提示文本(默认: true)。",
  "diagnostics.cacheTrace.includeSystem": "在跟踪输出中包含系统提示(默认: true)。",
  "tools.exec.applyPatch.enabled": "实验性。当工具策略允许时为OpenAI模型启用apply_patch。",
  "tools.exec.applyPatch.allowModels": '模型ID的可选白名单(例如"gpt-5.2"或"openai/gpt-5.2")。',
  "tools.exec.notifyOnExit": "当为true(默认)时，后台exec会话在退出时排队系统事件并请求心跳。",
  "tools.exec.pathPrepend": "为exec运行预置到PATH的目录(gateway/sandbox)。",
  "tools.exec.safeBins": "允许stdin-only安全二进制文件在没有显式白名单条目的情况下运行。",
  "tools.message.allowCrossContextSend": "遗留覆盖: 允许跨所有提供商的跨上下文发送。",
  "tools.message.crossContext.allowWithinProvider":
    "允许向同一提供商内的其他通道发送(默认: true)。",
  "tools.message.crossContext.allowAcrossProviders": "允许跨不同提供商发送(默认: false)。",
  "tools.message.crossContext.marker.enabled": "跨上下文发送时添加可见的来源标记(默认: true)。",
  "tools.message.crossContext.marker.prefix": '跨上下文标记的文本前缀(支持"{channel}")。',
  "tools.message.crossContext.marker.suffix": '跨上下文标记的文本后缀(支持"{channel}")。',
  "tools.message.broadcast.enabled": "启用广播操作(默认: true)。",
  "tools.web.search.enabled": "启用web_search工具(需要提供商API密钥)。",
  "tools.web.search.provider": '搜索提供商("brave"或"perplexity")。',
  "tools.web.search.apiKey": "Brave搜索API密钥(后备: BRAVE_API_KEY环境变量)。",
  "tools.web.search.maxResults": "返回结果的默认数量(1-10)。",
  "tools.web.search.timeoutSeconds": "web_search请求的超时秒数。",
  "tools.web.search.cacheTtlMinutes": "web_search结果的缓存TTL(分钟)。",
  "tools.web.search.perplexity.apiKey":
    "Perplexity或OpenRouter API密钥(后备: PERPLEXITY_API_KEY或OPENROUTER_API_KEY环境变量)。",
  "tools.web.search.perplexity.baseUrl":
    "Perplexity基础URL覆盖(默认: https://openrouter.ai/api/v1或https://api.perplexity.ai)。",
  "tools.web.search.perplexity.model": 'Perplexity模型覆盖(默认: "perplexity/sonar-pro")。',
  "tools.web.fetch.enabled": "启用web_fetch工具(轻量级HTTP获取)。",
  "tools.web.fetch.maxChars": "web_fetch返回的最大字符数(截断)。",
  "tools.web.fetch.timeoutSeconds": "web_fetch请求的超时秒数。",
  "tools.web.fetch.cacheTtlMinutes": "web_fetch结果的缓存TTL(分钟)。",
  "tools.web.fetch.maxRedirects": "web_fetch允许的最大重定向次数(默认: 3)。",
  "tools.web.fetch.userAgent": "覆盖web_fetch请求的User-Agent头部。",
  "tools.web.fetch.readability": "使用Readability从HTML提取主要内容(回落到基本HTML清理)。",
  "tools.web.fetch.firecrawl.enabled": "为web_fetch启用Firecrawl回退(如果已配置)。",
  "tools.web.fetch.firecrawl.apiKey": "Firecrawl API密钥(后备: FIRECRAWL_API_KEY环境变量)。",
  "tools.web.fetch.firecrawl.baseUrl":
    "Firecrawl基础URL(例如 https://api.firecrawl.dev或自定义端点)。",
  "tools.web.fetch.firecrawl.onlyMainContent": "当为true时，Firecrawl仅返回主要内容(默认: true)。",
  "tools.web.fetch.firecrawl.maxAgeMs": "API支持时缓存结果的Firecrawl maxAge(毫秒)。",
  "tools.web.fetch.firecrawl.timeoutSeconds": "Firecrawl请求的超时秒数。",
  "channels.slack.allowBots": "允许机器人撰写的邮件触发Slack回复(默认: false)。",
  "channels.slack.thread.historyScope":
    'Slack主题历史上下文的范围("thread"每主题隔离;"channel"重用频道历史)。',
  "channels.slack.thread.inheritParent": "如果为true，Slack主题会话继承父频道转录(默认: false)。",
  "channels.mattermost.botToken": "来自Mattermost系统控制台->集成->机器人账户的机器人令牌。",
  "channels.mattermost.baseUrl": "你的Mattermost服务器的基础URL(例如，https://chat.example.com)。",
  "channels.mattermost.chatmode":
    '在提及("oncall")、触发字符(">"或"!")("onchar")或每条消息("onmessage")时回复频道消息。',
  "channels.mattermost.oncharPrefixes": 'onchar模式的触发前缀(默认: [">", "!"])。',
  "channels.mattermost.requireMention": "响应前在频道中需要@提及(默认: true)。",
  "auth.profiles": "命名认证配置文件(提供商+模式+可选邮箱)。",
  "auth.order": "按提供商排序的认证配置文件ID(用于自动故障转移)。",
  "auth.cooldowns.billingBackoffHours":
    "因账单/积分不足导致配置文件失败时的基础退避时间(小时)(默认: 5)。",
  "auth.cooldowns.billingBackoffHoursByProvider": "按提供商可选的账单退避覆盖(小时)。",
  "auth.cooldowns.billingMaxHours": "账单退避上限(小时)(默认: 24)。",
  "auth.cooldowns.failureWindowHours": "退避计数器的故障窗口(小时)(默认: 24)。",
  "agents.defaults.bootstrapMaxChars":
    "截断前注入系统提示的每个工作区引导文件的最大字符数(默认: 20000)。",
  "agents.defaults.repoRoot": "系统提示运行时行中显示的可选仓库根目录(覆盖自动检测)。",
  "agents.defaults.envelopeTimezone": '消息信封的时区("utc"、"local"、"user"或IANA时区字符串)。',
  "agents.defaults.envelopeTimestamp": '在消息信封中包含绝对时间戳("on"或"off")。',
  "agents.defaults.envelopeElapsed": '在消息信封中包含经过时间("on"或"off")。',
  "agents.defaults.models": "配置的模型目录(键为完整的提供商/模型ID)。",
  "agents.defaults.memorySearch": "对MEMORY.md和memory/*.md的向量搜索(支持按代理覆盖)。",
  "agents.defaults.memorySearch.sources":
    '内存搜索的索引源(默认: ["memory"];添加"sessions"以包含会话转录)。',
  "agents.defaults.memorySearch.experimental.sessionMemory":
    "为内存搜索启用实验性会话转录索引(默认: false)。",
  "agents.defaults.memorySearch.provider": '嵌入提供商("openai"、"gemini"或"local")。',
  "agents.defaults.memorySearch.remote.baseUrl":
    "远程嵌入的自定义基础URL(与OpenAI兼容的代理或Gemini覆盖)。",
  "agents.defaults.memorySearch.remote.apiKey": "远程嵌入提供商的自定义API密钥。",
  "agents.defaults.memorySearch.remote.headers": "远程嵌入的额外头部(合并;远程覆盖OpenAI头部)。",
  "agents.defaults.memorySearch.remote.batch.enabled":
    "为内存嵌入启用批量API(OpenAI/Gemini;默认: true)。",
  "agents.defaults.memorySearch.remote.batch.wait": "索引时等待批量完成(默认: true)。",
  "agents.defaults.memorySearch.remote.batch.concurrency":
    "内存索引的最大并发嵌入批量作业(默认: 2)。",
  "agents.defaults.memorySearch.remote.batch.pollIntervalMs":
    "批量状态的轮询间隔(毫秒)(默认: 2000)。",
  "agents.defaults.memorySearch.remote.batch.timeoutMinutes": "批量索引的超时(分钟)(默认: 60)。",
  "agents.defaults.memorySearch.local.modelPath": "本地GGUF模型路径或hf: URI(node-llama-cpp)。",
  "agents.defaults.memorySearch.fallback":
    '嵌入失败时的备用提供商("openai"、"gemini"、"local"或"none")。',
  "agents.defaults.memorySearch.store.path":
    "SQLite索引路径(默认: ~/.openclaw/memory/{agentId}.sqlite)。",
  "agents.defaults.memorySearch.store.vector.enabled": "为向量搜索启用sqlite-vec扩展(默认: true)。",
  "agents.defaults.memorySearch.store.vector.extensionPath":
    "sqlite-vec扩展库的可选覆盖路径(.dylib/.so/.dll)。",
  "agents.defaults.memorySearch.query.hybrid.enabled":
    "为内存启用混合BM25 + 向量搜索(默认: true)。",
  "agents.defaults.memorySearch.query.hybrid.vectorWeight": "合并结果时向量相似度的权重(0-1)。",
  "agents.defaults.memorySearch.query.hybrid.textWeight": "合并结果时BM25文本相关性的权重(0-1)。",
  "agents.defaults.memorySearch.query.hybrid.candidateMultiplier": "候选项池大小的乘数(默认: 4)。",
  "agents.defaults.memorySearch.cache.enabled":
    "在SQLite中缓存块嵌入以加速重新索引和频繁更新(默认: true)。",
  "agents.defaults.memorySearch.cache.maxEntries": "缓存嵌入的可选上限(尽力而为)。",
  "agents.defaults.memorySearch.sync.onSearch": "惰性同步: 变更后在搜索时安排重新索引。",
  "agents.defaults.memorySearch.sync.watch": "监视内存文件变更(chokidar)。",
  "agents.defaults.memorySearch.sync.sessions.deltaBytes":
    "会话转录触发重新索引前的最小追加字节数(默认: 100000)。",
  "agents.defaults.memorySearch.sync.sessions.deltaMessages":
    "会话转录触发重新索引前的最小追加JSONL行数(默认: 50)。",
  "plugins.enabled": "启用插件/扩展加载(默认: true)。",
  "plugins.allow": "插件ID的可选白名单;设置后，仅加载列表中的插件。",
  "plugins.deny": "插件ID的可选黑名单;拒绝优先于白名单。",
  "plugins.load.paths": "要加载的附加插件文件或目录。",
  "plugins.slots": "选择哪个插件拥有独占槽位(内存等)。",
  "plugins.slots.memory": '按ID选择活动内存插件，或"none"禁用内存插件。',
  "plugins.entries": "按插件ID键入的每个插件设置(启用/禁用+配置负载)。",
  "plugins.entries.*.enabled": "覆盖此条目的插件启用/禁用(需要重启)。",
  "plugins.entries.*.config": "插件定义的配置负载(模式由插件提供)。",
  "plugins.installs": "CLI管理的安装元数据(由`openclaw-cn plugins update`用于定位安装源)。",
  "plugins.installs.*.source": '安装源("npm"、"archive"或"path")。',
  "plugins.installs.*.spec": "用于安装的原始npm规范(如果源是npm)。",
  "plugins.installs.*.sourcePath": "用于安装的原始归档/路径(如果有)。",
  "plugins.installs.*.installPath": "解析的安装目录(通常为 ~/.openclaw/extensions/<id>)。",
  "plugins.installs.*.version": "安装时记录的版本(如果可用)。",
  "plugins.installs.*.installedAt": "最后一次安装/更新的ISO时间戳。",
  "agents.list.*.identity.avatar": "代理头像(工作区相对路径、http(s) URL或data URI)。",
  "agents.defaults.model.primary": "主要模型(提供商/模型)。",
  "agents.defaults.model.fallbacks": "有序备用模型(提供商/模型)。主要模型失败时使用。",
  "agents.defaults.imageModel.primary":
    "可选的图像模型(提供商/模型)，在主要模型缺少图像输入时使用。",
  "agents.defaults.imageModel.fallbacks": "有序备用图像模型(提供商/模型)。",
  "agents.defaults.cliBackends": "纯文本回退的可选CLI后端(claude-cli等)。",
  "agents.defaults.humanDelay.mode": '块回复的延迟样式("off"、"natural"、"custom")。',
  "agents.defaults.humanDelay.minMs": "自定义humanDelay的最小延迟(毫秒)(默认: 800)。",
  "agents.defaults.humanDelay.maxMs": "自定义humanDelay的最大延迟(毫秒)(默认: 2500)。",
  "commands.native": "与支持它的通道注册原生命令(Discord/Slack/Telegram)。",
  "commands.nativeSkills": "与支持它的通道注册原生技能命令(用户可调用的技能)。",
  "commands.text": "允许文本命令解析(仅斜杠命令)。",
  "commands.bash":
    "允许bash聊天命令(`!`; `/bash`别名)运行主机shell命令(默认: false;需要tools.elevated)。",
  "commands.bashForegroundMs": "bash在后台化前等待的时间(默认: 2000; 0立即后台化)。",
  "commands.config": "允许/config聊天命令读写磁盘上的配置(默认: false)。",
  "commands.debug": "允许/debug聊天命令进行仅运行时覆盖(默认: false)。",
  "commands.restart": "允许/restart和网关重启工具操作(默认: false)。",
  "commands.useAccessGroups": "对命令强制执行访问组白名单/策略。",
  "commands.ownerAllowFrom":
    "仅所有者工具/命令的显式所有者白名单。使用通道原生ID(可选前缀如\"whatsapp:+15551234567\")。'*' 被忽略。",
  "session.dmScope":
    '私信会话范围: "main"保持连续性; "per-peer"或"per-channel-peer"隔离私信历史(推荐用于共享收件箱)。',
  "session.identityLinks":
    "将规范身份映射到带提供商前缀的对等ID以进行私信会话链接(示例: telegram:123456)。",
  "channels.telegram.configWrites": "允许Telegram响应通道事件/命令写入配置(默认: true)。",
  "channels.slack.configWrites": "允许Slack响应通道事件/命令写入配置(默认: true)。",
  "channels.mattermost.configWrites": "允许Mattermost响应通道事件/命令写入配置(默认: true)。",
  "channels.discord.configWrites": "允许Discord响应通道事件/命令写入配置(默认: true)。",
  "channels.whatsapp.configWrites": "允许WhatsApp响应通道事件/命令写入配置(默认: true)。",
  "channels.signal.configWrites": "允许Signal响应通道事件/命令写入配置(默认: true)。",
  "channels.imessage.configWrites": "允许iMessage响应通道事件/命令写入配置(默认: true)。",
  "channels.msteams.configWrites": "允许Microsoft Teams响应通道事件/命令写入配置(默认: true)。",
  "channels.discord.commands.native": '覆盖Discord的原生命令(bool或"auto")。',
  "channels.discord.commands.nativeSkills": '覆盖Discord的原生技能命令(bool或"auto")。',
  "channels.telegram.commands.native": '覆盖Telegram的原生命令(bool或"auto")。',
  "channels.telegram.commands.nativeSkills": '覆盖Telegram的原生技能命令(bool或"auto")。',
  "channels.slack.commands.native": '覆盖Slack的原生命令(bool或"auto")。',
  "channels.slack.commands.nativeSkills": '覆盖Slack的原生技能命令(bool或"auto")。',
  "session.agentToAgent.maxPingPongTurns": "请求者和目标之间的最大回复往返次数(0–5)。",
  "channels.telegram.customCommands": "额外的Telegram机器人菜单命令(与原生合并;冲突忽略)。",
  "messages.ackReaction": "用于确认入站消息的表情符号反应(空值禁用)。",
  "messages.ackReactionScope": '何时发送确认反应("group-mentions"、"group-all"、"direct"、"all")。',
  "messages.inbound.debounceMs": "来自同一发送者的快速入站消息的防抖窗口(毫秒)(0为禁用)。",
  "channels.telegram.dmPolicy":
    '直接消息访问控制("pairing"推荐)。"open"需要channels.telegram.allowFrom=["*"]。',
  "channels.telegram.streamMode":
    "Telegram回复的草稿流模式(off | partial | block)。独立于块流;需要私有主题+sendMessageDraft。",
  "channels.telegram.draftChunk.minChars":
    '当channels.telegram.streamMode="block"时发出Telegram草稿更新前的最小字符数(默认: 200)。',
  "channels.telegram.draftChunk.maxChars":
    '当channels.telegram.streamMode="block"时Telegram草稿更新块的目标最大大小(默认: 800;限制为channels.telegram.textChunkLimit)。',
  "channels.telegram.draftChunk.breakPreference":
    "Telegram草稿块的首选断点(段落 | 换行 | 句子)。默认: 段落。",
  "channels.telegram.retry.attempts": "出站Telegram API调用的最大重试次数(默认: 3)。",
  "channels.telegram.retry.minDelayMs": "Telegram出站调用的最小重试延迟(毫秒)。",
  "channels.telegram.retry.maxDelayMs": "Telegram出站调用的最大重试延迟上限(毫秒)。",
  "channels.telegram.retry.jitter": "应用于Telegram重试延迟的抖动因子(0-1)。",
  "channels.telegram.timeoutSeconds": "Telegram API请求被中止前的最大秒数(默认: 每grammY为500)。",
  "channels.whatsapp.dmPolicy":
    '直接消息访问控制("pairing"推荐)。"open"需要channels.whatsapp.allowFrom=["*"]。',
  "channels.whatsapp.selfChatMode": "同手机设置(机器人使用你的个人WhatsApp号码)。",
  "channels.whatsapp.debounceMs": "来自同一发送者的快速连续消息的防抖窗口(毫秒)(0为禁用)。",
  "channels.signal.dmPolicy":
    '直接消息访问控制("pairing"推荐)。"open"需要channels.signal.allowFrom=["*"]。',
  "channels.imessage.dmPolicy":
    '直接消息访问控制("pairing"推荐)。"open"需要channels.imessage.allowFrom=["*"]。',
  "channels.bluebubbles.dmPolicy":
    '直接消息访问控制("pairing"推荐)。"open"需要channels.bluebubbles.allowFrom=["*"]。',
  "channels.discord.dm.policy":
    '直接消息访问控制("pairing"推荐)。"open"需要channels.discord.dm.allowFrom=["*"]。',
  "channels.discord.retry.attempts": "出站Discord API调用的最大重试次数(默认: 3)。",
  "channels.discord.retry.minDelayMs": "Discord出站调用的最小重试延迟(毫秒)。",
  "channels.discord.retry.maxDelayMs": "Discord出站调用的最大重试延迟上限(毫秒)。",
  "channels.discord.retry.jitter": "应用于Discord重试延迟的抖动因子(0-1)。",
  "channels.discord.maxLinesPerMessage": "每个Discord消息的软最大行数(默认: 17)。",
  "channels.discord.intents.presence":
    "启用Guild Presences特权意图。还必须在Discord开发者门户中启用。允许跟踪用户活动(例如Spotify)。默认: false。",
  "channels.discord.intents.guildMembers":
    "启用Guild Members特权意图。还必须在Discord开发者门户中启用。默认: false。",
  "channels.slack.dm.policy":
    '直接消息访问控制("pairing"推荐)。"open"需要channels.slack.dm.allowFrom=["*"]。',
};

const FIELD_PLACEHOLDERS: Record<string, string> = {
  "gateway.remote.url": "ws://主机:18789",
  "gateway.remote.tlsFingerprint": "sha256:ab12cd34…",
  "gateway.remote.sshTarget": "用户@主机",
  "gateway.controlUi.basePath": "/openclawot",
  "channels.mattermost.baseUrl": "https://chat.example.com",
  "agents.list[].identity.avatar": "avatars/clawd.png",
};

const SENSITIVE_PATTERNS = [/token/i, /password/i, /secret/i, /api.?key/i];

function isSensitivePath(path: string): boolean {
  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(path));
}

type JsonSchemaObject = JsonSchemaNode & {
  type?: string | string[];
  properties?: Record<string, JsonSchemaObject>;
  required?: string[];
  additionalProperties?: JsonSchemaObject | boolean;
};

function cloneSchema<T>(value: T): T {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
}

function asSchemaObject(value: unknown): JsonSchemaObject | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as JsonSchemaObject;
}

function isObjectSchema(schema: JsonSchemaObject): boolean {
  const type = schema.type;
  if (type === "object") return true;
  if (Array.isArray(type) && type.includes("object")) return true;
  return Boolean(schema.properties || schema.additionalProperties);
}

function mergeObjectSchema(base: JsonSchemaObject, extension: JsonSchemaObject): JsonSchemaObject {
  const mergedRequired = new Set<string>([...(base.required ?? []), ...(extension.required ?? [])]);
  const merged: JsonSchemaObject = {
    ...base,
    ...extension,
    properties: {
      ...base.properties,
      ...extension.properties,
    },
  };
  if (mergedRequired.size > 0) {
    merged.required = Array.from(mergedRequired);
  }
  const additional = extension.additionalProperties ?? base.additionalProperties;
  if (additional !== undefined) merged.additionalProperties = additional;
  return merged;
}

function buildBaseHints(): ConfigUiHints {
  const hints: ConfigUiHints = {};
  for (const [group, label] of Object.entries(GROUP_LABELS)) {
    hints[group] = {
      label,
      group: label,
      order: GROUP_ORDER[group],
    };
  }
  for (const [path, label] of Object.entries(FIELD_LABELS)) {
    const current = hints[path];
    hints[path] = current ? { ...current, label } : { label };
  }
  for (const [path, help] of Object.entries(FIELD_HELP)) {
    const current = hints[path];
    hints[path] = current ? { ...current, help } : { help };
  }
  for (const [path, placeholder] of Object.entries(FIELD_PLACEHOLDERS)) {
    const current = hints[path];
    hints[path] = current ? { ...current, placeholder } : { placeholder };
  }
  return hints;
}

function applySensitiveHints(hints: ConfigUiHints): ConfigUiHints {
  const next = { ...hints };
  for (const key of Object.keys(next)) {
    if (isSensitivePath(key)) {
      next[key] = { ...next[key], sensitive: true };
    }
  }
  return next;
}

function applyPluginHints(hints: ConfigUiHints, plugins: PluginUiMetadata[]): ConfigUiHints {
  const next: ConfigUiHints = { ...hints };
  for (const plugin of plugins) {
    const id = plugin.id.trim();
    if (!id) continue;
    const name = (plugin.name ?? id).trim() || id;
    const basePath = `plugins.entries.${id}`;

    next[basePath] = {
      ...next[basePath],
      label: name,
      help: plugin.description
        ? `${plugin.description} (plugin: ${id})`
        : `Plugin entry for ${id}.`,
    };
    next[`${basePath}.enabled`] = {
      ...next[`${basePath}.enabled`],
      label: `Enable ${name}`,
    };
    next[`${basePath}.config`] = {
      ...next[`${basePath}.config`],
      label: `${name} Config`,
      help: `Plugin-defined config payload for ${id}.`,
    };

    const uiHints = plugin.configUiHints ?? {};
    for (const [relPathRaw, hint] of Object.entries(uiHints)) {
      const relPath = relPathRaw.trim().replace(/^\./, "");
      if (!relPath) continue;
      const key = `${basePath}.config.${relPath}`;
      next[key] = {
        ...next[key],
        ...hint,
      };
    }
  }
  return next;
}

function applyChannelHints(hints: ConfigUiHints, channels: ChannelUiMetadata[]): ConfigUiHints {
  const next: ConfigUiHints = { ...hints };
  for (const channel of channels) {
    const id = channel.id.trim();
    if (!id) continue;
    const basePath = `channels.${id}`;
    const current = next[basePath] ?? {};
    const label = channel.label?.trim();
    const help = channel.description?.trim();
    next[basePath] = {
      ...current,
      ...(label ? { label } : {}),
      ...(help ? { help } : {}),
    };

    const uiHints = channel.configUiHints ?? {};
    for (const [relPathRaw, hint] of Object.entries(uiHints)) {
      const relPath = relPathRaw.trim().replace(/^\./, "");
      if (!relPath) continue;
      const key = `${basePath}.${relPath}`;
      next[key] = {
        ...next[key],
        ...hint,
      };
    }
  }
  return next;
}

function listHeartbeatTargetChannels(channels: ChannelUiMetadata[]): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const id of CHANNEL_IDS) {
    const normalized = id.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    ordered.push(normalized);
  }
  for (const channel of channels) {
    const normalized = channel.id.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    ordered.push(normalized);
  }
  return ordered;
}

function applyHeartbeatTargetHints(
  hints: ConfigUiHints,
  channels: ChannelUiMetadata[],
): ConfigUiHints {
  const next: ConfigUiHints = { ...hints };
  const channelList = listHeartbeatTargetChannels(channels);
  const channelHelp = channelList.length ? ` 已知通道: ${channelList.join(", ")}。` : "";
  const help = `交付目标("last"、"none"或通道ID)。${channelHelp}`;
  const paths = ["agents.defaults.heartbeat.target", "agents.list.*.heartbeat.target"];
  for (const path of paths) {
    const current = next[path] ?? {};
    next[path] = {
      ...current,
      help: current.help ?? help,
      placeholder: current.placeholder ?? "last",
    };
  }
  return next;
}

function applyPluginSchemas(schema: ConfigSchema, plugins: PluginUiMetadata[]): ConfigSchema {
  const next = cloneSchema(schema);
  const root = asSchemaObject(next);
  const pluginsNode = asSchemaObject(root?.properties?.plugins);
  const entriesNode = asSchemaObject(pluginsNode?.properties?.entries);
  if (!entriesNode) return next;

  const entryBase = asSchemaObject(entriesNode.additionalProperties);
  const entryProperties = entriesNode.properties ?? {};
  entriesNode.properties = entryProperties;

  for (const plugin of plugins) {
    if (!plugin.configSchema) continue;
    const entrySchema = entryBase
      ? cloneSchema(entryBase)
      : ({ type: "object" } as JsonSchemaObject);
    const entryObject = asSchemaObject(entrySchema) ?? ({ type: "object" } as JsonSchemaObject);
    const baseConfigSchema = asSchemaObject(entryObject.properties?.config);
    const pluginSchema = asSchemaObject(plugin.configSchema);
    const nextConfigSchema =
      baseConfigSchema &&
      pluginSchema &&
      isObjectSchema(baseConfigSchema) &&
      isObjectSchema(pluginSchema)
        ? mergeObjectSchema(baseConfigSchema, pluginSchema)
        : cloneSchema(plugin.configSchema);

    entryObject.properties = {
      ...entryObject.properties,
      config: nextConfigSchema,
    };
    entryProperties[plugin.id] = entryObject;
  }

  return next;
}

function applyChannelSchemas(schema: ConfigSchema, channels: ChannelUiMetadata[]): ConfigSchema {
  const next = cloneSchema(schema);
  const root = asSchemaObject(next);
  const channelsNode = asSchemaObject(root?.properties?.channels);
  if (!channelsNode) return next;
  const channelProps = channelsNode.properties ?? {};
  channelsNode.properties = channelProps;

  for (const channel of channels) {
    if (!channel.configSchema) continue;
    const existing = asSchemaObject(channelProps[channel.id]);
    const incoming = asSchemaObject(channel.configSchema);
    if (existing && incoming && isObjectSchema(existing) && isObjectSchema(incoming)) {
      channelProps[channel.id] = mergeObjectSchema(existing, incoming);
    } else {
      channelProps[channel.id] = cloneSchema(channel.configSchema);
    }
  }

  return next;
}

let cachedBase: ConfigSchemaResponse | null = null;

function stripChannelSchema(schema: ConfigSchema): ConfigSchema {
  const next = cloneSchema(schema);
  const root = asSchemaObject(next);
  if (!root || !root.properties) return next;
  const channelsNode = asSchemaObject(root.properties.channels);
  if (channelsNode) {
    channelsNode.properties = {};
    channelsNode.required = [];
    channelsNode.additionalProperties = true;
  }
  return next;
}

function buildBaseConfigSchema(): ConfigSchemaResponse {
  if (cachedBase) return cachedBase;
  const schema = ClawdbotSchema.toJSONSchema({
    target: "draft-07",
    unrepresentable: "any",
  });
  schema.title = "ClawdbotConfig";
  const hints = applySensitiveHints(buildBaseHints());
  const next = {
    schema: stripChannelSchema(schema),
    uiHints: hints,
    version: VERSION,
    generatedAt: new Date().toISOString(),
  };
  cachedBase = next;
  return next;
}

export function buildConfigSchema(params?: {
  plugins?: PluginUiMetadata[];
  channels?: ChannelUiMetadata[];
}): ConfigSchemaResponse {
  const base = buildBaseConfigSchema();
  const plugins = params?.plugins ?? [];
  const channels = params?.channels ?? [];
  if (plugins.length === 0 && channels.length === 0) return base;
  const mergedHints = applySensitiveHints(
    applyHeartbeatTargetHints(
      applyChannelHints(applyPluginHints(base.uiHints, plugins), channels),
      channels,
    ),
  );
  const mergedSchema = applyChannelSchemas(applyPluginSchemas(base.schema, plugins), channels);
  return {
    ...base,
    schema: mergedSchema,
    uiHints: mergedHints,
  };
}
