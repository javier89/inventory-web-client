"use client"

import {useRouter} from "next/navigation";

export function useLogout(){
    const router = useRouter();

    const logout=()=>{
        document.cookie = "token=; max-age=0; path=/";
        localStorage.removeItem("usuario");
        router.push("/login");

    };

    return {logout};
}