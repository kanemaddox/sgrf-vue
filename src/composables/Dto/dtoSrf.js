export function dtoSrf() {
    const srf = {
        id: null,
        numero: '',
        gestion: '',
        fechaInicio: '',
        fechaFin: '',
        monto: 0,
        moneda: '',
        detalle: '',
        numerico: 0,
        texto: '',
        tipo: '',
        estado: false,
        nombre: '',
        idp: '',
        email:'',
        cargo: '',
        codigo: '',
        centrocosto: '',
        lista: [],
        idApr: 0,
        destino: '',
        estado: false,
        editar: false,
        pdf: false,
        obs: '',
        token: '',
        formato: {
            titulo: '',
            seccionUno: '',
            seccionDos: '',
            fechaTitulo: '',
            montoTitulo: '',
            descripcion: '',
            estadoComplemento: false,
            trueComplemento: false,
            complemento: '',
            detalleComplemento: '',
            cantidadComplemento: '',
            seccionTres: '',
            detalle: '',
            estadoTres: false
        }
    }
    const revisarSrf = {
        idApr: null,
        token: "",
        destino: "",
        estado: "",
        tipo: "",
        obs: "",
        fechaCreacion: "",
        fechaActualizacion: "",

        //formato
        titulo: "",
        seccionUno: "",
        seccionDos: "",
        fechaTitulo: "",
        montoTitulo: "",
        descripcion: "",
        estadoComplemento: false,
        complemento: "",
        detalleComplemento: "",
        cantidadComplemento: "",
        trueComplemento: false,
        cantidadSolicitudes: 0,
        seccionTres: "",
        estadoTres: false,
        detalleFormato: "",

        //empleado
        nombre: "",
        idp: "",
        cargo: "",
        codigo: "",
        centro: "",

        // srf
        idSrf: 0,
        numero: "",
        gestion: "",
        fechaSolicitud: "",
        fechaEstimada: "",
        monto: 0,
        moneda: "",
        detalle: "",
        campoTexto: "",
        campoNumerico: "",
        tokenSrf: "",

        autorizador: []
    }
    //====================================
    //=    FUNCIONES
    //=====================================

    const getSrf = (data) => {
        srf.id = data.id
        srf.idp = data.idp
        srf.nombre = data.nombre
        srf.email = data.email
        srf.numero = data.numero
        srf.gestion = data.gestion
        srf.fechaInicio = data.fechaSolicitud
        srf.fechaFin = data.fechaEstimada.split('T')[0]
        srf.monto = data.monto
        srf.moneda = data.moneda
        srf.detalle = data.detalle
        srf.numerico = data.campoNumerico
        srf.texto = data.campoTexto
        srf.tipo = data.tipo
        srf.estado = data.estado
        srf.lista = data.aprobadores
        srf.cargo = data.cargo
        srf.centrocosto = data.centrocosto
        srf.codigo = data.codigo
        srf.editar = data.edit
        srf.pdf = data.pdf
        srf.token = data.token
        srf.formato = data.formato
        return srf
    }
    const getSrfAprobacion = (data) => {
        revisarSrf.idApr = data.id
        revisarSrf.token = data.token
        revisarSrf.destino = data.destino
        revisarSrf.estado = data.estado
        revisarSrf.tipo = data.tipo
        revisarSrf.obs = data.obs
        revisarSrf.fechaCreacion = data.fechaCreacion
        revisarSrf.fechaActualizacion = data.fechaActualizacion

        //formato
        revisarSrf.titulo = data.titulo
        revisarSrf.seccionUno = data.seccionUno
        revisarSrf.seccionDos = data.seccionDos
        revisarSrf.fechaTitulo = data.fechaTitulo
        revisarSrf.montoTitulo = data.montoTitulo
        revisarSrf.descripcion = data.descripcion
        revisarSrf.estadoComplemento = data.estadoComplemento
        revisarSrf.complemento = data.complemento
        revisarSrf.detalleComplemento = data.detalleComplemento
        revisarSrf.cantidadComplemento = data.cantidadComplemento
        revisarSrf.trueComplemento = data.trueComplemento
        revisarSrf.cantidadSolicitudes = data.cantidadSolicitudes

        revisarSrf.seccionTres = data.seccionTres
        revisarSrf.estadoTres = data.estadoTres
        revisarSrf.detalleFormato = data.detalleFormato

        //empleado
        revisarSrf.nombre = data.nombre
        revisarSrf.idp = data.idp
        revisarSrf.cargo = data.cargo
        revisarSrf.codigo = data.codigo
        revisarSrf.centro = data.centro

        // srf
        revisarSrf.idSrf = data.idSrf
        revisarSrf.numero = data.numero
        revisarSrf.gestion = data.gestion
        revisarSrf.fechaSolicitud = data.fechaSolicitud
        revisarSrf.fechaEstimada = data.fechaEstimada.split('T')[0]
        revisarSrf.monto = data.monto
        revisarSrf.moneda = data.moneda
        revisarSrf.detalle = data.detalle
        revisarSrf.campoTexto = data.campoTexto
        revisarSrf.campoNumerico = data.campoNumerico
        revisarSrf.tokenSrf = data.tokenSrf
        revisarSrf.autorizador = data.autorizador
        return revisarSrf
    }
    return {
        getSrf,
        getSrfAprobacion
    }
}