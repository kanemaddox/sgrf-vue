import Swal from 'sweetalert2'

export function useAlert() {

  const confirm = async (title = '¿Estás seguro?', text = 'esta seguro', footer = '') => {
    return await Swal.fire({
      title,
      text,
      footer,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar'
    })
  }

  const success = async (title = 'Operación exitosa', text = 'Operación exitosa') => {
    return await Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })
  }

  const error = async (title = 'Ocurrió un error', text = 'error', footer = 'error') => {
    return await Swal.fire({
      title,
      text,
      footer,
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
  const input = async (title = 'verificar') => {
    return await Swal.fire({
      title,
      input: "password", 
      inputLabel: "Password",
      inputPlaceholder: "Ingresa tu contraseña",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off"
      },
      icon: "question",
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar'
    })
  }

  return {
    confirm,
    success,
    error,
    info,
    custom,
    input
  }
}