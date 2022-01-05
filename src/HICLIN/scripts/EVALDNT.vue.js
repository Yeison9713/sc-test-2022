module.exports = Vue.component("content_hc832a", {
  props: {
    params: {},
    data: {},
  },
  data() {
    return {
      evaldnt: this.data,
      anio_inscrito_cyd: "",
      mes_inscrito_cyd: "",
      dia_inscrito_cyd: "",
      array_manejo_dnt: [
        { COD: "1", DESCRIP: "Hospitalarios" },
        { COD: "2", DESCRIP: "Domiciliarios" },
        { COD: "3", DESCRIP: "No aplica" },
      ],
      array_resultado_apetito: [
        { COD: "1", DESCRIP: "Positivo" },
        { COD: "2", DESCRIP: "Negativo" },
      ],
      tabla_controles_w: [
        { anio_control: "", mes_control: "", dia_control: "" },
        { anio_control: "", mes_control: "", dia_control: "" },
        { anio_control: "", mes_control: "", dia_control: "" },
        { anio_control: "", mes_control: "", dia_control: "" },
        { anio_control: "", mes_control: "", dia_control: "" },
      ],
      anio_pediatria: "",
      mes_pediatria: "",
      dia_pediatria: "",
      anio_nutricion: "",
      mes_nutricion: "",
      dia_nutricion: "",
      textos: { apetito: "", manejo_dnt: "" },
    };
  },
  watch: {
    "params.estado": function (estado) {
      if (estado) this.validar_Dato_edema();
    },
    "evaldnt.apetito": function (newValue) {
      const busqueda = this.array_resultado_apetito.find((x) => x.COD == newValue);
      this.textos.apetito = busqueda["COD"] ? busqueda["COD"] + " . " + busqueda["DESCRIP"] : "";
    },
    "evaldnt.manejo_dnt": function (newValue) {
      const busqueda = this.array_manejo_dnt.find((x) => parseInt(x.COD) == parseInt(newValue));
      this.textos.manejo_dnt = busqueda["COD"] ? busqueda["COD"] + " . " + busqueda["DESCRIP"] : "";
    },
  },
  created() {
    this.llenar_componente();
  },
  methods: {
    llenar_componente() {
      [this.anio_pediatria, this.mes_pediatria, this.dia_pediatria] = this.devolverFecha(this.evaldnt.fecha_pediatria);
      [this.anio_nutricion, this.mes_nutricion, this.dia_nutricion] = this.devolverFecha(this.evaldnt.fecha_nutricion);
      [this.anio_inscrito_cyd, this.mes_inscrito_cyd, this.dia_inscrito_cyd] = this.devolverFecha(this.evaldnt.fecha_inscrito_cyd);

      [this.tabla_controles_w[0].anio_control, this.tabla_controles_w[0].mes_control, this.tabla_controles_w[0].dia_control] = this.devolverFecha(
        this.evaldnt.tabla_controles[0].fecha_controles
      );
      [this.tabla_controles_w[1].anio_control, this.tabla_controles_w[1].mes_control, this.tabla_controles_w[1].dia_control] = this.devolverFecha(
        this.evaldnt.tabla_controles[1].fecha_controles
      );
      [this.tabla_controles_w[2].anio_control, this.tabla_controles_w[2].mes_control, this.tabla_controles_w[2].dia_control] = this.devolverFecha(
        this.evaldnt.tabla_controles[2].fecha_controles
      );
      [this.tabla_controles_w[3].anio_control, this.tabla_controles_w[3].mes_control, this.tabla_controles_w[3].dia_control] = this.devolverFecha(
        this.evaldnt.tabla_controles[3].fecha_controles
      );
      [this.tabla_controles_w[4].anio_control, this.tabla_controles_w[4].mes_control, this.tabla_controles_w[4].dia_control] = this.devolverFecha(
        this.evaldnt.tabla_controles[4].fecha_controles
      );

      const busqueda_man = this.array_manejo_dnt.find((x) => x.COD == this.evaldnt.manejo_dnt);
      this.textos.manejo_dnt = busqueda_man.COD ? busqueda_man.COD + " . " + busqueda_man.DESCRIP : "";

      const busqueda_ape = this.array_resultado_apetito.find((x) => x.COD == this.evaldnt.apetito);
      this.textos.apetito = busqueda_ape.COD ? busqueda_ape.COD + " . " + busqueda_ape.DESCRIP : "";

      console.log(this.tabla_controles_w)
    },
    devolverSN(val) {
      return val.toUpperCase().trim() == "S" ? "S" : "N";
    },
    devolverFecha(fecha) {
      let ano = (mes = dia = "");
      if (fecha) {
        ano = parseInt(fecha.substring(0, 4)) || "";
        mes = parseInt(fecha.substring(4, 6)).toString().padStart(2, "0") || "";
        dia = parseInt(fecha.substring(6, 8)).toString().padStart(2, "0") || "";
      }
      return [ano, mes, dia];
    },
    validarFecha(tipo, dato = parseInt(dato)) {
      let retorno = false;
      switch (tipo) {
        case "anio":
          if (dato == 0 || dato < 2000 || dato > new Date().getFullYear()) CON851("03", "Año no valido", null, "error", "Error");
          else retorno = true;
          break;
        case "mes":
          if (dato < 1 || dato > 12) CON851("03", "Mes no valido", null, "error", "Error");
          else retorno = true;
          break;
        case "dia":
          if (dato < 1 || dato > 31) CON851("03", "Día no valido", null, "error", "Error");
          else retorno = true;
          break;
        case "fin":
          let date = _validarFecha(dato.substring(0, 4), dato.substring(4, 6), dato.substring(6, 8));
          console.log(date, dato);
          if (!date || dato > parseInt(moment().format("YYYYMMDD"))) CON851("37", "37", null, "error", "Error");
          else retorno = true;
          break;
        default:
          break;
      }
      return retorno;
    },
    validar_Dato_edema() {
      validarInputs(
        {
          form: "#dato_edema",
          orden: "1",
        },
        this._escape,
        () => {
          this.evaldnt.edema = this.devolverSN(this.evaldnt.edema).toUpperCase();
          this.validar_Dato_apetito();
        }
      );
    },
    validar_Dato_apetito() {
      let _this = this;
      POPUP(
        {
          titulo: "Resultado Apetito",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: _this.array_resultado_apetito,
          callback_f: _this.validar_Dato_edema,
          seleccion: _this.evaldnt.apetito,
          teclaAlterna: true,
        },
        async (data) => {
          _this.evaldnt.apetito = data.COD;
          _this.validar_Dato_nrocontroles();
        }
      );
    },
    validar_Dato_nrocontroles() {
      validarInputs(
        {
          form: "#dato_nro_controles",
          orden: "1",
        },
        () => {
          this.validar_Dato_apetito();
        },
        () => {
          let nro_controles = parseInt(this.evaldnt.nro_controles) || 0;
          if (nro_controles == 0 && $_USUA_GLOBAL[0] == 800037979) {
            this.validar_Dato_nrocontroles();
          } else this.validar_Dato_manejo_dnt();
        }
      );
    },
    validar_Dato_manejo_dnt() {
      let _this = this;
      POPUP(
        {
          titulo: "Manejo DNT",
          indices: [{ id: "COD", label: "DESCRIP" }],
          array: _this.array_manejo_dnt,
          callback_f: _this.validar_Dato_nrocontroles,
          seleccion: _this.evaldnt.manejo_dnt,
          teclaAlterna: true,
        },
        (data) => {
          _this.evaldnt.manejo_dnt = data.COD;
          _this.validar_Dato_inscritocyd();
        }
      );
    },
    validar_Dato_inscritocyd() {
      validarInputs(
        {
          form: "#dato_inscritocyd",
          orden: "1",
        },
        () => {
          setTimeout(() => this.validar_Dato_manejo_dnt(), 400);
        },
        () => {
          this.evaldnt.inscrito_cyd = this.devolverSN(this.evaldnt.inscrito_cyd).toUpperCase();
          this.evaldnt.inscrito_cyd == "S"
            ? this.validar_Dato_anio_cyd()
            : ((this.anio_inscrito_cyd = this.mes_inscrito_cyd = this.dia_inscrito_cyd = ""), this.validar_Dato_anio_semana1());
        }
      );
    },
    validar_Dato_anio_cyd() {
      validarInputs(
        {
          form: "#dato_anio_inscrito_cyd",
          orden: "1",
        },
        this.validar_Dato_inscritocyd,
        () => {
          let anio = parseInt(this.anio_inscrito_cyd) || 0;
          if (anio == 0) this.validar_Dato_anio_cyd();
          else this.validarFecha("anio", anio) ? this.validar_Dato_mes_cyd() : this.validar_Dato_anio_cyd();
        }
      );
    },
    validar_Dato_mes_cyd() {
      validarInputs(
        {
          form: "#dato_mes_inscrito_cyd",
          orden: "1",
        },
        this.validar_Dato_anio_cyd,
        () => {
          let mes = parseInt(this.mes_inscrito_cyd) || 0;
          this.mes_inscrito_cyd = this.mes_inscrito_cyd.padStart(2, "0");
          if (mes == 0) this.validar_Dato_mes_cyd();
          else this.validarFecha("mes", mes) ? this.validar_Dato_dia_cyd() : this.validar_Dato_mes_cyd();
        }
      );
    },
    validar_Dato_dia_cyd() {
      validarInputs(
        {
          form: "#dato_dia_inscrito_cyd",
          orden: "1",
        },
        this.validar_Dato_mes_cyd,
        () => {
          let dia = parseInt(this.dia_inscrito_cyd) || 0;
          this.dia_inscrito_cyd = this.dia_inscrito_cyd.padStart(2, "0");
          let fecha = `${this.anio_inscrito_cyd}${this.mes_inscrito_cyd}${this.dia_inscrito_cyd}`;
          if (dia == 0) this.validar_Dato_dia_cyd();
          else if (this.validarFecha("dia", dia) && this.validarFecha("fin", fecha)) this.validar_Dato_anio_semana1();
          else this.validar_Dato_anio_cyd();
        }
      );
    },
    validar_Dato_anio_semana1() {
      validarInputs(
        {
          form: "#dato_anio_semana1",
          orden: "1",
        },
        () => {
          this.evaldnt.inscrito_cyd == "S" ? this.validar_Dato_anio_cyd() : this.validar_Dato_inscritocyd();
        },
        () => {
          let anio = parseInt(this.tabla_controles_w[0].anio_control) || 0;
          if (anio == 0) this.validar_Dato_anio_semana2();
          else this.validarFecha("anio", anio) ? this.validar_Dato_mes_semana1() : this.validar_Dato_anio_semana1();
        }
      );
    },
    validar_Dato_mes_semana1() {
      validarInputs(
        {
          form: "#dato_mes_semana1",
          orden: "1",
        },
        this.validar_Dato_anio_semana1,
        () => {
          let mes = parseInt(this.tabla_controles_w[0].mes_control) || 0;
          this.tabla_controles_w[0].mes_control = this.tabla_controles_w[0].mes_control.padStart(2, "0");
          if (mes == 0) this.validar_Dato_mes_semana1();
          else this.validarFecha("mes", mes) ? this.validar_Dato_dia_semana1() : this.validar_Dato_mes_semana1();
        }
      );
    },
    validar_Dato_dia_semana1() {
      validarInputs(
        {
          form: "#dato_dia_semana1",
          orden: "1",
        },
        this.validar_Dato_mes_semana1,
        () => {
          let dia = parseInt(this.tabla_controles_w[0].dia_control) || 0;
          this.tabla_controles_w[0].dia_control = this.tabla_controles_w[0].dia_control.padStart(2, "0");
          let fecha = `${this.tabla_controles_w[0].anio_control}${this.tabla_controles_w[0].mes_control}${this.tabla_controles_w[0].dia_control}`;

          if (dia == 0) this.validar_Dato_dia_semana1();
          else if (this.validarFecha("dia", dia) && this.validarFecha("fin", fecha)) this.validar_Dato_anio_semana2();
          else this.validar_Dato_anio_semana1();
        }
      );
    },
    validar_Dato_anio_semana2() {
      validarInputs(
        {
          form: "#dato_anio_semana2",
          orden: "1",
        },
        this.validar_Dato_anio_semana1,
        () => {
          let anio = parseInt(this.tabla_controles_w[1].anio_control) || 0;
          if (anio == 0) this.validar_Dato_anio_1ermes();
          else this.validarFecha("anio", anio) ? this.validar_Dato_mes_semana2() : this.validar_Dato_anio_semana2();
        }
      );
    },
    validar_Dato_mes_semana2() {
      validarInputs(
        {
          form: "#dato_mes_semana2",
          orden: "1",
        },
        this.validar_Dato_anio_semana1,
        () => {
          let mes = parseInt(this.tabla_controles_w[1].mes_control) || 0;
          this.tabla_controles_w[1].mes_control = this.tabla_controles_w[1].mes_control.padStart(2, "0");
          if (mes == 0) this.validar_Dato_mes_semana2();
          else this.validarFecha("mes", mes) ? this.validar_Dato_dia_semana2() : this.validar_Dato_mes_semana2();
        }
      );
    },
    validar_Dato_dia_semana2() {
      validarInputs(
        {
          form: "#dato_dia_semana2",
          orden: "1",
        },
        this.validar_Dato_mes_semana2,
        () => {
          let dia = parseInt(this.tabla_controles_w[1].dia_control) || 0;
          this.tabla_controles_w[1].dia_control = this.tabla_controles_w[1].dia_control.padStart(2, "0");
          let fecha = `${this.tabla_controles_w[1].anio_control}${this.tabla_controles_w[1].mes_control}${this.tabla_controles_w[1].dia_control}`;
          if (dia == 0) this.validar_Dato_anio_2domes();
          else if (this.validarFecha("dia", dia) && this.validarFecha("fin", fecha)) this.validar_Dato_anio_1ermes();
          else this.validar_Dato_anio_semana2();
        }
      );
    },
    validar_Dato_anio_1ermes() {
      validarInputs(
        {
          form: "#dato_anio_1ermes",
          orden: "1",
        },
        this.validar_Dato_anio_semana2,
        () => {
          let anio = parseInt(this.tabla_controles_w[2].anio_control) || 0;
          if (anio == 0) this.validar_Dato_anio_2domes();
          else this.validarFecha("anio", anio) ? this.validar_Dato_mes_1ermes() : this.validar_Dato_anio_1ermes();
        }
      );
    },
    validar_Dato_mes_1ermes() {
      validarInputs(
        {
          form: "#dato_mes_1ermes",
          orden: "1",
        },
        this.validar_Dato_anio_semana1,
        () => {
          let mes = parseInt(this.tabla_controles_w[2].mes_control) || 0;
          this.tabla_controles_w[2].mes_control = this.tabla_controles_w[2].mes_control.padStart(2, "0");
          if (mes == 0) this.validar_Dato_mes_1ermes();
          else this.validarFecha("mes", mes) ? this.validar_Dato_dia_1ermes() : this.validar_Dato_mes_1ermes();
        }
      );
    },
    validar_Dato_dia_1ermes() {
      validarInputs(
        {
          form: "#dato_dia_1ermes",
          orden: "1",
        },
        this.validar_Dato_mes_1ermes,
        () => {
          let dia = parseInt(this.tabla_controles_w[2].dia_control) || 0;
          this.tabla_controles_w[2].dia_control = this.tabla_controles_w[2].dia_control.padStart(2, "0");
          let fecha = `${this.tabla_controles_w[2].anio_control}${this.tabla_controles_w[2].mes_control}${this.tabla_controles_w[2].dia_control}`;
          if (dia == 0) this.validar_Dato_dia_1ermes();
          else if (this.validarFecha("dia", dia) && this.validarFecha("fin", fecha)) this.validar_Dato_anio_2domes();
          else this.validar_Dato_anio_1ermes();
        }
      );
    },
    validar_Dato_anio_2domes() {
      validarInputs(
        {
          form: "#dato_anio_2domes",
          orden: "1",
        },
        this.validar_Dato_anio_1ermes,
        () => {
          let anio = parseInt(this.tabla_controles_w[3].anio_control) || 0;
          if (anio == 0) this.validar_Dato_anio_3ermes();
          else this.validarFecha("anio", anio) ? this.validar_Dato_mes_2domes() : this.validar_Dato_anio_2domes();
        }
      );
    },
    validar_Dato_mes_2domes() {
      validarInputs(
        {
          form: "#dato_mes_2domes",
          orden: "1",
        },
        this.validar_Dato_anio_2domes,
        () => {
          let mes = parseInt(this.tabla_controles_w[3].mes_control) || 0;
          this.tabla_controles_w[3].mes_control = this.tabla_controles_w[3].mes_control.padStart(2, "0");
          if (mes == 0) this.validar_Dato_mes_2domes();
          else this.validarFecha("mes", mes) ? this.validar_Dato_dia_2domes() : this.validar_Dato_mes_2domes();
        }
      );
    },
    validar_Dato_dia_2domes() {
      validarInputs(
        {
          form: "#dato_dia_2domes",
          orden: "1",
        },
        this.validar_Dato_mes_2domes,
        () => {
          let dia = parseInt(this.tabla_controles_w[3].dia_control) || 0;
          this.tabla_controles_w[3].dia_control = this.tabla_controles_w[3].dia_control.padStart(2, "0");
          let fecha = `${this.tabla_controles_w[3].anio_control}${this.tabla_controles_w[3].mes_control}${this.tabla_controles_w[3].dia_control}`;
          if (dia == 0) this.validar_Dato_dia_2domes();
          else if (this.validarFecha("dia", dia) && this.validarFecha("fin", fecha)) this.validar_Dato_anio_3ermes();
          else this.validar_Dato_anio_2domes();
        }
      );
    },
    validar_Dato_anio_3ermes() {
      validarInputs(
        {
          form: "#dato_anio_3ermes",
          orden: "1",
        },
        this.validar_Dato_anio_2domes,
        () => {
          let anio = parseInt(this.tabla_controles_w[4].anio_control) || 0;
          if (anio == 0) this.validar_Dato_anio_pediatria();
          else this.validarFecha("anio", anio) ? this.validar_Dato_mes_3ermes() : this.validar_Dato_anio_3ermes();
        }
      );
    },
    validar_Dato_mes_3ermes() {
      validarInputs(
        {
          form: "#dato_mes_3ermes",
          orden: "1",
        },
        this.validar_Dato_anio_3ermes,
        () => {
          let mes = parseInt(this.tabla_controles_w[4].mes_control) || 0;
          this.tabla_controles_w[4].mes_control = this.tabla_controles_w[4].mes_control.padStart(2, "0");
          if (mes == 0) this.validar_Dato_mes_3ermes();
          else this.validarFecha("mes", mes) ? this.validar_Dato_dia_3ermes() : this.validar_Dato_mes_3ermes();
        }
      );
    },
    validar_Dato_dia_3ermes() {
      validarInputs(
        {
          form: "#dato_dia_3ermes",
          orden: "1",
        },
        this.validar_Dato_mes_3ermes,
        () => {
          let dia = parseInt(this.tabla_controles_w[4].dia_control) || 0;
          this.tabla_controles_w[4].dia_control = this.tabla_controles_w[4].dia_control.padStart(2, "0");
          let fecha = `${this.tabla_controles_w[4].anio_control}${this.tabla_controles_w[4].mes_control}${this.tabla_controles_w[4].dia_control}`;
          if (dia == 0) this.validar_Dato_dia_3ermes();
          else if (this.validarFecha("dia", dia) && this.validarFecha("fin", fecha)) this.validar_Dato_anio_pediatria();
          else this.validar_Dato_anio_3ermes();
        }
      );
    },
    validar_Dato_anio_pediatria() {
      validarInputs(
        {
          form: "#dato_anio_pediatria",
          orden: "1",
        },
        this.validar_Dato_anio_3ermes,
        () => {
          let anio = parseInt(this.anio_pediatria) || 0;
          if (anio == 0) {
            this.anio_pediatria = this.mes_pediatria = this.dia_pediatria = "";
            this.validar_Dato_anio_nutricion();
          } else this.validarFecha("anio", anio) ? this.validar_Dato_mes_pediatria() : this.validar_Dato_anio_pediatria();
        }
      );
    },
    validar_Dato_mes_pediatria() {
      validarInputs(
        {
          form: "#dato_mes_pediatria",
          orden: "1",
        },
        this.validar_Dato_anio_pediatria,
        () => {
          let mes = parseInt(this.mes_pediatria) || 0;
          this.mes_pediatria = this.mes_pediatria.padStart(2, "0");
          if (mes == 0) this.validar_Dato_mes_pediatria();
          else this.validarFecha("mes", mes) ? this.validar_Dato_dia_pediatria() : this.validar_Dato_mes_pediatria();
        }
      );
    },
    validar_Dato_dia_pediatria() {
      validarInputs(
        {
          form: "#dato_dia_pediatria",
          orden: "1",
        },
        this.validar_Dato_mes_pediatria,
        () => {
          let dia = parseInt(this.dia_pediatria) || 0;
          this.dia_pediatria = this.dia_pediatria.padStart(2, "0");
          let fecha = `${this.anio_pediatria}${this.mes_pediatria}${this.dia_pediatria}`;
          if (dia == 0) this.validar_Dato_dia_pediatria();
          else if (this.validarFecha("dia", dia) && this.validarFecha("fin", fecha)) this.validar_Dato_anio_nutricion();
          else this.validar_Dato_anio_pediatria();
        }
      );
    },
    validar_Dato_anio_nutricion() {
      validarInputs(
        {
          form: "#dato_anio_nutricion",
          orden: "1",
        },
        this.validar_Dato_anio_pediatria,
        () => {
          let anio = parseInt(this.anio_nutricion) || 0;
          if (anio == 0) {
            this.anio_nutricion = this.mes_nutricion = this.dia_nutricion = "";
            this.validar_Dato_recupera_nutric();
          } else this.validarFecha("anio", anio) ? this.validar_Dato_mes_nutricion() : this.validar_Dato_anio_nutricion();
        }
      );
    },
    validar_Dato_mes_nutricion() {
      validarInputs(
        {
          form: "#dato_mes_nutricion",
          orden: "1",
        },
        this.validar_Dato_anio_nutricion,
        () => {
          let mes = parseInt(this.mes_nutricion) || 0;
          this.mes_nutricion = this.mes_nutricion.padStart(2, "0");
          if (mes == 0) this.validar_Dato_mes_nutricion();
          else this.validarFecha("mes", mes) ? this.validar_Dato_dia_nutricion() : this.validar_Dato_mes_nutricion();
        }
      );
    },
    validar_Dato_dia_nutricion() {
      validarInputs(
        {
          form: "#dato_dia_nutricion",
          orden: "1",
        },
        this.validar_Dato_anio_nutricion,
        () => {
          let dia = parseInt(this.dia_nutricion) || 0;
          this.dia_nutricion = this.dia_nutricion.padStart(2, "0");
          let fecha = `${this.anio_nutricion}${this.mes_nutricion}${this.dia_nutricion}`;
          if (dia == 0) this.validar_Dato_dia_nutricion();
          else if (this.validarFecha("dia", dia) && this.validarFecha("fin", fecha)) this.validar_Dato_recupera_nutric();
          else this.validar_Dato_anio_nutricion();
        }
      );
    },
    validar_Dato_recupera_nutric() {
      validarInputs(
        {
          form: "#dato_recupera_nutric",
          orden: "1",
        },
        this.validar_Dato_anio_nutricion,
        () => {
          this.evaldnt.recupera_nutric = this.devolverSN(this.evaldnt.recupera_nutric).toUpperCase();
          this.validar_Dato_micronutri_pol();
        }
      );
    },
    validar_Dato_micronutri_pol() {
      validarInputs(
        {
          form: "#dato_micronutri_pol",
          orden: "1",
        },
        this.validar_Dato_recupera_nutric,
        () => {
          this.evaldnt.micronutri_pol = this.devolverSN(this.evaldnt.micronutri_pol).toUpperCase();
          this._terminar();
        }
      );
    },
    _escape() {
      this.$emit("callback_esc");
    },
    _terminar() {
      this.evaldnt.fecha_pediatria = `${this.anio_pediatria}${this.mes_pediatria}${this.dia_pediatria}` || "";
      this.evaldnt.fecha_nutricion = `${this.anio_nutricion}${this.mes_nutricion}${this.dia_nutricion}` || "";
      this.evaldnt.fecha_inscrito_cyd = `${this.anio_inscrito_cyd}${this.mes_inscrito_cyd}${this.dia_inscrito_cyd}` || "";
      this.evaldnt.manejo_dnt = this.evaldnt.manejo_dnt.toString();

      console.log(this.evaldnt)
      this.evaldnt.tabla_controles[0].fecha_controles = Object.values(this.tabla_controles_w[0]).join("");
      this.evaldnt.tabla_controles[1].fecha_controles = Object.values(this.tabla_controles_w[1]).join("");
      this.evaldnt.tabla_controles[2].fecha_controles = Object.values(this.tabla_controles_w[2]).join("");
      this.evaldnt.tabla_controles[3].fecha_controles = Object.values(this.tabla_controles_w[3]).join("");
      this.evaldnt.tabla_controles[4].fecha_controles = Object.values(this.tabla_controles_w[4]).join("");
      this.$emit("callback", this.evaldnt);
    },
  },
  template: /*html*/ ` 
  <div class="col-md-12 no-padding">
     <div class="portlet light box-center box-title">
      <div class="portlet-title">
        <div class="caption">
          <span class="caption-subject bold">Evaluación DNT</span>
        </div>
      </div>
    </div>
    <div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">
     <div class="col-md-12">

     <div class="col-md-4" style="text-align: left">
      
      <div class="col-md-12 no-padding">
         <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="dato_edema">
           <label class="labelPreguntas">Presenta edema ?</label>
           <div class="col-md-2 no-padding inline-inputs" style="float: right">
             <input
              type="text"
              v-model="evaldnt.edema"
              maxlength="1"
              placeholder="N"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              />
           </div>
         </div>
      </div>

      <div class="salto-linea"></div>

      <div class="col-md-12 no-padding">
        <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes">
          <label class="labelPreguntas">Prueba apetito :</label>
          <div class="col-md-6 no-padding inline-inputs" style="float: right">
            <input
               type="text"
               v-model="textos.apetito"
               disabled="disabled"
               class="form-control col-md-12 col-sm-12 col-xs-12"
               style="text-align: center"
            />
          </div>
        </div>
      </div>

      <div class="salto-linea"></div>

      <div class="col-md-12 no-padding">
        <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="dato_nro_controles">
          <label class="labelPreguntas">Número de controles ?</label>
          <div class="col-md-3 no-padding inline-inputs" style="float: right">
            <input
               type="number"
               min="1"
               v-model="evaldnt.nro_controles"
               maxlength="2"
               data-orden="1"
               disabled="disabled"
               class="form-control col-md-12 col-sm-12 col-xs-12"
               style=" text-align: center"
            />
          </div>
        </div>
      </div>

    <div class="salto-linea"></div>

    <div class="col-md-12 no-padding">
      <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes">
        <label class="labelPreguntas">Manejo DNT :</label>
        <div class="col-md-6 no-padding inline-inputs" style="float: right">
          <input
             type="text"
             v-model="textos.manejo_dnt"
             disabled="disabled"
             class="form-control col-md-12 col-sm-12 col-xs-12"
             style="text-align: center"
          />
        </div>
      </div>
    </div>

    <div class="salto-linea"></div>

    <div class="col-md-12 no-padding">
      <div class="col-md-12 col-sm-12 col-xs-12 form-group form-md-checkboxes" id="dato_inscritocyd">
        <label class="labelPreguntas">Está inscrito en C y D ?</label>
         <div class="col-md-2 no-padding inline-inputs" style="float: right">
           <input
             type="text"
             v-model="evaldnt.inscrito_cyd"
             maxlength="1"
             placeholder="N"
             data-orden="1"
             disabled="disabled"
             class="form-control col-md-12 col-sm-12 col-xs-12"
             style="text-align: center"
            />
         </div>
      </div>
    </div>

    <div v-if="evaldnt.inscrito_cyd == 'S'" class="salto-linea"></div>
  
    <div v-if="evaldnt.inscrito_cyd == 'S'" class="col-md-12 no-padding" style="display: flex; justify-content: center">
      <div class="col-md-8 col-sm-3 col-xs-12">
        <div class="inline-inputs">
          <div class="input-group col-md-6 col-sm-4 col-xs-4" id="dato_anio_inscrito_cyd">
            <input
              type="number"
              v-model="anio_inscrito_cyd"
              data-orden="1"
              maxlength="4"
              required="true"
              style="padding-right: 0"
              disabled="disabled"
              placeholder="AAAA"
              class="form-control col-md-12 col-sm-12 col-xs-12"
            />
          </div>
          <div class="input-group col-md-3 col-sm-4 col-xs-4" id="dato_mes_inscrito_cyd">
            <input
              type="number"
              v-model="mes_inscrito_cyd"
              data-orden="1"
              maxlength="2"
              required="true"
              style="padding-right: 0"
              disabled="disabled"
              placeholder="MM"
              class="form-control col-md-12 col-sm-12 col-xs-12"
            />
          </div>
          <div class="input-group col-md-3 col-sm-4 col-xs-4" id="dato_dia_inscrito_cyd">
            <input
              type="number"
              v-model="dia_inscrito_cyd"
              data-orden="1"
              maxlength="2"
              required="true"
              style="padding-right: 0"
              disabled="disabled"
              placeholder="DD"
              class="form-control col-md-12 col-sm-12 col-xs-12"
            />
          </div>
        </div>
      </div>
    </div>

  
  
    </div>

      <div class="col-md-4" style="padding-top: 10px;float:left;">
        <div class="col-md-12 col-sm-12 col-xs-12" style="display: flex; justify-content: center; padding-right: 0px; padding-left: 0px">
          <label>Fecha de control</label>
        </div>
        <div class="salto-linea"></div>
        <div
          class="col-md-12 col-sm-6 col-xs-6 form-md-checkboxes no-padding"
          style="align-items: center; display: flex; top: 5px; justify-content: space-between"
        >
          <label class="col-md-3 col-sm-6 col-xs-6 " style="text-align: left">Semana 1</label>
           <div id="dato_anio_semana1" class="col-md-3 no-padding inline-inputs">
            <input
              type="number"
              placeholder="AAAA"
              maxlength="4"
            data-orden="1"
            disabled="disabled"
            class="form-control col-md-12 col-sm-12 col-xs-12"
            style="text-align: center"
            v-model="tabla_controles_w[0].anio_control"
          />
        </div>
        <div id="dato_mes_semana1" class="col-md-2 no-padding inline-inputs">
          <input
            type="number"
            placeholder="MM"
            maxlength="2"
            data-orden="1"
            disabled="disabled"
            class="form-control col-md-12 col-sm-12 col-xs-12"
            style="text-align: center"
            v-model="tabla_controles_w[0].mes_control"
            required
          />
        </div>
        <div id="dato_dia_semana1" class="col-md-2 no-padding inline-inputs">
          <input
            type="number"
            placeholder="DD"
            maxlength="2"
            data-orden="1"
            disabled="disabled"
            class="form-control col-md-12 col-sm-12 col-xs-12"
            style="text-align: center"
            v-model="tabla_controles_w[0].dia_control"
            required
          />
        </div>
        </div>
        <div class="salto-linea"></div>
        <div
          class="col-md-12 col-sm-6 col-xs-6 form-md-checkboxes no-padding"
          style="align-items: center; display: flex; top: 5px; justify-content: space-between"
        >
          <label class="col-md-3 col-sm-6 col-xs-6" style="text-align: left">Semana 2</label>
          <div id="dato_anio_semana2" class="col-md-3 no-padding inline-inputs">
            <input
              type="number"
              placeholder="AAAA"
              maxlength="4"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[1].anio_control"
            />
          </div>
          <div id="dato_mes_semana2" class="col-md-2 no-padding inline-inputs">
            <input
              type="number"
              placeholder="MM"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[1].mes_control"
              required
            />
          </div>
          <div id="dato_dia_semana2" class="col-md-2 no-padding inline-inputs">
            <input
              type="number"
              placeholder="DD"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[1].dia_control"
              required
            />
          </div>
        </div>
        <div class="salto-linea"></div>
        <div
          class="col-md-12 col-sm-6 col-xs-6 form-md-checkboxes no-padding"
          style="align-items: center; display: flex; top: 5px; justify-content: space-between"
        >
          <label class="col-md-3 col-sm-6 col-xs-6" style="text-align: left">1er mes</label>
          <div id="dato_anio_1ermes" class="col-md-3 no-padding inline-inputs">
            <input
              type="number"
              placeholder="AAAA"
              maxlength="4"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[2].anio_control"
            />
          </div>
          <div id="dato_mes_1ermes" class="col-md-2 no-padding inline-inputs">
            <input
              type="number"
              placeholder="MM"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[2].mes_control"
              required
            />
          </div>
          <div id="dato_dia_1ermes" class="col-md-2 no-padding inline-inputs">
            <input
              type="number"
              placeholder="DD"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[2].dia_control"
              required
            />
          </div>
        </div>
        <div class="salto-linea"></div>
        <div
          class="col-md-12 col-sm-6 col-xs-6 form-md-checkboxes no-padding"
          style="align-items: center; display: flex; top: 5px; justify-content: space-between"
        >
          <label class="col-md-3 col-sm-6 col-xs-6" style="text-align: left">2do mes</label>
          <div id="dato_anio_2domes" class="col-md-3 no-padding inline-inputs">
            <input
              type="number"
              placeholder="AAAA"
              maxlength="4"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[3].anio_control"
            />
          </div>
          <div id="dato_mes_2domes" class="col-md-2 no-padding inline-inputs">
            <input
              type="number"
              placeholder="MM"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[3].mes_control"
              required
            />
          </div>
          <div id="dato_dia_2domes" class="col-md-2 no-padding inline-inputs">
            <input
              type="number"
              placeholder="DD"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[3].dia_control"
              required
            />
          </div>
        </div>
        <div class="salto-linea"></div>
        <div
          class="col-md-12 col-sm-6 col-xs-6 form-md-checkboxes no-padding"
          style="align-items: center; display: flex; top: 5px; justify-content: space-between"
        >
          <label class="col-md-3 col-sm-6 col-xs-6" style="text-align: left">3er mes</label>
          <div id="dato_anio_3ermes" class="col-md-3 no-padding inline-inputs">
            <input
              type="number"
              placeholder="AAAA"
              maxlength="4"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[4].anio_control"
            />
          </div>
          <div id="dato_mes_3ermes" class="col-md-2 no-padding inline-inputs">
            <input
              type="number"
              placeholder="MM"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[4].mes_control"
              required
            />
          </div>
          <div id="dato_dia_3ermes" class="col-md-2 no-padding inline-inputs">
            <input
              type="number"
              placeholder="DD"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="tabla_controles_w[4].dia_control"
              required
            />
          </div>
        </div>
        <div class="salto-linea"></div>
      </div>
      <div class="col-md-4" style="padding-right: 0px; padding-top: 10px;float:right;">
        <div class="col-md-12 col-sm-12 col-xs-12" style="display: flex; justify-content: center"><label>Fecha de valoración</label></div>
        <div class="salto-linea"></div>
        <div
          class="col-md-12 col-sm-6 col-xs-6 form-md-checkboxes no-padding"
          style="align-items: center; display: flex; top: 5px; justify-content: space-between"
        >
          <label class="col-md-3 col-sm-6 col-xs-6" style="text-align: left">Pediatría</label>
          <div id="dato_anio_pediatria" class="col-md-3 no-padding inline-inputs">
            <input
              type="text"
              placeholder="AAAA"
              maxlength="4"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="anio_pediatria"
            />
          </div>
          <div id="dato_mes_pediatria" class="col-md-2 no-padding inline-inputs">
            <input
              type="text"
              placeholder="MM"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="mes_pediatria"
            />
          </div>
          <div id="dato_dia_pediatria" class="col-md-2 no-padding inline-inputs">
            <input
              type="text"
              placeholder="DD"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="dia_pediatria"
            />
          </div>
        </div>
        <div class="salto-linea"></div>
        <div
          class="col-md-12 col-sm-6 col-xs-6 form-md-checkboxes no-padding"
          style="align-items: center; display: flex; top: 5px; justify-content: space-between"
        >
          <label class="col-md-3 col-sm-6 col-xs-6"style="text-align: left">Nutrición</label>
          <div id="dato_anio_nutricion" class="col-md-3 no-padding inline-inputs">
            <input
              type="text"
              placeholder="AAAA"
              maxlength="4"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="anio_nutricion"
            />
          </div>
          <div id="dato_mes_nutricion" class="col-md-2 no-padding inline-inputs">
            <input
              type="text"
              placeholder="MM"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="mes_nutricion"
            />
          </div>
          <div id="dato_dia_nutricion" class="col-md-2 no-padding inline-inputs">
            <input
              type="text"
              placeholder="DD"
              maxlength="2"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="dia_nutricion"
            />
          </div>
        </div>
        <div class="salto-linea"></div>
        <div class="salto-linea"></div>
        <div class="salto-linea"></div>

        <div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="align-items: center; top: 10px; display: flex">
          <label class="col-md-10 col-sm-10 col-xs-10" style="text-align: left">Esta inscrito en alguna modalidad de recuperación nutricional?</label>
          <div id="dato_recupera_nutric" class="col-md-2 col-sm-2 col-xs-2 no-padding" style="float: right">
            <input
              type="text"
              placeholder="N"
              maxlength="1"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="evaldnt.recupera_nutric"
            />
          </div>
        </div>

        <div class="salto-linea"></div>
        <div class="salto-linea"></div>
        <div class="salto-linea"></div>
        <div
          class="col-md-12 col-sm-12 col-xs-12 no-padding"
          style="align-items: center; top: 5px; display: flex; /* justify-content: space-around; */"
        >
          <label class="col-md-10 col-sm-10 col-xs-10" style="text-align: left">Si ha recibido fortificación casera con micronutrientes polvo?</label>
          <div id="dato_micronutri_pol" class="col-md-2 col-sm-2 col-xs-2 no-padding" style="float: right">
            <input
              type="text"
              placeholder="N"
              maxlength="1"
              data-orden="1"
              disabled="disabled"
              class="form-control col-md-12 col-sm-12 col-xs-12"
              style="text-align: center"
              v-model="evaldnt.micronutri_pol"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

`,
});
