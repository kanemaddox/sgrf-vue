
export const API_URL_SGRF = import.meta.env.VITE_API_URL_SGRF

//Para Dev
const API_URL = `${import.meta.env.VITE_API_DOMAIN}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_PREFIX}/`

//Para Production
//const API_URL = API_URL_SGRF.endsWith('/')? API_URL_SGRF: `${API_URL_SGRF}/`

export const API_URL_IMG100 = `${API_URL}publico/imagenes/usuarios/100/`
export const API_URL_IMG200 = `${API_URL}publico/imagenes/usuarios/200/`
export const API_URL_IMG800 = `${API_URL}publico/imagenes/usuarios/800/`

export const API_FILE_IMG50 = `${API_URL}publico/imagenes/document/image/50/`
export const API_FILE_IMG100 = `${API_URL}publico/imagenes/document/image/100/`
export const API_FILE_IMG200 = `${API_URL}publico/imagenes/document/image/200/`
export const API_FILE_IMG800 = `${API_URL}publico/imagenes/document/image/800/`
export const API_FILE_PDF = `${API_URL}publico/imagenes/document/pdf/`

//export const API_URL_PUBLICO = `${API_URL}`

export { API_URL }

console.log('API DOMAIN =', import.meta.env.VITE_API_DOMAIN)
console.log('API PORT =', import.meta.env.VITE_API_PORT)
console.log('API PREFIX =', import.meta.env.VITE_API_PREFIX)
console.log('API URL =', API_URL)
