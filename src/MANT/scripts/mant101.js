const moment = require("moment")
const { isNumeric } = require("jquery")

var arrayGrupos_mant101 = []
var arrayArticulos_mant101 = []
var arrayClases_mant101 = []
var arrayHojasVida_mant101 = []
var arrayCiudades_mant101 = []
var arrayProtocolos_mant101 = []
var arrayTerceros_mant101 = []

var arrayPopups_mant101 =
{
  'ADQUISICION': [

    { "COD": "1", "DESCRIP": "Compra" },
    { "COD": "2", "DESCRIP": "Donacion" },
    { "COD": "3", "DESCRIP": "Comodato" },
    { "COD": "4", "DESCRIP": "Leasing" }

  ],
  'TECNOVIGILANCIA': [
    { "COD": "1", "DESCRIP": "Alto IIB" },
    { "COD": "2", "DESCRIP": "Alto III" },
    { "COD": "3", "DESCRIP": "Medio IIA" },
    { "COD": "4", "DESCRIP": "Bajo I" }
  ],
  'MANUAL': [
    { "COD": "1", "DESCRIP": "Operativo" },
    { "COD": "2", "DESCRIP": "Mantenimiento" },
    { "COD": "3", "DESCRIP": "Partes" },
    { "COD": "4", "DESCRIP": "Despiece" },
    { "COD": "5", "DESCRIP": "Otros" },
    { "COD": "6", "DESCRIP": "No existe" }
  ],
  'IDIOMA': [
    { "COD": "1", "DESCRIP": "Español" },
    { "COD": "2", "DESCRIP": "Ingles" },
    { "COD": "3", "DESCRIP": "Portugues" },
    { "COD": "4", "DESCRIP": "Frances" },
    { "COD": "5", "DESCRIP": "Otro" }
  ],
  'TIPO_TECNOLOGIA': [
    { "COD": "1", "DESCRIP": "Electrico" },
    { "COD": "2", "DESCRIP": "Electronico" },
    { "COD": "3", "DESCRIP": "Mecanico" },
    { "COD": "4", "DESCRIP": "Electromagnetico" },
    { "COD": "5", "DESCRIP": "Hidraulico" },
    { "COD": "6", "DESCRIP": "Neumatico" },
    { "COD": "7", "DESCRIP": "Vapor" },
    { "COD": "8", "DESCRIP": "Solar" },
    { "COD": "9", "DESCRIP": "No aplica" }
  ],
  'TIPO_FUENTE': [
    { "COD": "1", "DESCRIP": "Agua" },
    { "COD": "2", "DESCRIP": "Aire" },
    { "COD": "3", "DESCRIP": "Gas" },
    { "COD": "4", "DESCRIP": "Vapor" },
    { "COD": "5", "DESCRIP": "Derivados del petroleo" },
    { "COD": "6", "DESCRIP": "Electricidad" },
    { "COD": "7", "DESCRIP": "Energia solar" },
    { "COD": "8", "DESCRIP": "No aplica" }
  ],
  'USO': [
    { "COD": "1", "DESCRIP": "Medico" },
    { "COD": "2", "DESCRIP": "Oficina" },
    { "COD": "3", "DESCRIP": "Operativo" },
    { "COD": "4", "DESCRIP": "Vehiculo" }
  ],
  'ESPECIF_USO': [
    { "COD": "1", "DESCRIP": "Diagnostico" },
    { "COD": "2", "DESCRIP": "Tratamiento y mant vida" },
    { "COD": "3", "DESCRIP": "Rehabilitacion" },
    { "COD": "4", "DESCRIP": "Prevencion" },
    { "COD": "5", "DESCRIP": "Analisis de laboratorio" }
  ],
  'ESTADO': [
    { "COD": "1", "DESCRIP": "Bueno" },
    { "COD": "2", "DESCRIP": "Regular" },
    { "COD": "3", "DESCRIP": "Malo" },
    { "COD": "4", "DESCRIP": "No aplica" }
  ],
  'ULTIMA_UBICACION': [
    { "COD": "1", "DESCRIP": "En servicio" },
    { "COD": "2", "DESCRIP": "En almacen" },
    { "COD": "3", "DESCRIP": "Inservibles" },
    { "COD": "4", "DESCRIP": "Mantenimiento" },
    { "COD": "5", "DESCRIP": "Mant. Afuera" },
    { "COD": "6", "DESCRIP": "Extraviado" },
    { "COD": "7", "DESCRIP": "Por determ." }
  ],
  'RESPONSABLE': [
    { "COD": "1", "DESCRIP": "Personal empresa" },
    { "COD": "2", "DESCRIP": "Outsoursing" },
    { "COD": "3", "DESCRIP": "Proveed. equipo" }
  ],
  'PERIOCIDAD': [
    { "COD": "1", "DESCRIP": "Anual" },
    { "COD": "2", "DESCRIP": "Semestral" },
    { "COD": "3", "DESCRIP": "Trimestral" },
    { "COD": "4", "DESCRIP": "Cuatrimestral" },
    { "COD": "5", "DESCRIP": "Por hora" },
    { "COD": "6", "DESCRIP": "Por km" }
  ]
}

var $FECHAULTMANT = '', $FECHAFABRIC = '', $FECHABAJA = ''

var global_mant101 = []

var $_novedad_mant101;

var llave_mant101 = [{ 'TIPO': '', 'GRUPO': '', 'NRO': '', 'CLASE': '', 'COMPLETA': '' }]

var MaskAmp_mant101 = IMask.createMask({ mask: Number, radix: '.', padFractionalZeros: true, signed: false, scale: 1, min: 000, max: 999.9 });

var momentFormat = 'YYYY/MM/DD'
var momentMaskCompra = new IMask($("#fechaCompra_mant101")[0], {
  mask: Date,
  pattern: momentFormat,
  lazy: true,
  min: new Date(1970, 0, 1, 0, 0),
  max: new Date(2080, 0, 1, 0, 0),

  format: function (date) {
    return moment(date).format(momentFormat);
  },
  parse: function (str) {
    var fecha = moment(str).format('YYYY/MM/DD');
    console.log(fecha)
    if (fecha == "Invalid date") {
      CON851('01', '01', null, 'error', 'error');
    }
    else {
      global_mant101.FECHA_COMPRA = str;
      return moment(str, momentFormat);
    }
  },

  blocks: {
    YYYY: {
      mask: IMask.MaskedRange,
      from: 1970,
      to: 2080
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    DD: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31
    }
  }
})

var momentMaskGarantia = new IMask($("#fechaVenGaran_mant101")[0], {
  mask: Date,
  pattern: momentFormat,
  lazy: true,
  min: new Date(1970, 0, 1, 0, 0),
  max: new Date(2080, 0, 1, 0, 0),

  format: function (date) {
    return moment(date).format(momentFormat);
  },
  parse: function (str) {
    var fecha = moment(str).format('YYYY/MM/DD');
    console.log(fecha)
    if (fecha == "Invalid date") {
      CON851('01', '01', null, 'error', 'error');
    }
    else {
      global_mant101.FECHA_GARANTIA = str;
      return moment(str, momentFormat);
    }
  },

  blocks: {
    YYYY: {
      mask: IMask.MaskedRange,
      from: 1970,
      to: 2080
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    DD: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31
    }
  }
})
var momentMaskUltMant = new IMask($("#fechaUltMant_mant101")[0], {
  mask: Date,
  pattern: momentFormat,
  lazy: true,
  min: new Date(1970, 0, 1, 0, 0),
  max: new Date(2080, 0, 1, 0, 0),

  format: function (date) {
    return moment(date).format(momentFormat);
  },
  parse: function (str) {
    var fecha = moment(str).format('YYYY/MM/DD');
    console.log(fecha)
    if (fecha == "Invalid date") {
      CON851('01', '01', null, 'error', 'error');
    }
    else {
      $FECHAULTMANT = str;
      return moment(str, momentFormat);
    }
  },

  blocks: {
    YYYY: {
      mask: IMask.MaskedRange,
      from: 1970,
      to: 2080
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    DD: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31
    }
  }
})

var momentMaskFabric = new IMask($("#fechaFabric_mant101")[0], {
  mask: Date,
  pattern: 'YYYY/MM',
  lazy: true,
  min: new Date(1970, 0, 1, 0, 0),
  max: new Date(2080, 0, 1, 0, 0),

  format: function (date) {
    return moment(date).format('YYYY/MM');
  },
  parse: function (str) {
    var fecha = moment(str).format('YYYY/MM');
    console.log(fecha)
    if (fecha == "Invalid date") {
      CON851('01', '01', null, 'error', 'error');
    }
    else {
      $FECHAFABRIC = str;
      return moment(str, 'YYYY/MM');
    }
  },

  blocks: {
    YYYY: {
      mask: IMask.MaskedRange,
      from: 1970,
      to: 2080
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    }
  }
})
var momentMaskBaja = new IMask($("#fechaBaja_mant101")[0], {
  mask: Date,
  pattern: momentFormat,
  lazy: true,
  min: new Date(1970, 0, 1, 0, 0),
  max: new Date(2080, 0, 1, 0, 0),

  format: function (date) {
    return moment(date).format(momentFormat);
  },
  parse: function (str) {
    var fecha = moment(str).format('YYYY/MM/DD');
    console.log(fecha)
    if (fecha == "Invalid date") {
      CON851('01', '01', null, 'error', 'error');
    }
    else {
      $FECHABAJA = str;
      return moment(str, momentFormat);
    }
  },

  blocks: {
    YYYY: {
      mask: IMask.MaskedRange,
      from: 1970,
      to: 2080
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    DD: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31
    }
  }
})

$(document).ready(function () {
  _inputControl('reset');
  _inputControl('disabled');

  nombreOpcion('1,1 - Hoja de vida de equipos')

  _toggleF8([
    { input: 'grupo', app: 'mant101', funct: _ventanaGrupos_mant101 },
    { input: 'codigo', app: 'mant101', funct: _ventanaArticulos_mant101 },
    { input: 'clase', app: 'mant101', funct: _ventanaClases_mant101 },
    { input: 'nitProveedor', app: 'mant101', funct: _ventanaTerceros_mant101 },
    { input: 'proveedorMant', app: 'mant101', funct: _ventanaTerceros_mant101 },
    { input: 'protocolo', app: 'mant101', funct: _ventanaProtocolos_mant101 }
  ])

  traerArchivos_mant101()
  $("#mostrarObservaciones_mant101").css('display', 'none');
});

function _ventanaGrupos_mant101(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {

    var gruposFiltrados = arrayGrupos_mant101.filter(data => data.TIPO == llave_mant101.TIPO)

    _ventanaDatos({
      titulo: 'Ventana de grupos por tipo',
      columnas: ["GRUPO", "DESCRIP"],
      label: ["Codigo", "Descripcion"],
      data: gruposFiltrados,
      callback_esc: function () {
        $('#grupo_mant101').focus()
      },
      callback: function (data) {
        $('#grupo_mant101').val(data.GRUPO)
        _enterInput('#grupo_mant101')
      }
    })
  }
}

function _ventanaClases_mant101(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {

    var clasesFiltradas = arrayClases_mant101.filter(data => data.TIPO == '1')

    _ventanaDatos({
      titulo: 'Ventana de clases tipo 1',
      columnas: ["COD", "DESCRIP"],
      label: ["Codigo", "Descripcion"],
      data: clasesFiltradas,
      callback_esc: function () {
        $('#clase_mant101').focus()
      },
      callback: function (data) {
        $('#clase_mant101').val(data.COD)
        _enterInput('#clase_mant101')
      }
    })
  }
}

function _ventanaProtocolos_mant101(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    let arrayFiltrado = arrayProtocolos_mant101.filter((data) => data.COMPLETA.substring(0, 1) == global_mant101.USO);
    _ventanaDatos({
      titulo: 'Ventana de protocolos',
      columnas: ["COMPLETA", "DESCRIP"],
      label: ["CODIGO", "DESCRIPCION"],
      data: arrayFiltrado,

      callback_esc: function () { $('#protocolo_mant101').focus() },
      callback: function (data) {
        $('#protocolo_mant101').val(data.COMPLETA)
        _enterInput('#protocolo_mant101')
      }
    })
  }
}

function _ventanaTerceros_mant101(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    _ventanaDatos({
      titulo: 'Ventana de terceros',
      columnas: ["COD", "NOMBRE", "ACT", "CIUDAD"],
      data: arrayTerceros_mant101,
      callback_esc: function () {
        document.getElementById(`"${e.target.id}"`).focus;
      },
      callback: function (data) {
        e.target.value = data.COD;
        _enterInput(`#${e.target.id}`);
      }
    })
  }
}

function _ventanaArticulos_mant101(e) {
  if (e.type == "keydown" && e.which == 119 || e.type == 'click') {

    var arrayFiltrado

    switch ($_novedad_mant101) {
      case '7':
        arrayFiltrado = arrayArticulos_mant101.filter(data => parseInt(data.LLAVE_ART.substring(0, 1)) == llave_mant101.TIPO && parseInt(data.LLAVE_ART.substring(1, 3)) == parseInt(llave_mant101.GRUPO))

        _ventanaDatos({
          titulo: 'Ventana de articulos',
          columnas: ["LLAVE_ART", 'DESCRIP_ART'],
          label: ["Codigo", "Descripcion"],
          data: arrayFiltrado,
          callback_esc: function () {
            $('#codigo_mant101').focus()
          },
          callback: function (data) {
            $('#codigo_mant101').val(data.LLAVE_ART.substring(3, 16))
            $('#clase_mant101').val(data.LLAVE_ART.substring(16, 18))
            _enterInput('#codigo_mant101');
          }
        })
        break;
      case '8':
      case '9':
        arrayFiltrado = arrayHojasVida_mant101.filter(data => data.TIPO == llave_mant101.TIPO && data.GRUPO == llave_mant101.GRUPO)
        _ventanaDatos({
          titulo: 'Ventana de equipos con hoja de vida',
          columnas: ["TIPO", "GRUPO", "NRO"],
          label: ["Codigo", "Descripcion"],
          data: arrayFiltrado,
          callback_esc: function () {
            $('#codigo_mant101').focus()
          },
          callback: function (data) {
            console.log(data, 'data-articulos')
            $('#codigo_mant101').val(data.NRO)
            _enterInput('#codigo_mant101')
          }
        })
        break;
    }


  }
}

function traerArchivos_mant101() {
  llave_mant101 = llave_mant101[0]
  obtenerDatosCompletos({ nombreFd: 'GRUPOS' }, (data) => {
    arrayGrupos_mant101 = data.GRUPOS
    arrayGrupos_mant101.pop()

    obtenerDatosCompletos({ nombreFd: 'USO' }, (data) => {
      arrayClases_mant101 = data.USO
      arrayClases_mant101.length > 0 ? arrayClases_mant101.pop() : arrayClases_mant101 = arrayClases_mant101;

      obtenerDatosCompletos({ nombreFd: 'HOJA_VIDA' }, (data) => {
        arrayHojasVida_mant101 = data.HOJAS_VIDA
        arrayHojasVida_mant101.pop()

        obtenerDatosCompletos({ nombreFd: 'CIUDADES' }, (data) => {
          arrayCiudades_mant101 = data.CIUDAD
          arrayCiudades_mant101.pop()

          obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, (data) => {
            arrayTerceros_mant101 = data.TERCEROS
            arrayTerceros_mant101.pop()
            for (var i in arrayTerceros_mant101) {
              arrayTerceros_mant101[i].NOMBRE = arrayTerceros_mant101[i].NOMBRE.replace(/\�/g, "Ñ").trim()
            }
            obtenerDatosCompletos({ nombreFd: 'PROTOCOLOS_MANT' }, (data) => {
              arrayProtocolos_mant101 = data.PROTOCOLOS_MANT;
              arrayProtocolos_mant101.pop();
              $_VENTANA = 0;
              let Window = BrowserWindow.getAllWindows();
              if (Window.length > 1) {
                llave_mant101.GRUPO = $_MESSAGE[2].grupo;
                llave_mant101.TIPO = '2';
                llave_mant101.NRO = $_MESSAGE[2].llave
                $_VENTANA = 1;
                $('#grupo_mant101').val($_MESSAGE[2].grupo);
                const busquedaGrupo = arrayGrupos_mant101.find(
                  x => x.TIPO == '2' && x.GRUPO == $_MESSAGE[2].grupo
                )
                if (busquedaGrupo) {
                  $('#descripGrupo_mant101').val(busquedaGrupo.DESCRIP.trim());
                  $('#codigo_mant101').val($_MESSAGE[2].llave);
                  $('#codigo_mant101').val(espaciosDer($('#codigo_mant101').val(), 13))
                  var busqueda = [
                    { "COD": "1", "DESCRIP": "Elementos de consumo" },
                    { "COD": "2", "DESCRIP": "Devolutivos" },
                    { "COD": "3", "DESCRIP": "Infraestructura fisica" }
                  ]
                  const busquedadtipo = busqueda.find(x => x.COD == '2')
                  $('#tipo_mant101').val(busquedadtipo.COD + '.- ' + busquedadtipo.DESCRIP)
                  _Novedad_mant101({ id: '7', descripcion: 'Nuevo' })
                } else {
                  CON851('01', '01', null, 'error', 'Error');
                  validarGrupo_mant101();
                }
              } else {
                CON850(_Novedad_mant101);
              }
            }, 'OFF', () => CON851('', 'Error cargando protocolos', null, 'error', 'error'))
          }, '', () => CON851('', 'Error cargando terceros', null, 'error', 'error'))

        }, '', () => CON851('', 'Error cargando ciudades', null, 'error', 'error'))

      }, '', () => CON851('', 'Error cargando Equipos', null, 'error', 'error'))

    }, '', () => CON851('', 'Error cargando clases', null, 'error', 'error'))

  }, 'ON', () => CON851('', 'Error cargando grupos', null, 'error', 'error'))
}
function _Novedad_mant101(novedad) {
  $_novedad_mant101 = novedad.id
  switch ($_novedad_mant101) {
    case '7':
    case '8':
    case '9':
      let Window = BrowserWindow.getAllWindows();
      if (Window.length > 1) {
        obtenerDatosCompletos({ nombreFd: 'ARTICULOS', filtro: llave_mant101.TIPO }, (data) => {
          arrayArticulos_mant101 = data.ARTICULOS
          arrayArticulos_mant101.pop()

          validarGrupo_mant101()
        }, 'ONLY', () => CON851('', 'Error cargando articulos', null, 'error', 'error'))
      } else {
        setTimeout(seleccionTipo_mant101, 400)
      }
      break
    case 'F':
      salir_mant101()
      break
  }
  $('#novedad_mant101').val(novedad.id + '.- ' + novedad.descripcion)
}


function seleccionTipo_mant101() {
  loader("hide")

  var busqueda = [
    { "COD": "1", "DESCRIP": "Elementos de consumo" },
    { "COD": "2", "DESCRIP": "Devolutivos" },
    { "COD": "3", "DESCRIP": "Infraestructura fisica" }
  ]

  POPUP({
    array: busqueda,
    titulo: 'Seleccione tipo',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: () => {
      let Window = BrowserWindow.getAllWindows();
      Window.length > 1
        ? salirSegundaVentana()
        : setTimeout(CON850(_Novedad_mant101), 300)
    },
    seleccion: parseInt(llave_mant101.TIPO)
  }, function (data) {
    llave_mant101.TIPO = data.COD
    $('#tipo_mant101').val(llave_mant101.TIPO + '.- ' + data.DESCRIP)
    obtenerDatosCompletos({ nombreFd: 'ARTICULOS', filtro: llave_mant101.TIPO }, (data) => {
      arrayArticulos_mant101 = data.ARTICULOS
      arrayArticulos_mant101.pop()

      validarGrupo_mant101()
    }, 'ONLY',
      () => CON851('', 'Error cargando articulos', null, 'error', 'error'))
  })
}

function salir_mant101() {
  $('#tabla_mant101 tbody').empty();
  arrayProtocolos_mant101 = [];
  arrayGrupos_mant101 = [];
  arrayArticulos_mant101 = [];
  arrayClases_mant101 = [];
  arrayHojasVida_mant101 = [];
  arrayCiudades_mant101 = [];
  llave_mant101 = [];
  $_novedad_mant101 = '';
  salirSegundaVentana();
}

function validarGrupo_mant101() {
  validarInputs(
    {
      form: "#validarGrupo_mant101",
      orden: '1'
    },
    () => { setTimeout(seleccionTipo_mant101, 300) },
    () => {
      llave_mant101.GRUPO = cerosIzq($('#grupo_mant101').val(), 2)
      $('#grupo_mant101').val(llave_mant101.GRUPO)

      var busquedaGrupo = arrayGrupos_mant101.find(data => data.TIPO == llave_mant101.TIPO && data.GRUPO == llave_mant101.GRUPO)

      console.log(busquedaGrupo)
      if (busquedaGrupo) {
        $('#descripGrupo_mant101').val(busquedaGrupo.DESCRIP.trim())
        validarNro_mant101()
      } else {
        $('#descripGrupo_mant101').val('Grupo no existe!')
        CON851('01', '01', null, 'error', 'Error');

        switch ($_novedad_mant101) {
          case '7':
            validarNro_mant101()
            break;
          case '8':
          case '9':
            validarGrupo_mant101()
            break;
        }
      }
    })
}

function validarNro_mant101() {
  validarInputs(
    {
      form: "#validarCodigo_mant101",
      orden: '1'
    },
    validarGrupo_mant101,
    () => {
      llave_mant101.NRO = espaciosDer($('#codigo_mant101').val(), 13)
      $('#codigo_mant101').val(llave_mant101.NRO.trim().toUpperCase())

      if ($_novedad_mant101 == '7') {
        validarClase_mant101()
      } else {
        var busquedaClase = arrayArticulos_mant101.filter(data => data.LLAVE_ART.substring(0, 16) == (llave_mant101.TIPO + llave_mant101.GRUPO + llave_mant101.NRO.trim().toUpperCase()))

        if (busquedaClase.length > 0 && llave_mant101.CLASE == '') {
          if (busquedaClase[0].LLAVE_ART.substring(16, 18).trim() != '') {
            $('#clase_mant101').val(busquedaClase[0].LLAVE_ART.substring(16, 18).trim())
          }
        }
        validarClase_mant101()
      }
    })
}

function validarClase_mant101() {
  validarInputs(
    {
      form: "#validarClase_mant101",
      orden: '1'
    },
    validarNro_mant101,
    () => {
      llave_mant101.CLASE = $('#clase_mant101').val()
      $('#clase_mant101').val(llave_mant101.CLASE.trim())

      if (llave_mant101.CLASE.trim() == '') {
        buscarArticulo_mant101()
      } else {
        var busquedaClase = arrayClases_mant101.find(data => data.TIPO == '1' && data.COD.trim() == llave_mant101.CLASE.trim())

        if (busquedaClase) {
          buscarArticulo_mant101()
        } else {
          CON851('01', 'NO EXISTE CLASE!', null, 'error', 'Error');
          if ($_novedad_mant101 == '7') {
            validarClase_mant101()
          } else {
            buscarArticulo_mant101()
          }
        }
      }
    })
}

function buscarArticulo_mant101() {
  llave_mant101.COMPLETA = llave_mant101.TIPO + llave_mant101.GRUPO + llave_mant101.NRO + llave_mant101.CLASE

  var busquedaArticulo = arrayArticulos_mant101.find(data => data.LLAVE_ART.trim() == llave_mant101.COMPLETA.trim().toUpperCase())
  console.log(busquedaArticulo)

  if (busquedaArticulo) {
    // ACA DEBE CONSULTAR INV808B PARA TRAER EL PRIMER ALMACEN CON SALDO EN BASE AL ARTICULO
    $('#descripcion_mant101').val(busquedaArticulo.DESCRIP_ART.trim())
    $('#marca_mant101').val(busquedaArticulo.MARCA.trim())

    buscarHojaVida_mant101()
  } else {
    CON851('01', 'NO EXISTE ARTICULO!', null, 'error', 'Error');
    validarNro_mant101()
  }
}

function buscarHojaVida_mant101() {

  var busquedaHojaVida = arrayHojasVida_mant101.find(data => data.LLAVE.trim() == llave_mant101.COMPLETA.trim().toUpperCase());

  switch ($_novedad_mant101) {
    case '7':
      $("#mostrarObservaciones_mant101").hide();
      if (busquedaHojaVida) {
        CON851('00', 'Hoja de vida ya existe', null, 'error', 'error')
        validarNro_mant101()
      } else {
        asignarArrayVacio_mant101();
        validarFechaCompra_mant101();
      }
      break;
    case '8':
      if (busquedaHojaVida) {
        consultaDatos_mant101();
      } else {
        CON851('00', 'Hoja de vida no existe!', null, 'error', 'error')
        validarNro_mant101();
      }
      break;
    case '9':
      if (busquedaHojaVida) {
        consultaDatos_mant101();
      } else {
        CON851('00', 'Hoja de vida no existe!', null, 'error', 'error')
        validarNro_mant101()
      } break;
  }
}

function consultaDatos_mant101() {
  $("#mostrarObservaciones_mant101").show();
  let URL = get_url("APP/MANT/MANT101.DLL")
  postData({
    datosh: datosEnvio() + llave_mant101.COMPLETA.trim().toUpperCase() + '|'
  }, URL)
    .then(function (data) {
      global_mant101 = data.HOJA_VIDA;
      global_mant101 = global_mant101[0];
      for (i in global_mant101) global_mant101[i]
        ? global_mant101[i] = global_mant101[i]
        : global_mant101[i] = ' ';


      for (let i = 0; i < 20; i++) {
        let componente = global_mant101.TABLA_COMPONENTES[i];
        global_mant101.TABLA_COMPONENTES[i] = {
          'DESCRIPCION': componente ? componente.DESCRIPCION : ' ',
          'ITEM': `${(i + 1)}`,
          'MARCA': componente ? componente.MARCA : ' ',
          'MODELO': componente ? componente.MODELO : ' ',
          'SERIE': componente ? componente.SERIE : ' ',
          'SW': componente ? 'true' : 'false'
        }
      }
      mostrarDatos_mant101();
    })
    .catch(err => {
      console.log(err, 'error trayendo Hoja de vida'); loader("hide")
    })
}

function mostrarDatos_mant101() {
  const tipos_list = [{ "COD": "1", "DESCRIP": "Elementos de consumo" }, { "COD": "2", "DESCRIP": "Devolutivos" }, { "COD": "3", "DESCRIP": "Infraestructura fisica" }]
  let tipo = tipos_list.map(function (e) { return e.COD; }).indexOf(llave_mant101.TIPO);
  $('#tipo_mant101').val(tipos_list[tipo].COD + '.- ' + tipos_list[tipo].DESCRIP.trim());

  $('#grupo_mant101').val(llave_mant101.GRUPO);
  const busquedaGrupo = arrayGrupos_mant101.find(data => data.TIPO == llave_mant101.TIPO && data.GRUPO == llave_mant101.GRUPO)
  busquedaGrupo ? $('#descripGrupo_mant101').val(busquedaGrupo.DESCRIP.trim()) : $('#descripGrupo_mant101').val(' ');

  const busquedaClase = arrayClases_mant101.find(data => data.TIPO == '1' && data.COD.trim() == llave_mant101.CLASE.trim())
  busquedaClase ? $('#clase_mant101').val(busquedaClase.DESCRIP.trim()) : $('#clase_mant101').val(' ');

  momentMaskCompra.typedValue = global_mant101.FECHA_COMPRA;
  momentMaskGarantia.typedValue = global_mant101.FECHA_GARANTIA;
  momentMaskFabric.typedValue = global_mant101.FECHA_FABRIC;
  momentMaskUltMant.typedValue = global_mant101.FECHA_ULT_MANT;
  momentMaskBaja.typedValue = global_mant101.FECHA_BAJA;

  const busqueda_proveedor = arrayTerceros_mant101.find(data => parseInt(data.COD) == parseInt(global_mant101.NIT_PROVEEDOR));
  $('#nitProveedor_mant101').val(busqueda_proveedor ? busqueda_proveedor.COD : ' ');
  $('#descripProveedor_mant101').val(busqueda_proveedor ? busqueda_proveedor.NOMBRE.trim() : ' ');
  $('#direccProveedor_mant101').val(busqueda_proveedor ? busqueda_proveedor.DIRREC.trim() : ' ');
  $('#telefProveedor_mant101').val(busqueda_proveedor ? busqueda_proveedor.TELEF.trim() : ' ');
  $('#ciudProveedor_mant101').val(busqueda_proveedor ? busqueda_proveedor.CIUDAD.trim() : ' ');

  const busqueda_adq = arrayPopups_mant101['ADQUISICION'].find(e => e.COD == global_mant101.FORMA_ADQ);
  $('#adquisicion_mant101').val(busqueda_adq ? busqueda_adq.COD + '.- ' + busqueda_adq.DESCRIP.trim() : ' ');

  const busquedaMarca = arrayArticulos_mant101.find(data => data.LLAVE_ART == llave_mant101.COMPLETA);
  $('#marca_mant101').val(busquedaMarca ? busquedaMarca.MARCA.trim() : ' ');

  $('#serial_mant101').val(global_mant101.SERIAL ? global_mant101.SERIAL.trim() : ' ');
  $('#modelo_mant101').val(global_mant101.MODELO ? global_mant101.MODELO.trim().toUpperCase() : ' ');
  $('#modelo_mant101').val(global_mant101.MODELO ? global_mant101.MODELO.trim() : ' ');
  const busqueda_manual = arrayPopups_mant101['MANUAL'].find(e => e.COD == parseInt(global_mant101.MANUAL));
  const busqueda_idioma = arrayPopups_mant101['IDIOMA'].find(e => e.COD == parseInt(global_mant101.IDIOMA));
  $('#manual_mant101').val(busqueda_manual ? busqueda_manual.DESCRIP : ' ');
  $('#idioma_mant101').val(busqueda_idioma ? busqueda_idioma.DESCRIP : ' ');

  $('#voltaje_mant101').val(global_mant101.VOLTAJE ? global_mant101.VOLTAJE.trim() : '0');
  $('#voltaje_mant101').val(
    $('#voltaje_mant101').val().concat(' V')
  );

  const potencia = Number(global_mant101.AMPE) * Number(global_mant101.VOLTAJE)

  $('#corriente_mant101').val(global_mant101.AMPE ? global_mant101.AMPE ? MaskAmp_mant101.resolve(global_mant101.AMPE.toString()) : 0 : 0);
  $('#corriente_mant101').val(
    $('#corriente_mant101').val().concat(' A')
  );

  $('#frecuencia_mant101').val(global_mant101.FRECUENCIA ? parseInt(global_mant101.FRECUENCIA) : ' ');
  $('#frecuencia_mant101').val(
    $('#frecuencia_mant101').val().concat(' HZ')
  );

  $('#potencia_mant101').val(potencia ? potencia : '0');
  $('#potencia_mant101').val($('#potencia_mant101').val().concat(' W'));

  const busqueda_tecnov = arrayPopups_mant101['TECNOVIGILANCIA'].find(e => e.COD == parseInt(global_mant101.TECNOVIG));
  $('#tecnovigilancia_mant101').val(busqueda_tecnov ? busqueda_tecnov.DESCRIP.trim() : ' ');

  const busquedaTecnologia1 = arrayPopups_mant101['TIPO_TECNOLOGIA'].find(e => e.COD == parseInt(global_mant101.CLASE_1));
  $('#claseTec1_mant101').val(busquedaTecnologia1 ? busquedaTecnologia1.COD + '.- ' + busquedaTecnologia1.DESCRIP : ' ')

  const busquedaTecnologia2 = arrayPopups_mant101['TIPO_TECNOLOGIA'].find(e => e.COD == parseInt(global_mant101.CLASE_2));
  $('#claseTec2_mant101').val(busquedaTecnologia2 ? busquedaTecnologia2.COD + '.- ' + busquedaTecnologia2.DESCRIP : ' ');

  const busquedaTecnologia3 = arrayPopups_mant101['TIPO_TECNOLOGIA'].find(e => e.COD == parseInt(global_mant101.CLASE_3));
  $('#claseTec3_mant101').val(busquedaTecnologia3 ? busquedaTecnologia3.COD + '.- ' + busquedaTecnologia3.DESCRIP : ' ');

  const busquedaFuente1 = arrayPopups_mant101['TIPO_FUENTE'].find(e => e.COD == parseInt(global_mant101.FUENTEALI_1));
  $('#fuenteAli1_mant101').val(busquedaFuente1 ? busquedaFuente1.COD + '.- ' + busquedaFuente1.DESCRIP : ' ')

  const busquedaFuente2 = arrayPopups_mant101['TIPO_FUENTE'].find(e => e.COD == parseInt(global_mant101.FUENTEALI_2));
  $('#fuenteAli2_mant101').val(busquedaFuente2 ? busquedaFuente2.COD + '.- ' + busquedaFuente2.DESCRIP : ' ');

  const busquedaFuente3 = arrayPopups_mant101['TIPO_FUENTE'].find(e => e.COD == parseInt(global_mant101.FUENTEALI_3));
  $('#fuenteAli3_mant101').val(busquedaFuente3 ? busquedaFuente3.COD + '.- ' + busquedaFuente3.DESCRIP : ' ');

  const busqueda_uso = arrayPopups_mant101['USO'].find(e => e.COD == global_mant101.USO);
  $('#uso_mant101').val(busqueda_uso ? busqueda_uso.COD + '.- ' + busqueda_uso.DESCRIP : ' ');

  const busqueda_estado = arrayPopups_mant101['ESTADO'].find(e => e.COD == global_mant101.ESTADO);
  $('#estado_mant101').val(busqueda_estado ? busqueda_estado.COD + '.- ' + busqueda_estado.DESCRIP : ' ');

  const busqueda_utlUbic = arrayPopups_mant101['ULTIMA_UBICACION'].find(e => e.COD == global_mant101.ULT_UBIC);
  $('#ultUbica_mant101').val(busqueda_utlUbic ? busqueda_utlUbic.COD + '.- ' + busqueda_utlUbic.DESCRIP : ' ');

  const resp = arrayPopups_mant101['RESPONSABLE'].find(e => e.COD.trim() == global_mant101.RESPONSABLE.trim());
  $('#responsable_mant101').val(resp ? resp.COD + '.- ' + resp.DESCRIP : ' ');
  let busquedaProveedor_mant = '';
  switch (global_mant101.RESPONSABLE) {
    case '1':
      global_mant101.PROVEEDOR_MANT = $_USUA_GLOBAL[0].NIT;
      busquedaProveedor_mant = arrayTerceros_mant101.find(data => data.COD.toString().trim() == $_USUA_GLOBAL[0].NIT.toString().trim());

      $('#proveedorMant_mant101').val(
        typeof busquedaProveedor_mant == 'undefined'
          ? $_USUA_GLOBAL[0].NIT
          : busquedaProveedor_mant.COD
      );
      $('#descripProveedorMant_mant101').val(
        !typeof busquedaProveedor_mant == 'undefined'
          ? busquedaProveedor_mant.NOMBRE
          : $_USUA_GLOBAL[0].NOMBRE
      );
      $('#ciudadProveedorMant_mant101').val(
        !typeof busquedaProveedor_mant == 'undefined'
          ? busquedaProveedor_mant.CIUDAD
          : $_USUA_GLOBAL[0].NOMBRE_CIU
      );
      break;
    case '3':
      global_mant101.PROVEEDOR_MANT = global_mant101.NIT_PROVEEDOR
      busquedaProveedor_mant = arrayTerceros_mant101.find(data => data.COD.trim() == global_mant101.PROVEEDOR_MANT.toString().trim());
      $('#proveedorMant_mant101').val(busquedaProveedor_mant.COD);
      $('#descripProveedorMant_mant101').val(busquedaProveedor_mant.NOMBRE);
      $('#ciudadProveedorMant_mant101').val(busquedaProveedor_mant.CIUDAD);
      break;
    default:
      $('#proveedorMant_mant101').val(' ');
      $('#descripProveedorMant_mant101').val('*****************')
      $('#ciudadProveedorMant_mant101').val('******************');
      break;
  }

  $('#vidaUtil_mant101').val(
    global_mant101.VIDA_UTIL
      ? cerosIzq(global_mant101.VIDA_UTIL, 3) + ' Años'
      : " "
  );

  if (global_mant101.PERIODO_MANT) {
    const busqueda_periodo = arrayPopups_mant101['PERIOCIDAD'].find(e => e.COD == global_mant101.PERIODO_MANT);
    $('#periocidad_mant101').val(busqueda_periodo ? busqueda_periodo.COD + '.- ' + busqueda_periodo.DESCRIP : ' ');
    global_mant101.HRKM_MANT = parseInt(busqueda_periodo.COD) == 6 || parseInt(busqueda_periodo.COD) == 5 ? global_mant101.HRKM_MANT : 0;
  }

  const busquedaProtocolo = arrayProtocolos_mant101.find(data => data.COMPLETA == global_mant101.PROTOCOLO_MANT)
  busquedaProtocolo ? $('#descripProtocolo_mant101').val(busquedaProtocolo.DESCRIP.trim()) : $('#descripProtocolo_mant101').val('************');
  busquedaProtocolo ? $('#protocolo_mant101').val(busquedaProtocolo.COMPLETA.trim()) : $('#protocolo_mant101').val('0000');

  global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES ? global_mant101.OBSERVACIONES : ' ';
  global_mant101.OBSERVACIONES.replace(/\�/g, "Ñ").trim();
  global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/&/g, "\n");

  $('#observacionDisplay_mant101').val(global_mant101.OBSERVACIONES);
  const fecha_aceite = !moment(global_mant101.FECHA_ACEITE).isValid()

  $('#aceite_mant101').val(
    !fecha_aceite == 'invalid date'
      ? moment(global_mant101.FECHA_ACEITE).format('YYYY/MM/DD')
      : '0000/00/00'
  );
  $('#horometro_tacometro_mant101').val(global_mant101.HRKM_ANTMAN_MANT);
  if ($_novedad_mant101 == '8' || $_novedad_mant101 == '9') {
    $('#fecha_modif_mant101').val(moment(global_mant101.FECHA_MODIF.trim()).format('YYYY/MM/DD'));
    $('#modifico_mant101').val(global_mant101.OPER_MODIF.trim());
  }

  if ($_novedad_mant101 == '8') setTimeout(() => { insertarFilaTab_mant101(); validarFechaCompra_mant101() }, 400);
  else { eliminarDatos_mant101() }
}

function eliminarDatos_mant101() {
  const data = { 'datosh': datosEnvio() + $_novedad_mant101 + '|' + llave_mant101.COMPLETA.trim().toUpperCase() };
  var URL = get_url("APP/MANT/MANT101-02.DLL");
  CON851P('54', () => { salirSegundaVentana(); }, () => {
    postData(data, URL)
      .then((data) => {
        CON851('', 'Registro eliminado', null, 'success', 'Exito');
        salir_mant101();
      }).catch(error => { console.error(error); salirSegundaVentana() })
  })
}

function asignarArrayVacio_mant101() {
  global_mant101 = [{
    'FECHA_COMPRA': '',
    'FECHA_GARANTIA': '',
    'FECHA_FABRIC': '',
    'FECHA_ACEITE': '',
    'FECHA_BAJA': '',
    'FECHA_ULT_MANT': '',
    'FECHA_ACEITE': '',
    'FORMA_ADQ': '1',
    'USO': '',
    'MODELO': '',
    'SERIAL': '',
    'CLASE_1': '',
    'CLASE_2': '',
    'CLASE_3': '',
    'NIT_PROVEEDOR': '',
    'MANUAL': '1',
    'IDIOMA': '1',
    'TECNOVIG': '1',
    'VOLTAJE': '',
    'AMPE': '',
    'POTENCIA': '',
    'FRECUENCIA': '',
    'FUENTEALI_1': '',
    'FUENTEALI_2': '',
    'FUENTEALI_3': '',
    'VIDA_UTIL': '',
    'ESTADO': '',
    'USO_ESPECIF': '',
    'HRKM_MANT': '',
    'HRKM_ANTMAN_MANT': '',
    'PROTOCOLO_MANT': '',
    'PROVEEDOR_MANT': '',
    'TABLA_COMPONENTES': [],
    'OBSERVACIONES': ''

  }]

  global_mant101 = global_mant101[0];
  for (let i = 0; i < 20; i++) {
    global_mant101.TABLA_COMPONENTES[i] = {
      'ITEM': `${(i + 1)}`,
      'DESCRIPCION': ' ',
      'MARCA': ' ',
      'MODELO': ' ',
      'SERIE': ' ',
      'SW': 'false'
    }
  }
}

function validarFechaCompra_mant101() {
  validarInputs(
    {
      form: "#validarFechaCompra_mant101",
      orden: '1'
    },
    () => CON851P('03', validarFechaCompra_mant101, validarClase_mant101),
    () => {
      global_mant101.FECHA_COMPRA = moment(global_mant101.FECHA_COMPRA).format("YYYYMMDD")
      console.log(global_mant101.FECHA_COMPRA)

      if (global_mant101.FECHA_COMPRA == 'Invalid date') {
        CON851('', 'Fecha invalida!', null, 'error', 'error')
        validarFechaCompra_mant101()
      } else {
        validarFechaGarantia_mant101()
      }
    })
}

function validarFechaGarantia_mant101() {
  validarInputs(
    {
      form: "#validarFechaVenceGaran_mant101",
      orden: '1'
    },
    validarFechaCompra_mant101,
    () => {
      global_mant101.FECHA_GARANTIA = moment(global_mant101.FECHA_GARANTIA).format("YYYYMMDD")
      console.log(global_mant101.FECHA_GARANTIA)

      if (global_mant101.FECHA_GARANTIA == 'Invalid date') {
        CON851('', 'Fecha invalida!', null, 'error', 'error')
        validarFechaGarantia_mant101()
      } else {
        validarFechaFabric_mant101()
      }
    })
}

function validarFechaFabric_mant101() {
  validarInputs(
    {
      form: "#validarFechaFabricacion_mant101",
      orden: '1'
    },
    validarFechaGarantia_mant101,
    () => {
      global_mant101.FECHA_FABRIC = moment($FECHAFABRIC).format("YYYYMM")
      console.log(global_mant101.FECHA_FABRIC)

      if ($('#fechaFabric_mant101').val().length < 7) {
        global_mant101.FECHA_FABRIC = '00000000'
        $('#fechaFabric_mant101').val('')
      }
      validarFechaUltManteni_mant101()

    })
}

function validarFechaUltManteni_mant101() {
  validarInputs(
    {
      form: "#validarFechaUltMant_mant101",
      orden: '1'
    }, () => {
      global_mant101.FECHA_ULT_MANT = moment($FECHAULTMANT).format("YYYYMMDD")
      validarFechaFabric_mant101()
    },
    () => {
      console.log(global_mant101.FECHA_ULT_MANT)
      if ($FECHAULTMANT.length < 10) {
        global_mant101.FECHA_ULT_MANT = '00000000'
        $('#fechaUltMant_mant101').val('')
      }
      validarFechaBaja_mant101()

    })
}

function validarFechaBaja_mant101() {
  validarInputs(
    {
      form: "#validarFechaBaja_mant101",
      orden: '1'
    }, () => {
      global_mant101.FECHA_ULT_MANT = moment($FECHAULTMANT).format("YYYYMMDD")
      validarFechaUltManteni_mant101()
    },
    () => {
      global_mant101.FECHA_BAJA = moment($FECHABAJA).format("YYYYMMDD")
      console.log(global_mant101.FECHA_BAJA)
      if ($('#fechaBaja_mant101').val().length < 10) {
        global_mant101.FECHA_BAJA = '00000000'
        $('#fechaBaja_mant101').val('')
      }
      validarNitProveedor_mant101()

    })
}

function validarNitProveedor_mant101() {
  validarInputs(
    {
      form: "#validarNitProveedor_mant101",
      orden: '1'
    },
    () => {
      global_mant101.NIT_PROVEEDOR = espaciosIzq($('#nitProveedor_mant101').val(), 10)
      validarFechaBaja_mant101();
    },
    () => {
      global_mant101.NIT_PROVEEDOR = espaciosIzq($('#nitProveedor_mant101').val(), 10)

      if (global_mant101.NIT_PROVEEDOR.trim() == '') {
        $('#descripProveedor_mant101').val('')
        $('#direccProveedor_mant101').val('')
        $('#telefProveedor_mant101').val('')
        $('#ciudProveedor_mant101').val('')
        setTimeout(() => { seleccionFormaAdq_mant101() }, 400);
      } else {
        var busquedaTercero = arrayTerceros_mant101.find(data => data.COD.trim() == global_mant101.NIT_PROVEEDOR.trim())
        console.log(busquedaTercero)

        if (busquedaTercero) {

          $('#descripProveedor_mant101').val(busquedaTercero.NOMBRE.trim())
          $('#direccProveedor_mant101').val(busquedaTercero.DIRREC.trim())
          $('#telefProveedor_mant101').val(busquedaTercero.TELEF.trim())
          $('#ciudProveedor_mant101').val(busquedaTercero.CIUDAD.trim())

          setTimeout(() => { seleccionFormaAdq_mant101() }, 400);
        } else {
          CON851('', 'No existe tercero!', null, 'error', 'error')
          validarNitProveedor_mant101()
        }
      }
    })
}

function seleccionFormaAdq_mant101() {
  POPUP({
    array: arrayPopups_mant101.ADQUISICION,
    titulo: 'Seleccione Forma de adquisicion',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: validarNitProveedor_mant101,
    seleccion: parseInt(global_mant101.FORMA_ADQ)
  }, function (data) {
    global_mant101.FORMA_ADQ = data.COD
    $('#adquisicion_mant101').val(data.DESCRIP)
    validarSerial_mant101()
  })
}

function validarSerial_mant101() {
  validarInputs(
    {
      form: "#validarSerial_mant101",
      orden: '1'
    },
    seleccionFormaAdq_mant101,
    () => {
      global_mant101.SERIAL = espaciosDer($('#serial_mant101').val(), 20)
      setTimeout(seleccionTecnovigilancia_mant101, 400)
    })
}

function seleccionTecnovigilancia_mant101() {
  POPUP({
    array: arrayPopups_mant101.TECNOVIGILANCIA,
    titulo: 'Seleccione Tecnovigilancia',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: validarSerial_mant101,
    seleccion: parseInt(global_mant101.TECNOVIG)
  }, function (data) {
    global_mant101.TECNOVIG = cerosIzq(data.COD, 2)
    $('#tecnovigilancia_mant101').val(data.DESCRIP)
    setTimeout(seleccionManual_mant101, 400)

  })
}

function seleccionManual_mant101() {
  POPUP({
    array: arrayPopups_mant101.MANUAL,
    titulo: 'Seleccione Manual',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: () => setTimeout(seleccionTecnovigilancia_mant101, 400),
    seleccion: parseInt(global_mant101.MANUAL)
  }, function (data) {
    global_mant101.MANUAL = cerosIzq(data.COD, 2)
    $('#manual_mant101').val(data.DESCRIP)

    if (global_mant101.MANUAL != '6') {
      setTimeout(seleccionIdioma_mant101, 400)
    } else {
      global_mant101.IDIOMA = '0'
      $('#idioma_mant101').val('No')
      validarModelo_mant101()
    }
  })
}

function seleccionIdioma_mant101() {
  POPUP({
    array: arrayPopups_mant101.IDIOMA,
    titulo: 'Seleccione Idioma Manual',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: () => setTimeout(seleccionManual_mant101, 300),
    seleccion: parseInt(global_mant101.IDIOMA)
  }, function (data) {
    global_mant101.IDIOMA = cerosIzq(data.COD, 2)
    $('#idioma_mant101').val(data.DESCRIP)

    validarModelo_mant101()
  })
}

function validarModelo_mant101() {
  validarInputs(
    {
      form: "#validarModelo_mant101",
      orden: '1'
    },
    () => {
      if (global_mant101.MANUAL != '6') {
        setTimeout(seleccionIdioma_mant101, 300)
      } else {
        setTimeout(seleccionManual_mant101, 300)
      }
    },
    () => {
      global_mant101.MODELO = espaciosDer($('#modelo_mant101').val(), 15)

      $('#voltaje_mant101').val(global_mant101.VOLTAJE.trim())
      validarVoltaje_mant101()
    })
}

function validarVoltaje_mant101() {
  validarInputs(
    {
      form: "#validarVoltaje_mant101",
      orden: '1'
    },
    () => {
      validarModelo_mant101()
      $('#voltaje_mant101').val(global_mant101.VOLTAJE + ' V')
    },
    () => {
      global_mant101.VOLTAJE = cerosIzq($('#voltaje_mant101').val(), 3)

      $('#voltaje_mant101').val(global_mant101.VOLTAJE.trim() + ' V')
      $('#corriente_mant101').val(global_mant101.AMPE)
      validarAmperio_mant101()
    })
}

function validarAmperio_mant101() {
  validarInputs(
    {
      form: "#validarCorriente_mant101",
      orden: '1'
    },
    () => {
      validarVoltaje_mant101()
      $('#voltaje_mant101').val(global_mant101.VOLTAJE.trim())
      $('#corriente_mant101').val(global_mant101.AMPE + ' A')
    },
    () => {
      global_mant101.AMPE = MaskAmp_mant101.resolve($('#corriente_mant101').val())

      $('#corriente_mant101').val(global_mant101.AMPE + ' A')

      global_mant101.POTENCIA = Number(global_mant101.AMPE) * Number(global_mant101.VOLTAJE)
      console.log(global_mant101.POTENCIA)
      $('#potencia_mant101').val(global_mant101.POTENCIA + ' W')
      $('#frecuencia_mant101').val(global_mant101.FRECUENCIA.trim())
      validarFrecuencia_mant101()
    })
}

function validarFrecuencia_mant101() {
  validarInputs(
    {
      form: "#validarFrecuencia_mant101",
      orden: '1'
    },
    () => {
      validarAmperio_mant101()
      $('#corriente_mant101').val(global_mant101.AMPE)
      let frecuencia = global_mant101.FRECUENCIA ? `${parseInt(global_mant101.FRECUENCIA)}` : 0;
      $('#frecuencia_mant101').val(frecuencia + ' HZ');
    },
    () => {
      global_mant101.FRECUENCIA = cerosIzq($('#frecuencia_mant101').val(), 2)
      let frecuencia = `${parseInt(global_mant101.FRECUENCIA)}`;
      switch (frecuencia) {
        case '00':
        case '50':
        case '60':
          $('#frecuencia_mant101').val(frecuencia.trim() + ' HZ')
          setTimeout(seleccionTec1_mant101, 400)
          break;
        default:
          CON851('03', '03', null, 'error', 'error')
          validarFrecuencia_mant101()
          break;
      }
    })
}

function seleccionTec1_mant101() {

  POPUP({
    array: arrayPopups_mant101.TIPO_TECNOLOGIA,
    titulo: 'Seleccione Clase de tecnologia 1',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: () => {
      $('#frecuencia_mant101').val(global_mant101.FRECUENCIA.trim())
      validarFrecuencia_mant101()
    },
    seleccion: parseInt(global_mant101.CLASE_1)
  }, function (data) {
    global_mant101.CLASE_1 = data.COD
    $('#claseTec1_mant101').val(data.COD + '.- ' + data.DESCRIP)

    if (global_mant101.CLASE_1 == '9') {
      global_mant101.CLASE_2 = '9'
      $('#claseTec2_mant101').val('9. - No aplica')
      global_mant101.CLASE_3 = '9'
      $('#claseTec3_mant101').val('9. - No aplica')
      setTimeout(seleccionFuente1_mant101, 300)
    } else {
      setTimeout(seleccionTec2_mant101, 300)
    }
  })
}

function seleccionTec2_mant101() {
  POPUP({
    array: arrayPopups_mant101.TIPO_TECNOLOGIA,
    titulo: 'Seleccione Clase de tecnologia 2',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: () => setTimeout(seleccionTec1_mant101, 300),
    seleccion: parseInt(global_mant101.CLASE_2)
  }, function (data) {
    global_mant101.CLASE_2 = data.COD
    $('#claseTec2_mant101').val(data.COD + '.- ' + data.DESCRIP)

    if (global_mant101.CLASE_2 == '9') {
      global_mant101.CLASE_3 = '9'
      $('#claseTec3_mant101').val('9. - No aplica')
      setTimeout(seleccionFuente1_mant101, 300)
    } else {
      setTimeout(seleccionTec3_mant101, 300)
    }
  })
}

function seleccionTec3_mant101() {
  POPUP({
    array: arrayPopups_mant101.TIPO_TECNOLOGIA,
    titulo: 'Seleccione Clase de tecnologia 3',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: () => setTimeout(seleccionTec2_mant101, 300),
    seleccion: parseInt(global_mant101.CLASE_3)
  }, function (data) {
    global_mant101.CLASE_3 = data.COD
    $('#claseTec3_mant101').val(data.COD + '.- ' + data.DESCRIP)

    setTimeout(seleccionFuente1_mant101, 300)
  })
}

function seleccionFuente1_mant101() {
  if (global_mant101.CLASE_1 == '9') {

    global_mant101.FUENTEALI_1 = '8'
    $('#fuenteAli1_mant101').val('8. - No aplica')

    global_mant101.FUENTEALI_2 = '8'
    $('#fuenteAli2_mant101').val('8. - No aplica')

    global_mant101.FUENTEALI_3 = '8'
    $('#fuenteAli3_mant101').val('8. - No aplica')

    setTimeout(seleccionUso_mant101, 300)
  } else {

    POPUP({
      array: arrayPopups_mant101.TIPO_FUENTE,
      titulo: 'Seleccione Fuente de alimentacion 1',
      indices: [
        { id: 'COD', label: 'DESCRIP' }
      ],
      callback_f: () => setTimeout(seleccionTec1_mant101, 300),
      seleccion: parseInt(global_mant101.FUENTEALI_1)
    }, function (data) {
      global_mant101.FUENTEALI_1 = data.COD
      $('#fuenteAli1_mant101').val(data.COD + '.- ' + data.DESCRIP)

      setTimeout(seleccionFuente2_mant101, 300)
    })
  }
}

function seleccionFuente2_mant101() {
  if (global_mant101.CLASE_2 == '9') {

    global_mant101.FUENTEALI_2 = '8'
    $('#fuenteAli2_mant101').val('8. - No aplica')

    global_mant101.FUENTEALI_3 = '8'
    $('#fuenteAli3_mant101').val('8. - No aplica')

    setTimeout(seleccionUso_mant101, 300)
  } else {
    POPUP({
      array: arrayPopups_mant101.TIPO_FUENTE,
      titulo: 'Seleccione Fuente de alimentacion 2',
      indices: [
        { id: 'COD', label: 'DESCRIP' }
      ],
      callback_f: () => setTimeout(seleccionFuente1_mant101, 300),
      seleccion: parseInt(global_mant101.FUENTEALI_2)
    }, function (data) {
      global_mant101.FUENTEALI_2 = data.COD
      $('#fuenteAli2_mant101').val(data.COD + '.- ' + data.DESCRIP)

      setTimeout(seleccionFuente3_mant101, 300)
    })
  }
}

function seleccionFuente3_mant101() {
  if (global_mant101.CLASE_3 == '9') {

    global_mant101.FUENTEALI_3 = '8'
    $('#fuenteAli3_mant101').val('8. - No aplica')

    setTimeout(seleccionUso_mant101, 300)
  } else {
    POPUP({
      array: arrayPopups_mant101.TIPO_FUENTE,
      titulo: 'Seleccione Fuente de alimentacion 3',
      indices: [
        { id: 'COD', label: 'DESCRIP' }
      ],
      callback_f: () => setTimeout(seleccionFuente2_mant101, 300),
      seleccion: parseInt(global_mant101.FUENTEALI_3)
    }, function (data) {
      global_mant101.FUENTEALI_3 = data.COD
      $('#fuenteAli3_mant101').val(data.COD + '.- ' + data.DESCRIP)

      setTimeout(seleccionUso_mant101, 300)
    })
  }
}

function seleccionUso_mant101() {
  POPUP({
    array: arrayPopups_mant101.USO,
    titulo: 'Seleccione Uso',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: () => {
      if (global_mant101.FUENTEALI_1 == '8') {
        setTimeout(seleccionTec1_mant101, 300)
      } else {
        setTimeout(seleccionFuente1_mant101, 300)
      }
    },
    seleccion: parseInt(global_mant101.USO)
  }, function (data) {
    global_mant101.USO = data.COD
    $('#uso_mant101').val(data.COD + '.- ' + data.DESCRIP)

    if (global_mant101.USO == '1') {
      setTimeout(seleccionEspecifUso, 300)
    } else {
      validarVidaUtil_mant101()
    }
  })
}

function seleccionEspecifUso() {
  POPUP({
    array: arrayPopups_mant101.ESPECIF_USO,
    titulo: 'Especificaciones Uso',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: () => setTimeout(seleccionUso_mant101, 300),
    seleccion: parseInt(global_mant101.USO_ESPECIF)
  }, function (data) {
    global_mant101.USO_ESPECIF = cerosIzq(data.COD, 2)

    validarVidaUtil_mant101()
  })
}

function validarVidaUtil_mant101() {
  validarInputs(
    {
      form: "#validarVidaUtil_mant101",
      orden: '1'
    },
    () => {
      $('#vidaUtil_mant101').empty();
      $('#vidaUtil_mant101').val(global_mant101.VIDA_UTIL + ' Años');
      setTimeout(seleccionUso_mant101, 400);
    },
    () => {
      global_mant101.VIDA_UTIL = $('#vidaUtil_mant101').val().substring(0, 3);

      global_mant101.VIDA_UTIL
        ? global_mant101.VIDA_UTIL
        : cerosIzq($('#vidaUtil_mant101').val(), 3);

      if (isNaN(global_mant101.VIDA_UTIL)) {
        CON851('03', '03', null, 'error', 'error');
        validarVidaUtil_mant101();
      } else {
        $('#vidaUtil_mant101').val(global_mant101.VIDA_UTIL + ' Años');
        setTimeout(seleccionEstadoEquipo_mant101, 400);
      }
    })
}

function seleccionEstadoEquipo_mant101() {
  POPUP({
    array: arrayPopups_mant101.ESTADO,
    titulo: 'Seleccione Estado del quipo',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: () => {
      $('#vidaUtil_mant101').val(global_mant101.VIDA_UTIL.trim())
      validarVidaUtil_mant101()
    },
    seleccion: parseInt(global_mant101.ESTADO)
  }, function (data) {
    global_mant101.ESTADO = data.COD
    $('#estado_mant101').val(data.COD + '.- ' + data.DESCRIP)

    setTimeout(seleccionUltUbica_mant101, 300)
  })
}

function seleccionUltUbica_mant101() {
  POPUP({
    array: arrayPopups_mant101.ULTIMA_UBICACION,
    titulo: 'Seleccione Ultima ubicacion',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: validarVidaUtil_mant101,
    seleccion: parseInt(global_mant101.ULT_UBIC)
  }, function (data) {
    global_mant101.ULT_UBIC = data.COD
    $('#ultUbica_mant101').val(data.COD + '.- ' + data.DESCRIP)

    setTimeout(seleccionResposanble_mant101, 400)
  })
}

function seleccionResposanble_mant101() {
  POPUP({
    array: arrayPopups_mant101.RESPONSABLE,
    titulo: 'Seleccione responsable',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: () => setTimeout(seleccionEstadoEquipo_mant101, 400),
    seleccion: parseInt(global_mant101.RESPONSABLE)
  }, function (data) {
    global_mant101.RESPONSABLE = data.COD
    $('#responsable_mant101').val(data.COD + '.- ' + data.DESCRIP)

    setTimeout(seleccionPeriocidad_mant101, 400)
  })
}

function seleccionPeriocidad_mant101() {
  POPUP({
    array: arrayPopups_mant101.PERIOCIDAD,
    titulo: 'Seleccione periocidad',
    indices: [
      { id: 'COD', label: 'DESCRIP' }
    ],
    callback_f: () => setTimeout(seleccionEstadoEquipo_mant101, 400),
    seleccion: parseInt(global_mant101.PERIODO_MANT)
  }, function (data) {
    global_mant101.PERIODO_MANT = data.COD
    $('#periocidad_mant101').val(data.COD + '.- ' + data.DESCRIP)

    if (global_mant101.PERIODO_MANT == '5' || global_mant101.PERIODO_MANT == '6') {
      validarHR_KM_mant101()
    } else {
      validarProtocolo_mant101()
    }
  })
}

function validarHR_KM_mant101() {
  var periocidad_hrkm = bootbox.prompt({
    size: "small",
    title: "Periocidad HR | KM",
    maxlength: 5,
    onEscape: () => {
      global_mant101.HRKM_MANT = global_mant101.HRKM_MANT;
      setTimeout(seleccionResposanble_mant101, 300)
    },
    callback: function (result) {
      if (result == null || isNumeric(result) == false) {
        setTimeout(seleccionResposanble_mant101, 300)
      } else {
        global_mant101.HRKM_MANT = parseInt(global_mant101.HRKM_MANT) != 0 ? cerosIzq(global_mant101.HRKM_MANT, 5) : cerosIzq(result);
        validarProtocolo_mant101();
      }
    }
  })
  periocidad_hrkm.init(() => { $('.bootbox-input').val(global_mant101.HRKM_MANT); $('.modal-footer').hide() });
  periocidad_hrkm.on('shown.bs.modal', function () {
    $('.bootbox-input').val(global_mant101.HRKM_MANT)
  });
}

function validarProtocolo_mant101() {
  validarInputs(
    {
      form: "#validarProtocolo_mant101",
      orden: '1'
    },
    () => {
      setTimeout(() => seleccionPeriocidad_mant101(), 400);
      $('#protocolo_mant101').val(global_mant101.PROTOCOLO_MANT);
    },
    () => {
      global_mant101.PROTOCOLO_MANT = cerosIzq($('#protocolo_mant101').val().trim(), 4)
      $('#protocolo_mant101').val(global_mant101.PROTOCOLO_MANT)

      var busquedaProtocolo = arrayProtocolos_mant101.filter(data => data.TIPO == global_mant101.USO.trim()).find(data => data.COMPLETA == global_mant101.PROTOCOLO_MANT)
      if (busquedaProtocolo) {
        if (global_mant101.PROTOCOLO_MANT.trim() == '0000') {
          $('#descripProtocolo_mant101').val('************');
        } else {
          $('#descripProtocolo_mant101').val(busquedaProtocolo.DESCRIP.trim());
        }
        evaluarProv_mant101();
      } else {
        CON851('01', 'NO EXISTE PROTOCOLO!', null, 'error', 'Error');
        validarProtocolo_mant101();
      }
    })
}

function evaluarProv_mant101() {
  switch (global_mant101.RESPONSABLE) {
    case '1':
      global_mant101.PROVEEDOR_MANT = $_USUA_GLOBAL[0].NIT;
      busquedaProveedor = arrayTerceros_mant101.find(data => data.COD.trim() == $_USUA_GLOBAL[0].NIT.toString().trim());
      if (busquedaProveedor) {
        $('#proveedorMant_mant101').val(busquedaProveedor.COD);
        $('#descripProveedorMant_mant101').val(busquedaProveedor.NOMBRE);
        $('#ciudadProveedorMant_mant101').val(busquedaProveedor.CIUDAD);
        let componentes = global_mant101.TABLA_COMPONENTES.filter(data => data.SW.toLowerCase() == 'true');
        if (componentes.length < 0) { $("#item_mant101").val('1'); }
        else { $("#item_mant101").val(alternarItem_mant101()); }
        validarItem_mant101();

      } else validarProveedor_mant101();
      break;
    case '3':
      global_mant101.PROVEEDOR_MANT = global_mant101.NIT_PROVEEDOR
      busquedaProveedor = arrayTerceros_mant101.find(data => data.COD.trim() == global_mant101.PROVEEDOR_MANT.toString().trim());
      if (busquedaProveedor) {
        $('#proveedorMant_mant101').val(busquedaProveedor.COD);
        $('#descripProveedorMant_mant101').val(busquedaProveedor.NOMBRE);
        $('#ciudadProveedorMant_mant101').val(busquedaProveedor.CIUDAD);
        let componentes = global_mant101.TABLA_COMPONENTES.filter(data => data.SW.toLowerCase() == 'true');
        if (componentes.length < 0) { $("#item_mant101").val('1'); }
        else { $("#item_mant101").val(alternarItem_mant101()); }
        validarItem_mant101();
      } else validarProveedor_mant101();
    default: validarProveedor_mant101(); break;
  }
}
function validarProveedor_mant101() {
  validarInputs(
    {
      form: "#validarProveedorMant_mant101",
      orden: '1'
    },
    () => {
      validarProtocolo_mant101();
      global_mant101.PROVEEDOR_MANT = global_mant101.PROVEEDOR_MANT;
      $('#proveedorMant_mant101').val(global_mant101.PROVEEDOR_MANT);
    },
    () => {
      global_mant101.PROVEEDOR_MANT = $('#proveedorMant_mant101').val().trim();

      const busquedaProveedor = arrayTerceros_mant101.find(data => data.COD.trim() == $_USUA_GLOBAL[0].NIT.toString().trim());
      if (busquedaProveedor) {
        $('#proveedorMant_mant101').val(busquedaProveedor.COD);
        $('#descripProveedorMant_mant101').val(busquedaProveedor.NOMBRE);
        $('#ciudadProveedorMant_mant101').val(busquedaProveedor.CIUDAD);
      }
      else {
        CON851('01', 'NO EXISTE PROVEEDOR MANT!', null, 'error', 'Error');
      }
      let componentes = global_mant101.TABLA_COMPONENTES.filter(data => data.SW.toLowerCase() == 'true');
      if (componentes.length < 0) { $("#item_mant101").val('1'); }
      else { $("#item_mant101").val(alternarItem_mant101()); }
      validarItem_mant101();
    })
}

//-------------Validaciones Componentes y Accesorios-------------//
//{ITEM:'',DESCRIP:'',MARCA:'',MODELO:'',SERIE:''}

function limpiarInput_mant101() {
  $('#descripcionComp_mant101').val('')
  $('#resul_mant101').val('')
  $('#modeloComp_mant101').val('')
  $('#serieComp_mant101').val('')
  $('#item_mant101').val('')
}


function alternarItem_mant101() {
  //Busca ultimo indice vacío <tabla> especialidad//
  let arrayVacio = global_mant101.TABLA_COMPONENTES.find(data => data.SW == 'false');
  return arrayVacio['ITEM'];
}


function mostrarFila_mant101() {
  let itemAct_mant101 = parseInt($("#item_mant101").val());
  if (global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].SW == 'true') {
    $('#descripcionComp_mant101').val(global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].DESCRIPCION);
    $('#resul_mant101').val(global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].MARCA);
    $('#modeloComp_mant101').val(global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].MODELO);
    $('#serieComp_mant101').val(global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].SERIE);
  }
}

function insertarFilaTab_mant101() {
  $("#tabla_mant101 tbody").empty()
  global_mant101.TABLA_COMPONENTES.sort(function (a, b) {
    if (parseInt(a.ITEM) > parseInt(b.ITEM)) {
      return 1;
    }
    if (parseInt(a.ITEM) < parseInt(b.ITEM)) {
      return -1;
    }
    return 0;
  });
  for (var i in global_mant101.TABLA_COMPONENTES) {
    global_mant101.TABLA_COMPONENTES[i].ITEM = parseInt(i) + 1;
    if (global_mant101.TABLA_COMPONENTES[i].SW.toLowerCase() == 'true') {
      $('#tabla_mant101 tbody').append(
        `<tr><td style="text-align:center;"class="col-md-1">${global_mant101.TABLA_COMPONENTES[i].ITEM ? global_mant101.TABLA_COMPONENTES[i].ITEM : parseInt(i) + 1}</td>`
        + `<td style="text-align:left;"class="col-md-4">${global_mant101.TABLA_COMPONENTES[i].DESCRIPCION ? global_mant101.TABLA_COMPONENTES[i].DESCRIPCION : ' '}</td>`
        + `<td style="text-align:left;"class="col-md-3">${global_mant101.TABLA_COMPONENTES[i].MARCA ? global_mant101.TABLA_COMPONENTES[i].MARCA : ' '}</td>`
        + `<td style="text-align:left;"class="col-md-2">${global_mant101.TABLA_COMPONENTES[i].MODELO ? global_mant101.TABLA_COMPONENTES[i].MODELO : ' '}</td>`
        + `<td style="text-align:left"class="col-md-2">${global_mant101.TABLA_COMPONENTES[i].SERIE ? global_mant101.TABLA_COMPONENTES[i].SERIE : ' '}</td></tr>`)
    }
    loader('hide');
  }
}

function _validacionTabla_mant101(orden) {
  validarTabla(
    {
      tabla: '#tabla_mant101',
      orden: orden,
      event_f3: () => { setTimeout(validarObservacion_mant101, 400) }
    },
    (data) => {
      $('#item_mant101').val(parseInt(data.cells[0].textContent));

      mostrarFila_mant101();
      validarDescripTab_mant101();
    },
    () => validarItem_mant101(),
    () => { console.debug('esto hace') }
  )
}

function validarItem_mant101() {
  validarInputs(
    {
      form: "#validarItem_mant101",
      orden: '1',
      event_f3: () => {
        let componentes = global_mant101.TABLA_COMPONENTES.filter(data => data.SW == 'true');
        if (componentes.length > 0) {
          insertarFilaTab_mant101();
          limpiarInput_mant101();
          _validacionTabla_mant101('0');
        } else {
          setTimeout(validarObservacion_mant101, 400)
        }
      }
    },
    () => { validarProveedor_mant101(); },
    () => {
      const itemAct_mant101 = parseInt($("#item_mant101").val());
      global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].ITEM = $('#item_mant101').val();
      if (typeof itemAct_mant101 == 'undefined' || itemAct_mant101 > 20) CON851('01', '01', validarItem_mant101, 'error', 'error');
      else {
        mostrarFila_mant101();
        validarDescripTab_mant101();
      }
    })
}

function validarDescripTab_mant101() {
  validarInputs(
    {
      form: "#validarDescripComp_mant101",
      orden: '1'
    },
    () => {
      if (isNaN($('#item_mant101').val())) {
        $("#item_mant101").val(alternarItem_mant101());
        validarItem_mant101();
      } else validarItem_mant101();
    },
    () => {
      let itemAct_mant101 = parseInt($("#item_mant101").val());
      global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].DESCRIPCION = $('#descripcionComp_mant101').val().toUpperCase().trim();;
      if (global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].DESCRIPCION.trim() == '') {
        //eliminar registro
        global_mant101.TABLA_COMPONENTES.splice(itemAct_mant101 - 1, 1);
        insertarFilaTab_mant101();
        $("#item_mant101").val(alternarItem_mant101());
        validarItem_mant101();
        limpiarInput_mant101();

      } else validarMarcaTab_mant101();
    })
}

function validarMarcaTab_mant101() {
  validarInputs(
    {
      form: "#validarMarcaComp_mant101",
      orden: '1'
    },
    () => { validarDescripTab_mant101(); },
    () => {
      let itemAct_mant101 = parseInt($("#item_mant101").val());
      global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].MARCA = $('#resul_mant101').val().toUpperCase();
      validarModeloTab_mant101();
    })
}

function validarModeloTab_mant101() {
  validarInputs(
    {
      form: "#validarModeloComp_mant101",
      orden: '1'
    },
    () => { validarMarcaTab_mant101(); },
    () => {
      let itemAct_mant101 = parseInt($("#item_mant101").val());
      global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].MODELO = $('#modeloComp_mant101').val().toUpperCase();
      validarSerieTab_mant101();
    })
}

function validarSerieTab_mant101() {
  validarInputs(
    {
      form: "#validarSerieComp_mant101",
      orden: '1'
    },
    () => { validarModeloTab_mant101(); },
    () => {
      let itemAct_mant101 = parseInt($("#item_mant101").val());
      global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].SERIE = $('#serieComp_mant101').val().toUpperCase();
      global_mant101.TABLA_COMPONENTES[itemAct_mant101 - 1].SW = 'true';
      limpiarInput_mant101();
      insertarFilaTab_mant101();
      $("#item_mant101").val(alternarItem_mant101());
      validarItem_mant101();
    })
}

function validarObservacion_mant101() {
  var fuente = '<div class="row" style="display:float!important">' +
    '<div class="col-md-12 col-sm-12 col-xs-12">' +
    '<div class="col-md-12 col-sm-12 col-xs-12 head-box"style="display: flex; justify-content:space-between">' +
    '<label>Maximo (450 caracteres):</label></div>' +
    '<div class="col-md-12" id="validarObservacion_mant101"> ' +
    '<textarea id="observacion_mant101" class="form-control col-md-12 col-sm-12" data-orden="1" rows="5" style="resize: none; text-align: justify"></textarea>' +
    '</div>' +
    '</div>' +
    '</div>';

  var ventanaObservacion_mant101 = bootbox.dialog({
    size: 'large',
    title: 'OBSERVACIONES',
    closeButton: false,
    message: fuente,
    buttons: {
      aceptar: {
        label: 'Aceptar',
        callback: function () {
          ventanaObservacion_mant101.off('shown.bs.modal');
          global_mant101.OBSERVACIONES = $('#observacion_mant101').val();
          global_mant101.OBSERVACIONES.replace(/\�/g, "Ñ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\&/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\"/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\{/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\}/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\[/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\]/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\*/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/(\r\n|\n|\r)/gm, "&");
          $('#mostrarObservaciones_mant101').show();
          $("#observacionDisplay_mant101").val(global_mant101.OBSERVACIONES);
          _grabarDatos_mant101();
        },
        className: 'btn-primary'
      },
      cancelar: {
        label: 'Cancelar',
        callback: function () {
          ventanaObservacion_mant101.off('shown.bs.modal');
          global_mant101.OBSERVACIONES = $('#observacion_mant101').val();
          global_mant101.OBSERVACIONES.replace(/\�/g, "Ñ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\&/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\"/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\{/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\}/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\[/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\]/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\*/g, " ").trim();
          global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/(\r\n|\n|\r)/gm, "&");
          validarItem_mant101();
        },
        className: 'btn-danger'
      }
    }
  });
  ventanaObservacion_mant101.init($('.modal-footer').hide());
  ventanaObservacion_mant101.on('shown.bs.modal', function () {
    global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES ? global_mant101.OBSERVACIONES : ' ';
    global_mant101.OBSERVACIONES.replace(/\�/g, "Ñ").trim();
    global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/&/g, "\n");
    $('#observacion_mant101').val(global_mant101.OBSERVACIONES)
    evaluarObservacion_mant101();
  });
}

function evaluarObservacion_mant101() {
  validarInputs({
    form: '#validarObservacion_mant101',
    orden: '1',
  },
    function () {
      global_mant101.OBSERVACIONES = $('#observacion_mant101').val();
      global_mant101.OBSERVACIONES = $('#observacion_mant101').val();
      global_mant101.OBSERVACIONES.replace(/\�/g, "Ñ").trim();
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\&/g, " ").trim();
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\"/g, " ").trim();
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\{/g, " ").trim();
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\}/g, " ").trim();
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\[/g, " ").trim();
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\]/g, " ").trim();
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\*/g, " ").trim();
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/(\r\n|\n|\r)/gm, "&");
      $('.btn-danger').click()
    },
    () => {
      global_mant101.OBSERVACIONES = $('#observacion_mant101').val();

      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\&/g, " ").trim()
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\"/g, " ").trim()
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\{/g, " ").trim()
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\}/g, " ").trim()
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\[/g, " ").trim()
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\]/g, " ").trim()
      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/\*/g, " ").trim()

      global_mant101.OBSERVACIONES = global_mant101.OBSERVACIONES.replace(/(\r\n|\n|\r)/gm, "&");
      $('.btn-primary').click();
    }
  );
}

function _grabarDatos_mant101() {
  CON851P('01', validarItem_mant101, function () {
    var datos_envio = datosEnvio()
    datos_envio += $_novedad_mant101
    datos_envio += '|'
    datos_envio += llave_mant101.COMPLETA.trim().toUpperCase()
    datos_envio += '|'
    datos_envio += localStorage.Usuario
    datos_envio += '|'
    //FECHAS
    datos_envio += global_mant101.FECHA_COMPRA
    datos_envio += '|'
    datos_envio += global_mant101.FECHA_GARANTIA
    datos_envio += '|'
    datos_envio += global_mant101.FECHA_FABRIC
    datos_envio += '|'
    datos_envio += global_mant101.FECHA_ULT_MANT
    datos_envio += '|'
    datos_envio += global_mant101.FECHA_BAJA
    datos_envio += '|'
    datos_envio += moment().format('YYYYMMDD')
    datos_envio += '|'
    //DATOS PROVEEDOR
    datos_envio += global_mant101.NIT_PROVEEDOR
    datos_envio += '|'
    datos_envio += global_mant101.FORMA_ADQ
    datos_envio += '|'
    //DATOS EQUIPO
    datos_envio += global_mant101.SERIAL
    datos_envio += '|'
    datos_envio += global_mant101.TECNOVIG
    datos_envio += '|'
    datos_envio += global_mant101.MANUAL
    datos_envio += '|'
    datos_envio += global_mant101.IDIOMA
    datos_envio += '|'
    datos_envio += global_mant101.MODELO
    datos_envio += '|'
    datos_envio += global_mant101.VOLTAJE
    datos_envio += '|'
    datos_envio += global_mant101.AMPE
    datos_envio += '|'
    datos_envio += global_mant101.POTENCIA
    datos_envio += '|'
    datos_envio += cerosIzq(global_mant101.FRECUENCIA, 3)
    datos_envio += '|'
    datos_envio += cerosIzq(global_mant101.CLASE_1, 2)
    datos_envio += '|'
    datos_envio += cerosIzq(global_mant101.CLASE_2, 2)
    datos_envio += '|'
    datos_envio += cerosIzq(global_mant101.CLASE_3, 2)
    datos_envio += '|'
    datos_envio += cerosIzq(global_mant101.FUENTEALI_1, 2)
    datos_envio += '|'
    datos_envio += cerosIzq(global_mant101.FUENTEALI_2, 2)
    datos_envio += '|'
    datos_envio += cerosIzq(global_mant101.FUENTEALI_3, 2)
    datos_envio += '|'
    datos_envio += global_mant101.USO
    datos_envio += '|'
    datos_envio += global_mant101.VIDA_UTIL
    datos_envio += '|'
    datos_envio += global_mant101.ESTADO
    datos_envio += '|'
    datos_envio += global_mant101.USO_ESPECIF
    datos_envio += '|'
    datos_envio += global_mant101.ULT_UBIC
    datos_envio += '|'
    datos_envio += global_mant101.RESPONSABLE
    datos_envio += '|'
    datos_envio += global_mant101.PROVEEDOR_MANT
    datos_envio += '|'
    datos_envio += global_mant101.PERIODO_MANT
    datos_envio += '|'
    datos_envio += global_mant101.HRKM_MANT
    datos_envio += '|'
    datos_envio += global_mant101.PROTOCOLO_MANT
    datos_envio += '|'

    var data = {};
    data.datosh = datos_envio;
    let maximo = 85, posicion = 0, contadorLin = 0, contadorTotal = 0, linea = '';

    global_mant101.OBSERVACIONES.split('').forEach(function (item, i) {
      contadorTotal = i + 1
      contadorLin = contadorLin + 1

      switch (item) {
        case 'á':
        case 'é':
        case 'í':
        case 'ó':
        case 'ú':
        case 'Á':
        case 'É':
        case 'Í':
        case 'Ó':
        case 'Ú':
        case 'ñ':
        case 'Ñ':
        case '!':
        case '"':
        case '#':
        case '$':
        case '%':
        case '/':
        case '(':
        case ')':
        case '=':
        case '?':
        case '*':
        case '+':
        case ' - ':
        case '@':
        case '>':
        case '<':
          maximo = maximo + 1
          break;
      }
      linea += item

      if (contadorLin == maximo || global_mant101.OBSERVACIONES.length == contadorTotal) {
        posicion = posicion + 1

        data["OBSERV-" + posicion.toString().padStart(3, "0")] = linea
        contadorLin = 0
        linea = ''
        maximo = 85
      }
    })


    global_mant101.TABLA_COMPONENTES.forEach(function (item, i) {
      var posicion = i + 1;
      var datos_tabla;
      if (item.SW == 'true') {
        datos_tabla = item.DESCRIPCION.trim();
        datos_tabla += '|'
        datos_tabla += item.MARCA.trim()
        datos_tabla += '|'
        datos_tabla += item.MODELO.trim()
        datos_tabla += '|'
        datos_tabla += item.SERIE.trim()
        datos_tabla += '|';
        data["TAB-" + posicion.toString().padStart(3, 0)] = datos_tabla;
      }
    });
    console.debug(data, 'datos to DLL')
    var URL = get_url("APP/MANT/MANT101-02.DLL");

    postData(data, URL)
      .then((data) => {
        console.log(data)
        CON851('', `Registro ${$_novedad_mant101 == '8' ? 'modificado' : 'grabado'}`, null, 'success', 'Exito');
        salir_mant101();
      }).catch(error => { console.error(error); salirSegundaVentana() })
  })
}

function salirSegundaVentana() {
  let Window = BrowserWindow.getAllWindows();
  if (Window.length > 1) {
    _cerrarSegundaVentana();
  } else {
    _toggleNav()
  };
}