import axios from "axios";
import { LogEntry } from "../types/log";


export const fetchLogs = async (): Promise<LogEntry[]> => {
  const response = await axios.get<string[]>("/api/logs");

  return response.data.map((logString) => {
    const [timestamp, level, message, trace, authorId] = logString.split("|=|");
    return { timestamp, level, message, trace, authorId };
  });
};
