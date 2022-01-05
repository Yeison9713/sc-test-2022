var $this = new Object();
'use strict';
/** 
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Release Electron - COR102 RM Version / .
 *             Guarda actualizacion dependencias.
 **/
const { get } = require("../../COR/scripts/COR.ctrl.js");
new Vue(
    {
        el: '#COR102',
        data: {
            /*----------------V A R I A B L E S --------------*/
            form: {
                novedad: null,
                codigo: null,
                descripcion: null,
                responsable: null,
                oper: null,
                cargo: null,
                correo: null
            },
            actual: {
                novedad: null,
                codigo: null,
                descripcion: null,
                responsable: null,
                oper: null,
                cod_serco: null,
                cargo: null,
                correo: null
            },
            listado_dependencias: null,
            listado_servicios: null,
            listado_operadores_sistema: null,
        },
        created() {
            $this = this;
            $this.init();
        },
        methods: {
            async init() {
                _inputControl('disabled'); _inputControl('reset');
                nombreOpcion('1,2 - Actualizar dependencias correspondencia');
                await $this.cargar_listados();
                CON850($this.evaluar_novedad)
            },
            /*------------- N A V E G A C I O N  Y  V A L I D A C I O N E S---------*/
            evaluar_novedad(novedad) {
                $this.actual['novedad'] = novedad.id;
                $this.inicializar_formulario()
                if ($this.listado_dependencias) {
                    if (['7', '8', '9'].includes($this.actual['novedad'])) $this.validar_codigo();
                    else $this.salir_opcion();
                } else $this.salir_opcion();
                $this.form['novedad'] = `${novedad.id} - ${novedad.descripcion}`
            },
            validar_codigo() {
                validarInputs(
                    { form: "#codigo_cor102", orden: "1" },
                    function volver() { $this.listado_dependencias ? (_inputControl('disabled'), CON850($this.evaluar_novedad)) : $this.salir_opcion(); },
                    function avanzar() {
                        $this.actual['codigo'] = $this.form['codigo'];
                        const consulta = $this.listado_dependencias.find(x => parseInt(x.codigo) === parseInt($this.actual['codigo']));
                        const novedad = parseInt($this.actual['novedad']);
                        const existe = typeof consulta != 'undefined' ? true : false;
                        if ([8, 9].includes(novedad)) {
                            existe
                                ? (
                                    $this.mostrar_datos(consulta),
                                    parseInt($this.actual['novedad']) === 9
                                        ? CON851P('Seguro que desea eliminar los datos?', $this.salir_opcion, $this.grabar_actualizacion_registro)
                                        : ($this.validar_descripcion())
                                )
                                : (CON851('', 'dato invalido', null, 'warning', 'Advertencia'), $this.validar_codigo())
                        } else {
                            existe
                                ? (
                                    $this.form['descripcion'] = `${consulta ? consulta['descripcion'] : ' '}`,
                                    CON851('', 'Dato repetido, registro existente', null, 'warning', 'Advertencia'),
                                    $this.validar_codigo())
                                : ($this.inicializar_formulario(), $this.validar_descripcion())
                        }
                    })
            },
            validar_descripcion() {
                validarInputs(
                    { form: "#descripcion_cor102", orden: "1" },
                    function volver() { $this.validar_codigo() },
                    function avanzar() {
                        let descripcion = $this.form['descripcion'] || ''
                        $this.actual['descripcion'] = descripcion.split('-')[0];
                        const consulta = $this.listado_servicios.find(x => parseInt(x.codigo) === parseInt($this.actual['descripcion']));
                        if (!consulta) {
                            $this.actual['descripcion'] = ''; $this.form['descripcion'] = '';
                            CON851('', 'No puede dejar el campo vacío', null, 'warning', 'Advertencia')
                            $this.validar_descripcion();
                        } else {

                            $this.form['descripcion'] = `${consulta ? consulta['codigo'] + '- ' + consulta['descripcion'] : 'Sin descripcion'}`;
                            $this.actual['descripcion'] = consulta ? consulta['codigo'] : $this.form['codigo'];
                            $this.actual['descripcion'] = consulta['descripcion'];
                            $this.actual['cod_serco'] = consulta['codigo'];
                            $this.validar_responsable();
                        }
                    })
            },
            validar_responsable() {
                validarInputs(
                    { form: "#responsable_cor102", orden: "1" },
                    function volver() { $this.validar_descripcion() },
                    function avanzar() {
                        $this.actual['responsable'] = $this.form['responsable'];
                        !$this.actual['responsable']
                            ? (CON851('', 'No puede dejar el campo vacío', null, 'warning', 'Advertencia'), $this.validar_responsable())
                            : $this.validar_cargo()
                    })
            },
            validar_cargo() {
                validarInputs(
                    { form: "#cargo_cor102", orden: "1" },
                    function volver() { $this.validar_responsable() },
                    function avanzar() {
                        $this.actual['cargo'] = $this.form['cargo'];
                        if (!$this.actual.cargo) {
                            $this.actual['cargo'] = ''; $this.form['cargo'] = '';
                            $this.validar_cargo();
                        } else $this.validar_correo();
                    })
            },
            validar_correo() {
                validarInputs(
                    { form: "#correo_cor102", orden: "1" },
                    function volver() { $this.validar_cargo() },
                    function avanzar() {
                        $this.actual['correo'] = $this.form['correo'];
                        if (!$this.actual['correo']) {
                            CON851('', 'No puede dejar el campo vacío', null, 'warning', 'Advertencia')
                            $this.validar_correo()
                        } else $this.validar_oper()
                    })
            },
            validar_oper() {
                validarInputs(
                    { form: "#oper_cor102", orden: "1" },
                    function volver() { $this.validar_correo() },
                    function avanzar() {
                        $this.actual['oper'] = $this.form['oper'];
                        const consulta = $this.listado_operadores_sistema.find(x => x.CODIGO === $this.actual['oper']);
                        if (!consulta) {
                            $this.actual['oper'] = ''; $this.form['oper'] = '';
                            CON851("01", "registrado buscado inexistente", null, "error", "error");
                            $this.validar_oper();
                        } else {
                            $this.form['oper'] = consulta['CODIGO']
                            $this.actual['oper'] = consulta['CODIGO']
                            document.getElementById('descrip_oper_cor102').value = consulta['DESCRIPCION']
                            $this.grabar_actualizacion_registro();
                        }
                    })
            },
            /*------------------- V E N T A N A S ( F8 )------------------------*/
            ventana_dependencias_correspondencia() {
                _ventanaDatos(
                    {
                        titulo: "Ventana dependencias correspondencia",
                        columnas: ["codigo", "descripcion"], label: ["Código ", "Descripción"],
                        callback_esc: () => $this.validar_codigo(),
                        callback: (data) => {
                            $this.form['codigo'] = `${data.codigo}`;
                            $this.form['descripcion'] = `${data.descripcion}`;
                            _enterInput(`#input_codigo_cor102`);
                        },
                        data: $this.listado_dependencias
                    }
                );
            },
            ventana_servicios() {
                _ventanaDatos(
                    {
                        titulo: "Ventana servicios correspondencia",
                        columnas: ["codigo", "descripcion"], label: ["Código ", "Descripción"],
                        callback_esc: () => $this.validar_cargo(),
                        callback: (data) => {
                            $this.form['descripcion'] = `${data.codigo}- ${data.descripcion}`;
                            $this.actual['descripcion'] = `${data.codigo}`;
                            $this.actual['cod_serco'] = `${data.codigo}`;
                            _enterInput(`#input_descripcion_cor102`);
                        },
                        data: $this.listado_servicios
                    }
                );
            },
            ventana_oper_sistema() {
                _ventanaDatos(
                    {
                        titulo: "Ventana operadores del sistema (esq. seguridad)",
                        columnas: ["CODIGO", "DESCRIPCION", "ID"], label: ["Código ", "Descripción", "CC"],
                        callback_esc: () => $this.validar_oper(),
                        callback: (data) => {
                            $this.form['oper'] = data.CODIGO;
                            $this.actual['oper'] = data.CODIGO;
                            _enterInput(`#input_oper_cor102`);
                        },
                        data: $this.listado_operadores_sistema
                    }
                );
            },
            /*----------------------- R U T I N A S ----------------------------*/
            async cargar_listados() {
                $this.listado_dependencias = await get('dependencias');
                $this.listado_servicios = await get('servicios');
                $this.listado_operadores_sistema = await get('oper_sistema');

                $this.listado_dependencias = $this.listado_dependencias['depen_cor'];
                $this.listado_servicios = $this.listado_servicios['servicios'];
                $this.listado_operadores_sistema = $this.listado_operadores_sistema['ARCHREST'];
            },
            mostrar_datos(data) {
                console.log('data', data)
                const consultas = {
                    operador:
                        $this.listado_operadores_sistema.find(x =>
                            x.CODIGO === data.oper
                        ),
                }
                
                $this.form = {
                    novedad: $this.form['novedad'],
                    codigo: data.codigo,
                    descripcion: `${data.cod_serco}-${data.descripcion}`,
                    responsable: data.responsable,
                    oper: data.oper,
                    cargo: data.cargo,
                    correo: data.correo
                }

                $this.actual['cod_serco'] = data.cod_serco;
                $this.actual['oper'] = data.oper;
                $this.actual['cargo'] = data.cargo;
                document.getElementById('descrip_oper_cor102').value = consultas.operador ? consultas.operador.DESCRIPCION : ''
            },
            salir_opcion() {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) _cerrarSegundaVentana();
                else {
                    _inputControl('disabled');
                    _inputControl('reset');
                    _toggleNav();
                }
            },
            inicializar_formulario() {
                $this.form = {
                    novedad: $this.form['novedad'],
                    codigo: $this.actual['codigo'],
                    descripcion: null,
                    responsable: null,
                    oper: null,
                    cargo: null,
                    correo: null
                }
            },
            grabar_actualizacion_registro() {
                const novedad = parseInt($this.actual['novedad']);
                var data_envio = {};
                data_envio = {
                    datosh: `${datosEnvio()}${novedad}|`,
                    codigo: $this.actual['codigo'].padStart(3, '0'),
                    descripcion: $this.actual['descripcion'].toUpperCase(),
                    responsable: $this.actual['responsable'].toUpperCase(),
                    oper: $this.actual['oper'].toUpperCase(),
                    cargo: $this.actual['cargo'].toUpperCase(),
                    correo: $this.actual['correo'],
                    cod_serco: $this.actual['cod_serco'],
                };
                postData(data_envio, get_url("APP/COR/CORR102.DLL"))
                    .then(data => {
                        const msjs_res = { '7': 'Creado correctamente', '8': 'Modificado correctamente', '9': 'Eliminado correctamente' }
                        CON851('', msjs_res[$this.actual['novedad']], null, 'success', 'Exitoso');
                        $this.salir_opcion();
                    }).catch(e => {
                        CON851('', 'Error al actualizar estado', null, 'error', 'Error');
                        $this.validar_oper();
                    })
            }
        }
    })