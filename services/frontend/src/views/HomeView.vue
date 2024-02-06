<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { formatDateTime } from '../helpers/utils'
import CardBox from '@/components/CardBox.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    CardBox
  },
  data() {
    const headers = ["#", "paciente", "gen", "resultado", "médico", "fecha"];
    return { headers };
  },
  created() {
    return this.$store.dispatch('getNotes');
  },
  computed: {
    ...mapGetters({ notes: 'stateNotes', user: 'stateUser' }),
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  /* mounted() {
    this.notes.forEach(elm => {
      if (elm.content !== "Negativo") this.data.positive++;
    })
  }, */
  methods: {
    dt(val) {
      return formatDateTime(val);
    }
  },
})
</script>
<template>
  <section>
    <div class="row">
      <div class="col-12">
        <h1>Listado de resultados</h1>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-9">
        <div class="card">
          <table class="table table-striped">
            <thead>
              <tr>
                <th v-for="h in headers" scope="col" v-text="h" :key="h"></th>
              </tr>
            </thead>
            <tbody v-if="notes?.length">
              <tr v-for="note in notes" :key="note.id">
                <th scope="row" v-text="note.id"></th>
                <td v-text="note.title"></td>
                <td v-text="note.gene"></td>
                <td>
                  <a role="button" rel="noopener" v-text="note.content"></a>
                </td>
                <td v-text="note.author.full_name"></td>
                <td v-text="dt(note.created_at)"></td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="text-center">
                <td colspan="5">No hay resultados disponibles.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="notes?.length && user.id" class="col-3">
        <div class="row row-cols-1 g-3">
          <CardBox :notes="notes" title="Resultados positivos" :status="status" :total="notes.length" :user="user.id" />
        </div>
      </div>
    </div>




    <!-- <p>This site is built with FastAPI and Vue.</p>

    <div v-if="isLoggedIn" id="logout">
      <p id="logout">Click <a href="/dashboard">here</a> to view all notes.</p>
    </div>
    <p v-else>
      <span><a href="/register">Register</a></span>
      <span> or </span>
      <span><a href="/login">Log In</a></span>
    </p> -->
  </section>
</template>

