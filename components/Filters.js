import styles from '../styles/Filters.module.css';
export default function Filters({onClick, onChangeAuthor, onChangeKeyword}) {
  return (
    <div className={styles.filters}>
      <button className={styles.dateToggle} aria-label="Date sort" onClick={onClick}>
        Newest to Oldest
      </button>
      <input
        type="text"
        name="author"
        id="author"
        placeholder="Search author"
        onChange={onChangeAuthor}
      />
      <input
        type="text"
        name="keyword"
        id="keyword"
        placeholder="Search post keyword"
        onChange={onChangeKeyword}
      />
    </div>
  );
}
