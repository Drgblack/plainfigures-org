'use client';

import { useState, useMemo } from 'react';
import { calculateTDEE } from '@/lib/lifestyle-calculations';
import { ResultCard, Section } from '@/components/ui';

const ACTIVITY_LEVELS = [
  { label: 'Sedentary', desc: 'Little or no exercise', value: 1.2 },
  { label: 'Light', desc: '1–3 days/week', value: 1.375 },
  { label: 'Moderate', desc: '3–5 days/week', value: 1.55 },
  { label: 'Active', desc: '6–7 days/week', value: 1.725 },
  { label: 'Very Active', desc: 'Physical job + training', value: 1.9 },
];

const BMI_COLORS: Record<string, string> = {
  'Underweight': 'var(--accent)',
  'Healthy Weight': 'var(--positive)',
  'Overweight': 'var(--warning)',
  'Obese': 'var(--negative)',
};

export default function TDEECalc() {
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(175);
  const [age, setAge] = useState(30);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState(1.55);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const weightKg = unit === 'metric' ? weight : weight * 0.453592;
  const heightCm = unit === 'metric' ? height : height * 2.54;

  const result = useMemo(() => calculateTDEE(weightKg, heightCm, age, sex, activity), [weightKg, heightCm, age, sex, activity]);

  const bmiColor = BMI_COLORS[result.bmiCategory] || 'var(--text-primary)';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <div className="sticky-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Units + Sex */}
        <Section title="Settings">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {(['metric', 'imperial'] as const).map(u => (
              <button key={u} onClick={() => setUnit(u)} style={{ padding: '0.5rem', background: unit === u ? 'var(--accent-dim)' : 'var(--bg)', border: `1px solid ${unit === u ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '4px', color: unit === u ? 'var(--text-primary)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.15s ease', textTransform: 'capitalize' }}>{u}</button>
            ))}
            {(['male', 'female'] as const).map(s => (
              <button key={s} onClick={() => setSex(s)} style={{ padding: '0.5rem', background: sex === s ? 'var(--accent-dim)' : 'var(--bg)', border: `1px solid ${sex === s ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '4px', color: sex === s ? 'var(--text-primary)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.15s ease', textTransform: 'capitalize' }}>{s}</button>
            ))}
          </div>
        </Section>

        <Section title="Body Measurements">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Weight', value: weight, onChange: setWeight, min: unit === 'metric' ? 30 : 66, max: unit === 'metric' ? 250 : 550, step: 1, suffix: unit === 'metric' ? 'kg' : 'lbs' },
              { label: 'Height', value: height, onChange: setHeight, min: unit === 'metric' ? 100 : 48, max: unit === 'metric' ? 220 : 84, step: 1, suffix: unit === 'metric' ? 'cm' : 'in' },
              { label: 'Age', value: age, onChange: setAge, min: 15, max: 90, step: 1, suffix: 'years' },
            ].map(({ label, value, onChange, min, max, step, suffix }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</label>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{value} {suffix}</span>
                </div>
                <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(parseFloat(e.target.value))} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Activity Level">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {ACTIVITY_LEVELS.map(({ label, desc, value }) => (
              <button key={value} onClick={() => setActivity(value)} style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '0.6rem 0.8rem', background: activity === value ? 'var(--accent-dim)' : 'var(--bg)', border: `1px solid ${activity === value ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '4px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease', alignItems: 'center', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: activity === value ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--text-muted)' }}>{desc}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>×{value}</div>
              </button>
            ))}
          </div>
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Section title="Your Calorie Needs">
          <ResultCard label="TDEE — Maintenance Calories" value={`${result.tdee.toLocaleString()} kcal`} size="large" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ResultCard label="Weight Loss (−500 kcal)" value={`${result.weightLoss.toLocaleString()} kcal`} color="positive" sub="~0.5kg/week loss" />
            <ResultCard label="Weight Gain (+300 kcal)" value={`${result.weightGain.toLocaleString()} kcal`} color="warning" sub="lean bulk" />
          </div>
          <ResultCard label="BMR (at complete rest)" value={`${result.bmr.toLocaleString()} kcal`} sub="Basal Metabolic Rate — minimum calories to survive" />
        </Section>

        <Section title="BMI">
          <div style={{ background: 'var(--bg-elevated)', border: `1px solid ${bmiColor}40`, borderRadius: '6px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', fontWeight: 300, color: bmiColor, lineHeight: 1 }}>{result.bmi}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: bmiColor, marginTop: '0.4rem', letterSpacing: '0.1em' }}>{result.bmiCategory.toUpperCase()}</div>
            <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden', marginTop: '1rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: `${Math.min(100, ((result.bmi - 15) / 25) * 100)}%`, top: '-2px', width: '10px', height: '10px', borderRadius: '50%', background: bmiColor, transform: 'translateX(-50%)' }} />
              <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ width: '20%', background: 'var(--accent)', opacity: 0.4 }} />
                <div style={{ width: '27%', background: 'var(--positive)', opacity: 0.6 }} />
                <div style={{ width: '20%', background: 'var(--warning)', opacity: 0.6 }} />
                <div style={{ flex: 1, background: 'var(--negative)', opacity: 0.5 }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
            </div>
          </div>
        </Section>

        <Section title="Estimated Macros (at maintenance)">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            <ResultCard label="Protein" value={`${result.macros.protein}g`} sub="2g per kg bodyweight" />
            <ResultCard label="Carbs" value={`${result.macros.carbs}g`} sub="45% of calories" />
            <ResultCard label="Fat" value={`${result.macros.fat}g`} sub="30% of calories" />
          </div>
        </Section>
      </div>
    </div>
  );
}
