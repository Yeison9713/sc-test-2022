var popups = llenarPopUps();
function _imprimirHC528(datos) {
  const [tabla] = [llenarTablas(datos)];
  return {
    images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT) },
    pageMargins: marginEncabezado_SUB52(),
    header: encabezado_SUB52(datos),
    content: [
      {
        margin: [0, 5, 0, 0],
        stack: [{ marginTop: 5, stack: tabla }],
      },
    ],
    styles: estilosImpresion_impHc(),
  };
}

function llenarTablas(datos) {
  var tabla = [];
  for (let control of datos.controles) {
    tabla.push(generarTabla(control));
  }
  return tabla;
}

function generarTabla(dataControl) {
  let [content, control] = [[], dataControl];
  let table = [];
  const descripcion = {
    ventilacion: popups.ventilacion.find((m) => m.COD == control.ventilacion)['DESCRIP'],
    conciencia: popups.conciencia.find((m) => m.COD == control.conciencia)['DESCRIP'],
    color: popups.color.find((m) => m.COD == control.color)['DESCRIP'],
    syn: (el) => (el == 'S' ? 'SI' : 'NO'),
  };

  content.push(
    ['ITEM', 'FECHA', 'HORA', 'CONCIENCIA', 'COLOR', 'VENTILACION', 'FUNCIONARIO'].map((m) => {
      return {
        text: m,
        style: m !== '' ? 'center7BoldT' : 'center7Bold',
        border: m !== '' ? [true, true, true, true] : [false, false, false, false],
      };
    }),
  );

  content.push([
    { text: control.item.toString().padStart(3, '0'), style: 'center7Bold' },
    { text: moment(control.fecha).format('YYYY/MM/DD'), style: 'center7Bold' },
    { text: `${control.hora}:${control.min}`, style: 'center7Bold' },
    { text: `${descripcion.conciencia}`, style: 'center7Bold' },
    { text: `${descripcion.color}`, style: 'center7Bold' },
    { text: `${descripcion.ventilacion}`, style: 'center7Bold' },
    { text: `${control.oper}  ${control.oper_nombre}`, style: 'center7Bold' },
  ]);
  content.push([
    {
      text: 'RESPUESTA MOTORA',
      colSpan: 7,
      style: 'center7BoldT',
      border: [true, false, true, false],
    },
  ]);

  table.push([
    {
      margin: [0, 10, 0, 0],
      table: {
        heights: [10, 4],
        widths: ['5%', '15%', '6%', '20%', '15%', '15%', '24%'],
        body: content,
      },
    },
  ]);
  content = [];
  control.observaciones = control.observaciones == 'undefined' ? '      ' : control.observaciones;
  content.push(
    [
      { text: 'Mueve brazo derecho', style: 'left8BoldT' },
      {
        text: `${descripcion.syn(control.actividad.brazoder)}`,
        style: 'center7Bold',
      },
      { text: 'Mueve brazo izquierdo', style: 'left8BoldT' },
      {
        text: `${descripcion.syn(control.actividad.brazoizq)}`,
        style: 'center7Bold',
      },
      { text: 'Escalofrío', style: 'left8BoldT' },
      { text: `${descripcion.syn(control.escalofrio)}`, style: 'center7Bold' },
    ],
    [
      { text: 'Mueve pierna derecha', style: 'left8BoldT' },
      {
        text: `${descripcion.syn(control.actividad.piernader)}`,
        style: 'center7Bold',
      },
      { text: 'Mueve pierna izquierda', style: 'left8BoldT' },
      {
        text: `${descripcion.syn(control.actividad.piernaizq)}`,
        style: 'center7Bold',
      },
      { text: 'Excitación', style: 'left8BoldT' },
      { text: `${descripcion.syn(control.excitacion)}`, style: 'center7Bold' },
    ],
    [
      {
        text: 'Observaciones',
        style: 'left8BoldT',
        border: [true, false, false, true],
        colSpan: 1,
      },
      { text: control.observaciones || ' ', style: 'left8', colSpan: 5 },
    ],
  );
  const actividad = control.actividad || {};

  const brazo = {
    derecha: actividad['brazoder'] == 'S' ? 2 : 1,
    izquierda: actividad['brazoizq'] == 'S' ? 2 : 1,
  };

  const pierna = {
    derecha: actividad['piernader'] == 'S' ? 2 : 1,
    izquierda: actividad['piernaizq'] == 'S' ? 2 : 1,
  };

  const total = Object.values(brazo)
    .concat(Object.values(pierna))
    .reduce((a, b) => Number(a) + Number(b));

  control.actividad.puntaje = Number(total) >= 2 ? 2 : 1;
  var total_escala = 0;
  const puntaje_actividad = parseInt(control['actividad'].puntaje);
  const datos = [
    control.conciencia == 'S' ? 2 : 1,
    control.color == 'S' ? 2 : 1,
    control.escalofrios == 'S' ? 1 : 2,
    control.excitacion == 'S' ? 2 : 1,
    parseInt(control.ventilacion) <= 2 ? 2 : 1,
  ];
  total_escala = datos.reduce((a, b) => a + b);
  control.total = parseInt(total_escala) + parseInt(puntaje_actividad);
  table.push([
    {
      margin: [0, 0, 0, 0],
      table: {
        heights: [10, 4],
        widths: ['20%', '15%', '20%', '15%', '18.1%', '12%'],
        body: content,
      },
    },
    [
      {
        columns: [
          {
            margin: [0, 10, 0, 0],
            text: 'PUNTAJE  ESCALA TEST-ALDRETE: ',
            style: 'left8Bold',
            width: '25%',
          },
          {
            margin: [0, 9.5, 0, 0],
            text: `${control.total}`.padStart(2, '0'),
            style: 'left9Bold',
            width: '2%',
          },
          {
            margin: [-290, 10, 0, 0],
            text: `${control.total >= 9 ? 'DAR SALIDA' : 'NO DAR SALIDA'}`,
            style: 'center8Bold',
          },
        ],
      },
    ],
  ]);
  return table;
}

function llenarPopUps() {
  return {
    syn: [
      { COD: 'S', DESCRIP: 'SI' },
      { COD: 'N', DESCRIP: 'NO' },
    ],
    conciencia: [
      { COD: '1', DESCRIP: 'SIN RESPUESTA' },
      { COD: '2', DESCRIP: 'SOMNOLIENTO' },
      { COD: '3', DESCRIP: 'DESPIERTO' },
    ],
    ventilacion: [
      { COD: '1', DESCRIP: 'APNEA' },
      { COD: '2', DESCRIP: 'DIF.RESPIRATORIA' },
      { COD: '3', DESCRIP: 'VENT.RITMICA' },
      { COD: '4', DESCRIP: 'Sa - O2' },
    ],
    color: [
      { COD: '1', DESCRIP: 'ROSADO' },
      { COD: '2', DESCRIP: 'PALIDO' },
      { COD: '3', DESCRIP: 'CIANOTICO' },
    ],
  };
}
