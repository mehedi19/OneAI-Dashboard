import { useMemo, useState } from "react";

import { Avatar, Button, Card, Icon, PageHeader } from "../primitives";
import { Metric } from "../sections";
import { downloadReport } from "../downloads";

export function Users({ members, setMembers, openModal, openProfile }) {
  const [query, setQuery] = useState("");
  const [plan, setPlan] = useState("All");
  const [role, setRole] = useState("All");
  const filtered = useMemo(
    () =>
      members.filter(
        (member) =>
          (plan === "All" || member.plan === plan) &&
          (role === "All" || member.role === role) &&
          `${member.name} ${member.email}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [members, plan, role, query],
  );
  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage members, roles, and plan access for your OneAI workspace."
        actions={
          <>
            <Button onClick={() => downloadReport("members")}>
              <Icon name="download" size={14} />
              Export users
            </Button>
            <Button variant="primary" onClick={() => openModal("invite")}>
              <Icon name="plus" size={14} />
              Invite member
            </Button>
          </>
        }
      />
      <div className="metric-grid">
        <Metric
          label="Workspace members"
          value="7,761"
          note="+326 in the last 30 days"
        />
        <Metric
          label="Active this period"
          value="5,482"
          note="70.6% of all members"
        />
        <Metric
          label="Workspace admins"
          value="4"
          note="All have SSO enforced"
        />
        <Metric
          label="Pending invitations"
          value="12"
          note="3 expire this week"
        />
      </div>
      <Card className="users-table">
        <div className="toolbar">
          <label className="search">
            <Icon name="search" size={14} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or email"
            />
          </label>
          <select
            value={plan}
            onChange={(event) => setPlan(event.target.value)}
          >
            <option value="All">All plans</option>
            <option>Free</option>
            <option>Lite</option>
            <option>Plus</option>
            <option>Pro</option>
          </select>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="All">All roles</option>
            <option>Admin</option>
            <option>Member</option>
          </select>
          <span>{filtered.length} members shown</span>
        </div>
        <div className="table-scroll">
          <table className="model-table user-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Plan</th>
                <th className="right">Avg. tokens</th>
                <th className="right">Last active</th>
                <th className="right">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.length ? (
                filtered.map((member, i) => (
                  <tr key={member.email}>
                    <td>
                      <div className="member">
                        <Avatar name={member.name} index={i} />
                        <div>
                          <b>{member.name}</b>
                          <small>{member.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`role ${member.role === "Admin" ? "admin" : ""}`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td>{member.plan}</td>
                    <td className="right">{member.tokens}</td>
                    <td className="right">{member.active}</td>
                    <td className="right">
                      <span
                        className={`status ${member.pending ? "pending" : ""}`}
                      >
                        <i />
                        {member.pending ? "Invited" : "Active"}
                      </span>
                    </td>
                    <td className="right">
                      <button
                        className="table-link"
                        onClick={() => openProfile(member)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="empty" colSpan="7">
                    No members match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
