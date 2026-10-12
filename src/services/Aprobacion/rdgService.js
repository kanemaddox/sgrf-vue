import axiosService from '../axiosService';

const sgrf = 'user/aprobacion/rdg/'

export const getEstadoRdgService = (persona, estado) => {
    return axiosService.get(sgrf + "getEstadoRdg", { params: { idPersona: persona, estado: estado } })
}
export const getRdgRevisarService = (persona, id) => {
    return axiosService.get(sgrf + "getRdgRevisar", { params: { idPersona: persona, idRdg: id } })
}

export const updateAprobacionRdgService = (response) => {
    return axiosService.put(sgrf + "updateAprobacion", response)
}

/*============================================================*/

export const updateAprobacionService = (value) => {
    return axiosService.put(sgrf + "updateAprobacion", value)
}