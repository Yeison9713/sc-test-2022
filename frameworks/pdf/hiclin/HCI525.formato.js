function _imprimirHC525(datos) {
  const tabla = llenarTablas(datos);
  return {
    images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT) },
    pageMargins: marginEncabezado_SUB52(),
    header: encabezado_SUB52(datos),
    content: [
      {
        margin: [0, 5, 0, 0],
        stack: [
          {
            marginTop: 5,
            stack: tabla,
          },
          {
            marginTop: 10,
            style: "left8",
            stack: [
              {
                columns: [
                  {
                    width: "50%",
                    columns: [
                      {
                        style: "left8Bold",
                        width: "30%",
                        marginLeft: 3,
                        stack: [
                          { text: "OD = Ojo Derecho" },
                          { text: "OI = Ojo Izquierdo" },
                        ],
                      },
                      {
                        width: "70%",
                        stack: [
                          {
                            columns: [
                              { text: "T = Tamaño Pupila" },
                              {
                                stack: [
                                  { text: "N = NORMAL" },
                                  { text: "D = MIDRIASIS" },
                                  { text: "C = MIOSIS" },
                                ],
                              },
                            ],
                          },
                          {
                            marginTop: 5,
                            columns: [
                              { text: "R = Reacción Pupila" },
                              {
                                stack: [
                                  { text: "N = NORMAL" },
                                  { text: "F = FIJA" },
                                  { text: "P = PEREZOSA" },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        canvas: [
                          { type: "rect", x: -263, y: -2, w: 228, h: 72 },
                        ],
                      },
                    ],
                  },
                  {
                    marginLeft: -30,
                    width: "50%",

                    columns: [
                      {
                        style: "left8Bold",
                        width: "30%",
                        marginLeft: 5,
                        text: "Fuerza Muscular",
                      },
                      {
                        width: "70%",
                        stack: [
                          { text: "MSD = Miembro Superior Derecho" },
                          { text: "MSI  = Miembro Superior Izquierdo" },
                          { text: "MID  = Miembro Inferior Derecho" },
                          { text: "MII   = Miembro Inferior Izquierdo" },
                        ],
                      },
                      {
                        canvas: [
                          { type: "rect", x: -290, y: -2, w: 215, h: 50 },
                        ],
                      },
                    ],
                  },
                ],
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
    { text: "", border: Array(4).fill(false) },
    { text: "", border: Array(4).fill(false) },
    { text: "SIGNOS VITALES", colSpan: 5, style: "center8Bold" },
    { text: "", border: Array(4).fill(false) },
    { text: "", border: Array(4).fill(false) },
    { text: "", border: Array(4).fill(false) },
    { text: "", border: Array(4).fill(false) },
    { text: "PUPILAS", colSpan: 2, style: "center8Bold" },
    { text: "", border: Array(4).fill(false) },
    { text: "FUERZA MUSCULAR", colSpan: 4, style: "center8Bold" },
    { text: "", border: Array(4).fill(false) },
    { text: "", border: Array(4).fill(false) },
    { text: "", border: Array(4).fill(false) },
    { text: "ESCALA GLASGOW", colSpan: 4, style: "center8Bold" },
    { text: "", border: Array(4).fill(false) },
    { text: "", border: Array(4).fill(false) },
    { text: "", border: Array(4).fill(false) },
    { text: "", border: Array(4).fill(false) },
  ]);
  head = [
    "FECHA",
    "HORA",
    "TEMP",
    "F.C",
    "F.R",
    "T.A",
    "PVC",
    "OD   T / R",
    "OI      T / R",
    "MSD",
    "MSI",
    "MII",
    "MID",
    "ACT.VERB",
    "ACT.MOTOR",
    "AP.PARP",
    "TOTAL",
    "OPER",
  ];
  content.push(
    head.map((m) => {
      return { text: m, style: "center7BoldT" };
    })
  );
  // // body
  content.push(
    Array(18).fill({ text: "", border: [false, false, false, false] })
  );
  let jsonFMuscular = (el = 1) => {
    let retorno = _tipoJsonHc("fuerza_muscular").find((x) => x.COD == el);
    return retorno ? retorno["DESCRIP"] : "NORMAL";
  };
  for (let control of datos.controles) {
    let arrayPupilas = [
      control.odt || "N",
      control.odr || "N",
      control.oit || "N",
      control.oir || "N",
    ];
    control.muscular = control.muscular.toString();
    let arrayMuscular = [
      control.muscular.substr(0, 1),
      control.muscular.substr(1, 1),
      control.muscular.substr(2, 1),
      control.muscular.substr(3, 1),
    ];
    body = [
      {
        text: moment(control.fecha).format("YYYY/MM/DD"),
        style: "center7",
        marginTop: 14,
      },
      {
        text: control.hora.concat(":", control.min),
        style: "center8",
        marginTop: 14,
      },
      { text: control.temp, style: "center8", marginTop: 14 },
      { text: control.fcard, style: "center8", marginTop: 14 },
      { text: control.fresp, style: "center8", marginTop: 14 },
      { text: control.tens, style: "center8", marginTop: 14 },
      { text: control.pvc, style: "center8", marginTop: 14 },
      {
        text: `${arrayPupilas[0]}/${arrayPupilas[1]}`,
        style: "center8",
        marginTop: 14,
      },
      {
        text: `${arrayPupilas[2]}/${arrayPupilas[3]}`,
        style: "center8",
        marginTop: 14,
      },
      [
        {
          image: writeRotatedText(1, `${jsonFMuscular(arrayMuscular[0])}`),
          fit: [8, 100],
          rowSpan: 1,
          marginTop: -30,
        },
      ],
      [
        {
          image: writeRotatedText(1, `${jsonFMuscular(arrayMuscular[1])}`),
          fit: [8, 100],
          rowSpan: 1,
          marginTop: -30,
        },
      ],
      [
        {
          image: writeRotatedText(1, `${jsonFMuscular(arrayMuscular[2])}`),
          fit: [8, 100],
          rowSpan: 1,
          marginTop: -30,
        },
      ],
      [
        {
          image: writeRotatedText(1, `${jsonFMuscular(arrayMuscular[3])}`),
          fit: [8, 100],
          rowSpan: 1,
          marginTop: -30,
        },
      ],
      {
        text: control.glasgow_aper_ocul.toString().padStart(2, "0"),
        style: "center8",
        marginTop: 14,
      },
      {
        text: control.glasgow_verbal_resp.toString().padStart(2, "0"),
        style: "center8",
        marginTop: 14,
      },
      {
        text: control.glasgow_motora_resp.toString().padStart(2, "0"),
        style: "center8",
        marginTop: 14,
      },
      { text: control.glasgow_total, style: "center8", marginTop: 14 },
      { text: control.oper, style: "center7", marginTop: 14 },
    ];
    content.push(body);
    if (control.observaciones) {
      body = [
        {
          text: "OBSERVACIONES",
          border: [true, true, true, true],
          style: "left8BoldT",
          colSpan: 3,
        },
        { text: "", border: [false, false, false, false], style: "left8Bold" },
        { text: "", border: [false, false, false, false], style: "left8Bold" },
        {
          text: `${control.observaciones}`,
          border: [false, false, true, true],
          style: "left8",
          colSpan: 15,
        },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, false, true], style: "left8Bold" },
        { text: "", border: [false, false, true, true], style: "left8Bold" },
      ];
      content.push(body);
    }
    content.push(
      Array(18).fill({ text: "", border: [false, false, false, false] })
    );
    content.push(
      Array(18).fill({ text: "", border: [false, false, false, false] })
    );
  }
  var tabla = [
    {
      marginTop: 5,
      fontSize: 4,
      table: {
        heights: [10, 11],
        widths: [
          "10.5%",
          "6%",
          "6%",
          "4%",
          "4%",
          "9.5%",
          "4%",
          "4.5%",
          "4.5%",
          "4.5%",
          "4%",
          "4%",
          "4%",
          "5%",
          "7%",
          "6%",
          "8%",
          "5%",
        ],
        body: content,
      },
    },
  ];
  return tabla;
}
