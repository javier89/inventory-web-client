"use client";

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import {obtenerEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado} from "@/services/empleados.service";


export function useEmpleados(){
    const queryClient=useQueryClient();

    const empleadosQuery=useQuery({
        queryKey:["empleados"],
        queryFn:obtenerEmpleados,
    });

    const crearMutation= useMutation({
        mutationFn: crearEmpleado,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["empleados"],
            });
        },
    });

    const actualizarMutation=useMutation({
        mutationFn: actualizarEmpleado,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["empleados"],
            });
        },
    });

    const eliminarMutation=useMutation({
        mutationFn: eliminarEmpleado,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["empleados"],
            });
        },
    });

    return {
        
        empleados: empleadosQuery.data || [],
        isLoading: empleadosQuery.isLoading,
        error: empleadosQuery.error,

        crearEmpleado: crearMutation.mutateAsync,
        actualizarEmpleado: actualizarMutation.mutateAsync,
        eliminarEmpleado: eliminarMutation.mutateAsync,

        creando: crearMutation.isPending,
        actualizando: actualizarMutation.isPending,
        eliminando: eliminarMutation.isPending,
    };
}