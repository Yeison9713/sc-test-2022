new Vue({
  el: "#RX_WEB01_MASIVO",
  data: {
    anoSync: "",
    mesPRESync: "",
    diaPRESync: "",
    mesPOSSync: "",
    diaPOSSync: "",
    estudios: [],
    mostrarTabla: false
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    _inputControl("reset");

    nombreOpcion("7 - Sincronizar estudios a base de facturación");

    if (localStorage.Unidad == "P") this.montarAno();
    else {
      CON851("", "Opcion no disponible para esta empresa !", null, "warning", "Advertencia");
      setTimeout(this.salir_rxmasivo, 1000)
    }
  },
  watch: {},
  methods: {
    montarAno() {
      this.anoSync = (parseInt($_USUA_GLOBAL[0].FECHALNK.substring(0, 2)) + 2000).toString();
      this.mesPRESync = "01";
      this.diaPRESync = "01";
      this.mesPOSSync = "01";
      this.diaPOSSync = "01";

      this.validarMesPREListado();
    },
    validarMesPREListado() {
      validarInputs(
        {
          form: "#validarMesPRE_rxmasivo",
          orden: "1",
        },
        () => this.salir_rxmasivo(),
        () => {
          this.mesPRESync = cerosIzq(this.mesPRESync, 2);

          if (parseInt(this.mesPRESync) > 12 || parseInt(this.mesPRESync) < 1) {
            CON851("", "Mes fuera de rango !", null, "error", "Error");
            this.validarMesPREListado();
          } else this.validarDiaPRElistado();
        }
      );
    },
    validarDiaPRElistado() {
      validarInputs(
        {
          form: "#validarDiaPRE_rxmasivo",
          orden: "1",
        },
        () => this.validarMesPREListado(),
        () => {
          this.diaPRESync = cerosIzq(this.diaPRESync, 2);

          if (parseInt(this.diaPRESync) > 31 || parseInt(this.diaPRESync) < 1) {
            CON851("", "Dia fuera de rango !", null, "error", "Error");
            this.validarDiaPRElistado();
          } else this.validarMesPOS_rxmasivo();
        }
      );
    },
    validarMesPOS_rxmasivo() {
      validarInputs(
        {
          form: "#validarMesPOS_rxmasivo",
          orden: "1",
        },
        () => this.validarDiaPRElistado(),
        () => {
          this.mesPOSSync = cerosIzq(this.mesPOSSync, 2);

          if (parseInt(this.mesPOSSync) > 12 || parseInt(this.mesPOSSync) < 1) {
            CON851("", "Mes fuera de rango !", null, "error", "Error");
            this.validarMesPOS_rxmasivo();
          } else this.validarDiaPOS_rxmasivo();
        }
      );
    },
    validarDiaPOS_rxmasivo() {
      let _this = this
      validarInputs(
        {
          form: "#validarDiaPOS_rxmasivo",
          orden: "1",
        },
        () => this.validarMesPOS_rxmasivo(),
        () => {
          this.diaPOSSync = cerosIzq(this.diaPOSSync, 2);

          if (parseInt(this.diaPOSSync) > 31 || parseInt(this.diaPOSSync) < 1) {
            CON851("", "Dia fuera de rango !", null, "error", "Error");
            this.validarDiaPOS_rxmasivo();
          } else CON851P("Seguro que desea continuar con el proceso ?", _this.validarDiaPOS_rxmasivo, _this.llamadoDLL);
        }
      );
    },
    llamadoDLL() {
      this.estudios = []
      let _this = this
      loader("show");
      postData(
        {
          datosh:
            datosEnvio() +
            this.anoSync +
            this.mesPRESync +
            this.diaPRESync +
            "|" +
            this.anoSync +
            this.mesPOSSync +
            this.diaPOSSync +
            "|"
        },
        get_url("app/RX/RX-WEB01-MASIVO.DLL")
      )
        .then((data) => {
          loader("hide");
          console.log(data)
          data.ESTUDIOS.pop()
          let regExp = /[a-zA-Z]/g;
          for (var i in data.ESTUDIOS){
            let paci = data.ESTUDIOS[i].PACIENTE
            if (!regExp.test(paci)) data.ESTUDIOS[i].PACIENTE = parseInt(data.ESTUDIOS[i].PACIENTE)
          }
          _this.mostrarTabla = true
          _this.estudios = data.ESTUDIOS
          _this.validarMesPREListado();
        })
        .catch((err) => {
          console.log(err);
          loader("hide");
          _this.validarMesPREListado();
        });
    },
    salir_rxmasivo() {
      _inputControl("disabled");
      _inputControl("reset");
      _toggleNav();
    },
  },
});
