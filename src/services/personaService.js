import axiosService from "./axiosService";

const sgrf = '/user/persona/'
export const updateCelularService = (personaResponse) => {
    return axiosService.put(sgrf+'updateCelular', personaResponse)
}
