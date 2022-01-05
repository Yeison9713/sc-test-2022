// LISTADO DE CARTERA X EDADES - OPCIONAL - DAVID.M - 16-02-2021

new Vue({
  el: "#INV544",
  data: {
    tipo_fact: "",
    prefijo: "",
    discrimina_unserv: "",
    discrimina_paciente: "",
    discrimina_ciudad: "",
    discrimina_factura: "",
    discrimina_especialidad: "",
    grupo: "",
    articulo: "",
    discrimina_codigo: "",
    solo_primera: "",
    solo_mayores: "",
    entidad: "",
    especialidad: "",
    distrib: "",
    centro_costo: "",
    omitir: "",
    ano_ini: 0,
    mes_ini: 0,
    dia_ini: 0,
    ano_fin: 0,
    mes_fin: 0,
    dia_fin: 0,
    fecha_act: moment().format("YYYYMMDD"),
    array_tipo_fact:
      $_USUA_GLOBAL[0].NIT == 800156469
        ? [
            { COD: "*", DESCRIP: "TODOS LOS SERVICIOS" },
            { COD: "0", DESCRIP: "DROGUERIA" },
            { COD: "1", DESCRIP: "CIRUGIAS" },
            { COD: "2", DESCRIP: "RX - IMAGENOLOGIA" },
            { COD: "3", DESCRIP: "PROMOCION Y PREVENCION" },
            { COD: "4", DESCRIP: "ECOGRAFIAS" },
            { COD: "5", DESCRIP: "DOPPLER" },
            { COD: "6", DESCRIP: "T.A.C." },
            { COD: "7", DESCRIP: "RESONANCIA NUCLERA" },
          ]
        : [
            { COD: "*", DESCRIP: "TODOS LOS SERVICIOS" },
            { COD: "0", DESCRIP: "DROGUERIA" },
            { COD: "1", DESCRIP: "CIRUGIAS" },
            { COD: "2", DESCRIP: "RX - IMAGENOLOGIA" },
            { COD: "3", DESCRIP: "PROMOCION Y PREVENCION" },
            { COD: "4", DESCRIP: "LAB. Y OTROS DIAG" },
            { COD: "5", DESCRIP: "OTROS SERVICIOS" },
            { COD: "6", DESCRIP: "CONSULTAS Y TERAPIAS" },
            { COD: "7", DESCRIP: "PATOLOGIA" },
          ],
    array_grupos: [],
    array_grser: [],
    array_articulos: [],
    array_entidades: [],
    array_especialidades: [],
    array_costos: [],
    array_cups: [],
  },
  created() {
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion("9-5-4-1-2-1 - Informe de atenciones en salud");
    $this = this;
    loader("show");
    this.traerGrupos();
  },

  computed: {
    descrip_tipo_fact() {
      if (this.tipo_fact == "*") {
        return "TODOS LOS SERVICIOS";
      } else {
        let serv = this.array_tipo_fact.find(
          (el) => el.COD == this.tipo_fact.trim()
        );
        return serv ? serv.DESCRIP : "";
      }
    },

    descrip_grupo() {
      if (this.grupo == "**") {
        return "TODOS LOS GRUPOS";
      } else {
        if (this.tipo_fact == 0) {
          let busqueda = this.array_grupos.find(
            (el) => el.GRUPO == this.grupo.trim()
          );
          return busqueda ? busqueda.DESCRIP : "";
        } else {
          let busqueda = this.array_grser.find(
            (el) => el.COD == this.grupo.trim()
          );
          return busqueda ? busqueda.DESCRIP : "";
        }
      }
    },

    descrip_articulo() {
      if (this.articulo.trim() == "*") {
        return "TODOS LOS ARTICULOS";
      } else {
        let busqueda = this.array_articulos.find(
          (el) => el.LLAVE_ART.slice(3).trim() == this.articulo.trim()
        );
        return busqueda ? busqueda.DESCRIP_ART : "";
      }
    },

    descrip_entidad() {
      if (this.entidad.trim() == 99) {
        return "TODAS LAS ENTIDADES";
      } else {
        let busqueda = this.array_entidades.find(
          (el) => el["COD-ENT"].trim() == this.entidad.trim()
        );
        return busqueda ? busqueda["NOMBRE-ENT"] : "";
      }
    },

    descrip_especialidad() {
      if (this.especialidad.trim() == "*") {
        return "TODAS LAS ESPECIALIDADES";
      } else {
        let busqueda = this.array_especialidades.find(
          (el) => el.CODIGO.trim() == this.especialidad.trim()
        );
        return busqueda ? busqueda.NOMBRE : "";
      }
    },

    descrip_centro_costo() {
      if (this.centro_costo == "****") {
        return "TODOS LOS COSTOS";
      } else {
        let busqueda = this.array_costos.find(
          (el) => el.COD.trim() == this.centro_costo.trim()
        );
        return busqueda ? busqueda.NOMBRE : "";
      }
    },
  },

  methods: {
    aceptar_tipo() {
      if (!this.tipo_fact.trim()) this.tipo_fact = "*";

      POPUP(
        {
          array: this.array_tipo_fact,
          titulo: "SERVICIOS",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.tipo_fact,
          teclaAlterna: true,
          callback_f: _toggleNav,
        },
        async (data) => {
          this.tipo_fact = data.COD;
          setTimeout(() => {
            this.aceptar_pago();
          }, 200);
        }
      );
    },

    aceptar_pago() {
      if (!this.prefijo.trim()) this.prefijo = "*";

      validarInputs(
        {
          form: "#prefijo",
        },
        () => {
          this.aceptar_tipo();
        },
        () => {
          this.prefijo = this.prefijo.toUpperCase();
          if (
            [
              "A",
              "P",
              "T",
              "B",
              "D",
              "F",
              "G",
              "H",
              "I",
              "J",
              "K",
              "L",
              "M",
              "N",
              "O",
              "Q",
              "R",
              "S",
              "V",
              "W",
              "X",
              "Y",
              "Z",
              "*",
            ].includes(this.prefijo)
          ) {
            this.opcion_unidad();
          } else {
            this.aceptar_pago();
          }
        }
      );
    },

    opcion_unidad() {
      if (!this.discrimina_unserv.trim()) this.discrimina_unserv = "S";

      validarInputs(
        {
          form: "#discrimina_unserv",
        },
        () => {
          this.aceptar_pago();
        },
        () => {
          this.discrimina_unserv = this.discrimina_unserv.toUpperCase();
          if (this.discrimina_unserv != "S") this.discrimina_unserv = "N";
          this.opcion_paci();
        }
      );
    },

    opcion_paci() {
      if (!this.discrimina_paciente.trim()) this.discrimina_paciente = "S";

      validarInputs(
        {
          form: "#discrimina_paciente",
        },
        () => {
          this.opcion_unidad();
        },
        () => {
          this.discrimina_paciente = this.discrimina_paciente.toUpperCase();
          if (this.discrimina_paciente != "S") this.discrimina_paciente = "N";
          this.opcion_ciudad();
        }
      );
    },

    opcion_ciudad() {
      if (!this.discrimina_ciudad.trim()) this.discrimina_ciudad = "S";

      validarInputs(
        {
          form: "#discrimina_ciudad",
        },
        () => {
          this.opcion_paci();
        },
        () => {
          this.discrimina_ciudad = this.discrimina_ciudad.toUpperCase();
          if (this.discrimina_ciudad != "S") this.discrimina_ciudad = "N";
          this.opcion_fact();
        }
      );
    },

    opcion_fact() {
      if (!this.discrimina_factura.trim()) this.discrimina_factura = "S";

      validarInputs(
        {
          form: "#discrimina_factura",
        },
        () => {
          this.opcion_paci();
        },
        () => {
          this.discrimina_factura = this.discrimina_factura.toUpperCase();
          if (this.discrimina_factura != "S") this.discrimina_factura = "N";
          this.opcion_espec();
        }
      );
    },

    opcion_espec() {
      if (!this.discrimina_especialidad.trim())
        this.discrimina_especialidad = "S";

      validarInputs(
        {
          form: "#discrimina_especialidad",
        },
        () => {
          this.opcion_fact();
        },
        () => {
          this.discrimina_especialidad = this.discrimina_especialidad.toUpperCase();
          if (this.discrimina_especialidad != "S")
            this.discrimina_especialidad = "N";
          this.fecha_inicial();
        }
      );
    },

    fecha_inicial(orden) {
      if (this.mes_ini == 0) {
        this.ano_ini = this.fecha_act.slice(0, 4);
        this.mes_ini = this.fecha_act.slice(4, 6);
        this.dia_ini = 01;
      }
      validarInputs(
        {
          form: "#fecha_inicial",
          orden: orden,
        },
        () => {
          this.opcion_espec();
        },
        () => {
          this.ano_ini = cerosIzq(this.ano_ini, 4);
          this.mes_ini = cerosIzq(this.mes_ini, 2);
          this.dia_ini = cerosIzq(this.dia_ini, 2);

          this.inicial =
            this.ano_ini.toString() +
            this.mes_ini.toString() +
            this.dia_ini.toString();

          if (this.mes_ini < 1 || this.mes_ini > 12) {
            CON851("37", "37", null, "error", "error");
            this.fecha_inicial("2");
          } else if (this.dia_ini < 1 || this.dia_ini > 31) {
            CON851("37", "37", null, "error", "error");
            this.fecha_inicial("3");
          } else {
            this.fecha_final("1");
          }
        }
      );
    },

    fecha_final(orden) {
      if (this.mes_fin == 0) {
        this.ano_fin = this.inicial.slice(0, 4);
        this.mes_fin = this.inicial.slice(4, 6);
        this.dia_fin = "31";
      }
      validarInputs(
        {
          form: "#fecha_final",
          orden: orden,
        },
        () => {
          this.fecha_inicial("3");
        },
        () => {
          this.ano_fin = cerosIzq(this.ano_fin, 4);
          this.mes_fin = cerosIzq(this.mes_fin, 2);
          this.dia_fin = cerosIzq(this.dia_fin, 2);

          this.final =
            this.ano_fin.toString() +
            this.mes_fin.toString() +
            this.dia_fin.toString();

          if (this.mes_fin < 1 || this.mes_fin > 12) {
            CON851("37", "37", null, "error", "error");
            this.fecha_final("2");
          } else if (this.dia_fin < 1 || this.dia_fin > 31) {
            CON851("37", "37", null, "error", "error");
            this.fecha_final("3");
          } else if (this.final < this.inicial) {
            CON851("37", "37", null, "error", "error");
            this.fecha_final("1");
          } else {
            this.dato_grupo("1");
          }
        }
      );
    },

    dato_grupo() {
      validarInputs(
        {
          form: "#grupo",
        },
        () => {
          this.fecha_final("3");
        },
        () => {
          if (this.grupo == "**") {
            this.articulo = '*'
            this.dato_codigo();
          } else {
            this.validaciones_grupo()
              .then((data) => {
                this.dato_art();
              })
              .catch((error) => {
                this.dato_grupo();
              });
          }
        }
      );
    },

    validaciones_grupo() {
      return new Promise((resolve, reject) => {
        if (!this.grupo.trim()) {
          CON851("02", "02", null, "error", "error");
          reject();
        }

        if (this.grupo == "**") {
          resolve();
        }

        if (this.tipo == 0) {
          if (!this.array_grupos.find((el) => el.GRUPO == this.grupo.trim())) {
            CON851("", "GRUPO NO EXISTE!", null, "error", "error");
          }
        } else {
          if (!this.array_grser.find((el) => el.COD == this.grupo.trim())) {
            CON851("", "GRUPO NO EXISTE!", null, "error", "error");
          }
        }

        resolve();
      });
    },

    dato_art() {
      if (!this.articulo.slice(0, 1).trim()) this.articulo = "*";

      validarInputs(
        {
          form: "#articulo",
        },
        () => {
          this.dato_grupo();
        },
        () => {
          if (this.articulo == "*") {
            this.dato_codigo();
          } else {
            if (!this.articulo.trim()) {
              this.dato_art();
            } else {
              loader("show");
              postData(
                {
                  datosh:
                    datosEnvio() +
                    "|" +
                    this.grupo.toString() +
                    this.articulo.toString(),
                },
                get_url("APP/SALUD/SER102C-01.DLL")
              )
                .then((data) => {
                  console.log(data);
                  this.dato_codigo();
                  loader("hide");
                })
                .catch((err) => {
                  this.dato_codigo();
                  console.log(err);
                  // CON851(
                  //   "",
                  //   "Error en consulta de datos",
                  //   null,
                  //   "error",
                  //   "error"
                  // );
                  loader("hide");
                });
            }
          }
        }
      );
    },

    dato_codigo() {
      if (this.grupo == "**" && this.articulo.slice(0, 1) == "*") {
        if (!this.discrimina_codigo.trim()) this.discrimina_codigo = "S";

        validarInputs(
          {
            form: "#discrimina_codigo",
          },
          () => {
            this.dato_grupo();
          },
          () => {
            this.discrimina_codigo = this.discrimina_codigo.toUpperCase();
            if (this.discrimina_codigo != "S") this.discrimina_codigo = "N";

            if (
              this.discrimina_factura == "N" &&
              this.discrimina_unserv == "N" &&
              this.discrimina_paciente == "N" &&
              this.discrimina_ciudad == "N" &&
              this.discrimina_especialidad == "N" &&
              this.discrimina_codigo == "N"
            ) {
              CON851("", "03", null, "error", "error");
              this.dato_codigo();
            } else {
              this.dato_repet();
            }
          }
        );
        // continue
      } else {
        this.discrimina_codigo = "S";
        this.aceptar_entidad();
      }
    },

    dato_repet() {
      if (
        (this.tipo_fact == 5 || this.tipo_fact == 7) &&
        this.discrimina_paciente == "S"
      ) {
        if (this.tipo_fact == 7 && this.grupo != 89) {
          this.solo_primera = "N";
          this.aceptar_entidad();
        } else {
          if (!this.solo_primera.trim()) this.solo_primera = "N";

          validarInputs(
            {
              form: "#solo_primera",
            },
            () => {
              this.dato_grupo();
            },
            () => {
              this.solo_primera = this.solo_primera.toUpperCase();
              if (this.solo_primera != "S") this.solo_primera = "N";
              this.dato_mayor();
            }
          );
        }
      } else {
        this.solo_primera = "N";
        this.dato_mayor();
      }
    },

    dato_mayor() {
      if (this.tipo_fact == 5) {
        if (!this.solo_mayores.trim()) this.solo_mayores = "N";

        validarInputs(
          {
            form: "#solo_mayores",
          },
          () => {
            this.dato_grupo();
          },
          () => {
            this.solo_mayores = this.solo_mayores.toUpperCase();
            if (this.solo_mayores != "S") this.solo_mayores = "N";
            this.aceptar_entidad();
          }
        );
      } else {
        this.solo_mayores = "N";
        this.aceptar_entidad();
      }
    },

    aceptar_entidad() {
      if (!this.entidad.trim()) this.entidad = "99";

      validarInputs(
        {
          form: "#entidad",
        },
        () => {
          this.dato_grupo();
        },
        () => {
          if (this.entidad == 99) {
            this.dato_especialidad();
          } else {
            if (
              this.array_entidades.find((el) => el["COD-ENT"] == this.entidad)
            ) {
              this.dato_especialidad();
            } else {
              CON851("", "01", null, "error", "error");
              this.aceptar_entidad();
            }
          }
        }
      );
    },

    dato_especialidad() {
      if (!this.especialidad.trim()) this.especialidad == "***";

      validarInputs(
        {
          form: "#especialidad",
        },
        () => {
          this.aceptar_entidad();
        },
        () => {
          if (this.especialidad == "***") {
            this.opcion_medic();
          } else {
            if (
              this.array_especialidades.find(
                (el) => el.CODIGO == this.especialidad
              )
            ) {
              this.opcion_medic();
            } else {
              CON851("", "01", null, "error", "error");
              this.dato_especialidad();
            }
          }
        }
      );
    },

    opcion_medic() {
      if (
        this.tipo_fact == 0 ||
        (this.tipo_fact == "*" && this.discrimina_codigo == "N")
      ) {
        if (!this.distrib.trim()) this.distrib = "S";

        validarInputs(
          {
            form: "#distrib",
          },
          () => {
            this.dato_especialidad();
          },
          () => {
            this.distrib = this.distrib.toUpperCase();
            if (this.distrib != "S") this.distrib = "N";
            this.dato_costo();
          }
        );
      } else {
        this.dato_costo();
      }
    },

    dato_costo() {
      console.log("llega a centro de costo");
      if (!this.centro_costo.trim()) this.centro_costo = "****";

      validarInputs(
        {
          form: "#centro_costo",
        },
        () => {
          this.dato_especialidad();
        },
        () => {
          if (this.centro_costo == "****") {
            this.dato_omitir();
          } else {
            if (
              this.array_costos.find(
                (el) => el.COD == this.centro_costo
              )
            ) {
              this.dato_omitir();
            } else {
              CON851("", "01", null, "error", "error");
              this.dato_costo();
            }
          }
        }
      );
    },

    dato_omitir() {
      if (this.tipo_fact == 0 || this.tipo_fact == "*") {
        if (!this.omitir.trim()) this.omitir = "S";

        validarInputs(
          {
            form: "#omitir",
          },
          () => {
            this.dato_costo();
          },
          () => {
            this.omitir = this.omitir.toUpperCase();
            if (this.omitir != "S") this.omitir = "N";
            this.confirmar();
          }
        );
      } else {
        this.omitir = "N";
        this.confirmar();
      }
    },

    confirmar() {
      this.llamar_DLL();
      // console.log("LLEGA A CONFIRMAR");
    },

    llamar_DLL() {
      loader("show");
      postData(
        {
          datosh:
            datosEnvio() +
            localStorage.Usuario +
            "|" +
            this.tipo_fact +
            "|" +
            this.prefijo +
            "|" +
            this.discrimina_unserv +
            "|" +
            this.discrimina_paciente +
            "|" +
            this.discrimina_ciudad +
            "|" +
            this.discrimina_factura +
            "|" +
            this.discrimina_especialidad +
            "|" +
            this.inicial +
            "|" +
            this.final +
            "|" +
            this.grupo +
            "|" +
            this.articulo +
            "|" +
            this.discrimina_codigo +
            "|" +
            this.solo_primera +
            "|" +
            this.solo_mayores +
            "|" +
            this.entidad +
            "|" +
            this.especialidad +
            "|" +
            this.distrib +
            "|" +
            this.centro_costo +
            "|" +
            this.omitir +
            "|",
        },
        get_url("APP/SALUD/INV544.DLL")
      )
        .then((data) => {
          console.log(data);
          loader("hide");
          this.generar_listado(data)
        })
        .catch((error) => {
          console.log(error);
          loader("hide");
          this.dato_omitir();
        });
    },

    async generar_listado(data) {
        let LISTADO = data.LISTADO;
        LISTADO.pop();
  
        // for (var i in LISTADO) {
        //   if (LISTADO[i].FECHA_PRE_LN.substring(4, 6) > 0) {
        //     LISTADO[i]['FECHA_VENCE_LN'] = LISTADO[i].FECHA_PRE_LN;
        //   } else {
        //     LISTADO[i]['FECHA_VENCE_LN'] = LISTADO[i].FECHA_RET_LN;
        //   }
        // }
  
        let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
        let nit = $_USUA_GLOBAL[0].NIT.toString();
        let fecha = moment().format('MMM DD/YY');

        let columnas = []
        if(this.discrimina_factura == 'S') {
          columnas = [
            {
              title: "Articulo",
              value: "ARTICULO",
              filterButton: true
            },
            {
              title: "Descripción",
              value: "DESCRIP"
            },
            {
              title: "Cantidad",
              value: "CANTIDAD"
            },
            {
              title: "Valor Venta",
              value: "VALOR",
              format: 'money'
            },
            {
              title: "Contibut",
              value: "CONTRIBUT"
            },
            {
              title: "Subsidiad",
              value: "SUBSIDIAD"
            },
            {
              title: "Vinculado",
              value: "VINCULADO"
            },
            {
              title: "Desplazadp",
              value: "DESPLAZADO"
            },
            {
              title: "Particular",
              value: "PARTICULAR"
            },
            {
              title: "Cedula",
              value: "CEDULA"
            },
            {
              title: "Paciente",
              value: "PACIENTE"
            },
            {
              title: "Comp",
              value: "FACTURA"
            },
            {
              title: " ",
              value: "CIUDAD"
            },
            {
              title: "  ",
              value: "ESPEC"
            },
            {
              title: "   ",
              value: "UNIDAD"
            }
          ]
        } else {
          columnas = [
            {
              title: "Articulo",
              value: "ARTICULO",
              filterButton: true
            },
            {
              title: "Descripción",
              value: "DESCRIP"
            },
            {
              title: "Cantidad",
              value: "CANTIDAD"
            },
            {
              title: "Valor Venta",
              value: "VALOR"
            },
            {
              title: "Contibut",
              value: "CONTRIBUT"
            },
            {
              title: "Subsidiad",
              value: "SUBSIDIAD"
            },
            {
              title: "Vinculado",
              value: "VINCULADO"
            },
            {
              title: "Particular",
              value: "PARTICULAR"
            },
            {
              title: "Nro Formul",
              value: "FORMUL"
            },
            {
              title: " ",
              value: "CIUDAD"
            },
            {
              title: "  ",
              value: "ESPEC"
            },
            {
              title: "   ",
              value: "UNIDAD"
            }
          ]
        }

        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE ATENCIONES EN SALUD     NIT: ${nit}`,
          `Fecha de reporte: ${fecha}`,
          `Periodo desde: ${this.inicial}  Hasta: ${this.final}`,
        ]
  
        _impresion2({
          tipo: 'excel',
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: LISTADO,
          },
          archivo: localStorage.Usuario + moment().format('-YYYY-MM-DD-HHmmss'),
          scale: '75',
          orientation: 'landscape'
        })
          .then(() => {
            console.log('Proceso terminado')
            loader('hide')
            this.aceptar_tipo()
          })
          .catch(() => {
            console.log('Proceso error')
          })
    },

    _ventanaGrupos() {
      if (this.tipo_fact == 0) {
        _ventanaDatos({
          titulo: "VENTANA DE GRUPOS",
          columnas: ["GRUPO", "DESCRIP"],
          data: this.array_grupos.filter((el) => el.TIPO == this.tipo_fact),
          callback_esc: function () {
            document.querySelector(".grupo").focus();
          },
          callback: function (data) {
            $this.grupo = data.GRUPO.trim();
            setTimeout(() => {
              _enterInput(".grupo");
            }, 200);
          },
        });
      } else {
        _ventanaDatos({
          titulo: "VENTANA DE GRUPOS-SER",
          columnas: ["COD", "DESCRIP"],
          data: this.array_grser,
          callback_esc: function () {
            document.querySelector(".grupo").focus();
          },
          callback: function (data) {
            $this.grupo = data.COD.trim();
            setTimeout(() => {
              _enterInput(".grupo");
            }, 200);
          },
        });
      }
    },

    _ventanaArticulos() {
      _ventanaDatos({
        titulo: "VENTANA DE ARTICULOS",
        columnas: ["LLAVE_ART", "DESCRIP_ART"],
        data: this.array_articulos.filter(
          (el) => el.LLAVE_ART.slice(0, 3) == this.tipo_fact + this.grupo
        ),
        callback_esc: function () {
          document.querySelector(".articulo").focus();
        },
        callback: function (data) {
          $this.articulo = data.LLAVE_ART.slice(3).trim();
          setTimeout(() => {
            _enterInput(".articulo");
          }, 200);
        },
      });
    },

    _ventanaEntidades() {
      _ventanaDatos({
        titulo: "VENTANA DE ENTIDADES",
        columnas: ["COD-ENT", "NOMBRE-ENT"],
        data: this.array_entidades,
        callback_esc: function () {
          document.querySelector(".entidad").focus();
        },
        callback: function (data) {
          $this.entidad = data["COD-ENT"].trim();
          setTimeout(() => {
            _enterInput(".entidad");
          }, 200);
        },
      });
    },

    _ventanaEspecialidades() {
      _ventanaDatos({
        titulo: "VENTANA DE ESPECIALIDADES",
        columnas: ["CODIGO", "NOMBRE"],
        data: this.array_especialidades,
        callback_esc: function () {
          document.querySelector(".especialidad").focus();
        },
        callback: function (data) {
          $this.especialidad = data.CODIGO.trim();
          setTimeout(() => {
            _enterInput(".especialidad");
          }, 200);
        },
      });
    },

    _ventanaCentroCostos() {
      _ventanaDatos({
        titulo: "VENTANA DE CENTROS DE COSTO",
        columnas: ["COD", "NOMBRE"],
        data: this.array_costos,
        callback_esc: function () {
          document.querySelector(".centro_costo").focus();
        },
        callback: function (data) {
          $this.centro_costo = data.COD.trim();
          setTimeout(() => {
            _enterInput(".centro_costo");
          }, 200);
        },
      });
    },

    traerGrupos() {
      postData({ datosh: datosEnvio() + "|" }, get_url("APP/INVENT/INV804.DLL"))
        .then((data) => {
          this.array_grupos = data.GRUPOS;
          this.array_grupos.pop();
          this.traerGrpSer();
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _toggleNav();
        });
    },

    traerGrpSer() {
      postData({ datosh: datosEnvio() + "|" }, get_url("APP/SALUD/SER801.DLL"))
        .then((data) => {
          this.array_grser = data.CODIGOS;
          this.array_grser.pop();
          this.traerArticulos();
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _toggleNav();
        });
    },

    traerArticulos() {
      postData({ datosh: datosEnvio() + "|" }, get_url("APP/INVENT/INV803.DLL"))
        .then((data) => {
          this.array_articulos = data.ARTICULOS;
          this.array_articulos.pop();
          this.traerEntidades();
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _toggleNav();
        });
    },

    traerEntidades() {
      postData({ datosh: datosEnvio() + "|" }, get_url("APP/SALUD/SER853.DLL"))
        .then((data) => {
          this.array_entidades = data.ENTIDADES;
          this.array_entidades.pop();
          this.traerEspecialidades();
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _toggleNav();
        });
    },

    traerEspecialidades() {
      postData({ datosh: datosEnvio() + "|" }, get_url("APP/SALUD/SER855.DLL"))
        .then((data) => {
          this.array_especialidades = data.ESPECIALIDADES;
          this.array_especialidades.pop();
          this.traerCostos();
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _toggleNav();
        });
    },

    traerCostos() {
      postData({ datosh: datosEnvio() + "|" }, get_url("APP/CONTAB/CON803.DLL"))
        .then((data) => {
          this.array_costos = data.COSTO;
          this.array_costos.pop();
          loader("hide");
          this.aceptar_tipo();
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _toggleNav();
        });
    },
  },
});
