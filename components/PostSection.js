import PostCard from "./PostCard";
import styles from "../styles/PostsSection.module.css";
export default function PostSection({ postList }) {
  return (
    <section className={styles.posts}>
      {postList.length === 0 ? (
        <div className={styles.nopost}>No posts found.</div>
      ) : (
        postList.map((post) => {
          return <PostCard key={post.id} post={post}/>;
        })
      )}
    </section>
  );
}
