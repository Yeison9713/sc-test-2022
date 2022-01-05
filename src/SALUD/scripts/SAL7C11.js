// 05/06/2020 -> CAMILO FRANCO -> CREACION //

const moment = require("moment");

var SAL97C11 = [];
var $_REG_PACI = [];
var $_REG_ENT = [];
var $_REG_TERCE = [];
var $SW_PASO = 0;
var $_SER835;


var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    let active = $('#navegacion').find('li.opcion-menu.active');
    if (active.length > 0) SAL97C11.OPCIONACTIVA = active[0].attributes[2].nodeValue;
    else SAL97C11.OPCIONACTIVA = '097C11'
    let Nombreopcion = {
        '097C11': '9,7,C,1,1 - Actualizar Citas',
        '097C12': '9,7,C,1,2 - Reimprime Citas',
        '097C13': '9,7,C,1,3 - Cancelacion de Citas',
    }
    nombreOpcion(Nombreopcion[SAL97C11.OPCIONACTIVA]);
    if (SAL97C11.OPCIONACTIVA == '097C12' || SAL97C11.OPCIONACTIVA == '097C13') SAL97C11.NOVEDADW = '8'
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    SAL97C11.NITUSU = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CONTADOUSU = $_USUA_GLOBAL[0].CONTADO;
    $_PUCUSU = $_USUA_GLOBAL[0].PUC;
    $_LOTEFARMUSU = $_USUA_GLOBAL[0].LOTE_FAMR;
    SAL97C11.SALMINUSU = $_USUA_GLOBAL[0].SAL_MIN;
    $_BARRAS_USU = $_USUA_GLOBAL[0].BARRAS;
    $_IVA_USU = $_USUA_GLOBAL[0].IVA1;
    $_IVA_2_USU = $_USUA_GLOBAL[0].IVA2;
    $_IVA_3_USU = $_USUA_GLOBAL[0].IVA3;
    $_CLAVEINVUSU = $_USUA_GLOBAL[0].CLAVE_INV;
    $_BARRASUSULNK = ' ';
    $_LISTAPRECIOUSU = $_USUA_GLOBAL[0].LISTA_PRECIO;
    $_CODCIUUSU = $_USUA_GLOBAL[0].CONTROL_USU
    $_DPTCIUUSU = $_CODCIUUSU.substring(0, 1);
    $_CIUCIUUSU = $_CODCIUUSU.substring(1, 5);
    SAL97C11.HORAACT = moment().format('HH:mm');
    SAL97C11.VARBANDERA = ""

    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SAL97C11.SERVICIOS = [
            { COD: '0', DESCRIPCION: 'DROGUERIA' },
            { COD: '1', DESCRIPCION: 'CIRUGIAS' },
            { COD: '2', DESCRIPCION: 'ECOGRAFIAS' },
            { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
            { COD: '4', DESCRIPCION: 'DOPPLER' },
            { COD: '5', DESCRIPCION: 'T.A.C.' },
            { COD: '6', DESCRIPCION: 'RESONANCIA NUCLEAR' },
            { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
        ]
    } else {
        SAL97C11.SERVICIOS = [
            { COD: '0', DESCRIPCION: 'DROGUERIA' },
            { COD: '1', DESCRIPCION: 'CIRUGIAS' },
            { COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
            { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
            { COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
            { COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
            { COD: '6', DESCRIPCION: 'PATOLOGIA' },
            { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
        ]
    }
    $('#sucursal_97C11').val($_USUA_GLOBAL[0].PREFIJ.trim());
    obtenerDatosCompletos({ nombreFd: 'PROFESION' }, function (data) {
        loader('hide');
        SAL97C11.PROFESION = data.PROFESION;
        for (var i in SAL97C11.PROFESION) {
            if (SAL97C11.PROFESION[i].COD.trim() == '3' || SAL97C11.PROFESION[i].COD.trim() == '9' || SAL97C11.PROFESION[i].COD.trim() == 'B' || SAL97C11.PROFESION[i].COD.trim() == 'I') {
                SAL97C11.PROFESION.splice(i, 1);
            }
        }
        OPCIONES = new Object;
        OPCIONES = {
            '097C11': () => { CON850(_evaluarCON850_SAL97C11) },
            '097C12': _evaluarpaciente_SAL97C11,
            '097C13': _evaluarpaciente_SAL97C11,
        }
        let opcion = new Function();
        opcion = OPCIONES[SAL97C11.OPCIONACTIVA];
        opcion();
    });
    _toggleF8([
        {
            input: "numero",
            app: "97C11",
            funct: _ventanaPacientes
        },
        {
            input: 'medico',
            app: '97C11',
            funct: _ventanaprofesionales_SAL7C11
        },
        {
            input: 'procedimiento',
            app: '97C11',
            funct: _ventanatablatarifas_SAL97C11
        },
        {
            input: 'clase',
            app: '97C11',
            funct: _ventanaclase_SAL97C11
        }

    ]);
});

function _evaluarCON850_SAL97C11(data) {
    SAL97C11.NOVEDADW = data.id;
    switch (data.id) {
        case '7':
        case '8':
        case '9':
            if (SAL97C11.NITUSU == '0800162035') {
                SER848(data => {
                    console.log(data);
                    SAL97C11.PACIW = data.padStart(15, "0");
                    pacienteMask_SAL97C11.typedValue = SAL97C11.PACIW;
                    _evaluarpaciente_SAL97C11();
                },
                    () => {
                        setTimeout(() => {
                            CON850(_evaluarCON850_SAL97C11);
                        }, 100);
                    })
            } else {
                _evaluarpaciente_SAL97C11();
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
    $('#novedad_97C11').val(data.id + ' - ' + data.descripcion)
}

function _evaluarpaciente_SAL97C11() {
    validarInputs({
        form: "#NUMERO_97C11",
        orden: '1'
    },
        () => {
            if (SAL97C11.OPCIONACTIVA == '097C11') setTimeout(() => { CON850(_evaluarCON850_SAL97C11) }, 300)
            else _toggleNav();
        },
        () => {
            SAL97C11.PACIW = pacienteMask_SAL97C11.unmaskedValue.padStart(15, "0");
            if (parseInt(SAL97C11.PACIW) == 0) {
                if (SAL97C11.NOVEDADW == '8') {
                    setTimeout(_evaluartipoprofesion_SAL97C11, 200);
                } else {
                    CON851('02', '02', null, 'error', 'Error');
                    _evaluarpaciente_SAL97C11();
                }
            } else if ((parseInt(SAL97C11.PACIW) < 100) && ($.isNumeric(SAL97C11.PACIW))) {
                SAL97C11.DERECHOPACIW = '1';
                SAL97C11.DESCRIPPACIW = ' '
                SAL97C11.EPSPACIW = ' '
                _mostrarpaciente_SAL97C11();
            } else {
                _mostrarpaciente_SAL97C11()
            }
        }
    )
}

function _mostrarpaciente_SAL97C11() {
    postData({
        datosh: datosEnvio() + SAL97C11.PACIW + '|'
    }, get_url("APP/SALUD/SER810-1.DLL"))
        .then((data) => {
            $_REG_PACI = data['REG-PACI'];
            SAL97C11.DESCRIPPACIW = $_REG_PACI[0].DESCRIP
            SAL97C11.NOMBREW = SAL97C11.DESCRIPPACIW;
            SAL97C11.EPSPACIW = $_REG_PACI[0].EPS;
            // SAL97C11.NOMBREENTW = $_REG_PACI[0]["NOMBRE-EPS"]
            // SAL97C11.FECHANACPACW = $_REG_PACI[0].NACIM;
            // SAL97C11.RESTAPLIPACIW = $_REG_PACI[0]["REST-APLI"];
            // SAL97C11.RESTDROGPACIW = $_REG_PACI[0]["REST-DROG"];
            // SAL97C11.RESTCIRUGPACIW = $_REG_PACI[0]["REST-CIRU"];
            // SAL97C11.RESTLABOPACIW = $_REG_PACI[0]["REST-LABO"];
            // SAL97C11.RESTIMAGPACIW = $_REG_PACI[0]["REST-IMAG"];
            // SAL97C11.RESTESTAPACIW = $_REG_PACI[0]["REST-ESTA"];
            // SAL97C11.RESTCONSPACIW = $_REG_PACI[0]["REST-CONS"];
            // SAL97C11.RESTTERFPACIW = $_REG_PACI[0]["REST-TERF"];
            // SAL97C11.RESTTEROPACIW = $_REG_PACI[0]["REST-TERO"];
            // SAL97C11.RESTPYPPACIW = $_REG_PACI[0]["REST-PYP"];
            // SAL97C11.CIUDADPACIW = $_REG_PACI[0].CIUDAD;
            // SAL97C11.NITFACTPACIW = $_REG_PACI[0]["NIT-FACT"];
            // SAL97C11.TUTELAPACIW = $_REG_PACI[0].TUTELA;
            // SAL97C11.ALTCOSPACIW = $_REG_PACI[0]["ALT-COS"];
            // SAL97C11.PROGEPSPACIW = $_REG_PACI[0]["PROG-ESP"];
            // SAL97C11.CRONICOPACIW = $_REG_PACI[0].CRONICO;
            // SAL97C11.MULTICONSULPACIW = $_REG_PACI[0].MULTICONSUL;
            // SAL97C11.MEDFAMIPACIW = $_REG_PACI[0]["MED-FAMI"];
            // SAL97C11.EMBALTORIESGPACIW = $_REG_PACI[0]["EMB-ALTO - RIESG"];
            // SAL97C11.TIPOAFILPACI = $_REG_PACI[0]['TIPO-AFIL'];
            // SAL97C11.APELLIDO1 = $_REG_PACI[0]['APELL-PACI1'];
            // SAL97C11.APELLIDO2 = $_REG_PACI[0]['APELL-PACI2'];
            // SAL97C11.NOMBRE1 = $_REG_PACI[0]['NOM-PACI1'];
            // SAL97C11.NOMBRE2 = $_REG_PACI[0]['NOM-PACI2'];
            // console.log('aca');
            let fechalnk = moment($_USUA_GLOBAL[0].FECHALNK, 'YYMMDD').format('YYYYMMDD');
            // let fechasuperior = moment(fechalnk, 'YYYYMMDD').add(1,'month').format('YYYYMMDD')
            // console.log(fechalnk, fechasuperior, $_REG_PACI[0]['FECHA-CORR']);
            let año = fechalnk.substring(0,4); let mes = fechalnk.substring(4,6);
            let añopacie = $_REG_PACI[0]['FECHA-CORR'].substring(0,4); let mespacie = $_REG_PACI[0]['FECHA-CORR'].substring(4,6);
            if (añopacie == '0000' && mespacie == '00') {
                _consultacodigo_SAL97C11();
            } else {
                if (añopacie == año) {
                    if (mespacie > mes) {
                        _consultacodigo_SAL97C11();    
                    } else {
                        _leerpaciente_SAL97C11();
                    }
                } else {
                    _consultacodigo_SAL97C11();
                }
            }
        })
        .catch((error) => {
            if (SAL97C11.OPCIONACTIVA == '097C11') {
                if (error.MENSAJE == '01') {
                    let { ipcRenderer } = require("electron");
                    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html', cedula: SAL97C11.PACIW });
                    vector = ['on', 'Actualizando maestro de pacientes...']
                    _EventocrearSegventana(vector, _evaluarpaciente_SAL97C11);
                }
            } else {
                CON851('', 'Paciente no existe', _evaluarpaciente_SAL97C11(), 'error', 'Error');
            }
        });
}

function _consultacodigo_SAL97C11() {
    if (SAL97C11.NOVEDADW == '7') {
        if (SAL97C11.NITUSU == '0822006883') {
            _leerpaciente_SAL97C11();
        } else {
            postData({ datosh: datosEnvio() + $_ADMINW + '|IS767|' }, get_url('APP/CONTAB/CON904S.DLL'))
                .then(data => {
                    console.log(data)
                    if (data == '00') {
                        let { ipcRenderer } = require("electron");
                        ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html', cedula: SAL97C11.PACIW });
                        vector = ['on', 'Actualizando maestro de pacientes...']
                        _EventocrearSegventana(vector, _leerpaciente_SAL97C11);
                    } else {
                        postData({ datosh: datosEnvio() + $_ADMINW + '|IS767|' }, get_url('APP/CONTAB/CON904S.DLL'))
                            .then(data => {
                                console.log(data)
                                if (SAL97C11.NITUSU == '0800162035') {
                                    if ((SAL97C11.EPSPACIW == "RES004") && (data[0].trim() == "00")) {
                                        let { ipcRenderer } = require("electron");
                                        ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html' });
                                        vector = ['on', 'Actualizando maestro de pacientes...']
                                        _EventocrearSegventana(vector, _leerpaciente_SAL97C11);
                                    } else {
                                        let { ipcRenderer } = require("electron");
                                        ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html' });
                                        vector = ['on', 'Actualizando maestro de pacientes...']
                                        _EventocrearSegventana(vector, _leerpaciente_SAL97C11);
                                    }
                                } else {
                                    if (data[0].trim() == "00") {
                                        let { ipcRenderer } = require("electron");
                                        ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110C.html' });
                                        vector = ['on', 'Actualizando maestro de pacientes...']
                                        _EventocrearSegventana(vector, _leerpaciente_SAL97C11);
                                    } else {
                                        _leerpaciente_SAL97C11();
                                    }
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    } else {
        _leerpaciente_SAL97C11();
    }
}

function _leerpaciente_SAL97C11() {
    postData({
        datosh: datosEnvio() + SAL97C11.PACIW + '|'
    }, get_url("APP/SALUD/SER810-1.DLL"))
        .then((data) => {
            $_REG_PACI = data['REG-PACI'];
            SAL97C11.DESCRIPPACIW = $_REG_PACI[0].DESCRIP
            SAL97C11.NOMBREW = SAL97C11.DESCRIPPACIW;
            SAL97C11.EPSPACIW = $_REG_PACI[0].EPS;
            SAL97C11.NOMBREENTW = $_REG_PACI[0]["NOMBRE-EPS"]
            SAL97C11.FECHANACPACW = $_REG_PACI[0].NACIM;
            SAL97C11.RESTAPLIPACIW = $_REG_PACI[0]["REST-APLI"];
            SAL97C11.RESTDROGPACIW = $_REG_PACI[0]["REST-DROG"];
            SAL97C11.RESTCIRUGPACIW = $_REG_PACI[0]["REST-CIRU"];
            SAL97C11.RESTLABOPACIW = $_REG_PACI[0]["REST-LABO"];
            SAL97C11.RESTIMAGPACIW = $_REG_PACI[0]["REST-IMAG"];
            SAL97C11.RESTESTAPACIW = $_REG_PACI[0]["REST-ESTA"];
            SAL97C11.RESTCONSPACIW = $_REG_PACI[0]["REST-CONS"];
            SAL97C11.RESTTERFPACIW = $_REG_PACI[0]["REST-TERF"];
            SAL97C11.RESTTEROPACIW = $_REG_PACI[0]["REST-TERO"];
            SAL97C11.RESTPYPPACIW = $_REG_PACI[0]["REST-PYP"];
            SAL97C11.CIUDADPACIW = $_REG_PACI[0].CIUDAD;
            SAL97C11.NITFACTPACIW = $_REG_PACI[0]["NIT-FACT"];
            SAL97C11.TUTELAPACIW = $_REG_PACI[0].TUTELA;
            SAL97C11.ALTCOSPACIW = $_REG_PACI[0]["ALT-COS"];
            SAL97C11.PROGEPSPACIW = $_REG_PACI[0]["PROG-ESP"];
            SAL97C11.CRONICOPACIW = $_REG_PACI[0].CRONICO;
            SAL97C11.MULTICONSULPACIW = $_REG_PACI[0].MULTICONSUL;
            SAL97C11.MEDFAMIPACIW = $_REG_PACI[0]["MED-FAMI"];
            SAL97C11.EMBALTORIESGPACIW = $_REG_PACI[0]["EMB-ALTO - RIESG"];
            SAL97C11.TIPOAFILPACI = $_REG_PACI[0]['TIPO-AFIL'];
            SAL97C11.APELLIDO1 = $_REG_PACI[0]['APELL-PACI1'];
            SAL97C11.APELLIDO2 = $_REG_PACI[0]['APELL-PACI2'];
            SAL97C11.NOMBRE1 = $_REG_PACI[0]['NOM-PACI1'];
            SAL97C11.NOMBRE2 = $_REG_PACI[0]['NOM-PACI2'];
            if (SAL97C11.DESCRIPPACIW.substring(0, 1) == '*') {
                CON851('13', '13', null, 'error', 'Error');
                _evaluarpaciente_SAL97C11();
            } else if (SAL97C11.RESTAPLIPACIW == 'S' && SAL97C11.NOVEDADW == '7') {
                CON851('80', '80', null, 'error', 'Error');
                _evaluarpaciente_SAL97C11();
            } else {
                $('#nombrepacid_97C11').val(SAL97C11.DESCRIPPACIW);
                $('#eps_97C11').val(SAL97C11.EPSPACIW);
                $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
                var edad = calcular_edad(SAL97C11.FECHANACPACW);
                $('#edad_97C11').val(edad.unid_edad + edad.vlr_edad.toString().padStart('0'));
                _validarpaciente_SAL97C11();
            }
        })
        .catch((error) => {
            console.error(error)
            _evaluarpaciente_SAL97C11()
        });


}



function _validarpaciente_SAL97C11() {
    console.log('validarpaciente_sal97c11')
    // SAL97C11.SW9 = '0'
    // if (SAL97C11.SW9 == '0') {
    //     SAL97C11.SW9 = '1'
    //     get_mensajesPacientes_SER810B()
    // }
    if ((SAL97C11.NITUSU == '0844003225') && (SAL97C11.CIUDADPACIW != '85001') && (parseInt(SAL97C11.PACIW) > 100)) {
        SAL97C11.DERECHOPACIW = '2';
    } if (SAL97C11.EPSPACIW.trim() == '') {
        SAL97C11.NOMBREENTW = '';
    }
    SolicitarDll({ datosh: datosEnvio() + SAL97C11.EPSPACIW + '|' }, data => {
        data = data.split('|');
        SAL97C11.NOMBREENTW = data[1];
        if (data[0].trim() == "00") {
            _validarpaciente2_SAL97C11();
        } else if (data[0].trim() == "01") {
            SAL97C11.NOMBREENTW = '';
            _validarpaciente2_SAL97C11();
        } else {
            CON852(data[0], data[1], data[2], () => {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _toggleNav()
                };
            });
        }
    }, get_url('APP/SALUD/SER110C_08.DLL'));
}

function _validarpaciente2_SAL97C11() {
    if (parseInt(SAL97C11.NITFACTPACIW) > 0) {
        SolicitarDll({ datosh: datosEnvio() + SAL97C11.NITFACTPACIW + '|' }, data => {
            data = data.split('|');
            SAL97C11.NOMBREENTIDADW = data[1];
            if (data[0].trim() == "00") {
                $('#epsd_97C11').val(SAL97C11.NOMBREENTIDADW);
                SAL97C11.NOMBREENTW = SAL97C11.NOMBREENTIDADW
                SAL97C11.NITTERW = SAL97C11.NITFACTPACIW;
                _validarrestricionpac_SAL97C11();
            } else if (data[0].trim() == "01") {
                $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
                _validarrestricionpac_SAL97C11();
            } else {
                CON852(data[0], data[1], data[2], () => {
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                });
            }
        }, get_url('APP/SALUD/SER110C_11.DLL'));
    } else {
        _validarrestricionpac_SAL97C11();
    }
}

function _validarrestricionpac_SAL97C11() {
    if ((SAL97C11.EPSPACIW == 'EPS025') && (SAL97C11.RESTRICPACIW == '04')) {
        SAL97C11.NOMBREENTW = 'CAPRESOCA NO';
        // $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
    } if (SAL97C11.TUTELAPACIW == 'S') {
        CON851('5B', '5B', null, 'error', 'Error');
    } if (SAL97C11.ALTCOSPACIW == 'S') {
        CON851('5J', '5J', null, 'error', 'Error');
    } if (SAL97C11.PROGEPSPACIW == 'S') {
        CON851('5Q', '5Q', null, 'error', 'Error');
    } if (SAL97C11.CRONICOPACIW == 'S') {
        CON851('7A', '7A', null, 'error', 'Error');
    } if (SAL97C11.NITUSU == '0845000038') {
        if (($_UNIDEDADW = 'A') && (($_VLREDADW = '45') || ($_VLREDADW = '50') || ($_VLREDADW = '55') || ($_VLREDADW = '60') || ($_VLREDADW = '65') || ($_VLREDADW = '70') || ($_VLREDADW = '75') || ($_VLREDADW = '80') || ($_VLREDADW = '85') || ($_VLREDADW = '90') || ($_VLREDADW = '95') || ($_VLREDADW = '100'))) {
            CON851('8T', '8T', null, 'error', 'Error');
        }
    } if (SAL97C11.MULTICONSULPACIW == 'S') {
        CON851('5V', '5V', null, 'error', 'Error');
    } if (SAL97C11.EMBALTORIESGPACIW == 'S') {
        CON851('EH', 'EH', null, 'error', 'Error');
    } if (parseInt(SAL97C11.MEDFAMIPACIW) > 0) {
        SAL97C11.MEDW = SAL97C11.MEDFAMIPACIW.padStart(10, "0");
        SolicitarDll({ datosh: datosEnvio() + SAL97C11.MEDFAMIPACIW + '|' }, data => {
            console.log(data, 'profes')
            var data = data.split('|');
            SAL97C11['DESCRIPMEDIF'] = data[1].trim();
            if (data[0].trim() == "00") {
                $('#medfac_97C11').val(SAL97C11.DESCRIPMEDIF);
                // CALL 880RV
                if (SAL97C11.OPCIONACTIVA == '097C11') setTimeout(_ventanadecovid19_SAL97C11, 200)
                else _mostratfacturado_SAL97C11();
            } else if (data[0].trim() == "01") {
                // CALL 880RV
                if (SAL97C11.OPCIONACTIVA == '097C11') setTimeout(_ventanadecovid19_SAL97C11, 200)
                else _mostratfacturado_SAL97C11();
            } else {
                CON852(data[0], data[1], data[2], () => {
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                });
            }
        }, get_url('APP/SALUD/SAL7C11_1.DLL'));
    } else {
        // CALL 880RV
        if (SAL97C11.OPCIONACTIVA == '097C11') setTimeout(_ventanadecovid19_SAL97C11, 300)
        else _mostratfacturado_SAL97C11();
    }
    ////CALL CON880RV MUESTRA LOS RECORDATORIOS POR USUARIO ARCH
    // get_Recordatorios_CON880RV(foco, callback)
}

function _ventanadecovid19_SAL97C11() {
    if (SAL97C11.NOVEDADW == '7') {
        var ventanacovid = bootbox.dialog({
            size: 'medium',
            onEscape: true,
            title: 'RECOMENDACIONES',
            message: '<div class="row"> ' +

                '<div class="col-md-12"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Presenta sintomar Respiratorios?' + '</label> ' +
                '<div class="col-md-4" id="VALIDARCOVID1_SAL97C11"> ' +
                '<input id="sintomasrespiratotios_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-12"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Presenta Fiebre o ha tenido en 14 dias > 38°C?' + '</label> ' +
                '<div class="col-md-4" id="VALIDARCOVID2_SAL97C11"> ' +
                '<input id="fiebre_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-12"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Tiene o ha tenido problemas digestivos en 14 dias?' + '</label> ' +
                '<div class="col-md-4" id="VALIDARCOVID3_SAL97C11"> ' +
                '<input id="digestivos_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-12"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Tiene o ha tenido cansancio o malestar en 14 dias?' + '</label> ' +
                '<div class="col-md-4" id="VALIDARCOVID4_SAL97C11"> ' +
                '<input id="cansancio_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-12"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Perdida del sentido del gusto o olfato en 14 dias?' + '</label> ' +
                '<div class="col-md-4" id="VALIDARCOVID5_SAL97C11"> ' +
                '<input id="gusto_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-12"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Ha tenido contacto con casos positivos COVID-19?' + '</label> ' +
                '<div class="col-md-4" id="VALIDARCOVID6_SAL97C11"> ' +
                '<input id="contacto_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-12"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Ha presentado la enfermedad de COVID-19?' + '</label> ' +
                '<div class="col-md-4" id="VALIDARCOVID7_SAL97C11"> ' +
                '<input id="enfermedad_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-12"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Sigue usted en cuarentena COVID19?' + '</label> ' +
                '<div class="col-md-4" id="VALIDARCOVID8_SAL97C11"> ' +
                '<input id="cuarentena_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '</div>',
            buttons: {
                confirm: {
                    label: 'Aceptar',
                    className: 'btn-primary',
                    callback: function () {
                        SAL97C11.SINTOMASERAW2 = $('#sintomasrespiratotios_SAL97C11').val().trim();
                        SAL97C11.FIEBREW2 = $('#fiebre_SAL97C11').val().trim();
                        SAL97C11.COVDIGESTIVOW2 = $('#digestivos_SAL97C11').val().trim();
                        SAL97C11.COVCANSANW2 = $('#cansancio_SAL97C11').val().trim();
                        SAL97C11.COVGUSOLFW2 = $('#gusto_SAL97C11').val().trim();
                        SAL97C11.CONTATOCOVIDW2 = $('#contacto_SAL97C11').val().trim();
                        SAL97C11.ENFCOVDW2 = $('#enfermedad_SAL97C11').val().trim();
                        SAL97C11.SIGUECUARW2 = $('#cuarentena_SAL97C11').val().trim();
                        _mostratfacturado_SAL97C11();
                        ventanacovid.off('show.bs.modal');
                    }
                },
                cancelar: {
                    label: 'Cancelar',
                    className: 'btn-danger',
                    callback: function () {
                        ventanacovid.off('show.bs.modal');
                        setTimeout(_evaluarpaciente_SAL97C11, 300)

                    }
                }
            }
        });
        ventanacovid.init($('.modal-footer').hide(), _evaluarcovid191_SAL97C11('1'));
        ventanacovid.init(_mascarascovid19_SAL97C11(), _inputControl('disabled'));
        ventanacovid.on('shown.bs.modal', function () {
            $("#sintomasrespiratotios_SAL97C11").focus();
        });
    } else {
        setTimeout(_mostratfacturado_SAL97C11, 300);
    }
}

function _evaluarcovid191_SAL97C11() {
    validarInputs(
        {
            form: "#VALIDARCOVID1_SAL97C11",
            orden: '1'
        },
        () => { $('.btn-danger').click() },
        () => {
            SAL97C11.PRESSINTERAW2 = $('#sintomasrespiratotios_SAL97C11').val().trim();
            if (SAL97C11.PRESSINTERAW2.trim() == '') {
                CON851('', 'Por favor digita S o N', _evaluarcovid191_SAL97C11(), 'error', 'Error');
            } else {
                _evaluarcovid192_SAL97C11();
            }
        }
    )
}
function _evaluarcovid192_SAL97C11() {
    validarInputs(
        {
            form: "#VALIDARCOVID2_SAL97C11",
            orden: '1'
        },
        _evaluarcovid191_SAL97C11,
        () => {
            SAL97C11.COVFIEBREMAY38W2 = $('#fiebre_SAL97C11').val().trim();
            if (SAL97C11.COVFIEBREMAY38W2.trim() == '') {
                CON851('', 'Por favor digita S o N', _evaluarcovid192_SAL97C11(), 'error', 'Error');
            } else {
                _evaluarcovid193_SAL97C11();
            }
        }
    )
}
function _evaluarcovid193_SAL97C11() {
    validarInputs(
        {
            form: "#VALIDARCOVID3_SAL97C11",
            orden: '1'
        },
        _evaluarcovid192_SAL97C11,
        () => {
            SAL97C11.COVDIGESTIVOW2 = $('#digestivos_SAL97C11').val().trim();
            if (SAL97C11.COVDIGESTIVOW2.trim() == '') {
                CON851('', 'Por favor digita S o N', _evaluarcovid193_SAL97C11(), 'error', 'Error');
            } else {
                _evaluarcovid194_SAL97C11();
            }
        }
    )
}
function _evaluarcovid194_SAL97C11() {
    validarInputs(
        {
            form: "#VALIDARCOVID4_SAL97C11",
            orden: '1'
        },
        _evaluarcovid193_SAL97C11,
        () => {
            SAL97C11.COVCANSANW2 = $('#cansancio_SAL97C11').val().trim();
            if (SAL97C11.COVCANSANW2.trim() == '') {
                CON851('', 'Por favor digita S o N', _evaluarcovid194_SAL97C11(), 'error', 'Error');
            } else {
                _evaluarcovid195_SAL97C11();
            }
        }
    )
}
function _evaluarcovid195_SAL97C11() {
    validarInputs(
        {
            form: "#VALIDARCOVID5_SAL97C11",
            orden: '1'
        },
        _evaluarcovid194_SAL97C11,
        () => {
            SAL97C11.COVGUSOLFW2 = $('#gusto_SAL97C11').val().trim();
            if (SAL97C11.COVGUSOLFW2.trim() == '') {
                CON851('', 'Por favor digita S o N', _evaluarcovid195_SAL97C11(), 'error', 'Error');
            } else {
                _evaluarcovid196_SAL97C11();
            }
        }
    )
}
function _evaluarcovid196_SAL97C11() {
    validarInputs(
        {
            form: "#VALIDARCOVID6_SAL97C11",
            orden: '1'
        },
        _evaluarcovid195_SAL97C11,
        () => {
            SAL97C11.CONTATOCOVIDW2 = $('#contacto_SAL97C11').val().trim();
            if (SAL97C11.CONTATOCOVIDW2.trim() == '') {
                CON851('', 'Por favor digita S o N', _evaluarcovid196_SAL97C11(), 'error', 'Error');
            } else {
                _evaluarcovid197_SAL97C11();
            }
        }
    )
}
function _evaluarcovid197_SAL97C11() {
    validarInputs(
        {
            form: "#VALIDARCOVID7_SAL97C11",
            orden: '1'
        },
        _evaluarcovid196_SAL97C11,
        () => {
            SAL97C11.ENFCOVDW2 = $('#enfermedad_SAL97C11').val().trim();
            if (SAL97C11.ENFCOVDW2.trim() == '') {
                CON851('', 'Por favor digita S o N', _evaluarcovid197_SAL97C11(), 'error', 'Error');
            } else {
                _evaluarcovid198_SAL97C11();
            }
        }
    )
}
function _evaluarcovid198_SAL97C11() {
    validarInputs(
        {
            form: "#VALIDARCOVID8_SAL97C11",
            orden: '1'
        },
        _evaluarcovid197_SAL97C11,
        () => {
            SAL97C11.SIGUECUARW2 = $('#cuarentena_SAL97C11').val().trim();
            if (SAL97C11.SIGUECUARW2.trim() == '') {
                CON851('', 'Por favor digita S o N', _evaluarcovid198_SAL97C11(), 'error', 'Error');
            } else {
                $('.btn-primary').click();
            }
        }
    )
}

function _mostratfacturado_SAL97C11() {
    if (SAL97C11.NOVEDADW == '7') {
        SAL97C11.CITAS = [{ 'ID_MEDICO': '' }];
        if (SAL97C11.DERECHOPACIW == '6') {
            CON851('2T', '2T', null, 'error', 'Error');
        } else if ((SAL97C11.DERECHOPACIW == '2') || (SAL97C11.DERECHOPACIW == '4') || (SAL97C11.DERECHOPACIW == '7') || (SAL97C11.DERECHOPACIW == '8') || (SAL97C11.DERECHOPACIW == 'A')) {
            CON851('80', '80', null, 'error', 'Error');
            if ((SAL97C11.NITUSU == '0891855847') || (SAL97C11.NITUSU == '0800037979') || (SAL97C11.NITUSU == '0800162035') || (SAL97C11.NITUSU == '0900405505') || (SAL97C11.NITUSU == '0822002688')) {
                SAL97C11.NROCEDW = '';
                _evaluarpaciente_SAL97C11();
            }
        } else if (SAL97C11.DERECHOPACIW == '5') {
            CON851('2N', '2N', null, 'error', 'Error');
            SAL97C11.NROCEDW = '';
            _evaluarpaciente_SAL97C11();
        } else if (parseInt(SAL97C11.PACIW) != 0) {
            SER835({ PACIENTE: SAL97C11.PACIW, CLFACT: '9', NITUSU: SAL97C11.NITUSU, DESCRIPPACI: SAL97C11.DESCRIPPACIW }, data => { setTimeout(() => { _SER836_SAL97C11(data) }, 300) }, data => { setTimeout(() => { _SER836_SAL97C11(data) }, 300) });
        } else {
            SER835({ PACIENTE: SAL97C11.PACIW, CLFACT: '9', NITUSU: SAL97C11.NITUSU, DESCRIPPACI: SAL97C11.DESCRIPPACIW }, data => { setTimeout(() => { _SER836_SAL97C11(data) }, 300) }, data => { setTimeout(() => { _SER836_SAL97C11(data) }, 300) });
        }
        SAL97C11.LLAVEANTW = '';
    } else {
        if (SAL97C11.NOVEDADW == '8' || SAL97C11.NOVEDADW == '9') {
            let URL = get_url("APP/SALUD/SAL97C11.DLL");
            postData({ datosh: datosEnvio() + 'H| | | | | | | | |' + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) + '| | | | | | | | | | | | | | | | | | | | | | | | |' + SAL97C11.PACIW + '|' }, URL)
                .then(data => {
                    data.CITAS.pop();
                    SAL97C11.CITAS = data.CITAS;
                    if (SAL97C11.CITAS.length == 0) {
                        CON851('', 'No tiene ninguna cita agendada', null, 'error', 'Error');
                        pacienteMask_SAL97C11.typedValue = '';
                        _evaluarpaciente_SAL97C11();
                    } else {
                        _ventanaDatos({
                            titulo: 'CITAS AGENDADAS',
                            columnas: ["FECHA_CITA", "HORA_CITA", "SUCURSAL", "TIPO", "ID_MEDICO", "NOMBRE_MEDICO", "ID_PACIENTE", "NOMBRE_PACIENTE"],
                            data: SAL97C11.CITAS,
                            ancho: '95%',
                            callback_esc: function () {
                                _evaluarpaciente_SAL97C11();
                            },
                            callback: function (data) {
                                console.log(data, 'VENTANA')
                                SAL97C11.PACIW = data.ID_PACIENTE.replace(/,/g, '').trim().padStart(15, '0');
                                pacienteMask_SAL97C11.typedValue = SAL97C11.PACIW;
                                $('#nombrepacid_97C11').val(data.NOMBRE_PACIENTE);
                                SAL97C11.MEDW = data.ID_MEDICO.replace(/,/g, '').trim().padStart(10, '0');
                                medicoMask_SAL97C11.typedValue = SAL97C11.MEDW;
                                $('#medicod_97C11').val(data.NOMBRE_MEDICO);
                                SAL97C11.DESCRIPMEDW = data.NOMBRE_MEDICO;
                                SAL97C11.TIPOFACTW = data.TIPO;
                                claseMask_SAL7C11.typedValue = SAL97C11.TIPOFACTW;
                                SAL97C11.CUPSW = data.CUP;
                                SAL97C11.DESCRIPCUP = data.NOMBRE_CUP;
                                $('#procedimiento_97C11').val(SAL97C11.CUPSW);
                                $('#procedid_97C11').val(data.NOMBRE_CUP);
                                // $('#hora_97C11').val(data.HORA_CITA);
                                horaMask_SAL97C11.typedValue = data.HORA_CITA;
                                SAL97C11.HORAW = data.HORA_CITA;
                                $('#telefonouno_97C11').val(data.TEL_CITA);
                                $('#telefonodos_97C11').val(data.TEL2_CITA);
                                $('#sucursal_97C11').val(data.SUCURSAL);
                                $('#finalidad_97C11').val(data.FINALID_CIT);
                                SAL97C11.FINALIDADW = data.FINALID_CIT;
                                $('#tipoprofesion_97C11').val(data.ATIENDE_PROF);
                                SAL97C11.ATIENDEPROF = data.ATIENDE_PROF;
                                SAL97C11.CONTRATOW = data.CONTRATO_CIT;
                                SAL97C11.CONVENIOCNCAP = data.CONVENIO_CIT;
                                SAL97C11.EMBARAZOW = data.EMBARAZO_CIT;
                                SAL97C11.VALORW = data.VALOR;
                                SAL97C11.EPSPACIW = data.EPS;
                                SAL97C11.CLAVECANCW = data.CLAVE;
                                SAL97C11.TELW = data.TEL_CITA;
                                SAL97C11.TEL2W = data.TEL2_CITA;
                                SAL97C11.DOBLEW = data.DOBLE_CIT;
                                SAL97C11.ESTADOW = data.ESTADO_CITA;
                                SAL97C11.OPERELABW = data.OPERELAB
                                SAL97C11.HORAELABW = data.HORAELAB;
                                SAL97C11.FECHASOLICW = data.FECHASOLIC;
                                SAL97C11.TIPOANESTW = data.TIPOANES;
                                SAL97C11.NOMBREW = data.NOMBRE_PACIENTE;
                                SAL97C11.OBSERW = data.OBSERV;
                                fechadeseadaMask_SAL7C11.typedValue = data.FECHA_CITA.replace(/\//g, '');
                                fechacitaaMask_SAL7C11.typedValue = data.FECHA_CITA.replace(/\//g, '');
                                SAL97C11.FECHACIT = data.FECHA_CITA.replace(/\//g, '');
                                SAL97C11.FECHAW = data.FECHA_CITA;
                                SAL97C11.FECHACITAMASK = data.FECHA_CITA;
                                SAL97C11.ATIENDEW = data.ATIENDE_PROF.trim();
                                SAL97C11.UNSERVW = data.UNSERV_CIT;
                                SAL97C11.FECHAELABW = data.FECHAELAB
                                let OPCIONES = {
                                    ' ': 'VIGENTE',
                                    '*': 'ATENDIDA',
                                    'C': 'CANCELADA',
                                }
                                $('#estadocita_97C11').val(data.ESTADO_CITA + ' ' + OPCIONES[data.ESTADO_CITA]);
                                OPCIONES = {
                                    'S': 'DOBLE',
                                    'N': 'SENCILLA',
                                    'T': 'TRIPLE'
                                };
                                $('#citadoble_97C11').val(data.DOBLE_CIT + ' ' + OPCIONES[data.DOBLE_CIT]);
                                SAL97C11.LLAVEW = SAL97C11.FECHACIT + SAL97C11.MEDW + SAL97C11.PACIW + SAL97C11.TIPOFACTW + SAL97C11.CUPSW.padEnd(12, ' ') + data.SUCURSAL;
                                SAL97C11.LLAVEALTW = SAL97C11.MEDW + SAL97C11.FECHACIT + data.HORA_CITA;
                                SAL97C11.LLAVEANTW = SAL97C11.FECHACIT + SAL97C11.MEDW + SAL97C11.PACIW + SAL97C11.TIPOFACTW + SAL97C11.CUPSW.padEnd(12, ' ') + data.SUCURSAL;
                                if (SAL97C11.OPCIONACTIVA == '097C11') {
                                    if (SAL97C11.NOVEDADW == '9') {
                                        setTimeout(() => {
                                            CON851P('02', SER890C, _retiro_SAL97C11);
                                        }, 300);
                                    } else {
                                        let URL = get_url("APP/CONTAB/CON904.DLL");
                                        postData({ datosh: datosEnvio() + $_ADMINW + '|ISCZ|' }, URL)
                                            .then(data => {
                                                _datounidad_7C11();
                                            })
                                            .catch(err => {
                                                CON851('', 'No cuenta con permisos para cambiar la cita', null, 'error', 'Error');
                                                let Window = BrowserWindow.getAllWindows();
                                                if (Window > 1) {
                                                    setTimeout(_cerrarSegundaVentana, 300);
                                                } else {
                                                    _toggleNav();
                                                }
                                            })
                                    }
                                } else if (SAL97C11.OPCIONACTIVA == '097C13') {
                                    _datoestado_SAL97C11();
                                } else {
                                    setTimeout(() => {
                                        SAL97C11.IMPRESION = new Object;
                                        SAL97C11.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT;
                                        SAL97C11.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
                                        SAL97C11.IMPRESION.FECHACITA = SAL97C11.FECHAW
                                        SAL97C11.IMPRESION.HORACITA = `${SAL97C11.HORAW.substring(0,2)}:${SAL97C11.HORAW.substring(2,4)}`
                                        // SAL97C11.IMPRESION.MEDICOCITA = medicoMask_SAL97C11.value
                                        SAL97C11.IMPRESION.CUP = SAL97C11.CUPSW;
                                        SAL97C11.IMPRESION.DESCRIPCUP = SAL97C11.DESCRIPCUP
                                        SAL97C11.IMPRESION.ENTIDAD = SAL97C11.NOMBREENTW
                                        SAL97C11.IMPRESION.APELLIDO1 = SAL97C11.APELLIDO1
                                        SAL97C11.IMPRESION.APELLIDO2 = SAL97C11.APELLIDO2
                                        SAL97C11.IMPRESION.NOMBRE1 = SAL97C11.NOMBRE1
                                        SAL97C11.IMPRESION.NOMBRE2 = SAL97C11.NOMBRE2
                                        SAL97C11.IMPRESION.NOMBREMEDICO = SAL97C11.DESCRIPMEDW;
                                        SAL97C11.IMPRESION.CC = pacienteMask_SAL97C11.value
                                        SAL97C11.IMPRESION.HORACREA = SAL97C11.FECHAELABW + ' / '+ SAL97C11.HORAELABW.substring(0,2) + ":" + SAL97C11.HORAELABW.substring(2,4)
                                        SAL97C11.IMPRESION.OPERCREA = SAL97C11.OPERELABW
                                        SAL97C11.IMPRESION.TELESALUD = false
                                        if (SAL97C11.UNSERVW == '63') SAL97C11.IMPRESION.TELESALUD = true
                                        CON851P('00', () => {
                                            let Window = BrowserWindow.getAllWindows();
                                            if (Window.length > 1) {
                                                _cerrarSegundaVentana();
                                            } else {
                                                _toggleNav()
                                            };
                                        }, () => {
                                            _impresioncitas(SAL97C11.IMPRESION, () => {
                                                let Window = BrowserWindow.getAllWindows();
                                                if (Window.length > 1) {
                                                    setTimeout(_cerrarSegundaVentana, 1000);
                                                } else {
                                                    _toggleNav()
                                                };
                                            }, () => {
                                                CON851('', 'Ocurrio un error imprimiendo', _datoobser_SAL97C11(), 'error', 'Error');
                                            });
                                        });
                                    }, 300)
                                }
                            }
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                    pacienteMask_SAL97C11.typedValue = '';
                    _evaluarpaciente_SAL97C11();
                })
        }
    }
}

function _SER836_SAL97C11(data) {
    SER836({ PACIENTE: SAL97C11.PACIW, FECHA: $_FECHAACTUAL, ANO: $_ANOACTUALW.substring(2, 4) }, _datounidad_7C11, _datounidad_7C11);
}

// function _SER836T_SAL97C11(data) {
//     console.debug(data);
//     SER836T({ PACIENTE: SAL97C11.PACIW, FECHAACT: $_FECHAACTUAL, AÑO: $_ANOACTUALW.substring(2, 4) }, _datounidad_7C11, _datounidad_7C11);
// }
// PREGUNTAR A ROBER POR QUE CONSULTAR DOBLE VEZ LA CITAS QUE TIENE EL PACIENTE

function _datounidad_7C11() {
    let URL = get_url("APP/SALUD/SER873.DLL");
    postData({
        datosh: datosEnvio()
    }, URL)
        .then(function (data) {
            SAL97C11.UNSERV = [];
            var conteo = 1;
            for (var i in data.UNSERV) {
                if (data.UNSERV[i].ESTADO.trim() == 'S') {
                    if (data.UNSERV[i].COD.trim() != '') {
                        if (SAL97C11.NOVEDADW == '8') {
                            if (data.UNSERV[i].COD.trim() == SAL97C11.UNSERVW) SAL97C11.UNSERVW = conteo;
                        }
                        SAL97C11.UNSERV.push({ ID: conteo, DESCRIP: `${data.UNSERV[i].COD}` + ' - ' + `${data.UNSERV[i].DESCRIP}` });
                        conteo++;
                    }
                }
            }
            setTimeout(_Unidadserv_7C11, 200);
        })
        .catch(err => {
            console.debug(err);
        })
}

function _Unidadserv_7C11() {
    if (SAL97C11.NOVEDADW == '7') SAL97C11.UNSERVW = '1'
    POPUP({
        array: SAL97C11.UNSERV,
        titulo: "UNIDADES DE SERVICIO",
        indices: [{
            id: 'ID',
            label: 'DESCRIP'
        }],
        seleccion: SAL97C11.UNSERVW,
        callback_f: _evaluarpaciente_SAL97C11
    },
        data => {
            SAL97C11.UNSERVW = data.DESCRIP.substring(0, 2);
            _evaluarsucursal_SAL97C11();
        });
}

function _evaluarsucursal_SAL97C11() {
    validarInputs({
        form: '#SUCURSAL_97C11',
        orden: "1"
    },
        _Unidadserv_7C11,
        () => {
            SAL97C11.SUCURSALW = $('#sucursal_97C11').val();
            if (SAL97C11.SUCURSALW.trim() == '') {
                CON851('', 'Digite un sucursal', null, 'error', 'Error');
                _evaluarsucursal_SAL97C11();
            } else {
                setTimeout(_evaluartipoprofesion_SAL97C11, 200);
            }
        }
    )
}

function _evaluartipoprofesion_SAL97C11() {
    if (SAL97C11.NOVEDADW == '7') SAL97C11.ATIENDEW = '1'
    POPUP({
        array: SAL97C11.PROFESION,
        titulo: "Personal que atiende",
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: SAL97C11.ATIENDEW,
        teclaAlterna: true,
        callback_f: () => {
            if (SAL97C11.NOVEDADW == '8' && parseInt(SAL97C11.PACIW) == 0) {
                _evaluarpaciente_SAL97C11();
            } else {
                _evaluarsucursal_SAL97C11();
            }
        }
    }, function (data) {
        SAL97C11.ATIENDEW = data.COD;
        $("#tipoprofesion_97C11").val(data.COD.trim() + ' - ' + data.DESCRIP.trim());
        _evaluarmedico_7C11();
    })
}

function _evaluarmedico_7C11() {
    validarInputs({
        form: '#MEDICO_97C11',
        orden: "1"
    },
        _evaluartipoprofesion_SAL97C11,
        _datomedico_7C11
    )
}

function _datomedico_7C11() {
    SAL97C11.MEDW = medicoMask_SAL97C11.unmaskedValue.padStart(10, "0");
    SolicitarDll({ datosh: datosEnvio() + SAL97C11.MEDW + '|' }, _consultaterceromed_7C11, get_url('APP/SALUD/SER110C_11.DLL'));
}

function _consultaterceromed_7C11(data) {
    console.log(data, 'TERCEROS')
    data = data.split('|');
    SAL97C11['DESCRIPMEDW'] = data[1].trim();
    if (data[0].trim() == "00") {
        $('#medicod_97C11').val(SAL97C11.DESCRIPMEDW);
        let URL = get_url("APP/SALUD/SAL97C11.DLL");
        postData({ datosh: datosEnvio() + '0| | | | | |' + SAL97C11.MEDW + '|' }, URL)
            .then(data => {
                // _leerconsultasdelmedico_SAL97C11();
                console.debug(data);
                console.log(SAL97C11.TABLAATIENDE);
                SAL97C11.HORARIOSPROF = [];
                SAL97C11.HORARIOSPROF.push(data.CONSULTA[0]);
                SAL97C11.HORARIOSPROF.push(data.CONSULTA[1]);
                SAL97C11.HORARIOSPROF.push(data.CONSULTA[2]);
                SAL97C11.HORARIOSPROF.push(data.CONSULTA[3]);
                SAL97C11.HORARIOSPROF.push(data.CONSULTA[4]);
                SAL97C11.HORARIOSPROF.push(data.CONSULTA[5]);
                SAL97C11.HORARIOSPROF.push(data.CONSULTA[6]);
                SAL97C11.PROFESIONAL = data.CONSULTA[7];
                SAL97C11.FECHAINIDES = SAL97C11.PROFESIONAL.FECHA_INI_DES;
                SAL97C11.HORAINIDES = SAL97C11.PROFESIONAL.HORA_INI_DES;
                SAL97C11.FECHAFINDES = SAL97C11.PROFESIONAL.FECHA_FIN_DES;
                SAL97C11.HORAFINDES = SAL97C11.PROFESIONAL.HORA_FIN_DES;
                SAL97C11.DESCRIPMEDW = SAL97C11.PROFESIONAL.NOMBRE_MEDICO;
                SAL97C11.ATIENDEPROF = SAL97C11.PROFESIONAL.ATIENDE_PROFESIONAL;
                SAL97C11.SOBREAGEPROF = SAL97C11.PROFESIONAL.SOBREAGE_PROF;
                SAL97C11.ESTADOPROF = SAL97C11.PROFESIONAL.ESTADO_PROF;
                SAL97C11.OPERAUTPROF = SAL97C11.PROFESIONAL.OPERAUT_PROF;
                SAL97C11.OPERAUTCIRUPROF = SAL97C11.PROFESIONAL.OPERAUTCIRU_PROF;
                SAL97C11.OPERAUTOTROPROF = SAL97C11.PROFESIONAL.OPERAUTOTRO_PROF;
                SAL97C11.OPERAUT4PROF = SAL97C11.PROFESIONAL.OPERAUT4_PROF;
                SAL97C11.OPERAUT5PROF = SAL97C11.PROFESIONAL.OPERAUT5_PROF;
                SAL97C11.FORMAAGEPROF = SAL97C11.PROFESIONAL.FORMAAGE_PROF;
                SAL97C11.ESPPROF1 = SAL97C11.PROFESIONAL.ESP1_PROF;
                SAL97C11.ESPPROF2 = SAL97C11.PROFESIONAL.ESP2_PROF;
                SAL97C11.ESPPROF3 = SAL97C11.PROFESIONAL.ESP3_PROF;
                SAL97C11.ESPPROF4 = SAL97C11.PROFESIONAL.ESP4_PROF;
                SAL97C11.ESPPROF5 = SAL97C11.PROFESIONAL.ESP5_PROF;
                SAL97C11.INTMINP = SAL97C11.PROFESIONAL.INTMIN_P;
                if (SAL97C11.ATIENDEW == SAL97C11.ATIENDEPROF) {
                    SAL97C11['ATIENDEPROFEDIT2'] = SAL97C11.ATIENDEPROF;
                    if (SAL97C11.ESTADOPROF == '2') {
                        CON851('13', '13', null, 'error', 'error');
                        if (SAL97C11.NOVEDADW == '7') {
                            _evaluarmedico_7C11()
                        } else {
                            _mostrarprofesionales2_7C11();
                        }
                    } else {
                        _mostrarprofesionales2_7C11();
                    }
                } else {
                    CON851('', 'Profesional no corresponde al tipo', null, 'error', 'Error');
                    _evaluarmedico_7C11();
                }
            })
            .catch(err => {
                console.debug(err);
                if (err.MENSAJE == '01') {
                    CON851('9X', '9X', null, 'error', 'error');
                    _evaluarmedico_7C11();
                }
            })
    } else if (data[0].trim() == "01") {
        CON851('9X', '9X', null, 'error', 'error');
        _evaluarmedico_7C11();
    } else {
        CON852(data[0], data[1], data[2], () => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
    }
}

function _mostrarprofesionales2_7C11() {
    if (SAL97C11.SOBREAGEPROF != 'S') {
        SAL97C11.SOBREAGEPROF = 'N';
    } if (SAL97C11.NITUSU == '0800037021') {
        SAL97C11.SOBREAGEPROF = 'N';
    } if (SAL97C11.OPERAUTPROF.trim().length == 0) {
        SAL97C11.OPERAUTPROF = 'XXXX';
    } if (SAL97C11.OPERAUTCIRUPROF.trim().length == 0) {
        SAL97C11.OPERAUTCIRUPROF = 'XXXX';
    } if (SAL97C11.OPERAUTOTROPROF.trim().length == 0) {
        SAL97C11.OPERAUTOTROPROF = 'XXXX';
    } if (SAL97C11.OPERAUT4PROF.trim().length == 0) {
        SAL97C11.OPERAUT4PROF = 'XXXX';
    } if (SAL97C11.OPERAUT5PROF.trim().length == 0) {
        SAL97C11.OPERAUT5PROF = 'XXXX';
    }
    _revisartablahorarios_7C11();
}

function _revisartablahorarios_7C11() {
    if (SAL97C11.FORMAAGEPROF == 'S') {
        SER819H({ PACIENTE: SAL97C11.PACIW }, _datoclase_7C11, data => {
            if (parseInt(data.FECHA.substring(2, 4)) == 0) {
                _evaluarmedico_7C11();
            } else {
                SAL97C11.FECHAW = data.FECHA;
                _datoclase_7C11();
            }
        });
    } else {
        if ((SAL97C11.HORARIOSPROF[0].HRINI1P == '00') && (SAL97C11.HORARIOSPROF[0].HRINI2P == '00') &&
            (SAL97C11.HORARIOSPROF[1].HRINI1P == '00') && (SAL97C11.HORARIOSPROF[1].HRINI2P == '00') &&
            (SAL97C11.HORARIOSPROF[2].HRINI1P == '00') && (SAL97C11.HORARIOSPROF[2].HRINI2P == '00') &&
            (SAL97C11.HORARIOSPROF[3].HRINI1P == '00') && (SAL97C11.HORARIOSPROF[3].HRINI2P == '00') &&
            (SAL97C11.HORARIOSPROF[4].HRINI1P == '00') && (SAL97C11.HORARIOSPROF[4].HRINI2P == '00') &&
            (SAL97C11.HORARIOSPROF[5].HRINI1P == '00') && (SAL97C11.HORARIOSPROF[5].HRINI2P == '00') &&
            (SAL97C11.HORARIOSPROF[6].HRINI1P == '00') && (SAL97C11.HORARIOSPROF[6].HRINI2P == '00')) {
            SAL97C11.INTMINP = '00';
            SAL97C11.TABLAMINP = '00';
            SAL97C11.TABLAMIN2PROF = '00';
        }
        _datoclase_7C11();
    }
    $('#tiempmedico_97C11').val(SAL97C11.INTMINP + ' Mn');
}

function _datoclase_7C11() {
    if (SAL97C11.NITUSU == '0830092718' || SAL97C11.NITUSU == '0830092719' || SAL97C11.NITUSU == '0800156469') {
        claseMask_SAL7C11.typedValue = '3';
    } else if ((SAL97C11.UNSERVW == '08')) {
        claseMask_SAL7C11.typedValue = '7';
    } else {
        claseMask_SAL7C11.typedValue = '5';
    }
    _evaluardatoclase_SAL7C11();
}

function verhorarioprofesional_SA97C11() {
    var ventanahorarios = bootbox.dialog({
        size: 'large',
        onEscape: false,
        title: 'HORARIO PROFESIONAL',
        message: '<div class="row"> ' +

            '<div class="col-md-12"> ' +
            '<table class="table table-light table-striped" style="width: 99%;">' +
            '<thead><tr><th style="width: 10%;">DIA</th><th style="width: 10%;">HORARIO INICIAL</th><th style="width: 10%;">HORARIO FINAL</th><th style="width: 10%;">HORARIO INICIAL</th><th style="width: 10%;">HORARIO FINAL</th><th style="width: 10%;">HORARIO INICIAL</th><th style="width: 10%;">HORARIO FINAL</th><th style="width: 10%;">HORARIO INICIAL</th><th style="width: 10%;">HORARIO FINAL</th></tr></thead>' +
            '</table>' +
            '<div style="width: 100%; max-height: 120px; overflow-y: auto;">' +
            '<table id="TABLAHORARIOSNORMAL_SAL97C11" class="table table-light table-striped"> <tbody></tbody></table>' +
            '</div> ' +
            '</div>' +

            '<label class="col-md-12 control-label">' + 'Fecha Especial' + '</label> ' +

            '<div class="col-md-12"> ' +
            '<table class="table table-light table-striped" style="width: 99%;">' +
            '<thead><th style="width: 10%;">FECHA</th><th style="width: 10%;">HORARIO INICIAL</th><th style="width: 10%;">HORARIO FINAL</th><th style="width: 10%;">HORARIO INICIAL</th><th style="width: 10%;">HORARIO FINAL</th><th style="width: 10%;">HORARIO INICIAL</th><th style="width: 10%;">HORARIO FINAL</th><th style="width: 10%;">HORARIO INICIAL</th><th style="width: 10%;">HORARIO FINAL</th></tr></thead>' +
            '</table>' +
            '<div style="width: 100%; max-height: 120px; overflow-y: auto;">' +
            '<table id="TABLAHORARIOSESPECIAL_SAL97C11" class="table table-light table-striped"> <tbody></tbody></table>' +
            '</div> ' +
            '</div>' +

            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanahorarios.off('show.bs.modal');
                    _evaluardatoclase_SAL7C11();
                }
            }
        }
    });
    ventanahorarios.init(_mostrardatoshorarios_SAL97C11());
    // _ventanaDatos({
    //     titulo: 'VENTANA HORARIO PROFESIONAL',
    //     columnas: ["LUNES", "MARTES",'MIERCOLES','JUEVES','VIERNES','SABADO','DOMINGO'],
    //     ancho:'50%',
    //     data: SAL97C11.TABLAATIENDE,
    //     callback_esc: function () {
    //         _evaluardatoclase_SAL7C11()
    //     },
    //     callback: function (data) {
    //         _evaluardatoclase_SAL7C11()
    //     }
    // });
}

function _mostrardatoshorarios_SAL97C11() {
    if (SAL97C11.HORARIOESPECIAL.length > 0) {
        if (SAL97C11.HORARIOESPECIAL[0].HORAINI_PROF1.trim() != '' || SAL97C11.HORARIOESPECIAL[0].HORAINI_PROF1.trim() != '0000') {
            $('#TABLAHORARIOSESPECIAL_SAL97C11 tbody').html('');
            for (var i in SAL97C11.HORARIOESPECIAL) {
                if (SAL97C11.HORARIOESPECIAL[i].HORAINI_PROF1.trim() != '' || SAL97C11.HORARIOSPROF[i].HORAINI1_PROF.trim() != '0000') {
                    $('#TABLAHORARIOSESPECIAL_SAL97C11 tbody').append(
                        '<tr>' +
                        '<td style="width: 10%;">' + SAL97C11.HORARIOESPECIAL[i].FECHA + '</td>' +
                        '<td style="width: 10%;">' + SAL97C11.HORARIOESPECIAL[i].HORAINI_PROF1 + '</td>' +
                        '<td style="width: 10%;">' + SAL97C11.HORARIOESPECIAL[i].HORAFIN_PROF1 + '</td>' +
                        '<td style="width: 10%;">' + SAL97C11.HORARIOESPECIAL[i].HORAINI_PROF2 + '</td>' +
                        '<td style="width: 10%;">' + SAL97C11.HORARIOESPECIAL[i].HORAFIN_PROF2 + '</td>' +
                        '<td style="width: 10%;">' + SAL97C11.HORARIOESPECIAL[i].HORAINI_PROF3 + '</td>' +
                        '<td style="width: 10%;">' + SAL97C11.HORARIOESPECIAL[i].HORAFIN_PROF3 + '</td>' +
                        '<td style="width: 10%;">' + SAL97C11.HORARIOESPECIAL[i].HORAINI_PROF4 + '</td>' +
                        '<td style="width: 10%;">' + SAL97C11.HORARIOESPECIAL[i].HORAFIN_PROF4 + '</td>' +
                        '</tr>'
                    )
                }
            }
        }
    }
    $('#TABLAHORARIOSNORMAL_SAL97C11 tbody').html('');
    var dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];
    for (var i in SAL97C11.HORARIOSPROF) {
        if (SAL97C11.HORARIOSPROF[i].HORAINI1_PROF.trim() != '' || SAL97C11.HORARIOSPROF[i].HORAINI1_PROF.trim() != '0000') {
            $('#TABLAHORARIOSNORMAL_SAL97C11 tbody').append(
                '<tr>' +
                '<td style="width: 10%;">' + dias[i] + '</td>' +
                '<td style="width: 10%;">' + SAL97C11.HORARIOSPROF[i].HORAINI1_PROF + '</td>' +
                '<td style="width: 10%;">' + SAL97C11.HORARIOSPROF[i].HORAINI1_PROF + '</td>' +
                '<td style="width: 10%;">' + SAL97C11.HORARIOSPROF[i].HORAINI2_PROF + '</td>' +
                '<td style="width: 10%;">' + SAL97C11.HORARIOSPROF[i].HORAFIN2_PROF + '</td>' +
                '<td style="width: 10%;">' + SAL97C11.HORARIOSPROF[i].HORAINI3_PROF + '</td>' +
                '<td style="width: 10%;">' + SAL97C11.HORARIOSPROF[i].HORAFIN3_PROF + '</td>' +
                '<td style="width: 10%;">' + SAL97C11.HORARIOSPROF[i].HORAINI4_PROF + '</td>' +
                '<td style="width: 10%;">' + SAL97C11.HORARIOSPROF[i].HORAFIN4_PROF + '</td>' +
                '</tr>'
            )
        }
    }
}


function _evaluardatoclase_SAL7C11() {
    _FloatText({ estado: 'on', msg: [{ mensaje: 'Presione F3 para ver el horario del profesional' }, { mensaje: 'Presione F4 para imprimir citas' }] });
    validarInputs(
        {
            form: "#CLASE_97C11",
            orden: "1",
            event_f3: _ventanadiasqueatiende_SAL97C11,
            event_f4: _impresioncitas_SAL97C11
        },
        () => {
            _evaluarmedico_7C11();
            _FloatText({ estado: 'off' });
        },
        () => {
            _FloatText({ estado: 'off' });
            SAL97C11.TIPOFACTW = claseMask_SAL7C11.value;
            if (SAL97C11.NOVEDADW == '8' && parseInt(SAL97C11.PACIW) == 0) {
                CON851('', 'Debe digitar el paciente', null, 'error', 'Error');
                _evaluardatoclase_SAL7C11();
            } else {
                if (((SAL97C11.UNSERVW == '08') && (SAL97C11.TIPOFACTW == '5')) || (SAL97C11.TIPOFACTW.trim() == '')) {
                    CON851('03', '03', null, 'error', 'Error');
                    _evaluardatoclase_SAL7C11();
                } else if ((($_ADMINW == 'ADMI') || ($_ADMINW == 'GEBC')) || ((SAL97C11.NOVEDADW == '8') && (parseInt(SAL97C11.PACIW) < 100) && ($.isNumeric(SAL97C11.PACIW)))) {
                    _validardatoclase2_SAL7C11();
                } else {
                    if (SAL97C11.TIPOFACTW != '1') {
                        if ((SAL97C11.OPERAUTPROF == $_ADMINW) || (SAL97C11.OPERAUTCIRUPROF == $_ADMINW) || (SAL97C11.OPERAUTOTROPROF == $_ADMINW) || (SAL97C11.OPERAUT4PROF == $_ADMINW) || (SAL97C11.OPERAUT5PROF == $_ADMINW) || (SAL97C11.OPERAUTPROF == 'XXXX') || (SAL97C11.OPERAUTPROF == '****')) {
                            _validardatoclase2_SAL7C11();
                        } else {
                            CON851('15', '15', null, 'error', 'Error');
                            _evaluardatoclase_SAL7C11()
                        }
                    } else {
                        _validardatoclase2_SAL7C11();
                    }
                }
            }
        }
    )
}

function _ventanadiasqueatiende_SAL97C11() {
    let fechaw = moment().format('YYYYMMDD');
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datosEnvio() + '5|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw + '|' }, URL)
        .then(data => {
            console.log(data);
            SAL97C11.HORARIOESPECIAL = data.CONSULTA;
            SAL97C11.HORARIOESPECIAL.pop();
            verhorarioprofesional_SA97C11()
        })
        .catch(err => {
            console.error(err);
            _evaluardatoclase_SAL7C11();
        })
}

function _impresioncitas_SAL97C11() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER890P.html', medico: medicoMask_SAL97C11.value.replace(/,/g, '') });
    vector = ['on', ' Imprimiendo citas...']
    _EventocrearSegventana(vector, _evaluardatoclase_SAL7C11);
}

function _validardatoclase2_SAL7C11() {
    if (SAL97C11.TIPOFACTW == '7' && SAL97C11.UNSERVW != '08' && SAL97C11.UNSERVW != '06' && SAL97C11.UNSERVW != '63') {
        CON851('03', '03', null, 'error', 'Error');
        _evaluardatoclase_SAL7C11();
    } else if (SAL97C11.TIPOFACTW == '1') {
        let URL = get_url("APP/HICLIN/HC878.DLL");
        postData({ datosh: datosEnvio() }, URL)
            .then(data => {
                console.debug(data.SALAS);
                _ventanaDatos({
                    titulo: 'VENTANA DE SALAS DE CIRUGIA',
                    columnas: ["CODIGO", "DESCRIPCION"],
                    data: data.SALAS,
                    callback_esc: function () {
                        _evaluardatoclase_SAL7C11();
                    },
                    callback: function (data) {
                        SAL97C11.SALACIRUEDIT = data.CODIGO;
                        _mostrarclase_7C11();
                    }
                });
            })
            .catch(err => {
                console.debug(err);
            })
    } else {
        _mostrarclase_7C11();
    }
}

function _mostrarclase_7C11() {
    let SERVICIOS = {
        '0': 'DROGUERIA',
        '1': 'CIRUGIAS',
        '2': 'ECOGRAFIAS',
        '3': 'RX - IMAGENOLOGIA',
        '4': 'DOPPLER',
        '5': 'CONSULTAS',
        '6': 'RESONANCIA NUCLEAR',
        '7': 'P & P',
        'A': 'CITA DOBLE',
        'B': 'CITA DOBLE',
        'C': 'CITA DOBLE',
        'D': 'CITA DOBLE',
        'E': 'CITA DOBLE',
        'F': 'CITA DOBLE',
        'G': 'CITA DOBLE',
        'H': 'CITA DOBLE',
        'I': 'CITA DOBLE',
        'J': 'CITA DOBLE',
        'K': 'CITA DOBLE',
        'L': 'CITA DOBLE',
        'M': 'CITA DOBLE',
        'N': 'CITA DOBLE',
        'O': 'CITA DOBLE',
        'P': 'CITA DOBLE',
        'Q': 'CITA DOBLE',
        'R': 'CITA DOBLE',
        'S': 'CITA DOBLE',
        'T': 'CITA DOBLE',
    }
    $('#clase_97C11').val(SAL97C11.TIPOFACTW + ' - ' + SERVICIOS[SAL97C11.TIPOFACTW]);
    _datocups_7C11();
}

function _datocups_7C11() {
    validarInputs(
        {
            form: "#PROCEDIMIENTO_97C11",
            orden: "1"
        }, _datomedico_7C11,
        () => {
            SAL97C11.CUPSW = $('#procedimiento_97C11').val();
            if (SAL97C11.CUPSW.trim() == '') {
                CON851('02', '02', null, 'error', 'Error');
                if ((SAL97C11.NITUSU == '0900005594') || (SAL97C11.NITUSU == '0900541158') || (SAL97C11.NITUSU == '0900566047') || (SAL97C11.NITUSU == '0900405505')) {
                    _datocups_7C11();
                } else {
                    validarcups_SAL97C11();
                }
            } else {
                validarcups_SAL97C11();
            }
        }
    )
}

function validarcups_SAL97C11() {
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datosEnvio() + '1|' + SAL97C11.CUPSW + '|' }, URL)
        .then(data => {
            SAL97C11.DESCRIPCUP = data.CONSULTA[0].DESCRIP_CUP;
            SAL97C11.OCULTARCUP = SAL97C11.DESCRIPCUP.substring(0, 1);
            SAL97C11.DURACIONCUP = data.CONSULTA[0].OCULTAR_CUP;
            if (SAL97C11.OCULTARCUP == '*') {
                CON851('13', '13', null, 'error', 'Error');
                _datocups_7C11();
            } else {
                $('#procedid_97C11').val(SAL97C11.DESCRIPCUP + SAL97C11.DURACIONCUP);
                if ((SAL97C11.CUPSW.substring(0, 2) == '93') || (SAL97C11.CUPSW.trim() == '890210') || (SAL97C11.CUPSW.trim() == '890211') || (SAL97C11.CUPSW.trim() == '890212') || (SAL97C11.CUPSW.trim() == '890310') || (SAL97C11.CUPSW.trim() == '890311') || (SAL97C11.CUPSW.trim() == '890312') || (SAL97C11.CUPSW.trim() == '890410') || (SAL97C11.CUPSW.trim() == '890411') || (SAL97C11.CUPSW.trim() == '890412') || (SAL97C11.CUPSW.trim() == '890610') || (SAL97C11.CUPSW.trim() == '890611') || (SAL97C11.CUPSW.trim() == '890612')) {
                    SAL97C11.SWTERAPIA = '1';
                    if (SAL97C11.VARBANDERA.trim() == '') {
                        $('#ELEMENTOSADICIONALES_SAL97C11').append(
                            '<div class="col-md-3 col-sm-3 col-xs-12" id="TERAP_97C11">' +
                            '<label>Cantidad total de terapias:</label>' +
                            '<div class="inline-inputs">' +
                            '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
                            '<input id="cantterap_97C11" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1">' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                        )
                        SAL97C11.VARBANDERA = '1'
                    }
                    _evaluarcantidadterapias_SAL97C11(); // GO TO CALCULAR VALOR
                } else {
                    SAL97C11.SWTERAPIA = '0';
                    if ((SAL97C11.NITUSU == '0830092718') || (SAL97C11.NITUSU == '0830092719')) {
                        console.debug('SER210A');
                    } if (SAL97C11.CUPSW.trim() != '') {
                        let URL = get_url("APP/SALUD/SAL97C11.DLL");
                        postData({ datosh: datosEnvio() + '2|' + SAL97C11.CUPSW + '|' + ' ' + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' }, URL)
                            .then(data => {
                                console.debug(data);
                                if (SAL97C11.NITUSU == '0830092718') {
                                    console.debug('buscar contrato');
                                }
                                _evaluarcontrato_SAL97C11();
                            })
                            .catch(err => {
                                console.debug(err);
                                _datocups_7C11();
                            })
                    }
                }
            }
        })
        .catch(err => {
            console.debug(err);
            _datocups_7C11();
        })
}

function _evaluarcantidadterapias_SAL97C11() {
    validarInputs(
        {
            form: "#TERAP_97C11",
            orden: "1"
        },
        _datocups_7C11,
        () => {
            SAL97C11.NROTERAPW = $('#cantterap_97C11').val();
            if (parseInt(SAL97C11.NROTERAPW) < 2) {
                SAL97C11.SWTERAPIA = 0
                _datocontrato_SAL97C11();
            } else {
               _evaluarcontrato_SAL97C11()
            }
        }
    )
}

function _evaluarcontrato_SAL97C11() {
    validarInputs(
        {
            form: "#CONTRATO_97C11",
            orden: "1"
        },
        _datocups_7C11,
        () => {
            SAL97C11.CONTRATOW = $('#contrato_97C11').val();
            console.debug(SAL97C11.CONTRATOW);
            if ((parseInt(SAL97C11.CONTRATOW) == 0) || (SAL97C11.CONTRATOW.trim() == '')) {
                SAL97C11.NITCNCAP = '0'
                SAL97C11.CONVENIOCNCAP = 'SO'
                SAL97C11.ESTADOCNCAP = '';
                SAL97C11.VALORW = '0'
                SAL97C11.DESCRIPTAR = 'SOAT 2423';
                $('#contrato_97C11').val('0000');
                $('#convenio_97C11').val(SAL97C11.CONVENIOCNCAP);
                $('#conveniod_97C11').val(SAL97C11.DESCRIPTAR);
                _datoeduc_SAL97C11();
            } else {
                let URL = get_url("APP/SALUD/SAL97C11.DLL");
                postData({ datosh: datosEnvio() + '3|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' }, URL)
                    .then(data => {
                        console.debug(data);
                        SAL97C11.CNCAP = data.CONSULTA[0];
                        SAL97C11.CONVENIOCNCAP = SAL97C11.CNCAP.CONVENIO_CNCAP;
                        $('#contrato_97C11').val(SAL97C11.CNCAP.CONTRATO);
                        $('#convenio_97C11').val(SAL97C11.CNCAP.CONVENIO_CNCAP);
                        $('#conveniod_97C11').val(SAL97C11.CNCAP.DESCRIP_TAR);
                        _ventana({
                            tipo: 'mostrar',
                            size: 'small',
                            escape: false,
                            source: '<div class="col-md-12 col-sm-12 col-xs-12">' +
                                '<div class="inline-inputs">' +
                                '<label class="col-md-6 col-sm-6 col-xs-6">Estudio:</label>' +
                                '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
                                '<input id="input1_ventanaunica" class="form-control col-md-12 col-sm-12 col-xs-12">' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="col-md-12 col-sm-12 col-xs-12">' +
                                '<div class="inline-inputs">' +
                                '<label class="col-md-6 col-sm-6 col-xs-6">Insumos:</label>' +
                                '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
                                '<input id="input2_ventanaunica" class="form-control col-md-12 col-sm-12 col-xs-12">' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="col-md-12 col-sm-12 col-xs-12">' +
                                '<div class="inline-inputs">' +
                                '<label class="col-md-6 col-sm-6 col-xs-6">Total:</label>' +
                                '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
                                '<input id="input3_ventanaunica" class="form-control col-md-12 col-sm-12 col-xs-12">' +
                                '</div>' +
                                '</div>' +
                                '</div>',
                            inputs: [
                                { input: 'input1_ventanaunica', valor: SAL97C11.CNCAP.VLRESTUDIOSEDIT },
                                { input: 'input2_ventanaunica', valor: SAL97C11.CNCAP.VLRINSUMOS },
                                { input: 'input3_ventanaunica', valor: SAL97C11.CNCAP.VLRTOTALEDIT }
                            ]
                        }, _datoeduc_SAL97C11, _datoeduc_SAL97C11);
                    })
                    .catch(err => {
                        console.debug(err);
                        _evaluarcontrato_SAL97C11();
                    })
            }
        }
    )
}

function _datoeduc_SAL97C11() {
    if (SAL97C11.NITUSU == '0800162035' && SAL97C11.TIPOAFILPACI == '1' && (SAL97C11.EPSPACIW == 'RES004' || SAL97C11.EPSPACIW == 'EAR000' || SAL97C11.EPSPACIW == 'EAR001' || SAL97C11.EPSPACIW == 'EAR002' || SAL97C11.EPSPACIW == 'EAR003' || SAL97C11.EPSPACIW == 'EAR004' || SAL97C11.EPSPACIW == 'EAR005')) {
        $('#ELEMENTOSADICIONALES_SAL97C11').append(
            '<div class="col-md-3 col-sm-3 col-xs-12" id="COLEGIO_97C11">' +
            '<label>Colegio:</label>' +
            '<div class="inline-inputs">' +
            '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
            '<input id="colegio_97C11" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
            '</div>' +
            '</div>' +
            '</div>'
        )
        // leer colegios e imprimir el colegio del instituto paci del reg paciente
        _datosolicitud_SAL97C11();
    } else {
        _datosolicitud_SAL97C11();
    }
}

function _datosolicitud_SAL97C11() {
    SAL97C11.FECHAACT = moment().format('YYYY-MM-DD');
    if ((SAL97C11.NITUSU == '0830092718') || (SAL97C11.NITUSU == '0830092719') || (SAL97C11.NITUSU == '0800156469')) {
        if (SAL97C11.NOVEDADW == '7') {
            if (parseInt(SAL97C11.INTMINP) > 0) {
                console.log('SER890A');
            }
        }
    } else {
        _fechasolicitud_SAL97C11();
    }
}

function _fechasolicitud_SAL97C11() {
    SAL97C11.PICKER = 0;
    fechadeseadaMask_SAL7C11.typedValue = SAL97C11.FECHAACT;
    validarInputs(
        {
            form: "#FECHADESEA_97C11",
            orden: "1"
        },
        () => { _datocups_7C11() },
        () => {
            SAL97C11.FECHASOLICW = fechadeseadaMask_SAL7C11.value;
            if ((SAL97C11.NOVEDADW == '7' || SAL97C11.NOVEDADW == '8') && (moment(SAL97C11.FECHASOLICW).isBefore(SAL97C11.FECHAACT))) {
                CON851('37', '37', null, 'error', 'Error');
                if (($_ADMINW == 'ADMI') || ($_ADMINW == 'GEBC')) {
                    _datofecha_SAL97C11();
                } else {
                    if (((SAL97C11.NITUSU == '0800162035') || (SAL97C11.NITUSU == '0900030814')) && (($_ADMINW == 'KELL') || ($_ADMINW == 'NATY') || ($_ADMINW == 'LOL3'))) {
                        _datofecha_SAL97C11();
                    } else {
                        if (SAL97C11.NITUSU == '0900147959') {
                            _datofecha_SAL97C11();
                        } else {
                            _datosolicitud_SAL97C11();
                        }
                    }
                }
            } else {
                _datofecha_SAL97C11();
            }
        }
    )
}

function _datofecha_SAL97C11() {
    if (SAL97C11.SWTERAPIA == '1') {
        console.debug('display nro de terapias');
    } if (SAL97C11.FORMAAGEPROF == 'S') {
        SAL97C11.FECHAW = SAL97C11.FECHASOLICW;
        fechacitaaMask_SAL7C11.typedValue = SAL97C11.FECHAW;
    }
    SER890C();
}


function _mostrarcitasdisponibles_SAL97C11(){
    let day = moment(fechacitaaMask_SAL7C11.value.replace(/-/g,''),'YYYYMMDD').day()
    if (day == 0) day = 7
    postData({ datosh: `${datosEnvio()}${$_USUA_GLOBAL[0].FECHALNK.substring(0,2)}|${SAL97C11.MEDW}|${fechacitaaMask_SAL7C11.value.replace(/-/g,'')}|${day}|` }, get_url("APP/SALUD/SAL97C11-1.DLL"))
    .then((data) => {
        data.CITAS.pop();
        _ventanaDatos({
            titulo: 'VENTANA DE CITAS',
            columnas: ["FECHA", "HORA", "DISPONIBILIDAD"],
            data: data.CITAS,
            callback_esc: function () {
                SER890C();
            },
            callback: function (data) {
                console.log(data);
                horaMask_SAL97C11.typedValue = data.HORA;
                // _validarhora_SAL97C11();
                _evaluarturnoespecial_SAL97C11()
            }
        });
    })
    .catch((error) => {
        console.error(error);
        CON851('', 'Ocurrio un error consultando los horarios de los profesionales', null, 'error', 'Error');
        SER890C();
    });
}


function SER890C() {
    if (SAL97C11.NOVEDADW == '8') {
        let parametros = {
            estado: 'on',
            msg: [{
                mensaje: 'La cita anterior esta para el ' + SAL97C11.FECHACITAMASK
            }
            ]
        }
        _FloatText(parametros);
    }
    if (SAL97C11.PICKER == 1) {
        fechacitaaMask_SAL7C11.typedValue = moment().format('YYYYMMDD');
        validarInputs(
            {
                form: "#FECHACITA_97C11",
                orden: "1",
            },
            _fechasolicitud_SAL97C11,
            () => {
                if (fechacitaaMask_SAL7C11.value.length >= 10) {
                    // _validarfechacita_SAL97C11();
                    _validarhorarios_SAL7C11()
                } else {
                    CON851('03', '03', SER890C(), 'error', 'Error');
                }
            }
        )
    } else {
        $("#fechacita_97C11").datepicker("option", { disabled: false });
        $('#fechacita_97C11').datepicker({
            dateFormat: "yy-mm-dd",
            showOn: 'focus',
            onSeclect: function (data, event) {
                fechacitaaMask_SAL7C11.typedValue = data;
                $('#fechacita_97C11').focus();
            },
            onClose: function (data, event) {
                fechacitaaMask_SAL7C11.typedValue = data;
                $('#fechacita_97C11').focus();
            }
        }).keydown(function (e) {
            switch (e.keyCode) {
                case 27:
                    _fechasolicitud_SAL97C11();
                    set_Event_validar('#FECHACITA_97C11', 'off');
                    $('#fechacita_97C11').off('keydown');
                    $("#fechacita_97C11").datepicker("option", { disabled: true });
                    break;
                case 13:
                    set_Event_validar('#FECHACITA_97C11', 'off');
                    $('#fechacita_97C11').off('keydown');
                    $("#fechacita_97C11").datepicker("option", { disabled: true });
                    if (fechacitaaMask_SAL7C11.value.length >= 10) {
                        // _validarfechacita_SAL97C11();
                        _validarhorarios_SAL7C11()
                    } else {
                        CON851('03', '03', null, 'error', 'Error');
                    }
                    break;
            }
        });
        validarInputs(
            {
                form: "#FECHACITA_97C11",
                orden: "1"
            },
            // _datocups_7C11,
            // _validarfechacita_SAL97C11
        )
    }

}

function _validarhorarios_SAL7C11(){
    loader('show');
    postData(
        { 
            datosh: datosEnvio(),
            ACCION: '1',
            PASO: '2',
            NOVEDAD: '8',
            FECHAINICIAL: `${$('#fechacita_97C11').val().replace(/-/g,'')}`,
            FECHAFINAL: `${$('#fechacita_97C11').val().replace(/-/g,'')}`,
            PROFESIONAL: medicoMask_SAL97C11.value.replace(/,/g,'').padStart(10,'0')
        }, 
        get_url('APP/SALUD/SAL7CG.DLL')
    )
    .then((data) => {
        loader('hide')
        console.log(data)
        data.HORARIOS.pop()
        if (data.HORARIOS.length > 0) {
            for (var horario of data.HORARIOS) {
                if ($('#fechacita_97C11').val().replace(/-/g,'') == horario.FECHA) {
                    CON851('','AGENDA BLOQUEADA',null,'error','Error')
                    SAL97C11.PICKER = 1
                    return SER890C()
                }
            }
        }
        _validarfechacita_SAL97C11()
    })
    .catch((error) => {
        loader('hide')
        console.error(error)
        CON851(
            '',
            'Ocurrio un error consultando los horarios',
            null,
            'error',
            'Error'
            )
    })
}

function _validarfechacita_SAL97C11() {
    // _validarhorarios_SAL7C11()
    _leerconsultasdelmedico_SAL97C11(() => {
        console.log('validar fehca cita');
        SAL97C11.PICKER = 1;
        SAL97C11.FECHAW = fechacitaaMask_SAL7C11.value;
        let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD');
        let URL = get_url("APP/SALUD/SAL97C11.DLL");
        postData({ datosh: datosEnvio() + '4|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' }, URL)
            .then(data => {
                console.debug(data)
                _validardia_SAL97C11();
            })
            .catch(err => {
                console.debug(err);
                if (err.MENSAJE == '01') {
                    _validardia_SAL97C11();
                } else {
                    SER890C();
                }
            })
    });
    // }
}

function _leerconsultasdelmedico_SAL97C11(callback) {
    postData({ datosh: `${datosEnvio()}${SAL97C11.MEDW}|${fechacitaaMask_SAL7C11.value.replace(/-/g, '')}|` },
        get_url("APP/SALUD/SER890B.DLL"))
        .then(data => {
            console.log(data, 'TABLA')
            SAL97C11.CITASMED = data.CITAS;
            $('#TABLACITAS_SAL97C11 tbody').html('');
            if (SAL97C11.CITASMED[0].COD.trim() != '') {
                for (var i in SAL97C11.CITASMED) {

                    $('#TABLACITAS_SAL97C11 tbody').append(
                        '<tr>' +
                        '<td>' + SAL97C11.CITASMED[i].HORA + '</td>' +
                        '<td>' + SAL97C11.CITASMED[i].FECHA + '</td>' +
                        '<td>' + SAL97C11.CITASMED[i].SUCURSAL + '</td>' +
                        '<td>' + SAL97C11.CITASMED[i].DESCRIP + '</td>' +
                        '</tr>'
                    )
                }
            }
            callback();
        }).catch(err => {
            console.error(err);
            SAL97C11.CITASMED = [{ MEDICO: '', FECHA:'', HORA: '', DESCRIP: ''}];
            callback();
        })
}

function _validardia_SAL97C11() {
    if ((SAL97C11.NOVEDADW == '7' || SAL97C11.NOVEDADW == '8') && (moment(SAL97C11.FECHAW).isBefore(SAL97C11.FECHASOLICW))) {
        CON851('37', '37', null, 'error', 'Error');
        SER890C();
    } else if (SAL97C11.TIPOFACTW == '1') {
        if ($('#fecharequerida_SAL97C11').length > 0) {
            _evaluarfecharequerida_SAL97C11();
        } else {
            $('#DATOSFECHA_SAL97C11').append(
                '<div class="col-md-5 col-sm-3 col-xs-6">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-7 col-sm-6 col-xs-12">Fecha requerida</label>' +
                '<div class="input-group col-md-7 col-sm-4 col-xs-12" id="FECHAREQUERIDA_97C11">' +
                '<input id="fecharequerida_SAL97C11" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1">' +
                '</div>' +
                '</div>' +
                '</div>'
            )
            _evaluarfecharequerida_SAL97C11();
        }
    } else {
        _buscarfestivos_SAL97C11();
    }
    moment(SAL97C11.FECHAW).format('dddd DD MM YYYY');
}

function _evaluarfecharequerida_SAL97C11() {
    $('#fecharequerida_SAL97C11').val($_FECHAACT);
    _fecharequeridaMask_SAL97C11();
    validarInputs(
        {
            form: "#FECHAREQUERIDA_97C11",
            orden: "1"
        },
        SER890C,
        () => {
            SAL97C11.FECHARECOMEALT = $('#fecharequerida_SAL97C11').val();
            _buscarfestivos_SAL97C11()
        }
    )
}

function _buscarfestivos_SAL97C11() {
    if (SAL97C11.FORMAAGEPROF != 'S') {
        let festivo = moment(SAL97C11.FECHAW).format('YYYYMMDD');
        let retorno = buscarFestivo(festivo);
        if (retorno == undefined) {
            _validarfecha_SAL97C11();
        } else {
            CON851('9Q', '9Q', null, 'error', 'Error');
            SER890C();
        }
    } else {
        _validarfecha_SAL97C11();
    }
}

function _validarfecha_SAL97C11() { // VALIDAR FECHA DE BLOQUEO
    let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD')
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datosEnvio() + '5|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw + '|' }, URL)
        .then(data => {
            SAL97C11.HORARIOESPECIAL = data.CONSULTA;
            SAL97C11.HORARIOESPECIAL.pop();
            _validarfecha2_SAL97C11();
        })
        .catch(err => {
            console.debug(err);
            if (err.MENSAJE == '2Q') {
                _datofecha_SAL97C11();
            }
        })
}

function _validarfecha2_SAL97C11() { // VALIDAR HORARIO DIFERENTE ESE DIA
    var dia = moment(SAL97C11.FECHAW).day();
    if (dia == 0) dia = 7
    if ((SAL97C11.FORMAAGEPROF == 'S') && (SAL97C11.TIPOFACTW != '1')) {
        let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD')
        let URL = get_url("APP/SALUD/SAL97C11.DLL");
        postData({ datosh: datosEnvio() + '6|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw + '|' }, URL)
            .then(data => {
                console.debug(data);
                SAL97C11.HORARIOSPROF[dia] = data.CONSULTA[0];
                _consultar836B();
            })
            .catch(err => {
                console.debug(err);
                SER890C();
            })
    } else {
        _consultar836B();
    }
    if (parseInt(SAL97C11.HORARIOSPROF[dia].INTMIN_PROF) > 0) {
        SAL97C11.INTMINW = SAL97C11.HORARIOSPROF[dia].INTMIN_PROF;
        SAL97C11.INTMIN2W = SAL97C11.HORARIOSPROF[dia].INTMIN2TABLA_PROF;
    } if (parseInt(SAL97C11.INTMINW) == 0) {
        SAL97C11.INTMINW = '20';
    } if (parseInt(SAL97C11.INTMIN2W) == 0) {
        SAL97C11.INTMIN2W = '20';
    }
}

function _consultar836B() {
    if ((SAL97C11.NOVEDADW == '7') || (SAL97C11.NOVEDADW == '8')) {
        let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD')
        let URL = get_url("APP/SALUD/SER836B.DLL");
        postData({ datosh: datosEnvio() + SAL97C11.PACIW + '|' + fechaw + '|' + SAL97C11.MEDW.padStart(10, '0') + '|' + fechaw.substring(2, 4) }, URL)
            .then(data => {
                console.debug(data)
                if (data.CITASMED[0].CEDULA_MEDICO.trim() == '') {
                    _leercitas_SAL97C11();
                } else {
                    CON851('',`YA TIENE UNA CITA CON EL MISMO MEDICO EN LA FECHA ${data[0].FECHA_CITA}`,null,'error','Error');
                    _leercitas_SAL97C11();
                }
            })
            .catch(err => {
                console.error(err);
                _leercitas_SAL97C11();
            })
    } else {
        _leercitas_SAL97C11();
    }
}

function _leercitas_SAL97C11() {
    let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD');
    let ano = fechaw.substring(2, 4);
    let dia = moment(SAL97C11.FECHAW).day();
    if (dia == 0) dia = 7;
    SAL97C11.HORAINI1T = SAL97C11.HORARIOSPROF[dia - 1].HORAINI1_PROF;
    SAL97C11.HORAFIN1T = SAL97C11.HORARIOSPROF[dia- 1].HORAFIN1_PROF;
    SAL97C11.HORAINI2T = SAL97C11.HORARIOSPROF[dia - 1].HORAINI2_PROF;
    SAL97C11.HORAFIN2T = SAL97C11.HORARIOSPROF[dia - 1].HORAFIN2_PROF;
    SAL97C11.HORAINI3T = SAL97C11.HORARIOSPROF[dia - 1].HORAINI3_PROF;
    SAL97C11.HORAFIN3T = SAL97C11.HORARIOSPROF[dia - 1].HORAFIN3_PROF;
    SAL97C11.HORAINI4T = SAL97C11.HORARIOSPROF[dia - 1].HORAINI4_PROF;
    SAL97C11.HORAFIN4T = SAL97C11.HORARIOSPROF[dia - 1].HORAFIN4_PROF;
    SAL97C11.INTMINW = SAL97C11.HORARIOSPROF[dia - 1].INTMINTABLA_PROF;
    SAL97C11.INTMIN2W = SAL97C11.HORARIOSPROF[dia - 1].INTMIN2TABLA_PROF;
    SAL97C11.FACTORW = '00';
    if ((SAL97C11.NITUSU != '0830092718') && (SAL97C11.NITUSU != '0830092719') && (SAL97C11.NITUSU != '0800156469')) {
        if (parseInt(SAL97C11.HORARIOSPROF[dia].HORAINI1_PROF) == 0) {
            SAL97C11.HORARIOSPROF[dia - 1].HORAINI1T = '0700'
            SAL97C11.HORARIOSPROF[dia - 1].HORAFIN1T = '1200'
            SAL97C11.HORARIOSPROF[dia - 1].HORAINI2T = '1400'
            SAL97C11.HORARIOSPROF[dia - 1].HORAFIN2T = '1800'
        }
    }
    _leercitas3_SAL97C11();
}



function _leercitas3_SAL97C11() {
    if (SAL97C11.NOVEDADW == "7") {
      let fechaw = moment(SAL97C11.FECHAW).format("YYYYMMDD");
      let ano = fechaw.substring(2, 4);
      SAL97C11.LLAVEW =
        fechaw +
        SAL97C11.MEDW.padStart(10, "0") +
        SAL97C11.PACIW +
        SAL97C11.TIPOFACTW +
        SAL97C11.CUPSW.padEnd(12, " ") +
        $("#sucursal_97C11").val().trim();
      let URL = get_url("APP/SALUD/SAL97C11.DLL");
      postData(
        {
          datosh:
            datosEnvio() +
            "7|" +
            SAL97C11.CUPSW +
            "|" +
            SAL97C11.CONTRATOW +
            "|" +
            SAL97C11.NITFACTPACIW +
            "|" +
            SAL97C11.TIPOFACTW +
            "|" +
            SAL97C11.SALMINUSU +
            "|" +
            SAL97C11.MEDW +
            "|" +
            SAL97C11.EPSPACIW +
            "|" +
            fechaw +
            "|" +
            ano +
            "|" +
            SAL97C11.LLAVEW +
            "|",
        },
        URL
      )
        .then((data) => {
          console.log(SAL97C11.NOVEDADW);
          CON851("", "ya tiene agendada una cita con el mismo precedimiento", null, "error", "Error");
          SER890C();
        })
        .catch((err) => {
          console.debug(err);
          if (SAL97C11.NOVEDADW == "7" && err.MENSAJE == "01") {
            _nuevo_SAL97C11();
          }
        });
    } else {
      setTimeout(_mostrarcitasdisponibles_SAL97C11, 300);
    }
}

function _nuevo_SAL97C11() {
    // if ((SAL97C11.PACIW > 0) && (SAL97C11.PACIW < 100)) {
    //     SAL97C11.EPSPACIW = '';
    //     _mostrarpaciente_SAL97C11();
    // } else {
    //     _mostrarnuevo_SAL97C11();
    // }
    _mostrarnuevo_SAL97C11();
}

function _mostrarnuevo_SAL97C11() {
    $('#observacion_97C11').val(SAL97C11.NOMBREENTW);
    $('#telefonouno_97C11').val($_REG_PACI[0].TELEFONO);
    $('#telefonodos_97C11').val($_REG_PACI[0].CEL);
    let horax = '';
    console.log(SAL97C11.CITASMED);
    if (SAL97C11.CITASMED[0].DESCRIP) {
        if (SAL97C11.FECHAW.replace(/-/g, '') == SAL97C11.CITASMED[SAL97C11.CITASMED.length - 1].FECHA.replace(/\//g, '')) {
            let horaactual = moment().format('LT').padStart(5, '0');
            let horacita = SAL97C11.CITASMED[SAL97C11.CITASMED.length - 1].HORA.replace(/:/g, '');
            if (parseInt(horaactual.replace(':', '')) < parseInt(horacita)) {
                horax = moment(horacita, 'HHmm').add(SAL97C11.INTMINP, 'minutes').format('LT');
            }
        }
    }
    if (horax.trim() == '') {
        horax = moment().format('LT').padStart(5, '0');
        if (parseInt(horax.substring(4, 5)) > 0) {
            horax = (parseInt(horax.substring(0, 4).replace(':', '')) + 1).toString() + '0';
        }
    }
    horaMask_SAL97C11.typedValue = horax.padStart(4, '0');
    if (((SAL97C11.NITUSU == '0830092718') || (SAL97C11.NITUSU == '0830092719')) && ((SAL97C11.CUPSW == '876801') || (SAL97C11.CUPSW == '0876802'))) {
        _ventanamamografia_SAL97C11();
    } else {
        setTimeout(_mostrarcitasdisponibles_SAL97C11, 300);
    }
}

function _horarioseleccionable_SAL97C11(callback){
    let dia = moment('20210117','YYYYMMDD').day()
    if (dia == 0) dia = 7
    // let horarioini1 = SAL97C11.HORARIOSPROF[]
}

function _evaluarhora_SAL97C11() {
    validarInputs(
        {
            form: "#HORA_97C11",
            orden: "1",
         },
         SER890C,
         () => {
            console.log('aca');
            _validarhora_SAL97C11();
        }
    )
}

function _evaluarturnoespecial_SAL97C11(){
    loader('show');
    postData(
        { 
            datosh: datosEnvio(),
            ACCION: '2',
            PASO: '2',
            NOVEDAD: '8',
            FECHAINICIAL: `${$('#fechacita_97C11').val().replace(/-/g,'')}`,
            FECHAFINAL: `${$('#fechacita_97C11').val().replace(/-/g,'')}`,
            PROFESIONAL: medicoMask_SAL97C11.value.replace(/,/g,'').padStart(10,'0')
        }, 
        get_url('APP/SALUD/SAL7CG.DLL')
    )
    .then((data) => {
        loader('hide')
        console.log(data)
        data.HORARIOS.pop()
        if (data.HORARIOS.length > 0) {
            for (var horario of data.HORARIOS) {
                console.log($('#fechacita_97C11').val().replace(/-/g,''),horario.FECHA);
                if ($('#fechacita_97C11').val().replace(/-/g,'') == horario.FECHA) {
                    if (horaMask_SAL97C11.value.replace(/:/g,'') >= horario.HORAINI1 && horaMask_SAL97C11.value.replace(/:/g,'') <= horario.HORAFIN1) {
                        SAL97C11.HORAINI1T = horario.HORAINI1;
                        SAL97C11.HORAFIN1T = horario.HORAFIN1;
                        return _validarhora_SAL97C11()
                    }
                    if (horaMask_SAL97C11.value.replace(/:/g,'') >= horario.HORAINI2 && horaMask_SAL97C11.value.replace(/:/g,'') <= horario.HORAFIN2) {
                        SAL97C11.HORAINI1T = horario.HORAINI1;
                        SAL97C11.HORAFIN1T = horario.HORAFIN1;
                        SAL97C11.HORAINI2T = horario.HORAINI2;
                        SAL97C11.HORAFIN2T = horario.HORAFIN2;
                        return _validarhora_SAL97C11()
                    }
                    CON851('','Hora invalida turno especial',null,'error','Error')
                    return setTimeout(_mostrarcitasdisponibles_SAL97C11, 300)
                }
            }
        }
        _validarhora_SAL97C11()
    })
    .catch((error) => {
        loader('hide')
        console.error(error)
        CON851(
            '',
            'Ocurrio un error consultando los horarios',
            null,
            'error',
            'Error'
            )
    })
}


function _validarhora_SAL97C11(){
    SAL97C11.HORAW = horaMask_SAL97C11.value;
    if (SAL97C11.FECHAW.replace(/-/g,'') >= SAL97C11.FECHAINIDES && SAL97C11.FECHAW.replace(/-/g,'') <= SAL97C11.FECHAFINDES) {
        if (SAL97C11.HORAW.replace(':','') >= SAL97C11.HORAINIDES && SAL97C11.HORAW.replace(':','') <= SAL97C11.HORAFINDES){
            CON851('','MEDICO TIENE BLOQUEADO EL AGENDAMIENTO',SER890C(),'error','Error');
        } else {
            if (SAL97C11.HORAW.length == 1) {
                horaMask_SAL97C11.typedValue = '0' + SAL97C11.HORAW + '00';
            } else { horaMask_SAL97C11.typedValue = SAL97C11.HORAW + '00' };
            SAL97C11.HORAW = horaMask_SAL97C11.value;
            if (SAL97C11.HORAW.length >= 5) {
                SAL97C11.HORAACT = moment().format('HH:mm');
                let horaact = SAL97C11.HORAACT.replace(':', '');
                let horaw = SAL97C11.HORAW.replace(':', '');
                if (SAL97C11.FECHAW == SAL97C11.FECHAACT) {
                    if (parseInt(horaact) > parseInt(horaw)) {
                        CON851('9Q', '9Q', null, 'error', 'Error');
                        if (SAL97C11.NITUSU == '0900306771') {
                            _buscarcita_SAL97C11();
                        } else {
                            setTimeout(_mostrarcitasdisponibles_SAL97C11, 300);
                        }
                    } else {
                        _buscarcita_SAL97C11();
                    }
                } else {
                    console.log('si no de hora');
                    _buscarcita_SAL97C11();
                }
            } else {
                CON851('', 'Digite una hora valida', null, 'error', 'Error');
                setTimeout(_mostrarcitasdisponibles_SAL97C11, 300);
            }
        }
    } else {
        if (SAL97C11.HORAW.length == 1) {
            horaMask_SAL97C11.typedValue = '0' + SAL97C11.HORAW + '00';
        } else { horaMask_SAL97C11.typedValue = SAL97C11.HORAW + '00' };
        SAL97C11.HORAW = horaMask_SAL97C11.value;
        if (SAL97C11.HORAW.length >= 5) {
            SAL97C11.HORAACT = moment().format('HH:mm');
            let horaact = SAL97C11.HORAACT.replace(':', '');
            let horaw = SAL97C11.HORAW.replace(':', '');
            if (SAL97C11.FECHAW == SAL97C11.FECHAACT) {
                if (parseInt(horaact) > parseInt(horaw)) {
                    CON851('9Q', '9Q', null, 'error', 'Error');
                    if (SAL97C11.NITUSU == '0900306771') {
                        _buscarcita_SAL97C11();
                    } else {
                        setTimeout(_mostrarcitasdisponibles_SAL97C11, 300);
                    }
                } else {
                    _buscarcita_SAL97C11();
                }
            } else {
                console.log('si no de hora');
                _buscarcita_SAL97C11();
            }
        } else {
            CON851('', 'Digite una hora valida', null, 'error', 'Error');
            setTimeout(_mostrarcitasdisponibles_SAL97C11, 300);
        }
    }
}

function _buscarcita_SAL97C11() {
    let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD');
    let horaw = SAL97C11.HORAW.replace(':', '');
    let ano = fechaw.substring(2, 4);
    SAL97C11.LLAVEALTW = SAL97C11.MEDW + fechaw + horaw;
    console.debug(SAL97C11.LLAVEALTW);
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datosEnvio() + '8|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw + '|' + ano + '|' + SAL97C11.LLAVEW + '|' + SAL97C11.LLAVEALTW + '|' }, URL)
        .then(data => {
            console.debug(data);
            CON851('00', '00', null, 'error', 'Error');
            setTimeout(_mostrarcitasdisponibles_SAL97C11, 300);
        })
        .catch(err => {
            console.debug(err);
            _validarcitas_SAL97C11();
        })
}


function _validarcitas_SAL97C11() {
    console.log('HORARIO ESPECIAL')
    if (parseInt(SAL97C11.HORAW.replace(':', '')) >= parseInt(SAL97C11.HORAINI1T.replace(':', '')) && parseInt(SAL97C11.HORAINI1T.replace(':', '')) > 0 && parseInt(SAL97C11.HORAW.replace(':', '')) <= parseInt(SAL97C11.HORAFIN1T.replace(':', '')) - parseInt(SAL97C11.INTMINP) && parseInt(SAL97C11.HORAFIN1T.replace(':', '')) > 0) {
        console.log('HORARIO ESPECIAL')
        _validarhoracita_SAL97C11();
    } else {
        if (parseInt(SAL97C11.HORAW.replace(':', '')) >= parseInt(SAL97C11.HORAINI2T.replace(':', '')) && parseInt(SAL97C11.HORAINI2T.replace(':', '')) > 0 && parseInt(SAL97C11.HORAW.replace(':', '')) <= parseInt(SAL97C11.HORAFIN2T.replace(':', '')) - parseInt(SAL97C11.INTMINP) && parseInt(SAL97C11.HORAFIN2T.replace(':', '')) > 0) {
            console.log('HORARIO ESPECIAL')
            _validarhoracita_SAL97C11();
        } else {
            if (parseInt(SAL97C11.HORAW.replace(':', '')) >= parseInt(SAL97C11.HORAINI3T.replace(':', '')) && parseInt(SAL97C11.HORAINI3T.replace(':', '')) > 0 && parseInt(SAL97C11.HORAW.replace(':', '')) <= parseInt(SAL97C11.HORAFIN3T.replace(':', '')) - parseInt(SAL97C11.INTMINP) && parseInt(SAL97C11.HORAFIN3T.replace(':', '')) > 0) {
                console.log('HORARIO ESPECIAL')
                _validarhoracita_SAL97C11();
            } else {
                if (parseInt(SAL97C11.HORAW.replace(':', '')) >= parseInt(SAL97C11.HORAINI4T.replace(':', '')) && parseInt(SAL97C11.HORAINI4T.replace(':', '')) > 0 && parseInt(SAL97C11.HORAW.replace(':', '')) <= parseInt(SAL97C11.HORAFIN4T.replace(':', '')) - parseInt(SAL97C11.INTMINP) && parseInt(SAL97C11.HORAFIN3T.replace(':', '')) > 0) {
                    console.log('HORARIO ESPECIAL')
                    _validarhoracita_SAL97C11();
                } else {
                    let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD')
                    console.log(fechaw);
                    if (SAL97C11.HORARIOESPECIAL.length > 0) {
                        for (var i in SAL97C11.HORARIOESPECIAL) {
                            console.log(SAL97C11.HORARIOESPECIAL, i)
                            if (SAL97C11.HORARIOESPECIAL[i].FECHA == fechaw) {
                                if (parseInt(SAL97C11.HORAW.replace(':', '')) >= parseInt(SAL97C11.HORARIOESPECIAL[i].HORAINI_PROF1) && parseInt(SAL97C11.HORAW.replace(':', '')) <= parseInt(SAL97C11.HORARIOESPECIAL[i].HORAFIN_PROF1) - parseInt(SAL97C11.INTMINP)) {
                                    _validarhoracita_SAL97C11();
                                    break;
                                } else if (parseInt(SAL97C11.HORAW.replace(':', '')) >= parseInt(SAL97C11.HORARIOESPECIAL[i].HORAINI_PROF2) && parseInt(SAL97C11.HORAW.replace(':', '')) <= parseInt(SAL97C11.HORARIOESPECIAL[i].HORAFIN_PROF2) - parseInt(SAL97C11.INTMINP)) {
                                    _validarhoracita_SAL97C11();
                                    break;
                                } else if (parseInt(SAL97C11.HORAW.replace(':', '')) >= parseInt(SAL97C11.HORARIOESPECIAL[i].HORAINI_PROF3) && parseInt(SAL97C11.HORAW.replace(':', '')) <= parseInt(SAL97C11.HORARIOESPECIAL[i].HORAFIN_PROF3) - parseInt(SAL97C11.INTMINP)) {
                                    _validarhoracita_SAL97C11();
                                    break;
                                } else {
                                    CON851('', 'El profesional no se encuentra disponible en ese horario', null, 'error', 'Error');
                                    if ($_ADMINW == 'ADMI' || $_ADMINW == 'GEBC' || $_ADMINW == 'JASP') {
                                        _validarhoracita_SAL97C11();
                                        break;
                                    } else {
                                        SER890C();
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        CON851('', 'El profesional no se encuentra disponible en ese horario', null, 'error', 'Error');
                        if ($_ADMINW == 'ADMI' || $_ADMINW == 'GEBC' || $_ADMINW == 'JASP') {
                            _validarhoracita_SAL97C11();
                        } else {
                            SER890C();
                        }
                    }
                }
            }
        }
    }
}

function _validarhoracita_SAL97C11() {
    if (SAL97C11.CITASMED[0].DESCRIP) {
        for (var i in SAL97C11.CITASMED) {
            var dia = moment(SAL97C11.FECHAW).day();
            if (dia == 0) dia = 7
            var horainicial = parseInt(SAL97C11.CITASMED[i].HORA.replace(/:/g, ''));
            var horafinal = parseInt(moment(SAL97C11.CITASMED[i].FECHA.replace(/\//g, '') + ' ' + SAL97C11.CITASMED[i].HORA.replace(/:/g, '')).add(SAL97C11.HORARIOSPROF[dia].INTMIN_PROF, 'minutes').format('HHmm'));
            console.log(horainicial, horafinal);
            if (parseInt(SAL97C11.HORAW.replace(':', '')) > horainicial && parseInt(SAL97C11.HORAW.replace(':', '')) < horafinal && SAL97C11.CITASMED[i].FECHA.replace(/\//g,'') == SAL97C11.FECHAW.replace(/-/g,'')) {
                CON851('', 'Hora ya asignada', null, 'error', 'Error');
                if (SAL97C11.SOBREAGEPROF == 'S') {
                    _validarhoracita2_SAL97C11();
                } else {
                    setTimeout(_mostrarcitasdisponibles_SAL97C11, 300);
                }
                break;
            } else if (SAL97C11.CITASMED.length - 1 == i) {
                _validarhoracita2_SAL97C11();
            }
        }
    } else {
        _validarhoracita2_SAL97C11();
    }
}

function _validarhoracita2_SAL97C11() {
    if (SAL97C11.CITAS[0].ID_MEDICO.trim() != '') {
        for (var i in SAL97C11.CITAS) {
            var dia = moment(SAL97C11.FECHAW).day();
            if (dia == 0) dia = 7
            var horainicial = parseInt(SAL97C11.CITAS[i].HORA_CITA);
            var horafinal = parseInt(moment(SAL97C11.CITAS[i].FECHA_CIT + ' ' + SAL97C11.CITAS[i].HORA_CIT).add(SAL97C11.HORARIOSPROF[dia].INTMIN_PROF, 'minutes').format('HHmm'));
            console.log(horainicial, horafinal);
            if (parseInt(SAL97C11.HORAW.replace(':', '')) > horainicial && parseInt(SAL97C11.HORAW.replace(':', '')) < horafinal && SAL97C11.CITASMED[i].FECHA.replace(/:/g, '') == moment(SAL97C11.FECHAW).format('YYYYMMDD')) {
                CON851('', 'Hora ya asignada', null, 'error', 'Error');
                setTimeout(_mostrarcitasdisponibles_SAL97C11, 300);
                break;
            } else if (SAL97C11.CITAS.length - 1 == i) {
                SAL97C11.CONTEOESPECIAL = 0
                _validarhoracita3_SAL97C11();
            }
        }
    } else {
        SAL97C11.CONTEOESPECIAL = 0
        _validarhoracita3_SAL97C11();
    }
}

function _validarhoracita3_SAL97C11(){
    if (SAL97C11.HORARIOESPECIAL[SAL97C11.CONTEOESPECIAL]) {
        let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD')
        if (SAL97C11.HORARIOESPECIAL[SAL97C11.CONTEOESPECIAL].FECHA == fechaw) {
            if (parseInt(SAL97C11.HORAW.replace(':', '')) >= parseInt(SAL97C11.HORARIOESPECIAL[SAL97C11.CONTEOESPECIAL].HORAINI_PROF1) && parseInt(SAL97C11.HORAW.replace(':', '')) <= parseInt(SAL97C11.HORARIOESPECIAL[SAL97C11.CONTEOESPECIAL].HORAFIN_PROF1)) {
                CON851('','AGENDA BLOQUEADA',null,'error','Error');
                SAL97C11.CONTEOESPECIAL = 0;
                setTimeout(_mostrarcitasdisponibles_SAL97C11,300);
            } else {
                SAL97C11.CONTEOESPECIAL++;
                _validarhoracita3_SAL97C11();
            }
        }
    } else {
        if (parseInt(SAL97C11.FECHAW.replace(/-/g,'')) >= parseInt(SAL97C11.FECHAINIDES) && parseInt(SAL97C11.FECHAW.replace(/-/g,'')) <= parseInt(SAL97C11.FECHAFINDES)){
            return _evaluartelefono_SAL97C11();
        }
        if (SAL97C11.FORMAAGEPROF != 'S') {
            CON851('','AGENDA BLOQUEADA',null, 'error', 'Error');
            return _mostrarcitasdisponibles_SAL97C11();
        }
        
        _evaluartelefono_SAL97C11();
    }
}

function _evaluartelefono_SAL97C11() {
    validarInputs(
        {
            form: "#TELEFONOUNO_97C11",
            orden: "1"
        },
        () => {
            if (SAL97C11.NOVEDADW == '8') {
                _evaluarpaciente_SAL97C11();
            } else {
                setTimeout(_mostrarcitasdisponibles_SAL97C11, 300);
            }
        },
        () => {
            SAL97C11.TELW = $('#telefonouno_97C11').val();
            _evaluarcelular_SAL97C11();
        }
    )
}

function _evaluarcelular_SAL97C11() {
    validarInputs(
        {
            form: "#TELEFONODOS_97C11",
            orden: "1"
        },
        _evaluartelefono_SAL97C11,
        () => {
            SAL97C11.TEL2W = $('#telefonodos_97C11').val();
            if (SAL97C11.TIPOFACTW != '1') {
                SAL97C11.TIPOANESTW = '';
                _datoembarazon_SAL97C11();
            } else {
                let TIPOSANES = [
                    { CODIGO: '1', DESCRIPCION: 'GENERAL' },
                    { CODIGO: '2', DESCRIPCION: 'EPIDURAL' },
                    { CODIGO: '3', DESCRIPCION: 'RAQUIDEA' },
                    { CODIGO: '4', DESCRIPCION: 'SEDACION' },
                    { CODIGO: '5', DESCRIPCION: 'BLOQUEO' },
                    { CODIGO: '6', DESCRIPCION: 'LOCAL ASISTIDA' },
                    { CODIGO: '7', DESCRIPCION: 'LOCAL' },
                    { CODIGO: '8', DESCRIPCION: 'SIN ANESTECIA' }
                ];
                POPUP({
                    array: TIPOSANES,
                    titulo: "Tipo Anestesia:",
                    indices: [
                        { label: 'DESCRIPCION' }
                    ],
                    callback_f: _evaluarcelular_SAL97C11
                },
                    data => {
                        switch (data.CODIGO) {
                            case '1':
                            case '2':
                            case '3':
                            case '4':
                            case '5':
                            case '6':
                            case '7':
                            case '8':
                                SAL97C11.TIPOANESTW = data.CODIGO;
                                _datoembarazon_SAL97C11();
                                break;
                        }
                    });
            }
        }
    )
}

function _datoembarazon_SAL97C11() {
    let fechanacim = $_REG_PACI[0].NACIM;
    SAL97C11.EDAD = calcular_edad(moment(fechanacim).format('YYYY-MM-DD'));

    if (($_REG_PACI[0].SEXO == 'F') && (SAL97C11.EDAD.unid_edad == 'A') && (SAL97C11.EDAD.vlr_edad > 8) && (SAL97C11.EDAD.vlr_edad < 60)) {
        let TIPOEMBARAZO = [
            { CODIGO: '1', DESCRIPCION: 'EMBARAZO PRIMER TRIMESTRE' },
            { CODIGO: '2', DESCRIPCION: 'EMBARAZO SEGUND TRIMESTRE' },
            { CODIGO: '3', DESCRIPCION: 'EMBARAZO TERCER TRIMESTRE' },
            { CODIGO: '4', DESCRIPCION: 'NO ESTA EMBARAZADA' }
        ];
        POPUP({
            array: TIPOEMBARAZO,
            titulo: "Condicion usuaria:",
            indices: [
                { label: 'DESCRIPCION' }
            ],
            callback_f: _evaluarcelular_SAL97C11
        },
            data => {
                console.log(data);
                switch (data.CODIGO) {
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                        SAL97C11.EMBARAZOW = data.CODIGO;
                        if ((SAL97C11.UNSERVW == '08') && ((SAL97C11.EMBARAZOW == '1') || (SAL97C11.EMBARAZOW == '2') || (SAL97C11.EMBARAZOW == '3'))) {
                            CON851('6U', '6U', null, 'warning', 'Advertencia');
                        }
                        $('#embarazo_97C11').val(data.CODIGO + ' - ' + data.DESCRIPCION);
                        if (SAL97C11.TIPOFACTW != '7') {
                            SAL97C11.FINALIDADW = '10';
                            _datoobser_SAL97C11();
                        } else {
                            setTimeout(() => {
                                SAL97C11.DATOFINALIDAD = datos_finalidad(parseInt(SAL97C11.NITUSU), $_REG_PACI[0].SEXO, SAL97C11.EDAD);
                                _datofinalidad_SAL97C11();
                            }, 500);
                        }
                        break;
                }
            });
    } else {
        SAL97C11.EMBARAZOW = '9';
        $('#embarazo_97C11').val('9 - NO APLICA');
        if (SAL97C11.TIPOFACTW != '7') {
            SAL97C11.FINALIDADW = '10';
            _datoobser_SAL97C11();
        } else {
            setTimeout(() => {
                SAL97C11.DATOFINALIDAD = datos_finalidad(parseInt(SAL97C11.NITUSU), $_REG_PACI[0].SEXO, SAL97C11.EDAD);
                _datofinalidad_SAL97C11();
            }, 500);
        }
    }
}

function _datofinalidad_SAL97C11() {
    if (!SAL97C11.FINALIDADW) SAL97C11.FINALIDADW = '1';
    POPUP({
        array: SAL97C11.DATOFINALIDAD,
        titulo: "Dato Finalidad:",
        indices: [
            { label: 'descripcion' }
        ],
        seleccion: SAL97C11.FINALIDADW,
        callback_f: _evaluarcelular_SAL97C11
    },
        data => {
            SAL97C11.FINALIDADW = data.codigo;
            $('#finalidad_97C11').val(data.codigo + ' - ' + data.descripcion);
            if ((SAL97C11.EMBARAZOW == 'N') && ((SAL97C11.FINALIDADW == '1') || (SAL97C11.FINALIDADW == '6'))) {
                CON851('03', '03', null, 'error', 'Error');
                setTimeout(() => {
                    SAL97C11.DATOFINALIDAD = datos_finalidad(parseInt(SAL97C11.NITUSU), $_REG_PACI[0].SEXO, SAL97C11.EDAD);
                    _datofinalidad_SAL97C11();
                }, 500);
            } else if (((SAL97C11.EDAD.vlr_edad == 'M') || (SAL97C11.vlr_edad == 'A')) && (SAL97C11.FINALIDADW == '2')) {
                CON851('03', '03', null, 'error', 'Error');
                setTimeout(() => {
                    SAL97C11.DATOFINALIDAD = datos_finalidad(parseInt(SAL97C11.NITUSU), $_REG_PACI[0].SEXO, SAL97C11.EDAD);
                    _datofinalidad_SAL97C11();
                }, 500);
            } else if (SAL97C11.FINALIDADW == '6') {
                if ((SAL97C11.EMBARAZOW == '1') || (SAL97C11.EMBARAZOW == '2') || (SAL97C11.EMBARAZOW == '3')) {
                    if (SAL97C11.FINALIDADW == '10') {
                        if ((SAL97C11.NITUSU == '0845000038') || (SAL97C11.NITUSU == '0900405505')) {
                            CON851('4K', '4K', null, 'error', 'Error');
                        }
                        _datoobser_SAL97C11();
                    }
                } else {
                    CON851('83', '83', null, 'error', 'Error');
                    setTimeout(() => {
                        SAL97C11.DATOFINALIDAD = datos_finalidad(parseInt(SAL97C11.NITUSU), $_REG_PACI[0].SEXO, SAL97C11.EDAD);
                        _datofinalidad_SAL97C11();
                    }, 500);
                }
            } else if (SAL97C11.FINALIDADW == '10') {
                if ((SAL97C11.NITUSU == '0845000038') || (SAL97C11.NITUSU == '0900405505')) {
                    CON851('4K', '4K', null, 'error', 'Error');
                }
                _datoobser_SAL97C11();
            } else {
                _datoobser_SAL97C11();
            }
        });
}

function _datoobser_SAL97C11() {
    validarInputs(
        {
            form: "#OBSERVACION_97C11",
            orden: "1"
        },
        () => { _evaluartelefono_SAL97C11() },
        () => {
            SAL97C11.OBSERW = $('#observacion_97C11').val();
            _evaluarviaasignacion_SAL7C11();
        }
    )
}

function _evaluarviaasignacion_SAL7C11() {
    SER861A(data => {
        SAL97C11.TIPOCITAW = data.CODIGO;
        _ventanarecomendaciones_SAL7C11();
    }, _datoobser_SAL97C11, '1')
}

function _ventanarecomendaciones_SAL7C11() {
    if (SAL97C11.TIPOFACTW == '1') {
        // console.debug('RECOMENDACIONES LINEA 2511');
        var ventanarecomendaciones = bootbox.dialog({
            size: 'large',
            onEscape: true,
            title: 'RECOMENDACIONES',
            message: '<div class="row"> ' +
                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Nada via oral despues de las 22:00 horas o 10 pm' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="nadaviadorarecome_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +
                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Debe asistir en Ayunas' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="asisayunasrecome_SAL97C11" type="text" class="form-control input-md" data-orden="2" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +
                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Dieta Liquida el dia anterior' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="dietaliquirecome_SAL97C11" type="text" class="form-control input-md" data-orden="3" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +
                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Si la cirugia es en la tarde puede tomar JUGO 5 am' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="jugocincamrecome_SAL97C11" type="text" class="form-control input-md" data-orden="4" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +
                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Traer ropa comoda, zapatos planos' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="ropazapatorecome_SAL97C11" type="text" class="form-control input-md" data-orden="5" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Avise con 3 dias de anticipacion si presenta algunos de estos sintomas, Fiebre, gripe, diarrea' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="gripefeibrrecome_SAL97C11" type="text" class="form-control input-md" data-orden="6" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Si toma Aspirina, Asawin , Asa, o cualquier tipo de anticoagulante, suspender 10 dias antes de QX' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="aspirinasarecome_SAL97C11" type="text" class="form-control input-md" data-orden="7" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Debe venir con acompañante mayor de 18 años' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="acompanantrecome_SAL97C11" type="text" class="form-control input-md" data-orden="8" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Asitir sin ,maquillaje, esmalte en uñas , rasurada en area de QX , sin Joyas' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="maquillajerecome_SAL97C11" type="text" class="form-control input-md" data-orden="9" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Todo menor de edad debe venir con los padres' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="menoredaderecome_SAL97C11" type="text" class="form-control input-md" data-orden="10" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Debe hacer copago' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="copagomoderecome_SAL97C11" type="text" class="form-control input-md" data-orden="11" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Traer Maleta con pijama y utiles de aseo' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="pijamautilrecome_SAL97C11" type="text" class="form-control input-md" data-orden="12" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Si toma medicamentos de control traer la formula y si trae medicamento entregar medico servicio' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="medicontrorecome_SAL97C11" type="text" class="form-control input-md" data-orden="13" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Traer Frasco de boca ancha con tapa' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="frascobocarecome_SAL97C11" type="text" class="form-control input-md" data-orden="14" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Traer Radiografias ,TAC,Resonacias, Ecografias' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="radiogrtacrecome_SAL97C11" type="text" class="form-control input-md" data-orden="15" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Pañales desechables' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="panalesdesrecome_SAL97C11" type="text" class="form-control input-md" data-orden="16" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Traer una cobija termica limpia' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="cobijatermrecome_SAL97C11" type="text" class="form-control input-md" data-orden="17" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'Reserva GRE' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="reservafremrecome_SAL97C11" type="text" class="form-control input-md" data-orden="18" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +

                '<div class="col-md-4"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-8 control-label">' + 'FORMOL X 500ML' + '</label> ' +
                '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                '<input id="formolx500recome_SAL97C11" type="text" class="form-control input-md" data-orden="19" maxlength="1"> ' +
                '<span class="help-block">' + 'S/N' + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>' +
                '</div>',
            buttons: {
                confirm: {
                    label: 'Aceptar',
                    className: 'btn-primary',
                    callback: function () {
                        ventanarecomendaciones.off('show.bs.modal');
                        _datoestado_SAL97C11();
                    }
                },
                cancelar: {
                    label: 'Cancelar',
                    className: 'btn-danger',
                    callback: function () {
                        ventanarecomendaciones.off('show.bs.modal');
                        setTimeout(_datoobser_SAL97C11, 300)
                    }
                }
            }
        });
        ventanarecomendaciones.init($('.modal-footer').hide(), _evaluarrecomendaciones_SAL97C11());
        ventanarecomendaciones.on('shown.bs.modal', function () {
            $("#nadaviadorarecome_SAL97C11").focus();
        });
        ventanarecomendaciones.init(_Mascarasrecomendaciones_SAL97C11(), _inputControl('disabled'));
    } else {
        _datoestado_SAL97C11();
    }
}

function _evaluarrecomendaciones_SAL97C11(orden) {
    validarInputs(
        {
            form: "#VALIDA1R_SAL97C11",
            orden: orden
        },
        () => { $('.btn-danger').click() },
        () => {
            SAL97C11.NADAVIAORARECOME = $('#nadaviadorarecome_SAL97C11').val();
            SAL97C11.ASISAYUNASRECOME = $('#asisayunasrecome_SAL97C11').val();
            SAL97C11.DIETALIQUIRECOME = $('#dietaliquirecome_SAL97C11').val();
            SAL97C11.JUGOCINCARECOME = $('#jugocincamrecome_SAL97C11').val();
            SAL97C11.ROPAZAPATOARECOME = $('#ropazapatorecome_SAL97C11').val();
            SAL97C11.GRIPEFEIBRRECOME = $('#gripefeibrrecome_SAL97C11').val();
            SAL97C11.ASPIRINASRECOME = $('#aspirinasarecome_SAL97C11').val();
            SAL97C11.ACOMPANANTARECOME = $('#acompanantrecome_SAL97C11').val();
            SAL97C11.MAQUILLAJERECOME = $('#maquillajerecome_SAL97C11').val();
            SAL97C11.MENOREDADDERECOME = $('#menoredaderecome_SAL97C11').val();
            SAL97C11.COPAGOMORDERECOME = $('#copagomoderecome_SAL97C11').val();
            SAL97C11.PIJAMAUTILRECOME = $('#pijamautilrecome_SAL97C11').val();
            SAL97C11.MEDICONTRORECOME = $('#medicontrorecome_SAL97C11').val();
            SAL97C11.FRASCOBOCARECOME = $('#frascobocarecome_SAL97C11').val();
            SAL97C11.PANALESDESRECOME = $('#panalesdesrecome_SAL97C11').val();
            SAL97C11.COBIJATERMRECOME = $('#cobijatermrecome_SAL97C11').val();
            SAL97C11.RESERVAFREMRECOME = $('#reservafremrecome_SAL97C11').val();
            SAL97C11.FORMOLX500RECOME = $('#formolx500recome_SAL97C11').val();
            $('.btn-primary').click();
        }
    )
}



function _datoestado_SAL97C11() {
    if (SAL97C11.NOVEDADW == '7') estadocitaMask_SAL7C11.typedValue = '';
    _FloatText({ estado: 'on', msg: [{ mensaje: 'ESPACIO VIGENTE' }, { mensaje: '* ATENDIDA' }, { mensaje: 'C CANCELADA' }] })
    validarInputs(
        {
            form: "#ESTADOCITA_97C11",
            orden: "1"
        },
        () => {
            if (SAL97C11.OPCIONACTIVA == '097C13') _evaluarpaciente_SAL97C11()
            else _datoobser_SAL97C11()
        },
        () => {
            _FloatText({ estado: 'off' });
            if (estadocitaMask_SAL7C11.value == ' ') estadocitaMask_SAL7C11.typedValue = '';
            if (estadocitaMask_SAL7C11.value.trim() != '' && estadocitaMask_SAL7C11.value.trim() != '*' && estadocitaMask_SAL7C11.value.trim() != 'C') {
                CON851('01', '01', _datoestado_SAL97C11(), 'error', 'Error');
            } else {
                SAL97C11.ESTADOW = estadocitaMask_SAL7C11.value;
                let OPCIONES = {
                    '': 'VIGENTE',
                    '*': 'ATENDIDA',
                    'C': 'CANCELADA',
                }
                $('#estadocita_97C11').val(SAL97C11.ESTADOW + ' ' + OPCIONES[SAL97C11.ESTADOW]);
                if (SAL97C11.ESTADOW == 'C') {
                    if (SAL97C11.ESTADOW != SAL97C11.ESTADOANT) {
                        SAL97C11.CLAVECANCW = $_ADMINW + $_DIAACTUAL + SAL97C11.HORAACT.replace(':', '');
                        _datocausa_SAL97C11();
                    } else {
                        _datocausa_SAL97C11();
                    }
                } else {
                    SAL97C11.CLAVECANCW = '';
                    _datocausa_SAL97C11();
                }
            }
        }
    )
}

function _datocausa_SAL97C11() {
    if (SAL97C11.ESTADOW == 'C') {
        let DATOESTADOS = [
            { CODIGO: '1', DESCRIPCION: '1 CANCEL X URGEN' },
            { CODIGO: '2', DESCRIPCION: '2 FALTA SANGRE' },
            { CODIGO: '3', DESCRIPCION: '3 FALTA MAT. MQ' },
            { CODIGO: '4', DESCRIPCION: '4 FALTA APOYO DX' },
            { CODIGO: '5', DESCRIPCION: '5 FALTA MEDICO' },
            { CODIGO: '6', DESCRIPCION: '6 FALTA SALA' },
            { CODIGO: '7', DESCRIPCION: '7 FALTA CUID INS' },
            { CODIGO: '8', DESCRIPCION: '8 FALTA CUID PAC' },
            { CODIGO: '9', DESCRIPCION: '9 CUDARO CLINICO' },
            { CODIGO: 'A', DESCRIPCION: 'A DECISION PACI.' },
            { CODIGO: 'B', DESCRIPCION: 'B OTRO MOTIVO' },
            { CODIGO: 'C', DESCRIPCION: 'C DECISION PROFE' }
        ];
        POPUP({
            array: DATOESTADOS,
            titulo: "Motivo cancelacion:",
            teclaAlterna: true,
            indices: [
                { label: 'DESCRIPCION' }
            ],
            callback_f: _datoestado_SAL97C11
        },
            data => {
                SAL97C11.CAUSACANCW = data.CODIGO;
                if (SAL97C11.OPCIONACTIVA == '097C11') _datodoble_SAL97C11();
                else setTimeout(_confirmar_SAL97C11, 300)
            });
    } else {
        SAL97C11.CAUSACANCW = '';
        _datodoble_SAL97C11();
    }
}

function _datodoble_SAL97C11() {
    dobleMask_SAL97C11.typedValue = 'N';
    _FloatText({ estado: 'on', msg: [{ mensaje: 'S DOBLE' }, { mensaje: 'N SENCILLA' }, { mensaje: 'T TRIPLE' }] });
    validarInputs(
        {
            form: "#CITADOBLE_97C11",
            orden: "1"
        },
        () => {
            _FloatText({ estado: 'off' });
            if (SAL97C11.OPCIONACTIVA == '097C13') _datoestado_SAL97C11()
            else _datoobser_SAL97C11()
        },
        () => {
            _FloatText({ estado: 'off' });
            SAL97C11.DOBLEW = dobleMask_SAL97C11.value;
            if (SAL97C11.DOBLEW.trim() != '') {
                let OPCIONES = {
                    'S': 'DOBLE',
                    'N': 'SENCILLA',
                    'T': 'TRIPLE'
                };
                if (OPCIONES[SAL97C11.DOBLEW]) {
                    $('#citadoble_97C11').val(SAL97C11.DOBLEW + ' ' + OPCIONES[SAL97C11.DOBLEW]);
                    if (SAL97C11.DOBLEW == 'N') SAL97C11.FACTORW = '00';
                    if (SAL97C11.DOBLEW == 'S') SAL97C11.FACTORW = '02';
                    if (SAL97C11.DOBLEW == 'T') SAL97C11.FACTORW = '03';
                    CON851P('01', _datoobser_SAL97C11, _confirmar_SAL97C11);
                }
            } else {
                CON851('', 'Digite si es cita doble', null, 'error', 'Error');
                _datodoble_SAL97C11();
            }
        }
    )
}

function _confirmar_SAL97C11() {
    if (parseInt(SAL97C11.CONTRATOW) > 0) {
        console.debug('mirar cncap');
    } if (SAL97C11.NOVEDADW == '8') {
        SAL97C11.FECHAELABW = moment().format('YYYYMMDD');
        SAL97C11.HORAELABW = moment().format('HH:mm');
        _grabarcambio_SAL97C11();
    } else if (SAL97C11.NOVEDADW == '7') {
        SAL97C11.OPERW = $_ADMINW;
        SAL97C11.FECHAELABW = moment().format('YYYYMMDD');
        SAL97C11.HORAELABW = moment().format('HH:mm');
        _grabarcambio_SAL97C11();
    }
}

function _grabarcambio_SAL97C11() {
    console.log(SAL97C11.LLAVEANTW, 'LLAVE ANTERIOR')
    let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD');
    let ano = fechaw.substring(2, 4);
    SAL97C11.LLAVEW = fechaw + SAL97C11.MEDW.padStart(10, '0') + SAL97C11.PACIW + SAL97C11.TIPOFACTW + SAL97C11.CUPSW.padEnd(12, ' ') + $('#sucursal_97C11').val().trim();
    let cod = 'A';
    if (SAL97C11.NOVEDADW == '8') cod = '9'
    datos_envio = datosEnvio() + cod + '|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw + '|' + ano + '|'
    datos_envio += SAL97C11.LLAVEW + '|' + SAL97C11.LLAVEALTW + '|' + SAL97C11.ATIENDEPROF + '|' + SAL97C11.NOMBREW + '|' + SAL97C11.OBSERW.padEnd(30, ' ') + SAL97C11.TIPOCITAW + '|'; // FALTAN LAS OTRAS DOS OBSERV
    datos_envio += SAL97C11.CONTRATOW.padStart(4, ' ') + '|' + SAL97C11.CONVENIOCNCAP.padStart(2, ' ') + '|' + SAL97C11.VALORW.padEnd(12, '0') + '|' + SAL97C11.CLAVECANCW + '|' + SAL97C11.FINALIDADW.padStart(2, '0') + '|' + SAL97C11.EMBARAZOW + '|' + SAL97C11.FECHASOLICW.replace(/-/g, '') + '|' + SAL97C11.HORAELABW.replace(/:/, '') + '|' + SAL97C11.EPSPACIW.padStart(6, ' ') + '|' + SAL97C11.ESTADOW.padStart(1, ' ') + '|' + SAL97C11.CAUSACANCW.padStart(1, ' ') + '|' + SAL97C11.TELW.padStart(12, ' ') + '|' + SAL97C11.TEL2W.padStart(12, ' ') + '|' + SAL97C11.UNSERVW.padStart(2, ' ') + '|' + SAL97C11.TIPOANESTW.padStart(1, ' ') + '|' + SAL97C11.DOBLEW.padStart(1, ' ') + '|' + localStorage.getItem('Usuario') + '|' + SAL97C11.FECHAELABW + '|' + SAL97C11.FACTORW + '|' + SAL97C11.PACIW + '|' + SAL97C11.LLAVEANTW + '|';
    datos_envio += `${SAL97C11.COVDIGESTIVOW2}|${SAL97C11.COVCANSANW2}|${SAL97C11.COVGUSOLFW2}|${SAL97C11.CONTATOCOVIDW2}|${SAL97C11.ENFCOVDW2}|${SAL97C11.SIGUECUARW2}|${SAL97C11.SINTOMASERAW2}|${SAL97C11.FIEBREW2}|`
    console.debug(datos_envio);
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(data => {
            console.debug(data);
            if (SAL97C11.NOVEDADW == '7') CON851('', 'Se ha agendado la cita correctamente', null, 'success', 'Exito');
            if (SAL97C11.NOVEDADW == '8') CON851('', 'Se ha realizado el cambio en la cita correctamente', null, 'success', 'Exito');
            if (SAL97C11.OPCIONACTIVA == '097C11') {
                SAL97C11.IMPRESION = new Object;
                SAL97C11.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT;
                SAL97C11.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
                SAL97C11.IMPRESION.FECHACITA = SAL97C11.FECHAW
                SAL97C11.IMPRESION.HORACITA = SAL97C11.HORAW
                // SAL97C11.IMPRESION.MEDICOCITA = medicoMask_SAL97C11.value
                SAL97C11.IMPRESION.CUP = SAL97C11.CUPSW;
                SAL97C11.IMPRESION.DESCRIPCUP = SAL97C11.DESCRIPCUP
                SAL97C11.IMPRESION.ENTIDAD = SAL97C11.NOMBREENTW
                SAL97C11.IMPRESION.APELLIDO1 = SAL97C11.APELLIDO1
                SAL97C11.IMPRESION.APELLIDO2 = SAL97C11.APELLIDO2
                SAL97C11.IMPRESION.NOMBRE1 = SAL97C11.NOMBRE1
                SAL97C11.IMPRESION.NOMBRE2 = SAL97C11.NOMBRE2
                SAL97C11.IMPRESION.NOMBREMEDICO = SAL97C11.DESCRIPMEDW;
                SAL97C11.IMPRESION.CC = pacienteMask_SAL97C11.value
                SAL97C11.IMPRESION.HORACREA = moment().format('YYYYMMDD') +" / "+ moment().format('HH:mm')
                SAL97C11.IMPRESION.OPERCREA = localStorage.Usuario
                SAL97C11.IMPRESION.TELESALUD = false
                if (SAL97C11.UNSERVW == '63') SAL97C11.IMPRESION.TELESALUD = true
            
                CON851P('00', () => {
                    let Window = BrowserWindow.getAllWindows();
                    if (Window.length > 1) {
                        _cerrarSegundaVentana();
                    } else {
                        _toggleNav()
                    };
                }, () => {
                    _impresioncitas(SAL97C11.IMPRESION, () => {
                        let Window = BrowserWindow.getAllWindows();
                        if (Window.length > 1) {
                            setTimeout(_cerrarSegundaVentana, 1000);
                        } else {
                            _toggleNav()
                        };
                    }, () => {
                        CON851('', 'Ocurrio un error imprimiendo', _datoobser_SAL97C11(), 'error', 'Error');
                    });
                });
            } else {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    setTimeout(_cerrarSegundaVentana, 1000);
                } else {
                    _toggleNav()
                };
            }
        })
        .catch(err => {
            console.error(err);
            _evaluartelefono_SAL97C11();
        })
}

function _retiro_SAL97C11() {
    let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD');
    let ano = fechaw.substring(2, 4);
    SAL97C11.LLAVEW = fechaw + SAL97C11.MEDW.padStart(10, '0') + SAL97C11.PACIW + SAL97C11.TIPOFACTW + SAL97C11.CUPSW.padEnd(12, ' ') + $('#sucursal_97C11').val().trim();
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datosEnvio() + 'B|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + SAL97C11.FECHAW.replace(/-/g, '') + '|' + ano + '|' + SAL97C11.LLAVEW + '|' }, URL)
        .then(data => {
            console.debug(data);
            CON851('', 'Se ha eliminado correctamente la cita', null, 'success', 'Exito');
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                setTimeout(_cerrarSegundaVentana, 1000);
            } else {
                _toggleNav()
            };
        })
        .catch(err => {
            console.error(err);
            _evaluarpaciente_SAL97C11();
        })
}
///////////////////////////////// MASCARAS //////////////////////////////////////////////////

// var claseMask_SAL7C11 = IMask($('#clase_97C11')[0], { mask: Number, min: 0, max: 7 });

var pacienteMask_SAL97C11 = IMask($('#numero_97C11')[0], {
    mask: '***************',
    // thousandsSeparator: ',',
})

var medicoMask_SAL97C11 = IMask($('#medico_97C11')[0], {
    mask: Number,
    // thousandsSeparator: ',',
})

var claseMask_SAL7C11 = IMask($("#clase_97C11")[0], {
    mask: '*',
    definitions: {
        '*': /[A,B,C,D,E,F,G,H,I,1,3,4,5,7]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

var dobleMask_SAL97C11 = IMask($("#citadoble_97C11")[0], {
    mask: '*',
    definitions: {
        '*': /[S,N,T]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

var estadocitaMask_SAL7C11 = IMask($("#estadocita_97C11")[0], {
    mask: '*',
    definitions: {
        '*': /[C,*, ]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

var horaMask_SAL97C11 = IMask($('#hora_97C11')[0], {
    mask: 'HH:mm',
    blocks: {
        HH: {
            mask: IMask.MaskedRange,
            from: 00,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 00,
            to: 59
        }
    }
})

var fechadeseadaMask_SAL7C11 = IMask($("#fechadesea_97C11")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 2000, to: 2030, maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: 01, to: 12, maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 01, to: 31, maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        if (fecha == "Invalid date") {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            return str;
        }
    }
});

var fechacitaaMask_SAL7C11 = IMask($("#fechacita_97C11")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 2000, to: 2030, maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: 01, to: 12, maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 01, to: 31, maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        if (fecha == "Invalid date") {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            return str;
        }
    }
});

function _fecharequeridaMask_SAL97C11() {
    var fecharequeridaMask = IMask($("#fecharequerida_SAL97C11")[0], {
        mask: Date,
        pattern: 'Y-m-d',
        lazy: true,
        blocks: {
            Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 2000, to: 2030, maxLength: 4 },
            m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: 01, to: 12, maxLength: 2 },
            d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 01, to: 31, maxLength: 2 },
        },
        format: function (date) {
            return moment(date).format("YYYY-MM-DD");
        },
        parse: function (str) {
            var fecha = moment(str).format('YYYY-MM-DD');
            if (fecha == "Invalid date") {
                CON851('01', '01', null, 'error', 'error');
            }
            else {
                return str;
            }
        }
    });
}

function _mascarascovid19_SAL97C11() {
    var sintomasMask_SAL97C11 = IMask($("#sintomasrespiratotios_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var fiebreMask_SAL97C11 = IMask($("#fiebre_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var digestivosMask_SAL97C11 = IMask($("#digestivos_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var cansancioMask_SAL97C11 = IMask($("#cansancio_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var gustoMask_SAL97C11 = IMask($("#gusto_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var contactoMask_SAL97C11 = IMask($("#contacto_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var enfermedadMask_SAL97C11 = IMask($("#enfermedad_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var cuarentenaMask_SAL97C11 = IMask($("#cuarentena_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
}

function _Mascarasrecomendaciones_SAL97C11() {
    var nadaviaoraMask_SAL97C11 = IMask($("#nadaviadorarecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var asisayunasMask_SAL97C11 = IMask($("#asisayunasrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var dietaliquiMask = IMask($("#dietaliquirecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var jugocincamMask = IMask($("#jugocincamrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var ropazapatoMask = IMask($("#ropazapatorecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var gripefeibrMask = IMask($("#gripefeibrrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var aspirinasaMask = IMask($("#aspirinasarecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var acompanantMask = IMask($("#acompanantrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var maquillajeMask = IMask($("#maquillajerecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var menoredadeMask = IMask($("#menoredaderecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var copagomodeMask = IMask($("#copagomoderecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var pijamautilMask = IMask($("#pijamautilrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var medicontroMask = IMask($("#medicontrorecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var frascobocaMask = IMask($("#frascobocarecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var radiogrtacMask = IMask($("#radiogrtacrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var panalesdesMask = IMask($("#panalesdesrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var cobijatermMask = IMask($("#cobijatermrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var reservafremMask = IMask($("#reservafremrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var formolx500Mask = IMask($("#formolx500recome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
}

/////////////////////////////////////////////// VENTANAS F8 ///////////////////////////////////////
function _ventanaPacientes(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'PACIENTES',
            valoresselect: ['Nombre del paciente'],
            f8data: 'PACIENTES',
            columnas: [{
                title: 'COD'
            }, {
                title: 'NOMBRE'
            }, {
                title: 'EPS'
            }, {
                title: 'EDAD'
            }],
            callback: (data) => {
                pacienteMask_SAL97C11.typedValue = data.COD;
                _enterInput('#numero_97C11');
            },
            cancel: () => {
                $('#numero_97C11').focus();
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaprofesionales_SAL7C11(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        let URL = get_url("APP/SALUD/SER819.DLL");
        postData({
            datosh: datosEnvio() + '|' + SAL97C11.ATIENDEW + '|'
        }, URL)
            .then(data => {
                data.ARCHPROF.pop();
                SAL97C11.PROFESIONALES = data.ARCHPROF;
                _ventanaDatos({
                    titulo: 'VENTANA DE PROFESIONALES',
                    columnas: ["NOMBRE", "DESCRIPCION", "IDENTIFICACION", "LU", "MA", "MI", "JU", "VI", "SA"],
                    data: SAL97C11.PROFESIONALES.filter(x => x.ATIENDE_PROF == SAL97C11.ATIENDEW),
                    ancho: '95%',
                    callback_esc: function () {
                        $("#medico_97C11").focus();
                    },
                    callback: function (data) {
                        medicoMask_SAL97C11.typedValue = data.IDENTIFICACION;
                        $('#medicod_97C11').val(data.NOMBRE.trim());
                        _enterInput('#medico_97C11');
                    }
                });
            })
            .catch(error => {
                console.log(error);
                _toggleNav();
            })
    }
}

function _ventanatablatarifas_SAL97C11(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        loader('show');
        SAL97C11.F8TARIFAS = [];
        postData({
            datosh: datosEnvio()
        }, get_url("APP/SALUD/SER802C.DLL"))
            .then(data => {
                loader('hide');
                data = data.CODIGOS;
                data.pop();
                codigos = data;
                if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                    SAL97C11.TARIFAS2 = codigos.forEach(element => {
                        if (element.TIPO == SAL97C11.TIPOFACTW) {
                            SAL97C11.F8TARIFAS.push(element);
                        }
                    });
                    _ventanaDatos({
                        titulo: 'VENTANA DE TARIFAS',
                        columnas: ['TIPO', 'LLAVE', 'DESCRIP'],
                        data: SAL97C11.F8TARIFAS,
                        ancho: "95%",
                        callback_esc: function () {
                            $("#procedimiento_97C11").focus();
                        },
                        callback: function (data) {
                            $('#procedimiento_97C11').val(data.LLAVE);
                            _enterInput('#procedimiento_97C11');
                        }
                    });
                }
            })
            .catch(error => {
                loader('hide');
                console.error(error);
                $("#procedimiento_97C11").focus();
            })
    }
}

function _ventanaclase_SAL97C11(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE CLASES DE SERVICIO',
            columnas: ["COD", "DESCRIPCION"],
            data: SAL97C11.SERVICIOS,
            callback_esc: function () {
                $("#clase_97C11").focus();
            },
            callback: function (data) {
                claseMask_SAL7C11.typedValue = data.COD;
                _enterInput('#clase_97C11');
            }
        });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////