import { modelRows, usageData } from "../../../lib/dashboard-data";
import { Avatar, Card, CardHeading, Icon, PageHeader } from "../primitives";
import {
  DonutChart,
  KpiCard,
  PlanEconomics,
  RevenueChart,
  UserTable,
} from "../charts";
import { ModelTable } from "../sections";

export function Overview({
  plan,
  setPlan,
  leaderboard,
  setLeaderboard,
  showToast,
  goTo,
}) {
  const data = usageData[plan];
  const topThree =
    leaderboard === "tokens"
      ? [
          ["Theo Park", "51.9M tokens", 2],
          ["Amara Lewis", "58.4M tokens", 1],
          ["Maya Chen", "49.8M tokens", 3],
        ]
      : [
          ["Wen Yao", "BDT 420 saved", 2],
          ["Amara Lewis", "BDT 536 saved", 1],
          ["Theo Park", "BDT 501 saved", 3],
        ];
  const leaders =
    leaderboard === "tokens"
      ? [
          ["Jordan Rivera", "Plus · 14 day streak", "GPT", "46.7M"],
          ["Ishaan Shah", "Plus · 9 day streak", "Claude", "42.3M"],
          ["Elena Rossi", "Plus · 12 day streak", "GPT", "40.1M"],
          ["Noah Williams", "Plus · 7 day streak", "Gemini", "38.6M"],
          ["Priya Nair", "Plus · 11 day streak", "Claude", "36.9M"],
        ]
      : [
          ["Maya Chen", "Plus · smart routing", "GPT", "BDT 474"],
          ["Elena Rossi", "Plus · prompt caching", "DeepSeek", "BDT 409"],
          ["Jordan Rivera", "Plus · smart routing", "DeepSeek", "BDT 398"],
          ["Ishaan Shah", "Plus · fallback routing", "MiniMax", "BDT 356"],
          ["Claire Dubois", "Lite · smart routing", "Gemini", "BDT 312"],
        ];
  return (
    <>
      <PageHeader
        title="Usage intelligence"
        subtitle="Revenue, model spend, and customer usage across your OneAI workspace."
        status="Illustrative data · refreshed 7 min ago"
      />
      <div className="kpi-grid">
        <KpiCard
          label="Subscription revenue"
          value="BDT 360,280"
          delta="↑ 12.4%"
        />
        <KpiCard label="Token consumption" value="8.62B" delta="↑ 8.1%" />
        <KpiCard label="Model cost" value="BDT 126,500" delta="↑ 4.7%" alert />
        <KpiCard label="Gross margin" value="62.9%" delta="↑ 2.3pp" />
      </div>
      <div className="main-split">
        <Card>
          <CardHeading
            title="Revenue vs. token consumption"
            copy="Daily subscription revenue compared with total model tokens."
            menu
          />
          <div className="chart-meta">
            <span>
              <i className="legend-line" />
              Revenue
            </span>
            <span>
              <i className="legend-line dashed" />
              Tokens
            </span>
            <b>
              BDT 360.3k<small>8.62B tokens in period</small>
            </b>
          </div>
          <RevenueChart />
        </Card>
        <Card>
          <CardHeading
            title="Plan economics"
            copy="Revenue against model cost by subscription."
            menu
          />
          <PlanEconomics />
          <div className="card-footer">
            <button onClick={() => goTo("spend")}>
              View subscription breakdown <Icon name="arrow" size={13} />
            </button>
          </div>
        </Card>
      </div>
      <Card className="model-usage">
        <CardHeading
          title="Model usage & cost"
          copy="Token volume and blended inference cost by LLM provider."
        />
        <div className="model-table-wrap">
          <ModelTable rows={modelRows} />
        </div>
        <aside className="cost-aside">
          <h3>Cost distribution</h3>
          <DonutChart />
          <p>
            <b>Efficiency note.</b> Route routine GPT traffic to DeepSeek to
            reduce blended model cost.
          </p>
        </aside>
      </Card>
      <Card className="plan-analysis">
        <div className="analysis-top">
          <div>
            <h2>Plan usage intelligence</h2>
            <p>
              Find the highest- and lowest-usage customers within each
              subscription plan.
            </p>
          </div>
          <div className="plan-tabs">
            {Object.keys(usageData).map((item) => (
              <button
                key={item}
                className={plan === item ? "active" : ""}
                onClick={() => setPlan(item)}
              >
                {item} <span>· {usageData[item].users}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="analysis-kpis">
          <div>
            <span>{plan.toUpperCase()} USERS</span>
            <b>{data.users}</b>
            <small>active this period</small>
          </div>
          <div>
            <span>AVG. TOKEN CONSUMPTION</span>
            <b>{data.avgTokens}</b>
            <small>per active user</small>
          </div>
          <div>
            <span>AVG. MODEL COST</span>
            <b>{data.avgCost}</b>
            <small>per active user</small>
          </div>
        </div>
        <div className="usage-tables">
          <UserTable
            title="Top 10 by usage"
            copy="Highest average token consumption this period"
            rows={data.top}
            share={data.topShare}
            top
          />
          <UserTable
            title="Bottom 10 by usage"
            copy="Lowest average token consumption this period"
            rows={data.bottom}
            share={data.bottomShare}
          />
        </div>
        <div className="method-note">
          ⓘ Average token consumption is calculated per active user for Aug
          01–31. Model cost includes input, output, and cached tokens across
          selected models.
        </div>
      </Card>
      <Card className="leaderboard">
        <CardHeading
          title="Workspace leaderboard"
          copy="Celebrate the members getting the most value from OneAI this month."
          action={
            <button className="link-button" onClick={() => goTo("users")}>
              View all members <Icon name="arrow" size={13} />
            </button>
          }
        />
        <div className="leaderboard-grid">
          <div className="podium-area">
            <span className="eyebrow">Top AI power users</span>
            <div className="toggle-tabs">
              <button
                className={leaderboard === "tokens" ? "active" : ""}
                onClick={() => setLeaderboard("tokens")}
              >
                By tokens
              </button>
              <button
                className={leaderboard === "savings" ? "active" : ""}
                onClick={() => setLeaderboard("savings")}
              >
                By savings
              </button>
            </div>
            <div className="podium">
              {topThree.map(([name, value, rank], i) => (
                <div className={`podium-person rank-${rank}`} key={name}>
                  <div className="crown">{rank === 1 ? "♛" : ""}</div>
                  <Avatar name={name} index={i} />
                  <b>{name}</b>
                  <small>{value}</small>
                  <em>{rank}</em>
                </div>
              ))}
            </div>
          </div>
          <div className="leader-list">
            {leaders.map((row, i) => (
              <div className="leader-row" key={row[0]}>
                <span>{String(i + 4).padStart(2, "0")}</span>
                <div className="member">
                  <Avatar name={row[0]} index={i + 3} />
                  <div>
                    <b>{row[0]}</b>
                    <small>{row[1]}</small>
                  </div>
                </div>
                <small className="leader-model">● {row[2]}</small>
                <strong>
                  {row[3]}
                  <small>{leaderboard === "tokens" ? "tokens" : "saved"}</small>
                </strong>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
