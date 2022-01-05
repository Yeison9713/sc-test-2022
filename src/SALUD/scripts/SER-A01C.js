// 14/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SERA01C",
  data: {
    SERA01C: [],
    form: {
      fecha_SERA01C: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,1,2 - Listado catalogo de motivos de glosa");
    $_this = this;
    loader("hide");
    $_this._validarclases_SERA01C()
  },
  methods: {
    _validarclases_SERA01C() {
      this.form.fecha_SERA01C = moment().format('YYYYMMDD');
      CON851P('00', _toggleNav, this._evaluarlistado_SERA01C)
    },
    _evaluarlistado_SERA01C() {
      let URL = get_url("APP/" + "SALUD/SER-A81" + ".DLL");
      postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
      }, URL)
        .then((data) => {
          data = data.MOTIVOS
          data.pop()
          columnas = [
            {
              title: "FACT.",
              value: 'CUENTA',
            },
            {
              title: "NIT",
              value: 'NOMBRE',
            },
            
          ]
          _impresion2({
            tipo: 'excel',
            header: [
              { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
              `CATALOGO DE GLOSAS`,
            ],
            logo: `${$_USUA_GLOBAL[0].NIT}.png`,
            ruta_logo: 'C:\\PROSOFT\\LOGOS\\',
            tabla: {
              columnas,
              data: data,
            },
            archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
            scale: 65,
            orientation: 'landscape'
          })
            .then(() => {
              CON851('', 'Impreso Correctamente', _toggleNav(), 'success', 'Exito')
            })
            .catch(() => {
              CON851('', 'Hubo un error en la impresión', _toggleNav(), 'error', 'Error')
            })
        })
        .catch((error) => {
          console.log(error)
          CON851("", "Error en la impresión", _toggleNav, "error", "error");
        });
    },
  },
})
