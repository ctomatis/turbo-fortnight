<template>
    <div class="col">
        <div class="card">
            <div class="card-body">
                <h6 class="card-title fw-bold">{{ title }}</h6>
                <div class="d-flex small justify-content-between">
                    <span>Porcentaje</span>
                    <span>{{ ((len / total) * 100).toFixed(2) }}%</span>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
            <div class="card-body">
                <h6 class="card-title fw-bold pb-2">{{ title }} por Gen</h6>
                <div v-for="(value, key) in genes" :key="key" class="d-flex small justify-content-between py-1 border-top">
                    <span>{{ key }}</span>
                    <span>{{ ((value / len) * 100).toFixed(2) }}%</span>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
            <div class="card-body">
                <h6 class="card-title fw-bold">Estudios cargados</h6>
                <div class="d-flex small justify-content-between">
                    <span>Porcentaje</span>
                    <span>{{ ((byUser / total) * 100).toFixed(2) }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CardBox',
    props: ["notes", "title", "content", "total", "user"],
    data() {
        const byUser = this.notes.filter(elm => elm.author.id === this.user).length

        const positivos = this.notes.filter(elm => elm.content === "Positivo")
        const len = positivos.length

        let genes = {}

        positivos.forEach(v => {
            const { gene } = v
            if (!genes[gene]) {
                genes[gene] = 0
            }
            genes[gene]++
        })

        return { len, genes, byUser }
    },
    setup(props) {
        return { props }
    }
});
</script>
  
  