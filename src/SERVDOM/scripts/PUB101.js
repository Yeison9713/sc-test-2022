const { format_op, mascara5, mascara_valor } = require("../../SERVDOM/scripts/globalDom.js");
const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");

var _vm = new Vue({
  el: "#PUB101",
  data: {
    params_CLAVE: {
      estado: false,
    },
    mostrar_CLAVE: false,

    novedad: "",
    reg_emp: regs_dom.EMPRESA(),
    reg_emp_espejo: regs_dom.EMPRESA(),

    cambio_clave: "",
    clave_conf: "",

    array_ciudades: [],

    array_autoret: [
      { COD: "1", DESCRIP: "Autoretenedor" },
      { COD: "2", DESCRIP: "Aplican retención" },
      { COD: "3", DESCRIP: "Exento retención" },
    ],

    array_aprox: [
      { COD: "1", DESCRIP: "Aproximar int. a decena" },
      { COD: "2", DESCRIP: "Aproximar int. a centena" },
      { COD: "3", DESCRIP: "No aproximar intereses" },
    ],

    array_orden: [
      { COD: "1", DESCRIP: "Por orden de ruta" },
      { COD: "2", DESCRIP: "Por orden de código" },
      { COD: "3", DESCRIP: "Por orden de dirección" },
    ],
  },
  created() {
    nombreOpcion("1-1 - Datos de la Empresa");
    _inputControl("reset");
    _inputControl("disabled");
    this.initClave();
  },
  components: {
    clave: require("../../SERVDOM/scripts/clave.vue"),
  },
  computed: {
    nombre_ciu() {
      let busqueda = this.array_ciudades.find((e) => e.COD == this.reg_emp.cod_ciu);
      return busqueda ? busqueda.NOMBRE : "";
    },
    nombre_dep() {
      let busqueda = this.array_ciudades.find((e) => e.COD == this.reg_emp.cod_ciu);
      return busqueda ? busqueda.DEPART : "";
    },
    autoret_edit() {
      let busqueda = this.array_autoret.find((e) => e.COD == this.reg_emp.autoret);
      return busqueda ? busqueda.DESCRIP : "";
    },
    aprox_edit() {
      let busqueda = this.array_aprox.find((e) => e.COD == this.reg_emp.aprox);
      return busqueda ? busqueda.DESCRIP : "";
    },
    orden_edit() {
      let busqueda = this.array_orden.find((e) => e.COD == this.reg_emp.orden);
      return busqueda ? busqueda.DESCRIP : "";
    },
  },
  methods: {
    initClave() {
      this.mostrar_CLAVE = true;
      setTimeout(() => {
        this.params_CLAVE.estado = true;
      }, 300);
    },

    callback_clave() {
      this.params_CLAVE.estado = false;
      this.mostrar_CLAVE = false;
      loader("show");
      this.traerEmpresa();
    },

    esc_clave() {
      this.params_CLAVE.estado = false;
      this.mostrar_CLAVE = false;
      _toggleNav();
    },

    mostrarDatos() {
      this.reg_emp.nit = new Intl.NumberFormat("ja-JP").format(this.reg_emp.nit);

      this.reg_emp.int = mascara5.resolve(format_op(this.reg_emp.int).toString());
      this.reg_emp.int_ref = mascara5.resolve(format_op(this.reg_emp.int_ref).toString());
      this.reg_emp.vlr_dup = mascara_valor.resolve(format_op(this.reg_emp.vlr_dup).toString());

      this.datoNombre();
    },

    datoNombre() {
      validarInputs(
        {
          form: "#nombre",
        },
        _toggleNav,
        () => {
          if (!this.reg_emp.nombre.trim()) this.datoNombre();
          else this.datoNit();
        }
      );
    },

    datoNit() {
      this.reg_emp.nit = format_op(this.reg_emp.nit).toString();
      validarInputs(
        {
          form: "#nit",
        },
        this.datoNombre,
        () => {
          if (isNaN(this.reg_emp.nit)) {
            CON851("", "03", null, "error", "Error");
            this.datoNit();
          } else {
            this.reg_emp.nit = new Intl.NumberFormat("ja-JP").format(this.reg_emp.nit);
            this.datoDv();
          }
        }
      );
    },

    datoDv() {
      validarInputs(
        {
          form: "#dv",
        },
        this.datoNit,
        () => {
          this.datoNuir();
        }
      );
    },

    datoNuir() {
      validarInputs(
        {
          form: "#nuir",
        },
        this.datoDv,
        () => {
          if (!this.reg_emp.nuir.trim()) this.datoNuir();
          else this.datoTel();
        }
      );
    },

    datoTel() {
      validarInputs(
        {
          form: "#tel",
        },
        this.datoNuir,
        () => {
          this.datoDirecc();
        }
      );
    },

    datoDirecc() {
      validarInputs(
        {
          form: "#direcc",
        },
        this.datoTel,
        () => {
          this.datoCiudad();
        }
      );
    },

    datoCiudad() {
      validarInputs(
        {
          form: "#cod_ciu",
        },
        this.datoDirecc,
        () => {
          if (!this.reg_emp.cod_ciu.trim() || this.reg_emp.cod_ciu == 0) {
            CON851("", "03", null, "error", "Error");
            this.datoCiudad();
          } else {
            let busqueda = this.array_ciudades.find((e) => e.COD == this.reg_emp.cod_ciu);
            if (busqueda) this.datoNuap();
            else {
              CON851("", "03", null, "error", "Error");
              this.datoCiudad();
            }
          }
        }
      );
    },

    datoNuap() {
      validarInputs(
        {
          form: "#nuap",
        },
        this.datoCiudad,
        () => {
          if (this.reg_emp.nuap.trim()) {
            if (
              !this.reg_emp.nuap.slice(0, 1).trim() ||
              !this.reg_emp.nuap.slice(1, 2).trim() ||
              !this.reg_emp.nuap.slice(2, 3).trim() ||
              !this.reg_emp.nuap.slice(3, 4).trim() ||
              !this.reg_emp.nuap.slice(4, 5).trim()
            ) {
              CON851("", "03", null, "error", "Error");
              this.datoNuap();
            } else this.datoRetencion();
          } else this.datoRetencion();
        }
      );
    },

    datoRetencion() {
      if (!this.reg_emp.autoret.trim()) this.reg_emp.autoret = "3";

      POPUP(
        {
          array: this.array_autoret,
          titulo: "Retención en Fuente",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.reg_emp.autoret,
          callback_f: this.datoNuap,
        },
        (data) => {
          this.reg_emp.autoret = data.COD;
          setTimeout(() => {
            this.datoClave();
          }, 200);
        }
      );
    },

    datoClave() {
      validarInputs(
        {
          form: "#cambio_clave",
        },
        this.datoRetencion,
        () => {
          this.cambio_clave = this.cambio_clave.toUpperCase();
          if (this.cambio_clave != "S") this.cambio_clave = "N";

          if (this.cambio_clave == "N") {
            this.reg_emp.clave1 = this.reg_emp_espejo.clave1;
            this.reg_emp.clave2 = this.reg_emp_espejo.clave2;
            this.clave_conf = "";
            this.datoAprox();
          } else this.datoClave1();
        }
      );
    },

    datoClave1() {
      validarInputs(
        {
          form: "#clave1",
        },
        this.datoClave,
        () => {
          this.datoConfirm(1);
        }
      );
    },

    datoClave2() {
      validarInputs(
        {
          form: "#clave2",
        },
        this.datoClave1,
        () => {
          this.datoConfirm(2);
        }
      );
    },

    datoConfirm(index) {
      validarInputs(
        {
          form: "#clave_conf",
        },
        () => {
          this[`datoClave${index}`]();
        },
        () => {
          if (this.reg_emp[`clave${index}`] == this.clave_conf) {
            if (index == 1) this.datoClave2();
            else this.datoAprox();
          } else {
            CON851("", "Contraseña no coincide", null, "error", "Error");
            this[`datoClave${index}`]();
          }
        }
      );
    },

    datoAprox() {
      if (!this.reg_emp.aprox.trim()) this.reg_emp.aprox = "3";

      POPUP(
        {
          array: this.array_aprox,
          titulo: "Aproximación",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.reg_emp.aprox,
          callback_f: this.datoClave,
        },
        (data) => {
          this.reg_emp.aprox = data.COD;
          setTimeout(() => {
            this.datoInt();
          }, 200);
        }
      );
    },

    datoInt() {
      validarInputs(
        {
          form: "#int",
        },
        this.datoAprox,
        () => {
          this.reg_emp.int = mascara5.resolve(format_op(this.reg_emp.int).toString());
          this.datoIntRef();
        }
      );
    },

    datoIntRef() {
      validarInputs(
        {
          form: "#int_ref",
        },
        this.datoInt,
        () => {
          this.reg_emp.int_ref = mascara5.resolve(format_op(this.reg_emp.int_ref).toString());
          if (this.reg_emp.ult_per.ano > 1996) this.datoOrden();
          else this.datoUltPer();
        }
      );
    },

    datoUltPer() {
      validarInputs(
        {
          form: "#ult_per",
        },
        this.datoIntRef,
        () => {
          this.reg_emp.ult_per.ano = this.reg_emp.ult_per.ano.padStart(4, "0");
          this.reg_emp.ult_per.mes = this.reg_emp.ult_per.mes.padStart(2, "0");
          let ult_per_str = `${this.reg_emp.ult_per.ano}${this.reg_emp.ult_per.mes}`;

          let valFecha = moment(ult_per_str).format("YYYYMM");

          if (valFecha == "Fecha inválida" && ult_per_str != 0) {
            CON851("", "37", null, "error", "Error");
            this.datoUltPer();
          } else {
            this.datoUltFact();
          }
        }
      );
    },

    datoUltFact() {
      validarInputs(
        {
          form: "#ult_fact",
        },
        this.datoUltPer,
        () => {
          this.datoOrden();
        }
      );
    },

    datoOrden() {
      if (!this.reg_emp.orden.trim()) this.reg_emp.orden = "3";

      POPUP(
        {
          array: this.array_orden,
          titulo: "Orden de Genración de Facturas",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.reg_emp.orden,
          callback_f: this.datoAprox,
        },
        (data) => {
          this.reg_emp.orden = data.COD;
          setTimeout(() => {
            this.datoFormato();
          }, 200);
        }
      );
    },

    datoFormato() {
      if (!this.reg_emp.formato_abo.trim()) this.reg_emp.formato_abo = "N";

      validarInputs(
        {
          form: "#formato_abo",
          event_f5: () => { this.datoUltPer(); }
        },
        this.datoOrden,
        () => {
          this.reg_emp.formato_abo = this.reg_emp.formato_abo.toUpperCase();
          if (this.reg_emp.formato_abo != "S") this.reg_emp.formato_abo = "N";
          this.datoDuplicado();
        }
      );
    },

    datoDuplicado() {
      validarInputs(
        {
          form: "#vlr_dup",
        },
        this.datoFormato,
        () => {
          this.reg_emp.vlr_dup = mascara_valor.resolve(format_op(this.reg_emp.vlr_dup).toString());
          this.datoDirectorio();
        }
      );
    },

    datoDirectorio() {
      validarInputs(
        {
          form: "#dir_cont",
        },
        this.datoDuplicado,
        () => {
          if (!this.reg_emp.dir_cont.trim()) this.datoContabilizar();
          else this.buscarDirectorio();
        }
      );
    },

    buscarDirectorio() {
      loader("show");
      let datos = {
        datosh: `${moduloDatosEnvio()}3|`,
        dir_cont: this.reg_emp.dir_cont,
      };

      postData(datos, get_url("app/SERVDOM/PUB101.DLL"))
        .then((data) => {
          console.log(data);
          loader("hide");
          CON851("", "Directorio verificado", null, "info", "Completado");
          this.datoContabilizar();
        })
        .catch((error) => {
          if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
          console.error(error);
          loader("hide");
          this.datoDirectorio();
        });
    },

    datoContabilizar() {
      validarInputs(
        {
          form: "#contab_nit",
        },
        this.datoDirectorio,
        () => {
          this.reg_emp.contab_nit = this.reg_emp.contab_nit.toUpperCase();
          if (this.reg_emp.contab_nit != "S") this.reg_emp.contab_nit = "N";
          this.confirmar();
        }
      );
    },

    confirmar() {
      CON851P("01", this.datoContabilizar, this.grabar);
    },

    grabar() {
      let registro = JSON.parse(JSON.stringify(this.reg_emp));
      registro.nit = format_op(registro.nit).toString();
      registro.int = format_op(registro.int).toString();
      registro.int_ref = format_op(registro.int_ref).toString();
      registro.vlr_dup = format_op(registro.vlr_dup).toString();

      let datos = {
        ..._getObjetoSave(registro),
        datosh: `${moduloDatosEnvio()}2|`,
      };

      console.log(datos, "datos");

      postData(datos, get_url("app/SERVDOM/PUB101.DLL"))
        .then((data) => {
          console.log(data);
          loader("hide");
          CON851("", "Modificado correctamente", null, "success", "Completado");
          this.actualizarGlobal();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error intentando grabar", null, "error", "Error");
          this.datoContabilizar();
        });
    },

    actualizarGlobal() {
      _usuarioModulo({ modulo: "DOM", datosh: moduloDatosEnvio() })
        .then((data) => {
          localStorage.Contab = data.DATOSUSUA.DIR_CONT;
          $_USUARIO_EMPRESA = data.DATOSUSUA;
          $_USUARIO_EMPRESA.NIT = parseInt($_USUARIO_EMPRESA.NIT)
          _toggleNav();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error actualizando informacion", null, "error", "Error");
          this.datoContabilizar();
        });
    },

    _ventanaCiudades() {
      _ventanaDatos({
        titulo: "Ventana Ciudades",
        columnas: ["COD", "NOMBRE", "DEPART"],
        data: this.array_ciudades,
        callback_esc: () => {
          document.querySelector(".cod_ciu").focus();
        },
        callback: (data) => {
          this.reg_emp.cod_ciu = data.COD;
          this.reg_emp.ciudad = data.NOMBRE;
          this.reg_emp.dpto = data.DEPART;
          setTimeout(() => {
            _enterInput(".cod_ciu");
          }, 200);
        },
      });
    },

    traerEmpresa() {
      postData({ datosh: `${moduloDatosEnvio()}1|` }, get_url("app/SERVDOM/PUB101.DLL"))
        .then((data) => {
          this.reg_emp = data.DATOSUSUA;
          this.reg_emp_espejo = JSON.parse(JSON.stringify(data.DATOSUSUA));
          this.traerCiudades();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando archivo de Empresa", null, "error", "Error");
          loader("hide");
          _toggleNav();
        });
    },

    traerCiudades() {
      postData({ datosh: `${datosEnvio()}` }, get_url("app/CONTAB/CON809.DLL"))
        .then((data) => {
          this.array_ciudades = data.CIUDAD;
          loader("hide");
          this.mostrarDatos();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando archivo de Ciudades", null, "error", "Error");
          loader("hide");
          _toggleNav();
        });
    },
  },
});
