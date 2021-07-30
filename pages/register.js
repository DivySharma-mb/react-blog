import Head from "next/head";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    setErrorMessage([]);
    const timeout = setTimeout(() => {
      if (email) {
        if (
          !email.includes("@") ||
          !email.includes(".") ||
          email.includes(" ")
        ) {
          setErrorMessage(["Please enter a valid email"]);
        }
      }
      if (password) {
        if (password.length < 8) {
          setErrorMessage((msgs) => {
            return msgs.concat([
              "Password should at least have eight characters.",
            ]);
          });
        }
      }
      if (confirmPassword) {
        if (confirmPassword !== password) {
          setErrorMessage((msgs) => {
            return msgs.concat(["Password fields do not match."]);
          });
        }
      }
    }, 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, [email, password, confirmPassword]);

  async function handleSubmit(e) {
    e.preventDefault();
    if(!errorMessage.length){
      try {
        const response = await fetch('https://pure-depths-68215.herokuapp.com/api/register', {
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body: JSON.stringify({email, full_name: fullName, password}),
        });

        const data = await response.json();
        
        if(data.hasOwnProperty('errorMsgs')){
          setErrorMessage(data.errorMsgs);
        }
        else alert("Registered successfully! Redirecting to login page.");
        router.push('/login')

      } catch (error) {
        alert("Something went wrong. Please try again later.")
      }

    }
  }

  return (
    <>
      <Head>
        <title>BlogFiesta! | Register</title>
      </Head>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Register</h2>
        <div className={styles.errorDisplay}>
          {errorMessage.map((error) => {
            return <div key={error}>{error}</div>;
          })}
        </div>
        <label htmlFor="fname">
          Enter full name:
          <input
            type="text"
            name="fname"
            id="fname"
            aria-label="Full name"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.currentTarget.value);
            }}
            required
          />
        </label>
        <label htmlFor="email">
          Enter email:
          <input
            type="email"
            name="email"
            id="email"
            aria-label="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            required
          />
        </label>

        <label htmlFor="password">
          Enter password:
          <input
            type="password"
            name="password"
            id="password"
            aria-label="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            required
          />
        </label>
        <label htmlFor="cpassword">
          Confirm password:
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            aria-label="Re-enter password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.currentTarget.value);
            }}
            placeholder="Re-enter password"
            required
          />
        </label>

        <button type="submit">Register</button>
        <Link href="/login">
          <a>Have an account already? Login Here!</a>
        </Link>
      </form>
    </>
  );
}
