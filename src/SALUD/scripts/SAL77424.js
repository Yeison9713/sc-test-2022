const { toHexString, defaultOptionListAppearanceProvider } = require("pdf-lib");

new Vue({
    el:'#SAL77424',
    data:{
        form:{
            numeroenvio_SAL77424: "",
        },
        SAL77424: [],
    },
    created(){
        _toggleNav();
        _inputControl("disabled");
        nombreOpcion("9-7-7-4-2-4 - Separa envio ");
        if (localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'LYRC' || localStorage.Usuario == 'MSBR'){
            this._evaluarenvio_SAL77424();
        } else {
            CON851('','DESHAB',null,'error','Error');
            _toggleNav();
        }
    },
    methods: {
        _evaluarenvio_SAL77424(){
            validarInputs({
                form: "#VALIDAR1_SAL77424",
                orden: '1'
            },
                _toggleNav,
                () => {
                    if (this.form.numeroenvio_SAL77424.trim() == '' || this.form.numeroenvio_SAL77424 == 0){
                        CON851('','03',null,'error','Error');
                        this._evaluarenvio_SAL77424();
                    } else {
                        CON851P('00', this._evaluarenvio_SAL77424, () => {
                            postData({ datosh: `${datosEnvio()}${this.form.numeroenvio_SAL77424}|` },
                            get_url("APP/SALUD/SAL77424.DLL"))
                            .then(data => {
                                var data = data.split("|");
                                CON851('','39',null,'success','Exito');
                                _toggleNav();
                            })
                            .catch(err => {
                                loader('hide');
                                console.error(err);
                                this._evaluarenvio_SAL77424();
                            });
                        });
                    }
                }
            )
        },
        _ventanaenvios_SAL77424() {
            let $_this = this;
            loader('show');
            let URL = get_url("APP/SALUD/SER846.DLL");
            postData( { datosh: `${datosEnvio()}20${$_USUA_GLOBAL[0].FECHALNK.substring(0,4)}` }, URL)
            .then((data) => {
                loader("hide");
                _ventanaDatos({
                    titulo: `VENTANA DE ENVIOS ${$_USUA_GLOBAL[0].FECHALNK.substring(2,4)} \ 20${$_USUA_GLOBAL[0].FECHALNK.substring(0,2)}`,
                    columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
                    data: data.ENVIOS,
                    callback_esc: function () {
                        $(".numeroenvio_SAL77424").focus();
                    },
                    callback: function (data) {
                        $_this.form.numeroenvio_SAL77424 = data.NRO.trim();
                        _enterInput('.numeroenvio_SAL77424');
                    }
                });
            })
            .catch((error) => {
                loader('hide');
                console.error(error);
                $(".numeroenvio_SAL77424").focus();
            });
        },
    }
})