import { Plus } from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/lib/sprint-utils";
import { thCls, triggerBtnCls } from "../_lib/constants";
import { useDecisions } from "../_hooks/useDecisions";
import { DecisionForm } from "./DecisionForm";
import { EmptyRow } from "./EmptyRow";
import { TableShell } from "./TableShell";

export function DecisionsTab({ sprintId }: { sprintId: string }) {
  const { decisions, reload } = useDecisions(sprintId);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <button onClick={() => setShowForm(true)} className={triggerBtnCls}>
        <Plus size={14} /> Log decision
      </button>
      {showForm && (
        <DecisionForm
          sprintId={sprintId}
          onDone={() => {
            setShowForm(false);
            reload();
          }}
        />
      )}

      <TableShell>
        <thead>
          <tr className="border-b border-line bg-subtle">
            <th className={thCls}>Decision</th>
            <th className={`${thCls} w-40`}>Made by</th>
            <th className={`${thCls} w-32`}>Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {decisions.map((d) => (
            <tr key={d.decision_id} className="transition-colors hover:bg-subtle">
              <td className="px-5 py-3.5 text-sm font-medium text-ink">{d.decision}</td>
              <td className="px-5 py-3.5 text-[13px] text-ink-soft">{d.made_by}</td>
              <td className="px-5 py-3.5 text-[13px] text-ink-mute">{formatDate(d.decided_on)}</td>
            </tr>
          ))}
          {decisions.length === 0 && <EmptyRow colSpan={3} message="No decisions logged yet." />}
        </tbody>
      </TableShell>
    </div>
  );
}
