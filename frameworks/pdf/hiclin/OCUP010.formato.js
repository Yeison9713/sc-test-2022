// IMPRIME FORMULARIO SALUD OCUPACIONAL - David.M - 02-12-2021

class formato_OCUP010 {
  constructor(params) {
    this.hcprc = params.hcprc;
    this.detalles = params.detalles;
    this.paci = params.paci;
    this.callback_error = params.callback_error;
    this.callback = params.callback;
    this.datos = {};
    this.w_rect = 9;
    this.h_rect = 7;
    this.mTop = -2;
  }

  _init() {
    this.leerDetalle();
  }

  leerDetalle() {
    this.dato_7501 = this.detalles.find((e) => e["COD-DETHC"] == "7501" && e["LLAVE-HC"] == this.hcprc.llave);
    if (this.dato_7501) this.dato_7501 = this.dato_7501.DETALLE;

    this.dato_9520 = this.detalles.find((e) => e["COD-DETHC"] == "9520" && e["LLAVE-HC"] == this.hcprc.llave);
    if (this.dato_9520) {
      this.dato_9520 = this.dato_9520.DETALLE;
      this.llenarEncabezado();
    } else {
      CON851("", "Detalle no encontrado", null, "error", "Error");
      this.callback_error();
    }
  }

  llenarEncabezado() {
    this.datos.encabezado = {};
    this.datos.encabezado.titulo =
      $_USUA_GLOBAL[0].NIT == 900475095
        ? "LICENCIA EN SEGURIDAD Y SALUD EN EL TRABAJO No.2469 DE 2014"
        : "PROFESIONALES EN SALUD OCUPACIONAL Y CALIDAD";
    this.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
    this.datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;

    this.llenarDatos();
  }

  llenarDatos() {
    this.cod_paci = isNaN(this.paci.COD) ? this.paci.COD : new Intl.NumberFormat("ja-JP").format(this.paci.COD);

    switch (parseInt(this.dato_9520.aplica)) {
      case 1:
        this.dato_9520.aplica_descrip = "APLICA SIN RESTRICCIONES";
        break;
      case 2:
        this.dato_9520.aplica_descrip = "APLICA CONDICIONAL";
        break;
      case 3:
        this.dato_9520.aplica_descrip = "NO APLICA PARA EL CARGO";
        break;
      default:
        this.dato_9520.aplica_descrip = "";
        break;
    }

    switch (parseInt(this.dato_9520.exam_preingreso)) {
      case 1:
        this.dato_9520.exam_preingreso_descrip = "CUMPLE CON LOS REQUISITOS NECESARIOS PARA EL PERFIL DEL CARGO";
        break;
      case 2:
        this.dato_9520.exam_preingreso_descrip = "PRESENTA CONDICIONES DE SALUD QUE NO DISMINUYEN SU CAPACIDAD LABORAL";
        break;
      case 3:
        this.dato_9520.exam_preingreso_descrip = "NO CUMPLE CON LOS REQUISITOS DEL PERFIL DEL CARGO";
        break;
      case 4:
        this.dato_9520.exam_preingreso_descrip = "APLAZADO";
        break;
      default:
        this.dato_9520.exam_preingreso_descrip = "";
        break;
    }

    switch (parseInt(this.dato_9520.exam_period)) {
      case 1:
        this.dato_9520.exam_period_descrip = "SIN RESTRICCION PARA CONTINUAR SU LABOR ACTUAL";
        break;
      case 2:
        this.dato_9520.exam_period_descrip = "SIGNOS Y SINTOMAS DE ENFERMEDAD DE ORIGEN COMUN";
        break;
      case 3:
        this.dato_9520.exam_period_descrip = "PRESENTA RESTRICCIONES PARA LA LABOR";
        break;
      case 4:
        this.dato_9520.exam_period_descrip = "SIGNOS DE EP QUE DEBEN SER VALORADOS POR SU EPS/ARL";
        break;
      default:
        this.dato_9520.exam_period_descrip = "";
        break;
    }

    switch (parseInt(this.dato_9520.exam_egreso)) {
      case 1:
        this.dato_9520.exam_egreso_descrip = "SATISFACTORIO";
        break;
      case 2:
        this.dato_9520.exam_egreso_descrip = "CON PATOLOGIA DE ORIGEN COMUN";
        break;
      case 3:
        this.dato_9520.exam_egreso_descrip = "SECUELA DE ACCIDENTE DE TRABAJO / EP";
        break;
      case 4:
        this.dato_9520.exam_egreso_descrip = "SIN DIAGNOSTICO DE ENFERMEDAD PROFESIONAL";
        break;
      case 5:
        this.dato_9520.exam_egreso_descrip = "NO APLICA, NO ES RETIRO";
        break;
      default:
        this.dato_9520.exam_egreso_descrip = "";
        break;
    }

    this.imprimir();
  }

  imprimir() {
    _impresion2({
      tipo: "pdf",
      archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`,
      content: this.format(),
    })
      .then(() => {
        console.log("SALUD OCUPACIONAL");
        this.callback();
      })
      .catch((err) => {
        console.error(err);
        CON851("", "Error impresion SALUD OCUPACIONAL", null, "error", "Error");
        this.callback_error();
      });
  }

  format() {
    return {
      images: {
        logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT),
        firma: rutaFirmas_impHc(parseFloat(this.hcprc.med.trim())),
        foto: rutaLogos_impHc(this.paci.COD),
      },
      pageMargins: [20, 68, 20, 10],
      header: (currentPage, pageCount, pageSize) => {
        let width_page = pageSize.width - 40;

        return {
          margin: [20, 20, 20, 0],
          stack: [
            {
              columns: [
                {
                  margin: [7, -5, 0, 0],
                  stack: [
                    {
                      image: "logo",
                      width: 60,
                      height: 45,
                    },
                  ],
                  width: "17%",
                },
                {
                  marginTop: -7,
                  style: "center10Bold",
                  stack: [
                    { text: this.datos.encabezado.nombre },
                    { text: this.datos.encabezado.nit },
                    { text: this.datos.encabezado.titulo },
                    { text: "CERTIFICADO DE APTITUD MEDICO OCUPACIONAL" },
                  ],
                  width: "63%",
                },
                {
                  margin: [3, -5, 0, 0],
                  style: "center9",
                  table: {
                    body: [
                      [{ text: "COD" }, { text: "F-EO-01-FI" }],
                      [{ text: "VERSION" }, { text: "3" }],
                      [{ text: "FECHA" }, { text: "19-AGT-20" }],
                    ],
                  },
                },
              ],
            },
            {
              canvas: [
                {
                  type: "rect",
                  x: 0,
                  y: -52,
                  w: width_page,
                  h: 55,
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
              stack: this.llenarFormato(),
            },
          ],
        },
      ],
      footer: {
        margin: [0, -10, 20, 0],
        columns: [
          {
            text: `Hora de Entrega ${moment().format("HH:mm")}`,
            fontSize: 7,
            alignment: "right",
          },
        ],
      },

      styles: estilosImpresion_impHc(),
    };
  }

  llenarFormato() {
    return [
      {
        style: "left8",
        columns: [
          {
            stack: [
              // PRIMER BLOQUE
              {
                style: "left75",
                table: {
                  widths: ["17.2%", "26.5%", "14%", "42%"],
                  // heights: 1,
                  padding: 0,
                  body: [
                    [{ text: "DATOS DE LA EMPRESA", bold: true, style: "center8BoldT", colSpan: 4 }, {}, {}, {}],
                    [
                      { text: "Nombre de la empresa:", bold: true },
                      { text: this.dato_9520.ante_labor.lab_sede },
                      { text: "Entidad en MIsion:", bold: true },
                      { text: this.dato_9520.ante_labor.lab_empresa },
                    ],
                    [
                      { text: "Ciudad", bold: true, marginTop: this.mTop },
                      { text: `${$_USUA_GLOBAL[0].NOMBRE_CIU} - ${$_USUA_GLOBAL[0].NOMBRE_DEP}`, marginTop: this.mTop },
                      {},
                      {},
                    ],
                    [
                      { text: "SECTOR", bold: true, marginTop: this.mTop },
                      { text: this.dato_9520.ante_labor.activ_empresa, marginTop: this.mTop },
                      {
                        colSpan: 2,
                        text: [
                          { text: "FECHA: ", bold: true },
                          { text: _editFecha3(this.hcprc.fecha) },
                          { text: "     HORA: ", bold: true },
                          { text: _editHora(this.hcprc.hora) },
                        ],
                        marginTop: this.mTop,
                      },
                      {},
                    ],
                  ],
                },
                layout: {
                  hLineWidth: function (i) {
                    return [0, 1, 4].includes(i) ? 1 : 0;
                  },
                  vLineWidth: function (i) {
                    return i == 0 || i == 4 ? 1 : 0;
                  },
                },
                width: "90%",
              },
              // SEGUNDA BLOQUE
              {
                style: "left75",
                table: {
                  widths: ["8.5%", "29%", "8%", "29%", "11%", "14.2%"],
                  body: [
                    [
                      { text: "DATOS DEL TRABAJADOR", bold: true, style: "center8BoldT", colSpan: 6 },
                      {},
                      {},
                      {},
                      {},
                      {},
                    ],
                    [
                      { text: "Nombres:", bold: true },
                      { text: `${this.paci.NOMB1_ACOMP} ${this.paci.NOMB2_ACOMP}` },
                      { text: "Apellidos:", bold: true },
                      { text: `${this.paci.APEL1_ACOMP} ${this.paci.APEL2_ACOMP}` },
                      {
                        colSpan: 2,
                        text: [
                          { text: "Nro Hijos: ", bold: true },
                          { text: this.dato_9520.hijos.nro_hijos },
                          { text: "       Edad: ", bold: true },
                          { text: `${this.hcprc.unid_edad}${this.hcprc.vlr_edad}` },
                        ],
                      },
                      {},
                    ],
                    [
                      {
                        colSpan: 2,
                        marginTop: this.mTop,
                        text: [
                          { text: "CC: ", bold: true },
                          { text: this.cod_paci },
                          { text: "     Genero: ", bold: true },
                          { text: this.paci.SEXO == "F" ? "Fem." : "Masc." },
                        ],
                      },
                      {},
                      { text: "CARGO:", bold: true, marginTop: this.mTop },
                      { text: this.dato_9520.ante_labor.lab_cargo, marginTop: this.mTop },
                      { text: "F. nacimiento:", bold: true, marginTop: this.mTop },
                      { text: _editFecha3(this.paci.NACIM), marginTop: this.mTop },
                    ],
                    [
                      { text: "Dirección:", bold: true, marginTop: this.mTop },
                      { text: this.paci.DIRECC, marginTop: this.mTop },
                      {
                        colSpan: 2,
                        marginTop: this.mTop,
                        text: [
                          { text: "Estrato: ", bold: true },
                          { text: this.paci.ESTRATO },
                          { text: "     Teléfono: ", bold: true },
                          { text: this.paci.TELEFONO },
                        ],
                      },
                      {},
                      {
                        text: [{ text: "ARL: ", bold: true }, { text: this.dato_9520.lab_arp }],
                        colSpan: 2,
                        marginTop: this.mTop,
                      },
                      {},
                    ],
                    [
                      { text: "Eps:", bold: true, marginTop: this.mTop },
                      {
                        text: this.paci["NOMBRE-EPS"],
                        colSpan: 3,
                        marginTop: this.mTop,
                      },
                      {},
                      {},
                      {
                        colSpan: 2,
                        marginTop: this.mTop,
                        text: [
                          { text: "RH:   ", bold: true },
                          { text: `${this.paci["GRP-SANG"]} ${this.paci.RH}` },
                          { text: " AFP:   ", bold: true },
                          { text: this.dato_9520.lab_pens },
                        ],
                      },
                    ],
                  ],
                },
                layout: {
                  hLineWidth: function (i) {
                    return [1, 5].includes(i) ? 1 : 0;
                  },
                  vLineWidth: function (i) {
                    return i == 0 || i == 6 ? 1 : 0;
                  },
                },
                width: "90%",
              },
            ],
            width: "88%",
          },
          {
            table: {
              body: [[{ image: "foto", height: 78.5, width: 58, margin: [0, 13, 0, 9.2] }]],
            },
            layout: {
              hLineWidth: function (i) {
                return [0, 1, 4].includes(i) ? 1 : 0;
              },
              vLineWidth: function (i) {
                return i == 1 ? 1 : 0;
              },
            },
            width: "18%",
          },
        ],
      },
      {
        style: "left8",
        stack: [
          // TERCER BLOQUE
          {
            style: "left75",
            table: {
              widths: ["11%", "2%", "15%", "2%", "14%", "2%", "15%", "2%", "17%", "2%", "16.1%", "2%"],
              body: [
                [
                  {
                    text: `TIPO DE EXAMEN MEDICO OCUPACIONAL ${
                      this.dato_9520.rehusa_exa_medico == "N" ? "" : "- REHUSA Examen Medico"
                    }`,
                    bold: true,
                    style: "center8BoldT",
                    colSpan: 12,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  { text: "PRE INGRESO" },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == 1) },
                  { text: "PERIODICO" },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == 5) },
                  { text: "EGRESO" },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == 6) },
                  { text: "REUBICACIÓN" },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == 8) },
                  { text: "VALORACIÓN MEDICA" },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == 9) },
                  { text: "CAMBIO DE CARGO" },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == 4) },
                ],
                [
                  { text: "BRIGADISTA", marginTop: this.mTop },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == "A"), marginTop: this.mTop },
                  { text: "POST INCAPACIDAD", marginTop: this.mTop },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == 3), marginTop: this.mTop },
                  { text: "PRE VACACIONAL", marginTop: this.mTop },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == "B"), marginTop: this.mTop },
                  { text: "POST VACACIONAL", marginTop: this.mTop },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == "C"), marginTop: this.mTop },
                  { text: "REINTEGRO LABORAL", marginTop: this.mTop },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == 2), marginTop: this.mTop },
                  { text: "OTRO", marginTop: this.mTop },
                  { stack: this.cuadroCanvas(this.dato_9520.tipo_motiv == 7), marginTop: this.mTop },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i) {
                return [1, 3].includes(i) ? 1 : 0;
              },
              vLineWidth: function (i) {
                return i == 0 || i == 12 ? 1 : 0;
              },
            },
            width: "90%",
          },
          // CUARTO BLOQUE
          {
            style: "left75",
            table: {
              widths: ["22%", "2%", "12%", "2%", "13%", "2%", "10%", "2%", "15%", "2%", "16.1%", "2%"],
              body: [
                [
                  {
                    text: "TIPO DE EXAMEN MEDICO OCUPACIONAL - REHUSA Examen Medico",
                    bold: true,
                    style: "center8BoldT",
                    colSpan: 12,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  { text: "Examen Medico Ocupacional" },
                  { stack: this.cuadroCanvasLetter(true) },
                  { text: "Optometria" },
                  { stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.optometria_ing == "S") },
                  { text: "Audiometria" },
                  { stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.audiometria_ing == "S") },
                  { text: "Espirometria" },
                  { stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.espirometria_ing == "S") },
                  { text: "Osteomuscular" },
                  { stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.anex_osteo_ing == "S") },
                  { text: "Cardiovascular" },
                  { stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.anex_cardio_ing == "S") },
                ],
                [
                  { text: "Alturas", marginTop: this.mTop },
                  {
                    stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.anex_altu_ing == "S"),
                    marginTop: this.mTop,
                  },
                  { text: "Laboratorios", marginTop: this.mTop },
                  {
                    stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.laboratorios_ing == "S"),
                    marginTop: this.mTop,
                  },
                  { text: "Cuadro Hematico", marginTop: this.mTop },
                  {
                    stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.cuadro_hematico == "S"),
                    marginTop: this.mTop,
                  },
                  { text: "Glicemia", marginTop: this.mTop },
                  { stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.glicemia == "S"), marginTop: this.mTop },
                  { text: "Parcial de Orina", marginTop: this.mTop },
                  {
                    stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.parcial_orina == "S"),
                    marginTop: this.mTop,
                  },
                  { text: "Perfil Lipidico", marginTop: this.mTop },
                  {
                    stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.perfil_lipidico == "S"),
                    marginTop: this.mTop,
                  },
                ],
                [
                  { text: "Alcohol en saliva", marginTop: this.mTop },
                  {
                    stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.alcohol_saliva == "S"),
                    marginTop: this.mTop,
                  },
                  { text: "Marihu. en orina", marginTop: this.mTop },
                  {
                    stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.marihuana_orina == "S"),
                    marginTop: this.mTop,
                  },
                  { text: "Cocaina en orina", marginTop: this.mTop },
                  {
                    stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.cocaina_orina == "S"),
                    marginTop: this.mTop,
                  },
                  { text: "Creatinina", marginTop: this.mTop },
                  {
                    stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.creatinina == "S"),
                    marginTop: this.mTop,
                  },
                  { text: "Psicologia", marginTop: this.mTop },
                  {
                    stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.psicologia_ing == "S"),
                    marginTop: this.mTop,
                  },
                  { text: "Manip. de alimentos", marginTop: this.mTop },
                  {
                    stack: this.cuadroCanvasLetter(this.dato_9520.examenes_ingreso.manipu_alimen_ing == "S"),
                    marginTop: this.mTop,
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    stack: [
                      {
                        columns: [
                          { text: `Otros Examenes:  1. ${this.dato_9520.paraclin.otros_1}`, width: "83%" },
                          { stack: this.cuadroCanvas(this.dato_9520.paraclin.otros_1.trim()) },
                        ],
                      },
                      { canvas: [{ type: "line", x1: 60, x2: 150, y1: 0, y2: 0 }] },
                    ],
                    colSpan: 4,
                  },
                  {},
                  {},
                  {},
                  {
                    marginTop: this.mTop,
                    stack: [
                      {
                        columns: [
                          { text: `2. ${this.dato_9520.paraclin.otros_2.trim()}`, width: "73%" },
                          { stack: this.cuadroCanvas(this.dato_9520.paraclin.otros_2.trim()) },
                        ],
                      },
                      { canvas: [{ type: "line", x1: 0, x2: 95, y1: 0, y2: 0 }] },
                    ],
                    colSpan: 4,
                  },
                  {},
                  {},
                  {},
                  {
                    marginTop: this.mTop,
                    stack: [
                      {
                        columns: [
                          { text: `3. ${this.dato_9520.paraclin.otros_3.trim()}`, width: "60%" },
                          { stack: this.cuadroCanvas(this.dato_9520.paraclin.otros_3.trim()) },
                        ],
                      },
                      { canvas: [{ type: "line", x1: 0, x2: 95, y1: 0, y2: 0 }] },
                    ],
                    colSpan: 4,
                  },
                  {},
                  {},
                  {},
                ],
              ],
            },
            layout: {
              hLineWidth: function (i) {
                return [1, 5].includes(i) ? 1 : 0;
              },
              vLineWidth: function (i) {
                return i == 0 || i == 12 ? 1 : 0;
              },
            },
            width: "90%",
          },
          // QUINTO BLOQUE
          {
            style: "left75",
            table: {
              widths: ["50%", "50%"],
              body: [
                [{ text: "DIAGNOSTICOS", bold: true, style: "left8BoldT", colSpan: 2 }, {}],
                [{ stack: this.llenarDiagnosticos(1) }, { stack: this.llenarDiagnosticos(2) }],
              ],
            },
            layout: {
              hLineWidth: function (i) {
                return [1, 2].includes(i) ? 1 : 0;
              },
              vLineWidth: function (i) {
                return [0, 2].includes(i) ? 1 : 0;
              },
            },
            width: "90%",
          },
          // QUINTO BLOQUE
          {
            style: "left75",
            table: {
              widths: ["50%", "50%"],
              body: [
                [{ text: "EXAMEN PERIODICO", bold: true, style: "left8BoldT", colSpan: 2 }, {}],
                [
                  {
                    columns: [
                      { text: "Continua en su Cargo", width: "60%" },
                      { text: "SI", width: "5%" },
                      { stack: this.cuadroCanvas(this.dato_9520.ex_per_cont_cargo == "S"), width: "10%" },
                      { text: "NO", width: "7%" },
                      { stack: this.cuadroCanvas(this.dato_9520.ex_per_cont_cargo == "N"), width: "5%" },
                    ],
                  },
                  {
                    columns: [
                      { text: "Debe ser reubicado", width: "60%" },
                      { text: "SI", width: "5%" },
                      { stack: this.cuadroCanvas(this.dato_9520.ex_per_reubicado == "S"), width: "10%" },
                      { text: "NO", width: "7%" },
                      { stack: this.cuadroCanvas(this.dato_9520.ex_per_reubicado == "N"), width: "5%" },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Se envia a su EPS para su valoración", width: "60%" },
                      { text: "SI", width: "5%" },
                      { stack: this.cuadroCanvas(this.dato_9520.ex_per_envia_eps == "S"), width: "10%" },
                      { text: "NO", width: "7%" },
                      { stack: this.cuadroCanvas(this.dato_9520.ex_per_envia_eps == "N"), width: "5%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Se envia a su ARP para seguimiento de caso", width: "60%" },
                      { text: "SI", width: "5%" },
                      { stack: this.cuadroCanvas(this.dato_9520.ex_per_envia_arp == "S"), width: "10%" },
                      { text: "NO", width: "7%" },
                      { stack: this.cuadroCanvas(this.dato_9520.ex_per_envia_arp == "N"), width: "5%" },
                    ],
                  },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i) {
                return [1, 3].includes(i) ? 1 : 0;
              },
              vLineWidth: function (i) {
                return [0, 2].includes(i) ? 1 : 0;
              },
            },
            width: "90%",
          },
          // SEXTO BLOQUE
          {
            style: "left75",
            table: {
              widths: ["33%", "33%", "34%"],
              body: [
                [
                  { text: "EXAMEN DE RETIRO", bold: true, style: "left8BoldT", colSpan: 2 },
                  {},
                  { text: "Debe ser valorado:", bold: true, style: "left8BoldT" },
                ],
                [
                  {
                    columns: [
                      { text: "Enfermedad comun", width: "50%" },
                      { text: "SI", width: "10%" },
                      { stack: this.cuadroCanvas(this.dato_9520.salida.enfermedad_comun == "S"), width: "13%" },
                      { text: "NO", width: "12%" },
                      { stack: this.cuadroCanvas(this.dato_9520.salida.enfermedad_comun == "N"), width: "13%" },
                    ],
                  },
                  {
                    columns: [
                      { text: "Estudio de E.P", width: "50%" },
                      { text: "SI", width: "10%" },
                      { stack: this.cuadroCanvas(this.dato_9520.salida.estudio_ep == "S"), width: "13%" },
                      { text: "NO", width: "12%" },
                      { stack: this.cuadroCanvas(this.dato_9520.salida.estudio_ep == "N"), width: "13%" },
                    ],
                  },
                  {
                    columns: [
                      { text: "Estudio de A.T.E.P", width: "50%" },
                      { text: "SI", width: "10%" },
                      { stack: this.cuadroCanvas(this.dato_9520.salida.estudio_atep == "S"), width: "13%" },
                      { text: "NO", width: "12%" },
                      { stack: this.cuadroCanvas(this.dato_9520.salida.estudio_atep == "N"), width: "13%" },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Ingreso al P.V.E", width: "50%" },
                      { text: "SI", width: "10%" },
                      { stack: this.cuadroCanvas(this.dato_9520.variables_comunes.ingreso_pve == "S"), width: "13%" },
                      { text: "NO", width: "12%" },
                      { stack: this.cuadroCanvas(this.dato_9520.variables_comunes.ingreso_pve == "N"), width: "13%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Cúal:", width: "8%" },
                      { text: this.dato_9520.variables_comunes.cual_salida, width: "92%" },
                    ],
                    colSpan: 2,
                  },
                  {},
                ],
              ],
            },
            layout: {
              hLineWidth: function (i) {
                return [1, 3].includes(i) ? 1 : 0;
              },
              vLineWidth: function (i) {
                return [0, 3].includes(i) ? 1 : 0;
              },
            },
            width: "90%",
          },
          // SEPTIMO BLOQUE
          {
            style: "left75",
            table: {
              widths: ["20%", "80%"],
              body: [
                [{ text: "EXAMEN REINTEGRO", bold: true, style: "left8Bold" }, { text: this.dato_9520.aplica_descrip }],
                [
                  { text: "EXAMEN PRE-INGRESO", bold: true, style: "left8Bold" },
                  { text: this.dato_9520.exam_preingreso_descrip },
                ],
                [
                  { text: "EXAMEN PERIODICO", bold: true, style: "left8Bold" },
                  { text: this.dato_9520.exam_period_descrip },
                ],
                [
                  { text: "EXAMEN EGRESO", bold: true, style: "left8Bold" },
                  { text: this.dato_9520.exam_egreso_descrip },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i) {
                return [1, 2, 3, 4].includes(i) ? 1 : 0;
              },
              vLineWidth: function (i) {
                return [0, 1, 2].includes(i) ? 1 : 0;
              },
            },
            width: "90%",
          },
          // OCTAVO BLOQUE
          {
            style: "left75",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "SE AUTORIZA AL TRABAJADOR PARA", bold: true, style: "center8BoldT" }],
                [
                  {
                    columns: [
                      { text: "APTO PARA MANIPULACIÓN DE ALIMENTOS", width: "40%" },
                      { text: "SI", width: "3%" },
                      { stack: this.cuadroCanvas(this.dato_9520.autor_alime == "S"), width: "5%" },
                      { text: "NO", width: "4%" },
                      { stack: this.cuadroCanvas(this.dato_9520.autor_alime == "N"), width: "5%" },
                      { text: "NO APLICA", width: "9%" },
                      { stack: this.cuadroCanvas(!["S", "N"].includes(this.dato_9520.autor_alime)), width: "13%" },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "APTO PARA TRABAJAR EN ESPACIOS CONFINADOS", width: "40%" },
                      { text: "SI", width: "3%" },
                      { stack: this.cuadroCanvas(this.dato_9520.autor_space_confin == "S"), width: "5%" },
                      { text: "NO", width: "4%" },
                      { stack: this.cuadroCanvas(this.dato_9520.autor_space_confin == "N"), width: "5%" },
                      { text: "NO APLICA", width: "9%" },
                      { stack: this.cuadroCanvas(!["S", "N"].includes(this.dato_9520.autor_space_confin)), width: "13%" },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "APTO PARA LABORAR EN ALTURAS", width: "40%" },
                      { text: "SI", width: "3%" },
                      { stack: this.cuadroCanvas(this.dato_9520.variables_comunes.autor_altur == "S"), width: "5%" },
                      { text: "NO", width: "4%" },
                      { stack: this.cuadroCanvas(this.dato_9520.variables_comunes.autor_altur == "N"), width: "5%" },
                      { text: "NO APLICA", width: "9%" },
                      {
                        stack: this.cuadroCanvas(!["S", "N"].includes(this.dato_9520.variables_comunes.autor_altur)),
                        width: "13%",
                      },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "APTO PARA CONDUCIR", width: "40%" },
                      { text: "SI", width: "3%" },
                      { stack: this.cuadroCanvas(this.dato_9520.autor_condu == "S"), width: "5%" },
                      { text: "NO", width: "4%" },
                      { stack: this.cuadroCanvas(this.dato_9520.autor_condu == "N"), width: "5%" },
                      { text: "NO APLICA", width: "9%" },
                      { stack: this.cuadroCanvas(!["S", "N"].includes(this.dato_9520.autor_condu)), width: "13%" },
                    ],
                  },
                ],
                [
                  {
                    marginTop: -4,
                    text: "NOTA: para trabajar en alturas es necesario previa verificacion de certificacion en alturas RESOLUCION 1409 DE 2012",
                  },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i) {
                return [1, 6].includes(i) ? 1 : 0;
              },
              vLineWidth: function (i) {
                return [0, 1].includes(i) ? 1 : 0;
              },
            },
            width: "90%",
          },
          // NOVENO BLOQUE
          {
            style: "left75",
            table: {
              widths: ["20%", "60%", "10%", "10%"],
              body: [
                [{ text: "TIPO DE RESTRICCIONES", style: "center8BoldT", colSpan: 4 }, {}, {}, {}],
                [
                  { text: "Tipo de restricción", style: "left8Bold" },
                  { text: "Condiciones, factores, funciones o agentes de riesgo asociados", style: "left8Bold" },
                  { text: "Temporal", style: "center8Bold" },
                  { text: "Permanente", style: "center8Bold" },
                ],
                [
                  { text: this.dato_9520.limit[0].cual },
                  { text: this.dato_9520.limit[0].func },
                  { text: this.dato_9520.limit[0].grav == "T" ? "X" : "", style: "center75" },
                  { text: this.dato_9520.limit[0].grav == "P" ? "X" : "", style: "center75" },
                ],
                [
                  { text: this.dato_9520.limit[1].cual, marginTop: this.mTop },
                  {
                    text: this.dato_9520.limit[1].func,
                    marginTop: this.mTop,
                  },
                  { text: this.dato_9520.limit[1].grav == "T" ? "X" : "", style: "center75", marginTop: this.mTop },
                  { text: this.dato_9520.limit[1].grav == "P" ? "X" : "", style: "center75", marginTop: this.mTop },
                ],
                [
                  { text: this.dato_9520.limit[2].cual, marginTop: this.mTop },
                  {
                    text: this.dato_9520.limit[2].func,
                    marginTop: this.mTop,
                  },
                  { text: this.dato_9520.limit[2].grav == "T" ? "X" : "", style: "center75", marginTop: this.mTop },
                  { text: this.dato_9520.limit[2].grav == "P" ? "X" : "", style: "center75", marginTop: this.mTop },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i) {
                return [1, 2, 5].includes(i) ? 1 : 0;
              },
              vLineWidth: function (i) {
                return [0, 1, 2, 3, 4].includes(i) ? 1 : 0;
              },
            },
            width: "90%",
          },
          // SEXTO BLOQUE
          {
            style: "left75",
            table: {
              widths: ["26%", "34%", "40%"],
              body: [
                [{ text: "RECOMENDACIONES", bold: true, style: "center8BoldT", colSpan: 3 }, {}, {}],
                [
                  {
                    columns: [{ text: "1. Uso de EPP", width: "100%", alignment: "center", bold: true }],
                  },
                  {
                    columns: [{ text: "2. Cambios estilo de vida", width: "100%", alignment: "center", bold: true }],
                  },
                  {
                    columns: [{ text: "3. Capacitación", width: "100%", alignment: "center", bold: true }],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Uso bota puntera de acero", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.uso_epp.uso_bota_acero == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Gimnasia laboral", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.variables_comunes.estilo_fisi == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Capacitar trabajos en alturas y/o espacios confinados", width: "90%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.capacitacion.altura_confinado == "S"), width: "10%" },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Uso zapato de goma", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.uso_epp.uso_zapato_goma == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Higiene postural", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recom_postur == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Inducción puesto de trabajo", width: "90%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.capacitacion.induc_sitio_trabaj == "S"), width: "10%" },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Uso camisa manga larga", width: "85%" },
                      {
                        stack: this.cuadroCanvas(this.dato_9520.recomend.uso_epp.uso_camisa_manga_larga == "S"),
                        width: "15%",
                      },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Dieta sin grasa", width: "35%" },
                      {
                        stack: this.cuadroCanvas(this.dato_9520.recomend.estilo_vida.dieta_grasa_azucar == "S"),
                        width: "15%",
                      },
                      { text: "Dieta sin azucar", width: "35%" },
                      {
                        stack: this.cuadroCanvas(
                          this.dato_9520.recomend.estilo_vida.dieta_azucar == "S" ||
                            (this.dato_9520.recomend.estilo_vida.dieta_grasa_azucar == "S" &&
                              this.dato_9520.recomend.estilo_vida.dieta_azucar != "N")
                        ),
                        width: "15%",
                      },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Pausas activas c/2h", width: "90%" },
                      {
                        stack: this.cuadroCanvas(this.dato_9520.recomend.capacitacion.pausas_cada_2_horas == "S"),
                        width: "10%",
                      },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Uso de casco / confia", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.uso_epp.uso_casco_cofia == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Bajar de peso", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.variables_comunes.estilo_peso == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Adecuada manipulación de cargas hasta 5-10-15-20 KL", width: "90%" },
                      {
                        stack: this.cuadroCanvas(this.dato_9520.recomend.capacitacion.carga_5_10_15_20_kl == "S"),
                        width: "10%",
                      },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Protección auditiva doble", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.uso_epp.uso_protec_audi == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Suprimir cigarrillo", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.variables_comunes.estilo_fuma == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "S.S RX Torax", width: "90%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.capacitacion.ss_rx_torax == "S"), width: "10%" },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Protección solar FP 100", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.uso_epp.uso_protec_sol == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Reducir consumo de alcohol", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.estilo_vida.menos_alcohol == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "S.S RX C.L.S", width: "90%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.capacitacion.ss_rx_cls == "S"), width: "10%" },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Uso gafas de protección", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.uso_epp.uso_gafas_protec == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Uso medidas anti varices", width: "85%" },
                      {
                        stack: this.cuadroCanvas(this.dato_9520.recomend.estilo_vida.medias_antivarices == "S"),
                        width: "15%",
                      },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "EMG+VMC MM SS", width: "90%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.capacitacion.emg_vmc_mm_ss == "S"), width: "10%" },
                    ],
                  },
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Uso protección respiratoria", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.uso_epp.uso_protec_resp == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Control TA", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recomend.estilo_vida.control_ta == "S"), width: "15%" },
                    ],
                  },
                  {},
                ],
                [
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Utilizar ayudas ergonomicas", width: "85%" },
                      { stack: this.cuadroCanvas(this.dato_9520.recom_ergon == "S"), width: "15%" },
                    ],
                  },
                  {
                    marginTop: this.mTop,
                    columns: [
                      { text: "Control periodico ocupacional", width: "85%" },
                      {
                        stack: this.cuadroCanvas(this.dato_9520.recomend.estilo_vida.control_periodico == "S"),
                        width: "15%",
                      },
                    ],
                  },
                  {},
                ],
                [
                  {
                    marginTop: this.mTop,
                    text: this.dato_9520.paraclin.observ_parac.replace(/\&/g, "\n"),
                    colSpan: 3,
                    alignment: "justify",
                  },
                  {},
                  {},
                ],
              ],
            },
            layout: {
              hLineWidth: function (i) {
                return [1, 13].includes(i) ? 1 : 0;
              },
              vLineWidth: function (i) {
                return [0, 3].includes(i) ? 1 : 0;
              },
            },
            width: "90%",
          },
          // ULTIMO BLOQUE
          {
            style: "left75",
            table: {
              widths: ["40%", "5%", "55%"],
              body: [
                [
                  {
                    text: "CONSENTIMIENTO INFORMADO DEL ASPIRANTE O TRABAJADOR: Autorizo al (a la) doctor(a) abajo mencionado(a), a realizar en mi el examen medico y/o paraclinico(s) ocupacional(es), registrado(s) en este documento.El(la) doctor(a) abajo mencionado(a) me ha explicado la naturaleza y proposito del examen medico y/o paraclinico(s) ocupacional(es), He comprendido y he tenido la oportunidad de analizar el proposito, los beneficios, la interpretacion, las limitaciones y riesgos del examen medico y/o paraclinico(s) ocupacional(es), a partir de la asesoria brindada antes de la respectiva toma de pruebas. Entiendo que la realizacion de esta(s) prueba(s) es voluntaria y que tuve la oportunidad de retirar mi consentimiento en cualquier momento antes de que se realizara el(los) examen(es). Fui informado de las medidas que tomara Salud Ocupacional de IPS SAN FERNANDO SAS para proteger la confidencialidad de mis resultados. Las respuesta dadas por mi en este(os) estan completas y son veridicas. Autorizo a Salud Ocupacional de IPS SAN FERNANDO SAS para que suministre a las personas o entidades contempladas en la legislacion vigente, la informacion registrada en este documento, para el buen cumplimiento del Programa de Salud Ocupacional de IPS SAN FERNANDO SAS y para las situaciones Finalmente manifiesto que he leido y comprendido perfectamente lo anterior y que todos los espacios en blanco han sido completados antes de mi firma y que me encuentro en capacidad de expresar mi consentimiento.",
                    colSpan: 3,
                    alignment: "justify",
                    fontSize: 5.5,
                  },
                  {},
                  {},
                ],
                [
                  {
                    marginTop: 20,
                    stack: [
                      { canvas: [{ type: "line", x1: 0, x2: 100, y1: 0, y2: 0 }], marginBottom: 3 },
                      { text: "FIRMA Y SELLO MÉDICO" },
                      { text: this.hcprc.descrip_med },
                      { text: `REGISTRO: ${this.hcprc.reg_med}` },
                    ],
                    alignment: "center",
                    fontSize: 6,
                  },
                  {},
                  {
                    marginTop: 20,
                    stack: [
                      { canvas: [{ type: "line", x1: 0, x2: 100, y1: 0, y2: 0 }], marginBottom: 3 },
                      {
                        text: `TRABAJADOR: ${this.paci["NOM-PACI1"]} ${this.paci["NOM-PACI2"]} ${this.paci["APELL-PACI1"]} ${this.paci["APELL-PACI2"]}`,
                      },
                      { text: `C.C: ${this.cod_paci}` },
                    ],
                    alignment: "center",
                    fontSize: 6,
                  },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i) {
                return [2].includes(i) ? 1 : 0;
              },
              vLineWidth: function (i) {
                return [0, 3].includes(i) ? 1 : 0;
              },
            },
            width: "90%",
          },
        ],
      },
    ];
  }

  cuadroCanvas(condicion) {
    return [
      {
        canvas: [{ type: "rect", x: 0, y: 0, h: this.h_rect, w: this.w_rect, r: 0, color: "white", lineColor: "#000" }],
      },
      {
        canvas: condicion
          ? [
              { type: "line", x1: 0, x2: this.w_rect, y1: -this.h_rect, y2: -0 },
              { type: "line", x1: this.w_rect, x2: 0, y1: -this.h_rect, y2: -0 },
            ]
          : [],
      },
    ];
  }

  cuadroCanvasLetter(condicion) {
    return [
      {
        canvas: [{ type: "rect", x: 0, y: 0, h: this.h_rect, w: this.w_rect, r: 0, color: "white", lineColor: "#000" }],
      },
      { text: condicion ? "SI" : "NO", margin: condicion ? [1.3, -7.5, 0, 0] : [-0.7, -7.5, 0, 0], fontSize: 6.5 },
    ];
  }

  llenarDiagnosticos(col) {
    let col1 = [],
      col2 = [];
    if (col == 1) {
      for (let i = 0; i < 5; i++) {
        col1.push({
          text: `${this.hcprc.rips.tabla_diagn[i].cod_diagn} - ${this.hcprc.rips.tabla_diagn[i].descrip_diagn}`,
        });
      }
    } else {
      for (let i = 5; i < 10; i++) {
        col2.push({
          text: `${this.hcprc.rips.tabla_diagn[i].cod_diagn} - ${this.hcprc.rips.tabla_diagn[i].descrip_diagn}`,
        });
      }
    }

    return col == 1 ? col1 : col2;
  }
}

const imprimir_OCUP010 = (params) => {
  var formato = new formato_OCUP010(params);
  formato._init();
};

module.exports = {
  imprimir_OCUP010,
};
