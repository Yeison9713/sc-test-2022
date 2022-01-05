var $this = new Object()
;('use strict')
/**
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Release Electron - cor402 RM Version / .
 *             Guarda actualizacion Actualiza macros respuesta correspondencia.
 *             FNF6 (CORR874) No existe para tipo empresa != H
 **/
const { get } = require('../../COR/scripts/COR.ctrl.js')
new Vue({
  el: '#COR402',
  data: {
    /*----------------V A R I A B L E S --------------*/
    form: {
      novedad: null,
      codigo: null,
      descripcion: null,
      macro: null,
      tipo: null,
    },
    actual: {
      novedad: null,
      codigo: null,
      descripcion: null,
      macro: null,
      tipo: null,
    },
    listado_macros_respusta: null,
    listado_tipos_correspondencia: null,
  },
  created() {
    $this = this
    $this.init()
  },
  mounted() {},
  methods: {
    async init() {
      _inputControl('disabled')
      _inputControl('reset')
      nombreOpcion('4,2 - Macro respuesta Corresp')

      $this.listado_macros_respusta = await get('macros')
      $this.listado_tipos_correspondencia = await get('tipos')
      $this.listado_macros_respusta =
        $this.listado_macros_respusta['macros_corr']
      $this.listado_tipos_correspondencia =
        $this.listado_tipos_correspondencia['tipos']
      CON850($this.evaluar_novedad)
    },
    /*------------- N A V E G A C I O N  Y  V A L I D A C I O N E S---------*/
    evaluar_novedad(novedad) {
      $this.actual['novedad'] = novedad.id
      if ($this.listado_macros_respusta) {
        if (['7', '8', '9'].includes($this.actual['novedad']))
          $this.validar_tipo()
        else $this.salir_opcion()
      } else $this.salir_opcion()
      $this.form['novedad'] = `${novedad.id} - ${novedad.descripcion}`
    },
    validar_tipo() {
      validarInputs(
        { form: '#tipo_cor402', orden: '1' },
        function volver() {
          $this.listado_tipos_correspondencia
            ? (_inputControl('disabled'), CON850($this.evaluar_novedad))
            : $this.salir_opcion()
        },
        function avanzar() {
          $this.actual['tipo'] = $this.form['tipo']
          const consulta = $this.listado_tipos_correspondencia.find(
            (x) => parseInt(x.codigo) === parseInt($this.actual['tipo']),
          )
          const existe = typeof consulta != 'undefined' ? true : false
          existe
            ? (($this.form['tipo'] = `${
                consulta
                  ? consulta['codigo'] + '- ' + consulta['descripcion']
                  : ' '
              }`),
              $this.validar_codigo())
            : (CON851('', 'dato invalido', null, 'warning', 'Advertencia'),
              $this.validar_tipo())
        },
      )
    },
    validar_codigo() {
      validarInputs(
        { form: '#codigo_cor402', orden: '1' },
        function volver() {
          $this.listado_macros_respusta
            ? (_inputControl('disabled'), $this.validar_tipo())
            : $this.salir_opcion()
        },
        function avanzar() {
          $this.actual['codigo'] = `${$this.form['codigo']}`
          let consulta = $this.listado_macros_respusta.find(
            (x) => parseInt(x.codigo) === parseInt($this.actual['codigo']),
          )
          consulta
            ? (consulta =
                parseInt(consulta.tipo) === parseInt($this.actual['tipo'])
                  ? consulta
                  : undefined)
            : false
          const novedad = parseInt($this.actual['novedad'])
          const existe = typeof consulta != 'undefined' ? true : false
          if ([8, 9].includes(novedad)) {
            existe
              ? ($this.mostrar_datos(consulta),
                ($this.actual['tipo'] = consulta.tipo),
                parseInt($this.actual['novedad']) === 9
                  ? CON851P(
                      'Seguro que desea eliminar los datos?',
                      $this.salir_opcion,
                      $this.grabar_actualizacion_registro,
                    )
                  : $this.validar_descripcion())
              : (CON851('', 'dato invalido', null, 'warning', 'Advertencia'),
                $this.inicializar_formulario(),
                $this.validar_tipo())
          } else {
            existe
              ? (($this.form['descripcion'] = `${
                  consulta ? consulta['descripcion'] : ' '
                }`),
                CON851(
                  '',
                  'Dato repetido, registro existente',
                  null,
                  'warning',
                  'Advertencia',
                ),
                $this.inicializar_formulario(),
                $this.validar_codigo())
              : ($this.inicializar_formulario(), $this.validar_descripcion())
          }
        },
      )
    },
    validar_descripcion() {
      validarInputs(
        { form: '#descripcion_cor402', orden: '1' },
        function volver() {
          $this.validar_codigo()
        },
        function avanzar() {
          $this.actual['descripcion'] = $this.form['descripcion']
          !$this.actual['descripcion']
            ? (CON851(
                '',
                'No puede dejar el campo vacío',
                null,
                'warning',
                'Advertencia',
              ),
              $this.validar_descripcion())
            : $this.validar_detalle_macro()
        },
      )
    },
    validar_detalle_macro() {
      validarInputs(
        { form: '#macro_cor402', orden: '1' },
        function volver() {
          $this.validar_descripcion()
        },
        function avanzar() {
          $this.actual['macro'] = $this.form['macro'].enterReplace()
          !$this.actual['macro']
            ? (CON851(
                '',
                'No puede dejar el campo vacío',
                null,
                'warning',
                'Advertencia',
              ),
              $this.validar_detalle_macro())
            : $this.confirmar()
        },
      )
    },
    /*------------------- V E N T A N A S ( F8 )------------------------*/
    ventana_macros_corr() {
      _ventanaDatos({
        titulo: 'Ventana macros correspondencia',
        columnas: ['codigo', 'tipo', 'descripcion', 'macro'],
        label: ['Código ', , 'Tipo', 'Descripción', 'Macro'],
        callback_esc: () => { document.getElementById('input_codigo_cor402').focus() },
        callback: (data) => {
          console.log('data', data)
          $this.form['codigo'] = `${data.codigo}`
          $this.form['descripcion'] = `${data.descripcion}`
          _enterInput(`#input_codigo_cor402`)
        },
        data: $this.listado_macros_respusta.filter(
          (x) => parseInt(x.tipo) === parseInt($this.actual['tipo']),
        ),
      })
    },
    ventana_tipo_correspondencia() {
      _ventanaDatos({
        titulo: 'Ventana tipos correspondencia',
        columnas: ['codigo', 'descripcion', 'dias'],
        label: ['Código ', 'Descripción', 'Días'],
        callback_esc: () => { document.getElementById('input_tipo_cor402').focus() },
        callback: (data) => {
          $this.form['tipo'] = `${data.codigo}- ${data.descripcion}`
          $this.actual['tipo'] = `${data.codigo}`
          _enterInput(`#input_tipo_cor402`)
        },
        data: $this.listado_tipos_correspondencia,
      })
    },
    /*----------------------- R U T I N A S ----------------------------*/
    confirmar() {
      CON851P('01', $this.validar_descripcion, () => {
        setTimeout(() => {
          $this.grabar_actualizacion_registro()
        }, 300)
      })
    },
    inicializar_formulario() {
      $this.form['descripcion'] = null
      $this.form['macro'] = null
      $this.actual['macro'] = null
      $this.actual['descripcion'] = null
    },
    mostrar_datos(data) {
      const data_tipo = $this.listado_tipos_correspondencia.find(
        (x) => parseInt(x.codigo) == parseInt(data.tipo),
      )
      $this.form = {
        novedad: $this.form['novedad'],
        codigo: parseInt(data.codigo).toString().padStart(3, '0'),
        tipo: `${data_tipo.codigo}-${data_tipo.descripcion}`,
        descripcion: `${data['descripcion']}`,
        macro: `${data['macro']
          .toString()
          .enterPut()
          .replace(/,/g, ' ')
          .trim()}`,
      }
      $this.actual['descripcion'] = data.descripcion
      $this.actual['codigo'] = data.codigo
      $this.actual['macro'] = `${data['macro']
        .toString()
        .enterPut()
        .replace(/,/g, ' ')
        .trim()}`
    },
    salir_opcion() {
      let Window = BrowserWindow.getAllWindows()
      if (Window.length > 1) _cerrarSegundaVentana()
      else {
        _inputControl('disabled')
        _inputControl('reset')
        _toggleNav()
      }
    },
    grabar_actualizacion_registro() {
      const novedad = parseInt($this.actual['novedad'])
      var data_envio = {}
      data_envio = {
        datosh: `${datosEnvio()}${novedad}`,
        codigo: `${$this.actual['codigo']}`,
        tipo: `${$this.actual['tipo']}`,
        descripcion: $this.actual['descripcion'].toUpperCase(),
        oper: localStorage['Usuario'],
        fecha_oper: moment().format('YYYYMMDD'),
      }
      if (novedad != 9) {
        let array = $this.actual['macro'].strToTable()
        for (indice in array) data_envio[indice] = array[indice]
      }

      postData(data_envio, get_url('APP/COR/CORR402.DLL'))
        .then((data) => {
          console.log(data)
          const msjs_res = {
            '7': 'Creado correctamente',
            '8': 'Modificado correctamente',
            '9': 'Eliminado correctamente',
          }
          CON851(
            '',
            msjs_res[$this.actual['novedad']],
            null,
            'success',
            'Exitoso',
          )
          $this.salir_opcion()
        })
        .catch((e) => {
          CON851('', 'Error al actualizar estado', null, 'error', 'Error')
          loader('hide')
          $this.salir_opcion()
        })
    },
  },
})
