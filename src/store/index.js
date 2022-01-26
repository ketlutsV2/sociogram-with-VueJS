import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    serveur: "http://localhost:80/monsociogram.me/apiVue/",
    user: {
      id: 0,
      pseudo: "",
    },
    sessionID: null,
    sessionParams: null,
    version: "v20220102",
    cohortes: [],
  },
  mutations: {
    SET_SESSIONID(state, sessionID) {
      state.sessionID = sessionID;
    },
    SET_SESSION_PARAMS(state, sessionPARAMS) {
      state.sessionParams = sessionPARAMS;
    },
    RESET_COHORTES(state) {
      state.cohortes.forEach(cohorte => cohorte.eleves = []);
    },
    SET_COHORTES(state, cohortes) {
      state.cohortes = cohortes;
    },
    ADD_PERSON_TO_COHORTE(state, relation) {
      state.cohortes.find(element => element.classe_id == relation.rec_classe).eleves.push(relation.rec_eleve);
      alert('f');
    }
  },
  actions: {
    getSessionID({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(state.serveur + "index.php?go=users&q=sessionInit", {
            nom_etablissement: payload.user_pseudo,
            pseudo_utilisateur: payload.user_pseudo,
            pass_utilisateur: payload.user_pass,
          })
          .then((response) => {
            let data = response.data;
            if (data.sessionID) {
              commit("SET_SESSIONID", data.sessionID);
              commit(
                "SET_SESSION_PARAMS",
                JSON.stringify({
                  nom_etablissement: payload.user_pseudo,
                  pseudo_utilisateur: payload.user_pseudo,
                  sessionID: data.sessionID,
                  version: state.version,
                  time: new Date().getTime(),
                })
              );
              resolve();
            }
          })
          .catch((error) => {
            if (error.response) {
              payload.app.APIcallback(error.response.data);
            }
          });
      });
    },
    loadData({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
      axios
        .post(state.serveur + "index.php?go=loader", {
          sessionParams: state.sessionParams,
        })
        .then((response) => {
          let data = response.data;
          if (data.classes) {
            this.dispatch('buildCohortes', data.classes).then(() => {
            });
          }
          if (data.personsByCohortes) {
            this.dispatch('buildPersonsByCohorte', data.elevesByClasses)
          }
        })
        .catch((error) => {
          if (error.response) {
            payload.app.APIcallback(error.response.data);
          }
        });
        resolve();
      })
    },
    buildPersonsByCohorte({ commit }, relations) {
      commit("RESET_COHORTES");
      relations.forEach(relation => (commit("ADD_PERSON_TO_COHORTE", relation)));
    },
    buildCohortes({ commit }, cohortes) {
      return new Promise((resolve, reject) => {

        cohortes.push({
          classe_nom: "~Toutes les personnes~",
          classe_id: '-1',
          controles: [],
          eleves: [],
          sociogrammes: [],
          groupes: [],
          classe_destinataires: [],
          classe_intelligences: false
        });

        cohortes.push({
          classe_nom: "~Non classées~",
          classe_id: '-2',
          controles: [],
          eleves: [],
          sociogrammes: [],
          groupes: [],
          classe_destinataires: [],
          classe_intelligences: false
        });

        commit("SET_COHORTES", cohortes);
        resolve();
      })
    }
  },
  modules: {},
});
