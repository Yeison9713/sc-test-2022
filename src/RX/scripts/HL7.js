const path = require('path');
const fs = require('fs');

new Vue({
    el: '#HL7',
    data: {
        archivos: [],
        contenido: '',
        datos: {
            archivo: '',
            cedula: '',
            comprobante: '',
            nit: '',
            ano: '',
            item: '',
            cup: '',
            radiologo: '',
            normalidad: '',
            archivo: '',
            resultado_ppal: ''
        },
        guardados: [],
        error_guardado: [],
        error_envio: [],
        enviados_correo: []
    },
    created() {
        _toggleNav()
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('5 - Cargar estudios desde interfaz')
    },
    watch: {

    },
    methods: {
        buscarHl7() {
            loader('show')

            fs.readdir(`S:\\EXPORTAR\\HL7\\RECIBIDOS`, (err, files) => {
                if (err) {
                    loader('hide')
                    console.log('Error buscando en directorio: ' + err)
                    CON851('', 'Ha ocurrido un error', null, 'error', 'Error')
                } else {
                    this.archivos = files.filter(x => path.extname(x) === '.HL7')

                    if (this.archivos.length == 0) {
                        loader('hide')
                        CON851('', 'No se encontraron archivos HL7!', null, 'error', 'Error');
                    } else {
                        this.proceso()
                    }
                }
            });
        },
        async proceso() {
            var $_this = this

            var directorio = `S:\\EXPORTAR\\HL7\\RECIBIDOS`
            var subidos = `S:\\EXPORTAR\\HL7\\SUBIDOS`
            var error = `S:\\EXPORTAR\\HL7\\ERROR`

            for await (const file of this.archivos) {
                var archivo = path.join(directorio + '\\' + file)

                this.datos.archivo = file
                console.log(this.datos.archivo)

                var contenido = fs.readFileSync(archivo, { encoding: "binary" });

                this.contenido = contenido.split('MSH|').join('*/*').split('PID|').join('*/*').split('ORC|').join('*/*').split('OBR|').join('*/*').split('OBX|').join('*/*').split('*/*')

                var MSH = this.contenido[1]
                var PID = this.contenido[2]
                var ORC = this.contenido[3]
                var OBR = this.contenido[4]
                var OBX = this.contenido[5]
                var OBX2 = this.contenido[6]

                this.datos.cedula = PID.split('|')[2].split('^')[0]
                this.datos.nit = OBR.split('|')[1].substring(0, 1)
                this.datos.comprobante = OBR.split('|')[1].substring(1, 10)

                var sucursal = this.datos.comprobante.substring(0, 2)

                this.datos.ano = ORC.split('|')[6].substring(5,7)

                this.datos.item = OBR.split('|')[1].substring(10, 12)
                this.datos.cup = OBR.split('|')[3].split('^')[0]
                this.datos.radiologo = OBR.split('|')[31].split('&')[0] ? cerosIzq(OBR.split('|')[31].split('&')[0].trim(), 10) : '0000000000'
                this.datos.resultado_ppal = OBX.split('|')[4]

                var att = this.datos.resultado_ppal.search('Atentamente,')
                var firmado = this.datos.resultado_ppal.search('Firmado Electrónicamente')

                if (att != -1) {
                    this.datos.resultado_ppal = this.datos.resultado_ppal.split('Atentamente,')[0]
                } else if (firmado != 1) {
                    this.datos.resultado_ppal = this.datos.resultado_ppal.split('Firmado Electrónicamente')[0]
                }

                if (OBX2) {
                    if (OBX2.trim() == '|1|ST|NORMALIDAD||ANORMAL') {
                        this.datos.normalidad = '2'
                    } else if (OBX2.trim() == '|1|ST|NORMALIDAD||NORMAL') {
                        this.datos.normalidad = '1'
                    }
                } else {
                    this.datos.normalidad = '0'
                }

                var nueva_ruta = ''

                var saveInfo = await this.organizarDatosEnvio()

                if (!saveInfo) {
                    this.error_guardado.push({ nombre: file })

                    CON851('', 'Error al guardar datos', null, 'error', 'Error');
                    nueva_ruta = error + '\\' + file

                    try {
                        fs.renameSync(archivo, nueva_ruta)
                        this.inicializar()
                    } catch (err) {
                        throw err
                        this.inicializar()
                    }
                } else {
                    CON851('', 'Guardado correctamente', null, 'success', 'Exitoso');
                    nueva_ruta = subidos + '\\' + file
                    this.guardados.push({ archivo: file })

                    try {
                        fs.renameSync(archivo, nueva_ruta)
                    } catch (err) {
                        throw err
                    }

                    if (saveInfo.EMAIL.trim() == '') {
                        this.error_envio.push({ nombre: file, motivo: 'Paciente no tiene email' })
                        this.inicializar()
                    } else if (saveInfo.NOMBRE_PACI.trim() == 'PACIENTE NO EXISTE') {
                        this.error_envio.push({ nombre: file, motivo: 'Paciente no existe' })
                        this.inicializar()
                    } else {
                        var HL7 = await this.traerTodosLosDatos()

                        if (!HL7) {
                            this.error_envio.push({ nombre: file, motivo: 'consulta datos' })
                            CON851('', 'No se pudo enviar correo', null, 'error', 'Error');
                        } else {
                             var ANO = this.datos.ano

                            this.inicializar()

                            await _impresion2({
                                tipo: 'pdf',
                                archivo: HL7.NOMBRE_PDF,
                                content: imprimirEstandar_RX(HL7),
                                ruta_guardado: 'C:\\PROSOFT\\MASIVO\\ENVIO_CORREO\\',
                                abrir_archivo: false
                            })

                            var ruta = 'C:\\PROSOFT\\MASIVO\\ENVIO_CORREO\\' + HL7.NOMBRE_PDF

                            if (fs.existsSync(ruta)) {
                                let datos_envia = {
                                    correo_destinatario: saveInfo.EMAIL.trim(),
                                    sucursal: sucursal,
                                    url_pdf: ruta,
                                    nombre_paci: saveInfo.NOMBRE_PACI.trim()
                                };

                                try {
                                    var correo = await $_this.envioCorreo_php(datos_envia)

                                    console.log(correo, 'respuesta correo')
                                    if (correo) {
                                        this.enviados_correo.push({ archivo: file })
                                        CON851('', 'Correo enviado', null, 'success', 'Exitoso');
                                        var guarda = await $_this.saveHoraFecha_correo(saveInfo.LLAVE_COMPLETA, ANO)
                                    }
                                } catch (err) {
                                    this.error_envio.push({ nombre: file, motivo: 'error en proceso' })
                                    CON851('', 'No se pudo enviar correo', null, 'error', 'Error');
                                }
                            } else {
                                this.error_envio.push({ nombre: file, motivo: 'no encontro pdf' })
                            }
                        }
                    }
                }
            };
            loader('hide')
            console.log('SALIO DEL FOR')
        },
        async organizarDatosEnvio() {
            console.log(this.datos)

            var data = {};
            data['datosh'] = datosEnvio() + this.datos.nit + '|' + this.datos.comprobante + '|' + this.datos.cup + '|' + this.datos.item + '|' + + this.datos.cedula + '|' + this.datos.radiologo + '|' + this.datos.normalidad + '|' + this.datos.archivo + '|' + this.datos.ano + '|'

            var posicion = 0
            var contadorLin = 0
            var contadorTotal = 0
            var linea = ''
            var maximo = 90

            var $this = this

            this.datos.resultado_ppal = this.datos.resultado_ppal.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');

            this.datos.resultado_ppal.split('').forEach(function (item, i) {
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

                if (contadorLin == maximo || $this.datos.resultado_ppal.length == contadorTotal) {
                    posicion = posicion + 1

                    data["LIN-" + posicion.toString().padStart(3, "0")] = linea
                    contadorLin = 0
                    linea = ''
                    maximo = 90
                }
            })
            var retorno = await this.llamado_DLL(data, get_url("APP/RX/HL7.DLL"))
            return retorno
        },
        async traerTodosLosDatos() {
            var nit = ''
            switch (this.datos.nit) {
                case '1':
                    nit = '0830092718'
                    break;
                case '2':
                    nit = '0830092719'
                    break;
                case '3':
                    nit = '900193162'
                    break;
                default:
                    nit = '0830092718'
                    break;
            }

            var datos_envio = datosEnvio() + nit + '|' + this.datos.comprobante + '|' + this.datos.cup + '|' + this.datos.item + '|' + this.datos.ano +'|'
            // console.log(this.datos)
            var array_rx421W = await this.llamado_DLL({ datosh: datos_envio }, get_url("APP/RX/RX-421W.DLL"))
            array_rx421W = array_rx421W.RESULTADOS_RX[0]
            // console.log(array_rx421W)

            array_rx421W.RESULTADO_PPAL = array_rx421W.RESULTADO_PPAL.replace(/\&/g, "\n").trim()
            array_rx421W.RESULTADO_PPAL = array_rx421W.RESULTADO_PPAL.replace(/\�/g, "ñ").trim()

            array_rx421W.DESCRIP_PACI = array_rx421W.DESCRIP_PACI.replace(/\�/g, "Ñ").trim()
            array_rx421W.DESCRIP_CUP = array_rx421W.DESCRIP_CUP.replace(/\�/g, "Ñ").trim()
            
            array_rx421W.NOM_ENTIDAD = array_rx421W.NOM_ENTIDAD.replace(/\�/g, "Ñ").trim()
            
            array_rx421W['NOMBRE_PDF'] = 'RX-' + array_rx421W.LLAVE.substring(10, 19) + moment().format('HHmmss') + '.pdf';

            return array_rx421W
        },
        async envioCorreo_php(datos_envia) {
            return new Promise((resolve, reject) => {
                postData(datos_envia, get_url('app/Inc/envio_email_rx.php'))
                    .then(resolve)
                    .catch(reject);
            });
        },
        async saveHoraFecha_correo(llave, ano) {
            var datos_envio = datosEnvio() + llave + '|' + moment().format('YYYYMMDD') + '|' + moment().format('HHmmss') + '|' + ano + '|'
            var respuesta = await this.llamado_DLL({ datosh: datos_envio }, get_url("APP/RX/EMAIL.DLL"))
            return respuesta
        },
        async llamado_DLL(data, dll) {
            var formData = new FormData();
            for (var [key, value] of Object.entries(data)) formData.append(key, value);

            return new Promise(
                async (resolve, reject) => {
                    await fetch(dll, { method: 'POST', body: formData })
                        .then(res => {
                            if (!res.ok) reject(res)
                            return res.text()
                        })
                        .then(res => {
                            let encode = encodeURI(res), decode, response;

                            encode = encode.replace(/%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/g, '');
                            encode = encode.replace(/%0A/g, "");

                            decode = decodeURI(encode);
                            response = JSON.parse(decode)

                            // console.log(response.STATUS)
                            if (response.STATUS == '00') {
                                resolve(response.MENSAJE)
                            } else {
                                let code = response.STATUS.split('-')[0],
                                    tipo = response.STATUS.split('-')[1],
                                    mensaje = response.MENSAJE,
                                    app = response.PROGRAM,
                                    msj = '';


                                if (code == 'SC') {
                                    if (mensaje.length == 2) msj = msjError(mensaje.padStart(2, '0'));
                                    else msj = mensaje;
                                } else {
                                    msj = msjError_con852(code.padStart(2, '0'));
                                    msj = msj.trim() + ': ' + mensaje;
                                }

                                if (tipo == '2') {
                                    var opc = data.datosh.split("|")[4];
                                    if (mensaje == '15') msj = msj + " - " + opc;
                                    jAlert(
                                        { titulo: 'Error ' + code, mensaje: '<b>Mensaje: </b>' + msj + '<br> <b>App:</b> ' + app },
                                        () => {
                                            if (mensaje == "UM") {
                                                _cerrarSesion();
                                            } else {
                                                reject(response);
                                            }
                                        }
                                    );
                                } else {
                                    toast(`Advertencia`, msj, 'warning');
                                    reject(response)
                                }

                            }
                        })
                        .catch(error => reject(error))
                })
        },
        inicializar() {
            this.datos = {
                archivo: '',
                cedula: '',
                comprobante: '',
                nit: '',
                item: '',
                ano: '',
                cup: '',
                radiologo: '',
                normalidad: '',
                archivo: '',
                resultado_ppal: ''
            }
        },
        salirHl7() {
            this.archivos = []
            this.guardados = []
            this.error_guardado = []
            this.error_envio = []
            this.enviados_correo = []
            this.inicializar()
            _inputControl('disabled');
            _inputControl('reset');
            _toggleNav()
        }
    }
})