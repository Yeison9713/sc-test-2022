// Impresion de un comprobante pago parcial - David.M - 20-07-2021

const {
  styles_imp,
  _editarFecha,
  format_op,
  mascara_valor,
  rutaLogos,
} = require("../../../../SERVDOM/scripts/globalDom");
const { regs_dom } = require("../../../../SERVDOM/scripts/regs_dom");

class formato_PUB206A {
  constructor(params) {
    this.nom_fac_w = "";
    this.callback = params.callback;
    this.callback_err = params.callback_err;
    this.array_usuar_ser = params.array_usuar_ser;
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

  datosUsuario() {
    switch (parseInt(this.reg_ctl.periodo[0].mes_per)) {
      case 1:
        this.periodo_edit = `ENE 1 A ENE 31 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      case 2:
        this.periodo_edit = `FEB 1 A FEB 28 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      case 3:
        this.periodo_edit = `MAR 1 A MAR 31 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      case 4:
        this.periodo_edit = `ABR 1 A ABR 30 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      case 5:
        this.periodo_edit = `MAY 1 A MAY 31 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      case 6:
        this.periodo_edit = `JUN 1 A JUN 30 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      case 7:
        this.periodo_edit = `JUL 1 A JUL 31 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      case 8:
        this.periodo_edit = `AGT 1 A AGT 31 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      case 9:
        this.periodo_edit = `SEP 1 A SEP 30 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      case 10:
        this.periodo_edit = `OCT 1 A OCT 31 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      case 11:
        this.periodo_edit = `NOV 1 A NOV 30 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      case 12:
        this.periodo_edit = `DIC 1 A DIC 31 /${this.reg_ctl.periodo[0].ano_per}`;
        break;
      default:
        this.periodo_edit = "";
        break;
    }

    this.llenarFactura();
  }

  async llenarFactura() {
    await this.totalizarServicios();

    await this.sumarAbono();

    await this.calcularNeto();

    this.tabla_serv_w[0].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
      this.tabla_serv_w[0].tabla_tot_w[1].tot_serv_w.toString()
    );
    this.tabla_serv_w[1].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
      this.tabla_serv_w[1].tabla_tot_w[1].tot_serv_w.toString()
    );
    this.tabla_serv_w[2].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
      this.tabla_serv_w[2].tabla_tot_w[1].tot_serv_w.toString()
    );
    this.tabla_serv_w[3].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
      this.tabla_serv_w[3].tabla_tot_w[1].tot_serv_w.toString()
    );
    this.tabla_serv_w[4].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
      this.tabla_serv_w[4].tabla_tot_w[1].tot_serv_w.toString()
    );
    this.tabla_serv_w[5].tabla_tot_w[1].tot_serv_w = mascara_valor.resolve(
      this.tabla_serv_w[5].tabla_tot_w[1].tot_serv_w.toString()
    );

    this.tot_tot_w =
      format_op(this.reg_abo.tabla.vlr_ser[0].vlr) +
      format_op(this.reg_abo.tabla.vlr_ser[1].vlr) +
      format_op(this.reg_abo.tabla.vlr_ser[2].vlr) +
      format_op(this.reg_abo.tabla.vlr_ser[3].vlr) +
      format_op(this.reg_abo.tabla.vlr_ser[4].vlr) +
      format_op(this.reg_abo.tabla.vlr_ser[5].vlr);

    this.tot_tot_w = mascara_valor.resolve(this.tot_tot_w.toString());

    if (this.tot_refinan_w == 0) {
      this.tot_refinan_w = "";
    } else {
      this.tot_refinan_w = mascara_valor.resolve(this.tot_refinan_w.toString());
    }

    this.reg_abo.tabla.vlr_ser[0].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[0].vlr.toString());
    this.reg_abo.tabla.vlr_ser[1].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[1].vlr.toString());
    this.reg_abo.tabla.vlr_ser[2].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[2].vlr.toString());
    this.reg_abo.tabla.vlr_ser[3].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[3].vlr.toString());
    this.reg_abo.tabla.vlr_ser[4].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[4].vlr.toString());
    this.reg_abo.tabla.vlr_ser[5].vlr = mascara_valor.resolve(this.reg_abo.tabla.vlr_ser[5].vlr.toString());

    this.codigo_barras = `415${"0000900251955"}8020${this.reg_abo.fecha.dia}${this.reg_fact.llave}3900${format_op(
      this.tot_tot_w
    )}96${this.reg_ctl.fecha_vence}`;

    this.codigo_barras_text = `(415)${"0000900251955"}(8020)${this.reg_abo.fecha.dia}${this.reg_fact.llave}(3900)${format_op(
      this.tot_tot_w
    )}(96)${this.reg_ctl.fecha_vence}`;

    this.imprimir();
  }

  totalizarServicios() {
    return new Promise((resolve) => {
      for (let serv_w = 0; serv_w < 6; serv_w++) {
        this.tabla_serv_w[serv_w].tabla_tot_w[0].tot_serv_w =
          format_op(this.reg_fact.tabla.serv_tab[serv_w].sub_tot) +
          format_op(this.reg_fact.tabla.serv_tab[serv_w].sdo_ant) +
          format_op(this.reg_fact.tabla.serv_tab[serv_w].int_ant) +
          format_op(this.reg_fact.tabla.serv_tab[serv_w].int_mes) +
          format_op(this.reg_fact.tabla.serv_tab[serv_w].ajustes) +
          format_op(this.reg_fact.tabla.serv_tab[serv_w].refinanc_mes);

        this.cargos_w = format_op(this.cargos_w) + format_op(this.tabla_serv_w[serv_w].tabla_tot_w[0].tot_serv_w);

        if (serv_w == 5) resolve();
      }
    });
  }

  sumarAbono() {
    return new Promise((resolve) => {
      this.total_abonos_w = 0;
      for (let i = 0; i < 5; i++) {
        this.total_abonos_w = format_op(this.total_abonos_w) + format_op(this.reg_fact.tabla.datos_abon[i].tot_abon);
        this.tabla_serv_w[i].abo_serv_w =
          format_op(this.tabla_serv_w[i].abo_serv_w) +
          format_op(this.reg_fact.tabla.datos_abon[i].abonos_ser[i].abono_ser);

        if (i == 4) {
          this.tabla_serv_w[5].abo_serv_w =
            format_op(this.tabla_serv_w[5].abo_serv_w) +
            format_op(this.reg_fact.tabla.datos_abon[i].abonos_ser[5].abono_ser);

          resolve();
        }
      }
    });
  }

  calcularNeto() {
    return new Promise((resolve) => {
      for (let serv_w = 0; serv_w < 6; serv_w++) {
        this.tabla_serv_w[serv_w].tabla_tot_w[1].tot_serv_w =
          format_op(this.tabla_serv_w[serv_w].tabla_tot_w[0].tot_serv_w) -
          format_op(this.tabla_serv_w[serv_w].abo_serv_w);

        this.tot_refinanc_w =
          format_op(this.tot_refinanc_w) + format_op(this.reg_fact.tabla.serv_tab[serv_w].refinanc_sdo);

        if (format_op(this.reg_fact.tabla.serv_tab[serv_w].nro_cta) > 0 && this.cuotas_ref_w == 0) {
          this.cuotas_ref_w = this.reg_fact.tabla.serv_tab[serv_w].nro_cta;
        }

        if (serv_w == 5) resolve();
      }
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
      images: { logo: rutaLogos($_USUARIO_EMPRESA.NIT) },
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
                            { text: "FACTURA: ", bold: true, width: "8%" },
                            { text: new Intl.NumberFormat("ja-JP").format(this.reg_fact.llave), width: "17%" },
                            { text: "FECHA FACT: ", width: "10%", bold: true },
                            { text: _editarFecha(this.reg_ctl.fecha_exp).toUpperCase(), width: "15%" },
                            { text: "FECHA VENCE: ", width: "11%", bold: true },
                            {
                              text: _editarFecha(
                                `${this.reg_abo.fecha.ano}${this.reg_abo.fecha.mes}${this.reg_abo.fecha.dia}`
                              ).toUpperCase(),
                              width: "14%",
                            },
                            { text: "SUSPENSIÓN: ", width: "11%", bold: true },
                            { text: "", width: "14%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "PERIODO: ", width: "8%", bold: true },
                            { text: this.periodo_edit, width: "17%" },
                            { text: "TARIFA: ", width: "6%", bold: true },
                            { text: this.reg_fact.est, width: "19%" },
                            { text: "NUIU: ", width: "5%", bold: true },
                            { text: this.reg_fact.cat, width: "30%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "Usuario: ", width: "8%", bold: true },
                            { text: this.reg_fact.nombre, width: "37%" },
                            { text: "Dirección: ", width: "10%", bold: true },
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
        style: "left8",
        columns: [
          {
            width: "33%",
            table: {
              widths: ["55%", "45%"],
              heights: [10, 40, 40, 50, 10],
              body: [
                [
                  { text: "ACUEDUCTO" },
                  { text: `Tarifa: ${this.reg_fact.tabla.serv_tab[0].datos_tab[0].conc}`, alignment: "right" },
                ],
                [
                  { text: "Periodo", marginTop: 5 },
                  {
                    text: `${this.reg_fact.tabla.serv_tab[0].datos_tab[0].ano} ${this.reg_fact.tabla.serv_tab[0].datos_tab[0].mes}`,
                    alignment: "right",
                    marginTop: 5,
                  },
                ],
                [
                  { text: "ABONO PARCIAL", width: "75%" },
                  { text: "", alignment: "right" },
                ],
                [
                  { text: "Vlr Facturado", width: "75%" },
                  { text: this.tabla_serv_w[0].tabla_tot_w[1].tot_serv_w, alignment: "right" },
                ],
                [
                  { text: "TOTAL ACUEDUCTO", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[0].vlr, alignment: "right", bold: true },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 5) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
            },
          },
          {
            text: "",
            width: "1%",
          },
          {
            width: "33%",
            table: {
              widths: ["55%", "45%"],
              heights: [10, 40, 40, 50, 10],
              body: [
                [
                  { text: "ENERGIA" },
                  { text: `Tarifa: ${this.reg_fact.tabla.serv_tab[4].datos_tab[0].conc}`, alignment: "right" },
                ],
                [
                  { text: "Periodo", marginTop: 5 },
                  {
                    text: `${this.reg_fact.tabla.serv_tab[4].datos_tab[0].ano} ${this.reg_fact.tabla.serv_tab[4].datos_tab[0].mes}`,
                    alignment: "right",
                    marginTop: 5,
                  },
                ],
                [
                  { text: "ABONO PARCIAL", width: "75%" },
                  { text: "", alignment: "right" },
                ],
                [
                  { text: "Vlr Facturado", width: "75%" },
                  { text: this.tabla_serv_w[4].tabla_tot_w[1].tot_serv_w, alignment: "right" },
                ],
                [
                  { text: "TOTAL ENERGIA", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[4].vlr, alignment: "right", bold: true },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 5) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
            },
          },
          {
            text: "",
            width: "1%",
          },
          {
            width: "32%",
            table: {
              widths: ["55%", "45%"],
              heights: [10, 40, 40, 50, 10],
              body: [
                [
                  {
                    colSpan: 2,
                    columns: [
                      { text: "GAS NATURAL DOMICIALIARIO", width: "70%" },
                      { text: `Tarifa: ${this.reg_fact.tabla.serv_tab[5].datos_tab[0].conc}`, alignment: "right" },
                    ],
                  },
                  {},
                ],
                [
                  { text: "Periodo", marginTop: 5 },
                  {
                    text: `${this.reg_fact.tabla.serv_tab[5].datos_tab[0].ano} ${this.reg_fact.tabla.serv_tab[5].datos_tab[0].mes}`,
                    alignment: "right",
                    marginTop: 5,
                  },
                ],
                [
                  { text: "ABONO PARCIAL", width: "75%" },
                  { text: "", alignment: "right" },
                ],
                [
                  { text: "Vlr Facturado", width: "75%" },
                  { text: this.tabla_serv_w[5].tabla_tot_w[1].tot_serv_w, alignment: "right" },
                ],
                [
                  { text: "TOTAL GAS", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[5].vlr, alignment: "right", bold: true },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 5) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
            },
          },
        ],
      },
      {
        marginTop: 10,
        style: "left8",
        columns: [
          {
            width: "33%",
            table: {
              widths: ["55%", "45%"],
              heights: [10, 40, 40, 50, 10],
              body: [
                [
                  { text: "ASEO" },
                  { text: `Tarifa: ${this.reg_fact.tabla.serv_tab[2].datos_tab[0].conc}`, alignment: "right" },
                ],
                [
                  { text: "Periodo", marginTop: 5 },
                  {
                    text: `${this.reg_fact.tabla.serv_tab[2].datos_tab[0].ano} ${this.reg_fact.tabla.serv_tab[2].datos_tab[0].mes}`,
                    alignment: "right",
                    marginTop: 5,
                  },
                ],
                [
                  { text: "ABONO PARCIAL", width: "75%" },
                  { text: "", alignment: "right" },
                ],
                [
                  { text: "Vlr Facturado", width: "75%" },
                  { text: this.tabla_serv_w[2].tabla_tot_w[1].tot_serv_w, alignment: "right" },
                ],
                [
                  { text: "TOTAL ASEO", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[2].vlr, alignment: "right", bold: true },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 5) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
            },
          },
          {
            text: "",
            width: "1%",
          },
          {
            width: "33%",
            table: {
              widths: ["60%", "40%"],
              heights: [10, 40, 40, 50, 10],
              body: [
                [
                  { text: "ALCANTARILLADO" },
                  { text: `Tarifa: ${this.reg_fact.tabla.serv_tab[1].datos_tab[0].conc}`, alignment: "right" },
                ],
                [
                  { text: "Periodo", marginTop: 5 },
                  {
                    text: `${this.reg_fact.tabla.serv_tab[1].datos_tab[0].ano} ${this.reg_fact.tabla.serv_tab[1].datos_tab[0].mes}`,
                    alignment: "right",
                    marginTop: 5,
                  },
                ],
                [
                  { text: "ABONO PARCIAL", width: "75%" },
                  { text: "", alignment: "right" },
                ],
                [
                  { text: "Vlr Facturado", width: "75%" },
                  { text: this.tabla_serv_w[1].tabla_tot_w[1].tot_serv_w, alignment: "right" },
                ],
                [
                  { text: "TOTAL ALCANTARILLADO", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[1].vlr, alignment: "right", bold: true },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 5) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
            },
          },
          {
            text: "",
            width: "1%",
          },
          {
            width: "32%",
            table: {
              widths: ["55%", "46%"],
              heights: [10, 40, 40, 50, 10],
              body: [
                [
                  { text: "ALUMBRADO PUBLICO" },
                  { text: `Tarifa: ${this.reg_fact.tabla.serv_tab[3].datos_tab[0].conc}`, alignment: "right" },
                ],
                [
                  { text: "Periodo", marginTop: 5 },
                  {
                    text: `${this.reg_fact.tabla.serv_tab[3].datos_tab[0].ano} ${this.reg_fact.tabla.serv_tab[1].datos_tab[0].mes}`,
                    alignment: "right",
                    marginTop: 5,
                  },
                ],
                [
                  { text: "ABONO PARCIAL", width: "75%" },
                  { text: "", alignment: "right" },
                ],
                [
                  { text: "Vlr Facturado", width: "75%" },
                  { text: this.tabla_serv_w[3].tabla_tot_w[1].tot_serv_w, alignment: "right" },
                ],
                [
                  { text: "TOTAL ALUMBRADO", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[3].vlr, alignment: "right", bold: true },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 5) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
            },
          },
        ],
      },
      {
        marginTop: 7,
        style: "left8",
        stack: [
          {
            bold: true,
            marginLeft: 5,
            columns: [
              {},
              {
                marginTop: 5,
                alignment: "right",
                fontSize: 12,
                columns: [
                  { text: "TOTAL FACTURA: ", width: "60%", bold: true, alignment: "right" },
                  { text: this.tot_tot_w, width: "40%", bold: true, alignment: "right", marginRight: 15 },
                ],
              },
            ],
          },
          {
            margin: [5, 10, 0, 0],
            bold: true,
            text: "La presente factura presta merito ejecutivo de conformidad con el art 130 ley 142/1994",
          },
        ],
      },
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: -37,
            h: 50,
            w: 555,
          },
        ],
      },
      {
        marginTop: 10,
        marginLeft: 5,
        style: "left8",
        columns: [
          {
            width: "37%",
            stack: [
              {
                text: "EMPRESA MUNICIPAL DE SERVICIOS PUBLICOS DE OROCUE",
                bold: true,
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Acueducto:", width: "50%", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[0].vlr, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Energia electrica:", width: "50%", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[4].vlr, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Aseo:", width: "50%", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[2].vlr, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Alcantarillado:", width: "50%", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[1].vlr, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Gas domiciliario:", width: "50%", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[5].vlr, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Alumbrado publico:", width: "50%", bold: true },
                  { text: this.reg_abo.tabla.vlr_ser[3].vlr, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Total servicios:", width: "50%", bold: true },
                  { text: this.tot_tot_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Saldo anterior:", width: "50%", bold: true },
                  { text: "", alignment: "right", width: "45%" },
                ],
              },
              {
                fontSize: 12,
                bold: true,
                marginTop: 8,
                columns: [
                  { text: "TOTAL ABONADO:", width: "50%" },
                  { text: this.tot_tot_w, alignment: "right", width: "45%" },
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
                text: " ",
              },
              {
                marginTop: 3,
                columns: [
                  { text: "FACTURA:", width: "15%" },
                  { text: new Intl.NumberFormat("ja-JP").format(this.reg_fact.llave), width: "35%", bold: true },
                  { text: "FECHA:", width: "15%" },
                  { text: _editarFecha(this.reg_ctl.fecha_exp).toUpperCase(), width: "25%", bold: true },
                ],
              },
              {
                text: " ",
              },
              {
                marginTop: 6,
                columns: [
                  { text: "PERIODO:", width: "15%" },
                  { text: this.periodo_edit, width: "35%" },
                  { text: "TARIFA:", width: "15%" },
                  { text: this.reg_fact.est, width: "25%" },
                ],
              },
              {
                text: " ",
              },
              {
                marginTop: 6,
                columns: [
                  { text: "VENCE:", width: "15%" },
                  { text: _editarFecha(this.reg_ctl.fecha_vence).toUpperCase(), width: "35%" },
                  { text: "CODIGO:", width: "15%" },
                  { text: this.reg_fact.cat, width: "25%" },
                ],
              },
              {
                text: " ",
              },
              {
                marginTop: 6,
                columns: [
                  { text: "NOMBRE:", width: "15%" },
                  { text: this.reg_fact.nombre, width: "85%" },
                ],
              },
              {
                stack: [
                  {
                    margin: [0, 10, 0, 0],
                    image: "cod_barras",
                    width: 250,
                    height: 50,
                    alignment: "center"
                  },
                ],
              },
              {
                marginTop: -5,
                text: this.codigo_barras_text,
                style: "center8Bold"
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
            y: -163,
            h: 167,
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
