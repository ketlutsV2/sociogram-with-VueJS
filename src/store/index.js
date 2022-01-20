import { createStore } from 'vuex'

export default createStore({
  state: {
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
