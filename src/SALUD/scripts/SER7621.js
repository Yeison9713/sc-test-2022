new Vue({
  el: "#ser7621",
  data: {
    modal_hc: false,
    modal_od: false,
    form: {
      origen: {
        paciente: "",
      },
      destino: {
        paciente: "",
      },
    },
    params_ser7621h: {},
    params_ser7621o: {},
    usuar: $_USUA_GLOBAL[0],
    descripcion: {
      origen: "",
      destino: "",
    },
  },
  components: {
    ser7621h: require("../../SALUD/scripts/SER7621H.vue"),
    ser7621ho: require("../../SALUD/scripts/SER7621O.vue"),
  },
  created() {
    nombreOpcion("9,7,7,6,2,1- Unifica movimiento de pacientes");
    _inputControl("reset");
    _inputControl("disabled");

    this._faseCodOrigen();
  },
  methods: {
    _faseCodOrigen() {
      let _ser7621 = this;
      validarInputs(
        {
          form: "#_faseOrigen",
          orden: "1",
        },
        () => {
          this.terminarProceso();
        },
        _ser7621._validarPacienteOrigen
      );
    },
    _validarPacienteOrigen() {
      let _ser7621 = this,
        {
          origen: { paciente },
        } = _ser7621.form;

      loader("show");
      _ser7621
        ._consultaPaciente(paciente)
        .then((b) => {
          loader("hide");
          _ser7621.descripcion.origen = b.DESCRIP.replace(/\s+/g, " ").trim();
          _ser7621._validarFacturaOrigen();
        })
        .catch((err) => {
          loader("hide");
          _ser7621._faseCodOrigen();
        });
    },

    _validarFacturaOrigen() {
      let _ser7621 = this,
        {
          origen: { paciente },
        } = _ser7621.form;

      let datos = {
        datosh: datosEnvio(),
        paciente_ori: paciente.padStart(15, "0"),
        paso: "1",
      };

      loader("show");
      postData(datos, get_url("APP/SALUD/SER7621.DLL"))
        .then((cod) => {
          loader("hide");
          _ser7621._faseCodDestino();
          if (parseFloat(cod) > 0) CON851("08", "08", null, "error", "error");
        })
        .catch((err) => {
          loader("hide");
          _ser7621._faseCodOrigen();
        });
    },

    _faseCodDestino() {
      let _ser7621 = this;
      validarInputs(
        {
          form: "#_faseDestino",
          orden: "1",
        },
        _ser7621._faseCodOrigen,
        _ser7621._validarPacienteDestino
      );
    },

    _validarPacienteDestino() {
      let _ser7621 = this,
        {
          destino: { paciente },
        } = _ser7621.form;

      loader("show");
      _ser7621
        ._consultaPaciente(paciente)
        .then((b) => {
          loader("hide");
          _ser7621.descripcion.destino = b.DESCRIP.replace(/\s+/g, " ").trim();
          _ser7621._validarProceso();
        })
        .catch((err) => {
          loader("hide");
          _ser7621._faseCodDestino();
        });
    },

    _validarProceso() {
      let _ser7621 = this;
      CON851P(
        "04",
        _ser7621._validarPacienteDestino,
        _ser7621._trasladarInfoFacturas
      );
    },
    _trasladarInfoFacturas() {
      let _ser7621 = this,
        { origen, destino } = this.form,
        anio = this.usuar.FECHALNK.substr(0, 2);

      let datos = {
        datosh: datosEnvio() + localStorage.Usuario + "|" + anio + "|",
        paciente_ori: origen.paciente.padStart(15, "0"),
        paciente_des: destino.paciente.padStart(15, "0"),
        paso: "",
      };

      loader("show");
      postData(datos, get_url("APP/SALUD/SER7621.DLL"))
        .then((data) => {
          loader("hide");

          this.params_ser7621h = {
            suc: "**",
            folio: "",
            admin: localStorage.Usuario,
            pacienteOri: datos.paciente_ori,
            pacienteDes: datos.paciente_des,
          };

          this.modal_hc = true;
        })
        .catch((err) => {
          loader("hide");
          _ser7621._faseSucFolioOrigen();
        });
    },

    salirModalHc() {
      this.modal_hc = false;
      this._faseCodDestino();
    },

    activeModalOdo() {
      this.modal_hc = false;
      let { origen, destino } = this.form;

      this.params_ser7621o = {
        suc: "**",
        folio: "",
        admin: localStorage.Usuario,
        pacienteOri: origen.paciente.padStart(15, "0"),
        pacienteDes: destino.paciente.padStart(15, "0"),
      };

      this.modal_od = true;
    },

    salirModalOd() {
      this.modal_od = false;
      this._faseCodDestino();
    },

    terminarProceso() {
      this.modal_od = false;

      CON851P(
        "Eliminar paciente ?",
        () => {
          this.validarPaciente("N")
        },
        () => {
          this.validarPaciente("S")
        }
      );
    },

    validarPaciente(swok) {
      let { origen } = this.form;

      let datos = {
        datosh: datosEnvio(),
        paciente_ori: origen.paciente.padStart(15, "0"),
        paso: 2,
        eliminar: swok
      }

      console.log(datos)

      postData(datos, get_url("APP/SALUD/SER7621.DLL"))
        .then(res => {
          CON851("", res, null, "success", "");
          this.salir()
        }).catch(err => {
          console.log(err);
          this.salir()
        })
    },

    salir() {
      let Window = BrowserWindow.getAllWindows();
      if (Window.length > 1) {
        _cerrarSegundaVentana();
      } else {
        _toggleNav();
      }
    },

    _consultaPaciente(codigo) {
      return new Promise((resolve, reject) => {
        let datosh = datosEnvio() + codigo.padStart(15, "0") + "|";

        postData({ datosh }, get_url("APP/SALUD/SER810-1.DLL"))
          .then((data) => {
            resolve(data["REG-PACI"][0]);
          })
          .catch(reject);
      });
    },
    _initSer7621() {
      this.form = {
        origen: {
          paciente: "",
          suc: "",
          folio: "",
        },
        destino: {
          paciente: "",
          suc: "",
          folio: "",
        },
      };

      this.descripcion = {
        origen: "",
        destino: "",
      };
      this._faseCodOrigen();
    },
    _ventanaPacienteOrigen() {
      let _ser7621 = this;
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre del paciente"],
        f8data: "PACIENTES",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }],
        callback: (data) => {
          _ser7621.form.origen.paciente = data.COD;
          _ser7621.$refs.cod_paci_ori.focus();
        },
        cancel: () => {
          _ser7621.$refs.cod_paci_ori.focus();
        },
      };

      F8LITE(parametros);
    },
    _ventanaPacienteDestino() {
      let _ser7621 = this;
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre del paciente"],
        f8data: "PACIENTES",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }],
        callback: (data) => {
          _ser7621.form.destino.paciente = data.COD;
          _ser7621.$refs.cod_paci_des.focus();
        },
        cancel: () => {
          _ser7621.$refs.cod_paci_des.focus();
        },
      };

      F8LITE(parametros);
    },
  },
});
