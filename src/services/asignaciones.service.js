import {graphqlRequest} from "@/lib/graphqlClient.js";

export async function obtenerProductosAsignadosPorEmpleado(id_empleado){
    const query = `
        query ProductosAsignadosPorEmpleado($id_empleado: ID!){
            productosAsignadosPorEmpleado(id_empleado: $id_empleado){
                empleado {
                    id_empleado
                    nombre
                }
                productos{
                    id_producto
                    nombre
                    cantidad_total
                }
            }
        }
    `;

    const data=await graphqlRequest(query,{id_empleado});

    return data.productosAsignadosPorEmpleado;
}

export async function obtenerEmpleadosAsignaciones(){
    const query =`
        query{
            empleados{
                id_empleado
                nombre
                cargo
            }
        }
    `;
    const data = await graphqlRequest(query);
    return data.empleados;
}