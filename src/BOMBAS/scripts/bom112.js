new Vue({
    el: "#bom112",
    data() {
        return {
            novedad: null,
            sucursales: [],
            form: {
                cod: null,
                descripcion: null
            }
        }
    },
    created() {
        loader('show');
        _inputControl('reset');
        _inputControl('disabled');
        this._getSucursales();
    },
    methods: {
        _getSucursales() {
            postData({ datosh: datosEnvio() }, get_url("APP/BOMBAS/BOM001.DLL"))
                .then(res => {
                    loader('hide');
                    this.sucursales = res.datos;
                    this._ventaNovedad()
                })
                .catch(err => {
                    loader('hide')
                    _toggleNav();
                })
        },
        _ventaNovedad() {
            CON850((res) => {
                this.novedad = res.id;
                switch (parseInt(res.id)) {
                    case 7:
                    case 8:
                    case 9:
                        this._validarCodigo();
                        break;
                    default:
                        _toggleNav();
                        break;
                }
            });
        },
        _validarCodigo() {
            this.form.descripcion = ""

            validarInputs(
                {
                    form: "#fase1",
                    orden: "1"
                },
                () => {
                    this._ventaNovedad()
                },
                () => {
                    let codigo = this.form.cod || "";
                    codigo = codigo.padStart(2, "0");
                    let consulta = this.sucursales.find(e => e.cod == codigo);

                    if (this.novedad == "7") {
                        if (consulta) {
                            CON851("03", "03", "", "warning", "");
                            this._validarCodigo();
                        } else {
                            if (parseFloat(codigo) > 11) {
                                CON851("", "Error, no se puede mas de 11 sucursales", "", "warning", "");
                                this._validarCodigo();
                            } else {
                                this.form.cod = codigo
                                this._validarDescripcion();
                            }
                        }
                    } else {
                        if (consulta) {
                            this.form.descripcion = consulta.descripcion || "";
                            this.form.cod = codigo
                            this._validarDescripcion();
                        } else {
                            CON851("03", "03", "", "warning", "");
                            this._validarCodigo();
                        }
                    }
                }
            )
        },
        _validarDescripcion() {
            validarInputs(
                {
                    form: "#fase2",
                    orden: "1"
                },
                () => {
                    this._validarCodigo();
                },
                () => {
                    CON851P("01",
                        () => { this._validarDescripcion() },
                        () => { this._guardar() }
                    )
                }
            )
        },
        _guardar() {
            loader("show")
            let datos = { ...this.form };
            datos.datosh = datosEnvio() + this.novedad + "|" + localStorage.Usuario + "|";

            console.log(datos);
            postData(datos, get_url("APP/BOMBAS/BOM112.DLL"))
                .then(() => {
                    CON851("", "Guardado correctamente", "", "success", "");
                    this._initForm();
                    loader("hide")
                })
                .catch(err => {
                    loader("hide")
                    console.log(err);
                    this._validarDescripcion();
                })
        },
        _initForm() {
            this.novedad = null
            this.sucursales = []
            this.form = {
                cod: null,
                descripcion: null
            }

            loader('show');
            _inputControl('reset');
            _inputControl('disabled');
            this._getSucursales();
        },
        _ventanaSucursales() {
            let sucursales = this.sucursales;
            console.log(sucursales)
            _ventanaDatos({
                titulo: 'Busqueda sucursales',
                columnas: ["cod", "descripcion"],
                data: sucursales,
                callback_esc: () => {
                    this.$refs.codigo.focus();
                },
                callback: (data) => {
                    this.form.cod = data.cod;
                    this.$refs.codigo.focus();
                    _enterInput(`[ref="codigo"`);
                }
            });
        }
    }
})