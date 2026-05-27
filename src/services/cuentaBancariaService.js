import axiosService from "./axiosService";

const sgrf = '/user/cuentabancaria/'

export const getCuentasBancariasService = (value) => {
    return axiosService.get(sgrf+'getCuentasBancarias', {params:{idPersona:value}})
}