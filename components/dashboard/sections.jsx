import { planSummary } from "../../lib/dashboard-data";
import { Card, CardHeading } from "./primitives";

export function ModelTable({ rows }) {
  return (
    <table className="model-table">
      <thead>
        <tr>
          <th>Model</th>
          <th className="right">Tokens</th>
          <th className="right">Share</th>
          <th className="right">Cost / 1M tokens</th>
          <th className="right">Total cost</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((model) => (
          <tr key={model.name}>
            <td>
              <div className="model-cell">
                <span className="model-badge">
                  <img src={`/assets/models/${model.logo}`} alt="" />
                </span>
                <div>
                  <b>{model.name}</b>
                  <small>{model.provider}</small>
                </div>
              </div>
            </td>
            <td className="right">{model.tokens}</td>
            <td className="right">
              <span className="share">
                <i>
                  <b style={{ width: model.width }} />
                </i>
                {model.share}
              </span>
            </td>
            <td className="right">{model.unit}</td>
            <td className="right strong">{model.cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PlanCatalog() {
  const plans = [
    [
      "Free",
      "BDT 0",
      "",
      "Limited tokens · AI chat · Bangla & English support",
      "DeepSeek · Gemini · Grok",
    ],
    [
      "Lite",
      "BDT 99",
      "BDT 199",
      "Chat, content tools, DOC/PDF, and image generation.",
      "DeepSeek · Gemini · Grok · GPT",
    ],
    [
      "Plus",
      "BDT 299",
      "BDT 599",
      "Balanced capacity, research, presentations, and business tools.",
      "DeepSeek · Gemini · Grok · GPT",
    ],
    [
      "Pro",
      "BDT 799",
      "BDT 1,599",
      "Maximum capacity, premium models, video, and priority processing.",
      "GPT · Claude · Gemini · Grok · DeepSeek",
    ],
  ];
  return (
    <Card className="catalog">
      <CardHeading
        title="OneAI subscription catalog"
        copy="Public plan pricing currently live at oneaibd.com. Launch-offer price is shown where applicable."
        action={
          <a
            className="button secondary"
            href="https://oneaibd.com/"
            target="_blank"
          >
            View public plans
          </a>
        }
      />
      <div className="catalog-grid">
        {plans.map((p, i) => (
          <div
            className={`catalog-plan ${p[0] === "Plus" ? "featured" : ""}`}
            key={p[0]}
          >
            {p[0] === "Plus" && <span className="best">Best value</span>}
            <i style={{ background: planSummary[i].color }} />
            <h3>{p[0]}</h3>
            <b>
              {p[2] && <s>{p[2]}</s>}
              {p[1]} <small>/ month</small>
            </b>
            <p>{p[3]}</p>
            <span>{p[4]}</span>
          </div>
        ))}
      </div>
      <div className="catalog-note">
        🚀 50% welcome gift is subject to the public launch offer. Model and
        media access are governed by OneAI’s fair usage policy.
      </div>
    </Card>
  );
}

export function Recommendation({ title, copy, value }) {
  return (
    <div className="recommendation">
      <span>↗</span>
      <div>
        <b>{title}</b>
        <small>{copy}</small>
      </div>
      <em>{value}</em>
    </div>
  );
}

export function Metric({ label, value, note, alert = false }) {
  return (
    <Card className="metric">
      <span>{label}</span>
      <b>{value}</b>
      <small className={alert ? "alert" : ""}>{note}</small>
    </Card>
  );
}

export function PolicyRow({ name, cells }) {
  return (
    <tr>
      <td>
        <b>{name}</b>
      </td>
      {cells.map((cell, i) => (
        <td className="right" key={i}>
          {cell === "Enabled" ? (
            <span className="status">
              <i />
              Enabled
            </span>
          ) : (
            cell
          )}
        </td>
      ))}
    </tr>
  );
}

export function CreativeAccess({ logo, title, copy, plan }) {
  return (
    <div className="creative-access">
      <span className="model-badge large">
        <img src={`/assets/models/${logo}`} alt="" />
      </span>
      <h3>{title}</h3>
      <p>{copy}</p>
      <b>{plan}</b>
    </div>
  );
}
