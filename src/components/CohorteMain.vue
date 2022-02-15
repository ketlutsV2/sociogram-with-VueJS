<template>
  <div class="toolbar flex-rows mb-3">
    <div class="text-start flex-1">
      <a
        v-bind:href="`#cohorte/${$route.params.cohorte_id}/import`"
        class="btn btn-light me-2"
      >
        <span class="bi bi-plus"></span> Nouvelles personnes
      </a>
      <div
        class="btn btn-light ifCohortes large-screen"
        onclick="app.go('sociogrammes/'+app.currentClasse.classe_id+'');"
      >
        <span class="bi bi-bullseye"> </span>
        <span class="large-screen"> Créer un sociogramme</span>
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
    :rows="personsInCohorte"
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
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import router from "@/router";

export default {
  name: "CohorteMain",
  data: function () {
    return {
      title: 'MonSociogram<span class="small">.me</span>',
      page: "liste",
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
  components: {},
  computed: {
    ...mapState([
      "serveur",
      "sessionID",
      "sessionParams",
      "persons",
      "cohortes",
    ]),
    personsInCohorte: function () {
      return this.persons.filter(
        (person) =>
          this.cohortes
            .find(
              (cohorte) => cohorte.classe_id == this.$route.params.cohorte_id
            )
            .eleves.indexOf(person.eleve_id) >= 0
      );
    },
  },
  methods: {
    ...mapActions(["setHeaderTitle", "dataCallBack"]),
    selectionChanged(params) {
      this.rowSelection = params.selectedRows;
    },
    deletePersons() {
      this.$swal({
        title: "Supprimer ces personnes et toutes les données liées ?",
        showCancelButton: true,
        confirmButtonText: "Supprimer",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          return axios
            .post(this.serveur + "index.php?go=eleves&q=delete", {
              eleves: JSON.stringify(
                this.rowSelection.map((person) => Number(person.eleve_id))
              ),
              sessionParams: this.sessionParams,
            })
            .then((response) => {
              this.dataCallBack(response.data);
              return { isConfirmed: true };
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
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
    this.setHeaderTitle(this.title);
  },
};
</script>

<style lang="scss" scoped></style>
