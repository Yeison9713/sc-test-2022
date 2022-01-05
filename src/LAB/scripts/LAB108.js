new Vue({
  el: "#LAB108",
  data: {
    especialidades: [],
    profesionales_lab108: [],
    global_lab108: {
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
      MOTIVO: "",
      MEDICAMENTO: "",
      FC_MAX: "",
      FC_MIN: "",
      CONTENIDO: "",
    },
    textos: {
      FC_MEDIA: "",
    },
    CONSULTA: false,
  },
  created() {
    _inputControl("disabled");
    _inputControl("reset");

    if (localStorage.Modulo == "HIC") {
      nombreOpcion("7,3 - Consultar resultados lab");
    } else {
      switch (LLAVE_RXLAB_GLOBAL.CUP.trim()) {
        case "895001":
          nombreOpcion("2,4 - Electrocardiografia dinamica (HOLTER)");
          break;
        case "895100":
          nombreOpcion("2,4 - Electrocardiografia de ritmo");
          break;
        case "896101":
          nombreOpcion("2,4 - Monitoreo de presion arterial sistematica (telemetria)");
          break;
      }
    }
    loader("show");
    this.traerLABCompleto_lab108();
  },
  watch: {},
  methods: {
    calcularFCmedia() {
      var fc_max = parseInt(this.global_lab108.FC_MAX) || 0;
      var fc_min = parseInt(this.global_lab108.FC_MIN) || 0;
      var media = (fc_max + fc_min) / 2;
      this.textos.FC_MEDIA = media;
    },
    traerLABCompleto_lab108() {
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
          _this.global_lab108 = data.RESULTADOS_LAB[0];
          console.log(_this.global_lab108);

          _this.asignarDatos();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error en consulta", null, "error", "Error");
          loader("hide");
          _this.salir_lab108();
        });
    },
    asignarDatos() {
      this.global_lab108.SUC = LLAVE_RXLAB_GLOBAL.SUC.trim();
      this.global_lab108.CL = LLAVE_RXLAB_GLOBAL.CL.trim();
      this.global_lab108.COMPROB = LLAVE_RXLAB_GLOBAL.COMPROB.trim();
      this.global_lab108.CUP = LLAVE_RXLAB_GLOBAL.CUP.trim();
      this.global_lab108.ID_PACI = LLAVE_RXLAB_GLOBAL.ID_PACIENTE.trim();
      this.global_lab108.ITEM = LLAVE_RXLAB_GLOBAL.ITEM.trim();

      this.global_lab108.DESCRIP_PACI = this.global_lab108.DESCRIP_PACI.replace(/\�/g, "Ñ").trim();
      this.global_lab108.DESCRIP_CUP = this.global_lab108.DESCRIP_CUP.replace(/\�/g, "Ñ").trim();

      this.global_lab108.MOTIVO = this.global_lab108.MOTIVO.replace(/\&/g, "\n").trim();
      this.global_lab108.MEDICAMENTO = this.global_lab108.MEDICAMENTO.replace(/\&/g, "\n").trim();
      this.global_lab108.CONTENIDO = this.global_lab108.CONTENIDO.replace(/\&/g, "\n").trim();

      this.global_lab108.ID_MEDICO = this.global_lab108.ID_MEDICO.trim();
      this.global_lab108.REG_MEDICO = this.global_lab108.REG_MEDICO.trim();
      this.global_lab108.NOMBRE_MEDICO = this.global_lab108.NOMBRE_MEDICO.trim();

      this.global_lab108.REFERIDO = this.global_lab108.REFERIDO.trim();
      this.global_lab108.DESCRIP_REFERIDO = this.global_lab108.DESCRIP_REFERIDO.trim();

      this.global_lab108.FC_MAX = this.global_lab108.FC_MAX.trim();
      this.global_lab108.FC_MIN = this.global_lab108.FC_MIN.trim();

      this.calcularFCmedia();

      this.validarOpcion();
    },
    validarOpcion() {
      var opcion = "";

      if (localStorage.Modulo == "LAB") {
        let active = $("#navegacion").find("li.opcion-menu.active");
        opcion = active[0].attributes[2].nodeValue;

        if (opcion == "02") {
          // if (this.global_lab108.REGISTRO_ESCRITO == 'S') {

          //     if (localStorage.Usuario == 'GEBC') {
          //         this.traerProfesionales()
          //     } else {
          //         loader('hide')
          //         jAlert(
          //             { titulo: 'ADVERTENCIA!', mensaje: 'Registro no se puede modificar!, para consultar ingrese a la opción 5' },
          //             this.salir_lab108
          //         )
          //     }
          // } else {
          this.traerProfesionales();
          // }
        } else if (opcion == "04") {
          // if (this.global_lab108.REGISTRO_ESCRITO == ' ') {
          //     loader('hide')
          //     jAlert(
          //         { titulo: 'ADVERTENCIA!', mensaje: 'Registro no se ha llenado!, Ingrese por la opcion 2' },
          //         this.salir_lab108
          //     )
          // } else {
          loader("hide");
          this.CONSULTA = true;
          // }
        }
      } else if (localStorage.Modulo == "HIC") {
        // if (this.global_lab108.REGISTRO_ESCRITO == ' ') {
        //     loader('hide')
        //     jAlert(
        //         { titulo: 'ADVERTENCIA!', mensaje: 'Registro no se ha llenado!, Ingrese por modulo laboratorios opcion 2' },
        //         this.salir_lab108
        //     )
        // } else if (this.global_lab108.REGISTRO_ESCRITO == 'S') {
        loader("hide");
        this.CONSULTA = true;
        // }
      }
    },
    traerProfesionales() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then(function (data) {
          _this.profesionales_lab108 = data.ARCHPROF;
          _this.profesionales_lab108.pop();
          for (var i in _this.profesionales_lab108) {
            _this.profesionales_lab108[i].NOMBRE = _this.profesionales_lab108[i].NOMBRE.replace(/\�/g, "Ñ").trim();
          }
          _this.traerEspecialidades();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error en consulta", null, "error", "Error");
          loader("hide");
          _this.salir_lab108();
        });
    },
    traerEspecialidades() {
      var _this = this;
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER855.DLL"))
        .then(function (data) {
          _this.especialidades = data.ESPECIALIDADES;
          _this.especialidades.pop();
          for (var i in _this.especialidades) {
            _this.especialidades[i].NOMBRE = _this.especialidades[i].NOMBRE.replace(/\�/g, "Ñ").toUpperCase().trim();
          }
          loader("hide");
          _this.validarMedico();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error en consulta", null, "error", "Error");
          loader("hide");
          _this.salir_lab108();
        });
    },
    ventanaMedico() {
      var _this = this;

      var validos = [];

      this.profesionales_lab108.forEach((item) => {
        let atiende = false;
        switch (item.ATIENDE_PROF.trim()) {
          case "1":
          case "5":
            atiende = true;
            break;
        }

        let espec = false;
        switch (item.TAB_ESPEC[0].COD.trim()) {
          case "701":
          case "732":
          case "710":
          case "360":
          case "602":
          case "781":
          case "387":
          case "120":
          case "122":
          case "302":
          case "381":
            espec = true;
            break;
        }
        if (atiende && espec) validos.push(item);
      });

      _ventanaDatos({
        titulo: "Ventana profesionales activos",
        columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO"],
        data: validos,
        ancho: "70%",
        callback_esc: function () {
          document.getElementById("medico_lab108").focus();
        },
        callback: function (data) {
          _this.global_lab108.ID_MEDICO = data.IDENTIFICACION.trim();
          setTimeout(() => _enterInput("#medico_lab108"), 100);
        },
      });
    },
    validarMedico() {
      validarInputs(
        {
          form: "#validarMedico_lab108",
          orden: "1",
        },
        () => {
          CON851P("03", this.validarMedico, this.salir_lab108);
        },
        () => {
          this.global_lab108.ID_MEDICO = this.global_lab108.ID_MEDICO.trim();

          var medico = this.profesionales_lab108.find((x) => x.IDENTIFICACION == this.global_lab108.ID_MEDICO);

          if (medico) {
            var ati = false;
            var esp = false;

            switch (medico.ATIENDE_PROF.trim()) {
              case "1":
              case "5":
                ati = true;
                break;
            }

            switch (medico.TAB_ESPEC[0].COD.trim()) {
              case "701":
              case "732":
              case "710":
              case "360":
              case "602":
              case "781":
              case "387":
              case "120":
              case "122":
              case "302":
                esp = true;
                break;
            }

            if (ati && esp) {
              this.global_lab108.REG_MEDICO = medico.REG_MEDICO;
              this.global_lab108.NOMBRE_MEDICO = medico.NOMBRE;
              this.validarContenido();
            } else {
              CON851("9X", "9X", null, "error", "error");
              this.validarMedico();
            }
          } else {
            CON851("01", "01", null, "error", "error");
            this.validarMedico();
          }
        }
      );
    },
    verificarAdjuntar() {
      CON851P(
        "Adjuntar archivos?",
        () => CON851P("01", this.validarMedico, this._grabardatos_lab108),
        this.ventanaAdjuntarArchivos
      );
    },
    ventanaEspecialidades() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana especialidades",
        columnas: ["CODIGO", "NOMBRE"],
        data: this.especialidades,
        callback_esc: function () {
          document.getElementById("referidoPor_lab108").focus();
        },
        callback: function (data) {
          _this.global_lab108.REFERIDO = data.CODIGO.trim();
          setTimeout(() => _enterInput("#referidoPor_lab108"), 100);
        },
      });
    },
    validarReferido() {
      validarInputs(
        {
          form: "#validarReferido_lab108",
          orden: "1",
        },
        () => {
          this.validarMedico();
        },
        () => {
          var busquedaEspec = this.especialidades.find(
            (data) => data.CODIGO == cerosIzq(this.global_lab108.REFERIDO, 3)
          );

          console.log(busquedaEspec);
          if (busquedaEspec) {
            this.global_lab108.DESCRIP_REFERIDO = busquedaEspec.NOMBRE.trim();
            this.validarMotivo();
          } else {
            this.global_lab108.DESCRIP_REFERIDO = "";
            CON851("01", "01", null, "error", "error");
            this.validarReferido();
          }
        }
      );
    },
    validarMotivo() {
      validarInputs(
        {
          form: "#validarMotivo_lab108",
          orden: "1",
          event_f4: () => this.validarContenido(1),
        },
        () => {
          this.validarReferido();
        },
        () => {
          this.global_lab108.MOTIVO = this.global_lab108.MOTIVO.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          this.validarMedicamento();
        }
      );
    },
    validarMedicamento() {
      validarInputs(
        {
          form: "#validarMedicamento_lab108",
          orden: "1",
          event_f4: () => this.validarContenido(2),
        },
        () => {
          this.validarMotivo();
        },
        () => {
          this.global_lab108.MEDICAMENTO = this.global_lab108.MEDICAMENTO.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          this.validarFcMax();
        }
      );
    },
    validarFcMax() {
      validarInputs(
        {
          form: "#validarFCMax_lab108",
          orden: "1",
          event_f4: () => this.validarContenido(3),
        },
        () => {
          this.validarMedicamento();
        },
        () => {
          this.validarFcMin();
        }
      );
    },
    validarFcMin() {
      validarInputs(
        {
          form: "#validarFCMin_lab108",
          orden: "1",
          event_f4: () => this.validarContenido(4),
        },
        () => {
          this.validarFcMax();
        },
        () => {
          this.validarContenido();
        }
      );
    },
    validarContenido() {
      validarInputs(
        {
          form: "#validarContenido_lab108",
          orden: "1",
        },
        () => {
          this.validarMedico()
        },
        () => {
          this.global_lab108.CONTENIDO = this.global_lab108.CONTENIDO.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

          CON851P(
            "Adjuntar archivos?",
            () => CON851P("01", this.validarContenido, this._grabardatos_lab108),
            this.ventanaAdjuntarArchivos
          );
        }
      );
    },
    ventanaAdjuntarArchivos() {
      var $_this = this;
      $('[data-bb-handler="main"]').click();

      setTimeout(() => {
        var fuente =
          "<div>" +
          '<div class="col-md-12">' +
          '<div class="portlet light no-padding">' +
          '<div class="portlet-body no-padding">' +
          '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
          '<div class="col-md-12 col-sm-12 col-xs-12" style="display: flex ;justify-content: space-between">' +
          '<div class="col-md-2">' +
          '<button id="salir_lab108" class="col-md-12 btn" type="button" style="color: white; background-color: #da2c2c; border-color: #da2c2c">Salir</button>' +
          "</div>" +
          '<div class="col-md-5">' +
          '<label class="col-md-12 btn btn-default btn-file">' +
          '<input type="file" multiple id="archivos_lab108" accept=".dcm, application/pdf,image/jpeg,image/png,image/jpg,video/mpeg,video/mp4,video/x-ms-wmv,application/dicom,image/dicom"/>' +
          "</label>" +
          "</div>" +
          '<div class="col-md-2">' +
          '<button id="enviarArchivos_lab108" class="col-md-12 btn btn-primary" type="button">Adjuntar</button>' +
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
          document.getElementById("salir_lab108").onclick = () => {
            $('[data-bb-handler="main"]').click();
            $_this.validarMedico();
          };
          document.getElementById("enviarArchivos_lab108").onclick = () => $_this.enviarArchivos_lab108();
        });
      }, 500);
    },
    enviarArchivos_lab108() {
      var el = document.getElementById("archivos_lab108");
      var archivos = el.files;

      if (archivos.length < 1) {
        CON851("", "No se han escogido archivos", null, "warning", "Advertencia");
      } else {
        loader("show");
        var nombreArch =
          this.global_lab108.SUC +
          this.global_lab108.CL +
          this.global_lab108.COMPROB +
          this.global_lab108.CUP +
          this.global_lab108.ITEM;

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
                $_this.global_lab108.ADJUNTOS[i] = data.msj.correcto[i];
              }
              $('[data-bb-handler="main"]').click();
              console.log("Archivos error:", data.msj.error);
              setTimeout($_this._grabardatos_lab108, 500);
            } else {
              CON851("", "Ha ocurrido un error subiendo archivos", null, "error", "Error");
              console.error("Ha ocurrido un error:", data.msj);
              $('[data-bb-handler="main"]').click();
              $_This.validarContenido();
            }
          });
      }
    },
    _grabardatos_lab108() {
      var _this = this;
      loader("show");

      var datos_envio_lab108 = datosEnvio();
      datos_envio_lab108 += this.global_lab108.LLAVE;
      datos_envio_lab108 += "|";
      datos_envio_lab108 += cerosIzq(this.global_lab108.ID_MEDICO, 10);
      datos_envio_lab108 += "|";
      datos_envio_lab108 += cerosIzq(this.global_lab108.REFERIDO, 3);
      datos_envio_lab108 += "|";
      datos_envio_lab108 += this.global_lab108.DESCRIP_REFERIDO;
      datos_envio_lab108 += "|";
      datos_envio_lab108 += cerosIzq(this.global_lab108.FC_MAX, 3);
      datos_envio_lab108 += "|";
      datos_envio_lab108 += cerosIzq(this.global_lab108.FC_MIN, 3);
      datos_envio_lab108 += "|";
      datos_envio_lab108 += moment().format("YYYYMMDD");
      datos_envio_lab108 += "|";
      datos_envio_lab108 += moment().format("HHmm");
      datos_envio_lab108 += "|";
      datos_envio_lab108 += localStorage.Usuario;
      datos_envio_lab108 += "|";

      var data = {};
      data["datosh"] = datos_envio_lab108;

      data["MOTIVO"] = this.global_lab108.MOTIVO.replace(/(\r\n|\n|\r)/gm, "&");
      data["MEDICAMENTO"] = this.global_lab108.MEDICAMENTO.replace(/(\r\n|\n|\r)/gm, "&");

      this.global_lab108.CONTENIDO = this.global_lab108.CONTENIDO.replace(/(\r\n|\n|\r)/gm, "&");

      var posicion = 0;
      var contadorLin = 0;
      var contadorTotal = 0;
      var linea = "";
      var maximo = 90;

      this.global_lab108.CONTENIDO.split("").forEach(function (item, i) {
        contadorTotal = i + 1;
        contadorLin = contadorLin + 1;

        switch (item) {
          case "á":
          case "é":
          case "í":
          case "ó":
          case "ú":
          case "Á":
          case "É":
          case "Í":
          case "Ó":
          case "Ú":
          case "ñ":
          case "Ñ":
          case "!":
          case '"':
          case "#":
          case "$":
          case "%":
          case "/":
          case "(":
          case ")":
          case "=":
          case "?":
          case "*":
          case "+":
          case "-":
          case "@":
          case ">":
          case "<":
            maximo = maximo + 1;
            break;
        }
        linea += item;

        if (contadorLin == maximo || _this.global_lab108.CONTENIDO.length == contadorTotal) {
          posicion = posicion + 1;

          data["CONT-" + posicion.toString().padStart(3, "0")] = linea;
          contadorLin = 0;
          linea = "";
          maximo = 90;
        }
      });

      var archivos = "";
      this.global_lab108.ADJUNTOS.forEach(function (item, i) {
        archivos += espaciosDer(item, 30);
        archivos += "|";
      });

      data["adjuntos"] = archivos;
      console.log(data);

      postData(data, get_url("APP/LAB/LAB108.DLL"))
        .then((llegada) => {
          loader("hide");
          CON851("", "Resultado guardado correctamente!", null, "success", "Exitoso");
          setTimeout(_this.preguntaImprimir_lab108, 300);
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", err, null, "error", "Error");
          _this.salir_lab108();
        });
    },
    preguntaImprimir_lab108() {
      CON851P(
        "00",
        () => this.salir_lab108(),
        () => {
          this._envioImpresion();
        }
      );
    },
    async _envioImpresion() {
      _this = this;
      loader("show");
      _this.global_lab108.NOMBREPDF = localStorage.Usuario + moment().format("-YYMMDD-HHmmss") + ".pdf";
      _this.global_lab108.FC_MED = _this.textos.FC_MEDIA;

      await _impresion2({
        tipo: "pdf",
        archivo: _this.global_lab108.NOMBREPDF,
        content: _imprimirLab108(_this.global_lab108),
      })
        .then((llegada) => {
          _this.salir_lab108();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    aperturaAdjunto_lab108(item) {
      var ruta = "D:\\WEB\\ADJUNTOS\\";

      child("start " + ruta + item, (error, data) => {
        console.log(error, data);
      });
    },
    salir_lab108() {
      _inputControl("reset");
      _inputControl("disabled");
      this.global_lab108 = {};
      this.especialidades = [];
      let Window = BrowserWindow.getAllWindows();
      if (Window.length == 1) {
        $(".page-breadcrumb")[1].remove();
      }
      busquedaEstudios_RXLAB("PACIENTE", LLAVE_RXLAB_GLOBAL.ID_PACIENTE);
    },
  },
});
