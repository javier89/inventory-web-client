import {graphqlRequest} from "@/lib/graphqlClient";

export async function obtenerEmpleados(){
    const query = `
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

export async function crearEmpleado({nombre, cargo}){
    const mutation=`
        mutation crearEmpleado( $nombre: String!, $cargo: String!){
            crearEmpleado(nombre: $nombre, cargo: $cargo){
                id_empleado
                nombre
                cargo
            }
        }
    `;

    const data = await graphqlRequest(mutation,{
        nombre,
        cargo,
    });
    return data.empleado;
}


export async function actualizarEmpleado({id_empleado, nombre, cargo }){
    const mutation=`
        mutation actualizarEmpleado(
            $id_empleado: ID!
            $nombre: String!
            $cargo: String!
        ){
            actualizarEmpleado(
                id_empleado: $id_empleado
                nombre: $nombre
                cargo: $cargo
            ){
                id_empleado
                nombre
                cargo
            }
        }
    `;
    const data = await graphqlRequest(mutation,{
        id_empleado,
        nombre,
        cargo,
    });

    return data.actualizarEmpleado;
}

export async function eliminarEmpleado(id_empleado){
    const mutation=`
        mutation eliminarEmpleado($id_empleado: ID!){
            eliminarEmpleado(id_empleado: $id_empleado)
        }
    `;

    const data = await graphqlRequest(mutation, {
        id_empleado,
    });

    return data.eliminarEmpleado;
}