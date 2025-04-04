import { LogLevel } from '../../types/log';
import styles from './styles.module.scss';

interface LogFilterProps {
  searchTerm: string;
  selectedLevel: LogLevel;
  onSearchChange: (term: string) => void;
  onLevelChange: (level: LogLevel) => void;
}

export default function LogFilter({
  searchTerm,
  selectedLevel,
  onSearchChange,
  onLevelChange,
}: LogFilterProps) {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchInput}>
        <input
          type="text"
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className={styles.levelFilter}>
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value as LogLevel)}
        >
          <option value="ALL">All Levels</option>
          <option value="ERROR">Error</option>
          <option value="WARN">Warning</option>
          <option value="INFO">Info</option>
          <option value="DEBUG">Debug</option>
          <option value="TRACE">Trace</option>
        </select>
      </div>
    </div>
  );
}