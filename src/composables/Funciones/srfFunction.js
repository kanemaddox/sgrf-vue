// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import { useAlert } from '@/composables/useAlert'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { error, info } = useAlert()

export function srfFunction() {

  let direccion = ''

  const getCrearSrf = async (image, cantidad, pendiente) => {
    direccion = ''
    if (image === "usuario.png") {
      await info('Informacion', 'Debes de Colocar tu imagen de perfil antes de Seguir.')
      direccion = 'Profile'
    } else {
      if (Number(cantidad) > Number(pendiente)) {
        direccion = 'CrearSrf'
      } else {
        await error('Error !!!', 'Tienes una solicitud pendiente no puedes solicitar mas..', '')
        direccion = 'MenuSrf'
      }
    }
    console.log(cantidad + '>' + pendiente)
    return direccion
  }

  return {
    getCrearSrf
  }

}