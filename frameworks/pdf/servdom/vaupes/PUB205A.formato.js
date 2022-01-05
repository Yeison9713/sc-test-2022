// Imprime una factura VAUPES

var Chart = require("chart.js");

const {
  styles_imp,
  _editarFecha,
  format_op,
  mascara7,
  mascara9,
  mascara4_cant,
  mascara_valor,
  rutaLogos,
  mascara11,
  _editarFechaMes,
} = require("../../../../SERVDOM/scripts/globalDom");
const { regs_dom } = require("../../../../SERVDOM/scripts/regs_dom");

class formato_PUB205A {
  constructor(params) {
    this.nro_fact_w = params.nro_fact_w;
    this.nom_fac_w = params.nom_fac_w;
    this.admin_w = params.admin_w;
    this.callback = params.callback;
    this.callback_err = params.callback_err;
    this.array_serv = params.array_serv;
    this.array_usuar_ser = params.array_usuar_ser;
    this.array_tarifas = params.array_tarifas;
    this.masiva = params.masiva || null;
    this.reg_fact = params.reg_fact || null;
    this.reg_ctl = params.reg_ctl || null;
    this.reg_usuar_ser = params.reg_usuar_ser || {};
    this.reg_tar = {};
    this.fecha_act = moment().format("YYYYMMDD");

    this.tabla = {
      serv3: {
        matriz: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      },
    };
    this.tabla_tar_w = [
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
      { vlr_tar: [0, 0, 0] },
    ];
    this.codigo_barras = "";

    this.mes1_cal = 0;
    this.mes2_cal = "";
    this.datos_graf = [];
    this.graf = "";
    this.estrato_l = null;
    this.sello_corte = null;
  }

  _init() {
    if (this.masiva == true) this.leerFacturas();
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

    this.buscarUltimoAbono();
  }

  buscarUltimoAbono() {
    postData(
      {
        datosh: moduloDatosEnvio() + this.nom_fac_w + "|" + this.reg_fact.cat + "|",
      },
      get_url("app/SERVDOM/PUB821.DLL")
    )
      .then((data) => {
        data = data.split("|");
        this.llave_ult_abo = data[0];
        this.vlr_ult_abo = data[1];
        this.vlr_ult_abo = mascara_valor.resolve(this.vlr_ult_abo.toString());
        this.llenarMatriz();
      })
      .catch((error) => {
        console.error(error);
        this.callback_err();
      });
  }

  async llenarMatriz() {
    await this.llenarEnergia();

    if (
      this.tabla_tar_w[9].vlr_tar[0] > 0 ||
      this.tabla_tar_w[9].vlr_tar[1] > 0 ||
      this.tabla_tar_w[9].vlr_tar[2] > 0
    ) {
      this.tabla.serv3.pago_oportuno_fecha = "INMEDIATO";
      this.tabla.serv3.pago_recargo_fecha = "INMEDIATO";
    } else {
      this.tabla.serv3.pago_oportuno_fecha = _editarFecha(this.reg_ctl.fecha_vence);
      this.tabla.serv3.pago_recargo_fecha = _editarFecha(this.reg_ctl.fecha_vence2);
    }

    if (this.tabla_tar_w[9].vlr_tar[0] > 0) {
      this.tabla.serv3.mora_w =
        (format_op(this.tabla_tar_w[9].vlr_tar[0]) - format_op(this.reg_fact.tabla.serv_tab[3].int_ant)) /
        (format_op(this.tabla_tar_w[6].vlr_tar[0]) + 0.1);
    } else {
      this.tabla.serv3.mora_w = 0;
    }

    this.tabla.serv3.mora_w = mascara_valor.resolve(this.tabla.serv3.mora_w.toString());

    if (this.reg_ctl.recargo == 0) {
      this.tabla.serv3.tot_recar_w = 0;
    } else {
      this.tabla.serv3.tot_recar_w = format_op(this.tabla.serv3.vlr_tot_w) + format_op(this.reg_ctl.recargo);
    }

    this.tabla.serv3.tot_recar_w = mascara_valor.resolve(this.tabla.serv3.tot_recar_w.toString());

    this.datosUsuario();
  }

  datosUsuario() {
    if (!this.estrato_l) {
      switch (parseInt(this.reg_tar.clase)) {
        case 1:
          this.estrato_l = "1  BAJO - BAJO";
          break;
        case 2:
          this.estrato_l = "2  BAJO";
          break;
        case 3:
          this.estrato_l = "3  MEDIO - BAJO";
          break;
        case 4:
          this.estrato_l = "4  MEDIO";
          break;
        case 5:
          this.estrato_l = "5  MEDIO - ALTO";
          break;
        case 6:
          this.estrato_l = "6  ALTO";
          break;
        case 10:
          this.estrato_l = "INDUSTRIAL";
          break;
        case 11:
          this.estrato_l = "COMERCIAL";
          break;
        case 12:
          this.estrato_l = "OFICIAL";
          break;
        case 13:
          this.estrato_l = "ESPECIAL";
          break;
        case 14:
          this.estrato_l = "TEMPORAL";
          break;
        case 15:
          this.estrato_l = "PROVISIONAL";
          break;
        default:
          this.estrato_l = " ";
          break;
      }
    }

    this.llenarFactura();
  }

  async llenarFactura() {
    this.imprimirMatriz();

    if (this.tabla_tar_w[9].vlr_tar[0] > 0) {
      this.sello_corte = true;
    }

    this.codigo_barras = `${this.reg_fact.cat}${format_op(this.tabla.serv3.vlr_tot_w.padStart(7, "0"))}${
      this.reg_fact.llave
    }`;

    this.imprimir();
  }

  imprimirMatriz() {
    return new Promise((resolve) => {
      for (let i = 0; i < 15; i++) {
        switch (i) {
          case 0:
            this.tabla.serv3.matriz[i].concepto = "CARGO FIJO";
            break;
          case 1:
            this.tabla.serv3.matriz[i].concepto = "BASICO";
            break;
          case 2:
            this.tabla.serv3.matriz[i].concepto = "COMPLEMENTARIO";
            break;
          case 3:
            this.tabla.serv3.matriz[i].concepto = "SUNTUARIO";
            break;
          case 4:
            this.tabla.serv3.matriz[i].concepto = "TARIFA BRUTA";
            break;
          case 5:
            this.tabla.serv3.matriz[i].concepto = "SUBSIDIO o APORTE";
            break;
          case 6:
            this.tabla.serv3.matriz[i].concepto = "VALOR NETO";
            break;
          case 7:
            this.tabla.serv3.matriz[i].concepto = "MEDIDOR";
            break;
          case 8:
            this.tabla.serv3.matriz[i].concepto = "CONEXIONES";
            break;
          case 9:
            this.tabla.serv3.matriz[i].concepto = "SALDO ANTERIOR";
            break;
          case 10:
            this.tabla.serv3.matriz[i].concepto = "INTERESES MORA";
            break;
          case 11:
            this.tabla.serv3.matriz[i].concepto = "AJUSTES";
            break;
          case 12:
            this.tabla.serv3.matriz[i].concepto = "RECONEXIONES";
            break;
          case 13:
            this.tabla.serv3.matriz[i].concepto = "OTROS";
            break;
          case 14:
            this.tabla.serv3.matriz[i].concepto = "TOTAL A PAGAR";
            break;
        }

        this.tabla.serv3.matriz[i].vlr_1 = mascara_valor.resolve(this.tabla_tar_w[i].vlr_tar[0].toString());
        this.tabla.serv3.matriz[i].vlr_2 = mascara_valor.resolve(this.tabla_tar_w[i].vlr_tar[1].toString());
        this.tabla.serv3.matriz[i].vlr_3 = mascara_valor.resolve(this.tabla_tar_w[i].vlr_tar[2].toString());

        this.tabla.serv3.matriz[i].sub_tot =
          format_op(this.tabla_tar_w[i].vlr_tar[0]) +
          format_op(this.tabla_tar_w[i].vlr_tar[1]) +
          format_op(this.tabla_tar_w[i].vlr_tar[2]);

        this.tabla.serv3.matriz[i].sub_tot = mascara_valor.resolve(this.tabla.serv3.matriz[i].sub_tot.toString());

        if (i == 14) resolve();
      }
    });
  }

  llenarEnergia() {
    return new Promise(async (resolve) => {
      await this.llenarLecturas();
      await this.buscarConcepto();

      this.tabla_tar_w[9].vlr_tar[0] += format_op(this.reg_fact.tabla.serv_tab[3].sdo_ant);
      this.tabla_tar_w[10].vlr_tar[0] += format_op(this.reg_fact.tabla.serv_tab[3].sdo_ant);
      this.tabla_tar_w[10].vlr_tar[0] += format_op(this.reg_fact.tabla.serv_tab[3].sdo_ant);
      this.tabla_tar_w[11].vlr_tar[0] += format_op(this.reg_fact.tabla.serv_tab[3].sdo_ant);
      this.tabla_tar_w[13].vlr_tar[1] += format_op(this.reg_fact.tabla.serv_tab[3].sdo_ant);

      await this.sumarPeriodos();

      this.tabla.serv3.vlr_tot_w =
        format_op(this.tabla_tar_w[14].vlr_tar[0]) +
        format_op(this.tabla_tar_w[14].vlr_tar[1] + format_op(this.tabla_tar_w[14].vlr_tar[2]));

      this.tabla.serv3.vlr_tot_w = mascara_valor.resolve(this.tabla.serv3.vlr_tot_w.toString());

      resolve();
    });
  }

  llenarLecturas() {
    return new Promise(async (resolve) => {
      await this.llenarGrafica();
      this.tabla.serv3.lec_act_med = mascara11.resolve(this.reg_fact.tabla.serv_tab[3].lec_act_med.toString());

      this.tabla.serv3.lec_ant_med = mascara11.resolve(this.reg_fact.tabla.serv_tab[3].lec_ant_med.toString());

      this.tabla.serv3.consumo_kw =
        format_op(this.reg_fact.tabla.serv_tab[3].lec_act_med) - format_op(this.reg_fact.tabla.serv_tab[3].lec_ant_med);

      this.tabla.serv3.consumo_kw = mascara11.resolve(this.tabla.serv3.consumo_kw.toString());

      if (this.reg_fact.tabla.serv_tab[3].datos_tab[1].vlr == 0) {
        this.tabla.serv3.vlr_kw = "";
      } else {
        this.tabla.serv3.vlr_kw =
          format_op(this.reg_fact.tabla.serv_tab[3].datos_tab[1].vlr) /
          format_op(this.reg_fact.tabla.serv_tab[3].datos_tab[1].cant);
      }

      this.tabla.serv3.vlr_kw = mascara11.resolve(this.tabla.serv3.vlr_kw.toString());

      resolve();
    });
  }

  buscarConcepto() {
    return new Promise(async (resolve) => {
      await this.llenarGrafica();

      let llave_w = "",
        busqueda = null,
        serv_w = 4,
        periodo_fac = "",
        periodo_ctl = "",
        y = 0;

      for (let i = 0; i < 5; i++) {
        if (this.reg_fact.tabla.serv_tab[3].datos_tab[i].vlr != 0) {
          // leer concepto
          y = parseInt(this.reg_fact.tabla.serv_tab[3].datos_tab[i].mes) - 1 || 0;

          llave_w = `${
            this.reg_fact.tabla.serv_tab[3].datos_tab[i].ano
          }${serv_w}${this.reg_fact.tabla.serv_tab[3].datos_tab[i].conc.slice(1)}`;

          busqueda = this.array_tarifas.find((e) => e.llave == llave_w);

          if (!busqueda) {
            this.reg_tar = regs_dom.TARIF();
          } else {
            this.reg_tar = busqueda;
          }

          periodo_fac = `${this.reg_fact.tabla.serv_tab[3].datos_tab[i].ano}${this.reg_fact.tabla.serv_tab[3].datos_tab[i].mes}`;
          periodo_ctl = `${this.reg_ctl.periodo[i].ano_per}${this.reg_ctl.periodo[i].mes_per}`;
          if (i < 3 && periodo_fac == periodo_ctl) {
            this.tabla_tar_w[6].vlr_tar[i] += format_op(this.reg_fact.tabla.serv_tab[3].datos_tab[i].vlr);
            this.calcularSubsidio(i, y);
          } else {
            switch (parseInt(this.reg_tar.tarifa)) {
              case 1:
                this.tabla_tar_w[8].vlr_tar[0] += format_op(this.reg_fact.tabla.serv_tab[3].datos_tab[i].vlr);
                break;
              case 2:
                this.tabla_tar_w[13].vlr_tar[0] += format_op(this.reg_fact.tabla.serv_tab[3].datos_tab[i].vlr);
                break;
              case 3:
                this.tabla_tar_w[7].vlr_tar[0] += format_op(this.reg_fact.tabla.serv_tab[3].datos_tab[i].vlr);
                break;
              default:
                this.tabla_tar_w[13].vlr_tar[0] += format_op(this.reg_fact.tabla.serv_tab[3].datos_tab[i].vlr);
                break;
            }
          }
        }
      }

      resolve();
    });
  }

  async calcularSubsidio(index, y) {
    this.tabla_tar_w[6].vlr_tar[index] += format_op(this.reg_fact.tabla.serv_tab[3].datos_tab[i].vlr);

    if (this.reg_tar.medic == "N") {
      this.reg_fact.tabla.serv_tab[3].basico =
        this.reg_fact.tabla.serv_tab[3].complem =
        this.reg_fact.tabla.serv_tab[3].suntuar =
          0;
    }

    let con_basi_w = Math.round(format_op(this.reg_fact.tabla.serv_tab[3].basico) * this.reg_tar.tabla[y].con_basi);
    let con_comp_w = Math.round(format_op(this.reg_fact.tabla.serv_tab[3].complem) * this.reg_tar.tabla[y].con_comp);
    let con_sunt_w = Math.round(format_op(this.reg_fact.tabla.serv_tab[3].suntuar) * this.reg_tar.tabla[y].con_sunt);

    this.tabla_tar_w[1].vlr_tar[index] += format_op(con_basi_w);
    this.tabla_tar_w[2].vlr_tar[index] += format_op(con_comp_w);
    this.tabla_tar_w[3].vlr_tar[index] += format_op(con_sunt_w);

    this.tabla_tar_w[4].vlr_tar[index] =
      format_op(this.tabla_tar_w[0].vlr_tar[index]) +
      format_op(this.tabla_tar_w[1].vlr_tar[index]) +
      format_op(this.tabla_tar_w[2].vlr_tar[index]) +
      format_op(this.tabla_tar_w[3].vlr_tar[index]);

    this.tabla_tar_w[5].vlr_tar[index] =
      format_op(this.tabla_tar_w[6].vlr_tar[index]) - format_op(this.tabla_tar_w[4].vlr_tar[index]);
  }

  async sumarPeriodos() {
    for (let i = 0; i < 3; i++) {
      this.tabla_tar_w[14].vlr_tar[i] =
        format_op(this.tabla_tar_w[6].vlr_tar[i]) +
        format_op(this.tabla_tar_w[7].vlr_tar[i]) +
        format_op(this.tabla_tar_w[8].vlr_tar[i]) +
        format_op(this.tabla_tar_w[9].vlr_tar[i]) +
        format_op(this.tabla_tar_w[10].vlr_tar[i]) +
        format_op(this.tabla_tar_w[11].vlr_tar[i]) +
        format_op(this.tabla_tar_w[12].vlr_tar[i]) +
        format_op(this.tabla_tar_w[13].vlr_tar[i]);
    }
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

  async llenarGrafica() {
    // GRAFICA DE 6 MESES
    this.mes1_cal = 0;
    this.mes2_cal = 0;
    let mes_w = parseInt(this.nom_fac_w.slice(4)) - 1;
    if (mes_w > 6) this.mes1_cal = mes_w - 6;
    else this.mes1_cal = 12 - 6 + mes_w;

    for (let i = 0; i < 6; i++) {
      if (i > 0) this.mes1_cal += 1;

      this.calcularMesConsumo(this.mes1_cal);

      this.datos_graf.push(
        JSON.parse(
          JSON.stringify({
            label: this.mes2_cal,
            value: this.reg_fact.tabla.serv_tab[3].tabla_consu[i].ult_cons,
          })
        )
      );
    }

    await this.graficar();
  }

  calcularMesConsumo() {
    switch (this.mes1_cal) {
      case 0:
        this.mes1_cal = 12;
        break;
      case 13:
        this.mes1_cal = 1;
        break;
      default:
        if (this.mes1_cal < 0) this.mes1_cal = 12 - this.mes1_cal * -1;
        break;
    }

    switch (this.mes1_cal) {
      case 1:
        this.mes2_cal = "Ene";
        break;
      case 2:
        this.mes2_cal = "Feb";
        break;
      case 3:
        this.mes2_cal = "Mar";
        break;
      case 4:
        this.mes2_cal = "Abr";
        break;
      case 5:
        this.mes2_cal = "May";
        break;
      case 6:
        this.mes2_cal = "Jun";
        break;
      case 7:
        this.mes2_cal = "Jul";
        break;
      case 8:
        this.mes2_cal = "Agt";
        break;
      case 9:
        this.mes2_cal = "Sep";
        break;
      case 10:
        this.mes2_cal = "Oct";
        break;
      case 11:
        this.mes2_cal = "Nov";
        break;
      case 12:
        this.mes2_cal = "Dic";
        break;
    }
  }

  format() {
    return {
      pageMargins: [20, 195, 20, 40],
      images: { logo: rutaLogos(parseInt($_USUARIO_EMPRESA.NIT)) },
      codigo_barras: { cod_barras: { text: this.codigo_barras, options: { width: 1, height: 70, fontSize: 10 } } },
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
                      columns: [
                        {
                          width: "60%",
                          marginTop: 1,
                          stack: [
                            {
                              columns: [
                                { text: "FECHA: ", width: "13%", bold: true },
                                { text: _editarFecha(this.fecha_act), width: "30%" },
                                { text: "FACTURA NRO: ", bold: true, width: "20%" },
                                { text: new Intl.NumberFormat("ja-JP").format(this.reg_fact.llave), width: "38%" },
                              ],
                            },
                            {
                              marginTop: 3,
                              columns: [
                                { text: "CODIGO: ", width: "13%", bold: true },
                                { text: this.reg_fact.cat, width: "87%" },
                              ],
                            },
                            {
                              marginTop: 3,
                              columns: [
                                { text: "NOMBRE: ", width: "13%", bold: true },
                                { text: this.reg_fact.nombre, width: "87%" },
                              ],
                            },
                            {
                              marginTop: 3,
                              columns: [
                                { text: "DIRECC: ", width: "13%", bold: true },
                                { text: this.reg_fact.direcc, width: "87%" },
                              ],
                            },
                            {
                              marginTop: 3,
                              columns: [
                                { text: "RUTA: ", width: "13%", bold: true },
                                {
                                  text: `${this.reg_fact.rut.slice(0, 2)} ${this.reg_fact.nombre_ruta}`,
                                  width: "87%",
                                },
                              ],
                            },
                            {
                              marginTop: 3,
                              columns: [
                                { text: "TARIFA: ", width: "13%", bold: true },
                                {
                                  text: `${this.reg_fact.est}${this.reg_fact.tabla.serv_tab[3].datos_tab[0].conc.slice(
                                    1,
                                    2
                                  )}`,
                                  width: "10%",
                                },
                                { text: "ESTRATO: ", width: "13%", bold: true },
                                { text: this.estrato_l, width: "64%" },
                              ],
                            },
                            {
                              marginTop: 3,
                              columns: [
                                { text: "ULTIMO ABONO RECIBIDO: ", width: "35%", bold: true },
                                { text: this.llave_ult_abo, width: "20%" },
                                { text: this.vlr_ult_abo, width: "20%" },
                              ],
                            },
                          ],
                        },
                        {
                          width: "40%",
                          marginTop: 1,
                          stack: [
                            {
                              columns: [
                                {
                                  stack: [
                                    { text: "Lect. actual ", bold: true },
                                    { text: this.tabla.serv3.lec_act_med },
                                  ],
                                },
                                {
                                  stack: [{ text: "Lect. anter ", bold: true }, { text: this.tabla.serv3.lec_ant_med }],
                                },
                                {
                                  width: "30%",
                                  stack: [{ text: "Consumo kw/h ", bold: true }, { text: this.tabla.serv3.consumo_kw }],
                                },
                                {
                                  stack: [{ text: "Valor kw/h ", bold: true }, { text: this.tabla.serv3.vlr_kw }],
                                },
                              ],
                            },
                            {
                              alignment: "center",
                              image: this.graf,
                              width: 160,
                              height: 70,
                            },
                          ],
                        },
                      ],
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
        style: "left9",
        table: {
          widths: ["20%%", "20%", "20%", "20%", "20%"],
          body: this.llenarMatrizPdf(),
        },
        layout: {
          hLineWidth: function (i, node) {
            if (i == 0 || i == 1 || i == 18) return 1;
            else return 0;
          },
          vLineWidth: function (i, node) {
            if (i == 0 || i == 5) return 1;
            else return 0;
          },
        },
      },
      {
        margin: [5, 10, 0, 0],
        style: "left9",
        bold: true,
        stack: [
          { text: this.reg_ctl.mensaje1 || " " },
          { text: this.reg_ctl.mensaje2 || " " },
          { text: this.reg_ctl.mensaje3 || " " },
        ],
      },
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: -35,
            h: 38,
            w: 555,
          },
        ],
      },
      {
        margin: [5, 10, 5, 0],
        style: "left9",
        stack: [
          {
            columns: [
              { text: "CODIGO:", width: "7%", bold: true },
              { text: this.reg_fact.cat, width: "20%" },
              { text: "USUARIO:", width: "9%", bold: true },
              { text: this.reg_fact.nombre, width: "50%" },
              { text: _editarFecha(this.fecha_act), width: "14%", bold: true },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            image: "cod_barras",
            width: 220,
            height: 50,
          },
          {
            marginTop: 10,
            table: {
              widths: ["20%%", "20%", "20%", "20%", "20%"],
              body: [
                [
                  { text: "PAGO OPORTUNO", bold: true, alignment: "left" },
                  { text: "", alignment: "right" },
                  { text: "", alignment: "right" },
                  { text: this.tabla.serv3.pago_oportuno_fecha, alignment: "right" },
                  { text: format_op(this.tabla.serv3.vlr_tot_w) || "", alignment: "right" },
                ],
                [
                  { text: "PAGO CON RECARGO", bold: true, alignment: "left" },
                  { text: "", alignment: "right" },
                  { text: "", alignment: "right" },
                  { text: this.tabla.serv3.pago_recargo_fecha, alignment: "right" },
                  { text: format_op(this.tabla.serv3.tot_recar_w) || "", alignment: "right" },
                ],
              ],
            },
            layout: "noBorders",
          },
        ],
      },
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: -113,
            h: 120,
            w: 555,
          },
        ],
      },
    ];
  }

  llenarMatrizPdf() {
    let body = [
      [
        { text: "PERIODO FACTURA", bold: true, alignment: "center", colSpan: 2 },
        {},
        {
          text: _editarFechaMes(`${this.reg_ctl.periodo[1].ano_per}${this.reg_ctl.periodo[1].mes_per}`),
          bold: true,
          alignment: "center",
        },
        {
          text: _editarFechaMes(`${this.reg_ctl.periodo[0].ano_per}${this.reg_ctl.periodo[0].mes_per}`),
          bold: true,
          alignment: "center",
        },
        { text: "VALOR TOTAL", bold: true, alignment: "center" },
      ],
    ];

    for (let i in this.tabla.serv3.matriz) {
      body.push([
        { text: this.tabla.serv3.matriz[i].concepto, bold: true, alignment: "left" },
        { text: format_op(this.tabla.serv3.matriz[i].vlr_1) || "", alignment: "right" },
        { text: format_op(this.tabla.serv3.matriz[i].vlr_2) || "", alignment: "right" },
        { text: format_op(this.tabla.serv3.matriz[i].vlr_3) || "", alignment: "right" },
        { text: format_op(this.tabla.serv3.matriz[i].sub_tot) || "", alignment: "right" },
      ]);
    }

    body.push(
      [
        { text: "PAGO OPORTUNO", bold: true, alignment: "left", marginTop: 5 },
        { text: "", alignment: "right", marginTop: 5 },
        { text: "", alignment: "right", marginTop: 5 },
        { text: this.tabla.serv3.pago_oportuno_fecha, alignment: "right", marginTop: 5 },
        { text: format_op(this.tabla.serv3.vlr_tot_w) || "", alignment: "right", marginTop: 5 },
      ],
      [
        { text: "PAGO CON RECARGO", bold: true, alignment: "left" },
        { text: "", alignment: "right" },
        { text: "", alignment: "right" },
        { text: this.tabla.serv3.pago_recargo_fecha, alignment: "right" },
        { text: format_op(this.tabla.serv3.tot_recar_w) || "", alignment: "right" },
      ]
    );

    return body;
  }

  async graficar() {
    return new Promise((resolve) => {
      let reg = this.datos_graf;

      let create_canvas = document.createElement("canvas");
      create_canvas.style.display = "none";
      document.getElementsByTagName("body")[0].appendChild(create_canvas);
      let canvas = create_canvas.getContext("2d");

      let data = {
        labels: [reg[0].label, reg[1].label, reg[2].label, reg[3].label, reg[4].label, reg[5].label],
        datasets: [
          {
            label: "",
            data: [reg[0].value, reg[1].value, reg[2].value, reg[3].value, reg[4].value, reg[5].value],
            backgroundColor: "#D1DFF4",
            borderWidth: 1,
          },
        ],
      };

      let _this = this;
      let grafica = new Chart(canvas, {
        type: "bar",
        data: data,
        options: {
          animation: {
            duration: 1,
            onComplete: async function () {
              var chartInstance = this.chart,
                ctx = chartInstance.ctx;

              ctx.font = Chart.helpers.fontString(
                60,
                Chart.defaults.global.defaultFontStyle,
                Chart.defaults.global.defaultFontFamily
              );
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";

              this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
                });
              });

              _this.graf = grafica.toBase64Image();

              document.getElementsByTagName("body")[0].removeChild(create_canvas);

              resolve();
            },
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontSize: 70,
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 70,
                },
              },
            ],
          },
        },
      });
    });
  }
}

const imprimir_PUB205A = async (params) => {
  var formato = new formato_PUB205A(params);
  formato._init();
};

module.exports = {
  imprimir_PUB205A,
};
