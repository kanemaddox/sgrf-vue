export function dtoRegistro() {

    const registro = {
        banco:[],
        cargo:[],
        estructura:[],
        jefe:[],
        profesion:[],
        pago:[]
    }

    //======================================
    //= FUNCIONES
    //======================================
    const getRegistro = (data) => {
        registro.banco = data.banco
        registro.cargo = data.cargo
        registro.estructura = data.estructura
        registro.jefe = data.jefe
        registro.profesion = data.profesion
        registro.pago = data.pago
        return registro
    }
    return {
        getRegistro
    }

}