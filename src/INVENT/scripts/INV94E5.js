new Vue({
  el: "#INV94E5",
  data: {
    fecha_act: _getObjDate(moment().format("YYYYMMDD")),
    fecha_ini: _getObjDate(),
    fecha_fin: _getObjDate(),
    tipo_nota: "",

    opc_listado: [
      {COD: "1", DESCRIP: "NOTAS DEBITO"},
      {COD: "2", DESCRIP: "NOTAS CREDITO"}
    ]
  },
  computed: {
    descripTipoNota() {
      let nota = this.opc_listado.find(el => el.COD == this.tipo_nota);
      return nota ? nota.DESCRIP : "";
    }
  },
  created() {
    _vm = this;
    nombreOpcion("9-4-E-5 - Listado Notas");
    this.datoTipoNota();
  },
  methods: {
    datoTipoNota() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "GENERAR LISTADO",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.opc_listado,
            seleccion: this.tipo_nota || "1",
            callback_f: () => CON851P("03", this.datoTipoNota, _toggleNav),
          },
          (data) => {
            this.tipo_nota = data.COD;
            this.datoAnioIni();
          }
        );
      }, 100)
    },
    datoAnioIni() {
      validarInputs(
        { form: "#datoAnioIni" },
        () => {
          this.datoTipoNota()
        },
        () => {
          let anio = parseInt((this.fecha_ini.anio = this.fecha_ini.anio.padEnd(4, "0")));

          if (anio <= 0) {
            CON851("37", "37", null, "warning", "");
            this.datoAnioIni();
          } else {
            this.datoMesIni();
          }
        }
      );
    },
    datoMesIni() {
      validarInputs(
        { form: "#datoMesIni" },
        () => {
          this.datoAnioIni();
        },
        () => {
          let mes = parseInt((this.fecha_ini.mes = this.fecha_ini.mes.padStart(2, "0")));

          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "warning", "");
            this.datoMesIni();
          } else {
            this.datoDiaIni();
          }
        }
      );
    },
    datoDiaIni() {
      validarInputs(
        { form: "#datoDiaIni" },
        () => {
          this.datoMesIni();
        },
        () => {
          let dia = parseInt((this.fecha_ini.dia = this.fecha_ini.dia.padStart(2, "0")));

          if (
            dia < 1 ||
            dia > 31 ||
            !_validarFecha(...Object.values(this.fecha_ini)) ||
            _getStrDate(this.fecha_ini) > parseInt(_getStrDate(this.fecha_act))
          ) {
            CON851("37", "37", null, "warning", "");
            this.datoAnioIni();
          } else {
            this.datoAnioFin();
          }
        }
      );
    },
    datoAnioFin() {
      validarInputs(
        { form: "#datoAnioFin" },
        () => {
          this.datoDiaIni()
        },
        () => {
          let anio = parseInt((this.fecha_fin.anio = this.fecha_fin.anio.padEnd(4, "0")));

          if (anio <= 0) {
            CON851("37", "37", null, "warning", "");
            this.datoAnioFin();
          } else {
            this.datoMesFin();
          }
        }
      );
    },
    datoMesFin() {
      validarInputs(
        { form: "#datoMesFin" },
        () => {
          this.datoAnioFin();
        },
        () => {
          let mes = parseInt((this.fecha_fin.mes = this.fecha_fin.mes.padStart(2, "0")));

          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "warning", "");
            this.datoMesFin();
          } else {
            this.datoDiaFin();
          }
        }
      );
    },
    datoDiaFin() {
      validarInputs(
        { form: "#datoDiaFin" },
        () => {
          this.datoMesFin();
        },
        () => {
          let dia = parseInt((this.fecha_fin.dia = this.fecha_fin.dia.padStart(2, "0")));

          if (
            dia < 1 ||
            dia > 31 ||
            !_validarFecha(...Object.values(this.fecha_fin)) ||
            _getStrDate(this.fecha_fin) < parseInt(_getStrDate(this.fecha_ini)) ||
            _getStrDate(this.fecha_fin) > parseInt(_getStrDate(this.fecha_act)) 
          ) {
            CON851("37", "37", null, "warning", "");
            this.datoAnioFin();
          } else {
            this.getDatosListado()
          }
        }
      );
    },
    getDatosListado() {
      loader("show");
      postData({
        datosh: datosEnvio(),
        fecha_inicial: _getStrDate(this.fecha_ini),
        fecha_final: _getStrDate(this.fecha_fin),
        tipo: this.tipo_nota
      }, get_url("APP/INVENT/INV94E5.DLL"))
      .then(data => {
        loader("hide")
        if (data.GET_NOTAS.length) {
          this.impresion(data.GET_NOTAS);
        } else {
          CON851("08", "08", null, "warning", "");
          this.datoDiaFin();
        }
      })
      .catch(err => {
        loader("hide")
        console.log("Error consultando datos litado", err);
        CON851("", "Error consultando datos litado", null, "error", "");
        this.datoDiaFin();
      })
    },
    impresion(datos) {
      _impresion2({
        tipo: "csv",
        datos: datos,
        columnas: false,
      })
        .then(() => {
          CON851("", "Listado generado correctamente", null, "success", "");
          _toggleNav()
        })
        .catch((err) => {
          CON851("", "Error generando impresión", null, "error", "");
          this.datoDiaFin()
        });
    }
  },
});
