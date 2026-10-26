export function dtoRdg() {

    const rdgCreate = {
        idRdg: 0,
        actividad: '',
        al: '',
        del: '',
        detalle: '',
        devolver: '',
        estado: '',
        fecha: '',
        formato: '',
        gasto: 0,
        gestion: 0,
        idSrf: 0,
        importe: 0,
        moneda: '',
        numero: 0,
        participantes: '',
        rembolso: 0,
        saldo: 0,
        tc: 0,
        nombre: '',
        idp: '',
        cargo: '',
        area: '',
        tipo: '',
        cuenta: '',
        banco: '',
        centrocostos: '',
        codigo: '',
        cuentaGasto: [],
        numeroSrf: '',
        gestionSrf: 0,
        factura: [],
    }

    const rdgRevisar = {
        idRdg: 0,
        idSrf: 0,
        numero: '',
        gestion: 0,
        actividad: '',
        fecha: '',
        al: '',
        del: '',
        detalle: '',
        area: '',
        cargo: '',
        centrocostos: '',
        codigo: '',
        estado: '',
        formato: '',
        devolver: 0,
        gasto: 0,
        importe: 0,
        rembolso: 0,
        saldo: 0,
        tc: 0,
        moneda: '',
        participantes: '',
        tipoCuenta: '',
        cuenta: '',
        banco: '',
        factura: [],
        deposito:[],
        aprobadores: [],
        resumen: [],
        nombre: '',
        idp: '',
        estadoAprobacion: false,
        idAprobacion: 0,
        destinoAprobacion: 0,
        boton: true
    }
    const rdgDetalle = {
        idRdg: 0,
        idSrf: 0,
        numero: '',
        gestion: 0,
        actividad: '',
        fecha: '',
        al: '',
        del: '',
        detalle: '',
        area: '',
        cargo: '',
        centrocostos: '',
        codigo: '',
        estado: '',
        formato: '',
        devolver: 0,
        gasto: 0,
        importe: 0,
        rembolso: 0,
        saldo: 0,
        tc: 0,
        moneda: '',
        participantes: '',
        tipoCuenta: '',
        cuenta: '',
        banco: '',
        factura: [],
        deposito:[],
        aprobadores: [],
        resumen: [],
        pdf: false,
        editar: false,
        devuelto: false,
        nombre: '',
        idp: '',
        estadoAprobacion: false,
        idAprobacion: 0,
        destinoAprobacion: 0,
        boton: true,
        isEdit: false,
        minFecha: null,
        token: ''
    }
    const documento = {
        idDetalle: 0,
        fecha: '',
        importe: 0,
        moneda: '',
        documento: '',
        archivo: '',
        estado: '',
        token: ''
    }

    //====================================
    //=    FUNCIONES
    //=====================================
    const getRdgCreate = (data) => {
        rdgCreate.idRdg = data.idRdg
        rdgCreate.actividad = data.actividad
        rdgCreate.al = data.al !== null ? data.al.split('T')[0] : ''
        rdgCreate.del = data.del !== null ? data.del.split(' ')[0] : ''
        rdgCreate.detalle = data.detalle
        rdgCreate.devolver = data.devolver
        rdgCreate.estado = data.estado
        rdgCreate.fecha = data.fecha
        rdgCreate.formato = data.formato
        rdgCreate.gasto = data.gasto
        rdgCreate.gestion = data.gestion
        rdgCreate.idSrf = data.idSrf
        rdgCreate.importe = data.importe
        rdgCreate.moneda = data.moneda
        rdgCreate.numero = data.numero
        rdgCreate.participantes = data.participantes
        rdgCreate.rembolso = data.rembolso
        rdgCreate.saldo = data.saldo
        rdgCreate.tc = data.tc
        rdgCreate.nombre = data.nombre
        rdgCreate.idp = data.idp
        rdgCreate.cargo = data.cargo
        rdgCreate.area = data.area
        rdgCreate.tipo = data.tipo
        rdgCreate.cuenta = data.cuenta
        rdgCreate.banco = data.banco
        rdgCreate.centrocostos = data.centrocostos
        rdgCreate.codigo = data.codigo
        rdgCreate.cuentaGasto = data.cuentaGasto
        rdgCreate.numeroSrf = data.numeroSrf
        rdgCreate.gestionSrf = data.gestionSrf
        rdgCreate.factura = data.factura
        return rdgCreate
    }
    const getRdgRevisar = (data) => {
        rdgRevisar.idRdg = data.idRdg
        rdgRevisar.idSrf = data.idSrf
        rdgRevisar.numero = data.numero
        rdgRevisar.gestion = data.gestion
        rdgRevisar.actividad = data.actividad
        rdgRevisar.fecha = data.fecha
        rdgRevisar.al = data.al !== null ? data.al.split('T')[0] : ''
        rdgRevisar.del = data.del !== null ? data.del.split('T')[0] : ''
        rdgRevisar.detalle = data.detalle
        rdgRevisar.area = data.area
        rdgRevisar.cargo = data.cargo
        rdgRevisar.centrocostos = data.centrocostos
        rdgRevisar.codigo = data.codigo
        rdgRevisar.estado = data.estado
        rdgRevisar.formato = data.formato
        rdgRevisar.devolver = data.devolver
        rdgRevisar.gasto = data.gasto
        rdgRevisar.importe = data.importe
        rdgRevisar.rembolso = data.rembolso
        rdgRevisar.saldo = data.saldo
        rdgRevisar.tc = data.tc
        rdgRevisar.moneda = data.moneda
        rdgRevisar.participantes = data.participantes
        rdgRevisar.tipoCuenta = data.tipoCuenta
        rdgRevisar.cuenta = data.cuenta
        rdgRevisar.banco = data.banco

        rdgRevisar.factura = data.factura
        rdgRevisar.deposito = data.deposito
        rdgRevisar.aprobadores = data.aprobadores
        rdgRevisar.resumen = data.resumen

        rdgRevisar.nombre = data.nombre
        rdgRevisar.idp = data.idp
        rdgRevisar.estadoAprobacion = data.estadoAprobacion
        rdgRevisar.idAprobacion = data.idAprobacion
        rdgRevisar.destinoAprobacion = data.destinoAprobacion
        rdgRevisar.boton = true
        return rdgRevisar
    }
    const getRdgDetalle = (data) => {
        rdgDetalle.idRdg = data.idRdg
        rdgDetalle.idSrf = data.idSrf
        rdgDetalle.numero = data.numero
        rdgDetalle.gestion = data.gestion
        rdgDetalle.nombre = data.nombre
        rdgDetalle.idp = data.idp
        rdgDetalle.actividad = data.actividad
        rdgDetalle.fecha = data.fecha
        rdgDetalle.al = data.al !== null ? data.al.split('T')[0] : ''
        rdgDetalle.del = data.del !== null ? data.del.split('T')[0] : ''
        rdgDetalle.detalle = data.detalle
        rdgDetalle.area = data.area
        rdgDetalle.cargo = data.cargo
        rdgDetalle.centrocostos = data.centrocostos
        rdgDetalle.codigo = data.codigo
        rdgDetalle.estado = data.estado
        rdgDetalle.formato = data.formato
        rdgDetalle.devolver = data.devolver
        rdgDetalle.gasto = data.gasto
        rdgDetalle.importe = data.importe
        rdgDetalle.rembolso = data.rembolso
        rdgDetalle.saldo = data.saldo
        rdgDetalle.tc = data.tc
        rdgDetalle.moneda = data.moneda
        rdgDetalle.participantes = data.participantes
        rdgDetalle.tipoCuenta = data.tipoCuenta
        rdgDetalle.cuenta = data.cuenta
        rdgDetalle.banco = data.banco
        rdgDetalle.factura = data.factura
        rdgDetalle.deposito = data.deposito
        rdgDetalle.aprobadores = data.aprobadores
        rdgDetalle.resumen = data.resumen
        rdgDetalle.pdf = data.pdf
        rdgDetalle.editar = data.editar
        rdgDetalle.devuelto = data.devuelto
        rdgDetalle.boton = rdgDetalle.editar ? false : true
        rdgDetalle.isEdit = false
        rdgDetalle.minFecha = null
        rdgDetalle.token = data.token || 'no hay '
        return rdgDetalle
    }
    const getRdg = (data) => {
        rdgDetalle.idRdg = data.id
        rdgDetalle.idSrf = data.nombre
        rdgDetalle.numero = data.numero
        rdgDetalle.gestion = data.gestion
        rdgDetalle.actividad = data.actividad
        rdgDetalle.fecha = data.fecha
        rdgDetalle.al = data.al !== null ? data.al.split('T')[0] : ''
        rdgDetalle.del = data.del !== null ? data.del.split('T')[0] : ''
        rdgDetalle.detalle = data.detalle
        rdgDetalle.area = data.area
        rdgDetalle.cargo = data.cargo
        rdgDetalle.centrocostos = data.centrocostos
        rdgDetalle.codigo = data.codigo
        rdgDetalle.estado = data.estado
        rdgDetalle.formato = data.formato
        rdgDetalle.devolver = data.devolver
        rdgDetalle.gasto = data.gasto
        rdgDetalle.importe = data.importe
        rdgDetalle.rembolso = data.rembolso
        rdgDetalle.saldo = data.saldo
        rdgDetalle.tc = data.tc
        rdgDetalle.moneda = data.moneda
        rdgDetalle.participantes = data.participantes
        rdgDetalle.tipoCuenta = data.tipoCuenta
        rdgDetalle.cuenta = data.cuenta
        rdgDetalle.banco = data.banco
        rdgDetalle.factura = data.factura
        rdgDetalle.aprobadores = data.aprobadores
        rdgDetalle.token = data.token || 'no hay '

        return rdgDetalle
    }
    const getDocumento = (data) => {
        documento.idDetalle = data.idDetalle
        documento.fecha = data.fecha
        documento.importe = data.importe
        documento.moneda = data.moneda
        documento.documento = data.documento
        documento.archivo = data.archivo
        documento.estado = data.estado
        documento.token = data.token
        return documento
    }
    return {
        getRdgCreate,
        getRdgRevisar,
        getRdgDetalle,
        getRdg,
        getDocumento
    }
}