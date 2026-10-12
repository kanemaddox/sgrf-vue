import axios from "axios";
import { API_URL } from "@/env";

const usuario_api = API_URL;

export const login = (credentials) => {
  var request ={
    "user":credentials.username,
    "pass":credentials.password
  }
  //return axios.post(usuario_api+'sgrf/login', request)
  return axios.post(usuario_api+'publico/login', request)
}