import { Plus } from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/lib/sprint-utils";
import { thCls, triggerBtnCls } from "../_lib/constants";
import { useMeetings } from "../_hooks/useMeetings";
import { EmptyRow } from "./EmptyRow";
import { MeetingForm } from "./MeetingForm";
import { TableShell } from "./TableShell";

export function MeetingsTab({ sprintId }: { sprintId: string }) {
  const { meetings, reload } = useMeetings(sprintId);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <button onClick={() => setShowForm(true)} className={triggerBtnCls}>
        <Plus size={14} /> Log meeting
      </button>
      {showForm && (
        <MeetingForm
          sprintId={sprintId}
          onDone={() => {
            setShowForm(false);
            reload();
          }}
        />
      )}

      <TableShell>
        <thead>
          <tr className="border-b border-[#E7E5E2] bg-[#F3F2EF]">
            <th className={thCls}>Type</th>
            <th className={`${thCls} w-32`}>Date</th>
            <th className={`${thCls} w-36 text-right`}>Action items</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EEEDEB]">
          {meetings.map((m) => {
            const done = m.action_items.filter((ai) => ai.done).length;
            return (
              <tr key={m.meeting_id} className="transition-colors hover:bg-[#FAFAF9]">
                <td className="px-5 py-3.5 text-sm font-medium capitalize text-[#0B0C0F]">{m.meeting_type.replace(/_/g, " ")}</td>
                <td className="px-5 py-3.5 text-[13px] text-[#54525C]">{formatDate(m.meeting_date)}</td>
                <td className="px-5 py-3.5 text-right text-[13px] tabular-nums text-[#54525C]">
                  {m.action_items.length === 0 ? (
                    <span className="text-[#B4B2AC]">None</span>
                  ) : (
                    <>
                      <span className={done === m.action_items.length ? "font-medium text-[#16794D]" : "font-medium text-[#0B0C0F]"}>{done}</span>
                      /{m.action_items.length} done
                    </>
                  )}
                </td>
              </tr>
            );
          })}
          {meetings.length === 0 && <EmptyRow colSpan={3} message="No meetings logged yet." />}
        </tbody>
      </TableShell>
    </div>
  );
}
