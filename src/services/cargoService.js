import axiosService from './axiosService';

const sgrf = 'user/usuario/cargo/'

export const getCargoUsuarioService =(value) =>{
  return axiosService.get(sgrf+'getCargosUsuario',{params:{idUsuario:value}})
}