import styles from "../../styles/Dashboard.module.css";
import PostSection from "../../components/PostSection";
import Head from "next/head";
import Link from "next/link";

export default function User({ userPosts, userName, userId, user }) {
  return (
    <>
      <Head>
        <title>{userName}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.info}>
          <h1 className={styles.username} tabIndex="0">
            {userName}
          </h1>
          {user.id ? (
            user.id === userId ? (
                <Link href={'/editor'}>
                    <a className={styles.addpost}> + Add new post</a>
                </Link>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <PostSection postList={userPosts} />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const allPosts = await fetch(
      "http://pure-depths-68215.herokuapp.com/api/all-posts"
    ).then((response) => response.json());
    const userPosts = allPosts.posts.filter(
      (post) => post.authorId === +context.params.id
    );

    const allUsers = await fetch(
      "http://pure-depths-68215.herokuapp.com/api/all-users"
    ).then((response) => response.json());
    const user = allUsers.users.filter(
      (user) => +user.userId === +context.params.id
    );
    return {
      props: {
        userPosts,
        userName: user[0].fullName,
        userId: +context.params.id,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
