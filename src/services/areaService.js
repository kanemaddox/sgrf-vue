import axiosService from './axiosService';

const sgrf = 'user/area/'

export const findByAllService = (value) => {
    return axiosService.get(sgrf + 'findByAll', { params: { estado: value } })
}