import { Drawer } from "@/components/Drawer";
import { inputCls, labelCls } from "@/lib/form-styles";
import type { Member, RiskKind, RiskSeverity } from "@/lib/types";
import { cancelBtnCls, saveBtnCls } from "../_lib/constants";
import { useCreateRisk } from "../_hooks/useCreateRisk";
import { Select } from "./Select";
import { TextArea } from "./TextArea";

interface RiskFormProps {
  sprintId: string;
  members: Member[];
  onDone: () => void;
}

export function RiskForm({ sprintId, members, onDone }: RiskFormProps) {
  const { title, setTitle, description, setDescription, kind, setKind, severity, setSeverity, ownerId, setOwnerId, busy, submit } =
    useCreateRisk(sprintId, onDone);

  return (
    <Drawer
      eyebrow="Tracking"
      title="Log risk or blocker"
      onClose={onDone}
      footer={
        <>
          <button onClick={onDone} className={cancelBtnCls}>
            Cancel
          </button>
          <button onClick={submit} disabled={busy || !title.trim()} className={saveBtnCls}>
            {busy ? "Saving…" : "Save"}
          </button>
        </>
      }
    >
      <div>
        <span className={labelCls}>Title *</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputCls} />
      </div>
      <TextArea label="Description" value={description} onChange={setDescription} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Select label="Kind" value={kind} onChange={(v) => setKind(v as RiskKind)}>
          <option value="risk">Risk</option>
          <option value="blocker">Blocker</option>
        </Select>
        <Select label="Severity" value={severity} onChange={(v) => setSeverity(v as RiskSeverity)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </Select>
        <Select label="Owner" value={ownerId} onChange={setOwnerId}>
          <option value="">Unassigned</option>
          {members.map((m) => (
            <option key={m.member_id} value={m.member_id}>
              {m.name}
            </option>
          ))}
        </Select>
      </div>
    </Drawer>
  );
}
