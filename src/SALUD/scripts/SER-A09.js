// 26/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SERA09",
  data: {
    SERA09: [],
    form: {
      ano_SERA09: "",
      mes_SERA09: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,9 - Informe de glosas por centro de costos");
    $_this = this;
    $_this.SERA09.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SERA09.ANO_LNK = "20" + $_this.SERA09.FECHA_LNK.substring(0, 2);
    $_this.SERA09.MES_LNK = $_this.SERA09.FECHA_LNK.substring(2, 4);
    $_this.SERA09.DIA_LNK = $_this.SERA09.FECHA_LNK.substring(4, 6);
    loader("hide");
    $_this._evaluarmes_SERA09()
  },
  methods: {
    _evaluarmes_SERA09(){
      this.form.ano_SERA09 = this.SERA09.ANO_LNK
      this.form.mes_SERA09 = this.SERA09.MES_LNK
      validarInputs(
        {
          form: "#MESBUSQ_SERA09",
          orden: '1'
        }, _toggleNav,
        () => {
          this.form.mes_SERA09 = this.form.mes_SERA09.padStart(2, "0")
          if (this.form.mes_SERA09 < 1 || this.form.mes_SERA09 > 12) {
            CON851('03', '03', this._evaluarmes_SERA09(), 'error', 'error');
          } else {
            this.SERA09.FECHABUSQ = this.form.ano_SERA09 + this.form.mes_SERA09
            CON851P('04', this._evaluarmes_SERA09, this._evaluarlistado_SERA09)
          }
        }
      )
    }, 
    _evaluarlistado_SERA09() {
      let URL = get_url("APP/" + "SALUD/SER-A09" + ".DLL");
      postData({
        datosh: datosEnvio() + this.SERA09.FECHABUSQ + "|"
      }, URL)
        .then((data) => {
          let costo = ''
          for(var i in data.FACTURAS){
            for(var y in data.FACTURAS[i].TABLA_COSTO){
              if(data.FACTURAS[i].TABLA_COSTO[y].VLR_COSTO.trim() != ''){
                costo = data.FACTURAS[i].TABLA_COSTO[y].VLR_COSTO.trim()
              }
            }
            data.FACTURAS[i].COSTOS = costo
          }
          data = data.FACTURAS
          data.pop()
          columnas = [
            {
              title: "FACTURA",
              value: 'FACTURA',
            },
            {
              title: "NIT",
              value: 'NIT',
            },
            {
              title: "ENTIDAD",
              value: 'ENTIDAD',
            },
            {
              title: "FECHA FACT",
              value: 'FECHA_FACT',
            },
            {
              title: "FECHA GLOSA",
              value: 'FECHA_GLO',
            },
            {
              title: "VLR FACT",
              value: 'VLR_FACT',
            },
            {
              title: "VLR REFACTURAR",
              value: 'GLOSA_REF',
            },
            {
              title: "VLR DEVOL",
              value: 'GLOSA_DEV',
            },
            {
              title: "VLR GLOSA",
              value: 'GLOSA_OTR',
            },
            {
              title: "NETO FACT",
              value: 'NETO_FACT',
            }, 
            {
              title: "COSTO",
              value: 'COSTOS',
            } 
          ]
          _impresion2({
            tipo: 'excel',
            header: [
              // { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
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
