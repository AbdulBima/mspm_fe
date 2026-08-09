"use client";

import { useState } from "react";
import { HandoverPanel } from "@/components/HandoverPanel";
import { useSprint } from "@/lib/sprint-context";
import type { Sprint } from "@/lib/types";

import { SprintDrawer } from "./_components/SprintDrawer";
import { SprintsEmptyState } from "./_components/SprintsEmptyState";
import { SprintsHeader } from "./_components/SprintsHeader";
import { SprintsList } from "./_components/SprintsList";

import { useSprintActions } from "./_hooks/useSprintActions";

export default function SprintsPage() {
  const { sprints, sprint, refresh, selectSprint } = useSprint();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Sprint | null>(null);
  const [handoverFor, setHandoverFor] = useState<Sprint | null>(null);
  const { setStatus, remove } = useSprintActions(refresh);

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4 md:p-6">
      <SprintsHeader onNewSprint={() => setShowForm(true)} />

      {showForm && (
        <SprintDrawer
          mode="create"
          onClose={() => setShowForm(false)}
          onDone={() => {
            setShowForm(false);
            refresh();
          }}
        />
      )}

      {editing && (
        <SprintDrawer
          mode="edit"
          sprint={editing}
          onClose={() => setEditing(null)}
          onDone={() => {
            setEditing(null);
            refresh();
          }}
        />
      )}

      {handoverFor && (
        <HandoverPanel
          sprint={handoverFor}
          otherSprints={sprints.filter((s) => s.sprint_id !== handoverFor.sprint_id)}
          onClose={() => setHandoverFor(null)}
          onCarried={refresh}
        />
      )}

      {sprints.length === 0 ? (
        <SprintsEmptyState />
      ) : (
        <SprintsList
          sprints={sprints}
          activeSprintId={sprint?.sprint_id}
          onStatusChange={setStatus}
          onView={selectSprint}
          onHandover={setHandoverFor}
          onEdit={setEditing}
          onDelete={remove}
        />
      )}
    </div>
  );
}
