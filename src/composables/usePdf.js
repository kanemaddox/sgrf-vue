import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { useFunction } from '@/composables/useFunction'
import { crearSrfPdf } from '@/views/pdf/srfPdfLite'
const { formatearNumero, lenFirma, lenPdf } = useFunction()

export function usePdf() {
    pdfMake.vfs = pdfFonts.vfs
    
    const getSrfPdf = async ({ srf, datos, dominio, idpName}) => {
        
        const pdf = {
            titulo: srf.formato?.titulo,
            numero: srf.numero,
            fecha: 'Fecha de Solicitud : ' + srf.fechaInicio,
            gestion: datos.idp  + ' | ' + srf.gestion,

            seccionUno: srf.formato?.seccionUno,
            qr: dominio + '/#/pages/srfpublico/' + srf.token,
            nombre: datos.nombre,
            idp: datos.idp,
            idpName: (idpName.value || idpName) + ":",
            email: srf.email,
            cargo: srf.cargo,
            costo: srf.centrocosto,
            codigo: srf.codigo,

            seccionDos: srf.formato?.seccionDos,
            fechaTituloFin: srf.formato?.fechaTitulo + ' : ',
            fechafin: srf.fechaFin,
            montoTitulo: srf.formato?.montoTitulo + ' : ',
            monto: formatearNumero(srf.monto) + ' ' + srf.moneda,
            descripcion: srf.formato?.descripcion + " : ",
            detalle: srf.detalle,
            visibleDos: srf.formato?.trueEstadoDos,
            texto: srf.formato?.detalleDos + ' : ' + srf.texto,
            numerico: srf.formato.cantidadDos + ' : ' + srf.numerico,

            visibleTres: srf.formato.estadoTres,
            seccionTres: srf.formato.seccionTres,
            obs: srf.formato.detalle,

            jefe: {
                nombre: lenFirma(srf.lista[0].jefe.nombre + ' ' + srf.lista[0].jefe.paterno + ' ' + srf.lista[0].jefe.materno),
                idp: srf.lista[0].jefe.idp,
                cargo: lenPdf(srf.lista[0].cargo)
            },
            pago: {
                nombre: lenFirma(srf.lista[srf.lista.length - 1].jefe.nombre + ' ' + srf.lista[srf.lista.length - 1].jefe.paterno + ' ' + srf.lista[srf.lista.length - 1].jefe.materno),
                idp: srf.lista[srf.lista.length - 1].jefe.idp,
                cargo: lenPdf(srf.lista[srf.lista.length - 1].cargo)
            },
            nombreFirma: lenFirma(datos.nombre),
            cargofirma: lenPdf(srf.cargo),
        }

        const docDefinition = crearSrfPdf(pdf)
        const name = "srf"+datos.idp + '' + srf.id + '' + srf.numero + '.pdf'
        pdfMake.createPdf(docDefinition).download(name)
    }
    const getRdgDetallePdf = async ({ srf, datos, dominio, idpName}) => {
        
        const pdf = {
            titulo: srf.formato?.titulo,
            numero: srf.numero,
            fecha: 'Fecha de Solicitud : ' + srf.fechaInicio,
            gestion: datos.idp  + ' | ' + srf.gestion,

            seccionUno: srf.formato?.seccionUno,
            qr: dominio + '#/pages/srfpublico/' + srf.token,
            nombre: datos.nombre,
            idp: datos.idp,
            idpName: (idpName.value || idpName) + ":",
            email: srf.email,
            cargo: srf.cargo,
            costo: srf.centrocosto,
            codigo: srf.codigo,

            seccionDos: srf.formato?.seccionDos,
            fechaTituloFin: srf.formato?.fechaTitulo + ' : ',
            fechafin: srf.fechaFin,
            montoTitulo: srf.formato?.montoTitulo + ' : ',
            monto: formatearNumero(srf.monto) + ' ' + srf.moneda,
            descripcion: srf.formato?.descripcion + " : ",
            detalle: srf.detalle,
            visibleDos: srf.formato?.trueEstadoDos,
            texto: srf.formato?.detalleDos + ' : ' + srf.texto,
            numerico: srf.formato.cantidadDos + ' : ' + srf.numerico,

            visibleTres: srf.formato.estadoTres,
            seccionTres: srf.formato.seccionTres,
            obs: srf.formato.detalle,

            jefe: {
                nombre: lenFirma(srf.lista[0].jefe.nombre + ' ' + srf.lista[0].jefe.paterno + ' ' + srf.lista[0].jefe.materno),
                idp: srf.lista[0].jefe.idp,
                cargo: lenPdf(srf.lista[0].cargo)
            },
            pago: {
                nombre: lenFirma(srf.lista[srf.lista.length - 1].jefe.nombre + ' ' + srf.lista[srf.lista.length - 1].jefe.paterno + ' ' + srf.lista[srf.lista.length - 1].jefe.materno),
                idp: srf.lista[srf.lista.length - 1].jefe.idp,
                cargo: lenPdf(srf.lista[srf.lista.length - 1].cargo)
            },
            nombreFirma: lenFirma(datos.nombre),
            cargofirma: lenPdf(srf.cargo),
        }

        const docDefinition = crearSrfPdf(pdf)
        const name = "srf"+datos.idp + '' + srf.id + '' + srf.numero + '.pdf'
        pdfMake.createPdf(docDefinition).download(name)
    }
    const getRdgResumenPdf = async ({ srf, datos, dominio, idpName}) => {
        
        const pdf = {
            titulo: srf.formato?.titulo,
            numero: srf.numero,
            fecha: 'Fecha de Solicitud : ' + srf.fechaInicio,
            gestion: datos.idp  + ' | ' + srf.gestion,

            seccionUno: srf.formato?.seccionUno,
            qr: dominio + '#/pages/srfpublico/' + srf.token,
            nombre: datos.nombre,
            idp: datos.idp,
            idpName: (idpName.value || idpName) + ":",
            email: srf.email,
            cargo: srf.cargo,
            costo: srf.centrocosto,
            codigo: srf.codigo,

            seccionDos: srf.formato?.seccionDos,
            fechaTituloFin: srf.formato?.fechaTitulo + ' : ',
            fechafin: srf.fechaFin,
            montoTitulo: srf.formato?.montoTitulo + ' : ',
            monto: formatearNumero(srf.monto) + ' ' + srf.moneda,
            descripcion: srf.formato?.descripcion + " : ",
            detalle: srf.detalle,
            visibleDos: srf.formato?.trueEstadoDos,
            texto: srf.formato?.detalleDos + ' : ' + srf.texto,
            numerico: srf.formato.cantidadDos + ' : ' + srf.numerico,

            visibleTres: srf.formato.estadoTres,
            seccionTres: srf.formato.seccionTres,
            obs: srf.formato.detalle,

            jefe: {
                nombre: lenFirma(srf.lista[0].jefe.nombre + ' ' + srf.lista[0].jefe.paterno + ' ' + srf.lista[0].jefe.materno),
                idp: srf.lista[0].jefe.idp,
                cargo: lenPdf(srf.lista[0].cargo)
            },
            pago: {
                nombre: lenFirma(srf.lista[srf.lista.length - 1].jefe.nombre + ' ' + srf.lista[srf.lista.length - 1].jefe.paterno + ' ' + srf.lista[srf.lista.length - 1].jefe.materno),
                idp: srf.lista[srf.lista.length - 1].jefe.idp,
                cargo: lenPdf(srf.lista[srf.lista.length - 1].cargo)
            },
            nombreFirma: lenFirma(datos.nombre),
            cargofirma: lenPdf(srf.cargo),
        }

        const docDefinition = crearSrfPdf(pdf)
        const name = "srf"+datos.idp + '' + srf.id + '' + srf.numero + '.pdf'
        pdfMake.createPdf(docDefinition).download(name)
    }
    return {
        getSrfPdf,
        getRdgResumenPdf,
        getRdgDetallePdf
    }
}