import { Drawer } from "@/components/Drawer";
import { inputCls, labelCls } from "@/lib/form-styles";
import type { MeetingType } from "@/lib/types";
import { cancelBtnCls, MEETING_TYPES, saveBtnCls } from "../_lib/constants";
import { useCreateMeeting } from "../_hooks/useCreateMeeting";
import { Select } from "./Select";
import { TextArea } from "./TextArea";

export function MeetingForm({ sprintId, onDone }: { sprintId: string; onDone: () => void }) {
  const { meetingType, setMeetingType, date, setDate, notes, setNotes, actionItemsText, setActionItemsText, busy, submit } =
    useCreateMeeting(sprintId, onDone);

  return (
    <Drawer
      title="Log Meeting"
      onClose={onDone}
      footer={
        <>
          <button onClick={onDone} className={cancelBtnCls}>
            Cancel
          </button>
          <button onClick={submit} disabled={busy} className={saveBtnCls}>
            {busy ? "Saving…" : "Save"}
          </button>
        </>
      }
    >
      <div className="flex flex-wrap gap-3">
        <Select label="Type" value={meetingType} onChange={(v) => setMeetingType(v as MeetingType)}>
          {MEETING_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.replace(/_/g, " ")}
            </option>
          ))}
        </Select>
        <div>
          <span className={labelCls}>Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </div>
      </div>
      <TextArea label="Notes" value={notes} onChange={setNotes} />
      <div>
        <span className={labelCls}>Action items (one per line)</span>
        <textarea
          value={actionItemsText}
          onChange={(e) => setActionItemsText(e.target.value)}
          rows={3}
          className={inputCls}
          placeholder={"Confirm Stripe webhook owner\nFollow up on Resource Library API contract"}
        />
      </div>
    </Drawer>
  );
}
