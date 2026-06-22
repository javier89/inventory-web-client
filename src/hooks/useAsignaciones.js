"use client";

import {useQuery} from "@tanstack/react-query";
import { obtenerEmpleadosAsignaciones, obtenerProductosAsignadosPorEmpleado} from "@/services/asignaciones.service";

export function useAsignaciones(idEmpleado){
    const empleadosQuery=useQuery({
        queryKey: ["empleados-asignaciones"],
        queryFn: obtenerEmpleadosAsignaciones,
    });

    const asignacionQuery=useQuery({
        queryKey: ["Productos-Asignados", idEmpleado],
        queryFn: ()=>obtenerProductosAsignadosPorEmpleado(idEmpleado),
        enabled: !!idEmpleado,
    });

    return{
        empleados:empleadosQuery.data || [],
        loadingEmpleados: empleadosQuery.isLoading,
        errorEmpleados: empleadosQuery.error,

        asignacion: asignacionQuery.data || null,
        loadingAsignacion: asignacionQuery.isLoading, 
        errorAsignacion: asignacionQuery.error,
    };
}