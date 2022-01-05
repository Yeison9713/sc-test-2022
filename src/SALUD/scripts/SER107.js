// 09/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER107",
  data: {
    SER107: [],
    form: {
      fechaactual_SER107: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,3,2 - Listado de convenios");
    $_this = this;
    $_this.SER107.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SER107.ANOACTUAL = $_this.SER107.FECHAACTUAL.substring(0, 4)
    $_this.SER107.MESACTUAL = $_this.SER107.FECHAACTUAL.substring(4, 6)
    $_this.SER107.DIAACTUAL = $_this.SER107.FECHAACTUAL.substring(6, 8)
    loader("hide");
    this._evaluardllistado_SER107()
  },
  methods: {
    _evaluardllistado_SER107() {
      this.form.fechaactual_SER107 = this.SER107.FECHAACTUAL
      let URL = get_url("APP/SALUD/SER107.DLL");
      postData({ datosh: datosEnvio() + '|' }, URL)
        .then(data => {
          console.log(data)
          data.TARIFAS.pop();
          let impresion = []
          for(var i in data.TARIFAS){
            impresion.push({TITULOS:`CONVENIO: ${data.TARIFAS[i].COD}`,HONQUIR: `${data.TARIFAS[i].DESCRIP}`,HONAYUD:'',HONANE:'',HONMAT:'',HONDER:''})
            impresion.push({TITULOS:' ',HONQUIR:' ',HONAYUD:' ',HONANE:' ',HONMAT:' ',HONDER:' '})
            impresion.push({TITULOS:'TIPO',HONQUIR:'',HONAYUD:'COD',HONANE:'TARIFA',HONMAT:'',HONDER:'%'})
            impresion.push({TITULOS:'CIRUGIA',HONQUIR:'',HONAYUD:`${data.TARIFAS[i].TABLA_TAB[0].CODTABTAR}`,HONANE:`${data.TARIFAS[i].TABLA_TAB[0].DESCRIPTAR}`,HONMAT:'',HONDER:`${data.TARIFAS[i].TABLA_TAB[0].PORCTABTAR}`})
            impresion.push({TITULOS:'LABORATORIOS',HONQUIR:'',HONAYUD:`${data.TARIFAS[i].TABLA_TAB[1].CODTABTAR}`,HONANE:`${data.TARIFAS[i].TABLA_TAB[1].DESCRIPTAR}`,HONMAT:'',HONDER:`${data.TARIFAS[i].TABLA_TAB[1].PORCTABTAR}`})
            impresion.push({TITULOS:'RADIOLOGIA',HONQUIR:'',HONAYUD:`${data.TARIFAS[i].TABLA_TAB[2].CODTABTAR}`,HONANE:`${data.TARIFAS[i].TABLA_TAB[2].DESCRIPTAR}`,HONMAT:'',HONDER:`${data.TARIFAS[i].TABLA_TAB[2].PORCTABTAR}`})
            impresion.push({TITULOS:'OTROS SERV',HONQUIR:'',HONAYUD:`${data.TARIFAS[i].TABLA_TAB[3].CODTABTAR}`,HONANE:`${data.TARIFAS[i].TABLA_TAB[3].DESCRIPTAR}`,HONMAT:'',HONDER:`${data.TARIFAS[i].TABLA_TAB[3].PORCTABTAR}`})
            impresion.push({TITULOS:'CONSULTAS-TER',HONQUIR:'',HONAYUD:`${data.TARIFAS[i].TABLA_TAB[4].CODTABTAR}`,HONANE:`${data.TARIFAS[i].TABLA_TAB[4].DESCRIPTAR}`,HONMAT:'',HONDER:`${data.TARIFAS[i].TABLA_TAB[4].PORCTABTAR}`})
            impresion.push({TITULOS:'PATOLOG-CITOL',HONQUIR:'',HONAYUD:`${data.TARIFAS[i].TABLA_TAB[5].CODTABTAR}`,HONANE:`${data.TARIFAS[i].TABLA_TAB[5].DESCRIPTAR}`,HONMAT:'',HONDER:`${data.TARIFAS[i].TABLA_TAB[5].PORCTABTAR}`})
            impresion.push({TITULOS:' ',HONQUIR:' ',HONAYUD:' ',HONANE:' ',HONMAT:' ',HONDER:' '})
            impresion.push({TITULOS:'GRP',HONQUIR:'HON.QUIRURGIC.',HONAYUD:'HON.AYUDANTIA',HONANE:'HON.ANESTESIA',HONMAT:'HON.MAT.QUIRURGIC',HONDER:'HON.DERECHO.SALA'})
            impresion.push({TITULOS:' ',HONQUIR:' ',HONAYUD:' ',HONANE:' ',HONMAT:' ',HONDER:' '})
            for(var x in data.TARIFAS[i].TABLA_TAR) {
              if (data.TARIFAS[i].TABLA_TAR[x].HNQUIRTAR.trim() != '' || data.TARIFAS[i].TABLA_TAR[x].HNAYUDTAR.trim() != '' || data.TARIFAS[i].TABLA_TAR[x].HNANESTAR.trim() != '' || data.TARIFAS[i].TABLA_TAR[x].MATQUITAR.trim() != '' || data.TARIFAS[i].TABLA_TAR[x].DRSALATAR.trim() != '') {
                impresion.push({TITULOS:`${parseInt(x)+1}`,HONQUIR:`${data.TARIFAS[i].TABLA_TAR[x].HNQUIRTAR}`,HONAYUD:`${data.TARIFAS[i].TABLA_TAR[x].HNAYUDTAR}`,HONANE:`${data.TARIFAS[i].TABLA_TAR[x].HNANESTAR}`,HONMAT:`${data.TARIFAS[i].TABLA_TAR[x].MATQUITAR}`,HONDER:`${data.TARIFAS[i].TABLA_TAR[x].DRSALATAR}`})
              }
            }
            impresion.push({TITULOS:' ',HONQUIR:' ',HONAYUD:' ',HONANE:' ',HONMAT:' ',HONDER:' '})
          }
          columnas = [
            {
              title: " ",
              value:'TITULOS',
            },
            {
              title: " ",
              value:'HONQUIR',
            },
            {
              title: " ",
              value:'HONAYUD',
            },
            {
              title: " ",
              value:'HONANE',
            },
            {
              title: " ",
              value:'HONMAT',
            },
            {
              title: " ",
              value:'HONDER',
            },
          ]
          _impresion2({
            tipo: 'excel',
            // sheetName: 'Listado validación',
            header: [
              {text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold:true, size:16},
              `LISTADO DE CONVENIOS`,
              `FECHA DE IMPRESION: ${moment().format('YYYY-MM-DD')}`
            ],
            logo: `${$_USUA_GLOBAL[0].NIT}.png`,
            ruta_logo: 'P:\\PROG\\LOGOS\\',
            tabla: {
              columnas,
              // totalsRow: true,
              data: impresion,
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
                CON851('','Hubo un error en la impresión',this._toggleNav(),'error','Error')
          })
        })
        .catch(err => {
          console.log(err);
          _toggleNav();
        })
    },
  },
});
