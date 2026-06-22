import { NextResponse } from "next/server";

export function proxy(request){
    
      //===============
     // Obtener token 
    //===============

    const token = request.cookies.get("token");

     //===============
    // Ruta Actual 
   //===============

   const pathname= request.nextUrl.pathname;

     //===============
    // Rutas Protegidas
   //===============

   const protectedRoutes = [
    "/asignaciones", 
    "/dashboard",
     "/empleados",
     "/productos",
     "/salidas",
   ];
   
     //===============
    // Verificar Proteccion
   //===============

   const isProtected=protectedRoutes.some((route)=>pathname.startsWith(route));
     
     //===============
    // Sin token
   //===============
  if(isProtected && !token){
    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }

     //===============
    // Continuar
   //===============
  return NextResponse.next();

}

     //===============
    // config Matcher
   //===============

export const config={
  matcher:[
    "/asignaciones/:path*",
    "/dashboard/:path*",
    "/empleados/:path*",
    "/productos/:path*",
    "/salidas/:path*",
  ],
};