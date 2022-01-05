// 09/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER104",
  data: {
    SER104: [],
    form: {
      novedad_SER104: "",
      codtarifa_SER104: "",
      descriptarifa_SER104: "",
      codtartabla_SER104: "",
      descriptartabla_SER104: "",
      numerotabla_SER104: 1,
      grp_SER104: 1,
      vlrmedic_SER104: "",
      informacion_SER104: ""
    },
    tablatarifas_SER104: [],
    tablaext_SER104: [],
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,3,1 - Actualizacion convenios de tarifas");
    $_this = this;
    $_this.SER104.TARIFASCOMPLETO = []
    $_this.SER104.TARIFASCOMPLETO.TABLA_TAB = []
    $_this.SER104.TARIFASCOMPLETO.TABLA_TAR = []
    $_this.SER104.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER104.ANO_LNK = $_this.SER104.FECHA_LNK.substring(0, 2);
    $_this.SER104.MES_LNK = $_this.SER104.FECHA_LNK.substring(2, 4);
    $_this.SER104.DIA_LNK = $_this.SER104.FECHA_LNK.substring(4, 6);
    $_this.SER104.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SER104.ANOACTUAL = $_this.SER104.FECHAACTUAL.substring(0, 4)
    $_this.SER104.MESACTUAL = $_this.SER104.FECHAACTUAL.substring(4, 6)
    $_this.SER104.DIAACTUAL = $_this.SER104.FECHAACTUAL.substring(6, 8)
    if ($_USUA_GLOBAL[0].NIT == 800156469) {
      $('#OTRONIT').removeClass('hidden');
    } else {
      $('#NITVALIDACION').removeClass('hidden');
    }
    obtenerDatosCompletos({
      nombreFd: "TARIFAS",
    },
      function (data) {
        $_this.SER104.CONVENIO = data.TARIFAS;
        $_this.SER104.CONVENIO.pop();
        loader("hide");
        CON850($_this._validarnovedad_SER104);
        obtenerDatosCompletos({
          nombreFd: "GRUPOTAR",
        },
          function (data) {
            $_this.SER104.TARIFAS = data.NOMTAR;
            $_this.SER104.TARIFAS.pop();
          },
        );
      },
    );
  },
  methods: {
    _validarnovedad_SER104(novedad) {
      this.form.novedad_SER104 = novedad.id;
      if (this.form.novedad_SER104 == "F") {
        _toggleNav();
      } else {
        let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
        this.form.novedad_SER104 = this.form.novedad_SER104 + " - " + novedad[this.form.novedad_SER104];
        this._evaluarcodtarifa_SER104()
      }
    },
    _evaluarcodtarifa_SER104() {
      this.form.descriptarifa_SER104 = ''
      medicpos_SER104Mask.typedValue = ''
      medicnopos_SER104Mask.typedValue = ''
      medicmat_SER104Mask.typedValue = ''
      medicotros_SER104Mask.typedValue = ''
      this.form.vlrmedic_SER104 = ''
      nroacuerdoMask_SER104.typedValue = ''
      salario_SER104Mask.typedValue = ''
      this.tablatarifas_SER104 = [],
        this.tablaext_SER104 = [],
        validarInputs(
          {
            form: "#VALIDARTARIFA_SER104",
            orden: "1",
          },
          () => {
            setTimeout(CON850(this._validarnovedad_SER104), 500)
          },
          () => {
            this.form.codtarifa_SER104 = this.form.codtarifa_SER104.toUpperCase();
            if (this.form.codtarifa_SER104.trim() == "") {
              CON851("02", "02", this._evaluarcodtarifa_SER104(), "error", "error");
            } else {
              let URL = get_url("APP/SALUD/SAL401.DLL");
              postData({
                datosh: datosEnvio() + '2| |' + this.form.codtarifa_SER104 + "|",
              }, URL)
                .then(data => {
                  this.SER104.TARIFASCOMPLETO = data.TARIFA[0];
                  this.form.descriptarifa_SER104 = this.SER104.TARIFASCOMPLETO.DESCRIP.trim();
                  medicpos_SER104Mask.typedValue = this.SER104.TARIFASCOMPLETO.PORC_PO.trim()
                  medicnopos_SER104Mask.typedValue = this.SER104.TARIFASCOMPLETO.PORC_NP.trim()
                  medicmat_SER104Mask.typedValue = this.SER104.TARIFASCOMPLETO.PORC_MO.trim()
                  medicotros_SER104Mask.typedValue = this.SER104.TARIFASCOMPLETO.PORC_MQ.trim()
                  let base = { '1': 'BASE COSTO PROM', '2': 'BASE ULT COMPR', '3': 'BASE PRECIO VTA', '4': 'BASE VLR REFER' };
                  this.form.vlrmedic_SER104 = this.SER104.TARIFASCOMPLETO.BASE_MED + ' - ' + base[this.SER104.TARIFASCOMPLETO.BASE_MED]
                  nroacuerdoMask_SER104.typedValue = this.SER104.TARIFASCOMPLETO.ACUERDO.trim()
                  salario_SER104Mask.typedValue = this.SER104.TARIFASCOMPLETO.SAL_MIN.trim();
                  this.tablatarifas_SER104 = this.SER104.TARIFASCOMPLETO.TABLA_TAB
                  this.tablaext_SER104 = this.SER104.TARIFASCOMPLETO.TABLA_TAR
                  if (this.form.novedad_SER104.substring(0, 1) == '7') {
                    CON851("00", "00", this._evaluarcodtarifa_SER104(), "error", "Error");
                  } else if (this.form.novedad_SER104.substring(0, 1) == '8') {
                    this._evaluardescriptar_SER104()
                  } else if (this.form.novedad_SER104.substring(0, 1) == '9') {
                    CON851P("02", this._evaluarcodtarifa_SER104, this._evaluareliminar_SER104);
                  }
                })
                .catch(error => {
                  if (error.MENSAJE == "01" && this.form.novedad_SER104.substring(0, 1) == '7') {
                    this._evaluardescriptar_SER104()
                  } else if (error.MENSAJE == "01" && this.form.novedad_SER104.substring(0, 1) == '8') {
                    this._evaluarcodtarifa_SER104()
                  } else if (error.MENSAJE == "01" && this.form.novedad_SER104.substring(0, 1) == '9') {
                    this._evaluarcodtarifa_SER104()
                  }
                });
            }
          },
        );
    },
    _evaluardescriptar_SER104() {
      validarInputs(
        {
          form: "#VALIDARDESCRIP_SER104",
          orden: "1",

        },
        this._evaluarcodtarifa_SER104,
        () => {
          this.form.descriptarifa_SER104 = this.form.descriptarifa_SER104.toUpperCase();
          if (this.form.descriptarifa_SER104.trim() == '') {
            CON851("", "Descripcion requerida!", this._evaluardescriptar_SER104(), "error", "Error");
          } else {
            this._evaluarnombretarifastabla_SER104()
          }
        },
      );
    },
    _evaluaritemtablatar_SER104() {
      validarInputs(
        {
          form: "#IDTABLA_SER104",
          orden: "1",

        },
        this._evaluarcodtarifa_SER104,
        () => {
          if (this.form.numerotabla_SER104 > 6) {
            CON851("", "item no permitido", null, "error", "Error");
            this._evaluarbasemedic_SER104()
          }
          if (this.form.numerotabla_SER104 <= this.tablatarifas_SER104.length) {
            this.form.codtartabla_SER104 = this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].CODTABTAR
            this.form.descriptartabla_SER104 = this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].DESCRIPTAR
            porcentaje_SER104Mask.typedValue = this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].PORCTABTAR
            this._evaluarnombretarifastabla_SER104()
          } else {
            this._evaluarnombretarifastabla_SER104()
          }
        },
      );
    },
    _evaluarnombretarifastabla_SER104() {
      if (this.form.numerotabla_SER104 <= this.tablatarifas_SER104.length) {
        this.form.codtartabla_SER104 = this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].CODTABTAR;
        this.form.descriptartabla_SER104 = this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].DESCRIPTAR;
        porcentaje_SER104Mask.typedValue = this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].PORCTABTAR
      } else {
        this.form.codtartabla_SER104 = ''
        this.form.descriptartabla_SER104 = ''
        porcentaje_SER104Mask.typedValue = ''
      }
      this._evaluarcodtarifatabla_SER104()
    },
    _evaluarcodtarifatabla_SER104() {
      let parametros = {
        estado: 'on',
        msg: [{
          mensaje: 'Esc para buscar por item tabla'
        }, {
          mensaje: 'Oprimar F9 -Importar datos de otro convenio'
        },
        {
          mensaje: 'Oprimar F7 -Oprima para Editar tabla'
        }
        ]
      }
      _FloatText(parametros);
      validarInputs(
        {
          form: "#VALIDARTARTABLA_SER104",
          orden: "1",
          event_f7: this._validartablatarifas_SER104,
          event_f9: this._ventanaimportconv_SER104
        },
        this._evaluaritemtablatar_SER104,
        () => {
          this.form.codtartabla_SER104 = this.form.codtartabla_SER104.toUpperCase();
          if (this.form.codtartabla_SER104.trim() == '') {
            this.form.descriptartabla_SER104 = ''
            porcentaje_SER104Mask.typedValue = 0
            this.SER104.PORCTABTAR = porcentaje_SER104Mask.value
            if (this.form.numerotabla_SER104 > 0) {
              this._ingresartablatarifas_SER104()
            } else {
              CON851("02", "02", this._evaluarnombretarifastabla_SER104(), "error", "error");
            }
          } else {
            let res = this.SER104.TARIFAS.find(e => e.COD == this.form.codtartabla_SER104);
            if (res == undefined) {
              CON851("01", "01", this._evaluarnombretarifastabla_SER104(), "error", "error");
            } else {
              this.form.descriptartabla_SER104 = res.DESCRIP;
              let URL = get_url("APP/SALUD/SER104.DLL");
              postData({ datosh: datosEnvio() + '1|' + this.form.codtartabla_SER104 }, URL)
                .then(data => {
                  this._evaluarporcentaje_SER104()
                })
                .catch(err => {
                  console.log(err);
                  this._evaluarnombretarifastabla_SER104()
                })
            }
          }
        },
      );
    },
    _evaluarporcentaje_SER104() {
      _FloatText({ estado: 'off' })
      this.SER104.SW = ''
      validarInputs(
        {
          form: "#VALIDARPORCENT_SER104",
          orden: "1",
        },
        this._evaluarnombretarifastabla_SER104,
        () => {
          this.SER104.PORCTABTAR = porcentaje_SER104Mask.value.replace(',', '');
          if (this.SER104.PORCTABTAR < 5 || this.SER104.PORCTABTAR > 190) {
            this._evaluarporcentaje_SER104()
          } else {
            if (this.form.numerotabla_SER104 == 6) {
              this._evaluarbasemedic_SER104()
            } else {
              this._ingresartablatarifas_SER104()
            }
          }
        },
      );
    },
    _ingresartablatarifas_SER104() {
      if (this.form.numerotabla_SER104 <= this.tablatarifas_SER104.length) {
        this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].CODTABTAR = this.form.codtartabla_SER104;
        this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].DESCRIPTAR = this.form.descriptartabla_SER104;
        this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].PORCTABTAR = this.SER104.PORCTABTAR;
      } else {
        this.tablatarifas_SER104.push({
          CODTABTAR: this.form.codtartabla_SER104,
          DESCRIPTAR: this.form.descriptartabla_SER104,
          PORCTABTAR: this.SER104.PORCTABTAR,
        });
      }
      if (this.form.codtartabla_SER104.trim() == '') {
        if (this.form.numerotabla_SER104 == 6) {
          this.form.codtartabla_SER104 = ''
          this.form.descriptartabla_SER104 = ''
          porcentaje_SER104Mask.typedValue = ''
          this.SER104.PORCTABTAR = porcentaje_SER104Mask.value
          this.form.numerotabla_SER104 = ''
          this._evaluarbasemedic_SER104()
        } else {
          this.form.numerotabla_SER104++
          this._evaluaritemtablatar_SER104()
        }
      } else {
        this._validacioncontinuar_SER104()
      }
    },
    _validacioncontinuar_SER104() {
      let URL = get_url("APP/SALUD/SER104.DLL");
      postData({ datosh: datosEnvio() + '2|' + this.form.codtartabla_SER104 }, URL)
        .then(data => {
          this.SER104.TABLACIRUGIA = data.TABLACIRUGIA[0]
          // this.DESCRIPTARIFASTAB = this.SER104.TABLACIRUGIA.DESCRIP
          this.SER104.FORMALIQTAB = this.SER104.TABLACIRUGIA.FORMALIQTAB
          // if (this.DESCRIPTARIFASTAB != '') {
          //   $('#VALIDARINF').removeClass('hidden');
          //   this.form.informacion_SER104 = this.DESCRIPTARIFASTAB
          // }
          if (this.form.numerotabla_SER104 - 1 == 0) {
            this.form.grp_SER104 = 1
            this._evaluartablacirugia_SER104()
          } else {
            if (this.form.numerotabla_SER104 == 6) {
              this.form.codtartabla_SER104 = ''
              this.form.descriptartabla_SER104 = ''
              porcentaje_SER104Mask.typedValue = ''
              this.SER104.PORCTABTAR = porcentaje_SER104Mask.value
              this.form.numerotabla_SER104 = ''
              this._evaluarbasemedic_SER104()
            } else {
              this.form.numerotabla_SER104++
              this._evaluarnombretarifastabla_SER104()
            }
          }
        })
        .catch(err => {
          console.error(err);
          this._evaluarporcentaje_SER104()
        })
    },
    _evaluartablacirugia_SER104() {
      switch (this.SER104.FORMALIQTAB) {
        case '1':
          this.SER104.MENSAJE = 'Valor U.V.R.'
          $('#VALIDARINF').removeClass('hidden');
          this.form.informacion_SER104 = this.SER104.MENSAJE
        case '2':
          this.SER104.MENSAJE = 'Valor por cada grupo'
          $('#VALIDARINF').removeClass('hidden');
          this.form.informacion_SER104 = this.SER104.MENSAJE
          this._ubicardatotabla_SER104()
          break;
        case '3':
          this.SER104.MENSAJE = '% de participacion por servicio'
          $('#VALIDARINF').removeClass('hidden');
          this.form.informacion_SER104 = this.SER104.MENSAJE
          this._inicializartablacirugia_SER104()
          setTimeout(this._ubicardatotabla_SER104, 500)
          break;
        case '0':
          this._ubicardatotabla_SER104()
          break;
        default:
          this.SER104.MENSAJE = 'Error en tarifa de cirugia'
          $('#VALIDARINF').removeClass('hidden');
          this.form.informacion_SER104 = this.SER104.MENSAJE
          this._evaluarnombretarifastabla_SER104()
          break;
      }
    },
    _ubicardatotabla_SER104() {
      if (this.form.grp_SER104 <= this.tablaext_SER104.length) {
        console.log(this.tablaext_SER104[this.form.grp_SER104 - 1].HNQUIRTAR, 'MOSTRAR')
        quirugica_SER104Mask.typedValue = this.tablaext_SER104[this.form.grp_SER104 - 1].HNQUIRTAR.trim()
        ayudantia_SER104Mask.typedValue = this.tablaext_SER104[this.form.grp_SER104 - 1].HNAYUDTAR.trim()
        anestesia_SER104Mask.typedValue = this.tablaext_SER104[this.form.grp_SER104 - 1].HNANESTAR.trim()
        matquirurgica_SER104Mask.typedValue = this.tablaext_SER104[this.form.grp_SER104 - 1].MATQUITAR.trim()
        derechos_SER104Mask.typedValue = this.tablaext_SER104[this.form.grp_SER104 - 1].DRSALATAR.trim()
      } else {
        quirugica_SER104Mask.typedValue = ''
        ayudantia_SER104Mask.typedValue = ''
        anestesia_SER104Mask.typedValue = ''
        matquirurgica_SER104Mask.typedValue = ''
        derechos_SER104Mask.typedValue = ''
      }
      switch (this.SER104.FORMALIQTAB) {
        case '1':
          $('#DESCRIPNUEVO1_SER104').removeClass('hidden');
          $('.DESCRIPNUEVO_SER104').removeClass('hidden');
          this.tablaext_SER104[0].DESCRIPTAB = 'HASTA   20 UVR'
          this.tablaext_SER104[1].DESCRIPTAB = 'DE  21- 30 UVR'
          this.tablaext_SER104[2].DESCRIPTAB = 'DE  31- 40 UVR'
          this.tablaext_SER104[3].DESCRIPTAB = 'DE  41- 50 UVR'
          this.tablaext_SER104[4].DESCRIPTAB = 'DE  51- 60 UVR'
          this.tablaext_SER104[5].DESCRIPTAB = 'DE  61- 70 UVR'
          this.tablaext_SER104[6].DESCRIPTAB = 'DE  71- 80 UVR'
          this.tablaext_SER104[7].DESCRIPTAB = 'DE  81- 90 UVR'
          this.tablaext_SER104[8].DESCRIPTAB = 'DE  91-100 UVR'
          this.tablaext_SER104[9].DESCRIPTAB = 'DE 101-110 UVR'
          this.tablaext_SER104[10].DESCRIPTAB = 'DE 111-130 UVR'
          this.tablaext_SER104[11].DESCRIPTAB = 'DE 131-150 UVR'
          this.tablaext_SER104[12].DESCRIPTAB = 'DE 151-170 UVR'
          this.tablaext_SER104[13].DESCRIPTAB = 'DE 171-200 UVR'
          this.tablaext_SER104[14].DESCRIPTAB = 'DE 201-230 UVR'
          this.tablaext_SER104[15].DESCRIPTAB = 'DE 231-260 UVR'
          this.tablaext_SER104[16].DESCRIPTAB = 'DE 261-290 UVR'
          this.tablaext_SER104[17].DESCRIPTAB = 'DE 291-320 UVR'
          this.tablaext_SER104[18].DESCRIPTAB = 'DE 321-350 UVR'
          this.tablaext_SER104[19].DESCRIPTAB = 'DE 351-380 UVR'
          this.tablaext_SER104[20].DESCRIPTAB = 'DE 381-410 UVR'
          this.tablaext_SER104[21].DESCRIPTAB = 'DE 411-450 UVR'
          this.tablaext_SER104[22].DESCRIPTAB = ''
          this.tablaext_SER104[23].DESCRIPTAB = ''
          this.tablaext_SER104[24].DESCRIPTAB = ''
          this.tablaext_SER104[25].DESCRIPTAB = ''
          this.tablaext_SER104[26].DESCRIPTAB = ''
          this.tablaext_SER104[27].DESCRIPTAB = ''
          this.tablaext_SER104[28].DESCRIPTAB = ''
          this.tablaext_SER104[29].DESCRIPTAB = 'VALOR DE UVR'
          this._evaluarhonquirurgico_SER104()
          break;
        case '2':
          this._evaluarhonquirurgico_SER104()
          break;
        case '3':
          this._evaluarhonquirurgico_SER104()
          break;
        default:
          this._evaluarhonquirurgico_SER104()
          break;
      }
    },
    _evaluarhonquirurgico_SER104() {
      if (this.SER104.FORMALIQTAB == '1' && this.SER104.SW == '') {
        this.SER104.HONQUIRURGICO = this.tablaext_SER104[this.form.grp_SER104 - 1].HNQUIRTAR.trim()
        this.SER104.AYUDANTIA = this.tablaext_SER104[this.form.grp_SER104 - 1].HNAYUDTAR.trim()
        this.SER104.ANESTESIA = this.tablaext_SER104[this.form.grp_SER104 - 1].HNANESTAR.trim()
        if (this.form.grp_SER104 < 14) {
          this._evaluarmatquirurgica_SER104()
        } else {
          if (this.form.grp_SER104 < 23) {
            this._evaluarderechos_SER104()
          } else {
            this.form.grp_SER104 = 30
            this.SER104.SW = '1'
            this._ubicardatotabla_SER104()
          }
        }
      } else {
        _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprimar F3 - Para el final de la tabla' }, { mensaje: 'Oprimar F7 - Para Editar tabla' }] })
        validarInputs(
          {
            form: "#VALIDARQUIRURG_SER104",
            orden: "1",
            event_f7: this._validartablacirugia_SER104,
            event_f3: () => {
              if (this.form.novedad_SER104.substring(0, 1) == '8') {
                this.form.grp_SER104 = this.tablaext_SER104.length
                if (this.form.grp_SER104 <= this.tablaext_SER104.length) {
                  quirugica_SER104Mask.typedValue = this.tablaext_SER104[this.form.grp_SER104 - 1].HNQUIRTAR.trim()
                  ayudantia_SER104Mask.typedValue = this.tablaext_SER104[this.form.grp_SER104 - 1].HNAYUDTAR.trim()
                  anestesia_SER104Mask.typedValue = this.tablaext_SER104[this.form.grp_SER104 - 1].HNANESTAR.trim()
                  matquirurgica_SER104Mask.typedValue = this.tablaext_SER104[this.form.grp_SER104 - 1].MATQUITAR.trim()
                  derechos_SER104Mask.typedValue = this.tablaext_SER104[this.form.grp_SER104 - 1].DRSALATAR.trim()
                } else {
                  quirugica_SER104Mask.typedValue = ""
                  ayudantia_SER104Mask.typedValue = ""
                  anestesia_SER104Mask.typedValue = ""
                  matquirurgica_SER104Mask.typedValue = ""
                  derechos_SER104Mask.typedValue = ""
                }
              } else {
                this.form.grp_SER104 = 30
              }
              this._evaluarhonquirurgico_SER104()
            }
          },
          this._evaluarporcentaje_SER104,
          () => {
            this.SER104.HONQUIRURGICO = quirugica_SER104Mask.value.replace(',', '');
            _FloatText({ estado: 'off' })
            this._evaluarayudantia_SER104()
          },
        );
      }
    },
    _evaluarayudantia_SER104() {
      validarInputs(
        {
          form: "#VALIDARAYUDANTIA_SER104",
          orden: "1",

        },
        this._evaluarhonquirurgico_SER104,
        () => {
          this.SER104.AYUDANTIA = ayudantia_SER104Mask.value.replace(',', '');
          this._evaluaranestesia_SER104()
        },
      );
    },
    _evaluaranestesia_SER104() {
      validarInputs(
        {
          form: "#VALIDARANESTESIA_SER104",
          orden: "1",

        },
        this._evaluarayudantia_SER104,
        () => {
          this.SER104.ANESTESIA = anestesia_SER104Mask.value.replace(',', '');
          this._evaluarmatquirurgica_SER104()
        },
      );
    },
    _evaluarmatquirurgica_SER104() {
      validarInputs(
        {
          form: "#VALIDARMATQUIRURG_SER104",
          orden: "1",

        },
        this._evaluaranestesia_SER104,
        () => {
          this.SER104.MATQUIRURGICA = matquirurgica_SER104Mask.value.replace(',', '');
          this._evaluarderechos_SER104()
        },
      );
    },
    _evaluarderechos_SER104() {
      validarInputs(
        {
          form: "#VALIDARDERECHOS_SER104",
          orden: "1",

        },
        this._evaluarmatquirurgica_SER104,
        () => {
          this.SER104.DERECHOS = derechos_SER104Mask.value.replace(',', '');
          if (this.form.grp_SER104 == 30) {
            this.form.numerotabla_SER104++
            this._evaluarnombretarifastabla_SER104()

          } else {
            if (this.form.grp_SER104 <= this.tablaext_SER104.length) {
              this.tablaext_SER104[this.form.grp_SER104 - 1].HNQUIRTAR = this.SER104.HONQUIRURGICO
              this.tablaext_SER104[this.form.grp_SER104 - 1].HNAYUDTAR = this.SER104.AYUDANTIA
              this.tablaext_SER104[this.form.grp_SER104 - 1].HNANESTAR = this.SER104.ANESTESIA
              this.tablaext_SER104[this.form.grp_SER104 - 1].MATQUITAR = this.SER104.MATQUIRURGICA
              this.tablaext_SER104[this.form.grp_SER104 - 1].DRSALATAR = this.SER104.DERECHOS
            } else {
              this.tablaext_SER104.push({
                HNQUIRTAR: this.SER104.HONQUIRURGICO,
                HNAYUDTAR: this.SER104.AYUDANTIA,
                HNANESTAR: this.SER104.ANESTESIA,
                MATQUITAR: this.SER104.MATQUIRURGICA,
                DRSALATAR: this.SER104.DERECHOS,
              });
            }
            this.form.grp_SER104++
            this._ubicardatotabla_SER104()
          }
        },
      );
    },
    _evaluarbasemedic_SER104() {
      var valormedicamentos = [
        { COD: "1", DESCRIP: "Base costo prom" },
        { COD: "2", DESCRIP: "Base ult. compr" },
        { COD: "3", DESCRIP: "Base precio vta" },
        { COD: "4", DESCRIP: "Base vlr refer." },
      ];
      POPUP(
        {
          array: valormedicamentos,
          titulo: "BASE PARA CALCULAR",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: this.form.vlrmedic_SER104.substring(0, 1),
          callback_f: () => {
            this.form.numerotabla_SER104 = 6
            this.form.codtartabla_SER104 = this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].CODTABTAR;
            this.form.descriptartabla_SER104 = this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].DESCRIPTAR;
            porcentaje_SER104Mask.typedValue = this.tablatarifas_SER104[this.form.numerotabla_SER104 - 1].PORCTABTAR
            this._evaluarporcentaje_SER104();
          },
        },
        valormedicamentos => {
          this.form.vlrmedic_SER104 = valormedicamentos.COD + " - " + valormedicamentos.DESCRIP;
          this._evaluarmedicpos_SER104()
        },
      );
    },
    _evaluarmedicpos_SER104() {
      if (medicpos_SER104Mask.value == '') medicpos_SER104Mask.typedValue = 100
      validarInputs(
        {
          form: "#VALIDARMEDICPOS_SER104",
          orden: "1",

        },
        () => {
          setTimeout(this._evaluarbasemedic_SER104, 300)
        },
        () => {
          if (medicpos_SER104Mask.value < 0.50 || medicpos_SER104Mask.value > 250) {
            CON851("03", "03", this._evaluarmedicpos_SER104(), "error", "error");
          } else {
            this._evaluarmedicnopos_SER104()
          }
        },
      );
    },
    _evaluarmedicnopos_SER104() {
      if (medicnopos_SER104Mask.value == '') medicnopos_SER104Mask.typedValue = medicpos_SER104Mask.typedValue
      validarInputs(
        {
          form: "#VALIDARMEDICNOPOS_SER104",
          orden: "1",

        }, this._evaluarmedicpos_SER104,
        () => {
          if (medicnopos_SER104Mask.value < 0.50 || medicnopos_SER104Mask.value > 250) {
            CON851("03", "03", this._evaluarmedicnopos_SER104(), "error", "error");
          } else {
            this._evaluarmedicmat_SER104()
          }
        },
      );
    },
    _evaluarmedicmat_SER104() {
      if (medicmat_SER104Mask.value == '') medicmat_SER104Mask.typedValue = medicpos_SER104Mask.typedValue
      validarInputs(
        {
          form: "#VALIDARMAT_SER104",
          orden: "1",

        }, this._evaluarmedicnopos_SER104,
        () => {
          if (medicmat_SER104Mask.value < 0.50 || medicmat_SER104Mask.value > 250) {
            CON851("03", "03", this._evaluarmedicmat_SER104(), "error", "error");
          } else {
            this._evaluarmedicmqotros_SER104()
          }
        },
      );
    },
    _evaluarmedicmqotros_SER104() {
      if (medicotros_SER104Mask.value == '') medicotros_SER104Mask.typedValue = medicpos_SER104Mask.typedValue
      validarInputs(
        {
          form: "#VALIDARMQOTROS_SER104",
          orden: "1",

        }, this._evaluarmedicmat_SER104,
        () => {
          if (medicotros_SER104Mask.value < 0.50 || medicotros_SER104Mask.value > 250) {
            CON851("03", "03", this._evaluarmedicmqotros_SER104(), "error", "error");
          } else {
            this._evaluaracuerdo_SER104()
          }
        },
      );
    },
    _evaluaracuerdo_SER104() {
      if (nroacuerdoMask_SER104.value == '') nroacuerdoMask_SER104.typedValue = 'N';
      validarInputs({
        form: '#VALIDARACUERDO_SER104',
        orden: '1',
      }, this._evaluarmedicmqotros_SER104,
        () => {
          this._evaluarsalario_SER104()
        }
      )
    },
    _evaluarsalario_SER104() {
      if (this.SER104.FORMALIQTAB == '1') {
        this._evaluargrabar_SER104()
      } else {
        validarInputs({
          form: '#VALIDARSALARIO_SER104',
          orden: '1',
        }, this._evaluaracuerdo_SER104,
          () => {
            this.SER104.SALMINW = salario_SER104Mask.value.replace(',', '');
            this._evaluargrabar_SER104()
          }
        )
      }
    },
    _evaluargrabar_SER104() {
      CON851P("01", this._evaluarsalario_SER104, this._evaluargrabado_SER104);
    },
    _evaluargrabado_SER104() {
      var data = {};
      var lin = 1;
      var lin2 = 1;
      for (var i in this.tablatarifas_SER104) {
        let valor = this.tablatarifas_SER104[i].PORCTABTAR.padStart(6, '0');
        data['TAB-' + lin.toString().padStart(3, '0')] = this.tablatarifas_SER104[i].CODTABTAR + '|' + valor + '|';
        lin++;
      }
      for (var j in this.tablaext_SER104) {
        let posicion1 = this.tablaext_SER104[j].HNQUIRTAR.padStart(12, '0')
        let posicion2 = this.tablaext_SER104[j].HNAYUDTAR.padStart(12, '0')
        let posicion3 = this.tablaext_SER104[j].HNANESTAR.padStart(12, '0')
        let posicion4 = this.tablaext_SER104[j].MATQUITAR.padStart(12, '0')
        let posicion5 = this.tablaext_SER104[j].DRSALATAR.padStart(12, '0')
        data['TAR-' + lin2.toString().padStart(3, '0')] = posicion1 + '|' + posicion2 + '|' + posicion3 + '|' + posicion4 + '|' + posicion5 + '|';
        lin2++;
      }
      data.datosh = `${datosEnvio()}3|${this.form.codtarifa_SER104}|${this.form.novedad_SER104.substring(0, 1)}|${this.form.descriptarifa_SER104}|${this.SER104.SALMINW.padStart(9, '0')}|${this.form.vlrmedic_SER104.substring(0, 1)}|${medicpos_SER104Mask.value.padStart(6, '0')}|${medicnopos_SER104Mask.value.padStart(6, '0')}|${medicmat_SER104Mask.value.padStart(6, '0')}|${medicotros_SER104Mask.value.padStart(6, '0')}|${nroacuerdoMask_SER104.value}|`
      postData(data, get_url("APP/SALUD/SER104.DLL"))
        .then(data => {
          CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
        })
        .catch(err => {
          console.error(err);
          this._evaluarsalario_SER104()
        });
    },

    _evaluareliminar_SER104() {
      let URL = get_url("APP/SALUD/SER104.DLL");
      postData({ datosh: datosEnvio() + '3|' + this.form.codtarifa_SER104 + '|' + this.form.novedad_SER104.substring(0, 1) + '|' }, URL)
        .then(data => {
          CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
        })
        .catch(err => {
          console.error(err);
          this._evaluarsalario_SER104()
        });
    },
    _inicializartablacirugia_SER104() {
      this._evaluarcodtarifa_SER104()
    },
    _ventanaimportconv_SER104() {
      var $_this = this;
      var ventanatarifasorig = bootbox.dialog({
        size: 'large',
        title: 'Importa datos de otro convenio',
        message: '<div class="row"> ' +
          '<div class="col-md-12"> ' +

          '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
          '<div class="inline-inputs">' +
          '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "CONVENIO ORIGEN:" + '</label> ' +
          '<div class="col-md-3 col-sm-6 col-xs-6" id="CONVENIOOTRO_SER104"> ' +
          '<input id="convotro_SER104" class="form-control input-md" data-orden="1" maxlength="6" > ' +
          '</div> ' +
          '<button type="button" id="convotroBtn_SER104" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
          '<i class="icon-magnifier"></i>' +
          '</button>' +
          '<div class="col-md-9 col-sm-6 col-xs-6"> ' +
          '<input id="descripconvotro_SER104" class="form-control input-md"> ' +
          '</div> ' +

          '</div>' +
          '</div>' +

          '</div>' +
          '</div>',
        buttons: {
          confirm: {
            label: 'Aceptar',
            className: 'btn-primary',
            callback: function () {
              ventanatarifasorig.off('show.bs.modal');
              setTimeout(() => { $_this._evaluarnombretarifastabla_SER104() }, 500)
            }
          },
          cancelar: {
            label: 'Cancelar',
            className: 'btn-danger',
            callback: function () {
              ventanatarifasorig.off('show.bs.modal');
              setTimeout(() => { $_this._evaluarcodtarifatabla_SER104() }, 500)
            }
          }
        }
      });
      ventanatarifasorig.init($('.modal-footer').hide());
      ventanatarifasorig.init(this._Evaluarotroconvenio_SER104());
      ventanatarifasorig.on('shown.bs.modal', function () {
        $("#convotro_SER104").focus();
      });
      ventanatarifasorig.init(_toggleF8([{
        input: 'convotro',
        app: 'SER104',
        funct: this._f8envio_SER513
      },]));
    },

    _Evaluarotroconvenio_SER104() {
      _inputControl("disabled");
      validarInputs({
        form: '#CONVENIOOTRO_SER104',
        orden: "1"
      },
        () => { $('.btn-danger').click() },
        () => {
          this.SER104.OTROCONV = $('#convotro_SER104').val()
          if (this.SER104.OTROCONV.trim() == "") {
            CON851("02", "02", this._evaluarcodtarifa_SER104(), "error", "error");
          } else {
            let URL = get_url("APP/SALUD/SAL401.DLL");
            postData({
              datosh: datosEnvio() + '2| |' + this.SER104.OTROCONV + "|",
            }, URL)
              .then(data => {
                this.SER104.TARIFASCOMPLETO = data.TARIFA[0];
                $('#descripconvotro_SER104').val(this.SER104.TARIFASCOMPLETO.DESCRIP.trim())
                medicpos_SER104Mask.typedValue = this.SER104.TARIFASCOMPLETO.PORC_PO.trim()
                medicnopos_SER104Mask.typedValue = this.SER104.TARIFASCOMPLETO.PORC_NP.trim()
                medicmat_SER104Mask.typedValue = this.SER104.TARIFASCOMPLETO.PORC_MO.trim()
                medicotros_SER104Mask.typedValue = this.SER104.TARIFASCOMPLETO.PORC_MQ.trim()
                let base = { '1': 'BASE COSTO PROM', '2': 'BASE ULT COMPR', '3': 'BASE PRECIO VTA', '4': 'BASE VLR REFER' };
                this.form.vlrmedic_SER104 = this.SER104.TARIFASCOMPLETO.BASE_MED + ' - ' + base[this.SER104.TARIFASCOMPLETO.BASE_MED]
                nroacuerdoMask_SER104.typedValue = this.SER104.TARIFASCOMPLETO.ACUERDO.trim()
                salario_SER104Mask.typedValue = this.SER104.TARIFASCOMPLETO.SAL_MIN.trim();
                this.tablatarifas_SER104 = this.SER104.TARIFASCOMPLETO.TABLA_TAB
                this.tablaext_SER104 = this.SER104.TARIFASCOMPLETO.TABLA_TAR
                $('.btn-primary').click();
              })
              .catch(error => {
                $('.btn-primary').click();
              });
          }
        }
      )
    },

    _validartablatarifas_SER104() {
      if ($("#TABLATABLATAR_SER104 tbody tr").length == 0) {
        this._evaluaritemtablatar_SER104()
      } else {
        validarTabla(
          {
            tabla: "#TABLATABLATAR_SER104",
            orden: "0",
            Supr: data => {
              this.tablatarifas_SER104.splice(parseInt(data.cells[0].textContent.trim()) - 1, 1);
              this.form.codtartabla_SER104 = ""
              this.form.descriptartabla_SER104 = ""
              porcentaje_SER104Mask.typedValue = ""
              this.form.numerotabla_SER104++
            },
          },
          this._editartablatarifas_SER104,
          () => {
            this._evaluaritemtablatar_SER104()
          },
        );
      }
    },
    _editartablatarifas_SER104(data) {
      this.form.numerotabla_SER104 = data.cells[0].textContent.trim();
      this.form.codtartabla_SER104 = data.cells[1].textContent.trim();
      this.form.descriptartabla_SER104 = data.cells[2].textContent.trim();
      porcentaje_SER104Mask.typedValue = data.cells[3].textContent.trim();
      this._evaluaritemtablatar_SER104()
    },
    _validartablacirugia_SER104() {
      if ($("#TABLATARIFAS_SER104 tbody tr").length == 0) {
        this._ubicardatotabla_SER104()
      } else {
        validarTabla(
          {
            tabla: "#TABLATARIFAS_SER104",
            orden: "0",
            Supr: data => {
              this.tablaext_SER104.splice(parseInt(data.cells[0].textContent.trim()) - 1, 1);
              quirugica_SER104Mask.typedValue = ''
              ayudantia_SER104Mask.typedValue = ''
              anestesia_SER104Mask.typedValue = ''
              matquirurgica_SER104Mask.typedValue = ''
              derechos_SER104Mask.typedValue = ''
              this.form.grp_SER104++
            },
          },
          this._editartablacirugia_SER104,
          () => {
            this._ubicardatotabla_SER104()
          },
        );
      }
    },
    _editartablacirugia_SER104(data) {
      this.form.grp_SER104 = data.cells[0].textContent.trim();
      quirugica_SER104Mask.typedValue = data.cells[1].textContent.trim();
      ayudantia_SER104Mask.typedValue = data.cells[2].textContent.trim();
      anestesia_SER104Mask.typedValue = data.cells[3].textContent.trim();
      matquirurgica_SER104Mask.typedValue = data.cells[4].textContent.trim();
      derechos_SER104Mask.typedValue = data.cells[5].textContent.trim();
      this._ubicardatotabla_SER104()
    },
    //////////////F8-VENTANAS//////////////////////////////////
    _f8convenio_SER104() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CONVENIOS",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER104.CONVENIO,
        callback_esc: function () {
          $(".convenio_SER104").focus();
        },
        callback: function (data) {
          $_this.form.codtarifa_SER104 = data.COD
          _enterInput('.convenio_SER104');
        }
      });
    },
    _f8tarifas_SER104() {
      var $_this = this;
      _ventanaDatos({
        titulo: "TIPO DE NOMBRES DE TARIFAS",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER104.TARIFAS,
        callback_esc: function () {
          $(".nomtarifas_SER104").focus();
        },
        callback: function (data) {
          $_this.form.codtartabla_SER104 = data.COD
          _enterInput('.nomtarifas_SER104');
        }
      });
    }
  },
});


var porcentaje_SER104Mask = new IMask(document.getElementById('porcenttabla_SER104'),
  { mask: Number, min: 0, max: 999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

var quirugica_SER104Mask = new IMask(document.getElementById('quirurgico_SER104'),
  { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var ayudantia_SER104Mask = new IMask(document.getElementById('ayudantia_SER104'),
  { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var anestesia_SER104Mask = new IMask(document.getElementById('anestesia_SER104'),
  { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var matquirurgica_SER104Mask = new IMask(document.getElementById('matquirurg_SER104'),
  { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var derechos_SER104Mask = new IMask(document.getElementById('derechos_SER104'),
  { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

var medicpos_SER104Mask = new IMask(document.getElementById('medicpos_SER104'),
  { mask: Number, min: 0, max: 999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

var medicnopos_SER104Mask = new IMask(document.getElementById('medicnopos_SER104'),
  { mask: Number, min: 0, max: 999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

var medicmat_SER104Mask = new IMask(document.getElementById('mat_SER104'),
  { mask: Number, min: 0, max: 999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var medicotros_SER104Mask = new IMask(document.getElementById('otros_SER104'),
  { mask: Number, min: 0, max: 999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var salario_SER104Mask = new IMask(document.getElementById('salario_SER104'),
  { mask: Number, min: 0, max: 999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

var nroacuerdoMask_SER104 = IMask($('#nroacuerdo_SER104')[0], {
  mask: 'a',
  definitions: {
    'a': /[SN]/
  },
  prepare: function (str) {
    if (str.trim() == '') {
      return false
    } else {
      return str.toUpperCase()
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase()
  }
});

