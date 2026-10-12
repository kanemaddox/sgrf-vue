import { tokens } from "maska"

export function useDto() {
    const persona = {
        id: 0,
        idp: '',
        nombre: '',
        paterno: '',
        materno: '',
        celular: '',
        email: ''
    }
    const perfil = {
        idUsuario: 0,
        imagen: '',
        estado: false,
        pernicions: {
            id: 0,
            rol: null,
            pernicions: {}
        },
        rol: 'USER',
        idPersona: 0,
        idp: '',
        nombre: '',
        apellido: '',
        email: '',
        celular: '',
        idProfesion: 0,
        profesion: '',
        idCargo: 0,
        cargo: '',
        corporativo: '',
        estadoCargo: false,
        idCuentaBancaria: 0,
        idBanco: 0,
        banco: '',
        estadoBanco: '',
        idArea: 0,
        codigoArea: '',
        nombreArea: '',
        prefijo: '',
        tipoEmpleado: 'SUB',
        idJefe: 0,
        idpJefe: '',
        jefe: '',
    }
    const formatoSRF = {
        id: null,
        categoria: '',
        nombre: '',
        value: {
            cantidad: '0',
            titulo: '',
            seccionUno: '',
            seccionDos: '',
            fecha: '',
            monto: '',
            descripcion: '',
            estadoDos: false,
            cuidado: '',
            detalleDos: '',
            cantidadDos: '',
            seccionTres: '',
            detalle: '',
            estadoTres: false
        },
        fecha: ''
    }
    const perfilCuenta = {
        idPersona: 0,
        idp: '',
        nombre: '',
        email: '',
        celular: '',
        profesion: '',
        cargo: '',
        corporativo: '',
        centroCostos: '',
        subCentroCostos: '',
        codigo: '',
        idpJefe: '',
        jefe: ''
    }

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
        token:'',
        formato: {
            titulo: '',
            seccionUno: '',
            seccionDos: '',
            fecha: '',
            monto: '',
            descripcion: '',
            estadoDos: false,
            cuidado: '',
            detalleDos: '',
            cantidadDos: '',
            seccionTres: '',
            detalle: '',
            estadoTres: false
        }
    }
    

    const rdg = {
        idRdg: 0,
        actividad: '',
        al: '',
        del: '',
        detalle: '',
        devolver: '',
        estado: '',
        fecha: '',
        formato: '',
        gasto: '',
        gestion: 0,
        idSrf: 0,
        importe: 0,
        moneda: '',
        numero: '',
        participantes: '',
        rembolso: 0,
        saldo: 0,
        tc: 0,
        empleado: null
    }

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
        gestionSrf: 0
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
        aprobadores: [],
        pdf: false,
        editar: false,
        devuelto:false,
        nombre: '',
        idp: '',
        estadoAprobacion: false,
        idAprobacion: 0,
        destinoAprobacion: 0,
        boton:true
    }
    // funciones 
    const getPerfil = (data, url) => {
        perfil.idUsuario = data.idUsuario
        perfil.imagen = data.imagen != 'usuario.png' ? url + data.imagen : 'usuario.png'
        perfil.estado = data.estado
        perfil.pernicions.id = data.idUsuario
        perfil.pernicions.rol = data.rol
        perfil.pernicions.pernicions = data.pernicions

        perfil.rol = data.rol
        //persona
        perfil.idPersona = data.idPersona
        perfil.idp = data.idp
        perfil.nombre = data.nombre
        perfil.apellido = data.apellido
        perfil.email = data.email
        perfil.celular = data.celular || ''
        //Profesion
        perfil.idProfesion = data.idProfesion
        perfil.profesion = data.profesionNombre
        //Cargo
        perfil.idCargo = data.idCargo
        perfil.cargo = data.cargoNombre
        perfil.corporativo = data.emailEmpleado
        perfil.estadoCargo = data.estadoCargo
        perfil.tipoEmpleado = data.tipoEmpleado
        //Cuenta Bancaria
        perfil.idCuentaBancaria = data.idCuentaBancaria
        perfil.idBanco = data.idBanco
        perfil.banco = data.bancoNombre
        perfil.estadoBanco = data.estadoBanco
        perfil.numero = data.numero
        perfil.cuenta = data.tipoCuenta
        perfil.estadoCuentaBancaria = data.estadoCuentaBancaria
        //Area
        perfil.idArea = data.idArea
        perfil.codigoArea = data.codigoArea
        perfil.nombreArea = data.nombreArea
        perfil.prefijo = data.prefijoArea
        //Jefe
        perfil.idpJefe = data.idpJefe
        perfil.jefe = data.nombreJefe
        perfil.idJefe = data.idJefe

        return perfil
    }
    const getPersona = (data) => {
        persona.id = data.idPersona
        persona.idp = data.idp
        persona.nombre = data.nombre
        persona.paterno = data.apellido
        persona.materno = ''
        persona.celular = data.celular || ''
        persona.email = data.email
        return persona
    }
    const getFormatoSRF = (data) => {
        formatoSRF.id = data.id
        formatoSRF.categoria = data.categoria
        formatoSRF.nombre = data.nombre
        formatoSRF.fecha = data.fechaActualizacion
        formatoSRF.value.cantidad = data.value.cantidad
        formatoSRF.value.titulo = data.value.titulo
        formatoSRF.value.seccionUno = data.value.seccionUno
        formatoSRF.value.seccionDos = data.value.seccionDos
        formatoSRF.value.fecha = data.value.fecha
        formatoSRF.value.monto = data.value.monto
        formatoSRF.value.descripcion = data.value.descripcion
        formatoSRF.value.estadoDos = data.value.estadoDos
        formatoSRF.value.cuidado = data.value.cuidado
        formatoSRF.value.detalleDos = data.value.detalleDos
        formatoSRF.value.cantidadDos = data.value.cantidadDos
        formatoSRF.value.seccionTres = data.value.seccionTres
        formatoSRF.value.detalle = data.value.detalle
        formatoSRF.value.estadoTres = data.value.estadoTres
        return formatoSRF
    }
    
    const getSRF = (data) => {
        srf.id = data.id
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
    const getPerfilCuenta = (data) => {
        perfilCuenta.idPersona = data.idPersona
        perfilCuenta.idp = data.idp
        perfilCuenta.nombre = data.nombre
        perfilCuenta.email = data.email
        perfilCuenta.celular = data.celular
        perfilCuenta.profesion = data.profesion
        perfilCuenta.cargo = data.cargo
        perfilCuenta.corporativo = data.corporativo
        perfilCuenta.centroCostos = data.centroCostos
        perfilCuenta.subCentroCostos = data.subCentroCostos
        perfilCuenta.codigo = data.codigoSubCentro
        perfilCuenta.idpJefe = data.idpJefe
        perfilCuenta.jefe = data.jefe
        return perfilCuenta
    }

    const getRDG = (data) => {
        rdg.idRdg = data.idRdg
        rdg.actividad = data.actividad
        rdg.al = data.al
        rdg.del = data.del
        rdg.detalle = data.detalle
        rdg.devolver = data.devolver
        rdg.estado = data.estado
        rdg.fecha = data.fecha
        rdg.formato = data.formato
        rdg.gasto = data.gasto
        rdg.gestion = data.gestion
        rdg.idSrf = data.idSrf
        rdg.importe = data.importe
        rdg.moneda = data.moneda
        rdg.numero = data.numero
        rdg.participantes = data.participantes
        rdg.rembolso = data.rembolso
        rdg.saldo = data.saldo
        rdg.tc = data.tc
        rdg.empleado = data.empleado
        return rdg
    }

    const getRdgCreate = (data) => {
        rdgCreate.idRdg = data.idRdg
        rdgCreate.actividad = data.actividad
        rdgCreate.al = data.al !== null ? data.al.split('T')[0] : ''
        rdgCreate.del = data.del !== null ? data.del.split('T')[0] : ''
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
        return rdgCreate
    }

    return {
        getPerfil,
        getPersona,
        getFormatoSRF,
        getSRF,
        getRDG,
        getPerfilCuenta,
        getRdgCreate
    }
}