import { ALL_TOOLS } from '@/lib/siteData';
import { getAllClusterHubs } from '@/lib/seo/clusterHubs';
import { getCrawlAuditSnapshot } from '@/lib/seo/crawlAudit';
import { getSeoOpportunitySnapshot } from '@/lib/seo/opportunitiesReport';
import {
  SEARCH_CONSOLE_SNAPSHOT,
  type SearchConsolePageRow,
  type SearchConsoleQueryRow,
} from '@/lib/seo/searchConsoleSnapshot';
import {
  LEARN_EXTENSION_URLS,
  LEARN_GUIDE_URLS,
  STATIC_PAGE_URLS,
} from '@/lib/sitemap-data';
import { TRUST_PAGES } from '@/lib/trust-pages';

type RouteGroupKey =
  | 'calculator'
  | 'professional-calculator'
  | 'programmatic-calculator'
  | 'learn-guide'
  | 'learn-extension'
  | 'cluster-hub'
  | 'trust'
  | 'static'
  | 'utility-noindex'
  | 'other';

type RouteGroupPerformance = {
  key: RouteGroupKey;
  label: string;
  pages: number;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type PageOpportunity = {
  path: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  group: RouteGroupKey;
  recommendation: string;
};

type QueryOpportunity = {
  query: string;
  pagePath?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  recommendation: string;
};

const CTR_QUICK_WIN_IMPRESSIONS = 100;
const QUERY_QUICK_WIN_IMPRESSIONS = 75;

const ROUTE_GROUP_LABELS: Record<RouteGroupKey, string> = {
  calculator: 'Calculator Hubs',
  'professional-calculator': 'Professional Tools',
  'programmatic-calculator': 'Programmatic Calculators',
  'learn-guide': 'Static Guides',
  'learn-extension': 'Learn Extensions',
  'cluster-hub': 'Cluster Hubs',
  trust: 'Trust Pages',
  static: 'Static Pages',
  'utility-noindex': 'Utility / Noindex',
  other: 'Unclassified',
};

function toPath(urlOrPath: string): string {
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    return new URL(urlOrPath).pathname;
  }

  return urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
}

function normaliseCtr(ctr: number): number {
  if (!Number.isFinite(ctr) || ctr < 0) {
    return 0;
  }

  return ctr > 1 ? ctr / 100 : ctr;
}

function formatCtr(ctr: number): number {
  return Number((ctr * 100).toFixed(2));
}

function averagePosition(rows: Array<{ impressions: number; position: number }>): number {
  const totalImpressions = rows.reduce((sum, row) => sum + row.impressions, 0);

  if (totalImpressions === 0) {
    return 0;
  }

  const weightedPosition = rows.reduce((sum, row) => sum + row.position * row.impressions, 0);
  return Number((weightedPosition / totalImpressions).toFixed(2));
}

function aggregateCtr(rows: Array<{ clicks: number; impressions: number }>): number {
  const totalClicks = rows.reduce((sum, row) => sum + row.clicks, 0);
  const totalImpressions = rows.reduce((sum, row) => sum + row.impressions, 0);

  if (totalImpressions === 0) {
    return 0;
  }

  return totalClicks / totalImpressions;
}

function buildKnownRouteSets() {
  const calculatorPaths = new Set(
    ALL_TOOLS.filter((tool) => !tool.professional).map((tool) => tool.href),
  );
  const professionalPaths = new Set(
    ALL_TOOLS.filter((tool) => tool.professional).map((tool) => tool.href),
  );
  const clusterHubPaths = new Set(getAllClusterHubs().map((hub) => `/${hub.slug}`));
  const trustPaths = new Set(Object.keys(TRUST_PAGES).map((slug) => `/${slug}`));
  const guidePaths = new Set(LEARN_GUIDE_URLS.map(toPath));
  const extensionPaths = new Set(LEARN_EXTENSION_URLS.map(toPath));
  const staticPaths = new Set(STATIC_PAGE_URLS.map(toPath));
  const utilityPaths = new Set(getCrawlAuditSnapshot().utilityNoindex.map((item) => item.href));

  return {
    calculatorPaths,
    professionalPaths,
    clusterHubPaths,
    trustPaths,
    guidePaths,
    extensionPaths,
    staticPaths,
    utilityPaths,
  };
}

function classifyPath(path: string, sets: ReturnType<typeof buildKnownRouteSets>): RouteGroupKey {
  if (sets.utilityPaths.has(path)) {
    return 'utility-noindex';
  }

  if (path.startsWith('/calculators/')) {
    return 'programmatic-calculator';
  }

  if (sets.guidePaths.has(path)) {
    return 'learn-guide';
  }

  if (sets.extensionPaths.has(path)) {
    return 'learn-extension';
  }

  if (sets.professionalPaths.has(path)) {
    return 'professional-calculator';
  }

  if (sets.calculatorPaths.has(path)) {
    return 'calculator';
  }

  if (sets.clusterHubPaths.has(path)) {
    return 'cluster-hub';
  }

  if (sets.trustPaths.has(path)) {
    return 'trust';
  }

  if (sets.staticPaths.has(path)) {
    return 'static';
  }

  return 'other';
}

function cleanPageRow(row: SearchConsolePageRow) {
  return {
    ...row,
    path: toPath(row.page),
    ctr: normaliseCtr(row.ctr),
  };
}

function cleanQueryRow(row: SearchConsoleQueryRow) {
  return {
    ...row,
    pagePath: row.page ? toPath(row.page) : undefined,
    ctr: normaliseCtr(row.ctr),
  };
}

function pageRecommendation(group: RouteGroupKey, path: string, ctr: number, position: number): string {
  if (group === 'utility-noindex') {
    return 'Check whether this noindex surface is still getting indexed or clicked, and confirm the live robots state in Search Console.';
  }

  if (group === 'other') {
    return 'Classify this URL and decide whether it should join a known cluster, remain utility-only, or stay out of the index.';
  }

  if (position >= 3 && position <= 12 && ctr < 0.03) {
    return 'Ranking is already within striking distance. Test title and meta copy before changing architecture.';
  }

  if (group === 'programmatic-calculator') {
    return 'Review the template intro, title pattern, and cluster links for this programmatic family before expanding it further.';
  }

  if (group === 'cluster-hub') {
    return 'This organiser page is being seen. Tighten the opening copy or internal CTA labels if CTR is lagging.';
  }

  if (group === 'learn-guide' || group === 'learn-extension') {
    return 'Cross-check the guide title, intro, and calculator CTA against the query it is attracting.';
  }

  return `Review title, intro, and internal-link prominence for ${path}.`;
}

function queryRecommendation(position: number, ctr: number): string {
  if (position >= 3 && position <= 10 && ctr < 0.03) {
    return 'Ranking is close enough for a title and snippet rewrite test.';
  }

  if (position > 10 && position <= 20) {
    return 'Query is visible but not competitive yet. Improve page specificity before expanding the cluster.';
  }

  return 'Monitor query-page fit and keep the landing page tightly aligned to the search intent.';
}

export function getSearchConsoleReportSnapshot() {
  const sets = buildKnownRouteSets();
  const crawlAudit = getCrawlAuditSnapshot();
  const seoOpportunities = getSeoOpportunitySnapshot();
  const pageRows = SEARCH_CONSOLE_SNAPSHOT.pageRows.map(cleanPageRow);
  const queryRows = SEARCH_CONSOLE_SNAPSHOT.queryRows.map(cleanQueryRow);

  const classifiedPages = pageRows.map((row) => ({
    ...row,
    group: classifyPath(row.path, sets),
  }));

  const groupMap = new Map<RouteGroupKey, typeof classifiedPages>();

  for (const row of classifiedPages) {
    const existing = groupMap.get(row.group) ?? [];
    existing.push(row);
    groupMap.set(row.group, existing);
  }

  const routeGroups: RouteGroupPerformance[] = (Object.keys(ROUTE_GROUP_LABELS) as RouteGroupKey[])
    .map((key) => {
      const rows = groupMap.get(key) ?? [];

      return {
        key,
        label: ROUTE_GROUP_LABELS[key],
        pages: rows.length,
        clicks: rows.reduce((sum, row) => sum + row.clicks, 0),
        impressions: rows.reduce((sum, row) => sum + row.impressions, 0),
        ctr: formatCtr(aggregateCtr(rows)),
        position: averagePosition(rows),
      };
    })
    .filter((group) => group.pages > 0)
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks);

  const topPages = [...classifiedPages]
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 12)
    .map((row) => ({
      path: row.path,
      group: row.group,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: formatCtr(row.ctr),
      position: Number(row.position.toFixed(2)),
    }));

  const ctrQuickWins: PageOpportunity[] = classifiedPages
    .filter(
      (row) =>
        row.impressions >= CTR_QUICK_WIN_IMPRESSIONS &&
        row.position >= 3 &&
        row.position <= 12 &&
        row.ctr < 0.03 &&
        row.group !== 'utility-noindex',
    )
    .sort((a, b) => b.impressions - a.impressions || a.ctr - b.ctr)
    .slice(0, 15)
    .map((row) => ({
      path: row.path,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: formatCtr(row.ctr),
      position: Number(row.position.toFixed(2)),
      group: row.group,
      recommendation: pageRecommendation(row.group, row.path, row.ctr, row.position),
    }));

  const utilityLeakPages: PageOpportunity[] = classifiedPages
    .filter((row) => row.group === 'utility-noindex' && row.impressions > 0)
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks)
    .map((row) => ({
      path: row.path,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: formatCtr(row.ctr),
      position: Number(row.position.toFixed(2)),
      group: row.group,
      recommendation: pageRecommendation(row.group, row.path, row.ctr, row.position),
    }));

  const unknownPages: PageOpportunity[] = classifiedPages
    .filter((row) => row.group === 'other')
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks)
    .slice(0, 15)
    .map((row) => ({
      path: row.path,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: formatCtr(row.ctr),
      position: Number(row.position.toFixed(2)),
      group: row.group,
      recommendation: pageRecommendation(row.group, row.path, row.ctr, row.position),
    }));

  const queryQuickWins: QueryOpportunity[] = queryRows
    .filter((row) => row.impressions >= QUERY_QUICK_WIN_IMPRESSIONS && row.position >= 3 && row.position <= 12 && row.ctr < 0.03)
    .sort((a, b) => b.impressions - a.impressions || a.ctr - b.ctr)
    .slice(0, 15)
    .map((row) => ({
      query: row.query,
      pagePath: row.pagePath,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: formatCtr(row.ctr),
      position: Number(row.position.toFixed(2)),
      recommendation: queryRecommendation(row.position, row.ctr),
    }));

  return {
    snapshot: SEARCH_CONSOLE_SNAPSHOT,
    hasData: pageRows.length > 0 || queryRows.length > 0,
    totals: {
      pageRows: pageRows.length,
      queryRows: queryRows.length,
      clicks: pageRows.reduce((sum, row) => sum + row.clicks, 0),
      impressions: pageRows.reduce((sum, row) => sum + row.impressions, 0),
      ctr: formatCtr(aggregateCtr(pageRows)),
      position: averagePosition(pageRows),
    },
    routeGroups,
    topPages,
    ctrQuickWins,
    queryQuickWins,
    utilityLeakPages,
    unknownPages,
    currentArchitecture: {
      weakCalculators: crawlAudit.totals.weakCalculators,
      weakGuides: crawlAudit.totals.weakGuides,
      remainingSeoFlags:
        seoOpportunities.totals.hubEnrichmentCandidates +
        seoOpportunities.totals.learnClusterExpansionCandidates,
    },
  };
}
