module.exports = Vue.component("ser7621h", {
    props: {
        params: {},
    },
    data() {
        return {
            tipo: null,
            form: {
                suc_lnk: null,
                folio_lnk: null,
                admin: null,
                origen: {
                    paciente: "",
                    suc: "",
                    folio: "",
                },
                destino: {
                    paciente: "",
                    suc: "",
                    folio: "",
                },
            },
        }
    },
    mounted() {
        let data = this.params;

        this.form.suc_lnk = data.suc;
        this.form.folio_lnk = data.folio;
        this.form.admin = data.admin;

        this.form.origen.paciente = data.pacienteOri;
        this.form.destino.paciente = data.pacienteDes;

        _inputControl("disabled");
        this.init();
    },
    methods: {
        init() {
            this.form.origen.suc = ""
            this.form.origen.folio = ""

            this.form.destino.suc = ""
            this.form.destino.folio = ""

            this._faseSucFolioOrigen()
        },
        _faseSucFolioOrigen() {
            let _ser7621h = this;
            validarInputs(
                {
                    form: "#_faseSucFolioOrigen",
                    orden: "1",
                    event_f3: () => {

                        CON851P("04",
                            () => {
                                this._faseSucFolioOrigen()
                            },
                            () => {
                                this.terminar()
                            }
                        );

                    }
                },
                _ser7621h.salir,
                _ser7621h._ValidarNroOrigen
            );
        },
        _ValidarNroOrigen() {
            let _ser7621h = this,
                {
                    admin,
                    origen: { paciente, suc, folio },
                } = _ser7621h.form;

            let datos = {
                datosh: datosEnvio() + admin + "|",
                paciente_ori: paciente.padStart(15, "0"),
                folio_ori: suc.padStart(2, "0") + folio.padStart(6, "0"),
                paso: "1",
            };

            loader("show");
            postData(datos, get_url("APP/SALUD/SER7621H.DLL"))
                .then((data) => {
                    loader("hide");
                    if (parseFloat(data) > 0) {
                        CON851("", "No existe folio", null, "warning", "");
                        _ser7621h._validarProceso();
                    } else _ser7621h._faseSucFolioDes();
                })
                .catch((err) => {
                    loader("hide");
                    _ser7621h.init();
                });
        },
        _faseSucFolioDes() {
            let _ser7621h = this;
            validarInputs(
                {
                    form: "#_faseSucFolioDes",
                    orden: "1",
                },
                _ser7621h._faseSucFolioOrigen,
                () => {
                    if (_ser7621h.form.destino.suc == '**') {
                        _ser7621h._faseSucFolioDes()
                        CON851("03", "03", null, "warning", "");
                    } else _ser7621h._consultarFolioDes()
                }
            );
        },
        _consultarFolioDes() {
            let _ser7621h = this,
                {
                    admin,
                    destino: { paciente, suc, folio },
                } = _ser7621h.form;

            let datos = {
                datosh: datosEnvio() + admin + "|",
                paciente_des: paciente.padStart(15, "0"),
                folio_des: suc.padStart(2, "0") + folio.padStart(6, "0"),
                paso: "2",
            };

            loader("show");
            postData(datos, get_url("APP/SALUD/SER7621H.DLL"))
                .then((data) => {
                    loader("hide");
                    _ser7621h.form.destino.folio = data.padStart(6, "0");
                    _ser7621h._validarProceso();
                })
                .catch((err) => {
                    loader("hide");
                    _ser7621h._faseSucFolioDes();
                });
        },

        _validarProceso() {
            CON851P("04",
                () => {
                    this._faseSucFolioDes()
                },
                () => {
                    this._trasladoHc()
                }
            );
        },

        _trasladoHc() {
            let { suc_lnk, folio_lnk, admin, origen, destino, } = this.form;

            let datos = {
                datosh: datosEnvio() + admin + "|",
                paciente_ori: origen.paciente.padStart(15, "0"),
                folio_ori: origen.suc.padStart(2, "0") + origen.folio.padStart(6, "0"),
                paciente_des: destino.paciente.padStart(15, "0"),
                folio_des: destino.suc.padStart(2, "0") + destino.folio.padStart(6, "0"),
                suc_lnk,
                folio_lnk,
                paso: "",
            };

            loader("show");
            postData(datos, get_url("APP/SALUD/SER7621H.DLL"))
                .then((data) => {
                    loader("hide");
                    CON851("", data, null, "success", "");
                    this.init();
                })
                .catch((err) => {
                    loader("hide");
                    this._faseSucFolioOrigen();
                });
        },

        _consultarHistorias(tipo) {
            loader("show")

            let paciente = null
            this.tipo = tipo

            if (tipo == 1) paciente = this.form.origen.paciente;
            else paciente = this.form.destino.paciente;

            let datos = {
                datosh: datosEnvio()
                    + paciente + "|"
                    + this.form.admin
            }

            postData(datos, get_url("APP/HICLIN/HC811-1.DLL"))
                .then(res => {
                    loader("hide")
                    this._ventanaHistorias(res.datos.filter(e => e.id.trim() != ""))
                })
                .catch(err => {
                    loader("hide")
                    console.log(err);

                    if (this.tipo == 1) this.$refs.suc_origen.focus();
                    else this.$refs.suc_destino.focus();
                })

        },

        _ventanaHistorias(data) {
            _ventanaDatos({
                titulo: "Busqueda historias",
                columnas: [
                    "folio",
                    "nom_serv",
                    "fecha",
                    "hora",
                    "motivo",
                    "medico",
                    "descrip_estado"
                ],
                ancho: "1200px",
                data: data.reverse(),
                callback_esc: () => {
                    if (this.tipo == 1) this.$refs.suc_origen.focus();
                    else this.$refs.suc_destino.focus();
                },
                callback: (res) => {
                    let data = res.folio.split("-");

                    if (this.tipo == 1) {
                        this.form.origen.suc = data[0]
                        this.form.origen.folio = data[1];
                        this.$refs.suc_origen.focus();
                    } else {
                        this.$refs.suc_destino.focus();
                    }
                }
            });
        },

        salir() {
            this.$emit("callback_esc");
        },

        terminar() {
            this.$emit("callback");
        },
    },
    template: /*html*/ `
    <transition>
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="box-center col-lg-8 col-md-10 col-sm-10 col-xs-12">
                    <div id="ser7621h" class="form-group box-center col-md-12 no-padding">
                        <div class="col-12">
                            <div class="portlet light box-center box-title">
                                <div class="portlet-title">
                                    <div class="caption" style="width: 100%">
                                        <span class="caption-subject bold uppercase">Unifica historias clinicas</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 no-padding">
                                <div class="form-horizontal">
                                    <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
                                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding"
                                            style="border-bottom: 1px solid #ccc; margin: 5px 0 5px 0;">
                                            <label class="col-md-12 col-sm-12 col-xs-12" style="text-align: center;">Historia</label>
                                        </div>
                    
                                        <div class="col-md-2 col-sm-6 col-xs-6">
                                            <label class="float-left">Suc. origen.</label>

                                            <div class="col-md-12 col-sm-12 inline-inputs no-padding">
                                                <label></label>

                                                <div class="input-group col-md-12 col-sm-12 col-xs-12" id="_faseSucFolioOrigen">
                                                    <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2"
                                                        data-orden="1" v-model="form.origen.suc" ref="suc_origen" required v-on:keyup.119="_consultarHistorias(1)">
                                                </div>
                                                
                                                <button type="button" class="btn col-md-4 col-sm-4 col-xs-4 f8-Btn"
                                                    @click="_consultarHistorias(1)">
                                                    <i class="icon-magnifier"></i>
                                                </button>
                                            </div>
                    
                                        </div>
                                        <div class="col-md-4 col-sm-4 col-xs-4">
                                            <label class="float-left">Folio origen.</label>
                                            <div class="input-group col-md-12 col-sm-12 col-xs-12" id="_faseSucFolioOrigen">
                                                <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="6"
                                                    data-orden="2" v-model="form.origen.folio" required>
                                            </div>
                                        </div>
                    
                                        <div class="col-md-2 col-sm-6 col-xs-6">
                                            <label class="float-left">Suc. origen.</label>

                                            <div class="col-md-12 col-sm-12 inline-inputs no-padding">
                                                <label></label>

                                                <div class="input-group col-md-12 col-sm-12 col-xs-12" id="_faseSucFolioDes">
                                                    <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2"
                                                        data-orden="1" v-model="form.destino.suc" ref="suc_destino" required v-on:keyup.119="_consultarHistorias(2)">
                                                </div>

                                                <button type="button" class="btn col-md-4 col-sm-4 col-xs-4 f8-Btn"
                                                    @click="_consultarHistorias(2)">
                                                    <i class="icon-magnifier"></i>
                                                </button>
                                            </div>
                    
                                        </div>
                                        <div class="col-md-4 col-sm-4 col-xs-4">
                                            <label class="float-left">Folio origen.</label>
                                            <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                                <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="6"
                                                    v-model="form.destino.folio">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    `
})