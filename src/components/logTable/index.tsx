import { LogEntry } from '../../types/log';
import styles from './styles.module.scss';

interface LogTableProps {
  logs: LogEntry[];
  onLogClick: (log: LogEntry) => void;
}

export default function LogTable({ logs, onLogClick }: LogTableProps) {
  if (logs.length === 0) {
    return <div className={styles.noResults}>No logs found matching your filters.</div>;
  }

  return (
    <div className={styles.logTableContainer}>
      <table className={styles.logTable}>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Message</th>
            <th>Status</th>
            <th>Trace</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr
              key={index}
              className={`${styles.logRow} ${styles[log.level.toLowerCase()]}`}
              onClick={() => onLogClick(log)}
            >
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>
                <span className={styles.levelBadge}>{log.level}</span>
              </td>
              <td>{log.message}</td>
              <td>{log.trace}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}