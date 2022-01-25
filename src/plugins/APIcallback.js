import { mapMutations } from 'vuex'

export default {
  install(app, options) {
    app.config.globalProperties.APIcallback = function (data) {
      const store=app.config.globalProperties.$store;
      if (data['info'] && data['info'] != "") {
        app.config.globalProperties.SwalAlert({ title: data['info'][0][0] });
      }
      console.log(data);
    };
  }
};