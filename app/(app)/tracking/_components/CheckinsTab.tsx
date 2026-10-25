import { Plus } from "lucide-react";
import { useState } from "react";
import { FlagBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/sprint-utils";
import { triggerBtnCls, thCls } from "../_lib/constants";
import { useCheckins } from "../_hooks/useCheckins";
import { CheckinForm } from "./CheckinForm";
import { EmptyRow } from "./EmptyRow";
import { TableShell } from "./TableShell";

export function CheckinsTab({ sprintId }: { sprintId: string }) {
  const { checkins, members, reload } = useCheckins(sprintId);
  const [showForm, setShowForm] = useState(false);

  const memberName = (id: string) => members.find((m) => m.member_id === id)?.name ?? "Unknown";

  return (
    <div className="space-y-4">
      <button onClick={() => setShowForm(true)} className={triggerBtnCls}>
        <Plus size={14} /> Log check-in
      </button>

      {showForm && (
        <CheckinForm
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
            <th className={thCls}>Member</th>
            <th className={thCls}>Date</th>
            <th className={`${thCls} w-32`}>Flag</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {checkins.map((c) => (
            <tr key={c.checkin_id} className="transition-colors hover:bg-subtle">
              <td className="px-5 py-3.5 text-sm font-medium text-ink">{memberName(c.member_id)}</td>
              <td className="px-5 py-3.5 text-[13px] text-ink-soft">{formatDate(c.checkin_date)}</td>
              <td className="px-5 py-3.5">
                <FlagBadge flag={c.flag} />
              </td>
            </tr>
          ))}
          {checkins.length === 0 && <EmptyRow colSpan={3} message="No check-ins logged yet." />}
        </tbody>
      </TableShell>
    </div>
  );
}
