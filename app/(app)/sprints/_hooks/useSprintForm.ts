"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Sprint } from "@/lib/types";
import { splitLines } from "../_lib/text";

type SprintFormConfig = { mode: "create" } | { mode: "edit"; sprint: Sprint };

/**
 * Owns every field for both the create and edit forms. Editing a sprint
 * only ever updates success_measures/critical_path/out_of_scope — name,
 * dates, and theme are create-only, per the original's isEdit branch in
 * the submit payload. Preserved exactly; not something to "fix" without
 * knowing whether that's an intentional immutability rule.
 */
export function useSprintForm(config: SprintFormConfig, onDone: () => void) {
  const isEdit = config.mode === "edit";
  const existing = isEdit ? config.sprint : undefined;

  const [name, setName] = useState(existing?.name ?? "");
  const [theme, setTheme] = useState(existing?.theme ?? "");
  const [startDate, setStartDate] = useState(existing?.start_date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10));
  const [workingDays, setWorkingDays] = useState(existing?.working_days ?? 10);
  const [successMeasures, setSuccessMeasures] = useState(existing?.success_measures.join("\n") ?? "");
  const [criticalPath, setCriticalPath] = useState(existing?.critical_path.join("\n") ?? "");
  const [outOfScope, setOutOfScope] = useState(existing?.out_of_scope.join("\n") ?? "");
  const [busy, setBusy] = useState(false);

  async function submit() {
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
          name,
          theme: theme || undefined,
          start_date: startDate,
          working_days: workingDays,
          success_measures: splitLines(successMeasures),
          critical_path: splitLines(criticalPath),
          out_of_scope: splitLines(outOfScope),
        };
        await api.sprints.create(createPayload);
      }
      onDone();
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
