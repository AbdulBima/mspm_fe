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
          <tr className="border-b border-[#E7E5E2] bg-[#F3F2EF]">
            <th className={thCls}>Title</th>
            <th className={`${thCls} w-24`}>Kind</th>
            <th className={`${thCls} w-28`}>Severity</th>
            <th className={`${thCls} w-36`}>Owner</th>
            <th className={`${thCls} w-20 text-center`}>Age</th>
            <th className={`${thCls} w-36`}>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EEEDEB]">
          {risks.map((r) => (
            <tr key={r.risk_id} className="transition-colors hover:bg-[#FAFAF9]">
              <td className="px-5 py-3.5 text-sm font-medium text-[#0B0C0F]">{r.title}</td>
              <td className="px-5 py-3.5 text-[13px] capitalize text-[#54525C]">{r.kind}</td>
              <td className="px-5 py-3.5">
                <SeverityBadge severity={r.severity} />
              </td>
              <td className="px-5 py-3.5 text-[13px] text-[#54525C]">{memberName(r.owner_member_id)}</td>
              <td className="px-5 py-3.5 text-center text-[13px] tabular-nums text-[#84828C]">
                {r.status === "open" && r.days_open != null ? `${r.days_open}d` : "—"}
              </td>
              <td className="px-5 py-3.5">
                <select
                  value={r.status}
                  onChange={(e) => setStatus(r.risk_id, e.target.value as Risk["status"])}
                  className="rounded-lg border border-transparent bg-transparent py-1 pl-0 pr-1.5 text-[13px] font-medium text-[#54525C] outline-none transition-colors hover:border-[#E7E5E2] focus:border-[#1D2B64] focus:ring-2 focus:ring-[#1D2B64]/10"
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
