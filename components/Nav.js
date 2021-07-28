import useUser from "../SWR/useUser";
import Link from "next/link";

export default function Nav() {
  const { user, error, isValidating } = useUser();
  return (
    <nav className="header-nav">
      <Link href="/">
        <a>Home</a>
      </Link>
      {user.id ? (
        <>
          <Link href={`/user/${user.id}`}>
            <a>Dashboard</a>
          </Link>
          <Link href="/logout">
            <a>Logout</a>
          </Link>  
        </>
      ) : (
        <>
          <Link href="/login">
            <a>Log In</a>
          </Link>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </>
      )}
    </nav>
  );
}
