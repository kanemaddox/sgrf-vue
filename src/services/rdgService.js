import axiosService from './axiosService';

const sgrf = 'user/rdg/'

export const getRdgUsuarioEstadoService = (idUsuario, estado) => {
    return axiosService.get(sgrf + 'getRdgUsuarioEstado', { params: { idUsuario: idUsuario, estado: estado } })
}

export const getRdgService = (value) => {
    return axiosService.get(sgrf + 'getRdg', { params: { idRdg: value } })
}

export const getRdgUsuarioService = (rdg, persona) => {
    return axiosService.get(sgrf + 'getRdgUsuario', { params: { idRdg: rdg, idPersona: persona } })
}