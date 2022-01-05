new Vue({
    el: '#SER7C62',
    data: {
        SER76C2: [],
        form: {
            anoini_SER7C62: '',
            mesini_SER76C2: '',
            diaini_SER76C2: '',
            anofin_SER76C2: '',
            mesfin_SER76C2: '',
            diafin_SER76C2: '',
            entidades_SER7C62: '',
            descripEntidad_SER7C62: '',
            especialidad_SER7C62: '',
            descripEspecialidad_SER7C62: '',
            medico_SER7C62: '',
            descripMedico_SER7C62: '',
            nit_SER7C62: '',
            descripNit_SER7C62: '',
        }
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion("9,7,C,6,2 - Relacion de citas por nit");

        var $this = this;
        obtenerDatosCompletos({ nombreFd: "ENTIDADES" }, data => {
            console.log(data);
            $this.SER76C2.ENTIDADES = data.ENTIDADES;
            obtenerDatosCompletos({ nombreFd: "PROFESIONALES" }, data => {
                console.log(data);
                $this.SER76C2.PROFESIONALES = data.ARCHPROF;
                obtenerDatosCompletos({ nombreFd: "ESPECIALIDAD" }, data => {
                    console.log(data);
                    $this.SER76C2.ESPECIALIDADES = data.ESPECIALIDADES;
                    obtenerDatosCompletos({ nombreFd: "TERCEROS" }, data => {
                        console.log(data);
                        $this.SER76C2.TERCEROS = data.TERCEROS;
                        loader('hide');
                        $this._evaluarfechainicial_SER7C62('1');
                    });
                });
            });
        });
    },
    methods: {
        _evaluarfechainicial_SER7C62(orden) {
            validarInputs(
                {
                    form: "#fechaInicial_SER76C2",
                    orden: orden
                },
                _toggleNav,
                () => {
                    if (this.form.anoini_SER7C62.trim() == '') {
                        console.log('entre aca');
                        this.form.anoini_SER7C62 = '0000';
                        this.form.mesini_SER7C62 = '00';
                        this.SER76C2.Fechainicial = '00000000';
                    } else {
                        console.log('entre aca');
                        this.form.mesini_SER7C62 = this.form.mesini_SER7C62.padStart(2, '0');
                        this.form.diaini_SER7C62 = this.form.diaini_SER7C62.padStart(2, '0');

                        console.log(this.form.anoini_SER7C62 + this.form.mesini_SER7C62 + this.form.diaini_SER7C62);

                        let fecha = moment(this.form.anoini_SER7C62 + this.form.mesini_SER7C62 + this.form.diaini_SER7C62).format('YYYYMMDD');
                        console.log(fecha);
                        if (fecha == 'Invalid date') {
                            CON851('', 'Digite una fecha valida', this._evaluarfechainicial_SER7C62('1'), 'error', 'Error');
                        } else {
                            console.log('entre aca');
                            this.SER76C2.Fechainicial = fecha;
                            this._evaluarfechafinal_SER7C62('1');
                        }
                    }
                }
            )
        },
        _evaluarfechafinal_SER7C62(orden) {
            console.log(orden);
            validarInputs(
                {
                    form: "#fechaFinal_SER76C2",
                    orden: orden
                },
                () => {
                    this._evaluarfechainicial_SER7C62('3');
                },
                () => {
                    this.form.mesfin_SER7C62 = this.form.mesfin_SER7C62.padStart(2, '0');
                    this.form.diafin_SER7C62 = this.form.diafin_SER7C62.padStart(2, '0');
                    let fecha = moment(this.form.anofin_SER7C62 + this.form.mesfin_SER7C62 + this.form.diafin_SER7C62).format('YYYYMMDD');
                    if (fecha == 'Invalid date') {
                        CON851('', 'Digite una fecha valida', this._evaluarfechafinal_SER7C62('1'), 'error', 'Error');
                    } else {
                        this.SER76C2.FechaFinal = fecha;
                        this._evaluarEntidad_SER7C62();
                    }
                }
            )
        },
        _evaluarEntidad_SER7C62() {
            if (this.form.entidades_SER7C62.trim() == ''){
                this.form.entidades_SER7C62 = '******';
            }
            validarInputs(
                {
                    form: "#validaEntidad_SER76C2",
                    orden: '1'
                },
                () => {
                    this._evaluarfechafinal_SER7C62('3');
                },
                () => {
                    if (this.form.entidades_SER7C62.trim() == '') {
                        CON851('', 'Digite una entidad', this._evaluarEntidad_SER7C62(), 'error', 'Error');
                    } else {
                        if (this.form.entidades_SER7C62 == '******') {
                            this.form.descripEntidad_SER7C62 = 'TODAS LAS ENTIDADES';
                            this._evaluarEspecialidad_SER7C62();
                        } else {
                            let entidad = this.SER76C2.ENTIDADES.filter(x => x['COD-ENT'] == this.form.entidades_SER7C62.padEnd(6, ' '))
                            console.log(entidad);
                            this.form.descripEntidad_SER7C62 = entidad[0]['NOMBRE-ENT'];
                            this._evaluarEspecialidad_SER7C62();
                        }
                    }
                }
            )
        },
        _evaluarEspecialidad_SER7C62() {
            if (this.form.especialidad_SER7C62.trim() == ''){
                this.form.especialidad_SER7C62 = '***';
            }
            validarInputs(
                {
                    form: "#validarEspecialidad_SER7C62",
                    orden: '1'
                },
                () => {
                    this._evaluarEntidad_SER7C62();
                },
                () => {
                    if (this.form.especialidad_SER7C62.trim() == '') {
                        CON851('', 'Digite una especialidad', this._evaluarEspecialidad_SER7C62(), 'error', 'Error');
                    } else {
                        if (this.form.especialidad_SER7C62 == '***') {
                            this.form.descripEspecialidad_SER7C62 = 'TODAS LAS ESPECIALIDADES';
                            this._evaluarMedico_SER7C62();
                        } else {
                            let especialidad = this.SER76C2.ESPECIALIDADES.filter(x => x.CODIGO == this.form.especialidad_SER7C62.padStart(3, '0'))
                            console.log(especialidad);
                            this.form.descripEspecialidad_SER7C62 = especialidad[0].NOMBRE;
                            this._evaluarMedico_SER7C62();
                        }
                    }
                }
            )
        },
        _evaluarMedico_SER7C62() {
            if (this.form.medico_SER7C62.trim() == ''){
                this.form.medico_SER7C62 = '99';
            }
            validarInputs(
                {
                    form: "#validarMedico_SER7C62",
                    orden: '1'
                },
                () => {
                    this._evaluarEspecialidad_SER7C62();
                },
                () => {
                    if (this.form.medico_SER7C62.trim() == '') {
                        CON851('', 'Digite un profesional', this._evaluarMedico_SER7C62(), 'error', 'Error');
                    } else {
                        if (parseInt(this.form.medico_SER7C62) == 99) {
                            this.form.descripMedico_SER7C62 = 'TODOS LOS MEDICOS';
                            this._evaluarNit_SER7C62();
                        } else {
                            let profesional = this.SER76C2.PROFESIONALES.filter(x => x.IDENTIFICACION == this.form.medico_SER7C62.padStart(10, ' '))
                            console.log(profesional);
                            this.form.descripMedico_SER7C62 = profesional[0].NOMBRE;
                            this._evaluarNit_SER7C62();
                        }
                    }
                }
            )
        },
        _evaluarNit_SER7C62() {
            if (this.form.nit_SER7C62.trim() == ''){
                this.form.nit_SER7C62 = '99';
            }
            validarInputs(
                {
                    form: "#validarNit_SER7C62",
                    orden: '1'
                },
                () => {
                    this._evaluarMedico_SER7C62();
                },
                () => {
                    if (this.form.nit_SER7C62.trim() == '') {
                        CON851('', 'Digite un Nit', this._evaluarNit_SER7C62(), 'error', 'Error');
                    } else {
                        if (parseInt(this.form.nit_SER7C62) == 99) {
                            this.form.descripMedico_SER7C62 = 'TODOS LOS TERCEROS';
                            this._datosimpresion_SER7C62();
                        } else {
                            let nit = this.SER76C2.TERCEROS.filter(x => x.COD == this.form.nit_SER7C62.padStart(10, ' '))
                            console.log(nit);
                            this.form.descripMedico_SER7C62 = nit[0].NOMBRE;
                            this._datosimpresion_SER7C62();
                        }
                    }
                }
            )
        },
        _datosimpresion_SER7C62() {
            postData({ datosh: datosEnvio() + this.form.entidades_SER7C62 + '|' + this.form.especialidad_SER7C62 + '|' + this.form.medico_SER7C62.padStart(10,'0') + '|' + this.form.nit_SER7C62.padStart(10,'0') + '|' + this.SER76C2.Fechainicial + '|' + this.SER76C2.FechaFinal + '|' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '|' },
                get_url('app/SALUD/SER7C62.DLL'))
                .then(data => {
                    console.log(data);
                    for (i in data.CITAS) {
                        data.CITAS[i]['NOMBRE_PACIENTE'] = data.CITAS[i]['NOMBRE_PACIENTE'].replace(/\�/g, "Ñ");
                    }

                    var columnas = [
                        {
                            title: "FECHA CITA",
                            value: "FECHA_CITA",
                            filterButton: true
                        },
                        {
                            title: "HORA CITA",
                            value: "HORA_CITA",
                            format: 'fecha',
                        },
                        {
                            title: "IDENTIFIACION",
                            value: "PACIENTE_CITA",
                        },
                        {
                            title: "NOMBRE PACIENTE",
                            value: "NOMBRE_PACIENTE",
                            format: 'fecha',
                        },
                        {
                            title: "TELEFONO",
                            value: "TELEFONO_CITA",
    
                        },
                        {
                            title: "CUPS",
                            value: "CUPS_CITA",
                        },
                        {
                            title: "DESCRIPCION CUP",
                            value: "DESCRIPCION_CUP"
                        },
                        {
                            title: "EPS",
                            value: "EPS_CITA"
                        },
                        {
                            title: "COMPROBANTE",
                            value: "COMPROBANTE_CITA"
                        },
                    ]
    
                    var header_format = [
                        { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
                        `INFORME DE CITAS`,
                        `Periodo desde: ${this.SER76C2.Fechainicial}  Hasta: ${this.SER76C2.FechaFinal}`,
                    ]
    
                    _impresion2({
                        tipo: 'excel',
                        header: header_format,
                        logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                        tabla: {
                            columnas,
                            data: data.CITAS,
                        },
                        archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
                        scale: 65,
                        orientation: 'landscape'
                    })
                        .then(() => {
                            CON851('','Impresion',null,'success','Exito');
                            _toggleNav()
                        })
                        .catch(() => {
                            console.log('Proceso error')
                            this._evaluarNit_SER7C62();
                        })
                })
                .catch(err => {
                    console.error(err)
                    this._evaluarNit_SER7C62();
                })
        },
        _f8Nit_SER7C62() {
            _ventanaDatos({
                titulo: "VENTANA DE ESPECIALIDADES",
                columnas: ["CODIGO", "NOMBRE"],
                data: this.SER76C2.TERCEROS,
                callback_esc: () => { },
                callback: data => {
                    console.log(data);
                },
            });
        },
        _f8Profesionales_SER809P() {
            _ventanaDatos({
                titulo: "VENTANA DE ESPECIALIDADES",
                columnas: ["CODIGO", "NOMBRE"],
                data: this.SER76C2.PROFESIONALES,
                callback_esc: () => { },
                callback: data => {
                    console.log(data);
                },
            });
        },
        _f8Especialidades_SER7C62() {
            _ventanaDatos({
                titulo: "VENTANA DE ESPECIALIDADES",
                columnas: ["CODIGO", "NOMBRE"],
                data: this.SER76C2.ESPECIALIDADES,
                callback_esc: () => { },
                callback: data => {
                    console.log(data);
                },
            });
        },
        _f8Entidades_SER7C62() {
            _ventanaDatos({
                titulo: "VENTANA DE ESPECIALIDADES",
                columnas: ["CODIGO", "NOMBRE"],
                data: this.SER76C2.ENTIDADES,
                callback_esc: () => { },
                callback: data => {
                    console.log(data);
                },
            });
        },
    }
})