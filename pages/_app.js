import Header from "../components/Header";
import "../styles/globals.css";
import useSWR from "swr";
import userFetcher from "../SWR/useUser";

function MyApp({ Component, pageProps }) {
  const { data, error, isValidating } = useSWR("user", userFetcher, {
    initialData: {
      id: null,
      full_name: "Guest",
      email: "",
      role: "guest",
    },
    refreshInterval:5000,
  });
  return (
    <div className="container">
      <Header user={data} />
      <Component {...pageProps} user={data}/>
    </div>
  );
}

export default MyApp;
