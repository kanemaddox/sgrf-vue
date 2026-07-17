import axiosService from './axiosService';

const sgrf = 'user/srf/'

export const createSrfService = (request) => {
    return axiosService.post(sgrf + 'createSrf', request)
}

export const getSrfUsuarioEstadoService = (idUsuario, estado) => {
    return axiosService.get(sgrf + 'getSrfUsuarioEstado', { params: { idUsuario: idUsuario, estado: estado } })
}

export const getSrfService = (value) => {
    return axiosService.get(sgrf + 'getSrf', { params: { idSrf: value } })
}

export const getSrfUsuarioService = (srf, persona) => {
    return axiosService.get(sgrf + 'getSrfUsuario', { params: { idSrf: srf, idPersona: persona } })
}

export const updateSrfService = (response) => {
    return axiosService.put(sgrf + 'updateSrf', response)
}