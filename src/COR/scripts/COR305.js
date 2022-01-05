const { get, format_estado } = require('../../COR/scripts/COR.ctrl.js')

new Vue({
  el: '#COR301',
  data() {
    let fecha_actual = moment().format('YYYY/MM/DD')
    let obj = {
      ano_w: fecha_actual.split('/')[0],
      mes_w: fecha_actual.split('/')[1],
      dia_w: fecha_actual.split('/')[2],
    }

    return {
      formato: {},
      reg: {
        nit_w: null,
        dep_w: null,
        tipo_corres_w: null,
        fecha_inicial: JSON.parse(JSON.stringify(obj)),
        fecha_final: JSON.parse(JSON.stringify(obj)),
        jornada: {},
        procedencia: {},
        manejo: {},
        descartar: {},
        respuesta: {},
      },
      format_formato: null,
      format_jornada: null,
      format_procedencia: null,
      format_manejo: null,
      format_descartar: null,
      format_repuesta: null,

      terceros: [],
      dependencias: [],
      tipos_corres: [],
    }
  },
  created() {
    console.clear()
    _vm = this

    nombreOpcion('3-5 - Informe de distribución  interna')
    _inputControl('reset')
    _inputControl('disabled')
    loader('show')
    this.get_json()
  },
  methods: {
    async get_json() {
      let terceros = await get('terceros')
      this.terceros = terceros.TERCEROS

      let dependencias = await get('dependencias')
      this.dependencias = dependencias.depen_cor

      let tipos_corres = await get('tipos')
      this.tipos_corres = tipos_corres.tipos

      loader('hide')
      this.datos_fijos()
    },
    datos_fijos() {
      this.reg.nit_w = '99'
      document.getElementById('nombre_entidad_COR301').value =
        'TODAS LAS ENTIDADES'

      this.reg.dep_w = '***'
      document.getElementById('descripcion_dep_COR301').value =
        'TODAS LAS DEPENDENCIAS'

      this.reg.tipo_corres_w = '**'
      document.getElementById('descrip_tipo_COR301').value = 'TODOS LOS TIPOS'

      this.format_jornada = '* - Todas'
      this.format_procedencia = '** - Todas'
      this.format_manejo = '** - Todas'

      this.solicitar_formato()
    },
    solicitar_formato() {
      this.formato = { id: 1, label: 'Formato PDF' }
      this.format_formato = `1 - Formato PDF`
      this.validar_entidad()
    },
    validar_entidad() {
      const _this = this

      validarInputs(
        {
          form: '#validar_entidad_COR301',
          orden: '1',
        },
        _toggleNav,
        () => {
          let nit = _this.reg.nit_w

          if (_this.terceros && nit && nit.toString().trim()) {
            let busqueda = _this.terceros.find((el) => el.COD == nit)
            if (!busqueda && nit != '99') {
              document.getElementById('nombre_entidad_COR301').value = ''
              _this.validar_entidad()
              CON851('01', '01', null, 'error', 'Advertencia')
            } else {
              if (nit == '99')
                document.getElementById('nombre_entidad_COR301').value =
                  'TODAS LAS ENTIDADES'
              else
                document.getElementById('nombre_entidad_COR301').value =
                  busqueda.NOMBRE

              _this.validar_dependencia()
            }
          } else _this.validar_entidad()
        },
      )
    },
    validar_dependencia() {
      const _this = this
      validarInputs(
        {
          form: '#validar_dependencia_COR301',
          orden: '1',
        },
        _this.validar_entidad,
        () => {
          let servicio = _this.reg.dep_w || ''
          let servicio_format = servicio.padStart(3, '0')
          _this.reg.dep_w = servicio_format

          let busqueda = _this.dependencias.find(
            (el) => el.codigo.padStart(3, '0') == servicio_format,
          )
          if (!busqueda && servicio != '***') {
            document.getElementById('descripcion_dep_COR301').value = ''
            _this.validar_dependencia()
            CON851('01', '01', null, 'error', 'Advertencia')
          } else {
            let envio_final = () => {
              if (servicio == '***')
                document.getElementById('descripcion_dep_COR301').value =
                  'TODAS LAS DEPENDENCIAS'
              else
                document.getElementById('descripcion_dep_COR301').value =
                  busqueda.responsable

              _this.validar_tipo()
            }

            if (servicio == '***' || busqueda.oper != localStorage.Usuario) {
              _this
                .buscar_restric('R31X')
                .then(envio_final)
                .catch(_this.validar_dependencia)
            } else envio_final()
          }
        },
      )
    },
    validar_tipo() {
      const _this = this
      validarInputs(
        {
          form: '#validar_tipo_COR301',
          orden: '1',
        },
        _this.validar_dependencia,
        () => {
          let tipo = _this.reg.tipo_corres_w || ''
          let tipo_format = tipo.padStart(2, '0')
          _this.reg.tipo_corres_w = tipo_format

          let busqueda_tipo = _this.tipos_corres.find(
            (el) => el.codigo.padStart(2, '0') == tipo_format,
          )
          if (!busqueda_tipo && tipo != '**') {
            document.getElementById('descrip_tipo_COR301').value = ''
            _this.validar_tipo()
            CON851('01', '01', null, 'error', 'Advertencia')
          } else {
            if (tipo == '**')
              document.getElementById('descrip_tipo_COR301').value =
                'TODOS LOS TIPOS'
            else
              document.getElementById('descrip_tipo_COR301').value =
                busqueda_tipo.descripcion

            setTimeout(this.validar_descartar, 300)
          }
        },
      )
    },
    validar_descartar() {
      POPUP(
        {
          titulo: 'DESCARTAR POR TIPO',
          indices: [{ id: 'id', label: 'label' }],
          seleccion: this.reg.descartar.id || 'N',
          array: [
            { id: 'S', label: 'SI' },
            { id: 'N', label: 'NO' },
          ],
          teclaAlterna: true,
          callback_f: this.validar_tipo,
        },
        (data) => {
          this.reg.descartar = data
          this.format_descartar = `${data.id} - ${data.label}`
          setTimeout(this.ano_inicial, 300)
        },
      )
    },
    ano_inicial() {
      const _this = this
      validarInputs(
        {
          form: '#validar_anio_ini_COR301',
          orden: '1',
        },
        _this.validar_descartar,
        _this.mes_inicial,
      )
    },
    mes_inicial() {
      const _this = this
      validarInputs(
        {
          form: '#validar_mes_ini_COR301',
          orden: '1',
        },
        _this.ano_inicial,
        () => {
          let mes = parseInt(_this.reg.fecha_inicial.mes_w) || 0
          if (mes < 1 || mes > 12) _this.mes_inicial()
          else _this.dia_inicial()
        },
      )
    },
    dia_inicial() {
      const _this = this
      validarInputs(
        {
          form: '#validar_dia_ini_COR301',
          orden: '1',
        },
        _this.mes_inicial,
        () => {
          let dia = parseInt(_this.reg.fecha_inicial.dia_w) || 0
          if (dia < 1 || dia > 31) _this.dia_inicial()
          else _this.ano_final()
        },
      )
    },
    ano_final() {
      const _this = this
      validarInputs(
        {
          form: '#validar_anio_fin_COR301',
          orden: '1',
        },
        _this.dia_inicial,
        _this.mes_final,
      )
    },
    mes_final() {
      const _this = this
      validarInputs(
        {
          form: '#validar_mes_fin_COR301',
          orden: '1',
        },
        _this.ano_final,
        () => {
          let mes = parseInt(_this.reg.fecha_final.mes_w) || 0
          if (mes < 1 || mes > 12) _this.mes_final()
          else _this.dia_final()
        },
      )
    },
    dia_final() {
      const _this = this
      validarInputs(
        {
          form: '#validar_dia_fin_COR301',
          orden: '1',
        },
        _this.mes_final,
        () => {
          let dia = parseInt(_this.reg.fecha_final.dia_w) || 0
          if (dia < 1 || dia > 31) _this.mes_final()
          else _this.validar_jornada()
        },
      )
    },
    validar_jornada() {
      POPUP(
        {
          titulo: 'JORNADA',
          indices: [{ id: 'id', label: 'label' }],
          seleccion: this.reg.jornada.id || '*',
          array: [
            { id: 'M', label: 'Mañana' },
            { id: 'T', label: 'Tarde' },
            { id: '*', label: 'Todas' },
          ],
          teclaAlterna: true,
          callback_f: this.dia_final,
        },
        (data) => {
          this.reg.jornada = data
          this.format_jornada = `${data.id} - ${data.label}`
          setTimeout(this.validar_procedencia, 300)
        },
      )
    },
    validar_procedencia() {
      POPUP(
        {
          titulo: 'PROCEDENCIA',
          indices: [{ id: 'id', label: 'label' }],
          seleccion: this.reg.procedencia.id || '**',
          array: [
            { id: 1, label: 'Externo' },
            { id: 2, label: 'Interno' },
            { id: '**', label: 'Todas' },
          ],
          teclaAlterna: true,
          callback_f: () => {
            setTimeout(this.validar_jornada, 300)
          },
        },
        (data) => {
          this.reg.procedencia = data
          this.format_procedencia = `${data.id} - ${data.label}`
          setTimeout(this.validar_manejo, 300)
        },
      )
    },
    validar_manejo() {
      POPUP(
        {
          titulo: 'MANEJO',
          indices: [{ id: 'id', label: 'label' }],
          seleccion: this.reg.manejo.id || '**',
          array: [
            { id: 1, label: 'Informativo' },
            { id: 2, label: 'Resolutivo' },
            { id: '**', label: 'Todas' },
          ],
          teclaAlterna: true,
          callback_f: () => {
            setTimeout(this.validar_procedencia, 300)
          },
        },
        (data) => {
          this.reg.manejo = data
          this.format_manejo = `${data.id} - ${data.label}`
          setTimeout(this.validar_envio, 300)
        },
      )
    },
    validar_envio() {
      const _this = this
      const reg = this.reg

      let nit = reg.nit_w
      let dep = reg.dep_w
      let tipo_corr = reg.tipo_corres_w

      let inicial = reg.fecha_inicial
      let ini_format = this.fecha_edit(inicial)
      let fecha_ini = `${ini_format.ano_w}${ini_format.mes_w}${ini_format.dia_w}`

      let final = reg.fecha_final
      let fin_format = this.fecha_edit(final)
      let fecha_fin = `${fin_format.ano_w}${fin_format.mes_w}${fin_format.dia_w}`

      let jor = reg.jornada.id
      let procedencia =
        reg.procedencia.id != '**'
          ? reg.procedencia.id.toString().padStart(2, '0')
          : '**'
      let manejo =
        reg.manejo.id != '**' ? reg.manejo.id.toString().padStart(2, '0') : '**'

      let paso = ''
      let descartar = reg.descartar.id
      if (descartar == 'S') paso = 2
      else paso = 1

      let datos_envio = {
        datosh: datosEnvio(),
        nit,
        dep,
        tipo_corr,
        fecha_ini,
        fecha_fin,
        jor,
        procedencia,
        manejo,
        paso,
      }

      loader('show')
      postData(datos_envio, get_url('APP/COR/CORR301.DLL'))
        .then((res) => {
          loader('hide')
          let data = res.ctrl_corresp
          let filtro = data.filter((el) => el.cont && el.cont.trim())
          if (filtro.length > 0)
            _this.formato_impresion(data, { fecha_ini, fecha_fin })
          else {
            CON851('08', '08', null, 'error', 'Advertencia')
            this.validar_entidad()
          }
        })
        .catch((error) => {
          loader('hide')
          console.error('Error ->', error)
          this.validar_entidad()
        })
    },
    async formato_impresion(data = [], fechas = {}) {
      const _this = this

      let empresa = $_USUA_GLOBAL[0].NOMBRE
      let nit = $_USUA_GLOBAL[0].NIT
      let fecha_ini = moment(fechas.fecha_ini).format('DD/MM/YYYY')
      let fecha_fin = moment(fechas.fecha_fin).format('DD/MM/YYYY')

      console.log(data)

      var filtro = data.filter((el) => el.estado !== '6')

      var data_format = filtro.map((el) => {
        el.fecha_format = moment(el.fecha).format('DD/MM/YYYY')
        el.hora_format = `${el.hora.substring(0, 2)}:${el.hora.substring(2, 4)}`
        el.folio_format = `${el.folio} de ${el.folio_d}`
        el.estado_format = format_estado(el.estado)
        el.radicado_entrada = el.cont + '-E'
        el.radicado_salida = el.cont_resp + '-S'

        return el
      })

      const header_pdf = [
        [
          {
            margin: [0, 6, 0, 0],
            text: 'Radicado'.toUpperCase(),
            value: 'radicado_entrada',
            style: 'headerTabla',
            alignment: 'center',
            rowSpan: 2,
          },
          {
            margin: [0, 6, 0, 0],
            text: 'Fecha'.toUpperCase(),
            value: 'fecha_format',
            style: 'headerTabla',
            rowSpan: 2,
            alignment: 'center',
          },
          {
            margin: [0, 6, 0, 0],
            text: 'Hora'.toUpperCase(),
            value: 'hora_format',
            style: 'headerTabla',
            alignment: 'center',
            rowSpan: 2,
          },
          {
            margin: [0, 6, 0, 0],
            text: 'Solicitante'.toUpperCase(),
            value: 'descrip_ter',
            style: 'headerTabla',
            alignment: 'center',
            rowSpan: 2,
          },
          {
            margin: [0, 6, 0, 0],
            text: 'Dependencia'.toUpperCase(),
            value: 'descrip_serco',
            style: 'headerTabla',
            alignment: 'center',
            rowSpan: 2,
          },
          {
            margin: [0, 6, 0, 0],
            text: 'Cargo'.toUpperCase(),
            value: 'car',
            style: 'headerTabla',
            alignment: 'center',
            rowSpan: 2,
          },
          {
            text: 'Se hizo entrega'.toUpperCase(),
            value: '',
            style: 'headerTabla',
            colSpan: 2,
          },
          {},
          {
            margin: [0, 6, 0, 0],
            text: 'Observaciones'.toUpperCase(),
            value: '',
            style: 'headerTabla',
            rowSpan: 2,
            alignment: 'center',
          },
          {
            margin: [0, 6, 0, 0],
            text: 'Firma'.toUpperCase(),
            value: '',
            style: 'headerTabla',
            rowSpan: 2,
            alignment: 'center',
          },
        ],
        [
          {},
          {},
          {},
          {},
          {},
          {},
          {
            text: 'SI',
            style: 'headerTabla',
            alignment: 'center',
          },
          {
            text: 'NO',
            style: 'headerTabla',
            alignment: 'center',
          },
          {},
          {},
        ],
      ]

      let width_tabla_pdf = [
        'auto',
        'auto',
        'auto',
        'auto',
        'auto',
        'auto',
        'auto',
        'auto',
        '*',
        'auto',
      ]
      const detalle_tabla_pdf = header_pdf

      for (const el of data_format) {
        var canvas = document.createElement('CANVAS')

        await JsBarcode(canvas, el.radicado_entrada, {
          width:4,
          height:40,
          displayValue: true
        })

        let url = canvas.toDataURL()
        canvas.remove()

        let obj = [
          { image: url, fit: [200, 200] },
          { text: el.fecha_format },
          { text: el.hora_format },
          { text: el.descrip_ter },
          { text: el.descrip_serco },
          { text: el.car },
          { text: '' },
          { text: '' },
          { text: '' },
          { text: '' },
        ]

        detalle_tabla_pdf.push(obj)
      }

      var content = {
        pageMargins: [20, 110, 20, 60],
        pageOrientation: 'landscape',
        images: { logo: `P:\\PROG\\LOGOS\\${nit}.png` },
        // images: { logo: `C:\\PROSOFT\\LOGOS\\00037021.png` },
        header: function (currentPage, pageCount, pageSize) {
          return [
            {
              margin: [20, 20],
              canvas: [
                {
                  type: 'rect',
                  x: 0,
                  y: 0,
                  w: pageSize.width - 40,
                  h: 80,
                  r: 0,
                  lineWidth: 1,
                  lineColor: '#000',
                },
              ],
            },
            {
              margin: [20, -80],
              columns: [
                {
                  width: '20%',
                  margin: [15, -5, 0, 0],
                  stack: [
                    {
                      image: 'logo',
                      width: 50,
                      height: 50,
                    },
                  ],
                },
                {
                  width: '60%',
                  text: [
                    {
                      text: `${empresa.toUpperCase()}\n`,
                      fontSize: 16,
                      bold: true,
                    },
                    {
                      text: `PQRD'S RECIBIDAS EN VENTANILLA PARA DISTRIBUCION INTERNA\n`,
                      style: 'subTitulo',
                    },
                    {
                      text: `FECHA: ${fecha_ini} - ${fecha_fin}`,
                      style: 'subTitulo',
                    },
                  ],
                },
                {
                  width: '20%',
                  text: '\nOpc. 3.5',
                },
              ],
            },
          ]
        },
        content: [
          {
            style: 'contentTabla',
            table: {
              headerRows: 2,
              widths: width_tabla_pdf,
              body: detalle_tabla_pdf,
            },
            layout: {
              hLineWidth: function (i, node) {
                return 1
              },
              vLineWidth: function (i) {
                return 1
              },
              hLineColor: function (i) {
                return '#aaa'
              },
              vLineColor: function (i) {
                return '#aaa'
              },
            },
          },
        ],
        styles: {
          subTitulo: {
            fontSize: 10,
            bold: true,
          },
          headerTabla: {
            fontSize: 7,
            bold: true,
          },
          contentTabla: {
            fontSize: 8,
          },
        },
      }

      let formato = this.formato.id
      let config = {
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`,
      }

      if (formato == 1) {
        config = {
          ...config,
          archivo: config.archivo + '.pdf',
          tipo: 'pdf',
          content,
        }
      }

      _impresion2(config)
        .then(() => {
          _this.datos_fijos()
        })
        .catch((error) => {
          console.error('Error durante la impresión', error)
          _this.datos_fijos()
        })
    },

    fecha_edit(obj) {
      return {
        ano_w: obj.ano_w.toString().padStart(4, '0'),
        mes_w: obj.mes_w.toString().padStart(2, '0'),
        dia_w: obj.dia_w.toString().padStart(2, '0'),
      }
    },
    buscar_restric(opcion) {
      return new Promise((resolve, reject) => {
        let admin = localStorage.Usuario
        postData(
          { datosh: `${datosEnvio()}${admin}|${opcion}|` },
          get_url('APP/CONTAB/CON904.DLL'),
        )
          .then(resolve)
          .catch(reject)
      })
    },
    ventana_tipo() {
      const _this = this
      _ventanaDatos({
        titulo: 'VENTANA TIPO CORRESPONDENCIA',
        columnas: ['codigo', 'descripcion', 'dias'],
        data: _this.tipos_corres,
        callback_esc: function () {
          document.getElementById('tipo_COR301').focus()
        },
        callback: function (data) {
          _this.reg.tipo_corres_w = data['codigo']
          _enterInput('#tipo_COR301')
        },
      })
    },
    ventana_dependencias() {
      const _this = this
      _ventanaDatos({
        titulo: 'VENTANA DE DEPENDENCIA CORRESP',
        columnas: ['codigo', 'descripcion', 'responsable', 'cod_serco'],
        data: _this.dependencias,
        callback_esc: function () {
          document.getElementById('dependencia_COR301').focus()
        },
        callback: function (data) {
          _this.reg.dep_w = data['codigo']
          _enterInput('#dependencia_COR301')
        },
      })
    },
    ventana_terceros() {
      const _this = this
      if (!_this.terceros) _this.validar_entidad()
      else {
        _ventanaDatos_lite_v2({
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
            document.getElementById('nit_entidad_COR301').focus()
          },
          callback: function (data) {
            _this.reg.nit_w = data['COD']
            _enterInput('#nit_entidad_COR301')
          },
        })
      }
    },
  },
})
