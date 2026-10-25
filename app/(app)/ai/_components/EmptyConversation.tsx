import { SUGGESTIONS } from "../_lib/constants";
import { SuggestionChip } from "./SuggestionChip";

export function EmptyConversation({ onSuggestionClick }: { onSuggestionClick: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
      <p className="max-w-xs text-sm text-ink-mute">Ask a question about this sprint, or try one of these:</p>
      <div className="grid w-full max-w-md gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((s) => (
          <SuggestionChip key={s} text={s} onClick={() => onSuggestionClick(s)} />
        ))}
      </div>
    </div>
  );
}
