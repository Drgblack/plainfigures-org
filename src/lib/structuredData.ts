// JSON-LD structured data helpers for individual calculator pages

export interface CalcPageJsonLd {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
  faqs?: { question: string; answer: string }[];
}

export function calcPageJsonLd({ name, description, url, keywords, faqs }: CalcPageJsonLd) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': name,
    'description': description,
    'url': `https://plainfigures.org${url}`,
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'GBP',
    },
    'provider': {
      '@type': 'Organization',
      'name': 'Plain Figures',
      'url': 'https://plainfigures.org',
    },
  };

  if (!faqs || faqs.length === 0) return [base];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      'name': question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': answer,
      },
    })),
  };

  return [base, faqSchema];
}

// Per-calculator FAQ data — used for JSON-LD and can drive an FAQ accordion
export const CALC_FAQS: Record<string, { question: string; answer: string }[]> = {
  '/mortgage': [
    { question: 'How is a mortgage repayment calculated?', answer: 'Monthly repayment = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of months.' },
    { question: 'Does the monthly payment include insurance or fees?', answer: 'No. This calculator shows the principal-and-interest component only. Buildings insurance, life insurance, and arrangement fees are separate costs.' },
    { question: 'What happens if interest rates change during my mortgage?', answer: 'Your payment will change when your deal ends. Recalculate using the new rate when your fixed, tracker, or discounted period expires.' },
  ],
  '/compound': [
    { question: 'What is the difference between AER and nominal rate?', answer: 'The Annual Equivalent Rate (AER) normalises for compounding frequency so accounts can be compared fairly. A 5% nominal rate compounded daily gives an AER of 5.127%.' },
    { question: 'How does the Rule of 72 work?', answer: 'Divide 72 by the annual interest rate to estimate years to double your money. At 6%, 72 ÷ 6 = 12 years. This is an approximation; the precise calculation uses logarithms.' },
  ],
  '/take-home': [
    { question: 'How is UK take-home pay calculated?', answer: 'Gross salary minus income tax (applied to bands above the Personal Allowance) minus National Insurance contributions (Class 1). Student loan, pension, and other deductions are separate.' },
    { question: 'What is the £100,000 Personal Allowance trap?', answer: 'For every £2 earned above £100,000, the £12,570 Personal Allowance reduces by £1. Between £100,000 and £125,140, the effective marginal tax rate is 60% (40% tax + the loss of allowance). Salary sacrifice pension contributions can reduce this.' },
  ],
  '/rent-vs-buy': [
    { question: 'Is renting really "throwing money away"?', answer: 'Not necessarily. Rent payments provide housing, the same as mortgage interest — neither builds equity directly. Renting can be financially rational if investment returns exceed property appreciation, or if flexibility has high value.' },
    { question: 'How long does it typically take for buying to beat renting?', answer: 'In the UK, buying typically outperforms renting after 6–12 years, but this varies significantly with property appreciation, deposit size, and mortgage rate. The break-even point is highly sensitive to assumptions.' },
  ],
  '/savings': [
    { question: 'How does compound interest grow savings?', answer: 'Interest is added to the balance each period, and subsequent interest is calculated on the new (higher) balance. Over time, interest earns interest — this exponential growth is more powerful the longer the savings period.' },
  ],
  '/retirement': [
    { question: 'What is the 4% rule for retirement?', answer: 'A widely used guideline suggesting you can withdraw 4% of your retirement pot annually and it will last 30+ years, based on historical market returns. It is a rough estimate, not a guarantee, and assumes a balanced investment portfolio.' },
    { question: 'How much should I save for retirement?', answer: 'A common heuristic is to save half your age as a percentage of your salary (e.g. if you start saving at 30, save 15% of salary). The exact amount depends on target retirement income, existing savings, and expected investment returns.' },
  ],
  '/affordability': [
    { question: 'How do lenders calculate maximum mortgage?', answer: "Most UK lenders use an income multiple of 4–4.5× gross annual income. They also stress-test affordability at a rate typically 3% above the product rate (often around 7–8% in 2025/26) to confirm you can afford payments if rates rise." },
    { question: 'What is an LTV ratio?', answer: 'Loan-to-Value (LTV) is the mortgage amount divided by the property value. A £225,000 mortgage on a £250,000 property is 90% LTV. Lower LTV generally means access to better rates and lower mortgage insurance costs.' },
  ],
};
