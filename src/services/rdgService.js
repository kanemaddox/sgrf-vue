import axiosService from './axiosService';

const sgrf = 'user/rdg/'

export const getRdgUsuarioEstadoService = (persona, estado) => {
  return axiosService.get(sgrf + 'getRdgUsuarioEstado', { params: { idPersona: persona, estado: estado } })
}

export const getRdgService = (value) => {
  return axiosService.get(sgrf + 'getRdg', { params: { idRdg: value } })
}

export const getRdgUsuarioService = (rdg, persona) => {
  return axiosService.get(sgrf + 'getRdgUsuario', { params: { idRdg: rdg, idPersona: persona } })
}

export const getRdgDetalleService = (rdg, persona) => {
  return axiosService.get(sgrf + 'getRdgDetalle', { params: { idRdg: rdg, idPersona: persona } })
}

export const getRdgAdminService = (usuario, rdg) => {
  return axiosService.get(sgrf + 'getRdgAdmin', { params: { idUsuario: usuario, idRdg: rdg } })
}

export const createRdgService = (request) => {
  return axiosService.post(sgrf + 'createRdg', request)

}
export const updateRdgService = (response) => {
  return axiosService.put(sgrf + 'createUpdateRdg', response)
}

export const getRdgListaService = (persona, estado) => {
  return axiosService.get(sgrf + 'getRdgLista', { params: { idPersona: persona, estado: estado } })
}

export const getRdgUsuarioGestionService = (usuario, value) => {
  return axiosService.get(sgrf + 'getRdgUsuarioGestion', { params: { idUsuario: usuario, gestion: value } })
}

export const updateRdgSolicitudService = (response) => {
  return axiosService.put(sgrf + 'updateRdgSolicitud', response)
}

export const getRdgEstadoService = (persona) => {
  return axiosService.get(sgrf + 'getRdgEstado', { params: { idPersona: persona } })
}

export const saveRdgService = (response) => {
  return axiosService.put(sgrf + 'saveRdg', response)
}