"use client"

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {crearSalidaProducto, obtenerMovimientosSalida, obtenerEmpleados, obtenerProductosParaSalida} from "@/services/salidas.service";

export function useSalidas(){
    const queryClient = useQueryClient();

    const empleadosQuery = useQuery({
        queryKey: ["empleados"],
        queryFn: obtenerEmpleados,
    });

    const productosQuery = useQuery({
        queryKey: [ "productos-salida"],
        queryFn: obtenerProductosParaSalida,
    });

    const movimientosSalidaQuery=useQuery({
        queryKey:["Movimientos-salida"],
        queryFn: obtenerMovimientosSalida,
    });

    const crearSalidaMutation = useMutation({
        mutationFn: crearSalidaProducto,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["Productos-salida"]
            });
            queryClient.invalidateQueries({
                queryKey: ["movimientos-salida"]
            });
        },
    });

    return {
        empleados: empleadosQuery.data || [],
        productos: productosQuery.data || [],
        movimientosSalida: movimientosSalidaQuery.data || [],

        loadingCatalogos:
            empleadosQuery.isLoading || productosQuery.isLoading,
        
        loadingMovimientos: movimientosSalidaQuery.isLoading,
        errorCatalogos:empleadosQuery.error || productosQuery.error,
        errorMovimientos: movimientosSalidaQuery.error,

        crearSalida: crearSalidaMutation.mutateAsync,
        loading: crearSalidaMutation.isPending,
        error: crearSalidaMutation.error,
        success: crearSalidaMutation.isSuccess,
    };
}