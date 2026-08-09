import { DotGridEmptyState } from "@/components/DotGridEmptyState";

export function TeamEmptyState() {
  return (
    <DotGridEmptyState
      illustration={
        <svg width="150" height="56" viewBox="0 0 150 56" fill="none" className="mb-6">
          <line x1="22" y1="16" x2="75" y2="40" stroke="#d4d4d8" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
          <line x1="75" y1="40" x2="128" y2="16" stroke="#d4d4d8" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
          <line x1="22" y1="16" x2="128" y2="16" stroke="#d4d4d8" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
          <circle cx="22" cy="16" r="6" fill="#ffffff" stroke="#d4d4d8" strokeWidth="1.5" />
          <circle cx="128" cy="16" r="6" fill="#ffffff" stroke="#d4d4d8" strokeWidth="1.5" />
          <circle cx="75" cy="40" r="7" fill="#d97706" />
        </svg>
      }
      title="No team members yet"
      description="Add the people on your sprint to start assigning and tracking work."
    />
  );
}
