new Vue({
  el: "#lab103",
  data: {
    profesionales_lab103: [],
    enfermedades_lab103: [],
    global_lab103: {
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
      ADJUNTOS: [],
      EKG_REPOSO: "",
      FCM: "",
      FCSM: "",
      SC: "",
      EKG: "",
      METODO: "",
      MEDICACION: "",
      SINTOMAS: "",
      ECOCARDIOGRAMA_TT: "",
      ECOCARDIOGRAMA: "",
      RAIZ_AORTICA: "",
      AURICULA_IZQ: "",
      VENT_IZQ_DIAS: "",
      VENT_IZQ_SIS: "",
      SEPTUM: "",
      PARED_POST: "",
      VENT_DER: "",
      FRACC_EYECC: "",
      TABLA_FC: ["", "", "", "", "", ""],
      TABLA_DOBU: [
        { FC: "", TA_SIS: "", TA_DIAS: "" },
        { FC: "", TA_SIS: "", TA_DIAS: "" },
        { FC: "", TA_SIS: "", TA_DIAS: "" },
        { FC: "", TA_SIS: "", TA_DIAS: "" },
        { FC: "", TA_SIS: "", TA_DIAS: "" },
        { FC: "", TA_SIS: "", TA_DIAS: "" },
      ],
      QUIEN_REFIERE: "",
    },
    CONSULTA: false,
    ES_LAB: true,
    metodos: [
      { COD: "1", DESCRIP: "CON DOBUTAMINA" },
      { COD: "2", DESCRIP: "CON EJERCICIO" },
    ],
    textos: {
      metodo: "",
      titulo_tabla: "",
      columna_tit: "",
      columnas: ["", "", "", "", "", ""],
      posterior: "",
    },
    mascara: IMask.createMask({
      mask: Number,
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 1,
      min: 000,
      max: 9.9,
    }),
  },
  created() {
    _inputControl("disabled");
    _inputControl("reset");

    nombreOpcion("2,3 - Ecocardiograma Stress");

    this.traerLABCompleto_lab103();
  },
  watch: {
    "global_lab103.METODO": function (data) {
      switch (data) {
        case "1":
          this.textos.metodo = "1. Dobutamina";
          this.textos.titulo_tabla = "Dobutamina";
          this.textos.columna_tit = "Dosis";
          this.textos.columnas[0] = "5";
          this.textos.columnas[1] = "10";
          this.textos.columnas[2] = "20";
          this.textos.columnas[3] = "30";
          this.textos.columnas[4] = "40";
          this.textos.columnas[5] = "50";
          this.textos.posterior = "Infusión de dobutamina";
          break;
        case "2":
          this.textos.metodo = "2. Ejercicio";
          this.textos.titulo_tabla = "Ejercicio";
          this.textos.columna_tit = "Etapa";
          this.textos.columnas[0] = "1";
          this.textos.columnas[1] = "2";
          this.textos.columnas[2] = "3";
          this.textos.columnas[3] = "4";
          this.textos.columnas[4] = "5";
          this.textos.columnas[5] = "6";
          this.textos.posterior = "Prueba de esfuerzo";
          break;
      }
    },
  },
  methods: {
    traerLABCompleto_lab103() {
      var _this = this;
      var datos_envio =
        datosEnvio() +
        LLAVE_RXLAB_GLOBAL.COMPROBANTE +
        "|" +
        LLAVE_RXLAB_GLOBAL.CUP +
        "|" +
        LLAVE_RXLAB_GLOBAL.ITEM +
        "|";
      postData({ datosh: datos_envio }, get_url("APP/LAB/LAB102.DLL"))
        .then(function (data) {
          _this.global_lab103 = data.RESULTADOS_LAB[0];
          console.log(_this.global_lab103);
          _this.asignarDatos();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error en consulta", null, "error", "Error");
          loader("hide");
          _this.salir_lab103();
        });
    },
    asignarDatos() {
      this.global_lab103.SUC = LLAVE_RXLAB_GLOBAL.SUC.trim();
      this.global_lab103.CL = LLAVE_RXLAB_GLOBAL.CL.trim();
      this.global_lab103.COMPROB = LLAVE_RXLAB_GLOBAL.COMPROB.trim();
      this.global_lab103.CUP = LLAVE_RXLAB_GLOBAL.CUP.trim();
      //   this.global_lab103.CUP = "881210";
      this.global_lab103.ID_PACI = LLAVE_RXLAB_GLOBAL.ID_PACIENTE.trim();
      this.global_lab103.ITEM = LLAVE_RXLAB_GLOBAL.ITEM.trim();

      this.global_lab103.MEDICACION = this.global_lab103.MEDICACION.replace(/\&/g, "\n").trim();

      for (var i in this.global_lab103.TABLA_DOBU) {
        this.global_lab103.TABLA_DOBU[i].FC = isNaN(parseInt(this.global_lab103.TABLA_DOBU[i].FC))
          ? ""
          : this.global_lab103.TABLA_DOBU[i].FC.toString();

        this.global_lab103.TABLA_DOBU[i].TA_SIS = isNaN(parseInt(this.global_lab103.TABLA_DOBU[i].TA_SIS))
          ? ""
          : this.global_lab103.TABLA_DOBU[i].TA_SIS.toString();

        this.global_lab103.TABLA_DOBU[i].TA_DIAS = isNaN(parseInt(this.global_lab103.TABLA_DOBU[i].TA_DIAS))
          ? ""
          : this.global_lab103.TABLA_DOBU[i].TA_DIAS.toString();
      }

      this.validarOpcion();
    },
    validarOpcion() {
      if (localStorage.Modulo == "LAB") {
        let active = $("#navegacion").find("li.opcion-menu.active");
        opcion = active[0].attributes[2].nodeValue;

        if (opcion == "02") {
          this.CONSULTA = false;
          this.traerProfesionales();
        } else if (opcion == "04") {
          loader("hide");
          this.CONSULTA = true;
          this.global_lab103.ECOCARDIOGRAMA_TT = this.global_lab103.ECOCARDIOGRAMA_TT.replace(/\&/g, "\n").trim();
          this.global_lab103.ECOCARDIOGRAMA = this.global_lab103.ECOCARDIOGRAMA.replace(/\&/g, "\n").trim();
          this.global_lab103.CONCLUSIONES = this.global_lab103.CONCLUSIONES.replace(/\&/g, "\n").trim();
        }
      } else if (localStorage.Modulo == "HIC") {
        loader("hide");
        this.CONSULTA = true;
        this.global_lab103.ECOCARDIOGRAMA_TT = this.global_lab103.ECOCARDIOGRAMA_TT.replace(/\&/g, "\n").trim();
        this.global_lab103.ECOCARDIOGRAMA = this.global_lab103.ECOCARDIOGRAMA.replace(/\&/g, "\n").trim();
        this.global_lab103.CONCLUSIONES = this.global_lab103.CONCLUSIONES.replace(/\&/g, "\n").trim();
      }
    },
    traerProfesionales() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then(function (data) {
          _this.profesionales_lab103 = data.ARCHPROF;
          _this.profesionales_lab103.pop();
          for (var i in _this.profesionales_lab103) {
            _this.profesionales_lab103[i].NOMBRE = _this.profesionales_lab103[i].NOMBRE.replace(/\�/g, "Ñ").trim();
          }
          _this.traerEnfermedades();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error en consulta", null, "error", "Error");
          loader("hide");
          _this.salir_lab103();
        });
    },
    traerEnfermedades() {
      var _this = this;

      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER851.DLL"))
        .then((data) => {
          console.log(data);
          _this.enfermedades_lab103 = data.ENFERMEDADES;
          _this.enfermedades_lab103.pop();

          for (var i in _this.enfermedades_lab103) {
            _this.enfermedades_lab103[i].NOMBRE_ENF = _this.enfermedades_lab103[i].NOMBRE_ENF.replace(
              /\�/g,
              "Ñ"
            ).trim();
          }

          _this.verificarMetodo();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando enfermedades !", null, "error", "Error");
          _this.salir_AIEPI002();
        });
    },
    verificarMetodo() {
      if (this.global_lab103.CUP == "881210") this.seleccionMetodo();
      else {
        if (this.global_lab103.CUP == "88121001") this.global_lab103.METODO = "1";
        else if (this.global_lab103.CUP == "88121002") this.global_lab103.METODO = "2";
        this.mostrarDatos_lab103();
      }
    },
    seleccionMetodo() {
      loader("hide");
      setTimeout(() => {
        POPUP(
          {
            titulo: "Seleccione método",
            indices: [{ id: "COD", label: "DESCRIP" }],
            array: this.metodos,
            callback_f: () => CON851P("03", this.seleccionMetodo, this.salir_lab103),
            seleccion: this.global_lab103.METODO,
            teclaAlterna: true,
          },
          (data) => {
            this.global_lab103.METODO = data.COD;
            this.mostrarDatos_lab103();
          }
        );
      }, 300);
    },
    mostrarDatos_lab103() {
      if (this.global_lab103.REGISTRO_ESCRITO.trim() == "" || this.global_lab103.REGISTRO_ESCRITO.trim() == "N") {
        // if (this.global_lab103.ECOCARDIOGRAMA_TT.trim() == "") {
        this.global_lab103.ECOCARDIOGRAMA_TT =
          "Ventrículo izquierdo:\nCavidad de tamaño y forma normal, contractilidad global y segmentaria conservada. Espesor normal de sus paredes para superficie corporal, sin obstrucción a nivel medio ventricular, ni a través del tracto de salida. FEVI 60%. El patrón de llenado del ventrículo izquierdo es normal\n\nVentrículo derecho:\nCavidad de tamaño normal, con adecuada contractilidad de la pared libre, diámetro medial cm\n\nAurícula izquierda:\nCavidad de tamaño y forma normal, no masas ni trombos en su interior. Área de cm²\n\nAurícula derecha:\nCavidad de tamaño y forma normal, no masas ni trombos en su interior. Área de cm²\n\nVálvula aórtica:\nNo insuficiencia, adecuada apertura y cierre. No hay gradiente significativo\n\nVálvula mitral:\nNo insuficiencia, adecuada apertura y cierre. No hay gradiente significativo\n\nVálvula tricuspidea:\nMediante el registro Doppler color y continuo, se observó insuficiencia Tricuspidea ligera, a través de la cual se calculó una Presión Sistólica de Arteria Pulmonar de 23 mmHg\n\nSeptum interventricular:\nIntegro\n\nSeptum interauricular:\nIntegro\n\nAorta ascendente raíz aórtica:\nDe aspecto y diámetro normal\n\nVena cava inferior:\nAdecuado colapso inspiratorio\n\nVenas pulmonares:\nSe observan 3 drenando a aurícula izquierda\n\nVálvula pulmonar:\nNo insuficiencia, adecuada apertura";
        // } else this.global_lab103.ECOCARDIOGRAMA_TT = this.global_lab103.ECOCARDIOGRAMA_TT.replace(/\&/g, "\n").trim();

        // if (this.global_lab103.ECOCARDIOGRAMA.trim() == "") {
        switch (this.global_lab103.METODO) {
          case "1":
            this.global_lab103.ECOCARDIOGRAMA =
              "Se realiza la infusión continua con dobutamina a dosis crecientes cada tres minutos de 5, 10, 20, 30, 40 y 50 ug Kg. min. Hasta alcanzar el 85% de la frecuencia cardiaca máxima esperada. Obteniendo: \n\nDurante las dosis bajas adecuado aumento de contractilidad global y segmentaria, disminución de la cavidad en sístole.\nDosis máximas aumento de la contractilidad global y segmentaria, aumento del engrosamiento sistólico de todas las paredes, con disminución de la cavidad en sístole, sin detectarse en ningun momento trastornos de contractilidad segmentaria sugestivo de isquemia.\n\nEl paciente toleró adecuadamente el procedimiento sin presentar arritmias, ni dolor torácico";
            break;
          case "2":
            this.global_lab103.ECOCARDIOGRAMA =
              "Durante el Ecocardiograma basal se observó adecuada contractilidad global y segmentaria.\nDurante el máximo ejercicio se observa adecuado aumento de la contractilidad global y segmentaria, con incremento sistólico de todas las paredes y adecuada disminución de la cavidad en sístole, sin detectarse en ningún momento trastornos de contractilidad sugestivo de isquemia.\n\nEl paciente toleró adecuadamente el procedimiento sin presentar arritmias, ni dolor torácico";
            break;
        }
        // } else this.global_lab103.ECOCARDIOGRAMA = this.global_lab103.ECOCARDIOGRAMA.replace(/\&/g, "\n").trim();

        // if (this.global_lab103.CONCLUSIONES.trim() == "") {
        switch (this.global_lab103.METODO) {
          case "1":
            this.global_lab103.CONCLUSIONES =
              "1. Ecostress dobutamina al 85% de la frecuencia cardiaca máxima, negativo para isquemia miocárdica.\n2. Válvula mitral descrita con insuficiencia de grado leve.\n3. Válvula tricuspidea descrita con insuficiencia de grado leve.\n4. Adecuada función sistólica del ventrículo izquierdo con disfunción diastólica tipo 1";
            break;
          case "2":
            this.global_lab103.CONCLUSIONES =
              "1. Ecostress ejercicio al 95% de la frecuencia cardiaca máxima, negativo para isquemia miocárdica\n2. Adecuada función sisto-diastólica bi-ventricular\n3. No se registran signos de hipertensión pulmonar.\n4. No se visualizan trombos, vegetaciones ni cortocircuitos";
            break;
        }
        // } else this.global_lab103.CONCLUSIONES = this.global_lab103.CONCLUSIONES.replace(/\&/g, "\n").trim();
      } else {
        this.global_lab103.ECOCARDIOGRAMA_TT = this.global_lab103.ECOCARDIOGRAMA_TT.replace(/\&/g, "\n").trim();
        this.global_lab103.ECOCARDIOGRAMA = this.global_lab103.ECOCARDIOGRAMA.replace(/\&/g, "\n").trim();
        this.global_lab103.CONCLUSIONES = this.global_lab103.CONCLUSIONES.replace(/\&/g, "\n").trim();
      }

      loader("hide");
      this.validarMedico();
    },
    ventanaMedico() {
      var _this = this;

      var validos = [];

      this.profesionales_lab103.forEach((item) => {
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
        titulo: "Ventana profesionales válidos y activos",
        columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO"],
        data: validos,
        ancho: "70%",
        callback_esc: function () {
          document.getElementById("medico_lab103").focus();
        },
        callback: function (data) {
          _this.global_lab103.ID_MEDICO = data.IDENTIFICACION.trim();
          setTimeout(() => _enterInput("#medico_lab103"), 100);
        },
      });
    },
    validarMedico() {
      validarInputs(
        {
          form: "#validarMedico_lab103",
          orden: "1",
        },
        () => {
          if (this.global_lab103.CUP == "881210") this.seleccionMetodo();
          else CON851P("03", this.validarMedico, this.salir_lab103);
        },
        () => {
          this.global_lab103.ID_MEDICO = this.global_lab103.ID_MEDICO.trim();

          var medico = this.profesionales_lab103.find((x) => x.IDENTIFICACION.trim() == this.global_lab103.ID_MEDICO);

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
              case "381":
                esp = true;
                break;
            }

            if (ati && esp) {
              this.global_lab103.REG_MEDICO = medico.REG_MEDICO;
              this.global_lab103.NOMBRE_MEDICO = medico.NOMBRE;
              this.validarQuienRefiere();
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
    validarQuienRefiere() {
      validarInputs(
        {
          form: "#validarQuienRefiere",
          orden: "1",
        },
        () => this.validarMedico(),
        () => {
          this.global_lab103.QUIEN_REFIERE = this.global_lab103.QUIEN_REFIERE.replaceEsp();
          this.validarDiagnostico();
        }
      );
    },
    ventanaDiagnostico() {
      let _this = this;

      _ventanaDatos({
        titulo: "Ventana enfermedades",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: this.enfermedades_lab103,
        ancho: "70%",
        callback_esc: function () {
          document.getElementById("validarCodDiag_lab103").focus();
        },
        callback: function (data) {
          _this.global_lab103.DIAGNOS = data.COD_ENF.trim();
          setTimeout(() => _enterInput("#validarCodDiag_lab103"), 100);
        },
      });
    },
    validarDiagnostico() {
      validarInputs(
        {
          form: "#validarDiag_lab103",
          orden: "1",
        },
        () => this.validarQuienRefiere(),
        () => {
          this.global_lab103.DIAGNOS = this.global_lab103.DIAGNOS.trim().toUpperCase();

          if (this.global_lab103.DIAGNOS.trim() == "") {
            this.global_lab103.DESCRIP_DIAGNOS = "No seleccionado";
            this.validarMedicacion();
          } else {
            var busqueda = this.enfermedades_lab103.find((x) => x.COD_ENF.trim() == this.global_lab103.DIAGNOS);

            if (busqueda) {
              this.global_lab103.DESCRIP_DIAGNOS = busqueda.NOMBRE_ENF.trim();
              this.validarMedicacion();
            } else {
              CON851("01", "01", null, "error", "Error");
              this.validarDiagnostico();
            }
          }
        }
      );
    },
    validarMedicacion() {
      validarInputs(
        {
          form: "#validarMedicacion",
          orden: "1",
        },
        () => this.validarDiagnostico(),
        () => {
          this.global_lab103.MEDICACION = this.global_lab103.MEDICACION.replaceEsp();

          this.validarRaizAortica();
        }
      );
    },
    validarRaizAortica() {
      validarInputs(
        {
          form: "#validarRaizAortica",
          orden: "1",
        },
        () => this.validarMedicacion(),
        () => {
          this.global_lab103.RAIZ_AORTICA = this.mascara.resolve(this.global_lab103.RAIZ_AORTICA.trim());

          this.validarAuriculaIzquierda();
        }
      );
    },
    validarAuriculaIzquierda() {
      validarInputs(
        {
          form: "#validarAuriculaIzquierda",
          orden: "1",
        },
        () => this.validarRaizAortica(),
        () => {
          this.global_lab103.AURICULA_IZQ = this.mascara.resolve(this.global_lab103.AURICULA_IZQ.trim());

          this.validarVentIzqDiast();
        }
      );
    },
    validarVentIzqDiast() {
      validarInputs(
        {
          form: "#validarVentIzqDiast",
          orden: "1",
        },
        () => this.validarAuriculaIzquierda(),
        () => {
          this.global_lab103.VENT_IZQ_DIAS = this.mascara.resolve(this.global_lab103.VENT_IZQ_DIAS.trim());

          this.validarVentIzqSist();
        }
      );
    },
    validarVentIzqSist() {
      validarInputs(
        {
          form: "#validarVentIzqSist",
          orden: "1",
        },
        () => this.validarVentIzqDiast(),
        () => {
          this.global_lab103.VENT_IZQ_SIS = this.mascara.resolve(this.global_lab103.VENT_IZQ_SIS.trim());

          this.validarSeptum();
        }
      );
    },
    validarSeptum() {
      validarInputs(
        {
          form: "#validarSeptum",
          orden: "1",
        },
        () => this.validarVentIzqSist(),
        () => {
          this.global_lab103.SEPTUM = this.mascara.resolve(this.global_lab103.SEPTUM.trim());

          this.validarParedPosterior();
        }
      );
    },
    validarParedPosterior() {
      validarInputs(
        {
          form: "#validarParedPosterior",
          orden: "1",
        },
        () => this.validarSeptum(),
        () => {
          this.global_lab103.PARED_POST = this.mascara.resolve(this.global_lab103.PARED_POST.trim());

          this.validarVentDerecho();
        }
      );
    },
    validarVentDerecho() {
      validarInputs(
        {
          form: "#validarVentDerecho",
          orden: "1",
        },
        () => this.validarParedPosterior(),
        () => {
          this.global_lab103.VENT_DER = this.mascara.resolve(this.global_lab103.VENT_DER.trim());

          this.validarFraccEyecc();
        }
      );
    },
    validarFraccEyecc() {
      validarInputs(
        {
          form: "#validarFraccEyecc",
          orden: "1",
        },
        () => this.validarVentDerecho(),
        () => this.validarEkgReposo()
      );
    },
    validarEkgReposo() {
      validarInputs(
        {
          form: "#validarEkgReposo",
          orden: "1",
        },
        () => this.validarFraccEyecc(),
        () => {
          this.global_lab103.EKG_REPOSO = this.global_lab103.EKG_REPOSO.replaceEsp();

          this.validarEcocardiogramaReposo();
        }
      );
    },
    validarEcocardiogramaReposo() {
      validarInputs(
        {
          form: "#validarEcocardiogramaReposo",
          orden: "1",
        },
        () => this.validarEkgReposo(),
        () => {
          this.global_lab103.ECOCARDIOGRAMA_TT = this.global_lab103.ECOCARDIOGRAMA_TT.replaceEsp();
          $("#focoTabalaTobu").get(0).scrollIntoView({ behavior: "smooth", block: "center" });
          this.validarTablaFC(0);
        }
      );
    },
    validarTablaFC(pos) {
      validarInputs(
        {
          form: "#validarFC_" + pos + "_LAB103",
          orden: "1",
          event_f3: () => this.validarEkgPosterior(),
          event_flecha_arriba: () => {
            if (pos != 0) this.validarTablaFC(pos - 1);
            else this.validarTablaFC(pos);
          },
          event_flecha_abajo: () => {
            if (pos != 5) this.validarTablaFC(pos + 1);
            else this.validarTablaFC(pos);
          },
        },
        () => {
          if (pos == 0) this.validarEcocardiogramaReposo();
          else this.validarTablaDiast(pos - 1);
        },
        () => {
          this.global_lab103.TABLA_DOBU[pos].FC = isNaN(parseInt(this.global_lab103.TABLA_DOBU[pos].FC))
            ? ""
            : this.global_lab103.TABLA_DOBU[pos].FC.toString();

          this.validarTablaSist(pos);
        }
      );
    },
    validarTablaSist(pos) {
      validarInputs(
        {
          form: "#validarTASIS_" + pos + "_LAB103",
          orden: "1",
          event_f3: () => this.validarEkgPosterior(),
          event_flecha_arriba: () => {
            if (pos != 0) this.validarTablaSist(pos - 1);
            else this.validarTablaSist(pos);
          },
          event_flecha_abajo: () => {
            if (pos != 5) this.validarTablaSist(pos + 1);
            else this.validarTablaSist(pos);
          },
        },
        () => this.validarTablaFC(pos),
        () => {
          this.global_lab103.TABLA_DOBU[pos].TA_SIS = isNaN(parseInt(this.global_lab103.TABLA_DOBU[pos].TA_SIS))
            ? ""
            : this.global_lab103.TABLA_DOBU[pos].TA_SIS.toString();

          this.validarTablaDiast(pos);
        }
      );
    },
    validarTablaDiast(pos) {
      validarInputs(
        {
          form: "#validarTADIAS_" + pos + "_LAB103",
          orden: "1",
          event_f3: () => this.validarEkgPosterior(),
          event_flecha_arriba: () => {
            if (pos != 0) this.validarTablaDiast(pos - 1);
            else this.validarTablaDiast(pos);
          },
          event_flecha_abajo: () => {
            if (pos != 5) this.validarTablaDiast(pos + 1);
            else this.validarTablaDiast(pos);
          },
        },
        () => this.validarTablaSist(pos),
        () => {
          this.global_lab103.TABLA_DOBU[pos].TA_DIAS = isNaN(parseInt(this.global_lab103.TABLA_DOBU[pos].TA_DIAS))
            ? ""
            : this.global_lab103.TABLA_DOBU[pos].TA_DIAS.toString();

          if (pos == 5) this.validarEkgPosterior();
          else this.validarTablaFC(pos + 1);
        }
      );
    },
    validarEkgPosterior() {
      validarInputs(
        {
          form: "#validarEkgPost_lab103",
          orden: "1",
        },
        () => this.validarTablaFC(0),
        () => {
          this.global_lab103.EKG = this.global_lab103.EKG.replaceEsp();

          this.validarEcocardiogramaPosterior();
        }
      );
    },
    validarEcocardiogramaPosterior() {
      validarInputs(
        {
          form: "#validarEcocardiogramaPost_lab103",
          orden: "1",
        },
        () => this.validarEkgPosterior(),
        () => {
          this.global_lab103.ECOCARDIOGRAMA = this.global_lab103.ECOCARDIOGRAMA.replaceEsp();

          this.validarConclusiones();
        }
      );
    },
    validarConclusiones() {
      validarInputs(
        {
          form: "#validarConclusiones_lab103",
          orden: "1",
        },
        () => this.validarEcocardiogramaPosterior(),
        () => {
          this.global_lab103.CONCLUSIONES = this.global_lab103.CONCLUSIONES.replaceEsp();

          CON851P(
            "Adjuntar archivos?",
            () => {
              setTimeout(CON851P("01", this.validarConclusiones, this._grabardatos_lab103), 300);
            },
            this.ventanaAdjuntarArchivos
          );
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
        '<button id="salir_lab103" class="col-md-12 btn" type="button" style="color: white; background-color: #da2c2c; border-color: #da2c2c">Salir</button>' +
        "</div>" +
        '<div class="col-md-5">' +
        '<label class="col-md-12 btn btn-default btn-file">' +
        '<input type="file" multiple id="archivos_lab103" accept=".dcm, application/pdf,image/jpeg,image/png,image/jpg,video/mpeg,video/mp4,video/x-ms-wmv,application/dicom,image/dicom"/>' +
        "</label>" +
        "</div>" +
        '<div class="col-md-2">' +
        '<button id="enviarArchivos_lab103" class="col-md-12 btn btn-primary" type="button">Adjuntar</button>' +
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
        document.getElementById("salir_lab103").onclick = () => {
          $('[data-bb-handler="main"]').click();
          $_this.validarConclusiones();
        };
        document.getElementById("enviarArchivos_lab103").onclick = () => $_this.enviarArchivos_lab103();
      });
    },
    enviarArchivos_lab103() {
      var el = document.getElementById("archivos_lab103");
      var archivos = el.files;

      if (archivos.length < 1) {
        CON851("", "No se han escogido archivos", null, "warning", "Advertencia");
      } else {
        loader("show");
        var nombreArch =
          this.global_lab103.SUC +
          this.global_lab103.CL +
          this.global_lab103.COMPROB +
          this.global_lab103.CUP +
          this.global_lab103.ITEM;

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
                $_this.global_lab103.ADJUNTOS[i] = data.msj.correcto[i];
              }
              $('[data-bb-handler="main"]').click();
              console.log("Archivos error:", data.msj.error);
              setTimeout($_this._grabardatos_lab103, 500);
            } else {
              CON851("", "Ha ocurrido un error subiendo archivos", null, "error", "Error");
              console.error("Ha ocurrido un error:", data.msj);
              $('[data-bb-handler="main"]').click();
              $_This.validarConclusiones();
            }
          });
      }
    },
    _grabardatos_lab103() {
      var _this = this;
      loader("show");

      var datos_envio_lab103 = datosEnvio();
      datos_envio_lab103 += this.global_lab103.LLAVE;
      datos_envio_lab103 += "|";
      datos_envio_lab103 += cerosIzq(this.global_lab103.ID_MEDICO, 10);
      datos_envio_lab103 += "|";
      datos_envio_lab103 += this.global_lab103.QUIEN_REFIERE;
      datos_envio_lab103 += "|";
      datos_envio_lab103 += this.global_lab103.EKG_REPOSO;
      datos_envio_lab103 += "|";
      datos_envio_lab103 += this.global_lab103.EKG;
      datos_envio_lab103 += "|";
      datos_envio_lab103 += this.global_lab103.DIAGNOS;
      datos_envio_lab103 += "|";
      datos_envio_lab103 += this.global_lab103.DESCRIP_DIAGNOS;
      datos_envio_lab103 += "|";
      datos_envio_lab103 += this.global_lab103.METODO;
      datos_envio_lab103 += "|";
      datos_envio_lab103 += moment().format("YYYYMMDD");
      datos_envio_lab103 += "|";
      datos_envio_lab103 += moment().format("HHmm");
      datos_envio_lab103 += "|";
      datos_envio_lab103 += localStorage.Usuario;
      datos_envio_lab103 += "|";

      let medidas = this.global_lab103.RAIZ_AORTICA;
      medidas += "|";
      medidas += this.global_lab103.AURICULA_IZQ;
      medidas += "|";
      medidas += this.global_lab103.VENT_IZQ_DIAS;
      medidas += "|";
      medidas += this.global_lab103.VENT_IZQ_SIS;
      medidas += "|";
      medidas += this.global_lab103.SEPTUM;
      medidas += "|";
      medidas += this.global_lab103.PARED_POST;
      medidas += "|";
      medidas += this.global_lab103.VENT_DER;
      medidas += "|";
      medidas += this.global_lab103.FRACC_EYECC;
      medidas += "|";

      let eco_reposo = this.global_lab103.ECOCARDIOGRAMA_TT.enterReplace();
      let lineas_reposo = eco_reposo.strToTable("ECO_REP");

      let eco_posterior = this.global_lab103.ECOCARDIOGRAMA.enterReplace();
      let lineas_posterior = eco_posterior.strToTable("ECO_POS");

      let conclusiones = this.global_lab103.CONCLUSIONES.enterReplace();
      let lineas_conc = conclusiones.strToTable("CON");

      var archivos = "";
      this.global_lab103.ADJUNTOS.forEach(function (item, i) {
        archivos += espaciosDer(item, 30);
        archivos += "|";
      });

      var data = {
        datosh: datos_envio_lab103,
        adjuntos: archivos,
        medidas,
        medicacion: this.global_lab103.MEDICACION.enterReplace(),
        ...lineas_reposo,
        ...lineas_posterior,
        ...lineas_conc,
      };

      this.global_lab103.TABLA_DOBU.forEach(function (item, i) {
        console.log(item);
        var posicion = i + 1;

        var datos_tabla = item.FC;
        datos_tabla += "|";
        datos_tabla += item.TA_SIS;
        datos_tabla += "|";
        datos_tabla += item.TA_DIAS;
        datos_tabla += "|";

        data["TAB-" + posicion.toString().padStart(3, "0")] = datos_tabla;
      });

      console.log(data);
      postData(data, get_url("APP/LAB/LAB103_NEW.DLL"))
        .then((llegada) => {
          loader("hide");
          CON851("", "Resultado guardado correctamente!", null, "success", "Exitoso");
          setTimeout(_this.preguntaImprimir_lab103, 300);
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", err, null, "error", "Error");
          _this.salir_lab103();
        });
    },
    preguntaImprimir_lab103() {
      CON851P(
        "00",
        () => this.salir_lab103(),
        () => {
          this._envioImpresion();
        }
      );
    },
    async _envioImpresion() {
      _this = this;
      loader("show");

      if (parseInt(LLAVE_RXLAB_GLOBAL.ITEM) > 1) {
        var item = cerosIzq(LLAVE_RXLAB_GLOBAL.ITEM, 2);
        this.global_lab103.NOMBREPDF = "LAB-" + this.global_lab103.LLAVE.substring(0, 9) + "-" + item;
      } else {
        this.global_lab103.NOMBREPDF = "LAB-" + this.global_lab103.LLAVE.substring(0, 9);
      }

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
            content: await _imprimirLab103_v2(data_resultado),
          })
            .then((llegada) => {
              _this.salir_lab103();
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
    aperturaAdjunto_lab103(item) {
      var ruta = "D:\\WEB\\ADJUNTOS\\";

      child("start " + ruta + item, (error, data) => {
        console.log(error, data);
      });
    },
    salir_lab103() {
      _inputControl("reset");
      _inputControl("disabled");
      let Window = BrowserWindow.getAllWindows();
      if (Window.length == 1) {
        $(".page-breadcrumb")[1].remove();
      }
      this.CONSULTA = false;
      busquedaEstudios_RXLAB("PACIENTE", LLAVE_RXLAB_GLOBAL.ID_PACIENTE);
    },
  },
});
