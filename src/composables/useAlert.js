import Swal from 'sweetalert2'

export function useAlert() {

  const confirm = async (title = '¿Estás seguro?') => {
    return await Swal.fire({
      title,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar'
    })
  }

  const success = async (title = 'Operación exitosa') => {
    return await Swal.fire({
      title,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })
  }

  const error = async (title = 'Ocurrió un error') => {
    return await Swal.fire({
      title,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }

  const info = async (title = 'Información') => {
    return await Swal.fire({
      title,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    })
  }

  // 🔥 versión flexible (por si necesitas algo más personalizado)
  const custom = async (options = {}) => {
    return await Swal.fire({
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      ...options
    })
  }

  return {
    confirm,
    success,
    error,
    info,
    custom
  }
}