"use client";

import { useState } from "react";
import { PageLoader } from "@/components/PageLoader";
import { useSprint } from "@/lib/sprint-context";
import type { Report } from "@/lib/types";

import { GenerateReportPanel } from "./_components/GenerateReportPanel";
import { NoActiveSprintState } from "./_components/NoActiveSprintState";
import { ReportsEmptyState } from "./_components/ReportsEmptyState";
import { ReportsHeader } from "./_components/ReportsHeader";
import { ReportsListPanel } from "./_components/ReportsListPanel";
import { ReportView } from "./_components/ReportView";

import { useGenerateReport } from "./_hooks/useGenerateReport";
import { useReportsList } from "./_hooks/useReportsList";

export default function ReportsPage() {
  const { sprint, loading: sprintLoading } = useSprint();
  const [selected, setSelected] = useState<Report | null>(null);
  const { reports, refresh } = useReportsList(sprint?.sprint_id);
  const form = useGenerateReport(sprint?.sprint_id, (report) => {
    setSelected(report);
    refresh();
  });

  if (sprintLoading) {
    return (
      <PageLoader label="Loading" />
    );
  }

  if (!sprint) {
    return <NoActiveSprintState />;
  }

  return (
    <div className="space-y-6">
      <ReportsHeader />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <GenerateReportPanel {...form} />

        <div className="lg:col-span-2">
          {selected ? (
            <ReportView report={selected} onClose={() => setSelected(null)} />
          ) : reports.length === 0 ? (
            <ReportsEmptyState />
          ) : (
            <ReportsListPanel reports={reports} onSelect={setSelected} />
          )}
        </div>
      </div>
    </div>
  );
}
