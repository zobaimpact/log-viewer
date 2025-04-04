import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchLogs } from "../services/logService";
import { LogEntry, LogLevel } from "../types/log";
import LogFilter from "../components/logFilter";
import LogTable from "../components/logTable";
import LogModal from "../components/logModal";
import styles from "../styles/Home.module.scss";
import { Loader } from "@/components/Loader";

export default function Home() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<LogLevel>("ALL");
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  // Memoized filtered logs to prevent recalculation on every render
  const filteredLogs = useMemo(() => {
    let result = [...logs];
    
    if (selectedLevel !== "ALL") {
      result = result.filter((log) => 
        log.message.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (log) =>
          log.message.toLowerCase().includes(term) ||
          log.trace.toLowerCase().includes(term) ||
          log.authorId.toLowerCase().includes(term)
      );
    }

    return result;
  }, [logs, selectedLevel, searchTerm]);

  // Memoized handler functions to prevent recreating on every render
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleLevelChange = useCallback((level: LogLevel) => {
    setSelectedLevel(level);
  }, []);

  const handleLogClick = useCallback((log: LogEntry) => {
    setSelectedLog(log);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedLog(null);
  }, []);

  // Fetch logs only once on component mount
  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs();
        setLogs(data);
      } catch (err) {
        setError("Failed to fetch logs. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Log Viewer</h1>
        <p>View and filter application logs</p>
      </header>

      <main className={styles.main}>
        <LogFilter
          searchTerm={searchTerm}
          selectedLevel={selectedLevel}
          onSearchChange={handleSearchChange}
          onLevelChange={handleLevelChange}
        />

        <div className={styles.logCount}>
          Showing {filteredLogs.length} of {logs.length} logs
        </div>

        <LogTable logs={filteredLogs} onLogClick={handleLogClick} />
      </main>

      <LogModal log={selectedLog} onClose={handleCloseModal} />
    </div>
  );
}