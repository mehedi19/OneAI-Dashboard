import { useState } from "react";

import { planSummary } from "../../lib/dashboard-data";
import { Avatar } from "./primitives";

export function RevenueChart({ margin = false }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const revenue = [
    7200, 7400, 7600, 7480, 8150, 8420, 7910, 8650, 9010, 8840, 9450, 9290,
    9860, 9530, 10120, 9820, 10680, 10390, 11120, 10910, 11580, 11920, 11350,
    12480, 12140, 13040, 12730, 13610, 13360, 14030, 14520,
  ];
  const tokens = [
    118, 127, 129, 145, 142, 154, 138, 162, 171, 164, 188, 183, 196, 191, 210,
    202, 219, 213, 233, 227, 241, 251, 238, 267, 256, 276, 271, 289, 283, 306,
    317,
  ];
  const margins = [
    57.8, 58.4, 58.1, 59.2, 59.7, 59.4, 60.4, 60.0, 61.1, 60.7, 61.8, 61.5,
    62.2, 61.8, 62.7, 62.3, 63.2, 62.9, 63.8, 63.5, 64.2, 63.9, 64.5, 64.0,
    64.7, 64.4, 65.1, 64.8, 65.5, 65.8, 66.2,
  ];
  const primary = margin ? margins : revenue;
  const primaryRange = margin ? [55, 70] : [2000, 15000];
  const chartLeft = 38;
  const chartRight = 705;
  const chartTop = 25;
  const chartBottom = 180;
  const pointX = (index) =>
    chartLeft + ((chartRight - chartLeft) * index) / (primary.length - 1);
  const pointY = (value, range) =>
    chartBottom -
    ((value - range[0]) / (range[1] - range[0])) * (chartBottom - chartTop);
  const makePath = (values, range) =>
    values
      .map(
        (value, index) =>
          `${index ? "L" : "M"}${pointX(index).toFixed(1)},${pointY(value, range).toFixed(1)}`,
      )
      .join(" ");
  const primaryPath = makePath(primary, primaryRange);
  const tokenPath = makePath(tokens, [85, 340]);
  const hover =
    hoveredIndex === null
      ? null
      : {
          index: hoveredIndex,
          x: pointX(hoveredIndex),
          y: pointY(primary[hoveredIndex], primaryRange),
          secondaryY: pointY(tokens[hoveredIndex], [85, 340]),
        };
  const tooltipX = hover ? Math.min(hover.x + 11, 576) : 0;
  const handleMove = (event) => {
    const clientX = event.touches?.[0]?.clientX ?? event.clientX;
    if (!Number.isFinite(clientX)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const viewX = ((clientX - bounds.left) / bounds.width) * 740;
    const index = Math.max(
      0,
      Math.min(
        primary.length - 1,
        Math.round(
          ((viewX - chartLeft) / (chartRight - chartLeft)) *
            (primary.length - 1),
        ),
      ),
    );
    setHoveredIndex(index);
  };
  const labelForIndex = (index) => `Aug ${String(index + 1).padStart(2, "0")}`;
  return (
    <div className="chart-wrap">
      <svg
        className="chart interactive-chart"
        viewBox="0 0 740 230"
        preserveAspectRatio="none"
        role="img"
        aria-label={
          margin
            ? "Interactive gross margin trend chart"
            : "Interactive revenue and token consumption chart"
        }
      >
        <defs>
          <linearGradient
            id={margin ? "margin-gradient" : "revenue-gradient"}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop stopColor="#77b999" stopOpacity=".22" />
            <stop offset="1" stopColor="#77b999" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[31, 76, 121, 166].map((y) => (
          <line key={y} className="grid-line" x1="37" x2="706" y1={y} y2={y} />
        ))}
        <text className="axis-label" x="1" y="34">
          {margin ? "70%" : "BDT 14k"}
        </text>
        <text className="axis-label" x="1" y="79">
          {margin ? "65%" : "BDT 10k"}
        </text>
        <text className="axis-label" x="1" y="124">
          {margin ? "60%" : "BDT 6k"}
        </text>
        <text className="axis-label" x="3" y="169">
          {margin ? "55%" : "BDT 2k"}
        </text>
        {!margin && (
          <>
            <text className="axis-label" textAnchor="end" x="738" y="34">
              340M
            </text>
            <text className="axis-label" textAnchor="end" x="738" y="79">
              255M
            </text>
            <text className="axis-label" textAnchor="end" x="738" y="124">
              170M
            </text>
            <text className="axis-label" textAnchor="end" x="738" y="169">
              85M
            </text>
          </>
        )}
        <path
          className="chart-area"
          fill={`url(#${margin ? "margin-gradient" : "revenue-gradient"})`}
          d={`${primaryPath} L${chartRight},${chartBottom} L${chartLeft},${chartBottom}Z`}
        />
        <path className="chart-revenue" d={primaryPath} />
        {!margin && <path className="chart-tokens" d={tokenPath} />}
        {hover && (
          <>
            <line
              className="hover-rule"
              x1={hover.x}
              x2={hover.x}
              y1={chartTop}
              y2={chartBottom}
            />
            <circle
              className="chart-point hover"
              cx={hover.x}
              cy={hover.y}
              r="4"
            />
            {!margin && (
              <circle
                className="chart-token-point"
                cx={hover.x}
                cy={hover.secondaryY}
                r="3.5"
              />
            )}
            <g
              className="chart-tooltip"
              transform={`translate(${tooltipX} 30)`}
            >
              <rect width="120" height={margin ? "38" : "50"} rx="5" />
              <text x="9" y="14" className="tooltip-date">
                {labelForIndex(hover.index)}
              </text>
              <text x="9" y="28" className="tooltip-value">
                {margin
                  ? `${margins[hover.index].toFixed(1)}% gross margin`
                  : `BDT ${revenue[hover.index].toLocaleString()} revenue`}
              </text>
              {!margin && (
                <text x="9" y="41" className="tooltip-subvalue">
                  {tokens[hover.index]}M tokens
                </text>
              )}
            </g>
          </>
        )}
        <rect
          className="chart-hitbox"
          x={chartLeft}
          y={chartTop}
          width={chartRight - chartLeft}
          height={chartBottom - chartTop}
          onMouseMove={handleMove}
          onMouseLeave={() => setHoveredIndex(null)}
          onTouchMove={handleMove}
        />
        <text className="axis-label" x="37" y="207">
          Aug 01
        </text>
        <text className="axis-label" textAnchor="middle" x="260" y="207">
          Aug 11
        </text>
        <text className="axis-label" textAnchor="middle" x="485" y="207">
          Aug 21
        </text>
        <text className="axis-label" textAnchor="end" x="705" y="207">
          Aug 31
        </text>
      </svg>
      <div className="chart-hint">Hover over the chart to inspect a day</div>
    </div>
  );
}

export function KpiCard({ label, value, delta, alert = false }) {
  return (
    <article className="kpi-card">
      <div className="kpi-label">
        {label}
        <span className="info-dot">i</span>
      </div>
      <strong>{value}</strong>
      <div className={`kpi-delta ${alert ? "alert" : ""}`}>
        <b>{delta}</b> vs. previous period
      </div>
      <svg
        className="spark"
        width="74"
        height="30"
        viewBox="0 0 74 30"
        fill="none"
        role="img"
        aria-label={`${label}: ${value}, ${delta} versus previous period`}
      >
        <title>{`${label}: ${value}, ${delta} versus previous period`}</title>
        <path
          d="M1 25C8 21 12 23 17 18s8 3 14-3 7 2 13-4 9 1 14-5 7-2 15-7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path d="M1 29h72" stroke="#e9eeea" />
      </svg>
    </article>
  );
}

export function PlanEconomics() {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const active = planSummary.find((item) => item.name === hoveredPlan);
  return (
    <div className="economic-list">
      {planSummary.map((item) => (
        <div
          className={`economic-row interactive-bar ${hoveredPlan === item.name ? "is-hovered" : ""}`}
          key={item.name}
          tabIndex="0"
          onMouseEnter={() => setHoveredPlan(item.name)}
          onMouseLeave={() => setHoveredPlan(null)}
          onFocus={() => setHoveredPlan(item.name)}
          onBlur={() => setHoveredPlan(null)}
        >
          <div>
            <span>
              <i style={{ background: item.color }} />
              {item.name}
            </span>
            <small>{item.users} users</small>
          </div>
          <div className="paired-bar">
            <b style={{ width: item.revenueWidth }} />
            <em style={{ width: item.costWidth }} />
          </div>
          <footer>
            <span>
              Rev. <strong>{item.revenue}</strong>
            </span>
            <span>
              Cost <strong>{item.cost}</strong>
            </span>
          </footer>
          {hoveredPlan === item.name && (
            <div className="economic-tooltip">
              <b>{item.name} plan</b>
              <span>{item.users} active users</span>
              <span>
                Revenue {item.revenue} · model cost {item.cost}
              </span>
            </div>
          )}
        </div>
      ))}
      <div className="chart-hint plan-hint">
        Hover a plan bar to inspect its economics
      </div>
    </div>
  );
}

export function DonutChart() {
  const [hovered, setHovered] = useState(null);
  const slices = [
    { name: "OpenAI", share: 50.7, amount: "BDT 64,135", color: "#202520" },
    { name: "Anthropic", share: 24.8, amount: "BDT 31,372", color: "#75b997" },
    { name: "Google", share: 18.1, amount: "BDT 22,897", color: "#b8ddca" },
    { name: "Other", share: 6.4, amount: "BDT 8,096", color: "#e2e8e3" },
  ];
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <div className="donut-row">
      <div className="donut-chart">
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label="Interactive model cost distribution"
          onMouseLeave={() => setHovered(null)}
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#edf0ed"
            strokeWidth="11"
          />
          {slices.map((slice) => {
            const dash = (slice.share / 100) * circumference;
            const circle = (
              <circle
                key={slice.name}
                className={hovered?.name === slice.name ? "active" : ""}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth="11"
                strokeLinecap="butt"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 50 50)"
                tabIndex="0"
                onMouseEnter={() => setHovered(slice)}
                onFocus={() => setHovered(slice)}
                onBlur={() => setHovered(null)}
              />
            );
            offset += dash;
            return circle;
          })}
        </svg>
        <div className="donut-center">
          <b>{hovered ? hovered.share + "%" : "BDT 126.5k"}</b>
          <small>{hovered ? hovered.name : "total cost"}</small>
        </div>
        {hovered && (
          <div className="donut-tooltip">
            <b>{hovered.name}</b>
            <span>
              {hovered.amount} · {hovered.share}%
            </span>
          </div>
        )}
      </div>
      <div className="cost-list">
        {slices.map((slice) => (
          <button
            key={slice.name}
            onMouseEnter={() => setHovered(slice)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(slice)}
            onBlur={() => setHovered(null)}
          >
            <i style={{ background: slice.color }} />
            {slice.name}
            <b>{slice.share}%</b>
          </button>
        ))}
      </div>
    </div>
  );
}

export function UserTable({ title, copy, rows, top, share }) {
  return (
    <div className="usage-panel">
      <div className="usage-head">
        <div>
          <h3 className={top ? "" : "low"}>
            <span>{top ? "↑" : "↓"}</span>
            {title}
          </h3>
          <p>{copy}</p>
        </div>
        <div className="usage-share">
          <b>{share}</b>of plan tokens
        </div>
      </div>
      <div className="table-scroll">
        <table className="compact-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Member</th>
              <th className="right">Avg. tokens</th>
              <th className="right">Model cost</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row[1]}>
                <td>{i + 1}</td>
                <td>
                  <div className="member">
                    <Avatar name={row[0]} index={i} />
                    <div>
                      <b>{row[0]}</b>
                      <small>{row[1]}</small>
                    </div>
                  </div>
                </td>
                <td className="right">{row[2]}</td>
                <td className="right strong">{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
