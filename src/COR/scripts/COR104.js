var $this = new Object();
'use strict';
/** 
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Release Electron - COR104 RM Version / .
 *             Guarda actualizacion auxiliar correspondencia.
 **/
const { get } = require("../../COR/scripts/COR.ctrl.js");
new Vue(
  {
    el: '#COR104',
    data: {
      /*----------------V A R I A B L E S --------------*/
      form: {
        novedad: null,
        codigo: null,
        descripcion: null,
        cod_serco: null,
      },
      actual: {
        novedad: null,
        codigo: null,
        descripcion: null,
        cod_serco: null,
      },
      listado_auxtipo_depen: null,
      listado_tipos_correspondencia: null,
    },
    created() {
      $this = this;
      $this.init();
    },
    methods: {
      async init() {
        _inputControl('disabled'); _inputControl('reset');
        nombreOpcion('1,4 - Actualizar auxiliar tipo correspondencia');
        $this.listado_auxtipo_depen = await get('aux_tipos');
        $this.listado_tipos_correspondencia = await get('tipos');
        $this.listado_auxtipo_depen = $this.listado_auxtipo_depen['aux_tipo_corr'];
        $this.listado_tipos_correspondencia = $this.listado_tipos_correspondencia['tipos'];
        CON850($this.evaluar_novedad)
      },
      /*------------- N A V E G A C I O N  Y  V A L I D A C I O N E S---------*/
      evaluar_novedad(novedad) {
        $this.actual['novedad'] = novedad.id;
        $this.inicializar_formulario()
        if ($this.listado_auxtipo_depen) {
          if (['7', '8', '9'].includes($this.actual['novedad'])) $this.validar_codigo();
          else $this.salir_opcion();
        } else $this.salir_opcion();
        $this.form['novedad'] = `${novedad.id} - ${novedad.descripcion}`
      },
      validar_codigo() {
        validarInputs(
          { form: "#codigo_cor104", orden: "1" },
          function volver() { $this.listado_auxtipo_depen ? (_inputControl('disabled'), CON850($this.evaluar_novedad)) : $this.salir_opcion(); },
          function avanzar() {
            $this.actual['codigo'] = $this.form['codigo'];
            const consulta = $this.listado_auxtipo_depen.find(x => parseInt(x.codigo) === parseInt($this.actual['codigo']));
            const novedad = parseInt($this.actual['novedad']);
            const existe = typeof consulta != 'undefined' ? true : false;
            if ([8, 9].includes(novedad)) {
              existe
                ? (
                  $this.mostrar_datos(consulta),
                  parseInt($this.actual['novedad']) === 9
                    ? CON851P('Seguro que desea eliminar los datos?', $this.salir_opcion, $this.grabar_actualizacion_registro)
                    : ($this.validar_cod_serco())
                )
                : (CON851('', 'dato invalido', null, 'warning', 'warning'), $this.validar_codigo)
            } else {
              console.log(existe)
              if(existe){
                $this.form['descripcion'] = `${consulta ? consulta['descripcion'] : ' '}`
                CON851('', 'Dato repetido, registro existente', null, 'warning', 'Advertencia')
                $this.validar_codigo()
              }else {
                // $this.inicializar_formulario()
                $this.validar_cod_serco()
              }
            }
          })
      },
      validar_cod_serco() {
        validarInputs(
          { form: "#cod_serco_cor104", orden: "1" },
          function volver() { $this.validar_codigo() },
          function avanzar() {
            $this.actual['cod_serco'] = $this.form['cod_serco'].split('-')[0];
            const consulta = $this.listado_tipos_correspondencia.find(x => parseInt(x.codigo) === parseInt($this.actual['cod_serco']));
            if (!consulta) {
              $this.actual['cod_serco'] = ''; $this.form['cod_serco'] = '';
              CON851('', 'No puede dejar el campo vacío', null, 'warning', 'Advertencia')
              $this.validar_cod_serco();
            } else {
              $this.form['cod_serco'] = `${consulta ? consulta['codigo'] + '- ' + consulta['descripcion'] : 'Sin descripcion'}`;
              $this.actual['cod_serco'] = consulta ? consulta['codigo'] : $this.form['codigo'];
              $this.validar_descripcion();
            }
          })
      },
      validar_descripcion() {
        validarInputs(
          { form: "#descripcion_cor104", orden: "1" },
          function volver() { $this.validar_cod_serco() },
          function avanzar() {
            $this.actual['descripcion'] = $this.form['descripcion'];
            !$this.actual['descripcion']
              ? (CON851('', 'No puede dejar el campo vacío', null, 'warning', 'Advertencia'), $this.validar_responsable())
              : $this.grabar_actualizacion_registro()
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
              _enterInput(`#input_codigo_cor104`);
            },
            data: $this.listado_auxtipo_depen
          }
        );
      },
      ventana_tipo_correspondencia() {
        _ventanaDatos(
          {
            titulo: "Ventana tipos correspondencia",
            columnas: ["codigo", "descripcion", "dias"], label: ["Código ", "Descripción", "Días"],
            callback_esc: () => $this.validar_descripcion(),
            callback: (data) => {
              $this.form['cod_serco'] = `${data.codigo}- ${data.descripcion}`;
              $this.actual['cod_serco'] = `${data.codigo}`;
              _enterInput(`#input_codser_cor104`);
            },
            data: $this.listado_tipos_correspondencia
          }
        );
      },
      /*----------------------- R U T I N A S ----------------------------*/
      inicializar_formulario() {
        $this.form = {
          novedad: null,
          codigo: null,
          cod_serco: null,
          descripcion: null,
        }
      },
      mostrar_datos(data) {
        const consultas = {
          servicio: $this.listado_tipos_correspondencia.find(x => parseInt(x.codigo) === parseInt(data.cod_serco)) || {},
          auxiliar: $this.listado_auxtipo_depen.find(x => parseInt(x.codigo) === parseInt(data.cod_serco)) || {}
        }

        $this.form = {
          novedad: $this.form['novedad'],
          codigo: data.codigo,
          cod_serco: `${data.cod_serco}-${consultas.servicio.descripcion}`,
          descripcion: `${data.descripcion}`,
        }
        $this.actual['cod_serco'] = data.cod_serco;
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
      grabar_actualizacion_registro() {
        const novedad = parseInt($this.actual['novedad']);
        var data_envio = {};
        data_envio = {
          datosh: `${datosEnvio()}${novedad}`,
          codigo: $this.actual['codigo'].padStart(3, '0'),
          descripcion: $this.actual['descripcion'].toUpperCase(),
          cod_serco: $this.actual['cod_serco'],
        };
        postData(data_envio, get_url("APP/COR/CORR104.DLL"))
          .then(data => {
            const msjs_res = { '7': 'Creado correctamente', '8': 'Modificado correctamente', '9': 'Eliminado correctamente' }
            CON851('', msjs_res[$this.actual['novedad']], null, 'success', 'Exitoso');
            $this.salir_opcion();
          }).catch(e => {
            CON851('', 'Error al actualizar estado', null, 'error', 'Error');
            loader('hide');
            $this.salir_opcion();
          })
      }
    }
  })