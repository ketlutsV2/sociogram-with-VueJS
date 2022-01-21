<template>
  <div id="connexionScreen" class="template flex-1 box text-center">
    <div class="template_connexion box" id="connexion-header">
      <span class="h1">
        <img src="assets/img/logo.svg" width="50" />
        <span> MonSociogram<span class="small">.me</span> </span>
      </span>
    </div>
    <div class="template template_connexion box">
      <div class="flex-rows main">
        <div class="main-reverse flex-rows flex-3">
          <div class="flex-1 flex-columns" id="connexion-menu">
            <div class="btn-group-vertical">
              <button
                class="btn btn-light"
                id="connexion-menu-nouvelEtablissement"
                autocomplete="off"
                @click="
                  modeDuFormulaire = 'creation';
                  this.focusInput();
                "
              >
                <span class="bi bi-plus"></span> Créer un compte
              </button>
            </div>
          </div>
          <div class="flex-2 text-center" id="connexion-user-form">
            <div class="well well-sm">
              <form onsubmit="return false">
                <button onclick="app.connexionValidForm();" hidden></button>

                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-text">
                      <span class="bi bi-people-fill"></span>
                    </div>
                    <input
                      class="form-control"
                      ref="pseudoInput"
                      :value="user_pseudo"
                      @input="setUserPseudo"
                      placeholder="Pseudo"
                    />
                  </div>
                  <div class="input-group">
                    <div class="input-group-text">
                      <span class="bi bi-chevron-right"></span>
                    </div>
                    <input
                      class="form-control"
                      v-model="user_pass_1"
                      placeholder="Mot de passe"
                      type="password"
                    />
                  </div>
                  <div
                    class="input-group"
                    id="user_passe2_form"
                    v-if="modeDuFormulaire == 'creation'"
                  >
                    <div class="input-group-text">
                      <span class="bi bi-chevron-right"></span>
                    </div>
                    <input
                      class="form-control"
                      id="user_passe2"
                      name="user_passe2"
                      placeholder="Confirmez le mot de passe"
                      type="password"
                    />
                  </div>
                  <br />
                  <div class="flex-rows">
                    <div class="text-start flex-1">
                      <a
                        href="#"
                        onclick="$('#connexion-password-recovery').css('display','block').goTo();"
                      >
                        Mot de passe perdu ?</a
                      >
                    </div>
                    <div
                      class="text-end flex-1"
                      v-if="modeDuFormulaire == 'connexion'"
                    >
                      <div id="connexion-btn-step1">
                        <div class="form-group text-end">
                          <button
                            id="connexion-btn-user"
                            class="btn btn-primary connexion-btn"
                            @click="connexion"
                            data-loading-text="Connexion en cours..."
                            type="submit"
                          >
                            <span class="bi bi-box-arrow-in-right"></span>
                            Connexion
                          </button>
                          <br />
                          Rester connecté
                          <input type="checkbox" id="connexion_auto" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>&nbsp;</div>

                <div
                  id="connexion-btn-step2"
                  class="text-center"
                  v-if="modeDuFormulaire == 'creation'"
                >
                  <button
                    class="btn btn-light float-left"
                    @click="modeDuFormulaire = 'connexion'"
                  >
                    Annuler
                  </button>
                  <button
                    class="
                      btn btn-primary
                      float-right
                      connexion-btn connexion-requise
                    "
                    onclick="app.connexionValidForm();"
                  >
                    <span class="bi bi-plus"></span> Créer ce compte
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="flex-1 text-center">
          <!-- ASIDE -->
        </div>
      </div>

      <div class="clearfix"></div>
      <div id="connexion-plugins-bloc"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

export default {
  name: "ConnexionScreen",
  data: function () {
    return {
      modeDuFormulaire: "connexion",
      user_pass_1: "",
      user_pass_2: "",
    };
  },
  components: {},
  methods: {
    focusInput() {
      this.$refs.pseudoInput.focus();
    },
    setUserPseudo(e) {
      this.$store.commit("setUserPseudo", e.target.value);
    },
    connexion() {
      const pseudo_utilisateur = this.$store.state.user.pseudo;

      const APIcallback = this.APIcallback;
      axios
        .post(this.$store.state.serveur + "index.php?go=users&q=sessionInit", {
          nom_etablissement: pseudo_utilisateur,
          pseudo_utilisateur: pseudo_utilisateur,
          pass_utilisateur: this.user_pass_1,
        })
        .then(function (response) {
          APIcallback(response.data);
        });
    },
  },
  computed: mapState({
    user_pseudo: (state) => state.user.pseudo,
  }),
};
</script>

<style lang="scss" scoped></style>
