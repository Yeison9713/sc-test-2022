new Vue({
  el: "#hc002f",
  components: {
    periodo_formu: component_hc890p,
    demanda_inducida: component_hc110,
  },
  data: {
    maxlenght: 190,
    pagina: {
      uno: true,
      dos: false,
      tres: false,
    },
    modal_revaloracion: false,
    modal_adm: false,
    modal_indic: false,
    modal_incapacidad: false,
    descrip_tipo_incap: null,
    modal_f9: false,
    index_tabla: 0,
    operador: null,
    hora_act: null,
    fecha_act: {
      año: null,
      mes: null,
      dia: null,
    },
    profesional: null,
    unserv: null,
    tipo_diagn: null,
    data_cambio: null,
    hc002f: {
      _usuar: $_USUA_GLOBAL[0],
      _profesional: JSON.parse(JSON.stringify($_REG_PROF)),
      _reg_hc: JSON.parse(JSON.stringify($_REG_HC)),
      _enfermedades: [],
      _unidadServ: [],
      _diagnosticos: [],
      _farmacos: [],
      _laboratorios: [],
      _imagen: [],
      _orden_medica: [],
      _consultasTerapias: [],
      _especialidad: [],
      _macros_his: [],
      _tablaFormu: [],
      _formulaAnt: [],
      _seundaTabla: [],
      _revaloracion: "",
    },
    form_diag: {
      item: "",
      diagn: "",
    },
    form: _limpiarFormulacion(),
    fechas_trimestre: [],
    form_disabled: {
      tipo_dosisf_formu: true,
      frec_dosisf_formu: true,
      via_formu: true,
    },
    form_descrip: {
      tipo_dosisf: null,
      frec_dosisf: null,
      via_formu: null,
    },
    opcionesTipoFormu: [
      { text: "Medicamentos", value: 1 },
      { text: "Laboratorios", value: 2 },
      { text: "Imagen diagnosticos", value: 3 },
      { text: "Ordenes medicas", value: 4 },
      { text: "Consultas", value: 5 },
      { text: "Incapacidades medicas", value: 6 },
    ],
    opcionesDosis: _tipoJsonHc("adm_dosis"),
    opcionesTiempo: _tipoJsonHc("adm_tiempo"),
    opcionesViaDosis: _tipoJsonHc("adm_via_dosis"),
    params_hc110: {
      estado: false,
      nit: $_USUA_GLOBAL[0].NIT,
      tabla_formu: [],
      orden_medica: [],
    },
    params_hc890p: {
      estado: false,
      llave_evo: null,
      cronico: $_REG_PACI.CRONICO,
      nit: $_USUA_GLOBAL[0].NIT,
    },
    parametrosImpre: {
      par_busq: {
        par_aper: "N",
        par_evo: "N",
        par_enf: "N",
        par_ter: "N",
        par_for: "N",
        par_lab: "N",
        par_ima: "N",
        par_ord: "N",
        par_con: "N",
        par_inc: "N",
        par_resu: "N",
        par_epic: "N",
      },
      par_selec: {
        par_ln: 00,
        par_macro: {
          par_tipo_macro: 0,
          par_cod_macro: 0,
        },
        fecha_ini_par: {
          año: 0,
          mes: 0,
          dia: 0,
        },
        fecha_fin_par: {
          año: 0,
          mes: 0,
          dia: 0,
        },
      },
      paginas_opc: 0,
    },
    llaveEvo_imp: "",
    _hcprc2: {}
  },
  created() {
    _inputControl("disabled");
    _inputControl("reset");

    $this = this;
    _vm = this;

    let fecha_act = this._currentDate(),
      hora = this._timeZone();

    if (this.hc002f._reg_hc.hora_lnk) {
      hora = this.hc002f._reg_hc.hora_lnk;
      fecha_act = this.hc002f._reg_hc.fecha_lnk;
      this.operador = this.hc002f._reg_hc.oper_lnk;
    } else this.operador = localStorage.Usuario;

    this.fecha_act.año = fecha_act.substr(0, 4);
    this.fecha_act.mes = fecha_act.substr(4, 2);
    this.fecha_act.dia = fecha_act.substr(6, 2);

    this.hora_act = hora;

    this.profesional =
      this.hc002f._profesional.IDENTIFICACION +
      " - " +
      this.hc002f._profesional.NOMBRE.trim();

    if (localStorage.Usuario == "GEBC") this._validarOperador();
    else this._validarProfesional();
  },
  watch: {
    "form.var_dosis_formu.tipo_dosisf_formu": function (val) {
      val = val || "";
      let cod = _tipoJsonHc("adm_dosis").find((e) => e.value == val);
      if (cod) this.form_descrip.tipo_dosisf = cod.text;
      else this.form_descrip.tipo_dosisf = "";

      var consulta = this.opcionesDosis.find((e) => e.value == val);
      if (consulta)
        this.form.indic_formu.indi1_formu.unid_dosis_formu = consulta.text;
    },
    "form.var_dosis_formu.frec_dosisf_formu": function (val) {
      val = val || "";
      let cod = _tipoJsonHc("adm_tiempo").find((e) => e.value == val);
      if (cod) this.form_descrip.frec_dosisf = cod.text;
      else this.form_descrip.frec_dosisf = "";

      let cantidad = this.form.var_dosis_formu.cant_frec_dosisf_formu;

      switch (val) {
        case 1:
          if (cantidad < 0.01 || cantidad > 45) {
            this.form.var_dosis_formu.frec_dosisf_formu = "";
            plantillaToast("03", "03", null, "error", "error");
          }
          break;
        case 2:
          if (cantidad < 0.01 || cantidad > 12) {
            this.form.var_dosis_formu.frec_dosisf_formu = "";
            plantillaToast("03", "03", null, "error", "error");
          }
          break;
        case 3:
          if (cantidad < 0.01 || cantidad > 29) {
            this.form.var_dosis_formu.frec_dosisf_formu = "";
            plantillaToast("03", "03", null, "error", "error");
          }
          break;
        case 4:
          if (cantidad < 0.01 || cantidad > 11) {
            this.form.var_dosis_formu.frec_dosisf_formu = "";
            plantillaToast("03", "03", null, "error", "error");
          }
          break;
        case 5:
          if (cantidad < 0.01 || cantidad > 3) {
            this.form.var_dosis_formu.frec_dosisf_formu = "";
            plantillaToast("03", "03", null, "error", "error");
          }
          break;
      }
      let unid_frec_dosis_formu = "",
        cant_frec_dosisf_formu = "";
      switch (val) {
        case 1:
          unid_frec_dosis_formu = " MIN. ";
          break;
        case 2:
          if (cantidad > 1) unid_frec_dosis_formu = " HORAS ";
          else unid_frec_dosis_formu = " HORA ";
          break;
        case 3:
          if (cantidad > 1) unid_frec_dosis_formu = " DIAS ";
          else unid_frec_dosis_formu = " DIA ";
          break;
        case 4:
          if (cantidad > 1) unid_frec_dosis_formu = " MESES ";
          else unid_frec_dosis_formu = " MES ";
          break;
        case 5:
          unid_frec_dosis_formu = " AÑO ";
          break;
        case 6:
          cant_frec_dosisf_formu = 1;
          unid_frec_dosis_formu = " INMEDIATO";
          break;
        case 7:
          cant_frec_dosisf_formu = 1;
          unid_frec_dosis_formu = " PARA MEZCLA";
          break;
        case 8:
          cant_frec_dosisf_formu = 1;
          unid_frec_dosis_formu = " TITULABLE";
          break;
        case 9:
          cant_frec_dosisf_formu = 1;
          unid_frec_dosis_formu = " UNA VEZ";
          break;
        default:
          unid_frec_dosis_formu = "";
          if (this.form.tipo_formu == 1) {
            this.form.indic_formu.indi1_formu.inmed_formu.cada_dosis_formu =
              "CADA";
          }
          break;
      }
      this.form.indic_formu.indi1_formu.inmed_formu.unid_frec_dosis_formu = unid_frec_dosis_formu;
      if (val > 5 && val < 10)
        this.form.var_dosis_formu.cant_frec_dosisf_formu = cant_frec_dosisf_formu;
    },
    "form.var_dosis_formu.via_formu": function (val) {
      var objectNames = [
        { value: 1, text: "I.V." },
        { value: 2, text: "I.M." },
        { value: 3, text: "ORAL" },
        { value: 4, text: "SUBC" },
        { value: 5, text: "NASA" },
        { value: 6, text: "OFTA" },
        { value: 7, text: "OTIC" },
        { value: 8, text: "TOPI" },
        { value: 9, text: "I.DE" },
        { value: "A", text: "INHA" },
        { value: "B", text: "VAGI" },
        { value: "C", text: "RECT" },
        { value: "D", text: "PERI" },
        { value: "E", text: "RAQU" },
        { value: "F", text: "URET" },
        { value: "G", text: "SUBL" },
      ];

      let cod = _tipoJsonHc("adm_via_dosis").find((e) => e.value == val);
      if (cod) this.form_descrip.via_formu = cod.text;
      else this.form_descrip.via_formu = "";

      var consulta = objectNames.find((e) => e.value == val);
      if (consulta)
        this.form.indic_formu.indi1_formu.via_dosis_formu = consulta.text;
      else if (this.form.tipo_formu == 1)
        this.form.indic_formu.indi1_formu.inmed_formu.cada_dosis_formu = "CADA";
    },
  },
  methods: {
    _validarOperador() {
      validarInputs(
        {
          form: "#ValidarOperador_hc002F",
          orden: "1",
        },
        _regresar_menuhis,
        () => {
          this._validarAno();
        }
      );
    },
    _validarAno() {
      validarInputs(
        {
          form: "#validarAno_hc002F",
          orden: "1",
        },
        () => {
          this._validarOperador();
        },
        () => {
          let año_act = this._currentDate().substr(0, 4),
            { año } = this.fecha_act;

          if (parseFloat(año) > parseFloat(año_act)) {
            CON851("03", "03", null, "error", "Error");
            this._validarAno();
          } else this._validarMes();
        }
      );
    },
    _validarMes() {
      validarInputs(
        {
          form: "#validarMes_hc002F",
          orden: "1",
        },
        () => {
          this._validarAno();
        },
        () => {
          let { mes } = this.fecha_act;
          if (parseFloat(mes) > 12 || parseFloat(mes) < 1) {
            CON851("03", "03", null, "error", "error");
            this._validarMes();
          } else this._validarDia();
        }
      );
    },

    _validarDia() {
      validarInputs(
        {
          form: "#validarDia_hc002F",
          orden: "1",
        },
        () => {
          this._validarMes();
        },
        () => {
          let ano = this.fecha_act.año || "";
          let mes = this.fecha_act.mes || "";
          let dia = this.fecha_act.dia || "";

          if (_validarFecha(ano, mes, dia)) {
            this._validarHora();
          } else {
            CON851("03", "03", null, "error", "error");
            this._validarDia();
          }
        }
      );
    },

    _validarHora() {
      validarInputs(
        {
          form: "#validarHora_hc002F",
          orden: "1",
        },
        () => {
          this._validarDia();
        },
        () => {
          let hora = parseFloat(this.hora_act) || 0;
          if (hora > 2359 || hora < 0) {
            CON851("03", "03", null, "error", "error");
            this._validarHora();
          } else this._validarProfesional();
        }
      );
    },

    _validarProfesional() {
      var cod_profe = this._consultarEspec_002f([250, 140, 460, 461, 464, 462]);
      if (this.hc002f._profesional.ATIENDE_PROF == "A" && cod_profe) {
        this.hc002f._profesional.ATIENDE_PROF = "1";
      }

      loader("show");
      this._consultarHc();
    },
    _consultarHc() {
      var datosh =
        datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|1|";

      postData({ datosh }, get_url("APP/HICLIN/HC_PRC.DLL"))
        .then((data) => {
          let = { hora_lnk, oper_lnk, opc_llamado } = $_REG_HC;
          this.hc002f._reg_hc = data["HCPAC"];
          this.hc002f._reg_hc.hora_lnk = hora_lnk || "";
          this.hc002f._reg_hc.oper_lnk = oper_lnk || localStorage.Usuario;
          this.hc002f._reg_hc.opc_llamado = opc_llamado || "";
          if (
            this.hc002f._reg_hc.cierre.estado == 2 &&
            this.hc002f._reg_hc.serv > 02 &&
            this.hc002f._reg_hc.serv != 08 &&
            this.hc002f._reg_hc.serv != 63 &&
            this.hc002f._reg_hc.serv != 64
          ) {
            plantillaError("9Y", "9Y", "HC002F", _regresar_menuhis);
          } else this._consultarEvo();
        })
        .catch((err) => {
          _regresar_menuhis();
        });
    },

    _consultarEvo() {
      let { hora_act, fecha_act } = this,
        fecha = fecha_act.año + fecha_act.mes + fecha_act.dia,
        llave_folio = this.hc002f._reg_hc.llave;

      var datosh =
        datosEnvio() +
        llave_folio +
        fecha +
        hora_act +
        this.operador.toString().toUpperCase() +
        "||" +
        localStorage.Usuario +
        "|";

      postData({ datosh }, get_url("APP/HICLIN/HC002F.DLL"))
        .then((data) => {
          this.data_cambio = data;
          this._validarNovedad();
          loader("hide");
        })
        .catch((err) => {
          console.log(err);
          _regresar_menuhis();
        });
    },

    async _validarNovedad() {
      let usuario = localStorage.Usuario;
      if (usuario == "GEBC" && this.data_cambio.novedad == "7") {
        CON851P(
          "No se encontro evolucion, desea continuar ?",
          () => {
            this._validarOperador();
          },
          () => {
            loader("show");
            this._consultFormuAnt();
          }
        );
      } else {
        loader("show");
        if (this.data_cambio.novedad == "8") {
          await this._cargarDatos();
        }
        this._consultFormuAnt();
      }
    },

    _consultFormuAnt() {
      var envio = {
        datosh:
          datosEnvio() +
          this.hc002f._reg_hc.llave +
          "|" +
          localStorage.Usuario +
          "|" +
          this.hc002f._profesional.ATIENDE_PROF +
          "|2|1|",
      };

      postData(envio, get_url("app/HICLIN/HC002BN.DLL"))
        .then((data) => {
          data.FORMULACION.forEach((item) => {
            item.tabla = item.tabla.filter((e) => e.cod_formu.trim() != "");
            if (item.fecha.trim()) {
              this.hc002f._formulaAnt.push(item);
            }
          });

          if (this.hc002f._diagnosticos.length == 0) {
            data.DIAG.forEach((val, index) => {
              if (val.DIAGN.trim()) {
                this.hc002f._diagnosticos.push({
                  item: parseFloat(index + 1),
                  diagn: val.DIAGN,
                });
              }
            });
          }
          this._consultarUnidadesServ();
        })
        .catch((err) => {
          console.log(err);
          _regresar_menuhis();
        });
    },

    _validarConsultaUnidades() {
      let {
        hora_lnk,
        cierre: { unserv },
      } = this.hc002f._reg_hc;

      if (["02", "07", "08"].includes(unserv) && !hora_lnk) return true;
      else return false;
    },

    _consultarUnidadesServ() {
      let flag = this._validarConsultaUnidades(),
        { unserv } = this.hc002f._reg_hc.cierre;

      let datos = {
        datosh: datosEnvio(),
        paso: flag ? "" : "1",
        codigo: unserv,
      };

      postData(datos, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          loader("hide");
          if (flag) {
            this._unserv = data.UNSERV;
            this.hc002f._unidadServ = data.UNSERV.filter((e) => {
              if (e.ESTADO == "S") return e;
            });

            this._datosUnidad();
          } else this._validarUnidad(data);
        })
        .catch((err) => {
          _regresar_menuhis();
        });
    },

    _datosUnidad() {
      let _this = this,
        { unserv } = this.hc002f._reg_hc.cierre;

      POPUP(
        {
          array: _this.hc002f._unidadServ,
          titulo: "UNIDADES DE SERVICIO",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: unserv,
          callback_f: _regresar_menuhis,
        },
        (data) => {
          _this._validarUnidad(data);
        }
      );
    },
    _validarUnidad(data) {
      this.unserv = `${data.COD} - ${data.DESCRIP}`;
      this.hc002f._reg_hc.cierre.unserv = data.COD;

      if (this.hc002f._reg_hc.hora_lnk) this._evaluarInitFormu_hc002f();
      else this._consultarEnfermedades();
    },
    _consultarEnfermedades() {
      loader("show");
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER851.DLL"))
        .then((data) => {
          this.hc002f._enfermedades = data.ENFERMEDADES.filter(
            (e) => e.COD_ENF.trim() != ""
          );

          loader("hide");
          this._validarDiagnostico();
        })
        .catch((err) => {
          loader("hide");
          _regresar_menuhis();
        });
    },

    _validarDiagnostico() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_diagnosticos_hc_01",
          orden: "1",
          event_f3: () => {
            if (this.hc002f._reg_hc.hora_lnk) {
              this._evaluarInitFormu_hc002f();
            } else this._tipoDiagnostico();
          },
          event_f5: () => {
            CON851P("03", _this._validarDiagnostico, _regresar_menuhis);
          },
        },
        () => {
          setTimeout(this._validarDiagnostico, 250);
        },
        () => {
          let elemento = { ...this.form_diag };
          elemento.diagn = elemento.diagn.toUpperCase() || "";

          let consulta = this.hc002f._enfermedades.find(
            (e) => e.COD_ENF == elemento.diagn
          );

          let repetido = this.hc002f._diagnosticos.find(
            (e) => e.diagn == elemento.diagn
          );

          if (repetido) {
            plantillaToast("05", "05", null, "error", "error");
            this.form_diag.diagn = "";
            this._validarDiagnostico();
          } else {
            if (consulta) {
              let length = this.hc002f._diagnosticos.length;
              if (length > 10) {
                plantillaError("", "Tabla en su limite!", "HC002F", () => {
                  this.form_diag.diagn = "";
                  setTimeout(this._validarDiagnostico, 150);
                });
              } else {
                elemento.item = length + 1;
                this.hc002f._diagnosticos.push(elemento);
                this.form_diag.diagn = "";
                this._validarDiagnostico();
              }
            } else {
              plantillaToast("03", "03", null, "error", "error");
              this._validarDiagnostico();
            }
          }
        }
      );
    },
    _onValidardiagn() {
      let elemento = JSON.parse(JSON.stringify(this.form_diag)),
        length = this.hc002f._diagnosticos + 1;

      elemento.diagn = elemento.diagn.toUpperCase();

      if (length > 10) {
        plantillaError("", "Tabla en su limite!", "HC002F", () => {
          this.form_diag.diagn = "";
          setTimeout(this._validarDiagnostico, 150);
        });
      } else {
        let consulta = this.hc002f._diagnosticos.find(
          (e) => e.diagn == elemento.diagn
        );

        if (consulta) {
          plantillaToast("03", "03", null, "error", "error");
          this._validarDiagnostico();
        } else {
          this.hc002f._diagnosticos.push(elemento);
          this._validarDiagnostico();
        }

        this.form_diag.diagn = "";
      }
    },
    _deleteItemDiagn(element) {
      let cod = element.srcElement.value;
      if (element.srcElement.checked) {
        CON851P(
          "Desea elminar el item ?",
          () => {
            element.srcElement.checked = false;
            this.$refs.cod_diagn.focus();
          },
          () => {
            element.srcElement.checked = false;
            let filter = this.hc002f._diagnosticos.filter(
              (e) => e.diagn != cod
            );

            this.hc002f._diagnosticos = JSON.parse(JSON.stringify(filter));

            this.hc002f._diagnosticos.map((a, b) => {
              a.item = b + 1;
              return a;
            });
            this.$refs.cod_diagn.focus();
          }
        );
      } else element.srcElement.checked = false;
    },
    _tipoDiagnostico() {
      var $this = this;
      POPUP(
        {
          array: _tipoJsonHc("tipo_diagnostico"),
          titulo: "Tipo diagnostico",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: $this.tipo_diagn,
          callback_f: () => {
            $this._validarDiagnostico();
          },
        },
        (data) => {
          $this.tipo_diagn = data.COD;
          setTimeout(() => {
            $this._evaluarInitFormu_hc002f();
          }, 250);
        }
      );
    },
    _evaluarInitFormu_hc002f() {
      this._enablePag("dos");
      if (this.hc002f._farmacos.length > 0) {
        this._evaluarItemFormu();
      } else {
        loader("show");
        this._consultarFarmacos_hc002f();
      }
    },
    _consultarFarmacos_hc002f() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER809.DLL"))
        .then((data) => {
          this.hc002f._farmacos = data.FARMACOS.filter((e) => e.NUMERO != "");
          this._consultarLab_hc002f();
        })
        .catch((err) => {
          _regresar_menuhis();
        });
    },
    _consultarLab_hc002f() {
      postData({ datosh: datosEnvio() }, get_url("app/HICLIN/HC802.DLL"))
        .then((data) => {
          this.hc002f._laboratorios = data.FORLAB.filter((e) => {
            let numero = parseFloat(e.NUMERO) == 0 ? "" : e.NUMERO;
            if (numero && e.ESTADO == "") return e;
          });
          this._consultarImagen_hc002f();
        })
        .catch((err) => {
          _regresar_menuhis();
        });
    },
    _consultarImagen_hc002f() {
      postData({ datosh: datosEnvio() }, get_url("app/HICLIN/HC803.DLL"))
        .then((data) => {
          this.hc002f._imagen = data.FORIMAG.filter((e) => {
            let numero = parseFloat(e.NUMERO) == 0 ? "" : e.NUMERO;
            if (numero && e.ESTADO == "") return e;
          });
          this._consultarOrdMedica_hc002f();
        })
        .catch((err) => {
          _regresar_menuhis();
        });
    },
    _consultarOrdMedica_hc002f() {
      postData({ datosh: datosEnvio() }, get_url("app/HICLIN/HC804.DLL"))
        .then((data) => {
          this.hc002f._orden_medica = data.FOROM.filter((e) => {
            let numero = parseFloat(e.NUMERO) == 0 ? "" : e.NUMERO;
            if (numero && e.ESTADO == "") return e;
          });
          this._getConsultasTerap_hc002f();
        })
        .catch((err) => {
          _regresar_menuhis();
        });
    },
    _getConsultasTerap_hc002f() {
      postData({ datosh: datosEnvio() }, get_url("app/HICLIN/HC805.DLL"))
        .then((data) => {
          this.hc002f._consultasTerapias = data.FORCT.filter((e) => {
            let numero = parseFloat(e.NUMERO) == 0 ? "" : e.NUMERO;
            if (numero && e.ESTADO == "") return e;
          });
          this._consultarEspec_hc002f();
        })
        .catch((err) => {
          _regresar_menuhis();
        });
    },
    _consultarEspec_hc002f() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then((data) => {
          loader("hide");
          this.hc002f._especialidad = data.ESPECIALIDADES.filter(
            (e) => e.CODIGO.trim() != ""
          );
          this._consultarMacroHis();
        })
        .catch((err) => {
          _regresar_menuhis();
        });
    },
    _consultarMacroHis() {
      postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC837.DLL"))
        .then((data) => {
          loader("hide");
          this.hc002f._macros_his = data.MACROS_HIS;
          this._evaluarItemFormu();
        })
        .catch((err) => {
          _regresar_menuhis();
        });
    },
    _evaluarItemFormu() {
      this.form.item_formu = this.hc002f._tablaFormu.length + 1;
      this._validarItemFormu();
    },
    _validarItemFormu() {
      let $this = this,
        segundo_item;
      validarInputs(
        {
          form: "#fase_item_formu",
          orden: "1",
          event_f3: () => {
            $this._demandaInducida();
          },
          event_f5: $this._validarSalidaItemFormu,
        },
        () => {
          segundo_item = $this.form.item_formu - 1;
          if (segundo_item < 1) {
            let active = $("#navegacion").find("li.opcion-menu.active"),
              opcion = active[0].attributes[2].nodeValue;

            if (opcion == "041" || opcion == "03") {
              $this._validarSalidaItemFormu();
            } else {
              $this._enablePag("uno");
              setTimeout(() => {
                $this._validarDiagnostico();
              }, 150);
            }
          } else {
            $this.form.item_formu = segundo_item;
            $this._validarItemFormu();
          }
        },
        () => {
          var item_tabla = this.hc002f._tablaFormu.length + 1;
          segundo_item = parseFloat($this.form.item_formu);

          if (segundo_item) {
            if (segundo_item > item_tabla || segundo_item < 1) {
              $this.form.item_formu = segundo_item;
              $this._evaluarItemFormu();
            } else {
              var index = $this.hc002f._tablaFormu.findIndex(
                (e) => e.item_formu == segundo_item
              );

              if (index > -1) {
                $this.form = JSON.parse(
                  JSON.stringify($this.hc002f._tablaFormu[index])
                );
              }

              $this._validarTipoformu();
            }
          } else {
            $this._evaluarItemFormu();
          }
        }
      );
    },
    _validarSalidaItemFormu() {
      CON851P("03", this._validarItemFormu, _regresar_menuhis);
    },
    _validarTipoformu() {
      var $this = this;
      POPUP(
        {
          array: this.opcionesTipoFormu,
          titulo: "Tipo formulacion",
          indices: [{ id: "value", label: "text" }],
          seleccion: this.form.tipo_formu,
          callback_f: () => {
            $this.form = _limpiarFormulacion();
            $this._evaluarItemFormu();
          },
        },
        (data) => {
          this.form.tipo_formu = data.value;
          this.$refs.tipo_formu.value = `${data.value} - ${data.text}`;
          $this._validarCodFormu();
        }
      );
    },
    _validarCodFormu() {
      var _this = this;
      validarInputs(
        {
          form: "#fase_cod_formu_hc002f",
          orden: "1",
          event_f3: () => {
            _this._demandaInducida();
          },
          event_f7: _this._ventanaMacroHis,
          event_f9: () => {
            if (_this.form.tipo_formu == 1) _this._initFormulacionAnt();
            else _this._validarCodFormu();
          },
        },
        _this._validarTipoformu,
        _this._onValidarCod_formu
      );
    },
    _onValidarCod_formu() {
      let _this = this,
        data = _this._getTipoFormu(),
        consulta = _this._consultarCodFormula();

      if (consulta) {
        _this.form.cod_formu = consulta.COD;
        _this.form.descripcion = consulta.DESCRIP.trim();
        _this._validarCantformu();
      } else {
        jAlert(
          {
            titulo: "Alerta",
            mensaje: `Codido de ${data.titulo} no encontrado`,
          },
          _this._validarCodFormu
        );
      }
    },
    _validarCantformu() {
      var $this = this;
      validarInputs(
        {
          form: "#fase_cant_formu_hc002f",
          orden: "1",
        },
        () => {
          $this._validarCodFormu();
        },
        () => {
          var cod_formu = $this.form.cod_formu,
            tipo_formu = $this.form.tipo_formu,
            cant_formu = parseFloat($this.form.cant_formu) || 0,
            grupo = cod_formu.substr(0, 2);

          if (cant_formu > 0) {
            if (
              (tipo_formu == "4" || tipo_formu == "5") &&
              (cod_formu == "890202" ||
                cod_formu == "890302" ||
                cod_formu == "890402")
            ) {
              $this._ventanaEspecialidad();
            } else {
              if (tipo_formu == "6") {
                $this._ventanaIncapacidad();
              } else {
                if (tipo_formu == "1" && (grupo === "PO" || grupo === "NP")) {
                  $this._administrarMedicamentos();
                } else {
                  $this._ventanaIndicaciones();
                }
              }
            }
          } else {
            CON851("03", "03", null, "error", "Error");
            this._validarCantformu();
          }
        }
      );
    },
    _ventanaIncapacidad() {
      let fecha = this.hc002f._reg_hc.fecha;
      this.form.fecha_incap.ano = fecha.substr(0, 4);
      this.form.fecha_incap.mes = fecha.substr(4, 2);
      this.form.fecha_incap.dia = fecha.substr(6, 2);

      this.modal_incapacidad = true;
      this._validarFechaIncap("1");
    },
    _validarFechaIncap(orden) {
      let _this = this;
      validarInputs(
        {
          form: "#fase_fecha_incap",
          orden: orden,
        },
        () => {
          _this.modal_incapacidad = false;
          _this._validarCantformu();
        },
        () => {
          let fecha = _this.hc002f._reg_hc.fecha;
          let consulta_covid = this.hc002f._diagnosticos.find(e => e.diagn == "U071" || e.diagn == "U072")
          let usuario = localStorage.Usuario;

          let anio = this.form.fecha_incap.ano
          let mes = this.form.fecha_incap.mes
          let dia = this.form.fecha_incap.dia

          let fecha_incap = `${anio}${mes}${dia}`;

          if (_validarFecha(anio, mes, dia)) {
            if (consulta_covid || ["GEBC", "ADMI"].includes(usuario)) _this._validarProrroga();
            else {
              if (parseFloat(fecha_incap) < parseFloat(fecha)) {
                plantillaToast("", "37", null, "warning", "");
                _this._ventanaIncapacidad();
              } else if (mes > 12 || dia > 31) {
                plantillaToast("", "Mes o dia invalido", null, "warning", "");
                _this._ventanaIncapacidad();
              } else {
                _this._validarProrroga();
              }
            }
          } else {
            _this._ventanaIncapacidad();
          }
        }
      );
    },
    _validarProrroga() {
      var $this = this;
      validarInputs(
        {
          form: "#fase_prorroga",
          orden: "1",
        },
        () => {
          $this._validarFechaIncap("3");
        },
        () => {
          var prorroga = $this.form.prorroga_formu.toUpperCase();

          $this.form.prorroga_formu = prorroga == "S" ? prorroga : "N";
          $this._validarGradoIncap();
        }
      );
    },
    _validarGradoIncap() {
      var $this = this;
      validarInputs(
        {
          form: "#fase_grado_incap",
          orden: "1",
        },
        () => {
          $this._validarProrroga();
        },
        () => {
          var grado = $this.form.grado_incap_formu;
          grado = grado.toUpperCase();

          $this.form.grado_incap_formu = grado == "T" ? grado : "P";
          $this._validarTipoIncap();
        }
      );
    },
    _validarTipoIncap() {
      var $this = this;
      POPUP(
        {
          array: _tipoJsonHc("tipoIncapacidad"),
          titulo: "Tipo incapacidad",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: $this.form.tipo_incap_formu,
          callback_f: () => {
            $this._validarGradoIncap();
          },
        },
        (data) => {
          $this.form.tipo_incap_formu = data.COD;
          $this.descrip_tipo_incap = `${data.COD} - ${data.DESCRIP}`;
          this.modal_incapacidad = false;
          $this._ventanaIndicaciones();
        }
      );
    },
    _ventanaEspecialidad() {
      var $this = this;
      _ventanaDatos({
        titulo: "Ventana de especialdidades",
        columnas: ["CODIGO", "NOMBRE"],
        data: $this.hc002f._especialidad,
        callback_esc: $this._validarCantformu,
        callback: function (data) {
          $this.form.espec_formu = data.CODIGO.trim();
          $this._ventanaIndicaciones();
        },
      });
    },
    _administrarMedicamentos() {
      var medicamento = this._consultarCodFormula();
      this.modal_adm = true;
      if (
        this.form.indic_formu.indi1_formu.orden_dosis_formu != "ADMINISTRAR"
      ) {
        if (medicamento.ORDEN.trim() == "ADMINISTRAR") {
          this.form.indic_formu.indi1_formu = {
            orden_dosis_formu: medicamento.ORDEN.trim(),
            cant_dosis_formu: medicamento.CANT_DOSIS.trim(),
            unid_dosis_formu: medicamento.UNID_DOSIS.trim(),
            inmed_formu: {
              cada_dosis_formu: medicamento.CADA_DOSIS.trim(),
              cant_frec_dosis_formu: medicamento.CANT_FREC.trim(),
              unid_frec_dosis_formu: medicamento.UNID_FREC.trim(),
            },
            via_dosis_formu: medicamento.VIA.trim(),
            dias_trat_formu: "",
          };
          this.form.var_dosis_formu.tipo_dosisf_formu = medicamento.TIPO.trim();
          this.form.var_dosis_formu.cant_frec_dosisf_formu = medicamento.CANT_FREC_DOSISF.trim();
          this.form.var_dosis_formu.frec_dosisf_formu = medicamento.FREC.trim();
          this.form.var_dosis_formu.via_formu = medicamento.VIA_DOSIS.trim();
        } else {
          this.form.indic_formu.indi1_formu.orden_dosis_formu = "ADMINISTRAR";
          this.form.indic_formu.indi1_formu.inmed_formu.cada_dosis_formu =
            "CADA";
        }
      }
      this._validarCantDosis();
    },
    _validarCantDosis() {
      var $this = this;
      validarInputs(
        {
          form: "#fase_cant_dosis",
          orden: "1",
        },
        () => {
          $this.modal_adm = false;
          $this._validarCantformu();
        },
        () => {
          $this._initTipoDosisf();
        }
      );
    },
    _initTipoDosisf() {
      var tipo_dosis = this.form.var_dosis_formu.tipo_dosisf_formu,
        $this = this;
      POPUP(
        {
          array: _tipoJsonHc("adm_dosis"),
          titulo: "Tipo dosis",
          indices: [{ id: "value", label: "text" }],
          seleccion: tipo_dosis,
          callback_f: () => {
            $this._validarCantDosis();
          },
        },
        (data) => {
          $this.form.var_dosis_formu.tipo_dosisf_formu = data.value;

          if (data.value == "F") {
            $this.form.var_dosis_formu.cant_frec_dosisf_formu = "";
            $this.form.var_dosis_formu.frec_dosisf_formu = "";
            $this.form.var_dosis_formu.via_formu = "8";
            $this._validarViaFormu();
          } else {
            setTimeout(() => {
              $this._validarCantFrecDosisf();
            }, 250);
          }
        }
      );
    },
    _validarCantFrecDosisf() {
      var $this = this;
      validarInputs(
        {
          form: "#fase_cant_frec_dosis",
          orden: "1",
        },
        () => {
          $this._initTipoDosisf();
        },
        () => {
          $this._initValidarFrecDosisf();
        }
      );
    },
    _initValidarFrecDosisf() {
      var frecuencia = this.form.var_dosis_formu.frec_dosisf_formu,
        $this = this;
      POPUP(
        {
          array: _tipoJsonHc("adm_tiempo"),
          titulo: "Frecuencia dosis",
          indices: [{ id: "value", label: "text" }],
          seleccion: frecuencia,
          callback_f: () => {
            $this._validarCantFrecDosisf();
          },
        },
        (data) => {
          $this.form.var_dosis_formu.frec_dosisf_formu = data.value;
          $this._validarViaFormu();
        }
      );
    },
    _validarViaFormu() {
      var via_formu = this.form.var_dosis_formu.via_formu,
        $this = this;
      POPUP(
        {
          array: _tipoJsonHc("adm_via_dosis"),
          titulo: "Via dosis",
          indices: [{ id: "value", label: "text" }],
          seleccion: via_formu,
          callback_f: () => {
            if ($this.form.var_dosis_formu.tipo_dosisf_formu == "F") {
              $this._initTipoDosisf();
            } else $this._initValidarFrecDosisf();
          },
        },
        (data) => {
          $this.form.var_dosis_formu.via_formu = data.value;
          $this._validarAdmist();
        }
      );
    },
    _validarAdmist() {
      var msj = "",
        adm_dosis = this.form.var_dosis_formu;

      if (adm_dosis.tipo_dosisf_formu == "F") {
        if (!adm_dosis.cant_dosisf_formu || adm_dosis.cant_dosisf_formu < 1) {
          msj = "Falta ingresar cantidad formula";
        } else if (!adm_dosis.via_formu) {
          msj = "Falta selecionar via formula";
        }
      } else {
        if (!adm_dosis.cant_dosisf_formu || adm_dosis.cant_dosisf_formu < 1) {
          msj = "Falta ingresar cantidad formula";
        } else if (!adm_dosis.tipo_dosisf_formu) {
          msj = "Falta selecionar tipo formula";
        } else if (
          !adm_dosis.cant_frec_dosisf_formu ||
          adm_dosis.cant_frec_dosisf_formu < 0
        ) {
          msj = "Falta ingresar cantidad de frecuencia";
        } else if (!adm_dosis.frec_dosisf_formu) {
          msj = "Falta selecionar frecuancia dosis";
        } else if (!adm_dosis.via_formu) {
          msj = "Falta selecionar via formula";
        }
      }

      if (msj) {
        plantillaToast("", msj, null, "error", "error");
        this._validarCantDosis();
      } else {
        let frecuencia = this.form.var_dosis_formu.cant_frec_dosisf_formu;
        this.form.indic_formu.indi1_formu.inmed_formu.cant_frec_dosis_formu = frecuencia;

        let cantidad = this.form.var_dosis_formu.cant_dosisf_formu;
        this.form.indic_formu.indi1_formu.cant_dosis_formu = cantidad;

        this._ventanaIndicaciones();
        this.modal_adm = false;
      }
    },
    _ventanaIndicaciones() {
      let cod_formu = $this.form.cod_formu,
          tipo_formu = $this.form.tipo_formu,
          grupo = cod_formu.substr(0, 2);

      if (tipo_formu == "1" && (grupo === "PO" || grupo === "NP")) {
        this.maxlenght = 78;
      } else if (tipo_formu == "6") {
        this.maxlenght = 190;
      } else {
        this.maxlenght = 156;
      }

      let _this = this;
      _this.modal_indic = true;
      validarInputs(
        {
          form: "#fase_indicaciones",
          orden: "1",
        },
        () => {
          _this.modal_indic = false;
          _this._validarCantformu();
        },
        _this._validarManejo
      );
    },
    _validarManejo() {
      this.modal_indic = false;

      let tipo = this.form.tipo_formu,
        unserv = this.hc002f._reg_hc.cierre.unserv;

      if (tipo == 1 || tipo == 2 || tipo == 3 || tipo == 4 || tipo == 5) {
        if (unserv == 02 || unserv == 08 || unserv == 63 || unserv == 64) {
          this.form.manejo_formu = 2;
          this._afterIndicaciones();
        } else {
          if (
            this.hc002f._usuar.NIT == 900264583 &&
            $_REG_PACI.EPS == "EPS005"
          ) {
            this.form.manejo_formu = 2;
          } else {
            this._hc864(this.form.manejo_formu)
              .then((data) => {
                this.form.manejo_formu = data.COD;
                this._afterIndicaciones();
              })
              .catch(() => {
                this._validarCantformu();
              });
          }
        }
      } else this._afterIndicaciones();
    },
    _afterIndicaciones() {
      if (this.form.tipo_formu == 1) {
        this._validarDiasTrata();
      } else if (this.form.tipo_formu == 6) {
        this._otroRenglon();
      } else {
        this.form.indic_formu.indi1_formu.dias_trat_formu = "1";
        this._validarImpresion();
      }
    },

    _hc864(selecion) {
      return new Promise((resolve, reject) => {
        POPUP(
          {
            array: _tipoJsonHc("hc864"),
            titulo: "Manejo interconsulta",
            indices: [{ id: "COD", label: "DESCRIP" }],
            seleccion: selecion,
            callback_f: () => {
              setTimeout(() => {
                reject();
              }, 150);
            },
          },
          (data) => {
            setTimeout(() => {
              resolve(data);
            }, 150);
          }
        );
      });
    },
    _validarDiasTrata() {
      var $this = this;
      validarInputs(
        {
          form: "#fase_dias_tot_formu_hc002f",
          orden: "1",
        },
        () => {
          $this._validarCantformu();
        },
        () => {
          if (
            !$this.form.indic_formu.indi1_formu.dias_trat_formu ||
            $this.form.indic_formu.indi1_formu.dias_trat_formu < 1
          ) {
            plantillaError("02", "02", "HC002F", () => {
              $this._validarDiasTrata();
            });
          } else {
            $this._validarImpresion();
          }
        }
      );
    },
    _validarImpresion() {
      var $this = this;

      if (
        this.hc002f._usuar.nit == 900147959 ||
        this.hc002f._usuar.nit == 844003225
      ) {
        this.form.nro_ord_formu = 3;
      } else if (!this.form.nro_ord_formu) {
        this.form.nro_ord_formu = 1;
      }

      validarInputs(
        {
          form: "#fase_ord_formu_hc002f",
          orden: "1",
        },
        () => {
          if ($this.form.tipo_formu == 1) {
            $this._validarDiasTrata();
          } else {
            $this._validarCantformu();
          }
        },
        () => {
          $this._otroRenglon();
        }
      );
    },
    _otroRenglon() {
      var index = this.hc002f._tablaFormu.findIndex(
        (e) => e.item_formu == this.form.item_formu
      );
      if (index > -1) {
        this.hc002f._tablaFormu[index] = JSON.parse(JSON.stringify(this.form));
      } else {
        this.hc002f._tablaFormu.push(JSON.parse(JSON.stringify(this.form)));
      }

      this.form_descrip = {
        tipo_dosisf: null,
        frec_dosisf: null,
        via_formu: null,
      };

      this.form = _limpiarFormulacion();
      this._evaluarItemFormu();
    },

    _demandaInducida() {
      let { unserv } = this.hc002f._reg_hc.cierre;
      if (unserv == 02 || unserv == 08 || unserv == 63 || unserv == 64) {
        CON851P(
          "48",
          () => {
            setTimeout(this._validarRevaloracion, 150);
          },
          () => {
            this.params_hc110.tabla_formu = this.hc002f._tablaFormu;
            this.params_hc110.orden_medica = this.hc002f._orden_medica;
            this.params_hc110.estado = true;
            this._enablePag("tres");
          }
        );
      } else this._validarRevaloracion();
    },

    _terminarDemandaInducida(item) {
      this.params_hc110.estado = false;
      this._enablePag("dos");

      this.hc002f._tablaFormu = item.tabla_formu;
      this.hc002f._orden_medica = item.orden_medica;

      this.hc002f._tablaFormu.forEach((a) => {
        let consulta = this.hc002f._orden_medica.find(
          (b) => a.cod_formu == b.COD
        );

        if (consulta) a.descripcion = consulta.DESCRIP;
      });

      this._validarRevaloracion();
    },

    _validarRevaloracion() {
      let {
        opc_llamado,
        revaloracion,
        cierre: { unserv },
      } = this.hc002f._reg_hc;

      if (
        unserv == "01" &&
        opc_llamado == "1" &&
        (revaloracion == "" || revaloracion == 0)
      ) {
        this.modal_revaloracion = true;
        this._fase_validar_revaloracion();
      } else this._confirmar();
    },
    _fase_validar_revaloracion() {
      let _this = this;
      validarInputs(
        {
          form: "#fase_revaloracion",
          orden: "1",
        },
        () => {
          this.modal_revaloracion = false;
          this._validarItemFormu();
        },
        () => {
          let { _revaloracion } = _this.hc002f;
          _revaloracion = _revaloracion.toUpperCase() || "";

          if (_revaloracion == "S" || _revaloracion == "N") {
            _this.hc002f._revaloracion = _revaloracion.toUpperCase();
            _this.modal_revaloracion = false;
            _this._confirmar();
          } else {
            plantillaToast("03", "03", null, "error", "error");
            _this._fase_validar_revaloracion();
          }
        }
      );
    },

    _confirmar() {
      let hc002f = this;

      CON851P("01", hc002f._validarItemFormu, () => {
        let datos_envio = hc002f._bajarDatos();
        if (datos_envio) {
          loader("show");
          postData(datos_envio, get_url("APP/HICLIN/HC002F-1.DLL"))
            .then((data) => {
              loader("hide");
              hc002f._validarFormuTrimestre();
            })
            .catch((err) => {
              loader("hide");
              hc002f._validarItemFormu();
            });
        } else {
          hc002f._initImpresion();
        }
      });
    },
    _validarFormuTrimestre() {
      let data = this._bajarDatos();
      if (data) {
        let llave_evo = `${data.llave}${data.fecha}${data.hora}${data.oper}`;

        this.params_hc890p.llave_evo = llave_evo;
        this.params_hc890p.estado = true;
      } else this._initImpresion();
    },
    _terminarTrimestral(data) {
      console.log("termina trimestral ->", data);
      if (data) {
        this.fechas_trimestre = data.split("|");
      } else data = [];

      this._initImpresion();
    },
    async _initImpresion() {
      loader("show");
      await this.abrirArchivosImpresion();
      // ****************** IMPRESION APERTURA ***********************
      if ($_REG_HC.opc_llamado == "1") {
        await this.impresionApertura();
      }

      if (
        ($_REG_HC.fecha_lnk || $_REG_HC.hora_lnk || $_REG_HC.oper_lnk) &&
        $_REG_HC.opc_llamado != "1"
      ) {
        $this.llaveEvo_imp =
          $_REG_HC.llave_hc +
          $_REG_HC.fecha_lnk +
          $_REG_HC.hora_lnk +
          $_REG_HC.oper_lnk;
      }

      if ($this.llaveEvo_imp.trim() != "") {
        $_REG_HC.tipo_evo = $_REG_HC.tipo_evo || "1";

        await postData(
          {
            datosh:
              datosEnvio() +
              `${$_REG_PACI["COD"]}|${$_REG_HC["suc_folio_hc"] + $_REG_HC["nro_folio_hc"]
              }|${$_REG_HC.tipo_evo}|${$_REG_HC["unser_hc"]}`,
          },
          get_url("app/HICLIN/HC705B.DLL")
        )
          .then((data) => {
            $this._evoluciones = data.EVOLUCIONES;
            $this._evoluciones.pop();
          })
          .catch((err) => {
            console.log(err, "error");
            loader("hide");
          });

        $this.data_evo = await $this._evoluciones.find(
          (e) => e.LLAVE_EVO == $this.llaveEvo_imp
        );
        if ($this.data_evo)
          await this.impresionEvoluciones($this.data_evo.OPC_EVO);

        await $this.imprimirTrimestral();
      }

      loader("hide");
      if ($_REG_HC.opc_llamado == "1") {
        if ($_REG_HC.embar) {
          let serv = this.hc002f._reg_hc.serv

          if (serv == "08" || (this.hc002f._usuar.NIT == 845000038 && serv == "02")) {

            jAlert(
              {
                titulo: "Confirmar!",
                mensaje: "<b>Se requiere diligenciar CLAP </b>",
              },
              () => {
                $("#body_main").load("../../HICLIN/paginas/CLAP001.html");
              }
            );

          } else _regresar_menuhis();
        } else _regresar_menuhis();
      } else _regresar_menuhis();
    },
    async imprimirTrimestral() {
      for (i in $this.fechas_trimestre) {
        if (
          $this.fechas_trimestre[i].trim() != "" &&
          $this.fechas_trimestre[i] != $this.llaveEvo_imp.substring(23, 31)
        ) {
          var llave_tri =
            $this.llaveEvo_imp.substring(0, 23) +
            $this.fechas_trimestre[i] +
            $this.llaveEvo_imp.substring(31, 39);
          $this.data_evo = $this._evoluciones.find(
            (e) => e.LLAVE_EVO == llave_tri
          );
          if ($this.data_evo)
            await this.impresionEvoluciones($this.data_evo.OPC_EVO);
        }
      }
    },
    async impresionApertura() {
      ($this.opcionesHC701 = {
        opc_aper: "S",
        opc_evo: "N",
        opc_enf: "N",
        opc_ter: "N",
        opc_for: "N",
        opc_lab: "N",
        opc_ima: "N",
        opc_ord: "N",
        opc_con: "N",
        opc_inc: "N",
        opc_resu: "N",
        fecha_ini_opc: "",
        fecha_fin_opc: "",
        opc_macro: "        ",
      }),
        ($this.arrayDatos = {
          _ciudades: $this._ciudades,
          _paisesRips: $this._paisesRips,
          _hcpac: $this.hc002f._reg_hc,
          _especialidades: $this._especialidades,
          _detalles: $this._detalles,
          $_reg_hc: $_REG_HC,
          $_reg_paci: $_REG_PACI,
        });

      switch ($this.hc002f._reg_hc.esquema) {
        case "AI01":
          await iniciar_AIEPI010($this.opcionesHC701, $this.arrayDatos);
          // IMPRIME DATO-9010 - VALE
          await this.traerHistoriaClinica().then(() => {
            iniciar_HCI9010( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
          });
          // IMPRIME DATO-9011 - APGAR
          await this.traerHistoriaClinica().then(() => {
            iniciar_HCI9011( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
          });

          // IMPRIME DATO-9007 - AUTISMO
          await this.traerHistoriaClinica().then(() => {
            iniciar_HCI9007( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
          });
          break;
        case "AI02":
          await iniciar_AIEPI020($this.opcionesHC701, $this.arrayDatos);
          // IMPRIME DATO-9010 - VALE
          await this.traerHistoriaClinica().then(() => {
            iniciar_HCI9010( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
          });
          // IMPRIME DATO-9011 - APGAR
          await this.traerHistoriaClinica().then(() => {
            iniciar_HCI9011( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
          });
          // IMPRIME DATO-9007 - AUTISMO
          await this.traerHistoriaClinica().then(() => {
            iniciar_HCI9007( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
          });
          break;
        case "8001":
          await iniciar_HCI8001($this.opcionesHC701, $this.arrayDatos);
          break;
        case "8002":
          await _iniciarHCI8002($this.opcionesHC701, $this.arrayDatos);
          break;
        case "8031":
          await _iniciar_HCI8031($this.opcionesHC701, $this.arrayDatos);
          break;
        case "9012":
          await _iniciarHCI9012($this.opcionesHC701, $this.arrayDatos);
          break;
        case "8051":
          await this.traerHistoriaClinica().then(() => {
            iniciar_HCI9010( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
          });
          await this.traerHistoriaClinica().then(() => {
            iniciar_HCI9011( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
          });
          const { imprimir_HCI8051 } = require("../../frameworks/pdf/hiclin/HCI-8051.formato");

          await this.traerHistoriaClinica().then(() => {
            imprimir_HCI8051({
              opciones: this.opcionesHC701,
              hcprc: this._hcprc2,
              detalles: this._detalles,
              paci: $_REG_PACI,
            });
          });
          break;
        default:
          await
            await this.traerHistoriaClinica().then(async () => {
              _iniciarHCI01($this.opcionesHC701,
                {
                  ...$this.arrayDatos,
                  hcprc_new: this._hcprc2,
                });

              await iniciar_HCI9010($this.arrayDatos, $this.opcionesHC701, []);
              await this.traerHistoriaClinica().then(() => {
                iniciar_HCI9011( {...$this.arrayDatos, hcprc_new: this._hcprc2,} , $this.opcionesHC701);
              });
            })

          break;
      }
    },
    async impresionEvoluciones(opciones) {
      var opc_evo = "";
      var opc_enf = "";
      var opc_ter = "";
      if (
        ($_REG_HC.fecha_lnk || $_REG_HC.hora_lnk || $_REG_HC.oper_lnk) &&
        $_REG_HC.opc_llamado != "1"
      ) {
        opc_evo = opciones.EVOMED.toUpperCase();
        opc_enf = opciones.ENFERM.toUpperCase();
        opc_ter = opciones.TERAP.toUpperCase();
      } else {
        opc_evo = "N";
        opc_enf = "N";
        opc_ter = "N";
      }
      $this.jsonEnvio = {
        folio: $this.data_evo["FOLIO_EVO"],
        macro: $this.data_evo["MACRO_EVO"],
        id: $this.data_evo["ID_EVO"],
        oper: $this.data_evo["OPER_ELAB_EVO"],
        medic: $this.data_evo["MEDICO_EVO"],
        fecha: $this.data_evo["FECHA_EVO"],
        hora: $this.data_evo["HORA_EVO"],
        tipoEvo: $this.data_evo["TIPO_EVO"],
        _arrayTipoEvo: tipoEvolucion(),
        original: 1,
        _opciones: {
          opc_evo: opc_evo,
          opc_enf: opc_enf,
          opc_ter: opc_ter,
          opc_for: opciones.FORMUL.toUpperCase(),
          opc_lab: opciones.LABOR.toUpperCase(),
          opc_ima: opciones.IMAGE.toUpperCase(),
          opc_ord: opciones.ORDMED.toUpperCase(),
          opc_con: opciones.CONSUL.toUpperCase(),
          opc_inc: opciones.INCAP.toUpperCase(),
          fechaIni: "",
          fechaFin: "",
          opc_macro: $this.data_evo["MACRO_EVO"],
        },
        arrayDatos_HCI02: {
          _ciudades: $this._ciudades,
          _paisesRips: $this._paisesRips,
          _hcpac: $this.hc002f._reg_hc,
          _especialidades: $this._especialidades,
          _detalles: $this._detalles,
        },
      };
      await _iniciarHCI02($this.jsonEnvio).then((data) => {
        console.log(data, "data");
      });
    },
    async abrirArchivosImpresion() {
      await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then((data) => {
          $this._ciudades = data.CIUDAD;
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });

      $this._especialidades = $this.hc002f._especialidad;

      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
        .then((data) => {
          $this._paisesRips = data.PAISESRIPS;
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });

      var serv =
        this.hc002f._reg_hc.esquema == "AI01" || this.hc002f._reg_hc.esquema == "AI02" ? this.hc002f._reg_hc.serv : "";
      await postData(
        { datosh: datosEnvio() + $_REG_HC.llave_hc + "|**|**||" + serv + "|" },
        get_url("app/HICLIN/HCDETAL_PRC.DLL")
      )
        .then((data) => {
          $this._detalles = data["DETHC"];
          $this._detalles.pop();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },
    _bajarDatos() {
      let fecha = `${this.fecha_act.año}${this.fecha_act.mes}${this.fecha_act.dia}`;

      let datos = {
        datosh: datosEnvio() + localStorage.Usuario + "|",
        llave: this.hc002f._reg_hc.llave,
        fecha: fecha,
        hora: this.hora_act,
        oper: this.operador,
        medico: this.hc002f._profesional.IDENTIFICACION.trim(),
        unserv: this.hc002f._reg_hc.cierre.unserv,
        revaloracion: this.hc002f._revaloracion,
        tipo_diagn: this.tipo_diagn,
        novedad: this.data_cambio.novedad,
      };

      let llave_evo = datos.llave + datos.fecha + datos.hora + datos.oper;
      this.llaveEvo_imp = llave_evo;

      if (this.hc002f._tablaFormu.length > 0) {
        let tabla_formu = JSON.parse(JSON.stringify(this.hc002f._tablaFormu));

        tabla_formu.forEach((item) => {
          let indic2_2_formu = _reemplazoEnterXCarac(
            item.indic_formu.indic2_formu
          );

          item.indic_formu.indic2_formu = indic2_2_formu;
        });

        let new_obj = _desplegarNuevoArray(tabla_formu);
        datos = Object.assign(datos, new_obj);

        this.hc002f._diagnosticos.forEach((val, index) => {
          let obj_diagn = _desplegarNuevoObject(val, index);
          datos = Object.assign(datos, obj_diagn);
        });
      } else {
        datos = false;
      }

      return datos;
    },
    _consultarCodFormula() {
      var data = this._getTipoFormu(),
        cod_formu = this.form.cod_formu,
        retornar = "";

      retornar = this.hc002f[`${data.text}`].find((e) => {
        if (e.COD.trim() == cod_formu.trim()) return e;
      });

      return (retornar = retornar ? retornar : "");
    },

    _consultaDescripcionFormula(tipo_formu, codigo) {
      var data = this._getTipoFormu(tipo_formu),
        retornar = "";

      retornar = this.hc002f[`${data.text}`].find((e) => {
        if (e.COD.trim() == codigo.trim()) return e;
      });

      return (retornar = retornar ? retornar : {});
    },

    _getTipoFormu(tipo) {
      let data = {},
        tipo_formu = parseFloat(tipo) || this.form.tipo_formu;

      switch (tipo_formu) {
        case 1:
          data = {
            titulo: "medicamentos",
            text: "_farmacos",
          };
          break;
        case 2:
          data = {
            titulo: "laboratorios",
            text: "_laboratorios",
          };
          break;
        case 3:
          data = {
            titulo: "imagen",
            text: "_imagen",
          };
          break;
        case 4:
        case 6:
          data = {
            titulo: "orden medica",
            text: "_orden_medica",
          };
          break;
        case 5:
          data = {
            titulo: "consultas y terapias",
            text: "_consultasTerapias",
          };
          break;
      }
      return data;
    },
    _validarVentanaFormu() {
      var data = this._getTipoFormu();
      if (!data) {
        jAlert(
          {
            titulo: "Alerta",
            mensaje: "Debe selecionar un tipo de formulacion",
          },
          this._validarCodFormu
        );
      } else {
        this._ventanaFormulacion(data);
      }
    },
    _ventanaDiagnosticos() {
      let _this = this;
      _ventanaDatos({
        titulo: `Ventana de Enfermedades`,
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: _this.hc002f._enfermedades,
        callback_esc: function () {
          _this.$refs.cod_diagn.focus();
        },
        callback: function (data) {
          _this.form_diag.diagn = data.COD_ENF.trim();
          _this.$refs.cod_diagn.focus();
        },
      });
    },
    _ventanaFormulacion(data) {
      let _this = this,
        tipo_formu = _this.form.tipo_formu,
        _tabla = JSON.parse(JSON.stringify(_this.hc002f[`${data.text}`]));

      if (tipo_formu == 4) {
        _tabla = _tabla.filter((e) => e.COD.substr(0, 2) != "IC");
      } else if (tipo_formu == 6) {
        _tabla = _tabla.filter((e) => e.COD.substr(0, 2) == "IC");
      }

      _ventanaDatos({
        titulo: `Ventana de ${data.titulo}`,
        columnas: ["COD", "DESCRIP"],
        data: _tabla,
        callback_esc: function () {
          _this.$refs.cod_formu_hc002f.focus();
        },
        callback: function (data) {
          _this.form.cod_formu = data.COD.trim();
          _this.$refs.cod_formu_hc002f.focus();
          _enterInput(`[ref="cod_formu_hc002f"`);
        },
      });
    },
    _initFormulacionAnt() {
      if (this.hc002f._formulaAnt.length > 0) {
        this.modal_f9 = true;
        this._ventanaFormulacionAnt(0);
        this.hc002f._seundaTabla = this.hc002f._formulaAnt[0].tabla;
      } else {
        plantillaToast(
          "",
          "No tiene formulaciones anteriores",
          null,
          "error",
          "error"
        );
        this._validarCodFormu();
        this.$refs.cod_formu_hc002f.focus();
      }
    },
    _ventanaFormulacionAnt(orden) {
      var _this = this;
      validarTabla(
        {
          tabla: "#tablaIzq_hc002f",
          orden: orden,
          cambioFoco: (a) => {
            _this.index_tabla = a;
            _this.hc002f._seundaTabla = _this.hc002f._formulaAnt[a].tabla;
          },
          Esc: () => {
            _this.modal_f9 = false;
            _this.$refs.cod_formu_hc002f.focus();
            _this._validarCodFormu();
          },
        },
        (data) => {
          _this.modal_f9 = false;
          _this._bajarTablaFormuF9();
          _this._evaluarItemFormu();
        },
        () => {
          let length = _this.hc002f._formulaAnt.length - 1;
          _this._ventanaFormulacionAnt(length);
        },
        (e) => _this._ventanaFormulacionAnt(0)
      );
    },
    _ventanaMacroHis() {
      let _this = this;
      let array = _tipoJsonHc("tipo_macro_his").find(
        (e) => e.COD == _this.form.tipo_formu
      );
      if (array) {
        POPUP(
          {
            array: [array],
            titulo: "Tipo de macro",
            indices: [{ id: "COD", label: "DESCRIP" }],
            seleccion: _this.form.tipo_formu,
            callback_f: _this._validarCodFormu,
          },
          (data) => {
            let filter = _this.hc002f._macros_his.filter(
              (e) => e.TIPO == data.COD
            );
            console.log(filter);
            if (filter.length > 0) _this._segundaVentanaMacroHis(filter);
            else {
              jAlert(
                {
                  titulo: "Alerta",
                  mensaje: "No existe movimiento",
                },
                _this._validarCodFormu
              );
            }
          }
        );
      } else _this._validarCodFormu();
    },
    _segundaVentanaMacroHis(datos) {
      let _this = this;
      _ventanaDatos({
        titulo: "Macros de historia",
        columnas: ["CODIGO", "NOMBRE", "TIPO"],
        data: datos,
        callback_esc: _this._validarCodFormu,
        callback: function (data) {
          let filter = data.TABLA_MACRO.filter((e) => e.GRP.trim() != "");
          _this._reglonMacroHis(filter);
          _this._evaluarItemFormu();
        },
      });
    },
    _reglonMacroHis(array) {
      array.forEach((a) => {
        var _this = this,
          data = _this._getTipoFormu(),
          form = _limpiarFormulacion(),
          cod_formu = `${a.GRP}${a.NUMER}`,
          item_formu = _this.hc002f._tablaFormu.length + 1,
          retornar = _this.hc002f[`${data.text}`].find((e) => {
            if (e.COD.trim() == cod_formu.trim()) return e;
          });

        if (retornar) form.descripcion = retornar.DESCRIP.trim();

        form.item_formu = item_formu;
        form.tipo_formu = _this.form.tipo_formu;
        form.cod_formu = cod_formu;

        form.cant_formu = 1;

        _this.hc002f._tablaFormu.push(JSON.parse(JSON.stringify(form)));
      });
    },
    _consultarEspec_002f(data) {
      var retornar = "";
      for (var i in data) {
        this.hc002f._profesional.TAB_ESPEC.forEach((item) => {
          if (data[i] == item.COD.trim()) {
            retornar = item.COD.trim();
          }
        });
      }
      return retornar;
    },
    _consultarDiagnostico(cod) {
      cod = cod || "";
      return (
        this.hc002f._enfermedades.find(
          (e) => e.COD_ENF == cod.toUpperCase()
        ) || {
          NOMBRE_ENF: "Sin definir",
        }
      );
    },
    _deleteItemFormu(element) {
      let item_formu = parseFloat(element.srcElement.value);

      if (element.srcElement.checked) {
        CON851P(
          "Desea elminar el item ?",
          () => {
            element.srcElement.checked = false;
            this.$refs.cod_formu_hc002f.focus();
          },
          () => {
            element.srcElement.checked = false;
            let filtro = this.hc002f._tablaFormu.filter(
              (e) => e.item_formu != item_formu
            );
            this.hc002f._tablaFormu = JSON.parse(JSON.stringify(filtro));

            this.hc002f._tablaFormu.map((a, b) => {
              a.item_formu = b + 1;
              return a;
            });

            this.$refs.cod_formu_hc002f.focus();
          }
        );
      } else element.srcElement.checked = false;
    },
    _titleVentanaIndicaciones() {
      var text = "";
      if (this.hc002f._usuar.nit == 892000401 && this.form.tipo_formu == "1") {
        text = "Datos clinicos (OBLIGATORIO)";
      } else if (this.form.tipo_formu == "6") {
        text = "Observaciones";
      } else {
        text = "Indicaciones";
      }
      return text;
    },

    _cargarDatos() {
      this._cargarProfesional();
      this.hc002f._reg_hc.cierre.unserv = this.data_cambio.unserv;
      this.tipo_diagn = this.data_cambio.tipo_diagn;

      this.data_cambio.tabla_diagn.forEach((val, index) => {
        if (val.diagn.trim()) {
          this.hc002f._diagnosticos.push({
            item: parseFloat(index + 1),
            diagn: val.diagn,
          });
        }
      });

      let tabla = this.data_cambio.tabla.filter((a) => a.cod_formu != "");
      tabla.forEach((a, n) => {
        let item = _limpiarFormulacion();

        item.item_formu = n + 1;
        item.tipo_formu = a.tipo_formu;
        item.cod_formu = a.cod_formu;
        item.cant_formu = a.cant_formu;

        let {
          indic_formu: { indi1_formu },
          var_dosis_formu,
        } = item,
          grupo = a.cod_formu.substr(0, 2);

        if (item.tipo_formu == 1 && (grupo == "PO" || grupo == "NP")) {
          indi1_formu.orden_dosis_formu = a.orden_dosis;
          indi1_formu.cant_dosis_formu = a.cant_dosis;
          indi1_formu.unid_dosis_formu = a.unid_dosis;

          let { inmed_formu } = indi1_formu;
          inmed_formu.cada_dosis_formu = a.cada_dosis;
          inmed_formu.cant_frec_dosis_formu = a.cant_frec;
          inmed_formu.unid_frec_dosis_formu = a.unid_frec;

          indi1_formu.via_dosis_formu = a.via_dosis;

          item.indic_formu.indic2_formu = a.indi2_formu;
          // var_dosis_formu;
          var_dosis_formu.cant_dosisf_formu = a.cant_dosif;
          var_dosis_formu.tipo_dosisf_formu = a.tipo_dosif;
          var_dosis_formu.cant_frec_dosisf_formu = a.cant_frec_dosif;
          var_dosis_formu.frec_dosisf_formu = a.frec_dosif;
          var_dosis_formu.via_formu = a.via_formu;
        } else {
          if (item.tipo_formu == "6") {
            let fecha = a.orden_dosis.substr(0, 8) || "";
            item.fecha_incap.ano = fecha.substr(0, 4) || "";
            item.fecha_incap.mes = fecha.substr(2, 2) || "";
            item.fecha_incap.dia = fecha.substr(4, 2) || "";

            item.indic_formu.indic2_formu = a.indi2_formu + a.indi2_2_formu;
          } else item.indic_formu.indic2_formu = a.indi1_formu;
        }

        indi1_formu.dias_trat_formu = a.dias_trat;
        item.instituto_formu = a.instituto_formu;
        item.tipo_incap_formu = a.tipo_incap_formu;
        item.grado_incap_formu = a.grado_incap_formu;
        item.prorroga_formu = a.prorrog_formu;
        item.nro_ord_formu = a.nro_ord_formu;

        /*
         * variables de la tabla interpretacion
         * indi2_2_formu
         */
        item.manejo_formu = a.manejo_formu;
        item.espec_formu = a.espec_formu;
        this.hc002f._tablaFormu.push(item);
      });
    },
    _cargarProfesional() {
      let datos = {
        datosh: datosEnvio(),
        paso: 1,
        codigo: this.data_cambio.prof,
      };

      postData(datos, get_url("APP/SALUD/SER819.DLL"))
        .then((data) => {
          console.log(data);
          this.hc002f._profesional = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    _bajarTablaFormuF9() {
      let tabla = this.hc002f._formulaAnt[this.index_tabla].tabla;
      let { unserv } = this.hc002f._reg_hc.cierre;
      tabla.forEach((e) => {
        let obj = JSON.parse(JSON.stringify(_limpiarFormulacion()));
        obj.item_formu = this.hc002f._tablaFormu.length + 1;
        obj.tipo_formu = "1";
        obj.cod_formu = e.cod_formu.trim();
        obj.cant_formu = e.cant_formu;
        obj.descripcion = this._consultDescripMedicamento(e.cod_formu);

        obj.indic_formu.indi1_formu.orden_dosis_formu = e.orden_dosis;
        obj.indic_formu.indi1_formu.cant_dosis_formu = e.cant_dosis;
        obj.indic_formu.indi1_formu.unid_dosis_formu = e.unid_dosis;

        obj.indic_formu.indi1_formu.inmed_formu.cada_dosis_formu = e.cada_dosis;
        obj.indic_formu.indi1_formu.inmed_formu.cant_frec_dosis_formu =
          e.cant_frec;
        obj.indic_formu.indi1_formu.inmed_formu.unid_frec_dosis_formu =
          e.unid_frec;

        obj.indic_formu.indi1_formu.via_dosis_formu = e.via_dosis;
        obj.indic_formu.indi1_formu.dias_trat_formu = e.dias_trat;

        obj.indic_formu.indic2_formu = e.indi2_formu;

        obj.var_dosis_formu.cant_dosisf_formu = e.cant_dosif;
        obj.var_dosis_formu.tipo_dosisf_formu = e.tipo_dosif;
        obj.var_dosis_formu.cant_frec_dosisf_formu = e.cant_frec_dosif;
        obj.var_dosis_formu.frec_dosisf_formu = e.frec_dosif;
        obj.var_dosis_formu.via_formu = e.via_formu;

        let manejo = null
        if (unserv == 02 || unserv == 08 || unserv == 63 || unserv == 64) {
          manejo = 2
        } else manejo = 1;

        obj.manejo_formu = e.manejo || manejo;

        this.hc002f._tablaFormu.push(obj);
      });
    },
    _consultDescripMedicamento(cod) {
      let retornar = "No se encontro";
      let consulta = this.hc002f._farmacos.find(
        (e) => e.COD.trim() == cod.trim()
      );
      if (consulta) retornar = consulta.DESCRIP.trim();
      return retornar;
    },
    _currentDate() {
      let options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

      let date = new Date().toLocaleDateString("es-CO", options).split("/");
      return `${date[2]}${date[1]}${date[0]}`;
    },
    _timeZone() {
      let options = { hour12: false, hour: "2-digit", minute: "2-digit" };
      return new Date()
        .toLocaleTimeString("es-CO", options)
        .split(":")
        .join("");
    },
    _enablePag(pag) {
      let { pagina } = this;
      Object.keys(pagina).forEach((a) => {
        if (pag == a) pagina[a] = true;
        else pagina[a] = false;
      });
    },
    async traerHistoriaClinica() {
      return new Promise((resolve, reject) => {
        postData(
          { datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage["Usuario"].trim() + "|1|" },
          get_url("APP/HICLIN/GET_HC.DLL")
        )
          .then((data) => {
            this._hcprc2 = data;
            resolve();
          })
          .catch((err) => {
            CON851("", "Error consultando historia", null, "error", "Error");
            console.log(err, "err");
            reject();
          });
      });
    },
  },
});
