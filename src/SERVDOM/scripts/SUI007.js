// Resumen SUI GAS - Opcion 8-7 - David.M - 13/09/2021

new Vue({
    el: "#SUI007",
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
      serv: "",
      fecha_act: moment().format("YYYYMMDD"),
  
      array_serv: [],
    },
    created() {
      nombreOpcion("8-7 - Resumen SUI - GAS");
      _inputControl("reset");
      _inputControl("disabled");
      this.traerServicios();
    },
    computed: {
      descrip_serv() {
        let busqueda = this.array_serv.find((e) => e.cod == this.serv);
        return busqueda ? busqueda.descrip : "";
      },
    },
    methods: {
      datoFechaArchivo() {
        if (!this.mes_gen.trim()) {
          this.ano_gen = $_USUARIO_EMPRESA.ULT_PER.slice(0, 4);
          this.mes_gen = $_USUARIO_EMPRESA.ULT_PER.slice(4);
        }
        validarInputs(
          {
            form: "#fecha_gen",
          },
          _toggleNav,
          () => {
            this.ano_gen = this.ano_gen.padStart(4, "0");
            this.mes_gen = this.mes_gen.padStart(2, "0");
            this.datoServ();
          }
        );
      },
  
      datoServ() {
        let busqueda = this.array_serv.find((e) => e.descrip.toUpperCase().slice(0, 5) == "GAS N");
        if (busqueda) {
          this.serv = busqueda.cod;
          this.llamarDLL();
        } else {
          CON851("", "Servicio de gas no encontrado", null, "error", "Error");
          this.datoFechaArchivo();
        }
      },
  
      llamarDLL() {
        CON851P("00", this.datoFechaArchivo, () => {
          let datos = {
            datosh: moduloDatosEnvio(),
            fecha: `${this.ano_gen}${this.mes_gen}`,
            serv: this.serv,
          };
  
          this.estado_loader = true;
          this.label_loader = `Procesando: ${this.ano_gen} / ${this.mes_gen}`;
          this.progreso = { transferred: 0, speed: 0 };
  
          postData(datos, get_url("app/SERVDOM/SUI007.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then(async (data) => {
              data.LISTADO.pop();
              data = data.LISTADO;
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
  
              this.format_csv(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.datoFechaArchivo();
            });
        });
      },
  
      async format_csv(datos) {
        let array_columns = this.columnas_listado();
  
        for (let i in array_columns) {
          array_columns[i]["label"] = array_columns[i].title;
        }
  
        _impresion2({
          tipo: "csv",
          ruta_guardado: "C:\\PROSOFT\\ENVIOS\\",
          archivo: `GD${this.fecha_act.slice(0, 6)}`,
          datos: datos,
          columnas: array_columns,
        })
          .then(() => {
            this.estado_loader = false;
            CON851("", "Impreso Correctamente", null, "success", "Exito");
            _toggleNav();
          })
          .catch(() => {
            this.estado_loader = false;
            CON851("", "Error generando impresión", null, "error", "Error");
            CON851("", "Puede que tenga el archivo abierto", null, "warning", "");
            this.datoFechaArchivo();
          });
      },
  
      traerServicios() {
        postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
          .then((data) => {
            this.array_serv = data.SERVPQR;
            this.datoFechaArchivo();
          })
          .catch((error) => {
            loader("hide");
            console.error(error);
            CON851("", "Error consultando datos", null, "error", "Error");
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
  
      columnas_listado() {
        let columns = [
          {
            title: "NUID",
            value: "cat",
          },
          {
            title: "DANE",
            value: "ciudad",
          },
          {
            title: "ZON",
            value: "zona",
          },
          {
            title: "SECT",
            value: "sector",
          },
          {
            title: "MZ",
            value: "manzana",
          },
          {
            title: "UB",
            value: "ub",
          },
          {
            title: "DIR",
            value: "direcc",
          },
          {
            title: "FACT",
            value: "nro",
          },
          {
            title: "FEC EXPED",
            value: "fecha_exp",
          },
          {
            title: "FEC INI",
            value: "fecha_ini",
          },
          {
            title: "FEC FIN",
            value: "fecha_fin",
          },
          {
            title: "CLAS",
            value: "clase",
          },
          {
            title: "LECT",
            value: "lec",
          },
          {
            title: "LEC ANT",
            value: "lec_ant",
          },
          {
            title: "LEC ACT",
            value: "lec_act",
          },
          {
            title: "CORREC",
            value: "correc",
          },
          {
            title: "CONSU",
            value: "consu",
          },
          {
            title: "CARG FIJ",
            value: "car_fijo",
          },
          {
            title: "VLR M3",
            value: "vlr_m3",
          },
          {
            title: "VLR CONSUMO",
            value: "vlr_consumo",
          },
          {
            title: "M3 REFAC",
            value: "m3_refac",
          },
          {
            title: "VLR REFAC",
            value: "vlr_refac",
          },
          {
            title: "VLR MORA",
            value: "vlr_mora",
          },
          {
            title: "INT MORA",
            value: "int_mora",
          },
          {
            title: "SANCION",
            value: "sanciones",
          },
          {
            title: "SUBSID",
            value: "subsidio",
          },
          {
            title: "PORC SUBS",
            value: "porc_subsid",
          },
          {
            title: "CONEX",
            value: "conex",
          },
          {
            title: "INT FINANC",
            value: "int_financ",
          },
          {
            title: "SUSPENC",
            value: "suspen",
          },
          {
            title: "REVIS INST",
            value: "revis",
          },
          {
            title: "CORTES",
            value: "cortes",
          },
          {
            title: "FEC REVIS",
            value: "fecha_rev",
          },
          {
            title: "OTROS",
            value: "otros",
          },
          {
            title: "FEC VENCE",
            value: "fecha_ven",
          },
          {
            title: "FEC SUSP",
            value: "fecha_ven2",
          },
          {
            title: "TOTAL",
            value: "total",
          },
        ];
  
        return columns;
      },
    },
  });
  