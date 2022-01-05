class formato_HCBI01 {
  constructor(params) {
    this.llave_ref = params.llave_ref_w;
    this.fecha_ini = params.fecha_ini_w;
    this.fecha_fin = params.fecha_fin_w;
    this.operador = params.operador_w;
    this.paciente = params.paciente_w;
    this.paso_w = params.paso_w;
    this.paci = params.paci;
    this.refer = {};
    this.hcprc = {};
    this.callback_error = params.callback_error;
    this.callback = params.callback;
  }

  _init() {
    this.consultarReferencia();
  }

  consultarReferencia() {
    let datos_envio = [
      this.llave_ref,
      this.fecha_ini,
      this.fecha_fin,
      this.operador,
      this.paciente,
      localStorage.Usuario,
      this.paso_w,
    ];

    postData({ datosh: datosEnvio() + datos_envio.join("|") + "|" }, get_url("app/HICLIN/HCBI01.DLL"))
      .then(async (data) => {
        this.REG_REF = data.REG_REF;
        this.REG_REF.pop();
        this.llamarImpresion();
      })
      .catch((err) => {
        console.log(err, "error");
        CON851("", "Error consultando datos", null, "error", "");
        this.callback_error();
      });
  }

  llamarImpresion() {
    this._imprimir()
      .then(() => {
        _impresion2({
          tipo: "pdf",
          archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmss")}.pdf`,
          content: formatoBaseImp_Hc,
        })
          .then(() => {
            CON851("", "Impresión generada correctamente", null, "success", "");
            this.callback();
          })
          .catch((error) => {
            console.error(error);
            this.callback_error();
          });
      })
      .catch((error) => {
        console.error(error);
        CON851("", "Error en impresion", null, "error", "Error");
        this.callback_error();
      });
  }

  _imprimir() {
    return new Promise((resolve) => {
      inicializarFormatoBase_impHc();

      let id_paci = isNaN(this.paci["COD"])
        ? this.paci["COD"]
        : new Intl.NumberFormat("ja-JP").format(this.paci["COD"]);

      formatoBaseImp_Hc.images = {
        logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT),
      };
      formatoBaseImp_Hc.pageMargins = [35, 88, 35, 60];

      formatoBaseImp_Hc.header = (currentPage, pageCount, pageSize) => {
        let width_page = pageSize.width - 70;
        return {
          margin: [35, 25, 35, 0],
          stack: [
            {
              columns: [
                {
                  margin: [7, 0, 0, 0],
                  stack: [
                    {
                      image: "logo",
                      width: 75,
                      height: 45,
                    },
                  ],
                  width: "20%",
                },
                {
                  style: "center10Bold",
                  text: [
                    { text: $_USUA_GLOBAL[0].NOMBRE + "\n" },
                    { text: $_USUA_GLOBAL[0].NIT + "\n" },
                    { text: "SISTEMA DE REFERENCIA Y CONTRAREFERENCIA" + "\n" },
                  ],
                  width: "60%",
                },
                {
                  marginRight: 5,
                  style: "right10Bold",
                  text: [
                    { text: "PAG: " + currentPage + " de " + pageCount + "\n\n" },
                    { text: "Imprime: " + localStorage.Usuario + moment().format("  YYYY-MM-DD HH:mm"), fontSize: 6 },
                  ],
                  width: "20%",
                },
              ],
            },
            {
              marginTop: 5,
              fontSize: 9,
              columns:
                this.paso_w == 1 || this.paso_w == 4
                  ? [
                      { text: "Nombre:", bold: true, width: "7%" },
                      { text: this.paci["DESCRIP"], width: "69%" },
                      { text: "Id:", bold: true, width: "3%" },
                      { text: this.paci["TIPO-ID"] + " " + id_paci, width: "20%" },
                    ]
                  : [
                      { text: "HISTORIAL DE REFERENCIA Y CONTRAREFERENCIA", bold: true, width: "50%" },
                      { text: "Fecha de inicio:", bold: true, width: "13%" },
                      { text: _editFecha2(this.fecha_ini), width: "15%" },
                      { text: "Fecha de fin:", bold: true, width: "11%" },
                      { text: _editFecha2(this.fecha_fin), width: "20%" },
                    ],
            },
            {
              canvas: [
                {
                  type: "line",
                  x1: 0,
                  x2: width_page,
                  y1: 2,
                  y2: 2,
                },
              ],
            },
          ],
        };
      };

      formatoBaseImp_Hc.content[0].stack.push({
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
    let content = [],
      id_paci = "",
      edad_edit = "";

    if (this.paso_w == 1 || this.paso_w == 4) {
      id_paci = isNaN(this.paci["COD"]) ? this.paci["COD"] : new Intl.NumberFormat("ja-JP").format(this.paci["COD"]);

      edad_edit = parseInt(this.REG_REF[0].EDAD_HC.slice(1));

      switch (this.REG_REF[0].EDAD_HC.slice(0, 1)) {
        case "A":
          edad_edit += "  Años";
          break;
        case "M":
          edad_edit += "  Meses";
          break;
        case "D":
          edad_edit += "  Dias";
          break;
      }

      content.push({
        marginLeft: 7,
        marginTop: 10,
        columns: [
          {
            stack: [
              {
                columns: [
                  { text: "FECHA INGRESO:", style: "left8Bold", width: "15%" },
                  {
                    text: `${_editFecha2(this.REG_REF[0].FECHA_HC)} - ${_editHora(this.REG_REF[0].HORA_HC)}`,
                    style: "left8",
                    width: "43%",
                  },
                  {
                    columns:
                      this.REG_REF[0].EGRESO_HC.slice(4, 6) != 0
                        ? [
                            { text: "FECHA EGRESO:", style: "left8Bold", width: "36%" },
                            {
                              text: `${_editFecha2(this.REG_REF[0].EGRESO_HC)} - ${_editHora(
                                this.REG_REF[0].HORA_EGRES_HC
                              )}`,
                              style: "left8",
                              width: "60%",
                            },
                          ]
                        : [],
                  },
                ],
              },
              {
                marginTop: 2,
                columns: [
                  { text: "PACIENTE:", style: "left8Bold", width: "15%" },
                  { text: this.paci["DESCRIP"].replace(/\�/g, "Ñ"), style: "left8", width: "43%" },
                  { text: "IDENTIFICACIÓN:", style: "left8Bold", width: "15%" },
                  { text: this.paci["TIPO-ID"] + " " + id_paci, style: "left8", width: "27%" },
                ],
              },
              {
                marginTop: 2,
                columns: [
                  { text: "EDAD:", style: "left8Bold", width: "6%" },
                  { text: edad_edit, style: "left8", width: "9%" },
                  { text: "SEXO:", style: "left8Bold", width: "7%" },
                  { text: this.paci["SEXO"], style: "left8", width: "8%" },
                  { text: "NACIM:", style: "left8Bold", width: "8%" },
                  { text: _editFecha2(this.paci["NACIM"]), style: "left8", width: "20%" },
                  { text: "CIUDAD:", style: "left8Bold", width: "15%" },
                  { text: this.paci["DESCRIP-CIUDAD"], style: "left8", width: "27%" },
                ],
              },
              {
                marginTop: 2,
                columns: [
                  { text: "ACOMPAÑANTE:", style: "left8Bold", width: "15%" },
                  { text: this.paci["ACOMPA"], style: "left8", width: "43%" },
                  { text: "FOLIO:", style: "left8Bold", width: "6%" },
                  {
                    text: `${this.REG_REF[0].FOLIO_HC.slice(0, 2)} - ${this.REG_REF[0].FOLIO_HC.slice(2)}`,
                    style: "left8",
                    width: "12%",
                  },
                  { text: "TELEFONO:", style: "left8Bold", width: "10%" },
                  { text: this.paci["TELEFONO"], style: "left8", width: "15%" },
                ],
              },
              {
                marginTop: 2,
                columns: [
                  { text: "ENTIDAD:", style: "left8Bold", width: "15%" },
                  { text: this.paci["NOMBRE-EPS"], style: "left8", width: "85%" },
                ],
              },
              {
                marginTop: 2,
                columns: [
                  { text: "DIAGNOSTICOS:", style: "left8Bold", width: "15%" },
                  { text: this.REG_REF[0].DIAGS_EGR, style: "left8", width: "43%" },
                  { text: "FECHA DE REMISIÓN:", style: "left8Bold", width: "16%" },
                  { text: _editFecha2(this.REG_REF[0].FECHA_REF), style: "left8", width: "10%" },
                  { text: "GRP SANG:", style: "left8Bold", width: "8.5%" },
                  { text: this.paci["GRP-SANG"], style: "left8", width: "3%" },
                  { text: "RH:", style: "left8Bold", width: "3%" },
                  { text: this.paci["RH"], style: "left8", width: "15%" },
                ],
              },
              {
                marginLeft: -7,
                canvas: [
                  {
                    type: "rect",
                    x: 0,
                    y: -71,
                    w: 525,
                    h: 73,
                    r: 0,
                    lineWidth: 1,
                  },
                ],
              },
              {
                marginTop: 10,
                text: this.paso_w == 4 ? "REMISION" : "SEGUIMIENTO A PROCESO DE REFERENCIA DE PACIENTE",
                style: "center10Bold",
              },
            ],
            width: "100%",
          },
        ],
      });
    }

    for (let i in this.REG_REF) {
      let descrip_paci = `${this.REG_REF[i]["1ER_APEL_PACI"]} ${this.REG_REF[i]["2DO_APEL_PACI"]} ${this.REG_REF[i]["1ER_NOM_PACI"]} ${this.REG_REF[i]["2DO_NOM_PACI"]}`;

      let id_paci = isNaN(this.REG_REF[i]["COD_PACI"])
        ? this.REG_REF[i]["COD_PACI"]
        : new Intl.NumberFormat("ja-JP").format(this.REG_REF[i]["COD_PACI"]);

      let descrip_unserv =
        this.REG_REF[0].UNSERV_REF == 8 ? "PROMOCIÓN Y PREVENCIÓN" : this.REG_REF[0].DESCRIP_UNID_SERV;

      content.push(
        {
          marginTop: 6,
          style: "left8",
          columns: [
            { text: "Fecha:", bold: true, width: "6%" },
            { text: _editFecha2(this.REG_REF[i].FECHA_REF), width: "10%" },
            { text: "Hora:", bold: true, width: "5%" },
            { text: _editHora(this.REG_REF[i].HORA_REF), width: "10%" },
          ],
        },
        {
          marginTop: this.paso_w == 3 || this.paso_w == 5 ? 2 : 0,
          style: "left8",
          columns:
            this.paso_w == 3 || this.paso_w == 5
              ? [
                  { text: "Paciente:", bold: true, width: "8%" },
                  { text: descrip_paci, width: "50%" },
                  { text: "Id:", bold: true, width: "3%" },
                  { text: id_paci, width: "20%" },
                ]
              : [],
        },
        {
          marginTop: this.paso_w != 4 ? 2 : 0,
          style: "left8",
          columns:
            this.paso_w != 4
              ? [
                  { text: "Nombre del Médico Remitente:", bold: true, width: "22%" },
                  { text: this.REG_REF[i].DESCRIP_PROF, width: "36%" },
                  { text: "Servicio:", bold: true, width: "7%" },
                  { text: descrip_unserv, width: "30%" },
                ]
              : [],
        },
        {
          marginTop: 2,
          style: "left8",
          columns: [
            { text: "Responsable:", bold: true, width: "10%" },
            { text: this.REG_REF[i].NOMBRE_OPER, width: "40%" },
          ],
        },
        {
          marginTop: 2,
          style: "left8",
          columns: [
            { text: "Institución Referencia:", bold: true, width: "16%" },
            {
              text: `${
                isNaN(this.REG_REF[i].IPS_REF) ? this.REG_REF[i].IPS_REF : parseInt(this.REG_REF[i].IPS_REF)
              } - ${this.REG_REF[i].NOMBRE_IPS_REF}`,
              width: "84%",
            },
          ],
        },
        {
          marginTop: this.paso_w != 4 ? 2 : 0,
          style: "left8",
          columns:
            this.paso_w != 4
              ? [
                  { text: "Nombre de la persona de referencia:", bold: true, width: "26%" },
                  { text: this.REG_REF[i].FUNCIONARIO_IPS_REF, width: "74%" },
                ]
              : [],
        },
        {
          marginTop: this.paso_w != 4 ? 7 : 0,
          text: this.paso_w != 4 ? "Respuesta" : "",
          style: "left9Bold",
        },
        {
          marginTop: this.paso_w != 4 ? 3 : 0,
          text: this.paso_w != 4 && this.REG_REF[i].TABLA_REF ? this.REG_REF[i].TABLA_REF.enterPut() : "",
          style: "left8",
          alignment: "justify",
        },
        {
          marginTop: this.paso_w != 4 ? 2 : 0,
          style: "left8",
          columns:
            this.paso_w != 4
              ? [
                  { text: "Remisión aceptada:", bold: true, width: "15%" },
                  {
                    text: this.REG_REF[i].ACEPTADA_REF == "S" ? "SI" : this.REG_REF[i].ACEPTADA_REF == "N" ? "NO" : "",
                    width: "10%",
                  },
                ]
              : [],
        },
        {
          marginTop: this.REG_REF[i].ACEPTADA_REF == "S" ? 2 : 0,
          style: "left8",
          columns:
            this.REG_REF[i].ACEPTADA_REF == "S"
              ? [
                  { text: "Medico de IPS que acepta:", bold: true, width: "20%" },
                  { text: this.REG_REF[i].MEDICO_ACEPTA_REF, width: "40%" },
                ]
              : [],
        },
        {
          marginTop: this.REG_REF[i].ACEPTADA_REF == "S" ? 2 : 0,
          style: "left8",
          columns:
            this.REG_REF[i].ACEPTADA_REF == "S"
              ? [
                  { text: "Personal administrativo que acepta remisión:", bold: true, width: "32%" },
                  { text: this.REG_REF[i].PERS_ADMIN_REF, width: "40%" },
                ]
              : [],
        },
        {
          marginTop: this.REG_REF[i].ACEPTADA_REF == "S" && this.paso_w != 4 ? 2 : 0,
          marginTop: 2,
          style: "left8",
          alignment: "justify",
          columns:
            this.REG_REF[i].ACEPTADA_REF == "S" && this.paso_w != 4
              ? [
                  { text: "Soportes:", bold: true, width: "8%" },
                  {
                    text: this.REG_REF[i].SOPORTES_REF ? this.REG_REF[i].SOPORTES_REF.enterPut() : "",
                    width: "92%",
                  },
                ]
              : [],
        },
        {
          stack: this.paso_w == 3 ? [
            {
              marginBottom: 10,
              canvas: [
                {
                  type: "line",
                  x1: 0,
                  x2: 525,
                  y1: 7,
                  y2: 7,
                },
              ],
            }
          ] : []
        }
      );
    }

    return content;
  }
}

const imprimir_HCBI01 = (params) => {
  let formato = new formato_HCBI01(params);
  formato._init();
};

module.exports = {
  imprimir_HCBI01,
};
