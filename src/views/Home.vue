<template>
  <HeadersBloc />

  <div class="template_home template flex-columns box flex-1">
    <div class="main flex-rows flex-1">
      <div class="flex-columns flex-4 large-screen">
        <div class="flex-columns home-page" id="home-classrooms">
          <div class="btn-toolbar">
            <button class="btn btn-light" @click="renderAddClasse">
              <img src="assets/svg/all/003-group.svg" width="25" />
              Nouvelle cohorte
            </button>
          </div>

          <div class="flex-1" id="cohortes-liste-bloc">
            <div class="bold text-start mb-3">Choisis une cohorte.</div>
            <div id="home-classrooms-liste">
              <template
                v-for="classe in visibleCohortes"
                v-bind:key="classe.classe_id"
              >
                <div
                  class="home-classroom-btn me-2"
                  onclick="app.go('sociogrammes/{{classe.classe_id}}');"
                >
                  <div class="home-classroom-box flex-columns">
                    <div class="home-classroom-name" style="">
                      {{ classe.classe_nom }}
                    </div>

                    <div class="flex-rows home-classroom-toolbar">
                      <div class="flex-1 text-start">
                        <a
                          class="btn btn-light btn-sm"
                          href="#classroom/{{classe.classe_id}}"
                          onclick="event.stopPropagation();"
                        >
                          <span class="bi bi-person-plus-fill"></span>
                        </a>
                      </div>

                      <div class="flex-1">
                        <a
                          class="btn btn-light btn-sm ifCohortes"
                          href="#sociogrammes/{{classe.classe_id}}"
                          onclick="event.stopPropagation();"
                        >
                          <span class="bi bi-bullseye"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div id="home-aside" class="aside flex-1 text-center"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "@/router";
import HeadersBloc from "@/components/HeadersBloc.vue";

export default {
  name: "Home",
  data: function () {
    return {
      title: 'MonSociogram<span class="small">.me</span>',
    };
  },
  computed: {
    ...mapState(["cohortes", "sessionID"]),
    visibleCohortes: function () {
      return this.cohortes.filter((cohorte) => cohorte.classe_id > -1);
    },
  },
  components: {
    HeadersBloc,
  },
  methods: {
    renderAddClasse: function () {
      this.$swal({
        text: "Nom de la nouvelle cohorte ?",
        input: "text",
        inputPlaceholder: "6ème A",
        icon: "warning",
        heightAuto: false,
        confirmButtonText: "Enregistrer",
        inputValidator: (value) => {
          if (!value) {
            return "Il faut indiquer un nom de cohorte.";
          }
        },
      }).then((response) => {
        if (!response.isConfirmed) {
          return;
        }

        this.addCohorte(response.value).then(() => {
          this.$swal({
            text: "Cohorte créé !",
            icon: "success",
            heightAuto: false,
            timer: 5000,
          });
        });
      });
    },
    ...mapActions(["addCohorte", "setHeaderTitle"]),
  },
  mounted: function () {
    if (!this.sessionID) {
      router.push("/");
    }
    this.setHeaderTitle(this.title);
  },
};
</script>
