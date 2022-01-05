const {
  get,
  CORR201P,
  enviar_correspondencia,
  init_datos_w,
  format_estado,
} = require('../../COR/scripts/COR.ctrl.js')

new Vue({
  el: '#COR201',
  data() {
    return {
      novedad: {},
      reg: {
        cont_w: null,
        ano_llave_w: null,
        datos_w: init_datos_w(),
      },
      original: null,
      nit_usu: $_USUA_GLOBAL[0].NIT,
      format_manejo: null,
      format_procedencia: null,
      format_estado_inpt: null,

      terceros: [],
      dependencias_remit: null,
      tipos_corres: null,
      aux_corres: null,
      servicios: null,
      dependencias: null,
      correspondencia: null,

      archivo_adjunto: null,

      monto_mask: null,
      operador:
        localStorage.Usuario.trim() + ' - ' + localStorage.Nombre.trim(),

      medios_respuesta: [
        { id: 1, label: 'CORREO CERTIFICADO' },
        { id: 2, label: 'E-MAIL' },
        { id: 3, label: 'PERSONAL' },
      ],

      format_medio_ingreso: null,
      format_tipo_id: null,

      mostrarVentanaTerceros: false,

      modal_ter: {
        id: null,
        tipo_identificacion: null,
        razon_social: null,
        apellido_1: null,
        apellido_2: " ",
        nombres: null,
        direccion: null,
        telefono: null,
        email: null
      },
      textos: {
        remitente: ""
      }
    }
  },
  components: {
    "con802": require("../../COR/scripts/CON802.vue")
  },
  computed: {
    fecha_num() {
      let fecha = $_USUA_GLOBAL[0].FECHALNK
      return {
        ano_num: fecha.substring(0, 2),
        mes_num: fecha.substring(2, 4),
        dia_num: fecha.substring(4, 6),
      }
    },
  },
  mounted() {
    this.monto_mask = new IMask(this.$refs.monto_input_cor201, {
      mask: Number,
      min: -999999999999,
      max: 999999999999,
      scale: 2,
      thousandsSeparator: ',',
      radix: '.',
    })
    $('#modal_terceros_cor201').on('shown.bs.modal', this.validar_nuevo_tercero)
  },
  created() {
    console.clear()
    _vm = this

    nombreOpcion('2-1 - Recepcion correspondencia')
    _inputControl('reset')
    _inputControl('disabled')
    loader('show')
    this.get_json()
  },
  watch: {
    'reg.datos_w.observ_w': function (val) {
      this.reg.datos_w.observ_w = val ? val.replaceEsp() : ''
    },
  },
  methods: {
    enviar_email(data) {
      const _this = this
      let destino = this.reg.datos_w.dep_w
      let destino_info = _this.dependencias.find(
        (el) => el.codigo.padStart(3, '0') == destino,
      )

      let ano_radicado = this.reg.ano_llave_w
      let radicado = this.reg.cont_w
      let nombre_archivo = `${ano_radicado}/${radicado}.PDF`

      let listado = [
        {
          correo: destino_info.correo,
          archivo: nombre_archivo,
        },
      ]

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
    },
    impresion(data) {
      const _this = this

      let reg = this.reg.datos_w
      // let descrip_ter = document.getElementById('nombre_remitente_cor201').value
      let descrip_ter = this.textos.remitente || ''
      let descrip_dep_w = document.getElementById('descrip_personal_cor201')
        .value
      let descrip_tipo_w = document.getElementById('descrip_tipo_corr_cor201')
        .value
      let descrip_servicio_w = document.getElementById(
        'descrip_servicio_cor201',
      ).value

      let observacion_str = reg.observ_w || ''
      let observacion = observacion_str
        .trim()
        .enterReplace()
        .replace(/\s\s+/g, ' ')
        .substring(0, 60)

      let fecha_arr = [
        parseInt(reg.fecha_w.ano_w),
        reg.fecha_w.mes_w,
        reg.fecha_w.dia_w,
      ]
      let fecha_format = moment(fecha_arr.join('')).format('MMM DD/YYYY')
      let hora_format = reg.hora_w
      let folio = data.folio ? parseInt(data.folio) : 0
      let folio_d = data.folio_d ? parseInt(data.folio_d) : 0

      let dato_impresion = {
        ...data,
        descrip_ter,
        descrip_dep_w,
        observacion,
        fecha_format,
        hora_format,
        folio,
        folio_d,
        descrip_tipo_w,
        descrip_servicio_w,
      }

      console.log('-> Datos impresión', dato_impresion)
      loader('show')
      CORR201P(dato_impresion).then(() => {
        loader('hide')
        _this.dato_1()
      })
    },
    grabar_numero(data) {
      const _this = this
      let secuencia = 'R4'
      let fecha = moment().format('YYMMDD')
      let llave = data.cont_llave

      let datos_envio = [secuencia, fecha, llave]

      postData(
        { datosh: `${datosEnvio()}${datos_envio.join('|')}|` },
        get_url('APP/CONTAB/CON007X.DLL'),
      )
        .then((res) => {
          _this.enviar_email(data)
        })
        .catch(() => {
          loader('hide')
          _this.dato_1()
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
    subir_archivo() {
      const _this = this
      let inputs = _this.$refs.input_archivo
      let archivo = inputs.files[0]

      let ano_radicado = this.reg.ano_llave_w
      let radicado = this.reg.cont_w
      let nombre_archivo = `${radicado}.PDF`

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
      delete base.error_rips
      delete base.tabla_depen
      delete base.tabla_oper

      let ano_llave = this.reg.ano_llave_w
      let cont_llave = this.reg.cont_w
      let llave = ano_llave + cont_llave

      let oper_crea = ''
      let oper_mod = ''
      let esta = ''

      if (novedad == '7') {
        oper_crea = localStorage.Usuario
        esta = '1'
      } else if (novedad == '8') {
        oper_crea = base.oper_crea
        oper_mod = localStorage.Usuario
        esta = base.esta
      }

      let reg = this.reg.datos_w

      let fecha = reg.fecha_w
      let monto = this.monto_mask.unmaskedValue || '0'
      let fecha_fact = reg.fecha_fact_w
      let fecha_entr = reg.fecha_entre_w

      let observaciones = reg.observ_w ? reg.observ_w.trim().enterReplace() : ''
      let observ_obj = observaciones.strToTable('observ')

      let anexo = reg.anex_w || ''
      let tip_anex = reg.tipo_anexo_w
      let otr_anex = tip_anex == 6 ? reg.otro_anexo_w || '' : ''

      let dias_max = reg.dias_max || ''

      let med_ingreso = reg.med_ingreso_w || ''

      let nuevos_datos = {
        ano_llave,
        cont_llave,
        llave,
        fecha: `${fecha.ano_w}${fecha.mes_w}${fecha.dia_w}`,
        hora: reg.hora_w.split(':').join(''),
        nit: reg.nit_w || '',
        dpto_remi: reg.dptoremi_w || '',
        manejo: reg.manejo_w.id || '',
        procedencia: reg.proceden_w.id || '',
        tipo_corr: reg.tipo_corres_w || '',
        cod_aux_cod: reg.cod_auxco_w || '',
        descripcion: reg.descrip_w || '',
        cod_serco: reg.serv_w || '',
        cod_depen: reg.dep_w || '',
        folio: reg.fol_w || '',
        folio_d: reg.fold_w || '',
        anexo,
        tip_anex,
        otr_anex,
        nro_fact: reg.nro_fact_w || '',
        monto,
        fecha_fact: `${fecha_fact.ano_w}${fecha_fact.mes_w}${fecha_fact.dia_w}`,
        fecha_entr: `${fecha_entr.ano_w}${fecha_entr.mes_w}${fecha_entr.dia_w}`,
        centro_costo: '',
        nro_guia: reg.nro_guia_w || '',
        presente: reg.persentre_w || '',
        oper_crea,
        oper_mod,
        esta,
        dias_max,
        med_ingreso,
        ...observ_obj,
      }

      let envio = { ...base, ...nuevos_datos }
      const datos_envio = {
        datosh: datosEnvio(),
        novedad: novedad,
        ...envio,
      }

      postData(datos_envio, get_url('APP/COR/CORR201.DLL'))
        .then((data) => {
          envio.llave = data
          envio.ano_llave = data.substring(0, 4)
          envio.cont_llave = data.substring(4, 10)
          console.log(envio, "datos envio")
          if (novedad == '8') _this.bb(envio)
          else if (novedad == '7') _this.grabar_numero(envio)
        })
        .catch((err) => {
          loader('hide')
          console.error('-> Error', err)
          jAlert(
            {
              titulo: 'Notificacion',
              mensaje: 'Ha ocurrido un error guardando/modificado el radicado',
            },
            _this.validar_observaciones,
          )
        })
    },
    confirmar() {
      CON851P('01', this.validar_observaciones, () => {
        loader('show')
        if (this.novedad.id == '7') this.subir_archivo()
        else this.guardar()
      })
    },
    validar_adjunto() {
      let inputs = this.$refs.input_archivo
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
        $('#modal_adjuntos').modal('hide')
        setTimeout(this.confirmar, 300)
      }
    },
    solicitar_adjunto() {
      $('#modal_adjuntos').modal('show')
    },
    validar_observaciones() {
      const _this = this
      validarInputs(
        {
          form: '#validar_observ_cor201',
          orden: '1',
        },
        _this.validar_persona_entrega,
        () => {
          if (_this.novedad.id == '7') _this.solicitar_adjunto()
          else _this.confirmar()
        },
      )
    },
    validar_persona_entrega() {
      const _this = this
      validarInputs(
        {
          form: '#validar_persona_entre_cor201',
          orden: '1',
        },
        _this.validar_guia,
        _this.validar_observaciones,
      )
    },
    validar_guia() {
      const _this = this
      validarInputs(
        {
          form: '#validar_guia_cor201',
          orden: '1',
        },
        _this.vaidar_ingreso,
        _this.validar_persona_entrega,
      )
    },
    vaidar_ingreso() {
      const _this = this
      POPUP(
        {
          titulo: 'Medio de ingreso',
          indices: [{ id: 'id', label: 'label' }],
          seleccion: _this.reg.datos_w.med_ingreso_w || '1',
          array: _this.medios_respuesta,
          callback_f: () => {
            setTimeout(_this.dato_factura, 300)
          },
        },
        (data) => {
          _this.reg.datos_w.med_ingreso_w = data.id
          _this.format_medio_ingreso = `${data.id} - ${data.label}`

          if (data.id === 1) _this.validar_guia()
          else {
            _this.reg.datos_w.nro_guia_w = null

            _this.validar_persona_entrega()
          }
        },
      )
    },
    validar_dia_entre() {
      const _this = this
      validarInputs(
        {
          form: '#validar_dia_entr_cor201',
          orden: '1',
        },
        _this.validar_mes_entre,
        () => {
          let dia = parseInt(_this.reg.datos_w.fecha_entre_w.dia_w) || 0
          if (dia < 1 || dia > 31) _this.validar_dia_entre()
          else {
            let factura = _this.reg.datos_w.nro_fact_w || ''
            if (_this.nit_usu == 800162035 && factura.trim()) {
              _this.validar_dia_entre()
              // Validación DATO-RED
            } else if (_this.nit_usu == 900405505) {
              _this.validar_dia_entre()
              // Validación DATO-CIUDAD
            } else {
              _this.vaidar_ingreso()
            }
          }
        },
      )
    },
    validar_mes_entre() {
      const _this = this
      validarInputs(
        {
          form: '#validar_mes_entr_cor201',
          orden: '1',
        },
        _this.validar_ano_entre,
        () => {
          let mes = parseInt(_this.reg.datos_w.fecha_entre_w.mes_w) || 0
          if (mes < 1 || mes > 12) _this.validar_mes_entre()
          else _this.validar_dia_entre()
        },
      )
    },
    validar_ano_entre() {
      const _this = this
      _this.reg.datos_w.fecha_entre_w = JSON.parse(
        JSON.stringify(_this.reg.datos_w.fecha_w),
      )
      validarInputs(
        {
          form: '#validar_ano_entr_cor201',
          orden: '1',
        },
        _this.validar_dia_fact,
        _this.validar_mes_entre,
      )
    },
    validar_dia_fact() {
      const _this = this
      validarInputs(
        {
          form: '#validar_dia_fact_cor201',
          orden: '1',
        },
        _this.validar_mes_fact,
        () => {
          let dia = parseInt(_this.reg.datos_w.fecha_fact_w.dia_w) || 0
          if (dia < 1 || dia > 31) _this.validar_dia_fact()
          else _this.validar_ano_entre()
        },
      )
    },
    validar_mes_fact() {
      const _this = this
      validarInputs(
        {
          form: '#validar_mes_fact_cor201',
          orden: '1',
        },
        _this.validar_ano_fact,
        () => {
          let mes = parseInt(_this.reg.datos_w.fecha_fact_w.mes_w) || 0
          if (mes < 1 || mes > 12) _this.validar_mes_fact()
          else _this.validar_dia_fact()
        },
      )
    },
    validar_ano_fact() {
      const _this = this
      _this.reg.datos_w.fecha_fact_w = JSON.parse(
        JSON.stringify(_this.reg.datos_w.fecha_w),
      )
      validarInputs(
        {
          form: '#validar_ano_fact_cor201',
          orden: '1',
        },
        _this.dato_factura,
        _this.validar_mes_fact,
      )
    },
    dato_monto() {
      const _this = this
      validarInputs(
        {
          form: '#validar_monto_cor201',
          orden: '1',
        },
        _this.dato_factura,
        _this.validar_ano_fact,
      )
    },
    dato_factura() {
      const _this = this
      validarInputs(
        {
          form: '#validar_factura',
          orden: '1',
        },
        _this.validar_tipo_anexos,
        () => {
          let factura = _this.reg.datos_w.nro_fact_w || ''

          if (factura.trim()) {
            let nit = _this.reg.datos_w.nit_w || '0'
            let novedad = _this.novedad.id

            loader('show')
            postData(
              {
                datosh: datosEnvio() + '0|',
                nit,
                nro_fact: factura,
              },
              get_url('APP/COR/CORR891.DLL'),
            )
              .then((data) => {
                loader('hide')
                if (data.cartera == '1' && novedad != 8) {
                  CON851('9M', '9M', null, 'error', 'Advertencia')
                  _this.dato_factura()
                } else _this.dato_monto()
              })
              .catch(() => {
                _this.dato_factura()
                loader('hide')
              })
          } else {
            _this.validar_ano_fact()
          }
        },
      )
    },
    validar_otros_anexos() {
      const _this = this
      validarInputs(
        {
          form: '#validar_otros_anexos',
          orden: '1',
        },
        () => {
          _this.validar_folios('2')
        },
        _this.dato_factura,
      )
    },
    validar_tipo_anexos() {
      const _this = this
      POPUP(
        {
          titulo: 'TIPO ANEXOS',
          indices: [{ id: 'id', label: 'label' }],
          seleccion: this.reg.datos_w.tipo_anexo_w || '1',
          array: [
            { id: 1, label: 'DISQUETTE' },
            { id: 2, label: 'CD-R' },
            { id: 3, label: 'DISCO DURO' },
            { id: 4, label: 'USB' },
            { id: 5, label: 'PC-CARDS' },
            { id: 6, label: 'OTROS' },
          ],
          callback_f: () => {
            setTimeout(() => {
              _this.validar_anexos()
            }, 300)
          },
        },
        (data) => {
          _this.reg.datos_w.tipo_anexo_w = data.id

          if (data.id == 6) _this.validar_otros_anexos()
          else {
            _this.reg.datos_w.otro_anexo_w = data.label
            setTimeout(_this.dato_factura, 300)
          }
        },
      )
    },
    validar_anexos() {
      validarInputs(
        {
          form: '#validar_anexo_cor201',
          orden: '1',
        },
        this.validar_folios,
        this.validar_tipo_anexos,
      )
    },
    validar_folios(orden) {
      validarInputs(
        {
          form: '#validar_folios',
          orden: orden,
        },
        this.validar_personal_dest,
        this.validar_anexos,
      )
    },
    validar_personal_dest() {
      const _this = this
      validarInputs(
        {
          form: '#validar_personal_dest',
          orden: '1',
        },
        _this.validar_servicio,
        () => {
          let servicio = _this.reg.datos_w.dep_w || ''
          let servicio_format = servicio.padStart(3, '0')
          _this.reg.datos_w.dep_w = servicio_format

          let busqueda = _this.dependencias.find(
            (el) => el.codigo.padStart(3, '0') == servicio_format,
          )
          if (!busqueda) {
            document.getElementById('descrip_personal_cor201').value = ''
            _this.validar_personal_dest()
            CON851('01', '01', null, 'error', 'Advertencia')
          } else if (!busqueda.correo) {
            jAlert(
              {
                titulo: 'Notificacion',
                mensaje: 'Personal de destino sin correo electrónico.',
              },
              _this.validar_personal_dest,
            )
          } else {
            document.getElementById('descrip_personal_cor201').value =
              busqueda.responsable
            _this.validar_folios('1')
          }
        },
      )
    },
    validar_servicio() {
      const _this = this
      validarInputs(
        {
          form: '#validar_servicio_cor201',
          orden: '1',
        },
        _this.validar_descripcion,
        () => {
          if (_this.servicios) {
            let servicio = _this.reg.datos_w.serv_w || ''
            let servicio_format = servicio.padStart(3, '0')
            _this.reg.datos_w.serv_w = servicio_format

            let busqueda = _this.servicios.find(
              (el) => el.codigo.padStart(3, '0') == servicio_format,
            )
            if (busqueda) {
              document.getElementById('descrip_servicio_cor201').value =
                busqueda.descripcion
              _this.validar_personal_dest()
            } else {
              document.getElementById('descrip_servicio_cor201').value = ''
              _this.validar_servicio()
              CON851('01', '01', null, 'error', 'Advertencia')
            }
          } else _this.validar_servicio()
        },
      )
    },
    validar_descripcion() {
      validarInputs(
        {
          form: '#validar_descrip_cor201',
          orden: '1',
        },
        this.validar_aux_corres,
        this.validar_servicio,
      )
    },
    validar_aux_corres() {
      const _this = this
      validarInputs(
        {
          form: '#validar_aux_corr_cor201',
          orden: '1',
        },
        _this.validar_tipo_corres,
        () => {
          if (_this.aux_corres) {
            let aux = _this.reg.datos_w.cod_auxco_w || ''

            if (aux) {
              let aux_format = aux.padStart(3, '0')
              _this.reg.datos_w.cod_auxco_w = aux_format

              let tipo = _this.reg.datos_w.tipo_corres_w
              let filtro = _this.aux_corres.filter((el) => el.cod_serco == tipo)

              let busqueda_aux = filtro.find(
                (el) => el.codigo.padStart(3, '0') == aux_format,
              )
              if (busqueda_aux) {
                document.getElementById('descrip_aux_corr_cor201').value =
                  busqueda_aux.descripcion
                _this.validar_descripcion()
              } else {
                document.getElementById('descrip_aux_corr_cor201').value = ''
                _this.validar_aux_corres()
                CON851('01', '01', null, 'error', 'Advertencia')
              }
            } else {
              document.getElementById('descrip_aux_corr_cor201').value = ''
              _this.reg.datos_w.cod_auxco_w = null
              _this.validar_descripcion()
            }
          } else _this.validar_aux_corres()
        },
      )
    },
    validar_tipo_corres() {
      const _this = this
      validarInputs(
        {
          form: '#validar_tipo_corr_cor201',
          orden: '1',
        },
        () => {
          _this.validar_dpto_remite()
        },
        () => {
          if (_this.tipos_corres) {
            let tipo = _this.reg.datos_w.tipo_corres_w || ''
            let tipo_format = tipo.padStart(2, '0')
            _this.reg.datos_w.tipo_corres_w = tipo_format

            let busqueda_tipo = _this.tipos_corres.find(
              (el) => el.codigo.padStart(2, '0') == tipo_format,
            )
            if (busqueda_tipo) {
              document.getElementById('descrip_tipo_corr_cor201').value =
                busqueda_tipo.descripcion
              _this.reg.datos_w.dias_max = busqueda_tipo.dias
              _this.validar_aux_corres()
            } else {
              document.getElementById('descrip_tipo_corr_cor201').value = ''
              _this.reg.datos_w.dias_max = null
              _this.validar_tipo_corres()
              CON851('01', '01', null, 'error', 'Advertencia')
            }
          } else _this.validar_tipo_corres()
        },
      )
    },
    validar_remitente() {
      const _this = this
      validarInputs(
        {
          form: '#validar_remitente_cor201',
          orden: '1',
        },
        () => {
          _this.dato_1()
        },
        () => {
          let nit = _this.reg.datos_w.nit_w || ""
          const datos_envio = {
            datosh: datosEnvio(),
            cod_tercero: nit
          }
          postData(datos_envio, get_url('APP/COR/GET_TERCERO.DLL'))
            .then((data) => {
              loader("hide");
              if (data.REG_TERCERO.documento) {
                _this.textos.remitente = data.REG_TERCERO.razon_social
                _this.validar_dpto_remite();
              } else if (!nit || nit <= 0) {
                CON851("2", "2", null, "warning", "")
                _this.validar_remitente();
              } else {
                $('#modal_terceros_cor201').modal('show')
              }
            })
            .catch((err) => {
              loader("hide");
              console.error("Ha ocurrido un error consultando tercero: ", err);
              CON851("", "Ha ocurrido un error consultando tercero", null, "warning", "");
              this.validar_remitente();
            })
        },
      )
    },
    validar_dpto_remite() {
      const _this = this
      validarInputs(
        {
          form: '#validar_dpto_remit_cor201',
          orden: '1',
        },
        () => {
          this.validar_remitente()
        },
        () => {
          if (_this.dependencias_remit) {
            let depto_remi = _this.reg.datos_w.dptoremi_w || ''
            let depto_remi_format = depto_remi.padStart(5, '0')
            _this.reg.datos_w.dptoremi_w = depto_remi_format

            let depto = _this.dependencias_remit.find(
              (el) => el.codigo.padStart(5, '0') == depto_remi_format,
            )
            if (depto) {
              document.getElementById('descrip_depto_remit_cor201').value =
                depto.descripcion
            } else {
              document.getElementById('descrip_depto_remit_cor201').value = ''
              CON851('01', '01', null, 'error', 'Advertencia')
            }
            _this.validar_tipo_corres()
          } else _this.validar_dpto_remite()
        },
      )
    },
    buscarTercero() {
      const _this = this

      postData()
        .then((data) => {
          _this.textos.remitente = data.NOMBRE
          _this.validar_dpto_remite()
        })
        .catch((err) => {
          console.error(err)
          CON851("", "Error en consulta", null, "error", "Error")
          $('#modal_terceros_cor201').modal('show')
        })
    },
    validar_nuevo_tercero() {
      this.modal_val_tipo()
    },

    modal_val_tipo() {
      const _this = this
      Object.keys(this.modal_ter).forEach(key => this.modal_ter[key] = null);
      this.modal_ter.id = this.reg.datos_w.nit_w
      let tipo_documentos = [
        { id: "1", label: "CC- Cedula ciudadania" },
        { id: "2", label: "CE- Cedula extranjeria" },
        { id: "3", label: "PA- Numero pasaporte" },
        { id: "4", label: "RC- Registro civil" },
        { id: "5", label: "TI- Tarjeta de identidad" },
        { id: "6", label: "NU- Numero unico de identidad" },
        { id: "7", label: "NI- Numero identidad tributaria N" }
      ]
      POPUP(
        {
          array: tipo_documentos,
          titulo: 'Tipo identificacion',
          indices: [{
            id: 'id',
            label: 'label'
          }],
          callback_f: () => {
            $('#modal_terceros_cor201').modal('hide')
            _this.validar_remitente()
          }
        },
        ({ id, label }) => {
          _this.modal_ter.tipo_identificacion = id
          _this.format_tipo_id = label


          if (id == '7') {
            this.modal_ter.apellido_1 = ""
            this.modal_ter.apellido_2 = ""
            this.modal_ter.nombres = ""

            _this.modal_val_razon()
          }
          else {
            this.modal_ter.razon_social = ""
            _this.modal_val_apellido1()
          }
        }
      )
    },

    modal_val_razon() {
      const _this = this
      validarInputs(
        {
          form: '#modal_razon_cor201',
          orden: '1',
        },
        () => {
          _this.modal_val_tipo()
        },
        () => {
          if (this.modal_ter.razon_social.trim()) {
            this.modal_ter.razon_social = this.modal_ter.razon_social.toUpperCase()
            this.modal_val_direccion();
          }
          else {
            CON851("2", "2", null, "warning", "")
            _this.modal_val_razon()
          }
        },
      )
    },

    modal_val_apellido1() {
      const _this = this
      // console.log(this.modal_ter, "pare")
      validarInputs(
        {
          form: '#modal_apellido1_cor201',
          orden: '1',
        },
        () => {
          _this.modal_val_tipo()
        },
        () => {
          if (this.modal_ter.apellido_1.trim()) {
            this.modal_ter.apellido_1 = this.modal_ter.apellido_1.toUpperCase()
            _this.modal_val_apellido2()
          } else {
            CON851("2", "2", null, "warning", "")
            _this.modal_val_apellido1()
          }
        },
      )
    },

    modal_val_apellido2() {
      const _this = this
      validarInputs(
        {
          form: '#modal_apellido2_cor201',
          orden: '1',
        },
        () => {
          _this.modal_val_apellido1()
        },
        () => {
          if (this.modal_ter.apellido_2) {
            this.modal_ter.apellido_2 = this.modal_ter.apellido_2.toUpperCase().trim()
            _this.modal_val_nombres()
          } else {
            _this.modal_val_nombres()
            // CON851("2", "2", null, "warning", "")
            // _this.modal_val_apellido2()
          }
        },
      )
    },

    modal_val_nombres() {
      const _this = this
      validarInputs(
        {
          form: '#modal_nombres_cor201',
          orden: '1',
        },
        () => {
          _this.modal_val_apellido2()
        },
        () => {
          if (this.modal_ter.nombres.trim()) {
            this.modal_ter.nombres = this.modal_ter.nombres.toUpperCase()
            this.modal_ter.razon_social = `${this.modal_ter.apellido_1} ${this.modal_ter.apellido_2} ${this.modal_ter.nombres}`
            _this.modal_val_direccion()
          } else {
            CON851("2", "2", null, "warning", "")
            _this.modal_val_nombres()
          }
        },
      )
    },

    modal_val_direccion() {
      const _this = this
      validarInputs(
        {
          form: '#modal_dirreccion_cor201',
          orden: '1',
        },
        () => {
          if (_this.modal_ter.tipo_identificacion == '7') {
            _this.modal_val_razon()
          } else {
            _this.modal_val_nombres()
          }
        },
        () => {
          if (this.modal_ter.direccion.trim()) {
            this.modal_ter.direccion = this.modal_ter.direccion.toUpperCase()
            _this.modal_val_telefono()
          } else {
            CON851("2", "2", null, "warning", "")
            _this.modal_val_direccion()
          }
        },
      )
    },

    modal_val_telefono() {
      const _this = this
      validarInputs(
        {
          form: '#modal_telefono_cor201',
          orden: '1',
        },
        () => {
          _this.modal_val_direccion()
        },
        () => {
          if (this.modal_ter.telefono.trim()) {
            _this.modal_val_email()
          } else {
            CON851("2", "2", null, "warning", "")
            _this.modal_val_telefono
          }
        },
      )
    },

    modal_val_email() {
      const _this = this
      validarInputs(
        {
          form: '#modal_email_cor201',
          orden: '1',
        },
        () => {
          _this.modal_val_telefono()
        },
        () => {
          if (_this.modal_ter.email.trim()) {
            this.modal_ter.email = this.modal_ter.email.toUpperCase()
            this.bajar_datos_terceros()
          } else {
            CON851("2", "2", null, "warning", "")
            _this.modal_val_email()
          }
        },
      )
    },

    bajar_datos_terceros() {
      let ter = this.modal_ter
      let novedad = "7"

      let tipo_documento = this.format_tipo_id.split('-', 1)
      let documento = ter.id

      let razon_social = ter.razon_social
      let apellido1 = ter.apellido_1
      let apellido2 = ter.apellido_2
      let nombres = ter.nombres
      let direccion = ter.direccion
      let telefono = ter.telefono
      let email = ter.email

      // let datos_envio = [novedad, tipo_documento, documento, razon_social, apellido1, apellido2, nombres, direccion, telefono, email].join('|')

      let datos_envio = {
        datosh: datosEnvio(),
        novedad: novedad,
        tipo_documento: tipo_documento,
        documento: documento,
        razon_social: razon_social,
        apellido1: apellido1,
        apellido2: apellido2,
        nombres: nombres,
        direccion: direccion,
        telefono: telefono,
        email: email
      }
      // console.log(datos_envio, "datos envio")
      // postData({datosh: datos_envio() + datos_envio + '|'}, get_url('APP/COR/COR201C.DLL'))
      postData(datos_envio, get_url('APP/COR/CORR201C.DLL'))
        .then(data => {
          CON851("", "Grabado correctamente", null, "success", "");
          $('#modal_terceros_cor201').modal('hide');
          this.terceros.push({
            ACT: "",
            CIUDAD: "",
            COD: documento,
            CODACT: "",
            DESCRIPTER2: `${apellido1} ${apellido2} ${nombres}`,
            DIRREC: direccion,
            DV: "",
            EMAIL2: email,
            EMBARGOS: "",
            ENTIDAD: "",
            EXENT: "",
            FACTOR: "",
            NOMBRE: razon_social,
            TELEF: telefono
          })
          // _enterInput('#validar_remitente_cor201')
          this.validar_remitente()
        })
        .catch(err => {
          console.error("error grabando Tercero", err);
          CON851('', 'error grabando tercero', null, 'error', "");
          this.modal_val_email()
        })
    },

    validar_dia() {
      const _this = this
      validarInputs(
        {
          form: '#validar_dia_cor201',
          orden: '1',
        },
        this.validar_mes,
        () => {
          let dia = parseInt(_this.reg.datos_w.fecha_w.dia_w) || 0
          if (dia < 1 || dia > 31) _this.validar_dia()
          else _this.validar_remitente()
        },
      )
    },
    validar_mes() {
      const _this = this
      validarInputs(
        {
          form: '#validar_mes_cor201',
          orden: '1',
        },
        this.validar_anio,
        () => {
          let mes = parseInt(_this.reg.datos_w.fecha_w.mes_w) || 0
          if (mes < 1 || mes > 12) _this.validar_mes()
          else _this.validar_dia()
        },
      )
    },
    validar_anio() {
      validarInputs(
        {
          form: '#validar_anio_cor201',
          orden: '1',
        },
        () => {
          this.dato_1()
        },
        this.validar_mes,
      )
    },
    dato_3() {
      const admin_w = localStorage.Usuario
      if (
        admin_w == 'GMRI' ||
        admin_w == 'ADMI' ||
        admin_w == 'GEBC' ||
        admin_w == 'YEYO'
      ) {
        this.validar_anio()
      } else this.validar_remitente()
    },
    procedencia() {
      const _this = this
      POPUP(
        {
          titulo: 'PROCEDENCIA',
          indices: [{ id: 'id', label: 'label' }],
          seleccion: this.reg.datos_w.proceden_w || '1',
          array: [
            { id: 1, label: 'EXTERNO' },
            { id: 2, label: 'INTERNO' },
          ],
          callback_f: () => {
            setTimeout(_this.manejo, 300)
          },
        },
        (data) => {
          _this.reg.datos_w.proceden_w = data
          _this.format_procedencia = `${data.id} - ${data.label}`
          _this.dato_3()
        },
      )
    },
    manejo() {
      const _this = this
      POPUP(
        {
          titulo: 'MANEJO',
          indices: [{ id: 'id', label: 'label' }],
          seleccion: this.reg.datos_w.manejo_w || '1',
          array: [
            { id: 1, label: 'INFORMATIVO' },
            { id: 2, label: 'RESOLUTIVO' },
          ],
          callback_f: () => {
            _this.dato_1()
          },
        },
        (data) => {
          _this.reg.datos_w.manejo_w = data
          _this.format_manejo = `${data.id} - ${data.label}`
          setTimeout(_this.procedencia, 300)
        },
      )
    },
    holding() {
      if (this.nit_usu != 900566047) this.manejo()
      else {
        // Validar HOLDING
        CON850(this.validar_novedad) // Temp
      }
    },
    nuevo(data) {
      this.reg.datos_w = init_datos_w()
      this.original = JSON.parse(JSON.stringify(data))

      let fecha_actual = moment().format('YYYY-MM-DD')
      let hora_actual = moment().format('HH:mm')

      this.reg.datos_w.fecha_w.ano_w = fecha_actual.split('-')[0]
      this.reg.datos_w.fecha_w.mes_w = fecha_actual.split('-')[1]
      this.reg.datos_w.fecha_w.dia_w = fecha_actual.split('-')[2]

      this.reg.datos_w.hora_w = hora_actual
      this.holding()
    },
    cambio(data) {
      const _this = this

      this.original = JSON.parse(JSON.stringify(data))

      let fecha_w = {
        ano_w: data.fecha.substring(0, 4),
        mes_w: data.fecha.substring(4, 6),
        dia_w: data.fecha.substring(6, 8),
      }

      let hora = data.hora
      let hora_w = `${hora.substring(0, 2)}:${hora.substring(2, 4)}`

      let dptoremi = parseInt(data.dpto_remi) || 0
      let dptoremi_w = dptoremi.toString().padStart(5, '0')
      let dptoremi_busc = _this.dependencias_remit.find(
        (el) => el.codigo.padStart(5, '0') == dptoremi_w,
      )

      let manejo_w = parseInt(data.manejo) || 1
      if (manejo_w == 1) _this.format_manejo = `1 - INFORMATIVO`
      else if (manejo_w == 2) _this.format_manejo = `2 - RESOLUTIVO`

      let proceden_w = parseInt(data.procedencia) || 1
      if (proceden_w == 1) _this.format_procedencia = `1 - EXTERNO`
      else if (proceden_w == 2) _this.format_procedencia = `2 - INTERNO`

      let tipo_corr = parseInt(data.tipo_corr) || 0
      let tipo_corres_w = tipo_corr.toString().padStart(2, '0')
      let tipo_corres_busc = _this.tipos_corres.find(
        (el) => el.codigo.padStart(2, '0') == tipo_corres_w,
      )

      let cod_auxco = parseInt(data.cod_aux_cod) || 0
      let cod_auxco_w =
        cod_auxco !== 0 ? cod_auxco.toString().padStart(3, '0') : null
      let cod_auxco_busc = _this.aux_corres.find(
        (el) => el.codigo.padStart(3, '0') == cod_auxco_w,
      )

      let descrip_w = data.descripcion

      let serv = parseInt(data.cod_serco) || 0
      let serv_w = serv.toString().padStart(3, '0')
      let serv_busc = _this.servicios.find(
        (el) => el.codigo.padStart(3, '0') == serv_w,
      )

      let dep = parseInt(data.cod_depen) || 0
      let dep_w = dep.toString().padStart(3, '0')
      let dep_busc = _this.dependencias.find(
        (el) => el.codigo.padStart(3, '0') == dep_w,
      )

      let fol_w = data.folio
      let fold_w = data.folio_d

      let anex_w = data.anexo
      let tipo_anexo_w = data.tip_anex
      let otro_anexo_w = data.otr_anex

      let nro_fact_w = data.nro_fact

      let monto = parseFloat(data.monto) || 0
      _this.monto_mask.unmaskedValue = monto.toString()

      let fecha_fact_w = {
        ano_w: data.fecha_fact.substring(0, 4),
        mes_w: data.fecha_fact.substring(4, 6),
        dia_w: data.fecha_fact.substring(6, 8),
      }

      let fecha_entre_w = {
        ano_w: data.fecha_entr.substring(0, 4),
        mes_w: data.fecha_entr.substring(4, 6),
        dia_w: data.fecha_entr.substring(6, 8),
      }

      let nro_guia_w = data.nro_guia
      let persentre_w = data.presente
      let observ_w = data.observacion.trim().enterPut()

      _this.format_estado_inpt = `${data.esta} - ${format_estado(data.esta)}`

      let dias_max = data.dias_max

      let med_ingreso_w = parseInt(data.med_ingreso) || '0'
      let busqueda_med = _this.medios_respuesta.find(
        (el) => el.id == med_ingreso_w,
      )
      _this.format_medio_ingreso = busqueda_med
        ? `${busqueda_med.id} - ${busqueda_med.label}`
        : ''

      this.reg.datos_w = {
        ...this.reg.datos_w,
        fecha_w,
        hora_w,
        nit_w: parseInt(data.nit),
        dptoremi_w,
        manejo_w,
        proceden_w,
        tipo_corres_w,
        cod_auxco_w,
        descrip_w,
        serv_w,
        dep_w,
        fol_w,
        fold_w,
        anex_w,
        tipo_anexo_w,
        otro_anexo_w,
        nro_fact_w,
        fecha_fact_w,
        fecha_entre_w,
        nro_guia_w,
        persentre_w,
        observ_w,
        dias_max,
        med_ingreso_w,
      }
      // console.log("datos", data)
      this.textos.remitente = data.descrip_ter || '';
      // document.getElementById('nombre_remitente_cor201').value =
      //   data.descrip_ter || ''
      document.getElementById(
        'descrip_depto_remit_cor201',
      ).value = dptoremi_busc ? dptoremi_busc.descripcion : ''
      document.getElementById(
        'descrip_tipo_corr_cor201',
      ).value = tipo_corres_busc ? tipo_corres_busc.descripcion : ''
      document.getElementById('descrip_aux_corr_cor201').value = cod_auxco_busc
        ? cod_auxco_busc.descripcion
        : ''
      document.getElementById('descrip_servicio_cor201').value = serv_busc
        ? serv_busc.descripcion
        : ''
      document.getElementById('descrip_personal_cor201').value = dep_busc
        ? dep_busc.responsable
        : ''

      if (data.esta === '6') {
        jAlert(
          {
            titulo: 'Notificacion',
            mensaje: 'Correspondencia anulada',
          },
          _this.validar_radicado,
        )
      } else _this.manejo()
    },
    retiro(data) {
      const _this = this

      CON851P('02', _this.validar_radicado, () => {
        let novedad = _this.novedad.id
        const datos_envio = {
          datosh: datosEnvio(),
          novedad: novedad,
          llave: data.llave,
        }

        setTimeout(() => {
          // console.log('Envio', datos_envio)
          postData(datos_envio, get_url('APP/COR/CORR201.DLL')).then((data) => {
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
    leer_correspondencia() {
      const _this = this
      let novedad = _this.novedad.id
      let reg = _this.reg

      if (!reg.cont_w || !parseInt(reg.cont_w) || parseInt(reg.cont_w) == 0)
        _this.condiciones_novedad()
      else {
        let anio_corr = reg.ano_llave_w
        let cont_w = reg.cont_w
        let cont_w_format = cont_w.trim().padStart(6, '0')
        let llave_pon = anio_corr + cont_w_format

        postData(
          {
            datosh: datosEnvio(),
            paso: '2',
            novedad,
            codigo: llave_pon,
          },
          get_url('APP/COR/CORR868.DLL'),
        )
          .then((data) => {
            _this.reg.cont_w = cont_w_format
            _this.original = null

            if (novedad == '7') _this.nuevo(data)
            else if (novedad == '8') _this.cambio(data)
            else if (novedad == '9') _this.retiro(data)
          })
          .catch((err) => {
            console.log("error", err)
            setTimeout(_this.validar_radicado, 200)
          })
      }
    },
    validar_radicado() {
      validarInputs(
        {
          form: '#validar_radicado_COR201',
          orden: '1',
        },
        () => {
          CON850(this.validar_novedad)
        },
        () => {
          setTimeout(this.leer_correspondencia, 300)
        },
      )
    },
    validar_anio_rad() {
      validarInputs(
        {
          form: '#validar_anio_rad_COR201',
          orden: '1',
        },
        () => {
          CON850(this.validar_novedad)
        },
        this.validar_radicado,
      )
    },
    async condiciones_novedad() {
      const _this = this
      let reg = _this.reg
      let novedad = _this.novedad.id

      if (novedad == '7' || !reg.cont_w) await _this.buscar_numero()

      let ano_num = _this.fecha_num.ano_num
      if (novedad == '7') {
        if (reg.ult_fecha_num.ult_ano_num > ano_num) {
          CON851('37', '37', null, 'error', 'Error')
          setTimeout(() => {
            CON850(this.validar_novedad)
          }, 300)
        } else {
          reg.ano_llave_w = parseInt(ano_num) + 2000
          this.leer_correspondencia()
        }
      } else {
        reg.ano_llave_w = parseInt(ano_num) + 2000
        this.validar_anio_rad()
      }
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
    buscar_numero() {
      const _this = this
      return new Promise((resolve, rej) => {
        postData(
          { datosh: `${datosEnvio()}R4` },
          get_url('APP/CONTAB/CON007.DLL'),
        ).then((data) => {
          let res = data.split('|')
          let numero_ctl = res[1]

          let fecha = res[2]
          _this.reg.ult_fecha_num = {
            ult_ano_num: fecha.substring(0, 2),
            ult_mes_num: fecha.substring(2, 4),
            ult_dia_num: fecha.substring(4, 6),
          }

          let corres = parseInt(numero_ctl) || 1

          if (_this.novedad.id == '7')
            _this.reg.cont_w = corres.toString().padStart(6, '0')
          else _this.reg.cont_w = (parseInt(numero_ctl) - 1).toString()

          resolve()
        })
      })
    },
    dato_1() {
      this.reset_form()
      CON850(this.validar_novedad)
    },
    ventana_correspondencia() {
      const _this = this
      _ventanaDatos({
        titulo: 'VENTANA DE CORRESPONDENCIA',
        columnas: [
          'llave',
          'descrip_ter',
          'descrip_tipco',
          'fecha',
          'operdiri',
          'descrip_esta',
        ],
        data: _this.correspondencia,
        callback_esc: function () {
          document.getElementById('radicado_cor201').focus()
        },
        callback: function (data) {
          _this.reg.cont_w = data['cont_llave']
          _this.reg.ano_llave_w = data['ano_llave']
          _enterInput('#radicado_cor201')
        },
      })
    },
    ventana_personal_dest() {
      const _this = this

      let servicio = _this.reg.datos_w.serv_w
      let filtro = _this.dependencias.filter((el) => el.cod_serco == servicio)

      _ventanaDatos({
        titulo: 'VENTANA DE DEPENDENCIA CORRESP',
        columnas: ['codigo', 'descripcion', 'responsable', 'cod_serco'],
        data: filtro,
        // data: _this.dependencias,
        callback_esc: function () {
          document.getElementById('personal_dest_cor201').focus()
        },
        callback: function (data) {
          _this.reg.datos_w.dep_w = data['codigo']
          _enterInput('#personal_dest_cor201')
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
          document.getElementById('servicio_cor201').focus()
        },
        callback: function (data) {
          _this.reg.datos_w.serv_w = data['codigo']
          _enterInput('#servicio_cor201')
        },
      })
    },
    ventana_aux_corres() {
      const _this = this

      let tipo_corres = _this.reg.datos_w.tipo_corres_w
      let filtro = _this.aux_corres.filter((el) => el.cod_serco == tipo_corres)

      _ventanaDatos({
        titulo: 'VENTANA DE AUX TIPO CORRESPONDENCIA',
        columnas: ['codigo', 'descripcion', 'cod_serco'],
        data: filtro,
        callback_esc: function () {
          document.getElementById('aux_corr_cor201').focus()
        },
        callback: function (data) {
          _this.reg.datos_w.cod_auxco_w = data['codigo']
          _enterInput('#aux_corr_cor201')
        },
      })
    },
    ventana_tipo_corres() {
      const _this = this
      _ventanaDatos({
        titulo: 'VENTANA TIPO CORRESPONDENCIA',
        columnas: ['codigo', 'descripcion', 'dias'],
        data: _this.tipos_corres,
        callback_esc: function () {
          document.getElementById('tipo_corr_cor201').focus()
        },
        callback: function (data) {
          _this.reg.datos_w.tipo_corres_w = data['codigo']
          _enterInput('#tipo_corr_cor201')
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
          document.getElementById('depto_remit_cor201').focus()
        },
        callback: function (data) {
          _this.reg.datos_w.dptoremi_w = data['codigo']
          _enterInput('#depto_remit_cor201')
        },
      })
    },
    escVentana_terceros() {
      this.mostrarVentanaTerceros = false
      this.validar_remitente()
    },
    ventana_terceros() {
      _fin_validar_form()
      const _this = this
      this.mostrarVentanaTerceros = true;
    },
    successVentana_terceros(data) {
      this.mostrarVentanaTerceros = false
      this.reg.datos_w.nit_w = data.cod
      // this.textos.remitente = data.descrip
      this.validar_remitente()
      // setTimeout(() => _enterInput("#nit_remitente_cor201"), 300)
    },
    reset_form() {
      _inputControl('reset')
      _inputControl('disabled')
      this.reg.datos_w = init_datos_w()
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

      this.dato_1()
      loader('hide')
      let correspondencia = await get('correspondencia')
      this.correspondencia = correspondencia.depencias
    },
  },
})
