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
    headerTitle: "",
    cohortes: [],
    persons: []
  },
  mutations: {
    SET_SESSIONID(state, sessionID) {
      state.sessionID = sessionID;
    },
    SET_SESSION_PARAMS(state, sessionPARAMS) {
      state.sessionParams = sessionPARAMS;
    },
    SET_HEADER_TITLE(state, title) {
      state.headerTitle = title;
    },
    RESET_COHORTES(state) {
      state.cohortes.forEach((cohorte) => (cohorte.eleves = []));
    },
    SET_COHORTES(state, cohortes) {
      state.cohortes = cohortes;
    },
    SET_PERSONS(state, persons) {
      state.persons = persons;
    },
    ADD_PERSON_TO_COHORTE(state, relation) {
      state.cohortes
        .find((element) => element.classe_id == relation.rec_classe)
        .eleves.push(relation.rec_eleve);
    },
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
            this.dispatch("dataCallBack", data).then(() => { });

          })
          .catch((error) => {
            if (error.response) {
              payload.app.APIcallback(error.response.data);
            }
          });
        resolve();
      });
    },
    dataCallBack({ state, commit, dispatch }, data) {
      if (data.classes) {
        this.dispatch("buildCohortes", data.classes).then(() => { });
      }
      if (data.persons) {
        this.dispatch("buildPersons", data.persons).then(() => { });
      }
      if (data.personsByCohortes) {
        this.dispatch("buildPersonsByCohorte", data.personsByCohortes);
      }
    },
    setHeaderTitle({ commit }, title) {
      commit("SET_HEADER_TITLE", title);
    },
    buildPersonsByCohorte({ commit }, relations) {
      commit("RESET_COHORTES");
      relations.forEach((relation) =>
        commit("ADD_PERSON_TO_COHORTE", relation)
      );
    },
    buildCohortes({ commit }, cohortes) {
      return new Promise((resolve, reject) => {
        cohortes.push({
          classe_nom: "~Toutes les personnes~",
          classe_id: "-1",
          controles: [],
          eleves: [],
          sociogrammes: [],
          groupes: [],
          classe_destinataires: [],
          classe_intelligences: false,
        });

        cohortes.push({
          classe_nom: "~Non classées~",
          classe_id: "-2",
          controles: [],
          eleves: [],
          sociogrammes: [],
          groupes: [],
          classe_destinataires: [],
          classe_intelligences: false,
        });

        commit("SET_COHORTES", cohortes);
        resolve();
      });
    },
    addCohorte: function ({ state, dispatch }, cohorte_name) {
      return new Promise((resolve, reject) => {
        const app = this;
        axios
          .post(state.serveur + "index.php?go=classe&q=add", {
            classe_nom: cohorte_name,
            sessionParams: state.sessionParams,
          })
          .then((response) => {
            let data = response.data;
            dispatch("buildCohortes", data.classes).then(() => { });
            resolve();
          });
      });
    },
    buildPersons({ commit }, persons) {
      return new Promise((resolve, reject) => {
        commit("SET_PERSONS", persons);
        resolve();
      });
    },
  },
  modules: {},
});
