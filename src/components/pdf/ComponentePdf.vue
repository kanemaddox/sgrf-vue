<template>
    <div class="pdf-viewer">
        <header class="toolbar">
            <div class="toolbar-group">
                <button @click="prevPage" :disabled="currentPage <= 1" title="Página anterior (←)" class="btn-icon">
                    ❮
                </button>
                <div class="page-info">
                    <input type="number" v-model.number="pageInput" @keyup.enter="goToPage" @blur="goToPage" min="1"
                        :max="totalPages" />
                    <span class="total-pages">/ {{ totalPages || '—' }}</span>
                </div>
                <button @click="nextPage" :disabled="currentPage >= totalPages" title="Página siguiente (→)"
                    class="btn-icon">
                    ❯
                </button>
            </div>

            <div class="toolbar-group">
                <button @click="zoomOut" :disabled="scale <= 0.3" title="Alejar (-)" class="btn-icon">−</button>

                <select :value="presetZoomValue" @change="applyPresetZoom" class="zoom-select" title="Escala de zoom">
                    <option value="0.5">50%</option>
                    <option value="0.75">75%</option>
                    <option value="1">100%</option>
                    <option value="1.25">125%</option>
                    <option value="1.5">150%</option>
                    <option value="2">200%</option>
                    <option v-if="isCustomZoom" :value="scale">
                        {{ Math.round(scale * 100) }}% (Personalizado)
                    </option>
                </select>

                <button @click="zoomIn" :disabled="scale >= 3" title="Acercar (+)" class="btn-icon">+</button>
                <button @click="resetZoom" title="Restablecer zoom (100%)" class="btn-text">100%</button>
            </div>

            <div class="toolbar-group">
                <button @click="rotate" title="Rotar 90°" class="btn-icon">↻</button>
            </div>
        </header>

        <main class="pdf-container" ref="containerRef">
            <div v-if="loading" class="loading-overlay">
                <div class="spinner"></div>
                <p>Cargando documento...</p>
            </div>

            <div v-else-if="error" class="error-overlay">
                <span class="error-icon">⚠️</span>
                <p>{{ error }}</p>
            </div>

            <div class="pdf-wrapper" v-show="!loading && !error">
                <VuePdfEmbed :key="`${pdfSourceKey}-${scale}-${rotation}`" :source="pdf" :page="currentPage"
                    :scale="scale" :rotation="rotation" @rendered="onPageRendered" @loading="loading = true"
                    @error="onError" class="pdf-embed" />
            </div>
        </main>

        <footer class="status-bar">
            <span>Página {{ currentPage }} de {{ totalPages || '—' }}</span>
            <span>Zoom: {{ Math.round(scale * 100) }}%</span>
            <span v-if="rotation">Rotación: {{ rotation }}°</span>
        </footer>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

const props = defineProps({
    pdf: {
        type: [String, Object, Uint8Array],
        required: true
    }
})

// Estado
const scale = ref(1)
const rotation = ref(0)
const currentPage = ref(1)
const totalPages = ref(0)
const loading = ref(true)
const error = ref(null)
const containerRef = ref(null)
const pageInput = ref(1)

// Identificador para resetear canvas al cambiar de prop pdf
const pdfSourceKey = ref(0)

// Opciones predefinidas de Zoom
const presetOptions = ['0.5', '0.75', '1', '1.25', '1.5', '2']

const presetZoomValue = computed(() => {
    const currentStr = scale.value.toString()
    return presetOptions.includes(currentStr) ? currentStr : scale.value
})

const isCustomZoom = computed(() => {
    return !presetOptions.includes(scale.value.toString())
})

// Sincronización de Inputs y Cambios de Prop
watch(() => props.pdf, () => {
    currentPage.value = 1
    pageInput.value = 1
    totalPages.value = 0
    loading.value = true
    error.value = null
    scale.value = 1
    rotation.value = 0
    pdfSourceKey.value++
}, { immediate: true })

watch(currentPage, (val) => {
    pageInput.value = val
})

// Handlers de la librería
function onPageRendered(pdfDoc) {
    loading.value = false
    if (pdfDoc && pdfDoc.numPages) {
        totalPages.value = pdfDoc.numPages
    }
}

function onError(err) {
    loading.value = false
    error.value = err?.message || 'Ocurrió un error al cargar el documento PDF.'
}

// Navegación
function prevPage() {
    if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++
}

function goToPage() {
    let page = parseInt(pageInput.value, 10)
    if (isNaN(page) || page < 1) page = 1
    if (totalPages.value && page > totalPages.value) page = totalPages.value
    currentPage.value = page
    pageInput.value = page
}

// Zoom
function zoomIn() {
    scale.value = Math.min(Number((scale.value + 0.15).toFixed(2)), 3)
}

function zoomOut() {
    scale.value = Math.max(Number((scale.value - 0.15).toFixed(2)), 0.3)
}

function resetZoom() {
    scale.value = 1
}

function applyPresetZoom(e) {
    scale.value = parseFloat(e.target.value)
}

// Rotación
function rotate() {
    rotation.value = (rotation.value + 90) % 360
}
</script>

<style scoped>
.pdf-viewer {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 550px;
    border-radius: 10px;
    background: #f1f5f9;
    overflow: hidden;
    border: 1px solid #cbd5e1;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Toolbar */
.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background: #1e293b;
    color: #f8fafc;
    gap: 12px;
    flex-wrap: wrap;
    z-index: 5;
}

.toolbar-group {
    display: flex;
    align-items: center;
    gap: 6px;
}

/* Botones */
.btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    background: #334155;
    color: #f8fafc;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-icon:hover:not(:disabled) {
    background: #475569;
    color: #ffffff;
}

.btn-icon:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}

.btn-text {
    height: 32px;
    padding: 0 10px;
    border: none;
    border-radius: 6px;
    background: #334155;
    color: #f8fafc;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.btn-text:hover {
    background: #475569;
}

/* Inputs y Selects */
.page-info {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
}

.page-info input {
    width: 44px;
    height: 30px;
    text-align: center;
    background: #334155;
    border: 1px solid #475569;
    border-radius: 4px;
    color: #fff;
    font-size: 13px;
}

.page-info input:focus {
    outline: 2px solid #3b82f6;
    border-color: transparent;
}

.total-pages {
    color: #94a3b8;
}

.zoom-select {
    height: 32px;
    padding: 0 8px;
    background: #334155;
    border: 1px solid #475569;
    border-radius: 6px;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
}

.zoom-select:focus {
    outline: 2px solid #3b82f6;
}

/* Viewport / Contenedor */
.pdf-container {
    flex: 1;
    position: relative;
    overflow: auto;
    padding: 24px;
    background-color: #475569;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.pdf-wrapper {
    transition: transform 0.2s ease;
}

.pdf-embed {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
    background: #ffffff;
    border-radius: 2px;
}

/* Overlays */
.loading-overlay,
.error-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(4px);
    color: #ffffff;
    z-index: 10;
    gap: 12px;
}

.spinner {
    width: 38px;
    height: 38px;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

.error-icon {
    font-size: 32px;
}

.error-overlay p {
    color: #fca5a5;
    font-size: 14px;
    font-weight: 500;
}

/* Footer / Status Bar */
.status-bar {
    display: flex;
    justify-content: space-between;
    padding: 6px 16px;
    background: #1e293b;
    border-top: 1px solid #334155;
    font-size: 12px;
    color: #94a3b8;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 640px) {
    .toolbar {
        justify-content: center;
    }
}
</style>