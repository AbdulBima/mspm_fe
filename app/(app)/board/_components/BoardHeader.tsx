import { PageHeader } from "@/components/PageHeader";

export function BoardHeader({ sprintName }: { sprintName: string }) {
  return <PageHeader eyebrow="Workspace" title="Board" description={`All activity for ${sprintName}.`} />;
}
