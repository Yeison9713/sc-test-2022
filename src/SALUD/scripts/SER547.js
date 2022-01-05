// Informe Gestion de Calidad - David.M - 08-11-2021

new Vue({
  el: "#SER547",
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    fecha_ini: "",
    fecha_fin: "",
    nit: "",
    descrip_nit: "",
    cambio_fecha: "",
    fecha_act: moment().format("YYYYMMDD"),

    ventanaTerceros: false,
  },
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
    con802s: require("../../CONTAB/scripts/CON802S.vue.js"),
  },
  created() {
    nombreOpcion("9-5-4-2-1-2-D - Informe Gestión de Calidad");

    _inputControl("disabled");
    _inputControl("reset");

    this.datoFechaIni();
  },
  computed: {
    fecha_ini_w() {
      return _getObjectDate(this.fecha_ini);
    },
    fecha_fin_w() {
      return _getObjectDate(this.fecha_fin);
    },
  },
  methods: {
    datoFechaIni() {
      if (this.fecha_ini_w.mes_w == 0) {
        this.fecha_ini = `20${$_USUA_GLOBAL[0].FECHALNK}`;
      }

      validarInputs(
        {
          form: "#fecha_ini",
        },
        _toggleNav,
        () => {
          let ano = this.fecha_ini_w.ano_w.padStart(4, "0");
          let mes = this.fecha_ini_w.mes_w.padStart(2, "0");
          let dia = this.fecha_ini_w.dia_w.padStart(2, "0");
          this.fecha_ini = `${ano}${mes}${dia}`;

          let validacion = _validarFecha(ano, mes, dia);

          if (validacion) this.datoFechaFin();
          else {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaIni();
          }
        }
      );
    },

    datoFechaFin() {
      if (this.fecha_fin_w.mes_w == 0) {
        this.fecha_fin = this.fecha_ini;
      }

      validarInputs(
        {
          form: "#fecha_fin",
        },
        this.datoFechaIni,
        () => {
          let ano = this.fecha_fin_w.ano_w.padStart(4, "0");
          let mes = this.fecha_fin_w.mes_w.padStart(2, "0");
          let dia = this.fecha_fin_w.dia_w.padStart(2, "0");
          this.fecha_fin = `${ano}${mes}${dia}`;

          let validacion = _validarFecha(ano, mes, dia);

          if (validacion) this.datoEntidad();
          else {
            CON851("37", "37", null, "error", "Error");
            this.datoFechaFin();
          }
        }
      );
    },

    datoEntidad() {
      if (this.nit == 0) this.nit = "99";
      validarInputs(
        {
          form: "#nit",
        },
        this.datoFechaFin,
        () => {
          if (this.nit == 0) this.datoEntidad();
          else this.mostrarEntidad();
        }
      );
    },

    mostrarEntidad() {
      if (this.nit == 99) {
        this.datoCambioFecha();
      } else {
        let datos_envio = {
          datosh: datosEnvio(),
          cod_tercero: this.nit,
        };
        postData(datos_envio, get_url("APP/CONTAB/GET_TERCERO.DLL"))
          .then((data) => {
            if (data.cod) {
              this.nit = data.cod;
              this.descrip_nit = data.descrip;
              this.datoCambioFecha();
            } else {
              CON851("", "01", null, "error", "Error");
              this.datoEntidad();
            }
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error validando datos", null, "error", "Error");
            this.datoEntidad();
          });
      }
    },

    datoCambioFecha() {
      if (this.cambio_fecha == 0) this.cambio_fecha = "N";
      validarInputs(
        {
          form: "#cambio_fecha",
        },
        this.datoEntidad,
        () => {
          this.cambio_fecha = this.cambio_fecha.toUpperCase();
          if (this.cambio_fecha != "S") this.cambio_fecha = "N";
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      let datos_envio = {
        datosh: datosEnvio(),
        fecha_ini: this.fecha_ini,
        fecha_fin: this.fecha_fin,
        nit: this.nit,
        cambio_fecha: this.cambio_fecha,
        admin: localStorage.Usuario,
      };

      this.estado_loader = true;
      this.label_loader = `Procesando: ${moment(this.fecha_ini).format("YYYY/MM/DD")} - ${moment(this.fecha_fin).format(
        "YYYY/MM/DD"
      )}`;
      this.progreso = { transferred: 0, speed: 0 };

      postData(datos_envio, get_url("APP/SALUD/SER547.DLL"))
        .then((data) => {
          this.loader = false;
          this.label_loader = `GENERANDO IMPRESIÓN...`;
          this.progreso.completado = true;

          data.CONSULTA.pop();
          this.generarListado(data.CONSULTA);
        })
        .catch((error) => {
          this.loader = false;
          this.estado_loader = false;

          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoCambioFecha();
        });
    },

    generarListado(listado) {
      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format("MMM DD/YY - HH:mm");

      if (listado.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoCambioFecha();
      } else {
        let columnas = [
          {
            title: "Item",
            value: "item",
            format: "string"
          },
          {
            title: "Variable",
            value: "variable",
          },
          {
            title: "Factor",
            value: "factor",
          },
          {
            title: "Descripcion",
            value: "descrip",
          },
          {
            title: "Valor",
            value: "valor",
          },
          {
            title: "Total",
            value: "total",
          },
        ];

        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `Informe Gestión de Calidad     NIT: ${nit}`,
          `Fecha de reporte: ${fecha}`,
          `Desde: ${this.fecha_ini} Hasta: ${this.fecha_fin}`,
        ];

        _impresion2({
          tipo: "excel",
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: listado,
          },
          archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss"),
          scale: "75",
          orientation: "landscape",
        })
          .then(() => {
            CON851("", "Generando informe", null, "success", "");
            loader("hide");
            this.estado_loader = false;
            _toggleNav();
          })
          .catch((error) => {
            console.error(error);
            this.estado_loader = false;
            CON851("", "Error generando impresion", null, "error", "Error");
            loader("hide");
            this.datoCambioFecha();
          });
      }
    },

    _ventanaTerceros() {
      _fin_validar_form();
      this.ventanaTerceros = true;
    },

    escVentanaTerceros() {
      this.ventanaTerceros = false;
      this.datoEntidad();
    },

    successVentanaTerceros(data) {
      this.ventanaTerceros = false;
      this.nit = data.cod;
      this.descrip_nit = data.descrip;
      this.datoEntidad();
    },
  },
});
