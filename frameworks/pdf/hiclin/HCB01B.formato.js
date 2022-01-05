class formato_HCB01B {
  constructor(params) {
    this.hcprc = params.hcprc;
    this.content_imp = [];
  }

  _init() {
    this.cargarReferencias();
  }

  cargarReferencias() {
    postData({ datosh: datosEnvio() + this.hcprc.llave }, get_url("app/HICLIN/HCB01B.DLL"))
      .then((data) => {
        this.referencias = data.REGS_REF;
        this.referencias.pop();

        if (this.referencias.length > 0) this.cargarDetalles();
      })
      .catch((err) => {
        console.error(err, "error");
        CON851("", "Error consultando historial de referencias", null, "error", "Error");
      });
  }

  cargarDetalles() {
    postData({ datosh: datosEnvio() + this.hcprc.llave + "|||9503;1001||" }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
      .then(async (data) => {
        this.detalles = data.DETHC;
        this.detalles.pop();

        this.analisis_hc = this.detalles.find((el) => el["COD-DETHC"] == "9503");
        if (this.analisis_hc) this.analisis_hc = this.analisis_hc.DETALLE.replace(/\&/g, "\n").trim();

        this.enf_act_hc = this.detalles.find((el) => el["COD-DETHC"] == "1001");
        if (this.enf_act_hc) this.enf_act_hc = this.enf_act_hc.DETALLE.replace(/\&/g, "\n").trim();

        await this.mostrar_hc();
      })
      .catch((err) => {
        console.error(err, "error");
        CON851("", "Error consultando historial de referencias", null, "error", "Error");
      });
  }

  async mostrar_hc() {
    this.content_imp.push({
      style: "left8",
      stack: [
        {
          text: [{ text: "PACIENTE:  ", bold: true }, { text: $_REG_PACI.DESCRIP }],
        },
        {
          text: [
            { text: "APERTURA H.C:  ", bold: true },
            { text: _editarFecha(this.hcprc.fecha) + " " },
            { text: _editHora(this.hcprc.hora) + "  " },
            { text: "DR:  ", bold: true },
            { text: (this.hcprc.descrip_med || "                         ") + " " },
            { text: this.hcprc.descrip_serv, bold: true },
          ],
        },
        {
          stack: [
            {
              text: "ENFERMEDAD ACTUAL:",
              bold: true,
            },
            {
              text: this.enf_act_hc,
            },
          ],
        },
        {
          stack: this.analisis_hc
            ? [
                {
                  text: [
                    { text: "ANALISIS:  ", bold: true },
                    {
                      text: this.analisis_hc,
                    },
                  ],
                },
              ]
            : [],
        },
        {
          stack: this.hcprc.rips.tabla_diagn[0].cod_diagn
            ? [
                {
                  text: [
                    { text: "DIAGNÓSTICO:  ", bold: true },
                    {
                      text: `${this.hcprc.rips.tabla_diagn[0].cod_diagn} - ${this.hcprc.rips.tabla_diagn[0].descrip_diagn}`,
                    },
                  ],
                },
              ]
            : [],
        },
        {
          stack: this.hcprc.cierre.observ_egres
            ? [
                {
                  text: this.hcprc.cierre.observ_egres,
                },
              ]
            : [],
        },
      ],
    });

    await this.recorrer_ref();
  }

  async recorrer_ref() {
    for (let i in this.referencias) {
      this.content_imp.push({
        color: "#A21311", // rojo
        marginTop: 10,
        style: "left8",
        stack: [
          {
            text: [
              { text: "Nota referenciación:  ", bold: true },
              { text: _editarFecha(this.referencias[i].FECHA) + " " },
              { text: _editHora(this.referencias[i].HORA) + "  " },
              { text: "DR:  ", bold: true },
              { text: (this.referencias[i].MEDICO || "                         ") + " " },
              { text: this.referencias[i].DESCRIP_UNSERV, bold: true },
            ],
          },
          {
            text: [{ text: "IPS CONTACTADA:  ", bold: true }, { text: this.referencias[i].NOMBRE_IPS }],
          },
          {
            text: [{ text: "FUNCIONARIO IPS:  ", bold: true }, { text: this.referencias[i].FUNCIONARIO_IPS }],
          },
          {
            text: [{ text: "RESUMEN:  ", bold: true }, { text: this.referencias[i].TABLA }],
          },
          {
            text: this.referencias[i].ACEPTADA,
          },
        ],
      });
    }

    this._imprimir()
      .then(async () => {
        await _impresion2({
          tipo: "pdf",
          archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmss")}.pdf`,
          content: formatoBaseImp_Hc,
        }).catch((err) => {
          console.error(err);
        });
      })
      .catch((error) => {
        console.error(error);
        CON851("", "Error generando impresion de referencia", null, "error", "Error");
      });
  }

  _imprimir() {
    inicializarFormatoBase_impHc();
    return new Promise((resolve) => {
      formatoBaseImp_Hc.pageMargins = [35, 50, 35, 40];
      formatoBaseImp_Hc.header = this.encabezado_imp();

      formatoBaseImp_Hc.content[0].stack.push({
        margin: [0, 5, 0, 0],
        stack: this.content_imp,
      });

      resolve();
    });
  }

  encabezado_imp() {
    return (currentPage, pageCount, pageSize) => {
      var width_page = pageSize.width - 70;

      return {
        margin: [35, 10, 35, 0],
        stack: [
          {
            columns: [
              {
                marginLeft: 7,
                fontSize: 10,
                stack: [
                  { text: "CONSULTA DE PROCESO DE REFERENCIACIÓN" },
                  { text: "(NO ES VALIDO COMO HIST.CLINICA)" },
                ],
                width: "80%",
              },
              {
                marginRight: 7,
                fontSize: 10,
                alignment: "right",
                text: [
                  { text: "" + "PAG: " + currentPage + " de " + pageCount + "\n" },
                  { text: moment().format("  YYYY-MM-DD HH:mm"), fontSize: 7 },
                ],
                width: "20%",
              },
            ],
          },
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: -25,
                w: width_page,
                h: 27,
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
}

const imprimir_HCB01B = (params) => {
  let formato = new formato_HCB01B(params);
  formato._init();
};

module.exports = {
  imprimir_HCB01B,
};
