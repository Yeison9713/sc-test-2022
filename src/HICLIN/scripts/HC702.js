
// CREACION - SANTIAGO.F - OCTUBRE 22/2020

var $this;
var $_HC702 = [];
var unser_w;
var array_702R = [];
var tipo_epi;
var secu_epi_w;

var opc_evo_w;

var tipo_epi_w;
var sw_epi_w;

var aiepi_w;

var array_702A = [];

  new Vue({
    el: '#HC702',
    data: {
      form: {
        descripMedico_702: '',
        cargo_702: '',
        unser_702: '',
        folio_702: '',
        año_702: '',
        mes_702: '',
        dia_702: '',
        hora_702: '',
        procedencia_702: '',
        motivo_702: '',
      },

      fecha_act: moment().format('YYYYMMDD'),
      dataArray: new Object(),
      data_evo: new Object(),
      dataBase64: []
    },
    async created() {
      await this.cargarArchivos();
    },
    methods: {
      _inicializar() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('7-2 - Imprime Epicrisis, remision');
        $this = this;
        this.init_HC003A();
      },

      async init_HC003A() {
        this.validarInputs();
        this.llenarDatosFecha();
      },

      validarInputs() {
        $this.form.descripMedico_702 = $_REG_PROF.NOMBRE;

        $this.form.cargo_702 = $_REG_PROF.IDENTIFICACION;

        var cod_unser = $_REG_HC.unser_hc;
        const unserv = $_HC702._unserv.find(e => e['COD'] == cod_unser);
        $this.form.unser_702 = cod_unser + ' - ' + unserv.DESCRIP;

        unser_w = unserv.DESCRIP;

        $this.form.folio_702 = $_REG_HC.suc_folio_hc.concat($_REG_HC.nro_folio_hc);
      },

      llenarDatosFecha() {
        $this = this;

        $this.form.año_702 = parseInt($_HC702._hcprc.fecha.substring(0, 4));
        $this.form.mes_702 = parseInt($_HC702._hcprc.fecha.substring(4, 6));
        $this.form.dia_702 = parseInt($_HC702._hcprc.fecha.substring(6, 8));

        $this.form.hora_702 = $_HC702._hcprc.hora.substring(0, 2) + ':' + $_HC702._hcprc.hora.substring(2, 4);

        $this.form.procedencia_702 = $_HC702._hcprc.proceden;

        $this.form.motivo_702 = $_HC702._hcprc.motivo;

        document.getElementById("procedencia_702").value = $_HC702._hcprc.proceden.toUpperCase();
        document.getElementById("motivo_702").value = $_HC702._hcprc.motivo.toUpperCase();

        $this.enf_act_hc = $_HC702.detalles.find(e => e['COD-DETHC'] == '1001' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
        if ($this.enf_act_hc != undefined) {
          $this.enf_act_hc = $this.enf_act_hc.DETALLE;
          $this.enf_act_hc = $this.enf_act_hc.replace(/\&/g, "\n").trim()
          $this.enf_act_hc = $this.enf_act_hc.replace(/\�/g, "Ñ");
        }

        this.enf_act_hc != undefined ? document.getElementById("motivo2_702").value = this.enf_act_hc.toUpperCase() : false;

        this._ventanaEpicrisis();
      },



      _ventanaEpicrisis() {
        $this = this;
        _ventanaDatos({
          titulo: "FORMATO DE H.C " + $_REG_HC.llave_hc,
          columnas: ["CTA_J", "NOM_J", "FECHA_J", "TIPO_J"],
          data: $_HC702._epicrisis,
          callback_esc: function () {
            _regresar_menuhis();
          },
          callback: function (data) {
            secu_epi_w = data.CTA_J;
            tipo_epi = data.TIPO_J;
            array_702R.titulo_epi = data.TITULO_J;
            array_702R.tipo_epi = data.TIPO_J;
            array_702R.fecha_epi = data.FECHA2_J;
            array_702R.hora_epi = data.HORA_J;
            array_702R.edad = $_HC702._hcprc.edad;
            array_702R.acompa_epi = data.ACOMPA_J;
            array_702R.unser_descrip = unser_w;
            array_702R.espec_ref = data.ESPEC_REF_J;
            array_702R.reng_epi = data.TABLA_EPI ? data.TABLA_EPI.trim() : ''; 
            array_702R.plan_epi = data.PLAN_EPI ? data.PLAN_EPI.trim() : '';
            array_702R.result_proced_diag_epi = data.RESULT_PROCED_DIAG_EPI ? data.RESULT_PROCED_DIAG_EPI.trim() : '';
            array_702R.diag_egr = data.DIAGNOS;
            array_702R.cl_macro = data.CL_MACRO_J;
            array_702R.cod_macro = data.COD_MACRO_J;
            array_702R.via_j = data.VIA_J;
            array_702R.oper_elab_j = data.OPER_ELAB_J;
            array_702R.medico = data.MED_J;
            if ($_REG_HC.estado_hc == "1") {
              CON851('1B', '1B', null, 'error', 'error');
              if (tipo_epi == "1" && $_USUA_GLOBAL[0].NIT == 800037021) {
                _regresar_menuhis();
              } else {
                $this.confirmar_HC702();
              }
            } else {
              $this.confirmar_HC702();
            }
          }
        });
      },




      confirmar_HC702() {
        $this = this;

        CON851P('00',
          () => {
            _regresar_menuhis()
          },
          () => {
            setTimeout(
              () => {

                if (tipo_epi == '2' || tipo_epi == '3') {
                  _iniciarHC702R(array_702R);
                } else {
                  switch ($_REG_HC.clase_hc) {
                    case '1':
                      aiepi_w = '1';
                      // si aiepi es 1 llama el aiepi02e que es el de menor a 2meses
                      this.continue_HC702();
                      break;
                    case '2':
                      aiepi_w = '2';
                      this.continue_HC702();
                      break;
                    default:
                      aiepi_w = '0';
                      this.continue_HC702();
                      break;
                  }
                }
              }, 300)
          });
      },

      async continue_HC702() {
        await this.llamarArchivoEpi_HC702();
        await this.buscarEpicrisis_HC702();
      },

      async buscarEpicrisis_HC702() {
        $this = this;

        tipo_epi_w = $_HC702._datos[0]['TIPO_EPI_J'];
        sw_epi_w = $_HC702._datos[0]['SW_EPI_J'];

        console.log(tipo_epi_w);
        console.log(sw_epi_w);

        console.log("aqui:", aiepi_w)

        if ($_USUA_GLOBAL[0].NIT == 892000264) {
          if (localStorage.Usuario == "APCF" || localStorage.Usuario == "LYRC") {
            if (aiepi_w == '0') {
              if (sw_epi_w.trim() == '') {
                await this.seleccionMetodo_HC702();
              } else if (sw_epi_w == '2') {
                opc_evo_w = "S";
                this.procesos_HC702();
              }
            }
    
            if (aiepi_w == '1' || aiepi_w == '2') {
              // si aiepi es 1 llama el aiepi02e que es el de menor a 2meses
              if (sw_epi_w.trim() == '') {
                await this.seleccionMetodo_HC702();
              } else if (sw_epi_w == '2') {
                opc_evo_w = "S";
                this.procesos_HC702();
              }
            }
          } else {
            if (aiepi_w == '0') {
              if (sw_epi_w.trim() == '') {
                // await this.seleccionMetodo_HC702();
                _iniciarHCI107(array_702R);
              } else if (sw_epi_w == '2') {
                opc_evo_w = "S";
                this.procesos_HC702();
              }
            }
    
            if (aiepi_w == '1' || aiepi_w == '2') {
              // si aiepi es 1 llama el aiepi02e que es el de menor a 2meses
              if (sw_epi_w.trim() == '') {
                // await this.seleccionMetodo_HC702();
                _iniciarHCI107(array_702R);
              } else if (sw_epi_w == '2') {
                opc_evo_w = "S";
                this.procesos_HC702();
              }
            }
          }
        } else {
          if (aiepi_w == '0') {
            if (sw_epi_w.trim() == '') {
              await this.seleccionMetodo_HC702();
            } else if (sw_epi_w == '2') {
              opc_evo_w = "S";
              this.procesos_HC702();
            }
          }
  
          if (aiepi_w == '1' || aiepi_w == '2') {
            // si aiepi es 1 llama el aiepi02e que es el de menor a 2meses
            if (sw_epi_w.trim() == '') {
              await this.seleccionMetodo_HC702();
            } else if (sw_epi_w == '2') {
              opc_evo_w = "S";
              this.procesos_HC702();
            }
          }
        }

      },

      seleccionMetodo_HC702() {
        var fuente = '<div>' +
          '<div class="col-md-12">' +
          '<div class="portlet light no-padding">' +
          '<div class="portlet-body no-padding">' +
          '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

          '<div class="col-md-12" style="display: flex" id="divVentanaFecha_HC003A">' +

          '<div class="col-md-2">' +
          '</div>' +

          '<div class="col-md-8">' +
          '<div class="col-md-12 col-sm-12 col-xs-12">' +
          '<div class="inline-inputs">' +
          '<label class="col-md-12 col-sm-8 col-xs-12">1. Imprimir resumen digitado por medico</label>' +
          '</div>' +
          '</div>' +
          '</div>' +

          '<div class="col-md-2">' +
          '</div>' +

          '</div>' +


          '<div class="salto-linea"></div>' +


          '<div class="col-md-12" style="display: flex" id="divVentanaFecha_HC003A">' +

          '<div class="col-md-2">' +
          '</div>' +

          '<div class="col-md-8">' +
          '<div class="col-md-12 col-sm-12 col-xs-12">' +
          '<div class="inline-inputs">' +
          '<label class="col-md-12 col-sm-8 col-xs-12">2. Resumen extraido por el sistema</label>' +
          '</div>' +
          '</div>' +
          '</div>' +

          '<div class="col-md-2">' +
          '</div>' +

          '</div>' +


          '<div class="salto-linea"></div>' +


          '<div class="col-md-12" style="display: flex" id="divVentanaFecha_HC003A">' +

          '<div class="col-md-2">' +
          '</div>' +

          '<div class="col-md-8">' +
          '<div class="col-md-12 col-sm-12 col-xs-12">' +
          '<div class="inline-inputs">' +
          '<label class="col-md-10 col-sm-8 col-xs-12">Que metodo de resumen desea:</label>' +
          '<div class="input-group col-md-2 col-sm-5 col-xs-5" id="metodo_HC702">' +
          '<input id="metodo_702" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="1" data-orden="1" required="true">' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +

          '<div class="col-md-2">' +
          '</div>' +

          '</div>' +


          '<div class="salto-linea"></div>' +
          '<div class="salto-linea"></div>' +
          '<div class="salto-linea"></div>' +

          '</div>' +

          '</div>' +
          '</div>' +
          '</div>' +
          '<div style="clear:both;"></div>' +
          '</div>'

        $this.ventanaInicial = bootbox.dialog({
          title: 'SELECCIONAR METODO',
          message: fuente,
          closeButton: false,
          buttons: {
            main: {
              label: "Aceptar",
              className: "blue hidden",
              callback: function () {

              }
            }
          },
        });

        $this.ventanaInicial.on('shown.bs.modal', async function (e) {
          $('.modal-content').css({ 'width': '750px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })

          $this.datoVentana_HC702();
        })
      },

      async datoVentana_HC702() {
        $this = this
        validarInputs(
          {
            form: "#metodo_HC702",
            orden: "1"
          },
          () => {
            $('[data-bb-handler="main"]').click()
            _regresar_menuhis();
          },
          () => {
            sw_epi_w = document.getElementById("metodo_702").value;

            if (sw_epi_w != '1' && sw_epi_w != '2') {
              CON851('03', '03', null, 'error', 'error');
              this.datoVentana_HC702();
            } else {
              switch (sw_epi_w) {
                case '1':
                  $('[data-bb-handler="main"]').click();
                  // si selecciona 1 imprime el hci07 que es resumen de historia

                  if (aiepi_w == '1' || aiepi_w == '2') {
                    this.procesos_HC702();
                  } else {
                    _iniciarHCI107(array_702R);
                  }

                  // this.procesos_HC702();
                  // opc_evo_w = "N";
                  break;
                case '2':
                  $('[data-bb-handler="main"]').click();
                  opc_evo_w = "S";
                  this.procesos_HC702();
                  break;
                default:
                  this.datoVentana_HC702();
                  break;
              }
            }
          }
        )
      },

      async procesos_HC702() {
        $this = this;
        loader('show');

        $this.fechadesde = $_REG_HC.fecha_hc;
        $this.fechahasta = $this.fecha_act;

        if (aiepi_w == '0') {
          array_702A.tipo_epi_w = tipo_epi_w;
          array_702A.sw_epi_w = sw_epi_w;
          array_702A.sw_espec = $_HC702.sw_espec;

          await _iniciarHC702A(array_702A);
        }

        if (aiepi_w == '2') {
          await this.llamarAIEPI010_HC702();
          await this.salir_HC702();
        }

        if (aiepi_w == '1') {
          // si aiepi es 1 llama el aiepi02e que es el de menor a 2meses
          await this.llamarAIEPI020_HC702();
          await this.salir_HC702();
        }
      },

      async llamarAIEPI010_HC702() {
        $this.crearJsonOpc();
        $this.dataBase64 = await iniciar_AIEPI010($this.opcionesHC702, $this.arrayDatos);
      },

      async llamarAIEPI020_HC702() {
        $this.crearJsonOpc();
        $this.dataBase64 = await iniciar_AIEPI020($this.opcionesHC702, $this.arrayDatos);
      },

      crearJsonOpc() {
        $this.opcionesHC702 = {
          opc_aper: "S",
          opc_evo: opc_evo_w,
          opc_enf: "N",
          opc_ter: "N",
          opc_for: "N",
          opc_lab: "N",
          opc_ima: "N",
          opc_ord: "N",
          opc_con: "N",
          opc_inc: "N",
          opc_resu: "N",
          fecha_ini_opc: $this.fechadesde,
          fecha_fin_opc: $this.fechahasta,
          opc_macro: ""
        },

          $this.arrayDatos = {
            _ciudades: $_HC702._ciudades,
            _entidades: $_HC702._entidades,
            _ocupaciones: $_HC702._ocupaciones,
            reg_pac: $_HC702.reg_pac,
            _profesionales: $_HC702._profesionales,
            _unserv: $_HC702._unserv,
            _paisesRips: $_HC702._paisesRips,
            _hcpac: $_HC702._hcprc,
            _especialidades: $_HC702._especialidades,
            _detalles: $_HC702.detalles,
            $_reg_hc: $_REG_HC,
            $_reg_paci: $_REG_PACI,
            tipo_epic: tipo_epi
          }
      },

      salir_HC702() {
        loader('hide');
        _regresar_menuhis();
      },

      async llamarArchivoEpi_HC702() {
        await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + secu_epi_w }, get_url("APP/HICLIN/HC702.DLL"))
          .then((data) => {
            $_HC702._datos = data.DATOS;
            $_HC702._datos.pop();
          })
          .catch((err) => {
            console.log(err, 'err')
            loader('hide')
            _regresar_menuhis();
          });
      },

      async cargarArchivos() {
        loader('show');
        $this = this;
        datos_envio = "";

        var folio = $_REG_HC.llave_hc.substr(17, 6),
          llave = "",
          datos_envio = "";
        if ($_REG_HC.novedad_hc != "8") folio = parseFloat(folio) - 1;
        llave =
          folio < 1
            ? (llave = $_REG_HC.llave_hc)
            : $_REG_HC.llave_hc.substr(0, 17) + folio.toString().padStart(6, "0");

        datos_envio = datosEnvio() + llave + "|**|  |";
        postData({ datosh: datos_envio }, get_url("APP/HICLIN/HCDETAL_PRC.DLL"))
          .then((data) => {
            var detalles = Regexp_detalle(
              data.DETHC.filter((e) => e["LLAVE-HC"].trim() != "")
            );
            $_HC702.detalles = detalles;
          })
          .catch((error) => {
            loader("hide");
            _regresar_menuhis();
          });

        await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
          .then(data => {
            $_HC702._profesionales = data.ARCHPROF;
            $_HC702._profesionales.pop();
          }).catch(err => {
            console.log(err, 'error')
            loader('hide')
            _regresar_menuhis();
          })

        await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
          .then((data) => {
            $_HC702._unserv = data.UNSERV;
            $_HC702._unserv.pop();
          })
          .catch((err) => {
            console.log(err, 'err')
            loader('hide')
            _regresar_menuhis();
          });

        await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + $this.fecha_act }, get_url("APP/HICLIN/HC831A.DLL"))
          .then((data) => {
            $_HC702._epicrisis = data.EPICRISIS;
            $_HC702._epicrisis.pop();
            $_HC702._epicrisis.reverse();
          })
          .catch((err) => {
            console.log(err, 'err')
            loader('hide')
            _regresar_menuhis();
          });

        await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
          .then(data => {
            $_HC702._ciudades = data.CIUDAD;
            $_HC702._ciudades.pop();
          }).catch(err => {
            console.log(err, 'error')
            loader('hide')
            _regresar_menuhis();
          })

        await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
          .then(data => {
            $_HC702._entidades = data.ENTIDADES;
            $_HC702._entidades.pop();
          }).catch(err => {
            console.log(err, 'error')
            loader('hide')
            _regresar_menuhis();
          })

        await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
          .then(data => {
            $_HC702._especialidades = data.ESPECIALIDADES;
            $_HC702._especialidades.pop();
          }).catch(err => {
            console.log(err, 'error')
            loader('hide')
            _regresar_menuhis();
          })

        await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER854.DLL"))
          .then(data => {
            $_HC702._ocupaciones = data.OCUPACIONES;
            $_HC702._ocupaciones.pop();
          }).catch(err => {
            console.log(err, 'error')
            loader('hide')
            _regresar_menuhis();
          })

        await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
          .then(data => {
            $_HC702._paisesRips = data.PAISESRIPS;
            $_HC702._paisesRips.pop();
          }).catch(err => {
            console.log(err, 'error')
            loader('hide')
            _regresar_menuhis();
          })

        await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc.substring(0, 15) }, get_url("app/SALUD/SER810-1.DLL"))
          .then(data => {
            $_HC702.reg_pac = data['REG-PACI'];
          }).catch(err => {
            console.log(err, 'error')
            loader('hide')
            _regresar_menuhis();
          })

        await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + '1' }, get_url("app/HICLIN/HC_PRC.DLL"))
          .then(data => {
            $_HC702._hcprc = data.HCPAC;
            loader('hide');
            this._inicializar();
          }).catch(err => {
            console.log(err, 'error')
            loader('hide')
            _regresar_menuhis();
          })
      }
    },
  })