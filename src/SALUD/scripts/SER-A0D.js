// 23/07/20 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SERA0D",
  data: {
    SERA0D: [],
    form: {
      fechaexped_SERA0D: "",
      fechaini_SERA0D: "",
      fechafin_SERA0D: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,D - Informe glosas acep. sin contabilizar");
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_ANO_LNK = 20 + $_FECHA_LNK.substring(0, 2);
    $_MES_LNK = $_FECHA_LNK.substring(2, 4);
    $_DIA_LNK = $_FECHA_LNK.substring(4, 6);
    $_this = this;
    loader("hide");
    $_this._consultadllglosas_SERA0D()
  },
  methods: {
    _consultadllglosas_SERA0D() {
      this.SERA0D.FECHABUSQ = '20040101'
      this.SERA0D.FECHAINI = $_ANO_LNK + $_MES_LNK + '01'
      this.SERA0D.FECHAFIN = $_ANO_LNK + $_MES_LNK + $_DIA_LNK
      this.form.fechaexped_SERA0D = moment(this.SERA0D.FECHABUSQ).format('YYYY/MM/DD');
      this.form.fechaini_SERA0D = moment(this.SERA0D.FECHAINI).format('YYYY/MM/DD');
      this.form.fechafin_SERA0D = moment(this.SERA0D.FECHAFIN).format('YYYY/MM/DD');
      let URL = get_url("APP/SALUD/SER-A0D.DLL");
      postData({
        datosh: datosEnvio() + '1|' + this.SERA0D.FECHABUSQ  + '|'
      }, URL)
        .then(data => {
          console.log(data)
          CON851P('04', _toggleNav, this._evaluardllproceso_SERA0D)
        })
        .catch(error => {
         _toggleNav
        });
    },
    _evaluardllproceso_SERA0D(){
      console.log('proceso de consulta')
      loader("show");
      let URL = get_url("APP/SALUD/SER-A0D.DLL");
      postData({
        datosh: datosEnvio() + '2|' + this.SERA0D.FECHABUSQ  + '|' +  this.SERA0D.FECHAINI + '|' +  this.SERA0D.FECHAFIN + '|' + localStorage.Usuario + '|'
      }, URL)
        .then(data => {
          loader("hide");
          console.log(data)
          data = data.GLOSAS
          data.pop()
          if(data.length == 0){
            loader("hide");
            CON851('', 'No hay movimiento disponible', _toggleNav(), 'success', 'Exito')
          }else{
            columnas = [
              {
                title: "LLAVE",
                value: 'GLOSA',
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
                title: "ESTADO",
                value: 'ESTADO',
              },
              {
                title: "GLOSA",
                value: 'GLOSA',
              },
              {
                title: "VLR RESPU",
                value: 'RESPU',
              },
              {
                title: "VLR ACEPT",
                value: 'ACEPT',
              },
              {
                title: "VLR PEND",
                value: 'PENDI',
              },
              {
                title: "VLR CONTAB",
                value: 'VLRCONTAB',
              }
            ]
            _impresion2({
              tipo: 'excel',
              header: [
                { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
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
          }
        })
        .catch(error => {
         _toggleNav
        });
    }
  },
});
