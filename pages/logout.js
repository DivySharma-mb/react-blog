import { useRouter } from "next/router";

export default function Logout(){
    document.cookie += "; max-age=0";
    const router = useRouter();
    router.push('/'); 
    return (<></>)
}