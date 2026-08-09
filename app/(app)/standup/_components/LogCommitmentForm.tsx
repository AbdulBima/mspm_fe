"use client";

import { useState } from "react";
import { inputClsRounded, labelCls } from "@/lib/form-styles";
import type { AccountabilityEntry, Member, Task } from "@/lib/types";
import { CommitmentFields } from "./CommitmentFields";
import { CustomSelect } from "./CustomSelect";

interface LogCommitmentFormProps {
  sprintId: string;
  members: Member[];
  tasks: Task[];
  entries: AccountabilityEntry[];
  onDone: () => void;
}

export function LogCommitmentForm({ sprintId, members, tasks, entries, onDone }: LogCommitmentFormProps) {
  const [memberId, setMemberId] = useState(members[0]?.member_id ?? "");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className={labelCls}>Team member</span>
          <CustomSelect
            value={memberId}
            onChange={setMemberId}
            variant="field"
            options={members.map((m) => ({ value: m.member_id, label: m.name, color: m.color_tag }))}
          />
        </div>
        <div>
          <span className={labelCls}>Standup date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClsRounded} />
        </div>
      </div>

      {/* Remounts fresh whenever member or date changes — initial state picks
          up any existing commitment for that day with no effect needed to
          resync local state after the fact. */}
      <CommitmentFields
        key={`${memberId}::${date}`}
        sprintId={sprintId}
        memberId={memberId}
        date={date}
        tasks={tasks}
        entries={entries}
        onDone={onDone}
      />
    </div>
  );
}
