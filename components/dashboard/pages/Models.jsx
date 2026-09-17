import { modelCatalog } from "../../../lib/dashboard-data";
import { Button, Card, CardHeading, Icon, PageHeader } from "../primitives";
import { CreativeAccess, PolicyRow } from "../sections";

export function Models({ models, setModels, openModal }) {
  const toggle = (name) =>
    setModels((current) => {
      const configured = modelCatalog
        .concat(current.custom || [])
        .find((model) => model.name === name);
      const isEnabled = current[name] ?? configured?.enabled ?? false;
      return { ...current, [name]: !isEnabled };
    });
  return (
    <>
      <PageHeader
        title="Models"
        subtitle="Configure the multi-model workspace your team can use and route through OneAI."
        actions={
          <>
            <Button onClick={() => openModal("compare")}>Compare models</Button>
            <Button variant="primary" onClick={() => openModal("model")}>
              <Icon name="plus" size={14} />
              Add model
            </Button>
          </>
        }
      />
      <Card className="routing-card">
        <span className="route-icon">⌘</span>
        <div>
          <b>Smart routing is active</b>
          <small>
            OneAI sends requests to the best enabled model based on task,
            latency, and workspace policy.
          </small>
        </div>
        <div className="route-path">
          <span>Task classifier</span>→<span>Best enabled model</span>→
          <span>Fallback</span>
        </div>
        <Button onClick={() => openModal("routing")}>Configure</Button>
      </Card>
      <div className="model-catalog">
        {modelCatalog.concat(models.custom || []).map((model) => {
          const isOn = models[model.name] ?? model.enabled;
          return (
            <Card
              key={model.name}
              className={`model-card ${isOn ? "" : "disabled"}`}
            >
              <div className="model-card-top">
                <span className="model-badge large">
                  <img src={`/assets/models/${model.logo}`} alt="" />
                </span>
                <button
                  className={`switch ${isOn ? "on" : ""}`}
                  onClick={() => toggle(model.name)}
                  aria-label={`Toggle ${model.name}`}
                  aria-pressed={isOn}
                />
              </div>
              <h3>{model.name}</h3>
              <p>{model.description}</p>
              <footer>
                <span>
                  {model.provider} · {model.type}
                </span>
                <small>
                  p50 <b>{model.latency}</b>
                </small>
              </footer>
            </Card>
          );
        })}
      </div>
      <Card className="policy-card">
        <CardHeading
          title="Model access policy"
          copy="Decide which models are available to each customer subscription plan."
          action={
            <Button onClick={() => openModal("policy")}>Edit policy</Button>
          }
        />
        <div className="model-table-wrap">
          <table className="model-table policy">
            <thead>
              <tr>
                <th>Model</th>
                <th className="right">Free</th>
                <th className="right">Lite</th>
                <th className="right">Plus</th>
                <th className="right">Pro</th>
                <th className="right">Fallback</th>
              </tr>
            </thead>
            <tbody>
              <PolicyRow
                name="GPT"
                cells={["—", "Enabled", "Enabled", "Enabled", "DeepSeek"]}
              />
              <PolicyRow
                name="Claude"
                cells={["—", "—", "—", "Enabled", "Gemini"]}
              />
              <PolicyRow
                name="Gemini"
                cells={["Enabled", "Enabled", "Enabled", "Enabled", "Grok"]}
              />
              <PolicyRow
                name="Grok"
                cells={["Enabled", "Enabled", "Enabled", "Enabled", "Gemini"]}
              />
              <PolicyRow
                name="DeepSeek"
                cells={["Enabled", "Enabled", "Enabled", "Enabled", "—"]}
              />
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="creative-card">
        <CardHeading
          title="Creative model access"
          copy="Media models currently surfaced through OneAI’s premium plan controls."
          action={<span className="role admin">Pro feature</span>}
        />
        <div className="creative-grid">
          <CreativeAccess
            logo="grok.svg"
            title="Image generation"
            copy="Grok, GPT, and Nano Banana Lite for premium image workflows."
            plan="Available on Pro"
          />
          <CreativeAccess
            logo="veo.svg"
            title="Video generation"
            copy="Grok, MiniMax, and Veo for video creation and iteration."
            plan="Available on Pro"
          />
          <CreativeAccess
            logo="minimax.svg"
            title="Productivity tools"
            copy="OneCode, AI Agent, DOC/PDF, and presentation experiences."
            plan="Lite, Plus & Pro"
          />
        </div>
      </Card>
    </>
  );
}
