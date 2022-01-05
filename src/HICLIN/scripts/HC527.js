new Vue({
    el: '#HC527',
    data: {
        info_historia: null,
        fecha_act: moment().format('YYYYMMDD'),
        novedad: "7",
        form: {
            cod_prof: null,
            descrip_prof: null,
            ano: null,
            mes: null,
            dia: null,
            hora: null,
            minutos: null,
            numero_ctl: null
        },
        actual: {
            item: null,
            codigo: null,
            descripcion: null,
            cantidad: null,
            indicaciones: null,
            modificar: false
        },
        listado_medicamentos: [],
        tabla_medicamentos: [],
        /* datos tabla devoluciones anteriores*/
        modal_f9: false,
        index_tabla: 0,
        listado_devoluciones: [],
        segundaTabla: []
    },
    async created() {
        _vm = this;
        nombreOpcion('5-2-7 - Devolución de medicamentos');
        this.init()
        this.montar_datos()
        await this.get_datos()

        const operador = localStorage.Usuario
        const nit = $_USUA_GLOBAL[0].NIT;
        if (operador === "ADMI" || operador === "GEBC" || operador == "AMB1")
          this.validar_mes();
        else this.buscar_unidad_servicio();
    },
    methods: {
        init() {
            _inputControl('disabled');
            _inputControl('reset');
        },
        montar_datos() {
            this.form.cod_prof = $_REG_PROF.IDENTIFICACION.trim();
            this.form.descrip_prof = $_REG_PROF.NOMBRE;
            // this.consultar_tercero($_REG_PROF.IDENTIFICACION);
            this.form.ano = parseInt(moment().format("YYYY"));
            this.form.mes = parseInt(moment().format("MM"));
            this.form.dia = parseInt(moment().format("DD"));
            this.form.hora = moment().format("HH");
            this.form.minutos = moment().format("mm");
        },
        validar_mes() {
            const _this = this;
            validarInputs(
                {
                    form: "#mes_HC527",
                    orden: '1',
                },
                _regresar_menuhis,
                () => {
                    let mes = _this.form.mes || 0
                    if (mes < 1 || mes > 12) _this.validar_mes()
                    else _this.validar_dia()
                }
            )
        },
        validar_dia() {
            const _this = this;
            validarInputs(
                {
                    form: "#dia_HC527",
                    orden: '1',
                },
                _this.validar_mes,
                () => {
                    let dia = _this.form.dia || 0
                    if (dia < 1 || dia > 31) _this.validar_dia()
                    else _this.validar_hora()
                }
            )
        },
        validar_hora() {
            const _this = this;
            validarInputs(
                {
                    form: "#hora_HC527",
                    orden: '1',
                },
                _this.validar_dia,
                () => {
                    let hora = _this.form.hora || 0
                    if (hora > 24) _this.validar_hora()
                    else _this.validar_minutos()
                }
            )
        },
        validar_minutos() {
            const _this = this;
            validarInputs(
                {
                    form: "#minutos_HC527",
                    orden: '1',
                },
                _this.validar_hora,
                () => {
                    let hora = _this.form.hora || 0
                    if (hora > 59) _this.validar_minutos()
                    else _this.buscar_unidad_servicio()
                }
            )
        },
        buscar_unidad_servicio() {
            ////
            // $_REG_HC.unser_hc = '02'
            ////
            const _this = this;
            const historia = $_REG_HC;
            let nro_fact_hc = _this.info_historia.cierre.nro_fact

            // console.log('Historia', historia)
            if (parseInt(historia.unser_hc) === 0)
                historia.serv_hc = historia.unser_hc;

            if ((historia.estado_hc == '1' || parseInt(historia.unser_hc < 3)) ||
                ((historia.serv_hc != '01' || parseInt(historia.unser_hc) != '01') && historia.estado_hc != '2' && (parseInt(_this.fecha_act) <= parseInt(historia.fecha_egreso_hc)))) {
                // if ((parseInt(historia.unser_hc) <= 2 || parseInt(historia.unser_hc) >= 50) && parseInt(nro_fact_hc)) { // PENDIENTE REVISAR CUANDO ACACIAS PUEDAN ASIGNAR CAMAS OPC 61 * YEIMI
                _this.actual.item = 1;
                _this.validar_item();
            } else {
                CON851('9Y', '9Y', null, 'error', 'error');
                // CON851('1Q', '1Q', null, 'error', 'error');
                _regresar_menuhis();
            };
            // } 
            // else {
            // CON851('9Y', '9Y', null, 'error', 'error');
            // _regresar_menuhis();    
            // }

        },

        validar_item() {
            const _this = this;
            validarInputs(
                {
                    form: "#validar_item",
                    orden: '1',
                    event_f3: _this.validar_guardado,
                    event_f5: () => {
                        CON851P('03', _this.validar_item, () => { setTimeout(() => { _regresar_menuhis(); }, 300) });
                    },
                },
                () => {
                    CON851P('03', _this.validar_item, () => { setTimeout(() => { _regresar_menuhis(); }, 300) });
                },
                () => {
                    let item = _this.actual.item || 0
                    let ultimo = _this.tabla_medicamentos.length + 1

                    if (!item || item < 1 || item > ultimo || item > 25) {
                        _this.actual.item = ultimo
                        _this.validar_item()
                    } else {
                        let busqueda = _this.tabla_medicamentos.find(el => el.item === parseInt(item))
                        if (busqueda) {
                            let copia = JSON.parse(JSON.stringify(busqueda))
                            _this.actual = {
                                item: copia.item,
                                codigo: copia.codigo,
                                descripcion: copia.descripcion,
                                cantidad: copia.cantidad,
                                indicaciones: copia.indicaciones,
                                modificar: true
                            }

                            _this.validar_codigo()
                        } else _this.validar_codigo()
                    }
                }
            )
        },
        validar_codigo() {
            const _this = this;
            validarInputs(
                {
                    form: "#validar_codigo",
                    orden: '1',
                    event_f3: _this.validar_guardado,
                    event_f5: () => {
                        CON851P('03', _this.validar_codigo, () => { setTimeout(() => { _regresar_menuhis(); }, 300) });
                    },
                    event_f9: _this._initDevolucionAnt
                },
                () => {
                    this.reset_actual()
                    this.validar_item()
                },
                () => {
                    let codigo = _this.actual.codigo
                    let busqueda = _this.listado_medicamentos.find(el => el.cod_formu == codigo)
                    let busqueda_tabla = _this.tabla_medicamentos.find(el => el.codigo == codigo)
                    if (!busqueda) {
                        CON851('01', '01', null, 'error', 'error');
                        _this.validar_codigo()
                    } else if (!_this.actual.modificar && busqueda_tabla) {
                        CON851('05', '05', null, 'error', 'error');
                        _this.validar_codigo()
                    } else {
                        _this.actual.descripcion = busqueda.nombre_formu
                        if (!_this.actual.modificar) _this.actual.cantidad = 1
                        setTimeout(() => {
                            _this.validar_cantidad()
                        }, 500)
                    }
                }
            )
        },
        validar_guardado() {
            var _this = this;
            if (_this.tabla_medicamentos.length < 1) {
                CON851P('03', _this.validar_item, () => { setTimeout(() => { _regresar_menuhis(); }, 300) });
            } else {
                CON851P('01', _this.validar_item, () => {
                    _this.guardar_devolucion()
                });
            }
        },
        validar_cantidad() {
            const _this = this;
            validarInputs(
              {
                form: "#validar_cantidad",
                orden: "1",
              },
              _this.validar_codigo,
              _this.on_validar_cantidad
            );
        },
        on_validar_cantidad() {
            const _this = this;
            let codigo = _this.actual.codigo;
            let busqueda = _this.listado_medicamentos.find(
              (el) => el.cod_formu == codigo
            );
            let cantidad = parseFloat(this.actual.cantidad) || 0;

            if (!busqueda) {
              CON851("01", "01", null, "error", "error");
              _this.validar_codigo();
            }else{
                
              let cant_fact = parseFloat(busqueda.cant_fact) || 0;
              let cant_adm = parseFloat(busqueda.cant_adm) || 0;
              let cant_dev = parseFloat(busqueda.cant_devo) || 0;
              let saldo = cant_fact - cant_adm - cant_dev;

              if (_this.novedad == "7" && (cantidad <= 0 || cantidad > saldo)) {
                CON851("03", "03", null, "error", "error");
                jAlert(
                  {
                    titulo: "Cant. medicamento formulado ",
                    mensaje: `<b>Total facturado: </b> ${cant_fact} <br> <b> Administrados:</b> ${cant_adm} <br><b>Total devueltos: </b>   ${cant_dev} <br><b>Saldo: </b> ${saldo}`,
                  },
                  _this.validar_cantidad
                );
              } else {
                const obj = {
                  ..._this.actual,
                  cant_dev,
                };

                if (_this.actual.modificar) {
                  let index = _this.tabla_medicamentos.findIndex(
                    (el) => el.item == _this.actual.item
                  );
                  _this.tabla_medicamentos[index] = obj;
                } else {
                  _this.tabla_medicamentos.push(obj);
                }

                _this.reset_actual();
                _this.validar_item();
              }
            }
        },
        guardar_devolucion() {
            const _this = this;
            let ano = this.form.ano.toString().padStart(4, '0')
            let mes = this.form.mes.toString().padStart(2, '0')
            let dia = this.form.dia.toString().padStart(2, '0')

            let hora = this.form.hora.toString().padStart(2, '0')
            let minutos = this.form.minutos.toString().padStart(2, '0')


            var datos_envio = {
                datosh: datosEnvio() + localStorage.Usuario + '|',
                llave_hc: $_REG_HC.llave_hc,
                fecha: ano + mes + dia,
                hora: hora + minutos,
                medico: $_REG_PROF.IDENTIFICACION,
                // medico: this.info_historia.med,
                nro_ped: this.form.numero_ctl,
                novedad: this.novedad,
            }

            const datos_tabla = this.tabla_medicamentos
            datos_tabla.forEach((el, idx) => {
                let index = (idx + 1).toString().padStart(3, '0')
                let label = `LIN-${index}`
                datos_envio[label] = el.codigo + '|' + el.cantidad + '|'
            })

            console.log('Guardado', datos_envio)
            loader('show')
            postData(datos_envio,
                get_url("APP/HICLIN/HC527-1.DLL"))
                .then(data => {
                    console.log("Res guardado", data);
                    if (_this.novedad == "7") _this.grabar_consecutivo(data);
                    else {
                      loader("hide");
                      _this.on_validar_imprimir();
                    }
                })
                .catch(err => {
                    console.error('Ha ocurrido un error:', err)
                    loader('hide')
                    CON851('99', 'Ha ocurrido un error durante el guardado.', null, 'error', 'error');
                    _this.validar_item()
                })
        },
        grabar_consecutivo(data) {
            const _this = this;
            postData({ datosh: datosEnvio() + data + '|' },
                get_url("APP/CONTAB/CON007X.DLL"))
                .then(data => {
                    loader('hide')
                    console.log('Res consecutivo', data)
                    _this.on_validar_imprimir();
                })
                .catch(err => {
                    console.log(err)
                    loader('hide')
                    console.error('Ha ocurrido un error:', err)
                    CON851('99', 'Ha ocurrido un error durante el guardado.', null, 'error', 'error');
                    _this.validar_item()
                })
        },
        on_validar_imprimir(){
            const _this = this;
            CON851P(
              "00",
              () => {
                _this.reset_general();
                _regresar_menuhis();
              },
              () => {
                _this.tabla_medicamentos = _this.tabla_medicamentos.filter(
                  (a) => {
                    let cantidad = parseFloat(a.cantidad) || 0;
                    if (cantidad != 0) return a;
                  }
                );
                  
                if (_this.tabla_medicamentos.length > 0) {
                  _this.imprimir();
                } else {
                  _this.reset_general();
                  _regresar_menuhis();
                }
              }
            );
        },
        imprimir() {
            _impresion2({
                tipo: 'pdf',
                archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
                content: this.format_impresion(),
            }).then(data => {
                this.reset_general()
                _regresar_menuhis()
            })
        },
        format_impresion() {
            let { ano, mes, dia, hora, minutos } = this.form;
            let fecha = _editarFecha(
              ano + mes.toString().padStart(2, "0") + dia.toString().padStart()
            );
            let nit_paciente = new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD) || $_REG_PACI.COD;
            let nro_fact_hc = this.info_historia.cierre.nro_fact

            let detalle = this.tabla_medicamentos
            let detalle_print = []
            detalle_print.push([
                { text: 'CODIGO', style: 'center8BoldT' },
                { text: 'DESCRIPCION', style: 'center8BoldT' },
                { text: 'CANTIDAD', style: 'center8BoldT' }
            ])

            detalle.forEach(el => {
                detalle_print.push([
                    { text: el.codigo, style: 'left8' },
                    { text: el.descripcion, style: 'left8' },
                    { text: el.cantidad, style: 'center8' },
                ])
            })

            var aux = null
            switch ($_REG_PROF.ATIENDE_PROF.trim()) {
                case "1": aux = "MEDICO ESPECIALISTA      "; break;
                case "2": aux = "MEDICO GENERAL           "; break;
                case "3": aux = "ENFERMERO(A) JEFE        "; break;
                case "4": aux = "AUXILIAR ENFERMERIA      "; break;
                case "5": aux = "TERAPEUTAS Y OTROS       "; break;
                case "6": aux = "ENFERMERA JEFE P Y P     "; break;
                case "7": aux = "PSICOLOGIA               "; break;
                case "8": aux = "NUTRICIONISTA            "; break;
                case "9": aux = "NO APLICA                "; break;
                case "A": aux = "ODONTOLOGO               "; break;
                case "B": aux = "AUDITOR MEDICO           "; break;
                case "H": aux = "HIGIENE ORAL             "; break;
                case "I": aux = "INSTRUMENTADOR(A)        "; break;
                case "O": aux = "OPTOMETRA                "; break;
                case "T": aux = "TRABAJO SOCIAL           "; break;
                default: aux = '  '; break;
            }

            return {
                pageMargins: [35, 147, 35, 60],
                images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT) },
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
                                        width: '20%'
                                    },
                                    {
                                        style: 'center10Bold',
                                        text: [
                                            { text: $_USUA_GLOBAL[0].NOMBRE.trim() },
                                            { text: $_USUA_GLOBAL[0].NIT + '\n' },
                                            { text: 'DEVOLUCIÓN DE FARMACIA\n' }
                                        ],
                                        width: '50%'
                                    },
                                    {
                                        style: 'right10Bold',
                                        text: [
                                            { text: '' + 'PAG: ' + currentPage + ' de ' + pageCount + '\n\n' },
                                        ],
                                        width: '15%'
                                    }
                                ],
                            },
                            {
                                marginLeft: 7,
                                marginTop: 10,
                                stack: [
                                    {
                                        columns: [
                                            { text: 'FECHA:', style: 'left8Bold', width: '15%' },
                                            { text: `${fecha} - ${hora}:${minutos}`, style: 'left8', width: '43%' },
                                            { text: 'IDENTIFICACIÓN:', style: 'left8Bold', width: '15%' },
                                            { text: $_REG_PACI['TIPO-ID'] + ' ' + nit_paciente, style: 'left8', width: '27%' },
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'PACIENTE:', style: 'left8Bold', width: '15%' },
                                            { text: $_REG_PACI.DESCRIP.replace(/\s+/g, ' '), style: 'left8', width: '43%' },
                                            { text: 'EDAD:', style: 'left8Bold', width: '6%' },
                                            { text: $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad, style: 'left8', width: '9%' },
                                            { text: 'SEXO:', style: 'left8Bold', width: '7%' },
                                            { text: $_REG_PACI.SEXO == 'F' ? 'Femenino' : 'Masculino', style: 'left8', width: '8%' },
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'CIUDAD:', style: 'left8Bold', width: '15%' },
                                            { text: $_REG_PACI['DESCRIP-CIUDAD'].trim(), style: 'left8', width: '43%' },
                                            { text: 'TELEFONO:', style: 'left8Bold', width: '15%' },
                                            { text: $_REG_PACI.TELEFONO.trim(), style: 'left8', width: '27%' },
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'ENTIDAD:', style: 'left8Bold', width: '15%' },
                                            { text: $_REG_PACI['DESCRIP-NIT-FACT'].trim(), style: 'left8', width: '43%' },
                                            { text: 'FACTURA:', style: 'left8Bold', width: '15%' },
                                            { text: nro_fact_hc, style: 'left8', width: '27%' }
                                        ]
                                    },
                                    {
                                        marginTop: 2,
                                        columns: [
                                            { text: 'ACOMPAÑANTE:', style: 'left8Bold', width: '15%' },
                                            { text: $_REG_PACI.ACOMPA.trim(), style: 'left8', width: '43%' },
                                            { text: 'FOLIO:', style: 'left8Bold', width: '15%' },
                                            { text: $_REG_HC.nro_folio_hc.trim(), style: 'left8', width: '27%' },
                                        ]
                                    },
                                ],
                            },
                            {
                                canvas: [
                                    {
                                        type: 'rect',
                                        x: 0,
                                        y: -57,
                                        w: width_page,
                                        h: 59,
                                        r: 0,
                                        lineWidth: 1,
                                    },
                                ],
                            },
                        ]
                    }
                },
                content: [
                    {
                        columns: [
                            { text: 'Formulación de medicamentos'.toUpperCase(), style: 'left10Bold', width: '50%' },
                        ]
                    },
                    {
                        table: {
                            widths: ['auto', '*', 'auto'],
                            headerRows: 0,
                            body: detalle_print
                        },
                    },
                    {
                        margin: [0, 40, 0, 0],
                        stack: [
                            {
                                canvas: [
                                    {
                                        type: 'rect',
                                        x: 0,
                                        y: 0,
                                        w: 520,
                                        h: 0,
                                        r: 0,
                                        lineWidth: 1,
                                        lineColor: 'black',
                                    }
                                ]
                            },
                            {
                                margin: [0, 10, 0, 0],
                                style: 'left8',
                                stack: [$_REG_PROF.NOMBRE, "Especialidad: " + aux],
                            }
                        ]

                    }
                ],
                styles: estilosImpresion_impHc()
            }
        },
        // consultar_tercero(oper) {
        //     let retorno = false,
        //       datos = {
        //         datosh: datosEnvio(),
        //         paso: 1,
        //         codigo: localStorage.Sesion.substr(5, 10),
        //       };
        //     postData(datos, get_url("APP/SALUD/SER819.DLL")).then((data) => {
        //       this.profesional = data;
        //       this.form.descrip_prof = data.NOMBRE;
        //     });
        // },
        reset_actual() {
            this.actual = {
                item: this.tabla_medicamentos.length + 1,
                codigo: null,
                descripcion: null,
                cantidad: null,
                indicaciones: null,
                modificar: false
            }
        },
        reset_general() {
            this.tabla_medicamentos = []
            this.listado_medicamentos = []
            this.actual = {
                item: null,
                codigo: null,
                descripcion: null,
                cantidad: null,
                indicaciones: null,
                modificar: false
            }
            this.form = {
                cod_prof: null,
                descrip_prof: null,
                ano: null,
                mes: null,
                dia: null,
                hora: null,
                minutos: null,
                numero_ctl: null
            }
            this.info_historia = null
            this.index_tabla = 0;
            this.listado_devoluciones = [];
            this.segundaTabla = [];
        },
        _ventanaMedicamentos() {
            var _this = this;
            _ventanaDatos({
              titulo: "VENTANA DE CONSULTA DE FARMACOS",
              columnas: [
                "cod_formu",
                "Nombre",
                "Formulado",
                "Pedido",
                "Adm",
                "Facturado",
                "Devol_Enfer",
                "Por_devolver",
              ],
              ancho: "1200px",
              data: _this.listado_medicamentos,
              callback_esc: function () {
                document.getElementById("cod_medicamento").focus();
              },
              callback: function (data) {
                _this.actual.codigo = data.cod_formu;
                _enterInput("#cod_medicamento");
              },
            });
        },
        _initDevolucionAnt() {
            if (this.listado_devoluciones.length > 0) {
                this.modal_f9 = true;
                this._ventanaDevolucionAnt(0);
                this.segundaTabla = this.listado_devoluciones[0].tabla;
            } else {
                CON851(
                  "99",
                  "No hay devoluciones anteriores.",
                  null,
                  "error",
                  "error"
                );
                this.validar_codigo();
                document.getElementById("cod_medicamento").focus();
            }
        },
        _ventanaDevolucionAnt(orden) {
            const _this = this;
            validarTabla(
              {
                tabla: "#tablaIzq_hc527",
                orden: orden,
                cambioFoco: (a) => {
                  _this.index_tabla = a;
                  _this.segundaTabla = _this.listado_devoluciones[a].tabla;
                },
                Esc: () => {
                  _this.modal_f9 = false;
                  _this.validar_codigo();
                  document.getElementById("cod_medicamento").focus();
                },
              },
              (data) => {
                let Usuario = localStorage.Usuario;
                _this.modal_f9 = false;
                
                if (Usuario == "GEBC" || Usuario == "AMB1") {
                  _this._bajarDatos(data);
                }
                
                _this.reset_actual()
                _this.validar_item()
              },
              () => {
                let length = _this.listado_devoluciones.length - 1;
                _this._ventanaDevolucionAnt(length);
              },
              (e) => _this._ventanaDevolucionAnt(0)
            );
        },
        _bajarDatos() {
            let _this = this;
            _this.novedad = "8";

            let registro = this.listado_devoluciones[this.index_tabla];
            _this.form.numero_ctl = registro.nro_ped;

            _this.form.ano = registro.fecha_ped.substr(0, 4);
            _this.form.mes = registro.fecha_ped.substr(4, 2);
            _this.form.dia = registro.fecha_ped.substr(6, 2);

            _this.form.hora = registro.hora_ped.substr(0, 2);
            _this.form.minutos = registro.hora_ped.substr(2, 2);

            _this.tabla_medicamentos = [];
            registro.tabla.forEach((a, b) => {
                let item = {
                  item: parseFloat(b + 1),
                  codigo: a.cod_ped,
                  descripcion: a.nombre_ped,
                  cantidad: a.cant_ped,
                  indicaciones: "",
                  modificar: false,
                };

                _this.tabla_medicamentos.push(item);
            });
        },
        async get_datos() {
            const _this = this;
            loader('show');

            await postData({ datosh: `${datosEnvio()}HD|` },
                get_url("APP/CONTAB/CON007.DLL"))
                .then(data => {
                    let pedido = data.split('|')[1]
                    _this.form.numero_ctl = parseInt(pedido).toString().padStart(6, '0')
                })
                .catch(err => {
                    console.log('Error', err)
                    loader('hide')
                    _regresar_menuhis();
                })

            await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + '1' }, get_url("app/HICLIN/HC_PRC.DLL"))
                .then(data => {
                    _this.info_historia = data.HCPAC
                }).catch(err => {
                    console.log(err, 'error')
                    loader('hide')
                    _regresar_menuhis();
                })
            
            let Usuario = localStorage.Usuario,
              datos = {
                datosh: datosEnvio() + Usuario + "|",
                llave_hc: $_REG_HC.llave_hc,
                paso: 1,
              };

            await postData(datos, get_url("app/HICLIN/HC527.DLL"))
              .then((data) => {
                loader("hide");
                data.REG_DEVOLUCION.forEach((item) => {
                  if (item.cod_formu != "") {
                    let new_data = {
                      Nombre: item.nombre_formu,
                      Formulado: item.cant_formu,
                      Pedido: item.cant_ped,
                      Adm: item.cant_adm,
                      Facturado: item.cant_fact,
                      Devol_Enfer: item.cant_devo,
                      Por_devolver: item.cant_por_devolver,
                    };

                    item.nombre_formu = item.nombre_formu.trim();
                    item.cod_formu = item.cod_formu.trim();
                    item.cant_formu = item.cant_formu.trim();

                    _this.listado_medicamentos.push(
                      Object.assign(item, new_data)
                    );
                    // _this.listado_medicamentos.push(item);
                  }
                });
              })
              .catch((err) => {
                console.log(err, "error");
                loader("hide");
                _regresar_menuhis();
              });

            await postData(datos, get_url("app/HICLIN/HC527-2.DLL"))
            .then((result) => {
                loader("hide");
                result.REG_DEVOLUCION.forEach((item) => {
                if (item.item != "") {
                    let tabla = item.tabla.filter((a) => a.cod_ped != "");
                    item.tabla = tabla || [];
                    _this.listado_devoluciones.push(item);
                }
                });

                loader("hide");
            })
            .catch((err) => {
                console.log(err, "error");
                loader("hide");
                _regresar_menuhis();
            });

        }
    }
})