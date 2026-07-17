import { left } from "@popperjs/core"

export function useFunction() {
    const len = (value) => {
        return value.length > 40 ? value.slice(0, 40) + "..." : value
    }
    const lenPdf = (value) => {
        return value.length > 20 ? value.slice(0, 20) + "..." : value
    }
    const minuscula = (value) => {
        return value.toLowerCase()
    }


    const jerarquia = (usuario, listaJefe) => {
        const historico = new Set()
        while (true) {
            listaJefe.value = [
                ...new Map(
                    listaJefe.value.map(item => [String(item.idp).trim(), item])
                ).values()
            ];

            const estadoActual = JSON.stringify(listaJefe.value.map(x => x.idp).sort());
            if (historico.has(estadoActual)) break;
            historico.add(estadoActual);

            const idsEnEstaVuelta = new Set(listaJefe.value.map(x => String(x.idp).trim()));

            usuario.value.sort((a, b) => {
                const aEsJefe = idsEnEstaVuelta.has(String(a.idp).trim());
                const bEsJefe = idsEnEstaVuelta.has(String(b.idp).trim());

                if (aEsJefe && !bEsJefe) return -1;
                if (!aEsJefe && bEsJefe) return 1;
                return 0;
            });

            listaJefe.value.forEach(element => {
                element.idpJefe = '';
                const u = usuario.value.find(e => String(e.idp).trim() === String(element.idp).trim());
                if (u) {
                    element.idpJefe = u.idpJefe;
                    u.tipo = true
                }
            });
            const nuevaLista = listaJefe.value
                .filter(x => String(x.idpJefe || '').trim() !== '')
                .map(x => ({
                    idp: x.idpJefe,
                    idpJefe: ''
                }));

            if (nuevaLista.length === 0) break;
            listaJefe.value = nuevaLista;
        }
        return (usuario.value)
    }

    const updateUser = (lista, listaDb, nuevaLista) => {
        nuevaLista.value = []

        // 1. Creamos el mapa de la lista local (la que tiene los cambios del usuario)
        const mapaUsuario = new Map(lista.value.map(e => [e.idp, e]))

        // 2. Usamos un Set para rastrear qué IDs de 'lista' ya procesamos
        const idsProcesados = new Set();

        // 3. Recorremos la lista de la DB (para updates o registros sin cambios)
        listaDb.value.forEach(elementDb => {
            const elementUser = mapaUsuario.get(elementDb.idp)

            if (elementUser) {
                // Marcamos como procesado para no repetirlo después
                idsProcesados.add(elementDb.idp)

                const sonIguales = JSON.stringify(elementDb) === JSON.stringify(elementUser)
                nuevaLista.value.push({
                    ...elementUser,
                    update: !sonIguales // true si cambió, false si es idéntico
                })
            } else {
                // Si el elemento está en DB pero NO en la lista del usuario
                // Lo añadimos tal cual (o según tu lógica de negocio)
                nuevaLista.value.push({ ...elementDb, update: false })
            }
        })

        // 4. AGREGAMOS LO NUEVO: Elementos en 'lista' que NO existen en 'listaDb'
        lista.value.forEach(elementUser => {
            if (!idsProcesados.has(elementUser.idp)) {
                nuevaLista.value.push({
                    ...elementUser,
                    update: true // Se marca como true porque es una inserción nueva
                })
            }
        })

        return nuevaLista.value
    }

    const getPrefijo = (sucursal, costos) => {
        const valueSucursal = sucursal.slice(0, 2).toUpperCase()
        const valueCostos = costos.slice(0, 2).toUpperCase()
        let iguales = false
        if (valueSucursal === valueCostos) {
            iguales = true
        }
        return iguales
    }

    const esDigito = (value) => {
        const response = /^\d+$/.test(value)
        return response
    }

    const getColor = (value) => {
        const colores = {
            'PENDIENTE': 'warning',
            'APROBADO': 'success',
            'RECHAZADO': 'danger',
            'ESPERA': 'dark',
            'DEVUELTO': 'info',
            'TRAMITE': 'warning',
        }
        return colores[value]
    }
    const getIcono = (value) => {
        const icono = {
            'PENDIENTE': 'bi bi-exclamation-triangle',
            'APROBADO': 'bi bi-check-circle',
            'RECHAZADO': 'bi bi-x-circle',
            'ESPERA': 'bi bi-clock',
            'DEVUELTO': 'bi bi-send-arrow-down',
            'TRAMITE': 'bi bi-clock-history',
        }
        return icono[value]
    }
    const getEstado = (value) => {
        const estado = {
            'PENDIENTE': 'Pendientes',
            'APROBADO': 'Aprobadas',
            'RECHAZADO': 'Rechazadas',
            'TRAMITE': 'Solicitud en Tramite',
        }
        return estado[value]
    }
    const getImagen = async (url) => {
        const respuesta = await fetch(url)
        const blob = await respuesta.blob()
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })
    }
    const getCantidadCaracteres = (maximo, total) => {
        let size = total || 0
        return "Quedan : " + (maximo - size) + " Caracteres ."
    }
    const getDias = (del, al) => {
        const inicio = new Date(del)
        const fin = new Date(al)

        if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
            return 0
        }
        const d = inicio - fin
        const milisegundosPorDia = 1000 * 60 * 60 * 24
        const diasTranscurridos = Math.round(d / milisegundosPorDia)
        return Math.abs(diasTranscurridos-1)

    }
    const getGasto = (gasto, importe) => {
        return Number(Number(gasto) + Number(importe)).toFixed(2)
    }
    const getSaldo = (importe, gasto) => {
        return Number(Number(importe) - Number(gasto)).toFixed(2)
    }

    return {
        len,
        lenPdf,
        minuscula,
        jerarquia,
        updateUser,
        getPrefijo,
        esDigito,
        getColor,
        getIcono,
        getEstado,
        getImagen,
        getCantidadCaracteres,
        getDias,
        getGasto
    }

}