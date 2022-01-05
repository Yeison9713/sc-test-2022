var SER602 = new Object;

$(document).ready(function () {
    nombreOpcion('9,7,6,4 - Transferir saldos iniciales');
    _inputControl("reset");
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    SER602.NITUSU = $_USUA_GLOBAL[0].NIT;
    SER602.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    SER602.CIUDADUSU = $_USUA_GLOBAL[0].NOMBRE_CIU;
    SER602.DIRINVUSU = $_USUA_GLOBAL[0].DIR_INV.trim();
    _validarmes_SER602();
});

function _validarmes_SER602() {
    if (($_MESLNK > 11) || (($_ANOLNK == 99) && ($_MESLNK = 01))) {
        _crearnombremov_SER602();
    } else {
        jAlert({ titulo: 'ERROR', mensaje: 'ERROR ESTA OPCION SOLO SE UTILIZA PARA CAMBIO DE AÑO' }, _toggleNav);
    }
}


function _crearnombremov_SER602() {
    SER602.ARCHIVO1 = '';
    SER602.ARCHIVOW = '';
    if (SER602.ARCHIVO1.trim() == '') {
        SER602.ARCHIVO1 = '\\' + SER602.DIRINVUSU;
        $('#directorigen_602').val(SER602.ARCHIVO1);
        validarInputs(
            {
                form: "#DIRECTORIGEN_SER602",
                orden: '1'
            },
            () => { _toggleNav(); },
            () => {
                SER602.ARCHIVO1 = $('#directorigen_602').val();
                if (SER602.ARCHIVO1.trim() == '') {
                    _crearnombremov_SER602();
                } else {
                    SER602.NOMFAC = "\control\SC-FACSA.DAT";
                    _abrirmovimiento_SER602();
                }
            }
        )
    }
}

function _abrirmovimiento_SER602() {

    let datos_envio = datosEnvio() + SER602.ARCHIVO1 + '|' + SER602.NOMFAC + '|';
    SolicitarDll({ datosh: datos_envio }, dato => {
        var date = dato.split("|");
        var CTLSTAT = date[0];
        if (CTLSTAT == '00') {
            _aceptardestino_SER602();
        } else {
            _crearnombremov_SER602();
        }
    }, get_url('APP/SALUD/SER602.DLL'));
}


function _aceptardestino_SER602() {
    if (SER602.ARCHIVOW.trim() == '') {
        SER602.ARCHIVOW = '\\' + SER602.DIRINVUSU;
        $('#Directoriodest_602').val(SER602.ARCHIVOW);
        validarInputs(
            {
                form: "#DIRECTDEST_SER602",
                orden: '1'
            },
            () => { _crearnombremov_SER602(); },
            () => {
                SER602.ARCHIVOW = $('#Directoriodest_602').val();
                if (SER602.ARCHIVOW.trim() == '') {
                    _crearnombremov_SER602();
                } else {
                    SER602.NOMFAC2 = "\control\SC-FACSA.DAT";
                    _abrirmovimiento2_SER602();
                }
            }
        )
    }
}

function _abrirmovimiento2_SER602() {

    let datos_envio = datosEnvio() + SER602.ARCHIVOW + '|' + SER602.NOMFAC2 + '|';
    SolicitarDll({ datosh: datos_envio }, dato => {
        var date = dato.split("|");
        var CTLSTAT = date[0];
        if (CTLSTAT == '00') {
            _buscarbloqueo_SER602();
        } else {
            _aceptardestino_SER602();
        }
    }, get_url('APP/SALUD/SER602.DLL'));
}

function _buscarbloqueo_SER602() {
    postData({
        datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`
    }, get_url("APP/CONTAB/CON007B.DLL"))
    .then(data => {
        console.debug(data);
        data = data.split("|");
        if (data[1].substring(0, 1) == '0' || data[1].substring(0, 1) == '3' || data[1].substring(0, 1) == '5') {
            SER602.TRASLADARSALD = '';
            _crearnuevossaldos_SER602();
        } else {
            CON851B(segw, _crearnombremov_SER602);
        }
    })
    .catch(error => {
        console.error(error);
        CON851('','Ocurrio un error con el usuario',null,'error','Error');
        _toggleNav();
    });
}

function _crearnuevossaldos_SER602() {
    if (SER602.TRASLADARSALD.trim() == '') {
        SER602.TRASLADARSALD = 'N';
        $('#trasladarfact_602').val(SER602.TRASLADARSALD);
    }
    validarInputs(
        {
            form: "#TRASLADARFACT_SER602",
            orden: '1'
        },
        () => { _crearnombremov_SER602(); },
        () => {
            SER602.TRASLADARSALD = $('#trasladarfact_602').val();
            if ((SER602.TRASLADARSALD == 'N') || (SER602.TRASLADARSALD == 'S')) {
                SER602.NROFACW = '';
                SER602.TRASLADARCART = '';
                if (SER602.TRASLADARSALD == 'N') {
                    _procesornumeracion_SER602();
                } else if ((SER602.NITUSU == 892000401) || ($_ANOLNK == 2001)) {
                    SER602.TRASLADARSALD = 'N';
                    $('#trasladarfact_602').val(SER602.TRASLADARSALD);
                    _procesornumeracion_SER602();
                } else {
                    _crearnuevossaldos_SER602();
                }
                // CALL "INV070" USING NOM-FAC-ORI NOM-FAC-DES NRO-FAC-W
                // CANCEL "INV070".
            } else {
                SER602.TRASLADARSALD = '';
                _crearnuevossaldos_SER602();
            }
        }
    )
}

function _procesornumeracion_SER602() {
    if (SER602.TRASLADARCART.trim() == '') {
        SER602.TRASLADARCART = 'N';
        $('#trasladarcart_602').val(SER602.TRASLADARCART);
    }
    validarInputs(
        {
            form: "#TRASLADARCART_SER602",
            orden: '1'
        },
        () => { _crearnombremov_SER602(); },
        () => {
            SER602.TRASLADARCART = $('#trasladarcart_602').val();
            if ((SER602.TRASLADARCART == 'N') || (SER602.TRASLADARCART == 'S')) {
                SER602.TRASLADARGLOS = ''; 
                if (SER602.TRASLADARCART == 'N') {
                    _procesorglosas_SER602();
                } else {
                    SER602.NUMNUMORI = SER602.ARCHIVO1;
                    // INSPECT NOM - NUM - ORI  REPLACING
                    // FIRST "                     "
                    // BY    "/control/SC-NUMER.DAT".
                    // MOVE ARCHIVO - W  TO NOM - NUM - DES.
                    // INSPECT NOM - NUM - DES  REPLACING
                    // FIRST "                     "
                    // BY    "/control/SC-NUMER.DAT".

                    //     CALL "INV070N" USING NOM - NUM - ORI NOM - NUM - DES ADMIN - W.
                    //         CANCEL "INV070N".
                }
            } else {
                SER602.TRASLADARCART = '';
                _procesornumeracion_SER602();
            }
        }
    )
}

function _procesorglosas_SER602() {
    if (SER602.TRASLADARGLOS.trim() == '') {
        SER602.TRASLADARGLOS = 'N';
        $('#trasladarglos_602').val(SER602.TRASLADARGLOS);
    }
    validarInputs(
        {
            form: "#TRASLADARGLOS_SER602",
            orden: '1'
        },
        () => { _crearnombremov_SER602(); },
        () => {
            SER602.TRASLADARGLOS = $('#trasladarglos_602').val();
            if ((SER602.TRASLADARGLOS == 'N') || (SER602.TRASLADARGLOS == 'S')) {
                if (SER602.TRASLADARGLOS == 'N') {
                    _procesorcontratos_SER602();
                } else {
                    SER602.NUMNUMORI = SER602.ARCHIVO1;
            //         INSPECT NOM-NUM-ORI REPLACING
            //           FIRST "                     "
            //           BY    "/control/AR-GLOSA.DAT".
            //   MOVE ARCHIVO-W  TO NOM-NUM-DES.
            //   INSPECT NOM-NUM-DES REPLACING
            //           FIRST "                     "
            //           BY    "/control/AR-GLOSA.DAT".
            // CALL "INV070G" USING NOM-NUM-ORI NOM-NUM-DES.
            //   CANCEL "INV070G".
                }
            } else {
                SER602.TRASLADARGLOS = '';
                _procesorglosas_SER602();
            }
        }
    )
}

function _procesorcontratos_SER602(){
    if (SER602.TRASLADARCONTR.trim() == '') {
        SER602.TRASLADARCONTR = 'N';
        $('#trasladarcontr_602').val(SER602.TRASLADARCONTR);
    }
    validarInputs(
        {
            form: "#TRASLADARCONTR_SER602",
            orden: '1'
        },
        () => { _crearnombremov_SER602(); },
        () => {
            SER602.TRASLADARCONTR = $('#trasladarcontr_602').val();
            if ((SER602.TRASLADARCONTR == 'N') || (SER602.TRASLADARCONTR == 'S')) {
                if (SER602.TRASLADARCONTR == 'N') {
                    _toggleNav();
                } else {
                    SER602.NUMNUMORI = SER602.ARCHIVO1;
            //         INSPECT NOM-NUM-ORI REPLACING
            //         FIRST "                     "
            //         BY    "/control/SC-CONTR.DAT".
            // MOVE ARCHIVO-W  TO NOM-NUM-DES.
            // INSPECT NOM-NUM-DES REPLACING
            //         FIRST "                     "
            //         BY    "/control/SC-CONTR.DAT".


            // CALL "INV070C" USING NOM-NUM-ORI NOM-NUM-DES.
            // CANCEL "INV070C".
                }
            } else {
                SER602.TRASLADARCONTR = '';
                _procesorcontratos_SER602()();
            }
        }
    )
}