<template>
  <CRow>
    <!-- ==================================================================== -->
    <!-- Tarjeta de Rendiciones                                             -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="12" :md="12" :lg="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :xs="12" :sm="6" :md="6" :lg="6">
              <div class="align-items-center">
                <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                <CChip :color="getColor(rdg.estado)">
                  <span class="chip-icon">
                    <i :class="getIcono(rdg.estado)"></i>
                  </span>{{ rdg.estado }}
                </CChip>
              </div>
            </CCol>
            <CCol :xs="12" :sm="6" :md="6" :lg="6" class="text-end">
              <h3><strong>No.: {{ rdg.numero }}</strong> </h3>
              <div class="space">{{ persona.idp }} | {{ rdg.gestion }}</div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :xs="12" :sm="5" :md="5" :lg="5">
              <h5><strong> {{ rdg.formato?.titulo }}</strong></h5>
              <div class="space" v-if="Number(rdg.importe) === 0">Sin Formulario de Solicitud</div>
            </CCol>

            <CCol :xs="12" :sm="4" :md="4" :lg="4" class="text-end">
              <h3>{{ formatearNumero(rdg.importe) }} {{ rdg.moneda }}</h3>
              <div class="space">Importe Recibido</div>
            </CCol>

            <!--Botones-->
            <CCol :xs="12" :sm="3" :md="3" :lg="3" class="text-end">
              <CRow>
                <CDropdown variant="btn-group">
                  <CDropdownToggle size="sm" class="custom-hover-btn" :color="rdg.pdf ? 'secondary' : 'success'"
                    variant="outline" :disabled="rdg.pdf">
                    <i class="bi bi-cloud-arrow-down-fill me-2"></i>PDF
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem style="cursor: pointer;" @click="pdfDetalle">
                      <i class="bi bi-file-earmark-pdf me-2"></i> PDF Detalle
                    </CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem style="cursor: pointer;" @click="pdfResumen">
                      <i class="bi bi-file-earmark-pdf me-2"></i> PDF Resumen
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CRow>
            </CCol>
            <!--End Botones-->
          </CRow><br></br>
          <CAlert color="success" :style="vars">Fecha : {{ rdg.fecha }}</CAlert>

          <CTabs :activeItemKey="1">
            <CTabList variant="tabs" layout="justified">
              <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="1">
                <CIcon icon="cil-clipboard"></CIcon>
                <span class="d-none d-md-inline">Estado</span>
              </CTab>
              <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="2">
                <CIcon icon="cil-user"></CIcon>
                <span class="d-none d-md-inline">Seccion I</span>
              </CTab>
              <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="3">
                <CIcon icon="cil-tags"></CIcon>
                <span class="d-none d-md-inline">Seccion II</span>
              </CTab>
              <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="4"">
                <CIcon icon="cil-storage"></CIcon>
                <span class="d-none d-md-inline">Seccion III</span>
              </CTab>
              <CTab v-if="Number(rdg.devolver) > 0" class="d-flex align-items-center gap-2 px-3 " :itemKey="5">
                <CIcon icon="cil-clipboard"></CIcon>
                <span class="d-none d-md-inline">Seccion IV</span>
              </CTab>
            </CTabList>

            <CTabContent>
              <CTabPanel class="p-3" :itemKey="1">
                <CRow>
                  <!-- ==================================================================== -->
                  <!-- Tarjeta de Autorizadores                                             -->
                  <!-- ==================================================================== -->
                  <CCol :xs="12" :sm="6" :md="6" :lg="6">
                    <ComponenteAutorizadores v-if="rdg && rdg.aprobadores" :lista="rdg.aprobadores"/>
                  </CCol>

                  <CCol :xs="12" :sm="6" :md="6" :lg="6">
                    <div class="d-md-none mb-3"></div>
                    <CCard>
                      <CCardHeader class="headercolor justify-content-between align-items-center">
                        <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                        Resumen
                      </CCardHeader>
                      <CListGroup>
                        <CListGroupItem>Gastos : {{ formatearNumero(rdg.gasto) }} {{ rdg.moneda
                          }}
                        </CListGroupItem>
                        <CListGroupItem>Fondos Recibidos : {{ formatearNumero(rdg.importe) }} {{
                          rdg.moneda }}
                        </CListGroupItem>

                        <CListGroupItem>Saldo : {{ formatearNumero(rdg.saldo) }} {{ rdg.moneda
                          }}
                        </CListGroupItem>
                        <CListGroupItem :color="Number(rdg.devolver) > 0 ? 'danger' : 'success'">
                          Devolucion : {{ formatearNumero(rdg.devolver) }} {{ rdg.moneda }}
                        </CListGroupItem>
                        <CListGroupItem :color="Number(rdg.rembolso) > 0 ? 'success' : 'warning'">
                          Rembolso : {{ formatearNumero(rdg.rembolso) }} {{ rdg.moneda }}
                        </CListGroupItem>
                      </CListGroup>
                    </CCard>
                  </CCol>
                </CRow>
              </CTabPanel>

              <CTabPanel class="p-3" :itemKey="2">
                <CAlert color="success">I. {{ valores.seccionUno }}
                </CAlert>
                <ComponenteDetalle1 :datos="datos" />
              </CTabPanel>

              <CTabPanel class="p-3" :itemKey="3">
                <CAlert color="success">II. {{ valores.seccionDos }}</CAlert>
                <ComponenteAdmin2 :datos="rdg" />
              </CTabPanel>

              <CTabPanel class="p-3" :itemKey="4">
                <ComponenteAdmin3 :datos="facturas" :valores="valores" />
              </CTabPanel>

              <CTabPanel class="p-3" :itemKey="5">
                <ComponenteDetalle4 :datos="rdg" />
              </CTabPanel>


            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
      <br>
    </CCol>
  </CRow>


</template>
<script setup>
const detalleProps = defineProps({
  idUsuario: {
    type: String,
    required: true
  },
  idRdg: {
    type: String,
    required: true
  }
})
// ============================================================================
// 1. IMPORTACIONES
// ============================================================================

import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useRouter } from 'vue-router'
import { useFunction } from '@/composables/useFunction'
import { useAlert } from '@/composables/useAlert'
import { API_URL_SGRF, API_FILE_IMG800 } from "@/env"
import { useRdg } from '@/composables/useRdg'
import { useAuthStore } from '@/stores/authStores'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { crearRdgPdf } from '../../pdf/rdgPdfLite'
import { crearRdgPdfDetalle } from '../../pdf/rdgPdfDetalle'


import ComponenteDetalle1 from '@/components/rdg/ComponenteDetalle1.vue'
import ComponenteAdmin2 from '@/components/rdg/ComponenteAdmin2.vue'
import ComponenteAdmin3 from '@/components/rdg/ComponenteAdmin3.vue'
import ComponenteDetalle4 from '@/components/rdg/ComponenteDetalle4.vue'
import ComponenteAutorizadores from '@/components/rdg/ComponenteAutorizadores.vue'


import 'bootstrap-icons/font/bootstrap-icons.css'
// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { formatearNumero, getFactura, lenFirma, getDias, getColor, getIcono, lenPdf} = useFunction()
const { setActions, clearActions } = useBreadcrumb()
const { dataLoading, close } = useAlert()
const router = useRouter()
const auth = useAuthStore()
const { getRdgAdminUse, rdg } = useRdg()
pdfMake.vfs = pdfFonts.vfs

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================

const persona = ref(auth.persona)
const idpName = ref(auth.idpName)

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const img800 = API_FILE_IMG800
const dominio = API_URL_SGRF

const datos = reactive({
  nombre: '',
  idp: '',
  idpName: '',
  cargo: '',
  area: '',
  centrocostos: '',
  codigo: '',
  tipo: '',
  cuenta: '',
  banco: ''
})

const facturas = reactive({
  factura: [],
  isEdit: false,
  aprobadores: [],
  gasto: 0,
  saldo: 0,
  devolver: 0,
  rembolso: 0,
  importe: 0,
  listaCuenta: [],
  del: '',
  al: '',
  moneda: ''
})

const valores = reactive({
  titulo: "",
  seccionUno: "",
  seccionDos: "",
  seccionTres: "",
})


// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================

const pdfDetalle = async () => {

  const filasImagen = await getFilasImagen()
  const filasGastos = getFilasGastos()
  
  const filasDetalle = rdg.factura.map(gasto => [
    { text: rdg.fecha.split(' ')[0], fontSize: 6 },
    { text: gasto.cuenta.cuenta, fontSize: 6 },
    { text: gasto.cuenta.nombre, fontSize: 6 },
    { text: 'RG-' + rdg.numero + ' ' + gasto.documento + ' ' + (gasto.numero === '0' ? '' : gasto.numero) + ' ' + gasto.detalle, fontSize: 6 },
    { text: formatearNumero(gasto.importe) + ' ' + gasto.moneda, fontSize: 7, alignment: 'right' }
  ])

  const filasResumen = rdg.resumen.map(cuenta => [
    { text: rdg.fecha.split(' ')[0], fontSize: 6 },
    { text: cuenta.cuenta, fontSize: 6 },
    { text: cuenta.nombre, fontSize: 6 },
    { text: 'RG-' + rdg.numero + ' ' + cuenta.glosa, fontSize: 6 },
    { text: formatearNumero(cuenta.total * -1) + ' ' + rdg.moneda, fontSize: 8, alignment: 'right' }
  ])

  const pdf = {
    ...getDatosPdf(),
    facturas: filasGastos,
    cuentas: [
      ...filasDetalle,
      ...filasResumen
    ],
    archivo: filasImagen
  }

  const docDefinition = crearRdgPdfDetalle(pdf)
  const name = persona.value.idp + rdg.idRdg + rdg.numero + '.pdf'
  pdfMake.createPdf(docDefinition).download(name)
}

const pdfResumen = async () => {
  const filasImagen = await getFilasImagen()
  const filasGastos = getFilasGastos()
  const agrupado = rdg.factura.reduce((acumulador, factura) => {
    const gasto = factura.cuenta.tipo
    const codigo = factura.cuenta.cuenta
    const detalle = 'RG-' + rdg.numero + ' ' + factura.cuenta.glosa
    const importe = Number(factura.importe) || 0
    const clave = `${gasto}|${codigo}|${detalle}`

    if (!acumulador[clave]) {
      acumulador[clave] = 0
    }
    acumulador[clave] += importe

    return acumulador
  }, {})

  const lista = Object.entries(agrupado).map(([clave, totalImporte]) => {
    const [cuenta, codigo, detalle] = clave.split('|')
    return {
      cuenta: cuenta,
      codigo: codigo,
      detalle: detalle,
      total: totalImporte
    }
  })

  const filasCuentas = lista.map(cuenta => [
    { text: cuenta.cuenta, fontSize: 7 },
    { text: cuenta.codigo, fontSize: 7 },
    { text: cuenta.detalle, fontSize: 7 },
    { text: formatearNumero(cuenta.total) + ' ' + rdg.moneda, fontSize: 8, alignment: 'right' },
  ])

  const filasResumen = rdg.resumen.map(cuenta => [
    { text: cuenta.tipo, fontSize: 7 },
    { text: cuenta.cuenta, fontSize: 7 },
    { text: "RG-" + rdg.numero + " " + cuenta.glosa, fontSize: 7 },
    { text: formatearNumero(cuenta.total * -1) + ' ' + rdg.moneda, fontSize: 8, alignment: 'right' },
  ])

  const pdf = {
    ...getDatosPdf(),
    facturas: filasGastos,
    cuentas: [
      ...filasCuentas,
      ...filasResumen
    ],
    archivo: filasImagen,
  }
  const docDefinition = crearRdgPdf(pdf)
  const name = persona.value.idp + '' + rdg.idRdg + '' + rdg.numero + '.pdf'
  pdfMake.createPdf(docDefinition).download(name)
}

const salir = () => {
  getSalir()
}
const getSalir = () => {
  router.push({
    name: 'GESTIONRDG',
    params: { idUsuario: detalleProps.idUsuario }
  })
}

const getFilasImagen = async () => {
  const facturas = rdg?.factura?.filter(
    gasto => gasto.archivo !== 'ninguno'
  ) ?? []

  return await Promise.all(
    facturas.map(async (gasto, index) => {
      const imgData = await getFactura(
        img800 + gasto.archivo + '.jpg'
      )

      return [
        { text: index + 1 },
        { image: imgData, width: 300 },
        { qr: dominio + '#/pages/documentopublico/' + gasto.token, style: 'numero', fit: 90 }
      ]
    })
  )
}

const getFilasGastos = () => {
  return rdg.factura.map(gasto => [
    { text: gasto.fecha.split('T')[0], fontSize: 6 },
    { text: gasto.cuenta.tipo, fontSize: 6 },
    { text: gasto.documento, fontSize: 6 },
    { text: gasto.numero, fontSize: 7, alignment: 'right' },
    { text: gasto.detalle, fontSize: 6 },
    { text: formatearNumero(gasto.importe) + ' ' + gasto.moneda, fontSize: 7, alignment: 'right' }
  ])
}

const getDatosPdf = () => {
  const aprobadorInicial = rdg.aprobadores[0]
  const aprobadorFinal = rdg.aprobadores[rdg.aprobadores.length - 1]

  return {
    titulo: rdg.formato?.titulo,
    numero: rdg.numero,
    fecha: 'Fecha : ' + rdg.fecha,
    gestion: persona.value.idp + ' | ' + rdg.gestion,
    seccionUno: rdg.formato?.seccionUno,
    qr: dominio + '#/pages/rdgpublico/' + rdg.token,
    nombre: persona.value.nombre + ' ' + persona.value.paterno + ' ' + persona.value.materno,
    idp: persona.value.idp,
    idpName: idpName.value + ':',
    email: persona.value.email,
    cargo: rdg.cargo,
    costo: rdg.centrocostos,
    codigo: rdg.codigo,
    area: rdg.area,
    tipo: rdg.tipoCuenta,
    banco: rdg.banco,
    cuenta: rdg.cuenta,
    seccionDos: rdg.formato?.seccionDos,
    del: rdg.del,
    al: rdg.al,
    dias: getDias(rdg.del, rdg.al),
    actividad: rdg.actividad,
    detalle: rdg.detalle,
    participantes: rdg.participantes,
    monto: formatearNumero(rdg.importe) + ' ' + rdg.moneda,
    seccionTres: rdg.formato?.seccionTres,
    gastos: formatearNumero(rdg.gasto) + ' ' + rdg.moneda,
    importe: formatearNumero(rdg.importe) + ' ' + rdg.moneda,
    saldo: formatearNumero(rdg.saldo) + ' ' + rdg.moneda,
    devolver: formatearNumero(rdg.devolver) + ' ' + rdg.moneda,
    rembolso: formatearNumero(rdg.rembolso) + ' ' + rdg.moneda,
    r: rdg.rembolso,
    d: rdg.devolver,
    jefe: {
      nombre: lenFirma(aprobadorInicial.persona.nombre + ' ' + aprobadorInicial.persona.paterno + ' ' + aprobadorInicial.persona.materno),
      idp: aprobadorInicial.persona.idp,
      cargo: lenPdf(aprobadorInicial.cargo)
    },

    pago: {
      nombre: lenFirma(aprobadorFinal.persona.nombre + ' ' + aprobadorFinal.persona.paterno + ' ' + aprobadorFinal.persona.materno),
      idp: aprobadorFinal.persona.idp,
      cargo: lenPdf(aprobadorFinal.cargo)
    },

    nombreFirma: lenFirma(persona.value.nombre + ' ' + persona.value.paterno + ' ' + persona.value.materno),
    cargoFirma: lenFirma(rdg.cargo)
  }
}

const getLoadData = () => {
  valores.titulo = rdg.formato.seccionUno
  valores.seccionUno = rdg.formato.seccionUno
  valores.seccionDos = rdg.formato.seccionDos
  valores.seccionTres = rdg.formato.seccionTres

  datos.nombre = rdg.nombre
  datos.idp = rdg.idp
  datos.idpName = idpName
  datos.cargo = rdg.cargo
  datos.area = rdg.area
  datos.centrocostos = rdg.centrocostos
  datos.codigo = rdg.codigo
  datos.tipo = rdg.tipoCuenta
  datos.cuenta = rdg.cuenta
  datos.banco = rdg.banco

  facturas.factura = rdg.factura
  facturas.isEdit = rdg.isEdit
  facturas.aprobadores = rdg.aprobadores
  facturas.gasto = rdg.gasto
  facturas.saldo = rdg.saldo
  facturas.devolver = rdg.devolver
  facturas.rembolso = rdg.rembolso
  facturas.importe = rdg.importe
  facturas.del = rdg.del
  facturas.al = rdg.al
  facturas.moneda = rdg.moneda
}

const getAction = () => {
  setActions([
    {
      visible: true,
      label: 'Salir',
      icon: 'cil-account-logout',
      color: 'secondary',
      variant: 'ghost',
      disabled: false,
      onClick: salir
    }
  ])
}

// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================
onMounted(async () => {
  dataLoading()
  try {
    await getRdgAdminUse(detalleProps.idUsuario, detalleProps.idRdg)
    getLoadData()
  } finally {
    close()
  }
  getAction()
})
onUnmounted(() => {
  clearActions()
})

// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================
const vars = {
  '--cui-alert-padding-y': '2px',
  '--cui-alert-border-radius': '0px'
}

const tabEdit = {
  '--cui-nav-link-color': '#F5A927',
  '--cui-nav-link-hover-color': '#C28723'
}

const tabNoEdit = {
  '--cui-nav-link-color': '#5856d6',
}
</script>