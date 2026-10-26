import axiosService from './axiosService';

const sgrf = 'user/srf/'

export const createSrfService = (request) => {
    return axiosService.post(sgrf + 'createSrf', request)
}

export const getSrfUsuarioEstadoService = (persona, estado) => {
    return axiosService.get(sgrf + 'getSrfUsuarioEstado', { params: { idPersona: persona, estado: estado } })
}

export const getSrfService = (value) => {
    return axiosService.get(sgrf + 'getSrf', { params: { idSrf: value } })
}

export const getSrfUsuarioService = (srf, persona) => {
    return axiosService.get(sgrf + 'getSrfUsuario', { params: { idSrf: srf, idPersona: persona } })
}

export const getSrfAdminService = (usuario, srf) => {
    return axiosService.get(sgrf + 'getSrfAdmin', { params: { idUsuario: usuario, idSrf: srf } })
}

export const getSrfUsuarioGestionService = (id, value) => {
    return axiosService.get(sgrf + 'getSrfUsuarioGestion', { params: { idUsuario: id, gestion: value } })
}

export const updateSrfService = (response) => {
    return axiosService.put(sgrf + 'updateSrf', response)
}

export const getSrfEstadoService = (value) => {
    return axiosService.get(sgrf + 'getSrfEstado', { params: { idPersona: value } })
}