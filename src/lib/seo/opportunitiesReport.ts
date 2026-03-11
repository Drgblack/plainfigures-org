import { ALL_TOOLS } from '@/lib/siteData';
import { getAllClusterHubs } from '@/lib/seo/clusterHubs';
import { getCrawlAuditSnapshot } from '@/lib/seo/crawlAudit';
import { getClusterHubLinks, getLearnHubClusters } from '@/lib/seo/relatedLinks';
import { LEARN_GUIDE_URLS } from '@/lib/sitemap-data';

type GuideSupport = {
  href: string;
  title: string;
  toolLinks: number;
  learnHubLinks: number;
  clusterHubLinks: number;
  score: number;
};

type CalculatorGuideGap = {
  href: string;
  title: string;
  hubCount: number;
};

type CalculatorSingleHubPath = {
  href: string;
  title: string;
  guideHref: string;
  hubHref: string;
};

type HubEnrichmentCandidate = {
  href: string;
  title: string;
  calculatorCount: number;
  guideCount: number;
  relatedHubCount: number;
  introWords: number;
  summaryWords: number;
  opportunityScore: number;
  note: string;
};

type LearnClusterExpansionCandidate = {
  key: string;
  title: string;
  calculatorCount: number;
  guideCount: number;
  hubCount: number;
  note: string;
};

type ConsolidationCandidate = {
  href: string;
  title: string;
  score: number;
  learnHubLinks: number;
  clusterHubLinks: number;
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

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function toolSupportsGuide(tool: (typeof ALL_TOOLS)[number], href: string): boolean {
  return tool.learnHref === href || (tool.supportGuideHrefs?.includes(href) ?? false);
}

function getGuideSupportRows(): GuideSupport[] {
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

  return LEARN_GUIDE_URLS
    .map(pathFromAbsoluteUrl)
    .map((href) => {
      const toolLinks = ALL_TOOLS.filter((tool) => toolSupportsGuide(tool, href)).length;
      const learnHubLinks = learnHubGuideCounts.get(href) ?? 0;
      const clusterHubLinks = clusterHubGuideCounts.get(href) ?? 0;

      return {
        href,
        title: pathToTitle(href),
        toolLinks,
        learnHubLinks,
        clusterHubLinks,
        score: toolLinks + learnHubLinks + clusterHubLinks,
      };
    });
}

export function getSeoOpportunitySnapshot() {
  const crawlAudit = getCrawlAuditSnapshot();
  const guideSupportRows = getGuideSupportRows();

  const calculatorGuideGaps: CalculatorGuideGap[] = ALL_TOOLS
    .filter((tool) => !tool.learnHref)
    .map((tool) => ({
      href: tool.href,
      title: tool.title,
      hubCount: getClusterHubLinks(tool.href).length,
    }))
    .sort((a, b) => a.hubCount - b.hubCount || a.title.localeCompare(b.title));

  const calculatorsWithSingleHubPath: CalculatorSingleHubPath[] = ALL_TOOLS
    .filter((tool) => Boolean(tool.learnHref))
    .map((tool) => {
      const hubLinks = getClusterHubLinks(tool.href);

      return {
        href: tool.href,
        title: tool.title,
        guideHref: tool.learnHref as string,
        hubHref: hubLinks[0]?.href ?? '',
        hubCount: hubLinks.length,
      };
    })
    .filter((tool) => tool.hubCount === 1)
    .map(({ hubCount: _hubCount, ...tool }) => tool)
    .sort((a, b) => a.title.localeCompare(b.title));

  const limitedSupportGuides = guideSupportRows
    .filter((guide) => guide.score === 2)
    .sort((a, b) => a.title.localeCompare(b.title));

  const consolidationCandidates: ConsolidationCandidate[] = guideSupportRows
    .filter((guide) => guide.toolLinks === 0 && guide.score <= 2)
    .map((guide) => ({
      href: guide.href,
      title: guide.title,
      score: guide.score,
      learnHubLinks: guide.learnHubLinks,
      clusterHubLinks: guide.clusterHubLinks,
    }))
    .sort((a, b) => a.score - b.score || a.title.localeCompare(b.title));

  const hubEnrichmentCandidates: HubEnrichmentCandidate[] = getAllClusterHubs()
    .map((hub) => {
      const introWords = countWords(hub.intro);
      const summaryWords = countWords(hub.summary);
      const notes: string[] = [];
      let opportunityScore = 0;

      if (hub.guideLinks.length < hub.calculatorHrefs.length) {
        opportunityScore += 2;
        notes.push('guide coverage is thinner than calculator breadth');
      }

      if (hub.relatedHubs.length < 2) {
        opportunityScore += 1;
        notes.push('hub has only one adjacent organiser path');
      }

      if (introWords < 35) {
        opportunityScore += 1;
        notes.push('intro is short enough that it may deserve more distinctive context');
      }

      if (summaryWords < 22) {
        opportunityScore += 1;
        notes.push('summary could do more to separate this hub from nearby clusters');
      }

      return {
        href: `/${hub.slug}`,
        title: hub.title,
        calculatorCount: hub.calculatorHrefs.length,
        guideCount: hub.guideLinks.length,
        relatedHubCount: hub.relatedHubs.length,
        introWords,
        summaryWords,
        opportunityScore,
        note: notes.join('; '),
      };
    })
    .filter((hub) => hub.opportunityScore > 0)
    .sort((a, b) => b.opportunityScore - a.opportunityScore || a.title.localeCompare(b.title));

  const learnClusterExpansionCandidates: LearnClusterExpansionCandidate[] = getLearnHubClusters()
    .map((cluster) => {
      const notes: string[] = [];

      if (cluster.hubs.length === 1) {
        notes.push('only one dedicated sub-hub is exposed from the learn hub');
      }

      if (cluster.guides.length <= cluster.calculators.length) {
        notes.push('guide count is not yet comfortably ahead of calculator count');
      }

      return {
        key: cluster.key,
        title: cluster.title,
        calculatorCount: cluster.calculators.length,
        guideCount: cluster.guides.length,
        hubCount: cluster.hubs.length,
        note: notes.join('; '),
      };
    })
    .filter((cluster) => cluster.note.length > 0)
    .sort((a, b) => a.hubCount - b.hubCount || a.guideCount - b.guideCount || a.title.localeCompare(b.title));

  return {
    totals: {
      weakCalculators: crawlAudit.totals.weakCalculators,
      weakGuides: crawlAudit.totals.weakGuides,
      calculatorsMissingGuides: calculatorGuideGaps.length,
      calculatorsWithSingleHubPath: calculatorsWithSingleHubPath.length,
      limitedSupportGuides: limitedSupportGuides.length,
      consolidationCandidates: consolidationCandidates.length,
      hubEnrichmentCandidates: hubEnrichmentCandidates.length,
      learnClusterExpansionCandidates: learnClusterExpansionCandidates.length,
    },
    calculatorGuideGaps,
    calculatorsWithSingleHubPath,
    limitedSupportGuides,
    consolidationCandidates,
    hubEnrichmentCandidates,
    learnClusterExpansionCandidates,
  };
}
