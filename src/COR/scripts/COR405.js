const {
  get,
  init_resp_w,
  CORR405P,
  enviar_correspondencia,
} = require('../../COR/scripts/COR.ctrl.js')

new Vue({
  el: '#COR405',
  data() {
    return {
      novedad: {},
      reg: init_resp_w(),
      reg_radicado: {
        cont_llave: null,
        ano_llave: null,
        esta: null,
      },
      original: null,
      sw_paso: 0,

      terceros: [],
      dependencias_remit: [],
      tipos_corres: [],
      aux_corres: [],
      servicios: [],
      dependencias: [],
      macros: [],

      medios_respuesta: [
        { id: 1, label: 'CORREO CERTIFICADO' },
        { id: 2, label: 'E-MAIL' },
        { id: 3, label: 'PERSONAL' },
      ],

      estados_respuesta: [
        { id: 1, label: 'EN TRAMITE' },
        { id: 2, label: 'VENCIDA' },
        { id: 3, label: 'RESUELTA' },
        { id: 4, label: 'RESUELTA' },
        { id: 5, label: 'PRORROGA' },
      ],

      format_estado_inpt: null,
      format_procedencia: null,
      format_medio_respuesta: null,

      monto_mask: null,

      correspondencia_pendiente: [],
    }
  },
  watch: {
    'reg.respuesta_w': function (val) {
      this.reg.respuesta_w = val ? val.replaceEsp() : ''
    },
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
  mounted() {
    this.monto_mask = new IMask(this.$refs.monto_input_cor405, {
      mask: Number,
      min: -999999999999,
      max: 999999999999,
      scale: 2,
      thousandsSeparator: ',',
      radix: '.',
    })
  },
  created() {
    console.clear()
    _vm = this

    nombreOpcion('4-5 - Respuesta Correspondencia Manual')
    _inputControl('reset')
    _inputControl('disabled')
    loader('show')
    this.get_json()
  },
  methods: {
    dato_1() {
      this.reset_form()
      CON850(this.validar_novedad)
    },
    validar_novedad(novedad) {
      this.novedad = novedad
      switch (novedad.id) {
        case '7':
        case '8':
        case '9':
          this.condiciones_novedad()
          break
        default:
          _toggleNav()
          break
      }
    },
    async condiciones_novedad() {
      const _this = this
      let reg = _this.reg
      let novedad = _this.novedad.id

      let ano_num = _this.fecha_num.ano_num
      reg.ano_llave_w = parseInt(ano_num)

      if (novedad == '7') {
        await postData(
          {
            // Consulta de nuevo consecutivo
            datosh: datosEnvio(),
            paso: '1',
            novedad: '7',
          },
          get_url('APP/COR/CORR864.DLL'),
        )
          .then((data) => {
            _this.reg.cont_w = data.cont_llave
            _this.aceptar_radicado()
          })
          .catch((err) => {
            console.error('-> Error', err)
            _this.dato_1()
          })
      } else {
        this.validar_anio_res()
      }
    },
    validar_anio_res() {
      const _this = this
      validarInputs(
        {
          form: '#validar_anio_res_COR405',
          orden: '1',
        },
        _this.dato_1,
        () => {
          let ano_res = this.reg.ano_llave_w || ''
          this.reg.ano_llave_w = ano_res.toString().padStart(4, '0')

          _this.validar_cont_res()
        },
      )
    },
    validar_cont_res() {
      const _this = this
      validarInputs(
        {
          form: '#validar_cont_res_COR405',
          orden: '1',
        },
        _this.validar_anio_res,
        () => {
          let cont_res = this.reg.cont_w || ''
          this.reg.cont_w = cont_res.toString().padStart(6, '0')
          _this.aceptar_radicado()
        },
      )
    },
    aceptar_radicado() {
      let novedad = this.novedad.id
      if (novedad != '7' && this.sw_paso == 0) this.leer_resp_correspondencia()
      else this.validar_radicado()
    },
    validar_radicado() {
      const _this = this
      validarInputs(
        {
          form: '#validar_radicado_COR405',
          orden: '1',
        },
        _this.dato_1,
        () => {
          let novedad = this.novedad.id
          let radicado = _this.reg.sw_radi_w || ''
          let radicado_up = radicado.toUpperCase()
          _this.reg.sw_radi_w = radicado_up

          if (radicado_up != 'S' && radicado_up != 'N') {
            CON851('03', '03', null, 'error', 'Error')
            _this.validar_radicado()
          } else if (radicado_up == 'S' && novedad == '7')
            _this.validar_nro_radicado()
          else if (radicado_up == 'S' && novedad != '7') _this.validar_asunto()
          else _this.validar_nit()
        },
      )
    },
    validar_asunto() {
      const _this = this
      validarInputs(
        {
          form: '#validar_asunto_405',
          orden: '1',
        },
        _this.dato_1, // Validar callback
        () => {
          let asunto = _this.reg.asunto_w || ''
          _this.reg.asunto_w = asunto.toUpperCase()
          _this.toma_fechas()
        },
      )
    },
    toma_fechas() {
      if (this.novedad.id == '7') {
        this.reg.fecha_w = moment().format('YYYY-MM-DD')
        this.reg.hora_w = moment().format('HH:mm')
      }

      this.validar_tipo_macro()
    },
    validar_tipo_macro() {
      const _this = this
      validarInputs(
        {
          form: '#validar_tipo_macro_COR405',
          orden: '1',
        },
        _this.validar_asunto,
        () => {
          let tipo = _this.reg.cl_macro_w || ''
          let tipo_format = tipo.padStart(2, '0')
          _this.reg.cl_macro_w = tipo_format

          let busqueda_tipo = _this.tipos_corres.find(
            (el) => el.codigo.padStart(2, '0') == tipo_format,
          )
          if (busqueda_tipo) {
            _this.validar_cod_macro()
          } else {
            _this.validar_tipo_macro()
            CON851('01', '01', null, 'error', 'Advertencia')
          }
        },
      )
    },
    validar_cod_macro() {
      const _this = this
      validarInputs(
        {
          form: '#validar_cod_macro_COR405',
          orden: '1',
        },
        _this.validar_asunto,
        () => {
          let tipo = _this.reg.codigo_macro_w || ''
          let tipo_format = tipo.padStart(6, '0')
          _this.reg.codigo_macro_w = tipo_format

          let busqueda = _this.macros.find(
            (el) => el.codigo.padStart(6, '0') == tipo_format,
          )
          if (busqueda) {
            let macro = busqueda.macro
              .toString()
              .enterPut()
              .replace(/,/g, ' ')
              .trim()

            document.getElementById('descripcion_macro_COR405').value =
              busqueda.descripcion
            let respuesta = macro
            _this.reg.respuesta_w = respuesta.trim()
            _this.validar_respuesta()
          } else {
            _this.validar_cod_macro()
            CON851('01', '01', null, 'error', 'Advertencia')
          }
        },
      )
    },
    validar_respuesta() {
      const _this = this
      validarInputs(
        {
          form: '#validar_respuesta_COR405',
          orden: '1',
        },
        _this.validar_cod_macro,
        // _this.validar_responsable
        _this.validar_medio_respuesta,
      )
    },
    validar_medio_respuesta() {
      const _this = this
      POPUP(
        {
          titulo: 'Medio de respuesta',
          indices: [{ id: 'id', label: 'label' }],
          seleccion: _this.reg.med_resp_w || '1',
          array: _this.medios_respuesta,
          callback_f: () => {
            setTimeout(_this.validar_respuesta, 300)
          },
        },
        (data) => {
          _this.reg.med_resp_w = data.id
          _this.format_medio_respuesta = `${data.id} - ${data.label}`

          if (data.id === 1) _this.validar_factura()
          else {
            _this.reg.nro_fact_w = null
            _this.reg.nro_guia_w = null
            _this.reg.persentre_w = null
            _this.monto_mask.unmaskedValue = '0'

            _this.validar_responsable()
          }
        },
      )
    },
    validar_factura() {
      const _this = this
      validarInputs(
        {
          form: '#validar_factura_cor405',
          orden: '1',
        },
        _this.validar_medio_respuesta,
        _this.validar_monto,
      )
    },
    validar_monto() {
      const _this = this
      validarInputs(
        {
          form: '#validar_monto_cor405',
          orden: '1',
        },
        _this.validar_factura,
        _this.validar_guia,
      )
    },
    validar_guia() {
      const _this = this
      validarInputs(
        {
          form: '#validar_guia_cor405',
          orden: '1',
        },
        _this.validar_monto,
        _this.validar_persona_entrega,
      )
    },
    validar_persona_entrega() {
      const _this = this
      validarInputs(
        {
          form: '#validar_persona_entre_cor405',
          orden: '1',
        },
        _this.validar_guia,
        _this.validar_responsable,
      )
    },
    validar_responsable() {
      const _this = this
      let servicio = _this.reg.dep_w || ''
      let servicio_format = servicio.padStart(3, '0')
      let busqueda = _this.dependencias.find(
        (el) => el.codigo.padStart(3, '0') == servicio_format,
      )
      let admin_w = localStorage.Usuario

      if (_this.reg.sw_radi_w == 'N') _this.reg.firma_w = admin_w
      else _this.reg.firma_w = busqueda ? busqueda.oper : ''
      _this.reg.respon_w = busqueda ? busqueda.responsable : ''

      validarInputs(
        {
          form: '#validar_respon_COR405',
          orden: '1',
        },
        _this.validar_medio_respuesta,
        () => {
          _this.validar_cargo()
        },
      )
    },
    validar_cargo() {
      const _this = this
      validarInputs(
        {
          form: '#validar_cargo_COR405',
          orden: '1',
        },
        _this.validar_responsable,
        _this.validar_estado,
      )
    },
    validar_estado() {
      const _this = this
      POPUP(
        {
          titulo: 'Estado de correspondencia',
          indices: [{ id: 'id', label: 'label' }],
          seleccion: _this.reg.esta_w || '4',
          array: _this.estados_respuesta,
          callback_f: () => {
            setTimeout(_this.validar_respuesta, 300)
          },
        },
        (data) => {
          _this.reg.esta_w = data.id
          _this.format_estado_inpt = `${data.id} - ${data.label}`

          if (_this.novedad.id == '7') _this.solicitar_adjunto()
          else _this.validar_guardado()
        },
      )
    },
    solicitar_adjunto() {
      $('#modal_adjuntos_cor405').modal('show')
    },
    validar_adjunto() {
      let inputs = this.$refs.input_archivo_cor405
      let archivo = inputs.files
      if (archivo.length == 0)
        CON851(
          '99',
          'Debes adjuntar un archivo PDF',
          null,
          'error',
          'Advertencia',
        )
      else {
        $('#modal_adjuntos_cor405').modal('hide')
        setTimeout(this.validar_guardado, 300)
      }
    },
    validar_guardado() {
      CON851P(
        '01',
        () => {
          setTimeout(this.validar_estado, 300)
        },
        () => {
          loader('show')
          if (this.novedad.id == '7') this.subir_archivo()
          else this.guardar()
          // this.guardar()
        },
      )
    },
    subir_archivo() {
      const _this = this
      let inputs = _this.$refs.input_archivo_cor405
      let archivo = inputs.files[0]

      let ano_radicado = this.reg.ano_llave_w
      let radicado = this.reg.cont_w
      let nombre_archivo = `RES-${radicado}.PDF`

      const envio = new FormData()
      envio.append('opcion', 'COR201')
      envio.append('carpeta', ano_radicado)
      envio.append('archivo', archivo, nombre_archivo)

      let error_subida = (error) => {
        console.error('-> Error subida', error)
        loader('hide')
        CON851(
          '99',
          'Ha ocurrido un error intentando subir el archivo adjunto.',
          null,
          'error',
          'Advertencia',
        )
        _this.solicitar_adjunto()
      }

      fetch(get_url('app/inc/upFile.global.php'), {
        method: 'POST',
        body: envio,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code != 0) error_subida(res)
          else if (res.msj.error && res.msj.error.length > 0) error_subida(res)
          else {
            CON851(
              '',
              'Adjunto subido correctamente',
              null,
              'success',
              'Correcto',
            )
            _this.guardar()
          }
        })
        .catch(error_subida)
    },
    guardar() {
      const _this = this
      let novedad = this.novedad.id

      let base = JSON.parse(JSON.stringify(this.original))
      let reg = this.reg
      let reg_rad = this.reg_radicado

      let esta = _this.reg.esta_w
      let oper_crea = ''
      let oper_mod = ''

      if (novedad == '7') {
        oper_crea = localStorage.Usuario
        // esta = '4'
      } else if (novedad == '8') {
        // esta = base.esta
        oper_crea = base.oper_crea
        oper_mod = localStorage.Usuario
      }

      let ano_llave = this.reg.ano_llave_w
      let cont_llave = this.reg.cont_w
      let llave = ano_llave + cont_llave

      let fecha = reg.fecha_w.split('-').join('')
      let hora = reg.hora_w.split(':').join('')

      let cl_macro = reg.cl_macro_w
      let codigo_macro = reg.codigo_macro_w
      let llave_macro = cl_macro + codigo_macro

      let ano_rad = reg_rad.ano_llave || '0000'
      let cont_rad = reg_rad.cont_llave || '000000'
      let llave_radi = ano_rad + cont_rad

      let fecha_radi = reg_rad.fecha || '00000000'
      let hora_radi = reg_rad.hora || '0000'
      let descripcion = reg_rad.descripcion || ''

      let respuesta = reg.respuesta_w
        ? reg.respuesta_w.trim().enterReplace()
        : ''
      let respuesta_obj = respuesta.strToTable('observ')

      let monto = this.monto_mask.unmaskedValue || '0'

      let nuevos_datos = {
        llave,
        sw_radi: reg.sw_radi_w || '',
        fecha,
        hora,
        firma: reg.firma_w || '',
        llave_macro,
        asunto: reg.asunto_w || '',
        responsable: reg.respon_w || '',
        cargo: reg.cargo_w || '',
        llave_radi,
        fecha_radi,
        hora_radi,
        nit: reg.nit_w || '',
        tipo_corr: reg.tipo_corres_w || '',
        descripcion,
        cod_serco: reg.serv_w || '',
        operdiri: '', //
        cod_depen: reg.dep_w || '',
        esta,
        cod_auxco: reg.cod_auxco_w || '',
        cod_unifun: reg.dptoremi_w || '',
        procedencia: reg.proceden_w || '',

        med_resp: reg.med_resp_w || '',
        nro_fact: reg.nro_fact_w || '',
        monto,
        nro_guia: reg.nro_guia_w || '',
        presente: reg.persentre_w || '',

        oper_crea,
        oper_mod,
        ...respuesta_obj,
      }

      let envio = { ...base, ...nuevos_datos }
      const datos_envio = {
        datosh: datosEnvio(),
        novedad: novedad,
        ...envio,
      }

      console.log('Envio', datos_envio)
      postData(datos_envio, get_url('APP/COR/CORR403.DLL'))
        .then((data) => {
          loader('hide')
          console.log('Proceso terminado')
          if (novedad == '8') _this.bb(envio)
          else if (novedad == '7') _this.enviar_email(envio)
        })
        .catch((err) => {
          loader('hide')
          console.error('-> Error', err)
          // jAlert(
          //   {
          //     titulo: 'Notificacion',
          //     mensaje: 'Ha ocurrido un error guardando/modificado el radicado',
          //   },
          //   _this.validar_cargo,
          // )
          _this.validar_cargo()
        })
    },
    bb(data) {
      const _this = this
      loader('hide')
      CON851P('00', _this.dato_1, () => {
        setTimeout(() => {
          _this.impresion(data)
        }, 300)
      })
    },
    enviar_email(data) {
      const _this = this
      let destino = this.reg.nit_w
      let destino_info = _this.terceros.find((el) => el.COD == destino)

      let error_email = (error) => {
        console.error('-> Error email', error)
        loader('hide')
        CON851(
          '99',
          'Ha ocurrido un error intentando enviar la notificación por correo eletrónico.',
          null,
          'error',
          'Advertencia',
        )
        _this.bb(data)
      }

      if (!destino_info || !destino_info.EMAIL2) {
        error_email()
      } else {
        let ano_radicado = this.reg.ano_llave_w
        let radicado = this.reg.cont_w
        let nombre_archivo = `${ano_radicado}/RES-${radicado}.PDF`

        let listado = [
          {
            correo: destino_info.EMAIL2,
            // correo: 'jhohanf.silva@gmail.com',
            archivo: nombre_archivo,
          },
        ]

        enviar_correspondencia(listado)
          .then((res) => {
            if (res.code != 0) error_email(res)
            else if (res.msj.error && res.msj.error.length > 0) error_email(res)
            else {
              CON851(
                '',
                'Se ha enviado la notificación correctamente.',
                null,
                'success',
                'Correcto',
              )
              _this.bb(data)
            }
          })
          .catch(error_email)
      }
    },
    impresion(data) {
      let descrip_responsable = document.getElementById(
        'descrip_personal_COR405',
      ).value
      let descrip_destino = document.getElementById('nombre_remitente_COR405')
        .value

      let fecha_format = moment(data.fecha).format('MMM DD/YYYY')

      let hora_format = `${data.hora.substring(0, 2)}:${data.hora.substring(
        2,
        4,
      )}`

      let dato_impresion = {
        ...data,
        descrip_responsable,
        descrip_destino,
        fecha_format,
        hora_format,
      }

      loader('show')
      CORR405P(dato_impresion).then(() => {
        loader('hide')
        this.dato_1()
      })
    },

    validar_nro_radicado() {
      const _this = this
      validarInputs(
        {
          form: '#cont_rad_COR405',
          orden: '1',
          event_f8: _this.ventana_correspondencia_pendiente,
        },
        _this.dato_1,
        () => {
          let cont_w = _this.reg_radicado.cont_llave || ''
          let cont_w_format = cont_w.trim().padStart(6, '0')
          _this.reg_radicado.cont_llave = cont_w_format
          _this.validar_anio_radicado()
        },
      )
    },
    validar_anio_radicado() {
      const _this = this
      validarInputs(
        {
          form: '#anio_rad_COR405',
          orden: '1',
        },
        _this.dato_1,
        _this.leer_correspondencia,
      )
    },
    leer_correspondencia() {
      const _this = this
      let anio_corr = _this.reg_radicado.ano_llave
      let cont_w = _this.reg_radicado.cont_llave
      let llave_pon = anio_corr + cont_w

      postData(
        {
          datosh: datosEnvio(),
          paso: '2',
          novedad: '8',
          codigo: llave_pon,
        },
        get_url('APP/COR/CORR868.DLL'),
      )
        .then((data) => {
          // console.log('Radicado', data)
          _this.reg_radicado = {
            ..._this.reg_radicado,
            ...data,
          }

          _this.leer_resp_correspondencia()
        })
        .catch((err) => {
          setTimeout(_this.validar_nro_radicado, 200)
        })
    },
    leer_resp_correspondencia() {
      const _this = this
      let novedad = _this.novedad.id
      let sw_radi_w = _this.reg.sw_radi_w || ''
      let estado_cor = _this.reg_radicado.esta

      if (sw_radi_w == 'S' && estado_cor == '4' && novedad == '7') {
        CON851('', '4M', null, 'error', 'Error')
        _this.validar_radicado()
      } else {
        let ano_llave = _this.reg.ano_llave_w
        let cont = _this.reg.cont_w
        let llave_w = ano_llave + cont

        postData(
          {
            datosh: datosEnvio(),
            paso: '2',
            novedad,
            codigo: llave_w,
          },
          get_url('APP/COR/CORR864.DLL'),
        )
          .then((data) => {
            // console.log('Respuesta', data)
            _this.original = data
            if (novedad == '7') _this.nuevo()
            else if (novedad == '8') _this.cambio()
            else if (novedad == '9') _this.retiro()
          })
          .catch((err) => {
            console.error('-> Error', err)
            setTimeout(_this.dato_1, 200)
          })
      }
    },
    retiro(data) {
      const _this = this
      CON851P('02', _this.validar_nro_radicado, () => {
        let novedad = _this.novedad.id
        const datos_envio = {
          datosh: datosEnvio(),
          novedad: novedad,
          llave: data.llave,
        }

        setTimeout(() => {
          postData(datos_envio, get_url('APP/COR/CORR403.DLL')).then((data) => {
            jAlert(
              {
                titulo: 'Notificacion',
                mensaje: 'Eliminado correctamente',
              },
              _this.dato_1,
            )
          })
        }, 300)
      })
    },
    cambio() {
      const _this = this
      let reg = JSON.parse(JSON.stringify(_this.original))

      let llave_rad = reg.llave_radi
      let ano_rad = llave_rad.substring(0, 4)
      let cont_rad = llave_rad.substring(4, 10)
      _this.reg_radicado = {
        cont_llave: cont_rad,
        ano_llave: ano_rad,
        fecha: reg.fecha_radi,
        hora: reg.hora_radi,
        descripcion: reg.descripcion,
      }

      let sw_radi_w = reg.sw_radi

      let nit_w = parseInt(reg.nit)
      let busqueda_nit = _this.terceros.find((el) => el.COD == nit_w)
      document.getElementById('nombre_remitente_COR405').value = busqueda_nit
        ? busqueda_nit.NOMBRE
        : ''

      let dptoremi = parseInt(reg.cod_unifun)
      let dptoremi_w = dptoremi.toString().padStart(5, '0')
      let busqueda_dpto = _this.dependencias_remit.find(
        (el) => el.codigo.padStart(5, '0') == dptoremi_w,
      )
      document.getElementById(
        'descrip_depto_remit_COR405',
      ).value = busqueda_dpto ? busqueda_dpto.descripcion : ''

      let procedencia = parseInt(reg.procedencia)
      let proceden_w = procedencia.toString()
      if (procedencia == 1) _this.format_procedencia = '1 - EXTERNO'
      else if (procedencia == 2) _this.format_procedencia = '2 - INTERNO'

      let tipo_corres = parseInt(reg.tipo_corr)
      let tipo_corres_w = tipo_corres.toString().padStart(2, '0')
      let busqueda_tipo = _this.tipos_corres.find(
        (el) => el.codigo.padStart(2, '0') == tipo_corres_w,
      )
      document.getElementById('descrip_tipo_corr_COR405').value = busqueda_tipo
        ? busqueda_tipo.descripcion
        : ''

      let cod_aux = parseInt(reg.cod_auxco)
      let cod_auxco_w = cod_aux.toString().padStart(3, '0')
      let busqueda_aux = _this.aux_corres.find(
        (el) => el.codigo.padStart(3, '0') == cod_auxco_w,
      )
      document.getElementById('descrip_aux_corr_COR405').value = busqueda_aux
        ? busqueda_aux.descripcion
        : ''

      let serv = parseInt(reg.cod_serco)
      let serv_w = serv.toString().padStart(3, '0')
      let busqueda_serv = _this.servicios.find(
        (el) => el.codigo.padStart(3, '0') == serv_w,
      )
      document.getElementById('descrip_servicio_COR405').value = busqueda_serv
        ? busqueda_serv.descripcion
        : ''

      let dep = parseInt(reg.cod_depen)
      let dep_w = dep.toString().padStart(3, '0')
      let busqueda_dep = _this.dependencias.find(
        (el) => el.codigo.padStart(3, '0') == dep_w,
      )
      document.getElementById('descrip_personal_COR405').value = busqueda_dep
        ? busqueda_dep.descripcion
        : ''

      let cl_macro_w = reg.llave_macro.substring(0, 2)
      let codigo_macro_w = reg.llave_macro.substring(2, 8)

      let fecha_w = moment(reg.fecha).format('YYYY-MM-DD')
      let hora_w = moment(reg.hora).format('HH:mm')

      let busqueda_macro = this.macros.find(
        (el) => reg.llave_macro == el.tipo + el.codigo,
      )

      let respuesta_w = busqueda_macro
        ? busqueda_macro.macro.toString().enterPut().replace(/,/g, ' ').trim()
        : reg.observacion

      let esta_w = parseInt(reg.esta) || 1
      let busqueda_estado = _this.estados_respuesta.find(
        (el) => el.id === esta_w,
      )
      _this.format_estado_inpt = busqueda_estado
        ? `${busqueda_estado.id} - ${busqueda_estado.label}`
        : ''

      let med_resp_w = parseInt(reg.med_resp) || '0'
      let busqueda_med = _this.medios_respuesta.find(
        (el) => el.id == med_resp_w,
      )
      _this.format_medio_respuesta = busqueda_med
        ? `${busqueda_med.id} - ${busqueda_med.label}`
        : ''

      let monto = parseFloat(reg.monto) || 0
      _this.monto_mask.unmaskedValue = monto.toString()

      _this.reg = {
        ..._this.reg,
        sw_radi_w,
        nit_w,
        dptoremi_w,
        proceden_w,
        tipo_corres_w,
        cod_auxco_w,
        serv_w,
        dep_w,
        asunto_w: reg.asunto,
        cl_macro_w,
        codigo_macro_w,
        fecha_w,
        hora_w,
        firma_w: reg.firma,
        respon_w: reg.responsable,
        cargo_w: reg.cargo,
        respuesta_w,
        med_resp_w,
        nro_fact_w: reg.nro_fact,
        nro_guia_w: reg.nro_guia,
        persentre_w: reg.presente,
        esta_w,
      }

      this.sw_paso = 1
      this.validar_radicado()
    },
    nuevo() {
      const _this = this
      let sw_radi_w = _this.reg.sw_radi_w || ''

      if (sw_radi_w == 'S') _this.mostrar_correspondencia()
      else _this.validar_dpto_remite()
    },
    mostrar_correspondencia() {
      const _this = this
      let rad = JSON.parse(JSON.stringify(_this.reg_radicado))

      let nit_w = parseInt(rad.nit)
      let busqueda_nit = _this.terceros.find((el) => el.COD == nit_w)
      document.getElementById('nombre_remitente_COR405').value = busqueda_nit
        ? busqueda_nit.NOMBRE
        : ''

      let dptoremi = parseInt(rad.dpto_remi)
      let dptoremi_w = dptoremi.toString().padStart(5, '0')
      let busqueda_dpto = _this.dependencias_remit.find(
        (el) => el.codigo.padStart(5, '0') == dptoremi_w,
      )
      document.getElementById(
        'descrip_depto_remit_COR405',
      ).value = busqueda_dpto ? busqueda_dpto.descripcion : ''

      let procedencia = parseInt(rad.procedencia)
      let proceden_w = procedencia.toString()
      if (procedencia == 1) _this.format_procedencia = '1 - EXTERNO'
      else if (procedencia == 2) _this.format_procedencia = '2 - INTERNO'

      let tipo_corres = parseInt(rad.tipo_corr)
      let tipo_corres_w = tipo_corres.toString().padStart(2, '0')
      let busqueda_tipo = _this.tipos_corres.find(
        (el) => el.codigo.padStart(2, '0') == tipo_corres_w,
      )
      document.getElementById('descrip_tipo_corr_COR405').value = busqueda_tipo
        ? busqueda_tipo.descripcion
        : ''

      let cod_aux = parseInt(rad.cod_aux_cod)
      let cod_auxco_w = cod_aux.toString().padStart(3, '0')
      let busqueda_aux = _this.aux_corres.find(
        (el) => el.codigo.padStart(3, '0') == cod_auxco_w,
      )
      document.getElementById('descrip_aux_corr_COR405').value = busqueda_aux
        ? busqueda_aux.descripcion
        : ''

      let serv = parseInt(rad.cod_serco)
      let serv_w = serv.toString().padStart(3, '0')
      let busqueda_serv = _this.servicios.find(
        (el) => el.codigo.padStart(3, '0') == serv_w,
      )
      document.getElementById('descrip_servicio_COR405').value = busqueda_serv
        ? busqueda_serv.descripcion
        : ''

      let dep = parseInt(rad.cod_depen)
      let dep_w = dep.toString().padStart(3, '0')
      let busqueda_dep = _this.dependencias.find(
        (el) => el.codigo.padStart(3, '0') == dep_w,
      )
      document.getElementById('descrip_personal_COR405').value = busqueda_dep
        ? busqueda_dep.descripcion
        : ''

      _this.format_estado_inpt = `${rad.esta} - ${rad.descrip_esta}`

      _this.reg = {
        ..._this.reg,
        nit_w,
        dptoremi_w,
        proceden_w,
        tipo_corres_w,
        cod_auxco_w,
        serv_w,
        dep_w,
      }

      _this.validar_asunto()
    },
    validar_nit() {
      const _this = this
      validarInputs(
        {
          form: '#validar_remitente_COR405',
          orden: '1',
          event_f8: () => {
            _this.ventana_terceros()
          },
        },
        () => {
          _this.dato_1()
        },
        () => {
          let nit = _this.reg.nit_w

          if (_this.terceros && nit && nit.toString().trim()) {
            let busqueda = _this.terceros.find((el) => el.COD == nit)
            if (busqueda) {
              document.getElementById('nombre_remitente_COR405').value =
                busqueda.NOMBRE

              let novedad = _this.novedad.id
              let sw_radi_w = _this.reg.sw_radi_w
              if (sw_radi_w == 'N' && novedad == '8')
                _this.validar_dpto_remite()
              else _this.leer_resp_correspondencia()
            } else {
              document.getElementById('nombre_remitente_COR405').value = ''
              _this.validar_nit()
              CON851('01', '01', null, 'error', 'Advertencia')
            }
          } else _this.validar_nit()
        },
      )
    },
    validar_dpto_remite() {
      const _this = this
      validarInputs(
        {
          form: '#validar_dpto_remit_COR405',
          orden: '1',
        },
        _this.validar_nit,
        () => {
          if (_this.dependencias_remit) {
            let depto_remi = _this.reg.dptoremi_w || ''
            let depto_remi_format = depto_remi.padStart(5, '0')
            Vue.set(_this.reg, 'dptoremi_w', depto_remi_format)

            let depto = _this.dependencias_remit.find(
              (el) => el.codigo.padStart(5, '0') == depto_remi_format,
            )
            if (depto) {
              document.getElementById('descrip_depto_remit_COR405').value =
                depto.descripcion
              setTimeout(_this.validar_procedencia, 300)
            } else {
              document.getElementById('descrip_depto_remit_COR405').value = ''
              CON851('01', '01', null, 'error', 'Advertencia')
              _this.validar_dpto_remite()
            }
          } else _this.validar_dpto_remite()
        },
      )
    },
    validar_procedencia() {
      const _this = this
      POPUP(
        {
          titulo: 'PROCEDENCIA',
          indices: [{ id: 'id', label: 'label' }],
          seleccion: this.reg.proceden_w || '1',
          array: [
            { id: 1, label: 'EXTERNO' },
            { id: 2, label: 'INTERNO' },
          ],
          callback_f: () => {
            setTimeout(_this.validar_dpto_remite, 300)
          },
        },
        (data) => {
          _this.reg.proceden_w = data.id
          _this.format_procedencia = `${data.id} - ${data.label}`
          _this.validar_tipo_corres()
        },
      )
    },
    validar_tipo_corres() {
      const _this = this
      validarInputs(
        {
          form: '#validar_tipo_corr_405',
          orden: '1',
        },
        () => {
          setTimeout(_this.validar_procedencia, 300)
        },
        () => {
          if (_this.tipos_corres) {
            let tipo = _this.reg.tipo_corres_w || ''
            let tipo_format = tipo.padStart(2, '0')
            _this.reg.tipo_corres_w = tipo_format

            let busqueda_tipo = _this.tipos_corres.find(
              (el) => el.codigo.padStart(2, '0') == tipo_format,
            )
            if (busqueda_tipo) {
              document.getElementById('descrip_tipo_corr_COR405').value =
                busqueda_tipo.descripcion
              _this.validar_aux_corres()
            } else {
              document.getElementById('descrip_tipo_corr_COR405').value = ''
              _this.validar_tipo_corres()
              CON851('01', '01', null, 'error', 'Advertencia')
            }
          } else _this.validar_tipo_corres()
        },
      )
    },
    validar_aux_corres() {
      const _this = this
      validarInputs(
        {
          form: '#validar_aux_COR405',
          orden: '1',
        },
        _this.validar_tipo_corres,
        () => {
          if (_this.aux_corres) {
            let aux = _this.reg.cod_auxco_w || ''
            let aux_format = aux.padStart(3, '0')
            Vue.set(_this.reg, 'cod_auxco_w', aux_format)

            let tipo = _this.reg.tipo_corres_w
            let filtro = _this.aux_corres.filter((el) => el.cod_serco == tipo)

            let busqueda_aux = filtro.find(
              (el) => el.codigo.padStart(3, '0') == aux_format,
            )
            if (busqueda_aux) {
              document.getElementById('descrip_aux_corr_COR405').value =
                busqueda_aux.descripcion
              _this.validar_servicio()
            } else {
              document.getElementById('descrip_aux_corr_COR405').value = ''
              _this.validar_aux_corres()
              CON851('01', '01', null, 'error', 'Advertencia')
            }
          } else _this.validar_aux_corres()
        },
      )
    },
    validar_servicio() {
      const _this = this
      validarInputs(
        {
          form: '#validar_servicio_COR405',
          orden: '1',
        },
        _this.validar_aux_corres,
        () => {
          if (_this.servicios) {
            let servicio = _this.reg.serv_w || ''
            let servicio_format = servicio.padStart(3, '0')
            _this.reg.serv_w = servicio_format

            let busqueda = _this.servicios.find(
              (el) => el.codigo.padStart(3, '0') == servicio_format,
            )
            if (busqueda) {
              document.getElementById('descrip_servicio_COR405').value =
                busqueda.descripcion
              _this.validar_personal_dest()
            } else {
              document.getElementById('descrip_servicio_COR405').value = ''
              _this.validar_servicio()
              CON851('01', '01', null, 'error', 'Advertencia')
            }
          } else _this.validar_servicio()
        },
      )
    },
    validar_personal_dest() {
      const _this = this
      validarInputs(
        {
          form: '#validar_personal_dest_COR405',
          orden: '1',
        },
        _this.validar_servicio,
        () => {
          let servicio = _this.reg.dep_w || ''
          let servicio_format = servicio.padStart(3, '0')
          _this.reg.dep_w = servicio_format

          let busqueda = _this.dependencias.find(
            (el) => el.codigo.padStart(3, '0') == servicio_format,
          )
          if (!busqueda) {
            document.getElementById('descrip_personal_COR405').value = ''
            _this.validar_personal_dest()
            CON851('01', '01', null, 'error', 'Advertencia')
          } else {
            document.getElementById('descrip_personal_COR405').value =
              busqueda.responsable
            _this.validar_asunto()
          }
        },
      )
    },

    ventana_correspondencia_pendiente() {
      const _this = this
      _ventanaDatos({
        titulo: 'CORRESPONDENCIA PENDIENTE',
        columnas: [
          'cont',
          'fecha_format',
          'hora_format',
          'manejo',
          'descrip_serco',
          'estado_format',
          'dias_format',
        ],
        ancho: '95%',
        data: this.correspondencia_pendiente,
        callback_esc: function () {
          _this.validar_nro_radicado()
        },
        callback: function (data) {
          // console.log('Data', data)
          _this.reg_radicado.cont_llave = data.cont
          _this.reg_radicado.ano_llave = data.anio_llave
          _this.leer_correspondencia()
        },
      })
    },
    ventana_personal_dest() {
      const _this = this

      let servicio = _this.reg.serv_w
      let filtro = _this.dependencias.filter((el) => el.cod_serco == servicio)

      _ventanaDatos({
        titulo: 'VENTANA DE DEPENDENCIA CORRESP',
        columnas: ['codigo', 'descripcion', 'responsable', 'cod_serco'],
        data: filtro,
        // data: _this.dependencias,
        callback_esc: function () {
          document.getElementById('personal_dest_COR405').focus()
        },
        callback: function (data) {
          _this.reg.dep_w = data['codigo']
          _enterInput('#personal_dest_COR405')
        },
      })
    },
    ventana_servicios_corres() {
      const _this = this
      _ventanaDatos({
        titulo: 'VENTANA DE DEPENDENCIAS',
        columnas: ['codigo', 'descripcion'],
        data: _this.servicios,
        callback_esc: function () {
          document.getElementById('servicio_COR405').focus()
        },
        callback: function (data) {
          _this.reg.serv_w = data['codigo']
          _enterInput('#servicio_COR405')
        },
      })
    },
    ventana_aux_corres() {
      const _this = this

      let tipo_corres = _this.reg.tipo_corres_w
      let filtro = _this.aux_corres.filter((el) => el.cod_serco == tipo_corres)

      _ventanaDatos({
        titulo: 'VENTANA DE AUX TIPO CORRESPONDENCIA',
        columnas: ['codigo', 'descripcion', 'cod_serco'],
        data: filtro,
        callback_esc: function () {
          document.getElementById('aux_corr_COR405').focus()
        },
        callback: function (data) {
          _this.reg.cod_auxco_w = data['codigo']
          _enterInput('#aux_corr_COR405')
        },
      })
    },
    ventana_tipo_corres(input) {
      const _this = this
      _ventanaDatos({
        titulo: 'VENTANA TIPO CORRESPONDENCIA',
        columnas: ['codigo', 'descripcion', 'dias'],
        data: _this.tipos_corres,
        callback_esc: function () {
          if (input === 1) document.getElementById('tipo_corr_COR405').focus()
          else if (input === 2)
            document.getElementById('tipo_macro_COR405').focus()
        },
        callback: function (data) {
          if (input === 1) {
            _this.reg.tipo_corres_w = data['codigo']
            _enterInput('#tipo_corr_COR405')
          } else if (input === 2) {
            _this.reg.cl_macro_w = data['codigo']
            _enterInput('#tipo_macro_COR405')
          }
        },
      })
    },
    ventana_dependencias() {
      const _this = this
      _ventanaDatos({
        titulo: 'VENTANA DEPENDENCIAS REMITENTES',
        columnas: ['codigo', 'descripcion'],
        data: _this.dependencias_remit,
        callback_esc: function () {
          document.getElementById('depto_remit_COR405').focus()
        },
        callback: function (data) {
          _this.reg.dptoremi_w = data['codigo']
          _enterInput('#depto_remit_COR405')
        },
      })
    },
    ventana_terceros() {
      const _this = this
      _ventanaDatos({
        titulo: 'VENTANA DE TERCEROS',
        indice: ['COD', 'NOMBRE', 'TELEF', 'CIUDAD', 'ACT'],
        mascara: [
          {
            COD: 'Identificacion',
            NOMBRE: 'Nombre',
            TELEF: 'Telefono',
            CIUDAD: 'Ciudad',
            ACT: 'Actividad',
          },
        ],
        data: _this.terceros,
        minLength: 3,
        callback_esc: function () {
          _this.validar_nit()
        },
        callback: (data) => {
          _this.reg.nit_w = data['COD']
          _this.validar_nit()
          setTimeout(() => {
            _enterInput('#nit_remitente_COR405')
          }, 500)
        },
      })
    },
    ventana_macros() {
      const _this = this
      _ventanaDatos({
        titulo: 'VENTANA MACROS DE CORRESPONDENCIA',
        columnas: ['tipo', 'codigo', 'descripcion', 'fecha', 'oper'],
        data: _this.macros,
        callback_esc: function () {
          document.getElementById('cod_macro_COR405').focus()
        },
        callback: function (data) {
          _this.reg.codigo_macro_w = data.codigo
          _enterInput('#cod_macro_COR405')
        },
      })
    },
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

      let macros = await get('macros')
      this.macros = macros.macros_corr

      loader('hide')
      this.dato_1()

      this.get_correspondencia_pendiente()

      let terceros = await get('terceros')
      this.terceros = terceros.TERCEROS

      console.log('-> Carga terminada')
    },
    get_correspondencia_pendiente() {
      const _this = this

      let fecha_ini = '20210101'
      let fecha_fin = moment().format('YYYYMMDD')

      let datos_envio = {
        datosh: datosEnvio(),
        nit: '99',
        dep: '***',
        tipo_corr: '**',
        fecha_ini,
        fecha_fin,
        jor: '*',
        procedencia: '**',
        manejo: '**',
        paso: '3',
      }

      postData(datos_envio, get_url('APP/COR/CORR301.DLL'))
        .then((res) => {
          let data = res.ctrl_corresp
          let filtro = data.filter((el) => el.cont && el.cont.trim())
          if (filtro.length > 0) {
            let format_estado = (estado) => {
              if (estado == 1)
                return { label: 'EN TRAMITE', color: 'label-warning' }
              else if (estado == 2)
                return { label: 'VENCIDA', color: 'label-danger' }
              else if (estado == 3 || estado == 4)
                return { label: 'RESUELTA', color: 'label-success' }
              else if (estado == 5)
                return { label: 'PRORROGA', color: 'bg-yellow-gold' }
            }

            let data_format = filtro.map((el) => {
              el.manejo = el.manejo.trim()
              el.descrip_serco = el.descrip_serco.trim()
              el.fecha_format = moment(el.fecha).format('DD/MM/YYYY')
              el.hora_format = `${el.hora.substring(0, 2)}:${el.hora.substring(
                2,
                4,
              )}`
              el.folio_format = `${el.folio} de ${el.folio_d}`

              let fecha_inicial = moment(el.fecha)
              let fecha_final = moment()
              let diferencia = fecha_final.diff(fecha_inicial, 'days')

              el.dias_format = `${diferencia} de ${parseInt(
                el.dias_tipco,
              )} máximo`

              let estado = format_estado(el.estado)
              el.estado_format = `<span class="label ${estado.color}">${estado.label}</span>`

              return el
            })

            _this.correspondencia_pendiente = data_format
            // console.log(_this.correspondencia_pendiente)
          } else {
            CON851(
              '08',
              'No existe correspondencia pendiente',
              null,
              'warning',
              'Advertencia',
            )
          }
        })
        .catch((error) => {
          CON851('08', '08', null, 'warning', 'Advertencia')
          console.error('Error ->', error)
        })
    },
    reset_form() {
      this.sw_paso = 0
      this.reg = init_resp_w()
      this.reg_radicado = {
        cont_llave: null,
        ano_llave: null,
        esta: null,
      }

      this.format_procedencia = null
      this.format_estado_inpt = null
      _inputControl('reset')
    },
  },
})
