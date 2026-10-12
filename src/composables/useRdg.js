import { ref, reactive } from 'vue'
import {saveRdgService,getRdgEstadoService, updateRdgSolicitudService, getRdgDetalleService,getRdgListaService,updateRdgService, createRdgService, getRdgUsuarioService, getRdgUsuarioEstadoService, getRdgService } from '@/services/rdgService'
import { getDocumentoPublicoService,getRdgPublicoService } from '@/services/publicoService'

import { useAlert } from '@/composables/useAlert'
const { confirm, error, success } = useAlert()

import { useFunction } from '@/composables/useFunction'
const { formatearNumero, getColor, getIcono, getEstado } = useFunction()

import { dtoRdg } from '@/composables/Dto/dtoRdg'
const { getDocumento,getRdg,getRdgDetalle,getRdgCreate } = dtoRdg()

export const useRdg = () => {
    const loadingRdg = ref(false)
    const errorRdg = ref(null)
    const listaRdg = ref([])
    const rdg = reactive({})
    const estado = reactive([])

    const getRdgUsuarioEstadoUse = async (idUsuario, estado) => {
        loadingRdg.value = true
        errorRdg.value = null
        listaRdg.value = []
        try {
            const resultLista = await getRdgUsuarioEstadoService(idUsuario, estado)
            const lista = resultLista.data
            listaRdg.value = lista.map(item => ({
                id: item.id,
                datos: {
                    numero: item.numero,
                    gestion: item.gestion,
                },
                detalle: {
                    actividad: item.actividad,
                    importe: formatearNumero(item.importe),
                    moneda: item.moneda,
                    fechaS: item.fechaSolicitud,
                    fechaA:item.fechaCreacion.slice(0,10) +" "+item.fechaCreacion.slice(11,19),
                },
                estado: {
                    estado: item.estado,
                    color: getColor(estado),
                    icon: getIcono(estado)
                },
                acciones: {
                    id: item.token,
                    estado: item.estado
                }
            }))
        } catch (errr) {
            errorRdg.value = errr
        } finally {
            loadingRdg.value = false
        }
    }

    const getRdgListaUse = async (idPersona, estado) => {
        loadingRdg.value = true
        errorRdg.value = null
        listaRdg.value = []
        try {
            const lista  = await getRdgListaService(idPersona, estado)
            listaRdg.value = lista.data.map(item => ({
                id: item.id,
                datos: {
                    numero: item.numero,
                    gestion: item.gestion,
                    importe: formatearNumero(item.importe),
                    moneda: item.moneda,
                    fecha:item.fecha,
                },
                detalle: {
                    detalle: item.detalle,
                    actividad:item.actividad,
                    moneda: item.moneda,
                    gasto:formatearNumero(item.gasto),
                    saldo:formatearNumero(item.saldo),
                    rembolso:formatearNumero(item.rembolso),
                    devolver:formatearNumero(item.devolver),
                },
                estado: {
                    estado: item.estado,
                    color: getColor(estado),
                    icon: getIcono(estado)
                },
                acciones: {
                    id: item.token,
                    estado: item.estado
                }
            }))
        } catch (errr) {
            errorRdg.value = errr
        } finally {
            loadingRdg.value = false
        }
    }

    const getRdgUse = async (value) => {
        loadingRdg.value = true
        errorRdg.value = null
        try {
            const { data } = await getRdgService(value)
            Object.assign(rdg, getRDG(data))
        } catch (errr) {
            errorRdg.value = errr
        } finally {
            loadingRdg.value = false
        }
    }

    const getRdgUsuarioUse = async (idRdg, persona) => {
        loadingRdg.value = true
        errorRdg.value = null
        try {
            const { data } = await getRdgUsuarioService(idRdg, persona)
            Object.assign(rdg, getRdgCreate(data))
        } catch (errr) {
            errorRdg.value = errr
        } finally {
            loadingRdg.value = false
        }
    }

    const createRdgUse = async (datos,idPersona) => {
        loadingRdg.value = true
        errorRdg.value = null

        const request = {
            "idPersona": idPersona,
            "actividad": datos.actividad,
            "fecha":datos.fecha,
            "al": datos.al,
            "del": datos.del,
            "detalle": datos.detalle,

            "area": datos.area,
            "cargo": datos.cargo,
            "centrocostos": datos.centrocostos,
            "codigo": datos.codigo,

            "estado": "PENDIENTE",
            "formato": datos.formato,

            "devolver": datos.devolver,
            "gasto": datos.gasto,
            "importe": datos.importe,
            "rembolso": datos.rembolso,
            "saldo": datos.saldo,
            "tc": datos.tc,
            "moneda": datos.moneda,
            "participantes": datos.participantes,
            "tipoCuenta": datos.tipo,
            "banco": datos.banco,
            "cuenta": datos.cuenta,
            "factura": datos.facturas
        }
        const resultAlert = await confirm('Crear Rencicion de Cuentas', 'Desea crear y enviar el Formulario ????', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await createRdgService(request)
                if (resultService.status == 201) {
                    await success('Well Done !!', 'Formulario de rendicion de cuentas creada con exito, el formulario se envio a su inmediato superior')
                    return true
                } else {
                    await error('Error !!!', 'Datos Inconsistentes', 'Revice e intente nuevamente')
                    return false
                }

            } catch (errr) {
                errorRdg.value = errr
                await error('Error !!!!!', 'Servicio No disponible', '')
                return false
            } finally {
                loadingRdg.value = false
            }
        } else {
            await error('Error !!!!!', 'Datos Cancelados', '')
            return false
        }
    }

    const saveRdgUse = async (datos,idPersona) => {
        loadingRdg.value = true
        errorRdg.value = null

        const response = {
            "idRdg":datos.idRdg,
            "idSrf":datos.idSrf,
            "idPersona": idPersona,

            "actividad": datos.actividad,
            "fecha":datos.fecha,
            "al": datos.al,
            "del": datos.del,
            "detalle": datos.detalle,
            "area": datos.area,

            "cargo": datos.cargo,
            "centrocostos": datos.centrocostos,
            "codigo": datos.codigo,

            "estado": "TRAMITE",
            "formato": datos.formato,

            "devolver": datos.devolver,
            "gasto": datos.gasto,
            "importe": datos.importe,
            "rembolso": datos.rembolso,
            "saldo": datos.saldo,
            "tc": datos.tc,
            "moneda": datos.moneda,
            "participantes": datos.participantes,
            "tipoCuenta": datos.tipo,
            "banco": datos.banco,
            "cuenta": datos.cuenta,
            "factura": datos.facturas
        }
        const resultAlert = await confirm('Guardar Formulario de Rendicion de Cuentas??', 'El Formulario puede ser Editado o Modificado despues. Esta accion solo guarda la informacion no envia ni crea la Rendicion de Cuenta.', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await  saveRdgService(response)
                if (resultService.status == 200) {
                    await success('Well Done !!', 'Formulario de Rendicion de Cuentas Guardado con exito, puede editar la informacion en cualquier momento.')
                    return true
                } else {
                    await error('Error !!!', 'Datos Inconsistentes', 'Revice e intente nuevamente')
                    return false
                }

            } catch (errr) {
                errorRdg.value = errr
                await error('Error !!!!!', 'Servicio No disponible', errr)
                return false
            } finally {
                loadingRdg.value = false
            }
        } else {
            await error('Error !!!!!', 'Datos Cancelados', '')
            return false
        }
    }

    const updateRdgUse = async (datos,idPersona) => {
        loadingRdg.value = true
        errorRdg.value = null
        const response = {
            "idRdg": datos.idRdg,
            "idSrf": datos.idSrf,
            "idPersona": idPersona,
            "actividad": datos.actividad,
            "fecha":datos.fecha,
            "al": datos.al,
            "del": datos.del,
            "detalle": datos.detalle,
            "area": datos.area,
            "cargo": datos.cargo,
            "centrocostos": datos.centrocostos,
            "codigo": datos.codigo,
            "estado": "PENDIENTE",
            "formato": datos.formato,
            "devolver": datos.devolver,
            "gasto": datos.gasto,
            "importe": datos.importe,
            "rembolso": datos.rembolso,
            "saldo": datos.saldo,
            "tc": datos.tc || 0,
            "moneda": datos.moneda,
            "participantes": datos.participantes,
            "tipoCuenta": datos.tipo,
            "banco": datos.banco,
            "cuenta": datos.cuenta,
            "factura": datos.facturas,
            "deposito":datos.depositos 
        }
        const resultAlert = await confirm('Crear Rencicion de Cuentas', 'Desea crear y enviar el Formulario ????', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await updateRdgService(response)
                if (resultService.status == 200) {
                    await success('Well Done !!', 'Formulario de rendicion de cuentas creada con exito, el formulario se envio a su inmediato superior')
                    return true
                } else {
                    await error('Error !!!', 'Datos Inconsistentes', 'Revice e intente nuevamente')
                    return false
                }

            } catch (errr) {
                errorRdg.value = errr
                await error('Error !!!!!', 'Servicio No disponible', errr)
                return false
            } finally {
                loadingRdg.value = false
            }
        } else {
            await error('Error !!!!!', 'Datos Cancelados', '')
            return false
        }

    }
    const updateRdgSolicitudUse = async (datos,respaldo,facturas,idPersona)=>{
        loadingRdg.value = true
        errorRdg.value = null
        const response = {
            "idRdg": datos.idRdg,
            "idSrf": datos.idSrf,
            "idPersona": idPersona,
            "estado":"PENDIENTE",
            "actividad": datos.actividad || respaldo.actividad,
            "al": datos.al,
            "del": datos.del,
            "detalle": datos.detalle || respaldo.detalle,
            "moneda": datos.moneda,
            "participantes": datos.participantes || respaldo.participantes,
            "factura": facturas.factura,
            "devolver": Number(facturas.devolver),
            "gasto": Number(facturas.gasto),
            "rembolso": Number(facturas.rembolso),
            "saldo": Number(facturas.saldo),
            "token":datos.token
        }
        const resultAlert = await confirm('Actualizar Formulario', 'Desea Actualizar el Formulario ????', '')
        if (resultAlert.isConfirmed) {
            try {
                const resultService = await updateRdgSolicitudService(response)
                if (resultService.status == 200) {
                    await success('Well Done !!', 'Formulario Actualizado Con Exito, se envio el formulario para su Aprobacion')
                    return true
                } else {
                    await error('Error !!!', 'Datos Inconsistentes', 'Revice e intente nuevamente')
                    return false
                }

            } catch (errr) {
                errorRdg.value = errr
                await error('Error !!!!!', 'Servicio No disponible', errr)
                return false
            } finally {
                loadingRdg.value = false
            }
        } else {
            await error('Error !!!!!', 'Datos Cancelados', '')
            return false
        }
    }

    const getRdgDetalleUse = async (idRdg, persona) => {
        loadingRdg.value = true
        errorRdg.value = null
        try {
            const { data } = await getRdgDetalleService(idRdg, persona)
            Object.assign(rdg, getRdgDetalle(data))
        } catch (errr) {
            errorRdg.value = errr
        } finally {
            loadingRdg.value = false
        }
    }
    const getRdgEstadoUse = async (idPersona)=>{
        loadingRdg.value = true
        errorRdg.value = null
        try {
            const { data } = await getRdgEstadoService(idPersona)            
            Object.assign(estado, data)
        } catch (errr) {
            errorRdg.value = errr
            throw errr
        } finally {
            loadingRdg.value = false
        }
    }

    const getRdgPublicoUse = async (value) => {
        loadingRdg.value = true
        errorRdg.value = null
        try {
            const { data } = await getRdgPublicoService(value)
            Object.assign(rdg, getRdg(data))
        } catch (errr) {
            errorRdg.value = errr
            if (errr.response?.status === 404) {
                router.push({name:'Page404'})
            }
        } finally {
            loadingRdg.value = false
        }
    }
    const getDocumentoPublicoUse = async (value) => {
        loadingRdg.value = true
        errorRdg.value = null
        try {
            const { data } = await getDocumentoPublicoService(value)
            Object.assign(rdg, getDocumento(data))
        } catch (errr) {
            errorRdg.value = errr
            if (errr.response?.status === 404) {
                router.push({name:'Page404'})
            }
        } finally {
            loadingRdg.value = false
        }
    }

    return {
        getRdgUsuarioEstadoUse,
        getRdgUse,
        getRdgUsuarioUse,
        updateRdgUse,
        createRdgUse,
        getRdgListaUse,
        getRdgDetalleUse,
        updateRdgSolicitudUse,
        getRdgEstadoUse,
        saveRdgUse,
        getRdgPublicoUse,
        getDocumentoPublicoUse,
        rdg,
        listaRdg,
        estado,
        loadingRdg,
        errorRdg
    }

}