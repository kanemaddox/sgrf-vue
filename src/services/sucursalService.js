import axiosService from './axiosService';

const sgrf = 'user/sucursal/'

export const findAllService = () => {
    return axiosService.get(sgrf + 'findAll')
}