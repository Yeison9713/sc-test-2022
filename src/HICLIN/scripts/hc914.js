class hc914 {
  constructor(params) {
    this.callback = params.callback;
    this.esc_callback = params.esc_callback;
    this.tipoConsulta = "*";
    this.tablaRevaloracion = [];
    this.array_revaloracion = [
      {
        value: "1",
        text: "Pendiente por revalorar",
      },
      {
        value: "2",
        text: "Revalorado",
      },
      {
        value: "*",
        text: "Todos",
      },
    ];

    this.fuente = /*html*/ `
                    <div>
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <label style="font-weight: 500">Fecha inicial</label>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12" id="faseFechaIni_hc914">
                            <div class="col-md-4 col-sm-4 col-xs-4 no-padding">
                                <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                    <label>Año:</label>
                                    <div class="input-group col-md-9 col-sm-9 col-xs-9 ">
                                        <input class="form-control font-xsmall number" type="number" data-orden="1" maxlength="4"
                                            id="ano_ini_hc914" required />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4 no-padding">
                                <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                    <label>Mes:</label>
                                    <div class="input-group col-md-9 col-sm-9 col-xs-9 ">
                                        <input class="form-control font-xsmall number" type="number" data-orden="2" maxlength="2"
                                            id="mes_ini_hc914" required />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4 no-padding">
                                <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                    <label>Dia:</label>
                                    <div class="input-group col-md-9 col-sm-9 col-xs-9 ">
                                        <input class="form-control font-xsmall number" type="number" data-orden="3" maxlength="2"
                                            id="dia_ini_hc914" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <label style="font-weight: 500">Fecha final</label>
                        </div>
                        

                        <div class="col-md-12 col-sm-12 col-xs-12" id="faseFechaFin_hc914">
                            <div class="col-md-4 col-sm-4 col-xs-4 no-padding">
                                <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                    <label>Año:</label>
                                    <div class="input-group col-md-9 col-sm-9 col-xs-9 ">
                                        <input class="form-control font-xsmall number" type="number" data-orden="1" maxlength="4"
                                            id="ano_fin_hc914" required />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4 no-padding">
                                <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                    <label>Mes:</label>
                                    <div class="input-group col-md-9 col-sm-9 col-xs-9 ">
                                        <input class="form-control font-xsmall number" type="number" data-orden="2" maxlength="2"
                                            id="mes_fin_hc914" required />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4 no-padding">
                                <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding">
                                    <label>Dia:</label>
                                    <div class="input-group col-md-9 col-sm-9 col-xs-9 ">
                                        <input class="form-control font-xsmall number" type="number" data-orden="3" maxlength="2"
                                            id="dia_fin_hc914" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="clear: both;"></div>
                    </div>`;
  }
  _init() {
    this._validarTipoConsulta();
  }

  _validarTipoConsulta() {
    const _this = this,
      array = JSON.parse(JSON.stringify(this.array_revaloracion));

    POPUP(
      {
        array,
        titulo: "Tipo consulta",
        indices: [{ id: "value", label: "text" }],
        seleccion: _this.tipoConsulta,
        callback_f: _this.esc_callback,
      },
      (data) => {
        console.log(data);
        _this.tipoConsulta = data.value;
        _this._popupFechas();
      }
    );
  }

  _popupFechas() {
    jAlert({
      titulo: "Fecha revaloracion ",
      mensaje: this.fuente,
      footer: false,
      autoclose: false,
    });

    let date = new Date().toLocaleDateString("es-CO").split("/");
    setTimeout(() => {
      _inputControl("disabled");

      document.getElementById("ano_ini_hc914").value = date[2];
      document.getElementById("mes_ini_hc914").value = date[1];
      document.getElementById("dia_ini_hc914").value = date[0];

      this._validarFechaIni(1);
    }, 250);
  }

  _validarFechaIni(orden) {
    const _this = this;
    validarInputs(
      {
        form: "#faseFechaIni_hc914",
        orden,
      },
      () => {
        jAlert_close();
        _this._validarTipoConsulta();
      },
      () => {
        let ano = document.getElementById("ano_ini_hc914").value || 0;
        let mes = document.getElementById("mes_ini_hc914").value || 0;
        let dia = document.getElementById("dia_ini_hc914").value || 0;

        let date = new Date().toLocaleDateString("es-CO").split("/");

        if (_validarFecha(ano, mes, dia)) {
          document.getElementById("ano_fin_hc914").value = date[2];
          document.getElementById("mes_fin_hc914").value = date[1];
          document.getElementById("dia_fin_hc914").value = date[0];
          _this._validarFechaFin(1);
        } else {
          CON851("03", "03", null, "error", "error");
          _this._validarFechaIni("3");
        }
      }
    );
  }

  _validarFechaFin(orden) {
    const _this = this;
    validarInputs(
      {
        form: "#faseFechaFin_hc914",
        orden,
      },
      () => {
        _this._validarFechaIni("3");
      },
      () => {
        let ano = document.getElementById("ano_fin_hc914").value || 0;
        let mes = document.getElementById("mes_fin_hc914").value || 0;
        let dia = document.getElementById("dia_fin_hc914").value || 0;

        if (_validarFecha(ano, mes, dia)) {
          _this._consultarRevaloracion();
        } else {
          CON851("03", "03", null, "error", "error");
          _this._validarFechaFin(3);
        }
      }
    );
  }

  _consultarRevaloracion() {
    const _this = this;
    let ano_ini = document.getElementById("ano_ini_hc914").value || 0;
    let mes_ini = document.getElementById("mes_ini_hc914").value || 0;
    let dia_ini = document.getElementById("dia_ini_hc914").value || 0;

    let fecha_ini = `${ano_ini}${mes_ini
      .toString()
      .padStart(2, "0")}${dia_ini.toString().padStart(2, "0")}`;

    let ano_fin = document.getElementById("ano_fin_hc914").value || 0;
    let mes_fin = document.getElementById("mes_fin_hc914").value || 0;
    let dia_fin = document.getElementById("dia_fin_hc914").value || 0;

    let fecha_fin = `${ano_fin}${mes_fin
      .toString()
      .padStart(2, "0")}${dia_fin.toString().padStart(2, "0")}`;

    let data = {
      datosh: datosEnvio() + fecha_ini + "|" + fecha_fin + "|",
      revaloracion: this.tipoConsulta,
    };

    loader("show");
    postData(data, get_url("APP/HICLIN/HC914.DLL"))
      .then((result) => {
        loader("hide");
        _this.tablaRevaloracion = result.HC.filter((a) => a.llave_hc != "");
        jAlert_close();
        _this._ventanaHistoriasRevalorar();
      })
      .catch((err) => {
        loader("hide");
        console.error(err);
        this._validarFechaFin(3);
      });
  }

  _ventanaHistoriasRevalorar() {
    const _this = this;
    _ventanaDatos({
      titulo: "Historias para revalorar",
      columnas: [
        "descrip_paci",
        "fecha_hc",
        "hora_hc",
        "motiv_hc",
        "folio_hc",
        "nom_serv",
        "estado_revalorar",
      ],
      data: _this.tablaRevaloracion,
      orden: false,
      callback_esc: () => {
        _this._popupFechas();
      },
      ancho: "1200px",
      callback: function (data) {
        _this.callback(data);
      },
    });
  }
}

const ventanaHc914 = function (params) {
  var new_popup = new hc914(params);
  new_popup._init();
};

module.exports = {
  ventanaHc914,
};
