"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUsuario } from "@/services/login.service";

export function useLogin(){
    const router = useRouter();

    const mutation=useMutation({
        mutationFn: loginUsuario,
        onSuccess:(data)=>{
            document.cookie=`token=${data.token}; path=/;`
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            router.push("/dashboard");
        },
    });

    return {
        login: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error,
    };
}