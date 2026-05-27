import axiosService from './axiosService';

const sgrf = 'user/srf/'

export const createSrfService = (request) => {
    return axiosService.post(sgrf + 'createSrf', request)
}

export const getSrfUsuarioEstadoService = (idUsuario,estado) => {
    return axiosService.get(sgrf + 'getSrfUsuarioEstado', { params: { idUsuario: idUsuario,estado:estado } })
}

export const getSrfService = (value) => {
    return axiosService.get(sgrf + 'getSrf', { params: { idSrf: value } })
}
export const updateSrfService = (response) =>{
    return axiosService.put(sgrf + 'updateSrf',response)
}