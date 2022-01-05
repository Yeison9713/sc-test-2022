new Vue({
  el: "#ser540",
  data: {
    usuar: $_USUA_GLOBAL[0],
    sucursales: [],
    files_txt: [],
    dir_file: null,
    sw_depu: "N",
    form: {
      fecha_ini: {
        anio: null,
        mes: null,
        dia: null,
      },
      fecha_fin: {
        anio: null,
        mes: null,
        dia: null,
      },
      separarSucursal: null,
      sucursal: "",
      telesalud: "",
      capitalsal: "",
    },
    opcion: null
  },
  created() {
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    
    this._getSucursales();

    let active = $('#navegacion').find('li.opcion-menu.active');
    this.opcion = active[0].attributes[2].nodeValue;

    switch (this.opcion) {
      case "0954212431":
        nombreOpcion("9,5,4,1,2,4,3 - Informe resolucion 4505 pyp V.Ant.");
        break;
        case "0954212432":
        nombreOpcion("9,5,4,1,2,4,3 - Informe resolucion 4505 pyp R. 202");
        break;
    }
  },

  methods: {
    _getSucursales() {
      let ser540 = this;
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON823.DLL"))
        .then((data) => {
          ser540.sucursales = data.SUCURSAL.filter((e) => e.CODIGO != "");
          loader("hide");

          let fecha_lnk = ser540.usuar.FECHALNK;
          ser540.form.fecha_ini.anio = `20${fecha_lnk.substr(0, 2)}`;
          ser540.form.fecha_ini.mes = fecha_lnk.substr(2, 2);
          ser540.form.fecha_ini.dia = "";

          ser540._validarFechaIni();
        })
        .catch((err) => {
          loader("hide");
          _toggleNav();
        });
    },
    _validarFechaIni() {
      let ser540 = this;
      validarInputs(
        {
          form: "#faseFechaIni",
          orden: "1",
        },
        _toggleNav,
        () => {
          let fecha = ser540.form.fecha_ini,
            validar = _validarFecha(
              fecha.anio,
              fecha.mes,
              fecha.dia.padStart(2, "0")
            );

          if (!validar) {
            plantillaToast("", "37", null, "warning");
            ser540._validarFechaIni();
          } else {
            ser540.form.fecha_fin = { ...ser540.form.fecha_ini };
            ser540.form.fecha_fin.dia = "";

            ser540._validarFechaFin();
          }
        }
      );
    },

    _validarFechaFin() {
      let ser540 = this;
      validarInputs(
        {
          form: "#faseFechaFin",
          orden: "1",
        },
        ser540._validarFechaIni,
        () => {
          let fecha = ser540.form.fecha_fin,
            validar = _validarFecha(fecha.anio, fecha.mes, fecha.dia);

          if (!validar) {
            plantillaToast("", "37", null, "warning");
            ser540._validarFechaFin();
          } else ser540._separarSucursal();
        }
      );
    },
    _separarSucursal() {
      let ser540 = this;
      validarInputs(
        {
          form: "#FaseSepararSucursal",
          orden: "1",
        },
        ser540._validarFechaFin,
        () => {
          let separar = ser540.form.separarSucursal.toUpperCase() || "";

          if (separar == "S" || separar == "N") {
            ser540.form.separarSucursal = separar;

            if (separar == "N") {
              ser540.form.sucursal = "**";
              ser540._validarTelesalud();
            } else ser540._validarSucursal();
          } else {
            plantillaToast("", "03", null, "warning");
            ser540.form.separarSucursal = "";
            ser540._separarSucursal();
          }
        }
      );
    },
    _validarSucursal() {
      let ser540 = this;
      validarInputs(
        {
          form: "#FaseSucursal",
          orden: "1",
        },
        ser540._separarSucursal,
        () => {
          let sucursal = ser540.form.sucursal.padStart(2, "0");

          if (sucursal == "**") {
            ser540._validarTelesalud();
          } else {
            let consulta = ser540.sucursales.find((e) => e.CODIGO == sucursal);

            if (consulta) {
              ser540._validarTelesalud();
            } else {
              plantillaToast("", "01", null, "warning");
              ser540._validarSucursal();
            }
          }
        }
      );
    },
    _validarTelesalud() {
      let ser540 = this;
      validarInputs(
        {
          form: "#faseTelesalud",
          orden: "1",
        },
        ser540._separarSucursal,
        () => {
          let telesalud = ser540.form.telesalud.toUpperCase() || "";
          if (telesalud == "S" || telesalud == "N") {
            ser540.form.telesalud = telesalud;
            ser540._generarRes4505();
          } else {
            ser540.form.telesalud = "";
            ser540._validarTelesalud();
          }
        }
      );
    },
    _generarRes4505() {
      let ser540 = this,
        fecha1 = this.form.fecha_ini,
        fecha2 = this.form.fecha_fin;

      let datos = {
        datosh: datosEnvio(),
        fecha_ini: `${fecha1.anio}${fecha1.mes}${fecha1.dia.padStart(2, "0")}`,
        fecha_fin: `${fecha2.anio}${fecha2.mes}${fecha2.dia.padStart(2, "0")}`,
        separar: this.form.separarSucursal,
        sucursal: this.form.sucursal,
        telesalud: this.form.telesalud,
      };

      loader("show");
      let url = null;

      switch (this.opcion) {
        case "0954212431":
          url = get_url("app/SALUD/SER540.DLL");
          break;
        case "0954212432":
          url = get_url("app/SALUD/SER540-21.DLL");
          break;
      }

      console.clear()
      console.log(url);

      postData(datos, url)
        .then((data) => {
          loader("hide");
          ser540.dir_file = data;
          CON851P(
            "Desea depurar fechas NO gestantes?",
            () => {
              ser540.sw_depu = "N";
              ser540._getListado();
            },
            () => {
              ser540.sw_depu = "N";
              ser540._getListado();
            }
          );
        })
        .catch((err) => {
          ser540._validarTelesalud();
          loader("hide");
        });
    },
    _getListado() {
      loader("show");
      let ser540 = this,
        fecha1 = this.form.fecha_ini,
        fecha2 = this.form.fecha_fin,
        fecha_ini = `${fecha1.anio}${fecha1.mes}${fecha1.dia.padStart(2, "0")}`,
        fecha_fin = `${fecha2.anio}${fecha2.mes}${fecha2.dia.padStart(2, "0")}`,
        usuario = localStorage.Usuario,
        file = this.dir_file;

      let datosh =
        datosEnvio() +
        usuario +
        "|" +
        fecha_ini +
        "|" +
        fecha_fin +
        "|" +
        file +
        "|" +
        this.sw_depu +
        "|";

      let url = null;

      switch (this.opcion) {
        case "0954212431":
          url = get_url("app/SALUD/SER540A.DLL");
          break;
        case "0954212432":
          url = get_url("app/SALUD/SER540A-21.DLL");
          break;
      }

      postData({ datosh }, url)
        .then((data) => {
          loader("hide");
          CON851P(
            "Desea generar .txt ?",
            () => {
              ser540._iniciarImpresion(data, "excel");
            },
            () => {
              ser540._iniciarImpresion(data, "txt");
            }
          );
        })
        .catch((err) => {
          ser540._validarTelesalud();
          loader("hide");
        });
    },
    async _iniciarImpresion(data, tipo) {
      await this._check_dir();

      var results = data.informe.reduce(function (results, org) {
        (results[org.llave_eps] = results[org.llave_eps] || []).push(org);
        return results;
      }, {});

      for (let i in results) {
        let datos = await this._getDataInforme(
          results[i][0],
          results[i].length
        );

        if (tipo == "txt") {
          await this._generarTxt(datos, results[i]).then();
        } else {
          datos.encabezado.tabla.data = results[i];
          await _impresion2(datos.encabezado)
            .then(() => {
              console.log("excel -> ", datos.name_file);
            })
            .catch((err) => {
              console.log("error  -> ", err);
            });
        }
      }

      _toggleNav();

      if (tipo == "txt") {
        this._abrirTxts();
      }
    },
    _generarTxt(params, object) {
      let ser540 = this;
      return new Promise(function (resolve, reject) {
        let data = "";

        let new_item = {
          tipo: "0",
          consenc: "000000",
          cod_habil: object[0].eps,
          tipo_id: params.fecha_ini,
          id: params.fecha_fin,
          primer_apel: object.length,
        };

        object.unshift(new_item);

        for (let i in object) {
          ser540._getColumnas().forEach((a, b) => {
            if (a.value != "edad_corte") {
              let dato = object[i][a.value] || "";

              if (i == 0) dato = dato != "" ? `${dato}|` : "";
              else dato = `${dato}|`;

              data = `${data}${dato}`;
            }
          });

          data = `${data}\n`;
        }

        fs.writeFile(params.ruta_txt, data, (err) => {
          if (err) resolve();
          else {
            ser540.files_txt.push(params.ruta_txt);
            resolve();
          }
        });
      });
    },
    _abrirTxts() {
      let data_bat = "",
        dir = `C:\\PROSOFT\\TEMP\\${localStorage.Usuario
          }-${new Date().getTime()}.bat`;

      this.files_txt.forEach((a) => {
        data_bat = `${data_bat} start ${a}\n`;
      });

      fs.writeFile(dir, data_bat, (err) => {
        if (err) {
          console.error("Error escribiendo bat: \n\n" + err);
        } else {
          exe(dir, function (err, data) { });
        }
      });
    },
    _getDataInforme(item, consenc) {
      let fecha1 = this.form.fecha_ini,
        fecha2 = this.form.fecha_fin,
        fecha_ini = `${fecha1.anio}-${fecha1.mes}-${fecha1.dia.padStart(
          2,
          "0"
        )}`,
        fecha_fin = `${fecha2.anio}-${fecha2.mes}-${fecha2.dia.padStart(
          2,
          "0"
        )}`,
        fecha_imp = new Date().toLocaleDateString("es-CO"),
        ruta_guardado = "C:\\PROSOFT\\EXPORTAR\\S1\\",
        nit = this.usuar.NIT,
        regimem = "";

      if (item.subs_consec == "2") {
        regimem = "S";
      } else {
        switch (item.eps.substr(0, 3)) {
          case "EPS":
            regimem = "C";
            break;
          case "ARS":
            regimem = "S";
            break;
          case "ESS":
            regimem = "S";
            break;
          case "CCF":
            regimem = "S";
            break;
          case "RES":
            regimem = "E";
            break;
          default:
            regimem = "N";
            break;
        }
      }

      let name_file = `SGD280RPED${fecha_fin}NI${nit
        .toString()
        .padStart(12, "0")}${regimem}${consenc
          .toString()
          .padStart(3, "0")}-${new Date().getMilliseconds()}`;

      let header = [
        { text: this.usuar.NOMBRE, bold: true, size: 16 },
        `Informe 4505     NIT: ${nit}`,
        `Periodo desde: ${fecha_ini}  Hasta: ${fecha_fin}`,
        `Fecha Impresion: ${fecha_imp} Eps: ${item.eps} - ${item.nombre_eps
        } registros: ${consenc.toString().padStart(3, "0")}`,
      ];

      let ser540 = this;

      let encabezado = {
        tipo: "excel",
        header,
        logo: `${nit}.png`,
        ruta_guardado,
        tabla: {
          columnas: ser540._getColumnas(),
        },
        archivo: name_file,
        scale: 65,
        orientation: "landscape",
      };

      return {
        fecha_ini,
        fecha_fin,
        name_file,
        encabezado,
        ruta_txt: `${ruta_guardado}${name_file}.txt`,
      };
    },
    _check_dir() {
      return new Promise(function (resolve, reject) {
        let dir = `C:\\PROSOFT\\TEMP\\${localStorage.Usuario
          }-${new Date().getTime()}.bat`;

        fs.writeFile(dir, "md c:\\PROSOFT\\EXPORTAR\\S1", (err) => {
          if (err) {
            console.error("Error escribiendo bat: \n\n" + err);
            resolve();
          } else {
            exe(dir, function (err, data) {
              console.log("Genero");
              resolve();
            });
          }
        });
      });
    },
    _ventanaSucursales() {
      let ser540 = this;

      _ventanaDatos({
        titulo: `Ventana de Sucursales`,
        columnas: ["CODIGO", "DESCRIPCION"],
        data: ser540.sucursales,
        callback_esc: function () {
          ser540.$refs.sucursal.focus();
        },
        callback: function (data) {
          ser540.form.sucursal = data.CODIGO;
          ser540.$refs.sucursal.focus();
        },
      });
    },
    _getColumnas() {
      let columnas = false;

      switch (this.opcion) {
        case "0954212431":
          columnas = columnas_ser540b;
          break;
        case "0954212432":
          columnas = columnas_ser540b_21;
          break;
      }

      return columnas;
    }
  },
});

const columnas_ser540b = [
  {
    title: "TPO",
    value: "tipo",
    format: "string",
  },
  {
    title: "1.CONSEC",
    value: "consenc",
    format: "string",
  },
  {
    title: "2.HABILITA",
    value: "cod_habil",
    format: "string",
  },
  {
    title: "3.TIPO ID",
    value: "tipo_id",
    format: "string",
  },
  {
    title: "4.NRO DOC",
    value: "id",
    format: "string",
  },
  {
    title: "5.1ER APEL",
    value: "primer_apel",
    format: "string",
  },
  {
    title: "6.2DO APEL",
    value: "segundo_apel",
    format: "string",
  },
  {
    title: "7.1ER NOMB",
    value: "primer_nomb",
    format: "string",
  },
  {
    title: "8.2DO NOMB",
    value: "segundo_nomb",
    format: "string",
  },
  {
    title: "9.FEC. NACI",
    value: "fecha_naci",
    format: "fecha",
  },
  {
    title: "10.SEXO",
    value: "sexo",
    format: "string",
  },
  {
    title: "11.ETNIA",
    value: "etnia",
    format: "string",
  },
  {
    title: "12.OCUP",
    value: "ocupa",
    format: "string",
  },
  {
    title: "13.NIV EST",
    value: "niv_est",
    format: "string",
  },
  {
    title: "14.EMBARAZ",
    value: "gestacion",
    format: "string",
  },
  {
    title: "15.SIFILIS",
    value: "sifilis",
    format: "string",
  },
  {
    title: "16.HTA GEST",
    value: "hiperte",
    format: "string",
  },
  {
    title: "17.HIPOTIROI",
    value: "hipotir",
    format: "string",
  },
  {
    title: "18.SINT RESP",
    value: "sinto_resp",
    format: "string",
  },
  {
    title: "19.TBC",
    value: "tubercolosis",
    format: "string",
  },
  {
    title: "20.LEPRA",
    value: "lepra",
    format: "string",
  },
  {
    title: "21.OBES/DESN",
    value: "nutricion",
    format: "string",
  },
  {
    title: "22.VICT MALT",
    value: "maltrato",
    format: "string",
  },
  {
    title: "23.VIOL SEX.",
    value: "violen_sexo",
    format: "string",
  },
  {
    title: "24.ITS",
    value: "infecc_sexo",
    format: "string",
  },
  {
    title: "25.ENF.MENT",
    value: "enf_mental",
    format: "string",
  },
  {
    title: "26.CANC.CERV",
    value: "cancer_cervix",
    format: "string",
  },
  {
    title: "27.CANC.SENO",
    value: "cancer_seno",
    format: "string",
  },
  {
    title: "28.FLUORIS D",
    value: "fluoros_dental",
    format: "string",
  },
  {
    title: "29.FECHA PESO",
    value: "fecha_peso",
    format: "fecha",
  },
  {
    title: "30.PESO",
    value: "peso",
    format: "string",
  },
  {
    title: "31.FECHA TALL",
    value: "fecha_talla",
    format: "fecha",
  },
  {
    title: "32. TALLA",
    value: "talla",
    format: "string",
  },
  {
    title: "33.F.P.PARTO",
    value: "fecha_apro_parto",
    format: "fecha",
  },
  {
    title: "34.EDAD GEST.",
    value: "edad_gesta",
    format: "string",
  },
  {
    title: "35.B.C.G.",
    value: "bcg",
    format: "string",
  },
  {
    title: "36.HEPAT.B",
    value: "hepatitis_b",
    format: "string",
  },
  {
    title: "37.PENTAV",
    value: "penta",
    format: "string",
  },
  {
    title: "38.POLIO",
    value: "polio",
    format: "string",
  },
  {
    title: "39.DPT",
    value: "dpt",
    format: "string",
  },
  {
    title: "40.ROTAVIR",
    value: "rotavir",
    format: "string",
  },
  {
    title: "41.NEUMOCO",
    value: "neumoco",
    format: "string",
  },
  {
    title: "42.INFLUEN",
    value: "influen_nin",
    format: "string",
  },
  {
    title: "43.FIEB.AM",
    value: "fiebre_amar",
    format: "string",
  },
  {
    title: "44.HEPAT.A",
    value: "hepatitis_a",
    format: "string",
  },
  {
    title: "45.TRIP V",
    value: "triple_vir",
    format: "string",
  },
  {
    title: "46.VPH",
    value: "vir_papil",
    format: "string",
  },
  {
    title: "47.TD O TT",
    value: "tetano",
    format: "string",
  },
  {
    title: "48.CTL PLAC",
    value: "control_placa",
    format: "string",
  },
  {
    title: "49.FEC AT PARTO",
    value: "fecha_aten_parto",
    format: "fecha",
  },
  {
    title: "50.FEC SAL PART",
    value: "fecha_sali_parto",
    format: "fecha",
  },
  {
    title: "51.FEC CONS LAC",
    value: "fecha_cons_lacta",
    format: "fecha",
  },
  {
    title: "52.CTL REC NACI",
    value: "fecha_cont_recie",
    format: "fecha",
  },
  {
    title: "53.PLANIF. FAMI",
    value: "fecha_1er_pla_familiar",
    format: "fecha",
  },
  {
    title: "54.SUM ANTICONC",
    value: "sumin_anticocep",
    format: "string",
  },
  {
    title: "55.FEC SUM ANTI",
    value: "fecha_sumin",
    format: "fecha",
  },
  {
    title: "56.CTL PRENATAL",
    value: "fecha_1er_cnt_prenatal",
    format: "fecha",
  },
  {
    title: "57.NRO CONTROL",
    value: "nro_ctn_preanatal",
    format: "string",
  },
  {
    title: "58.FEC ULT CTL",
    value: "fecha_ult_cnt_prenatal",
    format: "fecha",
  },
  {
    title: "59.SUM ACID FOL",
    value: "sumin_acido_foli_gest",
    format: "string",
  },
  {
    title: "60.SUM SULF FER",
    value: "sumin_sulfa_ferr_gest",
    format: "string",
  },
  {
    title: "61.SUM CARB CAL",
    value: "sumin_carbo_calc_gest",
    format: "string",
  },
  {
    title: "62.VAL.AGUD.VIS",
    value: "fecha_valora_agud_visual",
    format: "fecha",
  },
  {
    title: "63.CTL OFTALMOL",
    value: "fecha_consul_oftamlmo",
    format: "string",
  },
  {
    title: "64.FEC DIAG DESNU",
    value: "fecha_diagn_nutri",
    format: "fecha",
  },
  {
    title: "65.FEC CONS MALTR",
    value: "fecha_consul_maltra",
    format: "fecha",
  },
  {
    title: "66.FEC CONS VIOLE",
    value: "fecha_consul_viol_sexo",
    format: "fecha",
  },
  {
    title: "67.FEC CONS NUTRI",
    value: "fecha_consul_nutri",
    format: "fecha",
  },
  {
    title: "68.FEC CONS PSICO",
    value: "fecha_consul_psicol",
    format: "fecha",
  },
  {
    title: "69.FEC CONS CYDES",
    value: "fecha_1er_consu_creci",
    format: "fecha",
  },
  {
    title: "70.FEC SUM SULF.F",
    value: "sumin_sulfa_ferr_gest",
    format: "string",
  },
  {
    title: "71.FEC SUM VIT A",
    value: "sumin_vita_a_nino",
    format: "string",
  },
  {
    title: "72.FEC CONS JOVEN",
    value: "fecha_1er_consu_joven",
    format: "fecha",
  },
  {
    title: "73.FEC CONS ADULT",
    value: "fecha_1er_consu_adult",
    format: "fecha",
  },
  {
    title: "74.NRO PRESERVAT",
    value: "preser_entr_vih",
    format: "string",
  },
  {
    title: "75.FEC ASES PRE",
    value: "fecha_test_vih_pre",
    format: "fecha",
  },
  {
    title: "76.FEC ASES POS",
    value: "fecha_test_vih_pos",
    format: "fecha",
  },
  {
    title: "77.DIAG DEPRESION",
    value: "aten_enf_mental",
    format: "string",
  },
  {
    title: "78.FEC HEPAT B",
    value: "fecha_antig_hepb_gest",
    format: "fecha",
  },
  {
    title: "79.RESULT HEPAT B",
    value: "resul_antig_hepb_gest",
    format: "string",
  },
  {
    title: "80.FEC SEROL SIFI",
    value: "fecha_serol_sifil",
    format: "fecha",
  },
  {
    title: "81.RESULT SEROLOG",
    value: "resul_serol_sifil",
    format: "string",
  },
  {
    title: "82.FEC TOMA VIH",
    value: "fecha_exam_vih",
    format: "fecha",
  },
  {
    title: "83.RESULT VIH",
    value: "resul_exam_vih",
    format: "string",
  },
  {
    title: "84.FEC TSH",
    value: "fecha_exam_tsh_neon",
    format: "fecha",
  },
  {
    title: "85.RESULT. TSH",
    value: "resul_exam_tsh_neon",
    format: "string",
  },
  {
    title: "86.TAMIZ CANC CUE",
    value: "tamiz_cancer_cuello_ut",
    format: "string",
  },
  {
    title: "87.FEC TOMA CITOL",
    value: "fecha_citol",
    format: "fecha",
  },
  {
    title: "88.RESULT CITOLOG",
    value: "resul_citol",
    format: "string",
  },
  {
    title: "89.CAL MUEST CITO",
    value: "calid_muest_citol",
    format: "string",
  },
  {
    title: "90.IPS TOMA CITOL",
    value: "cod_ips_citol",
    format: "string",
  },
  {
    title: "91.FEC COLPOSCOPI",
    value: "fecha_colposcod",
    format: "fecha",
  },
  {
    title: "92.IPS TOMA COLPO",
    value: "cod_ips_colposcod",
    format: "string",
  },
  {
    title: "93.FEC BIOPS SERV",
    value: "fecha_biop_cerv",
    format: "fecha",
  },
  {
    title: "94.RESULT BIOPS S",
    value: "result_biop_cerv",
    format: "string",
  },
  {
    title: "95.IPS TOMA BIOPS",
    value: "cod_ips_biop_cerv",
    format: "string",
  },
  {
    title: "96.FEC MAMOGRAFIA",
    value: "fecha_mamograf",
    format: "fecha",
  },
  {
    title: "97.RESULT MAMOGRA",
    value: "resul_mamograf",
    format: "string",
  },
  {
    title: "98.IPS TOMA MAMOG",
    value: "cod_ips_mamograf",
    format: "string",
  },
  {
    title: "99.FEC TOMA B.SEN",
    value: "fecha_biop_seno",
    format: "fecha",
  },
  {
    title: "100.FEC RESULT B.SENO",
    value: "fecha_resul_biop_seno",
    format: "fecha",
  },
  {
    title: "101.RESULT BIOPS SENO",
    value: "resul_biop_seno",
    format: "fecha",
  },
  {
    title: "102.IPS TOMA BIOS SENO",
    value: "cod_ips_biop_seno",
    format: "string",
  },
  {
    title: "103.FEC TOMA HEMOGLOBI",
    value: "fecha_hemoglo",
    format: "fecha",
  },
  {
    title: "104.RESULT HEMOGLOBI",
    value: "resul_hemoglo",
    format: "string",
  },
  {
    title: "105.FEC TOMA GLIC BASA",
    value: "fecha_toma_glicem",
    format: "fecha",
  },
  {
    title: "106.FEC TOMA CREATININ",
    value: "fecha_creatinina",
    format: "fecha",
  },
  {
    title: "107.RESULT CREATININA",
    value: "resul_creatinina",
    format: "fecha",
  },
  {
    title: "108.FEC HEMOGLOB GLICO",
    value: "fecha_hemoglob_glic",
    format: "fecha",
  },
  {
    title: "109.RESULT HEMOGLOB GL",
    value: "resul_hemoglob_glic",
    format: "string",
  },
  {
    title: "110.FEC TOMA MICROALBU",
    value: "fecha_toma_microalbum",
    format: "fecha",
  },
  {
    title: "111.FEC TOMA HDL",
    value: "fecha_toma_hdl",
    format: "fecha",
  },
  {
    title: "112.FEC TOMA BASILOSC",
    value: "fecha_bacilosco",
    format: "fecha",
  },
  {
    title: "113.RESULT BAILOSCOP",
    value: "resul_bacilosco",
    format: "string",
  },
  {
    title: "114.TRATAM HIPOTIROID",
    value: "tratam_hipotiro",
    format: "string",
  },
  {
    title: "115.TRATAM SIFIL GEST",
    value: "tratam_sifilis_gest",
    format: "string",
  },
  {
    title: "116.TRATAM SIFIL CONG",
    value: "tratam_sifilis_conge",
    format: "string",
  },
  {
    title: "117.TRATAM LEPRA",
    value: "tratam_lepra",
    format: "string",
  },
  {
    title: "118.FEC TERM LESMANIA",
    value: "fecha_term_lesmana",
    format: "fecha",
  },
  {
    title: "EDAD CORTE",
    value: "edad_corte",
    format: "string",
  },
];


const columnas_ser540b_21 = [
  {
    title: "TPO",
    value: "tipo",
    format: "string",
  },
  {
    title: "1.CONSEC",
    value: "consenc",
    format: "string",
  },
  {
    title: "2.HABILITA",
    value: "cod_habil",
    format: "string",
  },
  {
    title: "3.TIPO ID",
    value: "tipo_id",
    format: "string",
  },
  {
    title: "4.NRO DOC",
    value: "id",
    format: "string",
  },
  {
    title: "5.1ER APEL",
    value: "primer_apel",
    format: "string",
  },
  {
    title: "6.2DO APEL",
    value: "segundo_apel",
    format: "string",
  },
  {
    title: "7.1ER NOMB",
    value: "primer_nomb",
    format: "string",
  },
  {
    title: "8.2DO NOMB",
    value: "segundo_nomb",
    format: "string",
  },
  {
    title: "9.FEC. NACI",
    value: "fecha_naci",
    format: "fecha",
  },
  {
    title: "10.SEXO",
    value: "sexo",
    format: "string",
  },
  {
    title: "11.ETNIA",
    value: "etnia",
    format: "string",
  },
  {
    title: "12.OCUP",
    value: "ocupa",
    format: "string",
  },
  {
    title: "13.NIV EST",
    value: "niv_est",
    format: "string",
  },
  {
    title: "14.EMBARAZ",
    value: "gestacion",
    format: "string",
  },
  {
    title: "15.SIFILIS",
    value: "sifilis",
    format: "string",
  },
  {
    title: "16.MINI MENTAL",
    value: "minimental",
    format: "string",
  },
  {
    title: "17.HIPOTIROI",
    value: "hipotir",
    format: "string",
  },
  {
    title: "18.SINT RESP",
    value: "sinto_resp",
    format: "string",
  },
  {
    title: "19.TABAQUISMO",
    value: "tabaquismo",
    format: "string",
  },
  {
    title: "20.LEPRA",
    value: "lepra",
    format: "string",
  },
  {
    title: "21.OBES/DESN",
    value: "nutricion",
    format: "string",
  },
  {
    title: "22.TACTO RECTAL",
    value: "tacto_rectal",
    format: "string",
  },
  {
    title: "23.CIDO FOL",
    value: "acid_fol_precon",
    format: "string",
  },
  {
    title: "24.SANGRE EN HECES",
    value: "resul_sang_heces",
    format: "string",
  },
  {
    title: "25.ENF.MENT",
    value: "enf_mental",
    format: "string",
  },
  {
    title: "26.CANC.CERV",
    value: "cancer_cervix",
    format: "string",
  },
  {
    title: "27.A VISUAL LEJ OI",
    value: "agud_vis_lej_oi",
    format: "string",
  },
  {
    title: "28.A VISUAL LEJ OD",
    value: "agud_vis_lej_od",
    format: "string",
  },
  {
    title: "29.FECHA PESO",
    value: "fecha_peso",
    format: "fecha",
  },
  {
    title: "30.PESO",
    value: "peso",
    format: "string",
  },
  {
    title: "31.FECHA TALL",
    value: "fecha_talla",
    format: "fecha",
  },
  {
    title: "32. TALLA",
    value: "talla",
    format: "string",
  },
  {
    title: "33.F.P.PARTO",
    value: "fecha_apro_parto",
    format: "fecha",
  },
  {
    title: "34.PAIS.",
    value: "pais",
    format: "string",
  },
  {
    title: "35.RIESG.GEST",
    value: "riesg_gest",
    format: "string",
  },
  {
    title: "36.COLONOSCOPIA",
    value: "result_colonosc",
    format: "string",
  },
  {
    title: "37.TAMIZ.AUID NEONATO",
    value: "result_tamiz_aud_neo",
    format: "string",
  },
  {
    title: "38.TAMIZ.VISUAL NEONATO",
    value: "result_tamiz_vis_neo",
    format: "string",
  },
  {
    title: "39.DPT",
    value: "dpt",
    format: "string",
  },
  {
    title: "40.VALE",
    value: "result_vale",
    format: "string",
  },
  {
    title: "41.NEUMOCO",
    value: "neumoco",
    format: "string",
  },
  {
    title: "42.TAMIZ. HEPAT C",
    value: "result_hepat_c",
    format: "string",
  },
  {
    title: "43.ESCALA MOTRIZ GRU",
    value: "escala_mot_gru",
    format: "string",
  },
  {
    title: "44.ESCALA MOTRIZ FIN",
    value: "escala_mot_fin",
    format: "string",
  },
  {
    title: "45.ESCALA PERSONAL",
    value: "escala_per_soc",
    format: "string",
  },
  {
    title: "46.ESCALA AUD LENG",
    value: "escala_mot_leng",
    format: "string",
  },
  {
    title: "47.CRIOTERAPIA",
    value: "criotera",
    format: "string",
  },
  {
    title: "48.OXIMETRIA DUCTAL",
    value: "result_oximet_conduc",
    format: "string",
  },
  {
    title: "49.FEC AT PARTO",
    value: "fecha_aten_parto",
    format: "fecha",
  },
  {
    title: "50.FEC SAL PART",
    value: "fecha_sali_parto",
    format: "fecha",
  },
  {
    title: "51.FEC CONS LAC",
    value: "fecha_cons_lacta",
    format: "fecha",
  },
  {
    title: "52.FEC CONS INTEG",
    value: "fecha_cons_integ",
    format: "fecha",
  },
  {
    title: "53.PLANIF. FAMI",
    value: "fecha_1er_pla_familiar",
    format: "fecha",
  },
  {
    title: "54.SUM ANTICONC",
    value: "sumin_anticocep",
    format: "string",
  },
  {
    title: "55.FEC SUM ANTI",
    value: "fecha_sumin",
    format: "fecha",
  },
  {
    title: "56.CTL PRENATAL",
    value: "fecha_1er_cnt_prenatal",
    format: "fecha",
  },
  {
    title: "57.RESUL GLIC BASAL",
    value: "result_glicem_basal",
    format: "string",
  },
  {
    title: "58.FEC ULT CTL",
    value: "fecha_ult_cnt_prenatal",
    format: "fecha",
  },
  {
    title: "59.SUM ACID FOL",
    value: "sumin_acido_foli_gest",
    format: "string",
  },
  {
    title: "60.SUM SULF FER",
    value: "sumin_sulfa_ferr_gest",
    format: "string",
  },
  {
    title: "61.SUM CARB CAL",
    value: "sumin_carbo_calc_gest",
    format: "string",
  },
  {
    title: "62.VAL.AGUD.VIS",
    value: "fecha_valora_agud_visual",
    format: "fecha",
  },
  {
    title: "63.FEC VALE",
    value: "fecha_vale",
    format: "fecha",
  },
  {
    title: "64.FEC TACTO RECTAL",
    value: "fecha_tacto_rect",
    format: "fecha",
  },
  {
    title: "65.FEC TAMIZ OXIMET",
    value: "fecha_oxim_ductal",
    format: "fecha",
  },
  {
    title: "66.FEC COLONOSCOPIA",
    value: "fecha_colonosc",
    format: "fecha",
  },
  {
    title: "67.FEC EXAM SANGRE HECES",
    value: "fecha_sangre_heces",
    format: "fecha",
  },
  {
    title: "68.FEC CONS PSICO",
    value: "fecha_consul_psicol",
    format: "fecha",
  },
  {
    title: "69.TAMIZ AUD NEONAT",
    value: "fecha_tamiz_aud_neonat",
    format: "string",
  },
  {
    title: "70.FEC SUM SULF.F 6 A23 MES",
    value: "sumin_sulfa_ferr_nino",
    format: "fecha",
  },
  {
    title: "71.FEC SUM VIT A 24 A60 MES",
    value: "sumin_vita_a_nino",
    format: "fecha",
  },
  {
    title: "72.FEC TOMA LDL",
    value: "fecha_toma_ldl",
    format: "fecha",
  },
  {
    title: "73.TOMA PSA",
    value: "fecha_toma_psa",
    format: "fecha",
  },
  {
    title: "74.NRO PRESERVAT",
    value: "preser_entr_vih",
    format: "string",
  },
  {
    title: "75.FEC TAMIZ VISUAL NEONAT",
    value: "fecha_tamiz_vis_neo",
    format: "fecha",
  },
  {
    title: "76.FEC CONS SALUD BUCAL",
    value: "fecha_cons_odont",
    format: "fecha",
  },
  {
    title: "77.SUM HIERRO 24 A 59 MES",
    value: "sumin_hierro_24_59m",
    format: "fecha",
  },
  {
    title: "78.FEC HEPAT B",
    value: "fecha_antig_hepb_gest",
    format: "fecha",
  },
  {
    title: "79.RESULT HEPAT B",
    value: "resul_antig_hepb_gest",
    format: "string",
  },
  {
    title: "80.FEC SEROL SIFI",
    value: "fecha_serol_sifil",
    format: "fecha",
  },
  {
    title: "81.RESULT SEROLOG",
    value: "resul_serol_sifil",
    format: "string",
  },
  {
    title: "82.FEC TOMA VIH",
    value: "fecha_exam_vih",
    format: "fecha",
  },
  {
    title: "83.RESULT VIH",
    value: "resul_exam_vih",
    format: "string",
  },
  {
    title: "84.FEC TSH",
    value: "fecha_exam_tsh_neon",
    format: "fecha",
  },
  {
    title: "85.RESULT. TSH",
    value: "resul_exam_tsh_neon",
    format: "string",
  },
  {
    title: "86.TAMIZ CANC CUE",
    value: "tamiz_cancer_cuello_ut",
    format: "string",
  },
  {
    title: "87.FEC TOMA CITOL",
    value: "fecha_citol",
    format: "fecha",
  },
  {
    title: "88.RESULT CITOLOG",
    value: "resul_citol",
    format: "string",
  },
  {
    title: "89.CAL MUEST CITO",
    value: "calid_muest_citol",
    format: "string",
  },
  {
    title: "90.IPS TOMA CITOL",
    value: "cod_ips_citol",
    format: "string",
  },
  {
    title: "91.FEC COLPOSCOPI",
    value: "fecha_colposcod",
    format: "fecha",
  },
  {
    title: "92.RESULT LDL",
    value: "result_ldl",
    format: "string",
  },
  {
    title: "93.FEC BIOPS SERV",
    value: "fecha_biop_cerv",
    format: "fecha",
  },
  {
    title: "94.RESULT BIOPS S",
    value: "result_biop_cerv",
    format: "string",
  },
  {
    title: "95.RESULT HDL",
    value: "result_hdl",
    format: "string",
  },
  {
    title: "96.FEC MAMOGRAFIA",
    value: "fecha_mamograf",
    format: "fecha",
  },
  {
    title: "97.RESULT MAMOGRA",
    value: "resul_mamograf",
    format: "string",
  },
  {
    title: "98.IPS TOMA MAMOG",
    value: "cod_ips_mamograf",
    format: "string",
  },
  {
    title: "99.FEC TOMA B.SEN",
    value: "fecha_biop_seno",
    format: "fecha",
  },
  {
    title: "100.FEC RESULT B.SENO",
    value: "fecha_resul_biop_seno",
    format: "fecha",
  },
  {
    title: "101.RESULT BIOPS SENO",
    value: "resul_biop_seno",
    format: "fecha",
  },
  {
    title: "102.COP X PERSONA",
    value: "cod_x_persona",
    format: "string",
  },
  {
    title: "103.FEC TOMA HEMOGLOBI",
    value: "fecha_hemoglo",
    format: "fecha",
  },
  {
    title: "104.RESULT HEMOGLOBI",
    value: "resul_hemoglo",
    format: "string",
  },
  {
    title: "105.FEC TOMA GLIC BASA",
    value: "fecha_toma_glicem",
    format: "fecha",
  },
  {
    title: "106.FEC TOMA CREATININ",
    value: "fecha_creatinina",
    format: "fecha",
  },
  {
    title: "107.RESULT CREATININA",
    value: "resul_creatinina",
    format: "fecha",
  },
  {
    title: "108.PRESERV. ENTREGADO",
    value: "fecha_entreg_preserv",
    format: "fecha",
  },
  {
    title: "109.RESULT PSA",
    value: "resul_psa",
    format: "string",
  },
  {
    title: "110.FEC TOMA HEPAT C",
    value: "fecha_toma_hepat_c",
    format: "fecha",
  },
  {
    title: "111.FEC TOMA HDL",
    value: "fecha_toma_hdl",
    format: "fecha",
  },
  {
    title: "112.FEC TOMA BASILOSC",
    value: "fecha_bacilosco",
    format: "fecha",
  },


  {
    title: "113.RESULT BASILOSCOP",
    value: "resul_bacilosco",
    format: "string",
  },
  {
    title: "114.CLASIF RIESGO CARD",
    value: "clasif_riesg_cardio",
    format: "string",
  },
  {
    title: "115.TRATAM SIFIL GEST",
    value: "tratam_sifilis_gest",
    format: "string",
  },
  {
    title: "116.TRATAM SIFIL CONG",
    value: "tratam_sifilis_conge",
    format: "string",
  },
  {
    title: "117.CLASIF RIESGO METAB",
    value: "clasif_riesg_metab",
    format: "string",
  },
  {
    title: "118.FEC TOMA TRIGLICE",
    value: "fecha_toma_triglice",
    format: "fecha",
  },
  {
    title: "EDAD CORTE",
    value: "edad_corte",
    format: "string",
  },
];
