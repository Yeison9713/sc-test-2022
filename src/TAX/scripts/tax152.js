(() => {
    _inputControl('reset');
    _inputControl('disabled');

    jAlert({ titulo: 'Advertencia', mensaje: "Ésta opción elimina comprobantes!" }, () => {
        CON850_P(function (e) {
            if (e.id == "S") {
                _validarConsecutivo_152();
            } else {
                _toggleNav();
            }
        }, {
            msj: '04'
        });
    });
})();

function _validarConsecutivo_152() {
    limpiar_form_152()
    validarInputs({
        form: '#faseConsecutivo_152',
        orden: '1'
    },
        _toggleNav,
        () => {
            var consecutivo = document.getElementById('consecutivo_152').value
            postData({
                datosh: datosEnvio() + consecutivo + "|"
            }, get_url("APP/TAX/TAX143.DLL"))
                .then(_llenar_formulario_152)
                .catch(err => {
                    _validarConsecutivo_152();
                })
        })
}

function limpiar_form_152() {
    document.getElementById("añoComp_152").value = ""
    document.getElementById("mesComp_152").value = ""
    document.getElementById("diaComp_152").value = ""
    document.getElementById("agencia_152").value = ""
    document.getElementById("descripAgenc_152").value = ""
    document.getElementById("añoPlanilla_152").value = ""
    document.getElementById("mesPlanilla_152").value = ""
    document.getElementById("diaPlanilla_152").value = ""
    document
        .getElementById("tablaLibros")
        .getElementsByTagName("tbody")[0].innerHTML = ""
}

function _llenar_formulario_152(data) {
    var formulario = data.Libros[1].DATOS[0]
    let mes_factura = formulario["FECHA-COMP"].substring(4, 6)

    document.getElementById("añoComp_152").value = formulario["FECHA-COMP"].substring(0, 4)
    document.getElementById("mesComp_152").value = mes_factura
    document.getElementById("diaComp_152").value = formulario["FECHA-COMP"].substring(6, 8)
    document.getElementById("agencia_152").value = formulario.AGENCIA
    document.getElementById("descripAgenc_152").value = formulario.DESCRIP
    document.getElementById("añoPlanilla_152").value = formulario["FECHA-PLACA"].substring(0, 4)
    document.getElementById("mesPlanilla_152").value = formulario["FECHA-PLACA"].substring(4, 6)
    document.getElementById("diaPlanilla_152").value = formulario["FECHA-PLACA"].substring(6, 8)

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

    let mes_actual = new Date().getMonth() + 1
    let dia_actual = new Date().getDate()

    if (mes_actual != parseInt(mes_factura) && dia_actual > 12){
        plantillaToast('37', '37', null, 'warning');
        _validarConsecutivo_152()
    } else _validar_eliminar_152();
}

function _validar_eliminar_152() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            console.log('Eliminar')
            var consecutivo = document.getElementById('consecutivo_152').value
            postData({
                datosh: datosEnvio() + consecutivo + "|"
            }, get_url("APP/TAX/TAX152.DLL"))
                .then(_fin_eliminar_152)
                .catch(err => {
                    _validarConsecutivo_152();
                })
        } else {
            _validarConsecutivo_152()
        }
    }, { msj: "02" })
}

function _fin_eliminar_152(data) {
    jAlert({ titulo: 'Correcto', mensaje: "Comprobante eliminado correctamente" }, () => {
        document.getElementById('consecutivo_152').value = ""
        _validarConsecutivo_152()
    });
}