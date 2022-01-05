new Vue({
  el: "#SA211C",
  data: {
    articulos: [],
    almacenes: [],
    gurpos: [],
    clases: [],
    art_origen: {
      grupo: "",
      articulo: "",
      clase: "",
    },
    art_destino: {
      grupo: "",
      articulo: "",
      clase: "",
    },
    meses: ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGT", "SEP", "OCT", "NOV", "DIC"],

    periodoTraslado: Array(12).fill(""),

    // parametros loader_modal
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,
    tipo_impresion: null,
  },
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  watch: {},
  computed: {
    descripGrupoOrigen() {
      let grupo = this.gurpos.find((el) => el.GRUPO == this.art_origen.grupo);
      return grupo ? grupo.DESCRIP : "";
    },
    descripArticuloOrigen() {
      let articulo = this.articulos.find((el) => el.LLAVE_ART.slice(3, 16) == this.art_origen.articulo);
      return articulo ? articulo.DESCRIP_ART : "";
    },
    descripClaseOrigen() {
      let clase = this.clases.find((el) => el.COD == this.art_origen.clase);
      return clase ? clase.DESCRIP : "";
    },
    descripGrupoDestino() {
      let grupo = this.gurpos.find((el) => el.GRUPO == this.art_destino.grupo);
      return grupo ? grupo.DESCRIP : "";
    },
    descripArticuloDestino() {
      let articulo = this.articulos.find((el) => el.LLAVE_ART.slice(3, 16) == this.art_destino.articulo);
      return articulo ? articulo.DESCRIP_ART : "";
    },
    descripClaseDestino() {
      let clase = this.clases.find((el) => el.COD == this.art_destino.clase);
      return clase ? clase.DESCRIP : "";
    },
  },
  created() {
    nombreOpcion("9-2-C Traslado de articulos");
    _PRUEBAS = this;
    this.getArticulos();
  },
  mounted() {},
  methods: {
    getArticulos() {
      loader("show");
      postData({ datosh: datosEnvio() + "|" + localStorage.Usuario }, get_url("APP/INVENT/INV803.DLL"))
        .then((data) => {
          data.ARTICULOS.pop();
          this.articulos = data.ARTICULOS;
          this.getAlmacenes();
        })
        .catch((err) => {
          loader("hide");
          console.error("Error consultando articulos: ", err);
          CON851("", "Error consultando articulos", null, "error", "");
          _toggleNav();
        });
    },
    getAlmacenes() {
      loader("show");
      postData({ datosh: datosEnvio() }, get_url("APP/INVENT/INV801.DLL"))
        .then((data) => {
          data.LOCALIZACION.pop();
          this.almacenes = data.LOCALIZACION;
          this.getGrupos();
        })
        .catch((err) => {
          loader("hide");
          console.error("Error consultando alamcenes: ", err);
          CON851("", "Error consultando almacenes", null, "error", "");
          _toggleNav();
        });
    },
    getGrupos() {
      postData({ datosh: datosEnvio() + localStorage.Usuario }, get_url("APP/INVENT/INV804.DLL"))
        .then((data) => {
          data.GRUPOS.pop();
          this.gurpos = data.GRUPOS.map((el) => ({ GRUPO: el.TIPO + el.GRUPO, DESCRIP: el.DESCRIP }));
          this.getClase();
        })
        .catch((err) => {
          loader("hide");
          console.error("Error consultando grupos: ", err);
          CON851("", "Error consultando grupos", null, "error", "");
          _toggleNav();
        });
    },
    getClase() {
      loader("show");
      postData({ datosh: datosEnvio() + localStorage.Usuario }, get_url("APP/INVENT/INV806.DLL"))
        .then((data) => {
          loader("hide");
          data.USO.pop();
          this.clases = data.USO;
          this.datoGrupoOrigen();
        })
        .catch((err) => {
          loader("hide");
          console.error("Error consultando clases: ", err);
          CON851("", "Error consultando clases", null, "error", "");
          _toggleNav();
        });
    },
    datoGrupoOrigen() {
      validarInputs(
        {
          form: "#datoGrupoOrigen",
        },
        () => {
          CON851P("03", this.datoGrupoOrigen, _toggleNav);
        },
        () => {
          this.art_origen.grupo = this.art_origen.grupo.trim().toUpperCase().padEnd(3, " ");
          if (this.art_origen.grupo.trim() && this.descripGrupoOrigen.trim()) this.datoArticuloOrigen();
          else this.datoGrupoOrigen();
        }
      );
    },
    datoArticuloOrigen() {
      validarInputs(
        {
          form: "#datoArticuloOrigen",
        },
        () => {
          this.datoGrupoOrigen();
        },
        () => {
          this.art_origen.articulo = this.art_origen.articulo.trim().toUpperCase().padEnd(13, " ");
          let articulo = this.articulos.find((el) => el.LLAVE_ART.slice(3, 16) == this.art_origen.articulo);
          if (articulo) this.datoClaseOrigen();
          else {
            CON851("01", "01", null, "warning", "");
            this.datoArticuloOrigen();
          }
        }
      );
    },
    datoClaseOrigen() {
      validarInputs(
        {
          form: "#datoClaseOrigen",
        },
        () => {
          this.datoArticuloOrigen();
        },
        () => {
          this.art_origen.clase = this.art_origen.clase.trim().toUpperCase().padEnd(2, " ");

          let llave_art = Object.values(this.art_origen).join("");

          if (this.articulos.find((el) => el.LLAVE_ART.trim() == llave_art.trim())) {
            this.datoGrupoDestino();
          } else {
            CON851("01", "01", null, "warning", "");
            this.datoArticuloOrigen();
          }
        }
      );
    },

    datoGrupoDestino() {
      validarInputs(
        {
          form: "#datoGrupoDestino",
        },
        () => {
          this.datoClaseOrigen();
        },
        () => {
          this.art_destino.grupo = this.art_destino.grupo.trim().toUpperCase().padEnd(3, " ");
          if (this.art_destino.grupo.trim() && this.descripGrupoDestino.trim()) this.datoArticuloDestino();
          else this.datoGrupoDestino();
        }
      );
    },
    datoArticuloDestino() {
      validarInputs(
        {
          form: "#datoArticuloDestino",
        },
        () => {
          this.datoGrupoDestino();
        },
        () => {
          this.art_destino.articulo = this.art_destino.articulo.trim().toUpperCase().padEnd(13, " ");
          let articulo = this.articulos.find((el) => el.LLAVE_ART.slice(3, 16) == this.art_destino.articulo);
          if (articulo) this.datoClaseDestino();
          else {
            CON851("01", "01", null, "warning", "");
            this.datoArticuloDestino();
          }
        }
      );
    },
    datoClaseDestino() {
      validarInputs(
        {
          form: "#datoClaseDestino",
        },
        () => {
          this.datoArticuloDestino();
        },
        () => {
          this.art_destino.clase = this.art_destino.clase.trim().toUpperCase().padEnd(2, " ");

          let articulo_origen = Object.values(this.art_origen).join("");
          let articulo_destino = Object.values(this.art_destino).join("");

          if (articulo_origen == articulo_destino) {
            CON851("", "El articulo de destino es igual al de origen!", null, "error", "");
            this.datoArticuloDestino();
          } else {
            if (this.articulos.find((el) => el.LLAVE_ART == articulo_destino)) {
              CON851P("04", this.datoClaseDestino, this.datoPeriodoTraslado);
            } else {
              CON851("01", "01", null, "warning", "");
              this.datoArticuloDestino();
            }
          }
        }
      );
    },

    datoPeriodoTraslado(index) {
      index = index || 0;

      if (!this.periodoTraslado[0].trim() && index === 0) Vue.set(this.periodoTraslado, 0, this.meses[0]);

      validarInputs(
        {
          form: `#mes_traslado${index}`,
          event_f3: () => this.aprobarTraslado(index),
        },
        () => {
          if (index === 0) this.datoClaseDestino();
          else this.datoPeriodoTraslado(--index);
        },
        () => {
          Vue.set(this.periodoTraslado, index, this.periodoTraslado[index].trim().toUpperCase());
          let isMonth = this.meses.indexOf(this.periodoTraslado[index]);
          if (this.validarMesesTraslado(index)) {
            if (index <= 10) {
              if (this.periodoTraslado[index] == "DIC") {
                this.initializePeriodos(index + 1);
                this.aprobarTraslado(index);
              } else {
                Vue.set(this.periodoTraslado, index + 1, this.meses[isMonth + 1] || "");
                this.datoPeriodoTraslado(++index);
              }
            } else this.aprobarTraslado(index);
          } else {
            this.datoPeriodoTraslado(index);
          }
        }
      );
    },

    aprobarTraslado(index) {
      CON851P(
        "Iniciar traslado?",
        () => this.datoPeriodoTraslado(index),
        () => {
          if (this.periodoTraslado[index].trim()) {
            if (this.validarMesesTraslado(index)) {
              this.initializePeriodos(index + 1);
              this.trasladarArticulo();
            } else this.datoPeriodoTraslado(index);
          } else this.trasladarArticulo();
        }
      );
    },

    async trasladarArticulo() {
      console.log(this.periodoTraslado);
      this.procesarEnvio()
        .then(() => {
          console.log("Proceso terminado!");
          _toggleNav();
        })
        .catch((err) => {
          console.error("Ha ocurrido un error procesando los periodos!", err);
          CON851("", "Ha ocurrido un error procesando los periodos!", null, "error", "");
          this.datoClaseDestino();
        });
    },

    procesarEnvio() {
      return new Promise(async (resolve, reject) => {
        let periodos = this.periodoTraslado.filter((el) => el.trim());

        let articulo_origen = Object.values(this.art_origen).join("").slice(1);
        let articulo_destino = Object.values(this.art_destino).join("").slice(1);

        if (periodos.length) {
          for (let periodo of periodos) {
            // periodos.forEach(async (periodo) => {
            let numberMonth = (this.meses.indexOf(periodo) + 1).toString().padStart(2, "0");

            this.label_loader = `Procesando mes ${periodo}`;

            await postData(
              {
                datosh:
                  datosEnvio() +
                  articulo_origen +
                  "|" +
                  articulo_destino +
                  "|" +
                  numberMonth +
                  "|" +
                  `${"20" + $_USUA_GLOBAL[0].FECHALNK}` +
                  "|",
              },
              get_url("APP/SALUD/ARRE-ARTICULOAOTRO.DLL"),
              {
                onProgress: (progress) => {
                  this.progreso = progress;
                },
              }
            )
              .then((data) => {
                this._impresionlistado_SAL211A(data.DATOS);
              })
              .catch((err) => {
                console.log(`Error procesando mes ${numberMonth}`, err);
                reject(err);
              });
            this.progreso = { transferred: 0, speed: 0 };
          }
          this.loader = false;
          this.progreso.completado = true;
          resolve();
        } else {
          CON851("", "¡Periodo vacío! ", null, "error", "");
          this.datoPeriodoTraslado(0);
        }
      });
    },

    // VENTANAS
    ventanaGrupos(input) {
      _fin_validar_form();
      const _this = this;

      _ventanaDatos({
        titulo: "VENTANA DE GRUPOS",
        columnas: ["GRUPO", "DESCRIP"],
        data: _this.gurpos,
        callback_esc: function () {
          _this[input]();
        },
        callback: function (data) {
          if (input == "datoGrupoOrigen") {
            _this.art_origen.grupo = data.GRUPO;
          } else {
            _this.art_destino.grupo = data.GRUPO;
          }
          _this[input]();
        },
      });
    },
    ventanaArticulos(input) {
      _fin_validar_form();

      let datos = [];
      if (input == "datoArticuloOrigen")
        datos = this.articulos.filter((el) => el.LLAVE_ART.slice(0, 3) == this.art_origen.grupo);
      else datos = this.articulos.filter((el) => el.LLAVE_ART.slice(0, 3) == this.art_destino.grupo);

      _ventanaDatos({
        titulo: "VENTANA DE ARTICULOS",
        columnas: ["LLAVE_ART", "DESCRIP_ART"],
        data: datos,
        callback_esc: () => {
          this[input]();
        },
        callback: (data) => {
          console.log(data);
          if (input == "datoArticuloOrigen") {
            this.art_origen.grupo = data.LLAVE_ART.slice(0, 3);
            this.art_origen.articulo = data.LLAVE_ART.slice(3, 16);
            this.art_origen.clase = data.LLAVE_ART.slice(16);
          } else {
            this.art_destino.grupo = data.LLAVE_ART.slice(0, 3);
            this.art_destino.articulo = data.LLAVE_ART.slice(3, 16);
            this.art_destino.clase = data.LLAVE_ART.slice(16);
          }
          this[input]();
        },
      });
    },
    ventanaClase(input) {
      _fin_validar_form();
      const _this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CLASES",
        columnas: ["COD", "DESCRIP"],
        data: _this.clases,
        callback_esc: function () {
          _this[input]();
        },
        callback: function (data) {
          console.log(data);
          if (input == "datoClaseOrigen") {
            _this.art_origen.clase = data.COD;
          } else {
            _this.art_destino.clase = data.COD;
          }
          _this[input]();
        },
      });
    },

    validarMesesTraslado(index) {
      let currentMonth = this.periodoTraslado[index].trim();
      let isMonth = this.meses.indexOf(currentMonth);

      if (!currentMonth) {
        this.initializePeriodos(index);
        CON851("02", "02", null, "warning", "");
        return false;
      }

      if (isMonth == -1) {
        CON851("03", "03", null, "warning", "");
        return false;
      }

      if (index > 0) {
        let beforeMonth = this.meses.indexOf(this.periodoTraslado[index - 1]);
        if (beforeMonth >= isMonth) {
          this.initializePeriodos(index);
          CON851("", "Período inferior al anterior!", null, "error", "");
          return false;
        }
      }
      return true;
    },
    initializePeriodos(index) {
      this.periodoTraslado = Array.from([...this.periodoTraslado.slice(0, index), ...Array(12 - index).fill("")]);
    },
    _impresionlistado_SAL211A(datos) {
      loader("show");
      if (datos[0].COMPROBANTE.trim() != "") {
        columnas = [
          {
            title: "COMPROBANTE",
            value: "COMPROBANTE",
            format: "string",
          },
          {
            title: "ARTICULO ANTERIOR",
            value: "ARTICULO_ANT",
            format: "string",
          },
          {
            title: "ARTICULO NUEVO",
            value: "ARTICULO",
            format: "string",
          },
        ];
        _impresion2({
          tipo: "excel",
          header: [{ text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 14 }, ``],
          logo: `${$_USUA_GLOBAL[0].NIT}.png`,
          ruta_logo: "P:\\PROG\\LOGOS\\",
          tabla: {
            columnas,
            data: datos,
          },
          archivo: localStorage.getItem("Usuario") + moment().format("YYYYMMDDHHmmssS"),
          scale: 65,
          orientation: "landscape",
        })
          .then(() => {
            loader("hide");
            CON851("", "Impreso Correctamente", null, "success", "Exito");
          })
          .catch(() => {
            CON851("", "Hubo un error en la impresión", null, "error", "Error");
            loader("hide");
          });
      } else {
        loader("hide");
        CON851("", "Articulo no tiene movimiento en los comprobantes", null, "error", "Error");
        this.datoClaseDestino();
      }
    },
  },
});
