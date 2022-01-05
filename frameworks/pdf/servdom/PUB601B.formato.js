// Imprime los pagos de facturas por comprob - David.M - 20-08-2021

const { styles_imp, format_op, mascara_valor, rutaLogos, _editFecha2 } = require("../../../SERVDOM/scripts/globalDom");

class formato_PUB601B {
  constructor(params) {
    this.llave_w = params.llave_w;
    this.reg_pago = {};
    this.array_puntos = [];
    this.reg_punto = {};
    this.descrip_punto = "";
    this.callback = params.callback;
    this.callback_err = params.callback_err;

    this.tabla_pagos_w = [];
    this.nro_w = 0;
    this.total_w = 0;
    this.gran_tot = 0;
  }

  _init() {
    this.leerPagos();
  }

  leerPagos() {
    postData({ datosh: moduloDatosEnvio() + this.llave_w + "|1|" }, get_url("app/SERVDOM/PUB601_01.DLL"))
      .then((data) => {
        console.log(data, "data");
        this.reg_pago = Object.assign({}, data);
        this.leerPuntosPago();
      })
      .catch((error) => {
        console.error(error);
        CON851("", "Error intentando grabar", null, "error", "Error");
        loader("hide");
        this.callback_err();
      });
  }

  leerPuntosPago() {
    postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB807.DLL"))
      .then((data) => {
        this.array_puntos = data.PUNTO_PAGO;
        let busqueda = this.array_puntos.find((e) => e.cod == this.reg_pago.cod);

        this.reg_punto = busqueda ? JSON.parse(JSON.stringify(busqueda)) : {};
        this.descrip_punto = this.reg_punto ? this.reg_punto.descrip : "";

        this.leerTabla();
      })
      .catch((error) => {
        console.error(error);
        CON851("", "Error consultando archivo de punto de pago", null, "error", "");
        loader("hide");
        callback_err();
      });
  }

  async leerTabla() {
    this.reg_pago.datos_tab.forEach(async (el, index) => {
      if (format_op(el.vlr_fac) > 0) {
        this.nro_w = parseInt(this.nro_w) + 1;
        this.total_w = format_op(this.total_w) + format_op(el.vlr_fac);

        el.nro_fac = mascara_valor.resolve(format_op(el.nro_fac).toString());
        el.vlr_fac = mascara_valor.resolve(format_op(el.vlr_fac).toString());
        el.vlr_ser.forEach((x) => {
          x.vlr = mascara_valor.resolve(format_op(x.vlr).toString());
        });

        this.tabla_pagos_w.push(JSON.parse(JSON.stringify(el)));
      }

      if (parseInt(index) + 1 == this.reg_pago.datos_tab.length) {
        this.totales();
      }
    });
  }

  totales() {
    this.total_w = mascara_valor.resolve(format_op(this.total_w).toString());
    this.reg_pago.acum_rec = mascara_valor.resolve(format_op(this.reg_pago.acum_rec).toString());

    this.gran_tot = format_op(this.total_w) + format_op(this.reg_pago.acum_rec);
    this.gran_tot = mascara_valor.resolve(format_op(this.gran_tot).toString());

    this.imprimir();
  }

  async imprimir() {
    await _impresion2({
      tipo: "pdf",
      archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmss")}.pdf`,
      content: this.format(),
    })
      .then((data) => {
        this.callback(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  format() {
    return {
      pageMargins: [20, 95, 20, 40],
      images: { logo: rutaLogos(parseInt($_USUARIO_EMPRESA.NIT)) },
      header: (currentPage, pageCount) => {
        return {
          margin: [20, 20, 20, 0],
          stack: [
            {
              style: "left8",
              table: {
                widths: ["18%", "57%", "25%"],
                heights: [53],
                body: [
                  [
                    {
                      margin: [10, 4, 0, 0],
                      stack: [
                        {
                          image: "logo",
                          width: 70,
                          height: 50,
                        },
                      ],
                      border: [true, true, false, true],
                    },
                    {
                      marginTop: 3,
                      style: "left10Bold",
                      stack: [
                        { text: `MUNICIPIO DE ${$_USUARIO_EMPRESA.CIUDAD}` },
                        `Comprobante de pagos recibidos`,
                        { text: `Fecha Generación: ${this.reg_pago.ano_gen}${this.reg_pago.mes_gen}`, marginTop: 2 },
                        {
                          text: `Fecha de pago: ${_editFecha2(
                            `${this.reg_pago.ano}${this.reg_pago.mes}${this.reg_pago.dia}`
                          )}  Oficina: ${this.reg_pago.cod}  Comp: ${this.reg_pago.secu}`,
                          marginTop: 2,
                        },
                      ],
                      width: "60%",
                      border: [false, true, false, true],
                    },
                    {
                      stack: [
                        { text: `FECHA IMP: ${moment().format("YYYY-MM-DD")}` },
                        { text: `PAG: ${currentPage} de ${pageCount}`, marginTop: 14 },
                      ],
                      margin: [0, 7, 7, 0],
                      style: "right10Bold",
                      width: "20%",
                      border: [false, true, true, true],
                    },
                  ],
                ],
              },
            },
          ],
        };
      },
      content: [
        {
          table: this.llenarFormato(),
          layout: {
            hLineWidth: function (i, node) {
              console.log(node);
              if (i == 0 || i == 1 || i === node.table.body.length) return 1;
              else return 0;
            },
            vLineWidth: function (i, node) {
              if ([0, 1, 2, 3, 4, 5, 6].includes(i)) return 1;
              else return 0;
            },
          },
        },
      ],
      styles: styles_imp(),
    };
  }

  llenarFormato() {
    let table = {
      widths: ["16%", "17%", "16%", "17%", "16%", "18%"],
      body: [],
    };

    let body = [
      { text: "Factura", style: "center10BoldT" },
      { text: "Valor", style: "center10BoldT" },
      { text: "Factura", style: "center10BoldT" },
      { text: "Valor", style: "center10BoldT" },
      { text: "Factura", style: "center10BoldT" },
      { text: "Valor", style: "center10BoldT" },
    ];

    table.body.push(body);

    let registros = [];

    this.tabla_pagos_w.forEach((el) => {
      registros.push({ text: el.nro_fac, style: "right10" }, { text: el.vlr_fac, style: "right10" });
      if (registros.length == 6) {
        table.body.push(registros);
        registros = [];
      }
    });

    if (registros.length > 0 && registros.length < 6) {
      if (registros.length == 2) {
        registros.push({}, {}, {}, {});
        table.body.push(registros);
        registros = [];
      } else {
        registros.push({}, {});
        table.body.push(registros);
        registros = [];
      }
    }

    let total = [
      { text: "", style: "center10Bold" },
      { text: "", style: "center10Bold" },
      { text: "", style: "center10Bold" },
      { text: "Totales", style: "center10Bold" },
      { text: `Nro: ${this.nro_w}`, style: "right10Bold" },
      { text: this.total_w, style: "right10Bold" },
    ];

    table.body.push(total);

    let gran_tot = [
      { text: this.descrip_punto, style: "center10Bold", colSpan: 2 },
      {},
      { text: "Recargos", style: "center10Bold" },
      { text: this.reg_pago.acum_rec, style: "right10Bold" },
      { text: `Gran TOT.`, style: "center10Bold" },
      { text: this.gran_tot, style: "right10Bold" },
    ];

    table.body.push(gran_tot);

    return table;
  }
}

const imprimir_PUB601B = async (params) => {
  var formato = new formato_PUB601B(params);
  formato._init();
};

module.exports = {
  imprimir_PUB601B,
};
