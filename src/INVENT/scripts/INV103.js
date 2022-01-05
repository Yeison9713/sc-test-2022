// 9/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
    el: "#INV103",
    data: {
        INV103: [],
        form: {
            novedad_INV103: "",
            tipo_INV103: "",
            grupo_INV103: "",
            grupod_INV103: "",
            codigo_INV103: "",
            clase_INV103: "",
            clased_INV103: "",
            descripcion_INV103: "",
            uso_INV103: "",
            usod_INV103: "",
            // web_INV103: "",
            // ingactivo_INV103: "",
            // ingactivod_INV103: "",
            // acomp_INV103: "",
            // proveedor_INV103: "",
            // proveedorp_INV103: "",
            codbarras_INV103: "",
            otros_INV103: "",
            otros2_INV103: "",
            otros3_INV103: "",
            saldomed_INV103: " ",
            saldomedd_INV103: "",
            almalterno_INV103: "",
            almalternod_INV103: "",
            estado_INV103: "",
            marca_INV103: "",
            marcad_INV103: "",
            referencia_INV103: "",
            iva_INV103: "",
            tabivap_INV103: "",
            politica_INV103: "",
            politicad_INV103: "",
            // merma_INV103: "",
            // color_INV103: "",
            totaliva_INV103: "",
            ultactu_INV103: "",
            unimedida_INV103: "",
            ccostos_INV103: "",
            ccostosd_INV103: "",
            ubicart_INV103: "",
            contable_INV103: "",
            contablep_INV103: "",
            presentacion_INV103: "",
            unidadme_INV103: "",
            atc_INV103: "",
            descripatc_INV103: "",
            concentrado_INV103: "",
            excluir_INV103: "",
            regulado_INV103: "",
            sisdis_INV103: "",
            riesgo_INV103: "",
            homologo_INV103: "",
            codhomologo_INV103: "",
            codhomologod_INV103: "",
            convers_INV103: "",
            elab2_INV103: "",
            elabd2_INV103: "",
            mod2_INV103: "",
            modd2_INV103: "",
        },
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        loader("show");
        nombreOpcion("9,1,3 - Maestro de articulos");
        $_this = this;
        $_this.INV103.SWCLAVE = $_USUA_GLOBAL[0].CLAVE
        $_this.INV103.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
        $_this.INV103.ANO_LNK = $_this.INV103.FECHA_LNK.substring(0, 2);
        $_this.INV103.MES_LNK = $_this.INV103.FECHA_LNK.substring(2, 4);
        $_this.INV103.DIA_LNK = $_this.INV103.FECHA_LNK.substring(4, 6);
        $_this.INV103.LLAVEBARRASAW = ''
        obtenerDatosCompletos({
            nombreFd: 'ARTICULOS'
        }, function (data) {
            $_this.INV103.ARTICULOS = data.ARTICULOS;
            $_this.INV103.ARTICULOS.pop();
            obtenerDatosCompletos({
                nombreFd: 'GRUPOS'
            }, function (data) {
                $_this.INV103.GRUPOS = data.GRUPOS;
                $_this.INV103.GRUPOS.pop();
                loader("hide");
                $_this._buscarrestriccion_INV103()
                obtenerDatosCompletos({
                    nombreFd: 'USO'
                }, function (data) {
                    $_this.INV103.USO = data.USO;
                    $_this.INV103.USO.pop();
                    obtenerDatosCompletos({
                        nombreFd: 'LOCALIZACION'
                    }, function (data) {
                        $_this.INV103.ALMACEN = data.LOCALIZACION;
                        $_this.INV103.ALMACEN.pop();
                        obtenerDatosCompletos({
                            nombreFd: 'FARMACOS'
                        }, function (data) {
                            $_this.INV103.FARMACOS = data.FARMACOS;
                            $_this.INV103.FARMACOS.pop();
                            console.log(data, 'FARMACOS')
                            obtenerDatosCompletos({
                                nombreFd: 'MEDATC'
                            }, function (data) {
                                $_this.INV103.MEDATC = data.MEDATC;
                                $_this.INV103.MEDATC.pop();
                                console.log(data, 'MEDICAMENTO')
                                obtenerDatosCompletos({
                                    nombreFd: 'COSTOS'
                                }, function (data) {
                                    $_this.INV103.COSTO = data.COSTO;
                                    $_this.INV103.COSTO.pop();
                                    obtenerDatosCompletos({
                                        nombreFd: 'POLIT'
                                    }, function (data) {
                                        $_this.INV103.POLITICA = data.POLIT;
                                        $_this.INV103.POLITICA.pop();

                                        obtenerDatosCompletos({
                                            nombreFd: 'CTA-MAYOR'
                                        }, function (data) {
                                            $_this.INV103.CTAMAYOR = data.MAESTROS;
                                            $_this.INV103.CTAMAYOR.pop();
                                            $_this.INV103.FILTROMAE = $_this.INV103.CTAMAYOR.filter(x => x.TIPO_MAE.trim() == '4')


                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    },
    methods: {
        _buscarrestriccion_INV103() {
            $_OPSEGU = "I13";
            postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${$_OPSEGU}|` },
                get_url("APP/CONTAB/CON904.DLL"))
                .then(data => {
                    CON850(this._evaluarNovedad_INV103);
                })
                .catch(err => {
                    console.error(err);
                    CON851('15', '15', null, 'error', 'error');
                    _toogleNav();
                });
        },
        _evaluarNovedad_INV103(novedad) {
            $('#tab1').click();
            this.form.novedad_INV103 = novedad.id;
            if (this.form.novedad_INV103 == "F") {
                _toggleNav();
            } else {
                let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
                this.form.novedad_INV103 = this.form.novedad_INV103 + " - " + novedad[this.form.novedad_INV103];
                switch (this.form.novedad_INV103.substring(0, 1)) {
                    case '7':
                        this._ventanabarras_INV103()
                        break;
                    case '8':
                        if (this.INV103.SWCLAVE == '0') {
                            this._ventanaclave_INV103()
                        } else {
                            this._ventanabarras_INV103()
                        }
                        break;
                    case '9':
                        if (this.INV103.SWCLAVE == '0') {
                            this._ventanaclave_INV103()
                        } else {
                            this._ventanabarras_INV103()
                        }
                        break;
                    default:
                        let Window = BrowserWindow.getAllWindows();
                        if (Window.length > 1) {
                            _cerrarSegundaVentana();
                        } else {
                            _toggleNav()
                        };
                        break;
                }
            }
        },
        _ventanabarras_INV103() {
            if ($_USUA_GLOBAL[0].BARRAS == "S") {
                this._aceptarlectordebarras_INV103();
            } else {
                this._mostrartipo_INV103()
            }
        },
        _aceptarlectordebarras() {
            fuente = '<div class="col-md-12" id="CODIGOBARRAS_103"> ' +
                '<input id="codigobarras_103" type="text" class="form-control input-md" data-orden="1" maxlength="15"> ' +
                '</div>';
            _ventana({
                source: fuente,
                title: 'CODIGO DE BARRAS',
                size: 'small',
                espace: true,
                focus: '#codigobarras_103',
                form: '#CODIGOBARRAS_103',
                order: '1',
                global1: this.INV103.LLAVEBARRASAW,
                inputglobal1: '#codigobarras_103',
            }, this._leerllavebarras_INV103, this._datotipo_INV103);
        },
        _leerllavebarras() {
            if ((parseInt(this.INV103.LLAVEBARRASAW) == 0) || (this.INV103.LLAVEBARRASAW.trim() == "")) {
                this._mostrartipo_INV103()
            } else {
                /////////PENDIENTE CONSULTA DE VENTANA
            }
        },

        _mostrartipo_INV103() {
            var tipo = [
                { COD: "0", DESCRIP: "MERCANCIA PARA LA VENTA" },
                { COD: "1", DESCRIP: "BIENES DE CONSUMO" },
                { COD: "2", DESCRIP: "BIENES DEVOLUTIVAS" },
                { COD: "3", DESCRIP: "BIENES INMUEBLES" },
                { COD: "4", DESCRIP: "MENOS CUANTIA" },
            ];
            POPUP(
                {
                    array: tipo,
                    titulo: "Tipo de articulo",
                    indices: [
                        {
                            id: "COD",
                            label: "DESCRIP",
                        },
                    ],
                    seleccion: this.form.tipo_INV103.substring(0, 1),
                    callback_f: () => {
                        this._buscarrestriccion_INV103();
                    },
                    teclaAlterna: true
                },
                tipo => {
                    this.form.tipo_INV103 = tipo.COD + " - " + tipo.DESCRIP;
                    this.INV103.FILTROGRUPO = this.INV103.GRUPOS.filter(clase => clase.TIPO == this.form.tipo_INV103.substring(0, 1));
                    this._evaluargrupo_INV103()
                },
            );
        },
        _evaluargrupo_INV103() {
            _FloatText({ estado: 'off' })
            validarInputs({
                form: '#GRUPO_INV103',
                orden: "1"
            }, () => {
                setTimeout(this._mostrartipo_INV103(), 300)
            },
                () => {
                    this.form.grupo_INV103 = this.form.grupo_INV103.toUpperCase();
                    this.INV103.LLAVEGRUPOW = this.form.tipo_INV103.substring(0, 1) + this.form.grupo_INV103;
                    const res = this.INV103.GRUPOS.find(e => e.GRUPO == this.form.grupo_INV103);
                    if (res == undefined) {
                        if (this.form.novedad_INV103.substring(0, 1) == '7') {
                            CON851('01', '01', this._evaluargrupo_INV103(), 'error', 'error');
                        } else {
                            this.form.grupod_INV103 = 'GRUPO NO EXISTE!'
                            this._validaciongrupo_INV103()
                        }
                    } else {
                        this.form.grupod_INV103 = res.DESCRIP;
                        this.INV103.FILTROARTICULO = this.INV103.ARTICULOS.filter(clase => clase.GRUPO_ART == this.form.grupo_INV103);
                        this._validaciongrupo_INV103()
                    }
                }
            )
        },
        _validaciongrupo_INV103() {
            if (this.form.novedad_INV103.substring(0, 1) == '7' && $_USUA_GLOBAL[0].NIT == 830061678 && $_LLAVEBARRASW.trim() != "") {
                this._evaluarnumero_INV103();
            } else {
                this._evaluarnumero_INV103();
            }
        },
        _evaluarnumero_INV103() {
            if (this.form.novedad_INV103.substring(0, 1) == '9') _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F9 para borrar segmento' }] })
            validarInputs({
                form: '#NUMERO_INV103',
                orden: "1",
                event_f9: () => {
                    if (this.form.novedad_INV103.substring(0, 1) == '9') this._ventanaborrarsegmento()
                }
            }, this._evaluargrupo_INV103,
                () => {
                    this.form.codigo_INV103 = this.form.codigo_INV103.toUpperCase();
                    this.INV103.CLASEARTICULO = this.INV103.USO.filter(x => x.TIPO == '1');
                    this.INV103.LLAVENROART = this.INV103.LLAVEGRUPOW + this.form.codigo_INV103.padEnd(13, ' ')
                    if (this.form.novedad_INV103.substring(0, 1) == '7') {
                        this._evaluarclase_INV103()
                    } else {
                        this._buscarclase_INV103();
                    }
                }
            )
        },
        _buscarclase_INV103() {
            if ($_this.form.clase_INV103.trim() == '') {
                postData({ datosh: datosEnvio() + '1|' + this.INV103.LLAVENROART + '|' }, get_url("APP/INVENT/INV103.DLL"))
                    .then(data => {
                        this.form.clase_INV103 = data.trim()
                        this._evaluarclase_INV103()
                    })
                    .catch(err => {
                        console.error(err)
                        this._evaluarnumero_INV103()
                    });

            } else {
                this._evaluarclase_INV103()
            }
        },
        _evaluarclase_INV103() {
            _FloatText({ estado: 'off' })
            validarInputs({
                form: '#CLASE_INV103',
                orden: "1"
            }, this._evaluarnumero_INV103,
                () => {
                    if (this.form.clase_INV103.trim() == '' && this.form.codigo_INV103.trim() == '') {
                        CON851('02', '02', null, 'error', 'error');
                        this._evaluarnumero_INV103();
                    } else {
                        if (this.form.clase_INV103.trim() == '') {
                            if ($_USUA_GLOBAL[0].NIT == 892000264 && this.form.tipo_INV103.slice(0, 1) == "0") {
                                CON851("02", "02", null, "error", "");
                                this._evaluarclase_INV103()
                            } else this._evaluararticulo_INV103()
                        } else {
                            const res = this.INV103.CLASEARTICULO.find(e => e.COD == this.form.clase_INV103);
                            if (res == undefined) {
                                CON851('01', '01', null, 'error', 'error');
                                if (this.form.novedad_INV103.substring(0, 1) == '7') {
                                    this._evaluarclase_INV103();
                                }
                                else {
                                    this._evaluararticulo_INV103()
                                }
                            } else {
                                this.form.clased_INV103 = res.DESCRIP;
                                this._evaluararticulo_INV103()
                            }
                        }
                    }
                }
            )
        },
        _evaluararticulo_INV103() {
            postData({ datosh: datosEnvio() + this.INV103.LLAVENROART + this.form.clase_INV103 + "||" }, get_url("APP/INVENT/INV803-01.DLL"))
                .then(data => {
                    this.INV103.FACTURACION = data.ARTICULOS[0];
                    if (this.form.novedad_INV103.substring(0, 1) == '7') {
                        CON851('00', '00', null, 'error', 'error');
                        this._evaluarnumero_INV103()
                    } else if (this.form.novedad_INV103.substring(0, 1) == '8') {
                        this._mostrardatos_INV103()
                        setTimeout(this._evaluardescripcionart_INV103)

                    } else {
                        this._mostrardatos_INV103()
                        setTimeout(CON851P('54', this._evaluargrupo_INV103, this._grabarsalud_INV103), 300)

                    }
                })
                .catch(error => {
                    console.error(error)
                    if (error.MENSAJE == "01" && this.form.novedad_INV103.substring(0, 1) == '7') {
                        this._nuevoregistro_INV103()
                    } else if (error.MENSAJE == "01" && this.form.novedad_INV103.substring(0, 1) == '8') {
                        this._evaluarnumero_INV103()
                    } else if (error.MENSAJE == "01" && this.form.novedad_INV103.substring(0, 1) == '9') {
                        this._evaluarnumero_INV103()
                    } else {
                        this._evaluarnumero_INV103()
                    }
                });
        },
        _nuevoregistro_INV103() {
            if (this.INV103.LLAVEBARRASAW != 0 || this.INV103.LLAVEBARRASAW.toString().trim() == '') {
                this.INV103.CODBARRASW = this.INV103.LLAVEBARRASAW
            }
            this._evaluardescripcionart_INV103()
        },
        _evaluardescripcionart_INV103() {
            validarInputs({
                form: '#DESCRIPCION_INV103',
                orden: "1"
            }, this._evaluarnumero_INV103,
                () => {
                    this.form.descripcion_INV103 = this.form.descripcion_INV103.toUpperCase();
                    if (this.form.descripcion_INV103.trim() == '') {
                        CON851('03', '03', this._evaluardescripcionart_INV103(), 'error', 'error');
                    } else {
                        if ($_USUA_GLOBAL[0].BARRAS == 'S') {
                            this._evaluardatobarras_INV103()
                        } else {
                            if ($_USUA_GLOBAL[0].NIT == 800037021 && this.form.tipo_INV103.substring(0, 1) == 2) {
                                $_USUA_GLOBAL[0].BARRAS = 'S'
                                this._evaluardatobarras_INV103()
                            } else {
                                this.INV103.USOARTICULO = this.INV103.USO.filter(x => x.TIPO == '2');
                                this._evaluaruso_INV103()
                            }
                        }
                    }
                }
            )
        },
        _evaluardatobarras_INV103() {
            validarInputs({
                form: '#CODBARRAS_INV103',
                orden: "1"
            }, this._evaluardescripcionart_INV103,
                () => {
                    this.form.codbarras_INV103
                }
            )
        },
        ///////////ANTES DE CODIGO BARRAS/////////
        _evaluaruso_INV103() {
            validarInputs({
                form: '#USO_INV103',
                orden: "1"
            }, this._evaluardescripcionart_INV103,
                () => {
                    this.form.uso_INV103 = this.form.uso_INV103.toUpperCase();
                    if (this.form.uso_INV103.trim() == '') {
                        this.form.usod_INV103 = ''
                        this._evaluarotros_INV103('1')
                    } else {
                        const res = this.INV103.USOARTICULOfind(e => e.COD == this.form.uso_INV103);
                        if (res == undefined) {
                            CON851('01', '01', this._evaluaruso_INV103(), 'error', 'error');
                        } else {
                            this.form.usod_INV103 = res.DESCRIP;
                            this._evaluarotros_INV103('1')
                        }
                    }
                }
            )
        },
        _evaluarotros_INV103(orden) {
            validarInputs({
                form: '#OTROS_INV103',
                orden: orden
            }, this._evaluaruso_INV103,
                () => {
                    this.form.otros_INV103 = this.form.otros_INV103.toUpperCase();
                    this.form.otros2_INV103 = this.form.otros2_INV103.toUpperCase();
                    if (this.INV103.LLAVEGRUPOW == '0NP' && this.form.otros_INV103.trim() == '') {
                        CON851('02', '02', this._evaluarotros_INV103('1'), 'error', 'error');
                    } else {
                        this._evaluarotros3_INV103()
                    }
                }
            )
        },
        _evaluarotros3_INV103() {
            if ($_USUA_GLOBAL[0].NIT == 830512772) {
                $('#OTROS3A_INV103').removeClass('hidden');
                validarInputs({
                    form: '#OTROS3A_INV103',
                    orden: "1"
                }, this._evaluardescripcionart_INV103,
                    () => {
                        this.form.otros3_INV103 = this.form.otros3_INV103.toUpperCase();
                        this._evaluarotro41_INV103()
                    }
                )
            } else {
                $('#OTROS3B_INV103').removeClass('hidden');
                validarInputs({
                    form: '#OTROS3B_INV103',
                    orden: "1"
                }, this._evaluardescripcionart_INV103,
                    () => {
                        this.form.otros3_INV103 = this.form.otros3_INV103.toUpperCase();
                        this._evaluarotro41_INV103()
                    }
                )
            }
        },
        _evaluarotro41_INV103() {
            validarInputs({
                form: '#OTROS41_INV103',
                orden: "1"
            }, this._evaluardescripcionart_INV103,
                () => {
                    this.form.saldomed_INV103 = this.form.saldomed_INV103.toString().toUpperCase();
                    if (this.form.saldomed_INV103.trim() == '') {
                        this._evaluaralmaceninterno_INV103()
                    } else {
                        const res = this.INV103.FARMACOS.find(e => e.COD == this.form.saldomed_INV103);
                        if (res == undefined) {
                            CON851('01', '01', this._evaluarotro41_INV103(), 'error', 'error');
                        } else {
                            this.form.saldomedd_INV103 = res.DESCRIP;
                            this._evaluaralmaceninterno_INV103()
                        }
                    }
                }
            )
        },
        _evaluaralmaceninterno_INV103() {
            if (this.form.tipo_INV103.substring(0, 1) == 2) {
                $('#OTROS42_INV103').removeClass('hidden');
                validarInputs({
                    form: '#OTROS42_INV103',
                    orden: "1"
                }, this._evaluardescripcionart_INV103,
                    () => {
                        this.form.almalterno_INV103 = this.form.almalterno_INV103.toUpperCase();
                        if (this.form.almalterno_INV103.trim() == '') {
                            this._evaluarmarca_INV103()
                        } else {
                            const res = this.INV103.ALMACEN.find(e => e.CODIGO == this.form.almalterno_INV103);
                            if (res == undefined) {
                                CON851('01', '01', this.evaluaralmaceninterno_INV103(), 'error', 'error');
                            } else {
                                this.form.almalternod_INV103 = res.DESCRIPCION;
                                this._evaluarmarca_INV103()
                            }
                        }
                    }
                )
            } else {
                $('#OTROS42A_INV103').removeClass('hidden');
                validarInputs({
                    form: '#OTROS42A_INV103',
                    orden: "1"
                }, this._evaluardescripcionart_INV103,
                    () => {
                        this.form.almalterno_INV103 = this.form.almalterno_INV103.toUpperCase();
                        this._evaluarmarca_INV103()
                    }
                )
            }
        },
        _evaluarmarca_INV103() {
            validarInputs({
                form: '#MARCA_INV103',
                orden: "1"
            }, this._evaluardescripcionart_INV103,
                () => {
                    this.form.marca_INV103 = this.form.marca_INV103.toUpperCase();
                    this.form.marcad_INV103 = ''
                    this._validarreferencia_INV103()
                }
            )
        },
        _validarreferencia_INV103() {
            if (this.form.tipo_INV103.substring(0, 1) > 0) {
              this._evaluarpresentacion_INV103();
            } else {
              if ($_USUA_GLOBAL[0].NIT == 900264583 && this.form.grupo_INV103 == "NP") {
                this._evaluarreferencia_INV103();
              } else {
                if (
                  (this.form.grupo_INV103 == "PO" ||
                    this.form.grupo_INV103 == "NP" ||
                    this.form.otros_INV103 == "PO") &&
                  this.form.otros_INV103 != "NP"
                ) {
                  if (this.form.atc_INV103.substring(0, 7) == "ATC") {
                    this._evaluarreferencia_INV103();
                  } else {
                    if (this.form.saldomed_INV103.trim() == "") {
                      this.INV103.POSORIGENW = this.form.codigo_INV103;
                    } else {
                      this.INV103.POSORIGENW = this.form.saldomed_INV103;
                    }
                    this.INV103.POSW = "1";
                    postData({ datosh: datosEnvio() + this.INV103.POSORIGENW + "|" }, get_url("APP/SALUD/SER857X.DLL"))
                      .then((data) => {
                        this.INV103.REFE2W = data;
                        this.INV103.REFE1W = "ATC";
                        this.form.atc_INV103 = this.INV103.REFE2W;
                        this._evaluarreferencia_INV103();
                      })
                      .catch((err) => {
                        this._evaluarreferencia_INV103();
                      });
                  }
                } else {
                  this._evaluarconcentrado_INV103();
                }
              }
            }
        },
        _evaluarreferencia_INV103() {
            validarInputs(
              {
                form: "#ATC_INV103",
                orden: "1",
              },
              this._evaluardescripcionart_INV103,
              () => {
                this.form.atc_INV103 = this.form.atc_INV103.toUpperCase();
                if (this.LLAVEGRUPOW == "0NP" && this.form.atc_INV103.trim() == "") {
                  CON851("02", "02", this._validarreferencia_INV103(), "error", "error");
                } else {
                  if (
                    (this.form.grupo_INV103 == "PO" ||
                      this.form.grupo_INV103 == "NP" ||
                      this.form.otros_INV103 == "PO") &&
                    this.form.otros_INV103 != "NP"
                  ) {
                    this.INV103.LLAVEATC = this.form.atc_INV103;
                    this.INV103.REFE1W = "ATC";
                    postData(
                      { datosh: datosEnvio() + "2||" + this.INV103.LLAVEATC + "|" },
                      get_url("APP/INVENT/INV103.DLL")
                    )
                      .then((data) => {
                        this.INV103.DATOSATC = data.ATC[0];
                        this.form.concentrado_INV103 = this.INV103.DATOSATC.CONCENT;
                        this.form.descripatc_INV103 = this.INV103.DATOSATC.DESCRIPATC;
                        this._evaluarpresentacion_INV103();
                      })
                      .catch((err) => {
                        console.error(err);
                        if (
                          err.MENSAJE == "79" &&
                          $_USUA_GLOBAL[0].NIT == 892000264 &&
                          this.form.grupo_INV103 == "NP" &&
                          !this.form.atc_INV103.trim()
                        ) {
                          this._evaluarconcentrado_INV103();
                        } else this._evaluarreferencia_INV103();
                      });
                  } else {
                    this._evaluarpresentacion_INV103();
                  }
                }
              }
            );
        },
        _evaluarconcentrado_INV103() {
            validarInputs({
                form: '#CONCENTRADO_INV103',
                orden: "1"
            }, this._evaluarmarca_INV103,
                () => {
                    this.form.concentrado_INV103 = this.form.concentrado_INV103.toUpperCase();
                    this._evaluarpresentacion_INV103()
                }
            )
        },
        _evaluarpresentacion_INV103() {
            if (this.form.tipo_INV103.substring(0, 1) > 0) {
                this._evaluardctogeneral_INV103('4')
            } else {
                var presentacion = [
                    { "COD": "1", "DESCRIP": "CAPSULA" },
                    { "COD": "2", "DESCRIP": "TABLETAS" },
                    { "COD": "3", "DESCRIP": "PILDORAS" },
                    { "COD": "4", "DESCRIP": "GRAGEAS" },
                    { "COD": "5", "DESCRIP": "POLVO" },
                    { "COD": "6", "DESCRIP": "SUPOSITORIOS" },
                    { "COD": "7", "DESCRIP": "OVULOS" },
                    { "COD": "8", "DESCRIP": "POMADAS" },
                    { "COD": "9", "DESCRIP": "CREMAS" },
                    { "COD": "A", "DESCRIP": "SOLUCIONES" },
                    { "COD": "B", "DESCRIP": "JARABE" },
                    { "COD": "C", "DESCRIP": "COLIRIOS" },
                    { "COD": "D", "DESCRIP": "LOCIONES" },
                    { "COD": "E", "DESCRIP": "LINIMENTOS" },
                    { "COD": "F", "DESCRIP": "ELIXIR" },
                    { "COD": "G", "DESCRIP": "ENEMAS" },
                    { "COD": "H", "DESCRIP": "INHALADOR" },
                    { "COD": "I", "DESCRIP": "AEROSOL" },
                    { "COD": "J", "DESCRIP": "UNIDAD" },
                    { "COD": "K", "DESCRIP": "AMPOLLA" },
                    { "COD": "Z", "DESCRIP": "NO APLICA" }
                ]
                POPUP(
                    {
                        array: presentacion,
                        titulo: 'TIPO DE PRESENTACIÓN',
                        indices: [
                            { id: 'COD', label: 'DESCRIP' }
                        ],
                        seleccion: this.form.presentacion_INV103.substring(0, 1),
                        callback_f: this._evaluarreferencia_INV103
                    }, presentacion => {
                        this.form.presentacion_INV103 = presentacion.COD + " - " + presentacion.DESCRIP;
                        setTimeout(this._evaluarunidadpresentacion, 300);

                    },
                );
            }
        },
        _evaluarunidadpresentacion() {
            var unidadmed = [
                { "COD": "1", "DESCRIP": "UNIDAD" },
                { "COD": "2", "DESCRIP": "KILOGRAMOS" },
                { "COD": "3", "DESCRIP": "GRAMOS" },
                { "COD": "4", "DESCRIP": "MILIGRAMOS" },
                { "COD": "5", "DESCRIP": "MICROGRAMOS" },
                { "COD": "6", "DESCRIP": "LITROS" },
                { "COD": "7", "DESCRIP": "MILILITROS" },
                { "COD": "8", "DESCRIP": "CENTIMETROS" },
                { "COD": "9", "DESCRIP": "CENTIMETROS CUBICOS" },
                { "COD": "A", "DESCRIP": "MILIEQUIVALENTES" },
                { "COD": "Z", "DESCRIP": "NO APLICA" }
            ]
            POPUP(
                {
                    array: unidadmed,
                    titulo: 'UNIDAD DE MEDIDA',
                    indices: [
                        { id: 'COD', label: 'DESCRIP' }
                    ],
                    seleccion: this.form.unidadme_INV103.substring(0, 1),
                    callback_f: () => {
                        setTimeout(this._evaluarpresentacion_INV103, 300);
                    }
                }, unidadmed => {
                    this.form.unidadme_INV103 = unidadmed.COD + " - " + unidadmed.DESCRIP;
                    setTimeout(this._evaluarestadoart_INV103, 300);
                },
            );
        },
        _evaluarestadoart_INV103() {
            var estados = [
                { "COD": "1", "DESCRIP": "BUENO" },
                { "COD": "2", "DESCRIP": "REGULAR" },
                { "COD": "3", "DESCRIP": "MALO" }
            ]
            POPUP(
                {
                    array: estados,
                    titulo: 'ESTADO',
                    indices: [
                        { id: 'COD', label: 'DESCRIP' }
                    ],
                    seleccion: this.form.estado_INV103.substring(0, 1),
                    callback_f: () => {
                        setTimeout(this._evaluarunidadpresentacion, 300);
                    }
                }, estados => {
                    this.form.estado_INV103 = estados.COD + " - " + estados.DESCRIP;
                    this._evaluardctogeneral_INV103('1')
                },
            );
        },
        _evaluardctogeneral_INV103(orden) {
            validarInputs({
                form: '#DATOSPROD_INV103',
                orden: orden
            }, () => {
                setTimeout(this._evaluarestadoart_INV103, 300);
            },
                () => {
                    this.INV103.AUTORETW = autoretartMask_INV103.value.replace(',', '');
                    this.form.unimedida_INV103 = this.form.unimedida_INV103.toUpperCase();
                    this.INV103.REPOINTERNAW = reposicionMask_INV103.value.replace(',', '');
                    this.INV103.UNIDCONVERSW = unidadconvMask_INV103.value.replace(',', '');
                    if (this.form.tipo_INV103.substring(0, 1) > 0) {
                        this._evaluartablaiva_INV103()
                    } else {
                        this._evaluarstockalmacen_INV103('1')
                    }
                }
            )
        },
        _evaluarstockalmacen_INV103(orden) {
            validarInputs({
                form: '#STOCKALMAC_INV103',
                orden: orden
            }, () => {
                this._evaluardctogeneral_INV103('1')
            },
                () => {
                    this.INV103.STOCKALMACW = stockalmacenMask_INV103.value
                    this.INV103.STOCKMINW = stockminconvMask_INV103.value
                    this.INV103.STOCKMAXW = stockmaxMask_INV103.value
                    this._evaluarpolitventa_INV103()
                }
            )
        },

        _evaluarpolitventa_INV103() {
            if (this.form.politica_INV103.trim() == '') {
                this.form.politica_INV103 = '00'
            }
            validarInputs({
                form: '#POLITICA_INV103',
                orden: "1"
            }, () => {
                this._evaluarstockalmacen_INV103('3')
            },
                () => {
                    if (this.form.politica_INV103 == '00') {
                        this.form.politicad_INV103 = ''
                        this._evaluarprecioart_INV103()
                    } else {
                        const res = this.INV103.POLITICA.find(e => e.COD == this.form.politica_INV103.padStart(2, '0'));
                        if (res == undefined) {
                            CON851('01', '01', this._evaluarpolitventa_INV103(), 'error', 'error');
                        } else {
                            this.form.politicad_INV103 = res.DESCRIP;
                            this._evaluarprecioart_INV10()
                        }
                    }
                }
            )
        },
        _evaluarprecioart_INV103() {
            validarInputs({
                form: '#PRECIOVENTA_INV103',
                orden: "1"
            }, this._evaluarpolitventa_INV103,
                () => {
                    this.INV103.VLRARTW = vlroventaMask_INV103.value.replace(/,/g, '')
                    if (vlroventaMask_INV103.value < vlrultimacompMask_INV103.value) {
                        CON851('33', '33', this._evaluarprecioart_INV103(), 'error', 'error');
                    } else {
                        this._evaluartablaiva_INV103()
                    }

                }
            )
        },
        _evaluartablaiva_INV103() {
            validarInputs({
                form: '#IVA_INV103',
                orden: "1"
            }, this._evaluarprecioart_INV103,
                () => {
                    switch (this.form.iva_INV103) {
                        case "0":
                            this.INV103.TARW = "0";
                            this.form.tabivap_INV103 = this.INV103.TARW
                            this._validacioniva_INV103()
                            break;
                        case "1":
                            this.INV103.TARW = $_USUA_GLOBAL[0].IVA1
                            this.form.tabivap_INV103 = this.INV103.TARW
                            this._validacioniva_INV103()
                            break;
                        case "2":
                            this.INV103.TARW = $_USUA_GLOBAL[0].IVA2;
                            this.form.tabivap_INV103 = this.INV103.TARW
                            this._validacioniva_INV103()
                            break;
                        case "3":
                            this.INV103.TARW = $_USUA_GLOBAL[0].IVA3;
                            this.form.tabivap_INV103 = this.INV103.TARW
                            this._validacioniva_INV103()
                            break;
                        default:
                            this._evaluartablaiva_INV103()
                            break;
                    }
                }
            )
        },
        _validacioniva_INV103() {
            if (this.form.iva_INV103 > 0 && this.INV103.TARW == 0) {
                CON851('', 'ERROR EN TARIFA DE IVA', this._evaluartablaiva_INV103(), 'error', 'error');
            } else {
                this.INV103.VALORTOTAL = vlroventaMask_INV103._unmaskedValue * (1 + ($_this.INV103.TARW / 100))
                this.form.totaliva_INV103 = parseInt(this.INV103.VALORTOTAL)
                if (($_USUA_GLOBAL[0].PUC == 4 || $_USUA_GLOBAL[0].PUC == 6) && (this.form.novedad_INV103.substring(0, 1) == '7') && (this.form.tipo_INV103.substring(0, 1) > '0')) {
                    if (this.form.tipo_INV103.substring(0, 1) > 0) this._ventananiff_INV103()
                } else {
                    this._evaluarincremento_INV103()
                }
            }
        },
        _evaluarincremento_INV103() {
            validarInputs({
                form: '#INCREMENTO_INV103',
                orden: "1"
            }, () => { this._evaluartablaiva_INV103() },
                () => {
                    this._evaluarvlrcompra_INV103()
                }
            )

        },
        _evaluarvlrcompra_INV103() {
            validarInputs({
                form: '#VLRLISTA_INV103',
                orden: "1"
            }, this._evaluarincremento_INV103,
                () => {
                    this.INV103.VLRLISTACOMPW = vlrlistaMask_INV103.value.replace(',', '');
                    if (vlrlistaMask_INV103.value == 0) {
                        this._evaluarvlrreferencia_INV103()
                    } else {
                        if (vlrlistaMask_INV103.value > vlrultimacompMask_INV103.value) {
                            this.INV103.VLRCOSTO = vlrlistaMask_INV103.value.replace(',', '');
                        } else {
                            this.INV103.VLRCOSTO = vlrultimacompMask_INV103.value.replace(',', '');
                        }
                        this._validarincremento_INV103()
                    }

                }
            )
        },
        _validarincremento_INV103() {
            if (incrementoMask_INV103.value > 0) {
                this.INV103.VLRVENTACALC = this.INV103.VLRCOSTO * (100 + parseInt(incrementoMask_INV103.value)) / 100
                if (this.INV103.VLRVENTACALC > this.INV103.VLRARTW) {
                    vlroventaMask_INV103.typedValue = this.INV103.VLRVENTACALC
                    this.form.totaliva_INV103 = this.INV103.VLRVENTACALC
                    CON851('', 'se ha actualizado el precio venta', null, 'error', 'error');
                }
                this._evaluarfechalista_INV103()
            } else {
                if (vlrlistaMask_INV103.value == 0) {
                    fechalistapreMask_INV103.typedValue = ''
                    this._evaluarvlrreferencia_INV103()
                } else {
                    this._evaluarfechalista_INV103()
                }
            }
        },
        _evaluarfechalista_INV103() {
            validarInputs(
                {
                    form: "#LISTAPREC_INV103",
                    orden: '1'
                },
                this._evaluarvlrcompra_INV103,
                () => {
                    if (fechalistapreMask_INV103.value.trim() == '') {
                        this._evaluarvlrreferencia_INV103()
                    } else {
                        if (moment(fechalistapreMask_INV103.value.replace(/-/g, '')).format('YYYYMMDD') == 'Invalid Date') {
                            this._evaluarfechalista_INV103()
                        } else {
                            this._evaluarvlrreferencia_INV103()
                        }
                    }
                }
            )
        },
        _evaluarvlrreferencia_INV103() {
            validarInputs({
                form: '#VLRREF_INV103',
                orden: "1"
            }, this._evaluarfechalista_INV103,
                () => {
                    this.INV103.VLRREFERENCIAW = vlrreferenciaMask_INV103.value.replace(',', '');
                    this.form.ultactu_INV103 = moment().format("YY-MM-DD")
                    this._evaluarcodigocont_INV103()
                }
            )
        },
        _evaluarcodigocont_INV103() {
            if (this.form.novedad_INV103.substring(0, 1) == '8') {
                this.INV103.CTAARTANTW = this.form.contable_INV103
            } else {
                if ($_USUA_GLOBAL[0].NIT == 830512772 && this.form.novedad_INV103.substring(0, 1) == '7' && this.form.grupo_INV103 == 'MQ' || this.INV103.TARW > 0) {
                    this.form.contable_INV103 = '413538000'
                }
            }
            validarInputs({
                form: '#CONTABLE_INV103',
                orden: "1"
            }, this._evaluarvlrreferencia_INV103,
                () => {
                    if (this.INV103.CTAARTANTW != this.form.contable_INV103) {
                        if (this.form.novedad_INV103.substring(0, 1) == '7') {
                            const res = this.INV103.FILTROMAE.find(e => e.LLAVE_MAE == this.form.contable_INV103 + 4);
                            if (res == undefined) {
                                CON851('01', '01', this._evaluarcodigocont_INV103(), 'error', 'error');
                            } else {
                                this.form.contablep_INV103 = res.NOMBRE_MAE;
                                this._evaluarsismed_INV103()
                            }
                        } else {
                            CON851('7L', '7L', this._evaluarcodigocont_INV103(), 'error', 'error');
                        }
                    } else {
                        const res = this.INV103.FILTROMAE.find(e => e.LLAVE_MAE == this.form.contable_INV103 + 4);
                        if (res == undefined) {
                            CON851('01', '01', this._evaluarcodigocont_INV103(), 'error', 'error');
                        } else {
                            this.form.contablep_INV103 = res.NOMBRE_MAE;
                            this._evaluarsismed_INV103()
                        }
                    }
                }
            )
        },
        _evaluarsismed_INV103() {
            if (this.form.excluir_INV103.trim() == '') this.form.excluir_INV103 = 'N'
            validarInputs({
                form: '#EXCLUIR_INV103',
                orden: "1"
            }, this._evaluarcodigocont_INV103,
                () => {
                    this.form.excluir_INV103 = this.form.excluir_INV103.toUpperCase();
                    if (this.form.excluir_INV103 == 'S' || this.form.excluir_INV103 == 'N') {
                        this._evaluarregulado_INV103();
                    } else {
                        CON851('03', '03', this._evaluarsismed_INV103(), 'error', 'error');

                    }
                }
            )
        },
        _evaluarregulado_INV103() {
            if (this.form.regulado_INV103.trim() == '') this.form.regulado_INV103 = 'N'
            validarInputs({
                form: '#REGULADO_INV103',
                orden: "1"
            }, this._evaluarsismed_INV103,
                () => {
                    this.form.regulado_INV103 = this.form.regulado_INV103.toUpperCase();
                    if (this.form.regulado_INV103 == 'S' || this.form.regulado_INV103 == 'N') {
                        this._evaluarsisdis_INV103();
                    } else {
                        CON851('03', '03', this._evaluarregulado_INV103(), 'error', 'error');
                    }
                }
            )
        },
        _evaluarsisdis_INV103() {
            if (this.form.sisdis_INV103.trim() == '') this.form.sisdis_INV103 = 'N'
            this.INV103.VALORRAZONABLE = ''
            this.INV103.VALORRESIDUAL = ''
            this.INV103.VIDAUTIL = ''
            validarInputs({
                form: '#SISDIS_INV103',
                orden: "1"
            },
                this._evaluarregulado_INV103,
                () => {
                    this.form.sisdis_INV103 = this.form.sisdis_INV103.toUpperCase();
                    if (this.form.sisdis_INV103 == 'S' || this.form.sisdis_INV103 == 'N') {
                        if (this.INV103.LLAVEGRUPOW == '0MQ') {
                            this._mostrarclaseriesgo_INV103()
                        } else {
                            this.form.riesgo_INV103 = '';
                            this._evaluarhomologo_INV103()
                        }
                    }
                    else {
                        CON851('03', '03', this._evaluarsisdis_INV103(), 'error', 'error');
                    }
                }
            )
        },
        _mostrarclaseriesgo_INV103() {
            var riesgos = [
                { "COD": "1 ", "DESCRIP": "CL 1 RIESGO BAJO" },
                { "COD": "2A", "DESCRIP": "CL 2A RIESGO MODERADO" },
                { "COD": "2B", "DESCRIP": "CL 2B RIESGO ALTO" },
                { "COD": "3 ", "DESCRIP": "CL 3 RIESGO MUY ALTO" }
            ]
            POPUP({
                array: riesgos,
                titulo: 'CLASE DE RIESGO',
                indices: [
                    { id: 'COD', label: 'DESCRIP' }
                ],
                seleccion: this.form.riesgo_INV103.substring(0, 1),
                callback_f: this._evaluarsisdis_INV103
            },
                riesgos => {
                    this.form.riesgo_INV103 = riesgos.COD + " - " + riesgos.DESCRIP;
                    if (this.INV103.LLAVEGRUPOW == '0PO' || this.INV103.LLAVEGRUPOW == '0NP') {
                        this._evaluarhomologo_INV103()
                    } else {
                        this._ubicargrabar_SALUD()
                    }
                },
            );
        },
        _evaluarhomologo_INV103() {
            if (this.INV103.LLAVEGRUPOW == '0PO' || this.INV103.LLAVEGRUPOW == '0NP' || this.INV103.LLAVEGRUPOW == '0MQ') {
                if (this.form.homologo_INV103.trim() == '') this.form.homologo_INV103 = 'N';
                validarInputs({
                    form: '#HOMOLOGO_INV103',
                    orden: "1"
                }, this._evaluarsisdis_INV103,
                    () => {
                        this.form.homologo_INV103 = this.form.homologo_INV103.toUpperCase();
                        if (this.form.homologo_INV103 == 'S' || this.form.homologo_INV103 == 'N') {
                            if (this.form.homologo_INV103 == 'N') {
                                this._ubicargrabar_SALUD()
                            } else {
                                this._evaluarcodhomologo_INV103()
                            }

                        } else {
                            this._evaluarcodhomologo_INV103()
                        }
                    }
                )
            } else {
                this._ubicargrabar_SALUD()
            }
        },
        _evaluarcodhomologo_INV103() {
            validarInputs({
                form: '#CODHOMOLOGO_INV103',
                orden: "1"
            }, this._evaluarhomologosalud,
                () => {
                    this.form.codhomologo_INV103 = this.form.codhomologo_INV103.toUpperCase();
                    this.INV103.HOMOLOGOGRUPOARTW = this.form.codhomologo_INV103.substring(0, 3);
                    this.INV103.HOMOLOGONUMEROARTW = this.form.codhomologo_INV103.substring(3, 16);
                    this.INV103.HOMOLOGOCLASEARTW = this.form.codhomologo_INV103.substring(16, 18);
                    if (this.INV103HOMOLOGOGRUPOARTW == '0NP' || this.INV103.HOMOLOGOGRUPOARTW == '0PO') {
                        const res = this.INV103.ARTICULOS.find(e => e.LLAVE_ART == this.form.codhomologo_INV103);
                        if (res == undefined) {
                            CON851('01', '01', this._evaluarcodhomologo_INV103(), 'error', 'error');
                        } else {
                            this.form.codhomologod_INV103 = res.DESCRIP_ART;
                            this._evaluarconversion_INV103()
                        }
                    } else {
                        CON851('03', '03', this._evaluarcodhomologo_INV103(), 'error', 'error');
                    }
                }
            )
        },
        _evaluarconversion_INV103() {
            var cantconver = [
                { "COD": "1", "DESCRIP": "UNITARIO" },
                { "COD": "2", "DESCRIP": "DUPLICADO" },
                { "COD": "3", "DESCRIP": "TRIPLICADO" }
            ]
            POPUP({
                array: cantconver,
                titulo: 'DATO CONVERSION',
                indices: [
                    { id: 'COD', label: 'DESCRIP' }
                ],
                seleccion: this.form.convers_INV103.substring(0, 1),
                callback_f: () => {
                    this._evaluarcodhomologo_INV103()
                }
            },
                cantconver => {
                    this.form.convers_INV103 = cantconver.COD + " - " + cantconver.DESCRIP;
                    this._ubicargrabar_SALUD()
                },
            );
        },
        _ubicargrabar_SALUD() {
            CON851P('01', this._devolverconsulta_inv103, this._grabarsalud_INV103)
        },
        _grabarsalud_INV103() {
            if (this.form.novedad_INV103.substring(0, 1) == '7') {
                this.form.elab2_INV103 = localStorage.Usuario
                this.form.elabd2_INV103 = moment().format("YYMMDD")
                this.INV103.HORAELAB = moment().format('HHmm');
                this.form.mod2_INV103 = ''
                this.form.modd2_INV103 = '000000'
                this.INV103.HORAMOD = ''
            } else {
                this.form.elab2_INV103 = this.INV103.FACTURACION.OPERELAB_ART
                this.form.elabd2_INV103 = this.INV103.FACTURACION.FECHAELAB_ART
                this.form.mod2_INV103 = localStorage.Usuario
                this.form.modd2_INV103 = moment().format("YYMMDD")
                this.INV103.HORAMOD = moment().format('HHmm');
            }

            if (this.form.novedad_INV103.substring(0, 1) == '9') {
                postData({
                    datosh: datosEnvio() + '3|||' + this.form.novedad_INV103.substring(0, 1) + "|" + this.form.tipo_INV103.substring(0, 1) + "|" + this.form.grupo_INV103 + "|" + this.form.codigo_INV103 + "|" + this.form.clase_INV103 + "|" + this.INV103.LLAVEBARRASAW + "|"
                }, get_url("APP/INVENT/INV103.DLL"))
                    .then(data => {
                        let Window = BrowserWindow.getAllWindows();
                        if (Window.length > 1) {
                            _cerrarSegundaVentana();
                        } else {
                            CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                        };
                    })
                    .catch(err => {
                        this._evaluarnumero_INV103()
                    });
            } else {
                postData({
                    datosh: datosEnvio() + '3|||' + this.form.novedad_INV103.substring(0, 1) + "|" + this.form.tipo_INV103.substring(0, 1) + "|" + this.form.grupo_INV103 + "|" + this.form.codigo_INV103 + "|" + this.form.clase_INV103 + "|" + this.INV103.LLAVEBARRASAW + "|" + this.form.descripcion_INV103 + "|" + this.form.uso_INV103 + "|" + this.form.otros_INV103 + "|" + this.form.otros2_INV103 + '|' +
                        this.form.otros3_INV103 + "|" + this.form.saldomed_INV103.padEnd(12, ' ') + "|" + this.form.almalterno_INV103.padEnd(19, ' ') + "|" + this.form.marca_INV103 + "|" + this.form.marcad_INV103 + "|" + this.form.atc_INV103 + "|" + this.form.presentacion_INV103.substring(0, 1) + "|" + this.form.unidadme_INV103.substring(0, 1) + "|" + this.form.estado_INV103.substring(0, 1) + "|" + dctogralvtaMask_INV103.value.padStart(5, 0) + "|" +
                        this.INV103.AUTORETW.padStart(7, '0') + "|" + paquetesMask_INV103.value.padStart(2, 0) + "|" + this.form.unimedida_INV103 + "|" + this.INV103.REPOINTERNAW.padStart(5, '0') + "|" + this.INV103.UNIDCONVERSW.padStart(6, '0') + "|" + this.INV103.STOCKALMACW.padStart(5, '0') + "|" + this.INV103.STOCKMINW.padStart(6, '0') + "|" + this.INV103.STOCKMAXW.padStart(6, '0') + "|" + this.form.politica_INV103 + "|" + this.INV103.VLRARTW.padStart(15, '0') + "|" + this.form.iva_INV103 + "|" +
                        incrementoMask_INV103.value.padStart(5, 0) + "|" + this.INV103.VLRLISTACOMPW.padStart(15, '0') + "|" + fechalistapreMask_INV103.value.replace(/-/g, '') + "|" + this.INV103.VLRREFERENCIAW.padStart(15, '0') + "|" + this.form.ccostos_INV103 + "|" + this.form.contable_INV103 + "|" + this.form.excluir_INV103 + "|" + this.form.regulado_INV103 + "|" + this.form.sisdis_INV103 + "|" + this.form.riesgo_INV103.substring(0, 1) + "|" +
                        this.form.homologo_INV103 + "|" + this.form.codhomologo_INV103 + "|" + this.form.convers_INV103.substring(0, 1) + "|" + this.form.elab2_INV103 + "|" + this.form.elabd2_INV103 + "|" + this.INV103.HORAELAB + "|" + this.form.mod2_INV103 + "|" + this.form.modd2_INV103 + "|" + this.INV103.HORAMOD + "|" + this.INV103.VALORRAZONABLE + "|" + this.INV103.VALORRESIDUAL + "|" + this.INV103.VIDAUTIL + "|||" + this.form.concentrado_INV103 + "|"
                }, get_url("APP/INVENT/INV103.DLL"))
                    .then(data => {
                        let Window = BrowserWindow.getAllWindows();
                        if (Window.length > 1) {
                            _cerrarSegundaVentana();
                        } else {
                            CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                        };
                    })
                    .catch(err => {
                        this._evaluarnumero_INV103()
                    });
            }

        },
        /////////OTRAS VALIDACIONES////////////////////////////////
        _ventananiff_INV103() {
            var $_this = this;
            var ventanavaloresniif = bootbox.dialog({
                size: 'medium',
                title: 'VALORES NIIF',
                message: '<div class="row"> ' +
                    '<div class="col-md-12" id="VALORNIIF_INV103"> ' +

                    '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Valor Razonable:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" > ' +
                    '<input id="valorrazonable_INV103" class="form-control input-md" data-orden="1" maxlength="14"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +
                    '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Valor Residual:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" > ' +
                    '<input id="valorresidual_INV103" class="form-control input-md" data-orden="2" maxlength="14"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +
                    '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Vida util meses:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
                    '<input id="vidautil_INV103" class="form-control input-md" data-orden="3" maxlength="13"> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanavaloresniif.off('show.bs.modal');
                            setTimeout(() => { $_this._ubicargrabar_SALUD() }, 500)

                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanavaloresniif.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluartablaiva_INV103() }, 500)
                        }
                    }
                }
            });
            ventanavaloresniif.init($(".modal-footer").hide());
            ventanavaloresniif.init(this._evaluarvlrrazonable_INV103('1'));
            ventanavaloresniif.on("shown.bs.modal", function () {
                $("#valorrazonable_INV103").focus();
            });
        },
        _evaluarvlrrazonable_INV103(orden) {
            _inputControl("disabled");
            var valorrazonableMask_INV103 = new IMask(document.getElementById('valorrazonable_INV103'), { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
            var valorresidualMask_INV103 = new IMask(document.getElementById('valorresidual_INV103'), { mask: Number, min: 0, max: 99, scale: 12, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
            var valorvidautilMask_INV103 = new IMask(document.getElementById('vidautil_INV103'), { mask: Number, min: 0, max: 9999, thousandsSeparator: ',' });
            validarInputs({
                form: '#VALORNIIF_INV103',
                orden: orden
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.INV103.VALORRAZONABLE = valorrazonableMask_INV103.value.replace(/,/g, '')
                    this.INV103.VALORRESIDUAL = valorresidualMask_INV103.value
                    this.INV103.VIDAUTIL = valorvidautilMask_INV103.value
                    $('.btn-primary').click();
                }
            )
        },
        _ventanaborrarsegmento() {
            _FloatText({ estado: 'off' })
            var $_this = this;
            var ventanasegmento = bootbox.dialog({
                size: 'medium',
                title: 'Borrar un segmento de codigos',
                message: '<div class="row"> ' +
                    '<div class="col-md-12" id="VALORSEGMENTO_INV103"> ' +

                    '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Borrar desde:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" > ' +
                    '<input id="borrarini_INV103" class="form-control input-md" data-orden="1" maxlength="14"> ' +
                    '</div> ' +
                    '</div> ' +

                    '<div class="salto-linea"></div>' +
                    '<div class="col-md-10 col-sm-6 col-xs-6"> ' +
                    '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "Borrar desde:" + '</label> ' +
                    '<div class="col-md-6 col-sm-6 col-xs-6" > ' +
                    '<input id="borrarfin_INV103" class="form-control input-md" data-orden="2" maxlength="14"> ' +
                    '</div> ' +
                    '</div> ' +

                    '</div>' +
                    '</div>',
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanasegmento.off('show.bs.modal');
                            setTimeout(() => { $_this._ubicargrabar_SALUD() }, 500)

                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            ventanasegmento.off('show.bs.modal');
                            setTimeout(() => { $_this._evaluarnumero_INV103() }, 500)
                        }
                    }
                }
            });
            ventanasegmento.init($(".modal-footer").hide());
            ventanasegmento.init(this._evaluarcodinicio_INV103('1'));
            ventanasegmento.on("shown.bs.modal", function () {
                $("#borrarini_INV103").focus();
            });

        },
        _evaluarcodinicio_INV103(orden) {
            _inputControl("disabled");
            validarInputs({
                form: '#VALORSEGMENTO_INV103',
                orden: orden
            },
                () => { $('.btn-danger').click() },
                () => {
                    this.INV103.CODINICIO = $('#borrarini_INV103').val().toUpperCase();
                    this.INV103.CODFIN = $('#borrarfin_INV103').val().toUpperCase();
                    if (this.INV103.CODFIN < this.INV103.CODINICIO) {
                        this._evaluarcodinicio_INV103('1')
                    } else {
                        postData({
                            datosh: datosEnvio() + '4|||||||||||||||||||||||||||||||||||||||||||||||||||||||' + this.INV103.CODINICIO + '|' + this.INV103.CODFIN
                        }, get_url("APP/INVENT/INV103.DLL"))
                            .then(data => {
                                console.log(data)
                                $('.btn-primary').click();
                            })
                            .catch(err => {
                                console.error(err)
                                this._evaluarcodinicio_INV103('1')
                            });

                    }
                }
            )
        },

        ////////////////////////MOSTRAR DATOWS/////////////////////////////////////////

        _mostrardatos_INV103() {
            let tipo = { '0': 'MERCANCIA PARA LA VENTA', '1': 'BIENES DE CONSUMO', '2': 'BIENES DEVOLUTIVAS', '3': 'BIENES INMUEBLES', '4': 'MENOS CUANTIA' };
            this.form.tipo_INV103 = this.INV103.FACTURACION.GRUPO_ART.substring(0, 1) + ' - ' + tipo[this.INV103.FACTURACION.GRUPO_ART.substring(0, 1)]
            this.form.grupo_INV103 = this.INV103.FACTURACION.GRUPO_ART.substring(1, 3)
            this.form.grupod_INV103 = this.INV103.FACTURACION.NOM_GRUPO
            this.form.codigo_INV103 = this.INV103.FACTURACION.NUMERO_ART
            this.form.clase_INV103 = this.INV103.FACTURACION.CLASE_ART.trim()
            this.form.clased_INV103 = this.INV103.FACTURACION.NOM_CLASE.trim()
            this.form.codbarras_INV103 = this.INV103.FACTURACION.CODBARRAS_ART.trim()
            this.form.descripcion_INV103 = this.INV103.FACTURACION.DESCRIP_ART.trim()
            this.form.marca_INV103 = this.INV103.FACTURACION.CODMARCA_ART.trim()
            this.form.marcad_INV103 = this.INV103.FACTURACION.DESCRIP_MARC.trim()
            // this.form.referencia_INV103 = this.INV103.FACTURACION.REF_ART.trim()
            this.form.politica_INV103 = this.INV103.FACTURACION.POL_ART.trim()
            this.form.politicad_INV103 = this.INV103.FACTURACION.NOM_POL
            this.form.uso_INV103 = this.INV103.FACTURACION.USO_ART
            this.form.usod_INV103 = this.INV103.FACTURACION.NOM_USO2
            this.form.otros_INV103 = this.INV103.FACTURACION.OTROS1_ART.trim()
            this.form.otros2_INV103 = this.INV103.FACTURACION.OTROS2_ART.substring(0, 43)
            this.form.otros3_INV103 = this.INV103.FACTURACION.OTROS3_ART.trim()
            this.form.saldomed_INV103 = this.INV103.FACTURACION.OTROS4A_ART.trim()
            this.form.almalterno_INV103 = this.INV103.FACTURACION.OTROS4B_ART.trim()
            this.form.contable_INV103 = this.INV103.FACTURACION.CTA_ART
            this.form.contablep_INV103 = this.INV103.FACTURACION.NOMB_MAE
            this.form.ccostos_INV103 = this.INV103.FACTURACION.COSTO_ART
            this.form.ccostosd_INV103 = this.INV103.FACTURACION.NOMB_COSTO
            if ((this.form.grupo_INV103 == "PO" || this.form.otros_INV103 == 'PO') && (this.form.otros_INV103 != 'NP')) {
                this.form.atc_INV103 = this.INV103.FACTURACION.REF_ART
                this.form.concentrado_INV103 = this.INV103.FACTURACION.CONCENTRA_ART
            } else {
                this.form.atc_INV103 = this.INV103.FACTURACION.REF_ART.trim()
                this.form.concentrado_INV103 = this.INV103.FACTURACION.CONCENTRA_ART
            }
            this.unimedida_INV103 = this.INV103.FACTURACION.UNIDAD_ART
            this.form.excluir_INV103 = this.INV103.FACTURACION.EXCSISMED_ART
            this.form.regulado_INV103 = this.INV103.FACTURACION.REGULADO_ART
            this.form.sisdis_INV103 = this.INV103.FACTURACION.SISDIS_ART
            if (this.INV103.FACTURACION.FECHAMOD_ART.trim() == '') {
                this.form.ultactu_INV103 = this.INV103.FACTURACION.FECHAELAB_ART.substring(0, 2) + '-' + this.INV103.FACTURACION.FECHAELAB_ART.substring(2, 4) + '-' + this.INV103.FACTURACION.FECHAELAB_ART.substring(4, 6)
            } else {
                this.form.ultactu_INV103 = this.INV103.FACTURACION.FECHAMOD_ART.substring(0, 2) + '-' + this.INV103.FACTURACION.FECHAMOD_ART.substring(2, 4) + '-' + this.INV103.FACTURACION.FECHAMOD_ART.substring(4, 6)
            }
            this.form.homologo_INV103 = this.INV103.FACTURACION.HOMOL_ART
            this.form.codhomologo_INV103 = this.INV103.FACTURACION.HOMOLCOD_ART
            this.form.elab2_INV103 = this.INV103.FACTURACION.OPERELAB_ART
            this.form.elabd2_INV103 = this.INV103.FACTURACION.FECHAELAB_ART.substring(0, 2) + '-' + this.INV103.FACTURACION.FECHAELAB_ART.substring(2, 4) + '-' + this.INV103.FACTURACION.FECHAELAB_ART.substring(4, 6)
            this.form.mod2_INV103 = this.INV103.FACTURACION.OPERMOD_ART
            this.form.modd2_INV103 = this.INV103.FACTURACION.FECHAMOD_ART.substring(0, 2) + '-' + this.INV103.FACTURACION.FECHAMOD_ART.substring(2, 4) + '-' + this.INV103.FACTURACION.FECHAMOD_ART.substring(4, 6)
            let estado = { '1': 'BUENO', '2': 'REGULAR', '3': 'MALO' };
            if (estado[this.INV103.FACTURACION.ESTADO_ART] == undefined) {
                this.form.estado_INV103 = ''
            } else {
                this.form.estado_INV103 = this.INV103.FACTURACION.ESTADO_ART + ' - ' + estado[this.INV103.FACTURACION.ESTADO_ART];
            }
            let presentacion = { '1': 'CAPSULA', '2': 'TABLETAS', '3': 'PILDORAS', '4': 'GRAGEAS', '5': 'POLVO', '6': 'SUPOSITORIOS', '7': 'OVULOS', '8': 'POMADAS', '9': 'CREMAS', 'A': 'SOLUCIONES', 'B': 'JARABE', 'C': 'COLIRIOS', 'D': 'LOCIONES', 'E': 'LINIMENTOS', 'F': 'ELIXIR', 'G': 'ENEMAS', 'H': 'INHALADOR', 'I': 'AEROSOL', 'J': 'UNIDAD', 'K': 'AMPOLLA', 'Z': 'NO APLICA' };
            if (presentacion[this.INV103.FACTURACION.PRESENT_ART.trim()] == undefined) {
                this.form.presentacion_INV103 = ''
            } else {
                this.form.presentacion_INV103 = this.INV103.FACTURACION.PRESENT_ART + ' - ' + presentacion[this.INV103.FACTURACION.PRESENT_ART.trim()]
            }
            let unidad = { '1': 'UNIDAD', '2': 'KILOGRAMOS', '3': 'GRAMOS', '4': 'MILIGRAMOS', '5': 'MICROGRAMOS', '6': 'LITROS', '7': 'MILILITROS', '8': 'CENTIMETROS', '9': 'CENTIMETROS CUBICOS', 'A': 'MILIEQUIVALENTE', 'Z': 'NO APLICA' };
            if (unidad[this.INV103.FACTURACION.UNIDPRES_ART.trim()] == undefined) {
                this.form.unidadme_INV103 = ''
            } else {
                this.form.unidadme_INV103 = this.INV103.FACTURACION.UNIDPRES_ART + ' - ' + unidad[this.INV103.FACTURACION.UNIDPRES_ART.trim()]
            }
            let codhomolo = { '1': 'UNITARIO', '2': 'DUPLICADO', '3': 'TRIPLICADO' };
            if (codhomolo[this.INV103.FACTURACION.RENGHOMO_ART] == undefined) {
                this.form.convers_INV103 = ''
            } else {
                this.form.convers_INV103 = this.INV103.FACTURACION.RENGHOMO_ART + ' - ' + codhomolo[this.INV103.FACTURACION.RENGHOMO_ART]
            }
            let riesgo = { '1': 'CL 1  RIESGO BAJO', '2': 'CL 2A RIESGO MODERADO', '3': 'CL 2B RIESGO ALTO', '4': 'CL 3  RIESGO MUY ALTO' };
            if (riesgo[this.INV103.FACTURACION.CLASERIESG_ART] == undefined) {
                this.form.riesgo_INV103 = ''
            } else {
                this.form.riesgo_INV103 = this.INV103.FACTURACION.CLASERIESG_ART + ' - ' + riesgo[this.INV103.FACTURACION.CLASERIESG_ART];
            }
            autoretartMask_INV103.typedValue = this.INV103.FACTURACION.AUTORET_ART
            dctogralvtaMask_INV103.typedValue = this.INV103.FACTURACION.DCTOGRAL_ART
            paquetesMask_INV103.typedValue = this.INV103.FACTURACION.PAQUET_ART
            reposicionMask_INV103.typedValue = this.INV103.FACTURACION.RESPOS_ART
            unidadconvMask_INV103.typedValue = this.INV103.FACTURACION.UNIDCONV_ART
            stockalmacenMask_INV103.typedValue = this.INV103.FACTURACION.TABLA_STOCK[0].STOCKALM
            stockminconvMask_INV103.typedValue = this.INV103.FACTURACION.TABLA_STOCK[0].STOCKMIN
            stockmaxMask_INV103.typedValue = this.INV103.FACTURACION.TABLA_STOCK[0].STOCKMAX
            vlroventaMask_INV103.typedValue = this.INV103.FACTURACION['TABLA-VTA'][0].VRVENTA1
            incrementoMask_INV103.typedValue = this.INV103.FACTURACION['TABLA-VTA'][0].PORCINCCOMP
            switch (this.INV103.FACTURACION.IVA_ART) {
                case '1':
                    this.INV103.TARIFAW = $_USUA_GLOBAL[0].IVA1;
                    break;
                case '2':
                    this.INV103.TARIFAW = $_USUA_GLOBAL[0].IVA2;
                    break;
                case '3':
                    this.INV103.TARIFAW = $_USUA_GLOBAL[0].IVA3;
                    break;
                case '0':
                    this.INV103.TARIFAW = '0';
                    break;
                default:
                    this.INV103.TARIFAW = ''
                    break;
            }
            this.form.iva_INV103 = this.INV103.FACTURACION.IVA_ART
            this.form.tabivap_INV103 = this.INV103.TARIFAW
            vlrlistaMask_INV103.typedValue = this.INV103.FACTURACION.VLRLISTA_ART
            vlrultimacompMask_INV103.typedValue = this.INV103.FACTURACION.VLRULT_ART
            fechaultcompMask_INV103.typedValue = this.INV103.FACTURACION.FECHAULT_ART
            fechalistapreMask_INV103.typedValue = this.INV103.FACTURACION.FECHALISTA_ART
            this.INV103.HORAELAB = this.INV103.FACTURACION.HORAELAB_ART
            if (this.form.tipo_INV103.substring(0, 1) == 2) {
                $('#OTROS42_INV103').removeClass('hidden');
            } else {
                $('#OTROS42A_INV103').removeClass('hidden');
            }
            if ($_USUA_GLOBAL[0].NIT == 830512772) {
                $('#OTROS3A_INV103').removeClass('hidden');
            } else {
                $('#OTROS3B_INV103').removeClass('hidden');
            }
            // this.form.color_INV103 = this.INV103.FACTURACION.COLOR_ART
            // this.form.observfac_INV103 = this.INV103.FACTURACION.OBSERVFACT_ART
            // this.form.ubicart_INV103 = this.INV103.FACTURACION.UBIC_ART
            // if (this.INV103.FACTURACION.NIT_ART == 0) {
            //     this.form.proveedor_INV103 = ''
            //     this.form.proveedorp_INV103 = ''
            // } else {
            //     this.form.proveedor_INV103 = this.INV103.FACTURACION.NIT_ART
            //     this.form.proveedorp_INV103 = this.INV103.FACTURACION.DESCRIP_NIT
            // }
            // this.form.ingactivo_INV103 = this.INV103.FACTURACION.INGACT_ART
            // this.form.ingactivod_INV103 =
            // this.form.web_INV103 = this.INV103.FACTURACION.VISUALWEB_ART
            // this.form.acomp_INV103 = this.INV103.FACTURACION.ACOMPA_ART
            // let liquidar = { '1': 'PRECIO BASE', '2': '% SOBRE VR ULTCOMPRA', '3': '% SOBRE VR REFERENCIA' };
            // if (liquidar[this.INV103.FACTURACION.FORMALIQ_ART] == undefined) {
            //     this.form.fliquidar_INV103 = ''
            // } else {
            //     this.form.fliquidar_INV103 = this.INV103.FACTURACION.FORMALIQ_ART + ' - ' + liquidar[this.INV103.FACTURACION.FORMALIQ_ART]
            // }
            // fechacompMask_INV103.typedValue = this.INV103.FACTURACION.FECHACOMP_ART
            // vlrreferenciaMask_INV103.typedValue = this.INV103.FACTURACION.VLRREF_ART
            // vlrrazonableMask_INV103.typedValue = this.INV103.FACTURACION.VLRRAZON_ART
            // vlrresidualMask_INV103.typedValue = this.INV103.FACTURACION.VLRRESID_ART
            // vlrocompraaltaMask_INV103.typedValue = this.INV103.FACTURACION.VLRCOMP_ART
            // pesoMask_INV103.typedValue = this.INV103.FACTURACION.PESO_ART
        },
        _f8grupoart_INV103() {
            $_this = this
            _ventanaDatos({
                titulo: 'VENTANA DE GRUPO',
                columnas: ["TIPO", "GRUPO", "DESCRIP"],
                data: $_this.INV103.FILTROGRUPO,
                callback_esc: function () {
                    $(".grupo_INV103").focus();
                },
                callback: function (data) {
                    // $_TIPOARTW = data.TIPO;
                    $_this.form.grupo_INV103 = data.GRUPO.trim()
                    _enterInput('.grupo_INV103');
                }
            });
        },
        _f8codigoart_INV103() {
            $_this = this
            if (this.form.grupo_INV103.trim() == '') {
                // _ventanaDatos({
                //     titulo: 'BUSQUEDA DE ARTICULOS',
                //     columnas: ["LLAVE_ART", "DESCRIP_ART"],
                //     data: $_this.INV103.ARTICULOS,
                //     callback_esc: function () {
                //         $('.codigoart_INV103').focus();
                //     },
                //     callback: function (data) {
                //         console.log(data, 'ARTICULO')
                //         $_this.INV103.LLAVENROART = data.LLAVE_ART.trim();
                //         $_this.form.tipo_INV103 = $_this.INV103.LLAVENROART.substring(0, 1)
                //         $_this.form.grupo_INV103 = $_this.INV103.LLAVENROART.substring(1, 3)
                //         $_this.form.grupod_INV103 = ''
                //         $_this.form.codigo_INV103 = $_this.INV103.LLAVENROART.substring(3, 16)
                //         $_this.form.clase_INV103 = $_this.INV103.LLAVENROART.substring(16, 18)
                //         $_this.INV103.LLAVEGRUPOW = $_this.form.tipo_INV103 + $_this.form.grupo_INV103
                //         $_this.INV103.FILTROARTICULO = $_this.INV103.ARTICULOS.filter(clase => clase.GRUPO_ART == $_this.form.grupo_INV103);
                //         _enterInput('.codigoart_INV103');
                //     }
                // });
                let URL = get_url("APP/INVENT/INV803.DLL");
                postData({
                    datosh: datosEnvio() + " |" + localStorage['Usuario'] + "|"
                }, URL)
                    .then((data) => {
                        loader("hide");
                        $_this.INV103.ARTICULOS = data.ARTICULOS;
                        $_this.INV103.ARTICULOS.pop()
                        _ventanaDatos({
                            titulo: 'BUSQUEDA DE ARTICULOS',
                            columnas: ["LLAVE_ART", "DESCRIP_ART"],
                            data: $_this.INV103.ARTICULOS,
                            callback_esc: function () {
                                $('.codigoart_INV103').focus();
                            },
                            callback: function (data) {
                                // $_this.INV103.LLAVENROART1 = data.LLAVE_ART.substring(1, 18)
                                $_this.INV103.LLAVENROART = data.LLAVE_ART.trim();
                                $_this.form.tipo_INV103 = $_this.INV103.LLAVENROART.substring(0, 1)
                                $_this.form.grupo_INV103 = $_this.INV103.LLAVENROART.substring(1, 3)
                                $_this.form.grupod_INV103 = ''
                                $_this.form.codigo_INV103 = $_this.INV103.LLAVENROART.substring(3, 16)
                                $_this.form.clase_INV103 = $_this.INV103.LLAVENROART.substring(16, 18)
                                $_this.INV103.LLAVEGRUPOW = $_this.form.tipo_INV103 + $_this.form.grupo_INV103
                                _enterInput('.codigoart_INV103');
                            }
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                _ventanaDatos({
                    titulo: 'BUSQUEDA DE ARTICULOS FILTRADOS POR GRUPO',
                    columnas: ["LLAVE_ART", "DESCRIP_ART"],
                    data: $_this.INV103.FILTROARTICULO,
                    callback_esc: function () {
                        $('.codigoart_INV103').focus();
                    },
                    callback: function (data) {
                        $_this.INV103.LLAVENROART = data.LLAVE_ART.trim();
                        $_this.form.codigo_INV103 = $_this.INV103.LLAVENROART.substring(3, 16);
                        $_this.form.clase_INV103 = $_this.INV103.LLAVENROART.substring(16, 18)
                        _enterInput('.codigoart_INV103');
                    }
                });
            }
        },
        _f8claseart_INV103() {
            $_this = this
            _ventanaDatos({
                titulo: 'VENTANA DE CLASE',
                columnas: ["COD", "DESCRIP"],
                data: $_this.INV103.CLASEARTICULO,
                callback_esc: function () {
                    $(".claseart_INV103").focus();
                },
                callback: function (data) {
                    $_this.form.clase_INV103 = data.COD.trim();
                    _enterInput('.claseart_INV103');
                }
            });
        },
        _f8usoart_INV103() {
            $_this = this
            _ventanaDatos({
                titulo: 'VENTANA DE USO',
                columnas: ["COD", "DESCRIP"],
                data: $_this.INV103.USOARTICULO,
                callback_esc: function () {
                    $(".uso_INV103").focus();
                },
                callback: function (data) {
                    $_this.form.uso_INV103 = data.COD.trim();
                    _enterInput('.uso_INV103');
                }
            });
        },
        _f8saldomedicoart_INV103() {
            $_this = this
            _ventanaDatos({
                titulo: 'VENTANA DE FARMACOS',
                columnas: ["COD", "DESCRIP"],
                data: $_this.INV103.FARMACOS,
                callback_esc: function () {
                    $(".saldomed_INV103").focus();
                },
                callback: function (data) {
                    $_this.form.saldomed_INV103 = data.COD.trim();
                    _enterInput('.saldomed_INV103');
                }
            });
        },
        _f8almacenart_INV103() {
            $_this = this
            _ventanaDatos({
                titulo: 'VENTANA DE ALMACENES',
                columnas: ["CODIGO", "DESCRIPCION"],
                data: $_this.INV103.ALMACEN,
                callback_esc: function () {
                    $(".almalterno_INV103").focus();
                },
                callback: function (data) {
                    $_this.form.almalterno_INV103 = data.CODIGO.trim();
                    _enterInput('.almalterno_INV103');
                }
            });
        },
        _f8marcaart_INV103() {

        },
        _f8atcart_INV103() {
            $_this = this
            _ventanaDatos({
                titulo: 'VENTANA DE CODIGOS ATC MEDICAMENTOS',
                columnas: ["COD", "DESCRIP"],
                data: $_this.INV103.MEDATC,
                callback_esc: function () {
                    $(".atc_INV103").focus();
                },
                callback: function (data) {
                    $_this.form.atc_INV103 = data.COD.trim();
                    _enterInput('.atc_INV103');
                }
            });
        },
        _f8politicaart_INV103() {
            $_this = this
            _ventanaDatos({
                titulo: 'VENTANA DE POLITICAS ART',
                columnas: ["COD", "DESCRIP"],
                data: $_this.INV103.POLITICA,
                callback_esc: function () {
                    $(".politica_INV103").focus();
                },
                callback: function (data) {
                    $_this.form.politica_INV103 = data.COD.trim();
                    _enterInput('.politica_INV103');
                }
            });
        },
        _f8costosart_INV103() {
            $_this = this
            _ventanaDatos({
                titulo: 'VENTANA DE COSTOS',
                columnas: ["COD", "NOMBRE"],
                data: $_this.INV103.COSTO,
                callback_esc: function () {
                    $(".ccostos_INV103").focus();
                },
                callback: function (data) {
                    $_this.form.ccostos_INV103 = data.COD.trim();
                    _enterInput('.ccostos_INV103');
                }
            });
        },
        _f8codcontableart_INV103() {
            $_this = this
            // _ventanaDatos({
            //     titulo: 'VENTANA DE COSTOS',
            //     columnas: ["LLAVE_MAE", "NOMBRE_MAE"],
            //     data: $_this.INV103.FILTROMAE,
            //     callback_esc: function () {
            //         $(".contable_INV103").focus();
            //     },
            //     callback: function (data) {
            //         $_this.form.contable_INV103 = data.LLAVE_MAE.trim();
            //         _enterInput('.contable_INV103');
            //     }
            // });
            _ventanaDatos({
                titulo: 'VENTANA COD CONTABLE',
                columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "TIPO_MAE", "NOMBRE_MAE"],
                data: $_this.INV103.FILTROMAE,
                callback_esc: function () {
                    $(".contable_INV103").focus();
                },
                callback: function (data) {
                    $_this.form.contable_INV103 = data.LLAVE_MAE.substring(0, 11).trim()
                    _enterInput('.contable_INV103');
                }
            });
        },
        _f8homologoart_INV103() {
            $_this = this
            _ventanaDatos_lite_v2({
                titulo: 'BUSQUEDA DE ARTICULOS',
                data: $_this.INV103.ARTICULOS,
                indice: ['LLAVE_ART', 'DESCRIP_ART'],
                mascara: [
                    {
                        'LLAVE_ART': 'Codigo',
                        'DESCRIP_ART': 'Descripcion'
                    }],
                minLength: 3,
                callback_esc: function () {
                    $('.codhomologo_INV103').focus();
                },
                callback: function (data) {
                    $_this.INV103.CODHOMOLOGO = data.LLAVE_ART.trim();
                    this.form.codhomologo_INV103 = $_this.INV103.CODHOMOLOGO.substring(3, 16);
                    _enterInput('.codhomologo_INV103');
                }
            });
        }
    },
});

var autoretartMask_INV103 = new IMask(document.getElementById('autoret_INV103'),
    { mask: Number, min: 0, max: 99999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var dctogralvtaMask_INV103 = new IMask(document.getElementById('dcto_INV103'),
    { mask: Number, min: 0, max: 999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var paquetesMask_INV103 = new IMask(document.getElementById('paquetes_INV103'),
    { mask: Number, min: 0, max: 99, thousandsSeparator: ',' }
);
var reposicionMask_INV103 = new IMask(document.getElementById('reposicion_INV103'),
    { mask: Number, min: 0, max: 99999, thousandsSeparator: ',', padFractionalZeros: true }
);
var unidadconvMask_INV103 = new IMask(document.getElementById('uniconversion_INV103'),
    { mask: Number, min: 0, max: 9999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var stockalmacenMask_INV103 = new IMask(document.getElementById('stockalm_INV103'),
    { mask: Number, min: 0, max: 99999 }
);
var stockminconvMask_INV103 = new IMask(document.getElementById('smin_INV103'),
    { mask: Number, min: 0, max: 999999 }
);
var stockmaxMask_INV103 = new IMask(document.getElementById('smax_INV103'),
    { mask: Number, min: 0, max: 999999 }
);
var vlrlistaMask_INV103 = new IMask(document.getElementById('vlrlista_INV103'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var vlrreferenciaMask_INV103 = new IMask(document.getElementById('vlrref_INV103'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var vlrultimacompMask_INV103 = new IMask(document.getElementById('ultcompra_INV103'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var vlroventaMask_INV103 = new IMask(document.getElementById('preciosventa_INV103'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var incrementoMask_INV103 = new IMask(document.getElementById('incremento_INV103'),
    { mask: Number, min: 0, max: 999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
// var pesoMask_INV103 = new IMask(document.getElementById('peso_INV103'),
//     { mask: Number, min: 0, max: 999999, scale: 3, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
// );
// var vlrrazonableMask_INV103 = new IMask(document.getElementById('vlrrazonable_INV103'),
//     { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
// );
// var vlrresidualMask_INV103 = new IMask(document.getElementById('vlrresidual_INV103'),
//     { mask: Number, min: 0, max: 99, scale: 12, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
// );
// var vlrocompraaltaMask_INV103 = new IMask(document.getElementById('compraalta_INV103'),
//     { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
// );




var fechaultcompMask_INV103 = IMask($("#fechaultcompra_INV103")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '0000', to: '9000', maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        if (fecha == "Invalid date") return "0000/00/00";
        return str;
    }
});

// var fechacompMask_INV103 = IMask($("#fechacompra_INV103")[0], {
//     mask: Date,
//     pattern: 'Y-m-d',
//     lazy: true,
//     blocks: {
//         Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '0000', to: '9000', maxLength: 4 },
//         m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
//         d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
//     },
//     format: function (date) {
//         return moment(date).format("YYYY-MM-DD");
//     },
//     parse: function (str) {
//         var fecha = moment(str).format('YYYY-MM-DD');
//         if (fecha == "Invalid date") return "0000/00/00";
//         return str;
//     }
// });

var fechalistapreMask_INV103 = IMask($("#listaprec_INV103")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '0000', to: '9000', maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        if (fecha == "Invalid date") return "0000/00/00";
        return str;
    }
});



// var fechacambios_INV103 = IMask.createPipe({
//     mask: Date,
//     pattern: "Y-m-d",
//     lazy: true,
//     blocks: {
//         Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: "00", to: "99", maxLength: 2 },
//         m: { mask: IMask.MaskedRange, placeholderChar: "m", from: "00", to: "12", maxLength: 2 },
//         d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "00", to: "31", maxLength: 2 },
//     },
//     format: function (date) {
//         return moment(date).format("YY-MM-DD");
//     },
//     parse: function (str) {
//         var fecha = moment(str).format("YY-MM-DD");
//         if (fecha == 'Invalid date') return '00-00-00'
//         return str;
//     },
// });