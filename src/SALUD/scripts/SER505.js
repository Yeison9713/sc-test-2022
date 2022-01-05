// LISTADO RESUMIDO DE CARTERA
// DAVID.M - CREACION - 21/07/2020 - OPCION 9-7-5-3 SALUD

var $this;
new Vue({
    el: '#SER505',
    data: {
        _terceros: [],
        form: {
            añoInicial_505: '',
            mesInicial_505: '',
            diaInicial_505: '',
            añoFinal_505: '',
            mesFinal_505: '',
            diaFinal_505: '',
            añoAbonos_505: '',
            mesAbonos_505: '',
            diaAbonos_505: '',
            tercero_SER505: '',
            descripTercero_SER505: '',
            fechaPres_SER505: '',
            prefijo_SER505: '',
            factCanc_SER505: '',
            factRad_SER505: '',
        }
    },
    created() {
        loader('show')
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-5-3 - Listado resumido de cartera');
        this._cargarTerceros();
    },
    watch: {
    },
    methods: {
        datoInicialSER505() {
            this.form.diaInicial_505 = "01";
            this.form.mesInicial_505 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
            this.form.añoInicial_505 = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

            this.form.diaFinal_505 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
            this.form.mesFinal_505 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
            this.form.añoFinal_505 = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

            this.form.diaAbonos_505 = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
            this.form.mesAbonos_505 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
            this.form.añoAbonos_505 = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

            this.evaluaranoInicial_SER505();
        },
        evaluaranoInicial_SER505(){
            validarInputs(
                {
                    form: "#anoInicial_505",
                    orden: "1"
                },
                () => {
                    _toggleNav()
                },
                () => {
                    if (this.form.añoInicial_505.trim() == '') {
                        this.form.añoInicial_505 = '0000';
                        this.form.mesInicial_505 = '00';
                        this.form.diaInicial_505 = '00';
                        this.fechaInicial = this.form.añoInicial_505 + this.form.mesInicial_505 + this.form.diaInicial_505;
                        this.validarFechaFinalSER505('1');
                    } else {
                        var añoIni = parseFloat(this.form.añoInicial_505);
                        if (parseInt(añoIni) < 1900) {
                            CON851('37', '37', null, 'error', 'error');
                            this.evaluaranoInicial_SER505();
                        } else {
                            this.validarFechaInicialSER505('1');
                        }
                    }
                }
            )
        },
        validarFechaInicialSER505(orden) {
            $this = this;
            setTimeout(function () {
                validarInputs(
                    {
                        form: '#fechaInicial_505',
                        orden: orden
                    },
                    () => {
                        $this.evaluaranoInicial_SER505();
                    },
                    () => {
                        $this.form.diaInicial_505 = cerosIzq($this.form.diaInicial_505, 2);
                        $this.form.mesInicial_505 = cerosIzq($this.form.mesInicial_505, 2);
                        $this.fechaInicial = $this.form.añoInicial_505 + $this.form.mesInicial_505 + $this.form.diaInicial_505;
                        var diaIni = parseFloat($this.form.diaInicial_505);
                        var mesIni = parseFloat($this.form.mesInicial_505);
                        if (parseInt(diaIni) < 1 || parseInt(diaIni) > 31) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaInicialSER505('3');
                        } else if (parseInt(mesIni) < 1 || parseInt(mesIni) > 12) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaInicialSER505('2');
                        } else {
                            $this.validarFechaFinalSER505('1');
                        }
                    }
                );
            }, 100);
        },
        validarFechaFinalSER505(orden) {
            $this = this;
            setTimeout(function () {
                validarInputs(
                    {
                        form: '#fechaFinal_505',
                        orden: orden
                    },
                    () => {
                        $this.evaluaranoInicial_SER505()
                    },
                    () => {
                        $this.form.diaFinal_505 = cerosIzq($this.form.diaFinal_505, 2);
                        $this.form.mesFinal_505 = cerosIzq($this.form.mesFinal_505, 2);
                        $this.fechaFinal = $this.form.añoFinal_505 + $this.form.mesFinal_505 + $this.form.diaFinal_505;
                        var diaFin = parseFloat($this.form.diaFinal_505);
                        var mesFin = parseFloat($this.form.mesFinal_505);
                        var añoFin = parseFloat($this.form.añoFinal_505);
                        if (parseInt(añoFin) < 1900) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaFinalSER505('1');
                        } else {
                            if (parseInt(diaFin) < 1 || parseInt(diaFin) > 31) {
                                CON851('37', '37', null, 'error', 'error');
                                $this.validarFechaFinalSER505('3');
                            } else if (parseInt(mesFin) < 1 || parseInt(mesFin) > 12) {
                                CON851('37', '37', null, 'error', 'error');
                                $this.validarFechaFinalSER505('2');
                            } else if ($this.fechaFinal < $this.fechaInicial) {
                                CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                                $this.validarFechaFinalSER505('2');
                            } else {
                                $this.validarFechaAbonosSER505('1');
                            }
                        }
                    }
                );
            }, 100);
        },
        validarFechaAbonosSER505(orden) {
            $this = this;
            setTimeout(function () {
                validarInputs(
                    {
                        form: '#fechaAbonos_505',
                        orden: orden
                    },
                    () => {
                        $this.validarFechaFinalSER505('1')
                    },
                    () => {
                        $this.form.diaAbonos_505 = cerosIzq($this.form.diaAbonos_505, 2);
                        $this.form.mesAbonos_505 = cerosIzq($this.form.mesAbonos_505, 2);
                        $this.fechaAbonos = $this.form.añoAbonos_505 + $this.form.mesAbonos_505 + $this.form.diaAbonos_505;
                        var diaAb = parseFloat($this.form.diaAbonos_505);
                        var mesAb = parseFloat($this.form.mesAbonos_505);
                        var añoAb = parseFloat($this.form.añoAbonos_505);
                        if (parseInt(añoAb) < 1900) {
                            CON851('37', '37', null, 'error', 'error');
                            $this.validarFechaAbonosSER505('1');
                        } else {
                            if (parseInt(diaAb) < 1 || parseInt(diaAb) > 31) {
                                CON851('37', '37', null, 'error', 'error');
                                $this.validarFechaAbonosSER505('3');
                            } else if (parseInt(mesAb) < 1 || parseInt(mesAb) > 12) {
                                CON851('37', '37', null, 'error', 'error');
                                $this.validarFechaAbonosSER505('2');
                            } else if ($this.fechaAbonos < $this.fechaInicial) {
                                CON851('03', 'Fecha de abonos debe ser mayor', null, 'error', 'error');
                                $this.validarFechaAbonosSER505('2');
                            } else {
                                $this.validarTerceroSER505();
                            }
                        }
                    }
                );
            }, 100);
        },
        validarTerceroSER505() {
            this.form.tercero_SER505 == '' ? this.form.tercero_SER505 = "99" : false;
            $this = this;
            validarInputs(
                {
                    form: "#validarTercero_505",
                    orden: "1"
                },
                () => {
                    setTimeout(() => {
                        $this.validarFechaAbonosSER505('1');
                    }, 100);
                },
                () => {
                    var tercero = $this.form.tercero_SER505.toUpperCase();
                    const res = $this._terceros.find(e => e.COD.trim() == tercero);
                    if (tercero == '99') {
                        $this.form.descripTercero_SER505 = "PROCESO TOTAL";
                        $this.validarFechaPresSER505();
                    } else {
                        if (res == undefined) {
                            CON851('01', '01', null, 'error', 'error');
                            $this.validarTerceroSER505();
                        } else {
                            $this.form.descripTercero_SER505 = res.NOMBRE;
                            console.log($this.form.tercero_SER505, 'ter')
                            $this.validarFechaPresSER505();
                        }
                    }
                }
            )
        },
        validarFechaPresSER505() {
            this.form.fechaPres_SER505 == '' ? this.form.fechaPres_SER505 = "N" : false;
            $this = this;
            validarInputs(
                {
                    form: "#validarFechaPres_505",
                    orden: "1"
                },
                () => {
                    setTimeout(() => {
                        $this.validarTerceroSER505();
                    }, 100);
                },
                () => {
                    var fechaPres = $this.form.fechaPres_SER505.toUpperCase();
                    if (fechaPres != 'S' && fechaPres != 'N') {
                        CON851('03', '03', null, 'error', 'error');
                        $this.validarFechaPresSER505();
                    } else {
                        $this.validarPrefijoSER505();
                    }
                }
            )
        },
        validarPrefijoSER505() {
            this.form.prefijo_SER505 == '' ? this.form.prefijo_SER505 = "*" : false;
            $this = this;
            validarInputs(
                {
                    form: "#validarPrefijo_505",
                    orden: "1"
                },
                () => {
                    $this.validarFechaPresSER505()
                },
                () => {
                    var prefijo = $this.form.prefijo_SER505.toUpperCase();
                    if (prefijo.trim() == '') {
                        $this.validarPrefijoSER505();
                    } else {
                        const res = ["A", "P", "T", "B", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                            "O", "Q", "R", "S", "V", "W", "X", "Y", "Z", "*"].find(e => e == prefijo);
                        if (res == undefined) {
                            CON851('01', '01', null, 'error', 'error');
                            $this.validarPrefijoSER505();
                        } else {
                            $this.validarFactCancSER505();
                        }
                    }
                }
            )
        },
        validarFactCancSER505() {
            this.form.factCanc_SER505 == '' ? this.form.factCanc_SER505 = "N" : false;
            $this = this;
            validarInputs(
                {
                    form: "#validarFactCanc_505",
                    orden: "1"
                },
                () => {
                    setTimeout(() => {
                        $this.validarPrefijoSER505();
                    }, 100);
                },
                () => {
                    var factCanc = $this.form.factCanc_SER505.toUpperCase();
                    if (factCanc != 'S' && factCanc != 'N') {
                        CON851('03', '03', null, 'error', 'error');
                        $this.validarFactCancSER505();
                    } else {
                        $this.validarFactRadSER505();
                    }
                }
            )
        },
        validarFactRadSER505() {
            this.form.factRad_SER505 == '' ? this.form.factRad_SER505 = "N" : false;
            $this = this;
            validarInputs(
                {
                    form: "#validarFactRad_505",
                    orden: "1"
                },
                () => {
                    setTimeout(() => {
                        $this.validarFactCancSER505();
                    }, 100);
                },
                () => {
                    var factRad = $this.form.factRad_SER505.toUpperCase();
                    if (factRad != 'S' && factRad != 'N') {
                        CON851('03', '03', null, 'error', 'error');
                        $this.validarFactRadSER505();
                    } else {
                        $this._envioImpresion();
                    }
                }
            )
        },
        _envioImpresion() {
            $this = this;
            CON850_P(function (e) {
                if (e.id == 'S') {
                    loader('show')
                    var datos_envio = datosEnvio()
                        + $this.fechaInicial.toString()
                        + '|' + $this.fechaFinal.toString()
                        + '|' + $this.fechaAbonos.toString()
                        + '|' + $this.form.tercero_SER505
                        + '|' + $this.form.fechaPres_SER505.toUpperCase()
                        + '|' + $this.form.prefijo_SER505.toUpperCase()
                        + '|' + $this.form.factCanc_SER505.toUpperCase()
                        + '|' + $this.form.factRad_SER505.toUpperCase();

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER505.DLL'))
                        .then($this._montarImpresion_SER505)
                        .catch(err => {
                            console.log(err)
                            loader('hide')
                            $this.validarFactRadSER505();
                        })
                } else {
                    $this.validarFactRadSER505();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },
        _cargarTerceros() {
            var $this = this
            postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
                .then(data => {
                    loader('hide')
                    $this._terceros = data.TERCEROS;
                    $this._terceros.pop();
                    console.log('llega')
                    $this.datoInicialSER505();
                }).catch(err => {
                    console.log('sale')
                    loader('hide')
                    _toggleNav();
                })
        },
        _ventanaTercerosSER505() {
            for (i in $this._terceros) {
                $this._terceros[i]['IDENTIFICACION'] = $this._terceros[i].COD;
                $this._terceros[i]['TELEFONO'] = $this._terceros[i].TELEF;
                $this._terceros[i]['ACTIVIDAD'] = $this._terceros[i].ACT;
            }
            _ventanaDatos({
                titulo: "VENTANA DE TERCEROS",
                columnas: ["IDENTIFICACION", "NOMBRE", "TELEFONO", "CIUDAD", "ACTIVIDAD"],
                data: $this._terceros,
                ancho: 900,
                callback_esc: function () {
                    document.querySelector('.tercero_SER505').focus();
                },
                callback: function (data) {
                    $this.form.tercero_SER505 = data.COD.trim();
                    _enterInput('.tercero_SER505');
                }
            });
        },
        _montarImpresion_SER505(data) {
            $this = this;
            data.LISTADO.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');

            for (i in data.LISTADO) {
                data.LISTADO[i]['NOMBRE_PAC_LN'] = data.LISTADO[i]['NOMBRE_PAC_LN'].replace(/\�/g, "Ñ")
                data.LISTADO[i]['FECHA_FAC_LN'] = data.LISTADO[i]['FECHA_FAC_LN'].replace(/\�/g, "Ñ")
                data.LISTADO[i]['CARGOS_LN'] = data.LISTADO[i]['CARGOS_LN'].replace(/\ /g, "")
                data.LISTADO[i]['COPAGOS_LN'] = data.LISTADO[i]['COPAGOS_LN'].replace(/\ /g, "")
                data.LISTADO[i]['RETENC_LN'] = data.LISTADO[i]['RETENC_LN'].replace(/\ /g, "")
                data.LISTADO[i]['ABONOS_LN'] = data.LISTADO[i]['ABONOS_LN'].replace(/\ /g, "")
                data.LISTADO[i]['GLOSAS_LN'] = data.LISTADO[i]['GLOSAS_LN'].replace(/\ /g, "")
                data.LISTADO[i]['AJUSTES_LN'] = data.LISTADO[i]['AJUSTES_LN'].replace(/\ /g, "")
                data.LISTADO[i]['SALDO_LN'] = data.LISTADO[i]['SALDO_LN'].replace(/\ /g, "")
            }

            if (data.LISTADO.length < 2) {
                CON851('08', '08', null, 'error', 'error');
                loader('hide')
                this.validarFactRadSER505();
            } else {
                var columnas = [
                    {
                        title: "FACT",
                        value: "LLAVE_NUM_LN",
                        filterButton: true
                    },
                    {
                        title: "FECHA FACT",
                        value: "FECHA_FAC_LN",
                        format: 'fecha',
                        filterButton: true
                    },
                    {
                        title: "FECHA RADIC",
                        value: "FECHA_RAD_LN",
                        format: 'fecha',
                        filterButton: true
                    },
                    {
                        title: "FECHA VENCE",
                        value: "FECHA_VENCE_LN",
                        format: 'fecha',
                        filterButton: true
                    },
                    {
                        title: "TIPO IDEN",
                        value: "TIPO_IDE_LN",
                        filterButton: true

                    },
                    {
                        title: "IDENTIFICACIÓN",
                        value: "ID_PAC_LN",
                        filterButton: true
                    },
                    {
                        title: "PACIENTE",
                        value: "NOMBRE_PAC_LN"
                    },
                    {
                        title: "CONVENIO",
                        value: "CONVENIO_LN",
                        filterButton: true
                    },
                    {
                        title: "POLIZA",
                        value: "POLIZA_LN"
                    },
                    {
                        title: "# DIAS",
                        value: "DIAS_TOT_LN",
                        filterButton: true
                    },
                    {
                        title: "CARGOS",
                        value: "CARGOS_LN",
                        format: 'money'
                    },
                    {
                        title: "COPAGOS",
                        value: "COPAGOS_LN",
                        format: 'money'
                    },
                    {
                        title: "RETEFUENTE",
                        value: "RETENC_LN",
                        format: 'money'
                    },
                    {
                        title: "ABONOS",
                        value: "ABONOS_LN",
                        format: 'money'
                    },
                    {
                        title: "GLOSAS",
                        value: "GLOSAS_LN",
                        format: 'money'
                    },
                    {
                        title: "AJUSTES",
                        value: "AJUSTES_LN",
                        format: 'money'
                    },
                    {
                        title: "SALDO",
                        value: "SALDO_LN",
                        format: 'money'
                    },
                    {
                        title: "NIT TER",
                        value: "NIT_TER_LN",
                        filterButton: true
                    },
                    {
                        title: "ESTADO RAD",
                        value: "RADICADA_LN",
                        filterButton: true
                    },
                ]

                var header_format = [
                    { text: `${nombreEmpresa}`, bold: true, size: 16 },
                    `INFORME RESUMIDO DE CARTERA     NIT: ${nit}`,
                    `Fecha de reporte: ${fecha}`,
                    `Periodo desde: ${this.fechaInicial}  Hasta: ${this.fechaFinal}`,
                ]

                _impresion2({
                    tipo: 'excel',
                    header: header_format,
                    logo: `${nit}.bmp`,
                    // ruta_logo: 'C:\\LOGOS\\', //
                    tabla: {
                        columnas,
                        data: data.LISTADO,
                    },
                    archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
                    scale: 65,
                    orientation: 'landscape'
                })
                    .then(() => {
                        console.log('Proceso terminado')
                        _inputControl('reset');
                        $this.datoInicialSER505()
                        loader('hide')
                    })
                    .catch(() => {
                        console.log('Proceso error')
                    })
            }
        },
    }
})