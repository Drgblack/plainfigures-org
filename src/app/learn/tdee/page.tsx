import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'TDEE & Calorie Needs: How the Calculation Works — Plain Figures',
  description: 'How Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR) are calculated. The Mifflin-St Jeor equation, activity multipliers, what-if scenarios, and what the numbers mean.',
};

export default function TDEEGuide() {
  return (
    <GuideLayout
      title="TDEE & Calorie Needs: How the Calculation Works"
      description="How Total Daily Energy Expenditure is calculated from Basal Metabolic Rate — the Mifflin-St Jeor equation, activity multipliers, and what the resulting numbers actually mean."
      readTime="5 min"
      relatedCalc={{ href: '/tdee', label: 'TDEE & Calorie Calculator' }}
      relatedGuides={[
        { href: '/learn/lifestyle-inflation', label: 'Lifestyle Inflation: Real Cost Over Time' },
        { href: '/learn/save-for-goal', label: 'Save for a Goal: Time & Amount Basics' },
      ]}
    >
      <div className="guide-content">
        <h2>What TDEE Is — and Why It Matters</h2>
        <p>
          Total Daily Energy Expenditure (TDEE) is an estimate of the total number of calories a person burns in a day. It accounts for both resting metabolism (the energy your body uses just to stay alive) and physical activity. TDEE is the standard reference point used by nutrition researchers, clinicians, and fitness professionals when thinking about calorie needs.
        </p>
        <p>
          The figure is an estimate derived from population-level equations. Individual metabolic rates vary — sometimes significantly — due to genetics, hormonal factors, body composition, and health status. TDEE should be treated as an approximation, not a precise measurement.
        </p>

        <h2>Step 1 — Basal Metabolic Rate (BMR)</h2>
        <p>
          BMR is the estimated energy required at complete rest to maintain core biological functions: breathing, circulation, temperature regulation, and cellular processes. It represents roughly 60–75% of TDEE for most people.
        </p>
        <p>
          The <strong>Mifflin-St Jeor equation</strong> (1990) is the most widely validated formula for estimating BMR in the general population, and the one used by most modern calculators:
        </p>

        <div className="formula-block">
          <div className="formula-label">Mifflin-St Jeor BMR Formula</div>
          Men:&nbsp;&nbsp; BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) + 5<br />
          Women: BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) − 161<br /><br />
          Alternative — Harris-Benedict (revised 1984):<br />
          Men:&nbsp;&nbsp; BMR = (13.397 × kg) + (4.799 × cm) − (5.677 × age) + 88.362<br />
          Women: BMR = (9.247 × kg) + (3.098 × cm) − (4.330 × age) + 447.593<br /><br />
          Mifflin-St Jeor is typically preferred — studies show lower mean error vs measured BMR.
        </div>

        <div className="example-block">
          <div className="example-label">BMR worked example — 35-year-old woman, 65 kg, 168 cm</div>
          <div className="example-row"><span>Weight component (10 × 65)</span><span>650</span></div>
          <div className="example-row"><span>Height component (6.25 × 168)</span><span>1,050</span></div>
          <div className="example-row"><span>Age component (5 × 35)</span><span>−175</span></div>
          <div className="example-row"><span>Sex adjustment</span><span>−161</span></div>
          <div className="example-row"><span>BMR</span><span>1,364 kcal/day</span></div>
        </div>

        <h2>Step 2 — Activity Multiplier</h2>
        <p>
          TDEE = BMR × Activity Factor. The activity factors below are the standard Harris-Benedict multipliers, still in common use:
        </p>

        <table>
          <thead>
            <tr><th>Activity level</th><th>Multiplier</th><th>Typical profile</th></tr>
          </thead>
          <tbody>
            <tr><td>Sedentary</td><td>× 1.2</td><td>Desk job, little or no intentional exercise</td></tr>
            <tr><td>Lightly active</td><td>× 1.375</td><td>Light exercise or sport 1–3 days/week</td></tr>
            <tr><td>Moderately active</td><td>× 1.55</td><td>Moderate exercise 3–5 days/week</td></tr>
            <tr><td>Very active</td><td>× 1.725</td><td>Hard exercise 6–7 days/week</td></tr>
            <tr><td>Extremely active</td><td>× 1.9</td><td>Physical job plus daily training</td></tr>
          </tbody>
        </table>

        <div className="example-block">
          <div className="example-label">TDEE — same woman, moderately active</div>
          <div className="example-row"><span>BMR</span><span>1,364 kcal/day</span></div>
          <div className="example-row"><span>Activity multiplier</span><span>× 1.55</span></div>
          <div className="example-row"><span>TDEE</span><span>~2,114 kcal/day</span></div>
        </div>

        <h2>What-If Scenarios</h2>

        <h3>What if activity level changes — sedentary vs very active?</h3>
        <p>
          Using the same BMR of 1,364 kcal:
        </p>
        <table>
          <thead>
            <tr><th>Activity</th><th>Multiplier</th><th>TDEE</th><th>Difference from sedentary</th></tr>
          </thead>
          <tbody>
            <tr><td>Sedentary</td><td>1.2</td><td>1,637 kcal/day</td><td>—</td></tr>
            <tr><td>Lightly active</td><td>1.375</td><td>1,875 kcal/day</td><td>+238</td></tr>
            <tr><td>Moderately active</td><td>1.55</td><td>2,114 kcal/day</td><td>+477</td></tr>
            <tr><td>Very active</td><td>1.725</td><td>2,353 kcal/day</td><td>+716</td></tr>
          </tbody>
        </table>
        <p>
          Moving from sedentary to moderately active increases TDEE by ~477 kcal/day — equivalent to a substantial meal. This is purely from activity, with no change in body weight or age.
        </p>

        <h3>What if weight changes by 10 kg?</h3>
        <p>
          The weight coefficient in Mifflin-St Jeor is 10 — so each kilogram of weight change alters BMR by exactly 10 kcal/day. At moderate activity (×1.55), a 10 kg weight change shifts TDEE by 10 × 1.55 = <strong>155 kcal/day</strong>. Over a year, that is ~56,000 kcal — roughly 7–8 kg of body fat equivalent at ~7,700 kcal/kg.
        </p>

        <h2>How the Numbers Are Used</h2>
        <p>
          TDEE is used as a maintenance baseline. Common frameworks applied to it:
        </p>
        <ul>
          <li><strong>Maintenance:</strong> Calories in ≈ TDEE</li>
          <li><strong>Deficit (fat loss):</strong> Calories in = TDEE − 300 to 500 (gradual) or TDEE − 750 to 1,000 (faster)</li>
          <li><strong>Surplus (muscle gain):</strong> Calories in = TDEE + 200 to 400 (lean bulk)</li>
          <li><strong>Aggressive deficit:</strong> Below TDEE − 1,000 is not generally recommended without medical supervision</li>
        </ul>

        <div className="key-point">
          A 500 kcal/day deficit relative to TDEE produces approximately 0.5 kg of weight loss per week in theory (1 kg ≈ 7,700 kcal). In practice, metabolic adaptation and appetite hormones mean actual results vary. TDEE estimates have ±10–15% individual error.
        </div>

        <h2>Accuracy Limitations</h2>
        <p>
          The Mifflin-St Jeor equation was validated on groups of 251 people and has a standard error of approximately ±200 kcal when applied to individuals. It performs better for people with typical body compositions — it tends to overestimate BMR in people with high body fat percentages and underestimate for those with very high lean mass. More precise methods (indirect calorimetry, DEXA scan body composition) exist but require clinical settings.
        </p>
        <p>
          Activity multipliers are inherently subjective — the difference between "moderately active" and "very active" is a judgement call that can shift TDEE by 200–300 kcal/day. Tracking actual intake and weight change for 2–4 weeks is more accurate than any formula for calibrating personal TDEE.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>Is TDEE the same as maintenance calories?</h3>
        <p>
          TDEE is a calculated estimate of maintenance calories — the calories needed to maintain current weight. It assumes the activity level input accurately reflects actual activity. In practice, many people overestimate their activity level, which means estimated TDEE overstates actual maintenance needs.
        </p>

        <h3>Does the Katch-McArdle formula give different results?</h3>
        <p>
          The Katch-McArdle formula calculates BMR from lean body mass (LBM) rather than total weight: BMR = 370 + (21.6 × LBM in kg). It is more accurate for people with known body fat percentages, particularly those who are significantly above or below average body fat. Without a body fat measurement, Mifflin-St Jeor is generally preferable.
        </p>

        <h3>Why does TDEE change as weight changes?</h3>
        <p>
          BMR includes a weight component (10 × kg). As weight decreases, BMR decreases proportionally — which is why calorie deficits become less effective over time without adjustment. A recalculation at the new weight is needed to maintain the same deficit in absolute terms.
        </p>

        <div className="warning-point">
          TDEE calculations are indicative only and are not medical or dietary advice. Individual metabolic rates vary significantly. Consult a registered dietitian, GP, or other qualified health professional before making significant changes to calorie intake, particularly if you have any health condition.
        </div>
      </div>
    </GuideLayout>
  );
}
