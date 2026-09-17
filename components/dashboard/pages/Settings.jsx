import {
  Button,
  Card,
  Field,
  PageHeader,
  Setting,
  SettingsBlock,
} from "../primitives";
import { downloadReport } from "../downloads";

export function Settings({
  settingPane,
  setSettingPane,
  toggles,
  setToggles,
  showToast,
}) {
  const flip = (key) =>
    setToggles((state) => ({ ...state, [key]: !state[key] }));
  const panes = [
    "Workspace",
    "Access & roles",
    "Usage controls",
    "Security",
    "Developer",
  ];
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Control your OneAI workspace, safety preferences, and access policies."
        actions={
          <Button
            variant="primary"
            onClick={() => showToast("Workspace settings saved.")}
          >
            Save changes
          </Button>
        }
      />
      <div className="settings-layout">
        <Card className="settings-nav">
          {panes.map((pane) => (
            <button
              key={pane}
              className={settingPane === pane ? "active" : ""}
              onClick={() => setSettingPane(pane)}
            >
              {pane}
            </button>
          ))}
        </Card>
        <div className="settings-content">
          {settingPane === "Workspace" && (
            <>
              <SettingsBlock
                title="Workspace details"
                copy="This is how your workspace appears to members and on exports."
              >
                <div className="form-grid">
                  <Field label="Workspace name" value="OneAI Bangladesh" />
                  <Field
                    label="Default currency"
                    value="BDT — Bangladeshi Taka"
                    select
                  />
                  <Field
                    label="Workspace URL"
                    value="oneaibd.com/workspace/oneai-bd"
                    full
                  />
                </div>
              </SettingsBlock>
              <SettingsBlock
                title="Product notifications"
                copy="Choose which workspace updates admins should receive."
              >
                <Setting
                  label="Weekly usage digest"
                  copy="Summary of spend, tokens, and plan activity each Monday."
                  on={toggles.digest}
                  flip={() => flip("digest")}
                />
                <Setting
                  label="Cost anomaly alerts"
                  copy="Get alerted when daily spend is 25% higher than expected."
                  on={toggles.alerts}
                  flip={() => flip("alerts")}
                />
                <Setting
                  label="Model release updates"
                  copy="Be first to know when a new provider model is available."
                  on={toggles.releases}
                  flip={() => flip("releases")}
                />
              </SettingsBlock>
            </>
          )}
          {settingPane === "Access & roles" && (
            <>
              <SettingsBlock
                title="Access & roles"
                copy="Admins can manage billing, members, policies, and API keys. Members can use approved models."
              >
                <Setting
                  label="Require admin approval for invites"
                  copy="Only workspace admins can approve new members."
                  on={toggles.invites}
                  flip={() => flip("invites")}
                />
                <Setting
                  label="Allow members to create shared spaces"
                  copy="Members can create collaboration spaces in this workspace."
                  on={toggles.spaces}
                  flip={() => flip("spaces")}
                />
              </SettingsBlock>
              <SettingsBlock
                title="Single sign-on"
                copy="SSO is enforced for workspace administrators."
              >
                <Button onClick={() => showToast("SSO configuration opened.")}>
                  Manage SSO
                </Button>
              </SettingsBlock>
            </>
          )}
          {settingPane === "Usage controls" && (
            <SettingsBlock
              title="Usage controls"
              copy="Set default guardrails to keep multi-model usage predictable."
            >
              <div className="form-grid">
                <Field
                  label="Default monthly member token limit"
                  value="20,000,000"
                />
                <Field label="Cost alert threshold" value="BDT 4,000 / day" />
              </div>
              <Setting
                label="Restrict premium models after limit"
                copy="Reroute to the best lower-cost enabled model."
                on={toggles.premium}
                flip={() => flip("premium")}
              />
            </SettingsBlock>
          )}
          {settingPane === "Security" && (
            <>
              <SettingsBlock
                title="Security"
                copy="Protect workspace data and account access."
              >
                <Setting
                  label="Two-factor authentication for admins"
                  copy="All four workspace administrators are protected."
                  on={toggles.twoFactor}
                  flip={() => flip("twoFactor")}
                />
                <Setting
                  label="Redact sensitive information in logs"
                  copy="Hide common personally identifiable information in request logs."
                  on={toggles.redaction}
                  flip={() => flip("redaction")}
                />
              </SettingsBlock>
              <SettingsBlock
                title="Danger zone"
                copy="Export all workspace data or permanently delete this workspace."
                danger
              >
                <Button onClick={() => downloadReport("workspace-data")}>
                  Export workspace data
                </Button>{" "}
                <Button
                  onClick={() =>
                    showToast(
                      "For safety, deletion must be confirmed by support.",
                    )
                  }
                >
                  Delete workspace
                </Button>
              </SettingsBlock>
            </>
          )}
          {settingPane === "Developer" && (
            <SettingsBlock
              title="Developer settings"
              copy="Secure API access for your OneAI workspace."
            >
              <Setting
                label="Server API key"
                copy="Last used 19 minutes ago · begins with oneai_sk_…9X3C"
                action={
                  <Button
                    onClick={() => showToast("API key copied to clipboard.")}
                  >
                    Copy key
                  </Button>
                }
              />
              <Setting
                label="Webhook endpoint"
                copy="Receive usage and billing events in your application."
                action={
                  <Button onClick={() => showToast("Webhook setup opened.")}>
                    Configure
                  </Button>
                }
              />
            </SettingsBlock>
          )}
        </div>
      </div>
    </>
  );
}
