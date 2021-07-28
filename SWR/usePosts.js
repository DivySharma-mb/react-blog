import useSWR from "swr";

export default function usePosts(){
    const {data, error, isValidating} = useSWR('key', fetcher, {initialData:[]});
    return {posts:data, error, isValidating};
}

function fetcher(){
    return fetch('https://pure-depths-68215.herokuapp.com/api/all-posts').then(response => response.json());
}