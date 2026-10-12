export function dtoFormato() {

    const formatoSRF = {
        id: null,
        categoria: '',
        nombre: '',
        formato: {
            cantidadSolicitudes: '0',
            titulo: '',
            seccionUno: '',
            seccionDos: '',
            fechaTitulo: '',
            montoTitulo: '',
            descripcion: '',
            complemento: '',
            estadoComplemento: false,
            detalleComplemento: '',
            cantidadComplemento: '',
            seccionTres: '',
            detalle: '',
            estadoTres: false,
            nivel:0,
            total:0
        },
        fecha: ''
    }

    //======================================
    //= FUNCIONES
    //======================================
    const getFormatoSRF = (data) => {
        formatoSRF.id = data.id
        formatoSRF.categoria = data.categoria
        formatoSRF.nombre = data.nombre
        formatoSRF.fecha = data.fechaActualizacion
        formatoSRF.formato.cantidadSolicitudes = data.value.cantidadSolicitudes
        formatoSRF.formato.titulo = data.value.titulo
        formatoSRF.formato.seccionUno = data.value.seccionUno
        formatoSRF.formato.seccionDos = data.value.seccionDos
        formatoSRF.formato.fechaTitulo = data.value.fechaTitulo
        formatoSRF.formato.montoTitulo = data.value.montoTitulo
        formatoSRF.formato.descripcion = data.value.descripcion
        formatoSRF.formato.complemento = data.value.complemento
        formatoSRF.formato.estadoComplemento = data.value.estadoComplemento
        formatoSRF.formato.detalleComplemento = data.value.detalleComplemento
        formatoSRF.formato.cantidadComplemento = data.value.cantidadComplemento
        formatoSRF.formato.seccionTres = data.value.seccionTres
        formatoSRF.formato.detalle = data.value.detalle
        formatoSRF.formato.estadoTres = data.value.estadoTres
        formatoSRF.formato.nivel = data.value.nivel
        formatoSRF.formato.total = data.value.total
        return formatoSRF
    }
    return {
        getFormatoSRF
    }

}