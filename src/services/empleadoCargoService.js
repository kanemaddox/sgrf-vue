import axiosService from './axiosService';

const sgrf = 'user/empleadocargo/'

export const getEmpleadoCargoUsuarioService = (value) => {
    return axiosService.get(sgrf + 'getEmpleadoCargoUsuario', { params: { idUsuario: value } })
}