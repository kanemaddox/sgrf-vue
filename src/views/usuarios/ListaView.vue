<template>
    <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :lg="6">
              <div class="align-items-center">
                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                <label class="mb-0 fs-6 text-white">Lista de Usuarios</label>
              </div>
            </CCol>
            <CCol :lg="6" class="text-end">
              <CDropdown variant="btn-group">
                <CDropdownToggle color="dark" class="font border-0" size="sm">
                  <CIcon icon="cil-menu" color="dark" class="me-2 text-success" />Opciones
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-responsive">
            <table id="personaTabla" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Foto</th>
                  <th>CIF</th>
                  <th>Datos</th>
                  <th>Contacto</th>
                  <th>Unidad</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>