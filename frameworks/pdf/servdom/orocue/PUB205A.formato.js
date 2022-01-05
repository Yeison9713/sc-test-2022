// Imprime una factura OROCUE

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

    this.vlr_basico_w = 0;
    this.vlr_complem_w = 0;
    this.bruto_w = 0;
    this.consumo_w = 0;
    this.consumo2_w = 0;

    this.mes1_cal = 0;
    this.mes2_cal = "";
    this.datos_graf_arriba = [];
    this.datos_graf_abajo = [];
    this.graf_arriba = "";
    this.graf_abajo = "";
    this.estrato_l = null;
    this.tot_ant_w = {};
    this.cuotas_ref_w = "";
    this.medidor_l = "";
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
    await this.leerTarifas();

    this.tot_tot_w =
      format_op(this.tabla.serv0.tot_acum_w) +
      format_op(this.tabla.serv1.tot_acum_w) +
      format_op(this.tabla.serv2.tot_acum_w) +
      format_op(this.tabla.serv3.tot_acum_w) +
      format_op(this.tabla.serv4.tot_acum_w) +
      format_op(this.tabla.serv5.tot_acum_w);

    this.tot_tot_w = mascara_valor.resolve(this.tot_tot_w.toString());

    if (this.tot_refinan_w == 0) {
      this.tot_refinan_w = "";
    } else {
      this.tot_refinan_w = mascara_valor.resolve(this.tot_refinan_w.toString());
    }

    this.tabla.serv0.tot_acum_w = mascara_valor.resolve(this.tabla.serv0.tot_acum_w.toString());
    this.tabla.serv1.tot_acum_w = mascara_valor.resolve(this.tabla.serv1.tot_acum_w.toString());
    this.tabla.serv2.tot_acum_w = mascara_valor.resolve(this.tabla.serv2.tot_acum_w.toString());
    this.tabla.serv3.tot_acum_w = mascara_valor.resolve(this.tabla.serv3.tot_acum_w.toString());
    this.tabla.serv4.tot_acum_w = mascara_valor.resolve(this.tabla.serv4.tot_acum_w.toString());
    this.tabla.serv5.tot_acum_w = mascara_valor.resolve(this.tabla.serv5.tot_acum_w.toString());

    this.codigo_barras = `415${"0000900251955"}8020${this.reg_fact.llave}3900${format_op(this.tot_tot_w)}96${
      this.reg_ctl.fecha_vence
    }`;

    if (
      format_op(this.reg_fact.tabla.serv_tab[0].sdo_ant) > 2000 ||
      format_op(this.reg_fact.tabla.serv_tab[1].sdo_ant) > 2000 ||
      format_op(this.reg_fact.tabla.serv_tab[2].sdo_ant) > 2000 ||
      format_op(this.reg_fact.tabla.serv_tab[3].sdo_ant) > 2000 ||
      format_op(this.reg_fact.tabla.serv_tab[4].sdo_ant) > 2000
    ) {
      this.sello_corte = true;
    }

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
      }

      this.tot_refinan_w += format_op(this.reg_fact.tabla.serv_tab[i].refinanc_sdo);
      if (this.reg_fact.tabla.serv_tab[i].nro_cta > 0 && this.cuotas_ref_w == 0) {
        this.cuotas_ref_w = format_op(this.reg_fact.tabla.serv_tab[i].nro_cta);
      }

      this.consumo_w =
        format_op(this.reg_fact.tabla.serv_tab[i].lec_act_med) - format_op(this.reg_fact.tabla.serv_tab[i].lec_ant_med);

      if (this.reg_tar.medic == "S") {
        this.vlr_basico_w = Math.round(
          format_op(this.reg_tar.tabla[y].con_basi) * format_op(this.reg_fact.tabla.serv_tab[i].basico)
        );

        this.vlr_complem_w = Math.round(
          format_op(this.reg_tar.tabla[y].con_comp) * format_op(this.reg_fact.tabla.serv_tab[i].complem) +
            format_op(this.reg_tar.tabla[y].con_sunt) * format_op(this.reg_fact.tabla.serv_tab[i].suntuar)
        );
      } else {
        this.vlr_basico_w = format_op(this.reg_tar.tabla[y].con_basi);
        this.vlr_complem_w =
          format_op(this.reg_tar.tabla[y].con_comp) +
          format_op(this.reg_tar.tabla[y].con_sunt) +
          format_op(this.reg_tar.tabla[y].otro);
      }

      this.bruto_w =
        format_op(this.reg_tar.tabla[y].car_fijo) + format_op(this.vlr_basico_w) + format_op(this.vlr_complem_w);

      switch (i) {
        case 0:
          await this.llenarSectorAbajo(i, y);
          break;
        case 1:
          await this.llenarSectorAbajo(i, y);
          break;
        case 2:
          await this.llenarSectorAbajo(i, y);
          break;
        case 3:
          await this.llenarSectorAbajo(i, y);
          break;
        case 4:
          await this.llenarSectorArriba(i, y);
          break;
        case 5:
          await this.llenarSectorArriba(i, y);
          break;
      }
    }
  }

  async llenarSectorArriba(index, y) {
    this.tabla[`serv${index}`].tarifa = this.reg_fact.tabla.serv_tab[index].datos_tab[0].conc;

    if (index == 4) {
      this.tabla[`serv${index}`].lec_ant_med = mascara11.resolve(
        this.reg_fact.tabla.serv_tab[index].lec_ant_med.toString()
      );

      this.tabla[`serv${index}`].lec_act_med = mascara11.resolve(
        this.reg_fact.tabla.serv_tab[index].lec_act_med.toString()
      );

      this.tabla[`serv${index}`].consumo_w = mascara4_cant.resolve(this.consumo_w.toString());
      this.tabla[`serv${index}`].subsid_tar = this.reg_tar.tabla[y].subsid.toString();

      await this.buscarMedidor();
      this.tabla[`serv${index}`].medidor = this.medidor_l;
      await this.llenarGrafica(index);
    } else {
      this.tabla[`serv${index}`].lec_ant_med = mascara11.resolve(
        this.reg_fact.tabla.serv_tab[index].lec_ant_med.toString()
      );

      this.tabla[`serv${index}`].lec_act_med = mascara11.resolve(
        this.reg_fact.tabla.serv_tab[index].lec_act_med.toString()
      );

      this.tabla[`serv${index}`].consumo_w = mascara4_cant.resolve(this.consumo_w.toString());
      this.tabla[`serv${index}`].subsid_tar = this.reg_tar.tabla[y].subsid.toString();

      this.tabla[`serv${index}`].con_basi_tar = mascara9.resolve(this.reg_tar.tabla[y].con_basi.toString());
      this.tabla[`serv${index}`].basico = mascara7.resolve(this.reg_fact.tabla.serv_tab[index].basico.toString());
      this.tabla[`serv${index}`].con_comp_tar = mascara9.resolve(this.reg_tar.tabla[y].con_basi.toString());
      this.tabla[`serv${index}`].complem = mascara7.resolve(this.reg_fact.tabla.serv_tab[index].complem.toString());

      if (this.reg_tar.period == "S") {
        this.consumo2_w = Math.round(
          format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].vlr) /
            format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].cant)
        );
      }

      this.tabla[`serv${index}`].consumo2_w = mascara4_cant.resolve(this.consumo2_w.toString());
      this.tabla[`serv${index}`].subsid_tar = mascara4_cant.resolve(this.reg_tar.tabla[y].subsid.toString());

      let cuota_w =
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].cuota) +
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[1].cuota) +
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[2].cuota) +
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[3].cuota) +
        format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[4].cuota);

      if (cuota_w == 0) {
        cuota_w = this.reg_fact.tabla.serv_tab[index].nro_cta;
      }

      this.tabla[`serv${index}`].cuota_w = cuota_w.toString();
      this.tabla[`serv${index}`].descrip_tar = this.reg_tar.descrip.slice(0, 14);

      await this.buscarMedidor();
      this.tabla[`serv${index}`].medidor = this.medidor_l;
      await this.llenarGrafica(index);
    }

    this.tabla[
      `serv${index}`
    ].fecha = `${this.reg_fact.tabla.serv_tab[index].datos_tab[0].ano} ${this.reg_fact.tabla.serv_tab[index].datos_tab[0].mes}`;

    let cargo_fijo = Math.trunc(format_op(this.reg_tar.tabla[y].car_fijo));
    this.tabla[`serv${index}`].car_fijo = mascara_valor.resolve(cargo_fijo.toString());

    if (index == 4) {
      this.tabla[`serv${index}`].cant_kwh_1 =
        mascara11.resolve(this.reg_fact.tabla.serv_tab[index].basico.toString()) || "0.0";
      this.tabla[`serv${index}`].vlr_kwh_1 = mascara9.resolve(this.reg_tar.tabla[y].con_basi.toString()) || "0.0";
      this.tabla[`serv${index}`].cant_kwh_2 =
        mascara11.resolve(this.reg_fact.tabla.serv_tab[index].complem.toString()) || "0.0";
      this.tabla[`serv${index}`].vlr_kwh_2 = mascara9.resolve(this.reg_tar.tabla[y].con_comp.toString()) || "0.0";
    }

    this.tabla[`serv${index}`].con_basi = Math.trunc(format_op(this.vlr_basico_w));
    this.tabla[`serv${index}`].con_basi = mascara_valor.resolve(this.tabla[`serv${index}`].con_basi.toString());

    this.tabla[`serv${index}`].con_comp = Math.trunc(format_op(this.vlr_complem_w));
    this.tabla[`serv${index}`].con_comp = mascara_valor.resolve(this.tabla[`serv${index}`].con_comp.toString());

    this.tabla[`serv${index}`].cargo_mes = Math.trunc(format_op(this.bruto_w));
    this.tabla[`serv${index}`].cargo_mes = mascara_valor.resolve(this.tabla[`serv${index}`].cargo_mes.toString());

    let subsidio_w = format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].vlr) - format_op(this.bruto_w);
    subsidio_w = Math.trunc(format_op(subsidio_w));
    this.tabla[`serv${index}`].subsidio = mascara_valor.resolve(subsidio_w.toString());

    let otros_w =
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[1].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[2].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[3].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[4].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].refinanc_mes);

    this.tabla[`serv${index}`].neto = Math.trunc(format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].vlr));
    this.tabla[`serv${index}`].neto = mascara_valor.resolve(this.tabla[`serv${index}`].neto.toString());

    let anterior_w =
      format_op(this.reg_fact.tabla.serv_tab[index].sdo_ant) + format_op(this.reg_fact.tabla.serv_tab[index].int_ant);

    this.tabla[`serv${index}`].sdo_ant = Math.trunc(format_op(anterior_w));
    this.tabla[`serv${index}`].sdo_ant = mascara_valor.resolve(this.tabla[`serv${index}`].sdo_ant.toString());

    this.tot_ant_w += anterior_w;

    this.tabla[`serv${index}`].intereses = Math.trunc(format_op(this.reg_fact.tabla.serv_tab[index].int_mes));
    this.tabla[`serv${index}`].intereses = mascara_valor.resolve(this.tabla[`serv${index}`].intereses.toString());

    this.tabla[`serv${index}`].ajustes = Math.trunc(format_op(this.reg_fact.tabla.serv_tab[index].ajustes));
    this.tabla[`serv${index}`].ajustes = mascara_valor.resolve(this.tabla[`serv${index}`].ajustes.toString());

    this.tabla[`serv${index}`].cuota_ref = Math.trunc(format_op(otros_w));
    this.tabla[`serv${index}`].cuota_ref = mascara_valor.resolve(this.tabla[`serv${index}`].cuota_ref.toString());

    let tot_ser_w =
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[1].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[2].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[3].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[4].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].int_mes) +
      format_op(this.reg_fact.tabla.serv_tab[index].ajustes) +
      format_op(this.reg_fact.tabla.serv_tab[index].refinanc_mes);

    tot_ser_w += format_op(this.reg_fact.tabla.serv_tab[index].sdo_ant);
    tot_ser_w += format_op(this.reg_fact.tabla.serv_tab[index].int_ant);

    this.tabla[`serv${index}`].tot_ser = Math.trunc(format_op(tot_ser_w));
    this.tabla[`serv${index}`].tot_ser = mascara_valor.resolve(this.tabla[`serv${index}`].tot_ser.toString());

    this.tabla[`serv${index}`].tot_acum_w = Math.trunc(format_op(tot_ser_w));
    this.tabla[`serv${index}`].tot_acum_w = mascara_valor.resolve(this.tabla[`serv${index}`].tot_acum_w.toString());
  }

  async llenarSectorAbajo(index, y) {
    this.tabla[`serv${index}`].tarifa = this.reg_fact.tabla.serv_tab[index].datos_tab[0].conc;

    this.tabla[`serv${index}`].car_fijo = mascara_valor.resolve(
      Math.trunc(format_op(this.reg_tar.tabla[y].car_fijo)).toString()
    );

    this.tabla[`serv${index}`].con_basi = mascara_valor.resolve(Math.trunc(format_op(this.vlr_basico_w)).toString());

    this.tabla[`serv${index}`].con_comp = mascara_valor.resolve(Math.trunc(format_op(this.vlr_complem_w)).toString());

    this.tabla[`serv${index}`].cargo_mes = mascara_valor.resolve(Math.trunc(format_op(this.bruto_w)).toString());

    let subsidio_w = format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].vlr) - format_op(this.bruto_w);
    this.tabla[`serv${index}`].subsidio = mascara_valor.resolve(Math.trunc(format_op(subsidio_w)).toString());

    this.tabla[`serv${index}`].neto = mascara_valor.resolve(
      Math.trunc(format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].vlr)).toString()
    );

    let otros_w =
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[1].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[2].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[3].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[4].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].refinanc_mes) +
      format_op(this.reg_fact.tabla.serv_tab[index].ajustes);

    let anterior_w =
      format_op(this.reg_fact.tabla.serv_tab[index].sdo_ant) + format_op(this.reg_fact.tabla.serv_tab[index].int_ant);
    this.tabla[`serv${index}`].sdo_ant = mascara_valor.resolve(Math.trunc(format_op(anterior_w)).toString());

    this.tot_ant_w += anterior_w;

    this.tabla[`serv${index}`].intereses = mascara_valor.resolve(
      Math.trunc(format_op(this.reg_fact.tabla.serv_tab[index].int_mes)).toString()
    );

    this.tabla[`serv${index}`].ajustes = mascara_valor.resolve(Math.trunc(format_op(otros_w)).toString());
    this.tabla[`serv${index}`].cuota_ref = mascara_valor.resolve(Math.trunc(format_op(otros_w)).toString());

    let tot_ser_w =
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[0].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[1].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[2].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[3].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].datos_tab[4].vlr) +
      format_op(this.reg_fact.tabla.serv_tab[index].int_mes) +
      format_op(this.reg_fact.tabla.serv_tab[index].ajustes) +
      format_op(this.reg_fact.tabla.serv_tab[index].refinanc_mes);

    tot_ser_w += format_op(this.reg_fact.tabla.serv_tab[index].sdo_ant);
    tot_ser_w += format_op(this.reg_fact.tabla.serv_tab[index].int_ant);

    this.tabla[`serv${index}`].tot_ser = mascara_valor.resolve(Math.trunc(format_op(tot_ser_w)).toString());

    this.tabla[`serv${index}`].tot_acum_w = mascara_valor.resolve(Math.trunc(format_op(tot_ser_w)).toString());
  }

  async buscarMedidor() {
    for (let x = 0; x < 10; x++) {
      if (this.reg_usuar_ser) {
        if (
          this.reg_tar.serv == this.reg_usuar_ser.tabla_serv[x].serv &&
          this.reg_tar.estrato == this.reg_usuar_ser.tabla_serv[x].estr &&
          this.reg_tar.tarifa == this.reg_usuar_ser.tabla_serv[x].tari
        ) {
          this.medidor_l = this.reg_usuar_ser.tabla_serv[x].med;
          x = 10;
        }
      } else x = 10;
    }
  }

  async llenarGrafica(index) {
    // GRAFICA DE 6 MESES
    this.mes1_cal = 0;
    this.mes2_cal = 0;
    let mes_w = parseInt(this.nom_fac_w.slice(4)) - 1;
    if (mes_w > 6) this.mes1_cal = mes_w - 6;
    else this.mes1_cal = 12 - 6 + mes_w;

    for (let i = 0; i < 6; i++) {
      if (i > 0) this.mes1_cal += 1;

      this.calcularMesConsumo(this.mes1_cal);

      if (index == 5) {
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
      pageMargins: [20, 135, 20, 40],
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
                      marginTop: 1,
                      stack: [
                        {
                          columns: [
                            { text: "FACTURA: ", bold: true, width: "8%" },
                            { text: new Intl.NumberFormat("ja-JP").format(this.reg_fact.llave), width: "37%" },
                            { text: "FECHA FACT: ", width: "10%" },
                            { text: _editarFecha(this.reg_ctl.fecha_exp).toUpperCase(), width: "21%" },
                            { text: "FECHA LIMITE: ", width: "11%" },
                            { text: _editarFecha(this.reg_ctl.fecha_vence).toUpperCase(), width: "13%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "Periodo: ", width: "8%" },
                            { text: this.periodo_edit, width: "37%" },
                            { text: "Estrato: ", width: "10%" },
                            { text: this.estrato_l, width: "21%" },
                            { text: "NUIU: ", width: "5%" },
                            { text: this.reg_fact.cat, width: "19%" },
                          ],
                        },
                        {
                          marginTop: 3,
                          columns: [
                            { text: "Usuario: ", width: "8%" },
                            { text: this.reg_fact.nombre, width: "37%" },
                            { text: "Dirección: ", width: "10%" },
                            { text: this.reg_fact.direcc, width: "45%" },
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
        style: "left8",
        columns: [
          {
            marginLeft: 5,
            width: "52%",
            stack: [
              {
                stack: [
                  {
                    columns: [
                      { text: "ENERGIA", width: "18%", bold: true },
                      { text: `Tarifa: ${this.tabla.serv4.tarifa}`, width: "40%", bold: true },
                      { text: `MEDIDOR: ${this.tabla.serv4.medidor}` },
                    ],
                  },
                  {
                    marginTop: 2,
                    columns: [
                      { text: this.tabla.serv4.fecha, width: "18%" },
                      { text: `Lect Anterior: ${this.tabla.serv4.lec_ant_med}`, width: "40%" },
                      { text: `Consumo mes: ${this.tabla.serv4.consumo_w}` },
                    ],
                  },
                  {
                    marginTop: 2,
                    columns: [
                      { text: "", width: "18%" },
                      { text: `Lect Actual: ${this.tabla.serv4.lec_act_med}`, width: "40%" },
                      { text: "Cant Kwh", width: "21%" },
                      { text: "Vlr Kwh", width: "21%", alignment: "right" },
                    ],
                  },
                ],
              },
              {
                marginTop: 5,
                columns: [
                  {
                    width: "55%",
                    table: {
                      widths: ["65%", "35%"],
                      body: [
                        [{ text: "Consumo estimado" }, { text: this.tabla.serv4.car_fijo, alignment: "right" }],
                        [{ text: "Consumo Basico" }, { text: this.tabla.serv4.con_basi, alignment: "right" }],
                        [{ text: "Consumo Complement." }, { text: this.tabla.serv4.con_comp, alignment: "right" }],
                        [{ text: "Total cargos mes" }, { text: this.tabla.serv4.cargo_mes, alignment: "right" }],
                        [
                          {
                            columns: [
                              { text: "Subsidio/contrib", width: "65%" },
                              { text: this.tabla.serv4.subsid_tar + "%", alignment: "right" },
                            ],
                          },
                          { text: this.tabla.serv4.subsidio, alignment: "right" },
                        ],
                        [{ text: "Total consumo facturado" }, { text: this.tabla.serv4.neto, alignment: "right" }],
                        [{ text: "Saldo anterior" }, { text: this.tabla.serv4.sdo_ant, alignment: "right" }],
                        [{ text: "Intereses mora" }, { text: this.tabla.serv4.intereses, alignment: "right" }],
                        [{ text: "Ajustes" }, { text: this.tabla.serv4.ajustes, alignment: "right" }],
                        [{ text: "Cuota refinanciación" }, { text: this.tabla.serv4.cuota_ref, alignment: "right" }],
                        [{ text: "Total energia" }, { text: this.tabla.serv4.tot_ser, alignment: "right" }],
                      ],
                    },
                    layout: "noBorders",
                  },
                  {
                    text: "",
                    width: "1%",
                  },
                  {
                    marginLeft: 5,
                    width: "42%",
                    stack: [
                      {
                        table: {
                          widths: ["50%", "50%"],
                          body: [
                            [
                              { text: this.tabla.serv4.cant_kwh_1 },
                              { text: this.tabla.serv4.vlr_kwh_1, alignment: "right" },
                            ],
                            [
                              { text: this.tabla.serv4.cant_kwh_2 },
                              { text: this.tabla.serv4.vlr_kwh_2, alignment: "right" },
                            ],
                          ],
                        },
                        layout: "noBorders",
                      },
                      {
                        stack: [
                          {
                            marginTop: 2,
                            text: "Gas",
                            alignment: "right",
                          },
                          {
                            marginTop: 3,
                            image: this.graf_arriba,
                            width: 121,
                            height: 70,
                          },
                        ],
                      },
                      {
                        stack: [
                          {
                            marginTop: 2,
                            text: "Energia",
                            alignment: "right",
                          },
                          {
                            marginTop: 3,
                            image: this.graf_abajo,
                            width: 121,
                            height: 70,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            text: "",
            width: "1%",
          },
          {
            marginRight: 5,
            width: "46%",
            stack: [
              {
                stack: [
                  {
                    columns: [
                      { text: "GAS NATURAL DOMICILIARIO", width: "63%", bold: true },
                      { text: `USO: ${this.tabla.serv5.descrip_tar}` },
                    ],
                  },
                  {
                    marginTop: 2,
                    columns: [
                      { text: this.tabla.serv5.fecha, width: "18%" },
                      { text: `Lect Anterior: ${this.tabla.serv5.lec_ant_med}`, width: "45%" },
                      { text: `Medidor: ${this.tabla.serv5.medidor}` },
                    ],
                  },
                  {
                    marginTop: 2,
                    columns: [
                      { text: "", width: "18%" },
                      { text: `Lect Actual: ${this.tabla.serv5.lec_act_med}`, width: "45%" },
                      { text: `Consumo: ${this.tabla.serv5.consumo_w}` },
                    ],
                  },
                ],
              },
              {
                marginTop: 5,
                table: {
                  widths: ["44.5%", "20%", "16%", "22%"],
                  body: [
                    [
                      { text: "Cargo Fijo" },
                      { text: "" },
                      { text: "" },
                      { text: this.tabla.serv5.car_fijo, alignment: "right" },
                    ],
                    [
                      { text: "Costo prest de serv 0-20m3" },
                      { text: this.tabla.serv5.con_basi_tar, alignment: "right" },
                      { text: this.tabla.serv5.basico, alignment: "right" },
                      { text: this.tabla.serv5.consumo2_w, alignment: "right" },
                    ],
                    [
                      { text: "MV>20 m3" },
                      { text: this.tabla.serv5.con_comp_tar, alignment: "right" },
                      { text: this.tabla.serv5.complem, alignment: "right" },
                      { text: this.tabla.serv5.con_comp, alignment: "right" },
                    ],
                    [
                      { text: "Cargo mes" },
                      { text: "" },
                      { text: "" },
                      { text: this.tabla.serv5.cargo_mes, alignment: "right" },
                    ],
                    [
                      { text: "Subsidio/contrib" },
                      { text: "" },
                      { text: this.tabla.serv5.subsid_tar + "%", alignment: "right" },
                      { text: this.tabla.serv5.subsidio, alignment: "right" },
                    ],
                    [{ text: "Neto" }, { text: "" }, { text: "" }, { text: this.tabla.serv5.neto, alignment: "right" }],
                    [
                      { text: "Saldo anterior" },
                      { text: "" },
                      { text: "" },
                      { text: this.tabla.serv5.sdo_ant, alignment: "right" },
                    ],
                    [
                      { text: "Intereses" },
                      { text: "" },
                      { text: "" },
                      { text: this.tabla.serv5.intereses, alignment: "right" },
                    ],
                    [
                      { text: "Ajustes" },
                      { text: "" },
                      { text: "" },
                      { text: this.tabla.serv5.ajustes, alignment: "right" },
                    ],
                    [
                      { text: "Instalaciones y otros" },
                      { text: `cuota prend: ${this.tabla.serv5.cuota_w}`, colSpan: 2 },
                      { text: "" },
                      { text: this.tabla.serv5.cuota_ref, alignment: "right" },
                    ],
                    [
                      { text: "Total Gas", bold: true },
                      { text: "" },
                      { text: "" },
                      { text: this.tabla.serv5.tot_ser, alignment: "right", bold: true },
                    ],
                  ],
                },
                layout: "noBorders",
              },
              {
                stack: this.sello_corte
                  ? [
                      {
                        marginTop: -5,
                        alignment: "center",
                        image:
                          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAABwCAYAAAAgyT8PAAAABGdBTUEAALGeYUxB9wAAACBjSFJNAACHEAAAjBIAAP1NAACBPgAAWesAARIPAAA85gAAGc66ySIyAAABJmlDQ1BBZG9iZSBSR0IgKDE5OTgpAAAoz2NgYDJwdHFyZRJgYMjNKykKcndSiIiMUmA/z8DGwMwABonJxQWOAQE+IHZefl4qAwb4do2BEURf1gWZxUAa4EouKCoB0n+A2CgltTiZgYHRAMjOLi8pAIozzgGyRZKywewNIHZRSJAzkH0EyOZLh7CvgNhJEPYTELsI6Akg+wtIfTqYzcQBNgfClgGxS1IrQPYyOOcXVBZlpmeUKBhaWloqOKbkJ6UqBFcWl6TmFit45iXnFxXkFyWWpKYA1ULcBwaCEIWgENMAarTQZKAyAMUDhPU5EBy+jGJnEGIIkFxaVAZlMjIZE+YjzJgjwcDgv5SBgeUPQsykl4FhgQ4DA/9UhJiaIQODgD4Dw745AMDGT/0ZOjZcAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAJSWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDUgNzkuMTY0NTkwLCAyMDIwLzEyLzA5LTExOjU3OjQ0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjY5ZGY3MTJhLTUxYmQtNmI0Yy1iZTk0LWYwOWQxNWZhNGY5OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmYTAzOWI4MS05Nzk4LTgxNGMtOTkwMi1lZWJmZDRmOTk1MzkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iQkZDNUQ5NURBMDQ5ODExRTgwMDM0NTIyN0E3MkQxMkUiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iIiB0aWZmOkltYWdlV2lkdGg9IjExNyIgdGlmZjpJbWFnZUxlbmd0aD0iMTEyIiB0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb249IjIiIHRpZmY6U2FtcGxlc1BlclBpeGVsPSIzIiB0aWZmOlhSZXNvbHV0aW9uPSI5Ni8xIiB0aWZmOllSZXNvbHV0aW9uPSI5Ni8xIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiBleGlmOkV4aWZWZXJzaW9uPSIwMjMxIiBleGlmOkNvbG9yU3BhY2U9IjY1NTM1IiBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTE3IiBleGlmOlBpeGVsWURpbWVuc2lvbj0iMTEyIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wMy0wOFQxNTo1NDoyNS0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDMtMDhUMTU6NTU6MTMtMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMDMtMDhUMTU6NTU6MTMtMDU6MDAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0YjY2NTYwZC1kODkzLTEyNGMtODJhNS0wNWM4ZTBjNTBiOTYiIHN0RXZ0OndoZW49IjIwMjEtMDMtMDhUMTU6NTU6MTMtMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4xIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL2pwZWcgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9qcGVnIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZmEwMzliODEtOTc5OC04MTRjLTk5MDItZWViZmQ0Zjk5NTM5IiBzdEV2dDp3aGVuPSIyMDIxLTAzLTA4VDE1OjU1OjEzLTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRiNjY1NjBkLWQ4OTMtMTI0Yy04MmE1LTA1YzhlMGM1MGI5NiIgc3RSZWY6ZG9jdW1lbnRJRD0iQkZDNUQ5NURBMDQ5ODExRTgwMDM0NTIyN0E3MkQxMkUiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0iQkZDNUQ5NURBMDQ5ODExRTgwMDM0NTIyN0E3MkQxMkUiLz4gPHRpZmY6Qml0c1BlclNhbXBsZT4gPHJkZjpTZXE+IDxyZGY6bGk+ODwvcmRmOmxpPiA8cmRmOmxpPjg8L3JkZjpsaT4gPHJkZjpsaT44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",
                        width: 60,
                      },
                    ]
                  : [],
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
            y: -238,
            h: 242,
            w: 555,
          },
        ],
      },
      {
        marginTop: 5,
        style: "left8",
        columns: [
          {
            width: "24%",
            table: {
              widths: ["55%", "45%"],
              body: [
                [
                  { text: "ACUEDUCTO", bold: true },
                  { text: `Tarifa: ${this.tabla.serv0.tarifa}`, alignment: "right" },
                ],
                [{ text: "Cargo Fijo" }, { text: this.tabla.serv0.car_fijo, alignment: "right" }],
                [
                  { text: "Consumo Basico", width: "75%" },
                  { text: this.tabla.serv0.con_basi, alignment: "right" },
                ],
                [
                  { text: "Consumo Comp", width: "75%" },
                  { text: this.tabla.serv0.con_comp, alignment: "right" },
                ],
                [{ text: "Cargo Mes" }, { text: this.tabla.serv0.cargo_mes, alignment: "right" }],
                [{ text: "Susidio/Contrib" }, { text: this.tabla.serv0.subsidio, alignment: "right" }],
                [{ text: "Neto" }, { text: this.tabla.serv0.neto, alignment: "right" }],
                [{ text: "Saldo Anterior" }, { text: this.tabla.serv0.sdo_ant, alignment: "right" }],
                [{ text: "Intereses" }, { text: this.tabla.serv0.intereses, alignment: "right" }],
                [{ text: "Ajustes" }, { text: this.tabla.serv0.ajustes, alignment: "right" }],
                [{ text: "Cuota refinanc" }, { text: this.tabla.serv0.cuota_ref, alignment: "right" }],
                [
                  { text: "TOTAL ACUEDUCTO", bold: true },
                  { text: this.tabla.serv0.tot_ser, alignment: "right", bold: true, marginTop: 5 },
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
                if (i % 2 == 1) return "#E4E5E8";
                else return "white";
              },
            },
          },
          {
            text: "",
            width: "1%",
          },
          {
            width: "23%",
            table: {
              widths: ["56%", "45%"],
              body: [
                [
                  { text: "ASEO", bold: true },
                  { text: `Tarifa: ${this.tabla.serv2.tarifa}`, alignment: "right" },
                ],
                [{ text: "Cargo Fijo" }, { text: this.tabla.serv2.car_fijo, alignment: "right" }],
                [
                  { text: "Consumo Basico", width: "75%" },
                  { text: this.tabla.serv2.con_basi, alignment: "right" },
                ],
                [
                  { text: "Consumo Comp", width: "75%" },
                  { text: this.tabla.serv2.con_comp, alignment: "right" },
                ],
                [{ text: "Cargo Mes" }, { text: this.tabla.serv2.cargo_mes, alignment: "right" }],
                [{ text: "Susidio/Contrib" }, { text: this.tabla.serv2.subsidio, alignment: "right" }],
                [{ text: "Neto" }, { text: this.tabla.serv2.neto, alignment: "right" }],
                [{ text: "Saldo Anterior" }, { text: this.tabla.serv2.sdo_ant, alignment: "right" }],
                [{ text: "Intereses" }, { text: this.tabla.serv2.intereses, alignment: "right" }],
                [{ text: "Ajustes" }, { text: this.tabla.serv2.ajustes, alignment: "right" }],
                [{ text: "Cuota refinanc" }, { text: this.tabla.serv2.cuota_ref, alignment: "right" }],
                [
                  { text: "TOTAL \n ASEO", bold: true },
                  { text: this.tabla.serv2.tot_ser, alignment: "right", bold: true, marginTop: 5 },
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
                if (i % 2 == 1) return "#E4E5E8";
                else return "white";
              },
            },
          },
          {
            text: "",
            width: "1%",
          },
          {
            width: "25.5%",
            table: {
              widths: ["57%", "43%"],
              body: [
                [
                  { text: "ALCANTARILLADO", bold: true },
                  { text: `Tarifa: ${this.tabla.serv1.tarifa}`, alignment: "right" },
                ],
                [{ text: "Cargo Fijo" }, { text: this.tabla.serv1.car_fijo, alignment: "right" }],
                [
                  { text: "Consumo Basico", width: "75%" },
                  { text: this.tabla.serv1.con_basi, alignment: "right" },
                ],
                [
                  { text: "Consumo Comp", width: "75%" },
                  { text: this.tabla.serv1.con_comp, alignment: "right" },
                ],
                [{ text: "Cargo Mes" }, { text: this.tabla.serv1.cargo_mes, alignment: "right" }],
                [{ text: "Susidio/Contrib" }, { text: this.tabla.serv1.subsidio, alignment: "right" }],
                [{ text: "Neto" }, { text: this.tabla.serv1.neto, alignment: "right" }],
                [{ text: "Saldo Anterior" }, { text: this.tabla.serv1.sdo_ant, alignment: "right" }],
                [{ text: "Intereses" }, { text: this.tabla.serv1.intereses, alignment: "right" }],
                [{ text: "Ajustes" }, { text: this.tabla.serv1.ajustes, alignment: "right" }],
                [{ text: "Cuota refinanc" }, { text: this.tabla.serv1.cuota_ref, alignment: "right" }],
                [
                  { text: "TOTAL ALCANTARILLADO", bold: true },
                  { text: this.tabla.serv1.tot_ser, alignment: "right", bold: true, marginTop: 5 },
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
                if (i % 2 == 1) return "#E4E5E8";
                else return "white";
              },
            },
          },
          {
            text: "",
            width: "1%",
          },
          {
            width: "24%",
            table: {
              widths: ["59%", "43%"],
              body: [
                [
                  { text: "OTROS SERVICIOS", bold: true },
                  { text: `Tarifa: ${this.tabla.serv3.tarifa}`, alignment: "right" },
                ],
                [{ text: "Cargo Fijo" }, { text: this.tabla.serv3.car_fijo, alignment: "right" }],
                [
                  { text: "Consumo Basico", width: "75%" },
                  { text: this.tabla.serv3.con_basi, alignment: "right" },
                ],
                [
                  { text: "Consumo Comp", width: "75%" },
                  { text: this.tabla.serv3.con_comp, alignment: "right" },
                ],
                [{ text: "Cargo Mes" }, { text: this.tabla.serv3.cargo_mes, alignment: "right" }],
                [{ text: "Susidio/Contrib" }, { text: this.tabla.serv3.subsidio, alignment: "right" }],
                [{ text: "Neto" }, { text: this.tabla.serv3.neto, alignment: "right" }],
                [{ text: "Saldo Anterior" }, { text: this.tabla.serv3.sdo_ant, alignment: "right" }],
                [{ text: "Intereses" }, { text: this.tabla.serv3.intereses, alignment: "right" }],
                [{ text: "Ajustes" }, { text: this.tabla.serv3.ajustes, alignment: "right" }],
                [{ text: "Cuota refinanc" }, { text: this.tabla.serv3.cuota_ref, alignment: "right" }],
                [
                  { text: "TOTAL \n OTROS", bold: true },
                  { text: this.tabla.serv3.tot_ser, alignment: "right", bold: true, marginTop: 5 },
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
                if (i % 2 == 1) return "#E4E5E8";
                else return "white";
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
              {
                marginTop: 5,
                columns: [
                  { text: `Saldo refinanciación: ${this.tot_refinan_w}` },
                  { text: `CUOTAS: ${this.cuotas_ref_w}` },
                ],
              },
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
                  { text: this.tabla.serv0.tot_acum_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Energia electrica:", width: "50%", bold: true },
                  { text: this.tabla.serv4.tot_acum_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Aseo:", width: "50%", bold: true },
                  { text: this.tabla.serv2.tot_acum_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Alcantarillado:", width: "50%", bold: true },
                  { text: this.tabla.serv1.tot_acum_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Gas domiciliario:", width: "50%", bold: true },
                  { text: this.tabla.serv5.tot_acum_w, alignment: "right", width: "45%" },
                ],
              },
              {
                marginTop: 3,
                columns: [
                  { text: "Otros cobros:", width: "50%", bold: true },
                  { text: this.tabla.serv3.tot_acum_w, alignment: "right", width: "45%" },
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
                marginTop: 3,
                columns: [
                  { text: "Total servicios:", width: "50%", bold: true },
                  { text: this.tot_tot_w, alignment: "right", width: "45%" },
                ],
              },
              {
                fontSize: 12,
                bold: true,
                marginTop: 8,
                columns: [
                  { text: "TOTAL FACTURA:", width: "50%" },
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
                  { text: "FECHA LIMITE PAGO:", width: "29%" },
                  { text: _editarFecha(this.reg_ctl.fecha_vence).toUpperCase(), width: "21%" },
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
                    width: 220,
                    height: 50,
                  },
                ],
                width: "50%",
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
            y: -158,
            h: 165,
            w: 555,
          },
        ],
      },
      {
        marginTop: 3,
        fontSize: 8,
        bold: true,
        text: "Direccion: Carrera 4 No 3-24 B/Centro                    Telefono: 311-204-418                 Email: facturacion@empresaserviciospublicos-orocue-casanare.gov.co",
      },
    ];
  }

  async graficar(index) {
    return new Promise((resolve) => {
      let reg = {};
      if (index == 4) {
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

              if (index == 4) _this.graf_abajo = grafica.toBase64Image();
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

const imprimir_PUB205A = async (params) => {
  var formato = new formato_PUB205A(params);
  formato._init();
};

module.exports = {
  imprimir_PUB205A,
};
