var $_impLab = {};
var impresionesCorrectas = [];
var adjuntosEmail = [];
var Chart = require("chart.js");
const { data } = require("jquery");

async function imprimirMasivoLab(resultados, envio_email) {
  $_impLab.hidePage = true;
  inicialidarFormatoBase_lab();
  var data_resultado = {};
  var arrayBase64 = [];
  var resultadosEst = [];
  var resultadosOtr = [];

  resultados.sort((a, b) => {
    if (parseInt(a.FECHA) > parseInt(b.FECHA)) {
      return 1;
    }
    if (parseInt(a.FECHA) < parseInt(b.FECHA)) {
      return -1;
    }
    return 0;
  });

  for (var i in resultados) {
    switch (resultados[i].CUP.trim()) {
      case "895001": // HOLTER
      case "895100":
      case "896101":
        resultadosOtr.push(resultados[i]);
        break;
      case "881210": // ECOCARDIOGRAMA STRESS
      case "88121001":
      case "88121002":
        resultadosOtr.push(resultados[i]);
        break;
      case "894102": // PRUEBA DE ESFUERZO
        if ($_USUA_GLOBAL[0].NIT != "822006883") {
          resultadosOtr.push(resultados[i]);
        } else {
          resultadosEst.push(resultados[i]);
        }
        break;
      default:
        resultadosEst.push(resultados[i]);
        break;
    }
  }

  // impresiones estandar
  for (var i in resultadosEst) {
    await postData(
      {
        datosh:
          datosEnvio() + resultadosEst[i].COMPROBANTE + "|" + resultadosEst[i].CUP + "|" + resultadosEst[i].ITEM + "|",
      },
      get_url("APP/LAB/LAB102.DLL")
    )
      .then(async function (data) {
        data_resultado = data.RESULTADOS_LAB[0];

        if (i == 0) {
          $_impLab.email_paci = data_resultado.EMAIL_PACI;
          $_impLab.nombre_paci = data_resultado.DESCRIP_PACI;
        }

        await _imprimirLab102(data_resultado, true);

        impresionesCorrectas.push(data_resultado.LLAVE);

        data_resultado.ADJUNTOS.forEach((item) => {
          if (item.trim() != "") adjuntosEmail.push("D:\\WEB\\ADJUNTOS\\" + item);
        });
      })
      .catch((err) => {
        console.error(err, "error ", resultadosEst[i]);
        CON851("", "Error en consulta", null, "error", "Error");
      });
  }

  if (formatoBaseImp_lab.header != "") {
    await _impresion2({
      tipo: "pdf",
      archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss") + ".pdf",
      content: formatoBaseImp_lab,
      retornar: true,
    })
      .then((data) => {
        arrayBase64.push(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // otras impresiones
  for (var i in resultadosOtr) {
    await postData(
      {
        datosh:
          datosEnvio() + resultadosOtr[i].COMPROBANTE + "|" + resultadosOtr[i].CUP + "|" + resultadosOtr[i].ITEM + "|",
      },
      get_url("APP/LAB/LAB102.DLL")
    )
      .then(async function (data) {
        data_resultado = data.RESULTADOS_LAB[0];

        if (i == 0 && !$_impLab.email_paci) {
          $_impLab.email_paci = data_resultado.EMAIL_PACI.trim();
          $_impLab.nombre_paci = data_resultado.DESCRIP_PACI.trim();
        }

        switch (data_resultado.CUP) {
          case "895001": // HOLTER
          case "895100":
          case "896101":
            await _impresion2({
              tipo: "pdf",
              archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss") + ".pdf",
              content: _imprimirLab108(data_resultado),
              retornar: true,
            })
              .then((data) => {
                impresionesCorrectas.push(data_resultado.LLAVE);
                arrayBase64.push(data);
              })
              .catch((err) => {
                console.error(err);
              });
            break;
          case "881210": // ECOCARDIOGRAMA STRESS
          case "88121001":
          case "88121002":
            await _impresion2({
              tipo: "pdf",
              archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss") + ".pdf",
              content:
                $_USUA_GLOBAL[0].NIT == 822006883
                  ? _imprimirLab103_v2(data_resultado)
                  : _imprimirLab103(data_resultado),
              retornar: true,
            })
              .then((data) => {
                impresionesCorrectas.push(data_resultado.LLAVE);
                arrayBase64.push(data);
              })
              .catch((err) => {
                console.error(err);
              });
            break;
          case "894102": // PRUEBA DE ESFUERZO
            await llenarGraficasLab107_impLab(data_resultado);
            await _impresion2({
              tipo: "pdf",
              archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss") + ".pdf",
              content: await _imprimirLab107(data_resultado),
              retornar: true,
            })
              .then((data) => {
                impresionesCorrectas.push(data_resultado.LLAVE);
                arrayBase64.push(data);
              })
              .catch((err) => {
                console.error(err);
              });
            break;
        }

        data_resultado.ADJUNTOS.forEach((item) => {
          if (item.trim() != "") adjuntosEmail.push("D:\\WEB\\ADJUNTOS\\" + item);
        });
      })
      .catch((err) => {
        console.error(err, "error ", resultadosOtr[i]);
        CON851("", "Error en consulta", null, "error", "Error");
      });
  }

  // une pdf´s estandar y demas
  await unirPdfs_lab(arrayBase64, true);
  await modifyPdf_lab();
  if (envio_email) await guardarHoraEnvioEmailLab();
  adjuntosEmail = []
  ventanaEstudios_RXLAB();
}

async function llenarGraficasLab107_impLab(datos) {
  return new Promise((resolve, reject) => {
    var canv = document.createElement("canvas");
    canv.id = "graficaLaboratorios";
    document.body.appendChild(canv);

    var graficas = {
      PROTOCOLO: null,
      PROTOCOLO_2: null,
      PIE_1: null,
      PIE_2: null,
      PIE_3: null,
      PIE_4: null,
    };

    var imgGraficas = {
      PROTOCOLO: null,
      PROTOCOLO_2: null,
      PIE_1: null,
      PIE_2: null,
      PIE_3: null,
      PIE_4: null,
    };

    var etapas = {
      primera: [
        datos.TABLA_PROTOCOLO[0].METS,
        datos.TABLA_PROTOCOLO[0].TA_SISTOLE,
        datos.TABLA_PROTOCOLO[0].TA_DIASTOLE,
        datos.TABLA_PROTOCOLO[0].FC,
      ],
      segunda: [
        datos.TABLA_PROTOCOLO[1].METS,
        datos.TABLA_PROTOCOLO[1].TA_SISTOLE,
        datos.TABLA_PROTOCOLO[1].TA_DIASTOLE,
        datos.TABLA_PROTOCOLO[1].FC,
      ],
      tercer: [
        datos.TABLA_PROTOCOLO[2].METS,
        datos.TABLA_PROTOCOLO[2].TA_SISTOLE,
        datos.TABLA_PROTOCOLO[2].TA_DIASTOLE,
        datos.TABLA_PROTOCOLO[2].FC,
      ],
      cuarta: [
        datos.TABLA_PROTOCOLO[3].METS,
        datos.TABLA_PROTOCOLO[3].TA_SISTOLE,
        datos.TABLA_PROTOCOLO[3].TA_DIASTOLE,
        datos.TABLA_PROTOCOLO[3].FC,
      ],
      quinta: [
        datos.TABLA_PROTOCOLO[4].METS,
        datos.TABLA_PROTOCOLO[4].TA_SISTOLE,
        datos.TABLA_PROTOCOLO[4].TA_DIASTOLE,
        datos.TABLA_PROTOCOLO[4].FC,
      ],
      sexta: [
        datos.TABLA_PROTOCOLO[5].METS,
        datos.TABLA_PROTOCOLO[5].TA_SISTOLE,
        datos.TABLA_PROTOCOLO[5].TA_DIASTOLE,
        datos.TABLA_PROTOCOLO[5].FC,
      ],
      septima: [
        datos.TABLA_PROTOCOLO[6].METS,
        datos.TABLA_PROTOCOLO[6].TA_SISTOLE,
        datos.TABLA_PROTOCOLO[6].TA_DIASTOLE,
        datos.TABLA_PROTOCOLO[6].FC,
      ],
    };

    graficas.PROTOCOLO = new Chart(document.getElementById("graficaLaboratorios").getContext("2d"), {
      type: "line",
      data: {
        labels: ["Mets", "Sistole", "Diastole", "FC"],
        datasets: [
          {
            fill: false,
            label: "I",
            data: etapas.primera,
            backgroundColor: "rgba(218, 22, 22, 1)",
            borderColor: "rgba(218, 22, 22, 1)",
            pointBorderColor: "rgba(218, 22, 22, 1)",
            pointBackgroundColor: "rgba(218, 22, 22, 1)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            borderWidth: 1,
          },
          {
            fill: false,
            label: "II",
            data: etapas.segunda,
            backgroundColor: "rgba(0,0,139)",
            borderColor: "rgba(0,0,139)",
            pointBorderColor: "rgba(0,0,139)",
            pointBackgroundColor: "rgba(0,0,139)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            borderWidth: 1,
          },
          {
            fill: false,
            label: "III",
            data: etapas.tercera,
            backgroundColor: "rgba(31, 158, 48, 1)",
            borderColor: "rgba(31, 158, 48, 1)",
            pointBorderColor: "rgba(31, 158, 48, 1)",
            pointBackgroundColor: "rgba(31, 158, 48, 1)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            borderWidth: 1,
          },
          {
            fill: false,
            label: "IV",
            data: etapas.cuarta,
            backgroundColor: "rgba(81, 28, 204, 1)",
            borderColor: "rgba(81, 28, 204, 1)",
            pointBorderColor: "rgba(81, 28, 204, 1)",
            pointBackgroundColor: "rgba(81, 28, 204, 1)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            borderWidth: 1,
          },
          {
            fill: false,
            label: "V",
            data: etapas.quinta,
            backgroundColor: "rgba(255,165,0)",
            borderColor: "rgba(255,165,0)",
            pointBorderColor: "rgba(255,165,0)",
            pointBackgroundColor: "rgba(255,165,0)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            borderWidth: 1,
          },
          {
            fill: false,
            label: "VI",
            data: etapas.sexta,
            backgroundColor: "rgba(25, 193, 171, 1)",
            borderColor: "rgba(25, 193, 171, 1)",
            pointBorderColor: "rgba(25, 193, 171, 1)",
            pointBackgroundColor: "rgba(25, 193, 171, 1)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            borderWidth: 1,
          },
          {
            fill: false,
            label: "VII",
            data: etapas.septima,
            backgroundColor: "rgba(255,69,0)",
            borderColor: "rgba(255,69,0)",
            pointBorderColor: "rgba(255,69,0)",
            pointBackgroundColor: "rgba(255,69,0)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontSize: 25,
            boxWidth: 50,
          },
        },
        animation: {
          onComplete: function (animation) {
            imgGraficas.PROTOCOLO = this.toBase64Image();
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    var Graf_Frecuencias = [
      datos.TABLA_PROTOCOLO[0].TA_SISTOLE,
      datos.TABLA_PROTOCOLO[1].TA_SISTOLE,
      datos.TABLA_PROTOCOLO[2].TA_SISTOLE,
      datos.TABLA_PROTOCOLO[3].TA_SISTOLE,
      datos.TABLA_PROTOCOLO[4].TA_SISTOLE,
      datos.TABLA_PROTOCOLO[5].TA_SISTOLE,
      datos.TABLA_PROTOCOLO[6].TA_SISTOLE,
    ];
    var Graf_Sistoles = [
      datos.TABLA_PROTOCOLO[0].FC,
      datos.TABLA_PROTOCOLO[1].FC,
      datos.TABLA_PROTOCOLO[2].FC,
      datos.TABLA_PROTOCOLO[3].FC,
      datos.TABLA_PROTOCOLO[4].FC,
      datos.TABLA_PROTOCOLO[5].FC,
      datos.TABLA_PROTOCOLO[6].FC,
    ];

    graficas.PROTOCOLO_2 = new Chart(document.getElementById("graficaLaboratorios").getContext("2d"), {
      type: "line",
      width: 520,
      data: {
        labels: ["I", "II", "III", "IV", "V", "VI", "VII"],
        datasets: [
          {
            fill: false,
            label: "FC",
            data: Graf_Frecuencias,
            backgroundColor: "rgba(218, 22, 22, 1)",
            borderColor: "rgba(218, 22, 22, 1)",
            pointBorderColor: "rgba(218, 22, 22, 1)",
            pointBackgroundColor: "rgba(218, 22, 22, 1)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            borderWidth: 1,
          },
          {
            fill: false,
            label: "Sistole",
            data: Graf_Sistoles,
            backgroundColor: "rgba(3, 88, 106, 0.3)",
            borderColor: "rgba(3, 88, 106, 0.70)",
            pointBorderColor: "rgba(3, 88, 106, 0.70)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontSize: 25,
            boxWidth: 50,
          },
        },
        animation: {
          onComplete: function (animation) {
            imgGraficas.PROTOCOLO_2 = this.toBase64Image();
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    var pie1 = [
      datos.TABLA_PROTOCOLO_POST[0].TA_SISTOLE,
      datos.TABLA_PROTOCOLO_POST[0].TA_DIASTOLE,
      datos.TABLA_PROTOCOLO_POST[0].FC,
    ];

    graficas.PIE_1 = new Chart(document.getElementById("graficaLaboratorios").getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Sistole", "Diastole", "Fc"],
        datasets: [
          {
            backgroundColor: ["rgba(218, 22, 22, 1)", "rgba(0,0,139)", "rgba(34,139,34)"],
            hoverBackgroundColor: ["rgba(195, 13, 13, 1)", "rgba(0,0,139)", "rgba(34,139,34)"],
            hoverBorderColor: ["rgba(195, 13, 13, 1)", "rgba(0,0,139)", "rgba(34,139,34)"],
            hoverBorderWidth: 2,
            borderAlign: "inner",
            data: pie1,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontSize: 50,
            boxWidth: 100,
          },
        },
        animation: {
          onComplete: async function (animation) {
            imgGraficas.PIE_1 = await this.toBase64Image();
          },
        },
      },
    });

    var pie2 = [
      datos.TABLA_PROTOCOLO_POST[1].TA_SISTOLE,
      datos.TABLA_PROTOCOLO_POST[1].TA_DIASTOLE,
      datos.TABLA_PROTOCOLO_POST[1].FC,
    ];

    graficas.PIE_2 = new Chart(document.getElementById("graficaLaboratorios").getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Sistole", "Diastole", "Fc"],
        datasets: [
          {
            backgroundColor: ["rgba(255,165,0)", "rgba(0,128,128)", "rgba(128,0,128)"],
            hoverBackgroundColor: ["rgba(255,165,0)", "rgba(0,128,128)", "rgba(128,0,128)"],
            hoverBorderColor: ["rgba(255,165,0)", "rgba(0,128,128)", "rgba(128,0,128)"],
            hoverBorderWidth: 2,
            borderAlign: "inner",
            data: pie2,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontSize: 50,
            boxWidth: 100,
          },
        },
        animation: {
          onComplete: async function (animation) {
            imgGraficas.PIE_2 = await this.toBase64Image();
          },
        },
      },
    });

    var pie3 = [
      datos.TABLA_PROTOCOLO_POST[2].TA_SISTOLE,
      datos.TABLA_PROTOCOLO_POST[2].TA_DIASTOLE,
      datos.TABLA_PROTOCOLO_POST[2].FC,
    ];

    graficas.PIE_3 = new Chart(document.getElementById("graficaLaboratorios").getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Sistole", "Diastole", "Fc"],
        datasets: [
          {
            backgroundColor: ["rgba(112,128,144)", "rgba(139,0,139)", "rgba(70,130,180)"],
            hoverBackgroundColor: ["rgba(112,128,144)", "rgba(139,0,139)", "rgba(70,130,180)"],
            hoverBorderColor: ["rgba(112,128,144)", "rgba(139,0,139)", "rgba(70,130,180)"],
            hoverBorderWidth: 2,
            borderAlign: "inner",
            data: pie3,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontSize: 50,
            boxWidth: 100,
          },
        },
        animation: {
          onComplete: async function (animation) {
            imgGraficas.PIE_3 = await this.toBase64Image();
          },
        },
      },
    });

    var pie4 = [
      datos.TABLA_PROTOCOLO_POST[3].TA_SISTOLE,
      datos.TABLA_PROTOCOLO_POST[3].TA_DIASTOLE,
      datos.TABLA_PROTOCOLO_POST[3].FC,
    ];

    graficas.PIE_4 = new Chart(document.getElementById("graficaLaboratorios").getContext("2d"), {
      type: "doughnut",
      width: 520,
      data: {
        labels: ["Sistole", "Diastole", "Fc"],
        datasets: [
          {
            backgroundColor: ["rgba(107,142,35)", "rgba(255,69,0)", "rgba(128,0,0)"],
            hoverBackgroundColor: ["rgba(107,142,35)", "rgba(255,69,0)", "rgba(128,0,0)"],
            hoverBorderColor: ["rgba(107,142,35)", "rgba(255,69,0)", "rgba(128,0,0)"],
            hoverBorderWidth: 2,
            borderAlign: "inner",
            data: pie4,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontSize: 50,
            boxWidth: 100,
          },
        },
        animation: {
          onComplete: async function (animation) {
            imgGraficas.PIE_4 = await this.toBase64Image();
            $_impLab.graficas = imgGraficas;

            $("canvas").remove();
            resolve();
          },
        },
      },
    });
  });
}

function _imprimirLab107(datos) {
  datos.labEnc = "LABORATORIO DE PRUEBAS NO INVASIVAS";
  datos.factoresCardio = {
    titulos: [
      "HIPERTENSION: ",
      "DIABETES: ",
      "DISLIPIDEMIA: ",
      "ENFERMEDAD CORONARIA PREVIA: ",
      "FUMADOR: ",
      "SEDENTARISMO: ",
      "STRESS: ",
      "OBESIDAD: ",
      "FAMILIARES: ",
    ],
    tabla: [],
  };
  datos.motivoSusp = {
    titulos: [
      "1. DOLOR PRECORDIAL",
      "2. DISNEA",
      "3. FATIGA GENERAL",
      "4. CLAUDICACION M M I I",
      "5. MAREO",
      "6, SINCOPE",
      "7. ALTERACION SIMPATICA",
      "8. ARRITMIAS",
      "9. ANOMALIAS TA",
      "10. MOTIVOS TECNICOS",
      "11. FALTA DE COLABORACION",
      "12. ALCANZO FC",
    ],
    tabla: [],
  };
  datos.hallazgos = {};
  datos.tabla1 = {
    estadio: [],
    velocidad: [],
    pendiente: [],
    tiempo: [],
    vo2: [],
    mets: [],
    ta: [],
    fc: [],
    tiempo2: [],
    ritmo: [],
    sintomas: [],
  };
  datos.tabla2 = {
    tiempo: [],
    ta: [],
    fc: [],
    ritmo: [],
    sintomas: [],
  };
  datos.graficas = {
    banderas: [],
    urls1: [],
    titulos2: [],
    urls2: [],
  };

  datos.HIPERTENSION == "S" ? datos.factoresCardio.tabla.push("X") : datos.factoresCardio.tabla.push("");
  datos.DIABETES == "S" ? datos.factoresCardio.tabla.push("X") : datos.factoresCardio.tabla.push("");
  datos.DISLIPIDEMIA == "S" ? datos.factoresCardio.tabla.push("X") : datos.factoresCardio.tabla.push("");
  datos.ENFER_CORONARIA == "S" ? datos.factoresCardio.tabla.push("X") : datos.factoresCardio.tabla.push("");
  datos.FUMADOR == "S" ? datos.factoresCardio.tabla.push("X") : datos.factoresCardio.tabla.push("");
  datos.SEDENTARISMO == "S" ? datos.factoresCardio.tabla.push("X") : datos.factoresCardio.tabla.push("");
  datos.STRESS == "S" ? datos.factoresCardio.tabla.push("X") : datos.factoresCardio.tabla.push("");
  datos.OBESIDAD == "S" ? datos.factoresCardio.tabla.push("X") : datos.factoresCardio.tabla.push("");
  datos.FAMILIARES == "S" ? datos.factoresCardio.tabla.push("X") : datos.factoresCardio.tabla.push("");
  datos.OTROS == "S" ? (datos.factoresCardio.otros = "X") : (datos.factoresCardio.otros = "");
  datos.OTROS_TEXT.trim() != ""
    ? (datos.factoresCardio.otrosCual = datos.OTROS_TEXT)
    : (datos.factoresCardio.otrosCual = "");

  datos.DOLOR_PRECORDIAL == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");
  datos.DISNEA == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");
  datos.FATIGA_GENERAL == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");
  datos.CLAUDICACION == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");
  datos.MAREO == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");
  datos.SINCOPE == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");
  datos.ALTERACION_SIMP == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");
  datos.ARRITMIAS == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");
  datos.ANOMALIAS_TA == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");
  datos.MOTIVOS_TECNICOS == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");
  datos.FALTA_COLABORACION == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");
  datos.ALCANZO_FC == "S" ? datos.motivoSusp.tabla.push("X") : datos.motivoSusp.tabla.push("");

  switch (datos.FINALIDAD) {
    case "1":
      datos.finalid = "PRUEBA DIAGNOSTICA";
      break;
    case "2":
      datos.finalid = "VALORATIVA";
      break;
    case "3":
      datos.finalid = "REHABILITACIÓN";
      break;
  }

  datos.medico = {};
  datos.medico.nombre = datos.NOMBRE_MEDICO;
  datos.medico.espec = "Medicina Interna Cardiologia";
  datos.medico.reg = datos.REG_MEDICO;

  for (var i in datos.TABLA_PROTOCOLO) {
    datos.tabla1.estadio.push(datos.TABLA_PROTOCOLO[i].ESTADIO);
    datos.tabla1.velocidad.push(datos.TABLA_PROTOCOLO[i].VELOCIDAD);
    datos.tabla1.pendiente.push(datos.TABLA_PROTOCOLO[i].PENDIENTE);
    datos.tabla1.tiempo.push(datos.TABLA_PROTOCOLO[i].TIEMPO);
    datos.tabla1.vo2.push(datos.TABLA_PROTOCOLO[i].VO2);
    datos.tabla1.mets.push(datos.TABLA_PROTOCOLO[i].METS);
    datos.tabla1.ta.push(datos.TABLA_PROTOCOLO[i].TA_SISTOLE + " - " + datos.TABLA_PROTOCOLO[i].TA_DIASTOLE);
    datos.tabla1.fc.push(datos.TABLA_PROTOCOLO[i].FC);
    datos.tabla1.tiempo2.push(datos.TABLA_PROTOCOLO[i].TIEMPO_2);
    datos.tabla1.ritmo.push(datos.TABLA_PROTOCOLO[i].RITMO);
    datos.tabla1.sintomas.push(datos.TABLA_PROTOCOLO[i].SINTOMAS);
  }

  for (var i in datos.TABLA_PROTOCOLO_POST) {
    datos.tabla2.tiempo.push(datos.TABLA_PROTOCOLO_POST[i].MINUTOSPOST);
    datos.tabla2.ta.push(datos.TABLA_PROTOCOLO_POST[i].TA_SISTOLE + " - " + datos.TABLA_PROTOCOLO_POST[i].TA_DIASTOLE);
    datos.tabla2.fc.push(datos.TABLA_PROTOCOLO_POST[i].FC);
    datos.tabla2.ritmo.push(datos.TABLA_PROTOCOLO_POST[i].RITMO);
    datos.tabla2.sintomas.push(datos.TABLA_PROTOCOLO_POST[i].SINTOMAS);
  }

  imgGraficas1 = [$_impLab.graficas.PROTOCOLO, $_impLab.graficas.PROTOCOLO_2];
  datos.graficas.urls1 = imgGraficas1;

  datos.graficas.titulos2 = datos.tabla2.tiempo;

  imgGraficas2 = [$_impLab.graficas.PIE_1, $_impLab.graficas.PIE_2, $_impLab.graficas.PIE_3, $_impLab.graficas.PIE_4];
  datos.graficas.urls2 = imgGraficas2;

  datos.graficas.urls1.length > 0 ? datos.graficas.banderas.push(true) : datos.graficas.banderas.push(false);

  switch (datos.graficas.urls2.length) {
    case 1:
      datos.graficas.banderas.push(1);
      break;
    case 2:
      datos.graficas.banderas.push(2);
      break;
    case 3:
      datos.graficas.banderas.push(3);
      break;
    case 4:
      datos.graficas.banderas.push(4);
      break;
    default:
      datos.graficas.banderas.push(0);
      break;
  }

  return {
    images: { logo: `P:\\PROG\\LOGOS\\${$_USUA_GLOBAL[0].NIT}.png`, firma: `P:\\PROG\\FIRMAS\\${datos.ID_MEDICO}.png` },
    pageMargins: [20, 95, 30, 60],
    header: function (currentPage, pageCount, pageSize) {
      var width_page = pageSize.width - 60;

      return {
        margin: [30, 30, 30, 0],
        stack: [
          {
            columns: [
              {
                margin: [35, 0, 0, 0],
                stack: $_USUA_GLOBAL[0].NIT != "" ? [{ image: "logo", width: 70, height: 55 }] : [],
                width: "15%",
              },
              {
                stack: llenarEncabezado(),
                width: "65%",
              },
              {
                marginTop: 5,
                style: "left10Bold",
                text: !$_impLab.hidePage ? "PAG: " + currentPage + " de " + pageCount : "",
                alignment: "right",
                marginRight: 15,
                width: "20%",
              },
            ],
          },
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: -62,
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
        margin: [10, 0, 0, 0],
        stack: [
          {
            marginTop: 5,
            style: "headTabla",
            columns: [
              {
                text: "DATOS DE IDENTIFICACIÓN",
              },
            ],
          },
          {
            canvas: [{ type: "rect", x: 0, y: -15, w: 535, h: 17, r: 0, lineWidth: 1, lineColo: "#000" }],
          },
          {
            columns: [
              {
                stack: [
                  {
                    marginTop: 5,
                    columns: [
                      { text: "NOMBRE DEL PACIENTE: ", style: "headerSub", width: "25%" },
                      { text: datos.DESCRIP_PACI, style: "bodySub", width: "30%" },
                      { text: "EDAD: ", style: "headerSub", width: "5%" },
                      { text: datos.EDAD.substring(2, 4), style: "bodySub", width: "5%" },
                      { text: "PESO: ", style: "headerSub", width: "5%" },
                      { text: datos.PESO, style: "bodySub", width: "5%" },
                      { text: "TALLA: ", style: "headerSub", width: "6%" },
                      { text: datos.TALLA, style: "bodySub", width: "20%" },
                    ],
                  },
                  {
                    marginTop: 2,
                    columns: [
                      { text: "DOCUMENTO DE INDENTIDAD: ", style: "headerSub", width: "25%" },
                      { text: datos.ID_HISTORIA, style: "bodySub", width: "30%" },
                      { text: "SEXO: ", style: "headerSub", width: "5%" },
                      { text: datos.SEXO == "M" ? "Masc" : "fem", style: "bodySub", width: "5%" },
                      { text: "ENTIDAD: ", style: "headerSub", width: "10%" },
                      { text: datos.ENTIDAD, style: "bodySub", width: "25%" },
                    ],
                  },
                  {
                    marginTop: 2,
                    columns: [
                      { text: "FECHA: ", style: "headerSub", width: "25%" },
                      { text: datos.FECHA, style: "bodySub", width: "30%" },
                      { text: "CIUDAD: ", style: "headerSub", width: "10%" },
                      { text: datos.CIUDAD_PACI, style: "bodySub", width: "35%" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            // DATOS DEL PACIENTE
            columns: [
              {
                width: "100%",
                stack: [
                  {
                    columns: [
                      {
                        marginTop: 10,
                        text: "FINALIDAD DE LA PRUEBA: ",
                        style: "bodyTabla",
                        bold: true,
                        width: "20%",
                      },
                      {
                        marginTop: 10,
                        text: datos.finalid,
                        style: "bodyTabla",
                        width: "80%",
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        columns: [
                          {
                            width: "49%",
                            marginTop: 10,
                            table: {
                              headerRows: 0,
                              body: llenarFactoresCardio(),
                            },
                            layout: "lightHorizontalLines",
                          },
                          {
                            width: "51%",
                            marginLeft: 15,
                            unbreakable: true,
                            marginTop: 10,
                            table: {
                              widths: "100%",
                              headerRows: 0,
                              body: llenarMedicamentos(),
                            },
                            layout: "lightHorizontalLines",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    unbreakable: true,
                    marginTop: 10,
                    table: {
                      widths: ["32.5%", "8%", "8%", "8%", "8%", "8%", "19.5%", "8%"],
                      headerRows: 0,
                      body: llenarParamsBasales(),
                    },
                    layout: "lightHorizontalLines",
                  },
                  {
                    unbreakable: true,
                    marginTop: 10,
                    table: {
                      widths: ["23%", "23%", "18%", "18%", "18%"],
                      headerRows: 0,
                      body: llenarTipoPrueba(),
                    },
                    layout: "lightHorizontalLines",
                  },
                  {
                    unbreakable: true,
                    marginTop: 10,
                    table: {
                      widths: ["28%", "5%", "28%", "5%", "29%", "5%"],
                      headerRows: 0,
                      body: llenarMotivoSusp(),
                    },
                    layout: "lightHorizontalLines",
                  },
                  {
                    unbreakable: true,
                    stack: [
                      {
                        marginTop: 10,
                        marginBottom: 5,
                        text: "HALLAZGOS CLINICOS POST EJERCICIO",
                        style: "headTabla",
                      },
                      {
                        columns: [
                          {
                            width: "48%",
                            unbreakable: true,
                            marginTop: 0,
                            table: {
                              widths: ["25%", "25%", "25%", "25%"],
                              headerRows: 0,
                              body: llenarHallazgos(),
                            },
                            layout: "lightHorizontalLines",
                          },
                          {
                            width: "52%",
                            unbreakable: true,
                            marginLeft: 15,
                            marginTop: 0,
                            table: {
                              widths: ["25%", "25%", "25%", "25%"],
                              headerRows: 0,
                              body: llenarHallazgos2(),
                            },
                            layout: "lightHorizontalLines",
                          },
                        ],
                      },
                      {
                        width: "50%",
                        unbreakable: true,
                        marginTop: 0,
                        table: {
                          widths: ["25%", "25%", "25%", "25%"],
                          headerRows: 0,
                          body: llenarHallazgos3(),
                        },
                        layout: "lightHorizontalLines",
                      },
                    ],
                  },
                  {
                    unbreakable: true,
                    marginTop: 10,
                    table: {
                      widths: ["12%", "30%", "10%", "48%"],
                      headerRows: 0,
                      body: llenarConclusiones(),
                    },
                    layout: "lightHorizontalLines",
                  },
                  {
                    unbreakable: true,
                    marginTop: 10,
                    table: {
                      widths: ["7%", "9%", "9%", "7%", "9%", "6%", "13%", "5%", "7%", "7%", "21%"],
                      headerRows: 0,
                      body: llenarTabla1(),
                    },
                  },
                  {
                    // unbreakable: true,
                    stack: llenarGraficasTabla1(),
                  },
                  {
                    unbreakable: true,
                    stack: [
                      {
                        unbreakable: true,
                        marginTop: 20,
                        marginLeft: 135,
                        table: {
                          widths: ["15%", "10%", "8%", "8%", "25%"],
                          headerRows: 0,
                          body: llenarTabla2(),
                        },
                      },
                      {
                        unbreakable: true,
                        stack: llenarGraficasTabla2(),
                      },
                    ],
                  },
                  {
                    unbreakable: true,
                    marginTop: 20,
                    columns: llenarPlan(),
                  },
                  firmaMedico_lab(datos),
                  {
                    stack:
                      $_USUA_GLOBAL[0].NIT != 822006883
                        ? []
                        : [
                            {
                              marginTop: 10,
                              text: "NOTA: Se realizó encuesta epidemiológica al ingreso a la institución sobre sintomas de COVID-19, contacto con paciente sospechosos o confirmados de COVID-19 y la realización de viajes en los últimos 15 dias, se realiza toma de temperatura, se realiza lavado de manos según las recomendaciones de la OMS en los cinco momentos en técnica y duración. Además se utiliza equipo de protección personal y las medidas de protección del paciente para COVID-19, también se realiza limpieza y desinfección de los equipos después de la atención de cada paciente. Se establece distanciamiento en la sala de espera.",
                              style: "left8",
                            },
                            {
                              marginTop: 10,
                              text: "IMPORTANTE: La recomendación de estudios complementarios es de tipo técnico, de acuerdo a la modalidad de imagen diagnóstica realizada, por lo que la competencia para definir la necesidad de estudios complementarios es del equipo médico tratante del paciente, de acuerdo al contexto clínico y ayudas diagnósticas previas.",
                              style: "left8",
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

    footer: function (currentPage, pageCount) {
      return {
        margin: [30, 10, 40, 0],
        columns: [
          {
            text: localStorage.Usuario + moment().format(" - YYYY/MM/DD - HH:mm"),
            fontSize: 8,
            alignment: "left",
          },
        ],
      };
    },

    styles: estilosImp_lab,
  };

  function llenarFactoresCardio() {
    var fila = [[{ text: "FACTORES DE RIESGO CARDIOVASCULAR", style: "headTabla", colSpan: 4 }, {}, {}, {}]];

    for (var i in datos.factoresCardio.titulos) {
      if (i == 0 || i == 2 || i == 4 || i == 6 || i == 8) {
        fila.push([
          { text: datos.factoresCardio.titulos[i], style: "bodyTabla" },
          { text: datos.factoresCardio.tabla[i], style: "equis" },
          { text: datos.factoresCardio.titulos[parseInt(i) + 1], style: "bodyTabla" },
          { text: datos.factoresCardio.tabla[parseInt(i) + 1], style: "equis" },
        ]);
      }
    }

    fila.push([
      { text: "OTROS", style: "bodyTabla" },
      { text: datos.factoresCardio.otros, style: "equis" },
      { text: "CUAL?    " + datos.factoresCardio.otrosCual, style: "bodyTabla", colSpan: 2 },
      {},
    ]);

    return fila;
  }

  function llenarMedicamentos() {
    var fila = [
      [{ text: "MEDICAMENTOS", style: "headTabla" }],
      [{ text: datos.MEDICAMENTOS, style: "bodyTabla", alignment: "justify" }],
    ];

    return fila;
  }

  function llenarParamsBasales() {
    var fila = [
      [{ text: "PARAMETROS BASALES", style: "headTabla", colSpan: 8 }, {}, {}, {}, {}, {}, {}, {}],
      [
        { text: "DATOS CLINICOS: ", style: "bodyTabla", colSpan: 1, bold: true },
        { text: datos.DATOS_CLINICOS, style: "bodyTabla", colSpan: 7 },
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        { text: "PARAMETROS BASALES: ", style: "bodyTabla", bold: true },
        { text: "TA", style: "bodyTabla", bold: true },
        { text: datos.TA_SISTOLE, style: "bodyTabla" },
        { text: datos.TA_DIASTOLE, style: "bodyTabla" },
        { text: "FC", style: "bodyTabla", bold: true },
        { text: datos.FC, style: "bodyTabla" },
        { text: "DOBLE PRODUCTO", style: "bodyTabla", bold: true },
        { text: datos.DOBLE_PRODUCTO, style: "bodyTabla" },
      ],
      [
        { text: "ELECTROCARDIOGRAMA BASAL: ", style: "bodyTabla", bold: true },
        { text: datos.ELECTROCAR_BASAL, style: "bodyTabla", colSpan: 7 },
        {},
        {},
        {},
        {},
        {},
        {},
      ],
    ];

    return fila;
  }

  function llenarTipoPrueba() {
    var edad = parseInt(datos.EDAD.substring(1, 4)) || 0;
    var base = datos.SEXO == "F" ? 210 : 220;

    datos.FC_MAXIMA = base - edad;
    var sub = (base - edad) * 0.85;
    datos.FC_SUBMAXIMA = sub.toFixed(2);

    var sistole_fin = parseInt(datos.TA_FINAL_SISTOLE) || 0;
    var fc_fin = parseInt(datos.FC_FINAL) || 0;
    datos.DP_FINAL = sistole_fin * fc_fin;

    var mets = parseInt(datos.METS) || 0;
    datos.CONSO2 = mets * 3.5;

    switch (datos.METS.trim()) {
      case "1":
      case "2":
        datos.CF = "IV";
        break;
      case "3":
      case "4":
        datos.CF = "III";
        break;
      case "5":
      case "6":
        datos.CF = "II";
        break;
      case "7":
      case "8":
      case "9":
      case "10":
      case "11":
      case "12":
      case "13":
      case "14":
      case "15":
      case "16":
        datos.CF = "I";
        break;
      default:
        datos.CF = "Inválido";
        break;
    }

    var fila = [
      [{ text: "TIPO DE PRUEBA CINTA RODANTE", style: "headTabla", colSpan: 5 }, {}, {}, {}, {}],
      [
        { text: "FC MAXIMA (100)", style: "headerTabla" },
        { text: "FC SUBMAXIMA AL (85%)", style: "headerTabla" },
        { text: "TA FINAL", style: "headerTabla" },
        { text: "FC FINAL", style: "headerTabla" },
        { text: "DP FINAL", style: "headerTabla" },
      ],
      [
        { text: datos.FC_MAXIMA, style: "bodyTabla2" },
        { text: datos.FC_SUBMAXIMA, style: "bodyTabla2" },
        { text: datos.TA_FINAL_SISTOLE + " - " + datos.TA_FINAL_DIASTOLE, style: "bodyTabla2" },
        { text: datos.FC_FINAL, style: "bodyTabla2" },
        { text: datos.DP_FINAL, style: "bodyTabla2" },
      ],
      [
        { text: "DURACION DE LA PRUEBA", style: "headerTabla" },
        { text: "FC ALCANZADA", style: "headerTabla" },
        { text: "METS", style: "headerTabla" },
        { text: "CF", style: "headerTabla" },
        { text: "CONS O2", style: "headerTabla" },
      ],
      [
        { text: datos.DURACION, style: "bodyTabla2" },
        { text: datos.FC_FINAL, style: "bodyTabla2" },
        { text: datos.METS, style: "bodyTabla2" },
        { text: datos.CF, style: "bodyTabla2" },
        { text: datos.CONSO2, style: "bodyTabla2" },
      ],
    ];

    return fila;
  }

  function llenarMotivoSusp() {
    var fila = [[{ text: "MOTIVO DE SUSPENSIÓN", style: "headTabla", colSpan: 6 }, {}, {}, {}, {}, {}]];

    for (var i in datos.motivoSusp.titulos) {
      if (i < 4) {
        fila.push([
          { text: datos.motivoSusp.titulos[i], style: "bodyTabla" },
          { text: datos.motivoSusp.tabla[i], style: "equis" },
          { text: datos.motivoSusp.titulos[parseInt(i) + 4], style: "bodyTabla" },
          { text: datos.motivoSusp.tabla[parseInt(i) + 4], style: "equis" },
          { text: datos.motivoSusp.titulos[parseInt(i) + 8], style: "bodyTabla" },
          { text: datos.motivoSusp.tabla[parseInt(i) + 8], style: "equis" },
        ]);
      }
    }

    return fila;
  }

  function llenarHallazgos() {
    var fila = [
      [
        {
          text: "ELECTROCARDIOGRAMA DURANTE EL ESFUERZO: ",
          style: "bodyTabla",
          bold: true,
          colSpan: 4,
          alignment: "center",
        },
        {},
        {},
        {},
      ],
      [{ text: datos.ELECTROCAR_DURA, style: "bodyTabla", colSpan: 4, alignment: "justify" }, {}, {}, {}],
    ];

    return fila;
  }

  function llenarHallazgos2() {
    var fila = [
      [
        { text: "ELECTROCARDIOGRAMA POSTSTRESS: ", style: "bodyTabla", bold: true, colSpan: 4, alignment: "center" },
        {},
        {},
        {},
      ],
      [{ text: datos.ELECTROCAR_POST, style: "bodyTabla", colSpan: 4, alignment: "justify" }, {}, {}, {}],
    ];

    return fila;
  }

  function llenarHallazgos3() {
    var fila = [
      [{ text: "" }, {}, {}, {}],
      [
        { text: "RESPUESTA PRESORA: ", style: "bodyTabla", bold: true },
        { text: datos.RESP_PRESORA, style: "bodyTabla", colSpan: 3 },
        {},
        {},
      ],
      [
        { text: "RESPUESTA CRONOTROPICA: ", style: "bodyTabla", bold: true },
        { text: datos.RESP_CRONOTROPICA, style: "bodyTabla", colSpan: 3 },
        {},
        {},
      ],
      [
        { text: "RESPUESTA FUNCIONAL: ", style: "bodyTabla", bold: true },
        { text: datos.RESP_FUNCIONAL, style: "bodyTabla", colSpan: 3 },
        {},
        {},
      ],
      [
        { text: "ARRITMIAS: ", style: "bodyTabla", bold: true },
        { text: datos.HALLAZ_ARRITMIA, style: "bodyTabla", colSpan: 3 },
        {},
        {},
      ],
    ];

    return fila;
  }

  function llenarConclusiones() {
    var fila = [
      [{ text: "", style: "headTabla", colSpan: 4 }, {}, {}, {}],
      [
        { text: "CONCLUSIONES: ", style: "bodyTabla", bold: true },
        { text: datos.CONCLUSIONES.replace(/\&/g, "\n").trim(), style: "bodyTabla", colSpan: 3, alignment: "justify" },
        {},
        {},
      ],
    ];

    return fila;
  }

  function llenarPlan() {
    var col = [
      { text: "SUGERENCIAS: ", style: "bodyTabla", bold: true, width: "12%" },
      { text: datos.SUGERENCIAS, style: "bodyTabla", alignment: "justify", width: "88%" },
    ];

    return col;
  }

  function llenarInfoMedico() {}

  function llenarTabla1() {
    var fila = [
      [
        { text: "PROTOCOLO EN EJERCICIO", colSpan: 11, style: "headTabla", fillColor: "#178696", color: "white" },
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
        { text: "Estadio", style: "headerTabla1", rowSpan: 2, marginTop: 7 },
        { text: "Velocidad", style: "headerTabla1" },
        { text: "Pendiente", style: "headerTabla1" },
        { text: "Tiempo", style: "headerTabla1" },
        { text: "VO2", style: "headerTabla1" },
        { text: "Mets", style: "headerTabla1", rowSpan: 2, marginTop: 7 },
        { text: "TA", style: "headerTabla1" },
        { text: "FC", style: "headerTabla1", rowSpan: 2, marginTop: 7 },
        { text: "Tiempo", style: "headerTabla1" },
        { text: "Ritmo", style: "headerTabla1", rowSpan: 2, marginTop: 7 },
        { text: "Sintomas", style: "headerTabla1", rowSpan: 2, marginTop: 7 },
      ],
      [
        { text: "", style: "headerTabla2" },
        { text: "Millas/H", style: "headerTabla2" },
        { text: "%", style: "headerTabla2" },
        { text: "Min", style: "headerTabla2" },
        { text: "Ml/Kg/Min", style: "headerTabla2" },
        { text: "", style: "headerTabla2" },
        { text: "Sistole/Diastole", style: "headerTabla2" },
        { text: "", style: "headerTabla2" },
        { text: "Min", style: "headerTabla2" },
        { text: "Ritmo", style: "headerTabla2" },
        { text: "Sintomas", style: "headerTabla2" },
      ],
    ];

    for (var i in datos.tabla1.estadio) {
      fila.push([
        { text: datos.tabla1.estadio[i], style: "bodyTabla2" },
        { text: datos.tabla1.velocidad[i], style: "bodyTabla2" },
        { text: datos.tabla1.pendiente[i], style: "bodyTabla2" },
        { text: datos.tabla1.tiempo[i], style: "bodyTabla2" },
        { text: datos.tabla1.vo2[i], style: "bodyTabla2" },
        { text: datos.tabla1.mets[i], style: "bodyTabla2" },
        { text: datos.tabla1.ta[i], style: "bodyTabla2" },
        { text: datos.tabla1.fc[i], style: "bodyTabla2" },
        { text: datos.tabla1.tiempo2[i], style: "bodyTabla2" },
        { text: datos.tabla1.ritmo[i], style: "bodyTabla2" },
        { text: datos.tabla1.sintomas[i], style: "bodyTabla2" },
      ]);
    }

    return fila;
  }

  function llenarTabla2() {
    var fila = [
      [
        { text: "POST EJERCICIO", colSpan: 5, style: "headTabla", fillColor: "#178696", color: "white" },
        {},
        {},
        {},
        {},
      ],
      [
        { text: "Tiempo", style: "headerTabla1" },
        { text: "TA", style: "headerTabla1" },
        { text: "FC", style: "headerTabla1" },
        { text: "Ritmo", style: "headerTabla1" },
        { text: "Sintomas", style: "headerTabla1" },
      ],
    ];

    for (var i in datos.tabla2.tiempo) {
      fila.push([
        { text: datos.tabla2.tiempo[i], style: "bodyTabla2" },
        { text: datos.tabla2.ta[i], style: "bodyTabla2" },
        { text: datos.tabla2.fc[i], style: "bodyTabla2" },
        { text: datos.tabla2.ritmo[i], style: "bodyTabla2" },
        { text: datos.tabla2.sintomas[i], style: "bodyTabla2" },
      ]);
    }

    return fila;
  }

  function llenarGraficasTabla1() {
    var col = [];

    if (datos.graficas.banderas[0] === true) {
      col.push(
        {
          columns: [{ image: datos.graficas.urls1[0], width: 535, marginTop: 10, height: 250 }],
        },
        {
          columns: [{ image: datos.graficas.urls1[1], width: 535, marginTop: 10, height: 250 }],
        }
      );
    }

    return col;
  }

  function llenarGraficasTabla2() {
    var col = [];

    if (datos.graficas.banderas[1] === 4) {
      col.push(
        {
          marginTop: 20,
          columns: [
            { text: datos.graficas.titulos2[0], style: "equis", width: 225 },
            { text: datos.graficas.titulos2[1], style: "equis", width: 225, marginLeft: 100 },
          ],
        },
        {
          columns: [
            { image: datos.graficas.urls2[0], width: 225, marginTop: 5, height: 110 },
            { image: datos.graficas.urls2[1], width: 225, marginTop: 5, height: 110, marginLeft: 55 },
          ],
        },
        {
          marginTop: 20,
          columns: [
            { text: datos.graficas.titulos2[2], style: "equis", width: 225 },
            { text: datos.graficas.titulos2[3], style: "equis", width: 225, marginLeft: 100 },
          ],
        },
        {
          columns: [
            { image: datos.graficas.urls2[2], width: 225, marginTop: 5, height: 110 },
            { image: datos.graficas.urls2[3], width: 225, marginTop: 5, height: 110, marginLeft: 55 },
          ],
        }
      );
    } else if (datos.graficas.banderas[1] === 3) {
      col.push(
        {
          marginTop: 20,
          columns: [
            { text: datos.graficas.titulos2[0], style: "equis", width: 225 },
            { text: datos.graficas.titulos2[1], style: "equis", width: 225, marginLeft: 100 },
          ],
        },
        {
          columns: [
            { image: datos.graficas.urls2[0], width: 225, marginTop: 5, height: 110 },
            { image: datos.graficas.urls2[1], width: 225, marginTop: 5, height: 110, marginLeft: 55 },
          ],
        },
        {
          marginTop: 20,
          columns: [{ text: datos.graficas.titulos2[2], style: "equis", width: 225 }],
        },
        {
          columns: [{ image: datos.graficas.urls2[2], width: 225, marginTop: 5, height: 110 }],
        }
      );
    } else if (datos.graficas.banderas[1] === 2) {
      col.push(
        {
          marginTop: 20,
          columns: [
            { text: datos.graficas.titulos2[0], style: "equis", width: 225 },
            { text: datos.graficas.titulos2[1], style: "equis", width: 225, marginLeft: 100 },
          ],
        },
        {
          columns: [
            { image: datos.graficas.urls2[0], width: 225, marginTop: 5, height: 110 },
            { image: datos.graficas.urls2[1], width: 225, marginTop: 5, height: 110, marginLeft: 55 },
          ],
        }
      );
    } else if (datos.graficas.banderas[1] === 1) {
      col.push(
        {
          marginTop: 20,
          columns: [{ text: datos.graficas.titulos2[0], style: "equis", width: 225 }],
        },
        {
          columns: [{ image: datos.graficas.urls2[0], width: 225, marginTop: 5, height: 110 }],
        }
      );
    }

    return col;
  }

  function llenarSugerencias() {
    var col = [
      {
        columns: [
          { text: "SUGERENCIAS: ", style: "bodyTabla", bold: true, width: "12%" },
          { text: datos.sugerencias, style: "bodyTabla", alignment: "justify", width: "88%" },
        ],
      },
    ];

    return col;
  }

  function llenarEncabezado() {
    var fila = [];
    if ($_USUA_GLOBAL[0].NIT != "") {
      fila = [
        {
          alignment: "center",
          margin: [0, 10, 0, 0],
          text: [{ text: "INFORME PRUEBA DE ESFUERZO \n", fontSize: 14 }, { text: datos.labEnc }],
          fontSize: 11,
          width: "60%",
        },
      ];
    } else {
      fila = [
        {
          alignment: "center",
          margin: [0, 10, 0, 14],
          text: [{ text: "INFORME PRUEBA DE ESFUERZO \n", fontSize: 14 }, { text: datos.labEnc }],
          fontSize: 11,
          width: "100%",
        },
      ];
    }

    return fila;
  }
}

function _imprimirLab108(datos, callback) {
  var fc_max = parseInt(datos.FC_MAX) || 0;
  var fc_min = parseInt(datos.FC_MIN) || 0;
  datos.FC_MED = (fc_max + fc_min) / 2;

  datos.DESCRIP_PACI = datos.DESCRIP_PACI.replace(/\s+/g, " ");
  datos.CONTENIDO = datos.CONTENIDO.replace(/\&/g, "\n");
  datos.MOTIVO = datos.MOTIVO.replace(/\&/g, "\n");
  datos.MEDICAMENTO = datos.MEDICAMENTO.replace(/\&/g, "\n");
  datos.FECHA = datos.FECHA.replace(/\//g, " ");
  datos.REG_MEDICO = new Intl.NumberFormat("ja-JP").format(datos.REG_MEDICO);
  datos.ID_MEDICO_FIRMA = datos.ID_MEDICO;
  datos.ID_MEDICO = new Intl.NumberFormat("ja-JP").format(datos.ID_MEDICO);

  datos.FECHA = datos.FECHA.replace(/\s+/g, " ");

  switch (datos.EDAD.substring(0, 1)) {
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

  datos.medico = {};
  datos.medico.nombre = datos.NOMBRE_MEDICO;
  datos.medico.espec = datos.DESCRIP_ESPEC_MEDICO ? datos.DESCRIP_ESPEC_MEDICO : "";
  datos.medico.reg = datos.REG_MEDICO;

  datos.EDAD = parseInt(datos.EDAD.substring(1, 4));

  return {
    images: {
      logo: `P:\\PROG\\LOGOS\\${$_USUA_GLOBAL[0].NIT}.png`,
      firma: `P:\\PROG\\FIRMAS\\${datos.ID_MEDICO_FIRMA}.png`,
    },
    pageMargins: [35, 142, 35, 60],
    header: function (currentPage, pageCount, pageSize) {
      var width_page = pageSize.width - 70;

      return {
        margin: [35, 30, 35, 0],
        stack: [
          {
            columns: [
              {
                margin: [7, -5, 0, 0],
                stack: [
                  {
                    image: "logo",
                    width: 80,
                    height: 45,
                  },
                ],
                width: "20%",
              },
              {
                marginTop: 5,
                style: "center10Bold",
                text: [
                  { text: $_USUA_GLOBAL[0].NOMBRE + "\n" },
                  { text: $_USUA_GLOBAL[0].NIT + "\n" },
                  { text: "COMPROBANTE DE PRESTACIÓN DE SERVICIOS: " + datos.COMPROB },
                ],
                width: "60%",
              },
              {
                marginTop: 5,
                style: "left10Bold",
                text: !$_impLab.hidePage ? "PAG: " + currentPage + " de " + pageCount : "",
                alignment: "right",
                marginRight: 15,
                width: "20%",
              },
            ],
          },
          {
            marginLeft: 7,
            marginTop: 5,
            table: {
              widths: ["100%"],
              headerRows: 0,
              body: [
                [{}],
                [
                  {
                    columns: [
                      { text: "CIUDAD Y FECHA:", style: "left8Bold", width: "15%" },
                      { text: datos.CIUDAD_PACI.trim() + ", " + datos.FECHA, style: "left8", width: "45%" },
                      { text: "IDENTIFICACIÓN:", style: "left8Bold", width: "15%" },
                      { text: datos.ID_HISTORIA, style: "left8", width: "25%" },
                    ],
                  },
                ],
                [
                  {
                    columns: [
                      { text: "PACIENTE:", style: "left8Bold", width: "15%" },
                      { text: datos.DESCRIP_PACI, style: "left8", width: "45%" },
                      { text: "EDAD:", style: "left8Bold", width: "7%" },
                      { text: datos.EDAD + datos.AUX_EDAD, style: "left8", width: "8%" },
                      { text: "SEXO:", style: "left8Bold", width: "7%" },
                      { text: datos.SEXO == "M" ? "Masculino" : "femenino", style: "left8", width: "11%" },
                    ],
                  },
                ],
                [
                  {
                    columns: [
                      { text: "ENTIDAD:", style: "left8Bold", width: "15%" },
                      { text: datos.ENTIDAD, style: "left8", width: "45%" },
                    ],
                  },
                ],
                [
                  {
                    style: "left8",
                    columns: [
                      { text: "REFERIDO POR:", style: "left8Bold", width: "15%" },
                      { text: datos.REFERIDO + " - " + datos.DESCRIP_REFERIDO, width: "55%" },
                      {
                        text: localStorage.Usuario + moment().format(" - YYYY/MM/DD - HH:mm"),
                        fontSize: 7,
                        alignment: "right",
                        marginRight: 3,
                      },
                    ],
                  },
                ],
              ],
            },
            layout: "noBorders",
          },
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: -55,
                w: width_page,
                h: 58,
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

    styles: estilosImp_lab,
  };

  function llenarFormato() {
    var col = [
      {
        text: "INFORME DE HOLTER de ECG (24 Horas) ",
        style: "center10Bold",
      },
      {
          stack: $_USUA_GLOBAL[0].NIT != 822006883 ? [
              {
                marginTop: 5,
                columns: [
                  { text: "Motivo:  ", style: "left8Bold", width: "14%" },
                  { text: datos.MOTIVO, style: "left8", alignment: "justify" },
                ],
              },
              {
                marginTop: 5,
                columns: [
                  { text: "Medicamento:  ", style: "left8Bold", width: "14%" },
                  { text: datos.MEDICAMENTO, style: "left8", alignment: "justify" },
                ],
              },
              {
                marginTop: 15,
                columns: [
                  {
                    width: "14%",
                    text: "",
                  },
                  {
                    width: "28%",
                    text: [
                      { text: "FC MÁXIMA:  ", style: "left8Bold" },
                      { text: datos.FC_MAX + " LPM", style: "left8" },
                    ],
                  },
                  {
                    width: "21%",
                    text: [
                      { text: "FC MINIMA:  ", style: "left8Bold" },
                      { text: datos.FC_MIN + " LPM", style: "left8" },
                    ],
                  },
                  {
                    alignment: "right",
                    width: "21%",
                    text: [
                      { text: "FC MEDIA:  ", style: "left8Bold" },
                      { text: datos.FC_MED + " LPM", style: "left8", alignment: "right" },
                    ],
                  },
                ],
              },
          ] : []
      },
      {
        marginBottom: 20,
        stack: $_USUA_GLOBAL[0].NIT != 822006883 ? [
            {
              marginTop: 10,
              columns: [
                {
                  text: "",
                  width: "14%",
                },
                { text: datos.CONTENIDO, style: "left8", alignment: "justify" },
                {
                  text: "",
                  width: "14%",
                },
              ],
            }
        ] : [
            {
                marginTop: 10,
                text: datos.CONTENIDO, style: "left8", alignment: "justify"
            }
        ]
      },
      firmaMedico_lab(datos),
      {
        stack:
          $_USUA_GLOBAL[0].NIT != 822006883
            ? []
            : [
                {
                  marginTop: 10,
                  text: "NOTA: Se realizó encuesta epidemiológica al ingreso a la institución sobre sintomas de COVID-19, contacto con paciente sospechosos o confirmados de COVID-19 y la realización de viajes en los últimos 15 dias, se realiza toma de temperatura, se realiza lavado de manos según las recomendaciones de la OMS en los cinco momentos en técnica y duración. Además se utiliza equipo de protección personal y las medidas de protección del paciente para COVID-19, también se realiza limpieza y desinfección de los equipos después de la atención de cada paciente. Se establece distanciamiento en la sala de espera.",
                  style: "left8",
                },
                {
                  marginTop: 10,
                  text: "IMPORTANTE: La recomendación de estudios complementarios es de tipo técnico, de acuerdo a la modalidad de imagen diagnóstica realizada, por lo que la competencia para definir la necesidad de estudios complementarios es del equipo médico tratante del paciente, de acuerdo al contexto clínico y ayudas diagnósticas previas.",
                  style: "left8",
                },
              ],
      },
    ];
    return col;
  }
}

// ******************************* IMPRESION LAB102 **********************************

async function _imprimirLab102(datos, resumido) {
  var nomfirma = false;
  datos.ID_MED = datos.ID_MEDICO;
  datos.DESCRIP_PACI = datos.DESCRIP_PACI.replace(/\s+/g, " ");
  datos.FECHA = datos.FECHA.replace(/\s+/g, " ");
  datos.FECHA = datos.FECHA.replace(/\//g, " ");
  datos.HALLAZGOS = datos.HALLAZGOS.replace(/\&/g, "\n");
  datos.CONCLUSIONES = datos.CONCLUSIONES.replace(/\&/g, "\n");
  datos.PARRAFO_INI = datos.PARRAFO_INI.replace(/\&/g, "\n");

  isNaN(datos.ID_MEDICO) == false ? (datos.ID_MEDICO = parseFloat(datos.ID_MEDICO)) : false;

  switch (datos.EDAD.substring(0, 1)) {
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
  datos.EDAD = parseInt(datos.EDAD.substring(1, 4));

  datos.medico = {};
  datos.medico.nombre = datos.NOMBRE_MEDICO;
  datos.medico.espec = datos.DESCRIP_ESPEC_MEDICO ? datos.DESCRIP_ESPEC_MEDICO : "";
  datos.medico.reg = datos.REG_MEDICO;

  if (resumido) {
    formatoBaseImp_lab.contador = parseInt(formatoBaseImp_lab.contador) + 1;
    formatoBaseImp_lab.images[`firma${formatoBaseImp_lab.contador}`] = `P:\\PROG\\FIRMAS\\${datos.ID_MED}.png`;
    formatoBaseImp_lab.images[`logo`] = `P:\\PROG\\LOGOS\\${$_USUA_GLOBAL[0].NIT}.png`;
    formatoBaseImp_lab.pageMargins = [35, 125, 35, 60];
    formatoBaseImp_lab.header = headerLAB102(datos);
    nomfirma = `firma${formatoBaseImp_lab.contador}`;

    formatoBaseImp_lab.content[0].stack.push({
      margin: [0, 5, 0, 0],
      stack: [
        {
          stack: llenarFormato(),
        },
      ],
    });

    formatoBaseImp_lab.styles = estilosImp_lab;
  } else {
    return {
      images: { logo: `P:\\PROG\\LOGOS\\${$_USUA_GLOBAL[0].NIT}.png`, firma: `P:\\PROG\\FIRMAS\\${datos.ID_MED}.png` },
      pageMargins: [35, 125, 35, 60],
      header: headerLAB102(datos),

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

      styles: estilosImp_lab,
    };
  }

  function llenarFormato() {
    var FECHA_REALIZACION =
      datos.FECHA_REALIZO_LAB.ANO +
      "-" +
      datos.FECHA_REALIZO_LAB.MES +
      "-" +
      datos.FECHA_REALIZO_LAB.DIA +
      "  " +
      datos.FECHA_REALIZO_LAB.HORA +
      ":" +
      datos.FECHA_REALIZO_LAB.MINUTO;

    var col = [
      {
        marginTop: formatoBaseImp_lab.contador > 1 ? 5 : 0,
        text: datos.DESCRIP_CUP,
        style: "center10Bold",
      },
      {
        marginTop: 7,
        style: "left8",
        columns: [
          { text: "EDAD:", style: "left8Bold", width: "8%" },
          { text: datos.EDAD + datos.AUX_EDAD, style: "left8", width: "9%" },
          { text: "ENTIDAD:", style: "left8Bold", width: "8%" },
          { text: datos.NOM_ENTIDAD, style: "left8", width: "72%" },
        ],
      },
      {
        marginTop: 7,
        style: "left8",
        columns: [
          { text: "FACTURA:", style: "left8Bold", width: "8%" },
          { text: datos.CTA.trim(), width: datos.CIUDAD_PACI.length > 50 ? "" : "9%" },
          { text: "COMPROBANTE:", style: "left8Bold", width: "12%" },
          { text: datos.COMPROB, width: "10%" },
          { text: "FECHA FACTURACIÓN:", style: "left8Bold", width: "16%" },
          { text: datos.FECHA, width: "16%" },
          {
            columns:
              datos.CUP.substring(0, 2) == 90 || datos.CUP.substring(0, 2) == 91
                ? [
                    { text: "FECHA LABORATORIO:", style: "left8Bold", width: "56%" },
                    { text: FECHA_REALIZACION, width: "44%" },
                  ]
                : [],
          },
        ],
      },
      {
        marginTop: 2,
        stack: llenarParrafo1(),
      },
      {
        marginTop: 2,
        stack: llenarTabla(datos.TABLA),
      },
      {
        stack: llenarHallazgos(),
      },
      datos.TIENE_2_TABLA == "S" ?
      {
        marginTop: 2,
        stack: llenarTabla(datos.TABLA_2),
      } : {},
      {
        stack: llenarConclusiones(),
      },
      {
        marginTop: 10,
        style: "left8",
        text:
          $_USUA_GLOBAL[0].NIT == 822006883 ? [{ text: "Refiere: ", bold: true }, { text: datos.QUIEN_REFIERE }] : [],
      },
      firmaMedico_lab(datos, nomfirma),
      {
        stack:
          $_USUA_GLOBAL[0].NIT != 822006883
            ? []
            : [
                {
                  marginTop: 10,
                  text: "NOTA: Se realizó encuesta epidemiológica al ingreso a la institución sobre sintomas de COVID-19, contacto con paciente sospechosos o confirmados de COVID-19 y la realización de viajes en los últimos 15 dias, se realiza toma de temperatura, se realiza lavado de manos según las recomendaciones de la OMS en los cinco momentos en técnica y duración. Además se utiliza equipo de protección personal y las medidas de protección del paciente para COVID-19, también se realiza limpieza y desinfección de los equipos después de la atención de cada paciente. Se establece distanciamiento en la sala de espera.",
                  style: "left8",
                },
                {
                  marginTop: 10,
                  text: "IMPORTANTE: La recomendación de estudios complementarios es de tipo técnico, de acuerdo a la modalidad de imagen diagnóstica realizada, por lo que la competencia para definir la necesidad de estudios complementarios es del equipo médico tratante del paciente, de acuerdo al contexto clínico y ayudas diagnósticas previas.",
                  style: "left8",
                },
              ],
      },
    ];

    return col;
  }

  function llenarTabla(tabla) {
    let fila = [];

    if ($_USUA_GLOBAL[0].NIT != "822006883") {
      fila = [
        [
          { text: "Cod", style: "encTabla" },
          { text: "Descripcion", style: "encTabla" },
          { text: "Resultado", style: "encTabla" },
          { text: "Unidades", style: "encTabla" },
          { text: "Valores de referencia", style: "encTabla" },
        ],
      ];
    } else {
      if (datos.CUP == "894102") {
        fila = [
          [
            { text: "Cod", style: "encTabla" },
            { text: "Descripcion", style: "encTabla" },
            { text: "Resultado", style: "encTabla" },
          ],
        ];
      } else {
        fila = [
          [
            { text: "Cod", style: "encTabla" },
            { text: "Descripcion", style: "encTabla" },
            { text: "Resultado", style: "encTabla" },
            { text: "Unidades", style: "encTabla" },
          ],
        ];
      }
    }

    // condiciones por NIT cardiooriente - David.M - 31/05/2021
    for (let i in tabla) {
      let fila2 = [
        { text: tabla[i].TITULO != "S" ? tabla[i].COMPONENTE : "", alignment: "center" },
        {
          text:
            tabla[i].TITULO != "S"
              ? tabla[i].DESCRIP_COMPONENTE.trim()
              : tabla[i].DESCRIP_COMPONENTE.trim(),
          bold: tabla[i].TITULO == "S" ? true : false,
        },
        { text: tabla[i].RESULTADO.replace(/\$/g, "\n"), alignment: "center" },
      ];

      if (datos.CUP != "894102") {
        fila2.push({ text: tabla[i].MEDIDA, alignment: "center" });
      }

      if ($_USUA_GLOBAL[0].NIT != "822006883") {
        if (!tabla[i].VLR_REFER[1]) {
          fila2.push({
            alignment: "center",
            columns: [{ text: tabla[i].VLR_REFER[0].DESCRIP }, { text: tabla[i].VLR_REFER[0].VLR }],
          });
        } else {
          var col2 = [];
          for (var x in tabla[i].VLR_REFER) {
            if (tabla[i].VLR_REFER[x].DESCRIP.trim() != "") {
              col2.push({
                columns: [
                  { text: tabla[i].VLR_REFER[x].DESCRIP, alignment: "center" },
                  { text: tabla[i].VLR_REFER[x].VLR, alignment: "center" },
                ],
              });
            }
          }
          fila2.push(col2);
        }
      }

      fila.push(fila2);
    }

    if ($_USUA_GLOBAL[0].NIT != "822006883") {
      fila.push([{}, {}, {}, {}, {}]);
    } else {
      if (datos.CUP == "894102") {
        fila.push([{}, {}, {}]);
      } else {
        fila.push([{}, {}, {}, {}]);
      }
    }

    let widths = [];

    if ($_USUA_GLOBAL[0].NIT != "822006883") {
      widths = ["8%", "26%", "17%", "9%", "40%"];
    } else {
      if (datos.CUP == "894102") {
        widths = ["10%", "30%", "60%"];
      } else {
        widths = ["20%", "45%", "20%", "15%"];
      }
    }

    var col = [
      {
        marginTop: 5,
        style: "left8",
        table: {
          widths: widths,
          heights: [15],
          body: fila,
        },
        layout: "lightHorizontalLines",
      },
    ];

    return col;
  }

  function llenarHallazgos() {
    var col = [
      {
        marginTop: 5,
        text: [
          { text: `${datos.TITULO_HALLAZGOS.toUpperCase()}\n\n`, width: "15%", style: "left8Bold" },
          { text: datos.HALLAZGOS, style: "left8", alignment: "justify" },
        ],
      },
    ];

    if (datos.HALLAZGOS.trim() != "") {
      return col;
    } else {
      return [];
    }
  }

  function llenarConclusiones() {
    var col = [
      {
        marginTop: 5,
        text: [
          { text: `${datos.TITULO_CONCLUSIONES.toUpperCase()}\n\n`, width: "15%", style: "left8Bold" },
          { text: datos.CONCLUSIONES, style: "left8", alignment: "justify" },
        ],
      },
    ];

    if (datos.CONCLUSIONES.trim() != "") {
      return col;
    } else {
      return [];
    }
  }

  function llenarParrafo1() {
    var col = [
      {
        marginTop: 5,
        text: [
          { text: `${datos.TITULO_PARRAFO_INI.toUpperCase()}\n\n`, width: "15%", style: "left8Bold" },
          { text: datos.PARRAFO_INI, style: "left8", alignment: "justify" },
        ],
      },
    ];

    if (datos.TIENE_PARRAFO_INI == "S") {
      return col;
    } else {
      return [];
    }
  }
}

// ******************************* IMPRESION LAB103 **********************************

function _imprimirLab103(datos, callback) {
  datos.encabezado = {
    nombre: $_USUA_GLOBAL[0].NOMBRE,
    nit: $_USUA_GLOBAL[0].NIT,
    descrip: "ECOCARDIOGRAMA STRESS CON DOBUTAMINA",
  };

  if (datos.MEDICACION) datos.MEDICACION = datos.MEDICACION.replace(/&/g, "\n");
  if (datos.MEDIDAS) datos.MEDIDAS = datos.MEDIDAS.replace(/&/g, "\n");
  if (datos.ECOCARDIOGRAMA_TT) datos.ECOCARDIOGRAMA_TT = datos.ECOCARDIOGRAMA_TT.replace(/&/g, "\n");
  if (datos.SINTOMAS) datos.SINTOMAS = datos.SINTOMAS.replace(/&/g, "\n");
  if (datos.ECOCARDIOGRAMA) datos.ECOCARDIOGRAMA = datos.ECOCARDIOGRAMA.replace(/&/g, "\n");
  if (datos.CONCLUSIONES) datos.CONCLUSIONES = datos.CONCLUSIONES.replace(/&/g, "\n");

  datos.tituloTabla2 = "";
  datos.tituloSintomas = "DURANTE LA INFUSIÓN DE DOBUTAMINA";
  if (datos.METODO == "2") {
    datos.tituloTabla2 = "Respuesta contráctil segmentaria con el ejercicio";
    datos.encabezado.descrip = "ECOCARDIOGRAMA STRESS CON EJERCICIO";
    datos.tituloSintomas = "DURANTE LA INFUSIÓN EL EJERCICIO";
  }

  datos.DESCRIP_PACI = datos.DESCRIP_PACI.replace(/\s+/g, " ");
  datos.FECHA = datos.FECHA.replace(/\s+/g, " ");
  datos.FECHA = datos.FECHA.replace(/\//g, " ");

  switch (datos.EDAD.substring(0, 1)) {
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

  datos.EDAD = parseInt(datos.EDAD.substring(1, 4));

  if (datos.METODO == "2") {
    datos.titulosTabla1 = ["EJERCICIO", "FC", "TA", "", ""];
    datos.headTabla1 = ["Etapa", "I", "II", "III", "IV", "V"];
  } else {
    datos.titulosTabla1 = ["Dobutamina", "FC", "TA", "Atropina", "Anormalidad"];
    datos.headTabla1 = ["Basal", "5", "10", "20", "30", "40"];
  }

  datos.medico = {};
  datos.medico.nombre = datos.NOMBRE_MEDICO;
  datos.medico.espec = datos.DESCRIP_ESPEC_MEDICO ? datos.DESCRIP_ESPEC_MEDICO : "";
  datos.medico.reg = datos.REG_MEDICO;

  datos.ID_MED = datos.ID_MEDICO;

  return {
    images: { logo: `P:\\PROG\\LOGOS\\${$_USUA_GLOBAL[0].NIT}.png`, firma: `P:\\PROG\\FIRMAS\\${datos.ID_MED}.png` },
    pageMargins: [35, 158, 35, 60],
    header: function (currentPage, pageCount, pageSize) {
      var width_page = pageSize.width - 70;

      return {
        margin: [35, 30, 35, 0],
        stack: [
          {
            columns: [
              {
                margin: [7, -5, 0, 0],
                stack: [
                  {
                    image: "logo",
                    width: 80,
                    height: 45,
                  },
                ],
                width: "20%",
              },
              {
                marginTop: 5,
                style: "center10Bold",
                text: [
                  { text: datos.encabezado.nombre + "\n" },
                  { text: datos.encabezado.nit + "\n" },
                  { text: "COMPROBANTE DE PRESTACIÓN DE SERVICIOS: " + datos.COMPROB },
                ],
                width: "60%",
              },
              {
                marginTop: 5,
                style: "left10Bold",
                text: !$_impLab.hidePage ? "PAG: " + currentPage + " de " + pageCount : "",
                alignment: "right",
                marginRight: 15,
                width: "20%",
              },
            ],
          },
          {
            marginLeft: 7,
            marginTop: 5,
            table: {
              widths: ["100%"],
              headerRows: 0,
              body: [
                [{}],
                [
                  {
                    columns: [
                      { text: "CIUDAD Y FECHA:", style: "left8Bold", width: "15%" },
                      { text: datos.CIUDAD_PACI.trim() + ", " + datos.FECHA, style: "left8", width: "45%" },
                      { text: "IDENTIFICACIÓN:", style: "left8Bold", width: "15%" },
                      { text: datos.ID_HISTORIA, style: "left8", width: "25%" },
                    ],
                  },
                ],
                [
                  {
                    columns: [
                      { text: "PACIENTE:", style: "left8Bold", width: "15%" },
                      { text: datos.DESCRIP_PACI, style: "left8", width: "45%" },
                      { text: "EDAD:", style: "left8Bold", width: "7%" },
                      { text: datos.EDAD + datos.AUX_EDAD, style: "left8", width: "8%" },
                      { text: "SEXO:", style: "left8Bold", width: "7%" },
                      { text: datos.SEXO == "M" ? "Masculino" : "femenino", style: "left8", width: "11%" },
                    ],
                  },
                ],
                [
                  {
                    columns: [
                      { text: "ENTIDAD:", style: "left8Bold", width: "15%" },
                      { text: datos.NOM_ENTIDAD, style: "left8", width: "45%" },
                      { text: "PESO:", style: "left8Bold", width: "7%" },
                      { text: datos.PESO + " Kg", style: "left8", width: "8%" },
                      { text: "TALLA:", style: "left8Bold", width: "7%" },
                      { text: datos.TALLA + " Cm", style: "left8", width: "8%" },
                    ],
                  },
                ],
                [
                  {
                    style: "left8",
                    columns: [
                      { text: "DIAGN CLINICO:", bold: true, width: "15%" },
                      { text: datos.DIAGNOS + " - " + datos.DESCRIP_DIAGNOS, width: "85%" },
                    ],
                  },
                ],
                [
                  {
                    style: "left8",
                    columns: [
                      { text: "REFERIDO POR:", style: "left8Bold", width: "15%" },
                      { text: datos.REFERIDO + " - " + datos.DESCRIP_REFERIDO, width: "55%" },
                      {
                        text: localStorage.Usuario + moment().format(" - YYYY/MM/DD - HH:mm"),
                        fontSize: 7,
                        alignment: "right",
                        marginRight: 3,
                      },
                    ],
                  },
                ],
              ],
            },
            layout: "noBorders",
          },
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: -67,
                w: width_page,
                h: 68,
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

    styles: estilosImp_lab,
  };

  function llenarFormato() {
    var col = [
      {
        text: datos.encabezado.descrip,
        style: "center10Bold",
      },
      {
        marginTop: 10,
        style: "left8",
        columns: [
          { text: "Medicación:", style: "left9Bold", width: "12%" },
          { text: datos.MEDICACION, width: "88%", alignment: "justify" },
        ],
      },
      {
        marginTop: 5,
        style: "left8",
        columns: [
          { text: "Medidas:", style: "left9Bold", width: "12%" },
          { text: datos.MEDIDAS, width: "88%", alignment: "justify" },
        ],
      },
      {
        marginTop: 5,
        style: "left8",
        columns: [
          { text: "EKG Reposo:  ", style: "left9Bold", width: "12%" },
          { text: datos.EKG_REPOSO, width: "88%" },
        ],
      },
      {
        marginTop: 5,
        style: "left8",
        text: [
          { text: "Ecocardiograma TT Reposo\n\n", style: "left9Bold", alignment: "center" },
          { text: datos.ECOCARDIOGRAMA_TT, alignment: "justify" },
        ],
      },
      {
        marginTop: 7,
        style: "left8",
        columns: [
          { text: "", width: "30%" },
          { text: "FCM: ", width: "6%", bold: true },
          { text: datos.FCM + " /m", width: "10%" },
          { text: "FCSM: ", width: "6%", bold: true },
          { text: datos.FCSM + " /m", width: "10%" },
          { text: "SC: ", width: "4%", bold: true },
          { text: datos.SC + " /m²", width: "10%" },
        ],
      },
      {
        unbreakable: true,
        columns: llenarTabla1(),
      },
      {
        text: datos.tituloTabla2,
        style: "center10Bold",
        marginTop: 10,
      },
      {
        unbreakable: true,
        stack: [
          {
            unbreakable: true,
            columns: llenarTabla2(),
          },
          {
            unbreakable: true,
            marginTop: 10,
            stack: [
              {
                style: "center8",
                columns: [
                  { text: "Tipos de respuesta contráctil", bold: true, alignment: "right", width: "40%" },
                  { text: "1. Normal   2. Hipocinesia   3. Acinesia   4. Discinesia", marginLeft: -50 },
                ],
              },
              {
                style: "center8",
                columns: [
                  { text: "Etapas de Infusión de dobutamina", bold: true, alignment: "right", width: "40%" },
                  { text: "R. Reposo   B. Dosis baja   M. Dosis Máxima   R. Recuperación", marginLeft: -50 },
                ],
              },
              {
                canvas: [{ type: "rect", w: 483, h: 30, x: 21, y: -24, r: 5 }],
              },
            ],
          },
        ],
      },
      {
        marginTop: 15,
        text: datos.tituloSintomas,
        style: "center10Bold",
      },
      {
        marginTop: 10,
        style: "left8",
        columns: [
          { text: "Sintomas:", style: "left9Bold", width: "12%" },
          { text: datos.SINTOMAS, width: "88%", alignment: "justify" },
        ],
      },
      {
        marginTop: 5,
        style: "left8",
        text: [
          { text: "Ecocardiograma\n\n", style: "left9Bold", alignment: "center" },
          { text: datos.ECOCARDIOGRAMA, alignment: "justify" },
        ],
      },
      {
        marginTop: 5,
        style: "left8",
        text: [
          { text: "EKG:  ", style: "left9Bold" },
          { text: datos.EKG, alignment: "justify" },
        ],
      },
      {
        marginTop: 5,
        style: "left8",
        text: [
          { text: "Conclusiones:\n\n", style: "left9Bold" },
          { text: datos.CONCLUSIONES, alignment: "justify" },
        ],
      },
      firmaMedico_lab(datos),
      {
        stack:
          $_USUA_GLOBAL[0].NIT != 822006883
            ? []
            : [
                {
                  marginTop: 10,
                  text: "NOTA: Se realizó encuesta epidemiológica al ingreso a la institución sobre sintomas de COVID-19, contacto con paciente sospechosos o confirmados de COVID-19 y la realización de viajes en los últimos 15 dias, se realiza toma de temperatura, se realiza lavado de manos según las recomendaciones de la OMS en los cinco momentos en técnica y duración. Además se utiliza equipo de protección personal y las medidas de protección del paciente para COVID-19, también se realiza limpieza y desinfección de los equipos después de la atención de cada paciente. Se establece distanciamiento en la sala de espera.",
                  style: "left8",
                },
                {
                  marginTop: 10,
                  text: "IMPORTANTE: La recomendación de estudios complementarios es de tipo técnico, de acuerdo a la modalidad de imagen diagnóstica realizada, por lo que la competencia para definir la necesidad de estudios complementarios es del equipo médico tratante del paciente, de acuerdo al contexto clínico y ayudas diagnósticas previas.",
                  style: "left8",
                },
              ],
      },
    ];

    return col;
  }

  function llenarTabla1() {
    var col = [];

    var c = [];
    for (var i in datos.titulosTabla1) {
      if (i == 2) {
        c.push({ text: datos.titulosTabla1[i], bold: true, colSpan: 2 }, {});
      } else {
        c.push({ text: datos.titulosTabla1[i], bold: true });
      }
    }
    col.push(c);

    for (var i in datos.TABLA_DOBU) {
      col.push([
        { text: datos.headTabla1[i] },
        { text: datos.TABLA_DOBU[i].FC },
        { text: datos.TABLA_DOBU[i].TA_SIS },
        { text: datos.TABLA_DOBU[i].TA_DIAS },
        { text: datos.TABLA_DOBU[i].ATROPINA },
        { text: datos.TABLA_DOBU[i].ANORMALIDAD },
      ]);
    }

    var tabla = [
      {
        text: "",
        width: "20%",
      },
      {
        marginTop: 10,
        style: "center8",
        table: {
          widths: ["20%", "20%", "10%", "10%", "20%", "20%"],
          headerRows: 1,
          body: col,
        },
        width: "60%",
        layout: "headerLineOnly",
      },
      {
        text: "",
        width: "20%",
      },
    ];

    return tabla;
  }

  function llenarTabla2() {
    var col = [
      [
        { text: "", rowSpan: 2 },
        { text: "Anterior", bold: true, colSpan: 4, rowSpan: 2, marginTop: 8 },
        {},
        {},
        {},
        { text: "Septal", bold: true, colSpan: 8 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        { text: "Inferior", bold: true, colSpan: 4, rowSpan: 2, marginTop: 8 },
        {},
        {},
        {},
        { text: "Lateral", bold: true, colSpan: 8 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        {},
        {},
        {},
        {},
        {},
        { text: "Anterior", bold: true, colSpan: 4 },
        {},
        {},
        {},
        { text: "Inferior", bold: true, colSpan: 4 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        { text: "Inferior", bold: true, colSpan: 4 },
        {},
        {},
        {},
        { text: "Anterior", bold: true, colSpan: 4 },
        {},
        {},
        {},
      ],
    ];

    var dob = [{ text: "Dobutamina", bold: true, marginTop: 2 }];
    for (var i = 0; i < 6; i++) {
      dob.push(
        { text: "R", marginTop: 2 },
        { text: "B", marginTop: 2 },
        { text: "M", marginTop: 2 },
        { text: "R", marginTop: 2, fillColor: "#D1DFF4" }
      );
    }
    col.push(dob);

    var bas = [{ text: "Basal", bold: true, marginTop: 2 }];
    for (var i in datos.BASAL) {
      if (i == 3 || i == 7 || i == 11 || i == 15 || i == 19 || i == 23) {
        bas.push({ text: datos.BASAL[i], marginTop: 2, fillColor: "#D1DFF4" });
      } else {
        bas.push({ text: datos.BASAL[i], marginTop: 2 });
      }
    }
    col.push(bas);

    var med = [{ text: "Medio", bold: true, marginTop: 2 }];
    for (var i in datos.MEDIO) {
      if (i == 3 || i == 7 || i == 11 || i == 15 || i == 19 || i == 23) {
        med.push({ text: datos.MEDIO[i], marginTop: 2, fillColor: "#D1DFF4" });
      } else {
        med.push({ text: datos.MEDIO[i], marginTop: 2 });
      }
    }
    col.push(med);

    var api = [{ text: "Apical", bold: true, marginTop: 2 }];
    for (var i in datos.APICAL) {
      if (i == 4 || i == 5 || i == 6 || i == 7 || i == 12 || i == 13 || i == 14 || i == 15) {
        if (i == 3 || i == 5 || i == 7 || i == 11 || i == 13 || i == 15) {
          api.push({ text: datos.APICAL[i], marginTop: 2, colSpan: 2, fillColor: "#D1DFF4" }, {});
        } else {
          api.push({ text: datos.APICAL[i], marginTop: 2, colSpan: 2 }, {});
        }
      } else {
        if (i == 3 || i == 5 || i == 7 || i == 11 || i == 13 || i == 15) {
          api.push({ text: datos.APICAL[i], marginTop: 2, fillColor: "#D1DFF4" });
        } else {
          api.push({ text: datos.APICAL[i], marginTop: 2 });
        }
      }
    }
    col.push(api);

    var apex1 = [{ text: "Ápex", bold: true, marginTop: 7, rowSpan: 2 }];
    var tit = ["R", "B", "M", "R"];
    for (var i in tit) {
      apex1.push({ text: tit[i], colSpan: 6 }, {}, {}, {}, {}, {});
    }
    col.push(apex1);

    var apex = [{}];
    for (var i in datos.APEX) {
      if (i == 3) {
        apex.push({ text: datos.APEX[i], colSpan: 6, fillColor: "#D1DFF4" }, {}, {}, {}, {}, {});
      } else {
        apex.push({ text: datos.APEX[i], colSpan: 6 }, {}, {}, {}, {}, {});
      }
    }
    col.push(apex);

    var tabla = [
      {
        text: "",
        width: "4%",
      },
      {
        marginTop: 10,
        style: "center8",
        table: {
          heights: [10, 10, 15, 15, 15, 15],
          widths: [
            "20%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
          ],
          body: col,
        },
        width: "96%",
      },
    ];

    return tabla;
  }
}

function _imprimirLab103_v2(datos) {
  datos.encabezado = {
    nombre: $_USUA_GLOBAL[0].NOMBRE,
    nit: $_USUA_GLOBAL[0].NIT,
    descrip: "ECOCARDIOGRAMA STRESS CON DOBUTAMINA",
  };

  if (datos.MEDICACION) datos.MEDICACION = datos.MEDICACION.replace(/&/g, "\n");
  if (datos.ECOCARDIOGRAMA_TT) datos.ECOCARDIOGRAMA_TT = datos.ECOCARDIOGRAMA_TT.replace(/&/g, "\n");
  if (datos.SINTOMAS) datos.SINTOMAS = datos.SINTOMAS.replace(/&/g, "\n");
  if (datos.ECOCARDIOGRAMA) datos.ECOCARDIOGRAMA = datos.ECOCARDIOGRAMA.replace(/&/g, "\n");
  if (datos.CONCLUSIONES) datos.CONCLUSIONES = datos.CONCLUSIONES.replace(/&/g, "\n");

  datos.tituloTabla2 = "";
  datos.tituloSintomas = "INFUSIÓN DE DOBUTAMINA";
  if (datos.METODO == "2") {
    // datos.tituloTabla2 = "Respuesta contráctil segmentaria con el ejercicio"
    datos.encabezado.descrip = "ECOCARDIOGRAMA STRESS CON EJERCICIO";
    datos.tituloSintomas = "PRUEBA DE ESFUERZO";
  }

  datos.DESCRIP_PACI = datos.DESCRIP_PACI.replace(/\s+/g, " ");
  datos.FECHA = datos.FECHA.replace(/\s+/g, " ");
  datos.FECHA = datos.FECHA.replace(/\//g, " ");

  switch (datos.EDAD.substring(0, 1)) {
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

  datos.EDAD = parseInt(datos.EDAD.substring(1, 4));

  if (datos.METODO == "2") {
    datos.titulosTabla1 = ["EJERCICIO", "FC", "TA"];
    datos.headTabla1 = ["Etapa", "I", "II", "III", "IV", "V", "VI"];
  } else {
    datos.titulosTabla1 = ["Dobutamina", "FC", "TA"];
    datos.headTabla1 = ["Dosis", "5", "10", "20", "30", "40", "50"];
  }

  datos.medico = {};
  datos.medico.nombre = datos.NOMBRE_MEDICO;
  datos.medico.espec = datos.DESCRIP_ESPEC_MEDICO ? datos.DESCRIP_ESPEC_MEDICO : "";
  datos.medico.reg = datos.REG_MEDICO;

  datos.ID_MED = datos.ID_MEDICO;

  return {
    images: { logo: `P:\\PROG\\LOGOS\\${$_USUA_GLOBAL[0].NIT}.png`, firma: `P:\\PROG\\FIRMAS\\${datos.ID_MED}.png` },
    pageMargins: [35, 158, 35, 60],
    header: function (currentPage, pageCount, pageSize) {
      var width_page = pageSize.width - 70;

      return {
        margin: [35, 30, 35, 0],
        stack: [
          {
            columns: [
              {
                margin: [7, -5, 0, 0],
                stack: [
                  {
                    image: "logo",
                    width: 80,
                    height: 45,
                  },
                ],
                width: "20%",
              },
              {
                marginTop: 5,
                style: "center10Bold",
                text: [
                  { text: datos.encabezado.nombre + "\n" },
                  { text: datos.encabezado.nit + "\n" },
                  { text: "COMPROBANTE DE PRESTACIÓN DE SERVICIOS: " + datos.COMPROB },
                ],
                width: "60%",
              },
              {
                marginTop: 5,
                style: "left10Bold",
                text: !$_impLab.hidePage ? "PAG: " + currentPage + " de " + pageCount : "",
                alignment: "right",
                marginRight: 15,
                width: "20%",
              },
            ],
          },
          {
            marginLeft: 7,
            marginTop: 5,
            table: {
              widths: ["100%"],
              headerRows: 0,
              body: [
                [{}],
                [
                  {
                    columns: [
                      { text: "CIUDAD Y FECHA:", style: "left8Bold", width: "15%" },
                      { text: datos.CIUDAD_PACI.trim() + ", " + datos.FECHA, style: "left8", width: "45%" },
                      { text: "IDENTIFICACIÓN:", style: "left8Bold", width: "15%" },
                      { text: datos.ID_HISTORIA, style: "left8", width: "25%" },
                    ],
                  },
                ],
                [
                  {
                    columns: [
                      { text: "PACIENTE:", style: "left8Bold", width: "15%" },
                      { text: datos.DESCRIP_PACI, style: "left8", width: "45%" },
                      { text: "EDAD:", style: "left8Bold", width: "7%" },
                      { text: datos.EDAD + datos.AUX_EDAD, style: "left8", width: "8%" },
                      { text: "SEXO:", style: "left8Bold", width: "7%" },
                      { text: datos.SEXO == "M" ? "Masculino" : "femenino", style: "left8", width: "11%" },
                    ],
                  },
                ],
                [
                  {
                    style: "left8",
                    columns: [
                      { text: "ENTIDAD:", style: "left8Bold", width: "15%" },
                      { text: datos.NOM_ENTIDAD, style: "left8", width: "45%" },
                      { text: "REFERIDO:", style: "left8Bold", width: "9%" },
                      { text: datos.QUIEN_REFIERE, width: "55%" },
                    ],
                  },
                ],
                [
                  {
                    style: "left8",
                    columns: [
                      { text: "DIAGN CLINICO:", bold: true, width: "15%" },
                      { text: datos.DIAGNOS + " - " + datos.DESCRIP_DIAGNOS, width: "45%" },
                      { text: "ELAB:", style: "left8Bold", width: "7%" },
                      {
                        text: datos.ADMI_CREA + " - " + datos.FECHA_CREA + " - " + datos.HORA_CREA,
                        style: "left8",
                        width: "20%",
                      },
                    ],
                  },
                ],
                [
                  {
                    style: "left8",
                    columns: [
                      {
                        text: localStorage.Usuario + moment().format(" - YYYY/MM/DD - HH:mm"),
                        fontSize: 7,
                        alignment: "right",
                        marginRight: 3,
                      },
                    ],
                  },
                ],
              ],
            },
            layout: "noBorders",
          },
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: -67,
                w: width_page,
                h: 68,
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

    styles: estilosImp_lab,
  };

  function llenarFormato() {
    var col = [
      {
        text: datos.encabezado.descrip,
        style: "center10Bold",
      },
      {
        marginTop: 10,
        style: "left8",
        columns: [
          { text: "Medicación:", style: "left9Bold", width: "12%" },
          { text: datos.MEDICACION, width: "88%", alignment: "justify" },
        ],
      },
      {
        marginTop: 10,
        style: "left10Bold",
        text: "MEDIDAS",
      },
      {
        marginTop: 3,
        style: "left8",
        stack: [
          {
            text: [
              { text: "Raiz aortica:  ", bold: true, width: "70%" },
              { text: datos.RAIZ_AORTICA, width: "15%" },
              { text: "  Cm" },
            ],
          },
          {
            marginTop: 2,
            text: [
              { text: "Auricula izquierda:  ", bold: true, width: "70%" },
              { text: datos.AURICULA_IZQ, width: "15%" },
              { text: "  Cm" },
            ],
          },
          {
            marginTop: 2,
            text: [
              { text: "Ventriculo izq diastole:  ", bold: true, width: "70%" },
              { text: datos.VENT_IZQ_DIAS, width: "15%" },
              { text: "  Cm" },
            ],
          },
          {
            marginTop: 2,
            text: [
              { text: "Ventriculo izq sistole:  ", bold: true, width: "70%" },
              { text: datos.VENT_IZQ_SIS, width: "15%" },
              { text: "  Cm" },
            ],
          },
          {
            marginTop: 2,
            text: [
              { text: "Septum IV:  ", bold: true, width: "70%" },
              { text: datos.SEPTUM, width: "15%" },
              { text: "  Cm" },
            ],
          },
          {
            marginTop: 2,
            text: [
              { text: "Pared posterior:  ", bold: true, width: "70%" },
              { text: datos.PARED_POST, width: "15%" },
              { text: "  Cm" },
            ],
          },
          {
            marginTop: 2,
            text: [
              { text: "Ventriculo derecho:  ", bold: true, width: "70%" },
              { text: datos.VENT_DER, width: "15%" },
              { text: "  Cm" },
            ],
          },
          {
            marginTop: 2,
            text: [
              { text: "Fracción de eyección:  ", bold: true, width: "70%" },
              { text: datos.FRACC_EYECC, width: "15%" },
              { text: "  %" },
            ],
          },
        ],
      },
      {
        marginTop: 10,
        style: "left8",
        columns: [
          { text: "EKG Reposo:  ", style: "left9Bold", width: "12%" },
          { text: datos.EKG_REPOSO, width: "88%" },
        ],
      },
      {
        marginTop: 5,
        style: "left8",
        text: [
          { text: "Ecocardiograma TT Reposo\n\n", style: "left9Bold", alignment: "center" },
          { text: datos.ECOCARDIOGRAMA_TT, alignment: "justify" },
        ],
      },
      {
        unbreakable: true,
        columns: llenarTabla1(),
      },
      {
        marginTop: 10,
        text: "Cálculos de Frecuencia Cardiaca",
        style: "center10Bold",
      },
      {
        marginTop: 5,
        columns: [
          {
            width: "35%",
            text: "",
          },
          {
            width: "30%",
            marginTop: 5,
            marginLeft: 23,
            style: "left8",
            stack: [
              {
                columns: [
                  { text: "Máxima 100%", bold: true, width: "70%" },
                  { text: datos.TABLA_FC[0], width: "30%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Máxima 90%", bold: true, width: "70%" },
                  { text: datos.TABLA_FC[2], width: "30%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Submáxima 85%", bold: true, width: "70%" },
                  { text: datos.TABLA_FC[3], width: "30%" },
                ],
              },
            ],
          },
          {
            width: "35%",
            text: "",
          },
        ],
      },
      {
        canvas: [{ type: "rect", w: 134, h: 41, x: 196, y: -38 }],
      },
      {
        text: datos.tituloTabla2,
        style: "center10Bold",
        marginTop: 10,
      },
      {
        marginTop: 15,
        text: datos.tituloSintomas,
        style: "center10Bold",
      },
      // {
      //     marginTop: 10,
      //     style: 'left8',
      //     columns: [
      //         { text: 'Sintomas:', style: 'left9Bold', width: '12%' },
      //         { text: datos.SINTOMAS, width: '88%', alignment: 'justify' }
      //     ]
      // },
      {
        marginTop: 5,
        style: "left8",
        text: [{ text: datos.ECOCARDIOGRAMA, alignment: "justify" }],
      },
      {
        marginTop: 5,
        style: "left8",
        text: [
          { text: "EKG:  ", style: "left9Bold" },
          { text: datos.EKG, alignment: "justify" },
        ],
      },
      {
        marginTop: 5,
        style: "left8",
        text: [
          { text: "Conclusiones:\n\n", style: "left9Bold" },
          { text: datos.CONCLUSIONES, alignment: "justify" },
        ],
      },
      firmaMedico_lab(datos),
      {
        stack:
          $_USUA_GLOBAL[0].NIT != 822006883
            ? []
            : [
                {
                  marginTop: 10,
                  text: "NOTA: Se realizó encuesta epidemiológica al ingreso a la institución sobre sintomas de COVID-19, contacto con paciente sospechosos o confirmados de COVID-19 y la realización de viajes en los últimos 15 dias, se realiza toma de temperatura, se realiza lavado de manos según las recomendaciones de la OMS en los cinco momentos en técnica y duración. Además se utiliza equipo de protección personal y las medidas de protección del paciente para COVID-19, también se realiza limpieza y desinfección de los equipos después de la atención de cada paciente. Se establece distanciamiento en la sala de espera.",
                  style: "left8",
                },
                {
                  marginTop: 10,
                  text: "IMPORTANTE: La recomendación de estudios complementarios es de tipo técnico, de acuerdo a la modalidad de imagen diagnóstica realizada, por lo que la competencia para definir la necesidad de estudios complementarios es del equipo médico tratante del paciente, de acuerdo al contexto clínico y ayudas diagnósticas previas.",
                  style: "left8",
                },
              ],
      },
    ];

    return col;
  }

  function llenarTabla1() {
    var col = [];

    var c = [];
    for (var i in datos.titulosTabla1) {
      if (i == 2) {
        c.push({ text: datos.titulosTabla1[i], bold: true, colSpan: 2 }, {});
      } else {
        c.push({ text: datos.titulosTabla1[i], bold: true });
      }
    }
    col.push(c);

    for (var i in datos.TABLA_DOBU) {
      col.push([
        { text: datos.headTabla1[i] },
        { text: datos.TABLA_DOBU[i].FC },
        { text: datos.TABLA_DOBU[i].TA_SIS },
        { text: datos.TABLA_DOBU[i].TA_DIAS },
      ]);
    }

    var tabla = [
      {
        text: "",
        width: "20%",
      },
      {
        marginTop: 10,
        style: "center8",
        table: {
          widths: ["30%", "30%", "20%", "20%"],
          headerRows: 1,
          body: col,
        },
        width: "60%",
        layout: "headerLineOnly",
      },
      {
        text: "",
        width: "20%",
      },
    ];

    return tabla;
  }

  function llenarTabla2() {
    var col = [
      [
        { text: "", rowSpan: 2 },
        { text: "Anterior", bold: true, colSpan: 4, rowSpan: 2, marginTop: 8 },
        {},
        {},
        {},
        { text: "Septal", bold: true, colSpan: 8 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        { text: "Inferior", bold: true, colSpan: 4, rowSpan: 2, marginTop: 8 },
        {},
        {},
        {},
        { text: "Lateral", bold: true, colSpan: 8 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        {},
        {},
        {},
        {},
        {},
        { text: "Anterior", bold: true, colSpan: 4 },
        {},
        {},
        {},
        { text: "Inferior", bold: true, colSpan: 4 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        { text: "Inferior", bold: true, colSpan: 4 },
        {},
        {},
        {},
        { text: "Anterior", bold: true, colSpan: 4 },
        {},
        {},
        {},
      ],
    ];

    var dob = [{ text: "Dobutamina", bold: true, marginTop: 2 }];
    for (var i = 0; i < 6; i++) {
      dob.push(
        { text: "R", marginTop: 2 },
        { text: "B", marginTop: 2 },
        { text: "M", marginTop: 2 },
        { text: "R", marginTop: 2, fillColor: "#D1DFF4" }
      );
    }
    col.push(dob);

    var bas = [{ text: "Basal", bold: true, marginTop: 2 }];
    for (var i in datos.BASAL) {
      if (i == 3 || i == 7 || i == 11 || i == 15 || i == 19 || i == 23) {
        bas.push({ text: datos.BASAL[i], marginTop: 2, fillColor: "#D1DFF4" });
      } else {
        bas.push({ text: datos.BASAL[i], marginTop: 2 });
      }
    }
    col.push(bas);

    var med = [{ text: "Medio", bold: true, marginTop: 2 }];
    for (var i in datos.MEDIO) {
      if (i == 3 || i == 7 || i == 11 || i == 15 || i == 19 || i == 23) {
        med.push({ text: datos.MEDIO[i], marginTop: 2, fillColor: "#D1DFF4" });
      } else {
        med.push({ text: datos.MEDIO[i], marginTop: 2 });
      }
    }
    col.push(med);

    var api = [{ text: "Apical", bold: true, marginTop: 2 }];
    for (var i in datos.APICAL) {
      if (i == 4 || i == 5 || i == 6 || i == 7 || i == 12 || i == 13 || i == 14 || i == 15) {
        if (i == 3 || i == 5 || i == 7 || i == 11 || i == 13 || i == 15) {
          api.push({ text: datos.APICAL[i], marginTop: 2, colSpan: 2, fillColor: "#D1DFF4" }, {});
        } else {
          api.push({ text: datos.APICAL[i], marginTop: 2, colSpan: 2 }, {});
        }
      } else {
        if (i == 3 || i == 5 || i == 7 || i == 11 || i == 13 || i == 15) {
          api.push({ text: datos.APICAL[i], marginTop: 2, fillColor: "#D1DFF4" });
        } else {
          api.push({ text: datos.APICAL[i], marginTop: 2 });
        }
      }
    }
    col.push(api);

    var apex1 = [{ text: "Ápex", bold: true, marginTop: 7, rowSpan: 2 }];
    var tit = ["R", "B", "M", "R"];
    for (var i in tit) {
      apex1.push({ text: tit[i], colSpan: 6 }, {}, {}, {}, {}, {});
    }
    col.push(apex1);

    var apex = [{}];
    for (var i in datos.APEX) {
      if (i == 3) {
        apex.push({ text: datos.APEX[i], colSpan: 6, fillColor: "#D1DFF4" }, {}, {}, {}, {}, {});
      } else {
        apex.push({ text: datos.APEX[i], colSpan: 6 }, {}, {}, {}, {}, {});
      }
    }
    col.push(apex);

    var tabla = [
      {
        text: "",
        width: "4%",
      },
      {
        marginTop: 10,
        style: "center8",
        table: {
          heights: [10, 10, 15, 15, 15, 15],
          widths: [
            "20%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
            "3%",
          ],
          body: col,
        },
        width: "96%",
      },
    ];

    return tabla;
  }
}

var formatoBaseImp_lab = {
  contador: 0,
  images: {},
  pageMargins: "",
  header: "",
  content: [
    {
      margin: [0, 5, 0, 0],
      stack: [],
    },
  ],

  styles: estilosImp_lab,
};

function inicialidarFormatoBase_lab() {
  formatoBaseImp_lab = {
    contador: 0,
    images: {},
    pageMargins: "",
    header: "",
    content: [
      {
        margin: [0, 5, 0, 0],
        stack: [],
      },
    ],

    styles: estilosImp_lab,
  };
}

var estilosImp_lab = {
  subtitulo: {
    bold: true,
    decoration: "underline",
  },
  headerSub: {
    fontSize: 8,
    bold: true,
  },
  bodySub: {
    fontSize: 8,
  },
  headTabla: {
    fontSize: 10,
    alignment: "center",
    bold: true,
  },
  bodyTabla: {
    fontSize: 8,
  },
  headerTabla: {
    fontSize: 8,
    alignment: "center",
    bold: true,
  },
  bodyTabla2: {
    fontSize: 8,
    alignment: "center",
  },
  equis: {
    fontSize: 9,
    bold: true,
    alignment: "center",
  },
  headerTabla1: {
    fontSize: 8,
    alignment: "center",
    bold: true,
  },
  headerTabla2: {
    fontSize: 8,
    alignment: "center",
    color: "#178696",
  },
  left8: {
    fontSize: 8,
  },
  center10Bold: {
    fontSize: 10,
    alignment: "center",
    bold: true,
  },
  center8: {
    fontSize: 8,
    alignment: "center",
  },
  center8Bold: {
    fontSize: 8,
    alignment: "center",
    bold: true,
  },
  left8Bold: {
    fontSize: 8,
    bold: true,
  },
  left10: {
    fontSize: 10,
  },
  left10Bold: {
    fontSize: 10,
    bold: true,
  },
  center6: {
    fontSize: 6,
    alignment: "center",
  },
  left6: {
    fontSize: 6,
  },
  right8: {
    fontSize: 8,
    alignment: "right",
  },
  right8Bold: {
    fontSize: 8,
    alignment: "right",
    bold: true,
  },
  encTabla: {
    fontSize: 9,
    alignment: "center",
    bold: true,
    fillColor: "#D1DFF4",
    marginTop: 2,
  },
  left9Bold: {
    fontSize: 9,
    bold: true,
  },
  center10BoldT: {
    fontSize: 10,
    alignment: "center",
    bold: true,
    fillColor: "#D1DFF4",
  },
};

function headerLAB102(datos, resumido) {
  return function (currentPage, pageCount, pageSize) {
    var width_page = pageSize.width - 70;

    return {
      margin: [35, 30, 35, 0],
      stack: [
        {
          columns: [
            {
              margin: [7, -5, 0, 0],
              stack: [
                {
                  image: "logo",
                  width: 80,
                  height: 45,
                },
              ],
              width: "20%",
            },
            {
              marginTop: 5,
              style: "center10Bold",
              text: [
                { text: $_USUA_GLOBAL[0].NOMBRE + "\n" },
                { text: $_USUA_GLOBAL[0].NIT + "\n" },
                { text: "RESULTADOS DE EXAMEN " },
              ],
              width: "60%",
            },
            {
              marginTop: 5,
              style: "left10Bold",
              text: !$_impLab.hidePage ? "PAG: " + currentPage + " de " + pageCount : "",
              alignment: "right",
              marginRight: 15,
              width: "20%",
            },
          ],
        },
        {
          marginLeft: 7,
          marginTop: 5,
          table: {
            widths: ["100%"],
            headerRows: 0,
            body: [
              [{}],
              [
                {
                  columns: [
                    { text: "TIPO-ID:", style: "left8Bold", width: "7%" },
                    { text: datos.TIPO_ID, style: "left8", width: "5%" },
                    { text: "IDENTIFICACIÓN:", style: "left8Bold", width: "13%" },
                    { text: datos.ID_HISTORIA, style: "left8", width: "25%" },
                    { text: "TIPO SANGRE:", style: "left8Bold", width: "11%" },
                    { text: datos.GRUPO_SANG, style: "left8", width: "5%" },
                    { text: "RH:", style: "left8Bold", width: "3%" },
                    { text: datos.RH, style: "left8", width: "10%" },
                  ],
                },
              ],
              [
                {
                  columns: [
                    { text: "PACIENTE:", style: "left8Bold", width: "8%" },
                    { text: datos.DESCRIP_PACI, style: "left8", width: "42%" },
                    { text: "SEXO:", style: "left8Bold", width: "5%" },
                    { text: datos.SEXO == "M" ? "Masculino" : "femenino", style: "left8", width: "11%" },
                    { text: "CIUDAD:", style: "left8Bold", width: "7%" },
                    { text: datos.CIUDAD_PACI.trim(), width: "28%", style: "left8" },
                  ],
                },
              ],
              [
                {
                  columns: [
                    { text: "FECHA NACIMIENTO:", style: "left8Bold", width: "16%" },
                    { text: datos.FECHA_NACIM, style: "left8", width: "34%" },
                    { text: "IMP:", style: "left8Bold", width: "5%" },
                    {
                      text: localStorage.Usuario + moment().format(" - YYYY/MM/DD - HH:mm"),
                      style: "left8",
                      width: "20%",
                    },
                    { text: "ELAB:", style: "left8Bold", width: "5%" },
                    {
                      text: datos.ADMI_CREA + " - " + datos.FECHA_CREA + " - " + datos.HORA_CREA,
                      style: "left8",
                      width: "20%",
                    },
                  ],
                },
              ],
            ],
          },
          layout: "noBorders",
        },
        {
          canvas: [
            {
              type: "rect",
              x: 0,
              y: -42,
              w: width_page,
              h: 44,
              r: 0,
              lineWidth: 1,
              lineColor: "#000",
            },
          ],
        },
      ],
    };
  };
}

function firmaMedico_lab(datos, nomFirma) {
  var col = {
    marginTop: 5,
    unbreakable: true,
    table: {
      heights: [15, 15, 15, 20],
      widths: ["70%", "30%"],
      headerRows: 0,
      body: [
        [{ text: "QUIEN REALIZA LA VALORACIÓN", style: "center10BoldT", colSpan: 2 }, {}],
        [
          {
            stack: [
              {
                marginTop: 10,
                columns: [
                  { text: "NOMBRES Y APELLIDOS: ", style: "left8", bold: true, width: "28%" },
                  { text: datos.medico.nombre, style: "left8", width: "100%" },
                ],
              },
              {
                marginTop: 5,
                columns: [
                  { text: "ESPECIALIDAD: ", style: "left8", bold: true, width: "28%" },
                  { text: datos.medico.espec, style: "left8", width: "82%" },
                ],
              },
              {
                marginTop: 5,
                columns: [
                  { text: "REGISTRO No: ", style: "left8", bold: true, width: "28%" },
                  { text: datos.medico.reg, style: "left8", width: "82%" },
                ],
              },
            ],
          },
          {
            image: !nomFirma ? "firma" : nomFirma,
            width: 150,
            height: 60,
          },
        ],
      ],
    },
  };

  return col;
}

async function unirPdfs_lab(arrayData, retornar, nomPdf) {
  var merger = new PDFMerger();

  for (var i in arrayData) {
    if (arrayData[i] != undefined) {
      var x = await new Buffer.from(arrayData[i]);
      merger.add(x);
    }
  }

  var nombrePdf = "";
  if (nomPdf != undefined) {
    nombrePdf = nomPdf;
  } else {
    nombrePdf = `C:/PROSOFT/TEMP/${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`;
  }

  await merger.save(nombrePdf);

  if (retornar) {
    $_impLab.nombrePdf = nombrePdf;
  } else {
    child(`start ${nombrePdf}`);
  }
}

async function modifyPdf_lab() {
  const url = $_impLab.nombrePdf;
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  for (var i in pages) {
    const pageAct = pages[i];
    const { width, height } = pageAct.getSize();
    pageAct.drawText(`PAG ${parseInt(i) + 1} de ${pages.length}`, {
      x: 485,
      y: height - 45,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
  }

  const pdfBytes = await pdfDoc.save();
  await unirPdfs_lab([pdfBytes], false, $_impLab.nombrePdf);
}

async function guardarHoraEnvioEmailLab() {
  let enviado = await envioCorreoResultadosLab();

  if (enviado) {
    console.log("envio");
    CON851("", "Correo enviado !", null, "success", "Correcto");
    var envio = {};

    impresionesCorrectas.forEach(function (item, i) {
      var pos = i + 1;

      envio["LLAVE-" + pos.toString().padStart(3, "0")] = item;
    });

    envio["datosh"] = datosEnvio() + moment().format("YYYYMMDD") + "|" + moment().format("HHmm") + "|";
    console.log(envio);
    postData(envio, get_url("APP/LAB/EMAIL_LAB.DLL"))
      .then((data) => {
        impresionesCorrectas = [];
        adjuntosEmail = [];
        console.log(data);
        loader("hide");
        CON851("", data, null, "success", "Correcto");
      })
      .catch((err) => {
        impresionesCorrectas = [];
        adjuntosEmail = [];
        console.log(err);
        loader("hide");
        CON851("", "Hora de correo no pudo ser guardada", null, "error", "Error");
      });
  } else {
    console.log("fallo envio");
    CON851("", "Error enviando correo", null, "error", "Error");
    impresionesCorrectas = [];
    adjuntosEmail = [];
  }
}

async function envioCorreoResultadosLab() {
  console.log(impresionesCorrectas);
  //   let pdf = "C:/PROSOFT/TEMP/ADMI091652.pdf";
  //   formData.append("correo_destinatario", "gabrielbohorquezr@hotmail.com"); SOLO PARA PRUEBA
  //   formData.append("url_pdf", pdf.replace(/\//g, "\\\\"));
  //   formData.append("nombre_paci", "gabriel bohorquez");

  var formData = new FormData();
  formData.append("correo_destinatario", $_impLab.email_paci);
  formData.append("url_pdf", $_impLab.nombrePdf.replace(/\//g, "\\\\"));
  formData.append("nombre_paci", $_impLab.nombre_paci);
  formData.append("adjuntos", JSON.stringify(adjuntosEmail));

  return new Promise((resolve, reject) => {
    fetch(get_url("app/Inc/envio_email_lab.php"), {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((res) => {
        let response = JSON.parse(res);
        console.log(response);

        if (response.STATUS == "00") {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        console.error(error);
        resolve(false);
      });
  });
}
