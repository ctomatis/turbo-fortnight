<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
  data() {
    const options = ['Positivo', 'Negativo', 'Insuficiente', 'Cancelado']
    const genes = ["KRAS", "BRAF", "EGFR", "PDL1"]
    const disabled = false
    const error = ""

    const form = {
      title: '',
      content: "",
      gene: ""
    }
    return { form, options, genes, disabled, error }
  },
  created: function () {
    return this.$store.dispatch('getNotes');
  },
  computed: {
    ...mapGetters({ notes: 'stateNotes' }),
  },
  methods: {
    ...mapActions(['createNote']),

    async submit() {
      this.$data.disabled = true
      this.$data.error = ""

      if (this.$data.genes.includes(this.form.gene)) {
        await this.createNote(this.form);
      } else {
        this.$data.error = " is-invalid"
      }
      this.$data.disabled = false
    },
  },
});
</script>
<template>
  <section>
    <div class="row">
      <div class="col-8">
        <h1>Subir nuevo resultado</h1>
        <hr />
        <!-- <div v-if="form.content">
          {{ JSON.stringify(form.content) }}

        </div> -->
        <form @submit.prevent="submit" class="needs-validation">
          <div class="mb-3">
            <label for="title" class="form-label">Nombre del paciente:</label>
            <input type="text" required name="title" v-model.trim="form.title" class="form-control" />
          </div>
          <div class="mb-3">
            <select required class="form-select" v-model="form.content">
              <option disabled value="">-- Seleccionar --</option>
              <option v-for="(v, index) in options" :key="index" :value="v" v-text="v"></option>
            </select>
          </div>
          <div class="mb-3">
            <label for="gene" class="form-label">Gen evaluado:</label>
            <input required type="text" name="gene" v-model="form.gene" :class="'form-control' + error" />
            <div v-if="error.length" class="invalid-feedback">
              Valores aceptados {{ genes.join(", ") }}.
            </div>
          </div>
          <button :disabled="disabled" type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>



      <div class="col-4">
        <h1>Notes</h1>
        <hr />
        <div v-if="notes?.length">
          <div v-for="note in notes" :key="note.id" class="notes">
            <div class="card">
              <div class="card-body">
                <ul>
                  <li><strong>Note Title:</strong> {{ note.title }}</li>
                  <li><strong>Author:</strong> {{ note.author.username }}</li>
                  <li><router-link :to="{ name: 'Note', params: { id: note.id } }">View</router-link></li>
                </ul>
              </div>
            </div>
            <br />
          </div>
        </div>

      </div>

    </div>

  </section>

  <!-- <section>
    <h1>Notes</h1>
    <hr /><br />

    <div v-if="notes.length">
      <div v-for="note in notes" :key="note.id" class="notes">
        <div class="card">
          <div class="card-body">
            <ul>
              <li><strong>Note Title:</strong> {{ note.title }}</li>
              <li><strong>Author:</strong> {{ note.author.username }}</li>
              <li><router-link :to="{ name: 'Note', params: { id: note.id } }">View</router-link></li>
            </ul>
          </div>
        </div>
        <br />
      </div>
    </div>

    <div v-else>
      <p>Nothing to see. Check back later.</p>
    </div>

  </section> -->
</template>


