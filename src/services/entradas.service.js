import {graphqlRequest} from "@/lib/graphqlClient.js";

export async function crearEntradaMercancia(input){
    const mutation=`
        mutation crearCompra($input: CrearCompraInput!){
            crearCompra(input: $input){
                id_compra
                fecha_compra
                total_compra
                num_factura
                form_pago
                id_proveedor
                estado
                detalles{
                    id_detalle
                    id_producto
                    cantidad
                    precio_producto
                    costo_total
                }
            }
        }
    `;

    const data = await graphqlRequest(mutation, {input});

    return data.crearCompra;
}

export async function cerrarEntradaMercancia(id_compra){
    const mutation = `
        mutation CerrarCompra($id_compra: ID!){
            cerrarCompra(id_compra: $id_compra){
                id_compra
                estado
                total_compra
                num_factura
            }
        }
    `;
    const data = await graphqlRequest(mutation, {id_compra});
    return data.cerrarCompra;
}

export async function obtenerProveedoresEntrada(){
    const query=`
        query{
            proveedores{
                id_proveedor
                nombre
            }
        }
    `;
    const data = await graphqlRequest(query);
    return data.proveedores;
}

export async function obtenerProductosEntrada(){
    const query=`
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
    const data=await graphqlRequest(query);
    return data.productos.data;
}