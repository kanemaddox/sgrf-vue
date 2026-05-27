import axiosService from './axiosService';

const sgrf = 'user/usuario/'

export const updateUsuarioImagenService = (usuarioResponse) => {
  return axiosService.put(sgrf + 'updateUsuarioImagen', usuarioResponse)
}

export const updatePassService = (passRequest) => {
  return axiosService.put(sgrf + 'updateUsuarioPassword', passRequest)
}
export const updatePasswordService = (passRequest) => {
  return axiosService.put(sgrf + 'updatePassword', passRequest)
}
export const updateUsuarioRolService = (value) => {
  return axiosService.put(sgrf + 'updateUsuarioRol', value)
}

export const findAllResponseService = (value) => {
  return axiosService.get(sgrf + 'findAllResponse', { params: { estado: value } })
}

export const findByRolService = (value) => {
  return axiosService.get(sgrf + 'findByRol', { params: { rol: value } })
}

export const setEstadoService = (value) => {
  return axiosService.get(sgrf + 'datos/setEstado', { params: { estado: value } })
}

export const addDatosService = (datosRequest) => {
  return axiosService.post(sgrf + 'datos/addDatos', datosRequest)
}

export const getDatosService = (value) => {
  return axiosService.get(sgrf + 'datos/getDatos', { params: { idPersona: value } })
}
export const getDatosUsuarioService = (value) => {
  return axiosService.get(sgrf + 'datos/getDatosUsuario', { params: { idUsuario: value } })
}

export const getEmpleadosFileService = () => {
  return axiosService.get(sgrf + 'datos/getEmpleadosFile')
}
export const getDatosEmpleadosService = () => {
  return axiosService.get(sgrf + 'datos/getDatosEmpleados')
}
export const getUsuarioValidoService = (valueUser,valueEmail) =>{
  return axiosService.get(sgrf + 'getUsuarioValido',{params:{usuario:valueUser,email:valueEmail}})
}
export const updateUsuarioPernicionsService = (value) =>{
  return axiosService.put(sgrf + 'updateUsuarioPernicions',value)
}