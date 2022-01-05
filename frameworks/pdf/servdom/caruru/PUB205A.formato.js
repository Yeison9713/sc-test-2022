var Chart = require("chart.js");

const {
  styles_imp,
  _editarFecha,
  format_op,
  mascara4_cant,
  mascara_valor,
  rutaLogos,
  mascara11,
} = require("../../../../SERVDOM/scripts/globalDom");
const { regs_dom } = require("../../../../SERVDOM/scripts/regs_dom");

class formato_PUB205A {
  constructor(params) {
    this.nro_fact_w = params.nro_fact_w;
    this.nom_fac_w = params.nom_fac_w;
    this.admin_w = params.admin_w;
    this.reg_fact = null;
    this.reg_ctl = null;
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
    this.tabla = {
      serv0: {},
      serv1: {},
      serv2: {},
      serv3: {},
      serv4: {},
      serv5: {},
    };
    this.tot_tot_w = 0;
    this.codigo_barras = "";
    this.cod_tarif_w = "";
    this.tot_ser_w = 0;

    this.mes1_cal = 0;
    this.mes2_cal = "";
    this.datos_graf_arriba = [];
    this.datos_graf_abajo = [];
    this.graf_arriba = "";
    this.graf_abajo = "";
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
        this.callback();
      });
  }

  leerCtl() {
    postData({ datosh: moduloDatosEnvio() + this.nom_fac_w + "|1|" }, get_url("app/SERVDOM/PUB201_01.DLL"))
      .then((data) => {
        this.reg_ctl = data;
        loader("hide");
        if (!this.reg_ctl.llave) {
          CON851("", "No se encontro Registro Control", null, "error", "Error");
          this.callback();
        } else this.leerFacturas();
      })
      .catch((error) => {
        console.error(error);
        loader("hide");
        if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "");
        this.callback();
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
    if (this.reg_ctl.fecha_exp == 0) {
      this.reg_ctl.fecha_exp = "20090200";
    }

    if (this.reg_ctl.fecha_vence == 0) {
      this.reg_ctl.fecha_vence = "20090200";
    }

    this.cod_tarif_w = this.reg_fact.tabla.serv_tab[0].datos_tab[0].conc.slice(2);

    if(!this.reg_fact.tabla.serv_tab[0].datos_tab[0].conc.slice(2).trim()) {
      let busqueda = this.reg_fact.tabla.serv_tab.find(e => e.datos_tab[0].conc.trim() != "" && e.datos_tab[0].conc.trim() != 0);
      if(busqueda) this.cod_tarif_w = busqueda.datos_tab[0].conc.slice(2);
    }

    switch (this.cod_tarif_w) {
      case "R":
        this.tipo_w = "Residencial";
        break;
      case "P":
        this.tipo_w = "Oficial";
        break;
      case "O":
        this.tipo_w = "Oficial";
        break;
      case "M":
        this.tipo_w = "Residencial";
        break;
      case "L":
        this.tipo_w = "Comercial";
        break;
      case "C":
        this.tipo_w = "Comercial";
        break;
      default:
        this.tipo_w = "";
        break;
    }

    this.llenarFactura();
  }

  async llenarFactura() {
    await this.leerTarifas();

    this.codigo_barras = `415${"7709265890434"}8020${this.reg_fact.llave}3900${"00000000"}96${
      this.reg_ctl.fecha_vence
    }`;

    this.tot_tot_w =
      format_op(this.tabla.serv0.tot_acum_w) +
      format_op(this.tabla.serv1.tot_acum_w) +
      format_op(this.tabla.serv2.tot_acum_w) +
      format_op(this.tabla.serv3.tot_acum_w) +
      format_op(this.tabla.serv4.tot_acum_w) +
      format_op(this.tabla.serv5.tot_acum_w);

    this.tot_tot_w = mascara_valor.resolve(this.tot_tot_w.toString());

    this.tabla.serv0.tot_acum_w = mascara_valor.resolve(this.tabla.serv0.tot_acum_w.toString());
    this.tabla.serv1.tot_acum_w = mascara_valor.resolve(this.tabla.serv1.tot_acum_w.toString());
    this.tabla.serv2.tot_acum_w = mascara_valor.resolve(this.tabla.serv2.tot_acum_w.toString());
    this.tabla.serv3.tot_acum_w = mascara_valor.resolve(this.tabla.serv3.tot_acum_w.toString());
    this.tabla.serv4.tot_acum_w = mascara_valor.resolve(this.tabla.serv4.tot_acum_w.toString());
    this.tabla.serv5.tot_acum_w = mascara_valor.resolve(this.tabla.serv5.tot_acum_w.toString());

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

    for (let i = 0; i < 6; i++) {
      let y = 0;

      y = parseInt(this.reg_ctl.periodo[0].mes_per) - 1 || 0;

      llave_w = `${this.reg_fact.tabla.serv_tab[i].datos_tab[0].ano}${this.reg_fact.tabla.serv_tab[i].datos_tab[0].conc}`;
      busqueda = this.array_tarifas.find((e) => e.llave == llave_w);

      if (!busqueda) {
        this.reg_tar = regs_dom.TARIF();
        this.reg_tar.tabla[y].car_fijo = this.reg_fact.tabla.serv_tab[i].datos_tab[0].vlr;
        this.reg_tar.medic = "N";
      } else {
        this.reg_tar = busqueda;
      }

      switch (i) {
        case 0:
          await this.llenarSectores(i, y);
          break;
        case 1:
          await this.llenarSectores(i, y);
          break;
        case 2:
          await this.llenarSectores(i, y);
          break;
        case 3:
          this.tot_ser_w = 0;
          break;
        case 4:
          await this.llenarSectores(i, y);
          break;
        case 5:
          this.tot_ser_w = 0;
          break;
      }

      this.tabla[`serv${i}`].tot_acum_w = this.tot_ser_w;
    }
  }

  async llenarSectores(index, y) {
    let consumo_w = 0;
    let vlr_basico_w = 0;
    let vlr_complem_w = 0;
    let bruto_w = 0;
    let subsidio_w = 0;
    let otros_w = 0;
    let anterior_w = 0;
    let tot_ant_w = 0;
    this.tot_ser_w = 0;

    this.tabla[
      `serv${index}`
    ].fecha = `${this.reg_fact.tabla.serv_tab[0].datos_tab[0].ano}/${this.reg_fact.tabla.serv_tab[0].datos_tab[0].mes}`;
    this.tabla[`serv${index}`].tarifa = this.reg_fact.tabla.serv_tab[index].datos_tab[0].conc;

    if (index == 0 || index == 4) {
      consumo_w =
        format_op(this.reg_fact.tabla.serv_tab[index].lec_act_med) -
        format_op(this.reg_fact.tabla.serv_tab[index].lec_ant_med);

      this.tabla[`serv${index}`].lect_ant_w = mascara11.resolve(
        this.reg_fact.tabla.serv_tab[index].lec_ant_med.toString()
      );
      this.tabla[`serv${index}`].lect_act_w = mascara11.resolve(
        this.reg_fact.tabla.serv_tab[index].lec_act_med.toString()
      );
      this.tabla[`serv${index}`].consumo_w = mascara4_cant.resolve(consumo_w.toString());

      if (index == 4) {
        this.tabla[`serv${index}`].porcent = this.reg_tar.tabla[y].subsid;
      }

      await this.llenarGrafica(index);
    }

    if (index == 0 || index == 1 || index == 4) {
      this.tabla[`serv${index}`].basico = this.reg_fact.tabla.serv_tab[index].basico;

      this.tabla[`serv${index}`].complem = this.reg_fact.tabla.serv_tab[index].complem;
    }

    if (this.reg_tar.medic == "S") {
      vlr_basico_w = Math.round(
        format_op(this.reg_tar.tabla[y].con_basi) * format_op(this.reg_fact.tabla.serv_tab[index].basico)
      );
      vlr_complem_w = Math.round(
        format_op(this.reg_tar.tabla[y].con_comp) * format_op(this.reg_fact.tabla.serv_tab[index].complem) +
          format_op(this.reg_tar.tabla[y].con_sunt) * format_op(this.reg_fact.tabla.serv_tab[index].suntuar)
      );
    } else {
      vlr_basico_w = format_op(this.reg_tar.tabla[y].con_basi);
      vlr_complem_w =
        format_op(this.reg_tar.tabla[y].con_comp) +
        format_op(this.reg_tar.tabla[y].con_sunt) +
        format_op(this.reg_tar.tabla[y].otro);
    }

    bruto_w =
      format_op(this.reg_tar.tabla[y].car_fijo) +
      format_op(this.reg_tar.tabla[y].otro) +
      format_op(vlr_basico_w) +
      format_op(vlr_complem_w);

    let cargo_fijo = Math.trunc(format_op(this.reg_tar.tabla[y].car_fijo));
    this.tabla[`serv${index}`].car_fijo = mascara_valor.resolve(cargo_fijo.toString());
    this.tabla[`serv${index}`].con_basi = mascara_valor.resolve(Math.round(vlr_basico_w).toString());
    this.tabla[`serv${index}`].con_comp = mascara_valor.resolve(Math.round(vlr_complem_w).toString());

    subsidio_w = format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].vlr) - format_op(bruto_w);
    this.tabla[`serv${index}`].cargo_mes = mascara_valor.resolve(Math.round(bruto_w).toString());
    this.tabla[`serv${index}`].subsidio = mascara_valor.resolve(Math.round(subsidio_w).toString());

    consumo_w = Math.round(
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].vlr) /
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].cant)
    );

    this.tabla[`serv${index}`].neto = mascara_valor.resolve(
      this.reg_fact.tabla.serv_tab[index].datos_tab[0].vlr.toString()
    );

    if (index == 3 || index == 4) {
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[1].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[2].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[3].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[4].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[index].refinanc_mes);

      this.tabla[`serv${index}`].ajustes = mascara_valor.resolve(
        Math.round(this.reg_fact.tabla.serv_tab[index].ajustes).toString()
      );
    } else {
      otros_w =
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[1].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[2].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[3].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[4].vlr) +
        format_op(this.reg_fact.tabla.serv_tab[index].refinanc_mes) +
        format_op(this.reg_fact.tabla.serv_tab[index].ajustes);

      this.tabla[`serv${index}`].ajustes = mascara_valor.resolve(Math.round(otros_w).toString());
    }

    this.tabla[`serv${index}`].cuota_ref = mascara_valor.resolve(Math.round(otros_w).toString());

    anterior_w =
      format_op(this.reg_fact.tabla.serv_tab[index].sdo_ant) + format_op(this.reg_fact.tabla.serv_tab[index].int_ant);

    this.tabla[`serv${index}`].sdo_ant = mascara_valor.resolve(anterior_w.toString());

    tot_ant_w += format_op(anterior_w);

    this.tabla[`serv${index}`].intereses = mascara_valor.resolve(
      this.reg_fact.tabla.serv_tab[index].int_mes.toString()
    );

    this.tot_ser_w =
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[1].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[2].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[3].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[4].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].int_mes) +
      format_op(this.reg_fact.tabla.serv_tab[index].ajustes) +
      format_op(this.reg_fact.tabla.serv_tab[index].refinanc_mes);

    this.tot_ser_w += format_op(this.reg_fact.tabla.serv_tab[index].sdo_ant);
    this.tot_ser_w += format_op(this.reg_fact.tabla.serv_tab[index].int_ant);

    this.tabla[`serv${index}`].total = mascara_valor.resolve(this.tot_ser_w.toString());
  }

  async llenarGrafica(index) {
    this.mes1_cal = 0;
    this.mes2_cal = 0;
    let mes_w = parseInt(this.nom_fac_w.slice(4)) - 1;
    if (mes_w > 6) this.mes1_cal = mes_w - 6;
    else this.mes1_cal = 12 - 6 + mes_w;

    for (let i = 0; i < 6; i++) {
      if (i > 0) this.mes1_cal += 1;

      this.calcularMesConsumo(this.mes1_cal);

      if (index == 4) {
        this.datos_graf_arriba.push(
          JSON.parse(
            JSON.stringify({
              label: this.mes2_cal,
              value: this.reg_fact.tabla.serv_tab[index].tabla_consu[i].ult_cons,
            })
          )
        );
      } else {
        this.datos_graf_abajo.push(
          JSON.parse(
            JSON.stringify({
              label: this.mes2_cal,
              value: this.reg_fact.tabla.serv_tab[index].tabla_consu[i].ult_cons,
            })
          )
        );
      }
    }

    await this.graficar(index);
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
      pageMargins: [20, 140, 30, 60],
      images: { logo: rutaLogos(parseInt($_USUARIO_EMPRESA.NIT)), logo_2: rutaLogos(`${parseInt($_USUARIO_EMPRESA.NIT)}-2`) },
      codigo_barras: { cod_barras: { text: this.codigo_barras, options: { width: 1, height: 70, fontSize: 10 } } },
      header: () => {
        return {
          margin: [30, 20, 30, 0],
          stack: [
            {
              style: "left9",
              table: {
                widths: ["25%", "50%", "25%"],
                heights: [60, 45],
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
                      stack: [
                        {
                          marginTop: 2,
                          image: "logo_2",
                          height: 45,
                          width: 65
                        },
                        {
                          text: this.tipo_w,
                          alignment: "right",
                          width: "20%",
                        },
                        {
                          canvas: [
                            { type: "line", x1: 75, x2: 131, y1: -12, y2: -12 },
                            { type: "line", x1: 75, x2: 75, y1: -12, y2: 3 },
                          ],
                        },
                      ],
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
                            { text: _editarFecha(this.reg_ctl.fecha_exp).toUpperCase(), width: "25%" },
                            { text: "VENCE: ", width: "7%" },
                            { text: _editarFecha(this.reg_ctl.fecha_vence).toUpperCase(), width: "14%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "Periodo: ", width: "10%" },
                            { text: this.nom_fac_w, width: "32%" },
                            { text: "Estrato: ", width: "7%" },
                            { text: this.reg_fact.est, width: "25%" },
                            { text: "Cod: ", width: "7%" },
                            { text: this.reg_fact.cat, width: "30%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "Usuario: ", width: "10%" },
                            { text: this.reg_fact.nombre, width: "32%" },
                            { text: "Dirección: ", width: "10%" },
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
          margin: [10, 0, 0, 0],
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
        columns: [
          {
            width: "35%",
            table: {
              widths: ["60%", "40%"],
              body: [
                [
                  { text: `ASEO     ${this.tabla.serv2.fecha}` },
                  { text: `Tarifa: ${this.tabla.serv2.tarifa}`, alignment: "right" },
                ],
                [{ text: "Cargo Fijo" }, { text: this.tabla.serv2.car_fijo, alignment: "right" }],
                [{ text: "Consumo Basico" }, { text: this.tabla.serv2.con_basi, alignment: "right" }],
                [{ text: "Consumo Comp" }, { text: this.tabla.serv2.con_comp, alignment: "right" }],
                [{ text: "Cargo Mes" }, { text: this.tabla.serv2.cargo_mes, alignment: "right" }],
                [{ text: "Susidio/Contribuc" }, { text: this.tabla.serv2.subsidio, alignment: "right" }],
                [{ text: "Neto" }, { text: this.tabla.serv2.neto, alignment: "right" }],
                [{ text: "Saldo Anterior" }, { text: this.tabla.serv2.sdo_ant, alignment: "right" }],
                [{ text: "Intereses" }, { text: this.tabla.serv2.interes, alignment: "right" }],
                [{ text: "Ajustes" }, { text: this.tabla.serv2.ajustes, alignment: "right" }],
                [{ text: "Cuota refinanc" }, { text: this.tabla.serv2.cuota_ref, alignment: "right" }],
                [
                  { text: "TOTAL ASEO", bold: true },
                  { text: this.tabla.serv2.total, alignment: "right", bold: true },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 12) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
              hLineColor: function (i) {
                return i != 0 && i != 12 ? "gray" : "black";
              },
              fillColor: function (i) {
                return i == 1 || i == 3 || i == 5 || i == 7 || i == 9 || i == 11 ? "#E4E5E8" : "white";
              },
            },
          },
          {
            text: "",
            width: "2%",
          },
          {
            // marginLeft:
            width: "35%",
            table: {
              widths: ["67%", "33%"],
              body: [
                [
                  { text: `ENERGIA     ${this.tabla.serv4.fecha}` },
                  { text: `Tarifa: ${this.tabla.serv4.tarifa}`, alignment: "right" },
                ],
                [{ text: "Cargo Fijo" }, { text: this.tabla.serv4.car_fijo, alignment: "right" }],
                [
                  { columns: [{ text: "Consumo Basico", width: "75%" }, { text: this.tabla.serv4.basico }] },
                  { text: this.tabla.serv4.con_basi, alignment: "right" },
                ],
                [
                  { columns: [{ text: "Consumo Comp", width: "75%" }, { text: this.tabla.serv4.complem }] },
                  { text: this.tabla.serv4.con_comp, alignment: "right" },
                ],
                [{ text: "Cargo Mes" }, { text: this.tabla.serv4.cargo_mes, alignment: "right" }],
                [
                  { columns: [{ text: "Susidio/Contribuc", width: "75%" }, { text: `${this.tabla.serv4.porcent}%` }] },
                  { text: this.tabla.serv4.subsidio, alignment: "right" },
                ],
                [{ text: "Total consumo facturado" }, { text: this.tabla.serv4.neto, alignment: "right" }],
                [{ text: "Saldo Anterior" }, { text: this.tabla.serv4.sdo_ant, alignment: "right" }],
                [{ text: "Intereses" }, { text: this.tabla.serv4.intereses, alignment: "right" }],
                [{ text: "Ajustes" }, { text: this.tabla.serv4.ajustes, alignment: "right" }],
                [{ text: "Cuota refinanc" }, { text: this.tabla.serv4.cuota_ref, alignment: "right" }],
                [
                  { text: "TOTAL ENERGIA", bold: true },
                  { text: this.tabla.serv4.total, alignment: "right", bold: true },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 12) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
              hLineColor: function (i) {
                return i != 0 && i != 12 ? "gray" : "black";
              },
              fillColor: function (i) {
                return i == 1 || i == 3 || i == 5 || i == 7 || i == 9 || i == 11 ? "#E4E5E8" : "white";
              },
            },
          },
          {
            text: "",
            width: "2%",
          },
          {
            // marginLeft:
            width: "26%",
            table: {
              widths: ["67%", "33%"],
              body: [
                [{ text: "ENERGIA" }, { text: " " }],
                [{ text: "Lect Anterior" }, { text: this.tabla.serv4.lect_ant_w, alignment: "right" }],
                [{ text: "Lect Actual" }, { text: this.tabla.serv4.lect_act_w, alignment: "right" }],
                [{ text: "Consumo" }, { text: this.tabla.serv4.consumo_w, alignment: "right" }],
                [{ text: " " }, {}],
                [{ image: this.graf_arriba, width: 130, height: 83, colSpan: 2 }],
                [{ text: " " }, {}],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 7) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
              hLineColor: function (i) {
                return i != 0 && i != 12 ? "gray" : "black";
              },
              fillColor: function (i) {
                return i == 1 || i == 3 ? "#E4E5E8" : "white";
              },
            },
          },
        ],
      },
      {
        marginTop: 10,
        style: "left9",
        columns: [
          {
            width: "35%",
            table: {
              widths: ["67%", "33%"],
              body: [
                [
                  {
                    text: `ACUEDUCTO     ${this.tabla.serv0.fecha}`,
                  },
                  { text: `Tarifa: ${this.tabla.serv0.tarifa}`, alignment: "right" },
                ],
                [{ text: "Cargo Fijo" }, { text: this.tabla.serv0.car_fijo, alignment: "right" }],
                [
                  { columns: [{ text: "Consumo Basico", width: "75%" }, { text: this.tabla.serv0.basico }] },
                  { text: this.tabla.serv0.con_basi, alignment: "right" },
                ],
                [
                  { columns: [{ text: "Consumo Comp", width: "75%" }, { text: this.tabla.serv0.complem }] },
                  { text: this.tabla.serv0.con_comp, alignment: "right" },
                ],
                [{ text: "Cargo Mes" }, { text: this.tabla.serv0.cargo_mes, alignment: "right" }],
                [{ text: "Susidio/Contribuc" }, { text: this.tabla.serv0.subsidio, alignment: "right" }],
                [{ text: "Neto" }, { text: this.tabla.serv0.neto, alignment: "right" }],
                [{ text: "Saldo Anterior" }, { text: this.tabla.serv0.sdo_ant, alignment: "right" }],
                [{ text: "Intereses" }, { text: this.tabla.serv0.intereses, alignment: "right" }],
                [{ text: "Ajustes" }, { text: this.tabla.serv0.ajustes, alignment: "right" }],
                [{ text: "Cuota refinanc" }, { text: this.tabla.serv0.cuota_ref, alignment: "right" }],
                [
                  { text: "TOTAL ACUEDUCTO", bold: true },
                  { text: this.tabla.serv0.total, alignment: "right", bold: true },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 12) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
              hLineColor: function (i) {
                return i != 0 && i != 12 ? "gray" : "black";
              },
              fillColor: function (i) {
                return i == 1 || i == 3 || i == 5 || i == 7 || i == 9 || i == 11 ? "#E4E5E8" : "white";
              },
            },
          },
          {
            text: "",
            width: "2%",
          },
          {
            // marginLeft:
            width: "35%",
            table: {
              widths: ["67%", "33%"],
              body: [
                [
                  { text: `ALCANTARILLADO ${this.tabla.serv1.fecha}` },
                  { text: `Tarifa: ${this.tabla.serv1.tarifa}`, alignment: "right" },
                ],
                [{ text: "Cargo Fijo" }, { text: this.tabla.serv1.car_fijo, alignment: "right" }],
                [
                  { columns: [{ text: "Consumo Basico", width: "75%" }, { text: this.tabla.serv1.basico }] },
                  { text: this.tabla.serv1.con_basi, alignment: "right" },
                ],
                [
                  { columns: [{ text: "Consumo Comp", width: "75%" }, { text: this.tabla.serv1.complem }] },
                  { text: this.tabla.serv1.con_comp, alignment: "right" },
                ],
                [{ text: "Cargo Mes" }, { text: this.tabla.serv1.cargo_mes, alignment: "right" }],
                [{ text: "Susidio/Contribuc" }, { text: this.tabla.serv1.subsidio, alignment: "right" }],
                [{ text: "Total consumo facturado" }, { text: this.tabla.serv1.neto, alignment: "right" }],
                [{ text: "Saldo Anterior" }, { text: this.tabla.serv1.sdo_ant, alignment: "right" }],
                [{ text: "Intereses" }, { text: this.tabla.serv1.interes, alignment: "right" }],
                [{ text: "Ajustes" }, { text: this.tabla.serv1.ajustes, alignment: "right" }],
                [{ text: "Cuota refinanc" }, { text: this.tabla.serv1.cuota_ref, alignment: "right" }],
                [
                  { text: "TOTAL ALCANTARILLADO", bold: true },
                  { text: this.tabla.serv1.total, alignment: "right", bold: true },
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 12) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
              hLineColor: function (i) {
                return i != 0 && i != 12 ? "gray" : "black";
              },
              fillColor: function (i) {
                return i == 1 || i == 3 || i == 5 || i == 7 || i == 9 || i == 11 ? "#E4E5E8" : "white";
              },
            },
          },
          {
            text: "",
            width: "2%",
          },
          {
            // marginLeft:
            width: "26%",
            table: {
              widths: ["67%", "33%"],
              body: [
                [{ text: "ACUEDUCTO" }, { text: " " }],
                [{ text: "Lect Anterior" }, { text: this.tabla.serv0.lect_ant_w, alignment: "right" }],
                [{ text: "Lect Actual" }, { text: this.tabla.serv0.lect_act_w, alignment: "right" }],
                [{ text: "Consumo" }, { text: this.tabla.serv0.consumo_w, alignment: "right" }],
                [{ text: " " }, {}],
                [{ image: this.graf_abajo, width: 130, height: 83, colSpan: 2 }],
                [{ text: " " }, {}],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                if (i == 0 || i == 1 || i == 7) return 1;
                else return 0;
              },
              vLineWidth: function (i, node) {
                if (i == 0 || i == 2) return 1;
                else return 0;
              },
              hLineColor: function (i) {
                return i != 0 && i != 12 ? "gray" : "black";
              },
              fillColor: function (i) {
                return i == 1 || i == 3 ? "#E4E5E8" : "white";
              },
            },
          },
        ],
      },
      {
        marginTop: 7,
        style: "left9",
        columns: [
          {
            stack: [
              {
                margin: [6, 5, 0, 0],
                image: "cod_barras",
                width: 220,
                height: 50,
              },
            ],
            width: "50%",
          },
          {
            marginTop: 22,
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
        canvas: [
          {
            type: "rect",
            x: 0,
            y: -52,
            h: 56,
            w: 535,
          },
        ],
      },
      {
        marginTop: 10,
        marginLeft: 5,
        style: "left9",
        columns: [
          {
            width: "37%",
            stack: [
              {
                text: "OFICINA DE SERVICIOS PUBLICOS DE CARURU",
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Acueducto:", width: "50%" },
                  { text: this.tabla.serv0.tot_acum_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Energia electrica:", width: "50%" },
                  { text: this.tabla.serv4.tot_acum_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Aseo:", width: "50%" },
                  { text: this.tabla.serv2.tot_acum_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Alcantarillado:", width: "50%" },
                  { text: this.tabla.serv1.tot_acum_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Alumbrado público:", width: "50%" },
                  { text: this.tabla.serv5.tot_acum_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Otros cobros:", width: "50%" },
                  { text: this.tabla.serv3.tot_acum_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Total servicios:", width: "50%" },
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
                  { text: new Intl.NumberFormat("ja-JP").format(this.reg_fact.llave), width: "30%", bold: true },
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
                  { text: this.nom_fac_w, width: "30%" },
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
                  { text: "VENCE:", width: "15%" },
                  { text: _editarFecha(this.reg_ctl.fecha_vence).toUpperCase(), width: "30%" },
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
            ],
          },
        ],
      },
      {
        marginTop: 7,
        marginLeft: 5,
        style: "left9",
        stack: [
          {
            marginTop: 5,
            alignment: "left",
            fontSize: 10,
            columns: [
              { text: "TOTAL FACTURA: ", width: "23.2%", bold: true },
              { text: this.tot_tot_w, width: "15%", bold: true, marginRight: 15, alignment: "right" },
            ],
          },
          {
            stack: [
              {
                margin: [0, 5, 0, 0],
                image: "cod_barras",
                width: 220,
                height: 50,
              },
            ],
            width: "50%",
          },
        ],
      },
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: -187,
            h: 192,
            w: 535,
          },
        ],
      },
    ];
  }

  async graficar(index) {
    return new Promise((resolve) => {
      let reg = {};
      if (index == 0) {
        reg = this.datos_graf_abajo;
      } else {
        reg = this.datos_graf_arriba;
      }

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

              if (index == 0) _this.graf_abajo = grafica.toBase64Image();
              else _this.graf_arriba = grafica.toBase64Image();
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

const imprimir_PUB205A = (params) => {
  var formato = new formato_PUB205A(params);
  formato._init();
};

module.exports = {
  imprimir_PUB205A,
};
