const { data, post } = require("jquery");

new Vue({
    el: "#bom306",
    data: {
        terceros: [],

        id_tercero: null,
        descrip_tercero: null,
        fecha_ini: {
            anio: null,
            mes: null,
            dia: null,
        },
        fecha_fin: {
            anio: null,
            mes: null,
            dia: null,
        },
    },
    mounted() {
        _inputControl('reset');
        _inputControl('disabled');

        loader('show')
        _vm = this;
        this.get_terceros();
    },
    methods: {
        get_terceros() {
            postData({ datosh: datosEnvio() }, get_url("APP/bombas/CON802.DLL"))
                .then(res => {
                    loader('hide')
                    this.terceros = res.TERCEROS
                    this.validar_tercero();
                })
                .catch(err => {
                    loader('hide')
                    console.log(err)
                    _toggleNav()
                })
        },
        validar_tercero() {
            validarInputs(
                {
                    form: "#fase_tercero",
                    orden: "1"
                },
                _toggleNav,
                () => {
                    let tercero = parseFloat(this.id_tercero) || 0;
                    let busqueda = this.terceros.find(e => e.COD == tercero);

                    let date = new Date().toLocaleDateString("es-CO").split("/");

                    if (tercero == 99) {
                        this.descrip_tercero = "Todo los terceros"
                        this.validar_fecha_ini();

                        this.fecha_ini.anio = date[2]
                        this.fecha_ini.mes = date[1]

                    } else if (busqueda) {
                        this.descrip_tercero = busqueda.NOMBRE.trim() || "";
                        this.validar_fecha_ini();

                        this.fecha_ini.anio = date[2]
                        this.fecha_ini.mes = date[1]

                    } else {
                        this.descrip_tercero = ""
                        CON851("03", "03", null, "error", "Error");
                        this.validar_tercero();
                    }
                }
            )
        },
        validar_fecha_ini() {
            validarInputs(
                {
                    form: "#fase_fecha_ini",
                    orden: "1"
                },
                () => {
                    this.validar_tercero()
                },
                () => {
                    let fecha = this.fecha_ini;
                    if (_validarFecha(fecha.anio, fecha.mes, fecha.dia)) {

                        this.fecha_fin.anio = fecha.anio
                        this.fecha_fin.mes = fecha.mes

                        this.validar_fecha_fin()
                    } else {
                        CON851("", "Fecha invalidad", null, "error", "Error");
                        this.validar_fecha_ini()
                    }

                }
            )
        },

        validar_fecha_fin() {
            validarInputs(
                {
                    form: "#fase_fecha_fin",
                    orden: "1"
                },
                () => {
                    this.validar_fecha_ini()
                },
                () => {
                    let fecha = { ...this.fecha_fin };
                    if (_validarFecha(fecha.anio, fecha.mes, fecha.dia)) {
                        this.get_listado();
                    } else {
                        CON851("", "Fecha invalidad", null, "error", "Error");
                        this.validar_fecha_fin()
                    }
                }
            )
        },

        get_listado() {
            let { fecha_ini, fecha_fin, id_tercero } = this;

            let datos = {
                datosh: datosEnvio(),
                tercero: id_tercero
            }

            let format = `${fecha_ini.anio}${fecha_ini.mes.padStart(2, "0")}${fecha_ini.dia.padStart(2, "0")}`
            datos.fecha_ini = format

            format = `${fecha_fin.anio}${fecha_fin.mes.padStart(2, "0")}${fecha_fin.dia.padStart(2, "0")}`
            datos.fecha_fin = format

            loader("show")

            postData(datos, get_url("APP/bombas/BOM306.DLL"))
                .then(res => {
                    loader("hide")
                    this.generar_listado(res.listado)
                })
                .catch(err => {
                    console.log(err)
                    loader("hide")
                    this.validar_fecha_fin()
                })
        },

        generar_listado(listado) {
            let nit = $_USUA_GLOBAL[0].NIT;
            let nombre = $_USUA_GLOBAL[0].NOMBRE;

            let { fecha_ini, fecha_fin } = this;

            let format = `${fecha_ini.anio}${fecha_ini.mes.padStart(2, "0")}${fecha_ini.dia.padStart(2, "0")}`
            let fecha_1 = format

            format = `${fecha_fin.anio}${fecha_fin.mes.padStart(2, "0")}${fecha_fin.dia.padStart(2, "0")}`
            let fecha_2 = format

            let fecha_imp = new Date().toLocaleDateString("es-CO")

            let header = [
                { text: nombre, bold: true, size: 16 },
                `Informe de vales,  Facturado - No facturado     NIT: ${nit}`,
                `Periodo desde: ${fecha_1}  Hasta: ${fecha_2}`,
                `Fecha Impresion: ${fecha_imp}`,
            ];

            let name_file = `Informe-facturado-${new Date().getTime()}`
            let columnas = this.get_columnas();

            let encabezado = {
                tipo: "excel",
                header,
                logo: `${nit}.png`,
                tabla: {
                    columnas,
                    data: listado
                },
                archivo: name_file,
                scale: 65,
                orientation: "landscape",
            };

            _impresion2(encabezado).then(res => {
                console.log("excel", name_file)
                this.reset_form()
            }).catch(err => {
                console.log(err)
                this.validar_fecha_fin()
            })
        },

        reset_form() {
            this.id_tercero = null
            this.descrip_tercero = null
            this.fecha_ini = {
                anio: null,
                mes: null,
                dia: null,
            }
            this.fecha_fin = {
                anio: null,
                mes: null,
                dia: null,
            }

            this.validar_tercero()
        },

        get_columnas() {
            return [
                {
                    value: "sucursal",
                    title: "Sucursal comp.",
                    format: "string",
                },
                {
                    value: "nro",
                    title: "Nro. Planilla",
                    format: "string",
                },
                {
                    value: "fecha",
                    title: "Fecha",
                    format: "fecha",
                },
                {
                    value: "documento",
                    title: "Documento",
                    format: "string",
                },
                {
                    value: "nit",
                    title: "Tercero",
                    format: "string",
                },
                {
                    value: "decrip_ter",
                    title: "Beneficiario",
                    format: "string",
                },
                {
                    value: "cuenta",
                    title: "Cuenta",
                    format: "string",
                },
                {
                    value: "articulo",
                    title: "Articulo",
                    format: "string",
                },
                {
                    value: "descrip_art",
                    title: "Descrip. Articulo",
                    format: "string",
                },
                {
                    value: "vlr",
                    title: "Valor",
                    format: "money",
                },
                {
                    value: "suc_fact",
                    title: "Sucursal Fact.",
                    format: "string",
                },
                {
                    value: "nro_fact",
                    title: "Nro. Fact.",
                    format: "string",
                },
                {
                    value: "cufe",
                    title: "Cufe",
                    format: "string",
                },
            ]
        },

        ventana_terceros() {
            let terceros = this.terceros;
            _ventanaDatos({
                titulo: "Busqueda de terceros",
                columnas: [
                    { value: "COD", label: "Codigo", },
                    { value: "NOMBRE", label: "Nombre", },
                    { value: "CIUDAD", label: "Ciudad", },
                ],
                data: terceros,
                callback_esc: () => {
                    this.$refs.id_tercero.focus();
                },
                callback: (data) => {
                    this.id_tercero = data.COD;
                    this.$refs.id_tercero.focus();
                    _enterInput(`[ref="id_tercero"`);
                },
            });
        },
    }
})