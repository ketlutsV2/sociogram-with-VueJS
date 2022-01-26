<template src="./ConnexionTemplate.html">
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "@/router";

export default {
  name: "ConnexionScreen",
  data: function () {
    return {
      modeDuFormulaire: "connexion",
      user_pseudo: "",
      user_pass_1: "",
      user_pass_2: "",
      sessionID: null,
    };
  },
  components: {},
  methods: {
    focusInput() {
      this.$refs.pseudoInput.focus();
    },
    connexion() {
      const app = this;
      this.getSessionID({
        user_pseudo: this.user_pseudo,
        user_pass: this.user_pass_1,
        app: app,
      }).then(() => {
        this.loadData({
          app: app,
        });
      }).then(()=>{
        router.push('mentions');
      });
    },
    ...mapActions(["getSessionID", "loadData"]),
  },
};
</script>

<style lang="scss" scoped></style>
