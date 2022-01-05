// Listado Referencia - 20/04/2021 - David.M

new Vue({
  el: "#HCBI04",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    paciente: "",
    ano_ini: 0,
    mes_ini: 0,
    dia_ini: 0,
    ano_fin: 0,
    mes_fin: 0,
    dia_fin: 0,
    array_pacientes: [],
    fecha_act: moment().format("YYYYMMDD"),
    nit_usu: $_USUA_GLOBAL[0].NIT,
    descrip_paciente: "",
  },
  created() {
    nombreOpcion("B4 Informe referenciación");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoPaciente();
  },
  methods: {
    datoPaciente() {
      if (!this.paciente.trim()) this.paciente = "*";
      validarInputs(
        {
          form: "#paciente",
        },
        () => {
          _regresar_menuhis();
        },
        () => {
          if (this.paciente == "*") {
            this.descrip_paciente = "Todos los pacientes";
            this.fechaInicial("1");
          } else {
            if (this.paciente.trim()) {
              postData(
                { datosh: datosEnvio() + this.paciente.padStart(15, "0") },
                get_url("APP/SALUD/SER810-1.DLL")
              )
                .then((data) => {
                  this.paciente = data["REG-PACI"][0].COD;
                  this.descrip_paciente = data["REG-PACI"][0].DESCRIP;
                  this.fechaInicial("1");
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
          this.datoPaciente();
        },
        () => {
          this.ano_ini = cerosIzq(this.ano_ini, 4);
          this.mes_ini = cerosIzq(this.mes_ini, 2);
          this.dia_ini = cerosIzq(this.dia_ini, 2);
          this.inicial = `${this.ano_ini}${this.mes_ini}${this.dia_ini}`;

          if (this.ano_ini < 1900) {
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

          if (this.ano_fin < 1900) {
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
            this.consultaDll();
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
          let datos = [
            this.paciente == "*"
              ? this.paciente
              : this.paciente.padStart(15, "0"),
            this.inicial,
            this.final,
          ];

          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.inicial).format(
            "YYYY/MM/DD"
          )} - ${moment(this.final).format("YYYY/MM/DD")}`;
          this.progreso = { transferred: 0, speed: 0 };

          postData(
            { datosh: datosEnvio() + datos.join("|") + "|" },
            get_url("app/HICLIN/HCBI04.DLL"),
            {
              onProgress: (progress) => {
                this.progreso = progress;
              },
            }
          )
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
              this.imprimir(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.fechaFinal("3");
            });
        }
      );
    },

    imprimir(data) {
      data.REG_REF.pop();

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = this.nit_usu.toString();
      let fecha = moment().format("MMM DD/YY");

      for (let i in data.REG_REF) {
        data.REG_REF[i].DOCUM = parseInt(i) + 1;
        data.REG_REF[i].HORA_REF = _editHora(data.REG_REF[i].HORA_REF);
        data.REG_REF[i].CUP_EDIT = `${data.REG_REF[i].CUP_REF} - ${data.REG_REF[i].DESCRIP_CUP}`
      }

      if (data.REG_REF.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.fechaFinal("3");
      } else {
        let columnas = [
          {
            title: "Tipo",
            value: "TIPO_REF",
            filterButton: true,
          },
          {
            title: "Docum",
            value: "DOCUM",
            filterButton: true,
          },
          {
            title: "Fecha",
            value: "FECHA_REF",
            format: "fecha",
            filterButton: true,
          },
          {
            title: "Hora",
            value: "HORA_REF",
            format: "string",
            filterButton: true,
          },
          {
            title: "Tip Doc",
            value: "TIPO_ID_PACI",
            filterButton: true,
          },
          {
            title: "ID Paciente",
            value: "ID_REF",
            filterButton: true,
          },
          {
            title: "1er Apellido",
            value: "1ER_APEL_PACI",
          },
          {
            title: "2do Apellido",
            value: "2DO_APEL_PACI",
          },
          {
            title: "1er Nombre",
            value: "1ER_NOM_PACI",
          },
          {
            title: "2do Nombre",
            value: "2DO_NOM_PACI",
          },
          {
            title: "Fecha Nacimiento",
            value: "NACIM_PACI",
            format: "fecha",
          },
          {
            title: "Edad",
            value: "EDAD_REF",
          },
          {
            title: "Sexo",
            value: "SEXO_PACI",
          },
          {
            title: "DIagn",
            value: "DIAG_PRIN_REF",
          },
          {
            title: "Descripciòn",
            value: "DESCRIP_DIAG_PRIN_REF",
          },
          {
            title: "Eps paci",
            value: "EPS_REF",
          },
          {
            title: "Nombre Eps",
            value: "NOMBRE_ENT",
          },
          {
            title: "Unidad de servicio",
            value: "DESCRIP_UNID_SERV",
          },
          {
            title: "Atendio",
            value: "DESCRIP_PROF",
          },
          {
            title: "Especialidad",
            value: "NOMBRE_ESP_MED",
          },
          {
            title: "Codigo Cups",
            value: "CUP_EDIT",
            format: "string"
          },
          {
            title: "Aceptada",
            value: "ACEPTADA_REF",
          },
          {
            title: "Funcionario Ips",
            value: "FUNCIONARIO_IPS_REF",
          },
          {
            title: "Medico acepta Ips",
            value: "MEDICO_ACEPTA_REF",
          },
          {
            title: "Ips",
            value: "IPS_REF",
          },
          {
            title: "Nombre Ips",
            value: "NOMBRE_IPS_REF",
          },
          {
            title: "Operador",
            value: "OPER_ELAB_REF",
          },
          {
            title: "Soporte",
            value: "SOPORTES_REF",
          },
          {
            title: "Espec remit",
            value: "NOMBRE_ESPECIA_REMT",
          },
        ];

        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE ATENCIÒN     NIT: ${nit}`,
          `Fecha de reporte: ${fecha}`,
          `Periodo desde: ${this.inicial}  Hasta: ${this.final}`,
        ];

        _impresion2({
          tipo: "excel",
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: data.REG_REF,
          },
          archivo: localStorage.Usuario + moment().format('-YYMMDD-HHmmss'),
          scale: "75",
          orientation: "landscape",
        })
          .then(() => {
            CON851("", "Generando informe", null, "success", "");
            loader("hide");
            _regresar_menuhis();
            this.estado_loader = false;
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error generando impresion", null, "error", "Error");
            loader("hide");
            this.fechaFinal("3");
            this.estado_loader = false;
          });
      }
    },

    _ventanaPacientes() {
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre del paciente"],
        f8data: "PACIENTES",
        columnas: [
          { title: "COD" },
          { title: "NOMBRE" },
          { title: "EPS" },
          { title: "EDAD" },
        ],
        cancel: () => {
          document.querySelector(".paciente").focus();
        },
        callback: (data) => {
          console.log(data);
          this.paciente = cerosIzq(data.COD, 15);
          this.descrip_paciente = data.NOMBRE;
          _enterInput(".paciente");
          //   this.fechaInicial();
        },
      };
      F8LITE(parametros);
    },
  },
});
