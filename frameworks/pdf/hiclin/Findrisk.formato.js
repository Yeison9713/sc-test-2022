// 11-09-2020 - IMPRESION TEST DE FINDRISK- DAVID.M - HICLIN
// 21-07-2021 - Se cambia forma de impresion - David.M

class formato_FINDRISK {
  constructor(params) {
    this.hcprc = params.hcprc;
    this.detalles = params.detalles;
    this.paci = params.paci;
    this.opciones = params.opciones || {};
    this.datos = {};
  }

  _init() {
    this.leerDetalle();
  }

  leerDetalle() {
    this.dato_9008 = this.detalles.find((e) => e["COD-DETHC"] == "9008" && e["LLAVE-HC"] == this.hcprc.llave);
    if (this.dato_9008) {
      this.dato_9008 = this.dato_9008.DETALLE;
      this.llenarEncabezado();
    }
  }

  llenarEncabezado() {
    this.datos.encabezado = {};
    this.datos.encabezado.titulo = "TEST FINDRISK";
    this.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
    this.datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;

    this.llenarDatosPaciente();
  }

  llenarDatosPaciente() {
    this.datos.paciente = llenarPacienteAperturas2_impHc(this.paci, this.hcprc);

    this.totales();
  }

  async totales() {
    this.datos.total = {};

    if (this.dato_9008.calc_riesgo_cardio) {
      switch (parseInt(this.dato_9008.calc_riesgo_cardio)) {
        case 1:
          this.datos.descrip_riesgo = "RIESGO BAJO < 10%";
          break;
        case 2:
          this.datos.descrip_riesgo = "RIESGO MODERADO 10% A < 20%";
          break;
        case 3:
          this.datos.descrip_riesgo = "RIESGO ALTO 20% A < 30%";
          break;
        case 4:
          this.datos.descrip_riesgo = "RIESGO MUY ALTO 30% A < 40%";
          break;
        case 5:
          this.datos.descrip_riesgo = "RIESGO EXTREMADAMENTE ALTO >= 40%";
          break;
        default:
          this.datos.descrip_riesgo = "";
          break;
      }
    }

    // TOTAL
    this.datos.total.fecha = _editFecha3(this.hcprc.fecha);

    this.datos.total.puntuacion = await this.calcularFindrisk();
    let calc = parseFloat(this.datos.total.puntuacion);

    if (calc > 14) this.datos.total.tipo = "RIESGO DE DIABETES. CONSULTE SU MEDICO.";
    else if (calc <= 14) this.datos.total.tipo = "SIN RIESGO DE DIABETES.";

    this.datosMedico();
  }

  datosMedico() {
    this.datos.medico = {};

    this.datos.medico.nombre = this.hcprc.descrip_med;
    this.datos.medico.espec = this.hcprc.descrip_espec_med;
    this.datos.medico.reg = this.hcprc.reg_med;
    this.datos.medico.firma = parseFloat(this.hcprc.med);

    this.imprimir();
  }

  imprimir() {
    _impresion2({
      tipo: "pdf",
      archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`,
      content: this.format(),
    })
      .then(() => {
        console.log("FINDRISK");
      })
      .catch((err) => {
        console.error(err);
        CON851("", "Error impresion FINDRISK", null, "error", "Error");
      });
  }

  format() {
    return {
      images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(this.datos.medico.firma) },
      pageMargins: marginEncabezado_impHc(),
      header: encabezadoAperturas_impHc(this.datos),
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

      styles: estilosImpresion_impHc(),
    };
  }

  llenarFormato() {
    let equisActFisica = [];

    if (this.dato_9008.activ_fisica == "S") {
      equisActFisica.push(
        { canvas: [{ type: "line", x1: 437, y1: 0, x2: 480, y2: -15, lineWidth: 1 }] },
        { canvas: [{ type: "line", x1: 480, y1: 0, x2: 437, y2: -15, lineWidth: 1 }] }
      );
    } else if (this.dato_9008.activ_fisica == "N") {
      equisActFisica.push(
        { canvas: [{ type: "line", x1: 482, y1: 0, x2: 525, y2: -15, lineWidth: 1 }] },
        { canvas: [{ type: "line", x1: 525, y1: 0, x2: 482, y2: -15, lineWidth: 1 }] }
      );
    }

    let equisHiper = [];

    if (this.dato_9008.medica_hipert == "S") {
      equisHiper.push(
        { canvas: [{ type: "line", x1: 437, y1: 0, x2: 480, y2: -15, lineWidth: 1 }] },
        { canvas: [{ type: "line", x1: 480, y1: 0, x2: 437, y2: -15, lineWidth: 1 }] }
      );
    } else if (this.dato_9008.medica_hipert == "N") {
      equisHiper.push(
        { canvas: [{ type: "line", x1: 482, y1: 0, x2: 525, y2: -15, lineWidth: 1 }] },
        { canvas: [{ type: "line", x1: 525, y1: 0, x2: 482, y2: -15, lineWidth: 1 }] }
      );
    }

    let equisGluco = [];

    if (this.dato_9008.glucosa_alto == "S") {
      equisGluco.push(
        { canvas: [{ type: "line", x1: 437, y1: 0, x2: 480, y2: -25, lineWidth: 1 }] },
        { canvas: [{ type: "line", x1: 480, y1: 0, x2: 437, y2: -25, lineWidth: 1 }] }
      );
    } else if (this.dato_9008.glucosa_alto == "N") {
      equisGluco.push(
        { canvas: [{ type: "line", x1: 482, y1: 0, x2: 525, y2: -25, lineWidth: 1 }] },
        { canvas: [{ type: "line", x1: 525, y1: 0, x2: 482, y2: -25, lineWidth: 1 }] }
      );
    }

    let col = [
      {
        columns: [
          {
            width: "30%",
            marginTop: 10,
            marginRight: 20,
            table: {
              widths: ["20%", "80%"],
              headerRows: 0,
              body: [
                [{ text: "1. Edad", style: "left8BoldT", colSpan: 2 }, {}],
                [
                  { text: this.dato_9008.edad == "1" ? "X" : "", style: "center8" },
                  { text: "Menos de 45 años (0 p.)", style: "left8" },
                ],
                [
                  { text: this.dato_9008.edad == "2" ? "X" : "", style: "center8" },
                  { text: "55-64 años (3 p.)", style: "left8" },
                ],
                [
                  { text: this.dato_9008.edad == "3" ? "X" : "", style: "center8" },
                  { text: "45-54 años (2 p.)", style: "left8" },
                ],
                [
                  { text: this.dato_9008.edad == "4" ? "X" : "", style: "center8" },
                  { text: "Mas de 64 años (4 p.)", style: "left8" },
                ],
              ],
            },
          },
          {
            width: "70%",
            marginTop: 10,
            table: {
              widths: ["30%", "10%", "60%"],
              headerRows: 0,
              body: [
                [{ text: "2. Indice de masa corporal", style: "left8BoldT", colSpan: 3 }, {}, {}],
                [
                  { text: "Peso: " + this.hcprc.signos.peso + " (Kilos)", style: "left8" },
                  { text: this.dato_9008.imc == "1" ? "X" : "", style: "center8" },
                  { text: "Menor de 25 kg/m2 (0 p.)", style: "left8" },
                ],
                [
                  { text: "Talla " + this.hcprc.signos.talla + " (cms)", style: "left8" },
                  { text: this.dato_9008.imc == "2" ? "X" : "", style: "center8" },
                  { text: "Entre 25-30 kg/m2 (1 p.)", style: "left8" },
                ],
                [
                  { text: "IMC: " + this.hcprc.signos.imc_corp, style: "left8" },
                  { text: this.dato_9008.imc == "3" ? "X" : "", style: "center8" },
                  { text: "Mayor de 30 kg/m2 (3 p.)", style: "left8" },
                ],
              ],
            },
          },
        ],
      },
      {
        marginTop: 10,
        table: {
          widths: ["4.5%", "95.5%"],
          headerRows: 0,
          body: [
            [
              {
                text: "3. Perimetro de cintura medido por debajo de las costillas (normalmente a nivel del ombligo):",
                style: "left8BoldT",
                colSpan: 2,
              },
              {},
            ],
            [
              { text: this.dato_9008.per_abdo == "1" ? "X" : "", style: "center8" },
              { text: this.paci.SEXO == "M" ? "Menos de 94 cm (0 p.)" : "Menos de 80 cm (0 p.)", style: "left8" },
            ],
            [
              { text: this.dato_9008.per_abdo == "2" ? "X" : "", style: "center8" },
              { text: this.paci.SEXO == "M" ? "Entre 94-102 cm (3 p.)" : "Entre 80-88 cm (3 p.)", style: "left8" },
            ],
            [
              { text: this.dato_9008.per_abdo == "3" ? "X" : "", style: "center8" },
              { text: this.paci.SEXO == "M" ? "Mas de 102 cm (4 p.)" : "Mas de 88 cm (4 p.)", style: "left8" },
            ],
          ],
        },
      },
      {
        marginTop: 10,
        table: {
          widths: ["86%", "7%", "7%"],
          headerRows: 0,
          body: [
            [
              {
                text: "4. Realiza habitualmente al menos 30 minutos de actividad fisica, en el trabajo y/o en el tiempo libre?",
                style: "left8Bold",
              },
              { text: "Si (0 p.)", style: "left8" },
              { text: "No (2 p.)", style: "left8" },
            ],
          ],
        },
      },
      {
        stack: equisActFisica,
      },
      {
        marginTop: 10,
        table: {
          widths: ["4.5%", "95.5%"],
          headerRows: 0,
          body: [
            [{ text: "5. Con qué frecuencia come verduras o frutas?", style: "left8BoldT", colSpan: 2 }, {}],
            [
              { text: this.dato_9008.come_verdu == "1" ? "X" : "", style: "center8" },
              { text: "Todos los dias (0 p.)", style: "left8" },
            ],
            [
              { text: this.dato_9008.come_verdu == "2" ? "X" : "", style: "center8" },
              { text: "No todos los dias (1 p.)", style: "left8" },
            ],
          ],
        },
      },
      {
        marginTop: 10,
        table: {
          widths: ["86%", "7%", "7%"],
          headerRows: 0,
          body: [
            [
              { text: "6. Toma medicacion para la hipertension regularmente?", style: "left8Bold" },
              { text: "Si (2 p.)", style: "left8" },
              { text: "No (0 p.)", style: "left8" },
            ],
          ],
        },
      },
      {
        stack: equisHiper,
      },
      {
        marginTop: 10,
        table: {
          widths: ["86%", "7%", "7%"],
          headerRows: 0,
          body: [
            [
              {
                text: "7. Le han encontrado alguna vez valores de glucosa altos (Ej. en un control medico, durante una enfermedad, durante el embarazo)?",
                style: "left8Bold",
              },
              { text: "Si (5 p.)", style: "left8" },
              { text: "No (0 p.)", style: "left8" },
            ],
          ],
        },
      },
      {
        stack: equisGluco,
      },
      {
        marginTop: 10,
        table: {
          widths: ["4.5%", "95.5%"],
          headerRows: 0,
          body: [
            [
              {
                text: "8. Se le ha diagnosticado diabetes (tipo 1 o tipo 2) a alguno de sus familiares allegados u otros parientes?",
                style: "left8BoldT",
                colSpan: 2,
              },
              {},
            ],
            [
              { text: this.dato_9008.diabetes_fam == "1" ? "X" : "", style: "center8" },
              { text: "No (0 p.)", style: "left8" },
            ],
            [
              { text: this.dato_9008.diabetes_fam == "2" ? "X" : "", style: "center8" },
              { text: "Si: abuelos, tia, tio, primo, hermano (3 p.)", style: "left8" },
            ],
            [
              { text: this.dato_9008.diabetes_fam == "3" ? "X" : "", style: "center8" },
              { text: "Si: padres, hermanos o hijos (5 p.)", style: "left8" },
            ],
          ],
        },
      },
      {
        marginTop: 20,
        unbreakable: true,
        table: {
          widths: ["19.5%", "30.5%", "50%"],
          headerRows: 0,
          body: [
            [
              {
                columns: [
                  { text: "FECHA: ", style: "left8", bold: true, width: "35%" },
                  { text: this.datos.total.fecha, style: "left8", width: "100%" },
                ],
              },
              {
                columns: [
                  { text: "PUNTAJE DE RIESGO TOTAL: ", style: "left8", bold: true, width: "75%" },
                  { text: this.datos.total.puntuacion, style: "left8", width: "25%" },
                ],
              },
              {
                columns: [{ text: this.datos.total.tipo, style: "left8", bold: true, width: "100%" }],
              },
            ],
          ],
        },
      },
      {
        marginTop: 15,
        columns: [
          {
            style: "left8Bold",
            text: "RIESGO CARDIOVASCULAR:",
            width: "20%",
          },
          {
            style: "left8",
            text: this.datos.descrip_riesgo || "",
          },
        ],
      },
      firmaImpresion_impHc(this.datos),
    ];

    return col;
  }

  calcularFindrisk() {
    let aux = 0;

    switch (this.dato_9008.edad) {
      case "2":
        aux = aux + 2;
        break;
      case "3":
        aux = aux + 3;
        break;
      case "4":
        aux = aux + 4;
        break;
    }

    switch (this.dato_9008.imc) {
      case "2":
        aux = aux + 1;
        break;
      case "3":
        aux = aux + 3;
        break;
    }

    switch (this.dato_9008.per_abdo) {
      case "2":
        aux = aux + 3;
        break;
      case "3":
        aux = aux + 4;
        break;
    }

    this.dato_9008.activ_fisica == "S" ? (aux = aux) : (aux = aux + 2);
    this.dato_9008.come_verdu == "1" ? (aux = aux) : (aux = aux + 1);
    this.dato_9008.medica_hipert == "N" ? (aux = aux) : (aux = aux + 2);
    this.dato_9008.glucosa_alto == "N" ? (aux = aux) : (aux = aux + 5);

    switch (this.dato_9008.diabetes_fam) {
      case "2":
        aux = aux + 3;
        break;
      case "3":
        aux = aux + 5;
        break;
    }

    return aux.toString();
  }
}

const imprimir_FINDRISK = (params) => {
  var formato = new formato_FINDRISK(params);
  formato._init();
};

module.exports = {
  imprimir_FINDRISK,
};
