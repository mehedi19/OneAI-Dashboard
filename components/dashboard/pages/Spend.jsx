import { planSummary } from "../../../lib/dashboard-data";
import { Button, Card, CardHeading, Icon, PageHeader } from "../primitives";
import { RevenueChart } from "../charts";
import { Metric, PlanCatalog, Recommendation } from "../sections";
import { downloadReport } from "../downloads";

export function Spend({ openModal, goTo }) {
  return (
    <>
      <PageHeader
        title="Spend & revenue"
        subtitle="Track revenue, model spend, and the health of every OneAI subscription tier."
        actions={
          <>
            <Button onClick={() => openModal("alert")}>
              <Icon name="bell" size={14} />
              Set cost alert
            </Button>
            <Button
              variant="primary"
              onClick={() => downloadReport("usage-report")}
            >
              <Icon name="download" size={14} />
              Export report
            </Button>
          </>
        }
      />
      <div className="metric-grid">
        <Metric
          label="Collected revenue"
          value="BDT 360,280"
          note="↑ 12.4% month over month"
        />
        <Metric
          label="Model spend"
          value="BDT 126,500"
          note="↑ 4.7% month over month"
          alert
        />
        <Metric
          label="Net contribution"
          value="BDT 233,780"
          note="↑ 17.3% month over month"
        />
        <Metric
          label="Revenue / 1M tokens"
          value="BDT 41.80"
          note="↑ BDT 0.22 versus last month"
        />
      </div>
      <div className="main-split">
        <Card>
          <CardHeading
            title="Gross margin trend"
            copy="Revenue after inference cost, updated daily."
          />
          <div className="trend-stat">
            <div>
              <b>62.9%</b>
              <span>Current margin</span>
            </div>
            <div>
              <b>60.6%</b>
              <span>Last period</span>
            </div>
            <div>
              <b>+2.3pp</b>
              <span>Period change</span>
            </div>
          </div>
          <RevenueChart margin />
        </Card>
        <Card>
          <CardHeading
            title="Optimization opportunities"
            copy="Recommended actions based on the last 31 days."
          />
          <div className="recommendations">
            <Recommendation
              title="Route simple tasks"
              copy="Move 18% of GPT traffic to DeepSeek."
              value="Save ~BDT 8,550"
            />
            <Recommendation
              title="Enable prompt caching"
              copy="245 prompts repeat their system context."
              value="Save ~BDT 5,175"
            />
            <Recommendation
              title="Review Free plan limits"
              copy="The top 1% of Free users generate 31% of plan cost."
              value="Protect ~BDT 3,150"
            />
          </div>
          <div className="card-footer">
            <button onClick={() => goTo("models")}>
              Review model routing <Icon name="arrow" size={13} />
            </button>
          </div>
        </Card>
      </div>
      <Card>
        <CardHeading
          title="Plan-level unit economics"
          copy="A complete view of subscriber volume, revenue, tokens, model cost, and margin."
          action={
            <Button onClick={() => downloadReport("plan-economics")}>
              <Icon name="download" size={14} />
              Download CSV
            </Button>
          }
        />
        <div className="model-table-wrap">
          <table className="model-table economics">
            <thead>
              <tr>
                <th>Plan</th>
                <th className="right">Active users</th>
                <th className="right">Subscription revenue</th>
                <th className="right">Tokens</th>
                <th className="right">Model cost</th>
                <th className="right">Gross margin</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Free", "5,841", "BDT 0", "1.44B", "BDT 18,420", "—"],
                [
                  "Lite",
                  "1,284",
                  "BDT 127,116",
                  "2.02B",
                  "BDT 38,610",
                  "64.0%",
                ],
                ["Plus", "550", "BDT 164,450", "4.32B", "BDT 57,800", "61.4%"],
                ["Pro", "86", "BDT 68,714", "0.84B", "BDT 11,670", "87.2%"],
              ].map((row, i) => (
                <tr key={row[0]}>
                  <td>
                    <span className="plan-label">
                      <i style={{ background: planSummary[i].color }} />
                      {row[0]}
                    </span>
                  </td>
                  {row.slice(1).map((cell, cellIndex) => (
                    <td
                      className={`right ${cellIndex === 4 && i ? "margin" : ""}`}
                      key={cellIndex}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <PlanCatalog />
    </>
  );
}
