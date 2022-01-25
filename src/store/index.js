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
    version : "v20220102",
  },
  mutations: {
    SET_SESSIONID(state, sessionID) {
      state.sessionID = sessionID;
    },
    SET_SESSION_PARAMS(state, sessionPARAMS) {
      state.sessionParams = sessionPARAMS;
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
                  time:new Date().getTime(),
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
    loadData({ state, commit }, payload) {
      axios
        .post(state.serveur + "index.php?go=loader", {
          sessionParams: state.sessionParams,
        })
        .then((response) => {
          let data = response.data;
        })
        .catch((error) => {
          if (error.response) {
            payload.app.APIcallback(error.response.data);
          }
        });
    },
  },
  modules: {},
});
