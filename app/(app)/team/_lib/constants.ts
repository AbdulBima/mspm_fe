import type { Discipline } from "@/lib/types";

export const DISCIPLINE_LABEL: Record<Discipline, string> = {
  product: "Product",
  design: "Design",
  frontend: "Frontend",
  backend: "Backend",
  qa: "QA",
  mobile: "Mobile",
  intern: "Intern",
  leadership: "Leadership",
  other: "Other",
};

// Deliberate order rather than array insertion order — leadership and
// product-facing roles surface first, catch-all disciplines sink last.
export const DISCIPLINE_ORDER: Discipline[] = [
  "leadership",
  "product",
  "design",
  "frontend",
  "backend",
  "mobile",
  "qa",
  "intern",
  "other",
];
