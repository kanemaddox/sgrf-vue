<template>
    <div class="mb-3 row">
        <h4 class="card-title">IDP : {{props.datos.idp}}</h4>
    </div>
    <div class="mb-3 row">
        <label for="nombre" class="col-4">Nombre : </label>
        <label for="nombre" class="col-8">{{props.datos.nombre}}</label>
    </div>
    <div class="mb-3 row">
        <label for="apellido" class="col-4">Apellidos : </label>
        <label for="nombre" class="col-8">{{props.datos.apellidos}}</label>
    </div>
</template>

<script setup>
const props = defineProps({
  datos: {
    type: Object,
    required: true
  }
})
</script>