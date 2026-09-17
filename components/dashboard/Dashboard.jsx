"use client";

import { useState } from "react";

import { memberSeed } from "../../lib/dashboard-data";
import { Footer } from "./primitives";
import { downloadReport } from "./downloads";
import { Modal, ProfileDrawer } from "./overlays";
import { MobileNavigation, Sidebar, Topbar } from "./navigation";
import { Overview } from "./pages/Overview";
import { Spend } from "./pages/Spend";
import { Models } from "./pages/Models";
import { Users } from "./pages/Users";
import { Invoices } from "./pages/Invoices";
import { Settings } from "./pages/Settings";

export default function Dashboard() {
  const [view, setView] = useState("overview");
  const [plan, setPlan] = useState("Plus");
  const [leaderboard, setLeaderboard] = useState("tokens");
  const [models, setModels] = useState({});
  const [members, setMembers] = useState(
    memberSeed.map(([name, email, role, planName, tokens, active]) => ({
      name,
      email,
      role,
      plan: planName,
      tokens,
      active,
    })),
  );
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [workspaceMenu, setWorkspaceMenu] = useState(false);
  const [dateMenu, setDateMenu] = useState(false);
  const [period, setPeriod] = useState("Aug 01 – Aug 31, 2026");
  const [workspace, setWorkspace] = useState("OneAI Bangladesh");
  const [profile, setProfile] = useState(null);
  const [settingPane, setSettingPane] = useState("Workspace");
  const [toggles, setToggles] = useState({
    digest: true,
    alerts: true,
    releases: false,
    invites: true,
    spaces: false,
    premium: true,
    twoFactor: true,
    redaction: true,
  });
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");
  const [modelDraft, setModelDraft] = useState("");
  const [provider, setProvider] = useState("OpenAI");
  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2700);
  };
  const goTo = (nextView) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const invite = () => {
    if (!inviteEmail.includes("@")) {
      showToast("Enter a valid email address.");
      return;
    }
    const name = inviteEmail
      .split("@")[0]
      .split(/[._-]/)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
    setMembers((list) => [
      {
        name,
        email: inviteEmail,
        role: inviteRole,
        plan: "Lite",
        tokens: "—",
        active: "Invitation sent",
        pending: true,
      },
      ...list,
    ]);
    setInviteEmail("");
    setModal(null);
    showToast(`Invitation sent to ${inviteEmail}.`);
  };
  const addModel = () => {
    const name = modelDraft.trim();
    if (!name) {
      showToast("Add a model ID first.");
      return;
    }
    const logos = {
      OpenAI: "gpt.svg",
      Anthropic: "claude.svg",
      Google: "gemini.svg",
      xAI: "grok.svg",
      DeepSeek: "deepseek.svg",
      MiniMax: "minimax.svg",
    };
    setModels((current) => ({
      ...current,
      [name]: true,
      custom: [
        ...(current.custom || []),
        {
          name,
          provider,
          type: "Custom",
          logo: logos[provider],
          description: "Custom provider model added for workspace review.",
          latency: "—",
          enabled: true,
        },
      ],
    }));
    setModelDraft("");
    setModal(null);
    showToast(`${name} was added and enabled for smart routing.`);
  };
  const modalCopy = {
    alert: [
      "Set cost alert",
      "OneAI will notify workspace admins when the selected spend threshold is reached.",
    ],
    routing: [
      "Smart routing",
      "Choose the first priority for OneAI’s model selection policy.",
    ],
    policy: [
      "Edit model access policy",
      "Role-based and plan-based access controls apply before smart routing.",
    ],
    compare: [
      "Model comparison",
      "Comparison is ready to connect to your production latency, quality, and cost benchmarks.",
    ],
    payment: [
      "Payment method",
      "Your current payment method is Visa ending in 4242.",
    ],
    plan: [
      "Manage Pro plan",
      "Your Pro plan includes maximum AI capacity, premium models, image and video tools, and priority processing.",
    ],
  };
  const renderView = () => {
    if (view === "spend") return <Spend openModal={setModal} goTo={goTo} />;
    if (view === "models")
      return (
        <Models models={models} setModels={setModels} openModal={setModal} />
      );
    if (view === "users")
      return (
        <Users
          members={members}
          setMembers={setMembers}
          openModal={setModal}
          openProfile={setProfile}
        />
      );
    if (view === "invoices") return <Invoices openModal={setModal} />;
    if (view === "settings")
      return (
        <Settings
          settingPane={settingPane}
          setSettingPane={setSettingPane}
          toggles={toggles}
          setToggles={setToggles}
          showToast={showToast}
        />
      );
    return (
      <Overview
        plan={plan}
        setPlan={setPlan}
        leaderboard={leaderboard}
        setLeaderboard={setLeaderboard}
        showToast={showToast}
        goTo={goTo}
      />
    );
  };
  const group =
    view === "overview" ||
    view === "spend" ||
    view === "models" ||
    view === "users"
      ? "Analytics"
      : "Manage";
  const handleWorkspaceSelection = (name) => {
    setWorkspace(name);
    setWorkspaceMenu(false);
    showToast(`Switched to ${name}.`);
  };

  const handlePeriodSelection = (nextPeriod) => {
    setPeriod(nextPeriod);
    setDateMenu(false);
    showToast("Reporting period updated.");
  };

  const handleNotificationToggle = () => {
    setNotifications((open) => !open);
    setDateMenu(false);
  };

  const handleDateMenuToggle = () => {
    setDateMenu((open) => !open);
    setNotifications(false);
  };

  const handleExport = () => {
    downloadReport("usage-report");
    showToast("Usage report downloaded.");
  };

  const currentMember = members[0];

  return (
    <div className="app-shell">
      <Sidebar
        currentView={view}
        onNavigate={goTo}
        workspace={workspace}
        workspaceMenuOpen={workspaceMenu}
        onToggleWorkspaceMenu={() => setWorkspaceMenu((open) => !open)}
        onSelectWorkspace={handleWorkspaceSelection}
        onCreateWorkspace={() => showToast("Create workspace flow opened.")}
        onManagePlan={() => setModal("plan")}
        onOpenProfile={() => setProfile(currentMember)}
        profileMember={currentMember}
      />

      <main>
        <Topbar
          currentView={view}
          group={group}
          notificationsOpen={notifications}
          onToggleNotifications={handleNotificationToggle}
          onReadNotifications={() => {
            setNotifications(false);
            showToast("All notifications marked as read.");
          }}
          onNotificationNavigate={goTo}
          dateMenuOpen={dateMenu}
          onToggleDateMenu={handleDateMenuToggle}
          onSelectPeriod={handlePeriodSelection}
          period={period}
          onExport={handleExport}
          onOpenProfile={() => setProfile(currentMember)}
        />
        <div className="content">
          {renderView()}
          <Footer />
        </div>
      </main>

      <MobileNavigation currentView={view} onNavigate={goTo} />
      {toast && <div className="toast">{toast}</div>}
      {profile && (
        <ProfileDrawer
          member={profile}
          close={() => setProfile(null)}
          showToast={showToast}
        />
      )}
      {modal && (
        <Modal
          type={modal}
          close={() => setModal(null)}
          copy={modalCopy[modal]}
          inviteEmail={inviteEmail}
          setInviteEmail={setInviteEmail}
          inviteRole={inviteRole}
          setInviteRole={setInviteRole}
          invite={invite}
          modelDraft={modelDraft}
          setModelDraft={setModelDraft}
          provider={provider}
          setProvider={setProvider}
          addModel={addModel}
          showToast={showToast}
        />
      )}
    </div>
  );
}
