import { createStore } from 'vuex'

export default createStore({
  state: {
    serveur:'http://localhost:80/monsociogram.me/apiVue/',
    user:{
      id:0,
      pseudo:'',
      sessionID:null
    },
    sessionParams:null
  },
  mutations: {
    setUserPseudo (state, user_pseudo) {
      state.user.pseudo = user_pseudo
    }
  },
  actions: {
  },
  modules: {
  }
})
