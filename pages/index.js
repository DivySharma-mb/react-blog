import Head from "next/head";
import styles from "../styles/Home.module.css";
import usePosts from "../SWR/usePosts";
import Filters from "../components/Filters";
import PostSection from "../components/PostSection";

export default function Home() {
  const { posts, error, isValidating } = usePosts();
  return (
    <>
      <Head>
        <title>BlogFiesta! | Home</title>
      </Head>
      <div className={styles.inner}>
        <h2>
          Latest posts
        </h2>
        <Filters />
      </div>
      <PostSection postList={posts} />
      <nav className={styles.buttons}>
        <button className={styles.prev}>&lt;</button>
        <button className={styles.next}>&gt;</button>
      </nav>
    </>
  );
}
