/** Shared types — Phase 7 §37 content model */

export type ContributionStatus = "pending" | "approved" | "rejected" | "archived";

export interface ContributionInput {
  name: string; // contributor name / alias
  message?: string;
  photo?: File | null;
  video?: File | null;
}

export interface ContributionRecord {
  id: string;
  contributorName: string;
  contributorLink?: string;
  message?: string;
  photoUrl?: string; // blob or signed URL
  photoPath?: string; // storage path
  videoLabel?: string;
  videoUrl?: string;
  videoPath?: string;
  createdAt: string; // ISO
  status: ContributionStatus;
}

export type UploadState =
  | "idle"
  | "validating"
  | "uploading"
  | "processing"
  | "success"
  | "error";

export interface UploadProgress {
  state: UploadState;
  progress: number; // 0-100 for uploading
  error?: string;
}
