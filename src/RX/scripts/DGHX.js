new Vue({
  el: "#DGHX",
  data: {
    ordenes: [],
    llave: "",
    prueba: {
      LLAVE: "1234567890",
      ESTADO: "4",
      DESCRIP_ESTADO: "CON PENDIENTES",
      TIPO: "1. Historia clinica",
      SUC: "01",
      CLASE: "3",
      COMPROB: "123456",
      FECHA_SERV_DGH: "2014-09-25T15:50:48",
      TIPO_INGRESO: "2. Ambulatorio",
      IP_SOLIC: "192.168.50.225",
      OPER_SOLIC: "999 - SUPERUSUARIO",
      ENTIDAD: "899999151 - E.S.E. HOSPITAL DE LOS SANTOS",
      MED: "123 - CONDE LOPEZ FERNANDO",
      ESPEC_MED: "001 - ACTIVIDAD FISICO TERAPEUTICA",
      AREA_SERV: "420 - HOSP.",
      ID_PACI: "21375472",
      NOMBRE_PACI: "RODRIGUEZ MORENO EDWIN FERNANDO",
      TIPO_ID: "1. Cedula de ciudadania",
      FECHA_NACIM_PACI: "1942/08/04",
      SEXO_PACI: "1. Masculino",
      EMBAR_PACI: "0. No aplica",
      TELEF_PACI: "3151231278",
      AFIL_PACI: "0. Ninguno",
      EMPR_PACI: "25286 - FUNZA CUNDINAMARCA",
      OCUP_PACI: "999 - PERSONAS QUE NO HAN DECLARADO OCUPACION",
      DIAGN_PACI: "Z000 - EXAMEN MEDICO GENERAL",
      DIRECC_PACI: "FACATATIVA",
      TABLA: [
        {
          CUP_DGH: "902207",
          DESCRIP_CUP_DGH: "RAYOS X CADERA",
          CUP_FACT: "902207",
          DESCRIP_CUP_FACT: "RAYOS X CADERA",
          CANT: "1",
          OBSERV_EXAM: "Observaciones",
          OID_SOLIC: "1862437",
          ESTADO: "1",
        },
        {
          CUP_DGH: "902207",
          DESCRIP_CUP_DGH: "RAYOS X CADERA",
          CUP_FACT: "902207",
          DESCRIP_CUP_FACT: "RAYOS X CADERA",
          CANT: "1",
          OBSERV_EXAM: "Observaciones",
          OID_SOLIC: "1862437",
          ESTADO: "3",
        },
        {
          CUP_DGH: "902207",
          DESCRIP_CUP_DGH: "RAYOS X CADERA",
          CUP_FACT: "902207",
          DESCRIP_CUP_FACT: "RAYOS X CADERA",
          CANT: "1",
          OBSERV_EXAM: "Observaciones",
          OID_SOLIC: "1862437",
          ESTADO: "0",
        },
        {
          CUP_DGH: "902207",
          DESCRIP_CUP_DGH: "RAYOS X CADERA",
          CUP_FACT: "902207",
          DESCRIP_CUP_FACT: "RAYOS X CADERA",
          CANT: "1",
          OBSERV_EXAM: "Observaciones",
          OID_SOLIC: "1862437",
          ESTADO: "1",
        },
        {
          CUP_DGH: "902207",
          DESCRIP_CUP_DGH: "RAYOS X CADERA",
          CUP_FACT: "902207",
          DESCRIP_CUP_FACT: "RAYOS X CADERA",
          CANT: "1",
          OBSERV_EXAM: "Observaciones",
          OID_SOLIC: "1862437",
          ESTADO: "2",
        },
        {
          CUP_DGH: "902207",
          DESCRIP_CUP_DGH: "RAYOS X CADERA",
          CUP_FACT: "902207",
          DESCRIP_CUP_FACT: "RAYOS X CADERA",
          CANT: "1",
          OBSERV_EXAM: "Observaciones",
          OID_SOLIC: "1862437",
          ESTADO: "1",
        },
        {
          CUP_DGH: "902207",
          DESCRIP_CUP_DGH: "RAYOS X CADERA",
          CUP_FACT: "902207",
          DESCRIP_CUP_FACT: "RAYOS X CADERA",
          CANT: "1",
          OBSERV_EXAM: "Observaciones JDFJBDFJBDFJBDFJBDFJBDFJBDF",
          OID_SOLIC: "1862437",
          ESTADO: "3",
        },
      ],
    },
    global_DGHX: {
      LLAVE: "",
      ESTADO: "",
      DESCRIP_ESTADO: "",
      TIPO: "",
      SUC: "",
      CLASE: "",
      COMPROB: "",
      FECHA_SERV_DGH: "",
      TIPO_INGRESO: "",
      IP_SOLIC: "",
      OPER_SOLIC: "",
      ENTIDAD: "",
      MED: "",
      ESPEC_MED: "",
      AREA_SERV: "",
      ID_PACI: "",
      NOMBRE_PACI: "",
      TIPO_ID: "",
      FECHA_NACIM_PACI: "",
      SEXO_PACI: "",
      EMBAR_PACI: "",
      TELEF_PACI: "",
      AFIL_PACI: "",
      EMPR_PACI: "",
      OCUP_PACI: "",
      DIAGN_PACI: "",
      DIRECC_PACI: "",
      TABLA: [],
    },
    estilos: {
      color: "white",
      backgroundColor: "#f2f3f8",
    },
    enter: false,
  },
  created() {
    _inputControl("disabled");
    _inputControl("reset");

    nombreOpcion("6,2- Consulta de órdenes DGH");
    this.validarOrden();
  },
  watch: {
    enter: function (data) {
      console.log(this.global_DGHX.ESTADO, "estado");
      switch (this.global_DGHX.ESTADO) {
        case "0": // RECIBIDO
          this.estilos.backgroundColor = "#404977";
          break;
        case "1": // FACTURADO
          this.estilos.backgroundColor = "#476fad";
          break;
        case "2": //ALGUNOS ENVIADOS
          this.estilos.backgroundColor = "#e88005";
          break;
        case "3": // ENVIADOS TODOS LOS EXAMENES
          this.estilos.backgroundColor = "#129012";
          break;
        case "4": // ANULADO
          this.estilos.backgroundColor = "#da2c2c";
          break;
        default:
          this.estilos.backgroundColor = "#f2f3f8";
          break;
      }
    },
  },
  methods: {
    evaluarClaseTabla(item, index) {
      var clase = "";
      switch (item.ESTADO) {
        case "1":
          clase = "item_blue";
          break;
        case "2":
          clase = "item_green";
          break;
        case "3":
          clase = "item_red";
          break;
      }
      return clase;
    },
    traerOrdenes() {
      var _this = this;

      loader("show");
      postData({ datosh: datosEnvio() }, get_url("APP/RX/DGHX.DLL"))
        .then(function (data) {
          loader("hide");
          _this.ordenes = data.ORDENES;
          _this.ordenes.pop();
          console.log(_this.ordenes);
          _this.ventana_ordenes();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando todas las ordenes", null, "error", "Error");
          loader("hide");
          _this.validarOrden();
        });
    },
    ventana_ordenes() {
      var _this = this;

      _ventanaDatos({
        titulo: "Ventana ordenes",
        columnas: ["ORDEN", "SUC", "CLASE", "COMPROB", "FECHA"],
        data: this.ordenes,
        ancho: "60%",
        callback_esc: () => {
          document.getElementById("orden_DGHX").focus();
        },
        callback: (data) => {
          _this.llave = data.ORDEN;
          setTimeout(() => _enterInput("#orden_DGHX"), 100);
        },
      });
    },
    validarOrden() {
      validarInputs(
        {
          form: "#validarOrden_DGHX",
          orden: "1",
        },
        () => this.salir_DGHX(),
        () => {
          this.llave = this.llave.trim();

          this.consultarOrdenCompleta();
        }
      );
    },
    consultarOrdenCompleta() {
      var _this = this;
      this.inicializarGlobal();

      loader("show");
      postData({ datosh: datosEnvio() + this.llave + "|" }, get_url("APP/RX/DGHX-02.DLL"))
        .then(function (data) {
          loader("hide");
          _this.global_DGHX = data.ORDEN[0];
          // _this.global_DGHX = _this.prueba // SOLO PARA PRUEBAS DE DISEÑO Y ESTADOS
          console.log(_this.global_DGHX);
          _this.enter = true;
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          _this.BotonVolver();
        });
    },
    BotonVolver() {
      this.enter = false;
      this.inicializarGlobal();
      this.validarOrden();
    },
    inicializarGlobal() {
      this.global_DGHX = {
        LLAVE: "",
        ESTADO: "",
        TIPO: "",
        SUC: "",
        CLASE: "",
        COMPROB: "",
        FECHA_SERV_DGH: "",
        TIPO_INGRESO: "",
        IP_SOLIC: "",
        OPER_SOLIC: "",
        ENTIDAD: "",
        MED: "",
        ESPEC_MED: "",
        AREA_SERV: "",
        ID_PACI: "",
        NOMBRE_PACI: "",
        TIPO_ID: "",
        FECHA_NACIM_PACI: "",
        SEXO_PACI: "",
        EMBAR_PACI: "",
        TELEF_PACI: "",
        AFIL_PACI: "",
        EMPR_PACI: "",
        OCUP_PACI: "",
        DIAGN_PACI: "",
        DIRECC_PACI: "",
        TABLA: [],
      };
    },
    salir_DGHX() {
      _inputControl("disabled");
      _inputControl("reset");
      _toggleNav();
    },
  },
});
