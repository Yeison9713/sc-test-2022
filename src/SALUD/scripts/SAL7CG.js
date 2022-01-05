new Vue({
    el: '#SAL7CG',
    data: {
        form: {
            accion_SAL7CG: '',
            novedad_SAL7CG: '',
            idmedicod_SAL7CG: '',
            sucursal_SAL7CG: '',
            horainicio1_SAL7CG: '',
            minutoinicio1_SAL7CG: '',
            horafinal1_SAL7CG: '',
            minutofinal1_SAL7CG: '',
            horainicio2_SAL7CG:'',
            minutoinicio2_SAL7CG:'',
            horafinal2_SAL7CG:'',
            minutofinal2_SAL7CG:'',
            observaciones_SAL7CG: '',
            fechainicioprof_SAL7CG: '',
            fechafinalprof_SAL7CG:'',
            opercrea_SAL7CG:'',
            fechaelab_SAL7CG: '',
            opermod_SAL7CG: '',
            fechamod_SAL7CG: ''
        },
        SAL7CG: [],
        fechas: [],
        date: "",
        range: {
            start: new Date(parseInt(moment().format('YYYY')), parseInt(moment().format('MM')), 1),
            end: new Date(parseInt(moment().format('YYYY')), parseInt(moment().format('MM')), parseInt(moment(moment().format()).endOf('month').subtract(1,'day').format('DD'))),
        },
        // modelConfig: {
        //     start: {
        //         timeAdjust: '00:00:00',
        //     },
        //     end: {
        //         timeAdjust: '23:59:59',
        //     },
        // },
        masks: {
            weekdays: 'WWW',
        },
        attributes: [
          ],
    },
    created() {
        nombreOpcion('9,7,C,G - Horarios profesional')
        _toggleNav()
        _inputControl('disabled')
        this.date = moment(new Date()).format('YYYYMMDD')
        this.SAL7CG.ACTIVARFECHA = 0
        let $_this = this
        obtenerDatosCompletos({ nombreFd: 'SUCURSALES' }, function (data) {
            $_this.SAL7CG.SUCURSALES = [];
            var conteo = 1;
            for (var i in data.SUCURSAL) {
                if (data.SUCURSAL[i].CODIGO.trim() != '') {
                    $_this.SAL7CG.SUCURSALES.push({
                        ID: conteo,
                        DESCRIPCION:
                            `${data.SUCURSAL[i].CODIGO}` +
                            ' - ' +
                            `${data.SUCURSAL[i].DESCRIPCION}`
                    });
                    conteo++;
                }
            }
        });
        this._validaraccion_SAL7CG()
    },
    methods: {
        dayclick_SAL7CG(event){
            this.form.fechafinalprof_SAL7CG = moment(this.range.end).format('YYYY-MM-DD')
            this.form.fechainicioprof_SAL7CG = moment(this.range.start).format('YYYY-MM-DD')
            if (this.form.fechainicioprof_SAL7CG.trim() != '') {
                document.getElementById('botonhorario2_SAL7CG').disabled = true
                document.getElementById('botonhorario2_SAL7CG').classList.remove('botonactivo_SAL7CG')
                document.getElementById('botonhorario_SAL7CG').disabled = false
                document.getElementById('botonhorario_SAL7CG').classList.add('botonactivo_SAL7CG')
            }
        },
        _validaraccion_SAL7CG() {
            POPUP(
                {
                    array: [
                        { ID: '1', DESCRIPCION: 'BLOQUEO DE HORARIO' },
                        { ID: '2', DESCRIPCION: 'TURNO ESPECIAL' },
                        { ID: '3', DESCRIPCION: 'CAMBIO HORARIO' },
                    ],
                    titulo: 'ACCION A REALIZAR',
                    indices: [{ id: 'ID', label: 'DESCRIPCION' }],
                    callback_f: _toggleNav
                },
                this._evaluaraccion_SAL7CG
            )
        },
        _evaluaraccion_SAL7CG(data) {
            this.form.accion_SAL7CG = `${data.ID} - ${data.DESCRIPCION}`
            if (data.ID == '1' || data.ID == '2') {
                let elementos = document.getElementsByClassName('TURNOESPECIAL_SAL7CG')
                for (var i = 0; i < elementos.length; i++) {
                    elementos[i].classList.add('hidden');
                }
                return this._validarCON850_SAL7CG()
            }
            if (data.ID == '3') {
                let elementos = document.getElementsByClassName('CALENDARIO_SAL97CG')
                for (var i = 0; i < elementos.length; i++) {
                    elementos[i].classList.add('hidden');
                }
                return this._evaluarmedico_SAL7CG()
            }
            this._validarCON850_SAL7CG()
        },
        _validarCON850_SAL7CG() {
            CON850(this._evaluarCON850_SAL7CG)
        },
        _evaluarCON850_SAL7CG(data) {
            console.log(data)
            if (data.id == 'F') return this._validaraccion_SAL7CG()
            this.form.novedad_SAL7CG = `${data.id} - ${data.descripcion}`
            if (data.id == '7') {
                this.form.opercrea_SAL7CG = localStorage.Usuario
                this.form.fechaelab_SAL7CG = moment().format('YYYYMMDD')
            }
            if (data.id == '8') {
                if (this.form.accion_SAL7CG.substring(0,1) == '1') {
                    CON851('03','03',null,'error','Error')
                    return setTimeout(() => this._validarCON850_SAL7CG(), 300)
                }
                this.form.opermod_SAL7CG = localStorage.Usuario
                this.form.fechamod_SAL7CG = moment().format('YYYYMMDD')
            }
            this._evaluarmedico_SAL7CG()
        },
        _evaluarmedico_SAL7CG() {
            document.getElementById('boton2_SAL7CG').disabled = true
            document.getElementById('boton2_SAL7CG').classList.remove('botonactivo_SAL7CG')
            
            if (this.form.accion_SAL7CG.substring(0,1) == '3') {
                document.getElementById('botonhorario2_SAL7CG').disabled = true
                document.getElementById('botonhorario2_SAL7CG').classList.remove('botonactivo_SAL7CG')
            }

            validarInputs(
                {
                    form: '#VALIDAR1_SAL7CG',
                    orden: '1'
                },
                ()  => {
                    if (this.form.accion_SAL7CG.substring(0,1) == '3') {
                        let elementos = document.getElementsByClassName('CALENDARIO_SAL97CG')
                        for (var i = 0; i < elementos.length; i++) {
                            elementos[i].classList.remove('hidden');
                        }
                        return this._validaraccion_SAL7CG()
                    }
                    this._validarCON850_SAL7CG()
                },
                () => {
                    if (medicoMask_SAL7CG.value == 0 || medicoMask_SAL7CG.value.trim() == '') {
                        CON851('03', '03', null, 'error', 'error')
                        return this._evaluarmedico_SAL7CG()
                    }

                    if (this.form.accion_SAL7CG.substring(0,1) == '3') {
                        document.getElementById('botonhorario2_SAL7CG').disabled = false
                        return document.getElementById('botonhorario2_SAL7CG').classList.add('botonactivo_SAL7CG')
                    }

                    postData(
                        {
                            datosh: `${datosEnvio()}`,
                            paso: '1',
                            codigo: medicoMask_SAL7CG.value.replace(/,/g,'').padStart(10,'0')
                        },
                        get_url('APP/SALUD/SER819.DLL')
                    )
                        .then((data) => {
                            console.log(data);
                            if (data.NOMBRE.toUpperCase().trim() == 'PERSONAL NO ATIENDE') {
                                CON851('01','01',null,'error','Error')
                                return this._evaluarmedico_SAL7CG()
                            }
                            this.form.idmedicod_SAL7CG = data.NOMBRE
                            loader('show')
                            postData(
                                { 
                                    datosh: datosEnvio(),
                                    ACCION: '*',
                                    PASO: '2',
                                    NOVEDAD: this.form.novedad_SAL7CG.substring(0,1),
                                    FECHAINICIAL: `${moment(this.date).format('YYYYMM')}01`,
                                    FECHAFINAL: moment(this.date).endOf('month').format('YYYYMMDD'),
                                    PROFESIONAL: medicoMask_SAL7CG.value.replace(/,/g,'').padStart(10,'0')
                                }, 
                                get_url('APP/SALUD/SAL7CG.DLL')
                            )
                            .then((data) => {
                                loader('hide')
                                data.HORARIOS.pop()
                                if (data.HORARIOS.length == 0){
                                    this.SAL7CG.ACTIVARFECHA = 1
                                    document.getElementById('boton2_SAL7CG').disabled = false
                                    document.getElementById('boton2_SAL7CG').classList.add('botonactivo_SAL7CG')
                                    return this.attributes = []
                                }
                                this.attributes = []
                                var key = 0
                                for (let accion of data.HORARIOS) {
                                    console.log(accion.ACCION)
                                    let bar = ''
                                    let description = ''
                                    let date = moment(accion.FECHA).format('YYYY-MM-DD')
                                    if (accion.ACCION == '1') bar = 'red'
                                    if (accion.ACCION == '2') bar = 'blue'
                                    if (accion.ACCION == '1') description = `AGENDA BLOQUEADA`
                                    if (accion.ACCION == '2') description = `HORARIO ${accion.HORAINI1}:${accion.HORAFIN1}-${accion.HORAINI2}${accion.HORAFIN2}`
                                    this.attributes.push({ key: key, bar: bar, customData: { color: bar, observacion: accion.OBSERVACION, horasinicio1:accion.HORAINI1, horasfinal1:accion.HORAFIN1, horasinicio2:accion.HORAINI2, horasfinal2:accion.HORAFIN2, id: key, sucursal: accion.SUCURSAL, oper_crea:accion.OPER_CREA, fecha_elab:accion.FECHA_CREA, description: description, date: new Date(accion.FECHA.substring(0,4), accion.FECHA.substring(4,6), accion.FECHA.substring(6,8))  }, dates: new Date(parseInt(accion.FECHA.substring(0,4)), parseInt(accion.FECHA.substring(4,6))-1, parseInt(accion.FECHA.substring(6,8))) })
                                    key++
                                }
                                this.SAL7CG.ACTIVARFECHA = 1
                                document.getElementById('boton2_SAL7CG').disabled = false
                                document.getElementById('boton2_SAL7CG').classList.add('botonactivo_SAL7CG')
                            })
                            .catch((error) => {
                                loader('hide')
                                console.error(error)
                                CON851(
                                    '',
                                    'Ocurrio un error consultando los horarios',
                                    null,
                                    'error',
                                    'Error'
                                    )
                                this._evaluarmedico_SAL7CG()
                            })
                        })
                        .catch((err) => {
                            console.error(err)
                            this._evaluarmedico_SAL7CG()
                        });
                }
            );
        },
        pageChange(data){
            this.date = `${moment(`${data.year.toString()}${data.month.toString().padStart(2,'0')}01`).format('YYYYMM')}01`
            console.log(data);
            if (this.SAL7CG.ACTIVARFECHA == 1) {
                this.fechas = []
                loader('show')
                let date = `${data.year.toString()}${data.month.toString().padStart(2,'0')}`
                postData(
                    { 
                        datosh: datosEnvio(),
                        ACCION: '*',
                        PASO: '2',
                        NOVEDAD: this.form.novedad_SAL7CG.substring(0,1),
                        FECHAINICIAL: `${moment(date).format('YYYYMM')}01`,
                        FECHAFINAL: moment(date).endOf('month').format('YYYYMMDD'),
                        PROFESIONAL: medicoMask_SAL7CG.value.replace(/,/g,'').padStart(10,'0')
                    }, 
                    get_url('APP/SALUD/SAL7CG.DLL')
                )
                .then((data) => {
                    loader('hide')
                    if (typeof(data.HORARIOS) == 'string'){
                        if (data.HORARIOS.trim() == 'NO TIENE NINGUN HORARIO ESPECIAL'){
                            return this.attributes = []
                        }
                    }
                    data.HORARIOS.pop()
                    this.attributes = []
                    var key = 0
                    for (let accion of data.HORARIOS) {
                        console.log(accion.ACCION)
                        let bar = ''
                        let description = ''
                        let date = moment(accion.FECHA).format('YYYY-MM-DD')
                        if (accion.ACCION == '1') bar = 'red'
                        if (accion.ACCION == '2') bar = 'blue'
                        if (accion.ACCION == '1') description = `AGENDA BLOQUEADA`
                        if (accion.ACCION == '2') description = `HORARIO ${accion.HORAINI1}-${accion.HORAFIN1} Hasta ${accion.HORAINI2}-${accion.HORAFIN2}`
                        this.attributes.push({ key: key, bar: bar, customData: { color: bar, observacion: accion.OBSERVACION, horasinicio1:accion.HORAINI1, horasfinal1:accion.HORAFIN1, horasinicio2:accion.HORAINI2, horasfinal2:accion.HORAFIN2, id: key, sucursal: accion.SUCURSAL, description: description, date: new Date(accion.FECHA.substring(0,4), accion.FECHA.substring(4,6), accion.FECHA.substring(6,8))  }, dates: new Date(parseInt(accion.FECHA.substring(0,4)), parseInt(accion.FECHA.substring(4,6))-1, parseInt(accion.FECHA.substring(6,8))) })
                        // this.fechas.push({fecha: date})
                        // let elemento = document.getElementById(date)
                        // elemento.classList.add('fechaactiva_SAL7CG')
                        key++
                    }
                    this.SAL7CG.ACTIVARFECHA = 1
                })
                .catch((error) => {
                    loader('hide')
                    console.error(error)
                    CON851(
                        '',
                        'Ocurrio un error consultando los horarios',
                        null,
                        'error',
                        'Error'
                        )
                    this._evaluarmedico_SAL7CG()
                })
            }
        },
        _fecha_SAL7CG(date){
            console.log(date)
            if (this.SAL7CG.ACTIVARFECHA == 1) {
                let fechasrepetidas = this.fechas.filter(x => x.fecha.trim() == date.id.trim())
                if (fechasrepetidas.length > 0) {
                    return CON851('','Fecha repetida',null,'error','Error')
                }
                postData(
                    { 
                        datosh: datosEnvio(),
                        PASO: '1',
                        NOVEDAD: this.form.novedad_SAL7CG.substring(0,1),
                        LLAVE: `${this.form.accion_SAL7CG.substring(0,1)}${medicoMask_SAL7CG.value.replace(/,/g,'').padStart(10,'0')}${date.id.replace(/-/g,'')}`
                    }, 
                    get_url('APP/SALUD/SAL7CG.DLL')
                )
                .then((data) => {
                    loader('hide')
                    let elemento = document.getElementById(date.id)
                    elemento.classList.add('fechaactiva_SAL7CG')
                    document.getElementById('boton_SAL7CG').classList.add('botonactivo_SAL7CG')
                    document.getElementById('boton_SAL7CG').disabled = false
                    this.fechas.push({fecha: date.id})
                    document.getElementById('boton2_SAL7CG').disabled = true
                    document.getElementById('boton2_SAL7CG').classList.remove('botonactivo_SAL7CG')
                    if (this.form.novedad_SAL7CG.substring(0,1) != '7') {
                        this.form.sucursal_SAL7CG = date.attributes[0].customData.sucursal
                        this.form.observaciones_SAL7CG = date.attributes[0].customData.observacion
                        this.form.horainicio1_SAL7CG = date.attributes[0].customData.horasinicio1.substring(0,2)
                        this.form.minutoinicio1_SAL7CG = date.attributes[0].customData.horasinicio1.substring(2,4)
                        this.form.horafinal1_SAL7CG = date.attributes[0].customData.horasfinal1.substring(0,2)
                        this.form.minutofinal1_SAL7CG = date.attributes[0].customData.horasfinal1.substring(2,4)
                        this.form.horainicio2_SAL7CG = date.attributes[0].customData.horasinicio2.substring(0,2)
                        this.form.minutoinicio2_SAL7CG = date.attributes[0].customData.horasinicio2.substring(2,4)
                        this.form.horafinal2_SAL7CG = date.attributes[0].customData.horasfinal2.substring(0,2)
                        this.form.minutofinal2_SAL7CG = date.attributes[0].customData.horasfinal2.substring(2,4)
                        this.form.opercrea_SAL7CG = date.attributes[0].customData.oper_crea
                        this.form.fechaelab_SAL7CG = date.attributes[0].customData.fecha_elab
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
            }
        },
        _eliminarfecha(date){
            for (let i in this.fechas){
                if (this.fechas[i] == date) {
                    this.fechas.splice(i, 1)
                    let elemento = document.getElementById(date.fecha)
                    elemento.classList.remove('fechaactiva_SAL7CG')
                };
            }
            if (this.fechas.length == 0) {
                document.getElementById('boton_SAL7CG').disabled = true
                document.getElementById('boton_SAL7CG').classList.remove('botonactivo_SAL7CG')
                document.getElementById('boton2_SAL7CG').disabled = false
                document.getElementById('boton2_SAL7CG').classList.add('botonactivo_SAL7CG')
                // this._evaluarmedico_SAL7CG()
            }
        },
        _evaluarsucursal_SAL7CG() {
            this.SAL7CG.ACTIVARFECHA = 0
            document.getElementById('boton_SAL7CG').disabled = true
            document.getElementById('boton_SAL7CG').classList.remove('botonactivo_SAL7CG')
            if (this.form.novedad_SAL7CG.substring(0,1) == '9') { 
                this.SAL7CG.CONTEO = 0
                return CON851P('02', this._evaluarmedico_SAL7CG, this._grabardatos_SAL7CG)
            }
            POPUP(
                {
                    array: this.SAL7CG.SUCURSALES,
                    titulo: 'SUCURSALES',
                    indices: [
                        {
                            id: 'ID',
                            label: 'DESCRIPCION'
                        }
                    ],
                    seleccion: '0',
                    callback_f: () => { this.SAL7CG.ACTIVARFECHA = 1}
                },
                (data) => {
                    console.log(data);
                    this.form.sucursal_SAL7CG = data.DESCRIPCION
                    this._evaluarhorainicio1_SAL7CG()
                }
            );
        },
        _evaluarhorainicio1_SAL7CG(){
            if (this.form.accion_SAL7CG.substring(0,1) == '1') {
                this.form.horainicio1_SAL7CG = '00'
                this.form.minutoinicio1_SAL7CG = '00'
                this.form.horafinal1_SAL7CG = '00'
                this.form.minutofinal1_SAL7CG = '00'
                this.form.horainicio2_SAL7CG ='00'
                this.form.minutoinicio2_SAL7CG ='00'
                this.form.horafinal2_SAL7CG ='00'
                this.form.minutofinal2_SAL7CG ='00'
                return this._evaluarobservacion_SAL7CG()
            }
            validarInputs(
                {
                    form: '#VALIDAR2_SAL7CG',
                    orden: '1'
                },
                this._evaluarsucursal_SAL7CG,
                () => {
                    this.form.horainicio1_SAL7CG = this.form.horainicio1_SAL7CG.padStart(2,'0')
                    if(this.form.horainicio1_SAL7CG.trim() == '' || this.form.horainicio1_SAL7CG.trim() == '00'){
                        CON851('03','03',null,'error','Error')
                        return this._evaluarhorainicio1_SAL7CG()
                    }
                    if (this.form.horainicio1_SAL7CG > 23) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarhorainicio1_SAL7CG()
                    }
                    this._evaluarminutoinicio1_SAL7CG()
                }
            )
        },
        _evaluarminutoinicio1_SAL7CG(){
            validarInputs(
                {
                    form: '#VALIDAR3_SAL7CG',
                    orden: '1'
                },
                this._evaluarhorainicio1_SAL7CG,
                () => {
                    this.form.minutoinicio1_SAL7CG = this.form.minutoinicio1_SAL7CG.padStart(2,'0')
                    if(this.form.horainicio1_SAL7CG.trim() == '' || this.form.horainicio1_SAL7CG.trim() == '00'){
                        this.form.minutoinicio1_SAL7CG = '00'
                        return this._evaluarhorafinal1_SAL7CG()
                    }
                    if (this.form.minutoinicio1_SAL7CG > 59) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarminutoinicio1_SAL7CG()
                    }
                    this._evaluarhorafinal1_SAL7CG()
                }
            )
        },
        _evaluarhorafinal1_SAL7CG(){
            validarInputs(
                {
                    form: '#VALIDAR4_SAL7CG',
                    orden: '1'
                },
                this._evaluarminutoinicio1_SAL7CG,
                () => {
                    this.form.horafinal1_SAL7CG = this.form.horafinal1_SAL7CG.padStart(2,'0')
                    if(this.form.horafinal1_SAL7CG.trim() == '' || this.form.horafinal1_SAL7CG.trim() == '00'){
                        CON851('03','03',null,'error','Error')
                        return this._evaluarhorafinal1_SAL7CG()
                    }
                    if (this.form.horafinal1_SAL7CG > 23) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarhorafinal1_SAL7CG()
                    }
                    if (this.form.horainicio1_SAL7CG > this.form.horafinal1_SAL7CG) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarhorafinal1_SAL7CG()
                    }
                    this._evaluarminutofinal1_SAL7CG()
                }
            )
        },
        _evaluarminutofinal1_SAL7CG(){
            validarInputs(
                {
                    form: '#VALIDAR5_SAL7CG',
                    orden: '1'
                },
                this._evaluarhorafinal1_SAL7CG,
                () => {
                    this.form.minutofinal1_SAL7CG = this.form.minutofinal1_SAL7CG.padStart(2,'0')
                    if(this.form.minutofinal1_SAL7CG.trim() == '' || this.form.minutofinal1_SAL7CG.trim() == '00'){
                        this.form.minutofinal1_SAL7CG = '00'
                        return this._evaluarhorainicio2_SAL7CG()
                    }
                    if (this.form.minutofinal1_SAL7CG > 59) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarminutofinal1_SAL7CG()
                    }
                    if (`${this.form.horainicio1_SAL7CG}${this.form.minutoinicio1_SAL7CG}` > `${this.form.horafinal1_SAL7CG}${this.form.minutofinal1_SAL7CG}`) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarminutofinal1_SAL7CG()
                    }
                    this._evaluarhorainicio2_SAL7CG()
                }
            )
        },
        _evaluarhorainicio2_SAL7CG(){
            validarInputs(
                {
                    form: '#VALIDAR6_SAL7CG',
                    orden: '1'
                },
                this._evaluarminutofinal1_SAL7CG,
                () => {
                    this.form.horainicio2_SAL7CG = this.form.horainicio2_SAL7CG.padStart(2,'0')
                    if (this.form.horainicio2_SAL7CG.trim() == '' || this.form.horainicio2_SAL7CG == '00'){
                        this.form.horainicio2_SAL7CG = '00'
                        this.form.minutoinicio2_SAL7CG = '00'
                        this.form.horafinal2_SAL7CG = '00'
                        this.form.minutofinal2_SAL7CG = '00'
                        return this._evaluarobservacion_SAL7CG()
                    }
                    if (this.form.horainicio1_SAL7CG > 23) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarhorainicio2_SAL7CG()
                    }
                    if (this.form.horafinal1_SAL7CG > this.form.horainicio2_SAL7CG) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarhorainicio2_SAL7CG()
                    }
                    this._evaluarminutoinicio2_SAL7CG()
                }
            )
        },
        _evaluarminutoinicio2_SAL7CG(){
            validarInputs(
                {
                    form: '#VALIDAR7_SAL7CG',
                    orden: '1'
                },
                this._evaluarhorainicio2_SAL7CG,
                () => {
                    this.form.minutoinicio2_SAL7CG = this.form.minutoinicio2_SAL7CG.padStart(2,'0')
                    if(this.form.minutoinicio2_SAL7CG.trim() == '' || this.form.minutoinicio2_SAL7CG.trim() == '00'){
                        this.form.minutoinicio2_SAL7CG = '00'
                        return this._evaluarhorafinal2_SAL7CG()
                    }
                    if (this.form.minutoinicio2_SAL7CG > 59) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarminutoinicio2_SAL7CG()
                    }
                    this._evaluarhorafinal2_SAL7CG()
                }
            )
        },
        _evaluarhorafinal2_SAL7CG(){
            validarInputs(
                {
                    form: '#VALIDAR8_SAL7CG',
                    orden: '1'
                },
                this._evaluarminutoinicio2_SAL7CG,
                () => {
                    this.form.horafinal2_SAL7CG = this.form.horafinal2_SAL7CG.padStart(2,'0')
                    if (this.form.horafinal2_SAL7CG.trim() == '' || this.form.horafinal2_SAL7CG == '00'){
                        this.form.horafinal2_SAL7CG = '00'
                        this.form.minutofinal2_SAL7CG = '00'
                        this._evaluarobservacion_SAL7CG()
                    }
                    if (this.form.horafinal2_SAL7CG > 23) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarhorafinal2_SAL7CG()
                    }
                    if (this.form.horainicio2_SAL7CG > this.form.horafinal2_SAL7CG) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarhorafinal2_SAL7CG()
                    }
                    this._evaluarminutofinal2_SAL7CG()
                }
            )
        },
        _evaluarminutofinal2_SAL7CG(){
            validarInputs(
                {
                    form: '#VALIDAR9_SAL7CG',
                    orden: '1'
                },
                this._evaluarhorafinal2_SAL7CG,
                () => {
                    this.form.minutofinal2_SAL7CG = this.form.minutofinal2_SAL7CG.padStart(2,'0')
                    if(this.form.minutofinal2_SAL7CG.trim() == '' || this.form.minutofinal2_SAL7CG.trim() == '00'){
                        this.form.minutofinal2_SAL7CG = '00'
                        return this._evaluarobservacion_SAL7CG()
                    }
                    if (this.form.minutofinal2_SAL7CG > 59) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarminutoinicio1_SAL7CG()
                    }
                    if (`${this.form.horainicio2_SAL7CG}${this.form.minutoinicio2_SAL7CG}` > `${this.form.horafinal2_SAL7CG}${this.form.minutofinal2_SAL7CG}`) {
                        CON851('03','03',null,'error','Error')
                        return this._evaluarminutofinal2_SAL7CG()
                    }
                    this._evaluarobservacion_SAL7CG()
                }
            )
        },
        _evaluarobservacion_SAL7CG(){
            validarInputs(
                {
                    form: '#VALIDAR10_SAL7CG',
                    orden: '1'
                },
                () => {
                    if (this.form.accion_SAL7CG.substring(0,1) == '1') return this._evaluarsucursal_SAL7CG()
                    if (this.form.horainicio2_SAL7CG.trim() == '00') return this._evaluarhorainicio2_SAL7CG()
                    this._evaluarminutofinal2_SAL7CG()
                },
                () => { 
                    this.SAL7CG.CONTEO = 0
                    CON851P('01', this._evaluarminutofinal1_SAL7CG, this._grabardatos_SAL7CG)
                }
            )
        },
        _grabardatos_SAL7CG(){
            if (this.fechas.length == this.SAL7CG.CONTEO) {
                CON851('39','39',null,'success','Exito')
                this._inicializartodo_SAL7CG()
                return this._validaraccion_SAL7CG()
            }
            let registro = 
            `${this.form.accion_SAL7CG.substring(0,1)}${medicoMask_SAL7CG.value.replace(/,/g,'').padStart(10,'0')}${this.fechas[this.SAL7CG.CONTEO].fecha.replace(/-/g,'')}|`
            registro +=
            `${this.form.sucursal_SAL7CG.substring(0,2)}|${this.form.horainicio1_SAL7CG}${this.form.minutoinicio1_SAL7CG}|`
            registro +=
            `${this.form.horafinal1_SAL7CG}${this.form.minutofinal1_SAL7CG}|${this.form.horainicio2_SAL7CG}${this.form.minutoinicio2_SAL7CG}|`
            registro +=
            `${this.form.horafinal2_SAL7CG}${this.form.minutofinal2_SAL7CG}|${this.form.observaciones_SAL7CG.trim()}|${this.form.opercrea_SAL7CG}|`
            registro +=
            `${this.form.opermod_SAL7CG}|${this.form.fechaelab_SAL7CG}|`
            postData(
                { 
                    datosh: datosEnvio(),
                    PASO: '3',
                    NOVEDAD: this.form.novedad_SAL7CG.substring(0,1),
                    REGISTRO: registro
                }, 
                get_url('APP/SALUD/SAL7CG.DLL')
            )
            .then((data) => {
                this.SAL7CG.CONTEO++
                this._grabardatos_SAL7CG()
            })
            .catch((error) => {
                console.error(error)
                this._evaluarobservacion_SAL7CG()
                CON851(
                    '',
                    'Ocurrio un problema guardando',
                    null,
                    'error',
                    'Error'
                    )
            })
        },
        _validarhorarioprofesional_SAL7CG(){
            CON851P(
                '01',
                () => {
                    document.getElementById('botonhorario_SAL7CG').disabled = true
                    document.getElementById('botonhorario_SAL7CG').classList.remove('botonactivo_SAL7CG')
                    document.getElementById('botonhorario2_SAL7CG').disabled = true
                    document.getElementById('botonhorario2_SAL7CG').classList.remove('botonactivo_SAL7CG')
                    this._evaluarmedico_SAL7CG()
                }, 
                () => {
                    postData(
                        { 
                            datosh: datosEnvio(),
                            PASO: '4',
                            NOVEDAD: this.form.novedad_SAL7CG.substring(0,1),
                            MEDICO: medicoMask_SAL7CG.value.replace(/,/g,'').padStart(10,'0'),
                            FECHAHORARIO1: moment(this.range.start).format('YYYYMMDD'),
                            FECHAHORARIO2: moment(this.range.end).format('YYYYMMDD')

                        }, 
                        get_url('APP/SALUD/SAL7CG.DLL')
                    )
                    .then((data) => {
                        CON851('39','39',null,'success','Exito')
                        _toggleNav()
                    })
                    .catch((error) => {
                        console.error(error)
                        setTimeout(this._validarhorarioprofesional_SAL7CG, 300)
                    })
                }
            )
        },
        _inicializartodo_SAL7CG(){
            this.form.accion_SAL7CG = ''
            this.form.novedad_SAL7CG = ''
            this.form.idmedicod_SAL7CG = ''
            this.form.sucursal_SAL7CG = ''
            this.form.horainicio1_SAL7CG = ''
            this.form.minutoinicio1_SAL7CG = ''
            this.form.horafinal1_SAL7CG = ''
            this.form.minutofinal1_SAL7CG = ''
            this.form.horainicio2_SAL7CG =''
            this.form.minutoinicio2_SAL7CG =''
            this.form.horafinal2_SAL7CG =''
            this.form.minutofinal2_SAL7CG =''
            this.form.observaciones_SAL7CG = ''
            this.form.opercrea_SAL7CG =''
            this.form.fechaelab_SAL7CG = ''
            this.form.opermod_SAL7CG = ''
            this.form.fechamod_SAL7CG = ''
            for (let i in this.fechas){
                let elemento = document.getElementById(this.fechas[i].fecha)
                elemento.classList.remove('fechaactiva_SAL7CG')
            }
            this.fechas = []
            this.attributes = []
        },
        _ventanaprofesionales_SAL7CG() {
            loader('show')
            postData({ datosh: datosEnvio() }, get_url('APP/SALUD/SER819.DLL'))
            .then((data) => {
                loader('hide')
                data.ARCHPROF.pop()
                data = data.ARCHPROF
                _ventanaDatos({
                    titulo: 'VENTANA DE PROFESIONALES',
                    columnas: ['NOMBRE', 'IDENTIFICACION', 'DESCRIPCION'],
                    data: data,
                    callback_esc: function () {
                        $('#idmedico_SAL7CG').focus()
                    },
                    callback: function (data) {
                        medicoMask_SAL7CG.typedValue = parseInt(data.IDENTIFICACION).toString()
                        _enterInput('#idmedico_SAL7CG')
                    }
                });
            })
            .catch((error) => {
                loader('hide')
                console.error(error)
                CON851(
                    '',
                    'Ocurrio un error consultando los profesionales',
                    null,
                    'error',
                    'Error'
                )
                $('#idmedico_SAL7CG').focus()
            })
        }
    }
});

var medicoMask_SAL7CG = IMask($('#idmedico_SAL7CG')[0], { mask: Number, thousandsSeparator: ',' });
