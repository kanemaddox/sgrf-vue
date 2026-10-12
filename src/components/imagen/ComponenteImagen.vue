<template>
    <div ref="zoomContainer" class="zoom-container" @wheel.prevent="onWheel" @mousedown="startDragging"
        @mousemove="onDragging" @mouseup="stopDragging" @mouseleave="stopDragging">
        <img :src="imagen" alt="" class="img-fluid" loading="lazy" :style="imgStyle" />
        <!-- Controles -->
        <div class="zoom-controls">
            <CButton @click.stop="zoomIn" color="light" size="sm">
                <CIcon icon="cil-plus" />
            </CButton>
            <CButton @click.stop="deactivateZoom" color="light" size="sm">
                <CIcon icon="cil-x" />
            </CButton>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 1. Definición de Props
const props = defineProps({
    imagen: {
        type: String,
        required: true
    }
})

// 2. Estado Reactivo (Reemplaza a data())
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const isDragging = ref(false)
const lastX = ref(0)
const lastY = ref(0)
const zoomContainer = ref(null) // Referencia al div contenedor si la necesitas

// 3. Propiedades Computadas (Reemplaza a computed)
const imgStyle = computed(() => {
    return {
        transform: `scale(${scale.value}) translate(${translateX.value}px, ${translateY.value}px)`,
        cursor: scale.value > 1 ? 'grab' : 'default',
        transition: isDragging.value ? 'none' : 'transform 0.2s ease',
    }
})

// 4. Métodos (Reemplaza a methods)
const zoomIn = () => {
    scale.value = Math.min(scale.value + 0.2, 5)
}

const resetZoom = () => {
    scale.value = 1
    translateX.value = 0
    translateY.value = 0
}

const deactivateZoom = () => {
    resetZoom()
}

const onWheel = (e) => {
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    scale.value = Math.min(Math.max(scale.value + delta, 1), 5)
}

const startDragging = (e) => {
    if (scale.value <= 1) return
    isDragging.value = true
    lastX.value = e.clientX
    lastY.value = e.clientY
}

const onDragging = (e) => {
    if (!isDragging.value) return;
    translateX.value += (e.clientX - lastX.value) / scale.value
    translateY.value += (e.clientY - lastY.value) / scale.value
    lastX.value = e.clientX
    lastY.value = e.clientY
}

const stopDragging = () => {
    isDragging.value = false
}
</script>

<style scoped>
/* Contenedor principal del visor */
.zoom-container {
    position: relative;
    width: 100%;
    height: 390px;
    /* Puedes ajustar la altura según tus necesidades */
    overflow: hidden;
    /* Escondemos lo que se salga al hacer zoom */
    background-color: #f8f9fa;
    /* Un fondo gris claro neutral */
    border: 1px solid #dee2e6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    /* Evita que se seleccione el texto/imagen al arrastrar */
}

/* La imagen dentro del contenedor */
.img-fluid {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    /* Mantiene la proporción de la imagen sin deformarla */
    display: block;
    transform-origin: center center;
    /* El zoom se hace desde el centro */
    will-change: transform;
    /* Optimización de rendimiento para el navegador */
}

/* Contenedor flotante de los botones de control */
.zoom-controls {
    position: absolute;
    bottom: 15px;
    right: 15px;
    display: flex;
    gap: 8px;
    /* Espaciado entre los botones */
    z-index: 10;
    /* Asegura que los botones queden siempre por encima de la imagen */
    background-color: rgba(255, 255, 255, 0.85);
    /* Fondo semitransparente */
    padding: 6px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>