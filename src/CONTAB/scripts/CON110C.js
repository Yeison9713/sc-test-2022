// 05-07-2019 -- Diana Escobar: Creacion 

var $_OTRSTAT = '00', $_NOMBRETABLA = '', $_MESNACEMPL = '', $_DIANACEMPL = '', $_DVTERCEROW = '', $_FECHACUMPTERCEW = '', $_NOMBRECLIW = '', $_DESCRIPTER2W = '', $_APEL1TER2W = '', $_APEL2TER2W = '', $_NOMB1TER2W = '', $_CODCIUTERCEW = '', $_DESCRIPCIUTERW = '', $_INDICTERCEW = '', $_TELTERCEW = '', $_NITTERCEW = '', $_TIPOIDTERCEW = '', $_ENTIDADTERCEW = '', $_DESCRIPENTTERW = '', $_ACTTERCEW = '', $_DESCRIPACTTERW = '', $_CONVENIOTERCEW = '', $_DESCRIPTARIFTERW = '', $_RUTTERCEW = '', $_NOMCOMERTERCEW = '', $_OTROSTERCEW = '', $_CONVREDW = '', $_DESCRIPCONVREDW = '', $_CONTACTTERCEW = '', $_WEBTERCEW = '', $_CARGOTERCEW = '', $_EMAILTERCEW = '', $_EMAILELECTTER = '', $_ASESORTERCEW = '', $_TIPOCUPOTERCEW = '', $_FECHACRETERCEW = '', $_ADMINCRETERCEW = '', $_FECHAMODTERCEW = '', $_ADMINMODTERCEW = '', $_FACTORTERCEW = '', $_CUPOTERCEW = '', $_VENDTERCEW = '', $_PAGOTERCEW = '00', $_PLAZOTERCEW = '', $_CODZONAW = '', $_DESCRIPZONAW = '', $_CODRUTAW = '',
    $_DESCRIPRUTAW = '', $_ORDENTERCEW = '', $_ACTIVICATERCEW = '', $_PORCICATERCEW = '', $_PORCRETTERCEW = '', $_GRADOTERCEW = '', $_DESCRIPGRADTERW = '', $_REGIVATERCEW = '', $_CALIFITERCEW = '', $_GRANCONTRIBTERCEW = 'N', $_RETETERCEW = 'N', $_VLRBASERETTERCEW = '', $_RETIVACOMPTERCEW = 'N', $_RETIVATERCEW = 'N', $_EXENTRETTERCEW = 'N', $_SEGUROTERCEW = 'N', $_DATACRETERCEW = 'N', $_ACUEPAGOTERCEW = 'N', $_CAPITADOTERCEW = 'N', $_NITCLITERCEW = 'N', $_RETICAVTERCEW = 'N', $_BLOQTERCEW = 'N', $_EXIVATERCEW = 'N', $_MARCATERCEW = '', $_EMPRESAVEHTERCEW = '', $_NROVEHTERCEW = '', $_PLACAVEHTERCEW = '', $_IDREPRETERCEW = '', $_NOMREPRETERCEW = '', $_EMAILREPTERCEW = '', $_CUPOASIGW = '', $_DESCRIPVENDTERW = '', $_ZONATERCEW = '', $_DESCRIPZONAW = '', $_DESCRIPRUTAW = '', $_ACTIVICAW = '', $_ACTIVICATERCEW = ''
$_IDTESORTERCEW = '', $_NOMTESORTERCEW = '', $_EMAILTESOTERCEW = '', $_NOMREF1TERCEW = '', $_DIRREF1TERCEW = '', $_TELREF1TERCEW = '', $_RELREF1TERCEW = '', $_NOMREF2TERCEW = '', $_DIRREF2TERCEW = '', $_TELREF2TERCEW = '', $_RELREF2TERCEW = '', $_NOMREF3TERCEW = '', $_DIRREF3TERCEW = '', $_TELREF3TERCEW = '', $_RELREF3TERCEW = '', $_NOMTRABTERCEW = '', $_DIRTRABTERCEW = '', $_TELTRABTERCEW = '', $_CARTRABTERCEW = '', $_SUETRABTERCEW = '', $_ANTTRABTERCEW = '', $_FECHANACTERCEW = '', $_EMBARGOTERCEW = '', $_CIUEXPTERCEW = '', $_ENTIDAFITERCEW = '', $_FECHAAFILTERCEW = '00000000', $_CLASIFTERCEW = '', $_DIRECCTERCEW = '', $_ANONACEMPL = '0000', $_MESNACEMPL = '00', $_DIANACEMPL = '00', $_CONTRATER = '';
var $_FURIP = false, $_SEGUNDAVENTANA = false;
var CON110C = [];
////////////////////////////////MAESTRO DE TERCEROS ///////////////////////////////7

$(document).ready(function () {
    nombreOpcion('1,3,1 - Maestro de Terceros');
    _inputControl("reset");
    _inputControl("disabled");
    loader('show');
    CON110C.tabla110C = [];
    CON110C.NOMBRETABLA = '';
    $_CALIFITERCEW = '9';
    $_REGIVATERCEW = '9';
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_NOMUSU = $_USUA_GLOBAL[0].NOMBRE;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_CONTADOUSU = $_USUA_GLOBAL[0].CONTADO;
    $_SALMINUSU = $_USUA_GLOBAL[0].SAL_MIN;
    $_CARTERAUSU = $_USUA_GLOBAL[0].CARTERA;
    $_PLACAUSU = $_USUA_GLOBAL[0].PLACA;
    $_CUOTASUSU = $_USUA_GLOBAL[0].CUOTAS;
    $_TIPOEMPRESAUSU = $_USUA_GLOBAL[0].TIPO_EMPRE;
    $_RETENEDORUSU = $_USUA_GLOBAL[0].RETENEDOR;
    $_CODCIUUSU = $_USUA_GLOBAL[0].COD_CIUD;
    _toggleF8([
        { input: 'codclien', app: 'con110c', funct: _ventanatercerosCON110C },
        { input: 'ciudad', app: 'con110c', funct: _ventanaciudadesCON110C },
        { input: 'actividad', app: 'con110c', funct: _ventanaactividadCON110C },
        { input: 'entidad', app: 'con110c', funct: _ventanaentidadCON110C },
        { input: 'zona', app: '110c', funct: _ventanazonasCON110C },
        { input: 'ruta', app: '110c', funct: _ventanarutaCON110C },
        { input: 'grdnegocio', app: '110c', funct: _ventanagrdnegocioCON110C },
        { input: 'clasifclien', app: '110c', funct: _ventanaclasclienteCON110C },
        { input: 'convenio', app: 'con110c', funct: _ventanaconvenioCON110C }

    ]);
    obtenerDatosCompletos({
        nombreFd: 'CIUDADES'
    }, function (data) {
        $_CIUDAD_CON110C = data.CIUDAD
        $_CIUDAD_CON110C.pop()
        loader('hide');
        _comenzaropccon110c();
        obtenerDatosCompletos({
            nombreFd: 'ENTIDADES',
            usuario: true,
        }, function (data) {
            $_ENTIDADES_CON110C = data.ENTIDADES
            $_ENTIDADES_CON110C.pop()
        })
    })
})




/////////////////////////////// OPCION CON110C- MAESTRO DE TERCEROS //////////////////////////////////

function _comenzaropccon110c() {
    $_SW9CON110C = '0';
    $_NOVEDADCON110C = '7';
    if ($_OTRSTAT == '00') {
        if ($_CARTERAUSU = 'S') {
            CON850(_datonovedad_con110c);
        } else {
            _comenzaropccon110c();
        }
    } else {
        let Window = BrowserWindow.getAllWindows();
        if (Window.length > 1) {
            _cerrarSegundaVentana();
        } else {
            _toggleNav()
        };
    }
}

function _datonovedad_con110c(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    let Window = BrowserWindow.getAllWindows();
    if (Window.length > 1) {
        console.log('dato novedad')
        $_SEGUNDAVENTANA = true;
        if ($_MESSAGE[2].furip) $_FURIP = true;
        // codclienteMask.typedValue = $_MESSAGE[2].cliente;
        // CON110C.CODTERCEROW = codclienteMask.unmaskedValue;
        $("#codclien_con110c")[0].value = $_MESSAGE[2].cliente;
        CON110C.CODTERCEROW = $("#codclien_con110c")[0].value;
        $_NOVEDADCON110C = '8';
        _codlcon110c();
    }
    setTimeout(() => {
        _validarnovedad(novedad)
    }, 300);
}

function _validarnovedad(novedad) {
    $('#tabla1').click();
    $_SWCREAR = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            $_SEGUNDAVENTANA = false;
            _evaluardatonovedad_con110c()
            break;
        default:

            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                console.log('salir segunda venta')
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
            break;
    }
    $('#novedad_CON110C').val(novedad.id + ' - ' + novedad.descripcion)
}

function _evaluardatonovedad_con110c() {
    if ($_SWCREAR > 0) {
        $_NOVEDADCON110C = $_SWCREAR;
        if ($_SWCREAR == '7') {
            _evaluarcodcliente110c();
        } else if ($_SWCREAR == '8' || $_SWCREAR == '9') {
            _evaluarcodcliente110c();
        }
    } else {
        $_NOVEDADCON110C = 7;
        $('#novedad_CON110C').val($_NOVEDADCON110C);
        revisarpermisos_con110c();
    }
}

function revisarpermisos_con110c() {
    let URL = get_url("APP/CONTAB/CON904.DLL");
    postData({ datosh: datosEnvio() + localStorage.getItem('Usuario').trim() + '|' + 'C12' + $_NOVEDADCON110C + '|' }, URL)
        .then(data => {
            _evaluarcodcliente110c();
        })
        .catch(err => {
            console.error(err);
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        });
}

function _evaluarcodcliente110c() {
    validarInputs({
        form: '#CODCLIEN_CON110C',
        orden: "1"
    },
        () => { CON850(_datonovedad_con110c) },
        _codlcon110c
    )
}

function _codlcon110c() {
    // CON110C.CODTERCEROW = codclienteMask.unmaskedValue;
    $("#codclien_con110c")[0].value = $("#codclien_con110c")[0].value.slice(0, 10);
    CON110C.CODTERCEROW = $("#codclien_con110c")[0].value;
    CON110C.CODTERCEROW = CON110C.CODTERCEROW.padStart(10, '0');
    if (($_NOVEDADCON110C == '7') || ($_NOVEDADCON110C == '8')) {
        if (parseInt(CON110C.CODTERCEROW) == 0) {
            CON110C.CODTERCEROW = $_NITUSU;
            $("#codclien_con110c")[0].value = CON110C.CODTERCEROW;
            // codclienteMask.typedValue = CON110C.CODTERCEROW;
        }
    }
    _consultaterceros_110C()
}

function _consultaterceros_110C() {
    let URL = get_url("APP/CONTAB/CON802_01.DLL");
    postData({
        datosh: datosEnvio() + CON110C.CODTERCEROW + "|" + $_NOVEDADCON110C + "|",
    }, URL)
        .then(data => {
            CON110C.TERCEROS = data.TERCER[0];
            if ($_NOVEDADCON110C == '7') {
                if (!$_SEGUNDAVENTANA) {
                    _error1CON110C();
                }
            } else if ($_NOVEDADCON110C == '8') {
                if (!$_SEGUNDAVENTANA) {
                    setTimeout(_consultadatos_con110c, 100);
                }
            } else if ($_NOVEDADCON110C == '9') {
                if (!$_SEGUNDAVENTANA) {
                    setTimeout(_retirar_con110c, 100);
                }
            }
        }).catch(error => {
            if ($_NOVEDADCON110C == '7') {
                if (!$_SEGUNDAVENTANA) {
                    _nuevoregistrocon110c();
                }
            } else if (error.MENSAJE == "01" && $_NOVEDADCON110C == '8') {
                if (!$_SEGUNDAVENTANA) {
                    _nuevoregistrocon110c();
                }
            } else if (error.MENSAJE == "01" && $_NOVEDADCON110C == '9') {
                if (!$_SEGUNDAVENTANA) {
                    _nuevoregistrocon110c();
                }
            }
        });
}

function _error1CON110C() {
    $_SW9CON110C = '1';
    $_NOVEDADCON110C = 8;
    $("#novedad_CON110C").val('8 - Cambio');
    CON851('00', '00', null, 'error', 'Error');
    _evaluarcodcliente110c();

}


function _nuevoregistrocon110c() {
    $_SW9CON110C = '1';
    $_NITTERCEW = '';
    $_NOMBRECLIW = '';
    validacionestipodoc_con110c();
}

function validacionestipodoc_con110c() {
    if (parseInt(CON110C.CODTERCEROW) > 800000000 && parseInt(CON110C.CODTERCEROW) < 999000000) {
        $_TIPOIDTERCEW = 'NI';
        $("#tipoident_con110c").val('NI - Numero Identidad Tributaria');
    }
    _validartipo_con110c();
}

function _validartipo_con110c() {
    let documento = [
        { "COD": "CC", "DESCRIP": "1- Cedula de Ciudadania" },
        { "COD": "CE", "DESCRIP": "2- Cedula de Extranjeria" },
        { "COD": "PE", "DESCRIP": "3- Permiso Especial Permanencia" },
        { "COD": "PA", "DESCRIP": "4- Numero Pasaporte" },
        { "COD": "RC", "DESCRIP": "5- Registro Civil" },
        { "COD": "TI", "DESCRIP": "6- Tarjeta de Identidad" },
        { "COD": "NU", "DESCRIP": "7- Numero Unico de Identidad" },
        { "COD": "NI", "DESCRIP": "8- Numero Identidad Tributaria" }
    ]
    POPUP({
        array: documento,
        titulo: 'Tipo Identificacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_TIPOIDTERCEW,
        callback_f: _evaluarcodcliente110c
    },
        _evaluartipodoc_con110c);
}

function _evaluartipodoc_con110c(documento) {
    $_TIPOIDTERCEW = documento.COD;
    switch (documento.COD) {
      case "CC":
      case "CE":
      case "PA":
      case "RC":
      case "TI":
      case "NU":
      case "NI":
        validacionesnombres();
        break;
      case "PE":
        if (documento.COD == "PE" && parseInt(CON110C.CODTERCEROW).toString().length > 7) {
          CON851("", "Digite los primeros 7 dígitos del PE", null, "warning", "Advertencia");
          _evaluarcodcliente110c();
        } else validacionesnombres();
        break;
      default:
        _evaluarcodcliente110c();
        break;
    }
    $("#tipoident_con110c").val(documento.COD + " - " + documento.DESCRIP);
}

function validacionesnombres() {
    if ($_TIPOIDTERCEW == 'NI') {
        _evaluarnombreext_con110c();
    } else if (((parseInt(CON110C.CODTERCEROW) > 1000) && (parseInt(CON110C.CODTERCEROW) < 100000000)) ||
        ((parseInt(CON110C.CODTERCEROW) > 700000000) && (parseInt(CON110C.CODTERCEROW) < 799000000)) ||
        (parseInt(CON110C.CODTERCEROW) > 1000000000) || ((parseInt($_NITTERCEW) > 100) && (parseInt($_NITTERCEW) < 100000000)) ||
        ($_TIPOIDTERCEW == 'CE')) {
        _ventanapersonanatural_con110c()
    } else if (($_NITUSU == '0830009610') || ($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) {
        _evaluarnombreext_con110c();
    } else {
        _evaluarnombreext_con110c();
    }
}
/////////////////// EMPRESA /////////////////////////
function _evaluarnombreext_con110c() {
    validarInputs({
        form: '#NOMBRESCOMPL_CON110C',
        orden: "1"
    },
        validacionestipodoc_con110c,
        () => {
            $_NOMBRECLIW = $('#nombres_con110c').val();
            $_DESCRIPTER2W = $_NOMBRECLIW;
            if ($_DESCRIPTER2W.trim() == '') {
                CON851('02', '02', null, 'error', 'error');
                _evaluarnombreext_con110c();
            } else {
                _evaluardireccion_con110c();
            }
        }
    )
}


///////// VENTANA DE PERSONA NATURAL
function _ventanapersonanatural_con110c() {
    var ventananombresp = bootbox.dialog({
        size: 'xl',
        title: 'PERSONA NATURAL',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group"> ' +

            '<label class="col-md-4 control-label" for="name">' + '1ER APELLIDO:' + '</label> ' +
            '<div class="col-md-6" id= "PRIAPELLIDOS_CON110C"> ' +
            '<input id="prapellidos_con110c" type="text" class="form-control input-md" data-orden="1" maxlength="20"> ' +
            '</div> ' +

            '<label class="col-md-4 control-label" for="name">' + '2DO APELLIDO:' + '</label> ' +
            '<div class="col-md-6" id= "SEGAPELLIDOS_CON110C"> ' +
            '<input id="sdoapellido_con110c" type="text" class="form-control input-md" data-orden="1" maxlength="20"> ' +
            '</div> ' +

            '<label class="col-md-4 control-label" for="name">' + 'NOMBRES:' + '</label> ' +
            '<div class="col-md-6"id= "NOMAPELLIDOS_CON110C"> ' +
            '<input id="nombre_con110c" type="text" class="form-control input-md" data-orden="1" maxlength="30"> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventananombresp.off('show.bs.modal');
                    setTimeout(_evaluardireccion_con110c, 300)
                    // _evaluardireccion_con110c()
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventananombresp.off('show.bs.modal');
                    validacionestipodoc_con110c();
                }
            }
        }
    });
    ventananombresp.init($('.modal-footer').hide());
    ventananombresp.init(_evaluardato1apellido_con110c("1"));
    ventananombresp.on('shown.bs.modal', function () {
        $("#prapellidos_con110c").focus();
    });
}


function _evaluardato1apellido_con110c() {
    _inputControl("disabled");
    if ($_NOVEDADCON110C == '8') {
        $('#prapellidos_con110c').val($_APEL1TER2W);
        $('#sdoapellido_con110c').val($_APEL2TER2W);
        $('#nombre_con110c').val($_NOMB1TER2W);
    } else {
        $('#prapellidos_con110c').val($_APEL1TER2W);
        $('#sdoapellido_con110c').val($_APEL2TER2W);
        $('#nombre_con110c').val($_NOMB1TER2W);
    }
    validarInputs({
        form: '#PRIAPELLIDOS_CON110C',
        orden: '1'
    },
        () => { $('.btn-danger').click(); },
        () => {
            $_APEL1TER2W = $('#prapellidos_con110c').val().toUpperCase(); $('#prapellidos_con110c').val($_APEL1TER2W);
            if ($_APEL1TER2W.trim() == '') {
                CON851('02', '02', _evaluardato1apellido_con110c(), 'error', 'error');
            } else if ($.isNumeric($_APEL1TER2W)) {
                CON851('03', '03', _evaluardato1apellido_con110c(), 'error', 'error');
            } else {
                _evaluardato2apellido_con110c();
            }
        })
}

function _evaluardato2apellido_con110c() {
    validarInputs({
        form: '#SEGAPELLIDOS_CON110C',
        orden: '1'
    },
        _evaluardato1apellido_con110c,
        () => {
            $_APEL2TER2W = $('#sdoapellido_con110c').val().toUpperCase(); $('#sdoapellido_con110c').val($_APEL2TER2W);
            if ($.isNumeric($_APEL2TER2W)) {
                CON851('03', '03', _evaluardato2apellido_con110c(), 'error', 'error');
            } else {
                _evaluarnombres_con110c();
            }
        })
}

function _evaluarnombres_con110c() {
    validarInputs({
        form: '#NOMAPELLIDOS_CON110C',
        orden: '1'
    },
        _evaluardato2apellido_con110c,
        () => {
            $_NOMB1TER2W = $('#nombre_con110c').val().toUpperCase(); $('#nombre_con110c').val($_NOMB1TER2W)
            if ($_NOMB1TER2W.trim() == '') {
                CON851('02', '02', null, 'error', 'error');
                _evaluarnombres_con110c();
            } else {
                if ($.isNumeric($_NOMB1TER2W)) {
                    CON851('03', '03', _evaluarnombres_con110c(), 'error', 'error');
                } else {
                    $_DESCRIPTER2W = $_APEL1TER2W.padEnd(20, ' ') + $_APEL2TER2W.padEnd(20, ' ') + $_NOMB1TER2W.padEnd(30, ' ');
                    $_NOMBRECLIW = `${$_APEL1TER2W.trim()} ${$_APEL2TER2W.trim()} ${$_NOMB1TER2W.substring(0,15).trim()} ${$_NOMB1TER2W.substring(15,30).trim()}`;
                    $('#nombres_con110c').val($_NOMBRECLIW);
                    $('.btn-primary').click();
                }

            }
        })
}

////////////////DESPUES DE LA VENTANA///////////////////////////////
function _evaluardireccion_con110c() {
    validarInputs({
        form: '#DIRECC_CON110C',
        orden: "1"
    },
        () => {
            if (((parseInt(CON110C.CODTERCEROW) > 1000) && (parseInt(CON110C.CODTERCEROW) < 100000000)) || ((parseInt(CON110C.CODTERCEROW) > 700000000) && (parseInt(CON110C.CODTERCEROW) < 799000000)) || (parseInt(CON110C.CODTERCEROW) > 1000000000)) {
                _ventanapersonanatural_con110c()
            } else if (($_NITUSU == '0830009610') || ($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) {
                _evaluarnombreext_con110c();
            } else {
                _evaluarnombreext_con110c();
            }
        },
        () => {
            $_DIRECCTERCEW = $('#direcc_con110c').val();
            if ($_DIRECCTERCEW.trim() == '') {
                CON851('84', '84', null, 'error', 'error');
                _evaluardireccion_con110c()
            } else {
                $_DIRECCIX = $_DIRECCTERCEW;
                $_DIRECCI1_K = $_DIRECCIX.substring(0, 9);
                $_DIRECCI2_K = $_DIRECCIX.substring(9, 10);
                $_DIRECCI3_K = $_DIRECCIX.substring(10, 11);
                $_DIRECCI4_K = $_DIRECCIX.substring(11, 23);
                $_DIRECCI5_K = $_DIRECCIX.substring(23, 45);
                if (($_DIRECCI2_K.trim() == '') && ($_DIRECCI3_K.trim() == '')) {
                    CON851('8L', 'Minimo tiene que tener 10 caracteres DIAN', null, 'warning', 'Advertencia');
                    _validaciones_dirsalud_con110c()
                } else {
                    _validaciones_dirsalud_con110c()
                }
            }
        }
    )
}


function _validaciones_dirsalud_con110c() {
    if (($_NITUSU == '0860052649') && ($_ACTIVICATERCEW == '01')) {
        _evaluarbarriosal_con110c()
    } else {
        _evaluarciudad_con110c()
    }
}

function _evaluarbarriosal_con110c() {
    console.log('FALTA caja barrrio')
    _evaluarciudad_con110c()
}

function _evaluarciudad_con110c() {
    if ($_CODCIUTERCEW.trim() == '') {
        $_CODCIUTERCEW = $_CODCIUUSU;
        $('#ciudad_con110c').val($_CODCIUUSU);
    }
    validarInputs({
        form: '#CIUDAD_CON110C',
        orden: "1"
    },
        _evaluardireccion_con110c,
        () => {
            $_CODCIUTERCEW = $('#ciudad_con110c').val();
            if ($_CODCIUTERCEW.trim() == '') {
                CON851('01', '01', null, 'error', 'error');
                _evaluarciudad_con110c();
            } else {
                SolicitarDll({ datosh: datosEnvio() + '|' + $_CODCIUTERCEW + '|' }, _dataCON110C_05_110C, get_url('/APP/CONTAB/CON110C_05.DLL'));
            }
        }
    )
}

function _dataCON110C_05_110C(data) {
    data = data.split('|');
    $_DESCRIPCIUTERW = data[1].trim();
    if (data[0].trim() == '00') {
        $("#ciudadd_con110c").val($_DESCRIPCIUTERW);
        _evaluartelind_con110c();
    } else if (data[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarciudad_con110c();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _evaluartelind_con110c() {
    validarInputs({
        form: '#IND_CON110C',
        orden: "1"
    },
        _evaluarciudad_con110c,
        () => {
            $_INDICTERCEW = $('#ind_con110c').val();
            if ($.isNumeric($_INDICTERCEW)) {
                _evaluartelefonoterc_con110c();
            } else {
                if ($_INDICTERCEW.trim() == '') {
                    _evaluartelefonoterc_con110c();
                } else {
                    CON851('03', '03', _evaluartelind_con110c(), 'error', 'error');
                }

            }
        }
    )
}

function _evaluartelefonoterc_con110c() {
    validarInputs({
        form: '#TEL_CON110C',
        orden: "1"
    },
        _evaluartelind_con110c,
        () => {
            $_TELTERCEW = $('#tel_con110c').val();
            if ($.isNumeric($_TELTERCEW)) {
                if ($_NOVEDADCON110C == '7') {
                    $('#cc_con110c').val('0');
                    _evaluaraniocumpl_7767();
                } else {
                    _evaluaraniocumpl_7767();
                }
            } else {
                if ($_TELTERCEW.trim() == '') {
                    _evaluaraniocumpl_7767();
                } else {
                    CON851('03', '03', _evaluartelefonoterc_con110c(), 'error', 'error');
                }

            }

        }
    )
}


function _evaluaraniocumpl_7767() {
  validarInputs(
    {
      form: "#ANO_CON110C",
      orden: "1",
    },
    _evaluartelefonoterc_con110c,
    () => {
      $_ANOCUMPTERC = $("#anocumpl_con110").val().padStart(4, "0");
      $_ANONACEMPL = $_ANOCUMPTERC;
      $("#anonac_con110c").val($_ANONACEMPL);
      if (parseInt($_ANOCUMPTERC == 0)) {
        _evaluarmescumpl_7767();
      } else if (parseInt($_ANOCUMPTERC) < 0) {
        CON851("2D", "2D", null, "error", "error");
        _evaluaraniocumpl_7767();
      } else if ($.isNumeric($_ANOCUMPTERC)) {
        if ($_NOVEDADCON110C == "7") {
        //   $_ANONACEMPL = "";
          $("#anonac_con110c").val($_ANONACEMPL);
          _evaluarmescumpl_7767();
        } else {
          _evaluarmescumpl_7767();
        }
      } else {
        _evaluarmescumpl_7767();
      }
    }
  );
}

function _evaluarmescumpl_7767() {
    validarInputs({
        form: "#MES_CON110C",
        orden: "1"
    },
    _evaluaraniocumpl_7767,
        () => {
            $_MESCUMPTERC = $('#mescumpl_con110').val().padStart(2, 0);
            $_MESNACEMPL = $_MESCUMPTERC; $('#mesnac_con110c').val($_MESNACEMPL);
            if (($_MESCUMPTERC.trim() == '') || (parseInt($_MESCUMPTERC) == 0)) {
                _evaluardiacumpl_7767();
            } else if ((parseInt($_MESCUMPTERC) < 1) || (parseInt($_MESCUMPTERC) > 12)) {
                CON851('2D', '2D', null, 'error', 'error');
                _evaluarmescumpl_7767();

            } else if ($.isNumeric($_MESCUMPTERC)) {
                if ($_NOVEDADCON110C == '7') {
                    // $_ANONACEMPL = ''; $('#anonac_con110c').val($_ANONACEMPL);
                    _evaluardiacumpl_7767();
                } else {
                    _evaluardiacumpl_7767();
                }
            } else {
                _evaluarmescumpl_7767();
            }
        }
    )
}

function _evaluardiacumpl_7767() {
  validarInputs(
    {
      form: "#DIA_CON110C",
      orden: "1",
    },
    _evaluarmescumpl_7767,
    () => {
      $_DIACUMPTERC = $("#diacumpl_con110").val().padStart(2, 0);
      if ($_TIPOIDTERCEW == "PE" && !_validarFecha($_ANOCUMPTERC, $_MESCUMPTERC, $_DIACUMPTERC)) {
        CON851("", "Dato obligatoria para PE", null, "warning", "");
        _evaluaraniocumpl_7767();
      } else {
        $_DIANACEMPL = $_DIACUMPTERC;
        $("#dianac_con110c").val($_DIANACEMPL);
        if ($_DIACUMPTERC.trim() == "" || parseInt($_DIACUMPTERC) == 0) {
          _evaluarcedula_con110c();
        } else if (parseInt($_DIACUMPTERC) < 1 || parseInt($_DIACUMPTERC) > 31) {
          CON851("2D", "2D", null, "error", "error");
          _evaluardiacumpl_7767();
        } else if ($.isNumeric($_DIACUMPTERC)) {
          _evaluarcedula_con110c();
        } else {
          _evaluardiacumpl_7767();
        }
      }
    }
  );
}


function _evaluarcedula_con110c() {
    validarInputs({
        form: '#CC_CON110C',
        orden: "1"
    },
        _evaluartelefonoterc_con110c,
        () => {
            $_NITTERCEW = $('#cc_con110c').val();
            if (parseInt($_NITTERCEW) > 0 && parseInt($_NITTERCEW < 100)) {
                CON851('03', '03', _evaluarcedula_con110c(), 'error', 'error');
            } else {
                if ($.isNumeric($_NITTERCEW) || $_NITTERCEW.trim() == '') {
                    _evaluardatodv_con110c()
                } else {
                    CON851('57', '57', _evaluarcedula_con110c(), 'error', 'error');
                }
            }
        }
    )
}


function _evaluardatodv_con110c() {
    validarInputs({
        form: '#DV_CON110C',
        orden: "1"
    },
        _evaluarcedula_con110c,
        () => {
            $_DVTERCEROW = $('#dv_con110c').val();
            if ($_DVTERCEROW.trim() == '') {
                if ($_NITUSU == '0822006141') {
                    CON851('9I', '9I', null, 'error', 'Error');
                    _evaluardatodv_con110c();
                } else {
                    _evaluaractividades_con110c();
                }
            } else {
                _calculadigitoverificacion();
            }
        }
    )
}


function _calculadigitoverificacion() {
    SolicitarDll({ datosh: datosEnvio() + $_NITTERCEW + '|' }, data => {
        var data = data.split("|");
        var $_DV_X = data[0].trim();
        if ($_DVTERCEROW != $_DV_X) {
            CON851('9I', '9I', null, 'error', 'Error');
            _evaluardatodv_con110c();
        } else {
            _evaluaractividades_con110c();
        }
    }, get_url('APP/CONTAB/CON110C_04.DLL'));
}


function _evaluaractividades_con110c() {
    validarInputs({
        form: '#ACTIVI_CON110C',
        orden: "1",
    }, () => {
        _evaluardatodv_con110c()
    },
        () => {
            _FloatText({ estado: 'off' })
            $_ACTTERCEW = $("#actividad_con110c").val();
            if ($_ACTTERCEW == '00') {
                CON851('02', '02', null, 'error', 'error');
                _evaluaractividades_con110c()
            } else {
                SolicitarDll({ datosh: datosEnvio() + '|' + $_ACTTERCEW + '|' }, _dataCON110C_06_110C, get_url('/APP/CONTAB/CON110C_06.DLL'));
            }
        }
    )
}


function _dataCON110C_06_110C(data) {
    data = data.split('|')
    $_DESCRIPACTTERW = data[1].trim()
    if (data[0].trim() == '00') {
        $("#actividadd_con110c").val($_DESCRIPACTTERW);
        
        if ($_FURIP) {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _ubicargrabar_con110c()
            }
        } else {
            _evaluarentidad_con110c()
            // if ($_TIPOEMPRESAUSU == "H") {
            //     _evaluarentidad_con110c()
            // } else {
            //     _evaluarrut_con110c()
            // }
        }
    } else if (data[0].trim()) {
        CON851('01', '01', null, 'error', 'error');
        _evaluaractividades_con110c();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}


function _evaluarentidad_con110c() {
    validarInputs({
        form: '#ENTIDAD_CON110C',
        orden: "1"
    },
        function () { _evaluaractividades_con110c(); },
        () => {
            $_ENTIDADTERCEW = $('#entidad_con110c').val();
            if ($_ENTIDADTERCEW.trim() == '') {
                if ($_NITUSU == 900405505 || $_ACTTERCEW == 02) {
                    _evaluarconvenio_con110c();
                } else {
                    if ($_ACTTERCEW < 05 || $_ACTTERCEW > 90) {
                        $_CONVENIOTERCEW = '';
                        $("#convenio_con110c").val($_CONVENIOTERCEW);
                        _evaluarrut_con110c();

                    } else {
                        _evaluarconvenio_con110c();
                    }
                }
            } else {
                SolicitarDll({ datosh: datosEnvio() + '|' + $_ENTIDADTERCEW + '|' }, _dataCON110C_07_110C, get_url('/APP/CONTAB/CON110C_07.DLL'));
            }
        }
    )
}

function _dataCON110C_07_110C(data) {
    data = data.split('|');
    $_DESCRIPENTTERW = data[1].trim();
    if (data[0].trim() == '00') {
        $("#entidadd_con110c").val($_DESCRIPENTTERW);
        if (($_ACTTERCEW < 05) || ($_ACTTERCEW > 90)) {
            $_CONVENIOTERCEW = '';
            $_DESCRIPTARIFTERW = '';
            $("#convenio_con110c").val($_CONVENIOTERCEW);
            $("#conveniod_con110c").val($_DESCRIPTARIFTERW);
            _evaluarrut_con110c();
        } else {
            _evaluarconvenio_con110c();
        }
    } else if (data[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarentidad_con110c();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _evaluarconvenio_con110c() {
    validarInputs({
        form: '#CONVENIO_CON110C',
        orden: "1"
    },
        function () { _evaluarentidad_con110c(); },
        () => {
            $_CONVENIOTERCEW = $('#convenio_con110c').val();
            if ($_CONVENIOTERCEW.trim() == '') {
                $_DESCRIPTARIFTERW = '';
                $("#conveniod_con110c").val($_DESCRIPTARIFTERW);
                _ventanaconveniored_CON110C();
            } else {
                let datos_envio = datosEnvio();
                datos_envio += '|'
                datos_envio += $_CONVENIOTERCEW;
                SolicitarDll({ datosh: datos_envio }, _dataCON110C_08_110C, get_url('/APP/CONTAB/CON110C_08.DLL'));
            }
        }
    )
}


function _dataCON110C_08_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPTARIFTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#conveniod_con110c").val($_DESCRIPTARIFTERW);
        _ventanaconveniored_CON110C();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarconvenio_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _ventanaconveniored_CON110C() {
    var ventanaconvred = bootbox.dialog({
        size: 'medium',
        title: 'CONVENIO RED EXTERNA',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +

            '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
            '<div class="inline-inputs">' +
            '<label class="col-md-3 col-sm-6 col-xs-6 control-label" for="name">' + "CONV RED:" + '</label> ' +
            '<div class="col-md-2 col-sm-6 col-xs-6" id="CONVRED_CON110C"> ' +
            '<input id="red_110c" class="form-control input-md" data-orden="1" maxlength="2" > ' +
            '</div> ' +
            '<button type="button" id="redBtn_110c class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="descripred_110c" class="form-control input-md"> ' +
            '</div> ' +
            '</div>' +
            '</div> ' +

            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanaconvred.off('show.bs.modal');
                    setTimeout(() => { _evaluarrut_con110c() }, 300)
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanaconvred.off('show.bs.modal');
                    setTimeout(() => { _evaluarconvenio_con110c() }, 300)
                }
            }
        }
    });
    ventanaconvred.init($('.modal-footer').hide());
    ventanaconvred.init(_evaluarredexterna_con110c());
    ventanaconvred.on('shown.bs.modal', function () {
        $("#red_110c").focus();
    });
    ventanaconvred.init(_toggleF8([{
        input: 'red',
        app: '110c',
        funct: _f8conveniored_CON110C
    },]));
}
function _evaluarredexterna_con110c() {
    _inputControl("disabled");
    $("#red_110c").val($_CONVREDW);
    $("#descripred_110c").val($_DESCRIPCONVREDW);
    validarInputs({
        form: "#CONVRED_CON110C",
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            $_CONVREDW = $("#red_110c").val().toUpperCase(); $("#red_110c").val($_CONVREDW)
            if ($_CONVREDW.trim() == '') {
                $_CONVREDW = '';
                $_DESCRIPCONVREDW = '';
                $("#red_110c").val($_CONVREDW);
                $("#descripred_110c").val($_DESCRIPCONVREDW);
                $('.btn-primary').click();
            } else {
                console.log($_CONVREDW)
                let datos_envio = datosEnvio();
                datos_envio += '|'
                datos_envio += $_CONVREDW;
                SolicitarDll({ datosh: datos_envio }, data => {
                    console.log(data)
                    var date = data.split('|');
                    var swinvalid = date[0].trim();
                    $_DESCRIPTARIFTERW = date[1].trim();
                    if (swinvalid == '00') {
                        $("#descripred_110c").val($_DESCRIPTARIFTERW);
                        $('.btn-primary').click();
                    } else if (swinvalid == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _evaluarredexterna_con110c();
                    } else {
                        CON852(date[0], date[1], date[2], _toggleNav);
                    }
                }, get_url('/APP/CONTAB/CON110C_08.DLL'));
            }
        }
    )
}

function _evaluarrut_con110c() {
    validarInputs({
        form: '#RUT_110C',
        orden: "1"
    },
        _evaluarentidad_con110c,
        () => {
            $_RUTTERCEW = $('#rut_110c').val();
            if ($_RUTTERCEW.trim() == '') {
                $_RUTTERCEW = 'N';
                $('#rut_110c').val($_RUTTERCEW);
                if ($_TIPOEMPRESAUSU == "H") {
                    _evaluarcomercial_con110c();
                } else {
                    _evaluarfactorvent_con110c();
                }
            } else if (($_RUTTERCEW == 'N') || ($_RUTTERCEW == 'S')) {
                if ($_TIPOEMPRESAUSU == "H") {
                    _evaluarcomercial_con110c();
                } else {
                    _evaluarfactorvent_con110c();
                }
            } else {
                _evaluarrut_con110c();
            }
        }
    )
}

function _evaluarcomercial_con110c() {
    validarInputs({
        form: '#NOMCOM_CON110C',
        orden: "1"
    },
        _evaluarrut_con110c,
        () => {
            $_NOMCOMERTERCEW = $('#nomcom_con110c').val();
            _evaluarotrosdatos_con110c();
        }
    )
}

function _evaluarotrosdatos_con110c() {

    validarInputs({
        form: '#DATOS_CON110C',
        orden: "1"
    },
        _evaluarcomercial_con110c,
        () => {
            $_OTROSTERCEW = $('#datos_con110c').val();
            _evaluarcontacto_con110c();
        }
    )
}

function _evaluarcontacto_con110c() {
    validarInputs({
        form: '#CONTACT_CON110C',
        orden: "1"
    },
        _evaluarotrosdatos_con110c,
        () => {
            $_CONTACTTERCEW = $('#contact_con110c').val();
            _evaluarcontrato_con110c()
        }
    )
}

function _evaluarcontrato_con110c() {
    validarInputs({
        form: '#CONTRATO_CON110C',
        orden: "1"
    },
        _evaluarcontacto_con110c,
        () => {
            $_CONTRATER = $('#contrato_con110c').val();
            _evaluarweb_con110c();
        }
    )
}
function _evaluarweb_con110c() {
    validarInputs({
        form: '#WEB_CON110C',
        orden: "1"
    },
        _evaluarcontacto_con110c,
        () => {
            $_WEBTERCEW = $('#web_con110c').val();
            _evaluarcargocontac_con110c();
        }
    )
}

function _evaluarcargocontac_con110c() {
    validarInputs({
        form: '#CARGO_CON110C',
        orden: "1"
    },
        _evaluarweb_con110c,
        () => {
            $_CARGOTERCEW = $('#cargo_con110c').val();
            _evaluaremail_con110c();
        }
    )
}

function _evaluaremail_con110c() {
    $('#tabla1').click();
    validarInputs({
        form: '#EMAIL_CON110C',
        orden: "1"
    },
        _evaluarcargocontac_con110c,
        () => {
            $_EMAILTERCEW = $('#email_con110c').val();
            if ($_EMAILTERCEW.trim() == '') {
                CON851('2K', '2K', _evaluarasesor_con110c(), 'warning', 'Advertencia')
            } else {
                var correo2 = $_EMAILTERCEW.indexOf("@")
                if (correo2 < 1) {
                    CON851('2K', '2K', _evaluaremail_con110c(), 'error', 'error');
                } else {
                    _evaluarasesor_con110c();
                }
            }
        }
    )
}


function _evaluarasesor_con110c() {
    validarInputs({
        form: '#ASESOR_CON110C',
        orden: "1"
    },
        _evaluaremail_con110c,
        () => {
            $_ASESORTERCEW = $('#asesor_con110c').val();
            _evaluartipo_con110c();
        }
    )
}

function _evaluartipo_con110c() {
    validarInputs({
        form: '#CUPO_CON110C',
        orden: "1"
    },
        _evaluarasesor_con110c,
        () => {
            $_TIPOCUPOTERCEW = $('#cupo_con110c').val();
            if ($_NOVEDADCON110C == '7') {
                $('#factventas_con110c').val(1);
            }
            _evaluaremailelectronica_con110c();
        }
    )
}
function _evaluaremailelectronica_con110c() {
    validarInputs({
        form: '#EMAILELECT_CON110C',
        orden: "1"
    },
        _evaluarcargocontac_con110c,
        () => {
            $_EMAILELECTTER = $('#emailelect_con110c').val();
            if ($_EMAILELECTTER.trim() == '') {
                if ($_EMAILTERCEW.trim() == '') {
                    CON851('2K', '2K', _evaluarfactorvent_con110c(), 'error', 'error');
                } else {
                    $_EMAILELECTTER = $_EMAILTERCEW
                    $('#emailelect_con110c').val($_EMAILELECTTER);
                    _evaluarfactorvent_con110c();
                }
            } else {
                var correoele = $_EMAILELECTTER.indexOf("@")
                if (correoele < 1) {
                    CON851('2K', '2K', _evaluaremailelectronica_con110c(), 'error', 'error');
                } else {
                    _evaluarfactorvent_con110c();
                }
            }
        }
    )
}

///////////////////////// SEGUNDA PAGINA ///////////////////////

function _evaluarfactorvent_con110c() {
    $('#tabla2').click();
    _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para Grabar' }] })
    validarInputs({
        form: '#FACTVENTAS_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    }, () => {
        _FloatText({ estado: 'off' })
        _evaluaremail_con110c()
    },
        () => {
            $_FACTORTERCEW = factventas_110cMask.unmaskedValue;
            if ((($_ACTTERCEW == '20') || ($_ACTTERCEW == '21')) && ($_FACTORTERCEW < '1')) {
                CON851('34', '34', null, 'error', 'error');
                _evaluarfactorvent_con110c();
            } else {
                _FloatText({ estado: 'off' })
                _evaluarcuposmvm_con110c();
            }
        }
    )
}

function _evaluarcuposmvm_con110c() {
    validarInputs({
        form: '#SMVM_CON110C',
        orden: "1"
    },
        _evaluarfactorvent_con110c,
        () => {
            $_CUPOTERCEW = $('#smvm_con110c').val();
            if (($_CUOTASUSU == '2') && ($_ACTTERCEW == '01') && ($_CUPOTERCEW == '0')) {
                CON851('02', '02', null, 'error', 'error');
                _evaluarcuposmvm_con110c();
            } else {
                $_CUPOASIGW = $_CUPOTERCEW * $_SALMINUSU;
                $("#smvmd_con110c").val($_CUPOASIGW);
                if ($_TIPOEMPRESAUSU == 'H') {
                    if ($_RETENEDORUSU == 'S') {
                        _datopago_con110c();
                    } else {
                        _evaluarplazo_con110c();
                    }
                } else {
                    _evaluarvendedor_con110c();
                }
            }
        }
    )
}


function _evaluarvendedor_con110c() {
    validarInputs({
        form: '#VENDEDOR_CON110C',
        orden: "1"
    },
        _evaluarcuposmvm_con110c,
        () => {
            if ($_CARTERAUSU != 'S') {
                $_VENDTERCEW = '';
                $("#vendedor_con110").val($_VENDTERCEW);
                _mostrarvendedro_con110c();
            } else {
                $_VENDTERCEW = $('#vendedor_con110').val();
                if ($_VENDTERCEW == '00000') {
                    $_VENDTERCEW = '00000';
                    $_DESCRIPVENDTERW = ''
                    $("#vendedor_con110").val($_VENDTERCEW);
                    $("#descripvendedor_con110c").val($_DESCRIPVENDTERW);
                    _datopago_con110c();
                } else {
                    _validacionesfpago_con110c();
                }
            }
        }
    )
}

function _mostrarvendedro_con110c() {
    if ($_VENDTERCEW.trim() == '') {
        if (($_CUOTASUSU == '2') && ($_ACTTERCEW == '01') && ($_CARTERAUSU == 'S')) {
            CON851('02', '02', null, 'error', 'error');
            _datovendedor_con110c();
        } else {
            $_PAGOTERCEW = '02';
            $("#formapago_110c").val($_PAGOTERCEW);
            _evaluarplazo_con110c();
        }
    } else {
        SolicitarDll({ datosh: datosEnvio() + '|' + $_VENDTERCEW + '|' }, _dataCON110C_09_110C, get_url('/APP/CONTAB/CON110C_09.DLL'));
    }
}

function _dataCON110C_09_110C() {
    data = data.split('|');
    $_DESCRIPVENDTERW = data[1].trim();
    if (data[0].trim() == '00') {
        $("#descripvendedor_con110c").val($_DESCRIPVENDTERW);
        _datopago_con110c();
    } else if (data[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarvendedor_con110c();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _validacionesfpago_con110c() {
    if (($_CONTADOUSU == 'N') && ($_PAGOTERCEW == '01')) {
        $_PAGOTERCEW = '02';
        $("#formapago_110c").val($_PAGOTERCEW);
        _evaluarplazo_con110c();
    } else if (($_ACTTERCEW == '02') || ($_ACTTERCEW == '03') || ($_ACTTERCEW == '04') || ($_ACTTERCEW == '05') || ($_ACTTERCEW == '92')) {
        $_PAGOTERCEW = '02';
        $("#formapago_110c").val($_PAGOTERCEW);
        //    _datosvehiculo_con110c();
        _evaluarplazo_con110c();
    } else if (($_ACTTERCEW == '01') && ($_PAGOTERCEW == '00')) {
        $_PAGOTERCEW = '02';
        $("#formapago_110c").val($_PAGOTERCEW);
        _evaluarplazo_con110c();

    } else if (($_CUOTASUSU = '4') && ($_ACTTERCEW == '12')) {
        // INVOKE POW-SELF "CALLFORM" USING "CON820A" "C:\PROG\CONTAB\CON110C.DLL"
        _datopago_con110c();
    } else {
        _datopago_con110c();
    }
}

function _datopago_con110c() {
    if (($_CUOTASUSU == '4') && ($_ACTTERCEW == '12')) {
        var pago = [
            { "COD": "01", "DESCRIP": "Contado" },
            { "COD": "02", "DESCRIP": "Credito" }
        ]
        POPUP({
            array: pago,
            titulo: 'Forma de Pago',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            seleccion: $_PAGOTERCEW,
            callback_f: _evaluarcomercial_con110c
        },
            _evaluarformapago_con110c);
    } else {
        var pago = [
            { "COD": "00", "DESCRIP": "Anticipago" },
            { "COD": "01", "DESCRIP": "Contado" },
            { "COD": "02", "DESCRIP": "Credito" },
            { "COD": "03", "DESCRIP": "Ch. Posfechado" },
            { "COD": "04", "DESCRIP": "Letra" },
            { "COD": "05", "DESCRIP": "Credito US$" },
            { "COD": "06", "DESCRIP": "Empleados" },
            { "COD": "95", "DESCRIP": "Tarjeta. Credito" },
            { "COD": "96", "DESCRIP": "Tarjeta. Debito" },
            { "COD": "97", "DESCRIP": "Contado Cheque" }
        ]
        POPUP({
            array: pago,
            titulo: 'Forma de Pago',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            seleccion: $_PAGOTERCEW,
            callback_f: _evaluarcomercial_con110c
        },
            _evaluarformapago_con110c);
    }
}

function _evaluarformapago_con110c(pago) {
    $_PAGOTERCEW = pago.COD;
    switch (pago.COD) {
        case "00":
        case "01":
        case "02":
        case "03":
        case "04":
        case "05":
        case "06":
        case "95":
        case "96":
        case "97":
            if (($_CONTADOUSU == 'N') && ($_PAGOTERCEW == '01')) {
                CON851('02', '02', null, 'error', 'error');
                _validacionesfpago_con110c();
            } else {
                _evaluarplazo_con110c();
            }
            break;
        default:
            _evaluarcomercial_con110c();
            break;
    }
    $("#formapago_110c").val(pago.COD + " - " + pago.DESCRIP);
}

function _evaluarplazo_con110c() {
    validarInputs({
        form: '#PLAZO_CON110C',
        orden: "1"
    },
        _evaluarcuposmvm_con110c,
        () => {
            $_PLAZOTERCEW = plazoUnitMask_110c.unmaskedValue;
            if (($_ACTTERCEW == '02') || ($_ACTTERCEW == '03') || ($_ACTTERCEW == '04') || ($_ACTTERCEW == '05') || ($_ACTTERCEW == '92')) {
                if ($_TIPOEMPRESAUSU == 'H') {
                    _evaluarzona_con110c();
                } else {
                    _evaluargrado_con110c();
                }
            } else {
                _evaluarzona_con110c();
            }
        }
    )
}

function _evaluarzona_con110c() {
    validarInputs({
        form: '#ZONA_CON110C',
        orden: "1"
    },
        _evaluarplazo_con110c,
        () => {
            $_CODZONAW = $('#zona_110c').val();
            if (($_CODZONAW.trim() == '') || ($_CODZONAW == '00')) {
                $_ZONATERCEW = $_CODZONAW;
                $_PASOW = '9';
                _leerzonayrutas_con110c();
            } else {
                $_TIPOZONA = '1';
                $_ZONATERCEW = $_TIPOZONA + $_CODZONAW;
                SolicitarDll({ datosh: datosEnvio() + '|' + $_ZONATERCEW + '|' }, _dataCON110C_10_110C, get_url('/APP/CONTAB/CON110C_10.DLL'));
            }
        }
    )
}


function _dataCON110C_10_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPZONAW = date[1].trim();
    if (swinvalid == '00') {
        $("#zonad_110c").val($_DESCRIPZONAW);
        _evaluarrutas_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarzona_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _leerzonayrutas_con110c() {
    if ((($_ZONATERCEW.trim() == '') || ($_ZONATERCEW == '00')) || (($_RUTATERCEW.trim() == '') || ($_RUTATERCEW == '00'))) {
        if ((($_NITUSU == '0830505217') || ($_NITUSU == '0822006141')) && ($_ACTTERCEW == '01')) {
            CON851('02', '02', null, 'error', 'error');
            _evaluarzona_con110c();

        } else {
            if ($_PASOW == '9') {
                $_DESCRIPZONAW = '';
                $("#zonad_110c").val($_DESCRIPZONAW);
                _evaluarrutas_con110c();
            } else {
                $_DESCRIPRUTAW = '';
                $("#rutad_110c").val($_DESCRIPRUTAW);
                _evaluarorden_con110c();
            }
        }
    }
}
function _evaluarrutas_con110c() {
    validarInputs({
        form: '#RUTA_110C',
        orden: "1"
    },
        function () { _evaluarzona_con110c(); },
        () => {
            $_CODRUTAW = $('#ruta_110c').val();
            if (($_CODRUTAW.trim() == '') || ($_CODRUTAW == '00')) {
                $_RUTATERCEW = $_CODRUTAW;
                $_PASOW = '10';
                _leerzonayrutas_con110c();
            } else {
                $_TIPOZONA = '2';
                $_RUTATERCEW = $_TIPOZONA + $_CODRUTAW;

                let datos_envio = datosEnvio();
                datos_envio += '|'
                datos_envio += $_RUTATERCEW;
                SolicitarDll({ datosh: datos_envio }, _dataCON110C_101_110C, get_url('/APP/CONTAB/CON110C_10.DLL'));
            }
        }
    )
}

function _dataCON110C_101_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPRUTAW = date[1].trim();
    if (swinvalid == '00') {
        $("#rutad_110c").val($_DESCRIPRUTAW);
        _evaluarorden_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarrutas_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarorden_con110c() {
    validarInputs({
        form: '#ORDEN_110C',
        orden: "1"
    },
        function () { _evaluarrutas_con110c(); },
        () => {
            $_ORDENTERCEW = $('#orden_110c').val();
            if (($_NOVEDADCON110C == '8') && ($.isNumeric($_ACTIVICATERCEW))) {
                $_ACTIVICATERCEW = '000';
                $("#actica_110c").val($_ACTIVICATERCEW);
                _evaluaractica_con110c()
            } else {
                _evaluaractica_con110c();
            }
        }
    )
}

function _evaluaractica_con110c() {
    validarInputs({
        form: '#ACTICA_110C',
        orden: "1"
    },
        function () { _evaluarorden_con110c(); },
        () => {
            $_ACTIVICAW = $('#actica_110c').val();
            $_ACTIVICATERCEW = $_ACTIVICAW;
            if ($_ACTIVICATERCEW.trim() == '') {
                $_ACTIVICATERCEW = '';
                $("#actica_110c").val($_ACTIVICATERCEW);
                _evaluarporcentica_con110c();
            } else {
                if (Number.isNaN($_ACTIVICATERCEW)) {
                    // ($.isNumeric($_ACTIVICATERCEW))
                    CON851('57', '57', null, 'error', 'error');
                    _evaluaractica_con110c()
                } else {
                    _evaluarporcentica_con110c();
                }
            }
        }
    )
}


function _evaluarporcentica_con110c() {
    validarInputs({
        form: '#PORCENTICA_110C',
        orden: "1"
    },
        function () { _evaluaractica_con110c(); },
        () => {
            $_PORCICATERCEW = porcentica_110cMask.unmaskedValue;
            _evaluarporcentret_con110c();
        }
    )
}

function _evaluarporcentret_con110c() {
    validarInputs({
        form: '#PORCETRETEN_110C',
        orden: "1"
    },
        function () { _evaluarporcentica_con110c(); },
        () => {
            $_PORCRETTERCEW = porcentreten_110cMask.unmaskedValue;
            _evaluargrado_con110c();
        }
    )
}

function _evaluargrado_con110c() {
    $('#tabla2').click();
    validarInputs({
        form: '#GRDNEGOCIO_110C',
        orden: "1"
    },
        function () { _evaluarporcentica_con110c(); },
        () => {
            $_GRADOTERCEW = $('#grdnegocio_110c').val();
            if ($_NITUSU == '0800202522') {
                if ($_ACTTERCEW == '01') {
                    if (($_GRADOTERCEW == '1') || ($_GRADOTERCEW == '2') || ($_GRADOTERCEW == '3') || ($_GRADOTERCEW == '4')) {
                        ///// CONTINUE 
                        consultagradonegocio_con110c();

                    } else {
                        CON851('02', '02', null, 'error', 'error');
                        _evaluargrado_con110c();
                    }
                } else {
                    consultagradonegocio_con110c();
                }
            } else {
                if (($_GRADOTERCEW == '0') || ($_GRADOTERCEW.trim() == '')) {
                    $_GRADOTERCEW = '9';
                    $("#grdnegocio_110c").val($_GRADOTERCEW);
                    // _evaluarIVA_con110c();
                    _evaluarclasif_con110c()
                } else {
                    consultagradonegocio_con110c();
                }
            }
        }
    )
}

function consultagradonegocio_con110c() {
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_GRADOTERCEW;
    SolicitarDll({ datosh: datos_envio }, _dataCON110C_11_110C, get_url('/APP/CONTAB/CON110C_11.DLL'));
}

function _dataCON110C_11_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPGRADTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#grdnegociod_110c").val($_DESCRIPGRADTERW);
        _evaluarclasif_con110c();
    }
    else if (swinvalid == '01') {
        // $_GRADOTERCEW = '9';
        // $("#grdnegocio_110c").val($_GRADOTERCEW);
        _evaluarclasif_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _evaluarclasif_con110c() {
    validarInputs({
        form: '#CLASIFCLIEN_110C',
        orden: "1"
    },
        function () { _evaluarporcentica_con110c() },
        () => {
            $_CLASIFTERCEW = $("#clasifclien_110c").val();
            let datos_envio = datosEnvio();
            datos_envio += '|'
            datos_envio += $_CLASIFTERCEW;
            SolicitarDll({ datosh: datos_envio }, _dataCON110C_01_1_110C, get_url('/APP/CONTAB/CON110C_01_1.DLL'));
        }
    )
}

function _dataCON110C_01_1_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCLASIFTERW = date[1];
    if (swinvalid == '00') {
        $("#clasifcliend_110c").val($_DESCRIPCLASIFTERW);
        _evaluarIVA_con110c();
    }
    else if (swinvalid == '01') {
        _evaluarIVA_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarIVA_con110c() {
    var iva = [
        { "COD": "1", "DESCRIP": "Regimen Comun" },
        { "COD": "2", "DESCRIP": "Regimen Simplificado" },
        { "COD": "3", "DESCRIP": "No Responsable" },
        { "COD": "9", "DESCRIP": "No Aplica" }
    ]
    POPUP({
        array: iva,
        titulo: 'I.V.A',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_REGIVATERCEW,
        callback_f: _evaluargrado_con110c,
        teclaAlterna: true
    },
        _validariva_con110c);
}

function _validariva_con110c(iva) {
    $_REGIVATERCEW = iva.COD;
    switch (iva.COD) {
        case "1":
        case "2":
        case "3":
        case "9":
            setTimeout(_evaluarcalificacion_con110c, 300);
            break;
        default:
            _evaluargrado_con110c();
            break;
    }
    $("#iva_110c").val(iva.COD + " - " + iva.DESCRIP);
}

function _evaluarcalificacion_con110c() {
    var calificacion = [
        { "COD": "1", "DESCRIP": "Excelente" },
        { "COD": "2", "DESCRIP": "Bueno" },
        { "COD": "3", "DESCRIP": "Regular" },
        { "COD": "4", "DESCRIP": "Malo" },
        { "COD": "9", "DESCRIP": "No Aplica" }
    ]
    POPUP({
        array: calificacion,
        titulo: 'Calificacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_CALIFITERCEW,
        callback_f: _evaluargrado_con110c,
        teclaAlterna: true
    },
        _validarcalificacion_con110c);
}

function _validarcalificacion_con110c(calificacion) {
    $_CALIFITERCEW = calificacion.COD;
    switch (calificacion.COD) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "9":
            if ($_NOVEDADCON110C == '7') {
                $('#baseret_con110c').val('0');
                _evaluarcontribuyente();
                // _evaluarbaseret_con110c();
            } else {
                _evaluarcontribuyente();
                // _evaluarbaseret_con110c();
            }
            break;
        default:
            _evaluargrado_con110c();
            break;
    }
    $("#calif_110c").val(calificacion.COD + " - " + calificacion.DESCRIP);
}

function _evaluarcontribuyente() {
    validarInputs({
        form: '#CONTRIBUYENTE_103',
        orden: "1",
    },
        function () { _evaluarclasif_con110c(); },
        () => {
            $_GRANCONTRIBTERCEW = $('#contribuyente_con110c').val();
            if ($_GRANCONTRIBTERCEW.trim() == '') {
                $_GRANCONTRIBTERCEW = 'N';
                $_VLRBASERETTERCEW = '0';
                $('#baseret_con110c').val($_VLRBASERETTERCEW);
                $('#contribuyente_con110c').val($_GRANCONTRIBTERCEW);
                _evaluaragenteret_110c();
            } else if ($_GRANCONTRIBTERCEW == 'S') {
                _evaluarbaseret_con110c();
            } else if ($_GRANCONTRIBTERCEW == 'N') {
                $_VLRBASERETTERCEW = '0';
                $('#baseret_con110c').val($_VLRBASERETTERCEW);
                _evaluaragenteret_110c();
            } else {
                _evaluarcontribuyente();
            }
        }
    )
}


function _evaluarbaseret_con110c() {
    validarInputs({
        form: '#BASERET_110C',
        orden: "1",
    },
        function () { _evaluarcontribuyente(); },
        () => {
            $_VLRBASERETTERCEW = $('#baseret_con110c').val();
            _evaluaragenteret_110c();
        }
    )
}

function _evaluaragenteret_110c() {
    if ($_RETETERCEW.trim() == '') {
        $_RETETERCEW = 'N';
        $('#retenedor_con110c').val($_RETETERCEW);
    }
    validarInputs({
        form: '#RETENEDOR_110C',
        orden: "1",
    },
        _evaluarbaseret_con110c,
        () => {
            $_RETETERCEW = $('#retenedor_con110c').val();
            if ($_RETETERCEW == 'S' || $_RETETERCEW == 'N') {
                _evaluarreteivacomp_con110();
            } else {
                _evaluaragenteret_110c();
            }
        }
    )
}


function _evaluarreteivacomp_con110() {
    if ($_RETIVACOMPTERCEW.trim() == '') {
        $_RETIVACOMPTERCEW = 'N';
        $('#reteivacompra_con110c').val($_RETIVACOMPTERCEW);
    }
    validarInputs({
        form: '#RETCOMP_110C',
        orden: "1",
    },
        function () { _evaluaragenteret_110c(); },
        () => {
            $_RETIVACOMPTERCEW = $('#reteivacompra_con110c').val();
            if (($_RETIVACOMPTERCEW == 'S') || ($_RETIVACOMPTERCEW == 'N')) {
                _evaluarreteivaventa_con110();
            } else {
                _evaluarreteivacomp_con110();
            }
        }
    )
}


function _evaluarreteivaventa_con110() {
    if ($_RETIVATERCEW.trim() == '') {
        $_RETIVATERCEW = 'N';
        $('#causareteiva_con110c').val($_RETIVATERCEW);
    }
    validarInputs({
        form: '#RETVENTA_110C',
        orden: "1",
    },
        function () { _evaluaragenteret_110c(); },
        () => {
            $_RETIVATERCEW = $('#causareteiva_con110c').val();
            if (($_RETIVATERCEW == 'S') || ($_RETIVATERCEW == 'N')) {
                _evaluarexento_110c();
            } else {
                _evaluarreteivaventa_con110();
            }
        }
    )
}

function _evaluarexento_110c() {
    if ($_EXENTRETTERCEW.trim() == '') {
        $_EXENTRETTERCEW = 'N';
        $('#exento_con110c').val($_EXENTRETTERCEW);
    }
    validarInputs({
        form: '#EXENTO_110C',
        orden: "1",
    },
        function () { _evaluarreteivaventa_con110(); },
        () => {
            $_EXENTRETTERCEW = $('#exento_con110c').val();
            if (($_EXENTRETTERCEW == 'S') || ($_EXENTRETTERCEW == 'N')) {
                _evaluarcobroseg_110c();
            } else {
                _evaluarexento_110c();
            }
        }
    )
}

function _evaluarcobroseg_110c() {
    if ($_SEGUROTERCEW.trim() == '') {
        $_SEGUROTERCEW = 'N';
        $('#cobroseg_con110c').val($_SEGUROTERCEW);
    }
    validarInputs({
        form: '#COBROSEG_110C',
        orden: "1",
    },
        function () { _evaluarexento_110c(); },
        () => {
            $_SEGUROTERCEW = $('#cobroseg_con110c').val();
            if (($_SEGUROTERCEW == 'S') || ($_SEGUROTERCEW == 'N')) {
                _evaluardatacredito_110c();
            } else {
                _evaluarcobroseg_110c();
            }
        }
    )
}

function _evaluardatacredito_110c() {
    if ($_DATACRETERCEW.trim() == '') {
        $_DATACRETERCEW = 'N';
        $('#datacredito_con110c').val($_DATACRETERCEW);
    }
    validarInputs({
        form: '#DATACREDIT_110C',
        orden: "1",
    },
        function () { _evaluarexento_110c(); },
        () => {
            $_DATACRETERCEW = $('#datacredito_con110c').val();
            if (($_DATACRETERCEW == 'S') || ($_DATACRETERCEW == 'N')) {
                _evaluaracuerdopag_110c();
            } else {
                _evaluardatacredito_110c();
            }
        }
    )
}

function _evaluaracuerdopag_110c() {
    if ($_ACUEPAGOTERCEW.trim() == '') {
        $_ACUEPAGOTERCEW = 'N';
        $('#acuerdopago_con110c').val($_ACUEPAGOTERCEW);
    }
    validarInputs({
        form: '#ACUERDO_110C',
        orden: "1",
    },
        function () { _evaluardatacredito_110c(); },
        () => {
            $_ACUEPAGOTERCEW = $('#acuerdopago_con110c').val();
            if (($_ACUEPAGOTERCEW == 'S') || ($_ACUEPAGOTERCEW == 'N')) {
                _evaluarcapitado_110c();
            } else {
                _evaluaracuerdopag_110c();
            }
        }
    )
}


function _evaluarcapitado_110c() {
    if ($_CAPITADOTERCEW.trim() == '') {
        $_CAPITADOTERCEW = 'N';
        $('#capitado_con110c').val($_CAPITADOTERCEW);
    }
    validarInputs({
        form: '#CAPITADO_110C',
        orden: "1",
    },
        function () { _evaluaracuerdopag_110c(); },
        () => {
            $_CAPITADOTERCEW = $('#capitado_con110c').val();
            if (($_CAPITADOTERCEW == 'S') || ($_CAPITADOTERCEW == 'N')) {
                _evaluarnitcli_110c();
            } else {
                _evaluarcapitado_110c();
            }
        }
    )
}

function _evaluarnitcli_110c() {
    if ($_NITCLITERCEW.trim() == '') {
        $_NITCLITERCEW = 'N';
        $('#nitcliente_con110c').val($_NITCLITERCEW);
    }
    validarInputs({
        form: '#NITCLIEN_110C',
        orden: "1",
    },
        function () { _evaluaracuerdopag_110c(); },
        () => {
            $_NITCLITERCEW = $('#nitcliente_con110c').val();
            if (($_NITCLITERCEW == 'S') || ($_NITCLITERCEW == 'N')) {
                _evaluarcausaret_110c();
            } else {
                _evaluarcapitado_110c();
            }
        }
    )
}


function _evaluarcausaret_110c() {
    if ($_RETICAVTERCEW.trim() == '') {
        $_RETICAVTERCEW = 'N';
        $('#icav_con110c').val($_RETICAVTERCEW);
    }
    validarInputs({
        form: '#RETIVA_110C',
        orden: "1",
    },
        function () { _evaluarnitcli_110c(); },
        () => {
            $_RETICAVTERCEW = $('#icav_con110c').val();
            if (($_RETICAVTERCEW == 'S') || ($_RETICAVTERCEW == 'N')) {
                _evaluarbloqvende_110c();
            } else {
                _evaluarcapitado_110c();
            }
        }
    )
}

function _evaluarbloqvende_110c() {
    if ($_BLOQTERCEW.trim() == '') {
        $_BLOQTERCEW = 'N';
        $('#bloquearvend_con110c').val($_BLOQTERCEW);
    }
    validarInputs({
        form: '#BLOQVEN_110C',
        orden: "1",
    },
        function () { _evaluarcausaret_110c(); },
        () => {
            $_BLOQTERCEW = $('#bloquearvend_con110c').val();
            if (($_BLOQTERCEW == 'S') || ($_BLOQTERCEW == 'N')) {
                _evaluarexcluiriva_110c();
            } else {
                _evaluarbloqvende_110c();
            }
        }
    )
}

function _evaluarexcluiriva_110c() {
    if ($_EXIVATERCEW.trim() == '') {
        $_EXIVATERCEW = 'N';
        $('#excluiriva_con110c').val($_EXIVATERCEW);
    }
    validarInputs({
        form: '#EXCLUIRIVA_110C',
        orden: "1",
    },
        function () { _evaluarbloqvende_110c(); },
        () => {
            $_EXIVATERCEW = $('#excluiriva_con110c').val();
            if (($_EXIVATERCEW == 'S') || ($_EXIVATERCEW == 'N')) {
                _evaluarnombreref1_con110c();
            } else {
                _evaluarexcluiriva_110c();
            }
        }
    )
}

function _evaluarnombreref1_con110c() {
    $('#tabla3').click();
    _FloatText({ estado: 'on', msg: [{ mensaje: 'Oprima F3 para Grabar' }] })
    validarInputs({
        form: '#NOMBRE1REF_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () {
            _FloatText({ estado: 'off' })
            _evaluargrado_con110c();
        },
        () => {
            $_NOMREF1TERCEW = $('#nombreref1_110c').val();
            _evaluardirecciref1_con110c()
        }

    )
}

function _evaluardirecciref1_con110c() {
    validarInputs({
        form: '#DIRREF1_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluarnombreref1_con110c(); },
        () => {
            $_DIRREF1TERCEW = $('#dirref1_110c').val();
            _evaluartelref1_con110c()
        }

    )
}

function _evaluartelref1_con110c() {
    validarInputs({
        form: '#TELREF1_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },

    },
        function () { _evaluardirecciref1_con110c(); },
        () => {
            $_TELREF1TERCEW = $('#telref1_110c').val();
            _evaluarrelaref1_con110c()
        }

    )
}

function _evaluarrelaref1_con110c() {
    validarInputs({
        form: '#RELACIONREF1_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluartelref1_con110c(); },
        () => {
            $_RELREF1TERCEW = $('#relacionref1_110c').val();
            _evaluarnombreref2_con110c()
        }

    )
}

function _evaluarnombreref2_con110c() {
    validarInputs({
        form: '#NOMBRE2REF_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluarrelaref1_con110c(); },
        () => {
            $_NOMREF2TERCEW = $('#nombreref2_110c').val();
            _evaluardirecciref2_con110c()
        }
    )
}
function _evaluardirecciref2_con110c() {
    validarInputs({
        form: '#DIRREF2_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluarnombreref2_con110c(); },
        () => {
            $_DIRREF2TERCEW = $('#dirref2_110c').val();
            _evaluartelref2_con110c()
        }
    )
}
function _evaluartelref2_con110c() {
    validarInputs({
        form: '#TELREF2_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluardirecciref2_con110c(); },
        () => {
            $_TELREF2TERCEW = $('#telref2_110c').val();
            _evaluarrelaref2_con110c()
        }
    )
}
function _evaluarrelaref2_con110c() {
    validarInputs({
        form: '#RELACIONREF2_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluartelref2_con110c(); },
        () => {
            $_RELREF2TERCEW = $('#relacionref2_110c').val();
            _evaluarnombreref3_con110c()
        }
    )
}
function _evaluarnombreref3_con110c() {
    validarInputs({
        form: '#NOMBRE3REF_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluarrelaref2_con110c(); },
        () => {
            $_NOMREF3TERCEW = $('#nombreref3_110c').val();
            _evaluardirecciref3_con110c()
        }
    )
}
function _evaluardirecciref3_con110c() {
    validarInputs({
        form: '#DIRREF3_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluarnombreref3_con110c(); },
        () => {
            $_DIRREF3TERCEW = $('#dirref3_110c').val();
            _evaluartelref3_con110c()
        }
    )
}
function _evaluartelref3_con110c() {
    validarInputs({
        form: '#TELREF3_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluardirecciref3_con110c(); },
        () => {
            $_TELREF3TERCEW = $('#telref3_110c').val();
            _evaluarrelaref3_con110c()
        }
    )
}
function _evaluarrelaref3_con110c() {
    validarInputs({
        form: '#RELACIONREF3_CON110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluartelref3_con110c(); },
        () => {
            $_RELREF3TERCEW = $('#relacionref3_110c').val();
            _evaluarempleador_con110c()
        }
    )
}

function _evaluarempleador_con110c() {
    validarInputs({
        form: '#EMPLEADOR_110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluarrelaref3_con110c(); },
        () => {
            $_NOMTRABTERCEW = $('#empleador_110c').val();
            _evaluardirempleador_con110c()
        }

    )
}
function _evaluardirempleador_con110c() {
    validarInputs({
        form: '#DIRECEMPLEADOR_110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluarempleador_con110c(); },
        () => {
            $_DIRTRABTERCEW = $('#direc_110c').val();
            _evaluartelempleador_con110c()
        }
    )
}

function _evaluartelempleador_con110c() {
    validarInputs({
        form: '#TELEMPLEADOR_110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluardirempleador_con110c(); },
        () => {
            $_TELTRABTERCEW = $('#telempleador_110c').val();
            _evaluarcargoempleador_con110c()
        }
    )
}
function _evaluarcargoempleador_con110c() {
    validarInputs({
        form: '#CARGOEMPLEADOR_110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluartelempleador_con110c(); },
        () => {
            $_CARTRABTERCEW = $('#cargoempleador_110c').val();
            _evaluarsueldoempleador_con110c()
        }
    )
}
function _evaluarsueldoempleador_con110c() {
    validarInputs({
        form: '#SUELDOEMPLEADOR_110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },

    },
        function () { _evaluarcargoempleador_con110c(); },
        () => {
            $_SUETRABTERCEW = $('#sueldoempleador_110c').val();
            _evaluarantigempleador_con110c()
        }

    )
}
function _evaluarantigempleador_con110c() {
    $('#imprimir_con110c').show()
    validarInputs({
        form: '#ANTIGEMPLEADOR_110C',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },
    },
        function () { _evaluarsueldoempleador_con110c(); },
        () => {
            $_ANTTRABTERCEW = $('#antigempleador_110c').val();
            _evaluaranonacempl_con110c()
        }
    )
}


function _evaluaranonacempl_con110c() {
  validarInputs(
    {
      form: "#ANONACIM_CON110C",
      orden: "1",
    },
    () => {
      _evaluarantigempleador_con110c();
    },
    () => {
      $_ANONACEMPL = $("#anonac_con110c").val().padStart(4, "0");
      if (parseInt($_ANONACEMPL === 0)) {
          $_ANONACEMPL = "0000";
          $("#anonac_con110c").val($_ANONACEMPL);
          _evaluarmesnacempl_con110c();
      } else if ($_ANONACEMPL > $_ANOACTUALW || parseInt($_ANONACEMPL) < 1900) {
        CON851("2D", "2D", null, "error", "error");
        _evaluaranonacempl_con110c();
      } else if ($.isNumeric($_ANONACEMPL)) {
        _evaluarmesnacempl_con110c();
      } else {
        _evaluaranonacempl_con110c();
      }
    }
  );
}

function _evaluarmesnacempl_con110c() {
    validarInputs({
        form: "#MESNACIM_CON110C",
        orden: "1"
    },
        () => { _evaluaranonacempl_con110c(); },
        () => {
            $_MESNACEMPL = $('#mesnac_con110c').val().padStart(2, "0");
            if (($_MESNACEMPL.trim() == '') || (parseInt($_MESNACEMPL) == 0)) {
                _evaluardianacempl_7767();
            } else if ((parseInt($_MESNACEMPL) < 1) || (parseInt($_MESNACEMPL) > 12)) {
                CON851('2D', '2D', null, 'error', 'error');
                _evaluarmesnacempl_con110c();
            } else if ($.isNumeric($_MESNACEMPL)) {
                _evaluardianacempl_7767();
            } else {
                _evaluarmesnacempl_con110c();
            }
        }
    )
}

function _evaluardianacempl_7767() {
  validarInputs(
    {
      form: "#DIANACIM_CON110C",
      orden: "1",
    },
    () => {
      _evaluarmesnacempl_con110c();
    },
    () => {
      $_DIANACEMPL = $("#dianac_con110c").val().padStart(2, "0");
      if ($_TIPOIDTERCEW == "PE" && !_validarFecha($_ANONACEMPL, $_MESNACEMPL, $_DIANACEMPL)) {
        CON851("03", "03", null, "warning", "");
        _evaluaranonacempl_con110c();
      } else {
        if ($_DIANACEMPL.trim() == "" || parseInt($_DIANACEMPL) == 0) {
          $_DIANACEMPL = "00";
          _evaluarembargosempl_con110c();
        } else if (parseInt($_DIANACEMPL) < 1 || parseInt($_DIANACEMPL) > 31) {
          CON851("2D", "2D", null, "error", "error");
          _evaluardianacempl_7767();
        } else if ($.isNumeric($_DIANACEMPL)) {
          _evaluarembargosempl_con110c();
        } else {
          _evaluardianacempl_7767();
        }
      }
    }
  );
}

function _evaluarembargosempl_con110c() {
    validarInputs({
        form: '#EMBARGOS_CON110C',
        orden: "1"
    },
        function () { _evaluardianacempl_7767(); },
        () => {
            $_EMBARGOTERCEW = $('#embargos_con110c').val();
            if (($_NITUSU == '0800224972') || ($_NITUSU == '0900165076') || ($_NITUSU == '0830138486')) {
                _evaluarcedulasempl_con110c()
            } else {
                if ($_TIPOEMPRESAUSU == 'H') {
                    _ubicargrabar_con110c();
                } else {
                    ultimapestaña_con110c();
                }
            }
        }
    )
}

function _evaluarcedulasempl_con110c() {
    validarInputs({
        form: 'CELMPLEADOR_CON110C',
        orden: "1"
    },
        function () { _evaluarembargosempl_con110c(); },
        () => {
            $_CIUEXPTERCEW = $('#celempleador_con110c').val();
            _evaluarentidadempl_con110c()
        }
    )
}

function _evaluarentidadempl_con110c() {
    validarInputs({
        form: '#ENTIDADAFIL_CON110C',
        orden: "1"
    },
        function () { _evaluarembargosempl_con110c(); },
        () => {
            $_ENTIDAFITERCEW = $('#entidadafil_con110c').val();

            ///// PENDIENTE DLL CON110C_11 REFERENTE A LA CONSULTA DEL CON802D
            _evaluarfechaafil_con110c();
        }
    )
}

function _evaluarfechaafil_con110c() {
    validarInputs({
        form: '#FECHAAFIL_CON110C',
        orden: "1"
    },
        function () { _evaluarembargosempl_con110c(); },
        () => {
            $_FECHAAFILTERCEW = $('#fechaafil_con110c').val();
            ultimapestaña_con110c()
        }
    )
}
///////////////////////////// TABLA PESTAÑA 4 ////////////////////////////////
function ultimapestaña_con110c() {
    $('#tabla4').click();
    if ($_NOVEDADCON110C == '7') {
        _evaluardirectabla_con110c();
    } else {
        _validaciontabla_con110c();
    }
}

function _evaluardirectabla_con110c() {
    $('#imprimir_con110c').show()
    validarInputs({
        form: '#DIRESUCU_CON103',
        orden: "1",
        event_f3: () => { _ubicargrabar_con110c(); },

    },
        function () { _evaluarnombreref1_con110c(); },
        _validardirecciontabla
    )
}
function _validardirecciontabla() {
    $('#imprimir_con110c').hide()
    $_DIRECCIONTABLA = $("#diresucu_con110c").val();

    _evaluarteltabla_con110c();
}
function _evaluarteltabla_con110c() {
    validarInputs({
        form: '#TELSUCU_CON110C',
        orden: "1"
    },
        function () { _evaluardirectabla_con110c(); },
        _validarteltabla
    )
}
function _validarteltabla() {
    $_TELTABLA = $("#telsucu_con110c").val();
    _evaluarciudadtabla_con110c();
}
function _evaluarciudadtabla_con110c() {
    validarInputs({
        form: '#CIUDADSUCU_CON110C',
        orden: "1"
    },
        function () { _evaluarteltabla_con110c(); },
        _validarciudadtabla
    )
}
function _validarciudadtabla() {
    $_CIUDADTABLA = $("#ciudadsucu_con110c").val();
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_CIUDADTABLA;
    SolicitarDll({ datosh: datos_envio }, _dataCON110C_05_01_110C, get_url('/APP/CONTAB/CON110C_05.DLL'));
}

function _dataCON110C_05_01_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == '00') {
        _evaluarbarriotabla_con110c()
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarciudadtabla_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _evaluarbarriotabla_con110c() {
    validarInputs({
        form: '#BARRIOSUCU_CON110C',
        orden: "1"
    },
        function () { _evaluarciudadtabla_con110c(); },
        _validarbarriotabla
    )
}
function _validarbarriotabla() {
    $_BARRIOTABLA = $("#barriosucu_110c").val();
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_BARRIOTABLA.padStart(8, '0');

    SolicitarDll({ datosh: datos_envio }, _dataCON110C_13_110C, get_url('/APP/CONTAB/CON110C_13.DLL'));
}

function _dataCON110C_13_110C(data) {

    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == '00') {
        if ($_NOVEDADCON110C == '7') {
            agregarFilaTabla_con110c();
        } else {
            editarfilatabla_con110c();
        }
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        $_BARRIOTABLA = '00000000'
        $('#barriosucu_110c').val($_BARRIOTABLA);
        if ($_NOVEDADCON110C == 7) {
            agregarFilaTabla_con110c();
        } else {
            editarfilatabla_con110c();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function editarfilatabla_con110c() {
    var tamañotabla = $('#TABLADIRECCION_CON110C tbody tr').length;
    let nfila = parseInt($_Nfila) - 1;
    // console.debug($_Nfila);
    var cambiar = $('#item_con110c').val();
    cambiar = parseInt(cambiar);
    let fila = $('#TABLADIRECCION_CON110C tbody tr:eq(' + nfila + ')');
    let html = '<td>' + $('#item_con110c').val() +
        '</td><td>' + $('#diresucu_con110c').val() +
        '</td><td>' + $('#telsucu_con110c').val() +
        '</td><td>' + $('#ciudadsucu_con110c').val() +
        '</td><td>' + $('#barriosucu_110c').val() +
        '</td>';
    fila.html(html);
    $('#imprimir_con110c').show()
    _validaciontabla_con110c();
}

function agregarFilaTabla_con110c() {

    $('#TABLADIRECCION_CON110C tbody').append(
        '<tr>' +
        '<td>' + $('#diresucu_con110c').val() + '</td>' +
        '<td>' + $('#telsucu_con110c').val() + '</td>' +
        '<td>' + $('#ciudadsucu_con110c').val() + '</td>' +
        '<td>' + $('#barriosucu_110c').val() + '</td>' +
        '</tr>'
    );

    _validaciontabla_con110c();
}

function _validaciontabla_con110c(orden) {
    // $('#imprimir_con110c').show()
    validarTabla(
        {
            tabla: '#TABLADIRECCION_CON110C',
            orden: orden,
            event_f3: _ubicargrabar_con110c
        },
        _direcciones,
        function () {
            _evaluarnombreref1_con110c()
        },
        _ubicargrabar_con110c

    );
}

function _direcciones(datos) {
    // tabla110C = datos;
    // console.log(tabla110C, 'datos tabla')
    $_Nfila = tabla2.rowIndex;
    $('#item_con110c').val(datos.cells[0].textContent);
    $('#diresucu_con110c').val(datos.cells[1].textContent);
    $('#telsucu_con110c').val(datos.cells[2].textContent);
    $('#ciudadsucu_con110c').val(datos.cells[3].textContent);
    $('#barriosucu_110c').val(datos.cells[4].textContent);
    let a = {
        'item': datos.cells[0].textContent,
        'direccion': datos.cells[1].textContent,
        'telefono': datos.cells[2].textContent,
        'ciudad': datos.cells[3].textContent,
        'barrio': datos.cells[4].textContent
    }
    CON110C.tabla110C.push(a);

    if ($_NOVEDADCON110C == '7') {
        _limpiarcampos_con110c();
        _evaluardirectabla_con110c();
    } else {
        _evaluardirectabla_con110c();
    }
}
function _limpiarcampos_con110c() {

    $('#diresucu_con110c').val('');
    $('#telsucu_con110c').val('');
    $('#ciudadsucu_con110c').val('');
    $('#barriosucu_110c').val('');
}


///////////////////////////// GRABAR DATOS ///////////////////////////////
function _ubicargrabar_con110c() {
    _FloatText({ estado: 'off' })
    console.log('ubicar grabar')
    if ($_TIPOEMPRESAUSU == 'H') {
        CON851P('01', _evaluarfactorvent_con110c, _grabasalud_SER110C)
    } else {
        CON851P('01', _evaluarfactorvent_con110c, _tabladiretxt)
    }

}

function _tabladiretxt() {
    console.log('tabla txt')
    let fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    let nombretxt = $_ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20) + '.txt';
    CON110C['NOMBRETABLA'] = nombretxt;
    let datosEnvio = {
        nombre_archivo: CON110C.NOMBRETABLA,
        tabla: CON110C.tabla110C,
    };
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('app/Inc/_datostablas_SAL71G.php')
    }).done(function (data) {
        if (data == '00') {
            // let mensaje = '01';
            if ($_NOVEDADCON110C == '9') {
                _eliminarregistro_con110c();
            }
            else {
                _grabardatos_con110c();
            }
        } else {
            console.debug('problemas para crear el txt');
        }
    });
}
function _grabasalud_SER110C() {
    if ($_NOVEDADCON110C == '9') {
        _eliminarregistro_con110c();
    }
    else {
        _grabardatos_con110c();
    }
}
////////////////////GRABAR REGISTRO///////////////////////
function _grabardatos_con110c() {

    if ($_NOVEDADCON110C == '8') {
        $_FECHAMODTERCEW = moment().format('YYMMDD');
        $_ADMINMODTERCEW = $_ADMINW;

    } else {
        $_FECHACRETERCEW = moment().format('YYMMDD');
        $_ADMINCRETERCEW = $_ADMINW;
        $_FECHAMODTERCEW = ' ';
        $_ADMINMODTERCEW = ' ';
    }
    $_FECHANACTERCEW = $_ANONACEMPL.padEnd(4, '0') + $_MESNACEMPL.padEnd(2, '0') + $_DIANACEMPL.padEnd(2, '0');
    LLAMADO_DLL({
        dato: [$_NOVEDADCON110C, CON110C.CODTERCEROW.toString().padStart(10, '0'), $_DVTERCEROW, $_MESCUMPTERC, $_DIACUMPTERC, $_NOMBRECLIW, $_DIRECCTERCEW, $_CODCIUTERCEW, $_INDICTERCEW, $_TELTERCEW, $_NITTERCEW, $_TIPOIDTERCEW, $_ENTIDADTERCEW, $_ACTTERCEW, $_CONVENIOTERCEW, $_RUTTERCEW, $_NOMCOMERTERCEW,
            $_OTROSTERCEW, $_CONTACTTERCEW, $_WEBTERCEW, $_CARGOTERCEW, $_EMAILTERCEW, $_ASESORTERCEW, $_TIPOCUPOTERCEW, $_FECHACRETERCEW, $_ADMINCRETERCEW, $_FECHAMODTERCEW, $_ADMINMODTERCEW, $_FACTORTERCEW, $_CUPOTERCEW, $_VENDTERCEW, $_PAGOTERCEW, $_PLAZOTERCEW, $_CODZONAW,
            $_CODRUTAW, $_ORDENTERCEW, $_ACTIVICATERCEW, $_PORCICATERCEW, $_PORCRETTERCEW, $_GRADOTERCEW, $_CLASIFTERCEW, $_REGIVATERCEW, $_CALIFITERCEW, $_GRANCONTRIBTERCEW, $_RETETERCEW, $_VLRBASERETTERCEW, $_RETIVACOMPTERCEW, $_RETIVATERCEW, $_EXENTRETTERCEW, $_SEGUROTERCEW, $_DATACRETERCEW,
            $_ACUEPAGOTERCEW, $_CAPITADOTERCEW, $_NITCLITERCEW, $_RETICAVTERCEW, $_BLOQTERCEW, $_EXIVATERCEW, $_MARCATERCEW, $_EMPRESAVEHTERCEW, $_NROVEHTERCEW, $_PLACAVEHTERCEW, $_IDREPRETERCEW, $_NOMREPRETERCEW, $_EMAILREPTERCEW, $_IDTESORTERCEW, $_NOMTESORTERCEW, $_EMAILTESOTERCEW, $_DESCRIPTER2W,
            $_NOMREF1TERCEW, $_DIRREF1TERCEW, $_TELREF1TERCEW, $_RELREF1TERCEW, $_NOMREF2TERCEW, $_DIRREF2TERCEW, $_TELREF2TERCEW, $_RELREF2TERCEW, $_NOMREF3TERCEW, $_DIRREF3TERCEW, $_TELREF3TERCEW, $_RELREF3TERCEW, $_NOMTRABTERCEW, $_DIRTRABTERCEW, $_TELTRABTERCEW, $_CARTRABTERCEW,
            $_SUETRABTERCEW, $_ANTTRABTERCEW, $_FECHANACTERCEW, $_EMBARGOTERCEW, $_CIUEXPTERCEW, $_ENTIDAFITERCEW, $_FECHAAFILTERCEW, CON110C.NOMBRETABLA, $_TIPOEMPRESAUSU, $_CONVREDW, $_EMAILELECTTER, $_CONTRATER],
        callback: _dataCON110C_14,
        nombredll: 'CON110C_14',
        carpeta: 'CONTAB'
    });

}

function _eliminarregistro_con110c() {
    if ($_NOVEDADCON110C == '9') {
        $_FECHAMODTERCEW = moment().format('YYMMDD');
        $_ADMINMODTERCEW = $_ADMINW;
    } else {
        $_FECHACRETERCEW = moment().format('YYMMDD');
        $_ADMINCRETERCEW = $_ADMINW;
        $_FECHAMODTERCEW = ' ';
        $_ADMINMODTERCEW = ' ';
    }
    $_FECHANACTERCEW = $_ANONACEMPL.padEnd(4, '0') + $_MESNACEMPL.padEnd(2, '0') + $_DIANACEMPL.padEnd(2, '0');
    LLAMADO_DLL({
        dato: [$_NOVEDADCON110C, CON110C.CODTERCEROW.toString().padStart(10, '0'), $_DVTERCEROW, $_MESCUMPTERC, $_DIACUMPTERC, $_NOMBRECLIW, $_DIRECCTERCEW, $_CODCIUTERCEW, $_INDICTERCEW, $_TELTERCEW, $_NITTERCEW, $_TIPOIDTERCEW, $_ENTIDADTERCEW, $_ACTTERCEW, $_CONVENIOTERCEW, $_RUTTERCEW, $_NOMCOMERTERCEW,
            $_OTROSTERCEW, $_CONTACTTERCEW, $_WEBTERCEW, $_CARGOTERCEW, $_EMAILTERCEW, $_ASESORTERCEW, $_TIPOCUPOTERCEW, $_FECHACRETERCEW, $_ADMINCRETERCEW, $_FECHAMODTERCEW, $_ADMINMODTERCEW, $_FACTORTERCEW, $_CUPOTERCEW, $_VENDTERCEW, $_PAGOTERCEW, $_PLAZOTERCEW, $_CODZONAW,
            $_CODRUTAW, $_ORDENTERCEW, $_ACTIVICATERCEW, $_PORCICATERCEW, $_PORCRETTERCEW, $_GRADOTERCEW, $_CLASIFTERCEW, $_REGIVATERCEW, $_CALIFITERCEW, $_GRANCONTRIBTERCEW, $_RETETERCEW, $_VLRBASERETTERCEW, $_RETIVACOMPTERCEW, $_RETIVATERCEW, $_EXENTRETTERCEW, $_SEGUROTERCEW, $_DATACRETERCEW,
            $_ACUEPAGOTERCEW, $_CAPITADOTERCEW, $_NITCLITERCEW, $_RETICAVTERCEW, $_BLOQTERCEW, $_EXIVATERCEW, $_MARCATERCEW, $_EMPRESAVEHTERCEW, $_NROVEHTERCEW, $_PLACAVEHTERCEW, $_IDREPRETERCEW, $_NOMREPRETERCEW, $_EMAILREPTERCEW, $_IDTESORTERCEW, $_NOMTESORTERCEW, $_EMAILTESOTERCEW, $_DESCRIPTER2W,
            $_NOMREF1TERCEW, $_DIRREF1TERCEW, $_TELREF1TERCEW, $_RELREF1TERCEW, $_NOMREF2TERCEW, $_DIRREF2TERCEW, $_TELREF2TERCEW, $_RELREF2TERCEW, $_NOMREF3TERCEW, $_DIRREF3TERCEW, $_TELREF3TERCEW, $_RELREF3TERCEW, $_NOMTRABTERCEW, $_DIRTRABTERCEW, $_TELTRABTERCEW, $_CARTRABTERCEW,
            $_SUETRABTERCEW, $_ANTTRABTERCEW, $_FECHANACTERCEW, $_EMBARGOTERCEW, $_CIUEXPTERCEW, $_ENTIDAFITERCEW, $_FECHAAFILTERCEW, CON110C.NOMBRETABLA, $_TIPOEMPRESAUSU, $_CONVREDW, $_EMAILELECTTER],
        callback: _dataCON110C_14,
        nombredll: 'CON110C_14',
        carpeta: 'CONTAB'
    });
}
function _dataCON110C_14(data) {
    console.log('respuesta', data)
    var date = data.split('|');
    swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NOVEDADCON110C == '9') {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                toastr.success('Se ha guardado', 'MAESTRO TERCEROS');
                _cerrarSegundaVentana();
            } else {
                toastr.success('Se ha retirado', 'MAESTRO TERCEROS');
                _inputControl('reset');
                _toggleNav();
            };
        } else {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                toastr.success('Se ha guardado', 'MAESTRO TERCEROS');
                _cerrarSegundaVentana();
            } else {
                toastr.success('Se ha guardado', 'MAESTRO TERCEROS');
                _inputControl('reset');
                _toggleNav();
            };
        }
    }
    else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');
        let Window = BrowserWindow.getAllWindows();
        if (Window.length > 1) {
            _cerrarSegundaVentana();
        } else {
            _toggleNav();
        };
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


////////////////////////////// NOVEDAD 8 Y 9 ///////////////////////////////////
function _retirar_con110c() {
    _consultadatos_con110c();
}

function _consultadatos_con110c() {
    $_DVTERCEROW = CON110C.TERCEROS.DV.trim()
    $_FECHACUMPTERCEW = CON110C.TERCEROS.FECHA_CUMP_VEH.trim()
    $_NOMBRECLIW = CON110C.TERCEROS.DESCRIP_TER.trim()
    $_DESCRIPTER2W = CON110C.TERCEROS.DESCRIP_TER2.trim()
    $_APEL1TER2W = $_DESCRIPTER2W.substring(0, 19).trim()
    $_APEL2TER2W = $_DESCRIPTER2W.substring(20, 39).trim()
    $_NOMB1TER2W = $_DESCRIPTER2W.substring(40, 70).trim()
    $_CODCIUTERCEW = CON110C.TERCEROS.COD_CIU.trim()
    $_DESCRIPCIUTERW = CON110C.TERCEROS.NOM_CIU
    $_INDICTERCEW = CON110C.TERCEROS.INDICATIVO.trim()
    $_TELTERCEW = CON110C.TERCEROS.TELEFONO.trim()
    $_NITTERCEW = CON110C.TERCEROS.NIT.trim()
    $_TIPOIDTERCEW = CON110C.TERCEROS.TIPO_ID.trim()
    $_ENTIDADTERCEW = CON110C.TERCEROS.ENTIDAD.trim()
    $_DESCRIPENTTERW = CON110C.TERCEROS.NOM_ENTID
    $_ACTTERCEW = CON110C.TERCEROS.ACT_TER.trim()
    $_DESCRIPACTTERW = CON110C.TERCEROS.NOM_ACT
    $_CONVENIOTERCEW = CON110C.TERCEROS.CONVENIO.trim()
    $_DESCRIPTARIFTERW = CON110C.TERCEROS.DESCRIP_CONV.trim()
    $_RUTTERCEW = CON110C.TERCEROS.RUT.trim()
    $_NOMCOMERTERCEW = CON110C.TERCEROS.NOM_COMER.trim()
    $_OTROSTERCEW = CON110C.TERCEROS.REFER1.trim()
    $_CONVREDW = CON110C.TERCEROS.CONV_RED.trim()
    $_DESCRIPCONVREDW = CON110C.TERCEROS.DESCRIPCONV_RED.trim()
    $_CONTACTTERCEW = CON110C.TERCEROS.REFER2.trim()
    $_WEBTERCEW = CON110C.TERCEROS.REFER3.trim()
    $_CARGOTERCEW = CON110C.TERCEROS.CARGO.trim()
    $_EMAILTERCEW = CON110C.TERCEROS.EMAIL2.trim()
    $_EMAILELECTTER = CON110C.TERCEROS.EMAIL.trim()
    $_ASESORTERCEW = CON110C.TERCEROS.ASESOR.trim()
    $_TIPOCUPOTERCEW = CON110C.TERCEROS.TIPO_CUPO.trim()
    $_FECHACRETERCEW = CON110C.TERCEROS.FECHA_CRE.trim()
    $_ADMINCRETERCEW = CON110C.TERCEROS.ADMI_CRE.trim()
    $_FECHAMODTERCEW = CON110C.TERCEROS.FECHA_MOD.trim()
    $_ADMINMODTERCEW = CON110C.TERCEROS.ADMI_MOD.trim()
    $_FACTORTERCEW = CON110C.TERCEROS.FACTOR.trim()
    $_CUPOTERCEW = CON110C.TERCEROS.CUPO.trim()
    if ($_CUPOTERCEW.substring(0, 1) == '0') $_CUPOTERCEW = $_CUPOTERCEW.substring(0, 1).padStart(11, '0')
    $_VENDTERCEW = CON110C.TERCEROS.VENDEDEDOR.trim()
    $_PAGOTERCEW = CON110C.TERCEROS.DESCRIP_PAGO.trim()
    $_PLAZOTERCEW = CON110C.TERCEROS.PLAZO.trim()
    $_CODZONAW = CON110C.TERCEROS.ZONA.trim()
    $_DESCRIPZONAW = CON110C.TERCEROS.NOM_ZONA
    $_CODRUTAW = CON110C.TERCEROS.RUTA.trim()
    $_DESCRIPRUTAW = CON110C.TERCEROS.NOM_RUTA
    $_ORDENTERCEW = CON110C.TERCEROS.ORDEN.trim()
    $_ACTIVICATERCEW = CON110C.TERCEROS.ACTIV_ICA.trim()
    $_PORCICATERCEW = CON110C.TERCEROS.PORC_ICA.trim()
    $_PORCRETTERCEW = CON110C.TERCEROS.PORC_RET.trim()
    $_GRADOTERCEW = CON110C.TERCEROS.GRADO.trim()
    $_DESCRIPGRADTERW = CON110C.TERCEROS.NOM_GRADO
    $_REGIVATERCEW = CON110C.TERCEROS.REG_IVA.trim()
    $_CALIFITERCEW = CON110C.TERCEROS.CALIFIC.trim()
    $_GRANCONTRIBTERCEW = CON110C.TERCEROS.GRAN_CONTRIB.trim()
    $_RETETERCEW = CON110C.TERCEROS.RETENEDOR.trim()
    if ($.isNumeric($_RETETERCEW)) $_RETETERCEW = 'N'
    $_VLRBASERETTERCEW = CON110C.TERCEROS.VLR_BASERET.trim()
    $_RETIVACOMPTERCEW = CON110C.TERCEROS.RET_IVA_COMP.trim()
    $_RETIVATERCEW = CON110C.TERCEROS.RET_IVA.trim()
    $_EXENTRETTERCEW = CON110C.TERCEROS.EXENT_RET.trim()
    $_SEGUROTERCEW = CON110C.TERCEROS.SEGURO.trim()
    $_DATACRETERCEW = CON110C.TERCEROS.DATACRE.trim()
    $_ACUEPAGOTERCEW = CON110C.TERCEROS.ACUE_PAGO.trim()
    $_CAPITADOTERCEW = CON110C.TERCEROS.CAPITADO.trim()
    $_NITCLITERCEW = CON110C.TERCEROS.NIT1_CLI.trim()
    if ($.isNumeric($_NITCLITERCEW)) $_NITCLITERCEW = 'N'
    $_RETICAVTERCEW = CON110C.TERCEROS.RET_ICAV.trim()
    $_BLOQTERCEW = CON110C.TERCEROS.BLOQ.trim()
    $_EXIVATERCEW = CON110C.TERCEROS.EXIVA.trim()
    $_MARCATERCEW = CON110C.TERCEROS.MARCA_VEH.trim()
    $_EMPRESAVEHTERCEW = CON110C.TERCEROS.EMPRESA_VEH.trim()
    $_NROVEHTERCEW = CON110C.TERCEROS.NRO_VEH.trim()
    $_PLACAVEHTERCEW = CON110C.TERCEROS.PLACA_VEH.trim()
    $_IDREPRETERCEW = CON110C.TERCEROS.ID_REPR.trim()
    $_NOMREPRETERCEW = CON110C.TERCEROS.REPR_LEGAL.trim()
    $_EMAILREPTERCEW = CON110C.TERCEROS.EMAILREP.trim()
    $_IDTESORTERCEW = CON110C.TERCEROS.ID_TESOR.trim()
    $_NOMTESORTERCEW = CON110C.TERCEROS.TESORERO.trim()
    $_EMAILTESOTERCEW = CON110C.TERCEROS.EMAILTES.trim()
    $_NOMREF1TERCEW = CON110C.TERCEROS.NOM_REF1.trim()
    $_DIRREF1TERCEW = CON110C.TERCEROS.DIR_REF1.trim()
    $_TELREF1TERCEW = CON110C.TERCEROS.TEL_REF1.trim()
    $_RELREF1TERCEW = CON110C.TERCEROS.REL_REF1.trim()
    $_NOMREF2TERCEW = CON110C.TERCEROS.NOM_REF2.trim()
    $_DIRREF2TERCEW = CON110C.TERCEROS.DIR_REF2.trim()
    $_TELREF2TERCEW = CON110C.TERCEROS.TEL_REF2.trim()
    $_RELREF2TERCEW = CON110C.TERCEROS.REL_REF2.trim()
    $_NOMREF3TERCEW = CON110C.TERCEROS.NOM_REF3.trim()
    $_DIRREF3TERCEW = CON110C.TERCEROS.DIR_REF3.trim()
    $_TELREF3TERCEW = CON110C.TERCEROS.TEL_REF3.trim()
    $_RELREF3TERCEW = CON110C.TERCEROS.REL_REF3.trim()
    $_NOMTRABTERCEW = CON110C.TERCEROS.NOM_TRAB.trim()
    $_DIRTRABTERCEW = CON110C.TERCEROS.DIRTRAB_TRAB.trim()
    $_TELTRABTERCEW = CON110C.TERCEROS.TEL_TRAB.trim()
    $_CARTRABTERCEW = CON110C.TERCEROS.CAR_TRAB.trim()
    $_SUETRABTERCEW = CON110C.TERCEROS.SUE_TRAB.trim()
    $_ANTTRABTERCEW = CON110C.TERCEROS.ANT_TRAB.trim()
    $_FECHANACTERCEW = CON110C.TERCEROS.FECHA_CUMP_VEH.trim()
    $_EMBARGOTERCEW = CON110C.TERCEROS.EMBARGOS.trim()
    $_CIUEXPTERCEW = CON110C.TERCEROS.CIUD_EXP.trim()
    $_ENTIDAFITERCEW = CON110C.TERCEROS.ENTID_AFI.trim()
    $_FECHAAFILTERCEW = CON110C.TERCEROS.FECHA_AFI.trim()
    $_CLASIFTERCEW = CON110C.TERCEROS.CLASIFICACION.trim()
    $_DIRECCTERCEW = CON110C.TERCEROS.DIRREC.trim()
    $_CONTRATER = CON110C.TERCEROS.CONTRATO.trim()
    $('#contrato_con110c').val($_CONTRATER);
    $('#codclien_con110c').val(CON110C.CODTERCEROW);
    $('#dv_con110c').val($_DVTERCEROW);
    $_ANOCUMPTERC = $_FECHACUMPTERCEW.substring(0, 4);
    $_MESCUMPTERC = $_FECHACUMPTERCEW.substring(4, 6);
    $_DIACUMPTERC = $_FECHACUMPTERCEW.substring(6, 8);
    $('#anocumpl_con110').val($_ANOCUMPTERC);
    $('#mescumpl_con110').val($_MESCUMPTERC);
    $('#diacumpl_con110').val($_DIACUMPTERC);
    $('#nombres_con110c').val($_NOMBRECLIW);
    $('#direcc_con110c').val($_DIRECCTERCEW);
    $('#ciudad_con110c').val($_CODCIUTERCEW);
    $('#ciudadd_con110c').val($_DESCRIPCIUTERW);
    $('#ind_con110c').val($_INDICTERCEW);
    $_TELTERCEW = $_TELTERCEW.replace(/^0+/, '');
    $('#tel_con110c').val($_TELTERCEW);
    $('#cc_con110c').val($_NITTERCEW);
    $('#tipoident_con110c').val($_TIPOIDTERCEW);
    $('#entidad_con110c').val($_ENTIDADTERCEW);
    $('#entidadd_con110c').val($_DESCRIPENTTERW);
    $('#actividad_con110c').val($_ACTTERCEW);
    $('#actividadd_con110c').val($_DESCRIPACTTERW);
    $('#convenio_con110c').val($_CONVENIOTERCEW);
    $('#conveniod_con110c').val($_DESCRIPTARIFTERW);
    $('#rut_110c').val($_RUTTERCEW);
    $('#nomcom_con110c').val($_NOMCOMERTERCEW);
    $('#datos_con110c').val($_OTROSTERCEW);
    $('#contact_con110c').val($_CONTACTTERCEW);
    $('#web_con110c').val($_WEBTERCEW);
    $('#cargo_con110c').val($_CARGOTERCEW);
    // $('#ultfact_con110c').val();
    $('#email_con110c').val($_EMAILTERCEW);
    $('#emailelect_con110c').val($_EMAILELECTTER);
    $('#asesor_con110c').val($_ASESORTERCEW);
    $('#cupo_con110c').val($_TIPOCUPOTERCEW);
    $_ANOCRETERCEW = $_FECHACRETERCEW.substring(0, 2);
    $_MESCRETERCEW = $_FECHACRETERCEW.substring(2, 4);
    $_DIACRETERCEW = $_FECHACRETERCEW.substring(4, 6);
    $('#creado_110c').val($_ANOCRETERCEW + '/' + $_MESCRETERCEW + '/' + $_DIACRETERCEW);
    $('#creadod_110c').val($_ADMINCRETERCEW);
    $_ANOMODTERCEW = $_FECHAMODTERCEW.substring(0, 2);
    $_MESMODTERCEW = $_FECHAMODTERCEW.substring(2, 4);
    $_DIAMODTERCEW = $_FECHAMODTERCEW.substring(4, 6);
    $('#modificado_110c').val($_ANOMODTERCEW + '/' + $_MESMODTERCEW + '/' + $_DIAMODTERCEW);
    $('#modificadod_103').val($_ADMINMODTERCEW);
    factventas_110cMask.typedValue = $_FACTORTERCEW.replace(/,/g, '.');
    $('#smvm_con110c').val($_CUPOTERCEW);
    $('#vendedor_con110').val($_VENDTERCEW);
    $('#formapago_110c').val($_PAGOTERCEW);
    plazoUnitMask_110c.typedValue = $_PLAZOTERCEW;
    $_PAGOTERCEW = $_PAGOTERCEW.substring(0, 2);
    $('#zona_110c').val($_CODZONAW);
    $('#zonad_110c').val($_DESCRIPZONAW);
    $('#ruta_110c').val($_CODRUTAW);
    $('#rutad_110c').val($_DESCRIPRUTAW);
    $('#orden_110c').val($_ORDENTERCEW);
    $('#actica_110c').val($_ACTIVICATERCEW);
    porcentica_110cMask.typedValue = $_PORCICATERCEW;
    porcentreten_110cMask.typedValue = $_PORCRETTERCEW;
    $('#grdnegocio_110c').val($_GRADOTERCEW);
    $('#grdnegociod_110c').val($_DESCRIPGRADTERW);
    $('#clasifclien_110c').val($_CLASIFTERCEW);
    let iva = { '1': 'Regimen Comun', '2': 'Regimen Simplificado', '3': 'No Responsable', '9': 'No Aplica' };
    if (iva[$_REGIVATERCEW] == undefined) {
        $('#iva_110c').val('');
    } else {
        $("#iva_110c").val($_REGIVATERCEW + ' - ' + iva[$_REGIVATERCEW]);
    }
    let calificacion = { '1': 'Excelente', '2': 'Bueno', '3': 'Regular', '4': 'Malo', '9': 'No Aplica' };
    if (calificacion[$_CALIFITERCEW] == undefined) {
        $('#calif_110c').val('');
    } else {
        $("#calif_110c").val($_CALIFITERCEW + ' - ' + calificacion[$_CALIFITERCEW]);
    }
    $('#contribuyente_con110c').val($_GRANCONTRIBTERCEW);
    $('#baseret_con110c').val($_VLRBASERETTERCEW);
    $('#retenedor_con110c').val($_RETETERCEW);
    $('#reteivacompra_con110c').val($_RETIVACOMPTERCEW);
    $('#causareteiva_con110c').val($_RETIVATERCEW);
    $('#exento_con110c').val($_EXENTRETTERCEW);
    $('#cobroseg_con110c').val($_SEGUROTERCEW);
    $('#datacredito_con110c').val($_DATACRETERCEW);
    $('#acuerdopago_con110c').val($_ACUEPAGOTERCEW);
    $('#capitado_con110c').val($_CAPITADOTERCEW);
    $('#nitcliente_con110c').val($_NITCLITERCEW);
    $('#icav_con110c').val($_RETICAVTERCEW);
    $('#bloquearvend_con110c').val($_BLOQTERCEW);
    $('#excluiriva_con110c').val($_EXIVATERCEW);
    $('#marca_con110c').val($_MARCATERCEW);
    $('#empresa_con110c').val($_EMPRESAVEHTERCEW);
    $('#numero_con110c').val($_NROVEHTERCEW);
    $('#placa_con110c').val($_PLACAVEHTERCEW);
    $('#replegal_con110c').val($_IDREPRETERCEW);
    $('#nombrelegal_con110c').val($_NOMREPRETERCEW);
    $('#emailemp_con110c').val($_EMAILREPTERCEW);
    $('#tesorero_con110c').val($_IDTESORTERCEW);
    $('#nombreteso_con110c').val($_NOMTESORTERCEW);
    $('#emailteso_con110c').val($_EMAILTESOTERCEW);
    $('#nombreref1_110c').val($_NOMREF1TERCEW);
    $('#dirref1_110c').val($_DIRREF1TERCEW);
    $('#telref1_110c').val($_TELREF1TERCEW);
    $('#relacionref1_110c').val($_RELREF1TERCEW);
    $('#nombreref2_110c').val($_NOMREF2TERCEW);
    $('#dirref2_110c').val($_DIRREF2TERCEW);
    $('#telref2_110c').val($_TELREF2TERCEW);
    $('#telref2_110c').val($_RELREF2TERCEW);
    $('#nombreref3_110c').val($_NOMREF3TERCEW);
    $('#dirref3_110c').val($_DIRREF3TERCEW);
    $('#telref3_110c').val($_TELREF3TERCEW);
    $('#relacionref3_110c').val($_RELREF3TERCEW);
    $('#empleador_110c').val($_NOMTRABTERCEW);
    $('#direc_110c').val($_DIRTRABTERCEW);
    $('#telempleador_110c').val($_TELTRABTERCEW);
    $('#cargoempleador_110c').val($_CARTRABTERCEW);
    $('#sueldoempleador_110c').val($_SUETRABTERCEW);
    $('#antigempleador_110c').val($_ANTTRABTERCEW);
    $_ANONACEMPL = $_FECHANACTERCEW.substring(0, 4);
    $_MESNACEMPL = $_FECHANACTERCEW.substring(4, 6);
    $_DIANACEMPL = $_FECHANACTERCEW.substring(6, 8);
    $('#anonac_con110c').val($_ANONACEMPL);
    $('#mesnac_con110c').val($_MESNACEMPL);
    $('#dianac_con110c').val($_DIANACEMPL);
    $('#embargos_con110c').val($_EMBARGOTERCEW);
    $('#celempleador_con110c').val($_CIUEXPTERCEW);
    $('#entidadafil_con110c').val($_ENTIDAFITERCEW);
    // $('#fechaafil_con110c').val($_ANOAFILTERCEW + '/' + $_MESAFILTERCEW + '/' + $_DIAAFILTERCEW);

    // var cont = 0;
    // for (var i = 0; i < $_DIRECCI_CON110C.length; i++) {
    //     direcciontabla = $_DIRECCI_CON110C[i].DIRECCION;
    //     telefonotabla = $_DIRECCI_CON110C[i].TELEXT;
    //     ciudadtabla = $_DIRECCI_CON110C[i].CODCIU;
    //     barriotabla = $_DIRECCI_CON110C[i].BARRIOTER;
    //     var sumar = $_DIRECCI_CON110C[i].DIRECCION.trim();
    //     if (sumar.length > 1) {
    //         cont++;
    //         $('#TABLADIRECCION_CON110C tbody').append(''
    //             + '<tr>'
    //             + '<td>' + cont.toString().padStart(2, '0') + '</td>'
    //             + '<td>' + direcciontabla + '</td>'
    //             + '<td>' + telefonotabla + '</td>'
    //             + '<td>' + ciudadtabla + '</td>'
    //             + '<td>' + barriotabla + '</td>'
    //             + "</tr>"
    //         );
    //     }

    // }
    if ($_NOVEDADCON110C == '9') {
        _retiroregistro_con110c();
    } else {
        let Window = BrowserWindow.getAllWindows();
        if (Window.length < 1) {
            _validartipo_con110c();
        } else {
            _validartipo_con110c();
        }
    }
}

function _retiroregistro_con110c() {
    CON851P('54', _evaluarcodcliente110c, _tabladiretxt)
}

////////////////MASCARAS///////////////////////////////

var porcentica_110cMask = new IMask(document.getElementById('porcetica_110c'),
    { mask: Number, min: 0, max: 99999, scale: 3, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var porcentreten_110cMask = new IMask(document.getElementById('porcentreten_110c'),
    { mask: Number, min: 0, max: 999, scale: 1, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var plazoUnitMask_110c = new IMask($('#plazo_110c')[0], { mask: Number, thousandsSeparator: ',' });

var factventas_110cMask = new IMask(document.getElementById('factventas_con110c'),
    { mask: Number, min: 0, max: 99999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
// var codclienteMask = IMask($("#codclien_con110c")[0], {
//   mask: Number,
//   thousandsSeparator: ",",
//   padFractionalZeros: false,
//   normalizeZeros: true,
//   radix: ",",
//   mapToRadix: ["."],
// });

var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);
////////////////////////////////////F8////////////////////////////////

function _ventanatercerosCON110C(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
            callback: (data) => {
                console.log(data, 'TERCERO')
                // codclienteMask.typedValue = data.COD.trim();
                $("#codclien_con110c")[0].value = data.COD.trim();
                _enterInput('#codclien_con110c');
            },
            cancel: () => {
                // _enterInput('#codclien_con110c');
                _evaluarcodcliente110c()
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaciudadesCON110C(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA DE CIUDADES",
            columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
            data: $_CIUDAD_CON110C,
            callback_esc: function () {
                $("#ciudad_con110c").focus();
            },
            callback: function (data) {
                document.getElementById('ciudad_con110c').value = data.COD.trim();
                document.getElementById('ciudadd_con110c').value = data.NOMBRE;
                _enterInput('#ciudad_con110c');
            }
        });
    }
}


function _ventanaactividadCON110C(e) {
    var $_ACT_CON110C = [];
    let URL = get_url("APP/" + "CONTAB/CON806" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_ACT_CON110C = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE ACTIVIDADES",
                    columnas: ["COD", "DESCRIP"],
                    data: $_ACT_CON110C.ACTIVIDADES,
                    callback_esc: function () {
                        $("#actividad_con110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('actividad_con110c').value = data.COD;
                        document.getElementById('actividadd_con110c').value = data.DESCRIP;

                        _enterInput('#actividad_con110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaentidadCON110C(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE ENTIDADES',
            columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
            data: $_ENTIDADES_CON110C,
            callback_esc: function () {
                $("#entidad_con110c").focus();
            },
            callback: function (data) {
                document.getElementById('entidad_con110c').value = data["COD-ENT"];
                document.getElementById('entidadd_con110c').value = data['NOMBRE-ENT'];
                _enterInput('#entidad_con110c');
            }
        });

    }
}

function _ventanazonasCON110C(e) {
    var $_ZONA_7767 = [];
    let URL = get_url("APP/" + "CONTAB/CON810" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_ZONA_7767 = data.ZONAS;
            TIPOZONA = "1";
            filtrozonas = $_ZONA_7767.filter(zona => (zona.TIPO == TIPOZONA))

            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE ZONAS",
                    columnas: ["ZONA", "NOMBRE"],
                    data: filtrozonas,
                    callback_esc: function () {
                        $("#zona_110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('zona_110c').value = data.ZONA;

                        _enterInput('#zona_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanarutaCON110C(e) {
    var $_RUTA_7767 = [];
    let URL = get_url("APP/" + "CONTAB/CON810" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_RUTA_7767 = data.ZONAS;
            TIPORUTA = "2";
            filtrorutas = $_RUTA_7767.filter(ruta => (ruta.TIPO == TIPORUTA))
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE ZONAS",
                    columnas: ["ZONA", "NOMBRE"],
                    data: filtrorutas,
                    callback_esc: function () {
                        $("#ruta_110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('ruta_110c').value = data.ZONA;

                        _enterInput('#ruta_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanagrdnegocioCON110C(e) {
    var $_GRADONEG_7767 = [];
    let URL = get_url("APP/" + "CONTAB/CON818" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_GRADONEG_7767 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE GRADO DE NEGOCIOS',
                    columnas: ["TIPO", "NOMBRE"],
                    data: $_GRADONEG_7767.GRNEGOCIO,
                    callback_esc: function () {
                        $("#grdnegocio_110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('grdnegocio_110c').value = data.TIPO;
                        document.getElementById('grdnegociod_110c').value = data.NOMBRE;

                        _enterInput('#grdnegocio_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });

}

function _ventanaclasclienteCON110C(e) {
    var $_CLASC_110C = [];
    let URL = get_url("APP/" + "CONTAB/CON810S" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CLASC_110C = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE CLASIFICACION CLIENTES',
                    columnas: ["COD", "DESCRIP"],
                    data: $_CLASC_110C.CLASC,
                    callback_esc: function () {
                        $("#clasifclien_110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('clasifclien_110c').value = data.COD;
                        document.getElementById('clasifcliend_110c').value = data.DESCRIP;
                        // $('#clasifclien_110c').val(data.llave_clasc);
                        // $('#clasifcliend_110c').val(data.descrip_clasc.trim());
                        _enterInput('#clasifclien_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaconvenioCON110C(e) {
    var $_CONVENIO_CON110C = [];
    let URL = get_url("APP/" + "SALUD/SER804" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CONVENIO_CON110C = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONVENIOS",
                    columnas: ["COD", "DESCRIP"],
                    data: $_CONVENIO_CON110C.TARIFAS,
                    callback_esc: function () {
                        $("#convenio_con110c").focus();
                    },
                    callback: function (data) {
                        $("#convenio_con110c").val(data.COD);
                        $("#conveniod_con110c").val(data.DESCRIP);
                        _enterInput('#convenio_con110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _f8conveniored_CON110C(e) {
    var $_CONVRED_CON110C = [];
    let URL = get_url("APP/" + "SALUD/SER804" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CONVRED_CON110C = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONVENIOS",
                    columnas: ["COD", "DESCRIP"],
                    data: $_CONVRED_CON110C.TARIFAS,
                    callback_esc: function () {
                        $("#red_110c").focus();
                    },
                    callback: function (data) {
                        $("#red_110c").val(data.COD);
                        $("#descripred_110c").val(data.DESCRIP);
                        _enterInput('#red_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}