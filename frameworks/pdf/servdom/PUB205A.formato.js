const { styles_imp, _editarFecha, format_op, mascara_valor, rutaLogos } = require("../../../SERVDOM/scripts/globalDom");
const { regs_dom } = require("../../../SERVDOM/scripts/regs_dom");

// David.M - 11-11-2021 - Se agregan condiciones por NIT para Villanueva

class formato_PUB205A {
  constructor(params) {
    this.nro_fact_w = params.nro_fact_w;
    this.nom_fac_w = params.nom_fac_w;
    this.admin_w = params.admin_w;
    this.callback = params.callback;
    this.array_serv = params.array_serv;
    this.array_usuar_ser = params.array_usuar_ser;
    this.array_tarifas = params.array_tarifas;
    this.reg_tar = {};
    this.tabla = {
      tarifa: "",
      titulos: [],
      cargo_per: [],
      saldo_ant: [],
      intereses: [],
      ajustes: [],
      totales: [],
    };
    this.tot_tot_w = 0;
    this.codigo_barras = "";
    this.masiva = params.masiva || null;
    this.reg_fact = params.reg_fact || null;
    this.reg_ctl = params.reg_ctl || null;
    this.reg_usuar_ser = params.reg_usuar_ser || {};
  }

  _init() {
    if (this.masiva == true) this.llenarNombreServ();
    else this.leerFact();
  }

  leerFact() {
    loader("show");
    postData(
      { datosh: moduloDatosEnvio() + "1|", fecha: this.nom_fac_w, nro_fac: this.nro_fact_w },
      get_url("app/SERVDOM/PUB203_02.DLL")
    )
      .then((data) => {
        this.reg_fact = data;
        console.log(data, "FACT");
        this.leerCtl();
      })
      .catch((error) => {
        console.error(error);
        loader("hide");
        if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "");
        this.callback();
      });
  }

  leerCtl() {
    postData({ datosh: moduloDatosEnvio() + this.nom_fac_w + "|1|" }, get_url("app/SERVDOM/PUB201_01.DLL"))
      .then((data) => {
        this.reg_ctl = data;
        console.log(data, "CTL");
        loader("hide");
        if (!this.reg_ctl.llave) {
          CON851("", "No se encontro Registro Control", null, "error", "Error");
          this.callback();
        } else this.llenar_enc();
      })
      .catch((error) => {
        console.error(error);
        loader("hide");
        if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "");
        this.callback();
      });
  }

  llenar_enc() {
    this.llenarNombreServ();
  }

  llenarNombreServ() {
    for (let i = 0; i < 4; i++) {
      let busqueda = this.array_serv.find((e) => e.cod == parseInt(i) + 1);
      this.tabla.titulos.push(busqueda ? busqueda.descrip : "");
    }

    this.codigo_barras = `${this.reg_fact.cat}0000000${this.reg_fact.llave}`;

    this.leerFacturas();
  }

  leerFacturas() {
    let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.reg_fact.cat);
    if (!busqueda) {
      this.reg_fact.nombre = "******************************";
      this.reg_fact.direcc = "";
    } else {
      this.reg_fact.nombre = busqueda.NOMBRE;
      if (busqueda.DOC_ID) this.reg_fact.doc_id_pub = busqueda.DOC_ID;
    }

    this.llenarFactura();
  }

  async llenarFactura() {
    await this.leerTarifas();

    let tot_tot_w = 0;

    tot_tot_w =
      format_op(this.reg_fact.tabla.serv_tab[0].sub_tot) +
      format_op(this.reg_fact.tabla.serv_tab[1].sub_tot) +
      format_op(this.reg_fact.tabla.serv_tab[2].sub_tot) +
      format_op(this.reg_fact.tabla.serv_tab[3].sub_tot) +
      format_op(this.reg_fact.tabla.serv_tab[4].sub_tot) +
      format_op(this.reg_fact.tabla.serv_tab[5].sub_tot) +
      format_op(this.reg_fact.tabla.serv_tab[0].sdo_ant) +
      format_op(this.reg_fact.tabla.serv_tab[1].sdo_ant) +
      format_op(this.reg_fact.tabla.serv_tab[2].sdo_ant) +
      format_op(this.reg_fact.tabla.serv_tab[3].sdo_ant) +
      format_op(this.reg_fact.tabla.serv_tab[4].sdo_ant) +
      format_op(this.reg_fact.tabla.serv_tab[5].sdo_ant) +
      format_op(this.reg_fact.tabla.serv_tab[0].int_ant) +
      format_op(this.reg_fact.tabla.serv_tab[1].int_ant) +
      format_op(this.reg_fact.tabla.serv_tab[2].int_ant) +
      format_op(this.reg_fact.tabla.serv_tab[3].int_ant) +
      format_op(this.reg_fact.tabla.serv_tab[4].int_ant) +
      format_op(this.reg_fact.tabla.serv_tab[5].int_ant) +
      format_op(this.reg_fact.tabla.serv_tab[0].int_mes) +
      format_op(this.reg_fact.tabla.serv_tab[1].int_mes) +
      format_op(this.reg_fact.tabla.serv_tab[2].int_mes) +
      format_op(this.reg_fact.tabla.serv_tab[3].int_mes) +
      format_op(this.reg_fact.tabla.serv_tab[4].int_mes) +
      format_op(this.reg_fact.tabla.serv_tab[5].int_mes) +
      format_op(this.reg_fact.tabla.serv_tab[0].ajustes) +
      format_op(this.reg_fact.tabla.serv_tab[1].ajustes) +
      format_op(this.reg_fact.tabla.serv_tab[2].ajustes) +
      format_op(this.reg_fact.tabla.serv_tab[3].ajustes) +
      format_op(this.reg_fact.tabla.serv_tab[4].ajustes) +
      format_op(this.reg_fact.tabla.serv_tab[5].ajustes) +
      format_op(this.reg_fact.tabla.serv_tab[0].refinanc_mes) +
      format_op(this.reg_fact.tabla.serv_tab[1].refinanc_mes) +
      format_op(this.reg_fact.tabla.serv_tab[2].refinanc_mes) +
      format_op(this.reg_fact.tabla.serv_tab[3].refinanc_mes) +
      format_op(this.reg_fact.tabla.serv_tab[4].refinanc_mes) +
      format_op(this.reg_fact.tabla.serv_tab[5].refinanc_mes);

    this.tot_tot_w = mascara_valor.resolve(tot_tot_w.toString());

    this.imprimir();
  }

  async imprimir() {
    await _impresion2({
      tipo: "pdf",
      archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmss")}.pdf`,
      content: this.format(),
      retornar: this.masiva == true ? true : false,
    })
      .then((data) => {
        this.callback(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async leerTarifas() {
    let llave_w = "";
    let busqueda = null;

    for (let i = 0; i < 4; i++) {
      let y = 0;
      let tot_ant_w = 0;
      let tot_ser_w = 0;

      if (i == 0) {
        this.tabla.tarifa = this.reg_fact.tabla.serv_tab[i].datos_tab[0].conc;
      }

      y = parseInt(this.reg_ctl.periodo[0].mes_per) || 0;
      llave_w = `${this.reg_fact.tabla.serv_tab[i].datos_tab[0].ano}${this.reg_fact.tabla.serv_tab[i].datos_tab[0].conc}`;
      busqueda = this.array_tarifas.find((e) => (e.llave = llave_w));

      if (!busqueda) {
        this.reg_tar = regs_dom.TARIF();
        this.reg_tar.tabla[parseInt(y) - 1].car_fijo = this.reg_fact.tabla.serv_tab[i].datos_tab[0].vlr;
        this.reg_tar.medic = "N";
      } else {
        this.reg_tar = Object.assign({}, busqueda);
      }

      this.tabla.cargo_per.push(mascara_valor.resolve(this.reg_fact.tabla.serv_tab[i].sub_tot.toString()));

      let anterior_w =
        format_op(this.reg_fact.tabla.serv_tab[i].sdo_ant) + format_op(this.reg_fact.tabla.serv_tab[i].int_ant);

      this.tabla.saldo_ant.push(mascara_valor.resolve(anterior_w.toString()));

      tot_ant_w += format_op(anterior_w);

      this.tabla.intereses.push(mascara_valor.resolve(this.reg_fact.tabla.serv_tab[i].int_mes.toString()));

      this.tabla.ajustes.push(mascara_valor.resolve(this.reg_fact.tabla.serv_tab[i].ajustes.toString()));

      tot_ser_w =
        format_op(this.reg_fact.tabla.serv_tab[i].datos_tab[0].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[i].datos_tab[1].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[i].datos_tab[2].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[i].datos_tab[3].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[i].datos_tab[4].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[i].int_mes) +
        format_op(this.reg_fact.tabla.serv_tab[i].ajustes) +
        format_op(this.reg_fact.tabla.serv_tab[i].refinanc_mes);

      tot_ser_w += format_op(this.reg_fact.tabla.serv_tab[i].sdo_ant);
      tot_ser_w += format_op(this.reg_fact.tabla.serv_tab[i].int_ant);

      this.tabla.totales.push(mascara_valor.resolve(tot_ser_w.toString()));
    }
  }

  format() {
    return {
      pageMargins: [20, 140, 30, 60],
      images: { logo: rutaLogos(parseInt($_USUARIO_EMPRESA.NIT)) },
      codigo_barras: { cod_barras: { text: this.codigo_barras, options: { width: 1, height: 50, fontSize: 10 } } },
      header: () => {
        return {
          margin: [30, 20, 30, 0],
          stack: [
            {
              style: "left9",
              table: {
                widths: ["25%", "50%", "25%"],
                heights: [60, 50],
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
                        $_USUARIO_EMPRESA.DPTO ? { text: `DEPARTAMENTO DEL ${$_USUARIO_EMPRESA.DPTO}` } : null,
                        { text: $_USUARIO_EMPRESA.NOMBRE },
                        {
                          text: `NIT ${new Intl.NumberFormat("ja-JP").format($_USUARIO_EMPRESA.NIT)}-${
                            $_USUARIO_EMPRESA.DV
                          }`,
                        },
                        parseInt($_USUARIO_EMPRESA.NIT) == 892099475 ? { text: "FACTURA ALUMBRADO PÚBLICO" } : null,
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
                      marginTop: 4,
                      stack: [
                        {
                          columns: [
                            { text: "FACTURA: ", bold: true, width: "10%" },
                            { text: new Intl.NumberFormat("ja-JP").format(this.reg_fact.llave), width: "32%" },
                            { text: "FECHA: ", width: "7%" },
                            { text: _editarFecha(this.reg_ctl.fecha_exp).toUpperCase(), width: "20%" },
                            { text: "VENCE: ", width: "7%" },
                            { text: _editarFecha(this.reg_ctl.fecha_vence).toUpperCase(), width: "14%" },
                          ],
                        },
                        parseInt($_USUARIO_EMPRESA.NIT) == 892099475
                          ? {
                              columns: [
                                { text: "Periodo Gen: ", width: "10%" },
                                { text: `${this.nom_fac_w.slice(0, 4)}/${this.nom_fac_w.slice(4)}`, width: "32%" },
                                parseInt($_USUARIO_EMPRESA.NIT) != 892099475
                                  ? { text: `Cod: ${this.reg_fact.cat}`, width: "27%" }
                                  : {
                                      text: `Nit contrib: ${
                                        !isNaN(this.reg_fact.doc_id_pub)
                                          ? new Intl.NumberFormat("ja-JP").format(this.reg_fact.doc_id_pub)
                                          : this.reg_fact.doc_id_pub
                                      }`,
                                      width: "27%",
                                    },
                                { text: "Periodo Fact: ", width: "12%" },
                                { text: `${this.reg_fact.tabla.serv_tab[3].datos_tab[0].ano}/${this.reg_fact.tabla.serv_tab[3].datos_tab[0].mes}`, width: "22%" },
                              ],
                            }
                          : {
                              columns: [
                                { text: "Periodo: ", width: "10%" },
                                { text: `${this.nom_fac_w.slice(0, 4)}/${this.nom_fac_w.slice(4)}`, width: "32%" },
                                parseInt($_USUARIO_EMPRESA.NIT) != 892099475
                                  ? { text: `Cod: ${this.reg_fact.cat}`, width: "27%" }
                                  : {
                                      text: `Nit contrib: ${
                                        !isNaN(this.reg_fact.doc_id_pub)
                                          ? new Intl.NumberFormat("ja-JP").format(this.reg_fact.doc_id_pub)
                                          : this.reg_fact.doc_id_pub
                                      }`,
                                      width: "27%",
                                    },
                              ],
                            },
                        {
                          columns: [
                            { text: "Contrib: ", width: "10%" },
                            { text: this.reg_fact.nombre, width: "90%" },
                          ],
                        },
                        {
                          columns: [
                            { text: "Dirección: ", width: "10%" },
                            { text: this.reg_fact.direcc, width: "90%" },
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
          margin: [10, 0, 0, 0],
          stack: [
            {
              stack:
                parseInt($_USUARIO_EMPRESA.NIT) == 892099475 ? this.llenarFormato_villanueva() : this.llenarFormato(),
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
        marginTop: 5,
        fontSize: 9,
        alignment: "right",
        table: {
          widths: ["12%", "22%", "22%", "22%", "22%"],
          body: [
            [
              { text: `Tarifa: ${this.tabla.tarifa}`, alignment: "left" },
              { text: this.tabla.titulos[0] },
              { text: this.tabla.titulos[1] },
              { text: this.tabla.titulos[2] },
              { text: this.tabla.titulos[3] },
            ],
            [
              {
                text: "Cargo Periodo",
                alignment: "left",
              },
              { text: this.tabla.cargo_per[0] },
              { text: this.tabla.cargo_per[1] },
              { text: this.tabla.cargo_per[2] },
              { text: this.tabla.cargo_per[3] },
            ],
            [
              { text: "Saldo Anterior", alignment: "left" },
              { text: this.tabla.saldo_ant[0] },
              { text: this.tabla.saldo_ant[1] },
              { text: this.tabla.saldo_ant[2] },
              { text: this.tabla.saldo_ant[3] },
            ],
            [
              { text: "Intereses", alignment: "left" },
              { text: this.tabla.intereses[0] },
              { text: this.tabla.intereses[1] },
              { text: this.tabla.intereses[2] },
              { text: this.tabla.intereses[3] },
            ],
            [
              { text: "Ajustes", alignment: "left" },
              { text: this.tabla.ajustes[0] },
              { text: this.tabla.ajustes[1] },
              { text: this.tabla.ajustes[2] },
              { text: this.tabla.ajustes[3] },
            ],
            [
              { text: "TOTAL", bold: true, alignment: "left" },
              { text: this.tabla.totales[0], bold: true },
              { text: this.tabla.totales[1], bold: true },
              { text: this.tabla.totales[2], bold: true },
              { text: this.tabla.totales[3], bold: true },
            ],
            [
              { text: "" },
              { text: "" },
              { text: "" },
              { text: `TOTAL FACTURA: ${this.tot_tot_w}`, bold: true, alignment: "right", colSpan: 2, fontSize: 12 },
              { text: "" },
            ],
          ],
        },
        layout: {
          hLineWidth: function (i, node) {
            if (i == 0 || i == 7 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6) return 1;
            else return 0;
          },
          vLineWidth: function (i, node) {
            if (i == 0 || i == 5) return 1;
            else return 0;
          },
          hLineColor: function (i, node) {
            return i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 ? "gray" : "black";
          },
          fillColor: function (i, node, columnIndex) {
            return i == 1 || i == 3 || i == 5 ? "#E4E5E8" : "white";
          },
        },
      },
      {
        marginTop: 7,
        style: "left9",
        stack: [
          {
            marginLeft: 5,
            columns: [
              { text: $_USUARIO_EMPRESA.NOMBRE, width: "50%" },
              { text: "FACTURA: ", width: "9%" },
              { text: new Intl.NumberFormat("ja-JP").format(this.reg_fact.llave), width: "15%", bold: true },
              { text: "FECHA: ", width: "9%" },
              { text: _editarFecha(this.reg_ctl.fecha_exp).toUpperCase(), width: "15%", bold: true },
            ],
          },
          {
            marginLeft: 5,
            columns: [
              { text: this.tabla.titulos[0], width: "20%" },
              { text: this.tabla.cargo_per[0], width: "15%", alignment: "right", marginRight: 10 },
            ],
          },
          {
            marginLeft: 5,
            columns: [
              { text: this.tabla.titulos[1], width: "20%" },
              { text: this.tabla.cargo_per[1], width: "15%", alignment: "right", marginRight: 10 },
              { text: "", width: "15%" },
              { text: "PERIODO: ", width: "9%" },
              { text: `${this.nom_fac_w.slice(0, 4)}/${this.nom_fac_w.slice(4)}`, width: "15%" },
              { text: "ESTRATO: ", width: "9%" },
              { text: this.reg_fact.est, width: "15%" },
            ],
          },
          {
            marginLeft: 5,
            columns: [
              { text: this.tabla.titulos[2], width: "20%" },
              { text: this.tabla.cargo_per[2], width: "15%", alignment: "right", marginRight: 10 },
            ],
          },
          {
            marginLeft: 5,
            columns: [
              { text: this.tabla.titulos[3], width: "20%" },
              { text: this.tabla.cargo_per[3], width: "15%", alignment: "right", marginRight: 10 },
              { text: "", width: "15%" },
              { text: "VENCE: ", width: "9%" },
              { text: _editarFecha(this.reg_ctl.fecha_vence).toUpperCase(), width: "15%" },
              { text: "CODIGO: ", width: "9%" },
              { text: this.reg_fact.cat, width: "20%" },
            ],
          },
          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 5,
                x2: 535,
                y2: 5,
              },
            ],
          },
        ],
      },
      {
        marginTop: 7,
        style: "left9",
        stack: [
          {
            marginLeft: 5,
            columns: [
              { text: "TOTAL FACTURA: ", width: "17%", bold: true },
              { text: this.tot_tot_w, width: "15%", bold: true },
              { text: "NOMBRE: ", width: "9%" },
              { text: this.reg_fact.nombre, width: "59%" },
            ],
          },
          {
            margin: [6, 5, 0, 0],
            image: "cod_barras",
            width: 200,
            height: 45,
          },
          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 5,
                x2: 535,
                y2: 5,
              },
            ],
          },
        ],
      },
      {
        marginTop: 7,
        style: "center9",
        stack: [
          {
            text: this.reg_ctl.mensaje1 || " ",
          },
          {
            marginTop: 3,
            text: this.reg_ctl.mensaje2 || " ",
          },
          {
            marginTop: 3,
            text: this.reg_ctl.mensaje3 || " ",
          },
        ],
      },
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: -168,
            w: 535,
            h: 175,
            r: 0,
            lineWidth: 1,
            lineColor: "#000",
          },
        ],
      },
    ];
  }

  llenarFormato_villanueva() {
    return [
      {
        marginTop: 5,
        fontSize: 9,
        alignment: "right",
        table: {
          widths: ["12%", "22%", "22%", "22%", "22%"],
          body: [
            [
              { text: "Valor Mensual", alignment: "left" },
              { text: this.tabla.cargo_per[0] },
              { text: this.tabla.cargo_per[1] },
              { text: this.tabla.cargo_per[2] },
              { text: this.tabla.cargo_per[3] },
            ],
            [
              { text: "Saldo Anterior", alignment: "left" },
              { text: this.tabla.saldo_ant[0] },
              { text: this.tabla.saldo_ant[1] },
              { text: this.tabla.saldo_ant[2] },
              { text: this.tabla.saldo_ant[3] },
            ],
            [
              { text: "Intereses", alignment: "left" },
              { text: this.tabla.intereses[0] },
              { text: this.tabla.intereses[1] },
              { text: this.tabla.intereses[2] },
              { text: this.tabla.intereses[3] },
            ],
            [
              { text: "Devolución", alignment: "left" },
              { text: this.tabla.ajustes[0] },
              { text: this.tabla.ajustes[1] },
              { text: this.tabla.ajustes[2] },
              { text: this.tabla.ajustes[3] },
            ],
            [
              { text: "TOTAL", bold: true, alignment: "left" },
              { text: this.tabla.totales[0], bold: true },
              { text: this.tabla.totales[1], bold: true },
              { text: this.tabla.totales[2], bold: true },
              { text: this.tabla.totales[3], bold: true },
            ],
            [
              { text: "" },
              { text: "" },
              { text: "" },
              { text: `TOTAL FACTURA: ${this.tot_tot_w}`, bold: true, alignment: "right", colSpan: 2, fontSize: 12 },
              { text: "" },
            ],
          ],
        },
        layout: {
          hLineWidth: function (i, node) {
            if (i == 0 || i == 7 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6) return 1;
            else return 0;
          },
          vLineWidth: function (i, node) {
            if (i == 0 || i == 5) return 1;
            else return 0;
          },
          hLineColor: function (i, node) {
            return i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 ? "gray" : "black";
          },
          fillColor: function (i, node, columnIndex) {
            return i == 1 || i == 3 || i == 5 ? "#E4E5E8" : "white";
          },
        },
      },
      {
        marginTop: 7,
        style: "left9",
        stack: [
          {
            marginLeft: 5,
            columns: [
              { text: $_USUARIO_EMPRESA.NOMBRE, width: "50%" },
              { text: "FECHA: ", width: "9%" },
              { text: _editarFecha(this.reg_ctl.fecha_exp).toUpperCase(), width: "15%", bold: true },
            ],
          },
          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 5,
                x2: 535,
                y2: 5,
              },
            ],
          },
        ],
      },
      {
        marginTop: 7,
        style: "left9",
        stack: [
          {
            marginLeft: 5,
            columns: [
              { text: "TOTAL FACTURA: ", width: "17%", bold: true },
              { text: this.tot_tot_w, width: "15%", bold: true },
              { text: "NOMBRE: ", width: "9%" },
              { text: this.reg_fact.nombre, width: "59%" },
            ],
          },
          {
            marginLeft: 5,
            stack: [
              // {
              //   margin: [6, 5, 0, 0],
              //   image: "cod_barras",
              //   width: 200,
              //   height: 45,
              // },
              {
                marginTop: 5,
                text: "Cuenta de Ahorros Libreton",
                bold: true,
              },
              {
                marginTop: 2,
                text: [{ text: `N° Cuenta Bancaria:  `, bold: true }, { text: "950202754" }],
              },
              {
                marginTop: 2,
                fontSize: 7,
                text: "Pague a tiempo para evitar suspensión",
              },
            ],
          },
          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 5,
                x2: 535,
                y2: 5,
              },
            ],
          },
        ],
      },
      {
        marginTop: 7,
        style: "center9",
        stack: [
          {
            text: this.reg_ctl.mensaje1 || " ",
          },
          {
            marginTop: 3,
            text: this.reg_ctl.mensaje2 || " ",
          },
          {
            marginTop: 3,
            text: this.reg_ctl.mensaje3 || " ",
          },
        ],
      },
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: -124,
            w: 535,
            h: 134,
            r: 0,
            lineWidth: 1,
            lineColor: "#000",
          },
        ],
      },
    ];
  }
}

const imprimir_PUB205A = (params) => {
  var formato = new formato_PUB205A(params);
  formato._init();
};

module.exports = {
  imprimir_PUB205A,
};
