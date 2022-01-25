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
  },
  mutations: {
    SET_SESSIONID(state, sessionID) {
      state.sessionID = sessionID;
    },
  },
  actions: {
    getSessionID({ state, commit }, payload) {
       
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
          } else {
             payload.app.APIcallback(data);
          }
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
        //    alert(error.response.data.info[0][0]);
        payload.app.APIcallback(error.response.data);
          //  app.config.globalProperties.SwalAlert({ title: error.response.data.info[0][0] });
          //  console.log(error.response.status);
          //  console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
          //  console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
         //   console.log('Error', error.message);
          }
         // console.log(error.config);
        });
    },
  },
  modules: {},
});
