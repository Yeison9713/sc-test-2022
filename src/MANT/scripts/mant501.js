/* NOMBRE RM --> MANT501 */

const { data } = require("jquery");

/* PO - PABLO OLGUIN 22/07/20 --> FINALIZADO */
new Vue({
  el: "#MANT501",
  data: {
    MANT501: [],
    novedad_mant501: "",
    ciudad_mant501: "",
    destino_mant501: "",
    descrip_mant501: "",
    maskdist_mant501: "",
    distancia_mant501: ""
  },
  created() {
    this.maskdist_mant501 = IMask.createMask({ mask: Number, radix: '.', padFractionalZeros: true, signed: false, scale: 2, min: 0000, max: 99.99 });
    _toggleNav();
    _inputControl('disabled');
    _inputControl('reset');
    nombreOpcion("5,1 - Actualiza lugares de destino");

    obtenerDatosCompletos({ nombreFd: "CIUDADES" }, (data) => {
      loader("hide");
      this.MANT501.CIUDADES = data.CIUDAD;
      CON850(this._evaluarCON850_mant501);

      obtenerDatosCompletos({ nombreFd: "DESTINOS" }, (data) => {
        this.MANT501.DESTINOS = data.DESTINOS;
      });
    });
  },
  methods: {
    _evaluarCON850_mant501(novedad) {
      this.novedad_mant501 = novedad.id;
      if (this.novedad_mant501 == "F") {
        _toggleNav();
      } else {
        this.oper_mant501 = localStorage.Usuario;
        this.fecha_mant501 = moment().format("YYYY/MM/DD");
        let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
        this.novedad_mant501 = this.novedad_mant501 + " - " + novedad[this.novedad_mant501];
        this.validarciudad_mant501();
      }
    },
    evaluarNovedad_mant501(sw) {
      switch (this.novedad_mant501.substring(0, 1)) {
        case "7":
          if (sw == '01') this.validardescrip_mant501();
          else CON851("00", "00", this.validardestino_mant501(), "error", "Error");
          break;

        case "8":
          if (sw == '00') {
            this.cargarDatos_mant501();
            this.validardescrip_mant501();
          }
          else {
            this.descrip_mant501 = '';
            CON851("01", "01", this.validardestino_mant501(), "error", "Error");
          } break;

        case "9":
          if (sw == '00') this.eliminarDatos_mant501();
          else {
            this.descrip_mant501 = '';
            CON851("01", "01", this.validardestino_mant501(), "error", "Error");
          } break;
      }
    },
    cargarDatos_mant501() {
      const llave_mant501 = this.ciudad_mant501.split('-')[0].trim() + this.destino_mant501.trim();
      const data = this.MANT501.DESTINOS.find(x => x.COD.trim() == llave_mant501);
      const ciudad = this.MANT501.CIUDADES.find((x) => x.COD == data.CIUDAD);

      this.ciudad_mant501 = ciudad.COD + '-' + ciudad.NOMBRE;
      this.destino_mant501 = cerosIzq(data.DESTINO, 3);
      this.descrip_mant501 = data.NOMBRE;
      this.distancia_mant501 = this.maskdist_mant501.resolve(data.DISTANCIA);
    },
    validarciudad_mant501() {
      validarInputs(
        { form: "#validarCiudad_mant501", orden: "1", },
        () => { CON850(this._evaluarCON850_mant501); },
        () => {
          if (this.ciudad_mant501.length == '0' || this.ciudad_mant501.trim() == '') {
            CON851("03", "03", this.validarciudad_mant501(), "error", "error");
          } else {
            const ciudad = this.MANT501.CIUDADES.find(
              (x) => x.COD == this.ciudad_mant501.split('-')[0].trim()
            );
            if (typeof ciudad != 'undefined') {
              this.ciudad_mant501 = ciudad.COD + '-' + ciudad.NOMBRE;
              this.validardestino_mant501();
            } else {
              this.ciudad_mant501 = '';
              CON851("01", "01", this.validarciudad_mant501(), "error", "error");
            }
          }
        })
    },
    _ventanCiudmant501() {
      _ventanaDatos({
        titulo: "VENTANA CIUDADES",
        columnas: ["COD", "NOMBRE"],
        label: ["Codigo", "Ciudad"],
        data: this.MANT501.CIUDADES,
        callback_esc: () => {
          CON850(this._evaluarCON850_mant501);
        },
        callback: (data) => {
          this.ciudad_mant501 = data.COD + " - " + data.NOMBRE;
          _enterInput("#ciudad_mant501");
        }
      });
    },
    validardestino_mant501() {
      validarInputs(
        { form: "#validarDestino_mant501", orden: "1", },
        () => { this.validarciudad_mant501() },
        () => {
          this.destino_mant501 = cerosIzq(this.destino_mant501, 3);
          if (this.destino_mant501.length == '0' || this.destino_mant501.trim() == '') {
            CON851("03", "03", this.validardestino_mant501(), "error", "error");
          } else {
            let llave_mant501 = this.ciudad_mant501.split('-')[0].trim() + this.destino_mant501;
            const destino_mant501 = this.MANT501.DESTINOS.find(x => x.COD == llave_mant501);

            let data = destino_mant501;

            if (typeof data != 'undefined') {
              this.destino_mant501 = cerosIzq(destino_mant501.DESTINO, 3);
              this.descrip_mant501 = destino_mant501.NOMBRE;
              sw = '00';
              this.evaluarNovedad_mant501(sw)
            }
            else {
              sw = '01';
              this.evaluarNovedad_mant501(sw)
            }
          }
        })
    },
    _ventanDestmant501() {
      const busqdestino_mant501 = this.MANT501.DESTINOS.filter(x => x.COD.substring(0, 5) == this.ciudad_mant501.split('-')[0].trim());
      const titulo = busqdestino_mant501 ? "VENTANA CIUDADES" : "NO EXISTEN DESTINOS";
      _ventanaDatos({
        titulo: titulo,
        columnas: ["COD", "NOMBRE"],
        label: ["Codigo", "Ciudad"],
        data: busqdestino_mant501,
        callback_esc: () => {
          this.validarciudad_mant501();
        },
        callback: (data) => {
          this.destino_mant501 = data.DESTINO;
          this.descrip_mant501 = data.NOMBRE;
          _enterInput("#destino_mant501");
        }
      });
    },
    validardescrip_mant501() {
      validarInputs(
        { form: "#validarDescrip_mant501", orden: "1", },
        () => { this.validardestino_mant501() },
        () => {
          if (this.descrip_mant501.length == '0' || this.descrip_mant501.trim() == '') {
            CON851("03", "03", this.validardestino_mant501(), "error", "error");
          } else {
            this.descrip_mant501 = this.descrip_mant501;
            this.validardistancia_mant501()
          }
        })
    },
    validardistancia_mant501() {
      validarInputs(
        { form: "#validarDistancia_mant501", orden: "1", },
        () => { this.validardestino_mant501() },
        () => {
          if (this.distancia_mant501.trim() == '') {
            CON851("03", "03", this.validardestino_mant501(), "error", "error");
          } else {
            this.distancia_mant501 = this.maskdist_mant501.resolve(this.distancia_mant501);
            this._grabarDatos_mant501();
          }
        })
    },
    _grabarDatos_mant501() {
      const llave_mant501 = this.ciudad_mant501.split('-')[0].trim() + this.destino_mant501.trim();
      var datos_envio = datosEnvio();
      datos_envio += this.novedad_mant501.substring(0,1)
      datos_envio += "|"
      datos_envio += llave_mant501
      datos_envio += "|"
      datos_envio += this.descrip_mant501.toUpperCase()
      datos_envio += "|"
      datos_envio += this.distancia_mant501

      console.log('destino', llave_mant501)
      var data = {}; data.datosh = datos_envio;

      CON851P('01', this.validardestino_mant501, () => {
        postData(data, get_url("APP/MANT/MANT501.DLL"))
          .then((data) => {
            CON851('', 'Se ha grabado el registro', null, 'success', 'Exito');
            _toggleNav();
          })
          .catch((error) => {
            this.validardestino_mant501();
          });
      });
    },
    eliminarDatos_mant501() {
      const llave_mant501 = this.ciudad_mant501.split('-')[0].trim() + this.destino_mant501.trim();
      var datos_envio = datosEnvio();
      datos_envio += this.novedad_mant501.substring(0,1)
      datos_envio += "|"
      datos_envio += llave_mant501

      var data = {}; data.datosh = datos_envio;
      console.log('data', data);

      CON851P('54', () => { _toggleNav(); }, () => {
        postData(data, get_url("APP/MANT/MANT501.DLL"))
          .then((data) => {
            CON851('', 'Se ha Eliminado el registro', null, 'success', 'Exito');
            _toggleNav();
          })
          .catch((error) => {
            this.validardestino_mant501();
          });
      })
    }
  }
})

