import {graphqlRequest} from "@/lib/graphqlClient.js";

export async function obtenerRoles(){
    const query=`
        query obtenerRoles {
            roles{
                id_rol
                nombre
                descripcion
                activo
                permisos {
                    id_permiso
                    codigo
                    nombre
                    descripcion
                    modulo
                    activo
                }
            }
        }
    `;

    const data = await graphqlRequest(query);

    return data.roles;
}

export async function obtenerPermisos(){
    const query=`
        query ObtenerPermisos{
            permisos {
                id_permiso
                codigo
                nombre
                descripcion
                modulo
                activo
            }
        }
    `;

    const data = await graphqlRequest(query);
    return data.permisos;
}

export async function crearRol({ nombre, descripcion }) {
    const mutation=`
        mutation CrearRol($data: CrearRolInput!){
            crearRol(data: $data){
                id_rol
                nombre
                descripcion
                activo
                permiso {
                    id_permiso
                    codigo
                    nombre
                    modulo
                }
            }
        }
    `;

    const data = await graphqlRequest(mutation, {
        data:{
            nombre,
            descripcion: descripcion || null,
        },
    });

    return data.crearRol;
}

export async function actualizarRol({
    id_rol,
    nombre,
    descripcion,
    activo,
}) {
    const mutation=`
        mutation ActualizarRol(
            $id_rol: ID!
            $data: actualizarRolInput!
        ) {
            actualizarRol(
                id_rol: $id_rol
                data: $data
            ){
                id_rol
                nombre
                descripcion
                activo
                permiso{
                    id_permiso
                    codigo
                    nombre
                    modulo
                }
            }
        }
    `;

    const data = await graphqlRequest(mutation, {
        id_rol,
        data:{
            nombre,
            descripcion: descripcion || null,
            activo,
        },
    });
    return data.actualizarRol;
}

export async function eliminarRol(id_rol){
    const mutation=`
        mutation EliminarRol($id_rol: ID!){
            eliminarRol(id_rol:$id_rol)
        }
    `;

    const data=await graphqlRequest(mutation,{
        id_rol,
    });

    return data.eliminarRol;
}

export async function asignarPermisoRol({
    id_rol,
    permisos,
}){
    const mutation=`
        mutation AsignarPermisosRol(
            $id_rol: ID!
            $permisos: [ID!]!
        ){
            asignarPermisosRol(
                id_rol: $id_rol
                permisos: $permisos
            ){
                id_rol
                nombre
                descripcion
                activo
                permisos {
                    id_permiso
                    codigo
                    nombre
                    descripcion
                    modulo
                    activo
                }
            }
        }
    `;

    const data=await graphqlRequest(mutation, {
        id_rol,
        permisos
    });

    return data.asignarPermisosRol;
}