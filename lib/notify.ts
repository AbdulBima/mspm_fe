export type ToastTone = "success" | "error" | "info";

export interface ToastMessage {
  id: number;
  tone: ToastTone;
  message: string;
}

const EVENT = "sprint-ops:toast";
let counter = 0;

function emit(tone: ToastTone, message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ToastMessage>(EVENT, { detail: { id: ++counter, tone, message } }));
}

export function errorMessage(err: unknown, fallback = "Something went wrong. Try again.") {
  return err instanceof Error && err.message ? err.message : fallback;
}

export const notify = {
  success: (message: string) => emit("success", message),
  info: (message: string) => emit("info", message),
  error: (err: unknown, fallback?: string) => emit("error", typeof err === "string" ? err : errorMessage(err, fallback)),
  EVENT,
};
