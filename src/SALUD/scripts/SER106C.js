const moment = require("moment");

// 09/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER106C",
  data: {
    SER106C: [],
    form: {
      conveniomedic_SER106C: "",
      descripmedic_SER106C: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,3,5 - Listado de convenios medicamento");
    $_this = this;
    $_this.SER106C.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER106C.ANO_LNK = $_this.SER106C.FECHA_LNK.substring(0, 2);
    $_this.SER106C.MES_LNK = $_this.SER106C.FECHA_LNK.substring(2, 4);
    $_this.SER106C.DIA_LNK = $_this.SER106C.FECHA_LNK.substring(4, 6);
    obtenerDatosCompletos({
      nombreFd: "GRUPOTAR",
    },
      function (data) {
        $_this.SER106C.CONVENIO = data.NOMTAR;
        $_this.SER106C.CONVENIO.pop();
        loader("hide");
        $_this._evaluarconvenios_SER106C()
      },
    );

  },
  methods: {
    _evaluarconvenios_SER106C() {
      validarInputs(
        {
          form: "#VALIDAR1_SER106C",
          orden: "1",
        },
        _toggleNav,
        () => {

          if (this.form.conveniomedic_SER106C.trim() == '') {
            CON851("01", "01", this._evaluarconvenios_SER106C(), "error", "error");
          } else {
            if (this.form.conveniomedic_SER106C.trim() == '**') {
              this._validarimpresion_SER106C();
            } else {
              const res = this.SER106C.CONVENIO.find(e => e.COD == this.form.conveniomedic_SER106C);
              if (res == undefined) {
                CON851("01", "01", this._evaluarconvenios_SER106C(), "error", "error");
              } else {
                this.form.descripmedic_SER106C = res.DESCRIP;
                this._validarimpresion_SER106C();
              }
            }
          }
        },
      );
    },
    _validarimpresion_SER106C() {
      postData({ datosh: `${datosEnvio()}${this.form.conveniomedic_SER106C}|` }, get_url("APP/SALUD/SER106C.DLL"))
      .then(data => {
        console.log(data);
        if (data.MEDICAMENTOS.length > 1) {
          data.MEDICAMENTOS.pop();
					columnas = [
						{
              title: "TARIFA",
							value:'TARIFA',
						},
						{
							title: "ARTICULO",
							value:'ARTICULO',
            },
            {
							title: "DESCRIPCION DEL ARTICULO",
							value:'DESCRIPCION',
            },
            {
							title: "VALOR",
							value:'MONTO',
						},
					]
					_impresion2({
						tipo: 'excel',
						// sheetName: 'Listado validación',
						header: [
							{text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold:true, size:16},
							`LISTADO DE MEDICAMENTOS POR CONVENIO`,
							`FECHA DE IMPRESION: ${moment().format('YYYY-MM-DD')}`
						],
						logo: `${$_USUA_GLOBAL[0].NIT}.png`,
						ruta_logo: 'P:\\PROG\\LOGOS\\',
						tabla: {
							columnas,
							// totalsRow: true,
							data: data.MEDICAMENTOS,
							// heightRow: 35,
							// theme: 'TableStyleDark1'
						},
						archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
						scale: 65,
						orientation: 'landscape'
					})
					.then(() => {
								CON851('','Impreso Correctamente',_toggleNav(),'success','Exito')
					})
					.catch(() => {
								CON851('','Hubo un error en la impresión',this._evaluarconvenios_SER106C(),'error','Error')
					})
        } else {
          CON851('','No hay medicmentos con ese convenio', this._evaluarconvenios_SER106C(),'error','Error');
        }
      })
      .catch(err => {
        console.log(err);
        this._evaluarconvenios_SER106C()
      })
    },
    _f8conveniomedic_SER106C() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE NOMBRES DE TARIFAS",
        columnas: ["COD", "DESCRIP"],
        data: $_this.SER106C.CONVENIO,
        callback_esc: function () {
          $(".convenios_SER106C").focus();
        },
        callback: function (data) {
          $_this.form.conveniomedic_SER106C = data.COD
          _enterInput('.convenios_SER106C');
        }
      });
    }
  },
});
