/** @format */

class formato_HCI9013 {
  constructor(params) {
    this.hcprc = params.hcprc;
    this.detalles = params.detalles;
    this.opciones = params.opciones;
    this.paci = params.paci;
    this.datos = {};
    this.dato_9013 = {};
  }

  _init() {
    this.leer_historia();
  }

  leer_historia() {
    if (this.hcprc.novedad == 8) {
      this.leer_detalles();
    } else {
      CON851("", "08", null, "error", "Error");
    }
  }

  leer_detalles() {
    let ws9013 = this.detalles.find((e) => e["COD-DETHC"] == "9013" && e["LLAVE-HC"] == this.hcprc.llave);
    this.dato_9013 = ws9013 ? ws9013.DETALLE : false;

    if (this.dato_9013) this.encabezado();
    // else CON851("", "Error en impresión, informacion no encontrada", null, "error", "Error");
  }

  encabezado() {
    console.log("encabezado HCI9013");

    this.datos.encabezado = {
      nombre: $_USUA_GLOBAL[0].NOMBRE,
      nit: $_USUA_GLOBAL[0].NIT,
      titulo: "INSTRUMENTO MINIMENTAL",
    };

    this.datos.paciente = llenarPacienteAperturas_impHc(this.paci, this.hcprc);

    this.cerrar_archivos();
  }

  async cerrar_archivos() {
    this._imprimir()
      .then(async () => {
        if (this.opciones.opc_resu == "N") {
          await _impresion2({
            tipo: "pdf",
            archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmss")}.pdf`,
            content: formatoBaseImp_Hc,
          }).catch((err) => {
            console.error(err);
          });
        }
      })
      .catch((error) => {
        console.error(error);
        CON851("", "Error en impresion 8051", null, "error", "Error");
      });
  }

  _imprimir() {
    return new Promise((resolve, reject) => {
      if (this.opciones.opc_resu == "N") {
        inicializarFormatoBase_impHc();
        formatoBaseImp_Hc.images = {
          logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT),
        };
        formatoBaseImp_Hc.pageMargins = [35, 143, 35, 60];
        formatoBaseImp_Hc.header = encabezadoAperturas_impHc(this.datos);
      }

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
    return [
      {
        unbreakable: true,
        style: "center8",
        table: {
          widths: ["5%", "20%", "20%", "44%", "11%"],
          body: [
            [{ text: "INSTRUMENTO MINIMENTAL", style: "center10BoldT", colSpan: 5 }, {}, {}, {}, {}],
            [
              { text: "No.", style: "center10BoldT" },
              { text: "Puntaje acumulado", style: "center10BoldT" },
              { colSpan: 2, text: "ORIENTACIÓN", style: "center10BoldT" },
              {},
              { text: "Puntuación", style: "center10BoldT" },
            ],
            [
              { text: "1.", bold: true, marginTop: 25, rowSpan: 5 },
              { text: `${this.puntajeAcuOriFecha()}/5`, marginTop: 25, rowSpan: 5 },
              { text: "Diga en qué", bold: true, marginTop: 25, rowSpan: 5 },
              { text: ["1. Año", { text: "                       Estamos", bold: true }], style: "left8" },
              { text: `${this.dato_9013.orientacion.ano_mnse}` },
            ],
            [{}, {}, {}, { text: "2. Mes", style: "left8" }, { text: `${this.dato_9013.orientacion.mes_mnse}` }],
            [{}, {}, {}, { text: "3. Día", style: "left8" }, { text: `${this.dato_9013.orientacion.dia_mnse}` }],
            [
              {},
              {},
              {},
              { text: "4. Fecha de hoy (día de la semana)", style: "left8" },
              { text: `${this.dato_9013.orientacion.dia_semana_mnse}` },
            ],
            [{}, {}, {}, { text: "5. Hora", style: "left8" }, { text: `${this.dato_9013.orientacion.hora_mnse}` }],
            [
              { text: "2.", bold: true, marginTop: 28, rowSpan: 5 },
              { text: `${this.puntajeAcuOriLugar()}/5`, marginTop: 28, rowSpan: 5 },
              { text: "Diga en qué", bold: true, marginTop: 25, rowSpan: 5 },
              { text: ["1. País", { text: "                       Estamos", bold: true }], style: "left8" },
              { text: `${this.dato_9013.orientacion.pais_mnse}` },
            ],
            [{}, {}, {}, { text: "2. Ciudad", style: "left8" }, { text: `${this.dato_9013.orientacion.ciudad_mnse}` }],
            [
              {},
              {},
              {},
              { text: "3. Departamento", style: "left8" },
              { text: `${this.dato_9013.orientacion.departamento_mnse}` },
            ],
            [
              {},
              {},
              {},
              { text: "4. Sitio o lugar", style: "left8" },
              { text: `${this.dato_9013.orientacion.lugar_mnse}` },
            ],
            [
              {},
              {},
              {},
              { text: "5. Piso/barrio/vereda", style: "left8" },
              { text: `${this.dato_9013.orientacion.barrio_mnse}` },
            ],

            [
              { text: "No.", style: "center10BoldT" },
              { text: "Puntaje acumulado", style: "center10BoldT" },
              { colSpan: 2, text: "MEMORIA", style: "center10BoldT" },
              {},
              { text: "Puntuación", style: "center10BoldT" },
            ],
            [
              { text: "3.", bold: true, marginTop: 15 },
              { text: `${this.dato_9013.memoria.memoria_mnse || 0}/3`, marginTop: 15 },
              {
                text: [
                  "Diga las siguientes palabras",
                  { text: " CASA, MESA, ÁRBOL", bold: true },
                  ". Un segundo por cada una. Luego pida a la persona que las repita. Asignándole un punto por cada una. Si en un primer intento no logra repetir las palabras, repítalas hasta que la persona las registre.",
                  `\nAnote el número de ensayos requeridos: ${this.dato_9013.memoria.inten_memoria_mnse}`,
                ],
                style: "left8",
                colSpan: 2,
              },
              {},
              { text: `${this.dato_9013.memoria.memoria_mnse}`, marginTop: 15 },
            ],

            [
              { text: "No.", style: "center10BoldT" },
              { text: "Puntaje acumulado", style: "center10BoldT" },
              { colSpan: 2, text: "ATENCIÓN Y CÁLCULO", style: "center10BoldT" },
              {},
              { text: "Puntuación", style: "center10BoldT" },
            ],
            [
              { text: "4.", bold: true, marginTop: 15 },
              { text: `${this.dato_9013.atencion_calculo.calculo_mnse || 0}/5`, marginTop: 15 },
              {
                colSpan: 2,
                text: [
                  "Reste ",
                  { text: "100 -7", bold: true },
                  " en forma sucesiva durante 5 veces. Registre un punto por cada respuesta correcta: ",
                  { text: "93-86-79-72-65", bold: true },
                  " .En el caso que la persona no sepa restar utilizar la siguiente alternativa: Decir los meses del año al revés:",
                  { text: "Diciembre, noviembre, octubre, septiembre, agosto", bold: true },
                  " .",
                ],
                style: "left8",
              },
              {},
              { text: `${this.dato_9013.atencion_calculo.calculo_mnse}`, marginTop: 15 },
            ],

            [
              { text: "No.", style: "center10BoldT" },
              { text: "Puntaje acumulado", style: "center10BoldT" },
              { colSpan: 2, text: "EVOCACIÓN", style: "center10BoldT" },
              {},
              { text: "Puntuación", style: "center10BoldT" },
            ],
            [
              { text: "5.", bold: true },
              { text: `${this.dato_9013.evocacion.evocacion_mnse || 0}/3` },
              {
                colSpan: 2,
                text: "De las palabras anteriormente mencionadas, diga las palabras que recuerde.",
                style: "left8",
              },
              {},
              { text: `${this.dato_9013.evocacion.evocacion_mnse}` },
            ],

            [
              { text: "No.", style: "center10BoldT" },
              { text: "Puntaje acumulado", style: "center10BoldT" },
              { colSpan: 2, text: "LENGUAJE", style: "center10BoldT" },
              {},
              { text: "Puntuación", style: "center10BoldT" },
            ],
            [
              { text: "6.", bold: true },
              { text: `${this.dato_9013.lenguaje.lenguaje1_mnse || 0}/2` },
              {
                colSpan: 2,
                text: "Mostrar un lápiz y un reloj y preguntar el nombre de los objetos (Denominación)",
                style: "left8",
              },
              {},
              { text: `${this.dato_9013.lenguaje.lenguaje1_mnse}` },
            ],
            [
              { text: "7.", bold: true },
              { text: `${this.dato_9013.lenguaje.lenguaje2_mnse || 0}/1` },
              {
                colSpan: 2,
                text: "Hay que pedirque repita la siguiente frase: En el trigal había cinco perros.",
                style: "left8",
              },
              {},
              { text: `${this.dato_9013.lenguaje.lenguaje2_mnse || 0}` },
            ],
            [
              { text: "8.", bold: true, marginTop: 15 },
              { text: `${this.dato_9013.lenguaje.lenguaje3_mnse || 0}/3`, marginTop: 15 },
              {
                colSpan: 2,
                text: [
                  "Comprensión obedecer una orden en ",
                  { text: "tres etapas", bold: true },
                  ":A continuación,le voy a dar una orden, escúchela toda y realícela: ",
                  {
                    text: "Tome esta hoja de papel con su mano derecha, dóblela por la mitad y póngala en el piso.",
                    bold: true,
                  },
                  " (De un punto por cada una de las ordenes ejecutadas correctamente).",
                ],
                style: "left8",
              },
              {},
              { text: `${this.dato_9013.lenguaje.lenguaje3_mnse}`, marginTop: 15 },
            ],
            [
              { text: "9.", bold: true, marginTop: 9 },
              { text: `${this.dato_9013.lenguaje.lenguaje4_mnse || 0}/1`, marginTop: 9 },
              {
                colSpan: 2,
                text:
                  "Para las siguientes dos órdenes utilice una tarjeta u hoja de papel que contenga la frase: “cierre sus ojos”. Indique: \n Hay que pedir que lea y ejecute lo que dice la frase que contiene la tarjeta. (Lectura)",
                style: "left8",
              },
              {},
              { text: `${this.dato_9013.lenguaje.lenguaje4_mnse}`, marginTop: 9 },
            ],
            [
              { text: "10.", bold: true },
              { text: `${this.dato_9013.lenguaje.lenguaje5_mnse || 0}/1` },
              {
                colSpan: 2,
                text: "Hay que pedirque escriba la frase que contiene la tarjeta. (Escritura)",
                style: "left8",
              },
              {},
              { text: `${this.dato_9013.lenguaje.lenguaje5_mnse}` },
            ],
            [
              { text: "11.", bold: true, marginTop: 35 },
              { text: `${this.dato_9013.lenguaje.lenguaje6_mnse || 0}/1`, marginTop: 35 },
              {
                colSpan: 2,
                stack: [
                  {
                    text:
                      "Indique a la persona que copie el siguiente diseño (dos pentágonos cruzados en un ángulo) (Dibujo):",
                    style: "left8",
                  },
                  {
                    image:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAAC5CAIAAAA+mMSzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAx6SURBVHhe7d19TJV1G8DxM23SwNKFpZlsOqnMBUWzF3XaLLIXmq3UctF6IVk4rIy0ZWKlZptFajhpJKsWzVJr2egpo9woX0qXLRpmybBhzRw2K2WTjZrPFdf1nEfwLRDhvu77+/kLr9/hcM6P++s5BzjnxA4DcIh0AZdIF3CJdAGXSBdwiXQBl0gXcIl0AZdIF3CJdEPoPwg8+1adAtINm0WLFsUQbGeffbZ9t04B6YZKVVWVHR0IMNJFK01NTcOHD9eDY+TIkXMRPMnJyaSLtnJycrTbsWPH2ggBc9FFF5EuWiktLdVue/XqVVNTY1MEDOmilerq6p49e2q6ZWVlNkXwkC5aGTVqlHabm5trIwQS6eL/CgoKtNu0tLTm5mabIpBIF2bVqlXardi4caNNEVSki3/U19frLxtEUVGRTRFgpIt/ZGVlabeTJ0+2EYKNdHF4/vz52m1KSsq+fftsimAj3airrKzUbkVFRYVNEXikexqtWLFiyJAhEyZM+Oqrr2wUMH/++efQoUO128LCQpvCA9I9LdauXXvVVVdpEurBBx+sq6uz5cDIzs7Wi5eZmWkjOEG6nWzTpk3xH/kc7cknnzxw4ICdtLsVFxfrpTrrrLNqa2ttCidIt9Ps3Lnz/vvv1xjUyJEjP/zww+eff7537942isWSk5Nfeukl+5zus3XrVrtAsVh5eblN4QfpdoLff/991qxZmoFKTU19/fXXbfnw4d9+++2xxx6ztRbDhg178803bbk7jBgxQi/J9OnTbQRXSPdUvfDCC3379tUMRJ8+fWRia63t2LHjnnvusdO1GDNmzMcff2zLXSg/P18vgARsI3hDuh0nt6sXXnihNqBmzpwpt8C2fBxffPHFjTfeaJ/Q4o477vj6669t+fSTu8f2hWMxudtsU3hDuh0hj2Djz7BR9913nzzWteV/4d13373iiivsk1s89NBD9fX1tnzayIWMP/BetmyZTeEQ6bbPli1bbrvtNj301S233LJp0yZbbqdXXnklJSXFzigW69GjR2Fh4aFDh2z5NMjMzNSvlZ2dbSP4RLr/1q5du6ZOnarHvbryyivXrl1ryx31999/z58//8wzz7QzjcX69+//8ssv23KnmjNnjn6J1NTU4PyOCh1Duid38ODB2bNn60GvBg8evGLFClvuDHv37n344Yft3FtceumlK1eutOXOUFFRYWcdi1VWVtoUbpHuSSxevLhfv356xIukpKSFCxfaWmf77rvvpkyZYl+pxbhx4z799FNbPgUNDQ3xe+YLFiywKTwj3eMqLy+/5JJL9HBXM2bM6IIn1qxfv/7666+3L9nizjvv/Pbbb225QyZNmqRnlZWVZSM4R7rHsG7durFjx+qxrrKzs7///ntb7hLvvPNOenq6ffkW+fn5e/bsseX2KCoq0nNITk7ugh9io2uQbivbtm2bOHGiHuhq/Pjxn3/+uS13uWXLlp1//vl2UVpeXfXZZ59t16tGbdiwwT45Flu9erVN4R/pmt27d+fl5ekhrjIyMtasWWPL3aepqenpp58+44wz7GLFYhdccMHy5ctt+YQk8rS0NP2sgoICmyIUSPfwoUOH5s6dG3/xYTFo0KCSkhJbDoaff/552rRpdvlaXH755Se9FY3/Nmv06NE2QlhEPd3i4uIBAwbo8S0SEhLmzZv3119/2XLAfPPNN/EfOKkbbrihqqrKllsrKyvT08j/StXV1TZFWEQ33bfffjt+Z1JNnz79119/teUA++STT6699lq70C3uvvvu7du323KLmpoaeWCsq6WlpTZFiEQx3c8+++y6667Tw1rddddd7m6X3nrrrfib8alHH320oaFBV8eMGaPDnJwcnSBkopWu9CmV6jGtpGEp2ZYdWrJkybnnnmtXJhZLTEx87rnn4k8elrabmprspAiXqKS7Z88euT+sB7SSe8tyn9mWPWtsbHzqqafsWrXWjb/WwukW/nSbm5vnzZuXkJCgR7MYMGBAcXGxLYfFTz/9lJuba9ewxaBBg95//31bRuiEPN2SkhI5gvVQFj169Jg7d+5pfVZd92rzR2Di5ptv5g2EQim06a5ZsyYjI0MPX5WXl7d7925bDqOFCxfqNT3nnHPavJTsvffe++OPP9rpEAohTLeqqmr8+PF6yKqJEydu27bNlkNq/fr1dm1jMX0W8RtvvKHf3biZM2fu379fTw/vQpXu9u3b468JruQO5Lp162w5vBobG+OVzp4926YtXnzxxSNf9U6+04sWLbI1eBaSdBsaGmbMmKFHpxo2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",
                    width: 100,
                    alignment: "center",
                  },
                ],
              },
              {},
              { text: `${this.dato_9013.lenguaje.lenguaje6_mnse}`, marginTop: 35 },
            ],
            [
              {},
              { text: `${this.acumulado() || 0}/30` },
              { colSpan: 2, text: "SUMATORIA PUNTAJE FINAL", bold: true },
              {},
              { text: `${this.puntajeTotalMinimental()}`, style: "center8" },
            ],
          ],
        },
      },
      {
        marginTop: 10,
        columns: [
          {
            width: "40%",
            style: "left8",
            table: {
              widths: ["80%", "20%"],
              body: [
                [
                  { text: "Alteración visual evidente (+2)", bold: true },
                  {
                    text: `${this.dato_9013.alteracion_visual.tiene_alt_visual == "S" ? "SI" : "NO"}`,
                    style: "center8",
                  },
                ],
                [
                  { text: "Mayor de 65 años (+1)", bold: true },
                  { text: `${parseInt(this.dato_9013.edad.mayor_65 || 0) ? "Si" : "No"}`, style: "center8" },
                ],
                [
                  { text: "Mayor de 75 años (+2)", bold: true },
                  { text: `${parseInt(this.dato_9013.edad.mayor_75 || 0) ? "Si" : "No"}`, style: "center8Bold" },
                ],
              ],
            },
          },
          {text: "", width: "10%"},
          {
            width: "50%",
            style: "left8",
            stack: this.descripDeterioroCognoscitivo()
              ? [
                  {
                    table: {
                      widths: ["100%"],
                      body: [
                        [
                          {
                            text: this.descripDeterioroCognoscitivo(),
                          },
                        ],
                      ],
                    },
                  },
                ]
              : [],
          },
        ],
      },
    ];
  }

  puntajeAcuOriFecha() {
    let puntaje = [
      this.dato_9013.orientacion.ano_mnse,
      this.dato_9013.orientacion.mes_mnse,
      this.dato_9013.orientacion.dia_mnse,
      this.dato_9013.orientacion.dia_semana_mnse,
      this.dato_9013.orientacion.hora_mnse,
    ].reduce((sum, current) => sum + (parseInt(current) || 0), 0);
    return puntaje || 0;
  }

  puntajeAcuOriLugar() {
    let puntaje = [
      this.dato_9013.orientacion.pais_mnse,
      this.dato_9013.orientacion.ciudad_mnse,
      this.dato_9013.orientacion.departamento_mnse,
      this.dato_9013.orientacion.lugar_mnse,
      this.dato_9013.orientacion.barrio_mnse,
    ].reduce((sum, current) => sum + (parseInt(current) || 0), 0);
    return puntaje || 0;
  }

  acumulado() {
    let acumulado = 0;
    acumulado += Object.values(this.dato_9013.orientacion).reduce((sum, current) => sum + (parseInt(current) || 0), 0);
    acumulado += parseInt(this.dato_9013.memoria.memoria_mnse || 0);
    acumulado += parseInt(this.dato_9013.atencion_calculo.calculo_mnse || 0);
    acumulado += parseInt(this.dato_9013.evocacion.evocacion_mnse || 0);
    acumulado += Object.values(this.dato_9013.lenguaje).reduce((sum, current) => sum + (parseInt(current) || 0), 0);

    return acumulado;
  }

  puntajeTotalMinimental() {
    let acumulado = this.acumulado() || 0;

    return (
      acumulado +
      parseInt(this.dato_9013.alteracion_visual.puntua_alt_visual || 0) +
      parseInt(this.dato_9013.edad.mayor_65 || 0) +
      parseInt(this.dato_9013.edad.mayor_75 || 0)
    );
  }

  descripDeterioroCognoscitivo() {
    let nivelEst = $_REG_PACI["NIV-ESTUD"];
    if (["1", "2", "3"].includes(nivelEst) && this.acumulado() <= 21)
      return `Persona  con  0 –5  años  de  escolaridad  y  puntuación de   inferior   o   igual  a  21:  Sospecha   de  deterioro cognoscitivo, remitir a psiquiatría o neurología.`;
    if (["4", "5", "6", "7"].includes(nivelEst) && this.acumulado() <= 24)
      return `Persona  con  6-12  años  de  escolaridad  y  puntuación inferior o   igual   a   24:   Sospecha   de   deterioro cognoscitivo, remitir a psiquiatría o neurología.`;
    if (["8", "9", "A", "B", "C", "D"].includes(nivelEst) && this.acumulado() <= 26)
      return `Persona   con   más   de   12   años   de   escolaridad   y puntuación inferior o igual a 26: Sospecha de deterioro cognoscitivo, remitir a psiquiatría o neurología.`;

    return false;
  }
}

const imprimir_HCI9013 = function (params) {
  var formato = new formato_HCI9013(params);
  formato._init();
};

module.exports = {
  imprimir_HCI9013,
};
