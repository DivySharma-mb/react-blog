import Header from '../components/Header'
import '../styles/globals.css';
import useSWR from 'swr';
import useUser from '../SWR/useUser'



function MyApp({ Component, pageProps }) {
  const {user, error, isValidating} = useUser()
  
  return (
    <div className="container">
    <Header />
    <Component {...pageProps} />
    </div>
  )
}

export default MyApp
