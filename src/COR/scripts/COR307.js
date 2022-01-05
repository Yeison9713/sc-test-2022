var Chart = require('chart.js')
new Vue({
  el: '#COR307',
  data() {
    return {
      format_formato: '1 - Formato PDF',
      anio_consulta: null,
    }
  },
  created() {
    console.clear()

    nombreOpcion('3-7 - Informe trimestral')
    _inputControl('reset')
    _inputControl('disabled')

    this.validar_anio()
  },
  methods: {
    validar_anio() {
      const _this = this
      validarInputs(
        {
          form: '#validar_anio_cor307',
          orden: '1',
        },
        _toggleNav,
        () => {
          let anio_consulta = _this.anio_consulta

          let datos_envio = {
            datosh: datosEnvio(),
            anio: anio_consulta,
          }

          loader('show')
          postData(datos_envio, get_url('APP/COR/CORR869.DLL'))
            .then((data) => {
              loader('hide')

              let listado = data.listado
              //   console.log(JSON.stringify(listado))
              _this.format_impresion(listado)
            })
            .catch((error) => {
              loader('hide')
              console.error('Error ->', error)
              _this.validar_anio()
            })
        },
      )
    },
    graficar(listado) {
      // console.log('Data', listado)
      return new Promise((resolve) => {
        let create_canvas = document.createElement('canvas')
        create_canvas.style.display = 'none'
        create_canvas.style.width = '800'
        create_canvas.style.height = '400'

        document.getElementsByTagName('body')[0].appendChild(create_canvas)
        let canvas = create_canvas.getContext('2d')

        let datasets = []
        listado.forEach((el) => {
          let total = []

          for (let i = 1; i < 5; i++) {
            let label = `trimestre_${i}`
            let trimestre = el[label]
            if (trimestre) {
              total.push(trimestre.length)
            } else {
              total.push(0)
            }
          }

          const randomNum = () =>
            Math.floor(Math.random() * (235 - 52 + 1) + 52)
          const randomRGB = () =>
            `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`

          let obj = {
            label: el.descrip_serco,
            data: total,
            backgroundColor: randomRGB(),
          }

          datasets.push(obj)
        })

        const data = {
          labels: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Trimestre 1'],
          datasets,
        }

        let grafico = new Chart(canvas, {
          type: 'bar',
          data: data,
          options: {
            animation: {
              duration: 1,
              onComplete: async function () {
                const base64 = grafico.toBase64Image()
                document.querySelector('canvas').remove()
                resolve(base64)
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
          },
        })
      })
    },
    async format_impresion(data) {
      const _this = this
      let empresa = $_USUA_GLOBAL[0].NOMBRE
      let nit = $_USUA_GLOBAL[0].NIT
      let anio = this.anio_consulta

      let data_format = []
      data.forEach((el) => {
        let busqueda = data_format.find(
          (item) => item.cod_serco == el.cod_serco,
        )

        let fecha = el.fecha
        let mes = parseInt(fecha.substring(4, 6))
        let label_trimestre = ''

        if (mes < 4) label_trimestre = 'trimestre_1'
        else if (mes < 7) label_trimestre = 'trimestre_2'
        else if (mes < 10) label_trimestre = 'trimestre_3'
        else if (mes < 13) label_trimestre = 'trimestre_4'

        let obj = {
          cod_serco: el.cod_serco,
          descrip_serco: el.descrip_serco,
        }

        if (!busqueda) {
          obj.entradas_generales = 1
          obj[label_trimestre] = [el]
          data_format.push(obj)
        } else {
          busqueda[label_trimestre].push(el)
          busqueda.entradas_generales++
        }
      })

      let totales = {
        dependencia: 'Consolidado \n total'.toUpperCase(),
      }

      let format_data_tabla = []
      data_format.forEach((el) => {
        let obj = {
          dependencia: el.descrip_serco.toUpperCase(),
        }

        for (let i = 1; i < 5; i++) {
          let label = `trimestre_${i}`
          let trimestre = el[label]
          if (trimestre) {
            let generales = trimestre.length
            let resueltas = trimestre.filter(
              (item) => item.estado === '3' || item.estado === '4',
            ).length
            let pendientes = trimestre.filter(
              (item) => item.estado !== '3' && item.estado !== '4',
            ).length

            obj[`${label}_generales`] = generales
            obj[`${label}_resueltas`] = resueltas
            obj[`${label}_pendientes`] = pendientes

            totales[`${label}_generales`] =
              typeof totales[`${label}_generales`] != 'undefined'
                ? totales[`${label}_generales`] + generales
                : generales
            totales[`${label}_resueltas`] =
              typeof totales[`${label}_resueltas`] != 'undefined'
                ? totales[`${label}_resueltas`] + resueltas
                : resueltas
            totales[`${label}_pendientes`] =
              typeof totales[`${label}_pendientes`] != 'undefined'
                ? totales[`${label}_pendientes`] + pendientes
                : pendientes
          } else {
            obj[`${label}_generales`] = 0
            obj[`${label}_resueltas`] = 0
            obj[`${label}_pendientes`] = 0
          }

          obj[`${label}_sin_clasificar`] = 0
        }

        format_data_tabla.push(obj)
      })

      format_data_tabla.push(totales)

      let format_tabla = []
      let ultimo = format_data_tabla.length - 1
      format_data_tabla.forEach((el, index) => {
        let dependencia =
          el.dependencia.length < 20
            ? el.dependencia.padEnd(30, '\u200B\t')
            : el.dependencia

        let total_trimestre_1_generales = totales.trimestre_1_generales || 0
        let actual_1 = parseInt(el.trimestre_1_generales) || 0
        let porcentaje_1 = (actual_1 * 100) / total_trimestre_1_generales

        let total_trimestre_2_generales = totales.trimestre_2_generales || 0
        let actual_2 = parseInt(el.trimestre_2_generales) || 0
        let porcentaje_2 = (actual_2 * 100) / total_trimestre_2_generales

        let total_trimestre_3_generales = totales.trimestre_3_generales || 0
        let actual_3 = parseInt(el.trimestre_3_generales) || 0
        let porcentaje_3 = (actual_3 * 100) / total_trimestre_3_generales

        let total_trimestre_4_generales = totales.trimestre_4_generales || 0
        let actual_4 = parseInt(el.trimestre_4_generales) || 0
        let porcentaje_4 = (actual_4 * 100) / total_trimestre_4_generales

        let obj = [
          {
            text: index == ultimo ? el.dependencia : dependencia,
            fontSize: 5,
            bold: true,
            alignment: index == ultimo ? 'center' : 'left',
          },

          {
            text: el.trimestre_1_generales || 0,
            style: 'content_table',
            bold: index == ultimo,
          },
          {
            text: `${porcentaje_1 ? porcentaje_1.toFixed(1) : 0}%`,
            style: 'content_table',
            bold: index == ultimo,
          },
          {
            text: el.trimestre_1_pendientes || 0,
            style: 'content_table',
            bold: index == ultimo,
          },
          { text: '0', style: 'content_table', bold: index == ultimo },
          {
            text: el.trimestre_1_resueltas || 0,
            style: 'content_table',
            bold: index == ultimo,
          },

          {
            text: el.trimestre_2_generales || 0,
            style: 'content_table',
            bold: index == ultimo,
          },
          {
            text: `${porcentaje_2 ? porcentaje_2.toFixed(1) : 0}%`,
            style: 'content_table',
            bold: index == ultimo,
          },
          {
            text: el.trimestre_2_pendientes || 0,
            style: 'content_table',
            bold: index == ultimo,
          },
          { text: '0', style: 'content_table', bold: index == ultimo },
          {
            text: el.trimestre_2_resueltas || 0,
            style: 'content_table',
            bold: index == ultimo,
          },

          {
            text: el.trimestre_3_generales || 0,
            style: 'content_table',
            bold: index == ultimo,
          },
          {
            text: `${porcentaje_3 ? porcentaje_3.toFixed(1) : 0}%`,
            style: 'content_table',
            bold: index == ultimo,
          },
          {
            text: el.trimestre_3_pendientes || 0,
            style: 'content_table',
            bold: index == ultimo,
          },
          { text: '0', style: 'content_table', bold: index == ultimo },
          {
            text: el.trimestre_3_resueltas || 0,
            style: 'content_table',
            bold: index == ultimo,
          },

          {
            text: el.trimestre_4_generales || 0,
            style: 'content_table',
            bold: index == ultimo,
          },
          {
            text: `${porcentaje_4 ? porcentaje_4.toFixed(1) : 0}%`,
            style: 'content_table',
            bold: index == ultimo,
          },
          {
            text: el.trimestre_4_pendientes || 0,
            style: 'content_table',
            bold: index == ultimo,
          },
          { text: '0', style: 'content_table', bold: index == ultimo },
          {
            text: el.trimestre_4_resueltas || 0,
            style: 'content_table',
            bold: index == ultimo,
          },
        ]

        format_tabla.push(obj)
      })

      let titulo_trimestres = []
      let header_trimestres = []
      let plantilla = [
        { text: 'Entrad. generales'.toUpperCase(), style: 'header_table' },
        { text: '% Entrad. generales'.toUpperCase(), style: 'header_table' },
        { text: 'Pend. de respuesta'.toUpperCase(), style: 'header_table' },
        { text: 'Sin clasificar'.toUpperCase(), style: 'header_table' },
        {
          text: 'Resueltas'.toUpperCase(),
          style: 'header_table',
          margin: [0, 3, 0, 0],
        },
      ]

      for (let i = 0; i < 4; i++) {
        header_trimestres = [
          ...header_trimestres,
          ...JSON.parse(JSON.stringify(plantilla)),
        ]
        titulo_trimestres = [
          ...titulo_trimestres,
          {
            text: `Trimestre ${i + 1}`.toUpperCase(),
            style: 'header_table',
            colSpan: 5,
          },
          {},
          {},
          {},
          {},
        ]
      }

      let grafico = await _this.graficar(data_format)

      var content = {
        pageOrientation: 'landscape',
        pageMargins: [20, 105, 20, 20],
        images: { logo: `P:\\PROG\\LOGOS\\${nit}.png` },
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
                  h: 75,
                  r: 0,
                  lineWidth: 0.5,
                  lineColor: 'gray',
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
                      text: 'Reporte de correspondencia por trimestre\n'.toUpperCase(),
                      style: 'subTitulo',
                    },
                    {
                      text: `FECHA: ${anio}`,
                      style: 'subTitulo',
                    },
                  ],
                },
                {
                  width: '20%',
                  text: '\nOpc. 3.7',
                },
              ],
            },
          ]
        },
        content: [
          {
            table: {
              widths: [
                '*',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
              ],
              body: [
                [
                  { text: 'Año 2021'.toUpperCase(), style: 'header_table' },
                  ...titulo_trimestres,
                ],
                [
                  {
                    text: 'Dependencias'.toUpperCase(),
                    style: 'header_table',
                    margin: [0, 3, 0, 0],
                  },
                  ...header_trimestres,
                ],
                ...format_tabla,
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return 0.5
              },
              vLineWidth: function (i, node) {
                return 0.5
              },
              hLineColor: function (i, node) {
                return 'gray'
              },
              vLineColor: function (i, node) {
                return 'gray'
              },
              fillColor: function (rowIndex, node, columnIndex) {
                if (
                  (rowIndex === 0 && columnIndex === 1) ||
                  (rowIndex === 1 &&
                    (columnIndex === 1 ||
                      columnIndex === 2 ||
                      columnIndex === 3 ||
                      columnIndex === 4 ||
                      columnIndex === 5))
                )
                  return '#f44336'

                if (
                  (rowIndex === 0 && columnIndex === 6) ||
                  (rowIndex === 1 &&
                    (columnIndex === 6 ||
                      columnIndex === 7 ||
                      columnIndex === 8 ||
                      columnIndex === 9 ||
                      columnIndex === 10))
                )
                  return '#2196f3'

                if (
                  (rowIndex === 0 && columnIndex === 11) ||
                  (rowIndex === 1 &&
                    (columnIndex === 11 ||
                      columnIndex === 12 ||
                      columnIndex === 13 ||
                      columnIndex === 14 ||
                      columnIndex === 15))
                )
                  return '#ff9800'

                if (
                  (rowIndex === 0 && columnIndex === 16) ||
                  (rowIndex === 1 &&
                    (columnIndex === 16 ||
                      columnIndex === 17 ||
                      columnIndex === 18 ||
                      columnIndex === 19 ||
                      columnIndex === 20))
                )
                  return '#4caf50'

                if (columnIndex === 0) return '#e8e8e8'

                return null
              },
              paddingLeft: function (i, node) {
                return 1
              },
              paddingRight: function (i, node) {
                return 1
              },
              // paddingBottom: function(i, node) { return 2; },
            },
          },
          {
            margin: [0, 20, 0, 0],
            image: grafico,
            width: 800,
            height: 400
          }
        ],
        styles: {
          header_table: {
            bold: true,
            fontSize: 5,
            alignment: 'center',
          },
          content_table: {
            fontSize: 5,
            alignment: 'center',
            margin: [0, 3, 0, 0],
          },
        },
      }

      let config = {
        content,
        archivo: `${
          localStorage.Usuario + moment().format('-YYMMDD-HHmmss')
        }.pdf`,
        tipo: 'pdf',
      }

      _impresion2(config)
        .then(() => {
          _this.validar_anio()
          console.log('Impresion terminada')
        })
        .catch((error) => {
          console.error('Error durante la impresión', error)
        })
    },
  },
})
