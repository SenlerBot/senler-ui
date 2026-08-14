import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const requestedScripts = process.argv.slice(2);
const packageJson = JSON.parse(
  readFileSync(resolve(repoRoot, "package.json"), "utf8"),
);

if (requestedScripts.length === 0) {
  process.stderr.write("At least one npm script is required\n");
  process.exit(2);
}

const invalidScript = requestedScripts.find(
  (script) =>
    script === "check:fast" ||
    typeof packageJson.scripts?.[script] !== "string",
);
if (invalidScript) {
  process.stderr.write(`Unknown or recursive npm script: ${invalidScript}\n`);
  process.exit(2);
}

const totalStartedAt = Date.now();
for (const script of requestedScripts) {
  const startedAt = Date.now();
  const result = spawnSync(npmCommand, ["run", script], {
    cwd: repoRoot,
    env: process.env,
    stdio: "inherit",
  });
  if (result.error) {
    process.stderr.write(`${result.error.message}\n`);
    process.exit(2);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
  process.stdout.write(
    `[check:fast] ${script}: ${Date.now() - startedAt} ms\n`,
  );
}
process.stdout.write(`[check:fast] total: ${Date.now() - totalStartedAt} ms\n`);
