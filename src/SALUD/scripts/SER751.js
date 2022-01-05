// LISTADO MORBILIDAD POR CONSULTA
// DAVID.M - CREACION - 16/06/2020 - OPCION 9-7-7-5-1-1 SALUD
var $_SER751 = [],
    $_FORMATO_751 = [];

$(document).ready(() => {
    loader('show')
    _inputControl("reset");
    _inputControl("disabled");
    _cargarUnidServicios();
    nombreOpcion('9-7-7-5-1-1 - Morbilidad por consulta');

    _toggleF8([
        { input: 'unidServ', app: 'SER751', funct: _ventanaUnidServiciosSER751 },
        { input: 'espec', app: 'SER751', funct: _ventanaEspecialidadesSER751 },
        { input: 'costo', app: 'SER751', funct: _ventanaCostosSER751 },
        { input: 'tipoUsua', app: 'SER751', funct: _ventanaTipoUsuarioSER751 },
        { input: 'entidad', app: 'SER751', funct: _ventanaEntidadesSER751 },
        { input: 'sucursal', app: 'SER751', funct: _ventanaSucursalesSER751 },
        { input: 'numero', app: 'SER751', funct: _ventanaFacturacionSER751 },
        { input: 'atiende', app: 'SER751', funct: _ventanaAtiendeSER751 }
    ]);
    $('#formatoimpresion_751').select2().on('select2:select', validarFormato_751);
})

function habilitarFORMATO_751() {
    _inputControl('reset');
    $('#formatoimpresion_751').val(null).removeAttr('disabled').trigger('change');
    $('#formatoimpresion_751').select2('open')
}

function validarFormato_751() {
    var seleccionado = $(this).val();
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_751 = 'PDF';
        else if (seleccionado == "2") $_FORMATO_751 = 'EXCEL';

        $(this).attr('disabled', 'true');
        validarUnidServSER751();
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function validarUnidServSER751() {
    document.querySelector('#unidServ_SER751').value == "" ? document.querySelector('#unidServ_SER751').value = '**' : false;
    validarInputs({
            form: '#validarUnidServ_751',
            orden: '1'
        },
        () => {
            $('#formatoimpresion_751').val(null).removeAttr('disabled').trigger('change');
            $('#formatoimpresion_751').select2('open')
        },
        () => {
            $_SER751['unidServ'] = document.getElementById("unidServ_SER751").value.toUpperCase().trim();
            if ($_SER751.unidServ == "**") {
                document.querySelector('#descripUnidServ_SER751').value = "TODAS LAS UNIDADES DE SERV.";
                validarPrefijoSER751();
            } else {
                const res = $_SER751.UNSERV.find(e => e.COD.trim() == $_SER751.unidServ);
                if (res == undefined) {
                    CON851('01', '01', null, 'error', 'error');
                    validarUnidServSER751();
                } else {
                    document.querySelector('#descripUnidServ_SER751').value = res.DESCRIP;
                    validarPrefijoSER751();
                }
            }
        }
    );
}

function validarPrefijoSER751() {
    document.querySelector('#prefijo_SER751').value == "" ? document.querySelector('#prefijo_SER751').value = '*' : false;
    validarInputs({
            form: '#validarPrefijo_751',
            orden: '1'
        },
        () => {
            validarUnidServSER751();
        },
        () => {
            $_SER751['prefijo'] = document.getElementById("prefijo_SER751").value.toUpperCase().trim();
            if ($_SER751.prefijo == "*") {
                $_SER751.numero = "000000";
                document.querySelector('#numero_SER751').value = $_SER751.numero;
                document.querySelector('#descripNumero_SER751').value = "TODAS LAS FACTURAS";
                datoInicialSER751();
            } else {
                var arrayPrefijos = ["A", "P", "T", "B", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "Q",
                    "R", "S", "V", "W", "X", "Y", "Z"
                ];
                const res = arrayPrefijos.find(e => e == $_SER751.prefijo);
                res == undefined ? validarPrefijoSER751() : validarNumeroSER751();
            }
        }
    );
}

function validarNumeroSER751() {
    validarInputs({
            form: '#validarNumero_751',
            orden: '1'
        },
        () => {
            validarPrefijoSER751();
        },
        () => {
            $_SER751['numero'] = document.getElementById("numero_SER751").value.toUpperCase().trim();
            const res = $_SER751.FACTURAS.find(e => e.COD.substring(1, 7).trim() == $_SER751.numero);
            if (res == undefined) {
                CON851('01', '01', null, 'error', 'error');
                validarNumeroSER751();
            } else {
                document.querySelector('#descripNumero_SER751').value = res.DESCRIP;
                console.log(res.FECHA_ING, "fecha");
                datoInicialSER751(res);
                // validarFechaInicialSER751('1');
            }
        }
    );
}

function datoInicialSER751(res) {
    if ($_SER751.prefijo != "*") {
        document.querySelector('#diaInicial_751').value = res.FECHA_ING.substring(6, 8);
        document.querySelector('#mesInicial_751').value = res.FECHA_ING.substring(4, 6);
        document.querySelector('#añoInicial_751').value = res.FECHA_ING.substring(0, 4);

        if (res.FECHARET != "00000000" && res.FECHARET.trim() != "") {
            document.querySelector('#diaFinal_751').value = res.FECHARET.substring(6, 8);
            document.querySelector('#mesFinal_751').value = res.FECHARET.substring(4, 6);
            document.querySelector('#añoFinal_751').value = res.FECHARET.substring(0, 4);
        } else {
            document.querySelector('#diaFinal_751').value = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
            document.querySelector('#mesFinal_751').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
            document.querySelector('#añoFinal_751').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
        }
    } else {
        console.log("*")
        document.querySelector('#diaInicial_751').value = "01"
        document.querySelector('#mesInicial_751').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
        document.querySelector('#añoInicial_751').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

        document.querySelector('#diaFinal_751').value = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
        document.querySelector('#mesFinal_751').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
        document.querySelector('#añoFinal_751').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
    }

    validarFechaInicialSER751('2');
}

function validarFechaInicialSER751(orden) {
    setTimeout(function() {
        validarInputs({
                form: '#fechaInicial_751',
                orden: orden
            },
            () => {
                $_SER751.prefijo == "*" ? validarPrefijoSER751() : validarNumeroSER751();
            },
            () => {
                document.querySelector('#diaInicial_751').value = cerosIzq(document.querySelector('#diaInicial_751').value, 2);
                document.querySelector('#mesInicial_751').value = cerosIzq(document.querySelector('#mesInicial_751').value, 2);
                $_SER751.fechaInicial = parseInt(document.querySelector('#añoInicial_751').value + document.querySelector('#mesInicial_751').value + document.querySelector('#diaInicial_751').value);
                $_SER751.diaInicial = parseInt(document.querySelector('#diaInicial_751').value);
                $_SER751.mesInicial = parseInt(document.querySelector('#mesInicial_751').value);
                $_SER751.añoInicial = parseInt(document.querySelector('#añoInicial_751').value);
                if ($_SER751.diaInicial < 1 || $_SER751.diaInicial > 31) {
                    validarFechaInicialSER751('3');
                } else if ($_SER751.mesInicial < 1 || $_SER751.mesInicial > 12) {
                    validarFechaInicialSER751('2');
                } else {
                    validarFechaFinalSER751('2');
                }
            }
        );
    }, 100);
}

function validarFechaFinalSER751(orden) {
    setTimeout(function() {
        validarInputs({
                form: '#fechaFinal_751',
                orden: orden
            },
            () => {
                validarFechaInicialSER751('2')
            },
            () => {
                document.querySelector('#diaFinal_751').value = cerosIzq(document.querySelector('#diaFinal_751').value, 2);
                document.querySelector('#mesFinal_751').value = cerosIzq(document.querySelector('#mesFinal_751').value, 2);
                $_SER751.fechaFinal = parseInt(document.querySelector('#añoFinal_751').value + document.querySelector('#mesFinal_751').value + document.querySelector('#diaFinal_751').value);
                $_SER751.diaFinal = parseInt(document.querySelector('#diaFinal_751').value);
                $_SER751.mesFinal = parseInt(document.querySelector('#mesFinal_751').value);
                $_SER751.añoFinal = parseInt(document.querySelector('#añoFinal_751').value);
                if ($_SER751.diaFinal < 1 || $_SER751.diaFinal > 31) {
                    validarFechaFinalSER751('3');
                } else if ($_SER751.mesFinal < 1 || $_SER751.mesFinal > 12) {
                    validarFechaFinalSER751('2');
                } else if ($_SER751.fechaFinal < $_SER751.fechaInicial) {
                    CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
                    validarFechaFinalSER751('2');
                } else {
                    validarTipoServicioSER751();
                }
            }
        );
    }, 100);
}

function validarTipoServicioSER751() {
    document.querySelector('#tipoServ_SER751').value == "" ? document.querySelector('#tipoServ_SER751').value = '1' : false;
    document.querySelector('#descripTipoServ_SER751').value = "1. CIRUGIAS   5. CONSULTAS"
    validarInputs({
            form: '#validarTipoServ_751',
            orden: '1'
        },
        () => {
            validarFechaFinalSER751('2');
        },
        () => {
            $_SER751['tipoServ'] = document.getElementById("tipoServ_SER751").value.trim();
            if ($_SER751.tipoServ == "1" || $_SER751.tipoServ == "5") {
                $_SER751.tipoServ == "1" ? document.querySelector('#descripTipoServ_SER751').value = "CIRUGIAS" : document.querySelector('#descripTipoServ_SER751').value = "CONSULTAS";
                validarEspecialidadSER751();
            } else {
                validarTipoServicioSER751();
            }
        }
    );
}

function validarEspecialidadSER751() {
    document.querySelector('#espec_SER751').value == "" ? document.querySelector('#espec_SER751').value = '***' : false;
    validarInputs({
            form: '#validarEspec_751',
            orden: '1'
        },
        () => {
            validarTipoServicioSER751();
        },
        () => {
            $_SER751['espec'] = document.getElementById("espec_SER751").value.trim();
            if ($_SER751.espec == "***") {
                document.querySelector('#descripEspec_SER751').value = "TODAS LAS ESPECIALIDADES";
                validarCentroCostosSER751();
            } else {
                const res = $_SER751.ESPEC.find(e => e.CODIGO.trim() == $_SER751.espec);
                if (res == undefined) {
                    CON851('01', '01', null, 'error', 'error');
                    validarEspecialidadSER751();
                } else {
                    document.querySelector('#descripEspec_SER751').value = res.NOMBRE;
                    validarCentroCostosSER751();
                }
            }
        }
    );
}

function validarCentroCostosSER751() {
    document.querySelector('#costo_SER751').value == "" ? document.querySelector('#costo_SER751').value = '****' : false;
    validarInputs({
            form: '#validarCosto_751',
            orden: '1'
        },
        () => {
            validarEspecialidadSER751();
        },
        () => {
            $_SER751['costo'] = document.getElementById("costo_SER751").value.trim();
            if ($_SER751.costo == "****") {
                document.querySelector('#descripCosto_SER751').value = "TODOS LOS C. COSTOS";
                validarTipoUsuariosSER751();
            } else {
                const res = $_SER751.COSTOS.find(e => e.COD.trim() == $_SER751.costo);
                if (res == undefined) {
                    CON851('01', '01', null, 'error', 'error');
                    validarCentroCostosSER751();
                } else {
                    document.querySelector('#descripCosto_SER751').value = res.NOMBRE;
                    validarTipoUsuariosSER751();
                }
            }
        }
    );
}

function validarTipoUsuariosSER751() {
    document.querySelector('#tipoUsua_SER751').value == "" ? document.querySelector('#tipoUsua_SER751').value = '*' : false;
    validarInputs({
            form: '#validarTipoUsua_751',
            orden: '1'
        },
        () => {
            validarCentroCostosSER751();
        },
        () => {
            $_SER751['tipoUsuario'] = document.getElementById("tipoUsua_SER751").value.toUpperCase().trim();
            if ($_SER751.tipoUsuario == "*") {
                document.querySelector('#descripTipoUsua_SER751').value = "TODOS LOS TIPOS";
                validarEntidadSER751();
            } else {
                const res = $_SER751.TIPOUSUA.find(e => e.COD.trim() == $_SER751.tipoUsuario);
                if (res == undefined) {
                    CON851('01', '01', null, 'error', 'error');
                    validarTipoUsuariosSER751();
                } else {
                    if (res.COD == "E" || res.COD == "F") {
                        validarTipoUsuariosSER751();
                    } else {
                        document.querySelector('#descripTipoUsua_SER751').value = res.DESCRIP;
                        validarEntidadSER751();
                    }
                }
            }
        }
    );
}

function validarEntidadSER751() {
    document.querySelector('#entidad_SER751').value == "" ? document.querySelector('#entidad_SER751').value = '******' : false;
    validarInputs({
            form: '#validarEntidad_751',
            orden: '1'
        },
        () => {
            validarTipoUsuariosSER751();
        },
        () => {
            $_SER751['entidad'] = document.getElementById("entidad_SER751").value.trim();
            if ($_SER751.entidad == "******") {
                document.querySelector('#descripEntidad_SER751').value = "TODOS LOS CODIGOS";
                validarAtiendeSER751();
            } else {
                const res = $_SER751.ENTIDADES.find(e => e['COD-ENT'].trim() == $_SER751.entidad);
                if (res == undefined) {
                    CON851('01', '01', null, 'error', 'error');
                    validarEntidadSER751();
                } else {
                    document.querySelector('#descripEntidad_SER751').value = res['NOMBRE-ENT'];
                    validarAtiendeSER751();
                }
            }
        }
    );
}

function validarAtiendeSER751() {
    document.querySelector('#atiende_SER751').value == "" ? document.querySelector('#atiende_SER751').value = '*' : false;
    validarInputs({
            form: '#validarAtiende_751',
            orden: '1'
        },
        () => {
            validarEntidadSER751();
        },
        () => {
            $_SER751['atiende'] = document.getElementById("atiende_SER751").value.trim();
            if ($_SER751.atiende == "*") {
                document.querySelector('#descripAtiende_SER751').value = "TODO TIPO PERSONAL";
                validarOdontogiSER751();
            } else {
                const res = $_SER751.SER830.find(e => e.COD.trim() == $_SER751.atiende);
                if (res == undefined) {
                    CON851('01', '01', null, 'error', 'error');
                    validarAtiendeSER751();
                } else {
                    document.querySelector('#descripAtiende_SER751').value = res.DESCRIP;
                    validarOdontogiSER751();
                }
            }
        }
    );
}

function validarOdontogiSER751() {
    document.querySelector('#odontogi_SER751').value == "" ? document.querySelector('#odontogi_SER751').value = 'N' : false;
    document.getElementById("odontogi_SER751").setAttribute("placeholder", "N");
    validarInputs({
            form: '#validarOdontogi_751',
            orden: '1'
        },
        () => {
            validarAtiendeSER751();
        },
        () => {
            $_SER751['odontogi'] = document.getElementById("odontogi_SER751").value.toUpperCase().trim();
            ($_SER751.odontogi == "S" || $_SER751.odontogi == "N") ? validarSucursalSER751(): validarOdontogiSER751();
        }
    );
}

function validarSucursalSER751() {
    document.querySelector('#sucursal_SER751').value == "" ? document.querySelector('#sucursal_SER751').value = '**' : false;
    validarInputs({
            form: '#validarSucursal_751',
            orden: '1'
        },
        () => {
            validarOdontogiSER751();
        },
        () => {
            $_SER751['sucursal'] = document.getElementById("sucursal_SER751").value.trim();
            if ($_SER751.sucursal == "**") {
                validarPorCiudadSER751();
            } else {
                const res = $_SER751.SUCURSALES.find(e => e.CODIGO.trim() == $_SER751.sucursal);
                if (res == undefined) {
                    CON851('01', '01', null, 'error', 'error');
                    validarSucursalSER751();
                } else {
                    validarPorCiudadSER751();
                }
            }
        }
    );
}

function validarPorCiudadSER751() {
    document.querySelector('#porCiudad_SER751').value == "" ? document.querySelector('#porCiudad_SER751').value = 'N' : false;
    document.getElementById("porCiudad_SER751").setAttribute("placeholder", "N");
    validarInputs({
            form: '#validarPorCiudad_751',
            orden: '1'
        },
        () => {
            validarSucursalSER751();
        },
        () => {
            $_SER751['porCiudad'] = document.getElementById("porCiudad_SER751").value.toUpperCase().trim();
            ($_SER751.porCiudad == "S" || $_SER751.porCiudad == "N") ? validarSoloDiagSER751(): validarPorCiudadSER751();
        }
    );
}

function validarSoloDiagSER751() {
    document.querySelector('#soloDiag_SER751').value == "" ? document.querySelector('#soloDiag_SER751').value = 'S' : false;
    document.getElementById("soloDiag_SER751").setAttribute("placeholder", "N");
    validarInputs({
            form: '#validarSoloDiag_751',
            orden: '1'
        },
        () => {
            validarPorCiudadSER751();
        },
        () => {
            $_SER751['soloDiag'] = document.getElementById("soloDiag_SER751").value.toUpperCase().trim();
            ($_SER751.soloDiag == "S" || $_SER751.soloDiag == "N") ? validarListarPrimSER751(): validarSoloDiagSER751();
        }
    );
}

function validarListarPrimSER751() {
    document.querySelector('#listarPrim_SER751').value == "" ? document.querySelector('#listarPrim_SER751').value = '500' : false;
    validarInputs({
            form: '#validarListarPrim_751',
            orden: '1'
        },
        () => {
            validarSoloDiagSER751();
        },
        () => {
            $_SER751['listarPrim'] = document.getElementById("listarPrim_SER751").value.toUpperCase().trim();
            if (parseInt($_SER751.listarPrim) < 5) {
                validarListarPrimSER751();
            } else {
                validarIncluirContrSER751();
            }
        }
    );
}

function validarIncluirContrSER751() {
    document.querySelector('#incluirContr_SER751').value == "" ? document.querySelector('#incluirContr_SER751').value = 'N' : false;
    document.getElementById("incluirContr_SER751").setAttribute("placeholder", "N");
    validarInputs({
            form: '#validarIncluirContr_751',
            orden: '1'
        },
        () => {
            validarListarPrimSER751();
        },
        () => {
            $_SER751['incluirContr'] = document.getElementById("incluirContr_SER751").value.toUpperCase().trim();
            ($_SER751.incluirContr == "S" || $_SER751.incluirContr == "N") ? validarOrdenarEvenSER751(): validarIncluirContrSER751();
        }
    );
}

function validarOrdenarEvenSER751() {
    document.querySelector('#ordenarEven_SER751').value == "" ? document.querySelector('#ordenarEven_SER751').value = 'S' : false;
    document.getElementById("ordenarEven_SER751").setAttribute("placeholder", "N");
    validarInputs({
            form: '#validarOrdenarEven_751',
            orden: '1'
        },
        () => {
            validarIncluirContrSER751();
        },
        () => {
            $_SER751['ordenarEven'] = document.getElementById("ordenarEven_SER751").value.toUpperCase().trim();
            ($_SER751.ordenarEven == "S" || $_SER751.ordenarEven == "N") ? _envioImpresion(): validarOrdenarEvenSER751();
        }
    );
}

function _envioImpresion() {
    CON850_P(function(e) {
        if (e.id == 'S') {

            loader('show')
            var datos_envio = datosEnvio() +
                localStorage.Usuario +
                '|' + $_SER751.unidServ +
                '|' + $_SER751.prefijo +
                '|' + $_SER751.numero +
                '|' + $_SER751.fechaInicial.toString() +
                '|' + $_SER751.fechaFinal.toString() +
                '|' + $_SER751.tipoServ +
                '|' + $_SER751.espec +
                '|' + $_SER751.costo +
                '|' + $_SER751.tipoUsuario +
                '|' + $_SER751.entidad +
                '|' + $_SER751.atiende +
                '|' + $_SER751.odontogi +
                '|' + $_SER751.sucursal +
                '|' + $_SER751.porCiudad +
                '|' + $_SER751.soloDiag +
                '|' + $_SER751.listarPrim +
                '|' + $_SER751.incluirContr +
                '|' + $_SER751.ordenarEven;

            console.log(datos_envio, "datos_envio");

            postData({ datosh: datos_envio }, get_url('app/SALUD/SER751.DLL'))
                .then(_montarImpresion_SER751)
                .catch(err => {
                    loader("hide");
                    console.log(err)
                    CON851("", "Error generando listado", null, "error", "Error");
                    validarOrdenarEvenSER751();
                })
        } else {
            validarOrdenarEvenSER751();
        }
    }, {
        msj: '00',
        overlay_show: true
    })
}

async function _montarImpresion_SER751(data) {
    data.LISTADO.pop();
    data.ENCABEZADO = [];

    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    let nit = $_USUA_GLOBAL[0].NIT.toString();
    let fecha = moment().format('MMM DD/YY');

    for (var i in data.LISTADO) {
        data.LISTADO[i].ARRAY_TABLA_LN = (data.LISTADO[i].TABLA_LN.split(','))
    }

    array_unidades = []

    for (var i in data.UNSERV) {
        let busqueda = $_SER751.UNSERV.find(e => e.COD == data.UNSERV[i].LLAVE_UNSERV.substring(4, 6))
        if (busqueda) {
            let existeUnd = array_unidades.find(e => e.COD == busqueda.COD)
            if (!existeUnd) array_unidades.push({ COD: busqueda.COD, DESCRIP: busqueda.DESCRIP })
        }
    }

    array_unidades.sort((a, b) => {
        return a.COD - b.COD;
    });

    for (var i in data.LISTADO) {
        // edad 1
        data.LISTADO[i].TABLA_LN_0 = data.LISTADO[i].ARRAY_TABLA_LN[0]
        data.LISTADO[i].TABLA_LN_1 = data.LISTADO[i].ARRAY_TABLA_LN[1]
        data.LISTADO[i].SUB_TOT_1 = (parseInt(data.LISTADO[i].TABLA_LN_0) || 0) + (parseInt(data.LISTADO[i].TABLA_LN_1) || 0)
        // edad 2
        data.LISTADO[i].TABLA_LN_2 = data.LISTADO[i].ARRAY_TABLA_LN[2]
        data.LISTADO[i].TABLA_LN_3 = data.LISTADO[i].ARRAY_TABLA_LN[3]
        data.LISTADO[i].SUB_TOT_2 = (parseInt(data.LISTADO[i].TABLA_LN_2) || 0) + (parseInt(data.LISTADO[i].TABLA_LN_3) || 0)
        // edad 3
        data.LISTADO[i].TABLA_LN_4 = data.LISTADO[i].ARRAY_TABLA_LN[4]
        data.LISTADO[i].TABLA_LN_5 = data.LISTADO[i].ARRAY_TABLA_LN[5]
        data.LISTADO[i].SUB_TOT_3 = (parseInt(data.LISTADO[i].TABLA_LN_4) || 0) + (parseInt(data.LISTADO[i].TABLA_LN_5) || 0)
        // edad 4
        data.LISTADO[i].TABLA_LN_6 = data.LISTADO[i].ARRAY_TABLA_LN[6]
        data.LISTADO[i].TABLA_LN_7 = data.LISTADO[i].ARRAY_TABLA_LN[7]
        data.LISTADO[i].SUB_TOT_4 = (parseInt(data.LISTADO[i].TABLA_LN_6) || 0) + (parseInt(data.LISTADO[i].TABLA_LN_7) || 0)
        // edad 5
        data.LISTADO[i].TABLA_LN_8 = data.LISTADO[i].ARRAY_TABLA_LN[8]
        data.LISTADO[i].TABLA_LN_9 = data.LISTADO[i].ARRAY_TABLA_LN[9]
        data.LISTADO[i].SUB_TOT_5 = (parseInt(data.LISTADO[i].TABLA_LN_8) || 0) + (parseInt(data.LISTADO[i].TABLA_LN_9) || 0)
        // edad 6
        data.LISTADO[i].TABLA_LN_10 = data.LISTADO[i].ARRAY_TABLA_LN[10]
        data.LISTADO[i].TABLA_LN_11 = data.LISTADO[i].ARRAY_TABLA_LN[11]
        data.LISTADO[i].SUB_TOT_6 = (parseInt(data.LISTADO[i].TABLA_LN_10) || 0) + (parseInt(data.LISTADO[i].TABLA_LN_11) || 0)
        // edad 7
        data.LISTADO[i].TABLA_LN_12 = data.LISTADO[i].ARRAY_TABLA_LN[12]
        data.LISTADO[i].TABLA_LN_13 = data.LISTADO[i].ARRAY_TABLA_LN[13]
        data.LISTADO[i].SUB_TOT_7 = (parseInt(data.LISTADO[i].TABLA_LN_12) || 0) + (parseInt(data.LISTADO[i].TABLA_LN_13) || 0)


        for (var x in array_unidades) {
            data.LISTADO[i][`${array_unidades[x].DESCRIP}`] = ''
        }

        let busqueda = data.UNSERV.filter(e => e.LLAVE_UNSERV.substring(0, 4) == data.LISTADO[i].COD_LN)
        for (var x in busqueda) {
            let busqUnidades = array_unidades.find(e => e.COD == busqueda[x].LLAVE_UNSERV.substring(4, 6))
            if (busqUnidades) {
                data.LISTADO[i][`${busqUnidades.DESCRIP}`] = busqueda[x].CANT_UNSERV
            }
        }
    }

    console.log(data.LISTADO, 'filtro')

    var columnas = [{
            title: "Tipo",
            value: "ITEM_LN",
            filterButton: true
        },
        {
            title: "Cod",
            value: "COD_LN",
            filterButton: true
        },
        {
            title: "Enfermedad",
            value: "ENFER_LN",
            format: 'fecha',
            filterButton: true
        },
        {
            title: "Masculino 0",
            value: "TABLA_LN_0",
        },
        {
            title: "Femenino 0",
            value: "TABLA_LN_1"
        },
        {
            title: "Subtotal menor 1 año",
            value: "SUB_TOT_1"
        },
        {
            title: "Masculino 1",
            value: "TABLA_LN_2",
        },
        {
            title: "Femenino 1",
            value: "TABLA_LN_3"
        },
        {
            title: "Subtotal 1 a 5 años",
            value: "SUB_TOT_2"
        },
        {
            title: "Masculino 2",
            value: "TABLA_LN_4",
        },
        {
            title: "Femenino 2",
            value: "TABLA_LN_5"
        },
        {
            title: "Subtotal 6 a 11 años",
            value: "SUB_TOT_3"
        },
        {
            title: "Masculino 3",
            value: "TABLA_LN_6",
        },
        {
            title: "Femenino 3",
            value: "TABLA_LN_7"
        },
        {
            title: "Subtotal 12 a 17 años",
            value: "SUB_TOT_4"
        },
        {
            title: "Masculino 4",
            value: "TABLA_LN_8",
        },
        {
            title: "Femenino 4",
            value: "TABLA_LN_9"
        },
        {
            title: "Subtotal 18 a 29 años",
            value: "SUB_TOT_5"
        },
        {
            title: "Masculino 5",
            value: "TABLA_LN_10",
        },
        {
            title: "Femenino 5",
            value: "TABLA_LN_11"
        },
        {
            title: "Subtotal 30 a 59 años",
            value: "SUB_TOT_6"
        },
        {
            title: "Masculino 6",
            value: "TABLA_LN_12",
        },
        {
            title: "Femenino 6",
            value: "TABLA_LN_13"
        },
        {
            title: "Subtotal mayores 60 años",
            value: "SUB_TOT_7"
        },
        {
            title: "Total",
            value: "TOTAL_LN"
        }
    ]

    for (var i in array_unidades) {
        columnas.push({
            title: array_unidades[i].DESCRIP,
            value: array_unidades[i].DESCRIP
        })
    }

    var header_format = [
        { text: `${nombreEmpresa}`, bold: true, size: 16 },
        `LISTADO MORBILIDAD POR CONSULTA     NIT: ${nit}`,
        `Fecha de reporte: ${fecha}`,
        `Periodo desde: ${$_SER751.fechaInicial}  Hasta: ${$_SER751.fechaFinal}`,
    ]

    _impresion2({
            tipo: 'excel',
            header: header_format,
            logo: `${nit}.png`,
            tabla: {
                columnas,
                data: data.LISTADO
            },
            archivo: localStorage.Usuario + moment().format('-YYYY-MM-DD-HHmmss'),
            scale: '75',
            orientation: 'landscape',
            filas: {
                preTable: [
                    { merge: [4, 6], text: 'MENOR DE 1 AÑO' },
                    { merge: [7, 9], text: 'DE 1 A 5 AÑOS' },
                    { merge: [10, 12], text: 'DE 6 A 11 AÑOS' },
                    { merge: [13, 15], text: 'DE 12 A 17 AÑOS' },
                    { merge: [16, 18], text: 'DE 18 A 29 AÑOS' },
                    { merge: [19, 21], text: 'DE 30 A 59 AÑOS' },
                    { merge: [22, 24], text: 'DE 60 AÑOS Y MAYORES' }
                ]
            }
        })
        .then(() => {
            console.log('Proceso terminado')
            loader('hide')
            _toggleNav();
        })
        .catch((error) => {
            console.log('Proceso error', error)
        })
}

function _cargarUnidServicios() {
    postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER873.DLL"))
        .then(data => {
            $_SER751.UNSERV = data.UNSERV;
            $_SER751.UNSERV.pop();
            _cargarFacturas();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _cargarFacturas() {
    postData({ datosh: datosEnvio() + '1' + '|||' }, get_url("app/SALUD/SER808.DLL"))
        .then(data => {
            $_SER751.FACTURAS = data.NUMERACION;
            $_SER751.FACTURAS.pop();
            console.log($_SER751.FACTURAS, "FACTURAS")
            _cargarEspecialidades();
        }).catch(err => {
            loader('hide');
            console.log("error facturas")
            _toggleNav();
        })
}

function _cargarEspecialidades() {
    postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then(data => {
            $_SER751.ESPEC = data.ESPECIALIDADES;
            $_SER751.ESPEC.pop();
            console.log(data);
            _cargarCostos();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _cargarCostos() {
    postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON803.DLL"))
        .then(data => {
            $_SER751.COSTOS = data.COSTO;
            $_SER751.COSTOS.pop();
            console.log(data);
            _cargarTipoUsuarios();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _cargarTipoUsuarios() {
    $_SER751.TIPOUSUA = [
        { "COD": "*", "DESCRIP": "TODOS" },
        { "COD": "C", "DESCRIP": "CONTRIBUTIVO" },
        { "COD": "S", "DESCRIP": "SUBSIDIADO" },
        { "COD": "V", "DESCRIP": "VINCULADO" },
        { "COD": "P", "DESCRIP": "PARTICULAR" },
        { "COD": "O", "DESCRIP": "OTRO TIPO" },
        { "COD": "D", "DESCRIP": "DESP.CONT" },
        { "COD": "E", "DESCRIP": "DESP. SUBS" },
        { "COD": "F", "DESCRIP": "DESP. VINC" }
    ]
    _cargarEntidades();
}

function _cargarEntidades() {
    postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
        .then(data => {
            $_SER751.ENTIDADES = data.ENTIDADES;
            _cargarAtiende();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _cargarAtiende() {
    $_SER751['SER830'] = [
        { 'COD': '1', 'DESCRIP': consult_atiendProf('1') },
        { 'COD': '2', 'DESCRIP': consult_atiendProf('2') },
        { 'COD': '3', 'DESCRIP': consult_atiendProf('3') },
        { 'COD': '4', 'DESCRIP': consult_atiendProf('4') },
        { 'COD': '5', 'DESCRIP': consult_atiendProf('5') },
        { 'COD': '6', 'DESCRIP': consult_atiendProf('6') },
        { 'COD': '7', 'DESCRIP': consult_atiendProf('7') },
        { 'COD': '8', 'DESCRIP': consult_atiendProf('8') },
        { 'COD': '9', 'DESCRIP': consult_atiendProf('9') },
        { 'COD': 'A', 'DESCRIP': consult_atiendProf('A') },
        { 'COD': 'B', 'DESCRIP': consult_atiendProf('B') },
        { 'COD': 'H', 'DESCRIP': consult_atiendProf('H') },
        { 'COD': 'I,', 'DESCRIP': consult_atiendProf('I') },
        { 'COD': 'O', 'DESCRIP': consult_atiendProf('O') },
        { 'COD': 'T', 'DESCRIP': consult_atiendProf('T') }
    ]
    _cargarSucursales();
}

function _cargarSucursales() {
    postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON823.DLL"))
        .then(data => {
            $_SER751.SUCURSALES = data.SUCURSAL;
            // $_SER751.SUCURSALES.pop();
            _cargarGrpSer();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _cargarGrpSer() {
    postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER801.DLL"))
        .then(data => {
            loader('hide');
            $_SER751.GRPSER = data.CODIGOS;
            $_SER751.GRPSER.pop();
            setTimeout(function() { $('#formatoimpresion_751').select2('open') }, 500)
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _ventanaUnidServiciosSER751(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA UNIDADES DE SERVICIO",
            columnas: ["COD", "DESCRIP"],
            data: $_SER751.UNSERV,
            callback_esc: function() {
                $("#unidServ_SER751").focus();
            },
            callback: function(data) {
                document.getElementById('unidServ_SER751').value = data.COD;
                _enterInput('#unidServ_SER751');
            }
        });
    }
}

function _ventanaEspecialidadesSER751(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE ESPECIALIDADES",
            columnas: ["CODIGO", "NOMBRE"],
            data: $_SER751.ESPEC,
            callback_esc: function() {
                $("#espec_SER751").focus();
            },
            callback: function(data) {
                document.getElementById('espec_SER751').value = data.CODIGO;
                _enterInput('#espec_SER751');
            }
        });
    }
}

function _ventanaCostosSER751(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CENTROS DE COSTOS",
            columnas: ["COD", "NOMBRE", "DESCRIP"],
            data: $_SER751.COSTOS,
            callback_esc: function() {
                $("#costo_SER751").focus();
            },
            callback: function(data) {
                document.getElementById('costo_SER751').value = data.COD;
                _enterInput('#costo_SER751');
            }
        });
    }
}

function _ventanaTipoUsuarioSER751(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var tipac = $_SER751.TIPOUSUA;
        POPUP({
                array: tipac,
                titulo: 'Tipo Usuario',
                indices: [
                    { id: 'COD', label: 'DESCRIP' }
                ],
                seleccion: $_SER751.TIPO,
                callback_f: $('#tipoUsua_SER751').focus(),
                teclaAlterna: true
            },
            _evaluardatotipodepaciente_751);
    }
}

function _evaluardatotipodepaciente_751(tipac) {
    console.log(tipac)
    switch (tipac.COD) {
        case '*':
            $('#tipoUsua_SER751').val("*");
            _enterInput('#tipoUsua_SER751');
            break;
        case 'C':
        case 'S':
        case 'V':
        case 'P':
        case 'O':
        case 'D':
            $('#tipoUsua_SER751').val(tipac.COD);
            _enterInput('#tipoUsua_SER751');
            break;
        default:
            $('#tipoUsua_SER751').focus();
            break;
    }
}

function _ventanaEntidadesSER751(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE ENTIDADES",
            columnas: ["COD-ENT", "NOMBRE-ENT"],
            data: $_SER751.ENTIDADES,
            callback_esc: function() {
                $("#entidad_SER751").focus();
            },
            callback: function(data) {
                document.getElementById('entidad_SER751').value = data['COD-ENT'];
                _enterInput('#entidad_SER751');
            }
        });
    }
}

function _ventanaAtiendeSER751(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        SER830({ seleccion: $_SER751.PERSONAL }, $('#atiende_SER751'), (data) => {
            document.querySelector('#atiende_SER751').value = data.COD;
            $_SER751.atiende = data.COD;
            document.querySelector('#descripAtiende_SER751').value = data.DESCRIP;
            _enterInput('#atiende_SER751');
        })
    }
}

function _ventanaSucursalesSER751(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE SUCURSALES",
            columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
            data: $_SER751.SUCURSALES,
            callback_esc: function() {
                $("#sucursal_SER751").focus();
            },
            callback: function(data) {
                document.getElementById('sucursal_SER751').value = data.CODIGO;
                _enterInput('#sucursal_SER751');
            }
        });
    }
}

function _ventanaFacturacionSER751(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        bootbox.prompt({
            title: 'Mostrar facturas cerradas?',
            placeholder: 'N',
            className: '',
            size: 'small',
            maxlength: 1,
            buttons: {
                confirm: {
                    label: 'Ok'
                },
                cancel: {
                    label: 'Cancelar'
                }
            },
            callback: function(value) {
                if (value == undefined) {
                    validarNumeroSER751();
                } else {
                    if (value == "S" || value == "N") {
                        console.log(value, "value")
                        value == "S" ? filtro = "N" : filtro = "S";
                        postData({ datosh: datosEnvio() + '1' + '|' + '|' + filtro + '|' + $_SER751.prefijo }, get_url("app/SALUD/SER808.DLL"))
                            .then(data => {
                                $_SER751.FACTURAS2 = data.NUMERACION;
                                $_SER751.FACTURAS2.pop();
                                _ventanaFacturacion2SER751();
                            }).catch(err => {
                                loader('hide');
                                _toggleNav();
                            })
                    } else {
                        validarNumeroSER751();
                    }
                }
            }
        });
    }
}

function _ventanaFacturacion2SER751() {
    _ventanaDatos({
        titulo: "VENTANA DE FACTURAS",
        columnas: ["COD", "FECHA_ING", "DESCRIP", "NOM_PAC", "CONVENIO"],
        data: $_SER751.FACTURAS2,
        ancho: "1100",
        callback_esc: function() {
            $("#numero_SER751").focus();
        },
        callback: function(data) {
            document.getElementById('numero_SER751').value = data.COD.substring(1, 7).trim();
            _enterInput('#numero_SER751');
        }
    });
}


function _ventanaGrupoSER751(e) {
    console.debug(e, 'evento F8')
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "GRUPOS DE SERVICIO",
            columnas: ["COD", "DESCRIP"],
            data: $_SER751.GRPSER,
            callback_esc: function() {
                $('#grupo_SER751').focus();
            },
            callback: function(data) {
                console.debug(data);
                $('#grupo_SER751').val(data.COD.trim())
                $('#descripGrupo_SER751').val(data.DESCRIP.trim())
                _enterInput('#grupo_SER751');
            }
        });
    }
}