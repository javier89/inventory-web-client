"use client"

import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {crearEntradaMercancia, cerrarEntradaMercancia, obtenerProductosEntrada, obtenerProveedoresEntrada} from "@/services/entradas.service";

export function useEntradas(){
    const queryClient=useQueryClient();

    const proveedoresQuery = useQuery({
        queryKey:["proveedores-entrada"],
        queryFn: obtenerProveedoresEntrada,
    });

    const productosQuery=useQuery({
        queryKey:["productos-entrada"],
        queryFn: obtenerProductosEntrada,
    });

    const crearEntradaMutation=useMutation({
        mutationFn: crearEntradaMercancia,
    });

    const cerrarEntradaMutation=useMutation({
        mutationFn: cerrarEntradaMercancia,

        onSucces:()=>{
            queryClient.invalidateQueris({
                queryKey:["prodcutos-entrada"],
            });
            queryClient.invalidateQueries({
                queryKey:["prodcutos-salida"],
            });
        },
    });
    return {
        proveedores: proveedoresQuery.data || [],
        productos: productosQuery.data || [],

        loadingCatalogos: proveedoresQuery.isLoading || productosQuery.isLoading,

        errorCatalogos: proveedoresQuery.error || productosQuery.error,

        crearEntrada: crearEntradaMutation.mutateAsync,
        cerrarEntrada: cerrarEntradaMutation.mutateAsync,

        creando: crearEntradaMutation.isPending,
        cerrando: cerrarEntradaMutation.isPending,

        errorCrear: crearEntradaMutation.error,
        errroCerrar: cerrarEntradaMutation.error,

        entradaCreada: crearEntradaMutation.data || null,
    }
}