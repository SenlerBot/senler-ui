import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runSupervisedProcess } from "./frontend-process-supervisor.mjs";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const readGitFiles = (root, arguments_) => {
  const result = spawnSync("git", arguments_, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.error) {
    process.stderr.write(`${result.error.message}\n`);
    process.exit(2);
  }
  if (result.status !== 0) {
    process.stderr.write(
      result.stderr.trim() || `git ${arguments_.join(" ")} failed`,
    );
    process.stderr.write("\n");
    process.exit(2);
  }
  return result.stdout.split("\n").filter(Boolean);
};

export const isApiContractInput = (file) => {
  const normalizedFile = file.replaceAll("\\", "/");
  return (
    normalizedFile.startsWith("src/shared/api/") ||
    normalizedFile === "openapi.consumer.json" ||
    normalizedFile.startsWith("orval.") ||
    normalizedFile.startsWith("orval-") ||
    normalizedFile.startsWith("scripts/check-api-contracts")
  );
};

export const selectFastCheckScripts = (
  requestedScripts,
  packageScripts,
  changedFiles,
) => {
  const scriptsToRun = [...requestedScripts];
  const shouldAddApiContracts =
    typeof packageScripts["check:api-contracts"] === "string" &&
    !scriptsToRun.includes("check:api-contracts") &&
    changedFiles.some(isApiContractInput);
  if (!shouldAddApiContracts) return scriptsToRun;

  const typeCheckIndex = scriptsToRun.findIndex((script) =>
    script.startsWith("type-check"),
  );
  scriptsToRun.splice(
    typeCheckIndex === -1 ? scriptsToRun.length : typeCheckIndex,
    0,
    "check:api-contracts",
  );
  return scriptsToRun;
};

const runFastVerification = async () => {
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

  const changedFiles =
    typeof packageJson.scripts?.["check:api-contracts"] === "string"
      ? [
          ...readGitFiles(repoRoot, ["diff", "--name-only", "HEAD"]),
          ...readGitFiles(repoRoot, [
            "ls-files",
            "--others",
            "--exclude-standard",
          ]),
        ]
      : [];
  const scriptsToRun = selectFastCheckScripts(
    requestedScripts,
    packageJson.scripts ?? {},
    changedFiles,
  );

  const totalStartedAt = Date.now();
  for (const script of scriptsToRun) {
    const startedAt = Date.now();
    const result = await runSupervisedProcess(npmCommand, ["run", script], {
      cwd: repoRoot,
      env: process.env,
      stdio: "inherit",
    });
    if (result.error) {
      process.stderr.write(`${result.error.message}\n`);
      process.exit(2);
    }
    if (result.receivedSignal) process.exit(result.exitCode);
    if (result.exitCode !== 0) process.exit(result.exitCode);
    process.stdout.write(
      `[check:fast] ${script}: ${Date.now() - startedAt} ms\n`,
    );
  }
  process.stdout.write(
    `[check:fast] total: ${Date.now() - totalStartedAt} ms\n`,
  );
};

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  await runFastVerification();
}
