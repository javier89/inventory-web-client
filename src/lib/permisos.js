export function obtenerUsuario(){
    if(typeof window == "undefined"){
        return null;
    }

    const usuarioGuardado = localStorage.getItem("usuario");

    if(!usuarioGuardado){
        return null;
    }

    try{
        return JSON.parse(usuarioGuardado);
    }catch{
        return null;
    }
}

export function tienePermiso(codigoPermiso){
    const usuario=obtenerUsuarioLocal();

    if(!usuario){
        return false;
    }
    
    const permisos = usuario.permisos || [];

    return permisos.includes(codigoPermiso);
}

export function tieneAlgunPermiso(codigos=[]){
    return codigos.some((codigo)=> tienePermiso(codigo));
}