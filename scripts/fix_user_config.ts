import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import JSON5 from "json5";

const configPath = path.join(os.homedir(), ".openclaw", "openclaw.json");

if (!fs.existsSync(configPath)) {
  console.log(`Config file not found at ${configPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(configPath, "utf-8");
try {
  const config = JSON5.parse(raw);
  let changed = false;

  // Check and fix auth.profiles['feishu:default']
  if (config.auth && config.auth.profiles && config.auth.profiles["feishu:default"]) {
    const profile = config.auth.profiles["feishu:default"];
    // Check if it's the invalid webhook mode or generally invalid
    // The validation error was about 'mode' being 'webhook' instead of 'event-api'
    if (profile.mode === "webhook" || !profile.mode) {
      console.log("Found invalid feishu:default profile (mode=webhook or missing). Removing it...");
      delete config.auth.profiles["feishu:default"];
      changed = true;
    }
  }

  if (changed) {
    // Write back as standard JSON (formatted) to ensure compatibility
    // Note: comments will be lost, but validity is restored.
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`Successfully patched config at ${configPath}`);
  } else {
    console.log("No invalid feishu:default profile found. Config is clean.");
  }
} catch (err) {
  console.error("Failed to parse config:", err);
  process.exit(1);
}
