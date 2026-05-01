import axiosService from './axiosService';

const sgrf = 'user/upload/'
export const uploadProfile = ({file,onProgress,onSuccess,onError}) => {
    const formData = new FormData()
    formData.append('file', file)

    return axiosService.post(sgrf+'createProfile', formData, {
        onUploadProgress: (e) => {
            if (e.total && onProgress) {
                onProgress(Math.round((e.loaded * 100) / e.total))
            }
        }
    })
        .then(res => {
            onSuccess && onSuccess(res.data)
            return res
        })
        .catch(err => {
            onError && onError(err)
            throw err
        })
}