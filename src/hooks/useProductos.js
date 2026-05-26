"use client"
import {useQuery, useMutation } from "@tanstack/react-query";
import { fetchProductos, eliminarProducto } from "@/services/productos.service";

export function useProductos({ page, search, orderBy }){
    const query = useQuery({
        queryKey:[
            "productos",
            page,
            search,
            orderBy
        ],
        queryFn: fetchProductos,
    });

    const eliminarMutation = useMutation({
        mutationFn: eliminarProducto,
        onSuccess:()=>query.refetch(),
    });

    return {
        productos: query.data?.data || [],
        totalPages: query.data?.totalPages || 1,

        loading: query.isLoading,
        error: query.error,
        isError: query.isError,

        eliminar: eliminarMutation.mutate,
    };
}