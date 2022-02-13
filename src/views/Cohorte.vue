<template>
  <HeadersBloc />
  <div class="template template_classe box">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "@/router";
import HeadersBloc from "@/components/HeadersBloc.vue";

export default {
  name: "Cohorte",
  data: function () {
    return {
      title: 'MonSociogram<span class="small">.me</span>',    
  }},
  computed: {
    ...mapState(["sessionID"]),
  },
  components: {
    HeadersBloc,
  },
    methods: {
    ...mapActions(["setHeaderTitle"]),
  },
  mounted: function () {
    if (!this.sessionID) {
      router.push("/");
    }
    this.setHeaderTitle(this.title);
  },
};
</script>
