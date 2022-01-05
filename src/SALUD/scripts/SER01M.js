// Informe SISVAN Control y Desarrollo - 9-5-7-1 - 11/05/2021 - David.M

new Vue({
  el: "#SER01M",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    informe: "",
    descrip_informe: "",
    ano_ini: 0,
    mes_ini: 0,
    dia_ini: 0,
    ano_fin: 0,
    mes_fin: 0,
    dia_fin: 0,
    fecha_act: moment().format("YYYYMMDD"),
    nit_usu: $_USUA_GLOBAL[0].NIT,
  },
  created() {
    nombreOpcion("9-5-7-2 - Sisvan Maternas");
    _inputControl("reset");
    _inputControl("disabled");
    this.ventanaSisvan();
  },
  methods: {
    ventanaSisvan() {
      POPUP(
        {
          titulo: "Seleccione",
          array: [
            { COD: "1", DESCRIP: "SISVAN GESTANTES" },
            { COD: "2", DESCRIP: "SISVAN NIÑOS" },
          ],
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.informe,
          callback_f: _regresar_menuhis,
        },
        (data) => {
          this.informe = data.COD;
          if(this.informe == "1") {
              this.descrip_informe = "GESTANTES";
            } else {
              this.descrip_informe = "NIÑOS";
          }
          this.datoFechaIni("2");
        }
      );
    },

    datoFechaIni(orden) {
      if (!this.mes_ini) {
        this.ano_ini = this.fecha_act.slice(0, 4);
        this.mes_ini = this.fecha_act.slice(4, 6);
        this.dia_ini = "01";
      }
      validarInputs(
        {
          form: "#fecha_inicial",
          orden: orden,
        },
        () => {
          this.ventanaSisvan();
        },
        () => {
          this.ano_ini = cerosIzq(this.ano_ini, 4);
          this.mes_ini = cerosIzq(this.mes_ini, 2);
          this.dia_ini = cerosIzq(this.dia_ini, 2);
          this.inicial = `${this.ano_ini}${this.mes_ini}${this.dia_ini}`;

          if (isNaN(moment(this.inicial).format("YYYYMMDD"))) {
            CON851("", "37", null, "error", "");
            this.datoFechaIni("3");
          } else {
            this.datoFechaFin("2");
          }
        }
      );
    },

    datoFechaFin(orden) {
      if (!this.mes_fin) {
        this.ano_fin = this.ano_ini;
        this.mes_fin = this.mes_ini;
        this.dia_fin = this.dia_ini;
      }
      validarInputs(
        {
          form: "#fecha_final",
          orden: orden,
        },
        () => {
          this.datoFechaIni("3");
        },
        () => {
          this.ano_fin = cerosIzq(this.ano_fin, 4);
          this.mes_fin = cerosIzq(this.mes_fin, 2);
          this.dia_fin = cerosIzq(this.dia_fin, 2);
          this.final = `${this.ano_fin}${this.mes_fin}${this.dia_fin}`;

          if (isNaN(moment(this.final).format("YYYYMMDD"))) {
            CON851("", "37", null, "error", "");
            this.datoFechaFin("3");
          } else if (parseInt(this.final) < parseInt(this.inicial)) {
            CON851("", "37", null, "error", "");
            this.datoFechaFin("3");
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
          this.datoFechaFin("3");
        },
        () => {
          let datos = [this.informe, this.inicial, this.final];

          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.inicial).format("YYYY/MM/DD")} - ${moment(this.final).format(
            "YYYY/MM/DD"
          )}`;
          this.progreso = { transferred: 0, speed: 0 };

          postData({ datosh: datosEnvio() + datos.join("|") + "|" }, get_url("app/SALUD/SER01M.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
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
              this.datoFechaFin("3");
            });
        }
      );
    },

    imprimir(data) {
      data.LISTADO.pop();

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = this.nit_usu.toString();
      let fecha = moment().format("MMM DD/YY - HH:mm");

      if (data.LISTADO.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoFechaFin("3");
      } else {
        let columnas = [];

        if (this.informe == "1") {
          columnas = [
            {
              title: "Fecha de Consulta",
              value: "FECHA_MAT_SIS",
              format: "fecha",
              filterButton: true,
            },
            {
              title: "Tipo Id",
              value: "TIPO_ID_PACI",
              filterButton: true,
            },
            {
              title: "Identificación",
              value: "COD_SIS",
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
              title: "Área",
              value: "ZONA_PACI",
            },
            {
              title: "Barrio o Vereda",
              value: "BARRIO_SIS",
            },
            {
              title: "Dirección",
              value: "DIRECC_PACI",
            },
            {
              title: "Telefono",
              value: "TELEFONO_PACI",
            },
            {
              title: "Fecha Nac",
              value: "NACIM_PACI",
              format: "fecha",
            },
            {
              title: "Edad",
              value: "VLR_EDAD",
            },
            {
              title: "Fur",
              value: "FECHA_FUR_MAT_SIS",
              format: "fecha",
            },
            {
              title: "Grupo Etnico",
              value: "ETNIA_PACI",
            },
            {
              title: "Cual",
              value: "DESCRIP_ETNIA",
            },
            {
              title: "Peso en Kg",
              value: "PESO_MAT_SIS",
            },
            {
              title: "Talla Cm",
              value: "TALLA_MAT_SIS",
            },
            {
              title: "Grupo Poblacional",
              value: "DISCAP",
            },
            {
              title: "Asiste Controles",
              value: "ASIST_CONTR",
            },
            {
              title: "Valor Hemoglobina",
              value: "HEMOGLOB_MAT_SIS",
            },
            {
              title: "Trimestre",
              value: "TRIMESTR_MAT_SIS",
            },
            {
              title: "Calcio",
              value: "CALCIO",
            },
            {
              title: "Hierro",
              value: "HIERRO",
            },
            {
              title: "Acido Folico",
              value: "ACIDOF",
            },
            {
              title: "Servicio Prestado",
              value: "SERV_PREST",
            },
            {
              title: "Beneficiario de algun Programa",
              value: "BENEFIC",
            },
            {
              title: "Cual Benef",
              value: "CUAL_BENEFIC",
            },
            {
              title: "Eps",
              value: "EPS_PACI",
              format: "string"
            },
            {
              title: "Administradora de Salud",
              value: "NOMBRE_ENT",
            },
            {
              title: "Regimen",
              value: "TIPO_PACI",
            },
          ];
        } else {
          columnas = [
            {
              title: "Fecha de Consulta",
              value: "FECHA_CONTROL",
              format: "fecha",
              filterButton: true,
            },
            {
              title: "Tipo Id",
              value: "TIPO_ID_PACI",
              filterButton: true,
            },
            {
              title: "Identificación",
              value: "COD_SIS",
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
              title: "Área",
              value: "ZONA_PACI",
            },
            {
              title: "Barrio o Vereda",
              value: "BARRIO_SIS",
            },
            {
              title: "Dirección",
              value: "DIRECC_PACI",
            },
            {
              title: "Telefono",
              value: "TELEFONO_PACI",
            },
            {
              title: "Fecha Nac",
              value: "NACIM_PACI",
              format: "fecha",
            },
            {
              title: "Edad (meses)",
              value: "EDAD_MESES",
            },
            {
              title: "Sexo",
              value: "SEXO_PACI",
            },
            {
              title: "Grupo Etnico",
              value: "ETNIA_PACI",
            },
            {
              title: "Cual",
              value: "DESCRIP_ETNIA",
            },
            {
              title: "Grupo Poblacional",
              value: "DISCAP",
            },
            {
              title: "Peso en Kg",
              value: "PESO_CONTROL",
            },
            {
              title: "Talla Cm",
              value: "TALLA_CONTROL",
            },
            {
              title: "Perim Cef",
              value: "PER_CEF_CONTROL",
            },
            {
              title: "Era",
              value: "ERA",
            },
            {
              title: "Eda",
              value: "EDA",
            },
            {
              title: "Lact Actual",
              value: "LACT_ACT",
            },
            {
              title: "Lact Exclus",
              value: "LACT_EXCLUS",
            },
            {
              title: "CyD",
              value: "FINALID_CONTR",
            },
            {
              title: "Servicio Prestado",
              value: "SERV_PREST",
            },
            {
              title: "Neumonia",
              value: "NEUMO",
            },
            {
              title: "Convulsiones",
              value: "CONVU",
            },
            {
              title: "Sifilis Congenita",
              value: "SIFIL",
            },
            {
              title: "Otitis Media Supura",
              value: "OTITI",
            },
            {
              title: "Tuberculosis Pulmonar",
              value: "TUBER",
            },
            {
              title: "Vih",
              value: "VIH",
            },
            {
              title: "Otra Causa",
              value: "DIAGN_CONTR",
            },
            {
              title: "Beneficiario de algun Programa",
              value: "BENEFIC",
            },
            {
              title: "Cual Benef",
              value: "CUAL_BENEFIC",
            },
            {
              title: "Eps",
              value: "EPS_PACI",
              format: "string"
            },
            {
              title: "Administradora de Salud",
              value: "NOMBRE_ENT",
            },
          ];
        }

        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `Listado Sistema de Vigilancia Alimentaria Nutricional SISVAN ${this.informe == 2 ? "Menores de 18 Años" : ""}     NIT: ${nit}`,
          `Fecha de reporte: ${fecha}`,
        ];

        _impresion2({
          tipo: "excel",
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: data.LISTADO,
          },
          archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss"),
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
            this.datoFechaFin("3");
            this.estado_loader = false;
          });
      }
    },
  },
});
