function _imprimirHC702R(datos, callback) {
    switch (datos.paciente.edad.substring(0, 1)) {
        case 'A': datos.AUX_EDAD = '  Años'; break;
        case 'M': datos.AUX_EDAD = '  Meses'; break;
        case 'D': datos.AUX_EDAD = '  Dias'; break;
        default: datos.AUX_EDAD = ''; break;
    }
    datos.paciente.edad = parseInt(datos.paciente.edad.substring(1, 4));

    return {
        images: { logo: `P:\\PROG\\LOGOS\\${datos.encabezado.nit}.png`, firma: rutaFirmas_impHc(datos.medico.firma) },
        pageMargins: [35, 90, 35, 60],
        header: function (currentPage, pageCount, pageSize) {
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
                        width: '10%'
                      },
                      {
                        style: 'center12Bold',
                        text: [
                          { text: datos.encabezado.nombre + '\n' },
                          { text: datos.encabezado.nit + '\n' },
                          { text: datos.encabezado.titulo }
                        ],
                        width: '83%'
                      },
                      {
                        style: 'left12',
                        alignment: 'right',
                        text: [
                          { text: '' + 'PAG: ' + currentPage + '\n\n' },
                          { text: localStorage.Usuario + moment().format('  YYYY-MM-DD'), fontSize: 7 },
                        ],
                        width: '7%'
                      }
                    ],
                  },
                ]
              }
        },
        content: [
            {
                margin: [0, 5, 0, 0],
                stack: [
                    {
                        stack: llenarFormato()
                    },
                ]
            },
        ],

        styles: estilosImpresion_impHc()
    }

    function llenarFormato() {
        var col = [
		  {
		      table: {
		          widths: ['100%'],
		          headerRows: 0,
		          body: [
		              [{ text: 'RESOLUCION NUMERO 00004331  19 DIC DE 2012', style: 'center10Bold', border: [true, true, true, true], fillColor: '#D1DFF4' }],
		              [{ text: datos.titulos.titulo, style: 'center10Bold', border: [true, false, true, false], }],
		              [
		                  {
		                      columns: [
		                          { text: 'INFORMACION DEL PRESTADOR:', style: 'left8Bold', width: '60%' },
                                  {text: 'Fecha: ' +  datos.fecha_epi.ano + '/' + datos.fecha_epi.mes + '/' + datos.fecha_epi.dia, style: 'center8', width: '20%'},
		                          {text: 'Hora: ' + datos.fecha_epi.hora + ':' + datos.fecha_epi.minutos, style: 'center8', width: '20%'},
		                      ], border: [true, false, true, true]
		                  },
		              ],
		          ]
		          
		      }
		  },
		  {
		      style: 'center8',
		      table: {
		          widths: ['50%', '50%'],
		          headerRows: 0,
		          body: [
		              [
		                {text: 'Nombre: ' + datos.prestador.nombre, style: 'left8', border: [true, false, true, true]},
		                {
		                  border: [true, false, true, true],
		                  table: {
		                      widths: ['45%', '5%', '50%'],
		                      body: [
		                          [
		                              {text: 'Nit: ', border: [false, false, false, false], },
		                              {text:'X', border: [true, true, true, true]},
		                              {text: datos.prestador.nit, border: [false, false, false, false]}
		                          ],
		                      ],
		                  }
		                  
		                },
		              ]
		          ]
		          
		      }
		  },
		  {
		      style: 'left8',
		      table: {
		          widths: ['50%', '50%'],
		          headerRows: 0,
		          body: [
		              [
    		              {text: 'Codigo: ' + datos.prestador.codigo, border: [true, false, true, true]},
    		              {text: 'Direccion prestador: ' + datos.prestador.direccion_prestador, border: [true, false, true, true]},
		              ]
		          ]
		      }
		  },
		  {
		      style: 'left8',
		      table: {
		          widths: ['8%', '14%', '20%', '29%', '29%'],
		          headerRows: 0,
		          body: [
		              [
    		               {text: 'telefono: ', border: [true, false, true, true]},
    		               {text: 'indicativo  ' + datos.prestador.indicativo_tel, border: [true, false, true, true]},
    		               {text: 'numero  ' + datos.prestador.telefono, border: [true, false, true, true]},
    		               {text: 'Departamento: ' + datos.prestador.departamento, border: [true, false, true, true]},
    		               {text: 'Municipio: ' + datos.prestador.municipio, border: [true, false, true, true]},
		              ]
		          ],
		      }
		  },
		  {
		      style: 'center10Bold',
		      table: {
		          widths: ['100%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: 'DATOS DEL PACIENTE', border: [true, false, true, true], fillColor: '#D1DFF4'}
		              ]
		          ]
		      }
		  },
		  {
		      style: 'center8Bold',
		      table: {
		          widths: ['100%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: datos.paciente.nombre_paci, border: [true, false, true, true]}
		              ]
		          ]
		      }
		  },
		  {
		      style: 'left8',
		      table: {
		          widths: ['100%'],
		          headerRows: 0,
		          body: [
		              [ {text: 'Tipo Documento de Identificacion', border: [true, false, true, false]}],
		              [
		                  {
		                      border: [true, false, true, true],
		                      table: {
		                          widths: ['2%', '18%', '2%', '19%', '2%', '23%', '34%'],
		                          body: [
		                              [
		                                  {text: datos.tipo_ident.registro_civil, style: 'center8'},
		                                  {text: 'Registro Civil', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident.pasaporte, style: 'center8'},
		                                  {text: 'Pasaporte', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident.salvo_conduc, style: 'center8'},
		                                  {text: 'Salvo Conducto', border: [false, false, false, false]},
		                                  {text: datos.paciente.identificacion, style: 'center8'}
		                              ],
		                              [
		                                  {text: datos.tipo_ident.targeta_iden, style: 'center8'},
		                                  {text: 'Tarjeta de Identidad', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident.adulto_sin_ident, style: 'center8'},
		                                  {text: 'Adulto sin Identificacion', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident.permiso_perman, style: 'center8'},
		                                  {text: 'Permiso Especial Perman', border: [false, false, false, false]},
		                                  {text: 'Numero documento de identificacion', style: 'center8', border: [false, false, false, false]}
		                              ],
		                              [
		                                  {text: datos.tipo_ident.cedula_ciuda, style: 'center8'},
		                                  {text: 'Cedula de Ciudadania', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident.menor_sin_ident, style: 'center8'},
		                                  {text: 'Menor sin Identificacion', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident.certificado_nacid_vivo, style: 'center8'},
		                                  {text: 'Certificado Nacido Vivo', border: [false, false, false, false]},
		                                  {text: '', border: [false, false, false, false]}
		                              ],
		                              [
		                                  {text: datos.tipo_ident.cedula_extranjeria, style: 'center8'},
		                                  {text: 'Cedula de Extranjeria', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident.carnet_diplomat, style: 'center8'},
		                                  {text: 'Carnet Diplomatico', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident.numero_unico_ident, style: 'center8'},
		                                  {text: 'Numero Unico Ident', border: [false, false, false, false]},
		                                  {text: 'Fecha Naci: ' + datos.paciente.fecha_naci + '  ' + 'Edad: ' + datos.paciente.edad, border: [false, false, false, false]}
		                              ],
		                          ]
		                      }
		                  }
		              ]
		          ]
		      }
		  },
		  {
		      style: 'left8',
		      table: {
		          widths: ['70%', '30%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: 'Direccion de Residencia Habitual:  ' + datos.paciente.direccion, border: [true, false, true, true]},
		                  {text: 'Telefono:  ' + datos.paciente.telefono, border: [true, false, true, true]}
		              ]
		          ]
		      }
		  },
		  {
		      style: 'left8',
		      table: {
		          widths: ['50%', '50%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: 'Departamento:  ' + datos.paciente.departamento, border: [true, false, true, true]},
		                  {text: 'Municipio:  ' + datos.paciente.municipio, border: [true, false, true, true]}
		              ]
		          ]
		      }
		  },
		  {
		      style: 'left8',
		      table: {
		          widths: ['80%', '20%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: 'ENTIDAD RESPONSABLE DEL PAGO:  ' + datos.paciente.nombre_ent, border: [true, false, true, true]},
		                  {text: 'CODIGO:  ' + datos.paciente.cod_ent, border: [true, false, true, true]}
		              ]
		          ]
		      }
		  },
		  {
		      style: 'center10Bold',
		      table: {
		          widths: ['100%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: 'DATOS DE LA PERSONA RESPONSABLE DEL PACIENTE, ACOMPAÑANTE', border: [true, false, true, true], fillColor: '#D1DFF4'},
		              ]
		          ]
		      }
		  },
		  {
		      style: 'center8Bold',
		      table: {
		          widths: ['100%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: datos.acompa.nombre_acompa, border: [true, false, true, true]}
		              ]
		          ]
		      }
		  },
		  {
		      style: 'left8',
		      table: {
		          widths: ['100%'],
		          headerRows: 0,
		          body: [
		              [ {text: 'Tipo Documento de Identificacion', border: [true, false, true, false]}],
		              [
		                  {
		                      border: [true, false, true, true],
		                      table: {
		                          widths: ['2%', '18%', '2%', '19%', '2%', '23%', '34%'],
		                          body: [
		                              [
		                                  {text: datos.tipo_ident_acompa.registro_civil, style: 'center8'},
		                                  {text: 'Registro Civil', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident_acompa.pasaporte, style: 'center8'},
		                                  {text: 'Pasaporte', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident_acompa.salvo_conduc, style: 'center8'},
		                                  {text: 'Salvo Conducto', border: [false, false, false, false]},
		                                  {text: datos.acompa.identificacion, style: 'center8'}
		                              ],
		                              [
		                                  {text: datos.tipo_ident_acompa.targeta_iden, style: 'center8'},
		                                  {text: 'Targeta de Identidad', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident_acompa.adulto_sin_ident, style: 'center8'},
		                                  {text: 'Adulto sin Identificacion', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident_acompa.permiso_perman, style: 'center8'},
		                                  {text: 'Permiso Especial Perman', border: [false, false, false, false]},
		                                  {text: 'Numero documento de identificacion', style: 'center8', border: [false, false, false, false]}
		                              ],
		                              [
		                                  {text: datos.tipo_ident_acompa.cedula_ciuda, style: 'center8'},
		                                  {text: 'Cedula de Ciudadania', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident_acompa.menor_sin_ident, style: 'center8'},
		                                  {text: 'Menor sin Identificacion', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident_acompa.certificado_nacid_vivo, style: 'center8'},
		                                  {text: 'Certificado Nacido Vivo', border: [false, false, false, false]},
		                                  {text: '', border: [false, false, false, false]}
		                              ],
		                              [
		                                  {text: datos.tipo_ident_acompa.cedula_extranjeria, style: 'center8'},
		                                  {text: 'Cedula de Extranjeria', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident_acompa.carnet_diplomat, style: 'center8'},
		                                  {text: 'Carnet Diplomatico', border: [false, false, false, false]},
		                                  {text: datos.tipo_ident_acompa.numero_unico_ident, style: 'center8'},
		                                  {text: 'Numero Unico Ident', border: [false, false, false, false]},
		                                  {text: '', border: [false, false, false, false]}
		                              ],
		                          ]
		                      }
		                  }
		              ]
		          ]
		      }
		  },
		  {
		      style: 'left8',
		      table: {
		          widths: ['70%', '30%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: 'Direccion de Residencia Habitual:  ' + datos.acompa.direccion, border: [true, false, true, true]},
		                  {text: 'Telefono:  ' + datos.acompa.telefono, border: [true, false, true, true]}
		              ]
		          ]
		      }
		  },
		  {
		      style: 'left8',
		      table: {
		          widths: ['50%', '50%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: 'Departamento:  ' + datos.acompa.departamento, border: [true, false, true, true]},
		                  {text: 'Municipio:  ' + datos.acompa.municipio, border: [true, false, true, true]}
		              ]
		          ]
		      }
		  },
		  {
			stack: datos.covid.riesgos.bandera == true ? llenarRiesgosCovid() : []
	  	  },
			{
				marginTop: 5,
				style: 'center10Bold',
				table: {
					widths: ['100%'],
					headerRows: 0,
					body: [
						[
							{text: datos.titulos.titulo_prof, border: [true, true, true, false], fillColor: '#D1DFF4'}
						]
					]
				}
			},
		  {
		      style: 'left8',
		      table: {
		          widths: ['70%', '30%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: 'Nombre:  ' + datos.profesional.nombre},
		                  {text: 'telefono:  ' + datos.profesional.telefono}
		              ]
		          ]
		      }
		  },
		  {
		      style: 'left8',
		      table: {
		          widths: ['100%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: 'Servicio que solicita la referencia:         ' + datos.profesional.descrip_unServ, border: [true, false, true, true]},
		              ]
		          ]
		      }
		  },
		  {
		      style: 'left8',
		      table: {
		          widths: ['100%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: 'Servicio para el cual se solicita la referencia:         ' + datos.profesional.nombre_esp, border: [true, false, true, true]},
		              ]
		          ]
		      }
		  },
		  {
		      style: 'center10Bold',
		      table: {
		          widths: ['100%'],
		          headerRows: 0,
		          body: [
		              [
		                  {text: 'INFORMACION CLINICA RELEVANTE', border: [true, false, true, true], fillColor: '#D1DFF4'},
		              ]
		          ]
		      }
		  },
		  {
		      marginTop: 5,
		      stack: llenarAnalisis()
		  },
		  {
		      stack: datos.diagnostico.bandera == true ? diagnostico() : []
		  },
		  {
		    //   marginTop: 10,
		      style: 'center8',
		      stack: llenarMedicoFirma()
		  },
        ]
            return col
    }
    
    function llenarAnalisis() {
    var col = [
			{
				text: [
					{text: 'ANALISIS: \n', style: 'left8Bold'},
					{text: datos.analisis.reng_epi, style: 'left8', alignment: 'justify' }
				]
			},
			{
                marginTop: 5,
                text: [
					{text: 'PLAN: \n', style: 'left8Bold' },
                    {text: datos.analisis.plan_epi, style: 'left8', alignment: 'justify' }
                ]
            }
        ]
        return col
    }
    
    function llenarMedicoFirma() {
        var col = [
            firmaImpresion_impHc(datos)
        ]

        return col
    }
    
    function diagnostico() {
        var col = [
            ]
            
            for (var i in datos.diagnostico.cod_enf) {
                col.push(
                    [
                        {text: 'CIE10:  ' + datos.diagnostico.cod_enf[i] + '  ' + datos.diagnostico.nombre_enf[i], style: 'left8', marginTop: 2,},
                    ],
                )
            }
            
            return col
    }
    
    function llenarRiesgosCovid() {
        var col = [
            {
                unbreakable: true,
                style: 'left8',
                table: {
                    widths: ['90%', '10%'],
                    headerRows: 0,
                    body: [
                        [{text: 'EVALUACION DEL RIESGO COVID-19', style: 'center8Bold', colSpan: 2, border: [true, false, true, true]}, {}],
                        [{text: 'Transito o viajo en los ultimos 14 dias por un pais o region con circulacion viral confirmada de COVID 19?' }, {text: datos.covid.riesgos.transito, style: 'center8', }],
                        [{text: 'En los ultimos 14 dias ha estado en contacto con alguna persona que haya sido diagnosticada con Coronavirus?' }, {text: datos.covid.riesgos.contDiag, style: 'center8', }],
                        [{text: 'Es personal de la salud u otro ambito hospitalario con contacto estrecho de caso confirmado o probable para Covid-19?' }, {text: datos.covid.riesgos.contEstr, style: 'center8', }],
                    ]
                },
            },
            {
                style: 'left8',
                table: {
                    widths: ['28%', '5%', '28%', '5%', '29%', '5%',],
                    body: [
                        [
                            {text: 'Fiebre:', border: [true, false, true, true]},{text: datos.covid.riesgos.fiebre, style: 'center8', border: [true, false, true, true]},
                            {text: 'Tos', border: [true, false, true, true]},{text: datos.covid.riesgos.tos, style: 'center8', border: [true, false, true, true]},
                            {text: 'Disnea', border: [true, false, true, true]},{text: datos.covid.riesgos.disnea, style: 'center8', border: [true, false, true, true]},
                        ],
                        [
                            {text: 'Malestar general', border: [true, false, true, true]},{text: datos.covid.riesgos.general, style: 'center8', border: [true, false, true, true]},
                            {text: 'Rinorrea', border: [true, false, true, true]},{text: datos.covid.riesgos.rinorrea, style: 'center8', border: [true, false, true, true]},
                            {text: 'Odinofagia', border: [true, false, true, true]},{text: datos.covid.riesgos.odinofagia, style: 'center8', border: [true, false, true, true]},
                        ],
                    ]
                }
            },
            {
                style: 'left8',
                table: {
                    widths: ['28%', '5%', '13%', '20%', '29%', '5%',],
                    body: [
                        [
                            {text: 'Ha viajado dentro del pais?', border: [true, false, true, true]},{text: datos.covid.riesgos.pre1, style: 'center8', border: [true, false, true, true]},
                            {text: 'A donde viajo? ', widths: '20%', border: [true, false, false, true]},{text: datos.covid.riesgos.pre2, style: 'center8', border: [false, false, true, true]},
                            {text: 'Qué tiempo en dias duró ese viaje?', border: [true, false, true, true]},{text: datos.covid.riesgos.pre3, style: 'center8', border: [true, false, true, true]},
                        ],
                        [
                            {text: 'Ha viajado fuera del pais?', border: [true, false, true, true]},{text: datos.covid.riesgos.pre4, style: 'center8', border: [true, false, true, true]},
                            {text: 'A donde viajo? ', border: [true, false, false, true]},{text: datos.covid.riesgos.pre5, style: 'center8', border: [false, false, true, true]},
                            {text: 'Qué tiempo en dias duró ese viaje?', border: [true, false, true, true]},{text: datos.covid.riesgos.pre6, style: 'center8', border: [true, false, true, true]},
                        ],
                    ]
                }
            }
        ]
        
        return col
    }
}