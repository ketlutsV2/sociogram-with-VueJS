<template>
  <HeadersBloc />
  <div class="template template_classe box">
    <div class="toolbar flex-rows mb-3">
      <div class="text-start flex-1">
        <button
          onclick="app.go('classroom/'+app.currentClasse.classe_id+'/import');"
          title="Ajouter une personne"
          class="btn btn-light me-2"
        >
          <span class="bi bi-person-plus-fill"></span>
          Nouvelles personnes
        </button>

        <div
          class="btn btn-light ifCohortes large-screen"
          onclick="app.go('sociogrammes/'+app.currentClasse.classe_id+'');"
        >
          <span class="bi bi-bullseye"> </span>
          <span class="large-screen">Créer un sociogramme</span>
        </div>
 </div>
        <div class="text-end large-screen">
          <button
            onclick="app.go('classroom/'+app.currentClasse.classe_id+'/config');"
            title="Configuration de la cohorte"
            class="btn btn-light"
          >
            <span class="bi bi-gear"></span>
          </button>
        </div>
     
    </div>
    <vue-good-table
      v-on:selected-rows-change="selectionChanged"
      :columns="columns"
      :rows="this.persons"
      :search-options="{
        enabled: true,
      }"
      :select-options="{
        enabled: true,
        clearSelectionText: 'Annuler',
      }"
      ref="persons-table"
    >
      <template #selected-row-actions>
        <button class="btn btn-light" @click="deletePersons">Supprimer</button>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "@/router";
import HeadersBloc from "@/components/HeadersBloc.vue";
import axios from "axios";

export default {
  name: "Cohorte",
  data: function () {
    return {
      title: 'MonSociogram<span class="small">.me</span>',
      columns: [
        // {
        //   label: "ID",
        //   field: "eleve_id",
        // },
        {
          label: "Nom",
          field: "eleve_nom",
        },
        {
          label: "Prénom",
          field: "eleve_prenom",
        },
      ],
      rowSelection: [],
    };
  },
  computed: {
    ...mapState(["serveur", "sessionID", "sessionParams", "persons"]),
  },
  components: {
    HeadersBloc,
  },
  methods: {
    ...mapActions(["setHeaderTitle", "loadData"]),
    selectionChanged(params) {
      this.rowSelection = params.selectedRows;
    },
    deletePersons() {
      this.$swal({
        title: "Supprimer ces personnes et toutes les données liées ?",
        showCancelButton: true,
        confirmButtonText: "Supprimer",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios
            .post(this.serveur + "index.php?go=eleves&q=delete", {
              eleves: JSON.stringify(
                this.rowSelection.map((person) => Number(person.eleve_id))
              ),
              sessionParams: this.sessionParams,
            })
            .then((response) => {
              this.dataCallBack(response.data);
              return {isConfirmed:true}
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Personnes supprimées !`,
          });
        }
      });
      // app.alert(
      //   {
      //     title:
      //       "Supprimer ce" +
      //       app.pluralize(ids.length, "s", "tte") +
      //       " personne" +
      //       app.pluralize(ids.length, "s", "") +
      //       " et TOUTES " +
      //       app.pluralize(ids.length, "LEURS", "SES") +
      //       " RELATIONS ?",
      //     icon: "confirm",
      //   },
      //   function () {
      //     app.studentsDelete(true);
      //   }
      // );
    },
  },
  mounted: function () {
    if (!this.sessionID) {
      router.push("/");
    }
    this.setHeaderTitle(this.title);
  },
};
</script>
