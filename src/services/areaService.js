import axiosService from './axiosService';

const sgrf = 'user/area/'

export const findByAllService = (value) => {
    return axiosService.get(sgrf + 'findByAll', { params: { estado: value } })
}

export const getEstructuraService = () => {
    return axiosService.get(sgrf + 'getEstructura')
}

export const createDatosService = (value) => {
    return axiosService.post(sgrf + 'createDatos',value)
}