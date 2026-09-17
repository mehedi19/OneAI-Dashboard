export function downloadReport(kind) {
  const content =
    kind === "members"
      ? "Name,Email,Role,Plan\nSofia Morgan,sofia@oneaibd.com,Admin,Pro\nAmara Lewis,amara@fable.studio,Member,Plus\nTheo Park,theo@northstar.ai,Member,Plus"
      : "Plan,Active users,Revenue,Tokens,Model cost,Margin\nFree,5841,0,1.44B,18420,–\nLite,1284,127116,2.02B,38610,64.0%\nPlus,550,164450,4.32B,57800,61.4%\nPro,86,68714,0.84B,11670,87.2%";
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `oneai-${kind}-aug-2026.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadInvoice(id) {
  const blob = new Blob(
    [
      `ONEAI\nInvoice: ${id}\nAmount paid: BDT 799\nStatus: Paid\nThank you for building with OneAI.`,
    ],
    { type: "text/plain" },
  );
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${id}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}
