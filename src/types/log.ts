export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  trace: string;
  authorId: string;
}

export type LogLevel = "ALL" | "Error" | "Warn" | "Debug" | "Trace" | "Info";
