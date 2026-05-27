export function useFunction() {
    const len = (value) => {
        return value.length > 40 ? value.slice(0, 40) + "..." : value
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
            'DEVUELTO':'info',
        }
        return colores[value]
    }
    const getIcono = (value) => {
        const icono = {
            'PENDIENTE': 'bi bi-exclamation-triangle',
            'APROBADO': 'bi bi-check-circle',
            'RECHAZADO': 'bi bi-x-circle',
            'ESPERA':'bi bi-clock',
            'DEVUELTO':'bi bi-send-arrow-down'
        }
        return icono[value]
    }
    const getEstado = (value) => {
        const estado = {
            'PENDIENTE': 'Pendientes',
            'APROBADO': 'Aprobadas',
            'RECHAZADO': 'Rechazadas',
        }
        return estado[value]
    }

    return {
        len,
        minuscula,
        jerarquia,
        updateUser,
        getPrefijo,
        esDigito,
        getColor,
        getIcono,
        getEstado
    }

}