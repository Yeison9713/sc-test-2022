new Vue({
  el: "#SER44E9",
  data: {
    ENVIO: "",
    FECHA: "",
    TERCERO: "",
    TIPO_COMPROB: "",
    DESCRIPCION_TIPO: "",
    DECIMAL: "",
    DESCUENTOS: "",
    arrayEnvios: [],
    tipos: [
      { COD: "0", DESCRIP: "DROGUERIA" },
      { COD: "1", DESCRIP: "CIRUGIAS" },
      { COD: "2", DESCRIP: "LAB. Y OTROS DIAG" },
      { COD: "3", DESCRIP: "RX - IMAGENOLOGIA" },
      { COD: "4", DESCRIP: "OTROS SERVICIOS" },
      { COD: "5", DESCRIP: "CONSULTAS Y TERAPIAS" },
      { COD: "6", DESCRIP: "PATOLOGIA" },
      { COD: "7", DESCRIP: "PROMOCION Y PREVENCION" },
      { COD: "*", DESCRIP: "TODOS LOS TIPOS" },
    ],
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    _inputControl("reset");

    nombreOpcion("9,7,7,4,E,9 - Plano por numero positiva");
    loader("show");
    this.traerEnvios();
  },
  watch: {},
  methods: {
    traerEnvios() {
      var _this = this;
      var ano = parseInt($_USUA_GLOBAL[0].FECHALNK.substring(0, 2)) + 2000;
      var mes = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
      var fecha_envio = ano.toString() + mes;

      obtenerDatosCompletos(
        { nombreFd: "ENVIOS", filtro: fecha_envio },
        (data) => {
          console.log(data);
          _this.arrayEnvios = data.ENVIOS;
          _this.arrayEnvios.pop();
          _this.validarEnvio();
        },
        "ONLY"
      );
    },
    ventanaEnvios() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana envios de acuerdo a mes actual",
        columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA"],
        data: this.arrayEnvios,
        ancho: "70%",
        callback_esc: () => {
          document.getElementById("envio_ser44e9").focus();
        },
        callback: (data) => {
          _this.ENVIO = data.NRO;
          setTimeout(() => _enterInput("#envio_ser44e9"), 100);
        },
      });
    },
    validarEnvio() {
      validarInputs(
        {
          form: "#validarEnvio",
          orden: "1",
        },
        () => this.salirSER44E9(),
        () => {
          this.ENVIO = cerosIzq(this.ENVIO, 6);
          var busqueda = this.arrayEnvios.find((x) => x.NRO == this.ENVIO);

          if (busqueda) {
            this.FECHA = moment(busqueda.FECHA).format("MMMM /YYYY");
            this.TERCERO = parseInt(busqueda.NIT).toString() + " - " + busqueda.DESCRIPCION_TERCERO.trim();
            this.ventanaTipoComprobante();
          } else {
            CON851("", "No existe numero de envio !", null, "error", "Error");
            this.FECHA = "";
            this.TERCERO = "";
            this.validarEnvio();
          }
        }
      );
    },
    ventanaTipoComprobante() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Tipo comprobante",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.tipos,
            callback_f: () => this.validarEnvio(),
            seleccion: this.TIPO_COMPROB,
            teclaAlterna: true,
          },
          (data) => {
            _this.TIPO_COMPROB = data.COD;
            _this.DESCRIPCION_TIPO = data.COD + ". " + data.DESCRIP;

            _this.capturarCantidadDecimal();
          }
        );
      }, 300);
    },
    capturarCantidadDecimal() {
      validarInputs(
        {
          form: "#validarCantDeci",
          orden: "1",
        },
        () => this.ventanaTipoComprobante(),
        () => {
          this.DECIMAL = this.DECIMAL.toUpperCase().trim() != "S" ? "N" : "S";

          this.validarAbonos();
        }
      );
    },
    validarAbonos() {
      validarInputs(
        {
          form: "#validarAbonoDesc",
          orden: "1",
        },
        () => this.capturarCantidadDecimal(),
        () => {
          this.DESCUENTOS = this.DESCUENTOS.toUpperCase().trim() != "S" ? "N" : "S";

          this.llamadoDLL();
        }
      );
    },
    llamadoDLL() {
      loader("show");
      var _this = this;

      postData(
        { datosh: datosEnvio() + localStorage.Usuario + "|" + this.ENVIO + "|" + this.TIPO_COMPROB + "|" },
        get_url("app/SALUD/SER44E9.DLL")
      )
        .then((data) => {
          console.log(data.INFO);

          // loader('hide');
          // _this.llamadoDll_2();
          _this.llamadoDll_2(data.INFO[0].NOMBRE_TEM);
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _this.validarAbonos();
        });
    },
    llamadoDll_2(nombre_txt) {
      var _this = this;
      postData(
        { datosh: datosEnvio() + nombre_txt + "|" + this.ENVIO + "|" + this.DECIMAL + "|" + this.DESCUENTOS + "|" },
        get_url("app/SALUD/SER44F9.DLL")
      )
        .then((data) => {
          console.log(data);
          loader("hide");
          _this.escribirPlano(data.INFO[0]);
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _this.validarAbonos();
        });
    },
    escribirPlano(data){
      var archivo = data.ARCHIVO.replace(/\//g, "\\\\")
      var stream = fs.createWriteStream(archivo, { flags: "a" });
      data.DATOS.forEach(element => {
        stream.write(element.LINEA + "\r\n");
      });
      stream.end();
      CON851("", "Archivo creado correctamente !", null, "success", "Correcto");
      this.salirSER44E9();
    },
    salirSER44E9() {
      _inputControl("disabled");
      _inputControl("reset");
      _toggleNav();
    },
  },
});
