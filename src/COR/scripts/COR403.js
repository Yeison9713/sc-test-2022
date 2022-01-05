'use strict';
/** 
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Release Electron - COR403 RM Version / .
 *             Respuesta Correspondencia.
 **/
const { get } = require('../../COR/scripts/COR.ctrl.js')
new Vue({
    el: '#COR403',
    data() {
        return {
            reg: {
                cont_llave_w: null,
                ano_llave_w: null,
                swradic_w: 'N',
                ano_res_w: null,
                mes_res_w: null,
                dia_res_w: null,
                tipo_corr_w: null,
                remitente_w: null,
                esta_res_w: null,
                dptoremi_w: null,
                asunto_w: null,
                admin_w: localStorage['Usuario'],
                dep_resp_w: null,
                responsable_w: null,
                cod_auxcorr_w: null,
                oper_modif: null,
                fecha_modif: null,
                novedad_w: null,
                descrip_w: null,
                serv_w: null,
                firma_w: null,
                cargo_w: null,
                reng_macro_w: null,
                cod_macro_w: null,
                tipo_macro_w: null,
                persentre_w: null,
                datos_w: null
            },
            reg_radicado: {
                llave: null,
                anio: null, mes: null, dia: null,
                hora: null,
            },
            form: {novedad:null},
            nom_pdf: null,
            original: null,
            nit_usu: $_USUA_GLOBAL[0].NIT,
            format_estado_inpt: null,
            //listados
            terceros: null,
            dependencias_remit: null,
            tipos_corres: null,
            aux_corres: null,
            servicios: null,
            dependencias: null,
            correspondencia: null,
            macros_correspondencia: null,
            respuestas_correspondencia: null
        }
    },
    computed: {
        fecha_num() {
            let fecha = $_USUA_GLOBAL[0].FECHALNK
            return {
                ano_num: moment().format('YYYY'),
                mes_num: fecha.substring(2, 4),
                dia_num: fecha.substring(4, 6),
            }
        },
    },
    created() {
        console.clear();

        nombreOpcion('4-3 - Respuesta Correspondencia');

        _inputControl('reset'); _inputControl('disabled'); loader('show');
        this.get_json(); this.dato_1();
    },
    methods: {
        /*------------- N A V E G A C I O N  Y  V A L I D A C I O N E S---------*/
        evaluar_novedad(novedad) {
            this.reset_form();
            const _this = this;
            _this.reg['novedad_w'] = novedad.id;

            !_this.respuestas_correspondencia
                ? this.salir_opcion()
                : (
                    (['7', '8', '9'].includes(_this.reg['novedad_w']))
                        ? this.dato_1()
                        : this.salir_opcion()
                )
            _this.form['novedad'] = `${novedad.id} - ${novedad.descripcion}`
        },
        dato_1() {
            this.reset_form();
            const _this = this;
            const novedad = parseInt(_this.reg['novedad_w']);
            let ano_num = this.fecha_num.ano_num;
            let cont_w = 1;
            _this.reg['ano_llave_w'] = ano_num;
            _this.reg_radicado['anio'] = parseInt(ano_num);

            if (novedad === 7) {
                _this.reg.cont_llave_w = 999999;
                let filtro_respuestas = _this.correspondencia.filter(x => parseInt(x.anio_llave) <= parseInt(ano_num))
                !filtro_respuestas
                    ? _this.reg.cont_llave_w = 0
                    : _this.reg.cont_llave_w = cont_w;
            }
            this.aceptar_radicado();
            document.getElementById('tipo_documento_cor403').value = '     OFICIOS    ';
        },
        aceptar_radicado() {
            const _this = this;
            parseInt(_this.reg['novedad_w']) != 7
                ? this.leer_correspondencia()
                : this.validar_radicado();
        },
        validar_radicado() {
            const _this = this;
            validarInputs(
                { form: "#validar_swradicado_cor403", orden: "1" },
                function volver() { $this.listado_tipos_correspondencia ? (_inputControl('disabled'), CON850(this.evaluar_novedad)) : this.salir_opcion(); },
                function avanzar() {
                    let pregunta = ['S', 'N'].includes(_this.reg['swradic_w'].toUpperCase().trim());
                    if (pregunta) {
                        this.leer_correspondencia();
                    } else (CON851('', 'Dato no valido', null, 'warning', 'Advertencia'), this.validar_radicado())
                })
        },
        /*------------------- V E N T A N A S ( F8 )------------------------*/
        ventana_macros_correspondencia() {
            const _this = this;
            _ventanaDatos({
                titulo: "VENTANA MACROS DE CORRESPONDENCIA",
                columnas: ["tipo", "codigo", "descripcion", "fecha", "oper"],
                size: '80',
                callback_esc: function () {
                    // document.getElementById('radicado_COR403').focus()
                },
                callback: function (data) {
                    // _this.reg.cont_llave_w = data['cont_llave'];
                    // _this.reg.ano_llave_w = data['ano_llave'];
                    // _enterInput('#radicado_COR401');
                },
                data: _this.macros_correspondencia,
            });
        },
        ventana_correspondencia() {
            const _this = this;
            _ventanaDatos({
                titulo: "VENTANA DE CORRESPONDENCIA",
                columnas: ["llave", "descrip_ter", "descrip_tipco", "fecha", "operdiri", "descrip_esta"],
                callback_esc: function () {
                    document.getElementById('radicado_COR403').focus()
                },
                callback: function (data) {
                    _this.reg.cont_llave_w = data['cont_llave'];
                    _this.reg.ano_llave_w = data['ano_llave'];
                    _enterInput('#radicado_COR401');
                },
                data: _this.correspondencia,
            });
        },
        ventana_tipos_correspondencia(caja) {
            const _this = this;
            _ventanaDatos({
                titulo: "VENTANA TIPOS DE CORRESPONDENCIA",
                columnas: ["codigo", "descripcion", "dias"], label: ["Código ", "Descripción", "Días"],
                callback_esc: () => _this.validar_descripcion(),
                callback: (data) => {
                    _this = `${data.codigo}- ${data.descripcion}`;
                    $this.actual['cod_serco'] = `${data.codigo}`;
                    _enterInput(`#input_codser_cor104`);
                },
                data: $this.listado_tipos_correspondencia
            });
        },
        ventana_terceros() {
            // const _this = this;
            // if (!_this.terceros) _this.validar_remitente()
            // else {
            _ventanaDatos_lite_v2({
                titulo: "VENTANA DE TERCEROS",
                indice: ["COD", "NOMBRE", "TELEF", "CIUDAD", "ACT"],
                mascara: [
                    {
                        COD: "Identificacion",
                        NOMBRE: "Nombre",
                        TELEF: "Telefono",
                        CIUDAD: "Ciudad",
                        ACT: "Actividad",
                    },
                ],
                data: _this.terceros,
                minLength: 3,
                callback_esc: function () {
                    // document.getElementById('nit_remitente_cor201').focus()
                },
                callback: function (data) {
                    // _this.reg.datos_w.nit_w = data['COD'];
                    // _enterInput('#nit_remitente_cor201');
                }
            });
        },
        /*----------------------- R U T I N A S ----------------------------*/
        async get_json() {
            let dependencias_remit = await get('dependencias_remit')
            this.dependencias_remit = dependencias_remit.remitentes

            let tipos_corres = await get('tipos')
            this.tipos_corres = tipos_corres.tipos

            let aux_corres = await get('aux_tipos')
            this.aux_corres = aux_corres.aux_tipo_corr

            let servicios = await get('servicios')
            this.servicios = servicios.servicios

            let dependencias = await get('dependencias')
            this.dependencias = dependencias.depen_cor

            let terceros = await get('terceros')
            this.terceros = terceros.TERCEROS

            let macros = await get('macros')
            this.macros_correspondencia = macros.macros_corr;

            let respuestas_correspondencia = await get('respuestas')
            this.respuestas_correspondencia = respuestas_correspondencia.respuestas;

            loader('hide');

            let correspondencia = await get('correspondencia')
            this.correspondencia = correspondencia.depencias

        },
        mostrar_datos() {

        },
        leer_correspondencia() {

        },
        reset_form() {
            _inputControl('reset');
            _inputControl('disabled');
        },
        buscar_comprobante() {
            return new Promise((resolve, reject) => {
                postData({ datosh: `${datosEnvio()}R4` },
                    get_url("APP/CONTAB/CON007.DLL"))
                    .then(data => {
                        let res = data.split('|')
                        let consecutivo = parseInt(res[1]) || 0

                        resolve(consecutivo - 1)
                    })
                    .catch(reject)
            })
        },
        salir_opcion() {
            const Window = BrowserWindow.getAllWindows();
            Window.length > 1
                ? _cerrarSegundaVentana()
                : (
                    _inputControl('disabled'),
                    _inputControl('reset'),
                    _toggleNav()
                )
        }
    }
})