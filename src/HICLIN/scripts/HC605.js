// CIERRA HISTORIA CLINICA - DAVID.M - 19-10-2020

const { getDatos } = require("../../frameworks/scripts/getDatos");

var $this = new Vue({
  el: "#HC605",
  data: {
    hcprc: {
      cierre: {
        tabla_diag_egr: [],
      },
    },
    _evoluciones: [],
    _detalles: [],
    _enfermedades: [],
    datosIni: {
      añoEnc_605: "",
      mesEnc_605: "",
      diaEnc_605: "",
      hr_605: "",
      mn_605: "",
      medico_HC605: "",
      descripMedico_HC605: "",
      consultando_HC605: "",
      enfAct_605: "",
    },
    llave_hc: $_REG_HC.llave_hc,
    form: {
      factura_HC605: "",
      fechaIng_HC605: "",
      añoEgr_605: "",
      mesEgr_605: "",
      diaEgr_605: "",
      hrEgr_HC605: "",
      mnEgr_HC605: "",
      estadoSalida_HC605: "",
      descripEstadoSalida_HC605: "",
      diagMuerte_HC605: "",
      descripDiagMuerte_HC605: "",
      observaciones_HC605: "",
      f8Estado: "",
    },
    fecha_act: moment().format("YYYYMMDD"),
    hora_act: moment().format("HH:mm"),
    arrayFechasEvo: [],

    mostrarEnfermedades: false,
    inputEnfer: {
      nombre: "",
      tipo: 0,
      pos: 0,
    },

    folio: "",
  },
  components: {
    ser851: require("../../SALUD/scripts/SER851.vue.js"),
  },
  async created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion("6-5-1 - Cierre historia clinica.");
    $this = this;
    await this.leerArchivos();
  },
  methods: {
    async iniciarHC605() {
      this.llenarDatos();
    },
    async llenarDatos() {
      $this.enf_act_hc = await $this._detalles.find(
        (e) => e["COD-DETHC"] == "1001" && e["LLAVE-HC"] == $_REG_HC.llave_hc
      );
      if ($this.enf_act_hc != undefined) {
        $this.enf_act_hc = $this.enf_act_hc.DETALLE;
        $this.enf_act_hc = $this.enf_act_hc.replace(/\&/g, "\n").trim();
        $this.enf_act_hc = $this.enf_act_hc.replace(/\�/g, "Ñ");
      }
      $this.enf_act_hc != undefined ? ($this.datosIni.enfAct_605 = $this.enf_act_hc.toUpperCase()) : false;

      this.datosIni.añoEnc_605 = this.hcprc.fecha.substring(0, 4);
      this.datosIni.mesEnc_605 = this.hcprc.fecha.substring(4, 6);
      this.datosIni.diaEnc_605 = this.hcprc.fecha.substring(6, 8);

      this.datosIni.hr_605 = this.hcprc.hora.substring(0, 2);
      this.datosIni.mn_605 = this.hcprc.hora.substring(2, 4);

      if (this.busqProf) {
        this.datosIni.medico_HC605 = $this.busqProf.IDENTIFICACION;
        this.datosIni.descripMedico_HC605 = $this.busqProf.NOMBRE.replace(/\�/g, "Ñ");
      } else {
        this.datosIni.medico_HC605 = "*****";
        this.datosIni.descripMedico_HC605 = "**************";
      }

      if ($this.busqUnserv != undefined) {
        $this._unservDescrip = $this.busqUnserv["DESCRIP"];
        $this._unservCod = $this.busqUnserv["COD"];
        this.datosIni.consultando_HC605 = $this.busqUnserv.DESCRIP.trim();
      }

      this.form.añoEgr_605 = $this.hcprc.egreso.substring(0, 4);
      this.form.mesEgr_605 = $this.hcprc.egreso.substring(4, 6);
      this.form.diaEgr_605 = $this.hcprc.egreso.substring(6, 8);

      aux = "";
      switch ($this.hcprc.rips.estado_sal) {
        case "1":
          aux = "1 - VIVO";
          break;
        case "2":
          aux = "2 - MUERTO";
          break;
        case "3":
          aux = "3 - REMITIDO";
          break;
      }
      this.form.estadoSalida_HC605 = aux;
      this.form.descripEstadoSalida_HC605 = $this.hcprc.rips.remitido;

      this.form.diagMuerte_HC605 = $this.hcprc.cierre.diag_muer.trim();
      this.form.descripDiagMuerte_HC605 = this.hcprc.cierre.descrip_diag_muer;

      this.folio = $_REG_HC.llave_hc.substr(15, 2) + $_REG_HC.llave_hc.substr(17, 6);

      if ($this.hcprc.cierre.prefijo.trim() == "") {
        $this.descrip_num = "   ";
      } else {
        await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER808.DLL"))
          .then((data) => {
            this._numer = data.NUMERACION;
            this._numer.pop();
          })
          .catch((err) => {
            console.log(err, "err");
            loader("hide");
            _regresar_menuhis();
          });
      }

      if (this._numer) {
        this.busqNum = await this._numer.find((e) => e.COD == this.hcprc.cierre.prefijo + this.hcprc.cierre.nro_fact);
      }

      if (this.busqNum == undefined) {
        this.busqNum = [];
        this.busqNum.FECHA_ING = "        ";
        this.busqNum.HORA_ING = "    ";
      }

      this.form.factura_HC605 = this.hcprc.cierre.prefijo + this.hcprc.cierre.nro_fact;
      this.form.fechaIng_HC605 =
        this.busqNum.FECHA_ING +
        "  " +
        this.busqNum.HORA_ING.substring(0, 2) +
        ":" +
        this.busqNum.HORA_ING.substring(2, 4);

      this.form.estadoHistoria_HC605 = this.hcprc.cierre.estado;
      this.form.observaciones_HC605 = this.hcprc.observ_egres.replace(/\&/g, "\n").trim();

      loader("hide");
      this.datoFecha();
    },
    datoFecha() {
      $this.hcprc.egreso.substring(4, 6) == "00" || $this.hcprc.egreso.substring(4, 6).trim() == ""
        ? (($this.form.añoEgr_605 = this.fecha_act.substring(0, 4)),
          ($this.form.mesEgr_605 = this.fecha_act.substring(4, 6)),
          ($this.form.diaEgr_605 = this.fecha_act.substring(6, 8)))
        : false;

      $this.validarFechaEgreso_HC605("1");
    },
    validarFechaEgreso_HC605(orden) {
      setTimeout(function () {
        validarInputs(
          {
            form: "#fechaEgr_605",
            orden: orden,
          },
          () => {
            _regresar_menuhis();
          },
          () => {
            $this.form.diaEgr_605 = cerosIzq($this.form.diaEgr_605, 2);
            $this.form.mesEgr_605 = cerosIzq($this.form.mesEgr_605, 2);
            $this.fechaEgr = $this.form.añoEgr_605 + $this.form.mesEgr_605 + $this.form.diaEgr_605;
            var diaE = parseFloat($this.form.diaEgr_605);
            var mesE = parseFloat($this.form.mesEgr_605);
            var añoE = parseFloat($this.form.añoEgr_605);

            // comparar con fechas de evoluciones
            if ($this._evoluciones.length > 0) {
              for (var i in $this._evoluciones) {
                $this.arrayFechasEvo.push($this._evoluciones[i].FECHA_EVO);
              }
              $this.fechaMayorEvo = Math.max.apply(null, $this.arrayFechasEvo);
            } else {
              $this.fechaMayorEvo = 0;
            }

            if (añoE == 0) {
              $this.form.diaEgr_605 = 0;
              $this.form.mesEgr_605 = 0;
              CON851("", "03", null, "error", "Error");
              $this.validarFechaEgreso_HC605("1");
            } else {
              if (añoE < 2006) {
                console.log("añoE", añoE);
                CON851("37", "37", null, "error", "error");
                $this.validarFechaEgreso_HC605("1");
              } else if (mesE < 01 || mesE > 12) {
                console.log(mesE, "mesE 1");
                CON851("37", "37", null, "error", "error");
                $this.validarFechaEgreso_HC605("2");
              } else if (diaE < 01 || diaE > 31 || parseFloat($this.fechaEgr) > $this.fecha_act) {
                console.log(diaE, "diaE 1");
                CON851("37", "37", null, "error", "error");
                $this.validarFechaEgreso_HC605("3");
              } else if (parseFloat($this.fechaEgr) < parseFloat($this.busqNum.FECHA_ING)) {
                CON851("7D", "7D", null, "error", "error");
                $this.validarFechaEgreso_HC605("1");
              } else if (parseFloat($this.fechaEgr) < parseFloat($this.hcprc.fecha)) {
                console.log(diaE, "diaE 2");
                CON851("37", "37", null, "error", "error");
                $this.validarFechaEgreso_HC605("1");
              } else {
                $this.hcprc.egreso = $this.fechaEgr;
                $this.datoHora();
              }
            }
          }
        );
      }, 100);
    },
    datoHora() {
      $this.form.hrEgr_HC605 = $this.hora_act.substring(0, 2);
      $this.form.mnEgr_HC605 = $this.hora_act.substring(3, 5);
      validarInputs(
        {
          form: "#hrEgr_605",
          orden: "1",
        },
        () => {
          $this.validarFechaEgreso_HC605("1");
        },
        () => {
          $this.form.hrEgr_HC605 = cerosIzq($this.form.hrEgr_HC605, 2);
          var hr = parseFloat($this.form.hrEgr_HC605);
          if (hr < 00 || hr > 23) {
            CON851("9Q", "9Q", null, "error", "error");
            $this.datoHora();
          } else {
            $this.datoMinutos();
          }
        }
      );
    },
    datoMinutos() {
      validarInputs(
        {
          form: "#mnEgr_605",
          orden: "1",
        },
        () => {
          $this.datoHora();
        },
        () => {
          $this.form.mnEgr_HC605 = cerosIzq($this.form.mnEgr_HC605, 2);
          var mn = parseFloat($this.form.mnEgr_HC605);
          $this.horaEgr = $this.form.hrEgr_HC605.toString() + $this.form.mnEgr_HC605.toString();
          if (mn < 00 || mn > 59) {
            CON851("9Q", "9Q", null, "error", "error");
            $this.datoMinutos();
          } else if ($this.fechaEgr == $this.busqNum.FECHA_ING && $this.horaEgr < parseFloat($this.busqNum.HORA_ING)) {
            CON851("7D", "7D", null, "error", "error");
            $this.datoHora();
          } else if (
            parseFloat($this.fechaEgr) <= parseFloat($this.hcprc.fecha) &&
            parseFloat($this.horaEgr) < parseFloat($this.hcprc.hora)
          ) {
            CON851("37", "37", null, "error", "error");
            $this.datoHora();
          } else {
            $this.hcprc.hora_egres = $this.horaEgr;
            $this.datoSalida();
          }
        }
      );
    },
    datoSalida() {
      POPUP(
        {
          array: _tipoJsonHc("salida"),
          titulo: "ESTADO SALIDA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: $this.form.estadoSalida_HC605,
          callback_f: () => {
            $this.datoMinutos();
          },
        },
        (data) => {
          $this.form.estadoSalida_HC605 = data.COD + " - " + data.DESCRIP;
          switch ($this.form.estadoSalida_HC605.substring(0, 1)) {
            case "1":
              $this.iniciarDiagnostico();
              $this.hcprc.rips.estado_sal = $this.form.estadoSalida_HC605.substring(0, 1);
              $this.form.descripEstadoSalida_HC605 = "";
              $this.hcprc.rips.remitido = "";
              $this.hcprc.cierre.diag_muer = "";
              $this.form.diagMuerte_HC605 = "";
              $this.form.descripDiagMuerte_HC605 = "";
              break;
            case "2":
              $this.form.descripEstadoSalida_HC605 = "";
              $this.hcprc.rips.remitido = "";
              $this.datoMuerte();
              $this.hcprc.rips.estado_sal = $this.form.estadoSalida_HC605.substring(0, 1);
              break;
            case "3":
              $this.form.diagMuerte_HC605 = "";
              $this.form.descripDiagMuerte_HC605 = "";
              $this.datoRemitido();
              $this.hcprc.rips.estado_sal = $this.form.estadoSalida_HC605.substring(0, 1);
              break;
            default:
              $this.datoMinutos();
              break;
          }
        }
      );
    },
    datoRemitido() {
      validarInputs(
        {
          form: "#descripEstadoSalida_605",
          orden: "1",
        },
        () => {
          $this.datoSalida();
        },
        () => {
          var remitido = $this.form.descripEstadoSalida_HC605;
          if (remitido.trim() == "") {
            CON851("02", "02", null, "error", "error");
            $this.datoRemitido();
          } else {
            $this.hcprc.rips.remitido = remitido;
            $this.iniciarDiagnostico();
          }
        }
      );
    },
    datoMuerte() {
      validarInputs(
        {
          form: "#diagMuerte_605",
        },
        () => {
          this.form.diagMuerte_HC605 = "";
          this.form.descripDiagMuerte_HC605 = "";
          this.datoSalida();
        },
        async () => {
          let muerte = this.form.diagMuerte_HC605.trim();
          this.buscarEnfermedad(muerte)
            .then((data) => {
              this.hcprc.cierre.diag_muer = muerte.trim();
              this.form.diagMuerte_HC605 = data.COD_ENF;
              this.form.descripDiagMuerte_HC605 = data.NOMBRE_ENF;
              this.iniciarDiagnostico();
            })
            .catch((err) => {
              console.error(err);
              this.datoMuerte();
            });
        }
      );
    },

    buscarEnfermedad(codigo) {
      return new Promise(async (resolve, reject) => {
        let datos_envio = {
          datosh: datosEnvio(),
          codigo,
          paso: "1",
        };

        try {
          loader("show");
          let consulta = await getDatos._enfermedades(datos_envio);
          loader("hide");
          if (consulta.NOMBRE_ENF == "No se encontro diagnostico" || consulta.COD_ENF.trim() == "") {
            CON851("01", "01", null, "error", "Error");
            reject("error");
          } else resolve(consulta);
        } catch (err) {
          loader("hide");
          console.error(err);
          CON851("", "Error consultando datos", null, "error", "Error");
          reject("error");
        }
      });
    },

    async iniciarDiagnostico() {
      console.log("llega a iniciarDiag");
      if ($this.hcprc.cierre.tabla_diag_egr[0].diag_egr.trim() == "") {
        if ($this._evoluciones.length > 0) {
          // MUEVE LOS DIAGNOSTICOS DE LA ULTIMA EVOLUCION A LOS DIAGNOSTICOS DE EGRESO
          $this.ultEvo = await $this._evoluciones.find((e) => e.FECHA_EVO == $this.fechaMayorEvo);

          if ($this.ultEvo != undefined) {
            await postData(
              {
                datosh:
                  datosEnvio() +
                  $this.ultEvo.ID_EVO +
                  $this.ultEvo.FOLIO_EVO +
                  "|" +
                  $this.ultEvo.OPER_ELAB_EVO +
                  "|" +
                  $this.ultEvo.MEDICO_EVO +
                  "|" +
                  $this.ultEvo.FECHA_EVO +
                  "|" +
                  $this.ultEvo.HORA_EVO +
                  "|" +
                  "CONS" +
                  "|",
              },
              get_url("app/HICLIN/HC002.DLL")
            )
              .then(async (data) => {
                $this._evolucion = data.EVOLUCION;
                for (var i in $this._evolucion[0].TABLA_DIAGNOSTICOS) {
                  Vue.set(this.hcprc.cierre.tabla_diag_egr[i], "diag_egr", $this._evolucion[0].TABLA_DIAGNOSTICOS[i]);
                }
                $this.SW_FIN = 9;
              })
              .catch((err) => {
                $this.banderaSalir = true;
                _regresar_menuhis();
              });
          }
        } else {
          // MUEVE LOS DIAGNOSTICOS DE APERTURA A LOS DIAGNOSTICOS DE EGRESO (AL NO TENER EVOLUCIONES
          for (var i in $this.hcprc.rips.tabla_diag) {
            Vue.set(this.hcprc.cierre.tabla_diag_egr[i], "diag_egr", $this.hcprc.rips.tabla_diag[i].diagn);
            Vue.set(this.hcprc.cierre.tabla_diag_egr[i], "descrip", $this.hcprc.rips.tabla_diag[i].descrip);
          }
          $this.SW_FIN = 0;
        }
      } else {
        $this.ultEvo = await $this._evoluciones.find((e) => e.FECHA_EVO == $this.fechaMayorEvo);
      }
      if ($this.banderaSalir != true) {
        this.aceptarDiagn(0);
      }
    },

    aceptarDiagn(pos) {
      pos = pos || 0;
      validarInputs(
        {
          form: `#diagSalida${pos}`,
          orden: "1",
        },
        () => {
          if (pos == 0) this.datoSalida();
          else this.aceptarDiagn(pos - 1);
        },
        () => {
          var diag = this.hcprc.cierre.tabla_diag_egr[pos].diag_egr;
          if (diag.trim() == "") {
            this.hcprc.cierre.tabla_diag_egr = this.hcprc.cierre.tabla_diag_egr.filter((el) => el.diag_egr.trim());

            while (this.hcprc.cierre.tabla_diag_egr.length < 10) {
              this.hcprc.cierre.tabla_diag_egr.push({ diag_egr: "" });
            }
            this.datoObservacion();
          } else {
            this.buscarEnfermedad(diag)
              .then((data) => {
                Vue.set(this.hcprc.cierre.tabla_diag_egr[pos], "diag_egr", diag);
                Vue.set(this.hcprc.cierre.tabla_diag_egr[pos], "descrip", data.NOMBRE_ENF);
                if (pos == 4) this.datoObservacion();
                else this.aceptarDiagn(pos + 1);
              })
              .catch((err) => {
                console.error(err);
                this.aceptarDiagn(pos);
              });
          }
        }
      );
    },

    leerDiagnPre() {
      // PENDIENTE (SIN USO)
    },
    datoObservacion() {
      console.log("llega a datoObserv");
      validarInputs(
        {
          form: "#observaciones_605",
          orden: "1",
        },
        () => {
          this.aceptarDiagn(0);
        },
        () => {
          $this.hcprc.observ_egres = $this.form.observaciones_HC605.replace(/(\r\n|\n|\r)/gm, "&").trim();
          $this.hcprc.observ_egres = $this.hcprc.observ_egres.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");
          $this.datoCierre();
        }
      );
    },
    datoCierre() {
      $this.hcprc.cierre.estado = "2";
      $this.hcprc.cierre.temporal == "1" ? ($this.hcprc.cierre.temporal = "0") : false;
      $this.confirmar();
    },
    async confirmar() {
      CON851P(
        "01",
        () => {
          $this.datoObservacion();
        },
        async () => {
          localStorage.Usuario == "ADMI" || localStorage.Usuario == "GEBC"
            ? false
            : ($this.hcprc.cierre.oper_cie = localStorage.Usuario);

          if ($this.hcprc.cierre.estado == "2") {
            $this.hcprc.cierre.fecha_ult_cierre = moment().format("YYYYMMDD");
            $this.hcprc.cierre.hora_ult_cierre = moment().format("HHmm");
            $this.hcprc.cierre.oper_ult_cierre = localStorage.Usuario;
            $this.hcprc.cierre.cod_ult_cierre = "G";
          }

          $this.hcprc.paciente = $_REG_HC.id_paciente;
          $this.hcprc.folio_suc = $_REG_HC.llave_hc.substr(15, 2);
          $this.hcprc.folio_nro = $_REG_HC.llave_hc.substr(17, 6);

          var datos = await _getObjetoHc($this.hcprc);
          datos.datosh = datos.datosh + "1|";
          await postData(datos, get_url("APP/HICLIN/SAVE_HC.DLL"))
            .then((data) => {
              toastr.success("Historia cerrada correctamente");
            })
            .catch((err) => {
              toastr.error("Error en guardado");
            });

          // ENCONTRAR REGISTRO DE CAMA
          if ($this.hcprc.cierre.estado == "2") {
            await postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC605-1.DLL"))
              .then((data) => {
                $this._camas = data.CAMAS;
                $this._camas.pop();
              })
              .catch((err) => {
                console.log(err, "err");
                _regresar_menuhis();
              });

            // LIBERAR CAMA
            var busqCamas = $this._camas.find((e) => e.PACI_CAM.trim() == $this.hcprc.llave.substring(0, 15).trim());

            if (busqCamas) {
              await postData(
                {
                  datosh:
                    datosEnvio() +
                    busqCamas.COD_CAM +
                    "|HC605|" +
                    this.hcprc.llave.substring(0, 15).trim() +
                    "|" +
                    localStorage.Usuario +
                    "|",
                },
                get_url("APP/HICLIN/LIBERAR-CAMA-HC.DLL")
              )
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {
                  console.log(error, "error liberando cama");
                });
            }

            // if (busqCamas != undefined) {
            //   await postData({ datosh: datosEnvio() + localStorage.Usuario + '|' + $this.hcprc.llave.substring(0, 15).trim() + '|' + busqCamas.COD_CAM }, get_url("APP/HICLIN/LIBERAR-CAMA-HC.DLL"))
            //     .catch((err) => {
            //       console.log(err, 'err')
            //       _regresar_menuhis();
            //     });

            //   // GRABA BITACORA CAMAS
            //   await postData({ datosh: datosEnvio() + 'R' + '|' + busqCamas.COD_CAM + '|' + 'HC605' }, get_url("APP/HICLIN/LIBERAR-CAMA-HC.DLL"))
            //     .catch((err) => {
            //       console.log(err, 'err')
            //       _regresar_menuhis();
            //     });
            // }
          }
          _regresar_menuhis();
        }
      );
    },
    _confirmarSalir() {
      CON851P(
        "03",
        () => {
          this.aceptarDiagn(0);
        },
        () => {
          _regresar_menuhis();
        }
      );
    },

    escVentanaEnfermedades() {
      this.mostrarEnfermedades = false;
      switch (this.inputEnfer.tipo) {
        case 1:
          this.datoMuerte();
          break;
        case 2:
          this.aceptarDiagn(this.inputEnfer.pos);
          break;
      }
      this.inputEnfer = {
        nombre: "",
        tipo: 0,
        pos: 0,
      };
    },
    ventanaEnfermedades(pos, tipo) {
      this.inputEnfer.pos = pos || 0;
      this.inputEnfer.tipo = tipo;

      switch (this.inputEnfer.tipo) {
        case 1:
          this.inputEnfer.nombre = ".diagMuerte_HC605";
          break;
        case 2:
          this.inputEnfer.nombre = `.diag_egr${pos}`;
          break;
      }
      _fin_validar_form();

      this.mostrarEnfermedades = true;
    },
    successVentanaEnfermedades(data) {
      this.mostrarEnfermedades = false;

      switch (this.inputEnfer.tipo) {
        case 1:
          Vue.set(this.form, "diagMuerte_HC605", data.cod);
          Vue.set(this.form, "descripDiagMuerte_HC605", data.descrip);
          this.datoMuerte();
          break;
        case 2:
          Vue.set(this.hcprc.cierre.tabla_diag_egr[this.inputEnfer.pos], "diag_egr", data.cod);
          Vue.set(this.hcprc.cierre.tabla_diag_egr[this.inputEnfer.pos], "descrip", data.descrip);
          this.aceptarDiagn(this.inputEnfer.pos);
          break;
      }

      setTimeout(async () => {
        _enterInput(this.inputEnfer.nombre);
        this.inputEnfer = {
          nombre: "",
          tipo: 0,
          pos: 0,
        };
      }, 100);
    },

    async leerArchivos() {
      try {
        loader("show");

        this.hcprc = await getDatos._historia({
          datosh: `${datosEnvio()}${this.llave_hc}|${localStorage["Usuario"].trim()}|1|`,
        });
        await this.validarHistoria();

        await this.consultarProf({
          datosh: datosEnvio(),
          paso: "1",
          codigo: cerosIzq(this.hcprc.med.trim(), 10),
        });

        await this.consultarUnserv({ datosh: datosEnvio(), paso: 1, codigo: this.hcprc.cierre.unserv });

        this._detalles = await getDatos._detalles({ datosh: datosEnvio() + $_REG_HC.llave_hc + "|**|||" });
        this._evoluciones = await getDatos._evolucionesHC705B({
          datosh: datosEnvio() + `${$_REG_PACI["COD"]}|${$_REG_HC["suc_folio_hc"] + $_REG_HC["nro_folio_hc"]}|1|`,
        });

        this.iniciarHC605();
      } catch (err) {
        loader("hide");
        console.error(err);
        if (err != "omitir") CON851("", "Error consultando datos", null, "error", "Error");
        _regresar_menuhis();
      }
    },

    consultarUnserv(datos_envio) {
      return new Promise((resolve, reject) => {
        datos_envio = datos_envio || { datosh: datosEnvio() };
        postData(datos_envio, get_url("APP/SALUD/SER873.DLL"))
          .then((data) => {
            if (!datos_envio.paso) {
              data = data.UNSERV;
              data.pop();
            }
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    consultarProf(datos_envio) {
      return new Promise((resolve, reject) => {
        datos_envio = datos_envio || { datosh: datosEnvio() };
        postData(datos_envio, get_url("APP/SALUD/SER819.DLL"))
          .then((data) => {
            if (!datos_envio.paso) {
              data = data.ARCHPROF;
              data.pop();
            }
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    validarHistoria() {
      return new Promise((resolve, reject) => {
        if (this.hcprc.cierre.estado == "2") {
          CON851("9Y", "9Y", null, "error", "error");
          reject("omitir");
        } else resolve();
      });
    },
  },
});
