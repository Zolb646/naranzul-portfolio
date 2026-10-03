"use client";
import { useSyncExternalStore } from "react";
import { type IntakeDraft, parseDraft } from "./intake";
const KEY = "designer-content-brief:v1";
const initial: IntakeDraft = {
  version: 1,
  values: {},
  projects: [{ id: "project-1", values: {} }],
  consent: false,
};
let current = initial;
let initialized = false;
let storageStatus: "saved" | "unavailable" | "empty" = "empty";
const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function snapshot() {
  if (!initialized && typeof window !== "undefined") {
    initialized = true;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = parseDraft(JSON.parse(raw));
        if (parsed) {
          current = parsed;
          storageStatus = "saved";
        } else storageStatus = "unavailable";
      }
    } catch {
      storageStatus = "unavailable";
    }
  }
  return current;
}
export function updateDraft(next: IntakeDraft) {
  current = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
    storageStatus = "saved";
  } catch {
    storageStatus = "unavailable";
  }
  listeners.forEach((l) => l());
}
export function clearDraft() {
  current = {
    ...initial,
    values: {},
    projects: [{ id: crypto.randomUUID(), values: {} }],
  };
  try {
    localStorage.removeItem(KEY);
    storageStatus = "empty";
  } catch {
    storageStatus = "unavailable";
  }
  listeners.forEach((l) => l());
}
export const getStorageStatus = () => storageStatus;
export const useDraft = () =>
  useSyncExternalStore(subscribe, snapshot, () => initial);
