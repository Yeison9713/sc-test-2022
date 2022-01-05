new Vue({
    el: '#SER4C2',
    data: {
        form: {
            prefijo_SER4C2: '',
            factura_SER4C2: '',
            victima_SER4C2: '',
            descripVictima_SER4C2: '',
            naturaleza_SER4C2: '',
            condicion_SER4C2: '',
            otroevent_SER4C2: '',
            zona_SER4C2: '',
            ciudad_SER4C2: '',
            direcc_SER4C2: '',
            descripcionevento_SER4C2: '',
            estadoAseg_SER4C2: '',
            placa_SER4C2: '',
            marca_SER4C2: '',
            tipoServ_SER4C2: '',
            poliza_SER4C2: '',
            poliza2_SER4C2: '',
            entidad_SER4C2: '',
            autorid_SER4C2: '',
            cobro_SER4C2: '',
            propietario_SER4C2: '',
            propietariod_SER4C2: '',
            conductor_SER4C2: '',
            conductord_SER4C2: '',
            placa1_SER4C2: '',
            codProp1_SER4C2: '',
            descripProp1_SER4C2: '',
            placa2_SER4C2: '',
            codProp2_SER4C2: '',
            descripProp2_SER4C2: '',
            ipsOrg_SER4C2: '',
            ciudadRemi_SER4C2: '',
            Remite_SER4C2: '',
            cargo1_SER4C2: '',
            ipsDest_SER4C2: '',
            telefono_SER4C2: '',
            direccDestino_SER4C2: '',
            ciudadRemi2_SER4C2: '',
            persRecibe_SER4C2: '',
            cargo2_SER4C2: '',
            placaAmb_SER4C2: '',
            tipoTransp_SER4C2: '',
            Envios_SER4C2: '',
            transpDesde_SER4C2: '',
            transpHasta_SER4C2: '',
            DiagPrinIng_SER4C2: '',
            descriPrinDiagIng_SER4C2: '',
            otrDiagIng1_SER4C2: '',
            descripotrDiagIng1_SER4C2: '',
            otrDiagIng2_SER4C2: '',
            descripotrDiagIng2S_SER4C2: '',
            DiagPrinEgr_SER4C2: '',
            descriPrinDiagEgr_SER4C2: '',
            otrDiagEgr1_SER4C2: '',
            descripotrDiagEgr1_SER4C2: '',
            otrDiagEgr2_SER4C2: '',
            descripotrDiagEgr2S_SER4C2: '',
            medicoTratante_SER4C2: '',
            descripMedicoTratante_SER4C2: '',
            nroRadic_SER4C2: '',
            radicAnt_SER4C2: '',
            folios_SER4C2: '',
            impresion_SER4C2: ''
        },
        SER4C2: [],
    },
    created() {
        _inputControl('disabled');
        this.form.prefijo_SER4C2 = 'T'
        this.SER4C2.AMBDESDE1 = ''
        this.SER4C2.AMBDESDE2 = ''
        this.SER4C2.AMBHASTA1 = ''
        this.SER4C2.AMBHASTA2 = ''
        let $_this = this
        loader('show')
        this.SER4C2.SINIESTROS = [
            { 'COD': '01', 'DESCRIP': 'ACCIDENTE DE TRANSITO' },
            { 'COD': '02', 'DESCRIP': 'SISMO' },
            { 'COD': '03', 'DESCRIP': 'MAREMOTO' },
            { 'COD': '04', 'DESCRIP': 'ERUPCIONES VOLCANICAS' },
            { 'COD': '05', 'DESCRIP': 'DESLIZAMIENTO TIERRA' },
            { 'COD': '06', 'DESCRIP': 'INUNDACIONES' },
            { 'COD': '07', 'DESCRIP': 'AVALANCHA' },
            { 'COD': '08', 'DESCRIP': 'INCENDIO NATURAL' },
            { 'COD': '09', 'DESCRIP': 'EXPLOSION TERRORISTA' },
            { 'COD': '10', 'DESCRIP': 'INCENDIO TERRORISTA' },
            { 'COD': '11', 'DESCRIP': 'COMBATE' },
            { 'COD': '12', 'DESCRIP': 'ATAQUE A MUNICIPIOS' },
            { 'COD': '13', 'DESCRIP': 'MASACRE' },
            { 'COD': '14', 'DESCRIP': 'DESPLAZADOS' },
            { 'COD': '15', 'DESCRIP': 'OTRO' },
            { 'COD': '16', 'DESCRIP': 'HURACAN' },
            { 'COD': '18', 'DESCRIP': 'MINA ANTIPERSONAL' }
        ]
        loader('show')
        let active = $('#navegacion').find('li.opcion-menu.active')
        this.SER4C2.OPCIONACTIVA = active[0].attributes[2].nodeValue
        let Nombreopcion = {
            '0974372': '9,7,4,3,7,2 - Diligenciar formato FURIPS',
            '0974373': '9,7,4,3,7,3 - Reimprimir formato FURIPS',
        }
        nombreOpcion(Nombreopcion[this.SER4C2.OPCIONACTIVA]);
        obtenerDatosCompletos({ nombreFd: 'FIRMAS' }, data => {
            loader('hide')
            data = data.FIRMAS[0]
            SER4C2.FIRMAS = data
            $_this._evaluarprefijo_SER4C2()
        })
    },
    methods: {
        _caracteresespeciales_SER4C2(e, input){
            this.form[input] = this.form[input].replace(/[^a-zA-Z0-9Ññ ]/g, '')
        },
        _evaluarprefijo_SER4C2() {
            validarInputs({
                form: '#VALIDAR1_SER4C2',
                orden: '1'
            },
                _toggleNav,
                () => {
                    this.form.prefijo_SER4C2 = this.form.prefijo_SER4C2.trim().toUpperCase()
                    if (this.form.prefijo_SER4C2.trim() == 'T') {
                        return this._infoCON007_SER4C2()
                    }

                    CON851('03', '03', null, 'error', 'Error')
                    this._evaluarprefijo_SER4C2()
                }
            )
        },
        _infoCON007_SER4C2() {
            postData(
                { datosh: `${datosEnvio()}9${this.form.prefijo_SER4C2.trim()}|` },
                get_url("APP/CONTAB/CON007.DLL")
            )
                .then(data => {
                    data = data.split("|")
                    this.SER4C2.NROW = data[1].substring(3, 9)
                    this.SER4C2.NROW = parseInt(this.SER4C2.NROW) - 1
                    this.form.factura_SER4C2 = this.SER4C2.NROW.toString()
                    this._evaluarnro_SER4C2()
                })
                .catch(err => {
                    console.debug(err)
                    this._evaluarprefijo_SER4C2()
                })
        },
        _evaluarnro_SER4C2() {
            validarInputs({
                form: '#VALIDAR2_SER4C2',
                orden: '1'
            },
                this._evaluarprefijo_SER4C2,
                () => {
                    this.form.factura_SER4C2 = this.form.factura_SER4C2.padStart(6, '0')
                    // SER4C2.NROW = $('#factura_SER4C2').val(); SER4C2.LLAVEW = prefijoMask_SER4C2.value + SER4C2.NROW.padStart(6, '0')
                    // $('#factura_SER4C2').val(SER4C2.NROW);
                    // $('#prefijo_SER4C2').val(SER4C2.PREFIJOW);
                    this.SER4C2.ARRAYEVENTO = {
                        '01': 'ACCIDENTE DE TRANSITO',
                        '02': 'SISMO',
                        '03': 'MAREMOTO',
                        '04': 'ERUPCIONES VOLCANICAS',
                        '05': 'DESLIZAMIENTO TIERRA',
                        '06': 'INUNDACIONES',
                        '07': 'AVALANCHA',
                        '08': 'INCENDIO NATURAL',
                        '09': 'EXPLOSION TERRORISTA',
                        '10': 'INCENDIO TERRORISTA',
                        '11': 'COMBATE',
                        '12': 'ATAQUE A MUNICIPIOS',
                        '13': 'MASACRE',
                        '14': 'DESPLAZADOS',
                        '15': 'OTRO',
                        '16': 'HURACAN',
                        '18': 'MINA ANTIPERSONAL'
                    }
                    this.SER4C2.ARRAYOTREVENTO = {
                        '1': 'CONDUCTOR',
                        '2': 'PEATON',
                        '3': 'OCUPANTE',
                        '4': 'CICLISTA'
                    }
                    this.SER4C2.ARRAYASEGURADO = {
                        '1': 'ASEGURADO',
                        '2': 'NO ASEGURADO',
                        '3': 'VEHICULO FANTASMA',
                        '4': 'POLIZA FALSA',
                        '5': 'VEHICULO EN FUGA'
                    }
                    postData(
                        { datosh: `${datosEnvio()}1|${this.form.prefijo_SER4C2}${this.form.factura_SER4C2}|` },
                        get_url("APP/SALUD/SER4C2P.DLL")
                    )
                        .then(data => {
                            this._llenardatos_SER4C2(data)
                            if (this.SER4C2.OPCIONACTIVA == '0974373') {
                                document.getElementById('IMPRESION_SER4C2').classList.remove('hidden')
                                return this._evaluarrecalculovalor_SER4C2()
                            }
                            this.validarpaciente_SER4C2()
                        })
                        .catch(err => {
                            console.error(err);
                            if (err.MENSAJE == "01") {
                                return postData(
                                    { datosh: `${datosEnvio()}${this.form.prefijo_SER4C2}${this.form.factura_SER4C2}|` },
                                    get_url("APP/SALUD/SER808-01.DLL")
                                )
                                    .then(data => {
                                        console.debug(data);
                                        this.SER4C2.NOVEDADW = '7';
                                        this.SER4C2.NUMERACION = data.NUMER19[0]
                                        this.SER4C2.TIPOEVENTW = data.NUMER19[0].TIPOEVENT_NUM
                                        if (!$.isNumeric(data.NUMER19[0].TIPOEVENT_NUM)) this.SER4C2.TIPOEVENTW = '01'
                                        this.SER4C2.IDPACW = data.NUMER19[0].IDPAC_NUM
                                        this.SER4C2.DESCRIPPACI = data.NUMER19[0].PACIENTE_NUM
                                        this.SER4C2.FECHAINGW = data.NUMER19[0].FECHA_ING + ' ' + data.NUMER19[0].HORAING_NUM;
                                        this.SER4C2.FECHAEGRW = data.NUMER19[0].FECHA_RET + ' ' + data.NUMER19[0].HORARET_NUM
                                        fechaingMask_SER4C2.typedValue = SER4C2.FECHAINGW
                                        fechaegrMask_SER4C2.typedValue = SER4C2.FECHAEGRW
                                        this.form.entidad_SER4C2 = data.NUMER19[0].DESCRIP_NUM
                                        if (SER4C2.OPCIONACTIVA == '0974373') {
                                            return this._evaluarnro_SER4C2();
                                        }

                                        CON851P('Desea copiar otro FURIPS?', this.validarpaciente_SER4C2, this._evaluardocumentootroFURIP_SERC42)
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        this._evaluarnro_SER4C2();
                                    });
                            }

                            this._evaluarnro_SER4C2();
                        })
                }
            )
        },
        _evaluardocumentootroFURIP_SERC42() {
            this.SER4C2.VENTANA1ID = 'VENTANANRODOCUMENTO_SER4C2';
            _ventanaalterna_SALUD(data = {
                ID: this.SER4C2.VENTANA1ID,
                callback: this._evaluarnrodocumento_SER4C2,
                titulo: 'VENTANA DE BUSQUEDA FURIP',
                html: ` 
                <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
                    <label class=""col-md-12 col-sm-12 col-xs-12">Digite el Nro de cédula</label>
                    <div class="col-md-12 col-sm-12 col-xs-12" id="VALIDAR1VENTANA_SER4C2">
                        <div class="inline-inputs">
                            <label class="col-md-5 col-sm-5 col-xs-12">NRO DOCUMENTO:</label>
                            <div class="input-group col-md-7 col-sm-7 col-xs-12">
                                <input id="nrodocumentopaciente_SER4C2" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">
                            </div>
                        </div>
                    </div>
                </div>
                `
            })
            this._evaluarnrodocumento_SER4C2();
        },
        _evaluarnrodocumento_SER4C2() {
            validarInputs({
                form: '#VALIDAR1VENTANA_SER4C2',
                orden: '1'
            },
                () => {
                    $(`#${this.SER4C2.VENTANA1ID}`).remove();
                    this._evaluarnro_SER4C2();
                },
                () => {
                    this.SER4C2.NRODOCUMENTO = $('#nrodocumentopaciente_SER4C2').val();
                    postData(
                        { datosh: `${datosEnvio()}${this.SER4C2.NRODOCUMENTO.padStart(15, '0')}|` },
                        get_url("APP/SALUD/SER4C2P-01.DLL")
                    )
                        .then(data => {
                            data.FACTURAS.pop();
                            data.FACTURAS.sort(function (a, b) {
                                if (a.LLAVE > b.LLAVE) {
                                    return 1;
                                }
                                if (a.LLAVE < b.LLAVE) {
                                    return -1;
                                }
                            });
                            let $_this = this
                            _ventanaDatos({
                                titulo: "ANTECEDENTES DE FURIPS",
                                columnas: ["LLAVE", "FECHA", "NOMBRE_PACIENTE", "DESCRIPCION"],
                                data: data.FACTURAS,
                                callback_esc: function () {
                                    $_this._evaluarnrodocumento_SER4C2();
                                },
                                callback: function (data) {
                                    postData({ datosh: datosEnvio() + '1|' + data.LLAVE + '|' }, get_url("APP/SALUD/SER4C2P.DLL"))
                                        .then(data => {
                                            $(`#${$_this.SER4C2.VENTANA1ID}`).remove()
                                            $_this._llenardatos_SER4C2(data)
                                            valorfacturado_SER4C2.typedValue = ''
                                            valorreclamado_SER4C2.typedValue = ''
                                            valorfacturado2_SER4C2.typedValue = ''
                                            valorreclamado2_SER4C2.typedValue = ''
                                            $_this.validarpaciente_SER4C2()
                                        })
                                        .catch(err => {
                                            console.error(err);
                                            $_this._evaluarnrodocumento_SER4C2();
                                        })
                                }
                            })
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluarnrodocumento_SER4C2()
                        });
                }
            )
        },
        _llenardatos_SER4C2(data) {
            console.log(data.FACTURA[0], 'FURIPS')
            this.SER4C2.FURIP = data.FACTURA[0]
            this.SER4C2.NOVEDADW = '8'
            // SER4C2.IDPACW = data.FACTURA[0].ID_PACI; this.SER4C2.FURIP.ID_PACI
            // SER4C2.DESCRIPPACI = data.FACTURA[0]['1ER_NOM_PACI'] + ' ' + data.FACTURA[0]['2DO_NOM_PACI'] + ' ' + data.FACTURA[0]['1ER_APEL_PACI'] + ' ' + data.FACTURA[0]['2DO_APEL_PACI'];
            this.form.naturaleza_SER4C2 = `${data.FACTURA[0].TIPO_EVEN_FUR} ${this.SER4C2.ARRAYEVENTO[data.FACTURA[0].TIPO_EVEN_FUR]}`
            this.form.condicion_SER4C2 = `${data.FACTURA[0].CONDIC_FUR} ${this.SER4C2.ARRAYOTREVENTO[data.FACTURA[0].CONDIC_FUR]}`
            this.form.direcc_SER4C2 = data.FACTURA[0].DIR_OCUR_FUR
            this.form.ciudad_SER4C2 = `${data.FACTURA[0].COD_CIUD2_OCUR_FUR}${data.FACTURA[0].CIUD_OCUR_FUR}`
            this.form.zona_SER4C2 = data.FACTURA[0].ZONA_OCUR_FUR
            fechaocurrMask.typedValue = data.FACTURA[0].FECHA_OCUR_FUR + ' ' + data.FACTURA[0].HORA_OCUR_FUR
            this.form.descripcionevento_SER4C2 = data.FACTURA[0].DESCRIP1_FUR.replace(/&/g, '\n') + data.FACTURA[0].DESCRIP2_FUR.replace(/&/g, '\n') + data.FACTURA[0].DESCRIP3_FUR.replace(/&/g, '\n') + data.FACTURA[0].DESCRIP4_FUR.replace(/&/g, '\n') + data.FACTURA[0].DESCRIP5_FUR.replace(/&/g, '\n') + data.FACTURA[0].DESCRIP6_FUR.replace(/&/g, '\n')
            this.estadoAseg_SER4C2 = `${data.FACTURA[0].ASEG_VEH_FUR} ${this.SER4C2.ARRAYASEGURADO[SER4C2.ASEGVEHW]}`
            this.form.placa_SER4C2 = data.FACTURA[0].PLACA_CAR
            this.form.marca_SER4C2 = data.FACTURA[0].MARCA_CAR
            this.form.tipoServ_SER4C2 = data.FACTURA[0].TIPO2_CAR
            this.form.poliza_SER4C2 = `${data.FACTURA[0].COD_POL}${data.FACTURA[0].NUM_POL}`
            this.form.poliza2_SER4C2 = data.FACTURA[0].POLIZA2_VEH
            this.form.entidad_SER4C2 = data.FACTURA[0].CIAG_ASEG_VEH
            fechainipolMask.typedValue = data.FACTURA[0].FECHA_INI_POL;
            fechafinpolMask.typedValue = data.FACTURA[0].FECHA_FIN_POL;
            this.form.autorid_SER4C2 = data.FACTURA[0].INTERV_AUT
            this.form.cobro_SER4C2 = data.FACTURA[0].COB_EXCED
            this.form.propietario_SER4C2 = data.FACTURA[0].PROPIETARIO.ID_PROP_VEH
            this.form.propietariod_SER4C2 = `${data.FACTURA[0].PROPIETARIO.NOMB_1} ${data.FACTURA[0].PROPIETARIO.NOMB_2} ${data.FACTURA[0].PROPIETARIO.APEL1_TER2} ${data.FACTURA[0].PROPIETARIO.APEL2_TER2}`
            this.form.conductor_SER4C2 = data.FACTURA[0].CONDUCTOR.ID_PROP_VEH.padStart(10, '0')
            this.form.conductord_SER4C2 = `${data.FACTURA[0].CONDUCTOR.NOMB_1} ${data.FACTURA[0].CONDUCTOR.NOMB_2} ${data.FACTURA[0].CONDUCTOR.APEL1_TER2} ${data.FACTURA[0].CONDUCTOR.APEL2_TER2}`
            this.form.placa1_SER4C2 = data.FACTURA[0].PLACA_VEH2
            this.form.codProp1_SER4C2 = data.FACTURA[0].ID_PROP_VEH2
            this.form.descripProp1_SER4C2 = data.FACTURA[0].DESCRIP_VEH2
            this.form.placa2_SER4C2 = data.FACTURA[0].PLACA_VEH3
            this.form.codProp2_SER4C2 = data.FACTURA[0].ID_PROP_VEH3
            this.form.descripProp2_SER4C2 = data.FACTURA[0].DESCRIP_VEH3

            fecharemiMask.typedValue = data.FACTURA[0].FECHA_REMI_FUR;
            this.form.ipsOrg_SER4C2 = `${data.FACTURA[0].COD_IPS_REMI} ${data.FACTURA[0].NOMBRE_IPS_REMI}`
            this.form.Remite_SER4C2 = data.FACTURA[0].PERS_REMI
            this.form.cargo1_SER4C2 = data.FACTURA[0].CARGO_REMI
            // this.form.fechaAceptacion_SER4C2 = 
            // SER4C2.FECHAACEPW = data.FACTURA[0].FECHA_ACEP_FUR; SER4C2.HORAACEPW = data.FACTURA[0].HORA_ACEP_FUR;
            // $('#fechaAceptacion_SER4C2').val(SER4C2.FECHAACEPW.substring(0, 4) + '/' + SER4C2.FECHAACEPW.substring(4, 6) + '/' + SER4C2.FECHAACEPW.substring(6, 8) + ' ' + SER4C2.HORAACEPW.substring(0, 2) + ':' + SER4C2.HORAACEPW.substring(2, 4));
            fechaacepMask_SER4C2.typedValue = `${data.FACTURA[0].FECHA_ACEP_FUR} ${data.FACTURA[0].HORA_ACEP_FUR}`
            this.form.ipsDest_SER4C2 = `${data.FACTURA[0].COD_IPS_ACEP} ${data.FACTURA[0].NOMBRE_IPS_ACEP}`
            this.form.persRecibe_SER4C2 = data.FACTURA[0].PERS_ACEP
            this.form.cargo2_SER4C2 = data.FACTURA[0].CARGO_ACEP
            this.form.placaAmb_SER4C2 = data.FACTURA[0].PLACA_AMB
            postData(
                { datosh: datosEnvio(), llave: this.form.placaAmb_SER4C2.trim() },
                get_url("APP/SALUD/CER101.DLL")
            )
                .then(data => {
                    console.log(data);
                    this.SER4C2.AMBULCAR = data.AMBUL
                    this.SER4C2.MARCACAR = data.MARCA
                    let ambul = {
                        '1': 'BASICA',
                        '2': 'MEDICADA',
                        '3': 'NO APLICA',
                        '': ''
                    }
                    this.form.tipoTransp_SER4C2 = `${data.AMBUL} ${ambul[data.AMBUL]}`
                })
                .catch(error => {
                    console.error(error)
                    this.SER4C2.AMBULCAR = ''
                    this.SER4C2.MARCACAR = ''
                })

            this.form.zona_SER4C2 = data.FACTURA[0].ZONA_AMB.trim()
            if (data.FACTURA[0].ZONA_AMB.trim() == '') this.form.zona_SER4C2 = 'U';
            this.form.transpDesde_SER4C2 = `${data.FACTURA[0].DESDE_AMB } ${data.FACTURA[0].DESDE_AMB2} ` 
            this.form.transpHasta_SER4C2 = `${data.FACTURA[0].HASTA_AMB } ${data.FACTURA[0].HASTA_AMB2} `  
            fechaingMask_SER4C2.typedValue = data.FACTURA[0].FECHA_ING_FUR + ' ' + data.FACTURA[0].HORA_ING_FUR;
            // $('#fechaIngVic_SER4C2').val(SER4C2.FECHAINGW);
            postData(
                { datosh: `${datosEnvio()}|`, codigo: data.FACTURA[0].DIAG1ING_FUR, paso: '1' },
                get_url("APP/SALUD/SER851.DLL")
            )
                .then(data => {
                    this.form.DiagPrinIng_SER4C2 = data.COD_ENF
                    this.form.descriPrinDiagIng_SER4C2 = data.NOMBRE_ENF
                })
                .catch(error => {
                    console.error(error)
                })
            postData(
                { datosh: `${datosEnvio()}|`, codigo: data.FACTURA[0].DIAG2ING_FUR, paso: '1' },
                get_url("APP/SALUD/SER851.DLL")
            )
                .then(data => {
                    this.form.otrDiagIng1_SER4C2 = data.COD_ENF
                    this.form.descripotrDiagIng1_SER4C2 = data.NOMBRE_ENF
                })
                .catch(error => {
                    console.error(error)
                })
            postData(
                { datosh: `${datosEnvio()}|`, codigo: data.FACTURA[0].DIAG3ING_FUR, paso: '1' },
                get_url("APP/SALUD/SER851.DLL")
            )
                .then(data => {
                    this.form.otrDiagIng2_SER4C2 = data.COD_ENF
                    this.form.descripotrDiagIng2S_SER4C2 = data.NOMBRE_ENF
                })
                .catch(error => {
                    console.error(error)
                })
            fechaegrMask_SER4C2.typedValue = data.FACTURA[0].FECHA_EGR_FUR + ' ' + data.FACTURA[0].HORA_EGR_FUR
            postData(
                { datosh: `${datosEnvio()}|`, codigo: data.FACTURA[0].DIAG1EGR_FUR, paso: '1' },
                get_url("APP/SALUD/SER851.DLL")
            )
                .then(data => {
                    this.form.DiagPrinEgr_SER4C2 = data.COD_ENF
                    this.form.descriPrinDiagEgr_SER4C2 = data.NOMBRE_ENF
                })
                .catch(error => {
                    console.error(error)
                })
            postData(
                { datosh: `${datosEnvio()}|`, codigo: data.FACTURA[0].DIAG2EGR_FUR, paso: '1' },
                get_url("APP/SALUD/SER851.DLL")
            )
                .then(data => {
                    this.form.otrDiagEgr1_SER4C2 = data.COD_ENF
                    this.form.descripotrDiagEgr1_SER4C2 = data.NOMBRE_ENF
                })
                .catch(error => {
                    console.error(error)
                })
            postData({ datosh: `${datosEnvio()}|`, codigo: data.FACTURA[0].DIAG3EGR_FUR, paso: '1' },
                get_url("APP/SALUD/SER851.DLL"))
                .then(data => {
                    this.form.otrDiagEgr2_SER4C2 = data.COD_ENF
                    this.form.descripotrDiagEgr2S_SER4C2 = data.NOMBRE_ENF
                })
                .catch(error => {
                    console.error(error)
                })

            this.form.medicoTratante_SER4C2 = data.FACTURA[0].MEDICO.MED_ATI_FUR
            this.SER4C2.REGMED = data.FACTURA[0].MEDICO.REG_MED
            postData(
                {
                    datosh: `${datosEnvio()}${this.form.medicoTratante_SER4C2.padStart(10, '0')}|8|`,
                },
                get_url("APP/CONTAB/CON802_01.DLL")
            )
                .then(data => {
                    this.form.descripMedicoTratante_SER4C2 = data.TERCER[0].DESCRIP_TER
                })
                .catch(error => {
                    console.error(error);
                })

            valorfacturado_SER4C2.typedValue = data.FACTURA[0].VLR_MQ_FACT
            valorreclamado_SER4C2.typedValue = data.FACTURA[0].VLR_MQ_RECL
            valorfacturado2_SER4C2.typedValue = data.FACTURA[0].VLR_TR_FACT
            valorreclamado2_SER4C2.typedValue = data.FACTURA[0].VLR_TR_RECL

            this.form.nroRadic_SER4C2 = data.FACTURA[0].NRO_RAD
            fecharadMask_SER4C2.typedValue = data.FACTURA[0].FECHA_RAD
            this.form.radicAnt_SER4C2 = data.FACTURA[0].NRO_RAD_ANT
            this.form.folios_SER4C2 = data.FACTURA[0].PROPIETARIO.FOLIOS_FUR

            postData(
                { datosh: `${datosEnvio()}${this.form.prefijo_SER4C2}${this.form.factura_SER4C2}|` },
                get_url("APP/SALUD/SER808-01.DLL")
            )
                .then(data => {
                    this.SER4C2.NUMERACION = data.NUMER19[0];
                })
                .catch(err => {
                    console.error(err);
                })
            postData(
                { datosh: `${datosEnvio()}${this.form.prefijo_SER4C2}${this.form.factura_SER4C2}|` },
                get_url("APP/SALUD/SER4C2.DLL")
            )
                .then(data => {
                    this.SER4C2.FACTURAS = data.FACTURA
                    this.SER4C2.VALORMQ = 0
                    this.SER4C2.VALORTRAS = 0
                    for (var i in this.SER4C2.FACTURAS) {
                        if (this.SER4C2.FACTURAS[i].CUPS.substring(0, 2) == 'S3') {
                            let valor = parseFloat(this.SER4C2.FACTURAS[i].VALOR)
                            if (isNaN(valor)) valor = 0
                            this.SER4C2.VALORTRAS = this.SER4C2.VALORTRAS + valor
                        } else {
                            let negativo = this.SER4C2.FACTURAS[i].CANT.indexOf('-')
                            let valor = parseInt(this.SER4C2.FACTURAS[i].VALOR.replace(/-/g, ''))
                            if (negativo >= 0) valor = valor * -1
                            if (isNaN(valor)) valor = 0
                            this.SER4C2.VALORMQ = this.SER4C2.VALORMQ + valor
                        }
                        valorfacturado_SER4C2.typedValue = this.SER4C2.VALORMQ.toString()
                        valorfacturado2_SER4C2.typedValue = this.SER4C2.VALORTRAS.toString()
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        },
        validarpaciente_SER4C2() {
            if (this.SER4C2.FURIP) {
                this.form.victima_SER4C2 = this.SER4C2.FURIP.ID_PACI
                this.form.descripVictima_SER4C2 = `${this.SER4C2.FURIP['1ER_APEL_PACI']} ${this.SER4C2.FURIP['2DO_APEL_PACI']} ${this.SER4C2.FURIP['1ER_NOM_PACI']} ${this.SER4C2.FURIP['2DO_NOM_PACI']}`
            } else {
                this.form.victima_SER4C2 = parseInt(this.SER4C2.NUMERACION.IDPAC_NUM).toString()
                this.form.descripVictima_SER4C2 = this.SER4C2.NUMERACION.PACIENTE_NUM
            }
            if (localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'MONI') {
                return setTimeout(() => {
                    SER866(this._evaluarnro_SER4C2, this._validartipoevento_SER4C2, this.form.naturaleza_SER4C2.substring(0, 2))
                }, 300)
            }

            let siniestros = this.SER4C2.SINIESTROS
            let seleccion = siniestros.filter(x => x.COD == SER4C2.TIPOEVENTW)
            // SE COLOCA CONDICION POR ACACIAS
            if (seleccion.length > 0 && $_USUA_GLOBAL[0].NIT != 892000264) {
                return this._validartipoevento_SER4C2(seleccion[0])
            }

            this._validartipoevento_SER4C2({ COD: '01', DESCRIP: 'ACCIDENTE DE TRANSITO' });
        },
        _validartipoevento_SER4C2(data) {
            this.form.naturaleza_SER4C2 = `${data.COD} ${data.DESCRIP}`
            if (data.COD.trim() == '15') {
                return this._evaluarotroevento_SER4C2()
            }

            document.getElementById('OTROEVENTO_SER4C2').classList.remove('hidden')
            let seleccion = '1'
            if (this.SER4C2.FURIP) seleccion = this.SER4C2.FURIP.CONDIC_FUR
            setTimeout(() => SER866A(this._evaluarnro_SER4C2, this.validarcondicion_SER4C2, seleccion), 300)
        },
        _evaluarotroevento_SER4C2() {
            document.getElementById('OTROEVENTO_SER4C2').classList.remove('hidden')
            validarInputs({
                form: '#OTRO_SER4C2',
                orden: '1'
            },
                () => {
                    document.getElementById('OTROEVENTO_SER4C2').classList.add('hidden')
                    setTimeout(() => SER866(this._evaluarnro_SER4C2, this._validartipoevento_SER4C2), 300);
                },
                () => {
                    seleccion = '1'
                    if (this.SER4C2.FURIP) seleccion = this.SER4C2.FURIP.CONDIC_FUR
                    setTimeout(() => SER866A(this._evaluarnro_SER4C2, this.validarcondicion_SER4C2), 300)
                }
            )
        },
        validarcondicion_SER4C2(data) {
            if (data.COD == '0' && this.form.naturaleza_SER4C2.substring(0, 2) == '01') {
                CON851('02', '02', null, 'error', 'Error');
                return setTimeout(() => { SER866A(this._evaluarnro_SER4C2, this.validarcondicion_SER4C2) }, 300);
            }

            this.form.condicion_SER4C2 = `${data.COD} ${data.DESCRIP}`
            this._evaluardireccionocurrencia_SER4C2()
        },
        _evaluardireccionocurrencia_SER4C2() {
            validarInputs({
                form: '#VALIDAR3_SER4C2',
                orden: '1'
            },
                () => {
                    setTimeout(() => SER866A(this._evaluarnro_SER4C2, this.validarcondicion_SER4C2), 300)
                },
                () => {
                    if (this.form.direcc_SER4C2.trim() == '') {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluardireccionocurrencia_SER4C2()
                    }

                    this._evaluarzonarural_SER4C2()
                }
            )
        },
        _evaluarzonarural_SER4C2() {
            if (this.form.zona_SER4C2.trim() == '') this.form.zona_SER4C2 = 'U'
            validarInputs({
                form: '#VALIDAR4_SER4C2',
                orden: '1'
            },
                () => {
                    setTimeout(() => SER866A(this._evaluarnro_SER4C2, this.validarcondicion_SER4C2), 300)
                },
                () => {
                    this.form.zona_SER4C2 = this.form.zona_SER4C2.toUpperCase()
                    if (this.form.zona_SER4C2.trim() == 'U' || this.form.zona_SER4C2.trim() == 'R') return this._evaluarciudadocurrencia_SER4C2()

                    CON851('03', '03', null, 'error', 'Error')
                    this._evaluarzonarural_SER4C2()
                }
            )
        },
        _evaluarciudadocurrencia_SER4C2() {
            this.form.ciudad_SER4C2.trim() == '' ? this.form.ciudad_SER4C2 = $_USUA_GLOBAL[0].COD_CIUD : this.form.ciudad_SER4C2 = this.form.ciudad_SER4C2.substring(0, 5)
            validarInputs({
                form: '#VALIDAR5_SER4C2',
                orden: '1'
            },
                () => {
                    setTimeout(() => SER866A(this._evaluarnro_SER4C2, this.validarcondicion_SER4C2), 300)
                },
                () => {
                    this.form.ciudad_SER4C2 = this.form.ciudad_SER4C2.padStart(5, '0')
                    postData(
                        { datosh: datosEnvio(), CIUDAD: this.form.ciudad_SER4C2 },
                        get_url("APP/CONTAB/CON809.DLL")
                    )
                        .then(data => {
                            this.form.ciudad_SER4C2 = `${this.form.ciudad_SER4C2} ${data.NOMBRE}`
                            this._evaluarfechaocurrido_SER4C2()
                        })
                        .catch(err => {
                            console.error(err)
                            this._evaluarciudadocurrencia_SER4C2()
                        })
                }
            )
        },
        _evaluarfechaocurrido_SER4C2() {
            if (fechaocurrMask.value.trim() == '') {
                fechaocurrMask.typedValue = moment().format('YYYYMMDD HHmm');
            }
            validarInputs({
                form: '#VALIDAR6_SER4C2',
                orden: '1'
            },
                () => { setTimeout(() => { SER866A(this._evaluarnro_SER4C2, this.validarcondicion_SER4C2) }, 300) },
                () => {
                    SER4C2.FECHAOCURW = fechaocurrMask.value
                    if (SER4C2.FECHAOCURW.length > 15) return this._evaluardescripcion_SER4C2()

                    CON851('03', '03', null, 'error', 'Error')
                    this._evaluarfechaocurrido_SER4C2()
                }
            )
        },
        _evaluardescripcion_SER4C2() {
            validarInputs({
                form: '#VALIDAR7_SER4C2',
                orden: '1'
            },
                () => { setTimeout(() => { SER866A(this._evaluarnro_SER4C2, this.validarcondicion_SER4C2) }, 300) },
                () => {
                    this.form.descripcionevento_SER4C2 = this.form.descripcionevento_SER4C2.toUpperCase()
                    if (this.form.naturaleza_SER4C2.substring(0, 2) != '01') return this._evaluardatoremision_SER4C2()
                    let seleccion = '1'
                    if (this.SER4C2.FURIP) seleccion = this.SER4C2.FURIP.ASEG_VEH_FUR
                    SER866B(this._evaluardescripcion_SER4C2, this._validarSER866B, seleccion)
                }
            )
        },
        _validarSER866B(data) {
            // SER4C2.ASEGVEHW = data.COD
            // $('#estadoAseg_SER4C2').val(data.COD + ' ' + SER4C2.ARRAYASEGURADO[data.COD]);
            this.form.estadoAseg_SER4C2 = `${data.COD} ${this.SER4C2.ARRAYASEGURADO[data.COD]}`

            if (data.COD == '3') return this._evaluarplacaaccidente_SER4C2()
            this._evaluarplacaaccidente_SER4C2()
        },
        _evaluarplacaaccidente_SER4C2() {
            validarInputs({
                form: '#VALIDAR8_SER4C2',
                orden: '1'
            },
                () => {
                    setTimeout(() => {
                        let seleccion = '1'
                        if (this.SER4C2.FURIP) seleccion = this.SER4C2.FURIP.ASEG_VEH_FUR
                        SER866B(this._evaluardescripcion_SER4C2, this._validarSER866B, seleccion)
                    }, 300)
                },
                () => {
                    this.form.placa_SER4C2 = this.form.placa_SER4C2.toUpperCase()
                    // var placas = SER4C2.CARROS;
                    // SER4C2.PLACAVEHW = $('#placa_SER4C2').val().toUpperCase();
                    // $('#placa_SER4C2').val(SER4C2.PLACAVEHW);
                    if (this.form.estadoAseg_SER4C2.substring(0, 1).trim() == '3') return this._evaluardatoremision_SER4C2()

                    if (this.form.placa_SER4C2.trim() == '') {
                        CON851('01', '01', null, 'error', 'Error')
                        return this._evaluarplacaaccidente_SER4C2()
                    }

                    postData(
                        {
                            datosh: datosEnvio(),
                            llave: this.form.placa_SER4C2.trim()
                        },
                        get_url("APP/SALUD/CER101.DLL")
                    )
                        .then(data => {
                            if ((data.SERV == '1' || data.SERV == '2' || data.SERV == '3' || data.SERV == '4' || data.SERV == '5' || data.SERV == '6' || data.SERV == '7') || this.form.estadoAseg_SER4C2.substring(0, 1) == '5') {
                                this.form.marca_SER4C2 = data.MARCA
                                this.form.tipoServ_SER4C2 = data.TIPO2

                                this.SER4C2.NTIPROPCAR = data.PROPIETARIO
                                this.SER4C2.CONDCAR = data.CONDUCTOR
                                return this._evaluarpolizaveh_SER4C2('1')
                            }

                            let { ipcRenderer } = require("electron");
                            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/CER101.html', placa: this.form.placa_SER4C2.trim() });
                            let vector = ['on', 'Actualizando maestro de carros...']
                            _EventocrearSegventana(vector, this._evaluarplacaaccidente_SER4C2);
                        }).catch(error => {
                            console.error(error);
                            let { ipcRenderer } = require("electron");
                            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/CER101.html', placa: this.form.placa_SER4C2.trim() });
                            let vector = ['on', 'Actualizando maestro de carros...']
                            _EventocrearSegventana(vector, this._evaluarplacaaccidente_SER4C2);
                        });
                }
            )
        },
        _evaluarpolizaveh_SER4C2(orden) {
            validarInputs({
                form: '#VALIDAR9_SER4C2',
                orden: orden
            },
                this._evaluarplacaaccidente_SER4C2,
                this._evaluarentidad_SER4C2
            )
        },
        _evaluarentidad_SER4C2() {
            this.form.entidad_SER4C2.trim() == '' ? this.SER4C2.NUMERACION.DESCRIP_NUM : null
            validarInputs({
                form: '#VALIDAR10_SER4C2',
                orden: '1'
            },
                () => this._evaluarpolizaveh_SER4C2('2'),
                () => {
                    if (this.SER4C2.NOVEDADW == '7') {
                        if (this.form.poliza_SER4C2.trim() == '') {
                            fechainipolMask.typedValue = ''
                        }
                    }
                    this._evaluarfechainipol_SER4C2()
                }
            )
        },
        _evaluarfechainipol_SER4C2() {
            validarInputs({
                form: '#VALIDAR11_SER4C2',
                orden: '1'
            },
                this._evaluarentidad_SER4C2,
                () => {
                    if (fechainipolMask.value.length >= 10) {
                        return this._evaluarintervinoautoridad_SER4C2()
                    }

                    CON851('03', '03', null, 'error', 'Error')
                    return this._evaluarfechainipol_SER4C2()
                }
            )
        },
        _evaluarintervinoautoridad_SER4C2() {
            validarInputs({
                form: '#VALIDAR12_SER4C2',
                orden: '1'
            },
                this._evaluarentidad_SER4C2,
                () => {
                    this.form.autorid_SER4C2 = this.form.autorid_SER4C2.toUpperCase()
                    if (this.form.autorid_SER4C2 == 'S' || this.form.autorid_SER4C2 == 'N') {
                        return this._evaluarcobroexcedente_SER4C2()
                    }

                    CON851('', 'Digite S o N', null, 'error', 'Error')
                    this._evaluarintervinoautoridad_SER4C2()
                }
            )
        },
        _evaluarcobroexcedente_SER4C2() {
            validarInputs({
                form: '#VALIDAR13_SER4C2',
                orden: '1'
            },
                this._evaluarintervinoautoridad_SER4C2,
                () => {
                    this.form.cobro_SER4C2 = this.form.cobro_SER4C2.toUpperCase()
                    if (this.form.cobro_SER4C2.trim() == 'S' || this.form.cobro_SER4C2.trim() == 'N') return this._evaluarfechafinpol_SER4C2()

                    CON851('', 'Digite S o N', null, 'error', 'Error')
                    this._evaluarcobroexcedente_SER4C2()
                }
            )
        },
        _evaluarfechafinpol_SER4C2() {
            validarInputs({
                form: '#VALIDAR14_SER4C2',
                orden: '1'
            },
                this._evaluarentidad_SER4C2,
                () => {
                    if (fechafinpolMask.value.length >= 10) {
                        return this._evaluaridpropietarioveh_SER4C2()
                    }

                    CON851('03', '03', null, 'error', 'Error')
                    this._evaluarfechafinpol_SER4C2()
                }
            )
        },
        _evaluaridpropietarioveh_SER4C2() {
            if (parseInt(this.form.propietario_SER4C2) == 0) {
                if (this.SER4C2.NTIPROPCAR) this.form.propietario_SER4C2 = this.SER4C2.NTIPROPCAR
            }
            validarInputs({
                form: '#VALIDAR15_SER4C2',
                orden: '1'
            },
                () => {
                    if (this.form.poliza_SER4C2.trim() == '') {
                        return this._evaluarintervinoautoridad_SER4C2()
                    }

                    this._evaluarfechafinpol_SER4C2()
                },
                () => {
                    this.form.propietario_SER4C2 = this.form.propietario_SER4C2.padStart(10, '0')
                    postData(
                        {
                            datosh: `${datosEnvio()}${this.form.propietario_SER4C2.padStart(10, '0')}|8|`,
                        },
                        get_url("APP/CONTAB/CON802_01.DLL")
                    )
                        .then(data => {
                            this.form.propietariod_SER4C2 = data.TERCER[0].DESCRIP_TER
                            this._evaluaridconductorveh_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            let { ipcRenderer } = require("electron")
                            ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: this.form.propietario_SER4C2.trim(), furip: true })
                            let vector = ['on', 'Actualizando maestro de terceros...']
                            _EventocrearSegventana(vector, this._evaluaridpropietarioveh_SER4C2)
                        })
                }
            )
        },
        _evaluaridconductorveh_SER4C2() {
            if (parseInt(this.form.conductor_SER4C2) == 0) {
                this.form.conductor_SER4C2 = this.SER4C2.CONDCAR
            }
            validarInputs({
                form: '#VALIDAR16_SER4C2',
                orden: '1'
            },
                this._evaluaridpropietarioveh_SER4C2,
                () => {
                    this.form.conductor_SER4C2 = this.form.conductor_SER4C2.padStart(10, '0')
                    postData(
                        {
                            datosh: `${datosEnvio()}${this.form.conductor_SER4C2.padStart(10, '0')}|8|`,
                        },
                        get_url("APP/CONTAB/CON802_01.DLL")
                    )
                        .then(data => {
                            this.form.conductord_SER4C2 = data.TERCER[0].DESCRIP_TER
                            this._evaluarplacaveh2_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            let { ipcRenderer } = require("electron")
                            ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: this.form.conductor_SER4C2.trim(), furip: true })
                            let vector = ['on', 'Actualizando maestro de terceros...']
                            _EventocrearSegventana(vector, this._evaluaridconductorveh_SER4C2)
                        })
                }
            )
        },
        _evaluarplacaveh2_SER4C2() {
            validarInputs({
                form: '#VALIDAR17_SER4C2',
                orden: '1'
            },
                this._evaluaridconductorveh_SER4C2,
                () => {
                    if (this.form.placa1_SER4C2.trim() == '') {
                        return this._evaluardatoremision_SER4C2()
                    }

                    this._evaluaridpropietarioveh2_SER4C2()
                }
            )
        },
        _evaluaridpropietarioveh2_SER4C2() {
            validarInputs({
                form: '#VALIDAR18_SER4C2',
                orden: '1'
            },
                this._evaluarplacaveh2_SER4C2,
                () => {
                    this.form.codProp1_SER4C2 = this.form.codProp1_SER4C2.padStart(10, '0')
                    postData(
                        {
                            datosh: `${datosEnvio()}${this.form.codProp1_SER4C2.padStart(10, '0')}|8|`,
                        },
                        get_url("APP/CONTAB/CON802_01.DLL")
                    )
                        .then(data => {
                            this.form.descripProp1_SER4C2 = data.TERCER[0].DESCRIP_TER
                            this._evaluarplacaveh3_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            let { ipcRenderer } = require("electron")
                            ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: this.form.codProp1_SER4C2.trim(), furip: true })
                            let vector = ['on', 'Actualizando maestro de terceros...']
                            _EventocrearSegventana(vector, this._evaluaridpropietarioveh2_SER4C2)
                        })
                }
            )
        },
        _evaluarplacaveh3_SER4C2() {
            validarInputs({
                form: '#VALIDAR19_SER4C2',
                orden: '1'
            },
                this._evaluaridpropietarioveh2_SER4C2,
                () => {
                    if (this.form.placa2_SER4C2.trim() == '') {
                        return this._evaluardatoremision_SER4C2()
                    }

                    this._evaluaridpropietarioveh3_SER4C2()
                }
            )
        },
        _evaluaridpropietarioveh3_SER4C2() {
            validarInputs({
                form: '#VALIDAR20_SER4C2',
                orden: '1'
            },
                this._evaluarplacaveh2_SER4C2,
                () => {
                    this.form.codProp2_SER4C2 = this.form.codProp2_SER4C2.padStart(10, '0')
                    postData(
                        {
                            datosh: `${datosEnvio()}${this.form.codProp2_SER4C2.padStart(10, '0')}|8|`,
                        },
                        get_url("APP/CONTAB/CON802_01.DLL")
                    )
                        .then(data => {
                            this.form.descripProp2_SER4C2 = data.TERCER[0].DESCRIP_TER
                            this._evaluardatoremision_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            let { ipcRenderer } = require("electron")
                            ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html', cliente: this.form.codProp2_SER4C2.trim(), furip: true })
                            let vector = ['on', 'Actualizando maestro de terceros...']
                            _EventocrearSegventana(vector, this._evaluaridpropietarioveh3_SER4C2)
                        })
                }
            )
        },
        _evaluardatoremision_SER4C2() {
            validarInputs({
                form: '#VALIDAR21_SER4C2',
                orden: '1'
            },
                () => {
                    if (this.form.placa2_SER4C2.trim() == '') return this._evaluarplacaveh2_SER4C2()
                    this._evaluarplacaveh3_SER4C2()
                },
                () => {
                    if (fecharemiMask.value.trim() == '0' || fecharemiMask.value.trim() == '') {
                        fecharemiMask.typedValue = '00000000'
                        return this._evaluardatoaceptacion_SER4C2()
                    }

                    this._evaluarcodipsremi_SER4C2()
                }
            )
        },
        _evaluarcodipsremi_SER4C2() {
            validarInputs({
                form: '#VALIDAR22_SER4C2',
                orden: '1'
            },
                this._evaluardatoremision_SER4C2,
                () => {
                    this.form.ipsOrg_SER4C2 = this.form.ipsOrg_SER4C2.padStart(12, '0')
                    postData(
                        {
                            datosh: datosEnvio(),
                            IPS: this.form.ipsOrg_SER4C2
                        },
                        get_url("APP/SALUD/SER813.DLL")
                    )
                        .then(data => {
                            this.form.ciudadRemi_SER4C2 = `${data.CODCIUDAD} ${data.CIUDAD}`
                            if (this.form.Remite_SER4C2.trim() == '') this.form.Remite_SER4C2 = data.FUNCIONARIO.trim()
                            if (this.form.cargo1_SER4C2.trim() == '') this.form.cargo1_SER4C2 = data.CARGO.trim()
                            this._evaluarpersremi_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluarcodipsremi_SER4C2()
                        })
                }
            )
        },
        _evaluarpersremi_SER4C2() {
            validarInputs({
                form: '#VALIDAR23_SER4C2',
                orden: '1'
            },
                this._evaluarcodipsremi_SER4C2,
                this._evaluarcargoremiw_SER4C2
            )
        },
        _evaluarcargoremiw_SER4C2() {
            validarInputs({
                form: '#VALIDAR24_SER4C2',
                orden: '1'
            },
                this._evaluarpersremi_SER4C2,
                this._evaluardatoaceptacion_SER4C2
            )
        },
        _evaluardatoaceptacion_SER4C2() {
            validarInputs({
                form: '#VALIDAR25_SER4C2',
                orden: '1'
            },
                this._evaluarcargoremiw_SER4C2,
                () => {
                    if (fechaacepMask_SER4C2.value.replace(/\//g, '') == 0 || fechaacepMask_SER4C2.value.trim() == '') {
                        fechaacepMask_SER4C2.typedValue = '00000000'
                        return this._evaluarplacaamb_SER4C2()
                    }

                    if (fechaacepMask_SER4C2.value.length < 16) {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluardatoaceptacion_SER4C2()
                    }

                    this._evaluarcodipsacep_SER4C2()
                }
            )
        },
        _evaluarcodipsacep_SER4C2() {
            validarInputs({
                form: '#VALIDAR26_SER4C2',
                orden: '1'
            },
                this._evaluardatoaceptacion_SER4C2,
                () => {
                    this.form.ipsDest_SER4C2 = this.form.ipsDest_SER4C2.padStart(12, '0')
                    postData(
                        {
                            datosh: datosEnvio(),
                            IPS: this.form.ipsDest_SER4C2
                        },
                        get_url("APP/SALUD/SER813.DLL")
                    )
                        .then(data => {
                            this.form.ciudadRemi2_SER4C2 = `${data.CODCIUDAD} ${data.CIUDAD}`
                            this.form.direccDestino_SER4C2 = data.DIRECCION.trim()
                            this.form.telefono_SER4C2 = data.TEL.trim()
                            if (this.form.persRecibe_SER4C2.trim() == '') this.form.persRecibe_SER4C2 = data.FUNCIONARIO.trim()
                            if (this.form.cargo2_SER4C2.trim() == '') this.form.cargo2_SER4C2 = data.CARGO.trim()
                            this._evaluarpersacep_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluarcodipsacep_SER4C2()
                        })
                }
            )
        },
        _evaluarpersacep_SER4C2() {
            validarInputs({
                form: '#VALIDAR27_SER4C2',
                orden: '1'
            },
                this._evaluarcodipsacep_SER4C2,
                this._evaluarcargoacep_SER4C2
            )
        },
        _evaluarcargoacep_SER4C2() {
            validarInputs({
                form: '#VALIDAR28_SER4C2',
                orden: '1'
            },
                this._evaluarpersremi_SER4C2,
                this._evaluarplacaamb_SER4C2
            )
        },
        _evaluarplacaamb_SER4C2() {
            validarInputs({
                form: '#VALIDAR29_SER4C2',
                orden: '1'
            },
                this._evaluarpersremi_SER4C2,
                () => {
                    this.form.placaAmb_SER4C2 = this.form.placaAmb_SER4C2.toUpperCase()

                    if (this.form.placaAmb_SER4C2.trim() == '') {
                        return this._evaluarfechaing_SER4C2()
                    }

                    postData(
                        {
                            datosh: datosEnvio(),
                            llave: this.form.placaAmb_SER4C2.trim()
                        },
                        get_url("APP/SALUD/CER101.DLL")
                    )
                        .then(data => {
                            if (data.AMBUL == '1' || data.AMBUL == '2') {
                                let ambul = {
                                    '1': 'BASICA',
                                    '2': 'MEDICADA',
                                    '3': 'NO APLICA',
                                    '': ''
                                }
                                this.form.tipoTransp_SER4C2 = `${data.AMBUL} - ${ambul[data.AMBUL]}`
                                return this._evaluardatozonaamb_SER4C2()
                            }

                            CON851('2F', '2F', null, 'warning', 'Advertencia')
                            let { ipcRenderer } = require("electron")
                            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/CER101.html', placa: this.form.placaAmb_SER4C2.trim() })
                            let vector = ['on', 'Actualizando maestro de carros...']
                            _EventocrearSegventana(vector, this._evaluarplacaamb_SER4C2)
                        })
                        .catch(error => {
                            console.error(error)
                            let { ipcRenderer } = require("electron")
                            ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/CER101.html', placa: this.form.placaAmb_SER4C2.trim() })
                            let vector = ['on', 'Actualizando maestro de carros...']
                            _EventocrearSegventana(vector, this._evaluarplacaamb_SER4C2)
                        })
                }
            )
        },
        _evaluardatozonaamb_SER4C2() {
            validarInputs({
                form: '#VALIDAR31_SER4C2',
                orden: '1'
            },
                this._evaluarplacaamb_SER4C2,
                () => {
                    this.form.Envios_SER4C2 = this.form.Envios_SER4C2.toUpperCase()
                    if (this.form.Envios_SER4C2.trim() == 'U' || this.form.Envios_SER4C2.trim() == 'R') {
                        let zona = {
                            'U': 'URB.',
                            'R': 'RURAL'
                        }
                        this.form.Envios_SER4C2 = `${this.form.Envios_SER4C2} ${zona[this.form.Envios_SER4C2]}`
                        return this._evaluardesdeamb_SER4C2()
                    }

                    CON851('03', '03', null, 'error', 'Error')
                    this._evaluardatozonaamb_SER4C2()
                }
            )
        },
        _evaluardesdeamb_SER4C2() {
            validarInputs({
                form: '#VALIDAR32_SER4C2',
                orden: '1'
            },
                this._evaluardatozonaamb_SER4C2,
                () => {
                    if (this.form.transpDesde_SER4C2.trim() == '') {
                        CON851('02', '02', null, 'error', 'Error')
                        this._evaluardesdeamb_SER4C2()
                    }
                    // this.SER4C2.AMBDESDE1 = this.form.transpDesde_SER4C2.substring(0,20)
                    // this.SER4C2.AMBDESDE2 = this.form.transpDesde_SER4C2.substring(20,40)
                    this._evaluarhastaamb_SER4C2()
                }
            )
        },
        _evaluarhastaamb_SER4C2() {
            validarInputs({
                form: '#VALIDAR33_SER4C2',
                orden: '1'
            },
                this._evaluardesdeamb_SER4C2,
                () => {
                    if (this.form.transpHasta_SER4C2.trim() == '') {
                        CON851('02', '02', null, 'error', 'Error')
                        return this._evaluarhastaamb_SER4C2()
                    }
                    this.SER4C2.AMBHASTA1 = this.form.transpHasta_SER4C2.substring(0,20)
                    this.SER4C2.AMBHASTA2 = this.form.transpHasta_SER4C2.substring(20,40)
                    this._evaluarfechaing_SER4C2()
                }
            )
        },
        _evaluarfechaing_SER4C2() {
            validarInputs({
                form: '#VALIDAR34_SER4C2',
                orden: '1'
            },
                () => {
                    if (this.form.transpHasta_SER4C2.trim() == '') return this._evaluarplacaamb_SER4C2()
                    this._evaluarhastaamb_SER4C2()
                },
                () => {
                    if (fechaingMask_SER4C2.value.length > 15) {
                        return this._evaluardatodiag1ing_SER4C2()
                    }

                    CON851('', 'El formato de la fecha no esta completo recuerde que debe ser AÑO/MES/DIA HORA/MINUTO', null, 'error', 'Error');
                    return this._evaluarfechaing_SER4C2()
                }
            )
        },
        _evaluardatodiag1ing_SER4C2() {
            validarInputs({
                form: '#VALIDAR35_SER4C2',
                orden: '1'
            },
                this._evaluarfechaing_SER4C2,
                () => {
                    postData(
                        {
                            datosh: datosEnvio(),
                            codigo: this.form.DiagPrinIng_SER4C2.trim(),
                            paso: '1'
                        },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluardatodiag1ing_SER4C2()
                            }

                            this.form.descriPrinDiagIng_SER4C2 = data.NOMBRE_ENF
                            this._evaluardatodiag2ing_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluardatodiag1ing_SER4C2()
                        })
                }
            )
        },
        _evaluardatodiag2ing_SER4C2() {
            validarInputs({
                form: '#VALIDAR36_SER4C2',
                orden: '1'
            },
                this._evaluardatodiag1ing_SER4C2,
                () => {
                    if (this.form.otrDiagIng1_SER4C2.trim() == '') return this._evaluardatodiag3ing_SER4C2()
                    postData(
                        {
                            datosh: datosEnvio(),
                            codigo: this.form.otrDiagIng1_SER4C2.trim(),
                            paso: '1'
                        },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluardatodiag2ing_SER4C2()
                            }

                            this.form.descripotrDiagIng1_SER4C2 = data.NOMBRE_ENF
                            this._evaluardatodiag3ing_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluardatodiag2ing_SER4C2()
                        })
                }
            )
        },
        _evaluardatodiag3ing_SER4C2() {
            validarInputs({
                form: '#VALIDAR37_SER4C2',
                orden: '1'
            },
                this._evaluardatodiag2ing_SER4C2,
                () => {
                    if (this.form.otrDiagIng2_SER4C2.trim() == '') return this._evaluarfechaegr_SER4C2()
                    postData(
                        {
                            datosh: datosEnvio(),
                            codigo: this.form.otrDiagIng2_SER4C2.trim(),
                            paso: '1'
                        },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluardatodiag3ing_SER4C2()
                            }

                            this.form.descripotrDiagIng2S_SER4C2 = data.NOMBRE_ENF
                            this._evaluarfechaegr_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluardatodiag3ing_SER4C2()
                        })
                }
            )
        },
        _evaluarfechaegr_SER4C2() {
            validarInputs({
                form: '#VALIDAR38_SER4C2',
                orden: '1'
            },
                this._evaluardatodiag1ing_SER4C2,
                () => {
                    SER4C2.FECHAEGRW = fechaegrMask_SER4C2.value;
                    if (fechaegrMask_SER4C2.value.trim() == '') {
                        return this._evaluardatodiag1egr_SER4C2()
                    }

                    if (fechaocurrMask.value.length > 15) {
                        if (fechaingMask_SER4C2.value.replace(/\//g, '') > fechaegrMask_SER4C2.value.replace(/\//g, '')) {
                            return this._evaluarfechaegr_SER4C2()
                        }

                        return this._evaluardatodiag1egr_SER4C2()
                    }

                    CON851('', 'El formato de la fecha no esta completo recuerde que debe ser AÑO/MES/DIA HORA/MINUTO', null, 'error', 'Error')
                    this._evaluarfechaegr_SER4C2()
                }
            )
        },
        _evaluardatodiag1egr_SER4C2() {
            validarInputs({
                form: '#VALIDAR39_SER4C2',
                orden: '1'
            },
                this._evaluarfechaegr_SER4C2,
                () => {
                    if (this.form.DiagPrinEgr_SER4C2.trim() == '') return this._evaluardatomedico_SER4C2()
                    postData(
                        {
                            datosh: datosEnvio(),
                            codigo: this.form.DiagPrinEgr_SER4C2.trim(),
                            paso: '1'
                        },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluardatodiag1egr_SER4C2()
                            }

                            this.form.descriPrinDiagEgr_SER4C2 = data.NOMBRE_ENF
                            this._evaluardatodiag2egr_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluardatodiag1egr_SER4C2()
                        })
                }
            )
        },
        _evaluardatodiag2egr_SER4C2() {
            validarInputs({
                form: '#VALIDAR40_SER4C2',
                orden: '1'
            },
                this._evaluardatodiag1egr_SER4C2,
                () => {
                    if (this.form.otrDiagEgr1_SER4C2.trim() == '') return this._evaluardatodiag3egr_SER4C2()
                    postData(
                        {
                            datosh: datosEnvio(),
                            codigo: this.form.otrDiagEgr1_SER4C2.trim(),
                            paso: '1'
                        },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluardatodiag2egr_SER4C2()
                            }

                            this.form.descripotrDiagEgr1_SER4C2 = data.NOMBRE_ENF
                            this._evaluardatodiag3egr_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluardatodiag2egr_SER4C2()
                        })
                }
            )
        },
        _evaluardatodiag3egr_SER4C2() {
            validarInputs({
                form: '#VALIDAR41_SER4C2',
                orden: '1'
            },
                this._evaluardatodiag2egr_SER4C2,
                () => {
                    if (this.form.otrDiagEgr2_SER4C2.trim() == '') return this._evaluardatomedico_SER4C2()
                    postData(
                        {
                            datosh: datosEnvio(),
                            codigo: this.form.otrDiagEgr2_SER4C2.trim(),
                            paso: '1'
                        },
                        get_url("APP/SALUD/SER851.DLL")
                    )
                        .then(data => {
                            if (data.NOMBRE_ENF == "No se encontro diagnostico" || data.COD_ENF.trim() == '') {
                                CON851('02', '02', null, 'error', 'Error')
                                return this._evaluardatodiag3egr_SER4C2()
                            }

                            this.form.descripotrDiagEgr2S_SER4C2 = data.NOMBRE_ENF
                            this._evaluardatomedico_SER4C2()
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluardatodiag3egr_SER4C2()
                        })
                }
            )
        },
        _evaluardatomedico_SER4C2() {
            validarInputs({
                form: '#VALIDAR42_SER4C2',
                orden: '1'
            },
                this._evaluardatodiag1egr_SER4C2,
                () => {
                    SER4C2.MEDATIW = $('#medicoTratante_SER4C2').val();
                    if (this.form.medicoTratante_SER4C2.trim() == '') {
                        CON851('03', '03', null, 'error', 'Error')
                        return this._evaluardatomedico_SER4C2()
                    }

                    if (parseInt(this.form.medicoTratante_SER4C2.trim()) == 0) {
                        CON851('02', '02', null, 'error', 'Error')
                        return this._evaluardatomedico_SER4C2()
                    }

                    postData(
                        { datosh: `${datosEnvio()}5||||${this.form.medicoTratante_SER4C2.padStart(10, '0')}|||||||||||` },
                        get_url("APP/SALUD/SAL401.DLL")
                    )
                        .then((data) => {
                            this.form.descripMedicoTratante_SER4C2 = data.DESCRIPCION
                            this.SER4C2.REGMED = data.REG_MED
                            postData(
                                { datosh: `${datosEnvio()}${this.form.prefijo_SER4C2}${this.form.factura_SER4C2}|` },
                                get_url("APP/SALUD/SER4C2.DLL")
                            )
                                .then(data => {
                                    this.SER4C2.FACTURAS = data.FACTURA
                                    this.SER4C2.VALORMQ = 0
                                    this.SER4C2.VALORTRAS = 0
                                    for (var i in this.SER4C2.FACTURAS) {
                                        if (this.SER4C2.FACTURAS[i].CUPS.substring(0, 2) == 'S3') {
                                            let valor = parseFloat(this.SER4C2.FACTURAS[i].VALOR)
                                            if (isNaN(valor)) valor = 0
                                            this.SER4C2.VALORTRAS = this.SER4C2.VALORTRAS + valor
                                        } else {
                                            let negativo = this.SER4C2.FACTURAS[i].CANT.indexOf('-')
                                            let valor = parseInt(this.SER4C2.FACTURAS[i].VALOR.replace(/-/g, ''))
                                            if (negativo >= 0) valor = valor * -1
                                            if (isNaN(valor)) valor = 0
                                            this.SER4C2.VALORMQ = this.SER4C2.VALORMQ + valor
                                        }
                                        valorfacturado_SER4C2.typedValue = this.SER4C2.VALORMQ.toString()
                                        valorreclamado_SER4C2.typedValue = '0'
                                        valorfacturado2_SER4C2.typedValue = this.SER4C2.VALORTRAS.toString()
                                        valorreclamado2_SER4C2.typedValue = '0'
                                    }
                                    this._evaluardatomqfact_SER4C2()
                                })
                                .catch(err => {
                                    console.error(err)
                                    this._evaluardatomedico_SER4C2()
                                })
                        })
                        .catch(error => {
                            console.error(error)
                            this._evaluardatomedico_SER4C2()
                        })
                }
            )
        },
        _evaluardatomqfact_SER4C2() {
            validarInputs({
                form: '#VALIDAR43_SER4C2',
                orden: '1'
            },
                this._evaluardatomedico_SER4C2,
                this._evaluarmqrecla_SER4C2
            )
        },
        _evaluarmqrecla_SER4C2() {
            validarInputs({
                form: '#VALIDAR44_SER4C2',
                orden: '1'
            },
                this._evaluardatomqfact_SER4C2,
                this._evaluartrfact_SER4C2
            )
        },
        _evaluartrfact_SER4C2() {
            validarInputs({
                form: '#VALIDAR45_SER4C2',
                orden: '1'
            },
                this._evaluarmqrecla_SER4C2,
                this._evaluartrrecla_SER4C2
            )
        },
        _evaluartrrecla_SER4C2() {
            validarInputs({
                form: '#VALIDAR46_SER4C2',
                orden: '1'
            },
                this._evaluartrfact_SER4C2,
                this._evaluarnrorad_SER4C2
            )
        },
        _evaluarnrorad_SER4C2() {
            validarInputs({
                form: '#VALIDAR47_SER4C2',
                orden: '1'
            },
                this._evaluartrfact_SER4C2,
                () => {
                    if (localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'MONI') {
                        if (fecharadMask_SER4C2.value.trim() == '') fecharadMask_SER4C2.typedValue = '00000000'
                        return this._evaluardatoradant_SER4C2()
                    }

                    this._evaluarfecharad_SER4C2()
                }
            )
        },
        _evaluarfecharad_SER4C2() {
            if (localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'MONI') {
                if (fecharadMask_SER4C2.value.trim() == '') fecharadMask_SER4C2.typedValue = '00000000'
            }
            validarInputs({
                form: '#VALIDAR48_SER4C2',
                orden: '1'
            },
                this._evaluarnrorad_SER4C2,
                () => {
                    SER4C2.FECHARADW = fecharadMask_SER4C2.value;
                    if (fecharadMask_SER4C2.value.trim() == '' || fecharadMask_SER4C2.value.trim() == '0') {
                        fecharadMask_SER4C2.typedValue = '00000000'
                        return this._evaluardatoradant_SER4C2()
                    }

                    if (SER4C2.FECHARADW.length > 9) {
                        return this._evaluardatoradant_SER4C2('1')
                    }

                    CON851('03', '03', null, 'error', 'Error')
                    this._evaluarfecharad_SER4C2()
                }
            )
        },
        _evaluardatoradant_SER4C2(orden) {
            validarInputs({
                form: '#VALIDAR49_SER4C2',
                orden: orden
            },
                this._evaluarnrorad_SER4C2,
                () => {
                    CON851P('01', this._evaluardatomqfact_SER4C2, this._validarguardar_SER4C2);
                }
            )
        },
        _validarguardar_SER4C2() {
            // SE BORRA EL CONDUCTOR DE LA AMBULANCIA
            let datosenvio = `${this.form.prefijo_SER4C2}${this.form.factura_SER4C2}|${this.form.victima_SER4C2.trim().padStart(15, '0')}|${this.form.condicion_SER4C2.substring(0, 1)}|${this.form.naturaleza_SER4C2.substring(0, 2)}|`
            datosenvio += `${this.form.otroevent_SER4C2.trim()}|${this.form.direcc_SER4C2}|${fechaocurrMask.value.replace(/\//g, '').substring(0, 8)}|${fechaocurrMask.value.replace(/:/g, '').substring(11, 15)}|${this.form.ciudad_SER4C2.substring(0, 5)}|${this.form.zona_SER4C2}|${this.form.descripcionevento_SER4C2.replace(/\n/g, '&').padEnd(270, ' ')}|`
            datosenvio += `${fecharemiMask.value.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|${this.form.ipsOrg_SER4C2}|${this.form.Remite_SER4C2}|${this.form.cargo1_SER4C2}|${fechaacepMask_SER4C2.value.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|${this.form.ipsDest_SER4C2}|${this.form.persRecibe_SER4C2}|`
            datosenvio += `${this.form.cargo2_SER4C2}|${fechaacepMask_SER4C2.value.replace(/:/g, '').substring(11, 15).padEnd(4, '0')}|${fecharemiMask.value.replace(/:/g, '').substring(11, 15).padEnd(4, '0')}|${this.form.placaAmb_SER4C2}||${this.form.transpDesde_SER4C2.substring(0,20)}|${this.form.transpHasta_SER4C2.substring(0,20)}|`
            datosenvio += ` |${this.form.Envios_SER4C2}|${fechaingMask_SER4C2.value.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|${fechaingMask_SER4C2.value.replace(/:/g, '').substring(11, 15).padEnd(4, '0')}|${fechaegrMask_SER4C2.value.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|${fechaegrMask_SER4C2.value.replace(/:/g, '').substring(11, 15).padEnd(4, '0')}|${this.form.DiagPrinIng_SER4C2}|`
            datosenvio += `${this.form.otrDiagIng1_SER4C2}|${this.form.otrDiagIng2_SER4C2}|${this.form.DiagPrinEgr_SER4C2}|${this.form.otrDiagEgr1_SER4C2}|${this.form.otrDiagEgr2_SER4C2}|${this.form.medicoTratante_SER4C2.trim().padStart(10, '0')}|${this.form.folios_SER4C2}|`
            datosenvio += `${this.form.estadoAseg_SER4C2.substring(0, 1)}|${this.form.placa_SER4C2}|${this.form.entidad_SER4C2}|${this.form.poliza_SER4C2}|${fechainipolMask.value.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|${fechafinpolMask.value.replace(/\//g, '').substring(0, 8).padEnd(8, '0')}|`
            datosenvio += `${this.form.autorid_SER4C2}|${this.form.cobro_SER4C2}|${this.form.propietario_SER4C2}|${this.form.conductor_SER4C2}|${this.form.placa1_SER4C2}|${this.form.codProp1_SER4C2}|`
            datosenvio += `${this.form.placa2_SER4C2}|${this.form.codProp2_SER4C2}|${valorfacturado_SER4C2.value.replace(/,/g, '').padStart(15, '0')}|${valorreclamado_SER4C2.value.replace(/,/g, '').padStart(15, '0')}|${valorfacturado2_SER4C2.value.replace(/,/g, '').padStart(15, '0')}|${valorreclamado2_SER4C2.value.replace(/,/g, '').padStart(15, '0')}|`
            datosenvio += `${this.form.poliza2_SER4C2}|${this.form.nroRadic_SER4C2}|${fecharadMask_SER4C2.value.replace(/\//g, '').substring(0, 8)}|${this.form.radicAnt_SER4C2}|${localStorage.Usuario}|${this.form.transpDesde_SER4C2.substring(20,40)}|${this.form.transpHasta_SER4C2.substring(20,40)}|`
            postData(
                { datosh: `${datosEnvio()}${datosenvio}` },
                get_url("APP/SALUD/SER4C2-01.DLL")
            )
                .then(data => {
                    $('#IMPRESION_SER4C2').removeClass('hidden')
                    this._evaluarimpresion_SER4C2()
                })
                .catch(err => {
                    console.error(err)
                    this._evaluardatoradant_SER4C2('2')
                })
        },
        _evaluarrecalculovalor_SER4C2() {
            setTimeout(() => CON851P('Desea recalcular valor facturado', this._evaluarimpresion_SER4C2, this._validarfacturaarecalcular_SERC42))
        },
        _validarfacturaarecalcular_SERC42() {
            postData(
                { datosh: `${datosEnvio()}${this.form.prefijo_SER4C2}${this.form.factura_SER4C2}|` },
                get_url("APP/SALUD/SER4C2.DLL")
            )
                .then(data => {
                    this.SER4C2.FACTURAS = data.FACTURA
                    this.SER4C2.VALORMQ = 0
                    this.SER4C2.VALORTRAS = 0
                    for (var i in this.SER4C2.FACTURAS) {
                        if (this.SER4C2.FACTURAS[i].CUPS.substring(0, 2) == 'S3') {
                            let valor = parseFloat(this.SER4C2.FACTURAS[i].VALOR)
                            if (isNaN(valor)) valor = 0
                            this.SER4C2.VALORTRAS = this.SER4C2.VALORTRAS + valor
                        } else {
                            let negativo = this.SER4C2.FACTURAS[i].CANT.indexOf('-')
                            let valor = parseInt(this.SER4C2.FACTURAS[i].VALOR.replace(/-/g, ''))
                            if (negativo >= 0) valor = valor * -1
                            if (isNaN(valor)) valor = 0
                            this.SER4C2.VALORMQ = this.SER4C2.VALORMQ + valor
                        }
                        valorfacturado_SER4C2.typedValue = this.SER4C2.VALORMQ.toString()
                        valorfacturado2_SER4C2.typedValue = this.SER4C2.VALORTRAS.toString()
                    }
                    this._evaluardatomqfact_SER4C2()
                })
                .catch(err => {
                    console.error(err)
                    this._evaluarnro_SER4C2()
                })
        },
        _evaluarimpresion_SER4C2() {
            this.form.impresion_SER4C2 = 'S'
            validarInputs({
                form: '#VALIDAR50_SER4C2',
                orden: '1'
            },
                () => {
                    document.getElementById('IMPRESION_SER4C2').classList.add('hidden')
                    this._evaluarnro_SER4C2()
                },
                () => {
                    this.form.impresion_SER4C2 = this.form.impresion_SER4C2.toUpperCase()
                    if (this.form.impresion_SER4C2.trim() == 'S') {
                        return this._impresion_SER4C2()
                    }

                    CON851('03', '03', null, 'error', 'Error')
                    this._evaluarimpresion_SER4C2()
                }
            )
        },
        _impresion_SER4C2() {
            postData(
                { datosh: `${datosEnvio()}1|${this.form.prefijo_SER4C2}${this.form.factura_SER4C2}|` },
                get_url("APP/SALUD/SER4C2P.DLL")
            )
                .then(data => {
                    this.SER4C2.FURIP = data.FACTURA[0]
                    this.SER4C2.impresion = new Object
                    this.SER4C2.impresion.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE
                    this.SER4C2.impresion.NIT = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0')
                    this.SER4C2.impresion.FECHA = moment().format('MMM DD/YY')
                    this.SER4C2.impresion.FECHAACTW = fechaocurrMask.value.replace(/\//g, '').split('')
                    this.SER4C2.impresion.FECHAACTWWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4]
                    this.SER4C2.impresion.NRORADFUR = this.form.nroRadic_SER4C2
                    this.SER4C2.impresion.NRORADANTFUR = this.form.radicAnt_SER4C2
                    this.SER4C2.impresion.PREFIJOFUR = this.form.prefijo_SER4C2
                    this.SER4C2.impresion.NROFUR = this.form.factura_SER4C2
                    this.SER4C2.impresion.OPERBLOQNUM = this.SER4C2.FURIP.OPER_BLOQ_NUM
                    this.SER4C2.impresion.OPERNUM = this.SER4C2.FURIP.OPER_NUM
                    this.SER4C2.impresion.ADMINW = localStorage.Usuario.trim()
                    this.SER4C2.impresion.SUCW = $_USUA_GLOBAL[0].PREFIJ
                    this.SER4C2.impresion.CODIGOHABILITACION = `${$_USUA_GLOBAL[0].COD_CIUD}${$_USUA_GLOBAL[0].NUIR}${this.SER4C2.impresion.SUCW}`.split('')
                    this.SER4C2.impresion.CODIGOHABILITACIONWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
                    if (!$.isNumeric($_USUA_GLOBAL[0].PREFIJ)) this.SER4C2.impresion.SUCW = '01';
                    // SER4C2.impresion.NITUSU = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0').split('');
                    this.SER4C2.impresion.NITUSU = $_USUA_GLOBAL[0].NIT.toString().padStart(10, ' ').split('')
                    this.SER4C2.impresion.NITUSUWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
                    this.SER4C2.impresion.PRIMERAPELLIDO = this.SER4C2.FURIP['1ER_APEL_PACI'];
                    this.SER4C2.impresion.SEGUNDOAPELLIDO = this.SER4C2.FURIP['2DO_APEL_PACI'];
                    this.SER4C2.impresion.PRIMERNOMBRE = this.SER4C2.FURIP['1ER_NOM_PACI'];
                    this.SER4C2.impresion.SEGUNDONOMBRE = this.SER4C2.FURIP['2DO_NOM_PACI'];
                    this.SER4C2.impresion.CC = this.SER4C2.impresion.CE = this.SER4C2.impresion.PA = this.SER4C2.impresion.TI = this.SER4C2.impresion.RC = this.SER4C2.impresion.AS = this.SER4C2.impresion.MS = ' ';
                    this.SER4C2.impresion.TIPOIDPACI = this.SER4C2.FURIP.TIPO_ID_PACI;
                    if (this.SER4C2.FURIP.TIPO_ID_PACI.trim() == 'CC') this.SER4C2.impresion.CC = 'X'
                    if (this.SER4C2.FURIP.TIPO_ID_PACI.trim() == 'CE') this.SER4C2.impresion.CE = 'X'
                    if (this.SER4C2.FURIP.TIPO_ID_PACI.trim() == 'PA') this.SER4C2.impresion.PA = 'X'
                    if (this.SER4C2.FURIP.TIPO_ID_PACI.trim() == 'TI') this.SER4C2.impresion.TI = 'X'
                    if (this.SER4C2.FURIP.TIPO_ID_PACI.trim() == 'RC') this.SER4C2.impresion.RC = 'X'
                    if (this.SER4C2.FURIP.TIPO_ID_PACI.trim() == 'AS') this.SER4C2.impresion.AS = 'X'
                    if (this.SER4C2.FURIP.TIPO_ID_PACI.trim() == 'MS') this.SER4C2.impresion.MS = 'X'
                    // SER4C2.impresion.CODPACI = SER4C2.FURIP.ID_PACI.trim().padStart(15, '0').split('');
                    this.SER4C2.impresion.CODPACI = this.SER4C2.FURIP.ID_PACI.trim().padStart(15, ' ').split('');
                    this.SER4C2.impresion.CODPACIWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
                    this.SER4C2.impresion.FECHAPACI = this.SER4C2.FURIP.NACIM_PACI.trim().split('');
                    this.SER4C2.impresion.FECHAPACIWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4];
                    if (this.SER4C2.FURIP.SEXO_PACI == 'F') this.SER4C2.impresion.SEXOPACI1 = 'X', this.SER4C2.impresion.SEXOPACI2 = ' '
                    else this.SER4C2.impresion.SEXOPACI1 = ' ', this.SER4C2.impresion.SEXOPACI2 = 'X';
                    this.SER4C2.impresion.DIRECPACI = this.SER4C2.FURIP.DIRECC_PACI.trim().padEnd(30, ' ').split('');
                    this.SER4C2.impresion.DIRECPACIWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
                    this.SER4C2.impresion.DVUSU = $_USUA_GLOBAL[0].DV;
                    this.SER4C2.impresion.NOMBREDEPARTAMENTO = this.SER4C2.FURIP.NOMBRE_CIU_PACI.trim().padEnd(20, ' ').split('');
                    this.SER4C2.impresion.NOMBREDEPARTAMENTOWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
                    this.SER4C2.impresion.CODDPTO = this.SER4C2.FURIP.DPTO_PACI.trim().padEnd(2, ' ').split('');
                    this.SER4C2.impresion.TELEFONOPACI = this.SER4C2.FURIP.TELEF_PACI.trim().padEnd(12, ' ').split('');
                    this.SER4C2.impresion.TELEFONOPACIWIDTH = ['7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%', '7.6%'];
                    this.SER4C2.impresion.NOMBREMUNICIPIO = this.SER4C2.FURIP.NOMBRE_CIU2_PACI.trim().padEnd(20, ' ').split('');
                    this.SER4C2.impresion.NOMBREMUNICIPIOWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                    this.SER4C2.impresion.CIUDPACI = this.SER4C2.FURIP.CIUD_PACI.trim().padEnd(3, ' ').split('');
                    this.SER4C2.impresion.CONDUCTOR = this.SER4C2.impresion.PEATON = this.SER4C2.impresion.OCUPANTE = this.SER4C2.impresion.CICLISTA = ' ';
                    if (this.SER4C2.FURIP.CONDIC_FUR.trim() == '1') this.SER4C2.impresion.CONDUCTOR = 'X'
                    if (this.SER4C2.FURIP.CONDIC_FUR.trim() == '2') this.SER4C2.impresion.PEATON = 'X'
                    if (this.SER4C2.FURIP.CONDIC_FUR.trim() == '3') this.SER4C2.impresion.OCUPANTE = 'X'
                    if (this.SER4C2.FURIP.CONDIC_FUR.trim() == '4') this.SER4C2.impresion.CICLISTA = 'X'
                    this.SER4C2.impresion.ACCIDENTETRANSITO = this.SER4C2.impresion.SISMO = this.SER4C2.impresion.MAREMOTO = this.SER4C2.impresion.ERUPCIONESVOLCANICAS = this.SER4C2.impresion.HURACAN = this.SER4C2.impresion.EXPLOSION = this.SER4C2.impresion.MASACRE = this.SER4C2.impresion.MINAANTIPERSONAL = this.SER4C2.impresion.COMBATE = this.SER4C2.impresion.INCENDIO = this.SER4C2.impresion.ATAQUESMUNICIPOS = this.SER4C2.impresion.OTROS = this.SER4C2.impresion.INUNDACIONES = this.SER4C2.impresion.AVALANCHA = this.SER4C2.impresion.DESLIZAMIENTOSDETIERRA = this.SER4C2.impresion.INCENDIONATURAL = ' ';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '01') this.SER4C2.impresion.ACCIDENTETRANSITO = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '02') this.SER4C2.impresion.SISMO = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '03') this.SER4C2.impresion.MAREMOTO = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '04') this.SER4C2.impresion.ERUPCIONESVOLCANICAS = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '05') this.SER4C2.impresion.DESLIZAMIENTOSDETIERRA = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '06') this.SER4C2.impresion.INUNDACIONES = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '07') this.SER4C2.impresion.AVALANCHA = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '08') this.SER4C2.impresion.INCENDIONATURAL = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '09') this.SER4C2.impresion.EXPLOSION = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '10') this.SER4C2.impresion.INCENDIO = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '11') this.SER4C2.impresion.COMBATE = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '12') this.SER4C2.impresion.ATAQUESMUNICIPOS = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '13') this.SER4C2.impresion.MASACRE = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '15') this.SER4C2.impresion.OTROS = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '16') this.SER4C2.impresion.HURACAN = 'X';
                    if (this.SER4C2.FURIP.TIPO_EVEN_FUR.trim() == '18') this.SER4C2.impresion.MINAANTIPERSONAL = 'X';
                    this.SER4C2.impresion.OTREVENTFUR = this.SER4C2.FURIP.OTR_EVEN_FUR.trim().padEnd(25, ' ').split('');
                    this.SER4C2.impresion.OTREVENTFURWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
                    this.SER4C2.impresion.DIROCURFUR = this.SER4C2.FURIP.DIR_OCUR_FUR.substring(0, 30).trim().padEnd(30, ' ').split('');
                    this.SER4C2.impresion.DIROCURFURWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
                    this.SER4C2.impresion.FECHAOCURFUR = this.SER4C2.FURIP.FECHA_OCUR_FUR.trim().split('');
                    this.SER4C2.impresion.FECHAWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4];
                    this.SER4C2.impresion.HORAOCURFUR = this.SER4C2.FURIP.HORA_OCUR_FUR.split('');
                    this.SER4C2.impresion.HORAWIDTH = [4, 4, 4, 4, 4];
                    this.SER4C2.impresion.DEPARTAMENTOOCURFUR = this.SER4C2.FURIP.NOM_CIUD2_OCUR_FUR.trim().padEnd(20, ' ').split('');
                    this.SER4C2.impresion.CODDPTOOCURFUR = this.SER4C2.FURIP.COD_CIUD2_OCUR_FUR.trim().padEnd(2, ' ').split('');
                    this.SER4C2.impresion.MUNICIPIOOCURFUR = this.SER4C2.FURIP.NOM_CIUD_OCUR_FUR.trim().padEnd(20, ' ').split('');
                    this.SER4C2.impresion.CODDCIUOCURFUR = this.SER4C2.FURIP.CIUD_OCUR_FUR.trim().padEnd(3, ' ').split('');
                    this.SER4C2.impresion.ZONAOCUR1 = this.SER4C2.impresion.ZONAOCUR2 = ' ';
                    if (this.SER4C2.FURIP.ZONA_OCUR_FUR == 'U') this.SER4C2.impresion.ZONAOCUR1 = 'X'
                    if (this.SER4C2.FURIP.ZONA_OCUR_FUR == 'R') this.SER4C2.impresion.ZONAOCUR2 = 'X'
                    this.SER4C2.impresion.DESCRIPOCURFUR = this.form.descripcionevento_SER4C2.replace(/&/g, /\n/);
                    this.SER4C2.impresion.ASEGURADO = this.SER4C2.impresion.NOASEGURADO = this.SER4C2.impresion.VEHICULOFANTASMA = this.SER4C2.impresion.POLIZAFALSA = this.SER4C2.impresion.VEHICULOENFUGA = ' ';
                    if (this.SER4C2.FURIP.ASEG_VEH_FUR == '1') this.SER4C2.impresion.ASEGURADO = 'X'
                    if (this.SER4C2.FURIP.ASEG_VEH_FUR == '2') this.SER4C2.impresion.NOASEGURADO = 'X'
                    if (this.SER4C2.FURIP.ASEG_VEH_FUR == '3') this.SER4C2.impresion.VEHICULOFANTASMA = 'X'
                    if (this.SER4C2.FURIP.ASEG_VEH_FUR == '4') this.SER4C2.impresion.POLIZAFALSA = 'X'
                    if (this.SER4C2.FURIP.ASEG_VEH_FUR == '5') this.SER4C2.impresion.VEHICULOENFUGA = 'X'
                    this.SER4C2.impresion.PLACACAR = this.SER4C2.FURIP.PLACA_CAR.trim().padEnd(6, ' ').split('');
                    this.SER4C2.impresion.PLACAWIDTH = [4, 4, 4, 4, 4, 4];
                    this.SER4C2.impresion.MARCACAR = this.SER4C2.FURIP.MARCA_CAR.trim().padEnd(15, ' ');
                    this.SER4C2.impresion.PARTICULAR = this.SER4C2.impresion.PUBLICO = this.SER4C2.impresion.OFICIAL = this.SER4C2.impresion.VEHICULOEMERGENCIA = this.SER4C2.impresion.VEHICULOSERVICIO = this.SER4C2.impresion.VEHICULOTRANSPORTEMASIVO = this.SER4C2.impresion.VEHICULOESCOLAR = ' ';
                    if (this.SER4C2.FURIP.SERV_CAR == '1') this.SER4C2.impresion.PARTICULAR = 'X'
                    if (this.SER4C2.FURIP.SERV_CAR == '2') this.SER4C2.impresion.PUBLICO = 'X'
                    if (this.SER4C2.FURIP.SERV_CAR == '3') this.SER4C2.impresion.OFICIAL = 'X'
                    if (this.SER4C2.FURIP.SERV_CAR == '4') this.SER4C2.impresion.VEHICULOEMERGENCIA = 'X'
                    if (this.SER4C2.FURIP.SERV_CAR == '5') this.SER4C2.impresion.VEHICULOSERVICIO = 'X'
                    if (this.SER4C2.FURIP.SERV_CAR == '6') this.SER4C2.impresion.VEHICULOTRANSPORTEMASIVO = 'X'
                    if (this.SER4C2.FURIP.SERV_CAR == '7') this.SER4C2.impresion.VEHICULOESCOLAR = 'X'
                    this.SER4C2.impresion.CODPOL = this.SER4C2.FURIP.COD_POL.padEnd(6, ' ').split('');
                    this.SER4C2.impresion.NUMPOL = `${this.SER4C2.FURIP.NUM_POL}${this.SER4C2.FURIP.POLIZA2_VEH}`;
                    this.SER4C2.impresion.NUMPOL = this.SER4C2.impresion.NUMPOL.padEnd(20, ' ')
                    // SER4C2.impresion.POLIZA2VEHW = SER4C2.FURIP.POLIZA2_VEH;
                    this.SER4C2.impresion.CODIGOHABILITACIONVEHICULO = `${this.SER4C2.impresion.NUMPOL}`.split('');
                    this.SER4C2.impresion.INTERVAUTFUR1 = this.SER4C2.impresion.INTERVAUTFUR2 = ' '
                    if (this.SER4C2.FURIP.INTERV_AUT.trim() == 'S') this.SER4C2.impresion.INTERVAUTFUR1 = 'X'
                    if (this.SER4C2.FURIP.INTERV_AUT.trim() == 'N') this.SER4C2.impresion.INTERVAUTFUR2 = 'X'
                    this.SER4C2.impresion.COBEXCEDFUR1 = this.SER4C2.impresion.COBEXCEDFUR2 = ' '
                    if (this.SER4C2.FURIP.COB_EXCED.trim() == 'S') this.SER4C2.impresion.COBEXCEDFUR1 = 'X'
                    if (this.SER4C2.FURIP.COB_EXCED.trim() == 'N') this.SER4C2.impresion.COBEXCEDFUR2 = 'X'
                    this.SER4C2.impresion.FECHAINIPOL = this.SER4C2.FURIP.FECHA_INI_POL.padEnd(8, ' ').split('');
                    this.SER4C2.impresion.FECHAFINPOL = this.SER4C2.FURIP.FECHA_FIN_POL.padEnd(8, ' ').split('');
                    this.SER4C2.impresion.PROPIETARIOPRIMERAPELLIDO = this.SER4C2.FURIP.PROPIETARIO.APEL1_TER2.split('');
                    this.SER4C2.impresion.PROPIETARIOSEGUNDOAPELLIDO = this.SER4C2.FURIP.PROPIETARIO.APEL2_TER2.split('');
                    this.SER4C2.impresion.PROPIETARIOPRIMERNOMBRE = this.SER4C2.FURIP.PROPIETARIO.NOMB_1.split('');
                    this.SER4C2.impresion.PROPIETARIOSEGUNDONOMBRE = this.SER4C2.FURIP.PROPIETARIO.NOMB_2.split('');
                    // this.SER4C2.impresion.PROPIETARIONRODOCUMENTO = this.SER4C2.FURIP.PROPIETARIO.ID_PROP_VEH.padStart(15, '0').split('');

                    if (this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'PE') {
                        this.SER4C2.impresion.PROPIETARIONRODOCUMENTO = this.SER4C2.FURIP.PROPIETARIO.NIT_PE.padStart(15, ' ').split('');
                    } else {
                        this.SER4C2.impresion.PROPIETARIONRODOCUMENTO = this.SER4C2.FURIP.PROPIETARIO.ID_PROP_VEH.padStart(15, ' ').split('');
                    }

                    this.SER4C2.impresion.PROPIETARIOTIPOID = this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.split('');
                    this.SER4C2.impresion.PROPIETARIOCC = this.SER4C2.impresion.PROPIETARIOCE = this.SER4C2.impresion.PROPIETARIOPA = this.SER4C2.impresion.PROPIETARIOTI = this.SER4C2.impresion.PROPIETARIORC = this.SER4C2.impresion.PROPIETARIOAS = this.SER4C2.impresion.PROPIETARIOMS = this.SER4C2.impresion.PROPIETARIONIT = ' ';
                    console.log(this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER)
                    if (this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'CC') this.SER4C2.impresion.PROPIETARIOCC = 'X'
                    if (this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'CE') this.SER4C2.impresion.PROPIETARIOCE = 'X'
                    if (this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'PA') this.SER4C2.impresion.PROPIETARIOPA = 'X'
                    if (this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'TI') this.SER4C2.impresion.PROPIETARIOTI = 'X'
                    if (this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'RC') this.SER4C2.impresion.PROPIETARIORC = 'X'
                    if (this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'AS') this.SER4C2.impresion.PROPIETARIOAS = 'X'
                    if (this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'MS') this.SER4C2.impresion.PROPIETARIOMS = 'X'
                    if (this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'NI') this.SER4C2.impresion.PROPIETARIONIT = 'X'
                    if (this.SER4C2.FURIP.PROPIETARIO.TIPO_ID_TER.trim() == 'PE') this.SER4C2.impresion.PROPIETARIOPE = 'X'
                    this.SER4C2.impresion.PROPIETARIODIRECC = this.SER4C2.FURIP.PROPIETARIO.DIRECC_TER.substring(0, 30).trim().padEnd(30, ' ').split('');
                    this.SER4C2.impresion.PROPIETARIODEPARTAMENTO = this.SER4C2.FURIP.PROPIETARIO.NOM_CIU1_TER.trim().padEnd(20, ' ').split('');
                    this.SER4C2.impresion.PROPIETARIOCODDPTO = this.SER4C2.FURIP.PROPIETARIO.DPTO_CIU_TER.padEnd(2, ' ').split('');
                    this.SER4C2.impresion.PROPIETARIOMUNICIPIO = this.SER4C2.FURIP.PROPIETARIO.NOM_CIU2_TER.trim().padEnd(20, ' ').split('');
                    this.SER4C2.impresion.PROPIETARIOCODMUNICIPIO = this.SER4C2.FURIP.PROPIETARIO.CIUD_CIU_TER.trim().padEnd(3, ' ').split('');
                    let telefonoprop = parseInt(this.SER4C2.FURIP.PROPIETARIO.TEL_TER);
                    if (telefonoprop == 0) telefonoprop = ''
                    this.SER4C2.impresion.PROPIETARIOTELEFONO = telefonoprop.toString().trim().padStart(12, ' ').split('');

                    this.SER4C2.impresion.CONDUCTORPRIMERNOMBRE = this.SER4C2.FURIP.CONDUCTOR.NOMB_1.split('');
                    this.SER4C2.impresion.CONDUCTORSEGUNDONOMBRE = this.SER4C2.FURIP.CONDUCTOR.NOMB_2.split('');
                    this.SER4C2.impresion.CONDUCTORPRIMERAPELLIDO = this.SER4C2.FURIP.CONDUCTOR.APEL1_TER2.split('');
                    this.SER4C2.impresion.CONDUCTORSEGUNDOAPELLIDO = this.SER4C2.FURIP.CONDUCTOR.APEL2_TER2.split('');
                    this.SER4C2.impresion.CONDUCTORCC = this.SER4C2.impresion.CONDUCTORCE = this.SER4C2.impresion.CONDUCTORPA = this.SER4C2.impresion.CONDUCTORTI = this.SER4C2.impresion.CONDUCTORRC = this.SER4C2.impresion.CONDUCTORAS = this.SER4C2.impresion.CONDUCTORMS = ' ';
                    if (this.SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'CC') this.SER4C2.impresion.CONDUCTORCC = 'X'
                    if (this.SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'CE') this.SER4C2.impresion.CONDUCTORCE = 'X'
                    if (this.SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'PA') this.SER4C2.impresion.CONDUCTORPA = 'X'
                    if (this.SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'TI') this.SER4C2.impresion.CONDUCTORTI = 'X'
                    if (this.SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'RC') this.SER4C2.impresion.CONDUCTORRC = 'X'
                    if (this.SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'AS') this.SER4C2.impresion.CONDUCTORAS = 'X'
                    if (this.SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'MS') this.SER4C2.impresion.CONDUCTORMS = 'X'
                    if (this.SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'PE') this.SER4C2.impresion.CONDUCTORPE = 'X'
                    // this.SER4C2.impresion.CONDUCTORNRODOCUMENTO = this.SER4C2.FURIP.CONDUCTOR.ID_PROP_VEH.padStart(15, '0').split('');

                    if (this.SER4C2.FURIP.CONDUCTOR.TIPO_ID_TER.trim() == 'PE') {
                        this.SER4C2.impresion.CONDUCTORNRODOCUMENTO = this.SER4C2.FURIP.CONDUCTOR.NIT_PE.padStart(15, ' ').split('');
                    } else {
                        this.SER4C2.impresion.CONDUCTORNRODOCUMENTO = this.SER4C2.FURIP.CONDUCTOR.ID_PROP_VEH.padStart(15, ' ').split('');
                    }

                    this.SER4C2.impresion.CONDUCTORDIRECCION = this.SER4C2.FURIP.CONDUCTOR.DIRECC_TER.substring(0, 30).trim().padEnd(30, ' ').split('');
                    this.SER4C2.impresion.CONDUCTORDEPARTAMENTO = this.SER4C2.FURIP.CONDUCTOR.NOM_CIU1_TER.trim().padEnd(20, ' ').split('');
                    this.SER4C2.impresion.CONDUCTORCODDPTO = this.SER4C2.FURIP.CONDUCTOR.DPTO_CIU_TER.trim().padEnd(2, ' ').split('');
                    let telefonoconduc = parseInt(this.SER4C2.FURIP.CONDUCTOR.TEL_TER);
                    if (telefonoconduc == 0) telefonoconduc = ''
                    this.SER4C2.impresion.CONDUCTORTELEFONO = telefonoconduc.toString().trim().padStart(12, ' ').split('');
                    this.SER4C2.impresion.CONDUCTORMUNICIPIO = this.SER4C2.FURIP.CONDUCTOR.NOM_CIU2_TER.trim().padEnd(20, ' ').split('');
                    this.SER4C2.impresion.CONDUCTORCODMUNICIPIO = this.SER4C2.FURIP.CONDUCTOR.CIUD_CIU_TER.trim().padEnd(3, ' ').split('');
                    this.SER4C2.impresion.REMI = this.SER4C2.impresion.ORDEN = ' ';
                    if (this.SER4C2.FURIP.FECHA_REMI_FUR.substring(4, 6) > 0) {
                        this.SER4C2.impresion.REMI = 'X'
                    }
                    let fecharemi = this.SER4C2.FURIP.FECHA_REMI_FUR
                    if (parseInt(fecharemi) == 0) fecharemi = '';
                    this.SER4C2.impresion.FECHAREMISION = fecharemi.toString().trim().padStart(8, ' ').split('');
                    let horaremi = this.SER4C2.FURIP.HORA_REMI_FUR;
                    if (parseInt(horaremi) == 0) horaremi = '';
                    this.SER4C2.impresion.HORAREMISION = horaremi.toString().trim().padStart(4, ' ').split('');
                    this.SER4C2.impresion.NOMBREIPSREMI = this.SER4C2.FURIP.NOMBRE_IPS_REMI;
                    this.SER4C2.impresion.CODIPSREMI = this.SER4C2.FURIP.COD_IPS_REMI.trim().padEnd(12, ' ').split('');
                    this.SER4C2.impresion.CODIPSWIDTH = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
                    this.SER4C2.impresion.PERSONAREMI = this.SER4C2.FURIP.PERS_REMI;
                    this.SER4C2.impresion.CARGOREMI = this.SER4C2.FURIP.CARGO_REMI;
                    fecharemi = this.SER4C2.FURIP.FECHA_ACEP_FUR
                    if (parseInt(fecharemi) == 0) fecharemi = '';
                    this.SER4C2.impresion.FECHAACEPFUR = fecharemi.toString().trim().padStart(8, ' ').split('');
                    horaremi = this.SER4C2.FURIP.HORA_ACEP_FUR;
                    if (parseInt(horaremi) == 0) horaremi = '';
                    this.SER4C2.impresion.HORAACEPFUR = horaremi.toString().trim().padStart(4, ' ').split('');
                    this.SER4C2.impresion.CODIPSACEPFUR = this.SER4C2.FURIP.COD_IPS_ACEP.trim().padEnd(12, ' ').split('');
                    this.SER4C2.impresion.NOMBREIPSACEPFUR = this.SER4C2.FURIP.NOMBRE_IPS_ACEP;
                    this.SER4C2.impresion.PERSONAACEPFUR = this.SER4C2.FURIP.PERS_ACEP;
                    this.SER4C2.impresion.CARGOACEPFUR = this.SER4C2.FURIP.CARGO_ACEP;

                    this.SER4C2.impresion.PLACAAMB = this.SER4C2.FURIP.PLACA_AMB.trim().padEnd(6, ' ').split('');
                    this.SER4C2.impresion.DESDEAMB = `${this.SER4C2.FURIP.DESDE_AMB}${this.SER4C2.FURIP.DESDE_AMB2}`;
                    this.SER4C2.impresion.HASTAAMB = `${this.SER4C2.FURIP.HASTA_AMB}${this.SER4C2.FURIP.HASTA_AMB2}`;
                    this.SER4C2.impresion.AMBULANCIABASICA = this.SER4C2.impresion.AMBULANCIAMEDICADA = ' ';
                    if (this.SER4C2.FURIP.AMBUL_CAR == '1') this.SER4C2.impresion.AMBULANCIABASICA = "X";
                    if (this.SER4C2.FURIP.AMBUL_CAR == '2') this.SER4C2.impresion.AMBULANCIAMEDICADA = "X";
                    this.SER4C2.impresion.AMBULCAR = this.SER4C2.FURIP.AMBUL_CAR;
                    this.SER4C2.impresion.ZONAAMB = this.SER4C2.FURIP.ZONA_AMB;
                    this.SER4C2.ZONAAMB1 = this.SER4C2.ZONAAMB2 = ' ';
                    if (this.SER4C2.impresion.ZONAAMB == 'U') this.SER4C2.ZONAAMB1 = 'X'
                    if (this.SER4C2.impresion.ZONAAMB == 'R') this.SER4C2.ZONAAMB2 = 'X'
                    let fecha = this.SER4C2.FURIP.FECHA_ING_FUR
                    if (parseInt(fecha) == 0) fecha = '';
                    this.SER4C2.impresion.FECHAING = fecha.toString().trim().padStart(8, ' ').split('');
                    let hora = this.SER4C2.FURIP.HORA_ING_FUR;
                    if (parseInt(hora) == 0) hora = '';
                    this.SER4C2.impresion.HORAING = hora.toString().trim().padStart(4, ' ').split('');
                    fecha = this.SER4C2.FURIP.FECHA_EGR_FUR
                    if (parseInt(fecha) == 0) fecha = '';
                    this.SER4C2.impresion.FECHAEGR = fecha.toString().trim().padStart(8, ' ').split('');
                    hora = this.SER4C2.FURIP.HORA_EGR_FUR;
                    if (parseInt(hora) == 0) hora = '';
                    this.SER4C2.impresion.HORAEGR = hora.toString().trim().padStart(4, ' ').split('');

                    this.SER4C2.impresion.DIAGNWIDTH = [4, 4, 4, 4];
                    this.SER4C2.impresion.DIAG1ING = this.SER4C2.FURIP.DIAG1ING_FUR.trim().padEnd(4, ' ').split('');
                    this.SER4C2.impresion.DIAG1EGR = this.SER4C2.FURIP.DIAG1EGR_FUR.trim().padEnd(4, ' ').split('');
                    this.SER4C2.impresion.DIAG2ING = this.SER4C2.FURIP.DIAG2ING_FUR.trim().padEnd(4, ' ').split('');
                    this.SER4C2.impresion.DIAG2EGR = this.SER4C2.FURIP.DIAG2EGR_FUR.trim().padEnd(4, ' ').split('');
                    this.SER4C2.impresion.DIAG3ING = this.SER4C2.FURIP.DIAG3ING_FUR.trim().padEnd(4, ' ').split('');
                    this.SER4C2.impresion.DIAG3EGR = this.SER4C2.FURIP.DIAG3EGR_FUR.trim().padEnd(4, ' ').split('');
                    this.SER4C2.impresion.MEDICOPRIMERAPELLIDO = this.SER4C2.FURIP.MEDICO.APEL1_TER2;
                    this.SER4C2.impresion.MEDICOSEGUNDOAPELLIDO = this.SER4C2.FURIP.MEDICO.APEL2_TER2;
                    this.SER4C2.impresion.MEDICOPRIMERNOMBRE = this.SER4C2.FURIP.MEDICO.NOMB_1;
                    this.SER4C2.impresion.MEDICOSEGUNDONOMBRE = this.SER4C2.FURIP.MEDICO.NOMB_2;
                    this.SER4C2.impresion.MEDICOTIPOID = this.SER4C2.FURIP.MEDICO.TIPO_ID_TER;
                    // this.SER4C2.impresion.MEDICOATI = this.SER4C2.FURIP.MEDICO.MED_ATI_FUR.trim().padStart(10, '0').split('');
                    this.SER4C2.impresion.MEDICOATI = this.SER4C2.FURIP.MEDICO.MED_ATI_FUR.trim().padStart(10, ' ').split('');
                    this.SER4C2.impresion.MEDICOCC = this.SER4C2.impresion.MEDICOCE = this.SER4C2.impresion.MEDICOPA = this.SER4C2.impresion.MEDICOTI = this.SER4C2.impresion.MEDICORC = this.SER4C2.impresion.MEDICOAS = this.SER4C2.impresion.MEDICOMS = ' ';
                    if (this.SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'CC') this.SER4C2.impresion.MEDICOCC = 'X'
                    if (this.SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'CE') this.SER4C2.impresion.MEDICOCE = 'X'
                    if (this.SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'PA') this.SER4C2.impresion.MEDICOPA = 'X'
                    if (this.SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'TI') this.SER4C2.impresion.MEDICOTI = 'X'
                    if (this.SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'RC') this.SER4C2.impresion.MEDICORC = 'X'
                    if (this.SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'AS') this.SER4C2.impresion.MEDICOAS = 'X'
                    if (this.SER4C2.FURIP.MEDICO.TIPO_ID_TER.trim() == 'MS') this.SER4C2.impresion.MEDICOMS = 'X'
                    this.SER4C2.impresion.VLRMQFACT = this.SER4C2.FURIP.VLR_MQ_FACT;
                    this.SER4C2.impresion.VLRMQRECL = this.SER4C2.FURIP.VLR_MQ_RECL;
                    this.SER4C2.impresion.VLRTRFACT = this.SER4C2.FURIP.VLR_TR_FACT;
                    this.SER4C2.impresion.VLRTRRECL = this.SER4C2.FURIP.VLR_TR_RECL;
                    this.SER4C2.impresion.CIUDADOCUR = this.SER4C2.FURIP.CIUD_OCUR_FUR;

                    this.SER4C2.impresion.IDPROPVEH2 = this.SER4C2.FURIP.ID_PROP_VEH2;
                    this.SER4C2.impresion.IDPROPVEH3 = this.SER4C2.FURIP.ID_PROP_VEH3;
                    this.SER4C2.impresion.FECHAACTW = '';
                    this.SER4C2.impresion.FECHAACTW = this.SER4C2.impresion.FECHAACTW.padStart(8, ' ').split('');

                    if (isNaN(parseInt(this.form.folios_SER4C2))) this.form.folios_SER4C2 = '000'
                    this.SER4C2.impresion.FOLIOS = parseInt(this.form.folios_SER4C2).toString().padStart(3, '0').split('');

                    this.SER4C2.impresion.NOMBREPDF = localStorage.Usuario.trim() + moment().format('YYMMDDHHss')
                    console.debug(this.SER4C2.impresion);
                    this._impresionFURIPS();
                })
                .catch(err => {
                    console.error(err);
                    this._evaluardatoradant_SER4C2('2');
                })
        },
        _impresionFURIPS() {
            let datosimpresion = {
                pageSize: "LETTER",
                pageMargins: [10, 50, 10, 10],
                header: function (currentPage, pageCount, pageSize) {
                    return [
                        {
                            image: "logo",
                            fit: [30, 60],
                            absolutePosition: { x: 10, y: 10 },
                        },
                        { text: " " },
                        { text: "REPUBLICA DE COLOMBIA", style: "headerimpresion" },
                        { text: "MINISTERO DE LA PROTECCION SOCIAL", style: "headerimpresion" },
                        { text: "FORMULARIO ÚNICO DE RECLAMACION DE LAS INSTITUCIONES PRESTADORAS DE SERVICIOS DE SALUD POR SERVICIOS PRESTADOS A VICTIMAS DE EVENTOS CATASTROFICOS Y ACCIDENTES DE TRANSITO", style: "headerimpresion", margin: [40, 0] },
                        { text: "PERSONAS JURIDICAS - FURIPS", style: "headerimpresion" },
                    ]
                },
                content: [
                    {
                        table: {
                            widths: ['*'],
                            heights: 8,
                            body: [
                                [
                                    {
                                        columns: [
                                            { text: "Fecha Radicacion", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.FECHAACTW, this.SER4C2.impresion.FECHAACTWWIDTH, 1, '50%'),
                                            { text: "No. Radicado", style: 'titulostexto', width: '11%' },
                                            {
                                                table: {
                                                    widths: ['60%'],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.NRORADFUR, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '20%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "No. Radicado Anterior (Respuesta a glosa, Marcar en RG)", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: ['80%'],
                                                    heights: 20,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.NRORADANTFUR, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '30%',
                                            },
                                            { text: "RG", style: 'titulostexto', width: '2%' },
                                            {
                                                table: {
                                                    widths: [10],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: ' ', style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "No. Factura/Cuenta de Cobro", style: 'titulostexto', width: '18%' },
                                            {
                                                table: {
                                                    widths: ['95%'],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: `${this.SER4C2.impresion.PREFIJOFUR} ${this.SER4C2.impresion.NROFUR}`, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '20%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ["*"],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: 'I. DATOS DE LA INSTITUCION PRESTADORA DE SERVICIO DE SALUD', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Razon Social", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: $_USUA_GLOBAL[0].NOMBRE.trim(), style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '30%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Codigo Habilitación", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CODIGOHABILITACION, this.SER4C2.impresion.CODIGOHABILITACIONWIDTH, 5, '35%'),
                                            { text: "Nit", style: 'titulostexto', width: '5%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.NITUSU, this.SER4C2.impresion.NITUSUWIDTH, 5, '50%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ["*"],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: 'II. DATOS DE LA VICTIMA DEL EVENTO CATASTROFICO O ACCIDENTE DE TRANSITO', style: 'letraencajas', fillColor: '#808080', color: 'white', fillColor: '#476fad' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.PRIMERAPELLIDO, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.SEGUNDOAPELLIDO, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                text: '1ER APELLIDO',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                            {
                                                text: '2DO APELLIDO',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.PRIMERNOMBRE, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.SEGUNDONOMBRE, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                text: '1ER NOMBRE',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                            {
                                                text: '2DO NOMBRE',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Tipo de Documento", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: 'CC', style: 'letraencajas' }, { text: 'CE', style: 'letraencajas' }, { text: 'PA', style: 'letraencajas' }, { text: 'TI', style: 'letraencajas' }, { text: 'RC', style: 'letraencajas' }, { text: 'AS', style: 'letraencajas' }, { text: 'MS', style: 'letraencajas' }, { text: this.SER4C2.impresion.CC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.CE, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.PA, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.TI, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.RC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.AS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.MS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }],
                                                    ]
                                                },
                                                width: '35%',
                                            },
                                            { text: "No. Documento", style: 'titulostexto', width: '10%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CODPACI, this.SER4C2.impresion.CODPACIWIDTH, 1, '35%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Fecha de Nacimiento", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.FECHAPACI, this.SER4C2.impresion.FECHAPACIWIDTH, 1, '25%'),
                                            { text: "Sexo", style: 'titulostexto', width: '10%' },
                                            {
                                                table: {
                                                    widths: [9, 9, 9, 9],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: 'F', style: 'letraencajas' }, { text: this.SER4C2.impresion.SEXOPACI1, relativePosition: { x: -20, y: -3 }, border: [false, false, false, false] }, { text: 'M', style: 'letraencajas' }, { text: this.SER4C2.impresion.SEXOPACI2, relativePosition: { x: -20, y: -3 }, border: [false, false, false, false] }],
                                                    ]
                                                },
                                                width: '35%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Direccion Residencia", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.DIRECPACI, this.SER4C2.impresion.DIRECPACIWIDTH, 1, '75%')
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Departamento", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.NOMBREDEPARTAMENTO, this.SER4C2.impresion.NOMBREDEPARTAMENTOWIDTH, 1, '46%'),
                                            { text: "Cod", style: 'titulostexto', width: '3%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CODDPTO, [4, 4], 1, '6%'),
                                            { text: "Telefono", style: 'titulostexto', width: '5%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.TELEFONOPACI, this.SER4C2.impresion.TELEFONOPACIWIDTH, 1, '25%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Municipio", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.NOMBREMUNICIPIO, this.SER4C2.impresion.NOMBREMUNICIPIOWIDTH, 1, '46%'),
                                            { text: "Cod", style: 'titulostexto', width: '3%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CIUDPACI, [4, 4, 4], 1, '6%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Condicion del Accidentado", style: 'titulostexto', width: '25%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.CONDUCTOR, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '3%',
                                            },
                                            { text: "Conductor", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.PEATON, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '3%',
                                            },
                                            { text: "Peaton", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.OCUPANTE, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '3%',
                                            },
                                            { text: "Ocupante", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.CICLISTA, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '3%',
                                            },
                                            { text: "Ciclista", style: 'titulostexto', width: '15%' },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ["*"],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: 'III. DATOS DEL SITIO DONDE OCURRIO EL EVENTO CATASTROFICO O EL ACCIDENTE TRANSITO', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    { text: 'Naturaleza del Evento:', style: 'titulostexto', margin: [5, 0] }
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Accidente de transito", style: 'titulostexto', width: '19%', margin: [20, 0] },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.ACCIDENTETRANSITO, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '3%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Naturales:", style: 'titulostexto', width: '10%', margin: [5, 0] },
                                            { text: "Sismo", style: 'titulostexto', width: '9%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.SISMO, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Maremoto", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.MAREMOTO, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Erupciones Volcanicas", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.ERUPCIONESVOLCANICAS, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Huracan", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.HURACAN, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: " ", style: 'titulostexto', width: '10%', margin: [5, 0] },
                                            { text: "Inundaciones", style: 'titulostexto', width: '9%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.INUNDACIONES, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Avalancha", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.AVALANCHA, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Deslizamiento de Tierra", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.DESLIZAMIENTOSDETIERRA, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Incendio Natural", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.INCENDIONATURAL, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Terroristas:", style: 'titulostexto', width: '10%', margin: [5, 0] },
                                            { text: "Explosion", style: 'titulostexto', width: '9%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.EXPLOSION, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Masacre", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.MASACRE, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Mina Antipersonal", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.MINAANTIPERSONAL, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Combate", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.COMBATE, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: " ", style: 'titulostexto', width: '10%', margin: [5, 0] },
                                            { text: "Incendio", style: 'titulostexto', width: '9%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.INCENDIO, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Ataques a Municipios", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.ATAQUESMUNICIPOS, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Otros", style: 'titulostexto', width: '5%', margin: [5, 0] },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.OTROS, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Cual?", style: 'titulostexto', width: '5%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.OTREVENTFUR, this.SER4C2.impresion.OTREVENTFURWIDTH, 1, '46%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Direccion de la ocurrencia", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.DIROCURFUR, this.SER4C2.impresion.DIROCURFURWIDTH, 1, '75%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Fecha Evento/Accidente", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.FECHAOCURFUR, this.SER4C2.impresion.FECHAWIDTH, 1, '25%'),
                                            { text: "Hora", style: 'titulostexto', width: '10%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.HORAOCURFUR, this.SER4C2.impresion.HORAWIDTH, 1, '35%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Departamento", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.DEPARTAMENTOOCURFUR, this.SER4C2.impresion.NOMBREDEPARTAMENTOWIDTH, 1, '46%'),
                                            { text: "Cod", style: 'titulostexto', width: '3%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CODDPTOOCURFUR, [4, 4], 1, '6%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Municipio", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.MUNICIPIOOCURFUR, this.SER4C2.impresion.NOMBREMUNICIPIOWIDTH, 1, '46%'),
                                            { text: "Cod", style: 'titulostexto', width: '3%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CODDCIUOCURFUR, [4, 4, 4], 1, '8%'),
                                            { text: "ZONA", style: 'titulostexto', width: '5%' },
                                            {
                                                table: {
                                                    widths: [5],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: 'U', style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: this.SER4C2.impresion.ZONAOCUR1, relativePosition: { x: -29, y: -4 }, border: [false, false, false, false], fontSize: '20', width: '5%' },
                                            {
                                                table: {
                                                    widths: [5],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: 'R', style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: this.SER4C2.impresion.ZONAOCUR2, relativePosition: { x: -29, y: -4 }, border: [false, false, false, false], fontSize: '20', width: '5%' },
                                        ],
                                    },
                                ],
                                [
                                    { text: 'Descripcion Breve del Evento Catastrófico o Accidente de Transito', style: 'titulostexto', margin: [5, 0] }
                                ],
                                [
                                    { text: 'Enuncie las principales caracteristicas del evento/accidente:', style: 'titulostexto', margin: [5, 0] }
                                ],
                                [
                                    { text: `${this.SER4C2.impresion.DESCRIPOCURFUR.toUpperCase()}`, style: 'titulostexto', margin: [5, 0] }
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ["*"],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: 'IV. DATOS DEL VEHICULO DEL ACCIDENTE DE TRANSITO', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    { text: 'Estado de Aseguramiento:', style: 'titulostexto', margin: [5, 0] }
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Asegurado", style: 'titulostexto', width: '21%', margin: [40, 0] },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.ASEGURADO, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "No Asegurado", style: 'titulostexto', width: '12%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.NOASEGURADO, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Vehiculo fantasma", style: 'titulostexto', width: '12%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.VEHICULOFANTASMA, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Poliza Falsa", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.POLIZAFALSA, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Vehiculo en fuga", style: 'titulostexto', width: '12%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.VEHICULOENFUGA, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Marca", style: 'titulostexto', width: '15%', margin: [5, 0] },
                                            {
                                                table: {
                                                    widths: ['71%'],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.MARCACAR, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '35%',
                                            },
                                            { text: "Placa", style: 'titulostexto', width: '10%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.PLACACAR, this.SER4C2.impresion.PLACAWIDTH, 1, '35%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Tipo de Servicio:", style: 'titulostexto', width: '12%', margin: [5, 0] },
                                            { text: "Particular", style: 'titulostexto', width: '9%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.PARTICULAR, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Publico", style: 'titulostexto', width: '12%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.PUBLICO, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Oficial", style: 'titulostexto', width: '12%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.OFICIAL, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Vehiculo de emergencia", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.VEHICULOEMERGENCIA, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Vehiculo de servicio", style: 'titulostexto', width: '12%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.VEHICULOSERVICIO, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Vehiculo de transporte masivo", style: 'titulostexto', width: '21%', margin: [10, 0] },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.VEHICULOTRANSPORTEMASIVO, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Vehiculo Escolar", style: 'titulostexto', width: '12%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.VEHICULOESCOLAR, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Codigo de la Aseguradora", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CODPOL, this.SER4C2.impresion.PLACAWIDTH, 1, '35%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Nro de poliza", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CODIGOHABILITACIONVEHICULO, this.SER4C2.impresion.NOMBREMUNICIPIOWIDTH, 1, '50%'),
                                            { text: "Intervención de autoridad", style: 'titulostexto', width: '15%' },
                                            { text: "SI", style: 'titulostexto', width: '3%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.INTERVAUTFUR1, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "NO", style: 'titulostexto', width: '3%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.INTERVAUTFUR2, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Vigencia Desde", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.FECHAINIPOL, this.SER4C2.impresion.FECHAWIDTH, 1, '22%'),
                                            { text: "Hasta", style: 'titulostexto', width: '5%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.FECHAFINPOL, this.SER4C2.impresion.FECHAWIDTH, 1, '23%'),
                                            { text: "Cobro Excedente Póliza", style: 'titulostexto', width: '15%' },
                                            { text: "SI", style: 'titulostexto', width: '3%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.COBEXCEDFUR1, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "NO", style: 'titulostexto', width: '3%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.COBEXCEDFUR2, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ["*"],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: 'V. DATOS DEL PROPIETARIO DEL VEHICULO', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.PROPIETARIOPRIMERAPELLIDO, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.PROPIETARIOSEGUNDOAPELLIDO, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                text: '1er Apellido o Razon Social',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                            {
                                                text: '2do Apellido',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.PROPIETARIOPRIMERNOMBRE, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.PROPIETARIOSEGUNDONOMBRE, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                text: '1er Nombre',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                            {
                                                text: '2do Nombre',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Tipo de Documento", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: 'CC', style: 'letraencajas' }, { text: 'CE', style: 'letraencajas' }, { text: 'PA', style: 'letraencajas' }, { text: 'TI', style: 'letraencajas' }, { text: 'RC', style: 'letraencajas' }, { text: 'AS', style: 'letraencajas' }, { text: 'MS', style: 'letraencajas' }, { text: 'NI', style: 'letraencajas' }, { text: 'PE', style: 'letraencajas' }, { text: this.SER4C2.impresion.PROPIETARIOCC, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.PROPIETARIOCE, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.PROPIETARIOPA, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.PROPIETARIOTI, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.PROPIETARIORC, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.PROPIETARIOAS, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.PROPIETARIOMS, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.PROPIETARIONIT, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.PROPIETARIOPE, relativePosition: { x: -160, y: -3 }, border: [false, false, false, false] }],
                                                    ]
                                                },
                                                width: '35%',
                                            },
                                            { text: "No. Documento", style: 'titulostexto', width: '10%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.PROPIETARIONRODOCUMENTO, this.SER4C2.impresion.CODPACIWIDTH, 1, '50%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Direccion Residencia", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.PROPIETARIODIRECC, this.SER4C2.impresion.DIROCURFURWIDTH, 1, '75%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Departamento", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.PROPIETARIODEPARTAMENTO, this.SER4C2.impresion.NOMBREDEPARTAMENTOWIDTH, 1, '46%'),
                                            { text: "Cod", style: 'titulostexto', width: '3%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.PROPIETARIOCODDPTO, [4, 4], 1, '6%'),
                                            { text: "Telefono", style: 'titulostexto', width: '5%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.PROPIETARIOTELEFONO, this.SER4C2.impresion.TELEFONOPACIWIDTH, 1, '25%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Municipio", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.PROPIETARIOMUNICIPIO, this.SER4C2.impresion.NOMBREMUNICIPIOWIDTH, 1, '46%'),
                                            { text: "Cod", style: 'titulostexto', width: '3%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.PROPIETARIOCODMUNICIPIO, [4, 4, 4], 1, '6%'),
                                        ],
                                    },
                                ],
                            ]
                        },
                        layout: {
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                            },
                            paddingLeft: function (i, node) { return 0; },
                            paddingRight: function (i, node) { return 0; },
                            paddingTop: function (i, node) { return 0; },
                            paddingBottom: function (i, node) { return 0; }
                        },
                        width: '100%',
                    },
                    {
                        columns: [
                            { text: 'TOTAL FOLIO', style: "letraencajas", width: '89%', alignment: "right" },
                            {
                                table: {
                                    widths: [5, 5, 5],
                                    heights: 1,
                                    body: [
                                        [
                                            { text: this.SER4C2.impresion.FOLIOS[0], style: 'letraencajas' }, { text: this.SER4C2.impresion.FOLIOS[1], style: 'letraencajas' }, { text: this.SER4C2.impresion.FOLIOS[2], style: 'letraencajas' }
                                        ],
                                    ]
                                },
                                width: '10%',
                                margin: [5, 0]
                            },
                        ]
                    },
                    { text: " " },
                    {
                        table: {
                            widths: [574],
                            heights: 8,
                            body: [
                                [
                                    { text: ' ', style: 'titulostexto' }
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ["*"],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: 'VI. DATOS DEL CONDUCTOR DEL VEHICULO INVOLUCRADO EN EL ACCIDENTE DE TRANSITO', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.CONDUCTORPRIMERAPELLIDO, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.CONDUCTORSEGUNDOAPELLIDO, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                text: '1er Apellido o Razon Social',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                            {
                                                text: '2do Apellido',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.CONDUCTORPRIMERNOMBRE, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.CONDUCTORSEGUNDONOMBRE, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                text: '1er Nombre',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                            {
                                                text: '2do Nombre',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Tipo de Documento", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: 'CC', style: 'letraencajas' }, { text: 'CE', style: 'letraencajas' }, { text: 'PA', style: 'letraencajas' }, { text: 'TI', style: 'letraencajas' }, { text: 'RC', style: 'letraencajas' }, { text: 'AS', style: 'letraencajas' }, { text: 'MS', style: 'letraencajas' }, { text: 'PE', style: 'letraencajas' }, { text: this.SER4C2.impresion.CONDUCTORCC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.CONDUCTORCE, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.CONDUCTORPA, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.CONDUCTORTI, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.CONDUCTORRC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.CONDUCTORAS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.CONDUCTORMS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.CONDUCTORPE, relativePosition: { x: -145, y: -3 }, border: [false, false, false, false] }],
                                                    ]
                                                },
                                                width: '35%',
                                            },
                                            { text: "No. Documento", style: 'titulostexto', width: '10%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CONDUCTORNRODOCUMENTO, this.SER4C2.impresion.CODPACIWIDTH, 1, '50%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Direccion Residencia", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CONDUCTORDIRECCION, this.SER4C2.impresion.DIROCURFURWIDTH, 1, '75%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Departamento", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CONDUCTORDEPARTAMENTO, this.SER4C2.impresion.NOMBREDEPARTAMENTOWIDTH, 1, '46%'),
                                            { text: "Cod", style: 'titulostexto', width: '3%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CONDUCTORCODDPTO, [4, 4], 1, '6%'),
                                            { text: "Telefono", style: 'titulostexto', width: '5%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CONDUCTORTELEFONO, this.SER4C2.impresion.TELEFONOPACIWIDTH, 1, '25%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Municipio", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CONDUCTORMUNICIPIO, this.SER4C2.impresion.NOMBREMUNICIPIOWIDTH, 1, '46%'),
                                            { text: "Cod", style: 'titulostexto', width: '3%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CONDUCTORCODMUNICIPIO, [4, 4, 4], 1, '6%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ["*"],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: 'VII. DATOS DE REMISION', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Tipo de Referencia:", style: 'titulostexto', width: '19%', margin: [5, 0] },
                                            { text: "Remision", style: 'titulostexto', width: '9%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.REMI, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Orden de Servicio", style: 'titulostexto', width: '12%' },
                                            {
                                                table: {
                                                    widths: [4],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.ORDEN, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Fecha de Remision", style: 'titulostexto', width: '19%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.FECHAREMISION, this.SER4C2.impresion.FECHAWIDTH, 1, '22%'),
                                            { text: "a las", style: 'titulostexto', width: '5%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.HORAREMISION, this.SER4C2.impresion.HORAWIDTH, 1, '23%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Prestador que remite", style: 'titulostexto', width: '19%' },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.NOMBREIPSREMI, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '22%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Codigo de inscripcion", style: 'titulostexto', width: '19%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CODIPSREMI, this.SER4C2.impresion.CODIPSWIDTH, 1, '46%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Profesional que remite", style: 'titulostexto', width: '19%' },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.PERSONAREMI, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '45%',
                                            },
                                            { text: "Cargo", style: 'titulostexto', width: '5%' },
                                            {
                                                table: {
                                                    widths: [160],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.CARGOREMI, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '22%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Fecha de Aceptacion", style: 'titulostexto', width: '19%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.FECHAACEPFUR, this.SER4C2.impresion.FECHAWIDTH, 1, '22%'),
                                            { text: "a las", style: 'titulostexto', width: '5%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.HORAACEPFUR, this.SER4C2.impresion.HORAWIDTH, 1, '23%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Prestador que Recibe", style: 'titulostexto', width: '19%' },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.NOMBREIPSACEPFUR, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '22%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Codigo de inscripcion", style: 'titulostexto', width: '19%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.CODIPSACEPFUR, this.SER4C2.impresion.CODIPSWIDTH, 1, '46%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Profesional que Recibe", style: 'titulostexto', width: '19%' },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.PERSONAACEPFUR, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '45%',
                                            },
                                            { text: "Cargo", style: 'titulostexto', width: '5%' },
                                            {
                                                table: {
                                                    widths: [160],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.CARGOACEPFUR, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '22%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ["*"],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: 'VIII. AMPARO DE TRANSPORTE Y MOVILIZACION DE LA VICTIMA', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    { text: 'Diligenciar únicamente para el transporte desde el sitio del evento hasta la primera IPS (Trasnporte primario) y cuando ser realiza en ambulancias de la misma IPS', style: 'titulostexto', margin: [5, 0] }
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Datos de vehiculo", style: 'titulostexto', width: '19%', margin: [5, 0] },
                                            { text: "Placa No", style: 'titulostexto', width: '9%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.PLACAAMB, this.SER4C2.impresion.PLACAWIDTH, 1, '35%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Transporto la Victima desde", style: 'titulostexto', width: '19%' },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.DESDEAMB, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '45%',
                                            },
                                            { text: "Hasta", style: 'titulostexto', width: '5%' },
                                            {
                                                table: {
                                                    widths: [160],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.HASTAAMB, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '22%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Tipo de Transporte:", style: 'titulostexto', width: '19%', margin: [5, 0] },
                                            { text: "Ambulancia Basica", style: 'titulostexto', width: '12%' },
                                            {
                                                table: {
                                                    widths: [5],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.AMBULANCIABASICA, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Ambulancia Medicada", style: 'titulostexto', width: '12%' },
                                            {
                                                table: {
                                                    widths: [5],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: this.SER4C2.impresion.AMBULANCIAMEDICADA, style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: "Lugar donde recoge la Victima", style: 'titulostexto', width: '20%' },
                                            { text: "ZONA", style: 'titulostexto', width: '5%' },
                                            {
                                                table: {
                                                    widths: [5],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: 'U', style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: this.SER4C2.ZONAAMB1, relativePosition: { x: -29, y: -4 }, border: [false, false, false, false], fontSize: '20', width: '5%' },
                                            {
                                                table: {
                                                    widths: [5],
                                                    heights: 1,
                                                    body: [
                                                        [
                                                            { text: 'R', style: 'letraencajas' }
                                                        ],
                                                    ]
                                                },
                                                width: '5%',
                                            },
                                            { text: this.SER4C2.ZONAAMB2, relativePosition: { x: -29, y: -4 }, border: [false, false, false, false], fontSize: '20', width: '5%' },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ["*"],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: 'IX. CERTIFICAION DE LA ATENCION MEDICA DE LA VICTIMA COMO PRUEBA DEL ACCIDENTE O EVENTO', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Fecha de Ingreso", style: 'titulostexto', width: '15%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.FECHAING, this.SER4C2.impresion.FECHAWIDTH, 1, '20%'),
                                            { text: "a las", style: 'titulostexto', width: '3%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.HORAING, this.SER4C2.impresion.HORAWIDTH, 1, '10%'),
                                            { text: "Fecha de Egreso", style: 'titulostexto', width: '10%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.FECHAEGR, this.SER4C2.impresion.FECHAWIDTH, 1, '20%'),
                                            { text: "a las", style: 'titulostexto', width: '3%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.HORAEGR, this.SER4C2.impresion.HORAWIDTH, 1, '10%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Codigo Diagnóstico principal de Ingreso", style: 'titulostexto', width: '38%', margin: [5, 0] },
                                            this.tablasFURIPS(this.SER4C2.impresion.DIAG1ING, this.SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                            { text: "Codigo Diagnóstico principal de Egreso", style: 'titulostexto', width: '33%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.DIAG1EGR, this.SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Otro Codigo Diagnóstico de Ingreso", style: 'titulostexto', width: '38%', margin: [5, 0] },
                                            this.tablasFURIPS(this.SER4C2.impresion.DIAG2ING, this.SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                            { text: "Otro Codigo Diagnóstico principal de Egreso", style: 'titulostexto', width: '33%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.DIAG2EGR, this.SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Otro Codigo Diagnóstico de Ingreso", style: 'titulostexto', width: '38%', margin: [5, 0] },
                                            this.tablasFURIPS(this.SER4C2.impresion.DIAG3ING, this.SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                            { text: "Otro Codigo Diagnóstico principal de Egreso", style: 'titulostexto', width: '33%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.DIAG3EGR, this.SER4C2.impresion.DIAGNWIDTH, 1, '12%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.MEDICOPRIMERAPELLIDO, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.MEDICOSEGUNDOAPELLIDO, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                text: '1er Apellido del Medico o Profesional Tratante',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                            {
                                                text: '2do Apellido del Medico o Profesional Tratante',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.MEDICOPRIMERNOMBRE, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                            {
                                                table: {
                                                    widths: [240],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: this.SER4C2.impresion.MEDICOSEGUNDONOMBRE, style: 'letraencajas' }],
                                                    ]
                                                },
                                                width: '50%',
                                                margin: [10, 0]
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                text: '1er Nombre del Medico o Profesional Tratante',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                            {
                                                text: '2do Nombre del Medico o Profesional Tratante',
                                                width: '50%',
                                                margin: [10, 0],
                                                style: 'tituloscentrados'
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Tipo de Documento", style: 'titulostexto', width: '15%' },
                                            {
                                                table: {
                                                    widths: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: 'CC', style: 'letraencajas' }, { text: 'CE', style: 'letraencajas' }, { text: 'PA', style: 'letraencajas' }, { text: 'TI', style: 'letraencajas' }, { text: 'RC', style: 'letraencajas' }, { text: 'AS', style: 'letraencajas' }, { text: 'MS', style: 'letraencajas' }, { text: this.SER4C2.impresion.MEDICOCC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.MEDICOCE, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.MEDICOPA, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.MEDICOTI, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.MEDICORC, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.MEDICOAS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }, { text: this.SER4C2.impresion.MEDICOMS, relativePosition: { x: -125, y: -3 }, border: [false, false, false, false] }],
                                                    ]
                                                },
                                                width: '35%',
                                            },
                                            { text: "No. Documento", style: 'titulostexto', width: '10%' },
                                            this.tablasFURIPS(this.SER4C2.impresion.MEDICOATI, this.SER4C2.impresion.CODPACIWIDTH, 1, '50%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "Numero de Registro Medico", style: 'titulostexto', width: '59%', alignment: "right" },
                                            this.tablasFURIPS(this.SER4C2.REGMED.padEnd(15, ' ').split(''), [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 1, '50%'),
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ["*"],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: 'X. AMPAROS QUE RECLAMA', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "VALOR TOTAL FACTURADO", style: 'titulostexto', width: '62%', alignment: "right" },
                                            { text: "VALOR RECLAMADO AL FOSYGA", style: 'titulostexto', width: '43%', alignment: "center" },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['40%', '30%', '30%'],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: 'GASTOS MEDICO QUIRURGICOS', style: 'letraencajas' }, { text: this.SER4C2.impresion.VLRMQFACT, style: 'letraencajas', alignment: 'center' }, { text: this.SER4C2.impresion.VLRMQRECL, style: 'letraencajas', alignment: 'center' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ['40%', '30%', '30%'],
                                                    heights: 1,
                                                    body: [
                                                        [{ text: 'GASTOS DE TRANSPORTE Y MOVILIZACION DE LA VICTIMA', style: 'letraencajas' }, { text: this.SER4C2.impresion.VLRTRFACT, style: 'letraencajas', alignment: 'center' }, { text: this.SER4C2.impresion.VLRTRRECL, style: 'letraencajas', alignment: 'center' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    { text: "El total facturado y reclamado descrito en este numeral se debe detallar y hacer descripcion de las actividades, procedimientos, medicmanetos, insumos", style: 'titulostexto', margin: [5, 0] },
                                ],
                                [
                                    { text: "suministros y materiales, dentro del anexo técnico numero 2.", style: 'titulostexto', margin: [5, 0] },
                                ],
                                [
                                    {
                                        columns: [
                                            {
                                                table: {
                                                    widths: ["*"],
                                                    heights: 8,
                                                    body: [
                                                        [{ text: 'XI. DECLARACIONES DE LA INSTITUCION PRESTADORA DE SERVICIOS DE SALUD', style: 'letraencajas', color: 'white', fillColor: '#476fad' }],
                                                    ]
                                                },
                                                width: '100%',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    { text: "Como representante legal o Gerente de la Institución Prestadora de Srvicios de Salud, declaró bajo la gravedad de juramento que toda información contenida", style: 'titulostexto', margin: [5, 0] },
                                ],
                                [
                                    { text: "en este formulario es cierta y podra ser verificada por la Dirección General de Financimiento del Ministerio Protección Social, por el Administrador Fiduciario", style: 'titulostexto', margin: [5, 0] },
                                ],
                                [
                                    { text: "del Fondo de Solidaridad y Garantia Fosyga, por la Superintendencia Nacional de la Salud o la Contraloria General de la Republica con la IPS y las aseguradoras", style: 'titulostexto', margin: [5, 0] },
                                ],
                                [
                                    { text: "de no ser asi, acepto todas las consecuencias legales que produzca esta situación.", style: 'titulostexto', margin: [5, 0] },
                                ],
                                [
                                    { text: " ", style: 'titulostexto', margin: [5, 0] },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: " ", width: "50%" },
                                            {
                                                image: "firma",
                                                fit: [100, 40],
                                                width: "50%"
                                            }
                                        ]
                                    },
                                ],
                                [
                                    {
                                        columns: [
                                            { text: "                                       ", style: 'titulostexto', margin: [5, 0], width: '50%' },
                                            { text: "_______________________________________", style: 'titulostexto', width: '50%' },
                                        ],
                                    }
                                ],
                                [
                                    { text: "JAIME MORENO ROJAS", style: 'titulostexto', margin: [5, 0] },

                                ],
                                [
                                    {
                                        columns: [
                                            { text: "", style: 'titulostexto', margin: [5, 0], width: '50%' },
                                            { text: "FIRMA DEL REPRESENTANTE LEGAL, GERENTE O SU DELEGADO", style: 'titulostexto', width: '50%' },
                                        ],
                                    }
                                ],
                            ]
                        },
                        layout: {
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
                            },
                            paddingLeft: function (i, node) { return 0; },
                            paddingRight: function (i, node) { return 0; },
                            paddingTop: function (i, node) { return 0; },
                            paddingBottom: function (i, node) { return 0; }
                        },
                    },
                    {
                        columns: [
                            { text: `${this.SER4C2.impresion.PREFIJOFUR}${this.SER4C2.impresion.NROFUR}`, style: "letraencajas", width: '70%' },
                            { text: "CERRO:", style: "letraencajas", width: '6%' },
                            { text: this.SER4C2.FURIP.OPER_BLOQ_NUM, style: "letraencajas", width: '5%' },
                            { text: "ABRE:", style: "letraencajas", width: '5%' },
                            { text: this.SER4C2.FURIP.OPERNUM, style: "letraencajas", width: '5%' },
                            { text: "IMP:", style: "letraencajas", width: '4%' },
                            { text: localStorage.Usuario, style: "letraencajas", width: '5%' },
                        ]
                    }
                ],
                styles: {
                    headerimpresion: {
                        alignment: "center",
                        fontSize: 7,
                        bold: true,
                    },
                    headerimpresion2: {
                        alignment: "center",
                        fontSize: 7,
                        bold: true,
                    },
                    titulosseparadores: {
                        fontSize: 9,
                    },
                    titulostexto: {
                        fontSize: 7,
                        bold: true,
                    },
                    letraencajas: {
                        fontSize: 6,
                    },
                    tituloscentrados: {
                        fontSize: 8,
                        alignment: 'center'
                    },
                },
            };
            datosimpresion.images = {
                logo: "P:\\PROG\\LOGOS\\" + $_USUA_GLOBAL[0].NIT.toString() + ".png",
                firma: "P:\\PROG\\FIRMAS\\" + parseInt(SER4C2.FIRMAS.DATOS_GER).toString() + ".png",
            };
            _impresion2({
                tipo: 'pdf',
                content: datosimpresion,
                archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
            })
                .then(() => {
                    _toggleNav()
                })
                .catch((err) => {
                    console.error(err);
                    _toggleNav()
                });
        },
        construircuerpotabla(data) {
            console.log(data);
            var body = [];
            data.forEach(function (array) {
                body.push({ text: array, style: 'titulostexto' })
            })
            return body;
        },
        tablasFURIPS(data, width, height, widthcolumna) {
            return {
                table: {
                    widths: width,
                    heights: height,
                    body: [this.construircuerpotabla(data)],
                },
                width: widthcolumna,
            }
        },
        _ventanaFactura_SER4C2() {
            _ventanaDatos({
                titulo: 'VENTANA FACTURAS',
                columnas: [],
                mascara: ['NOMBRE'],
                data: SER4C2.FACTURARIPS,
                callback_esc: function () {
                    $('#factura_SER4C2').focus();
                },
                callback: function (data) {
                    $('#factura_SER4C2').val(data.COD);
                    _enterInput('#factura_SER4C2');
                }
            })
        },
        _ventanaCiudad_SER4C2() {
            let $_this = this
            loader('show')
            postData(
                {
                    datosh: datosEnvio(),
                },
                get_url("APP/CONTAB/CON809.DLL")
            )
                .then(data => {
                    loader('hide')
                    data.CIUDAD.pop()
                    _ventanaDatos({
                        titulo: 'VENTANA CIUDADES',
                        columnas: ['COD', 'NOMBRE'],
                        mascara: ['CODIGO', 'NOMBRE'],
                        data: data.CIUDAD,
                        callback_esc: function () {
                            $('.ciudad_SER4C2').focus();
                        },
                        callback: function (data) {
                            $_this.form.ciudad_SER4C2 = data.COD
                            _enterInput('.ciudad_SER4C2')
                        }
                    })
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    $('.ciudad_SER4C2').focus()
                })
        },
        _ventanaPropietario_SER4C2() {
            let $_this = this
            parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: (data) => {
                    $_this.form.propietario_SER4C2 = data.COD
                    _enterInput('.propietario_SER4C2')
                },
                cancel: () => {
                    $('.propietario_SER4C2').focus()
                }
            }
            F8LITE(parametros)
        },
        _ventanaConductor_SER4C2() {
            let $_this = this
            parametros = {
                dll: 'TERCEROS',
                valoresselect: ['Buscar por nombre tercero'],
                f8data: 'TERCEROS',
                columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
                callback: (data) => {
                    $_this.form.conductor_SER4C2 = data.COD
                    _enterInput('.conductor_SER4C2')
                },
                cancel: () => {
                    $('.conductor_SER4C2').focus()
                }
            }
            F8LITE(parametros)
        },
        _ventanaPlaca1_SER4C2() {
            let $_this = this
            loader('show');
            postData(
                { datosh: datosEnvio() },
                get_url("APP/SALUD/CER101.DLL")
            )
                .then(data => {
                    loader('hide')
                    data.CARROS.pop()
                    _ventanaDatos({
                        titulo: 'CONSULTA DE CARROS POR PLACA',
                        columnas: ["PLACA", "PROPIETARIO", "MARCA"],
                        data: data.CARROS,
                        ancho: '60%',
                        callback_esc: function () {
                            $('.placa1_SER4C2').focus()
                        },
                        callback: function (data) {
                            $_this.form.placa1_SER4C2 = data.PLACA.trim()
                            _enterInput('.placa1_SER4C2')
                        }
                    })
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    $('.placa1_SER4C2').focus()
                });
        },
        _ventanaPlaca2_SER4C2() {
            let $_this = this
            loader('show');
            postData(
                { datosh: datosEnvio() },
                get_url("APP/SALUD/CER101.DLL")
            )
                .then(data => {
                    loader('hide')
                    data.CARROS.pop()
                    _ventanaDatos({
                        titulo: 'CONSULTA DE CARROS POR PLACA',
                        columnas: ["PLACA", "PROPIETARIO", "MARCA"],
                        data: data.CARROS,
                        ancho: '60%',
                        callback_esc: function () {
                            $('.placa2_SER4C2').focus()
                        },
                        callback: function (data) {
                            $_this.form.placa2_SER4C2 = data.PLACA.trim()
                            _enterInput('.placa2_SER4C2')
                        }
                    })
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    $('.placa2_SER4C2').focus()
                });
        },
        _ventanaIPS1_SER4C2() {
            let $_this = this
            loader('show')
            postData(
                {
                    datosh: datosEnvio(),
                },
                get_url("APP/SALUD/SER813.DLL")
            )
                .then(data => {
                    loader('hide')
                    data.IPS.pop()
                    _ventanaDatos({
                        titulo: 'VENTANA IPS',
                        columnas: ['COD', 'DESCRIP'],
                        mascara: ['CODIGO', 'NOMBRE'],
                        data: data.IPS,
                        callback_esc: function () {
                            $('.ipsOrg_SER4C2').focus();
                        },
                        callback: function (data) {
                            $_this.form.ipsOrg_SER4C2 = data.COD
                            _enterInput('.ipsOrg_SER4C2')
                        }
                    })
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    $('.ipsOrg_SER4C2').focus()
                })
        },
        _ventanaIPS2_SER4C2() {
            let $_this = this
            loader('show')
            postData(
                {
                    datosh: datosEnvio(),
                },
                get_url("APP/SALUD/SER813.DLL")
            )
                .then(data => {
                    loader('hide')
                    data.IPS.pop()
                    _ventanaDatos({
                        titulo: 'VENTANA IPS',
                        columnas: ['COD', 'DESCRIP'],
                        mascara: ['CODIGO', 'NOMBRE'],
                        data: data.IPS,
                        callback_esc: function () {
                            $('.ipsOrg_SER4C2').focus();
                        },
                        callback: function (data) {
                            $_this.form.ipsDest_SER4C2 = data.COD
                            _enterInput('.ipsDest_SER4C2')
                        }
                    })
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    $('.ipsDest_SER4C2').focus()
                })
        },
        _ventanaPlacaAmbulancia_SER4C2() {
            loader('show')
            let $_this = this
            postData(
                { datosh: datosEnvio() },
                get_url("APP/SALUD/CER101.DLL")
            )
                .then(data => {
                    loader('hide')
                    data.CARROS.pop()
                    _ventanaDatos({
                        titulo: 'CONSULTA DE CARROS POR PLACA',
                        columnas: ["PLACA", "PROPIETARIO", "MARCA"],
                        data: data.CARROS,
                        ancho: '60%',
                        callback_esc: function () {
                            $('.placaAmb_SER4C2').focus()
                        },
                        callback: function (data) {
                            $_this.form.placaAmb_SER4C2 = data.PLACA.trim()
                            _enterInput('.placaAmb_SER4C2')
                        }
                    })
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    $('.placaAmb_SER4C2').focus()
                });
        },
        _ventanaEnfermedades_SER4C2(forma) {
            loader('show')
            let $_this = this
            postData(
                { datosh: `${datosEnvio()}|` },
                get_url("APP/SALUD/SER851.DLL")
            )
                .then(data => {
                    loader('hide')
                    data.ENFERMEDADES.pop()
                    _ventanaDatos({
                        titulo: 'VENTANA ENFERMEDADES',
                        columnas: ['COD_ENF', 'NOMBRE_ENF'],
                        mascara: ['CODIGO', 'NOMBRE'],
                        data: data.ENFERMEDADES,
                        callback_esc: function () {
                            $(`.${forma}`).focus()
                        },
                        callback: function (data) {
                            $_this.form[forma] = data.COD_ENF
                            _enterInput(`.${forma}`)
                        }
                    })
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    $(`.${forma}`).focus()
                })
        },
        _ventanaProfesional_SER4C2() {
            loader('show')
            let $_this = this
            postData(
                { datosh: `${datosEnvio()}|` },
                get_url("APP/SALUD/SER819.DLL")
            )
                .then(data => {
                    loader('hide')
                    data.ARCHPROF.pop()
                    _ventanaDatos({
                        titulo: 'VENTANA PROFESIONALES',
                        columnas: ['IDENTIFICACION', 'NOMBRE'],
                        mascara: ['ID', 'NOMBRE'],
                        data: data.ARCHPROF,
                        callback_esc: function () {
                            $('.medicoTratante_SER4C2').focus()
                        },
                        callback: function (data) {
                            $_this.form.medicoTratante_SER4C2 = data.IDENTIFICACION
                            _enterInput('.medicoTratante_SER4C2')
                        }
                    })
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    $('.medicoTratante_SER4C2').focus()
                })
        }
    }
})

// MASCARAS

var momentFormat = 'YYYY/MM/DD HH:mm';
var momentFormat2 = 'YYYY/MM/DD';
var fechaocurrMask = IMask($('#fecha_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
})

var fecharadMask_SER4C2 = IMask($('#fechaRadic_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat2,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        }
    }
})

var fechainipolMask = IMask($('#vigenDesde_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat2,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
})

var fechafinpolMask = IMask($('#vigenHasta_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat2,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
})

var fecharemiMask = IMask($('#fechaRemision_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(0000, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
})

var fechaacepMask_SER4C2 = IMask($('#fechaAceptacion_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
})

var fechaingMask_SER4C2 = IMask($('#fechaIngVic_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
})

var fechaegrMask_SER4C2 = IMask($('#fechaEgrVic_SER4C2')[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(1999, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
})

var valorfacturado_SER4C2 = IMask($('#quirurVlrFact_SER4C2')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 })
var valorreclamado_SER4C2 = IMask($('#quirurVlrRecl_SER4C2')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 })
var valorfacturado2_SER4C2 = IMask($('#transVlrFact_SER4C2')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 })
var valorreclamado2_SER4C2 = IMask($('#transVlrRecl_SER4C2')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: true, normalizeZeros: true, radix: '.', mapToRadix: ['.'], scale: 2 })