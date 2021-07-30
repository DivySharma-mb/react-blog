import Link from "next/link";

export default function Nav({user}) {
  function logout(e){
    e.preventDefault();
    document.cookie += "; max-age=0";
  }
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
            <a onClick={logout} style={{cursor:'pointer'}} role="button">Logout</a>
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