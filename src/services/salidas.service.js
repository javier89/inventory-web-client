import { graphqlRequest } from "@/lib/graphqlClient";

export async function crearSalidaProducto(input){
    const mutation = `
     mutation CrearSalidaProducto($input: crearSalidaInput!) {
        crearSalidaProducto(input: $input){
            id_salida
            motivo
            id_empleado
            Detalle_Salida{
                id_producto
                cantidad
            }
        }
     }
    `;

    const data = await graphqlRequest(mutation, { input });
    return data.crearSalidaProducto;
}

export async function obtenerMovimientosSalida(){
    const query = `
        query{
            movimientosSalida{
                id_movimiento
                fecha_movimiento
                tipo_movimiento
                cantidad
                stock_anterior
                stock_nuevo
                producto{
                    nombre
                }
                empleado{
                    nombre
                }
            }
        }
    `;
    const data=await graphqlRequest(query);
    return data.movimientosSalida;
}

export async function obtenerEmpleados(){
    const query=`
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

export async function obtenerProductosParaSalida(){
    const query = `
        query{
            productos{
                data{
                    id_producto
                    nombre
                    stock
                }
            }
        }
    `;

    const data = await graphqlRequest(query);
    return data.productos.data;
}