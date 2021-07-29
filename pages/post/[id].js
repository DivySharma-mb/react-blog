import styles from "../../styles/Post.module.css";
import Head from "next/head";
import Link from "next/link";

import router from "next/router";

export default function Post({ post, postID, user }) {

  async function deletePost(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://pure-depths-68215.herokuapp.com/api/post/delete/${postID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      ).then((res) => res.json());

      alert(response.msg);
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong...");
    }
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className={styles.article}>
        <figure>
          <img
            src={`https://pure-depths-68215.herokuapp.com${post.coverImage}`}
            alt="Cover Image"
          />
        </figure>
        <header>
          <h1 className={styles.title}>{post.title}</h1>

          <span className={styles.author}>
            -by <a href={`/user/${post.authorId}`}>{post.author}</a>
          </span>
          <span className={styles.date}>
            ({post.date}) <br />
            {user.id ? (
              user.id === post.authorId ||
              user.role === "editor" ||
              user.role === "admin" ? (
                <Link href={`/editor?id=${postID}`}>
                  <a>Edit Post</a>
                </Link>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {" | "}
            {user.id ? (
              user.id === post.authorId || user.role === "admin" ? (
                <button onClick={deletePost}>Delete Post</button>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </span>
        </header>

        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className={styles.content}
        ></div>
      </article>
    </>
  );
}

export async function getServerSideProps(context) {
  return fetch(
    `https://pure-depths-68215.herokuapp.com/api/post/${context.params.id}`
  )
    .then((response) => response.json())
    .then((data) => {
      return {
        props: {
          post: data,
          postID: context.params.id,
        },
      };
    })
    .catch((e) => {
      return {
        notFound: true,
      };
    });
}
