import { useState, useEffect } from 'react';
import { fetchLogs } from '../services/logService';
import { LogEntry, LogLevel } from '../types/log';
import styles from '../styles/Home.module.scss';
import { Loader } from '@/components/Loader';

export default function Home() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<LogLevel>('ALL');
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs();
        setLogs(data);
        setFilteredLogs(data);
      } catch (err) {
        setError('Failed to fetch logs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  useEffect(() => {
    let result = [...logs];
    
    if (selectedLevel !== 'ALL') {
      result = result.filter(log => log.level === selectedLevel);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(log => 
        log.message.toLowerCase().includes(term) ||
        log.trace.toLowerCase().includes(term) ||
        log.authorId.toLowerCase().includes(term)
      );
    }
    
    setFilteredLogs(result);
  }, [logs, selectedLevel, searchTerm]);

  const handleLogClick = (log: LogEntry) => {
    setSelectedLog(log);
  };

  const closeModal = () => {
    setSelectedLog(null);
  };

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Log Viewer</h1>
      
      <div className={styles.filters}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.levelFilter}>
          <label>Filter by level:</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as LogLevel)}
          >
            <option value="ALL">All Levels</option>
            <option value="ERROR">Error</option>
            <option value="WARN">Warning</option>
            <option value="DEBUG">Debug</option>
            <option value="TRACE">Trace</option>
            <option value="INFO">Info</option>
          </select>
        </div>
      </div>
      
      <div className={styles.logList}>
        {filteredLogs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Level</th>
                <th>Message</th>
                <th>Trace</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr 
                  key={index} 
                  className={styles[log.level.toLowerCase()]}
                  onClick={() => handleLogClick(log)}
                >
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.level}</td>
                  <td>{log.message}</td>
                  <td>{log.trace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.noResults}>No logs match your filters.</div>
        )}
      </div>
      
      {selectedLog && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <h2>Log Details</h2>
            <div className={styles.logDetails}>
              <p><strong>Timestamp:</strong> {new Date(selectedLog.timestamp).toLocaleString()}</p>
              <p><strong>Level:</strong> {selectedLog.level}</p>
              <p><strong>Message:</strong> {selectedLog.message}</p>
              <p><strong>Trace:</strong> {selectedLog.trace}</p>
              <p><strong>Author ID:</strong> {selectedLog.authorId}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}