// CREACION - SANTIAGO.F - OCTUBRE 22/2020

var $this;
var $_HC003A = [];
var retrocedio = 1;

var codigo_cantidad_medi;
var codigo_via;
var codigo_tiempo;

var fecha_ini_glob;
var fecha_fin_glob;

(datos = {
  encabezado: {
    nombre: "",
    nit: "",
    titulo: "",
  },

  paciente: {
    nombre: "",
    tipoId: "",
    id: "",
    edad: "",
    sexo: "",
    e_civil: "",
    direccion: "",
    entidad: "",
    ocupacion: "",
    u_servicio: "",
    fact_paci: "",
  },

  fechas: {
    año1: "",
    mes1: "",
    dia1: "",

    año2: "",
    mes2: "",
    dia2: "",
  },

  tabla_medicamentos: {
    medicamento: [],
    horas: [],
    minutos: [],
    año: [],
    mes: [],
    dia: [],
    cantidad_formu: [],
    cantidad: [],
    medida_cantidad: [],
    tiempo: [],
    via: [],
    dato_tabla: [],
    observaciones: [],
    oper: [],
  },

  firmas: {
    firma: [],
    medico: [],
    reg_medico: [],
    oper: [],
  },

  operador: {
    operador: "",
  },

  medico: {
    firma: "",
    reg: "",
    nombre: "",
    espec: "",
  },
}),
  new Vue({
    el: "#HC003A",
    data: {
      form: {
        descripAtiende_003A: "",
        cargo_003A: "",
        unser_003A: "",
        folio_003A: "",
        itm_003A: "",
        año_003A: "",
        mes_003A: "",
        dia_003A: "",
        hora_003A: "",
        minutos_003A: "",
        medicamentos_003A: "",
        descrip_003A: "",
        cantidadFormu_003A: "",
        cantidad_003A: "",
        medida_003A: "",
        tiempo_003A: "",
        tiempoCada_003A: "",
        vias_003A: "",
        obser_003A: "",
        oper_003A: "",
      },

      modal_observ: false,

      bandera: true,
      banderaEdit: false,
      admin_edit: '',
      novedad: '7',
      consultOper: '',
      ant_cantidad: '',

      tabla_formulado: [],
      hc003a: {
        tablaMedica: [],
        _tablaFormu: [],
        _tablaFormu2: [],
      },

      tabla_medica: {
        item: "",
        año: "",
        mes: "",
        dia: "",
        hora: "",
        cod_medicamento: "",
        medicamento: "",
        cantidadFormu: "",
        cantidad_tabla: "",
        cantidad: "",
        cantidad_Medida: "",
        tiempo: "",
        medida_Tiempo: "",
        vias: "",
        observaciones: "",
      },

      fecha_act: moment().format("YYYYMMDD"),
      dataArray: new Object(),
      data_evo: new Object(),
    },
    async created() {
      await this.cargarArchivos_HC003A();
    },
    methods: {
      _inicializar() {
        _inputControl("disabled");
        _inputControl("reset");
        nombreOpcion("5-2-1 - Administracion de medicamentos");
        $this = this;
        this.restriccion1();
      },

      restriccion1() {
        if (
          $_REG_PACI["TIPO-ID"].trim() == "" ||
          $_HC003A._hcprc.novedad == 7
        ) {
          CON851("3A", "3A", null, "error", "error");
          _regresar_menuhis();
        } else if (localStorage.idOpciondata == "07C1") {
          $("#nombreOpcion").remove();
          nombreOpcion("7-C-1 - Administracion de medicamentos");
          this.ventanaFecha_HC003A();
        } else {
          this.init_HC003A();
        }
      },

      async init_HC003A() {
        this.validarInputs_HC003A();
        this.llenarDatosFecha_HC003A();
        if ($_USUA_GLOBAL[0].NIT == 892000264) this.validarMes_HC003A();
        else if (localStorage.Usuario == 'GBJ1' || localStorage.Usuario == "GEBC") this.validarAño_HC003A();
        else this.validarMinutos_HC003A();
      },

      validarInputs_HC003A() {
        var tipo_medico;
        $this.form.descripAtiende_003A = $_REG_PROF.NOMBRE;

        switch ($_REG_PROF.ATIENDE_PROF) {
          case "1":
            tipo_medico = "MEDICO ESPECIALISTA";
            break;
          case "2":
            tipo_medico = "MEDICO GENERAL";
            break;
          case "3":
            tipo_medico = "ENFERMERA";
            break;
          case "4":
            tipo_medico = "AUX. ENFERMERIA";
            break;
          case "5":
            tipo_medico = "TERAPIAS Y OTROS";
            break;
          case "6":
            tipo_medico = "ENFERMERA GEFE PYP";
            break;
          case "7":
            tipo_medico = "PSICOLOGIA";
            break;
          case "8":
            tipo_medico = "NUTRICIONISTA";
            break;
          case "A":
            tipo_medico = "ODONTOLOGO";
            break;
          case "H":
            tipo_medico = "HIGIENISTA ORAL";
            break;
          case "I":
            tipo_medico = "INSTRUMENTACION";
            break;
          case "O":
            tipo_medico = "OPTOMETRIA";
            break;
          case "T":
            tipo_medico = "TRABAJO SOCIAL";
            break;
        }

        $this.form.cargo_003A = tipo_medico;

        var cod_unser = $_REG_HC.unser_hc;
        const unserv = $_HC003A._unserv.find((e) => e["COD"] == cod_unser);
        $this.form.unser_003A = cod_unser + " - " + unserv.DESCRIP;

        $this.form.folio_003A = $_REG_HC.suc_folio_hc.concat(
          $_REG_HC.nro_folio_hc
        );
      },

      llenarDatosFecha_HC003A() {
        $this = this;

        $this.form.itm_003A = retrocedio;

        $this.form.año_003A = parseInt(moment().format("YYYY"));
        $this.form.mes_003A = parseInt(moment().format("MM"));
        $this.form.dia_003A = parseInt(moment().format("DD"));

        // $this.form.hora_003A = moment().format('HH') + ':' + moment().format('MM');
        $this.form.hora_003A = moment().format("HH");
        $this.form.minutos_003A = moment().format("mm");
      },

      validarMes_HC003A() {
        $this = this;
        validarInputs(
          {
            form: "#mes_HC003A",
            orden: "3",

            event_f5: () => {
              // CON850_P(
              //   (e) => {
              //     if (e.id == "S") {
              //       _regresar_menuhis();
              //     } else {
              //       this.validarMes_HC003A();
              //     }
              //   },
              //   { msj: "03" }
              // );
              CON851P(
                "03",
                () => {
                  this.validarMes_HC003A();
                },
                () => {
                  setTimeout(() => {
                    _regresar_menuhis();
                  }, 300);
                }
              );
            },

            event_f3: () => {
              this.validarMinutos_HC003A();
            },
          },
          () => {
            var mes = $this.form.mes_003A;
            var dia = $this.form.dia_003A;
            if (parseInt(moment().format("MM")) == 1 && mes == 1) {
              if (
                (parseInt(moment().format("MM")) == 1 &&
                  mes == 1 &&
                  parseInt(moment().format("DD")) == 1 &&
                  dia == 1) ||
                localStorage.Usuario == "GEBC" ||
                localStorage.Usuario == "NSZL" ||
                localStorage.Usuario == "LMBA" ||
                $_USUA_GLOBAL[0].NIT == 900450008
              ) {
                this.validarAño_HC003A();
              } else {
                this._retrocederMes_HC003A();
              }
            } else if (localStorage.Usuario == "GBJ1" || localStorage.Usuario == "GEBC") {
              this.validarAño_HC003A();
            } else {
              if (mes < 1 || dia < 1) {
                CON851("37", "37", null, "error", "error");
                this.validarMes_HC003A();
              } else {
                this._retrocederMes_HC003A();
              }
            }
          },
          () => {
            var año = $this.form.año_003A;
            var mes = $this.form.mes_003A;
            if (mes > parseInt(moment().format("MM")) || mes > 12 || mes < 1) {
              CON851("37", "37", null, "error", "error");
              this.validarMes_HC003A();
            } else if (
              $_USUA_GLOBAL[0].NIT == 900450008 ||
              $_USUA_GLOBAL[0].NIT == 800037021
            ) {
              this.validarDia_HC003A();
            } else {
              if (parseInt(moment().format("YYYY")) == año) {
                if (mes > parseInt(moment().format("MM"))) {
                  CON851("37", "37", null, "error", "error");
                  this.validarMes_HC003A();
                } else {
                  this.validarDia_HC003A();
                }
              } else {
                if (año == parseInt(moment().format("YYYY")) - 1) {
                  if (mes == 12) {
                    this.validarDia_HC003A();
                  } else {
                    CON851("37", "37", null, "error", "error");
                    this.validarMes_HC003A();
                  }
                }
              }
            }
          }
        );
      },

      validarAño_HC003A() {
        $this = this;
        validarInputs(
          {
            form: "#año_HC003A",
            orden: "2",

            event_f5: () => {
              // CON850_P(
              //   (e) => {
              //     if (e.id == "S") {
              //       _regresar_menuhis();
              //     } else {
              //       this.validarAño_HC003A();
              //     }
              //   },
              //   { msj: "03" }
              // );
              CON851P(
                "03",
                () => {
                  this.validarAño_HC003A();
                },
                () => {
                  setTimeout(() => {
                    _regresar_menuhis();
                  }, 300);
                }
              );
            },

            event_f3: () => {
              this.validarMinutos_HC003A();
            },
          },
          () => {
            this._retrocederAño_HC003A();
          },
          () => {
            var año = $this.form.año_003A;
            if (
              año == parseInt(moment().format("YYYY")) ||
              año == parseInt(moment().format("YYYY")) - 1
            ) {
              this.validarMes_HC003A();
            } else {
              CON851("37", "37", null, "error", "error");
              this.validarAño_HC003A();
            }
          }
        );
      },

      validarDia_HC003A() {
        $this = this;
        validarInputs(
          {
            form: "#dia_HC003A",
            orden: "4",

            event_f5: () => {
              // CON850_P(
              //   (e) => {
              //     if (e.id == "S") {
              //       _regresar_menuhis();
              //     } else {
              //       this.validarDia_HC003A();
              //     }
              //   },
              //   { msj: "03" }
              // );
              CON851P(
                "03",
                () => {
                  this.validarDia_HC003A();
                },
                () => {
                  setTimeout(() => {
                    _regresar_menuhis();
                  }, 300);
                }
              );
            },

            event_f3: () => {
              this.validarMinutos_HC003A();
            },
          },
          () => {
            var dia = $this.form.dia_003A;
            // puede retroceder cuando el dia actual es 1 pero si se cambia el uno y se elige otro dia aun asi retrocedera ya que el dia actual es 1 asi que se evaluo el dia
            if (
              (parseInt(moment().format("DD")) == 1 && dia == 1) ||
              $_USUA_GLOBAL[0].NIT == 900450008 ||
              $_USUA_GLOBAL[0].NIT == 800037021 ||
              $_USUA_GLOBAL[0].NIT == 892000264
            ) {
              if (
                (parseInt(moment().format("DD")) == 1 && dia == 1) ||
                $_USUA_GLOBAL[0].NIT == 900450008 ||
                $_USUA_GLOBAL[0].NIT == 800037021 ||
                $_USUA_GLOBAL[0].NIT == 892000264 ||
                localStorage.Usuario == "GEBC" ||
                localStorage.Usuario == "NSZL" ||
                localStorage.Usuario == "LMBA"
              ) {
                this.validarMes_HC003A();
              } else {
                this._retrocederDia_HC003A();
              }
            } else if (localStorage.Usuario == "GBJ1" || localStorage.Usuario == "GEBC") {
              this.validarMes_HC003A();
            } else {
              if (dia < 1) {
                CON851("37", "37", null, "error", "error");
                this.validarDia_HC003A();
              } else {
                this._retrocederDia_HC003A();
              }
            }
          },
          () => {
            var dia = $this.form.dia_003A;
            var mes = $this.form.mes_003A;
            var año = $this.form.año_003A;

            // si la fecha es mayor a la actual error
            if (
              dia > 31 ||
              (año == parseInt(moment().format("YYYY")) &&
                mes == parseInt(moment().format("MM")) &&
                dia > parseInt(moment().format("DD"))) ||
              dia < 1
            ) {
              CON851("37", "37", null, "error", "error");
              this.validarDia_HC003A();
            } else if (
              mes > parseInt(moment().format("MM")) ||
              mes > 12 ||
              mes < 1
            ) {
              CON851("37", "37", null, "error", "error");
              this.validarDia_HC003A();
            } else if (año > parseInt(moment().format("YYYY"))) {
              CON851("37", "37", null, "error", "error");
              this.validarDia_HC003A();
            } else if (
              $_USUA_GLOBAL[0].NIT == 900450008 ||
              $_USUA_GLOBAL[0].NIT == 800037021 ||
              $_USUA_GLOBAL[0].NIT == 892000264
            ) {
              this.validarHora_HC003A();
            } else {
              // si es el mismo año y el mes anterior y el dia es menor a 30 excepto febrero que el dia maximo debe tener 28
              if (año == parseInt(moment().format("YYYY"))) {
                // se deja hacer registros a partir del 1 de enero del año actual jeimi
                this.validarHora_HC003A();

                // if (mes == (parseInt(moment().format('MM')) - 1)) {
                //   if (mes == 2) {
                //     if (dia < 28) {
                //       CON851('37', '37', null, 'error', 'error');
                //       this.validarDia_HC003A();
                //     }
                //   } else {
                //     if (dia < 30) {
                //       CON851('37', '37', null, 'error', 'error');
                //       this.validarDia_HC003A();
                //     }
                //   }
                // } else {
                //   if (localStorage.Usuario == "GEBC" || localStorage.Usuario == "NSZL" || localStorage.Usuario == "LMBA") {
                //     this.validarMinutos_HC003A();
                //   } else if (año == parseInt(moment().format('YYYY')) && mes == parseInt(moment().format('MM')) && dia < (parseInt(moment().format('DD')) - 1)) {
                //     CON851('37', '37', null, 'error', 'error');
                //     this.validarDia_HC003A();
                //   } else {
                //     this.validarMinutos_HC003A();
                //   }
                // }
              } else {
                if (año == parseInt(moment().format("YYYY")) - 1) {
                  // si es el año anterior no puede ser menor a el 31 de diciembre
                  if (mes == 12 && dia == 31) {
                    if (
                      localStorage.Usuario == "GEBC" ||
                      localStorage.Usuario == "NSZL" ||
                      localStorage.Usuario == "LMBA"
                    ) {
                      this.validarHora_HC003A();
                    } else if (
                      año == parseInt(moment().format("YYYY")) &&
                      mes == parseInt(moment().format("MM")) &&
                      dia < parseInt(moment().format("DD")) - 1
                    ) {
                      CON851("37", "37", null, "error", "error");
                      this.validarDia_HC003A();
                    } else {
                      this.validarHora_HC003A();
                    }
                  } else {
                    CON851("37", "37", null, "error", "error");
                    this.validarDia_HC003A();
                  }
                } else {
                  // si no es el año actual ni el anterior error
                  CON851("37", "37", null, "error", "error");
                  this.validarDia_HC003A();
                }
              }
            }
          }
        );
      },

      validarHora_HC003A() {
        $this = this;
        validarInputs(
          {
            form: "#hora_HC003A",
            orden: "5",

            event_f3: () => {
              this.validarMinutos_HC003A();
            },
          },
          () => {
            this.validarDia_HC003A();
          },
          () => {
            $this.form.hora_003A = cerosIzq($this.form.hora_003A, 2);
            var horas = $this.form.hora_003A;
            if (horas < 0 || horas > 24) {
              CON851("9Q", "9Q", null, "error", "error");
              this.validarHora_HC003A();
            } else {
              this.validarMinutos_HC003A();
            }
          }
        );
      },

      validarMinutos_HC003A() {
        $this = this;
        validarInputs(
          {
            form: "#minutos_HC003A",
            orden: "5",

            event_f3: () => {
              CON851P(
                "01",
                () => {
                  this.validarMinutos_HC003A();
                },
                () => {
                  setTimeout(() => {
                    this.guardado_HC003A();
                  }, 300);
                }
              );
            },
          },
          () => {
            this.validarHora_HC003A();
          },
          () => {
            $this.form.minutos_003A = cerosIzq($this.form.minutos_003A, 2);
            var dia = $this.form.dia_003A;
            var hora = $this.form.hora_003A + ":" + $this.form.minutos_003A;
            var fecha_w = `${$this.form.año_003A}${cerosIzq($this.form.mes_003A, 2)}${cerosIzq($this.form.dia_003A, 2)}`;

            if (parseInt(fecha_w) < parseInt($_REG_HC.fecha_hc)) {
              CON851("03", "03", null, "error", "error");
              this.validarMinutos_HC003A();
            } else if (hora.substring(3, 5) < 0 || hora.substring(3, 5) > 60) {
              CON851("9Q", "9Q", null, "error", "error");
              this.validarMinutos_HC003A();
            } else if (
              dia == parseInt(moment().format("DD")) &&
              (hora.substring(0, 2) > parseInt(moment().format("HH")) ||
                (hora.substring(0, 2) == parseInt(moment().format("HH")) && hora.substring(3, 5) > parseInt(moment().format("mm"))))
            ) {
              CON851("9Q", "9Q", null, "error", "error");
              this.validarMinutos_HC003A();
            } else if ($this.form.itm_003A > 1) {
              var posi = $this.form.itm_003A - 2;
              if ($this.form.año_003A < $this.hc003a.tablaMedica[posi].año) {
                CON851("03", "03", null, "error", "error");
                this.validarMinutos_HC003A();
                // this.reset_HC003A();
                // cada que se agrega un medicamento este no debe tener la fecha y hora menor que el anterior
              } else if (
                $this.form.mes_003A < $this.hc003a.tablaMedica[posi].mes
              ) {
                CON851("03", "03", null, "error", "error");
                this.validarMinutos_HC003A();
                // this.reset_HC003A();
                // cada que se agrega un medicamento este no debe tener la fecha y hora menor que el anterior
              } else if (
                $this.form.dia_003A < $this.hc003a.tablaMedica[posi].dia
              ) {
                CON851("03", "03", null, "error", "error");
                this.validarMinutos_HC003A();
                // this.reset_HC003A();
                // cada que se agrega un medicamento este no debe tener la fecha y hora menor que el anterior
              } else if (
                hora.substring(0, 2) < $this.hc003a.tablaMedica[posi].hora.substring(0, 2) ||
                (hora.substring(0, 2) == $this.hc003a.tablaMedica[posi].hora.substring(0, 2) && hora.substring(3, 5) < $this.hc003a.tablaMedica[posi].hora.substring(3, 5))
              ) {
                CON851("03", "03", null, "error", "error");
                this.validarMinutos_HC003A();
                // this.reset_HC003A();
                // cada que se agrega un medicamento este no debe tener la fecha y hora menor que el anterior
              } else {
                this.validarOper_HC003A();
              }
            } else {
              this.validarOper_HC003A();
            }
          }
        );
      },

      async validarOper_HC003A() {
        if (localStorage.Usuario == "GEBC" && $this.bandera) {
          $this = this;
          validarInputs(
            {
              form: "#validarOper_003A",
              orden: "1",

              event_f3: () => {
                this.validarMinutos_HC003A();
              },
            },
            () => {
              this.validarMinutos_HC003A();
            },
            () => {
              this.form.oper_003A = this.form.oper_003A.toUpperCase();
              var oper = this.form.oper_003A;
              if (oper == "GEBC") {
                this.cargarTablaFormu_HC003A_3();
              } else if (oper.trim() == "") {
                // continue
                toastr.warning("Registro no encontrado");
                this.validarMedicamento_HC003A();
              } else {
                this.consultOper = $_HC003A.operadores.find((a) => a.CODIGO == oper);
                if (this.consultOper != undefined) {
                  // continue
                  this.cargarTablaFormu_HC003A_3();
                } else {
                  CON851("01", "01", null, "error", "error");
                  this.validarOper_HC003A();
                }
              }
            }
          );
        } else {
          // continue
          this.validarMedicamento_HC003A();
        }
      },

      async cargarTablaFormu_HC003A_3() {
        loader("show");
        var llave_w =
          $_REG_PACI.COD + $_REG_HC.suc_folio_hc.concat($_REG_HC.nro_folio_hc);
        this.admin_edit = this.form.oper_003A;
        var fecha_ult = moment().format("YYMMDD");
        var paso_w = 1;
        this.form.mes_003A = cerosIzq(this.form.mes_003A, 2);
        this.form.dia_003A = cerosIzq(this.form.dia_003A, 2);
        var llave_evo_w = `${llave_w}${this.form.año_003A}${this.form.mes_003A}${this.form.dia_003A}${this.form.hora_003A}${this.form.minutos_003A}${this.admin_edit}`;

        await postData(
          {
            datosh:
              datosEnvio() +
              llave_w +
              "|" +
              "|" +
              "|" +
              this.admin_edit +
              "|" +
              fecha_ult +
              "|" +
              paso_w +
              "|" +
              llave_evo_w +
              "|",
          },
          get_url("APP/HICLIN/HC003A-4.DLL")
        )
          .then(async (data) => {
            $this.hc003a._tablaFormu2 = data.TABLA_FORMU2;
            $this.hc003a._tablaFormu2.pop();

            if ($this.hc003a._tablaFormu2.length == 0) {
              this.novedad = '7';
              loader("hide");
              toastr.warning("Registro no encontrado");
              this.validarMedicamento_HC003A();
            } else {
              this.novedad = '8';
              loader("hide");
              this.bandera = false;
              toastr.success("Actualizar registro");
              this.llenarTablaFormu_HC003A_3();
            }
          })
          .catch((err) => {
            console.log(err, "err");
            loader("hide");
            _regresar_menuhis();
          });
      },

      llenarTablaFormu_HC003A_3() {
        for (var i in $this.hc003a._tablaFormu2) {
          var temp;
          switch ($this.hc003a._tablaFormu2[i].UNID_FREC_J) {
            case 'MIN.':
              temp = '1';
              break;
            case 'HORA':
              temp = '2';
              break;
            case 'HORAS':
              temp = '2';
              break;
            case 'DIA':
              temp = '3';
              break;
            case 'DIAS':
              temp = '3';
              break;
            case 'MES':
              temp = '4';
              break;
            case 'MESES':
              temp = '4';
              break;
            case 'AÑO':
              temp = '5';
              break;
            case 'AÑOS':
              temp = '5';
              break;
            case 'INMEDIATO':
              temp = '6';
              break;
            case 'PARA MEZCLA':
              temp = '7';
              break;
            case 'TITULABLE':
              temp = '8';
              break;
            case 'UNA VEZ':
              temp = '9';
              break;
          }

          var conta = parseInt(i) + 1;
          var temp2 = $this.hc003a._tablaFormu2[i].OBSERVACION_J.replace(/(?:\&)/g, "\n");
          this.hc003a.tablaMedica.push({
            item: conta,
            año: $this.hc003a._tablaFormu2[i].FECHA_J.substring(0, 4),
            mes: $this.hc003a._tablaFormu2[i].FECHA_J.substring(4, 6),
            dia: $this.hc003a._tablaFormu2[i].FECHA_J.substring(6, 8),
            hora: $this.hc003a._tablaFormu2[i].HORA_J.substring(0, 2) + ":" + $this.hc003a._tablaFormu2[i].HORA_J.substring(2, 4),

            cod_Medicamento: $this.hc003a._tablaFormu2[i].COD_DROGA_J,

            medicamento: $this.hc003a._tablaFormu2[i].NOMBRE_DROGA_J,
            cantidadFormu: $this.hc003a._tablaFormu2[i].CANT_FORMU_J,
            cantidad_tabla: $this.hc003a._tablaFormu2[i].CANTIDAD_DOSIS_J + "   " + $this.hc003a._tablaFormu2[i].UNID_DOSIS_J,

            cantidad: $this.hc003a._tablaFormu2[i].CANTIDAD_DOSIS_J,
            codigo_cantidad_medida: $this.hc003a._tablaFormu2[i].TIPO_DOSIF_J,
            cantidad_Medida: $this.hc003a._tablaFormu2[i].UNID_DOSIS_J,
            tiempo: $this.hc003a._tablaFormu2[i].CANT_FREC_J,
            codigo_tiempo: temp,
            medida_Tiempo: $this.hc003a._tablaFormu2[i].UNID_FREC_J,
            codigo_via: $this.hc003a._tablaFormu2[i].VIA_J,
            vias: $this.hc003a._tablaFormu2[i].VIA_DOSIS_J,
            observaciones: temp2,
          });
        }
        retrocedio = $this.hc003a.tablaMedica.length + 1;
        $this.form.itm_003A = retrocedio;

        this.validarMedicamento_HC003A();
      },

      validarMedicamento_HC003A() {
        _inputControl("disabled");
        $this = this;
        validarInputs(
          {
            form: "#medicamentos_HC003A",
            orden: "1",

            event_f3: () => {
              this.validarMinutos_HC003A();
            },
          },
          () => {
            this.validarMinutos_HC003A();
          },
          () => {
            let codigo = $this.form.medicamentos_003A;
            let consulta1 = $this.tabla_formulado.find(
              (a) => a.cod_formu == codigo
            );
            let consulta2 = $_HC003A._farmacia.find((a) => a.COD == codigo);
            let consulta3 = $this.hc003a.tablaMedica.find(
              (a) => a.cod_Medicamento == codigo
            );

            if (!consulta1 || !consulta2) {
              $this.form.medicamentos_003A = "";
              $this.form.descrip_003A = "";

              CON851("01", "01", null, "error", "error");
              this.validarMedicamento_HC003A();
            } else if (consulta3 && !$this.banderaEdit) {
              CON851("05", "05", null, "error", "error");
              this.validarMedicamento_HC003A();
            } else {
              if (consulta2.ESTADO == "*") {
                CON851("", "Codigo deshabilitado", null, "error", "error");
                this.validarMedicamento_HC003A();
              } else {
                $this.form.descrip_003A = consulta2.DESCRIP;
                this.ant_cantidad = parseFloat($this.form.cantidadFormu_003A) || 0;
                $this.validarCantidadFormu();
              }
            }
          }
        );
      },

      validarCantidadFormu() {
        _inputControl("disabled");
        $this = this;
        validarInputs(
          {
            form: "#cantidadFormu_HC003A",
            orden: "1",
          },
          () => {
            this.validarMinutos_HC003A();
          },
          () => {
            let codigo = $this.form.medicamentos_003A;
            let consulta = $this.tabla_formulado.find(
              (a) => a.cod_formu == codigo
            );
            let cant_formu = parseFloat(consulta.cant_formu) || 0;
            let cant_ped = parseFloat(consulta.cant_ped) || 0;
            let cant_fact = parseFloat(consulta.cant_fact) || 0;
            let cant_adm = parseFloat(consulta.cant_adm) || 0;
            let cant_devo = parseFloat(consulta.cant_devo) || 0;
            let new_cantidad = parseFloat($this.form.cantidadFormu_003A) || 0;
            let ant_cantidad = parseFloat(this.ant_cantidad) || 0;

            let saldo = parseFloat(cant_fact - cant_adm - cant_devo);
            setTimeout(() => {
              $this._segundaValidacionCant(
                ant_cantidad,
                new_cantidad,
                cant_formu,
                cant_ped,
                cant_adm,
                cant_devo
              );
            }, 150);

            // if (new_cantidad <= 0 || new_cantidad > saldo) {
            //   CON851("03", "03", null, "error", "error");
            //   jAlert(
            //     {
            //       titulo: "Cant. medicamento por facturacion ",
            //       mensaje: `<b>Facturado: </b> ${cant_fact} <br> <b> Administrar: </b> ${cant_adm}   <br>  <b>Devueltos: </b> ${cant_devo} <br><b>Saldo por administrar: </b> ${saldo}`,
            //     },
            //     () => {
            //       setTimeout(() => {
            //         $this._segundaValidacionCant(
            //           new_cantidad,
            //           cant_formu,
            //           cant_ped,
            //           cant_adm,
            //           cant_devo
            //         );
            //       }, 500);
            //     }
            //   );
            // } else $this.validarDato1_HC003A();
          }
        );
      },

      _segundaValidacionCant(
        ant_cantidad,
        new_cantidad,
        cant_formu,
        cant_ped,
        cant_adm,
        cant_devo
      ) {
        let saldo = cant_formu + cant_ped - cant_adm - cant_devo;
        let saldo2 = parseFloat(saldo) + ant_cantidad;
        if (new_cantidad < 0 || (this.novedad == '7' && new_cantidad > saldo) || (this.novedad == '8' && new_cantidad > saldo2)) {
          jAlert(
            {
              titulo: "Cant. medicamento formulado ",
              mensaje: `<b>Formulado: </b> ${cant_formu} <br> <b>Pedido: </b> ${cant_ped}   <br> <b> Administrar: </b> ${cant_adm}   <br>  <b>Devueltos: </b> ${cant_devo} <br><b>Saldo por administrar: </b> ${saldo}`,
            },
            () => {
              setTimeout(() => {
                $this.validarCantidadFormu();
              }, 150);
            }
          );
        } else {
          $this.validarDato1_HC003A();
        }
      },

      validarDato1_HC003A() {
        _inputControl("disabled");
        $this.form.cantidad_003A == ""
          ? (this.form.cantidad_003A = ".00")
          : false;
        $this = this;
        validarInputs(
          {
            form: "#cantidad_HC003A",
            orden: "1",
          },
          () => {
            this.validarCantidadFormu();
          },
          () => {
            var cant = parseFloat(this.form.cantidad_003A).toFixed(2);
            this.form.cantidad_003A = cant;
            if (cant.trim() == "" || cant.trim() < 0) {
              CON851("02", "02", null, "error", "error");
              this.validarDato1_HC003A();
            } else {
              setTimeout(() => {
                this.validarDato2_HC003A();
              }, 200);
            }
          }
        );
      },

      validarDato2_HC003A() {
        $this = this;
        var medicamento = $this.form.medicamentos_003A;
        var json = {
          datos: [
            { Codigo: "1", Medida: "C.C." },
            { Codigo: "2", Medida: "Gramos" },
            { Codigo: "3", Medida: "Miligramos" },
            { Codigo: "4", Medida: "Microgramos" },
            { Codigo: "5", Medida: "Tiempo" },
            { Codigo: "6", Medida: "Unidades" },
            { Codigo: "7", Medida: "U. Internac." },
            { Codigo: "8", Medida: "Puff" },
            { Codigo: "9", Medida: "Gotas" },
            { Codigo: "A", Medida: "%" },
            { Codigo: "B", Medida: "Litros/min" },
            { Codigo: "C", Medida: "MCG/KL/MIN" },
            { Codigo: "D", Medida: "Tableta" },
            { Codigo: "E", Medida: "Cucharada" },
            { Codigo: "F", Medida: "Crema/ungu." },
            { Codigo: "G", Medida: "Ampolla" },
            { Codigo: "H", Medida: "Sobre" },
            { Codigo: "I", Medida: "MiliEquivale" },
            { Codigo: "J", Medida: "Capsulas" },
            { Codigo: "K", Medida: "Locion" },
            { Codigo: "L", Medida: "P.P.M" },
            { Codigo: "M", Medida: "Mg/Kg/Hora" },
            { Codigo: "N", Medida: "Mcg/Kg/Hora" },
          ],
        };
        if (medicamento.substring(0, 2) == "MQ") {
          $this.form.medida_003A = "Unidades";
          codigo_cantidad_medi = "6";
          setTimeout(() => {
            this.validarDato3_HC003A();
          }, 200);
        } else {
          POPUP(
            {
              array: json.datos,
              titulo: "Medidas",
              indices: [{ id: "Codigo", label: "Medida" }],
              // seleccion: $this.form.medida_003A,
              seleccion: 1,
              callback_f: () => {
                this.validarDato1_HC003A();
              },
            },
            (data) => {
              const res = $_HC003A._farmacia.find(
                (e) => e.COD.trim() == medicamento
              );
              if (res.UNIMED == "2") {
                if (data.Codigo == "2") {
                  $this.form.medida_003A = data.Medida;
                  codigo_cantidad_medi = data.Codigo;
                  if (data.Codigo == "F") {
                    console.log(res.UNIMED);
                    $this.form.tiempoCada_003A = "Seg.necesidad";
                    $this.form.tiempo_003A = "";
                    setTimeout(() => {
                      this.validarDato5_HC003A();
                    }, 300);
                    // debe seguir a vias
                  } else {
                    setTimeout(() => {
                      this.validarDato3_HC003A();
                    }, 200);
                  }
                  // continue
                } else {
                  CON851("03", "03", null, "error", "error");
                  this.validarDato1_HC003A();
                }
              } else if (
                res.UNIMED == "3" ||
                res.UNIMED == "4" ||
                res.UNIMED == "5"
              ) {
                if (
                  data.Codigo == "2" ||
                  data.Codigo == "3" ||
                  data.Codigo == "4" ||
                  data.Codigo == "D"
                ) {
                  $this.form.medida_003A = data.Medida;
                  codigo_cantidad_medi = data.Codigo;
                  if (data.Codigo == "F") {
                    $this.form.tiempoCada_003A = "Seg.necesidad";
                    $this.form.tiempo_003A = "";
                    setTimeout(() => {
                      this.validarDato5_HC003A();
                    }, 300);
                    // debe seguir a vias
                  } else {
                    setTimeout(() => {
                      this.validarDato3_HC003A();
                    }, 200);
                  }
                  // continue
                } else {
                  CON851("03", "03", null, "error", "error");
                  this.validarDato1_HC003A();
                }
              } else if (res.UNIMED == "6") {
                if (data.Codigo == "1") {
                  $this.form.medida_003A = data.Medida;
                  codigo_cantidad_medi = data.Codigo;
                  if (data.Codigo == "F") {
                    $this.form.tiempoCada_003A = "Seg.necesidad";
                    $this.form.tiempo_003A = "";
                    setTimeout(() => {
                      this.validarDato5_HC003A();
                    }, 300);
                    // debe seguir a vias
                  } else {
                    setTimeout(() => {
                      this.validarDato3_HC003A();
                    }, 200);
                  }
                  // continue
                } else {
                  CON851("03", "03", null, "error", "error");
                  this.validarDato1_HC003A();
                }
              } else if (
                res.UNIMED == "7" ||
                res.UNIMED == "9" ||
                res.UNIMED == "A"
              ) {
                if (data.Codigo == "1" || data.Codigo == "9") {
                  $this.form.medida_003A = data.Medida;
                  codigo_cantidad_medi = data.Codigo;
                  if (data.Codigo == "F") {
                    console.log(res.UNIMED);
                    $this.form.tiempoCada_003A = "Seg.necesidad";
                    $this.form.tiempo_003A = "";
                    setTimeout(() => {
                      this.validarDato5_HC003A();
                    }, 300);
                    // debe seguir a vias
                  } else {
                    setTimeout(() => {
                      this.validarDato3_HC003A();
                    }, 200);
                    // continue
                  }
                } else {
                  CON851("03", "03", null, "error", "error");
                  this.validarDato1_HC003A();
                }
              } else {
                $this.form.medida_003A = data.Medida;
                codigo_cantidad_medi = data.Codigo;
                if (data.Codigo == "F") {
                  $this.form.tiempoCada_003A = "Seg.necesidad";
                  $this.form.tiempo_003A = "";
                  setTimeout(() => {
                    this.validarDato5_HC003A();
                  }, 300);
                  // debe seguir a vias
                } else {
                  setTimeout(() => {
                    this.validarDato3_HC003A();
                  }, 200);
                }
              }
            }
          );
        }
      },

      validarDato3_HC003A() {
        _inputControl("disabled");
        $this = this;
        // $this.form.tiempo_003A == '' ? $this.form.tiempo_003A = "0" : false;
        validarInputs(
          {
            form: "#tiempo_HC003A",
            orden: "1",
          },
          () => {
            this.validarDato1_HC003A();
          },
          () => {
            var tiempo = $this.form.tiempo_003A;
            if (tiempo.trim() == "" || tiempo.trim() == 0 || tiempo < 1) {
              CON851("02", "02", null, "error", "error");
              this.validarDato3_HC003A();
            } else {
              setTimeout(() => {
                this.validarDato4_HC003A();
              }, 300);
            }
          }
        );
      },

      validarDato4_HC003A() {
        $this = this;
        var tiempo = $this.form.tiempo_003A;
        var json = {
          datos2: [
            { numero: "1", Medi: "MIN." },
            { numero: "2", Medi: "HORA" },
            { numero: "3", Medi: "DIA" },
            { numero: "4", Medi: "MES" },
            { numero: "5", Medi: "AÑO" },
            { numero: "6", Medi: "INMEDIATO" },
            { numero: "7", Medi: "PARA MEZCLA" },
            { numero: "8", Medi: "TITULABLE" },
            { numero: "9", Medi: "UNA VEZ" },
          ],
        };
        POPUP(
          {
            array: json.datos2,
            titulo: "Tiempo",
            indices: [{ id: "numero", label: "Medi" }],
            // seleccion: $this.form.tiempoCada_003A,
            seleccion: 1,
            callback_f: () => {
              this.validarDato3_HC003A();
            },
          },
          (data) => {
            if (data.numero == "1") {
              if (tiempo < 0.01 || tiempo > 45) {
                CON851("03", "03", null, "error", "error");
                this.validarDato3_HC003A();
              } else {
                $this.form.tiempoCada_003A = data.Medi;
                codigo_tiempo = data.numero;
                setTimeout(() => {
                  this.validarDato5_HC003A();
                }, 300);
                // continue
              }
            } else if (data.numero == "2") {
              if (tiempo == 18 || tiempo == 36) {
                if (tiempo > 1) {
                  $this.form.tiempoCada_003A = "HORAS";
                  codigo_tiempo = data.numero;
                  setTimeout(() => {
                    this.validarDato5_HC003A();
                  }, 300);
                  // continue
                } else {
                  $this.form.tiempoCada_003A = data.Medi;
                  codigo_tiempo = data.numero;
                  setTimeout(() => {
                    this.validarDato5_HC003A();
                  }, 300);
                  // continue
                }
              } else if (tiempo < 0.01 || tiempo > 12) {
                CON851("03", "03", null, "error", "error");
                this.validarDato3_HC003A();
              } else {
                if (tiempo > 1) {
                  $this.form.tiempoCada_003A = "HORAS";
                  codigo_tiempo = data.numero;
                  setTimeout(() => {
                    this.validarDato5_HC003A();
                  }, 300);
                  // continue
                } else {
                  $this.form.tiempoCada_003A = data.Medi;
                  codigo_tiempo = data.numero;
                  setTimeout(() => {
                    this.validarDato5_HC003A();
                  }, 300);
                  // continue
                }
              }
            } else if (data.numero == "3") {
              if (tiempo < 0.01 || tiempo > 29) {
                CON851("03", "03", null, "error", "error");
                this.validarDato3_HC003A();
              } else if (tiempo > 1) {
                $this.form.tiempoCada_003A = "DIAS";
                codigo_tiempo = data.numero;
                setTimeout(() => {
                  this.validarDato5_HC003A();
                }, 300);
                // continue
              } else {
                $this.form.tiempoCada_003A = data.Medi;
                codigo_tiempo = data.numero;
                setTimeout(() => {
                  this.validarDato5_HC003A();
                }, 300);
                // continue
              }
            } else if (data.numero == "4") {
              if (tiempo < 0.01 || tiempo > 11) {
                CON851("03", "03", null, "error", "error");
                this.validarDato3_HC003A();
              } else {
                if (tiempo > 1) {
                  $this.form.tiempoCada_003A = "MESES";
                  codigo_tiempo = data.numero;
                  setTimeout(() => {
                    this.validarDato5_HC003A();
                  }, 300);
                  // continue
                } else {
                  $this.form.tiempoCada_003A = data.Medi;
                  codigo_tiempo = data.numero;
                  setTimeout(() => {
                    this.validarDato5_HC003A();
                  }, 300);
                  // continue
                }
              }
            } else if (data.numero == "5") {
              if (tiempo < 0.01 || tiempo > 3) {
                CON851("03", "03", null, "error", "error");
                this.validarDato3_HC003A();
              } else {
                if (tiempo > 1) {
                  $this.form.tiempoCada_003A = "AÑOS";
                  codigo_tiempo = data.numero;
                  setTimeout(() => {
                    this.validarDato5_HC003A();
                  }, 300);
                  // continue
                } else {
                  $this.form.tiempoCada_003A = data.Medi;
                  codigo_tiempo = data.numero;
                  setTimeout(() => {
                    this.validarDato5_HC003A();
                  }, 300);
                  // continue
                }
              }
            } else if (data.numero == "6") {
              $this.form.tiempo_003A = "";
              $this.form.tiempoCada_003A = data.Medi;
              codigo_tiempo = data.numero;
              setTimeout(() => {
                this.validarDato5_HC003A();
              }, 300);
            } else if (data.numero == "7") {
              $this.form.tiempo_003A = "";
              $this.form.tiempoCada_003A = data.Medi;
              codigo_tiempo = data.numero;
              setTimeout(() => {
                this.validarDato5_HC003A();
              }, 300);
            } else if (data.numero == "8") {
              $this.form.tiempo_003A = "";
              $this.form.tiempoCada_003A = data.Medi;
              codigo_tiempo = data.numero;
              setTimeout(() => {
                this.validarDato5_HC003A();
              }, 300);
            } else if (data.numero == "9") {
              $this.form.tiempo_003A = "";
              $this.form.tiempoCada_003A = data.Medi;
              codigo_tiempo = data.numero;
              setTimeout(() => {
                this.validarDato5_HC003A();
              }, 300);
            } else {
              CON851("03", "03", null, "error", "error");
              this.validarDato3_HC003A();
            }
          }
        );
      },

      validarDato5_HC003A() {
        $this = this;
        var json = {
          datos3: [
            { ide: "1", via: "Intravenosa" },
            { ide: "2", via: "Intramuscular" },
            { ide: "3", via: "Oral" },
            { ide: "4", via: "Subcutaneo" },
            { ide: "5", via: "Nasal" },
            { ide: "6", via: "Oftalmica" },
            { ide: "7", via: "Otica" },
            { ide: "8", via: "Topica" },
            { ide: "9", via: "Intradermico" },
            { ide: "A", via: "Inhalatorio" },
            { ide: "B", via: "Vaginal" },
            { ide: "C", via: "Rectal" },
            { ide: "D", via: "Peridural" },
            { ide: "E", via: "Raquidea" },
            { ide: "F", via: "Uretal" },
            { ide: "G", via: "Sublingual" },
          ],
        };
        POPUP(
          {
            array: json.datos3,
            titulo: "Via",
            indices: [{ id: "ide", label: "via" }],
            // seleccion: $this.form.vias_003A,
            seleccion: 1,
            callback_f: () => {
              this.validarDato1_HC003A();
            },
          },
          (data) => {
            $this.form.vias_003A = data.via;
            codigo_via = data.ide;
            // this.ventanaObser_HC003A();
            this.modal_observ = true;
            setTimeout(() => { this.validarObser_HC003A(); }, 300);
          }
        );
      },

      validarObser_HC003A() {
        toastr.success("F3 PARA CONTINUAR");
        $this = this;
        validarInputs(
          {
            form: "#obser_HC003A",
            orden: "1",
          },
          () => {
            this.modal_observ = false;
            this.validarDato1_HC003A();
          },
          () => {
            this.form.obser_003A = this.form.obser_003A.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
            this.subirTabla_HC003A();
          }
        );
      },



      // ventanaObser_HC003A() {
      //   var fuente =
      //     "<div>" +
      //     '<div class="col-md-12">' +
      //     '<div class="portlet light no-padding">' +
      //     '<div class="portlet-body no-padding">' +
      //     '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
      //     '<div class="col-md-12" style="display: flex" id="ventanaObser_HC003A">' +
      //     '<div class="col-md-12" id="validarObser_HC003A">' +
      //     '<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
      //     // '<input type="text" v-model="obser_003A" class="form-control col-md-6" disabled="disabled" maxlength="100" data-orden="1" style="text-align: left; height: 34px;" />' +

      //     '<div class="body_prosoft">' +
      //     '<div class="col-md-12 no-padding">' +
      //     '<div class="portlet light no-padding">' +
      //     '<div class="portlet-body">' +
      //     '<form class="form-horizontal" onsubmit="return false;">' +
      //     '<textarea class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="156" data-orden="1" id="obser_003A" rows="5"></textarea>' +
      //     "</form>" +
      //     "</div>" +
      //     "</div>" +
      //     "</div>" +
      //     "</div>" +
      //     "</div>" +
      //     "</div>" +
      //     "</div>" +
      //     '<div class="salto-linea"></div>' +
      //     '<div class="salto-linea"></div>' +
      //     '<div class="salto-linea"></div>' +
      //     "</div>" +
      //     "</div>" +
      //     "</div>" +
      //     "</div>" +
      //     '<div style="clear:both;"></div>' +
      //     "</div>";

      //   $this.ventanaObser = bootbox.dialog({
      //     title: "Observaciones",
      //     message: fuente,
      //     closeButton: false,
      //     buttons: {
      //       main: {
      //         label: "Aceptar",
      //         className: "blue hidden",
      //         callback: function () { },
      //       },
      //     },
      //   });

      //   $this.ventanaObser.on("shown.bs.modal", async function (e) {
      //     $(".modal-content").css({
      //       width: "900px",
      //       position: "fixed",
      //       top: "50%",
      //       left: "50%",
      //       transform: "translate(-50%, -50%)",
      //     });

      //     $this.validarObser_HC003A();
      //     toastr.success("F3 PARA CONTINUAR");
      //   });
      // },

      // validarObser_HC003A() {
      //   $this = this;
      //   validarInputs(
      //     {
      //       form: "#validarObser_HC003A",
      //       orden: "1",
      //     },
      //     () => {
      //       $('[data-bb-handler="main"]').click();
      //       this.validarDato1_HC003A();
      //     },
      //     () => {
      //       $('[data-bb-handler="main"]').click();
      //       this.subirTabla_HC003A();
      //     }
      //   );
      // },

      subirTabla_HC003A() {
        $this = this;
        this.modal_observ = false;
        this.bandera = false;
        this.banderaEdit = false;

        if ($this.form.cantidad_003A % 1 == 0) {
          var cantidadDeci = parseFloat($this.form.cantidad_003A).toFixed();
        } else {
          var cantidadDeci = parseFloat($this.form.cantidad_003A).toFixed(2);
        }

        index = $this.form.itm_003A - 1;

        var elemento = $this.hc003a.tablaMedica[index];
        // console.log(index);
        // console.log($this.hc003a.tablaMedica[index]);

        // const res = $_HC003A._farmacia.find(e => e.COD.trim() == medicamento);

        // posi2 = $this.form.itm_003A - 1;
        // var index = $this.hc003a.tablaMedica.find(e => e.item == posi2);
        // console.log(index);
        // console.log("aqui");
        // console.log(posi2);

        var reset_vali;

        if (elemento == undefined) {
          this.hc003a.tablaMedica.push({
            item: $this.form.itm_003A,
            año: $this.form.año_003A,
            mes: $this.form.mes_003A,
            dia: $this.form.dia_003A,
            hora: $this.form.hora_003A + ":" + $this.form.minutos_003A,

            cod_Medicamento: $this.form.medicamentos_003A,

            medicamento: $this.form.descrip_003A,
            cantidadFormu: $this.form.cantidadFormu_003A,
            cantidad_tabla: cantidadDeci + "   " + $this.form.medida_003A,

            cantidad: cantidadDeci,
            codigo_cantidad_medida: codigo_cantidad_medi,
            cantidad_Medida: $this.form.medida_003A,
            tiempo: $this.form.tiempo_003A,
            codigo_tiempo: codigo_tiempo,
            medida_Tiempo: $this.form.tiempoCada_003A,
            codigo_via: codigo_via,
            vias: $this.form.vias_003A,
            observaciones: $this.form.obser_003A,
          });
          reset_vali = "1";
        } else {
          $this.tabla_medica = {
            item: $this.form.itm_003A,
            año: $this.form.año_003A,
            mes: $this.form.mes_003A,
            dia: $this.form.dia_003A,
            hora: $this.form.hora_003A + ":" + $this.form.minutos_003A,

            cod_Medicamento: $this.form.medicamentos_003A,

            medicamento: $this.form.descrip_003A,
            cantidadFormu: $this.form.cantidadFormu_003A,
            cantidad_tabla: cantidadDeci + "   " + $this.form.medida_003A,

            cantidad: cantidadDeci,
            codigo_cantidad_medida: codigo_cantidad_medi,
            cantidad_Medida: $this.form.medida_003A,
            tiempo: $this.form.tiempo_003A,
            codigo_tiempo: codigo_tiempo,
            medida_Tiempo: $this.form.tiempoCada_003A,
            codigo_via: codigo_via,
            vias: $this.form.vias_003A,
            observaciones: $this.form.obser_003A,
          };

          $this.hc003a.tablaMedica[index] = $this.tabla_medica;

          reset_vali = "2";
        }

        this.reset_HC003A(reset_vali);

        // var index2 = $this.form.itm_003A;
        // var elemento2 = $this.hc003a.tablaMedica[index2];
        // if (elemento2 == undefined) {
        //   this.reset_HC003A();
        // } else {
        //   $this.form = {
        //     itm_003A: $this.hc003a.tablaMedica[index2].item,
        //     año_003A: $this.hc003a.tablaMedica[index2].año,
        //     mes_003A: $this.hc003a.tablaMedica[index2].mes,
        //     dia_003A: $this.hc003a.tablaMedica[index2].dia,
        //     hora_003A: $this.hc003a.tablaMedica[index2].hora.substring(0,2),
        //     minutos_003A: $this.hc003a.tablaMedica[index2].hora.substring(3,5),
        //     medicamentos_003A: $this.hc003a.tablaMedica[index2].cod_Medicamento,
        //     descrip_003A: $this.hc003a.tablaMedica[index2].medicamento,
        //     cantidad_003A: $this.hc003a.tablaMedica[index2].cantidad,
        //     medida_003A: $this.hc003a.tablaMedica[index2].cantidad_Medida,
        //     tiempo_003A: $this.hc003a.tablaMedica[index2].tiempo,
        //     tiempoCada_003A: $this.hc003a.tablaMedica[index2].medida_Tiempo,
        //     vias_003A: $this.hc003a.tablaMedica[index2].vias,
        //     // obser_003A: $this.hc003a.tablaMedica[index2].observaciones,
        //   }
        //   // document.getElementById("obser_003A").val = $this.hc003a.tablaMedica[index2].observaciones;
        //   retrocedio = retrocedio + 1;
        //   this.validarInputs_HC003A();
        //   this.validarMinutos_HC003A();
        // }
      },

      reset_HC003A(reset_vali) {
        if (reset_vali == "1") {
          retrocedio = retrocedio + 1;
        } else if (reset_vali == "2") {
          retrocedio = $this.hc003a.tablaMedica.length + 1;
        }

        $this = this;
        $this.form = {
          año_003A: "",
          mes_003A: "",
          dia_003A: "",
          hora_003A: "",
          minutos_003A: "",
          medicamentos_003A: "",
          descrip_003A: "",
          cantidadFormu_003A: "",
          cantidad_003A: "",
          medida_003A: "",
          tiempo_003A: "",
          tiempoCada_003A: "",
          vias_003A: "",
          obser_003A: "",
        };
        // document.getElementById("obser_003A").value = "";
        $this.form.oper_003A = this.admin_edit;
        this.init_HC003A();
      },

      _retrocederDia_HC003A() {
        $this = this;

        if ($this.form.itm_003A > 1) {
          var posi2 = $this.form.itm_003A - 2;

          retrocedio = retrocedio - 1;

          $this.form = {
            itm_003A: $this.hc003a.tablaMedica[posi2].item,
            año_003A: $this.hc003a.tablaMedica[posi2].año,
            mes_003A: $this.hc003a.tablaMedica[posi2].mes,
            dia_003A: $this.hc003a.tablaMedica[posi2].dia,
            hora_003A: $this.hc003a.tablaMedica[posi2].hora.substring(0, 2),
            minutos_003A: $this.hc003a.tablaMedica[posi2].hora.substring(3, 5),
            medicamentos_003A: $this.hc003a.tablaMedica[posi2].cod_Medicamento,
            descrip_003A: $this.hc003a.tablaMedica[posi2].medicamento,
            cantidadFormu_003A: $this.hc003a.tablaMedica[posi2].cantidadFormu,
            cantidad_003A: $this.hc003a.tablaMedica[posi2].cantidad,
            medida_003A: $this.hc003a.tablaMedica[posi2].cantidad_Medida,
            tiempo_003A: $this.hc003a.tablaMedica[posi2].tiempo,
            tiempoCada_003A: $this.hc003a.tablaMedica[posi2].medida_Tiempo,
            vias_003A: $this.hc003a.tablaMedica[posi2].vias,
            obser_003A: $this.hc003a.tablaMedica[posi2].observaciones,
          };
          // document.getElementById("obser_003A").value = $this.hc003a.tablaMedica[posi2].observaciones;

          var elemento = $this.hc003a.tablaMedica[posi2 + 1];
          if (elemento != undefined) {
            $this.hc003a.tablaMedica.pop();
          }

          this.validarInputs_HC003A();
          this.validarMinutos_HC003A();
        } else {
          toastr.success("F5 PARA SALIR");
          this.validarDia_HC003A();
        }
      },

      _retrocederMes_HC003A() {
        $this = this;

        if ($this.form.itm_003A > 1) {
          var posi2 = $this.form.itm_003A - 2;

          retrocedio = retrocedio - 1;

          $this.form = {
            itm_003A: $this.hc003a.tablaMedica[posi2].item,
            año_003A: $this.hc003a.tablaMedica[posi2].año,
            mes_003A: $this.hc003a.tablaMedica[posi2].mes,
            dia_003A: $this.hc003a.tablaMedica[posi2].dia,
            hora_003A: $this.hc003a.tablaMedica[posi2].hora.substring(0, 2),
            minutos_003A: $this.hc003a.tablaMedica[posi2].hora.substring(3, 5),
            medicamentos_003A: $this.hc003a.tablaMedica[posi2].cod_Medicamento,
            descrip_003A: $this.hc003a.tablaMedica[posi2].medicamento,
            cantidadFormu_003A: $this.hc003a.tablaMedica[posi2].cantidadFormu,
            cantidad_003A: $this.hc003a.tablaMedica[posi2].cantidad,
            medida_003A: $this.hc003a.tablaMedica[posi2].cantidad_Medida,
            tiempo_003A: $this.hc003a.tablaMedica[posi2].tiempo,
            tiempoCada_003A: $this.hc003a.tablaMedica[posi2].medida_Tiempo,
            vias_003A: $this.hc003a.tablaMedica[posi2].vias,
            obser_003A: $this.hc003a.tablaMedica[posi2].observaciones,
          };
          // document.getElementById("obser_003A").value = $this.hc003a.tablaMedica[posi2].observaciones;

          var elemento = $this.hc003a.tablaMedica[posi2 + 1];
          if (elemento != undefined) {
            $this.hc003a.tablaMedica.pop();
          }

          this.validarInputs_HC003A();
          this.validarMinutos_HC003A();
        } else {
          toastr.success("F5 PARA SALIR");
          this.validarMes_HC003A();
        }
      },

      _retrocederAño_HC003A() {
        $this = this;

        if ($this.form.itm_003A > 1) {
          var posi2 = $this.form.itm_003A - 2;

          retrocedio = retrocedio - 1;

          $this.form = {
            itm_003A: $this.hc003a.tablaMedica[posi2].item,
            año_003A: $this.hc003a.tablaMedica[posi2].año,
            mes_003A: $this.hc003a.tablaMedica[posi2].mes,
            dia_003A: $this.hc003a.tablaMedica[posi2].dia,
            hora_003A: $this.hc003a.tablaMedica[posi2].hora.substring(0, 2),
            minutos_003A: $this.hc003a.tablaMedica[posi2].hora.substring(3, 5),
            medicamentos_003A: $this.hc003a.tablaMedica[posi2].cod_Medicamento,
            descrip_003A: $this.hc003a.tablaMedica[posi2].medicamento,
            cantidadFormu_003A: $this.hc003a.tablaMedica[posi2].cantidadFormu,
            cantidad_003A: $this.hc003a.tablaMedica[posi2].cantidad,
            medida_003A: $this.hc003a.tablaMedica[posi2].cantidad_Medida,
            tiempo_003A: $this.hc003a.tablaMedica[posi2].tiempo,
            tiempoCada_003A: $this.hc003a.tablaMedica[posi2].medida_Tiempo,
            vias_003A: $this.hc003a.tablaMedica[posi2].vias,
            obser_003A: $this.hc003a.tablaMedica[posi2].observaciones,
          };
          // document.getElementById("obser_003A").value = $this.hc003a.tablaMedica[posi2].observaciones;

          var elemento = $this.hc003a.tablaMedica[posi2 + 1];
          if (elemento != undefined) {
            $this.hc003a.tablaMedica.pop();
          }

          this.validarInputs_HC003A();
          this.validarMinutos_HC003A();
        } else {
          toastr.success("F5 PARA SALIR");
          this.validarAño_HC003A();
        }
      },

      imprimir_Tabla_HC003A() {
        datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
        datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;
        datos.encabezado.titulo = "HOJA ADMINISTRACION DE MEDICAMENTOS";

        var aux = "";
        var ciudad = "";

        datos.paciente.nombre = $_REG_PACI.DESCRIP.replace(/\s+/g, " ");
        datos.paciente.tipoId = $_REG_PACI["TIPO-ID"];
        isNaN($_REG_PACI.COD) == true
          ? (aux = $_REG_PACI.COD)
          : (aux = new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD));
        datos.paciente.id = aux;
        // datos.paciente.edad = $_HC003A._hcprc.edad;
        datos.paciente.edad =
          $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad;
        $_REG_PACI.SEXO == "F"
          ? (datos.paciente.sexo = "Femenino")
          : (datos.paciente.sexo = "Masculino");
        datos.paciente.e_civil = _ESTCIVIL($_REG_PACI["EST-CIV"]);

        $_HC003A.busqCiu = $_HC003A._ciudades.find(
          (e) => e["COD"].trim() == $_REG_PACI.CIUDAD.trim()
        );
        $_HC003A.busqCiu != undefined
          ? (ciudad = $_HC003A.busqCiu.NOMBRE)
          : false;

        datos.paciente.direccion = $_REG_PACI["DIRECC"] + "   " + ciudad;

        // $_HC003A.busqEnt = $_HC003A._entidades.find(
        //   (e) => e["COD-ENT"] == $_REG_PACI.EPS
        // );
        // $_HC003A.busqEnt != undefined
        //   ? ($_HC003A.NOMBRE_ENT = $_HC003A.busqEnt["NOMBRE-ENT"])
        //   : ($_HC003A.NOMBRE_ENT = $_REG_PACI.EPS);
        // datos.paciente.entidad = $_HC003A.NOMBRE_ENT;

        if ($_HC003A._hcprc.cierre.nit_fact == '' || $_HC003A._hcprc.cierre.nit_fact == '0000000000') {
          datos.paciente.entidad = $_REG_PACI["NOMBRE-EPS"];
        } else {
          datos.paciente.entidad = $_HC003A._hcprc.cierre.descrip_nit_fact;
        }

        $_HC003A.busqOcu = $_HC003A._ocupaciones.find(
          (e) => e["CODOCU"].trim() == $_REG_PACI.OCUP.trim()
        );
        $_HC003A.busqOcu != undefined
          ? (datos.paciente.ocupacion = $_HC003A.busqOcu.NOMBREOCU)
          : false;

        datos.paciente.u_servicio = $this.form.unser_003A;

        if ($_HC003A._hcprc.cierre.prefijo != '' && $_HC003A._hcprc.cierre.nro_fact != '') {
          var fact_paci = parseInt(
            $_HC003A._hcprc.cierre.prefijo + $_HC003A._hcprc.cierre.nro_fact
          );

          if (fact_paci != 0) {
            datos.paciente.fact_paci = fact_paci;
          } else {
            datos.paciente.fact_paci = "";
          }
        } else {
          datos.paciente.fact_paci = "";
        }

        datos.operador.operador = localStorage.Usuario;

        for (var i in $this.hc003a._tablaFormu) {
          datos.tabla_medicamentos.medicamento[i] = $this.hc003a._tablaFormu[
            i
          ].NOMBRE_DROGA_J.trim();
          datos.tabla_medicamentos.minutos[i] = $this.hc003a._tablaFormu[
            i
          ].HORA_J.substring(2, 4);
          datos.tabla_medicamentos.horas[i] = $this.hc003a._tablaFormu[
            i
          ].HORA_J.substring(0, 2);
          datos.tabla_medicamentos.año[i] = $this.hc003a._tablaFormu[
            i
          ].FECHA_J.substring(0, 4);
          datos.tabla_medicamentos.mes[i] = $this.hc003a._tablaFormu[
            i
          ].FECHA_J.substring(4, 6);
          datos.tabla_medicamentos.dia[i] = $this.hc003a._tablaFormu[
            i
          ].FECHA_J.substring(6, 8);

          // if (isNaN($this.hc003a._tablaFormu[i].CANT_FORMU_J)) {
          //   datos.tabla_medicamentos.cantidad_formu[i] = "";
          // } else {
          //   datos.tabla_medicamentos.cantidad_formu[i] = parseInt(
          //     $this.hc003a._tablaFormu[i].CANT_FORMU_J
          //   );
          // }

          datos.tabla_medicamentos.cantidad_formu[i] = $this.hc003a._tablaFormu[i].CANT_FORMU_J || '';

          datos.tabla_medicamentos.cantidad[i] = $this.hc003a._tablaFormu[
            i
          ].CANTIDAD_DOSIS_J.trim();
          datos.tabla_medicamentos.medida_cantidad[
            i
          ] = $this.hc003a._tablaFormu[i].UNID_DOSIS_J.trim();
          datos.tabla_medicamentos.tiempo[i] = $this.hc003a._tablaFormu[
            i
          ].INMED_J.trim();

          datos.tabla_medicamentos.via[i] = $this.hc003a._tablaFormu[
            i
          ].VIA_DOSIS_J.trim();

          datos.tabla_medicamentos.dato_tabla[i] =
            $this.hc003a._tablaFormu[i].HORA_J.substring(0, 2) +
            ":" +
            $this.hc003a._tablaFormu[i].HORA_J.substring(2, 4) +
            "  " +
            $this.hc003a._tablaFormu[i].VIA_DOSIS_J.trim() +
            "  " +
            $this.hc003a._tablaFormu[i].OPER_J;

          datos.tabla_medicamentos.observaciones[i] = $this.hc003a._tablaFormu[i].OBSERVACION_J.replace(/(?:\&)/g, "\n");

          datos.tabla_medicamentos.oper[i] = $this.hc003a._tablaFormu[i].OPER_J;
        }

        datos.fechas.año1 = fecha_ini_glob.substring(0, 4);
        datos.fechas.mes1 = fecha_ini_glob.substring(4, 6);
        datos.fechas.dia1 = fecha_ini_glob.substring(6, 8);

        var diaFecha = parseInt(fecha_ini_glob.substring(6, 8)) + 1;
        var dia_max;
        switch (fecha_ini_glob.substring(4, 6)) {
          case "01":
            dia_max = 31;
            break;
          case "02":
            dia_max = 28;
            break;
          case "03":
            dia_max = 31;
            break;
          case "04":
            dia_max = 30;
            break;
          case "05":
            dia_max = 31;
            break;
          case "06":
            dia_max = 30;
            break;
          case "07":
            dia_max = 31;
            break;
          case "08":
            dia_max = 31;
            break;
          case "09":
            dia_max = 30;
            break;
          case "10":
            dia_max = 31;
            break;
          case "11":
            dia_max = 30;
            break;
          case "12":
            dia_max = 31;
            break;
        }

        if (diaFecha > dia_max) {
          datos.fechas.dia2 = diaFecha - dia_max;
          datos.fechas.mes2 = parseInt(fecha_ini_glob.substring(4, 6)) + 1;
          if (datos.fechas.mes2 > 12) {
            datos.fechas.año2 = parseInt(fecha_ini_glob.substring(0, 4)) + 1;
            datos.fechas.mes2 = 01;
          } else {
            datos.fechas.año2 = fecha_ini_glob.substring(0, 4);
          }
        } else {
          datos.fechas.año2 = fecha_ini_glob.substring(0, 4);
          datos.fechas.mes2 = fecha_ini_glob.substring(4, 6);
          datos.fechas.dia2 = diaFecha;
        }

        res = $_HC003A._especialidades.find(
          (e) => e.CODIGO == $_REG_PROF.TAB_ESPEC[0].COD
        );
        res != undefined ? (datos.medico.espec = res.NOMBRE) : false;

        datos.medico.firma = $_REG_PROF.IDENTIFICACION.trim();

        $_REG_PROF.NOMBRE = $_REG_PROF.NOMBRE.replace(/\�/g, "Ñ");

        datos.medico.nombre = $_REG_PROF.NOMBRE;
        datos.medico.reg = $_REG_PROF.REG_MEDICO;

        _impresion2({
          tipo: "pdf",
          archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")
            }.pdf`,
          content: _imprimirHC003A(datos),
        })
          .then(async (data) => {
            console.log(data, "Impresión terminada");
            _regresar_menuhis();
          })
          .catch((err) => {
            console.error(err);
          });
      },

      async imprimir_Tabla_HC003A_2() {
        datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
        datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;
        datos.encabezado.titulo = "HOJA ADMINISTRACION DE MEDICAMENTOS";

        var aux = "";
        var ciudad = "";

        datos.paciente.nombre = $_REG_PACI.DESCRIP.replace(/\s+/g, " ");
        datos.paciente.tipoId = $_REG_PACI["TIPO-ID"];
        isNaN($_REG_PACI.COD) == true
          ? (aux = $_REG_PACI.COD)
          : (aux = new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD));
        datos.paciente.id = aux;
        // datos.paciente.edad = $_HC003A._hcprc.edad;
        datos.paciente.edad =
          $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad;
        $_REG_PACI.SEXO == "F"
          ? (datos.paciente.sexo = "Femenino")
          : (datos.paciente.sexo = "Masculino");
        datos.paciente.e_civil = _ESTCIVIL($_REG_PACI["EST-CIV"]);

        $_HC003A.busqCiu = $_HC003A._ciudades.find(
          (e) => e["COD"].trim() == $_REG_PACI.CIUDAD.trim()
        );
        $_HC003A.busqCiu != undefined
          ? (ciudad = $_HC003A.busqCiu.NOMBRE)
          : false;

        datos.paciente.direccion = $_REG_PACI["DIRECC"] + "   " + ciudad;

        // $_HC003A.busqEnt = $_HC003A._entidades.find(
        //   (e) => e["COD-ENT"] == $_REG_PACI.EPS
        // );
        // $_HC003A.busqEnt != undefined
        //   ? ($_HC003A.NOMBRE_ENT = $_HC003A.busqEnt["NOMBRE-ENT"])
        //   : ($_HC003A.NOMBRE_ENT = $_REG_PACI.EPS);
        // datos.paciente.entidad = $_HC003A.NOMBRE_ENT;

        if ($_HC003A._hcprc.cierre.nit_fact == '' || $_HC003A._hcprc.cierre.nit_fact == '0000000000') {
          datos.paciente.entidad = $_REG_PACI["NOMBRE-EPS"];
        } else {
          datos.paciente.entidad = $_HC003A._hcprc.cierre.descrip_nit_fact;
        }

        $_HC003A.busqOcu = $_HC003A._ocupaciones.find(
          (e) => e["CODOCU"].trim() == $_REG_PACI.OCUP.trim()
        );
        $_HC003A.busqOcu != undefined
          ? (datos.paciente.ocupacion = $_HC003A.busqOcu.NOMBREOCU)
          : false;

        datos.paciente.u_servicio = $this.form.unser_003A;

        if ($_HC003A._hcprc.cierre.prefijo != '' && $_HC003A._hcprc.cierre.nro_fact != '') {
          var fact_paci = parseInt(
            $_HC003A._hcprc.cierre.prefijo + $_HC003A._hcprc.cierre.nro_fact
          );

          if (fact_paci != 0) {
            datos.paciente.fact_paci = fact_paci;
          } else {
            datos.paciente.fact_paci = "";
          }
        } else {
          datos.paciente.fact_paci = "";
        }

        datos.operador.operador = localStorage.Usuario;

        console.log("datos antes ", $this.hc003a._tablaFormu);

        const operadores = [];
        $this.hc003a._tablaFormu.forEach((item) => {
          let operador = item.OPER_J;
          let medico = item.MEDICO_J;
          let busqueda = operadores.find(
            (e) => e.operador == operador && e.medico == medico
          );
          if (!busqueda) operadores.push({ operador, medico });
        });

        console.log(operadores);

        for (var i in operadores) {
          datos.firmas.firma[i] = parseFloat(operadores[i].medico);

          var res = $_HC003A._profesionales.find(
            (e) => e.IDENTIFICACION == parseFloat(operadores[i].medico)
          );
          if (res != undefined) {
            datos.firmas.oper[i] = operadores[i].operador;
            datos.firmas.medico[i] = res.NOMBRE;
            datos.firmas.reg_medico[i] = res.REG_MEDICO;
          } else {
            datos.firmas.medico[i] = "";
            datos.firmas.reg_medico[i] = "";
          }
        }

        const tabla_agrupada = [];
        $this.hc003a._tablaFormu.forEach((item) => {
          let busqueda = tabla_agrupada.find(
            (el) =>
              el.COD_DROGA_J == item.COD_DROGA_J &&
              el.FECHA_J == item.FECHA_J &&
              el.CANTIDAD_DOSIS_J == item.CANTIDAD_DOSIS_J &&
              el.UNID_DOSIS_J == item.UNID_DOSIS_J &&
              el.CANT_FREC_J == item.CANT_FREC_J &&
              el.VIA_J == item.VIA_J &&
              el.INMED_J == item.INMED_J
          );

          if (!busqueda) {
            item.HORA_J = [item.HORA_J];
            item.OBSERVACION_J = [item.OBSERVACION_J.replace(/(?:\&)/g, "\n")];
            item.OPER_J = [item.OPER_J];
            tabla_agrupada.push(item);
          } else {
            let index = tabla_agrupada.indexOf(busqueda);
            let cantidad_nueva = parseFloat(item.CANT_FORMU_J) || 0;
            let cantidad_anterior = parseFloat(busqueda.CANT_FORMU_J) || 0;

            tabla_agrupada[index].CANT_FORMU_J =
              cantidad_anterior + cantidad_nueva;
            tabla_agrupada[index].HORA_J.push(item.HORA_J);
            tabla_agrupada[index].OBSERVACION_J.push(item.OBSERVACION_J.replace(/(?:\&)/g, "\n"));
            tabla_agrupada[index].OPER_J.push(item.OPER_J);
          }
        });

        $this.hc003a._tablaFormu = tabla_agrupada;

        for (var i in $this.hc003a._tablaFormu) {
          datos.tabla_medicamentos.medicamento[i] = $this.hc003a._tablaFormu[
            i
          ].NOMBRE_DROGA_J.trim();

          datos.tabla_medicamentos.horas[i] = $this.hc003a._tablaFormu[
            i
          ].HORA_J.map((el, index1) => {
            let hora = el.substring(0, 2);
            let minutos = el.substring(2, 4);
            el = {
              hora,
              minutos,
              formato: `${hora}:${minutos} ${$this.hc003a._tablaFormu[
                i
              ].VIA_DOSIS_J.trim()} ${$this.hc003a._tablaFormu[i].OPER_J[index1]
                }`,
            };

            return el;
          });

          datos.tabla_medicamentos.año[i] = $this.hc003a._tablaFormu[
            i
          ].FECHA_J.substring(0, 4);
          datos.tabla_medicamentos.mes[i] = $this.hc003a._tablaFormu[
            i
          ].FECHA_J.substring(4, 6);
          datos.tabla_medicamentos.dia[i] = $this.hc003a._tablaFormu[
            i
          ].FECHA_J.substring(6, 8);

          let cantidad = $this.hc003a._tablaFormu[i].CANT_FORMU_J;
          let cantidad_dosis = $this.hc003a._tablaFormu[i].CANTIDAD_DOSIS_J;
          let unidad = $this.hc003a._tablaFormu[i].UNID_DOSIS_J;
          let administrar = `${cantidad_dosis} ${unidad}`;
          datos.tabla_medicamentos.cantidad_formu[i] =
            parseFloat(cantidad) || administrar;

          datos.tabla_medicamentos.cantidad[i] = $this.hc003a._tablaFormu[
            i
          ].CANTIDAD_DOSIS_J.trim();
          datos.tabla_medicamentos.medida_cantidad[
            i
          ] = $this.hc003a._tablaFormu[i].UNID_DOSIS_J.trim();
          datos.tabla_medicamentos.tiempo[i] = $this.hc003a._tablaFormu[
            i
          ].INMED_J.trim();

          datos.tabla_medicamentos.via[i] = $this.hc003a._tablaFormu[
            i
          ].VIA_DOSIS_J.trim();

          datos.tabla_medicamentos.observaciones[i] = $this.hc003a._tablaFormu[i].OBSERVACION_J;

          for (var j in $this.hc003a._tablaFormu[i].OPER_J) {
            datos.tabla_medicamentos.oper[i] =
              $this.hc003a._tablaFormu[i].OPER_J[j];
          }
        }

        datos.fechas.año1 = fecha_ini_glob.substring(0, 4);
        datos.fechas.mes1 = fecha_ini_glob.substring(4, 6);
        datos.fechas.dia1 = fecha_ini_glob.substring(6, 8);

        var diaFecha = parseInt(fecha_ini_glob.substring(6, 8)) + 1;
        var dia_max;
        switch (fecha_ini_glob.substring(4, 6)) {
          case "01":
            dia_max = 31;
            break;
          case "02":
            dia_max = 28;
            break;
          case "03":
            dia_max = 31;
            break;
          case "04":
            dia_max = 30;
            break;
          case "05":
            dia_max = 31;
            break;
          case "06":
            dia_max = 30;
            break;
          case "07":
            dia_max = 31;
            break;
          case "08":
            dia_max = 31;
            break;
          case "09":
            dia_max = 30;
            break;
          case "10":
            dia_max = 31;
            break;
          case "11":
            dia_max = 30;
            break;
          case "12":
            dia_max = 31;
            break;
        }

        if (diaFecha > dia_max) {
          datos.fechas.dia2 = diaFecha - dia_max;
          datos.fechas.mes2 = parseInt(fecha_ini_glob.substring(4, 6)) + 1;
          if (datos.fechas.mes2 > 12) {
            datos.fechas.año2 = parseInt(fecha_ini_glob.substring(0, 4)) + 1;
            datos.fechas.mes2 = 01;
          } else {
            datos.fechas.año2 = fecha_ini_glob.substring(0, 4);
          }
        } else {
          datos.fechas.año2 = fecha_ini_glob.substring(0, 4);
          datos.fechas.mes2 = fecha_ini_glob.substring(4, 6);
          datos.fechas.dia2 = diaFecha;
        }

        console.log("Datos tabla", datos.tabla_medicamentos);

        _impresion2({
          tipo: "pdf",
          archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")
            }.pdf`,
          content: _imprimirHC003A_2(datos),
        })
          .then(async (data) => {
            console.log(data, "Impresión terminada");
            _regresar_menuhis();
          })
          .catch((err) => {
            console.error(err);
          });
      },

      ventanaFecha_HC003A() {
        var fuente =
          "<div>" +
          '<div class="col-md-12">' +
          '<div class="portlet light no-padding">' +
          '<div class="portlet-body no-padding">' +
          '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
          '<div class="col-md-12" style="display: flex" id="divVentanaFecha_HC003A">' +
          '<div class="col-md-6">' +
          '<div class="col-md-12 col-sm-12 col-xs-12 head-box" style="padding-bottom: 0 !important">' +
          "<label>FECHA INICIAL:</label>" +
          "</div>" +
          '<div class="col-md-12 col-sm-12 col-xs-12" id="fechaIni_impre" style="margin-top: 4px;">' +
          '<div class="inline-inputs">' +
          '<label class="col-md-8 col-sm-6 col-xs-6">Año:</label>' +
          '<div class="input-group col-md-11 col-sm-5 col-xs-5">' +
          '<input id="añoIni_impre" type="text"' +
          'class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled" maxlength="4"' +
          'data-orden="1" required="true">' +
          "</div>" +
          '<label class="col-md-6 col-sm-6 col-xs-6">Mes:</label>' +
          '<div class="input-group col-md-8 col-sm-5 col-xs-5">' +
          '<input id="mesIni_impre" type="text"' +
          'class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled" maxlength="2"' +
          'data-orden="2" required="true">' +
          "</div>" +
          '<label class="col-md-6 col-sm-8 col-xs-6">Dia:</label>' +
          '<div class="input-group col-md-8 col-sm-5 col-xs-5">' +
          '<input id="diaIni_impre" type="text"' +
          'class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled" maxlength="2"' +
          'data-orden="3" required="true">' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="col-md-6">' +
          '<div class="col-md-12 col-sm-12 col-xs-12 head-box" style="padding-bottom: 0 !important">' +
          "<label>FECHA FINAL:</label>" +
          "</div>" +
          '<div class="col-md-12 col-sm-12 col-xs-12" id="fechaFin_impre" style="margin-top: 4px;">' +
          '<div class="inline-inputs">' +
          '<label class="col-md-8 col-sm-6 col-xs-6">Año:</label>' +
          '<div class="input-group col-md-11 col-sm-5 col-xs-5">' +
          '<input id="añoFin_impre" type="text"' +
          'class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled" maxlength="4"' +
          'data-orden="1" required="true">' +
          "</div>" +
          '<label class="col-md-6 col-sm-6 col-xs-6">Mes:</label>' +
          '<div class="input-group col-md-8 col-sm-5 col-xs-5">' +
          '<input id="mesFin_impre" type="text"' +
          'class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled" maxlength="2"' +
          'data-orden="2" required="true">' +
          "</div>" +
          '<label class="col-md-6 col-sm-8 col-xs-6">Dia:</label>' +
          '<div class="input-group col-md-8 col-sm-5 col-xs-5">' +
          '<input id="diaFin_impre" type="text"' +
          'class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled" maxlength="2"' +
          'data-orden="3" required="true">' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          // '<div class="salto-linea">' +
          // '</div>' +

          // '<div class="col-md-12">' +

          // '<div class="col-md-5">' +
          // '</div>' +

          // '<div class="col-md-3">' +
          // '</div>' +

          // '<div class="input-group col-md-2 col-sm-12 col-xs-12" id="tdias">' +
          // '<input id="tdias_ventana" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled" data-orden="1" required="true">' +
          // '</div>' +

          // '</div>' +

          '<div class="salto-linea"></div>' +
          '<div class="salto-linea"></div>' +
          '<div class="salto-linea"></div>' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div style="clear:both;"></div>' +
          "</div>";

        $this.ventanaInicial = bootbox.dialog({
          title: "IMPRESION DE APLICACION DE MEDICAMENTO",
          message: fuente,
          closeButton: false,
          buttons: {
            main: {
              label: "Aceptar",
              className: "blue hidden",
              callback: function () { },
            },
          },
        });

        $this.ventanaInicial.on("shown.bs.modal", async function (e) {
          $(".modal-content").css({
            width: "750px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          });

          $this.datoVentanaIni_impre();
        });
      },

      datoVentanaIni_impre() {
        $this = this;
        document.getElementById("mesIni_impre").value = parseInt(
          moment().format("MM")
        );
        document.getElementById("añoIni_impre").value = parseInt(
          moment().format("YYYY")
        );
        document.getElementById("diaIni_impre").value = parseInt(
          moment().format("DD")
        );
        this.validarFechaIni_impre("1");
      },

      validarFechaIni_impre(orden) {
        $this = this;
        validarInputs(
          {
            form: "#fechaIni_impre",
            orden: orden,
          },
          () => {
            $('[data-bb-handler="main"]').click();
            _regresar_menuhis();
          },
          () => {
            document.getElementById("diaIni_impre").value = cerosIzq(
              document.getElementById("diaIni_impre").value,
              2
            );
            document.getElementById("mesIni_impre").value = cerosIzq(
              document.getElementById("mesIni_impre").value,
              2
            );
            // $this.fechaInicial = document.getElementById("añoIni_impre").value + document.getElementById("mesIni_impre").valuee + document.getElementById("diaIni_impre").value;
            var añoInicial = parseFloat(
              document.getElementById("añoIni_impre").value
            );
            var diaInicial = parseFloat(
              document.getElementById("diaIni_impre").value
            );
            var mesInicial = parseFloat(
              document.getElementById("mesIni_impre").value
            );
            if (isNaN(añoInicial)) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaIni_impre("1");
            } else if (isNaN(mesInicial)) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaIni_impre("2");
            } else if (isNaN(diaInicial)) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaIni_impre("3");
            } else if (
              parseInt(añoInicial) < parseInt(moment().format("YYYY"))
            ) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaIni_impre("1");
            } else {
              var dia_max;
              switch (document.getElementById("mesIni_impre").value) {
                case "01":
                  dia_max = 31;
                  break;
                case "02":
                  dia_max = 28;
                  break;
                case "03":
                  dia_max = 31;
                  break;
                case "04":
                  dia_max = 30;
                  break;
                case "05":
                  dia_max = 31;
                  break;
                case "06":
                  dia_max = 30;
                  break;
                case "07":
                  dia_max = 31;
                  break;
                case "08":
                  dia_max = 31;
                  break;
                case "09":
                  dia_max = 30;
                  break;
                case "10":
                  dia_max = 31;
                  break;
                case "11":
                  dia_max = 30;
                  break;
                case "12":
                  dia_max = 31;
                  break;
              }

              if (parseInt(diaInicial) < 1 || parseInt(diaInicial) > dia_max) {
                CON851("37", "37", null, "error", "error");
                $this.validarFechaIni_impre("3");
              } else if (
                parseInt(mesInicial) < 1 ||
                parseInt(mesInicial) > 12
              ) {
                CON851("37", "37", null, "error", "error");
                $this.validarFechaIni_impre("2");
              } else {
                this.datoVentanaFin_impre();
              }
            }
          }
        );
      },

      datoVentanaFin_impre() {
        $this = this;

        document.getElementById("mesFin_impre").value = parseInt(
          document.getElementById("mesIni_impre").value
        );
        document.getElementById("añoFin_impre").value = parseInt(
          document.getElementById("añoIni_impre").value
        );
        document.getElementById("diaFin_impre").value =
          parseInt(document.getElementById("diaIni_impre").value) + 2;

        var dia_max;
        switch (document.getElementById("mesFin_impre").value) {
          case "01":
            dia_max = 31;
            break;
          case "02":
            dia_max = 28;
            break;
          case "03":
            dia_max = 31;
            break;
          case "04":
            dia_max = 30;
            break;
          case "05":
            dia_max = 31;
            break;
          case "06":
            dia_max = 30;
            break;
          case "07":
            dia_max = 31;
            break;
          case "08":
            dia_max = 31;
            break;
          case "09":
            dia_max = 30;
            break;
          case "10":
            dia_max = 31;
            break;
          case "11":
            dia_max = 30;
            break;
          case "12":
            dia_max = 31;
            break;
        }

        if (
          parseFloat(document.getElementById("diaFin_impre").value) > dia_max
        ) {
          document.getElementById("diaFin_impre").value =
            parseFloat(document.getElementById("diaFin_impre").value) - dia_max;
          document.getElementById("mesFin_impre").value =
            parseFloat(document.getElementById("mesFin_impre").value) + 1;
          if (parseFloat(document.getElementById("mesFin_impre").value) > 12) {
            document.getElementById("añoFin_impre").value =
              parseFloat(document.getElementById("añoFin_impre").value) + 1;
            document.getElementById("mesFin_impre").value = 01;
          }
          this.validarFechaFin_impre("1");
        } else {
          this.validarFechaFin_impre("1");
        }
      },

      validarFechaFin_impre(orden) {
        $this = this;
        validarInputs(
          {
            form: "#fechaFin_impre",
            orden: orden,
          },
          () => {
            this.validarFechaIni_impre("3");
          },
          () => {
            var dia_max;
            document.getElementById("diaFin_impre").value = cerosIzq(
              document.getElementById("diaFin_impre").value,
              2
            );
            document.getElementById("mesFin_impre").value = cerosIzq(
              document.getElementById("mesFin_impre").value,
              2
            );
            // var fechaFin = document.getElementById("añoFin_impre").value + document.getElementById("mesFin_impre").valuee + document.getElementById("diaFin_impre").value;
            var añoFin = parseFloat(
              document.getElementById("añoFin_impre").value
            );
            var diaFin = parseFloat(
              document.getElementById("diaFin_impre").value
            );
            var mesFin = parseFloat(
              document.getElementById("mesFin_impre").value
            );

            var añoInicial = parseFloat(
              document.getElementById("añoIni_impre").value
            );
            var diaInicial = parseFloat(
              document.getElementById("diaIni_impre").value
            );
            var mesInicial = parseFloat(
              document.getElementById("mesIni_impre").value
            );

            fecha_ini_glob =
              document.getElementById("añoIni_impre").value +
              document.getElementById("mesIni_impre").value +
              document.getElementById("diaIni_impre").value;
            fecha_fin_glob =
              document.getElementById("añoFin_impre").value +
              document.getElementById("mesFin_impre").value +
              document.getElementById("diaFin_impre").value;

            switch (document.getElementById("mesFin_impre").value) {
              case "01":
                dia_max = 31;
                break;
              case "02":
                dia_max = 28;
                break;
              case "03":
                dia_max = 31;
                break;
              case "04":
                dia_max = 30;
                break;
              case "05":
                dia_max = 31;
                break;
              case "06":
                dia_max = 30;
                break;
              case "07":
                dia_max = 31;
                break;
              case "08":
                dia_max = 31;
                break;
              case "09":
                dia_max = 30;
                break;
              case "10":
                dia_max = 31;
                break;
              case "11":
                dia_max = 30;
                break;
              case "12":
                dia_max = 31;
                break;
            }

            if (añoFin < añoInicial) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaFin_impre("1");
            } else if (mesFin < mesInicial && añoFin <= añoInicial) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaFin_impre("1");
            } else if (diaFin < diaInicial && mesFin == mesInicial) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaFin_impre("1");
            } else if (isNaN(añoFin)) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaFin_impre("1");
            } else if (isNaN(mesFin)) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaFin_impre("2");
            } else if (isNaN(diaFin)) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaFin_impre("3");
            } else if (parseInt(añoFin) < parseInt(moment().format("YYYY"))) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaFin_impre("1");
            } else if (parseInt(mesFin) < 1 || parseInt(mesFin) > 12) {
              CON851("37", "37", null, "error", "error");
              $this.validarFechaFin_impre("2");
            } else if (diaFin > dia_max) {
              CON851("03", "03", null, "error", "error");
              $this.validarFechaFin_impre("3");
            } else {
              $('[data-bb-handler="main"]').click();

              if (localStorage.idOpciondata == "07C1") {
                $this.cargarTablaFormulacion_HC003A_2();
              } else {
                $this.cargarTablaFormulacion_HC003A();
              }
            }
          }
        );
      },

      guardado_HC003A() {
        var bandera = 0;
        var data = {};
        var indice = $this.form.itm_003A - 1;
        var llave_w =
          $_REG_PACI.COD + $_REG_HC.suc_folio_hc.concat($_REG_HC.nro_folio_hc);

        if (this.novedad == '7') {
          var admin_w = localStorage.Usuario;
        } else {
          var admin_w = this.admin_edit;
        }

        var fecha_w = moment().format("YYYYMMDD");
        var fecha_ult = moment().format("YYMMDD");

        data["datosh"] =
          datosEnvio() +
          indice +
          "|" +
          llave_w +
          "|" +
          admin_w +
          "|" +
          fecha_w +
          "|" +
          fecha_ult +
          "|" +
          this.novedad +
          "|";

        if (this.novedad == '7') {
          data["medico_w"] = $_REG_PROF.IDENTIFICACION;
        } else {
          data["medico_w"] = $this.consultOper.ID;
        }
        data["unserv_w"] = $_REG_HC.unser_hc;
        data["edad_w"] = $_HC003A._hcprc.edad;

        for (var i in $this.hc003a.tablaMedica) {
          data[
            `año_${cerosIzq(parseInt(i) + 1, 3)}`
          ] = $this.hc003a.tablaMedica[i].año.toString();
          data[
            `mes_${cerosIzq(parseInt(i) + 1, 3)}`
          ] = $this.hc003a.tablaMedica[i].mes.toString();
          data[
            `dia_${cerosIzq(parseInt(i) + 1, 3)}`
          ] = $this.hc003a.tablaMedica[i].dia.toString();
          data[
            `hora_${cerosIzq(parseInt(i) + 1, 3)}`
          ] = $this.hc003a.tablaMedica[i].hora.substring(0, 2);
          data[
            `minutos_${cerosIzq(parseInt(i) + 1, 3)}`
          ] = $this.hc003a.tablaMedica[i].hora.substring(3, 5);
          data[`cod_Medicamento_${cerosIzq(parseInt(i) + 1, 3)}`] =
            $this.hc003a.tablaMedica[i].cod_Medicamento;
          data[`cantidad_formu_${cerosIzq(parseInt(i) + 1, 3)}`] =
            $this.hc003a.tablaMedica[i].cantidadFormu;
          data[`cantidad_${cerosIzq(parseInt(i) + 1, 3)}`] =
            $this.hc003a.tablaMedica[i].cantidad;
          data[`Cod_medida_cantidad_${cerosIzq(parseInt(i) + 1, 3)}`] =
            $this.hc003a.tablaMedica[i].codigo_cantidad_medida;
          data[`cantidad_medida_${cerosIzq(parseInt(i) + 1, 3)}`] =
            $this.hc003a.tablaMedica[i].cantidad_Medida;
          data[`tiempo_${cerosIzq(parseInt(i) + 1, 3)}`] =
            $this.hc003a.tablaMedica[i].tiempo;
          data[`cod_tiempo_${cerosIzq(parseInt(i) + 1, 3)}`] =
            $this.hc003a.tablaMedica[i].codigo_tiempo;
          data[`tiempo_medida_${cerosIzq(parseInt(i) + 1, 3)}`] =
            $this.hc003a.tablaMedica[i].medida_Tiempo;
          data[`Cod_via_${cerosIzq(parseInt(i) + 1, 3)}`] =
            $this.hc003a.tablaMedica[i].codigo_via;
          data[`via_${cerosIzq(parseInt(i) + 1, 3)}`] =
            $this.hc003a.tablaMedica[i].vias;
          data[`observaciones_${cerosIzq(parseInt(i) + 1, 3)}`] =
            $this.hc003a.tablaMedica[i].observaciones.replace(/(\r\n|\n|\r)/gm, "&");

          bandera = 1;
        }

        $this.data = data;

        // toastr.success("Información guardada");
        // this.ventanaFecha_HC003A();

        console.log(data);

        if (bandera == 1) {
          postData(data, get_url("APP/HICLIN/HC003A-2.DLL"))
            .then((data) => {
              console.log(data);
              console.log("entro al dll a guardar");
              if (this.novedad == '7') {
                toastr.success("Información guardada");
              } else {
                toastr.success("Información actualizada");
              }
              setTimeout(() => {
                $this.impresion_HC003A();
              }, 350);
            })
            .catch((err) => {
              toastr.error("Error en guardado");
              _regresar_menuhis();
              console.log(err, "error");
              loader("hide");
            });
        } else {
          console.log("No hay datos para guardar");
          toastr.error("Error en guardado");
          _regresar_menuhis();
          loader("hide");
        }
      },

      impresion_HC003A() {
        $this = this;
        CON851P(
          "00",
          () => {
            _regresar_menuhis();
          },
          () => {
            setTimeout(() => {
              this.ventanaFecha_HC003A();
            }, 300);
          }
        );
      },

      _ventanaMedicamentos_HC003A() {
        _ventanaDatos({
          titulo: "VENTANA DE CONSULTA DE FARMACOS",
          columnas: [
            "cod_formu",
            "Nombre",
            "Formulado",
            "Pedido",
            "Adm",
            "Facturado",
            "Devol_Enfer",
            "Por_Administrar",
          ],
          data: $this.tabla_formulado,
          ancho: "1200px",
          callback_esc: function () {
            document.querySelector(".medicamentos_003A").focus();
          },
          callback: function (data) {
            $this.form.medicamentos_003A = data.cod_formu.trim();
            _enterInput(".medicamentos_003A");
          },
        });
      },

      ventana_operadores() {
        _ventanaDatos({
          titulo: "VENTANA CONSULTA DE OPERADORES",
          columnas: ["CODIGO", "DESCRIPCION"],
          data: $_HC003A.operadores,
          callback_esc: function () {
            document.querySelector(".oper_003A").focus();
          },
          callback: function (data) {
            $this.form.oper_003A = data["CODIGO"];
            setTimeout(() => {
              _enterInput(".oper_003A");
            }, 200);
          },
        });
      },

      cargarTablaFormulacion_HC003A() {
        var llave_w =
          $_REG_PACI.COD + $_REG_HC.suc_folio_hc.concat($_REG_HC.nro_folio_hc);
        var admin_w = localStorage.Usuario;
        var fecha_ult = moment().format("YYMMDD");

        postData(
          {
            datosh:
              datosEnvio() +
              llave_w +
              "|" +
              fecha_ini_glob +
              "|" +
              fecha_fin_glob +
              "|" +
              admin_w +
              "|" +
              fecha_ult +
              "|",
          },
          get_url("APP/HICLIN/HC003A-3.DLL")
        )
          .then((data) => {
            $this.hc003a._tablaFormu = data.TABLA_FORMU;
            $this.hc003a._tablaFormu.pop();
            this.imprimir_Tabla_HC003A();
          })
          .catch((err) => {
            console.log(err, "err");
            loader("hide");
            _regresar_menuhis();
          });
      },

      async cargarTablaFormulacion_HC003A_2() {
        var llave_w =
          $_REG_PACI.COD + $_REG_HC.suc_folio_hc.concat($_REG_HC.nro_folio_hc);
        var admin_w = localStorage.Usuario;
        var fecha_ult = moment().format("YYMMDD");

        await postData(
          {
            datosh:
              datosEnvio() +
              llave_w +
              "|" +
              fecha_ini_glob +
              "|" +
              fecha_fin_glob +
              "|" +
              admin_w +
              "|" +
              fecha_ult +
              "|",
          },
          get_url("APP/HICLIN/HC003A-4.DLL")
        )
          .then(async (data) => {
            $this.hc003a._tablaFormu = data.TABLA_FORMU2;
            $this.hc003a._tablaFormu.pop();

            await this.imprimir_Tabla_HC003A_2();
          })
          .catch((err) => {
            console.log(err, "err");
            loader("hide");
            _regresar_menuhis();
          });
      },

      _deleteItemFormu_HC003A(element) {
        let item = parseFloat(element.srcElement.value);

        if (element.srcElement.checked) {
          CON850_P(
            (e) => {
              element.srcElement.checked = false;
              _fin_validar_form();
              if (e.id == "S") {
                // let filtro = $this.hc003a.tablaMedica.filter(
                //   (e) => e.item != item
                // );

                // console.log(filtro);
                // $this.hc003a.tablaMedica = JSON.parse(JSON.stringify(filtro));

                // $this.hc003a.tablaMedica.map((a, b) => {
                //   a.item = b + 1;
                //   return a;
                // });

                var posi2 = item - 1;

                $this.form = {
                  itm_003A: $this.hc003a.tablaMedica[posi2].item,
                  año_003A: $this.hc003a.tablaMedica[posi2].año,
                  mes_003A: $this.hc003a.tablaMedica[posi2].mes,
                  dia_003A: $this.hc003a.tablaMedica[posi2].dia,
                  hora_003A: $this.hc003a.tablaMedica[posi2].hora.substring(
                    0,
                    2
                  ),
                  minutos_003A: $this.hc003a.tablaMedica[posi2].hora.substring(
                    3,
                    5
                  ),
                  medicamentos_003A:
                    $this.hc003a.tablaMedica[posi2].cod_Medicamento,
                  descrip_003A: $this.hc003a.tablaMedica[posi2].medicamento,
                  cantidadFormu_003A:
                    $this.hc003a.tablaMedica[posi2].cantidadFormu,
                  cantidad_003A: $this.hc003a.tablaMedica[posi2].cantidad,
                  medida_003A: $this.hc003a.tablaMedica[posi2].cantidad_Medida,
                  tiempo_003A: $this.hc003a.tablaMedica[posi2].tiempo,
                  tiempoCada_003A:
                    $this.hc003a.tablaMedica[posi2].medida_Tiempo,
                  vias_003A: $this.hc003a.tablaMedica[posi2].vias,
                  obser_003A: $this.hc003a.tablaMedica[posi2].observaciones,
                };

                $this.banderaEdit = true;
                this.bandera = false;

                this.form.oper_003A = this.admin_edit;

                $this.validarInputs_HC003A();
                this.validarMinutos_HC003A();
              } else this.validarMedicamento_HC003A();
            },
            { msj: "Desea modificar el item ?" }
          );
        } else element.srcElement.checked = false;
      },

      async cargarArchivos_HC003A() {
        loader("show");
        $this = this;

        await postData(
          {
            datosh: datosEnvio(),
          },
          get_url("APP/CONTAB/CON982.DLL")
        )
          .then((data) => {
            data.ARCHREST.pop();
            $_HC003A.operadores = data.ARCHREST;
          })
          .catch((err) => {
            loader("hide");
            console.log("Error leyendo operadores ", err);
            _regresar_menuhis();
          });

        await postData(
          { datosh: datosEnvio() },
          get_url("app/SALUD/SER819.DLL")
        )
          .then((data) => {
            $_HC003A._profesionales = data.ARCHPROF;
            $_HC003A._profesionales.pop();
          })
          .catch((err) => {
            console.log(err, "error");
            loader("hide");
            _regresar_menuhis();
          });

        await postData(
          { datosh: datosEnvio() },
          get_url("APP/SALUD/SER873.DLL")
        )
          .then((data) => {
            $_HC003A._unserv = data.UNSERV;
          })
          .catch((err) => {
            console.log(err, "err");
            loader("hide");
            _regresar_menuhis();
          });

        await postData(
          { datosh: datosEnvio() },
          get_url("APP/SALUD/SER809.DLL")
        )
          .then((data) => {
            $_HC003A._farmacia = data.FARMACOS;
          })
          .catch((err) => {
            console.log(err, "err");
            loader("hide");
            _regresar_menuhis();
          });

        await postData(
          { datosh: datosEnvio() + "0105" + "ISH521" },
          get_url("APP/CONTAB/CON904S.DLL")
        )
          .then((data) => {
            $_HC003A._restri = data;
          })
          .catch((err) => {
            console.log(err, "err");
            loader("hide");
            _regresar_menuhis();
          });

        await postData(
          { datosh: datosEnvio() },
          get_url("app/SALUD/SER853.DLL")
        )
          .then((data) => {
            $_HC003A._entidades = data.ENTIDADES;
          })
          .catch((err) => {
            console.log(err, "error");
            loader("hide");
            _regresar_menuhis();
          });

        await postData(
          { datosh: datosEnvio() },
          get_url("app/CONTAB/CON809.DLL")
        )
          .then((data) => {
            $_HC003A._ciudades = data.CIUDAD;
          })
          .catch((err) => {
            console.log(err, "error");
            loader("hide");
            _regresar_menuhis();
          });

        await postData(
          { datosh: datosEnvio() },
          get_url("app/SALUD/SER854.DLL")
        )
          .then((data) => {
            $_HC003A._ocupaciones = data.OCUPACIONES;
          })
          .catch((err) => {
            console.log(err, "error");
            loader("hide");
            _regresar_menuhis();
          });

        await postData(
          { datosh: datosEnvio() },
          get_url("app/SALUD/SER855.DLL")
        )
          .then((data) => {
            $_HC003A._especialidades = data.ESPECIALIDADES;
          })
          .catch((err) => {
            console.log(err, "error");
            loader("hide");
            _regresar_menuhis();
          });

        let datos = {
          datosh: datosEnvio(),
          llave_hc: $_REG_HC.llave_hc,
        };

        await postData(datos, get_url("app/HICLIN/HC527.DLL"))
          .then((data) => {
            data.REG_DEVOLUCION.forEach((item) => {
              if (item.cod_formu != "") {
                let new_data = {
                  Nombre: item.nombre_formu,
                  Formulado: item.cant_formu,
                  Pedido: item.cant_ped,
                  Adm: item.cant_adm,
                  Facturado: item.cant_fact,
                  Devol_Enfer: item.cant_devo,
                  Por_Administrar: item.cant_por_devolver,
                };
                $this.tabla_formulado.push(Object.assign(item, new_data));
              }
            });
          })
          .catch((err) => {
            loader("hide");
            _regresar_menuhis();
          });

        await postData(
          {
            datosh:
              datosEnvio() +
              $_REG_HC.llave_hc +
              "|" +
              localStorage.Usuario +
              "|" +
              "1",
          },
          get_url("app/HICLIN/HC_PRC.DLL")
        )
          .then((data) => {
            $_HC003A._hcprc = data.HCPAC;
            loader("hide");
            $this._inicializar();
          })
          .catch((err) => {
            console.log(err, "error");
            loader("hide");
            _regresar_menuhis();
          });
      },
    },
  });
