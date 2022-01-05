const { resolveFiles } = require("electron-updater/out/providers/Provider");

var formatoBaseImp_Hc = {
  contador: 0,
  codigo_barras: {},
  images: {},
  pageMargins: '',
  header: '',
  content: [
    {
      margin: [0, 5, 0, 0],
      stack: []
    },
  ],

  styles: estilosImpresion_impHc()
}

function inicializarFormatoBase_impHc() {
  formatoBaseImp_Hc = {
    contador: 0,
    codigo_barras: {},
    images: {},
    pageMargins: '',
    header: '',
    content: [
      {
        margin: [0, 5, 0, 0],
        stack: []
      },
    ],

    styles: estilosImpresion_impHc()
  }
}

function header71Opcional(nit, hcprc) {
  formatoBaseImp_Hc.images = { logo: rutaLogos_impHc(nit) };
  formatoBaseImp_Hc.pageMargins = [35, 100, 35, 60];
  formatoBaseImp_Hc.header = function (currentPage, pageCount, pageSize) {
    var width_page = pageSize.width - 70;

    return {
      margin: [35, 25, 35, 0],
      stack: [
        {
          columns: [
            {
              margin: [7, 0, 0, 0],
              stack: [
                {
                  image: 'logo',
                  width: 75,
                  height: 45
                }
              ],
              width: '20%'
            },
            {
              style: 'center10Bold',
              text: [
                { text: $_USUA_GLOBAL[0].NOMBRE + '\n' },
                { text: $_USUA_GLOBAL[0].NIT + '\n' },
                { text: 'HISTORIA CLINICA' }
              ],
              width: '60%'
            },
            {
              style: 'right10Bold',
              alignment: 'right',
              text: [
                { text: '' + 'PAG: ' + currentPage + ' de ' + pageCount + '\n\n' },
                { text: 'Imprime: ' + moment().format('YYYY-MM-DD - HH:mm'), fontSize: 6 },
              ],
              width: '20%'
            }
          ],
        },
        {
          marginLeft: 7,
          marginTop: 3,
          columns: [
            {
              stack: [
                {
                  columns: [
                    { text: 'FECHA INGRESO:', style: 'left8Bold', width: '15%' },
                    { text: _editFecha3(hcprc.fecha) + ' - ' + _editHora(hcprc.hora), style: 'left8', width: '43%' },
                    { text: 'FECHA EGRESO:', style: 'left8Bold', width: '15%' },
                    { text: _editFecha3(hcprc.egreso) + ' - ' + _editHora(hcprc.hora_egres), style: 'left8', width: '27%' },
                  ]
                },
                {
                  marginTop: 2,
                  columns: [
                    { text: 'PACIENTE:', style: 'left8Bold', width: '15%' },
                    { text: $_REG_PACI.DESCRIP.replace(/\�/g, "Ñ").replace(/\s+/g, ' '), style: 'left8', width: '43%' },
                    { text: 'IDENTIFICACIÓN:', style: 'left8Bold', width: '15%' },
                    { text: $_REG_PACI['TIPO-ID'] + ' ' + $_REG_PACI['COD'], style: 'left8', width: '27%' },
                  ]
                },
              ],
              width: '100%'
            },
          ],
        },
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: -22,
              w: width_page,
              h: 24,
              r: 0,
              lineWidth: 1,
            },
          ],
        },
      ]
    }
  }
}

function imprimir_HC002B(ord_w, serv_x) {
  var params = {
    id: '',
    descrip: 'Impresión Evoluciones anteriores',
    dll: `HICLIN\\HC002B`,
    callback: () => { console.log('TERMINA LLAMADO') }
  };
  var datos = `${ord_w}-${serv_x}`;
  this._imprimirPagina_impHc(params, datos);
}

async function _imprimirPagina_impHc(llegada, extra) {
  var reg_hc = {
    id_paci: $_REG_HC.id_paciente,
    suc_folio: $_REG_HC.suc_folio_hc,
    nro_folio: $_REG_HC.nro_folio_hc,
  };
  var parametros = {
    Id: llegada.id,
    Descripcion: llegada.descrip,
    Tipo: "RM",
    Params: [{ dll: llegada.dll, extra, reg_hc }],

  };
  await _validarVentanaMain(parametros, () => {
    llegada.callback();
  });
}

function encabezado_impHC(datos) {
  switch (datos.paciente.edad.substring(0, 1)) {
    case 'A': datos.AUX_EDAD = '  Años'; break;
    case 'M': datos.AUX_EDAD = '  Meses'; break;
    case 'D': datos.AUX_EDAD = '  Dias'; break;
    default: datos.AUX_EDAD = ''; break;
  }
  datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

  var encabezado = function (currentPage, pageCount, pageSize) {
    var width_page = pageSize.width - 70;

    return {
      margin: [35, 30, 35, 0],
      stack: [
        {
          columns: [
            {
              margin: [7, 0, 0, 0],
              stack: [
                {
                  image: 'logo',
                  width: 75,
                  height: 45
                }
              ],
              width: '20%'
            },
            {
              style: 'center10Bold',
              text: [
                { text: datos.encabezado.nombre + '\n' },
                { text: datos.encabezado.nit + '\n' },
                { text: datos.encabezado.titulo }
              ],
              width: '60%'
            },
            {
              style: 'right10Bold',
              text: [
                { text: !$_REG_HC.hidePage ? '' + 'PAG: ' + currentPage + ' de ' + pageCount + '\n\n' : '\n\n' },
                { text: localStorage.Usuario + moment().format('  YYYY-MM-DD HH:mm'), fontSize: 7 }
              ],
              width: '20%'
            }
          ],
        },
        {
          marginLeft: 7,
          marginTop: 10,
          stack: [
            {
              columns: [
                { text: 'FECHA:', style: 'left8Bold', width: '10%' },
                { text: datos.paciente.fecha ? datos.paciente.fecha + '  -  ' + datos.paciente.hora : datos.paciente.fechaIng, style: 'left8', width: '48%' },
                { text: 'IDENTIFICACIÓN:', style: 'left8Bold', width: '15%' },
                { text: datos.paciente.tipoId + ' ' + datos.paciente.id, style: 'left8', width: '27%' },
              ]
            },
            {
              marginTop: 2,
              columns: [
                { text: 'PACIENTE:', style: 'left8Bold', width: '10%' },
                { text: datos.paciente.nombre.replace(/\�/g, "Ñ"), style: 'left8', width: '48%' },
                { text: 'EDAD:', style: 'left8Bold', width: '6%' },
                { text: datos.paciente.edad + datos.AUX_EDAD, style: 'left8', width: '9%' },
                { text: 'SEXO:', style: 'left8Bold', width: '7%' },
                { text: datos.paciente.sexo, style: 'left8', width: '8%' },
              ]
            },
            {
              marginTop: 2,
              columns: [
                { text: 'CIUDAD:', style: 'left8Bold', width: '10%' },
                { text: datos.paciente.municipio || datos.paciente.ciudad || "", style: 'left8', width: '48%' },
                { text: 'TELEFONO:', style: 'left8Bold', width: '15%' },
                { text: datos.paciente.telefono, style: 'left8', width: '27%' },
              ]
            },
          ],
        },
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: -35,
              w: width_page,
              h: 37,
              r: 0,
              lineWidth: 1,
              lineColor: 'black',
            },
          ],
        },
      ]
    }
  }

  return encabezado;
}

function encabezadoSimple_impHC(datos) {
  var encabezado = function (currentPage, pageCount, pageSize) {
    var width_page = pageSize.width - 70;

    return {
      margin: [35, 30, 35, 0],
      stack: [
        {
          columns: [
            {
              margin: [7, 0, 0, 0],
              stack: [
                {
                  image: 'logo',
                  width: 75,
                  height: 45
                }
              ],
              width: '20%'
            },
            {
              style: 'center10Bold',
              text: [
                { text: datos.encabezado.nombre + '\n' },
                { text: datos.encabezado.nit + '\n' },
                { text: datos.encabezado.titulo }
              ],
              width: '60%'
            },
            {
              marginRight: 5,
              style: 'right10Bold',
              text: [
                { text: 'PAG: ' + currentPage + ' de ' + pageCount + '\n\n' },
                { text: localStorage.Usuario + moment().format('  YYYY-MM-DD HH:mm'), fontSize: 7 }
              ],
              width: '20%'
            }
          ],
        },
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: -49,
              w: width_page,
              h: 51,
              r: 0,
              lineWidth: 1,
              lineColor: 'black',
            },
          ],
        },
      ]
    }
  }

  return encabezado;
}

function encabezar_impreHC(datos) {
  switch (datos.paciente.edad.substring(0, 1)) {
    case 'A': datos.AUX_EDAD = '  Años'; break;
    case 'M': datos.AUX_EDAD = '  Meses'; break;
    case 'D': datos.AUX_EDAD = '  Dias'; break;
    default: datos.AUX_EDAD = ''; break;
  }
  datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

  var encabezado = function (currentPage, pageCount, pageSize) {
    var width_page = pageSize.width - 70;

    return {
      margin: [35, 30, 35, 0],
      stack: [
        {
          columns: [
            {
              margin: [7, 0, 0, 0],
              stack: [
                {
                  image: 'logo',
                  width: 75,
                  height: 45
                }
              ],
              width: '20%'
            },
            {
              style: 'center10Bold',
              text: [
                { text: datos.encabezado.nombre + '\n' },
                { text: datos.encabezado.nit + '\n' },
                { text: datos.encabezado.titulo }
              ],
              width: '60%'
            },
            {
              style: 'right10Bold',
              text: [
                { text: '' + 'PAG: ' + currentPage + ' de ' + pageCount + '\n\n' },
                { text: localStorage.Usuario + moment().format('  YYYY-MM-DD HH:mm'), fontSize: 7 }
              ],
              width: '20%'
            }
          ],
        },
      ]
    }
  }

  return encabezado;
}

function marginEncabezado_impHc() {
  margin = [35, 143, 35, 60]
  return margin;
}

function estilosImpresion_impHc() {
  styles = {
    center6: {
      fontSize: 6,
      alignment: 'center',
    },
    left6: {
      fontSize: 6,
    },
    left6Bold: {
      fontSize: 6,
      bold: true
    },
    center7Bold: {
      fontSize: 7,
      alignment: 'center',
      bold: true
    },
    left7BoldT: {
      fontSize: 7,
      bold: true,
      fillColor: '#D1DFF4',
      color: 'black',
    },
    center7BoldT: {
      fontSize: 7,
      bold: true,
      fillColor: '#D1DFF4',
      color: 'black',
      alignment: 'center',
    },
    center7: {
      fontSize: 7,
      alignment: 'center',
    },
    left7: {
      fontSize: 7,
      alignment: 'left'
    },
    left7Bold: {
      fontSize: 7,
      bold: true,
      alignment: 'left'
    },
    center10Bold: {
      fontSize: 10,
      alignment: 'center',
      bold: true
    },
    right10Bold: {
      fontSize: 10,
      alignment: 'right',
      bold: true
    },
    center8Bold: {
      fontSize: 8,
      alignment: 'center',
      bold: true
    },
    center8: {
      fontSize: 8,
      alignment: 'center',
    },
    left8: {
      fontSize: 8,
      alignment: 'left',
    },
    left12: {
      fontSize: 12,
    },
    center12Bold: {
      fontSize: 12,
      alignment: 'center',
      bold: true
    },
    left12Bold: {
      fontSize: 12,
      bold: true
    },
    right12Bold: {
      fontSize: 12,
      bold: true,
      alignment: 'right',
    },
    left8Bold: {
      fontSize: 8,
      bold: true,
      alignment: 'left'
    },
    center8BoldT: {
      fontSize: 8,
      bold: true,
      fillColor: '#D1DFF4',
      color: 'black',
      alignment: 'center'
    },
    center10BoldT: {
      fontSize: 10,
      bold: true,
      fillColor: '#D1DFF4',
      color: 'black',
      alignment: 'center'
    },
    left8BoldT: {
      fontSize: 8,
      bold: true,
      fillColor: '#D1DFF4',
      color: 'black',
      alignment: 'left'
    },
    left10Bold: {
      fontSize: 10,
      bold: true
    },
    left10BoldT: {
      fontSize: 10,
      bold: true,
      fillColor: '#D1DFF4',
      color: 'black',
      alignment: 'left'
    },
    left9Bold: {
      fontSize: 9,
      bold: true
    },
    right8: {
      fontSize: 8,
      alignment: 'right',
    },
    right8Bold: {
      fontSize: 8,
      alignment: 'right',
      bold: true
    },
    left8Underline: {
      decoration: 'underline',
      fontSize: 8
    },
    left5: {
      fontSize: 5
    },
    center75: {
      fontSize: 7.5,
      alignment: 'center',
    },
    left75: {
      fontSize: 7,
      alignment: 'left',
    },
    center9: {
      fontSize: 9,
      alignment: 'center',
    },
  }

  return styles;
}

function firmaImpresion_impHc(datos, nomFirma, titulo) {
  firma = {
    marginTop: 10,
    unbreakable: true,
    table: {
      heights: [12, 15, 15, 20],
      widths: ['70%', '30%'],
      headerRows: 0,
      body: [
        [{ text: !titulo ? 'QUIEN REALIZA LA VALORACIÓN' : titulo, style: 'center8BoldT', colSpan: 2 }, {}],
        [
          {
            stack: [
              {
                marginTop: 5,
                columns: [{ text: 'NOMBRES Y APELLIDOS: ', style: 'left8', bold: true, width: '28%' }, { text: datos.medico.nombre.replace(/\s+/g, ' ').replace(/\�/g, "Ñ"), style: 'left8', width: '72%' }],
              },
              {
                marginTop: 5,
                columns: [{ text: 'ESPECIALIDAD: ', style: 'left8', bold: true, width: '28%' }, { text: datos.medico.espec, style: 'left8', width: '72%' }],
              },
              {
                marginTop: 5,
                columns: [{ text: 'REGISTRO No: ', style: 'left8', bold: true, width: '28%' }, { text: datos.medico.reg, style: 'left8', width: '72%' }],
              }
            ]
          },
          {
            image: !nomFirma ? 'firma' : nomFirma, width: 150, height: 60
          }
        ]
      ]
    },
  }

  return firma;
}

function encabezado_SUB52(datos) {
  switch (datos.paciente.edad.substring(0, 1)) {
    case 'A': datos.AUX_EDAD = '  Años'; break;
    case 'M': datos.AUX_EDAD = '  Meses'; break;
    case 'D': datos.AUX_EDAD = '  Dias'; break;
    default: datos.AUX_EDAD = ''; break;
  }
  let edad = parseInt(datos.paciente.edad.substring(1,4));

  var encabezado2 = function (currentPage, pageCount, pageSize) {
    var width_page = pageSize.width - 70;

    return {
      margin: [35, 30, 35, 0],
      stack: [
        {
          columns: [
            {
              margin: [7, 0, 0, 0],
              stack: [
                {
                  image: 'logo',
                  width: 75,
                  height: 45
                }
              ],
              width: '20%'
            },
            {
              style: 'center12Bold',
              text: [
                { text: $_USUA_GLOBAL[0].NOMBRE + '\n' },
                { text: $_USUA_GLOBAL[0].NIT + '\n' },
                { text: datos.titulo }
              ],
              width: '60%'
            },
            {
              style: 'right12Bold',
              text: [
                { text: !$_REG_HC.hidePage ? '' + 'PAG: ' + currentPage + ' de ' + pageCount + '\n\n' : '\n\n' },
                { text: localStorage.Usuario + moment().format('  YYYY-MM-DD HH:mm'), fontSize: 7 }
              ],
              width: '20%'
            }
          ],
        },
        {
          marginLeft: 7,
          marginTop: 10,
          stack: [
            {
              columns: [
                { text: 'FECHA:', style: 'left8Bold', width: '10%' },
                { text: datos.paciente.fecha + '  -  ' + datos.paciente.hora, style: 'left8', width: '48%' },
                { text: 'IDENTIFICACIÓN:', style: 'left8Bold', width: '15%' },
                { text: datos.paciente.tipoId + ' ' + datos.paciente.id, style: 'left8', width: '27%' },
              ]
            },
            {
              marginTop: 2,
              columns: [
                { text: 'PACIENTE:', style: 'left8Bold', width: '10%' },
                { text: datos.paciente.nombre, style: 'left8', width: '48%' },
                { text: 'EDAD:', style: 'left8Bold', width: '6%' },
                { text: edad + datos.AUX_EDAD, style: 'left8', width: '9%' },
                { text: 'SEXO:', style: 'left8Bold', width: '7%' },
                { text: datos.paciente.sexo, style: 'left8', width: '8%' },
              ]
            },
            {
              marginTop: 2,
              columns: [
                { text: 'CIUDAD:', style: 'left8Bold', width: '10%' },
                { text: datos.paciente.municipio, style: 'left8', width: '48%' },
                { text: 'TELEFONO:', style: 'left8Bold', width: '15%' },
                { text: datos.paciente.telefono, style: 'left8', width: '27%' },
              ]
            },
            {
              marginTop: 2,
              columns: [
                { text: 'FOLIO:', style: 'left8Bold', width: '10%' },
                { text: datos.paciente.folio, style: 'left8', width: '13%' },
                { text: 'FACT:', style: 'left8Bold', width: '7%' },
                { text: datos.paciente.fact, style: 'left8', width: '28%' },
                { text: 'U.SERVICIO:', style: 'left8Bold', width: '10%' },
                { text: datos.paciente.unserv, style: 'left8', width: '28%' },
              ]
            },
          ],
        },
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: -45,
              w: width_page,
              h: 47,
              r: 0,
              lineWidth: 1,
              lineColor: 'black',
            }
          ]
        }
      ]
    }
  }

  return encabezado2;
}

function marginEncabezado_SUB52() {
  margin = [35, 135, 35, 60];
  return margin;
}

function llenarRiesgosCovid_impHc(datos) {
  var col = [
    {
      marginTop: 10,
      stack: [
        { text: 'EVALUACIÓN DEL RIESGO COVID-19', style: 'left10Bold', alignment: 'left' },
        { text: 'Transito o viajo en los ultimos 14 dias por un pais o region con circulacion viral confirmada de COVID 19? ' + datos.covid.riesgos.transito, style: 'left8', marginTop: 3 },
        { text: 'En los ultimos 14 dias ha estado en contacto con alguna persona que haya sido diagnosticada con Coronavirus? ' + datos.covid.riesgos.contDiag, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Es personal de la salud u otro ambito hospitalario con contacto estrecho de caso confirmado o probable para Covid-19? ' + datos.covid.riesgos.contEstr, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Fiebre: ' + datos.covid.riesgos.fiebre, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Tos: ' + datos.covid.riesgos.tos, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Disnea: ' + datos.covid.riesgos.disnea, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Malestar general: ' + datos.covid.riesgos.general, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Rinorrea: ' + datos.covid.riesgos.rinorrea, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Odinofagia: ' + datos.covid.riesgos.odinofagia, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Ha viajado dentro del pais? ' + datos.covid.riesgos.pre1, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'A donde viajo? ' + datos.covid.riesgos.pre2, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Qué tiempo en dias duró ese viaje? ' + datos.covid.riesgos.pre3, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Ha viajado fuera del pais? ' + datos.covid.riesgos.pre4, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'A donde viajó? ' + datos.covid.riesgos.pre5, style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Qué tiempo en dias duró ese viaje? ' + datos.covid.riesgos.pre6, style: 'left8', marginTop: 2, alignment: 'justify' },
      ]
    }
  ]

  return col
}

function llenarRecomendacionesCovid_impHc() {
  var col = [
    {
      unbreakable: true,
      marginTop: 10,
      stack: [
        { text: 'RECOMENDACIONES PARA COVID-19 (CORONAVIRUS)', style: 'left10Bold' },
        { text: 'Lávese las manos frecuentemente', style: 'left8Bold', marginTop: 3 },
        { text: 'Lávese las manos con frecuencia con agua y jabón y si dispone de un desinfectante de manos a base de alcohol. \n Por qué? Lavarse las manos con agua y jabón mata el virus si este esta en sus manos.', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Adopte medidas de higiene respiratoria', style: 'left8Bold', marginTop: 3 },
        { text: 'Al toser o estornudar, cúbrase la boca y la nariz con el codo flexionado o con un pañuelo; tire el pañuelo inmediatamente y lávese las manos con agua y jabón. \n Por qué? Al cubrir la boca y la nariz durante la tos o el estornudo se evita la propagación de germenes y virus. Si usted estornuda o tose cubrindose con las manos puede contaminar los objetos o las personas a los que toque.', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Mantenga el distanciamiento social', style: 'left8Bold', marginTop: 3 },
        { text: 'Mantenga al menos 1 metro (3 pies) de distancia entre usted y las demás personas, particularmente aquellas que tosan, estornuden y tengan fiebre. \n Por qué? Cuando alguien con una enfermedad respiratoria, como la infección por el COVID19, tose o estornuda, proyecta pequeñas gotículas que contienen el virus. Si esta demasiado cerca, puede inhalar el virus.', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Evite tocarse los ojos, la nariz y la boca', style: 'left8Bold', marginTop: 3 },
        { text: 'Por qué? Las manos tocan muchas superficies que pueden estar contaminadas con el virus. Si se toca los ojos, la nariz o la boca con las manos contaminadas, puedes transferir el virus de la superficie a si mismo', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Si tiene fiebre, tos y dificultad para respirar, solicite atención médica a tiempo', style: 'left8Bold', marginTop: 3 },
        { text: 'Indique a su prestador de atención de salud si ha viajado a una zona con presencia del virus COVID19, o si ha tenido un contacto cercano con alguien que haya viajado desde China, Europa entre otros y demás países donde este presente el virus y tenga síntomas respiratorios. \n Por qué? Siempre que tenga fiebre, tos y dificultad para respirar, es importante que busque atención médica de inmediato, ya que dichos sintomas pueden deberse a una infección respiratoria o a otra afección grave. Los síntomas respiratorios con fiebre pueden tener diversas causas, y dependiendo de sus antecedentes de viajes y circunstancias personales, el COVID19 podría ser una de ellas.', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Mantengase informado y siga las recomendaciones de los Profesionales de Salud', style: 'left8Bold', marginTop: 3 },
        { text: 'Mantengase informado sobre las últimas novedades en relación con la COVID-19. Siga los consejos de su IPS de atención de salud, de las autoridades sanitarias pertinentes a nivel Nacional y Local o de su empleador sobre la forma de protegerse a sí mismo y a los demás ante la COVID-19. \n Por qué? Las autoridades Nacionales y Locales dispondrán de la información más actualizada acerca de si la COVID-19 se esta propagando en su zona. Son los interlocutores más indicados para dar consejos sobre las medidas que la población de su zona debe adoptar para protegerse.', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Medidas de protección para las personas que se encuentran en zonas donde se est propagando la COVID-19 o que las han visitado recientemente (en los últimos 14 días)', style: 'left8Bold', marginTop: 3 },
        { text: '* Siga las orientaciones expuestas arriba. \n * Permanezca en casa si empieza a encontrarse mal, aunque se trate de síntomas leves como cefalea y rinorrea leve, hasta que se recupere. \n Por qué? Evitar los contactos con otras personas y las visitas a centros mdicos permitir que estos ultimos funcionen con mayor eficacia y ayudar a protegerle a usted y a otras personas de posibles infecciones por el virus de la COVID-19 u otros. \n * Si tiene fiebre, tos y dificultad para respirar, busque r pidamente asesoramiento mdico, ya que podría deberse a una infección respiratoria u otra afección grave. Llame con antelación e informe a su dispensador de atención de salud sobre cualquier viaje que haya realizado recientemente o cualquier contacto que haya mantenido con viajeros. Por qu? Llamar con antelación permitir que su dispensador de atención de salud le dirija r pidamente hacia el centro de salud adecuado. Esto ayudar tambin a prevenir la propagación del virus de la COVID-19 y otros virus', style: 'left8', marginTop: 2, alignment: 'justify' },
      ]
    }
  ]

  return col
}

function llenarDengueCuadro_impHc() {
  var fila = [
    [{ text: 'QUÉ HACER', color: 'green', alignment: 'center' }, { text: 'QUÉ NO HACER', color: 'red', alignment: 'center' }],
    [{ text: '1. Reposo \n 2. Liquidos orales abundantes (entre 2 y 5 Onzas mas de usual según edad), que incluyan jugos de frutas que no sean rojas o ácidos, suero oral, lactancia materna y la dieta usual si el paciente la tolera. \n  3. Acetaminofén según orden médica. \n 4. Medios fisicos: Baños de agua tibia. \n 5. Usar toldillo. \n 6. Asistir a los controles especialmente el dia que desaparece la fiebre. \n 7. Consultar de inmediato si aparecen signos de alarma', style: 'left8' }, { text: '1. No suministrar agua sola. \n 2. No inyecciones para la fiebre. \n 3. No tomar medicamentos para la fiebre sin formula médica. \n 4. Nunca aspirina. \n 5. No baños con alcohol u otras sustancias toxicas. \n 6. No dejar un niño al cuidado de otro niño.', style: 'left8' }],
    [{ text: 'SIGNOS DE ALARMA', color: '#E17911', alignment: 'center', colSpan: 2 }, {}],
    [{ text: '1. Dolor abdominal espontáneo o a la palpación. \n 2. Vómitos frecuentes. \n 3. Manos o pies pálidos, frios o húmedos. \n 4. Dificultad para respirar. \n 5. Mareos. \n 6. Cambios en el estado de ánimo (somnolencia/irritabilidad). \n 7. Sangrados: petequias, epistaxis, gingivorragia, hematemesis, melena, metrorragia. \n 8. Verificar diuresis por lo menos 1 vez cada 6 horas. \n 9. Riesgo social: vive solo o vive lejos de donde puede recibir atención médica, dificultades en el transporte, pobreza extrema. \n 10. Tener 1 año o menos.', style: 'left8', colSpan: 2 }, {}]
  ]

  var tabla = [{
    marginTop: 15,
    table: {
      widths: ['50%', '50%'],
      body: fila
    }
  }]

  return tabla
}

function llenarRecomendacionesDengue_impHc() {
  var fila = [
    {
      marginTop: 10,
      columns: [
        { text: 'RECOMENDACIONES PARA PACIENTES CON DX: DENGUE SIN SIGNOS DE ALARMA', style: 'center10Bold' },
      ]
    },
    {
      style: 'left8',
      marginTop: 10,
      ol: [
        { text: 'Reposo en cama con toldillo.', marginBottom: 3 },
        [
          { text: 'Abundantes liquidos.', marginBottom: 3 },
          {
            ul: [
              {
                columns: [{ text: 'Adultos: ', width: '8%', marginBottom: 2 }, { text: 'Líquidos orales abundantes (6 tazas o m s al día, para un adulto promedio).' }]
              },
              {
                columns: [{ text: 'Niños: ', width: '8%', marginBottom: 2 }, { text: 'Líquidos orales abundantes (leche, jugos de frutas naturales (precaución en diabticos), suero oral (SRO) o agua de cebada, de arroz o agua de coco.' }]
              },
              { text: 'Calculo según Plan B del AIPI. El agua sola puede causar desequilibrio hidroelectrolítico.', marginBottom: 2 },
              { text: ' Escribir la cantidad prescrita: __________________ en tazas, onzas, litros. ', marginBottom: 3 },
            ]
          }
        ],
        [
          { text: 'Acetaminofen.', marginBottom: 3 },
          {
            ul: [
              {
                columns: [{ text: 'Adultos: ', width: '8%', marginBottom: 2 }, { text: '500mg por vía oral cada 6 horas, dosis m xima diaria 4 gramos.' }]
              },
              {
                columns: [{ text: 'Niños: ', width: '8%', marginBottom: 3 }, { text: '10 mg/kg/dosis c/6 horas, escribir la cantidad en cucharaditas de 5ml o # tabletas: ____________ ' }]
              },
            ]
          }
        ],
        { text: 'Baños con esponja y agua tibia (temperatura del agua 2§C menor que la Temperatura del paciente).', marginBottom: 3 },
        { text: 'Buscar y eliminar  los criaderos  de  zancudos  en  la  casa  y  sus  alrededores  siempre  debe ser vigilado por un adulto entrenado en cuidados de dengue.', marginBottom: 5 },
      ],
    },
    { text: 'EVITAR: ', style: 'left8', marginBottom: 5 },
    {
      style: 'left8',
      marginLeft: 10,
      ul: [
        { text: 'Los  medicamentos  para  evitar el  dolor y la  inflamación. Ej.: "AINES", acido  acetil  salicílico (aspirina),  dipirona,  diclofenaco,  naproxeno,  etc. (Intravenosa,  intramuscular,  por  vía  oral ni supositorios) o esteroides.', marginBottom: 3 },
        { text: 'Los antibióticos (si cree que son necesarios, consultar al medico).', marginBottom: 3 },
        { text: 'Si  aparece  uno  de  los  siguientes  síntomas o signos  consulte  de  inmediato  al servicio de urgencias:', marginBottom: 3 },

        {
          marginLeft: 10,
          ol: [
            'Sangrados: Puntos rojos en la piel (petequias).',
            'Sangrado de nariz y/o encías.',
            'Vómitos con sangre.',
            'Heces coloreadas de negro.',
            'Menstruación abundante / sangrado vaginal, vómitos.',
            'Dolor abdominal espontaneo o a la palpación del abdomen.',
            'Somnolencia, confusión mental, desmayos, convulsiones.',
            'Manos o pies p lidos, fríos o húmedos.',
            'Dificultad para respirar.',
          ]
        }
      ],
    },
    {
      style: 'left8',
      marginTop: 5,
      columns: [{ text: 'Seguimiento', width: '12%', bold: true }, { text: 'Pacientes del grupo A, realizar una  valoración el día de la defervescencia (primer día sin fiebre) y posteriormente evaluación diaria hasta que pase el periodo crítico (48 horas despus de la fiebre), evaluarlo con recuento de plaquetas, hematocrito y aparición de signos de alarma.' }]
    },
  ]

  console.log('FIN RECOM DENGUE');

  return fila
}

function llenarRecomendacionesCovid_impHc() {
  var col = [
    {
      unbreakable: true,
      marginTop: 10,
      stack: [
        { text: 'RECOMENDACIONES PARA COVID-19 (CORONAVIRUS)', style: 'center10Bold' },
        { text: 'Lávese las manos frecuentemente', style: 'left8Bold', marginTop: 3 },
        { text: 'Lávese las manos con frecuencia con agua y jabón y si dispone de un desinfectante de manos a base de alcohol. \n Por qué? Lavarse las manos con agua y jabón mata el virus si este esta en sus manos.', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Adopte medidas de higiene respiratoria', style: 'left8Bold', marginTop: 3 },
        { text: 'Al toser o estornudar, cúbrase la boca y la nariz con el codo flexionado o con un pañuelo; tire el pañuelo inmediatamente y lávese las manos con agua y jabón. \n Por qué? Al cubrir la boca y la nariz durante la tos o el estornudo se evita la propagación de germenes y virus. Si usted estornuda o tose cubrindose con las manos puede contaminar los objetos o las personas a los que toque.', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Mantenga el distanciamiento social', style: 'left8Bold', marginTop: 3 },
        { text: 'Mantenga al menos 1 metro (3 pies) de distancia entre usted y las demás personas, particularmente aquellas que tosan, estornuden y tengan fiebre. \n Por qué? Cuando alguien con una enfermedad respiratoria, como la infección por el COVID19, tose o estornuda, proyecta pequeñas gotículas que contienen el virus. Si esta demasiado cerca, puede inhalar el virus.', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Evite tocarse los ojos, la nariz y la boca', style: 'left8Bold', marginTop: 3 },
        { text: 'Por qué? Las manos tocan muchas superficies que pueden estar contaminadas con el virus. Si se toca los ojos, la nariz o la boca con las manos contaminadas, puedes transferir el virus de la superficie a si mismo', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Si tiene fiebre, tos y dificultad para respirar, solicite atención médica a tiempo', style: 'left8Bold', marginTop: 3 },
        { text: 'Indique a su prestador de atención de salud si ha viajado a una zona con presencia del virus COVID19, o si ha tenido un contacto cercano con alguien que haya viajado desde China, Europa entre otros y demás países donde este presente el virus y tenga síntomas respiratorios. \n Por qué? Siempre que tenga fiebre, tos y dificultad para respirar, es importante que busque atención médica de inmediato, ya que dichos sintomas pueden deberse a una infección respiratoria o a otra afección grave. Los síntomas respiratorios con fiebre pueden tener diversas causas, y dependiendo de sus antecedentes de viajes y circunstancias personales, el COVID19 podría ser una de ellas.', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Mantengase informado y siga las recomendaciones de los Profesionales de Salud', style: 'left8Bold', marginTop: 3 },
        { text: 'Mantengase informado sobre las últimas novedades en relación con la COVID-19. Siga los consejos de su IPS de atención de salud, de las autoridades sanitarias pertinentes a nivel Nacional y Local o de su empleador sobre la forma de protegerse a sí mismo y a los demás ante la COVID-19. \n Por qué? Las autoridades Nacionales y Locales dispondrán de la información más actualizada acerca de si la COVID-19 se esta propagando en su zona. Son los interlocutores más indicados para dar consejos sobre las medidas que la población de su zona debe adoptar para protegerse.', style: 'left8', marginTop: 2, alignment: 'justify' },
        { text: 'Medidas de protección para las personas que se encuentran en zonas donde se est propagando la COVID-19 o que las han visitado recientemente (en los últimos 14 días)', style: 'left8Bold', marginTop: 3 },
        { text: '* Siga las orientaciones expuestas arriba. \n * Permanezca en casa si empieza a encontrarse mal, aunque se trate de síntomas leves como cefalea y rinorrea leve, hasta que se recupere. \n Por qué? Evitar los contactos con otras personas y las visitas a centros mdicos permitir que estos ultimos funcionen con mayor eficacia y ayudar a protegerle a usted y a otras personas de posibles infecciones por el virus de la COVID-19 u otros. \n * Si tiene fiebre, tos y dificultad para respirar, busque r pidamente asesoramiento mdico, ya que podría deberse a una infección respiratoria u otra afección grave. Llame con antelación e informe a su dispensador de atención de salud sobre cualquier viaje que haya realizado recientemente o cualquier contacto que haya mantenido con viajeros. Por qu? Llamar con antelación permitir que su dispensador de atención de salud le dirija r pidamente hacia el centro de salud adecuado. Esto ayudar tambin a prevenir la propagación del virus de la COVID-19 y otros virus', style: 'left8', marginTop: 2, alignment: 'justify' },
      ]
    }
  ]

  return col
}

function llenarDatosEgreso_impHc(datos) {
  var col = [
    {
      marginTop: 20,
      text: [
        { text: 'ESTADO SALIDA:  ', style: 'left8Bold' },
        { text: datos.estado, style: 'left8' }
      ]
    },
    {
      stack: datos.remitido.trim() != '' ? [
        {
          marginTop: 5,
          columns: [
            { text: datos.remitido, style: 'left8' }
          ]
        }] : []
    },
    {
      marginTop: 5,
      text: [
        { text: 'OBSERVACIONES:  ', style: 'left8Bold' },
        { text: datos.observ, style: 'left8' }
      ]
    },
    {
      stack: llenarDiagEgreso_impHc(datos)
    },
    {
      text: datos.diagMuerte, style: 'left8', alignment: 'justify', marginLeft: 20
    },
    firmaImpresion_impHc(datos, false, 'PROFESIONAL - CIERRE DE HISTORIA CLINICA'),
    {
      marginTop: 10,
      text: 'CIERRE HISTORIA CLINICA:  ' + datos.medico.nombre.replace(/\s+/g, ' ').replace(/\�/g, "Ñ") + '  ' + datos.fechaEgreso, style: 'left8Bold'
    },
  ]

  console.log('termina llenado firma')

  return col
}

function llenarDiagEgreso_impHc(datos) {
  var diag = [{ text: 'DIAGNOSTICO DE EGRESO: \n', style: 'left8Bold', marginTop: 5 }]

  for (i in datos.diagnosticos) {
    diag.push({ text: datos.diagnosticos[i] + '\n', style: 'bodyTabla', marginLeft: 20 })
  }
  return diag
}

function rutaLogos_impHc(data) {
  if (localStorage.Unidad == 'S') return `D:\\SC\\newcobol\\LOGOS\\${data}.png`;
  else return `P:\\PROG\\LOGOS\\${data}.png`;
}

function rutaFirmas_impHc(data) {
  if (localStorage.Unidad == 'S') return `D:\\SC\\newcobol\\HC\\DATOS\\${data}.png`
  else return `P:\\PROG\\FIRMAS\\${data}.png`;
}

function writeRotatedText(lineas, text, text2, text3) {
  var ctx, canvas = document.createElement('canvas');
  switch (lineas) {
    case 1: canvas.width = 36; break;
    case 2: canvas.width = 100; break;
    case 3: canvas.width = 100; break;
  }
  canvas.height = 270;
  ctx = canvas.getContext('2d');
  ctx.font = 'bold 18pt Arial';
  ctx.save();
  ctx.translate(36, 270);
  ctx.rotate(-0.5 * Math.PI);
  ctx.fillStyle = '#000';

  switch (lineas) {
    case 1:
      ctx.fillText(text, 0, -5);
      break;
    case 2:
      ctx.fillText(text, 0, -20);
      ctx.fillText(text2, 0, 7);
      break;
    case 3:
      ctx.fillText(text, 0, -20);
      ctx.fillText(text2, 0, 7);
      ctx.fillText(text3, 0, 29);
      break;
  }

  ctx.restore();
  return canvas.toDataURL();
};

function antecedentes2002_01_impHc(dato_2002) {
  return {
    style: "left8",
    stack: [
      { text: "ANTECEDENTES FAMILIARES", bold: true, marginTop: 5 },
      { columns: [{ text: 'CÁNCER:', width: '15%', bold: true }, { text: dato_2002.patol_cancer == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_cancer == "S" ? 'Parentesco:' : '', width: '9%', bold: true }, { text: dato_2002.patol_cancer == "S" ? dato_2002.parent_cancer : "", width: '20%' }, { text: 'H/TENSION ARTE:', width: '14%', bold: true }, { text: dato_2002.patol_tension == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_tension == "S" ? 'Parentesco:' : "", width: '9%', bold: true }, { text: dato_2002.patol_tension == "S" ? dato_2002.parent_tension : "", width: '20%' }], marginTop: 4 },
      { columns: [{ text: 'TUBERCULOSIS:', width: '15%', bold: true }, { text: dato_2002.patol_tuberculosis == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_tuberculosis == "S" ? 'Parentesco:' : '', width: '9%', bold: true }, { text: dato_2002.patol_tuberculosis == "S" ? dato_2002.parent_tuberculosis : "", width: '20%' }, { text: 'CARDIOPATIAS:', width: '14%', bold: true }, { text: dato_2002.patol_cardiopatias == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_cardiopatias == "S" ? 'Parentesco:' : "", width: '9%', bold: true }, { text: dato_2002.patol_cardiopatias == "S" ? dato_2002.parent_cardiopatias : "", width: '20%' }], marginTop: 2 },
      { columns: [{ text: 'DIABETES:', width: '15%', bold: true }, { text: dato_2002.patol_diabetes == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_diabetes == "S" ? 'Parentesco:' : '', width: '9%', bold: true }, { text: dato_2002.patol_diabetes == "S" ? dato_2002.parent_diabetes : "", width: '20%' }, { text: 'PREECLAMPSIA:', width: '14%', bold: true }, { text: dato_2002.patol_preeclampsia == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_preeclampsia == "S" ? 'Parentesco:' : "", width: '9%', bold: true }, { text: dato_2002.patol_preeclampsia == "S" ? dato_2002.parent_preeclampsia : "", width: '20%' }], marginTop: 2 },
      { columns: [{ text: 'ECLAMPSIA:', width: '15%', bold: true }, { text: dato_2002.patol_eclampsia == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_eclampsia == "S" ? 'Parentesco:' : '', width: '9%', bold: true }, { text: dato_2002.patol_eclampsia == "S" ? dato_2002.parent_eclampsia : "", width: '20%' }, { text: 'GEMELARES:', width: '14%', bold: true }, { text: dato_2002.patol_gemelares == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_gemelares == "S" ? 'Parentesco:' : "", width: '9%', bold: true }, { text: dato_2002.patol_gemelares == "S" ? dato_2002.parent_gemelares : "", width: '20%' }], marginTop: 2 },
      { columns: [{ text: 'MALFORMACIONES:', width: '15%', bold: true }, { text: dato_2002.patol_malformaciones == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_malformaciones == "S" ? 'Parentesco:' : '', width: '9%', bold: true }, { text: dato_2002.patol_malformaciones == "S" ? dato_2002.parent_malformaciones : "", width: '20%' }], marginTop: 2 },
      { columns: [{ text: 'OTROS:', width: '15%', bold: true }, { text: dato_2002.otros ? dato_2002.otros.enterPut() : "", width: '85%' }], marginTop: 2 },
    ]
  }
}

function antecedentes2002_02_impHc(dato_2002) {
  return {
    style: "left8",
    stack: [
      { text: "ANTECEDENTES FAMILIARES", bold: true, marginTop: 5 },
      { columns: [{ text: 'ASMA:', width: '15%', bold: true }, { text: dato_2002.patol_asma == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_asma == "S" ? 'Parentesco:' : '', width: '9%', bold: true }, { text: dato_2002.patol_asma == "S" ? dato_2002.parent_asma : "", width: '20%' }, { text: 'ALERGIAS:', width: '15%', bold: true }, { text: dato_2002.patol_alergias == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_alergias == "S" ? 'Parentesco:' : "", width: '9%', bold: true }, { text: dato_2002.patol_alergias == "S" ? dato_2002.parent_alergias : "", width: '20%' }], marginTop: 4 },
      { columns: [{ text: 'H/TENSION ARTE:', width: '15%', bold: true }, { text: dato_2002.patol_tension == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_tension == "S" ? 'Parentesco:' : '', width: '9%', bold: true }, { text: dato_2002.patol_tension == "S" ? dato_2002.parent_tension : "", width: '20%' }, { text: 'CARDIOPULMONAR:', width: '15%', bold: true }, { text: dato_2002.patol_cardiopulmonar == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_cardiopulmonar == "S" ? 'Parentesco:' : "", width: '9%', bold: true }, { text: dato_2002.patol_cardiopulmonar == "S" ? dato_2002.parent_cardiopulmonar : "", width: '20%' }], marginTop: 2 },
      { columns: [{ text: 'DIABETES:', width: '15%', bold: true }, { text: dato_2002.patol_diabetes == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_diabetes == "S" ? 'Parentesco:' : '', width: '9%', bold: true }, { text: dato_2002.patol_diabetes == "S" ? dato_2002.parent_diabetes : "", width: '20%' }, { text: 'CANCER:', width: '15%', bold: true }, { text: dato_2002.patol_cancer == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_cancer == "S" ? 'Parentesco:' : "", width: '9%', bold: true }, { text: dato_2002.patol_cancer == "S" ? dato_2002.parent_cancer : "", width: '20%' }], marginTop: 2 },
      { columns: [{ text: 'TUBERCULOSIS:', width: '15%', bold: true }, { text: dato_2002.patol_tuberculosis == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_tuberculosis == "S" ? 'Parentesco:' : '', width: '9%', bold: true }, { text: dato_2002.patol_tuberculosis == "S" ? dato_2002.parent_tuberculosis : "", width: '20%' }, { text: 'SIFILIS:', width: '15%', bold: true }, { text: dato_2002.patol_sifilis == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_sifilis == "S" ? 'Parentesco:' : "", width: '9%', bold: true }, { text: dato_2002.patol_sifilis == "S" ? dato_2002.parent_sifilis : "", width: '20%' }], marginTop: 2 },
      { columns: [{ text: 'EPILEPSIA:', width: '15%', bold: true }, { text: dato_2002.patol_epilepsia == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_epilepsia == "S" ? 'Parentesco:' : '', width: '9%', bold: true }, { text: dato_2002.patol_epilepsia == "S" ? dato_2002.parent_epilepsia : "", width: '20%' }, { text: 'DISTROFIA:', width: '15%', bold: true }, { text: dato_2002.patol_distrofia == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_distrofia == "S" ? 'Parentesco:' : "", width: '9%', bold: true }, { text: dato_2002.patol_distrofia == "S" ? dato_2002.parent_distrofia : "", width: '20%' }], marginTop: 2 },
      { columns: [{ text: 'ENFERM. MENTAL:', width: '15%', bold: true }, { text: dato_2002.patol_enfer_mental == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_enfer_mental == "S" ? 'Parentesco:' : '', width: '9%', bold: true }, { text: dato_2002.patol_enfer_mental == "S" ? dato_2002.parent_enfer_mental : "", width: '20%' }, { text: 'ANOM.CONGENITA:', width: '15%', bold: true }, { text: dato_2002.patol_anom_congenita == "S" ? "SI" : "NO", width: '5%' }, { text: dato_2002.patol_anom_congenita == "S" ? 'Parentesco:' : "", width: '9%', bold: true }, { text: dato_2002.patol_anom_congenita == "S" ? dato_2002.parent_anom_congenita : "", width: '20%' }], marginTop: 2 },
      { columns: [{ text: 'OTROS:', width: '15%', bold: true }, { text: dato_2002.otros ? dato_2002.otros.enterPut() : "", width: '85%' }], marginTop: 2 },
    ]
  }
}

function antecedentes2002_03_impHc(dato_2002) {
  return {
    style: "left8",
    stack: [
      { text: 'ANTECEDENTES PERINATALES', bold: true },
      { columns: [{ text: 'Embarazo deseado?', width: '15%', bold: true }, { text: dato_2002.embarazo_deseado, width: '20%' }, { text: 'Patologia embarazo:', width: '15%', bold: true }, { text: dato_2002.patol_embarazo, width: '20%' }, { text: 'Patologia parto:', width: '12%', bold: true }, { text: dato_2002.patol_parto, width: '18%' }] },
      { columns: [{ text: 'Patologia puerperio:', width: '15%', bold: true }, { text: dato_2002.patol_puerperio, width: '20%' }, { text: 'Lugar nacimiento:', width: '15%', bold: true }, { text: dato_2002.lugar_nacimiento, width: '15%' }, { text: 'Apgar 1 Min:', width: '9%', bold: true }, { text: dato_2002.apgar_1_min, width: '3%' }, { text: 'Apgar 5 Min:', width: '9%', bold: true }, { text: dato_2002.apgar_5_min, width: '2%' }, { text: 'Apgar 10 Min:', width: '10%', bold: true }, { text: dato_2002.apgar_10_min, width: '4%' }] },
      { columns: [{ text: 'Atención perinatal?', width: '15%', bold: true }, { text: dato_2002.atencion_perinatal, width: '20%' }, { text: 'Reanimación?', width: '15%', bold: true }, { text: dato_2002.reanimacion, width: '20%' }, { text: 'Grupo sang madre:', width: '15%', bold: true }, { text: dato_2002.grupo_sang_madre, width: '20%' }] },
      { columns: [{ text: 'RH Madre?', width: '15%', bold: true }, { text: dato_2002.rh_madre, width: '20%' }, { text: 'Serologia Madre:', width: '15%', bold: true }, { text: dato_2002.serologia_madre, width: '20%' }, { text: 'Lactancia materna:', width: '15%', bold: true }, { text: dato_2002.lactan_materna, width: '20%' }] },
      { text: 'Patologias del recién nacido', bold: true, style: 'center8', marginTop: 5 },
      { columns: [{ text: 'Sano?', width: '15%', bold: true }, { text: dato_2002.sano, width: '20%' }, { text: 'Hemorragias?', width: '15%', bold: true }, { text: dato_2002.hemorragias, width: '20%' }, { text: 'Infecciones?', width: '15%', bold: true }, { text: dato_2002.infecciones, width: '20%' }] },
      { columns: [{ text: 'Deformac congeni?', width: '15%', bold: true }, { text: dato_2002.deforma_cong, width: '20%' }, { text: 'Hipoglicemia?', width: '15%', bold: true }, { text: dato_2002.hipoglicemia, width: '20%' }, { text: 'Apnea?', width: '15%', bold: true }, { text: dato_2002.apnea, width: '20%' }] },
      { columns: [{ text: 'Ictericia?', width: '15%', bold: true }, { text: dato_2002.ictericia, width: '20%' }, { text: 'Broncoaspiración?', width: '15%', bold: true }, { text: dato_2002.broncoasp, width: '20%' }, { text: 'Neurologías?', width: '15%', bold: true }, { text: dato_2002.neurologia, width: '20%' }] },
      { columns: [{ text: 'Membrana Hialina?', width: '15%', bold: true }, { text: dato_2002.memb_hialina, width: '20%' }] },
      { text: 'Hermanos', bold: true, style: 'center8' },
      { columns: [{ text: '# de hermanos:', width: '15%', bold: true }, { text: dato_2002.nro_hermanos, width: '20%' }, { text: 'Muertos < 5 años:', width: '15%', bold: true }, { text: dato_2002.hermanos_muer, width: '20%' }, { text: 'Vivos:', width: '15%', bold: true }, { text: dato_2002.hermanos_vivos, width: '20%' }] },
      { text: 'Patologias familiares', bold: true, style: 'center8', marginTop: 5 },
      { text: dato_2002.patologias_familiares, style: 'left8' },
    ]
  }
}

function antecedentes2002_04_impHc(dato_2002) {
  return {
    style: "left8",
    stack: [
      { text: "ANTECEDENTES FAMILIARES", bold: true, marginTop: 5 },
      { columns: [{ text: 'ASMA:', width: '15%', bold: true }, { text: dato_2002.asma == "S" ? "SI" : "NO", width: '15%' }, { text: 'CÁNCER:', width: '15%', bold: true }, { text: dato_2002.cancer == "S" ? "SI" : "NO", width: '15%' }, { text: 'DIABETES:', width: '15%', bold: true }, { text: dato_2002.diabetes == "S" ? "SI" : "NO", width: '15%' } ], marginTop: 4 },
      { columns: [{ text: 'H/TENSION ARTER:', width: '15%', bold: true }, { text: dato_2002.tension_arter == "S" ? "SI" : "NO", width: '15%' }, { text: 'ENF. CORONARIA:', width: '15%', bold: true }, { text: dato_2002.enfer_coronaria == "S" ? "SI" : "NO", width: '15%' }, { text: 'CEREBRO VASCUL.:', width: '15%', bold: true }, { text: dato_2002.cerebro_vasc == "S" ? "SI" : "NO", width: '15%' } ], marginTop: 4 },
      { columns: [{ text: 'NEUROLOGICOS:', width: '15%', bold: true }, { text: dato_2002.neurologicos == "S" ? "SI" : "NO", width: '15%' }, { text: 'HEPATOPATIAS:', width: '15%', bold: true }, { text: dato_2002.hepatopatias == "S" ? "SI" : "NO", width: '15%' }, { text: 'OBESIDAD:', width: '15%', bold: true }, { text: dato_2002.obesidad == "S" ? "SI" : "NO", width: '15%' } ], marginTop: 4 },
      { columns: [{ text: 'INFECCIONES:', width: '15%', bold: true }, { text: dato_2002.infecciones == "S" ? "SI" : "NO", width: '15%' }, { text: 'ALERGIAS:', width: '15%', bold: true }, { text: dato_2002.alergias == "S" ? "SI" : "NO", width: '15%' }, { text: 'PROB. PSICOLOG.:', width: '15%', bold: true }, { text: dato_2002.prob_psicolog == "S" ? "SI" : "NO", width: '15%' } ], marginTop: 4 },
      { columns: [{ text: 'MADRE ADOLESC.:', width: '15%', bold: true }, { text: dato_2002.madre_adolesc == "S" ? "SI" : "NO", width: '15%' }, { text: 'JUDICIALES:', width: '15%', bold: true }, { text: dato_2002.judiciales == "S" ? "SI" : "NO", width: '15%' } ], marginTop: 4 },
      { columns: [{ text: 'OTROS:', width: '15%', bold: true }, { text: dato_2002.otros ? dato_2002.otros.enterPut() : "", width: '85%' }], marginTop: 2 },
    ]
  }
}

function antecedentes2070_impHc(dato_2070) {
  return {
    style: "left8",
    stack: [
      { text: "OTROS ANTECEDENTES:", bold: true, marginTop: 5 },
      { columns: [{ text: 'TABAQUISMO:', width: '15%', bold: true }, { text: dato_2070.patol_tabaquismo == "S" ? "SI" : "NO", width: '15%' }, { text: 'ALCOHOLISMO:', width: '15%', bold: true }, { text: dato_2070.patol_alcoholismo == "S" ? "SI" : "NO", width: '15%' }, { text: 'DROGAS PSICOACTIVAS:', width: '19%', bold: true }, { text: dato_2070.patol_drog_psicoact == "S" ? "SI" : "NO", width: '15%' }], marginTop: 4 },
      { columns: [{ text: 'VACUNA TETANO:', width: '15%', bold: true }, { text: `${dato_2070.vacuna_teta.fecha_vacuna_teta.ano_vacuna_teta}/${dato_2070.vacuna_teta.fecha_vacuna_teta.mes_vacuna_teta}`, width: '15%' }, { text: 'VACUNA HEPAT.B:', width: '15%', bold: true }, { text: `${dato_2070.vacuna_hepat.fecha_vacuna_hepat.ano_vacuna_hepat}/${dato_2070.vacuna_hepat.fecha_vacuna_hepat.mes_vacuna_hepat}`, width: '15%' }, { text: 'VACUNA RUBEOLA:', width: '15%', bold: true }, { text: `${dato_2070.vacuna_rube.fecha_vacuna_rube.ano_vacuna_rube}/${dato_2070.vacuna_rube.fecha_vacuna_rube.mes_vacuna_rube}`, width: '15%' }], marginTop: 4 },
      { columns: [{ text: 'CUAGULOPATIA:', width: '15%', bold: true }, { text: dato_2070.patol_cuagulopatia == "S" ? "SI" : "NO", width: '15%' }, { text: 'TRANFUSIONALES:', width: '15%', bold: true }, { text: dato_2070.patol_transfusionales == "S" ? "SI" : "NO", width: '15%' }], marginTop: 4 },
    ]
  }
}

function antecedentes3010_impHc(dato_3010) {
  return {
    style: "left8",
    stack: [
      { text: "SENTIDOS:", bold: true, marginTop: 5 },
      { columns: [{ text: 'ARDOR OJOS:', width: '15%', bold: true }, { text: dato_3010.patol_ardor_ojos == "S" ? "SI" : "NO", width: '15%' }, { text: 'PRURITO:', width: '15%', bold: true }, { text: dato_3010.patol_prurito == "S" ? "SI" : "NO", width: '15%' }, { text: 'CANSANCIO OCUL:', width: '15%', bold: true }, { text: dato_3010.patol_cansancio_ocul == "S" ? "SI" : "NO", width: '15%' }], marginTop: 4 },
      { columns: [{ text: 'VISION BORROSA:', width: '15%', bold: true }, { text: dato_3010.patol_vision_borrosa == "S" ? "SI" : "NO", width: '15%' }, { text: 'TAMIZAJE NORMAL:', width: '15%', bold: true }, { text: dato_3010.patol_tamizaje_norm == "S" ? "SI" : "NO", width: '15%' }, { text: 'LAGRIMEO:', width: '15%', bold: true }, { text: dato_3010.patol_lagrimeo == "S" ? "SI" : "NO", width: '15%' }], marginTop: 4 },
      { columns: [{ text: 'OJO ROJO:', width: '15%', bold: true }, { text: dato_3010.patol_ojo_rojo == "S" ? "SI" : "NO", width: '15%' }, { text: 'DISFONIA:', width: '15%', bold: true }, { text: dato_3010.patol_disfonia == "S" ? "SI" : "NO", width: '15%' }, { text: 'EPITAXIS:', width: '15%', bold: true }, { text: dato_3010.patol_epitaxis == "S" ? "SI" : "NO", width: '15%' }], marginTop: 4 },
      { columns: [{ text: 'HIPOACUSIA:', width: '15%', bold: true }, { text: dato_3010.patol_hipoacusia == "S" ? "SI" : "NO", width: '15%' }, { text: 'OBSTRUCC NASAL:', width: '15%', bold: true }, { text: dato_3010.patol_obstrucc_nasal == "S" ? "SI" : "NO", width: '15%' }, { text: 'RINORREA:', width: '15%', bold: true }, { text: dato_3010.patol_rinorrea == "S" ? "SI" : "NO", width: '15%' }], marginTop: 4 },
      { columns: [{ text: 'TINITUS:', width: '15%', bold: true }, { text: dato_3010.patol_tinitus == "S" ? "SI" : "NO", width: '15%' }], marginTop: 4 },
    ]
  }
}

function evaluarUnidadMedida_impHc(unid) {
  switch (unid) {
    case '1': return ' C.C.        ';
    case '2': return ' Gramos      ';
    case '3': return ' Miligramos  ';
    case '4': return ' Microgramos ';
    case '5': return ' Tiempo      ';
    case '6': return ' Unidades    ';
    case '7': return ' U. Internac.';
    case '8': return ' Puff        ';
    case '9': return ' Gotas       ';
    case 'A': return ' %           ';
    case 'B': return ' Litros/min  ';
    case 'C': return ' MCG/KL/MIN  ';
    case 'D': return ' Tableta     ';
    case 'E': return ' Cucharada   ';
    case 'F': return ' Crema/ungu. ';
    case 'G': return ' Ampolla     ';
    case 'H': return ' Sobre       ';
    case 'I': return ' MiliEquivale';
    case 'J': return ' Capsulas    ';
    case 'K': return ' Locion      ';
    case 'L': return ' P.P.M.      ';
    case 'M': return ' Mg/Kg/Hora  ';
    case 'N': return ' Mcg/Kg/Hora ';
    default: return '  ';
  }
}

function encabezadoAperturas_impHc(datos, margin, titulo2) {
  switch (datos.paciente.edad.substring(0, 1)) {
    case 'A': datos.AUX_EDAD = '  Años'; break;
    case 'M': datos.AUX_EDAD = '  Meses'; break;
    case 'D': datos.AUX_EDAD = '  Dias'; break;
    default: datos.AUX_EDAD = ''; break;
  }
  datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

  var encabezado = function (currentPage, pageCount, pageSize) {
    var width_page = margin ? pageSize.width - 40 : pageSize.width - 70;

    return {
      margin: margin || [35, 25, 35, 0],
      stack: [
        {
          columns: [
            {
              margin: [7, 0, 0, 0],
              stack: [
                {
                  image: 'logo',
                  width: 75,
                  height: 45
                }
              ],
              width: '20%'
            },
            {
              style: 'center10Bold',
              text: [
                { text: datos.encabezado.nombre + '\n' },
                { text: datos.encabezado.nit + '\n' },
                { text: datos.encabezado.titulo + '\n' },
                { text: titulo2 ? titulo2 : '', style: 'center10Bold' }
              ],
              width: '60%'
            },
            {
              style: 'right10Bold',
              alignment: 'right',
              text: [
                { text: !$_REG_HC.hidePage ? '' + 'PAG: ' + currentPage + ' de ' + pageCount + '\n\n' : '\n\n' },
                { text: 'Imprime: ' + localStorage.Usuario + moment().format('  YYYY-MM-DD HH:mm'), fontSize: 6 },
              ],
              width: '20%'
            }
          ],
        },
        {
          marginLeft: 7,
          marginTop: 10,
          columns: [
            {
              stack: [
                {
                  columns: [
                    { text: 'FECHA INGRESO:', style: 'left8Bold', width: '15%' },
                    { text: datos.paciente.fechaIng, style: 'left8', width: '43%' },
                    {
                      columns: datos.paciente.fechaEgr != 0 ? [
                        { text: 'FECHA EGRESO:', style: 'left8Bold', width: '36%' },
                        { text: datos.paciente.fechaEgr, style: 'left8', width: '60%' },
                      ] : []
                    }
                  ]
                },
                {
                  marginTop: 2,
                  columns: [
                    { text: 'PACIENTE:', style: 'left8Bold', width: '15%' },
                    { text: datos.paciente.nombre.replace(/\�/g, "Ñ"), style: 'left8', width: '43%' },
                    { text: 'IDENTIFICACIÓN:', style: 'left8Bold', width: '15%' },
                    { text: datos.paciente.tipoId + ' ' + datos.paciente.id, style: 'left8', width: '27%' },
                  ]
                },
                {
                  marginTop: 2,
                  columns: [
                    { text: 'EDAD:', style: 'left8Bold', width: '6%' },
                    { text: datos.paciente.edad + datos.AUX_EDAD, style: 'left8', width: '9%' },
                    { text: 'SEXO:', style: 'left8Bold', width: '7%' },
                    { text: datos.paciente.sexo, style: 'left8', width: '8%' },
                    { text: 'NACIM:', style: 'left8Bold', width: '8%' },
                    { text: datos.paciente.nacim, style: 'left8', width: '20%' },
                    { text: 'CIUDAD:', style: 'left8Bold', width: '15%' },
                    { text: datos.paciente.ciudad, style: 'left8', width: '27%' },
                  ]
                },
                {
                  marginTop: 2,
                  columns: [
                    { text: 'ACOMPAÑANTE:', style: 'left8Bold', width: '15%' },
                    { text: datos.paciente.acomp, style: 'left8', width: '43%' },
                    { text: 'FOLIO:', style: 'left8Bold', width: '6%' },
                    { text: datos.paciente.folio, style: 'left8', width: '12%' },
                    { text: 'TELEFONO:', style: 'left8Bold', width: '10%' },
                    { text: datos.paciente.telefono, style: 'left8', width: '15%' },
                  ]
                },
                {
                  marginTop: 2,
                  columns: [
                    { text: 'ENTIDAD:', style: 'left8Bold', width: '15%' },
                    { text: datos.paciente.entidad, style: 'left8', width: '85%' },
                  ]
                },
              ],
              width: '100%'
            },
          ],
        },
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: -58,
              w: width_page,
              h: 60,
              r: 0,
              lineWidth: 1,
            },
          ],
        },
      ]

    }
  }

  return encabezado;
}

function llenarPacienteAperturas_impHc(_paci, _hcprc) {
  var paciente = {};
  paciente.nombre = _paci.DESCRIP.replace(/\s+/g, ' ');
  paciente.tipoId = _paci['TIPO-ID'];
  isNaN(_paci.COD) == true ? paciente.id = _paci.COD : paciente.id = new Intl.NumberFormat("ja-JP").format(_paci.COD);
  paciente.fechaIng = _editFecha3(_hcprc.fecha) + ' - ' + _editHora(_hcprc.hora);
  paciente.fechaEgr = _hcprc.egreso.substring(4,6).trim() != 0 ? _editFecha3(_hcprc.egreso) + ' - ' + _editHora(_hcprc.hora_egres) : 0;
  paciente.edad = _hcprc.edad;
  paciente.nacim = _editFecha3(_paci['NACIM']);
  _paci['SEXO'] == 'F' ? paciente.sexo = 'Fem.' : paciente.sexo = 'Masc';
  paciente.ciudad = _paci['DESCRIP-CIUDAD'];
  paciente.telefono = _paci['TELEFONO'];
  paciente.acomp = _hcprc.acompa.trim() ? _hcprc.acompa : _paci['ACOMPA'];
  paciente.folio = _hcprc.llave.substring(15, 17) + ' - ' + _hcprc.llave.substring(17, 23);

  if ((_hcprc.cierre.nit_fact == '' || _hcprc.cierre.nit_fact == 0)) {
    paciente.entidad = _paci['NOMBRE-EPS']
  } else {
    paciente.entidad = _hcprc.cierre.descrip_nit_fact
  }

  return paciente
}

function llenarPacienteAperturas2_impHc(_paci, _hcprc) {
  let paciente = {}
  paciente.nombre = _paci.DESCRIP.replace(/\s+/g, ' ');
  paciente.tipoId = _paci['TIPO-ID'];
  isNaN(_paci.COD) == true ? paciente.id = _paci.COD : paciente.id = new Intl.NumberFormat("ja-JP").format(_paci.COD);
  paciente.fechaIng = _editFecha3(_hcprc.fecha) + ' - ' + _editHora(_hcprc.hora);
  paciente.fechaEgr = _hcprc.cierre.egreso.substring(4,6).trim() != 0 ? _editFecha3(_hcprc.cierre.egreso) + ' - ' + _editHora(_hcprc.cierre.hora_egres) : 0;
  paciente.edad = _hcprc.unid_edad.toString() + _hcprc.vlr_edad.toString();
  paciente.nacim = _editFecha3(_paci['NACIM']);
  _paci['SEXO'] == 'F' ? paciente.sexo = 'Fem.' : paciente.sexo = 'Masc';
  paciente.ciudad = _paci['DESCRIP-CIUDAD'];
  paciente.telefono = _paci['TELEFONO'];
  paciente.acomp = _hcprc.acompa.trim() ? _hcprc.acompa : _paci['ACOMPA'];
  paciente.folio = _hcprc.llave.slice(15, 17) + ' - ' + _hcprc.llave.slice(17, 23);

  if ((_hcprc.cierre.nit_fact == '' || _hcprc.cierre.nit_fact == 0)) {
    paciente.entidad = _paci['NOMBRE-EPS']
  } else {
    paciente.entidad = _hcprc.cierre.descrip_nit_fact
  }

  return paciente
}

function _getEdad_impHc(unid, vlr) {
  switch (unid) {
    case 'A': return vlr + '  Años'
    case 'M': return vlr + '  Meses'
    case 'D': return vlr + '  Dias'
    default: return vlr + ''
  }
}

function _getActividad_impHc(actividad) {
  switch (parseInt(actividad)) {
    case 1: return 'TRABAJA';
    case 2: return 'BUSCA 1ra VEZ';
    case 3: return 'NO Y NO BUSCA';
    case 4: return 'PASANTIA';
    case 5: return 'DESOCUPADO';
    case 6: return 'NO TRABAJA Y NO ESTUDIA';
    default: return ' ';
  }
}

function _getNoUsoAntic(razon) {
  switch (parseInt(razon)) {
    case 1: return 'NO USA X TRADICIÓN';
    case 2: return 'NO USA X SALUD';
    case 3: return 'NO USA X NEGACIÓN';
    case 4: return 'NO APLICA';
    default: return ' ';
  }
}

async function consulta_recom_rabia(hcprc, orden) {
  // hcprc.rips.tabla_diag[0].diagn = "W530";
  return new Promise((resolve) => {
    let flag = null;
    if(orden == 1) {
      for (let i in hcprc.rips.tabla_diag) {
        if(hcprc.rips.tabla_diag[i].diagn.slice(0,1) == "W" && (hcprc.rips.tabla_diag[i].diagn.slice(1) >= 530 && hcprc.rips.tabla_diag[i].diagn.slice(1) <= 559) ) {
          flag = true;
        }
      }
    } else {
      for (let i in hcprc.rips.tabla_diagn) {
        if(hcprc.rips.tabla_diagn[i].cod_diagn.slice(0,1) == "W" && (hcprc.rips.tabla_diagn[i].cod_diagn.slice(1) >= 530 && hcprc.rips.tabla_diagn[i].cod_diagn.slice(1) <= 559) ) {
          flag = true;
        }
      }
    }
  
    let content = [];
    if(flag) {
      content = [
        {
            marginTop: 10,
            fontSize: 10,
            bold: true,
            alignment: "center",
            text: "INDICACIONES POSTERIORES A LA ATENCIÓN DE URGENCIAS POR MORDEDURA DE ANIMALES CON EXPOSICIÓN LEVE O GRAVE"
        },
        {
            marginTop: 10,
            text: "Si usted fue agredido por cualquier animal y atendido en el área de urgencias, tenga presente las siguientes indicaciones:"
        },
        {
            margin: [15, 5, 0, 0],
            text: [
                { text: "1. Si el médico que lo atendió, le entregó una orden de aplicación de SUERO y/o VACUNA antirrábica, debe acercarse al área de " },
                { text: "VACUNACIÓN", decoration: "underline" },
                { text: " para proporcionar sus datos y dejar copia de las órdenes." },
            ]
        },
        {
            margin: [15, 5, 0, 0],
            text: [
                { text: "2. Antes de la aplicación del SUERO y/o VACUNA debe saber que, primero se realizará la busqueda y observación del animal que lo agredió, la secretaria de Salud Municipal se encargará de realizar la observación del animal durante " },
                { text: "10 dias", bold: true },
                { text: " contados a partir del dia de la agresión (independientemente del dia en que consultó por urgencias), ellos se pondrán en contacto con usted, por lo que debe suministrar la información que se le solicitará (informar con detalle la descripción de lo ocurrido)." },
            ]
        },
        {
            margin: [15, 5, 0, 0],
            text: [
                { text: "3. Luego de realizar la observación de 10 dias, el Hospital Municipal se comunicará con usted para acercarse a realizar la aplicación del SUERO y/o VACUNA si lo requiere, si no es llamado, es porque el animal fue encontrado y no sería necesaria la aplicación." },
            ]
        },
        {
            marginTop: 10,
            text: [
                { text: "NOTA: ", bold: true },
                { text: "la aplicación del SUERO y/o VACUNA ANTIRRÁBICA " },
                { text: "NO ", bold: true },
                { text: "es la cura para sanar la herida, esta solamente le dará las defensas necesarias contra el virus de la rabia después del tiempo de observación del animal, la herida se recuperará depende del cuidado suyo y de seguir las indicaciones médicas que le entregaron en el momento de la urgencia. " },
                { text: "(Fuente: Guía práctica para la atención integral de personas atendidas por un animal potencialmente transmisor de Rabia, Ministerio de Salud)." },
            ]
        },
      ]
    }

    resolve(content);
  })
}