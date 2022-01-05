// Listado P.Q.R - Opcion 7-5 - David.M - 06/09/2021

const { _editFecha2 } = require("../../SERVDOM/scripts/globalDom");

new Vue({
  el: "#PUB705",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    ano_ini: "",
    mes_ini: "",
    dia_ini: "",
    ano_fin: "",
    mes_fin: "",
    dia_fin: "",
    serv: "",
    mot: "",
    dep: "",
    est: "",
    descrip_mot: "",
    descrip_est: "",
    fecha_act: moment().format("YYYYMMDD"),

    array_motivos: [
      { cod: "*", descrip: "Todos" },
      { cod: "1", descrip: "Facturación" },
      { cod: "2", descrip: "Prestación del servicio" },
      { cod: "3", descrip: "Solicitud de información" },
      { cod: "4", descrip: "Otros P.Q.R" },
    ],

    array_estados: [
      { cod: "*", descrip: "Todos" },
      { cod: "1", descrip: "Solucionado" },
      { cod: "2", descrip: "Negado" },
      { cod: "3", descrip: "Pendiente" },
    ],

    array_serv: [],
    array_dependencias: [],
  },
  computed: {
    descrip_serv() {
      if (this.serv == "*") {
        return "TODOS LOS SERVICIOS";
      } else {
        let busqueda = this.array_serv.find((e) => e.cod == this.serv);
        return busqueda ? busqueda.descrip : "";
      }
    },

    descrip_dep() {
      if (this.dep == "***") {
        return "TODAS LAS DEPENDENCIAS";
      } else {
        let busqueda = this.array_dependencias.find((e) => e.cod == this.dep);
        return busqueda ? busqueda.descrip : "";
      }
    },
  },
  created() {
    nombreOpcion("7-5 - Listado de P.Q.R");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerServicios();
  },
  methods: {
    datoFechaInicial() {
      if (!this.ano_ini.trim()) this.ano_ini = this.fecha_act.slice(0, 4);
      if (!this.mes_ini.trim()) this.mes_ini = this.fecha_act.slice(4, 6);
      if (!this.dia_ini.trim()) this.dia_ini = "01";
      validarInputs(
        {
          form: "#fecha_ini",
        },
        _toggleNav,
        () => {
          this.ano_ini = this.ano_ini.padStart(4, "0");
          this.mes_ini = this.mes_ini.padStart(2, "0");
          this.dia_ini = this.dia_ini.padStart(2, "0");
          this.inicial = `${this.ano_ini}${this.mes_ini}${this.dia_ini}`;

          if (this.mes_ini < 1 || this.mes_ini > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaInicial();
          } else if (this.dia_ini < 1 || this.dia_ini > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaInicial();
          } else {
            setTimeout(() => {
              this.datoFechaFinal();
            }, 200);
          }
        }
      );
    },

    datoFechaFinal() {
      if (!this.ano_fin.trim()) this.ano_fin = this.fecha_act.slice(0, 4);
      if (!this.mes_fin.trim()) this.mes_fin = this.fecha_act.slice(4, 6);
      if (!this.dia_fin.trim()) this.dia_fin = "31";
      validarInputs(
        {
          form: "#fecha_fin",
        },
        this.datoFechaInicial,
        () => {
          this.ano_fin = this.ano_fin.padStart(4, "0");
          this.mes_fin = this.mes_fin.padStart(2, "0");
          this.dia_fin = this.dia_fin.padStart(2, "0");
          this.final = `${this.ano_fin}${this.mes_fin}${this.dia_fin}`;

          if (this.mes_fin < 1 || this.mes_fin > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaFinal();
          } else if (this.dia_fin < 1 || this.dia_fin > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaFinal();
          } else if (this.final < this.inicial) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaFinal();
          } else {
            setTimeout(() => {
              this.datoServ();
            }, 200);
          }
        }
      );
    },

    datoServ() {
      if (!this.serv.trim()) this.serv = "*";
      validarInputs(
        {
          form: "#serv",
        },
        this.datoFechaFinal,
        () => {
          if (this.serv == "*") {
            this.datoMot();
          } else {
            let busqueda = this.array_serv.find((e) => e.cod == this.serv);
            if (busqueda) this.datoMot();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoServ();
            }
          }
        }
      );
    },

    datoMot() {
      if (!this.mot.trim()) this.mot = "*";
      POPUP(
        {
          array: this.array_motivos,
          titulo: "MOTIVO",
          indices: [{ id: "cod", label: "descrip" }],
          seleccion: this.mot,
          teclaAlterna: true,
          callback_f: this.datoServ,
        },
        (data) => {
          this.mot = data.cod;
          this.descrip_mot = data.descrip;
          this.datoDep();
        }
      );
    },

    datoDep() {
      if (!this.dep.trim()) this.dep = "***";
      validarInputs(
        {
          form: "#dep",
        },
        this.datoMot,
        () => {
          if (this.dep == "***") {
            this.datoEst();
          } else {
            let busqueda = this.array_dependencias.find((e) => e.cod == this.dep);
            if (busqueda) this.datoEst();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoDep();
            }
          }
        }
      );
    },

    datoEst() {
      if (!this.est.trim()) this.est = "*";
      POPUP(
        {
          array: this.array_estados,
          titulo: "ESTADO",
          indices: [{ id: "cod", label: "descrip" }],
          seleccion: this.est,
          teclaAlterna: true,
          callback_f: this.datoDep,
        },
        (data) => {
          this.est = data.cod;
          this.descrip_est = data.descrip;
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoEst, () => {
        let datos = {
          datosh: moduloDatosEnvio(),
          fecha_ini: this.inicial.slice(2).toString(),
          fecha_fin: this.final.slice(2).toString(),
          serv: this.serv.toString(),
          mot: this.mot.toString(),
          depen: this.dep.toString(),
          est: this.est.toString(),
        };

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.inicial} - ${this.final}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData(datos, get_url("app/SERVDOM/PUB705.DLL"), {
          onProgress: (progress) => {
            this.progreso = progress;
          },
        })
          .then((data) => {
            data.LISTADO.pop();
            data = data.LISTADO;
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
            this.datoEst();
          });
      });
    },

    imprimir(data) {
      let listado = data;

      let nombreEmpresa = $_USUARIO_EMPRESA.NOMBRE.trim();
      let nit = $_USUARIO_EMPRESA.NIT.toString();
      let nit_edit = !isNaN(nit) ? new Intl.NumberFormat("ja-JP").format(nit) : nit;
      let fecha = moment().format("MMM DD/YY - HH:mm");

      if (listado.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoEst();
      } else {
        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `LISTADO DE P.Q.R    DESDE: ${_editFecha2(this.inicial)} HASTA: ${_editFecha2(
            this.final
          )}    NIT: ${nit_edit}`,
          `Fecha de reporte: ${fecha}`,
        ];

        _impresion2({
          tipo: "excel",
          header: header_format,
          logo: `${parseFloat(nit)}.png`,
          tabla: {
            columnas: this.columnas_listado(),
            data: listado,
          },
          archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss"),
          scale: "75",
          orientation: "landscape",
        })
          .then(() => {
            CON851("", "Generando informe", null, "success", "");
            loader("hide");
            _toggleNav();
            this.estado_loader = false;
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error generando impresion", null, "error", "Error");
            loader("hide");
            this.datoEst();
            this.estado_loader = false;
          });
      }
    },

    _ventanaServicios() {
      _ventanaDatos({
        titulo: "Ventana de Servicios P.Q.R.",
        columnas: ["cod", "descrip"],
        data: this.array_serv,
        callback_esc: () => {
          document.querySelector(".serv").focus();
        },
        callback: (data) => {
          this.serv = data.cod;
          setTimeout(() => {
            _enterInput(".serv");
          }, 200);
        },
      });
    },

    _ventanaDependencias() {
      _ventanaDatos({
        titulo: "Ventana de Dependencias P.Q.R.",
        columnas: [
          { value: "cod", label: "Codigo" },
          { value: "descrip", label: "Descripción" },
          { value: "responsable", label: "Responsable" },
        ],
        data: this.array_dependencias,
        callback_esc: () => {
          document.querySelector(".dep").focus();
        },
        callback: (data) => {
          this.dep = data.cod;
          setTimeout(() => {
            _enterInput(".dep");
          }, 200);
        },
      });
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.traerDependencias();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerDependencias() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB783.DLL"))
        .then((data) => {
          this.array_dependencias = data.DATOS;
          loader("hide");
          this.datoFechaInicial();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          loader("hide");
          _toggleNav();
        });
    },

    columnas_listado() {
      let columns = [
        {
          title: "Comprob",
          value: "llave",
          format: "string",
        },
        {
          title: "Nombre del Solicitante",
          value: "nom",
          format: "string",
        },
        {
          title: "Dirección",
          value: "dir",
          format: "string",
        },
        {
          title: "Medio",
          value: "descrip_medio",
          format: "string",
        },
        {
          title: "Fecha P.Q.R",
          value: "fecha",
          format: "string",
        },
        {
          title: "Servicio",
          value: "descrip_ser",
          format: "string",
        },
        {
          title: "Motivo",
          value: "mot",
          format: "string",
        },
        {
          title: "Dependencia",
          value: "dep",
          format: "string",
        },
        {
          title: "Estado",
          value: "descrip_est",
          format: "string",
        },
      ];

      return columns;
    },
  },
});
