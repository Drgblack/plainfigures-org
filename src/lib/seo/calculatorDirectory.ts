import { getToolByHref } from '@/lib/siteData';
import type { SeoLink } from '@/lib/seo/relatedLinks';

export type CalculatorDirectorySection = {
  href: string;
  title: string;
  description: string;
  calculatorHrefs: string[];
  guideLinks: SeoLink[];
};

const DIRECTORY_SECTIONS: CalculatorDirectorySection[] = [
  {
    href: '/mortgage-calculators',
    title: 'Mortgage Calculators',
    description:
      'Browse repayment, affordability, overpayment, offset, and housing comparison pages from one mortgage category hub.',
    calculatorHrefs: ['/mortgage', '/affordability', '/overpayment', '/offset', '/rent-vs-buy'],
    guideLinks: [
      { href: '/learn/mortgage-repayment', label: 'Read how mortgage repayment calculations work' },
      { href: '/learn/mortgage-affordability', label: 'Read how mortgage affordability is assessed' },
      { href: '/learn/mortgage-overpayment', label: 'Read the mortgage overpayment guide' },
    ],
  },
  {
    href: '/savings-calculators',
    title: 'Savings Calculators',
    description:
      'Use the savings hub for growth, savings goals, emergency buffers, recurring-cost drag, and short-run resilience decisions.',
    calculatorHrefs: ['/savings', '/save-goal', '/crisis', '/subscriptions', '/lifestyle-inflation'],
    guideLinks: [
      { href: '/learn/save-for-goal', label: 'Read the save-for-goal guide' },
      { href: '/learn/emergency-fund-how-much', label: 'Read the emergency fund guide' },
      { href: '/learn/subscription-drain', label: 'Read the subscription drain guide' },
    ],
  },
  {
    href: '/investing-calculators',
    title: 'Investing Calculators',
    description:
      'Keep compound growth, future-value thinking, and after-tax return context inside one investing calculator path.',
    calculatorHrefs: ['/compound', '/savings', '/retirement', '/take-home'],
    guideLinks: [
      { href: '/learn/compound-interest', label: 'Read the compound interest guide' },
      { href: '/learn/dividend-vs-growth', label: 'Read the dividend vs growth guide' },
      { href: '/learn/tax-loss-harvesting', label: 'Read the tax-loss harvesting guide' },
    ],
  },
  {
    href: '/retirement-calculators',
    title: 'Retirement Calculators',
    description:
      'Focus on pension growth, employer contributions, drawdown support, and contribution planning in one retirement hub.',
    calculatorHrefs: ['/retirement', '/savings', '/compound', '/take-home'],
    guideLinks: [
      { href: '/learn/retirement-savings', label: 'Read the retirement savings guide' },
      { href: '/learn/retirement-employer-contributions', label: 'Read the employer contributions guide' },
      { href: '/learn/pension-drawdown', label: 'Read the pension drawdown guide' },
    ],
  },
  {
    href: '/income-tax-and-borrowing',
    title: 'Income, Tax, and Borrowing',
    description:
      'Use this hub when salary, freelance pricing, borrowing, and affordability belong to the same decision path.',
    calculatorHrefs: ['/take-home', '/freelance', '/loan', '/affordability'],
    guideLinks: [
      { href: '/learn/salary-take-home', label: 'Read how salary take-home is calculated' },
      { href: '/learn/freelance-rate', label: 'Read the freelance rate guide' },
      { href: '/learn/loan-repayment', label: 'Read the loan repayment guide' },
    ],
  },
];

export function getCalculatorDirectorySections() {
  return DIRECTORY_SECTIONS.map((section) => ({
    ...section,
    calculators: section.calculatorHrefs
      .map((href) => getToolByHref(href))
      .filter((tool): tool is NonNullable<ReturnType<typeof getToolByHref>> => Boolean(tool))
      .map((tool) => ({
        href: tool.href,
        label: tool.title,
        description: tool.description,
      })),
  }));
}
