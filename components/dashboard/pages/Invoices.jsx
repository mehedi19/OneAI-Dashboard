import { Button, Card, CardHeading, PageHeader } from "../primitives";
import { downloadInvoice } from "../downloads";

export function Invoices({ openModal }) {
  const invoices = [
    "INV-2026-0831",
    "INV-2026-0731",
    "INV-2026-0630",
    "INV-2026-0531",
    "INV-2026-0430",
  ];
  return (
    <>
      <PageHeader
        title="Invoices"
        subtitle="Subscription invoices, payment method, and upcoming OneAI billing details."
        actions={
          <>
            <Button onClick={() => openModal("payment")}>
              Update payment method
            </Button>
            <Button variant="primary" onClick={() => openModal("plan")}>
              Manage plan
            </Button>
          </>
        }
      />
      <div className="invoice-layout">
        <Card>
          <CardHeading
            title="Billing history"
            copy="All amounts are in BDT and reflect the active OneAI launch offer where applicable."
            action={<Button>2026⌄</Button>}
          />
          <div className="model-table-wrap">
            <table className="model-table invoices">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Issued</th>
                  <th className="right">Amount</th>
                  <th className="right">Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {invoices.map((id, i) => (
                  <tr key={id}>
                    <td>
                      <b>{id}</b>
                      <small>Pro plan · monthly</small>
                    </td>
                    <td>
                      {
                        [
                          "Sep 01, 2026",
                          "Aug 01, 2026",
                          "Jul 01, 2026",
                          "Jun 01, 2026",
                          "May 01, 2026",
                        ][i]
                      }
                    </td>
                    <td className="right">BDT 799</td>
                    <td className="right">
                      <span className="paid">Paid</span>
                    </td>
                    <td className="right">
                      <button
                        className="table-link"
                        onClick={() => downloadInvoice(id)}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="invoice-aside">
          <span className="eyebrow">Next invoice</span>
          <h2>BDT 799</h2>
          <p>Estimated to be issued on Oct 01, 2026</p>
          <div>
            <span>Pro plan</span>
            <b>BDT 799</b>
          </div>
          <div>
            <span>Premium AI & media access</span>
            <b>Included</b>
          </div>
          <div>
            <span>Extra usage</span>
            <b>BDT 0</b>
          </div>
          <div>
            <span>Estimated total</span>
            <b>BDT 799</b>
          </div>
          <section>
            <b>VISA</b>
            <span>
              <strong>Visa ending in 4242</strong>
              <small>Expires 09/29</small>
            </span>
          </section>
          <Button onClick={() => openModal("payment")} className="full">
            Change payment method
          </Button>
        </Card>
      </div>
    </>
  );
}
