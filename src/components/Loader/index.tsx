import styles from './styles.module.scss';

export function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.loader}>
          <div className={styles.div_one}/>
          <div className={styles.div_two}/>
          <div className={styles.div_three}/>
        </div>
      </div>
    </div>
  );
}
