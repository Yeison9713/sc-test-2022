// Imprime Solicitud de servicios - David.M - 06-09-2021

const {
  styles_imp,
  rutaLogos,
  _editarFecha,
  _editFecha2,
  mascara_valor,
  format_op,
} = require("../../../SERVDOM/scripts/globalDom");

class formato_PUB707P {
  constructor(params) {
    this.llave = params.llave;
    this.reg_sol = {};
    this.callback = params.callback;
    this.callback_err = params.callback_err;

    this.deduccion = 0;
  }

  _init() {
    this.leerSolicitud();
  }

  leerSolicitud() {
    postData({ datosh: moduloDatosEnvio(), nro: this.llave, paso: "1" }, get_url("app/SERVDOM/PUB707_01.DLL"))
      .then((data) => {
        if (!data.llave.trim() || data.llave == 0) {
          CON851("", "01", null, "error", "Error");
          this.callback_err();
        } else {
          this.reg_sol = JSON.parse(JSON.stringify(data));
          this.totales();
        }
      })
      .catch((error) => {
        console.error(error);
        CON851("", "Error consultando datos", null, "error", "Error");
        this.callback_err();
      });
  }

  async totales() {
    this.reg_sol.vlr_cnx = mascara_valor.resolve(format_op(this.reg_sol.vlr_cnx).toString());
    this.reg_sol.vlr_ini = mascara_valor.resolve(format_op(this.reg_sol.vlr_ini).toString());
    this.reg_sol.vlr_mob = mascara_valor.resolve(format_op(this.reg_sol.vlr_mob).toString());
    this.reg_sol.vlr_mat = mascara_valor.resolve(format_op(this.reg_sol.vlr_mat).toString());
    this.reg_sol.vlr_net = mascara_valor.resolve(format_op(this.reg_sol.vlr_net).toString());

    this.deduccion =
      format_op(this.reg_sol.vlr_ini) + format_op(this.reg_sol.vlr_mob) + format_op(this.reg_sol.vlr_mat);

    this.deduccion = mascara_valor.resolve(format_op(this.deduccion).toString());

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
      pageMargins: [20, 135, 20, 40],
      images: { logo: rutaLogos(parseInt($_USUARIO_EMPRESA.NIT)) },
      header: () => {
        return {
          margin: [20, 20, 20, 0],
          stack: [
            {
              style: "left9",
              table: {
                widths: ["25%", "50%", "25%"],
                heights: [60, 37],
                body: [
                  [
                    {
                      marginTop: 4,
                      alignment: "center",
                      stack: [
                        {
                          image: "logo",
                          width: 70,
                          height: 50,
                        },
                      ],
                      border: [true, true, false, true],
                      width: "20%",
                    },
                    {
                      marginTop: 3,
                      style: "center10Bold",
                      stack: [
                        { text: $_USUARIO_EMPRESA.NOMBRE },
                        { text: `NIT: ${$_USUARIO_EMPRESA.NIT}` },
                        { text: `SOLICITUD DE SERVICIOS NÚMERO: ${this.reg_sol.llave}`, marginTop: 4 },
                        { text: `FECHA: ${_editFecha2(this.reg_sol.fecha)}` },
                      ],
                      width: "60%",
                      border: [false, true, false, true],
                    },
                    {
                      text: "",
                      border: [false, true, true, true],
                    },
                  ],
                  [
                    {
                      colSpan: 3,
                      marginTop: 1,
                      stack: [
                        {
                          columns: [
                            { text: "Código: ", bold: true, width: "8%" },
                            { text: this.reg_sol.usu, width: "20%" },
                            { text: "Nombre: ", width: "8%", bold: true },
                            { text: this.reg_sol.nom, width: "66%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "Teléfono: ", bold: true, width: "8%" },
                            { text: this.reg_sol.tel, width: "20%" },
                            { text: "Dirección: ", width: "8%", bold: true },
                            { text: this.reg_sol.dir, width: "66%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "Servicio: ", width: "8%", bold: true },
                            { text: this.reg_sol.descrip_ser, width: "20%" },
                            { text: "Tarifa: ", width: "8%", bold: true },
                            { text: this.reg_sol.cod_tar, width: "66%" },
                          ],
                        },
                      ],
                      width: "20%",
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
          stack: [
            {
              stack: this.llenarFormato(),
            },
          ],
        },
      ],
      styles: styles_imp(),
    };
  }

  llenarFormato() {
    return [
      {
        marginTop: 10,
        style: "left9",
        table: {
          heights: 15,
          widths: ["15%", "85%"],
          body: [
            [
              { text: `OBSERVACIONES: `, bold: true, marginTop: 2 },
              { text: this.reg_sol.observ, marginTop: 2 },
            ],
          ],
        },
      },
      {
        marginTop: 10,
        style: "left9",
        table: {
          heights: 15,
          widths: ["50%", "25%", "25%"],
          body: [
            [
              { text: "VALOR CONEXIÓN: ", bold: true, marginTop: 2 },
              { text: "", border: [true, true, false, true] },
              {
                text: this.reg_sol.vlr_cnx,
                bold: true,
                marginTop: 2,
                alignment: "right",
                border: [false, true, true, true],
              },
            ],
            [
              { text: "CUOTA INICIAL: ", bold: true, marginTop: 2 },
              { text: this.reg_sol.vlr_ini, bold: true, marginTop: 2, alignment: "right" },
              { text: "", border: [false, false, false, false] },
            ],
            [
              { text: "SUMINISTRO MANO OBRA: ", bold: true, marginTop: 2 },
              { text: this.reg_sol.vlr_mob, bold: true, marginTop: 2, alignment: "right" },
              { text: "", border: [false, false, false, false] },
            ],
            [
              { text: "SUMINISTRO MATERIALES: ", bold: true, marginTop: 2 },
              { text: this.reg_sol.vlr_mat, bold: true, marginTop: 2, alignment: "right" },
              { text: "", border: [false, false, false, false] },
            ],
            [
              { text: "TOTAL DEDUCCIÓN: ", bold: true, marginTop: 2 },
              { text: "", border: [true, true, false, true] },
              {
                text: this.deduccion,
                bold: true,
                marginTop: 2,
                alignment: "right",
                border: [false, true, true, true],
              },
            ],
            [
              { text: "SALDO A PAGAR: ", bold: true, marginTop: 2 },
              { text: "", border: [true, true, false, true] },
              {
                text: this.reg_sol.vlr_net,
                bold: true,
                marginTop: 2,
                alignment: "right",
                border: [false, true, true, true],
              },
            ],
            [
              { text: "NÚMERO DE CUOTAS: ", bold: true, marginTop: 2 },
              { text: "", border: [true, true, false, true] },
              {
                text: this.reg_sol.cta,
                bold: true,
                marginTop: 2,
                alignment: "right",
                border: [false, true, true, true],
              },
            ],
          ],
        },
      },
      {
        marginTop: 10,
        style: "left9",
        table: {
          heights: 15,
          widths: ["50.8%", "10%", "10%", "10%"],
          body: [
            [
              { text: "FECHA DE INSTALACIÓN: ", bold: true, marginTop: 2 },
              { text: `Año:  ${this.reg_sol.fecha_ins.slice(0,4)}`, bold: true, marginTop: 2, alignment: "center" },
              { text: `Mes:  ${this.reg_sol.fecha_ins.slice(4,6)}`, bold: true, marginTop: 2, alignment: "center" },
              { text: `Dia:  ${this.reg_sol.fecha_ins.slice(6)}`, bold: true, marginTop: 2, alignment: "center" },
            ],
          ],
        },
      },
      {
        marginTop: 90,
        columns: [
          {
            width: "50%",
            stack: [
              {
                canvas: [{ type: "line", x1: 70, x2: 200, y1: -10, y2: -10 }],
              },
              {
                style: "center9Bold",
                text: "FIRMA FUNCIONARIO",
              },
            ],
          },
          {
            width: "50%",
            stack: [
              {
                canvas: [{ type: "line", x1: 70, x2: 200, y1: -10, y2: -10 }],
              },
              {
                style: "center9Bold",
                text: "FIRMA USUARIO",
              },
            ],
          },
        ],
      },
    ];
  }
}

const imprimir_PUB707P = async (params) => {
  var formato = new formato_PUB707P(params);
  formato._init();
};

module.exports = {
  imprimir_PUB707P,
};
