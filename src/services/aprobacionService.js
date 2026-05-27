import axiosService from './axiosService';

const sgrf = 'user/aprobacion/'

export const getPendientesService = (idUsuario, estado) => {
    return axiosService.get(sgrf + "getPendientes", { params: { idUsuario: idUsuario, estado: estado } })
}

export const getAprService = (usuario, apr) => {
    return axiosService.get(sgrf + "getApr", { params: { idUsuario: usuario, idApr: apr } })
}
export const updateAprobacionService = (value) => {
    return axiosService.put(sgrf + "updateAprobacion", value)
}