import axiosService from "./axiosService";

const sgrf = '/user/cuenta/'

export const createCuentaService = (value) => {
    return axiosService.post(sgrf + 'create', value)
}

export const getCuentasService = () => {
    return axiosService.get(sgrf + 'getCuentas')
}

export const updateCuentaService = (value) => {
    return axiosService.put(sgrf + 'updateCuenta', value)
}