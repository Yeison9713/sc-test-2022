
// CREACION - SANTIAGO.F - MAYO 25/2021

new Vue({
  el: '#HC905-E',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      unserv: '',
      descripUnserv: '',

      finalidad: '',
      descripFinalid: '',

      atiende: '',
      descripAtiende: '',

      ano_inicial: '',
      mes_inicial: '',
      dia_inicial: '',

      ano_final: '',
      mes_final: '',
      dia_final: '',

      fechaIni: '',
      fechaFin: '',
    },

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    fecha_act: moment().format("YYYYMMDD"),
  },

  async created() {
    $this = this;
    loader('show');
    _inputControl('disabled');
    _inputControl('reset');
    nombreOpcion('9-5-E - Informe gestantes');
    this.cargarProfesionales_hc905E();
  },
  methods: {
    validarUnidadServ() {
      this.form.unserv = '08';

      var unserv = this.form.unserv;

      let busq = this._unserv.find(a => a.COD == unserv);
      if (busq != undefined) {
        this.form.descripUnserv = busq.DESCRIP;
        // continue
        this.validarFinalidad();
      } else {
        CON851('01', '01', null, 'error', 'error')
        this.validarUnidadServ();
      }
    },

    validarFinalidad() {
      this.form.finalidad = '06';

      if (this.form.finalidad == '06') {
        this.form.descripFinalid = 'DET. ALT. EMBARAZO';
      }

      this.validarMedico();
    },

    validarMedico() {
      this.form.atiende == '' ? this.form.atiende = $_REG_PROF.IDENTIFICACION : false;
      validarInputs({
        form: '#personalAtiende_HC905E'
      }, () => {
        _regresar_menuhis();
      }, () => {
        let atiende = this.form.atiende;
        if (atiende == '99') {
          this.form.descripAtiende = 'Todos los medicos';
          // continue
          this.validarFechaIni();
        } else {
          let busq = this._profesionales.find(a => a.IDENTIFICACION == atiende);
          if (busq != undefined) {
            this.form.descripAtiende = busq.NOMBRE;
            // continue
            this.validarFechaIni();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validarMedico();
          }
        }
      })
    },

    validarFechaIni() {
      var anoIni = parseInt(this.fecha_act.substring(0, 4));
      var mesIni = parseInt(this.fecha_act.substring(4, 6));
      var diaIni = parseInt(this.fecha_act.substring(6, 8));

      if (diaIni > 1) {
        diaIni = diaIni - 1;
      } else {
        if (mesIni == 1) {
          anoIni = anoIni - 1;
          mesIni = 12;
          diaIni = 31;
        } else {
          mesIni = mesIni - 1
          switch (mesIni) {
            case '1': diaIni = 31;
            case '2': diaIni = 28;
            case '3': diaIni = 31;
            case '4': diaIni = 30;
            case '5': diaIni = 31;
            case '6': diaIni = 30;
            case '7': diaIni = 31;
            case '8': diaIni = 31;
            case '9': diaIni = 30;
            case '10': diaIni = 31;
            case '11': diaIni = 30;
            case '12': diaIni = 31;
          }
        }
      }

      this.form.ano_inicial = anoIni;
      this.form.mes_inicial = mesIni;
      this.form.dia_inicial = diaIni;
      this.validarAnoIni();
    },

    validarAnoIni() {
      validarInputs({
        form: '#anoInicial'
      }, () => {
        this.validarMedico();
      }, () => {
        var ano = parseInt(this.form.ano_inicial);
        if (ano < 2008) {
          this.validarAnoIni();
        } else {
          // continue
          this.validarMesIni();
        }
      })
    },

    validarMesIni() {
      validarInputs({
        form: '#mesInicial'
      }, () => {
        this.validarAnoIni();
      }, () => {
        this.form.mes_inicial = cerosIzq(this.form.mes_inicial, 2);
        var mes = parseInt(this.form.mes_inicial);
        if (mes < 1 || mes > 12) {
          this.validarMesIni();
        } else {
          // continue
          this.validarDiaIni();
        }
      })
    },

    validarDiaIni() {
      validarInputs({
        form: '#diaInicial'
      }, () => {
        this.validarMesIni();
      }, () => {
        this.form.dia_inicial = cerosIzq(this.form.dia_inicial, 2);
        var dia = parseInt(this.form.dia_inicial);
        if (dia < 1 || dia > 31) {
          this.validarDiaIni();
        } else {
          // continue
          this.validarAnoFin();
        }
      })
    },

    validarAnoFin() {
      this.form.ano_final == '' ? this.form.ano_final = this.fecha_act.substring(0, 4) : false;
      validarInputs({
        form: '#anoFinal'
      }, () => {
        this.validarAnoIni();
      }, () => {
        var ano = parseInt(this.form.ano_final);
        if (ano < 1900) {
          CON851('03', '03', null, 'error', 'error')
          this.validarAnoFin();
        } else {
          // continue
          this.validarMesFin();
        }
      })
    },

    validarMesFin() {
      this.form.mes_final == '' ? this.form.mes_final = this.fecha_act.substring(4, 6) : false;
      validarInputs({
        form: '#mesFinal'
      }, () => {
        this.validarAnoFin();
      }, () => {
        this.form.mes_final = cerosIzq(this.form.mes_final, 2);
        var mes = parseInt(this.form.mes_final);
        if (mes < 1 || mes > 12) {
          this.validarMesFin();
        } else {
          // continue
          this.validarDiaFin();
        }
      })
    },

    validarDiaFin() {
      this.form.dia_final == '' ? this.form.dia_final = this.fecha_act.substring(6, 8) : false;
      validarInputs({
        form: '#diaFinal'
      }, () => {
        this.validarMesFin();
      }, () => {
        this.form.dia_final = cerosIzq(this.form.dia_final, 2);
        var dia = parseInt(this.form.dia_final);
        this.form.fechaIni = parseInt(`${this.form.ano_inicial}${this.form.mes_inicial}${this.form.dia_inicial}`);
        this.form.fechaFin = parseInt(`${this.form.ano_final}${this.form.mes_final}${this.form.dia_final}`);
        if (dia < 1 || dia > 31) {
          this.validarDiaFin();
        } else if (this.form.fechaFin < this.form.fechaIni) {
          CON851('37', '37', null, 'error', 'error')
          this.validarAnoFin();
        } else {
          // continue
          this._envioImpresion();
        }
      })
    },

    _envioImpresion() {
      CON851P(
        "00",
        () => {
          $this.validarFechaIni();
        },
        () => {
          $this.estado_loader = true;
          $this.label_loader = `Procesando: ${moment($this.form.fechaIni.toString()).format("YYYY/MM/DD")} - ${moment($this.form.fechaFin.toString()).format(
            "YYYY/MM/DD"
          )}`;
          $this.progreso = { transferred: 0, speed: 0 };

          var datos_envio = datosEnvio()
            + localStorage.Usuario
            + '|' + $this.form.atiende
            + '|' + $this.form.fechaIni.toString()
            + '|' + $this.form.fechaFin.toString()

          console.log(datos_envio, "datos_envio");

          postData({ datosh: datos_envio }, get_url("app/HICLIN/HC905-E.DLL"), {
            onProgress: (progress) => {
              $this.progreso = progress;
            },
          })
            .then((data) => {
              $this.loader = false;
              $this.label_loader = `GENERANDO IMPRESIÓN...`;
              $this.progreso.completado = true;
              $this._montarImpresion_HC905E(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              $this.loader = false;
              $this.estado_loader = false;
              $this.validarFechaIni();
            });
        }
      );
    },

    _montarImpresion_HC905E(data) {
      $this = this;
      data.LISTADO.pop();
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        // data.LISTADO[i]['DESCRIP_J'] = data.LISTADO[i]['DESCRIP_J'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.validarUnidadServ();
      } else {
        var columnas = [
          {
            title: "Fecha ultim CPN",
            value: "FECHA",
            format: "string",
          },
          {
            title: "CONTR 1",
            value: "CONTR1_J",
            format: "string",
          },
          {
            title: "CONTR 2",
            value: "CONTR2_J",
            format: "string",
          },
          {
            title: "CONTR 3",
            value: "CONTR3_J",
            format: "string",
          },
          {
            title: "CONTR 4",
            value: "CONTR4_J",
            format: "string",
          },
          {
            title: "CONTR 5",
            value: "CONTR5_J",
            format: "string",
          },
          {
            title: "CONTR 6",
            value: "CONTR6_J",
            format: "string",
          },
          {
            title: "CONTR 7",
            value: "CONTR7_J",
            format: "string",
          },
          {
            title: "CONTR 8",
            value: "CONTR8_J",
            format: "string",
          },
          {
            title: "CONTR 9",
            value: "CONTR9_J",
            format: "string",
          },
          {
            title: "CONTR 10",
            value: "CONTR10_J",
            format: "string",
          },
          {
            title: "CONTR 11",
            value: "CONTR11_J",
            format: "string",
          },
          {
            title: "Nro CPN por consult",
            value: "NRO_CONTR",
          },
          {
            title: "Tipo ID",
            value: "TIPO_ID",
            format: "string",
          },
          {
            title: "Identificacion",
            value: "ID",
            filterButton: true
          },
          {
            title: "1er apellido",
            value: "1ER_APEL_PACI",
            format: "string",
          },
          {
            title: "2do apellido",
            value: "2DO_APEL_PACI",
            format: "string",
          },
          {
            title: "1er nombre",
            value: "1ER_NOM_PACI",
            format: "string",
          },
          {
            title: "2do nombre",
            value: "2DO_NOM_PACI",
            format: "string",
          },
          {
            title: "Fecha nacim",
            value: "FECHA_NACI",
            format: "string",
          },
          {
            title: "Edad",
            value: "EDAD",
            format: "string",
          },
          {
            title: "Eps",
            value: "ENTIDAD",
            format: "string",
          },
          {
            title: "Direccion",
            value: "DIRECC_PACI",
            format: "string",
          },
          {
            title: "Nro celular",
            value: "TELEFONO_PACI",
            format: "string",
          },
          {
            title: "Nomb Acomp",
            value: "ACOMPA_PACI",
            format: "string",
          },
          {
            title: "Nro celular",
            value: "TEL_ACOM_PACI",
            format: "string",
          },
          {
            title: "Fecha ingr CPN",
            value: "FECHA_INGR",
            format: "string",
          },
          {
            title: "EG ingr CPN",
            value: "EDAD_GEST_REGLA",
            format: "string",
          },
          {
            title: "Peso ingr CPN",
            value: "PESO",
            format: "string",
          },
          {
            title: "Talla",
            value: "TALLA",
            format: "string",
          },
          {
            title: "IMC",
            value: "IMC_CORP",
            format: "string",
          },
          {
            title: "FUR",
            value: "FECHA_FUR",
            format: "string",
          },
          {
            title: "FPP",
            value: "FECHA_PARTO_FUR_CALE",
            format: "string",
          },
          {
            title: "Riesgo obstr",
            // value: "FECHA_PARTO_FUR_CALE",
            format: "string",
          },
          {
            title: "Eg actual",
            value: "EDAD_GEST_ULTRA",
            format: "string",
          },
          {
            title: "Peso actual",
            value: "PESO_ULT",
            format: "string",
          },
          {
            title: "IMC actual",
            // value: "PESO_ULT",
            format: "string",
          },
          {
            title: "IMC actual",
            // value: "PESO_ULT",
            format: "string",
          },
          {
            title: "Riesgo obst actual",
            // value: "PESO_ULT",
            format: "string",
          },
          {
            title: "Fecha consej LM",
            // value: "PESO_ULT",
            format: "string",
          },
          {
            title: "Hipertension induc",
            // value: "PESO_ULT",
            format: "string",
          },
          {
            title: "Fecha ultm hospitalz",
            // value: "PESO_ULT",
            format: "string",
          },
          {
            title: "Fecha toma hemoglob",
            value: "FECHA_HEMOGL",
            format: "string",
          },
          {
            title: "Result hemoglob",
            value: "RESULTADO_HEMOGL",
            format: "string",
          },
          {
            title: "Fecha toma glicemia",
            value: "FECHA_GLICEM",
            format: "string",
          },
          {
            title: "Result glicem",
            value: "RESUL_GLICEM",
            format: "string",
          },
          {
            title: "Fecha toma antigen hep b",
            value: "FECHA_HEPAT_B",
            format: "string",
          },
          {
            title: "Result antigen hep b",
            value: "RESULTADO_HEPAT_B",
            format: "string",
          },
          {
            title: "Fecha toma VDRL sifilis",
            value: "FECHA_SEROLO1",
            format: "string",
          },
          {
            title: "Result VDRL sifilis",
            value: "RESULTADO_SEROLO1",
            format: "string",
          },
          {
            title: "Fecha FTA/ABS",
            value: "FECHA_FTA_ABS1",
            format: "string",
          },
          {
            title: "Result FTA/ABS",
            value: "RESULTADO_FTA_ABS1",
            format: "string",
          },
          {
            title: "Fecha pre elisa VIH",
            value: "FECHA_ASESO_PRE",
            format: "string",
          },
          {
            title: "Fecha elisa VIH",
            value: "FECHA_VIH1",
            format: "string",
          },
          {
            title: "Fecha post VIH",
            value: "FECHA_ASESO_POS1",
            format: "string",
          },
          {
            title: "Result elisa VIH",
            value: "RESULTADO_VIH1",
            format: "string",
          },
          {
            title: "Fecha ecogrf obstret",
            value: "FECHA_ECO_OBST",
            format: "string",
          },
          {
            title: "Result ecogrf obstret",
            // value: "RESULTADO_VIH1",
            format: "string",
          },
          {
            title: "Fecha citolog",
            value: "FECHA_CITOL",
            format: "string",
          },
          {
            title: "Result citolog",
            value: "RESULT_CITOL",
            format: "string",
          },
          {
            title: "Fecha uroanalis",
            value: "FECHA_UROANALI1",
            format: "string",
          },
          {
            title: "Result uroanalis",
            value: "RESULTADO_UROANALI1",
            format: "string",
          },
          {
            title: "Fecha gota gruesa",
            // value: "RESULTADO_VIH1",
            format: "string",
          },
          {
            title: "Result gota gruesa",
            // value: "RESULTADO_VIH1",
            format: "string",
          },
          {
            title: "Fecha toxo igg",
            value: "FECHA_IGG",
            format: "string",
          },
          {
            title: "Result toxo igg",
            value: "RESULTADO_IGG",
            format: "string",
          },
          {
            title: "Fecha toxo igm",
            // value: "FECHA_IGG",
            format: "string",
          },
          {
            title: "Result toxo igm",
            // value: "RESULTADO_IGG",
            format: "string",
          },
          {
            title: "Fecha urocultiv antibiog",
            value: "FECHA_UROCULTI",
            format: "string",
          },
          {
            title: "Result urocultiv antibiog",
            value: "RESULTADO_UROCULTI",
            format: "string",
          },
          {
            title: "Result antibiog",
            // value: "FECHA_IGG",
            format: "string",
          },
          {
            title: "Fecha toma curva toleran glucos",
            // value: "RESULTADO_IGG",
            format: "string",
          },
          {
            title: "Result curva toleran glucos",
            // value: "RESULTADO_IGG",
            format: "string",
          },
          {
            title: "Fecha VDRL sifilis",
            value: "FECHA_SEROLO2",
            format: "string",
          },
          {
            title: "Result VDRL sifilis",
            value: "RESULTADO_SEROLO2",
            format: "string",
          },
          {
            title: "Fecha FTA/ABS",
            value: "FECHA_FTA_ABS2",
            format: "string",
          },
          {
            title: "Result FTA/ABS",
            value: "RESULTADO_FTA_ABS2",
            format: "string",
          },
          {
            title: "Fecha pre elisa VIH",
            value: "FECHA_ASESO_PRE1",
            format: "string",
          },
          {
            title: "Fecha elisa VIH",
            value: "FECHA_VIH2",
            format: "string",
          },
          {
            title: "Fecha pos elisa VIH",
            value: "FECHA_ASESO_POS2",
            format: "string",
          },
          {
            title: "Result elisa VIH",
            value: "RESULTADO_VIH2",
            format: "string",
          },
          {
            title: "Fecha ecogrf detalle",
            // value: "FECHA_FTA_ABS2",
            format: "string",
          },
          {
            title: "Result ecogrf detalle",
            // value: "RESULTADO_FTA_ABS2",
            format: "string",
          },
          {
            title: "Fecha uroanalis",
            value: "FECHA_UROANALI2",
            format: "string",
          },
          {
            title: "Result uroanalis",
            value: "RESULTADO_UROANALI2",
            format: "string",
          },
          {
            title: "Fecha VDRL sifilis",
            value: "FECHA_SEROLO3",
            format: "string",
          },
          {
            title: "Result VDRL sifilis",
            value: "RESULTADO_SEROLO3",
            format: "string",
          },
          {
            title: "Fecha FTA/ABS",
            value: "FECHA_FTA_ABS3",
            format: "string",
          },
          {
            title: "Result FTA/ABS",
            value: "RESULTADO_FTA_ABS3",
            format: "string",
          },
          {
            title: "Fecha pre elisa VIH",
            value: "FECHA_ASESO_PRE2",
            format: "string",
          },
          {
            title: "Fecha elisa VIH",
            value: "FECHA_VIH3",
            format: "string",
          },
          {
            title: "Fecha post VIH",
            value: "FECHA_ASESO_POS3",
            format: "string",
          },
          {
            title: "Result elisa VIH",
            value: "RESULTADO_VIH3",
            format: "string",
          },
          {
            title: "Cultivo rectoVagin tamizaj",
            // value: "RESULTADO_VIH3",
            format: "string",
          },
          {
            title: "Cultivo rectal tamizaje",
            // value: "RESULTADO_VIH3",
            format: "string",
          },
          {
            title: "Cultivo vaginal tamizaj",
            // value: "RESULTADO_VIH3",
            format: "string",
          },
          {
            title: "Fecha uroanalis",
            value: "FECHA_UROANALI3",
            format: "string",
          },
          {
            title: "Result uroanalis",
            value: "RESULTADO_UROANALI3",
            format: "string",
          },
          {
            title: "Fecha ecogrf",
            // value: "RESULTADO_VIH3",
            format: "string",
          },
          {
            title: "Result ecogrf",
            // value: "RESULTADO_VIH3",
            format: "string",
          },
          {
            title: "Fecha frotis flujo vagnl",
            value: "FECHA_FROTISV",
            format: "string",
          },
          {
            title: "Result frotis flujo vagnl",
            value: "RESULTADO_FROTISV",
            format: "string",
          },
          {
            title: "Estado",
            // value: "RESULTADO_VIH3",
            format: "string",
          },
          {
            title: "Fecha cierre",
            value: "FECHA_CIERRE_CASO",
            format: "string",
          },
          {
            title: "Fecha parto",
            value: "FECHA_PARTO_FUR_CALE2",
            format: "string",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE ATENCION     NIT: ${nit}`,
          `DESDE: ${this.form.dia_inicial}/${this.form.mes_inicial}/${this.form.ano_inicial}  HASTA: ${this.form.dia_final}/${this.form.mes_final}/${this.form.ano_final}`,
        ]

        _impresion2({
          tipo: 'excel',
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: data.LISTADO,
          },
          archivo: `${localStorage.Usuario + moment().format(`YYMMDD-HHmmss`)}`
        })
          .then(() => {
            console.log('Proceso terminado')
            this.estado_loader = false;
            _regresar_menuhis();
          })
          .catch(() => {
            console.log('Proceso error')
            this.estado_loader = false;
          })
      }
    },

    _ventanaProfesionales() {
      _ventanaDatos({
        titulo: 'VENTANA PROFESIONALES',
        columnas: ['IDENTIFICACION', 'NOMBRE', 'DESCRIPCION'],
        data: this._profesionales,
        callback_esc: () => {
          document.querySelector('.atiende')
        },
        callback: (data) => {
          $this.form.atiende = data.IDENTIFICACION;
          setTimeout(() => { _enterInput('.atiende') }, 100);
        }
      })
    },

    cargarProfesionales_hc905E() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
        .then((data) => {
          this._profesionales = data.ARCHPROF;
          this._profesionales.pop();
          this.cargarUnidServ_hc905E();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    cargarUnidServ_hc905E() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          this._unserv = data.UNSERV;
          this._unserv.pop();
          loader('hide')
          this.validarUnidadServ();
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _regresar_menuhis();
        });
    },

  },
})