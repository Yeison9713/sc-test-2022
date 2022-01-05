// Kardex por Usuario - Opcion 3-1 - David.M - 30/07/2021

const { _ventana_PUB801 } = require("../../SERVDOM/scripts/globalDom.js");

new Vue({
  el: "#PUB301",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    formato: "",
    usuario: "",
    serv: "",
    ano_ini: "",
    mes_ini: "",
    ano_fin: "",
    mes_fin: "",

    array_serv: [],
    array_usuar_ser: [],
  },
  created() {
    nombreOpcion("3-1 - Kardex por Usuario");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerServicios();
  },
  computed: {
    nombre() {
      let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.usuario.padStart(15, "0"));
      return busqueda ? busqueda.NOMBRE : "";
    },
    direccion() {
      let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.usuario.padStart(15, "0"));
      return busqueda ? busqueda.DIRECCION : "";
    },
    descrip_serv() {
      if (this.serv == 9) {
        return "TODOS LOS SERVICIOS";
      } else {
        let busqueda = this.array_serv.find((e) => e.cod == this.serv);
        return busqueda ? busqueda.descrip : "";
      }
    },
  },
  methods: {
    datoFormato() {
      POPUP(
        {
          titulo: "FORMATO DE IMPRESIÓN",
          indices: [{ id: "id", label: "label" }],
          seleccion: this.formato || 3,
          teclaAlterna: true,
          array: [
            { id: 3, label: "EXCEL" },
            { id: 4, label: "PDF" },
          ],
          callback_f: _toggleNav,
        },
        (data) => {
          this.formato = data.id;
          this.datoUsuario();
        }
      );
    },

    datoUsuario() {
      validarInputs(
        {
          form: "#usuario",
        },
        this.datoFormato,
        () => {
          this.usuario = this.usuario.padStart(15, "0");
          this.leerUsuario();
        }
      );
    },

    leerUsuario() {
      let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.usuario.padStart(15, "0"));

      if (busqueda) {
        this.datoServ();
      } else {
        CON851("", "01", null, "error", "Error");
        this.datoUsuario();
      }
    },

    datoServ() {
      if (!this.serv.trim()) this.serv = "9";
      validarInputs(
        {
          form: "#serv",
        },
        this.datoUsuario,
        () => {
          if (this.serv == 9) {
            this.iniciar();
          } else {
            let busqueda = this.array_serv.find((e) => e.cod == this.serv);
            if (busqueda) this.iniciar();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoServ();
            }
          }
        }
      );
    },
    
    iniciar() {
      if (!this.ano_ini.trim()) this.ano_ini = $_USUARIO_EMPRESA.ULT_PER.slice(0, 4);
      if (!this.mes_ini.trim()) this.mes_ini = "01";

      if (!this.ano_fin.trim()) this.ano_fin = $_USUARIO_EMPRESA.ULT_PER.slice(0, 4);
      if (!this.mes_fin.trim()) this.mes_fin = $_USUARIO_EMPRESA.ULT_PER.slice(4);

      this.datoFechaInicial();
    },

    datoFechaInicial() {
      validarInputs(
        {
          form: "#fecha_ini",
        },
        this.datoServ,
        () => {
          this.ano_ini = this.ano_ini.padStart(4, "0");
          this.mes_ini = this.mes_ini.padStart(2, "0");
          this.datoFechaFinal();
        }
      );
    },

    datoFechaFinal() {
      validarInputs(
        {
          form: "#fecha_fin",
        },
        this.datoFechaInicial,
        () => {
          this.ano_fin = this.ano_fin.padStart(4, "0");
          this.mes_fin = this.mes_fin.padStart(2, "0");
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoFechaFinal, () => {
        var datos_envio = [
          this.usuario.toString(),
          this.serv.toString(),
          `${this.ano_ini}${this.mes_ini}`,
          `${this.ano_fin}${this.mes_fin}`,
        ];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_ini}/${this.mes_ini} / ${this.ano_fin}/${this.mes_fin}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB301.DLL"), {
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
            this.datoFechaFinal();
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
        this.datoFechaFinal();
      } else {
        let header_format = [];
        if (this.formato == 3) {
          header_format = [
            { text: `${nombreEmpresa}`, bold: true, size: 16 },
            `EXTRACTO DE MOVIMIENTO     NIT: ${nit_edit}  USUARIO: ${
              this.usuario
            }  NOMBRE: ${this.nombre}  DIRECCION: ${this.direccion}`,
            `Fecha de reporte: ${fecha}`,
          ];
        } else {
          header_format = [
            `${nombreEmpresa}`,
            `${nit_edit}`,
            `EXTRACTO DE MOVIMIENTO`,
            { text: `${this.usuario} - ${this.nombre}`, marginTop: 2 },
          ];
        }

        listado.forEach((el) => {
          el.sdo_ant = el.sdo_ant.replace(/\ /g, "");
          el.cargos = el.cargos.replace(/\ /g, "");
          el.int_mes = el.int_mes.replace(/\ /g, "");
          el.vlr_aju = el.vlr_aju.replace(/\ /g, "");
          el.refinan = el.refinan.replace(/\ /g, "");
          el.sub_tot = el.sub_tot.replace(/\ /g, "");
          el.abonos = el.abonos.replace(/\ /g, "");
          el.sdo_act = el.sdo_act.replace(/\ /g, "");
        });

        _impresion2({
          tipo: this.formato == 3 ? "excel" : "list_pdf",
          header: header_format,
          logo: `${nit}.png`,
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
            this.datoFechaFinal();
            this.estado_loader = false;
          });
      }
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.traerUsuarSer();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerUsuarSer() {
      postData({ datosh: moduloDatosEnvio() + "1" }, get_url("app/SERVDOM/PUB801.DLL"))
        .then((data) => {
          this.array_usuar_ser = data.USDOM;
          loader("hide");
          this.datoFormato();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "");
          _toggleNav();
        });
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

    _ventanaUsuarSer(esc) {
      _fin_validar_form();

      _ventana_PUB801(() => {
        console.log(esc, "ESC");
        this[esc]();
      }).then((data) => {
        this.array_usuar_ser = data.datos;
        this.usuario = data.cuenta;

        this.leerUsuario();
      });
    },

    columnas_listado() {
      let columns = [
        {
          title: "Archivo",
          value: "archivo",
          width: "12%",
        },
        {
          title: "Periodo fact. Factura",
          value: "per_fact",
          format: "string",
          width: "18%",
        },
        {
          title: "Est",
          value: "concepto",
          format: "string",
          width: "10%",
        },
        {
          title: "Saldo ant",
          value: "sdo_ant",
          format: "money",
          width: "7.5%",
        },
        {
          title: "Vlr servic",
          value: "cargos",
          format: "money",
          width: "7.5%",
        },
        {
          title: "Int mes",
          value: "int_mes",
          format: "money",
          width: "7.5%",
        },
        {
          title: "Ajustes",
          value: "vlr_aju",
          format: "money",
          width: "7.5%",
        },
        {
          title: "Refinanc",
          value: "refinan",
          format: "money",
          width: "7.5%",
        },
        {
          title: "Subtotal",
          value: "sub_tot",
          format: "money",
          width: "7.5%",
        },
        {
          title: "Abonos",
          value: "abonos",
          format: "money",
          width: "7.5%",
        },
        {
          title: "Saldo",
          value: "sdo_act",
          format: "money",
          width: "7.5%",
        },
      ];

      return columns;
    },
  },
});
