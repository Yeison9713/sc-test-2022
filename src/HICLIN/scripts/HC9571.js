// Informe SISVAN Control y Desarrollo - 9-5-7-1 - 11/05/2021 - David.M

new Vue({
  el: "#HC9571",
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
    fecha_act: moment().format("YYYYMMDD"),
    nit_usu: $_USUA_GLOBAL[0].NIT,
  },
  created() {
    nombreOpcion("9-5-7-1 - Sisvan Crecimiento Y Desarrollo");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoFechaIni("1");
  },
  methods: {
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
          _regresar_menuhis();
        },
        () => {
          this.ano_ini = cerosIzq(this.ano_ini, 4);
          this.mes_ini = cerosIzq(this.mes_ini, 2);
          this.dia_ini = cerosIzq(this.dia_ini, 2);
          this.inicial = `${this.ano_ini}${this.mes_ini}${this.dia_ini}`;

          if (
            parseInt(this.ano_ini) > parseInt(this.fecha_act.slice(0, 4)) ||
            parseInt(this.ano_ini) < parseInt(this.fecha_act.slice(0, 4)) - 5
          ) {
            CON851("", "37", null, "error", "");
            this.datoFechaIni("1");
          } else if (isNaN(moment(this.inicial).format("YYYYMMDD"))) {
            CON851("", "37", null, "error", "");
            this.datoFechaIni("3");
          } else {
            this.datoFechaFin("1");
          }
        }
      );
    },

    datoFechaFin(orden) {
      if (!this.mes_fin) {
        this.ano_fin = this.fecha_act.slice(0, 4);
        this.mes_fin = this.fecha_act.slice(4, 6);
        this.dia_fin = this.fecha_act.slice(6);
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

          if (this.ano_fin < 1900) {
            CON851("", "37", null, "error", "");
            this.datoFechaFin("1");
          } else if (isNaN(moment(this.final).format("YYYYMMDD"))) {
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
          let datos = [this.inicial, this.final];

          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.inicial).format("YYYY/MM/DD")} - ${moment(this.final).format(
            "YYYY/MM/DD"
          )}`;
          this.progreso = { transferred: 0, speed: 0 };

          postData({ datosh: datosEnvio() + datos.join("|") + "|" }, get_url("app/HICLIN/HC9571.DLL"), {
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

      for (let i in data.LISTADO) {
        data.LISTADO[i].NOMBRE_CIU = $_USUA_GLOBAL[0].NOMBRE_CIU;
        data.LISTADO[i].SERV = "CRECIMIENTO Y DESARROLLO";

        if ($_USUA_GLOBAL[0].PUC == 4) data.LISTADO[i].TIPO_INS = "PUBLICA";
        else data.LISTADO[i].TIPO_INS = "PRIVADA";

        if (!data.LISTADO[i].CENT_SAL_SIS.trim()) data.LISTADO[i].CENT_SAL_SIS = $_USUA_GLOBAL[0].NOMBRE;
      }

      if (data.LISTADO.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoFechaFin("3");
      } else {
        let columnas = [
          {
            title: "Fecha de Consulta",
            value: "FECHA_CONTROL",
            format: "fecha",
            filterButton: true,
          },
          {
            title: "NomLoca",
            value: "NOMBRE_CIU",
            filterButton: true,
          },
          {
            title: "NomInsti",
            value: "CENT_SAL_SIS",
          },
          {
            title: "Tipo Inst",
            value: "TIPO_INS",
          },
          {
            title: "Servicio",
            value: "SERV",
          },
          {
            title: "Semana",
            value: "",
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
            title: "Tipo Id",
            value: "TIPO_ID_PACI",
            filterButton: true,
          },
          {
            title: "Identificación",
            value: "COD_PACI",
            filterButton: true,
          },
          {
            title: "Zona",
            value: "ZONA_PACI",
          },
          {
            title: "Barrio",
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
            title: "Meses",
            value: "VLR_EDAD_MESES",
          },
          {
            title: "Sexo",
            value: "SEXO_PACI",
          },
          {
            title: "Grupo Etn",
            value: "ETNIA",
          },
          {
            title: "Etnia",
            value: "DESCRIP_ETNI",
          },
          {
            title: "Peso",
            value: "PESO_CONTROL_SIS",
          },
          {
            title: "Talla",
            value: "TALLA_CONTROL_SIS",
          },
          {
            title: "Perimetri",
            value: "PER_CEF_CONTROL_SIS",
          },
          {
            title: "Grupo Poblacional",
            value: "",
          },
          {
            title: "ERA",
            value: "ERA",
          },
          {
            title: "EDA",
            value: "EDA",
          },
          {
            title: "LACTA",
            value: "LACTA",
          },
          {
            title: "EXCLUSI",
            value: "EXCLUSI",
          },
          {
            title: "CYD",
            value: "CYD",
          },
          {
            title: "BENEFPN",
            value: "BENEFPN",
          },
          {
            title: "Desayuno Infantil",
            value: "DESAYUNO_INFANTIL",
          },
          {
            title: "Restaurante Escolar",
            value: "RESTAURANTE_ESCOLAR",
          },
          {
            title: "Recuperación Nutricional",
            value: "RECUPERACION_NUTRICIONAL",
          },
          {
            title: "Refrigerios",
            value: "REFRIGERIOS",
          },
          {
            title: "Familias en Acción",
            value: "FAMILIAS_ACCION",
          },
          {
            title: "Hogar Infantil",
            value: "HOGAR_INFANTIL",
          },
          {
            title: "Red Unidos",
            value: "RED_UNIDOS",
          },
          {
            title: "Otro",
            value: "OTRO",
          },
          {
            title: "Cual Otro",
            value: "CUAL_OTRO",
          },
          {
            title: "Cual",
            value: "CUAL_OTRO",
          },
          {
            title: "Entidad Promotora Salud",
            value: "DESCRIP_TER",
          },
          {
            title: "Regimen",
            value: "REGIMEN",
          },
          {
            title: "DXPE",
            value: "DIAG_PESO",
          },
          {
            title: "DXTE",
            value: "DIAG_TALLA",
          },
          {
            title: "DXPT",
            value: "DIAG_PESTA",
          },
          {
            title: "DXCEF",
            value: "DIAG_PERIM",
          },
          {
            title: "DXIMC",
            value: "DIAG_IMC",
          },
          {
            title: "Neumonia",
            value: "",
          },
          {
            title: "Convulsiones",
            value: "",
          },
          {
            title: "Sifilis",
            value: "",
          },
          {
            title: "Tuberculosis",
            value: "",
          },
          {
            title: "Vih",
            value: "",
          },
        ];

        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `Informe SISVAN Crecimiento y Desarrollo     NIT: ${nit}`,
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
