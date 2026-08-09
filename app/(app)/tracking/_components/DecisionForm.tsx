import { Drawer } from "@/components/Drawer";
import { inputCls, labelCls } from "@/lib/form-styles";
import { cancelBtnCls, saveBtnCls } from "../_lib/constants";
import { useCreateDecision } from "../_hooks/useCreateDecision";
import { TextArea } from "./TextArea";

export function DecisionForm({ sprintId, onDone }: { sprintId: string; onDone: () => void }) {
  const { decision, setDecision, context, setContext, busy, submit } = useCreateDecision(sprintId, onDone);

  return (
    <Drawer
      title="Log Decision"
      onClose={onDone}
      footer={
        <>
          <button onClick={onDone} className={cancelBtnCls}>
            Cancel
          </button>
          <button onClick={submit} disabled={busy || !decision.trim()} className={saveBtnCls}>
            {busy ? "Saving…" : "Save"}
          </button>
        </>
      }
    >
      <div>
        <span className={labelCls}>Decision *</span>
        <input value={decision} onChange={(e) => setDecision(e.target.value)} required className={inputCls} />
      </div>
      <TextArea label="Context" value={context} onChange={setContext} />
    </Drawer>
  );
}
