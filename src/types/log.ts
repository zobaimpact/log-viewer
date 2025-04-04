export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  trace: string;
  authorId: string;
}

export type LogLevel = "ALL" | "ERROR" | "WARN" | "DEBUG" | "TRACE" | "INFO";
