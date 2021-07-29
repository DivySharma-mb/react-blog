import Head from "next/head";
import styles from "../styles/Home.module.css";
import Filters from "../components/Filters";
import PostSection from "../components/PostSection";
import { useEffect, useState } from "react";
import useSWR, { trigger } from "swr";

export default function Home({ posts, user }) {
  const { data, error, isValidating } = useSWR(
    `http://pure-depths-68215.herokuapp.com/api/all-posts`
  );
  const [author, setAuthor] = useState("");
  const [contentKeyword, setContentKeyword] = useState("");
  const [dateToggle, setDateToggle] = useState(false);
  const [page, setPage] = useState(1);
  const [postList, setPostList] = useState(posts);

  const filterControl = {
    author,
    setAuthor,
    contentKeyword,
    setContentKeyword,
    dateToggle,
    setDateToggle,
  };
  useEffect(() => {
    trigger("http://pure-depths-68215.herokuapp.com/api/all-posts");
  }, []);

  useEffect(() => {
    if (data) {
      const filteredPostList = data.posts.filter((post) => {
        if (
          post.author.fullName.toLowerCase().includes(author) &&
          (post.postTitle.toLowerCase().includes(contentKeyword) ||
            post.postContent.toLowerCase().includes(contentKeyword))
        ) {
          return true;
        } else {
          return false;
        }
      });

      dateToggle
        ? setPostList(filteredPostList.slice((page - 1) * 15, page * 15))
        : setPostList(
            filteredPostList.reverse().slice((page - 1) * 15, page * 15)
          );
    }
  }, [author, dateToggle, contentKeyword, page]);

  return (
    <>
      <Head>
        <title>BlogFiesta! | Home</title>
      </Head>
      <div className={styles.inner}>
        <h2>Latest posts</h2>
        <Filters {...filterControl} />
      </div>
      {isValidating ? (
        <div className={styles.nopost}>Loading...</div>
      ) : (
        <PostSection postList={postList} />
      )}
      <nav className={styles.buttons}>
        <button
          className={styles.prev}
          onClick={() => {
            setPage(page > 1 ? page - 1 : page);
          }}
        >
          &lt;
        </button>
        <button
          className={styles.next}
          onClick={(e) => {
            setPage(page + 1);
          }}
        >
          &gt;
        </button>
      </nav>
    </>
  );
}
export function getServerSideProps(context) {
  return fetch(`http://pure-depths-68215.herokuapp.com/api/all-posts`)
    .then((res) => res.json())
    .then((data) => {
      return {
        props: {
          posts: data.posts.slice(0, 15).reverse(),
        },
      };
    });
}
