import { LogEntry } from '../../types/log';
import styles from './styles.module.scss';

interface LogModalProps {
  log: LogEntry | null;
  onClose: () => void;
}

export default function LogModal({ log, onClose }: LogModalProps) {
  if (!log) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>Log Details</h2>
        <div className={styles.logDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Timestamp:</span>
            <span>{new Date(log.timestamp).toLocaleString()}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Level:</span>
            <span className={`${styles.levelValue} ${styles[log.level.toLowerCase()]}`}>
              {log.level}
            </span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Message:</span>
            <span>{log.message}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Trace:</span>
            <span>{log.trace}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Author ID:</span>
            <span>{log.authorId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}