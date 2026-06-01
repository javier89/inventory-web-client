import { graphqlRequest } from "@/lib/graphqlClient.js";

export async function loginUsuario({usuario, password }){
    const mutation=`
        mutation Login($usuario: String!, $password: String!){
            login(usuario: $usuario, password: $password){
                token
                usuario{
                    id_usuario
                    nombre
                    activo
                    rol{
                        nombre
                    }
                }
            }
        }
    `;

    const data = await graphqlRequest(mutation, {
        usuario,
        password,
    });

    return data.login;
}