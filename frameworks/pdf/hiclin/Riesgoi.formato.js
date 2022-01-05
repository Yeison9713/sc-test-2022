// 17-09-2020 - IMPRESION ESCALA DE RIESGO BIOPSICOSOCIAL- DAVID.M - HICLIN
// 25-08-2021 - ACTUALIZACION A CLASE - DAVID.M

class formato_RIESGOI {
  constructor(params) {
    this.hcprc = params.hcprc;
    this.detalles = params.detalles;
    this.paci = params.paci;
    this.opciones = params.opciones || {};
    this.datos = {};
    this.dato_4040 = {};

    this.dato_w = 0;
    this.subtotal1 = 0;
    this.subtotal2 = 0;
    this.subtotal3 = 0;
    this.subtotal4 = 0;
    this.subtotal5 = 0;
    this.subtotal6 = 0;
    this.subtotal7 = 0;
  }

  _init() {
    console.log(this.detalles, this.hcprc, this.paci);
    this.dato_4040 = this.detalles.find((e) => e["COD-DETHC"] == "4040" && e["LLAVE-HC"] == this.hcprc.llave);
    if (this.dato_4040) {
      this.dato_4040 = this.dato_4040.DETALLE;

      console.log(this.dato_4040);
      this.llenarEncabezado();
    }
  }

  llenarEncabezado() {
    this.datos.encabezado = {};
    this.datos.encabezado.titulo = "ESCALA DE RIESGO BIOPSICOSOCIAL PRENATAL";
    this.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
    this.datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;

    this.llenarDatosPaciente();
  }

  llenarDatosPaciente() {
    this.datos.paciente = {};
    this.datos.paciente = llenarPacienteAperturas2_impHc(this.paci, this.hcprc);

    this.llenarDatos();
  }

  async llenarDatos() {
    this.datos.historiaRep = {
      edad: "",
      paridad: "",
      edadVlr: "",
      paridadVlr: "",
      contenido: [],
      subtotal: "",
      titulos: [
        "ABORTE HABITUAL/INFERTILIDA",
        "RETENCION PACENTARIA",
        "PESO BEBE > 4000 g",
        "PESO BEBE < 2500 g",
        "HTA INDUCIDAD POR EMBARAZO",
        "EMB GEMELAR / CESARIA PREVIA",
        "MORTINATO/MUERTE NEONATAL",
        "TP PROLONGADO",
      ],
    };
    this.datos.condicionesAsoc = {
      contenido: [],
      subtotal: "",
      titulos: [
        "Qx GINECOLOGOG PREVIA/ECTOPICO",
        "ENF RENAL CRONICA",
        "DIABETES GESTACIONAL",
        "DIABETES MELLITUS",
        "ENFERMEDAD CARDIACA",
        "ENFERMEDADES INFECCIOSAS",
        "AGUDAS (BACTERIANAS)",
        "ENFERMEDADES AUTOINMUNES",
        "ANEMIA",
      ],
    };
    this.datos.embarazoAct = {
      contenido: [],
      subtotal: "",
      titulos: [
        "HEMORRAGIA",
        "VAGINAL",
        "E.PROLONGADO (42 s",
        "HTA",
        "RPM",
        "POLIDRAMNIOS",
        "RCIU",
        "EMB. MULTIPLE",
        "MALA PRESENTACION",
        "ISOINM.RH",
      ],
    };
    this.datos.riesgo = this.datos.soporte = this.datos.total = {};

    if (this.hcprc.unid_edad == "A") {
      if (this.hcprc.vlr_edad < 16) this.dato_w = 1;
      else {
        if (this.hcprc.vlr_edad >= 16 && this.hcprc.vlr_edad <= 35) this.dato_w = 0;
        else this.dato_w = 2;
      }
    } else this.dato_w = 1;

    this.datos.historiaRep.edad = this.hcprc.vlr_edad;
    this.subtotal1 = this.subtotal1 + this.dato_w;
    this.datos.historiaRep.edadVlr = this.dato_w;

    this.datos.historiaRep.paridad = this.dato_4040.gineco_esq_w["gestaciones_esq_w"];

    if (parseFloat(this.dato_4040.gineco_esq_w["gestaciones_esq_w"]) == 0) {
      this.dato_w = 1;
    } else if (
      parseFloat(this.dato_4040.gineco_esq_w["gestaciones_esq_w"]) >= 1 ||
      parseFloat(this.dato_4040.gineco_esq_w["gestaciones_esq_w"]) <= 4
    ) {
      this.dato_w = 0;
    } else {
      this.dato_w = 2;
    }

    this.subtotal1 = this.subtotal1 + this.dato_w;
    this.datos.historiaRep.paridadVlr = this.dato_w;

    this.dato_4040.riesgo_biopsicosocial_esq_w["infertilidad_aborto_esq_w"] == "S"
      ? (this.dato_w = 1)
      : (this.dato_w = 0);
    this.subtotal1 = this.subtotal1 + this.dato_w;
    this.datos.historiaRep.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["retencion_pacentaria_esq_w"] == "S"
      ? (this.dato_w = 1)
      : (this.dato_w = 0);
    this.subtotal1 = this.subtotal1 + this.dato_w;
    this.datos.historiaRep.contenido.push(this.dato_w);

    // si tiene hijos con peso > 4000g
    this.dato_4040.gineco_esq_w["gine_40_esq_w"] == "S" ? (this.dato_w = 1) : (this.dato_w = 0);
    this.subtotal1 = this.subtotal1 + this.dato_w;
    this.datos.historiaRep.contenido.push(this.dato_w);

    this.dato_4040.gineco_esq_w["gine_25_esq_w"] == "S" ? (this.dato_w = 1) : (this.dato_w = 0);
    this.subtotal1 = this.subtotal1 + this.dato_w;
    this.datos.historiaRep.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["hta_inducida_embar_esq_w"] == "S"
      ? (this.dato_w = 1)
      : (this.dato_w = 0);
    this.subtotal1 = this.subtotal1 + this.dato_w;
    this.datos.historiaRep.contenido.push(this.dato_w);

    parseFloat(this.dato_4040.gineco_esq_w["gine_gemel_esq_w"]) > 0 ||
    parseFloat(this.dato_4040.gineco_esq_w["cesareas_esq_w"]) > 0
      ? (this.dato_w = 1)
      : (this.dato_w = 0);
    this.subtotal1 = this.subtotal1 + this.dato_w;
    this.datos.historiaRep.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["mortinato_muerte_neo_esq_w"] == "S"
      ? (this.dato_w = 1)
      : (this.dato_w = 0);
    this.subtotal1 = this.subtotal1 + this.dato_w;
    this.datos.historiaRep.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["tp_dificil_esq_w"] == "S" ? (this.dato_w = 1) : (this.dato_w = 0);
    this.subtotal1 = this.subtotal1 + this.dato_w;
    this.datos.historiaRep.contenido.push(this.dato_w);

    this.datos.historiaRep.subtotal = this.subtotal1;

    // SEGUNDA PARTE

    this.dato_4040.riesgo_biopsicosocial_esq_w["qx_gineco_ectopico_esq_w"] == "S"
      ? (this.dato_w = 1)
      : (this.dato_w = 0);
    this.subtotal2 = this.subtotal2 + this.dato_w;
    this.datos.condicionesAsoc.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["enf_renal_cronica_esq_w"] == "S"
      ? (this.dato_w = 1)
      : (this.dato_w = 0);
    this.subtotal2 = this.subtotal2 + this.dato_w;
    this.datos.condicionesAsoc.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["diab_gestacional_esq_w"] == "S" ? (this.dato_w = 2) : (this.dato_w = 0);
    this.subtotal2 = this.subtotal2 + this.dato_w;
    this.datos.condicionesAsoc.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["diab_mellitus_esq_w"] == "S" ? (this.dato_w = 3) : (this.dato_w = 0);
    this.subtotal2 = this.subtotal2 + this.dato_w;
    this.datos.condicionesAsoc.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["enf_cardiaca_esq_esq_w"] == "S" ? (this.dato_w = 3) : (this.dato_w = 0);
    this.subtotal2 = this.subtotal2 + this.dato_w;
    this.datos.condicionesAsoc.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["enf_infec_agudas_esq_w"] == "S" ? (this.dato_w = 1) : (this.dato_w = 0);
    this.subtotal2 = this.subtotal2 + this.dato_w;
    this.datos.condicionesAsoc.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["enf_autoinmunes_esq_w"] == "S" ? (this.dato_w = 3) : (this.dato_w = 0);
    this.subtotal2 = this.subtotal2 + this.dato_w;
    this.datos.condicionesAsoc.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["anemia_hb_esq_w"] == "S" ? (this.dato_w = 1) : (this.dato_w = 0);
    this.subtotal2 = this.subtotal2 + this.dato_w;
    this.datos.condicionesAsoc.contenido.push(this.dato_w);

    this.datos.condicionesAsoc.subtotal = this.subtotal2;

    // TERCERA PARTE

    this.dato_4040.riesgo_biopsicosocial_esq_w["hemorragia_men_20_esq_w"] == "S"
      ? (this.dato_w = 1)
      : (this.dato_w = 0);
    this.subtotal3 = this.subtotal3 + this.dato_w;
    this.datos.embarazoAct.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["hemorragia_may_20_esq_w"] == "S"
      ? (this.dato_w = 3)
      : (this.dato_w = 0);
    this.subtotal3 = this.subtotal3 + this.dato_w;
    this.datos.embarazoAct.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["emb_prolongado_esq_w"] == "S" ? (this.dato_w = 1) : (this.dato_w = 0);
    this.subtotal3 = this.subtotal3 + this.dato_w;
    this.datos.embarazoAct.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["hta_esq_w"] == "S" ? (this.dato_w = 2) : (this.dato_w = 0);
    this.subtotal3 = this.subtotal3 + this.dato_w;
    this.datos.embarazoAct.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["rpm_esq_w"] == "S" ? (this.dato_w = 2) : (this.dato_w = 0);
    this.subtotal3 = this.subtotal3 + this.dato_w;
    this.datos.embarazoAct.contenido.push(this.dato_w);

    this.dato_4040.obstetric_esq_w["polihidram_esq_w"] == "S" ? (this.dato_w = 2) : (this.dato_w = 0);
    this.subtotal3 = this.subtotal3 + this.dato_w;
    this.datos.embarazoAct.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["rciu_esq_w"] == "S" ? (this.dato_w = 3) : (this.dato_w = 0);
    this.subtotal3 = this.subtotal3 + this.dato_w;
    this.datos.embarazoAct.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["emb_multiple_esq_w"] == "S" ? (this.dato_w = 3) : (this.dato_w = 0);
    this.subtotal3 = this.subtotal3 + this.dato_w;
    this.datos.embarazoAct.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["mala_presenta_esq_w"] == "S" ? (this.dato_w = 3) : (this.dato_w = 0);
    this.subtotal3 = this.subtotal3 + this.dato_w;
    this.datos.embarazoAct.contenido.push(this.dato_w);

    this.dato_4040.riesgo_biopsicosocial_esq_w["isoinm_rh_esq_w"] == "S" ? (this.dato_w = 3) : (this.dato_w = 0);
    this.subtotal3 = this.subtotal3 + this.dato_w;
    this.datos.embarazoAct.contenido.push(this.dato_w);

    this.datos.embarazoAct.subtotal = this.subtotal3;

    // CUARTA PARTE

    this.dato_w = 0;
    this.texto_w = "";

    if (this.dato_4040.riesgo_biopsicosocial_esq_w["tension_emocional_esq_w"] == "S") {
      this.datos.riesgo.emocional = "INTENSO";
      this.dato_w = this.dato_w + 1;
    } else {
      this.datos.riesgo.emocional = "AUSENTE";
    }

    if (this.dato_4040.riesgo_biopsicosocial_esq_w["humor_depresivo_esq_w"] == "S") {
      this.datos.riesgo.depresivo = "INTENSO";
      this.dato_w = this.dato_w + 1;
    } else {
      this.datos.riesgo.depresivo = "AUSENTE";
    }

    if (this.dato_4040.riesgo_biopsicosocial_esq_w["sinto_neurovegeta_esq_w"] == "S") {
      this.datos.riesgo.neuro = "INTENSO";
      this.dato_w = this.dato_w + 1;
    } else {
      this.datos.riesgo.neuro = "AUSENTE";
    }

    if (this.dato_w >= 2) {
      this.dato_w = 1;
      this.subtotal4 = this.subtotal4 + 1;
    } else {
      this.dato_w = 0;
    }

    this.datos.riesgo.resultado = this.dato_w;

    this.dato_w = 0;
    this.texto_w = "";
    switch (this.dato_4040.riesgo_biopsicosocial_esq_w["soporte_fami_tiempo_esq_w"]) {
      case "1":
        this.texto_w = "CASI SIEMPRE";
        break;
      case "2":
        this.texto_w = "A VECES";
        break;
      case "3":
        this.texto_w = "NUNCA";
        this.dato_w = this.dato_w + 1;
        break;
      default:
        this.texto_w = "   ";
        break;
    }
    this.datos.soporte.tiempo = this.texto_w;

    switch (this.dato_4040.riesgo_biopsicosocial_esq_w["soporte_fami_espacio_esq_w"]) {
      case "1":
        this.texto_w = "CASI SIEMPRE";
        break;
      case "2":
        this.texto_w = "A VECES";
        break;
      case "3":
        this.texto_w = "NUNCA";
        this.dato_w = this.dato_w + 1;
        break;
      default:
        this.texto_w = "   ";
        break;
    }
    this.datos.soporte.espacio = this.texto_w;

    switch (this.dato_4040.riesgo_biopsicosocial_esq_w["soporte_fami_dienro_esq_w"]) {
      case "1":
        this.texto_w = "CASI SIEMPRE";
        break;
      case "2":
        this.texto_w = "A VECES";
        break;
      case "3":
        this.texto_w = "NUNCA";
        this.dato_w = this.dato_w + 1;
        break;
      default:
        this.texto_w = "   ";
        break;
    }
    this.datos.soporte.dinero = this.texto_w;

    if (this.dato_w >= 2) {
      this.dato_w = 1;
      this.subtotal4 = this.subtotal4 + 1;
    } else {
      this.dato_w = 0;
    }

    this.datos.soporte.resultado = this.dato_w;

    // PARTE FINAL

    this.total_w = this.subtotal1 + this.subtotal2 + this.subtotal3 + this.subtotal4;
    this.total_w < 3 ? (this.datos.total.riesgo = 0) : (this.datos.total.riesgo = 1);
    this.datos.total.total = this.total_w;

    // LLENAR INFO MEDICO
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
        console.log("RIESGOI");
      })
      .catch((err) => {
        console.error(err);
        CON851("", "Error impresion RIESGO", null, "error", "Error");
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
    let col = [
      {
        columns: [
          {
            width: "33%",
            marginRight: 20,
            table: {
              widths: ["85%", "15%"],
              headerRows: 0,
              body: this.llenarHistoriaReproductivaRiesgoi(),
            },
          },
          {
            width: "35%",
            marginRight: 20,
            table: {
              widths: ["85%", "15%"],
              headerRows: 0,
              body: this.llenarCondicionesAsociadaRiesgoi(),
            },
          },
          {
            width: "32%",
            table: {
              widths: ["85%", "15%"],
              headerRows: 0,
              body: this.llenarEmbarazoActualRiesgoi(),
            },
          },
        ],
      },
      {
        marginTop: 10,
        table: {
          widths: ["25%", "60%", "10%", "5%"],
          headerRows: 0,
          body: [
            [{ text: "RIESGO PSICOSOCIAL", style: "left8BoldT", colSpan: 4 }, {}, {}, {}],
            [
              { text: "Tensión emocional", style: "left8" },
              {
                text: "Llanto facil, tension muscular, sobresalto, temblor, no poder quedarse en un solo sitio, incapaz de relajarse:",
                style: "left8",
              },
              { text: this.datos.riesgo.emocional, style: "left8" },
              { text: " = " + this.datos.riesgo.resultado, style: "center8", rowSpan: 3, marginTop: 25 },
            ],
            [
              { text: "Humor depresivo", style: "left8" },
              {
                text: "Insomnio, falta de interes, no disfruta pasatiempo, depresion, variaciones del humor durante el dia.",
                style: "left8",
              },
              { text: this.datos.riesgo.depresivo, style: "left8" },
              {},
            ],
            [
              { text: "Sintomas neurovegetativos", style: "left8" },
              {
                text: "Transpiracion excesiva, boca seca, accesos de rubor, palidez, cefalea de tension.",
                style: "left8",
              },
              { text: this.datos.riesgo.neuro, style: "left8" },
              {},
            ],
          ],
        },
      },
      {
        marginTop: 10,
        table: {
          widths: ["60%", "17%", "18%", "5%"],
          headerRows: 0,
          body: [
            [{ text: "SOPORTE FAMILIAR", style: "left8BoldT", colSpan: 4 }, {}, {}, {}],
            [
              {
                text: "Satisfecha con la forma como usted comparte con su familia y/o compañero:",
                style: "left8",
                rowSpan: 3,
              },
              { text: "el tiempo: ", style: "left8" },
              { text: this.datos.soporte.tiempo, style: "left8" },
              { text: " = " + this.datos.soporte.resultado, style: "center8", rowSpan: 3, marginTop: 15 },
            ],
            [{}, { text: "el espacio: ", style: "left8" }, { text: this.datos.soporte.espacio, style: "left8" }, {}],
            [{}, { text: "el dinero: ", style: "left8" }, { text: this.datos.soporte.dinero, style: "left8" }, {}],
          ],
        },
      },
      {
        marginTop: 10,
        table: {
          widths: ["60%", "17%", "18%", "5%"],
          headerRows: 0,
          body: [
            [
              { text: "RIESGO BIOPSICOSOCIAL", style: "left8Bold" },
              { text: "BAJO < 3", style: "left8" },
              { text: "ALTO >= 3", style: "left8" },
              {},
            ],
          ],
        },
        layout: "noBorders",
      },
      {
        canvas: [
          { type: "rect", x: 345, y: -13, w: 20, h: 15 },
          { type: "rect", x: 445, y: -13, w: 20, h: 15 },
        ],
      },
      {
        canvas: this.llenarEquisRiesgoi(),
      },
      {
        marginTop: 10,
        table: {
          widths: ["60%", "17%", "18%", "5%"],
          headerRows: 0,
          body: [
            [
              {},
              {},
              { text: "TOTAL", style: "left8Bold", alignment: "right" },
              { text: this.datos.total.total, style: "center8" },
            ],
          ],
        },
        layout: "lightHorizontalLines",
      },
      firmaImpresion_impHc(this.datos),
    ];

    return col;
  }

  llenarHistoriaReproductivaRiesgoi() {
    let col = [
      [{ text: "HISTORIA REPRODUCTIVA", style: "center8BoldT", colSpan: 2 }, {}],
      [
        { text: "EDAD: " + this.datos.historiaRep.edad, style: "left7Bold" },
        { text: this.datos.historiaRep.edadVlr, style: "center7" },
      ],
      [
        { text: "PARIDAD: " + this.datos.historiaRep.paridad, style: "left7Bold" },
        { text: this.datos.historiaRep.paridadVlr, style: "center7" },
      ],
    ];

    for (let i in this.datos.historiaRep.contenido) {
      col.push([
        { text: this.datos.historiaRep.titulos[i], style: "left7Bold" },
        { text: this.datos.historiaRep.contenido[i], style: "center7" },
      ]);
    }

    col.push([
      { text: "SUB-TOTAL", style: "left7Bold" },
      { text: this.datos.historiaRep.subtotal, style: "center7" },
    ]);

    return col;
  }

  llenarCondicionesAsociadaRiesgoi() {
    let col = [[{ text: "CONDICIONES ASOCIADA", style: "center8BoldT", colSpan: 2 }, {}]];

    for (let i in this.datos.condicionesAsoc.contenido) {
      col.push([
        { text: this.datos.condicionesAsoc.titulos[i], style: "left7Bold" },
        { text: this.datos.condicionesAsoc.contenido[i], style: "center7" },
      ]);
    }

    col.push([
      { text: "SUB-TOTAL", style: "left7Bold" },
      { text: this.datos.condicionesAsoc.subtotal, style: "center7" },
    ]);

    return col;
  }

  llenarEmbarazoActualRiesgoi() {
    let col = [[{ text: "EMBARAZO ACTUAL", style: "center8BoldT", colSpan: 2 }, {}]];

    for (let i in this.datos.embarazoAct.contenido) {
      col.push([
        { text: this.datos.embarazoAct.titulos[i], style: "left7Bold" },
        { text: this.datos.embarazoAct.contenido[i], style: "center7" },
      ]);
    }

    col.push([
      { text: "SUB-TOTAL", style: "left7Bold" },
      { text: this.datos.embarazoAct.subtotal, style: "center7" },
    ]);

    return col;
  }

  llenarEquisRiesgoi() {
    let can = [];

    if (this.datos.total.riesgo === 0) {
      can = [
        { type: "line", x1: 345, y1: -15, x2: 365, y2: 0 },
        { type: "line", x1: 365, y1: -15, x2: 345, y2: 0 },
      ];
    } else if (this.datos.total.riesgo === 1) {
      can = [
        { type: "line", x1: 445, y1: -15, x2: 465, y2: 0 },
        { type: "line", x1: 465, y1: -15, x2: 445, y2: 0 },
      ];
    }

    return can;
  }
}

const imprimir_RIESGOI = (params) => {
  let formato = new formato_RIESGOI(params);
  formato._init();
};

module.exports = {
  imprimir_RIESGOI,
};
