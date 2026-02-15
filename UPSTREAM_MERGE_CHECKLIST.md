# 上游合并清单 (Upstream Merge Checklist)

> 基线：本 fork 基于上游 `v2026.1.29` 版本
> 上游仓库：https://github.com/openclaw/openclaw
> 本 fork：https://github.com/jiulingyun/openclaw-cn
> 生成日期：2026-02-15
> 覆盖范围：v2026.1.29 → v2026.2.14（15 个 Release，2300+ 提交）

### 合并进度

| 优先级 | 描述 | 项数 | 状态 |
|--------|------|------|------|
| P0-SECURITY | 安全修复 | 73 | ✅ 全部完成 |
| P1-CRITICAL-BUG | 关键 Bug 修复 | 48 | ✅ 全部完成（#26, #32, #35, #36b 已包含/跳过） |
| P2-CORE-FEATURE | 核心新功能 | — | 待开始 |
| P3-CHANNEL-BUG | 渠道 Bug 修复 | — | 待开始 |
| P4-CHANNEL-FEATURE | 渠道新功能 | — | 待开始 |
| P5-NICE-TO-HAVE | 可选改进 | — | 待开始 |

## 已合并的上游提交

以下上游 PR 已在本 fork 中合并，无需重复处理：

| 上游 PR | 描述 | 本地提交 |
|---------|------|---------|
| #3304 | fix(macos): avoid stderr backpressure in discovery | ✅ |
| #4407 | feat: add Kimi K2.5 model to synthetic catalog | ✅ |
| #4456 | fix(telegram): honor proxy dispatcher via undici fetch | ✅ |
| #4521 | feat(auth): add MiniMax OAuth plugin | ✅ |
| #4533 | fix(telegram): accept numeric messageId/chatId in react | ✅ |
| #4578 | fix(telegram): correct HTML nesting for bold/italic | ✅ |
| #4593 | fix(auth): don't warn about expired OAuth tokens with valid refresh | ✅ |
| #4651 | fix(line): resolve TypeError in status command | ✅ |
| #4873 | fix: prevent undefined gateway token defaults | ✅ |
| #4880 | fix(security): restrict local media reads to workspace/media | ✅ |
| #4909 | fix: resolve Control UI assets for global installs | ✅ |
| #4957 | fix(routing): prefer requesterOrigin over stale session entry | ✅ |
| #4984 | fix(bluebubbles): debounce by messageId for text+image | ✅ |
| #5055 | fix: normalize telegram account token lookup | ✅ |
| #3160 | Memory: implement QMD backend (本地独立实现) | ✅ |

---

## P0-SECURITY：安全修复（必须全部合并）

> ⚠️ 安全修复无论是否使用相关渠道，都应全部合并，因为它们可能影响共享基础设施代码。

### P0-A：核心安全加固（最高优先级）

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 1 | - | v2026.2.2 | Security: require operator.approvals for gateway /approve commands | 网关核心安全 |
| 2 | - | v2026.2.2 | Security: require validated shared-secret auth before skipping device identity on gateway connect | 网关认证 |
| 3 | - | v2026.2.2 | Security: guard skill installer downloads with SSRF checks | SSRF 防护 |
| 4 | - | v2026.2.2 | Security: harden Windows exec allowlist; block cmd.exe bypass | 执行安全 |
| 5 | - | v2026.2.2 | Media understanding: apply SSRF guardrails to provider fetches | 媒体 SSRF |
| 6 | #9182 | v2026.2.3 | Security: enforce sandboxed media paths for message tool attachments | 沙箱安全 |
| 7 | #8113 | v2026.2.3 | Security: require explicit credentials for gateway URL overrides | 凭证泄露防护 |
| 8 | #8768 | v2026.2.3 | Security: gate whatsapp_login tool to owner senders | WhatsApp 安全 |
| 9 | - | v2026.2.3 | Security: keep untrusted channel metadata out of system prompts (Slack/Discord) | 提示注入防护 |
| 10 | #9518 | v2026.2.6 | Security: require auth for Gateway canvas host and A2UI assets | 画布认证 |
| 11 | #9806, #9858 | v2026.2.6 | Security: add skill/plugin code safety scanner; redact credentials from config.get | 凭证保护 |
| 12 | - | v2026.2.12 | Gateway/OpenResponses: harden URL-based input handling with SSRF deny policy | SSRF 防护 |
| 13 | #13719 | v2026.2.12 | Security: fix unauthenticated Nostr profile API remote config tampering | 远程配置篡改 |
| 14 | #14757 | v2026.2.12 | Security: remove bundled soul-evil hook | 恶意 hook 移除 |
| 15 | - | v2026.2.12 | Security/Audit: add hook session-routing hardening checks | Hook 安全审计 |
| 16 | - | v2026.2.12 | Security/Sandbox: confine mirrored skill sync destinations | 沙箱路径安全 |
| 17 | - | v2026.2.12 | Security/Web tools: treat browser/web content as untrusted by default | 提示注入防护 |
| 18 | - | v2026.2.12 | Security/Hooks: constant-time secret comparison + auth-failure throttling | 认证加固 |
| 19 | - | v2026.2.12 | Security/Browser: require auth for loopback browser control HTTP routes | 浏览器控制安全 |
| 20 | - | v2026.2.12 | Sessions/Gateway: harden transcript path resolution | 路径穿越防护 |

### P0-B：v2026.2.13 安全加固

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 21 | #15390 | v2026.2.13 | Security/Gateway+ACP: block high-risk tools from HTTP /tools/invoke | 工具调用安全 |
| 22 | #14661 | v2026.2.13 | Security/Gateway: canvas IP-based auth only accepts machine-scoped addresses | **BREAKING** 画布认证变更 |
| 23 | #15604 | v2026.2.13 | Security/Link understanding: block loopback/internal host patterns | SSRF 防护 |
| 24 | - | v2026.2.13 | Security/Browser: constrain trace/download output paths | 路径穿越 |
| 25 | #10525 | v2026.2.13 | Security/Canvas: serve A2UI assets via safe-open path | 路径穿越/TOCTOU |
| 26 | #10529 | v2026.2.13 | Security/WhatsApp: enforce 0o600 on creds.json | WhatsApp 凭证权限 |
| 27 | - | v2026.2.13 | Security/Gateway: sanitize untrusted WebSocket header values | 日志注入 |
| 28 | - | v2026.2.13 | Security/Audit: add misconfiguration checks for sandbox/tool profiles | 安全审计增强 |
| 29 | #13474 | v2026.2.13 | Security/Audit: distinguish external vs internal hooks | 审计误报修复 |
| 30 | #13129 | v2026.2.13 | Security/Onboarding: clarify multi-user DM isolation | DM 隔离 |
| 31 | #4726 | v2026.2.13 | Agents/Nodes: harden node exec approval decision handling | 执行审批 |
| 32 | #15274 | v2026.2.13 | Routing: enforce strict binding-scope matching | 路由安全 |
| 33 | #13811 | v2026.2.13 | Exec/Allowlist: allow multiline heredoc safely | 执行安全 |
| 34 | #15635 | v2026.2.13 | Plugins/Hooks: fire before_tool_call hook exactly once | Hook 去重 |
| 35 | #15279 | v2026.2.13 | Agents/Transcript: sanitize OpenAI/Codex tool-call ids | 会话安全 |

### P0-C：v2026.2.14 安全加固（大批量安全 release）

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 36 | #16285 | v2026.2.14 | **Feishu/Security: harden media URL fetching against SSRF** | ⚡ 飞书核心渠道 |
| 37 | - | v2026.2.14 | Security/Hooks: restrict hook transform modules to ~/.openclaw/hooks/transforms | 路径穿越 |
| 38 | - | v2026.2.14 | Security/Hooks: ignore hook package manifest entries outside package dir | 路径穿越 |
| 39 | - | v2026.2.14 | Security/Archive: enforce archive extraction entry/size limits | 资源耗尽 |
| 40 | - | v2026.2.14 | Security/Media: reject oversized base64-backed input media | 内存安全 |
| 41 | - | v2026.2.14 | Security/Media: stream and bound URL-backed input media fetches | 内存安全 |
| 42 | - | v2026.2.14 | Security/Skills: harden archive extraction for download-installed skills | 路径穿越 |
| 43 | - | v2026.2.14 | Security/Slack: compute command auth for DM slash commands | Slack DM 安全 |
| 44 | - | v2026.2.14 | Telegram/Security: require numeric sender IDs for allowlist auth | Telegram 安全 |
| 45 | - | v2026.2.14 | Telegram/Security: reject webhook startup when webhookSecret missing | Telegram Webhook 安全 |
| 46 | - | v2026.2.14 | Security/Windows: avoid shell invocation when spawning child processes | 命令注入 |
| 47 | - | v2026.2.14 | Security/Agents: scope CLI process cleanup to owned child PIDs | 进程安全 |
| 48 | - | v2026.2.14 | Security/Agents: enforce workspace-root path bounds for apply_patch | 路径穿越 |
| 49 | - | v2026.2.14 | Security/Agents: enforce symlink-escape checks for apply_patch | 符号链接逃逸 |
| 50 | #15924 | v2026.2.14 | Security/Agents (macOS): prevent shell injection in keychain writes | macOS 安全 |
| 51 | - | v2026.2.14 | Security: fix Chutes manual OAuth login state validation | OAuth 安全 |
| 52 | - | v2026.2.14 | Security/Gateway: harden tool-supplied gatewayUrl overrides | 网关安全 |
| 53 | - | v2026.2.14 | Security/Gateway: block system.execApprovals via node.invoke | 执行安全 |
| 54 | - | v2026.2.14 | Security/Gateway: reject oversized base64 chat attachments | 内存安全 |
| 55 | - | v2026.2.14 | Security/Gateway: stop returning raw config values in skills.status | 凭证泄露 |
| 56 | - | v2026.2.14 | Security/Net: fix SSRF guard bypass via IPv4-mapped IPv6 literals | SSRF 核心 |
| 57 | - | v2026.2.14 | Security/Browser: harden browser control file upload+download | 路径穿越 |
| 58 | - | v2026.2.14 | Security/Browser: block cross-origin mutating requests (CSRF) | CSRF 防护 |
| 59 | - | v2026.2.14 | Security/Node Host: enforce system.run rawCommand/argv consistency | 执行安全 |
| 60 | - | v2026.2.14 | Security/Exec approvals: prevent safeBins allowlist bypass | 执行安全 |
| 61 | - | v2026.2.14 | Security/Exec: harden PATH handling | PATH 注入 |
| 62 | - | v2026.2.14 | Security/Signal: harden signal-cli archive extraction | Signal 安全 |
| 63 | - | v2026.2.14 | Security/Discovery: stop treating Bonjour TXT as authoritative | 发现安全 |
| 64 | - | v2026.2.14 | macOS: hard-limit unkeyed openclaw://agent deep links | macOS 安全 |
| 65 | - | v2026.2.14 | Scripts/Security: validate GitHub logins in clawtributors | 脚本安全 |
| 66 | - | v2026.2.14 | Memory/QMD/Security: add rawKeyPrefix support for scope rules | QMD 安全 |
| 67 | #12524 | v2026.2.14 | Security/Memory-LanceDB: treat recalled memories as untrusted context | 提示注入防护 |
| 68 | #12552 | v2026.2.14 | Security/Memory-LanceDB: require explicit autoCapture opt-in | PII 保护 |
| 69 | #15541 | v2026.2.14 | Media/Security: allow local media reads from workspace/sandboxes roots | 媒体安全 |
| 70 | #16739 | v2026.2.14 | Media/Security: harden local media allowlist bypasses | 媒体安全 |
| 71 | - | v2026.2.14 | Discord/Security: harden voice message media loading (SSRF) | Discord 安全 |
| 72 | - | v2026.2.14 | Security/Voice Call (Telnyx): require webhook signature verification | 语音安全 |
| 73 | - | v2026.2.14 | Security/Voice Call: require valid Twilio webhook signatures | 语音安全 |

---

## P1-CRITICAL-BUG：核心引擎关键修复

> 这些修复影响核心引擎稳定性，无论使用哪个渠道都应合并。

### P1-A：网关 / 会话 / Agent 核心修复

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 1 | #12283 | v2026.2.9 | Gateway: no more post-compaction amnesia; preserve Pi session parentId chain | 🔴 记忆丧失修复 |
| 2 | #11579 | v2026.2.9 | Agents: recover from context overflow caused by oversized tool results | 上下文溢出 |
| 3 | #16576 | v2026.2.14 | Gateway/Sessions: abort active embedded runs before sessions.reset | 会话清理 |
| 4 | #16288 | v2026.2.14 | Sessions/Agents: harden transcript path resolution for mismatched agent context | 路径解析 |
| 5 | #16331 | v2026.2.14 | Agents: add safety timeout around embedded session.compact() | 压缩超时 |
| 6 | #16539 | v2026.2.14 | Agents/Process/Bootstrap: preserve unbounded process log offset-only pagination | 启动预算 |
| 7 | #9855 | v2026.2.14 | Agents: classify external timeout aborts during compaction as internal timeouts | 压缩稳定性 |
| 8 | #10210 | v2026.2.14 | Agents: treat empty-stream provider failures as timeout-class failover signals | 容错 |
| 9 | #15636 | v2026.2.13 | **Outbound: add write-ahead delivery queue with crash-recovery retries** | 🔴 消息不丢失 |
| 10 | #13931 | v2026.2.12 | Gateway: drain active turns before restart to prevent message loss | 重启消息丢失 |
| 11 | #13813 | v2026.2.12 | Gateway: auto-generate auth token during install | 安装循环 |
| 12 | #13809 | v2026.2.12 | Gateway: prevent undefined/missing token in auth config | Token 缺失 |
| 13 | #13414 | v2026.2.12 | Gateway: handle async EPIPE on stdout/stderr during shutdown | 关闭崩溃 |
| 14 | #14919 | v2026.2.12 | Gateway/Control UI: resolve missing dashboard assets for global installs | 全局安装 UI |
| 15 | #15195 | v2026.2.13 | Gateway/Restart: clear stale command-queue state after SIGUSR1 | 僵尸网关 |
| 16 | #16729 | v2026.2.14 | Gateway/Subagents: preserve queued announce items on delivery errors | 公告丢失 |
| 17 | #14486 | v2026.2.12 | Gateway: raise WS payload/buffer limits so 5MB images work | 大图上传 |
| 18 | #11523 | v2026.2.9 | Gateway: fix multi-agent sessions.usage discovery | 多 Agent |
| 19 | #15141 | v2026.2.13 | Sessions/Agents: pass agentId when resolving transcript paths | 非默认 Agent |
| 20 | #15103 | v2026.2.13 | Sessions/Agents: pass agentId through status and usage paths | 非默认 Agent |
| 21 | #14869 | v2026.2.13 | Sessions: archive previous transcript files on /new and /reset | 磁盘清理 |
| 22 | #15114 | v2026.2.13 | Status/Sessions: stop clamping derived totalTokens | Token 统计 |
| 23 | #13565 | v2026.2.12 | Agents: prevent file descriptor leaks in child process cleanup | FD 泄漏 |
| 24 | #13514 | v2026.2.12 | Agents: prevent double compaction caused by cache TTL | 重复压缩 |

### P1-B：Cron / Heartbeat 调度修复

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 25 | #9733, #9823, #9948, #9932 | v2026.2.6 | Cron: fix scheduling and reminder delivery regressions | 多个修复 |
| 26 | #13983 | v2026.2.12 | Cron: use requested agentId for isolated job auth resolution | Agent 隔离 |
| 27 | #14068 | v2026.2.12 | Cron: prevent cron jobs from skipping execution | 跳过执行 |
| 28 | #14140 | v2026.2.12 | Cron: pass agentId to runHeartbeatOnce | Heartbeat |
| 29 | #14233 | v2026.2.12 | Cron: re-arm timers when onTimer fires while executing | 定时器 |
| 30 | #14256 | v2026.2.12 | Cron: prevent duplicate fires | 重复触发 |
| 31 | #14385 | v2026.2.12 | Cron: isolate scheduler errors so one bad job doesn't break all | 调度隔离 |
| 32 | #13878 | v2026.2.12 | Cron: prevent one-shot at jobs from re-firing | 一次性任务 |
| 33 | #14901 | v2026.2.12 | Heartbeat: prevent scheduler stalls on unexpected run errors | 调度器死锁 |
| 34 | #16156 | v2026.2.14 | Cron: prevent silently skipping past-due recurring jobs | 跳过执行 |
| 35 | #15750 | v2026.2.14 | Cron: repair missing/corrupt nextRunAtMs | 数据修复 |
| 36 | #16694 | v2026.2.14 | Cron: skip missed-job replay for interrupted jobs | 重启循环 |
| 37 | #15108 | v2026.2.13 | Heartbeat: prevent scheduler silent-death races during reloads | 心跳稳定性 |
| 38 | #14527 | v2026.2.13 | Heartbeat: allow explicit wake and hook wake reasons | 心跳触发 |
| 39 | #15847 | v2026.2.13 | Auto-reply/Heartbeat: strip HEARTBEAT_OK tokens | 输出清理 |
| 40 | #11766 | v2026.2.13 | Agents/Heartbeat: stop auto-creating HEARTBEAT.md | 心跳文件 |

### P1-C：内存管理 / 资源泄漏修复

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 41 | #5136 | v2026.2.14 | Diagnostics/Memory: prune stale diagnostic session state entries | 内存增长 |
| 42 | #6036 | v2026.2.14 | Gateway/Memory: clean up agentRunSeq tracking on run completion | 内存增长 |
| 43 | #6629 | v2026.2.14 | Auto-reply/Memory: bound ABORT_MEMORY growth | 内存增长 |
| 44 | #5258 | v2026.2.14 | Slack/Memory: bound thread-starter cache growth | 内存增长 |
| 45 | #5140 | v2026.2.14 | Outbound/Memory: bound directory cache growth | 内存增长 |
| 46 | #6760 | v2026.2.14 | Skills/Memory: remove disconnected nodes from cache | 内存增长 |
| 47 | #11325 | v2026.2.14 | Skills: watch SKILL.md only when refreshing (avoid FD exhaustion) | FD 泄漏 |

### P1-D：CJK / 中文用户直接影响

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 48 | #11052 | v2026.2.13 | **macOS Voice Wake: fix crash in CJK/Unicode trigger trimming** | ⚡ 中文输入崩溃 |

---

## P2-CORE-FEATURE：核心新功能

> 核心引擎的新功能/改进，影响所有渠道。

### P2-A：Agent / 会话能力增强

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 1 | #5445 | v2026.2.1 | Agents: add system prompt safety guardrails | 安全框架 |
| 2 | - | v2026.2.1 | Agents: update pi-ai to 0.50.9 and rename cacheControlTtl -> cacheRetention | 依赖更新 |
| 3 | - | v2026.2.1 | Agents: extend CreateAgentSessionOptions | API 扩展 |
| 4 | #7372 | v2026.2.2 | Config: allow setting default subagent thinking level | 子 Agent 配置 |
| 5 | #10000 | v2026.2.6 | Sessions: cap sessions_history payloads to reduce context overflow | 上下文管理 |
| 6 | - | v2026.2.6 | Agents: bump pi-mono to 0.52.7 + Opus 4.6 forward-compat | 运行时更新 |
| 7 | #11045 | v2026.2.9 | Gateway: add agent management RPC methods | Web UI agent 管理 |
| 8 | #12091 | v2026.2.9 | Paths: add OPENCLAW_HOME for overriding home directory | 路径自定义 |
| 9 | #8930 | v2026.2.13 | Agents: add pre-prompt context diagnostics | 调试增强 |
| 10 | #16457 | v2026.2.14 | Agents/Workspace: create BOOTSTRAP.md for partially initialized workspaces | 工作区初始化 |
| 11 | #16131 | v2026.2.14 | Agents: keep unresolved mutating tool failures visible | 错误可见性 |

### P2-B：Cron / 定时任务增强

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 12 | - | v2026.2.3 | Cron: add announce delivery mode for isolated jobs | 公告投递 |
| 13 | - | v2026.2.3 | Cron: default isolated jobs to announce delivery; ISO 8601 support | 投递默认值 |
| 14 | - | v2026.2.3 | Cron: hard-migrate isolated jobs to announce/none delivery | 迁移 |
| 15 | - | v2026.2.3 | Cron: delete one-shot jobs after success by default | 清理行为 |
| 16 | #15368 | v2026.2.13 | Cron: honor deleteAfterRun in isolated announce delivery | 清理行为 |
| 17 | #14983 | v2026.2.12 | Cron: honor stored session model overrides for isolated-agent runs | 模型覆盖 |

### P2-C：Config / 配置系统改进

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 18 | #5516 | v2026.2.9 | Config: clamp maxTokens to contextWindow | 配置校验 |
| 19 | #14006 | v2026.2.12 | Config: avoid redacting maxTokens-like fields | 配置快照 |
| 20 | #13342 | v2026.2.12 | Config/Cron: exclude maxTokens from redaction | 配置修复 |
| 21 | #13460 | v2026.2.12 | Config: ignore meta field changes in watcher | 文件监听 |
| 22 | #11560 | v2026.2.13 | Config: preserve ${VAR} env references when writing config files | 环境变量保留 |
| 23 | #14998 | v2026.2.13 | Config: accept $schema key in config file | JSON Schema 支持 |
| 24 | #5042 | v2026.2.13 | Config: keep legacy audio transcription migration strict | 迁移安全 |

### P2-D：其他核心功能

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 25 | #7641 | v2026.2.2 | Security: add healthcheck skill and bootstrap audit guidance | 健康检查 |
| 26 | - | v2026.2.2 | Web UI: add Agents dashboard | Web UI 增强 |
| 27 | #9001 | v2026.2.3 | Messages: add per-channel and per-account responsePrefix overrides | 回复前缀 |
| 28 | #10072 | v2026.2.6 | Web UI: add token usage dashboard | Token 仪表盘 |
| 29 | #7078 | v2026.2.6 | Memory: native Voyage AI support | 嵌入模型 |
| 30 | #11341 | v2026.2.9 | Web UI: show Compaction divider in chat history | UI 增强 |
| 31 | #13818 | v2026.2.12 | CLI: add openclaw logs --local-time | CLI 增强 |
| 32 | #15376 | v2026.2.13 | Web tools/web_fetch: prefer text/markdown responses | Web 工具 |
| 33 | #15429 | v2026.2.13 | Memory: switch default local embedding model to QAT variant | 嵌入质量 |
| 34 | #8068 | v2026.2.6 | CLI: sort commands alphabetically in help output | CLI 改善 |
| 35 | #7014 | v2026.2.1 | Streaming: flush block streaming on paragraph boundaries | 流式输出 |
| 36 | #3705 | v2026.2.1 | Gateway: inject timestamps into agent and chat.send messages | 消息时间戳 |

### P2-E：BREAKING CHANGES（需兼容性验证）

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 37 | - | v2026.2.12 | **Hooks: POST /hooks/agent now rejects payload sessionKey overrides by default** | ⚠️ 需验证兼容性 |

---

## P3-MODEL：新模型 / Provider 支持

> 与中国用户相关的 AI 模型支持。

### P3-A：中国相关 Provider（优先）

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 1 | #7180 | v2026.2.3 | **Onboarding: add Moonshot (.cn) auth choice + China base URL** | ⚡ 月之暗面 |
| 2 | #13456 | v2026.2.12 | **Onboarding: add Z.AI endpoint-specific auth choices (zai-cn)** | ⚡ 智谱 AI |
| 3 | #15867 | v2026.2.13 | **Agents: add GLM-5 synthetic catalog support** | ⚡ 智谱 GLM-5 |
| 4 | #14865 | v2026.2.12 | Onboarding: update MiniMax default models to M2.5 | MiniMax 更新 |
| 5 | #15275 | v2026.2.13 | Providers/MiniMax: switch implicit provider to anthropic-messages | MiniMax 修复 |

### P3-B：国际 Provider

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 6 | #9853, #10720, #9995 | v2026.2.6 | Models: support Anthropic Opus 4.6 and OpenAI Codex gpt-5.3-codex | 新模型 |
| 7 | #9885 | v2026.2.6 | **Providers: add xAI (Grok) support** | 新 Provider |
| 8 | #14218 | v2026.2.12 | Antigravity: add opus 4.6 forward-compat | Opus 4.6 |
| 9 | #14990, #15174 | v2026.2.13 | OpenAI Codex/Spark: implement gpt-5.3-codex-spark support | Codex Spark |
| 10 | #15406 | v2026.2.13 | Auth/OpenAI Codex: share OAuth login handling | Codex OAuth |
| 11 | #13472 | v2026.2.13 | Onboarding: add Hugging Face Inference provider | HuggingFace |
| 12 | #12577 | v2026.2.13 | Onboarding: add vLLM as onboarding provider | vLLM |
| 13 | #7914 | v2026.2.3 | Onboarding: add Cloudflare AI Gateway provider setup | Cloudflare |
| 14 | #1879 | v2026.2.9 | Model failover: treat HTTP 400 as failover-eligible | 容错 |
| 15 | #11646 | v2026.2.9 | Thinking: allow xhigh for github-copilot models | Copilot |
| 16 | #14131 | v2026.2.12 | Ollama: use configured baseUrl for model discovery | Ollama |
| 17 | #11853 | v2026.2.13 | Ollama/Agents: use resolved model/provider base URLs for native streaming | Ollama 流式 |

---

## P4-CHANNEL：使用中渠道的 Bug 修复

### P4-A：Telegram 修复

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 1 | #6914 | v2026.2.1 | Telegram: add download timeouts for file fetches | 超时处理 |
| 2 | #6833 | v2026.2.1 | Telegram: enforce thread specs for DM vs forum sends | 论坛话题 |
| 3 | #7466 | v2026.2.2 | Telegram: recover from grammY long-poll timed out errors | 长轮询恢复 |
| 4 | #8193 | v2026.2.3 | Telegram: honor session model overrides in inline model selection | 模型选择 |
| 5 | #8392 | v2026.2.3 | Telegram: include forward_from_chat metadata | 转发元数据 |
| 6 | #7235 | v2026.2.6 | Telegram: auto-inject DM topic threadId | DM 话题 |
| 7 | #12156 | v2026.2.9 | Telegram: harden quote parsing; preserve quote context | 引用解析 |
| 8 | #11620 | v2026.2.9 | Telegram: recover proactive sends when stale topic thread IDs | 话题恢复 |
| 9 | #11543 | v2026.2.9 | Telegram: render markdown spoilers with tg-spoiler | 隐藏文本 |
| 10 | #12356 | v2026.2.9 | Telegram: truncate command registration to 100 entries | 命令限制 |
| 11 | #12779 | v2026.2.9 | Telegram: match DM allowFrom against sender user id | DM 白名单 |
| 12 | #14608 | v2026.2.12 | Telegram: render blockquotes as native HTML blockquote | 引用块 |
| 13 | #14397 | v2026.2.12 | Telegram: handle no-text message in model picker | 模型选择 |
| 14 | #14340 | v2026.2.12 | Telegram: surface REACTION_INVALID as non-fatal warning | 反应错误 |
| 15 | #15844 | v2026.2.13 | Telegram: cap bot menu registration | 菜单限制 |
| 16 | #15599 | v2026.2.13 | Telegram: scope skill commands to resolved agent | 多 Agent |
| 17 | #15438 | v2026.2.13 | Telegram/Matrix: treat MP3/M4A as voice-compatible | 语音格式 |
| 18 | #16763 | v2026.2.14 | Telegram: set webhook callback timeout handling | Webhook 超时 |

### P4-B：WhatsApp 修复

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 19 | #14285 | v2026.2.12 | WhatsApp: convert Markdown bold/strikethrough to WhatsApp formatting | 格式转换 |
| 20 | #14408 | v2026.2.12 | WhatsApp: allow media-only sends; normalize leading blank payloads | 纯媒体发送 |
| 21 | #14444 | v2026.2.12 | WhatsApp: default MIME type for voice messages | 语音消息 |
| 22 | #15594 | v2026.2.13 | WhatsApp: preserve outbound document filenames | 文件名 |

### P4-C：Discord 修复

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 23 | #3892 | v2026.2.1 | Discord: inherit thread parent bindings for routing | 线程路由 |
| 24 | #5838 | v2026.2.1 | Discord: resolve PluralKit proxied senders | 白名单 |
| 25 | #10062 | v2026.2.9 | Discord: support forum/media thread-create starter messages | 论坛线程 |
| 26 | #10418 | v2026.2.12 | Discord: process DM reactions | DM 反应 |
| 27 | #11062 | v2026.2.12 | Discord: respect replyToMode in threads | 线程回复 |
| 28 | #9507 | v2026.2.12 | Discord: omit empty content fields for media-only messages | 纯媒体 |
| 29 | #12326 | v2026.2.13 | Discord: avoid misrouting numeric guild allowlist entries | 路由修复 |
| 30 | #11224 | v2026.2.13 | Discord/Agents: apply channel historyLimit | 上下文限制 |
| 31 | #16714 | v2026.2.14 | Discord: treat empty channels config as no allowlist, not deny-all | 配置语义 |
| 32 | #7253 | v2026.2.13 | Discord: send voice messages with waveform previews | 语音消息 |

### P4-D：Slack 修复

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 33 | #6639 | v2026.2.1 | Slack: harden media fetch limits and file URL validation | 媒体限制 |
| 34 | #9971 | v2026.2.6 | Slack: add mention stripPatterns for /new and /reset | 提及处理 |
| 35 | #14364 | v2026.2.12 | Slack: change default replyToMode from "off" to "all" | 回复模式 |
| 36 | #14142 | v2026.2.12 | Slack: detect commands when messages start with bot mention | 命令检测 |
| 37 | #15775 | v2026.2.13 | Slack/Plugins: add thread-ownership outbound gating | 线程所有权 |

### P4-E：Signal 修复

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 38 | #15063 | v2026.2.12 | Signal: enforce E.164 validation | 号码验证 |
| 39 | #2013 | v2026.2.12 | Signal: render mention placeholders as @uuid/@phone | 提及处理 |
| 40 | #16748 | v2026.2.14 | Signal: preserve case-sensitive group: target IDs | 群组 ID |
| 41 | #15443 | v2026.2.13 | Signal/Install: auto-install signal-cli on non-x64 Linux | arm64 支持 |

### P4-F：飞书修复（需与本地自定义对比）

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 42 | #10345 | v2026.2.12 | **Feishu: pass Buffer directly to SDK upload APIs** | ⚠️ 需对比本地实现 |
| 43 | #11088 | v2026.2.12 | **Feishu: trigger mention-gated group handling only when bot is mentioned** | ⚠️ 需对比 |
| 44 | #11233 | v2026.2.12 | **Feishu: probe status uses resolved account context** | ⚠️ 多账号 |
| 45 | #13994 | v2026.2.12 | **Feishu DocX: preserve top-level converted block order** | ⚠️ 文档排序 |
| 46 | #14423 | v2026.2.12 | **Feishu plugin: remove workspace:\* dependency** | ⚠️ 与本地依赖策略一致 |

### P4-G：Web UI 修复

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 47 | #7226 | v2026.2.2 | Webchat: respect user scroll position during streaming | 滚动修复 |
| 48 | #7178 | v2026.2.3 | Web UI: resolve header logo path when basePath is set | Logo 路径 |
| 49 | #15437 | v2026.2.13 | Web UI: add img to DOMPurify allowed tags | Markdown 图片 |
| 50 | #11547 | v2026.2.13 | Inbound/Web UI: preserve literal \\n sequences | Windows 路径 |

### P4-H：TUI 修复

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 51 | #10704 | v2026.2.14 | TUI: preserve in-flight streaming replies on concurrent run finalize | 流式稳定性 |
| 52 | #6958 | v2026.2.14 | TUI: keep pre-tool streamed text visible | 工具文本 |
| 53 | #13007 | v2026.2.14 | TUI: sanitize ANSI/control-heavy history text | 崩溃修复 |
| 54 | #5355 | v2026.2.14 | TUI: harden render-time sanitizer for narrow terminals | 窄终端 |
| 55 | #16750 | v2026.2.14 | TUI: render in terminal default foreground for light themes | 亮色主题 |
| 56 | #15452 | v2026.2.13 | TUI/Streaming: preserve richer streamed assistant text | 流式文本 |

---

## P5-NICE-TO-HAVE：可选功能

| # | 上游 PR | Release | 描述 | 备注 |
|---|---------|---------|------|------|
| 1 | #6127 | v2026.2.1 | Telegram: use shared pairing store | 配对存储 |
| 2 | #5970 | v2026.2.1 | Gateway: require TLS 1.3 minimum | TLS 要求 |
| 3 | #12419 | v2026.2.9 | Tools: add Grok (xAI) as web_search provider | Grok 搜索 |
| 4 | #11756 | v2026.2.9 | iOS: alpha node app + setup-code onboarding | iOS 应用 |
| 5 | #4824 | v2026.2.9 | State dir: honor OPENCLAW_STATE_DIR | 状态目录 |
| 6 | #8484 | v2026.2.3 | Onboarding: infer auth choice from non-interactive API key flags | 非交互模式 |
| 7 | #10818 | v2026.2.9 | Memory: set Voyage embeddings input_type | Voyage |
| 8 | #12114 | v2026.2.9 | Memory/QMD: reuse default model cache across agents | QMD 缓存 |
| 9 | #10146 | v2026.2.6 | Update: harden Control UI asset handling in update flow | 更新流程 |
| 10 | #9903 | v2026.2.6 | Exec approvals: coerce bare string allowlist entries | 配置兼容 |
| 11 | #11937 | v2026.2.9 | Exec approvals: render forwarded commands in monospace | UI 改善 |
| 12 | #11372 | v2026.2.9 | Routing: refresh bindings per message without restart | 动态路由 |
| 13 | #15157 | v2026.2.13 | Docs/Mermaid: remove hardcoded theme blocks for dark mode | 文档样式 |
| 14 | #14882 | v2026.2.12 | Hooks/Plugins: wire 9 previously unwired lifecycle hooks | Hook 完善 |
| 15 | #15012 | v2026.2.12 | Hooks/Tools: dispatch before/after_tool_call hooks | 工具 Hook |
| 16 | #13805 | v2026.2.12 | Agents: use last API call's cache tokens for context display | Token 显示 |
| 17 | #14979 | v2026.2.12 | Agents: keep followup-runner session totalTokens aligned | Token 对齐 |
| 18 | #14156 | v2026.2.12 | CLI/Wizard: exit with code 1 when wizards are canceled | 退出码 |
| 19 | #12906 | v2026.2.13 | CLI: lazily load outbound provider dependencies | 启动加速 |
| 20 | #15481 | v2026.2.13 | CLI/Completion: route plugin-load logs to stderr | 补全修复 |
| 21 | #16379 | v2026.2.14 | Sandbox/Tools: make sandbox file tools bind-mount aware | 沙箱工具 |

---

## SKIP：无需合并

| 描述 | 原因 |
|------|------|
| BlueBubbles 所有修复 (#11093, #13787, #16322 等) | 未使用渠道 |
| Tlon 所有修复 (#5926 等) | 未使用渠道 |
| Nostr 所有修复 | 未使用渠道 |
| MS Teams 所有修复 (#15436 等) | 未使用渠道 |
| iMessage 安全修复 | 中国不可用 |
| Google Chat 安全修复 | 低优先级 |
| Mattermost (#14962) | 未使用渠道 |
| iOS alpha node app (#11756) | 暂不需要 |
| Twitch 相关 | 未使用渠道 |

> **注意**：即使标记为 SKIP 的渠道安全修复，如果修复涉及**共享基础代码**（如路由、webhook 处理框架），仍应评估是否需要合并。这些已在 P0-SECURITY 中单独列出。

---

## QMD 记忆系统：上游修复与本地实现对比

> 本 fork 已独立实现 QMD 支持，以下上游修复需逐一评估是否已包含。

| # | 上游 PR | Release | 描述 | 本地状态 |
|---|---------|---------|------|---------|
| 1 | #10863 | v2026.2.14 | Memory/Builtin: keep memory status dirty reporting stable | 需评估 |
| 2 | #16740 | v2026.2.14 | Memory/QMD: avoid multi-collection query ranking corruption | 需评估 |
| 3 | #12919 | v2026.2.14 | Memory/QMD: detect null-byte ENOTDIR update failures, rebuild collections | 需评估 |
| 4 | #11302 | v2026.2.14 | Memory/QMD: treat prefixed "no results found" marker as empty result | 需评估 |
| 5 | - | v2026.2.14 | Memory/QMD: cap command output buffering | 需评估 |
| 6 | - | v2026.2.14 | Memory/QMD: parse qmd scope keys once per request | 需评估 |
| 7 | - | v2026.2.14 | Memory/QMD: query using exact docid matches before prefix lookup | 需评估 |
| 8 | - | v2026.2.14 | Memory/QMD: pass result limits to search/vsearch commands | 需评估 |
| 9 | - | v2026.2.14 | Memory/QMD: avoid reading full markdown files for windowed reads | 需评估 |
| 10 | - | v2026.2.14 | Memory/QMD: skip rewriting unchanged session export markdown | 需评估 |
| 11 | - | v2026.2.14 | Memory/QMD: make JSON parsing resilient to noisy command output | 需评估 |
| 12 | - | v2026.2.14 | Memory/QMD: make memory status read-only (skip boot update) | 需评估 |
| 13 | - | v2026.2.14 | Memory/QMD: keep original failures when builtin fallback fails | 需评估 |
| 14 | #11721 | v2026.2.14 | Memory/Builtin: narrow watcher to markdown globs, ignore deps/venv | 需评估 |

---

## 合并优先级总览

```
P0-SECURITY:    73 项  ← 第一批，必须优先
P1-CRITICAL:    48 项  ← 第二批，核心稳定性
P2-CORE:        37 项  ← 第三批，功能增强
P3-MODEL:       17 项  ← 第四批，模型支持
P4-CHANNEL:     56 项  ← 第五批，渠道修复
P5-NICE:        21 项  ← 按需
QMD:            14 项  ← 需对比评估
────────────────────────
总计需处理:    ~266 项
```

## 合并注意事项

1. **路径/品牌差异**：上游使用 `.openclaw`，本 fork 使用 `.clawdbot-cn`，合并时需全局替换
2. **飞书冲突风险高**：5 个上游飞书修复需与本地 36 个飞书提交逐一对比
3. **依赖差异**：本 fork 已将 GitHub 依赖替换为 npm 包，合并涉及依赖的变更时需注意包名
4. **BREAKING CHANGE**：v2026.2.12 hooks sessionKey 默认拒绝覆盖，需文档说明
5. **安全审计**：v2026.2.14 是一个集中安全修复 release，建议优先整体合并该版本的安全修复

---

## Agent 指引

使用 AI agent 处理本清单时，请遵循以下规则：

1. **每次只处理一个条目**，完成后在对应行添加 `✅ 已合并 (commit SHA)` 标记
2. **安全修复**：直接 cherry-pick 上游提交，解决冲突后确保安全修复完整保留
3. **飞书修复**：先读取本地 `extensions/feishu/` 代码，对比上游变更，手动合并
4. **QMD 修复**：先读取本地 QMD 实现，判断上游修复是否已包含在本地代码中
5. **合并后**：运行 `pnpm lint && pnpm build && pnpm test` 验证
6. **提交消息格式**：`fix(security): <描述> (upstream #XXXX)` 或 `feat: <描述> (upstream #XXXX)`

---