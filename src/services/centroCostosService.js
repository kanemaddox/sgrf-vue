import axiosService from './axiosService';

const sgrf = 'user/centrocostos/'

export const findAllService = () => {
    return axiosService.get(sgrf + 'findAll')
}