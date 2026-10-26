import axiosService from "./axiosService";
const sgrf = 'user/empleado/'

export const getPersonaService = (value) => {
    return axiosService.get(sgrf + 'getPersona', { params: { idPersona: value } })
}

export const findByTipoService = (value) => {
    return axiosService.get(sgrf + 'findByTipo', { params: { tipo: value } })
}

export const updateCorreoService = (personaResponse) => {
    return axiosService.put(sgrf + 'updateCorreo', personaResponse)
}