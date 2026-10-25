"use client";

import { localISODate } from "@/lib/dates";
import { notify } from "@/lib/notify";
import { useState } from "react";
import { api } from "@/lib/api";
import type { Report, ReportType } from "@/lib/types";

/** Owns the report-generation form's fields and submit flow. `onGenerated` lets the page decide what to do with the fresh report (show it, refresh the list). */
export function useGenerateReport(sprintId: string | undefined, onGenerated: (report: Report) => void) {
  const [reportType, setReportType] = useState<ReportType>("daily");
  const [periodStart, setPeriodStart] = useState(localISODate());
  const [periodEnd, setPeriodEnd] = useState("");
  const [notes, setNotes] = useState("");
  const [includeAi, setIncludeAi] = useState(true);
  const [generating, setGenerating] = useState(false);

  async function generate() {
    if (!sprintId) return;
    setGenerating(true);
    try {
      const report = await api.reports.generate({
        sprint_id: sprintId,
        report_type: reportType,
        period_start: reportType !== "sprint" ? periodStart : undefined,
        period_end: reportType === "weekly" && periodEnd ? periodEnd : undefined,
        include_ai_narrative: includeAi,
        notes: notes || undefined,
      });
      onGenerated(report);
      setNotes("");
    } catch (err) {
      notify.error(err);
    } finally {
      setGenerating(false);
    }
  }

  return {
    reportType,
    setReportType,
    periodStart,
    setPeriodStart,
    periodEnd,
    setPeriodEnd,
    notes,
    setNotes,
    includeAi,
    setIncludeAi,
    generating,
    generate,
  };
}
