import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const layers = ["app", "pages", "widgets", "features", "entities", "shared"];
const ignoredDirectory =
  /^(?:node_modules|dist|coverage|__tests__|test|generated.*)$/;
const ignoredFile =
  /(?:\.generated\.|\.(?:test|spec|stories|example)\.|\.d\.[cm]?ts$)/;

function sourceFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory())
      return ignoredDirectory.test(entry.name) ? [] : sourceFiles(path);
    return /\.[cm]?[jt]sx?$/.test(entry.name) && !ignoredFile.test(entry.name)
      ? [path]
      : [];
  });
}

export function findImportCycles(edges) {
  let next = 0;
  const indices = new Map(),
    low = new Map(),
    stack = [],
    active = new Set(),
    cycles = [];
  function visit(file) {
    indices.set(file, next);
    low.set(file, next++);
    stack.push(file);
    active.add(file);
    for (const target of edges.get(file) ?? []) {
      if (!indices.has(target)) {
        visit(target);
        low.set(file, Math.min(low.get(file), low.get(target)));
      } else if (active.has(target))
        low.set(file, Math.min(low.get(file), indices.get(target)));
    }
    if (low.get(file) !== indices.get(file)) return;
    const component = [];
    let target;
    do {
      target = stack.pop();
      active.delete(target);
      component.push(target);
    } while (target !== file);
    if (component.length > 1 || edges.get(file)?.includes(file))
      cycles.push(component.sort());
  }
  for (const file of edges.keys()) if (!indices.has(file)) visit(file);
  return cycles;
}

function readProjects(root, configTools, configFile) {
  const projects = new Map();
  const visiting = new Set();
  function visit(configPath) {
    if (existsSync(configPath) && statSync(configPath).isDirectory())
      configPath = join(configPath, "tsconfig.json");
    if (visiting.has(configPath))
      throw new Error("Circular project reference: " + configPath);
    if (projects.has(configPath)) return projects.get(configPath);
    visiting.add(configPath);
    const config = configTools.parseTsconfig(configPath);
    const project = {
      path: configPath,
      config,
      paths: configTools.createPathsMatcher({ path: configPath, config }),
      // JavaScript still participates in runtime boundaries when tsc only
      // checks its TypeScript callers. Keep the project's include/exclude rules.
      matches: configTools.createFilesMatcher({
        path: configPath,
        config: {
          ...config,
          compilerOptions: { ...config.compilerOptions, allowJs: true },
        },
      }),
      references: [],
    };
    projects.set(configPath, project);
    project.references = (config.references ?? []).map((reference) =>
      visit(resolve(dirname(configPath), reference.path)),
    );
    visiting.delete(configPath);
    return project;
  }
  visit(resolve(root, configFile));
  return [...projects.values()];
}

function matchingProjects(projects, file) {
  const matches = projects.filter((project) => project.matches(file));
  const hasMatchingReference = (project) =>
    project.references.some(
      (reference) =>
        matches.includes(reference) || hasMatchingReference(reference),
    );
  return matches.filter((project) => !hasMatchingReference(project));
}

function matchesAlias(specifier, alias) {
  const star = alias.indexOf("*");
  return star < 0
    ? specifier === alias
    : specifier.startsWith(alias.slice(0, star)) &&
        specifier.endsWith(alias.slice(star + 1));
}

function resolveSource(file, importedSpecifier, project) {
  const specifier = importedSpecifier.split(/[?#]/, 1)[0];
  const relativeImport = specifier.startsWith(".");
  const aliasImport = Object.keys(
    project.config.compilerOptions?.paths ?? {},
  ).some((alias) => matchesAlias(specifier, alias));
  const candidates = relativeImport
    ? [resolve(dirname(file), specifier)]
    : (project.paths?.(specifier) ?? []);
  for (const candidate of candidates) {
    const withoutJsExtension = candidate.replace(/\.[cm]?jsx?$/, "");
    for (const path of [
      ...[
        ".ts",
        ".tsx",
        ".mts",
        ".cts",
        ".d.ts",
        ".js",
        ".jsx",
        "/index.ts",
        "/index.tsx",
        "/index.mts",
        "/index.cts",
        "/index.d.ts",
        "/index.js",
      ].map((extension) => withoutJsExtension + extension),
      candidate,
    ]) {
      if (existsSync(path) && statSync(path).isFile()) return { target: path };
    }
  }
  return {
    unresolved: relativeImport || aliasImport || specifier.startsWith("@/"),
  };
}

export function checkStructure(root, parser, profile, options = {}) {
  if (
    !["layers", "routes", "domains", "next", "library", "embedded"].includes(
      profile,
    )
  )
    throw new Error("Unknown frontend structure profile: " + profile);
  const configTools =
    options.configTools ??
    createRequire(join(root, "package.json"))("get-tsconfig");
  const projects = readProjects(
    root,
    configTools,
    options.configFile ?? "tsconfig.json",
  );
  const files = sourceFiles(join(root, "src"));
  const fileSet = new Set(files);
  const edges = new Map(files.map((file) => [file, []]));
  const failures = [];
  const imports = new Map();
  const declaredOwners = new Map(
    files.map((file) => [file, matchingProjects(projects, file)]),
  );
  const ownersByFile = new Map(
    files.map((file) => [file, new Set(declaredOwners.get(file))]),
  );
  for (const file of files) {
    const source = parser.parse(readFileSync(file, "utf8"), {
      sourceType: "module",
      plugins: ["typescript", ...(/\.[jt]sx$/.test(file) ? ["jsx"] : [])],
      createImportExpressions: true,
    });
    const fileImports = [];
    function inspect(node) {
      if (!node || typeof node !== "object") return;
      let specifier,
        typeOnly = false,
        dynamic = false;
      if (
        [
          "ImportDeclaration",
          "ExportNamedDeclaration",
          "ExportAllDeclaration",
        ].includes(node.type) &&
        node.source
      ) {
        specifier = node.source.value;
        typeOnly =
          node.importKind === "type" ||
          node.exportKind === "type" ||
          (node.specifiers?.length > 0 &&
            node.specifiers.every(
              (entry) =>
                entry.importKind === "type" || entry.exportKind === "type",
            ));
      } else if (
        node.type === "ImportExpression" &&
        node.source.type === "StringLiteral"
      ) {
        specifier = node.source.value;
        dynamic = true;
      } else if (
        node.type === "TSImportType" &&
        node.argument.type === "StringLiteral"
      ) {
        specifier = node.argument.value;
        typeOnly = true;
      }
      if (specifier) {
        fileImports.push({
          specifier,
          typeOnly,
          dynamic,
          line: node.loc.start.line,
        });
      }
      for (const [key, child] of Object.entries(node)) {
        if (["loc", "start", "end", "tokens", "comments"].includes(key))
          continue;
        if (Array.isArray(child)) child.forEach(inspect);
        else if (
          child &&
          typeof child === "object" &&
          typeof child.type === "string"
        )
          inspect(child);
      }
    }
    inspect(source);
    imports.set(file, fileImports);
  }

  // include/files define roots, not every file in a TypeScript program.
  // Imported helpers (including .mjs) inherit the caller's configuration unless
  // they already belong to a referenced project with its own configuration.
  const pending = files.filter((file) => ownersByFile.get(file).size);
  for (let cursor = 0; cursor < pending.length; cursor++) {
    const file = pending[cursor];
    for (const owner of ownersByFile.get(file)) {
      for (const { specifier } of imports.get(file)) {
        const { target } = resolveSource(file, specifier, owner);
        if (!fileSet.has(target) || declaredOwners.get(target).length) continue;
        const targetOwners = ownersByFile.get(target);
        if (!targetOwners.has(owner)) {
          targetOwners.add(owner);
          pending.push(target);
        }
      }
    }
  }

  for (const file of files) {
    const owners = [...ownersByFile.get(file)];
    const sourcePath = relative(root, file).replaceAll("\\", "/");
    const sourceLayer = sourcePath.split("/")[1];
    if (!owners.length) {
      failures.push(
        sourcePath +
          ": no owning TypeScript project; import coverage is incomplete",
      );
      continue;
    }
    for (const { specifier, typeOnly, dynamic, line } of imports.get(file)) {
      const resolutions = owners.map((owner) =>
        resolveSource(file, specifier, owner),
      );
      const targets = new Set(
        resolutions.map((resolution) => resolution.target),
      );
      const location = sourcePath + ":" + line;
      if (targets.size > 1) {
        failures.push(
          location + ": conflicting TypeScript projects for " + specifier,
        );
      } else if (resolutions.some((resolution) => resolution.unresolved)) {
        failures.push(
          location + ": cannot resolve internal import " + specifier,
        );
      }
      const target = targets.size === 1 ? resolutions[0].target : undefined;
      if (target) {
        const targetPath = relative(root, target).replaceAll("\\", "/");
        const targetLayer = targetPath.startsWith("src/")
          ? targetPath.split("/")[1]
          : undefined;
        if (
          profile === "layers" &&
          layers.includes(sourceLayer) &&
          layers.includes(targetLayer) &&
          layers.indexOf(sourceLayer) > layers.indexOf(targetLayer)
        )
          failures.push(
            sourcePath +
              ":" +
              line +
              ": " +
              sourceLayer +
              " cannot import " +
              targetLayer +
              " (" +
              specifier +
              ")",
          );
        if (!typeOnly && !dynamic && fileSet.has(target))
          edges.get(file).push(target);
      }
    }
  }
  for (const cycle of findImportCycles(edges))
    failures.push(
      "Static import cycle: " +
        cycle
          .map((file) => relative(root, file).replaceAll("\\", "/"))
          .join(", "),
    );
  return { failures, files: files.length };
}

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const policy = JSON.parse(
    readFileSync(
      join(root, "scripts/development/frontend-structure-policy.json"),
      "utf8",
    ),
  );
  const parser = createRequire(join(root, "package.json"))("@babel/parser");
  const result = checkStructure(root, parser, policy.profile, {
    configFile: policy.configFile,
  });
  if (result.failures.length) {
    process.stderr.write(`${result.failures.join("\n")}\n`);
    process.exitCode = 1;
  } else
    process.stdout.write(
      `Frontend structure (${policy.profile}): ${result.files} source files, no prohibited imports or static cycles\n`,
    );
}
