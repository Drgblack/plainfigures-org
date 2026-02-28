import type { Metadata } from 'next';
import GuideLayout from '@/components/layout/GuideLayout';

export const metadata: Metadata = {
  title: 'Beyond Chatbots: Predictive Analytics for Portfolio Reviews | Plain Figures',
  description:
    'How predictive analytics models work in portfolio review workflows — churn scoring, drift detection, model evaluation, and what-if scenarios for financial advisors.',
};

export default function PredictiveAnalyticsGuide() {
  return (
    <GuideLayout
      title="Beyond Chatbots: Predictive Analytics for Portfolio Reviews"
      description="How statistical models surface portfolio drift, churn risk, and rebalancing triggers before clients need to ask."
      readTime="6 min"
      relatedCalc={{ href: '/loss-probability', label: 'Loss Probability Model' }}
      relatedGuides={[
        { href: '/learn/agentic-advisor', label: 'The Agentic Advisor: AI-Driven Digital Co-Workers' },
        { href: '/learn/automation-audit-2026', label: 'Automation Audit: Tasks to Delegate to AI in 2026' },
      ]}
    >
      <div className="guide-content">
        <p>
          Where a chatbot answers a question already posed, a predictive model surfaces the question
          before the client has formed it — flagging portfolio drift, elevated churn risk, or a
          life-event trigger requiring contact. This guide explains the statistical mechanics behind
          common advisory prediction models, how to evaluate their outputs, and where the numbers tend
          to mislead.
        </p>

        <h2>Core Model Types in Advisory Workflows</h2>
        <table>
          <thead>
            <tr><th>Model type</th><th>Advisory application</th><th>Output</th></tr>
          </thead>
          <tbody>
            <tr><td>Logistic regression</td><td>Client churn probability</td><td>Score 0–1</td></tr>
            <tr><td>Random forest</td><td>Product recommendation likelihood</td><td>Ranked list</td></tr>
            <tr><td>Time-series (ARIMA / LSTM)</td><td>Portfolio value projection</td><td>Range forecast</td></tr>
            <tr><td>Threshold rule engine</td><td>Rebalancing drift alerts</td><td>Binary trigger</td></tr>
            <tr><td>Clustering (k-means)</td><td>Client segment identification</td><td>Segment label</td></tr>
          </tbody>
        </table>

        <h2>The Churn Prediction Formula</h2>
        <p>
          Logistic regression is the most common model for client attrition scoring:
        </p>
        <div className="formula-block">
          <span className="formula-label">Churn Probability</span>
          <pre>{`P(churn) = 1 ÷ (1 + e^−z)

z = β₀ + β₁(months_since_contact) + β₂(AUM_change_12m)
    + β₃(complaint_flag) + β₄(products_held)`}</pre>
        </div>
        <p>
          A typical trained model weights <code>months_since_contact</code> most heavily (β₁ ≈ 0.4)
          alongside <code>AUM_change_12m</code> (β₂ ≈ −0.3). A client with 9 months since last contact
          and a 15% AUM decline might score P(churn) = 0.72 — above a standard 0.65 alert threshold.
        </p>

        <h2>Portfolio Drift Detection</h2>
        <div className="formula-block">
          <span className="formula-label">Drift Calculation</span>
          <pre>{`Drift (%) = Σ |w_current(i) − w_target(i)|  for all assets i`}</pre>
        </div>
        <p>
          A portfolio with a 60/40 equity/bond target that has drifted to 68/32 has total drift of
          |68−60| + |32−40| = 16 percentage points. Firms typically set rebalancing triggers at 5–10%
          per asset class or 15–20% total drift.
        </p>

        <h2>Evaluating Model Quality</h2>
        <ul>
          <li><strong>AUC-ROC:</strong> Values above 0.75 are generally useful for churn models.</li>
          <li><strong>Precision:</strong> Of clients flagged at-risk, what % actually left? High precision reduces wasted outreach.</li>
          <li><strong>Recall:</strong> Of clients who left, what % were flagged? High recall minimises missed interventions.</li>
          <li><strong>Lift:</strong> How much better than random is the model in the top decile?</li>
        </ul>

        <h2>What-If Scenarios</h2>
        <div className="example-block">
          <span className="example-label">Scenario A — Churn threshold set too low (0.40)</span>
          <p>
            A firm with 800 clients might flag 280 as &ldquo;at risk.&rdquo; If precision is 30%, only 84 are
            genuine risks. Advisor time is diluted across 196 false alarms, reducing effectiveness of
            each outreach.
          </p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario B — Market volatility spikes, drift alerts flood system</span>
          <p>
            During a 15% equity drawdown, nearly all balanced portfolios may breach drift thresholds
            simultaneously. Without prioritisation logic (sort by AUM × drift %), advisors face an
            unworkable alert queue. Tiered thresholds by AUM band prevent this.
          </p>
        </div>
        <div className="example-block">
          <span className="example-label">Scenario C — Model trained on pre-2020 data used post-2024</span>
          <p>
            Behavioural patterns shifted materially during rate cycles 2022–2024. A churn model trained
            on 2015–2019 data may significantly underweight AUM sensitivity to rate changes. Model
            refresh cycles of 12–18 months are a practical minimum.
          </p>
        </div>

        <div className="warning-point">
          Churn prediction models in financial services typically achieve AUC scores of 0.70–0.82.
          Market return forecasting remains low-accuracy beyond 3 months. Evaluate models on
          precision/recall trade-offs, not raw accuracy figures.
        </div>
      </div>
    </GuideLayout>
  );
}
