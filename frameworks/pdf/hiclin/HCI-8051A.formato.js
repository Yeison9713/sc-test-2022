/** @format */

const { detallesHc } = require("../../../HICLIN/scripts/reg_dethc.js");

class formato_HCI8051A {
  constructor(params) {
    this.hcprc = params.hcprc;
    this.detalles = params.detalles;
    this.paci = params.paci;
    this.datos = {};
    this.w_rect = 12;
    this.h_rect = 9;
    this.dato_8051 = {};
    this.dato_2079 = {};
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

    this.dato_2079 = this.detalles.find((e) => e["COD-DETHC"] == "2079" && e["LLAVE-HC"] == this.hcprc.llave);
    if (this.dato_2079) this.dato_2079 = this.dato_2079.DETALLE;
    else this.dato_2079 = detallesHc.WS_2079();

    this.reemplazar_pantalla();
  }

  reemplazar_pantalla() {
    this.datos = {
      ...this.dato_8051,
      ...this.dato_2079,
    };

    this.frecundidad();
  }

  frecundidad() {
    this.datos.abortos_w =
      parseInt(this.datos.frecundidad.abortos.abort_esp) +
      parseInt(this.datos.frecundidad.abortos.abort_prov) +
      parseInt(this.datos.frecundidad.abortos.abort_emb_eto);

    this.datos.nacimientos_w =
      parseInt(this.datos.frecundidad.nacimientos.nac_vivos) + parseInt(this.datos.frecundidad.nacimientos.nac_muerto);

    this.datos.embarazos_w = parseInt(this.datos.abortos_w) + parseInt(this.datos.nacimientos_w);

    this.cerrar_archivos();
  }

  async cerrar_archivos() {
    this._imprimir()
      .then(() => {
        console.log("HCI8051A termina");
      })
      .catch((error) => {
        console.error(error);
        CON851("", "Error en impresion 8051A", null, "error", "Error");
      });
  }

  _imprimir() {
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
        pageBreak: "before",
        marginTop: -5,
        width: "100%",
        stack: [
          {
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
                    stack: [{ text: "EDAD" }, { text: _getEdad_impHc(this.hcprc.unid_edad, this.hcprc.vlr_edad) }],
                  },
                ],
              ],
            },
          },
          {
            style: "center7",
            table: {
              widths: ["13.5%", "34%", "22%", "22%", "8.5%"],
              body: [
                [
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      { text: "NIVEL ESTUDIO" },
                      { text: nivel_estudio_mainHc(this.datos.educacion.nivel_estud) },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        columns: [
                          { text: "ACTIVIDAD", width: "27%" },
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.actividad == 2),
                            width: "8%",
                          },
                          { text: "BUSCA 1a VEZ", width: "31%" },
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.actividad == 4),
                            width: "8%",
                          },
                          { text: "PASANTIA", width: "26%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.actividad == 1),
                            width: "8%",
                          },
                          { text: "TRABAJA", width: "19%" },
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.actividad == 3),
                            width: "8%",
                          },
                          { text: "NO Y NO BUSCA", width: "31%" },
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.actividad == 5),
                            width: "8%",
                          },
                          { text: "DESOCUPADO", width: "29%" },
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
                          { text: "ESTADO CIVIL", width: "59%" },
                          {
                            stack: this.cuadro_canvas(this.paci["EST-CIV"] == "S"),
                            width: "12%",
                          },
                          { text: "SOLTERO/A", width: "37%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.paci["EST-CIV"] == "U"),
                            width: "12%",
                          },
                          { text: "UNION ESTABLE", width: "47%" },
                          {
                            stack: this.cuadro_canvas(this.paci["EST-CIV"] == "C"),
                            width: "12%",
                          },
                          { text: "CASADO/A", width: "31%" },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      { text: "ÚLTIMA MENSTRUACIÓN" },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(
                              this.paci.SEXO == "F" && this.datos.gineco_urologico.fecha_ult_mens == 0
                            ),
                            width: "13%",
                          },
                          { text: "NO CONOCE", width: "37%" },
                          {
                            stack: this.cuadro_canvas(this.paci.SEXO != "F"),
                            width: "13%",
                          },
                          { text: "NO CORRESP", width: "38%" },
                        ],
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "center7",
                    columns: [
                      {
                        width: "30%",
                        stack: [
                          { text: "DIA" },
                          {
                            text: this.paci.SEXO == "F" ? this.datos.gineco_urologico.fecha_ult_mens.slice(6) : " ",
                            decoration: "underline",
                          },
                        ],
                      },
                      {
                        width: "33%",
                        stack: [
                          { text: "MES" },
                          {
                            text: this.paci.SEXO == "F" ? this.datos.gineco_urologico.fecha_ult_mens.slice(4, 6) : " ",
                            decoration: "underline",
                          },
                        ],
                      },
                      {
                        width: "40%",
                        stack: [
                          { text: "AÑO" },
                          {
                            text: this.paci.SEXO == "F" ? this.datos.gineco_urologico.fecha_ult_mens.slice(0, 4) : " ",
                            decoration: "underline",
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
            marginTop: 5,
            style: "center7",
            table: {
              widths: ["16%", "14%", "14%", "14%", "14%", "14%", "14%"],
              body: [
                [
                  { text: "DESARROLLO PUBERAL              MUJER", colSpan: 4, style: "left10BoldT" },
                  {},
                  {},
                  {},
                  { text: "HOMBRE", style: "center10BoldT", colSpan: 3 },
                  {},
                  {},
                ],
                [
                  {
                    style: "left7",
                    stack: [
                      { text: "TELARQUIA", style: "center7" },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "NO", width: "25%" },
                          {
                            stack: this.cuadro_canvas(
                              this.paci.SEXO == "F" ? this.datos.desarrollo_puberal.edad_telarquia == 0 : false
                            ),
                            width: "25%",
                          },
                          { text: "AÑOS", width: "32%" },
                          {
                            text:
                              this.paci.SEXO == "F"
                                ? this.datos.desarrollo_puberal.edad_telarquia != 0
                                  ? this.datos.desarrollo_puberal.edad_telarquia
                                  : ""
                                : "",
                            decoration: "underline",
                            width: "18%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      { text: "PUBARQUIA", style: "center7" },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "NO", width: "25%" },
                          {
                            stack: this.cuadro_canvas(
                              this.paci.SEXO == "F" ? this.datos.desarrollo_puberal.edad_pubarquia <= 0 : false
                            ),
                            width: "25%",
                          },
                          { text: "AÑOS", width: "32%" },
                          {
                            text:
                              this.paci.SEXO == "F" && this.datos.desarrollo_puberal.edad_pubarquia > 0
                                ? this.datos.desarrollo_puberal.edad_pubarquia
                                : "",
                            decoration: "underline",
                            width: "18%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      { text: "VELLO AXILAR", style: "center7" },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "NO", width: "25%" },
                          {
                            stack: this.cuadro_canvas(
                              this.paci.SEXO == "F" ? this.datos.desarrollo_puberal.edad_vello_axilar <= 0 : false
                            ),
                            width: "25%",
                          },
                          { text: "AÑOS", width: "32%" },
                          {
                            text:
                              this.paci.SEXO == "F" && this.datos.desarrollo_puberal.edad_vello_axilar > 0
                                ? this.datos.desarrollo_puberal.edad_vello_axilar
                                : "",
                            decoration: "underline",
                            width: "18%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      { text: "MENARQUIA", style: "center7" },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "NO", width: "25%" },
                          {
                            stack: this.cuadro_canvas(
                              this.paci.SEXO == "F" ? this.datos.desarrollo_puberal.edad_menarquia <= 0 : false
                            ),
                            width: "25%",
                          },
                          { text: "AÑOS", width: "32%" },
                          {
                            text:
                              this.paci.SEXO == "F" && this.datos.desarrollo_puberal.edad_menarquia > 0
                                ? this.datos.desarrollo_puberal.edad_menarquia
                                : "",
                            decoration: "underline",
                            width: "18%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      { text: "PUBARQUIA", style: "center7" },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "NO", width: "25%" },
                          {
                            stack: this.cuadro_canvas(
                              this.paci.SEXO == "M" ? this.datos.desarrollo_puberal.edad_pubarquia <= 0 : false
                            ),
                            width: "25%",
                          },
                          { text: "AÑOS", width: "32%" },
                          {
                            text:
                              this.paci.SEXO == "M" && this.datos.desarrollo_puberal.edad_pubarquia > 0
                                ? this.datos.desarrollo_puberal.edad_pubarquia
                                : "",
                            decoration: "underline",
                            width: "18%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      { text: "VELLO AXIAL", style: "center7" },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "NO", width: "25%" },
                          {
                            stack: this.cuadro_canvas(
                              this.paci.SEXO == "M" ? this.datos.desarrollo_puberal.edad_vello_axilar <= 0 : false
                            ),
                            width: "25%",
                          },
                          { text: "AÑOS", width: "32%" },
                          {
                            text:
                              this.paci.SEXO == "M" && this.datos.desarrollo_puberal.edad_vello_axilar > 0
                                ? this.datos.desarrollo_puberal.edad_vello_axilar
                                : "",
                            decoration: "underline",
                            width: "18%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      { text: "POLUCION", style: "center7" },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "NO", width: "25%" },
                          {
                            stack: this.cuadro_canvas(
                              this.paci.SEXO == "M" ? this.datos.desarrollo_puberal.edad_polucion <= 0 : false
                            ),
                            width: "25%",
                          },
                          { text: "AÑOS", width: "32%" },
                          {
                            text:
                              this.paci.SEXO == "M" && this.datos.desarrollo_puberal.edad_polucion > 0
                                ? this.datos.desarrollo_puberal.edad_polucion
                                : "",
                            decoration: "underline",
                            width: "18%",
                          },
                        ],
                      },
                    ],
                  },
                ],
                [
                  {
                    style: "left7",
                    columns: [
                      { text: "RITMO MENSTRUAL", style: "center7", width: "60%" },
                      {
                        style: "center7",
                        stack: [
                          {
                            columns: [
                              {
                                text: this.datos.desarrollo_puberal.ritmo_mestrual.slice(0, 2),
                                decoration: "underline",
                                width: "40%",
                              },
                              { text: "/", width: "10%" },
                              {
                                text: this.datos.desarrollo_puberal.ritmo_mestrual.slice(2),
                                decoration: "underline",
                                width: "40%",
                              },
                            ],
                          },
                          { text: "DIAS", decoration: "underline" },
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
                          { text: "CANTIDAD", width: "35%" },
                          {
                            stack: this.cuadro_canvas(this.datos.desarrollo_puberal.cantidad == 2),
                            width: "10%",
                          },
                          { text: "ABUNDANTE", width: "31%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.desarrollo_puberal.cantidad == 1),
                            width: "10%",
                          },
                          { text: "ESCASO", width: "25%" },
                          {
                            stack: this.cuadro_canvas(this.datos.desarrollo_puberal.cantidad == 3),
                            width: "10%",
                          },
                          { text: "REGULAR", width: "31%" },
                          {
                            stack: this.cuadro_canvas(this.datos.desarrollo_puberal.cantidad == 4),
                            width: "10%",
                          },
                          { text: "N/C", width: "29%" },
                        ],
                      },
                    ],
                    colSpan: 2,
                  },
                  {},
                  {
                    style: "left7",
                    stack: [
                      { text: "COAGULOS", style: "center7" },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "SI", width: "25%" },
                          {
                            stack: this.cuadro_canvas(this.datos.desarrollo_puberal.coagulos == "S"),
                            width: "25%",
                          },
                          { text: "NO", width: "25%" },
                          {
                            stack: this.cuadro_canvas(this.datos.desarrollo_puberal.coagulos == "N"),
                            width: "25%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      { text: "OBSERVACIONES", style: "left7" },
                      {
                        text: this.datos.desarrollo_puberal.observaciones_desa_pub,
                        style: "left7",
                      },
                    ],
                    colSpan: 3,
                    rowSpan: 2,
                  },
                  {},
                  {},
                ],
                [
                  {
                    style: "left7",
                    columns: [
                      { text: "\nDOLOR MENSTRUAL", style: "center7", width: "15%" },
                      {
                        width: "15%",
                        style: "left7",
                        stack: [
                          {
                            columns: [
                              { text: "NO", width: "30%" },
                              {
                                stack: this.cuadro_canvas(
                                  ![1, 2, 3].includes(parseInt(this.datos.desarrollo_puberal.dolor_menstrual))
                                ),
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              { text: "SI", width: "30%" },
                              {
                                stack: this.cuadro_canvas(
                                  [1, 2, 3].includes(parseInt(this.datos.desarrollo_puberal.dolor_menstrual))
                                ),
                                width: "70%",
                              },
                            ],
                          },
                          {
                            canvas: [
                              { type: "line", x1: 25, x2: 46, y1: -3, y2: -17 },
                              { type: "line", x1: 25, x2: 46, y1: -3, y2: -3 },
                              { type: "line", x1: 25, x2: 46, y1: -3, y2: 10 },
                            ],
                          },
                        ],
                      },
                      {
                        width: "40%",
                        style: "left7",
                        stack: [
                          {
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.desarrollo_puberal.dolor_menstrual == 1),
                                width: "12%",
                              },
                              { text: "PREMENSTRUAL", width: "60%", style: "center7" },
                              {
                                stack: this.cuadro_canvas(this.datos.desarrollo_puberal.mastodinia == 1),
                                width: "20%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.desarrollo_puberal.dolor_menstrual == 2),
                                width: "12%",
                              },
                              { text: "MENSTRUAL", width: "60%", style: "center7" },
                              {
                                stack: this.cuadro_canvas(this.datos.desarrollo_puberal.mastodinia == 2),
                                width: "20%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.desarrollo_puberal.dolor_menstrual == 3),
                                width: "12%",
                              },
                              { text: "POSMENSTRUAL", width: "60%", style: "center7" },
                              {
                                stack: this.cuadro_canvas(this.datos.desarrollo_puberal.mastodinia == 3),
                                width: "20%",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        width: "10%",
                        style: "left7",
                        stack: [
                          {
                            columns: [
                              {
                                stack: this.cuadro_canvas(
                                  ![1, 2, 3].includes(parseInt(this.datos.desarrollo_puberal.dolor_menstrual))
                                ),
                                width: "50%",
                              },
                              { text: "NO", width: "50%" },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(
                                  [1, 2, 3].includes(parseInt(this.datos.desarrollo_puberal.dolor_menstrual))
                                ),
                                width: "50%",
                              },
                              { text: "SI", width: "50%" },
                            ],
                          },
                          {
                            canvas: [
                              { type: "line", x1: 1, x2: -22, y1: -3, y2: -17 },
                              { type: "line", x1: 1, x2: -22, y1: -3, y2: -3 },
                              { type: "line", x1: 1, x2: -22, y1: -3, y2: 10 },
                            ],
                          },
                        ],
                      },
                      { text: "\nMASTODINA", style: "left7", width: "15%" },
                    ],
                    colSpan: 4,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
              ],
            },
          },
          {
            marginTop: 5,
            style: "center7",
            table: {
              widths: ["7%", "12%", "7%", "22%", "10%", "14%", "18%", "10%"],
              body: [
                [{ text: "SEXUALIDAD", colSpan: 8, style: "left10BoldT" }, {}, {}, {}, {}, {}, {}, {}],
                [
                  {
                    style: "center7",
                    stack: [
                      { text: "PAREJA SEXUAL" },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.sexualidad2.pareja_actual_sex2 == "S"),
                            width: "50%",
                          },
                          { text: "SI", width: "50%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.sexualidad2.pareja_actual_sex2 == "N"),
                            width: "50%",
                          },
                          { text: "NO", width: "50%" },
                        ],
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      { text: "TIEMPO DE RELACIÓN" },
                      {
                        columns: [
                          {
                            marginTop: 5,
                            stack: [{ text: this.datos.sexualidad2.tiempo_rela_sex2.slice(0, 2) }, { text: "AÑOS" }],
                          },
                          {
                            marginTop: 5,
                            stack: [{ text: this.datos.sexualidad2.tiempo_rela_sex2.slice(2) }, { text: "MESES" }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      { text: "EDAD PAREJA" },
                      {
                        marginTop: 5,
                        stack: [{ text: this.datos.sexualidad2.edad_pareja_sex2 }, { text: "AÑOS" }],
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      { text: "ACTIVIDAD PAREJA\n " },
                      {
                        marginTop: 5,
                        text: _getActividad_impHc(this.datos.sexualidad2.activ_pareja_sex2),
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      { text: "TRABAJO PAREJA" },
                      {
                        marginTop: 5,
                        stack: [
                          {
                            columns: [
                              { text: this.datos.sexualidad2.hrs_trabajo_parej_sex2, decoration: "underline" },
                              { text: "HORAS" },
                            ],
                          },
                          { text: "POR SEMANA" },
                        ],
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      { text: "ESTADO CIVIL PAREJA" },
                      {
                        marginTop: 5,
                        text: _ESTCIVIL(this.datos.sexualidad2.estad_civil_parej_sex2),
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      { text: "NIVEL DE EDUCACIÓN PAREJA" },
                      {
                        marginTop: 5,
                        text: nivel_estudio_mainHc(this.datos.sexualidad2.niv_educ_parej_sex2),
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      { text: "EDAD INICIO VIDA SEXUAL" },
                      {
                        marginTop: 5,
                        stack: [{ text: this.datos.sexualidad.edad_inicio_sex }, { text: "AÑOS" }],
                      },
                    ],
                  },
                ],
                [
                  {
                    style: "left7",
                    stack: [
                      { text: "TIPO DE EXP. SEXUAL", style: "center7" },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.sexualidad2.exp_vaginal_sex2 == "S"),
                            width: "15%",
                          },
                          { text: "VAGINAL", width: "35%" },
                          {
                            stack: this.cuadro_canvas(this.datos.sexualidad2.exp_otros_sex2 == "S"),
                            width: "15%",
                          },
                          { text: "OTRO", width: "35%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.sexualidad2.exp_oral_sex2 == "S"),
                            width: "15%",
                          },
                          { text: "ORAL", width: "35%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.sexualidad2.exp_anal_sex2 == "S"),
                            width: "15%",
                          },
                          { text: "ANAL", width: "35%" },
                        ],
                      },
                    ],
                    colSpan: 2,
                  },
                  {},
                  {
                    style: "center7",
                    stack: [
                      { text: "USA JUGUETES SEX" },
                      {
                        marginTop: 3,
                        stack: [
                          {
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.sexualidad2.juguetes_sex2 == "S"),
                                width: "50%",
                              },
                              { text: "SI", width: "50%" },
                            ],
                          },
                          {
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.sexualidad2.juguetes_sex2 == "N"),
                                width: "50%",
                              },
                              { text: "NO", width: "50%" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      { text: "FRECUENCIA COITAL", style: "center7" },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "", width: "20%" },
                          { text: "\n" + this.datos.sexualidad2.frec_coital_sex2 + "  /", width: "20%", marginTop: 6 },
                          {
                            stack: [
                              {
                                columns: [
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad2.tipo_frec_coital_sex2 == "D"),
                                    width: "35%",
                                  },
                                  { text: "  DIAS", width: "65%" },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad2.tipo_frec_coital_sex2 == "S"),
                                    width: "35%",
                                  },
                                  { text: "  SEMAN", width: "65%" },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad2.tipo_frec_coital_sex2 == "M"),
                                    width: "35%",
                                  },
                                  { text: "  MES", width: "65%" },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [{ text: "NRO DE PAREJAS SEX\n " }, { text: this.datos.sexualidad2.nro_parejas_sex2 }],
                  },
                  {
                    border: [false, false, false, false],
                    text: "",
                  },
                  {
                    border: [false, false, false, false],
                    text: "",
                  },
                  {
                    border: [false, false, false, false],
                    text: "",
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
                text: this.datos.sexualidad2.observaciones_sex2,
                style: "left8",
              },
            ],
          },
          {
            marginTop: 5,
            style: "center7",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "ABUSO SEXUAL", style: "left10BoldT" }],
                [
                  {
                    columns: [
                      {
                        width: "45%",
                        style: "left7",
                        columns: [
                          { text: "PAREJA SEXUAL", width: "12%" },
                          {
                            width: "35%",
                            stack: [
                              {
                                columns: [
                                  { text: "NO", width: "50%" },
                                  {
                                    stack: this.cuadro_canvas(this.datos.abuso_sexual.abuso_sex == 1),
                                    width: "50%",
                                  },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  { text: "UNICO", width: "50%" },
                                  {
                                    stack: this.cuadro_canvas(this.datos.abuso_sexual.abuso_sex == 2),
                                    width: "50%",
                                  },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  { text: "REITERADO", width: "50%" },
                                  {
                                    stack: this.cuadro_canvas(this.datos.abuso_sexual.abuso_sex == 3),
                                    width: "50%",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            width: "53%",
                            stack: [
                              {
                                marginTop: 3,
                                columns: [
                                  { text: "TIPO DE ABUSO", width: "25%" },
                                  { text: this.datos.abuso_sexual.tipo_abuso, width: "75%" },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  { text: "QUIEN?", width: "25%" },
                                  { text: this.datos.abuso_sexual.quien_abuso, width: "75%" },
                                ],
                              },
                              {
                                canvas: [
                                  { type: "line", x1: -28, x2: -17, y1: -13, y2: -13 },
                                  { type: "line", x1: -28, x2: -17, y1: -3, y2: -3 },
                                  { type: "line", x1: -17, x2: -17, y1: 5, y2: -20 },
                                  { type: "line", x1: -17, x2: 0, y1: -20, y2: -20 },
                                  { type: "line", x1: -17, x2: 0, y1: 5, y2: 5 },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        width: "8%",
                        style: "center7",
                        stack: [
                          { text: "EDAD AGRESOR" },
                          { text: this.datos.abuso_sexual.edad_agresor },
                          { text: "AÑOS" },
                        ],
                      },
                      {
                        width: "10%",
                        style: "center7",
                        stack: [{ text: "CANTIDAD DE AGRESORES" }, { text: this.datos.abuso_sexual.cantidad_agresor }],
                      },
                      {
                        width: "11%",
                        style: "center7",
                        stack: [
                          { text: "EDAD DE INICIO DEL ABUSO" },
                          { text: this.datos.abuso_sexual.edad_inicio_abuso },
                          { text: "AÑOS" },
                        ],
                      },
                      {
                        width: "6%",
                        style: "center7",
                        stack: [{ text: "\nTIEMPO" }, { text: this.datos.abuso_sexual.t_anos_abuso }, { text: "AÑOS" }],
                      },
                      {
                        width: "8%",
                        style: "center7",
                        stack: [
                          { text: this.datos.abuso_sexual.t_meses_abuso },
                          { text: "MESES" },
                          { text: this.datos.abuso_sexual.t_semanas_abuso },
                          { text: "SEMANAS" },
                        ],
                      },
                      {
                        width: "13%",
                        style: "center7",
                        stack: [
                          { text: "TRATAMIENTO" },
                          {
                            marginTop: 3,
                            stack: [
                              {
                                columns: [
                                  {
                                    stack: this.cuadro_canvas(this.datos.abuso_sexual.tratamiento_abuso == 1),
                                    width: "20%",
                                  },
                                  { text: "NO", width: "80%" },
                                ],
                              },
                              {
                                columns: [
                                  {
                                    stack: this.cuadro_canvas(this.datos.abuso_sexual.tratamiento_abuso == 2),
                                    width: "20%",
                                  },
                                  { text: "EN CURSO", width: "80%" },
                                ],
                              },
                              {
                                columns: [
                                  {
                                    stack: this.cuadro_canvas(this.datos.abuso_sexual.tratamiento_abuso == 3),
                                    width: "20%",
                                  },
                                  { text: "CUMPLIDO", width: "80%" },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
                [
                  {
                    style: "left7",
                    columns: [
                      { text: "DENUNCIAS DEL ABUSO", width: "20%" },
                      {
                        stack: this.cuadro_canvas(this.datos.abuso_sexual.denuncia_abuso == "S"),
                        width: "3%",
                      },
                      { text: "SI", width: "4%" },
                      {
                        stack: this.cuadro_canvas(this.datos.abuso_sexual.denuncia_abuso == "N"),
                        width: "3%",
                      },
                      { text: "NO", width: "4%" },
                      { text: "DONDE?", width: "6%" },
                      { text: this.datos.abuso_sexual.donde_denuncia, width: "20%" },
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
                text: this.datos.abuso_sexual.observ_abuso,
                style: "left8",
              },
            ],
          },
          {
            pageBreak: "before",
            marginTop: 5,
            style: "center7",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "METODOS ANTICONCEPTIVOS", style: "left10BoldT" }],
                [
                  {
                    style: "left7",
                    columns: [
                      { text: "EMBARAZO CON USO DE METODO ANTICONCEPTIVO", width: "35%" },
                      {
                        stack: this.cuadro_canvas(this.datos.emb_otros_metodos == 1),
                        width: "3%",
                      },
                      { text: "SI", width: "4%" },
                      {
                        stack: this.cuadro_canvas(this.datos.emb_otros_metodos == 2),
                        width: "3%",
                      },
                      { text: "NO", width: "4%" },
                      {
                        stack: this.cuadro_canvas(this.datos.emb_otros_metodos == 3),
                        width: "3%",
                      },
                      { text: "NO SABE", width: "20%" },
                      { text: "CUAL?", width: "6%" },
                      { text: consult_planifica(this.datos.cual_emb_metodo), width: "20%" },
                    ],
                  },
                ],
                [
                  {
                    style: "center7",
                    stack: [
                      {
                        columns: [
                          { text: "", style: "left7", width: "15%" },
                          { text: "CONOCE M.A.C", width: "10%" },
                          { text: "", width: "5%" },
                          { text: "HA USADO ANTES", width: "12%" },
                          { text: "", width: "5%" },
                          { text: "USO ACTUAL", width: "10%" },
                          { text: "", width: "18%" },
                          { text: "INDICADO POR", width: "12%" },
                        ],
                      },
                      {
                        columns: [
                          { text: "", style: "left7", width: "15%" },
                          { text: "SI", width: "5%" },
                          { text: "NO", width: "5%" },
                          { text: "", width: "5%" },
                          { text: "SI", width: "6%" },
                          { text: "NO", width: "6%" },
                          { text: "", width: "5%" },
                          { text: "SI", width: "5%" },
                          { text: "NO", width: "5%" },
                          { text: "", width: "5%" },
                          { text: "MEDICO", width: "8%" },
                          { text: "AUTOINDICADO", width: "12%" },
                          { text: "AMIGO/A", width: "10%" },
                          { text: "OTRO", width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "DIU", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.diu.diu_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.diu.diu_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.diu.diu_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.diu.diu_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.diu.diu_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.diu.diu_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.diu.diu_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.diu.diu_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.diu.diu_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.diu.diu_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "ORAL", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.oral.oral_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.oral.oral_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.oral.oral_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.oral.oral_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.oral.oral_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.oral.oral_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.oral.oral_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.oral.oral_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.oral.oral_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.oral.oral_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "BARRERA", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.barr.barr_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.barr.barr_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.barr.barr_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.barr.barr_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.barr.barr_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.barr.barr_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.barr.barr_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.barr.barr_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.barr.barr_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.barr.barr_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "DIU+BARRERA", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.diu_barr.diu_barr_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.diu_barr.diu_barr_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.diu_barr.diu_barr_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.diu_barr.diu_barr_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.diu_barr.diu_barr_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.diu_barr.diu_barr_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.diu_barr.diu_barr_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.diu_barr.diu_barr_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.diu_barr.diu_barr_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.diu_barr.diu_barr_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "IMPL. SUBDERMICO", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.impl_sd.impl_sd_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.impl_sd.impl_sd_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.impl_sd.impl_sd_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.impl_sd.impl_sd_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.impl_sd.impl_sd_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.impl_sd.impl_sd_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.impl_sd.impl_sd_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.impl_sd.impl_sd_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.impl_sd.impl_sd_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.impl_sd.impl_sd_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "I.SUBDERT+BARRERA", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.sd_barr.sd_barr_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.sd_barr.sd_barr_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.sd_barr.sd_barr_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.sd_barr.sd_barr_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.sd_barr.sd_barr_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.sd_barr.sd_barr_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.sd_barr.sd_barr_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.sd_barr.sd_barr_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.sd_barr.sd_barr_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.sd_barr.sd_barr_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "ORAL+BARRERA", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.oral_barr.oral_barr_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.oral_barr.oral_barr_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.oral_barr.oral_barr_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.oral_barr.oral_barr_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.oral_barr.oral_barr_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.oral_barr.oral_barr_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.oral_barr.oral_barr_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.oral_barr.oral_barr_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.oral_barr.oral_barr_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.oral_barr.oral_barr_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "INYECTABLE MENSUAL", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_men.inyec_men_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_men.inyec_men_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_men.inyec_men_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_men.inyec_men_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_men.inyec_men_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_men.inyec_men_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_men.inyec_men_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_men.inyec_men_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_men.inyec_men_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_men.inyec_men_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "INYECTABLE+BARRERA", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.men_barr.men_barr_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.men_barr.men_barr_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.men_barr.men_barr_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.men_barr.men_barr_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.men_barr.men_barr_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.men_barr.men_barr_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.men_barr.men_barr_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.men_barr.men_barr_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.men_barr.men_barr_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.men_barr.men_barr_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "INYECTABLE TRIMEST", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_tri.inyec_tri_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_tri.inyec_tri_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_tri.inyec_tri_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_tri.inyec_tri_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_tri.inyec_tri_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_tri.inyec_tri_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_tri.inyec_tri_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_tri.inyec_tri_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_tri.inyec_tri_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.inyec_tri.inyec_tri_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "TRIMESTRAL+BARRERA", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.tri_barr.tri_barr_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.tri_barr.tri_barr_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.tri_barr.tri_barr_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.tri_barr.tri_barr_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.tri_barr.tri_barr_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.tri_barr.tri_barr_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.tri_barr.tri_barr_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.tri_barr.tri_barr_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.tri_barr.tri_barr_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.tri_barr.tri_barr_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "EMERGENCIA", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.emerg.emerg_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.emerg.emerg_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.emerg.emerg_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.emerg.emerg_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.emerg.emerg_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.emerg.emerg_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.emerg.emerg_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.emerg.emerg_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.emerg.emerg_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.emerg.emerg_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "EMERGENCIA+BARRERA", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.emerg_barr.emerg_barr_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.emerg_barr.emerg_barr_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.emerg_barr.emerg_barr_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.emerg_barr.emerg_barr_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.emerg_barr.emerg_barr_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.emerg_barr.emerg_barr_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.emerg_barr.emerg_barr_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.emerg_barr.emerg_barr_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.emerg_barr.emerg_barr_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.emerg_barr.emerg_barr_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "ESTERILIZACIÓN", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.ester.ester_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.ester.ester_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.ester.ester_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.ester.ester_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.ester.ester_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.ester.ester_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.ester.ester_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.ester.ester_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.ester.ester_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.ester.ester_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "ESTERILIZA+BARRERA", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.ester_barr.ester_barr_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.ester_barr.ester_barr_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.ester_barr.ester_barr_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.ester_barr.ester_barr_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.ester_barr.ester_barr_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.ester_barr.ester_barr_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.ester_barr.ester_barr_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.ester_barr.ester_barr_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.ester_barr.ester_barr_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.ester_barr.ester_barr_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "COITUS INTERRUPTUS", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.coi_int.coi_int_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.coi_int.coi_int_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.coi_int.coi_int_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.coi_int.coi_int_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.coi_int.coi_int_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.coi_int.coi_int_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.coi_int.coi_int_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.coi_int.coi_int_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.coi_int.coi_int_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.coi_int.coi_int_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          { text: "METODO DEL RITMO", style: "left7", width: "15%" },
                          { stack: this.cuadro_canvas(this.datos.met_rit.met_rit_con == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.met_rit.met_rit_con == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.met_rit.met_rit_usant == "S"), width: "6%" },
                          { stack: this.cuadro_canvas(this.datos.met_rit.met_rit_usant == "N"), width: "6%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.met_rit.met_rit_usact == "S"), width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.met_rit.met_rit_usact == "N"), width: "5%" },
                          { text: "", width: "5%" },
                          { stack: this.cuadro_canvas(this.datos.met_rit.met_rit_indic == 1), width: "8%" },
                          { stack: this.cuadro_canvas(this.datos.met_rit.met_rit_indic == 2), width: "12%" },
                          { stack: this.cuadro_canvas(this.datos.met_rit.met_rit_indic == 3), width: "10%" },
                          { stack: this.cuadro_canvas(this.datos.met_rit.met_rit_indic == 4), width: "8%" },
                        ],
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            text: "RAZON DE SU NO USO EN ADOLESCENTE CON EXPERIENCIA SEXUAL:",
                            style: "left7",
                            width: "41%",
                          },
                          { text: _getNoUsoAntic(this.datos.no_uso_antic), style: "left7", width: "30%" },
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
            style: "center7",
            table: {
              widths: ["100%"],
              body: [
                [{ text: "FRECUNDIDA", style: "left10BoldT" }],
                [
                  {
                    stack: [
                      {
                        style: "center7",
                        columns: [
                          {
                            width: "32%",
                            stack: [
                              {
                                columns: [
                                  {
                                    width: "24%",
                                    stack: [
                                      { text: "\nEMBARAZOS" },
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.embarazos_w : "",
                                        decoration: "underline",
                                      },
                                      {
                                        canvas: [
                                          { type: "line", x1: 35, x2: 55, y1: -3, y2: -12 },
                                          { type: "line", x1: 35, x2: 55, y1: -3, y2: 3 },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    width: "24%",
                                    stack: [
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.abortos_w : "",
                                        decoration: "underline",
                                      },
                                      { text: "ABORTOS", style: "center6" },
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.nacimientos_w : "",
                                        decoration: "underline",
                                        marginTop: 5,
                                      },
                                      { text: "NACIMIENTOS", style: "center6" },
                                    ],
                                  },
                                  {
                                    width: "1%",
                                    stack: [
                                      { text: "=", style: "center8" },
                                      { text: "=", style: "center8", marginTop: 5 },
                                    ],
                                  },
                                  {
                                    width: "12%",
                                    stack: [
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.abortos.abort_esp : "",
                                        decoration: "underline",
                                      },
                                      { text: "ESP", style: "center6" },
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.nacimientos.nac_vivos : "",
                                        decoration: "underline",
                                        marginTop: 5,
                                      },
                                      { text: "VIVOS", style: "center6" },
                                    ],
                                  },
                                  {
                                    width: "1%",
                                    stack: [
                                      { text: "+", style: "center8" },
                                      { text: "+", style: "center8", marginTop: 5 },
                                    ],
                                  },
                                  {
                                    width: "18%",
                                    stack: [
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.abortos.abort_prov : "",
                                        decoration: "underline",
                                      },
                                      { text: "PROVOCA", style: "center6" },
                                      {
                                        text:
                                          this.paci.SEXO == "F" ? this.datos.frecundidad.nacimientos.nac_muerto : "",
                                        decoration: "underline",
                                        marginTop: 5,
                                      },
                                      { text: "MUERTOS", style: "center6" },
                                    ],
                                  },
                                  {
                                    width: "1%",
                                    stack: [{ text: "+", style: "center8" }],
                                  },
                                  {
                                    width: "17%",
                                    stack: [
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.abortos.abort_emb_eto : "",
                                        decoration: "underline",
                                      },
                                      { text: "EMB. ECTOPICO", style: "left6" },
                                    ],
                                  },
                                ],
                              },
                              {
                                marginTop: 5,
                                style: "left7",
                                columns: [
                                  { text: "LACTANCIA PESADA", width: "23%" },
                                  {
                                    width: "35%",
                                    stack: [
                                      {
                                        columns: [
                                          {
                                            stack: this.cuadro_canvas(this.datos.frecundidad.lact_pesada == 1),
                                            width: "30%",
                                          },
                                          { text: "SI", width: "20%" },
                                          {
                                            stack: this.cuadro_canvas(this.datos.frecundidad.lact_pesada == 3),
                                            width: "30%",
                                          },
                                          { text: "NS", width: "20%" },
                                        ],
                                      },
                                      {
                                        columns: [
                                          {
                                            stack: this.cuadro_canvas(this.datos.frecundidad.lact_pesada == 2),
                                            width: "30%",
                                          },
                                          { text: "NO", width: "20%" },
                                        ],
                                      },
                                    ],
                                  },
                                  { text: "MAXIMA LACTANCIA", width: "25%" },
                                  {
                                    style: "center7",
                                    wdith: "17%",
                                    stack: [
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.max_lact : "",
                                        decoration: "underline",
                                      },
                                      { text: "MESES" },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            width: "12%",
                            stack: [
                              {
                                columns: [
                                  { text: "EDAD 1er EMBARAZO", width: "60%", style: "left7" },
                                  {
                                    width: "35%",
                                    stack: [
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.edad_1er_emb : "",
                                        decoration: "underline",
                                      },
                                      { text: "AÑOS" },
                                    ],
                                  },
                                ],
                              },
                              {
                                marginTop: 4,
                                columns: [
                                  { text: "EDAD 1er PARTO", width: "60%", style: "left7" },
                                  {
                                    width: "35%",
                                    stack: [
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.edad_1er_parto : "",
                                        decoration: "underline",
                                      },
                                      { text: "AÑOS" },
                                    ],
                                  },
                                ],
                              },
                              {
                                marginTop: 4,
                                columns: [
                                  { text: "MINIMA LACTANCIA", width: "60%", style: "left7" },
                                  {
                                    width: "35%",
                                    stack: [
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.min_lact : "",
                                        decoration: "underline",
                                      },
                                      { text: "AÑOS" },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            width: "16%",
                            stack: [
                              {
                                columns: [
                                  { text: "PATOLOGIA EN EMBARAZO", width: "64%", style: "left7" },
                                  {
                                    width: "18%",
                                    stack: [
                                      { text: "SI" },
                                      { stack: this.cuadro_canvas(this.datos.frecundidad.patol_embar == "S") },
                                    ],
                                  },
                                  {
                                    width: "18%",
                                    stack: [
                                      { text: "NO" },
                                      { stack: this.cuadro_canvas(this.datos.frecundidad.patol_embar == "N") },
                                    ],
                                  },
                                ],
                              },
                              {
                                marginTop: 4,
                                style: "left7",
                                stack: [
                                  { text: "CUAL?", width: "65%" },
                                  { text: this.datos.frecundidad.cual_patol_embar, width: "65%" },
                                ],
                              },
                              {
                                marginTop: 4,
                                columns: [
                                  { text: "REGULACIÓN MENSTRUAL", width: "64%", style: "left7" },
                                  {
                                    width: "18%",
                                    stack: [
                                      { text: "SI" },
                                      { stack: this.cuadro_canvas(this.datos.frecundidad.regulacion_menst == "S") },
                                    ],
                                  },
                                  {
                                    width: "18%",
                                    stack: [
                                      { text: "NO" },
                                      { stack: this.cuadro_canvas(this.datos.frecundidad.regulacion_menst == "N") },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            marginLeft: 3,
                            width: "13%",
                            stack: [
                              {
                                stack: [
                                  { text: "HOSPITALIZACIONES", width: "64%", style: "left7" },
                                  {
                                    width: "18%",
                                    columns: [
                                      { stack: this.cuadro_canvas(this.datos.frecundidad.hospital == "S") },
                                      { text: "SI" },
                                      { stack: this.cuadro_canvas(this.datos.frecundidad.hospital == "N") },
                                      { text: "NO" },
                                    ],
                                  },
                                ],
                              },
                              {
                                marginTop: 4,
                                stack: [
                                  { text: "INFECCIONES", width: "64%", style: "left7" },
                                  {
                                    width: "18%",
                                    columns: [
                                      { stack: this.cuadro_canvas(this.datos.frecundidad.infeccion == "S") },
                                      { text: "SI" },
                                      { stack: this.cuadro_canvas(this.datos.frecundidad.infeccion == "N") },
                                      { text: "NO" },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            marginLeft: 5,
                            width: "8%",
                            stack: [
                              {
                                stack: [
                                  { text: "EMBARAZO ACTUAL", style: "left7" },
                                  {
                                    columns: [
                                      {
                                        stack: [
                                          { text: "SI" },
                                          {
                                            stack: this.cuadro_canvas(
                                              this.paci.SEXO == "F" &&
                                                [1, 2, 3].includes(parseInt(this.hcprc.rips.embarazo))
                                            ),
                                          },
                                        ],
                                      },
                                      {
                                        stack: [
                                          { text: "NO" },
                                          {
                                            stack: this.cuadro_canvas(
                                              this.paci.SEXO == "F" &&
                                                ![1, 2, 3].includes(parseInt(this.hcprc.rips.embarazo))
                                            ),
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            marginLeft: 2,
                            width: "8%",
                            stack: [
                              {
                                stack: [
                                  { text: "LACTANCIA ACTUAL", style: "left7" },
                                  {
                                    columns: [
                                      {
                                        stack: [
                                          { text: "SI" },
                                          { stack: this.cuadro_canvas(this.datos.frecundidad.lactancia_act == 1) },
                                        ],
                                      },
                                      {
                                        stack: [
                                          { text: "NO" },
                                          { stack: this.cuadro_canvas(this.datos.frecundidad.lactancia_act == 2) },
                                        ],
                                      },
                                      {
                                        stack: [
                                          { text: "NS" },
                                          { stack: this.cuadro_canvas(this.datos.frecundidad.lactancia_act == 3) },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            marginLeft: 0,
                            style: "left7",
                            columns: [
                              { text: "PESO", width: "32%" },
                              {
                                stack: [
                                  {
                                    columns: [
                                      { text: "1er R.N", width: "65%" },
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.peso_1er_rn : "",
                                        decoration: "underline",
                                      },
                                    ],
                                  },
                                  {
                                    marginTop: 2,
                                    columns: [
                                      { text: "2do R.N", width: "65%" },
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.peso_2do_rn : "",
                                        decoration: "underline",
                                      },
                                    ],
                                  },
                                  {
                                    marginTop: 2,
                                    columns: [
                                      { text: "3er R.N", width: "65%" },
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.peso_3ro_rn : "",
                                        decoration: "underline",
                                      },
                                    ],
                                  },
                                  {
                                    marginTop: 2,
                                    columns: [
                                      { text: "4to R.N", width: "65%" },
                                      {
                                        text: this.paci.SEXO == "F" ? this.datos.frecundidad.peso_4to_rn : "",
                                        decoration: "underline",
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
                  },
                ],
              ],
            },
          },
          {
            marginTop: 3,
            stack: [
              { text: "OBSERVACIONES", style: "left8Bold" },
              { text: this.datos.frecundidad.observacion_frecun, style: "left8" },
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

const imprimir_HCI8051A = function (params) {
  var formato = new formato_HCI8051A(params);
  formato._init();
};

module.exports = {
  imprimir_HCI8051A,
};
