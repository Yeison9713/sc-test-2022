module.exports = Vue.component('COR-PEND', {
  props: {
    estado: false,
  },
  async mounted() {
    // $('#notificaciones_correspondencia').modal('show')
    await this.get_correspondencia()
  },
  data() {
    return {
      correspondencia: [],
    }
  },
  watch: {
    estado: (estado) => {
      console.log('Cambio')
      if (estado) $('#notificaciones_correspondencia').modal('show')
    },
  },
  methods: {
    format_tabla() {
      const _this = this
      let data = _this.correspondencia
      let language = {
        lengthMenu: 'Mostrar _MENU_ por página',
        zeroRecords: 'No hay datos disponibles',
        info: 'Página _PAGE_ de _PAGES_',
        infoEmpty: 'No hay datos disponibles',
        infoFiltered: '(filtrado de  _MAX_ registros)',
        loadingRecords: 'Cargando...',
        processing: 'Procesando...',
        sSearch: 'Buscar:',
        paginate: {
          first: 'Primera',
          last: 'Final',
          next: 'Siguiente',
          previous: 'Anterior',
        },
      }

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

      let data_format = data.map((el) => {
        el.manejo = el.manejo.trim()
        el.descrip_serco = el.descrip_serco.trim()
        el.fecha_format = moment(el.fecha).format('DD/MM/YYYY')
        el.hora_format = `${el.hora.substring(0, 2)}:${el.hora.substring(2, 4)}`
        el.folio_format = `${el.folio} de ${el.folio_d}`

        let fecha_inicial = moment(el.fecha)
        let fecha_final = moment()
        let diferencia = fecha_final.diff(fecha_inicial, 'days')

        el.dias_format = `${diferencia} de ${parseInt(el.dias_tipco)} máximo`

        // let vencida = diferencia > parseInt(el.dias_tipco)
        let estado = format_estado(el.estado)
        el.estado_format = `<span class="label ${estado.color}">${estado.label}</span>`

        return el
      })

      console.log(data_format)

      // _ventanaDatos({
      //   titulo: 'VENTANA MACROS DE CORRESPONDENCIA',
      //   columnas: ['cont', 'fecha_format', 'hora_format', 'manejo', 'descrip_serco', 'estado_format', 'dias_format'],
      //   data: _this.macros,
      //   callback_esc: function () {
      //     document.getElementById('cod_macro_COR405').focus()
      //   },
      //   callback: function (data) {
      //     _this.reg.codigo_macro_w = data.codigo
      //     _enterInput('#cod_macro_COR405')
      //   },
      // })

      let data_table = $('#tabla_notificaciones').DataTable({
        data: data_format,
        columns: [
          { data: 'cont', className: 'dt-body-center' },
          { data: 'fecha_format', className: 'dt-body-left' },
          { data: 'hora_format', className: 'dt-body-left' },
          { data: 'manejo', className: 'dt-body-left' },
          { data: 'descrip_serco', className: 'dt-body-left' },
          { data: 'estado_format', className: 'dt-body-center' },
          { data: 'dias_format', className: 'dt-body-center' },
        ],
        language,
        responsive: true,
        scrollY: '50vh',
        scrollCollapse: true,
      })
    },
    get_correspondencia() {
      const _this = this

      return new Promise((res, rej) => {
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
              _this.correspondencia = filtro
              _this.format_tabla()
            } else {
              CON851('08', '08', null, 'error', 'Advertencia')
            }
          })
          .catch((error) => {
            CON851('08', '08', null, 'error', 'Advertencia')
            console.error('Error ->', error)
          })
      })
    },
    cerrar_notificaciones() {
      $('#notificaciones_correspondencia').modal('hide')
      this.$emit('cerrar')
    },
  },
  template: /*html*/ `
    <div
    id="notificaciones_correspondencia"
    class="modal fade"
    tabindex="-1"
    data-backdrop="static"
    data-keyboard="false"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-full">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Correspondencia pendiente</h4>
        </div>
        <div class="modal-body">
          <table id="tabla_notificaciones" class="display responsive nowrap">
            <thead>
              <tr>
                <th>Radicado</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Tipo</th>
                <th>Dependencia</th>
                <th>Estado</th>
                <th>Dias transcurridos</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn red"
            @click="cerrar_notificaciones()"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
    `,
})
