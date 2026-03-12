import { ALL_TOOLS } from '@/lib/siteData';
import { getAllClusterHubs } from '@/lib/seo/clusterHubs';
import { UTILITY_NOINDEX_ROUTES } from '@/lib/seo/indexation';
import { getClusterHubLinks, getLearnHubClusters } from '@/lib/seo/relatedLinks';
import { LEARN_GUIDE_URLS } from '@/lib/sitemap-data';

type WeakCalculator = {
  href: string;
  title: string;
  hasGuide: boolean;
  hubCount: number;
  note: string;
};

type WeakGuide = {
  href: string;
  title: string;
  toolLinks: number;
  learnHubLinks: number;
  clusterHubLinks: number;
  score: number;
};

type HubCoverage = {
  href: string;
  title: string;
  calculatorCount: number;
  guideCount: number;
  relatedHubCount: number;
};

function pathToTitle(href: string): string {
  return href
    .replace(/^\/learn\//, '')
    .replace(/^\//, '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function pathFromAbsoluteUrl(url: string): string {
  return new URL(url).pathname;
}

function toolSupportsGuide(tool: (typeof ALL_TOOLS)[number], href: string): boolean {
  return tool.learnHref === href || (tool.supportGuideHrefs?.includes(href) ?? false);
}

export function getCrawlAuditSnapshot() {
  const learnHubGuideCounts = new Map<string, number>();
  const clusterHubGuideCounts = new Map<string, number>();

  for (const cluster of getLearnHubClusters()) {
    for (const guide of cluster.guides) {
      learnHubGuideCounts.set(guide.href, (learnHubGuideCounts.get(guide.href) ?? 0) + 1);
    }
  }

  for (const hub of getAllClusterHubs()) {
    for (const guide of hub.guideLinks) {
      clusterHubGuideCounts.set(guide.href, (clusterHubGuideCounts.get(guide.href) ?? 0) + 1);
    }
  }

  const staticGuidePaths = LEARN_GUIDE_URLS.map(pathFromAbsoluteUrl);

  const weakCalculators: WeakCalculator[] = ALL_TOOLS.flatMap((tool) => {
    const hubCount = getClusterHubLinks(tool.href).length;
    const hasGuide = Boolean(tool.learnHref);

    if (hasGuide && hubCount > 0) {
      return [];
    }

    return [
      {
        href: tool.href,
        title: tool.title,
        hasGuide,
        hubCount,
        note: !hasGuide
          ? 'No dedicated explainer currently linked from the calculator registry.'
          : 'No sub-hub path currently links this calculator into the cluster-hub layer.',
      },
    ];
  });

  const weakGuides: WeakGuide[] = staticGuidePaths
    .map((href) => {
      const toolLinks = ALL_TOOLS.filter((tool) => toolSupportsGuide(tool, href)).length;
      const learnHubLinks = learnHubGuideCounts.get(href) ?? 0;
      const clusterHubLinks = clusterHubGuideCounts.get(href) ?? 0;
      const score = toolLinks + learnHubLinks + clusterHubLinks;

      return {
        href,
        title: pathToTitle(href),
        toolLinks,
        learnHubLinks,
        clusterHubLinks,
        score,
      };
    })
    .filter((guide) => guide.score <= 1)
    .sort((a, b) => a.score - b.score || a.title.localeCompare(b.title));

  const hubCoverage: HubCoverage[] = getAllClusterHubs().map((hub) => ({
    href: `/${hub.slug}`,
    title: hub.title,
    calculatorCount: hub.calculatorHrefs.length,
    guideCount: hub.guideLinks.length,
    relatedHubCount: hub.relatedHubs.length,
  }));

  return {
    totals: {
      calculators: ALL_TOOLS.length,
      staticGuides: staticGuidePaths.length,
      clusterHubs: hubCoverage.length,
      weakCalculators: weakCalculators.length,
      weakGuides: weakGuides.length,
    },
    weakCalculators,
    weakGuides,
    hubCoverage,
    utilityNoindex: UTILITY_NOINDEX_ROUTES,
  };
}
