const { get } = require("../../COR/scripts/COR.ctrl.js");

new Vue({
  el: "#COR101",
  data() {
    return {
      datos_w: {
        codigo: "",
        descripcion: "",
        oper_crea: "",
        fecha_crea: "",
        oper_mod: "",
        fecha_mod: ""
      },
      novedad: {},
      servicios: "",
    };
  },
  created() {
    _vm = this;
    nombreOpcion("1-1 - Actualizar Dependencias O Servicios");

    this.get_json();
  },
  methods: {
    dato_novedad() {
      CON850(this.validar_novedad);
    },
    validar_novedad(novedad) {
      this.novedad = novedad;
      switch (novedad.id) {
        case "7":
        case "8":
        case "9":
          this.validar_codigo();
          break;
        default:
          _toggleNav();
          break;
      }
    },
    validar_codigo() {
      validarInputs(
        {
          form: "#validar_codigo",
        },
        () => {
          this.dato_novedad();
        },
        () => {
          let codigo = this.datos_w.codigo || ""
          let consulta = this.servicios.find(e => e.codigo == codigo.trim().toUpperCase());

          if (consulta) {
            if (this.novedad.id == "7") {
              CON851("", "00", null, "warning", "");
              this.validar_codigo()
            } else {
              consulta.codigo = codigo.toUpperCase()
              this.datos_w = consulta;
              this.llenar_datos()
            }
          } else {
            if (this.novedad.id == "7") {
              this.datos_w.codigo = codigo.toUpperCase()
              this.llenar_datos()
            } else {
              CON851("03", "03", null, "warning", "");
              this.validar_codigo()
            }
          }
        }
      );
    },
    ventana_codigo() {
      // const _this = this;
      _fin_validar_form();
      _ventanaDatos({
        titulo: "VENTANA DE DEPARTAMENTO DE SERVICIOS",
        columnas: ["codigo", "descripcion"],
        data: this.servicios,
        callback_esc: () => {
          // document.getElementById('validar_codigo').focus()
          this.validar_codigo()
        },
        callback: (data) => {
          this.datos_w.codigo = data['codigo'];
          this.datos_w.descripcion = data['descripcion'];
          // _enterInput('#validar_codigo');
          this.validar_codigo()
        }
      });
    },
    llenar_datos() {
      if (this.novedad.id == "7") {
        this.datos_w.oper_crea = localStorage.Usuario
        this.datos_w.fecha_crea = moment().format('YYYYMMDD')
      } else {
        this.datos_w.oper_mod = localStorage.Usuario
        this.datos_w.fecha_mod = moment().format('YYYYMMDD')
      }

      this.validar_descripcion()
    },
    validar_descripcion() {
      validarInputs(
        {
          form: "#validar_descripcion",
        },
        () => {
          this.validar_codigo()
        },
        () => {
          console.log("ingresa")
          this.datos_w.descripcion = this.datos_w.descripcion.toUpperCase();
          if (this.datos_w.descripcion.trim()) {
            this.enviar_datos();
          } else {
            CON851("2", "2", null, "warning", "");
            this.validar_descripcion();
          }
        },
      )
    },
    enviar_datos() {
      let { datos_w } = this;

      datos_w.oper_crea = datos_w.oper_crea || datos_w.oper_mod;
      datos_w.fecha_crea = datos_w.fecha_crea == "00000000" ? datos_w.fecha_mod : datos_w.fecha_crea;

      let datos_envio = {
        datosh: datosEnvio() + this.novedad.id,
        ...datos_w
      }
      console.log("datos", datos_envio)
      postData(datos_envio, get_url("APP/COR/CORR101.DLL"))
        .then(data => {
          CON851("", "Grabado correctamente", null, "success", "");
          _toggleNav()
        }).catch(err => {
          console.log("error grabando servicio", err)
          CON851("", "ERROR AL ACTUALIZAR SERVICIO", null, "error", "")
          this.validar_descripcion()
        })
    },
    async get_json() {
      let servicios = await get("servicios");
      this.servicios = servicios.servicios;

      this.dato_novedad();
    },
  },
});