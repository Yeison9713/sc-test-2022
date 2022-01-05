// Historial de referenciacion - B3 - 26/04/2021 - David.M

new Vue({
  el: "#HCB04",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    ano_ini: 0,
    mes_ini: 0,
    dia_ini: 0,
    ano_fin: 0,
    mes_fin: 0,
    dia_fin: 0,
    operador: "",
    paciente: "",
    array_operadores: [],
    array_pacientes: [],
    fecha_act: moment().format("YYYYMMDD"),
    nit_usu: $_USUA_GLOBAL[0].NIT,
    descrip_paciente: "",
  },
  created() {
    nombreOpcion("B3 Historial referenciación");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerOperadores();
  },
  computed: {
    descrip_operador() {
      if (this.operador == "****") {
        return "Todos los operadores";
      } else {
        let busqueda = this.array_operadores.find((e) => e.CODIGO == this.operador);
        if (busqueda) return busqueda.DESCRIPCION;
        else return "";
      }
    },
  },
  methods: {
    fechaInicial(orden) {
      if (this.mes_ini == 0) {
        this.dia_ini = "01";
        this.mes_ini = this.fecha_act.slice(4, 6);
        this.ano_ini = this.fecha_act.slice(0, 4);
      }
      validarInputs(
        {
          form: "#fecha_inicial",
          orden: orden,
        },
        () => {
          _regresar_menuhis();
        },
        () => {
          this.ano_ini = cerosIzq(this.ano_ini, 4);
          this.mes_ini = cerosIzq(this.mes_ini, 2);
          this.dia_ini = cerosIzq(this.dia_ini, 2);
          this.inicial = `${this.ano_ini}${this.mes_ini}${this.dia_ini}`;

          if (this.ano_ini < 1900 || this.ano_ini > this.fecha_act.slice(0, 4)) {
            CON851("37", "37", null, "error", "error");
            this.fechaInicial("1");
          } else if (this.mes_ini < 1 || this.mes_ini > 12) {
            CON851("37", "37", null, "error", "error");
            this.fechaInicial("2");
          } else if (this.dia_ini < 1 || this.dia_ini > 31) {
            CON851("37", "37", null, "error", "error");
            this.fechaInicial("3");
          } else {
            this.fechaFinal("1");
          }
        }
      );
    },

    fechaFinal(orden) {
      if (this.mes_fin == 0) {
        this.dia_fin = this.fecha_act.slice(6);
        this.mes_fin = this.fecha_act.slice(4, 6);
        this.ano_fin = this.fecha_act.slice(0, 4);
      }
      validarInputs(
        {
          form: "#fecha_final",
          orden: orden,
        },
        () => {
          this.fechaInicial("3");
        },
        () => {
          this.ano_fin = cerosIzq(this.ano_fin, 4);
          this.mes_fin = cerosIzq(this.mes_fin, 2);
          this.dia_fin = cerosIzq(this.dia_fin, 2);
          this.final = `${this.ano_fin}${this.mes_fin}${this.dia_fin}`;

          if (this.ano_fin < 1900 || this.ano_fin > this.fecha_act.slice(0, 4)) {
            CON851("37", "37", null, "error", "error");
            this.fechaFinal("1");
          } else if (this.mes_fin < 1 || this.mes_fin > 12) {
            CON851("37", "37", null, "error", "error");
            this.fechaFinal("2");
          } else if (this.dia_fin < 1 || this.dia_fin > 31) {
            CON851("37", "37", null, "error", "error");
            this.fechaFinal("3");
          } else if (this.final < this.inicial) {
            CON851("", "37", null, "error", "");
            this.fechaFinal("1");
          } else {
            this.datoOperador();
          }
        }
      );
    },

    datoOperador() {
      if (!this.operador.trim()) this.operador = "****";
      validarInputs(
        {
          form: "#operador",
        },
        () => {
          this.fechaFinal("3");
        },
        () => {
          if (this.operador == "****") {
            this.datoPaciente();
          } else {
            if (this.operador.trim()) {
              let busqueda = this.array_operadores.find((e) => e.CODIGO == this.operador);
              if (busqueda) {
                this.datoPaciente();
              } else {
                CON851("", "01", null, "error", "");
                this.datoOperador();
              }
            } else {
              CON851("", "01", null, "error", "");
              this.datoOperador();
            }
          }
        }
      );
    },

    datoPaciente() {
      if (!this.paciente.trim()) this.paciente = "99";
      validarInputs(
        {
          form: "#paciente",
        },
        () => {
          this.datoOperador();
        },
        () => {
          if (this.paciente == "99") {
            this.descrip_paciente = "Todos los pacientes";
            this.consultaDll();
          } else {
            if (this.paciente.trim()) {
              postData({ datosh: datosEnvio() + this.paciente.padStart(15, "0") }, get_url("APP/SALUD/SER810-1.DLL"))
                .then((data) => {
                  this.paciente = data["REG-PACI"][0].COD;
                  this.descrip_paciente = data["REG-PACI"][0].DESCRIP;
                  this.consultaDll();
                })
                .catch((error) => {
                  console.error(error);
                  CON851("", "Error consultando paciente", null, "error", "");
                  this.datoPaciente();
                });
            } else {
              CON851("", "01", null, "error", "");
              this.datoPaciente();
            }
          }
        }
      );
    },

    consultaDll() {
      CON851P(
        "00",
        () => {
          this.fechaFinal("3");
        },
        () => {
          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.inicial).format("YYYY/MM/DD")} - ${moment(this.final).format(
            "YYYY/MM/DD"
          )}`;
          this.progreso = { transferred: 0, speed: 0 };

          const { imprimir_HCBI01 } = require("../../frameworks/pdf/hiclin/HCBI01.formato.js");

          imprimir_HCBI01({
            llave_ref_w: $_REG_HC.llave_hc,
            fecha_ini_w: this.inicial,
            fecha_fin_w: this.final,
            operador_w: this.operador,
            paciente_w: this.paciente == "99" ? this.paciente : this.paciente.padStart(15, "0"),
            paso_w: 3,
            paci: $_REG_PACI,
            callback_error: () => {
              this.loader = false;
              this.estado_loader = false;
              _regresar_menuhis();
            },
            callback: () => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
              this.estado_loader = false;
              _regresar_menuhis();
            },
          });
        }
      );
    },

    _ventanaOperadores() {
      _ventanaDatos({
        titulo: "VENTANA DE OPERADORES",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: this.array_operadores,
        callback_esc: () => {
          document.querySelector(".operador").focus();
        },
        callback: (data) => {
          this.operador = data.CODIGO;
          _enterInput(".operador");
        },
      });
    },

    _ventanaPacientes() {
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre del paciente"],
        f8data: "PACIENTES",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }, { title: "EDAD" }],
        cancel: () => {
          document.querySelector(".paciente").focus();
        },
        callback: (data) => {
          console.log(data);
          this.paciente = cerosIzq(data.COD, 15);
          this.descrip_paciente = data.NOMBRE;
          _enterInput(".paciente");
        },
      };
      F8LITE(parametros);
    },

    traerOperadores() {
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON982.DLL"))
        .then((data) => {
          this.array_operadores = data.ARCHREST;
          this.array_operadores.pop();
          loader("hide");
          this.fechaInicial("1");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
