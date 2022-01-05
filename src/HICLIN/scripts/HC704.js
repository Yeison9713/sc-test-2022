
// CREACION - SANTIAGO.F - DICIEMBRE 14/2020

var $this;
var $_HC704 = [];

new Vue({
  el: '#HC704',
  data: {
    form: {
      año_704: '',
      mes_704: '',
      dia_704: '',
      factura_704: '',
      entidad_704: '',
      sucursal_704: '',
      codTipoServ_704: '',
      descripTipoServ_704: '',
      comprob_704: '',
      paciente_704: '',
      atiende_704: '',
      sexo_704: '',
      edad_704: '',
      puertaIng_704: '',
      descripImg_704: '',
      valorImg_704: '',
      totalImg_704: '',

      especialidad_704: '',
      condicionUs_704: '',
      triage_704: '',
      diagnos_704: '',
      diagnosPrinc_704: '',
      diagnosRel1_704: '',
      diagnosRel2_704: '',
      causaExtern_704: '',
      espeRemit_704: '',
      personalAt_704: '',
      consRepet_704: '',

      tipoProced_704: '',
      diasIncap_704: '',
      claseProced_704: '',
      tipoDisc_704: '',
      estadoSalida_704: '',
      causaMuer_704: '',

      finalidadConsul_704: '',
      primerVez_704: '',
      añoIngreso_704: '',
      mesIngreso_704: '',
      diaIngreso_704: '',
      horaIngreso_704: '',
      añoSalida_704: '',
      mesSalida_704: '',
      diaSalida_704: '',
      horaSalida_704: '',
      detalleFact_704: '',
      solicitante_704: '',
    },

    fecha_act: moment().format('YYYYMMDD'),
    // dataArray: new Object(),
    // data_evo: new Object(),
    // dataBase64: []
  },
  async created() {
    await this.cargarArchivos_HC704();
  },
  methods: {
    _inicializar_HC704() {
      _inputControl('disabled');
      _inputControl('reset');
      nombreOpcion('7-4 - Imprime Resultados rx');
      $this = this;
      this.init_HC704();
    },

    async init_HC704() {
      this.validarTipoServ_HC704();
    },

    validarTipoServ_HC704() {
      $this = this
      if ($_USUA_GLOBAL[0].PREFIJ.trim() == "") {
        var suc_fact = "00";
      } else {
        var suc_fact = $_USUA_GLOBAL[0].PREFIJ;
      }
      $this.form.sucursal_704 = suc_fact;

      $this.form.codTipoServ_704 == '' ? $this.form.codTipoServ_704 = 3 : false;
      $this.form.codTipoServ_704 != 3 || $this.form.codTipoServ_704 != 7 ? $this.form.codTipoServ_704 = 3 : false;
      validarInputs(
        {
          form: "#codTipoServ_HC704",
          orden: '1'
        },
        () => {
          _regresar_menuhis();
        },
        () => {
          var cl_fact = $this.form.codTipoServ_704;
          if (cl_fact == 3 || cl_fact == 7 ) {
            $this.form.descripTipoServ_704 = "RX - ECOGRAFIAS";
            this.validarComprob_HC704();
            // continue
          } else {
            this.validarTipoServ_HC704();
            $this.form.descripTipoServ_704 = "";
          }
        }
      )
    },

    validarComprob_HC704() {
      $this = this
      $this.form.codTipoServ_704 == '' ? $this.form.codTipoServ_704 = 3 : false;
      validarInputs(
        {
          form: "#validarComprob_704",
          orden: '1'
        },
        () => {
          this.validarTipoServ_HC704();
        },
        () => {
          var num_fact = $this.form.comprob_704;
          var res = $_HC704._facturas.find(e => e.NRO_FACT == num_fact);
          if (res != undefined) {
            this.llenar_pantalla_HC704();
            // continue
          } else {
            CON851('01', '01', null, 'error', 'error');
            this.validarComprob_HC704();
          }
        }
      )
    },

    async llenar_pantalla_HC704() {
      $this = this

      await this.mostrarFecha_HC704();
      await this.abrirFactura();
      await this.mostrarPuerta_HC704();

      $this.form.factura_704 = $_HC704.busqComprob.CUENTA;

      await this.mostrarCliente_HC704();
      await this.mostrarPaciente_HC704();
      await this.mostrarMedico_HC704();

      $this.form.detalleFact_704 = $_HC704._factura.DETALLE_FACT;

      await this.total_HC704();

      // $this.form.condicionPaci_704 = $_HC704.busqComprob.MOTIVO_CONSUL;
    },

    async abrirFactura() {
      var llave_fact = $_HC704.busqComprob.LLAVE;

      await postData({ datosh: datosEnvio() + llave_fact }, get_url("app/SALUD/SAL450A.DLL"))
        .then(data => {
          $_HC704._factura = data.FACTURA[0];
          console.log($_HC704._factura);
        }).catch(err => {
          console.log(err, 'error')
          _regresar_menuhis();
        })
    },

    async mostrarFecha_HC704() {
      var num_fact = $this.form.comprob_704;
      $_HC704.busqComprob = $_HC704._facturas.find(e => e.NRO_FACT == num_fact);
      $_HC704.busqComprob != undefined ? fecha = $_HC704.busqComprob.FECHA : false;

      var mes_fact;
      switch (fecha.substring(0,3)) {
        case 'Ene': mes_fact = '01'; break;
        case 'Feb': mes_fact = '02'; break;
        case 'Mar': mes_fact = '03'; break;
        case 'Abr': mes_fact = '04'; break;
        case 'May': mes_fact = '05'; break;
        case 'Jun': mes_fact = '06'; break;
        case 'Jul': mes_fact = '07'; break;
        case 'Agt': mes_fact = '08'; break;
        case 'Sep': mes_fact = '09'; break;
        case 'Oct': mes_fact = '10'; break;
        case 'Nov': mes_fact = '11'; break;
        case 'Dic': mes_fact = '12'; break;
        default: mes_fact = '  '; break;
      }

      $this.form.año_704 = fecha.substring(7,11);
      $this.form.mes_704 = mes_fact;
      $this.form.dia_704 = fecha.substring(4,6);
    },

    mostrarPuerta_HC704() {
      switch ($_HC704._factura.PUERTA_ESTAD) {
        case '1': $this.form.puertaIng_704 = 'URGENCIAS'; break;
        case '2': $this.form.puertaIng_704 = 'CONS.EXT.'; break;
        case '3': $this.form.puertaIng_704 = 'REMITIDO'; break;
        case '4': $this.form.puertaIng_704 = 'NACIO INS'; break;
      }
    },

    async mostrarCliente_HC704() {
      var numer;
      var tercero;
      var prefijo_fact = $_HC704.busqComprob.CUENTA.substring(0,1);

      // if (prefijo_fact == 'A' || prefijo_fact == 'P' || prefijo_fact == 'T') {
      //   $_HC704.busqNumer = $_HC704._numeracion.find(e => e.COD == $_HC704.busqComprob.CUENTA);
      //   $_HC704.busqNumer != undefined ? numer = $_HC704.busqNumer.DESCRIP : numer = 'No Existe';
      // }

      $_HC704.busqTerce = $_HC704._terceros.find(e => e.COD == parseInt($_HC704.busqComprob.NIT));
      $_HC704.busqTerce != undefined ? tercero = $_HC704.busqTerce.NOMBRE : tercero = 'No Existe Cliente!';

      $this.form.entidad_704 = tercero;

      // if (prefijo_fact == 'E' || prefijo_fact == 'C') {
      //   $this.form.entidad_704 = tercero;
      // } else {
      //   $this.form.entidad_704 = numer;
      // }
    },

    mostrarPaciente_HC704() {
      $this.form.paciente_704 = $_REG_PACI.DESCRIP.trim();

      var sexo;
      switch ($_REG_PACI.SEXO) {
        case 'M': sexo = 'Masc'; break;
        case 'F': sexo = 'Fem.'; break;
        default: sexo = 'Err.'; break;
      }
      $this.form.sexo_704 = sexo;

      $this.form.edad_704 = $_HC704._hcprc.edad;
    },

    mostrarMedico_HC704() {
      $this.form.atiende_704 = $_HC704.busqComprob.MEDICO.trim();
    },

    total_HC704() {
      // var cl_fact = $_HC704.busqComprob.LLAVE.substring(2,3);
      // switch (cl_fact) {
      //   case '0':
      //     var cant_fact = parseInt($_HC704._factura.TABLA[0].CANTIDAD);
      //     if (cant_fact == 0) {
      //       $this.form.descripImg_704 = 1 + '  ' + $_HC704.busqComprob.ARTICULO + '    ' + $_HC704._factura.TABLA[0].CANTIDAD.trim();
      //     } else {
      //       var llave_art = '0' + $_HC704.busqComprob.ARTICULO;
      //       $_HC704.busqArtic = $_HC704._articulos.find(e => e.LLAVE_ART == parseInt(llave_art));
      //       if ($_HC704.busqArtic != undefined) {
      //         $this.form.descripImg_704 = 1 + '  ' + $_HC704.busqComprob.ARTICULO + '    ' + $_HC704.busqArtic.DESCRIP_ART + '    ' + $_HC704.busqComprob.CANT_FACT.trim();
      //       } else {
      //         $this.form.descripImg_704 = 1 + '  ' + $_HC704.busqComprob.ARTICULO + '    ' + 'CODIGO NO EXISTE' + '    ' + $_HC704.busqComprob.CANT_FACT.trim();
      //       }
      //     }
      //     break;
      //   default:
      //     var vlr_fact = parseInt($_HC704.busqComprob.VLR_FACT);
      //     if (vlr_fact == 0) {
      //       $this.form.descripImg_704 = 1 + '  ' + $_HC704.busqComprob.ARTICULO + '    ' + $_HC704.busqComprob.CANT_FACT.trim();
      //     } else {
      //       var llave_art = ($_HC704.busqComprob.ARTICULO);
      //       console.log(llave_art);
      //       $_HC704.busqCup = $_HC704._cups.find(e => e['LLAVE'] == parseInt(llave_art));
      //       if ($_HC704.busqCup != undefined) {
      //         $this.form.descripImg_704 = 1 + '  ' + $_HC704.busqComprob.ARTICULO + '    ' + $_HC704.busqCup.DESCRIP + '    ' + $_HC704.busqComprob.CANT_FACT.trim();
      //       } else {
      //         $this.form.descripImg_704 = 1 + '  ' + $_HC704.busqComprob.ARTICULO + '    ' + 'CODIGO NO EXISTE' + '    ' + $_HC704.busqComprob.CANT_FACT.trim();
      //       }
      //     }
      // }

      $this.form.descripImg_704 = 1 + '  ' + $_HC704._factura.TABLA[0].ARTICULO + '    ' + $_HC704._factura.TABLA[0].DESCRIP_ART + '    ' + $_HC704._factura.TABLA[0].CANTIDAD.trim();

      $this.form.valorImg_704 = $_HC704._factura.TABLA[0].VALOR_FACT.trim();

      var vlr_bruto = $_HC704._factura.VALOR_BRUTO.replace(/,/g, '').trim();
      var vlr_iva = $_HC704._factura.VALOR_IVA.replace(/,/g, '').trim();
      var vlr_des = $_HC704._factura.VALORDES.replace(/,/g, '').trim();

      var vlr_tot = vlr_bruto + vlr_iva - vlr_des;

      console.log(vlr_bruto);
      console.log(vlr_iva);
      console.log(vlr_des);

      $this.form.totalImg_704 = vlr_tot;
    },

















    _ventanaComprobantes_HC704() {
      $this = this;
      _ventanaDatos({
        titulo: "VENTANA DE COMPROBANTES POR PACIENTE",
        columnas: ["SUC", "NRO_FACT", "FECHA", "CUENTA", "CLASE" ],
        data: $_HC704._facturas,
        callback_esc: function () {
          // this.validarComprob_HC704();
          document.querySelector('.comprob_HC704').focus();
        },
        callback: function (data) {
          $this.form.comprob_704 = data.NRO_FACT;
          _enterInput('.comprob_HC704');
        }
      })
    },

    async cargarArchivos_HC704() {
      loader('show');
      $this = this;
      // datos_envio = "";

      // await postData({ datosh: datosEnvio() + '1' + '|||' }, get_url("app/SALUD/SER808.DLL"))
      //   .then(data => {
      //     $_HC704._numeracion = data.NUMERACION;
      //     $_HC704._numeracion.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      await postData({ datosh: datosEnvio() + $_REG_HC.id_paciente + '|' + 1}, get_url("app/SALUD/SER825.DLL"))
        .then(data => {
          $_HC704._facturas = data.FACTURAS[0].TABLA;
          $_HC704._facturas.pop();
        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        })

      // await postData({ datosh: datosEnvio()}, get_url("app/SALUD/SER810.DLL"))
      //   .then(data => {
      //     $_HC704._pacientes = data.PACIENTES;
      //     $_HC704._pacientes.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + '1' }, get_url("app/HICLIN/HC_PRC.DLL"))
        .then(data => {
          $_HC704._hcprc = data.HCPAC;
        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        })

      // await postData({ datosh: datosEnvio() + 0}, get_url("app/INVENT/INV803.DLL"))
      //   .then(data => {
      //     $_HC704._articulos = data.ARTICULOS;
      //     $_HC704._articulos.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      // await postData({ datosh: datosEnvio()}, get_url("app/SALUD/SER802C.DLL"))
      //   .then(data => {
      //     $_HC704._cups = data.CODIGOS;
      //     $_HC704._cups.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      await postData({ datosh: datosEnvio()}, get_url("app/CONTAB/CON802.DLL"))
        .then(data => {
          $_HC704._terceros = data.TERCEROS;
          $_HC704._terceros.pop();
          loader('hide');
          this._inicializar_HC704();
        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        })

      // var folio = $_REG_HC.llave_hc.substr(17, 6),
      //   llave = "",
      //   datos_envio = "";
      // if ($_REG_HC.novedad_hc != "8") folio = parseFloat(folio) - 1;
      // llave =
      //   folio < 1
      //     ? (llave = $_REG_HC.llave_hc)
      //     : $_REG_HC.llave_hc.substr(0, 17) + folio.toString().padStart(6, "0");
    
      // datos_envio = datosEnvio() + llave + "|**|  |";
      // postData({ datosh: datos_envio }, get_url("APP/HICLIN/HCDETAL_PRC.DLL"))
      //   .then((data) => {
      //     var detalles = Regexp_detalle(
      //       data.DETHC.filter((e) => e["LLAVE-HC"].trim() != "")
      //     );
      //     $_HC702.detalles = detalles;
      //   })
      //   .catch((error) => {
      //     loader("hide");
      //     _regresar_menuhis();
      //   });

      // await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
      //   .then(data => {
      //     $_HC702._profesionales = data.ARCHPROF;
      //     $_HC702._profesionales.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      // // console.log(`${$_REG_PACI['COD']}|${$_REG_HC['suc_folio_hc'] + $_REG_HC['nro_folio_hc']}|1|${$_REG_HC['unser_hc']}`, 'info')

      // await postData({ datosh: datosEnvio() + `${$_REG_PACI['COD']}|${$_REG_HC['suc_folio_hc'] + $_REG_HC['nro_folio_hc']}|1|` }, get_url("app/HICLIN/HC705B.DLL"))
      //   .then(data => {
      //     $_HC702._evoluciones = data.EVOLUCIONES;
      //     $_HC702._evoluciones.pop()
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      // await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
      //   .then((data) => {
      //     $_HC702._unserv = data.UNSERV;
      //     $_HC702._unserv.pop();
      //   })
      //   .catch((err) => {
      //     console.log(err, 'err')
      //     loader('hide')
      //     _regresar_menuhis();
      //   });

      // await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + $this.fecha_act }, get_url("APP/HICLIN/HC831A.DLL"))
      //   .then((data) => {
      //     $_HC702._epicrisis = data.EPICRISIS;
      //     $_HC702._epicrisis.pop();
      //   })
      //   .catch((err) => {
      //     console.log(err, 'err')
      //     loader('hide')
      //     _regresar_menuhis();
      //   });

      // await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
      //   .then(data => {
      //     $_HC702._ciudades = data.CIUDAD;
      //     $_HC702._ciudades.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      // await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
      //   .then(data => {
      //     $_HC702._entidades = data.ENTIDADES;
      //     $_HC702._entidades.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      // await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + 1 }, get_url("APP/HICLIN/HC702.DLL"))
      //   .then((data) => {
      //     $_HC702._datos = data.DATOS;
      //     $_HC702._datos.pop();
      //   })
      //   .catch((err) => {
      //     console.log(err, 'err')
      //     loader('hide')
      //     _regresar_menuhis();
      //   });

      // await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
      //   .then(data => {
      //     $_HC702._especialidades = data.ESPECIALIDADES;
      //     $_HC702._especialidades.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      // await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER854.DLL"))
      //   .then(data => {
      //     $_HC702._ocupaciones = data.OCUPACIONES;
      //     $_HC702._ocupaciones.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      // await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
      //   .then(data => {
      //     $_HC702._paisesRips = data.PAISESRIPS;
      //     $_HC702._paisesRips.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      // await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc.substring(0, 15) }, get_url("app/SALUD/SER810-1.DLL"))
      //   .then(data => {
      //     $_HC702.reg_pac = data['REG-PACI'];
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      // await postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC003A-1.DLL"))
      //   .then((data) => {
      //     $_HC003A._farmacia = data.FARMACIA;
      //     $_HC003A._farmacia.pop();
      //   })
      //   .catch((err) => {
      //     console.log(err, 'err')
      //     loader('hide')
      //     _regresar_menuhis();
      //   });

      // await postData({ datosh: datosEnvio() + "0105" + "ISH521" }, get_url("APP/CONTAB/CON904S.DLL"))
      //   .then((data) => {
      //     $_HC003A._restri = data;
      //   })
      //   .catch((err) => {
      //     console.log(err, 'err')
      //     loader('hide')
      //     _regresar_menuhis();
      //   });

      // await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
      //   .then(data => {
      //     $_HC003A._entidades = data.ENTIDADES;
      //     $_HC003A._entidades.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      // await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
      //   .then(data => {
      //     $_HC003A._ciudades = data.CIUDAD;
      //     $_HC003A._ciudades.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      //   await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER854.DLL"))
      //   .then(data => {
      //     $_HC003A._ocupaciones = data.OCUPACIONES;
      //     $_HC003A._ocupaciones.pop();
      //   }).catch(err => {
      //     console.log(err, 'error')
      //     loader('hide')
      //     _regresar_menuhis();
      //   })

      // await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER104C.DLL"))
      // .then((data) => {
      //   $_HC003A._medicamentos = data.MEDICAMENTOS;
      //   $_HC003A._medicamentos.pop();
      //   loader('hide');
      //   $this._inicializar(); 
      // })
      // .catch((err) => {
      //   console.log(err, 'err')
      //   loader('hide')
      //   _regresar_menuhis();
      // });

    }
  },
})