class formato_PYP2I {
  constructor(params) {
    this.hcprc = params.hcprc;
    this.paci = params.paci;
    this.dato_pyp2 = {};
    this.datos = {};
    this.content_imp = {};
    this.callback_error = params.callback_error;
    this.callback = params.callback;
  }

  async _init() {
    this.edad_paciente = SC_EDAD_AMD(this.paci.NACIM, moment().format("YYYYMMDD"));
    this.edad_edit_ws = `${cerosIzq(this.edad_paciente.años, 2)}${cerosIzq(this.edad_paciente.meses, 2)}${cerosIzq(
      this.edad_paciente.dias,
      2
    )}`;

    await rangoEdad_mainHc(this.edad_edit_ws).then((data) => {
      this.rango_edit = data;
    });

    await this.leerPyp2();

    this._imprimir()
      .then(async () => {
        await _impresion2({
          tipo: "pdf",
          archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmss")}.pdf`,
          content: this.content_imp,
        })
          .then(() => {
            this.callback();
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
        CON851("", "Error en impresion PYP2", null, "error", "Error");
        this.callback_error();
      });
  }

  leerPyp2() {
    return new Promise((resolve, reject) => {
      postData(
        { datosh: datosEnvio() + this.hcprc.llave + "|" + this.rango_edit + "|" },
        get_url("APP/HICLIN/GET_PYP2.DLL")
      )
        .then((data) => {
          loader("hide");
          this.dato_pyp2 = data;
          resolve();
        })
        .catch((error) => {
          CON851("", "Error consultando datos", null, "error", "Error");
          console.error(error);
          this.salir_esc();
        });
    });
  }

  _imprimir() {
    return new Promise((resolve) => {
      this.content_imp.images = {
        logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT),
      };
      this.content_imp.pageMargins = [20, 143, 20, 60];
      this.datos = {
        encabezado: {
          nombre: $_USUA_GLOBAL[0].NOMBRE,
          nit: $_USUA_GLOBAL[0].NIT,
          titulo: "ESCALA ABREVIADA DE DESARROLLO 3",
        },
        paciente: llenarPacienteAperturas2_impHc(this.paci, this.hcprc),
      };
      this.content_imp.header = encabezadoAperturas_impHc(this.datos, [20, 25, 20, 0]);

      this.content_imp.content = [
        {
          margin: [0, 0, 0, 0],
          stack: [
            {
              stack: this.llenarFormato(),
            },
          ],
        },
      ];

      this.content_imp.styles = estilosImpresion_impHc();
      resolve();
    });
  }

  llenarFormato() {
    return [
      {
        stack: this.llenarGraficas(),
      },
      {
        pageBreak: "before",
        stack: this.llenarRespuestas("MG"),
      },
      {
        pageBreak: "before",
        stack: this.llenarRespuestas("MF"),
      },
      {
        pageBreak: "before",
        stack: this.llenarRespuestas("AL"),
      },
      {
        pageBreak: "before",
        stack: this.llenarRespuestas("PS"),
      },
    ];
  }

  llenarRespuestas(orden) {
    let titulo = "";
    switch (orden) {
      case "MG":
        titulo = "MOTRICIDAD GRUESA";
        break;
      case "MF":
        titulo = "MOTRICIDAD FINO ADAPTATIVA";
        break;
      case "AL":
        titulo = "AUDICION Y LENGUAJE";
        break;
      case "PS":
        titulo = "PERSONAL SOCIAL";
        break;
    }

    let content = [
      [
        { text: "", border: [true, true, false, false], style: "center10BoldT" },
        { text: "", border: [false, true, false, false], style: "center10BoldT" },
        { text: titulo, style: "center10BoldT", border: [false, true, false, false] },
        { text: "", border: [false, true, true, false], style: "center10BoldT" },
      ],
      [
        { text: "RANGO DE EDAD", style: "center8Bold" },
        { text: "ITEM", style: "center8Bold" },
        { text: "ENUNCIADO", style: "center8Bold" },
        { text: "RESPUESTA", style: "center8Bold" },
      ],
    ];

    let fila = [];

    for (let row = 1; row <= 36; row++) {
      fila = [];
      if ([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].includes(row)) {
        switch (row) {
          case 1:
            fila.push({ text: "0 dias a 1 mes \n y 0 dias", rowSpan: 3 });
            break;
          case 4:
            fila.push({ text: "1 mes y 1 día \n a 3 meses y 0 días", rowSpan: 3 });
            break;
          case 7:
            fila.push({ text: "3 meses y 1 día \n a 6 meses y 0 días", rowSpan: 3 });
            break;
          case 10:
            fila.push({ text: "6 meses y 1 día \n a 9 meses y 0 días", rowSpan: 3 });
            break;
          case 13:
            fila.push({ text: "9 meses y 1 día \n a 12 meses y 0 días", rowSpan: 3 });
            break;
          case 16:
            fila.push({ text: "12 meses y 1 día \n a 18 meses y 0 días", rowSpan: 3 });
            break;
          case 19:
            fila.push({ text: "18 meses y 1 día \n a 24 meses y 0 días", rowSpan: 3 });
            break;
          case 22:
            fila.push({ text: "2 a 3 años \n (24 meses y 1 día a \n 36 meses y 0 días)", rowSpan: 3 });
            break;
          case 25:
            fila.push({ text: "3 a 4 años\n (36 meses y 1 día a \n 48 meses y 0 días)", rowSpan: 3 });
            break;
          case 28:
            fila.push({ text: "4 a 5 años \n (48 meses y 1 día a \n 60 meses y 0 días", rowSpan: 3 });
            break;
          case 31:
            fila.push({ text: "5 a 6 años \n (60 meses y 1 día a \n 72 meses y 0 días", rowSpan: 3 });
            break;
          case 34:
            fila.push({ text: "6 a 7 años \n (72 meses y 1 día a \n 84 meses y 0 días)", rowSpan: 3 });
            break;
        }
        fila.push({ text: row });
        fila.push({ text: this.preguntas_PYP2I()[orden][row - 1], style: "left8" });
        let respuesta = this.dato_pyp2[orden][this.preguntas_PYP2I()[orden][row - 1].model];
        fila.push({ text: respuesta });
      } else {
        fila.push({});
        fila.push({ text: row });
        fila.push({ text: this.preguntas_PYP2I()[orden][row - 1], style: "left8" });
        let respuesta = this.dato_pyp2[orden][this.preguntas_PYP2I()[orden][row - 1].model];
        fila.push({ text: respuesta });
      }

      content.push(fila);
    }

    content.push(
      [
        { text: "", border: [true, false, false, true] },
        { text: "", border: [false, false, false, true] },
        {
          text: "Total Acumulado al inicio",
          alignment: "right",
          border: [false, true, true, true],
        },
        {
          text: this.dato_pyp2[orden][`acumulado_ead3_${orden.toLowerCase()}`],
        },
      ],
      [
        { text: "", border: [true, false, false, true] },
        { text: "", border: [false, false, false, true] },
        {
          text: "Número de items correctos",
          alignment: "right",
          border: [false, true, true, true],
        },
        {
          text: this.dato_pyp2[orden][`items_correctos_ead3_${orden.toLowerCase()}`],
        },
      ],
      [
        { text: "", border: [true, false, false, true] },
        { text: "", border: [false, false, false, true] },
        {
          text: "Total (Puntaje Directo)",
          alignment: "right",
          border: [false, true, true, true],
        },
        {
          text: parseInt(this.dato_pyp2[orden][`pt_directa_ead3_${orden.toLowerCase()}`]),
        },
      ]
    );

    return [
      {
        style: "center8",
        table: {
          widths: ["20%", "5%", "65%", "10%"],
          body: content,
        },
      },
    ];
  }

  llenarGraficas() {
    let content = [
      {
        stack: [
          {
            fontSize: 6,
            alignment: "center",
            stack: [
              {
                // *******  RANGO 1 ******* //
                columns: [
                  this.bloqueRango(1, "0 días a\na 1 mes\ny 0 días"),
                  this.bloqueArea(1),
                  this.bloquePuntuacion(1),
                  this.bloqueResultado(1),
                ],
              },
              {
                // *******  RANGO 2 ******* //
                marginTop: 5,
                columns: [
                  this.bloqueRango(2, "1 mes y\n1 día a\n3 meses y\n0 días"),
                  this.bloqueArea(2),
                  this.bloquePuntuacion(2),
                  this.bloqueResultado(2),
                ],
              },
              {
                // *******  RANGO 3 ******* //
                marginTop: 5,
                columns: [
                  this.bloqueRango(3, "3 meses y\n1 día a\n6 meses y\n0 días"),
                  this.bloqueArea(3),
                  this.bloquePuntuacion(3),
                  this.bloqueResultado(3),
                ],
              },
              {
                // *******  RANGO 4 ******* //
                marginTop: 5,
                columns: [
                  this.bloqueRango(4, "6 meses y\n1 día a\n9 meses y\n0 días"),
                  this.bloqueArea(4),
                  this.bloquePuntuacion(4),
                  this.bloqueResultado(4),
                ],
              },
              {
                // *******  RANGO 5 ******* //
                marginTop: 5,
                columns: [
                  this.bloqueRango(5, "9 meses y\n1 día a\n12 meses y\n0 días"),
                  this.bloqueArea(5),
                  this.bloquePuntuacion(5),
                  this.bloqueResultado(5),
                ],
              },
              {
                // *******  RANGO 6 ******* //
                marginTop: 5,
                columns: [
                  this.bloqueRango(6, "12 meses y\n1 día a\n18 meses y\n0 días"),
                  this.bloqueArea(6),
                  this.bloquePuntuacion(6),
                  this.bloqueResultado(6),
                ],
              },
              {
                // *******  RANGO 7 ******* //
                marginTop: 5,
                columns: [
                  this.bloqueRango(7, "18 meses y\n1 día a\n24 meses y\n0 días"),
                  this.bloqueArea(7),
                  this.bloquePuntuacion(7),
                  this.bloqueResultado(7),
                ],
              },
              {
                // *******  RANGO 8 ******* //
                marginTop: 5,
                columns: [
                  this.bloqueRango(8, "2 a 3 años\n(24 meses y 1\ndía a 36 meses\ny 0 días)"),
                  this.bloqueArea(8),
                  this.bloquePuntuacion(8),
                  this.bloqueResultado(8),
                ],
              },
              {
                // *******  RANGO 9 ******* //
                marginTop: 5,
                columns: [
                  this.bloqueRango(9, "3 a 4 años\n(36 meses y 1\ndía a 48 meses\ny 0 días)"),
                  this.bloqueArea(9),
                  this.bloquePuntuacion(9),
                  this.bloqueResultado(9),
                ],
              },
              {
                // *******  RANGO 10 ******* //
                marginTop: 5,
                columns: [
                  this.bloqueRango(10, "4 a 5 años\n(48 meses y 1\ndía a 60 meses\ny 0 días)"),
                  this.bloqueArea(10),
                  this.bloquePuntuacion(10),
                  this.bloqueResultado(10),
                ],
              },
              {
                // *******  RANGO 11 ******* //
                marginTop: 5,
                columns: [
                  this.bloqueRango(11, "5 a 6 años\n(60 meses y 1\ndía a 72 meses\ny 0 días)"),
                  this.bloqueArea(11),
                  this.bloquePuntuacion(11),
                  this.bloqueResultado(11),
                ],
              },
              {
                // *******  RANGO 12 ******* //
                marginTop: 5,
                columns: [
                  this.bloqueRango(12, "6 a 7 años\n(72 meses y 1\ndía a 84 meses\ny 0 días"),
                  this.bloqueArea(12),
                  this.bloquePuntuacion(12),
                  this.bloqueResultado(12),
                ],
              },
            ],
          },
        ],
      },
    ];

    return content;
  }

  bloqueRango(rango, texto) {
    return {
      width: "8%",
      stack: [
        {
          marginTop: 3,
          table: {
            widths: ["100%"],
            body: [[{ margin: [-4, -2, 0, -2], text: "Rango" }]],
          },
          layout: "noBorders",
        },
        {
          marginTop: 2,
          table: {
            widths: ["95%"],
            heights: [31],
            body: [[{ margin: [0, rango == 1 ? 4 : 1, 0, 0], text: texto, fillColor: "#E5E5E5" }]],
          },
          layout: "noBorders",
        },
      ],
    };
  }

  bloqueArea() {
    return {
      width: "3.6%",
      stack: [
        {
          marginTop: 3,
          table: {
            widths: ["100%"],
            body: [[{ margin: [-3, -2, 0, -2], text: "Área" }]],
          },
          layout: "noBorders",
        },
        {
          marginTop: 2,
          table: {
            heights: [4, 4, 4, 4],
            body: [
              [{ text: "MG", margin: [0, -2, 0, -2], fillColor: "#E5E5E5" }],
              [{ text: "MF", margin: [0, -2, 0, -2], fillColor: "#E5E5E5" }],
              [{ text: "AL", margin: [0, -2, 0, -2], fillColor: "#E5E5E5" }],
              [{ text: "PS", margin: [0, -2, 0, -2], fillColor: "#E5E5E5" }],
            ],
          },
          layout: {
            hLineWidth: function (i) {
              return i >= 1 && i <= 3 ? 1 : 0;
            },
            vLineWidth: function () {
              return 0;
            },
          },
        },
      ],
    };
  }

  bloquePuntuacion(rango) {
    return {
      width: "5.8%",
      stack: [
        {
          marginTop: 3,
          table: {
            widths: ["50%", "50%"],
            body: [
              [
                { margin: [-1, -2, 0, -2], text: "PD" },
                { margin: [0, -2, 0, -2], text: "PT" },
              ],
            ],
          },
          layout: {
            hLineWidth: function () {
              return 0;
            },
            vLineWidth: function (i) {
              return i == 1 ? 1 : 0;
            },
          },
        },
        {
          marginTop: 2,
          table: {
            widths: ["50%", "50%"],
            heights: [4, 4, 4, 4],
            body: [
              [
                {
                  text: rango == this.rango_edit ? parseInt(this.dato_pyp2.MG.pt_directa_ead3_mg) : "",
                  margin: [-3, -2, 0, -2],
                  fillColor: "#E5E5E5",
                },
                {
                  text: rango == this.rango_edit ? parseInt(this.dato_pyp2.MG.pt_tipica_ead3_mg) : "",
                  margin: [-3, -2, 0, -2],
                  fillColor: "#E5E5E5",
                },
              ],
              [
                {
                  text: rango == this.rango_edit ? parseInt(this.dato_pyp2.MF.pt_directa_ead3_mf) : "",
                  margin: [-3, -2, 0, -2],
                  fillColor: "#E5E5E5",
                },
                {
                  text: rango == this.rango_edit ? parseInt(this.dato_pyp2.MF.pt_tipica_ead3_mf) : "",
                  margin: [-3, -2, 0, -2],
                  fillColor: "#E5E5E5",
                },
              ],
              [
                {
                  text: rango == this.rango_edit ? parseInt(this.dato_pyp2.AL.pt_directa_ead3_al) : "",
                  margin: [-3, -2, 0, -2],
                  fillColor: "#E5E5E5",
                },
                {
                  text: rango == this.rango_edit ? parseInt(this.dato_pyp2.AL.pt_tipica_ead3_al) : "",
                  margin: [-3, -2, 0, -2],
                  fillColor: "#E5E5E5",
                },
              ],
              [
                {
                  text: rango == this.rango_edit ? parseInt(this.dato_pyp2.PS.pt_directa_ead3_ps) : "",
                  margin: [-3, -2, 0, -2],
                  fillColor: "#E5E5E5",
                },
                {
                  text: rango == this.rango_edit ? parseInt(this.dato_pyp2.PS.pt_tipica_ead3_ps) : "",
                  margin: [-3, -2, 0, -2],
                  fillColor: "#E5E5E5",
                },
              ],
            ],
          },
          layout: {
            hLineWidth: function (i) {
              return i >= 1 && i <= 3 ? 1 : 0;
            },
            vLineWidth: function (i) {
              return i == 1 ? 1 : 0;
            },
          },
        },
      ],
    };
  }

  bloqueResultado(rango) {
    let titulos = [];
    this.marginTabla = [-3.5, -2, -3.5, -2];

    for (let i = 14; i < 64; i++) {
      if (i == 14) {
        titulos.push({ text: "0", margin: this.marginTabla });
      } else if (i == 15) {
        titulos.push({ text: "<<", margin: this.marginTabla });
      } else if (i >= 16 && i < 62) {
        titulos.push({ text: i, margin: this.marginTabla });
      } else if (i == 62) {
        titulos.push({ text: ">>", margin: this.marginTabla });
      } else if (i == 63) {
        titulos.push({ text: "100", margin: this.marginTabla });
      }
    }

    let filaMG = [];
    let filaMF = [];
    let filaAL = [];
    let filaPS = [];

    let colors = {
      red: "#D32F2F",
      yellow: "#FDD835",
      green: "#558B2F",
    };

    for (let i = 14; i < 64; i++) {
      switch (rango) {
        case 1:
          if (i >= 14 && i <= 35) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 36 && i <= 47) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 48 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 31) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 31 && i <= 51) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.yellow));
          } else if (i >= 42 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 19) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 20 && i <= 29) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 30 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 16) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 17 && i <= 33) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.yellow));
          } else if (i >= 34 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
        case 2:
          if (i >= 14 && i <= 30) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 31 && i <= 40) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 41 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 25) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 26 && i <= 32) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.yellow));
          } else if (i >= 33 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 30) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 31 && i <= 39) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 39 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 33) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 34 && i <= 40) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.yellow));
          } else if (i >= 41 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
        case 3:
          if (i >= 14 && i <= 32) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 33 && i <= 41) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 42 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 33) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 34 && i <= 39) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.yellow));
          } else if (i >= 40 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 24) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 24 && i <= 40) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 41 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 33) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 34 && i <= 39) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.yellow));
          } else if (i >= 40 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
        case 4:
          if (i >= 14 && i <= 36) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 37 && i <= 43) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 44 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 38) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 39 && i <= 45) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.yellow));
          } else if (i >= 46 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 26) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 27 && i <= 41) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 42 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 33) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 34 && i <= 39) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.yellow));
          } else if (i >= 40 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
        case 5:
          if (i >= 14 && i <= 34) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 35 && i <= 40) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 41 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 38) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 39 && i <= 44) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.yellow));
          } else if (i >= 45 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 35) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 36 && i <= 42) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 43 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 45) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 46 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
        case 6:
          if (i >= 14 && i <= 33) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 34 && i <= 39) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 40 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 45) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 46 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 38) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 39 && i <= 44) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 45 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 37) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 38 && i <= 41) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.yellow));
          } else if (i >= 42 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
        case 7:
          if (i >= 14 && i <= 32) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 33 && i <= 42) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 43 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 34) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 35 && i <= 40) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.yellow));
          } else if (i >= 41 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 33) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 34 && i <= 43) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 44 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 30) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 31 && i <= 39) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.yellow));
          } else if (i >= 40 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
        case 8:
          if (i >= 14 && i <= 29) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 30 && i <= 38) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 39 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 34) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 35 && i <= 40) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.yellow));
          } else if (i >= 41 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 32) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 33 && i <= 42) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 43 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 29) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 30 && i <= 41) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.yellow));
          } else if (i >= 42 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
        case 9:
          if (i >= 14 && i <= 32) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 33 && i <= 40) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 41 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 32) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 33 && i <= 38) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.yellow));
          } else if (i >= 39 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 30) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 31 && i <= 39) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 40 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 30) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 31 && i <= 42) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.yellow));
          } else if (i >= 43 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
        case 10:
          if (i >= 14 && i <= 33) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 34 && i <= 42) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 43 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 29) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 30 && i <= 42) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.yellow));
          } else if (i >= 43 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 33) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 34 && i <= 42) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 43 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 32) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 33 && i <= 40) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.yellow));
          } else if (i >= 41 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
        case 11:
          if (i >= 14 && i <= 29) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 30 && i <= 42) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 43 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 34) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 35 && i <= 40) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.yellow));
          } else if (i >= 41 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 34) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 35 && i <= 40) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 41 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 32) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 33 && i <= 38) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.yellow));
          } else if (i >= 39 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
        case 12:
          if (i >= 14 && i <= 36) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.red));
          } else if (i >= 37 && i <= 50) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.yellow));
          } else if (i >= 51 && i <= 63) {
            filaMG.push(this.evaluar_puntuacion(rango, i, "MG", colors.green));
          }

          // MF
          if (i >= 14 && i <= 36) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.red));
          } else if (i >= 37 && i <= 45) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.yellow));
          } else if (i >= 46 && i <= 63) {
            filaMF.push(this.evaluar_puntuacion(rango, i, "MF", colors.green));
          }

          // AL
          if (i >= 14 && i <= 30) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.red));
          } else if (i >= 31 && i <= 46) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.yellow));
          } else if (i >= 47 && i <= 63) {
            filaAL.push(this.evaluar_puntuacion(rango, i, "AL", colors.green));
          }

          // PS
          if (i >= 14 && i <= 38) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.red));
          } else if (i >= 39 && i <= 60) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.yellow));
          } else if (i >= 61 && i <= 63) {
            filaPS.push(this.evaluar_puntuacion(rango, i, "PS", colors.green));
          }
          break;
      }
    }

    return {
      width: "9.5%",
      stack: [
        {
          marginTop: 3,
          marginLeft: 5,
          table: {
            body: [titulos],
          },
          layout: {
            hLineWidth: function (i, node) {
              return 0;
            },
            vLineWidth: function (i, node) {
              return i >= 1 && i < 50 ? 1 : 0;
            },
          },
        },
        {
          marginTop: 2,
          marginLeft: 5,
          table: {
            heights: [4, 4, 4, 4],
            body: [filaMG, filaMF, filaAL, filaPS],
          },
          layout: {
            hLineWidth: function (i, node) {
              return i >= 1 && i <= 3 ? 1 : 0;
            },
            vLineWidth: function (i, node) {
              return i >= 1 && i < 50 ? 1 : 0;
            },
            vLineColor: function (i, node) {
              return "white";
            },
            hLineColor: function (i, node) {
              return "white";
            },
          },
        },
      ],
    };
  }

  evaluar_puntuacion(rango, indice, orden, color) {
    if (
      indice == 14 &&
      rango == this.rango_edit &&
      this.dato_pyp2[orden][`pt_tipica_ead3_${orden.toLowerCase()}`] == 0
    ) {
      return { text: "X", color: "white", bold: true, fillColor: color, margin: this.marginTabla };
    } else if (
      indice == 15 &&
      rango == this.rango_edit &&
      this.dato_pyp2[orden][`pt_tipica_ead3_${orden.toLowerCase()}`] < 16 &&
      this.dato_pyp2[orden][`pt_tipica_ead3_${orden.toLowerCase()}`] > 0
    ) {
      return { text: "X", color: "white", bold: true, fillColor: color, margin: this.marginTabla };
    } else if (
      indice >= 16 &&
      indice <= 61 &&
      rango == this.rango_edit &&
      this.dato_pyp2[orden][`pt_tipica_ead3_${orden.toLowerCase()}`] == parseInt(indice)
    ) {
      return { text: "X", color: "white", bold: true, fillColor: color, margin: this.marginTabla };
    } else if (
      indice == 62 &&
      rango == this.rango_edit &&
      this.dato_pyp2[orden][`pt_tipica_ead3_${orden.toLowerCase()}`] >= 62 &&
      this.dato_pyp2[orden][`pt_tipica_ead3_${orden.toLowerCase()}`] < 100
    ) {
      return { text: "X", color: "white", bold: true, fillColor: color, margin: this.marginTabla };
    } else if (
      indice == 63 &&
      rango == this.rango_edit &&
      this.dato_pyp2[orden][`pt_tipica_ead3_${orden.toLowerCase()}`] == 100
    ) {
      return { text: "X", color: "white", bold: true, fillColor: color, margin: this.marginTabla };
    } else {
      return { text: "", color: "white", bold: true, fillColor: color, margin: this.marginTabla };
    }
  }

  preguntas_PYP2I() {
    return {
      MG: [
        { text: "Realiza reflejo de búsqueda y reflejo de succión.", model: "reflej_busq_succi" },
        { text: "El reflejo de moro está presente y es simétrico.", model: "reflej_moro_pres_simet" },
        { text: "Mueve sus extremidades.", model: "mueve_extremidades" },
        { text: "Sostiene la cabeza al levantarlo de los brazos.", model: "sost_cabe_levan_braz" },
        { text: "Levanta la cabeza y pecho en prono", model: "levan_cabe_pecho_prono" },
        { text: "Gira la cabeza desde la línea media.", model: "gira_cobe_ln_media" },
        { text: "Control de cabeza sentado con apoyo.", model: "contr_cabe_sent_apo" },
        { text: "Se voltea.", model: "se_voltea" },
        { text: "Se mantiene sentado momentáneamente.", model: "se_mant_sent_moment" },
        { text: "Se mantiene sentado sin apoyo.", model: "se_mant_sent_sin_apo" },
        { text: "Adopta la posición de sentado..", model: "adopt_posic_sentado" },
        { text: "Se arrastra en posición prono.", model: "se_arrast_posic_prono" },
        { text: "Gatea con desplazamiento cruzado (alternando rodillas y manos).", model: "gatea_despla_curzado" },
        { text: "Adopta posición bípeda y se sostiene de pie con apoyo.", model: "adopt_posic_bipe_apo" },
        { text: "Se sostiene de pie sin apoyo.", model: "se_sost_pie_sin_apo" },
        { text: "Se pone de pie sin ayuda.", model: "pone_de_pie_sin_ayuda" },
        { text: "Da pasos solo(a).", model: "pasos_solo" },
        {
          text: "Camina con desplazamiento cruzado sin ayuda (alternando brazos y pies).",
          model: "camin_desp_cruz_sin_ayud",
        },
        { text: "Corre.", model: "corre" },
        { text: "Lanza la pelota.", model: "lanza_pelota" },
        { text: "Patea la pelota.", model: "patea_pelota" },
        { text: "Salta con los pies juntos.", model: "salta_pies_juntos" },
        { text: "Se empina en ambos pies.", model: "se_empina_ambos_pies" },
        { text: "Sube dos escalones sin apoyo.", model: "sube_2_escal_sin_apo" },
        { text: "Camina en puntas de pies.", model: "camin_punta_pies" },
        { text: "Se para en un solo pie.", model: "se_para_1_pie" },
        { text: "Baja dos escalones con apoyo mínimo, alternando los pies.", model: "baja_2_escal_sin_apo" },
        { text: "Camina sobre una línea recta sin apoyo visual.", model: "camin_ln_rect_sin_apo" },
        { text: "Camina sobre una línea recta sin apoyo visual.", model: "salta_3_un_pie" },
        { text: "Hace rebotar y agarra la pelota.", model: "rebota_agarra_pelota" },
        { text: "Hace 'caballitos' (alternando los pies).", model: "hace_caballitos" },
        { text: "Salta de lado a lado de una línea con los pies juntos.", model: "salt_lado_ln_pies_junt" },
        { text: "Salta desplazándose con ambos pies.", model: "salt_despla_ambos_pies" },
        {
          text: "Mantiene el equilibrio en la punta de los pies con los ojos cerrados.",
          model: "equi_punt_pies_ojos_cer",
        },
        { text: "Realiza saltos alternados en secuencia.", model: "saltos_alter_secuenc" },
        { text: "Realiza alguna actividad de integración motora.", model: "real_activ_integ_motora" },
      ],

      MF: [
        { text: "Reflejo de prensión palmar.", model: "reflej_presion_palmar" },
        { text: "Reacciona ante luz y sonidos.", model: "reacc_luz_sonidos" },
        { text: "Sigue movimiento horizontal.", model: "sigue_movi_horiz" },
        { text: "Abre y mira sus manos.", model: "abre_mira_sus_manos" },
        { text: "Sostiene objeto en la mano.", model: "sotiene_obj_mano" },
        { text: "Se lleva un objeto a la boca.", model: "lleva_obj_boca" },
        { text: "Agarra objetos voluntariamente.", model: "agarra_obj_volunt" },
        { text: "Retiene un objeto cuando se lo intentan quitar.", model: "ret_obj_quitar" },
        { text: "Pasa objeto de una mano a otra.", model: "pasa_obj_manos" },
        { text: "Sostiene un objeto en cada mano.", model: "sost_obj_cada_mano" },
        { text: "Deja caer los objetos intencionalmente.", model: "deja_caer_obj_inten" },
        { text: "Agarra con pulgar e índice (pinza).", model: "agarra_pulgar_indice" },
        { text: "Agarra tercer objeto sin soltar otros.", model: "agarra_terc_obj_sin_solt" },
        { text: "Saca objetos del contenedor.", model: "saca_obj_contenedor" },
        { text: "Busca objetos escondidos.", model: "busca_obj_escondido" },
        { text: "Hace torre de tres cubos.", model: "hace_torre_3_cubos" },
        { text: "Pasa hojas de un libro.", model: "pasa_hojas_libro" },
        { text: "Agarra una cuchara y se la lleva a la boca.", model: "agarra_cuchara_llev_boca" },
        { text: "Garabatea espontáneamente.", model: "garabatea_expont" },
        { text: "Quita la tapa del contenedor o frasco de muestra de orina.", model: "quita_tapa_contenedor" },
        { text: "Hace torre de cinco cubos.", model: "hace_torre_5_cubos" },
        { text: "Ensarta cuentas perforadas con pinza.", model: "ensart_cuent_perf_pinza" },
        { text: "Rasga papel con pinza de ambas manos.", model: "rasg_pap_pinza_2_manos" },
        { text: "Copia línea horizontal y vertical.", model: "copia_ln_vert_horiz" },
        { text: "Hace una bola de papel con sus dedos.", model: "hace_bola_pap_dedos" },
        { text: "Copia círculo.", model: "copia_circulo" },
        { text: "Figura humana rudimentaria.", model: "fig_humana_rudiment" },
        { text: "Imita el dibujo de una escalera.", model: "imita_dibujo_escalera" },
        { text: "Corta papel con las tijeras.", model: "cort_pap_tijera" },
        { text: "Figura humana 2.", model: "fig_humana_2" },
        { text: "Dibuja el lugar en el que vive.", model: "dibuja_hogar" },
        { text: "Modelo de cubos 'escalera'.", model: "mod_cubos_escalera" },
        { text: "Copia un triángulo.", model: "copia_triangulo" },
        { text: "Copia una figura de puntos.", model: "copia_fig_puntos" },
        { text: "Puede hacer una figura plegada.", model: "hace_fig_plegada" },
        { text: "Ensarta cordón cruzado (como amarrarse los zapatos).", model: "ensart_cordon_cruzado" },
      ],

      AL: [
        { text: "Se sobresalta con un ruido.", model: "se_sobresalta_ruido" },
        { text: "Contempla momentáneamente a una persona.", model: "contemp_moment_persona" },
        { text: "Llora para expresar necesidades.", model: "llora_expre_necesi" },
        { text: "Se tranquiliza con la voz humana.", model: "se_tranq_voz_humana" },
        { text: "Produce sonidos guturales indpiferenciados.", model: "produc_soni_gutur_indif" },
        { text: "Busca el sonido con la mirada.", model: "busc_soni_mirada" },
        { text: "Busca diferentes sonidos con la mirada.", model: "busc_dif_soni_mirada" },
        { text: "Pone atención a la conversación.", model: "pone_atenc_conversacion" },
        { text: "Produce cuatro o más sonidos diferentes.", model: "produc_4_mas_soni_dif" },
        { text: "Pronuncia tres o más sílabas.", model: "pronunc_3_mas_silabas" },
        { text: "Reacciona cuando se le llama por su nombre.", model: "reacc_llamado_nomre" },
        { text: "Reacciona a tres palabras familiares.", model: "reacc_3_palabas_dif" },
        { text: "Reacciona a la palabra no.", model: "reacc_palab_no" },
        { text: "Llama al cuidador.", model: "llama_cuidador" },
        { text: "Responde a una instrucción sencilla.", model: "resp_instruc_sencilla" },
        { text: "Aproximación a una palabra con intención comunicativa.", model: "aprox_palab_intenc_comu" },
        { text: "Reconoce al menos 6 objetos o imágenes.", model: "recon_6_obj_imag" },
        { text: "Sigue instrucciones de dos pasos.", model: "sigue_instruc_2_pasos" },
        { text: "Nombre cinco objetos de una imagen.", model: "nombra_5_obj_imag" },
        { text: "Utiliza más de 20 palabras.", model: "uti_mas_20_palab" },
        { text: "Usa frases de dos palabras.", model: "usa_frac_2_palab" },
        { text: "Dice su nombre completo.", model: "dice_nom_completo" },
        { text: "Dice frases de 3 palabras.", model: "dice_frac_3_palab" },
        { text: "Reconoce cualidades de los objetos.", model: "recon_cualid_obj" },
        { text: "Define por su uso cinco objetos.", model: "define_uso_5_obj" },
        { text: "Hace comparativos.", model: "hace_comparativos" },
        { text: "Describe el dibujo.", model: "describe_dibujo" },
        { text: "Reconoce 5 colores.", model: "recon_5_colores" },
        { text: "Responde tres preguntas sobre un relato.", model: "resp_3_preg_relato" },
        { text: "Elabora un relato a partir de una imagen.", model: "elab_relato_imag" },
        { text: "Expresa opiniones.", model: "expresa_opiniones" },
        { text: "Repite palabras con pronunciación correcta.", model: "repit_palb_pronunc_corr" },
        { text: "Absurdos visuales.", model: "absurdos_visuales" },
        { text: "Identifica palabras que inician con sonidos parecidos", model: "ident_palab_soni_parec" },
        { text: "Conoce: ayer, hoy y mañana.", model: "conoce_ayer_hoy_man" },
        { text: "Ordena una historia y la relata.", model: "ordena_hist_relata" },
      ],

      PS: [
        { text: "Se tranquiliza cuando se toma entre los brazos.", model: "tranq_toma_brazos" },
        { text: "Responde a las caricias.", model: "resp_caricias" },
        { text: "El bebé ya está registrado(a).", model: "bebe_registrado" },
        { text: "Reconoce la voz del cuidador principal.", model: "recon_voz_cuidador_ppal" },
        { text: "Sonrisa social.", model: "sonrisa_social" },
        { text: "Responde a una conversación.", model: "resp_conversacion" },
        { text: "Coge las manos del examinador.", model: "coge_manos_examin" },
        { text: "Ríe a carcajadas.", model: "rie_carcajadas" },
        { text: "Busca la continuación del juego.", model: "busc_conti_juego" },
        { text: "Reacciona con desconfianza ante el extraño.", model: "reacc_desconf_extrano" },
        { text: "Busca apoyo del cuidador.", model: "busc_apoyo_cuidador" },
        { text: "Reacciona a su imagen en el espejo.", model: "reacc_imag_espejo" },
        { text: "Participa en juegos.", model: "participa_juegos" },
        { text: "Muestra interés o intención en alimentarse solo.", model: "int_aliment_solo" },
        { text: "Explora el entorno.", model: "explora_entorno" },
        { text: "Seguimiento de rutinas.", model: "sigue_rutinas" },
        { text: "Ayuda a desvestirse.", model: "ayuda_desvestirse" },
        { text: "Señala 5 partes de su cuerpo.", model: "senala_5_part_cuerpo" },
        { text: "Acepta y tolera el contacto de su piel con diferentes texturas.", model: "acce_tol_cont_piel_text" },
        { text: "Expresa su satisfacción cuando logra o consigue algo.", model: "expresa_satisf_logro" },
        { text: "Identifica emociones básicas en una imagen.", model: "ident_emoci_basic_imag" },
        { text: "Identifica qué es de él y qué es de otros.", model: "ident_obj_prop_otros" },
        { text: "Dice nombres de las personas con quien vive o comparte.", model: "dice_nomb_famil_cerc" },
        {
          text: "Expresa verbalmente emociones básicas (tristeza, alegría, miedo, rabia).",
          model: "expresa_verb_emoci",
        },
        { text: "Rechaza la ayuda del cuidador cuando desea o hace algo por sí mismo.", model: "recha_ayud_int_solo" },
        { text: "Comparte juego con otros(as) niños(as).", model: "compart_juegos_otros" },
        { text: "Reconoce las emociones básicas de los otros(as).", model: "recon_emoci_otros" },
        { text: "Puede vestirse y desvestirse solo(a).", model: "puede_vest_desv_solo" },
        { text: "Propone juegos.", model: "propone_juegos" },
        { text: "Sabe cuántos años tiene.", model: "sabe_su_edad" },
        { text: "Participa en juegos respetando reglas y turnos.", model: "part_juego_resp_reglas" },
        { text: "Comenta vida familiar.", model: "comenta_vida_familiar" },
        { text: "Colabora por iniciativa propia con actividades cotidianas.", model: "colab_inici_prop_activ" },
        {
          text: "Manifiesta emoción ante acontecimientos importantes de su gruporsocial.",
          model: "manif_emoc_acomt_import",
        },
        { text: "Reconocimiento de normas o prohibiciones.", model: "recon_norma_prohib" },
        { text: "Reconoce emociones complejas (culpa, pena, frustración, etc.).", model: "recon_emoci_complejas" },
      ],
    };
  }
}

const imprimir_PYP2I = function (params) {
  var formato = new formato_PYP2I(params);
  formato._init();
};

module.exports = {
  imprimir_PYP2I,
};
