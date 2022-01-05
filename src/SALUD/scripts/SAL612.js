new Vue({
    el: '#SAL612',
    components: {
        loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
    },
    data: {
        estado_loader: false,
        progreso: {},
        label_loader: null,
        loader: 1,
        form: {
            anoinicial_SAL612: "",
            mesinicial_SAL612: "",
            diainicial_SAL612: "",
            anofinal_SAL612: "",
            mesfinal_SAL612: "",
            diafinal_SAL612: "",
        },
        SAL612: [],
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        nombreOpcion("9, 6, 8 - Recalculo de abonos de cartera");
        this.form.anoinicial_SAL612 = $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
        this.form.mesinicial_SAL612 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
        this.form.diainicial_SAL612 = moment().format('DD');
        this._evaluarfechainicial_SER162('1');
    },
    methods: {
        _evaluarfechainicial_SER162(orden) {
            validarInputs({
                form: "#VALIDAR1_SAL612",
                orden: orden
            },
                _toggleNav,
                () => {
                    let fecha = `${this.form.anoinicial_SAL612}${this.form.mesinicial_SAL612.padStart(2, '0')}${this.form.diainicial_SAL612.padStart(2, '0')}`;
                    if (moment(fecha).format('YYYYMMDD') == 'Invalid date') {
                        CON851('03', '03', this._evaluarfechainicial_SER162('1'), 'error', 'Error');
                    } else {
                        if ($_USUA_GLOBAL[0].FECHALNK.substring(2, 4) != this.form.mesinicial_SAL612.padStart(2, '0')) {
                            CON851('', 'Mes inicial debe ser igual al mes de contabilidad', this._evaluarfechainicial_SER162('1'), 'error', 'Error');
                        } else {
                            this.form.anofinal_SAL612 = $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
                            this.form.mesfinal_SAL612 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
                            let fecha = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}${moment().format('DD')}`
                            this.form.diafinal_SAL612 = moment(fecha).endOf('month').format('DD');
                            this._evaluarfechafinal_SAL612('1');
                        }
                    }
                }
            )
        },
        _evaluarfechafinal_SAL612(orden) {
            validarInputs({
                form: "#VALIDAR2_SAL612",
                orden: orden
            },
                () => {
                    this._evaluarfechainicial_SER162('3')
                },
                () => {
                    let fecha = `${this.form.anofinal_SAL612}${this.form.mesfinal_SAL612.padStart(2, '0')}${this.form.diafinal_SAL612.padStart(2, '0')}`;
                    if (moment(fecha).format('YYYYMMDD') == 'Invalid date') {
                        CON851('03', '03', this._evaluarfechafinal_SAL612('1'), 'error', 'Error');
                    } else {
                        if ($_USUA_GLOBAL[0].FECHALNK.substring(2, 4) != this.form.mesfinal_SAL612.padStart(2, '0')) {
                            CON851('', 'Mes final debe ser igual al mes de contabilidad', this._evaluarfechafinal_SAL612('1'), 'error', 'Error');
                        } else {
                            this._recalcularabonos_SAL612();
                        }
                    }
                }
            )
        },
        _recalcularabonos_SAL612() {
            this.SAL612.FECHAINI = `20${this.form.anoinicial_SAL612}${this.form.mesinicial_SAL612.padStart(2, '0')}${this.form.diainicial_SAL612.padStart(2, '0')}`
            this.SAL612.FECHAFIN = `20${this.form.anofinal_SAL612}${this.form.mesfinal_SAL612.padStart(2, '0')}${this.form.diafinal_SAL612.padStart(2, '0')}`
            this.estado_loader = true;
            this.label_loader = `Procesando: ${moment(this.SAL612.FECHAINI).format('YYYY/MM/DD')} - ${moment(this.SAL612.FECHAFIN).format('YYYY/MM/DD')}`;
            this.progreso = { transferred: 0, speed: 0 };
            postData({ datosh: `${datosEnvio()}${this.form.anoinicial_SAL612}${this.form.mesinicial_SAL612.padStart(2, '0')}${this.form.diainicial_SAL612.padStart(2, '0')}|${this.form.anofinal_SAL612}${this.form.mesfinal_SAL612.padStart(2, '0')}${this.form.diafinal_SAL612.padStart(2, '0')}|` },
                get_url("APP/SALUD/SAL612.DLL"),
                {
                    onProgress: (progress) => {
                        this.progreso = progress
                    }
                })
                .then(data => {
                    console.log(data);
                    this.loader = false;
                    this.label_loader = `PROCESO FINALIZADO...`;
                    this.progreso.completado = true;
                    CON851('39', '39', _toggleNav(), 'success', 'Exito');
                })
                .catch(error => {
                    console.error(error);
                    this.loader = false;
                    CON851('', 'Error recalculando cartera', this._evaluarfechafinal_SAL612('3'), 'error', 'Error');
                });
        }
    }
})