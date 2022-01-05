var $this = new Object();
'use strict';
/** 
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Release Electron - cor107 RM Version / .
 *             Guarda actualizacion holding empresarial .
 **/
const { get } = require("../../COR/scripts/COR.ctrl.js");
new Vue(
  {
    el: '#COR107',
    data: {
      /*----------------V A R I A B L E S --------------*/
      form: {
        novedad: null,
        codigo: null,
        descripcion: null,
        activa: null
      },
      actual: {
        novedad: null,
        codigo: null,
        descripcion: null,
        activa: null,
        consulta: null
      },
      listado_holding: null
    },
    created() {
      $this = this;
      $this.init();
    },
    methods: {
      async init() {
        _inputControl('disabled'); _inputControl('reset');
        nombreOpcion('1,7 - Actualizar holding empresarial');
        $this.listado_holding = await get('holding');
        $this.listado_holding = $this.listado_holding['holding'];
        CON850($this.evaluar_novedad);
      },
      /*------------- N A V E G A C I O N  Y  V A L I D A C I O N E S---------*/
      evaluar_novedad(novedad) {
        $this.actual['novedad'] = novedad.id;
        $this.inicializar_formulario()
        if ($this.listado_holding) {
          if (['7', '8', '9'].includes($this.actual['novedad'])) $this.validar_codigo();
          else $this.salir_opcion();
        } else $this.salir_opcion();
        $this.form['novedad'] = `${novedad.id} - ${novedad.descripcion}`
      },
      validar_codigo() {
        validarInputs(
          { form: "#codigo_cor107", orden: "1" },
          function volver() { $this.listado_holding ? (_inputControl('disabled'), CON850($this.evaluar_novedad)) : $this.salir_opcion(); },
          function avanzar() {
            $this.actual['codigo'] = $this.form['codigo'];
            const novedad = parseInt($this.actual['novedad']);
            let consulta = $this.listado_holding.find(x => parseInt(x.codigo) === parseInt($this.actual['codigo']));
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
          { form: "#descripcion_cor107", orden: "1" },
          function volver() { $this.validar_codigo() },
          function avanzar() {
            $this.actual['descripcion'] = $this.form['descripcion'];
            $this.actual['descripcion'].trim() == ''
              ? CON851('', 'No puede dejar el campo vacío', $this.validar_descripcion, 'warning', 'Advertencia')
              : $this.validar_activa()
          })
      },
      validar_activa() {
        validarInputs(
          { form: "#activa_cor107", orden: "1" },
          function volver() { $this.validar_codigo() },
          function avanzar() {
            $this.actual['activa'] = $this.form['activa'];
            $this.actual['activa'].toUpperCase() == ('S' || 'N')
              ? $this.grabar_actualizacion_registro()
              : $this.form['activa'] = 'N';
          })
      },
      /*------------------- V E N T A N A S ( F8 )------------------------*/
      ventana_holding_empresarial() {
        const novedad = parseInt($this.actual['novedad']);
        if (novedad === 7) $this.ventana_terceros();
        else {
          _ventanaDatos(
            {
              titulo: "Ventana holding empresarial",
              columnas: ["codigo", "descripcion"], label: ["Código ", "Descripción"],
              callback_esc: () => $this.validar_codigo(),
              callback: (data) => {
                $this.form['codigo'] = `${data.codigo}`;
                $this.form['descripcion'] = `${data.descripcion}`;
                _enterInput(`#input_codigo_cor107`);
              },
              data: $this.listado_holding
            }
          );
        }
      },
      ventana_terceros() {
        parametros = {
          dll: 'TERCEROS',
          valoresselect: ['Buscar por nombre tercero'],
          f8data: 'TERCEROS',
          columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
          callback: (data) => {
            $this.form['codigo'] = data.COD;
            $this.actual['codigo'] = data.COD;
            $this.form['descripcion'] = data.COD;
            $this.actual['descripcion'] = data.NOMBRE;
            $this.consulta = {
              codigo: data.COD,
              descripcion: data.NOMBRE,
              activa: 'N'
            }

            _enterInput('#input_codigo_cor107');
          },
          cancel: $this.validar_codigo
        };
        F8LITE(parametros);
      },
      /*----------------------- R U T I N A S ----------------------------*/
      inicializar_formulario() {
        $this.form = {
          novedad: $this.form['novedad'],
          codigo: $this.actual['codigo'],
          descripcion: null
        }
      },
      mostrar_datos(data) {
        $this.form = {
          novedad: $this.form['novedad'],
          codigo: data.codigo,
          descripcion: `${data['descripcion']}`,
        }
        $this.actual['descripcion'] = data.descripcion;
        $this.actual['codigo'] = data.codigo;
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
          codigo: $this.actual['codigo'],
          descripcion: $this.actual['descripcion'].toUpperCase(),
          activa: $this.actual['activa'].toUpperCase()
        };
        postData(data_envio, get_url("APP/COR/CORR107.DLL"))
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