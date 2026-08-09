import type { Member } from "@/lib/types";

export interface Contributor {
  member: Member;
  taskCount: number;
  doneCount: number;
  blockedCount: number;
}
