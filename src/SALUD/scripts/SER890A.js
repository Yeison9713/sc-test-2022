new Vue({
    el: "#SER890A",
    data: {
        form: {
            ano_SER890A: '',
            mes_SER890A: '',
            dia_SER890A: '',
        },
    },
    created() {
        $_this = this;
        loader('show');
        _inputControl('disabled');
        nombreOpcion('9-7-C-E - Informe x dia');
        loader('hide');
        this._evaluarano_SER890A();
    },
    methods: {
        _evaluarano_SER890A() {
            $_this = this;
            this.form.ano_SER890A == "" ? this.form.ano_SER890A = moment().format('YYYY') : false;
            this.form.mes_SER890A == "" ? this.form.mes_SER890A = moment().format('MM') : false;
            this.form.dia_SER890A == "" ? this.form.dia_SER890A = moment().format('DD') : false;
            validarInputs({
                form: "#ano_SER890A",
                orden: '1'
            },
                _toggleNav,
                () => {
                    var ano = this.form.ano_SER890A;
                    this._evaluarmes_SER890A();
                }
            )
        },
        _evaluarmes_SER890A() {
            $_this = this;
            validarInputs({
                form: "#mes_SER890A",
                orden: '1'
            },
                this._evaluarano_SER890A,
                () => {
                    var mes = this.form.mes_SER890A;
                    if (mes < 1 || mes > 12) {
                        CON851('03','03',this._evaluarmes_SER890A(),'error','Error');
                    } else {
                        this._evaluardia_SER890A();
                    }
                }
            )
        },
        _evaluardia_SER890A() {
            $_this = this;
            validarInputs({
                form: "#dia_SER890A",
                orden: '1'
            },
                this._evaluarano_SER890A,
                () => {
                    let fecha = moment(`${this.form.ano_SER890A}${this.form.mes_SER890A.padStart(2,'0')}${this.form.dia_SER890A.padStart(2,'0')}`).format('YYYYMMDD');
                    console.log(fecha);
                    if (fecha == 'Invalid date') {
                        CON851('03','03',this._evaluardia_SER890A(),'error','Error');
                    } else {
                        this._envioImpresion_SER890A();
                    }
                }
            )
        },

        _envioImpresion_SER890A() {
            $this = this;
            var fecha_w = `${this.form.ano_SER890A}${this.form.mes_SER890A.padStart(2,'0')}${this.form.dia_SER890A.padStart(2,'0')}`
            CON850_P(function (e) {
                if (e.id == 'S') {
        
                    loader('show')
                    var datos_envio = datosEnvio() + fecha_w + '|';
                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER890A.DLL'))
                        .then(data => {
                            $this._montarImpresion_SER890A(data)
                          }).catch(err => {
                            console.log(err, 'error')
                            loader('hide')
                            $this._evaluarano_SER890A();
                          })
                } else {
                    $this._evaluardia_SER890A();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },

        _montarImpresion_SER890A(data) {
            data.ENCABEZADO = [];
            // data.Listado.pop();
            var fecha_w = `${this.form.ano_SER890A}/${this.form.mes_SER890A.padStart(2,'0')}/${this.form.dia_SER890A.padStart(2,'0')}`
        
            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');
        
            data.ENCABEZADO.push(nombreEmpresa);
            data.ENCABEZADO.push(nit);
            data.ENCABEZADO.push(fecha);
        
            for (i in data.CITAS) {
                data.CITAS[i]['OBSERV'] = data.CITAS[i]['OBSERV'].replace(/\�/g, "Ñ")
                // data.CITAS[i]['VALOR_J'] = data.CITAS[i]['VALOR_J'].replace(/\ /g, "")
                // data.CITAS[i]['VALOR_J'] = data.CITAS[i]['VALOR_J'].replace(/\,/g, "")
            }
        
            if (data.CITAS.length < 1) {
                CON851('08', '08', null, 'error', 'error');
                validarAsociarNitSER504();
            } else {
                var columnas = [
                    {
                        title: "COD PROF",
                        value: "MEDICO",
                        filterButton: true
                    },
                    {
                        title: "PROFESIONAL",
                        value: "DESCRIP_MEDICO",
                        format: "string",
                        filterButton: true
                    },
                    {
                        title: "HORA",
                        value: "HORA",
                        format: "string",
                    },
                    {
                        title: "ID",
                        value: "TIPO_ID",
                        format: "string",
                    },
                    {
                        title: "CEDULA",
                        value: "COD"
                    },
                    {
                        title: "1ER APELLIDO",
                        value: "APELLIDO1",
                        format: "string",
                    },
                    {
                        title: "2DO APELLIDO",
                        value: "APELLIDO2",
                        format: "string",
                    },
                    {
                        title: "NOMBRE",
                        value: "NOMBRE",
                        format: "string",
                    },
                    {
                        title: "EDAD",
                        value: "EDAD",
                    },
                    {
                        title: "CELULAR",
                        value: "TELEF",
                    },
                    {
                        title: "OBSERVACIONES",
                        value: "OBSERV",
                    },
                ]
        
                var header_format = [
                    { text: `${nombreEmpresa}`, bold: true, size: 16 },
                    `PROGRAMACION DIARIA DE CITAS     NIT: ${nit}`,
                    `PROGRAMACION: ${fecha_w}`,
                ]
        
                _impresion2({
                    tipo: 'excel',
                    // sheetName: 'Listado validación',
                    header: header_format,
                    logo: '892000458.bmp',
                    ruta_logo: 'C:\\LOGOS\\', //
                    tabla: {
                        columnas,
                        // totalsRow: true,
                        data: data.CITAS,
                        // heightRow: 35,
                        // theme: 'TableStyleDark1'
                    },
                    archivo: `${localStorage.Usuario + moment().format(`YYMMDD-HHmmss`)}`
                    // scale: 65,
                    // orientation: 'landscape'
                })
                    .then(() => {
                        console.log('Proceso terminado')
                        // _inputControl('reset');
                        $this._evaluarano_SER890A();
                        loader('hide')
                    })
                    .catch((err) => {
                        console.log('Proceso error')
                        console.log(err)
                    })
            }
        }
    },
})