// Impresion de un comprobante pago parcial - David.M - 20-07-2021

const {
  styles_imp,
  _editarFecha,
  format_op,
  mascara_valor,
  rutaLogos,
} = require("../../../SERVDOM/scripts/globalDom");
const { regs_dom } = require("../../../SERVDOM/scripts/regs_dom");

class formato_PUB206A {
  constructor(params) {
    this.nom_fac_w = "";
    this.callback = params.callback;
    this.callback_err = params.callback_err;
    this.array_usuar_ser = params.array_usuar_ser;
    this.array_serv = params.array_serv || [];
    this.llave_abo = params.llave_abo;
    this.reg_fact = params.reg_fact || null;
    this.reg_ctl = params.reg_ctl || null;
    this.reg_usuar_ser = params.reg_usuar_ser || {};
    this.reg_tar = {};
    this.cargos_w = "";
    this.total_abonos_w = "";
    this.saldo_w = "";
    this.ajuste_w = "";
    this.tabla_serv_w = [
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
      {
        abo_serv_w: "",
        tabla_tot_w: [{ tot_serv_w: "" }, { tot_serv_w: "" }],
      },
    ];
    this.tot_tot_w = 0;
    this.codigo_barras = "";
    this.descripciones_serv = {};

    this.tot_refinan_w = "";
    this.cuotas_ref_w = "";
    this.medidor_l = "";
  }

  _init() {
    this.leerAbono();
  }

  leerAbono() {
    postData(
      {
        datosh: moduloDatosEnvio() + "1|",
        llave_abo: this.llave_abo,
      },
      get_url("app/SERVDOM/PUB206_01.DLL")
    )
      .then((data) => {
        this.reg_abo = data;
        this.leerFact();
      })
      .catch((error) => {
        console.error(error);
        loader("hide");
        if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "");
        this.callback_err();
      });
  }

  leerFact() {
    this.nom_fac_w = `${this.reg_abo.fecha_gen.ano_gen}${this.reg_abo.fecha_gen.mes_gen}`;
    loader("show");
    postData(
      { datosh: moduloDatosEnvio() + "1|", fecha: this.nom_fac_w, nro_fac: this.reg_abo.fact },
      get_url("app/SERVDOM/PUB203_02.DLL")
    )
      .then((data) => {
        this.reg_fact = data;
        this.leerCtl();
      })
      .catch((error) => {
        console.error(error);
        loader("hide");
        if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "");
        this.callback_err();
      });
  }

  leerCtl() {
    postData({ datosh: moduloDatosEnvio() + this.nom_fac_w + "|1|" }, get_url("app/SERVDOM/PUB201_01.DLL"))
      .then((data) => {
        this.reg_ctl = data;
        if (!this.reg_ctl.llave) {
          CON851("", "No se encontro Registro Control", null, "error", "Error");
          this.callback_err();
        } else this.leerUsuarSer();
      })
      .catch((error) => {
        console.error(error);
        loader("hide");
        if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "");
        this.callback_err();
      });
  }

  leerUsuarSer() {
    postData(
      {
        datosh: moduloDatosEnvio() + this.reg_fact.cat + "|" + this.reg_ctl.periodo[0].ano_per + "|",
      },
      get_url("app/SERVDOM/PUB801_01.DLL")
    )
      .then((data) => {
        this.reg_usuar_ser = data;
        loader("hide");
        this.leerFacturas();
      })
      .catch((error) => {
        console.error(error);
        loader("hide");
        this.callback_err();
      });
  }

  leerFacturas() {
    let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.reg_fact.cat);
    if (!busqueda) {
      this.reg_fact.nombre = "******************************";
      this.reg_fact.direcc = "";
    } else this.reg_fact.nombre = busqueda.NOMBRE;

    this.datosUsuario();
  }

  async datosUsuario() {
    await this.llenarNombreServicio();

    this.llenarFactura();
  }

  async llenarNombreServicio() {
    for (let i = 0; i < 4; i++) {
      let busqueda = this.array_serv.find((e) => e.cod == parseInt(i) + 1);

      if(busqueda) {
        busqueda = JSON.parse(JSON.stringify(busqueda));
        busqueda.descrip = busqueda.descrip.split(" ");
      }

      this.descripciones_serv[`descrip_${i}`] = busqueda ? busqueda.descrip[0] : "";
    }
  }

  async llenarFactura() {
    this.reg_abo.tabla.vlr_abo = mascara_valor.resolve(this.reg_abo.tabla.vlr_abo.toString());

    this.reg_abo.tabla.vlr_ser[0].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[0].vlr.toString());
    this.reg_abo.tabla.vlr_ser[1].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[1].vlr.toString());
    this.reg_abo.tabla.vlr_ser[2].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[2].vlr.toString());
    this.reg_abo.tabla.vlr_ser[3].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[3].vlr.toString());
    this.reg_abo.tabla.vlr_ser[4].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[4].vlr.toString());
    this.reg_abo.tabla.vlr_ser[5].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[5].vlr.toString());

    this.codigo_barras = `${this.reg_fact.cat}${format_op(this.reg_abo.tabla.vlr_abo).toString().padStart(7, "0")}${this.reg_fact.llave}`;

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
      pageMargins: [20, 145, 20, 40],
      images: { logo: rutaLogos(parseInt($_USUARIO_EMPRESA.NIT)) },
      codigo_barras: { cod_barras: { text: this.codigo_barras, options: { width: 1, height: 70, displayValue: false } } },
      header: () => {
        return {
          margin: [20, 20, 20, 0],
          stack: [
            {
              style: "left8",
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
                        { text: "REPUBLICA DE COLOMBIA" },
                        { text: `DEPARTAMENTO DEL ${$_USUARIO_EMPRESA.DPTO}` },
                        { text: $_USUARIO_EMPRESA.NOMBRE },
                        {
                          text: `NIT ${new Intl.NumberFormat("ja-JP").format($_USUARIO_EMPRESA.NIT)}-${
                            $_USUARIO_EMPRESA.DV
                          }`,
                          marginTop: 4,
                        },
                      ],
                      width: "60%",
                      border: [false, true, false, true],
                    },
                    {
                      text: "",
                      width: "20%",
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
                            { text: "FACTURA: ", bold: true, width: "9%" },
                            { text: new Intl.NumberFormat("ja-JP").format(this.reg_fact.llave), width: "37%" },
                            { text: "FECHA: ", width: "7%", bold: true },
                            { text: _editarFecha(`${this.reg_abo.fecha.ano}${this.reg_abo.fecha.mes}${this.reg_abo.fecha.dia}`).toUpperCase(), width: "15%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "PERIODO: ", width: "9%", bold: true },
                            { text: this.nom_fac_w, width: "37%" },
                            { text: "COD: ", width: "7%", bold: true },
                            { text: this.reg_fact.cat, width: "30%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "CONTRIB: ", width: "9%", bold: true },
                            { text: this.reg_fact.nombre, width: "37%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "DIRECCIÓN: ", width: "9%", bold: true },
                            { text: this.reg_fact.direcc, width: "48%" },
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
        marginTop: 2,
        style: "left9",
        columns: [
          {
            margin: [35, 10, 0, 0],
            stack: [
              {
                columns: [{ text: this.descripciones_serv.descrip_0, width: "46%" }, { text: "$", width: "8%" }, { text: this.reg_abo.tabla.vlr_ser[0].vlr, alignment: "right", width: "20%" }],
              },
              {
                marginTop: 3,
                columns: [{ text: this.descripciones_serv.descrip_1, width: "46%" }, { text: "$", width: "8%" }, { text: this.reg_abo.tabla.vlr_ser[1].vlr, alignment: "right", width: "20%" }],
              },
              {
                marginTop: 3,
                columns: [{ text: this.descripciones_serv.descrip_2, width: "46%" }, { text: "$", width: "8%" }, { text: this.reg_abo.tabla.vlr_ser[2].vlr, alignment: "right", width: "20%" }],
              },
              {
                marginTop: 3,
                columns: [{ text: this.descripciones_serv.descrip_3, width: "46%" }, { text: "$", width: "8%" }, { text: this.reg_abo.tabla.vlr_ser[3].vlr, alignment: "right", width: "20%" }],
              },
              {
                marginTop: 40,
                canvas: [
                  {
                    type: "line",
                    x1: 110,
                    x2: 190,
                    y1: 0,
                    y2: 0,
                    lineWidth: 1,
                    color: "gray",
                  },
                ],
              },
              {
                marginTop: 3,
                columns: [{ text: "Total abono", bold: true, width: "46%" }, { text: "$", width: "8%" }, { text: this.reg_abo.tabla.vlr_abo, bold: true, alignment: "right", width: "20%" }],
              },
            ],
          },
          {
            text: "",
            width: "1%",
          },
          {
            margin: [0, 25, 0, 0],
            stack: [
              {
                marginTop: 78,
                canvas: [
                  {
                    type: "line",
                    x1: 70,
                    x2: 200,
                    y1: 0,
                    y2: 0,
                    lineWidth: 1,
                    color: "gray",
                  },
                ],
              },
              {
                alignment: "center",
                marginTop: 3,
                text: "Sello y firma del cajero",
                bold: true,
              },
            ],
          },
        ],
      },
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: -116,
            h: 125,
            w: 555,
          },
        ],
      },
      {
        margin: [5, 5, 0, 0],
        text: "El presente recibo no es valido sin el sello y firma del cajero",
        style: "left9",
      },
      {
        marginTop: 10,
        marginLeft: 5,
        style: "left8",
        columns: [
          {
            width: "40%",
            stack: [
              {
                text: "EMPRESA MUNICIPAL DE SERVICIOS PUBLICOS DE OROCUE",
                bold: true,
              },
              {
                marginTop: 3,
                columns: [
                  { text: this.descripciones_serv.descrip_0, width: "65%", bold: true },
                  { text: "$", width: "5%" },
                  { text: this.reg_abo.tabla.vlr_ser[0].vlr, alignment: "right", width: "25%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: this.descripciones_serv.descrip_1, width: "65%", bold: true },
                  { text: "$", width: "5%" },
                  { text: this.reg_abo.tabla.vlr_ser[1].vlr, alignment: "right", width: "25%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: this.descripciones_serv.descrip_2, width: "65%", bold: true },
                  { text: "$", width: "5%" },
                  { text: this.reg_abo.tabla.vlr_ser[2].vlr, alignment: "right", width: "25%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: this.descripciones_serv.descrip_3, width: "65%", bold: true },
                  { text: "$", width: "5%" },
                  { text: this.reg_abo.tabla.vlr_ser[3].vlr, alignment: "right", width: "25%" },
                ],
              },
              {
                fontSize: 12,
                bold: true,
                marginTop: 20,
                columns: [
                  { text: "TOTAL ABONO:", width: "65%" },
                  { text: "$", width: "5%" },
                  { text: this.reg_abo.tabla.vlr_abo, alignment: "right", width: "25%" },
                ],
              },
            ],
          },
          {
            text: "",
            width: "5%",
          },
          {
            width: "58%",
            stack: [
              {
                columns: [
                  { text: "FACTURA:", width: "15%" },
                  { text: new Intl.NumberFormat("ja-JP").format(this.reg_fact.llave), width: "35%", bold: true },
                ],
              },
              {
                text: " ",
              },
              {
                marginTop: 6,
                columns: [
                  { text: "PERIODO:", width: "15%" },
                  { text: this.nom_fac_w, width: "35%" },
                  { text: "ESTRATO:", width: "15%" },
                  { text: this.reg_fact.est, width: "25%" },
                ],
              },
              {
                text: " ",
              },
              {
                marginTop: 6,
                columns: [
                  { text: "CODIGO:", width: "15%" },
                  { text: this.reg_fact.cat, width: "25%" },
                ],
              },
              {
                marginTop: 22,
                columns: [
                  { text: "NOMBRE:", width: "15%" },
                  { text: this.reg_fact.nombre, width: "85%" },
                ],
              },
            ],
          },
        ],
      },
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: -97,
            h: 72,
            w: 555,
          },
        ],
      },
      {
        stack: [
          {
            margin: [5, 10, 0, 0],
            image: "cod_barras",
            width: 240,
            height: 70,
            alignment: "center",
          },
          {
            marginTop: -5,
            text: this.codigo_barras,
            style: "center9Bold"
          },
        ],
      },
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: -102,
            h: 113,
            w: 555,
          },
        ],
      },
    ];
  }
}

const imprimir_PUB206A = async (params) => {
  var formato = new formato_PUB206A(params);
  formato._init();
};

module.exports = {
  imprimir_PUB206A,
};
