/** @format */

class formato_HCI8051 {
  constructor(params) {
    this.hcprc = params.hcprc;
    this.detalles = params.detalles;
    this.opciones = params.opciones;
    this.paci = params.paci;
    this.datos = {};
    this.TABLAS_OMS = [];
    this.w_rect = 15;
    this.h_rect = 10;
    this.dato_8051 = {};
    this.dato_7501 = {};
    this.dato_7503 = {};
    this.dato_1001 = {};
    this.dato_4005 = {};
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

    this.dato_7501 = this.detalles.find((e) => e["COD-DETHC"] == "7501" && e["LLAVE-HC"] == this.hcprc.llave);
    if (this.dato_7501) this.dato_7501 = this.dato_7501.DETALLE;

    this.dato_7503 = this.detalles.find((e) => e["COD-DETHC"] == "7503" && e["LLAVE-HC"] == this.hcprc.llave);
    if (this.dato_7503) this.dato_7503 = this.dato_7503.DETALLE;

    this.dato_1001 = this.detalles.find((e) => e["COD-DETHC"] == "1001" && e["LLAVE-HC"] == this.hcprc.llave);
    if (this.dato_1001) this.dato_1001 = this.dato_1001.DETALLE;

    this.dato_4005 = this.detalles.find((e) => e["COD-DETHC"] == "4005" && e["LLAVE-HC"] == this.hcprc.llave);
    if (this.dato_4005) this.dato_4005 = this.dato_4005.DETALLE;

    this.dato_9008 = this.detalles.find((e) => e["COD-DETHC"] == "9008" && e["LLAVE-HC"] == this.hcprc.llave);
    if (this.dato_9008) this.dato_9008 = this.dato_9008.DETALLE;

    if (this.dato_8051) this.encabezado();
    else {
      CON851("", "Error en impresión, informacion no encontrada", null, "error", "Error");
    }
  }

  encabezado() {
    this.datos = this.dato_8051;

    this.datos.encabezado = {};
    this.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
    this.datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;

    this.opciones.opc_aper == "S"
      ? (this.datos.encabezado.titulo = "HISTORIA CLINICA")
      : (this.datos.encabezado.titulo = "EXTRACTO DE HISTORIA CLINICA");

    this.reemplazar_pantalla();
  }

  reemplazar_pantalla() {
    this.datos = {
      ...this.dato_8051,
      paciente: llenarPacienteAperturas2_impHc(this.paci, this.hcprc),
    };

    this.consulta_principal();
  }

  consulta_principal() {
    this.datos.consulta_princ = {};
    this.datos.consulta_princ.fecha = _editFecha2(this.hcprc.fecha);

    switch (this.hcprc.unid_edad) {
      case "A":
        this.datos.consulta_princ.edad = `${this.hcprc.vlr_edad} Años`;
        break;
      case "M":
        this.datos.consulta_princ.edad = `${this.hcprc.vlr_edad} Meses`;
        break;
      case "D":
        this.datos.consulta_princ.edad = `${this.hcprc.vlr_edad} Dias`;
        break;
    }

    this.datos.consulta_princ.est_civil = _ESTCIVIL(this.paci["EST-CIV"]);
    this.datos.consulta_princ.acompa = this.hcprc.acompa;

    this.observaciones_consulta();
    this.imprimir_enfermedad_actual();
    this.nivel_instruccion();
  }

  observaciones_consulta() {
    this.datos.motiv = this.hcprc.motiv;
  }

  imprimir_enfermedad_actual() {
    this.datos.enfer_actual = this.dato_1001 ? this.dato_1001 : "";
  }

  nivel_instruccion() {
    if (this.datos.familia.fam_nivel_estud.semestre_estud_padre == 0)
      this.datos.familia.fam_nivel_estud.semestre_estud_padre = " ";
    if (this.datos.familia.fam_nivel_estud.semestre_estud_madre == 0)
      this.datos.familia.fam_nivel_estud.semestre_estud_madre = " ";
    if (this.datos.familia.fam_nivel_estud.semestre_estud_pareja == 0)
      this.datos.familia.fam_nivel_estud.semestre_estud_pareja = " ";

    this.calcular_imc();
  }

  async calcular_imc() {
    let imc = this.hcprc.imc_corp;

    if (
      this.hcprc.unid_edad == "A" &&
      this.hcprc.vlr_edad > 4 &&
      this.hcprc.vlr_edad < 18 &&
      [4, 0, 9].includes(parseInt(this.hcprc.rips.embarazo))
    ) {
      if (this.hcprc.edad_dias < 1) this.hcprc.edad_dias = SC_DIAS_MESES(this.paci.NACIM, this.hcprc.fecha);

      await postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/AIE-DESA.DLL"))
        .then((data) => {
          this.TABLAS_OMS = data.TABLAS_OMS;

          let busqueda = this.TABLAS_OMS.find(
            (e) =>
              e.LLAVE.slice(0, 3) == "IMC" &&
              e.LLAVE.slice(3, 4) == this.paci.SEXO &&
              parseInt(e.LLAVE.slice(4)) == this.hcprc.edad_dias
          );
          if (busqueda) {
            if (imc > busqueda.DATO_2) {
              this.datos.clasif_imc = "OBESIDAD";
            } else if (imc > busqueda.DATO_1) {
              this.datos.clasif_imc = "SOBREPESO";
            } else if (imc >= busqueda.DATO_M1) {
              this.datos.clasif_imc = "IMC ADECUADO PARA LA EDAD";
            } else if (imc >= busqueda.DATO_M2) {
              this.datos.clasif_imc = "RIESGO DE DELGADEZ";
            } else {
              this.datos.clasif_imc = "DELGADEZ";
            }
          }
        })
        .catch((err) => {
          CON851("", "Error consultando datos", null, "error", "Error");
          console.error(err);
        });
    } else {
      if (
        this.hcprc.unid_edad == "A" &&
        this.hcprc.vlr_edad > 18 &&
        (this.hcprc.rips.embarazo == 4 || this.hcprc.rips.embarazo == 0)
      ) {
        if (imc >= 30) {
          this.datos.clasif_imc = "PACIENTE OBESO";
        } else if (imc >= 25) {
          this.datos.clasif_imc = "PACIENTE CON SOBREPESO";
        } else if (imc < 18.5) {
          this.datos.clasif_imc = "DELGADEZ";
        } else if (imc < 25) {
          this.datos.clasif_imc = "NORMAL";
        }
      }
    }

    this.imprimir_firma();
  }

  imprimir_firma() {
    this.datos.medico = {};
    this.datos.medico.firma = parseFloat(this.hcprc.med.trim());
    this.datos.medico.nombre = this.hcprc.descrip_med;
    this.datos.medico.espec = this.hcprc.descrip_espec_med;
    this.datos.medico.reg = this.hcprc.reg_med;
    this.datos.medico.id = parseFloat(this.hcprc.med.trim());

    this.cerrar_archivos();
  }

  async cerrar_archivos() {
    inicializarFormatoBase_impHc();

    this._imprimir()
      .then(async () => {
        this.impresiones_complementarias();

        if (this.opciones.opc_resu == "N" && this.hcprc.cierre.estado == 2) {
          await this.llenar_egreso();
        }

        if (this.opciones.opc_resu != "S") {
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

  llenar_egreso() {
    const { iniciar_HCI01C } = require("../../../HICLIN/scripts/HCI01C");

    return new Promise((resolve) => {
      iniciar_HCI01C({
        hcprc: this.hcprc,
        callback: resolve,
      });
    });
  }

  async impresiones_complementarias() {
    // se omiten porque no estan hechos los formularios

    // if (this.datos.sexualidad.relaciones_sex != 1) {
    //   await this.llamar_HCI8051A();
    // }

    // if (this.datos.gineco_urologico.gine_its == "S") {
    //   await this.llamar_HCI8051B();
    // }

    if (this.dato_9008) {
      if (this.hcprc.serv == "02" || (this.hcprc.serv == "08" && this.dato_9008.activ_fisica.trim())) {
        this.llamar_findrisk();
      }
    }

    if (
      this.hcprc.rips.discapacidades.fisica.trim() ||
      this.hcprc.rips.discapacidades.mental.trim() ||
      this.hcprc.rips.discapacidades.cognitiva.trim() ||
      this.hcprc.rips.discapacidades.auditiva.trim() ||
      this.hcprc.rips.discapacidades.visual.trim()
    ) {
      this.llamar_discap();
    }
  }

  llamar_HCI8051A() {
    const { imprimir_HCI8051A } = require("../hiclin/HCI-8051A.formato.js");

    imprimir_HCI8051A({
      opciones: this.opciones,
      hcprc: this.hcprc,
      detalles: this.detalles,
      paci: this.paci,
    });
  }

  llamar_HCI8051B() {
    const { imprimir_HCI8051B } = require("../hiclin/HCI-8051B.formato.js");

    imprimir_HCI8051B({
      opciones: this.opciones,
      hcprc: this.hcprc,
      detalles: this.detalles,
      paci: this.paci,
    });
  }

  llamar_findrisk() {
    const { imprimir_FINDRISK } = require("../hiclin/Findrisk.formato.js");

    imprimir_FINDRISK({
      opciones: this.opciones,
      hcprc: this.hcprc,
      detalles: this.detalles,
      paci: this.paci,
    });
  }

  llamar_discap() {
    const { imprimir_DISCAP } = require("../hiclin/Discapacidad.formato.js");

    imprimir_DISCAP({
      opciones: this.opciones,
      hcprc: this.hcprc,
      detalles: this.detalles,
      paci: this.paci,
    });
  }

  _imprimir() {
    return new Promise((resolve, reject) => {
      formatoBaseImp_Hc.images = {
        logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT),
        firma: rutaFirmas_impHc(this.datos.medico.firma),
      };
      formatoBaseImp_Hc.pageMargins = [20, 143, 20, 60];
      formatoBaseImp_Hc.header = encabezadoAperturas_impHc(
        this.datos,
        [20, 25, 20, 0],
        "CLAP/SMR-OPS/OMS HISTORIA DEL ADOLESCENTE"
      );

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
            stack: [
              {
                text: "CONSULTA PRINCIPAL",
                style: "left10Bold",
              },
              {
                marginTop: 2,
                columns: [
                  {
                    text: "EDAD: ",
                    style: "left8Bold",
                    width: "5%",
                  },
                  {
                    text: this.datos.consulta_princ.edad ? parseInt(this.datos.consulta_princ.edad) : " ",
                    style: "left8",
                    width: "12%",
                  },
                  {
                    text: "ESTADO CIVIL: ",
                    style: "left8Bold",
                    width: "11%",
                  },
                  {
                    text: this.datos.consulta_princ.est_civil,
                    style: "left8",
                    width: "12%",
                  },
                  {
                    text: "ACOMPAÑANTE: ",
                    style: "left8Bold",
                    width: "12%",
                  },
                  {
                    text: this.datos.consulta_princ.acompa,
                    style: "left8",
                    width: "34%",
                  },
                  {
                    text: "FECHA: ",
                    style: "left8Bold",
                    width: "6%",
                  },
                  {
                    text: this.datos.consulta_princ.fecha,
                    style: "left8",
                    width: "27%",
                  },
                ],
              },
              {
                text: "MOTIVO DE CONSULTA:",
                style: "left8Bold",
                marginTop: 2,
              },
              {
                text: this.datos.motiv ? this.datos.motiv.enterPut() : " ",
                style: "left8",
              },
              {
                text: "ENFERMEDAD ACTUAL:",
                style: "left8Bold",
                marginTop: 2,
              },
              {
                text: this.datos.enfer_actual ? this.datos.enfer_actual.enterPut() : " ",
                style: "left8",
              },
            ],
          },
          {
            marginTop: 5,
            style: "center8",
            table: {
              widths: ["20%", "20%", "20%", "20%", "20%"],
              body: [
                [
                  {
                    text: "ANTECEDENTES PERSONALES",
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
                    style: "left8",
                    stack: [
                      {
                        text: "PERINATALES",
                        style: "center8",
                      },
                      {
                        text: "NORMALES",
                        style: "center7",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.perinatales == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.perinatales == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.perinatales == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "CRECIMIENTO",
                        style: "center8",
                      },
                      {
                        text: "NORMAL",
                        style: "center7",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.crecimiento == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.crecimiento == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.crecimiento == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "DESARROLLO",
                        style: "center8",
                      },
                      {
                        text: "NORMAL",
                        style: "center7",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.desarrollo == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.desarrollo == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.desarrollo == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "VACUNAS",
                        style: "center8",
                      },
                      {
                        text: "COMPLETAS",
                        style: "center7",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.vacunas == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.vacunas == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.vacunas == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "DISCAPACIDAD",
                        style: "center8",
                      },
                      {
                        marginTop: 12,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.discapacidad == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.discapacidad == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.discapacidad == 3),
                          },
                        ],
                      },
                    ],
                  },
                ],
                [
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "ENFERMEDADES",
                        style: "center8",
                      },
                      {
                        text: "CRONICAS",
                        style: "center7",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.enf_cronica == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.enf_cronica == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.enf_cronica == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "ENFERMEDADES",
                        style: "center8",
                      },
                      {
                        text: "INFECTO CONTAGIOSAS",
                        style: "center7",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.enf_infe_cont == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.enf_infe_cont == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.enf_infe_cont == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "ACCIDENTES",
                        style: "center8",
                      },
                      {
                        marginTop: 12,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.accidentes == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.accidentes == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.accidentes == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      { text: "LLAMATIVAMENTE", style: "center8" },
                      { text: "FRECUENTES", style: "center7" },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.accid_frec == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.accid_frec == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.accid_frec == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "PROBLEMAS",
                        style: "center8",
                      },
                      {
                        text: "PSICOLOGICOS",
                        style: "center7",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.problem_psico == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.problem_psico == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.problem_psico == 3),
                          },
                        ],
                      },
                    ],
                  },
                ],
                [
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "VIOLENCIA",
                        style: "center8",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.violencia == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.violencia == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.violencia == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "JUDICIALES",
                        style: "center8",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.judiciales == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.judiciales == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_personales.judiciales == 3),
                          },
                        ],
                      },
                    ],
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
                text: this.datos.ant_personales.observ_pers ? this.datos.ant_personales.observ_pers.enterPut() : " ",
                style: "left8",
              },
            ],
          },
          {
            style: "center8",
            table: {
              widths: ["20%", "20%", "20%", "20%", "20%"],
              body: [
                [
                  {
                    text: "ANTECEDENTES FAMILIARES",
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
                    style: "left8",
                    stack: [
                      {
                        text: "DIABETES",
                        style: "center8",
                      },
                      {
                        marginTop: 12,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.diabetes == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.diabetes == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.diabetes == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "OBESIDAD",
                        style: "center8",
                      },
                      {
                        marginTop: 12,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.obesidad == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.obesidad == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.obesidad == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "CARDIOVASC",
                        style: "center8",
                      },
                      {
                        text: "(MAT,CARDIOLOGIA ETC.)",
                        style: "center7",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.cardiovascular == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.cardiovascular == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.cardiovascular == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "ALERGIA",
                        style: "center8",
                      },
                      {
                        marginTop: 12,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.alergia == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.alergia == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.alergia == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "INFECCIONES",
                        style: "center8",
                      },
                      {
                        marginTop: 12,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.infecciones == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.infecciones == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.infecciones == 3),
                          },
                        ],
                      },
                    ],
                  },
                ],
                [
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "\nCANCER",
                        style: "center8",
                      },
                      {
                        marginTop: 12,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.cancer == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.cancer == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.cancer == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "PROBLEMAS PSICOLOGICOS",
                        style: "center8",
                      },
                      {
                        text: "Y/O PSIQUIATRICOS",
                        style: "center7",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.fam_psico == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.fam_psico == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.fam_psico == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "ALCOHOL DROGRAS \n Y OTROS",
                        style: "center8",
                      },
                      {
                        marginTop: 12,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.alcohol_drog == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.alcohol_drog == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.alcohol_drog == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "VIOLENCIA \n INTRAFAMILIAR",
                        style: "center8",
                      },
                      {
                        marginTop: 12,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.violencia_fam == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.violencia_fam == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.violencia_fam == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "MADRE Y/O PADRE ADOLECENTE",
                        style: "center8",
                      },
                      {
                        marginTop: 12,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.madre_padre_adol == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.madre_padre_adol == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.madre_padre_adol == 3),
                          },
                        ],
                      },
                    ],
                  },
                ],
                [
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "JUDICIALES",
                        style: "center8",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.fam_judiciales == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.fam_judiciales == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.fam_judiciales == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      { text: "OTROS", style: "center8" },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.otros == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.otros == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.otros == 3),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left8",
                    stack: [
                      {
                        text: "NEUROLOGICOS",
                        style: "center8",
                      },
                      {
                        marginTop: 4,
                        columns: [
                          {
                            text: "SI",
                            width: "9%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.neurologicos == 1),
                          },
                          {
                            text: "NO",
                            width: "13%",
                          },
                          {
                            width: "20%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.neurologicos == 2),
                          },
                          {
                            text: "NO SE",
                            width: "25%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.ant_familiares.neurologicos == 3),
                          },
                        ],
                      },
                    ],
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
              {
                text: "OBSERVACIONES",
                style: "left8Bold",
              },
              {
                text: this.datos.ant_familiares.observ_fam ? this.datos.ant_familiares.observ_fam.enterPut() : " ",
                style: "left8",
              },
            ],
          },
          {
            table: {
              widths: ["33%", "30%", "37%"],
              body: [
                [{ text: "FAMILIA", style: "left10BoldT", colSpan: 3 }, {}, {}],
                [
                  {
                    stack: [
                      {
                        style: "center7Bold",
                        columns: [
                          { text: "", width: "70%" },
                          { text: "NO", width: "13%" },
                          { text: "SI", width: "9%" },
                        ],
                      },
                      {
                        style: "left7",
                        columns: [
                          {
                            text: "VIVE",
                            width: "20%",
                            style: "left7Bold",
                          },
                          {
                            stack: [
                              {
                                columns: [
                                  { text: "SOLO", width: "60%" },
                                  {
                                    style: "center7",
                                    width: "20%",
                                    stack: this.cuadro_canvas(this.datos.familia.vive_lugar != 1),
                                  },
                                  {
                                    width: "20%",
                                    stack: this.cuadro_canvas(this.datos.familia.vive_lugar == 1),
                                  },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  { text: "EN LA CASA", width: "60%" },
                                  {
                                    style: "center7",
                                    width: "20%",
                                    stack: this.cuadro_canvas(this.datos.familia.vive_lugar != 2),
                                  },
                                  {
                                    width: "20%",
                                    stack: this.cuadro_canvas(this.datos.familia.vive_lugar == 2),
                                  },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  { text: "EN LA CALLE", width: "60%" },
                                  {
                                    style: "center7",
                                    width: "20%",
                                    stack: this.cuadro_canvas(this.datos.familia.vive_lugar != 3),
                                  },
                                  {
                                    width: "20%",
                                    stack: this.cuadro_canvas(this.datos.familia.vive_lugar == 3),
                                  },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  { text: "EN INST. PROTECTORA", width: "60%" },
                                  {
                                    style: "center7",
                                    width: "20%",
                                    stack: this.cuadro_canvas(this.datos.familia.vive_lugar != 4),
                                  },
                                  {
                                    width: "20%",
                                    stack: this.cuadro_canvas(this.datos.familia.vive_lugar == 4),
                                  },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  { text: "PRIVADO DE LIBERTAD", width: "60%" },
                                  {
                                    style: "center7",
                                    width: "20%",
                                    stack: this.cuadro_canvas(this.datos.familia.vive_lugar != 5),
                                  },
                                  {
                                    width: "20%",
                                    stack: this.cuadro_canvas(this.datos.familia.vive_lugar == 5),
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        marginTop: 10,
                        style: "center7",
                        columns: [
                          { text: "CONVIVE\n CON", width: "35%", style: "left7Bold" },
                          { text: "NO", width: "15%" },
                          { text: "EN LA CASA", width: "15%" },
                          { text: "EN EL BARRIO", width: "15%" },
                          { text: "COMPARTE LA CAMA", width: "20%" },
                        ],
                      },
                      {
                        style: "left7",
                        columns: [
                          {
                            stack: [
                              {
                                style: "center7",
                                marginTop: 3,
                                columns: [
                                  { text: "MADRE", width: "35%", style: "left7" },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_madre == 1),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_madre == 2),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_madre == 3),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_madre == 4),
                                  },
                                ],
                              },
                              {
                                style: "center7",
                                marginTop: 3,
                                columns: [
                                  { text: "PADRE", width: "35%", style: "left7" },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_padre == 1),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_padre == 2),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_padre == 3),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_padre == 4),
                                  },
                                ],
                              },
                              {
                                style: "center7",
                                marginTop: 3,
                                columns: [
                                  { text: "MADRASTRA", width: "35%", style: "left7" },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_madrastra == 1),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_madrastra == 2),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_madrastra == 3),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_madrastra == 4),
                                  },
                                ],
                              },
                              {
                                style: "center7",
                                marginTop: 3,
                                columns: [
                                  { text: "PADRASTRO", width: "35%", style: "left7" },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_padrastro == 1),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_padrastro == 2),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_padrastro == 3),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_padrastro == 4),
                                  },
                                ],
                              },
                              {
                                style: "center7",
                                marginTop: 3,
                                columns: [
                                  { text: "HERMANOS", width: "35%", style: "left7" },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_hermanos == 1),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_hermanos == 2),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_hermanos == 3),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_hermanos == 4),
                                  },
                                ],
                              },
                              {
                                style: "center7",
                                marginTop: 3,
                                columns: [
                                  { text: "PAREJA", width: "35%", style: "left7" },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_pareja == 1),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_pareja == 2),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_pareja == 3),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_pareja == 4),
                                  },
                                ],
                              },
                              {
                                style: "center7",
                                marginTop: 3,
                                columns: [
                                  { text: "HIJO", width: "35%", style: "left7" },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_hijo == 1),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_hijo == 2),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_hijo == 3),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_hijo == 4),
                                  },
                                ],
                              },
                              {
                                style: "center7",
                                marginTop: 3,
                                columns: [
                                  { text: "OTROS", width: "35%", style: "left7" },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_otros == 1),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_otros == 2),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_otros == 3),
                                  },
                                  {
                                    width: "15%",
                                    stack: this.cuadro_canvas(this.datos.familia.convive_otros == 4),
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
                    stack: [
                      {
                        text: "NIVEL DE INSTRUCCIÓN",
                        style: "center8Bold",
                      },
                      {
                        marginTop: 5,
                        style: "center7",
                        columns: [
                          {
                            stack: [
                              { text: "PADRE O SUSTITUTO" },
                              { text: nivel_estudio_mainHc(this.datos.familia.fam_nivel_estud.niv_estud_padre) },
                              {
                                marginTop: 3,
                                text: [
                                  { text: "NIVEL:  " },
                                  { text: this.datos.familia.fam_nivel_estud.semestre_estud_padre },
                                ],
                              },
                            ],
                          },
                          {
                            stack: [
                              { text: "MADRE O SUSTITUTO" },
                              { text: nivel_estudio_mainHc(this.datos.familia.fam_nivel_estud.niv_estud_madre) },
                              {
                                marginTop: 3,
                                text: [
                                  { text: "NIVEL:  " },
                                  { text: this.datos.familia.fam_nivel_estud.semestre_estud_madre },
                                ],
                              },
                            ],
                          },
                          {
                            stack: [
                              { text: "PAREJA\n " },
                              { text: nivel_estudio_mainHc(this.datos.familia.fam_nivel_estud.niv_estud_pareja) },
                              {
                                marginTop: 3,
                                text: [
                                  { text: "NIVEL:  " },
                                  { text: this.datos.familia.fam_nivel_estud.semestre_estud_pareja },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        marginTop: 10,
                        text: "TRABAJO",
                        style: "center8Bold",
                      },
                      {
                        marginTop: 3,
                        style: "center7",
                        columns: [
                          { text: " ", width: "27%", style: "left7Bold" },
                          { text: "PADRE O SUSTITUTO", width: "25%" },
                          { text: "MADRE O SUSTITUTO", width: "25%" },
                          { text: "PAREJA", width: "25%" },
                        ],
                      },
                      {
                        style: "left7",
                        columns: [
                          {
                            stack: [
                              {
                                style: "center7",
                                marginTop: 3,
                                columns: [
                                  { text: "NINGUNO", width: "27%", style: "left7" },
                                  {
                                    width: "25%",
                                    stack: this.cuadro_canvas(this.datos.familia.fam_trabajo.ocup_estable_padre == 1),
                                  },
                                  {
                                    width: "25%",
                                    stack: this.cuadro_canvas(this.datos.familia.fam_trabajo.ocup_estable_madre == 1),
                                  },
                                  {
                                    width: "25%",
                                    stack: this.cuadro_canvas(this.datos.familia.fam_trabajo.ocup_estable_pareja == 1),
                                  },
                                ],
                              },
                              {
                                style: "center7",
                                marginTop: 3,
                                columns: [
                                  { text: "NO ESTABLE", width: "27%", style: "left7" },
                                  {
                                    width: "25%",
                                    stack: this.cuadro_canvas(this.datos.familia.fam_trabajo.ocup_estable_padre == 2),
                                  },
                                  {
                                    width: "25%",
                                    stack: this.cuadro_canvas(this.datos.familia.fam_trabajo.ocup_estable_madre == 2),
                                  },
                                  {
                                    width: "25%",
                                    stack: this.cuadro_canvas(this.datos.familia.fam_trabajo.ocup_estable_pareja == 2),
                                  },
                                ],
                              },
                              {
                                style: "center7",
                                marginTop: 3,
                                columns: [
                                  { text: "ESTABLE", width: "27%", style: "left7" },
                                  {
                                    width: "25%",
                                    stack: this.cuadro_canvas(this.datos.familia.fam_trabajo.ocup_estable_padre == 3),
                                  },
                                  {
                                    width: "25%",
                                    stack: this.cuadro_canvas(this.datos.familia.fam_trabajo.ocup_estable_madre == 3),
                                  },
                                  {
                                    width: "25%",
                                    stack: this.cuadro_canvas(this.datos.familia.fam_trabajo.ocup_estable_pareja == 3),
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        marginTop: 20,
                        style: "left7",
                        stack: [
                          { text: "OCUPACIÓN", style: "center8Bold" },
                          {
                            columns: [
                              { text: "MADRE:", width: "18%" },
                              { text: this.datos.familia.fam_trabajo.ocup_madre, width: "82%" },
                            ],
                            marginTop: 3,
                          },
                          {
                            columns: [
                              { text: "PADRE:", width: "18%" },
                              { text: this.datos.familia.fam_trabajo.ocup_padre, width: "82%" },
                            ],
                            marginTop: 3,
                          },
                          {
                            columns: [
                              { text: "PAREJA:", width: "18%" },
                              { text: this.datos.familia.fam_trabajo.ocup_pareja, width: "82%" },
                            ],
                            marginTop: 3,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        marginTop: 14,
                        style: "left7",
                        columns: [
                          { text: "APOYO SOCIAL O SUBSIDIO", style: "center7", width: "60%" },
                          {
                            columns: [
                              { text: "SI", width: "15%" },
                              {
                                width: "35%",
                                stack: this.cuadro_canvas(this.datos.familia.apoyo_social_subsidio == "S"),
                              },
                              { text: "NO", width: "20%" },
                              {
                                width: "20%",
                                stack: this.cuadro_canvas(this.datos.familia.apoyo_social_subsidio == "N"),
                              },
                            ],
                          },
                        ],
                      },
                      {
                        marginTop: 10,
                        stack: [
                          {
                            marginTop: 10,
                            text: "PERCEPCIÓN DEL ADOLESCENTE SOBRE SU FAMILIA",
                            style: "center7",
                          },
                          {
                            style: "left7",
                            columns: [
                              {
                                width: "20%",
                                style: "center7",
                                marginTop: 3,
                                stack: [
                                  { text: "BUENA", style: "center7" },
                                  {
                                    marginTop: 3,
                                    style: "center7",
                                    stack: this.cuadro_canvas(this.datos.familia.percepcion_familia == "B"),
                                  },
                                ],
                              },
                              {
                                width: "20%",
                                style: "center7",
                                marginTop: 3,
                                stack: [
                                  { text: "REGULAR", style: "center7" },
                                  {
                                    marginTop: 3,
                                    style: "center7",
                                    stack: this.cuadro_canvas(this.datos.familia.percepcion_familia == "R"),
                                  },
                                ],
                              },
                              {
                                width: "20%",
                                style: "center7",
                                marginTop: 3,
                                stack: [
                                  { text: "MALA", style: "center7" },
                                  {
                                    marginTop: 3,
                                    style: "center7",
                                    stack: this.cuadro_canvas(this.datos.familia.percepcion_familia == "M"),
                                  },
                                ],
                              },
                              {
                                width: "40%",
                                style: "center7",
                                marginTop: 3,
                                stack: [
                                  { text: "NO HAY RELACIÓN", style: "center7" },
                                  {
                                    marginTop: 3,
                                    style: "center7",
                                    stack: this.cuadro_canvas(this.datos.familia.percepcion_familia == "N"),
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        marginTop: 20,
                        style: "left7",
                        stack: [
                          { text: "OBSERVACIONES:", style: "left7Bold" },
                          {
                            text: this.datos.familia.observacion_familia
                              ? this.datos.familia.observacion_familia.enterPut()
                              : " ",
                            alignment: "justify",
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
            pageBreak: "before",
            table: {
              widths: ["28%", "18%", "18%", "18%", "18%"],
              body: [
                [
                  {
                    text: "VIVIENDA",
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
                    stack: [
                      {
                        columns: [
                          {
                            text: "",
                            width: "45%",
                          },
                          {
                            text: "EN EL HOGAR",
                            width: "25%",
                          },
                          {
                            text: "FUERA DEL HOGAR",
                            width: "30%",
                          },
                        ],
                      },
                      {
                        margin: [0, 3, 0, 0],
                        columns: [
                          {
                            text: "ACUEDUCTO",
                            width: "48%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.acueducto == 1),
                            width: "30%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.acueducto == 2),
                            width: "22%",
                          },
                        ],
                      },
                      {
                        margin: [0, 2, 0, 0],
                        columns: [
                          {
                            text: "ALCANTARILLADO",
                            width: "48%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.alcantarillado == 1),
                            width: "30%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.alcantarillado == 2),
                            width: "22%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "ENERGIA ELECTRICA\n ",
                        style: "center7",
                      },
                      {
                        margin: [7, 2, 0, 0],
                        columns: [
                          {
                            text: "SI",
                            width: "15%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.electricidad == "S"),
                            width: "35%",
                          },
                          {
                            text: "NO",
                            width: "15%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.electricidad == "N"),
                            width: "25%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "HACINAMIENTO\n ",
                        style: "center7",
                      },
                      {
                        margin: [7, 2, 0, 0],
                        columns: [
                          {
                            text: "SI",
                            width: "15%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.hacinamiento == "S"),
                            width: "35%",
                          },
                          {
                            text: "NO",
                            width: "15%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.hacinamiento == "N"),
                            width: "25%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "GAS DOMICILIARIO\n ",
                        style: "center7",
                      },
                      {
                        margin: [7, 2, 0, 0],
                        columns: [
                          {
                            text: "SI",
                            width: "15%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.gas_domicilia == "S"),
                            width: "35%",
                          },
                          {
                            text: "NO",
                            width: "15%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.gas_domicilia == "N"),
                            width: "25%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "INTERNET\n ",
                        style: "center7",
                      },
                      {
                        margin: [7, 2, 0, 0],
                        columns: [
                          {
                            text: "SI",
                            width: "15%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.internet == "S"),
                            width: "35%",
                          },
                          {
                            text: "NO",
                            width: "15%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vivienda.internet == "N"),
                            width: "25%",
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
              {
                text: "OBSERVACIONES",
                style: "left8Bold",
              },
              {
                text: this.datos.vivienda.observacion_vivienda
                  ? this.datos.vivienda.observacion_vivienda.enterPut()
                  : " ",
                style: "left8",
              },
            ],
          },
          {
            table: {
              widths: ["14%", "26%", "14%", "7%", "9%", "14%", "16%"],
              body: [
                [
                  {
                    text: "EDUCACIÓN",
                    style: "left10BoldT",
                    colSpan: 7,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "ESTUDIA\n ",
                        style: "center7",
                      },
                      {
                        margin: [0, 2, 0, 0],
                        columns: [
                          {
                            text: "SI",
                            width: "15%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.educacion.estudia == "S"),
                            width: "35%",
                          },
                          {
                            text: "NO",
                            width: "20%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.educacion.estudia == "N"),
                            width: "30%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "INST. EDUCATIVA\n ",
                        style: "center7",
                      },
                      {
                        text: this.datos.educacion.institucion_est,
                        margin: [0, 2, 0, 0],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "NIVEL\n ",
                        style: "center7",
                      },
                      {
                        text: nivel_estudio_mainHc(this.datos.educacion.nivel_estud),
                        margin: [0, 2, 0, 0],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "GRADO \n CURSO",
                        style: "center7",
                      },
                      {
                        text: this.datos.educacion.grado_curso,
                        style: "center7",
                        marginTop: 2,
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "AÑOS \n APROBADOS",
                        style: "center7",
                      },
                      {
                        text: this.datos.educacion.anos_aprobados,
                        style: "center7",
                        marginTop: 2,
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "PROBLEMAS EN LA ESCUELA",
                        style: "center7",
                      },
                      {
                        margin: [0, 2, 0, 0],
                        columns: [
                          {
                            text: "SI",
                            width: "15%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.educacion.problemas_escuela == "S"),
                            width: "35%",
                          },
                          {
                            text: "NO",
                            width: "20%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.educacion.problemas_escuela == "N"),
                            width: "30%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "VIOLENCIA ESCOLAR\n ",
                        style: "center7",
                      },
                      {
                        margin: [0, 2, 0, 0],
                        columns: [
                          {
                            text: "SI",
                            width: "15%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.educacion.violencia_escolar == "S"),
                            width: "35%",
                          },
                          {
                            text: "NO",
                            width: "20%",
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.educacion.violencia_escolar == "N"),
                            width: "30%",
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
            table: {
              widths: ["30%", "35%", "35%"],
              body: [
                [
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    columns: [
                      {
                        text: "AÑOS\nREPETIDOS",
                        width: "27%",
                      },
                      {
                        marginTop: 4,
                        text: this.datos.educacion.anos_repetidos == "S" ? "SI" : "NO",
                        width: "8%",
                      },
                      {
                        stack: [
                          {
                            text: "CAUSA:",
                          },
                          {
                            text: this.datos.educacion.causa_repetidos,
                          },
                        ],
                        width: "65%",
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    columns: [
                      {
                        text: "DESERCIÓN\nEXCLUSIÓN",
                        width: "24%",
                      },
                      {
                        stack: [
                          {
                            text: "SI",
                            width: "15%",
                            marginLeft: 4,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.educacion.desercion_exclusion == "S"),
                            width: "35%",
                          },
                        ],
                        width: "10%",
                      },
                      {
                        stack: [
                          {
                            text: "NO",
                            width: "100%",
                            marginLeft: 3,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.educacion.desercion_exclusion == "N"),
                            width: "30%",
                          },
                        ],
                        width: "10%",
                      },
                      {
                        stack: [
                          {
                            text: "CAUSA",
                          },
                          {
                            text: this.datos.educacion.causa_desercion,
                          },
                        ],
                        width: "56%",
                      },
                    ],
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    columns: [
                      {
                        text: "EDUCACIÓN\nNO FORMAL",
                        width: "24%",
                      },
                      {
                        stack: [
                          {
                            text: "SI",
                            width: "15%",
                            marginLeft: 4,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.educacion.educacion_no_formal == "S"),
                            width: "35%",
                          },
                        ],
                        width: "10%",
                      },
                      {
                        stack: [
                          {
                            text: "NO",
                            width: "100%",
                            marginLeft: 3,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.educacion.educacion_no_formal == "N"),
                            width: "30%",
                          },
                        ],
                        width: "10%",
                      },
                      {
                        stack: [
                          {
                            text: "CUAL?",
                          },
                          {
                            text: this.datos.educacion.cual_edu_no_formal,
                          },
                        ],
                        width: "56%",
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
              {
                text: "OBSERVACIONES",
                style: "left8Bold",
              },
              {
                text: this.datos.educacion.observacion_educacion
                  ? this.datos.educacion.observacion_educacion.enterPut()
                  : " ",
                style: "left8",
              },
            ],
          },
          {
            table: {
              widths: ["30%", "8%", "18%", "15%", "14%", "15%"],
              body: [
                [
                  {
                    text: "TRABAJO",
                    style: "left10BoldT",
                    colSpan: 6,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "ACTIVIDAD",
                        width: "24%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.actividad == 1),
                            width: "10%",
                          },
                          {
                            text: "TRABAJA",
                            width: "45%",
                            marginLeft: 4,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.actividad == 4),
                            width: "10%",
                          },
                          {
                            text: "PASANTIA",
                            width: "40%",
                            marginLeft: 3,
                          },
                        ],
                        width: "76%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.actividad == 2),
                            width: "10%",
                          },
                          {
                            text: "BUSCA 1a VEZ",
                            width: "45%",
                            marginLeft: 4,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.actividad == 5),
                            width: "10%",
                          },
                          {
                            text: "DESOCUPADO",
                            width: "40%",
                            marginLeft: 3,
                          },
                        ],
                        width: "76%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.actividad == 3),
                            width: "10%",
                          },
                          {
                            text: "NO Y NO BUSCA",
                            width: "45%",
                            marginLeft: 4,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.actividad == 6),
                            width: "10%",
                          },
                          {
                            text: "NO TRABAJA Y NO ESTUDIA",
                            width: "40%",
                            marginLeft: 3,
                          },
                        ],
                        width: "76%",
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      {
                        text: "EDAD INICIO TRABAJO\n ",
                      },
                      {
                        text: this.datos.trabajo.edad_inicio_trabajo,
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "HORARIO DE TRABAJO",
                        width: "24%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.horario_trabajo == 1),
                            width: "15%",
                          },
                          {
                            text: "MAÑANA",
                            width: "40%",
                            marginLeft: 4,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.horario_trabajo == 5),
                            width: "15%",
                          },
                          {
                            text: "NOCHE",
                            width: "30%",
                            marginLeft: 3,
                          },
                        ],
                        width: "76%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.horario_trabajo == 2),
                            width: "15%",
                          },
                          {
                            text: "TARDE",
                            width: "40%",
                            marginLeft: 4,
                          },
                          {
                            stack: this.cuadro_canvas(
                              ![1, 2, 3, 4, 5].includes(parseInt(this.datos.trabajo.horario_trabajo))
                            ),
                            width: "15%",
                          },
                          {
                            text: "N/C",
                            width: "30%",
                            marginLeft: 3,
                          },
                        ],
                        width: "76%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.horario_trabajo == 3),
                            width: "15%",
                          },
                          {
                            text: "FIN DE SEMANA",
                            width: "40%",
                            marginLeft: 4,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.horario_trabajo == 4),
                            width: "15%",
                          },
                          {
                            text: "TODO EL DIA",
                            width: "30%",
                            marginLeft: 3,
                          },
                        ],
                        width: "76%",
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "RAZÓN DE TRABAJO",
                        width: "24%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.razon_trabajo == 1),
                            width: "20%",
                          },
                          {
                            text: "ECONOMICA",
                            width: "80%",
                            marginLeft: 4,
                          },
                        ],
                        width: "76%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.razon_trabajo == 2),
                            width: "20%",
                          },
                          {
                            text: "AUTONOMIA",
                            width: "80%",
                            marginLeft: 4,
                          },
                        ],
                        width: "76%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.razon_trabajo == 3),
                            width: "20%",
                          },
                          {
                            text: "ME GUSTA",
                            width: "80%",
                            marginLeft: 4,
                          },
                        ],
                        width: "76%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.razon_trabajo == 4),
                            width: "20%",
                          },
                          {
                            text: "OTRA",
                            width: "35%",
                            marginLeft: 4,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.trabajo.razon_trabajo == 5),
                            width: "20%",
                          },
                          {
                            text: "N/C",
                            width: "25%",
                            marginLeft: 3,
                          },
                        ],
                        width: "76%",
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        text: "TRABAJO LEGALIZADO\n ",
                        width: "24%",
                        style: "center7",
                      },
                      {
                        marginLeft: 7,
                        style: "left7",
                        columns: [
                          {
                            stack: [
                              {
                                text: "SI",
                                width: "15%",
                                marginLeft: 4,
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.trabajo.trabajo_legalizado == 1),
                                width: "35%",
                              },
                            ],
                            width: "30%",
                          },
                          {
                            stack: [
                              {
                                text: "NO",
                                width: "100%",
                                marginLeft: 3,
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.trabajo.trabajo_legalizado == 2),
                                width: "30%",
                              },
                            ],
                            width: "30%",
                          },
                          {
                            stack: [
                              {
                                text: "N/C",
                                width: "100%",
                                marginLeft: 3,
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.trabajo.trabajo_legalizado == 3),
                                width: "30%",
                              },
                            ],
                            width: "30%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        text: "TRABAJO INSALUBRE\n ",
                        width: "24%",
                        style: "center7",
                      },
                      {
                        marginLeft: 7,
                        style: "left7",
                        columns: [
                          {
                            stack: [
                              {
                                text: "SI",
                                width: "15%",
                                marginLeft: 4,
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.trabajo.trabajo_insalubre == 1),
                                width: "35%",
                              },
                            ],
                            width: "30%",
                          },
                          {
                            stack: [
                              {
                                text: "NO",
                                width: "100%",
                                marginLeft: 3,
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.trabajo.trabajo_insalubre == 2),
                                width: "30%",
                              },
                            ],
                            width: "30%",
                          },
                          {
                            stack: [
                              {
                                text: "N/C",
                                width: "100%",
                                marginLeft: 3,
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.trabajo.trabajo_insalubre == 3),
                                width: "30%",
                              },
                            ],
                            width: "30%",
                          },
                        ],
                      },
                    ],
                  },
                ],
                [
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "TIPO DE TRABAJO",
                      },
                      {
                        text: this.datos.trabajo.tipo_trabajo,
                      },
                    ],
                  },
                  {
                    border: [false, false, false, false],
                    style: "left7",
                    stack: [
                      {
                        text: "OBSERVACIONES",
                        style: "left7Bold",
                      },
                      {
                        text: this.datos.trabajo.observ_trabajo ? this.datos.trabajo.observ_trabajo.enterPut() : " ",
                      },
                    ],
                    colSpan: 5,
                  },
                  {},
                  {},
                  {},
                  {},
                ],
              ],
            },
          },
          {
            marginTop: 2,
            table: {
              widths: ["25%", "50%", "25%"],
              body: [
                [
                  {
                    text: "VIDA SOCIAL",
                    style: "left10BoldT",
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
                [
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "ACEPTACIÓN",
                        width: "24%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.vida_social.aceptacion == 1),
                            width: "10%",
                          },
                          {
                            text: "ACEPTADO",
                            width: "45%",
                            marginLeft: 4,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vida_social.aceptacion == 2),
                            width: "10%",
                          },
                          {
                            text: "RECHAZADO",
                            width: "40%",
                            marginLeft: 3,
                          },
                        ],
                        width: "76%",
                      },
                      {
                        marginTop: 3,
                        columns: [
                          {
                            stack: this.cuadro_canvas(this.datos.vida_social.aceptacion == 3),
                            width: "10%",
                          },
                          {
                            text: "IGNORADO",
                            width: "45%",
                            marginLeft: 4,
                          },
                          {
                            stack: this.cuadro_canvas(this.datos.vida_social.aceptacion == 4),
                            width: "10%",
                          },
                          {
                            text: "NO SABE",
                            width: "40%",
                            marginLeft: 3,
                          },
                        ],
                        width: "76%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        stack: [
                          {
                            text: "PAREJA\n ",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            marginLeft: 7,
                            style: "left7",
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "SI",
                                    width: "15%",
                                    marginLeft: 4,
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.vida_social.tiene_pareja == "S"),
                                    width: "35%",
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                stack: [
                                  {
                                    text: "NO",
                                    width: "100%",
                                    marginLeft: 3,
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.vida_social.tiene_pareja == "N"),
                                    width: "30%",
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "20%",
                      },
                      {
                        stack: [
                          {
                            text: "EDAD\nPAREJA\n ",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            text: this.datos.vida_social.edad_pareja,
                            width: "24%",
                            style: "center7Bold",
                          },
                        ],
                        width: "20%",
                      },
                      {
                        stack: [
                          {
                            text: "VIOLENCIA EN LA PAREJA",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            marginLeft: 7,
                            style: "left7",
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "SI",
                                    width: "15%",
                                    marginLeft: 4,
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.vida_social.violencia_pareja == "S"),
                                    width: "35%",
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                stack: [
                                  {
                                    text: "NO",
                                    width: "100%",
                                    marginLeft: 3,
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.vida_social.violencia_pareja == "N"),
                                    width: "30%",
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "20%",
                      },
                      {
                        stack: [
                          {
                            text: "AMIGOS\n ",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            marginLeft: 7,
                            style: "left7",
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "SI",
                                    width: "15%",
                                    marginLeft: 4,
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.vida_social.amigos == "S"),
                                    width: "35%",
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                stack: [
                                  {
                                    text: "NO",
                                    width: "100%",
                                    marginLeft: 3,
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.vida_social.amigos == "N"),
                                    width: "30%",
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "20%",
                      },
                      {
                        stack: [
                          {
                            text: "ACTIVIDAD FISICA",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            text: this.datos.vida_social.horas_act_fisica,
                            width: "24%",
                            style: "center7Bold",
                            marginTop: 5,
                          },
                          {
                            text: "HORAS POR SEMANA",
                            fontSize: 5,
                          },
                        ],
                        width: "20%",
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        columns: [
                          {
                            stack: [
                              {
                                text: "TV\n\n ",
                                style: "center7",
                              },
                              { text: this.datos.vida_social.horas_tv_dia, style: "center7" },
                            ],
                            width: "20%",
                          },
                          {
                            stack: [
                              {
                                text: "PC\n\n ",
                                width: "24%",
                                style: "center7",
                              },
                              { text: this.datos.vida_social.horas_pc_dia, style: "center7" },
                            ],
                            width: "20%",
                          },
                          {
                            stack: [
                              {
                                text: "JUEGOS Y REDES VIRTUALES\n ",
                                width: "24%",
                                style: "center7",
                              },
                              { text: this.datos.vida_social.horas_videojuegos_dia, style: "center7" },
                            ],
                            width: "60%",
                          },
                        ],
                      },
                      {
                        style: "center6",
                        text: "Horas por dia",
                      },
                    ],
                  },
                ],
                [
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "OTRAS ACTIVIDADES",
                        style: "left7Bold",
                      },
                      {
                        text: this.datos.vida_social.otras_actividades,
                      },
                    ],
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
              ],
            },
          },
          {
            marginTop: 3,
            stack: [
              {
                text: "OBSERVACIONES",
                style: "left8Bold",
              },
              {
                text: this.datos.vida_social.observaciones_social
                  ? this.datos.vida_social.observaciones_social.enterPut()
                  : " ",
                style: "left8",
              },
            ],
          },
          {
            marginTop: 2,
            table: {
              widths: ["15%", "20%", "10%", "25%", "30%"],
              body: [
                [
                  {
                    text: "HÁBITOS/CONSUMO",
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
                    columns: [
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "SUEÑO NORMAL",
                          },
                          {
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "SI",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.sueno_normal == "S"),
                                    width: "35%",
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                stack: [
                                  {
                                    text: "NO",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.sueno_normal == "N"),
                                    width: "30%",
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "60%",
                      },
                      {
                        stack: [
                          {
                            text: "\nHORAS\n ",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            text: this.datos.habitos_consumo.sueno_horas,
                            width: "24%",
                            style: "center7Bold",
                          },
                        ],
                        width: "40%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "ALIMENTACIÓN ADECUADA",
                            width: "24%",
                          },
                          {
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "SI",
                                    width: "15%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.alimenta_adecuada == "S"),
                                    width: "35%",
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                stack: [
                                  {
                                    text: "NO",
                                    width: "100%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.alimenta_adecuada == "N"),
                                    width: "30%",
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "60%",
                      },
                      {
                        stack: [
                          {
                            text: "COMIDAS POR DIA\n ",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            text: this.datos.habitos_consumo.comidas_dia,
                            width: "24%",
                            style: "center7Bold",
                          },
                        ],
                        width: "40%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        stack: [
                          {
                            text: "COMIDAS POR DIA CON FAMILIA",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            text: this.datos.habitos_consumo.comidas_familia,
                            width: "24%",
                            style: "center7Bold",
                          },
                        ],
                        width: "100%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "TABACO\n ",
                          },
                          {
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "SI",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.tabaco == "S"),
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                stack: [
                                  {
                                    text: "NO",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.tabaco == "N"),
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "30%",
                      },
                      {
                        stack: [
                          {
                            text: "EDAD DE INICIO AÑOS",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            text: this.datos.habitos_consumo.tabaco_edad_inicio,
                            width: "24%",
                            style: "center7Bold",
                          },
                        ],
                        width: "30%",
                      },
                      {
                        stack: [
                          {
                            text: "NUMERO CIGARRILLOS DIA",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            text: this.datos.habitos_consumo.nro_ciga_dia,
                            width: "24%",
                            style: "center7Bold",
                          },
                        ],
                        width: "40%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "ALCOHOL FRECUENTE",
                          },
                          {
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "SI",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.alcohol == "S"),
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                stack: [
                                  {
                                    text: "NO",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.alcohol == "N"),
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "30%",
                      },
                      {
                        stack: [
                          {
                            text: "EDAD DE INICIO\n ",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            text: this.datos.habitos_consumo.alcohol_edad_inicio,
                            width: "24%",
                            style: "center7Bold",
                          },
                        ],
                        width: "30%",
                      },
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "EPISODIO DE ABUSO",
                          },
                          {
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "SI",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.alcohol_abuso == "S"),
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                stack: [
                                  {
                                    text: "NO",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.alcohol_abuso == "N"),
                                  },
                                ],
                                width: "50%",
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
                    columns: [
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "OTRAS SUSTANCIAS",
                          },
                          {
                            text: this.datos.habitos_consumo.otras_sustancias,
                          },
                        ],
                        width: "40%",
                      },
                      {
                        stack: [
                          {
                            text: "EDAD INICIO",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            text: this.datos.habitos_consumo.edad_inicio_sust,
                            width: "24%",
                            style: "center7Bold",
                          },
                        ],
                        width: "30%",
                      },
                      {
                        style: "left7",
                        stack: [
                          {
                            text: "REPERCUSIONES",
                            style: "center7",
                          },
                          {
                            columns: [
                              {
                                columns: [
                                  {
                                    text: "SI",
                                    width: "35%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.repercucion_sust == "S"),
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                columns: [
                                  {
                                    text: "NO",
                                    width: "45%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.repercucion_sust == "N"),
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "30%",
                      },
                    ],
                    colSpan: 3,
                  },
                  {},
                  {},
                  {
                    columns: [
                      {
                        style: "left7",
                        stack: [
                          {
                            text: "CONDUCE VEHICULO",
                            style: "center7",
                          },
                          {
                            columns: [
                              {
                                columns: [
                                  {
                                    text: "SI",
                                    width: "35%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.conduce_vehiculo == "S"),
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                columns: [
                                  {
                                    text: "NO",
                                    width: "45%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.conduce_vehiculo == "N"),
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "30%",
                      },
                      {
                        stack: [
                          {
                            text: "CUAL",
                            width: "24%",
                            style: "center7",
                          },
                          {
                            text: this.datos.habitos_consumo.cual_vehiculo,
                            width: "24%",
                            style: "center7Bold",
                          },
                        ],
                        width: "30%",
                      },
                      {
                        style: "left7",
                        stack: [
                          {
                            text: "SEGURIDAD VIAL",
                            style: "center7",
                          },
                          {
                            columns: [
                              {
                                columns: [
                                  {
                                    text: "SI",
                                    width: "35%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.seguridad_val == "S"),
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                columns: [
                                  {
                                    text: "NO",
                                    width: "45%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.habitos_consumo.seguridad_val == "N"),
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "30%",
                      },
                    ],
                    colSpan: 2,
                  },
                  {},
                ],
              ],
            },
          },
          {
            marginTop: 3,
            stack: [
              {
                text: "OBSERVACIONES",
                style: "left8Bold",
              },
              {
                text: this.datos.habitos_consumo.observ_hab_cons
                  ? this.datos.habitos_consumo.observ_hab_cons.enterPut()
                  : " ",
                style: "left8",
              },
            ],
          },
          {
            pageBreak: "before",
            table: {
              widths: ["7.5%", "18%", "17%", "10%", "38.5%", "9%"],
              body: [
                [
                  {
                    text: "GINECO-UROLOGICO",
                    style: "left10BoldT",
                    colSpan: 6,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    columns: [
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "MENARCA/ESPERMARCA AÑOS\n ",
                          },
                          {
                            text: this.datos.gineco_urologico.menar_espermar,
                            style: "center7Bold",
                          },
                        ],
                        width: "100%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "FECHA ULTIMA MENSTRUACIÓN",
                            width: "24%",
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                columns: [
                                  {
                                    stack: this.cuadro_canvas(
                                      this.paci.SEXO == "F" && this.datos.gineco_urologico.fecha_ult_mens == 0
                                    ),
                                    width: "25%",
                                  },
                                  {
                                    text: "NO CONOCE",
                                    width: "75%",
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                columns: [
                                  {
                                    stack: this.cuadro_canvas(this.paci.SEXO != "F"),
                                    width: "25%",
                                  },
                                  {
                                    text: "NO CORRESP",
                                    width: "75%",
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "DIA",
                                  },
                                  {
                                    text:
                                      this.paci.SEXO == "F" ? this.datos.gineco_urologico.fecha_ult_mens.slice(6) : " ",
                                  },
                                ],
                              },
                              {
                                stack: [
                                  {
                                    text: "MES",
                                  },
                                  {
                                    text:
                                      this.paci.SEXO == "F"
                                        ? this.datos.gineco_urologico.fecha_ult_mens.slice(4, 6)
                                        : " ",
                                  },
                                ],
                              },
                              {
                                stack: [
                                  {
                                    text: "AÑO",
                                  },
                                  {
                                    text:
                                      this.paci.SEXO == "F"
                                        ? this.datos.gineco_urologico.fecha_ult_mens.slice(0, 4)
                                        : " ",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                        width: "100%",
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        style: "left7",
                        stack: [
                          {
                            text: "CICLOS REGULARES",
                            style: "center7",
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                columns: [
                                  {
                                    text: "SI",
                                    width: "35%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(
                                      this.paci.SEXO == "F" && this.datos.gineco_urologico.ciclos_regulares == "S"
                                    ),
                                  },
                                ],
                                width: "30%",
                              },
                              {
                                columns: [
                                  {
                                    text: "NO",
                                    width: "45%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(
                                      this.paci.SEXO == "F" && this.datos.gineco_urologico.ciclos_regulares != "S"
                                    ),
                                  },
                                ],
                                width: "32%",
                              },
                              {
                                columns: [
                                  {
                                    text: "N/C",
                                    width: "45%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.paci.SEXO != "F"),
                                  },
                                ],
                                width: "38%",
                              },
                            ],
                          },
                        ],
                        width: "30%",
                      },
                      {
                        marginTop: 3,
                        style: "left7",
                        stack: [
                          {
                            text: "DISMENORREA",
                            style: "center7",
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                columns: [
                                  {
                                    text: "SI",
                                    width: "35%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(
                                      this.paci.SEXO == "F" && this.datos.gineco_urologico.dismenorrea == "S"
                                    ),
                                  },
                                ],
                                width: "30%",
                              },
                              {
                                columns: [
                                  {
                                    text: "NO",
                                    width: "45%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(
                                      this.paci.SEXO == "F" && this.datos.gineco_urologico.dismenorrea != "S"
                                    ),
                                  },
                                ],
                                width: "32%",
                              },
                              {
                                columns: [
                                  {
                                    text: "N/C",
                                    width: "45%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.paci.SEXO != "F"),
                                  },
                                ],
                                width: "38%",
                              },
                            ],
                          },
                        ],
                        width: "30%",
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        style: "left7",
                        stack: [
                          {
                            text: "FLUIDO PATOLOGICO SECRECION PENEANA\n ",
                            style: "center7",
                          },
                          {
                            columns: [
                              {
                                columns: [
                                  {
                                    text: "SI",
                                    width: "35%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.gineco_urologico.flujo_secrecion == "S"),
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                columns: [
                                  {
                                    text: "NO",
                                    width: "45%",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.gineco_urologico.flujo_secrecion == "N"),
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "30%",
                      },
                    ],
                  },
                  {
                    stack: [
                      {
                        style: "left6",
                        stack: [
                          {
                            columns: [
                              {
                                width: "55%",
                                stack: [
                                  {
                                    columns: [
                                      {
                                        text: "ITS",
                                        width: "20%",
                                      },
                                      {
                                        columns: [
                                          {
                                            text: "SI",
                                            width: "30%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(this.datos.gineco_urologico.gine_its == "S"),
                                          },
                                        ],
                                        width: "40%",
                                      },
                                      {
                                        columns: [
                                          {
                                            text: "NO",
                                            width: "35%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(this.datos.gineco_urologico.gine_its != "S"),
                                          },
                                        ],
                                        width: "40%",
                                      },
                                    ],
                                  },
                                  {
                                    marginTop: 3,
                                    columns: [
                                      {
                                        text: "CUAL:",
                                        width: "20%",
                                      },
                                      {
                                        text: this.datos.gineco_urologico.its_cual,
                                        width: "80%",
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                width: "45%",
                                stack: [
                                  {
                                    text: "TRATAMIENTO",
                                    style: "center6",
                                  },
                                  {
                                    marginTop: 3,
                                    columns: [
                                      {
                                        columns: [
                                          {
                                            text: "SI",
                                            width: "30%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(
                                              this.datos.gineco_urologico.gine_its != "N" &&
                                                this.datos.gineco_urologico.its_tratamiento == "S"
                                            ),
                                          },
                                        ],
                                        width: "30%",
                                      },
                                      {
                                        columns: [
                                          {
                                            text: "NO",
                                            width: "40%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(
                                              this.datos.gineco_urologico.gine_its != "N" &&
                                                this.datos.gineco_urologico.its_tratamiento != "S"
                                            ),
                                          },
                                        ],
                                        width: "35%",
                                      },
                                      {
                                        columns: [
                                          {
                                            text: "N/C",
                                            width: "45%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(this.datos.gineco_urologico.gine_its != "S"),
                                          },
                                        ],
                                        width: "35%",
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            marginTop: 8,
                            style: "left6",
                            columns: [
                              {
                                text: "BUSQUEDA DE CONTACTOS",
                                width: "22%",
                                marginTop: 4,
                              },
                              {
                                stack: [
                                  {
                                    columns: [
                                      {
                                        style: "center6",
                                        stack: [
                                          {
                                            text: "SI",
                                            width: "35%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(
                                              this.datos.gineco_urologico.gine_its != "N" &&
                                                this.datos.gineco_urologico.its_busq_contac == "S"
                                            ),
                                          },
                                        ],
                                        width: "33%",
                                      },
                                      {
                                        style: "center6",
                                        stack: [
                                          {
                                            text: "NO",
                                            width: "45%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(
                                              this.datos.gineco_urologico.gine_its != "N" &&
                                                this.datos.gineco_urologico.its_busq_contac != "S"
                                            ),
                                          },
                                        ],
                                        width: "33%",
                                      },
                                      {
                                        style: "center6",
                                        stack: [
                                          {
                                            text: "S/D",
                                            width: "45%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(this.datos.gineco_urologico.gine_its != "S"),
                                          },
                                        ],
                                        width: "33%",
                                      },
                                    ],
                                  },
                                ],
                                width: "28%",
                              },
                              {
                                text: "TRATAMIENTO DE CONTACTOS",
                                width: "23%",
                                marginTop: 4,
                              },
                              {
                                stack: [
                                  {
                                    columns: [
                                      {
                                        style: "center6",
                                        stack: [
                                          {
                                            text: "SI",
                                            width: "35%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(
                                              this.datos.gineco_urologico.gine_its != "N" &&
                                                this.datos.gineco_urologico.its_trata_contac == "S"
                                            ),
                                          },
                                        ],
                                        width: "33%",
                                      },
                                      {
                                        style: "center6",
                                        stack: [
                                          {
                                            text: "NO",
                                            width: "45%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(
                                              this.datos.gineco_urologico.gine_its != "N" &&
                                                this.datos.gineco_urologico.its_trata_contac != "S"
                                            ),
                                          },
                                        ],
                                        width: "33%",
                                      },
                                      {
                                        style: "center6",
                                        stack: [
                                          {
                                            text: "S/D",
                                            width: "45%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(this.datos.gineco_urologico.gine_its != "S"),
                                          },
                                        ],
                                        width: "33%",
                                      },
                                    ],
                                  },
                                ],
                                width: "28%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    marginTop: 10,
                    style: "left6",
                    stack: [
                      {
                        columns: [
                          {
                            text: "EMBARAZOS",
                            width: "83%",
                            style: "left6Bold",
                          },
                          {
                            text: this.datos.gineco_urologico.embarazos,
                            width: "20%",
                          },
                        ],
                      },
                      {
                        columns: [
                          {
                            text: "HIJOS",
                            width: "83%",
                            style: "left6Bold",
                          },
                          {
                            text: this.datos.gineco_urologico.hijos,
                            width: "20%",
                          },
                        ],
                      },
                      {
                        columns: [
                          {
                            text: "ABORTOS",
                            width: "83%",
                            style: "left6Bold",
                          },
                          {
                            text: this.datos.gineco_urologico.gine_abortos,
                            width: "20%",
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
                      {
                        width: "75%",
                        stack: [
                          {
                            style: "left7",
                            stack: [
                              {
                                text: "OBSERVACIONES",
                              },
                              {
                                text: this.datos.gineco_urologico.observaciones_gine_uro
                                  ? this.datos.gineco_urologico.observaciones_gine_uro.enterPut()
                                  : " ",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        width: "25%",
                        stack: [
                          {
                            columns: [
                              {
                                text: "CITOLOGIA",
                                width: "80%",
                              },
                              {
                                text:
                                  this.paci.SEXO == "F" &&
                                  (this.datos.complementa_gineco.citologia == "S" ||
                                    this.hcprc.signos.citologia_previa == "S")
                                    ? "SI"
                                    : "NO",
                                style: "center7",
                                width: "20%",
                              },
                            ],
                          },
                          {
                            text: "ULTIMA FECHA:",
                          },
                          {
                            text:
                              this.paci.SEXO == "F" &&
                              (this.datos.complementa_gineco.citologia == "S" ||
                                this.hcprc.signos.citologia_previa == "S")
                                ? this.hcprc.signos.citologia_previa == "S"
                                  ? _editFecha2(this.hcprc.signos.fecha_cito_previa)
                                  : _editFecha2(this.datos.complementa_gineco.fecha_cito)
                                : " ",
                          },
                          {
                            text: "RESULTADO:",
                          },
                          {
                            text:
                              this.paci.SEXO == "F" &&
                              (this.datos.complementa_gineco.citologia == "S" ||
                                this.hcprc.signos.citologia_previa == "S")
                                ? resultado_citologia(this.hcprc.signos.resul_cito_previa)
                                : " ",
                          },
                        ],
                      },
                    ],
                    colSpan: 3,
                  },
                  {},
                  {},
                  {
                    style: "left7",
                    columns: [
                      {
                        stack: [
                          {
                            columns: [
                              {
                                text: "VIH",
                                width: "5%",
                              },
                              {
                                text: "SI",
                                width: "3%",
                              },
                              {
                                width: "6%",
                                stack: this.cuadro_canvas(this.datos.gineco_urologico.vih == "S"),
                              },
                              {
                                text: "NO",
                                width: "4%",
                              },
                              {
                                width: "10%",
                                stack: this.cuadro_canvas(this.datos.gineco_urologico.vih != "S"),
                              },

                              // *** *** //
                              {
                                text: "TRATAMIENTO",
                                width: "17%",
                              },
                              {
                                text: "SI",
                                width: "3%",
                              },
                              {
                                width: "6%",
                                stack: this.cuadro_canvas(
                                  this.datos.gineco_urologico.vih != "N" &&
                                    this.datos.gineco_urologico.vih_tratamiento == "S"
                                ),
                              },
                              {
                                text: "NO",
                                width: "4%",
                              },
                              {
                                width: "6%",
                                stack: this.cuadro_canvas(
                                  this.datos.gineco_urologico.vih != "N" &&
                                    this.datos.gineco_urologico.vih_tratamiento != "S"
                                ),
                              },
                              {
                                text: "N/C",
                                width: "5%",
                              },
                              {
                                width: "11%",
                                stack: this.cuadro_canvas(this.datos.gineco_urologico.vih != "S"),
                              },

                              // *** *** //
                              {
                                text: "EDAD 1o EMB",
                                width: "17%",
                              },
                              {
                                text: this.datos.gineco_urologico.edad_1er_embar,
                                width: "3%",
                              },
                            ],
                          },
                          {
                            style: "center7",
                            marginTop: 3,
                            columns: [
                              {
                                text: "BUSQUEDA DE CONTACTOS",
                                width: "17%",
                                style: "left7",
                                marginTop: 3,
                              },
                              {
                                width: "6%",
                                stack: [
                                  {
                                    text: "SI",
                                    width: "3%",
                                  },
                                  {
                                    width: "6%",
                                    stack: this.cuadro_canvas(
                                      this.datos.gineco_urologico.vih != "N" &&
                                        this.datos.gineco_urologico.vih_busq_contac == "S"
                                    ),
                                  },
                                ],
                              },
                              {
                                width: "6%",
                                stack: [
                                  {
                                    text: "NO",
                                    width: "3%",
                                  },
                                  {
                                    width: "6%",
                                    stack: this.cuadro_canvas(
                                      this.datos.gineco_urologico.vih != "N" &&
                                        this.datos.gineco_urologico.vih_busq_contac != "S"
                                    ),
                                  },
                                ],
                              },
                              {
                                width: "6%",
                                stack: [
                                  {
                                    text: "N/C",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.gineco_urologico.vih != "S"),
                                  },
                                ],
                              },

                              // *** *** //
                              {
                                text: "TRATAMIENTO DE CONTACTOS",
                                width: "17%",
                                style: "left7",
                                marginTop: 3,
                              },
                              {
                                width: "6%",
                                stack: [
                                  {
                                    text: "SI",
                                    width: "3%",
                                  },
                                  {
                                    width: "6%",
                                    stack: this.cuadro_canvas(
                                      this.datos.gineco_urologico.vih != "N" &&
                                        this.datos.gineco_urologico.vih_trata_contac == "S"
                                    ),
                                  },
                                ],
                              },
                              {
                                width: "6%",
                                stack: [
                                  {
                                    text: "NO",
                                    width: "3%",
                                  },
                                  {
                                    width: "6%",
                                    stack: this.cuadro_canvas(
                                      this.datos.gineco_urologico.vih != "N" &&
                                        this.datos.gineco_urologico.vih_trata_contac != "S"
                                    ),
                                  },
                                ],
                              },
                              {
                                width: "6%",
                                stack: [
                                  {
                                    text: "N/C",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.gineco_urologico.vih != "S"),
                                  },
                                ],
                              },
                              {
                                text: "",
                                width: "3%",
                              },

                              // *** *** //
                              {
                                width: "7%",
                                stack: [
                                  {
                                    text: "AM",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.gineco_urologico.termino_1er_embar == 1),
                                  },
                                ],
                              },
                              {
                                width: "7%",
                                stack: [
                                  {
                                    text: "P",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.gineco_urologico.termino_1er_embar == 2),
                                  },
                                ],
                              },
                              {
                                width: "7%",
                                stack: [
                                  {
                                    text: "A",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.gineco_urologico.termino_1er_embar == 3),
                                  },
                                ],
                              },
                              {
                                width: "7%",
                                stack: [
                                  {
                                    text: "C",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.gineco_urologico.termino_1er_embar == 4),
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    colSpan: 3,
                  },
                  {},
                  {},
                ],
              ],
            },
          },
          {
            marginTop: 5,
            table: {
              widths: ["19%", "15%", "15%", "10%", "41%"],
              body: [
                [
                  {
                    text: "SEXUALIDAD",
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
                    columns: [
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "RELACIONES SEXUALES\n ",
                          },
                          {
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "NO",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad.relaciones_sex == 1),
                                    width: "35%",
                                  },
                                ],
                                width: "25%",
                              },
                              {
                                stack: [
                                  {
                                    text: "HETER",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad.relaciones_sex == 2),
                                    width: "30%",
                                  },
                                ],
                                width: "25%",
                              },
                              {
                                stack: [
                                  {
                                    text: "HOMO",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad.relaciones_sex == 3),
                                    width: "30%",
                                  },
                                ],
                                width: "25%",
                              },
                              {
                                stack: [
                                  {
                                    text: "AMBAS",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad.relaciones_sex == 4),
                                    width: "30%",
                                  },
                                ],
                                width: "25%",
                              },
                            ],
                          },
                        ],
                        width: "100%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "PAREJA SEXUAL",
                          },
                          {
                            stack: [
                              {
                                marginTop: 3,
                                columns: [
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad.pareja_sex == "U"),
                                    width: "25%",
                                  },
                                  {
                                    text: "PAREJA ÚNICA",
                                    style: "left7",
                                  },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad.pareja_sex == "V"),
                                    width: "25%",
                                  },
                                  {
                                    text: "VARIAS PAREJAS",
                                    style: "left7",
                                  },
                                ],
                              },
                              {
                                marginTop: 3,
                                columns: [
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad.pareja_sex == "N"),
                                    width: "25%",
                                  },
                                  {
                                    text: "N/C",
                                    style: "left7",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                        width: "100%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "EDAD INICIO REL. SEX (coito)\n ",
                          },
                          {
                            stack: [
                              {
                                columns: [
                                  {
                                    marginLeft: -5,
                                    width: "30%",
                                    stack: [
                                      {
                                        text: "AÑOS",
                                      },
                                      {
                                        text: this.datos.sexualidad.edad_inicio_sex,
                                      },
                                    ],
                                  },
                                  {
                                    width: "70%",
                                    stack: [
                                      {
                                        text: "BAJO COERCIÓN",
                                      },
                                      {
                                        columns: [
                                          {
                                            text: "SI",
                                            style: "left7",
                                            width: "20%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(this.datos.sexualidad.inicio_sex_coercion == "S"),
                                            width: "33%",
                                          },
                                          {
                                            text: "NO",
                                            style: "left7",
                                            width: "25%",
                                          },
                                          {
                                            stack: this.cuadro_canvas(this.datos.sexualidad.inicio_sex_coercion == "N"),
                                            width: "25%",
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
                        width: "100%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        style: "center7",
                        stack: [
                          {
                            text: "DIFICULTADES EN REL. SEX\n ",
                          },
                          {
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "SI",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad.dificultad_rel_sex == "S"),
                                  },
                                ],
                                width: "50%",
                              },
                              {
                                stack: [
                                  {
                                    text: "NO",
                                  },
                                  {
                                    stack: this.cuadro_canvas(this.datos.sexualidad.dificultad_rel_sex == "N"),
                                  },
                                ],
                                width: "50%",
                              },
                            ],
                          },
                        ],
                        width: "100%",
                      },
                    ],
                  },
                  {
                    style: "left7",
                    columns: [
                      {
                        stack: [
                          {
                            columns: [
                              {
                                text: "ANTICONCEPCIÓN",
                                width: "50%",
                              },
                              {
                                text: "CONSEJERIA",
                                width: "23%",
                              },
                              {
                                text: "SI",
                                width: "4%",
                              },
                              {
                                width: "10%",
                                stack: this.cuadro_canvas(this.datos.sexualidad.consejeria_sex == "S"),
                              },
                              {
                                text: "NO",
                                width: "6%",
                              },
                              {
                                width: "10%",
                                stack: this.cuadro_canvas(this.datos.sexualidad.consejeria_sex == "N"),
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                width: "25%",
                                stack: [
                                  {
                                    text: "USO HABITUAL \n DEL CONDON",
                                    width: "25%",
                                  },
                                  {
                                    style: "center7",
                                    columns: [
                                      {
                                        width: "50%",
                                        stack: [
                                          {
                                            text: "SI",
                                            width: "3%",
                                          },
                                          {
                                            width: "6%",
                                            stack: this.cuadro_canvas(this.datos.sexualidad.uso_habitual_condon == "S"),
                                          },
                                        ],
                                      },
                                      {
                                        width: "50%",
                                        stack: [
                                          {
                                            text: "NO",
                                            width: "3%",
                                          },
                                          {
                                            width: "6%",
                                            stack: this.cuadro_canvas(this.datos.sexualidad.uso_habitual_condon == "N"),
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                stack: [
                                  {
                                    columns: [
                                      {
                                        text: "CUAL",
                                        width: "25%",
                                      },
                                      {
                                        text: "USO CORRECTO",
                                        width: "38.5%",
                                      },
                                      {
                                        text: "SI",
                                        width: "6%",
                                      },
                                      {
                                        width: "13%",
                                        stack: this.cuadro_canvas(this.datos.sexualidad.uso_correcto_sex == "S"),
                                      },
                                      {
                                        text: "NO",
                                        width: "8%",
                                      },
                                      {
                                        width: "10%",
                                        stack: this.cuadro_canvas(this.datos.sexualidad.uso_correcto_sex == "N"),
                                      },
                                    ],
                                  },
                                  {
                                    text: consult_planifica(this.hcprc.planific),
                                    width: "23%",
                                  },
                                  {
                                    marginTop: 4,
                                    columns: [
                                      {
                                        text: "ECO DE EMERGENCIA",
                                        width: "50%",
                                      },
                                      {
                                        text: "SI",
                                        width: "6%",
                                      },
                                      {
                                        width: "13%",
                                        stack: this.cuadro_canvas(this.datos.sexualidad.eco_emergen_sex == "S"),
                                      },
                                      {
                                        text: "NO",
                                        width: "8%",
                                      },
                                      {
                                        width: "10%",
                                        stack: this.cuadro_canvas(this.datos.sexualidad.eco_emergen_sex == "N"),
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            marginTop: 4,
                            columns: [
                              {
                                text: "SATISFACCIÓN MÉTODO DE USO",
                                width: "61%",
                              },
                              {
                                text: "SI",
                                width: "6%",
                              },
                              {
                                width: "10%",
                                stack: this.cuadro_canvas(this.datos.sexualidad.satis_metodo_plan == "S"),
                              },
                              {
                                text: "NO",
                                width: "6%",
                              },
                              {
                                width: "10%",
                                stack: this.cuadro_canvas(this.datos.sexualidad.satis_metodo_plan == "N"),
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
              {
                text: "OBSERVACIONES",
                style: "left8Bold",
              },
              {
                text: this.datos.sexualidad.observaciones_sex
                  ? this.datos.sexualidad.observaciones_sex.enterPut()
                  : " ",
                style: "left8",
              },
            ],
          },
          {
            marginTop: 5,
            table: {
              widths: ["17%", "30%", "19%", "10%", "11%", "13%"],
              body: [
                [
                  {
                    text: "SITUACIÓN PSICO-EMOCIONAL",
                    style: "left10BoldT",
                    colSpan: 6,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "IMAGEN CORPORAL",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.imagen_corp == 1),
                                width: "20%",
                              },
                              {
                                text: "CONFORME",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.imagen_corp == 2),
                                width: "20%",
                              },
                              {
                                text: "CREA PREOCUPACIÓN",
                                width: "85%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.imagen_corp == 3),
                                width: "20%",
                              },
                              {
                                text: "IMPIDE RELACION CON DEMÁS",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "ESTADO DE ANIMO",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.estado_animo == 1),
                                width: "12%",
                              },
                              {
                                text: "NORMAL",
                                width: "29%",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.estado_animo == 5),
                                width: "12%",
                              },
                              {
                                text: "IDEAS SUICIDAS",
                                width: "55%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.estado_animo == 2),
                                width: "12%",
                              },
                              {
                                text: "MUY TRISTE",
                                width: "29%",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.estado_animo == 6),
                                width: "12%",
                              },
                              {
                                text: "ANSIOSO/ANGUSTIADO",
                                width: "55%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.estado_animo == 3),
                                width: "12%",
                              },
                              {
                                text: "MUY ALEGRE",
                                width: "29%",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.estado_animo == 7),
                                width: "12%",
                              },
                              {
                                text: "HOSTIL/AGRESIVO",
                                width: "55%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.estado_animo == 4),
                                width: "12%",
                              },
                              {
                                text: "RETRAIDO",
                                width: "29%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "REFERENTE ADULTO",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.ref_adulto == 1),
                                width: "19%",
                              },
                              {
                                text: "MADRE",
                                width: "27%",
                              },
                              {
                                stack: this.cuadro_canvas(
                                  [3, 4, 5, 6, 7, 8, 9].includes(parseInt(this.datos.psico_emocional.ref_adulto))
                                ),
                                width: "19%",
                              },
                              {
                                text: "OTRO FAM.",
                                width: "39%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.ref_adulto == 2),
                                width: "19%",
                              },
                              {
                                text: "PADRE",
                                width: "27%",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.ref_adulto == 10),
                                width: "19%",
                              },
                              {
                                text: "NINGUNO",
                                width: "39%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.ref_adulto == 10),
                                width: "19%",
                              },
                              {
                                text: "FUERA DEL HOGAR",
                                width: "81%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "VIDA CON PROYECTO",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.proyecto_vida == 1),
                                width: "37%",
                              },
                              {
                                text: "CLARO",
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.proyecto_vida == 2),
                                width: "37%",
                              },
                              {
                                text: "CONFUSO",
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.psico_emocional.proyecto_vida == 3),
                                width: "37%",
                              },
                              {
                                text: "AUSENTE",
                                width: "70%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    style: "center7",
                    stack: [
                      {
                        text: "REDES \n SOCIALES DE APOYO\n ",
                      },
                      {
                        columns: [
                          {
                            text: "SI",
                            width: "20%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.psico_emocional.redes_social_apoyo == "S"),
                          },
                          {
                            text: "NO",
                            width: "20%",
                          },
                          {
                            width: "30%",
                            stack: this.cuadro_canvas(this.datos.psico_emocional.redes_social_apoyo == "N"),
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "left7",
                    stack: [
                      {
                        text: "REFERENTE\n ADULTO\n ",
                        style: "center7",
                      },
                      {
                        columns: [
                          {
                            text: "CEL:",
                            width: "25%",
                          },
                          {
                            text: this.datos.psico_emocional.ref_adulto_cel,
                            width: "75%",
                          },
                        ],
                      },
                      {
                        columns: [
                          {
                            text: "TEL",
                            width: "25%",
                          },
                          {
                            text: this.datos.psico_emocional.ref_adulto_fijo,
                            width: "75%",
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
              {
                text: "OBSERVACIONES",
                style: "left8Bold",
              },
              {
                text: this.datos.psico_emocional.observacion_psico
                  ? this.datos.psico_emocional.observacion_psico.enterPut()
                  : " ",
                style: "left8",
              },
            ],
          },
          {
            marginTop: 5,
            table: {
              widths: ["15%", "15%", "14%", "14%", "14%", "14%", "14%"],
              body: [
                [
                  {
                    text: "EXAMEN FISICO",
                    style: "left10BoldT",
                    colSpan: 7,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    style: "center7",
                    stack: [
                      {
                        text: "PESO (kg)",
                        style: "center7",
                      },
                      {
                        text: this.hcprc.signos.peso ? parseFloat(this.hcprc.signos.peso) : " ",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: [
                                  {
                                    text: "TALLA",
                                  },
                                  {
                                    text: this.hcprc.signos.talla,
                                  },
                                ],
                              },
                              {
                                stack: [
                                  {
                                    text: "IMC",
                                  },
                                  {
                                    text: this.hcprc.signos.imc_corp,
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
                    style: "center7",
                    stack: [
                      {
                        text: "PIEL, FANERAS Y MUCOSA",
                      },
                      {
                        columns: [
                          {
                            stack: [
                              {
                                text: "NORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.piel_faner_mucosa == "N"),
                                width: "35%",
                              },
                            ],
                            width: "50%",
                          },
                          {
                            stack: [
                              {
                                text: "ANORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.piel_faner_mucosa == "A"),
                                width: "30%",
                              },
                            ],
                            width: "50%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      {
                        text: "CABEZA\n ",
                      },
                      {
                        columns: [
                          {
                            stack: [
                              {
                                text: "NORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.cabeza == "N"),
                                width: "35%",
                              },
                            ],
                            width: "50%",
                          },
                          {
                            stack: [
                              {
                                text: "ANORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.cabeza == "A"),
                                width: "30%",
                              },
                            ],
                            width: "50%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      {
                        text: "AGUDEZA VISUAL\n ",
                      },
                      {
                        columns: [
                          {
                            stack: [
                              {
                                text: "NORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.agudeza_visual == "N"),
                                width: "35%",
                              },
                            ],
                            width: "50%",
                          },
                          {
                            stack: [
                              {
                                text: "ANORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.agudeza_visual == "A"),
                                width: "30%",
                              },
                            ],
                            width: "50%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      {
                        text: "AGUDEZA AUDITIVA\n ",
                      },
                      {
                        columns: [
                          {
                            stack: [
                              {
                                text: "NORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.agudeza_auditiva == "N"),
                                width: "35%",
                              },
                            ],
                            width: "50%",
                          },
                          {
                            stack: [
                              {
                                text: "ANORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.agudeza_auditiva == "A"),
                                width: "30%",
                              },
                            ],
                            width: "50%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      {
                        text: "SALUD BUCAL\n ",
                      },
                      {
                        columns: [
                          {
                            stack: [
                              {
                                text: "NORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.salud_bucal == "N"),
                                width: "35%",
                              },
                            ],
                            width: "50%",
                          },
                          {
                            stack: [
                              {
                                text: "ANORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.salud_bucal == "A"),
                                width: "30%",
                              },
                            ],
                            width: "50%",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    style: "center7",
                    stack: [
                      {
                        text: "CUELLO Y TIROIDES\n ",
                      },
                      {
                        columns: [
                          {
                            stack: [
                              {
                                text: "NORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.cuello_tiroides == "N"),
                                width: "35%",
                              },
                            ],
                            width: "50%",
                          },
                          {
                            stack: [
                              {
                                text: "ANORMAL",
                              },
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.cuello_tiroides == "A"),
                                width: "30%",
                              },
                            ],
                            width: "50%",
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
            table: {
              widths: ["10.5%", "10.5%", "14%", "10.5%", "10.5%", "12%", "10.5%", "11%", "10.5%"],
              body: [
                [
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        text: "TORAS Y MAMAS",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.toras_mamas == "N"),
                                width: "37%",
                              },
                              {
                                text: "NORMAL",
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.toras_mamas == "A"),
                                width: "37%",
                              },
                              {
                                text: "ANORMAL",
                                width: "70%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        text: "CARDIO-PULMONAR",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.cardio_pulmon == "N"),
                                width: "37%",
                              },
                              {
                                text: "NORMAL",
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.cardio_pulmon == "A"),
                                width: "37%",
                              },
                              {
                                text: "ANORMAL",
                                width: "70%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        text: "PRESION ARTERIAL",
                        style: "center7",
                      },
                      {
                        style: "center7",
                        marginTop: 3,
                        columns: [
                          {
                            text: this.hcprc.signos.tens1,
                            width: "40%",
                          },
                          {
                            text: "/",
                            width: "20%",
                          },
                          {
                            text: this.hcprc.signos.tens2,
                            width: "40%",
                          },
                        ],
                      },
                      {
                        text: "FRECUENCIA CARDIACA",
                        style: "center7",
                      },
                      {
                        style: "center7",
                        marginTop: 3,
                        columns: [
                          {
                            text: this.hcprc.signos.fcard,
                            width: "30%",
                          },
                          {
                            text: "LATIDO/MIN",
                            width: "70%",
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        text: "ABDOMEN\n ",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.abdomen == "N"),
                                width: "37%",
                              },
                              {
                                text: "NORMAL",
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.abdomen == "A"),
                                width: "37%",
                              },
                              {
                                text: "ANORMAL",
                                width: "70%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        text: "GENITO URINARIO",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.genito_urin == "N"),
                                width: "37%",
                              },
                              {
                                text: "NORMAL",
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.genito_urin == "A"),
                                width: "37%",
                              },
                              {
                                text: "ANORMAL",
                                width: "70%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        text: "TANNER (VELLO)",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                text: this.paci.SEXO == "F" ? this.hcprc.signos.tanner_genit : " ",
                                width: "30%",
                                decoration: "underline",
                              },
                              {
                                text: "MAMAS",
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                text: this.hcprc.signos.tanner_pubico,
                                width: "30%",
                                decoration: "underline",
                              },
                              {
                                text: "PUB.",
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                text: this.paci.SEXO == "F" ? " " : this.hcprc.signos.tanner_genit,
                                width: "30%",
                                decoration: "underline",
                              },
                              {
                                text: "GENITALES",
                                width: "70%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        text: "COLUMNA\n ",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.columna == "N"),
                                width: "37%",
                              },
                              {
                                text: "NORMAL",
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.columna == "A"),
                                width: "37%",
                              },
                              {
                                text: "ANORMAL",
                                width: "70%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        text: "EXTREMIDADES\n ",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.extremidades == "N"),
                                width: "37%",
                              },
                              {
                                text: "NORMAL",
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.extremidades == "A"),
                                width: "37%",
                              },
                              {
                                text: "ANORMAL",
                                width: "70%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                  {
                    border: [true, false, true, true],
                    style: "left7",
                    stack: [
                      {
                        text: "NEUROLÓGICO\n ",
                        style: "center7",
                      },
                      {
                        stack: [
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.neurologico == "N"),
                                width: "37%",
                              },
                              {
                                text: "NORMAL",
                                width: "70%",
                              },
                            ],
                          },
                          {
                            marginTop: 3,
                            columns: [
                              {
                                stack: this.cuadro_canvas(this.datos.examen_fisico.neurologico == "A"),
                                width: "37%",
                              },
                              {
                                text: "ANORMAL",
                                width: "70%",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    width: "100%",
                  },
                ],
              ],
            },
          },
          {
            marginTop: 3,
            text: this.datos.clasif_imc
              ? [
                  {
                    text: "CLASIFICACIÓN IMC/E:  ",
                    style: "left8Bold",
                  },
                  {
                    text: this.datos.clasif_imc,
                    style: "left8",
                  },
                ]
              : "",
          },
          {
            marginTop: 3,
            stack: [
              {
                text: "OBSERVACIONES",
                style: "left8Bold",
              },
              {
                text: this.dato_4005 ? this.dato_4005.enterPut() : " ",
                style: "left8",
              },
            ],
          },
          {
            marginTop: 3,
            stack: [
              { text: "DIAGNÓSTICOS", style: "left8Bold" },
              {
                marginLeft: 20,
                style: "left8",
                stack: this.llenarDiagnosticos(),
              },
            ],
          },
          {
            stack: this.dato_7501
              ? this.dato_7501.trim()
                ? [
                    { text: "ANALISIS", style: "left8Bold", marginTop: 5 },
                    {
                      marginLeft: 20,
                      style: "left8",
                      text: this.dato_7501.enterPut(),
                    },
                  ]
                : []
              : [],
          },
          {
            stack: this.dato_7503
              ? this.dato_7503.trim()
                ? [
                    { text: "PLAN", style: "left8Bold", marginTop: 5 },
                    {
                      marginLeft: 20,
                      style: "left8",
                      text: this.dato_7503.enterPut(),
                    },
                  ]
                : []
              : [],
          },
          {
            marginTop: 5,
            stack: [
              {
                columns: [
                  {
                    text: "FINALIDAD:",
                    style: "left8Bold",
                    width: "24%",
                  },
                  {
                    text: consult_finalidad(this.hcprc.rips.finalid) || " ",
                    style: "left8",
                  },
                ],
              },
              {
                columns: [
                  {
                    text: "CAUSA:",
                    style: "left8Bold",
                    width: "24%",
                  },
                  {
                    text: consult_causa(this.hcprc.rips.causa) || " ",
                    style: "left8",
                  },
                ],
              },
              {
                columns:
                  this.hcprc.signos.sintom_respi == "S" || this.hcprc.signos.sintom_respi == "N"
                    ? [
                        {
                          text: "SINTOMATICO RESPIRATORIO:",
                          style: "left8Bold",
                          width: "24%",
                        },
                        {
                          text: this.hcprc.signos.sintom_respi == "S" ? "SI" : "NO",
                          style: "left8",
                        },
                      ]
                    : [],
              },
              {
                columns:
                  this.hcprc.signos.sintom_piel == "S" || this.hcprc.signos.sintom_piel == "N"
                    ? [
                        {
                          text: "SINTOMATICO PIEL:",
                          style: "left8Bold",
                          width: "24%",
                        },
                        {
                          text: this.hcprc.signos.sintom_piel == "S" ? "SI" : "NO",
                          style: "left8",
                        },
                      ]
                    : [],
              },
              {
                columns:
                  this.hcprc.signos.victi_maltrato == "S" || this.hcprc.signos.victi_maltrato == "N"
                    ? [
                        {
                          text: "VICTIMA DE MALTRATO:",
                          style: "left8Bold",
                          width: "24%",
                        },
                        {
                          text: this.hcprc.signos.victi_maltrato == "S" ? "SI" : "NO",
                          style: "left8",
                        },
                      ]
                    : [],
              },
              {
                columns:
                  this.hcprc.signos.victi_violencia == "S" || this.hcprc.signos.victi_violencia == "N"
                    ? [
                        {
                          text: "VICTIMA DE VIOLENCIA:",
                          style: "left8Bold",
                          width: "24%",
                        },
                        {
                          text: this.hcprc.signos.victi_violencia == "S" ? "SI" : "NO",
                          style: "left8",
                        },
                      ]
                    : [],
              },
              {
                columns:
                  this.hcprc.signos.enfer_mental == "S" || this.hcprc.signos.enfer_mental == "N"
                    ? [
                        {
                          text: "ENFERMEDAD MENTAL:",
                          style: "left8Bold",
                          width: "24%",
                        },
                        {
                          text: this.hcprc.signos.enfer_mental == "S" ? "SI" : "NO",
                          style: "left8",
                        },
                      ]
                    : [],
              },
              {
                columns:
                  this.hcprc.signos.enfer_its == "S" || this.hcprc.signos.enfer_its == "N"
                    ? [
                        {
                          text: "ENFERMEDAD ITS:",
                          style: "left8Bold",
                          width: "24%",
                        },
                        {
                          text: this.hcprc.signos.enfer_its == "S" ? "SI" : "NO",
                          style: "left8",
                        },
                      ]
                    : [],
              },
              {
                columns:
                  this.hcprc.signos.cancer_seno == "S" || this.hcprc.signos.cancer_seno == "N"
                    ? [
                        {
                          text: "CÁNCER DE SENO:",
                          style: "left8Bold",
                          width: "24%",
                        },
                        {
                          text: this.hcprc.signos.cancer_seno == "S" ? "SI" : "NO",
                          style: "left8",
                        },
                      ]
                    : [],
              },
              {
                columns:
                  this.hcprc.signos.cancer_cervis == "S" || this.hcprc.signos.cancer_cervis == "N"
                    ? [
                        {
                          text: "CÁNCER DE CERVIX:",
                          style: "left8Bold",
                          width: "24%",
                        },
                        {
                          text: this.hcprc.signos.cancer_cervis == "S" ? "SI" : "NO",
                          style: "left8",
                        },
                      ]
                    : [],
              },
              {
                columns:
                  this.hcprc.salud_oral_ult_12mes == "S" || this.hcprc.salud_oral_ult_12mes == "N"
                    ? [
                        {
                          text: "SALUD ORAL ULTIMOS 12 MESES:",
                          style: "left8Bold",
                          width: "24%",
                        },
                        {
                          text: this.hcprc.salud_oral_ult_12mes == "S" ? "SI" : "NO",
                          style: "left8",
                        },
                      ]
                    : [],
              },
            ],
          },
          {
            unbreakable: true,
            columns: this.hcprc.examen_visual.estructuras_oculares_oi.trim()
              ? [
                  {
                    marginTop: 10,
                    text: "",
                    width: "10%",
                  },
                  {
                    marginTop: 10,
                    width: "80%",
                    style: "left8",
                    table: {
                      widths: ["50%", "50%"],
                      body: this.llenarAgudezaVisual(),
                    },
                  },
                ]
              : [],
          },
          firmaImpresion_impHc(this.datos),
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

  llenarDiagnosticos() {
    let arreglo = [];
    for (var i in this.hcprc.rips.tabla_diagn) {
      if (this.hcprc.rips.tabla_diagn[i].cod_diagn.trim()) {
        arreglo.push({
          columns: [
            { text: this.hcprc.rips.tabla_diagn[i].cod_diagn, width: "5%" },
            { text: this.hcprc.rips.tabla_diagn[i].descrip_diagn, width: "95%" },
          ],
        });
      }
    }

    return arreglo;
  }

  llenarAgudezaVisual() {
    let arreglo = [
      [{ text: "EXAMEN DE AGUDEZA VISUAL", style: "center8Bold", colSpan: 2 }, {}],
      [
        { text: "OJO IZQUIERDO", style: "center8" },
        { text: "OJO DERECHO", style: "center8" },
      ],
      [
        {
          stack: [
            {
              marginTop: 2,
              columns: [
                { text: "Estructuras Oculares", width: "40%" },
                {
                  stack: this.cuadro_canvas(this.hcprc.examen_visual.estructuras_oculares_oi == 1),
                  width: "10%",
                },
                { text: "Sin Alt.", width: "15%" },
                {
                  stack: this.cuadro_canvas(this.hcprc.examen_visual.estructuras_oculares_oi == 2),
                  width: "10%",
                },
                { text: "Con Alt.", width: "15%" },
              ],
            },
            {
              marginTop: 3,
              columns: [
                { text: "Nivel de vision tabla snellen", width: "60%" },
                { text: this.hcprc.examen_visual.agud_visual_oi_1, decoration: "underline", width: "10%" },
                { text: "/", width: "5%" },
                { text: this.hcprc.examen_visual.agud_visual_oi_2, decoration: "underline", width: "10%" },
              ],
            },
          ],
        },
        {
          marginTop: 2,
          stack: [
            {
              columns: [
                { text: "Estructuras Oculares", width: "40%" },
                {
                  stack: this.cuadro_canvas(this.hcprc.examen_visual.estructuras_oculares_od == 1),
                  width: "10%",
                },
                { text: "Sin Alt.", width: "15%" },
                {
                  stack: this.cuadro_canvas(this.hcprc.examen_visual.estructuras_oculares_od == 2),
                  width: "10%",
                },
                { text: "Con Alt.", width: "15%" },
              ],
            },
            {
              marginTop: 3,
              columns: [
                { text: "Nivel de vision tabla snellen", width: "60%" },
                { text: this.hcprc.examen_visual.agud_visual_od_1, decoration: "underline", width: "10%" },
                { text: "/", width: "5%" },
                { text: this.hcprc.examen_visual.agud_visual_od_2, decoration: "underline", width: "10%" },
              ],
            },
          ],
        },
      ],
      [
        { text: `Distancia de valoración:  ${this.hcprc.examen_visual.distancia_agud || " "} metros` },
        { text: `Fecha de elaboración:  ${_editFecha2(this.hcprc.fecha)}` },
      ],
    ];

    return arreglo;
  }
}

const imprimir_HCI8051 = function (params) {
  var formato = new formato_HCI8051(params);
  formato._init();
};

module.exports = {
  imprimir_HCI8051,
};
