import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import nextConfig from '../next.config';
import { PRIORITY_SITEMAP_CONFIG_LIMITS, generateAllSitemapEntries, getSitemapEntryCount } from '../src/lib/calculators/config';
import { getClusterHub } from '../src/lib/seo/clusterHubs';
import { NON_INDEXABLE_PATHS } from '../src/lib/seo/indexation';
import { getCalculatorDirectorySections } from '../src/lib/seo/calculatorDirectory';
import { SITE_ORIGIN } from '../src/lib/siteConfig';
import { getStaticSitemapUrls } from '../src/lib/sitemap-data';

function walkSourceFiles(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const entryPath = path.join(dir, entry);
    const stats = statSync(entryPath);

    if (stats.isDirectory()) {
      walkSourceFiles(entryPath, files);
      continue;
    }

    if (entryPath.endsWith('.ts') || entryPath.endsWith('.tsx')) {
      files.push(entryPath);
    }
  }

  return files;
}

function formatPaths(paths: string[]): string {
  return paths.map((entry) => `- ${entry}`).join('\n');
}

async function main() {
  const staticSitemapUrls = getStaticSitemapUrls();
  const uniqueStaticUrls = new Set(staticSitemapUrls);

  assert.equal(
    uniqueStaticUrls.size,
    staticSitemapUrls.length,
    'Static sitemap contains duplicate URLs.',
  );

  for (const url of staticSitemapUrls) {
    const parsed = new URL(url);
    assert.equal(parsed.origin, SITE_ORIGIN, `Static sitemap URL is off-origin: ${url}`);
    assert.ok(!NON_INDEXABLE_PATHS.has(parsed.pathname), `Static sitemap URL should be noindex/excluded: ${url}`);
  }

  assert.ok(staticSitemapUrls.includes(`${SITE_ORIGIN}/calculators`), 'Static sitemap is missing /calculators.');
  assert.ok(staticSitemapUrls.includes(`${SITE_ORIGIN}/mortgage-calculators`), 'Static sitemap is missing /mortgage-calculators.');
  assert.ok(staticSitemapUrls.includes(`${SITE_ORIGIN}/savings-calculators`), 'Static sitemap is missing /savings-calculators.');
  assert.ok(staticSitemapUrls.includes(`${SITE_ORIGIN}/investing-calculators`), 'Static sitemap is missing /investing-calculators.');
  assert.ok(staticSitemapUrls.includes(`${SITE_ORIGIN}/retirement-calculators`), 'Static sitemap is missing /retirement-calculators.');

  const redirects = (await nextConfig.redirects?.()) ?? [];
  const redirectSourceUrls = new Set(redirects.map((redirect) => `${SITE_ORIGIN}${redirect.source}`));

  for (const url of staticSitemapUrls) {
    assert.ok(!redirectSourceUrls.has(url), `Redirect source leaked into static sitemap: ${url}`);
  }

  const programmaticEntries = generateAllSitemapEntries();
  assert.equal(programmaticEntries.length, getSitemapEntryCount(), 'Programmatic sitemap count drifted from generated entries.');
  assert.ok(programmaticEntries.length > 0, 'Programmatic sitemap emitted no entries.');
  assert.ok(programmaticEntries.length <= 10000, `Programmatic sitemap is no longer conservative enough: ${programmaticEntries.length} entries.`);
  assert.ok(PRIORITY_SITEMAP_CONFIG_LIMITS.size >= 10, 'Priority sitemap allowlist is unexpectedly small.');

  const directorySections = getCalculatorDirectorySections();
  assert.ok(directorySections.length >= 4, 'Calculator directory should expose multiple category sections.');

  for (const section of directorySections.slice(0, 4)) {
    assert.ok(section.calculators.length >= 3, `Directory section is too thin: ${section.href}`);
    assert.ok(section.guideLinks.length >= 2, `Directory section is missing guide support: ${section.href}`);
  }

  for (const slug of ['mortgage-calculators', 'savings-calculators', 'investing-calculators', 'retirement-calculators']) {
    const hub = getClusterHub(slug);
    assert.ok(hub, `Missing cluster hub definition: ${slug}`);
    assert.ok((hub?.calculatorHrefs.length ?? 0) >= 3, `Cluster hub is too thin: ${slug}`);
    assert.ok((hub?.guideLinks.length ?? 0) >= 2, `Cluster hub has insufficient guide support: ${slug}`);
  }

  const sourceFiles = walkSourceFiles(path.resolve('src'));
  sourceFiles.push(path.resolve('next.config.ts'));
  const nonCanonicalOriginHits = sourceFiles.filter((filePath) =>
    readFileSync(filePath, 'utf8').includes('https://plainfigures.org'),
  );

  assert.equal(
    nonCanonicalOriginHits.length,
    0,
    `Found non-canonical origin references in source files:\n${formatPaths(nonCanonicalOriginHits)}`,
  );

  console.log(`SEO validation passed.
Static sitemap URLs: ${staticSitemapUrls.length}
Programmatic sitemap URLs: ${programmaticEntries.length}
Priority sitemap configs: ${PRIORITY_SITEMAP_CONFIG_LIMITS.size}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
