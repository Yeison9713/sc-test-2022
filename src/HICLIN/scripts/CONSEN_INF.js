new Vue({
  el: "#CONSEN_INF",
  data: {
    paci_firma: "",
    id_acomp: "",
    descrip_acomp: "",
    parentesco: "",
    tipo_parentesco: "",
    fecha_act: moment().format("YYYYMMDD"),
    params_ser110c_ac: {
      estado: false,
    },
    acomp: {
      id_AC: "",
      tipoId_AC: "",
      apellido1_AC: "",
      apellido2_AC: "",
      nombre1_AC: "",
      nombre2_AC: "",
      telefono_AC: "",
      ciudad_AC: "",
      descripCiudad_AC: "",
      direccion_AC: "",
      descrip: "",
      novedad: 7,
    },
    paci: $_REG_PACI,
    hcprc: $_REG_HC,
    array_parentesco: _tipoJsonHc("parentesco"),
    novedad: "",
    array_novedad: [
      { COD: "1", DESCRIP: "ELABORAR CONSENTIMIENTO" },
      { COD: "2", DESCRIP: "RE-IMPRIMIR CONSENTIMIENTO" },
    ],
  },
  created() {
    _inputControl("disabled");
    _inputControl("reset");

    this.paci.DESCRIP = this.paci.DESCRIP.replaceEsp();
    this.paci.COD = isNaN(this.paci.COD) ? this.paci.COD : new Intl.NumberFormat("ja-JP").format(this.paci.COD);

    this.hcprc.folio_edit = `${this.hcprc.suc_folio_hc} - ${this.hcprc.nro_folio_hc}`;
    this.validar_novedad();
    // this.getHistoria();
  },
  components: {
    acomp: component_acomp,
  },
  methods: {
    validar_novedad() {
      setTimeout(() => {
        POPUP(
          {
            titulo: "NOVEDAD",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            array: this.array_novedad,
            seleccion: "1",
            callback_f: () => {
              CON851P("03", this.validar_novedad, _regresar_menuhis);
            },
          },
          (data) => {
            this.novedad = data.COD;
            if (this.novedad == "1") this.getHistoria();
            else this.iniciarConsen();
          }
        );
      }, 300);
    },

    getHistoria() {
      loader("show");
      postData(
        { datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|1|" },
        get_url("APP/HICLIN/GET_HC.DLL")
      )
        .then((datos) => {
          loader("hide");
          const reg_hc = datos;

          if (
            (reg_hc.novedad == "8" && reg_hc.cierre.estado == 1 && reg_hc.cierre.temporal == "0") ||
            reg_hc.cierre.estado == 2
          ) {
            this.pacienteFirma();
          } else {
            CON851("", "Opción inhabilitada para Historias temporales", null, "warning", "Advertencia");
            _regresar_menuhis();
          }
        })
        .catch((err) => {
          loader("hide");
          console.error("Error consultando historia clinica: ", err);
          CON851("", "Error consultando historia clinica!", null, "error", "Error");
          _regresar_menuhis();
        });
    },

    pacienteFirma() {
      validarInputs(
        {
          form: "#paci_firma",
        },
        _regresar_menuhis,
        () => {
          this.paci_firma = this.paci_firma.toUpperCase();
          if (this.paci_firma != "S") this.paci_firma = "N";
          if (this.paci_firma == "S") {
            this.iniciarConsen();
          } else {
            this.datoAcompañante();
          }
        }
      );
    },

    datoAcompañante() {
      validarInputs(
        {
          form: "#id_acomp",
        },
        this.pacienteFirma,
        () => {
          if (this.id_acomp.trim()) {
            loader("show");
            postData({ datosh: datosEnvio() + this.id_acomp.padStart(15, "0") }, get_url("APP/SALUD/SER810-1.DLL"))
              .then((data) => {
                loader("hide");
                this.id_acomp = data["REG-PACI"][0].COD;
                this.descrip_acomp = data["REG-PACI"][0].DESCRIP;
                this.datoParentesco();
              })
              .catch((error) => {
                loader("hide");
                this.acomp.id_AC = this.id_acomp;
                console.error(error);
                if (error.MENSAJE != "01") {
                  CON851("", "Error consultando paciente", null, "error", "");
                  this.datoAcompañante();
                } else this.ventanaAcomp();
              });
          } else {
            this.datoAcompañante();
          }
        }
      );
    },

    async verificarAcomp() {
      return new Promise((resolve, reject) => {
        loader("show");
        postData({ datosh: datosEnvio() + cerosIzq(this.acomp.id_AC, 15) + "|2|" }, get_url("app/SALUD/SER810-1.DLL"))
          .then((data) => {
            this.reg_acomp = data["REG-PACI"][0];
            loader("hide");
            resolve();
          })
          .catch((err) => {
            loader("hide");
            console.error(err, "error");
            reject();
          });
      });
    },

    datoParentesco() {
      POPUP(
        {
          titulo: "PARENTESCO",
          array: this.array_parentesco,
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.parentesco,
          callback_f: this.datoAcompañante,
        },
        (data) => {
          this.parentesco = data.DESCRIP;
          this.tipo_parentesco = data.COD;
          this.iniciarConsen();
        }
      );
    },

    iniciarConsen() {
      CON851P(
        "Continuar con el proceso? \n El módulo de consentimiento se abrira en el navegador!",
        () => {
          if (this.novedad == "1") this.pacienteFirma();
          else this.validar_novedad();
        },
        () => {
          let url = "";
          let id_acomp =
            this.id_acomp.trim().padStart(15, "0") == "000000000000000" ? "" : this.id_acomp.padStart(15, "0");
          if (this.novedad == "1") {
            url = `http://${localStorage.IP_DATOS}/consentimientos/#/inicio/HIC|${localStorage.Usuario}|${
              this.hcprc.llave_hc
            }|${$_REG_PROF.IDENTIFICACION.padStart(10, "0")}|${id_acomp}|${this.tipo_parentesco}`;
          } else {
            url = `http://${localStorage.IP_DATOS}/consentimientos/#/inicio/HIC|${localStorage.Usuario}|${this.hcprc.llave_hc}|`;
          }

          shell.openExternal(url);
          console.log(url);
          loader("show");
          setTimeout(() => {
            _regresar_menuhis();
          }, 500);
        }
      );
    },

    async leerAcomp() {
      if (this.acomp.novedad == 7) {
        this.descrip_acomp = "";
        CON851("01", "01", null, "error", "error");
        this.datoAcompañante();
      } else {
        this.id_acomp = this.acomp.id_AC;
        await this.verificarAcomp()
          .then(() => {
            this.descrip_acomp = this.reg_acomp ? this.reg_acomp.DESCRIP.replace(/\s+/g, " ") : "";
            this.datoParentesco();
          })
          .catch((error) => {
            console.error(error);
            CON851("", "01", null, "error", "Error");
            this.datoAcompañante();
          });
      }
    },

    validarEsc_acomp(data) {
      this.params_ser110c_ac.estado = false;
      this.acomp = data;
      this.leerAcomp();
    },

    validarCallback_acomp(data) {
      this.params_ser110c_ac.estado = false;
      console.log(this.acomp, "ACOMP");
      setTimeout(() => {
        this.leerAcomp();
      }, 300);
    },

    ventanaAcomp() {
      CON851P("08", this.datoAcompañante, () => {
        this.params_ser110c_ac.estado = true;
      });
    },

    _ventanaPacientes() {
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre del paciente"],
        f8data: "PACIENTES",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }, { title: "EDAD" }],
        cancel: () => {
          document.querySelector(".id_acomp").focus();
        },
        callback: (data) => {
          this.id_acomp = cerosIzq(data.COD, 15);
          this.descrip_acomp = data.NOMBRE;
          setTimeout(() => {
            _enterInput(".id_acomp");
          }, 200);
        },
      };
      F8LITE(parametros);
    },
  },
});
