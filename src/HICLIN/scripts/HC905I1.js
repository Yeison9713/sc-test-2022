new Vue({
  el: "#HC905I1",
  data: {
    unserv: null,
    fecha_ini: {
      anio: "",
      mes: "",
      dia: "",
    },
    fecha_fin: {
      anio: "",
      mes: "",
      dia: "",
    },
    fecha_actual: {
      anio: "",
      mes: "",
      dia: "",
    },

    arr_unserv: [],
    arr_filtro_listar: [
      { COD: "1", DESCRIP: "PENDIENTES" },
      { COD: "2", DESCRIP: "APROBADAS" },
      { COD: "3", DESCRIP: "RECHAZADAS" },
    ],

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,
  },
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  computed: {
    descripUnserv() {
      let unidad = this.arr_unserv.find((el) => el.COD == this.unserv);
      return unidad ? unidad.DESCRIP : "** - Todos los hospitalizados";
    },
  },
  created() {
    _PRUEBAS = this;
    nombreOpcion("9-5-I-1 - Informe consentimientos informados");

    let date = moment().format("YYYYMMDD");
    this.fecha_actual = this.getObjDate(date);
    this.fecha_ini = this.getObjDate(date);
    this.fecha_fin = this.getObjDate(date);

    this.getUnserv();
  },
  methods: {
    getObjDate(strDate) {
      strDate = strDate || 0;
      let date = {
        anio: "",
        mes: "",
        dia: "",
      };

      if (isFinite(strDate) && strDate.toString().length && parseInt(strDate)) {
        [date.anio, date.mes, date.dia] = moment(strDate, "YYYYMMDD").format("YYYY-MM-DD").split("-");
        return date;
      } else return date;
    },
    getStrDate(objDate = {}) {
      return Object.values(objDate).join("").padStart(8, "0");
    },
    getUnserv() {
      loader("show");
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          loader("hide");
          this.arr_unserv = data.UNSERV.filter((el) => el.ESTADO.trim().toUpperCase() == "S");
          this.datoUnidad();
        })
        .catch((err) => {
          loader("hide");
          console.error("Error consultando unidades de servicio: ", err);
          this.salir();
        });
    },
    datoUnidad() {
      validarInputs(
        {
          form: "#datoUnidad",
        },
        () => CON851P("03", this.datoUnidad, this.salir),
        () => {
          this.unserv = this.unserv ? this.unserv.trim().padStart(2, "0") : "**";

          if (this.unserv == "**") this.datoAnioIni();
          else {
            let cons = this.arr_unserv.find((el) => el.COD == this.unserv);
            if (cons) this.datoAnioIni();
            else {
              CON851("03", "03", null, "warning", "Advertencia");
              this.datoUnidad();
            }
          }
        }
      );
    },
    popupUnserv() {
      document.activeElement.blur();
      POPUP(
        {
          titulo: "UNIDADES DE SERVICIO",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          array: this.arr_unserv,
          seleccion: this.unserv,
          callback_f: () => {
            this.$refs.unserv.focus();
            _enterInput(`[ref="unserv"`);
          },
        },
        (data) => {
          this.unserv = data.COD;
          this.$refs.unserv.focus();
          _enterInput("[ref='unserv'");
        }
      );
    },
    datoAnioIni() {
      validarInputs(
        {
          form: "#datoAnioIni",
        },
        () => this.datoUnidad(),
        () => {
          this.fecha_ini.anio = this.fecha_ini.anio.padStart(4, "0");

          if (parseInt(this.fecha_ini.anio) > parseInt(this.fecha_actual.anio) || parseInt(this.fecha_ini.anio) <= 0) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioIni();
          } else this.datoMesIni();
        }
      );
    },
    datoMesIni() {
      validarInputs(
        {
          form: "#datoMesIni",
        },
        () => this.datoAnioIni(),
        () => {
          this.fecha_ini.mes = this.fecha_ini.mes.padStart(2, "0");

          if (this.fecha_ini.mes < 1 || this.fecha_ini.mes > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesIni();
          } else this.datoDiaIni();
        }
      );
    },
    datoDiaIni() {
      validarInputs(
        {
          form: "#datoDiaIni",
        },
        () => this.datoMesIni(),
        () => {
          this.fecha_ini.dia = this.fecha_ini.dia.padStart(2, "0");

          if (
            !_validarFecha(...Object.values(this.fecha_ini)) ||
            this.getStrDate(this.fecha_ini) > parseInt(this.getStrDate(this.fecha_actual))
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioIni();
          } else this.datoAnioFin();
        }
      );
    },

    datoAnioFin() {
      validarInputs(
        {
          form: "#datoAnioFin",
        },
        () => this.datoDiaIni(),
        () => {
          this.fecha_fin.anio = this.fecha_fin.anio.padStart(4, "0");

          if (
            parseInt(this.fecha_fin.anio) < parseInt(this.fecha_ini.anio) ||
            parseInt(this.fecha_ini.anio) > parseInt(this.fecha_actual.anio)
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioFin();
          } else this.datoMesFin();
        }
      );
    },
    datoMesFin() {
      validarInputs(
        {
          form: "#datoMesFin",
        },
        () => this.datoAnioFin(),
        () => {
          this.fecha_fin.mes = this.fecha_fin.mes.padStart(2, "0");

          if (this.fecha_fin.mes < 1 || this.fecha_fin.mes > 12) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoMesFin();
          } else this.datoDiaFin();
        }
      );
    },
    datoDiaFin() {
      validarInputs(
        {
          form: "#datoDiaFin",
        },
        () => this.datoMesFin(),
        () => {
          this.fecha_fin.dia = this.fecha_fin.dia.padStart(2, "0");

          if (
            !_validarFecha(...Object.values(this.fecha_fin)) ||
            this.getStrDate(this.fecha_fin) < parseInt(this.getStrDate(this.fecha_ini)) ||
            this.getStrDate(this.fecha_fin) > parseInt(this.getStrDate(this.fecha_actual))
          ) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoAnioFin();
          } else this.getDatos();
        }
      );
    },

    getDatos() {
      let datos = {
        datosh: datosEnvio(),
        unserv: this.unserv,
        fecha_ini: this.getStrDate(this.fecha_ini),
        fecha_fin: this.getStrDate(this.fecha_fin),
      };

      let ini = moment(this.getStrDate(this.fecha_ini), "YYYYMMDD").format("YYYY/MM/DD");
      let fin = moment(this.getStrDate(this.fecha_fin), "YYYYMMDD").format("YYYY/MM/DD");

      this.estado_loader = true;
      this.label_loader = `Procesando: ${ini} - ${fin}`;
      this.progreso = { transferred: 0, speed: 0 };

      postData(datos, get_url("APP/HICLIN/HC905I.DLL"), {
        onProgress: (progress) => {
          this.progreso = progress;
        },
      })
        .then((data) => {
          this.loader = false;
          this.label_loader = "GENERANDO IMPRESIÓN...";
          this.progreso.completado = true
          data.LISTADO.pop();
          this.imprimir(data.LISTADO);
        })
        .catch((err) => {
          this.loader = false;
          this.estado_loader = false;
          console.error("Error consultando datos consentimientos, ", err);
          CON851("", "consultando datos consentimientos", null, "error", "Error");
          this.datoUnidad();
        });
    },

    imprimir(data) {
      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format("MMM DD/YY - HH:mm");

      if (data.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoUnidad();
      } else {
        let columnas = [
          {
            title: "Folio",
            value: "folio",
            filterButton: true,
          },
          {
            title: "Unidad servicio",
            value: "descrip_unser",
            filterButton: true,
          },
          {
            title: "Identificación",
            value: "id"
          },
          {
            title: "Paciente",
            value: "descrip_paci",
          },
          {
            title: "Fecha elab.",
            value: "fecha",
            format: "fecha"
          },
          {
            title: "Hora elab.",
            value: "hora",
          },
          {
            title: "Operador elab.",
            value: "oper",
          },
          {
            title: "Consentimiento",
            value: "descrip_consen",
          },
          {
            title: "Identificación prof.",
            value: "cod_prof",
          },
          {
            title: "Profesional",
            value: "descrip_prof",
          },
          {
            title: "Paciente acepta",
            value: "paci_acept",
          },
          {
            title: "Acompañante acepta",
            value: "acomp_acept",
            format: "string",
          },
        ];

        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `Listado Consentimientos Informados - NIT: ${nit}`,
          `Fecha de reporte: ${fecha}`,
          `Unidad de servicio: ${this.descripUnserv}`,
        ];

        _impresion2({
          tipo: "excel",
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: data,
          },
          archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss"),
          scale: "75",
          orientation: "landscape",
        })
          .then(() => {
            CON851("", "Generando informe", null, "success", "");
            this.estado_loader = false;
            this.salir();
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error generando impresion", null, "error", "Error");
            this.estado_loader = false;
            this.datoUnidad();
          });
      }
    },

    salir() {
      _regresar_menuhis();
    },

    terminar(data) {
      console.log("terminar", data);
    },
  },
});
