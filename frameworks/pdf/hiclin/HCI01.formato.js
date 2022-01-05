async function _imprimirHCI01(datos) {
  switch (datos.paciente.edad.substring(0, 1)) {
    case "A":
      datos.AUX_EDAD = "  Años";
      break;
    case "M":
      datos.AUX_EDAD = "  Meses";
      break;
    case "D":
      datos.AUX_EDAD = "  Dias";
      break;
    default:
      datos.AUX_EDAD = "";
      break;
  }
  datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

  // ************* LLENADO DE IMPRESION CON FORMATO BASE *******************
  formatoBaseImp_Hc.images = {
    logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT),
    foto: rutaLogos_impHc(datos.paciente.foto),
    firma: rutaFirmas_impHc(datos.medico.firma),
  };
  formatoBaseImp_Hc.pageMargins = [35, 150, 35, 60];
  formatoBaseImp_Hc.header = function (currentPage, pageCount, pageSize) {
    formatoBaseImp_Hc.totalPage += pageCount;
    var width_page = pageSize.width - 70;

    return {
      margin: [35, 25, 35, 0],
      stack: [
        {
          columns: [
            {
              margin: [7, 0, 0, 0],
              stack: [
                {
                  image: "logo",
                  width: 75,
                  height: 45,
                },
              ],
              width: "20%",
            },
            {
              style: "center10Bold",
              text: [
                { text: datos.encabezado.nombre + "\n" },
                { text: datos.encabezado.nit + "\n" },
                { text: datos.encabezado.titulo },
              ],
              width: "60%",
            },
            {
              style: "right10Bold",
              alignment: "right",
              text: [
                { text: !$_REG_HC.hidePage ? "" + "PAG: " + currentPage + " de " + pageCount + "\n\n" : "\n\n" },
                { text: "Imprime: " + datos.encabezado.fecha, fontSize: 6 },
              ],
              width: "20%",
            },
          ],
        },
        {
          marginLeft: 7,
          marginTop: 10,
          columns: [
            {
              stack: [
                {
                  columns: [
                    { text: "FECHA INGRESO:", style: "left8Bold", width: "15%" },
                    { text: datos.paciente.fechaIng, style: "left8", width: "43%" },
                    {
                      columns:
                        datos.paciente.fechaEgr != 0
                          ? [
                              { text: "FECHA EGRESO:", style: "left8Bold", width: "36%" },
                              { text: datos.paciente.fechaEgr, style: "left8", width: "60%" },
                            ]
                          : [],
                    },
                  ],
                },
                {
                  marginTop: 2,
                  columns: [
                    { text: "PACIENTE:", style: "left8Bold", width: "15%" },
                    { text: datos.paciente.nombre.replace(/\�/g, "Ñ"), style: "left8", width: "43%" },
                    { text: "IDENTIFICACIÓN:", style: "left8Bold", width: "15%" },
                    { text: datos.paciente.tipoId + " " + datos.paciente.id, style: "left8", width: "27%" },
                  ],
                },
                {
                  marginTop: 2,
                  columns: [
                    { text: "EDAD:", style: "left8Bold", width: "6%" },
                    { text: datos.paciente.edad + datos.AUX_EDAD, style: "left8", width: "9%" },
                    { text: "SEXO:", style: "left8Bold", width: "7%" },
                    { text: datos.paciente.sexo, style: "left8", width: "8%" },
                    { text: "NACIM:", style: "left8Bold", width: "8%" },
                    { text: datos.paciente.nacim, style: "left8", width: "20%" },
                    { text: "CIUDAD:", style: "left8Bold", width: "15%" },
                    { text: datos.paciente.ciudad, style: "left8", width: "27%" },
                  ],
                },
                {
                  marginTop: 2,
                  columns: [
                    { text: "ACOMPAÑANTE:", style: "left8Bold", width: "15%" },
                    { text: datos.paciente.acomp, style: "left8", width: "43%" },
                    { text: "FOLIO:", style: "left8Bold", width: "6%" },
                    { text: datos.paciente.folio, style: "left8", width: "12%" },
                    { text: "TELEFONO:", style: "left8Bold", width: "10%" },
                    { text: datos.paciente.telefono, style: "left8", width: "15%" },
                  ],
                },
                {
                  marginTop: 2,
                  columns: [
                    { text: "ENTIDAD:", style: "left8Bold", width: "15%" },
                    { text: datos.paciente.entidad, style: "left8", width: "61%" },
                  ],
                },
                {
                  marginTop: 2,
                  width: "24%",
                  columns: [
                    { text: "BARRIO: ", style: "left8Bold", width: "15%" },
                    { text: datos.paciente.barrio, style: "left8", width: "85%" },
                  ],
                },
              ],
              width: "88%",
            },
            {
              width: "12%",
              stack: [
                {
                  image: "foto",
                  width: 50,
                  height: 53,
                },
              ],
            },
          ],
        },
        {
          canvas: [
            {
              type: "rect",
              x: 0,
              y: -68,
              w: width_page,
              h: 70,
              r: 0,
              lineWidth: 1,
            },
          ],
        },
      ],
    };
  };

  formatoBaseImp_Hc.content[0].stack.push(
    {
      stack: datos.paciente.hide_titul === true ? [] : llenarFinEnc(),
    },
    // SUBTUTULOS
    {
      marginBottom: 0,
      columns: [
        {
          stack: llenarSubtitulos(),
        },
      ],
    },
    {
      stack: datos.genograma.bandera ? [
        {
          marginTop: 10,
          style: "center10Bold",
          text: "GENOGRAMA"
        },
        {
          marginTop: 5,
          stack: llenarGenograma(),
        }
      ] : []
    },
    // LINEAS HORIZONTALES
    {
      marginTop: datos.lineas.titulos.length > 1 ? 10 : 0,
      columns: [
        {
          stack: llenarLineas(),
        },
      ],
    },
    {
      stack: llenarGineco(),
    },
    {
      stack: llenarGineco2(),
    },
    {
      marginTop: datos.gineco.titLin.length > 1 ? 10 : 0,
      columns: [
        {
          stack: llenarGinecoSubs(),
        },
      ],
    },
    {
      unbreakable: true,
      stack: llenarExamObstetrico(),
    },
    {
      marginTop: 10,
      stack: llenarObstSubs(),
    },
    {
      unbreakable: true,
      stack: llenarExamObstetrico2(),
    },
    {
      unbreakable: true,
      stack: llenarDatosAcompa(),
    },
    {
      unbreakable: true,
      stack: llenarExamFisico(),
    },
    {
      stack: llenarObservExamFisico(),
    },
    {
      unbreakable: true,
      stack: examenVisual(),
    },
    {
      unbreakable: true,
      stack: examenVisual2(),
    },
    {
      unbreakable: true,
      stack: llenarOtorrino(),
    },
    {
      stack: datos.agud == true ? llenarAgudeza() : [],
    },
    {
      stack: datos.violencia.bandera === true ? llenarViolencia() : [],
    },
    {
      stack: datos.sifilis.bandera === true ? llenarSifilisCong() : [],
    },
    {
      stack: datos.etv.bandera === true ? llenarEtv() : [],
    },
    {
      stack: datos.anomalias.bandera === true ? llenarAnomalias() : [],
    },
    {
      stack: datos.trast.bandera === true ? llenarTrastornos() : [],
    },
    {
      stack: datos.multidrog.bandera === true ? llenarMultidrog() : [],
    },
    {
      // unbreakable: true,
      stack: llenarObserv7502(),
    },
    {
      stack: llenarDiagnostico(),
    },
    {
      stack: llenarAnalisis(),
    },
    {
      stack: datos.plan ? llenarPlan() : [],
    },
    {
      stack: llenarRips(),
      // pageBreak: datos.covid.riesgos.bandera === true ? 'after' : ''
    },
    {
      stack: datos.covid.riesgos.bandera === true ? llenarRiesgosCovid() : [],
    },
    {
      stack: datos.salida.bandera === true ? llenarSalida() : [],
    },
    {
      stack:
        datos.telesalud.bandera ||
        datos.telesalud.banderaTabla1 ||
        datos.telesalud.banderaTabla2 ||
        datos.telesalud.banderaTabla3 ||
        datos.telesalud.banderaTabla4 ||
        datos.telesalud.banderaTabla5
          ? llenarTelesalud()
          : [],
    },
    {
      stack: datos.tacto_rect.bandera ? llenarTactoRectal() : []
    },
    {
      stack: datos.vac_covid19.bandera ? llenarVacCovid19() : []
    },
    {
      stack: datos.ipa.bandera ? llenarIpa() : []
    },
    datos.medico.bandera ? {} : firmaImpresion_impHc(datos),
    {
      unbreakable: true,
      stack: datos.dengueCuadro.bandera === true ? llenarDengueCuadro() : [],
      pageBreak: datos.recomDengue.bandera === true ? "after" : "",
    },
    {
      unbreakable: true,
      stack: datos.recomDengue.bandera === true ? llenarRecomendaciones() : [],
    },
    {
      unbreakable: true,
      stack: datos.downton.bandera.trim() !== "" ? llenarDownton() : [],
    },
    {
      unbreakable: true,
      stack: datos.braden.bandera.trim() !== "" ? llenarBraden() : [],
      pageBreak: datos.covid.recomendaciones.bandera === true ? "after" : "",
    },
    {
      stack: datos.covid.recomendaciones.bandera === true ? llenarRecomendacionesCovid() : [],
    },
    {
      stack: datos.covid.prevencion.bandera === true ? llenarPrevencionCovid() : [],
    },
    {
      unbreakable: true,
      style: "left8",
      alignment: "justify",
      stack: await consulta_recom_rabia(datos._hcprc, 1).then((data) => { return data })
    }
  );

  function llenarFinEnc() {
    var col = [];

    if (datos.paciente.hab.trim() != "") {
      col.push({
        fontSize: 10,
        columns: [
          { text: datos.paciente.hab, width: 65 },
          { text: datos.paciente.fact, width: 95 },
          { text: datos.paciente.unServ, width: 200, alignment: "center", bold: true },
          { text: datos.paciente.triage, alignment: "right", width: 160 },
        ],
      });
    } else {
      col.push({
        fontSize: 10,
        columns: [
          { text: datos.paciente.fact, width: 160 },
          { text: datos.paciente.unServ, alignment: "center", width: 200, bold: true },
          { text: datos.paciente.triage, alignment: "right", width: 160 },
        ],
      });
    }

    return col;
  }

  function llenarSubtitulos() {
    var col = [];

    for (i in datos.subs.titulos) {
      if(typeof(datos.subs.contenido[i]) == "object") {
        col.push({
          text: datos.subs.titulos[i],
          fontSize: 8,
          bold: true,
          marginTop: datos.subs.titulos[i] ? 5 : 0,
        });
        col.push(datos.subs.contenido[i]);
      } else {
        col.push({
          text: datos.subs.titulos[i],
          fontSize: 8,
          bold: true,
          marginTop: 5,
        });
        col.push({
          text: datos.subs.contenido[i],
          fontSize: 8,
          marginLeft: 20,
        });
      }
    }

    return col;
  }

  function llenarAgudeza() {
    var niv1 = "Nivel de vision tabla snellen: " + "                ";
    var niv3 = "Nivel de vision tabla snellen: " + "                ";
    if (datos.agudeza.nivel1.trim() != "") {
      niv1 =
        "Nivel de vision tabla snellen:         " +
        datos.agudeza.nivel1.padEnd(3) +
        "      " +
        datos.agudeza.nivel2.padEnd(3);
    }

    if (datos.agudeza.nivel3.trim() != "") {
      niv3 =
        "Nivel de vision tabla snellen:            " +
        datos.agudeza.nivel3.padEnd(3) +
        "      " +
        datos.agudeza.nivel4.padEnd(3);
    }

    var fila = [
      [
        {
          text: "EXAMEN DE AGUDEZA VISUAL",
          fontSize: 10,
          alignment: "center",
          bold: true,
          colSpan: 2,
          fillColor: "#D1DFF4",
        },
        {},
      ],
      [
        { text: "OJO IZQUIERDO", fontSize: 8, alignment: "center" },
        { text: "OJO DERECHO", fontSize: 8, alignment: "center" },
      ],
      [
        {
          text: "Estructuras oculares: " + "           Sin Alt" + "           Con Alt",
          fontSize: 8,
          alignment: "left",
        },
        {
          text: "Estructuras oculares: " + "           Sin Alt" + "           Con Alt",
          fontSize: 8,
          alignment: "left",
        },
      ],
      [
        { text: niv1, fontSize: 8, alignment: "left" },
        { text: niv3, fontSize: 8, alignment: "left" },
      ],
      [{ text: "FECHA ELABORACION: " + datos.agudeza.fecha, fontSize: 6, alignment: "right", colSpan: 2 }, {}],
    ];

    var mLeft = 75;
    var widths = [
      85 + mLeft,
      130 + mLeft,
      265 + mLeft,
      310 + mLeft,
      117 + mLeft,
      143 + mLeft,
      305 + mLeft,
      330 + mLeft,
    ];

    var tabla = [
      {
        unbreakable: true,
        marginTop: 10,
        marginLeft: mLeft,
        table: {
          widths: ["40%", "40%"],
          headerRows: 0,
          body: fila,
        },
      },
      {
        canvas: [{ type: "rect", x: widths[0], y: -38, w: 15, h: 9, r: 1, lineWidth: 1, lineColor: "#000" }],
      },
      {
        canvas: [{ type: "rect", x: widths[1], y: -38, w: 15, h: 9, r: 1, lineWidth: 1, lineColor: "#000" }],
      },
      {
        canvas: [{ type: "rect", x: widths[2], y: -38, w: 15, h: 9, r: 1, lineWidth: 1, lineColor: "#000" }],
      },
      {
        canvas: [{ type: "rect", x: widths[3], y: -38, w: 15, h: 9, r: 1, lineWidth: 1, lineColor: "#000" }],
      },
      {
        canvas: [{ type: "rect", x: widths[4], y: -24, w: 20, h: 9, r: 1, lineWidth: 1, lineColor: "#000" }],
      },
      {
        canvas: [{ type: "rect", x: widths[5], y: -24, w: 20, h: 9, r: 1, lineWidth: 1, lineColor: "#000" }],
      },
      {
        canvas: [{ type: "rect", x: widths[6], y: -24, w: 20, h: 9, r: 1, lineWidth: 1, lineColor: "#000" }],
      },
      {
        canvas: [
          { type: "rect", x: widths[7], y: -24, w: 20, h: 9, r: 1, lineWidth: 1, lineColor: "#000", text: "ase" },
        ],
      },
    ];

    tabla.push(llenarEquis(widths));

    return tabla;
  }

  function llenarEquis(widths) {
    var aux = [];
    if (datos.agudeza.izqSinAlt == true) {
      aux.push({
        canvas: [{ type: "line", x1: widths[0], y1: -38, x2: widths[0] + 15, y2: -29, lineWidth: 1, lineColo: "#000" }],
      });
      aux.push({
        canvas: [{ type: "line", x1: widths[0] + 15, y1: -38, x2: widths[0], y2: -29, lineWidth: 1, lineColo: "#000" }],
      });
    } else if (datos.agudeza.izqConAlt == true) {
      aux.push({
        canvas: [{ type: "line", x1: widths[1], y1: -38, x2: widths[1] + 15, y2: -29, lineWidth: 1, lineColo: "#000" }],
      });
      aux.push({
        canvas: [{ type: "line", x1: widths[1] + 15, y1: -38, x2: widths[1], y2: -29, lineWidth: 1, lineColo: "#000" }],
      });
    }

    if (datos.agudeza.derSinAlt == true) {
      aux.push({
        canvas: [{ type: "line", x1: widths[2], y1: -38, x2: widths[2] + 15, y2: -29, lineWidth: 1, lineColo: "#000" }],
      });
      aux.push({
        canvas: [{ type: "line", x1: widths[2] + 15, y1: -38, x2: widths[2], y2: -29, lineWidth: 1, lineColo: "#000" }],
      });
    } else if (datos.agudeza.derConAlt == true) {
      aux.push({
        canvas: [{ type: "line", x1: widths[3], y1: -38, x2: widths[3] + 15, y2: -29, lineWidth: 1, lineColo: "#000" }],
      });
      aux.push({
        canvas: [{ type: "line", x1: widths[3] + 15, y1: -38, x2: widths[3], y2: -29, lineWidth: 1, lineColo: "#000" }],
      });
    }

    return aux;
  }

  function llenarDengueCuadro() {
    var fila = [
      [
        { text: "QUÉ HACER", color: "green", alignment: "center" },
        { text: "QUÉ NO HACER", color: "red", alignment: "center" },
      ],
      [
        {
          text: "1. Reposo \n 2. Liquidos orales abundantes (entre 2 y 5 Onzas mas de usual según edad), que incluyan jugos de frutas que no sean rojas o ácidos, suero oral, lactancia materna y la dieta usual si el paciente la tolera. \n  3. Acetaminofén según orden médica. \n 4. Medios fisicos: Baños de agua tibia. \n 5. Usar toldillo. \n 6. Asistir a los controles especialmente el dia que desaparece la fiebre. \n 7. Consultar de inmediato si aparecen signos de alarma",
          style: "left8",
        },
        {
          text: "1. No suministrar agua sola. \n 2. No inyecciones para la fiebre. \n 3. No tomar medicamentos para la fiebre sin formula médica. \n 4. Nunca aspirina. \n 5. No baños con alcohol u otras sustancias toxicas. \n 6. No dejar un niño al cuidado de otro niño.",
          style: "left8",
        },
      ],
      [{ text: "SIGNOS DE ALARMA", color: "#E17911", alignment: "center", colSpan: 2 }, {}],
      [
        {
          text: "1. Dolor abdominal espontáneo o a la palpación. \n 2. Vómitos frecuentes. \n 3. Manos o pies pálidos, frios o húmedos. \n 4. Dificultad para respirar. \n 5. Mareos. \n 6. Cambios en el estado de ánimo (somnolencia/irritabilidad). \n 7. Sangrados: petequias, epistaxis, gingivorragia, hematemesis, melena, metrorragia. \n 8. Verificar diuresis por lo menos 1 vez cada 6 horas. \n 9. Riesgo social: vive solo o vive lejos de donde puede recibir atención médica, dificultades en el transporte, pobreza extrema. \n 10. Tener 1 año o menos.",
          style: "left8",
          colSpan: 2,
        },
        {},
      ],
    ];

    var tabla = [
      {
        marginTop: 15,
        table: {
          widths: ["50%", "50%"],
          body: fila,
        },
      },
    ];

    return tabla;
  }

  function llenarRecomendaciones() {
    var fila = [
      {
        marginTop: 10,
        columns: [
          { text: "RECOMENDACIONES PARA PACIENTES CON DX: DENGUE SIN SIGNOS DE ALARMA", style: "center10Bold" },
        ],
      },
      {
        style: "left8",
        marginTop: 10,
        ol: [
          { text: "Reposo en cama con toldillo.", marginBottom: 3 },
          [
            { text: "Abundantes liquidos.", marginBottom: 3 },
            {
              ul: [
                {
                  columns: [
                    { text: "Adultos: ", width: "8%", marginBottom: 2 },
                    { text: "Líquidos orales abundantes (6 tazas o m s al día, para un adulto promedio)." },
                  ],
                },
                {
                  columns: [
                    { text: "Niños: ", width: "8%", marginBottom: 2 },
                    {
                      text: "Líquidos orales abundantes (leche, jugos de frutas naturales (precaución en diabticos), suero oral (SRO) o agua de cebada, de arroz o agua de coco.",
                    },
                  ],
                },
                {
                  text: "Calculo según Plan B del AIPI. El agua sola puede causar desequilibrio hidroelectrolítico.",
                  marginBottom: 2,
                },
                {
                  text: " Escribir la cantidad prescrita: __________________ en tazas, onzas, litros. ",
                  marginBottom: 3,
                },
              ],
            },
          ],
          [
            { text: "Acetaminofen.", marginBottom: 3 },
            {
              ul: [
                {
                  columns: [
                    { text: "Adultos: ", width: "8%", marginBottom: 2 },
                    { text: "500mg por vía oral cada 6 horas, dosis m xima diaria 4 gramos." },
                  ],
                },
                {
                  columns: [
                    { text: "Niños: ", width: "8%", marginBottom: 3 },
                    {
                      text: "10 mg/kg/dosis c/6 horas, escribir la cantidad en cucharaditas de 5ml o # tabletas: ____________ ",
                    },
                  ],
                },
              ],
            },
          ],
          {
            text: "Baños con esponja y agua tibia (temperatura del agua 2§C menor que la Temperatura del paciente).",
            marginBottom: 3,
          },
          {
            text: "Buscar y eliminar  los criaderos  de  zancudos  en  la  casa  y  sus  alrededores  siempre  debe ser vigilado por un adulto entrenado en cuidados de dengue.",
            marginBottom: 5,
          },
        ],
      },
      { text: "EVITAR: ", style: "left8", marginBottom: 5 },
      {
        style: "left8",
        marginLeft: 10,
        ul: [
          {
            text: 'Los  medicamentos  para  evitar el  dolor y la  inflamación. Ej.: "AINES", acido  acetil  salicílico (aspirina),  dipirona,  diclofenaco,  naproxeno,  etc. (Intravenosa,  intramuscular,  por  vía  oral ni supositorios) o esteroides.',
            marginBottom: 3,
          },
          { text: "Los antibióticos (si cree que son necesarios, consultar al medico).", marginBottom: 3 },
          {
            text: "Si  aparece  uno  de  los  siguientes  síntomas o signos  consulte  de  inmediato  al servicio de urgencias:",
            marginBottom: 3,
          },

          {
            marginLeft: 10,
            ol: [
              "Sangrados: Puntos rojos en la piel (petequias).",
              "Sangrado de nariz y/o encías.",
              "Vómitos con sangre.",
              "Heces coloreadas de negro.",
              "Menstruación abundante / sangrado vaginal, vómitos.",
              "Dolor abdominal espontaneo o a la palpación del abdomen.",
              "Somnolencia, confusión mental, desmayos, convulsiones.",
              "Manos o pies p lidos, fríos o húmedos.",
              "Dificultad para respirar.",
            ],
          },
        ],
      },
      {
        style: "left8",
        marginTop: 5,
        columns: [
          { text: "Seguimiento", width: "12%", bold: true },
          {
            text: "Pacientes del grupo A, realizar una  valoración el día de la defervescencia (primer día sin fiebre) y posteriormente evaluación diaria hasta que pase el periodo crítico (48 horas despus de la fiebre), evaluarlo con recuento de plaquetas, hematocrito y aparición de signos de alarma.",
          },
        ],
      },
    ];

    return fila;
  }

  function llenarDownton() {
    var downAlto = [
      { text: "MEDIDAS PARA RIESGO ALTO DE CAIDA: ", style: "center10Bold", marginTop: 5, alignment: "left" },
      {
        style: "left8",
        marginLeft: 10,
        marginTop: 3,
        ol: [
          "Uso permanente de barandas laterales de la cama",
          "Asistir actividades de eliminacion permanente (pato o pisingo)",
          "Ayudarle a adquirir el habito de sentarse en el borde de la cama antes de levantarse",
          "Deambulacion asistida por personal o acompañante",
          "Enseñarle al paciente/cuidador a manejar, si lo precisa, los dispositivos de ayuda para la deambulacion, baston, andador, muletas, silla de ruedas, poner el freno cuando se traslada de la silla a la cama o viceversa.",
          "Medidas de contencion fisica o farmacologica segun orden medica",
          "Observacion periodica de correcto funcionamiento del timbre",
          "Reforzar educacion a familiares y favorecer acompañamiento",
          "Instruir al paciente para que pida ayuda para moverse",
          "Colocar la cama mecanica en la posicion mas baja",
          "Ronda de enfermeria cada hora",
          "Revisar que los pisos no esten hymedos y deslizantes",
          "Recordar en entrega de turno la clasificacion del riesgo del paciente",
          "Inmovilizion (si lo requiere, debe contar con orden medica registrada en la historia clinica)",
        ],
      },
    ];

    var downMedio = [
      { text: "MEDIDAS PARA RIESGO MEDIO DE CAIDA: ", style: "center10Bold", marginTop: 5, alignment: "left" },
      {
        style: "left8",
        marginLeft: 10,
        marginTop: 3,
        ol: [
          "Ayudarle a adquirir el habito de sentarse en el borde de la cama antes de levantarse",
          "Observacion periodica de correcto funcionamiento del timbre",
          "Deambulacion asistida por personal o acompañante",
          "Mesa de noche al alcance",
          "Instruir al paciente para que pida ayuda para moverse",
          "Colocar la cama mecanica en la posicion mas baja",
          "Ronda de enfermeria cada hora",
          "Recordar en entrega de turno la clasificacion del riesgo del paciente",
        ],
      },
    ];

    var downBajo = [
      { text: "MEDIDAS PARA RIESGO BAJO DE CAIDA: ", style: "center10Bold", marginTop: 5, alignment: "left" },
      {
        style: "left8",
        marginLeft: 10,
        marginTop: 3,
        ol: [
          "Medidas preventivas generales",
          "Ayudarle a adquirir el habito de sentarse en el borde de la cama antes de levantarse",
          "Utilizar calzado solido con suela antideslizante (de goma, no de cuero)",
          "Evitar zapatos y zapatillas mal ajustados y con cordones",
          "No utilizar batas largas, ni arrastrar los pantalones de la pijama",
          "Observacion periodica de correscto funcionamiento del timbre",
          "Mesa de noceh al alcance",
          "Colocar la cama mecanica en la posicion mas baja",
          "Ronda de enfermeria cada 2 horas",
          "Recordar en entrega de turno la clasificacion del riesgo del paciente",
        ],
      },
    ];

    var fila = [
      { text: "VALORACION DE RIESGOS DE CAIDAS ESCALA DOWNTON", style: "center10Bold", marginTop: 10 },
      {
        style: "left8",
        marginTop: 5,
        ol: [
          {
            columns: [
              { text: "Ha presentado caidas previas: ", width: "45%", marginBottom: 2 },
              { text: datos.downton.cont.caidas },
            ],
          },
          {
            columns: [
              { text: "Toma medicamentos frecuentemente? ", width: "45%", marginBottom: 2 },
              { text: datos.downton.cont.medicamentos },
            ],
          },
          {
            columns: [
              { text: "Presenta alteraciones sensoriales visuales o auditivas: ", width: "45%", marginBottom: 2 },
              { text: datos.downton.cont.alteraciones },
            ],
          },
          {
            columns: [{ text: "Estado mental: ", width: "45%", marginBottom: 2 }, { text: datos.downton.cont.mental }],
          },
          {
            columns: [
              { text: "Deambulacion: ", width: "45%", marginBottom: 2 },
              { text: datos.downton.cont.deambulacion },
            ],
          },
        ],
      },

      { stack: datos.downton.bandera == "alto" ? downAlto : [] },
      { stack: datos.downton.bandera == "medio" ? downMedio : [] },
      { stack: datos.downton.bandera == "bajo" ? downBajo : [] },
    ];

    return fila;
  }

  function llenarBraden() {
    var bradenAlto = [
      {
        text: "MEDIDAS PREVENTIVAS PARA ALTO RIESGO DE ULCERA POR PRESION: ",
        style: "center10Bold",
        marginTop: 5,
        alignment: "left",
      },
      {
        style: "left8",
        marginLeft: 10,
        marginTop: 3,
        ol: [
          "Cambios posturales cada 2 horas",
          "Mantener seco, higien personal y cambio de sabanas cada 8 horas",
          "Superficie dinamica de apoyo (colchon de aire o flotadores en zonas de presion)",
          "Aplicacion de procuctos de barrera en zonas de riesgo, lubricacion de pie",
          "Medicion de riesgo cada turno",
        ],
      },
    ];

    var bradenMedio = [
      {
        text: "MEDIDAS PREVENTIVAS PARA RIESGO MODERADO DE ULCERAS POR PRESION: ",
        style: "center10Bold",
        marginTop: 5,
        alignment: "left",
      },
      {
        style: "left8",
        marginLeft: 10,
        marginTop: 3,
        ol: [
          "Cambios posturales cada 3 horas",
          "Cambio de sabanas casa 12 horas",
          "Superficie dinamica de apoyo (colchon de aire o flotadores en zonas de presion)",
          "Valorar aplicacion de productos de barrera en zonas de riesgo",
          "Medicion del riesgo diario",
        ],
      },
    ];

    var bradenBajo = [
      {
        text: "MEDIDAS PREVENTIVAS PARA RIESGO BAJO DE ULCERAS POR PRESION: ",
        style: "center10Bold",
        marginTop: 5,
        alignment: "left",
      },
      {
        style: "left8",
        marginLeft: 10,
        marginTop: 3,
        ol: [
          "Cambios posturales cada 3 o 4 horas",
          "Mantener seco segun demanda",
          "Cambio de sabanas cada 24 horas",
          "Superficie de apoyo estatica (colchonetas, cojines de aire, fiblra o espuma)",
          "Medicion de riesgo diario",
        ],
      },
    ];

    var fila = [
      // ---------- BRADEN --------------

      { text: "VALORACION DEL RIESGO DE ULCERAS POR PRESION ESCALA DE BRADEN", style: "center10Bold", marginTop: 10 },
      {
        margin: [0, 2, 0, 0],
        stack: [
          { columns: [{ text: "Percepcion sensorial: " + datos.braden.cont.percepcion, style: "left8" }] },
          { columns: [{ text: "Humedad: " + datos.braden.cont.humedad, style: "left8" }] },
          { columns: [{ text: "Actividad: " + datos.braden.cont.actividad, style: "left8" }] },
          { columns: [{ text: "Movilidad: " + datos.braden.cont.movilidad, style: "left8" }] },
          { columns: [{ text: "Nutrición: " + datos.braden.cont.nutricion, style: "left8" }] },
          { columns: [{ text: "Roce y peligro de lesiones: " + datos.braden.cont.roce, style: "left8" }] },
        ],
      },
      { stack: datos.braden.bandera == "alto" ? bradenAlto : [] },
      { stack: datos.braden.bandera == "medio" ? bradenMedio : [] },
      { stack: datos.braden.bandera == "bajo" ? bradenBajo : [] },
    ];

    return fila;
  }

  function llenarDiagnostico() {
    var fila = [];

    if (datos.datosAnalisis.diagnostico != "") {
      var columnDiag = [];
      for (i in datos.datosAnalisis.diagnostico) {
        columnDiag.push({ text: datos.datosAnalisis.diagnostico[i] + "\n", style: "left8" });
      }

      var col = [
        {
          columns: [
            { text: "DIAGNOSTICO: \n", style: "left8Bold", marginTop: 10, width: "12%" },
            { stack: [columnDiag], marginTop: 10 },
          ],
        },
      ];
      fila.push(col);
    }

    if (datos.datosAnalisis.bandera == 1) {
      fila.push({
        marginTop: 5,
        text: [
          { text: "TIPO DE DIAGNOSTICO:  ", style: "left8Bold" },
          { text: datos.datosAnalisis.tipoDiag, style: "left8" },
        ],
      });
    }

    return fila;
  }

  function llenarAnalisis() {
    var fila = [];

    if (datos.datosAnalisis.analisis.trim() != "") {
      var columnAn = [
        {
          columns: [
            { text: "ANALISIS: \n", style: "left8Bold", marginTop: 5, width: "12%" },
            { text: datos.datosAnalisis.analisis, style: "left8", alignment: "justify", marginTop: 5 },
          ],
        },
      ];
      fila.push(columnAn);
    }

    if (datos.datosAnalisis.bandera == 2) {
      fila.push({
        marginTop: 5,
        text: [
          { text: "TIPO DE DIAGNOSTICO:  ", style: "left8Bold" },
          { text: datos.datosAnalisis.tipoDiag, style: "left8" },
        ],
      });
    }

    return fila;
  }

  function llenarPlan() {
    return [
      {
        style: "left8",
        marginTop: 5,
        columns: [
          { text: "PLAN: ", bold: true, width: "12%" },
          { text: datos.plan, alignment: "justify", width: "88%" },
        ],
      },
    ];
  }

  function llenarRips() {
    var fila = [];

    for (i in datos.rips.titulos) {
      fila.push({
        marginTop: i == 0 ? 5 : 2,
        text: [
          {
            text: datos.rips.titulos[i] + "  ",
            style: "left8Bold",
          },
          {
            text: datos.rips.contenido[i],
            style: "left8",
          },
        ],
      });
    }

    return fila;
  }

  function llenarLineas() {
    col = [];
    for (i in datos.lineas.titulos) {
      col.push({
        text: [
          {
            text: datos.lineas.titulos[i] + "  ",
            style: "left8Bold",
          },
          {
            text: datos.lineas.contenido[i],
            style: "left8",
          },
        ],
      });
    }

    return col;
  }

  function llenarExamFisico() {
    var x = [];

    for (i in datos.examFisico.cont) {
      x.push({ text: datos.examFisico.cont[i] });
    }

    var arrayTit = [
      "T.Arter",
      "T.Med",
      "Fr.Card",
      "Fr.Resp",
      "Tempe",
      "So2",
      "Pvc",
      "Peso",
      "Talla",
      "IMC",
      "Sp.Corp",
      "Per.Tor",
      "Per.Abdo",
      "Per.Muñ",
      "Glasgow",
    ];

    var tit = [];
    for (var i in arrayTit) {
      tit.push({ text: arrayTit[i], bold: true, fillColor: "#D1DFF4" });
    }

    var fila = [tit];

    fila.push(x);

    var obes = [
      {
        marginTop: 5,
        text: [
          { text: "OBESIDAD CENTRAL:  ", style: "left8Bold" },
          { text: datos.examFisico.obesidad, style: "left8" },
        ],
      },
    ];

    var imc = [
      {
        marginTop: 5,
        text: [
          { text: "CLASIFICACIÓN IMC:  ", style: "left8Bold" },
          { text: datos.examFisico.imc, style: "left8" },
        ],
      },
    ];

    var cardio = [
      {
        marginTop: 5,
        text: [
          { text: "RIESGO CARDIOVASCULAR:  ", style: "left8Bold" },
          { text: datos.examFisico.riesgoCardio, style: "left8" },
        ],
      },
    ];

    var eg = [
      {
        marginTop: 5,
        text: [
          { text: "CLASIFICACION IMC/EG:  ", style: "left8Bold" },
          { text: datos.examFisico.imcEg, style: "left8" },
        ],
      },
    ];

    var tabla = [
      {
        marginTop: 2,
        bold: true,
        text: "SIGNOS VITALES",
        style: "center10Bold",
      },
      {
        unbreakable: true,
        marginTop: 2,
        style: "center8",
        fontSize: 7,
        table: {
          heights: [15, 15],
          widths: ["8%", "5%", "7.5%", "7.5%", "6.2%", "5%", "5%", "6%", "6.6%", "5%", "8%", "6%", "8%", "8%", "8%"],
          body: fila,
        },
      },
      {
        stack: datos.examFisico.obesidad.trim() != "" ? obes : [],
      },
      {
        stack: datos.examFisico.imc.trim() != "" ? imc : [],
      },
      {
        stack: datos.examFisico.riesgoCardio.trim() != "" ? cardio : [],
      },
      {
        stack: datos.examFisico.imcEg.trim() != "" ? eg : [],
      },
    ];

    if (datos.examFisico.bandera == true) {
      return tabla;
    } else {
      return [];
    }
  }

  function examenVisual() {
    var fila = [[{ text: "EXAMEN VISUAL", style: "center10BoldT", colSpan: 5 }, {}, {}, {}, {}]];

    for (i in datos.examVisual.tit) {
      fila.push([
        { text: datos.examVisual.tit[i], style: "center8Bold" },
        { text: datos.examVisual.dato1[i], style: "center8" },
        { text: datos.examVisual.dato2[i], style: "center8" },
        { text: datos.examVisual.dato3[i], style: "center8" },
        { text: datos.examVisual.dato4[i], style: "center8" },
      ]);
    }

    var tabla = [
      {
        marginTop: 20,
        table: {
          widths: ["20%", "20%", "20%", "20%", "20%"],
          headerRows: 0,
          body: fila,
        },
      },
    ];

    if (datos.examVisual.bandera == true) {
      return tabla;
    } else {
      return [];
    }
  }

  function examenVisual2() {
    var fila = [[{ text: datos.examVisual2.principal, style: "center10BoldT", colSpan: 2 }, {}]];

    for (i in datos.examVisual2.tit) {
      fila.push([
        { text: datos.examVisual2.tit[i], style: "left8Bold" },
        { text: datos.examVisual2.cont[i], style: "left8" },
      ]);
    }

    var tabla = [
      {
        marginTop: 5,
        table: {
          widths: ["30%", "70%"],
          headerRows: 0,
          body: fila,
        },
      },
    ];

    if (datos.examVisual2.bandera == true) {
      return tabla;
    } else {
      return [];
    }
  }

  function llenarGenograma() {
    if (datos.genograma.bandera == true) {
      var col = [
        {
          columns: [
            { text: "", width: "40%" },
            { marginTop: 10, text: "Padre", width: "10%", style: "center10Bold" },
            { marginTop: 10, text: "Madre", width: "10%", style: "center10Bold" },
            { text: "", width: "40%" },
          ],
        },
        {
          columns: [
            { text: "", width: "40%" },
            { text: datos.genograma.pad, width: "10%", style: "center8" },
            { text: datos.genograma.mad, width: "10%", style: "center8" },
            { text: "", width: "40%" },
          ],
        },
        {
          canvas: [{ type: "rect", x: 210, y: -23, w: 50, h: 25, r: 1, lineWidth: 1, lineColor: "#000" }],
        },
        {
          canvas: [{ type: "rect", x: 265, y: -25, w: 50, h: 25, r: 1, lineWidth: 1, lineColor: "#000" }],
        },
        {
          columns: [
            { marginTop: 20, text: "Sx Edad", width: "16.66%", marginLeft: 0, style: "center10Bold" },
            { marginTop: 20, text: "Sx Edad", width: "16.66%", marginLeft: 0, style: "center10Bold" },
            { marginTop: 20, text: "Sx Edad", width: "16.66%", marginLeft: 0, style: "center10Bold" },
            { marginTop: 20, text: "Sx Edad", width: "16.66%", marginLeft: 0, style: "center10Bold" },
            { marginTop: 20, text: "Sx Edad", width: "16.66%", marginLeft: 0, style: "center10Bold" },
            { marginTop: 20, text: "Sx Edad", width: "16.66%", marginLeft: 0, style: "center10Bold" },
          ],
        },
        {
          columns: [
            { marginTop: 0, text: datos.genograma.her[0], width: "16.66%", style: "center8" },
            { marginTop: 0, text: datos.genograma.her[1], width: "16.66%", style: "center8" },
            { marginTop: 0, text: datos.genograma.her[2], width: "16.66%", style: "center8" },
            { marginTop: 0, text: datos.genograma.her[3], width: "16.66%", style: "center8" },
            { marginTop: 0, text: datos.genograma.her[4], width: "16.66%", style: "center8" },
            { marginTop: 0, text: datos.genograma.her[5], width: "16.66%", style: "center8" },
          ],
        },
        {
          canvas: [{ type: "rect", x: 10, y: -23, w: 67, h: 25, r: 1, lineWidth: 1, lineColor: "#000" }],
        },
        {
          canvas: [{ type: "rect", x: 98, y: -25, w: 67, h: 25, r: 1, lineWidth: 1, lineColor: "#000" }],
        },
        {
          canvas: [{ type: "rect", x: 186, y: -25, w: 67, h: 25, r: 1, lineWidth: 1, lineColor: "#000" }],
        },
        {
          canvas: [{ type: "rect", x: 273, y: -25, w: 67, h: 25, r: 1, lineWidth: 1, lineColor: "#000" }],
        },
        {
          canvas: [{ type: "rect", x: 360, y: -25, w: 67, h: 25, r: 1, lineWidth: 1, lineColor: "#000" }],
        },
        {
          canvas: [{ type: "rect", x: 448, y: -25, w: 67, h: 25, r: 1, lineWidth: 1, lineColor: "#000" }],
        },
        // LINEAS
        {
          canvas: [{ type: "line", x1: 45, y1: -35, x2: 45, y2: -25, lineWidth: 1 }],
        },
        {
          canvas: [{ type: "line", x1: 130, y1: -35, x2: 130, y2: -25, lineWidth: 1 }],
        },
        {
          canvas: [{ type: "line", x1: 220, y1: -35, x2: 220, y2: -25, lineWidth: 1 }],
        },
        {
          canvas: [{ type: "line", x1: 305, y1: -35, x2: 305, y2: -25, lineWidth: 1 }],
        },
        {
          canvas: [{ type: "line", x1: 390, y1: -35, x2: 390, y2: -25, lineWidth: 1 }],
        },
        {
          canvas: [{ type: "line", x1: 480, y1: -35, x2: 480, y2: -25, lineWidth: 1 }],
        },
        {
          canvas: [{ type: "line", x1: 45, y1: -35, x2: 480, y2: -35, lineWidth: 1 }],
        },
        {
          canvas: [{ type: "line", x1: 235, y1: -45, x2: 235, y2: -35, lineWidth: 1 }],
        },
        {
          canvas: [{ type: "line", x1: 290, y1: -45, x2: 290, y2: -35, lineWidth: 1 }],
        },
      ];

      return col;
    } else {
      return [];
    }
  }

  function llenarGineco() {
    if (datos.gineco.bandera == true) {
      var x = [];

      for (i in datos.gineco.g1) {
        x.push({ text: datos.gineco.g1[i], style: "center8" });
      }

      var fila = [
        [
          { text: "MENARQUIA", style: "center8BoldT" },
          { text: "CICLOS", style: "center8BoldT" },
          { text: "GESTACIONES", style: "center8BoldT" },
          { text: "PARTOS VAG", style: "center8BoldT" },
          { text: "CESAREAS", style: "center8BoldT" },
          { text: "ABORTOS", style: "center8BoldT" },
          { text: "ECTOPICOS", style: "center8BoldT" },
          { text: "MOLAS", style: "center8BoldT" },
          { text: "OBITOS", style: "center8BoldT" },
        ],
      ];

      fila.push(x);

      var cont = [
        {
          marginTop: 10,
          text: "GINECOLOGIA",
          style: "center10Bold",
        },
        {
          marginTop: 4,
          style: "left8",
          text: [
            { text: "EMBARAZO DE ALTO RIESGO", bold: true },
            { text: datos.gineco.emb_alto_riesg_esq_w },
          ]
        },
        {
          marginTop: 4,
          table: {
            widths: ["12%", "14%", "13.5%", "12%", "10%", "9.5%", "11%", "8%", "10%"],
            headerRows: 0,
            body: fila,
          },
        },
      ];

      return cont;
    } else {
      return [];
    }
  }

  function llenarGinecoSubs() {
    col = [];
    for (i in datos.gineco.titLin) {
      col.push({
        text: [
          {
            text: datos.gineco.titLin[i].trim() + "  ",
            style: "left8Bold",
          },
          {
            text: datos.gineco.contLin[i].trim(),
            style: "left8",
          },
        ],
      });
    }

    return col;
  }

  function llenarGineco2() {
    if (datos.gineco.bandera == true) {
      var x = [];

      for (i in datos.gineco.g2) {
        x.push({ text: datos.gineco.g2[i], style: "center8" });
      }

      var fila = [
        [
          { text: "F.U.R", style: "center8BoldT" },
          { text: "ULT. PARTO", style: "center8BoldT" },
          { text: "ULT. CITOLOGIA", style: "center8BoldT" },
          { text: "RESULTADO CITOLOGIA", style: "center8BoldT" },
        ],
      ];

      fila.push(x);

      var cont = [
        {
          marginTop: 5,
          table: {
            widths: ["25%", "25%", "25%", "25%"],
            headerRows: 0,
            body: fila,
          },
        },
      ];

      return cont;
    } else {
      return [];
    }
  }

  function llenarTelesalud() {
    var fila1 = [
      [
        { text: " ", style: "center8BoldT" },
        { text: "Año", style: "center8BoldT" },
        { text: "Mes", style: "center8BoldT" },
        { text: "Dia", style: "center8BoldT" },
      ],
      [
        { text: "Fecha de asesoria pre", style: "center8Bold" },
        { text: datos.telesalud.fechaAsePre.substring(0, 4), style: "center8Bold" },
        { text: datos.telesalud.fechaAsePre.substring(4, 6), style: "center8Bold" },
        { text: datos.telesalud.fechaAsePre.substring(6, 8), style: "center8Bold" },
      ],
      [
        { text: "Fecha de asesoria pos", style: "center8Bold" },
        { text: datos.telesalud.fechaAsePos.substring(0, 4), style: "center8Bold" },
        { text: datos.telesalud.fechaAsePos.substring(4, 6), style: "center8Bold" },
        { text: datos.telesalud.fechaAsePos.substring(6, 8), style: "center8Bold" },
      ],
      [
        { text: "Fecha de ecografia obstétrica", style: "center8Bold" },
        { text: datos.telesalud.fechaEcoObs.substring(0, 4), style: "center8Bold" },
        { text: datos.telesalud.fechaEcoObs.substring(4, 6), style: "center8Bold" },
        { text: datos.telesalud.fechaEcoObs.substring(6, 8), style: "center8Bold" },
      ],
    ];

    var fila2 = [
      [
        { text: " ", style: "center8BoldT" },
        { text: "Año", style: "center8BoldT" },
        { text: "Mes", style: "center8BoldT" },
        { text: "Dia", style: "center8BoldT" },
      ],
      [
        { text: "Fecha de vacuna influenza", style: "center8Bold" },
        { text: datos.telesalud.fechaVacInfl.substring(0, 4), style: "center8Bold" },
        { text: datos.telesalud.fechaVacInfl.substring(4, 6), style: "center8Bold" },
        { text: datos.telesalud.fechaVacInfl.substring(6, 8), style: "center8Bold" },
      ],
      [
        { text: "Fecha de vacuna TDAP", style: "center8Bold" },
        { text: datos.telesalud.fechaVacTDAP.substring(0, 4), style: "center8Bold" },
        { text: datos.telesalud.fechaVacTDAP.substring(4, 6), style: "center8Bold" },
        { text: datos.telesalud.fechaVacTDAP.substring(6, 8), style: "center8Bold" },
      ],
      [
        { text: "Fecha de vacuna TT", style: "center8Bold" },
        { text: datos.telesalud.fechaVacTT.substring(0, 4), style: "center8Bold" },
        { text: datos.telesalud.fechaVacTT.substring(4, 6), style: "center8Bold" },
        { text: datos.telesalud.fechaVacTT.substring(6, 8), style: "center8Bold" },
      ],
    ];

    var fila3 = [
      [
        { text: "LAB", style: "center8BoldT", rowSpan: 2, marginTop: 7 },
        { text: "Fecha", style: "center8BoldT", colSpan: 3 },
        {},
        {},
        { text: "1ER TRIMESTRE", style: "center8BoldT", rowSpan: 2, marginTop: 7 },
        { text: "Fecha", style: "center8BoldT", colSpan: 3 },
        {},
        {},
        { text: "2D0 TRIMESTRE", style: "center8BoldT", rowSpan: 2, marginTop: 7 },
        { text: "Fecha", style: "center8BoldT", colSpan: 3 },
        {},
        {},
        { text: "3ER TRIMESTRE", style: "center8BoldT", rowSpan: 2, marginTop: 7 },
      ],
      [
        {},
        { text: "Año", style: "center8BoldT" },
        { text: "Mes", style: "center8BoldT" },
        { text: "Dia", style: "center8BoldT" },
        {},
        { text: "Año", style: "center8BoldT" },
        { text: "Mes", style: "center8BoldT" },
        { text: "Dia", style: "center8BoldT" },
        {},
        { text: "Año", style: "center8BoldT" },
        { text: "Mes", style: "center8BoldT" },
        { text: "Dia", style: "center8BoldT" },
        {},
      ],
      [
        { text: "VIH", style: "center8", alignment: "left" },
        { text: datos.telesalud.vih[0], style: "center8" },
        { text: datos.telesalud.vih[1], style: "center8" },
        { text: datos.telesalud.vih[2], style: "center8" },
        { text: datos.telesalud.vih[3], style: "center8" },
        { text: datos.telesalud.vih[4], style: "center8" },
        { text: datos.telesalud.vih[5], style: "center8" },
        { text: datos.telesalud.vih[6], style: "center8" },
        { text: datos.telesalud.vih[7], style: "center8" },
        { text: datos.telesalud.vih[8], style: "center8" },
        { text: datos.telesalud.vih[9], style: "center8" },
        { text: datos.telesalud.vih[10], style: "center8" },
        { text: datos.telesalud.vih[11], style: "center8" },
      ],
      [
        { text: "Serologia", style: "center8", alignment: "left" },
        { text: datos.telesalud.serologia[0], style: "center8" },
        { text: datos.telesalud.serologia[1], style: "center8" },
        { text: datos.telesalud.serologia[2], style: "center8" },
        { text: datos.telesalud.serologia[3], style: "center8" },
        { text: datos.telesalud.serologia[4], style: "center8" },
        { text: datos.telesalud.serologia[5], style: "center8" },
        { text: datos.telesalud.serologia[6], style: "center8" },
        { text: datos.telesalud.serologia[7], style: "center8" },
        { text: datos.telesalud.serologia[8], style: "center8" },
        { text: datos.telesalud.serologia[9], style: "center8" },
        { text: datos.telesalud.serologia[10], style: "center8" },
        { text: datos.telesalud.serologia[11], style: "center8" },
      ],
      [
        { text: "Hemoglobina", style: "center8", alignment: "left" },
        { text: datos.telesalud.hemoglobina[0], style: "center8" },
        { text: datos.telesalud.hemoglobina[1], style: "center8" },
        { text: datos.telesalud.hemoglobina[2], style: "center8" },
        { text: datos.telesalud.hemoglobina[3], style: "center8" },
        { text: datos.telesalud.hemoglobina[4], style: "center8" },
        { text: datos.telesalud.hemoglobina[5], style: "center8" },
        { text: datos.telesalud.hemoglobina[6], style: "center8" },
        { text: datos.telesalud.hemoglobina[7], style: "center8" },
        { text: datos.telesalud.hemoglobina[8], style: "center8" },
        { text: datos.telesalud.hemoglobina[9], style: "center8" },
        { text: datos.telesalud.hemoglobina[10], style: "center8" },
        { text: datos.telesalud.hemoglobina[11], style: "center8" },
      ],
      [
        { text: "IGG", style: "center8", alignment: "left" },
        { text: datos.telesalud.igg[0], style: "center8" },
        { text: datos.telesalud.igg[1], style: "center8" },
        { text: datos.telesalud.igg[2], style: "center8" },
        { text: datos.telesalud.igg[3], style: "center8" },
        { text: datos.telesalud.igg[4], style: "center8" },
        { text: datos.telesalud.igg[5], style: "center8" },
        { text: datos.telesalud.igg[6], style: "center8" },
        { text: datos.telesalud.igg[7], style: "center8" },
        { text: datos.telesalud.igg[8], style: "center8" },
        { text: datos.telesalud.igg[9], style: "center8" },
        { text: datos.telesalud.igg[10], style: "center8" },
        { text: datos.telesalud.igg[11], style: "center8" },
      ],
      [
        { text: "Curva de glicemia", style: "center8", alignment: "left" },
        { text: datos.telesalud.curva[0], style: "center8" },
        { text: datos.telesalud.curva[1], style: "center8" },
        { text: datos.telesalud.curva[2], style: "center8" },
        { text: datos.telesalud.curva[3], style: "center8" },
        { text: datos.telesalud.curva[4], style: "center8" },
        { text: datos.telesalud.curva[5], style: "center8" },
        { text: datos.telesalud.curva[6], style: "center8" },
        { text: datos.telesalud.curva[7], style: "center8" },
        { text: datos.telesalud.curva[8], style: "center8" },
        { text: datos.telesalud.curva[9], style: "center8" },
        { text: datos.telesalud.curva[10], style: "center8" },
        { text: datos.telesalud.curva[11], style: "center8" },
      ],
      [
        { text: "Hemograma", style: "center8", alignment: "left" },
        { text: datos.telesalud.hemograma[0], style: "center8" },
        { text: datos.telesalud.curva[1], style: "center8" },
        { text: datos.telesalud.hemograma[2], style: "center8" },
        { text: datos.telesalud.hemograma[3], style: "center8" },
        { text: datos.telesalud.hemograma[4], style: "center8" },
        { text: datos.telesalud.hemograma[5], style: "center8" },
        { text: datos.telesalud.hemograma[6], style: "center8" },
        { text: datos.telesalud.hemograma[7], style: "center8" },
        { text: datos.telesalud.hemograma[8], style: "center8" },
        { text: datos.telesalud.hemograma[9], style: "center8" },
        { text: datos.telesalud.hemograma[10], style: "center8" },
        { text: datos.telesalud.hemograma[11], style: "center8" },
      ],
      [
        { text: "Hemoparasito", style: "center8", alignment: "left" },
        { text: datos.telesalud.hemoparasito[0], style: "center8" },
        { text: datos.telesalud.curva[1], style: "center8" },
        { text: datos.telesalud.hemoparasito[2], style: "center8" },
        { text: datos.telesalud.hemoparasito[3], style: "center8" },
        { text: datos.telesalud.hemoparasito[4], style: "center8" },
        { text: datos.telesalud.hemoparasito[5], style: "center8" },
        { text: datos.telesalud.hemoparasito[6], style: "center8" },
        { text: datos.telesalud.hemoparasito[7], style: "center8" },
        { text: datos.telesalud.hemoparasito[8], style: "center8" },
        { text: datos.telesalud.hemoparasito[9], style: "center8" },
        { text: datos.telesalud.hemoparasito[10], style: "center8" },
        { text: datos.telesalud.hemoparasito[11], style: "center8" },
      ],
      [
        { text: "FTA - ABS", style: "center8", alignment: "left" },
        { text: datos.telesalud.fta[0], style: "center8" },
        { text: datos.telesalud.curva[1], style: "center8" },
        { text: datos.telesalud.fta[2], style: "center8" },
        { text: datos.telesalud.fta[3], style: "center8" },
        { text: datos.telesalud.fta[4], style: "center8" },
        { text: datos.telesalud.fta[5], style: "center8" },
        { text: datos.telesalud.fta[6], style: "center8" },
        { text: datos.telesalud.fta[7], style: "center8" },
        { text: datos.telesalud.fta[8], style: "center8" },
        { text: datos.telesalud.fta[9], style: "center8" },
        { text: datos.telesalud.fta[10], style: "center8" },
        { text: datos.telesalud.fta[11], style: "center8" },
      ],
      [
        { text: "Uroanalisis", style: "center8", alignment: "left" },
        { text: datos.telesalud.uroanalisis[0], style: "center8" },
        { text: datos.telesalud.curva[1], style: "center8" },
        { text: datos.telesalud.uroanalisis[2], style: "center8" },
        { text: datos.telesalud.uroanalisis[3], style: "center8" },
        { text: datos.telesalud.uroanalisis[4], style: "center8" },
        { text: datos.telesalud.uroanalisis[5], style: "center8" },
        { text: datos.telesalud.uroanalisis[6], style: "center8" },
        { text: datos.telesalud.uroanalisis[7], style: "center8" },
        { text: datos.telesalud.uroanalisis[8], style: "center8" },
        { text: datos.telesalud.uroanalisis[9], style: "center8" },
        { text: datos.telesalud.uroanalisis[10], style: "center8" },
        { text: datos.telesalud.uroanalisis[11], style: "center8" },
      ],
      [
        { text: "Urocultivo", style: "center8", alignment: "left" },
        { text: datos.telesalud.urocultivo[0], style: "center8" },
        { text: datos.telesalud.curva[1], style: "center8" },
        { text: datos.telesalud.urocultivo[2], style: "center8" },
        { text: datos.telesalud.urocultivo[3], style: "center8" },
        { text: datos.telesalud.urocultivo[4], style: "center8" },
        { text: datos.telesalud.urocultivo[5], style: "center8" },
        { text: datos.telesalud.urocultivo[6], style: "center8" },
        { text: datos.telesalud.urocultivo[7], style: "center8" },
        { text: datos.telesalud.urocultivo[8], style: "center8" },
        { text: datos.telesalud.urocultivo[9], style: "center8" },
        { text: datos.telesalud.urocultivo[10], style: "center8" },
        { text: datos.telesalud.urocultivo[11], style: "center8" },
      ],
      [
        { text: "Frotis vaginal", style: "center8", alignment: "left" },
        { text: datos.telesalud.frotis[0], style: "center8" },
        { text: datos.telesalud.curva[1], style: "center8" },
        { text: datos.telesalud.frotis[2], style: "center8" },
        { text: datos.telesalud.frotis[3], style: "center8" },
        { text: datos.telesalud.frotis[4], style: "center8" },
        { text: datos.telesalud.frotis[5], style: "center8" },
        { text: datos.telesalud.frotis[6], style: "center8" },
        { text: datos.telesalud.frotis[7], style: "center8" },
        { text: datos.telesalud.frotis[8], style: "center8" },
        { text: datos.telesalud.frotis[9], style: "center8" },
        { text: datos.telesalud.frotis[10], style: "center8" },
        { text: datos.telesalud.frotis[11], style: "center8" },
      ],
      [
        { text: "Glicemia", style: "center8", alignment: "left" },
        { text: datos.telesalud.glicemia[0], style: "center8" },
        { text: datos.telesalud.curva[1], style: "center8" },
        { text: datos.telesalud.glicemia[2], style: "center8" },
        { text: datos.telesalud.glicemia[3], style: "center8" },
        { text: datos.telesalud.glicemia[4], style: "center8" },
        { text: datos.telesalud.glicemia[5], style: "center8" },
        { text: datos.telesalud.glicemia[6], style: "center8" },
        { text: datos.telesalud.glicemia[7], style: "center8" },
        { text: datos.telesalud.glicemia[8], style: "center8" },
        { text: datos.telesalud.glicemia[9], style: "center8" },
        { text: datos.telesalud.glicemia[10], style: "center8" },
        { text: datos.telesalud.glicemia[11], style: "center8" },
      ],
      [
        { text: "Hepatitis B", style: "center8", alignment: "left" },
        { text: datos.telesalud.hepatitis[0], style: "center8" },
        { text: datos.telesalud.curva[1], style: "center8" },
        { text: datos.telesalud.hepatitis[2], style: "center8" },
        { text: datos.telesalud.hepatitis[3], style: "center8" },
        { text: "UNA SOLA TOMA", style: "bodyTabla", colSpan: 8 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
    ];

    var fila4 = [
      [
        { text: " ", style: "center8BoldT" },
        { text: "Año", style: "center8BoldT" },
        { text: "Mes", style: "center8BoldT" },
        { text: "Dia", style: "center8BoldT" },
      ],
      [
        { text: "Fecha de ginecologia", style: "center8Bold" },
        { text: datos.telesalud.fechaGine.substring(0, 4), style: "center8Bold" },
        { text: datos.telesalud.fechaGine.substring(4, 6), style: "center8Bold" },
        { text: datos.telesalud.fechaGine.substring(6, 8), style: "center8Bold" },
      ],
      [
        { text: "Fecha de nutricion", style: "center8Bold" },
        { text: datos.telesalud.fechaNutri.substring(0, 4), style: "center8Bold" },
        { text: datos.telesalud.fechaNutri.substring(4, 6), style: "center8Bold" },
        { text: datos.telesalud.fechaNutri.substring(6, 8), style: "center8Bold" },
      ],
    ];

    var fila5 = [
      [
        { text: " ", style: "center8BoldT" },
        { text: "Año", style: "center8BoldT" },
        { text: "Mes", style: "center8BoldT" },
        { text: "Dia", style: "center8BoldT" },
      ],
      [
        { text: "Fecha de odontologia", style: "center8Bold" },
        { text: datos.telesalud.fechaOdont.substring(0, 4), style: "center8Bold" },
        { text: datos.telesalud.fechaOdont.substring(4, 6), style: "center8Bold" },
        { text: datos.telesalud.fechaOdont.substring(6, 8), style: "center8Bold" },
      ],
      [
        { text: "Fecha de psicologia", style: "center8Bold" },
        { text: datos.telesalud.fechaPsico.substring(0, 4), style: "center8Bold" },
        { text: datos.telesalud.fechaPsico.substring(4, 6), style: "center8Bold" },
        { text: datos.telesalud.fechaPsico.substring(6, 8), style: "center8Bold" },
      ],
    ];

    var tabla1 = [
      {
        unbreakable: true,
        width: "50%",
        marginTop: 10,
        table: {
          widths: ["50%", "12%", "10%", "10%"],
          headerRows: 0,
          body: fila1,
        },
      },
    ];

    var tabla2 = [
      {
        unbreakable: true,
        width: "50%",
        marginTop: 10,
        table: {
          widths: ["50%", "12%", "10%", "10%"],
          headerRows: 0,
          body: fila2,
        },
      },
    ];

    var tabla3 = [
      {
        unbreakable: true,
        marginTop: 10,
        table: {
          widths: [65, 18, 18, 18, 60, 18, 18, 18, 60, 18, 18, 18, 60],
          headerRows: 0,
          body: fila3,
        },
      },
    ];

    var tabla4 = [
      {
        unbreakable: true,
        width: "50%",
        marginTop: 10,
        table: {
          widths: ["50%", "12%", "10%", "10%"],
          headerRows: 0,
          body: fila4,
        },
      },
    ];

    var tabla5 = [
      {
        unbreakable: true,
        width: "50%",
        marginTop: 10,
        table: {
          widths: ["50%", "12%", "10%", "10%"],
          headerRows: 0,
          body: fila5,
        },
      },
    ];

    var titulo = [
      { text: "CONSENTIMIENTO INFORMADO DE TELESALUD", style: "left10Bold", marginTop: 10 },
      {
        marginTop: 2,
        text: "El paciente acepta la consulta mediante telesalud: " + datos.telesalud.acepta,
        style: "left8",
      },
    ];

    var col = [
      datos.telesalud.banderaTabla1 ||
      datos.telesalud.banderaTabla2 ||
      datos.telesalud.banderaTabla3 ||
      datos.telesalud.banderaTabla4 ||
      datos.telesalud.banderaTabla5
        ? titulo
        : {},
      {
        columns: [
          { stack: datos.telesalud.banderaTabla1 == true ? tabla1 : [] },
          { stack: datos.telesalud.banderaTabla2 == true ? tabla2 : [] },
        ],
      },
      {
        stack: datos.telesalud.banderaTabla3 == true ? tabla3 : [],
      },
      {
        columns: [
          { stack: datos.telesalud.banderaTabla4 == true ? tabla4 : [] },
          { stack: datos.telesalud.banderaTabla5 == true ? tabla5 : [] },
        ],
      },
    ];

    return col;
  }

  function llenarExamObstetrico() {
    if (datos.obst.bandera == true) {
      var x = [];

      for (i in datos.obst.cont) {
        x.push({ text: datos.obst.cont[i], style: "center8" });
      }

      var fila = [
        [
          { text: "EDADES", style: "center8Bold", colSpan: 2, fillColor: "#D1DFF4" },
          {},
          { text: "FECHAS DE PARTO", style: "center8Bold", colSpan: 4, fillColor: "#D1DFF4" },
          {},
          {},
          {},
        ],
        [
          { text: "GESTACIONAL", style: "center8Bold", fillColor: "#B8C9E5" },
          { text: "ULTRAUTERINA", style: "center8Bold", fillColor: "#B8C9E5" },
          { text: "FUR", style: "center8Bold", fillColor: "#B8C9E5" },
          { text: "ECO", style: "center8Bold", fillColor: "#B8C9E5" },
          { text: "FPP X FUR", style: "center8Bold", fillColor: "#B8C9E5" },
          { text: "FPP X ECO", style: "center8Bold", fillColor: "#B8C9E5" },
        ],
      ];

      fila.push(x);

      var cont = [
        {
          marginTop: 10,
          text: "EXAMEN OBSTETRICO",
          style: "left10Bold",
          alignment: "center",
        },
        {
          marginTop: 3,
          table: {
            widths: ["16.66%", "16.66%", "16.66%", "16.66%", "16.66%", "16.7%"],
            headerRows: 2,
            body: fila,
          },
        },
      ];

      return cont;
    } else {
      return [];
    }
  }

  function llenarObstSubs() {
    col = [];
    for (i in datos.obst.titLin) {
      col.push({
        text: [
          {
            text: datos.obst.titLin[i] + "  ",
            style: "left8Bold",
          },
          {
            text: datos.obst.contLin[i],
            style: "left8",
          },
        ],
      });
    }

    return col;
  }

  function llenarExamObstetrico2() {
    if (datos.obst.banderaFlujo == true) {
      var fila = [
        [
          { text: "FLUJOMETRIA", style: "center8BoldT" },
          { text: "I.R.", style: "center8BoldT" },
          { text: "I.P. :", style: "center8BoldT" },
          { text: "S.D. :", style: "center8BoldT" },
        ],
      ];

      for (i in datos.obst.cont2) {
        fila.push([
          { text: datos.obst.cont2[i].flujo, style: "center8Bold" },
          { text: datos.obst.cont2[i].ir, style: "center8" },
          { text: datos.obst.cont2[i].ip, style: "center8" },
          { text: datos.obst.cont2[i].sd, style: "center8" },
        ]);
      }

      var cont = [
        {
          marginTop: 10,
          table: {
            widths: ["40%", "20%", "20%", "20%"],
            headerRows: 0,
            body: fila,
          },
        },
        {
          marginTop: 5,
          text: [
            {
              text: datos.obst.observTit + "  ",
              style: "left8Bold",
            },
            {
              text: datos.obst.observ,
              style: "left8",
            },
          ],
        },
      ];

      return cont;
    } else {
      return [];
    }
  }

  function llenarObservExamFisico() {
    if (datos.observExamFisico.trim() != "") {
      var col = [
        {
          marginTop: 5,
          text: datos.observExamFisico,
          style: "left8",
        },
      ];
      return col;
    } else {
      return [];
    }
  }

  function llenarOtorrino() {
    if (datos.otorrino.bandera == true) {
      var col = [{ text: "OTORRINOLARINGOLOGIA", style: "center10Bold", marginTop: 5 }];

      for (i in datos.otorrino.titulos) {
        col.push({
          text: datos.otorrino.titulos[i],
          style: "left8Bold",
          marginTop: 5,
        });
        col.push({
          text: datos.otorrino.contenido[i],
          style: "left8",
        });
      }
      return col;
    } else {
      return [];
    }
  }

  function llenarObserv7502() {
    if (datos.observ7502.trim() != "") {
      var fila = [
        { text: "OBSERVACIÓN: \n", style: "left8Bold", marginTop: 10 },
        { text: datos.observ7502, style: "left8", alignment: "justify", marginLeft: 20 },
      ];
      return fila;
    } else {
      return [];
    }
  }

  function llenarDatosAcompa() {
    if (datos.acompa.bandera == true) {
      var fila = [
        [
          { text: "TIPO DOCUMENTO", style: "center8BoldT" },
          { text: "NRO. DOCUMENTO", style: "center8BoldT" },
          { text: "NOMBRE DEL ACOMPAÑANTE", style: "center8BoldT" },
        ],
        [
          { text: datos.acompa.tipoId, style: "left8" },
          { text: datos.acompa.id, style: "left8" },
          { text: datos.acompa.nombre, style: "left8" },
        ],
        [
          { text: "ESPECIALIDAD", style: "center8BoldT", colSpan: 2 },
          {},
          { text: "FECHA CITA ESPECIALIDAD", style: "center8BoldT" },
        ],
        [
          { text: datos.acompa.espec, style: "left8", colSpan: 2 },
          {},
          { text: datos.acompa.fechaEspec, style: "left8" },
        ],
        [{ text: datos.acompa.texto, style: "left8", colSpan: 3 }, {}, {}],
      ];

      var cont = [
        {
          marginTop: 10,
          table: {
            widths: ["20%", "30%", "50%"],
            headerRows: 0,
            body: fila,
          },
        },
      ];

      return cont;
    } else {
      return [];
    }
  }

  function llenarSalida() {
    var col = [
      {
        marginTop: 10,
        columns: [
          { text: "ESTADO SALIDA: ", style: "left8Bold", width: "16%" },
          { text: `${datos.salida.estado}\n${datos.salida.remitido}`, style: "left8", width: "100%" },
        ],
      },
    ];

    return col;
  }

  function llenarRecomendacionesCovid() {
    var col = [
      {
        unbreakable: true,
        marginTop: 10,
        stack: [
          { text: "RECOMENDACIONES PARA COVID-19 (CORONAVIRUS)", style: "center10Bold" },
          { text: "Lávese las manos frecuentemente", style: "left8Bold", marginTop: 3 },
          {
            text: "Lávese las manos con frecuencia con agua y jabón y si dispone de un desinfectante de manos a base de alcohol. \n Por qué? Lavarse las manos con agua y jabón mata el virus si este esta en sus manos.",
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          { text: "Adopte medidas de higiene respiratoria", style: "left8Bold", marginTop: 3 },
          {
            text: "Al toser o estornudar, cúbrase la boca y la nariz con el codo flexionado o con un pañuelo; tire el pañuelo inmediatamente y lávese las manos con agua y jabón. \n Por qué? Al cubrir la boca y la nariz durante la tos o el estornudo se evita la propagación de germenes y virus. Si usted estornuda o tose cubrindose con las manos puede contaminar los objetos o las personas a los que toque.",
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          { text: "Mantenga el distanciamiento social", style: "left8Bold", marginTop: 3 },
          {
            text: "Mantenga al menos 1 metro (3 pies) de distancia entre usted y las demás personas, particularmente aquellas que tosan, estornuden y tengan fiebre. \n Por qué? Cuando alguien con una enfermedad respiratoria, como la infección por el COVID19, tose o estornuda, proyecta pequeñas gotículas que contienen el virus. Si esta demasiado cerca, puede inhalar el virus.",
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          { text: "Evite tocarse los ojos, la nariz y la boca", style: "left8Bold", marginTop: 3 },
          {
            text: "Por qué? Las manos tocan muchas superficies que pueden estar contaminadas con el virus. Si se toca los ojos, la nariz o la boca con las manos contaminadas, puedes transferir el virus de la superficie a si mismo",
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          {
            text: "Si tiene fiebre, tos y dificultad para respirar, solicite atención médica a tiempo",
            style: "left8Bold",
            marginTop: 3,
          },
          {
            text: "Indique a su prestador de atención de salud si ha viajado a una zona con presencia del virus COVID19, o si ha tenido un contacto cercano con alguien que haya viajado desde China, Europa entre otros y demás países donde este presente el virus y tenga síntomas respiratorios. \n Por qué? Siempre que tenga fiebre, tos y dificultad para respirar, es importante que busque atención médica de inmediato, ya que dichos sintomas pueden deberse a una infección respiratoria o a otra afección grave. Los síntomas respiratorios con fiebre pueden tener diversas causas, y dependiendo de sus antecedentes de viajes y circunstancias personales, el COVID19 podría ser una de ellas.",
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          {
            text: "Mantengase informado y siga las recomendaciones de los Profesionales de Salud",
            style: "left8Bold",
            marginTop: 3,
          },
          {
            text: "Mantengase informado sobre las últimas novedades en relación con la COVID-19. Siga los consejos de su IPS de atención de salud, de las autoridades sanitarias pertinentes a nivel Nacional y Local o de su empleador sobre la forma de protegerse a sí mismo y a los demás ante la COVID-19. \n Por qué? Las autoridades Nacionales y Locales dispondrán de la información más actualizada acerca de si la COVID-19 se esta propagando en su zona. Son los interlocutores más indicados para dar consejos sobre las medidas que la población de su zona debe adoptar para protegerse.",
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          {
            text: "Medidas de protección para las personas que se encuentran en zonas donde se est propagando la COVID-19 o que las han visitado recientemente (en los últimos 14 días)",
            style: "left8Bold",
            marginTop: 3,
          },
          {
            text: "* Siga las orientaciones expuestas arriba. \n * Permanezca en casa si empieza a encontrarse mal, aunque se trate de síntomas leves como cefalea y rinorrea leve, hasta que se recupere. \n Por qué? Evitar los contactos con otras personas y las visitas a centros mdicos permitir que estos ultimos funcionen con mayor eficacia y ayudar a protegerle a usted y a otras personas de posibles infecciones por el virus de la COVID-19 u otros. \n * Si tiene fiebre, tos y dificultad para respirar, busque r pidamente asesoramiento mdico, ya que podría deberse a una infección respiratoria u otra afección grave. Llame con antelación e informe a su dispensador de atención de salud sobre cualquier viaje que haya realizado recientemente o cualquier contacto que haya mantenido con viajeros. Por qu? Llamar con antelación permitir que su dispensador de atención de salud le dirija r pidamente hacia el centro de salud adecuado. Esto ayudar tambin a prevenir la propagación del virus de la COVID-19 y otros virus",
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
        ],
      },
    ];

    return col;
  }

  function llenarRiesgosCovid() {
    var col = [
      {
        marginTop: 10,
        stack: [
          { text: "EVALUACIÓN DEL RIESGO COVID-19", style: "center10Bold", alignment: "left" },
          {
            text:
              "Transito o viajo en los ultimos 14 dias por un pais o region con circulacion viral confirmada de COVID 19? " +
              datos.covid.riesgos.transito,
            style: "left8",
            marginTop: 3,
          },
          {
            text:
              "En los ultimos 14 dias ha estado en contacto con alguna persona que haya sido diagnosticada con Coronavirus? " +
              datos.covid.riesgos.contDiag,
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          {
            text:
              "Es personal de la salud u otro ambito hospitalario con contacto estrecho de caso confirmado o probable para Covid-19? " +
              datos.covid.riesgos.contEstr,
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          { text: "Fiebre: " + datos.covid.riesgos.fiebre, style: "left8", marginTop: 2, alignment: "justify" },
          { text: "Tos: " + datos.covid.riesgos.tos, style: "left8", marginTop: 2, alignment: "justify" },
          { text: "Disnea: " + datos.covid.riesgos.disnea, style: "left8", marginTop: 2, alignment: "justify" },
          {
            text: "Malestar general: " + datos.covid.riesgos.general,
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          { text: "Rinorrea: " + datos.covid.riesgos.rinorrea, style: "left8", marginTop: 2, alignment: "justify" },
          { text: "Odinofagia: " + datos.covid.riesgos.odinofagia, style: "left8", marginTop: 2, alignment: "justify" },
          {
            text: "Ha viajado dentro del pais? " + datos.covid.riesgos.pre1,
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          { text: "A donde viajo? " + datos.covid.riesgos.pre2, style: "left8", marginTop: 2, alignment: "justify" },
          {
            text: "Qué tiempo en dias duró ese viaje? " + datos.covid.riesgos.pre3,
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          {
            text: "Ha viajado fuera del pais? " + datos.covid.riesgos.pre4,
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
          { text: "A donde viajó? " + datos.covid.riesgos.pre5, style: "left8", marginTop: 2, alignment: "justify" },
          {
            text: "Qué tiempo en dias duró ese viaje? " + datos.covid.riesgos.pre6,
            style: "left8",
            marginTop: 2,
            alignment: "justify",
          },
        ],
      },
    ];

    return col;
  }

  function llenarPrevencionCovid() {
    var col = [
      {
        unbreakable: true,
        marginTop: 10,
        stack: [
          {
            text: "LINEAMIENTOS Y MEDIDAS DE PREVENCIÓN PROTOCOLIZADAS EN \n LAS SEDES DE LA IPS SERVIMEDICOS S.A.S FRENTE AL NUEVO VIRUS COVID-19.",
            style: "left10Bold",
            bold: true,
            alignment: "center",
          },
          {
            text: "Para la atención integral del paciente, servimedicos s.a.s dotó a los diferentes servicios de los elementos de bioseguridad necesarios para la proteción del paciente y su familia. Así mismo, mediante capacitación se explicó ampliamente el correcto uso de los mismos.",
            style: "left8",
            marginTop: 3,
            alignment: "justify",
          },
          {
            text: "El grupo asistencial, (especialistas, mdicos generales, enfermeros, auxiliares de enfermería, personal terapeuta, personal de apoyo teraputico, personal de servicios generales, personal de alimentos) de todos los servicios de la ips proceden al lavado de manos con solución alcohólica y en cumplimiento de las medidas de bioseguridad, portan todos los elementos de protección personal (epp).",
            style: "left8",
            marginTop: 3,
            alignment: "justify",
          },
          {
            text: "Lo anterior, se aplica igualmente en el area de consulta externa para dar inicio a la cita, observando la distancia mínima establecida.",
            style: "left8",
            marginTop: 3,
            alignment: "justify",
          },
          {
            text: "Dentro de la anamnesis se interroga al usuario por posibles contactos con personas diagnosticadas y/o sospechosas de covid-19, que presenten síntomas relacionados con cuadro sugestivo de covid (fiebre, tos, anosmia, síntomas respiratorios, etc), o que este en estudio de covid-19. el usuario niega todas las anteriores.",
            style: "left8",
            marginTop: 3,
            alignment: "justify",
          },
          {
            text: "Se insiste en el lavado de manos y uso de tapabocas por parte del paciente, las medidas de distanciamiento social en su dia a dia, y se indican los elementos de protección personal (app) de uso diario. Se socializa síntomas de alarma para esta patología, y directrices de consulta.",
            style: "left8",
            marginTop: 3,
            alignment: "justify",
          },
          {
            text: "Todas las anteriores medidas, se llevan a cabo en cumplimiento de las directrices impartidas por el ministerio de salud y protección social y los decretos expedidos por el Gobierno Nacional en el marco de la emergencia social y sanitaria generada por el virus covid-19.",
            style: "left8",
            marginTop: 3,
            alignment: "justify",
          },
        ],
      },
    ];

    return col;
  }

  function llenarViolencia() {
    var col = [
      { text: "VIOLENCIA DE GENERO Y VIOLENCIA ESCOLAR", style: "left10Bold", marginTop: 10 },
      {
        marginTop: 3,
        columns: [
          { text: "Orientacion sexual: ", style: "left8", bold: true, width: "17%" },
          { text: datos.violencia.orientacion, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Presenta discapacidad: ", style: "left8", bold: true, width: "20%" },
          { text: datos.violencia.discapacidad, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Condicion de vulnerabilidad: ", style: "left8", bold: true, width: "23%" },
          { text: datos.violencia.vulnerabilidad, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Existe riesgo psicosocial: ", style: "left8", bold: true, width: "21%" },
          { text: datos.violencia.riesgoPsicosocial, style: "left8" },
        ],
      },
      {
        columns: [
          {
            text: "Acciones realizadas (según riesgo psicosocial encontrado): ",
            style: "left8",
            bold: true,
            width: "47%",
          },
          { text: datos.violencia.accionesReal, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Tipo de violencia: ", style: "left8", bold: true, width: "15%" },
          { text: datos.violencia.tipoViolencia, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Existió penetracion anal: ", style: "left8", bold: true, width: "20%" },
          { text: datos.violencia.penetracionAnal, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Diligenciar si es violencia sexual: ", style: "left8", bold: true, width: "27%" },
          { text: datos.violencia.violenciaSex, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Fecha de remisión a psiquiatria: ", style: "left8", bold: true, width: "26%" },
          { text: datos.violencia.fechaPsiquiatria, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Fecha atención medicina general: ", style: "left8", bold: true, width: "27%" },
          { text: datos.violencia.fechaAtencionMed, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Trabajo social: ", style: "left8", bold: true, width: "13%" },
          { text: datos.violencia.trabajoSocial, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Fecha de atención psicologia: ", style: "left8", bold: true, width: "24%" },
          { text: datos.violencia.fechaAtencionPsico, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Psicoterapia individual programada: ", style: "left8", bold: true, width: "29%" },
          { text: datos.violencia.psicoterapiaIndProg, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Psicoterapia individual ejecutadas: ", style: "left8", bold: true, width: "28%" },
          { text: datos.violencia.psicoterapiaIndEjec, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Psicoterapia familiar programada: ", style: "left8", bold: true, width: "27%" },
          { text: datos.violencia.psicoterapiaFamProg, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Psicoterapia familiar ejecutadas: ", style: "left8", bold: true, width: "27%" },
          { text: datos.violencia.psicoterapiaFamEjec, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Fecha notificación: ", style: "left8", bold: true, width: "16%" },
          { text: datos.violencia.fechaNotificacion, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Manejo de salud prevención ITS-VSX embarazo: ", style: "left8", bold: true, width: "38%" },
          { text: datos.violencia.manejoSalud, style: "left8" },
        ],
      },
      {
        columns: [
          {
            text: "Anticoncepción de emergencia antes de las 72 horas (victimas de VSX): ",
            style: "left8",
            bold: true,
            width: "57%",
          },
          { text: datos.violencia.anticoncepcion, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Tipo de método: ", style: "left8", bold: true, width: "14%" },
          { text: datos.violencia.tipoMetodo, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Asesoria y consejeria en IVE posterior a las 72 horas: ", style: "left8", bold: true, width: "42%" },
          { text: datos.violencia.asesoria, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Acciones según resultado consejeria IVE: ", style: "left8", bold: true, width: "33%" },
          { text: datos.violencia.acciones, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Activación de ruta protección: ", style: "left8", bold: true, width: "24%" },
          { text: datos.violencia.actRutaProt, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Activación de ruta justicia: ", style: "left8", bold: true, width: "22%" },
          { text: datos.violencia.actRutaJust, style: "left8" },
        ],
      },

      {
        marginTop: 5,
        style: "left8",
        unbreakable: true,
        table: {
          widths: ["25%", "6%", "5%", "5%"],
          headerRows: 0,
          body: [
            [
              { text: "Seguimiento Resolución 459", style: "center8BoldT" },
              { text: "Año", style: "center8BoldT" },
              { text: "Mes", style: "center8BoldT" },
              { text: "Dia", style: "center8BoldT" },
            ],
            [
              { text: "Fecha seg. semana 2 (VSX)", bold: true },
              { text: datos.violencia.seguimiento.fechaSem2.substring(0, 4), alignment: "center" },
              { text: datos.violencia.seguimiento.fechaSem2.substring(4, 6), alignment: "center" },
              { text: datos.violencia.seguimiento.fechaSem2.substring(6, 8), alignment: "center" },
            ],
            [
              { text: "Fecha seg. semana 4 (VSX)", bold: true },
              { text: datos.violencia.seguimiento.fechaSem4.substring(0, 4), alignment: "center" },
              { text: datos.violencia.seguimiento.fechaSem4.substring(4, 6), alignment: "center" },
              { text: datos.violencia.seguimiento.fechaSem4.substring(6, 8), alignment: "center" },
            ],
            [
              { text: "Fecha seg. 3 meses (VSX)", bold: true },
              { text: datos.violencia.seguimiento.fecha3Mes.substring(0, 4), alignment: "center" },
              { text: datos.violencia.seguimiento.fecha3Mes.substring(4, 6), alignment: "center" },
              { text: datos.violencia.seguimiento.fecha3Mes.substring(6, 8), alignment: "center" },
            ],
            [
              { text: "Fecha seg. 6 meses (VSX)", bold: true },
              { text: datos.violencia.seguimiento.fecha6Mes.substring(0, 4), alignment: "center" },
              { text: datos.violencia.seguimiento.fecha6Mes.substring(4, 6), alignment: "center" },
              { text: datos.violencia.seguimiento.fecha6Mes.substring(6, 8), alignment: "center" },
            ],
            [
              { text: "Fecha seg. 1 año (VSX)", bold: true },
              { text: datos.violencia.seguimiento.fecha1Año.substring(0, 4), alignment: "center" },
              { text: datos.violencia.seguimiento.fecha1Año.substring(4, 6), alignment: "center" },
              { text: datos.violencia.seguimiento.fecha1Año.substring(6, 8), alignment: "center" },
            ],
          ],
        },
      },

      {
        marginTop: 5,
        columns: [
          { text: "Seguimiento al menor maltratado según guia: ", style: "left8", bold: true, width: "36%" },
          { text: datos.violencia.seguiMenor, style: "left8", width: "64%" },
        ],
      },
      {
        columns: [
          { text: "Seguimiento mujer maltratada según guia: ", style: "left8", bold: true, width: "34%" },
          { text: datos.violencia.seguiMujer, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Fecha cierre de caso: ", style: "left8", bold: true, width: "18%" },
          { text: datos.violencia.fechaCierre, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Captación de la población: ", style: "left8", bold: true, width: "22%" },
          { text: datos.violencia.captacion, style: "left8", width: "78%" },
        ],
      },
      {
        columns: [
          { text: "Observaciones: ", style: "left8", bold: true, width: "14%" },
          { text: datos.violencia.observaciones, style: "left8", width: "86%" },
        ],
      },
    ];

    return col;
  }

  function llenarSifilisCong() {
    // TABLA TRATAMIENTO DOSIS
    var tabla = [];

    for (i in datos.sifilis.trata.fecha) {
      tabla.push({
        marginTop: 5,
        style: "left8",
        unbreakable: true,
        table: {
          widths: ["30%", "70%"],
          headerRows: 0,
          body: [
            [{ text: `TRATAMIENTO ${parseInt(i) + 1}RA DOSIS`, style: "center8BoldT", colSpan: 2 }, {}],
            [{ text: "FECHA", bold: true }, { text: datos.sifilis.trata.fecha[i] }],
            [{ text: "MEDICAMENTO", bold: true }, { text: datos.sifilis.trata.medic[i] }],
            [{ text: "DOSIS", bold: true }, { text: datos.sifilis.trata.dosis[i] }],
            [{ text: "PROFESIONAL QUE APLICÓ", bold: true }, { text: datos.sifilis.trata.prof[i] }],
          ],
        },
      });
    }

    // TABLA SEROLOGIA

    var fila = [
      [{ text: `SEGUIMIENTO SEROLOGIA`, style: "center8BoldT", colSpan: 6 }, {}, {}, {}, {}, {}],
      [
        { text: "", rowSpan: 2, fillColor: "#B8C9E5" },
        { text: "TIPO DE PRUEBA", bold: true, rowSpan: 2, alignment: "center", fillColor: "#B8C9E5" },
        { text: "FECHA", colSpan: 3, alignment: "center", bold: true, fillColor: "#B8C9E5" },
        {},
        {},
        { text: "RESULTADO", rowSpan: 2, alignment: "center", bold: true, fillColor: "#B8C9E5" },
      ],
      [
        { text: "", fillColor: "#B8C9E5" },
        { text: "", fillColor: "#B8C9E5" },
        { text: "Año", alignment: "center", fillColor: "#B8C9E5" },
        { text: "Mes", alignment: "center", fillColor: "#B8C9E5" },
        { text: "Dia", alignment: "center", fillColor: "#B8C9E5" },
        {},
      ],
    ];

    var tablaSero = [
      {
        marginTop: 10,
        style: "left8",
        unbreakable: true,
        table: {
          widths: ["15%", "40%", "6%", "6%", "6%", "27%"],
          headerRows: 0,
          body: fila,
        },
      },
    ];

    for (i in datos.sifilis.sero.fecha) {
      fila.push([
        { text: datos.sifilis.sero.tit[i], bold: true },
        { text: datos.sifilis.sero.tipo[i] },
        { text: datos.sifilis.sero.fecha[i].substring(0, 4) },
        { text: datos.sifilis.sero.fecha[i].substring(4, 6) },
        { text: datos.sifilis.sero.fecha[i].substring(6, 8) },
        { text: datos.sifilis.sero.resul[i] },
      ]);
    }

    var col = [
      { text: "SIFILIS CONGENITA Y GESTACIONAL", style: "left10Bold", marginTop: 10 },
      {
        stack: tabla,
      },
      {
        stack: tablaSero,
      },

      {
        marginTop: 5,
        columns: [
          { text: "Necesito retratamiento: ", style: "left8", bold: true, width: "20%" },
          { text: datos.sifilis.necesitoRet, style: "left8", width: "64%" },
        ],
      },
      {
        columns: [
          { text: "Fecha de retratamiento: ", style: "left8", bold: true, width: "20%" },
          { text: datos.sifilis.fechaRet, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Medicamento: ", style: "left8", bold: true, width: "12%" },
          { text: datos.sifilis.medicamento, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Dosis: ", style: "left8", bold: true, width: "6%" },
          { text: datos.sifilis.dosis, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Profesional: ", style: "left8", bold: true, width: "11%" },
          { text: datos.sifilis.profesional, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Cuantos dias: ", style: "left8", bold: true, width: "12%" },
          { text: datos.sifilis.cuantosDias, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Dx de contactos: ", style: "left8", bold: true, width: "14%" },
          { text: datos.sifilis.dxContactos, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Tto a contactos: ", style: "left8", bold: true, width: "14%" },
          { text: datos.sifilis.ttoContactos, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Donde se remitió al contacto: ", style: "left8", bold: true, width: "24%" },
          { text: datos.sifilis.remitio, style: "left8" },
        ],
      },
    ];

    return col;
  }

  function llenarTactoRectal() {
    let content = [
      {
        unbreakable: true,
        marginTop: 10,
        columns: [
          { text: "", width: "15%"},
          {
            style: "left8",
            table: {
              widths: ["40%", "60%"],
              body: [
                [{text: "TACTO RECTAL", colSpan: 2, style: "center8Bold"}, {}],
                [
                  {
                    text: [
                      {text: "Se practicó tacto rectal: ", bold: true}, 
                      {text: datos.tacto_rect.tacto_rectal}
                    ]
                  },
                  {
                    text: [
                      {text: "Resultado del tacto rectal: ", bold: true}, 
                      {text: datos.tacto_rect.resul}
                    ]
                  }
                ],
              ]
            }
          },
          { text: "", width: "15%"},
        ]
      }
    ]

    if(datos.tacto_rect.nota.trim()) {
      content[0].columns[1].table.body.push(
        [
          {
            colSpan: 2,
            text: datos.tacto_rect.nota.trim() ? [
              {text: "Nota: ", bold: true}, 
              {text: datos.tacto_rect.nota}
            ] : ""
          },
          {
          }
        ]
      )
    }

    return content;
  }

  function llenarVacCovid19() {
    if(datos.vac_covid19.bandera) {
      return [
        {
          fontSize: 8,
           marginTop: 10,
           stack: [
               {
                  text: [
                      { text: "Esta vacunado contra COVID-19: ", bold: true },
                      { text: datos.vac_covid19.vacunado },
                  ]
               },
               {
                 stack: datos.vac_covid19.vacunado == "SI" ? [
                   {
                     marginTop: 3,
                     columns: [
                         {
                             width: "35%",
                             text: [
                                 { text: "Etapa de vacunación: ", bold: true },
                                 { text: datos.vac_covid19.etapa },
                             ]
                         },
                         {
                             text: [
                                 { text: "Tipo de vacuna: ", bold: true },
                                 { text: datos.vac_covid19.tipo },
                             ]
                         },
                         {
                             text: [
                                 { text: "Número de dosis: ", bold: true },
                                 { text: datos.vac_covid19.nro_dosis },
                             ]
                         }
                     ]
                   }
                 ] : []
               },
               {
                 stack: datos.vac_covid19.vacunado == "SI" ? [
                   {
                     marginTop: 3,
                     text: [
                         { text: "Fecha Vacunación: ", bold: true },
                         { text: datos.vac_covid19.fecha_vacunacion },
                     ]
                   }
                 ] : []
               }
           ]
       },
      ]
    } else return []
  }

  function llenarIpa() {
    if (datos.ipa.bandera) {
      return [
        {
          fontSize: 8,
           marginTop: 10,
           stack: [
               {
                  text: [
                      { text: "Fuma actualmente: ", bold: true },
                      { text: datos.ipa.fuma },
                  ]
               },
               {
                  stack: datos.ipa.fuma == "SI" ? [
                    {
                      marginTop: 3,
                      columns: [
                          {
                              width: "35%",
                              text: [
                                  { text: "Número de cigarrillos diarios: ", bold: true },
                                  { text: datos.ipa.nro_cigarrillos_diario },
                              ]
                          },
                          {
                              text: [
                                  { text: "Indice de paquetes de cigarrillos anuales (IPA): ", bold: true },
                                  { text: datos.ipa.ipa },
                              ]
                          },
                      ]
                    }
                 ] : []
               }
           ]
        }
      ]
    } else return []
  }

  function llenarEtv() {
    // TABLA CONTROL PARASITOLOGO
    var fila = [[{ text: `CONTROL PARASITOLOGO PARA MALARIA`, style: "center8BoldT", colSpan: 2 }, {}]];

    var tablaPara = [
      {
        marginTop: 10,
        style: "left8",
        unbreakable: true,
        table: {
          widths: ["20%", "80%"],
          headerRows: 0,
          body: fila,
        },
      },
    ];

    for (i in datos.etv.para.tit) {
      fila.push([{ text: datos.etv.para.tit[i], bold: true }, { text: datos.etv.para.cont[i] }]);
    }

    // TABLA SEGUIMIENTO CLINICO

    var fila = [[{ text: `SEGUIMIENTO CLINICO A LEISHMANIASIS`, style: "center8BoldT", colSpan: 2 }, {}]];

    for (i in datos.etv.segui.tit) {
      fila.push([{ text: datos.etv.segui.tit[i], bold: true }, { text: datos.etv.segui.cont[i] }]);
    }

    var tablaSegui = [
      {
        marginTop: 10,
        style: "left8",
        unbreakable: true,
        table: {
          widths: ["20%", "80%"],
          headerRows: 0,
          body: fila,
        },
      },
    ];

    var col = [
      { text: "DATOS PARA ETV", style: "left10Bold", marginTop: 10 },
      {
        columns: [
          { text: "Resultado de laboratorio: ", style: "left8", bold: true, width: "21%" },
          { text: datos.etv.resultado, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Fecha de inicio del Tto: ", style: "left8", bold: true, width: "19%" },
          { text: datos.etv.fechaIniTto, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Fecha de finalización del Tto: ", style: "left8", bold: true, width: "24%" },
          { text: datos.etv.fechaFinTto, style: "left8" },
        ],
      },
      {
        stack: tablaPara,
      },
      {
        stack: tablaSegui,
      },
    ];

    return col;
  }

  function llenarAnomalias() {
    var fila = [
      [
        { text: "", style: "center8BoldT" },
        { text: "Año", style: "center8BoldT" },
        { text: "Mes", style: "center8BoldT" },
        { text: "Dia", style: "center8BoldT" },
      ],
      [
        { text: "Fecha del próximo control", bold: true },
        { text: datos.anomalias.fecha1.substring(0, 4), alignment: "center" },
        { text: datos.anomalias.fecha1.substring(4, 6), alignment: "center" },
        { text: datos.anomalias.fecha1.substring(6, 8), alignment: "center" },
      ],
      [
        { text: "Fecha de ultimo control y desarrollo", bold: true },
        { text: datos.anomalias.fecha2.substring(0, 4), alignment: "center" },
        { text: datos.anomalias.fecha2.substring(4, 6), alignment: "center" },
        { text: datos.anomalias.fecha2.substring(6, 8), alignment: "center" },
      ],
      [
        { text: "Fecha de vacunación", bold: true },
        { text: datos.anomalias.fecha3.substring(0, 4), alignment: "center" },
        { text: datos.anomalias.fecha3.substring(4, 6), alignment: "center" },
        { text: datos.anomalias.fecha3.substring(6, 8), alignment: "center" },
      ],
      [
        { text: "Fecha de higiene oral", bold: true },
        { text: datos.anomalias.fecha4.substring(0, 4), alignment: "center" },
        { text: datos.anomalias.fecha4.substring(4, 6), alignment: "center" },
        { text: datos.anomalias.fecha4.substring(6, 8), alignment: "center" },
      ],
    ];

    var col = [
      { text: "ANOMALIAS CONGENITAS", style: "left10Bold", marginTop: 10 },
      {
        marginTop: 3,
        columns: [
          { text: "Descripción de la anomalia detectada: ", style: "left8", bold: true, width: "31%" },
          { text: datos.anomalias.descrip, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Seguimiento: ", style: "left8", bold: true, width: "11%" },
          { text: datos.anomalias.segui, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Laboratorios: ", style: "left8", bold: true, width: "12%" },
          { text: datos.anomalias.labora, style: "left8" },
        ],
      },
      {
        marginTop: 5,
        style: "left8",
        unbreakable: true,
        table: {
          widths: ["30%", "6%", "6%", "6%"],
          headerRows: 0,
          body: fila,
        },
      },
    ];

    return col;
  }

  function llenarTrastornos() {
    var col = [
      { text: "TRASTORNOS MENTALES Y DEL COMPORTAMIENTO", style: "left10Bold", marginTop: 10 },
      {
        marginTop: 3,
        columns: [
          { text: "Orientacion sexual: ", style: "left8", bold: true, width: "17%" },
          { text: datos.trast.orientacion, style: "left8", width: "83%" },
        ],
      },
      {
        columns: [
          { text: "Presenta discapacidad: ", style: "left8", bold: true, width: "20%" },
          { text: datos.trast.discapacidad, style: "left8", width: "80%" },
        ],
      },
      {
        columns: [
          { text: "Condicion de vulnerabilidad: ", style: "left8", bold: true, width: "23%" },
          { text: datos.trast.vulnerabilidad, style: "left8", width: "77%" },
        ],
      },
      {
        columns: [
          { text: "Tipo de evento: ", style: "left8", bold: true, width: "13%" },
          { text: datos.trast.tipoEvento, style: "left8", width: "87%" },
        ],
      },
      {
        columns: [
          { text: "Recaidas (lesión auto inflingida): ", style: "left8", bold: true, width: "26%" },
          { text: datos.trast.recaidas, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Riesgo psicosocial: ", style: "left8", bold: true, width: "16%" },
          { text: datos.trast.riesgoPsico, style: "left8" },
        ],
      },
      {
        columns: [
          {
            text: "Acciones realizadas (según riesgo psicosocial encontrado): ",
            style: "left8",
            bold: true,
            width: "47%",
          },
          { text: datos.trast.accionesReal, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Medicina general: ", style: "left8", bold: true, width: "15%" },
          { text: datos.trast.medGeneral, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Psicologia: ", style: "left8", bold: true, width: "9%" },
          { text: datos.trast.psicologia, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Psicoterapia individual programada: ", style: "left8", bold: true, width: "29%" },
          { text: datos.trast.psicoterapiaIndProg, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Psicoterapia individual ejecutadas: ", style: "left8", bold: true, width: "28%" },
          { text: datos.trast.psicoterapiaIndEjec, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Psicoterapia familiar programada: ", style: "left8", bold: true, width: "27%" },
          { text: datos.trast.psicoterapiaFamProg, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Psicoterapia familiar ejecutadas: ", style: "left8", bold: true, width: "27%" },
          { text: datos.trast.psicoterapiaFamEjec, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Fecha de remisión a psiquiatria: ", style: "left8", bold: true, width: "26%" },
          { text: datos.trast.fechaRemisionPsiq, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Fecha/notificación obligatoria para casos que aplique: ", style: "left8", bold: true, width: "43%" },
          { text: datos.trast.fechaNotificacion, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Se forma a familiar como cuidador: ", style: "left8", bold: true, width: "28%" },
          { text: datos.trast.formaFamiliar, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Realización  de tamizajes: ", style: "left8", bold: true, width: "21%" },
          { text: datos.trast.tamizajes, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Manejo/resultado tamizajes: ", style: "left8", bold: true, width: "23%" },
          { text: datos.trast.manejoTam, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Servicio captación temprana de la población: ", style: "left8", bold: true, width: "36%" },
          { text: datos.trast.captacion, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "En consumo de spa canaliza a grupos de ayuda cual: ", style: "left8", bold: true, width: "42%" },
          { text: datos.trast.consumoCan, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Se canaliza al usuario a dispositivos comunitarios: ", style: "left8", bold: true, width: "40%" },
          { text: datos.trast.canalizaUsua, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Acciones de seguimiento: ", style: "left8", bold: true, width: "21%" },
          { text: datos.trast.accionesSeg, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Adherencia a tratamiento médico y/o farmacológico: ", style: "left8", bold: true, width: "42%" },
          { text: datos.trast.adherencia, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Seguimiento a la contrarefencia: ", style: "left8", bold: true, width: "27%" },
          { text: datos.trast.segContraref, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Fecha cierre de caso: ", style: "left8", bold: true, width: "18%" },
          { text: datos.trast.fechaCierre, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Evaluación según guia mhGAP: ", style: "left8", bold: true, width: "26%" },
          { text: datos.trast.evaluacion, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Pronóstico terapeutico: ", style: "left8", bold: true, width: "19%" },
          { text: datos.trast.pronostico, style: "left8" },
        ],
      },
      {
        columns: [
          { text: "Observaciones: ", style: "left8", bold: true, width: "13%" },
          { text: datos.trast.observaciones, style: "left8", width: "87%" },
        ],
      },
    ];

    return col;
  }

  function llenarMultidrog() {
    var col = [
      { text: "MULTIDROGORESISTENTE", style: "left10Bold", marginTop: 10 },
      {
        marginTop: 3,
        columns: [
          { text: "Multidrogoresistente: ", style: "left8", bold: true, width: "17%" },
          { text: datos.multidrog.multidrogoresistente, style: "left8", width: "83%" },
        ],
      },
      {
        columns: [
          { text: "Cual mto: ", style: "left8", bold: true, width: "8%" },
          { text: datos.multidrog.cualMto, style: "left8", width: "92%" },
        ],
      },
    ];

    return col;
  }
}
