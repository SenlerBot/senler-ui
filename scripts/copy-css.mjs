import { cp, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const packageRoot = path.resolve(dirname, '..');
const srcDir = path.join(packageRoot, 'src');
const distDir = path.join(packageRoot, 'dist');

await mkdir(distDir, { recursive: true });

await copyFile(path.join(srcDir, 'tokens.css'), path.join(distDir, 'tokens.css'));
await copyFile(path.join(srcDir, 'tailwind.css'), path.join(distDir, 'tailwind.css'));
await copyFile(path.join(srcDir, 'fonts.css'), path.join(distDir, 'fonts.css'));
await cp(path.join(srcDir, 'fonts'), path.join(distDir, 'fonts'), {
  recursive: true,
});

const stylesPath = path.join(distDir, 'styles.css');
const styles = await readFile(stylesPath, 'utf8');
const fontsImport = '@import "./fonts.css";\n';

if (!styles.startsWith(fontsImport)) {
  await writeFile(stylesPath, `${fontsImport}${styles}`);
}
