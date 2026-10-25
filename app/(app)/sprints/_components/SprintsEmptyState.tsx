import { DotGridEmptyState } from "@/components/DotGridEmptyState";

export function SprintsEmptyState() {
  return (
    <DotGridEmptyState
      illustration={
        <svg width="180" height="56" viewBox="0 0 180 56" fill="none" className="mb-6">
          <path
            d="M4 10 L50 10 L50 46 L96 46 L96 24 L140 24 L140 38 L176 38"
            stroke="#DCD8E8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          <circle cx="4" cy="10" r="2.5" fill="#DCD8E8" />
          <circle cx="96" cy="24" r="2.5" fill="#DCD8E8" />
          <circle cx="176" cy="38" r="3.5" fill="#6F01D0" />
        </svg>
      }
      title="No sprints yet"
      description="Create your first sprint to start tracking."
    />
  );
}
