import {graphqlRequest} from "@/lib/graphqlClient.js";

// =========================
// Obtener productos
// =========================
export async function fetchProductos({
    queryKey
}){
    const[

        _key,
        page,
        search,
        orderBy,

    ] = queryKey;

    const query=`
        query(
            $page:Int,
            $filters: ProductoFilterInput,
            $orderBy: ProductoOrderByInput
        ){
            productos(
                page: $page,
                filters: $filters,
                orderBy: $orderBy
            ){
                data{
                    id_producto
                    sku
                    nombre
                    stock
                }
                totalPages
            }
        }
    `;
    
    const data = await graphqlRequest(
        query,
        {
            page,
            filters:{search},
            orderBy,
        }
    );
    return data.productos;
}

// =========================
// Eliminar productos
// =========================
export async function eliminarProducto(id){
    const mutation=`
        mutation eliminarProducto ($id: ID!){
            eliminarProducto(
                id_producto: $id
            )
        }
    `;
    const data = await graphqlRequest(
        mutation,
        {id}
    );

    return data.eliminarProducto;
}