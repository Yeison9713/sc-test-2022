const { consulta } = require("../../../frameworks/scripts/getDatos.js");

class formato_SER4B8I {
  constructor(params) {
    this.consecutivo = params.consecutivo;
    this.llave_fact = params.llave_fact;
    this.paci = params.paci;
    this.fecha_ini = params.fecha_ini || "";
    this.fecha_fin = params.fecha_fin || "";
    this.seleccion = params.seleccion || "";
    this.reg_solau = {};
    this.reg_paci = {};
    this.reg_num = {};
    this.reg_tercero = {};
    this.reg_activ = {};
    this.callback_error = params.callback_error;
    this.callback = params.callback;
    this.masiva = params.masiva || false;
  }

  async _init() {
    this.consultarSolau();
  }

  async consultarSolau() {
    try {
      this.reg_solau = await consulta._solau({
        llave_fact: `${this.llave_fact}`,
      });
      this.consultarPaciente();
    } catch {
      this.callback_error();
    }
  }

  async consultarPaciente() {
    try {
      this.reg_paci = await consulta._paci({ cod_paci: this.paci });
      this.consultarNum();
    } catch (err) {
      console.error(err);
      this.callback_error();
    }
  }

  async consultarNum() {
    try {
      this.reg_num = await consulta._num({
        llave: `${this.reg_solau.fact.prefijo}${this.reg_solau.fact.nro}`,
        maestro: true,
      });
      if (!this.reg_num.llave) this.reg_num.descrip = "";
      this.consultarTercero();
    } catch (err) {
      console.error(err);
      this.callback_error();
    }
  }

  async consultarTercero() {
    try {
      this.reg_tercero = await consulta._tercero({ cod_tercero: this.reg_num.nit, maestro: true });
      if (!this.reg_tercero.cod) this.reg_tercero.act = "";
      this.consultarAct();
    } catch (err) {
      console.error(err);
      this.callback_error();
    }
  }

  async consultarAct() {
    try {
      this.reg_activ = await consulta._act({ cod: this.reg_tercero.act, maestro: true });
      if (this.reg_activ.cod) this.reg_activ.nombre = this.reg_tercero.act;
      this._imprimir();
    } catch (err) {
      console.error(err);
      this.callback_error();
    }
  }

  async _imprimir() {
    _impresion2({
      tipo: "pdf",
      archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`,
      content: this.format(),
      retornar: this.masiva == true ? true : false,
    })
      .then((data) => {
        this.callback(data);
      })
      .catch((error) => {
        this.callback_error();
        console.error(error);
      });
  }

  format() {
    return {
      pageMargins: [20, 75, 20, 10],
      images: { logo: rutaLogos(parseInt($_USUA_GLOBAL[0].NIT)) },
      header: (currentPage, pageCount, pageSize) => {
        let width_page = pageSize.width - 40;

        return {
          margin: [20, 20, 20, 0],
          stack: [
            {
              columns: [
                {
                  margin: [15, -5, 0, 0],
                  stack: [
                    {
                      image: "logo",
                      width: 70,
                      height: 50,
                    },
                  ],
                  width: "20%",
                },
                {
                  marginTop: -10,
                  style: "center10Bold",
                  stack: [
                    { text: $_USUA_GLOBAL[0].NOMBRE, marginTop: 5 },
                    { text: $_USUA_GLOBAL[0].NIT, marginTop: 7 },
                    { text: "SOLICITUD DE AUTORIZACIONES DE SERVICIOS DE SALUD", marginTop: 8 },
                  ],
                  width: "55%",
                },
                {
                  margin: [3, -10, 5, 0],
                  style: "center8",
                  table: {
                    widths: ["40%", "10%", "35%", "15%"],
                    body: [
                      [{ text: "COD", colSpan: 2 }, {}, { text: "GCO-P1-PR2-F1", colSpan: 2 }, {}],
                      [{ text: "VERSION" }, { text: "03" }, { text: "FR" }, { text: "14" }],
                      [{ text: "FECHA", colSpan: 2 }, {}, { text: "19-AGT-20", colSpan: 2 }, {}],
                      [{ text: "PAG", colSpan: 2 }, {}, { text: "1", colSpan: 2 }, {}],
                    ],
                  },
                  width: "25%",
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
                  h: 65,
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
          stack: [
            {
              stack: this.llenarFormato(),
            },
          ],
        },
      ],
      styles: stylesGlobal_imp(),
    };
  }

  llenarFormato() {
    return [
      {
        marginTop: 5,
        style: "left8",
        columns: [
          {
            width: "15%",
            table: {
              heights: 52.5,
              widths: ["100%"],
              body: [
                [
                  {
                    marginTop: 13,
                    text: "DATOS DEL PACIENTE",
                    style: "center12Bold",
                    border: [true, true, false, true],
                  },
                ],
              ],
            },
          },
          {
            stack: [
              {
                table: {
                  widths: ["15%", "65%", "10%", "10%"],
                  body: [
                    [
                      { text: "NOMBRE", bold: true },
                      {
                        text: `${this.reg_paci._1er_nom} ${this.reg_paci._2do_nom} ${this.reg_paci._1er_apel} ${this.reg_paci._2do_apel}`,
                      },
                      this.seleccion == 1 ? {} : { text: "FACTURA", bold: true },
                      this.seleccion == 1
                        ? {}
                        : { text: `${this.reg_solau.fact.prefijo} - ${this.reg_solau.fact.nro}` },
                    ],
                    [
                      {
                        text: [
                          { text: `${this.reg_paci.tipo_id} :`, bold: true },
                          {
                            text: !isNaN(this.reg_paci.cod)
                              ? new Intl.NumberFormat("ja-JP").format(this.reg_paci.cod)
                              : this.reg_paci.cod,
                          },
                        ],
                        colSpan: 4,
                      },
                    ],
                  ],
                },
              },
              {
                table: {
                  widths: ["15%", "48%", "10%", "27%"],
                  body: [
                    [
                      { text: "ENTIDAD", bold: true },
                      { text: this.reg_num.descrip },
                      { text: "ACTIVIDAD", bold: true },
                      { text: this.reg_activ.nombre },
                    ],
                  ],
                },
                layout: {
                  hLineWidth: function (i) {
                    return i != 0 ? 1 : 0;
                  },
                },
              },
              {
                table: {
                  widths: ["15%", "5%", "20%", "5%", "15%", "5%", "25%", "10%"],
                  body: [
                    [
                      { text: "COTIZANTE", bold: true },
                      { text: this.reg_paci.cod == this.reg_paci.id_cotiz ? "X" : "", alignment: "center" },
                      { text: "BENEFICIARIO", bold: true },
                      { text: this.reg_paci.cod != this.reg_paci.id_cotiz ? "X" : "", alignment: "center" },
                      { text: "NIVEL", bold: true },
                      { text: this.reg_paci.estrato, alignment: "center" },
                      this.seleccion == 1 ? {} : { text: "SEMANAS COTIZADAS", bold: true },
                      this.seleccion == 1 ? {} : { text: parseInt(this.reg_solau.sem_cot), alignment: "center" },
                    ],
                  ],
                },
                layout: {
                  hLineWidth: function (i) {
                    return i != 0 ? 1 : 0;
                  },
                },
              },
            ],
            width: "85%",
          },
        ],
      },
      {
        stack: this.llenarTabla(),
      },
    ];
  }

  llenarTabla() {
    let tabla = [];

    console.log(this.fecha_ini);
    console.log(this.fecha_fin);
    console.log(this.seleccion);

    for (let i in this.reg_solau.tabla) {
      if (this.reg_solau.tabla[i].fecha > 1) {
          console.log(this.reg_solau.tabla[i].fecha, "fecha tabla")
        if (
          this.seleccion == 1 &&
          (this.reg_solau.tabla[i].fecha < this.fecha_ini || this.reg_solau.tabla[i].fecha > this.fecha_fin)
        ) {
          // continue
        } else {
          tabla.push({
            marginTop: i == 0 ? 15 : 5,
            style: "left8",
            table: {
              widths: ["13.8%", "86.2%"],
              body: [
                [
                  {
                    stack: [
                      {
                        marginTop: 35,
                        text: "AUTORIZACIÓN",
                        style: "center10Bold",
                      },
                      {
                        marginTop: 10,
                        text: this.reg_solau.tabla[i].descrip_unserv,
                        style: "center8Bold",
                      },
                    ],
                    border: [true, true, false, true],
                  },
                  {
                    border: [false, false, false, false],
                    stack: [
                      {
                        margin: [-5, -3, -5, 0],
                        table: {
                          widths: ["11%", "10%", "5%", "10%", "5%", "10%", "7%", "10%", "10%", "10%", "12%"],
                          body: [
                            [
                              { text: "FECHA", bold: true },
                              { text: "DIA", bold: true },
                              { text: this.reg_solau.tabla[i].fecha.slice(6), alignment: "center" },
                              { text: "MES", bold: true },
                              { text: this.reg_solau.tabla[i].fecha.slice(4, 6), alignment: "center" },
                              { text: "AÑO", bold: true },
                              { text: this.reg_solau.tabla[i].fecha.slice(0, 4), alignment: "center" },
                              { text: "HORA", bold: true },
                              {
                                text: `${this.reg_solau.tabla[i].hora.slice(0, 2)}:${this.reg_solau.tabla[i].hora.slice(
                                  2
                                )}`,
                                alignment: "center",
                              },
                              { text: "FACTURA", bold: true },
                              { text: `${this.reg_solau.fact.prefijo} - ${this.reg_solau.fact.nro}` },
                            ],
                          ],
                        },
                      },
                      {
                        margin: [-5, 0, -5, 0],
                        table: {
                          widths: ["25%", "75%"],
                          body: [
                            [
                              { text: "CODIGO CUPS", bold: true },
                              { text: `${this.reg_solau.tabla[i].cups} - ${this.reg_solau.tabla[i].descrip_cups}` },
                            ],
                            [{ text: "CODIGO AUTORIZACIÓN", bold: true }, { text: this.reg_solau.tabla[i].cod }],
                            [
                              { text: "NOMBRE DE QUIEN AUTORIZA", bold: true },
                              { text: this.reg_solau.tabla[i].nom_quien_autoriza },
                            ],
                          ],
                        },
                        layout: {
                          hLineWidth: function (i) {
                            return i != 0 ? 1 : 0;
                          },
                        },
                      },
                      {
                        margin: [-5, 0, -5, 0],
                        table: {
                          widths: ["15%", "85%"],
                          body: [
                            [
                              { text: "OBSERVACIONES", bold: true },
                              {
                                text: this.reg_solau.tabla[i].observacion.enterPut(),
                                alignment: "justify",
                              },
                            ],
                          ],
                        },
                        layout: {
                          hLineWidth: function (i) {
                            return i != 0 ? 1 : 0;
                          },
                        },
                      },
                      {
                        margin: [-5, 0, -5, -3],
                        table: {
                          widths: ["40%", "60%"],
                          body: [
                            [
                              { text: "NOMBRE DE FUNCIONARIO QUE DILIGENCIA", bold: true },
                              { text: this.reg_solau.tabla[i].oper },
                            ],
                          ],
                        },
                        layout: {
                          hLineWidth: function (i) {
                            return i != 0 ? 1 : 0;
                          },
                        },
                      },
                    ],
                    width: "85%",
                  },
                ],
              ],
            },
          });
        }
      }
    }

    return tabla;
  }
}

const imprimir_SER4B8I = function (params) {
  var formato = new formato_SER4B8I(params);
  formato._init();
};

module.exports = {
  imprimir_SER4B8I,
};
