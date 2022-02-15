<template>
  <div class="classroom-page" id="classroom-addStudents">
    <div class="flex-colums">
      <div class="flex-rows">
        <div>
          <div class="btn-toolbar">
            <div
              @click="saveNewsPersons"
              class="btn btn-primary classroom-addStudents-btn"
              data-loading-text="Enregistrement..."
            >
              <span class="bi bi-save"></span> Enregistrer
            </div>
          </div>
        </div>
        <div class="flex-1 text-end">
          <a
            class="btn btn-light btn-close"
            v-bind:href="`#cohorte/${$route.params.cohorte_id}`"
          ></a>
        </div>
      </div>

      <div class="flex-rows">
        <div class="flex-1 flex-columns">
          <div class="h4">Nouvelles personnes</div>

          <div class="btn-toolbar">
            <div class="btn btn-light me-2" @click="addPersonInput">
              <span class="bi bi-plus"></span> Nouvelle personne
            </div>
          </div>
          <div id="classroom-addStudents-liste">
            <template v-for="person in newsPersons" v-bind:key="person.id">
              <div class="classroom-addStudents-liste-student flex-rows">
                <div class="flex-1 me-2 flex-rows">
                  <button
                    type="button"
                    id=""
                    class="btn btn-light me-2"
                    @click="removePersonInput(person.id)"
                  >
                    <span class="bi bi-trash"></span>
                  </button>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="NOM"
                      :value="person.person_nom"
                      @input="
                        (event) => (person.person_nom = event.target.value)
                      "
                    />
                  </div>
                </div>
                <div class="flex-1 me-2">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Prénom"
                      :value="person.person_prenom"
                      @input="
                        (event) => (person.person_prenom = event.target.value)
                      "
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="flex-colums flex-1 aside large-screen">
          <div class="h4">
            Importer depuis un tableur<br />
            <small>
              Colonne 1 : NOM / Colonne 2 : Prénom<br />
              Vous pourrez vérifier des données avant d'enregistrer.
            </small>
          </div>
          <textarea
            class="form-control"
            placeholder="Copier/Coller depuis le tableur."
            v-model="personsFromTableur"
          ></textarea>
          <div class="text-center">
            <button
              class="btn btn-light"
              id="import-tableur-btn"
              @click="importFromTableur"
            >
              <span class="bi bi-cloud-upload"></span> Importer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "@/router";
import axios from "axios";

export default {
  name: "PersonsImport",
  data: function () {
    return {
      title: 'MonSociogram<span class="small">.me</span> / Nouvelles personnes',
      newsPersons: [
        {
          person_nom: "",
          person_prenom: "",
          id: 0,
        },
      ],
      personsFromTableur: "",
      count: 0,
    };
  },
  computed: {
    ...mapState(["serveur", "sessionID", "sessionParams"]),
  },
  methods: {
    ...mapActions(["setHeaderTitle", "dataCallBack"]),
    addPersonInput: function () {
      this.count++;
      this.newsPersons.push({
        person_nom: "",
        person_prenom: "",
        id: this.count,
      });
    },
    removePersonInput: function (id) {
      this.newsPersons.splice(
        this.newsPersons.findIndex((person) => person.id == id),
        1
      );
    },
    importFromTableur: function () {
      let split = this.personsFromTableur.split("\n");
      let persons = [];
      for (let i = split.length - 1; i >= 0; i--) {
        let eleve_tab = split[i];
        let eleve = eleve_tab.split("\t");
        this.count++;
        persons.push({
          person_nom: eleve[0],
          person_prenom: eleve[1],
          id: this.count,
        });
      }
      this.newsPersons = persons;
    },
    saveNewsPersons: function () {
      axios
        .post(this.serveur + "index.php?go=eleves&q=add", {
          id: this.$route.params.cohorte_id,
          eleves: JSON.stringify(this.newsPersons),
          sessionParams: this.sessionParams,
        })
        .then((response) => {
          this.dataCallBack(response.data);
          router.go(-1);
        });
    },
  },
  mounted: function () {
    this.setHeaderTitle(this.title);
  },
};
</script>

<style lang="scss" scoped></style>
