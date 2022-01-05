const exe = require('child_process').execFile,
    fs = require('fs');

var $_MENU,
    $_ARRAY = [];

function cargarMenu() {
    var modulo = localStorage['Modulo'], url = '';
    switch (modulo.trim()) {
        case 'NEW':
        case 'SAL': url = "../scripts/menu/menu_new.json";
            break;
        case 'HIC':
            let Window = BrowserWindow.getAllWindows();
            if (Window.length < 2) {
                var nav = $('.navbar-collapse');

                nav.hide('slide', function () {
                    $(this).attr('style', 'display:none!important;');
                });

                $('.page-fixed-main-content').animate({
                    'margin-left': '0'
                });

                $('.menuToggle').attr('style', 'display: none;');
                $('#body_main').load('../../HICLIN/paginas/MENU-HIS.html');
                url = "../scripts/menu/menu_hic.json";
            }
            break;
        case 'NOM': url = "../scripts/menu/menu_nom.json";
            break;
        case 'CER': url = "../scripts/menu/menu_cer.json";
            break;
        case 'PRS': url = "../scripts/menu/menu_prs.json";
            break;
        case 'BOM': url = "../scripts/menu/menu_bom.json";
            break;
        case 'PRD': url = "../scripts/menu/menu_prd.json";
            break;
        case 'SEP': url = "../scripts/menu/menu_sep.json";
            break;
        case 'BAR': url = "../scripts/menu/menu_bar.json";
            break;
        case 'RX': url = "../scripts/menu/menu_rx.json";
            break;
        case 'LAB': url = "../scripts/menu/menu_lab.json";
            break;
        case 'MIG': url = "../scripts/menu/menu_mig.json";
            break;
        case 'TAX': url = "../scripts/menu/menu_tax.json";
            break;
        case 'COR': url = "../scripts/menu/menu_cor.json";
            break;
        case 'MAN': url = "../scripts/menu/menu_man.json";
            break;
        case 'ODO':
            let w = BrowserWindow.getAllWindows();
            if (w.length < 2) {
                var nav = $('.navbar-collapse');

                nav.hide('slide', function () {
                    $(this).attr('style', 'display:none!important;');
                });

                $('.page-fixed-main-content').animate({
                    'margin-left': '0'
                });

                $('.menuToggle').attr('style', 'display: none;');
                $('#body_main').load('../../ODONTO/paginas/MENU-ODO.html');
                url = "../scripts/menu/menu_odo.json";
            }
            break;
        case 'DOM': url = "../scripts/menu/menu_dom.json";
            break;
        default: console.error('Menu de modulo no deifido -->' + modulo)
    }

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
    }).done(function (data) {
        $_MENU = data.Menu;
        mostrar_menu($_MENU, '0')
        organizar_array($_MENU);
        for (var i in $_ARRAY) delete $_ARRAY[i].Sub;
        if (modulo == 'HIC' || modulo == 'ODO') _cargarEventos('off')
        else _cargarEventos('on');
    });
}

function _cargarEventos(estado) {
    switch (estado) {
        case "on":
            $(document).on('click', '.opcion-menu', _eventoBotones)
            $(document).on('keydown', _eventoTeclas);
            $(document).on('click', '#regresar', _eventoRegresar)
            $(document).on('click', '#salir', salir_modulo)
            break;
        case "off":
            $(document).off('click', '.opcion-menu', _eventoBotones)
            $(document).off('keydown', _eventoTeclas);
            $('#regresar').off('click', _eventoRegresar)
            break;
    }
}

function _eventoBotones() {
    var dataOpcion = $(this).data(),
        idOpcion = dataOpcion.id.toString(),
        nuevaLista = buscar_opcion(idOpcion),
        data = data_opc(idOpcion),
        TIPO_EMPRESA = $_USUA_GLOBAL[0].TIPO_EMPRE,
        modulo = localStorage['Modulo'];
    localStorage.idOpciondata = idOpcion

    if ((modulo == 'NEW') &&
        (
            idOpcion == '0A1' ||
            idOpcion == '0A2' ||
            idOpcion == '0A3' ||
            idOpcion == '0A4' ||
            idOpcion == '0A5' ||
            idOpcion == '0A6'
        )
    ) {
        _toggleNav();
        _CON855A(data['Mask-lote'], '2')
    } else if (nuevaLista != false) {
        if (data.Tipo == 'MULTI') {
            if (idOpcion == '094' || idOpcion == '0272' || idOpcion == '034' || idOpcion == '0954' || idOpcion == '09A') {
                let busqueda = modulo == 'SAL' ? _buscarArray('2', nuevaLista) : _buscarArray('1', nuevaLista),
                    lista = buscar_opcion(busqueda);
                mostrar_menu(lista);
                set_titulo(idOpcion);
            }
        } else if (data.Tipo == 'VALIDAR') {
            ////////////
            if (data.Id == '0A') _validarOpcion_0A()
            ////////////
        } else if (idOpcion == '097' && data.Tipo == 'SALUD') {
            if (modulo == 'SAL') {
                mostrar_menu(nuevaLista);
                set_titulo(idOpcion);
            } else {
                var msj
                msj = msjError('49');
                jAlert({ titulo: 'Error', mensaje: `<b>Mensaje: </b> ${msj}` })
            }
        } else {
            _cargarEventos("off");
            _validarSegu(
                data,
                () => {
                    if (modulo == "HIC") {
                        _validarOpcionMainHc(
                            dataOpcion,
                            () => {
                                _cargarEventos("on");
                                mostrar_menu(nuevaLista);
                                set_titulo(idOpcion);
                            },
                            (err) => {
                                console.log(err);
                                _cargarEventos("on");
                            }
                        );
                    } else {
                        _cargarEventos("on");
                        mostrar_menu(nuevaLista);
                        set_titulo(idOpcion);
                    }
                },
                (err) => {
                    console.log(err);
                    _cargarEventos("on");
                }
            );

        }
    } else {
        if (data.Tipo == 'F01') {
            if (data.Params[0]["dll-suc"][$_LOTE_MENUCHECK.lote2]) {
                data.lote = $_LOTE_MENUCHECK
                _validarVentanaMain(data)
            } else console.error('Lote sin definir');
        } else if (data.Tipo == 'ERROR') {
            var msj
            msj = msjError(cerosIzq(data.Cod.trim(), 2));
            jAlert({ titulo: 'Error', mensaje: `<b>Mensaje: </b> ${msj}` })
        } else if (data.Tipo == 'POWER' || data.Tipo == 'RM'
            || data.Href || data.Tipo == 'JS') {
            _validarVentanaMain(data);
        } else {
            console.error('Programa sin definir')
        }
    }
}

function _validarSegu(datos, callback, callbackError) {
    var segw = $_USUA_GLOBAL[0]['SEG-MOV'];
    validarSegw = datos["Seg-w"] ? datos["Seg-w"].find(element => element == segw) : false;

    if (validarSegw) {
        CON851B($_USUA_GLOBAL[0]['SEG-MOV'], _toggleNav);
    } else {
        let opc_segu = datos["Opc-segu"];
        var datosEnvio = localStorage.Sesion
            + '|' + localStorage.Contab
            + '|' + localStorage.Mes
            + '|' + localStorage.Usuario
            + '|' + opc_segu + '|';

        if (opc_segu) {
            postData({ datosh: datosEnvio }, get_url("APP/CONTAB/CON904.DLL"))
                .then(callback)
                .catch(callbackError);
        } else {
            callback();
        }
    }
}

function _infoRm_bat(data) {
    console.log(data, 'data');
    var mes = evaluarMes_min(localStorage.Mes),
        usuario = espaciosDer(localStorage.Usuario, 4),
        clave = localStorage.Clave ? espaciosDer(localStorage.Clave, 8) : '########',
        cbl = data.params[0].dll;

    var segw = $_USUA_GLOBAL[0]['SEG-MOV'] ? $_USUA_GLOBAL[0]['SEG-MOV'] : '*'
    var argumentos = `${usuario}-${cbl}-${segw}`;
    var programa = 'MAIN';
    var extra = data.params[0]['extra'];

    let cod_paciente = ""
    if ((modulo = localStorage.Modulo == "HIC")) {
        cod_paciente = $_REG_HC.id_paciente.replace(/\-/, "_");
    }

    switch (cbl) {
        case 'SALUD\\SER109H':
            opc_segu = data.opc_segu.padStart(6, "#");

            argumentos = `${argumentos}-${opc_segu}`;
            break;
        // case "SALUD\\SER108":
        //     programa = "MAIN";
        //     break;
        case 'SALUD\\SER604':
        case 'HICLIN\\HC004':
        case 'HICLIN\\MENUH03':
        case 'HICLIN\\HC002':
        case 'HICLIN\\HC012':
        case 'HICLIN\\HC002F':
        case 'HICLIN\\HC044':
        case 'HICLIN\\HC003':
        case 'HICLIN\\HC003A':
        case 'HICLIN\\HC522':
        case 'HICLIN\\HC523':
        case 'HICLIN\\HC524':
        case 'HICLIN\\HC525':
        case 'HICLIN\\HC526':
        case 'HICLIN\\HC527':
        case 'HICLIN\\HC528':
        case 'HICLIN\\HC529':
        case 'HICLIN\\HC52A':
        case 'HICLIN\\AIEPI000':
        case 'HICLIN\\VACUNAS':
        case 'HICLIN\\VACUNASI':
        case 'HICLIN\\PYP1':
        case 'HICLIN\\PYP1I':
        case 'HICLIN\\HC003C':
        case 'HICLIN\\HC003D':
        case 'HICLIN\\HC601':
        case 'HICLIN\\HC602':
        case 'HICLIN\\HC603':
        case 'HICLIN\\HC604':
        case 'HICLIN\\HC605':
        case 'HICLIN\\HC605B':
        case 'HICLIN\\HC606':
        case 'HICLIN\\HC6062':
        case 'HICLIN\\HC607':
        case "HICLIN\\HC608":
        case "HICLIN\\HC609":
        case "HICLIN\\HC610":
        case "HICLIN\\HC611":
        case "HICLIN\\HC612":
        case "HICLIN\\HC701":
        case "HICLIN\\HC702":
        case "HICLIN\\LAB122":
        case "HICLIN\\HC704":
        case "HICLIN\\HC705":
        case "HICLIN\\HC706":
        case "HICLIN\\HC707":
        case "HICLIN\\HC708":
        case "HICLIN\\HC709":
        case "HICLIN\\HC710":
        case "HICLIN\\HC711":
        case "HICLIN\\HC7A3":
        case "HICLIN\\HC712":
        case "HICLIN\\HCI02M1":
        case "HICLIN\\HCI522":
        case "HICLIN\\HCI523":
        case "HICLIN\\HCI524":
        case "HICLIN\\HCI525":
        case "HICLIN\\HCI526":
        case "HICLIN\\HCI527":
        case "HICLIN\\HC529A":
        case "HICLIN\\HC52C":
        case "HICLIN\\HC52D":
        case "HICLIN\\HC712D":
        case "SALUD\\SER4B3":
        case "HICLIN\\GRAFDESA":
        case "HICLIN\\GRAFEMBA":
        case "HICLIN\\CIR001":
        case "HICLIN\\CIRUGIA":
        case "HICLIN\\HC003":
        case "HICLIN\\HC529":
        case "HICLIN\\CIR901":
        case "HICLIN\\HC901":
        case "HICLIN\\HC902":
        case "HICLIN\\HC903":
        case "HICLIN\\HC904":
        case "HICLIN\\HC904A":
        case "HICLIN\\HC904B":
        case "HICLIN\\HC905":
        case "HICLIN\\HC9052":
        case "HICLIN\\HC9053":
        case "HICLIN\\HC9054":
        case "HICLIN\\HC9055":
        case "HICLIN\\HC9056":
        case "HICLIN\\HC9571":
        case "SALUD\\SER01M":
        case "HICLIN\\HC9058":
        case "HICLIN\\HC9059":
        case "HICLIN\\HC905A":
        case "HICLIN\\HC905B":
        case "HICLIN\\HC905C":
        case "HICLIN\\HC905D1":
        case "HICLIN\\HC905D2":
        case "HICLIN\\HC905E":
        case "HICLIN\\HC905E1":
        case "HICLIN\\CLAP001":
        case "HICLIN\\HCRN1":
        case "HICLIN\\HCRNI":
        case "HICLIN\\HC01451":
        case "HICLIN\\HC01452":
        case "HICLIN\\HC01453":
        case "HICLIN\\HC01454":
        case "HICLIN\\HC01455":
        case "HICLIN\\HC01456":
        case "HICLIN\\HC01457":
        case "HICLIN\\HCANEOST":
        case "HICLIN\\HCANEAUD":
        case "HICLIN\\HCANEOPT":
        case "HICLIN\\HCANERODRI":
        case "HICLIN\\PARTOGR":
        case "HICLIN\\PART901":
        case "HICLIN\\CTREF803":
        case "HICLIN\\CTREF801":
        case "HICLIN\\HCB04":
        case "HICLIN\\HCBI04":
        case "HICLIN\\CTREF801":
        case "HICLIN\\CTREF802":
        case "SALUD\\SERB01":
        case "SALUD\\SERB03":
        case "SALUD\\SERB04":
        case "SALUD\\SERB05":
        case "SALUD\\SERB06":
        case "SALUD\\SERB07":
        case "SALUD\\SERB101":
        case "SALUD\\SERB102":
        case "SALUD\\SERB103":
        case "SALUD\\SERB104":
        case "SALUD\\SERB105":
        case "SALUD\\SER202":
        case "HICLIN\\HC102":
        case "HICLIN\\HC103":
        case "HICLIN\\HC104":
        case "HICLIN\\HC105":
        case "HICLIN\\HC106":
        case "HICLIN\\HC107":
        case "HICLIN\\HC108":
        case "HICLIN\\HC109":
        case "CONTAB\\CON888":
        case "SALUD\\SALVMN":
        case "CONTAB\\CON880E":
        case "CONTAB\\CON880R":
        case "CONTAB\\CON880P1":
        case "CONTAB\\CON880P2":
        case "CONTAB\\MANT201":
        case "CORRES\\CORR401":
        case "CORRES\\CORR868D":
        case "SALUD\\SER7G4":
        case "HICLIN\\CLAPI001":
            programa = "MENU-HIS-ELECTRON"
            argumentos = `${argumentos}-${cod_paciente}-${$_REG_HC.suc_folio_hc}-${$_REG_HC.nro_folio_hc}-`;
            break;
        case "HICLIN\\AIEPI001":
        case "HICLIN\\AIEPI002":
        case "HICLIN\\HC02":
        case "HICLIN\\HC01":
        case "HICLIN\\HC12":
        case "HICLIN\\HC13":
        case "HICLIN\\HC14":
        case "HICLIN\\HC8001":
        case "HICLIN\\HC8002":
        case "HICLIN\\HC8031":
        case "HICLIN\\HC8051":
        case "HICLIN\\HC9004":
            programa = "MENU-HIS-ELECTRON"
            argumentos = `${argumentos}-${cod_paciente}-${$_REG_HC.suc_folio_hc}-${$_REG_HC.nro_folio_hc}-${$_REG_HC.serv_hc}-${$_REG_HC.finalid_hc}-${$_REG_PROF.IDENTIFICACION.trim()}-`;
            break;
        case "HICLIN\\HC9012":
            programa = "MENU-HIS-ELECTRON"
            argumentos = `${argumentos}-${data.params[0].parametros.id_paci}-${data.params[0].parametros.suc_folio}-${data.params[0].parametros.nro_folio}-${data.params[0].parametros.edad}-${data.params[0].parametros.medico}-${data.params[0].parametros.fecha}---${data.params[0].parametros.unidServ}-${data.params[0].parametros.finalidad}-`;
            break;
        case "HICLIN\\HCI02":
            programa = "MENU-HIS-ELECTRON";
            argumentos = `${argumentos}-${cod_paciente}-${$_REG_HC.suc_folio_hc}-${$_REG_HC.nro_folio_hc}-${data.params[0].extra}`
            break;
        case "HICLIN\\CONSEN05I":
            programa = "MENU-HIS-ELECTRON";
            argumentos = `${argumentos}-${cod_paciente}-${$_REG_HC.suc_folio_hc}-${$_REG_HC.nro_folio_hc}-${data.params[0].extra}`
            break;
        case "CONTAB\\CON090":
            argumentos = `${argumentos}-${cod_paciente}-${$_REG_HC.suc_folio_hc}-${$_REG_HC.nro_folio_hc}-${data.params[0].extra}`
            break;
        case "HICLIN\\HCI8001":
        case "HICLIN\\HCI8002":
        case "HICLIN\\HCI8031":
        case "HICLIN\\HCI8051":
        case "HICLIN\\AIEPI020":
            programa = "MENU-HIS-ELECTRON";
            argumentos = `${argumentos}-${data.params[0].reg_hc.id_paci}-${data.params[0].reg_hc.suc_folio}-${data.params[0].reg_hc.nro_folio}-${data.params[0].extra}`
            break;
        case "HICLIN\\PYP1I":
        case "HICLIN\\HCI9007":
            programa = "MENU-HIS-ELECTRON";
            argumentos = `${argumentos}-${data.params[0].reg_hc.id_paci}-${data.params[0].reg_hc.suc_folio}-${data.params[0].reg_hc.nro_folio}`
            break;

        case "HICLIN\\HCI9010":
        case "HICLIN\\HCI9011":
        case "HICLIN\\CLAPI001":
            programa = "MENU-HIS-ELECTRON";
            argumentos = `${argumentos}-${data.params[0].reg_hc.id_paci}-${data.params[0].reg_hc.suc_folio}-${data.params[0].reg_hc.nro_folio}-${data.params[0].extra}`
            break;
        case "HICLIN\\HC002B":
            programa = "MENU-HIS-ELECTRON";
            argumentos = `${argumentos}-${data.params[0].reg_hc.id_paci}-${data.params[0].reg_hc.suc_folio}-${data.params[0].reg_hc.nro_folio}-${data.params[0].extra}`
            break;
        case "HICLIN\\HC9007":
            programa = "MENU-HIS-ELECTRON";
            argumentos = `${argumentos}-${data.params[0].reg_hc.id_paci}-${data.params[0].reg_hc.suc_folio}-${data.params[0].reg_hc.nro_folio}`
            break;

        case "HICLIN\\HC9010":
        case "HICLIN\\HC9011":
        case "HICLIN\\PYP2":
            programa = "MENU-HIS-ELECTRON";
            argumentos = `${argumentos}-${data.params[0].reg_hc.id_paci}-${data.params[0].reg_hc.suc_folio}-${data.params[0].reg_hc.nro_folio}-${data.params[0].reg_hc.edad}-${data.params[0].reg_hc.medico}-${data.params[0].reg_hc.fecha}}`
            break;

        /** Se agrega llamado de programas para ODONTOLOGIA ---> Marlly */
        case 'SALUD\\SER110C':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\OD001':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-${$_REG_OD.suc_folio_hc}-${$_REG_OD.nro_folio_hc}-`;
            break;
        case 'ODONTO\\OD002':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-${$_REG_OD.nro_folio_hc}-`;
            break;
        case 'ODONTO\\OD022':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\OD605':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\OD601':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\OD603':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\OD604':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\OD501':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-${$_REG_OD.suc_folio_hc}-${$_REG_OD.nro_folio_hc}-`;
            break;

        case 'ODONTO\\OD502':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-${$_REG_OD.suc_folio_hc}-${$_REG_OD.nro_folio_hc}-`;
            break;
        case 'ODONTO\\OD705B':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-${$_REG_OD.suc_folio_hc}-${$_REG_OD.nro_folio_hc}-`;
            break;
        case 'ODONTO\\OD705B':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-${$_REG_OD.suc_folio_hc}-${$_REG_OD.nro_folio_hc}-`;
            break;

        case 'SALUD\\SER202':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;

        case 'ODONTO\\HC102':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\HC103':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\HC104':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\HC105':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\HC107':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;

        case 'ODONTO\\HIS802A':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;

        /*       case 'CONTAB\\CON880R':
                   programa = "MENU-ODO-ELECTRON";
                   argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
                   break;
               case 'CORRES\\CORR401':
                   programa = "MENU-ODO-ELECTRON";
                   argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
                   break;
       
               case 'CORRES\\CORR868D':
                   programa = "MENU-ODO-ELECTRON";
                   argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
                   break;
       */
        case 'ODONTO\\OD009':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\OD0092':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\OD0093':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\OD0094':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\OD0095':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\CTREFOD803':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;

        case 'ODONTO\\CTREFOD801':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\ODB04':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\ODBI04':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\CTREFOD801':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;
        case 'ODONTO\\CTREFOD802':
            programa = "MENU-ODO-ELECTRON";
            argumentos = `${argumentos}-${$_REG_OD.id_paciente}-`;
            break;

        /** Fin llamado de programas de ODONTOLOGIA ---> Marlly */


    }
    console.log(argumentos);

    var batch = `
    ECHO OFF\r\n
    TITLE MAIN_ELECT\r\n
    ${localStorage.Unidad}:\r\n
    CD \\${localStorage.Contab}\\${mes}\r\n
    set p1=${argumentos.padEnd(100, '*')} \r\n
    SET RUNPATH=\\NEWCOBOL\\MAIN\\;\\NEWCOBOL\\HICLIN\\;\\NEWCOBOL\\SALUD\\;\\NEWCOBOL\\CONTAB\\;\\NEWCOBOL\\INVENT\\;\\NEWCOBOL\\ODONTO\\;EXPORT RUNPATH\r\n
    runcobol ${programa} k c=${localStorage.Unidad}:\\rmcobol\\windows.cfg A %p1%\r\n
    `;

    // var batch = `
    // ECHO OFF\r\n
    // TITLE MAIN_ELECT\r\n
    // ${localStorage.Unidad}:\r\n
    // CD \\${localStorage.Contab}\\${mes}\r\n
    // set p1=${ argumentos.padEnd(100, '*')} \r\n
    // SET RUNPATH=\\NEWCOBOL\\MAIN\\;C:\\NEWCOBOL\\HICLIN\\;C:\\NEWCOBOL\\SALUD\\;C:\\NEWCOBOL\\CONTAB\\;C:\\NEWCOBOL\\INVENT\\;EXPORT RUNPATH\r\n
    // runcobol ${programa} k c=C:\\rmcobol\\windows.cfg A %p1%\r\n
    //     `;

    var nombre_bat = "C:\\PROSOFT\\TEMP\\MENU-" + localStorage.Sesion.trim() + ".BAT";

    let retornar = {
        nombre_bat: nombre_bat,
        batch: batch
    }

    return retornar;

}

function _validarScript_bat(data) {
    var lote = data.lote;
    if (data.tipo == 'F01') {
        if (data.params[0]['dll-suc'][lote.lote2]) {
            data.params[0].dll = data.params[0]['dll-suc'][lote.lote2].dll;
            data.params[0].formulario = data.params[0]['dll-suc'][lote.lote2].formulario;
            data.params[0].sucursal = lote.lote1;
            data.params[0]['Tipo-comp'] = lote.lote1 + lote.lote2;
        }
    }

    var modulo = localStorage.Modulo
    var contab = localStorage.Contab,
        mes = evaluarMes_min(localStorage.Mes),
        usuario = espaciosDer(localStorage.Usuario, 4),
        clave = espaciosDer(localStorage.Clave, 8),
        formulario = data.params[0].formulario,
        dll = data.params[0].dll,
        sucursal = data.params[0].Sucursal ? data.params[0].Sucursal : '0',
        tipoComp = data.params[0]['Tipo-comp'] ? espaciosDer(data.params[0]['Tipo-comp'], 2) : '  ',
        novedad = data.params[0].Novedad || '7',
        codigo = data.params[0].Codigo || '',
        tipoOpcion = data.params[0]['Tipo-Opcion'] ? espaciosDer(data.params[0]['Tipo-Opcion'], 2) : '  ',
        tr_pre005 = data.params[0]['tr_pre005'] ? cerosIzq(data.params[0]['tr_pre005'], 2) : '  ';
    NomFact = data.params[0]['NomFact'] ? espaciosDer(data.params[0]['NomFact'], 4) : '    ',
        nro_fact = data.params[0]['nro_fact'] || '';

    var params = usuario
        + "," + clave
        + "," + formulario
        + "," + dll
        + "," + sucursal
        + "," + tipoOpcion
        + "," + tipoComp
        + "," + novedad
        + "," + codigo.padStart(10, '0')
        + "," + modulo
        + ",\\" + contab
        + "," + tr_pre005
        + "," + NomFact
        + "," + nro_fact
        + ",";

    var titulo = contab + "\\"
        + mes
        + "     "
        + data.id.substring(1, data.id.length).split('').join(',') + " "
        + data.descripcion
        + "     "
        + usuario;

    var nombre_bat = "C:\\PROSOFT\\TEMP\\MENU-" + localStorage.Sesion.trim() + ".BAT";

    var batch
    switch (modulo) {
        case 'NOM':
            batch = "ECHO OFF\r\n"
                + localStorage.Unidad + ":\r\n"
                + "CD\\" + contab + "\\NOMINA\\" + localStorage.Nomina + "\r\n"
                + "START C:\\PWCOBOL\\MAIN.EXE " + params + titulo + "\r\n";
            break;
        case 'PRS':
            batch = "ECHO OFF\r\n"
                + localStorage.Unidad + ":\r\n"
                + "CD\\" + contab + "\\PRE" + "\r\n"
                + "START C:\\PWCOBOL\\MAIN.EXE " + params + titulo + "\r\n";
            break;
        default:
            batch = "ECHO OFF\r\n"
                + localStorage.Unidad + ":\r\n"
                + "CD\\" + contab + "\\" + mes + "\r\n"
                + "START C:\\PWCOBOL\\MAIN.EXE " + params + titulo + "\r\n";
            break;
    }
    let retornar = {
        nombre_bat: nombre_bat,
        batch: batch
    }
    return retornar;
}

function _eventoRegresar() {
    var idOpcion = $('#navegacion').find('li.opcion-menu');
    idOpcion = $(idOpcion).data().id.toString()
    idOpcion = idOpcion.substring(0, idOpcion.length - 2);

    if (idOpcion.length != 0) {
        var data = data_opc(idOpcion)
        if (data.Tipo == "MULTI") idOpcion = idOpcion.slice(0, -1);
        let nuevaLista = buscar_opcion(idOpcion.toString());
        setTimeout(() => {
            mostrar_menu(nuevaLista, idOpcion);
        }, 10);
    } else if (localStorage.Modulo == "HIC") {
        window.location.reload();
    }
    set_titulo(idOpcion)
}

function _eventoTeclas(e) {
    var opcion;
    var key = e.which;
    if (key == "97" || key == "49") opcion = "1";
    else if (key == "98" || key == "50") opcion = "2";
    else if (key == "99" || key == "51") opcion = "3";
    else if (key == "100" || key == "52") opcion = "4";
    else if (key == "101" || key == "53") opcion = "5";
    else if (key == "102" || key == "54") opcion = "6";
    else if (key == "103" || key == "55") opcion = "7";
    else if (key == "104" || key == "56") opcion = "8";
    else if (key == "105" || key == "57") opcion = "9";
    else if (key == "65") opcion = "A";
    else if (key == "66") opcion = "B";
    else if (key == "67") opcion = "C";
    else if (key == "68") opcion = "D";
    else if (key == "69") opcion = "E";
    else if (key == "71") opcion = "G";
    else if (key == "72") opcion = "H";
    else if (key == "73") opcion = "I";
    else if (key == "74") opcion = "J";
    else if (key == "75") opcion = "K";
    else if (key == "76") opcion = "L";
    else if (key == "77") opcion = "M";
    else if (key == "78") opcion = "N";
    else if (key == "79") opcion = "O";
    else if (key == "80") opcion = "P";
    else if (key == "81") opcion = "Q";
    else if (key == "82") opcion = "R";
    else if (key == "84") opcion = "S";
    else if (key == "85") opcion = "T";
    else if (key == "86") opcion = "U";
    else if (key == "87") opcion = "V";

    else if (key == "70" || key == "27") opcion = "regresar";
    else if (key == "83" || key == "87") salir_modulo()
    else { opcion = null; console.error('Tecla no definida'); }

    if (opcion) $('#' + opcion).click();
}

function _buscarArray(id, array) {
    var retornar = false;
    for (var i in array) {
        let temp = array[i].Id.slice(-1);
        if (temp == id) retornar = array[i].Id;
    }

    return retornar;
}

function organizar_array(obj) {
    for (var i in obj) {
        $_ARRAY.push(obj[i]);
        if (obj[i].Sub) organizar_array(obj[i].Sub)
    }
}

function buscar_opcion(idOpcion) {
    var retorno = [];
    for (var i in $_ARRAY) {
        let id_tmp = $_ARRAY[i].Id.substring(0, $_ARRAY[i].Id.length - 1);
        if (id_tmp === idOpcion) retorno.push($_ARRAY[i]);
    }
    if (retorno.length == 0) retorno = false;
    return retorno;
}

function data_opc(idOpcion) {
    var tmp;
    for (var i in $_ARRAY) {
        let id_tmp = $_ARRAY[i].Id;
        if (id_tmp === idOpcion) tmp = $_ARRAY[i];
    }
    return tmp || false;
}

function set_titulo(val) {
    var title;
    for (var i in $_ARRAY)
        if ($_ARRAY[i].Id == val) title = $_ARRAY[i].Descripcion;
    title = title ? title + " - " + val.substr(1, val.length).split('').join('-') : "";
    $('.titulo').html(title || 'PRINCIPAL');
}

function mostrar_menu(list, idOpcion) {
    var modulo = localStorage['Modulo'];
    if (list.length != 0) {
        $('#navegacion').html('');
        jQuery.each(list, function (idx) {
            let index = idx + 1;
            if (index == 10) index = 'A';
            else if (index == 11) index = 'B';
            else if (index == 12) index = 'C';
            else if (index == 13) index = 'D';
            else if (index == 14) index = 'E';
            else if (index == 15) index = 'G';
            else if (index == 16) index = 'H';
            else if (index == 17) index = 'I';
            else if (index == 18) index = 'J';
            else if (index == 19) index = 'K';
            else if (index == 20) index = 'L';
            else if (index == 21) index = 'M';
            else if (index == 22) index = 'N';
            else if (index == 23) index = 'O';
            else if (index == 24) index = 'P';
            else if (index == 25) index = 'Q';
            else if (index == 26) index = 'R';
            else if (index == 27) index = 'S';
            else if (index == 28) index = 'T';
            else if (index == 29) index = 'U';
            else if (index == 30) index = 'V';

            let id = this.Id.substring(1, this.Id.length);
            let temp = this.Id.substr(this.Id.length - 1, this.Id.length);
            // if (this.Id != '0B' || modulo == 'BOM')
            if (this.Id)
                $('#navegacion').append(''
                    + '<li class="opcion-menu nav-item" id="' + index + '" data-id="' + this.Id + '">'
                    + ' <a class="nav-link nav-toggle">'
                    + temp + ' - ' + this.Descripcion
                    + ' </a>'
                    + '</li>'
                )
        });

        if (modulo !== "HIC") {
            if (idOpcion == "0") {
                $("#navegacion").append(
                    "" +
                    '<li class="nav-item" id="salir">' +
                    ' <a class="nav-link nav-toggle">' +
                    "  S - Salir del programa" +
                    " </a>" +
                    "</li>"
                );
            } else {
                $("#navegacion").append(
                    "" +
                    '<li class="nav-item" id="regresar">' +
                    ' <a class="nav-link nav-toggle">' +
                    "  F - Regresar" +
                    " </a>" +
                    "</li>"
                );
            }
        } else {
            $("#navegacion").append(
                "" +
                '<li class="nav-item" id="regresar">' +
                ' <a class="nav-link nav-toggle">' +
                "  F - Regresar" +
                " </a>" +
                "</li>"
            );
        }

    } else {
        console.error('Sin opciones')
    }
}

function loadScript(script, callback) {
    var elemento = document.createElement("script");
    elemento.onload = callback;
    elemento.src = script;
    document.querySelector("head").appendChild(elemento);
}

function salir_modulo() {
    var elementExists = document.getElementById("salir");

    if (elementExists) {
        var { ipcRenderer } = require('electron');
        ipcRenderer.send('ping', { param: 'salir' })
    }
}
function _validarOpcionMainHc(data, callback, callbackError) {
    let parametros = {
        datosh: `${datosEnvio() + localStorage.Usuario}|`,
        llave_hc: $_REG_HC.llave_hc,
        medico_hc: $_REG_PROF.IDENTIFICACION,
        opcion: data.id,
    };

    postData(parametros, get_url("APP/HICLIN/MAIN_HC.dll"))
        .then(callback)
        .catch((err) => {
            if (callbackError) callbackError(err);
        });
}