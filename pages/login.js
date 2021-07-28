import Head from "next/head";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(()=>{
      setErrorMessage([]);
  }, [email, password]);

  async function handleSubmit(e){
      e.preventDefault();
      setErrorMessage([]);
      fetch(
          "https://pure-depths-68215.herokuapp.com/api/login",
          {
              method:'POST',
              headers:{
                  'Content-type':'application/json'
              },
              body: JSON.stringify({email, password})
          }
      )
      .then((response) => {
          return response.json();
      })
      .then(data => {
          if(data.hasOwnProperty('token')){
              document.cookie = `token=${data.token};`
              router.push('/');
          } else{
              setErrorMessage([data.msg])
          }
      })
      .catch(error => {
          setErrorMessage(["Something went wrong. Please try again later."])
      })
  }


  return (
    <>
      <Head>
        <title>BlogFiesta! | Login</title>
      </Head>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Log in</h2>
        <div className={styles.errorDisplay}>
            {errorMessage.map(error=>{
                return <div key={error}>{error}</div>
            })}
        </div>

        <label htmlFor="email">
          Enter email:
          <input
            type="email"
            name="email"
            id="email"
            aria-label="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>{setEmail(e.currentTarget.value)}}
            required
          />
        </label>

        <label htmlFor="password">
          Enter Password:
          <input
            type="password"
            name="password"
            id="password"
            aria-label="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.currentTarget.value)}}
            required
          />
        </label>
        <button type="submit">Log In</button>

        <Link href="/register">
          <a>New User? Register Here!</a>
        </Link>
      </form>
    </>
  );
}
