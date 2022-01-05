// LISTADO DE CARTERA X EDADES - OPCIONAL - DAVID.M - 16-02-2021

new Vue({
  el: "#SER519",
  data: {
    ano_ini: 0,
    mes_ini: 0,
    dia_ini: 0,
    ano_fin: 0,
    mes_fin: 0,
    dia_fin: 0,
    ano_abo: 0,
    mes_abo: 0,
    dia_abo: 0,
    fecha_act: moment().format("YYYYMMDD"),
    actividad: "",
    prese: "",
    trimestre: "",
    no_radicadas: "",
    array_actividades: [],
    files_txt: [],
  },
  created() {
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion("9-7-5-D-1 - Circular 030 Cartera");
    $this = this;
    loader("hide");
    this.traerActividades();
  },

  computed: {
    descrip_actividad() {
      if (this.actividad == "**") {
        return "Todas las actividades";
      } else {
        let act = this.array_actividades.find((el) => el.COD.trim() == this.actividad.trim());
        return act ? act.DESCRIP : "";
      }
    },

    descrip_trimestre() {
      console.log("se ejecuta");
      switch (parseInt(this.trimestre)) {
        case 1:
          return "1ER TRIM ENE-MAR";
        case 2:
          return "2DO TRIM ABR-JUN";
        case 3:
          return "3RO TRIM JUL-SEP";
        case 4:
          return "4TO TRIM OCT-DIC";
        default:
          return "ERROR EN TRIM";
      }
    },
  },

  methods: {
    fecha_corte() {
      this.ano_ini = "1998";
      this.mes_ini = this.fecha_act.slice(4, 6);
      this.dia_ini = this.fecha_act.slice(6);

      this.fecha_inicial("1");
    },

    fecha_inicial(orden) {
      this.mes_ini = "01";
      this.dia_ini = "01";

      if (this.ano_ini == 0) {
        this.ano_ini = this.fecha_act.slice(0, 4);
        this.mes_ini = this.fecha_act.slice(4, 6);
        this.dia_ini = 01;
      }
      validarInputs(
        {
          form: "#fecha_inicial",
          orden: orden,
        },
        () => {
          _toggleNav();
        },
        () => {
          this.ano_ini = cerosIzq(this.ano_ini, 4);
          this.mes_ini = cerosIzq(this.mes_ini, 2);
          this.dia_ini = cerosIzq(this.dia_ini, 2);

          this.inicial = this.ano_ini.toString() + this.mes_ini.toString() + this.dia_ini.toString();

          if (this.mes_ini < 1 || this.mes_ini > 12) {
            CON851("37", "37", null, "error", "error");
            this.fecha_inicial("2");
          } else if (this.dia_ini < 1 || this.dia_ini > 31) {
            CON851("37", "37", null, "error", "error");
            this.fecha_inicial("3");
          } else {
            this.fecha_final("1");
          }
        }
      );
    },

    fecha_final(orden) {
      this.ano_fin = $_USUA_GLOBAL[0].FECHA_ALFA.slice(16);
      this.mes_fin = this.fecha_act.slice(4, 6);
      this.dia_fin = this.fecha_act.slice(6);

      if (this.ano_fin == 0) {
        this.ano_fin = this.fecha_act.substring(0, 4);
        this.mes_fin = this.fecha_act.substring(4, 6);
        this.dia_fin = this.fecha_act.substring(6, 8);
      }
      validarInputs(
        {
          form: "#fecha_final",
          orden: orden,
        },
        () => {
          this.fecha_inicial("3");
        },
        () => {
          this.ano_fin = cerosIzq(this.ano_fin, 4);
          this.mes_fin = cerosIzq(this.mes_fin, 2);
          this.dia_fin = cerosIzq(this.dia_fin, 2);

          this.final = this.ano_fin.toString() + this.mes_fin.toString() + this.dia_fin.toString();

          if (this.ano_fin < this.ano_ini) {
            CON851("37", "37", null, "error", "error");
            this.fecha_final("1");
          } else if (this.mes_fin < 1 || this.mes_fin > 12) {
            CON851("37", "37", null, "error", "error");
            this.fecha_final("2");
          } else if (this.dia_fin < 1 || this.dia_fin > 31) {
            CON851("37", "37", null, "error", "error");
            this.fecha_final("3");
          } else if (this.final < this.inicial) {
            CON851("37", "37", null, "error", "error");
            this.fecha_final("1");
          } else {
            this.fecha_abonos("1");
          }
        }
      );
    },

    fecha_abonos(orden) {
      if (this.ano_abo == 0) {
        this.ano_abo = this.fecha_act.substring(0, 4);
        this.mes_abo = this.fecha_act.substring(4, 6);
        this.dia_abo = this.fecha_act.substring(6, 8);
      }
      validarInputs(
        {
          form: "#fecha_abonos",
          orden: orden,
        },
        () => {
          this.fecha_final("3");
        },
        () => {
          this.ano_abo = cerosIzq(this.ano_abo, 4);
          this.mes_abo = cerosIzq(this.mes_abo, 2);
          this.dia_abo = cerosIzq(this.dia_abo, 2);

          this.abonos = this.ano_abo.toString() + this.mes_abo.toString() + this.dia_abo.toString();

          if (this.ano_abo < this.ano_ini) {
            CON851("37", "37", null, "error", "error");
            this.fecha_abonos("1");
          } else if (this.mes_abo < 1 || this.mes_abo > 12) {
            CON851("37", "37", null, "error", "error");
            this.fecha_abonos("2");
          } else if (this.dia_abo < 1 || this.dia_abo > 31) {
            CON851("37", "37", null, "error", "error");
            this.fecha_abonos("3");
          } else if (this.abonos < this.inicial) {
            CON851("37", "37", null, "error", "error");
            this.fecha_abonos("1");
          } else {
            this.aceptar_activ();
          }
        }
      );
    },

    aceptar_activ() {
      if (!this.actividad.trim()) this.actividad = "**";

      validarInputs(
        {
          form: "#actividad",
        },
        () => {
          this.fecha_abonos("3");
        },
        () => {
          if (this.array_actividades.find((e) => e.COD.trim() == this.actividad.trim()) || this.actividad == "**") {
            this.presento();
          } else {
            CON851("", "01", null, "error", "Error");
          }
        }
      );
    },

    presento() {
      if (!this.prese.trim()) this.prese = "N";

      validarInputs(
        {
          form: "#prese",
        },
        () => {
          this.aceptar_activ();
        },
        () => {
          this.prese = this.prese.toUpperCase();
          if (this.prese != "S") this.prese = "N";
          this.aceptar_trimestre();
        }
      );
    },

    aceptar_trimestre() {
      validarInputs(
        {
          form: "#trimestre",
        },
        () => {
          this.presento();
        },
        () => {
          if (![1, 2, 3, 4].includes(parseInt(this.trimestre))) {
            this.aceptar_trimestre();
          } else {
            this.dato_noradica();
          }
        }
      );
    },

    dato_noradica() {
      if (!this.no_radicadas.trim()) this.no_radicadas = "S";

      validarInputs(
        {
          form: "#no_radicadas",
        },
        () => {
          this.aceptar_trimestre();
        },
        () => {
          this.no_radicadas = this.no_radicadas.toUpperCase();
          if (this.no_radicadas != "S") this.no_radicadas = "N";
          this.llamar_DLL();
        }
      );
    },

    llamar_DLL() {
      loader("show");
      postData(
        {
          datosh:
            datosEnvio() +
            this.inicial +
            "|" +
            this.final +
            "|" +
            this.abonos +
            "|" +
            this.actividad +
            "|" +
            this.prese +
            "|" +
            this.trimestre +
            "|" +
            this.no_radicadas +
            "|",
        },
        get_url("APP/SALUD/SER519.DLL")
      )
        .then((data) => {
          data.informe.pop();
          this._iniciarImpresion(data);
        })
        .catch((error) => {
          console.log(error);
          loader("hide");
          this.dato_noradica();
        });
    },

    async _iniciarImpresion(data) {
      await this._check_dir();

      for (let i in data) {
        let datos = await this._getDataInforme();

        await this._generarTxt(datos, data[i]);
      }

      this._abrirTxts();
      _toggleNav();
    },

    _generarTxt(params, object) {
      return new Promise(function (resolve, reject) {
        let data = "";

        let new_item = {
          tipo: "1",
          item_reg: "NI",
          tipo_id: $_USUA_GLOBAL[0].NIT,
          nit_entidad: $_USUA_GLOBAL[0].NOMBRE,
          nombre_ips: params.fecha1,
          tipo_ips: params.fecha2,
          nit_ips: object.length,
          conta_item: 000001,
        };

        object.unshift(new_item);

        for (let i in object) {
          if (object[i].conta_item) {
            columnas_ser519.forEach((a) => {
              let dato = object[i][a.value] || "";

              if (i == 0) dato = dato != "" ? a.value == "nit_ips" ? `${dato}` : `${dato}|` : "";
              else if(a.value == "estado_fact") dato = `${dato}`;
              else dato = `${dato}|`;

              data = `${data}${dato}`;
            });

            data = `${data}\r\n`;
          }
        }

        fs.writeFile(params.ruta_txt, data, (err) => {
          if (err) resolve();
          else {
            $this.files_txt.push(params.ruta_txt);
            loader("hide");
            resolve();
          }
        });
      });
    },

    _getDataInforme() {
      let fecha1 = this.inicial,
        fecha2 = this.final,
        ruta_guardado = "C:\\PROSOFT\\EXPORTAR\\";

      let name_file = `SAC165FIPS${this.fecha_act}${$_USUA_GLOBAL[0].NIT}`;

      return {
        fecha1,
        fecha2,
        name_file,
        ruta_txt: `${ruta_guardado}${name_file}.txt`,
      };
    },

    _abrirTxts() {
      console.log("llega a abrir");
      let data_bat = "",
        dir = `C:\\PROSOFT\\TEMP\\${localStorage.Usuario}-${new Date().getTime()}.bat`;

      this.files_txt.forEach((a) => {
        data_bat = `${data_bat} start ${a}\n`;
      });

      fs.writeFile(dir, data_bat, (err) => {
        if (err) {
          console.error("Error escribiendo bat: \n\n" + err);
        } else {
          exe(dir, function () {});
        }
      });
    },

    _ventanaActividades() {
      _ventanaDatos({
        titulo: "VENTANA DE ACTIVIDADES",
        columnas: ["COD", "DESCRIP"],
        data: this.array_actividades,
        callback_esc: function () {
          document.querySelector(".actividad").focus();
        },
        callback: function (data) {
          $this.actividad = data.COD.trim();
          setTimeout(() => {
            _enterInput(".actividad");
          }, 200);
        },
      });
    },

    traerActividades() {
      postData({ datosh: datosEnvio() + localStorage.Usuario + "|" }, get_url("APP/CONTAB/CON806.DLL"))
        .then((data) => {
          loader("hide");
          this.array_actividades = data.ACTIVIDADES;
          this.array_actividades.pop();
          this.fecha_corte();
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _toggleNav();
        });
    },

    _check_dir() {
      return new Promise(function (resolve, reject) {
        let dir = `C:\\PROSOFT\\TEMP\\${localStorage.Usuario}-${new Date().getTime()}.bat`;

        fs.writeFile(dir, "md c:\\PROSOFT\\EXPORTAR\\", (err) => {
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
  },
});

var columnas_ser519 = [
  {
    value: "tipo",
  },
  {
    value: "item_reg",
  },
  {
    value: "tipo_id",
  },
  {
    value: "nit_entidad",
  },
  {
    value: "nombre_ips",
  },
  {
    value: "tipo_ips",
  },
  {
    value: "nit_ips",
  },
  {
    value: "tipo_cob",
  },
  {
    value: "prefijo",
  },
  {
    value: "nro_fact",
  },
  {
    value: "indic_fact",
  },
  {
    value: "valor_fact",
  },
  {
    value: "fecha_fact",
  },
  {
    value: "fecha_pres",
  },
  {
    value: "fecha_devo",
  },
  {
    value: "abonos",
  },
  {
    value: "glosa",
  },
  {
    value: "rta_glosa",
  },
  {
    value: "saldo",
  },
  {
    value: "rta_cobjuri",
  },
  {
    value: "estado_fact",
  },
];
