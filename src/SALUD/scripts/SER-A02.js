new Vue({
    el:'#SER-A02',
    data:{
        SERA02:[],
        form:{
            novedad_SERA02: "",
            detalle_SERA02: "",
            condicion_SERA02: "",
            oper_SERA02: "",
            fecha_SERA02: "",
        }
    },
    created(){
        _toggleNav();
        _inputControl("disabled");
        nombreOpcion("9,7,A,2 - Actualiza macros para respuesta a glosas");
        loader('show');
        obtenerDatosCompletos({nombreFd: "MACROSGLOSA"}, data => {
            loader('hide')
            this.SERA02.MACROS = data.MACROS;
            CON850(this._evaluarCON850_SERA02);
          });
    },
    methods: {
        _evaluarCON850_SERA02(novedad) {
            this.form.novedad_SERA02 = novedad.id;
            if (this.form.novedad_SERA02 == "F") {
              _toggleNav();
            } else {
              let novedad = {"7": "Nuevo", "8": "Cambio", "9": "Retiro"};
              this.form.novedad_SERA02 = this.form.novedad_SERA02 + " - " + novedad[this.form.novedad_SERA02];
              this._evaluarcodigo_SERA02();
            }
          },
        _evaluarcodigo_SERA02(){
            validarInputs({
                form: "#VALIDAR1_SERA02",
                orden: '1'
            },
                () => { setTimeout(() => {CON850(this._evaluarCON850_SERA02)}, 300) },
                () => {
                    if (codigoMask_SERA02.value.trim() == '' || parseInt(codigoMask_SERA02.value.trim()) == 0){
                        CON851('02','02',this._evaluarcodigo_SERA02,'error','Error');
                    } else {
                        let macro = this.SERA02.MACROS.filter(x => x.CUENTA.trim() == codigoMask_SERA02.value.trim().padStart(3,'0'))
                        if (macro.length > 0){
                            if (this.form.novedad_SERA02.substring(0,1) == '7'){
                                CON851('00','00',this._evaluarcodigo_SERA02(),'error','Error');
                            } else {
                                this.form.detalle_SERA02 = macro[0].DETALLE;
                                this.form.condicion_SERA02 = macro[0].TABLAMAGLO.replace(/&/g, '\n');
                                this.form.oper_SERA02 = macro[0].OPER;
                                this.form.fecha_SERA02 = moment(macro[0].FECHA).format('YYYY/MM/DD');
                                if (this.form.novedad_SERA02.substring(0,1) == '8'){
                                    this._evaluardetalle_SERA02();
                                } else {
                                    CON851P("54", this._evaluarcodigo_SERA02, this._grabar_SERA02);
                                }
                            }
                        } else {
                            if (this.form.novedad_SERA02.substring(0,1) == '7'){
                                this.form.oper_SERA02 = localStorage.Usuario.trim();
                                this.form.fecha_SERA02 = moment().format('YYYY/MM/DD');
                                this._evaluardetalle_SERA02();
                            } else {
                                CON851('01','01',this._evaluarcodigo_SERA02(),'error','Error');
                            }
                        }
                    }
                }
            )
        },
        _evaluardetalle_SERA02(){
            validarInputs({
                form: "#VALIDAR2_SERA02",
                orden: '1'
            },
                this._evaluarcodigo_SERA02,
                () => {
                    if (this.form.detalle_SERA02.trim() == ''){
                        CON851('02','02',this._evaluardetalle_SERA02(),'error','Error');
                    } else {
                        this._evaluarcondicion_SERA02();
                    }
                }
            )
        },
        _evaluarcondicion_SERA02(){
            validarInputs({
                form: "#VALIDAR3_SERA02",
                orden: '1'
            },
                this._evaluardetalle_SERA02,
                this._confirmar_SERA02
            )
        },
        _confirmar_SERA02(){
            CON851P ('01', this._evaluarcondicion_SERA02, this._grabar_SERA02)
        },
        _grabar_SERA02(){
            let datos = new Object
            datos.datosh = `${datosEnvio()}${this.form.novedad_SERA02.substring(0,1)}|${codigoMask_SERA02.value.trim().padStart(3,'0')}|${this.form.detalle_SERA02.trim()}|${this.form.oper_SERA02.trim()}|${this.form.fecha_SERA02.replace(/\//g,'')}|`;
            datos["CONDICION"] = this.form.condicion_SERA02.replace(/\n/g,'&');
            postData(datos, get_url("APP/SALUD/SER-A02.DLL"))
            .then(data => {
                if (this.form.novedad_SERA02.substring(0,1) == '7') CON851('','Registro grabado',_toggleNav(),'success','Exito')
                else if (this.form.novedad_SERA02.substring(0,1) == '8') CON851('','Registro modificado',_toggleNav(),'success','Exito')
                else CON851('','Registro eliminado',_toggleNav(),'success','Exito')
            })
            .catch(error => {
              console.error(error);
              CON851('','Ocurrio un error guardando la informacion',this._evaluarcondicion_SERA02(),'error','Error');
            });
        }
    }
})

var codigoMask_SERA02 = IMask($("#codigo_SERA02")[0], {mask: Number});