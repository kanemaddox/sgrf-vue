import axiosService from '../axiosService';

const sgrf = 'user/aprobacion/'

export const getSrfEstadoService = (persona, estado) => {
    return axiosService.get(sgrf + "getSrfEstado", { params: { idPersona: persona, estado: estado } })
}

export const getAprService = (persona, apr) => {
    return axiosService.get(sgrf + "getApr", { params: { idPersona: persona, idApr: apr } })
}
export const updateAprobacionService = (value) => {
    return axiosService.put(sgrf + "updateAprobacion", value)
}