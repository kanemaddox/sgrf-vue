import axiosService from './axiosService';

const sgrf = 'user/setting/'

export const updateSettingService = (response) => {
  return axiosService.put(sgrf + 'updateSetting', response)
}

export const getSettingService = (value) => {
  return axiosService.get(sgrf + 'getSetting',{params:{idSett:value}})
}