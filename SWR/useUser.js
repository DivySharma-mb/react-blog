import useSWR from 'swr';

export default function useUser(){
    const {data, error} = useSWR('user', fetcher, {initialData:{
        id: null,
        full_name: 'Guest',
        email: '',
        role:'guest'
    }});
    return {
        user:data,
        isValidating: !data && !error,
        error
    };
}

function fetcher(key){
    if(document.cookie){
        const token = document.cookie.split('=')[1];
        return fetch("https://pure-depths-68215.herokuapp.com/api/details", {
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(response => response.json());
    } else {
        return new Promise((resolve, reject)=>{
            resolve({
                id: null,
                full_name: 'Guest',
                email: '',
                role:'guest'
            })
        })
    }
}