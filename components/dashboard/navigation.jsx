import { navItems, workspaceOptions } from "../../lib/dashboard-data";
import { Avatar, Button, Icon } from "./primitives";
import { NotificationPopover } from "./overlays";

/**
 * Desktop sidebar navigation and workspace selector.
 * State is held by Dashboard so page changes, overlays, and toasts stay coordinated.
 */
export function Sidebar({
  currentView,
  onNavigate,
  workspace,
  workspaceMenuOpen,
  onToggleWorkspaceMenu,
  onSelectWorkspace,
  onCreateWorkspace,
  onManagePlan,
  onOpenProfile,
  profileMember,
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img
          className="brand-logo"
          src="/assets/oneai-logo-white.png"
          alt="OneAI"
        />
        <img className="brand-icon" src="/assets/oneai-mark-white.png" alt="" />
      </div>

      <div className="workspace-wrap">
        <button className="workspace" onClick={onToggleWorkspaceMenu}>
          <span>OA</span>
          <div>
            <small>Workspace</small>
            <b>{workspace}</b>
          </div>
          <i>⌄</i>
        </button>

        {workspaceMenuOpen && (
          <div className="popover workspace-popover">
            <header>
              <b>Switch workspace</b>
              <button onClick={onCreateWorkspace}>New workspace</button>
            </header>
            {workspaceOptions.map(({ name, mark, detail }) => (
              <button key={name} onClick={() => onSelectWorkspace(name)}>
                <span>{mark}</span>
                <div>
                  <b>{name}</b>
                  <small>{detail}</small>
                </div>
                {workspace === name && <em>✓</em>}
              </button>
            ))}
          </div>
        )}
      </div>

      {["Analyze", "Manage"].map((groupName) => (
        <div className="nav-group" key={groupName}>
          <span>{groupName}</span>
          {navItems
            .filter((item) => item.group === groupName)
            .map((item) => (
              <button
                key={item.id}
                className={currentView === item.id ? "active" : ""}
                onClick={() => onNavigate(item.id)}
              >
                <Icon name={item.icon} />
                <b>{item.label}</b>
              </button>
            ))}
        </div>
      ))}

      <div className="side-bottom">
        <div className="side-plan">
          <div>
            <b>Pro plan</b>
            <span>68% used</span>
          </div>
          <i>
            <em />
          </i>
          <p>Token allowance resets in 13 days.</p>
          <button onClick={onManagePlan}>Manage plan</button>
        </div>
        <button className="side-profile" onClick={onOpenProfile}>
          <Avatar name={profileMember.name} index={1} />
          <div>
            <b>{profileMember.name}</b>
            <small>Workspace admin</small>
          </div>
          <span>•••</span>
        </button>
      </div>
    </aside>
  );
}

/** The shared top bar manages notifications, reporting dates, export, and mobile profile access. */
export function Topbar({
  currentView,
  group,
  notificationsOpen,
  onToggleNotifications,
  onReadNotifications,
  onNotificationNavigate,
  dateMenuOpen,
  onToggleDateMenu,
  onSelectPeriod,
  period,
  onExport,
  onOpenProfile,
}) {
  const currentPage = navItems.find((item) => item.id === currentView);

  return (
    <header className="topbar">
      <div className="topbar-identity">
        <img
          className="mobile-top-logo"
          src="/assets/oneai-logo-white.png"
          alt="OneAI"
        />
        <div className="crumb">
          <span>{group}</span>
          <i>/</i>
          <b>{currentPage?.label}</b>
        </div>
      </div>

      <div className="top-actions">
        <button
          className={`icon-button ${notificationsOpen ? "read" : ""}`}
          onClick={onToggleNotifications}
          aria-label="Notifications"
        >
          <Icon name="bell" size={16} />
        </button>
        {notificationsOpen && (
          <NotificationPopover
            onRead={onReadNotifications}
            goTo={onNotificationNavigate}
          />
        )}

        <div className="date-wrap">
          <button className="date-button" onClick={onToggleDateMenu}>
            <Icon name="calendar" size={15} />
            <span className="date-text">{period}</span>
            <span className="date-chevron">⌄</span>
          </button>
          {dateMenuOpen && (
            <div className="popover date-popover">
              <header>
                <b>Reporting period</b>
              </header>
              {[
                ["Aug 01 – Aug 31, 2026", "Last 31 days"],
                ["Sep 01 – Sep 17, 2026", "This month"],
                ["Jul 01 – Jul 31, 2026", "Previous month"],
              ].map(([value, label]) => (
                <button
                  className={period === value ? "selected" : ""}
                  key={value}
                  onClick={() => onSelectPeriod(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          className="topbar-export"
          onClick={onExport}
          aria-label="Export usage report"
        >
          <Icon name="download" size={14} />
          <span>Export</span>
        </Button>
        <button
          className="mobile-profile-button"
          onClick={onOpenProfile}
          aria-label="Open profile"
        >
          <Avatar name="Sofia Morgan" index={1} />
        </button>
      </div>
    </header>
  );
}

/** Six destinations remain directly reachable on compact touch screens. */
export function MobileNavigation({ currentView, onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={currentView === item.id ? "active" : ""}
          onClick={() => onNavigate(item.id)}
        >
          <Icon name={item.icon} size={17} />
          <span>{item.mobileLabel}</span>
        </button>
      ))}
    </nav>
  );
}
