// LISTADO DE VENTA DIARIA DE LA CAJA
// JENNY - OPCION 2-5 DE CAJA BARES Y RESTAURANTES NOV-2021
//(() => {
//    Vue.component('v-select', VueSelect.VueSelect)
//})();
const { inv408P } = require("../../BAR/scripts/inv408p.js");

var $this;
new Vue({
    el: '#INV408',
    data: {
        form: {
            ano_inv408: '',
			mes_inv408: '',
            dia_inv408: '',
            hora1_inv408: '',
			min1_inv408: '',
            hora2_inv408: '',
            min2_inv408: '',
            oper_inv408:'****'
        },
        listado :[],
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('2-5 - Listado de Venta diaria de Caja - CAJA');
        
    },
    watch: {
        // selected: function (val) {
        //     val.value != 0 ? this.validarFormato_508(val.value) : false;
        // }
    },
    mounted: function () {
        // this.select = this.$refs.select.$refs.search;
        this.datoInicialIni_inv408();
    },
    methods: {        
		datoInicialIni_inv408() {
			this.form.mes_inv408 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			this.form.ano_inv408 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
			this.form.dia_inv408 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			this.validarFechaIni_inv408("1")
		},

		validarFechaIni_inv408(orden) {
            $this = this
			validarInputs(
				{
					form: "#fecha_inv408",
					orden: orden
				},
				() => {
					_toggleNav();
				},
				() => {
                    $this.form.dia_inv408 = cerosIzq($this.form.dia_inv408, 2);
                    $this.form.mes_inv408 = cerosIzq($this.form.mes_inv408, 2);
                    $this.fecha = this.form.ano_inv408 + $this.form.mes_inv408 + $this.form.dia_inv408;
                    var ano = parseFloat($this.form.ano_inv408);
					var dia = parseFloat($this.form.dia_inv408);
                    var mes = parseFloat($this.form.mes_inv408);
                    if (parseInt(ano) < 1900) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarFecha_inv408('1');
                    } else {
                        if (parseInt(dia) < 1 || parseInt(dia) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFecha_inv408('3');
                        } else if (parseInt(mes) < 1 || parseInt(mes) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFecha_inv408('2');
                        } else {
                            $this.datoHoraIni_inv408();
                        }
                    }
				}
			)
        },

        datoHoraIni_inv408() {
			this.form.hora1_inv408 = '06';
			this.form.min1_inv408 = '01';
			this.form.hora2_inv408 = '24';
            this.form.min2_inv408 = '01'
			this.validarHoraIni_inv408("1")
		},

        validarHoraIni_inv408(orden) {
            $this = this
			validarInputs(
				{
					form: "#horaIni_inv408",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarFechaIni_inv408("1");
				},
				() => {
					$this.form.hora1_inv408 = cerosIzq($this.form.hora1_inv408, 2);
                    $this.form.min1_inv408 = cerosIzq($this.form.min1_inv408, 2);
                    $this.horaIni = this.form.hora1_inv408 + $this.form.min1_inv408;
                    var hIni = parseFloat($this.form.hora1_inv408);
					var mIni = parseFloat($this.form.min1_inv408);                    
                    if (parseInt(hIni) > 24) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarHoraIni_inv408('1');
                    } else {
                        if (parseInt(mIni) < 1 || parseInt(mIni) > 60) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarHoraIni_inv408('2');
                        } else {
                            $this.validarHoraFin_inv408('1');
                        }
                    }
				}
			)
        },
        validarHoraFin_inv408(orden) {
            $this = this
			validarInputs(
				{
					form: "#horaFin_inv408",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarHoraIni_inv408("1");
				},
				() => {
					$this.form.hora2_inv408 = cerosIzq($this.form.hora2_inv408, 2);
                    $this.form.min2_inv408 = cerosIzq($this.form.min2_inv408, 2);
                    $this.horaFin = this.form.hora2_inv408 + $this.form.min2_inv408;
                    var hFin = parseFloat($this.form.hora2_inv408);
					var mFin = parseFloat($this.form.min2_inv408);                                      
                    if (parseInt(hFin) > 24) {
                        CON851('37', '37', null, 'error', 'error');
                        $this.validarHoraFin_inv408('1');
                    } else {
                        if (parseInt(mFin) < 1 || parseInt(mFin) > 60) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarHoraFin_inv408('2');
                        } else {
                            if($this.horaIni > $this.horaFin){
                                CON851('03', 'La Hora Final debe ser mayor a la inicial', null, 'error', 'error');
                                $this.validarHoraFin_inv408('1');
                            }else{
                                $this.validarOperador('1');
                            }
                        }
                    }
				}
			)
        },

        validarOperador(orden){
            $this = this
			validarInputs(
				{
					form: "#oper_inv408",
					orden: orden
				},
				() => {
					this.selected = '';                    
                    this.validarHoraFin_inv408("1");
				},
				() => { 
                    if ($this.form.oper_inv408 == ''){
                        $this.form.oper_inv408 = '****'
                    }
                    $this.oper = $this.form.oper_inv408;
                    this._envioImpresion();
                }
            )
        },
        
        _envioImpresion() {
            $this = this;            

            CON850_P(function (e) {
                if (e.id == 'S') {
                    $this._llamarImpresion();
                } else {
                    $this.validarHoraFin_inv408('1');
                }
            }, {
                msj: '00',
                overlay_show: true
            })
            
        },
        _llamarImpresion(){
            var datos_envio = datosEnvio() 
                            + localStorage.Usuario
                            + '|' + $this.fecha.toString()
                            + '|' + $this.horaIni.toString()
                            + '|' + $this.horaFin.toString()
                            + '|' + $this.oper.toString();

            //console.log(datos_envio, "datos_envio");
            postData({ datosh: datos_envio }, get_url('app/BAR/INV408.DLL'))
                    .then($this._montarImpresion_Inv408)
                    .catch(err => {
                        console.log('Error de impresion',err)
                        $this.validarFechaIni_inv408('1');
            })
        },
        _montarImpresion_Inv408(data) {
            $this = this;
            data.CIERRE.CUERPO.pop();            
            let formato = inv408P(data.CIERRE);        
            this._imprimir408(formato)
        },

        async _imprimir408(formato) {
            await _impresion2({
                tipo: "pdf",
                archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS-01")}.pdf`,
                content: formato,
            })
                .then((el) => { 
                    this.validarFechaIni_inv408('1');
                })
                .catch((err) => {
                    console.error(err);
                    this.validarFechaIni_inv408('1');
                });
        }
        
    }
})