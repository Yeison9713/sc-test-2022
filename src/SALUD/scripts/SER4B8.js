const get_solau = require("../../SALUD/scripts/reg_solau.js");
const { getDatos, consulta } = require("../../frameworks/scripts/getDatos.js");

var _this = new Vue({
  el: "#SER4B8",
  data: {
    reg_solau: get_solau.getObjRegSolau(),
    fecha_act: moment().format("YYYYMMDD"),
    hora_act: moment().format("HHmm"),
    reg_act: JSON.parse(JSON.stringify(get_solau.getObjRegSolau().tabla[0])),
    reg_activ: {},
    reg_num: {},
    reg_tercero: {},
    reg_paci: {},
    tipo_afil: "",
    indice: 0,
    buscar_x: 0,
    array_unid_serv: [],
    rows_observ: 1,
    admin_w: localStorage.Usuario,
    descrip_novedad: "",

    ventanaCups: false,
    ventanaPaci: false,
  },
  components: {
    ser802c: require("../../SALUD/scripts/SER802C.vue.js"),
    ser810: require("../../SALUD/scripts/SER810.vue.js"),
  },
  async created() {
    nombreOpcion("9-7-4-B-6 - SOLICITUD DE AUTORIZACIONES DE SERVICIOS DE SALUD");
    _inputControl("disabled");

    await this.cargarDatos();
    this.datoPrefijo();
  },
  methods: {
    datoPrefijo() {
      validarInputs(
        {
          form: "#prefijo",
        },
        _toggleNav,
        () => {
          this.reg_solau.fact.prefijo = this.reg_solau.fact.prefijo.toUpperCase();
          let busqueda = [
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
          ].includes(this.reg_solau.fact.prefijo);

          if (busqueda) this.datoNro();
          else {
            CON851("", "03", null, "error", "Error");
            this.datoPrefijo();
          }
        }
      );
    },
    datoNro() {
      validarInputs(
        {
          form: "#nro",
        },
        this.datoPrefijo,
        async () => {
          if (this.reg_solau.fact.nro == 0) {
            CON851("", "03", null, "error", "Error");
            this.datoNro();
          } else {
            this.reg_solau.fact.nro = this.reg_solau.fact.nro.padStart(6, "0");
            try {
              loader("show");
              await this.consultarNum();
              await this.consultarTercero();
              await this.consultarAct();
              loader("hide");
              this.datoPaciente();
            } catch (err) {
              console.error(err);
              _toggleNav();
            }
          }
        }
      );
    },
    datoPaciente() {
      if (this.reg_num.prefijo == "P" || this.reg_num.prefijo == "T") {
        this.reg_solau.paci = this.reg_num.id_pac;
        this.consultarPaciente();
      } else {
        validarInputs(
          {
            form: "#paci",
          },
          this.datoPrefijo,
          () => {
            this.reg_solau.paci = this.reg_solau.paci.replaceEsp();
            if (!isNaN(this.reg_solau.paci)) this.reg_solau.paci = this.reg_solau.paci.padStart(15, "0");
            else this.reg_solau.paci.padStart(15, "0");

            if (this.reg_solau.paci == 0 || !this.reg_solau.paci.trim()) {
              CON851("", "03", null, "error", "Error");
              this.datoPaciente();
            } else {
              this.consultarPaciente();
            }
          }
        );
      }
    },

    async consultarPaciente() {
      loader("show");
      this.reg_paci = await consulta._paci({ cod_paci: this.reg_solau.paci });
      if (!this.reg_paci.cod) {
        CON851("", "01", null, "error", "Error");
        loader("hide");
        this.datoPaciente();
      } else {
        this.reg_paci.descrip = `${this.reg_paci._1er_nom} ${this.reg_paci._2do_nom} ${this.reg_paci._1er_apel} ${this.reg_paci._2do_apel}`;
        if (this.reg_paci.cod == this.reg_paci.id_cotiz) this.tipo_afil = "COTIZANTE";
        else this.tipo_afil = "BENEFICIARIO";

        this.buscarDuplicado();
      }
    },

    async buscarDuplicado() {
      try {
        let busqueda = await consulta._solau({
          llave_fact: `${this.reg_solau.paci}${this.reg_solau.fact.prefijo}${this.reg_solau.fact.nro}`,
          maestro: true,
        });
        if (busqueda.consecutivo) {
          this.novedad = 8;
          this.reg_solau = JSON.parse(JSON.stringify(busqueda));
        } else {
          this.reg_solau.sem_cot = "";
          this.reg_solau.tabla = JSON.parse(JSON.stringify(get_solau.getObjRegSolau().tabla));
          this.novedad = 7;
        }

        this.consecutivo();
      } catch {
        loader("hide");
        this.datoPaciente();
      }
    },

    async consecutivo() {
      try {
        if (this.novedad == 8) {
          this.descrip_novedad = "CAMBIO";
        } else {
          this.descrip_novedad = "NUEVO";
          await this.buscarConsecutivo();
        }

        await this.ubicarUltimoRegistro();

        loader("hide");
        this.datoSemanas();
      } catch (err) {
        loader("hide");
        this.datoPaciente();
        console.error(err);
      }
    },

    datoSemanas() {
      validarInputs(
        {
          form: "#sem_cot",
        },
        this.datoPrefijo,
        () => {
          if (isNaN(parseInt(this.reg_solau.sem_cot))) {
            CON851("", "03", null, "error", "Error");
            this.datoSemanas();
          } else {
            this.indice = 0;
            this.iniciarCursor();
          }
        }
      );
    },

    iniciarCursor() {
      if (this.indice <= 49) {
        if (this.indice == 0 && this.reg_solau.tabla[this.indice].fecha < 1) {
          // continue
        } else {
          this.indice += 1;
        }
        if (this.reg_solau.tabla[this.indice].fecha < 1) {
          this.reg_act = JSON.parse(JSON.stringify(this.reg_solau.tabla[this.indice]));
          this.reg_act.item = (parseInt(this.indice) + 1).toString().padStart(3, "0");
          this.datoCups();
        } else this.iniciarCursor();
      } else {
        CON851("", "No hay mas espacio para autorizaciones", null, "warning", "Alerta");
        _toggleNav();
      }
    },

    datoCups() {
      validarInputs(
        {
          form: "#cups",
          event_f3: this.confirmar,
          event_f5: this.confirmarSalir,
        },
        this.datoSemanas,
        () => {
          this.leerCups();
        }
      );
    },

    async leerCups() {
      try {
        loader("show");
        let busqueda = await consulta._cups({ llave: this.reg_act.cups });
        loader("hide");
        if (busqueda.llave) {
          Vue.set(this.reg_act, "descrip_cups", busqueda.descrip);
          this.datoUnserv();
        } else {
          CON851("", "01", null, "error", "Error");
          this.datoCups();
        }
      } catch {
        this.datoCups();
      }
    },

    datoUnserv() {
      POPUP(
        {
          array: this.array_unid_serv.filter((e) => e.activar == "S"),
          titulo: "UNIDAD DE SERVICIO",
          indices: [{ id: "codigo", label: "descrip" }],
          seleccion: this.reg_act.unserv || "01",
          callback_f: this.datoCups,
        },
        (data) => {
          this.reg_act.unserv = data.codigo;
          this.reg_act.descrip_unserv = data.descrip;
          this.datoCodAutorizacion();
        }
      );
    },

    datoCodAutorizacion() {
      validarInputs(
        {
          form: "#cod",
        },
        this.datoUnserv,
        () => {
          this.datoQuienAutoriza();
        }
      );
    },

    datoQuienAutoriza() {
      validarInputs(
        {
          form: "#nom_quien_autoriza",
        },
        this.datoCodAutorizacion,
        () => {
          this.datoObservacion();
        }
      );
    },

    datoObservacion() {
      this.rows_observ = 4;
      validarInputs(
        {
          form: "#observacion",
        },
        () => {
          this.datoQuienAutoriza();
          this.rows_observ = 1;
        },
        () => {
          this.reg_act.observacion = this.reg_act.observacion.replaceEsp();
          this.rows_observ = 1;
          this.finVentana();
        }
      );
    },

    finVentana() {
      this.reg_act.fecha = moment().format("YYYYMMDD");
      this.reg_act.hora = moment().format("HHmm");
      this.reg_act.oper = this.admin_w;
      this.buscar_x += 1;
      this.reg_solau.tabla[this.indice] = JSON.parse(JSON.stringify(this.reg_act));
      this.iniciarCursor();
    },

    confirmar() {
      CON851P("01", this.datoSemanas, this.grabar);
    },

    confirmarSalir() {
      CON851P("03", this.datoSemanas, _toggleNav);
    },

    async grabar() {
      let obj_envio = JSON.parse(JSON.stringify(this.reg_solau));

      for (let i in obj_envio.tabla) {
        console.log(obj_envio);
        delete obj_envio.tabla[i].descrip_cups;
        delete obj_envio.tabla[i].descrip_unserv;
        console.log(obj_envio);
        obj_envio.tabla[i].observacion = obj_envio.tabla[i].observacion.enterReplace();
      }
      obj_envio.novedad = this.novedad;
      obj_envio.admin_w = this.admin_w;

      let datos = _getObjetoSave(obj_envio, ["tabla"]);

      postData(datos, get_url("APP/SALUD/SAVE_SOLAU.DLL"))
        .then(() => {
          this.imprimir();
        })
        .catch((err) => {
          this.confirmar();
          console.error(err);
        });
    },

    imprimir() {
      loader("show");
      let envio = {
        llave_fact: `${this.reg_solau.paci}${this.reg_solau.fact.prefijo}${this.reg_solau.fact.nro}`,
        consecutivo: this.reg_solau.consecutivo,
        paci: this.reg_solau.paci,
        callback: () => {
          loader("hide");
          CON851("", "Impreso correctamente", null, "success", "Completado");
          _toggleNav();
        },
        callback_error: (err) => {
          loader("hide");
          console.error(err);
          CON851("", "Error en impresión", null, "error", "Error");
          _toggleNav();
        },
      };

      const { imprimir_SER4B8I } = require("../../frameworks/pdf/salud/SER4B8I.formato");
      imprimir_SER4B8I(envio);
    },

    async ubicarUltimoRegistro() {
      for (let i in this.reg_solau.tabla) {
        if (parseInt(this.reg_solau.tabla[i].fecha) < 1) {
          this.buscar_x = i;
          break;
        }
      }
    },

    async buscarConsecutivo() {
      let busqueda = await consulta._solau({ paso: "2" });
      this.reg_solau.consecutivo = busqueda.consecutivo.padStart(6, "0");
    },

    async consultarNum() {
      this.reg_num = await consulta._num({ llave: `${this.reg_solau.fact.prefijo}${this.reg_solau.fact.nro}` });
    },

    async consultarTercero() {
      this.reg_tercero = await consulta._tercero({ cod_tercero: this.reg_num.nit });
    },

    async consultarAct() {
      this.reg_activ = await consulta._act({ cod: this.reg_tercero.act });
      if (this.reg_activ.cod) this.reg_activ.nombre = this.reg_tercero.act;
    },

    async cargarDatos() {
      loader("show");
      try {
        this.array_unid_serv = await getDatos._unserv();
      } catch (err) {
        console.error(err);
        CON851("", "Error consultando datos", null, "error", "Error");
        _toggleNav();
      }
      loader("hide");
    },

    _ventanaCups() {
      _fin_validar_form();
      this.ventanaCups = true;
    },

    escVentanaCups() {
      this.ventanaCups = false;
      this.datoCups();
    },

    successVentanaCups(data) {
      this.ventanaCups = false;
      this.reg_act.cups = data.llave;
      this.reg_act.descrip_cups = data.descrip;
      this.datoCups();
    },

    _ventanaPaci() {
      _fin_validar_form();
      this.ventanaPaci = true;
    },

    escVentanaPaci() {
      this.ventanaPaci = false;
      this.datoPaciente();
    },

    successVentanaPaci(data) {
      this.ventanaPaci = false;
      this.reg_solau.paci = data.cod;
      this.reg_solau.descrip_paci = data.descrip;
      this.datoPaciente();
    },
  },
});
