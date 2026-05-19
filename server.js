import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, "data");
const captureLogPath = path.join(dataDir, "captures.jsonl");

app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));

async function ensureStorage() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(captureLogPath);
  } catch {
    await fs.writeFile(captureLogPath, "", "utf8");
  }
}

function normalizeCapture(payload) {
  return {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    source: "capture-pwa",
    payload
  };
}

app.post("/api/captures", async (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Request body must be a JSON object." });
  }

  const record = normalizeCapture(req.body);
  await fs.appendFile(captureLogPath, `${JSON.stringify(record)}\n`, "utf8");
  res.status(201).json({ ok: true, id: record.id, receivedAt: record.receivedAt });
});

app.get("/api/captures", async (_req, res) => {
  const content = await fs.readFile(captureLogPath, "utf8");
  const records = content
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line))
    .reverse()
    .slice(0, 50);

  res.json({ records });
});

await ensureStorage();

app.listen(PORT, () => {
  console.log(`Personal capture system running at http://localhost:${PORT}`);
});
