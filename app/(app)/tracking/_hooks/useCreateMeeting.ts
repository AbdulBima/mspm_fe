"use client";

import { localISODate } from "@/lib/dates";
import { notify } from "@/lib/notify";
import { useState } from "react";
import { api } from "@/lib/api";
import type { ActionItem, MeetingType } from "@/lib/types";
import type { CreateMeetingInput } from "../_lib/types";

export function useCreateMeeting(sprintId: string, onDone: () => void) {
  const [meetingType, setMeetingType] = useState<MeetingType>("standup");
  const [date, setDate] = useState(localISODate());
  const [notes, setNotes] = useState("");
  const [actionItemsText, setActionItemsText] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    try {
      const action_items: ActionItem[] = actionItemsText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((text) => ({ text, done: false }));
      const payload = {
        sprint_id: sprintId,
        meeting_type: meetingType,
        meeting_date: date,
        notes: notes || undefined,
        action_items,
      } satisfies CreateMeetingInput;
      await api.meetings.create(payload);
      onDone();
    } catch (err) {
      notify.error(err);
    } finally {
      setBusy(false);
    }
  }

  return { meetingType, setMeetingType, date, setDate, notes, setNotes, actionItemsText, setActionItemsText, busy, submit };
}
