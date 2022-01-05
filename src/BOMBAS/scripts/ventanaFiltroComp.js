class popupFiltro {
    constructor(params) {

        this.callback = params.callback;
        this.vendedores = this.vendedores || [];
        this.datos = {};

        this.fuente = /*html*/ `
                    <div>
                        <div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding"
                            style="margin: 0 auto; float: none;">

                            <div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="display: flex;"
                                id="vendedorPopup">
                                <div class="col-md-6 inline-inputs">
                                    <label class="col-md-6 col-sm-6 col-xs-12">
                                        Vendedor
                                    </label>
                                    <div class="input-group col-md-6 col-sm-6 col-xs-12">
                                        <input id="codVendedorPopup" class="form-control col-md-12 col-sm-12 col-xs-12"
                                            maxlength="5" data-orden="1" />
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-6">
                                    <div class="input-group col-md-12 col-sm-12 col-xs-12">
                                        <input id="descripVendedorPopup"
                                            class="form-control col-md-12 col-sm-12 col-xs-12" />
                                    </div>
                                </div>
                            </div>



                            <div class="col-md-12 col-sm-12 col-xs-12" style="margin-top: 10px;">
                                <label style="font-weight: 500">Fecha Inicial</label>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12 no-padding"
                                style="display: flex; margin-top: 10px;" id="fechaIniPopup">

                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                        <label>Año:</label>
                                        <div class="input-group col-md-12 col-sm-12 col-xs-12 ">
                                            <input class="form-control font-xsmall number" type="number" data-orden="1"
                                                maxlength="4" id="anoIniPopup" required />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                        <label>Mes:</label>
                                        <div class="input-group col-md-12 col-sm-12 col-xs-12 ">
                                            <input class="form-control font-xsmall number" type="number" data-orden="2"
                                                maxlength="2" id="mesIniPopup" required />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                        <label>Dia:</label>
                                        <div class="input-group col-md-12 col-sm-12 col-xs-12 ">
                                            <input class="form-control font-xsmall number" type="number" data-orden="3"
                                                maxlength="2" id="diaIniPopup" required />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            
                            <div class="col-md-12 col-sm-12 col-xs-12" style="margin-top: 10px;">
                                <label style="font-weight: 500">Fecha final</label>
                            </div>

                            <div class="col-md-12 col-sm-12 col-xs-12 no-padding"
                                style="display: flex; margin-top: 10px;" id="fechaFinPopup">

                                <div class="col-md-4 col-sm-4 col-xs-4 ">
                                    <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                        <label>Año:</label>
                                        <div class="input-group col-md-12 col-sm-12 col-xs-12 ">
                                            <input class="form-control font-xsmall number" type="number"
                                                data-orden="1" maxlength="4" id="anoFinPopup" required />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                        <label>Mes:</label>
                                        <div class="input-group col-md-12 col-sm-12 col-xs-12 ">
                                            <input class="form-control font-xsmall number" type="number"
                                                data-orden="2" maxlength="2" id="mesFinPopup" required />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                        <label>Dia:</label>
                                        <div class="input-group col-md-12 col-sm-12 col-xs-12 ">
                                            <input class="form-control font-xsmall number" type="number"
                                                data-orden="3" maxlength="2" id="diaFinPopup" required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
        `
    }

    _init() {

        jAlert({
            titulo: "Ventana filtro comprobantes ",
            mensaje: this.fuente,
            footer: false,
            autoclose: false,
        });

        loader("show")
        _inputControl('disabled');

        let date = new Date().toLocaleDateString("es-CO").split("/");
        document.getElementById("anoIniPopup").value = date[2];
        document.getElementById("mesIniPopup").value = date[1];

        if (this.vendedores.length > 0) {
            loader("hide");
            this._faseVendedorPopup();
        } else this._getVendedores();

        $('#codVendedorPopup').unbind()
        $('#codVendedorPopup').bind('keydown', (e) => {
            if (e.which == 119) {
                let data = this.vendedores || [];
                _ventanaDatos({
                    titulo: "Busqueda vendedores",
                    columnas: ["COD", "NOMBRE", "NIT", "TELEF"],
                    data,
                    callback_esc: () => {
                        $('#codVendedorPopup').focus();
                    },
                    callback: function (data) {
                        let cod = data.COD.trim()
                        $('#codVendedorPopup').val(cod).focus();
                        _enterInput('#codVendedorPopup');
                    }
                });
            }
        })
    }

    _getVendedores() {
        postData({ datosh: datosEnvio() }, get_url("app/bombas/CON805.DLL"))
            .then(data => {
                this.vendedores = data.VENDEDORES
                this._faseVendedorPopup();
            }).catch(err => {
                this._cerrarVentanaFiltro();
            })
    }

    _faseVendedorPopup() {
        validarInputs(
            {
                form: "#vendedorPopup",
                orden: "1"
            },
            () => {
                this._cerrarVentanafiltro();
            },
            () => {
                let codVendedorPopup = $("#codVendedorPopup").val();

                if (codVendedorPopup == "*****") {
                    $("#descripVendedorPopup").val("Todos los vendedores");
                    this._faseFechaInicial();
                } else {
                    let consulta = this.vendedores.find(el => el.COD == codVendedorPopup)

                    if (consulta) {
                        $("#descripVendedorPopup").val(consulta.NOMBRE);
                        this._faseFechaInicial();
                    } else {
                        CON851("", "Vendedor no existe", null, "error", "Error");
                        this._faseVendedorPopup();
                    }
                }
            }
        )
    }

    _faseFechaInicial() {
        validarInputs(
            {
                form: "#fechaIniPopup",
                orden: "1"
            },
            () => {
                this._faseVendedorPopup();
            },
            () => {
                let ano = document.getElementById("anoIniPopup").value || 0;
                let mes = document.getElementById("mesIniPopup").value || 0;
                let dia = document.getElementById("diaIniPopup").value || 0;

                if (_validarFecha(ano, mes, dia)) {
                    document.getElementById("anoFinPopup").value = ano
                    document.getElementById("mesFinPopup").value = mes

                    this._faseFechaFinal();
                } else {
                    CON851("03", "03", null, "error", "error");
                    this._faseFechaInicial();
                }
            }
        )
    }

    _faseFechaFinal() {
        validarInputs(
            {
                form: "#fechaFinPopup",
                orden: "1"
            },
            () => {
                this._faseFechaInicial()
            },
            () => {
                let ano = document.getElementById("anoFinPopup").value || 0;
                let mes = document.getElementById("mesFinPopup").value || 0;
                let dia = document.getElementById("diaFinPopup").value || 0;

                if (_validarFecha(ano, mes, dia)) {
                    this._filtarComprobantes();
                } else {
                    CON851("03", "03", null, "error", "error");
                    this._faseFechaFinal();
                }
            }
        )
    }

    _filtarComprobantes() {
        let ano_ini = document.getElementById("anoIniPopup").value || 0;
        let mes_ini = document.getElementById("mesIniPopup").value || 0;
        let dia_ini = document.getElementById("diaIniPopup").value || 0;
        let fecha_ini = ano_ini + mes_ini.toString().padStart(2, "0") + dia_ini.toString().padStart(2, "0")

        let ano_fin = document.getElementById("anoFinPopup").value || 0;
        let mes_fin = document.getElementById("mesFinPopup").value || 0;
        let dia_fin = document.getElementById("diaFinPopup").value || 0;
        let fecha_fin = ano_fin + mes_fin.toString().padStart(2, "0") + dia_fin.toString().padStart(2, "0")

        let vendedor = document.getElementById("codVendedorPopup").value || "*****";

        let datos = {
            datosh: datosEnvio(),
            fecha_ini,
            fecha_fin,
            vendedor
        }

        loader("show")
        postData(datos, get_url("app/bombas/bom202.dll"))
            .then((res) => {
                this._ventanaFiltroComprobantes(res)
            })
            .catch(err => {
                loader("hide")
                this._faseFechaFinal();
            })
    }

    _ventanaFiltroComprobantes(res) {
        loader("hide")

        _ventanaDatos({
            titulo: "Busqueda vendedores",
            columnas: ["suc", "nro", "fecha", "detalle", "vendedor"],
            data: res.listado,
            callback_esc: () => {
                this._faseFechaFinal()
            },
            callback: (data) => {
                this.datos = data;
                this._cerrarVentanafiltro();
            }
        });
    }

    _cerrarVentanafiltro() {
        loader("hide");
        jAlert_close();
        this.callback(this.datos)
    }
}



const ventanaFiltro = function (params) {
    var new_popup = new popupFiltro(params);
    new_popup._init();
};

module.exports = {
    ventanaFiltro,
};

