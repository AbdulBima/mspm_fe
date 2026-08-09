import { Drawer } from "@/components/Drawer";
import { inputCls, labelCls } from "@/lib/form-styles";
import type { CheckinFlag, Member } from "@/lib/types";
import { cancelBtnCls, saveBtnCls } from "../_lib/constants";
import { useCreateCheckin } from "../_hooks/useCreateCheckin";
import { Select } from "./Select";
import { TextArea } from "./TextArea";

interface CheckinFormProps {
  sprintId: string;
  members: Member[];
  onDone: () => void;
}

export function CheckinForm({ sprintId, members, onDone }: CheckinFormProps) {
  const {
    memberId,
    setMemberId,
    date,
    setDate,
    yesterday,
    setYesterday,
    todayPlan,
    setTodayPlan,
    blockers,
    setBlockers,
    needs,
    setNeeds,
    flag,
    setFlag,
    busy,
    submit,
  } = useCreateCheckin(sprintId, members, onDone);

  return (
    <Drawer
      title="Log Check-in"
      onClose={onDone}
      footer={
        <>
          <button onClick={onDone} className={cancelBtnCls}>
            Cancel
          </button>
          <button onClick={submit} disabled={busy || !memberId} className={saveBtnCls}>
            {busy ? "Saving…" : "Save"}
          </button>
        </>
      }
    >
      <div className="flex flex-wrap gap-3">
        <Select label="Member" value={memberId} onChange={setMemberId}>
          {members.map((m) => (
            <option key={m.member_id} value={m.member_id}>
              {m.name}
            </option>
          ))}
        </Select>
        <div>
          <span className={labelCls}>Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </div>
        <Select label="Flag" value={flag} onChange={(v) => setFlag(v as CheckinFlag)}>
          <option value="on_track">On track</option>
          <option value="at_risk">At risk</option>
          <option value="blocked">Blocked</option>
        </Select>
      </div>
      <TextArea label="Yesterday" value={yesterday} onChange={setYesterday} />
      <TextArea label="Today's plan" value={todayPlan} onChange={setTodayPlan} />
      <TextArea label="Blockers" value={blockers} onChange={setBlockers} />
      <TextArea label="Needs from PM" value={needs} onChange={setNeeds} />
    </Drawer>
  );
}
