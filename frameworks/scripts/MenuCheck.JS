var $_LOTE_MENUCHECK = [];
var SUCURSAL_0A = ''

_validarOpcion_0A = function () {
    var SUCU = $_USUA_GLOBAL[0]['MENU_SUC'] || '2';
    
    var nav = $('.navbar-collapse');

    if (nav.is(':visible')) {
        _toggleNav()
    }
    if (SUCU == '2') {
        // var tmp = buscar_opcion("0A");
        // mostrar_menu(tmp);
        // set_titulo("0A");

        var opcionesFijas = [
            { 'COD': 'R', 'DESCRIP': 'RECIBOS DE CAJA' },
            { 'COD': 'C', 'DESCRIP': 'COMPROBANTE DE EGRESO' },
            { 'COD': 'G', 'DESCRIP': 'NOTAS DE CONTABILIDAD' },
            { 'COD': 'Z', 'DESCRIP': 'NOTAS BANCARIAS' },
            { 'COD': 'F', 'DESCRIP': 'FACTURAS VENTA' },
            { 'COD': 'B', 'DESCRIP': 'DEVOLUCION VENTA' }
        ]

        POPUP({
            array: opcionesFijas,
            titulo: 'Menu de sucursales',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: _toggleNav
        }, function (data) {
            console.debug(data);
            setTimeout(function () {
                _CON855A(data.COD, '2')
            }, 300)
        })

    } else if (SUCU == '1') {
        obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, (data) => {
            var prefijosFiltrados = []
            var prefijosLlegada = data.PREFIJOS[0].TABLA
            prefijosLlegada.pop()

            for (var i in prefijosLlegada) {
                var nro = prefijosLlegada[i].NRO.slice(-2)
                if (nro < '09' || nro == '09') {
                    prefijosFiltrados.push({
                        "COD": nro.slice(-1), "PREFIJO": prefijosLlegada[i].DESC_PREF
                    })
                }
            }

            POPUP({
                array: prefijosFiltrados,
                titulo: 'Menu por prefijos',
                indices: [
                    { id: 'COD', label: 'PREFIJO' }
                ],
                callback_f: _toggleNav
            }, function (data) {
                console.debug(data);
                setTimeout(function () {
                    _CON855A(data.COD, '1')
                }, 300)
            })
        })
        // _consultaSql({
        //     sql: 'SELECT * FROM sc_archpref',
        //     db: $CONTROL,
        //     callback: function (error, results, fields) {
        //         if (error) throw error;
        //         else {
        //             _toggleNav();
        //             POPUP({
        //                 array: results,
        //                 titulo: 'Menu por prefijos',
        //                 indices: [
        //                     // { id: 'id', label: 'descripcion' }
        //                     { label: 'descripcion' }
        //                 ],
        //                 callback_f: _toggleNav
        //             }, function (data) {
        //                 setTimeout(function () {
        //                     _CON855A(data.id, '1')
        //                 }, 300)
        //             })
        //         }
        //     }
        // })
    } else if (SUCU == '3') {
        _consultaSql({
            sql: 'SELECT * FROM sc_sucur',
            db: 'datos_pros',
            callback: function (error, results, fields) {
                if (error) throw error;
                else {

                    results.forEach(el => {
                        let sucu = el.cod_sucur;
                        if (sucu == '01') el.cod_sucur = '1'
                        else if (sucu == '02') el.cod_sucur = '2'
                        else if (sucu == '03') el.cod_sucur = '3'
                        else if (sucu == '04') el.cod_sucur = '4'
                        else if (sucu == '05') el.cod_sucur = '5'
                        else if (sucu == '06') el.cod_sucur = '6'
                        else if (sucu == '07') el.cod_sucur = '7'
                        else if (sucu == '08') el.cod_sucur = '8'
                        else if (sucu == '09') el.cod_sucur = '9'
                    })

                    _toggleNav();
                    POPUP({
                        array: results,
                        titulo: 'Menu por sucursales',
                        indices: [
                            { id: 'cod_sucur', label: 'descrip_sucur' }
                        ],
                        callback_f: _toggleNav
                    }, function (data) {
                        if (data.cod_sucur == '1') {
                            var tmp = buscar_opcion("0A");
                            mostrar_menu(tmp);
                            set_titulo("0A");
                        } else {
                            var tmp = buscar_opcion("0B");
                            mostrar_menu(tmp);
                            set_titulo("0B");
                        }
                        _toggleNav();
                    })
                }
            }
        })
    } else {
        CON851('', 'No tiene sucursales', null, 'error', 'Error');
    }
}

_CON855A = function (filtro, acceso) {
    obtenerDatosCompletos({ nombreFd: 'LOTES' }, (data) => {
        console.debug(data);
        var lotesFiltrados = []
        var lotesLlegada = data.LOTES
        lotesLlegada.pop()

        for (var i in lotesLlegada) {
            var lote = lotesLlegada[i].LOTE
            var nombreLote = lotesLlegada[i].NOMBRE.substring(0, 6)
            var y

            if (y > 19) {
                break;
            }

            if (nombreLote != 'COMPRA' && (lote != "6C" || lote != "60" || lote != "6A")) {
                if (lote[0] == "0" || lote[0] == "1" || lote[0] == "I" || lote[0] == "E" || lote[0] == "C") {

                } else {
                    switch (acceso) {
                        case '1':
                            if (lote[0] == filtro) {
                                y = parseInt(y + 1)
                                lotesFiltrados.push({ "LOTE": lote, "NOMBRE": lotesLlegada[i].NOMBRE })
                            }
                            break;
                        case '2':
                            if (lote[1] == filtro) {
                                y = parseInt(y + 1)
                                lotesFiltrados.push({ "LOTE": lote, "NOMBRE": nombreLote })
                            }
                            break;
                    }
                }
            }
        }
        console.log(lotesFiltrados)
        POPUP({
            array: lotesFiltrados,
            titulo: 'Lotes por documento',
            indices: [
                { id: 'LOTE', label: 'NOMBRE' }
            ],
            callback_f: () => setTimeout(_validarOpcion_0A, 300)
        }, function (data) {
            SUCURSAL_0A = data.LOTE

            if (SUCURSAL_0A[1] == 'B') {
                _toggleNav()
                var nuevaLista = buscar_opcion('0941B');
                mostrar_menu(nuevaLista);
                set_titulo('0941B');
            } else {
                console.log('entra')
                setTimeout(ventanaSucursales_CON855A, 300)
            }
        })
    })
}

function ventanaSucursales_CON855A() {
    // var nuevaLista = buscar_opcion('0A1');
    // mostrar_menu(nuevaLista);
    // set_titulo('0A1');
    // $_LOTE_MENUCHECK = { lote1: lote1, lote2: lote2 };

    var opcionesFijas = [
        { 'COD': '1', 'DESCRIP': 'ELABORAR COMPROBANTE' },
        { 'COD': '2', 'DESCRIP': 'REIMPRIMIR COMPROBANTE' },
        { 'COD': '3', 'DESCRIP': 'ANULAR COMPROBANTE' },
        { 'COD': '4', 'DESCRIP': 'CORRECCION DE COMPROBANTES' }
    ]

    var nombre
    switch (SUCURSAL_0A[1]) {
        case 'R': nombre = "RECIBOS DE CAJA"
            break;
        case 'C': nombre = "COMPROBANTE DE EGRESO"
            break;
        case 'G': nombre = "NOTAS DE CONTABILIDAD"
            break;
        case 'Z': nombre = "NOTAS BANCARIAS"
            break;
        case 'F': nombre = "FACTURAS VENTA"
            break;
        case 'B': nombre = "DEVOLUCION VENTA"
            break;
    }

    var nombreSuc = SUCURSAL_0A + ' ' + nombre

    POPUP({
        array: opcionesFijas,
        titulo: nombreSuc,
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: () => setTimeout(_validarOpcion_0A, 300)
    }, function (data) {
        console.debug(data);
        _toggleNav()
        switch (data.COD) {
            case '1':
                if (SUCURSAL_0A.trim().substring(1,2) == 'R') {
                    if (SUCURSAL_0A.trim().substring(0,1) == '4' || SUCURSAL_0A.trim().substring(0,1) == '6' ) {
                        _validarVentanaMain({
                            "Id": "",
                            "Descripcion": `RECIBOS ${SUCURSAL_0A.trim()}`,
                            "Tipo": "HTML",
                            "Href": "../../SALUD/paginas/FAC135C.html"
                        })
                    } else {
                        _validarVentanaMain({
                            "Id": "",
                            "Descripcion": `RECIBOS ${SUCURSAL_0A.trim()}`,
                            "Tipo": "HTML",
                            "Href": "../../SALUD/paginas/FAC135.html"
                        })
                    }
                }
                break;
            case '2':
                if (SUCURSAL_0A.trim().substring(1,2) == 'R') {
                    _validarVentanaMain({
                        "Id": "",
                        "Descripcion": "RECIBOS 4R",
                        "Tipo": "HTML",
                        "Href": "../../CONTAB/paginas/FAC157.html"
                    })
                }
                break;
            case '3':
                break;
            case '4':
                break;
        }
    })

}