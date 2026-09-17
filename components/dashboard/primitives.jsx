import { avatarColors } from "../../lib/dashboard-data";

export function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function Icon({ name, size = 17 }) {
  const paths = {
    grid: (
      <>
        <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" />
        <rect x="14" y="3.5" width="6.5" height="6.5" rx="1" />
        <rect x="3.5" y="14" width="6.5" height="6.5" rx="1" />
        <rect x="14" y="14" width="6.5" height="6.5" rx="1" />
      </>
    ),
    trend: (
      <>
        <path d="M4 19V5M4 19h16" />
        <path d="m7 15 3.3-4 3 2.1L19 6.5" />
      </>
    ),
    models: (
      <>
        <path d="M12 3c4 0 7 2.7 7 6s-3 6-7 6-7-2.7-7-6 3-6 7-6Z" />
        <path d="M7 14v3.4C7 19.4 9.2 21 12 21s5-1.6 5-3.6V14" />
        <path d="M9 9h.01M15 9h.01" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="10" r="2.2" />
        <path d="M3.5 20c.5-3.5 2.5-5.5 5.5-5.5s5 2 5.5 5.5M14.5 15.5c2.6.1 4.5 1.6 5 4.5" />
      </>
    ),
    invoice: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </>
    ),
    settings: (
      <>
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06-2.2 2.2-.06-.06A1.7 1.7 0 0 0 15.67 18a1.7 1.7 0 0 0-1 1.55v.1h-3.1v-.1a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06-2.2-2.2.06-.06A1.7 1.7 0 0 0 6.84 14a1.7 1.7 0 0 0-1.55-1H5.2V9.9h.1a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06 2.2-2.2.06.06A1.7 1.7 0 0 0 10.58 5.2a1.7 1.7 0 0 0 1-1.55v-.1h3.1v.1a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06 2.2 2.2-.06.06a1.7 1.7 0 0 0-.34 1.87 1.7 1.7 0 0 0 1.55 1h.1V13H21a1.7 1.7 0 0 0-1.6 2Z" />
      </>
    ),
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    calendar: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M7.5 3v4M16.5 3v4M3.5 9h17" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M4 19.5h16" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function Avatar({ name, index = 0, large = false }) {
  const [bg, ink] = avatarColors[index % avatarColors.length];
  return (
    <span
      className={`avatar ${large ? "avatar-lg" : ""}`}
      style={{ "--avatar-bg": bg, "--avatar-ink": ink }}
    >
      {initials(name)}
    </span>
  );
}

export function Button({
  children,
  onClick,
  variant = "secondary",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      className={`button ${variant} ${className}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}

export function Field({ label, value, select = false, full = false }) {
  return (
    <label className={`field ${full ? "full" : ""}`}>
      <span>{label}</span>
      {select ? (
        <select defaultValue={value}>
          <option>{value}</option>
          <option>USD — US Dollar</option>
          <option>EUR — Euro</option>
        </select>
      ) : (
        <input defaultValue={value} />
      )}
    </label>
  );
}

export function SettingsBlock({ title, copy, children, danger = false }) {
  return (
    <Card className={`settings-block ${danger ? "danger" : ""}`}>
      <h2>{title}</h2>
      <p>{copy}</p>
      {children}
    </Card>
  );
}

export function Setting({ label, copy, on, flip, action }) {
  return (
    <div className="setting">
      <div>
        <b>{label}</b>
        <small>{copy}</small>
      </div>
      {action || (
        <button
          className={`switch ${on ? "on" : ""}`}
          onClick={flip}
          aria-pressed={on}
          aria-label={label}
        />
      )}
    </div>
  );
}

export function PageHeader({ title, subtitle, actions, status }) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {status ? (
        <span className="data-status">
          <i />
          {status}
        </span>
      ) : (
        <div className="page-actions">{actions}</div>
      )}
    </header>
  );
}

export function CardHeading({ title, copy, action, menu }) {
  return (
    <header className="card-heading">
      <div>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      {action ||
        (menu && (
          <button className="menu" aria-label="More options">
            •••
          </button>
        ))}
    </header>
  );
}

export function FieldControlled({ label, value, change, placeholder }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        value={value}
        onChange={(event) => change(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export function Footer() {
  return (
    <footer className="app-footer">
      <div>
        <img src="/assets/oneai-logo-white.png" alt="OneAI" />
        <span>All-in-one AI workspace</span>
      </div>
      <nav>
        <a href="https://oneaibd.com/" target="_blank">
          oneaibd.com
        </a>
        <a href="https://oneaibd.com/fairusagepolicy" target="_blank">
          Fair usage policy
        </a>
        <a href="mailto:hello@oneaibd.com">Support</a>
        <span>© 2026 OneAI</span>
      </nav>
    </footer>
  );
}
