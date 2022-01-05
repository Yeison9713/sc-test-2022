var $_FORMATO_110, $_LISTADO_110, $_LST_ART_110;

(() => {
  loader('hide');
  _inputControl('reset');
  _inputControl('disabled');

  _getSucursales_110();
})();

function _getSucursales_110() {
  postData({ datosh: datosEnvio() }, get_url("app/contab/CON823.DLL"))
    .then(res => {
      let array = [];

      res.SUCURSAL.forEach(element => {
        array.push({ cod: element.CODIGO, descripcion: element.DESCRIPCION })
      });

      _vetanaSucursales_110(array);
    })
    .catch(err => {
      console.log(err);
      _toggleNav()
    })
}

function _vetanaSucursales_110(data) {
  _ventanaDatos({
    titulo: 'Busqueda sucursales',
    columnas: ["cod", "descripcion"],
    data,
    callback_esc: _toggleNav,
    callback: (data) => {
      document.getElementById("sucursal").value = data.cod;
      document.getElementById("descripcion").value = data.descripcion;
      _ventanaFormatoBom110();
    }
  });
}

function _ventanaFormatoBom110() {
  let selecion = $_FORMATO_110 == "CSV" ? 2 : 1;

  let array = [
    { value: 1, text: "En formato .PDF" },
    { value: 2, text: "En formato .CSV" }
  ]

  POPUP(
    {
      array,
      titulo: "Formato de impresion",
      indices: [{ id: "value", label: "text" }],
      seleccion: selecion,
      callback_f: _getSucursales_110,
    },
    validarFormato_110
  );
}

function validarFormato_110(seleccionado) {
  if (seleccionado.value == "1") $_FORMATO_110 = 'PDF';
  else if (seleccionado.value == "2") $_FORMATO_110 = 'CSV';

  let anio = $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
  $('#añoInicial').val(anio.toString())

  validarFechas_110('1')
}

function validarFechas_110(orden) {
  validarInputs(
    {
      form: '#validarFechas',
      orden: orden
    },
    _ventanaFormatoBom110,
    _validarFecha_envio
  );
}

function _validarFecha_envio() {
  var añoInicial = cerosIzq($('#añoInicial').val(), 2);
  var mesInicial = cerosIzq($('#mesInicial').val(), 2);
  var diaInicial = cerosIzq($('#diaInicial').val(), 2);

  let anio = parseFloat(añoInicial) > 90 ? `19${añoInicial}` : `20${añoInicial}`;
  var fechaEnvio = anio + mesInicial + diaInicial;

  var datos_envio = datosEnvio() + fechaEnvio + '|';
  postData({ datosh: datos_envio }, get_url("app/bombas/BOM110.DLL"))
    .then(data => {
      $('#añoFinal').val(añoInicial);
      validarFase1_110('1');
    })
    .catch(err => {
      console.log(err)
      validarFechas_110('1')
    })
}

function validarFase1_110(orden) {
  validarInputs(
    {
      form: "#fase1",
      orden: orden,
    },
    () => {
      validarFechas_110("2");
    },
    () => {
      var añoInicial = cerosIzq($("#añoInicial").val(), 2);
      var mesInicial = cerosIzq($("#mesInicial").val(), 2);
      var diaInicial = cerosIzq($("#diaInicial").val(), 2);
      var fechaInicial = añoInicial + mesInicial + diaInicial;

      var añoFinal = cerosIzq($("#añoFinal").val(), 2);
      var mesFinal = cerosIzq($("#mesFinal").val(), 2);
      var diaFinal = cerosIzq($("#diaFinal").val(), 2);
      var fechaFinal = añoFinal + mesFinal + diaFinal;

      if (parseFloat(fechaFinal) < parseFloat(fechaInicial)) {
        plantillaToast("03", "03", null, "warning");
        validarFase1_110();
      } else {
        validarFase2_110();
      }
    }
  );
}

function validarFase2_110() {
  validarInputs(
    { form: "#fase2", orden: "1" },
    () => {
      validarFase1_110("1");
    },
    _enviarDatos_110
  );
}

function _enviarDatos_110() {
  var añoInicial = cerosIzq($('#añoInicial').val(), 2);
  var mesInicial = cerosIzq($('#mesInicial').val(), 2)
  var diaInicial = cerosIzq($('#diaInicial').val(), 2)
  let anio_ini = parseFloat(añoInicial) > 90 ? `19${añoInicial}` : `20${añoInicial}`;
  var fechaInicial = anio_ini + mesInicial + diaInicial;

  var añoFinal = cerosIzq($('#añoFinal').val(), 2);
  var mesFinal = cerosIzq($('#mesFinal').val(), 2)
  var diaFinal = cerosIzq($('#diaFinal').val(), 2)
  let anio_fin = parseFloat(añoFinal) > 90 ? `19${añoFinal}` : `20${añoFinal}`
  var fechaFinal = anio_fin + mesFinal + diaFinal;

  var turno = espaciosIzq($('#turno').val(), 1);
  var sucursal = $('#sucursal').val()

  var datos_envio = datosEnvio();
  datos_envio += fechaInicial;
  datos_envio += '|';
  datos_envio += fechaFinal;
  datos_envio += '|';
  datos_envio += turno;
  datos_envio += '|';
  datos_envio += sucursal;
  datos_envio += '|';

  loader('show');
  postData({ datosh: datos_envio }, get_url("app/bombas/BOM110_1.DLL"))
    .then(_getMedTanques)
    .catch(err => {
      loader('hide');
      validarFechas_110('3');
    })
}

function _getMedTanques(datos) {
  postData({ datosh: datosEnvio() }, get_url("app/bombas/BOMB03.DLL"))
    .then(data => {
      datos.TANQUES = data.LISTADO;
      on_enviarDatos_110(datos);
    }).catch(err => {
      loader("hide");
      validarFechas_110("3");
    })
}

function on_enviarDatos_110(data) {
  var añoInicial = cerosIzq($('#añoInicial').val(), 2);
  var mesInicial = cerosIzq($('#mesInicial').val(), 2)
  var diaInicial = cerosIzq($('#diaInicial').val(), 2)
  let anio_ini = parseFloat(añoInicial) > 90 ? `19${añoInicial}` : `20${añoInicial}`;
  var fechaInicial = anio_ini + mesInicial + diaInicial;

  var añoFinal = cerosIzq($('#añoFinal').val(), 2);
  var mesFinal = cerosIzq($('#mesFinal').val(), 2)
  var diaFinal = cerosIzq($('#diaFinal').val(), 2)
  let anio_fin = parseFloat(añoFinal) > 90 ? `19${añoFinal}` : `20${añoFinal}`;
  var fechaFinal = anio_fin + mesFinal + diaFinal;

  let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
  let turno = 'Turno: ' + $('#turno').val();
  let fecha = 'Fecha: ' + fechaInicial;

  data.TOTALES.push(nombreEmpresa)
  data.TOTALES.push(turno)
  data.TOTALES.push(fecha)
  data.TOTALES.push(fechaFinal)
  data.TOTALES.push($_USUA_GLOBAL[0].NIT.toString().padStart(10, "0"))

  var opcionesImpresiones = {
    datos: data,
    tipo: '',
    formato: 'bombas/bom110.formato.html',
    nombre: 'LISTADO-GALONAJE-' + localStorage.Sesion
  };

  if ($_FORMATO_110 == 'PDF') {
    format_pdf_110(opcionesImpresiones)
    // opcionesImpresiones.tipo = 'pdf';
    // imprimir(opcionesImpresiones, finImpresion_110)
  } else if ($_FORMATO_110 == 'CSV') {
    opcionesImpresiones.tipo = 'csv';
    imprimir(opcionesImpresiones, finImpresion_110)
  }
}

function format_pdf_110(data) {
  var datosTabla = data.datos
  var totales = datosTabla.TOTALES
  var tablaListado = [
    [
      {
        text: 'FECHA',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'SURT.',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'COMP.',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'ARTICULO',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'LECTURA ANT.',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'LECTURA ACT.',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'CANT. VENTA.',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'VALOR VENTA',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'SOBRETASA',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'IMPTO. GLOBAL',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'TOTAL',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'OPER',
        alignment: 'center',
        style: 'headerTabla'
      },
      {
        text: 'FECHA REST.',
        alignment: 'center',
        style: 'headerTabla'
      },
    ]
  ];

  datosTabla.LISTADO.pop()
  datosTabla.LISTADO.forEach(item => {
    tablaListado.push([
      { text: item.FECHA, style: 'contentTabla' },
      { text: item.SURTI, style: 'contentTabla' },
      { text: item.NRO, style: 'contentTabla' },
      { text: item.ARTIC, alignment: 'left', style: 'contentTabla' },
      { text: item['NUM-ANT'], alignment: 'right', style: 'contentTabla' },
      { text: item['NUM-ACT'], alignment: 'right', style: 'contentTabla' },
      { text: item.CANTID, alignment: 'right', style: 'contentTabla' },
      { text: item.VALOR, alignment: 'right', style: 'contentTabla' },
      { text: item.SOBRET, alignment: 'right', style: 'contentTabla' },
      { text: item.GLOBAL, alignment: 'right', style: 'contentTabla' },
      { text: item.TOTAL, alignment: 'right', style: 'contentTabla' },
      { text: item.OPER, style: 'contentTabla' },
      { text: item["FECHA-REST"], style: 'contentTabla' }
    ]);
  })

  tablaListado.push([
    { text: 'SUB-TOTAL', style: 'contentTabla', alignment: 'right', bold: true, colSpan: 5 },
    {}, {}, {}, {},
    { text: '', style: 'contentTabla' },
    { text: totales[0].trim(), style: 'contentTabla', alignment: 'right' },
    { text: totales[1].trim(), style: 'contentTabla', alignment: 'right' },
    { text: totales[2].trim(), style: 'contentTabla', alignment: 'right' },
    { text: totales[3].trim(), style: 'contentTabla', alignment: 'right' },
    { text: totales[4].trim(), style: 'contentTabla', alignment: 'right' },
    { text: '', style: 'contentTabla', },
    { text: '', style: 'contentTabla', },
  ]);


  for (var i = 5; i < 9; i++) {
    let text = ''

    if (i == 5) text = 'TOTAL VALES'
    else if (i == 6) text = 'TOTAL FINANCIACION'
    else if (i == 7) text = 'RECIBIDO EN CHEQUES'
    else if (i == 8) text = 'NETO RECAUDADO'

    tablaListado.push([
      { text, style: 'contentTabla', alignment: 'right', bold: true, colSpan: 5 },
      {}, {}, {}, {}, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' },
      { text: totales[i].trim(), style: 'contentTabla', alignment: 'right' },
      { text: '' }, { text: '' },
    ]);
  }

  var tablaArticulos = [
    [
      {
        text: 'ARTICULO',
        alignment: 'center',
        style: 'headerTablaArticulos'
      },
      {
        text: 'DESCRIPCIÓN',
        alignment: 'left',
        style: 'headerTablaArticulos'
      },
      {
        text: 'CANTIDAD',
        alignment: 'center',
        style: 'headerTablaArticulos'
      },
      {
        text: 'TOTAL',
        alignment: 'center',
        style: 'headerTablaArticulos'
      },
      {
        text: 'SALDO',
        alignment: 'center',
        style: 'headerTablaArticulos'
      },
    ]
  ]

  datosTabla['LINEA-ART'].pop()
  datosTabla['LINEA-ART'].forEach(item => {
    tablaArticulos.push([
      { text: item.ART, style: 'contentTablaArticulos', alignment: 'left' },
      { text: item.DESCRIP, style: 'contentTablaArticulos', alignment: 'left' },
      { text: item.CANT, style: 'contentTablaArticulos', alignment: 'right' },
      { text: item.VLR, style: 'contentTablaArticulos', alignment: 'right' },
      { text: item.TOTAL, style: 'contentTablaArticulos', alignment: 'right' },
    ]);
  })

  tablaArticulos.push([
    { text: '', style: 'contentTablaArticulos' },
    { text: 'TOTALES', style: 'contentTablaArticulos', alignment: 'left', bold: true },
    { text: totales[9].trim(), style: 'contentTablaArticulos', alignment: 'right' },
    { text: totales[10].trim(), style: 'contentTablaArticulos', alignment: 'right' },
    { text: totales[11].trim(), style: 'contentTablaArticulos', alignment: 'right' },
  ]);

  var tablaTanques = [
    [
      {
        text: 'CODIGO',
        alignment: 'center',
        style: 'headerTablaArticulos'
      },
      {
        text: 'ARTICULO',
        alignment: 'center',
        style: 'headerTablaArticulos'
      },
      {
        text: 'DESCRIPCIÓN',
        alignment: 'left',
        style: 'headerTablaArticulos'
      },
      {
        text: 'MEDIDA',
        alignment: 'center',
        style: 'headerTablaArticulos'
      },
      {
        text: 'GALONAJE',
        alignment: 'center',
        style: 'headerTablaArticulos'
      },
      {
        text: 'FECHA',
        alignment: 'center',
        style: 'headerTablaArticulos'
      },
      {
        text: 'HORA',
        alignment: 'center',
        style: 'headerTablaArticulos'
      },
    ]
  ]

  datosTabla.TANQUES.forEach(item => {
    tablaTanques.push([
      { text: item.COD, style: 'contentTablaArticulos', alignment: 'center' },
      { text: item.ART, style: 'contentTablaArticulos', alignment: 'left' },
      { text: item.DESCRIP_ART, style: 'contentTablaArticulos', alignment: 'left' },
      { text: item.MED, style: 'contentTablaArticulos', alignment: 'right' },
      { text: item.GAL, style: 'contentTablaArticulos', alignment: 'right' },
      { text: item.FECHA, style: 'contentTablaArticulos', alignment: 'right' },
      { text: item.HRA, style: 'contentTablaArticulos', alignment: 'right' },
    ]);
  })

  var nit_logo = totales[16].slice(2)
  var content = {
    pageMargins: [20, 100, 20, 60],
    header: function (currentPage, pageCount, pageSize) {
      return [
        {
          margin: [20, 20],
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: pageSize.width - 40,
              h: 80,
              r: 0,
              lineWidth: 1,
              lineColor: '#000',
            }
          ],
        },
        {
          margin: [20, -80],
          columns: [
            {
              width: '20%',
              margin: [5, -5, 0, 0],
              stack: [
                {
                  image: 'logo',
                  fit: [100, 50]
                },
              ]
            },
            {
              width: '60%',
              text: [
                {
                  text: `${totales[12].trim()}\n`,
                  fontSize: 16,
                  bold: true
                },
                {
                  text: 'RESUMEN VENTA COMBUSTIBLES\n',
                  style: 'subTitulo'
                },
                {
                  text: `${totales[13].trim()} - ${totales[14].trim()}`,
                  style: 'subTitulo'
                }
              ]
            },
            {
              width: '20%',
              text: '\nOpc. 9.7.A'
            }
          ]
        }
      ]
    },
    styles: {
      subTitulo: {
        fontSize: 10,
        bold: true
      },
      headerTabla: {
        fontSize: 7,
        bold: true
      },
      contentTabla: {
        fontSize: 7,
        alignment: 'right'
      },
      contentTablaArticulos: {
        fontSize: 9,
        alignment: 'right'
      },
      headerTablaArticulos: {
        fontSize: 9,
        bold: true
      },
    },
    images: {
      logo: `P:\\PROG\\LOGOS\\${nit_logo}.png`
    },
    content: [
      { // Listado de ventas
        layout: {
          hLineWidth: function (i, node) {
            if (i === 0) return 0;
            return (i === node.table.headerRows || i === node.table.body.length - 5) ? 1 : 0;
          },
          vLineWidth: function (i) {
            return 0;
          },
          paddingTop: function (i, node) {
            if (i === 0) return 12;
            return 5;
          },
          paddingBottom: function (i, node) {
            if (i === 0) return 0;
            return 0;
          },
          paddingLeft: function (i) {
            return i === 0 ? 0 : 2;
          },
          paddingRight: function (i) {
            return i === 0 ? 0 : 2;
          },
        },
        table: {
          widths: [
            'auto',
            'auto',
            'auto',
            '*',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
          ],
          heights: [20],
          headerRows: 1,
          body: tablaListado
        }
      },
      { // Listado de articulos
        margin: [0, 40, 0, 0],
        layout: {
          hLineWidth: function (i, node) {
            return (i === 0 || i === 1 || i === node.table.body.length) ? 1 : 0;
          },
          vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 1 : 0;
          },
        },
        table: {
          headerRows: 1,
          body: tablaArticulos
        }
      },
      { // Listado de tanques
        margin: [0, 40, 0, 0],
        layout: {
          hLineWidth: function (i, node) {
            return (i === 0 || i === 1 || i === node.table.body.length) ? 1 : 0;
          },
          vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 1 : 0;
          },
        },
        table: {
          headerRows: 1,
          // widths: ['*', 'auto', 100, '*'],
          body: tablaTanques
        }
      }
    ]
  }
  var date = new Date(),
    str = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();

  _impresion2({
    tipo: 'pdf',
    archivo: `LISTADO-VENT-COMBUST-${str}.pdf`,
    content
  })
    .then(() => {
      finImpresion_110()
    })
    .catch(err => {
      loader('hide');
      console.log(err)
    })
}

function finImpresion_110() {
  loader('hide');
  // $('#contenido table#tabla-principal tbody').html('');
  // $('#contenido table#tabla-secundaria tbody').html('');
  _ventanaFormatoBom110();
}