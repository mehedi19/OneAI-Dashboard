import {
  Avatar,
  Button,
  Field,
  FieldControlled,
  Icon,
  Setting,
} from "./primitives";

export function NotificationPopover({ onRead, goTo }) {
  return (
    <div className="popover notices">
      <header>
        <b>
          Notifications <em>· 3 new</em>
        </b>
        <button onClick={onRead}>Mark all as read</button>
      </header>
      <button onClick={() => goTo("spend")}>
        <i />
        <div>
          <b>Usage alert ready to review</b>
          <small>Plus plan cost was 18% above its weekly baseline.</small>
        </div>
      </button>
      <button onClick={() => goTo("models")}>
        <i />
        <div>
          <b>New Claude model is available</b>
          <small>Enable it for Pro members in Models.</small>
        </div>
      </button>
      <button>
        <i className="gray" />
        <div>
          <b>August billing report generated</b>
          <small>Download the full CSV from Spend & revenue.</small>
        </div>
      </button>
    </div>
  );
}

export function ProfileDrawer({ member, close, showToast }) {
  return (
    <aside className="profile-drawer">
      <header>
        <b>Member profile</b>
        <button onClick={close}>
          <Icon name="close" size={15} />
        </button>
      </header>
      <div className="profile-hero">
        <Avatar name={member.name} large />
        <h2>{member.name}</h2>
        <p>{member.email}</p>
      </div>
      <div className="profile-rows">
        <div>
          <span>Workspace role</span>
          <b>{member.role === "Admin" ? "Admin" : "Member"}</b>
        </div>
        <div>
          <span>Plan</span>
          <b>{member.plan}</b>
        </div>
        <div>
          <span>Last active</span>
          <b>{member.active}</b>
        </div>
        <div>
          <span>Security</span>
          <b className="green">2FA enabled</b>
        </div>
      </div>
      <Button
        className="drawer-button"
        onClick={() => showToast("Profile editor opened.")}
      >
        Edit profile
      </Button>
      <Button
        className="drawer-button"
        onClick={() => showToast("Password reset link sent.")}
      >
        Reset password
      </Button>
      <Button
        className="drawer-button danger-button"
        onClick={() => {
          close();
          showToast("Signed out of active session.");
        }}
      >
        Sign out
      </Button>
    </aside>
  );
}

export function Modal({
  type,
  close,
  copy,
  inviteEmail,
  setInviteEmail,
  inviteRole,
  setInviteRole,
  invite,
  modelDraft,
  setModelDraft,
  provider,
  setProvider,
  addModel,
  showToast,
}) {
  const isInvite = type === "invite";
  const isModel = type === "model";
  const genericSave = () => {
    close();
    showToast(
      type === "alert"
        ? "Cost alert created."
        : type === "payment"
          ? "Payment method updated."
          : type === "plan"
            ? "A plan specialist will contact you shortly."
            : `${copy[0]} saved.`,
    );
  };
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div className="modal" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <h2>
            {isInvite
              ? "Invite member"
              : isModel
                ? "Add a provider model"
                : copy[0]}
          </h2>
          <button onClick={close}>
            <Icon name="close" size={16} />
          </button>
        </header>
        <div className="modal-body">
          {isInvite ? (
            <>
              <p>
                Send a OneAI workspace invitation. You can adjust access after
                they join.
              </p>
              <FieldControlled
                label="Email address"
                value={inviteEmail}
                change={setInviteEmail}
                placeholder="name@company.com"
              />
              <label className="field">
                <span>Workspace role</span>
                <select
                  value={inviteRole}
                  onChange={(event) => setInviteRole(event.target.value)}
                >
                  <option>Member</option>
                  <option>Admin</option>
                </select>
              </label>
            </>
          ) : isModel ? (
            <>
              <p>
                Connect an approved provider model to make it available in your
                workspace.
              </p>
              <label className="field">
                <span>Provider</span>
                <select
                  value={provider}
                  onChange={(event) => setProvider(event.target.value)}
                >
                  {[
                    "OpenAI",
                    "Anthropic",
                    "Google",
                    "xAI",
                    "DeepSeek",
                    "MiniMax",
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <FieldControlled
                label="Model ID"
                value={modelDraft}
                change={setModelDraft}
                placeholder="e.g. custom-model-id"
              />
            </>
          ) : (
            <>
              <p>{copy[1]}</p>
              {type === "alert" && (
                <div className="form-grid">
                  <Field label="Daily spend threshold" value="BDT 4,000" />
                  <Field label="Notify" value="All admins" select />
                </div>
              )}
              {type === "routing" && (
                <Setting
                  label="Allow fallback across providers"
                  copy="Retry with another enabled provider when a model is unavailable."
                  on
                  flip={() => {}}
                />
              )}
              {type === "policy" && (
                <>
                  <Setting
                    label="Enable GPT for Plus"
                    copy="Allow Plus subscribers to select GPT directly."
                    on
                    flip={() => {}}
                  />
                  <Setting
                    label="Enable Claude for Pro"
                    copy="Allow Pro subscribers to select Claude directly."
                    on
                    flip={() => {}}
                  />
                </>
              )}
              {type === "payment" && (
                <>
                  <Field label="Card number" value="4242 4242 4242 4242" />
                  <div className="form-grid">
                    <Field label="Expiration date" value="09 / 29" />
                    <Field label="CVC" value="•••" />
                  </div>
                </>
              )}
              {type === "plan" && (
                <div className="plan-modal">
                  <div>
                    <span>Current monthly price</span>
                    <b>BDT 799</b>
                  </div>
                  <div>
                    <span>Premium access</span>
                    <b>Included</b>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <footer>
          <Button onClick={close}>Cancel</Button>
          <Button
            variant="primary"
            onClick={isInvite ? invite : isModel ? addModel : genericSave}
          >
            {isInvite
              ? "Send invite"
              : isModel
                ? "Add model"
                : type === "plan"
                  ? "Contact support"
                  : "Save changes"}
          </Button>
        </footer>
      </div>
    </div>
  );
}
