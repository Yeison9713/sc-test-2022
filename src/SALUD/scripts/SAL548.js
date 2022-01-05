//  03/08/2020 - DIANA ESCOBAR: CREADO 

new Vue({
  el: "#SAL548",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue")
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,
    tipo_impresion: null,


    sal548: {
      _profesionales: [],
      _numeracion: [],
      _entidades: [],
      _actividades: [],
      _grupos: [],
      _gruposer: [],
      _articulos: [],
      _operador: [],
      _costos: [],
      _especilidad: [],
      _division: [],
      _pais: [],
      _cups: [],
      _unidadserv: [],
      _formapago: [],
      _sucursal: [],
      _contratos: [],
    },
    SAL_548: [],
    form: {
      facturacionpor_SAL548: '',
      medicoejecutar_SAL548: '',
      mostrarpor_SAL548: '',
      tipofact_SAL548: '',
      compdroga_SAL548: '',
      formapago_SAL548: '',
      
      descripunidadserv_SAL548: '',
      descriptipofact_SAL548: '',
      descripformapago_SAL548: '',
      decripmedicos_SAL548: '',
      descripfact_SAL548: '',
      descripentidades_SAL548: '',
      descripactividad_SAL548: '',
      descripgrupo_SAL548: '',
      descripcosto_SAL548: '',
      descripespec_SAL548: '',
      descripdivision_SAL548: '',
      descripsurcursal_SAL548: '',
      descripoperador_SAL548: '',

      mostraresp_SAL548: '',
      medicos_SAL548: '',
      prefijo_SAL548: '',
      facturacion_SAL548: '',
      entidades_SAL548: '',
      actividad_SAL548: '',
      anolistarini_SAL548: '',
      meslistarini_SAL548: '',
      dialistarini_SAL548: '',
      contrato_SAL548: '',
      anolistarfin_SAL548: '',
      meslistarfin_SAL548: '',
      dialistarfin_SAL548: '',
      grupo_SAL548: '',
      articulo_SAL548: '',
      nivel_SAL548: '',
      discricod_SAL548: '',
      costos_SAL548: '',
      especialidad_SAL548: '',
      finalidadcons_SAL548: '',
      division_SAL548: '',
      pais_SAL548: '',
      mostrareps_SAL548: '',
      tipoafil_SAL548: '',
      unidadserv_SAL548: '',
      descripunidad_SAL548: '',
      causaext_SAL548: '',
      ocultarx_SAL548: '',
      cirugia_SAL548: '',
      sucursal_SAL548: '',
      mostrariva_SAL548: '',
      soloemb_SAL548: '',
      operador_SAL548: '',
      solofacthc_SAL548: '',
      mostrarsin99_SAL548: '',
      solorefact_SAL548: '',
      fechaAten_SAL548: ""
    },
    filtroenvios: "",
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,5,4,1,4,1 - Resumen comprobante, cups, articulos");
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_ANO_LNK = $_FECHA_LNK.substring(0, 2);
    $_MES_LNK = $_FECHA_LNK.substring(2, 4);
    $_DIA_LNK = $_FECHA_LNK.substring(4, 6);
    $_this = this;

    obtenerDatosCompletos(
      {
        nombreFd: 'SERVICIOS',
      },
      function (data) {
        $_this.sal548._servicios = data.SERVICIOS
        obtenerDatosCompletos(
          {
            nombreFd: 'FORMAPAGO',
          },
          function (data) {
            $_this.sal548._formapago = data.FORMAPAGO
            obtenerDatosCompletos(
              {
                nombreFd: "PROFESIONALES",
              },
              function (data) {
                $_this.sal548._profesionales = data.ARCHPROF;
                $_this.sal548._profesionales.pop();
                obtenerDatosCompletos(
                  {
                    nombreFd: "ENTIDADES",
                  },
                  function (data) {
                    $_this.sal548._entidades = data.ENTIDADES;
                    $_this.sal548._entidades.pop();
                    loader("hide");
                    $_this._evaluarfacturacion_sal548();
                    obtenerDatosCompletos(
                      {
                        nombreFd: "OPERADOR",
                      },
                      function (data) {
                        $_this.sal548._operador = data.ARCHREST;
                        $_this.sal548._operador.pop();

                        obtenerDatosCompletos(
                          {
                            nombreFd: "GRUPO-SER",
                          },
                          function (data) {
                            $_this.sal548._gruposer = data.CODIGOS;
                            $_this.sal548._gruposer.pop();
                            obtenerDatosCompletos(
                              {
                                nombreFd: "GRUPOS",
                              },
                              function (data) {
                                $_this.sal548._grupos = data.GRUPOS;
                                $_this.sal548._grupos.pop();
                                $_this.SAL_548.GRUPOS = $_this.sal548._grupos.filter(e => e.TIPO.trim() == 0);
                                obtenerDatosCompletos(
                                  {
                                    nombreFd: "COSTOS",
                                  },
                                  function (data) {
                                    $_this.sal548._costos = data.COSTO;
                                    $_this.sal548._costos.pop();
                                    obtenerDatosCompletos(
                                      {
                                        nombreFd: "ACTIVIDADES",
                                      },
                                      function (data) {
                                        $_this.sal548._actividades = data.ACTIVIDADES;
                                        $_this.sal548._actividades.pop();
                                        obtenerDatosCompletos(
                                          {
                                            nombreFd: "ESPECIALIDAD",
                                          },
                                          function (data) {
                                            $_this.sal548._especilidad = data.ESPECIALIDADES;
                                            $_this.sal548._especilidad.pop();
                                            obtenerDatosCompletos(
                                              {
                                                nombreFd: "DIVISION",
                                              },
                                              function (data) {
                                                $_this.sal548._division = data.CODIGOS;
                                                $_this.sal548._division.pop();

                                                obtenerDatosCompletos(
                                                  {
                                                    nombreFd: "ARTICULOS",
                                                  },
                                                  function (data) {
                                                    $_this.sal548._articulos = data.ARTICULOS;
                                                    $_this.sal548._articulos.pop();
                                                    $_this.SAL_548.ARTICULOS = $_this.sal548._articulos.filter(e => e.TIPO_ART == 0);
                                                    obtenerDatosCompletos(
                                                      {
                                                        nombreFd: 'CUPS'
                                                      }, function (data) {
                                                        $_this.sal548._cups = data.CODIGOS;
                                                        $_this.sal548._cups.pop()
                                                        obtenerDatosCompletos(
                                                          {
                                                            nombreFd: "PAISES_RIPS",
                                                          },
                                                          function (data) {
                                                            $_this.sal548._pais = data.PAISESRIPS;
                                                            $_this.sal548._pais.pop();
                                                            obtenerDatosCompletos(
                                                              {
                                                                nombreFd: "SUCURSALES",
                                                              },
                                                              function (data) {
                                                                $_this.sal548._sucursal = data.SUCURSAL;
                                                                // $_this.sal548._sucursal.pop();
                                                                obtenerDatosCompletos(
                                                                  {
                                                                    nombreFd: "CONTRATOS",
                                                                  },
                                                                  function (data) {
                                                                    $_this.sal548._contratos = data.CONTRATOS;
                                                                    $_this.sal548._contratos.pop();
                                                                    obtenerDatosCompletos(
                                                                      {
                                                                        nombreFd: "UNSERV",
                                                                      },
                                                                      function (data) {
                                                                        data = data.UNSERV;
                                                                        data.pop();
                                                                        $_this.sal548.UNSERV = data;
                                                                        $_this.sal548.UNIDSERVICIO = [];
                                                                        for (var i in $_this.sal548.UNSERV) {
                                                                          if ($_this.sal548.UNSERV[i].ESTADO.trim() == 'S') {
                                                                            if ($_this.sal548.UNSERV[i].COD.trim() != '') {
                                                                              $_this.sal548.UNIDSERVICIO.push($_this.sal548.UNSERV[i]);
                                                                            }
                                                                          }
                                                                        }
                                                                        for (var i in $_this.sal548.UNIDSERVICIO) {
                                                                          $_this.sal548.UNIDSERVICIO[i].DESCRIP = `${$_this.sal548.UNIDSERVICIO[i].COD} - ${$_this.sal548.UNIDSERVICIO[i].DESCRIP}`;
                                                                          $_this.sal548.UNIDSERVICIO[i].COD = i;
                                                                        }
                                                                      },
                                                                    );
                                                                  },
                                                                );
                                                              },
                                                            );
                                                          },
                                                        );
                                                      },
                                                    );
                                                  },
                                                );
                                              },
                                            );
                                          }
                                        )
                                      },
                                    );
                                  },
                                );
                              },
                            );
                          },
                        );
                      },
                    );
                  },
                );
              },
            );
          },
        );
      },
    );
  },
  methods: {
    _evaluarfacturacion_sal548() {
      var SWARCH = [
        { COD: "1", DESCRIP: "Segun facturacion" },
        { COD: "2", DESCRIP: "Segun solicitud servicios" },
        { COD: "3", DESCRIP: "Segun serv. red externa" },
      ];
      POPUP(
        {
          array: SWARCH,
          titulo: "FACTURACION POR",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          callback_f: () => { _toggleNav(); },
        },
        SWARCH => {
          this.form.facturacionpor_SAL548 = SWARCH.COD + " - " + SWARCH.DESCRIP;
          setTimeout(this._evaluartipomed_sal548, 300);
        },
      );
    },
    _evaluartipomed_sal548() {
      var SWMED = [
        { COD: "1", DESCRIP: "Medico ejecutor " },
        { COD: "2", DESCRIP: "Medico remitente" }
      ];
      POPUP(
        {
          array: SWMED,
          titulo: "TIPO MEDICO",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          callback_f: () => {
            setTimeout(this._evaluarfacturacion_sal548, 300)
          },
        },
        SWMED => {
          this.form.medicoejecutar_SAL548 = SWMED.COD + " - " + SWMED.DESCRIP;
          setTimeout(this._evaluaropcionmae_sal548, 300);
        },
      );
    },
    _evaluaropcionmae_sal548() {
      var FACTW = [
        { COD: "1", DESCRIP: "Mostrar nro comprob " },
        { COD: "2", DESCRIP: "Mostrar nro factura" },
        { COD: "3", DESCRIP: "Acumular por Eps" },
        { COD: "4", DESCRIP: "No relacionar comp" }
      ];
      POPUP(
        {
          array: FACTW,
          titulo: "MOSTRAR",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          callback_f: () => {
            setTimeout(this._evaluartipomed_sal548, 300)
          },
        },
        FACTW => {
          this.form.mostrarpor_SAL548 = FACTW.COD + " - " + FACTW.DESCRIP;
          this._evaluartipofact_sal548();
        },
      );
    },
    _evaluartipofact_sal548() {
      if (this.form.tipofact_SAL548.trim() == '') {
        this.form.tipofact_SAL548 = '*'
      }
      validarInputs(
        {
          form: "#validartipofact_548",
          orden: '1'
        },
        () => { setTimeout(this._evaluaropcionmae_sal548, 300) },
        () => {
          if (this.form.tipofact_SAL548 == '*') {
            this.form.descriptipofact_SAL548 = 'TODOS LOS TIPOS'
            this._evaluardatodroga_sal548();
          } else {
            const res = this.sal548._servicios.find(e => e.COD == this.form.tipofact_SAL548);
            if (res == undefined) {
              CON851('03', '03', null, 'error', 'error');
              this._evaluartipofact_sal548();
            } else {
              this.form.descriptipofact_SAL548 = res.DESCRIPCION
              this._evaluardatodroga_sal548();
            }
          }
        }
      )
    },
    _evaluardatodroga_sal548() {
      switch (this.form.tipofact_SAL548) {
        case '0':
          this.form.compdroga_SAL548 = 'S'
          this._evaluarformapago_sal548();
          break;
        case '*':
          if (this.form.compdroga_SAL548.trim() == '') {
            this.form.compdroga_SAL548 = 'N'
          }
          validarInputs(
            {
              form: "#validarcompdroga_548",
              orden: '1'
            }, this._evaluartipofact_sal548,
            () => {
              this.form.compdroga_SAL548 = this.form.compdroga_SAL548.toUpperCase()
              if (this.form.compdroga_SAL548 == 'S' || this.form.compdroga_SAL548 == 'N') {
                this._evaluarformapago_sal548();
              } else {
                this._evaluardatodroga_sal548();
              }
            }
          )
          break;
        default:
          this.form.compdroga_SAL548 = 'N'
          this._evaluarformapago_sal548()
          break;
      }
    },
    _evaluarformapago_sal548() {
      if (this.form.formapago_SAL548.trim() == '') {
        this.form.formapago_SAL548 = '*'
      }
      validarInputs(
        {
          form: "#validarformapago_548",
          orden: '1'
        }, this._evaluartipofact_sal548,
        () => {
          var formapago = this.form.formapago_SAL548;
          if (formapago == '*') {
            this.form.descripformapago_SAL548 = 'PROCESO TOTAL'
            this._evaluarmostrarespec_sal548();
          } else {
            const res = this.sal548._formapago.find(e => e.COD == formapago);
            if (res == undefined) {
              CON851('03', '03', this._evaluarformapago_sal548(), 'error', 'error');
            } else {
              this.form.descripformapago_SAL548 = res.DESCRIP
              this._evaluarmostrarespec_sal548();
            }
          }
        }
      )
    },
    _evaluarmostrarespec_sal548() {
      if (this.form.mostraresp_SAL548.trim() == '') {
        this.form.mostraresp_SAL548 = 'S'
      }
      validarInputs(
        {
          form: "#validarmostraresp_548",
          orden: '1'
        }, this._evaluarformapago_sal548,
        () => {
          this.form.mostraresp_SAL548 = this.form.mostraresp_SAL548.toUpperCase()
          if (this.form.mostraresp_SAL548 == 'S' || this.form.mostraresp_SAL548 == 'N') {
            this._evaluarmedico_sal548()
          } else {
            CON851('03', '03', this._evaluarmostrarespec_sal548(), 'error', 'error');
          }
        }
      )
    },
    _evaluarmedico_sal548() {
      if (this.form.medicos_SAL548.trim() == '') {
        this.form.medicos_SAL548 = '99'
      }
      validarInputs(
        {
          form: "#validarmedicos_548",
          orden: '1'
        }, this._evaluarmostrarespec_sal548,
        () => {
          if (this.form.medicos_SAL548 == '99') {
            this.form.decripmedicos_SAL548 = 'TODOS LOS MEDICOS'
            this._evaluarprefijo_sal548();
          } else {
            const res = this.sal548._profesionales.find(e => e.IDENTIFICACION == this.form.medicos_SAL548);
            if (res == undefined) {
              CON851('01', '01', this._evaluarmedico_sal548(), 'error', 'error');
            } else {
              this.form.decripmedicos_SAL548 = res.NOMBRE;
              this._evaluarprefijo_sal548();
            }
          }
        }
      )
    },
    _evaluarprefijo_sal548() {
      console.log(this.form.prefijo_SAL548)
      if (this.form.prefijo_SAL548.trim() == '') {
        this.form.prefijo_SAL548 = '*'
      }
      validarInputs(
        {
          form: "#validarprefijo_548",
          orden: '1'
        }, this._evaluarmedico_sal548,
        () => {
          if (this.form.prefijo_SAL548 == '*') {
            this.form.facturacion_SAL548 = '000000'
            this._mostrarfactura_sal548();
          } else {
            if (

              ["A",
                "P",
                "T",
                "B",
                "D",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "Q",
                "R",
                "S",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                "a",
                "b",
                "c",
                "d",
                "E",
                "f",
                "g",
                "h",
                "i",
                "j"].includes(this.form.prefijo_SAL548)
            ) {
              validarInputs(
                {
                  form: "#validarfactura_548",
                  orden: '1'
                },
                () => { this._evaluarprefijo_sal548 },
                () => {
                  this.form.facturacion_SAL548 = this.form.facturacion_SAL548.padStart(6, '0')
                  this._mostrarfactura_sal548();
                }
              )
            } else {
              CON851('03', '03', this._evaluarprefijo_sal548(), 'error', 'error');
            }
          }
        }
      )

    },
    _mostrarfactura_sal548() {
      if (this.form.facturacion_SAL548 == '999999') {
        this._valicacionfecha_sal548()
      } else {
        switch (this.form.prefijo_SAL548) {
          case '*':
            this.form.descripfact_SAL548 = 'TODAS LAS FACTURAS'
            this._valicacionfecha_sal548()
            break;
          case 'R':
            this.form.descripfact_SAL548 = 'ENVIO RED EXTERNA'
            this._valicacionfecha_sal548()
            break;
          default:
            let URL = get_url("APP/SALUD/SER808-01.DLL");
            postData({ datosh: datosEnvio() + this.form.prefijo_SAL548 + this.form.facturacion_SAL548 + '|' }, URL)
              .then(data => {
                this.form.descripfact_SAL548 = data.NUMER19[0].DESCRIP_NUM
                this.SAL_548.FECHAINGNUM = data.NUMER19[0].FECHA_ING
                this._valicacionfecha_sal548();
              })
              .catch(err => {
                console.debug(err);
                this._evaluarprefijo_sal548()
              })

            break;
        }
      }
    },
    _valicacionfecha_sal548() {
      if (this.form.meslistarini_SAL548.trim() == '') {
        if (this.form.prefijo_SAL548 == '*') {
          this.form.anolistarini_SAL548 = 20 + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2)
          this.form.meslistarini_SAL548 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4)
          this.form.dialistarini_SAL548 = '01'
        } else {
          this.form.anolistarini_SAL548 = this.SAL_548.FECHAINGNUM.substring(0, 4)
          this.form.meslistarini_SAL548 = this.SAL_548.FECHAINGNUM.substring(4, 6)
          this.form.dialistarini_SAL548 = this.SAL_548.FECHAINGNUM.substring(6, 8)
        }
        this._evaluarentidad_sal548()
      } else {
        this._evaluarentidad_sal548()
      }
    },
    _evaluarentidad_sal548() {
      if (this.form.entidades_SAL548.trim() == '') {
        this.form.entidades_SAL548 = '99'
      }
      validarInputs(
        {
          form: "#validarentidad_548",
          orden: '1'
        }, this._evaluarprefijo_sal548,
        () => {
          if (this.form.entidades_SAL548 == '99') {
            this.form.descripentidades_SAL548 = 'TODAS LAS ENTIDADES'
            this._evaluaractividad_sal548();
          } else {
            const res = this.sal548._entidades.find(e => e["COD-ENT"] == this.form.entidades_SAL548);
            if (res == undefined) {
              CON851('01', '01', this._evaluarentidad_sal548(), 'error', 'error');
            } else {
              this.form.descripentidades_SAL548 = res['NOMBRE-ENT'];
              this._evaluaractividad_sal548();
            }
          }
        }
      )
    },
    _evaluaractividad_sal548() {
      if (this.form.entidades_SAL548 == '99') {
        if (this.form.actividad_SAL548.trim() == '') {
          this.form.actividad_SAL548 = '**';
        }
        validarInputs(
          {
            form: "#validaractividad_548",
            orden: '1'
          }, this._evaluarentidad_sal548,
          () => {
            if (this.form.actividad_SAL548 == '**') {
              this._evaluarfechaini_sal548('1')
            } else {
              const res = this.sal548._actividades.find(e => e.COD == this.form.actividad_SAL548);
              if (res == undefined) {
                CON851('01', '01', this._evaluaractividad_sal548(), 'error', 'error');
              } else {
                this.form.descripactividad_SAL548 = res.DESCRIP;
                this._evaluarfechaini_sal548('1')
              }
            }
          }
        )
      } else {
        this.form.actividad_SAL548 = '**'
        this._evaluarfechaini_sal548('1')
      }
    },
    _evaluarfechaini_sal548(orden) {
      validarInputs(
        {
          form: "#fechalistarInicial_548",
          orden: orden,
        }, this._evaluarentidad_sal548,
        () => {
          if (this.form.anolistarini_SAL548.trim() == "") {
            CON851("", "Año incorrecto! ", this._evaluarfechaini_sal548("1"), "error", "error");
          } else {
            var mesinilistar = this.form.meslistarini_SAL548.padStart(2, "0");
            if (mesinilistar.trim() == "" || mesinilistar < 1 || mesinilistar > 12) {
              CON851("", "Mes incorrecto! ", this._evaluarfechaini_sal548("2"), "error", "error");
            } else {
              var diainilistar = this.form.dialistarini_SAL548.padStart(2, "0");
              if (diainilistar.trim() == "" || diainilistar < 1 || diainilistar > 31) {
                CON851("", "Dia incorrecto! ", this._evaluarfechaini_sal548("3"), "error", "error");
              } else {
                this.SAL_548.FECHAINIW = this.form.anolistarini_SAL548.padStart(4, "0") + this.form.meslistarini_SAL548.padStart(2, "0") + this.form.dialistarini_SAL548.padStart(2, "0")
                if (moment(this.SAL_548.FECHAINIW).format('YYYYMMDD').trim() == 'Fecha inválida') {
                  CON851('', 'Dia invalido del mes', null, 'error', 'Error');
                  return this._evaluarfechaini_sal548("3")
                }
                this._leerfact_sak548();
              }
            }
          }
        },
      )
    },
    _leerfact_sak548() {
      this.SAL_548.FECHAFINW = 00000000
      let URL = get_url("APP/SALUD/SAL548.DLL");
      postData({ datosh: datosEnvio() + '1|' + this.SAL_548.FECHAINIW + '|' }, URL)
        .then(data => {
          if (this.SAL_548.FECHAFINW < this.SAL_548.FECHAINIW) {
            this.SAL_548.FECHAFINW = this.SAL_548.FECHAINIW;
            this.form.anolistarfin_SAL548 = this.SAL_548.FECHAFINW.substring(0, 4)
            this.form.meslistarfin_SAL548 = this.SAL_548.FECHAFINW.substring(4, 6)
            this.form.dialistarfin_SAL548 = this.SAL_548.FECHAFINW.substring(6, 8)
          }
          this._evaluarfechafin_sal548('1')
        })
        .catch(err => {
          console.debug(err);
          this._evaluarfechaini_sal548('3')
        })

    },
    _evaluarfechafin_sal548(orden) {
      validarInputs(
        {
          form: "#fechalistarFinal_548",
          orden: orden,
        },
        () => { this._evaluarfechaini_sal548("3") },
        () => {
          if (this.form.anolistarfin_SAL548.trim() == "") {
            CON851("", "Año incorrecto! ", null, "error", "error");
            return this._evaluarfechafin_sal548("1")
          } else {
            var mesfinlistar = this.form.meslistarfin_SAL548.padStart(2, "0");
            if (mesfinlistar.trim() == "" || mesfinlistar < 1 || mesfinlistar > 12) {
              CON851("", "Mes incorrecto! ", null, "error", "error");
              return this._evaluarfechafin_sal548("2")
            } else {
              var diafinlistar = this.form.dialistarfin_SAL548.padStart(2, "0");
              if (diafinlistar.trim() == "" || diafinlistar < 1 || diafinlistar > 31) {
                CON851("", "Dia incorrecto! ", null, "error", "error");
                return this._evaluarfechafin_sal548("3")
              } else {
                this.SAL_548.FECHAFINW = this.form.anolistarfin_SAL548.padStart(4, "0") + this.form.meslistarfin_SAL548.padStart(2, "0") + this.form.dialistarfin_SAL548.padStart(2, "0")
                if (this.SAL_548.FECHAINIW > this.SAL_548.FECHAFINW) {
                  return this._evaluarfechafin_sal548("1")
                } else {
                  if (moment(this.SAL_548.FECHAFINW).format('YYYYMMDD').trim() == 'Fecha inválida') {
                    CON851('', 'Dia invalido del mes', null, 'error', 'Error');
                    return this._evaluarfechafin_sal548("3")
                  }
                  this._evaluargrupo_sal548();
                }
              }
            }
          }
        },
      )
    },
    _evaluargrupo_sal548() {
      if (this.form.grupo_SAL548.trim() == '') {
        this.form.grupo_SAL548 = '**'
      }
      validarInputs(
        {
          form: "#validargrupo_548",
          orden: '1'
        }, () => {
          this._evaluarfechafin_sal548('3')
        },
        () => {
          if (this.form.grupo_SAL548 == '**') {
            this.form.articulo_SAL548 = '*'
            this.form.descripgrupo_SAL548 = 'TODOS LOS GRUPOS'
            this._evaluarnivel_sal548();
          } else if (this.form.tipofact_SAL548 == '0') {
            const res = this.SAL_548.GRUPOS.find(e => e.GRUPO == this.form.grupo_SAL548);
            if (res == undefined) {
              this.form.descripgrupo_SAL548 = 'GRUPO NO EXISTE!'
              CON851('01', '01', this._evaluargrupo_sal548(), 'error', 'error');
            } else {
              this.SAL_548.FILTROARTICULOS = $_this.sal548._articulos.filter(e => e.GRUPO_ART == this.form.grupo_SAL548);
              this.form.descripgrupo_SAL548 = res.DESCRIP;
              this._evaluararticulo_sal548()
            }
          } else {
            const res = this.sal548._gruposer.find(e => e.COD == this.form.grupo_SAL548);
            if (res == undefined) {
              this.form.descripgrupo_SAL548 = 'GRUPO NO EXISTE!'
              CON851('01', '01', this._evaluargrupo_sal548(), 'error', 'error');
            } else {
              this.form.descripgrupo_SAL548 = res.DESCRIP;
              this._evaluararticulo_sal548()
            }
          }
        }
      )
    },
    _evaluararticulo_sal548() {
      if (this.form.articulo_SAL548.trim() == '') {
        this.form.articulo_SAL548 = '*'
      }
      validarInputs(
        {
          form: "#validararticulo_548",
          orden: '1'
        }, this._evaluargrupo_sal548,
        () => {
          if (this.form.articulo_SAL548 == '*') {
            this._evaluarnivel_sal548()
          } else if (this.form.articulo_SAL548.trim() == '') {
            this._evaluargrupo_sal548()
          } else {
            if (this.form.tipofact_SAL548 == '0') {
              const res = this.SAL_548.FILTROARTICULOS.find(e => e.LLAVE_ART == this.form.articulo_SAL548);
              if (res == undefined) {
                CON851('01', '01', this._evaluararticulo_sal548(), 'error', 'error');
              } else {
                this._evaluarnivel_sal548()
              }
            } else {
              this.SAL_548.LLAVECUPS = this.form.grupo_SAL548 + this.form.articulo_SAL548
              let res = this.sal548._cups.find(e => e.LLAVE.trim() == this.SAL_548.LLAVECUPS);
              if (res == undefined) {
                this._evaluarnivel_sal548()
              } else {
                this.SAL_548.NIVELTEM = res.TIPO
                this.form.grupo_SAL548 = res.GRUPO
                switch ($_USUA_GLOBAL[0].PUC) {
                  case '3':
                    this.SAL_548.CTACONTABTEM = res.CTACONTAB1
                    break;
                  case '4':
                    this.SAL_548.CTACONTABTEM = res.CTACONTAB3
                    break;
                  case '5':
                    this.SAL_548.CTACONTABTEM = res.CTACONTAB1
                    break;
                  case '6':
                    this.SAL_548.CTACONTABTEM = res.CTACONTAB3
                    break;
                }
                this._evaluarnivel_sal548()
              }
            }
          }
        }
      )
    },
    _evaluarnivel_sal548() {
      if (this.form.nivel_SAL548 == '') {
        this.form.nivel_SAL548 = '*'
      }
      validarInputs(
        {
          form: "#validarnivel_548",
          orden: '1'
        }, this._evaluararticulo_sal548,
        () => {
          this._evaluardiscriminarcod_sal548()
        }
      )

    },
    _evaluardiscriminarcod_sal548() {
      if (this.form.grupo_SAL548 == '**' || this.form.articulo_SAL548 == '*') {
        if (this.form.discricod_SAL548.trim() == '') {
          if (this.form.tipofact_SAL548 == '0' || this.form.mostrarpor_SAL548.substring(0, 1) == '2') {
            this.form.discricod_SAL548 = 'N'
          } else {
            this.form.discricod_SAL548 = 'S'
          }
        }
        validarInputs(
          {
            form: "#validardiscricod_548",
            orden: '1'
          }, this._evaluarnivel_sal548,
          () => {
            this.form.discricod_SAL548 = this.form.discricod_SAL548.toUpperCase()
            if (this.form.discricod_SAL548 == 'S' || this.form.discricod_SAL548 == 'N') {
              this._evaluarcentrocosoto_sal548();
            } else {
              CON851('03', '03', this._evaluardiscriminarcod_sal548(), 'error', 'error');
            }
          }
        )
      } else {
        this.form.discricod_SAL548 = 'S';
        this._evaluarcentrocosoto_sal548();
      }
    },
    _evaluarcentrocosoto_sal548() {
      if (this.form.costos_SAL548.trim() == '') {
        this.form.costos_SAL548 = '****'
      }
      validarInputs(
        {
          form: "#validarcostos_548",
          orden: '1'
        }, this._evaluargrupo_sal548,
        () => {
          if (this.form.costos_SAL548 == '****') {
            this.form.descripcosto_SAL548 = 'TODOS LOS COSTOS'
            this._evaluarcodespecilidad_sal548();
          } else {
            let URL = get_url("APP/SALUD/SAL548.DLL");
            postData({ datosh: datosEnvio() + '2|' + ' | | | | | | | | | | | | | | | |' + this.form.costos_SAL548 + '|' }, URL)
              .then(data => {
                this.form.descripcosto_SAL548 = data.CONSULTA[0].COSTO
                this._evaluarcodespecilidad_sal548();
              })
              .catch(err => {
                console.debug(err);
                this._evaluarcentrocosoto_sal548();
              })

          }
        }
      )

    },
    _evaluarcodespecilidad_sal548() {
      if (this.form.especialidad_SAL548.trim() == '') {
        this.form.especialidad_SAL548 = '***'
      }
      validarInputs(
        {
          form: "#validarespecialidad_548",
          orden: '1'
        }, this._evaluarnivel_sal548,
        () => {
          if (this.form.especialidad_SAL548 == '***') {
            this.form.descripespec_SAL548 = 'TODAS LAS ESPECIALIDADES'
            this._evaluarfinalildad_sal548()
          } else {
            this.SAL_548.CODESP1W = this.form.especialidad_SAL548.substring(0, 2)
            this.SAL_548.CODESP2W = this.form.especialidad_SAL548.substring(2, 3)
            if (this.SAL_548.CODESP2W == '*') {
              this.SAL_548.CODESP = this.SAL_548.CODESP1W + 0;
            } else {
              this.SAL_548.CODESP = this.form.especialidad_SAL548
            }
            const res = this.sal548._especilidad.find(e => e.CODIGO == this.SAL_548.CODESP);
            if (res == undefined) {
              CON851('01', '01', this._evaluarcodespecilidad_sal548(), 'error', 'error');
            } else {
              this.form.descripespec_SAL548 = res.NOMBRE;
              this._evaluarfinalildad_sal548()
            }
          }
        }
      )
    },
    _evaluarfinalildad_sal548() {
      if (this.form.tipofact_SAL548 == '7' || this.form.tipofact_SAL548 == '5') {
        if (this.form.finalidadcons_SAL548.trim() == '') {
          this.form.finalidadcons_SAL548 = '99 -TODAS LAS FINALID'
        }
        var finalidadw = [
          { COD: "01", DESCRIP: "ATENCION PARTO" },
          { COD: "02", DESCRIP: "ATENCION REC.NACID" },
          { COD: "03", DESCRIP: "ATENC.PLANIF.FAMIL" },
          { COD: "04", DESCRIP: "DET.ALT CRECIM <10" },
          { COD: "05", DESCRIP: "DET.ALT.DESA.JOVEN" },
          { COD: "06", DESCRIP: "DET.ALT.EMBARAZO" },
          { COD: "07", DESCRIP: "DET.ALT. ADULTO" },
          { COD: "08", DESCRIP: "DET.ALT.AGUD.VISUA" },
          { COD: "09", DESCRIP: "DET.ENFERM.PROFES" },
          { COD: "10", DESCRIP: "NO APLICA" },
          { COD: "99", DESCRIP: "TODAS LAS FINALID" },
        ];
        POPUP(
          {
            array: finalidadw,
            titulo: "ORDENAR",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: this.form.finalidadcons_SAL548,
            callback_f: () => { this._evaluarcodespecilidad_sal548() },
          },
          finalidadw => {
            this.form.finalidadcons_SAL548 = finalidadw.COD + " - " + finalidadw.DESCRIP;
            this._evaluardivision_sal548();
          },
        );
      } else {
        this.form.finalidadcons_SAL548 = '99 -TODAS LAS FINALID'
        this._evaluardivision_sal548();
      }
    },
    _evaluardivision_sal548() {
      if (this.form.articulo_SAL548 != '*') {
        this.form.division_SAL548 = '**'
        this.form.descripdivision_SAL548 = 'TODAS LAS DIVISIONES'
        this._evaluardatopais_sal548();
      } else {
        if (this.form.division_SAL548.trim() == '') {
          this.form.division_SAL548 = '**'
        }
        validarInputs(
          {
            form: "#validardivision_548",
            orden: '1'
          }, this._evaluarcodespecilidad_sal548,
          () => {
            if (this.form.division_SAL548 == '**') {
              this.form.descripdivision_SAL548 = 'TODAS LAS DIVISIONES'
              this._evaluardatopais_sal548();
            } else {
              const res = this.sal548._division.find(e => e.COD == this.form.division_SAL548);
              if (res == undefined) {
                CON851('01', '01', this._evaluardivision_sal548(), 'error', 'error');
              } else {
                this.form.descripdivision_SAL548 = res.DESCRIP;
                this._evaluardatopais_sal548();
              }
            }
          }
        )
      }
    },
    _evaluardatopais_sal548() {
      if (this.form.pais_SAL548.trim() == '') {
        this.form.pais_SAL548 = '***'
      }
      validarInputs(
        {
          form: "#validarpais_548",
          orden: '1'
        }, this._evaluardivision_sal548,
        () => {
          if (this.form.pais_SAL548 == '***') {
            this._evaluarmostrareps_sal548();
          } else {
            const res = this.sal548._pais.find(e => e.CODIGO == this.form.pais_SAL548);
            if (res == undefined) {
              CON851('01', '01', this._evaluardatopais_sal548(), 'error', 'error');
            } else {
              this._evaluarmostrareps_sal548();
            }
          }
        }
      )
    },
    _evaluarmostrareps_sal548() {
      if (this.form.mostrarpor_SAL548.substring(0, 1) == '3') {
        this.form.mostrareps_SAL548 = 'S'
        this._evaluarunidadserv_sal548();
      } else {
        if (this.form.mostrareps_SAL548.trim() == '' || this.form.mostrarpor_SAL548.substring(0, 1) == '4') {
          this.form.mostrareps_SAL548 = 'N'
        }
        validarInputs(
          {
            form: "#validarepspac_548",
            orden: '1'
          }, this._evaluardivision_sal548,
          () => {
            this.form.mostrareps_SAL548 = this.form.mostrareps_SAL548.toUpperCase()
            if (this.form.mostrareps_SAL548 == 'S' || this.form.mostrareps_SAL548 == 'N') {
              this._evaluartipoafil_sal548();
            } else {
              CON851('03', '03', this._evaluarmostrareps_sal548(), 'error', 'error');
            }
          }
        )
      }
    },
    _evaluartipoafil_sal548() {
      var afiliado = [
        { COD: "0", DESCRIP: "SIN DETERMINAR" },
        { COD: "1", DESCRIP: "COTIZANTE" },
        { COD: "2", DESCRIP: "BENEFICIARIO" },
        { COD: "3", DESCRIP: "COT.PENSIONADO" },
        { COD: "4", DESCRIP: "UPC ADICIONAL" },
        { COD: "5", DESCRIP: "CABEZA FAMILIA" },
        { COD: "6", DESCRIP: "GRUPO FAMILIAR" },
        { COD: "*", DESCRIP: "TODOS" },
      ];
      POPUP(
        {
          array: afiliado,
          titulo: "TIPO AFILIADO",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          callback_f: () => { this._evaluarmostrareps_sal548() },
          teclaAlterna: true,
          seleccion: "*",
        },
        afiliado => {
          this.form.tipoafil_SAL548 = afiliado.COD + " - " + afiliado.DESCRIP;
          this._evaluarunidadserv_sal548();
        },
      );

    },
    _evaluarunidadserv_sal548() {
      if (this.form.unidadserv_SAL548.trim() == '') {
        this.form.unidadserv_SAL548 = '**'
      }
      validarInputs(
        {
          form: "#validarunidadserv_548",
          orden: '1'
        },
        () => { setTimeout(this._evaluartipoafil_sal548, 300) },
        () => {
          this.SAL_548.UNIDAD1 = this.form.unidadserv_SAL548.substring(0, 1)
          this.SAL_548.UNIDAD2 = this.form.unidadserv_SAL548.substring(1, 2)
          if (this.form.unidadserv_SAL548 == '**') {
            this.form.descripunidadserv_SAL548 = 'TODAS LAS UNIDADES SERV'
            this._evaluarcirugias_sal548();
          } else {
            let URL = get_url("APP/SALUD/SAL548.DLL");
            postData({ datosh: datosEnvio() + '3|' + ' | | | | | | | | | | | | |' + this.form.unidadserv_SAL548 + '| | |' + this.form.costos_SAL548 + '|' }, URL)
              .then(data => {
                console.log(data)
                this.form.descripunidadserv_SAL548 = data.CONSULTA[0].UNIDAD
                console.log(data.CONSULTA[0].UNIDAD)
                this._evaluarcirugias_sal548();
              })
              .catch(err => {
                console.debug(err);
                this._evaluarunidadserv_sal548();
              })
          }
        }
      )
    },
    _evaluarcirugias_sal548() {
      if (this.form.tipofact_SAL548 == '1' && this.form.discricod_SAL548 == 'S') {
        $('#validarcirugias_548').removeClass('hidden');
        if (this.form.cirugia_SAL548.trim() == '') {
          this.form.cirugia_SAL548 = 'N'
        }
        validarInputs(
          {
            form: "#validarcirugias_548",
            orden: '1'
          }, this._evaluarunidadserv_sal548,
          () => {
            this.form.cirugia_SAL548 = this.form.cirugia_SAL548.toUpperCase()
            if (this.form.cirugia_SAL548 == 'S' || this.form.cirugia_SAL548 == 'N') {
              this._evaluarrx_sal548();
            } else {
              CON851('03', '03', this._evaluarcirugias_sal548(), 'error', 'error');
            }
          }
        )
      } else {
        this.form.cirugia_SAL548 = 'N'
        this._evaluarrx_sal548();
      }
    },
    _evaluarrx_sal548() {
      if (this.form.tipofact_SAL548 == '3' && this.form.discricod_SAL548 == 'S') {
        $('#validarrx_548').removeClass('hidden');
        if (this.form.ocultarx_SAL548.trim() == '') {
          this.form.ocultarx_SAL548 = 'N'
        }
        validarInputs(
          {
            form: "#validarrx_548",
            orden: '1'
          }, this._evaluarunidadserv_sal548,
          () => {
            this.form.ocultarx_SAL548 = this.form.ocultarx_SAL548.toUpperCase()
            if (this.form.ocultarx_SAL548 == 'S' || this.form.ocultarx_SAL548 == 'N') {
              this._evaluarcausa_sal548();
            } else {
              CON851('03', '03', this._evaluarcirugias_sal548(), 'error', 'error');
            }
          }
        )
      } else {
        this.form.ocultarx_SAL548 = 'N'
        this._evaluarcausa_sal548();
      }
    },
    _evaluarcausa_sal548() {
      if (this.form.tipofact_SAL548 == '5') {
        $('#validarcausaext_548').removeClass('hidden');
        var CAUSAW = [
          { COD: "01", DESCRIP: "ACCIDENTE DE TRABAJO" },
          { COD: "02", DESCRIP: "ACCIDENTE DE TRANSITO" },
          { COD: "03", DESCRIP: "ACCIDENTE RABICO" },
          { COD: "04", DESCRIP: "ACCIDENTE OFIDICO" },
          { COD: "05", DESCRIP: "OTRO TIPO DE ACCIDENTE" },
          { COD: "06", DESCRIP: "EVENTO CATASTROFICO" },
          { COD: "07", DESCRIP: "LESION POR AGRESION" },
          { COD: "08", DESCRIP: "LESION AUTOINFLIGIDA" },
          { COD: "09", DESCRIP: "SOSP.MALTRATO FISICO" },
          { COD: "10", DESCRIP: "SOSP.ABUSO SEXUAL" },
          { COD: "11", DESCRIP: "SOSP.VIOLENC.SEXUAL" },
          { COD: "12", DESCRIP: "SOSP.MALTRATO EMOCIONAL" },
          { COD: "13", DESCRIP: "ENFERMEDAD GENERAL" },
          { COD: "14", DESCRIP: "ENFERMEDAD PROFESIONAL" },
          { COD: "15", DESCRIP: "NO APLICA" },
          { COD: "**", DESCRIP: "TODAS LAS FINALIDAD" },
        ];
        POPUP(
          {
            array: CAUSAW,
            titulo: "CAUSA",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            callback_f: () => { this._evaluarunidadserv_sal548() },
            seleccion: "**",
          },
          CAUSAW => {
            this.form.causaext_SAL548 = CAUSAW.COD + " - " + CAUSAW.DESCRIP;
            this._evaluarsucursal_sal548();
          },
        );
      } else {
        this.form.causaext_SAL548 = '** - TODAS LAS FINALIDAD'
        this._evaluarsucursal_sal548();
      }
    },
    _evaluarsucursal_sal548() {
      if (this.form.sucursal_SAL548.trim() == '') {
        this.form.sucursal_SAL548 = '**'
      }
      validarInputs(
        {
          form: "#validarsucursal_548",
          orden: '1'
        }, () => {
          if (this.form.tipofact_SAL548 == '5') {
            setTimeout(this._evaluarcausa_sal548, 300)
          } else if (this.form.tipofact_SAL548 == '3' && this.form.discricod_SAL548 == 'S') {
            this._evaluarrx_sal548()
          } else if (this.form.tipofact_SAL548 == '1' && this.form.discricod_SAL548 == 'S') {
            this._evaluarcirugias_sal548()
          } else {
            this._evaluarunidadserv_sal548()
          }
        },
        () => {
          if (this.form.sucursal_SAL548 == '**') {
            this.form.descripsurcursal_SAL548 = 'TODAS LAS SUCURSALES'
            this._evaluariva_sal548();
          } else {
            const res = this.sal548._sucursal.find(e => e.CUENTA == this.form.sucursal_SAL548);
            if (res == undefined) {
              CON851('01', '01', this._evaluarsucursal_sal548(), 'error', 'error');
            } else {
              this.form.descripsurcursal_SAL548 = res.DESCRIPCION
              this._evaluariva_sal548();
            }
          }

        }
      )
    },
    _evaluariva_sal548() {
      if (this.form.tipofact_SAL548 == '0') {
        if (this.form.mostrariva_SAL548.trim() == '') {
          this.form.mostrariva_SAL548 == 'N'
        }
        validarInputs(
          {
            form: "#validarmostrariva_548",
            orden: '1'
          }, this._evaluarunidadserv_sal548,
          () => {
            this.form.mostrariva_SAL548 = this.form.mostrariva_SAL548.toUpperCase()
            if (this.form.mostrariva_SAL548 == 'S' || this.form.mostrariva_SAL548 == '') {
              this._evaluarembarazo_sal548();
            } else {
              CON851('03', '03', this._evaluariva_sal548(), 'error', 'error');
            }
          }
        )
      } else {
        this.form.mostrariva_SAL548 = 'N'
        this._evaluarembarazo_sal548();
      }
    },
    _evaluarembarazo_sal548() {
      if (this.form.soloemb_SAL548.trim() == '') {
        this.form.soloemb_SAL548 = 'N'
      }
      validarInputs(
        {
          form: "#validarsoloemb_548",
          orden: '1'
        }, this._evaluarsucursal_sal548,
        () => {
          this.form.soloemb_SAL548 = this.form.soloemb_SAL548.toUpperCase()
          if (this.form.soloemb_SAL548 == 'S' || this.form.soloemb_SAL548 == 'N') {
            this._evaluaroperador_sal548();
          } else {
            CON851('03', '03', this._evaluarembarazo_sal548(), 'error', 'error');
          }
        }
      )
    },
    _evaluaroperador_sal548() {
      if (this.form.operador_SAL548.trim() == '') {
        this.form.operador_SAL548 = '****'
      }
      validarInputs(
        {
          form: "#validaroperador_548",
          orden: '1'
        }, this._evaluarembarazo_sal548,
        () => {
          if (this.form.operador_SAL548 == '****') {
            this.form.descripoperador_SAL548 = 'TODOS LOS OPERADORES'
            this._evaluardatosinhc_sal548();
          } else {
            this.SAL_548.OPER1W = this.form.operador_SAL548.substring(0, 3)
            this.SAL_548.OPER2W = this.form.operador_SAL548.substring(3, 4)
            if (this.SAL_548.OPER2W == '*') {
              this.form.descripoperador_SAL548 = 'GENERALIZA POR ' + this.SAL_548.OPER1W;
              this._evaluardatosinhc_sal548();
            } else {
              let URL = get_url("APP/CONTAB/CON003.DLL");
              postData({ datosh: datosEnvio() + this.form.operador_SAL548 }, URL)
                .then(data => {
                  data = data.split('|');
                  this.form.descripoperador_SAL548 = data[0].trim();
                  this._evaluardatosinhc_sal548();
                })
                .catch(err => {
                  console.debug(err);
                  this._evaluaroperador_sal548()
                })
            }
          }
        }
      )
    },
    _evaluardatosinhc_sal548() {
      if (this.form.solofacthc_SAL548.trim() == '') {
        this.form.solofacthc_SAL548 = 'N'
      }
      validarInputs(
        {
          form: "#validarfacthc_548",
          orden: '1'
        }, this._evaluaroperador_sal548,
        () => {
          this.form.solofacthc_SAL548 = this.form.solofacthc_SAL548.toUpperCase()
          if (this.form.solofacthc_SAL548 == 'S' || this.form.solofacthc_SAL548 == 'N') {
            this._evaluarcontrato_sal548();
          } else {
            CON851('03', '03', this._evaluardatosinhc_sal548(), 'error', 'error');
          }
        }
      )
    },
    _evaluarcontrato_sal548() {
      if (this.form.contrato_SAL548.trim() == '') {
        this.form.contrato_SAL548 = '9999'
      }
      validarInputs(
        {
          form: "#validarcontrato_548",
          orden: '1'
        }, this._evaluaroperador_sal548,
        () => {
          if (this.form.contrato_SAL548 == '9999') {
            this._evaluarsin99_sal548();
          } else {
            const res = this.sal548._contratos.find(e => e.CUENTA == this.form.contrato_SAL548);
            if (res == undefined) {
              CON851('01', '01', this._evaluarcontrato_sal548(), 'error', 'error');
            } else {
              this._evaluarsin99_sal548();
            }
          }
        }
      )
    },
    _evaluarsin99_sal548() {
      if (this.form.tipofact_SAL548 == '0') {
        $('#validarmostrarsin99_548').removeClass('hidden');
        validarInputs(
          {
            form: "#validarmostrarsin99_548",
            orden: '1'
          }, this._evaluarcontrato_sal548,
          () => {
            this.form.mostrarsin99_SAL548 = this.form.mostrarsin99_SAL548.toUpperCase()
            if (this.form.mostrarsin99_SAL548 == 'S' || this.form.mostrarsin99_SAL548 == 'N') {
              this._evaluarrefactura_sal548();
            } else {
              CON851('03', '03', this._evaluarsin99_sal548(), 'error', 'error');
            }
          }
        )
      } else {
        this.form.mostrarsin99_SAL548 = 'N'
        this._evaluarrefactura_sal548()
      }
    },
    _evaluarrefactura_sal548() {
      if (this.form.solorefact_SAL548.trim() == '') {
        this.form.solorefact_SAL548 = 'N'
      }
      validarInputs(
        {
          form: "#validarrefacturado_548",
          orden: '1'
        }, this._evaluarcontrato_sal548,
        () => {
          this.form.solorefact_SAL548 = this.form.solorefact_SAL548.toUpperCase()
          if (this.form.solorefact_SAL548 == 'S' || this.form.solorefact_SAL548 == 'N') {
            this._evaluarFechaAtencion_sal548();
          } else {
            CON851('03', '03', null, 'error', 'error');
            this._evaluarrefactura_sal548();
          }
        }
      )
    },

    _evaluarFechaAtencion_sal548(){
      if (this.form.fechaAten_SAL548.trim() == '') this.form.fechaAten_SAL548 = "N";
      
      validarInputs(
        { form: "#_evaluarFechaAtencion_sal548" },
        () => {
          this._evaluarrefactura_sal548();
        },
        () => {
          this.form.fechaAten_SAL548 = this.form.fechaAten_SAL548.toUpperCase()
          if (this.form.fechaAten_SAL548 == 'S' || this.form.fechaAten_SAL548 == 'N') {
            this._grabaropcion_sal548();
            // this.validar_formato()
          } else {
            CON851('03', '03', null, 'error', 'error');
            this-_evaluarFechaAtencion_sal548();
          }
        }
      );
    },
    // validar_formato() {
    //   const _this = this;

    //   POPUP({
    //     titulo: "FORMATO DE IMPRESIÓN",
    //     indices: [{ id: 'id', label: 'label' }],
    //     seleccion: this.tipo_impresion || '1',
    //     array: [
    //       { id: 1, label: 'EXCEL' },
    //       { id: 2, label: 'CSV' },
    //     ],
    //     callback_f: () => {
    //       setTimeout(() => {
    //         _this._evaluarrefactura_sal548()
    //       }, 300)
    //     },
    //   }, (data) => {
    //     _this.tipo_impresion = data.id
    //     setTimeout(_this._grabaropcion_sal548, 500)
    //   })
    // },
    async _grabaropcion_sal548() {
      this.SAL_548.FECHAACTUAL = moment().format('YYYY/MM/DD');
      this.SAL_548.ACTUAL = moment().format('YYYYMMDDHHmmss');
      this.SAL_548.HORAACTUAL = moment().format('HH:mm');

      if (this.form.tipofact_SAL548 == '0') this.form.articulo_SAL548 = this.form.articulo_SAL548.substring(3, 18);
      if (this.form.articulo_SAL548 == '' && this.form.grupo_SAL548.trim() == '**') this.form.articulo_SAL548 = '*'

      //  PROCESAMIENTO DE FECHAS
      let fecha_ini = this.SAL_548.FECHAINIW
      let fecha_fin = this.SAL_548.FECHAFINW
      let rango_fechas = rango_fecha_meses(fecha_ini, fecha_fin)
      console.log(rango_fechas)
      //

      let datos_envio = [
        '4',
        this.form.prefijo_SAL548 + this.form.facturacion_SAL548,
        null,
        null,
        this.form.solorefact_SAL548,
        this.form.sucursal_SAL548,
        this.form.tipofact_SAL548,
        this.form.compdroga_SAL548,
        this.form.mostrariva_SAL548,
        this.form.ocultarx_SAL548,
        this.form.finalidadcons_SAL548.substring(0, 2),
        this.form.causaext_SAL548.substring(0, 2),
        this.form.especialidad_SAL548,
        this.form.formapago_SAL548,
        this.form.unidadserv_SAL548,
        this.form.operador_SAL548,
        this.form.contrato_SAL548,
        this.form.costos_SAL548,
        this.form.soloemb_SAL548,
        this.form.solofacthc_SAL548,
        this.form.medicoejecutar_SAL548.substring(0, 1),
        this.form.medicos_SAL548,
        this.form.entidades_SAL548,
        this.form.actividad_SAL548,
        this.form.mostrarpor_SAL548.substring(0, 1),
        this.form.mostraresp_SAL548,
        this.form.grupo_SAL548,
        this.form.articulo_SAL548,
        this.form.division_SAL548,
        this.form.nivel_SAL548,
        this.form.discricod_SAL548,
        this.form.tipoafil_SAL548.substring(0, 1),
        this.form.pais_SAL548,
        this.form.fechaAten_SAL548,
        localStorage.Usuario,
        ''
      ]

      let consulta_general = []
      this.estado_loader = true;
      for (const fecha of rango_fechas) {
        this.label_loader = `Procesando mes: ${fecha.label.toUpperCase()}`;

        datos_envio[2] = fecha.ini
        datos_envio[3] = fecha.fin
        let data = await this.procesar_envio(datos_envio)
        consulta_general = consulta_general.concat(data)
        this.progreso = { transferred: 0, speed: 0 }
      }

      this.loader = false
      this.label_loader = `GENERANDO IMPRESIÓN...`;
      this.progreso.completado = true
      if(consulta_general.length > 0) {
        setTimeout(() => { this.format_csv(consulta_general) }, 700)
      } else {
        CON851("", "No se encontraron datos", null, "warning", "");
        _toggleNav();
      }
    },
    format_csv(datos) {
      console.log(datos, "datos")
      _impresion2({
        tipo: 'csv',
        datos: datos,
        columnas: false
      })
        .then(() => {
          this.estado_loader = false
          CON851(
            "",
            "Impreso Correctamente",
            null,
            "success",
            "Exito"
          );

          _toggleNav()
        })
        .catch(() => {
          this.estado_loader = false
          CON851('', 'Ha ocurrido un error generando la impresión.', null, 'error', 'Error')
          this._evaluarFechaAtencion_sal548()
        })
    },
    procesar_envio(datos_envio) {
      const _this = this
      return new Promise((resolve) => {
        let URL = get_url("APP/SALUD/SAL548_V2.DLL");
        postData({
          datosh: datosEnvio() + datos_envio.join('|')
        }, URL, {
          onProgress: (progress) => {
            _this.progreso = progress;
          }
        })
          .then(data => {
            data = data.CONSULTA
            data.pop()
            resolve(data)
          })
          .catch(err => {
            console.error('Ha ocurrido un error durante la consulta:', err)
            resolve([])
          })
      })
    },
    // format_impresion(data) {
    //   let columnas = [
    //     {
    //       title: "Codigo",
    //       value: 'COD_ART',
    //     },
    //     {
    //       title: "Espec",
    //       value: 'ESPEC',
    //     },
    //     {
    //       title: "Especialidad",
    //       value: 'DESCRIPESP',
    //     },
    //     {
    //       title: "Comprob o Factura",
    //       value: 'LLAVE',
    //     },
    //     {
    //       title: "Descripcion",
    //       value: 'DESCRIP',
    //     },
    //     {
    //       title: "Factura",
    //       value: 'CTA',
    //     },
    //     {
    //       title: "descrip cuenta",
    //       value: 'DESCRIP_CTA',
    //     },
    //     {
    //       title: "Cod modalidad",
    //       value: 'ZONA_TER',
    //       format: 'string',
    //     },
    //     {
    //       title: "Modalidad",
    //       value: 'DESCRIPZONA_TER',
    //     },
    //     {
    //       title: "Tipo capita",
    //       value: 'TIPO_CAPIT',
    //     },
    //     {
    //       title: "Puerta",
    //       value: 'PUERTA',
    //     },
    //     {
    //       title: "Cantidad",
    //       value: 'CANT',
    //     },
    //     {
    //       title: "Valor ventas",
    //       value: 'VALOR_FACT',
    //       format: 'money',
    //     },
    //     {
    //       title: "Valor iva",
    //       value: 'VLR_IVA',
    //       format: 'money',
    //     },
    //     {
    //       title: "Puerta urg",
    //       value: '"PUERTA_UR',
    //     },
    //     {
    //       title: "Vlr urgencias",
    //       value: 'VLR_UR',
    //       format: 'money',
    //     },
    //     {
    //       title: "Puerta ex",
    //       value: 'PUERTA_EX',
    //     },
    //     {
    //       title: "Puerta ho",
    //       value: 'PUERTA_HO',
    //     },
    //     {
    //       title: "Vlr hosp",
    //       value: 'VALOR_HO',
    //       format: 'money',
    //     },
    //     {
    //       title: "Fecha",
    //       value: 'FECHA_FACT',
    //       format: 'fecha',
    //     },
    //     {
    //       title: "Hora ing",
    //       value: 'HORA_ING',
    //       format: "string"
    //     },
    //     {
    //       title: "Hora sal",
    //       value: 'HORA_SAL',
    //       format: "string"
    //     },
    //     {
    //       title: "C.costo",
    //       value: 'COSTO',
    //       format: "string"
    //     },
    //     {
    //       title: "Finalidad",
    //       value: 'FINALID',
    //     },
    //     {
    //       title: "Causa",
    //       value: 'CAUSA',
    //     },
    //     {
    //       title: "Unidad",
    //       value: 'UNIDAD',
    //     },
    //     {
    //       title: "Tipo proced",
    //       value: 'TIPO_PROC',
    //       format: "string"
    //     },
    //     {
    //       title: "Id paci",
    //       value: 'ID_PAC',
    //     },
    //     {
    //       title: "1er Apellido",
    //       value: '1ER_APEL',
    //     },
    //     {
    //       title: "2do apellido",
    //       value: '2DO_APEL',
    //     },
    //     {
    //       title: "1er nombre",
    //       value: '1ER_NOMB',
    //     },
    //     {
    //       title: "2do nombre",
    //       value: '2DO_NOMB',
    //     },
    //     {
    //       title: "Tipo id",
    //       value: 'TIPOID_PACI',
    //     },
    //     {
    //       title: "Clasif",
    //       value: 'CLASIF_PACI',
    //     },
    //     {
    //       title: "Edad",
    //       value: 'EDAD_PACI',
    //     },
    //     {
    //       title: "Ciudad",
    //       value: 'DESCRIPCIU_PACI',
    //     },
    //     {
    //       title: "Ocupacion",
    //       value: 'OCUP_PACI',
    //     },
    //     {
    //       title: "Descrip Ocupacion",
    //       value: 'DESCROCUP_PACI',
    //     },
    //     {
    //       title: "Telefono paci",
    //       value: 'TELEFONO_PACI',
    //     },
    //     {
    //       title: "Sexo paci",
    //       value: 'SEXO_PACI',
    //     },
    //     {
    //       title: "Estado civil",
    //       value: 'ESTCIV_PACI',
    //     },
    //     {
    //       title: "Fecha nacim",
    //       value: 'FECHANAC_PACI',
    //       format: 'fecha',
    //     },
    //     {
    //       title: "Zona",
    //       value: 'ZONA_PACI',
    //     },
    //     {
    //       title: "Direccion paci",
    //       value: 'DIRECC_PACI',
    //     },
    //     {
    //       title: "Etnia paci",
    //       value: 'ETNIA_PACI',
    //     },
    //     {
    //       title: "Regimen",
    //       value: 'REG_PACI',
    //     },
    //     {
    //       title: "Lab paci",
    //       value: 'EMPRE_PACI',
    //     },
    //     {
    //       title: "Dispac paci",
    //       value: 'DISCAP_PACI',
    //     },
    //     {
    //       title: "Etnia paci",
    //       value: 'GRUPOETNIA_PACI',
    //     },
    //     {
    //       title: "Nivel estudio",
    //       value: 'NIVEST_PACI',
    //     },
    //     {
    //       title: "Contrato paci",
    //       value: 'CONTRATO_PACI',
    //     },
    //     {
    //       title: "Cod eps paci",
    //       value: 'CODEPS_PACI',
    //     },
    //     {
    //       title: "Nombre eps paci",
    //       value: 'NOMBEPS_PACI',
    //     },
    //     {
    //       title: "Diag 1",
    //       value: 'ENF1',
    //     },
    //     {
    //       title: "Nombre Diag 1",
    //       value: 'DESCRIPENF1',
    //     },
    //     {
    //       title: "Diag 2",
    //       value: 'ENF2',
    //     },
    //     {
    //       title: "Diag 3",
    //       value: 'ENF3',
    //     },
    //     {
    //       title: "Tipo diag",
    //       value: 'TIPO_DIAG',
    //     },
    //     {
    //       title: "Peso",
    //       value: 'PESO',
    //     },
    //     {
    //       title: "Talla",
    //       value: 'TALLA',
    //     },
    //     {
    //       title: "Imc",
    //       value: 'IMC',
    //     },
    //     {
    //       title: "Entidad",
    //       value: 'ENTIDAD',
    //     },
    //     {
    //       title: "Cod ent",
    //       value: 'COD_ENT',
    //     },
    //     {
    //       title: "Id medico",
    //       value: 'ID_MED',
    //     },
    //     {
    //       title: "Medico",
    //       value: 'NOMBRE_MEDICO',
    //     },
    //     {
    //       title: "Operario",
    //       value: 'OPER',
    //     },
    //     {
    //       title: "Operario corrección",
    //       value: 'OPER_CORRE',
    //     },
    //     {
    //       title: "Fecha elab",
    //       value: 'FECHA_ELAB',
    //       format: 'fecha',
    //     },
    //     {
    //       title: "Nivel",
    //       value: 'NIVEL',
    //     },
    //     {
    //       title: "Grupo quir",
    //       value: 'GRUPO_QUIR',
    //     },
    //     {
    //       title: "T. afiliado",
    //       value: 'TIPO_AFIL',
    //       format: 'fecha',
    //     },
    //     {
    //       title: "Fecha aten",
    //       value: 'FECHA_ATEN',
    //       format: 'fecha',
    //     },
    //     {
    //       title: "Nro autorizacion",
    //       value: 'NOR_AUTOR',
    //     },
    //     {
    //       title: "Estado embarazo",
    //       value: 'TRIM_EMBAR',
    //     },
    //     {
    //       title: "Valor bruto",
    //       value: 'VLR_BRUTO',
    //       format: 'money',
    //     },
    //     {
    //       title: "Valor rbo",
    //       value: 'VLR_RBO',
    //       format: 'money',
    //     },
    //     {
    //       title: "Valor not",
    //       value: 'VLR_NOT',
    //       format: 'money',
    //     },
    //     {
    //       title: "Cta",
    //       value: 'CTA_CONTAB',
    //     },
    //     {
    //       title: "tipo copago",
    //       value: 'TIPO_COPAGO',
    //     },
    //     {
    //       title: "descrip copago",
    //       value: 'DECRIP_COPAGO',
    //     },
    //     {
    //       title: "Vlr copago",
    //       value: 'VLR_COPAGO',
    //       format: 'money',
    //     },
    //     {
    //       title: "ALmacen",
    //       value: 'ALMACEN',
    //     },
    //     {
    //       title: "Estado fact",
    //       value: 'ESTADO',
    //     },
    //     {
    //       title: "Fecha ing",
    //       value: 'FECHA_ING',
    //       format: 'fecha',
    //     },
    //     {
    //       title: "Fecha ret",
    //       value: 'FECHA_RET',
    //       format: 'fecha',
    //     },
    //     {
    //       title: "Fecha pre",
    //       value: 'FECHA_PRE',
    //       format: 'fecha',
    //     },
    //     {
    //       title: "Convenio",
    //       value: 'CONVENIO',
    //     },
    //     {
    //       title: "cod Envio",
    //       value: 'COD_ENVIO',
    //     },
    //     {
    //       title: "Marca art",
    //       value: 'MARCA_ART',
    //     },
    //     {
    //       title: "Ref art",
    //       value: 'REF_ART',
    //     },
    //     {
    //       title: "Unidad art",
    //       value: 'UNID_ART',
    //     },
    //     {
    //       title: "ATC art",
    //       value: 'ATC',
    //     },
    //     {
    //       title: "Ref atc",
    //       value: 'REF_ATC',
    //     },
    //     {
    //       title: "Principio atc",
    //       value: 'PRINC_ACT',
    //     },
    //     {
    //       title: "Tipo dr",
    //       value: 'TIPO_DR',
    //     },
    //     {
    //       title: "Tipo comp",
    //       value: 'COMP_DR',
    //     },
    //     {
    //       title: "Contrato fact",
    //       value: 'CONTRATO_NUM',
    //     },
    //     {
    //       title: "Codigo CUM",
    //       value: 'CUM',
    //     },
    //     {
    //       title: "Invima",
    //       value: 'INVIMA',
    //     },
    //     {
    //       title: "Dias trat",
    //       value: 'DIAS_TRATA',
    //     },

    //     {
    //       title: "Detalle fact",
    //       value: 'DETALLE',
    //     },
    //     {
    //       title: "Lote prosoft",
    //       value: 'COD_LOTE',
    //     },
    //     {
    //       title: "Lote power",
    //       value: 'LOTE_MEDIPO',
    //     },

    //     {
    //       title: "Peso nacido",
    //       value: 'PESO_NAC',
    //     },
    //     {
    //       title: "Talla nacido",
    //       value: 'TALLA_NAC',
    //     },
    //     {
    //       title: "Fecha nacido",
    //       value: 'FECHA_NAC',
    //       format: 'fecha',
    //     },
    //     {
    //       title: "Sexo nacido",
    //       value: 'SEXO_NAC',
    //     },
    //     {
    //       title: "Edad gest",
    //       value: 'GESTAC_NACI',
    //     },

    //     {
    //       title: "Pais Origen",
    //       value: 'DESCRIP_PAIS',
    //     },
    //     {
    //       title: "Fecha ini aut",
    //       value: 'FECHA_ING_AUT',
    //       format: 'fecha',
    //     },
    //     {
    //       title: "Hora ini aut",
    //       value: 'HORA_ING_AUT',
    //     },
    //     {
    //       title: "Fecha ret aut",
    //       value: 'FECHA_RET_AUT',
    //       format: 'fecha',
    //     },
    //     {
    //       title: "Hora ret aut",
    //       value: 'HORA_RET_AUT',
    //     },
    //     {
    //       title: "Regimen factura",
    //       value: 'REGIMEN',
    //     },
    //   ]

    //   _impresion2({
    //     tipo: 'excel',
    //     header: [
    //       {
    //         text: `${$_USUA_GLOBAL[0].NOMBRE}` + 'NIT: ' + `${$_USUA_GLOBAL[0].NIT}` + ' ' + this.form.decripmedicos_SAL548 + ' Opc: 954141',
    //         bold: true,
    //         size: 16
    //       },
    //       `RESUMEN DE TIPO: ` + this.form.descriptipofact_SAL548 + ' ' + this.form.descripentidades_SAL548 + ' DESDE: ' + this.SAL_548.FECHAINIW + ' HASTA: ' + this.SAL_548.FECHAFINW + ' ' + this.form.descripcosto_SAL548,
    //       `FORMA DE PAGO: ` + this.form.descripformapago_SAL548 + ' Imp: ' + this.SAL_548.FECHAACTUAL + ' Hora:' + this.SAL_548.HORAACTUAL + ' Factura: ' + this.form.prefijo_SAL548 + this.form.facturacion_SAL548
    //     ],
    //     logo: `${$_USUA_GLOBAL[0].NIT}.png`,
    //     // ruta_logo: 'C:\\PROSOFT\\LOGOS\\',
    //     tabla: {
    //       columnas,
    //       data: data,
    //     },
    //     archivo: `LISTADO-DE-RESUMEN-${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`,
    //   })
    //     .then(() => {
    //       this.estado_loader = false
    //       CON851(
    //         "",
    //         "Impreso Correctamente",
    //         null,
    //         "success",
    //         "Exito"
    //       );

    //       _toggleNav()
    //     })
    //     .catch(() => {
    //       this.estado_loader = false
    //       CON851('', 'Ha ocurrido un error generando la impresión.', null, 'error', 'Error')
    //       this._evaluarrefactura_sal548()
    //     })
    // },

    _f8medicos_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE PROFESIONALES",
        columnas: ["NOMBRE", "IDENTIFICACION"],
        data: $_this.sal548._profesionales,
        callback_esc: function () {
          $(".medicos_SAL548").focus()
        },
        callback: function (data) {
          $_this.form.medicos_SAL548 = data.IDENTIFICACION
          _enterInput('.medicos_SAL548');
        }
      });

    },
    _f8costos_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
        columnas: ["COD", "NOMBRE"],
        data: $_this.sal548._costos,
        callback_esc: function () {
          $(".costos_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.costos_SAL548 = data.COD.trim();
          _enterInput(".costos_SAL548");
        },
      });
    },
    _f8operador_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: "GRUPOS DE OPERADORES",
        columnas: ["CODIGO", "DESCRIPCION", "ID"],
        data: $_this.sal548._operador,
        callback_esc: function () {
          $(".operador_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.operador_SAL548 = data.CODIGO.trim();
          _enterInput(".operador_SAL548");
        },
      });
    },
    _f8tiposerv_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: "TIPO DE SERVICIO",
        columnas: ["COD", "DESCRIPCION"],
        data: $_this.sal548._servicios,
        callback_esc: function () {
          $(".tipofact_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.tipofact_SAL548 = (data.COD)
          _enterInput('.tipofact_SAL548');
        }
      });

    },
    _f8formapago_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: "FORMAS DE PAGO",
        columnas: ["COD", "DESCRIP"],
        data: $_this.sal548._formapago,
        callback_esc: function () {
          $(".formapago_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.formapago_SAL548 = (data.COD)
          _enterInput('.formapago_SAL548');
        }
      });

    },
    _f8grupo_SAL548() {
      var $_this = this;
      if ($_this.form.tipofact_SAL548 == '0') {
        _ventanaDatos({
          titulo: "VENTANA DE GRUPOS",
          columnas: ["TIPO", "GRUPO", "DESCRIP"],
          data: $_this.SAL_548.GRUPOS,
          callback_esc: function () {
            $(".grupo_SAL548").focus();
          },
          callback: function (data) {
            $_this.form.grupo_SAL548 = data.GRUPO.trim()
            _enterInput('.grupo_SAL548');
          }
        });
      } else {
        _ventanaDatos({
          titulo: "VENTANA DE GRUPOS DE SERVICIOS",
          columnas: ["COD", "DESCRIP"],
          data: $_this.sal548._gruposer,
          callback_esc: function () {
            $(".grupo_SAL548").focus();
          },
          callback: function (data) {
            $_this.form.grupo_SAL548 = data.COD.trim()
            _enterInput('.grupo_SAL548');
          }
        });

      }
    },
    _f8entidades_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE ENTIDADES',
        columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
        // label: ["codigo", "nombre"],
        data: $_this.sal548._entidades,
        callback_esc: function () {
          $(".entidad_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.entidades_SAL548 = data["COD-ENT"]
          _enterInput('.entidad_SAL548');
        }
      });
    },
    _f8actividad_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE ACTIVIDADES',
        columnas: ["COD", "DESCRIP"],
        data: $_this.sal548._actividades,
        callback_esc: function () {
          $(".actividad_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.actividad_SAL548 = data.COD
          _enterInput('.actividad_SAL548');
        }
      });
    },
    _f8contratos_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CONTROL CONTRATOS",
        columnas: ["CUENTA", "NIT", 'DESCRIP', 'ESTADO'],
        data: $_this.sal548._contratos,
        callback_esc: function () {
          $(".contratos_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.contrato_SAL548 = data.CUENTA;
          _enterInput('.contratos_SAL548');
        }
      });

    },
    _f8articulo_SAL548() {
      var $_this = this;
      if ($_this.form.tipofact_SAL548 == '0') {
        _ventanaDatos({
          titulo: 'VENTANA DE ARTICULOS',
          columnas: ['LLAVE_ART', 'DESCRIP_ART'],
          data: $_this.SAL_548.FILTROARTICULOS,
          callback_esc: function () {
            $(".articulo_SAL548").focus();
          },
          callback: function (data) {
            $_this.form.articulo_SAL548 = data.LLAVE_ART
            _enterInput('.articulo_SAL548');
          }
        });
      } else {
        _ventanaDatos({
          titulo: "VENTANA DE CODIGOS CUPS",
          columnas: ["LLAVE", "DESCRIP"],
          data: $_this.sal548._cups,
          callback_esc: function () {
            $(".articulo_SAL548").focus();
          },
          callback: function (data) {
            $_this.SAL_548.LLAVECUPS = data.LLAVE.trim()
            $_this.SAL_548.GRUPO_71G = $_this.SAL_548.LLAVECUPS.substring(0, 2);
            $_this.SAL_548.CUPS_71G = $_this.SAL_548.LLAVECUPS.substring(2, 12);
            $_this.form.articulo_SAL548 = $_this.SAL_548.CUPS_71G
            $_this.form.grupo_SAL548 = $_this.SAL_548.GRUPO_71G
            _enterInput('.articulo_SAL548');
          }
        });
      }
    },
    _f8especialidad_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE ESPECIALIDADES',
        columnas: ["CODIGO", "NOMBRE"],
        data: $_this.sal548._especilidad,
        callback_esc: function () {
          $(".especialidad_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.especialidad_SAL548 = data.CODIGO
          _enterInput('.especialidad_SAL548');
        }
      });
    },
    _f8division_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE DIVISION",
        columnas: ["COD", "DESCRIP"],
        data: $_this.sal548._division,
        callback_esc: function () {
          $(".division_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.division_SAL548 = data.COD.trim();
          _enterInput('.division_SAL548');
        }
      });

    },
    _f8pais_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA PAIS RIPS',
        columnas: ["CODIGO", "DESCRIP"],
        data: $_this.sal548._pais,
        callback_esc: function () {
          $(".pais_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.pais_SAL548 = data.CODIGO;
          _enterInput('.pais_SAL548');
        }
      });
    },
    _f8unidadserv_SAL548() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA UNIDADES DE SERVICIO',
        data: $_this.sal548.UNIDSERVICIO,
        columnas: ["COD", "DESCRIP", "DESCRIPEST"],
        callback_esc: function () {
          $(".unidadserv_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.unidadserv_SAL548 = data.DESCRIP.substring(0,2);
          _enterInput('.unidadserv_SAL548');
        }
      });

    },
    _f8sucursal_SAL548() {

      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE SUCURSALES',
        data: $_this.sal548._sucursal,
        columnas: ["ALMACEN", "CODIGO", "DESCRIPCION"],
        callback_esc: function () {
          $(".surcusal_SAL548").focus();
        },
        callback: function (data) {
          $_this.form.sucursal_SAL548 = data.COD;
          _enterInput('.surcusal_SAL548');
        }
      });

    },
    _f8facturacion_SAL548() {
      var $_this = this;
      parametros = {
        dll: 'NUMERACION',
        valoresselect: ['Nombre del tercero', 'buscar paciente'],
        f8data: 'NUMERACION',
        columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
        callback: (data) => {
          $_NROW = data.COD;
          $_NROW = $_NROW.substring(1, 7)
          $_this.form.facturacion_SAL548 = $_NROW;
          _enterInput('.numeracion_SAL548');
        },
        cancel: () => {
          _enterInput('.numeracion_SAL548');
        }
      };
      F8LITE(parametros);
    }
  },
});
