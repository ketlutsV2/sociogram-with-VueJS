export default {
    install(app, options) {

       app.config.globalProperties.APIcallback = function (data) {
            
        console.log(data);



          };
    }
  };