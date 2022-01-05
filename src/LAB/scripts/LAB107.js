var Chart = require('chart.js');

new Vue({
    el: '#LAB107',
    data: {
        global_lab107: {
            SUC: '',
            CL: '',
            COMPROB: '',
            ADJUNTOS: [],
            ADMI_CREA: '',
            ADMI_MODIF: '',
            ALCANZO_FC: '',
            ALTERACION_SIMP: '',
            ANOMALIAS_TA: '',
            ARRITMIAS: '',
            CLAUDICACION: '',
            COMPROB: '',
            CONCLUSIONES: '',
            CTA: '',
            CUP: '',
            DESCRIP_CUP: '',
            DESCRIP_DIAGNOS: '',
            DESCRIP_ESPECIALIDAD: '',
            DESCRIP_PACI: '',
            DIABETES: '',
            DIAGNOS: '',
            DISLIPIDEMIA: '',
            DISNEA: '',
            DOLOR_PRECORDIAL: '',
            DURACION: '',
            EDAD: '',
            ELECTROCAR_BASAL: '',
            ELECTROCAR_DURA: '',
            ELECTROCAR_POST: '',
            ENFER_CORONARIA: '',
            ENTIDAD: '',
            ESPECIALIDAD: '',
            FALTA_COLABORACION: '',
            FAMILIARES: '',
            FATIGA_GENERAL: '',
            FC: '',
            FC_FINAL: '',
            FECHA: '',
            FECHA_CREA: '',
            FECHA_MODIF: '',
            FINALIDAD: '',
            FUMADOR: '',
            HALLAZGOS: '',
            HALLAZ_ARRITMIA: '',
            HIPERTENSION: '',
            HORA_CREA: '',
            HORA_MODIF: '',
            ID_ENTIDAD: '',
            SUGERENCIAS: '',
            ID_HISTORIA: '',
            ID_MEDICO: '',
            ID_PACI: '',
            IMP: '',
            LLAVE: '',
            MAREO: '',
            MEDICAMENTOS: '',
            METS: '',
            MOTIVOS_TECNICOS: '',
            NIT: '',
            NOMBREPDF: '',
            NOMBRE_MEDICO: '',
            NOM_ENTIDAD: '',
            OBESIDAD: '',
            OTROS: '',
            OTROS_TEXT: '',
            PESO: '',
            PLAN: '',
            PUERTA_ESTAD: '',
            REGISTRO_ESCRITO: '',
            REG_MEDICO: '',
            RESP_CRONOTROPICA: '',
            RESP_FUNCIONAL: '',
            RESP_PRESORA: '',
            SEDENTARISMO: '',
            SEXO: '',
            SINCOPE: '',
            STRESS: '',
            SUC: '',
            TABLA_PROTOCOLO: [],
            TABLA_PROTOCOLO_POST: [],
            TALLA: '',
            TA_DIASTOLE: '',
            TA_FINAL_DIASTOLE: '',
            TA_FINAL_SISTOLE: '',
            TA_SISTOLE: ''
        },
        profesionales_lab107: [],
        Maskpeso: IMask.createMask({ mask: Number, radix: '.', padFractionalZeros: true, signed: false, scale: 1, min: 000, max: 200.0 }),
        MaskTabla: IMask.createMask({ mask: Number, radix: '.', padFractionalZeros: true, signed: false, scale: 1, min: 000, max: 99.9 }),
        DESCRIP_FINALIDAD: '',
        grado_Mets: '',
        etapa1: [],
        etapa2: [],
        etapa3: [],
        etapa4: [],
        etapa5: [],
        etapa6: [],
        etapa7: [],
        grafica1: null,
        Graf_Frecuencias: [],
        Graf_Sistoles: [],
        grafica2: null,
        grafica_pie_1: null,
        grafica_pie_2: null,
        grafica_pie_3: null,
        grafica_pie_4: null,
        Graficas_post: { primera: null, segunda: null, tercera: null, cuarta: null },
        calculos: { DOBLE_PRODUCTO: '', FC_MAXIMA: '', DP_FINAL: '', CF: '', CONSO2: '' },
        CONSULTA: false,
        imgGraf1: '',
        imgGraf2: '',
        imgGraf3: '',
        imgGraf4: '',
        imgGraf5: '',
        imgGraf6: '',
    },
    created() {
        loader('show')
        _inputControl('disabled');
        _inputControl('reset');

        if (localStorage.Modulo == 'HIC') {
            nombreOpcion('7,3 - Consultar resultados lab')
        } else {
            nombreOpcion('5,3 - Prueba de esfuerzo')
        }
        this.traerRegistroCompleto()
        var $_this = this

        window.addEventListener('resize', () => {
            $_this.actualizarGrafica1(9)
            $_this.actualizarGrafica2()
            $_this.actualizarGrafica_pie1()
            $_this.actualizarGrafica_pie2()
            $_this.actualizarGrafica_pie3()
            $_this.actualizarGrafica_pie4()
        });
    },
    watch: {

    },
    methods: {
        calcularDP() {
            var sistole = parseInt(this.global_lab107.TA_SISTOLE) || 0
            var fc = parseInt(this.global_lab107.FC) || 0
            this.calculos.DOBLE_PRODUCTO = sistole * fc
        },
        calculaFCmaxima() {
            var edad = parseInt(this.global_lab107.EDAD.substring(1, 4)) || 0
            var base = this.global_lab107.SEXO == 'F' ? 210 : 220

            this.calculos.FC_MAXIMA = base - edad
            var sub = (base - edad) * 0.85
            this.calculos.FC_SUBMAXIMA = sub.toFixed(2)
        },
        calculaDpFinal() {
            var sistole_fin = parseInt(this.global_lab107.TA_FINAL_SISTOLE) || 0
            var fc_fin = parseInt(this.global_lab107.FC_FINAL) || 0
            this.calculos.DP_FINAL = sistole_fin * fc_fin
        },
        calculaConsO2CF() {
            var mets = parseInt(this.global_lab107.METS) || 0
            this.calculos.CONSO2 = mets * 3.5

            switch (this.global_lab107.METS.trim()) {
                case '1':
                case '2':
                    this.calculos.CF = 'IV'
                    break;
                case '3':
                case '4':
                    this.calculos.CF = 'III'
                    break;
                case '5':
                case '6':
                    this.calculos.CF = 'II'
                    break;
                case '7':
                case '8':
                case '9':
                case '10':
                case '11':
                case '12':
                case '13':
                case '14':
                case '15':
                case '16':
                    this.calculos.CF = 'I'
                    break;
                default:
                    this.calculos.CF = 'Inválido'
                    break;
            }
        },
        traerRegistroCompleto() {
            var $_this = this;
            var datos_envio = datosEnvio() + LLAVE_RXLAB_GLOBAL.COMPROBANTE + '|' + LLAVE_RXLAB_GLOBAL.CUP + '|' + LLAVE_RXLAB_GLOBAL.ITEM + '|'
            let URL = get_url("APP/LAB/LAB102.DLL");
            postData({ datosh: datos_envio }, URL)
                .then(function (data) {
                    $_this.global_lab107 = data.RESULTADOS_LAB[0]
                    console.log($_this.global_lab107)
                    $_this.validarOpcion()
                })
                .catch(err => {
                    console.error(err)
                    CON851('', 'Error en consulta', null, 'error', 'Error');
                    loader("hide")
                    this.salir_lab107()
                })
        },
        validarOpcion() {
            var opcion = ''

            if (localStorage.Modulo == 'LAB') {
                let active = $('#navegacion').find('li.opcion-menu.active');
                opcion = active[0].attributes[2].nodeValue;

                if (opcion == '02') {
                    // if (this.global_lab107.REGISTRO_ESCRITO == 'S') {

                    //     if (localStorage.Usuario == 'GEBC') {
                    //         this.traerProfesionales('LLENADO')
                    //     } else {
                    //         loader('hide')
                    //         jAlert(
                    //             { titulo: 'ADVERTENCIA!', mensaje: 'Registro no se puede modificar!, para consultar ingrese a la opción 5' },
                    //             this.salir_lab107
                    //         )
                    //     }
                    // } else {
                    this.traerProfesionales('LLENADO')
                    // }

                } else if (opcion == '04') {
                    // if (this.global_lab107.REGISTRO_ESCRITO == ' ') {
                    //     loader('hide')
                    //     jAlert(
                    //         { titulo: 'ADVERTENCIA!', mensaje: 'Registro no se ha llenado!, Ingrese por la opcion 2' },
                    //         this.salir_lab107
                    //     )
                    // } else {
                    this.traerProfesionales('CONSULTA')
                    // }
                }

            } else if (localStorage.Modulo == 'HIC') {

                // if (this.global_lab107.REGISTRO_ESCRITO == ' ') {
                //     loader('hide')
                //     jAlert(
                //         { titulo: 'ADVERTENCIA!', mensaje: 'Registro no se ha llenado!, Ingrese por modulo laboratorios opcion 2' },
                //         this.salir_lab107
                //     )
                // } else if (this.global_lab107.REGISTRO_ESCRITO == 'S') {
                this.traerProfesionales('CONSULTA')
                // }
            }

        },
        traerProfesionales(flujo) {
            var $_this = this;
            let URL = get_url("APP/SALUD/SER819.DLL");
            postData({ datosh: datosEnvio() }, URL)
                .then(function (data) {
                    $_this.profesionales_lab107 = data.ARCHPROF
                    $_this.profesionales_lab107.pop()
                    for (var i in $_this.profesionales_lab107) {
                        $_this.profesionales_lab107[i].NOMBRE = $_this.profesionales_lab107[i].NOMBRE.replace(/\�/g, "Ñ").trim()
                    }
                    $_this.asignarDatos(flujo)
                })
                .catch(err => {
                    console.error(err)
                    CON851('', 'Error en consulta', null, 'error', 'Error');
                    loader("hide")
                    this.salir_lab107()
                })
        },
        aperturaAdjunto_lab107(item) {
            var ruta = "D:\\WEB\\ADJUNTOS\\"

            child('start ' + ruta + item, (error, data) => {
                console.log(error, data)
            })
        },
        salir_lab107() {
            _inputControl('reset');
            _inputControl('disabled');
            this.global_lab107 = {};
            this.CONSULTA = false
            this.profesionales_lab107 = []
            let Window = BrowserWindow.getAllWindows();
            if (Window.length == 1) {
                $('.page-breadcrumb')[1].remove()
            }
            LLAVE_RXLAB_GLOBAL.MULTIPLE = false
            busquedaEstudios_RXLAB('PACIENTE', LLAVE_RXLAB_GLOBAL.ID_PACIENTE)
        },
        asignarDatos(flujo) {
            console.log(flujo)
            var $_this = this

            this.global_lab107.SUC = LLAVE_RXLAB_GLOBAL.SUC.trim()
            this.global_lab107.CL = LLAVE_RXLAB_GLOBAL.CL.trim()
            this.global_lab107.COMPROB = LLAVE_RXLAB_GLOBAL.COMPROB.trim()
            this.global_lab107.CUP = LLAVE_RXLAB_GLOBAL.CUP.trim()
            this.global_lab107.ID_PACI = LLAVE_RXLAB_GLOBAL.ID_PACIENTE.trim()
            this.global_lab107.ITEM = LLAVE_RXLAB_GLOBAL.ITEM.trim()

            this.global_lab107.DESCRIP_PACI = this.global_lab107.DESCRIP_PACI.replace(/\�/g, "Ñ").trim()
            this.global_lab107.DESCRIP_CUP = this.global_lab107.DESCRIP_CUP.replace(/\�/g, "Ñ").trim()

            this.global_lab107.PESO = this.global_lab107.PESO.trim()
            this.global_lab107.TALLA = this.global_lab107.TALLA.trim()

            this.global_lab107.HIPERTENSION = this.global_lab107.HIPERTENSION.trim()
            this.global_lab107.DISLIPIDEMIA = this.global_lab107.DISLIPIDEMIA.trim()
            this.global_lab107.STRESS = this.global_lab107.STRESS.trim()
            this.global_lab107.DIABETES = this.global_lab107.DIABETES.trim()
            this.global_lab107.FUMADOR = this.global_lab107.FUMADOR.trim()
            this.global_lab107.OBESIDAD = this.global_lab107.OBESIDAD.trim()
            this.global_lab107.ENFER_CORONARIA = this.global_lab107.ENFER_CORONARIA.trim()
            this.global_lab107.SEDENTARISMO = this.global_lab107.SEDENTARISMO.trim()
            this.global_lab107.FAMILIARES = this.global_lab107.FAMILIARES.trim()
            this.global_lab107.OTROS = this.global_lab107.OTROS.trim()
            this.global_lab107.OTROS_TEXT = this.global_lab107.OTROS_TEXT.trim()

            this.global_lab107.DOLOR_PRECORDIAL = this.global_lab107.DOLOR_PRECORDIAL.trim()
            this.global_lab107.DISNEA = this.global_lab107.DISNEA.trim()
            this.global_lab107.FATIGA_GENERAL = this.global_lab107.FATIGA_GENERAL.trim()
            this.global_lab107.CLAUDICACION = this.global_lab107.CLAUDICACION.trim()
            this.global_lab107.MAREO = this.global_lab107.MAREO.trim()
            this.global_lab107.SINCOPE = this.global_lab107.SINCOPE.trim()
            this.global_lab107.ALTERACION_SIMP = this.global_lab107.ALTERACION_SIMP.trim()
            this.global_lab107.ARRITMIAS = this.global_lab107.ARRITMIAS.trim()
            this.global_lab107.ANOMALIAS_TA = this.global_lab107.ANOMALIAS_TA.trim()
            this.global_lab107.MOTIVOS_TECNICOS = this.global_lab107.MOTIVOS_TECNICOS.trim()
            this.global_lab107.FALTA_COLABORACION = this.global_lab107.FALTA_COLABORACION.trim()
            this.global_lab107.ALCANZO_FC = this.global_lab107.ALCANZO_FC.trim()

            this.global_lab107.MEDICAMENTOS = this.global_lab107.MEDICAMENTOS.replace(/\&/g, "\n").trim()
            this.global_lab107.DATOS_CLINICOS = this.global_lab107.DATOS_CLINICOS.replace(/\&/g, "\n").trim()
            this.global_lab107.ELECTROCAR_BASAL = this.global_lab107.ELECTROCAR_BASAL.replace(/\&/g, "\n").trim()
            this.global_lab107.ELECTROCAR_DURA = this.global_lab107.ELECTROCAR_DURA.replace(/\&/g, "\n").trim()
            this.global_lab107.ELECTROCAR_POST = this.global_lab107.ELECTROCAR_POST.replace(/\&/g, "\n").trim()
            this.global_lab107.CONCLUSIONES = this.global_lab107.CONCLUSIONES.replace(/\&/g, "\n").trim()
            this.global_lab107.PLAN = this.global_lab107.PLAN.replace(/\&/g, "\n").trim()

            this.global_lab107.NOM_ENTIDAD = this.global_lab107.NOM_ENTIDAD.trim()

            for (var i in this.global_lab107.TABLA_PROTOCOLO) {
                var romano
                switch (i) {
                    case '0': romano = 'I'
                        break;;
                    case '1': romano = 'II'
                        break;;
                    case '2': romano = 'III'
                        break;;
                    case '3': romano = 'IV'
                        break;
                    case '4': romano = 'V'
                        break;
                    case '5': romano = 'VI'
                        break;
                    case '6': romano = 'VII'
                        break;
                }
                var posicion = (parseInt(i) + 1)

                this.global_lab107.TABLA_PROTOCOLO[i]['ESTADIO'] = romano
                this.global_lab107.TABLA_PROTOCOLO[i]['ID_VEL'] = 'validarVel' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO[i]['ID_PEND'] = 'validarPend' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO[i]['ID_TIME'] = 'validarTime' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO[i]['ID_VO2'] = 'validarVo2' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO[i]['ID_METS'] = 'validarMets' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO[i]['ID_TASISTOLE'] = 'validarTAsist' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO[i]['ID_TADIASTOLE'] = 'validarTAdiast' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO[i]['ID_FC'] = 'validarFC' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO[i]['ID_TIME_2'] = 'validarTime_2' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO[i]['ID_RITMO'] = 'validarRitmo' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO[i]['ID_SINTOM'] = 'validarSintomas' + posicion + '_lab107'

                this.global_lab107.TABLA_PROTOCOLO[i].VELOCIDAD = this.MaskTabla.resolve(this.global_lab107.TABLA_PROTOCOLO[i].VELOCIDAD.trim())
                this.global_lab107.TABLA_PROTOCOLO[i].PENDIENTE = this.global_lab107.TABLA_PROTOCOLO[i].PENDIENTE.trim()
                this.global_lab107.TABLA_PROTOCOLO[i].TIEMPO = this.global_lab107.TABLA_PROTOCOLO[i].TIEMPO.trim()
                this.global_lab107.TABLA_PROTOCOLO[i].VO2 = this.MaskTabla.resolve(this.global_lab107.TABLA_PROTOCOLO[i].VO2.trim())
                this.global_lab107.TABLA_PROTOCOLO[i].METS = this.global_lab107.TABLA_PROTOCOLO[i].METS.trim()
                this.global_lab107.TABLA_PROTOCOLO[i].TA_SISTOLE = this.global_lab107.TABLA_PROTOCOLO[i].TA_SISTOLE.trim()
                this.global_lab107.TABLA_PROTOCOLO[i].TA_DIASTOLE = this.global_lab107.TABLA_PROTOCOLO[i].TA_DIASTOLE.trim()
                this.global_lab107.TABLA_PROTOCOLO[i].FC = this.global_lab107.TABLA_PROTOCOLO[i].FC.trim()
                this.global_lab107.TABLA_PROTOCOLO[i].TIEMPO_2 = this.global_lab107.TABLA_PROTOCOLO[i].TIEMPO_2.trim()
                this.global_lab107.TABLA_PROTOCOLO[i].RITMO = this.global_lab107.TABLA_PROTOCOLO[i].RITMO.trim()
                this.global_lab107.TABLA_PROTOCOLO[i].SINTOMAS = this.global_lab107.TABLA_PROTOCOLO[i].SINTOMAS.trim()
            }

            this.calculaFCmaxima()

            if (flujo == 'LLENADO' && this.global_lab107.REGISTRO_ESCRITO.trim() == '') {
                this.global_lab107.TABLA_PROTOCOLO[0].VELOCIDAD = '1.7'
                this.global_lab107.TABLA_PROTOCOLO[0].PENDIENTE = '10'
                this.global_lab107.TABLA_PROTOCOLO[0].TIEMPO = '3'

                this.global_lab107.TABLA_PROTOCOLO[1].VELOCIDAD = '2.5'
                this.global_lab107.TABLA_PROTOCOLO[1].PENDIENTE = '12'
                this.global_lab107.TABLA_PROTOCOLO[1].TIEMPO = '6'

                this.global_lab107.TABLA_PROTOCOLO[2].VELOCIDAD = '3.4'
                this.global_lab107.TABLA_PROTOCOLO[2].PENDIENTE = '14'
                this.global_lab107.TABLA_PROTOCOLO[2].TIEMPO = '9'

                this.global_lab107.TABLA_PROTOCOLO[3].VELOCIDAD = '4.2'
                this.global_lab107.TABLA_PROTOCOLO[3].PENDIENTE = '16'
                this.global_lab107.TABLA_PROTOCOLO[3].TIEMPO = '12'

                this.global_lab107.TABLA_PROTOCOLO[4].VELOCIDAD = '5'
                this.global_lab107.TABLA_PROTOCOLO[4].PENDIENTE = '18'
                this.global_lab107.TABLA_PROTOCOLO[4].TIEMPO = '15'

                this.global_lab107.TABLA_PROTOCOLO[5].VELOCIDAD = '5.5'
                this.global_lab107.TABLA_PROTOCOLO[5].PENDIENTE = '20'
                this.global_lab107.TABLA_PROTOCOLO[5].TIEMPO = '18'

                this.global_lab107.TABLA_PROTOCOLO[6].VELOCIDAD = '6'
                this.global_lab107.TABLA_PROTOCOLO[6].PENDIENTE = '22'
                this.global_lab107.TABLA_PROTOCOLO[6].TIEMPO = ''

                this.global_lab107.CONCLUSIONES = 'Prueba de esfuerzo máxima o submáxima al 0 % suficiente no valorativa clínicamente, eléctrica negativa para enfermedad coronaria'
                this.global_lab107.ELECTROCAR_POST = 'Sin cambios en el ST o punto J que sugieran Isquemia'
            }

            for (var i in this.global_lab107.TABLA_PROTOCOLO_POST) {
                var posicion = (parseInt(i) + 1)

                var Post = ''
                switch (i) {
                    case '0': Post = 'Inmediato'
                        break;;
                    case '1': Post = '3 Min'
                        break;;
                    case '2': Post = '6 Min'
                        break;;
                    case '3': Post = '9 Min'
                        break;
                }

                this.global_lab107.TABLA_PROTOCOLO_POST[i]['MINUTOSPOST'] = Post
                this.global_lab107.TABLA_PROTOCOLO_POST[i]['ID_TASISTOLE'] = 'validarPost_TAsist' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO_POST[i]['ID_TADIASTOLE'] = 'validarPost_TAdiast' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO_POST[i]['ID_FC'] = 'validarPost_FC' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO_POST[i]['ID_TIME'] = 'validarPost_Time' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO_POST[i]['ID_RITMO'] = 'validarPost_Ritmo' + posicion + '_lab107'
                this.global_lab107.TABLA_PROTOCOLO_POST[i]['ID_SINTOM'] = 'validarPost_Sintomas' + posicion + '_lab107'

                this.global_lab107.TABLA_PROTOCOLO_POST[i].TA_SISTOLE = this.global_lab107.TABLA_PROTOCOLO_POST[i].TA_SISTOLE.trim()
                this.global_lab107.TABLA_PROTOCOLO_POST[i].TA_DIASTOLE = this.global_lab107.TABLA_PROTOCOLO_POST[i].TA_DIASTOLE.trim()
                this.global_lab107.TABLA_PROTOCOLO_POST[i].FC = this.global_lab107.TABLA_PROTOCOLO_POST[i].FC.trim()

                // this.global_lab107.TABLA_PROTOCOLO_POST[i].TIEMPO_2 = this.global_lab107.TABLA_PROTOCOLO_POST[i].TIEMPO_2.trim()
                this.global_lab107.TABLA_PROTOCOLO_POST[i].RITMO = this.global_lab107.TABLA_PROTOCOLO_POST[i].RITMO.trim()
                this.global_lab107.TABLA_PROTOCOLO_POST[i].SINTOMAS = this.global_lab107.TABLA_PROTOCOLO_POST[i].SINTOMAS.trim()
            }

            this.actualizarGrafica1(9)
            this.actualizarGrafica2()
            this.actualizarGrafica_pie1()
            this.actualizarGrafica_pie2()
            this.actualizarGrafica_pie3()
            this.actualizarGrafica_pie4()

            switch (this.global_lab107.FINALIDAD) {
                case '1': this.DESCRIP_FINALIDAD = 'Prueba diagnostica'
                    break;
                case '2': this.DESCRIP_FINALIDAD = 'Valorativa'
                    break;
                case '3': this.DESCRIP_FINALIDAD = 'Rehabilitacion'
                    break;
                default:
                    this.DESCRIP_FINALIDAD = 'No seleccionada'
                    break;
            }

            this.global_lab107.ID_MEDICO = this.global_lab107.ID_MEDICO.trim()
            this.global_lab107.NOMBRE_MEDICO = this.global_lab107.NOMBRE_MEDICO.trim()

            this.global_lab107.TA_SISTOLE = this.global_lab107.TA_SISTOLE.trim()
            this.global_lab107.TA_DIASTOLE = this.global_lab107.TA_DIASTOLE.trim()
            this.global_lab107.FC = this.global_lab107.FC.trim()

            this.global_lab107.TA_FINAL_SISTOLE = this.global_lab107.TA_FINAL_SISTOLE.trim()
            this.global_lab107.TA_FINAL_DIASTOLE = this.global_lab107.TA_FINAL_DIASTOLE.trim()
            this.global_lab107.FC_FINAL = this.global_lab107.FC_FINAL.trim()

            this.global_lab107.DURACION = this.global_lab107.DURACION.trim()
            this.global_lab107.METS = this.global_lab107.METS.trim()

            this.global_lab107.RESP_PRESORA = this.global_lab107.RESP_PRESORA.trim()
            this.global_lab107.RESP_CRONOTROPICA = this.global_lab107.RESP_CRONOTROPICA.trim()
            this.global_lab107.RESP_FUNCIONAL = this.global_lab107.RESP_FUNCIONAL.trim()
            this.global_lab107.HALLAZ_ARRITMIA = this.global_lab107.HALLAZ_ARRITMIA.trim()

            this.global_lab107.SUGERENCIAS = this.global_lab107.SUGERENCIAS.trim()

            this.calcularDP()

            this.calculaDpFinal()
            this.calculaConsO2CF()

            loader("hide")

            if (flujo == 'CONSULTA') {
                this.CONSULTA = true
                if (LLAVE_RXLAB_GLOBAL.MULTIPLE) this._envioImpresion()
            } else if (flujo == 'LLENADO') {
                this.CONSULTA = false
                this.validarMedico()
            }
        },
        ventanaMedico() {
            var $_this = this

            _ventanaDatos({
                titulo: "Ventana profesionales activos",
                columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO"],
                data: this.profesionales_lab107,
                ancho: '70%',
                callback_esc: function () {
                    document.getElementById("medico_lab107").focus()
                },
                callback: function (data) {
                    $_this.global_lab107.ID_MEDICO = data.IDENTIFICACION.trim()
                    setTimeout(() => _enterInput('#medico_lab107'), 100)
                }
            });

        },
        validarMedico() {
            validarInputs(
                {
                    form: "#validarMedico_lab107",
                    orden: '1'
                },
                () => {
                    CON851P('03', this.validarMedico, this.salir_lab107)
                },
                () => {
                    this.global_lab107.ID_MEDICO = this.global_lab107.ID_MEDICO.trim()

                    var medico = this.profesionales_lab107.find(x => x.IDENTIFICACION == this.global_lab107.ID_MEDICO)

                    if (medico) {

                        var ati = false
                        var esp = false

                        switch (medico.ATIENDE_PROF.trim()) {
                            case '1':
                            case '5':
                                ati = true
                                break;
                        }

                        switch (medico.TAB_ESPEC[0].COD.trim()) {
                            case '701':
                            case '732':
                            case '710':
                            case '360':
                            case '602':
                            case '781':
                            case '387':
                            case '120':
                            case '122':
                            case '302':
                                esp = true
                                break;
                        }

                        if (ati && esp) {
                            this.global_lab107.REG_MEDICO = medico.REG_MEDICO
                            this.global_lab107.NOMBRE_MEDICO = medico.NOMBRE
                            this.validarPeso()
                        } else {
                            CON851('9X', '9X', null, 'error', 'error')
                            this.validarMedico()
                        }

                    } else {
                        CON851('01', '01', null, 'error', 'error');
                        this.validarMedico()
                    }
                }
            )
        },
        validarPeso() {
            validarInputs(
                {
                    form: "#validarPeso_lab107",
                    orden: '1'
                }, () => {
                    this.validarMedico()
                },
                () => {
                    this.global_lab107.PESO = this.Maskpeso.resolve(this.global_lab107.PESO)
                    this.validarTalla()
                }
            )
        },
        validarTalla() {
            validarInputs(
                {
                    form: "#validarTalla_lab107",
                    orden: '1'
                }, () => {
                    this.validarPeso()
                },
                () => {
                    this.popupFinalidad()
                }
            )
        },
        popupFinalidad() {
            var $_this = this
            var opciones = [{ COD: '1', DESCRIP: 'Prueba diagnostica' }, { COD: '2', DESCRIP: 'Valorativa' }, { COD: '3', DESCRIP: 'Rehabilitacion' }]

            POPUP({
                array: opciones,
                titulo: 'Finalidad de la prueba?:',
                indices: [
                    { id: 'COD', label: 'DESCRIP' }
                ],
                callback_f: () => {
                    this.validarTalla()
                },
                seleccion: $_this.global_lab107.FINALIDAD.trim() == '' ? 1 : $_this.global_lab107.FINALIDAD
            }, function (data) {
                $_this.global_lab107.FINALIDAD = data.COD
                $_this.DESCRIP_FINALIDAD = data.DESCRIP
                $_this.validarHipertension()
            })
        },
        validarHipertension() {
            validarInputs(
                {
                    form: "#validarHipertension_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(1)
                }, () => {
                    this.popupFinalidad()
                },
                () => {
                    this.global_lab107.HIPERTENSION = this.global_lab107.HIPERTENSION.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarDiabetes()
                }
            )
        },
        validarDiabetes() {
            validarInputs(
                {
                    form: "#validarDiabetes_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(1)
                }, () => {
                    this.validarHipertension()
                },
                () => {
                    this.global_lab107.DIABETES = this.global_lab107.DIABETES.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarEnferCoronaria()
                }
            )
        },
        validarEnferCoronaria() {
            validarInputs(
                {
                    form: "#validarEnferCoronaria_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(1)
                }, () => {
                    this.validarDiabetes()
                },
                () => {
                    this.global_lab107.ENFER_CORONARIA = this.global_lab107.ENFER_CORONARIA.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarDislipidemia()
                }
            )
        },
        validarDislipidemia() {
            validarInputs(
                {
                    form: "#validarDislipidemia_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(1)
                }, () => {
                    this.validarEnferCoronaria()
                },
                () => {
                    this.global_lab107.DISLIPIDEMIA = this.global_lab107.DISLIPIDEMIA.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarFumador()
                }
            )
        },
        validarFumador() {
            validarInputs(
                {
                    form: "#validarFumador_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(1)
                }, () => {
                    this.validarDislipidemia()
                },
                () => {
                    this.global_lab107.FUMADOR = this.global_lab107.FUMADOR.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarSedentarismo()
                }
            )
        },
        validarSedentarismo() {
            validarInputs(
                {
                    form: "#validarSedentarismo_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(1)
                }, () => {
                    this.validarFumador()
                },
                () => {
                    this.global_lab107.SEDENTARISMO = this.global_lab107.SEDENTARISMO.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarStress()
                }
            )
        },
        validarStress() {
            validarInputs(
                {
                    form: "#validarStress_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(1)
                }, () => {
                    this.validarSedentarismo()
                },
                () => {
                    this.global_lab107.STRESS = this.global_lab107.STRESS.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarObesidad()
                }
            )
        },
        validarObesidad() {
            validarInputs(
                {
                    form: "#validarObesidad_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(1)
                }, () => {
                    this.validarStress()
                },
                () => {
                    this.global_lab107.OBESIDAD = this.global_lab107.OBESIDAD.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarFamiliares()
                }
            )
        },
        validarFamiliares() {
            validarInputs(
                {
                    form: "#validarFamiliares_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(1)
                }, () => {
                    this.validarObesidad()
                },
                () => {
                    this.global_lab107.FAMILIARES = this.global_lab107.FAMILIARES.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarOtros()
                }
            )
        },
        validarOtros() {
            validarInputs(
                {
                    form: "#validarOtros_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(1)
                }, () => {
                    this.validarFamiliares()
                },
                () => {
                    this.global_lab107.OTROS = this.global_lab107.OTROS.toUpperCase().trim() != 'S' ? "N" : "S"

                    if (this.global_lab107.OTROS == 'S') {
                        this.validarTextoOtros()
                    } else {
                        this.global_lab107.OTROS_TEXT = ''
                        this.validarMedicamentos()
                    }
                }
            )
        },
        validarTextoOtros() {
            validarInputs(
                {
                    form: "#validarCual_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(1)
                }, () => {
                    this.validarOtros()
                },
                () => {
                    this.global_lab107.OTROS_TEXT = this.global_lab107.OTROS_TEXT.trim()
                    this.validarMedicamentos()
                }
            )
        },
        validarMedicamentos() {
            validarInputs(
                {
                    form: "#validarMedicamentos_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(2)
                }, () => {
                    this.validarOtros()
                },
                () => {
                    this.global_lab107.MEDICAMENTOS = this.global_lab107.MEDICAMENTOS.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

                    this.validarDatosClinicos()
                }
            )
        },
        validarDatosClinicos() {
            validarInputs(
                {
                    form: "#validarDatosClinicos_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(3)
                }, () => {
                    this.validarMedicamentos()
                },
                () => {
                    this.global_lab107.DATOS_CLINICOS = this.global_lab107.DATOS_CLINICOS.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

                    this.validarTensionArterial()
                }
            )
        },
        validarTensionArterial() {
            validarInputs(
                {
                    form: "#validarTA_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(4)
                }, () => {
                    this.validarDatosClinicos()
                },
                () => {
                    this.validarFrecuenciaCardiaca()
                }
            )
        },
        validarFrecuenciaCardiaca() {
            validarInputs(
                {
                    form: "#validarFC_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(5)
                }, () => {
                    this.validarTensionArterial()
                },
                () => {
                    this.validarElectrocarBasal()
                }
            )
        },
        validarElectrocarBasal() {
            validarInputs(
                {
                    form: "#validarEcocarBasal_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(6)
                }, () => {
                    this.validarFrecuenciaCardiaca()
                },
                () => {
                    this.global_lab107.ELECTROCAR_BASAL = this.global_lab107.ELECTROCAR_BASAL.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

                    this.validarElectrocarDurante()
                }
            )
        },
        validarElectrocarDurante() {
            validarInputs(
                {
                    form: "#validarEcocarDurante_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(7)
                }, () => {
                    this.validarElectrocarBasal()
                },
                () => {
                    this.global_lab107.ELECTROCAR_DURA = this.global_lab107.ELECTROCAR_DURA.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

                    this.validarTabla_Protocolo(1, 1)
                }
            )
        },
        validarTabla_Protocolo(a, b) {
            var nombre = ''
            switch (b) {
                case 1:
                    nombre = 'validarVel'
                    break;
                case 2:
                    nombre = 'validarPend'
                    break;
                case 3:
                    nombre = 'validarTime'
                    break;
                case 4:
                    nombre = 'validarVo2'
                    break;
                case 5:
                    nombre = 'validarMets'
                    break;
                case 6:
                    nombre = 'validarTAsist'
                    break;
                case 7:
                    nombre = 'validarTAdiast'
                    break;
                case 8:
                    nombre = 'validarFC'
                    break;
                case 9:
                    nombre = 'validarTime_2'
                    break;
                case 10:
                    nombre = 'validarRitmo'
                    break;
                case 11:
                    nombre = 'validarSintomas'
                    break;
            }

            validarInputs(
                {
                    form: "#" + nombre + a + "_lab107",
                    orden: '1',
                    event_f3: () => this.validarTablaPost_Protocolo(1, 1),
                    event_f4: () => this.validarConclusiones(8, a, b),
                    event_flecha_arriba: () => {
                        if (a != 1) {
                            this.validarTabla_Protocolo(parseInt(a) - 1, b)
                        } else {
                            this.validarTabla_Protocolo(a, b)
                        }
                    },
                    event_flecha_abajo: () => {
                        if (a != 7) {
                            this.validarTabla_Protocolo(parseInt(a) + 1, b)
                        } else {
                            this.validarTabla_Protocolo(a, b)
                        }
                    }
                },
                () => {
                    if (b == 1) {

                        if (a == 1) {
                            this.validarElectrocarDurante()
                        } else {
                            this.validarTabla_Protocolo(parseInt(a) - 1, 1)
                        }

                    } else {
                        this.validarTabla_Protocolo(a, parseInt(b) - 1)
                    }
                },
                () => {
                    var indicador = parseInt(a) - 1

                    switch (b) {
                        case 1:
                            this.global_lab107.TABLA_PROTOCOLO[indicador].VELOCIDAD = this.MaskTabla.resolve(this.global_lab107.TABLA_PROTOCOLO[indicador].VELOCIDAD)
                            break;
                        case 4:
                            this.global_lab107.TABLA_PROTOCOLO[indicador].VO2 = this.MaskTabla.resolve(this.global_lab107.TABLA_PROTOCOLO[indicador].VO2)
                            break;
                    }

                    if (b == 11) {

                        this.actualizarGrafica1(a)
                        this.actualizarGrafica2()
                        if (a == 7) {
                            this.validarTablaPost_Protocolo(1, 1)
                        } else {
                            this.validarTabla_Protocolo(parseInt(a) + 1, 1)
                        }

                    } else {
                        this.validarTabla_Protocolo(a, parseInt(b) + 1)
                    }

                }
            )
        },
        validarTablaPost_Protocolo(a, b) {
            var nombre = ''
            switch (b) {
                case 1:
                    nombre = 'validarPost_TAsist'
                    break;
                case 2:
                    nombre = 'validarPost_TAdiast'
                    break;
                case 3:
                    nombre = 'validarPost_FC'
                    break;
                case 4:
                    nombre = 'validarPost_Ritmo'
                    break;
                case 5:
                    nombre = 'validarPost_Sintomas'
                    break;
            }

            validarInputs(
                {
                    form: "#" + nombre + a + "_lab107",
                    orden: '1',
                    event_f3: () => this.validarElectrocarPostStress(),
                    event_f4: () => this.validarConclusiones(9, a, b),
                    event_flecha_arriba: () => {
                        if (a != 1) {
                            this.validarTablaPost_Protocolo(parseInt(a) - 1, b)
                        } else {
                            this.validarTablaPost_Protocolo(a, b)
                        }
                    },
                    event_flecha_abajo: () => {
                        if (a != 4) {
                            this.validarTablaPost_Protocolo(parseInt(a) + 1, b)
                        } else {
                            this.validarTablaPost_Protocolo(a, b)
                        }
                    }
                },
                () => {
                    if (b == 1) {

                        if (a == 1) {
                            this.validarTabla_Protocolo(1, 1)
                        } else {
                            this.validarTablaPost_Protocolo(parseInt(a) - 1, 1)
                        }

                    } else {
                        this.validarTablaPost_Protocolo(a, parseInt(b) - 1)
                    }
                },
                () => {
                    if (b == 5) {

                        switch (a) {
                            case 1:
                                this.actualizarGrafica_pie1()
                                break;
                            case 2:
                                this.actualizarGrafica_pie2()
                                break;
                            case 3:
                                this.actualizarGrafica_pie3()
                                break;
                            case 4:
                                this.actualizarGrafica_pie4()
                                break;
                        }

                        if (a == 4) {
                            this.validarElectrocarPostStress()
                        } else {
                            this.validarTablaPost_Protocolo(parseInt(a) + 1, 1)
                        }

                    } else {
                        this.validarTablaPost_Protocolo(a, parseInt(b) + 1)
                    }

                }
            )
        },
        validarElectrocarPostStress() {
            validarInputs(
                {
                    form: "#validarEcocarPost_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(10)
                }, () => {
                    this.validarTablaPost_Protocolo(1, 1)
                },
                () => {
                    this.global_lab107.ELECTROCAR_POST = this.global_lab107.ELECTROCAR_POST.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

                    this.validarTensionArterialFinal()
                }
            )
        },
        validarTensionArterialFinal() {
            validarInputs(
                {
                    form: "#validarTAFinal_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(11)
                }, () => {
                    this.validarElectrocarPostStress()
                },
                () => {
                    this.validarFrecuenciaCardiacaFinal()
                }
            )
        },
        validarFrecuenciaCardiacaFinal() {
            validarInputs(
                {
                    form: "#validarFCFinal_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(12)
                }, () => {
                    this.validarTensionArterialFinal()
                },
                () => {
                    var sub = (parseInt(this.global_lab107.FC) / parseInt(this.global_lab107.FC_FINAL)) * 100
                    var text = sub.toFixed(1).toString() + '%'
                    if (sub) this.global_lab107.CONCLUSIONES = this.global_lab107.CONCLUSIONES.replace('0 %', text).trim()
                    this.validarDuracionPrueba()
                }
            )
        },
        validarDuracionPrueba() {
            validarInputs(
                {
                    form: "#validarDuracion_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(13)
                }, () => {
                    this.validarFrecuenciaCardiacaFinal()
                },
                () => {
                    this.validarMets()
                }
            )
        },
        validarMets() {
            validarInputs(
                {
                    form: "#validarMets_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(14)
                }, () => {
                    this.validarDuracionPrueba()
                },
                () => {
                    if (parseInt(this.global_lab107.METS) < 1 || parseInt(this.global_lab107.METS) > 16) {
                        CON851('01', 'DATO FUERA DE RANGO!', null, 'error', 'error');
                        this.validarMets()
                    } else {
                        this.validarDolorPrecordial()
                    }
                }
            )
        },
        validarDolorPrecordial() {
            validarInputs(
                {
                    form: "#validarDolorPrecor_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarMets()
                },
                () => {
                    this.global_lab107.DOLOR_PRECORDIAL = this.global_lab107.DOLOR_PRECORDIAL.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarMareo()
                }
            )
        },
        validarMareo() {
            validarInputs(
                {
                    form: "#validarMareo_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarDolorPrecordial()
                },
                () => {
                    this.global_lab107.MAREO = this.global_lab107.MAREO.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarAnomalias()
                }
            )
        },
        validarAnomalias() {
            validarInputs(
                {
                    form: "#validarAnomaliasTa_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarMareo()
                },
                () => {
                    this.global_lab107.ANOMALIAS_TA = this.global_lab107.ANOMALIAS_TA.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarDisnea()
                }
            )
        },
        validarDisnea() {
            validarInputs(
                {
                    form: "#validarDisnea_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarAnomalias()
                },
                () => {
                    this.global_lab107.DISNEA = this.global_lab107.DISNEA.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarSincope()
                }
            )
        },
        validarSincope() {
            validarInputs(
                {
                    form: "#validarSincope_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarDisnea()
                },
                () => {
                    this.global_lab107.SINCOPE = this.global_lab107.SINCOPE.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarMotivosTecnicos()
                }
            )
        },
        validarMotivosTecnicos() {
            validarInputs(
                {
                    form: "#validarMotivosTec_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarSincope()
                },
                () => {
                    this.global_lab107.MOTIVOS_TECNICOS = this.global_lab107.MOTIVOS_TECNICOS.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarFatigaGeneral()
                }
            )
        },
        validarFatigaGeneral() {
            validarInputs(
                {
                    form: "#validarFatigaGeneral_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarMotivosTecnicos()
                },
                () => {
                    this.global_lab107.FATIGA_GENERAL = this.global_lab107.FATIGA_GENERAL.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarAlteracionSimpa()
                }
            )
        },
        validarAlteracionSimpa() {
            validarInputs(
                {
                    form: "#validarAlterSimp_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarFatigaGeneral()
                },
                () => {
                    this.global_lab107.ALTERACION_SIMP = this.global_lab107.ALTERACION_SIMP.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarFaltaColabor()
                }
            )
        },
        validarFaltaColabor() {
            validarInputs(
                {
                    form: "#validarFaltaColabor_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarAlteracionSimpa()
                },
                () => {
                    this.global_lab107.FALTA_COLABORACION = this.global_lab107.FALTA_COLABORACION.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarClaudicacion()
                }
            )
        },
        validarClaudicacion() {
            validarInputs(
                {
                    form: "#validarClaudicacion_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarFaltaColabor()
                },
                () => {
                    this.global_lab107.CLAUDICACION = this.global_lab107.CLAUDICACION.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarArritmias()
                }
            )
        },
        validarArritmias() {
            validarInputs(
                {
                    form: "#validarArritmias_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarClaudicacion()
                },
                () => {
                    this.global_lab107.ARRITMIAS = this.global_lab107.ARRITMIAS.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarAlcanzoFCMAX()
                }
            )
        },
        validarAlcanzoFCMAX() {
            validarInputs(
                {
                    form: "#validarAlcanzoFCMAX_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(15)
                }, () => {
                    this.validarArritmias()
                },
                () => {
                    this.global_lab107.ALCANZO_FC = this.global_lab107.ALCANZO_FC.toUpperCase().trim() != 'S' ? "N" : "S"
                    this.validarRespPresora()
                }
            )
        },
        validarRespPresora() {
            validarInputs(
                {
                    form: "#validarRespPresora_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(16)
                }, () => {
                    this.validarAlcanzoFCMAX()
                },
                () => {
                    this.validarRespCronotropica()
                }
            )
        },
        validarRespCronotropica() {
            validarInputs(
                {
                    form: "#validarRespCronotropica_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(17)
                }, () => {
                    this.validarRespPresora()
                },
                () => {
                    this.validarRespFuncional()
                }
            )
        },
        validarRespFuncional() {
            validarInputs(
                {
                    form: "#validarRespFuncional_lab107",
                    orden: '1',
                    event_f4: () => this.validarConclusiones(18)
                }, () => {
                    this.validarRespCronotropica()
                },
                () => {
                    this.validarHallazArritmias()
                }
            )
        },
        validarHallazArritmias() {
            validarInputs(
                {
                    form: "#validarHallazArritmias_lab107",
                    orden: '1'
                }, () => {
                    this.validarRespFuncional()
                },
                () => {
                    this.validarConclusiones()
                }
            )
        },
        validarConclusiones(flujo, a, b) {
            document.getElementById('validarConclusiones_lab107').classList.add('active-text-area')
            $(".active-text-area").get(0).scrollIntoView(true);
            $('#validarConclusiones_lab107').removeClass('active-text-area')

            validarInputs(
                {
                    form: "#validarConclusiones_lab107",
                    orden: '1'
                }, () => {
                    switch (flujo) {
                        case 1: this.validarHipertension()
                            break;
                        case 2:
                            document.getElementById('validarMedicamentos_lab107').classList.add('active-text-area')
                            $(".active-text-area").get(0).scrollIntoView(true);
                            this.validarMedicamentos()
                            $('#validarMedicamentos_lab107').removeClass('active-text-area')
                            break;
                        case 3:
                            document.getElementById('validarDatosClinicos_lab107').classList.add('active-text-area')
                            $(".active-text-area").get(0).scrollIntoView(true);
                            this.validarDatosClinicos()
                            $('#validarDatosClinicos_lab107').removeClass('active-text-area')
                            break;
                        case 4: this.validarTensionArterial()
                            break;
                        case 5: this.validarFrecuenciaCardiaca()
                            break;
                        case 6:
                            document.getElementById('validarEcocarBasal_lab107').classList.add('active-text-area')
                            $(".active-text-area").get(0).scrollIntoView(true);
                            this.validarElectrocarBasal()
                            $('#validarEcocarBasal_lab107').removeClass('active-text-area')
                            break;
                        case 7:
                            document.getElementById('validarEcocarDurante_lab107').classList.add('active-text-area')
                            $(".active-text-area").get(0).scrollIntoView(true);
                            this.validarElectrocarDurante()
                            $('#validarEcocarDurante_lab107').removeClass('active-text-area')
                            break;
                        case 8: this.validarTabla_Protocolo(a, b)
                            break;
                        case 9: this.validarTablaPost_Protocolo(a, b)
                            break;
                        case 10: this.validarElectrocarPostStress()
                            break;
                        case 11: this.validarTensionArterialFinal()
                            break;
                        case 12: this.validarFrecuenciaCardiacaFinal()
                            break;
                        case 13: this.validarDuracionPrueba()
                            break;
                        case 14: this.validarMets()
                            break;
                        case 15: this.validarDolorPrecordial()
                            break;
                        case 16: this.validarRespPresora()
                            break;
                        case 17: this.validarRespCronotropica()
                            break;
                        case 18: this.validarRespFuncional()
                            break;
                        default: this.validarHallazArritmias()
                            break;
                    }
                },
                () => {
                    this.global_lab107.CONCLUSIONES = this.global_lab107.CONCLUSIONES.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

                    this.validarSugerencias()
                    // this.validarPlan()
                }
            )
        },
        // validarPlan() {
        //     validarInputs(
        //         {
        //             form: "#validarPlan_lab107",
        //             orden: '1'
        //         }, () => {
        //             this.validarConclusiones()
        //         },
        //         () => {
        //             this.global_lab107.PLAN = this.global_lab107.PLAN.replace(/\&/g, " ").trim()
        //             this.global_lab107.PLAN = this.global_lab107.PLAN.replace(/\"/g, " ").trim()
        //             this.global_lab107.PLAN = this.global_lab107.PLAN.replace(/\{/g, " ").trim()
        //             this.global_lab107.PLAN = this.global_lab107.PLAN.replace(/\}/g, " ").trim()
        //             this.global_lab107.PLAN = this.global_lab107.PLAN.replace(/\[/g, " ").trim()
        //             this.global_lab107.PLAN = this.global_lab107.PLAN.replace(/\]/g, " ").trim()
        //             this.global_lab107.PLAN = this.global_lab107.PLAN.replace(/\*/g, " ").trim()

        //             this.validarTabla_Protocolo(1, 1)
        //         }
        //     )
        // },
        validarSugerencias() {
            validarInputs(
                {
                    form: "#validarSugerencias_lab107",
                    orden: '1'
                }, () => {
                    this.validarConclusiones()
                },
                () => {
                    CON851P('Adjuntar archivos?', () => CON851P('01', this.validarSugerencias, this._grabardatos_lab107), this.ventanaAdjuntarArchivos)
                }
            )
        },
        ventanaAdjuntarArchivos() {
            var $_this = this
            $('[data-bb-handler="main"]').click()

            setTimeout(() => {
                var fuente = '<div>' +
                    '<div class="col-md-12">' +
                    '<div class="portlet light no-padding">' +
                    '<div class="portlet-body no-padding">' +
                    '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
                    '<div class="col-md-12 col-sm-12 col-xs-12" style="display: flex ;justify-content: space-between">' +

                    '<div class="col-md-2">' +
                    '<button id="salir_lab107" class="col-md-12 btn" type="button" style="color: white; background-color: #da2c2c; border-color: #da2c2c">Salir</button>' +
                    '</div>' +

                    '<div class="col-md-5">' +
                    '<label class="col-md-12 btn btn-default btn-file">' +
                    '<input type="file" multiple id="archivos_lab107" accept=".dcm, application/pdf,image/jpeg,image/png,image/jpg,video/mpeg,video/mp4,video/x-ms-wmv,application/dicom,image/dicom"/>' +
                    '</label>' +
                    '</div>' +

                    '<div class="col-md-2">' +
                    '<button id="enviarArchivos_lab107" class="col-md-12 btn btn-primary" type="button">Adjuntar</button>' +
                    '</div>' +

                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div style="clear:both;"></div>' +
                    '</div>'

                var dialogo = bootbox.dialog({
                    title: 'Adjuntar archivos',
                    message: fuente,
                    closeButton: false,
                    buttons: {
                        main: {
                            label: "Aceptar",
                            className: "blue hidden",
                            callback: function () {

                            }
                        }
                    },
                });

                dialogo.on('shown.bs.modal', function (e) {
                    $('.modal-content').css({ 'width': '900px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
                    document.getElementById('salir_lab107').onclick = () => {
                        $('[data-bb-handler="main"]').click()
                        $_this.validarSugerencias()
                    }
                    document.getElementById('enviarArchivos_lab107').onclick = () => $_this.enviarArchivos_lab107()
                });
            }, 500);

        },
        enviarArchivos_lab107() {
            var el = document.getElementById('archivos_lab107')
            var archivos = el.files

            if (archivos.length < 1) {
                CON851('', 'No se han escogido archivos', null, 'warning', 'Advertencia');
            } else {
                loader('show')
                var nombreArch = this.global_lab107.SUC + this.global_lab107.CL + this.global_lab107.COMPROB + this.global_lab107.CUP + this.global_lab107.ITEM

                var envio = new FormData()
                envio.append('nombre', nombreArch)

                for (let i = 0; i < archivos.length; i++) envio.append(i, archivos[i])
                console.log(envio)

                var $_this = this
                fetch(get_url("APP/inc/AdjuntaArchivos.php"), {
                    method: 'POST',
                    body: envio,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        loader('hide')
                        if (data.code == 0) {
                            console.log('Archivos subidos:', data.msj.correcto)
                            for (var i in data.msj.correcto) {
                                $_this.global_lab107.ADJUNTOS[i] = data.msj.correcto[i]
                            }
                            $('[data-bb-handler="main"]').click()
                            console.log('Archivos error:', data.msj.error)
                            setTimeout($_this._grabardatos_lab107, 500)
                        } else {
                            CON851('', 'Ha ocurrido un error subiendo archivos', null, 'error', 'Error');
                            console.error('Ha ocurrido un error:', data.msj)
                            $('[data-bb-handler="main"]').click()
                            $_This.validarSugerencias()
                        }
                    })
            }
        },
        _grabardatos_lab107() {
            var $_this = this
            loader('show')

            var datos_envio_lab107 = datosEnvio();
            datos_envio_lab107 += this.global_lab107.LLAVE
            datos_envio_lab107 += '|'
            datos_envio_lab107 += cerosIzq(this.global_lab107.ID_MEDICO, 10)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += this.global_lab107.FINALIDAD
            datos_envio_lab107 += '|'
            datos_envio_lab107 += this.global_lab107.PESO
            datos_envio_lab107 += '|'
            datos_envio_lab107 += cerosIzq(this.global_lab107.TALLA, 3)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += cerosIzq(this.global_lab107.TA_SISTOLE, 3)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += cerosIzq(this.global_lab107.TA_DIASTOLE, 3)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += cerosIzq(this.global_lab107.FC, 3)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += cerosIzq(this.global_lab107.TA_FINAL_SISTOLE, 3)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += cerosIzq(this.global_lab107.TA_FINAL_DIASTOLE, 3)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += cerosIzq(this.global_lab107.FC_FINAL, 3)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += cerosIzq(this.global_lab107.DURACION, 2)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += cerosIzq(this.global_lab107.METS, 2)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += espaciosDer(this.global_lab107.RESP_PRESORA, 50)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += espaciosDer(this.global_lab107.RESP_CRONOTROPICA, 50)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += espaciosDer(this.global_lab107.RESP_FUNCIONAL, 50)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += espaciosDer(this.global_lab107.HALLAZ_ARRITMIA, 80)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += espaciosDer(this.global_lab107.SUGERENCIAS, 100)
            datos_envio_lab107 += '|'
            datos_envio_lab107 += moment().format("YYYYMMDD")
            datos_envio_lab107 += '|'
            datos_envio_lab107 += moment().format("HHmm")
            datos_envio_lab107 += '|'
            datos_envio_lab107 += localStorage.Usuario
            datos_envio_lab107 += '|'

            var data = {};
            data['datosh'] = datos_envio_lab107

            this.global_lab107.TABLA_PROTOCOLO.forEach(function (item, i) {
                var posicion = i + 1;

                var datos_tabla = item.VELOCIDAD
                datos_tabla += '|'
                datos_tabla += cerosIzq(item.PENDIENTE, 2)
                datos_tabla += '|'
                datos_tabla += cerosIzq(item.TIEMPO, 2)
                datos_tabla += '|'
                datos_tabla += item.VO2
                datos_tabla += '|'
                datos_tabla += item.METS
                datos_tabla += '|'
                datos_tabla += cerosIzq(item.TA_SISTOLE, 3)
                datos_tabla += '|'
                datos_tabla += cerosIzq(item.TA_DIASTOLE, 3)
                datos_tabla += '|'
                datos_tabla += cerosIzq(item.FC, 3)
                datos_tabla += '|'
                datos_tabla += cerosIzq(item.TIEMPO_2, 2)
                datos_tabla += '|'
                datos_tabla += cerosIzq(item.RITMO, 2)
                datos_tabla += '|'
                datos_tabla += espaciosDer(item.SINTOMAS, 20)
                datos_tabla += '|'

                data["TAB-PROTO-" + posicion.toString().padStart(3, "0")] = datos_tabla
            })

            this.global_lab107.TABLA_PROTOCOLO_POST.forEach(function (item, i) {
                var posicion = i + 1;

                var datos_tabla = cerosIzq(item.TA_SISTOLE, 3)
                datos_tabla += '|'
                datos_tabla += cerosIzq(item.TA_DIASTOLE, 3)
                datos_tabla += '|'
                datos_tabla += cerosIzq(item.FC, 3)
                datos_tabla += '|'
                datos_tabla += cerosIzq(item.RITMO, 2)
                datos_tabla += '|'
                datos_tabla += espaciosDer(item.SINTOMAS, 20)
                datos_tabla += '|'

                data["TAB-POST-" + posicion.toString().padStart(3, "0")] = datos_tabla
            })

            var motivos_Susp = this.global_lab107.DOLOR_PRECORDIAL
            motivos_Susp += '|'
            motivos_Susp += this.global_lab107.DISNEA
            motivos_Susp += '|'
            motivos_Susp += this.global_lab107.FATIGA_GENERAL
            motivos_Susp += '|'
            motivos_Susp += this.global_lab107.CLAUDICACION
            motivos_Susp += '|'
            motivos_Susp += this.global_lab107.MAREO
            motivos_Susp += '|'
            motivos_Susp += this.global_lab107.SINCOPE
            motivos_Susp += '|'
            motivos_Susp += this.global_lab107.ALTERACION_SIMP
            motivos_Susp += '|'
            motivos_Susp += this.global_lab107.ARRITMIAS
            motivos_Susp += '|'
            motivos_Susp += this.global_lab107.ANOMALIAS_TA
            motivos_Susp += '|'
            motivos_Susp += this.global_lab107.MOTIVOS_TECNICOS
            motivos_Susp += '|'
            motivos_Susp += this.global_lab107.FALTA_COLABORACION
            motivos_Susp += '|'
            motivos_Susp += this.global_lab107.ALCANZO_FC
            motivos_Susp += '|'

            data['SUSPENSION'] = motivos_Susp

            var factor_riesgo = this.global_lab107.HIPERTENSION
            factor_riesgo += '|'
            factor_riesgo += this.global_lab107.DISLIPIDEMIA
            factor_riesgo += '|'
            factor_riesgo += this.global_lab107.STRESS
            factor_riesgo += '|'
            factor_riesgo += this.global_lab107.DIABETES
            factor_riesgo += '|'
            factor_riesgo += this.global_lab107.FUMADOR
            factor_riesgo += '|'
            factor_riesgo += this.global_lab107.OBESIDAD
            factor_riesgo += '|'
            factor_riesgo += this.global_lab107.ENFER_CORONARIA
            factor_riesgo += '|'
            factor_riesgo += this.global_lab107.SEDENTARISMO
            factor_riesgo += '|'
            factor_riesgo += this.global_lab107.FAMILIARES
            factor_riesgo += '|'
            factor_riesgo += this.global_lab107.OTROS
            factor_riesgo += '|'
            factor_riesgo += this.global_lab107.OTROS_TEXT
            factor_riesgo += '|'

            data['FACTOR_RIESGO'] = factor_riesgo

            data['MEDICAMENTOS'] = this.global_lab107.MEDICAMENTOS.replace(/(\r\n|\n|\r)/gm, "&");
            data['DATO_CLINICO'] = this.global_lab107.DATOS_CLINICOS.replace(/(\r\n|\n|\r)/gm, "&");
            data['ELECTRO_BASAL'] = this.global_lab107.ELECTROCAR_BASAL.replace(/(\r\n|\n|\r)/gm, "&");
            data['ELECTRO_DURA'] = this.global_lab107.ELECTROCAR_DURA.replace(/(\r\n|\n|\r)/gm, "&");
            data['ELECTRO_POST'] = this.global_lab107.ELECTROCAR_POST.replace(/(\r\n|\n|\r)/gm, "&");
            data['PLAN'] = this.global_lab107.PLAN.replace(/(\r\n|\n|\r)/gm, "&");

            var posicion = 0
            var contadorLin = 0
            var contadorTotal = 0
            var linea = ''
            var maximo = 90

            this.global_lab107.CONCLUSIONES = this.global_lab107.CONCLUSIONES.replace(/(\r\n|\n|\r)/gm, "&");

            this.global_lab107.CONCLUSIONES.split('').forEach(function (item, i) {
                contadorTotal = i + 1
                contadorLin = contadorLin + 1

                switch (item) {
                    case 'á':
                    case 'é':
                    case 'í':
                    case 'ó':
                    case 'ú':
                    case 'Á':
                    case 'É':
                    case 'Í':
                    case 'Ó':
                    case 'Ú':
                    case 'ñ':
                    case 'Ñ':
                    case '!':
                    case '"':
                    case '#':
                    case '$':
                    case '%':
                    case '/':
                    case '(':
                    case ')':
                    case '=':
                    case '?':
                    case '*':
                    case '+':
                    case '-':
                    case '@':
                    case '>':
                    case '<':
                        maximo = maximo + 1
                        break;
                }
                linea += item

                if (contadorLin == maximo || $_this.global_lab107.CONCLUSIONES.length == contadorTotal) {
                    posicion = posicion + 1

                    data["CON-" + posicion.toString().padStart(3, "0")] = linea
                    contadorLin = 0
                    linea = ''
                    maximo = 90
                }
            })

            var archivos = ''
            this.global_lab107.ADJUNTOS.forEach(function (item, i) {
                archivos += espaciosDer(item, 30)
                archivos += '|'
            })

            data['adjuntos'] = archivos
            console.log(data)

            let URL = get_url("APP/LAB/LAB107.DLL");

            postData(data, URL)
                .then((llegada) => {
                    loader('hide')
                    CON851('', 'Resultado guardado correctamente!', null, 'success', 'Exitoso');
                    setTimeout($_this.preguntaImprimir_lab107, 300)
                })
                .catch(err => {
                    loader('hide')
                    console.error(err)
                    CON851('', err, null, 'error', 'Error');
                    _toggleNav()
                });
        },
        preguntaImprimir_lab107() {
            CON851P('00', () => this.salir_lab107(), () => {
                this._envioImpresion()
            })
        },
        actualizarGrafica1(a) {
            if (this.grafica1) this.grafica1.destroy()
            switch (a) {
                case 1:
                    this.etapa1 = [this.global_lab107.TABLA_PROTOCOLO[0].METS, this.global_lab107.TABLA_PROTOCOLO[0].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[0].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[0].FC]
                    break;
                case 2:
                    this.etapa2 = [this.global_lab107.TABLA_PROTOCOLO[1].METS, this.global_lab107.TABLA_PROTOCOLO[1].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[1].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[1].FC]
                    break;
                case 3:
                    this.etapa3 = [this.global_lab107.TABLA_PROTOCOLO[2].METS, this.global_lab107.TABLA_PROTOCOLO[2].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[2].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[2].FC]
                    break;
                case 4:
                    this.etapa4 = [this.global_lab107.TABLA_PROTOCOLO[3].METS, this.global_lab107.TABLA_PROTOCOLO[3].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[3].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[3].FC]
                    break;
                case 5:
                    this.etapa5 = [this.global_lab107.TABLA_PROTOCOLO[4].METS, this.global_lab107.TABLA_PROTOCOLO[4].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[4].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[4].FC]
                    break;
                case 6:
                    this.etapa6 = [this.global_lab107.TABLA_PROTOCOLO[5].METS, this.global_lab107.TABLA_PROTOCOLO[5].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[5].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[5].FC]
                    break;
                case 7:
                    this.etapa7 = [this.global_lab107.TABLA_PROTOCOLO[6].METS, this.global_lab107.TABLA_PROTOCOLO[6].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[6].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[6].FC]
                    break;
                case 9:
                    this.etapa1 = [this.global_lab107.TABLA_PROTOCOLO[0].METS, this.global_lab107.TABLA_PROTOCOLO[0].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[0].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[0].FC]
                    this.etapa2 = [this.global_lab107.TABLA_PROTOCOLO[1].METS, this.global_lab107.TABLA_PROTOCOLO[1].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[1].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[1].FC]
                    this.etapa3 = [this.global_lab107.TABLA_PROTOCOLO[2].METS, this.global_lab107.TABLA_PROTOCOLO[2].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[2].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[2].FC]
                    this.etapa4 = [this.global_lab107.TABLA_PROTOCOLO[3].METS, this.global_lab107.TABLA_PROTOCOLO[3].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[3].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[3].FC]
                    this.etapa5 = [this.global_lab107.TABLA_PROTOCOLO[4].METS, this.global_lab107.TABLA_PROTOCOLO[4].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[4].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[4].FC]
                    this.etapa6 = [this.global_lab107.TABLA_PROTOCOLO[5].METS, this.global_lab107.TABLA_PROTOCOLO[5].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[5].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[5].FC]
                    this.etapa7 = [this.global_lab107.TABLA_PROTOCOLO[6].METS, this.global_lab107.TABLA_PROTOCOLO[6].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[6].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO[6].FC]
                    break;
            }

            this.grafica1 = new Chart(document.getElementById('tablaProtocolo').getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Mets', 'Sistole', 'Diastole', 'FC'],
                    datasets: [{
                        fill: false,
                        label: 'I',
                        data: this.etapa1,
                        backgroundColor: 'rgba(218, 22, 22, 1)',
                        borderColor: 'rgba(218, 22, 22, 1)',
                        pointBorderColor: "rgba(218, 22, 22, 1)",
                        pointBackgroundColor: "rgba(218, 22, 22, 1)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        borderWidth: 1
                    }, {
                        fill: false,
                        label: 'II',
                        data: this.etapa2,
                        backgroundColor: "rgba(0,0,139)",
                        borderColor: "rgba(0,0,139)",
                        pointBorderColor: "rgba(0,0,139)",
                        pointBackgroundColor: "rgba(0,0,139)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        borderWidth: 1
                    }, {
                        fill: false,
                        label: 'III',
                        data: this.etapa3,
                        backgroundColor: "rgba(31, 158, 48, 1)",
                        borderColor: "rgba(31, 158, 48, 1)",
                        pointBorderColor: "rgba(31, 158, 48, 1)",
                        pointBackgroundColor: "rgba(31, 158, 48, 1)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        borderWidth: 1
                    }, {
                        fill: false,
                        label: 'IV',
                        data: this.etapa4,
                        backgroundColor: "rgba(81, 28, 204, 1)",
                        borderColor: "rgba(81, 28, 204, 1)",
                        pointBorderColor: "rgba(81, 28, 204, 1)",
                        pointBackgroundColor: "rgba(81, 28, 204, 1)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        borderWidth: 1
                    }, {
                        fill: false,
                        label: 'V',
                        data: this.etapa5,
                        backgroundColor: "rgba(255,165,0)",
                        borderColor: "rgba(255,165,0)",
                        pointBorderColor: "rgba(255,165,0)",
                        pointBackgroundColor: "rgba(255,165,0)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        borderWidth: 1
                    }, {
                        fill: false,
                        label: 'VI',
                        data: this.etapa6,
                        backgroundColor: "rgba(25, 193, 171, 1)",
                        borderColor: "rgba(25, 193, 171, 1)",
                        pointBorderColor: "rgba(25, 193, 171, 1)",
                        pointBackgroundColor: "rgba(25, 193, 171, 1)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        borderWidth: 1
                    }, {
                        fill: false,
                        label: 'VII',
                        data: this.etapa7,
                        backgroundColor: "rgba(255,69,0)",
                        borderColor: "rgba(255,69,0)",
                        pointBorderColor: "rgba(255,69,0)",
                        pointBackgroundColor: "rgba(255,69,0)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        borderWidth: 1
                    }]
                },
                options: {
                    animation: {
                        onComplete: function (animation) {
                            $this.imgGraf1 = this.toBase64Image();
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
        },
        actualizarGrafica2() {
            $this = this;
            if (this.grafica2) this.grafica2.destroy()
            this.Graf_Frecuencias = [this.global_lab107.TABLA_PROTOCOLO[0].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[1].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[2].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[3].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[4].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[5].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO[6].TA_SISTOLE]
            this.Graf_Sistoles = [this.global_lab107.TABLA_PROTOCOLO[0].FC, this.global_lab107.TABLA_PROTOCOLO[1].FC, this.global_lab107.TABLA_PROTOCOLO[2].FC, this.global_lab107.TABLA_PROTOCOLO[3].FC, this.global_lab107.TABLA_PROTOCOLO[4].FC, this.global_lab107.TABLA_PROTOCOLO[5].FC, this.global_lab107.TABLA_PROTOCOLO[6].FC]

            this.grafica2 = new Chart(document.getElementById('tablaFrecuenciaCardiaca').getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
                    datasets: [{
                        fill: false,
                        label: 'FC',
                        data: this.Graf_Frecuencias,
                        backgroundColor: 'rgba(218, 22, 22, 1)',
                        borderColor: 'rgba(218, 22, 22, 1)',
                        pointBorderColor: "rgba(218, 22, 22, 1)",
                        pointBackgroundColor: "rgba(218, 22, 22, 1)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        borderWidth: 1
                    }, {
                        fill: false,
                        label: 'Sistole',
                        data: this.Graf_Sistoles,
                        backgroundColor: "rgba(3, 88, 106, 0.3)",
                        borderColor: "rgba(3, 88, 106, 0.70)",
                        pointBorderColor: "rgba(3, 88, 106, 0.70)",
                        pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        borderWidth: 1
                    }]
                },
                options: {
                    animation: {
                        onComplete: function (animation) {
                            $this.imgGraf2 = this.toBase64Image();
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
        },
        actualizarGrafica_pie1() {
            if (this.grafica_pie_1) this.grafica_pie_1.destroy()

            this.Graficas_post.primera = [this.global_lab107.TABLA_PROTOCOLO_POST[0].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO_POST[0].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO_POST[0].FC]

            this.grafica_pie_1 = new Chart(document.getElementById('tablaPie_1').getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Sistole', 'Diastole', 'Fc'],
                    datasets: [{
                        backgroundColor: ['rgba(218, 22, 22, 1)', 'rgba(0,0,139)', 'rgba(34,139,34)'],
                        hoverBackgroundColor: ['rgba(195, 13, 13, 1)', 'rgba(0,0,139)', 'rgba(34,139,34)'],
                        hoverBorderColor: ['rgba(195, 13, 13, 1)', 'rgba(0,0,139)', 'rgba(34,139,34)'],
                        hoverBorderWidth: 2,
                        borderAlign: 'inner',
                        data: this.Graficas_post.primera
                    }]
                },
                options: {
                    animation: {
                        onComplete: function (animation) {
                            $this.imgGraf3 = this.toBase64Image();
                        }
                    },
                }

            });
        },
        actualizarGrafica_pie2() {
            if (this.grafica_pie_2) this.grafica_pie_2.destroy()

            this.Graficas_post.segunda = [this.global_lab107.TABLA_PROTOCOLO_POST[1].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO_POST[1].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO_POST[1].FC]

            this.grafica_pie_2 = new Chart(document.getElementById('tablaPie_2').getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Sistole', 'Diastole', 'Fc'],
                    datasets: [{
                        backgroundColor: ['rgba(255,165,0)', 'rgba(0,128,128)', 'rgba(128,0,128)'],
                        hoverBackgroundColor: ['rgba(255,165,0)', 'rgba(0,128,128)', 'rgba(128,0,128)'],
                        hoverBorderColor: ['rgba(255,165,0)', 'rgba(0,128,128)', 'rgba(128,0,128)'],
                        hoverBorderWidth: 2,
                        borderAlign: 'inner',
                        data: this.Graficas_post.segunda
                    }]
                },
                options: {
                    animation: {
                        onComplete: function (animation) {
                            $this.imgGraf4 = this.toBase64Image();
                        }
                    },
                }

            });
        },
        actualizarGrafica_pie3() {
            if (this.grafica_pie_3) this.grafica_pie_3.destroy()

            this.Graficas_post.tercera = [this.global_lab107.TABLA_PROTOCOLO_POST[2].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO_POST[2].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO_POST[2].FC]

            this.grafica_pie_3 = new Chart(document.getElementById('tablaPie_3').getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Sistole', 'Diastole', 'Fc'],
                    datasets: [{
                        backgroundColor: ['rgba(112,128,144)', 'rgba(139,0,139)', 'rgba(70,130,180)'],
                        hoverBackgroundColor: ['rgba(112,128,144)', 'rgba(139,0,139)', 'rgba(70,130,180)'],
                        hoverBorderColor: ['rgba(112,128,144)', 'rgba(139,0,139)', 'rgba(70,130,180)'],
                        hoverBorderWidth: 2,
                        borderAlign: 'inner',
                        data: this.Graficas_post.tercera
                    }]
                },
                options: {
                    animation: {
                        onComplete: function (animation) {
                            $this.imgGraf5 = this.toBase64Image();
                        }
                    },
                }
            });
        },
        actualizarGrafica_pie4() {
            console.log('llega a graf4')
            if (this.grafica_pie_4) this.grafica_pie_4.destroy()

            this.Graficas_post.cuarta = [this.global_lab107.TABLA_PROTOCOLO_POST[3].TA_SISTOLE, this.global_lab107.TABLA_PROTOCOLO_POST[3].TA_DIASTOLE, this.global_lab107.TABLA_PROTOCOLO_POST[3].FC]

            this.grafica_pie_4 = new Chart(document.getElementById('tablaPie_4').getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Sistole', 'Diastole', 'Fc'],
                    datasets: [{
                        backgroundColor: ['rgba(107,142,35)', 'rgba(255,69,0)', 'rgba(128,0,0)'],
                        hoverBackgroundColor: ['rgba(107,142,35)', 'rgba(255,69,0)', 'rgba(128,0,0)'],
                        hoverBorderColor: ['rgba(107,142,35)', 'rgba(255,69,0)', 'rgba(128,0,0)'],
                        hoverBorderWidth: 2,
                        borderAlign: 'inner',
                        data: this.Graficas_post.cuarta
                    }]
                },
                options: {
                    animation: {
                        onComplete: function (animation) {
                            $this.imgGraf6 = this.toBase64Image();
                        }
                    },
                }
            });
        },
        async _envioImpresion() {
            await llenarGraficasLab107_impLab(this.global_lab107);

            _impresion2({
                tipo: 'pdf',
                archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
                content: await _imprimirLab107(this.global_lab107)
            }).then(el => {
                console.log('Impresión terminada')
                this.salir_lab107()
            }).catch((err) => {
                console.error(err);
            })
        },
    }
})