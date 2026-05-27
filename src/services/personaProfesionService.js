import axiosService from "./axiosService";

const sgrf = '/user/personaprofesion/'

export const getPersonaProfesionUsuarioService = (value) => {
    return axiosService.get(sgrf + 'getPersonaProfesionUsuario', { params: { idUsuario: value } })
}