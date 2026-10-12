import Swal from 'sweetalert2'

export function useAlert() {

  let loadingStartTime = null

  const MIN_LOADING_TIME = 2000

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

  const preguntar = async (title = '¿Estás seguro?', text = 'esta seguro', footer = '') => {
    return await Swal.fire({
      title,
      text,
      footer,
      icon: 'question',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: '<i class="bi bi-camera me-2"></i> Si',
      denyButtonText: '<i class="bi bi-file-earmark-text me-2"></i> No'
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

  const info = async (title = 'Información', text = '') => {
    return await Swal.fire({
      title,
      text,
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

  const dataLoading = (title = 'Cargando datos', text = 'Por favor espere...') => {
    loadingStartTime = Date.now()
    Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  const updateLoading = (text) => {
    Swal.update({ text })
  }

  const close = async () => {
    if (!loadingStartTime) {
      Swal.close()
      return
    }

    const elapsed = Date.now() - loadingStartTime
    const remaining = MIN_LOADING_TIME - elapsed

    if (remaining > 0) {
      await new Promise(resolve => setTimeout(resolve, remaining))
    }

    Swal.close()
    loadingStartTime = null
  }

  return {
    confirm,
    success,
    error,
    info,
    custom,
    input,
    preguntar,
    dataLoading,
    close,
    updateLoading
  }
}