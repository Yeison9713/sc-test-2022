// Imprime PQR - David.M - 02-09-2021

const { styles_imp, rutaLogos, _editarFecha } = require("../../../SERVDOM/scripts/globalDom");

class formato_PUB704P {
  constructor(params) {
    this.llave = params.llave;
    this.reg_pqr = {};
    this.callback = params.callback;
    this.callback_err = params.callback_err;
  }

  _init() {
    this.leerPQR();
  }

  leerPQR() {
    postData({ datosh: moduloDatosEnvio(), nro: this.llave, paso: "1" }, get_url("app/SERVDOM/PUB704_01.DLL"))
      .then((data) => {
        if (!data.llave.trim() || data.llave == 0) {
          CON851("", "01", null, "error", "Error");
          this.callback_err();
        } else {
          this.reg_pqr = JSON.parse(JSON.stringify(data));
          this.imprimir();
        }
      })
      .catch((error) => {
        console.error(error);
        CON851("", "Error consultando datos", null, "error", "Error");
        this.callback_err();
      });
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
                        { text: `${$_USUARIO_EMPRESA.DIRECC} - TEL: ${$_USUARIO_EMPRESA.TELEFONO}` },
                        { text: `${$_USUARIO_EMPRESA.CIUDAD} - ${$_USUARIO_EMPRESA.DPTO}` },
                        { text: `COMPROBANTE P.Q.R  NÚMERO: ${this.reg_pqr.llave}` },
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
                            { text: "MEDIO: ", bold: true, width: "7%" },
                            { text: this.reg_pqr.descrip_medio, width: "16%" },
                            { text: "SOLICITANTE: ", width: "12%", bold: true },
                            { text: this.reg_pqr.descrip_solic, width: "17%" },
                            { text: "COD: ", width: "6%", bold: true },
                            { text: this.reg_pqr.usu, width: "17%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "FECHA: ", width: "7%", bold: true },
                            { text: _editarFecha(`20${this.reg_pqr.fecha}`), width: "16%" },
                            { text: "NOMBRE: ", width: "12%", bold: true },
                            { text: this.reg_pqr.nom, width: "66%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "", width: "23%" },
                            { text: "DIRECCIÓN: ", width: "12%", bold: true },
                            { text: this.reg_pqr.dir, width: "66%" },
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
          heights: [15, 50, 15, 15, 15, 50, 15],
          widths: ["100%"],
          body: [
            [{ text: "P.Q.R", bold: true, marginTop: 2, style: "left9BoldT" }],
            [
              {
                text: this.reg_pqr.descrip.enterPut(),
                style: "left9",
                alignment: "justify",
              },
            ],
            [
              {
                marginTop: 2,
                stack: [
                  {
                    columns: [
                      { text: "SERVICIO: ", style: "left9Bold", width: "9%" },
                      { text: this.reg_pqr.descrip_ser, style: "left9", width: "30%" },
                      { text: "MOTIVO: ", style: "left9Bold", width: "8%" },
                      { text: `${this.reg_pqr.mot} - ${this.reg_pqr.descrip_mot}`, style: "left9", width: "53%" },
                    ],
                  },
                ],
              },
            ],
            [
              {
                marginTop: 2,
                columns: [
                  { text: "DEPENDENCIA RESPONSABLE: ", style: "left9Bold", width: "24%" },
                  { text: `${this.reg_pqr.dep} - ${this.reg_pqr.descrip_dep}`, style: "left9", width: "30%" },
                ],
              },
            ],
            [{ marginTop: 2, text: "CONCEPTO", style: "left9BoldT" }],
            [
              {
                text: this.reg_pqr.concep.enterPut(),
                style: "left9",
                alignment: "justify",
              },
            ],
            [
              {
                marginTop: 2,
                columns: [
                  { text: "ESTADO DEL P.Q.R: ", style: "left9Bold", width: "16%" },
                  { text: this.reg_pqr.descrip_est, style: "left9", width: "23%" },
                  { text: "FECHA DE SOLUCIÓN: ", style: "left9Bold", width: "18%" },
                  { text: _editarFecha(`20${this.reg_pqr.fecha_sol}`), style: "left9", width: "30%" },
                ],
              },
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

const imprimir_PUB704P = async (params) => {
  var formato = new formato_PUB704P(params);
  formato._init();
};

module.exports = {
  imprimir_PUB704P,
};
