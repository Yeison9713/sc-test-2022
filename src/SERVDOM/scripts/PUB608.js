// Relacion de Recaudos - Opcion 6-8 - David.M - 26/08/2021

new Vue({
  el: "#PUB608",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    ano_gen: "",
    mes_gen: "",
    ano_pag: "",
    mes_pag: "",
    dia_pag: "",
    cod: "",
    secu: "",

    serv_tit: {},

    array_datos: [],
    array_serv: [],
  },
  created() {
    nombreOpcion("6-8 - Relación de Recaudos");
    _inputControl("reset");
    _inputControl("disabled");
    this.traerServicios();
  },
  methods: {
    datoFechaPag() {
      if (!this.ano_pag.trim()) this.ano_pag = $_USUARIO_EMPRESA.ULT_PER.slice(0, 4);
      if (!this.mes_pag.trim()) this.mes_pag = $_USUARIO_EMPRESA.ULT_PER.slice(4);
      if (!this.dia_pag.trim()) this.dia_pag = "01";
      validarInputs(
        {
          form: "#fecha_pag",
        },
        _toggleNav,
        () => {
          this.ano_pag = this.ano_pag.padStart(4, "0");
          this.mes_pag = this.mes_pag.padStart(2, "0");
          this.dia_pag = this.dia_pag.padStart(2, "0");
          this.fecha_pago = `${this.ano_pag}${this.mes_pag}${this.dia_pag}`;

          if (this.mes_pag < 1 || this.mes_pag > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaPag();
          } else if (this.dia_pag < 1 || this.dia_pag > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaPag();
          } else {
            setTimeout(() => {
              this._ventanaPagos();
            }, 200);
          }
        }
      );
    },

    _ventanaPagos() {
      _fin_validar_form();
      loader("show");

      let fecha_w = `000000${this.ano_pag}${this.mes_pag}${this.dia_pag}`;
      postData({ datosh: moduloDatosEnvio() + fecha_w + "|" }, get_url("app/SERVDOM/PUB813.DLL"))
        .then((data) => {
          data.DATOS.pop();
          this.array_datos = data.DATOS;
          loader("hide");
          _ventanaDatos({
            titulo: "Consulta de Pagos del Dia",
            columnas: ["fecha", "cta", "secu", "vlr", "fecha_gen"],
            data: this.array_datos,
            callback_esc: this.datoFechaPag,
            callback: (data) => {
              this.ano_pag = data.fecha_pag.slice(0, 4);
              this.mes_pag = data.fecha_pag.slice(4, 6);
              this.dia_pag = data.fecha_pag.slice(6);
              this.cod = data.cta;
              this.secu = data.secu;
              this.ano_gen = data.fecha_gen.slice(0, 4);
              this.mes_gen = data.fecha_gen.slice(4);
              setTimeout(() => {
                this.leerArchivo();
              }, 200);
            },
          });
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaPag();
        });
    },

    leerArchivo() {
      loader("show");
      postData(
        { datosh: moduloDatosEnvio() + `${this.ano_gen}${this.mes_gen}` + "|1|" },
        get_url("app/SERVDOM/PUB201_02.DLL")
      )
        .then((data) => {
          loader("hide");
          if (data == 8) {
            this.titulosServ();
          } else {
            CON851("", "No existe el archivo", null, "error", "");
            this.datoFechaPag();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaPag();
        });
    },

    titulosServ() {
      for (let i = 0; i < 6; i++) {
        let busqueda = this.array_serv.find((e) => e.cod == (parseInt(i) + 1).toString());
        this.serv_tit[`serv${parseInt(i) + 1}`] = busqueda ? busqueda.descrip : `Serv ${parseInt(i) + 1}`;

        if (i == 5) this.confirmar();
      }
    },

    confirmar() {
      CON851P("00", this.datoFechaPag, this.llamarDLL);
    },

    llamarDLL() {
      let llave_pago = `${this.ano_gen}${this.mes_gen}${this.ano_pag}${this.mes_pag}${this.dia_pag}${this.cod}${this.secu}`;

      let datos = {
        datosh: moduloDatosEnvio(),
        llave_pago: llave_pago,
      };

      this.estado_loader = true;
      this.label_loader = `Procesando: ${llave_pago}`;
      this.progreso = { transferred: 0, speed: 0 };

      postData(datos, get_url("app/SERVDOM/PUB608.DLL"), {
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
          this.datoFechaPag();
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
        this.datoFechaPag();
      } else {
        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `Comprobante de pagos recibidos     NIT: ${nit_edit}`,
          `Fecha de reporte: ${fecha}         Fecha Generación Fact: ${this.ano_gen}${this.mes_gen}`,
          `Fecha de pago: ${this.ano_pag} ${this.mes_pag} ${this.dia_pag}  Oficina: ${this.cod}  Comp: ${this.secu}`,
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
            _toggleNav();
            this.estado_loader = false;
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error generando impresion", null, "error", "Error");
            this.datoFechaPag();
            this.estado_loader = false;
          });
      }
    },

    columnas_listado() {
      let columns = [
        {
          title: "Factura",
          value: "fact",
          format: "number",
        },
        {
          title: "Usuario",
          value: "nombre",
          format: "string",
        },
        {
          title: "Est",
          value: "est",
          format: "number",
        },
        {
          title: this.serv_tit.serv1,
          value: "vlr_ser_1",
          format: "money",
        },
        {
          title: this.serv_tit.serv2,
          value: "vlr_ser_2",
          format: "money",
        },
        {
          title: this.serv_tit.serv3,
          value: "vlr_ser_3",
          format: "money",
        },
        {
          title: this.serv_tit.serv4,
          value: "vlr_ser_4",
          format: "money",
        },
        {
          title: this.serv_tit.serv5,
          value: "vlr_ser_5",
          format: "money",
        },
        {
          title: this.serv_tit.serv6,
          value: "vlr_ser_6",
          format: "money",
        },
        {
          title: "Total",
          value: "vlr_fac",
          format: "money",
        },
      ];

      return columns;
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          loader("hide");
          this.datoFechaPag();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },
  },
});
