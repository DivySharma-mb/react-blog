import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Editor.module.css";
import Head from "next/head";

export default function Editor({ post, user }) {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const fileUpload = useRef();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      fileUpload.current.style.display = "none";
      if (post) {
        setPostTitle(post.postTitle);
        setPostContent(post.postContent);
      }
    }
  }, []);

  function handleCancel(e) {
    e.preventDefault();
    const redirect = confirm("Are you sure?");
    if (redirect) {
      router.push("/");
    }
  }

  async function createPost(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("postTitle", postTitle);
    form.append("postContent", postContent);
    fileUpload.current.files
      ? form.append("cover", fileUpload.current.files[0])
      : null;
    const data = await fetch(
      "https://pure-depths-68215.herokuapp.com/api/post/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        body: form,
      }
    )
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
      });
    if (data.msg === "Post created successfully.") {
      alert(data.msg);
      router.push(`/post/${data.post.id}`);
    } else {
      alert("Something went wrong. Please try again later.");
    }
  }

  async function updatePost(e) {
    e.preventDefault();
    try {
      const data = await fetch(
        "https://pure-depths-68215.herokuapp.com/api/post/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updatedTitle: postTitle,
            updatedContent: postContent,
            postID: post.id,
          }),
        }
      )
        .then((res) => res.json())
        .catch((e) => {
          console.log(e);
        });

      alert(data.msg);
      //   router.push(post.id);
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again later.");
    }
  }
  if(!user.id){
    alert("You need to log-in first!");
    router.push('/login');
  }
  return (
    <>
      <Head>
        <title>{router.query.id ? "Update Post" : "Create Post"}</title>
      </Head>
      <div className={styles.inputField} tabIndex="0">
        <form>
          <div className={styles.errorDisplay}></div>

          <input
            tabIndex="0"
            type="text"
            name="title"
            className={styles.title}
            value={postTitle}
            onChange={(e) => {
              setPostTitle(e.currentTarget.value);
            }}
            placeholder="Enter Title"
            aria-label="Enter Post Title"
          />
          <br />
          <input
            type="file"
            name="cover"
            ref={fileUpload}
            className={styles.cover}
            aria-label="Choose Cover Image"
            tabIndex="0"
            accept=".png, .svg, .jpg, .jpeg"
          />
          <textarea
            tabIndex="0"
            name="content"
            className={styles.content}
            value={postContent}
            onChange={(e) => {
              setPostContent(e.currentTarget.value);
            }}
            placeholder="Enter Content.."
            aria-label="Enter post content"
          ></textarea>
          <br />
          <div className={styles.inputFieldButtons}>
            <button
              className={styles.save}
              onClick={router.query.id ? updatePost : createPost}
            >
              Save
            </button>
            <button className={styles.cancel} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  if (context.query.id) {
    const posts = await fetch(
      `https://pure-depths-68215.herokuapp.com/api/all-posts`
    ).then((res) => res.json());

    const post = posts.posts.filter(
      (post) => +post.id === +context.query.id
    )[0];
    if (!post) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        post,
      },
    };
  } else {
    return {
      props: {
        post: null,
      },
    };
  }
}
