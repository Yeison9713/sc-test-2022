$(document).ready(function(){
    _inputControl("reset");
    _inputControl("disabled");
    loader('hide');
    cargarEnferm();
})

function cargarEnferm() {
    SolicitarDll2({ datosh: datosEnvio() },
        function (data) {
            var res = data.split('|');
            if (res[0].trim() == '00') {
                SolicitarDatos2({},
                    function (enferm) {
                        $_ENFERMEDADES = enferm.ENFERM;
                        $_ENFERMEDADES.pop();
                        leer_historia();
                    },
                    { url: "SC-ARCHENF" });
            } else {
                plantillaError(res[0], res[1], res[2]);
            }
        }
        , { url: "app/HCENFER.Dll", modulo: "HICLIN" });
}

function leer_historia() {
    var data = dataSession();
    datos_envio = datosEnvio();
    datos_envio += $LLAVE_HC;
    datos_envio += "|";
    datos_envio += data.split('|')[1];
    datos_envio += "|";
    SolicitarDll2({ datosh: datos_envio },
        function (data) {
            var res = data.split('|');
            $novedad = res[1];
            if (res[0].trim() == '00') {
                SolicitarDatos2({}, function (HC_PAC) { $DATOS_HC = HC_PAC['HC-PAC']; montar_pantallas(); }, { url: "SC-HCPAC" });
            } else {
                plantillaError(res[0], res[1], res[2]);
            }
        }
        , { url: "app/HC-01.Dll", modulo: "HICLIN" });
}

function montar_pantallas() {
    var fecha = $DATOS_HC[0].FECHA;
    var hora = $DATOS_HC[0].HORA;
    $('#ano_hc_01').val(fecha.substr(0, 4));
    $('#mes_hc_01').val(fecha.substr(4, 2));
    $('#dia_hc_01').val(fecha.substr(6, 2));
    $('#hora_hc_01').val(hora.substr(0, 2));
    $('#min_hc_01').val(hora.substr(2, 2));
    $('#med_hc_01').val(sessionStorage.getItem('Usuar'));
    if ($novedad == '8') {
        $('#act_hc_01').val('Actualizando');
    } else {
        $('#act_hc_01').val('Creando');
    }
    $('#descrip_hc_01').val($DATOS_HC[0].SERV);
    _evaluartabla();
    $conteocoddiag = 0;
}

function _evaluartabla(){
    validarInputs({
        form: "#COD_HC_02F",
        orden: "1"
    },
        function () { _toogleNav(); },
        _validarcodtabla
    )
}
function _validarcodtabla(){
    var cod = $("#cod_hc_02f").val();
    for (i = 0; i < $_ENFERMEDADES.length; i++) {
        if (cod == $_ENFERMEDADES[i].COD) {
            var json = '[{"COD": "' + $_ENFERMEDADES[i].COD + '","DESCRIP": "' + $_ENFERMEDADES[i].DESCRIP + '"}]';
            var array = JSON.parse(json);
            var fuente = '<tr id="' + $conteocoddiag + '">' +
                "<td>" + array[0].COD + '</td>' +
                '<td> ' + array[0].DESCRIP + '</td>' +
                '</tr>';
            $('#table_diagnosticos').find('#' + $conteocoddiag).replaceWith(fuente);
            $conteocoddiag++;
            if ($conteocoddiag == 5) {
                _tipodiagnostico();
                break;
            }
            _evaluartabla();
            break;
        }
        else if (cod.trim() == "") {
            var fuente = '<tr id="' + $conteocoddiag + '">' +
                "<td>" + + '</td>' +
                '<td> ' + + '</td>' +
                '</tr>';
            $('#table_diagnosticos').find('#' + $conteocoddiag).replaceWith(fuente);
            $conteocoddiag++;
            if ($conteocoddiag == 5) {
                _tipodiagnostico();
                break;
            }
            _evaluarcoddiaghc();
            break;
        }
        else if (($_ENFERMEDADES.length - 1 == i) && (cod != $_ENFERMEDADES[i].COD)) {
            CON851('01', '01', null, 'error', 'error');
            $("#cod_hc_02f").val("");
            _evaluarcoddiaghc();
            break;
        }
    }
}

function _tipodiagnostico(){
    var tiposdiag = '[{"COD": "1","DESCRIP": "IMPRESION DIAGNOSTICA"},{"COD": "2", "DESCRIP": "CONFIRMADO NUEVO"},{"COD": "3","DESCRIP": "CONFIRMADO REPETIDO"},{"COD": "9","DESCRIP": "NO APLICA"}]';
    var tipodiag = JSON.parse(tiposdiag);
    POPUP({
        array: tipodiag,
        titulo: 'TIPO DE DIAGNOSTICO'
    },
        _evaluartipodiag
    );
}
function _evaluartipodiag(data) {
    $CAUSAHC = data.id;
    switch (data.id) {
        case "1":
        case "2":
        case "3":
        case "9":
            ;
            break;
        default:
            _evaluarcausaexterna();
            break;
    }
}