import styles from "../styles/PostCard.module.css";
import Link from 'next/link';

export default function PostCard({post}) {
  return (
    <div className={styles.post} tabIndex="0">
      <figure>
        <img src={`http://pure-depths-68215.herokuapp.com${post.postCoverURL}`} />
      </figure>
      <div className={styles.text}>
        <h3 className={styles.title}>
        <Link href={`/post/${post.id}`}>
          <a>{post.postTitle}</a>
        </Link>
        </h3>
        <span>
        <Link href={`/user/${post.authorId}`}>
          <a>{post.author.fullName}</a>
        </Link>
        </span>
        <span>{post.date}</span>
        <span>
          {post.postContent.slice(0, 100) + '...'}
          <Link href={`/post/${post.id}`}>
            <a>(Read more?)</a>
          </Link>
        </span>
      </div>
    </div>
  );
}
