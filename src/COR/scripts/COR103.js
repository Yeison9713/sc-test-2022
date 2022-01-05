var $this = new Object();
'use strict';
/** 
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Release Electron - COR103 RM Version / .
 *             Guarda actualizacion tipos correspondencia.
 **/
const { get } = require("../../COR/scripts/COR.ctrl.js");
new Vue(
  {
    el: '#COR103',
    data: {
      /*----------------V A R I A B L E S --------------*/
      form: {
        novedad: null,
        codigo: null,
        descripcion: null,
        max_dias: null
      },
      actual: {
        novedad: null,
        codigo: null,
        descripcion: null,
        max_dias: null
      },
      listado_tipos_correspondencia: null
    },
    created() {
      $this = this;
      $this.init();
    },
    methods: {
      async init() {
        _inputControl('disabled'); _inputControl('reset');
        nombreOpcion('1,3 - Actualizar tipo correspondencia');
        $this.listado_tipos_correspondencia = await get('tipos');
        $this.listado_tipos_correspondencia = $this.listado_tipos_correspondencia['tipos'];
        CON850($this.evaluar_novedad)
      },
      /*------------- N A V E G A C I O N  Y  V A L I D A C I O N E S---------*/
      evaluar_novedad(novedad) {
        $this.actual['novedad'] = novedad.id;
        // $this.inicializar_formulario()
        if ($this.listado_tipos_correspondencia) {
          if (['7', '8', '9'].includes($this.actual['novedad'])) $this.validar_codigo();
          else $this.salir_opcion();
        } else $this.salir_opcion();
        $this.form['novedad'] = `${novedad.id} - ${novedad.descripcion}`
      },
      validar_codigo() {
        validarInputs(
          { form: "#codigo_cor103", orden: "1" },
          function volver() { $this.listado_tipos_correspondencia ? (_inputControl('disabled'), CON850($this.evaluar_novedad)) : $this.salir_opcion(); },
          function avanzar() {
            $this.actual['codigo'] = $this.form['codigo'];
            const consulta = $this.listado_tipos_correspondencia.find(x => parseInt(x.codigo) === parseInt($this.actual['codigo']));
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
                  $this.mostrar_datos(consulta),
                  CON851('', 'Dato repetido, registro existente', null, 'warning', 'Advertencia'),
                  $this.validar_codigo())
                : ($this.inicializar_datos(), $this.validar_descripcion())
            }
          })
      },
      validar_descripcion() {
        validarInputs(
          { form: "#descripcion_cor103", orden: "1" },
          function volver() { $this.validar_codigo() },
          function avanzar() {
            $this.actual['descripcion'] = $this.form['descripcion'];
            !$this.actual['descripcion']
              ? (CON851('', 'No puede dejar el campo vacío', null, 'warning', 'Advertencia'), $this.validar_descripcion())
              : $this.validar_dias()
          })
      },
      validar_dias() {
        validarInputs(
          { form: "#dias_cor103", orden: "1" },
          function volver() { $this.validar_descripcion() },
          function avanzar() {
            $this.actual['dias'] = $this.form['dias'];
            $this.actual['dias'].trim() == ''
              ? (CON851('', 'No puede dejar el campo vacío', null, 'warning', 'Advertencia'), $this.validar_dias())
              : $this.grabar_actualizacion_registro()
          })
      },
      /*------------------- V E N T A N A S ( F8 )------------------------*/
      ventana_tipos_correspondencia() {
        _ventanaDatos(
          {
            titulo: "Ventana tipos de correspondencia",
            columnas: ["codigo", "descripcion", "dias"], label: ["Código ", "Descripción", "Máximo (dias)"],
            callback_esc: () => $this.validar_codigo(),
            callback: (data) => {
              $this.form['codigo'] = `${data.codigo}`;
              $this.actual['codigo'] = `${data.codigo}`;
              $this.actual['descripcion'] = `${data.descripcion}`;
              _enterInput(`#input_codigo_cor103`);
            },
            data: $this.listado_tipos_correspondencia
          }
        );
      },
      /*----------------------- R U T I N A S ----------------------------*/
      inicializar_datos() {
        $this.form = {
          novedad: $this.form['novedad'],
          codigo: $this.actual['codigo'],
          descripcion: null,
          dias: null
        }
      },
      mostrar_datos(data) {
        $this.form = {
          novedad: $this.form['novedad'],
          descripcion: data.descripcion,
          codigo: data.codigo.padStart(2, '0'),
          dias: data.dias,
        }
        $this.actual = {
          novedad: $this.form['novedad'],
          codigo: data.codigo,
          dias: data.dias,
        }
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
          codigo: $this.actual['codigo'].padStart(2, '0'),
          descripcion: $this.actual['descripcion'].toUpperCase(),
          dias: $this.actual['dias'].padStart(3, '0'),
        };

        postData(data_envio, get_url("APP/COR/CORR103.DLL"))
          .then(data => {
            const msjs_res = { '7': 'Creado correctamente', '8': 'Modificado correctamente', '9': 'Eliminado correctamente' }
            CON851('', msjs_res[novedad], null, 'success', 'Exitoso');
            $this.salir_opcion();
          }).catch(e => {
            console.log('Error', e)
            CON851('', 'Error al actualizar estado', null, 'error', 'Error');
            loader('hide');
            $this.salir_opcion();
          })
      }
    }
  })