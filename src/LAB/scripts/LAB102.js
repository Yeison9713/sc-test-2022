new Vue({
  el: "#lab102",
  data: {
    profesionales_lab102: [],
    global_lab102: {
      LLAVE: "",
      FECHA: "",
      CTA: "",
      ID_HISTORIA: "",
      DESCRIP_PACI: "",
      ID_MEDICO: "",
      REG_MEDICO: "",
      NOMBRE_MEDICO: "",
      PUERTA_ESTAD: "",
      ID_ENTIDAD: "",
      ENTIDAD: "",
      NOM_ENTIDAD: "",
      NIT: "",
      EDAD: "",
      IMP: "",
      ADMI_CREA: "",
      FECHA_CREA: "",
      HORA_CREA: "",
      SEXO: "",
      DESCRIP_CUP: "",
      PESO: "",
      TALLA: "",
      REFERIDO: "",
      DESCRIP_REFERIDO: "",
      DIAGNOS: "",
      DESCRIP_DIAGNOS: "",
      REGISTRO_ESCRITO: "",
      CONCLUSIONES: "",
      HALLAZGOS: "",
      ADJUNTOS: "",
      QUIEN_REFIERE: "",
      TABLA: [],
      DESCRIP_ESPEC_MEDICO: "",
      FECHA_REALIZO_LAB: {
        ANO: "",
        MES: "",
        DIA: "",
        HORA: "",
        MINUTO: "",
      },
      TIENE_PARRAFO_INI: "",
      TITULO_PARRAFO_INI: "",
      TITULO_HALLAZGOS: "",
      TITULO_CONCLUSIONES: "",
      PARRAFO_INI: "",
      TABLA_2: [],
      TIENE_2_TABLA: ""
    },
    cardioriente: "",
    plantillas: [],
    fila_temp: {
      ITEM: "",
      COMPONENTE: "",
      RESULTADO: "",
      UNID_MEDIDA: "",
      PLANTILLA: "",
    },
    fila_temp_2: {
      ITEM: "",
      COMPONENTE: "",
      RESULTADO: "",
      UNID_MEDIDA: "",
      PLANTILLA: "",
    },
    CONSULTA: false,
    ES_LAB: true,
    ventanaProfesionales: false,
    paramsEspec: ["701", "732", "710", "360", "602", "781", "387", "120", "122", "302", "381"],
    paramsAtiende: ["1", "5"],
  },
  created() {
    _inputControl("disabled");
    _inputControl("reset");

    if (localStorage.Modulo == "HIC") {
      nombreOpcion("7,3 - Consultar resultados lab");
    } else {
      nombreOpcion("2,2 - Resultados estandar");
    }

    let NIT = parseInt($_USUA_GLOBAL[0].NIT); // 822006883 CARDIORIENTE, 892000264 HOSPITAL ACACIAS

    if (NIT == 822006883) this.cardioriente = true;
    loader("show");
    this.traerLABCompleto_lab102();
  },
  watch: {},
  components: {
    ser819: require("../../SALUD/scripts/SER819.vue.js"),
  },
  methods: {
    traerLABCompleto_lab102() {
      var _this = this;
      var datos_envio =
        datosEnvio() +
        LLAVE_RXLAB_GLOBAL.COMPROBANTE +
        "|" +
        LLAVE_RXLAB_GLOBAL.CUP +
        "|" +
        LLAVE_RXLAB_GLOBAL.ITEM +
        "|";
      let URL = get_url("APP/LAB/LAB102.DLL");
      postData({ datosh: datos_envio }, URL)
        .then(function (data) {
          _this.global_lab102 = data.RESULTADOS_LAB[0];
          console.log(_this.global_lab102);

          _this.asignarDatos();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error en consulta", null, "error", "Error");
          loader("hide");
          _this.salir_lab102();
        });
    },
    asignarDatos() {
      this.global_lab102.SUC = LLAVE_RXLAB_GLOBAL.SUC.trim();
      this.global_lab102.CL = LLAVE_RXLAB_GLOBAL.CL.trim();
      this.global_lab102.COMPROB = LLAVE_RXLAB_GLOBAL.COMPROB.trim();
      this.global_lab102.CUP = LLAVE_RXLAB_GLOBAL.CUP.trim();
      this.global_lab102.ID_PACI = LLAVE_RXLAB_GLOBAL.ID_PACIENTE.trim();
      this.global_lab102.ITEM = LLAVE_RXLAB_GLOBAL.ITEM.trim();

      this.global_lab102.DESCRIP_PACI = this.global_lab102.DESCRIP_PACI.replace(/\�/g, "Ñ").trim();
      this.global_lab102.DESCRIP_CUP = this.global_lab102.DESCRIP_CUP.replace(/\�/g, "Ñ").trim();

      this.global_lab102.ID_MEDICO = this.global_lab102.ID_MEDICO.trim();
      this.global_lab102.REG_MEDICO = this.global_lab102.REG_MEDICO.trim();
      this.global_lab102.NOMBRE_MEDICO = this.global_lab102.NOMBRE_MEDICO.trim();

      for (var i in this.global_lab102.TABLA) {
        this.global_lab102.TABLA[i].ITEM = parseInt(this.global_lab102.TABLA[i].ITEM);
        this.global_lab102.TABLA[i].COMPONENTE_FULL =
          this.global_lab102.TABLA[i].COMPONENTE.trim() + " - " + this.global_lab102.TABLA[i].DESCRIP_COMPONENTE.trim();
        this.global_lab102.TABLA[i].RESULTADO = this.global_lab102.TABLA[i].RESULTADO.trim();
        this.global_lab102.TABLA[i].MEDIDA = this.global_lab102.TABLA[i].MEDIDA.trim();
        this.global_lab102.TABLA[i].PLANTILLA = this.global_lab102.TABLA[i].PLANTILLA.trim();
      }

      for (var i in this.global_lab102.TABLA_2) {
        this.global_lab102.TABLA_2[i].ITEM = parseInt(this.global_lab102.TABLA_2[i].ITEM);
        this.global_lab102.TABLA_2[i].COMPONENTE_FULL =
          this.global_lab102.TABLA_2[i].COMPONENTE.trim() + " - " + this.global_lab102.TABLA_2[i].DESCRIP_COMPONENTE.trim();
        this.global_lab102.TABLA_2[i].RESULTADO = this.global_lab102.TABLA_2[i].RESULTADO.trim();
        this.global_lab102.TABLA_2[i].MEDIDA = this.global_lab102.TABLA_2[i].MEDIDA.trim();
        this.global_lab102.TABLA_2[i].PLANTILLA = this.global_lab102.TABLA_2[i].PLANTILLA.trim();
      }

      this.global_lab102.PARRAFO_INI = this.global_lab102.PARRAFO_INI.replace(/\&/g, "\n").trim();
      this.global_lab102.HALLAZGOS = this.global_lab102.HALLAZGOS.replace(/\&/g, "\n").trim();
      this.global_lab102.CONCLUSIONES = this.global_lab102.CONCLUSIONES.replace(/\&/g, "\n").trim();

      this.validarOpcion();
    },
    validarOpcion() {
      var opcion = "";
      var _this = this;

      if (localStorage.Modulo == "LAB") {
        let active = $("#navegacion").find("li.opcion-menu.active");
        opcion = active[0].attributes[2].nodeValue;

        if (opcion == "02") {
          if (this.global_lab102.REGISTRO_ESCRITO == "") {
            console.log("entra a traer macro");
            postData({ datosh: datosEnvio() + this.global_lab102.CUP + "|" }, get_url("APP/LAB/LAB101-02.DLL"))
              .then((data) => {
                console.log(data);
                _this.global_lab102.HALLAZGOS = data.MACRO_FULL[0].HALLAZGOS.replace(/\&/g, "\n").trim();
                _this.global_lab102.CONCLUSIONES = data.MACRO_FULL[0].CONCLUSIONES.replace(/\&/g, "\n").trim();
                _this.traerPlantillas();
              })
              .catch((error) => {
                console.error(error);
                loader("hide");
                CON851("", "error consultando macro", null, "error", "Error");
                _this.traerPlantillas();
              });
          } else {
            this.traerPlantillas();
          }
        } else if (opcion == "04") {
          this.global_lab102.HALLAZGOS = this.global_lab102.HALLAZGOS.replace(/\&/g, "\n").trim();
          loader("hide");
          this.CONSULTA = true;
          if (this.global_lab102.CUP.slice(0, 2) != "90" && this.global_lab102.CUP.slice(0, 2) != "91")
            this.ES_LAB = false;
        }
      } else if (localStorage.Modulo == "HIC") {
        loader("hide");
        this.CONSULTA = true;
        if (this.global_lab102.CUP.slice(0, 2) != "90" && this.global_lab102.CUP.slice(0, 2) != "91")
          this.ES_LAB = false;
      }
    },
    traerPlantillas() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/LAB/LAB104.DLL"))
        .then(function (data) {
          _this.plantillas = data.PLANTILLAS;
          _this.plantillas.pop();
          loader("hide");
          _this.verificarLaboratorio();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error en consulta", null, "error", "Error");
          loader("hide");
          _this.salir_lab102();
        });
    },
    verificarLaboratorio() {
      console.log(this.global_lab102.FECHA_REALIZO_LAB);
      if (this.global_lab102.CUP.slice(0, 2) != "90" && this.global_lab102.CUP.slice(0, 2) != "91") this.ES_LAB = false;
      this.validarMedico();
    },
    ventanaMedico() {
      _fin_validar_form();
      this.ventanaProfesionales = true;
    },
    escVentanaProfe() {
      this.ventanaProfesionales = false;
      this.validarMedico();
    },
    successVentanaProfe(data) {
      this.ventanaProfesionales = false;
      this.global_lab102.ID_MEDICO = data.identificacion;
      this.validarMedico();
      setTimeout(() => _enterInput("#medico_lab102"), 100);
    },
    async validarMedico() {
      validarInputs(
        {
          form: "#validarMedico_lab102",
          orden: "1",
        },
        () => {
          CON851P("03", this.validarMedico, this.salir_lab102);
        },
        async () => {
          this.global_lab102.ID_MEDICO = this.global_lab102.ID_MEDICO.trim();

          var medico = await this.buscarMedico();

          if (medico) {
            let esp = this.paramsEspec.includes(medico.TAB_ESPEC[0].COD)
            let ati = this.paramsAtiende.includes(medico.ATIENDE_PROF)

            if (ati && esp) {
              this.global_lab102.REG_MEDICO = medico.REG_MEDICO;
              this.global_lab102.NOMBRE_MEDICO = medico.NOMBRE;

              if (this.cardioriente) this.validarQuienRefiere();
              else if (this.global_lab102.TIENE_PARRAFO_INI == "S") this.validarParrafo();
              else {
                this.fila_temp.ITEM = 1;
                this.validarItem();
              }
            } else {
              CON851("9X", "9X", null, "error", "error");
              this.validarMedico();
            }
          } else {
            CON851("", "Médico no existe", null, "error", "Error");
            this.validarMedico();
          }
        }
      );
    },
    async buscarMedico() {
      loader("show");
      return new Promise(async (resolve, reject) => {
        let envio = {
          datosh: datosEnvio(),
          codigo: this.global_lab102.ID_MEDICO,
          paso: '1'
        };
        await postData(envio, get_url("APP/SALUD/SER819.DLL"))
          .then((data) => {
            loader("hide");
            if (data.NOMBRE.trim() == "Personal no atiende")resolve(false);
            else resolve(data);
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            resolve(false);
          });
      });
    },
    validarQuienRefiere() {
      validarInputs(
        {
          form: "#validarQuienRefiere",
          orden: "1",
        },
        () => this.validarMedico(),
        () => {
          this.global_lab102.QUIEN_REFIERE = this.global_lab102.QUIEN_REFIERE.replaceEsp();

          if (this.global_lab101.TIENE_PARRAFO_INI == "S") this.validarParrafo();
          else {
            this.fila_temp.ITEM = 1;
            this.validarItem();
          }
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
          this.global_lab102.PARRAFO_INI = this.global_lab102.PARRAFO_INI.replaceEsp();
          if (this.cardioriente) this.validarQuienRefiere();
          else this.validarMedico();
        },
        () => {
          this.global_lab102.PARRAFO_INI = this.global_lab102.PARRAFO_INI.replaceEsp();
          this.fila_temp.ITEM = 1;
          this.validarItem();
        }
      );
    },
    vaciarFilatemp() {
      this.fila_temp = {
        ITEM: "",
        COMPONENTE: "",
        RESULTADO: "",
        UNID_MEDIDA: "",
        PLANTILLA: "",
      };
    },
    validarItem() {
      validarInputs(
        {
          form: "#validarItem_LAB102",
          orden: "1",
          event_f3: () => {
            this.vaciarFilatemp();
            this.verificarGrupo_lab102()
            // this._validarTabla_lab102("0");
          },
        },
        () => {
          this.vaciarFilatemp();
          if (this.cardioriente) this.validarQuienRefiere();
          else if (this.global_lab102.TIENE_PARRAFO_INI == "S") this.validarParrafo();
          else this.validarMedico();
        },
        () => {
          this.fila_temp.ITEM = parseInt(this.fila_temp.ITEM);

          if (this.fila_temp.ITEM > 40 || this.fila_temp.ITEM < 1) {
            CON851("", "Item fuera de rango!", null, "error", "Error");
            this.validarItem();
          } else {
            var existe = this.global_lab102.TABLA.find((x) => parseInt(x.ITEM) == this.fila_temp.ITEM);

            if (existe) {
              if (existe.TITULO == "S") {
                CON851("", "Es título !", null, "warning", "Advertencia");
                this.validarItem();
              } else {
                this.fila_temp.COMPONENTE = existe.COMPONENTE_FULL;
                this.fila_temp.RESULTADO = existe.RESULTADO;
                this.fila_temp.UNID_MEDIDA = existe.MEDIDA;
                this.fila_temp.PLANTILLA = existe.PLANTILLA;
                this.fila_temp.OPC_PLANTILLA = existe.OPC_PLANTILLA;

                this.verificarPlantilla();
              }
            } else {
              CON851("", "Item no existe!", null, "error", "Error");
              this.validarItem();
            }
          }
        }
      );
    },
    verificarPlantilla() {
      var _this = this;

      if (this.fila_temp.PLANTILLA == "00") {
        this.fila_temp.OPC_PLANTILLA = "";
        this.validarResultado();
      } else {
        var busqueda = this.plantillas.find((data) => data.COD == cerosIzq(this.fila_temp.PLANTILLA, 2));

        if (busqueda) {
          var items = [];
          for (var i = 1; i < 9; i++) {
            if (busqueda["ITEM" + i].trim() != "") {
              items.push({ COD: i, DESCRIP: busqueda["ITEM" + i] });
            }
          }

          setTimeout(() => {
            POPUP(
              {
                array: items,
                titulo: "Seleccione:",
                indices: [{ id: "COD", label: "DESCRIP" }],
                callback_f: () => this.validarItem,
                seleccion: this.fila_temp.OPC_PLANTILLA,
              },
              (data) => {
                _this.fila_temp.OPC_PLANTILLA = data.COD;
                _this.fila_temp.RESULTADO = data.DESCRIP;
                _this.modificarTabla();
              }
            );
          }, 300);
        } else {
          CON851("", "Plantilla no existe!", null, "error", "Error");
          this.validarItem();
        }
      }
    },
    validarResultado() {
      validarInputs(
        {
          form: "#validarResultado_lab102",
          orden: "1",
        },
        () => this.validarItem(),
        () => {
          this.fila_temp.RESULTADO = this.fila_temp.RESULTADO.trim().replaceEsp()

          if (this.fila_temp.RESULTADO == '') {
            CON851("", "Debe digitar un resultado !", null, "warning", "Advertencia");
            this.validarResultado()
          } else this.modificarTabla();
        }
      );
    },
    modificarTabla() {
      var index = this.global_lab102.TABLA.findIndex((x) => parseInt(x.ITEM) == parseInt(this.fila_temp.ITEM));

      this.global_lab102.TABLA[index].RESULTADO = this.fila_temp.RESULTADO.trim();
      console.log(this.fila_temp);
      this.global_lab102.TABLA[index].OPC_PLANTILLA = this.fila_temp.OPC_PLANTILLA;
      var temp = parseInt(this.fila_temp.ITEM);
      this.vaciarFilatemp();
      this.fila_temp.ITEM = temp + 1;
      this.validarItem();
    },
    // _validarTabla_lab102(orden) {
    //   validarTabla(
    //     {
    //       tabla: "#validarTabla_LAB102",
    //       orden: orden,
    //       event_f3: this.verificarGrupo_lab102,
    //       Esc: this.validarItem,
    //     },
    //     this.bajarDatosTabla,
    //     this.validarItem,
    //     this.verificarGrupo_lab102
    //   );
    // },
    // bajarDatosTabla(datos) {
    //   this.fila_temp.ITEM = parseInt(datos.cells[0].textContent);
    //   var existe = this.global_lab102.TABLA.find((x) => parseInt(x.ITEM) == this.fila_temp.ITEM);

    //   if (existe) {
    //     if (existe.TITULO == "S") {
    //       CON851("", "Es título !", null, "warning", "Advertencia");
    //       var posicion = parseInt(this.fila_temp.ITEM) - 1;
    //       this.fila_temp.ITEM = "";
    //       this._validarTabla_lab102(posicion.toString());
    //     } else {
    //       this.fila_temp.COMPONENTE = existe.COMPONENTE_FULL;
    //       this.fila_temp.RESULTADO = existe.RESULTADO;
    //       this.fila_temp.UNID_MEDIDA = existe.MEDIDA;
    //       this.fila_temp.PLANTILLA = existe.PLANTILLA;
    //       this.fila_temp.OPC_PLANTILLA = existe.OPC_PLANTILLA;

    //       this.verificarPlantilla();
    //     }
    //   } else {
    //     CON851("", "Ha ocurrido un error", null, "error", "error");
    //     this.validarItem();
    //   }
    // },
    verificarGrupo_lab102() {
      var grupo = this.global_lab102.CUP.slice(0, 2);

      if (grupo == "90" || grupo == "91") {
        if (this.global_lab102.INTERPRETADO != "S" && this.global_lab102.FECHA_REALIZO_LAB.ANO.trim() == "") {
          this.global_lab102.FECHA_REALIZO_LAB.ANO = moment().format("YYYY");
          this.global_lab102.FECHA_REALIZO_LAB.MES = moment().format("MM");
          this.global_lab102.FECHA_REALIZO_LAB.DIA = moment().format("DD");
          this.global_lab102.FECHA_REALIZO_LAB.HORA = moment().format("HH");
          this.global_lab102.FECHA_REALIZO_LAB.MINUTO = moment().format("mm");
        }
        this.validarAno();
      } else {
        this.validarHallazgos();
      }
    },
    validarAno() {
      validarInputs(
        {
          form: "#validarAno_LAB102",
          orden: "1",
        },
        () => {
          // this._validarTabla_lab102("0")
          this.validarItem()
        },
        () => {
          this.global_lab102.FECHA_REALIZO_LAB.ANO = cerosDer(this.global_lab102.FECHA_REALIZO_LAB.ANO, 4);

          if (
            parseInt(this.global_lab102.FECHA_REALIZO_LAB.ANO) > 2080 ||
            parseInt(this.global_lab102.FECHA_REALIZO_LAB.ANO) < 2000
          ) {
            CON851("", "Año fuera de rango !", null, "error", "Error");
            this.validarAno();
          } else this.validarMes();
        }
      );
    },
    validarMes() {
      validarInputs(
        {
          form: "#validarMes_LAB102",
          orden: "1",
        },
        () => this.validarAno(),
        () => {
          this.global_lab102.FECHA_REALIZO_LAB.MES = cerosIzq(this.global_lab102.FECHA_REALIZO_LAB.MES, 2);

          if (
            parseInt(this.global_lab102.FECHA_REALIZO_LAB.MES) > 12 ||
            parseInt(this.global_lab102.FECHA_REALIZO_LAB.MES) < 1
          ) {
            CON851("", "Mes fuera de rango !", null, "error", "Error");
            this.validarMes();
          } else this.validarDia();
        }
      );
    },
    validarDia() {
      validarInputs(
        {
          form: "#validarDia_LAB102",
          orden: "1",
        },
        () => this.validarMes(),
        () => {
          this.global_lab102.FECHA_REALIZO_LAB.DIA = cerosIzq(this.global_lab102.FECHA_REALIZO_LAB.DIA, 2);

          if (
            parseInt(this.global_lab102.FECHA_REALIZO_LAB.DIA) > 31 ||
            parseInt(this.global_lab102.FECHA_REALIZO_LAB.DIA) < 1
          ) {
            CON851("", "Dia fuera de rango !", null, "error", "Error");
            this.validarDia();
          } else this.validarHora();
        }
      );
    },
    validarHora() {
      validarInputs(
        {
          form: "#validarHora_LAB102",
          orden: "1",
        },
        () => this.validarDia(),
        () => {
          this.global_lab102.FECHA_REALIZO_LAB.HORA = cerosIzq(this.global_lab102.FECHA_REALIZO_LAB.HORA, 2);

          if (
            parseInt(this.global_lab102.FECHA_REALIZO_LAB.HORA) > 23 ||
            parseInt(this.global_lab102.FECHA_REALIZO_LAB.HORA) < 1
          ) {
            CON851("", "Hora fuera de rango !", null, "error", "Error");
            this.validarHora();
          } else this.validarMinuto();
        }
      );
    },
    validarMinuto() {
      validarInputs(
        {
          form: "#validarMinuto_LAB102",
          orden: "1",
        },
        () => this.validarHora(),
        () => {
          this.global_lab102.FECHA_REALIZO_LAB.MINUTO = cerosIzq(this.global_lab102.FECHA_REALIZO_LAB.MINUTO, 2);

          if (
            parseInt(this.global_lab102.FECHA_REALIZO_LAB.MINUTO) > 59 ||
            parseInt(this.global_lab102.FECHA_REALIZO_LAB.MINUTO) < 1
          ) {
            CON851("", "Minuto fuera de rango !", null, "error", "Error");
            this.validarMinuto();
          } else this.validarConclusiones();
        }
      );
    },
    validarHallazgos() {
      validarInputs(
        {
          form: "#validarHallazgos_lab102",
          orden: "1",
        },
        () => {
          this.global_lab102.HALLAZGOS = this.global_lab102.HALLAZGOS.replaceEsp()
          this.validarItem();
        },
        () => {
          this.global_lab102.HALLAZGOS = this.global_lab102.HALLAZGOS.replaceEsp()

          if (this.global_lab102.TIENE_2_TABLA == "S") {
            this.fila_temp_2.ITEM = 1  
            this.validarItem_2();
          } else this.validarConclusiones()
        }
      );
    },
    vaciarFilatemp_2() {
      this.fila_temp_2 = {
        ITEM: "",
        COMPONENTE: "",
        RESULTADO: "",
        UNID_MEDIDA: "",
        PLANTILLA: "",
      };
    },
    validarItem_2() {
      validarInputs(
        {
          form: "#validarItem_2_LAB102",
          orden: "1",
          event_f3: () => {
            this.vaciarFilatemp_2();
            this.validarConclusiones();
          },
        },
        () => {
          this.vaciarFilatemp_2();
          this.validarHallazgos()
        },
        () => {
          this.fila_temp_2.ITEM = parseInt(this.fila_temp_2.ITEM);

          if (this.fila_temp_2.ITEM > 40 || this.fila_temp_2.ITEM < 1) {
            CON851("", "Item fuera de rango!", null, "error", "Error");
            this.validarItem_2();
          } else {
            var existe = this.global_lab102.TABLA_2.find((x) => parseInt(x.ITEM) == this.fila_temp_2.ITEM);

            if (existe) {
              if (existe.TITULO == "S") {
                CON851("", "Es título !", null, "warning", "Advertencia");
                this.validarItem_2();
              } else {
                this.fila_temp_2.COMPONENTE = existe.COMPONENTE_FULL;
                this.fila_temp_2.RESULTADO = existe.RESULTADO;
                this.fila_temp_2.UNID_MEDIDA = existe.MEDIDA;
                this.fila_temp_2.PLANTILLA = existe.PLANTILLA;
                this.fila_temp_2.OPC_PLANTILLA = existe.OPC_PLANTILLA;

                this.verificarPlantilla_2();
              }
            } else {
              CON851("", "Item no existe!", null, "error", "Error");
              this.validarItem_2();
            }
          }
        }
      );
    },
    verificarPlantilla_2() {
      var _this = this;

      if (this.fila_temp_2.PLANTILLA == "00") {
        this.fila_temp_2.OPC_PLANTILLA = "";
        this.validarResultado_2();
      } else {
        var busqueda = this.plantillas.find((data) => data.COD == cerosIzq(this.fila_temp_2.PLANTILLA, 2));

        if (busqueda) {
          var items = [];
          for (var i = 1; i < 9; i++) {
            if (busqueda["ITEM" + i].trim() != "") {
              items.push({ COD: i, DESCRIP: busqueda["ITEM" + i] });
            }
          }

          setTimeout(() => {
            POPUP(
              {
                array: items,
                titulo: "Seleccione:",
                indices: [{ id: "COD", label: "DESCRIP" }],
                callback_f: () => {
                  this.validarItem_2();
                },
                seleccion: this.fila_temp_2.OPC_PLANTILLA,
              },
              (data) => {
                _this.fila_temp_2.OPC_PLANTILLA = data.COD;
                _this.fila_temp_2.RESULTADO = data.DESCRIP;
                _this.modificarTabla_2();
              }
            );
          }, 300);
        } else {
          CON851("", "Plantilla no existe!", null, "error", "Error");
          this.validarItem_2();
        }
      }
    },
    validarResultado_2() {
      validarInputs(
        {
          form: "#validarResultado_2_lab102",
          orden: "1",
        },
        () => this.validarItem_2(),
        () => {
          this.fila_temp_2.RESULTADO = this.fila_temp_2.RESULTADO.trim().replaceEsp()

          if (this.fila_temp_2.RESULTADO == '') {
            CON851("", "Debe digitar un resultado !", null, "warning", "Advertencia");
            this.validarResultado_2()
          } else this.modificarTabla_2();
        }
      );
    },
    modificarTabla_2() {
      var index = this.global_lab102.TABLA_2.findIndex((x) => parseInt(x.ITEM) == parseInt(this.fila_temp_2.ITEM));

      this.global_lab102.TABLA_2[index].RESULTADO = this.fila_temp_2.RESULTADO.trim();
      console.log(this.fila_temp_2);
      this.global_lab102.TABLA_2[index].OPC_PLANTILLA = this.fila_temp_2.OPC_PLANTILLA;
      var temp = parseInt(this.fila_temp_2.ITEM);
      this.vaciarFilatemp_2();
      this.fila_temp_2.ITEM = temp + 1;
      this.validarItem_2();
    },
    validarConclusiones() {
      validarInputs(
        {
          form: "#validarConclusiones_lab102",
          orden: "1",
        },
        () => {
          this.global_lab102.CONCLUSIONES = this.global_lab102.CONCLUSIONES.replaceEsp()

          var grupo = this.global_lab102.CUP.slice(0, 2);

          if (grupo == "90" || grupo == "91") this.validarMinuto()
          else this.validarItem_2();
        },
        () => {
          this.global_lab102.CONCLUSIONES = this.global_lab102.CONCLUSIONES.replaceEsp()

          var control = false;
          let mensaje = ""

          for (var i in this.global_lab102.TABLA_2) {
            if (this.global_lab102.TABLA_2[i].RESULTADO.trim() == "") {
              if (this.global_lab102.TABLA_2[i].TITULO != "S"){
                control = true;
                mensaje = "segunda"
              } 
            }
          }

          for (var i in this.global_lab102.TABLA) {
            if (this.global_lab102.TABLA[i].RESULTADO.trim() == "") {
              if (this.global_lab102.TABLA[i].TITULO != "S") {
                control = true;
                mensaje = "primera"
              }
            }
          }

          if (control) {
            CON851("", "Faltan resultados por digitar en la " + mensaje + " tabla !", null, "error", "Error");
            this.validarConclusiones();
          } else {
            CON851P(
              "Adjuntar archivos?",
              () => {
                setTimeout(CON851P("01", this.validarConclusiones, this._grabardatos_lab102), 300);
              },
              this.ventanaAdjuntarArchivos
            );
          }
        }
      );
    },
    ventanaAdjuntarArchivos() {
      var $_this = this;

      var fuente =
        "<div>" +
        '<div class="col-md-12">' +
        '<div class="portlet light no-padding">' +
        '<div class="portlet-body no-padding">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
        '<div class="col-md-12 col-sm-12 col-xs-12" style="display: flex ;justify-content: space-between">' +
        '<div class="col-md-2">' +
        '<button id="salir_lab102" class="col-md-12 btn" type="button" style="color: white; background-color: #da2c2c; border-color: #da2c2c">Salir</button>' +
        "</div>" +
        '<div class="col-md-5">' +
        '<label class="col-md-12 btn btn-default btn-file">' +
        '<input type="file" multiple id="archivos_lab102" accept=".dcm, application/pdf,image/jpeg,image/png,image/jpg,video/mpeg,video/mp4,video/x-ms-wmv,application/dicom,image/dicom"/>' +
        "</label>" +
        "</div>" +
        '<div class="col-md-2">' +
        '<button id="enviarArchivos_lab102" class="col-md-12 btn btn-primary" type="button">Adjuntar</button>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div style="clear:both;"></div>' +
        "</div>";

      var dialogo = bootbox.dialog({
        title: "Adjuntar archivos",
        message: fuente,
        closeButton: false,
        buttons: {
          main: {
            label: "Aceptar",
            className: "blue hidden",
            callback: function () {},
          },
        },
      });

      dialogo.on("shown.bs.modal", function (e) {
        $(".modal-content").css({
          width: "900px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        });
        document.getElementById("salir_lab102").onclick = () => {
          $('[data-bb-handler="main"]').click();
          $_this.validarConclusiones();
        };
        document.getElementById("enviarArchivos_lab102").onclick = () => $_this.enviarArchivos_lab102();
      });
    },
    enviarArchivos_lab102() {
      var el = document.getElementById("archivos_lab102");
      var archivos = el.files;

      if (archivos.length < 1) {
        CON851("", "No se han escogido archivos", null, "warning", "Advertencia");
      } else {
        loader("show");
        var nombreArch =
          this.global_lab102.SUC +
          this.global_lab102.CL +
          this.global_lab102.COMPROB +
          this.global_lab102.CUP +
          this.global_lab102.ITEM;

        var envio = new FormData();
        envio.append("nombre", nombreArch);

        for (let i = 0; i < archivos.length; i++) envio.append(i, archivos[i]);

        var $_this = this;
        fetch(get_url("APP/inc/AdjuntaArchivos.php"), {
          method: "POST",
          body: envio,
        })
          .then((res) => res.json())
          .then((data) => {
            loader("hide");
            if (data.code == 0) {
              console.log("Archivos subidos:", data.msj.correcto);
              for (var i in data.msj.correcto) {
                $_this.global_lab102.ADJUNTOS[i] = data.msj.correcto[i];
              }
              $('[data-bb-handler="main"]').click();
              console.log("Archivos error:", data.msj.error);
              setTimeout($_this._grabardatos_lab102, 500);
            } else {
              CON851("", "Ha ocurrido un error subiendo archivos", null, "error", "Error");
              console.error("Ha ocurrido un error:", data.msj);
              $('[data-bb-handler="main"]').click();
              $_This.validarConclusiones();
            }
          });
      }
    },
    _grabardatos_lab102() {
      var _this = this;
      loader("show");

      var datos_envio_lab102 = datosEnvio();
      datos_envio_lab102 += this.global_lab102.LLAVE;
      datos_envio_lab102 += "|";
      datos_envio_lab102 += cerosIzq(this.global_lab102.ID_MEDICO, 10);
      datos_envio_lab102 += "|";
      datos_envio_lab102 += moment().format("YYYYMMDD");
      datos_envio_lab102 += "|";
      datos_envio_lab102 += moment().format("HHmm");
      datos_envio_lab102 += "|";
      datos_envio_lab102 += localStorage.Usuario;
      datos_envio_lab102 += "|";
      datos_envio_lab102 += this.global_lab102.QUIEN_REFIERE;
      datos_envio_lab102 += "|";

      var data = {};
      data["datosh"] = datos_envio_lab102;

      this.global_lab102.TABLA.forEach(function (item, i) {
        var pos = i + 1;

        var linea = item.COMPONENTE;
        linea += "|";
        linea += item.RESULTADO;
        linea += "|";
        linea += item.OPC_PLANTILLA;
        linea += "|";

        data["LIN-" + pos.toString().padStart(3, "0")] = linea;
      });

      data["TIENE_TABLA_2"] = this.global_lab102.TIENE_2_TABLA

      if (this.global_lab102.TIENE_2_TABLA == 'S') {

        this.global_lab102.TABLA_2.forEach(function (item, i) {
          var pos = i + 1;
  
          var linea = item.COMPONENTE;
          linea += "|";
          linea += item.RESULTADO;
          linea += "|";
          linea += item.OPC_PLANTILLA;
          linea += "|";
  
          data["LIN_2-" + pos.toString().padStart(3, "0")] = linea;
        });
      }

      var parrafo = this.global_lab102.PARRAFO_INI.enterReplace().strToTable("PARRAF");
      for (indice in parrafo) data[indice] = parrafo[indice];

      var hallazgos = this.global_lab102.HALLAZGOS.enterReplace().strToTable("HAL");
      for (indice in hallazgos) data[indice] = hallazgos[indice];

      var conclusiones = this.global_lab102.CONCLUSIONES.enterReplace().strToTable("CONC");
      for (indice in conclusiones) data[indice] = conclusiones[indice];

      data["TIENE_PARRAFO_INI"] = this.global_lab102.TIENE_PARRAFO_INI;
      data["TITULO_PARRAFO_INI"] = this.global_lab102.TITULO_PARRAFO_INI;
      data["TITULO_HALLAZGOS"] = this.global_lab102.TITULO_HALLAZGOS;
      data["TITULO_CONCLUSIONES"] = this.global_lab102.TITULO_CONCLUSIONES;

      var archivos = "";
      this.global_lab102.ADJUNTOS.forEach(function (item, i) {
        archivos += espaciosDer(item, 30);
        archivos += "|";
      });

      data["adjuntos"] = archivos;

      var fecha_lab = this.global_lab102.FECHA_REALIZO_LAB.ANO;
      fecha_lab += "|";
      fecha_lab += this.global_lab102.FECHA_REALIZO_LAB.MES;
      fecha_lab += "|";
      fecha_lab += this.global_lab102.FECHA_REALIZO_LAB.DIA;
      fecha_lab += "|";
      fecha_lab += this.global_lab102.FECHA_REALIZO_LAB.HORA;
      fecha_lab += "|";
      fecha_lab += this.global_lab102.FECHA_REALIZO_LAB.MINUTO;
      fecha_lab += "|";

      data["fecha_lab"] = fecha_lab;
      console.log(data);

      postData(data, get_url("APP/LAB/LAB102-02.DLL"))
        .then((llegada) => {
          loader("hide");
          CON851("", "Resultado guardado correctamente!", null, "success", "Exitoso");
          setTimeout(_this.preguntaImprimir_lab102, 300);
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", err, null, "error", "Error");
          _this.salir_lab102();
        });
    },
    preguntaImprimir_lab102() {
      CON851P(
        "00",
        () => this.salir_lab102(),
        () => {
          this._envioImpresion();
        }
      );
    },
    async _envioImpresion() {
      _this = this;
      loader("show");

      await postData(
        {
          datosh:
            datosEnvio() +
            LLAVE_RXLAB_GLOBAL.COMPROBANTE +
            "|" +
            LLAVE_RXLAB_GLOBAL.CUP +
            "|" +
            LLAVE_RXLAB_GLOBAL.ITEM +
            "|",
        },
        get_url("APP/LAB/LAB102.DLL")
      )
        .then(async function (data) {
          data_resultado = data.RESULTADOS_LAB[0];
          data_resultado.COMPROB = LLAVE_RXLAB_GLOBAL.COMPROBANTE;
          await _impresion2({
            tipo: "pdf",
            archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss") + ".pdf",
            content: await _imprimirLab102(data_resultado),
          })
            .then((llegada) => {
              loader("hide");
              _this.salir_lab102();
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          loader("hide");
          console.error(err);
          CON851("", "Error en impresión", null, "error", "Error");
          this.validarConclusiones();
        });
    },
    aperturaAdjunto_lab102(item) {
      var ruta = "D:\\WEB\\ADJUNTOS\\";

      child("start " + ruta + item, (error, data) => {
        console.log(error, data);
      });
    },
    salir_lab102() {
      _inputControl("reset");
      _inputControl("disabled");
      this.cardioriente = false;
      this.global_lab102 = {
        LLAVE: "",
        FECHA: "",
        CTA: "",
        ID_HISTORIA: "",
        DESCRIP_PACI: "",
        ID_MEDICO: "",
        REG_MEDICO: "",
        NOMBRE_MEDICO: "",
        PUERTA_ESTAD: "",
        ID_ENTIDAD: "",
        ENTIDAD: "",
        NOM_ENTIDAD: "",
        NIT: "",
        EDAD: "",
        IMP: "",
        ADMI_CREA: "",
        FECHA_CREA: "",
        HORA_CREA: "",
        SEXO: "",
        DESCRIP_CUP: "",
        PESO: "",
        TALLA: "",
        REFERIDO: "",
        DESCRIP_REFERIDO: "",
        DIAGNOS: "",
        DESCRIP_DIAGNOS: "",
        REGISTRO_ESCRITO: "",
        CONCLUSIONES: "",
        HALLAZGOS: "",
        ADJUNTOS: "",
        TABLA: [],
        FECHA_REALIZO_LAB: {
          ANO: "",
          MES: "",
          DIA: "",
          HORA: "",
          MINUTO: "",
        },
        TIENE_PARRAFO_INI: "",
        TITULO_PARRAFO_INI: "",
        TITULO_HALLAZGOS: "",
        TITULO_CONCLUSIONES: "",
        PARRAFO_INI: "",
        TABLA_2: [],
        TIENE_2_TABLA: ""
      };
      this.especialidades = [];
      let Window = BrowserWindow.getAllWindows();
      if (Window.length == 1) {
        $(".page-breadcrumb")[1].remove();
      }
      busquedaEstudios_RXLAB("PACIENTE", LLAVE_RXLAB_GLOBAL.ID_PACIENTE);
    },
  },
});
