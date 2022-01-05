// LISTADO DE NUMERACIONES - CARTERA
// DAVID.M - CREACION - 14/07/2020 - OPCION 9-7-5-5 SALUD
var $this;
new Vue({
    el: '#SER165',
    data: {
        form: {
            año_165: '',
            mes_165: '',
            prefijo_SER165: ''
        },
    },
    created() {
        _inputControl('disabled');
        _inputControl('reset');
        nombreOpcion('9-7-5-5 - Resumen cartera mes');
        this.datoInicialSER165();
    },
    methods: {
        datoInicialSER165() {
            this.form.mes_165 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
            this.form.año_165 = '20' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
            this.fecha = this.form.año_165.toString() + '/' + this.form.mes_165.toString();

            this.validarPrefijoSER165();
        },
        validarPrefijoSER165() {
            this.form.prefijo_SER165 == '' ? document.querySelector('.pref_165').setAttribute('placeholder', 'A') : false;
            $this = this;
            validarInputs(
                {
                    form: "#validarPrefijo_165",
                    orden: "1"
                },
                () => {
                    _toggleNav()
                },
                () => {
                    var prefijo = $this.form.prefijo_SER165.toUpperCase();
                    if (prefijo.trim() == '') {
                        $this.validarPrefijoSER165();
                    } else {
                        const res = ["A", "P", "T", "B", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                            "O", "Q", "R", "S", "V", "W", "X", "Y", "Z", "*"
                        ].find(e => e == prefijo);
                        if (res == undefined) {
                            CON851('01', '01', null, 'error', 'error');
                            $this.validarPrefijoSER165();
                        } else {
                            $this._envioImpresion();
                        }
                    }
                }
            )
        },
        _envioImpresion() {
            $this = this;
            CON850_P(function (e) {
                if (e.id == 'S') {
                    loader('show')
                    var datos_envio = datosEnvio() +
                        $this.form.año_165.toString() + $this.form.mes_165.toString() +
                        '|' + $this.form.prefijo_SER165.toUpperCase();

                    console.log(datos_envio, "datos_envio");

                    postData({ datosh: datos_envio }, get_url('app/SALUD/SER165.DLL'))
                        .then($this._montarImpresion_SER165)
                        .catch(err => {
                            console.log(err)
                            loader('hide')
                            $this.validarPrefijoSER165();
                        })
                } else {
                    $this.validarPrefijoSER165();
                }
            }, {
                msj: '00',
                overlay_show: true
            })
        },
        _montarImpresion_SER165(data) {
            $this = this;
            data.LISTADO.pop();
            data.ENCABEZADO = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');

            for (i in data.LISTADO) {
                data.LISTADO[i]['ENTIDAD_LN'] = data.LISTADO[i]['ENTIDAD_LN'].replace(/\�/g, "Ñ")
                data.LISTADO[i]['PACIENTE_LN'] = data.LISTADO[i]['PACIENTE_LN'].replace(/\�/g, "Ñ")
                data.LISTADO[i]['VLR_BRUTO_LN'] = data.LISTADO[i]['VLR_BRUTO_LN'].replace(/\ /g, "")
                data.LISTADO[i]['VLR_ABONOS_LN'] = data.LISTADO[i]['VLR_ABONOS_LN'].replace(/\ /g, "")
            }

            if (data.LISTADO.length < 1) {
                CON851('08', '08', null, 'error', 'error');
                loader('hide')
                this.validarPrefijoSER165();
            } else {
                var columnas = [
                    {
                        title: "FACT",
                        value: "FACTURA_LN",
                        filterButton: true
                    },
                    {
                        title: "ENTIDAD",
                        value: "ENTIDAD_LN",
                        filterButton: true
                    },
                    {
                        title: "PACIENTE",
                        value: "PACIENTE_LN"
                    },
                    {
                        title: "HAB.",
                        value: "HAB_LN"
                    },
                    {
                        title: "VALOR BRUTO",
                        value: "VLR_BRUTO_LN",
                        format: 'money'
                    },
                    {
                        title: "ABONOS",
                        value: "VLR_ABONOS_LN",
                        format: 'money'
                    },
                    {
                        title: "EST",
                        value: "EST_LN",
                        filterButton: true
                    }
                ]

                var header_format = [
                    { text: `${nombreEmpresa}`, bold: true, size: 16 },
                    `LISTADO DE CARTERA     NIT: ${nit}`,
                    `Fecha de reporte: ${fecha}`,
                    `Periodo: ${this.fecha}`,
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
                    archivo: 'LISTADO-RESUMEN-MES',
                    scale: 65
                })
                    .then(() => {
                        console.log('Proceso terminado')
                        _inputControl('reset');
                        loader('hide')
                        $this.datoInicialSER165()
                    })
                    .catch(() => {
                        console.log('Proceso error')
                    })
            }
        }
    }
})