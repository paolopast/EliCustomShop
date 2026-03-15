import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const repoName = process.env.GITHUB_REPOSITORY?.split('/').at(-1) ?? 'eli-custom-shop';
const requestedBaseHref = process.env.PAGES_BASE_HREF ?? `/${repoName}/`;
const normalizedBaseHref = requestedBaseHref.startsWith('/') ? requestedBaseHref : `/${requestedBaseHref}`;
const baseHref = normalizedBaseHref.endsWith('/') ? normalizedBaseHref : `${normalizedBaseHref}/`;
const angularCliEntry = join(process.cwd(), 'node_modules', '@angular', 'cli', 'bin', 'ng.js');
const buildResult = spawnSync(
  process.execPath,
  [angularCliEntry, 'build', '--configuration', 'github-pages', '--base-href', baseHref],
  {
    stdio: 'inherit',
    cwd: process.cwd()
  }
);

if (buildResult.error) {
  throw buildResult.error;
}

if (buildResult.status !== 0) {
  process.exit(buildResult.status ?? 1);
}

const outputCandidates = [
  join(process.cwd(), 'dist', 'eli-custom-shop', 'browser'),
  join(process.cwd(), 'dist', 'browser'),
  join(process.cwd(), 'dist', 'eli-custom-shop')
];

const outputDirectory = outputCandidates.find((candidate) => existsSync(join(candidate, 'index.html')));

if (!outputDirectory) {
  throw new Error('Unable to locate the static build output for GitHub Pages.');
}

const htmlFiles = [];
const collectHtmlFiles = (directory) => {
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      collectHtmlFiles(fullPath);
      continue;
    }

    if (entry.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
};

collectHtmlFiles(outputDirectory);

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, 'utf8')
    .replaceAll('content="/og-image.svg"', `content="${baseHref}og-image.svg"`)
    .replaceAll('content="og-image.svg"', `content="${baseHref}og-image.svg"`);
  writeFileSync(htmlFile, html);
}

copyFileSync(join(outputDirectory, 'index.html'), join(outputDirectory, '404.html'));
writeFileSync(join(outputDirectory, '.nojekyll'), '');
