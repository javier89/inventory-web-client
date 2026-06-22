const API = process.env.NEXT_PUBLIC_API_URL;

export async function graphqlRequest(
    query,
    variables={}
){
    try{
        // =========================
        // Token JWT
        // =========================
        const token = typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

        // =========================
        // Request
        // =========================
        const res = await fetch(API,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",

                Authorization:token
                ? `Bearer ${token}`
                : "",
            },

            body:JSON.stringify({
                query,
                variables,
            }),
        });

        // =========================
        // Parse JSON
        // =========================
        const json = await res.json();

        // =========================
        // Debug DEV
        // =========================
        if(
            process.env.NODE_ENV == "development"
        ){
            console.log(
                "GRAPHQL RESPONSE:",
                json
            );
        }


        // =========================
        // Error HTTP
        // =========================
        if(!res.ok){
            throw new Error(
                json?.errors?.[0]?.message || 
                `HTTP Error ${res.status}`
            );
        }

        


        // =========================
        // Error GraphQL
        // =========================
        if(json.errors?.length > 0){
            throw new Error(
                json.errors[0].message
            );
        }


        // =========================
        // Success
        // =========================
        return json.data;

    } catch (error){
        if(process.env.NODE_ENV==="development"){
            console.warn(
                "GraphQl Validation:",
                error.message
            );
        }
        
        throw error;
    }
}