export function parseLocalDate(isoDate: string) {
  const [y, m, d] = isoDate.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function longDate(isoDate: string) {
  return parseLocalDate(isoDate).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
}

export function shortDay(isoDate: string) {
  return parseLocalDate(isoDate).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
}

export function timeOf(iso: string) {
  const normalized = /[zZ]|[+-]\d\d:?\d\d$/.test(iso) ? iso : `${iso}Z`;
  return new Date(normalized).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function formatRemaining(ms: number) {
  if (ms <= 0) return "Closed";
  const totalMinutes = Math.floor(ms / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours >= 1) return `${hours}h ${String(minutes).padStart(2, "0")}m`;
  const seconds = Math.floor((ms % 60_000) / 1000);
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

export function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
