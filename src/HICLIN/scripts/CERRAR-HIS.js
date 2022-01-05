new Vue({
    el: "#cerrar_his",
    data() {
        return {
            form: {
                id_sucursal: null,
                unserv: null,
                tipo: null,
                fecha_limite: {
                    anio: null,
                    mes: null,
                    dia: null
                }
            },
            sucursales: [],
            unidades_serv: [],
            descrpcion: {
                sucursal: null,
                unserv: null,
                tipo: null
            },
            array_tipo_cierre: [
                { value: "1", text: "Solo temporales" },
                { value: "2", text: "Temporales y abiertas" },
            ],
        }
    },
    created() {
        _inputControl("reset");
        _inputControl("disabled");
        console.clear()
        loader("show");
        this._info_sucursales()
    },
    watch: {
        "form.tipo": function (val) {
            if (val) {
              let consulta = this.array_tipo_cierre.find((e) => e.value == val);
              this.descrpcion.tipo = consulta.text || "";
            }
        }
    },
    methods: {
        _info_sucursales() {
            postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON823.DLL"))
                .then(data => {
                    this.sucursales = data.SUCURSAL.filter(e => e.CODIGO.trim() != "");
                    this._info_unid_serv()
                })
                .catch(err => {
                    CON851("", "Ha ocurrido un error cargando los datos", null, "error", "Error");
                    loader("hide");
                })
        },
        _info_unid_serv() {
            postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
                .then(data => {
                    this.unidades_serv = data.UNSERV;
                    this._validarSucursal()
                    loader("hide");
                })
                .catch(err => {
                    loader("hide");
                    CON851("", "Ha ocurrido un error cargando los datos", null, "error", "Error");
                })
        },
        _validarSucursal() {
            let _this = this;
            console.log("validar unidad")
            validarInputs(
                {
                    form: "#fase_sucursal",
                    orden: "1"
                },
                () => {
                    CON851P("Desea salir ?", _this._validarSucursal, () => {
                        _this._salir_cerrar_his();
                    });
                },
                () => {
                    let id_sucursal = _this.form.id_sucursal;
                    if (id_sucursal == "**") {
                        _this.descrpcion.sucursal = "Toda las  sucursales";
                        _this._validarUnidadServ()
                    } else {
                        let consulta = _this.sucursales.find(e => e.CODIGO == id_sucursal);
                        if (!consulta) {
                            _this.form.id_sucursal = "";
                            CON851("", "No existe sucursal", null, "error", "Error")
                            _this._validarSucursal()
                        } else {
                            _this.descrpcion.sucursal = consulta.DESCRIPCION;
                            _this._validarUnidadServ();
                        }
                    }
                }
            )
        },
        _validarUnidadServ() {
            let _this = this;
            validarInputs(
                {
                    form: "#fase_unidad",
                    orden: "1"
                },
                _this._validarSucursal,
                () => {
                    let unserv = _this.form.unserv;
                    if (unserv == 99) {
                        _this.descrpcion.unserv = "Toda las unidades";
                        _this._validarTipoCierre()
                    } else {
                        let consulta = _this.unidades_serv.find(e => e.COD == unserv);
                        if (!consulta) {
                            _this.form.unserv = "";
                            CON851("", "No existe unidad de servicio", null, "error", "Error")
                            _this._validarUnidadServ()
                        } else {
                            _this.descrpcion.unserv = consulta.DESCRIP;
                            _this._validarTipoCierre()
                        }
                    }
                }
            )
        },
        _validarTipoCierre() {
            let _this = this;
            POPUP(
                {
                    array: _this.array_tipo_cierre,
                    titulo: "Tipo de cierre",
                    indices: [{ id: "value", label: "text" }],
                    seleccion: _this.form.tipo,
                    callback_f: _this._validarUnidadServ,
                },
                (data) => {
                    _this.form.tipo = data.value;
                    _this._validarFechaLimite();
                }
            );
        },
        _validarFechaLimite() {
            let _this = this;
            validarInputs(
                {
                    form: "#faseFechaIni",
                    orden: "1"
                },
                _this._validarUnidadServ,
                () => {
                    let anio = _this.form.fecha_limite.anio || 0
                    let mes = _this.form.fecha_limite.mes || 0
                    let dia = _this.form.fecha_limite.dia || 0

                    let validate = _validarFecha(anio, mes, dia);

                    if (validate) {
                        CON851P("Desea contnuar con el procesoo ?", _this._validarFechaLimite, () => {
                            _this._cerrar_historias();
                        });
                    } else {
                        CON851("", "La fecha ingresada no es correcta", null, "error", "Error")
                        _this._validarFecha()
                    }
                }
            )
        },
        _cerrar_historias(){
            let _this = this;
            let sucursal = _this.form.id_sucursal;
            let unserv = _this.form.unserv;
            let tipo = _this.form.tipo;

            let anio = _this.form.fecha_limite.anio;
            let mes = _this.form.fecha_limite.mes;
            let dia = _this.form.fecha_limite.dia;

            let fecha = `${anio}${String(mes).padStart(2, "0")}${String(
              dia
            ).padStart(2, "0")}`;

            let datos = {
                sucursal,
                unserv,
                tipo,
                fecha
            }

            loader("show");
            postData(datos, get_url("APP/HICLIN/CERRAR-HIS.DLL"))
            .then((result) => {
                console.log(result)
                CON851("", "Se han cerrado las historias clinicas correctamente", null, "success", "Confirmar");
                loader("hide");
                _this._initCerrarHis();
            }).catch((err) => {
                CON851("", "Ha ocurrido un error intentando cerrar las historias", null, "error", "Error");
                loader("hide")
                _this._validarFechaLimite()
            });
        },
        _initCerrarHis(){
            this.form.id_sucursal = null
            this.form.unserv = null
            this.form.tipo = null
            this.form.fecha_limite = {
                anio: null,
                mes: null,
                dia: null,
            }

            this.descrpcion.sucursal = null
            this.descrpcion.unserv = null
            // this.descrpcion.tipo = null

            this._validarSucursal();
        },
        _ventanaSucursales() {
            let _this = this;
            console.log("entra")
            _ventanaDatos({
                titulo: "Ventana de sucursales",
                columnas: ["CODIGO", "DESCRIPCION"],
                data: _this.sucursales,
                callback_esc: ()=>{
                    _this.$refs.id_sucursal.focus();
                },
                callback: function (data) {
                    _this.form.id_sucursal = data.CODIGO;
                    _this.$refs.id_sucursal.focus();
                },
            });
        },
        _ventanaUnidades() {
            let _this = this;
            _ventanaDatos({
                titulo: "Ventana de unidades de servicio",
                columnas: ["COD", "DESCRIP"],
                data: _this.unidades_serv,
                callback_esc: ()=>{
                    _this.$refs.unserv.focus();
                },
                callback: function (data) {
                    _this.form.unserv = data.COD;
                    _this.$refs.unserv.focus();
                },
            });
        },
        _salir_cerrar_his() {
            window.location.reload();
        },
    }
})