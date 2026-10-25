import { Plus } from "lucide-react";
import { useState } from "react";
import { SeverityBadge } from "@/components/StatusBadge";
import type { Risk } from "@/lib/types";
import { thCls, triggerBtnCls } from "../_lib/constants";
import { useRisks } from "../_hooks/useRisks";
import { EmptyRow } from "./EmptyRow";
import { RiskForm } from "./RiskForm";
import { TableShell } from "./TableShell";

export function RisksTab({ sprintId }: { sprintId: string }) {
  const { risks, members, reload, setStatus } = useRisks(sprintId);
  const [showForm, setShowForm] = useState(false);

  const memberName = (id?: string | null) => members.find((m) => m.member_id === id)?.name ?? "Unassigned";

  return (
    <div className="space-y-4">
      <button onClick={() => setShowForm(true)} className={triggerBtnCls}>
        <Plus size={14} /> Log risk / blocker
      </button>

      {showForm && (
        <RiskForm
          sprintId={sprintId}
          members={members}
          onDone={() => {
            setShowForm(false);
            reload();
          }}
        />
      )}

      <TableShell>
        <thead>
          <tr className="border-b border-line bg-subtle">
            <th className={thCls}>Title</th>
            <th className={`${thCls} w-24`}>Kind</th>
            <th className={`${thCls} w-28`}>Severity</th>
            <th className={`${thCls} w-36`}>Owner</th>
            <th className={`${thCls} w-20 text-center`}>Age</th>
            <th className={`${thCls} w-36`}>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {risks.map((r) => (
            <tr key={r.risk_id} className="transition-colors hover:bg-subtle">
              <td className="px-5 py-3.5 text-sm font-medium text-ink">{r.title}</td>
              <td className="px-5 py-3.5 text-[13px] capitalize text-ink-soft">{r.kind}</td>
              <td className="px-5 py-3.5">
                <SeverityBadge severity={r.severity} />
              </td>
              <td className="px-5 py-3.5 text-[13px] text-ink-soft">{memberName(r.owner_member_id)}</td>
              <td className="px-5 py-3.5 text-center text-[13px] tabular-nums text-ink-mute">
                {r.status === "open" && r.days_open != null ? `${r.days_open}d` : "—"}
              </td>
              <td className="px-5 py-3.5">
                <select
                  value={r.status}
                  onChange={(e) => setStatus(r.risk_id, e.target.value as Risk["status"])}
                  className="rounded-lg border border-transparent bg-transparent py-1 pl-0 pr-1.5 text-[13px] font-medium text-ink-soft outline-none transition-colors hover:border-line-strong focus:border-accent focus:ring-4 focus:ring-accent/10"
                >
                  <option value="open">Open</option>
                  <option value="mitigated">Mitigated</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
          {risks.length === 0 && <EmptyRow colSpan={6} message="No risks or blockers logged yet." />}
        </tbody>
      </TableShell>
    </div>
  );
}
