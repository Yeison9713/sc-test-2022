function imprimirEstandar_RX(dato) {
  switch (dato.EDAD.substring(0, 1)) {
    case "A":
      dato.AUX_EDAD = "  Años";
      break;
    case "M":
      dato.AUX_EDAD = "  Meses";
      break;
    case "D":
      dato.AUX_EDAD = "  Dias";
      break;
    default:
      dato.AUX_EDAD = "";
      break;
  }
  var EDAD = parseInt(dato.EDAD.substring(1, 4));

  var comprobante = dato.LLAVE.substring(13, 19);

  return {
    pageMargins: [35, parseInt(dato.FECHA.substring(16, 18)) < 20 ? 150 : 210, 35, 30],
    images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(dato.ID_RADIOLOGO.trim()) },
    header: (currentPage, pageCount, pageSize) => {
      return [
        {
          margin: [35, 30, 35, 0],
          stack: [
            {
              columns: [
                {
                  stack: [{ image: "logo", width: 60, height: 50 }],
                  width: "10%",
                },
                {
                  marginTop: 5,
                  text: [
                    $_USUA_GLOBAL[0].NOMBRE + "\n",
                    $_USUA_GLOBAL[0].NIT + "\n",
                    "COMPROBANTE DE PRESTACION DE SERVICIOS: " + comprobante.trim(),
                  ],
                  width: "80%",
                  fontSize: 11,
                  bold: true,
                  alignment: "center",
                },
              ],
            },
            {
              style: "left9",
              stack: [
                {
                  marginTop: 3,
                  columns: [
                    { text: "ESTUDIO: ", bold: true, width: "15%" },
                    { text: dato.DESCRIP_CUP.replace(/\s\s+/g, " "), width: "85%" },
                  ],
                },
                {
                  columns: [
                    { text: "NOMBRE: ", bold: true, width: "15%" },
                    { text: dato.DESCRIP_PACI.replace(/\s\s+/g, " "), width: "55%" },
                    { text: "EDAD: ", bold: true, width: "6%" },
                    { text: EDAD + dato.AUX_EDAD, width: "24%" },
                  ],
                },
                {
                  columns: [
                    { text: "DOCUMENTO: ", bold: true, width: "15%" },
                    { text: dato.ID_HISTORIA.replace(/\s\s+/g, " "), width: "55%" },
                    { text: "SEXO: ", bold: true, width: "6%" },
                    { text: dato.SEXO == "M" ? "Masculino" : "Femenino", width: "24%" },
                  ],
                },
                {
                  columns: [
                    { text: "FECHA ESTUDIO: ", bold: true, width: "15%" },
                    { text: dato.FECHA.replace(/\s\s+/g, " "), width: "55%" },
                    { text: "SEDE: ", bold: true, width: "6%" },
                    { text: dato.NOM_SUCURSAL, width: "24%" },
                  ],
                },
                {
                  columns: [
                    { text: "ENTIDAD: ", bold: true, width: "15%" },
                    { text: dato.NOM_ENTIDAD.replace(/\s\s+/g, " "), width: "85%" },
                  ],
                },
                {
                  canvas: [
                    {
                      type: "line",
                      x1: 0,
                      y1: 5,
                      x2: pageSize.width - 70,
                      y2: 5,
                      lineWidth: 1,
                    },
                  ],
                },
                {
                  stack:
                    parseFloat(dato.FECHA.substring(16, 18)) < 20
                      ? []
                      : [
                          {
                            text: [
                              {
                                text: "Este estudio de imágenes diagnósticas se realizó teniendo en cuenta los protocolos de bioseguridad institucionales que garantizan una atención segura y se guían por las normas recomendadas por la OMS, con el objetivo de limitar el riesgo de expansión del virus SARS-CoV-2 (COVID 19) y ofrecer niveles óptimos de protección a los pacientes, a nuestros colaboradores altamente entrenados y al público en general.",
                                bold: true,
                                alignment: "justify",
                                fontSize: 10,
                              },
                            ],
                            margin: [0, 5, 0, 0],
                          },
                        ],
                },
              ],
            },
          ],
        },
      ];
    },
    footer: (currentPage, pageCount, pageSize) => {
      return [
        {
          columns: [
            {
              text: localStorage.Usuario + moment().format(" - YYYY/MM/DD - HH:mm"),
              style: "left9",
            },
            {
              text: `Página ${currentPage} de ${pageCount}`,
              style: "left9",
              alignment: "right",
            },
          ],
          margin: [35, 0, 35, 0],
        },
      ];
    },
    content: [
      {
        style: "left9",
        alignment: "justify",
        text: dato.RESULTADO_PPAL,
      },
      {
        style: "left9",
        unbreakable: true,
        stack: [
          {
            text: dato.CUP.slice(0, 2) == "88" ? "Estudio digitado por:\n" : "Estudio Interpretado por:\n",
            margin: [0, 40, 0, 0],
          },
          {
            stack: [{ image: "firma", width: 100, height: 70, margin: [0, 5, 0, 0] }],
          },
          {
            stack: [
              {
                text:
                  dato.CUP.substring(0, 2) == "88"
                    ? []
                    : [
                        { text: "DOCUMENTO MÉDICO:  ", bold: true },
                        { text: dato.ID_RADIOLOGO.replace(/\s\s+/g, " ") + "\n" },
                      ],
              },
              {
                text: [
                  { text: "NOMBRE MÉDICO:  ", bold: true },
                  dato.NOM_RADIOLOGO.replace(/\s\s+/g, " ").replace(/\�/g, "Ñ") + "\n",
                  dato.DETALLE_MEDICO ? dato.DETALLE_MEDICO.replace(/\s\s+/g, " ").replace(/\�/g, "Ñ") + "\n" : "",
                  { text: "REG. MÉDICO:  ", bold: true },
                  dato.REG_RADIOLOGO,
                ],
              },
            ],
          },
        ],
      },
    ],

    styles: {
      left9: {
        fontSize: 10,
        alignment: "left",
      },
      left9Bold: {
        fontSize: 9,
        alignment: "left",
        bold: true,
      },
      left10Bold: {
        fontSize: 10,
        alignment: "left",
      },
      left10Bold: {
        fontSize: 10,
        alignment: "left",
        bold: true,
      },
    },
  };
}

function _imprimir_RXI03A(datos) {
  datos.FECHAFACT_RX = datos.FECHA.replace(/\s+/g, " ");
  datos.FECHAFACT_RX = datos.FECHAFACT_RX.replace(/\//g, " ");
  datos.COMPROBANTE = datos.LLAVE.substring(13, 19);
  datos.SUCURSAL = datos.LLAVE.substring(10, 12);
  datos.HTMLRESULTADOPPAL = datos.RESULTADO_PPAL.replace(/\n/g, "&");
  datos.DESCRIPPACI_RX = datos.DESCRIP_PACI.replace(/\s+/g, " ");
  datos.IDHISFACT_RX = datos.ID_HISTORIA;
  datos.EDAD_RX = datos.EDAD;
  datos.SEXO_RX = datos.SEXO;
  datos.PESO_RX = datos.PESO;
  datos.ESTATURAUSUAL_RX = datos.ESTATURA_USUAL;
  datos.ESTATURAACTUAL_RX = datos.ESTATURA_ACTUAL;
  datos.ANTECEDENTES_RX = datos.ANTECEDENTES.replace(/\n/g, "&");
  datos.TRATAMIENTO_RX = datos.TRATAMIENTO.replace(/\n/g, "&");
  datos.DESCRIPCUP_RX = datos.DESCRIP_CUP;
  datos.NOMMEDICO_RX = datos.NOM_RADIOLOGO;
  datos.DESCRIP_TER = datos.NOM_ENTIDAD;
  datos.REGMEDICO_RX = datos.REG_RADIOLOGO;
  datos.TABLARESULTADO = datos.TABLA_MEDICION;
  datos.TEXTO_BMD = datos.TEXTO_BMD;
  datos.CONCLUSIONESDENSITOMETRIA_RX = datos.CONCLUSIONES.replace(/\n/g, "&");
  datos.CONCLUSIONESDENSITOMETRIA_RX = datos.CONCLUSIONESDENSITOMETRIA_RX.replace(/\s+/g, " ");
  datos.HALLAZGOS_RX = datos.HALLAZGOS.replace(/\n/g, "&");
  datos.HALLAZGOS_RX = datos.HALLAZGOS_RX.replace(/\s+/g, " ");
  datos.PERDIDAPESO_RX = parseInt(datos.ESTATURAACTUAL_RX) - parseInt(datos.ESTATURAUSUAL_RX);

  return {
    pageMargins: [35, 90, 35, 60],
    images: {
      logo: `D:\\SC\\newcobol\\LOGOS\\${$_USUA_GLOBAL[0].NIT}.png`,
      firma: `D:\\SC\\newcobol\\HC\\DATOS\\${datos.ID_RADIOLOGO.trim()}.png`,
    },
    header: function (currentPage, pageCount, pageSize) {
      var width_page = pageSize.width - 70;

      return {
        margin: [35, 30, 35, 0],
        stack: [
          {
            columns: [
              {
                margin: [7, 3, 0, 0],
                stack: [
                  {
                    image: "logo",
                    width: 80,
                    height: 50,
                  },
                ],
                // text: 'logo',
                width: "17%",
              },
              {
                marginTop: 13,
                style: "center11Bold",
                fontSize: 11,
                text: [
                  { text: datos.USU + "\n" },
                  { text: "COMPROBANTE DE PRESTACION DE SERVICIOS:  " },
                  { text: datos.COMPROBANTE + "\n" },
                ],
                width: "66%",
              },
            ],
          },
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: -60,
                w: width_page,
                h: 66,
                r: 0,
                lineWidth: 1,
                lineColor: "#000",
              },
            ],
          },
        ],
      };
    },

    content: [
      {
        margin: [0, 5, 0, 0],
        stack: [
          {
            stack: llenarFormato(),
          },
        ],
      },
    ],

    styles: {
      center9: {
        fontSize: 9,
        alignment: "center",
      },
      center11Bold: {
        fontSize: 11,
        alignment: "center",
        bold: true,
      },
      center9Bold: {
        fontSize: 9,
        alignment: "center",
        bold: true,
      },
      left9Bold: {
        fontSize: 9,
        bold: true,
      },
      left9: {
        fontSize: 9,
      },
    },
  };
  function llenarFormato() {
    var col = [
      {
        table: {
          widths: ["100%"],
          headerRows: 0,
          body: [
            [{}],
            [
              {
                columns: [
                  { text: "Paciente: ", style: "left9Bold", width: "15%" },
                  { text: datos.DESCRIPPACI_RX, style: "left9", width: "39%" },
                  { text: "Fecha:", style: "left9Bold", width: "12%" },
                  { text: datos.FECHAFACT_RX, style: "left9", width: "20%" },
                ],
              },
            ],
            [
              {
                columns: [
                  { text: "ID: ", style: "left9Bold", width: "15%" },
                  { text: datos.IDHISFACT_RX, style: "left9", width: "20%" },
                  { text: "Sexo:", style: "left9Bold", width: "5%" },
                  { text: datos.SEXO_RX, style: "left9", width: "14%" },
                  { text: "Edad:", style: "left9Bold", width: "5%" },
                  { text: datos.EDAD_RX, style: "left9", width: "7%" },
                  { text: "Peso:", style: "left9Bold", width: "5%" },
                  { text: datos.PESO_RX + " KG", style: "left9", width: "15%" },
                ],
              },
            ],
            [
              {
                columns: [
                  { text: "Estatura Usual:", style: "left9Bold", width: "15%" },
                  { text: datos.ESTATURAUSUAL_RX + " CM", style: "left9", width: "20%" },
                  { text: "Estatura Actual:", style: "left9Bold", width: "13%" },
                  { text: datos.ESTATURAACTUAL_RX + " CM", style: "left9", width: "18%" },
                  { text: "Perdida de estatura:", style: "left9Bold", width: "16%" },
                  { text: datos.PERDIDAPESO_RX.toString() + " CM", style: "left9", width: "18%" },
                ],
              },
            ],
          ],
        },
        layout: "noBorders",
      },
      {
        marginTop: 5,
        columns: [
          { text: "Antecedentes: ", style: "left9Bold", width: "12%" },
          { text: datos.ANTECEDENTES_RX.replace(/&/g, "\n"), style: "left9", alignment: "justify" },
        ],
      },
      {
        marginTop: 5,
        columns: [
          { text: "Tratamiento: ", style: "left9Bold", width: "12%" },
          { text: datos.TRATAMIENTO_RX.replace(/&/g, "\n"), style: "left9", alignment: "justify" },
        ],
      },
      {
        marginTop: 5,
        columns: [
          { text: "Estudio: ", style: "left9Bold", width: "12%" },
          { text: datos.DESCRIPCUP_RX, style: "left9", alignment: "justify" },
        ],
      },
      {
        canvas: [{ type: "line", x1: 0, y1: 5, x2: 525, y2: 5 }],
      },
      {
        marginTop: 5,
        text: "Este estudio de imágenes diagnósticas se realizó teniendo en cuenta los protocolos de bioseguridad institucionales que garantizan una atención segura y se guían por las normas recomendadas por la OMS, con el objetivo de limitar el riesgo de expansión del virus SARS-CoV-2 (COVID 19) y ofrecer niveles óptimos de protección a los pacientes, a nuestros colaboradores altamente entrenados y al público en general.",
        style: "left9Bold",
        fontSize: 8,
        alignment: "justify",
      },
      {
        marginTop: 10,
        text: "RESULTADO",
        style: "center9",
      },
      {
        canvas: [{ type: "rect", x: 220, y: -12, w: 85, h: 13 }],
      },
      {
        marginTop: 5,
        text: "Enviamos el resultado de la densitometria ósea por método DXA realizada por nosotros a su \n paciente en equipo GE Lunar Prodigy Advance.",
        style: "center9Bold",
      },
      {
        columns: [
          {},
          {
            marginTop: 10,
            style: "center9",
            width: "auto",
            table: {
              body: llenarTabla(),
            },
            layout: "lightHorizontalLines",
          },
          {},
        ],
      },
      {
        marginTop: 15,
        columns: [
          { text: "Hallazgos: ", style: "left9Bold", width: "12%" },
          { text: datos.HALLAZGOS_RX, style: "left9", alignment: "justify" },
        ],
      },
      {
        marginTop: 20,
        text: "ESTUDIO DENSITOMETRICO BAJO PARAMETROS DE LA OMS SE ENCUENTRA EN:",
        style: "left9Bold",
        alignment: "justify",
      },
      {
        canvas: [{ type: "line", x1: 0, y1: 1, x2: 525, y2: 1 }],
      },
      {
        marginTop: 3,
        columns: [
          { text: "Conclusión: ", style: "left9Bold", width: "12%" },
          { text: datos.CONCLUSIONESDENSITOMETRIA_RX, style: "left9", alignment: "justify" },
        ],
      },
      {
        canvas: [{ type: "line", x1: 0, y1: 5, x2: 525, y2: 5 }],
      },
      {
        marginTop: 10,
        image: "firma",
        width: 150,
        height: 70,
      },
      {
        marginTop: 3,
        style: "left9",
        text: [
          { text: datos.NOMMEDICO_RX + "\n" },
          { text: datos.ID_RADIOLOGO + "\n" },
          { text: datos.REGMEDICO_RX + "\n" },
          { text: "Firmado Electrónicamente" },
        ],
      },
    ];
    return col;
  }

  function llenarTabla() {
    var col = [
      [
        { text: "MEDICION", bold: true },
        { text: datos.TEXTO_BMD, bold: true },
        { text: "T-Score", bold: true },
        { text: "Z-Score", bold: true },
      ],
    ];

    for (var i in datos.TABLARESULTADO) {
      if (datos.TABLARESULTADO[i].COLUMNA.trim() != "") {
        col.push([
          { text: datos.TABLARESULTADO[i].COLUMNA },
          { text: datos.TABLARESULTADO[i].BMD },
          { text: datos.TABLARESULTADO[i].T_SCORE, bold: true },
          { text: datos.TABLARESULTADO[i].Z_SCORE },
        ]);
      }
    }

    return col;
  }
}
