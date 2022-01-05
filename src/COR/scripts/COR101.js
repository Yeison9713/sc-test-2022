var $this = new Object();
'use strict';
/** 
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Release Electron - COR101 RM Version / .
 *             Guarda actualizacion dptos de servicios .
 **/
const { get } = require("../../COR/scripts/COR.ctrl.js");

new Vue(
    {
        el: '#COR101',
        data: {
            /*----------------V A R I A B L E S --------------*/
            form: {
                novedad: null,
                codigo: null,
                descripcion: null
            },
            actual: {
                novedad: null,
                codigo: null,
                descripcion: null
            },
            listado_servicios: null
        },
        created() {
            console.clear()
            $this = this;
            $this.init();
        },
        methods: {
            async init() {
                _inputControl('disabled'); _inputControl('reset');
                nombreOpcion('1,1 - Actualizar dpto servicios')
                $this.listado_servicios = await get('servicios');
                $this.listado_servicios = $this.listado_servicios['servicios'];
                CON850($this.evaluar_novedad)
            },
            /*------------- N A V E G A C I O N  Y  V A L I D A C I O N E S---------*/
            evaluar_novedad(novedad) {
                $this.actual['novedad'] = novedad.id;
                if ($this.listado_servicios) {
                    if (['7', '8', '9'].includes($this.actual['novedad'])) $this.validar_codigo();
                    else $this.salir_opcion();
                } else $this.salir_opcion();
                $this.form['novedad'] = `${novedad.id} - ${novedad.descripcion}`
            },
            validar_codigo() {
                validarInputs(
                    { form: "#codigo_cor101", orden: "1" },
                    function volver() {
                        if ($this.listado_servicios) {
                            $this.form['codigo'] = ''
                            $this.form['descripcion'] = ''
                            _inputControl('disabled')
                            CON850($this.evaluar_novedad)
                        } else {
                            $this.salir_opcion();
                        }
                    },
                    function avanzar() {
                        $this.actual['codigo'] = $this.form['codigo'] || '';
                        let codigo_format = $this.actual['codigo'].padStart(3, '0')
                        $this.form['codigo'] = codigo_format

                        const consulta = $this.listado_servicios.find(x => x.codigo === codigo_format);
                        const novedad = parseInt($this.actual['novedad']);
                        const existe = typeof consulta != 'undefined' ? true : false;
                        if ([8, 9].includes(novedad)) {
                            if (existe) {
                                $this.form['descripcion'] = ''
                                $this.actual['codigo'] = consulta ? consulta['codigo'] : $this.form['codigo']
                                $this.form['codigo'] = `${consulta ? consulta['codigo'] : $this.form['codigo']}`
                                $this.form['descripcion'] = `${consulta ? consulta['descripcion'] : ' '}`
                                parseInt($this.actual['novedad']) === 9
                                    ? CON851P('Seguro que desea eliminar los datos?', $this.validar_codigo, $this.grabar_actualizacion_registro)
                                    : $this.validar_descripcion()
                            } else {
                                $this.form['descripcion'] = ''
                                CON851('', 'dato invalido', null, 'warning', 'Advertencia')
                                $this.validar_codigo()
                            }
                        } else {
                            existe
                                ? (
                                    $this.form['descripcion'] = `${consulta ? consulta['descripcion'] : ' '}`,
                                    CON851('', 'Dato repetido, registro existente', null, 'warning', 'Advertencia'),
                                    $this.inicializar_datos(),
                                    $this.validar_codigo())
                                : $this.validar_descripcion()
                        }
                    })
            },
            validar_descripcion() {
                validarInputs(
                    { form: "#descripcion_cor101", orden: "1" },
                    function volver() { $this.validar_codigo() },
                    function avanzar() {
                        $this.actual['descripcion'] = $this.form['descripcion'];

                        if (!$this.actual['descripcion']) {
                            CON851('', 'No puede dejar el campo vacío', null, 'warning', 'Advertencia')
                            $this.validar_descripcion()
                        } else $this.grabar_actualizacion_registro()
                    })
            },
            /*------------------- V E N T A N A S ( F8 )------------------------*/
            ventana_dptoservicios() {
                _ventanaDatos(
                    {
                        titulo: "Ventana departamento de servicios",
                        columnas: ["codigo", "descripcion"], label: ["Código ", "Descripción"],
                        callback_esc: () => $this.validar_codigo(),
                        callback: (data) => {
                            $this.form['codigo'] = `${data.codigo}`;
                            $this.form['descripcion'] = `${data.descripcion}`;
                            _enterInput(`#input_codigo_cor101`);
                        },
                        data: $this.listado_servicios
                    }
                );
            },
            /*----------------------- R U T I N A S ----------------------------*/
            salir_opcion() {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) _cerrarSegundaVentana();
                else {
                    _inputControl('disabled');
                    _inputControl('reset');
                    _toggleNav();
                }
            },
            inicializar_datos() {
                $this.form = {
                    novedad: $this.actual['novedad'],
                    codigo: $this.actual['codigo'],
                    descripcion: null
                }
            },
            grabar_actualizacion_registro() {
                const novedad = parseInt($this.actual['novedad']);
                var data_envio = {};
                data_envio = {
                    datosh: `${datosEnvio()}${novedad}`,
                    codigo: $this.actual['codigo'],
                    descripcion: $this.actual['descripcion'],
                    oper_crea: novedad === 7 ? localStorage['Usuario'] : ' ',
                    fecha_crea: novedad === 7 ? moment().format('YYYYMMDD') : ' ',
                    oper_mod: novedad != 7 ? localStorage['Usuario'] : ' ',
                    fecha_mod: novedad != 7 ? moment().format('YYYYMMDD') : ' '
                };
                postData(data_envio, get_url("APP/COR/CORR101.DLL"))
                    .then(data => {
                        const msjs_res = { '7': 'Creado correctamente', '8': 'Modificado correctamente', '9': 'Eliminado correctamente' }
                        CON851('', msjs_res[$this.actual['novedad']], null, 'success', 'Exitoso');
                        $this.salir_opcion();
                    }).catch(e => {
                        CON851('', 'Error al actualizar servicio', null, 'error', 'Error');
                        loader('hide');
                        $this.salir_opcion()
                    })
            }
        }
    })