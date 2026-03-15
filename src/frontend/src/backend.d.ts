import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface Issue {
    id: bigint;
    status: IssueStatus;
    issueType: string;
    name: string;
    createdAt: Time;
    description: string;
    photo?: ExternalBlob;
    location: string;
}
export interface UserProfile {
    name: string;
}
export enum IssueStatus {
    resolved = "resolved",
    pending = "pending",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminLogin(password: string): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getIssues(): Promise<Array<Issue>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitIssue(name: string, location: string, issueType: string, description: string, photo: ExternalBlob | null): Promise<bigint>;
    updateIssueStatus(issueId: bigint, newStatusText: string): Promise<void>;
}
