import { useRouter } from "next/router";
import { trigger } from "swr";

export default function Logout(){
    document.cookie += "; max-age=0";
    const router = useRouter();
    router.push('/'); 
    return (<></>)
}