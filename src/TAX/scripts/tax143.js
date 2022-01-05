(() => {
    loader('show')
    _inputControl('reset');
    _inputControl('disabled');

    _consultarConsecutivo_143();
})();

function _consultarConsecutivo_143() {
    postData({
        datosh: datosEnvio() + "01I" + "|"
    }, get_url("APP/TAX/TAX132-1.DLL"))
        .then(data => {
            loader('hide');
            var consecutivo = data.split('|')[1] || "1"
            document.getElementById('consecutivo_143').value = (parseInt(consecutivo) - 1)
            _validarConsecutivo_143();
        })
        .catch(error => {
            // jAlert({ titulo: 'Error', mensaje: "Error de consecutivo: " + error }, _toggleNav);
            loader('hide');
            _toggleNav();
        });
}

function _validarConsecutivo_143() {
    validarInputs({
        form: '#faseConsecutivo_143',
        orden: '1'
    },
    ()=>{
        setTimeout(_toggleNav, 250);
    },
    () => {
        var consecutivo = document.getElementById("consecutivo_143").value;
        var datosh = datosEnvio() + consecutivo + "|" 
        loader('show')
        postData({ datosh }, get_url("APP/TAX/TAX143.DLL"))
          .then(_llenar_formulario_143)
          .catch((err) => {
              console.log(err);
              loader('hide')
              _validarConsecutivo_143();
          });
        })
}

function _llenar_formulario_143(data) {
    loader('hide')
    $("#tablaLibros tbody").html('');
    var formulario = data.Libros[1].DATOS[0]
    document.getElementById("añoComp_143").value = formulario["FECHA-COMP"].substring(0, 4)
    document.getElementById("mesComp_143").value = formulario["FECHA-COMP"].substring(4, 6)
    document.getElementById("diaComp_143").value = formulario["FECHA-COMP"].substring(6, 8)
    document.getElementById("agencia_143").value = formulario.AGENCIA
    document.getElementById("descripAgenc_143").value = formulario.DESCRIP
    document.getElementById("añoPlanilla_143").value = formulario["FECHA-PLACA"].substring(0, 4)
    document.getElementById("mesPlanilla_143").value = formulario["FECHA-PLACA"].substring(4, 6)
    document.getElementById("diaPlanilla_143").value = formulario["FECHA-PLACA"].substring(6, 8)

    var parent = document
        .getElementById("tablaLibros")
        .getElementsByTagName("tbody")[0];

    var tabla = data.Libros[0].TABLA
    tabla.pop()

    tabla.forEach(item => {
        var actual_row = parent.rows.length;
        var row = parent.insertRow(actual_row);
        row
            .insertCell(0)
            .appendChild(document.createTextNode(item.LIBRO));
        row
            .insertCell(1)
            .appendChild(document.createTextNode(item.PLACA));
        row
            .insertCell(2)
            .appendChild(document.createTextNode(item["VR-BRUTO"]));
        row
            .insertCell(3)
            .appendChild(document.createTextNode(item["VR-SEGURO"]));
        row
            .insertCell(4)
            .appendChild(document.createTextNode(item["VR-REMESAS"]));
        row
            .insertCell(5)
            .appendChild(document.createTextNode(item["VR-AVANCE"]));
        row
            .insertCell(6)
            .appendChild(document.createTextNode(item["VR-ABONOS"]));
        row
            .insertCell(7)
            .appendChild(document.createTextNode(item["VR-DESCUADRE"]));
    })

    setTimeout(() => {
      _validar_impresion_143(data);
    }, 300);
}

function _validar_impresion_143(data) {
    CON850_P(function (e) {
        if (e.id == 'S') {
            var consecutivo = document.getElementById('consecutivo_143').value
            postData({
                datosh: datosEnvio() + consecutivo + "|"
            }, get_url("APP/TAX/TAX142.DLL"))
                .then(_imprimir_143)
                .catch(err => {
                    _validarConsecutivo_143();
                })
        } else {
            setTimeout(() => {
                _validarConsecutivo_143()
            }, 500);
        }
    }, { msj: "00" })
}

function _imprimir_143(data) {
    var consecutivo = document.getElementById('consecutivo_143').value
    var empresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    var nit = $_USUA_GLOBAL[0].NIT.toString();
    var opcionesImpresiones = {
        datos: data,
        extra: { empresa, nit, consecutivo },
        tipo: 'pdf',
        formato: 'tax/tax143.formato.html',
        nombre: 'PLANILLA INTERMUNICIPAL' + localStorage.Sesion
    };

    imprimir(opcionesImpresiones, () => {
        _validarConsecutivo_143();
    })
}