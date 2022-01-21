export default {
    install(app, options) {

        app.config.globalProperties.SwalAlert = function (swal_options, callback, fallback) {
            callback = callback || function () { };
            fallback = fallback || function () { };

            if (swal_options.buttons === null) {
                swal_options.buttons = true;
            }

            swal_options.icon = swal_options.icon || "success";
            if (swal_options.icon == 'confirm') {
                swal_options.buttons = ['Annuler', 'Valider'];
            }
            swal_options.icon = 'warning';
            swal_options.heightAuto = false;
            app.config.globalProperties.$swal(swal_options).then(
                (confirm) => {
                    if (confirm) {
                        (callback)();
                    } else {
                        (fallback)();
                    }
                }
            );
        };
    }
};