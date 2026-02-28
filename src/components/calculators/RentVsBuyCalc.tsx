'use client';

import SaveCalcButton from '@/components/ui/SaveCalcButton';
import ToolPreview from '@/components/ui/ToolPreview';

import { useState, useMemo } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';
import { calculateRentVsBuy } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatting';
import { InputField, ResultCard, Section } from '@/components/ui';

export default function RentVsBuyCalc() {
  const { currency } = useCurrency();
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(52500);
  const [mortgageRate, setMortgageRate] = useState(4.5);
  const [mortgageTerm, setMortgageTerm] = useState(25);
  const [monthlyRent, setMonthlyRent] = useState(1400);
  const [rentIncrease, setRentIncrease] = useState(3.0);
  const [appreciation, setAppreciation] = useState(3.0);
  const [investReturn, setInvestReturn] = useState(6.0);
  const [years, setYears] = useState(10);

  const result = useMemo(
    () => calculateRentVsBuy(
      homePrice, downPayment, mortgageRate, mortgageTerm,
      monthlyRent, rentIncrease, appreciation, investReturn,
      years, 1.2, 1.0, 3.0
    ),
    [homePrice, downPayment, mortgageRate, mortgageTerm, monthlyRent, rentIncrease, appreciation, investReturn, years]
  );

  const fmt = (v: number) => formatCurrency(v, currency);
  const buyingIsBetter = result.netWorthDifference > 0;
  const finalYear = result.yearlyComparison[result.yearlyComparison.length - 1];
  const buyNetPosition = finalYear ? finalYear.buyNetPosition : 0;
  const rentNetPosition = finalYear ? finalYear.rentNetPosition : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ToolPreview id="rent-vs-buy" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Buy inputs */}
        <Section title="Buying">
          <InputField label="Home Price" value={homePrice} onChange={setHomePrice} min={50000} max={2000000} step={5000} prefix={currency.symbol} />
          <InputField label="Down Payment" value={downPayment} onChange={setDownPayment} min={0} max={homePrice} step={1000} prefix={currency.symbol} hint={`${((downPayment / homePrice) * 100).toFixed(0)}%`} />
          <InputField label="Mortgage Rate" value={mortgageRate} onChange={setMortgageRate} min={0.5} max={15} step={0.1} suffix="%" />
          <InputField label="Mortgage Term" value={mortgageTerm} onChange={setMortgageTerm} min={5} max={35} step={1} suffix="years" />
          <InputField label="Annual Home Appreciation" value={appreciation} onChange={setAppreciation} min={0} max={15} step={0.5} suffix="%" />
        </Section>

        {/* Rent inputs */}
        <Section title="Renting">
          <InputField label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} min={100} max={10000} step={50} prefix={currency.symbol} />
          <InputField label="Annual Rent Increase" value={rentIncrease} onChange={setRentIncrease} min={0} max={15} step={0.5} suffix="%" />
          <InputField label="Investment Return (on saved deposit)" value={investReturn} onChange={setInvestReturn} min={0} max={20} step={0.5} suffix="%" />
        </Section>
      </div>

      {/* Comparison period */}
      <Section title="Comparison Period">
        <div style={{ maxWidth: '300px' }}>
          <InputField label="Compare over" value={years} onChange={setYears} min={1} max={30} step={1} suffix="years" />
        </div>
      </Section>

      {/* Results */}
      <Section title={`Verdict after ${years} years`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <SaveCalcButton
          toolHref="/rent-vs-buy"
          toolTitle="Rent vs Buy"
          summary={`${fmt(homePrice)} property vs ${fmt(monthlyRent)}/mo rent over ${years}y`}
          keyResults={[
              { label: 'Buy Net Position', value: fmt(buyNetPosition) },
              { label: 'Rent Net Position', value: fmt(rentNetPosition) },
          ]}
        />

          </div>

          <ResultCard
            label="Better financial outcome"
            value={buyingIsBetter ? 'Buying' : 'Renting'}
            size="large"
            color={buyingIsBetter ? 'positive' : 'warning'}
          />
          <ResultCard
            label="Net Worth Difference"
            value={fmt(Math.abs(result.netWorthDifference))}
            sub={buyingIsBetter ? 'advantage to buying' : 'advantage to renting'}
            color={buyingIsBetter ? 'positive' : 'warning'}
          />
          <ResultCard
            label={result.breakEvenYear ? `Break-even Year` : 'Break-even'}
            value={result.breakEvenYear ? `Year ${result.breakEvenYear}` : 'Not reached'}
            sub={result.breakEvenYear ? 'buying overtakes renting' : `within ${years} years`}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <ResultCard label="Buy: Home Equity Built" value={fmt(result.buyEquity)} color="positive" />
          <ResultCard label="Buy: Total Cost Paid" value={fmt(result.buyTotalCost)} color="negative" />
        </div>
      </Section>

      {/* Year by year comparison */}
      <Section title="Year-by-Year Net Position">
        <div style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          overflowX: 'auto',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 80px 80px', gap: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '0.25rem' }}>
            {['Yr', 'Buy net position', 'Rent net position', 'Buy', 'Rent'].map(h => (
              <div key={h} style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
            ))}
          </div>
          {result.yearlyComparison.filter((_, i) => {
            const total = result.yearlyComparison.length;
            if (total <= 10) return true;
            const step = Math.ceil(total / 10);
            return i % step === 0 || i === total - 1;
          }).map(({ year, buyNetPosition, rentNetPosition }) => {
            const maxAbs = Math.max(...result.yearlyComparison.map(r => Math.max(Math.abs(r.buyNetPosition), Math.abs(r.rentNetPosition))));
            const buyPct = (Math.max(0, buyNetPosition) / maxAbs) * 100;
            const rentPct = (Math.max(0, rentNetPosition) / maxAbs) * 100;
            const buyAhead = buyNetPosition > rentNetPosition;
            return (
              <div key={year} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 80px 80px', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Y{year}</div>
                <div style={{ height: '10px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${buyPct}%`, background: buyAhead ? 'var(--positive)' : 'var(--accent)', opacity: 0.7 }} />
                </div>
                <div style={{ height: '10px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${rentPct}%`, background: !buyAhead ? 'var(--positive)' : 'var(--warning)', opacity: 0.7 }} />
                </div>
                <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: buyAhead ? 'var(--positive)' : 'var(--text-muted)', textAlign: 'right' }}>{fmt(buyNetPosition)}</div>
                <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: !buyAhead ? 'var(--positive)' : 'var(--text-muted)', textAlign: 'right' }}>{fmt(rentNetPosition)}</div>
              </div>
            );
          })}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              * Net position = equity/investments minus cumulative costs. Buying includes 3% buying costs, 1.2% property tax, 1% maintenance p.a.
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
