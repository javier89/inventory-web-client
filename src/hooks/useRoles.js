"use client";

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {actualizarRol, asignarPermisoRol, crearRol, eliminarRol, obtenerRolPermisos, obtenerRoles} from "@/services/roles.service";

export function useRoles(){
    const queryClient = useQueryClient();

    const rolesQuery=useQuery({
        queryKey:["roles"],
        queryFn: obtenerRoles,
    });
    

    const permisosQuery=useQuery({
        queryKey:["permisos"],
        queryFn: obtenerPermisos,
    });

    const crearMutation=useMutation({
        mutationFn: crearRol,
        
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["roles"],
            });
        },
    });

    const actualizarMutation=useMutation({
        mutationFn: actualizarRol,

        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["roles"],
            });
        },
    });

    const eliminarMutation=useMutation({
        mutationFn: eliminarRol,

        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["roles"],
            });
        },
    });

    const asignarPermisosMutation=useMutation({
        mutationFn: asignarPermisoRol,

        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["roles"],
            });
        },
    });

    return {
        roles:rolesQuery.data || [],
        permisos: permisosQuery.data || [],

        obtenerRolPermisos,

        loadingCatalogos: rolesQuery.isLoading || permisosQuery.isLoading,

        errorCatalogos: rolesQuery.error || permisosQuery.error,

        crearRol: crearMutation.mutateAsync,
        actualizarRol: actualizarMutation.mutateAsync,
        eliminarRol: eliminarMutation.mutateAsync,

        asignarPermisos: asignarPermisosMutation.mutateAsync,

        crear: crearMutation.isPending,
        actualizar: actualizarMutation.isPending,
        eliminar: eliminarMutation.isPending,

        guardarPermisos: asignarPermisosMutation.isPending,
    };
}

