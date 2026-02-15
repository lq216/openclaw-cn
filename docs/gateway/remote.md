---
summary: "使用 SSH 隧道（网关 WS）和尾网进行远程访问"
read_when:
  - 运行或排查远程网关设置时
---
# 远程访问（SSH、隧道和尾网）

本仓库通过在专用主机（桌面/服务器）上运行单个网关（主网关）并让客户端连接到它来支持“通过 SSH 远程访问”。

- 对于 **操作员（您/macOS 应用）**：SSH 隧道是通用的后备方案。
- 对于 **节点（iOS/Android 和未来设备）**：连接到网关 **WebSocket**（根据需要使用 LAN/尾网或 SSH 隧道）。

## 核心理念

- 网关 WebSocket 绑定到您配置的端口上的 **回环**（默认为 18789）。
- 对于远程使用，您通过 SSH 转发该回环端口（或使用尾网/VPN 并减少隧道）。

## 常见 VPN/尾网设置（代理所在位置）

将 **网关主机** 视为“代理所在的位置”。它拥有会话、认证配置文件、频道和状态。
您的笔记本电脑/桌面（和节点）连接到该主机。

### 1) 在您的尾网中始终在线的网关（VPS 或家用服务器）

在持久主机上运行网关并通过 **Tailscale** 或 SSH 访问它。

- **最佳用户体验：** 保持 `gateway.bind: "loopback"` 并为控制界面使用 **Tailscale Serve**。
- **后备方案：** 保持回环 + 从任何需要访问的机器建立 SSH 隧道。
- **示例：** [exe.dev](/platforms/exe-dev)（简易 VM）或 [Hetzner](/platforms/hetzner)（生产 VPS）。

当您的笔记本电脑经常休眠但希望代理始终在线时，这是理想选择。

### 2) 家用桌面运行网关，笔记本电脑是远程控制器

笔记本电脑**不**运行代理。它远程连接：

- 使用 macOS 应用的 **通过 SSH 远程访问** 模式（设置 → 常规 → "Clawdbot 运行"）。
- 该应用打开并管理隧道，因此 WebChat + 健康检查 "正常工作。"

操作手册：[macOS 远程访问](/platforms/mac/remote)。

### 3) 笔记本电脑运行网关，从其他机器远程访问

保持网关在本地但安全地暴露它：

- 从其他机器到笔记本电脑建立 SSH 隧道，或
- 通过 Tailscale Serve 控制界面并保持网关仅限回环。

指南：[Tailscale](/gateway/tailscale) 和 [Web 概述](/web)。

## 命令流（各组件运行位置）

一个网关服务拥有状态 + 频道。节点是外围设备。

流程示例（Telegram → 节点）：
- Telegram 消息到达 **网关**。
- 网关运行 **代理** 并决定是否调用节点工具。
- 网关通过网关 WebSocket（`node.*` RPC）调用 **节点**。
- 节点返回结果；网关回复回 Telegram。

注意事项：
- **节点不运行网关服务。** 每台主机只应运行一个网关，除非您有意运行隔离的配置文件（参见 [多个网关](/gateway/multiple-gateways)）。
- macOS 应用的 "节点模式" 只是通过网关 WebSocket 的节点客户端。

## SSH 隧道（CLI + 工具）

创建到远程网关 WS 的本地隧道：

```bash
ssh -N -L 18789:127.0.0.1:18789 user@host
```

隧道建立后：
- `openclaw-cn health` 和 `openclaw-cn status --deep` 现在通过 `ws://127.0.0.1:18789` 访问远程网关。
- `openclaw-cn gateway {status,health,send,agent,call}` 也可以在需要时通过 `--url` 指定转发的 URL。

注意：将 `18789` 替换为您配置的 `gateway.port`（或 `--port`/`OPENCLAW_GATEWAY_PORT`）。

注意：当您使用 `--url` 时，CLI 不会回退到配置文件或环境变量中的凭据。
请显式包含 `--token` 或 `--password`。缺少显式凭据将导致错误。

## CLI 远程默认值

您可以持久化远程目标，以便 CLI 命令默认使用它：

```json5
{
  gateway: {
    mode: "remote",
    remote: {
      url: "ws://127.0.0.1:18789",
      token: "your-token"
    }
  }
}
```

当网关仅限回环时，将 URL 保持在 `ws://127.0.0.1:18789` 并首先打开 SSH 隧道。

## 通过 SSH 的聊天界面

WebChat 不再使用单独的 HTTP 端口。SwiftUI 聊天界面直接连接到网关 WebSocket。

- 通过 SSH 转发 `18789`（见上文），然后将客户端连接到 `ws://127.0.0.1:18789`。
- 在 macOS 上，优先使用应用的 "通过 SSH 远程访问" 模式，该模式会自动管理隧道。

## macOS 应用 "通过 SSH 远程访问"

macOS 菜单栏应用可以端到端驱动相同的设置（远程状态检查、WebChat 和语音唤醒转发）。

操作手册：[macOS 远程访问](/platforms/mac/remote)。

## 安全规则（远程/VPN）

简而言之：**保持网关仅限回环**，除非您确定需要绑定。

- **回环 + SSH/Tailscale Serve** 是最安全的默认设置（无公开暴露）。
- **非回环绑定**（`lan`/`tailnet`/`custom`，或当回环不可用时的 `auto`）必须使用认证令牌/密码。
- `gateway.remote.token` **仅** 用于远程 CLI 调用 — 它**不**启用本地认证。
- 使用 `wss://` 时 `gateway.remote.tlsFingerprint` 固定远程 TLS 证书。
- **Tailscale Serve** 可以在 `gateway.auth.allowTailscale: true` 时通过身份头进行认证。
  如果您想要令牌/密码，请将其设置为 `false`。
- 将 `browser.controlUrl` 视为管理 API：仅限尾网 + 令牌认证。

深入了解：[安全](/gateway/security)。
