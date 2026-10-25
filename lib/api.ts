import axios, { AxiosInstance } from "axios";
import type {
  AccountabilityResponse,
  AIAskResponse,
  AIChatTurn,
  Alignment,
  AttendanceDay,
  AttendanceStats,
  AttendanceStatus,
  AuthSession,
  BurndownPoint,
  Checkin,
  DailyReport,
  DailyReportInput,
  Decision,
  Goal,
  Handover,
  Manager,
  Meeting,
  Member,
  MemberAccess,
  MyDailyReport,
  MyProfile,
  MyReportHistory,
  MyTask,
  Report,
  Risk,
  Sprint,
  SprintHealth,
  StandupDaySummaryResponse,
  Task,
  TaskNote,
  TaskNoteWithContext,
  TeamDailyReports,
} from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const TOKEN_KEY = process.env.NEXT_PUBLIC_SPRINT_OPS_TOKEN || "SPRINT_OPS_TOKEN";

const REQUEST_TIMEOUT_MS = 30_000;

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export const SESSION_EXPIRED_EVENT = "sprint-ops:session-expired";

const AUTH_PATHS = ["/api/pm/auth/login", "/api/pm/auth/signup", "/api/pm/auth/activate", "/api/pm/auth/me"];

export interface ApiFieldError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export class ApiError extends Error {
  status: number;
  data?: unknown;
  fieldErrors?: ApiFieldError[];

  constructor(
    status: number,
    message: string,
    options?: { data?: unknown; fieldErrors?: ApiFieldError[]; cause?: unknown }
  ) {
    super(message, options?.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = "ApiError";
    this.status = status;
    this.data = options?.data;
    this.fieldErrors = options?.fieldErrors;
  }
}

function isApiFieldError(item: unknown): item is ApiFieldError {
  return !!item && typeof item === "object" && "msg" in item && typeof (item as { msg?: unknown }).msg === "string";
}

function parseErrorBody(data: unknown): { message?: string; fieldErrors?: ApiFieldError[] } {
  if (!data || typeof data !== "object") return {};
  const body = data as { detail?: unknown; message?: unknown };

  if (typeof body.detail === "string") {
    return { message: body.detail };
  }

  if (Array.isArray(body.detail)) {
    const fieldErrors = body.detail.filter(isApiFieldError);
    if (fieldErrors.length > 0) {
      const message = fieldErrors
        .map((e) => {
          const field = e.loc[e.loc.length - 1];
          return field !== undefined ? `${field}: ${e.msg}` : e.msg;
        })
        .join("; ");
      return { message, fieldErrors };
    }
  }

  if (typeof body.message === "string") {
    return { message: body.message };
  }

  return {};
}

const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const requestPath = error.config?.url ?? "";
        if (
          error.response.status === 401 &&
          typeof window !== "undefined" &&
          getToken() &&
          !AUTH_PATHS.some((path) => requestPath.startsWith(path))
        ) {
          clearToken();
          window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
        }
        const { message, fieldErrors } = parseErrorBody(error.response.data);
        throw new ApiError(error.response.status, message || error.message || "Request failed", {
          data: error.response.data,
          fieldErrors,
          cause: error,
        });
      }
      if (error.code === "ECONNABORTED") {
        throw new ApiError(0, "The server took too long to respond. Try again.", { cause: error });
      }
      if (error.request) {
        throw new ApiError(0, "Couldn't reach the server. Check your connection and try again.", { cause: error });
      }
      throw new ApiError(0, error.message || "Request failed", { cause: error });
    }
    throw new ApiError(0, error instanceof Error ? error.message : "Request failed", {
      cause: error instanceof Error ? error : undefined,
    });
  }
);

const get = <T>(path: string) => http.get<T>(path).then((r) => r.data);
const post = <T>(path: string, data?: unknown) => http.post<T>(path, data).then((r) => r.data);
const patch = <T>(path: string, data?: unknown) => http.patch<T>(path, data).then((r) => r.data);
const put = <T>(path: string, data?: unknown) => http.put<T>(path, data).then((r) => r.data);
const del = <T>(path: string) => http.delete<T>(path).then((r) => r.data);

function cleanParams(params: Record<string, string | undefined>): URLSearchParams {
  const out = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      out.append(key, value);
    }
  }
  return out;
}

export const api = {
  ApiError,

  auth: {
    login: (email: string, password: string) => post<AuthSession>("/api/pm/auth/login", { email, password }),
    signup: (name: string, email: string, password: string, invite_code?: string) =>
      post<AuthSession>("/api/pm/auth/signup", { name, email, password, invite_code }),
    activate: (email: string, access_code: string, password: string) =>
      post<AuthSession>("/api/pm/auth/activate", { email, access_code, password }),
    me: () => get<(Manager | MyProfile) & { role: AuthSession["role"] }>("/api/pm/auth/me"),
    setupStatus: () => get<{ has_manager: boolean; invite_required: boolean }>("/api/pm/auth/setup-status"),
  },

  sprints: {
    list: () => get<Sprint[]>("/api/pm/sprints"),
    active: () => get<Sprint>("/api/pm/sprints/active"),
    get: (id: string) => get<Sprint>(`/api/pm/sprints/${id}`),
    create: (data: Partial<Sprint> & { name: string; start_date: string }) => post<Sprint>("/api/pm/sprints", data),
    update: (id: string, data: Partial<Sprint>) => patch<Sprint>(`/api/pm/sprints/${id}`, data),
    remove: (id: string) => del<void>(`/api/pm/sprints/${id}`),

    goals: (sprintId: string) => get<Goal[]>(`/api/pm/sprints/${sprintId}/goals`),
    createGoal: (sprintId: string, data: { title: string; description?: string }) =>
      post<Goal>(`/api/pm/sprints/${sprintId}/goals`, data),
    updateGoal: (goalId: string, data: Partial<Goal>) => patch<Goal>(`/api/pm/sprints/goals/${goalId}`, data),
    removeGoal: (goalId: string) => del<void>(`/api/pm/sprints/goals/${goalId}`),

    health: (sprintId: string) => get<SprintHealth>(`/api/pm/sprints/${sprintId}/health`),
    alignment: (sprintId: string) => get<Alignment>(`/api/pm/sprints/${sprintId}/alignment`),
    burndown: (sprintId: string) => get<{ series: BurndownPoint[] }>(`/api/pm/sprints/${sprintId}/burndown`),
    handover: (sprintId: string) => get<Handover>(`/api/pm/sprints/${sprintId}/handover`),
    carryOver: (sprintId: string, data: { to_sprint_id: string; task_ids?: string[]; carry_open_risks?: boolean }) =>
      post<{ from_sprint: string; to_sprint: string; tasks_carried: number; risks_carried: number }>(
        `/api/pm/sprints/${sprintId}/carry-over`,
        data
      ),
  },

  members: {
    list: () => get<Member[]>("/api/pm/members"),
    get: (id: string) => get<Member>(`/api/pm/members/${id}`),
    create: (data: { name: string; role_title: string; discipline: string; email?: string }) =>
      post<Member>("/api/pm/members", data),
    update: (id: string, data: Partial<Member>) => patch<Member>(`/api/pm/members/${id}`, data),
    remove: (id: string) => del<void>(`/api/pm/members/${id}`),
    dashboard: (memberId: string, sprintId: string) =>
      get<{ member: Member; tasks: Task[]; recent_checkins: Checkin[] }>(
        `/api/pm/members/${memberId}/dashboard?sprint_id=${sprintId}`
      ),
    issueAccess: (memberId: string) => post<MemberAccess>(`/api/pm/members/${memberId}/access`),
    revokeAccess: (memberId: string) => del<void>(`/api/pm/members/${memberId}/access`),
    downloadOpenTasksPdf: (memberId: string, sprintId: string) =>
      http
        .get(`/api/pm/members/${memberId}/open-tasks-pdf?sprint_id=${sprintId}`, { responseType: "blob" })
        .then((r) => r.data as Blob),
  },

  tasks: {
    list: (sprintId: string, filters?: { member_id?: string; goal_id?: string; status?: string }) => {
      const params = cleanParams({ sprint_id: sprintId, ...filters });
      return get<Task[]>(`/api/pm/tasks?${params.toString()}`);
    },
    get: (id: string) => get<Task>(`/api/pm/tasks/${id}`),
    create: (data: Partial<Task> & { sprint_id: string; member_id: string; title: string }) =>
      post<Task>("/api/pm/tasks", data),
    update: (id: string, data: Partial<Task>) => patch<Task>(`/api/pm/tasks/${id}`, data),
    remove: (id: string) => del<void>(`/api/pm/tasks/${id}`),
    addNote: (taskId: string, content: string, note_type: string = "update") =>
      post<TaskNote>(`/api/pm/tasks/${taskId}/notes`, { content, note_type }),
    removeNote: (noteId: string) => del<void>(`/api/pm/tasks/notes/${noteId}`),
    notes: (sprintId: string, filters?: { note_type?: string; member_id?: string; task_id?: string }) => {
      const params = cleanParams({ sprint_id: sprintId, ...filters });
      return get<TaskNoteWithContext[]>(`/api/pm/tasks/notes?${params.toString()}`);
    },
    downloadInReviewPdf: (sprintId: string) =>
      http
        .get(`/api/pm/tasks/in-review-pdf?sprint_id=${sprintId}`, { responseType: "blob" })
        .then((r) => r.data as Blob),
  },

  checkins: {
    list: (sprintId: string, filters?: { checkin_date?: string; member_id?: string }) => {
      const params = cleanParams({ sprint_id: sprintId, ...filters });
      return get<Checkin[]>(`/api/pm/checkins?${params.toString()}`);
    },
    create: (data: Partial<Checkin> & { sprint_id: string; member_id: string; checkin_date: string }) =>
      post<Checkin>("/api/pm/checkins", data),
    accountability: (sprintId: string) =>
      get<AccountabilityResponse>(`/api/pm/checkins/accountability?sprint_id=${sprintId}`),
  },

  attendance: {
    list: (sprintId: string, filters?: { attendance_date?: string; start_date?: string; end_date?: string }) => {
      const params = cleanParams({ sprint_id: sprintId, ...filters });
      return get<AttendanceDay[]>(`/api/pm/attendance?${params.toString()}`);
    },
    bulkMark: (data: {
      sprint_id: string;
      attendance_date: string;
      entries: {
        member_id: string;
        status: AttendanceStatus;
        joined_at?: string;
        today_plan?: string;
        task_ids?: string[];
        note?: string;
      }[];
    }) => post<AttendanceDay>("/api/pm/attendance/bulk", data),
    mark: (data: {
      sprint_id: string;
      member_id: string;
      attendance_date: string;
      status: AttendanceStatus;
      joined_at?: string;
      today_plan?: string;
      task_ids?: string[];
      note?: string;
    }) => post<AttendanceDay>("/api/pm/attendance/mark", data),
    stats: (sprintId: string) => get<AttendanceStats>(`/api/pm/attendance/stats?sprint_id=${sprintId}`),
  },

  risks: {
    list: (sprintId: string, status?: string) => {
      const params = cleanParams({ sprint_id: sprintId, status });
      return get<Risk[]>(`/api/pm/risks?${params.toString()}`);
    },
    create: (data: Partial<Risk> & { sprint_id: string; title: string }) => post<Risk>("/api/pm/risks", data),
    update: (id: string, data: Partial<Risk>) => patch<Risk>(`/api/pm/risks/${id}`, data),
    remove: (id: string) => del<void>(`/api/pm/risks/${id}`),
  },

  decisions: {
    list: (sprintId: string) => get<Decision[]>(`/api/pm/decisions?sprint_id=${sprintId}`),
    create: (data: Partial<Decision> & { sprint_id: string; decision: string }) =>
      post<Decision>("/api/pm/decisions", data),
    remove: (id: string) => del<void>(`/api/pm/decisions/${id}`),
  },

  meetings: {
    list: (sprintId: string, meetingType?: string) => {
      const params = cleanParams({ sprint_id: sprintId, meeting_type: meetingType });
      return get<Meeting[]>(`/api/pm/meetings?${params.toString()}`);
    },
    create: (data: Partial<Meeting> & { sprint_id: string; meeting_date: string }) =>
      post<Meeting>("/api/pm/meetings", data),
    update: (id: string, data: Partial<Meeting>) => patch<Meeting>(`/api/pm/meetings/${id}`, data),
    remove: (id: string) => del<void>(`/api/pm/meetings/${id}`),
  },

  reports: {
    list: (sprintId: string, reportType?: string) => {
      const params = cleanParams({ sprint_id: sprintId, report_type: reportType });
      return get<Report[]>(`/api/pm/reports?${params.toString()}`);
    },
    get: (id: string) => get<Report>(`/api/pm/reports/${id}`),
    generate: (data: {
      sprint_id: string;
      report_type: "daily" | "weekly" | "sprint";
      period_start?: string;
      period_end?: string;
      include_ai_narrative?: boolean;
      notes?: string;
    }) => post<Report>("/api/pm/reports/generate", data),
    remove: (id: string) => del<void>(`/api/pm/reports/${id}`),
  },

  dailyReports: {
    forDay: (reportDate?: string) => {
      const params = cleanParams({ report_date: reportDate });
      const qs = params.toString();
      return get<TeamDailyReports>(`/api/pm/daily-reports${qs ? `?${qs}` : ""}`);
    },
    forMember: (memberId: string, days = 14) =>
      get<DailyReport[]>(`/api/pm/daily-reports/members/${memberId}?days=${days}`),
  },

  me: {
    profile: () => get<MyProfile>("/api/pm/me"),
    tasks: () => get<MyTask[]>("/api/pm/me/tasks"),
    todaysReport: () => get<MyDailyReport>("/api/pm/me/daily-report"),
    submitReport: (data: DailyReportInput) => put<MyDailyReport>("/api/pm/me/daily-report", data),
    history: (days = 14) => get<MyReportHistory>(`/api/pm/me/daily-reports?days=${days}`),
  },

  ai: {
    ask: (sprintId: string, question: string, history: AIChatTurn[] = []) =>
      post<AIAskResponse>("/api/pm/ai/ask", { sprint_id: sprintId, question, history }),
    standupDaySummary: (sprintId: string, day: string) =>
      get<StandupDaySummaryResponse>(`/api/pm/ai/standup-summary?sprint_id=${sprintId}&day=${day}`),
  },
};