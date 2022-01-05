new Vue({
  el: "#RX_424",
  data: {
    sucursal: "**",
    nroDesde: "1",
    nroHasta: "999999",
    ANO: "",
    MES_INI: "",
    DIA_INI: "",
    MES_FIN: "",
    DIA_FIN: "",
    tercero: "",
    medico: "",
    factura: {
      prefijo: "",
      nro_fact: "",
    },
    profesionales: [],
    terceros: [],
    sucursales: [],
    tipo_fact: "1",
    textos: {
      tercero: "",
      medico: "",
      sucursal: "",
    },
    RESULTADOS_A_PROCESAR: [],
    RESULTADO: {},
    mostrarTabla: false,
    totalResultados: 0,
    totalGenerados: 0
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    _inputControl("reset");

    nombreOpcion("3,1 - Impresión masiva de estudios");

    this.ANO = (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(0, 2)) + 2000).toString();
    loader("show");
    this.traerSucursales();
  },
  watch: {},
  methods: {
    traerSucursales() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON823.DLL"))
        .then((data) => {
          _this.sucursales = data.SUCURSAL;
          _this.sucursales.pop();

          _this.sucursales.push({ CODIGO: "**", DESCRIPCION: "TODAS", ALMACEN: "" });

          _this.traerTerceros();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "error consultando sucursales", null, "error", "Error");
          _this.salir_RX424();
        });
    },
    traerTerceros() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON802.DLL"))
        .then((data) => {
          _this.terceros = data.TERCEROS;
          _this.terceros.pop();

          _this.traerProfesionales();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "error consultando terceros", null, "error", "Error");
          _this.salir_RX424();
        });
    },
    traerProfesionales() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then((data) => {
          loader("hide");
          _this.profesionales = data.ARCHPROF;
          _this.profesionales.pop();

          _this.ventanaSucursales();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "error consultando profesionales", null, "error", "Error");
          _this.salir_RX424();
        });
    },
    ventanaSucursales() {
      var _this = this;

      setTimeout(() => {
        POPUP(
          {
            titulo: "Sucursal a escoger",
            indices: [{ id: "CODIGO", label: "DESCRIPCION" }],
            array: this.sucursales,
            callback_f: () => this.salir_RX424(),
            seleccion: this.sucursal,
            teclaAlterna: true,
          },
          (data) => {
            _this.sucursal = data.CODIGO;
            _this.textos.sucursal = data.DESCRIPCION;

            _this.validarNroDesde();
          }
        );
      }, 300);
    },
    validarNroDesde() {
      validarInputs(
        {
          form: "#validarNroDesde",
          orden: "1",
        },
        () => this.ventanaSucursales(),
        () => {
          this.nroDesde = cerosIzq(this.nroDesde, 6);

          this.validarNroHasta();
        }
      );
    },
    validarNroHasta() {
      validarInputs(
        {
          form: "#validarNroHasta",
          orden: "1",
        },
        () => this.validarNroDesde(),
        () => {
          this.nroHasta = cerosIzq(this.nroHasta, 6);

          this.validarMesIni();
        }
      );
    },
    validarMesIni() {
      validarInputs(
        {
          form: "#validarMesIni",
          orden: "1",
        },
        () => this.validarNroHasta(),
        () => {
          this.MES_INI = cerosIzq(this.MES_INI, 2);

          var mes = parseInt(this.MES_INI);

          if (mes > 12) {
            CON851("", "Mes fuera de rango", null, "error", "Error");
            this.validarMesIni();
          } else {
            this.validarDiaIni();
          }
        }
      );
    },
    validarDiaIni() {
      validarInputs(
        {
          form: "#validarDiaIni",
          orden: "1",
        },
        () => this.validarMesIni(),
        () => {
          this.DIA_INI = cerosIzq(this.DIA_INI, 2);

          var dia = parseInt(this.DIA_INI);

          if (dia > 31) {
            CON851("", "Dia fuera de rango", null, "error", "Error");
            this.validarDiaIni();
          } else {
            this.validarMesFin();
          }
        }
      );
    },
    validarMesFin() {
      validarInputs(
        {
          form: "#validarMesFin",
          orden: "1",
        },
        () => this.validarDiaIni(),
        () => {
          this.MES_FIN = cerosIzq(this.MES_FIN, 2);

          var mes = parseInt(this.MES_FIN);

          if (mes > 12) {
            CON851("", "Mes fuera de rango", null, "error", "Error");
            this.validarMesFin();
          } else {
            this.validarDiaFin();
          }
        }
      );
    },
    validarDiaFin() {
      validarInputs(
        {
          form: "#validarDiaFin",
          orden: "1",
        },
        () => this.validarMesFin(),
        () => {
          this.DIA_FIN = cerosIzq(this.DIA_FIN, 2);

          var dia = parseInt(this.DIA_FIN);

          if (dia > 31) {
            CON851("", "Dia fuera de rango", null, "error", "Error");
            this.validarDiaFin();
          } else {
            this.validarTercero();
          }
        }
      );
    },
    ventanaTerceros() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana de terceros",
        columnas: ["COD", "NOMBRE", "DIRREC", "CIUDAD"],
        data: this.terceros,
        ancho: "70%",
        callback_esc: function () {
          document.getElementById("cliente_rx424").focus();
        },
        callback: function (data) {
          _this.tercero = data.COD.trim();
          setTimeout(() => _enterInput("#cliente_rx424"), 100);
        },
      });
    },
    validarTercero() {
      validarInputs(
        {
          form: "#validarTercero",
          orden: "1",
        },
        () => this.validarDiaFin(),
        () => {
          this.tercero = this.tercero.trim();

          if (this.tercero == "99") {
            this.textos.tercero = "TODOS";
            this.validarProfesional();
          } else {
            var busqueda = this.terceros.find((x) => parseInt(x.COD) == parseInt(this.tercero));

            if (busqueda) {
              this.textos.tercero = busqueda.NOMBRE.trim();
              this.validarProfesional();
            } else {
              this.textos.tercero = "";
              CON851("", "Tercero no existe !", null, "error", "Error");
              this.validarTercero();
            }
          }
        }
      );
    },
    ventanaProfesionales() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana profesionales activos",
        columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO"],
        data: this.profesionales,
        ancho: "70%",
        callback_esc: function () {
          document.getElementById("medico_rx424").focus();
        },
        callback: function (data) {
          _this.medico = data.IDENTIFICACION.trim();
          setTimeout(() => _enterInput("#medico_rx424"), 100);
        },
      });
    },
    validarProfesional() {
      validarInputs(
        {
          form: "#validarMedico",
          orden: "1",
        },
        () => this.validarTercero(),
        () => {
          this.medico = this.medico.trim();

          if (this.medico == "99") {
            this.textos.medico = "TODOS";
            this.preguntaFact();
          } else {
            var busqueda = this.profesionales.find((x) => parseInt(x.IDENTIFICACION) == parseInt(this.medico));

            if (busqueda) {
              this.textos.medico = busqueda.NOMBRE.trim();
              this.preguntaFact();
            } else {
              this.textos.medico = "";
              CON851("", "Medico no existe !", null, "error", "Error");
              this.validarProfesional();
            }
          }
        }
      );
    },
    preguntaFact() {
      var _this = this;

      var array_fact = [
        { COD: "1", DESCRIP: "TODAS LAS FACTURAS" },
        { COD: "2", DESCRIP: "DIGITAR FACTURA" },
      ];

      setTimeout(() => {
        POPUP(
          {
            titulo: "Factura ?",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: array_fact,
            callback_f: () => this.validarProfesional(),
            seleccion: this.tipo_fact,
            teclaAlterna: true,
          },
          (data) => {
            _this.tipo_fact = data.COD;

            switch (_this.tipo_fact) {
              case "1":
                _this.factura.prefijo = "*";
                _this.factura.nro_fact = "";
                _this.PreguntaConsultar();
                break;
              case "2":
                _this.validarPrefijo();
                break;
            }
          }
        );
      }, 300);
    },
    validarPrefijo() {
      validarInputs(
        {
          form: "#validarPref_fact",
          orden: "1",
        },
        () => this.preguntaFact(),
        () => {
          this.factura.prefijo = this.factura.prefijo.toUpperCase().trim();

          switch (this.factura.prefijo) {
            case "A":
            case "P":
            case "T":
              this.validarNroFact();
              break;
            default:
              CON851("", "Prefijo no valido !", null, "error", "Error");
              this.validarPrefijo();
              break;
          }
        }
      );
    },
    validarNroFact() {
      validarInputs(
        {
          form: "#validarNro_fact",
          orden: "1",
        },
        () => this.validarPrefijo(),
        () => {
          this.factura.nro_fact = cerosIzq(this.factura.nro_fact.trim(), 6);

          this.PreguntaConsultar();
        }
      );
    },
    PreguntaConsultar() {
      CON851P(
        "Desea continuar con el proceso ?, tardará de acuerdo a los filtros seleccionados",
        () => {
          if (this.tipo_fact == "1") this.preguntaFact();
          else this.validarNroFact();
        },
        this.realizarConsulta
      );
    },
    async realizarConsulta() {
      this.totalGenerados = 0
      this.totalResultados = 0
      this.RESULTADOS_A_PROCESAR = []

      var _this = this;

      loader("show");

      var fechaInicio = this.ANO + this.MES_INI + this.DIA_INI;
      var fechaFin = this.ANO + this.MES_FIN + this.DIA_FIN;

      postData(
        {
          datosh:
            datosEnvio() +
            "|4|" +
            fechaInicio +
            "|" +
            cerosIzq(this.tercero, 10) +
            "|" +
            cerosIzq(this.medico, 10) +
            "|" +
            this.sucursal +
            "|" +
            this.factura.prefijo +
            "|" +
            this.factura.nro_fact +
            "|" +
            fechaFin +
            "|" +
            this.nroDesde +
            "|" +
            this.nroHasta +
            "|",
        },
        get_url("APP/RX/RX424.DLL")
      )
        .then((data) => {
          console.log(data);
          _this.RESULTADOS_A_PROCESAR = data.FACTURA;
          _this.RESULTADOS_A_PROCESAR.pop();

          if (_this.RESULTADOS_A_PROCESAR.length == 0) {
            loader("hide");
            CON851("", "No hay resultados encontrados", null, "warning", "Advertencia");
            _this.validarProfesional();
          } else {
            console.log(_this.RESULTADOS_A_PROCESAR.length);
            _this.totalResultados = _this.RESULTADOS_A_PROCESAR.length;
            _this.mostrarTabla = true;
            _this.proceso();
          }
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", "Ha ocurrido un error", null, "warning", "Advertencia");
          _this.validarProfesional();
        });
    },
    async proceso() {
      var _this = this;

      for await (var resultado of this.RESULTADOS_A_PROCESAR) {
        var llave = resultado.LLAVE_FACT;
        console.log('a consultar ----> ', llave)

        await postData(
          {
            datosh:
              datosEnvio() +
              llave.substring(0, 10) +
              "|" +
              llave.substring(10, 19) +
              "|" +
              llave.substring(19, 36) +
              "|" +
              llave.substring(36, 38) +
              "|",
          },
          get_url("APP/RX/RX-421W.DLL")
        )
          .then(async (data) => {
            _this.RESULTADO = data.RESULTADOS_RX[0];

            _this.RESULTADO["SUC"] = llave.substring(10, 12);
            _this.RESULTADO["CL"] = llave.substring(12, 13);
            _this.RESULTADO["COMPROB"] = llave.substring(13, 19);
            _this.RESULTADO["CUP"] = llave.substring(19, 36);

            _this.RESULTADO.RESULTADO_PPAL = _this.RESULTADO.RESULTADO_PPAL.replace(/\&/g, "\n").trim();
            _this.RESULTADO.RESULTADO_PPAL = _this.RESULTADO.RESULTADO_PPAL.replace(/\�/g, "ñ").trim();

            _this.RESULTADO.DESCRIP_PACI = _this.RESULTADO.DESCRIP_PACI.replace(/\�/g, "Ñ").trim();

            CON851("", llave.substring(10, 19), null, "success", "Imprimiendo");

            await _this.generarPdf(llave);
          })
          .catch((err) => {
            console.log(err);
            CON851("", "Ha ocurrido un error en consulta", null, "error", "Error");
          });
      }

      loader("hide");
      CON851("", "Proceso terminado", null, "success", "Correcto");
      this.validarProfesional();
    },
    async generarPdf(llave) {
      let ruta = "C:\\PROSOFT\\MASIVO\\";
      var busqueda = this.sucursales.find((x) => x.CODIGO.trim() == this.RESULTADO.SUC.trim());

      if (!busqueda) busqueda = { DESCRIPCION: "NO_EXISTE" };

      let nombre_pdf = "";

      if (parseInt($_USUA_GLOBAL[0].NIT) == 900193162) {
        switch (this.RESULTADO.SUC) {
          case "SC":
          case "HV":
          case "SA":
          case "MI":
          case "JG":
            let docu = this.RESULTADO.ID_HISTORIA.replace(/\,/g, "");
            let nombre = this.RESULTADO.DESCRIP_PACI.replace(/\s+/g, " ").replace(/\ /g, "-");
            nombre_pdf = docu + "-" + nombre + "-" + llave.substring(13, 19);
            ruta = ruta + this.RESULTADO.SUC + "\\";
            break;
          default:
            nombre_pdf = busqueda.DESCRIPCION.substring(0, 4) + llave.substring(13, 19);
            break;
        }
      } else nombre_pdf = busqueda.DESCRIPCION.substring(0, 4) + llave.substring(13, 19);

      if (llave.substring(36, 38) != "01") nombre_pdf = nombre_pdf + "-" + llave.substring(36, 38);

      if (llave.substring(19, 28).trim() == "886012") {
        await this.organizar();

        await _impresion2({
          tipo: "pdf",
          archivo: nombre_pdf + ".pdf",
          content: _imprimir_RXI03A(this.RESULTADO),
          ruta_guardado: ruta,
          abrir_archivo: false,
        })
          .then((data) => {
            this.totalGenerados ++
          })
          .catch((err) => {
            console.log(err, "error");
            CON851("", "Ha ocurrido un error imprimiendo", null, "error", "Error");
          });
      } else {
        await _impresion2({
          tipo: "pdf",
          archivo: nombre_pdf + ".pdf",
          content: imprimirEstandar_RX(this.RESULTADO),
          ruta_guardado: ruta,
          abrir_archivo: false,
        })
          .then((data) => {
            this.totalGenerados ++
          })
          .catch((err) => {
            console.log(err, "error");
            CON851("", "Ha ocurrido un error imprimiendo", null, "error", "Error");
          });
      }
    },
    async organizar() {
      var Maskbmd_rx424 = IMask.createMask({
        mask: Number,
        radix: ".",
        padFractionalZeros: true,
        signed: false,
        scale: 3,
        min: 0.0,
        max: 9.999,
      });
      var MaskScore_rx424 = IMask.createMask({
        mask: Number,
        radix: ".",
        signed: true,
        padFractionalZeros: true,
        scale: 1,
        min: -9.9,
        max: 9.9,
      });

      this.RESULTADO.ANTECEDENTES = this.RESULTADO.ANTECEDENTES.replace(/\&/g, "\n").trim();
      this.RESULTADO.ANTECEDENTES = this.RESULTADO.ANTECEDENTES.replace(/\�/g, "ñ").trim();

      this.RESULTADO.TRATAMIENTO = this.RESULTADO.TRATAMIENTO.replace(/\&/g, "\n").trim();
      this.RESULTADO.TRATAMIENTO = this.RESULTADO.TRATAMIENTO.replace(/\�/g, "ñ").trim();

      this.RESULTADO.HALLAZGOS = this.RESULTADO.HALLAZGOS.replace(/\&/g, "\n").trim();
      this.RESULTADO.HALLAZGOS = this.RESULTADO.HALLAZGOS.replace(/\�/g, "ñ").trim();

      this.RESULTADO.CONCLUSIONES = this.RESULTADO.CONCLUSIONES.replace(/\&/g, "\n").trim();
      this.RESULTADO.CONCLUSIONES = this.RESULTADO.CONCLUSIONES.replace(/\�/g, "ñ").trim();

      this.RESULTADO.USU = $_USUA_GLOBAL[0].NOMBRE.replace(/\s+/g, " ");
      this.RESULTADO.NIT = $_USUA_GLOBAL[0].NIT;

      var nuevo = this.RESULTADO.TABLA_MEDICION.map((x) => {
        x.BMD = Maskbmd_rx424.resolve(x.BMD);
        x.T_SCORE = MaskScore_rx424.resolve(x.T_SCORE);
        x.Z_SCORE = MaskScore_rx424.resolve(x.Z_SCORE);

        return x;
      });

      this.RESULTADO.TABLA_MEDICION = nuevo;
    },
    salir_RX424() {
      _inputControl("disabled");
      _inputControl("reset");
      _toggleNav();
    },
  },
});
