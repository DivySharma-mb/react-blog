import styles from "../styles/PostCard.module.css";
import Link from 'next/link';

export default function PostCard() {
  return (
    <div className={styles.post}>
      <figure>
        <img src="https://source.unsplash.com/random/200x200" />
      </figure>
      <div className={styles.text}>
        <h3 className={styles.title}>
        <Link href="/post/${post.id}">
          <a>post.postTitle</a>
        </Link>
        </h3>
        <span>
        <Link href="/user/post.author.id">
          <a>post.author.fullName</a>
        </Link>
        </span>
        <span>post.date</span>
        <span>
          post.postContent.slice(0, 100)...
          <Link href="/post/${post.id}">
            <a>(Click to read more)</a>
          </Link>
        </span>
      </div>
    </div>
  );
}
