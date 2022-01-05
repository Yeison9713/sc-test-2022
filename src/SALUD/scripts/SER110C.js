// 05-06-2020 -- Diana Escobar: Creacion
// Yeisson.O * Se agrego function _validarSalida_ser110c -> valida la salida dependiendo el modulo

const { isNumeric } = require("jquery");

var $_REGBASE09 = '', EPSPACI = '', $_NITENT = '', $_BLOQUEOHCW = '', $_ACTUALIZAPACIX = '', $_VENTANA = 0, $_TIENEPAGAREW = '', $_ACTBARRIO = '', $_APELLIDO1PACW = '', $_PERAPEL1PACIW = '', $_PERAPEL2PACIW = '', $_APELLIDO2PACW = '', $_PERANOM1PACIW = '', $_PERANOM2PACIW = '', $_NOMBRE1PACW = '', $_NOMBRE2PACW = '', $_NACIMPACIW = '', $_ANOPACW = '', $_MESPACW = '', $_DIAPACW = '',
    $_GRPSANGPACIW = '', $_RHPACIW = '', $_SEXOPACIW = '', $_ESTCIVILPACIW = 'S', $_NIVESTUPACIW = '1', $_ZONAPACIW = 'U', $_PADREPACIW = '', $_MADREPACIW = '', $_DIRPACIW = '', $_TELPACIW = '', $_CELPACIW = '', $_CIUPACIW = '', $_NOMCIUPACIW = '', $_OCUPPACIW = '0000', $_NOMOCUPPACIW = '', $_PAISPACIW = '', $_ESTRATOPACIW = '0', $_COPAGOPACIW = '', $_REGIMENPACIW = 'C', $_INSTITUTOPACIW = '', $_DESCRIPINSTIPACIW = '', $_ETNIAPACIW = '9', $_TIPOAFILPACIW = '0', $_PORTABPACIW = '',
    $_CIUDASEGPACIW = '', $_EPSPACIW = '', $_NOMEPSPACIW = '', $_CONTRATOPACIW = '', $_FECHAAFILPACIW = '', $_FICHAPACIW = '', $_CARNETPACIW = '', $_FECHAVENCEPACIW = '', $_FECHADEMPACIW = '', $_DEMANINDPACIW = '', $_IDCOTIPACIW = '', $_DESCRIPCOTIPACW = '', $_PARENTPACIW = '', $_VICTICONFLICPACIW = '', $_PROGEPSPACIW = '', $_ALTCOSPACIW = '', $_TUTELAPACIW = '', $_EMPRESAPACIW = '', $_CRONICOPACIW = '', $_PATOLCRONICPACIW = '', $_CLASIFPACIW = '',
    $_CERTESTUDPACIW = '', $_PERIESTUDPACIW = '', $_ULTMAMOPACIW = '', $_CERTECONOPACIW = '', $_PERIECOPACIW = '', $_MULTICONSULPACIW = '', $_RESTAPLIPACIW = '', $_RESTDROGPACIW = '', $_RESTCIRUPACIW = '', $_RESTLABOPACIW = '', $_RESTIMAGPACIW = '', $_RESTESTAPACIW = '', $_RESTCONSPACIW = '', $_RESTTERFPACIW = '', $_RESTTEROPACIW = '', $_RESTADONPACIW = '', $_RESTPYPPACIW = '', $_VCMPACIW = '', $_DERECHOPACIW = '', $_OBSERVPACIW = '', $_DISCAPPACIW = '1',
    $_EMBALTOPACIW = '', $_ENTIFACTPACIW = '', $_NITFACTPACIW = '', $_DESCRIPENTIPACIW = '', $_FECHANITPACIW = '', $_ANTCANCERPACIW = '', $_MEDFAMIPACIW = '', $_DESCRIPMEDPACIW = '', $_DECRIPPACIW = '', $_COMUNIPACW = '', $_RESGUARPACIW = '', $_EMAILPACIW = '', $_OPERCREAPACIW = '', $_FECHACREAPACIW = '', $_HORACREAPACIW = '', $_OPERMODIFPACIW = '', $_FECHAMODIFPACIW = '', $_HORAMODIFPACIW = '', $_TIPOACOMPPACIW = '', $_IDACOMPPACIW = '',
    $_NOMB1ACOMPPACIW = '', $_NOMB2ACOMPPACIW = '', $_APEL1ACOMPPACIW = '', $_APEL2ACOMPPACIW = '', $_TELACOMPACIW = '', $_CODBARRIOPACIW = '', $_DESCRIPBARRIOS = '', $_TIPOPACIW = '', $_LUGARIDPACIW = '', $_UNIDADSERV = '', $_RESULTADOCOVIDPACIW = '';

///////////////////////// OPCION MAESTRO DE PACIENTES ///////////////////////////

$(document).ready(function () {
    nombreOpcion('9,7,7,6,7 - Maestro de Pacientes');
    _inputControl('reset');
    _inputControl('disabled');
    loader("show");
    $_LLAVEBARRIOSW = '';
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CODCIUDADUSU = $_USUA_GLOBAL[0].COD_CIUD;
    $_DPTCIUUSU = $_CODCIUDADUSU.substring(0, 2);
    $_CIUCIUUSU = $_CODCIUDADUSU.substring(2, 5);
    _toggleF8([
        { input: "numero", app: "110c", funct: _ventanaPacientes },
        { input: 'ciudad', app: '110c', funct: _ventanaciudad_SAL7767 },
        { input: 'lugar', app: '110c', funct: _ventanalugar_SAL7767 },
        { input: 'ocupacion', app: '110c', funct: _ventanaocupaciones_SAL7767 },
        { input: 'pais', app: '110c', funct: _ventanapais_SAL7767 },
        { input: 'colegio', app: '110c', funct: _ventanacolegios_SAL7767 },
        { input: 'ciudadportab', app: '7767', funct: _ventanaportabilidad_SAL7767 },
        { input: 'eps', app: '110c', funct: _ventanaentidades_SAL7767 },
        { input: 'cotizante', app: '110c', funct: _ventanamaestrodospaci_SAL7767 },
        { input: 'patologiacronica', app: '110c', funct: _ventanapatologias_SAL7767 },
        { input: 'clasif', app: '110c', funct: _ventanaclasificacion_SAL7767 },
        { input: 'entidad', app: '110c', funct: _ventanaterceros_SAL7767 },
        { input: 'medicofam', app: '110c', funct: _ventanaprofesionales_SAL7767 },
        { input: 'barrio', app: '110c', funct: _ventanabarrios_SAL7767 }
    ]);


    obtenerDatosCompletos({
        nombreFd: 'ENTIDADES',
        usuario: true,
    }, function (data) {
        $_ENTIDADES_7767 = data.ENTIDADES
        $_ENTIDADES_7767.pop()
        loader("hide");
        _buscarrestriccion_7767();
        obtenerDatosCompletos({
            nombreFd: 'CIUDADES'
        }, function (data) {
            $_CIUDAD_7767 = data.CIUDAD
            $_CIUDAD_7767.pop()
            obtenerDatosCompletos({
                nombreFd: 'COLEGIOS'
            }, function (data) {
                $_COLEGIOS_7767 = data.COLEGIOS;
                $_COLEGIOS_7767.pop()
                obtenerDatosCompletos({
                    nombreFd: 'PROFESIONALES'
                }, function (data) {
                    $_PROFESIONALES_7767 = data.ARCHPROF;
                    $_PROFESIONALES_7767.pop()
                    obtenerDatosCompletos({
                        nombreFd: 'BARRIOS'
                    }, function (data) {
                        $_BARRIOS_7767 = data.BARRIOS;
                        $_BARRIOS_7767.pop();

                    })
                })
            })
        })
    })
})

/////////////////////////////EMPIEZA OPCION DE PACIENTE//////////////////////////

function _buscarrestriccion_7767() {
    $_SW9 = "0";
    $_OPSEGU = "IS767";
    let datos_envio = datosEnvio()
    datos_envio += $_ADMINW + '|' + $_OPSEGU
    let URL = get_url("APP/CONTAB/CON904.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            _validacionnovedad_7767();
        })
        .catch(err => {
            console.debug(err);
            CON851('15', '15', null, 'error', 'error');
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _validarSalida_ser110c()
            };
        })
}

function _validacionnovedad_7767() {
    $_NOVEDAD7767 = "8";
    CON850(_dato_novedad_7767);
    let Window = BrowserWindow.getAllWindows();
    if (Window.length > 1) {
        $_VENTANA = 1;
        $('#numero_110c').val($_MESSAGE[2].cedula);
        // $_UNIDADSERV = $_MESSAGE[2].unidad
        _editarpaci_7767();
    }
}

function _dato_novedad_7767(novedad) {
    $_VENTANA = 0;
    $_SWCAMBIOW = "0";
    $_NOVEDAD7767 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        // if (Window.length > 1) {
        // _infosal7767();
        // } else {
        // _inputControl('reset');
        // _infosal7767();
        // };

        // break
        case 8:
        case 9:
            _infosal7767();
            break;
        default:
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _validarSalida_ser110c();
            };
            break;
    }
    $('#novedad_110c').val(novedad.id + ' - ' + novedad.descripcion)
}

function _infosal7767() {
    if ($_NOVEDAD7767 == 9) {
        $_OPSEGU = "IS7679"
        let datos_envio = datosEnvio()
        datos_envio += $_ADMINW + '|' + $_OPSEGU
        let URL = get_url("APP/CONTAB/CON904.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(function (data) {
                _permisonovedad_7767();
            })
            .catch(err => {
                console.debug(err);
                CON851('01', '01', null, 'error', 'error');
                CON850(_dato_novedad_7767);
            })
    } else {
        _permisonovedad_7767();
    }
}


function _permisonovedad_7767() {
    $_OPSEGU = "IS767" + $_NOVEDAD7767;
    let datos_envio = datosEnvio()
    datos_envio += $_ADMINW + '|' + $_OPSEGU
    let URL = get_url("APP/CONTAB/CON904.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            _dato3_7767();
        })
        .catch(err => {
            console.debug(err);
            CON851('01', '01', null, 'error', 'error');
            CON850(_dato_novedad_7767);
        })
}

function _dato3_7767() {
    $_REGBASE09 = "                    ";
    $_CODBASE09 = $_REGBASE09.substring(0, 15);
    $_TIPOIDBASE09 = $_REGBASE09.substring(15, 18);
    $_DESCRIPBASE09 = $_REGBASE09.substring(18, 72);
    $_DATOSBASE09 = $_REGBASE09.substring(72, 752);
    _evaluarpaciente_7767();
}

function _evaluarpaciente_7767() {
    validarInputs({
        form: '#NUMERO_110C',
        orden: "1",
        event_f4: () => { _ventanapacientedoc_7767() },

    }, () => {
        CON850(_dato_novedad_7767);
    },
        () => {
            _editarpaci_7767()
        }

    )
}

function _ventanapacientedoc_7767() {
    var ventanabase09 = bootbox.dialog({
        size: "medium",
        title: "CONSULTA DE PACIENTE BASE09",
        message:
            '<div class="row"> ' +
            '<div class="col-md-12"> ' +


            '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-6 col-xs-6 control-label" for="name">' + "Doc. Identidad:" + '</label> ' +
            '<div class="col-md-9 col-sm-6 col-xs-6" id="DOCBASE09_SER110C"> ' +
            '<input id="docpacbase09_SER110C" class="form-control input-md" data-orden="1" maxlength="15" > ' +
            '</div> ' +
            '<button type="button" id="docpacbase09Btn_110C" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '</div>' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-4 col-sm-4 col-xs-6 control-label" for="name">' + "Paciente: " + '</label> ' +
            '<div class="col-md-8 col-sm-6 col-xs-6" id="PACBASE09_SER110C"> ' +
            '<input id="pacientebase09_110C" class="form-control input-md"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-8 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-4 col-sm-4 col-xs-6 control-label" for="name">' + "Eps: " + '</label> ' +
            '<div class="col-md-8 col-sm-6 col-xs-6" id="EPSBASE09_SER110C"> ' +
            '<input id="epspacbase09_110C" class="form-control input-md"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<div class="col-md-8 col-sm-6 col-xs-6" id="PAREBASE09_SER110C"> ' +
            '<input id="parebase09_110C" class="form-control input-md" data-orden="1"> ' +
            '</div> ' +
            '</div> ' +


            "</div> " +
            "</div> " +
            "</div>",
        buttons: {
            confirm: {
                label: "Aceptar",
                className: "btn-primary",
                callback: function () {
                    ventanabase09.off("show.bs.modal");
                    setTimeout(_editarpaci_7767, 300);
                },
            },
            cancelar: {
                label: "Cancelar",
                className: "btn-danger",
                callback: function () {
                    ventanabase09.off("show.bs.modal");
                    setTimeout(_evaluarpaciente_7767, 300);
                },
            },
            f8pacientesbase09: {
                label: 'Pacientes',
                className: 'btn-info',
                callback: function () {
                    ventanabase09.off('show.bs.modal');
                    setTimeout(_ventanaf8base09_SER110C, 300);
                }
            }
        },
    });
    ventanabase09.init($(".modal-footer").hide());
    ventanabase09.init(_evaluardocbase09_SER110C());
    ventanabase09.on("shown.bs.modal", function () {
        $("#docpacbase09_SER110C").focus();
    });
    ventanabase09.on('shown.bs.modal', function (e) {
        _toggleF8([{
            input: 'docpacbase09', app: 'SER110C', funct: (e) => {
                if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                    set_Event_validar('#DOCBASE09_SER110C', 'off')
                    $('.btn-info').click();
                }
            }
        },])
    });
}

function _evaluardocbase09_SER110C() {
    _inputControl("disabled");
    validarInputs({
        form: "#DOCBASE09_SER110C",
        orden: "1",
        // event_f4: () => {  },
    },
        () => { $('.btn-danger').click() },
        () => {
            $_DOCBASE09 = $("#docpacbase09_SER110C").val().padStart(15, "0");
            $("#docpacbase09_SER110C").val($_DOCBASE09)
            if ($_DOCBASE09 == 0) {
                _evaluardocbase09_SER110C()
            } else {
                let URL = get_url("APP/SALUD/SER810W.DLL");
                postData({
                    datosh: datosEnvio() + $_DOCBASE09 + "|",
                }, URL)
                    .then(data => {
                        $_BASE09 = data.BASE09
                        $("#pacientebase09_110C").val($_BASE09[0].PACIENTE)
                        $("#epspacbase09_110C").val($_BASE09[0].EPS)
                        $_CODPACIW = $_DOCBASE09
                        $('#numero_110c').val($_CODPACIW)
                        console.log($_CODPACIW)
                        _evaluarpare_SER110C()

                    })
                    .catch(error => {
                        console.error(error)
                        _evaluardocbase09_SER110C()
                    });
            }
        }
    )
}

function _evaluarpare_SER110C() {
    validarInputs({
        form: "#PAREBASE09_SER110C",
        orden: "1"
    },
        () => { _evaluardocbase09_SER110C() },
        () => {
            $_PAREBASE09 = $("#parebase09_110C").val()
            $('.btn-primary').click();
        }
    )
}

function _editarpaci_7767() {
    $_CODPACIW = $('#numero_110c').val();
    $_CODPACIW = $_CODPACIW.padStart(15, "0").toUpperCase()
    $('#numero_110c').val($_CODPACIW);
    if ($_CODPACIW == "000000000000000") {
        _dato3_7767();
    } else {
        let URL = get_url("APP/SALUD/SER810-1.DLL");
        postData({
            datosh: datosEnvio() + $_CODPACIW + "|",
        }, URL)
            .then(data => {
                $_PACIENTE110C = data["REG-PACI"];
                $_APELLIDO1PACW = $_PACIENTE110C[0]["APELL-PACI1"].trim();
                $_PERAPEL1PACIW = $_APELLIDO1PACW.substring(0, 1);
                $_PERAPEL2PACIW = $_APELLIDO1PACW.substring(1, 14);
                $_APELLIDO2PACW = $_PACIENTE110C[0]["APELL-PACI2"].trim();
                $_PERANOM1PACIW = $_APELLIDO2PACW.substring(0, 1);
                $_PERANOM2PACIW = $_APELLIDO2PACW.substring(1, 14);
                $_NOMBRE1PACW = $_PACIENTE110C[0]["NOM-PACI1"].trim();
                $_NOMBRE2PACW = $_PACIENTE110C[0]["NOM-PACI2"].trim();
                $_NACIMPACIW = $_PACIENTE110C[0].NACIM.trim();
                $_ANOPACW = $_NACIMPACIW.substring(0, 4);
                $_MESPACW = $_NACIMPACIW.substring(4, 6);
                $_DIAPACW = $_NACIMPACIW.substring(6, 8);
                $_GRPSANGPACIW = $_PACIENTE110C[0]["GRP-SANG"].trim();
                $_RHPACIW = $_PACIENTE110C[0].RH.trim();
                $_SEXOPACIW = $_PACIENTE110C[0].SEXO.trim();
                $_ESTCIVILPACIW = $_PACIENTE110C[0]["EST-CIV"].trim();
                $_NIVESTUPACIW = $_PACIENTE110C[0]["NIV-ESTUD"].trim();
                $_ZONAPACIW = $_PACIENTE110C[0].ZONA.trim();
                $_PADREPACIW = $_PACIENTE110C[0].PADRE.trim();
                $_MADREPACIW = $_PACIENTE110C[0].MADRE.trim();
                $_DIRPACIW = $_PACIENTE110C[0].DIRECC.trim();
                $_TELPACIW = $_PACIENTE110C[0].TELEFONO.trim();
                $_CELPACIW = $_PACIENTE110C[0].CEL.trim();
                $_CIUPACIW = $_PACIENTE110C[0].CIUDAD.trim();
                $_NOMCIUPACIW = $_PACIENTE110C[0]["DESCRIP-CIUDAD"].trim();
                $_OCUPPACIW = $_PACIENTE110C[0]["OCUP-V8"].trim();
                $_NOMOCUPPACIW = $_PACIENTE110C[0]["NOMBRE-OCUP"].trim();
                $_PAISPACIW = $_PACIENTE110C[0]["PAIS-ORIG"].trim();
                $_ESTRATOPACIW = $_PACIENTE110C[0].ESTRATO.trim();
                $_COPAGOPACIW = $_PACIENTE110C[0].COPAGO.trim();
                $_REGIMENPACIW = $_PACIENTE110C[0].TIPO.trim();
                $_INSTITUTOPACIW = $_PACIENTE110C[0].INSTITUTO.trim();
                $_DESCRIPINSTIPACIW = $_PACIENTE110C[0]["DESCRIP-INST"].trim();
                $_ETNIAPACIW = $_PACIENTE110C[0].ETNIA.trim();
                $_TIPOAFILPACIW = $_PACIENTE110C[0]["TIPO-AFIL"].trim();
                $_PORTABPACIW = $_PACIENTE110C[0].PORTABILIDAD.trim();
                $_CIUDASEGPACIW = $_PACIENTE110C[0]["CIUDAD-ASEG"].trim();
                $_EPSPACIW = $_PACIENTE110C[0].EPS.trim();
                $_NOMEPSPACIW = $_PACIENTE110C[0]["NOMBRE-EPS"].trim();
                $_CONTRATOPACIW = $_PACIENTE110C[0].CONTRATO.trim();
                $_FECHAAFILPACIW = $_PACIENTE110C[0]["FECHA-AFIL"].trim();
                $_FICHAPACIW = $_PACIENTE110C[0].FICHA.trim();
                $_CARNETPACIW = $_PACIENTE110C[0]["NRO-AFIL"].trim();
                $_FECHAVENCEPACIW = $_PACIENTE110C[0]["FECHA-VENCE"].trim();
                $_FECHADEMPACIW = $_PACIENTE110C[0]["FECHA-DEMAN-INDU"].trim();
                $_DEMANINDPACIW = $_PACIENTE110C[0]["DEMAN-INDU"].trim();
                $_IDCOTIPACIW = $_PACIENTE110C[0]["ID-COTIZ"].trim();
                $_DESCRIPCOTIPACW = $_PACIENTE110C[0]["NOMBRE-COTIZ"].trim();
                $_PARENTPACIW = $_PACIENTE110C[0]["PARENT"].trim();
                $_VICTICONFLICPACIW = $_PACIENTE110C[0]["VICTI-CONFLICTO"].trim();
                $_PROGEPSPACIW = $_PACIENTE110C[0]["PROG-ESP"].trim();
                $_ALTCOSPACIW = $_PACIENTE110C[0]["ALT-COS"].trim();
                $_TUTELAPACIW = $_PACIENTE110C[0].TUTELA.trim();
                $_EMPRESAPACIW = $_PACIENTE110C[0].EMPRESA.trim();
                $_CRONICOPACIW = $_PACIENTE110C[0].CRONICO.trim();
                $_PATOLCRONICPACIW = $_PACIENTE110C[0]["PATOL-CRONIC"].trim();
                $_CLASIFPACIW = $_PACIENTE110C[0].CLASIF.trim();
                $_CERTESTUDPACIW = $_PACIENTE110C[0]["CERT-ESTUD"].trim();
                $_PERIESTUDPACIW = $_PACIENTE110C[0]["PERI-ESTUD"].trim();
                $_ULTMAMOPACIW = $_PACIENTE110C[0]["ULT-MAMO"].trim();
                $_CERTECONOPACIW = $_PACIENTE110C[0]["CERT-ECONO"].trim();
                $_PERIECOPACIW = $_PACIENTE110C[0]["PERI-ECO"].trim();
                $_MULTICONSULPACIW = $_PACIENTE110C[0].MULTICONSUL.trim();
                $_RESTAPLIPACIW = $_PACIENTE110C[0]["REST-APLI"].trim();
                $_RESTDROGPACIW = $_PACIENTE110C[0]["REST-DROG"].trim();
                $_RESTCIRUPACIW = $_PACIENTE110C[0]["REST-CIRU"].trim();
                $_RESTLABOPACIW = $_PACIENTE110C[0]["REST-LABO"].trim();
                $_RESTIMAGPACIW = $_PACIENTE110C[0]["REST-IMAG"].trim();
                $_RESTESTAPACIW = $_PACIENTE110C[0]["REST-ESTA"].trim();
                $_RESTCONSPACIW = $_PACIENTE110C[0]["REST-CONS"].trim();
                $_RESTTERFPACIW = $_PACIENTE110C[0]["REST-TERF"].trim();
                $_RESTTEROPACIW = $_PACIENTE110C[0]["REST-TERO"].trim();
                $_RESTADONPACIW = $_PACIENTE110C[0]["REST-ODON"].trim();
                $_RESTPYPPACIW = $_PACIENTE110C[0]["REST-PYP"].trim();
                $_VCMPACIW = $_PACIENTE110C[0]["VICT-ABUSO-SEX"].trim();
                $_DERECHOPACIW = $_PACIENTE110C[0].DERECHO.trim();
                $_OBSERVPACIW = $_PACIENTE110C[0].OBSERV.trim();
                $_DISCAPPACIW = $_PACIENTE110C[0].DISCAP.trim();
                $_EMBALTOPACIW = $_PACIENTE110C[0]["EMB-ALTO-RIESG"].trim();
                $_ENTIFACTPACIW = $_PACIENTE110C[0]["NIT-FACT"].trim();
                $_NITFACTPACIW = $_PACIENTE110C[0]["NIT-FACT"].trim();
                $_DESCRIPENTIPACIW = $_PACIENTE110C[0]["DESCRIP-NIT-FACT"].trim();
                $_FECHANITPACIW = $_PACIENTE110C[0]["FECHA-NIT"].trim();
                $_ANTCANCERPACIW = $_PACIENTE110C[0]["ANTECED-CANCER"].trim();
                $_MEDFAMIPACIW = $_PACIENTE110C[0]["MED-FAMI"].trim();
                $_DESCRIPMEDPACIW = $_PACIENTE110C[0]["NOMBRE-MED-FAMI"].trim();
                $_DECRIPPACIW = $_PACIENTE110C[0].DESCRIP.trim();
                $_COMUNIPACW = $_PACIENTE110C[0]["NOM-COMUNIDAD"].trim();
                $_RESGUARPACIW = $_PACIENTE110C[0]["NOM-RESGUARDO"].trim();
                $_EMAILPACIW = $_PACIENTE110C[0]["E-MAIL"].trim();
                $_OPERCREAPACIW = $_PACIENTE110C[0]["OPER-CREA"].trim();
                $_FECHACREAPACIW = $_PACIENTE110C[0]["FECHA-CREA"].trim();
                $_HORACREAPACIW = $_PACIENTE110C[0]["HORA-CREA"].trim();
                $_OPERMODIFPACIW = $_PACIENTE110C[0]["OPER-CORR"].trim();
                $_FECHAMODIFPACIW = $_PACIENTE110C[0]["FECHA-CORR"].trim();
                $_HORAMODIFPACIW = $_PACIENTE110C[0]["HORA-CORR"].trim();
                $_TIPOACOMPPACIW = $_PACIENTE110C[0]["TIPO-ID-ACOMP"].trim();
                $_IDACOMPPACIW = $_PACIENTE110C[0]["ID-ACOMP"].trim();
                $_NOMB1ACOMPPACIW = $_PACIENTE110C[0]["NOM-ACOMP2"].trim().substring(0, 12);
                $_NOMB2ACOMPPACIW = $_PACIENTE110C[0]["NOM-ACOMP2"].trim().substring(13, 24)
                $_APEL1ACOMPPACIW = $_PACIENTE110C[0].ACOMPA.trim().substring(0, 15);
                $_APEL2ACOMPPACIW = $_PACIENTE110C[0].ACOMPA.trim().substring(16, 30)
                $_TELACOMPACIW = $_PACIENTE110C[0]["TEL-ACOM"].trim();
                $_CODBARRIOPACIW = $_PACIENTE110C[0]["COD-BARRIO"].trim();
                $_DESCRIPBARRIOS = $_PACIENTE110C[0]["NOMBRE-MED-FAMI"].trim();
                $_TIPOPACIW = $_PACIENTE110C[0]["TIPO-ID"].trim();
                $_LUGARIDPACIW = $_PACIENTE110C[0]["LUGAR-ID"].trim();
                $_TIENEPAGAREW = $_PACIENTE110C[0].PAGARE.trim()
                $_FACTURAPAGAREW = $_PACIENTE110C[0]["FACT-PAGARE"].trim()
                $_VALORPAGAREW = $_PACIENTE110C[0]["VALOR-PAGARE"].trim()
                $_FECHANOTAPACIW = $_PACIENTE110C[0]["FECHA-NOTA"].trim()
                $_OBSERVNOTAPACIW = $_PACIENTE110C[0]["OBSERV-NOTA"].trim()
                $_OPEROBSERNOTAPACIW = $_PACIENTE110C[0]["OPER-OBSE-NOTA"]
                $_FACTNOTAPACIW = $_PACIENTE110C[0]["FACT-NOTA"]
                $_RESULTADOCOVIDPACIW = $_PACIENTE110C[0].RESULT_COVID.trim()
                if ($_NOVEDAD7767 == '7') {
                    $_LLAVEAUDW = $_CODPACIW;
                    setTimeout(_cambio_7767, 100);
                } else if ($_NOVEDAD7767 == '8') {
                    console.log('VA IR NOVEDAD 8')
                    setTimeout(_cambio_7767, 100);
                } else if ($_NOVEDAD7767 == '9') {
                    setTimeout(_cambio_7767, 100);
                }
            })
            .catch(error => {
                console.error(error)
                if (error.MENSAJE == "01" && $_NOVEDAD7767 == '7') {
                    _nuevoregistro_7767();
                } else if (error.MENSAJE == "01" && $_NOVEDAD7767 == '8') {
                    _error_7767();
                } else if (error.MENSAJE == "01" && $_NOVEDAD7767 == '9') {
                    _error_7767();
                }
            });
    }
}

function _error_7767() {

    if ($_NOVEDAD7767 == '7') {
        $_NOVEDAD7767 = '8';
        $('#novedad_110c').val('8- Cambio');
        CON851('00', '00', null, 'error', 'Error');
        setTimeout(_evaluarpaciente_7767, 100);
    } else if (($_NOVEDAD7767 == '8') || ($_NOVEDAD7767 == '9')) {
        // CON851('01', '01', null, 'error', 'Error');
        if ($_VENTANA < 1) {
            _evaluarpaciente_7767();
        }
    }
}

function _nuevoregistro_7767() {
    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
        $('#EMAIL2_SER110C').removeClass('hidden');
        _dato4_7767()
    } else {
        _dato4_7767()
    }
}


function _dato4_7767() {
    //// CALL SER810B ///// MUESTRA MENSAJES SOBRE PACIENTES 

    if (($_NOVEDAD7767 == '7') && (Number.isNaN($_CODPACIW)) && ($_TIPOPACIW == ' ')) {
        $_TIPOPACIW = "RC";
        $("#identif_110c").val($_TIPOPACIW);
        _validartipopac_7767();

    } else if (($_NOVEDAD7767 == '8') && (($_ADMINW == "ADMI") || ($_ADMINW == "GEBC"))) {
        $('#BLOQHC_110C').removeClass('hidden');
        if ($_BLOQUEOHCW.trim() == '') {
            $_BLOQUEOHCW = "N"
            $("#Bloqhc_110c").val($_BLOQUEOHCW);
        }
        validarInputs({
            form: '#BLOQHC_110C',
            orden: "1"
        },
            function () { _dato3_7767(); },
            () => {
                $_BLOQUEOHCW = $("#Bloqhc_110c").val();
                if (($_BLOQUEOHCW == "S") || ($_BLOQUEOHCW == "N")) {
                    _validartipopac_7767();
                } else {
                    _dato4_7767();
                }
            }
        )

    } else {
        _validartipopac_7767();
    }
}

function _validartipopac_7767() {
    var documento = [{ "COD": "CC", "DESCRIP": "1- CEDULA CIUDADANIA" },
    { "COD": "CE", "DESCRIP": "2- CEDULA EXTRANJERIA" },
    { "COD": "PA", "DESCRIP": "3- NUMERO PASAPORTE" },
    { "COD": "RC", "DESCRIP": "4- REGISTRO CIVIL" },
    { "COD": "TI", "DESCRIP": "5- TARJETA IDENTIDAD" },
    { "COD": "ASI", "DESCRIP": "6- ADULTO SIN IDENT" },
    { "COD": "MSI", "DESCRIP": "7- MENOR SIN IDENT" },
    { "COD": "NUI", "DESCRIP": "8- NUM UNICO IDENT. NUID" },
    { "COD": "CD", "DESCRIP": "9- CARNET DIPLOMA" },
    { "COD": "SC", "DESCRIP": "A- SALVO CONDUCTO" },
    { "COD": "PE", "DESCRIP": "B- PERMISO ESPECIAL PERM" },
    { "COD": "CN", "DESCRIP": "C- CERTIFICADO NACIDO VIVO" }]
    POPUP({
        array: documento,
        titulo: 'TIPO IDENTIFICACION',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: $_TIPOPACIW,
        callback_f: _evaluarpaciente_7767
    },
        _evaluartipodoc_7767);
}

function _evaluartipodoc_7767(documento) {
    $_TIPOPACIW = documento.COD;
    switch (documento.COD) {
        case 'CC':
        case 'CE':
        case 'PA':
        case 'RC':
        case 'TI':
        case 'ASI':
        case 'MSI':
        case 'NUI':
        case 'CD':
        case 'SC':
        case 'PE':
        case 'CN':
            validacionestipodoc_7767();
            break;
        default:
            _evaluarpaciente_7767();
            break;
    }
    $("#identif_110c").val(documento.COD + " - " + documento.DESCRIP);
}

function validacionestipodoc_7767() {
    if ($_TIPOPACIW == 888) {
        $_TIPOPACIW = '';
        $("#identif_110c").val($_TIPOPACIW);
        _dato3_7767();
    } else if ($_TIPOPACIW == "CC" || $_TIPOPACIW == "CE" || $_TIPOPACIW == "PA" || $_TIPOPACIW == "RC" || $_TIPOPACIW == "TI" || $_TIPOPACIW == "ASI" || $_TIPOPACIW == "MSI" || $_TIPOPACIW == "NUI" || $_TIPOPACIW == "CD" || $_TIPOPACIW == "SC" || $_TIPOPACIW == "PE" || $_TIPOPACIW == "CN") {
        if (($_TIPOPACIW == "CC" || $_TIPOPACIW == "TI") && (!$.isNumeric($_CODPACIW))) {
            CON851('57', '57', null, 'error', 'error');
            _dato4_7767();
        } else {
            if ($_TIPOPACIW == "CC") {
                if ($_CODPACIW < 1000 || $_CODPACIW > 2999000000 || ($_CODPACIW > 100000000 && $_CODPACIW < 1000000000)) {
                    CON851('78', '78', null, 'error', 'error');
                    if ($_NOVEDAD7767 == '7') {
                        _dato4_7767();
                    } else {
                        _evaluarlugarnac_7767();
                    }
                } else {
                    _evaluarlugarnac_7767();
                }
            } else {
                _evaluarlugarnac_7767();
            }
        }
    } else {
        _dato4_7767()
    }
}


function _evaluarlugarnac_7767() {
    validarInputs({
        form: '#LUGARNAM_110C',
        orden: "1"
    },
        function () { setTimeout(_validartipopac_7767, 300) },
        () => {
            $_LUGARIDPACIW = $('#lugar_110c').val();
            if (($_LUGARIDPACIW == '00000') || ($_LUGARIDPACIW.trim() == '')) {
                _evaluarapellido_7767();
            } else {
                LLAMADO_DLL({
                    dato: [$_LUGARIDPACIW],
                    callback: _dataSAL7767_047,
                    nombredll: 'SER110C_04',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}

function _dataSAL7767_047(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCIUDNACIW = date[1].trim();
    if (swinvalid == "00") {
        _evaluarapellido_7767();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'Error');
        _evaluarlugarnac_7767();

    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}

function _evaluarapellido_7767() {
    let parametros = {
        estado: 'on',
        msg: [{
            mensaje: 'Oprima F7 para cambios base datos'
        }, {
            mensaje: 'Oprimar F9 para grupo familiar'
        }
        ]
    }
    _FloatText(parametros);
    validarInputs({
        form: '#APELLIDO1_110C',
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarapellido_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarapellido_7767) }
    },
        function () {
            _evaluarpaciente_7767();
        },
        () => {
            $_APELLIDO1PACW = primerapellido_SER110C.value.trim();
            $_PERAPEL1PACIW = $_APELLIDO1PACW.substring(0, 1);
            $_PERAPEL2PACIW = $_APELLIDO1PACW.substring(1, 14);

            if (($_PERAPEL1PACIW.trim() == '') || ($.isNumeric($_PERAPEL1PACIW))) {
                CON851('58', '58', _evaluarapellido_7767(), 'error', 'error');
            } else if ($_TUTELAPACIW == "S") {
                CON851('5B', '5B', _evaluarsegundoapellido_7767(), 'error', 'error');
            } else if ($_APELLIDO1PACW.trim() == '') {
                CON851('02', '02', _evaluarapellido_7767(), 'error', 'error');
            } else {
                _evaluarsegundoapellido_7767();
            }
        }
    )
}

function _evaluarsegundoapellido_7767() {
    validarInputs({
        form: '#APELLIDO2_110C',
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarsegundoapellido_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarsegundoapellido_7767) }
    },
        function () {
            _evaluarapellido_7767();
        },
        () => {
            $_APELLIDO2PACW = segundoapellido_SER110C.value.trim();
            if ($.isNumeric($_APELLIDO2PACW)) {
                _evaluarsegundoapellido_7767()
            } else {
                _evaluarprimernombre_7767();
            }
        }
    )
}

function _evaluarprimernombre_7767() {
    validarInputs({
        form: '#NOMBRE1_110C',
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarprimernombre_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarprimernombre_7767) }
    },
        _evaluarsegundoapellido_7767,
        () => {
            $_NOMBRE1PACW = primernombre_SER110C.value.trim();
            $_PERANOM1PACIW = $_NOMBRE1PACW.substring(0, 1);
            $_PERANOM2PACIW = $_NOMBRE1PACW.substring(1, 11);
            if (($_PERANOM1PACIW.trim() == '') || ($.isNumeric($_PERANOM1PACIW))) {
                CON851('58', '58', _evaluarprimernombre_7767(), 'error', 'error');
            } else if ($_NOMBRE1PACW.trim() == '') {
                CON851('02', '02', _evaluarprimernombre_7767(), 'error', 'error');
            } else {
                _evaluarsegnombre_7767();
            }
        }
    )
}

function _evaluarsegnombre_7767() {
    validarInputs({
        form: '#NOMBRE2_110C',
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarsegnombre_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarsegnombre_7767) }
    },
        _evaluarprimernombre_7767,
        () => {
            $_NOMBRE2PACW = segundonombre_SER110C.value.trim();
            if ($.isNumeric($_NOMBRE2PACW)) {
                _evaluarsegnombre_7767()
            } else {
                _validacionipssanfernando_7767();
            }
        }
    )
}

function _validacionipssanfernando_7767() {

    if ((($_NITUSU == "0900475095") || ($_NITUSU == "0822007038") || ($_NITUSU == "0844003225")) && (($_ADMINW == "ADMI") || ($_ADMINW == "GEBC"))) {
        ventalahuelladactilar_7767();
    } else {
        _evaluaranonac_7767();
    }
}

function ventalahuelladactilar_7767() {
    var ventanahuella_SER110C = bootbox.dialog({
        size: "medium",
        title: "FIRMA",
        message:
            '<div class="row"> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
            '<div class="inline-inputs">' +
            '<label class="col-md-10 col-sm-10 col-xs-12 control-label" for="name">' +
            "Desea crear la firma del paciente?" +
            "</label> " +
            '<div class="input-group col-md-2 col-sm-2 col-xs-12" id="VALIDARHUELLA_SER110C"> ' +
            '<input id="huella_SER110C" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1" placeholder="S/N" > ' +
            "</div> " +
            "</div>" +
            "</div> " +
            "</div>",
        buttons: {
            confirm: {
                label: "Aceptar",
                className: "btn-primary",
                callback: function () {
                    ventanahuella_SER110C.off("show.bs.modal");
                    setTimeout(_evaluaranonac_7767, 500);
                },
            },
            cancelar: {
                label: "Cancelar",
                className: "btn-danger",
                callback: function () {
                    ventanahuella_SER110C.off("show.bs.modal");
                    setTimeout(_evaluarsegnombre_7767, 500);
                },
            },
        },
    });
    ventanahuella_SER110C.init($(".modal-footer").hide());
    ventanahuella_SER110C.init(_evaluarhuella_SER110C());
    ventanahuella_SER110C.on("shown.bs.modal", function () {
        $("#huella_SER110C").focus();
    });
}
function _evaluarhuella_SER110C() {
    _inputControl("disabled");
    validarInputs({
        form: "#VALIDARHUELLA_SER110C",
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            $_HUELLA = $("#huella_SER110C").val().toUpperCase(); $("#huella_SER110C").val($_HUELLA)
            if ($_HUELLA == 'N') {
                $('.btn-primary').click();
            } else if ($_HUELLA == 'S') {
                console.log('TOCA HACER RUTINA PARA EL BIOMETRICO')
                $('.btn-primary').click();
            } else {
                _evaluarhuella_SER110C()
            }
        }
    )
}

function _evaluaranonac_7767() {
    validarInputs({
        form: "#ANONAC_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluaranonac_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluaranonac_7767) }
    },
        () => { _evaluarprimernombre_7767(); },
        () => {
            $_ANONACIPACW = $('#anonac_110c').val();
            if ($_ANONACIPACW.trim() == '') {
                _evaluaranonac_7767();
            } else if (($_ANONACIPACW > $_ANOACTUALW) || (parseInt($_ANONACIPACW) < 1900)) {
                CON851('2D', '2D', _evaluaranonac_7767(), 'error', 'error');
            } else if ($.isNumeric($_ANONACIPACW)) {
                _evaluarmesnac_7767();
            } else {
                _evaluaranonac_7767();
            }
        }
    )
}

function _evaluarmesnac_7767() {
    validarInputs({
        form: "#MESNAC_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarmesnac_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarmesnac_7767) }
    },
        () => { _evaluaranonac_7767(); },
        () => {
            $_MESNACIPACW = $('#mesnac_110c').val().padStart(2, '0');
            $('#mesnac_110c').val($_MESNACIPACW)
            if ($_MESNACIPACW.trim() == '') {
                _evaluarmesnac_7767();
            } else if ((parseInt($_MESNACIPACW) < 1) || (parseInt($_MESNACIPACW) > 12)) {
                CON851('2D', '2D', _evaluarmesnac_7767(), 'error', 'error');
            } else if ($.isNumeric($_MESNACIPACW)) {
                _evaluardianac_7767();
            } else {
                _evaluarmesnac_7767();
            }
        }
    )
}

function _evaluardianac_7767() {
    validarInputs({
        form: "#DIANAC_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluardianac_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluardianac_7767) }
    },
        () => { _evaluarmesnac_7767(); },
        () => {
            $_DIANACIPACW = $('#dianac_110c').val().padStart(2, '0');
            $('#dianac_110c').val($_DIANACIPACW)
            if ($_DIANACIPACW.trim() == '') {
                _evaluardianac_7767();
            } else if ((parseInt($_DIANACIPACW) < 1) || (parseInt($_DIANACIPACW) > 31)) {
                CON851('2D', '2D', _evaluardianac_7767(), 'error', 'error');
            } else if ($.isNumeric($_DIANACIPACW)) {
                $_NACIMPACIW = $_ANONACIPACW + $_MESNACIPACW + $_DIANACIPACW;
                var edad = calcular_edad($_NACIMPACIW);
                $("#edad_110c").val(edad.unid_edad + edad.vlr_edad.toString().padStart('0'));
                $_UNIDEDADW = edad.unid_edad;
                $_VLREDADW = edad.vlr_edad.toString().padStart('0');
                if ($_TIPOPACIW == 'RC' || $_TIPOPACIW == 'MSI' || $_TIPOPACIW == 'CE' || $_TIPOPACIW == 'CN') {
                    _validacionesedad7767()
                } else {
                    if (($_CODPACIW > 3000000 && $_CODPACIW < 9000000) && ($_UNIDEDADW != 'A' || $_VLREDADW < 15)) {
                        CON851('74', '74', _dato3_7767(), 'error', 'error');
                    } else {
                        _validacionesedad7767()
                    }
                }
            } else {
                _evaluardianac_7767();
            }
        }
    )
}


function _validacionesedad7767() {
    if (($_TIPOPACIW == 'TI') && ($_UNIDEDADW == 'A' && $_VLREDADW < 7)) {
        CON851('74', '74', _dato3_7767(), 'error', 'error');
    } else if ($_TIPOPACIW == 'TI' && $_UNIDEDADW == 'M') {
        CON851('74', '74', _dato3_7767(), 'error', 'error');
    } else if ($_TIPOPACIW == 'TI' && $_UNIDEDADW == 'D') {
        CON851('74', '74', _dato3_7767(), 'error', 'error');
    } else if (($_UNIDEDADW == 'A' && $_VLREDADW > 18) && ($_TIPOPACIW == 'RC' || $_TIPOPACIW == 'TI' || $_TIPOPACIW == 'NUI' || $_TIPOPACIW == 'MSI' || $_TIPOPACIW == 'CN')) {
        if ($_USUA_GLOBAL[0].NIT == 800251482) {
            _buscarduplicado_7767();
        } else {
            CON851('74', '74', _dato3_7767(), 'error', 'error');
        }
    } else if (($_UNIDEDADW == 'A' && $_VLREDADW < 18) && ($_TIPOPACIW == "CC" || $_TIPOPACIW == 'ASI')) {
        CON851('74', '74', _dato3_7767(), 'error', 'error');
    } else if (($_UNIDEDADW != 'A') && ($_TIPOPACIW == "CC" || $_TIPOPACIW == 'ASI')) {
        CON851('74', '74', _dato3_7767(), 'error', 'error');
    } else if (($_UNIDEDADW == 'A' && $_VLREDADW > 10) && ($_TIPOPACIW == "RC")) {
        CON851('74', '74', _dato3_7767(), 'error', 'error');
    } else {
        _buscarduplicado_7767()
    }

}

function _buscarduplicado_7767() {
    $_APEL_PACIW = $_APELLIDO1PACW.padEnd(15, ' ') + '|' + $_APELLIDO2PACW.padEnd(15, ' ');
    $_NOMB_PACIW = $_NOMBRE1PACW.padEnd(12, ' ') + '|' + $_NOMBRE2PACW.padEnd(12, ' ');
    if ($_NOVEDAD7767 == '7') {
        var datos_envio = datosEnvio() + $_APEL_PACIW.toUpperCase() + '|' + $_NOMB_PACIW.toUpperCase() + '|' + $_CODPACIW + '|' + $_NACIMPACIW;
        postData({
            datosh: datos_envio
        }, get_url("APP/SALUD/SER810H.DLL"))
            .then((data) => {
                console.log(data)
                console.log(data['DUPLICADO'][0]['FECHA'])
                data['DUPLICADO'][0]['FECHA'] > 0 ?
                    ventanaDuplicado_7767(data) : _evaluargruposang_7767()
            })
            .catch((error) => {

                console.log(error)
            });
    } else {
        _evaluargruposang_7767();
    }
}

function ventanaDuplicado_7767(data) {
    $_ACTUALIZAPACIX = '1';
    $_BUSQ = data['DUPLICADO'][0];
    $_APEL_PACIW = $_APELLIDO1PACW + ' ' + $_APELLIDO2PACW;
    $_NOMB_PACIW = $_NOMBRE1PACW + ' ' + $_NOMBRE2PACW;
    CON851('2B', '2B', mostrarDuplicados_7767($_BUSQ), 'error', 'error');
}

function mostrarDuplicados_7767($_BUSQ) {
    $_ANONACIMPACIW = $_NACIMPACIW.substring(0, 4);
    $_MESNACIMPACIW = $_NACIMPACIW.substring(4, 6);
    $_DIANACIMPACIW = $_NACIMPACIW.substring(6, 8);
    var ventanaDuplicado = bootbox.dialog({
        title: 'Registros duplicados',
        message: '<style type="text/css">' + '.modal-footer {' +
            +'padding: 10px;' +
            'text-align: right;' +
            'margin-top:38px;' +
            'border-top: 1px solid #e5e5e5;}' +
            '</style>' +
            '<div class="table-scrollable">' +
            '<table class="table table-striped table-hover">' +
            '<thead><tr>' +
            '<th>Cedula</th>' +
            '<th>Nombres</th>' +
            '<th>Entida EPS</th>' +
            '<th>Fecha de nacimiento</th>' +
            '<th>Ciudad</th>' +
            '</tr></thead>' +
            '<tbody>' +
            //registro existente
            '<tr class="encontrado">' +
            `<td>${$_BUSQ['CEDULA']}</td>` +
            `<td>${$_BUSQ['NOMBRES']}</td>` +
            `<td>${$_BUSQ['EPS']}</td>` +
            `<td>${$_ANONACIMPACIW + '/' + $_MESNACIMPACIW + '/' + $_DIANACIMPACIW}</td>` +
            `<td>${$_BUSQ['CIUDA']}</td></tr>` +
            '</tbody>' +
            '</table>' +
            '</div>' //cierrra portlety
        ,
        buttons: {
            Aceptar: {
                span: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanaDuplicado.off('show.bs.modal');
                    reprocesarDatosPaci_7767();
                }
            }
        }
    })
}

function reprocesarDatosPaci_7767() {
    CON851P('07', _dato3_7767, pacienteexistente_7767)
}
function pacienteexistente_7767() {
    let URL = get_url("APP/SALUD/SER810-1.DLL");
    postData({
        datosh: datosEnvio() + $_BUSQ.CEDULA.padStart(15, '0') + "|",
    }, URL)
        .then(data => {
            $_PACIENTE110C = data["REG-PACI"];
            $_APELLIDO1PACW = $_PACIENTE110C[0]["APELL-PACI1"].trim();
            $_PERAPEL1PACIW = $_APELLIDO1PACW.substring(0, 1);
            $_PERAPEL2PACIW = $_APELLIDO1PACW.substring(1, 14);
            $_APELLIDO2PACW = $_PACIENTE110C[0]["APELL-PACI2"].trim();
            $_PERANOM1PACIW = $_APELLIDO2PACW.substring(0, 1);
            $_PERANOM2PACIW = $_APELLIDO2PACW.substring(1, 14);
            $_NOMBRE1PACW = $_PACIENTE110C[0]["NOM-PACI1"].trim();
            $_NOMBRE2PACW = $_PACIENTE110C[0]["NOM-PACI2"].trim();
            $_NACIMPACIW = $_PACIENTE110C[0].NACIM.trim();
            $_ANOPACW = $_NACIMPACIW.substring(0, 4);
            $_MESPACW = $_NACIMPACIW.substring(4, 6);
            $_DIAPACW = $_NACIMPACIW.substring(6, 8);
            $_GRPSANGPACIW = $_PACIENTE110C[0]["GRP-SANG"].trim();
            $_RHPACIW = $_PACIENTE110C[0].RH.trim();
            $_SEXOPACIW = $_PACIENTE110C[0].SEXO.trim();
            $_ESTCIVILPACIW = $_PACIENTE110C[0]["EST-CIV"].trim();
            $_NIVESTUPACIW = $_PACIENTE110C[0]["NIV-ESTUD"].trim();
            $_ZONAPACIW = $_PACIENTE110C[0].ZONA.trim();
            $_PADREPACIW = $_PACIENTE110C[0].PADRE.trim();
            $_MADREPACIW = $_PACIENTE110C[0].MADRE.trim();
            $_DIRPACIW = $_PACIENTE110C[0].DIRECC.trim();
            $_TELPACIW = $_PACIENTE110C[0].TELEFONO.trim();
            $_CELPACIW = $_PACIENTE110C[0].CEL.trim();
            $_CIUPACIW = $_PACIENTE110C[0].CIUDAD.trim();
            $_NOMCIUPACIW = $_PACIENTE110C[0]["DESCRIP-CIUDAD"].trim();
            $_OCUPPACIW = $_PACIENTE110C[0]["OCUP-V8"].trim();
            $_NOMOCUPPACIW = $_PACIENTE110C[0]["NOMBRE-OCUP"].trim();
            $_PAISPACIW = $_PACIENTE110C[0]["PAIS-ORIG"].trim();
            $_ESTRATOPACIW = $_PACIENTE110C[0].ESTRATO.trim();
            $_COPAGOPACIW = $_PACIENTE110C[0].COPAGO.trim();
            $_REGIMENPACIW = $_PACIENTE110C[0].TIPO.trim();
            $_INSTITUTOPACIW = $_PACIENTE110C[0].INSTITUTO.trim();
            $_DESCRIPINSTIPACIW = $_PACIENTE110C[0]["DESCRIP-INST"].trim();
            $_ETNIAPACIW = $_PACIENTE110C[0].ETNIA.trim();
            $_TIPOAFILPACIW = $_PACIENTE110C[0]["TIPO-AFIL"].trim();
            $_PORTABPACIW = $_PACIENTE110C[0].PORTABILIDAD.trim();
            $_CIUDASEGPACIW = $_PACIENTE110C[0]["CIUDAD-ASEG"].trim();
            $_EPSPACIW = $_PACIENTE110C[0].EPS.trim();
            $_NOMEPSPACIW = $_PACIENTE110C[0]["NOMBRE-EPS"].trim();
            $_CONTRATOPACIW = $_PACIENTE110C[0].CONTRATO.trim();
            $_FECHAAFILPACIW = $_PACIENTE110C[0]["FECHA-AFIL"].trim();
            $_FICHAPACIW = $_PACIENTE110C[0].FICHA.trim();
            $_LUGARIDPACIW = $_PACIENTE110C[0]["LUGAR-ID"].trim();
            $_CARNETPACIW = $_PACIENTE110C[0]["NRO-AFIL"].trim();
            $_FECHAVENCEPACIW = $_PACIENTE110C[0]["FECHA-VENCE"].trim();
            $_FECHADEMPACIW = $_PACIENTE110C[0]["FECHA-DEMAN-INDU"].trim();
            $_DEMANINDPACIW = $_PACIENTE110C[0]["DEMAN-INDU"].trim();
            $_IDCOTIPACIW = $_PACIENTE110C[0]["ID-COTIZ"].trim();
            $_DESCRIPCOTIPACW = $_PACIENTE110C[0]["NOMBRE-COTIZ"].trim();
            $_PARENTPACIW = $_PACIENTE110C[0]["PARENT"].trim();
            $_VICTICONFLICPACIW = $_PACIENTE110C[0]["VICTI-CONFLICTO"].trim();
            $_PROGEPSPACIW = $_PACIENTE110C[0]["PROG-ESP"].trim();
            $_ALTCOSPACIW = $_PACIENTE110C[0]["ALT-COS"].trim();
            $_TUTELAPACIW = $_PACIENTE110C[0].TUTELA.trim();
            $_EMPRESAPACIW = $_PACIENTE110C[0].EMPRESA.trim();
            $_CRONICOPACIW = $_PACIENTE110C[0].CRONICO.trim();
            $_PATOLCRONICPACIW = $_PACIENTE110C[0]["PATOL-CRONIC"].trim();
            $_CLASIFPACIW = $_PACIENTE110C[0].CLASIF.trim();
            $_CERTESTUDPACIW = $_PACIENTE110C[0]["CERT-ESTUD"].trim();
            $_PERIESTUDPACIW = $_PACIENTE110C[0]["PERI-ESTUD"].trim();
            $_ULTMAMOPACIW = $_PACIENTE110C[0]["ULT-MAMO"].trim();
            $_CERTECONOPACIW = $_PACIENTE110C[0]["CERT-ECONO"].trim();
            $_PERIECOPACIW = $_PACIENTE110C[0]["PERI-ECO"].trim();
            $_MULTICONSULPACIW = $_PACIENTE110C[0].MULTICONSUL.trim();
            $_RESTAPLIPACIW = $_PACIENTE110C[0]["REST-APLI"].trim();
            $_RESTDROGPACIW = $_PACIENTE110C[0]["REST-DROG"].trim();
            $_RESTCIRUPACIW = $_PACIENTE110C[0]["REST-CIRU"].trim();
            $_RESTLABOPACIW = $_PACIENTE110C[0]["REST-LABO"].trim();
            $_RESTIMAGPACIW = $_PACIENTE110C[0]["REST-IMAG"].trim();
            $_RESTESTAPACIW = $_PACIENTE110C[0]["REST-ESTA"].trim();
            $_RESTCONSPACIW = $_PACIENTE110C[0]["REST-CONS"].trim();
            $_RESTTERFPACIW = $_PACIENTE110C[0]["REST-TERF"].trim();
            $_RESTTEROPACIW = $_PACIENTE110C[0]["REST-TERO"].trim();
            $_RESTADONPACIW = $_PACIENTE110C[0]["REST-ODON"].trim();
            $_RESTPYPPACIW = $_PACIENTE110C[0]["REST-PYP"].trim();
            $_VCMPACIW = $_PACIENTE110C[0]["VICT-ABUSO-SEX"].trim();
            $_DERECHOPACIW = $_PACIENTE110C[0].DERECHO.trim();
            $_OBSERVPACIW = $_PACIENTE110C[0].OBSERV.trim();
            $_DISCAPPACIW = $_PACIENTE110C[0].DISCAP.trim();
            $_EMBALTOPACIW = $_PACIENTE110C[0]["EMB-ALTO-RIESG"].trim();
            $_ENTIFACTPACIW = $_PACIENTE110C[0]["NIT-FACT"].trim();
            $_NITFACTPACIW = $_PACIENTE110C[0]["NIT-FACT"].trim();
            $_DESCRIPENTIPACIW = $_PACIENTE110C[0]["DESCRIP-NIT-FACT"].trim();
            $_FECHANITPACIW = $_PACIENTE110C[0]["FECHA-NIT"].trim();
            $_ANTCANCERPACIW = $_PACIENTE110C[0]["ANTECED-CANCER"].trim();
            $_MEDFAMIPACIW = $_PACIENTE110C[0]["MED-FAMI"].trim();
            $_DESCRIPMEDPACIW = $_PACIENTE110C[0]["NOMBRE-MED-FAMI"].trim();
            $_DECRIPPACIW = $_PACIENTE110C[0].DESCRIP.trim();
            $_COMUNIPACW = $_PACIENTE110C[0]["NOM-COMUNIDAD"].trim();
            $_RESGUARPACIW = $_PACIENTE110C[0]["NOM-RESGUARDO"].trim();
            $_EMAILPACIW = $_PACIENTE110C[0]["E-MAIL"].trim();
            $_OPERCREAPACIW = $_PACIENTE110C[0]["OPER-CREA"].trim();
            $_FECHACREAPACIW = $_PACIENTE110C[0]["FECHA-CREA"].trim();
            $_HORACREAPACIW = $_PACIENTE110C[0]["HORA-CREA"].trim();
            $_OPERMODIFPACIW = $_PACIENTE110C[0]["OPER-CORR"].trim();
            $_FECHAMODIFPACIW = $_PACIENTE110C[0]["FECHA-CORR"].trim();
            $_HORAMODIFPACIW = $_PACIENTE110C[0]["HORA-CORR"].trim();
            $_TIPOACOMPPACIW = $_PACIENTE110C[0]["TIPO-ID-ACOMP"].trim();
            $_IDACOMPPACIW = $_PACIENTE110C[0]["ID-ACOMP"].trim();
            $_NOMB1ACOMPPACIW = $_PACIENTE110C[0]["NOM-ACOMP2"].trim().substring(0, 12);
            $_NOMB2ACOMPPACIW = $_PACIENTE110C[0]["NOM-ACOMP2"].trim().substring(13, 24)
            $_APEL1ACOMPPACIW = $_PACIENTE110C[0].ACOMPA.trim().substring(0, 15);
            $_APEL2ACOMPPACIW = $_PACIENTE110C[0].ACOMPA.trim().substring(16, 30)
            $_TELACOMPACIW = $_PACIENTE110C[0]["TEL-ACOM"].trim();
            $_CODBARRIOPACIW = $_PACIENTE110C[0]["COD-BARRIO"].trim();
            $_DESCRIPBARRIOS = $_PACIENTE110C[0]["NOMBRE-MED-FAMI"].trim();
            $_TIPOPACIW = $_PACIENTE110C[0]["TIPO-ID"].trim();
            $_LUGARIDPACIW = $_PACIENTE110C[0]["LUGAR-ID"].trim();
            $_TIENEPAGAREW = $_PACIENTE110C[0].PAGARE.trim()
            $_FACTURAPAGAREW = $_PACIENTE110C[0]["FACT-PAGARE"].trim()
            $_VALORPAGAREW = $_PACIENTE110C[0]["VALOR-PAGARE"].trim()
            $_FECHANOTAPACIW = $_PACIENTE110C[0]["FECHA-NOTA"].trim()
            $_OBSERVNOTAPACIW = $_PACIENTE110C[0]["OBSERV-NOTA"].trim()
            $_OPEROBSERNOTAPACIW = $_PACIENTE110C[0]["OPER-OBSE-NOTA"]
            $_FACTNOTAPACIW = $_PACIENTE110C[0]["FACT-NOTA"]
            $_RESULTADOCOVIDPACIW = $_PACIENTE110C[0].RESULT_COVID.trim()
            $('#lugar_110c').val($_LUGARIDPACIW);
            $('#identif_110c').val($_TIPOPACIW);
            primerapellido_SER110C.typedValue = $_APELLIDO1PACW;
            segundoapellido_SER110C.typedValue = $_APELLIDO2PACW;
            primernombre_SER110C.typedValue = $_NOMBRE1PACW;
            segundonombre_SER110C.typedValue = $_NOMBRE2PACW;
            $_ANONACIMPACIW = $_NACIMPACIW.substring(0, 4);
            $_MESNACIMPACIW = $_NACIMPACIW.substring(4, 6);
            $_DIANACIMPACIW = $_NACIMPACIW.substring(6, 8);
            $('#anonac_110c').val($_ANONACIMPACIW);
            $('#mesnac_110c').val($_MESNACIMPACIW);
            $('#dianac_110c').val($_DIANACIMPACIW);
            var edad = calcular_edad($_NACIMPACIW);
            $("#edad_110c").val(edad.unid_edad + edad.vlr_edad.toString().padStart('0'));
            $_UNIDEDADW = edad.unid_edad;
            $_VLREDADW = edad.vlr_edad.toString().padStart('0');
            $('#gruposang_110c').val($_GRPSANGPACIW);
            $('#rh_110c').val($_RHPACIW);
            $('#sexo_110c').val($_SEXOPACIW);
            let estadocivil = { 'S': 'SOLTERO', 'C': 'CASADA', 'U': 'UNION LIBRE', 'V': 'VIUDO', 'D': 'SEPARADO' };
            $('#civil_110c').val($_ESTCIVILPACIW + ' - ' + estadocivil[$_ESTCIVILPACIW]);
            let nivelestudio = { '1': 'NINGUNO', '2': 'PRE-ESCOL', '3': 'PRIMARIA', '4': 'SECUNDARIA', '5': 'BACH.BASI', '6': 'BACH.TECN', '7': 'NORMALIST', '8': 'TECN.PROFE', '9': 'TECNOLOGI', 'A': 'PROFESION', 'B': 'ESPECIALI', 'C': 'MAESTRIA', 'D': 'DOCTORADO' };
            $('#estudio_110c').val($_NIVESTUPACIW + ' - ' + nivelestudio[$_NIVESTUPACIW]);
            $('#zona_110c').val($_ZONAPACIW);
            $('#padre_110c').val($_PADREPACIW);
            $('#madre_110c').val($_MADREPACIW);
            $('#direccion_110c').val($_DIRPACIW);
            $('#tel1_110c').val($_TELPACIW);
            $('#tel2_110c').val($_CELPACIW);
            $('#ciudad_110c').val($_CIUPACIW);
            $('#ciudadd_110c').val($_NOMCIUPACIW);
            $('#ocupacion_110c').val($_OCUPPACIW);
            $('#ocupaciond_110c').val($_NOMOCUPPACIW);
            $('#pais_110c').val($_PAISPACIW);
            $('#barrio_110c').val($_CODBARRIOPACIW);
            $('#descripbarrio_110c').val($_DESCRIPBARRIOS);
            let nivel = { '0': 'NIVEL 0', '1': 'NIVEL 1', '2': 'NIVEL 2', '3': 'NIVEL 3', '4': 'NIVEL 4', '5': 'NIVEL 5', '6': 'NIVEL 6' };
            $('#nivel_110c').val($_ESTRATOPACIW + ' - ' + nivel[$_ESTRATOPACIW]);
            $('#copago_110c').val($_COPAGOPACIW);
            let regimen = { 'C': 'CONTRIBUTIVO', 'S': 'SUBSIDIADO', 'V': 'VINCULADO', 'P': 'PARTICULAR', 'O': 'OTRO TIPO', 'D': 'DESPLAZ CONT', 'E': 'DESPLAZ SUBS', 'G': 'DESPLAZ VINC' };
            $('#regimen_110c').val($_REGIMENPACIW + ' - ' + regimen[$_REGIMENPACIW]);
            $('#colegio_110c').val($_INSTITUTOPACIW.trim());
            $('#colegiod_110c').val($_DESCRIPINSTIPACIW);
            let etnia = { '1': 'INGENA', '2': 'RAIZAL', '3': 'GITANO', '4': 'AFROCO', '5': 'ROM', '6': 'MESTIZO', '9': 'NO APLICA' };
            $('#etnia_110c').val($_ETNIAPACIW + ' - ' + etnia[$_ETNIAPACIW]);
            $('#comunidades_110c').val($_COMUNIPACW);
            $('#resguardos_110c').val($_RESGUARPACIW);
            let afiliado = { '1': 'COTIZANTE', '2': 'BENEFICIARIO', '3': 'COT. PENSIONADO', '4': 'UPC ADICIONAL', '5': 'CABEZA FAMILIA', '6': 'GRUPO FAMILIAR', '0': 'SIN DETERMINAR' };
            $('#tipoafil_110c').val($_TIPOAFILPACIW + ' - ' + afiliado[$_TIPOAFILPACIW]);
            $('#portabilidad_7767').val($_PORTABPACIW);
            $('#ciudadportab_7767').val($_CIUDASEGPACIW);
            $('#eps_110c').val($_EPSPACIW);
            $('#epsd_110c').val($_NOMEPSPACIW);
            $('#contrato_110c').val($_CONTRATOPACIW);
            $_ANOAFILPACIW = $_FECHAAFILPACIW.substring(0, 4);
            $_MESAFILPACIW = $_FECHAAFILPACIW.substring(4, 6);
            $_DIAAFILPACIW = $_FECHAAFILPACIW.substring(6, 8);
            $('#fechaafil_110c').val($_ANOAFILPACIW + '/' + $_MESAFILPACIW + '/' + $_DIAAFILPACIW);
            $('#ficha_110c').val($_FICHAPACIW);
            $('#carnet_110c').val($_CARNETPACIW);
            $_ANOVENCEPACIW = $_FECHAVENCEPACIW.substring(0, 4);
            $_MESVENCEPACIW = $_FECHAVENCEPACIW.substring(4, 6);
            $_DIAVENCEPACIW = $_FECHAVENCEPACIW.substring(6, 8);
            $('#fechavence_110c').val($_ANOVENCEPACIW + '/' + $_MESVENCEPACIW + '/' + $_DIAVENCEPACIW);
            if ($_FECHAVENCEPACIW > $_FECHAACTUAL) {
                $_DERECHOPACIW = '2';
                $_CLASIFPACIW = 'R';
            }
            $_ANODEMPACIW = $_FECHADEMPACIW.substring(0, 4);
            $_MESDEMPACIW = $_FECHADEMPACIW.substring(4, 6);
            $_DIADEMPACIW = $_FECHADEMPACIW.substring(6, 8);
            $('#fechademan_110c').val($_ANODEMPACIW + '/' + $_MESDEMPACIW + '/' + $_DIADEMPACIW);
            $('#demandaindu_110c').val($_DEMANINDPACIW);
            $('#cotizante_110c').val($_IDCOTIPACIW);
            $('#cotizanted_110c').val($_DESCRIPCOTIPACW);
            let parentezco = { '01': 'CONYUGUE', '02': 'HIJO', '03': 'PADRES', '04': '2 GRADO', '05': '3 GRADO', '06': '< 12', '07': 'SUEGRO', '08': 'OTR-BE', '00': 'COTIZANTE' };
            $('#parentezco_110c').val($_PARENTPACIW + ' - ' + parentezco[$_PARENTPACIW]);
            $('#victimac_110c').val($_VICTICONFLICPACIW);
            $('#proespecial_110c').val($_PROGEPSPACIW);
            $('#altocosto_110c').val($_ALTCOSPACIW);
            $('#pacitutela_110c').val($_TUTELAPACIW);
            $('#empresalab_110c').val($_EMPRESAPACIW);
            $('#cronica_110c').val($_CRONICOPACIW);
            $('#patologiacronica_110c').val($_PATOLCRONICPACIW);
            $('#clasif_110c').val($_CLASIFPACIW);
            $_ANOCERTESTUDPACIW = $_CERTESTUDPACIW.substring(0, 4);
            $_MESCERTESTUDPACIW = $_CERTESTUDPACIW.substring(4, 6);
            $('#fechamatr_110c').val($_ANOCERTESTUDPACIW + '/' + $_MESCERTESTUDPACIW);
            $('#matr_110c').val($_PERIESTUDPACIW);
            $_ANOULTMAMOPACIW = $_ULTMAMOPACIW.substring(0, 4);
            $_MESULTMAMOPACIW = $_ULTMAMOPACIW.substring(4, 6);
            $('#mamografia_110c').val($_ANOULTMAMOPACIW + '/' + $_MESULTMAMOPACIW);
            $_ANOCERTECONOPACIW = $_CERTECONOPACIW.substring(0, 4);
            $_MESCERTECONOPACIW = $_CERTECONOPACIW.substring(4, 6);
            $('#fechaecono_110c').val($_ANOCERTECONOPACIW + '/' + $_MESCERTECONOPACIW);
            $('#econo_110c').val($_PERIECOPACIW);
            $('#policonsul_110c').val($_MULTICONSULPACIW);
            $('#restric_110c').val($_RESTAPLIPACIW);
            $('#drog_110c').val($_RESTDROGPACIW);
            $('#cirug_110c').val($_RESTCIRUPACIW);
            $('#lab_110c').val($_RESTLABOPACIW);
            $('#rx_110c').val($_RESTIMAGPACIW);
            $('#estanc_110c').val($_RESTESTAPACIW);
            $('#consult_110c').val($_RESTCONSPACIW);
            $('#fisiot_110c').val($_RESTTERFPACIW);
            $('#terap_110c').val($_RESTTEROPACIW);
            $('#odont_110c').val($_RESTADONPACIW);
            $('#pyp_110c').val($_RESTPYPPACIW);
            $('#vcm_110c').val($_VCMPACIW);
            let derecho = { '1': 'En base de datos, ACTIVO', '2': 'En base de datos, INACTIVO', '3': 'Creado por el  usuario', '4': 'Pendiente por determinar', '5': 'En base de datos, SIN CARNET', '6': 'SUSPENDIDO, requiere autoriz', '7': 'Afiliado Fallecido', '8': 'Retiro X Multiafiliado', '9': 'Ingreso X Traslado', 'A': 'Retiro  X Traslado', 'B': 'Periodo integral' };
            $('#basedatos_110c').val($_DERECHOPACIW + ' - ' + derecho[$_DERECHOPACIW]);
            $('#observaciones_110c').val($_OBSERVPACIW);
            let discapacidad = { '1': 'SIN DISCAPACI', '2': 'DISC.FISICA', '3': 'DISC.AUDITIVA', '4': 'DISC.VISUAL', '5': 'DISC.MENTAL', '6': 'DISC.COGNITIV' };
            $('#discapacidad_110c').val($_DISCAPPACIW + ' - ' + discapacidad[$_DISCAPPACIW]);
            $('#altoriesgo_110c').val($_EMBALTOPACIW);
            $('#entidad_110c').val($_ENTIFACTPACIW);
            $('#entidadd_110c').val($_DESCRIPENTIPACIW);
            $('#fechasistd_110c').val($_FECHANITPACIW);
            if ($_MEDFAMIPACIW == '0000000000') $_MEDFAMIPACIW = '';
            $('#medicofam_110c').val($_MEDFAMIPACIW);
            $('#medicofamd_110c').val($_DESCRIPMEDPACIW);
            // $('#correopacie_110c').val($_EMAILPACIW);
            if ($_NITUSU == '0830092718' || $_NITUSU == '0830092719' || $_NITUSU == '0900193162') {
                $('#EMAIL2_SER110C').removeClass('hidden');
                $("#correo2_110c").val($_EMAILPACIW);
            }
            $('#fact_110c').val($_OPERCREAPACIW);
            $('#fechaact_110c').val($_FECHACREAPACIW);
            $_HORACREA = $_HORACREAPACIW.substring(0, 2);
            $_MINCREA = $_HORACREAPACIW.substring(2, 4);
            $('#hr_110c').val($_HORACREA + ':' + $_MINCREA);
            $('#modificado_110c').val($_OPERMODIFPACIW);
            $('#fechamodif_110c').val($_FECHAMODIFPACIW);
            $_HORAMOD = $_HORAMODIFPACIW.substring(0, 2);
            $_MINMOD = $_HORAMODIFPACIW.substring(2, 4);
            $('#hrmodif_110c').val($_HORAMOD + ':' + $_MINMOD);
            _evaluargruposang_7767();
        })
        .catch(error => {
            console.error(error)
            _evaluarpaciente_7767()
        });
}

function _evaluargruposang_7767() {
    if ($_NITUSU == "0900019291") {
        $_GRPSANGPACIW = ''
        $_RHPACIW = ''
        _evaluarsexo_7767();
    } else {
        validarInputs({
            form: "#GRUPOSANG_110C",
            orden: "1",
            event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluargruposang_7767) },
            event_f9: () => { _datoscompletfamiliar_7767(_evaluargruposang_7767) }
        },
            _evaluaranonac_7767,
            () => {
                $_GRPSANGPACIW = $("#gruposang_110c").val()
                if ($_GRPSANGPACIW.trim() == '') {
                    CON851('2C', '2C', null, 'error', 'error');
                    $_RHPACIW = '';
                    $("#rh_110c").val($_RHPACIW);
                    _evaluarsexo_7767();
                } else if (($_GRPSANGPACIW == 'A') || ($_GRPSANGPACIW == 'B') || ($_GRPSANGPACIW == 'AB') || ($_GRPSANGPACIW == 'O')) {
                    _evaluarrh_7767();
                } else {
                    CON851('03', '03', null, 'error', 'error');
                    _evaluargruposang_7767();
                }
            }
        )
    }
}


function _evaluarrh_7767() {
    validarInputs({
        form: "#RH_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrh_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrh_7767) }
    },
        _evaluargruposang_7767,
        () => {
            $_RHPACIW = $("#rh_110c").val();
            if ($_RHPACIW == '+' || $_RHPACIW == '-') {
                _evaluarsexo_7767();
            } else if ($.isNumeric($_RHPACIW)) {
                CON851('2C', '2C', _evaluarrh_7767(), 'error', 'error');
            } else {
                CON851('03', '03', _evaluarrh_7767(), 'error', 'error');
            }
        }
    )
}

function _evaluarsexo_7767() {
    validarInputs({
        form: "#SEXO_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarsexo_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarsexo_7767) }
    },
        _evaluargruposang_7767,
        () => {
            $_SEXOPACIW = $("#sexo_110c").val();
            if (($_SEXOPACIW == 'M') || ($_SEXOPACIW == 'F')) {
                datoestadocivil();
            } else if ($_SEXOPACIW.trim() == '') {
                CON851('', 'Debe indicar el sexo del paciente', _evaluarsexo_7767(), 'error', 'Error');
            } else if ($.isNumeric($_SEXOPACIW)) {
                _evaluarsexo_7767();
            } else {
                _evaluarsexo_7767();
            }
        }
    )
}

function datoestadocivil() {
    if ($_NITUSU == '0900019291') {
        $_ESTCIVILPACIW = 'S';
        $_ZONAPACIW = 'U';
        $_CIUDASEGPACIW = $_CODCIUDADUSU;
        _evaluarocupacion_7767();
    } else if ((($_UNIDEDADW == 'D') || ($_UNIDEDADW == 'M')) || ($_VLREDADW < 16)) {
        $_ESTCIVILPACIW = 'S';
        $("#civil_110c").val('S - SOLTERO')
        setTimeout(validacionestudio_7767, 300)
    } else {
        setTimeout(_validarcivilpac_7767, 300)
        //     setTimeout(() => { _validarcivilpac_7767() }, 300);
    }
}

function _validarcivilpac_7767() {
    var civil = [
        { 'COD': 'S', 'DESCRIP': 'SOLTERO' },
        { 'COD': 'C', 'DESCRIP': 'CASADO' },
        { 'COD': 'U', 'DESCRIP': 'UNION LIBRE' },
        { 'COD': 'V', 'DESCRIP': 'VIUDO' },
        { 'COD': 'D', 'DESCRIP': 'SEPARADO' },
    ]
    POPUP({
        array: civil,
        titulo: 'ESTADO CIVIL',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_ESTCIVILPACIW,
        callback_f: _evaluarsexo_7767,
        teclaAlterna: true
    },
        _evaluarestadocivil_7767);
}

function _evaluarestadocivil_7767(data) {
    $_ESTCIVILPACIW = data.COD;
    switch (data.COD) {
        case 'S':
        case 'C':
        case 'U':
        case 'V':
        case 'D':
            setTimeout(validacionestudio_7767, 300);
            break;
    }
    $("#civil_110c").val(data.COD + " - " + data.DESCRIP);
}


function validacionestudio_7767() {
    var nivelest = [{ "COD": "1", "DESCRIP": "NINGUNO" },
    { "COD": "2", "DESCRIP": "PRE-ESCOL" },
    { "COD": "3", "DESCRIP": "PRIMARIA" },
    { "COD": "4", "DESCRIP": "SECUNDARIA" },
    { "COD": "5", "DESCRIP": "BACH. BASIC" },
    { "COD": "6", "DESCRIP": "BACH. TECN" },
    { "COD": "7", "DESCRIP": "NORMALIST" },
    { "COD": "8", "DESCRIP": "TECN. PROFE" },
    { "COD": "9", "DESCRIP": "TECNOLOGI" },
    { "COD": "A", "DESCRIP": "PROFESION" },
    { "COD": "B", "DESCRIP": "ESPECIALI" },
    { "COD": "C", "DESCRIP": "MAESTRIA" },
    { "COD": "D", "DESCRIP": "DOCTORADO" }]
    POPUP({
        array: nivelest,
        titulo: 'NIVEL ESTUDIO',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: $_NIVESTUPACIW,
        callback_f: () => {
            setTimeout(_validarcivilpac_7767, 300)
        },
        teclaAlterna: true
    },
        _validarcalificacion_ser110c);
}

function _validarcalificacion_ser110c(nivelest) {

    $_NIVESTUPACIW = nivelest.COD;
    switch (nivelest.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case 'A':
        case 'B':
        case 'C':
        case 'D':
            _evaluarzona_7767();
            break;
        default:
            setTimeout(_validarcivilpac_7767, 300);
            break;
    }
    $("#estudio_110c").val(nivelest.COD + " - " + nivelest.DESCRIP);
}


function _evaluarzona_7767() {
    if ($_NOVEDAD7767 == '7' && $_ZONAPACIW.trim() == '') {
        $_ZONAPACIW = 'U';
        $("#zona_110c").val($_ZONAPACIW);
    }
    validarInputs({
        form: "#ZONA_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarzona_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarzona_7767) }
    },
        function () {
            setTimeout(validacionestudio_7767, 300)
        },
        () => {
            $_ZONAPACIW = $("#zona_110c").val();
            if ($_ZONAPACIW == 'U' || $_ZONAPACIW == 'R') {
                _datopadre_7767();
            } else {
                _evaluarzona_7767();
            }
        }
    )
}


function _datopadre_7767() {
    if ($_NITUSU == '0830092718' || $_NITUSU == '0830092719' || $_NITUSU == '0900193162') {
        _dato2gmail_7767();
    } else {
        if (($_UNIDEDADW == 'D' || $_UNIDEDADW == 'M') || ($_UNIDEDADW == 'A' && $_VLREDADW < 18)) {
            _evaluarpadre_7767();
        } else {
            if (($_NITUSU == '019381427') || ($_NITUSU == '017306492') || ($_NITUSU == '0800175901')) {
                _evaluarpadre_7767();
            } else {
                _evaluarciudad_7767();
            }
        }
    }
}

function _evaluarpadre_7767() {
    validarInputs({
        form: "#PADRE_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarpadre_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarpadre_7767) }
    }, function () {
        setTimeout(validacionestudio_7767, 300)
    },
        () => {
            $_PADREPACIW = $("#padre_110c").val();
            if (($_PADREPACIW.trim() == '') && ($_DPTCIUUSU == '85')) {
                CON851('02', '02', null, 'error', 'error');
                if ($_NOVEDAD7767 == '7') {
                    _datopadre_7767();
                } else {
                    _datomadre_7767();
                }
            } else {
                _datomadre_7767();
            }
        }
    )
}


function _datomadre_7767() {
    if ((($_UNIDEDADW == 'D') || ($_UNIDEDADW == 'M')) || (($_UNIDEDADW == 'A') && ($_VLREDADW < 18))) {
        /// NEXT SENTENCE
        _evaluarmadre_7767();
    } else {
        if (($_NITUSU == '019381427') || ($_NITUSU == '017306492') || ($_NITUSU == '0800175901')) {
            swinvalid = '0';
            _evaluarmadre_7767();
        } else {
            _evaluardireccion_7767();
        }
    }
}

function _evaluarmadre_7767() {
    validarInputs({
        form: "#MADRE_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarmadre_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarmadre_7767) }
    },
        function () {
            _evaluarpadre_7767();
        },
        () => {
            $_MADREPACIW = $("#madre_110c").val();
            if (($_MADREPACIW.trim() == '') && ($_DPTCIUUSU == '85')) {
                CON851('02', '02', null, 'error', 'error');
                if ($_NOVEDAD7767 == '7') {
                    _evaluarmadre_7767();
                }
            } else {
                _evaluarciudad_7767();
            }
        }
    )
}

function _evaluarciudad_7767() {
    if ((($_NOVEDAD7767 == '7') && ($_CIUPACIW.trim() == '')) || ($_CIUPACIW == '00000')) {
        $_CIUPACIW = $_CODCIUDADUSU;
        $("#ciudad_110c").val($_CIUPACIW);
    }
    validarInputs({
        form: "#CIUDAD_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarciudad_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarciudad_7767) }
    },
        function () { _evaluarzona_7767(); },
        () => {
            $_CIUPACIW = $("#ciudad_110c").val();
            $_CODCIUD1 = $_CIUPACIW.substring(0, 1);
            $_CODCIUD2 = $_CIUPACIW.substring(2, 5);

            if ($_CODCIUD2 == '000') {
                CON851('', 'Verifique codigo de ciudad', null, 'error', 'Error');
                _evaluarciudad_7767();
            } else {
                LLAMADO_DLL({
                    dato: [$_CIUPACIW],
                    callback: _dataSAL7767_04,
                    nombredll: 'SER110C_04',
                    carpeta: 'SALUD'
                });
            }
        })
}

function _dataSAL7767_04(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCIUDW = date[1].trim();
    $_ACTBARRIO = date[2].trim();
    if (swinvalid == "00") {
        $("#ciudadd_110c").val($_DESCRIPCIUDW);
        _datopais_7767();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarciudad_7767();
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
} function _datopais_7767() {
    if (($_TIPOPACIW == 'CE') || ($_TIPOPACIW == 'CD') || ($_TIPOPACIW == 'SC') ||
        ($_TIPOPACIW == 'PE') || ($_TIPOPACIW == 'CN') || ($_TIPOPACIW == 'ASI') ||
        ($_TIPOPACIW == 'MSI')) {
        _evaluarpais_7767();
    } else {
        _evaluartelefono1_7767()

    }
}

function _evaluarpais_7767() {
    validarInputs({
        form: "#PAIS_110C",
        orden: "1"
    },
        _evaluarciudad_7767,
        () => {
            $_PAISPACIW = $("#pais_110c").val().toUpperCase();
            $("#pais_110c").val($_PAISPACIW)
            LLAMADO_DLL({
                dato: [$_PAISPACIW, $_ADMINW],
                callback: _dataSAL7767_05,
                nombredll: 'SER110C_05',
                carpeta: 'SALUD'
            });
        })
}

function _dataSAL7767_05(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPPAISW = date[1].trim();
    if (swinvalid == "00") {
        $("#paisd_110c").val($_DESCRIPPAISW);
        _evaluartelefono1_7767();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _datopais_7767();
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}

function _evaluartelefono1_7767() {
    validarInputs({
        form: "#TELEFONO_110C",
        orden: "1"
    },
        _evaluarciudad_7767,
        () => {
            $_TELPACIW = $("#tel1_110c").val();
            if ($_TELPACIW.trim() == '' || !$.isNumeric($_TELPACIW)) {
                CON851('02', '02', null, 'error', 'error');
                _evaluartelefono1_7767();
            } else {
                _evaluartelefono2_7767();
            }
        })
}

function _evaluartelefono2_7767() {
    validarInputs({
        form: "#TELEFONO2_110C",
        orden: "1"
    },
        _evaluartelefono1_7767,
        () => {
            $_CELPACIW = $("#tel2_110c").val();
            if ($_CELPACIW.trim() == '') {
                $_CELPACIW = '';
                _evaluardireccion_7767();
            } else if (!$.isNumeric($_CELPACIW)) {
                _evaluartelefono2_7767()
            } else {
                _evaluardireccion_7767();
            }
        })
}

function _evaluardireccion_7767() {
    validarInputs({
        form: "#DIRECCION_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluardireccion_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluardireccion_7767) }
    },
        _evaluartelefono2_7767,
        () => {
            $_DIRPACIW = $("#direccion_110c").val();
            if ($_DIRPACIW.trim() == '') {
                CON851('84', '84', null, 'error', 'error');
                _evaluardireccion_7767();
            } else {
                if (($_ACTBARRIO != 'S') || ($_ACTBARRIO.trim() == '')) {
                    _evaluarocupacion_7767();
                } else {
                    _evaluarbarrio_7767();
                }
            }
        }
    )
}
function _evaluarbarrio_7767() {
    validarInputs({
        form: "#BARRIOS_110C",
        orden: "1"
    },
        _evaluardireccion_7767,
        () => {
            $_CODBARRIOPACIW = $("#barrio_110c").val();
            $_CIUBARRIOW = $_CODBARRIOPACIW.substring(0, 4)
            $_SECUBARRIOW = $_CODBARRIOPACIW.substring(5, 11)
            if ($_CIUBARRIOW == '00000') {
                _evaluarbarrio_7767();
            } else {
                $_LLAVEBARRIOSW = $_CODBARRIOPACIW + $_CIUPACIW;
                busquedabarrios = buscarDescrip_barrios($_LLAVEBARRIOSW);
                switch (busquedabarrios) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _evaluarbarrio_7767();
                    default:
                        $_DESCRIPBARRIOS = busquedabarrios.NOMBRE.trim();
                        $('#descripbarrio_110c').val($_DESCRIPBARRIOS);
                        _evaluarocupacion_7767();
                        break;
                }
            }
        })
}

function buscarDescrip_barrios() {
    var retornar = false;
    for (var i in $_BARRIOS_7767) {
        if ($_BARRIOS_7767[i].LLAVE.trim() == data) {
            retornar = $_BARRIOS_7767[i];
            break;
        }
    }
    return retornar;
}


function _evaluarocupacion_7767() {
    if ($_OCUPPACIW == '0000') {
        if (($_UNIDEDADW == 'D' || $_UNIDEDADW == 'M') || ($_VLREDADW < 18)) {
            $_OCUPPACIW = '9998'
            $("#ocupacion_110c").val($_OCUPPACIW);
        }
    }
    validarInputs({
        form: "#OCUPACION_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarocupacion_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarocupacion_7767) }
    },
        _evaluardireccion_7767,
        () => {
            $_OCUPPACIW = $("#ocupacion_110c").val();
            LLAMADO_DLL({
                dato: [$_OCUPPACIW],
                callback: _dataSAL7767_06,
                nombredll: 'SER110C_06',
                carpeta: 'SALUD'
            });
        })
}

function _dataSAL7767_06(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPOCUPAW = date[1].trim();
    if (swinvalid == "00") {
        $("#ocupaciond_110c").val($_DESCRIPOCUPAW);
        setTimeout(_evaluarestrato_7767, 300);
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarocupacion_7767();
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}


function _evaluarestrato_7767() {

    var estrato = [
        { "COD": "0", "DESCRIP": "NIVEL 0" },
        { "COD": "1", "DESCRIP": "NIVEL 1" },
        { "COD": "2", "DESCRIP": "NIVEL 2" },
        { "COD": "3", "DESCRIP": "NIVEL 3" },
        { "COD": "4", "DESCRIP": "NIVEL 4" },
        { "COD": "5", "DESCRIP": "NIVEL 5" },
        { "COD": "6", "DESCRIP": "NIVEL 6" }
    ]
    POPUP({
        array: estrato,
        titulo: 'NIVEL(Estrato)',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_ESTRATOPACIW,
        callback_f: _evaluarocupacion_7767,
        teclaAlterna: true
    },
        _datoestrato_7767);
}

function _datoestrato_7767(estrato) {

    $_ESTRATOPACIW = estrato.COD;
    switch (estrato.COD) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
            setTimeout(_evaluarcopago_7767, 500);
            break;
        default:
            setTimeout(_evaluarocupacion_7767, 500)
            break;
    }
    $("#nivel_110c").val(estrato.COD + " - " + estrato.DESCRIP);
}

function _evaluarcopago_7767() {
    if ($_NITUSU == '0830092718' || $_NITUSU == '0830092719') {
        if ($_COPAGOPACIW.trim() == '') {
            $_COPAGOPACIW = 'S';
            $("#copago_110c").val($_COPAGOPACIW);
        }
    } else {
        if ($_COPAGOPACIW != '' && $_NOVEDAD7767 == '7') {
            $_COPAGOPACIW = 'S';
            $("#copago_110c").val($_COPAGOPACIW);
        }
    }
    validarInputs({
        form: "#COPAGO_110C",
        orden: "1"
    },
        () => {
            setTimeout(_evaluarestrato_7767, 300)
        },
        () => {
            $_COPAGOPACIW = $("#copago_110c").val();
            if (($_COPAGOPACIW == 'S') || ($_COPAGOPACIW == 'N')) {
                _evaluarregimen_7767();
            } else {
                _evaluarcopago_7767();
            }

        }
    )
}
function _evaluarregimen_7767() {
    var tipousuario = [
        { "COD": "C", "DESCRIP": "CONTRIBUTIVO" },
        { "COD": "S", "DESCRIP": "SUBSIDIADO" },
        { "COD": "V", "DESCRIP": "VINCULADO" },
        { "COD": "P", "DESCRIP": "PARTICULAR" },
        { "COD": "O", "DESCRIP": "OTRO TIPO" },
        { "COD": "D", "DESCRIP": "DESPLAZ CONT" },
        { "COD": "E", "DESCRIP": "DESPLAZ SUBS" },
        { "COD": "G", "DESCRIP": "DESPLAZ VINC" }]
    POPUP({
        array: tipousuario,
        titulo: 'TIPO USUARIO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_REGIMENPACIW,
        callback_f: () => { setTimeout(_evaluarcopago_7767, 300) },
        teclaAlterna: true
    },
        _datoregimen2_7767);
}

function _datoregimen2_7767(tipousuario) {
    $_REGIMENPACIW = tipousuario.COD;
    switch (tipousuario.COD) {
        case 'C':
        case 'S':
        case 'V':
        case 'P':
        case 'O':
        case 'D':
        case 'E':
        case 'F':
            setTimeout(_mostrarregimen_7767, 300);
            break;
        default:
            _evaluarcopago_7767();
            break;
    }
    $("#regimen_110c").val(tipousuario.COD + " - " + tipousuario.DESCRIP);
}

function _mostrarregimen_7767() {
    if ($_NITUSU == '0900005594') {
        if (($_REGIMENPACIW == 'D') || ($_REGIMENPACIW == 'E') || ($_REGIMENPACIW == 'F')) {
            CON851('03', '03', null, 'error', 'error');
            _datoregimen_7767();
        } else {
            _evaluarcolegio_7767()
        }
    } else {
        _evaluarcolegio_7767()
    }
}

function _evaluarcolegio_7767() {
    validarInputs({
        form: "#COLEGIO_102",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarcolegio_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarcolegio_7767) }
    },
        function () {
            setTimeout(_evaluarregimen_7767, 300)
        },
        () => {
            $_INSTITUTOPACIW = $("#colegio_110c").val();
            if (($_INSTITUTOPACIW.trim() == "") || ($_INSTITUTOPACIW.trim() == "            ")) {
                $_INSTITUTOPACIW = '';
                $("#colegio_110c").val($_INSTITUTOPACIW);
                $_DESCRIPCOLEGIOW = 'COLEGIO NO ASIGNADO';
                $("#colegiod_110c").val($_DESCRIPCOLEGIOW);
                _evaluaretnia_7767();
            } else {
                LLAMADO_DLL({
                    dato: [$_INSTITUTOPACIW],
                    callback: _dataSAL7767_07,
                    nombredll: 'SER110C_07',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}

function _dataSAL7767_07(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCOLEGIOW = date[1].trim();
    if (swinvalid == "00") {
        $("#colegiod_110c").val($_DESCRIPCOLEGIOW);
        if ($_REGIMENPACIW == 'P') {
            $_ETNIAPACIW = '9';
            $("#etnia_110c").val($_ETNIAPACIW);
            _evaluartipoafiliado_7767();
        } else {
            _evaluaretnia_7767();
        }
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarcolegio_7767();
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}

function _evaluaretnia_7767() {
    var etnia = [
        { "COD": "1", "DESCRIP": "INDIGENA" },
        { "COD": "2", "DESCRIP": "RAIZAL" },
        { "COD": "3", "DESCRIP": "GITANO" },
        { "COD": "4", "DESCRIP": "AFROCO" },
        { "COD": "5", "DESCRIP": "ROM" },
        { "COD": "6", "DESCRIP": "MESTIZO" },
        { "COD": "9", "DESCRIP": "NO APLICA" }]
    POPUP({
        array: etnia,
        titulo: 'GRUPO ETNICO',
        indices: [{
            id: 'COD', label: 'DESCRIP'
        }],
        seleccion: $_ETNIAPACIW,
        callback_f: _evaluarcolegio_7767,
        teclaAlterna: true
    },
        _seleccionaretnia_7767);
}

function _seleccionaretnia_7767(etnia) {
    $_ETNIAPACIW = etnia.COD;
    switch (etnia.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '9':
            _validacionesetnia_7767();
            break;
        default:
            _evaluarcolegio_7767;
            break;
    }
    $("#etnia_110c").val(etnia.COD + " - " + etnia.DESCRIP);
}

function _validacionesetnia_7767() {
    if ($_ETNIAPACIW == '1') {
        let URL = get_url("APP/" + "SALUD/SER867" + ".DLL");
        postData({
            datosh: datosEnvio() + localStorage['Usuario'] + "|"
        }, URL)
            .then((data) => {
                loader("hide");
                $_ETNIAS = data.ETNIAS
                $_ETNIAS.pop()
                if ($_ETNIAS.length == 0) {
                    CON851('4J', '4J', null, 'error', 'error');
                    setTimeout(_evaluaretnia_7767, 300);
                } else {
                    _ventanaDatos({
                        titulo: 'VENTANA DE ETNIAS PACIENTES',
                        columnas: ["COD", "DESCRIP"],
                        data: $_ETNIAS,
                        callback_esc: function () {
                            setTimeout(_evaluarcopago_7767, 500);
                        },
                        callback: function (data) {
                            $_ETNIAPACIW = data.COD;
                            $("#indigena_110c").val($_ETNIAPACIW);
                            setTimeout(_validarcomunidad_SAL7767, 300);

                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                _validarcomunidad_SAL7767();
            });

    } else {
        _validarcomunidad_SAL7767();
    }
}
function _validarcomunidad_SAL7767() {
    if ((($_ETNIAPACIW == '1') || ($_ETNIAPACIW == '2')) && ($_NITUSU != '0845000038')) {
        let URL = get_url("APP/" + "SALUD/SER116A" + ".DLL");
        postData({
            datosh: datosEnvio() + localStorage['Usuario'] + "|"
        }, URL)
            .then((data) => {
                loader("hide");
                $_COMUNIDADES = data.COMUNIDADES;
                $_COMUNIDADES.pop();
                if ($_COMUNIDADES.length == 0) {
                    CON851('4X', '4X', null, 'error', 'error');
                    setTimeout(_evaluaretnia_7767, 500);
                } else {
                    _ventanaDatos({
                        titulo: 'VENTANA DE COMUNIDADES PACIENTES',
                        columnas: ["COD", "DESCRIP"],
                        data: $_COMUNIDADES,
                        callback_esc: function () {
                            setTimeout(_evaluaretnia_7767, 500);
                        },
                        callback: function (data) {
                            $_RESGUARPACIW = data.COD;
                            $("#comunidades_110c").val($_COMUNIPACW);
                            setTimeout(_validarresguardos_SAL7767, 300);

                        }
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                setTimeout(_evaluaretnia_7767, 500);
            });
    } else {
        setTimeout(_evaluartipoafiliado_7767, 300);
    }
}

function _validarresguardos_SAL7767() {
    if ((($_ETNIAPACIW == '1') || ($_ETNIAPACIW == '2')) && ($_NITUSU != '0845000038')) {
        let URL = get_url("APP/" + "SALUD/SER117A" + ".DLL");
        postData({
            datosh: datosEnvio() + localStorage['Usuario'] + "|"
        }, URL)
            .then((data) => {
                loader("hide");
                $_RESGUARDOS = data.RESGUARDOS;
                $_RESGUARDOS.pop();
                if ($_RESGUARDOS.length == 0) {
                    CON851('4Y', '4Y', null, 'error', 'error');
                    setTimeout(_evaluaretnia_7767, 300);
                } else {
                    _ventanaDatos({
                        titulo: 'VENTANA DE RESGUARDOS PACIENTES',
                        columnas: ["COD", "DESCRIP"],
                        data: $_RESGUARDOS,
                        callback_esc: function () {
                            setTimeout(_evaluaretnia_7767, 300);
                        },
                        callback: function (data) {
                            $_RESGUARPACIW = data.COD;
                            $("#resguardos_110c").val($_RESGUARPACIW);
                            setTimeout(_evaluartipoafiliado_7767, 300);

                        }
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                setTimeout(_evaluaretnia_7767, 500);
            });
    }
}

function _evaluartipoafiliado_7767() {
    var afiliado = [{ "COD": "1", "DESCRIP": "COTIZANTE" },
    { "COD": "2", "DESCRIP": "BENEFICIARIO" },
    { "COD": "3", "DESCRIP": "COT. PENSIONADO" },
    { "COD": "4", "DESCRIP": "UPC ADICIONAL" },
    { "COD": "5", "DESCRIP": "CABEZA FAMILIA" },
    { "COD": "6", "DESCRIP": "GRUPO FAMILIAR" },
    { "COD": "0", "DESCRIP": "SIN DETERMINAR" }]
    POPUP({
        array: afiliado,
        titulo: 'TIPO AFILIADO',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: $_TIPOAFILPACIW,
        callback_f: _evaluarcolegio_7767,
        teclaAlterna: true
    },
        _seleccionartipoafiliado_7767);
}

function _seleccionartipoafiliado_7767(afiliado) {
    $_TIPOAFILPACIW = afiliado.COD;
    switch (afiliado.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '0':
            _validacionestipoafiliado_7767();
            break;
        default:
            _evaluarcolegio_7767();
            break;
    }
    $("#tipoafil_110c").val(afiliado.COD + " - " + afiliado.DESCRIP);
}

function _validacionestipoafiliado_7767() {
    if (($_NITUSU == '0900405505') && ($_REGIMENPACIW != 'O')) {
        if (($_REGIMENPACIW != 'S') && (($_TIPOAFILPACIW == '5') || ($_TIPOAFILPACIW == '6'))) {
            ////CONTINUE 
            _evaluarportabilidad_7767();
        } else {
            if (($_REGIMENPACIW != 'C') && (($_TIPOAFILPACIW == '1') || ($_TIPOAFILPACIW == '2') || ($_TIPOAFILPACIW == '0'))) {
                // CONTINUE 
                _evaluarportabilidad_7767();
            } else {
                _seleccionartipoafiliado_7767();
            }
        }
    } else {
        _evaluarportabilidad_7767();
    }
}

function _evaluarportabilidad_7767() {
    validarInputs({
        form: "#PORTABILI_110C",
        orden: "1"
    },
        function () { setTimeout(_evaluartipoafiliado_7767, 300); },
        () => {
            $_PORTABPACIW = $("#portabilidad_7767").val();
            if ($_PORTABPACIW.trim() == '') {
                $_PORTABPACIW = 'N';
                $("#portabilidad_7767").val($_PORTABPACIW);
                $_CIUDASEGPACIW = $_CIUPACIW;
                $("#ciudadportab_7767").val($_CIUDASEGPACIW);
                datodesplazado_7767();
            } else if ($_PORTABPACIW == 'S') {
                _evaluarciudadaseg_7767();
            } else if ($_PORTABPACIW == 'N') {
                $_CIUDASEGPACIW = $_CIUPACIW;
                $("#ciudadportab_7767").val($_CIUDASEGPACIW);
                datodesplazado_7767();
            } else {
                CON851('02', '02', null, 'error', 'error');
                _evaluarportabilidad_7767();
            }
        }
    )
}

function _evaluarciudadaseg_7767() {
    validarInputs({
        form: "#CIUDADPORTA_110C",
        orden: '1'
    },
        function () { _evaluarportabilidad_7767(); },
        () => {
            $_CIUDASEGPACIW = $('#ciudadportab_7767').val();
            if (($_CIUDASEGPACIW == '00000') || ($_CIUDASEGPACIW.trim() == '')) {
                $_CIUDASEGPACIW = $_CIUPACIW;
                $("#ciudadportab_7767").val($_CIUDASEGPACIW);
                datodesplazado_7767();
            } else {
                LLAMADO_DLL({
                    dato: [$_CIUDASEGPACIW],
                    callback: _dataSAL7767_045,
                    nombredll: 'SER110C_04',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}
function _dataSAL7767_045(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCIUDASEGW = date[1].trim();
    if (swinvalid == "00") {
        datodesplazado_7767();
    } else if (swinvalid == "01") {
        CON851('', 'Revisar codigo de la ciudad', _evaluarciudadaseg_7767(), 'error', 'Error');
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}
function datodesplazado_7767() {
    if ((($_REGIMENPACIW == 'D') || ($_REGIMENPACIW == 'E') || ($_REGIMENPACIW == 'F')) && ($_TIPOAFILPACIW == '1')) {
        let { ipcRenderer } = require("electron");
        ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110D.html', cedula: $_CODPACIW });
        vector = ['on', 'Actualizando maestro de desplazados...']
        _EventocrearSegventana(vector, _evaluarentidadafiliada_7767);

    } else {
        _evaluarentidadafiliada_7767();
    }
}

function _evaluarentidadafiliada_7767() {
    validarInputs({
        form: "#AFILIADO_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarentidadafiliada_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarentidadafiliada_7767) }
    },
        _evaluarportabilidad_7767,
        () => {
            $_EPSPACIW = $("#eps_110c").val();
            if ($_EPSPACIW.trim() == '') {
                if ($_REGIMENPACIW == 'P') {
                    $_DESCRIPENTIPACIW = '';
                    $("#epsd_110c").val($_DESCRIPENTIPACIW);
                    $("#entidadd_110c").val($_DESCRIPENTIPACIW);
                    _validacionesentidadpaci_7767();
                } else {
                    CON851('02', '02', null, 'error', 'error');
                    _evaluarentidadafiliada_7767();
                }

            } else {
                LLAMADO_DLL({
                    dato: [$_EPSPACIW],
                    callback: _dataSAL7767_08,
                    nombredll: 'SER110C_08',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}

function _dataSAL7767_08(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPENTIPACIW = date[1].trim();
    $_NITENT = date[2].trim();
    if (swinvalid == "00") {
        $("#epsd_110c").val($_DESCRIPENTIPACIW);
        _validacionesentidadpaci_7767();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarentidadafiliada_7767();
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}

function _validacionesentidadpaci_7767() {
    if ($_ADMINW == 'ADMIN' || $_ADMINW == 'GEBC') {
        _validacionesentidadpaci2_7767();
    } else {
        if ($_EPSPACIW != EPSPACI) {
            if (($_EPSPACIW == 'SIN438') || (EPSPACI == 'SIN438')) {
                $_EPSPACIW = EPSPACI;
                _evaluarentidadafiliada_7767();
            } else {
                _validacionesentidadpaci2_7767();
            }
        } else {
            _validacionesentidadpaci2_7767();
        }
    }
}

function _validacionesentidadpaci2_7767() {
    if ($_ENTIFACTPACIW == $_NITENT) {
        _evaluarcontrato_7767();
    } else {
        $_ENTIFACTPACIW = $_NITENT;
        $('#entidad_110c').val($_NITENT);
        _evaluarcontrato_7767();
    }
}

function _evaluarcontrato_7767() {
    validarInputs({
        form: "#CONTRATO_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarcontrato_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarcontrato_7767) }
    },
        function () {
            _evaluarentidadafiliada_7767();
        },
        () => {
            $_CONTRATOPACIW = $("#contrato_110c").val();
            if (($_NITUSU == '0900405505') && ($_CONTRATOPACIW.trim() == '')) {
                _evaluarcontrato_7767();
            } else if (($_NITUSU == '0900405505') && ($_CONTRATOPACIW == '99')) {
                _evaluarcontrato_7767();
            } else if (($_NITUSU == '0830092718') && ($_NOVEDAD7767 == '7')) {
                _datomamo_7767();
            } else {
                if ($_USUA_GLOBAL[0].NIT == 892000264) {
                    _evaluarvictimaconfli_7767()
                } else {
                    _evaluarfechaafiliado();
                }
            }
        }
    )
}


function _evaluarfechaafiliado() {
    momentMaskfechaafil.updateValue();
    validarInputs({
        form: "#FECHAAFIL_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarfechaafiliado) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarfechaafiliado) }
    },
        _evaluarcontrato_7767,
        () => {
            $_FECHAAFILPACIW = momentMaskfechaafil.unmaskedValue;
            if ((($_EPSPACIW == 'EPS013') || ($_EPSPACIW == 'RES004')) && ($_FECHAAFILPACIW == '00000000')) {
                CON851('02', '02', null, 'error', 'error');
                _evaluarfechaafiliado();
                if ($_NITUSU == '0891855847') {
                    _evaluarfechaafiliado();
                }
            } else if ($_FECHAAFILPACIW.trim() == '' || $_FECHAAFILPACIW == '00000000') {
                $_FECHAAFILPACIW == '00000000'
                _evaluarcarnet_7767();

            } else if (($_FECHAACTUAL > 0) && ($_FECHAACTUAL < 1890)) {
                CON851('37', '37', null, 'error', 'error');
                _evaluarfechaafiliado();
            } else {
                _evaluarficha_7767();
            }
        }
    )
}

function _evaluarficha_7767() {
    validarInputs({
        form: "#FICHA_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarficha_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarficha_7767) }
    },
        _evaluarfechaafiliado,
        () => {
            $_FICHAPACIW = $("#ficha_110c").val();
            _evaluarcarnet_7767();
        }
    )
}

function _evaluarcarnet_7767() {
    validarInputs({
        form: "#CARNET_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarcarnet_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarcarnet_7767) }
    },
        _evaluarficha_7767,
        () => {
            $_CARNETPACIW = $("#carnet_110c").val();
            _datovencerestriccion_7767();
        }
    )
}

function _datovencerestriccion_7767() {
    $_OPSEGU = "IS7677";
    let datos_envio = datosEnvio()
    datos_envio += $_ADMINW + '|' + $_OPSEGU
    let URL = get_url("APP/CONTAB/CON904.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            _evaluarvence_7767();
        })
        .catch(err => {
            if ($_NOVEDAD7767 == '7') {
                momentMaskfechavence.updateValue();
                validarInputs({
                    form: "#FECHAVENCE_110C",
                    orden: "1"
                },
                    function () {
                        _evaluarcarnet_7767();
                    },
                    () => {
                        $_FECHAVENCEPACIW = momentMaskfechavence.unmaskedValue;
                        _evaluarfechaafiliado();
                    }
                )
            } else {
                _evaluarvence_7767();
            }
        })
}

function _evaluarvence_7767() {
    momentMaskfechavence.updateValue();
    validarInputs({
        form: "#FECHAVENCE_110C",
        orden: "1"
    },
        _evaluarcarnet_7767,
        () => {
            $_FECHAVENCEPACIW = momentMaskfechavence.unmaskedValue;
            if (($_FECHAVENCEPACIW == '00000000') || ($_FECHAVENCEPACIW.trim() == '')) {
                $_FECHAVENCEPACIW = '00000000'
                if (($_TIPOAFILPACIW == '1') || $_TIPOAFILPACIW == '3') {
                    $_IDCOTIPACIW = $_CODPACIW;
                    $_DESCRIPCOTIPACW = $_APELLIDO1PACW + ' ' + $_APELLIDO2PACW + ' ' + $_NOMBRE1PACW + ' ' + $_NOMBRE2PACW;
                    $_PARENTPACIW = '0';
                    $("#cotizante_110c").val($_IDCOTIPACIW);
                    $("#cotizanted_110c").val($_DESCRIPCOTIPACW);
                    $("#parentezco_110c").val('00 - COTIZANTE');

                    _evaluarempresa_7767();
                } else {
                    _datocotizante_7767();
                }
            } else {
                if ($_FECHAVENCEPACIW > $_FECHAACTUAL) {
                    CON851('02', '02', null, 'error', 'error');
                    $_CLASIFPACIW = 'R';
                    $("#clasif_110c").val($_CLASIFPACIW);
                    _evaluarvence_7767();
                } else {
                    if (($_TIPOAFILPACIW == '1') || $_TIPOAFILPACIW == '3') {
                        $_IDCOTIPACIW = $_CODPACIW;
                        $_DESCRIPCOTIPACW = $_APELLIDO1PACW + ' ' + $_APELLIDO2PACW + ' ' + $_NOMBRE1PACW + ' ' + $_NOMBRE2PACW;
                        $_PARENTPACIW = '00';
                        $("#cotizante_110c").val($_IDCOTIPACIW);
                        $("#cotizanted_110c").val($_DESCRIPCOTIPACW);
                        $("#parentezco_110c").val($_PARENTPACIW);

                        _evaluarempresa_7767();
                    } else {
                        _datocotizante_7767();
                    }
                }
            }
        }
    )
}
function _datocotizante_7767() {
    if (($_TIPOAFILPACIW == '2') || ($_TIPOAFILPACIW == '4')) {
        ///NEXT SENTENCE
        _evaluarcotizante_7767();
    } else {
        if ((($_REGIMENPACIW == 'V') || ($_REGIMENPACIW == 'P') || ($_REGIMENPACIW == 'O')) || (($_TIPOAFILPACIW == '1') || ($_TIPOAFILPACIW == '3'))) {
            // $_IDCOTIPACIW =  $_CODPACIW; 
            _evaluarcotizante_7767();
        } else {
            _evaluarcotizante_7767();
        }
    }
}

function _evaluarcotizante_7767() {
    validarInputs({
        form: "#COTIZANTE_102",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarcotizante_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarcotizante_7767) }
    },
        _evaluarvence_7767,
        () => {
            $_IDCOTIPACIW = $("#cotizante_110c").val();
            $_IDCOTIPACIW = cerosIzq($_IDCOTIPACIW, 15);
            $("#cotizante_110c").val($_IDCOTIPACIW);

            if (($_TIPOAFILPACIW == '2' || $_TIPOAFILPACIW == '4') && ($_IDCOTIPACIW == $_CODPACIW)) {
                CON851('03', '03', null, 'error', 'error');
                _datocotizante_7767()
            } else if (($_TIPOAFILPACIW == '2') && ($_IDCOTIPACIW == '000000000000000' || $_IDCOTIPACIW.trim() == '')) {
                CON851('02', '02', null, 'error', 'error');
                if (($_NITUSU == '0800162035') && ($_ADMINW == 'ALMB' || $_ADMINW == 'KAJU')) {
                    _evaluarempresa_7767();
                } else {
                    if ($_NITUSU == '0800037202') {
                        _evaluarempresa_7767()
                    } else {
                        _datocotizante_7767()
                    }
                }
            } else if ($_IDCOTIPACIW == '000000000000000') {
                $_IDCOTIPACIW = '000000000000000';
                $_DESCRIPCOTIPACW = '';
                $_PARENTPACIW = '00';
                $("#cotizante_110c").val($_IDCOTIPACIW);
                $("#cotizanted_110c").val($_DESCRIPCOTIPACW);
                $("#parentezco_110c").val($_PARENTPACIW);
                _evaluarempresa_7767();

            } else if (($_TIPOAFILPACIW == '1') || $_TIPOAFILPACIW == '3') {
                $_IDCOTIPACIW = $_CODPACIW;
                $_DESCRIPCOTIPACW = $_APELLIDO1PACW + ' ' + $_APELLIDO2PACW + ' ' + $_NOMBRE1PACW + ' ' + $_NOMBRE2PACW;
                $_PARENTPACIW = '00';
                $("#cotizante_110c").val($_IDCOTIPACIW);
                $("#cotizanted_110c").val($_DESCRIPCOTIPACW);
                $("#parentezco_110c").val($_PARENTPACIW);
                _evaluarempresa_7767();
            } else {
                if ($_IDCOTIPACIW == $_CODPACIW) {
                    $("#cotizanted_110c").val($_DECRIPPACIW);
                    _validatipocotizante_7767()
                } else {
                    consultarcotizante_7767();
                }
            }
        }
    )
}

function consultarcotizante_7767() {
    let URL = get_url("APP/SALUD/SER810-1.DLL");
    postData({
        datosh: datosEnvio() + $_IDCOTIPACIW.padStart(15, '0') + "|",
    }, URL)
        .then(data => {
            $_COTIZANTEW = data["REG-PACI"];
            $_DESCRIPCOTIPACW = $_COTIZANTEW[0].DESCRIP
            $_PARENTPACIW = $_COTIZANTEW[0]["TIPO-AFIL"].trim();
            if (($_PARENTPACIW == '1') || ($_PARENTPACIW == '3')) {
                $("#cotizanted_110c").val($_DESCRIPCOTIPACW);
                _validatipocotizante_7767()
            } else {
                CON851('03', '03', null, 'error', 'error');
                _datocotizante_7767();
            }
        })
        .catch(error => {
            console.error(error)
            CON851P('08', _datocotizante_7767, _crearcotizante_7767)
        });
}

function _crearcotizante_7767() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110CA.html', cedula: $_IDCOTIPACIW });
    vector = ['on', 'Actualizando maestro de pacientes...']
    _EventocrearSegventana(vector, _datocotizante_7767);
}

function _validatipocotizante_7767() {
    if (($_TIPOAFILPACIW == '0') || ($_TIPOAFILPACIW == '1') || ($_TIPOAFILPACIW == '3')) {
        $_PARENTPACIW = '00';
        $("#parentezco_110c").val($_PARENTPACIW);
        _evaluarempresa_7767();
    } else {
        _evaluarparentezcopaci_7767()
    }
}


function _evaluarparentezcopaci_7767() {
    var parentezco = [{ "COD": "1", "DESCRIP": "01 - CONYUGUE" },
    { "COD": "2", "DESCRIP": "02 - HIJO" },
    { "COD": "3", "DESCRIP": "03 - PADRES" },
    { "COD": "4", "DESCRIP": "04 - 2 GRADO" },
    { "COD": "5", "DESCRIP": "05 - 3 GRADO" },
    { "COD": "6", "DESCRIP": "06 - < 12" },
    { "COD": "7", "DESCRIP": "07 - SUEGRO" },
    { "COD": "8", "DESCRIP": "08 - OTR-BE" },
    { "COD": "0", "DESCRIP": "00 - COTIZANTE" }]
    POPUP({
        array: parentezco,
        titulo: 'RELACION CON EL COTIZ',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: $_PARENTPACIW,
        callback_f: _evaluarcotizante_7767,
        teclaAlterna: true
    },
        _seleccionrelacioncotiz_7767);
}

function _seleccionrelacioncotiz_7767(parentezco) {
    $_PARENTPACIW = parentezco.COD;
    switch (parentezco.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':

            _evaluarempresa_7767();
            break;
        case '0':
            if ($_TIPOAFILPACIW == '2') {
                CON851('03', '03', null, 'error', 'error');
                setTimeout(_evaluarparentezcopaci_7767, 300);
            } else {
                _evaluarempresa_7767();
            }
            break;
        default:
            _evaluarcotizante_7767();
            break;
    }
    $("#parentezco_110c").val(parentezco.COD + " - " + parentezco.DESCRIP);
}


function _evaluarempresa_7767() {
    $_PARENTPACIW = $_PARENTPACIW.padStart(2, '0')
    validarInputs({
        form: "#EMPRESALAB_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarempresa_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarempresa_7767) }
    },
        function () {
            _evaluarentidadafiliada_7767();
        },
        () => {
            $_EMPRESAPACIW = $("#empresalab_110c").val();
            _evaluarvictimaconfli_7767();
        }
    )
}


function _evaluarvictimaconfli_7767() {
    if ($_VICTICONFLICPACIW.trim() == '') {
        $_VICTICONFLICPACIW = 'N';
        $("#victimac_110c").val($_VICTICONFLICPACIW);
    }
    validarInputs({
        form: "#VICTIMAC_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarvictimaconfli_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarvictimaconfli_7767) }
    },
        function () {
            if ($_USUA_GLOBAL[0].NIT == 892000264) {
                _evaluarcontrato_7767()
            } else {
                _evaluarentidadafiliada_7767();
            }
        },
        () => {
            $_VICTICONFLICPACIW = $("#victimac_110c").val();
            if ($_VICTICONFLICPACIW == 'S' || $_VICTICONFLICPACIW == 'N') {
                _evaluarprograespeci_7767();

            } else {
                _evaluarvictimaconfli_7767()
            }

        }
    )
}

function _evaluarprograespeci_7767() {
    if ($_PROGEPSPACIW.trim() == '') {
        $_PROGEPSPACIW = 'N';
        $("#proespecial_110c").val($_PROGEPSPACIW);
    }
    validarInputs({
        form: "#PROESPECIAL_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarprograespeci_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarprograespeci_7767) }
    },
        () => {
            _evaluarvictimaconfli_7767();
        },
        () => {
            $_PROGEPSPACIW = $("#proespecial_110c").val();
            if ($_PROGEPSPACIW == 'S' || $_PROGEPSPACIW == 'N') {
                _evaluaraltocosto_7767();
            } else {
                _evaluarprograespeci_7767();
            }
        }
    )
}

function _evaluaraltocosto_7767() {
    if ($_ALTCOSPACIW.trim() == '') {
        $_ALTCOSPACIW = 'N';
        $("#altocosto_110c").val($_ALTCOSPACIW);
    }
    validarInputs({
        form: "#ALTOCOSTO_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluaraltocosto_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluaraltocosto_7767) }
    },
        () => {
            _evaluarprograespeci_7767();
        },
        () => {
            $_ALTCOSPACIW = $("#altocosto_110c").val();
            if ($_ALTCOSPACIW == 'S' || $_ALTCOSPACIW == 'N') {
                _ventanapacicovid_SER110C();
            } else {
                _evaluaraltocosto_7767();
            }
        }
    )
}


function _ventanapacicovid_SER110C() {
    var ventanacovid_SER110C = bootbox.dialog({
        size: "medium",
        title: "COVID-19 (CORONAVIRUS)",
        message:
            '<div class="row"> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
            '<div class="inline-inputs">' +
            '<label class="col-md-10 col-sm-10 col-xs-12 control-label" for="name">' +
            "Paciente pendiente de resultado COVID-19:" +
            "</label> " +
            '<div class="input-group col-md-2 col-sm-2 col-xs-12" id="VALIDACOVID_110C"> ' +
            '<input id="covidpacie_110c" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="1" placeholder= "S/N"> ' +
            "</div> " +
            "</div>" +
            "</div> " +
            "</div>",
        buttons: {
            confirm: {
                label: "Aceptar",
                className: "btn-primary",
                callback: function () {
                    ventanacovid_SER110C.off("show.bs.modal");
                    setTimeout(_evaluarcronico_7767, 500);
                },
            },
            cancelar: {
                label: "Cancelar",
                className: "btn-danger",
                callback: function () {
                    ventanacovid_SER110C.off("show.bs.modal");
                    setTimeout(_evaluaraltocosto_7767, 500);
                },
            },
        },
    });
    ventanacovid_SER110C.init($(".modal-footer").hide());
    ventanacovid_SER110C.init(_evaluarpacicovid_SER110C());
    ventanacovid_SER110C.on("shown.bs.modal", function () {
        $("#covidpacie_110c").focus();
    });
}

function _evaluarpacicovid_SER110C() {
    _inputControl("disabled");
    if ($_RESULTADOCOVIDPACIW.trim() == '') {
        $_RESULTADOCOVIDPACIW = 'N'
    }
    $("#covidpacie_110c").val($_RESULTADOCOVIDPACIW)
    validarInputs({
        form: "#VALIDACOVID_110C",
        orden: "1"
    }, () => { $('.btn-danger').click() },
        () => {
            $_RESULTADOCOVIDPACIW = $("#covidpacie_110c").val().toUpperCase(); $("#covidpacie_110c").val($_RESULTADOCOVIDPACIW)
            if ($_RESULTADOCOVIDPACIW == 'S' || $_RESULTADOCOVIDPACIW == 'N') {
                $('.btn-primary').click();
            } else {
                CON851('01', '01', _evaluarpacicovid_SER110C(), 'error', 'error');
            }
        }
    )
}

function _evaluarcronico_7767() {
    if ($_CRONICOPACIW.trim() == '') {
        $_CRONICOPACIW = 'N';
        $("#cronica_110c").val($_CRONICOPACIW);
    }
    validarInputs({
        form: "#CRONIC_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarcronico_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarcronico_7767) }
    },
        () => { setTimeout(_ventanapacicovid_SER110C, 300) },
        () => {
            $_CRONICOPACIW = $("#cronica_110c").val();
            if (($_CRONICOPACIW == 'S') || ($_CRONICOPACIW == 'N')) {
                if ($_CRONICOPACIW == 'N') {
                    $_PATOLCRONICPACIW = '000';
                    $("#patologiacronica_110c").val($_PATOLCRONICPACIW);
                    _evaluartutela_7767();
                } else {
                    _evaluarpatologia_7767()
                }
            } else {
                _evaluarcronico_7767();
            }
        }
    )
}

function _evaluarpatologia_7767() {
    validarInputs({
        form: "#PATOLOGIA_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarpatologia_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarpatologia_7767) }
    },
        () => {
            _evaluarcronico_7767();
        },
        () => {
            $_PATOLCRONICPACIW = $("#patologiacronica_110c").val();
            if ($_CRONICOPACIW == 'S') {
                if ($_PATOLCRONICPACIW == '000') {
                    _evaluartutela_7767();
                } else {
                    LLAMADO_DLL({
                        dato: [$_PATOLCRONICPACIW],
                        callback: _dataSAL7767_09,
                        nombredll: 'SER110C_09',
                        carpeta: 'SALUD'
                    });
                }
            } else {
                $_PATOLCRONICPACIW = '000';
                $("#patologiacronica_110c").val($_PATOLCRONICPACIW);
                _evaluartutela_7767();
            }
        }

    )
}

function _dataSAL7767_09(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _evaluartutela_7767();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarpatologia_7767();
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}

function _evaluartutela_7767() {
    validarInputs({
        form: "#PACITUTELA_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluartutela_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluartutela_7767) }
    },
        () => {
            _evaluarcronico_7767();
        },
        () => {
            $_TUTELAPACIW = $("#pacitutela_110c").val();
            if ($_TUTELAPACIW.trim() == '') {
                $_TUTELAPACIW = 'N';
                $("#pacitutela_110c").val($_TUTELAPACIW);
                _evaluarclasificacion_7767();

            } else if (($_TUTELAPACIW == 'S') || ($_TUTELAPACIW == 'N')) {
                _evaluarclasificacion_7767();
            } else {
                _evaluartutela_7767();
            }
        }
    )
}

function _evaluarclasificacion_7767() {
    validarInputs({
        form: "#CLASIF_110C",
        orden: "1"
    },
        function () {
            _evaluarcronico_7767();
        },
        _datoclasificacion_7767
    )
}

function _datoclasificacion_7767() {
    switch ($_NITUSU) {
        case "0844003225":
        case "0891855847":
        case "0800162035":
        case "0900541158":
        case "0900565371":
        case "0900566047":
        case "0900658867":
        case "0900405505":
        case "0900405505":
            $_CLASIFPACIW = '';
            $("#clasif_110c").val($_CLASIFPACIW);
            _ventanaacomp_7767();
            break;
        default:
            $_CLASIFPACIW = $("#clasif_110c").val();
            $_CODCLASP = $_CLASIFPACIW;
            if ($_CLASIFPACIW.trim() == '') {
                //// continuE
                _evaluarpoliconsulta_7767();
            } else {

                LLAMADO_DLL({
                    dato: [$_CODCLASP],
                    callback: _dataSAL7767_10,
                    nombredll: 'SER110C_10',
                    carpeta: 'SALUD'
                });

            }
            break;
    }
}

function _dataSAL7767_10(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCLASIFICACION = date[1].trim();
    if (swinvalid == "00") {
        $("#clasifd_110c").val($_DESCRIPCLASIFICACION);
        $("#mamografia_110c").val('000000');
        $_ANOULTMAMOPACIW = $("#mamografia_110c").val();
        _evaluarpoliconsulta_7767();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarclasificacion_7767();
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}

function _evaluarpoliconsulta_7767() {
    if ($_MULTICONSULPACIW.trim() == '') {
        $_MULTICONSULPACIW = 'N';
        $("#policonsul_110c").val($_MULTICONSULPACIW);
    }
    validarInputs({
        form: "#POLICONSUL_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarpoliconsulta_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarpoliconsulta_7767) }
    },
        function () {
            _evaluarclasificacion_7767();
        },
        () => {
            $_MULTICONSULPACIW = $("#policonsul_110c").val();
            if (($_MULTICONSULPACIW == 'S') || ($_MULTICONSULPACIW == 'N')) {
                if ($_USUA_GLOBAL[0].NIT == 892000264) {
                    if ($_NOVEDAD7767 == '7') {
                        $_RESTAPLIPACIW = 'N';
                        $("#restric_110c").val($_RESTAPLIPACIW);
                        $_RESTCONSPACIW = 'S';
                        $("#consult_110c").val($_RESTCONSPACIW);
                        $_RESTADONPACIW = 'S';
                        $("#odont_110c").val($_RESTADONPACIW);
                        $_RESTPYPPACIW = 'S';
                        $("#pyp_110c").val($_RESTPYPPACIW);
                        $_RESTLABOPACIW = 'S';
                        $("#lab_110c").val($_RESTLABOPACIW);
                        $_RESTIMAGPACIW = 'S';
                        $("#rx_110c").val($_RESTIMAGPACIW);
                        $_RESTDROGPACIW = 'S';
                        $("#drog_110c").val($_RESTDROGPACIW);
                        $_RESTTERFPACIW = 'S';
                        $("#fisiot_110c").val($_RESTTERFPACIW);
                        $_RESTTEROPACIW = 'S';
                        $("#terap_110c").val($_RESTTEROPACIW);
                        $_RESTCIRUPACIW = 'S';
                        $("#cirug_110c").val($_RESTCIRUPACIW);
                        $_RESTESTAPACIW = 'S';
                        $("#estanc_110c").val($_RESTESTAPACIW);
                        $_VCMPACIW = 'N';
                        $("#vcm_110c").val($_VCMPACIW);
                        $_DERECHOPACIW = '3';
                        $("#basedatos_110c").val('3 - Creado por el  usuario');
                        _evaluarobservaciones_7767();
                    } else {
                        $_VCMPACIW = 'N';
                        $("#vcm_110c").val($_VCMPACIW);
                        _datoestado_7767();
                    }
                } else {
                    _ventanaacomp_7767()
                }
            } else {
                _evaluarpoliconsulta_7767();
            }
        }
    )
}


function _ventanaacomp_7767() {
    var ventacomp = bootbox.dialog({
        size: 'medium',
        title: 'DATOS RESPONSABLE...NRO 1 SI NO TRAE',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +

            '<div class="col-md-8 col-sm-6 col-xs-6"> ' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-6 col-xs-6 control-label" for="name">' + "ID ACOMP:" + '</label> ' +
            '<div class="col-md-9 col-sm-6 col-xs-6" id="IDACOMP_SER110C"> ' +
            '<input id="idacomp_110C" class="form-control input-md" data-orden="1" maxlength="15" > ' +
            '</div> ' +
            '<button type="button" id="idacompBtn_110C" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '</div>' +
            '</div> ' +

            '<div class="col-md-4 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "TIP DOC: " + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6" > ' +
            '<input id="tipacomp_SER110C" class="form-control input-md" maxlength="3"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-4 col-sm-4 col-xs-6 control-label" for="name">' + "1ER.APEL: " + '</label> ' +
            '<div class="col-md-8 col-sm-6 col-xs-6" id="APELACOMP1_SER110C"> ' +
            '<input id="apelacomp1_110C" class="form-control input-md" data-orden="1" maxlength="15"> ' +
            '</div> ' +
            '</div> ' +


            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-4 col-sm-6 col-xs-6 control-label" for="name">' + "2DO.APEL: " + '</label> ' +
            '<div class="col-md-8 col-sm-6 col-xs-6" id="APELACOMP2_SER110C"> ' +
            '<input id="apelacomp2_110C" class="form-control input-md" data-orden="1" maxlength="15"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-4 col-sm-6 col-xs-6 control-label" for="name">' + "1ER.NOMB: " + '</label> ' +
            '<div class="col-md-8 col-sm-6 col-xs-6" id="NOMBREACOMP1_SER110C"> ' +
            '<input id="nombreacomp1_110C" class="form-control input-md" data-orden="1" maxlength="12"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-4 col-sm-6 col-xs-6 control-label" for="name">' + "2DO.NOMB: " + '</label> ' +
            '<div class="col-md-8 col-sm-6 col-xs-6" id="NOMBREACOMP2_SER110C"> ' +
            '<input id="nombreacomp2_110C" class="form-control input-md" data-orden="1" maxlength="12"> ' +
            '</div> ' +
            '</div> ' +

            '<div class="salto-linea"></div>' +

            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-4 col-sm-6 col-xs-6 control-label" for="name">' + "TELEFONO: " + '</label> ' +
            '<div class="col-md-8 col-sm-6 col-xs-6" id="TELACOMP_SER110C"> ' +
            '<input id="telacomp_110C" class="form-control input-md" data-orden="1" maxlength="10"> ' +
            '</div> ' +
            '</div> ' +

            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventacomp.off('show.bs.modal');
                    if ($_NITUSU == '0800251482') {
                        setTimeout(_datomamo_7767, 500)
                    } else if ($_EPSPACIW == 'RES004') {
                        setTimeout(_evaluarfechacertestu_7767, 500)
                    } else {
                        setTimeout(_evaluarrestriccion, 500)
                    }
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventacomp.off('show.bs.modal');
                    setTimeout(_evaluarpoliconsulta_7767, 500)

                }
            },
            f8pacientes: {
                label: 'Pacientes',
                className: 'btn-info',
                callback: function () {
                    ventacomp.off('show.bs.modal');
                    setTimeout(_ventanaacompañante_SER110C, 300);
                }
            }
        }
    });
    ventacomp.init($('.modal-footer').hide());
    ventacomp.init(_evaluaracomp_7767());
    ventacomp.on('shown.bs.modal', function () {
        $("#idacomp_110C").focus();
    });
    ventacomp.on('shown.bs.modal', function (e) {
        _toggleF8([{
            input: 'idacomp', app: '110C', funct: (e) => {
                if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                    set_Event_validar('#IDACOMP_SER110C', 'off')
                    $('.btn-info').click();
                }
            }
        },])
    });
}

function _evaluaracomp_7767() {
    _inputControl("disabled");
    if ($_NOVEDAD7767 == 8) {
        $("#idacomp_110C").val($_IDACOMPPACIW);
        $("#tipacomp_SER110C").val($_TIPOACOMPPACIW);
        $("#apelacomp1_110C").val($_APEL1ACOMPPACIW);
        $("#apelacomp2_110C").val($_APEL2ACOMPPACIW);
        $("#nombreacomp1_110C").val($_NOMB1ACOMPPACIW);
        $("#nombreacomp2_110C").val($_NOMB2ACOMPPACIW);
        $("#telacomp_110C").val($_TELACOMPACIW);
    } else {
        $_IDACOMPPACIW = '1'
        $("#idacomp_110C").val($_IDACOMPPACIW);
    }
    validarInputs({
        form: "#IDACOMP_SER110C",
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            $_IDACOMPPACIW = $("#idacomp_110C").val();
            $_IDACOMPPACIW = $_IDACOMPPACIW.padStart(15, '0')
            $('#idacomp_110C').val($_IDACOMPPACIW);
            if ($_IDACOMPPACIW > 1) {
                LLAMADO_DLL({
                    dato: [$_IDACOMPPACIW],
                    callback: _respuestaacomp_7767,
                    nombredll: 'SER110C_03',
                    carpeta: 'SALUD'
                });
            } else if ($_IDACOMPPACIW == 1) {
                // $_IDACOMPPACIW = '';
                $_TIPOACOMPPACIW = '';
                $_APEL1ACOMPPACIW = '';
                $_APEL2ACOMPPACIW = '';
                $_NOMB1ACOMPPACIW = '';
                $_NOMB2ACOMPPACIW = '';
                $_TELACOMPACIW = '';
                $('.btn-primary').click();
            } else {
                CON851('02', '02', null, 'error', 'error');
                _evaluaracomp_7767()
            }
        }
    )
}

function _respuestaacomp_7767(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_IDACOMPPACIW = date[1].trim();
    $_TIPOACOMPPACIW = date[2].trim();
    $_APEL1ACOMPPACIW = date[4].trim();;
    $_APEL2ACOMPPACIW = date[5].trim();
    $_NOMB1ACOMPPACIW = date[6].trim();
    $_NOMB2ACOMPPACIW = date[7].trim();
    if (swinvalid == "00") {
        // $("#idacomp_110C").val($_IDACOMPPACIW);
        $("#tipacomp_SER110C").val($_TIPOACOMPPACIW);
        $("#apelacomp1_110C").val($_APEL1ACOMPPACIW);
        $("#apelacomp2_110C").val($_APEL2ACOMPPACIW);
        $("#nombreacomp1_110C").val($_NOMB1ACOMPPACIW);
        $("#nombreacomp2_110C").val($_NOMB2ACOMPPACIW);
        setTimeout(_evaluartipodocacomp_7767, 300);
    } else if (swinvalid == "01") {
        _evaluartipodocacomp_7767();
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}


function _evaluartipodocacomp_7767() {
    var tipodoc = [{ "COD": "CC", "DESCRIP": "1- CEDULA CIUDADANIA" },
    { "COD": "CE", "DESCRIP": "2- CEDULA EXTRANJERIA" },
    { "COD": "PA", "DESCRIP": "3- NUMERO PASAPORTE" },
    { "COD": "RC", "DESCRIP": "4- REGISTRO CIVIL" },
    { "COD": "TI", "DESCRIP": "5- TARJETA IDENTIDAD" },
    { "COD": "ASI", "DESCRIP": "6- ADULTO SIN IDENT" },
    { "COD": "MSI", "DESCRIP": "7- MENOR SIN IDENT" },
    { "COD": "NUI", "DESCRIP": "8- NUM UNICO IDENT. NUID" },
    { "COD": "CD", "DESCRIP": "9- CARNET DIPLOMA" },
    { "COD": "SC", "DESCRIP": "A- SALVO CONDUCTO" },
    { "COD": "PE", "DESCRIP": "B- PERMISO ESPECIAL PERM" },
    { "COD": "CN", "DESCRIP": "C- CERTIFICADO NACIDO VIVO" }]
    POPUP({
        array: tipodoc,
        titulo: 'TIPO IDENTIFICACION',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: $_TIPOACOMPPACIW,
        callback_f: _evaluaracomp_7767
    },
        _validartipoacomp_7767);
}

function _validartipoacomp_7767(tipodoc) {
    $_TIPOACOMPPACIW = tipodoc.COD;
    switch (tipodoc.COD) {
        case 'CC':
        case 'CE':
        case 'PA':
        case 'RC':
        case 'TI':
        case 'ASI':
        case 'MSI':
        case 'NUI':
        case 'CD':
        case 'SC':
        case 'PE':
        case 'CN':
            setTimeout(validacionapell1acomp_7767, 300);
            break;
        default:
            _evaluaracomp_7767();
            break;
    }
    $("#tipacomp_SER110C").val(tipodoc.COD);
}


function validacionapell1acomp_7767() {
    validarInputs({
        form: "#APELACOMP1_SER110C",
        orden: "1"
    },
        () => { _evaluaracomp_7767() },
        () => {
            $_APEL1ACOMPPACIW = $("#apelacomp1_110C").val().toUpperCase(); $("#apelacomp1_110C").val($_APEL1ACOMPPACIW)

            if (($_APEL1ACOMPPACIW.trim() == '') || ($.isNumeric($_APEL1ACOMPPACIW))) {
                CON851('58', '58', null, 'error', 'error');
                if ($_APEL1ACOMPPACIW.trim() == '') {
                    CON851('02', '02', null, 'error', 'error');
                    validacionapell1acomp_7767()
                } else {
                    validacionapell1acomp_7767()
                }
            } else {
                validacionapell2acomp_7767();
            }
        }
    )
}
function validacionapell2acomp_7767() {
    validarInputs({
        form: "#APELACOMP2_SER110C",
        orden: "1"
    },
        () => { validacionapell1acomp_7767() },
        () => {
            $_APEL2ACOMPPACIW = $("#apelacomp2_110C").val().toUpperCase(); $("#apelacomp2_110C").val($_APEL2ACOMPPACIW);
            validacionnombr1acomp_7767();
        }
    )
}
function validacionnombr1acomp_7767() {
    validarInputs({
        form: "#NOMBREACOMP1_SER110C",
        orden: "1"
    },
        () => { _evaluaracomp_7767() },
        () => {
            $_NOMB1ACOMPPACIW = $("#nombreacomp1_110C").val().toUpperCase(); $("#nombreacomp1_110C").val($_NOMB1ACOMPPACIW);

            if (($_NOMB1ACOMPPACIW.trim() == '') || ($.isNumeric($_NOMB1ACOMPPACIW))) {
                CON851('58', '58', null, 'error', 'error');
                validacionnombr1acomp_7767();
            } else {
                validacionnombre2acomp_7767();
            }
        }
    )
}
function validacionnombre2acomp_7767() {
    validarInputs({
        form: "#NOMBREACOMP2_SER110C",
        orden: "1"
    },
        () => { validacionnombr1acomp_7767() },
        () => {
            $_NOMB2ACOMPPACIW = $("#nombreacomp2_110C").val().toUpperCase(); $("#nombreacomp2_110C").val($_NOMB2ACOMPPACIW)
            validaciontelefonoacomp_7767();
        }
    )
}

function validaciontelefonoacomp_7767() {
    validarInputs({
        form: "#TELACOMP_SER110C",
        orden: "1"
    },
        () => { validacionnombr1acomp_7767() },
        () => {
            $_TELACOMPACIW = $("#telacomp_110C").val();

            if ($_TELACOMPACIW.trim() == '') {
                CON851('02', '02', null, 'error', 'error');
                validaciontelefonoacomp_7767();
            } else {
                $('.btn-primary').click();
                // _evaluarrestriccion(); 
            }
        }
    )
}

function _evaluarfechacertestu_7767() {
    momentMaskcertestudio.updateValue();
    validarInputs({
        form: "#FECHAMATR_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarfechacertestu_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarfechacertestu_7767) }
    },
        function () {
            setTimeout(_ventanaacomp_7767, 300)
        },
        () => {
            $_CERTESTUDPACIW = momentMaskcertestudio.unmaskedValue;
            $_ANOCERTESTUDPACIW = $_CERTESTUDPACIW.substring(0, 4);
            $_MESCERTESTUDPACIW = $_CERTESTUDPACIW.substring(4, 6);
            if ($_CERTESTUDPACIW == '000000') {
                $_CERTESTUDPACIW = '';
                _evaluarcerteco_7767();
            } else if (($_ANOCERTESTUDPACIW > 0) && ($_ANOCERTESTUDPACIW < 1890)) {
                CON851('37', '37', null, 'error', 'error');
                _evaluarfechacertestu_7767()
            } else {
                peridocerticado_7767();
            }
        }
    )
}


function peridocerticado_7767() {
    var pcertificados = [{
        "codigo": "1",
        "descripcion": "SEMESTRAL"
    },
    {
        "codigo": "2",
        "descripcion": "ANUAL"
    }
    ]
    POPUP({
        array: pcertificados,
        titulo: 'PERIODO CERT. ESTUDIO',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: $_PERIESTUDPACIW,
        callback_f: peridocerticado_7767
    },
        _seleccionarperiodo_7767);
}

function _seleccionarperiodo_7767(pcertificados) {
    $_PERIESTUDPACIW = pcertificados.COD;
    switch (pcertificados.COD) {
        case '1':
        case '2':
            _validacionesperiodocert_7767();
            break;
        default:
            peridocerticado_7767();
            break;
    }
    $("#matr_110c").val(pcertificados.COD);
}

function _validacionesperiodocert_7767() {
    if ($_PERIESTUDPACIW == '1') {
        $_DIASESTUDIOW = (($_ANOACTUALW * 365.25) + ($_MESACTUALW * 30)) - (($_ANOCERTESTUDPACIW * 365.25) + ($_MESCERTESTUDPACIW * 30));
        if ($_DIASESTUDIOW > 180) {
            CON851('B8', 'B8', null, 'error', 'error');
            _seleccionarperiodo_7767();
        } else {
            _evaluarcerteco_7767();
        }
    } else {
        $_DIASESTUDIOW = (($_ANOACTUALW * 365.25) + ($_MESACTUALW * 30)) - (($_ANOCERTESTUDPACIW * 365.25) + ($_MESCERTESTUDPACIW * 30));
        if ($_DIASESTUDIOW > 360) {
            CON851('B8', 'B8', null, 'error', 'error');
            _seleccionarperiodo_7767();
        } else {
            _evaluarcerteco_7767();
        }
    }
}

function _evaluarcerteco_7767() {
    momentMaskcertecno.updateValue();
    validarInputs({
        form: "#FECHAECONO_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarcerteco_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarcerteco_7767) }
    },
        function () {
            _evaluarfechacertestu_7767();
        },
        _fechacerteco_7767
    )
}

function _fechacerteco_7767() {

    $_CERTECONOPACIW = momentMaskcertecno.unmaskedValue;
    $_ANOCERTECONOPACIW = $_CERTECONOPACIW.substring(0, 4);
    $_MESCERTECONOPACIW = $_CERTECONOPACIW.substring(4, 6);
    if ($_CERTECONOPACIW == '000000') {
        $_CERTECONOPACIW = '';
        _datomamo_7767();
    } else if (($_ANOCERTECONOPACIW > 0) && ($_ANOCERTECONOPACIW < 1890)) {
        CON851('37', '37', null, 'error', 'error');
        _evaluarcerteco_7767();
    } else {
        _peridocerticadoeco_7767();
    }
}

function peridocerticado_7767() {
    var periodo = [{
        "codigo": "1",
        "descripcion": "SEMESTRAL"
    },
    {
        "codigo": "2",
        "descripcion": "ANUAL"
    }
    ]
    POPUP({
        array: periodo,
        titulo: 'PERIODO CERT. ECO. ESTUDIO',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: $_PERIECOPACIW,
        callback_f: _evaluarcerteco_7767
    },
        _seleccionarperiodoeco_7767);
}

function _seleccionarperiodoeco_7767(periodo) {
    $_PERIECOPACIW = periodo.COD;
    switch (periodo.COD) {
        case '1':
        case '2':
            _validacionesperiodoeco_7767();
            break;
        default:
            _evaluarcerteco_7767();
            break;
    }
    $("#econo_110c").val(periodo.COD);
}

function _validacionesperiodoeco_7767() {
    if ($_PERIECOPACIW == '1') {
        $_DIASESCOW = (($_ANOACTUALW * 365.25) + ($_MESACTUALW * 30)) - (($_ANOCERTECONOPACIW * 365.25) + ($_MESCERTECONOPACIW * 30));
        if ($_DIASESCOW > 180) {
            CON851('4G', '4G', null, 'error', 'error');
            _seleccionarperiodoeco_7767();
        } else {
            _datomamo_7767();
        }
    } else {
        $_DIASESTUDIOW = (($_ANOACTUALW * 365.25) + ($_MESACTUALW * 30)) - (($_ANOCERTECONOPACIW * 365.25) + ($_MESCERTECONOPACIW * 30));
        if ($_DIASESCOW > 360) {
            CON851('4G', '4G', null, 'error', 'error');
            _seleccionarperiodoeco_7767();
        } else {
            _datomamo_7767();
        }
    }
}

function _datomamo_7767() {
    if ($_NITUSU == '0830092718' && $_SEXOPACIW == 'F') {
        _evaluarultimomamo();
    } else {
        _evaluarrestriccion();
    }
}

function _evaluarultimomamo() {
    validarInputs({
        form: "#MAMOGRAFIA_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarultimomamo) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarultimomamo) }
    },
        function () {
            _evaluartelefonoacomp();
        },
        () => {
            $_ULTMAMOPACIW = $("#mamografia_110c").val();
            $_ANOULTMAMOPACIW = $_ULTMAMOPACIW.substring(0, 4);
            $_MESULTMAMOPACIW = $_ULTMAMOPACIW.substring(4, 6);
            if ($_ULTMAMOPACIW == '000000') {
                $_ULTMAMOPACIW = '';
                _evaluarrestriccion();

            } else if ($_NOVEDAD7767 == '7') {
                _evaluarrestriccion();
            } else {
                if ($_ANOULTMAMOPACIW < 2000) {
                    CON851('03', '03', null, 'error', 'error');
                    _evaluarultimomamo();
                } else {
                    _evaluarrestriccion();
                }
            }
        }
    )
}

function _evaluarrestriccion() {

    validarInputs({
        form: "#RESTRIC_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrestriccion) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrestriccion) }
    },
        function () {
            _ventanaacomp_7767();
        },
        _datorestriccion_7767
    )
}

function _datorestriccion_7767() {

    $_RESTAPLIPACIW = $("#restric_110c").val();
    if ($_RESTAPLIPACIW.trim() == '') {
        $_RESTAPLIPACIW = 'N';
        $("#restric_110c").val($_RESTAPLIPACIW);
        _evaluarrestriconsulta();
    } else if (($_RESTAPLIPACIW == 'S') || ($_RESTAPLIPACIW == 'N')) {
        _evaluarrestriconsulta();
    } else {
        _evaluarrestriccion();
    }
}

function _evaluarrestriconsulta() {

    validarInputs({
        form: "#CONSULT_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrestriconsulta) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrestriconsulta) }
    },
        function () {
            _evaluarrestriccion();
        },
        _datorestriccionconsult_7767
    )
}

function _datorestriccionconsult_7767() {
    $_RESTCONSPACIW = $("#consult_110c").val();
    if ($_RESTCONSPACIW.trim() == '') {
        $_RESTCONSPACIW = 'S';
        $("#consult_110c").val($_RESTCONSPACIW);
        _evaluarrestriodont();
    } else if (($_RESTCONSPACIW == 'S') || ($_RESTCONSPACIW == 'N')) {
        _evaluarrestriodont();

    } else {
        _evaluarrestriconsulta();
    }
}

function _evaluarrestriodont() {

    validarInputs({
        form: "#ODONT_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrestriodont) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrestriodont) }
    },
        function () {
            _evaluarrestriconsulta();
        },
        _datorestriccionodont_7767
    )
}

function _datorestriccionodont_7767() {
    $_RESTADONPACIW = $("#odont_110c").val();

    if ($_RESTADONPACIW.trim() == '') {
        $_RESTADONPACIW = 'S';
        $("#odont_110c").val($_RESTADONPACIW);
        _evaluarrestripyp();

    } else if (($_RESTADONPACIW == 'S') || ($_RESTADONPACIW == 'N')) {
        _evaluarrestripyp();
    } else {
        _evaluarrestriodont();
    }
}

function _evaluarrestripyp() {

    validarInputs({
        form: "#PYP_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrestripyp) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrestripyp) }
    },
        function () {
            _evaluarrestriodont();
        },
        _datorestriccionpyp_7767
    )
}

function _datorestriccionpyp_7767() {
    $_RESTPYPPACIW = $("#pyp_110c").val();
    if ($_RESTPYPPACIW.trim() == '') {
        $_RESTPYPPACIW = 'S';
        $("#pyp_110c").val($_RESTPYPPACIW);
        _evaluarrestrilabo();

    } else if (($_RESTPYPPACIW == 'S') || ($_RESTPYPPACIW == 'N')) {
        _evaluarrestrilabo();
    } else {
        _evaluarrestripyp();
    }
}

function _evaluarrestrilabo() {

    validarInputs({
        form: "#LAB_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrestrilabo) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrestrilabo) }
    },
        function () {
            _evaluarrestripyp();
        },
        _datorestriccionlabo_7767
    )
}

function _datorestriccionlabo_7767() {
    $_RESTLABOPACIW = $("#lab_110c").val();
    if ($_RESTLABOPACIW.trim() == '') {
        $_RESTLABOPACIW = 'S';
        $("#lab_110c").val($_RESTLABOPACIW);
        _evaluarrestrirx();

    } else if (($_RESTLABOPACIW == 'S') || ($_RESTLABOPACIW == 'N')) {
        _evaluarrestrirx();
    } else {
        _evaluarrestripyp();
    }
}

function _evaluarrestrirx() {

    validarInputs({
        form: "#RX_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrestrirx) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrestrirx) }
    },
        function () {
            _evaluarrestrilabo();
        },
        _datorestriccionrx_7767
    )
}

function _datorestriccionrx_7767() {
    $_RESTIMAGPACIW = $("#rx_110c").val();
    if ($_RESTIMAGPACIW.trim() == '') {
        $_RESTIMAGPACIW = 'S';
        $("#rx_110c").val($_RESTIMAGPACIW);
        _evaluarrestridrog();

    } else if (($_RESTIMAGPACIW == 'S') || ($_RESTIMAGPACIW == 'N')) {
        _evaluarrestridrog();
    } else {
        _evaluarrestrirx();
    }
}

function _evaluarrestridrog() {

    validarInputs({
        form: "#DROG_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrestridrog) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrestridrog) }
    },
        function () {
            _evaluarrestrirx();
        },
        _datorestricciondrog_7767
    )
}

function _datorestricciondrog_7767() {
    $_RESTDROGPACIW = $("#drog_110c").val();
    if ($_RESTDROGPACIW.trim() == '') {
        $_RESTDROGPACIW = 'S';
        $("#drog_110c").val($_RESTDROGPACIW);
        _evaluarrestriterap();

    } else if (($_RESTDROGPACIW == 'S') || ($_RESTDROGPACIW == 'N')) {
        _evaluarrestriterap();
    } else {
        _evaluarrestridrog();
    }
}

function _evaluarrestriterap() {

    validarInputs({
        form: "#FISIOT_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrestriterap) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrestriterap) }
    },
        function () {
            _evaluarrestridrog();
        },
        _datorestriccionfisioterap_7767
    )
}

function _datorestriccionfisioterap_7767() {
    $_RESTTERFPACIW = $("#fisiot_110c").val();
    if ($_RESTTERFPACIW.trim() == '') {
        $_RESTTERFPACIW = 'S';
        $("#fisiot_110c").val($_RESTTERFPACIW);
        _evaluarrestriotratera();

    } else if (($_RESTTERFPACIW == 'S') || ($_RESTTERFPACIW == 'N')) {
        _evaluarrestriotratera();
    } else {
        _evaluarrestriterap();
    }
}

function _evaluarrestriotratera() {

    validarInputs({
        form: "#TERAP_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrestriotratera) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrestriotratera) }
    },
        function () {
            _evaluarrestridrog();
        },
        _datorestriccionotraterap_7767
    )
}

function _datorestriccionotraterap_7767() {
    $_RESTTEROPACIW = $("#terap_110c").val();
    if ($_RESTTEROPACIW.trim() == '') {
        $_RESTTEROPACIW = 'S';
        $("#terap_110c").val($_RESTTEROPACIW);
        _evaluarrestricirugia();

    } else if (($_RESTTEROPACIW == 'S') || ($_RESTTEROPACIW == 'N')) {
        _evaluarrestricirugia();
    } else {
        _evaluarrestriotratera();
    }
}

function _evaluarrestricirugia() {

    validarInputs({
        form: "#CIRUG_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrestricirugia) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrestricirugia) }
    },
        function () {
            _evaluarrestriotratera();
        },
        _datorestriccioncirugia_7767
    )
}

function _datorestriccioncirugia_7767() {
    $_RESTCIRUPACIW = $("#cirug_110c").val();
    if ($_RESTCIRUPACIW.trim() == '') {
        $_RESTCIRUPACIW = 'S';
        $("#cirug_110c").val($_RESTCIRUPACIW);
        _evaluarrestriestancia();

    } else if (($_RESTCIRUPACIW == 'S') || ($_RESTCIRUPACIW == 'N')) {
        _evaluarrestriestancia();
    } else {
        _evaluarrestricirugia();
    }
}

function _evaluarrestriestancia() {

    validarInputs({
        form: "#ESTANC_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarrestriestancia) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarrestriestancia) }
    },
        function () {
            _evaluarrestriotratera();
        },
        _datorestriccionestancia_7767
    )
}

function _datorestriccionestancia_7767() {
    $_RESTESTAPACIW = $("#estanc_110c").val();
    if ($_RESTESTAPACIW.trim() == '') {
        $_RESTESTAPACIW = 'S';
        $("#estanc_110c").val($_RESTESTAPACIW);
        _evaluarvcm_7767();


    } else if (($_RESTESTAPACIW == 'S') || ($_RESTESTAPACIW == 'N')) {
        _evaluarvcm_7767();

    } else {
        _evaluarrestriestancia();
    }
}

function _evaluarvcm_7767() {

    validarInputs({
        form: "#VCM_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarvcm_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarvcm_7767) }
    },
        function () {
            _evaluarrestriestancia();
        },
        _datovcm_7767
    )
}

function _datovcm_7767() {
    $_VCMPACIW = $("#vcm_110c").val();
    if ($_VCMPACIW.trim() == '') {
        $_VCMPACIW = 'N';
        $("#vcm_110c").val($_VCMPACIW);

        if ($_NOVEDAD7767 == '7') {
            $_DERECHOPACIW = '3';
            $("#basedatos_110c").val('3 - Creado por el  usuario');
            _evaluarobservaciones_7767();
        } else {
            _datoestado_7767();
        }

    } else if (($_VCMPACIW == 'S') || ($_VCMPACIW == 'N')) {
        if ($_NOVEDAD7767 == '7') {
            $_DERECHOPACIW = '3';
            $("#basedatos_110c").val('3 - Creado por el  usuario');
            _evaluarobservaciones_7767();
        } else {
            _datoestado_7767();
        }
    } else {
        _evaluarvcm_7767();
    }
}

function _datoestado_7767() {
    if ($_NOVEDAD7767 == '8') {
        var derecho = [{ "COD": "1", "DESCRIP": "En base de datos, ACTIVO" },
        { "COD": "2", "DESCRIP": "En base de datos, INACTIVO" },
        { "COD": "3", "DESCRIP": "Creado por el  usuario" },
        { "COD": "4", "DESCRIP": "Pendiente por determinar" },
        { "COD": "5", "DESCRIP": "En base de datos, SIN CARNET" },
        { "COD": "6", "DESCRIP": "SUSPENDIDO, requiere autoriz" },
        { "COD": "7", "DESCRIP": "Afiliado Fallecido" },
        { "COD": "8", "DESCRIP": "Retiro X Multiafiliado" },
        { "COD": "9", "DESCRIP": "Ingreso X Traslado" },
        { "COD": "A", "DESCRIP": "Retiro  X Traslado" },
        { "COD": "B", "DESCRIP": "Periodo integral" }]
        POPUP({
            array: derecho,
            titulo: 'COMPROBACION DE DERECHOS',
            indices: [{
                id: 'COD',
                label: 'DESCRIP'
            }],
            seleccion: $_DERECHOPACIW,
            callback_f: () => {
                if ($_USUA_GLOBAL[0].NIT == 892000264) {
                    _evaluarpoliconsulta_7767()
                } else {
                    _evaluarvcm_7767
                }
            },
            teclaAlterna: true
        },
            _seleccionderecho_7767);
    }
}

function _seleccionderecho_7767(derecho) {
    $_DERECHOPACIW = derecho.COD;
    switch (derecho.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case 'A':
        case 'B':
            setTimeout(_evaluarobservaciones_7767, 300);
            break;
        default:
            _evaluarvcm_7767();
            break;
    }
    $("#basedatos_110c").val(derecho.COD + " - " + derecho.DESCRIP);
}

function _evaluarobservaciones_7767() {
    validarInputs({
        form: "#OBSERVACIONES_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarobservaciones_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarobservaciones_7767) }
    },
        function () {
            if ($_USUA_GLOBAL[0].NIT == 892000264) {
                _evaluarpoliconsulta_7767()
            } else {
                _evaluarrestriestancia();
            }
        },
        () => {
            $_OBSERVPACIW = $("#observaciones_110c").val();
            _datodiscapacidad_7767();
        }
    )
}

function _datodiscapacidad_7767() {

    var discapacidad = [{ "COD": "1", "DESCRIP": "SIN DISCAPACI" },
    { "COD": "2", "DESCRIP": "DISC.FISICA" },
    { "COD": "3", "DESCRIP": "DISC.AUDITIVA" },
    { "COD": "4", "DESCRIP": "DISC.VISUAL" },
    { "COD": "5", "DESCRIP": "DISC.MENTAL" },
    { "COD": "6", "DESCRIP": "DISC.COGNITIV" }]
    POPUP({
        array: discapacidad,
        titulo: 'TIPO DE DISCAPACIDAD',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: $_DISCAPPACIW,
        callback_f: _evaluarobservaciones_7767
    },
        _seleccionardiscapacidad_7767);
}

function _seleccionardiscapacidad_7767(discapacidad) {
    $_DISCAPPACIW = discapacidad.COD;
    switch (discapacidad.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
            if ($_NITUSU == '0830092718') {
                switch ($_PREFIJOUSU) {
                    case "TU":
                        $_ENTIFACTPACIW = '0800209488';
                        $("#entidad_110c").val($_ENTIFACTPACIW);

                        break;
                    case "SB":
                        $_ENTIFACTPACIW = '0800216883';
                        $("#entidad_110c").val($_ENTIFACTPACIW);
                        break;
                }
                _evaluarentidadfact_7767();
            } else {
                _evaluarentidadfact_7767();
            }
            break;
        default:
            _evaluarobservaciones_7767();
            break;
    }
    $("#discapacidad_110c").val(discapacidad.COD + " - " + discapacidad.DESCRIP);
}

function _evaluarentidadfact_7767() {
    if ($_ENTIFACTPACIW.trim() == '') $_ENTIFACTPACIW = $_NITENT;
    $('#entidad_110c').val($_NITENT);

    validarInputs({
        form: "#ENTIDAD_110C",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarentidadfact_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarentidadfact_7767) }
    },
        () => {
                // setTimeout(_datodiscapacidad_7767, 300)
                _evaluarobservaciones_7767()
        },
        () => {
            $_ENTIFACTPACIW = $("#entidad_110c").val();
            $_ENTIFACTPACIW = $_ENTIFACTPACIW.padStart(10, "0");
            $("#entidad_110c").val($_ENTIFACTPACIW);
            if ((parseInt($_ENTIFACTPACIW) == 0) && ($_NITUSU != '0892000401') && ($_NITUSU != '0830092718')) {
                $_DESCRIPENTIPACIW = '';
                $("#entidadd_110c").val($_DESCRIPENTIPACIW);
                _validacionesfechanit_SER110C()
            } else {
                LLAMADO_DLL({
                    dato: [$_ENTIFACTPACIW],
                    callback: _dataSAL7767_11,
                    nombredll: 'SER110C_11',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}

function _dataSAL7767_11(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPENTIPACIW = date[1].trim();
    if (swinvalid == "00") {
        $("#entidadd_110c").val($_DESCRIPENTIPACIW);
        _validacionesfechanit_SER110C()
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarentidadfact_7767();
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}

function _validacionesfechanit_SER110C() {
    if (parseInt($_ENTIFACTPACIW) > 0 && $_ENTIFACTPACIW != $_NITFACTPACIW) {
        $_FECHANITPACIW = moment().format('YYYYMMDD');
        $("#fechasistd_110c").val($_FECHANITPACIW);
        _evaluarembarazoriesgo_7767();
    } else if ($_NITUSU == '0830092718') {
        _evaluarantecendentescancer();
    } else {
        _evaluarembarazoriesgo_7767();
    }
}

function _evaluarembarazoriesgo_7767() {
    if ($_SEXOPACIW == 'M' || $_UNIDEDADW != 'A' || $_VLREDADW < 8) {
        $_EMBALTOPACIW = '';
        $("#altoriesgo_110c").val($_EMBALTOPACIW);
        _evaluarmedicofami_7767();
    } else {
        validarInputs({
            form: "#ALGORIESGO_110C",
            orden: "1"
        },
            function () { _evaluarentidadfact_7767(); },
            () => {
                $_EMBALTOPACIW = $("#altoriesgo_110c").val();

                if (($_EMBALTOPACIW.trim() == '') || ($_EMBALTOPACIW == 'S') || ($_EMBALTOPACIW == 'N')) {
                    if ($_EMBALTOPACIW == 'S') {
                        CON851('', 'EH', null, 'warning', 'Advertencia');
                        _evaluarmedicofami_7767();
                    } else {
                        _evaluarmedicofami_7767();
                    }
                } else {
                    CON851('03', '03', null, 'error', 'error');
                    _evaluarembarazoriesgo_7767();
                }
            }
        )
    }
}

function _evaluarmedicofami_7767() {
    validarInputs({
        form: "#MEDICOFAM_102",
        orden: "1",
        event_f7: () => { _evaluarcambiosbasedatos_7767(_evaluarmedicofami_7767) },
        event_f9: () => { _datoscompletfamiliar_7767(_evaluarmedicofami_7767) }
    },
        _evaluarentidadfact_7767,
        () => {
            $_MEDFAMIPACIW = $("#medicofam_110c").val();

            if (($_MEDFAMIPACIW == '0') || ($_MEDFAMIPACIW.trim() == '')) {
                $_MEDFAMIPACIW = '';
                $_DESCRIPMEDPACIW = '';
                $("#medicofamd_110c").val($_DESCRIPMEDPACIW);
                _evaluaremail_7767();
            } else {
                $_MEDFAMIPACIW = $_MEDFAMIPACIW.padStart(10, "0");
                $("#medicofam_110c").val($_MEDFAMIPACIW);
                LLAMADO_DLL({
                    dato: [$_MEDFAMIPACIW],
                    callback: _dataSAL7767_12,
                    nombredll: 'SER110C_12',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}


function _dataSAL7767_12(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPMEDPACIW = date[1].trim();
    if (swinvalid == "00") {
        $("#medicofamd_110c").val($_DESCRIPMEDPACIW);
        _evaluaremail_7767();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarmedicofami_7767();
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}

function _evaluaremail_7767() {
    _FloatText({ estado: 'off' });
    if ($_NITUSU == '0830092718' || $_NITUSU == '0830092719' || $_NITUSU == '0900193162') {
        confirmar_7767();
    } else {
        _ventanacorreo_SER110C()
    }
}
function _ventanacorreo_SER110C() {
    var ventanaemail_SER110C = bootbox.dialog({
        size: "medium",
        title: "EMAIL DEL PACIENTE",
        message:
            '<div class="row"> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12"> ' +
            '<div class="inline-inputs">' +
            '<label class="col-md-5 col-sm-10 col-xs-12 control-label" for="name">' +
            "Email:" +
            "</label> " +
            '<div class="input-group col-md-7 col-sm-2 col-xs-12" id="CORREOPACI_110C"> ' +
            '<input id="correopacie_110c" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="80"> ' +
            "</div> " +
            "</div>" +
            "</div> " +
            "</div>",
        buttons: {
            confirm: {
                label: "Aceptar",
                className: "btn-primary",
                callback: function () {
                    ventanaemail_SER110C.off("show.bs.modal");
                    setTimeout(confirmar_7767, 500);
                },
            },
            cancelar: {
                label: "Cancelar",
                className: "btn-danger",
                callback: function () {
                    ventanaemail_SER110C.off("show.bs.modal");
                    setTimeout(_evaluarmedicofami_7767, 500);
                },
            },
        },
    });
    ventanaemail_SER110C.init($(".modal-footer").hide());
    ventanaemail_SER110C.init(_evaluarcorreo_SER110C());
    ventanaemail_SER110C.on("shown.bs.modal", function () {
        $("#correopacie_110c").focus();
    });
}

function _evaluarcorreo_SER110C() {
    _inputControl("disabled");
    $("#correopacie_110c").val($_EMAILPACIW)
    validarInputs({
        form: "#CORREOPACI_110C",
        orden: "1"
    }, () => { $('.btn-danger').click() },
        () => {
            $_EMAILPACIW = $("#correopacie_110c").val().toUpperCase(); $("#correopacie_110c").val($_EMAILPACIW)
            if ($_EMAILPACIW.trim() == '') {
                $('.btn-primary').click();
            } else {
                var correo = $_EMAILPACIW.indexOf("@")
                if (correo < 1) {
                    CON851('2K', '2K', null, 'error', 'error');
                    _evaluarcorreo_SER110C();
                } else {
                    $('.btn-primary').click();
                }
            }

        }
    )
}

function _ventanaseccund_7767() {
    console.log('ventana sec cund')
    confirmar_7767();
}

function confirmar_7767() {
    CON851P('01', _evaluarentidadfact_7767, _opcionesgrabar_7767)
}
function _retiroregistro_7767() {
    $_LLAVEAUDW = $_CODPACIW;
    grabar_auditoria_SALUD(
        {
            'TIPO': 'IS767',
            'NOVED': $_NOVEDAD7767,
            'LLAVE': $_LLAVEAUDW,
            'ARCH': "PACIENTES      "
        },
        () => {
            loader("hide")
            CON851P('54', _evaluarpaciente_7767, _opcionesgrabar_7767)
        })
}

function _opcionesgrabar_7767() {
    if ($_NOVEDAD7767 == '7') {
        $_OPERCREAPACIW = $_ADMINW.padEnd(4, ' ');
        $_FECHACREAPACIW = moment().format('YYYYMMDD');
        $_HORACREAPACIW = moment().format('HHmm');
        $_OPERMODIFPACIW = ''
        $_OPERMODIFPACIW = $_OPERMODIFPACIW.padEnd(4, ' ');
        $_FECHAMODIFPACIW = ''
        $_FECHAMODIFPACIW = $_FECHAMODIFPACIW.padEnd(8, '0')
        $_HORAMODIFPACIW = '';
        $_HORAMODIFPACIW = $_HORAMODIFPACIW.padEnd(4, '0');
        $_HEMOCLASPAC = $_GRPSANGPACIW.padStart(2, ' ') + $_RHPACIW;
        $_RESTRICCIONPACIW = $_RESTAPLIPACIW + $_RESTDROGPACIW + $_RESTCIRUPACIW + $_RESTLABOPACIW + $_RESTIMAGPACIW + $_RESTESTAPACIW + $_RESTCONSPACIW + $_RESTTERFPACIW + $_RESTTEROPACIW + $_RESTADONPACIW + $_RESTPYPPACIW;
        $_APELLIDO1PACW.padEnd(15, ' ');
        $_APELLIDO2PACW.padEnd(15, ' ');
        $_NOMBRE1PACW.padEnd(12, ' ');
        $_NOMBRE2PACW.padEnd(12, ' ');
        $_NOMB1ACOMPPACIW.padEnd(12, ' ');
        $_NOMB2ACOMPPACIW.padEnd(12, ' ');
        $_APEL1ACOMPPACIW.padEnd(15, ' ');
        $_APEL2ACOMPPACIW.padEnd(15, ' ');
        LLAMADO_DLL({
            dato: [$_NOVEDAD7767, $_CODPACIW, $_TIPOPACIW, $_LUGARIDPACIW, $_APELLIDO1PACW, $_APELLIDO2PACW, $_NOMBRE1PACW, $_NOMBRE2PACW,
                $_NACIMPACIW, $_HEMOCLASPAC, $_SEXOPACIW, $_ESTCIVILPACIW, $_NIVESTUPACIW, $_ZONAPACIW, $_PADREPACIW, $_MADREPACIW,
                $_DIRPACIW, $_TELPACIW, $_CELPACIW, $_CIUPACIW, $_OCUPPACIW, $_PAISPACIW, $_ESTRATOPACIW, $_COPAGOPACIW, $_REGIMENPACIW,
                $_INSTITUTOPACIW, $_ETNIAPACIW, $_COMUNIPACW, $_RESGUARPACIW, $_TIPOAFILPACIW, $_PORTABPACIW, $_CIUDASEGPACIW,
                $_EPSPACIW, $_CONTRATOPACIW, $_FECHAAFILPACIW, $_FICHAPACIW, $_CARNETPACIW, $_FECHAVENCEPACIW, $_FECHADEMPACIW,
                $_DEMANINDPACIW, $_IDCOTIPACIW, $_PARENTPACIW, $_VICTICONFLICPACIW, $_PROGEPSPACIW, $_ALTCOSPACIW, $_TUTELAPACIW,
                $_EMPRESAPACIW, $_CRONICOPACIW, $_PATOLCRONICPACIW, $_CLASIFPACIW, $_TIPOACOMPPACIW, $_IDACOMPPACIW, $_APEL1ACOMPPACIW,
                $_APEL2ACOMPPACIW, $_NOMB1ACOMPPACIW, $_NOMB2ACOMPPACIW, $_TELACOMPACIW, $_CERTESTUDPACIW, $_PERIESTUDPACIW,
                $_ULTMAMOPACIW, $_CERTECONOPACIW, $_PERIECOPACIW, $_MULTICONSULPACIW, $_RESTRICCIONPACIW, $_VCMPACIW, $_DERECHOPACIW,
                $_OBSERVPACIW, $_DISCAPPACIW, $_EMBALTOPACIW, $_ENTIFACTPACIW, $_FECHANITPACIW, $_ANTCANCERPACIW, $_MEDFAMIPACIW,
                $_EMAILPACIW, $_OPERCREAPACIW, $_FECHACREAPACIW, $_HORACREAPACIW, $_OPERMODIFPACIW, $_FECHAMODIFPACIW, $_HORAMODIFPACIW, $_BLOQUEOHCW,
                $_LLAVEBARRIOSW, $_RESULTADOCOVIDPACIW],
            callback: _dataSAL7767_13,
            nombredll: 'SER110C_13',
            carpeta: 'SALUD'
        });

    } else if ($_NOVEDAD7767 == '8') {
        grabar_auditoria_SALUD(
            {
                'TIPO': 'IS767',
                'NOVED': $_NOVEDAD7767,
                'LLAVE': $_LLAVEAUDW,
                'ARCH': "PACIENTES      "
            },
            () => {
                loader("hide")
                toastr.success('Se ha guardado', 'MAESTRO PACIENTES');
                $_OPERMODIFPACIW = $_ADMINW;
                $_FECHAMODIFPACIW = moment().format('YYYYMMDD');
                $_HORAMODIFPACIW = moment().format('HHmm');
                $_HEMOCLASPAC = $_GRPSANGPACIW.padStart(2, ' ') + $_RHPACIW;
                $_RESTRICCIONPACIW = $_RESTAPLIPACIW + $_RESTDROGPACIW + $_RESTCIRUPACIW + $_RESTLABOPACIW + $_RESTIMAGPACIW + $_RESTESTAPACIW + $_RESTCONSPACIW + $_RESTTERFPACIW + $_RESTTEROPACIW + $_RESTADONPACIW + $_RESTPYPPACIW;
                $_APELLIDO1PACW.padEnd(15, ' ');
                $_APELLIDO2PACW.padEnd(15, ' ');
                $_NOMBRE1PACW.padEnd(12, ' ');
                $_NOMBRE2PACW.padEnd(12, ' ');
                $_NOMB1ACOMPPACIW.padEnd(12, ' ');
                $_NOMB2ACOMPPACIW.padEnd(12, ' ');
                $_APEL1ACOMPPACIW.padEnd(15, ' ');
                $_APEL2ACOMPPACIW.padEnd(15, ' ');

                LLAMADO_DLL({
                    dato: [$_NOVEDAD7767, $_CODPACIW, $_TIPOPACIW, $_LUGARIDPACIW, $_APELLIDO1PACW, $_APELLIDO2PACW, $_NOMBRE1PACW, $_NOMBRE2PACW,
                        $_NACIMPACIW, $_HEMOCLASPAC, $_SEXOPACIW, $_ESTCIVILPACIW, $_NIVESTUPACIW, $_ZONAPACIW, $_PADREPACIW, $_MADREPACIW,
                        $_DIRPACIW, $_TELPACIW, $_CELPACIW, $_CIUPACIW, $_OCUPPACIW, $_PAISPACIW, $_ESTRATOPACIW, $_COPAGOPACIW, $_REGIMENPACIW,
                        $_INSTITUTOPACIW, $_ETNIAPACIW, $_COMUNIPACW, $_RESGUARPACIW, $_TIPOAFILPACIW, $_PORTABPACIW, $_CIUDASEGPACIW,
                        $_EPSPACIW, $_CONTRATOPACIW, $_FECHAAFILPACIW, $_FICHAPACIW, $_CARNETPACIW, $_FECHAVENCEPACIW, $_FECHADEMPACIW,
                        $_DEMANINDPACIW, $_IDCOTIPACIW, $_PARENTPACIW, $_VICTICONFLICPACIW, $_PROGEPSPACIW, $_ALTCOSPACIW, $_TUTELAPACIW,
                        $_EMPRESAPACIW, $_CRONICOPACIW, $_PATOLCRONICPACIW, $_CLASIFPACIW, $_TIPOACOMPPACIW, $_IDACOMPPACIW, $_APEL1ACOMPPACIW,
                        $_APEL2ACOMPPACIW, $_NOMB1ACOMPPACIW, $_NOMB2ACOMPPACIW, $_TELACOMPACIW, $_CERTESTUDPACIW, $_PERIESTUDPACIW,
                        $_ULTMAMOPACIW, $_CERTECONOPACIW, $_PERIECOPACIW, $_MULTICONSULPACIW, $_RESTRICCIONPACIW, $_VCMPACIW, $_DERECHOPACIW,
                        $_OBSERVPACIW, $_DISCAPPACIW, $_EMBALTOPACIW, $_ENTIFACTPACIW, $_FECHANITPACIW, $_ANTCANCERPACIW, $_MEDFAMIPACIW,
                        $_EMAILPACIW, $_OPERCREAPACIW, $_FECHACREAPACIW, $_HORACREAPACIW, $_OPERMODIFPACIW, $_FECHAMODIFPACIW, $_HORAMODIFPACIW, $_BLOQUEOHCW,
                        $_LLAVEBARRIOSW, $_RESULTADOCOVIDPACIW],
                    callback: _dataSAL7767_13,
                    nombredll: 'SER110C_13',
                    carpeta: 'SALUD'
                });


            }
        )
    } else if ($_NOVEDAD7767 == '9') {

        $_OPERMODIFPACIW = $_ADMINW;
        $_FECHAMODIFPACIW = moment().format('YYYYMMDD');
        $_HORAMODIFPACIW = moment().format('HHmm');
        $_HEMOCLASPAC = $_GRPSANGPACIW.padStart(2, ' ') + $_RHPACIW;
        $_RESTRICCIONPACIW = $_RESTAPLIPACIW + $_RESTDROGPACIW + $_RESTCIRUPACIW + $_RESTLABOPACIW + $_RESTIMAGPACIW + $_RESTESTAPACIW + $_RESTCONSPACIW + $_RESTTERFPACIW + $_RESTTEROPACIW + $_RESTADONPACIW + $_RESTPYPPACIW;

        LLAMADO_DLL({
            dato: [$_NOVEDAD7767, $_CODPACIW, $_TIPOPACIW, $_LUGARIDPACIW, $_APELLIDO1PACW, $_APELLIDO2PACW, $_NOMBRE1PACW, $_NOMBRE2PACW,
                $_NACIMPACIW, $_HEMOCLASPAC, $_SEXOPACIW, $_ESTCIVILPACIW, $_NIVESTUPACIW, $_ZONAPACIW, $_PADREPACIW, $_MADREPACIW,
                $_DIRPACIW, $_TELPACIW, $_CELPACIW, $_CIUPACIW, $_OCUPPACIW, $_PAISPACIW, $_ESTRATOPACIW, $_COPAGOPACIW, $_REGIMENPACIW,
                $_INSTITUTOPACIW, $_ETNIAPACIW, $_COMUNIPACW, $_RESGUARPACIW, $_TIPOAFILPACIW, $_PORTABPACIW, $_CIUDASEGPACIW,
                $_EPSPACIW, $_CONTRATOPACIW, $_FECHAAFILPACIW, $_FICHAPACIW, $_CARNETPACIW, $_FECHAVENCEPACIW, $_FECHADEMPACIW,
                $_DEMANINDPACIW, $_IDCOTIPACIW, $_PARENTPACIW, $_VICTICONFLICPACIW, $_PROGEPSPACIW, $_ALTCOSPACIW, $_TUTELAPACIW,
                $_EMPRESAPACIW, $_CRONICOPACIW, $_PATOLCRONICPACIW, $_CLASIFPACIW, $_TIPOACOMPPACIW, $_IDACOMPPACIW, $_APEL1ACOMPPACIW,
                $_APEL2ACOMPPACIW, $_NOMB1ACOMPPACIW, $_NOMB2ACOMPPACIW, $_TELACOMPACIW, $_CERTESTUDPACIW, $_PERIESTUDPACIW,
                $_ULTMAMOPACIW, $_CERTECONOPACIW, $_PERIECOPACIW, $_MULTICONSULPACIW, $_RESTRICCIONPACIW, $_VCMPACIW, $_DERECHOPACIW,
                $_OBSERVPACIW, $_DISCAPPACIW, $_EMBALTOPACIW, $_ENTIFACTPACIW, $_FECHANITPACIW, $_ANTCANCERPACIW, $_MEDFAMIPACIW,
                $_EMAILPACIW, $_OPERCREAPACIW, $_FECHACREAPACIW, $_HORACREAPACIW, $_OPERMODIFPACIW, $_FECHAMODIFPACIW, $_HORAMODIFPACIW, $_BLOQUEOHCW,
                $_LLAVEBARRIOSW, $_RESULTADOCOVIDPACIW],
            callback: _dataSAL7767_13,
            nombredll: 'SER110C_13',
            carpeta: 'SALUD'
        });


    }
}



function _dataSAL7767_13(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_TIENEPAGAREW == 'S') {
            var ventanapagare_SER110C = bootbox.dialog({
                size: "medium",
                title: "NOTAS A LOS PACIENTES",
                message: '<style type="text/css">' + '.modal-footer {' +
                    +'padding: 73px;' +
                    'text-align: right;' +
                    'margin-top:38px;' +
                    'border-top: 1px solid #e5e5e5;}' +
                    '</style>' +
                    '<div class="table-scrollable">' +
                    '<table class="table table-striped table-hover">' +
                    '<thead><tr>' +
                    '<th>Fecha</th>' +
                    '<th>observaciones</th>' +
                    '<th>Valor</th>' +
                    '<th>factura</th>' +
                    '</tr></thead>' +
                    '<tbody>' +
                    //registro existente
                    '<tr class="encontrado">' +
                    `<td>${$_FECHANOTAPACIW}</td>` +
                    `<td>${$_OBSERVNOTAPACIW}</td>` +
                    `<td>${$_VALORPAGAREW}</td>` +
                    `<td>${$_FACTURAPAGAREW}</td>` +
                    '</tbody>' +
                    '</table>' +
                    '</div>'
                ,
                buttons: {
                    Aceptar: {
                        span: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanapagare_SER110C.off('show.bs.modal');
                            setTimeout(_procesofinalizar_SER110C, 500);

                        }
                    }
                }
            });
        } else {
            _procesofinalizar_SER110C()
        }

    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');
        let Window = BrowserWindow.getAllWindows();
        if (Window.length > 1) {
            _cerrarSegundaVentana();
        } else {
            _validarSalida_ser110c()
        };
    } else {
        CON852(date[0], date[1], date[2], _validarSalida_ser110c);
    }
}
function _procesofinalizar_SER110C() {
    if ($_NOVEDAD7767 == '7') {
        $_LLAVEAUDW = $_CODPACIW;
        grabar_auditoria_SALUD(
            {
                'TIPO': 'IS767',
                'NOVED': $_NOVEDAD7767,
                'LLAVE': $_LLAVEAUDW,
                'ARCH': "PACIENTES      "
            },
            () => {
                loader("hide")
                toastr.success('Se ha guardado', 'MAESTRO PACIENTES');
                _grabarcorresponsalia();
            }
        )
    } else {
        _grabarcorresponsalia();
    }
}

function _grabarcorresponsalia() {
    $_OPSEGU = "IS767C"
    let URL = get_url("APP/CONTAB/CON904.DLL");
    postData({ datosh: datosEnvio() + $_ADMINW + $_OPSEGU }, URL)
        .then(data => {
            if (($_NOVEDAD7767 == '7') || ($_NOVEDAD7767 == '8')) {
                if ($_ACTUALIZAPACIX == '1') {
                    CON851P('24', _deseatrasladardoc, _ventanaactualizarcorresponsalia)
                } else {
                    CON851P('24', _saliropcion_7767, _ventanaactualizarcorresponsalia)
                }
            } else {
                CON851P('24', _saliropcion_7767, _ventanaactualizarcorresponsalia)
            }
        })
        .catch(err => {
            CON851(swinvalid, swinvalid, null, 'error', 'error')
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _validarSalida_ser110c()
            };
        })
}
function _ventanaactualizarcorresponsalia() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER110CCR.html', cedula: $_CODPACIW.padStart(15, '0') });
    vector = ['on', 'Actualizando corresponsalia de pacientes...']
    _EventocrearSegventana(vector, _saliropcion_7767);
}
function _saliropcion_7767() {
    loader("hide")
    _inputControl("reset");
    _inputControl("disabled");
    let Window = BrowserWindow.getAllWindows();
    if (Window.length > 1) {
        _cerrarSegundaVentana();
    } else {
        _validarSalida_ser110c()
    };
}

/////////////////TRASLADO DE DOCUMENTO///////////
function _deseatrasladardoc() {
    $_OPSEGU = "IS762"
    postData({
        datosh: `${datosEnvio()}${localStorage.Usuario}|${$_OPSEGU}|`
    },
        get_url("APP/CONTAB/CON904S.DLL"))
        .then(data => {
            // callback(data);
            if ($_ACTUALIZAPACIX == '1') {
                CON851P('25', _saliropcion_7767, _buscartrasladodoc_7767)
            } else {
                let Window = BrowserWindow.getAllWindows();
                if (Window.length > 1) {
                    _cerrarSegundaVentana();
                } else {
                    _validarSalida_ser110c()
                };
            }
        })
        .catch(error => {
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _validarSalida_ser110c()
            };
        });

}


function _buscartrasladodoc_7767() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER7621.html' });
    vector = ['on', 'Unifica movimiento de pacientes...']
    _EventocrearSegventana(vector, _saliropcion_7767);
    ////// VENTANA DE TRASLADO 0101DE DOCUMENTO 
}

//////////////////////////////// NOVEDAD 8  Y 9//////////////////////////////
function _cambio_7767() {
    console.log('agregar datos')
    $_LLAVEAUDW = $_CODPACIW;
    $('#identif_110c').val($_TIPOPACIW);
    primerapellido_SER110C.typedValue = $_APELLIDO1PACW;
    segundoapellido_SER110C.typedValue = $_APELLIDO2PACW;
    primernombre_SER110C.typedValue = $_NOMBRE1PACW;
    segundonombre_SER110C.typedValue = $_NOMBRE2PACW;
    $_ANONACIMPACIW = $_NACIMPACIW.substring(0, 4);
    $_MESNACIMPACIW = $_NACIMPACIW.substring(4, 6);
    $_DIANACIMPACIW = $_NACIMPACIW.substring(6, 8);
    $('#anonac_110c').val($_ANONACIMPACIW);
    $('#mesnac_110c').val($_MESNACIMPACIW);
    $('#dianac_110c').val($_DIANACIMPACIW);
    var edad = calcular_edad($_NACIMPACIW);
    $("#edad_110c").val(edad.unid_edad + edad.vlr_edad.toString().padStart('0'));
    $_UNIDEDADW = edad.unid_edad;
    $_VLREDADW = edad.vlr_edad.toString().padStart('0');
    $('#gruposang_110c').val($_GRPSANGPACIW);
    $('#rh_110c').val($_RHPACIW);
    $('#sexo_110c').val($_SEXOPACIW);
    let estadocivil = { 'S': 'SOLTERO', 'C': 'CASADA', 'U': 'UNION LIBRE', 'V': 'VIUDO', 'D': 'SEPARADO' };
    if (estadocivil[$_ESTCIVILPACIW] == undefined) {
        $('#civil_110c').val('');
    } else {
        $('#civil_110c').val($_ESTCIVILPACIW + ' - ' + estadocivil[$_ESTCIVILPACIW]);
    }

    let nivelestudio = { '1': 'NINGUNO', '2': 'PRE-ESCOL', '3': 'PRIMARIA', '4': 'SECUNDARIA', '5': 'BACH.BASI', '6': 'BACH.TECN', '7': 'NORMALIST', '8': 'TECN.PROFE', '9': 'TECNOLOGI', 'A': 'PROFESION', 'B': 'ESPECIALI', 'C': 'MAESTRIA', 'D': 'DOCTORADO' };
    if (nivelestudio[$_NIVESTUPACIW] == undefined) {
        $('#estudio_110c').val('');
    } else {
        $('#estudio_110c').val($_NIVESTUPACIW + ' - ' + nivelestudio[$_NIVESTUPACIW]);
    }
    $('#zona_110c').val($_ZONAPACIW);
    $('#padre_110c').val($_PADREPACIW);
    $('#madre_110c').val($_MADREPACIW);
    $('#direccion_110c').val($_DIRPACIW);
    $('#tel1_110c').val($_TELPACIW);
    $('#tel2_110c').val($_CELPACIW);
    $('#ciudad_110c').val($_CIUPACIW);
    $('#ciudadd_110c').val($_NOMCIUPACIW);
    $('#ocupacion_110c').val($_OCUPPACIW);
    $('#ocupaciond_110c').val($_NOMOCUPPACIW);
    $('#pais_110c').val($_PAISPACIW);
    $('#barrio_110c').val($_CODBARRIOPACIW);
    $('#descripbarrio_110c').val($_DESCRIPBARRIOS);
    let nivel = { '0': 'NIVEL 0', '1': 'NIVEL 1', '2': 'NIVEL 2', '3': 'NIVEL 3', '4': 'NIVEL 4', '5': 'NIVEL 5', '6': 'NIVEL 6' };
    if (nivel[$_ESTRATOPACIW] == undefined) {
        $('#nivel_110c').val('');
    } else {
        $('#nivel_110c').val($_ESTRATOPACIW + ' - ' + nivel[$_ESTRATOPACIW]);
    }

    $('#copago_110c').val($_COPAGOPACIW);
    let regimen = { 'C': 'CONTRIBUTIVO', 'S': 'SUBSIDIADO', 'V': 'VINCULADO', 'P': 'PARTICULAR', 'O': 'OTRO TIPO', 'D': 'DESPLAZ CONT', 'E': 'DESPLAZ SUBS', 'G': 'DESPLAZ VINC' };
    if (regimen[$_REGIMENPACIW] == undefined) {
        $('#regimen_110c').val('');
    } else {
        $('#regimen_110c').val($_REGIMENPACIW + ' - ' + regimen[$_REGIMENPACIW]);
    }
    $('#colegio_110c').val($_INSTITUTOPACIW.trim());
    $('#colegiod_110c').val($_DESCRIPINSTIPACIW);
    let etnia = { '1': 'INGENA', '2': 'RAIZAL', '3': 'GITANO', '4': 'AFROCO', '5': 'ROM', '6': 'MESTIZO', '9': 'NO APLICA' };
    if (etnia[$_ETNIAPACIW] == undefined) {
        $('#etnia_110c').val('')
    } else {
        $('#etnia_110c').val($_ETNIAPACIW + ' - ' + etnia[$_ETNIAPACIW]);
    }
    $('#comunidades_110c').val($_COMUNIPACW);
    $('#resguardos_110c').val($_RESGUARPACIW);
    let afiliado = { '1': 'COTIZANTE', '2': 'BENEFICIARIO', '3': 'COT. PENSIONADO', '4': 'UPC ADICIONAL', '5': 'CABEZA FAMILIA', '6': 'GRUPO FAMILIAR', '0': 'SIN DETERMINAR' };
    if (afiliado[$_TIPOAFILPACIW] == undefined) {
        $('#tipoafil_110c').val('');
    } else {
        $('#tipoafil_110c').val($_TIPOAFILPACIW + ' - ' + afiliado[$_TIPOAFILPACIW]);
    }
    $('#portabilidad_7767').val($_PORTABPACIW);
    $('#ciudadportab_7767').val($_CIUDASEGPACIW);
    $('#eps_110c').val($_EPSPACIW);
    $('#epsd_110c').val($_NOMEPSPACIW);
    $('#contrato_110c').val($_CONTRATOPACIW);
    $_ANOAFILPACIW = $_FECHAAFILPACIW.substring(0, 4);
    $_MESAFILPACIW = $_FECHAAFILPACIW.substring(4, 6);
    $_DIAAFILPACIW = $_FECHAAFILPACIW.substring(6, 8);
    $('#fechaafil_110c').val($_ANOAFILPACIW + '/' + $_MESAFILPACIW + '/' + $_DIAAFILPACIW);
    $('#ficha_110c').val($_FICHAPACIW);
    $('#carnet_110c').val($_CARNETPACIW);
    $('#lugar_110c').val($_LUGARIDPACIW);
    $_ANOVENCEPACIW = $_FECHAVENCEPACIW.substring(0, 4);
    $_MESVENCEPACIW = $_FECHAVENCEPACIW.substring(4, 6);
    $_DIAVENCEPACIW = $_FECHAVENCEPACIW.substring(6, 8);
    $('#fechavence_110c').val($_ANOVENCEPACIW + '/' + $_MESVENCEPACIW + '/' + $_DIAVENCEPACIW);
    if ($_FECHAVENCEPACIW > $_FECHAACTUAL) {
        $_DERECHOPACIW = '2';
        $_CLASIFPACIW = 'R';
    }
    $_ANODEMPACIW = $_FECHADEMPACIW.substring(0, 4);
    $_MESDEMPACIW = $_FECHADEMPACIW.substring(4, 6);
    $_DIADEMPACIW = $_FECHADEMPACIW.substring(6, 8);
    $('#fechademan_110c').val($_ANODEMPACIW + '/' + $_MESDEMPACIW + '/' + $_DIADEMPACIW);
    $('#demandaindu_110c').val($_DEMANINDPACIW);
    $('#cotizante_110c').val($_IDCOTIPACIW);
    $('#cotizanted_110c').val($_DESCRIPCOTIPACW);
    let parentezco = { '01': 'CONYUGUE', '02': 'HIJO', '03': 'PADRES', '04': '2 GRADO', '05': '3 GRADO', '06': '< 12', '07': 'SUEGRO', '08': 'OTR-BE', '00': 'COTIZANTE' };
    if (parentezco[$_PARENTPACIW] == undefined) {
        $('#parentezco_110c').val('');
    } else {
        $('#parentezco_110c').val($_PARENTPACIW + ' - ' + parentezco[$_PARENTPACIW]);
    }
    $('#victimac_110c').val($_VICTICONFLICPACIW);
    $('#proespecial_110c').val($_PROGEPSPACIW);
    $('#altocosto_110c').val($_ALTCOSPACIW);
    $('#pacitutela_110c').val($_TUTELAPACIW);
    $('#empresalab_110c').val($_EMPRESAPACIW);
    $('#cronica_110c').val($_CRONICOPACIW);
    $('#patologiacronica_110c').val($_PATOLCRONICPACIW);
    $('#clasif_110c').val($_CLASIFPACIW);
    $_ANOCERTESTUDPACIW = $_CERTESTUDPACIW.substring(0, 4);
    $_MESCERTESTUDPACIW = $_CERTESTUDPACIW.substring(4, 6);
    $('#fechamatr_110c').val($_ANOCERTESTUDPACIW + '/' + $_MESCERTESTUDPACIW);
    $('#matr_110c').val($_PERIESTUDPACIW);
    $_ANOULTMAMOPACIW = $_ULTMAMOPACIW.substring(0, 4);
    $_MESULTMAMOPACIW = $_ULTMAMOPACIW.substring(4, 6);
    $('#mamografia_110c').val($_ANOULTMAMOPACIW + '/' + $_MESULTMAMOPACIW);
    $_ANOCERTECONOPACIW = $_CERTECONOPACIW.substring(0, 4);
    $_MESCERTECONOPACIW = $_CERTECONOPACIW.substring(4, 6);
    $('#fechaecono_110c').val($_ANOCERTECONOPACIW + '/' + $_MESCERTECONOPACIW);
    $('#econo_110c').val($_PERIECOPACIW);
    $('#policonsul_110c').val($_MULTICONSULPACIW);
    $('#restric_110c').val($_RESTAPLIPACIW);
    $('#drog_110c').val($_RESTDROGPACIW);
    $('#cirug_110c').val($_RESTCIRUPACIW);
    $('#lab_110c').val($_RESTLABOPACIW);
    $('#rx_110c').val($_RESTIMAGPACIW);
    $('#estanc_110c').val($_RESTESTAPACIW);
    $('#consult_110c').val($_RESTCONSPACIW);
    $('#fisiot_110c').val($_RESTTERFPACIW);
    $('#terap_110c').val($_RESTTEROPACIW);
    $('#odont_110c').val($_RESTADONPACIW);
    $('#pyp_110c').val($_RESTPYPPACIW);
    $('#vcm_110c').val($_VCMPACIW);
    let derecho = { '1': 'En base de datos, ACTIVO', '2': 'En base de datos, INACTIVO', '3': 'Creado por el  usuario', '4': 'Pendiente por determinar', '5': 'En base de datos, SIN CARNET', '6': 'SUSPENDIDO, requiere autoriz', '7': 'Afiliado Fallecido', '8': 'Retiro X Multiafiliado', '9': 'Ingreso X Traslado', 'A': 'Retiro  X Traslado', 'B': 'Periodo integral' };
    if (derecho[$_DERECHOPACIW] == undefined) {
        $('#basedatos_110c').val('');
    } else {
        $('#basedatos_110c').val($_DERECHOPACIW + ' - ' + derecho[$_DERECHOPACIW]);
    }
    $('#observaciones_110c').val($_OBSERVPACIW);
    let discapacidad = { '1': 'SIN DISCAPACI', '2': 'DISC.FISICA', '3': 'DISC.AUDITIVA', '4': 'DISC.VISUAL', '5': 'DISC.MENTAL', '6': 'DISC.COGNITIV' };
    if (discapacidad[$_DISCAPPACIW] == undefined) {
        $('#discapacidad_110').val('');
    } else {
        $('#discapacidad_110c').val($_DISCAPPACIW + ' - ' + discapacidad[$_DISCAPPACIW]);
    }
    $('#altoriesgo_110c').val($_EMBALTOPACIW);
    if ($_ENTIFACTPACIW == 0) {
        $_DESCRIPENTIPACIW = ' '
        $('#entidad_110c').val($_ENTIFACTPACIW);
        $('#entidadd_110c').val($_DESCRIPENTIPACIW);
    }
    $('#entidad_110c').val($_ENTIFACTPACIW);
    $('#entidadd_110c').val($_DESCRIPENTIPACIW);
    $('#fechasistd_110c').val($_FECHANITPACIW);
    if ($_MEDFAMIPACIW == '0000000000') $_MEDFAMIPACIW = '';
    $('#medicofam_110c').val($_MEDFAMIPACIW);
    $('#medicofamd_110c').val($_DESCRIPMEDPACIW);
    if ($_NITUSU == '0830092718' || $_NITUSU == '0830092719' || $_NITUSU == '0900193162') {
        $('#EMAIL2_SER110C').removeClass('hidden');
        $("#correo2_110c").val($_EMAILPACIW);
    }
    $('#fact_110c').val($_OPERCREAPACIW);
    $('#fechaact_110c').val($_FECHACREAPACIW);
    $_HORACREA = $_HORACREAPACIW.substring(0, 2);
    $_MINCREA = $_HORACREAPACIW.substring(2, 4);
    $('#hr_110c').val($_HORACREA + ':' + $_MINCREA);
    $('#modificado_110c').val($_OPERMODIFPACIW);
    $('#fechamodif_110c').val($_FECHAMODIFPACIW);
    $_HORAMOD = $_HORAMODIFPACIW.substring(0, 2);
    $_MINMOD = $_HORAMODIFPACIW.substring(2, 4);
    $('#hrmodif_110c').val($_HORAMOD + ':' + $_MINMOD);
    if ($_NOVEDAD7767 == '9') {
        _retiroregistro_7767();
    } else if ($_NOVEDAD7767 == '8') {
        if ($_VENTANA == 0) {
            if ($_MADREPACIW.trim() == '') {
                if ((($_UNIDEDADW == 'D') || ($_UNIDEDADW == 'M')) || ($_VLREDADW < 18)) {
                    CON851('EK', 'EK', null, 'error', 'error');
                    _dato4_7767();
                } else {
                    _dato4_7767();
                }
            } else {
                _dato4_7767();
            }
        }
    } else {
        _error_7767();
    }
}




/////////////////////////////////// OTRAS VALIDACIONES /////////////////////////////////
function _evaluarcambiosbasedatos_7767(callback) {
    var $_FECHASISTEMA = moment().format('YYMMDD');
    $_ANOSISTEMA = $_FECHASISTEMA.substring(0, 2)
    $_MESSISTEMA = $_FECHASISTEMA.substring(2, 4)
    var SER810K = [];
    let URL = get_url("APP/SALUD/SER810K.DLL");
    postData({
        datosh: datosEnvio() + $_CODPACIW + '|' + $_ANOSISTEMA + '|' + $_MESSISTEMA + '|'
    }, URL)
        .then(data => {
            SER810K = data.BASEDATOS;
            SER810K.pop();
            _ventanaDatos({
                titulo: 'VENTANA DE CAMBIOS',
                columnas: ["FECHA", "HORA", "OPER", "CAMPO", "ANTERIOR", "ACTUAL"],
                data: SER810K,
                callback_esc: () => {
                    callback();
                },
                callback: data => {
                    callback();
                }
            });
        })
        .catch(error => {
            console.log(error);
            esccallback();
        });
}

function _datoscompletfamiliar_7767(callback) {
    var $_FAMILIAR = [];
    let URL = get_url("APP/SALUD/SER810F.DLL");
    postData({
        datosh: datosEnvio() + $_CODPACIW + '|' + $_ADMINW + '|'
    }, URL)
        .then(data => {
            $_FAMILIAR = data.FAMILIAR;
            $_FAMILIAR.pop();
            // var edad = calcular_edad(index.NACIMIENTO);
            // index.EDAD = edad.unid_edad + edad.vlr_edad.toString().padStart(3, '0');
            _ventanaDatos({
                titulo: "VENTANA COTIZANTE ",
                columnas: ["PACIENTE", "CEDULA", "EPS", "NACIM", "PARENT", "ESTADO"],
                data: $_FAMILIAR,
                ancho: '85%',
                callback_esc: () => {
                    callback();
                },
                callback: data => {
                    callback();
                }
            });
        })
        .catch(error => {
            console.log(error);
            callback();
        });
}


function _evaluarantecendentescancer() {
    fuente = '<div class="col-md-12" id="CANCER_110C"> ' +
        '<input id="cancer_110c" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
        '</div>';

    _ventana({
        source: fuente,
        title: 'ANTECEDENTES DE CANCER',
        size: 'small',
        espace: false,
        focus: '#cancer_110c',
        form: '#CANCER_110C',
        order: '1',
        global1: '$_ANTCANCERPACIW',
        inputglobal1: '#cancer_110c',
    }, _validacionantecedentes_7767, _evaluarentidadfact_7767);
}

function _validacionantecedentes_7767() {
    if (($_ANTCANCERPACIW == 'S') || ($_ANTCANCERPACIW == 's') || ($_ANTCANCERPACIW == 'N') || ($_ANTCANCERPACIW == 'n')) {
        _evaluarembarazoriesgo_7767();
    } else {
        _evaluarantecendentescancer();
    }
}

function _dato2gmail_7767() {
    validarInputs({
        form: "#CORREO2PACI_110C",
        orden: "1"
    },
        _evaluarentidadfact_7767,
        () => {
            $_EMAILPACIW = $("#correo2_110c").val();
            if ($_EMAILPACIW.trim() == '') {
                CON851('02', '02', _dato2gmail_7767(), 'error', 'error');
            } else {
                var correo2 = $_EMAILPACIW.indexOf("@")
                if (correo2 < 1) {
                    CON851('2K', '2K', _dato2gmail_7767(), 'error', 'error');
                } else {
                    $_CIUPACIW = $_CODCIUDADUSU
                    $_TELPACIW = ''
                    $_CELPACIW = ''
                    $("#ciudad_110c").val($_CIUPACIW);
                    _evaluardireccion_7767();
                }
            }
        }
    )
}




///////////////////////// MASCARAS ///////////////////////////


var momentFormat = 'YYYY/MM/DD HH:mm';

var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);

var momentFormatdos = 'YYYY/MM/DD HH:mm';
var momentMaskfechaafil = IMask($("#fechaafil_110c")[0], {
    mask: Date,
    pattern: momentFormatdos,
    lazy: true,
    min: new Date(1890, 0, 1),
    max: new Date(2019, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormatdos);
    },
    parse: function (str) {
        return moment(str, momentFormatdos);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1890,
            to: 2019
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
});

var momentFormattres = 'YYYY/MM/DD HH:mm';
var momentMaskfechavence = IMask($("#fechavence_110c")[0], {
    mask: Date,
    pattern: momentFormattres,
    lazy: true,
    min: new Date(1890, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormattres);
    },
    parse: function (str) {
        return moment(str, momentFormattres);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1890,
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
});

var momentMaskcertestudio = IMask($("#fechamatr_110c")[0], {
    mask: Date,
    pattern: momentFormattres,
    lazy: true,
    min: new Date(1890, 0),
    max: new Date(2030, 0),

    format: function (date) {
        return moment(date).format(momentFormattres);
    },
    parse: function (str) {
        return moment(str, momentFormattres);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1890,
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
});

var momentMaskcertecno = IMask($("#fechaecono_110c")[0], {
    mask: Date,
    pattern: momentFormattres,
    lazy: true,
    min: new Date(1890, 0),
    max: new Date(2030, 0),

    format: function (date) {
        return moment(date).format(momentFormattres);
    },
    parse: function (str) {
        return moment(str, momentFormattres);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1890,
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
});

var primerapellido_SER110C = IMask($('#apellido1_110c')[0], {
    mask: 'aaaaaaaaaaaaaaa',
    prepare: function (str) {
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toUpperCase();  // Don't do it
    }
})
var segundoapellido_SER110C = IMask($('#apellido2_110c')[0], {
    mask: 'aaaaaaaaaaaaaaa',
    prepare: function (str) {
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toUpperCase();  // Don't do it
    }
})
var primernombre_SER110C = IMask($('#nombre1_110c')[0], {
    mask: 'aaaaaaaaaaaa',
    prepare: function (str) {
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toUpperCase();  // Don't do it
    }
})
var segundonombre_SER110C = IMask($('#nombre2_110c')[0], {
    mask: 'aaaaaaaaaaaa',
    prepare: function (str) {
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toUpperCase();  // Don't do it
    }
})
//////// VENTANAS F8////////////////////////


function _ventanaPacientes(e) {

    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'PACIENTES',
            valoresselect: ['Nombre del paciente'],
            f8data: 'PACIENTES',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
            callback: (data) => {
                $_CODPACIW = data.COD
                $_CODPACIW = $_CODPACIW.padStart(15, '0')
                $("#numero_110c").val($_CODPACIW);
                _enterInput('#numero_110c');
            },
            cancel: () => {
                _enterInput('#numero_110c');
            }
        };
        F8LITE(parametros);
    }
}


function _ventanaciudad_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA DE CIUDADES",
            columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
            data: $_CIUDAD_7767,
            callback_esc: function () {
                $("#ciudad_110c").focus();
            },
            callback: function (data) {
                document.getElementById('ciudad_110c').value = data.COD.trim();
                document.getElementById('ciudadd_110c').value = data.NOMBRE;
                _enterInput('#ciudad_110c');
            }
        });
    }
}

function _ventanalugar_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA DE CIUDADES",
            columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
            data: $_CIUDAD_7767,
            callback_esc: function () {
                $("#lugar_110c").focus();
            },
            callback: function (data) {

                document.getElementById('lugar_110c').value = data.COD.trim();
                _enterInput('#lugar_110c');
            }
        });
    }
}

function _ventanaportabilidad_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA DE CIUDADES",
            columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
            data: $_CIUDAD_7767,
            callback_esc: function () {
                $("#ciudadportab_7767").focus();
            },
            callback: function (data) {
                document.getElementById('ciudadportab_7767').value = data.COD.trim();
                _enterInput('#ciudadportab_7767');
            }
        });
    }
}

function _ventanapais_SAL7767(e) {
    let URL = get_url("APP/" + "SALUD/SER888" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_PAISRIP_7767 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA PAIS RIPS',
                    columnas: ["CODIGO", "DESCRIP"],
                    data: $_PAISRIP_7767.PAISESRIPS,
                    callback_esc: function () {
                        $("#pais_110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('pais_110c').value = data.CODIGO;
                        // document.getElementById('paisd_110c').value = data.DESCRIP;
                        _enterInput('#pais_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaocupaciones_SAL7767(e) {
    let URL = get_url("APP/" + "SALUD/SER854" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_OCUPACIONES_7767 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE OCUPACIONES",
                    columnas: ["CODOCU", "NOMBREOCU"],
                    data: $_OCUPACIONES_7767.OCUPACIONES,
                    ancho: '90%',
                    callback_esc: function () {
                        $("#ocupacion_110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('ocupacion_110c').value = data.CODOCU.trim();
                        document.getElementById('ocupaciond_110c').value = data.NOMBREOCU;
                        _enterInput('#ocupacion_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanacolegios_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE INSTITUCIONES',
            columnas: ["TIPO", "CIUDAD", "SECU", "DESCRIP"],
            data: $_COLEGIOS_7767,
            callback_esc: function () {
                $("#colegio_110c").focus();
            },
            callback: function (data) {
                $_INSTITUTOPACIW = data.TIPO.trim() + data.CIUDAD.trim() + data.SECU.trim();
                $("#colegio_110c").val($_INSTITUTOPACIW);
                // document.getElementById('colegiod_110c').value = data.DESCRIP;
                // $_COLEGIO_PACI = data;
                _enterInput('#colegio_110c');
            }
        });
    }
}

function _ventanaentidades_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE ENTIDADES',
            columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
            // label: ["codigo", "nombre"],
            data: $_ENTIDADES_7767,
            ancho: '90%',
            callback_esc: function () {
                $("#eps_110c").focus();
            },
            callback: function (data) {
                document.getElementById('eps_110c').value = data["COD-ENT"];
                document.getElementById('epsd_110c').value = data['NOMBRE-ENT'];
                _enterInput('#eps_110c');
            }
        });
    }
}

function _ventanamaestrodospaci_SAL7767(e) {

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
            }],
            callback: (data) => {
                document.querySelector("#cotizante_110c").value = data.COD;
                document.querySelector("#cotizante_110c").focus();
            },
            cancel: () => {
                document.querySelector("#cotizante_110c").focus()
            }
        };
        console.log(parametros)
        F8LITE(parametros);

    }
}

function _ventanaacompañante_SER110C(e) {
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
        }],
        callback: (data) => {
            setTimeout(_ventanaacomp_7767, 300)
            setTimeout(() => { $('#idacomp_110C').val(data.COD) }, 400);
        },
        cancel: () => {
            setTimeout(_ventanaacomp_7767, 300)
        }
    };
    F8LITE(parametros);
}



function _ventanaf8base09_SER110C(e) {
    parametros = {
        dll: 'PACIBASE09',
        valoresselect: ['Nombre del paciente'],
        f8data: 'PACIBASE09',
        columnas: [{
            title: 'COD'
        }, {
            title: 'NOMBRE'
        }, {
            title: 'EPS'
        }],
        callback: (data) => {
            setTimeout(_ventanapacientedoc_7767, 300)
            setTimeout(() => { $('#docpacbase09_SER110C').val(data.COD) }, 400);
        },
        cancel: () => {
            setTimeout(_ventanapacientedoc_7767, 300)
        }
    };
    F8LITE(parametros);
}

function _ventanapatologias_SAL7767(e) {
    let URL = get_url("APP/" + "SALUD/SER858" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_PATOLOGIAS_108 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE PATOLOGIAS CRONICAS',
                    columnas: ["COD", "DESCRIP"],
                    data: $_PATOLOGIAS_108.PATOLOGIAS,
                    callback_esc: function () {
                        $("#patologiacronica_110c").focus();
                    },
                    callback: function (data) {
                        $('#patologiacronica_110c').val(data.COD.trim());
                        _enterInput('#patologiacronica_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });

}

function _ventanaclasificacion_SAL7767(e) {
    let URL = get_url("APP/" + "SALUD/SER868" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CLASIPACI_108 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE CLASIFICACION PACI',
                    columnas: ["COD", "NOMBRE"],
                    data: $_CLASIPACI_108.CLASIFICACION,
                    callback_esc: function () {
                        $("#clasif_110c").focus();
                    },
                    callback: function (data) {
                        $('#clasif_110c').val(data.COD.trim());
                        $('#clasifd_110c').val(data.NOMBRE.trim());
                        _enterInput('#clasif_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaterceros_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'TERCEROS',
            valoresselect: ['Buscar por nombre tercero'],
            f8data: 'TERCEROS',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
            callback: (data) => {
                $_ENTIFACTPACIW = data.COD.trim();
                $("#entidad_110c").val($_ENTIFACTPACIW.padStart(10, '0'));
                _enterInput('#entidad_110c');
            },
            cancel: () => {
                _enterInput('#entidad_110c');
            }
        };
        F8LITE(parametros);
    }
}


function _ventanaprofesionales_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE PROFESIONALES',
            data: $_PROFESIONALES_7767,
            columnas: ["NOMBRE", "IDENTIFICACION", "ATIENDE_PROF", "LU", "MA", "MI", "JU", "VI", "SA"],
            callback_esc: function () {
                $("#medicofam_110c").focus();
            },
            callback: function (data) {
                // $('#medicofam_110c').val(data.IDENTIFICACION);
                $_MEDFAMIPACIW = data.IDENTIFICACION.trim();
                $_MEDFAMIPACIW = $_MEDFAMIPACIW.padStart(10, '0');
                $("#medicofam_110c").val($_MEDFAMIPACIW);
                $('#medicofamd_110c').val(data.NOMBRE.trim());
                _enterInput('#medicofam_110c');
            }
        });
    }
}

function _ventanabarrios_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE BARRIOS Y VEREDAS",
            columnas: ["LLAVE", "NOMBRE", "COMUNA", "ZONA"],
            data: $_BARRIOS_7767,
            callback_esc: function () {
                $("#barrio_110c").focus();
            },
            callback: function (data) {

                document.getElementById('barrio_110c').value = data.LLAVE.trim();
                _enterInput('#barrio_110c');
            }
        });
    }
}

function _validarSalida_ser110c() {
    let modulo = localStorage.Modulo;
    if (modulo == "HIC") _regresar_menuhis();
    else _toggleNav();
}