/** @format */

function _imprimirHC526(datos) {
  const tabla = llenarTablas(datos);
  return {
    images: {logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT)},
    pageMargins: marginEncabezado_SUB52(),
    header: encabezado_SUB52(datos),
    content: [
      {
        margin: [0, 5, 0, 0],
        stack: [
          {
            marginTop: 3,
            stack: tabla,
          },
          {
            columns: [
              {
                width: 70,
                margin: [0, 10, 0, 0],
                text: 'PESO PACIENTE:',
                style: 'left8Bold',
              },
              {
                width: 45,
                margin: [0, 10, 0, 0],
                text: `${datos.paciente.peso} KG` || '               ',
                style: 'left8Bold',
              },
              {
                width: 70,
                margin: [0, 10, 0, 0],
                text: datos.paciente.peso ? 'GASTO URINARIO:' : '       ',
                style: 'left8Bold',
              },
              {
                margin: [0, 10, 0, 0],
                text: `${
                  datos.paciente.peso ? datos.paciente.gasto_urinario : '       '
                } (CC/KG/HR)`,
                style: 'left8Bold',
              },
              {
                margin: [-80, 10, 0, 0],
                text: `${
                  datos.paciente.peso
                    ? String(dxGastoUrinario(datos.paciente.gasto_urinario)).toUpperCase()
                    : '       '
                }`,
                style: 'left8Bold',
              },
            ],
          },
        ],
      },
    ],
    styles: estilosImpresion_impHc(),
  };
}

function llenarTablas(datos) {
  // header
  let content = [],
    body = [],
    head = [];

  content.push([
    {text: '', border: [false, false, false, false]},
    {text: '', border: [false, false, false, false]},
    {text: 'LIQUIDOS ADMINISTRADOS', colSpan: 3, style: 'center8Bold'},
    {text: '', border: [false, false, false, false]},
    {text: '', border: [false, false, false, false]},
    {text: 'LIQUIDOS ELIMINADOS', colSpan: 4, style: 'center8Bold'},
    {text: '', border: [false, false, false, false]},
    {text: '', border: [false, false, false, false]},
    {text: '', border: [false, false, false, false]},
    {text: '', border: [false, false, false, false]},
    {text: '', border: [false, false, false, false]},
    {text: '', border: [false, false, false, false]},
  ]);

  head = [
    'FECHA',
    'HORA',
    'ORAL',
    'VENOSA',
    'OTROS',
    'ORINA',
    'MATERIA FECAL',
    'SNG',
    'OTROS',
    'OBSERVACIONES',
    'BALANCE',
    'OPERADOR',
  ];
  content.push(
    head.map((m) => {
      return {text: m, style: 'center7BoldT'};
    }),
  );
  // // body
  var i = 1;
  datos.controles = datos.controles.map((c) => {
    return {...c, horaa: '', horab: ''};
  });
  datos.controles = datos.controles.sort(function (a, b) {
    const horaa = Number(
      String(a.fecha)
        .replace(/\//g, '')
        .concat(String(a.hora).concat(':', String(a.min)).replace(/:/g, '')),
    );
    a.horaa = horaa;
    const horab = Number(
      String(b.fecha)
        .replace(/\//g, '')
        .concat(String(b.hora).concat(':', String(b.min)).replace(/:/g, '')),
    );
    b.horab = horab;
    return a.horaa - b.horab;
  });
  datos.controles.reverse();

  for (let control of datos.controles) {
    const balances = {
      eliminados: Object.values(control['eliminados']).reduce(
        (a, b) => (parseInt(a) || 0) + (parseInt(b) || 0),
      ),
      administrados: Object.values(control['administrados']).reduce(
        (a, b) => parseInt(a) + parseInt(b),
      ),
    };

    body = [
      // administrados
      {text: _editarFecha(control.fecha), style: 'center7'},
      {text: String(control.hora).concat(':', control.min), style: 'center8'},
      {text: control['administrados'].oral, style: 'center8'},
      {text: control['administrados'].venosa, style: 'center8'},
      {text: control['administrados'].otros, style: 'center8'},
      // Eliminados
      {text: control['eliminados'].orina, style: 'center8'},
      {text: control['eliminados'].darrea, style: 'center8'},
      {text: control['eliminados'].sng, style: 'center8'},
      {text: control['eliminados'].otros, style: 'center8'},
      // Otros
      {text: control.observaciones, style: 'center8'},
      {text: control.balance, style: 'center8'},
      {text: control.oper, style: 'center8'},
    ];
    content.push(body);
    i++;
  }
  let totales = {
    eliminados: datos.controles
      ? datos.controles.map((m) => m.eliminados['total']).reduce((a, b) => a + b)
      : 0,
    administrados: datos.controles
      ? datos.controles.map((m) => m.administrados['total']).reduce((a, b) => a + b)
      : 0,
  };
  totales.balance = totales.administrados - totales.eliminados;
  content.push([
    {text: '', border: [true, true, false, true], style: 'center8BoldT'},
    {text: '', border: [false, true, false, true], style: 'center8BoldT'},
    {
      text: 'TOTAL / 24 HRS           ' + totales.administrados.toString().padStart(2, '0'),
      colSpan: 3,
      style: 'center8BoldT',
      border: [false, true, false, true],
    },
    {text: '', border: [false, false, false, false]},
    {text: '', border: [false, false, false, false]},
    {
      text: '    TOTAL / 24 HRS            ' + totales.eliminados.toString().padStart(2, '0'),
      colSpan: 4,
      style: 'center8BoldT',
      border: [false, true, false, true],
    },
    {text: '', border: [false, true, false, true]},
    {text: '', border: [false, true, false, true]},
    {text: '', border: [false, true, false, true]},
    {
      text: 'TOTAL BALANCE ' + totales.balance.toString().padStart(2, '0'),
      style: 'center7BoldT',
      colSpan: 2,
      border: [false, true, false, true],
    },
    {text: '', border: [false, true, false, true]},
    {text: '', border: [false, false, true, true], style: 'center7BoldT'},
  ]);

  var tabla = [
    {
      marginTop: 5,
      style: 'center5',
      fontSize: 7,
      table: {
        heights: [10, 10],
        widths: ['10%', '6%', '6%', '8%', '6%', '6%', '13%', '4%', '6%', '15%', '10%', '10%'],
        body: content,
      },
    },
  ];
  return tabla;
}
const dxGastoUrinario = (gastoUrinario) => {
  console.log(gastoUrinario);
  gastoUrinario = parseFloat(gastoUrinario);
  let rangosGastoUrinario = {
    normal: gastoUrinario > 0.5 && gastoUrinario < 3,
    oliguria: gastoUrinario < 0.4 && gastoUrinario > 0.3,
    anuria: gastoUrinario < 0.2,
    poliurea: gastoUrinario > 3,
  };
  const i = Object.values(rangosGastoUrinario).indexOf(true);
  return Object.keys(rangosGastoUrinario)[i] || 'NORMAL';
};
