function _imprimirHC528(datos) {
  console.log(datos);
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
  let [content, control, body, head, arrayTextos] = [
    [],
    dataControl,
    [],
    [],
    llenarPopUps(),
  ];
  let table = [];
  const descripcion = {
    actividad: arrayTextos.actividad.map((m) => m.DESCRIP)[
      control.actividad.puntaje
    ],
    respiracion: arrayTextos.respiracion.map((m) => m.DESCRIP)[
      control.respiracion
    ],
    oxigenacion: arrayTextos.oxigenacion.map((m) => m.DESCRIP)[
      control.oxigenacion
    ],
    circulacion: arrayTextos.circulacion.map((m) => m.DESCRIP)[
      control.circulacion
    ],
    conciencia: arrayTextos.conciencia.map((m) => m.DESCRIP)[
      control.conciencia
    ],
    color: arrayTextos.color.map((m) => m.DESCRIP)[control.color],
    syn: (el) => arrayTextos.syn.map((m) => m.DESCRIP)[el],
  };

  content.push(
    ["", "NRO CONTROL", "FECHA", "HORA", "OPER"].map((m) => {
      return {
        text: m,
        style: m !== "" ? "center7BoldT" : "center7Bold",
        border:
          m !== "" ? [true, true, true, true] : [false, false, false, false],
      };
    })
  );

  content.push([
    { text: "", border: [false, false, false, false] },
    { text: control.item.toString().padStart(3, "0"), style: "center7Bold" },
    { text: moment(control.fecha).format("YYYY/MM/DD"), style: "center7Bold" },
    { text: `${control.hora}:${control.min}`, style: "center7Bold" },
    { text: `${control.oper}  ${control.oper_nombre}`, style: "center7Bold" },
  ]);

  table.push([
    {
      marginTop: 14,
      marginBottom: 4,
      marginLeft: -24,
      table: {
        heights: [10, 4],
        widths: ["23%", "12%", "12%", "12%", "28%"],
        body: content,
      },
    },
  ]);

  content = [];
  head = ["", "ITEM", "CALIFICACIÓN", "DESCRIPCION"];
  content.push(
    head.map((m) => {
      return {
        text: m,
        style: m !== "" ? "center7BoldT" : "center7Bold",
        border:
          m !== "" ? [true, true, true, false] : [false, false, false, false],
      };
    })
  );

  table.push([
    {
      marginTop: 0,
      table: {
        heights: [10, 10],
        widths: ["18.7%", "11%", "10%", "47%"],
        body: content,
      },
    },
  ]);
  content = [];

  let objResult = [];
  for (let [key, value] of Object.entries(control)) {
    if (
      ![
        "fecha",
        "anio",
        "mes",
        "dia",
        "item",
        "min",
        "hora",
        "oper",
        "oper_nombre",
      ].includes(key)
    ) {
      objResult.push({
        item: key,
        calificacion:
          key != "actividad"
            ? value.toString().padStart(2, "0")
            : value.puntaje.toString().padStart(2, "0"),
        descripcion: descripcion[key]
          ? descripcion[key]
          : descripcion["syn"](value == 2 ? 0 : 1),
      });
    }
  }
  control.resultado = objResult
    .map((m) => m["calificacion"])
    .reduce((a, b) => parseInt(a) + parseInt(b));

  for (let res of objResult) {
    body = [
      { text: "", border: [false, false, false, false], style: "center8Bold" },
      { text: res.item.toUpperCase(), style: "center7Bold" },
      { text: res.calificacion, style: "center8" },
      { text: res.descripcion, style: "center8" },
    ];
    content.push(body);
  }
  content.push([
    { text: "", border: [false, false, false, false], style: "center8Bold" },
    {
      text: "PUNTAJE",
      style: "center7Bold",
      border: [true, true, false, true],
    },
    {
      text: control.resultado.toString().padStart(2, "0"),
      style: "center7Bold",
      border: [false, true, false, true],
    },
    {
      text: parseInt(control.resultado) >= 9 ? "DAR DE ALTA" : "NO DAR DE ALTA",
      style: "center7Bold",
      border: [false, true, true, true],
    },
  ]);
  table.push([
    {
      style: "center5",
      table: {
        heights: [10, 10],
        widths: ["18.7%", "11%", "10%", "47%"],
        body: content,
      },
    },
  ]);
  return table;
}

function llenarPopUps() {
  return {
    syn: [
      { COD: "1", DESCRIP: "SI" },
      { COD: "0", DESCRIP: "NO" },
    ],
    actividad: [
      { COD: "0", DESCRIP: "INCAPAZ DE MOVER EXTREMIDADES" },
      { COD: "1", DESCRIP: "MUEVE DOS/TRES EXTREMIDADES" },
      { COD: "2", DESCRIP: "MOVIMIENTO EN TODAS LAS EXTREMIDADES" },
    ],
    respiracion: [
      { COD: "0", DESCRIP: "APNEA, RESPIRACIÓN INTERRUMPIDA" },
      { COD: "1", DESCRIP: "DISNEA, RESPIRACIÓN LIMITADA, TOSE LIMITAMENTE" },
      { COD: "2", DESCRIP: "RESPIRACIÓN PROFUNDA, TOSE LIBREMENTE" },
    ],
    circulacion: [
      { COD: "0", DESCRIP: "PRESIÓN ARTERIAL +/- 50% DEL NIVEL PREANESTÉSICO" },
      {
        COD: "1",
        DESCRIP: "PRESIÓN ARTERIAL +/- 21 - 49 % DEL NIVEL PREANESTÉSICO",
      },
      { COD: "2", DESCRIP: "PRESIÓN ARTERIAL +/- 20% DEL NIVEL PREANESTÉSICO" },
    ],
    conciencia: [
      { COD: "0", DESCRIP: "NO RESPONDE" },
      { COD: "1", DESCRIP: "RESPONDE AL LLAMADO" },
      { COD: "2", DESCRIP: "COMPLETAMENTE DESPIERTO" },
    ],
    oxigenacion: [
      { COD: "0", DESCRIP: "SaO2 < 90% AÚN INHALANDO OXIGENO" },
      { COD: "1", DESCRIP: "NECESITA INHALAR O2 PARA MANTENEER SaO2 DE 90%" },
      { COD: "2", DESCRIP: "MANTIENE > 92% SaO2 EN AIRE" },
    ],
    color: [
      { COD: "0", DESCRIP: "CIANÓTICO" },
      { COD: "1", DESCRIP: "PALIDO" },
      { COD: "2", DESCRIP: "ROSADO" },
    ],
  };
}
