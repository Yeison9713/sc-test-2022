// 22/05/2020 DIANA E: CREADO 
var SER102C = [];

var vlrporcotr_SER102CMask = new IMask(document.getElementById('ingrtercer_SER102C'),
  { mask: Number, min: 0, max: 99, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);



$(document).ready(function () {
  nombreOpcion('9,7,1,8- Maestro de Cups');
  _inputControl('reset');
  _inputControl('disabled');
  loader("show");
  SER102C.NOPOSW = '';
  SER102C.DIAGNW = '';
  SER102C.MEDIC100 = '';
  SER102C.CTACONTAB1 = '';
  SER102C.CTACONTAB2 = '';
  SER102C.CTACONTAB3 = '';
  SER102C.OPERELAB = '';
  SER102C.FECHAELAB = '';
  SER102C.HORAELAB = '';
  SER102C.CISW = '';
  SER102C.COSTOW = '';
  SER102C.CUENTAW = '';
  $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
  $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
  $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
  $_DIALNK = $_FECHA_LNK.substring(4, 6);
  $_MESLNK = $_FECHA_LNK.substring(2, 4);
  $_ANOLNK = $_FECHA_LNK.substring(0, 2);
  $_ANOLNK = parseInt($_ANOLNK) + 2000;
  $_NITUSU = $_USUA_GLOBAL[0].NIT;
  $_PUCUSU = $_USUA_GLOBAL[0].PUC;
  _toggleF8([
    { input: 'codgrupo', app: 'SER102C', funct: _ventanaGrupoSER102C },
    { input: 'codcups', app: 'SER102C', funct: _ventanaCupsSER102C },
    { input: 'tipocups', app: 'SER102C', funct: _ventanaclaseservicioSER102C },
    { input: 'centrocosto', app: 'SER102C', funct: _ventanaCentrCostoSER102C },
    { input: 'ctaingrTercer', app: 'SER102C', funct: _ventanaPlanCuentasSER102C },
    { input: 'nitTercer', app: 'SER102C', funct: _ventanaTercerosSER102C },
    { input: 'codPuc', app: 'SER102C', funct: _ventanaPlanCuentas1SER102C },
    { input: 'codCoop', app: 'SER102C', funct: _ventanaPlanCuentas2SER102C },
    { input: 'codOficial', app: 'SER102C', funct: _ventanaPlanCuentas3SER102C },
    { input: 'division1', app: 'SER102C', funct: _ventanaDivision1SER102C },
    { input: 'division2', app: 'SER102C', funct: _ventanaDivision2SER102C }
  ]);
  if ($_USUA_GLOBAL[0].NIT == '0800156469') {
    SER102C.SERVICIOS = [
      { COD: '0', DESCRIPCION: 'DROGUERIA' },
      { COD: '1', DESCRIPCION: 'CIRUGIAS' },
      { COD: '2', DESCRIPCION: 'ECOGRAFIAS' },
      { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
      { COD: '4', DESCRIPCION: 'DOPPLER' },
      { COD: '5', DESCRIPCION: 'T.A.C.' },
      { COD: '6', DESCRIPCION: 'RESONANCIA NUCLEAR' },
      { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
    ]
  } else {
    SER102C.SERVICIOS = [
      { COD: '0', DESCRIPCION: 'DROGUERIA' },
      { COD: '1', DESCRIPCION: 'CIRUGIAS' },
      { COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
      { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
      { COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
      { COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
      { COD: '6', DESCRIPCION: 'PATOLOGIA' },
      { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
    ]
  }



  obtenerDatosCompletos({
    nombreFd: 'GRUPO-SER'
  }, function (data) {
    $_GRSER_102C = data.CODIGOS;
    $_GRSER_102C.pop();
    loader("hide");
    CON850(_dato_novedad_SER102C);
    obtenerDatosCompletos({
      nombreFd: 'COSTOS'
    }, function (data) {
      $_COSTOS_102C = data.COSTO;
      $_COSTOS_102C.pop();
      obtenerDatosCompletos({
        nombreFd: 'CTA-MAYOR'
      }, function (data) {
        $_MAESTROS_102C = data.MAESTROS;
        $_MAESTROS_102C.pop();
        SER102C.TIPOMAE = '4';
        SER102C.FILTROMAE = $_MAESTROS_102C.filter(clase => (clase.TIPO_MAE == SER102C.TIPOMAE))
        obtenerDatosCompletos({
          nombreFd: 'TERCEROS'
        }, function (data) {
          $_TERCEROS_102C = data.TERCEROS;
          $_TERCEROS_102C.pop();
          obtenerDatosCompletos({
            nombreFd: 'DIVISION'
          }, function (data) {
            $_DIVISION_102C = data.CODIGOS;
            $_DIVISION_102C.pop();

          }
            // , 'OFF'
          )
        })
      })
    })
  })
})

////////////INICIAOPCION//////////////////////////////////////

function _dato_novedad_SER102C(novedad) {
  SER102C.NOVEDAD = novedad.id;
  switch (parseInt(novedad.id)) {
    case 7:
    case 8:
    case 9:
      $('#operSER102C').val($_ADMINW);
      $('#fechaSER102C').val($_FECHA_LNK);
      _evaluargrupo_SER102C();
      break;
    default:
      // _toggleNav()
      let Window = BrowserWindow.getAllWindows();
      if (Window.length > 1) {
        _cerrarSegundaVentana();
      } else {
        _toggleNav()
      };
      break;
  }
  $('#novedadSER102C').val(novedad.id + ' - ' + novedad.descripcion)
}

function _evaluargrupo_SER102C() {
  validarInputs(
    {
      form: "#grupoSER102C",
      orden: '1'
    },
    () => { CON850(_dato_novedad_SER102C); },
    () => {
      SER102C.GRUPOW = $('#codgrupo_SER102C').val();
      if (SER102C.GRUPOW.trim() == '') {
        CON851('01', '01', null, 'error', 'Error');
        _evaluargrupo_SER102C()
      } else {
        busquedagrupos = buscarDescrip_grupos102C(SER102C.GRUPOW)
        switch (busquedagrupos) {
          case false:
            CON851('01', '01', null, 'error', 'error');
            _evaluargrupo_SER102C();
            break;
          default:
            SER102C.DESCRIPGRUPOW = busquedagrupos.DESCRIP.trim();
            $('#descripgrupo_SER102C').val(SER102C.DESCRIPGRUPOW);
            // filtrocups = $_CUPS_102C.filter(clase => (clase.GRUPO == SER102C.GRUPOW))
            if ((SER102C.GRUPOW == '89') && ($_PUCUSU == '3')) {
              jAlert({ titulo: 'Error ', mensaje: 'Para consulta de medicina especializada, use la Cta 411027 que el sistem,a reclasifica x especialidad' }, _evaluarcups_SER102C);
            } else {
              _evaluarcups_SER102C();
            }
            break;
        }
      }
    }
  )
}
function buscarDescrip_grupos102C(data) {
  var retornar = false;
  for (var i in $_GRSER_102C) {
    if ($_GRSER_102C[i].COD.trim() == data) {
      retornar = $_GRSER_102C[i];
      break;
    }
  }
  return retornar;
}

function _evaluarcups_SER102C() {
  validarInputs({
    form: '#cupsSER102C',
    orden: '1'
  },
    function () { _evaluargrupo_SER102C(); },
    _validargrupos_SER102C
  )
}
function _validargrupos_SER102C() {
  SER102C.CUPSW = $('#codcups_SER102C').val();
  if (SER102C.CUPSW.trim() == '') {
    CON851('01', '01', null, 'error', 'error');
    _evaluarcups_SER102C();
  } else {
    SER102C.LLAVEW = SER102C.GRUPOW + SER102C.CUPSW;
    postData({
      datosh: datosEnvio() + SER102C.LLAVEW.padEnd(15, ' ') + '|'
    }, get_url("APP/SALUD/SER102C-01.DLL"))
      .then((data) => {
        SER102C.CUPS = data.CUPS[0];
        swinvalid = SER102C.CUPS.ESTADO;
        SER102C.DESCRIPCUPSW = SER102C.CUPS.DESCRIP.trim();
        SER102C.TIPOW = SER102C.CUPS.TIPO_CUPS.substring(0, 1);
        SER102C.ABREVW = SER102C.CUPS.ABREVE.trim();
        SER102C.DURACIONW = SER102C.CUPS.DURACION.trim();
        SER102C.NIVELW = SER102C.CUPS.NIVEL.trim();
        SER102C.COPAGOMODW = SER102C.CUPS.COPAGO.substring(0, 1);
        SER102C.NOPOSW = SER102C.CUPS.NOPOS.trim();
        SER102C.CISW = SER102C.CUPS.CIS.trim();
        SER102C.COSTOW = SER102C.CUPS.COSTO.trim();
        SER102C.EDADMINW = SER102C.CUPS.EDAD_MIN.trim();
        SER102C.EDADMAXW = SER102C.CUPS.EDAD_MAX.trim();
        SER102C.UNIDEDADW = SER102C.CUPS.UND_EDAD.trim();
        SER102C.SEXOW = SER102C.CUPS.SEXO.trim();
        SER102C.DIAGNW = SER102C.CUPS.DIAGN.trim();
        SER102C.MEDIC100 = SER102C.CUPS.MED_100.trim();
        SER102C.PORCOTRW = SER102C.CUPS.PORC_OTR.trim();
        SER102C.PORCCLW = SER102C.CUPS.PORC_CL.trim();
        SER102C.CTAOTRW = SER102C.CUPS.CTA_OTR.trim();
        SER102C.DESCRIPCTA = SER102C.CUPS.NOMBRE_MAE;
        SER102C.NITOTR = SER102C.CUPS.NIT_OTR;
        SER102C.DESCRIPNIT = SER102C.CUPS.DESCRIP_NIT;
        SER102C.CTACONTAB1 = SER102C.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP;
        SER102C.CTACONTAB2 = SER102C.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP;
        SER102C.CTACONTAB3 = SER102C.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP;
        SER102C.DIVW = SER102C.CUPS.DIV1.trim();
        SER102C.DESCRIPDIVW = SER102C.CUPS.DESCRIP_DIV1;
        SER102C.DIV2W = SER102C.CUPS.DIV2.trim();
        SER102C.DESCRIPDIV2W = SER102C.CUPS.DESCRIP_DIV2;
        if ((SER102C.NOVEDAD == '7') && (swinvalid == '00')) {
          CON851('00', '00', null, 'error', 'error');
          _evaluarcups_SER102C();
        }
        else if ((SER102C.NOVEDAD == '8') && (swinvalid == '00')) {
          _llenardatos_SER102C();
        }
        else if ((SER102C.NOVEDAD == '9') && (swinvalid == '00')) {
          _llenardatos_SER102C();
          CON851P('54', _validarDato712, consultadll_SER102C)
        }

      })
      .catch((error) => {
        console.log(error);
        if ((SER102C.NOVEDAD == '7') && (error.MENSAJE == '01')) {
          _evaluartiposervicio_SER102C();
        } else if ((SER102C.NOVEDAD == '8') && (error.MENSAJE == '01')) {
          CON851('01', '01', null, 'error', 'Error');
          _evaluarcups_SER102C();
        } else if ((SER102C.NOVEDAD == '9') && (error.MENSAJE == '01')) {
          CON851('01', '01', null, 'error', 'Error');
          _evaluarcups_SER102C();
        }
      });

  }
}



function _evaluartiposervicio_SER102C() {
  validarInputs(
    {
      form: "#tiposerv_SER102C",
      orden: '1'
    }, function () { _evaluarcups_SER102C(); },
    () => {
      SER102C.TIPOW = $("#tipocups_SER102C").val();
      if (SER102C.TIPOW) {
        SER102C.SERVICIOS.forEach(data => {
          if (SER102C.TIPOW == data.COD) {
            $('#tipocups_SER102C').val(data.COD);
            $('#descriptipocups_SER102C').val(data.DESCRIPCION);
            _evaluardescripcups_SER102C();
          }
        });
      } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluartiposervicio_SER102C();
      }
    }
  )
}

function _evaluardescripcups_SER102C() {
  validarInputs(
    {
      form: "#descripcioncupsSER102C",
      orden: '1'
    },
    () => { _evaluartiposervicio_SER102C(); },
    () => {
      SER102C.DESCRIPCUPSW = $('#descripcups_SER102C').val();
      if (SER102C.DESCRIPCUPSW.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _evaluardescripcups_SER102C();
      } else {
        _evaluardatoabrev_SER102C();
      }
    }
  )
}

function _evaluardatoabrev_SER102C() {
  validarInputs(
    {
      form: "#codabreviadoSER102C",
      orden: '1'
    },
    () => { _evaluardescripcups_SER102C(); },
    () => {
      SER102C.ABREVW = $('#codabrev_SER102C').val();
      _evaluarduracion_SER102C();
    }
  )
}

function _evaluarduracion_SER102C() {
  validarInputs(
    {
      form: "#duracionprocSER102C",
      orden: '1'
    },
    () => { _evaluardescripcups_SER102C(); },
    () => {
      SER102C.DURACIONW = $('#duracion_SER102C').val();
      if ((SER102C.DURACIONW == '5') || (SER102C.DURACIONW == '15') || (SER102C.DURACIONW == '45')) {
        _evaluardatonivel_SER102C()
      } else {
        if (SER102C.DURACIONW > 180) {
          CON851('03', '03', null, 'error', 'error');
          _evaluarduracion_SER102C()
        } else {
          SER102C.FACTORW = SER102C.DURACIONW / 10;
          SER102C.DURACIONW = SER102C.FACTORW * 10;
          _evaluardatonivel_SER102C();
        }
      }

    }
  )
}

function _evaluardatonivel_SER102C() {
  if (SER102C.NIVELW == '0') {
    SER102C.NIVELW = '';
    $('#nivcompl_SER102C').val('');
  }
  validarInputs(
    {
      form: "#nivcomplejidadSER102C",
      orden: '1'
    },
    () => { _evaluarduracion_SER102C(); },
    () => {
      SER102C.NIVELW = $('#nivcompl_SER102C').val();
      if ((SER102C.NIVELW == '1') || (SER102C.NIVELW == '2') || (SER102C.NIVELW == '3') || (SER102C.NIVELW == '4') || (SER102C.NIVELW == '5')) {
        _evaluardatocopago_SER102C();
      } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluardatonivel_SER102C();
      }
    }
  )
}
function _evaluardatocopago_SER102C() {
  var copago = [
    { 'COD': '1', 'DESCRIP': 'COPAGO' },
    { 'COD': '2', 'DESCRIP': 'CUOTA MODERADORA' },
    { 'COD': '3', 'DESCRIP': 'NO APLICA' }
  ]
  POPUP({
    array: copago,
    titulo: 'TIPO DE PAGO',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    seleccion: SER102C.COPAGOMODW,
    callback_f: _evaluardatonivel_SER102C,
    teclaAlterna: true
  },
    _validarcopago_SER102C);
}

function _validarcopago_SER102C(data) {
  SER102C.COPAGOMODW = data.COD;
  switch (data.COD) {
    case '1':
    case '2':
    case '3':
      _evaluadatonopos_SER102C();
      break;
  }
  $("#pagoPaci_SER102C").val(data.COD + " - " + data.DESCRIP);
}

function _evaluadatonopos_SER102C() {
  if (SER102C.NOPOSW.trim() != 'S') {
    SER102C.NOPOSW = 'N'
    $('#proced_SER102C').val(SER102C.NOPOSW);
  }
  validarInputs(
    {
      form: "#procedencianoposSER102C",
      orden: '1'
    },
    () => { setTimeout(_evaluardatocopago_SER102C, 300) },
    () => {
      SER102C.NOPOSW = $('#proced_SER102C').val();
      if ((SER102C.NOPOSW == 'S') || (SER102C.NOPOSW == 'N')) {
        _evaluardatocis_SER102C();
      } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluadatonopos_SER102C();
      }
    }
  )
}

function _evaluardatocis_SER102C() {
  if ((SER102C.CISW == '0') || (SER102C.CISW.trim() == '')) {
    SER102C.CISW = 'N';
    $('#cis_SER102C').val(SER102C.CISW);
  }
  validarInputs(
    {
      form: "#cisSER102C",
      orden: '1'
    },
    () => { _evaluadatonopos_SER102C() },
    () => {
      SER102C.CISW = $('#cis_SER102C').val();
      if ((SER102C.CISW == 'S') || (SER102C.CISW == 'N')) {
        _evaluardatocosto_SER102C();
      } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluardatocis_SER102C();
      }
    }
  )
}

function _evaluardatocosto_SER102C() {
  if (SER102C.COSTOW.trim() == '') {
    SER102C.COSTOW = '0000'
    $('#centrocosto_SER102C').val('0000');
  }
  validarInputs(
    {
      form: "#centrocostoSER102C",
      orden: '1'
    },
    () => { _evaluardatocis_SER102C() },
    () => {
      SER102C.COSTOW = $('#centrocosto_SER102C').val();
      if (SER102C.COSTOW.trim() == '') {
        _evaluardatoedadmin_SER102C();
      } else {
        busquedacosto = buscarDescrip_costo102C(SER102C.COSTOW)
        switch (busquedacosto) {
          case false:
            CON851('01', '01', null, 'error', 'error');
            _evaluardatocosto_SER102C();
            break;
          default:
            SER102C.DESCRIPCOSTOW = busquedacosto.NOMBRE.trim();
            $('#descripcosto_SER102C').val(SER102C.DESCRIPCOSTOW);
            _evaluardatoedadmin_SER102C();;
            break;
        }
      }
    }
  )
}

function buscarDescrip_costo102C(data) {
  var retornar = false;
  for (var i in $_COSTOS_102C) {
    if ($_COSTOS_102C[i].COD.trim() == data) {
      retornar = $_COSTOS_102C[i];
      break;
    }
  }
  return retornar;
}

function _evaluardatoedadmin_SER102C() {
  validarInputs(
    {
      form: "#edadminimaSER102C",
      orden: '1'
    },
    () => { _evaluardatocosto_SER102C() },
    () => {
      SER102C.EDADMINW = $('#edadminima_SER102C').val();
      if (SER102C.EDADMINW > 100) {
        CON851('', 'Edad fuera de rango', null, 'warning', 'Advertencia');
        _evaluardatoedadmin_SER102C();
      } else {
        _evaluardatoedadmax_SER102C();
      }
    }
  )
}

function _evaluardatoedadmax_SER102C() {
  validarInputs(
    {
      form: "#edadmaximaSER102C",
      orden: '1'
    },
    () => { _evaluardatoedadmin_SER102C() },
    () => {
      SER102C.EDADMAXW = $('#edadmaxima_SER102C').val();
      if (SER102C.EDADMAXW < SER102C.EDADMINW) {
        CON851('', 'Edad fuera de rango', null, 'warning', 'Advertencia');
        _evaluardatoedadmax_SER102C();
      } else {
        _evaluardatounidadedad_SER102C();
      }
    }
  )
}

function _evaluardatounidadedad_SER102C() {
  validarInputs(
    {
      form: "#undedadSER102C",
      orden: '1'
    },
    () => { _evaluardatoedadmax_SER102C() },
    () => {
      SER102C.UNIDEDADW = $('#undedad_SER102C').val();
      if ((SER102C.UNIDEDADW == 'D') || (SER102C.UNIDEDADW == 'M') || (SER102C.UNIDEDADW == 'A') || (SER102C.UNIDEDADW.trim() == '')) {
        if (((SER102C.EDADMINW > 0) || (SER102C.EDADMAXW > 0)) && (SER102C.UNIDEDADW.trim() == '')) {
          CON851('', 'Ingrese Unidad edad', _evaluardatounidadedad_SER102C(), 'warning', 'Advertencia');
        } else {
          _evaluarsexo_SER102C();
        }
      } else {
        CON851('', 'Unid edad no coincide', _evaluardatounidadedad_SER102C(), 'error', 'error');
      }
    }
  )
}

function _evaluarsexo_SER102C() {
  validarInputs(
    {
      form: "#sexoSER102C",
      orden: '1'
    },
    () => { _evaluardatounidadedad_SER102C() },
    () => {
      SER102C.SEXOW = $('#sexo_SER102C').val();
      if ((SER102C.SEXOW == 'F') || (SER102C.SEXOW == 'M') || (SER102C.SEXOW.trim() == '')) {
        if (SER102C.GRUPOW < 87) {
          SER102C.DIAGNW = 'S';
          $('#pregRips_SER102C').val('S');
          _evaluardiagrips_SER102C();
        } else {
          if (SER102C.DIAGNW.trim() == '') {
            if ((SER102C.TIPOW == '2') || (SER102C.TIPOW == '3') || (SER102C.TIPOW == '4')) {
              SER102C.DIAGNW = 'N';
              $('#pregRips_SER102C').val('N');
              _evaluardiagrips_SER102C();
            } else {
              SER102C.DIAGNW = 'S';
              $('#pregRips_SER102C').val('S');
              _evaluardiagrips_SER102C();
            }
          } else {
            _evaluardiagrips_SER102C();
          }
        }
      } else {
        CON851('', 'Sexo Invalido', null, 'warning', 'Advertencia');
        _evaluarsexo_SER102C();
      }
    }
  )
}

function _evaluardiagrips_SER102C() {
  validarInputs(
    {
      form: "#pregRipsSER102C",
      orden: '1'
    },
    () => { _evaluarsexo_SER102C() },
    () => {
      SER102C.DIAGNW = $('#pregRips_SER102C').val();
      if ((SER102C.DIAGNW == 'S') || (SER102C.DIAGNW == 'N')) {
        _evaluar100medic_SER102C();
      } else {
        CON851('', 'Diagnostico rips Invalid', null, 'warning', 'Advertencia');
        _evaluardiagrips_SER102C();
      }
    }
  )
}

function _evaluar100medic_SER102C() {
  if (SER102C.MEDIC100.trim() == '') {
    SER102C.MEDIC100 = 'N';
    $('#porcmedico_SER102C').val('N');
  }
  validarInputs(
    {
      form: "#porcmedicoSER102C",
      orden: '1'
    },
    () => { _evaluardiagrips_SER102C() },
    () => {
      SER102C.MEDIC100 = $('#porcmedico_SER102C').val();
      if ((SER102C.MEDIC100 == 'S') || (SER102C.MEDIC100 == 'N')) {
        if (SER102C.MEDIC100 == 'S') {
          SER102C.PORCCLW = '';
          SER102C.PORCOTRW = '';
          SER102C.NITOTR = '';
          SER102C.CTAOTRW = '';
          $('#ingrclinica_SER102C').val('');
          $('#ingrtercer_SER102C').val('');
          $('#ctaingrTercer_SER102C').val('');
          $('#nitTercer_SER102C').val('');
          _leerctater_SER102C();
        } else {
          _evaluardatoporcentcl_SER102C();
        }
      } else {
        CON851('', 'porcent medico invalido', null, 'warning', 'Advertencia');
        _evaluar100medic_SER102C();
      }
    }
  )
}
function _evaluardatoporcentcl_SER102C() {
  validarInputs(
    {
      form: "#ingrclinicaSER102C",
      orden: '1'
    },
    () => { _evaluar100medic_SER102C() },
    () => {
      SER102C.PORCCLW = $('#ingrclinica_SER102C').val();
      _evaluardatoporcentotr_SER102C()
    }
  )
}

function _evaluardatoporcentotr_SER102C() {
  validarInputs(
    {
      form: "#ingrtercerSER102C",
      orden: '1'
    },
    () => { _evaluardatoporcentcl_SER102C() },
    () => {
      SER102C.PORCOTRW = vlrporcotr_SER102CMask.value.replace(',', '').padStart(4, '0');;
      SER102C.VALORTOTAL = SER102C.PORCCLW + SER102C.PORCOTRW;
      if (SER102C.VALORTOTAL > 100) {
        CON851('51', '51', null, 'error', 'error');
        _evaluardatoporcentotr_SER102C();
      } else {
        _evaluarctater_SER102C();
      }
    }
  )
}

function _evaluarctater_SER102C() {
  if ((SER102C.PORCOTRW == 0) || (SER102C.PORCOTRW.trim() == '')) {
    SER102C.CTAOTRW = '';
    $('#ctaingrTercer_SER102C').val('');
    _leerctater_SER102C();
  } else {
    validarInputs(
      {
        form: "#ctaingrTercerSER102C",
        orden: '1'
      },
      () => { _evaluar100medic_SER102C() },
      () => {
        SER102C.CTAOTRW = $('#ctaingrTercer_SER102C').val();
        _leerctater_SER102C();
      }
    )
  }
}

function _leerctater_SER102C() {
  if (SER102C.CTAOTRW.trim() == '') {
    _evaluarnitter_SER102C();
  } else {
    busquedacta = buscarDescrip_ctaSER102C(SER102C.CTAOTRW)
    switch (busquedacta) {
      case false:
        CON851('01', '01', null, 'error', 'error');
        _evaluarctater_SER102C();
        break;
      default:
        SER102C.DESCRIPCTA = busquedacta.NOMBRE_MAE.trim();
        $('#ctaDescripTercer_SER102C').val(SER102C.DESCRIPCTA);
        _evaluarnitter_SER102C();
        break;
    }
  }
}

function buscarDescrip_ctaSER102C(data) {
  var retornar = false;
  for (var i in $_MAESTROS_102C) {
    if ($_MAESTROS_102C[i].LLAVE_MAE.trim() == data) {
      retornar = $_MAESTROS_102C[i];
      break;
    }
  }
  return retornar;
}

function _evaluarnitter_SER102C() {
  if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
    _evaluardatpheon_SER102C();
  } else {
    if ((SER102C.PORCOTRW == 0) || (SER102C.PORCOTRW.trim() == '')) {
      SER102C.NITOTR = '';
      $('#nitTercer_SER102C').val('');
      _leernitter_SER102C();
    } else {
      validarInputs(
        {
          form: "#nitTercerSER102C",
          orden: '1'
        },
        () => { _evaluar100medic_SER102C() },
        () => {
          SER102C.NITOTR = $('#nitTercer_SER102C').val();
          _leernitter_SER102C();
        }
      )
    }
  }
}

function _leernitter_SER102C() {
  if ((SER102C.NITOTR.trim() == '') || (SER102C.NITOTR == '0')) {
    SER102C.DESCRIPNIT = '';
    $('#descripTercer_SER102C').val('');
    _evaluardatocodigo_SER102C();
  } else {
    busquedaterceros = buscarDescrip_tercerosSER102C(SER102C.NITOTR)
    switch (busquedaterceros) {
      case false:
        CON851('01', '01', null, 'error', 'error');
        _evaluarnitter_SER102C();
        break;
      default:
        SER102C.DESCRIPTERCERO = busquedaterceros.NOMBRE.trim();
        $('#descripTercer_SER102C').val(SER102C.DESCRIPTERCERO);
        _evaluardatocodigo_SER102C();
        break;
    }
  }
}
function buscarDescrip_tercerosSER102C(data) {
  var retornar = false;
  for (var i in $_TERCEROS_102C) {
    if ($_TERCEROS_102C[i].COD.trim() == data) {
      retornar = $_TERCEROS_102C[i];
      break;
    }
  }
  return retornar;
}




function _evaluardatocodigo_SER102C() {
  if (SER102C.TIPOW == '6') {
    SER102C.CTACONTAB1 = '412504000504';
    SER102C.CTACONTAB3 = '431248000014';
    $('#codPuc_SER102C').val(SER102C.CTACONTAB1);
    $('#codOficial_SER102C').val(SER102C.CTACONTAB3);
  }
  switch ($_PUCUSU) {
    case '1':
      SER102C.CUENTAW = SER102C.CTACONTAB1;
      $('#codPuc_SER102C').val(SER102C.CUENTAW);
      _evaluarcuenta1_SER102C()
      break;
    case '2':
      SER102C.CUENTAW = SER102C.CTACONTAB2;
      $('#codCoop_SER102C').val(SER102C.CUENTAW);
      _evaluarcuenta2_SER102C()
      break;
    case '3':
      SER102C.CUENTAW = SER102C.CTACONTAB1;
      $('#codPuc_SER102C').val(SER102C.CUENTAW);
      _evaluarcuenta1_SER102C()
      break;
    case '4':
      SER102C.CUENTAW = SER102C.CTACONTAB3;
      $('#codOficial_SER102C').val(SER102C.CUENTAW);
      _evaluarcuenta3_SER102C()
      break;
    case '5':
      SER102C.CUENTAW = SER102C.CTACONTAB1;
      $('#codPuc_SER102C').val(SER102C.CUENTAW);
      _evaluarcuenta1_SER102C()
      break;
    case '6':
      SER102C.CUENTAW = SER102C.CTACONTAB3;
      $('#codOficial_SER102C').val(SER102C.CUENTAW);
      _evaluarcuenta3_SER102C()
      break;
  }
}

function _evaluarcuenta1_SER102C() {
  validarInputs(
    {
      form: "#codPucSER102C",
      orden: '1'
    },
    () => { _evaluardatoporcentotr_SER102C() },
    () => {
      SER102C.CUENTAW = $('#codPuc_SER102C').val();
      if (SER102C.CUENTAW.trim() == '') {
        _evaluarpucusu_SER102C()
      } else {
        let res = $_MAESTROS_102C.find(e => e.LLAVE_MAE == SER102C.CUENTAW + '4');
        if (res == undefined) {
          CON851("01", "01", null, "error", "error");
          _evaluarcuenta1_SER102C()
        } else {
          _evaluarpucusu_SER102C()
        }
      }
    }
  )
}

function _evaluarcuenta2_SER102C() {
  validarInputs(
    {
      form: "#codCoopSER102C",
      orden: '1',
      event_f5: _evaluarcuenta1_SER102C
    },
    () => { _evaluarcuenta1_SER102C() },
    () => {
      SER102C.CUENTAW = $('#codCoop_SER102C').val();
      if (SER102C.CUENTAW.trim() == '') {
        _evaluarpucusu_SER102C()
      } else {
        let res = $_MAESTROS_102C.find(e => e.LLAVE_MAE == SER102C.CUENTAW + '4');
        if (res == undefined) {
          CON851("01", "01", null, "error", "error");
          _evaluarcuenta2_SER102C()
        } else {
          _evaluarpucusu_SER102C()
        }
      }
    }
  )
}

function _evaluarcuenta3_SER102C() {
  validarInputs(
    {
      form: "#codOficialSER102C",
      orden: '1',
      event_f5: _evaluarcuenta2_SER102C
    },
    () => { _evaluar100medic_SER102C() },
    () => {
      SER102C.CUENTAW = $('#codOficial_SER102C').val();
      if (SER102C.CUENTAW.trim() == '') {
        _evaluardatocodigo_SER102C()
      } else {
        let res = $_MAESTROS_102C.find(e => e.LLAVE_MAE == SER102C.CUENTAW + '4');
        if (res == undefined) {
          CON851("01", "01", null, "error", "error");
          _evaluardatocodigo_SER102C();
        } else {
          _evaluarpucusu_SER102C()
        }
      }
    }
  )
}

function _evaluarpucusu_SER102C() {
  switch ($_PUCUSU) {
    case '1':
      SER102C.CTACONTAB1 = SER102C.CUENTAW;
      _evaluardatodivision_SER102C()
      break;
    case '2':
      SER102C.CTACONTAB2 = SER102C.CUENTAW
      _evaluardatodivision_SER102C()
      break;
    case '3':
      SER102C.CTACONTAB1 = SER102C.CUENTAW
      _evaluardatodivision_SER102C()
      break;
    case '4':
      SER102C.CTACONTAB3 = SER102C.CUENTAW
      _evaluardatodivision_SER102C()
      break;
    case '5':
      SER102C.CTACONTAB1 = SER102C.CUENTAW
      _evaluardatodivision_SER102C()
      break;
    case '6':
      SER102C.CTACONTAB3 = SER102C.CUENTAW
      _evaluardatodivision_SER102C()
      break;
    default:
      _evaluardatodivision_SER102C()
      break;
  }
}
function _evaluardatodivision_SER102C() {
  validarInputs(
    {
      form: "#division1SER102C",
      orden: '1'
    },
    () => { _evaluardatocodigo_SER102C() },
    () => {
      SER102C.DIVW = $('#division1_SER102C').val();
      if (SER102C.DIVW.trim() == '') {
        $('#descripdiv1_SER102C').val('');
        _evaluardatodivision2_SER102C()
      } else {
        busquedadivision1 = buscarDescrip_divSER102C(SER102C.DIVW)
        switch (busquedadivision1) {
          case false:
            CON851('01', '01', null, 'error', 'error');
            _evaluardatodivision_SER102C();
            break;
          default:
            SER102C.DESCRIPDIVW = busquedadivision1.DESCRIP.trim();
            $('#descripdiv1_SER102C').val(SER102C.DESCRIPDIVW);
            _evaluardatodivision2_SER102C()
            break;
        }
      }
    }
  )
}

function buscarDescrip_divSER102C(data) {
  var retornar = false;
  for (var i in $_DIVISION_102C) {
    if ($_DIVISION_102C[i].COD.trim() == data) {
      retornar = $_DIVISION_102C[i];
      break;
    }
  }
  return retornar;
}

function _evaluardatodivision2_SER102C() {
  validarInputs(
    {
      form: "#division2SER102C",
      orden: '1'
    },
    () => { _evaluardatocodigo_SER102C() },
    () => {
      SER102C.DIV2W = $('#division2_SER102C').val();
      if (SER102C.DIV2W.trim() == '') {
        $('#descripdiv2_SER102C').val('');
        _datograbar_SER102C();
      } else {
        busquedadivision2 = buscarDescrip_div2SER102C(SER102C.DIV2W)
        switch (busquedadivision2) {
          case false:
            CON851('01', '01', null, 'error', 'error');
            _evaluardatodivision2_SER102C();
            break;
          default:
            SER102C.DESCRIPDIV2W = busquedadivision2.DESCRIP.trim();
            $('#descripdiv2_SER102C').val(SER102C.DESCRIPDIV2W);
            _datograbar_SER102C();
            break;
        }
      }
    }
  )
}

function buscarDescrip_div2SER102C(data) {
  var retornar = false;
  for (var i in $_DIVISION_102C) {
    if ($_DIVISION_102C[i].COD.trim() == data) {
      retornar = $_DIVISION_102C[i];
      break;
    }
  }
  return retornar;
}

function _datograbar_SER102C() {
  if (SER102C.NOVEDAD == '7') {
    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
      SER102C.FECHAACT = '00000000';
      SER102C.OPERW = '';
      SER102C.HORAELAB = '0000';
      SER102C.FECHAMOD = '00000000';
      SER102C.OPERMOD = '';
      SER102C.HORAMOD = '0000';
    } else {
      SER102C.FECHAELAB = moment().format('YYYYMMDD');
      SER102C.OPERELAB = $_ADMINW;
      SER102C.HORAELAB = moment().format('HHmm');
      SER102C.FECHAMOD = '';
      SER102C.OPERMOD = '';
      SER102C.HORAMOD = '';
    }
    SER102C.PORCOTRW = SER102C.PORCOTRW.replace('.', '').padStart(4, '0');
    let datos_envio = datosEnvio() + SER102C.NOVEDAD + '|' + SER102C.LLAVEW + '|' + SER102C.DESCRIPCUPSW + '|' +
      SER102C.TIPOW + '|' + SER102C.ABREVW + '|' + SER102C.DURACIONW + '|' + SER102C.NIVELW + '|' + SER102C.COPAGOMODW + '|' +
      SER102C.NOPOSW + '|' + SER102C.CISW + '|' + SER102C.COSTOW + '|' + SER102C.EDADMINW + '|' + SER102C.EDADMAXW + '|' +
      SER102C.UNIDEDADW + '|' + SER102C.SEXOW + '|' + SER102C.DIAGNW + '|' + SER102C.MEDIC100 + '|' + SER102C.PORCCLW + '|' +
      SER102C.PORCOTRW + '|' + SER102C.CTAOTRW + '|' + SER102C.NITOTR + '|' + SER102C.CTACONTAB1 + '|' + SER102C.CTACONTAB2 + '|' +
      SER102C.CTACONTAB3 + '|' + SER102C.DIVW + '|' + SER102C.DIV2W + '|' + SER102C.OPERELAB + '|' + SER102C.FECHAELAB + '|' +
      SER102C.HORAELAB + '|' + SER102C.OPERMOD + '|' + SER102C.FECHAMOD + '|' + SER102C.HORAMOD;
    postData({
      datosh: datos_envio
    }, get_url("APP/SALUD/SER102C-02.DLL"))
      .then((data) => {
        toastr.success('Se actualizado correctamente el registro', 'MAESTRO CUPS');
        let Window = BrowserWindow.getAllWindows();
        if (Window.length > 1) {
          _cerrarSegundaVentana();
        } else {
          _toggleNav()
        };

      }).catch((error) => {
        console.debug(error)
        _evaluardatodivision2_SER102C()
      });
  } else if (SER102C.NOVEDAD == '8') {
    SER102C.FECHAMOD = moment().format('YYYYMMDD');
    SER102C.OPERMOD = $_ADMINW;
    SER102C.HORAMOD = moment().format('HHmm');
    SER102C.PORCOTRW = SER102C.PORCOTRW.replace('.', '').padStart(4, '0');

    let datos_envio = datosEnvio() + SER102C.NOVEDAD + '|' + SER102C.LLAVEW + '|' + SER102C.DESCRIPCUPSW + '|' +
      SER102C.TIPOW + '|' + SER102C.ABREVW + '|' + SER102C.DURACIONW + '|' + SER102C.NIVELW + '|' + SER102C.COPAGOMODW + '|' +
      SER102C.NOPOSW + '|' + SER102C.CISW + '|' + SER102C.COSTOW + '|' + SER102C.EDADMINW + '|' + SER102C.EDADMAXW + '|' +
      SER102C.UNIDEDADW + '|' + SER102C.SEXOW + '|' + SER102C.DIAGNW + '|' + SER102C.MEDIC100 + '|' + SER102C.PORCCLW + '|' +
      SER102C.PORCOTRW + '|' + SER102C.CTAOTRW + '|' + SER102C.NITOTR + '|' + SER102C.CTACONTAB1 + '|' + SER102C.CTACONTAB2 + '|' +
      SER102C.CTACONTAB3 + '|' + SER102C.DIVW + '|' + SER102C.DIV2W + '|' + SER102C.OPERELAB + '|' + SER102C.FECHAELAB + '|' +
      SER102C.HORAELAB + '|' + SER102C.OPERMOD + '|' + SER102C.FECHAMOD + '|' + SER102C.HORAMOD;
    postData({
      datosh: datos_envio
    }, get_url("APP/SALUD/SER102C-02.DLL"))
      .then((data) => {

        toastr.success('Se actualizado correctamente el registro', 'MAESTRO CUPS');
        let Window = BrowserWindow.getAllWindows();
        if (Window.length > 1) {
          _cerrarSegundaVentana();
        } else {
          _toggleNav()
        };

      }).catch((error) => {
        console.debug(error)
        _evaluardatodivision2_SER102C()
      });
  } else {
    let datos_envio = datosEnvio() + SER102C.NOVEDAD + '|' + SER102C.LLAVEW + '|' + SER102C.DESCRIPCUPSW + '|' +
      SER102C.TIPOW + '|' + SER102C.ABREVW + '|' + SER102C.DURACIONW + '|' + SER102C.NIVELW + '|' + SER102C.COPAGOMODW + '|' +
      SER102C.NOPOSW + '|' + SER102C.CISW + '|' + SER102C.COSTOW + '|' + SER102C.EDADMINW + '|' + SER102C.EDADMAXW + '|' +
      SER102C.UNIDEDADW + '|' + SER102C.SEXOW + '|' + SER102C.DIAGNW + '|' + SER102C.MEDIC100 + '|' + SER102C.PORCCLW + '|' +
      SER102C.PORCOTRW + '|' + SER102C.CTAOTRW + '|' + SER102C.NITOTR + '|' + SER102C.CTACONTAB1 + '|' + SER102C.CTACONTAB2 + '|' +
      SER102C.CTACONTAB3 + '|' + SER102C.DIVW + '|' + SER102C.DIV2W + '|' + SER102C.OPERELAB + '|' + SER102C.FECHAELAB + '|' +
      SER102C.HORAELAB + '|' + SER102C.OPERMOD + '|' + SER102C.FECHAMOD + '|' + SER102C.HORAMOD;
    postData({
      datosh: datos_envio
    }, get_url("APP/SALUD/SER102C-02.DLL"))
      .then((data) => {
        toastr.success('Se elimino correctamente el registro', 'MAESTRO CUPS');
        let Window = BrowserWindow.getAllWindows();
        if (Window.length > 1) {
          _cerrarSegundaVentana();
        } else {
          _toggleNav()
        };
      }).catch((error) => {
        console.debug(error)
        _evaluardatodivision2_SER102C()
      });
  }
}

function _llenardatos_SER102C() {
  $('#descripcups_SER102C').val(SER102C.DESCRIPCUPSW);
  $('#tipocups_SER102C').val(SER102C.CUPS.TIPO_CUPS.substring(0, 1));
  $('#descriptipocups_SER102C').val(SER102C.CUPS.TIPO_CUPS.substring(4, 20));
  $('#codabrev_SER102C').val(SER102C.ABREVW);
  $('#duracion_SER102C').val(SER102C.DURACIONW);
  $('#nivcompl_SER102C').val(SER102C.NIVELW);
  $('#pagoPaci_SER102C').val(SER102C.CUPS.COPAGO);
  $('#proced_SER102C').val(SER102C.NOPOSW);
  $('#cis_SER102C').val(SER102C.CISW);
  $('#centrocosto_SER102C').val(SER102C.COSTOW);
  $('#edadminima_SER102C').val(SER102C.EDADMINW);
  $('#edadmaxima_SER102C').val(SER102C.EDADMAXW);
  $('#undedad_SER102C').val(SER102C.UNIDEDADW);
  $('#sexo_SER102C').val(SER102C.SEXOW);
  $('#pregRips_SER102C').val(SER102C.DIAGNW);
  $('#porcmedico_SER102C').val(SER102C.MEDIC100);
  $('#ingrclinica_SER102C').val(SER102C.PORCOTRW);
  $('#ingrtercer_SER102C').val(SER102C.PORCCLW);
  $('#ctaingrTercer_SER102C').val(SER102C.CTAOTRW.trim());
  $('#ctaDescripTercer_SER102C').val(SER102C.DESCRIPCTA);
  $('#nitTercer_SER102C').val(SER102C.NITOTR.trim());
  $('#descripTercer_SER102C').val(SER102C.DESCRIPNIT);
  $('#codPuc_SER102C').val(SER102C.CTACONTAB1);
  $('#codCoop_SER102C').val(SER102C.CTACONTAB2);
  $('#codOficial_SER102C').val(SER102C.CTACONTAB3);
  $('#division1_SER102C').val(SER102C.DIVW);
  $('#descripdiv1_SER102C').val(SER102C.DESCRIPDIVW);
  $('#division2_SER102C').val(SER102C.DIV2W);
  $('#descripdiv2_SER102C').val(SER102C.DESCRIPDIV2W);
  if (SER102C.NOVEDAD == '8') {
    _evaluartiposervicio_SER102C();
  } else {
    CON851P('02', _evaluardatocodigo_SER102C, _datograbar_SER102C)
  }
}


////////////VALIDACIONES POR NIT////////////////////////////
function _evaluardatpheon_SER102C() {
  $('#codHeonSER102C').removeClass('hidden');
  validarInputs(
    {
      form: "#codHeonSER102C",
      orden: '1'
    },
    () => { _evaluar100medic_SER102C() },
    () => {
      SER102C.NITOTR = $('#codHeon_SER102C').val();
      _evaluarcupsppal_SER102C();
    }
  )
}

function _evaluarcupsppal_SER102C() {
  validarInputs(
    {
      form: "#ccupPrincSER102C",
      orden: '1'
    },
    () => { _evaluardatpheon_SER102C() },
    () => {
      SER102C.CUPSPPALW = $('#cupPrinc_SER102C').val();
      _evaluardatocodigo_SER102C();
    }
  )
}

///////////F88VENTANAS/////////////////////////////////////
function _ventanaclaseservicioSER102C(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    _ventanaDatos({
      titulo: "TIPO DE SERVICIO",
      columnas: ["COD", "DESCRIPCION"],
      data: SER102C.SERVICIOS,
      callback_esc: function () {
        $("#tipocups_SER102C").focus();
      },
      callback: function (data) {
        $('#tipocups_SER102C').val(data.COD);
        $('#descriptipocups_SER102C').val(data.DESCRIPCION);
        _enterInput('#tipocups_SER102C');
      }
    });
  }
}
function _ventanaGrupoSER102C(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    _ventanaDatos({
      titulo: "VENTANA DE GRUPOS DE SERVICIOS",
      columnas: ["COD", "DESCRIP"],
      data: $_GRSER_102C,
      callback_esc: function () {
        $("#codgrupo_SER102C").focus();
      },
      callback: function (data) {
        $('#codgrupo_SER102C').val(data.COD.trim())
        $('#descripgrupo_SER102C').val(data.DESCRIP.trim())
        _enterInput('#codgrupo_SER102C');
      }
    });
  }
}

function _ventanaCupsSER102C(e) {
  let URL = get_url("APP/SALUD/SER802C.DLL");
  postData({
    datosh: datosEnvio() + localStorage.Usuario + "|" + SER102C.GRUPOW,
  }, URL)
    .then(data => {
      console.log(data, 'RESULTADO')
      SER102C.CUPS = data.CODIGOS
      SER102C.CUPS.pop()
      if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
          titulo: "VENTANA DE CODIGOS CUPS",
          columnas: ["LLAVE", "DESCRIP"],
          data: SER102C.CUPS,
          callback_esc: function () {
            $("#codcups_SER102C").focus();
          },
          callback: function (data) {
            console.log(data, 'RESPUESTA CUPS')
            $_LLAVECUPS = data.LLAVE.trim()
            // $GRUPO_7321G = $_LLAVECUPS.substring(0, 2);
            $('#codcups_SER102C').val($_LLAVECUPS.substring(2, 12))
            _enterInput('#codcups_SER102C');
          }
        });
      }

    }).catch(error => {
      console.error(error)
      $("#codcups_SER102C").focus();
    });
  // parametros = {
  //   dll: 'CUPS',
  //   valoresselect: ['Buscar por el nombre cups'],
  //   f8data: 'CUPS',
  //   columnas: [{ title: 'GRUPO' }, { title: 'LLAVE' }, { title: 'DESCRIP' }],
  //   callback: (data) => {
  //     $_LLAVECUPS = data.LLAVE.trim()
  //     SER102C.GRUPOW = $_LLAVECUPS.substring(0, 2);
  //     SER102C.CUPSW = $_LLAVECUPS.substring(2, 12);
  //     $('#codcups_SER102C').val(SER102C.CUPSW)
  //     $('#descripgrupo_SER102C').val(data.NOM_GRUPO.trim());
  //     $('#codgrupo_SER102C').val(SER102C.GRUPOW);
  //     _enterInput('#codcups_SER102C');
  //   },
  //   cancel: () => {
  //     _enterInput('#codcups_SER102C');
  //   }
  // };
  // F8LITE(parametros);
}

function _ventanaCentrCostoSER102C(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    _ventanaDatos({
      titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
      columnas: ["COD", "NOMBRE"],
      data: $_COSTOS_102C,
      callback_esc: function () {
        $("#centrocosto_SER102C").focus();
      },
      callback: function (data) {
        $('#centrocosto_SER102C').val(data.COD.trim())
        _enterInput('#centrocosto_SER102C');
      }
    });
  }
}

function _ventanaPlanCuentasSER102C(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    _ventanaDatos({
      titulo: 'VENTANA COD CONTABLE',
      columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "TIPO_MAE", "NOMBRE_MAE"],
      data: SER102C.FILTROMAE,
      callback_esc: function () {
        $("#ctaingrTercer_SER102C").focus();
      },
      callback: function (data) {
        // $_CTAARTW = data.CTA_MAY.trim() + data.SUB_CTA.trim() + data.AUX_MAE.trim();
        $('#ctaingrTercer_SER102C').val(data.LLAVE_MAE.trim())
        _enterInput('#ctaingrTercer_SER102C');
      }
    });
  }
}
function _ventanaPlanCuentas1SER102C(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    _ventanaDatos({
      titulo: 'VENTANA COD CONTABLE',
      columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "TIPO_MAE", "NOMBRE_MAE"],
      data: SER102C.FILTROMAE,
      callback_esc: function () {
        $("#codPuc_SER102C").focus();
      },
      callback: function (data) {
        $('#codPuc_SER102C').val(data.LLAVE_MAE.substring(0,11).trim())
        _enterInput('#codPuc_SER102C');
      }
    });
  }
}

function _ventanaPlanCuentas2SER102C(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    _ventanaDatos({
      titulo: 'VENTANA COD CONTABLE',
      columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "TIPO_MAE", "NOMBRE_MAE"],
      data: SER102C.FILTROMAE,
      callback_esc: function () {
        $("#codCoop_SER102C").focus();
      },
      callback: function (data) {
        $('#codCoop_SER102C').val(data.LLAVE_MAE.substring(0,11).trim())
        _enterInput('#codCoop_SER102C');
      }
    });
  }
}

function _ventanaPlanCuentas3SER102C(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    _ventanaDatos({
      titulo: 'VENTANA COD CONTABLE',
      columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "TIPO_MAE", "NOMBRE_MAE"],
      data: SER102C.FILTROMAE,
      callback_esc: function () {
        $("#codOficial_SER102C").focus();
      },
      callback: function (data) {
        $('#codOficial_SER102C').val(data.LLAVE_MAE.substring(0,11).trim())
        _enterInput('#codOficial_SER102C');
      }
    });
  }
}


function _ventanaDivision1SER102C(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    _ventanaDatos({
      titulo: "VENTANA DE CONSULTA DE DIVISION",
      columnas: ["COD", "DESCRIP"],
      data: $_DIVISION_102C,
      callback_esc: function () {
        $("#division1_SER102C").focus();
      },
      callback: function (data) {
        $('#division1_SER102C').val(data.COD.trim())
        _enterInput('#division1_SER102C');
      }
    });
  }
}
function _ventanaDivision2SER102C(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    _ventanaDatos({
      titulo: "VENTANA DE CONSULTA DE DIVISION",
      columnas: ["COD", "DESCRIP"],
      data: $_DIVISION_102C,
      callback_esc: function () {
        $("#division2_SER102C").focus();
      },
      callback: function (data) {
        $('#division2_SER102C').val(data.COD.trim())
        _enterInput('#division2_SER102C');
      }
    });
  }
}

function _ventanaTercerosSER102C(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    _ventanaDatos_lite_v2({
      titulo: 'VENTANA DE TERCEROS',
      data: $_TERCEROS_102C,
      indice: ["COD", "NOMBRE", "CIUDAD", "ACT"],
      mascara: [{
        "COD": 'Identificacion',
        "NOMBRE": 'Nombre',
        "CIUDAD": "Ciudad",
        "ACT": "Actividad",

      }],
      minLength: 3,
      callback_esc: function () {
        $("#nitTercer_SER102C").focus();
      },
      callback: function (data) {
        $('#nitTercer_SER102C').val(data.COD.trim())
        _enterInput('#nitTercer_SER102C');
      }
    });
  }
}