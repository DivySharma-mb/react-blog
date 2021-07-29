import styles from "../styles/Filters.module.css";
export default function Filters({
  author,
  contentKeyword,
  dateToggle,
  setAuthor,
  setContentKeyword,
  setDateToggle,
}) {
  return (
    <div className={styles.filters}>
      <button className={styles.dateToggle} aria-label="Date sort" onClick={()=>{setDateToggle(!dateToggle)}}>
        {dateToggle? 'Oldest to Newest': 'Newest to Oldest'}
      </button>
      <input
        type="text"
        name="author"
        id="author"
        value={author}
        placeholder="Search author"
        onChange={(e) => {
          setAuthor(e.target.value.toLowerCase());
        }}
      />
      <input
        type="text"
        name="keyword"
        id="keyword"
        value={contentKeyword}
        placeholder="Search post keyword"
        onChange={(e) => {
          setContentKeyword(e.target.value.toLowerCase());
        }}
      />
    </div>
  );
}
