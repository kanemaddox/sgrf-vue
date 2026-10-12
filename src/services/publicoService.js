import axios from "axios";
import { API_URL } from "@/env";

const publico = API_URL+"publico/";

export const getSrfPublicoService = (value) => {
    return axios.get(publico + 'getSrfPublico', { params: { idSrf: value } })
}

export const getRdgPublicoService = (value) => {
    return axios.get(publico + 'getRdgPublico', { params: { idRdg: value } })
}

export const getDocumentoPublicoService = (value) => {
    return axios.get(publico + 'getDocumentoPublico', { params: { idDetalle: value } })
}