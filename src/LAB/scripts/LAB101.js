new Vue({
  el: "#LAB101",
  data: {
    global_lab101: {
      CODIGO_MACRO: "",
      DESCRIPCION: "",
      COMPONENTES: [],
      HALLAZGOS: "",
      OPER_CREA: "",
      FECHA_CREA: "",
      OPER_MODIF: "",
      FECHA_MODIF: "",
      CONCLUSIONES: "",
      TIENE_PARRAFO_INI: "",
      TITULO_PARRAFO_INI: "",
      PARRAFO_INI: "",
      TITULO_HALLAZGOS: "",
      TITULO_CONCLUSIONES: "",
      TIENE_2_TABLA: "",
      TABLA_2: []
    },
    tabla: {
      ITEM: "",
      COMPONENTE: "",
    },
    tabla_2: {
      ITEM: "",
      COMPONENTE: "",
    },
    componentes: [],
    cups: [],
    macrosLab: [],
    novedad: "",
    llave: "",
    textos: {
      descrip_novedad: "",
      descrip_cup: "",
    },
    ES_LAB: true,
    ventanaCups: false,
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    _inputControl("reset");

    nombreOpcion("1,2 - Actualizar Macros");

    loader("show");
    this.traerMacros();
  },
  watch: {},
  components: {
    ser802c: require("../../SALUD/scripts/SER802C.vue.js"),
  },
  methods: {
    traerMacros() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/LAB/LAB101.DLL"))
        .then((data) => {
          console.log(data);
          _this.macrosLab = data.MACROSLAB;
          _this.macrosLab.pop();
          _this.traerComponentes();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "error consultando componentes", null, "error", "Error");
          _this.salir_lab101();
        });
    },
    traerComponentes() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/LAB/LABCOMP.DLL"))
        .then((data) => {
          console.log(data);
          _this.componentes = data.COMPONENTES;
          _this.componentes.pop();
          loader("hide");
          CON850(this.evaluarNovedad);
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "error consultando macros", null, "error", "Error");
          _this.salir_lab101();
        });
    },
    evaluarNovedad(novedad) {
      this.novedad = novedad.id;

      switch (this.novedad) {
        case "7":
        case "8":
        case "9":
          this.textos.descrip_novedad = novedad.id + " - " + novedad.descripcion;
          this.validarMacro();
          break;
        case "F":
          this.salir_lab101();
          break;
      }
    },
    ventana_macrosLab() {
      var _this = this;
      _fin_validar_form();

      if (this.novedad != "7") {
        _ventanaDatos({
          titulo: "VENTANA MACROS EXISTENTES",
          columnas: ["CODIGO", "DESCRIP"],
          label: ["Codigo", "Descripcion"],
          data: this.macrosLab,
          ancho: "80%",
          callback_esc: () => {
            _this.validarMacro();
          },
          callback: (data) => {
            _this.llave = data.CODIGO.trim();
            _this.validarMacro();
            setTimeout(() => _enterInput("#codigoMacro_lab101"), 100);
          },
        });
      } else this.ventanaCups = true;
    },
    escVentanaCups() {
      this.ventanaCups = false;
      this.validarMacro();
    },
    successVentanaCups(data) {
      this.ventanaCups = false;
      this.llave = data.llave;
      this.validarMacro();
      setTimeout(() => _enterInput("#codigoMacro_lab101"), 100);
    },
    async validarMacro() {
      validarInputs(
        {
          form: "#validarLlave_LAB101",
          orden: "1",
        },
        () => CON850(this.evaluarNovedad),
        async () => {
          this.llave = this.llave.trim();

          var busquedaCup = await this.buscarCups();
          console.log(busquedaCup);
          var busquedaMacro = this.macrosLab.find((x) => x.CODIGO.trim() == this.llave);

          if (!busquedaCup) this.validarMacro();
          // else if (busquedaCup.TIPO.trim() == "1" || busquedaCup.TIPO.trim() == "5") {
          //   CON851("78", "Cups tipo 1 y 5 inválidos", null, "error", "error");
          //   this.validarMacro();
          // } else {
          else {
            switch (this.novedad) {
              case "7":
                if (!busquedaMacro) {
                  if (this.llave.slice(0, 2) != "90" && this.llave.slice(0, 2) != "91") this.ES_LAB = false;
                  this.textos.descrip_cup = busquedaCup.DESCRIP.trim();
                  this.tabla.ITEM = 1;
                  this.validarTieneParrafo();
                } else {
                  CON851("00", "Macro ya existe", null, "error", "error");
                  this.validarMacro();
                }

                break;
              case "8":
              case "9":
                if (!busquedaMacro) {
                  CON851("01", "Macro no existe", null, "error", "error");
                  this.validarMacro();
                } else {
                  this.textos.descrip_cup = busquedaCup.DESCRIP.trim();
                  if (this.llave.slice(0, 2) != "90" && this.llave.slice(0, 2) != "91") this.ES_LAB = false;
                  this.traerMacro_completa();
                }
                break;
            }
          }
        }
      );
    },
    async buscarCups() {
      loader("show");
      return new Promise(async (resolve, reject) => {
        let envio = {
          datosh: datosEnvio(),
          cup: this.llave,
        };
        await postData(envio, get_url("APP/SALUD/SER802C.DLL"))
          .then((data) => {
            loader("hide");
            resolve(data);
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            resolve(false);
          });
      });
    },
    traerMacro_completa() {
      var _this = this;

      postData({ datosh: datosEnvio() + this.llave + "|" }, get_url("APP/LAB/LAB101-02.DLL"))
        .then((data) => {
          console.log(data);
          _this.global_lab101 = data.MACRO_FULL[0];
          _this.AsignarDatos();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "error consultando macro completa", null, "error", "Error");
          _this.validarMacro();
        });
    },
    AsignarDatos() {
      for (var i in this.global_lab101.COMPONENTES) {
        this.global_lab101.COMPONENTES[i].ITEM = parseInt(this.global_lab101.COMPONENTES[i].ITEM);
        this.global_lab101.COMPONENTES[i].DESCRIP = this.global_lab101.COMPONENTES[i].DESCRIP.trim();
      }

      this.global_lab101.PARRAFO_INI = this.global_lab101.PARRAFO_INI.replace(/\&/g, "\n").trim();
      this.global_lab101.HALLAZGOS = this.global_lab101.HALLAZGOS.replace(/\&/g, "\n").trim();
      this.global_lab101.CONCLUSIONES = this.global_lab101.CONCLUSIONES.replace(/\&/g, "\n").trim();

      if (this.novedad == "9") {
        if (localStorage.Usuario == "GEBC" || localStorage.Usuario == "ADMI") {
          CON851P(
            "La eliminación de esta macro solo afectará los resultados no diligenciados hasta la fecha, seguro que desea eliminarlo?",
            this.validarMacro,
            this._grabardatos_lab101
          );
        } else {
          jAlert(
            { titulo: "Advertencia ", mensaje: "Usted no está autorizado para eliminar macros !" },
            this.validarMacro
          );
        }
      } else {
        this.tabla.ITEM = 1;
        this.validarTieneParrafo();
      }
    },
    validarTieneParrafo() {
      validarInputs(
        {
          form: "#validarTieneParrafo",
          orden: "1",
        },
        () => {
          CON851P("03", this.validarTieneParrafo, () => {
            this.vaciarGlobal();
            this.validarMacro();
          });
        },
        () => {
          this.global_lab101.TIENE_PARRAFO_INI =
            this.global_lab101.TIENE_PARRAFO_INI.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.global_lab101.TIENE_PARRAFO_INI == "S") this.validarTituloParrafo();
          else {
            this.global_lab101.TITULO_PARRAFO_INI = "";
            this.global_lab101.PARRAFO_INI = "";
            this.validarItem();
          }
        }
      );
    },
    validarTituloParrafo() {
      validarInputs(
        {
          form: "#validarTituloParrafo",
          orden: "1",
        },
        () => {
          this.validarTieneParrafo();
        },
        () => {
          this.global_lab101.TITULO_PARRAFO_INI = this.global_lab101.TITULO_PARRAFO_INI.trim();
          this.validarParrafo();
        }
      );
    },
    validarParrafo() {
      validarInputs(
        {
          form: "#validarParrafo",
          orden: "1",
        },
        () => {
          this.global_lab101.PARRAFO_INI = this.global_lab101.PARRAFO_INI.replaceEsp();
          this.validarTituloParrafo();
        },
        () => {
          this.global_lab101.PARRAFO_INI = this.global_lab101.PARRAFO_INI.replaceEsp();
          this.validarItem();
        }
      );
    },
    _validarTabla_lab101(orden) {
      validarTabla(
        {
          tabla: "#validarTabla_LAB101",
          orden: orden,
          event_f3: this.verificarGrupo_lab101,
          Esc: this.validarItem,
        },
        this.bajarDatosTabla,
        this.validarItem,
        this.verificarGrupo_lab101
      );
    },
    bajarDatosTabla(datos) {
      this.tabla.ITEM = parseInt(datos.cells[0].textContent);
      var existe = this.global_lab101.COMPONENTES.find((x) => parseInt(x.ITEM) == this.tabla.ITEM);

      if (existe) {
        this.tabla.COMPONENTE = existe.CODIGO;
        this.validarComponente();
      } else {
        CON851("", "Ha ocurrido un error", null, "error", "error");
        this.validarItem();
      }
    },
    validarItem() {
      validarInputs(
        {
          form: "#validarItem_LAB101",
          orden: "1",
          event_f3: () => {
            if (this.global_lab101.COMPONENTES.length < 1) {
              CON851("", "Tabla sin componentes", null, "error", "error");
              this.validarItem();
            } else {
              this.tabla.ITEM = "";
              this.tabla.COMPONENTE = "";
              this.verificarGrupo_lab101()
              // this._validarTabla_lab101("0");
            }
          },
        },
        () => {
          if (this.global_lab101.TIENE_PARRAFO_INI == "S") this.validarParrafo();
          else this.validarTieneParrafo();
        },
        () => {
          this.tabla.ITEM = parseInt(this.tabla.ITEM);

          if (this.tabla.ITEM > 40 || this.tabla.ITEM < 1) {
            CON851("", "Item fuera de rango!", null, "error", "error");
            this.validarItem();
          } else {
            var existe = this.global_lab101.COMPONENTES.find((x) => parseInt(x.ITEM) == this.tabla.ITEM);

            if (existe) {
              this.tabla.COMPONENTE = existe.CODIGO;
              this.validarComponente();
            } else {
              this.tabla.COMPONENTE = "";
              this.validarComponente();
            }
          }
        }
      );
    },
    ventana_componentes(param) {
      var _this = this;
      let input = ""

      switch (param) {
        case 1: input = "componente_LAB101"
          break;
        case 2: input = "componente_2_LAB101"
          break;
      }

      _ventanaDatos({
        titulo: "Ventana Componentes",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: this.componentes,
        ancho: "60%",
        callback_esc: () => {
          document.getElementById(input).focus();
        },
        callback: (data) => {
          switch (param) {
            case 1: _this.tabla.COMPONENTE = data.CODIGO;
                break;
            case 2: _this.tabla_2.COMPONENTE = data.CODIGO;
                break;
          }
          setTimeout(() => _enterInput("#" + input), 100);
        },
      });
    },
    validarComponente() {
      validarInputs(
        {
          form: "#validarComponente_LAB101",
          orden: "1",
        },
        () => {
          this.tabla.COMPONENTE = "";
          this.validarItem();
        },
        () => {
          var index = this.global_lab101.COMPONENTES.findIndex((x) => parseInt(x.ITEM) == parseInt(this.tabla.ITEM));

          if (this.tabla.COMPONENTE.trim() == "") {
            if (index == -1) {
              CON851("", "Debe digitar un componente!", null, "warning", "Advertencia");
              this.validarComponente();
            } else {
              CON851P(
                "Seguro que desea eliminar este componente?, solo afectará los resultados no diligenciados hasta la fecha",
                this.validarComponente,
                () => this.eliminarItem(index)
              );
            }
          } else {
            this.tabla.COMPONENTE = this.tabla.COMPONENTE.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
              .toUpperCase()
              .trim();
            this.tabla.COMPONENTE = this.tabla.COMPONENTE.replace(/Ñ/g, "\001");
            this.tabla.COMPONENTE = this.tabla.COMPONENTE.normalize("NFD").replace(/[\u0300-\u032a]/g, "");
            this.tabla.COMPONENTE = this.tabla.COMPONENTE.replace(/\001/g, "Ñ");

            var busqueda = this.componentes.find((x) => x.CODIGO.toUpperCase().trim() == this.tabla.COMPONENTE);

            if (busqueda) {
              var existe = this.global_lab101.COMPONENTES.find(
                (x) => x.CODIGO.toUpperCase().trim() == this.tabla.COMPONENTE
              );
              console.log(busqueda);

              if (!existe) {
                this.modificarItem(index, busqueda);
              } else if (existe && parseInt(existe.ITEM) == this.tabla.ITEM) {
                this.tabla.ITEM = parseInt(this.tabla.ITEM) + 1;
                this.tabla.COMPONENTE = "";
                this.validarItem();
              } else {
                CON851("", "Componente no se puede repetir!", null, "error", "Error");
                this.validarComponente();
              }
            } else {
              CON851("", "Componente no existe!", null, "error", "Error");
              this.validarComponente();
            }
          }
        }
      );
    },
    modificarItem(index, existe) {
      if (index == -1) {
        this.global_lab101.COMPONENTES.push({
          ITEM: this.tabla.ITEM,
          CODIGO: this.tabla.COMPONENTE,
          DESCRIP: existe.DESCRIPCION.trim(),
        });
      } else {
        this.global_lab101.COMPONENTES[index].ITEM = this.tabla.ITEM;
        this.global_lab101.COMPONENTES[index].CODIGO = this.tabla.COMPONENTE;
        this.global_lab101.COMPONENTES[index].DESCRIP = existe.DESCRIPCION.trim();
      }

      this.tabla.ITEM = parseInt(this.tabla.ITEM) + 1;
      this.tabla.COMPONENTE = "";

      this.global_lab101.COMPONENTES.sort((a, b) => {
        if (parseInt(a.ITEM) > parseInt(b.ITEM)) {
          return 1;
        }
        if (parseInt(a.ITEM) < parseInt(b.ITEM)) {
          return -1;
        }
        return 0;
      });

      this.validarItem();
    },
    eliminarItem(index) {
      this.global_lab101.COMPONENTES.splice(index, 1);
      this.validarItem();
    },
    verificarGrupo_lab101() {
      if (this.ES_LAB) this.validarConclusiones();
      else this.validarTituloHallazgos();
    },
    validarTituloHallazgos() {
      if (this.global_lab101.TITULO_HALLAZGOS.trim() == "") this.global_lab101.TITULO_HALLAZGOS = "Hallazgos";
      validarInputs(
        {
          form: "#validarTituloHallazgos",
          orden: "1",
        },
        () => {
          this.validarItem()
          // this._validarTabla_lab101("0");
        },
        () => {
          this.global_lab101.TITULO_HALLAZGOS = this.global_lab101.TITULO_HALLAZGOS.trim();
          this.validarHallazgos();
        }
      );
    },
    validarHallazgos() {
      validarInputs(
        {
          form: "#validarHallazgos_lab101",
          orden: "1",
        },
        () => {
          this.global_lab101.HALLAZGOS = this.global_lab101.HALLAZGOS.replaceEsp();
          this.validarTituloHallazgos();
        },
        () => {
          this.global_lab101.HALLAZGOS = this.global_lab101.HALLAZGOS.replaceEsp();

          this.validarTieneSegundaTabla();
        }
      );
    },
    validarTieneSegundaTabla() {
      validarInputs(
        {
          form: "#validarTieneSegundaTabla",
          orden: "1",
        },
        () => {
          this.validarHallazgos()
        },
        () => {
          this.global_lab101.TIENE_2_TABLA =
            this.global_lab101.TIENE_2_TABLA.toUpperCase().trim() != "S" ? "N" : "S";

          if (this.global_lab101.TIENE_2_TABLA == "S"){
            this.tabla_2.ITEM = 1;
            this.validarItem_2()
          } else this.validarTituloConclusiones()
        }
      );
    },
    _validarTabla_2_lab101(orden) {
      validarTabla(
        {
          tabla: "#validarTabla_2_LAB101",
          orden: orden,
          event_f3: this.validarTituloConclusiones,
          Esc: this.validarItem_2,
        },
        this.bajarDatosTabla_2,
        this.validarItem_2,
        this.validarTituloConclusiones
      );
    },
    bajarDatosTabla_2(datos) {
      this.tabla_2.ITEM = parseInt(datos.cells[0].textContent);
      var existe = this.global_lab101.TABLA_2.find((x) => parseInt(x.ITEM) == this.tabla_2.ITEM);

      if (existe) {
        this.tabla_2.COMPONENTE = existe.CODIGO;
        this.validarComponente_2();
      } else {
        CON851("", "Ha ocurrido un error", null, "error", "error");
        this.validarItem_2();
      }
    },
    validarItem_2() {
      validarInputs(
        {
          form: "#validarItem_2_LAB101",
          orden: "1",
          event_f3: () => {
            if (this.global_lab101.TABLA_2.length < 1) {
              CON851("", "Tabla sin componentes", null, "error", "error");
              this.validarItem_2();
            } else {
              this.tabla_2.ITEM = "";
              this.tabla_2.COMPONENTE = "";
              this.validarTituloConclusiones()
              // this._validarTabla_2_lab101("0");
            }
          },
        },
        () => {
          this.validarTieneSegundaTabla()
        },
        () => {
          this.tabla_2.ITEM = parseInt(this.tabla_2.ITEM);

          if (this.tabla_2.ITEM > 40 || this.tabla_2.ITEM < 1) {
            CON851("", "Item fuera de rango!", null, "error", "error");
            this.validarItem_2();
          } else {
            var existe = this.global_lab101.TABLA_2.find((x) => parseInt(x.ITEM) == this.tabla_2.ITEM);

            if (existe) {
              this.tabla_2.COMPONENTE = existe.CODIGO;
              this.validarComponente_2();
            } else {
              this.tabla_2.COMPONENTE = "";
              this.validarComponente_2();
            }
          }
        }
      );
    },
    validarComponente_2() {
      validarInputs(
        {
          form: "#validarComponente_2_LAB101",
          orden: "1",
        },
        () => {
          this.tabla_2.COMPONENTE = "";
          this.validarItem_2();
        },
        () => {
          var index = this.global_lab101.TABLA_2.findIndex((x) => parseInt(x.ITEM) == parseInt(this.tabla_2.ITEM));

          if (this.tabla_2.COMPONENTE.trim() == "") {
            if (index == -1) {
              CON851("", "Debe digitar un componente!", null, "warning", "Advertencia");
              this.validarComponente_2();
            } else {
              CON851P(
                "Seguro que desea eliminar este componente?, solo afectará los resultados no diligenciados hasta la fecha",
                this.validarComponente_2,
                () => this.eliminarItem_2(index)
              );
            }
          } else {
            this.tabla_2.COMPONENTE = this.tabla_2.COMPONENTE.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
              .toUpperCase()
              .trim();
            this.tabla_2.COMPONENTE = this.tabla_2.COMPONENTE.replace(/Ñ/g, "\001");
            this.tabla_2.COMPONENTE = this.tabla_2.COMPONENTE.normalize("NFD").replace(/[\u0300-\u032a]/g, "");
            this.tabla_2.COMPONENTE = this.tabla_2.COMPONENTE.replace(/\001/g, "Ñ");

            var busqueda = this.componentes.find((x) => x.CODIGO.toUpperCase().trim() == this.tabla_2.COMPONENTE);

            if (busqueda) {
              var existe = this.global_lab101.TABLA_2.find(
                (x) => x.CODIGO.toUpperCase().trim() == this.tabla_2.COMPONENTE
              );
              console.log(busqueda);

              if (!existe) {
                this.modificarItem_2(index, busqueda);
              } else if (existe && parseInt(existe.ITEM) == this.tabla_2.ITEM) {
                this.tabla_2.ITEM = parseInt(this.tabla_2.ITEM) + 1;
                this.tabla_2.COMPONENTE = "";
                this.validarItem_2();
              } else {
                CON851("", "Componente no se puede repetir!", null, "error", "Error");
                this.validarComponente_2();
              }
            } else {
              CON851("", "Componente no existe!", null, "error", "Error");
              this.validarComponente_2();
            }
          }
        }
      );
    },
    modificarItem_2(index, existe) {
      if (index == -1) {
        this.global_lab101.TABLA_2.push({
          ITEM: this.tabla_2.ITEM,
          CODIGO: this.tabla_2.COMPONENTE,
          DESCRIP: existe.DESCRIPCION.trim(),
        });
      } else {
        this.global_lab101.TABLA_2[index].ITEM = this.tabla_2.ITEM;
        this.global_lab101.TABLA_2[index].CODIGO = this.tabla_2.COMPONENTE;
        this.global_lab101.TABLA_2[index].DESCRIP = existe.DESCRIPCION.trim();
      }

      this.tabla_2.ITEM = parseInt(this.tabla_2.ITEM) + 1;
      this.tabla_2.COMPONENTE = "";

      this.global_lab101.TABLA_2.sort((a, b) => {
        if (parseInt(a.ITEM) > parseInt(b.ITEM)) {
          return 1;
        }
        if (parseInt(a.ITEM) < parseInt(b.ITEM)) {
          return -1;
        }
        return 0;
      });

      this.validarItem_2();
    },
    eliminarItem_2(index) {
      this.global_lab101.TABLA_2.splice(index, 1);
      this.validarItem_2();
    },
    validarTituloConclusiones() {
      if (this.global_lab101.TITULO_CONCLUSIONES.trim() == "") this.global_lab101.TITULO_CONCLUSIONES = "Conclusiones";
      validarInputs(
        {
          form: "#validarTituloConclusiones",
          orden: "1",
        },
        () => {
          if (this.ES_LAB) {
            this.validarItem()
            // this._validarTabla_lab101("0");
          } else {
            if (this.global_lab101.TIENE_2_TABLA == "S") this.validarItem_2();
            else this.validarTieneSegundaTabla()
          }
        },
        () => {
          this.global_lab101.TITULO_CONCLUSIONES = this.global_lab101.TITULO_CONCLUSIONES.trim();
          this.validarConclusiones();
        }
      );
    },
    validarConclusiones() {
      validarInputs(
        {
          form: "#validarConclusiones_lab101",
          orden: "1",
        },
        () => {
          this.global_lab101.CONCLUSIONES = this.global_lab101.CONCLUSIONES.replaceEsp();
          this.validarTituloConclusiones();
        },
        () => {
          this.global_lab101.CONCLUSIONES = this.global_lab101.CONCLUSIONES.replaceEsp();

          var codigo = "01";
          if (this.novedad == "8")
            codigo =
              "La modificación de esta macro solo afectará los resultados pendientes por diligenciar, seguro que desea modificarlo ?";

          CON851P(codigo, this.validarConclusiones, this._grabardatos_lab101);
        }
      );
    },
    _grabardatos_lab101() {
      var _this = this;

      var data = {};

      var datos_envio = datosEnvio();
      datos_envio += this.novedad;
      datos_envio += "|";
      datos_envio += espaciosDer(this.llave, 12)
      datos_envio += "|";
      datos_envio += localStorage.Usuario;
      datos_envio += "|";
      datos_envio += moment().format("YYYYMMDD");
      datos_envio += "|";
      datos_envio += moment().format("HHmm");
      datos_envio += "|";

      data["datosh"] = datos_envio;

      this.global_lab101.COMPONENTES.forEach((item, i) => {
        var pos = i + 1;

        data["COM-" + pos.toString().padStart(3, "0")] = espaciosDer(item.CODIGO, 40);
      });

      this.global_lab101.TABLA_2.forEach((item, i) => {
        var pos = i + 1;

        data["COM_2-" + pos.toString().padStart(3, "0")] = espaciosDer(item.CODIGO, 40);
      });

      var parrafo = this.global_lab101.PARRAFO_INI.enterReplace().strToTable("PARRAF");
      for (indice in parrafo) data[indice] = parrafo[indice];

      var hallazgos = this.global_lab101.HALLAZGOS.enterReplace().strToTable("HAL");
      for (indice in hallazgos) data[indice] = hallazgos[indice];

      var conclusiones = this.global_lab101.CONCLUSIONES.enterReplace().strToTable("CONC");
      for (indice in conclusiones) data[indice] = conclusiones[indice];

      data['TIENE_2_TABLA'] = this.global_lab101.TIENE_2_TABLA
      data['TIENE_PARRAFO_INI'] = this.global_lab101.TIENE_PARRAFO_INI
      data['TITULO_PARRAFO_INI'] = this.global_lab101.TITULO_PARRAFO_INI
      data['TITULO_HALLAZGOS'] = this.global_lab101.TITULO_HALLAZGOS
      data['TITULO_CONCLUSIONES'] = this.global_lab101.TITULO_CONCLUSIONES

      console.log(data);

      postData(data, get_url("APP/LAB/LAB101-03.DLL"))
        .then((data) => {
          console.log(data);
          var mensaje;
          switch (_this.novedad) {
            case "7":
              mensaje = "Creado correctamente";
              break;
            case "8":
              mensaje = "Modificado correctamente";
              break;
            case "9":
              mensaje = "Eliminado correctamente";
              break;
          }
          CON851("", mensaje, null, "success", "Exitoso");
          _this.salir_lab101();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          _this.validarConclusiones();
        });
    },
    vaciarGlobal() {
      this.global_lab101 = {
        CODIGO_MACRO: "",
        DESCRIPCION: "",
        COMPONENTES: [],
        HALLAZGOS: "",
        OPER_CREA: "",
        FECHA_CREA: "",
        OPER_MODIF: "",
        FECHA_MODIF: "",
        CONCLUSIONES: "",
        TIENE_PARRAFO_INI: "",
        TITULO_PARRAFO_INI: "",
        PARRAFO_INI: "",
        TITULO_HALLAZGOS: "",
        TITULO_CONCLUSIONES: "",
        TIENE_2_TABLA: "",
        TABLA_2: []
      };
      this.tabla = {
        ITEM: "",
        COMPONENTE: "",
      };

      this.ES_LAB = true;
    },
    salir_lab101() {
      _inputControl("disabled");
      _inputControl("reset");
      _toggleNav();
    },
  },
});
