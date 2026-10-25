"use client";

import { localISODate } from "@/lib/dates";
import { useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Sprint } from "@/lib/types";
import { splitLines } from "../_lib/text";

type SprintFormConfig = { mode: "create" } | { mode: "edit"; sprint: Sprint };

/** Editing only touches success measures, critical path and out-of-scope; name, dates and theme are create-only. */
export function useSprintForm(config: SprintFormConfig, onDone: () => void) {
  const isEdit = config.mode === "edit";
  const existing = isEdit ? config.sprint : undefined;

  const [name, setName] = useState(existing?.name ?? "");
  const [theme, setTheme] = useState(existing?.theme ?? "");
  const [startDate, setStartDate] = useState(existing?.start_date?.slice(0, 10) ?? localISODate());
  const [workingDays, setWorkingDays] = useState(existing?.working_days ?? 10);
  const [successMeasures, setSuccessMeasures] = useState(existing?.success_measures.join("\n") ?? "");
  const [criticalPath, setCriticalPath] = useState(existing?.critical_path.join("\n") ?? "");
  const [outOfScope, setOutOfScope] = useState(existing?.out_of_scope.join("\n") ?? "");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (busy) return;
    setBusy(true);
    try {
      if (isEdit && existing) {
        await api.sprints.update(existing.sprint_id, {
          success_measures: splitLines(successMeasures),
          critical_path: splitLines(criticalPath),
          out_of_scope: splitLines(outOfScope),
        });
      } else {
        const createPayload: Parameters<typeof api.sprints.create>[0] = {
          name: name.trim(),
          theme: theme.trim() || undefined,
          start_date: startDate,
          working_days: workingDays,
          success_measures: splitLines(successMeasures),
          critical_path: splitLines(criticalPath),
          out_of_scope: splitLines(outOfScope),
        };
        await api.sprints.create(createPayload);
      }
      notify.success(isEdit ? "Sprint updated." : `${name.trim()} created.`);
      onDone();
    } catch (err) {
      notify.error(err, "Couldn't save the sprint.");
    } finally {
      setBusy(false);
    }
  }

  return {
    isEdit,
    existing,
    name,
    setName,
    theme,
    setTheme,
    startDate,
    setStartDate,
    workingDays,
    setWorkingDays,
    successMeasures,
    setSuccessMeasures,
    criticalPath,
    setCriticalPath,
    outOfScope,
    setOutOfScope,
    busy,
    submit,
  };
}
