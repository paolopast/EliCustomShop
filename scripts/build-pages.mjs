import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const repoName = process.env.GITHUB_REPOSITORY?.split('/').at(-1) ?? 'eli-custom-shop';
const requestedBaseHref = process.env.PAGES_BASE_HREF ?? `/${repoName}/`;
const baseHref = requestedBaseHref.startsWith('/') ? requestedBaseHref : `/${requestedBaseHref}`;

const ngExecutable = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const buildResult = spawnSync(
  ngExecutable,
  ['ng', 'build', '--configuration', 'github-pages', '--base-href', baseHref],
  {
    stdio: 'inherit',
    cwd: process.cwd()
  }
);

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

copyFileSync(join(outputDirectory, 'index.html'), join(outputDirectory, '404.html'));
writeFileSync(join(outputDirectory, '.nojekyll'), '');
