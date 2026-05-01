import axiosService from './axiosService';

const sgrf = 'user/usuario/'

export const updateUsuarioImagenService = (usuarioResponse) => {
  return axiosService.put(sgrf + 'updateUsuarioImagen', usuarioResponse)
}

export const updatePassService = (passRequest) => {
  return axiosService.put(sgrf + 'updateUsuarioPassword', passRequest)
}