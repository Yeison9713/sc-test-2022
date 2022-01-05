new Vue({
  el: "#SER_A0I1",
  data: {
    errores: [],
    terceros: [],
    tercero: "99",
    descrip_tercero: "",
    seleccionar_archivo: false,
    opcion: "",
    glosasConRespuesta: [],
    control: {
      errores: false,
      respuesta: false,
    },
    totalErrores: 0,
    totalConRespuesta: 0,
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    _inputControl("reset");

    this.opcionIngreso();
  },
  watch: {},
  methods: {
    opcionIngreso() {
      let active = $("#navegacion").find("li.opcion-menu.active");
      var opcion = active[0].attributes[2].nodeValue;

      switch (opcion) {
        case "097AI1":
          this.opcion = "1";
          nombreOpcion("9,7,A,I,1 - Subir plano cargue inicial");
          this.traerTerceros();
          break;
        case "097AI2":
          this.opcion = "2";
          nombreOpcion("9,7,A,I,2 - Subir plano cargue contesta");
          this.traerTerceros();
          break;
        default:
          CON851("", "Error determinando opcion ingreso", null, "error", "Error");
          this.salir_SER_A0I1();
          break;
      }

      console.log(this.opcion);
    },
    traerTerceros() {
      let _this = this;

      obtenerDatosCompletos(
        { nombreFd: "TERCEROS" },
        (data) => {
          _this.terceros = data.TERCEROS;
          _this.terceros.pop();

          _this.validarTercero();
        },
        "ONLY"
      );
    },
    ventanaTerceros() {
      _ventanaDatos({
        titulo: "Ventana De Terceros",
        columnas: ["COD", "NOMBRE", "CIUDAD"],
        data: this.terceros,
        ancho: "70%",
        callback_esc: () => document.getElementById("tercero_sera0i1").focus(),
        callback: (data) => {
          this.tercero = data.COD;
          setTimeout(() => _enterInput("#tercero_sera0i1"), 100);
        },
      });
    },
    validarTercero() {
      validarInputs(
        {
          form: "#validarTercero",
          orden: "1",
        },
        () => this.salir_SER_A0I1(),
        () => {
          this.tercero = this.tercero.trim();
          var busqueda = this.terceros.find((x) => parseInt(x.COD.trim()) == parseInt(this.tercero));

          if (this.tercero == "99") {
            this.descrip_tercero = "TODOS";
            this.seleccionar_archivo = true;
            this.errores = [];
            this.totalConRespuesta = 0
            this.totalErrores = 0
          } else if (busqueda) {
            this.descrip_tercero = busqueda.NOMBRE.trim();
            this.seleccionar_archivo = true;
            this.errores = [];
            this.totalConRespuesta = 0
            this.totalErrores = 0
          } else {
            this.descrip_tercero = "";
            CON851("", "No existe tercero", null, "error", "Error");
            this.validarTercero();
          }
        }
      );
    },
    atrasArchivo() {
      this.seleccionar_archivo = false;
      this.validarTercero();
    },
    verificarArchivo() {
      var el = document.getElementById("archivo_ser_ai01");
      var archivos = el.files;

      if (archivos.length < 1) {
        CON851("", "No se ha escogido archivo", null, "warning", "Advertencia");
      } else {
        loader("show");
        this.enviarArchivo_a_servidor(archivos);
      }
    },
    enviarArchivo_a_servidor(param) {
      const _this = this;
      const archivo = param[0];
      const extension = archivo.name.split(".")[1];
      const nombre_archivo = localStorage.Usuario + "-" + moment().format("YYYYMMDDHHmmss") + "." + extension;
      console.log(archivo);

      const envio = new FormData();
      envio.append("opcion", "SER-A0I1");
      envio.append("archivo", archivo, nombre_archivo);

      let error_subida = (error) => {
        console.error("-> Error subida", error);
        loader("hide");
        CON851("99", "Ha ocurrido un error intentando subir el archivo", null, "error", "Advertencia");
        this.errores = [];
      };

      console.log(envio);

      fetch(get_url("app/inc/upFile.global.php"), {
        method: "POST",
        body: envio,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code != 0) error_subida(res);
          else if (res.msj.error && res.msj.error.length > 0) error_subida(res);
          else _this.procesarArchivo(nombre_archivo);
        })
        .catch(error_subida);
    },
    procesarArchivo(nombre_archivo) {
      var _this = this;

      CON851("", "Procesando archivo...", null, "success", "Espere");
      console.log(nombre_archivo);

      postData(
        {
          datosh:
            datosEnvio() +
            localStorage.Usuario +
            "|" +
            nombre_archivo +
            "|" +
            this.tercero.padStart(10, "0") +
            "|" +
            this.opcion +
            "|",
        },
        get_url("app/SALUD/SER-A0I1-1.DLL")
      )
        .then((data) => {
          console.log(data.INFO);
          var errores = data.INFO[0].ERRORES;
          errores.pop();

          _this.errores = errores;

          if (_this.errores.length == 0) {
            _this.grabarGlosas(data.INFO[0].NOMBRE_TEM);

            _this.control.errores = false;
            _this.totalErrores = 0
          } else {
            _this.totalErrores = _this.errores.length
            _this.control.respuesta = false;
            _this.glosasConRespuesta = [];
            _this.control.errores = true;

            loader("hide");
            jAlert(
              {
                titulo: "ADVERTENCIA!",
                mensaje:
                  "El archivo presentó errores, por lo tanto no se continuará con el proceso, verifique los errores de cada glosa, arregle el archivo y luego vuelva a intentarlo",
              },
              () => _this.atrasArchivo()
            );
          }
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
        });
    },
    grabarGlosas(nombre_archivo) {
      var _this = this;

      CON851("", "Creando glosas...", null, "success", "Espere");
      console.log(nombre_archivo);

      postData(
        {
          datosh:
            datosEnvio() +
            nombre_archivo +
            "|" +
            this.opcion +
            "|" +
            moment().format("YYYYMMDD") +
            "|" +
            localStorage.Usuario +
            "|",
        },
        get_url("app/SALUD/SER-A0I1-2.DLL")
      )
        .then((data) => {
          console.log(data);

          var llega = data.INFO;
          llega.pop();

          _this.glosasConRespuesta = llega;

          if (_this.glosasConRespuesta.length > 0) {
            _this.totalConRespuesta = _this.glosasConRespuesta.length
            _this.control.respuesta = true;
          }

          _this.actualizarCartera();
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
        });
    },
    actualizarCartera() {
      var _this = this;

      CON851("", "Actualizando cartera...", null, "success", "Espere");
      postData({ datosh: datosEnvio() + "2|" }, get_url("APP/SALUD/SER-A0A.DLL"))
        .then((data) => {
          console.log(data, "Termina de recalcular cartera");

          loader("hide");
          CON851("", "Proceso terminado satisfactoriamente", null, "success", "Exito");

          _this.seleccionar_archivo = false;

          if (_this.opcion == "2") {
            jAlert(
              {
                titulo: "RECORDATORIO!",
                mensaje:
                  "No olvide contabilizar las facturas por la opción: 9,7,A,6 (Resumen de contabilización) en el mes correspondiente a las glosas !!!",
              },
              () => _this.validarTercero()
            );
          } else _this.validarTercero();
        })
        .catch((err) => {
          loader("hide");
          console.error(err);
          CON851("", "Error actualizando cartera !!!", null, "error", "Error");
        });
    },
    salir_SER_A0I1() {
      this.errores = [];
      this.terceros = [];
      _inputControl("disabled");
      _inputControl("reset");
      _toggleNav();
    },
  },
});
