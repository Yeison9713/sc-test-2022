/** @format */

class formato_HCI8051B {
  constructor(params) {
    this.hcprc = params.hcprc;
    this.detalles = params.detalles;
    this.paci = params.paci;
    this.datos = {};
    this.w_rect = 12;
    this.h_rect = 9;
    this.dato_8051 = {};
  }

  _init() {
    this.leer_historia();
  }

  leer_historia() {
    if (this.hcprc.novedad != 8) {
      CON851("", "08", null, "error", "Error");
    } else {
      this.leer_detalles();
    }
  }

  leer_detalles() {
    this.dato_8051 = this.detalles.find((e) => e["COD-DETHC"] == "8051" && e["LLAVE-HC"] == this.hcprc.llave);
    if (this.dato_8051) this.dato_8051 = this.dato_8051.DETALLE;

    this.reemplazar_pantalla();
  }

  reemplazar_pantalla() {
    this.datos = {
      ...this.dato_8051,
    };

    this.cerrar_archivos();
  }

  async cerrar_archivos() {
    this._imprimir()
      .then(() => {
        console.log("HCI8051B termina");
      })
      .catch((error) => {
        console.error(error);
        CON851("", "Error en impresion 8051B", null, "error", "Error");
      });
  }

  _imprimir() {
    console.log(this.datos)

    return new Promise((resolve) => {
      formatoBaseImp_Hc.content[0].stack.push({
        margin: [0, 5, 0, 0],
        stack: [
          {
            stack: this.llenarFormato(),
          },
        ],
      });

      resolve();
    });
  }

  llenarFormato() {
    var content = [
      {
        marginTop: -5,
        width: "100%",
        stack: [
          {
            pageBreak: 'before',
            marginTop: 5,
            style: "center8",
            table: {
              widths: ["23%", "9%", "49%", "12%", "7%"],
              body: [
                [
                  {
                    text: "CLAP/SRM-OPS/OMS HdA-FORMULARIO COMPLEMENTARIO DE SALUD SEXUAL Y REPRODUCTIVA",
                    style: "left10BoldT",
                    colSpan: 5,
                  },
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    style: "left7",
                    stack: [{ text: "H.C" }, { text: this.hcprc.llave }],
                  },
                  {
                    style: "left7",
                    stack: [{ text: "FECHA" }, { text: _editFecha2(this.hcprc.fecha) }],
                  },
                  {
                    style: "left7",
                    stack: [{ text: "APELLIDOS Y NOMBRES" }, { text: this.paci.DESCRIP.replace(/\s+/g, " ") }],
                  },
                  {
                    style: "center7",
                    stack: [
                      { text: "SEXO" },
                      {
                        columns: [
                          { text: "M", width: "20%" },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.paci.SEXO == "M"),
                          },
                          { text: "F", width: "20%" },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.paci.SEXO == "F"),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      { text: "EDAD" },
                      { text: _getEdad_impHc(this.hcprc.unid_edad, this.hcprc.vlr_edad) },
                    ],
                  },
                ],
              ],
            },
          },
          {
            style: "center7",
            table: {
              widths: ["13.5%", "40%"],
              body: [
                [
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [{ text: "TELEFONO" }, { text: this.paci.TELEFONO }],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "ESTADO CIVIL", width: "38%" },
                          {
                            stack: this.cuadro_canvas(this.paci["EST-CIV"] == "S"),
                            width: "8%",
                          },
                          { text: "SOLTERO/A", width: "25%" },
                          {
                            stack: this.cuadro_canvas(this.paci["EST-CIV"] == "V"),
                            width: "8%",
                          },
                          { text: "VIUDO", width: "21%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.paci["EST-CIV"] == "U"),
                            width: "8%",
                          },
                          { text: "UNION ESTABLE", width: "30%" },
                          {
                            stack: this.cuadro_canvas(this.paci["EST-CIV"] == "C"),
                            width: "8%",
                          },
                          { text: "CASADO/A", width: "25%" },
                          {
                            stack: this.cuadro_canvas(this.paci["EST-CIV"] == "D"),
                            width: "8%",
                          },
                          { text: "SEPARADO", width: "21%" },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            marginTop: 5,
            style: "center8",
            table: {
              widths: ["27%", "23%", "27%", "23%"],
              body: [
                [{ text: "ITS", style: "left10BoldT", colSpan: 4 }, {}, {}, {}],
                [
                  {
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "CONOCE ALGUNA?", width: "50%" },
                          { text: "SI" },
                          { stack: this.cuadro_canvas(this.datos.its.conoce == "S") },
                          { text: "NO" },
                          { stack: this.cuadro_canvas(this.datos.its.conoce == "N") },
                        ],
                      },
                      {
                        marginTop: 2,
                        fontSize: 6,
                        text: [{ text: "CUALES?  " }, { text: this.datos.its.cuales_conoce }],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "TIENE ALGUNA?", width: "50%" },
                          { text: "SI" },
                          { stack: this.cuadro_canvas(this.datos.gineco_urologico.gine_its == "S") },
                          { text: "NO" },
                          { stack: this.cuadro_canvas(this.datos.gineco_urologico.gine_its == "N") },
                        ],
                      },
                      {
                        marginTop: 2,
                        fontSize: 6,
                        text: [{ text: "CUAL?  " }, { text: this.datos.gineco_urologico.its_cual }],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "HA TENIDO ALGUNA?", width: "50%" },
                          { text: "SI" },
                          { stack: this.cuadro_canvas(this.datos.its.tenido_its == "S") },
                          { text: "NO" },
                          { stack: this.cuadro_canvas(this.datos.its.tenido_its == "N") },
                        ],
                      },
                      {
                        marginTop: 2,
                        fontSize: 6,
                        text: [{ text: "CUAL?  " }, { text: this.datos.its.cual_tenido }],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "TRATAMIENTO", width: "50%" },
                          { text: "SI" },
                          { stack: this.cuadro_canvas(this.datos.its.trata_its == "S") },
                          { text: "NO" },
                          { stack: this.cuadro_canvas(this.datos.its.trata_its == "N") },
                        ],
                      },
                      {
                        marginTop: 2,
                        fontSize: 6,
                        text: [{ text: "CUAL?  " }, { text: this.datos.its.cual_trata_its }],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            style: "center7",
            table: {
              widths: ["33%", "33%", "34%"],
              body: [
                [
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          {
                            stack: [
                              {
                                columns: [
                                  { text: "PAREJA ACTUAL TIENE ALGUNA?", width: "75%" },
                                  { text: "SI", width: "7%" },
                                  { stack: this.cuadro_canvas(this.datos.its.pareja_its == "S"), width: "7%" },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  {
                                    width: "75%",
                                    fontSize: 6,
                                    text: [{ text: "CUAL?  " }, { text: this.datos.its.cual_pareja_its }],
                                  },
                                  { text: "NO", width: "7%" },
                                  { stack: this.cuadro_canvas(this.datos.its.pareja_its == "N"), width: "7%" },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          {
                            stack: [
                              {
                                columns: [
                                  { text: "PAREJA ACTUAL HA TENIDO ALGUNA?", width: "75%" },
                                  { text: "SI", width: "7%" },
                                  { stack: this.cuadro_canvas(this.datos.its.pareja_tenido_its == "S"), width: "7%" },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  {
                                    width: "75%",
                                    fontSize: 6,
                                    text: [{ text: "CUAL?  " }, { text: this.datos.its.pareja_cual_tenido_its }],
                                  },
                                  { text: "NO", width: "7%" },
                                  { stack: this.cuadro_canvas(this.datos.its.pareja_tenido_its == "N"), width: "7%" },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          {
                            stack: [
                              {
                                columns: [
                                  { text: "PAREJA ACTUAL TRATAMIENTO?", width: "75%" },
                                  { text: "SI", width: "7%" },
                                  { stack: this.cuadro_canvas(this.datos.its.trata_pareja_its == "S"), width: "7%" },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  {
                                    width: "75%",
                                    fontSize: 6,
                                    text: [{ text: "CUAL?  " }, { text: this.datos.its.cual_trata_pareja_its }],
                                  },
                                  { text: "NO", width: "7%" },
                                  { stack: this.cuadro_canvas(this.datos.its.trata_pareja_its == "N"), width: "7%" },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            marginTop: 3,
            stack: [
              { text: "OBSERVACIONES", style: "left8Bold" },
              {
                text: this.datos.its.observacion_its,
                style: "left8",
              },
            ],
          },
          {
            marginTop: 5,
            style: "center8",
            table: {
              widths: ["25%", "47%", "28%"],
              body: [
                [{ text: "EXAMEN FISICO GENITO - URINARIO", style: "left10BoldT", colSpan: 3 }, {}, {}],
                [
                  {
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "PATRON DE VELLO CORPORAL", width: "55%", style: "center7", marginTop: 2 },
                          {
                            stack: [
                              {
                                columns: [
                                  { stack: this.cuadro_canvas(this.datos.examen_fisico2.patron_vello == "N"), width: "30%" },
                                  { text: "NORMAL", width: "70%" },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  { stack: this.cuadro_canvas(this.datos.examen_fisico2.patron_vello == "A"), width: "30%" },
                                  { text: "ANORMAL", width: "70%" },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "FLUJO VAGINAL", width: "15%", style: "left7", marginTop: 2 },
                          {
                            width: "25%",
                            columns: [
                              { text: "ANTES", width: "42%", style: "left7", marginTop: 6 },
                              {
                                width: "58%",
                                stack: [
                                  {
                                    columns: [
                                      { text: "SI", width: "40%" },
                                      {
                                        stack: this.cuadro_canvas(this.datos.genito_urinario.flu_vag_ant == "S"),
                                        width: "60%",
                                      },
                                    ],
                                  },
                                  {
                                    marginTop: 3,
                                    columns: [
                                      { text: "NO", width: "40%" },
                                      {
                                        stack: this.cuadro_canvas(this.datos.genito_urinario.flu_vag_ant == "N"),
                                        width: "60%",
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            // marginLeft: 5,
                            width: "25%",
                            columns: [
                              { text: "OLOR", width: "42%", style: "left7", marginTop: 6 },
                              {
                                width: "58%",
                                stack: [
                                  {
                                    columns: [
                                      { text: "SI", width: "40%" },
                                      {
                                        stack: this.cuadro_canvas(this.datos.genito_urinario.flu_vag_olor == "S"),
                                        width: "60%",
                                      },
                                    ],
                                  },
                                  {
                                    marginTop: 3,
                                    columns: [
                                      { text: "NO", width: "40%" },
                                      {
                                        stack: this.cuadro_canvas(this.datos.genito_urinario.flu_vag_olor == "N"),
                                        width: "60%",
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            width: "35%",
                            stack: [
                              { text: "COLOR" },
                              { text: this.datos.genito_urinario.flu_color_vag, marginTop: 5 },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "ACTUAL", width: "25%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.flujo_act == 2),
                            width: "10%",
                          },
                          { text: "ESCASO", width: "25%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.flujo_act == 4),
                            width: "10%",
                          },
                          { text: "ABUNDANTE", width: "30%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.flujo_act == 1),
                            width: "10%",
                          },
                          { text: "NO", width: "15%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.flujo_act == 3),
                            width: "10%",
                          },
                          { text: "REGULAR", width: "25%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.flujo_act == 5),
                            width: "10%",
                          },
                          { text: "N/C", width: "30%" },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            style: "center8",
            table: {
              widths: ["7%", "20%", "20%", "53%"],
              body: [
                [
                  {
                    border: [true, false, true, true],
                    style: "center7",
                    stack: [
                      { text: "DURACIÓN", width: "55%" },
                      {
                        columns: [
                          { text: this.datos.genito_urinario.flujo_duracion, width: "50%", decoration: "underline" },
                          { text: "DIAS", width: "50%" },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "MOLESTIAS", width: "50%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.flujo_molestia == 2),
                            width: "17%",
                          },
                          { text: "PRURITO", width: "33%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.flujo_molestia == 1),
                            width: "17%",
                          },
                          { text: "NO", width: "33%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.flujo_molestia == 3),
                            width: "17%",
                          },
                          { text: "ARDOR", width: "33%" },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "TRATAMIENTO", width: "58%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.flujo_tratar == 2),
                            width: "17%",
                          },
                          { text: "NO", width: "33%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.flujo_tratar == 1),
                            width: "17%",
                          },
                          { text: "SI", width: "41%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.flujo_tratar == 3),
                            width: "17%",
                          },
                          { text: "N/C", width: "33%" },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "SECRECIÓN URETRAL", width: "15%", style: "left7", marginTop: 2 },
                          {
                            width: "25%",
                            columns: [
                              { text: "ANTES", width: "42%", style: "left7", marginTop: 6 },
                              {
                                width: "58%",
                                stack: [
                                  {
                                    columns: [
                                      { text: "SI", width: "40%" },
                                      {
                                        stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_ant == "S"),
                                        width: "60%",
                                      },
                                    ],
                                  },
                                  {
                                    marginTop: 3,
                                    columns: [
                                      { text: "NO", width: "40%" },
                                      {
                                        stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_ant == "N"),
                                        width: "60%",
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            width: "25%",
                            columns: [
                              { text: "OLOR", width: "42%", style: "left7", marginTop: 6 },
                              {
                                width: "58%",
                                stack: [
                                  {
                                    columns: [
                                      { text: "SI", width: "40%" },
                                      {
                                        stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_olor == "S"),
                                        width: "60%",
                                      },
                                    ],
                                  },
                                  {
                                    marginTop: 3,
                                    columns: [
                                      { text: "NO", width: "40%" },
                                      {
                                        stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_olor == "N"),
                                        width: "60%",
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            width: "35%",
                            stack: [
                              { text: "COLOR" },
                              { text: this.datos.genito_urinario.secre_ure_color, marginTop: 5 },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            style: "center8",
            table: {
              widths: ["30%", "7%", "20%", "20%"],
              body: [
                [
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "ACTUAL", width: "25%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_act == 2),
                            width: "10%",
                          },
                          { text: "ESCASO", width: "25%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_act == 4),
                            width: "10%",
                          },
                          { text: "ABUNDANTE", width: "30%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_act == 1),
                            width: "10%",
                          },
                          { text: "NO", width: "15%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_act == 3),
                            width: "10%",
                          },
                          { text: "REGULAR", width: "25%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_act == 5),
                            width: "10%",
                          },
                          { text: "N/C", width: "30%" },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "center7",
                    stack: [
                      { text: "DURACIÓN", width: "55%" },
                      {
                        columns: [
                          {
                            text: this.datos.genito_urinario.secre_ure_duracion,
                            width: "50%",
                            decoration: "underline",
                          },
                          { text: "DIAS", width: "50%" },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "MOLESTIAS", width: "50%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_molestia == 2),
                            width: "17%",
                          },
                          { text: "PRURITO", width: "33%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_molestia == 1),
                            width: "17%",
                          },
                          { text: "NO", width: "33%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_molestia == 3),
                            width: "17%",
                          },
                          { text: "ARDOR", width: "33%" },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "TRATAMIENTO", width: "58%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_tratar == 2),
                            width: "17%",
                          },
                          { text: "NO", width: "33%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_tratar == 1),
                            width: "17%",
                          },
                          { text: "SI", width: "41%" },
                          {
                            stack: this.cuadro_canvas(this.datos.genito_urinario.secre_ure_tratar == 3),
                            width: "17%",
                          },
                          { text: "N/C", width: "33%" },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            marginTop: 5,
            style: "left7",
            table: {
              widths: ["10%", "10%", "10%", "10%", "10%", "13%", "13%", "24%"],
              body: [
                [{ text: "EXAMEN GINECOLOGICO", style: "left10BoldT", colSpan: 8 }, {}, {}, {}, {}, {}, {}, {}],
                [
                  {
                    stack: [
                      {
                        stack: [
                          { text: "TANNER", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                text: [1, 2, 3, 4, 5].includes(parseInt(this.datos.examen_gineco.mamas_gine))
                                  ? `S${this.datos.examen_gineco.mamas_gine}`
                                  : "",
                                width: "30%",
                                decoration: "underline",
                              },
                              { text: "MAMAS", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              {
                                text: [1, 2, 3, 4, 5].includes(parseInt(this.datos.examen_gineco.vello_gine))
                                  ? `P${this.datos.examen_gineco.vello_gine}`
                                  : "",
                                width: "30%",
                                decoration: "underline",
                              },
                              { text: "VELLO", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "VULVA", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.vulva_gine == "N"), width: "30%" },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.vulva_gine == "A"), width: "30%" },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "CLITORIS", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.clitoris_gine == "N"), width: "30%" },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.clitoris_gine == "A"), width: "30%" },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "HIMEN", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.himen_gine == "N"), width: "30%" },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.himen_gine == "A"), width: "30%" },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "VAGINA", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.vagina_gine == "N"), width: "30%" },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.vagina_gine == "A"), width: "30%" },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "CUELLO UTERINO", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.cuello_uter_gine == "N"), width: "30%" },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.cuello_uter_gine == "A"), width: "30%" },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "CUERPO UTERINO", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.cuerpo_uter_gine == "N"), width: "30%" },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.cuerpo_uter_gine == "A"), width: "30%" },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "TACTO VAGINAL", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.tacto_vag_gine == 1), width: "15%" },
                              { text: "NORMAL", width: "35%" },
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.tacto_vag_gine == 3), width: "15%" },
                              { text: "NO SE HIZO", width: "35%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.tacto_vag_gine == 2), width: "15%" },
                              { text: "ANORMAL", width: "35%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            style: "left7",
            table: {
              widths: ["9.3%", "9.3%", "14%", "20%"],
              body: [
                [
                  {
                    border: [true, false, true, true],
                    stack: [
                      {
                        stack: [
                          { text: "ANEXO IZQ.", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.anex_izq_gine == "N"), width: "30%" },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.anex_izq_gine == "A"), width: "30%" },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    stack: [
                      {
                        stack: [
                          { text: "ANEXO DER.", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.anex_der_gine == "N"), width: "30%" },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.anex_der_gine == "A"), width: "30%" },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    stack: [
                      {
                        stack: [
                          { text: "EXAMEN MAMARIO", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.examen_mama_gine == "N"), width: "30%" },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_gineco.examen_mama_gine == "A"), width: "30%" },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    stack: [
                      {
                        stack: [
                          { text: "TOMA DE MUESTRAS", style: "center7" },
                          {
                            marginTop: 3,
                            stack: [
                              { text: this.datos.examen_gineco.toma_muestra_gine.toma_muestra1_gine },
                              { text: this.datos.examen_gineco.toma_muestra_gine.toma_muestra2_gine },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            marginTop: 3,
            stack: [
              { text: "OBSERVACIONES", style: "left8Bold" },
              {
                text: this.datos.examen_gineco.observacion_ex_gineco,
                style: "left8",
              },
            ],
          },
          {
            marginTop: 5,
            style: "left7",
            table: {
              widths: ["11%", "11%", "11%", "11%", "11%", "11%", "11%", "11%", "12%"],
              body: [
                [{ text: "EXAMEN GENITAL MASCULINO", style: "left10BoldT", colSpan: 9 }, {}, {}, {}, {}, {}, {}, {}, {}],
                [
                  {
                    stack: [
                      {
                        stack: [
                          { text: "TANNER.", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                text: [1, 2, 3, 4, 5].includes(parseInt(this.datos.examen_genital_masc.genital_masc))
                                  ? `G${this.datos.examen_genital_masc.genital_masc}`
                                  : "",
                                width: "30%",
                              },
                              { text: "GENITALES", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              {
                                text: [1, 2, 3, 4, 5].includes(parseInt(this.datos.examen_genital_masc.vello_masc))
                                  ? `P${this.datos.examen_genital_masc.vello_masc}`
                                  : "",
                                width: "30%",
                              },
                              { text: "VELLO", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "PENE CUERPO", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.pene_cuerpo_masc == "N"),
                                width: "30%",
                              },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.pene_cuerpo_masc == "A"),
                                width: "30%",
                              },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "GLANDE", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_genital_masc.glande_masc == "N"), width: "30%" },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_genital_masc.glande_masc == "A"), width: "30%" },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "PREPUCIO", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.prepucio_masc == "N"),
                                width: "30%",
                              },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.prepucio_masc == "A"),
                                width: "30%",
                              },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "SECRECIÓN", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.secrecion_masc == "N"),
                                width: "30%",
                              },
                              { text: "SI", width: "40%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.secrecion_masc == "A"),
                                width: "30%",
                              },
                              { text: "NO", width: "40%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "ESCROTO", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_genital_masc.escroto_masc == "N"), width: "30%" },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { stack: this.cuadro_canvas(this.datos.examen_genital_masc.escroto_masc == "A"), width: "30%" },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "TESTICULO DER", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.testiculo_der == "N"),
                                width: "30%",
                              },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.testiculo_der == "A"),
                                width: "30%",
                              },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "TESTICULO IZQ.", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.testiculo_izq == "N"),
                                width: "30%",
                              },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.testiculo_izq == "A"),
                                width: "30%",
                              },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        stack: [
                          { text: "EXAMEN MAMARIO", width: "55%", style: "center7" },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.examen_mama_masc == "N"),
                                width: "30%",
                              },
                              { text: "NORMAL", width: "70%" },
                            ],
                          },
                          {
                            marginTop: 2,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_genital_masc.examen_mama_masc == "A"),
                                width: "30%",
                              },
                              { text: "ANORMAL", width: "70%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            marginTop: 3,
            stack: [
              { text: "OBSERVACIONES", style: "left8Bold" },
              {
                text: this.datos.examen_genital_masc.observacion_ex_genital,
                style: "left8",
              },
            ],
          },
          {
            unbreakable: true,
            marginTop: 5,
            style: "left7",
            table: {
              widths: ["25%", "25%", "25%", "25%"],
              body: [
                [{ text: "EXAMENES COMPLEMENTARIOS", style: "left10BoldT", colSpan: 4 }, {}, {}, {}],
                [
                  {
                    stack: [
                      {
                        columns: [
                          { text: "", width: "46%" },
                          { text: "", width: "27%" },
                          { text: "RESULT", width: "27%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "", width: "54%" },
                          { text: "PEDIDO", width: "25%", style: "center7" },
                          { text: "ADJUNTO", width: "25%", style: "center7" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "HEMOGRAMA", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.hemograma == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.hemograma == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "SEDIMIENTO URINARIO", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.sedimento_urin == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.sedimento_urin == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "QUIMICO DE ORINA", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.quimico_orina == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.quimico_orina == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        columns: [
                          { text: "", width: "46%" },
                          { text: "", width: "27%" },
                          { text: "RESULT", width: "27%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "", width: "54%" },
                          { text: "PEDIDO", width: "25%", style: "center7" },
                          { text: "ADJUNTO", width: "25%", style: "center7" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "UROCIT Y ANTIB/ORG", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.urocit_antib == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.urocit_antib == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "UREMIA", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.uremia == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.uremia == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "GLICEMIA", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.glicemia == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.glicemia == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        columns: [
                          { text: "", width: "46%" },
                          { text: "", width: "27%" },
                          { text: "RESULT", width: "27%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "", width: "54%" },
                          { text: "PEDIDO", width: "25%", style: "center7" },
                          { text: "ADJUNTO", width: "25%", style: "center7" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "NITROGENO UREICO", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.nitrogeno_ure == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.nitrogeno_ure == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "PERFIL LIPIDICO", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.perfil_lipidi == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.perfil_lipidi == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "VDRL U OTRO", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.vdrl_otro == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.vdrl_otro == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        columns: [
                          { text: "", width: "46%" },
                          { text: "", width: "27%" },
                          { text: "RESULT", width: "27%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "", width: "54%" },
                          { text: "PEDIDO", width: "25%", style: "center7" },
                          { text: "ADJUNTO", width: "25%", style: "center7" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "VIH", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.ex_vih == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.ex_vih == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "PAPANICOLAU", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.papanicolau == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.papanicolau == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "TEST DE SCHILLER", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.schiller == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.schiller == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            unbreakable: true,
            style: "left7",
            table: {
              widths: ["24.15%", "24.15%"],
              body: [
                [
                  {
                    border: [true, false, true, true],
                    stack: [
                      {
                        columns: [
                          { text: "", width: "46%" },
                          { text: "", width: "27%" },
                          { text: "RESULT", width: "27%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "", width: "54%" },
                          { text: "PEDIDO", width: "25%", style: "center7" },
                          { text: "ADJUNTO", width: "25%", style: "center7" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "RADIOGRAFIA", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.radiografia == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.radiografia == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "ECOGRAFIA", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.ecografia == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.ecografia == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "COLPOSCOPIA", width: "62%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.colposcopia == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.colposcopia == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    stack: [
                      {
                        columns: [
                          { text: "", width: "46%" },
                          { text: "", width: "27%" },
                          { text: "RESULT", width: "27%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "", width: "54%" },
                          { text: "PEDIDO", width: "25%", style: "center7" },
                          { text: "ADJUNTO", width: "25%", style: "center7" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "EXAMEN FLUJO VAGINAL", width: "63%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.ex_flujo_vag == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.ex_flujo_vag == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "CULTIVO FLUJO VAGINAL", width: "63%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.cultivo_flu_vag == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.cultivo_flu_vag == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "PERFIL HORMONAL", width: "63%" },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.perfil_hormonal == 1),
                            width: "25%",
                            style: "center7",
                            marginLeft: -10,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.examen_comple.perfil_hormonal == 2),
                            width: "25%",
                            style: "center7",
                            marginLeft: -20,
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            marginTop: 3,
            stack: [
              { text: "OBSERVACIONES", style: "left8Bold" },
              {
                text: this.datos.examen_comple.observacion_ex_comp,
                style: "left8",
              },
            ],
          },
        ],
      },
    ];

    return content;
  }

  cuadro_canvas(condicion) {
    return [
      { canvas: [{ type: "rect", x: 0, y: 0, h: this.h_rect, w: this.w_rect }] },
      {
        canvas: condicion
          ? [
              { type: "line", x1: 0, x2: this.w_rect, y1: -this.h_rect, y2: 0 },
              { type: "line", x1: this.w_rect, x2: 0, y1: -this.h_rect, y2: 0 },
            ]
          : [],
      },
    ];
  }
}

const imprimir_HCI8051B = function (params) {
  var formato = new formato_HCI8051B(params);
  formato._init();
};

module.exports = {
  imprimir_HCI8051B,
};
