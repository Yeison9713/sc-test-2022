// 14/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER5407",
  data: {
    SER5407: [],
    form: {
      anoini_SER5407: "",
      mesini_SER5407: "",
      diaini_SER5407: "",
      anofin_SER5407: "",
      mesfin_SER5407: "",
      diafin_SER5407: "",
      sucursal_SER5407: "",
      codsucursal_SER5407: "",
      telesalud_SER5407: "",
      capitalsal_SER5407: ""
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,5,4,1,2,4,7 - Informe resolucion 2175 de 2015");
    $_this = this;
    $_this.SER5407.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER5407.ANO_LNK = $_this.SER5407.FECHA_LNK.substring(0, 2);
    $_this.SER5407.MES_LNK = $_this.SER5407.FECHA_LNK.substring(2, 4);
	$_this.SER5407.DIA_LNK = $_this.SER5407.FECHA_LNK.substring(4, 6);
	loader("hide");
	$_this._evaluarfechaini_SER5407('1')
  },
  methods: {
    _evaluarfechaini_SER5407(orden) {
			this.form.anoini_SER5407 = 20 + this.SER5407.ANO_LNK
			this.form.mesini_SER5407 = this.SER5407.MES_LNK
			this.form.diaini_SER5407 = '01'
			validarInputs(
				{
					form: "#fechaInicial_SER5407",
					orden: orden
				},
				() => { _toggleNav() },
				() => {
					if (this.form.anoini_SER5407.trim() == '') {
						CON851('', 'Año incorrecto! ', null, 'error', 'error');
						this._evaluarfechaini_SER5407('1');
					} else {
						if (this.form.mesini_SER5407.trim() == '' || this.form.mesini_SER5407 < 01 || this.form.mesini_SER5407 > 12) {
							CON851('', 'Mes incorrecto! ', null, 'error', 'error');
							this._evaluarfechaini_SER5407('2');
						} else {
							if (this.form.diaini_SER5407.trim() == '' || this.form.diaini_SER5407 < 01 || this.form.diaini_SER5407 > 31) {
								CON851('', 'dia incorrecto! ', this._evaluarfechaini_SER5407('3'), 'error', 'error');
							} else {
								this.SER5407.FECHAINIW = this.form.anoini_SER5407 + this.form.mesini_SER5407 + this.form.diaini_SER5407
								postData({ datosh: datosEnvio() + '1|' + this.SER5407.FECHAINIW + "|" }, get_url("APP/SALUD/SER5407.DLL"))
									.then(data => {
										console.log(data, 'PASO 1 ')
										this._evaluarfechafin_SER5407('1')
									})
									.catch(err => {
										console.error(err)
										this._evaluarfechaini_SER5407('1')
									});
							}
						}
					}
				}
			)
		},
		_evaluarfechafin_SER5407(orden) {
			this.form.anofin_SER5407 = 20 + this.SER5407.ANO_LNK
			this.form.mesfin_SER5407 = this.SER5407.MES_LNK
			this.form.diafin_SER5407 = this.SER5407.DIA_LNK
			validarInputs(
				{
					form: "#fechaFinal_SER5407",
					orden: orden
				},
				() => { this._evaluarfechaini_SER5407('3') },
				() => {
					if (this.form.anofin_SER5407.trim() == '') {
						CON851('', 'Año incorrecto! ', null, 'error', 'error');
						this._evaluarfechafin_SER5407('1');
					} else {
						if (this.form.mesfin_SER5407.trim() == '' || this.form.mesfin_SER5407 < 01 || this.form.mesfin_SER5407 > 12) {
							CON851('', 'Mes incorrecto! ', null, 'error', 'error');
							this._evaluarfechafin_SER5407('2');
						} else {
							if (this.form.diafin_SER5407.trim() == '' || this.form.diafin_SER5407 < 01 || this.form.diafin_SER5407 > 31) {
								CON851('', 'dia incorrecto! ', this._evaluarfechafin_SER5407('3'), 'error', 'error');
							} else {
								this.SER5407.FECHAFINW = this.form.anofin_SER5407 + this.form.mesfin_SER5407 + this.form.diafin_SER5407
								if (this.SER5407.FECHAFINW < this.SER5407.FECHAINIW) {
									CON851('37', '37', this._evaluarfechafin_SER5407('3'), 'error', 'error');
								} else {
									this._evaluargrabado_SER5407()
								}
							}
						}
					}
				}
			)
    },
    _evaluargrabado_SER5407() {
      loader("show")
      postData({ datosh: datosEnvio() + '2|' + this.SER5407.FECHAINIW + "|" + this.SER5407.FECHAFINW + '|' +  localStorage.Usuario +  '|'}, get_url("APP/SALUD/SER5407.DLL"))
        .then(data => {
          console.log(data, 'PASO 2')
		  loader("hide");
		  var nombretxt = data.replace('.TXT', '');
          let datosEnvio = {
            nombre_txt: nombretxt,
          };
          $.ajax({
            data: datosEnvio,
            type: 'POST',
            async: false,
            url: get_url('app/Inc/_crearRIPS.php')
          }).done(function (data) {
            if (data.substring(0, 2) == '99' || data.trim() == 'No se pudo abrir el archivo!') {
              console.error('problemas para crear el txt');
            } else {
              fs.writeFile(`C:\\PROSOFT\\EXPORTAR\\${nombretxt}.txt`, data, function (err) {
                if (err) return console.error(err);
              });
            }
          });
          CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
        })
        .catch(err => {
		  console.error(err)
		  loader("hide");
          this._evaluarfechafin_SER5407('3')
        });
    },
    
    
    
    

    
  },
});
