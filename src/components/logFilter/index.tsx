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
          placeholder="Search logs by status: Debug"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className={styles.levelFilter}>
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value as LogLevel)}
        >
          <option value="ALL">All</option>
          <option value="Error">Error</option>
          <option value="Warn">Warning</option>
          <option value="Info">Info</option>
          <option value="Debug">Debug</option>
          <option value="Trace">Trace</option>
        </select>
      </div>
    </div>
  );
}