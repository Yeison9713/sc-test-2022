var $_TERCEROS_421,
  $_PLACAS_421,
  $_VENDEDORES_421,
  $_DATOS_TABLA_421 = [],
  $_TOTALES_421,
  $_GRUPOS_421,
  $_ARTICULOS_421,
  $_ALMACENES_421,
  $_SALDOS_421,
  $_BASE_ICA_421 = 0,
  $_VALOR_BASE_IVA = {
    VALOR_BASE_IVA1: 0,
    VALOR_BASE_IVA2: 0,
    VALOR_BASE_IVA3: 0,
  },
  $_VALOR_IVA = {
    VALOR_IVA1: 0,
    VALOR_IVA2: 0,
    VALOR_IVA3: 0,
  },
  $_IVA_USU = {
    IVA_USU_1: parseFloat($_USUA_GLOBAL[0].IVA1) || 0,
    IVA_USU_2: parseFloat($_USUA_GLOBAL[0].IVA2) || 0,
    IVA_USU_3: parseFloat($_USUA_GLOBAL[0].IVA3) || 0,
  },
  $_MODO_GRABAR = "",
  $_SUCURSALES = "",
  $_PREFIJO = "",
  $_DATA_IMPRE_421 = {},
  $_DATA_SOBRETASA = {};


var cantidadItemMask = new IMask(
    document.getElementById('cantidadItem'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var totalItemMask = new IMask(
    document.getElementById('totalitem'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var subtotalMask = new IMask(
    document.getElementById('subTotal_421'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var descuentosMask = new IMask(
    document.getElementById('descuentos_421'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var retefuenteMask = new IMask(
    document.getElementById('retefuente_421'),
    {
        mask: 'PP{%}',
        blocks: {
            PP: {
                mask: Number,
                min: 0,
                max: 9.9,
                scale: 1,
                radix: '.'
            }
        },
        lazy: false,
        placeholderChar: ' '
    }
);

var valorRetefuenteMask = new IMask(
    document.getElementById('valor_retefuente_421'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var ivatotalMask = new IMask(
    document.getElementById('ivaTotal_421'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var totalfacturaMask = new IMask(
    document.getElementById('totalFactura_421'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    loader('show');

    // jAlert({ titulo: 'Informacion', mensaje: `Opcion en mantenimiento - <b> Comuniquese con Prosoft </b>` }, function () {
    //     _toggleNav();
    // });
    _crearJsonTerceros_421()
    _toggleF8([
        { input: 'placa', app: '421', funct: _ventanaPlacas },
        { input: 'vendedor', app: '421', funct: _ventanaVendedores },
        { input: 'nitCliente', app: '421', funct: _ventanaTerceros },
        { input: 'grupoArticulo', app: '421', funct: _ventanaGrupos },
        { input: 'articulo', app: '421', funct: _ventanaArticulos },
        { input: 'almacen', app: '421', funct: _ventanaAlmacenes },
    ]);
});

function _ventanaPlacas(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda placas',
            columnas: ["PLACA", "NOMBRE", "VEND"],
            data: $_PLACAS_421,
            callback_esc: function () {
                $('#placa_421').focus();
            },
            callback: function (data) {
                $('#placa_421').val(data.PLACA.trim());
                _enterInput('#placa_421');
            }
        });
    }
}

function _ventanaVendedores(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda vendedores',
            columnas: ["COD", "NIT", "NOMBRE"],
            data: $_VENDEDORES_421,
            callback_esc: function () {
                $('#vendedor_421').focus();
            },
            callback: function (data) {
                $('#vendedor_421').val(data.COD.trim());
                _enterInput('#vendedor_421');
            }
        });
    }
}

function _ventanaGrupos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de grupos',
            columnas: ["GRUPO", "DESCRIP"],
            data: $_GRUPOS_421,
            callback_esc: function () {
                $('#grupoArticulo_421').focus();
            },
            callback: function (data) {
                $('#grupoArticulo_421').val(data.GRUPO.substring(1).trim());
                _enterInput('#grupoArticulo_421');
            }
        });
    }
}

function _ventanaArticulos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var grupo = $('#grupoArticulo_421').val().trim();
        const articulosFiltrados = $_ARTICULOS_421.filter(el => el.GRP.trim() == grupo)

        _ventanaDatos({
            titulo: 'Busqueda de articulos',
            columnas: ["GRP", "NUMERO", "CLASE", "DESCRIP", "UNID", "VR-VENT1"],
            data: articulosFiltrados,
            callback_esc: function () {
                $('#articulo_421').focus();
            },
            callback: function (data) {
                $('#articulo_421').val(data.NUMERO.trim() + data.CLASE.trim());
                _enterInput('#articulo_421');
            }
        });
    }
}

function _ventanaAlmacenes(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de almacenes',
            columnas: ["COD", "DESCRIP"],
            data: $_ALMACENES_421,
            callback_esc: function () {
                $('#almacen_421').focus();
            },
            callback: function (data) {
                $('#almacen_421').val(data.COD.trim());
                _enterInput('#almacen_421');
            }
        });
    }
}

function _ventanaTerceros(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'Busqueda terceros',
            data: $_TERCEROS_421,
            indice: ['COD', 'NOMBRE'],
            mascara: [
                {
                    COD: 'Identificacion',
                    NOMBRE: 'Nombre',
                    TELEF: 'Telefono',
                    CIUDAD: 'Ciudad',
                    ACT: 'Actividad',
                }
            ],
            minLength: 1,
            callback_esc: function () {
                $('#nitCliente_421').focus();
            },
            callback: function (data) {
                $('#nitCliente_421').val(data.COD.trim());
                _enterInput('#nitCliente_421');
            }
        });
    }
}

function _crearJsonTerceros_421() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/CON802.DLL"))
        .then(data => {
            $_TERCEROS_421 = data.TERCEROS;
            _crearJsonVendedores_421();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _crearJsonVendedores_421() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/CON805.DLL"))
        .then(data => {
            $_VENDEDORES_421 = data.VENDEDORES;
            _crearJsonArticulos_421()
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _crearJsonArticulos_421() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/INV803.DLL"))
        .then(data => {
            $_ARTICULOS_421 = data.Articulos;
            _crearJsonAlmacenes_421();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _crearJsonAlmacenes_421() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/INV801.DLL"))
        .then(data => {
            $_ALMACENES_421 = data.LOCAL;
            crearJsonPlacas_421()
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function crearJsonPlacas_421() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/PLA805.DLL"))
        .then(data => {
            $_PLACAS_421 = data.PLACAS.filter((e) => e.PLACA.trim() != "");
            loader('hide');
            // Init fecha
            var d = new Date(),
                año = d.getFullYear(),
                mes = d.getMonth() + 1,
                dia = d.getDate();

            $('#añoInicial').val(año)
            $('#mesInicial').val(mes)
            $('#diaInicial').val(dia)
            _crearPrefijos();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _crearPrefijos(){
    postData({datosh: datosEnvio()}, get_url("app/invent/INV109.DLL"))
    .then(data=>{
        $_SUCURSALES = data.PREFIJOS[0];
        _validarPrefijo();
    }).catch(err=>{
        console.log(err)
        loader('hide');
        _toggleNav();
    })
}

function _validarPrefijo() {
    var prefijos = $_SUCURSALES.TABLA.filter((e) => e.PREFIJO.trim() != "");
    _ventanaDatos({
        titulo: 'Sucursales activas',
        columnas: ["PREFIJO", "DESC_PREF", "ALMACEN", "CENTRO_COSTO"],
        data: prefijos,
        callback_esc: function () {
            _toggleNav();
        },
        callback: function (data) {
            var sucursal = parseFloat(data.NRO).toString().padStart(2, "0");
            document.getElementById(
                "sucursal_421"
            ).value = `${sucursal} - ${data.DESC_PREF}`;
            $_PREFIJO = sucursal;
            validarPlacas_421();
        }
    });
}

function validarPlacas_421(orden) {
    validarInputs(
        {
            form: '#formPlaca',
            orden: "1"
        },
        _validarPrefijo,
        on_validarPlacas_421
    )
}

function on_validarPlacas_421() {
    loader('show');
    var placa = $('#placa_421').val().toUpperCase();
    postData({ datosh: datosEnvio() + placa + "|" }, get_url("app/bombas/INV421.DLL"))
        .then(on_datosTabla_421).catch(err => {
            loader('hide');
            validarPlacas_421('1')
        })
}

function validarCliente_421(orden) {
    validarInputs(
        {
            form: '#formCliente',
            orden: orden
        },
        function () {
            // Limpiar datos
            initDatos_421();
            validarPlacas_421('1')
        },
        on_validarCliente_421
    )
}

function on_validarCliente_421() {
    var tercero = $('#nitCliente_421').val().trim(),
        busqueda = buscarTerceros_421(tercero);

    if (busqueda) {
        if (
            parseFloat(tercero) > 1000 &&
            (busqueda.DIRREC.trim().length < 1 || busqueda.TELEF.trim().length < 1)
        ) {
            abrirTerceroPower()
        } else {
            validarVendedor_421('1');
        }

        $('#nombreCliente_421').val(busqueda.NOMBRE)
    } else {
        plantillaToast('99', '01', null, 'warning');
        validarCliente_421('01')
    }
}

function validarVendedor_421(orden) {
    validarInputs(
        {
            form: '#formVendedor',
            orden: orden
        },
        function () { validarCliente_421('1') },
        on_validarVendedor_421
    )
}

function on_validarVendedor_421() {
    var vendedor = $('#vendedor_421').val().trim().toUpperCase(),
        busqueda = buscarVendedor_421(vendedor);

    if (busqueda) {
        $('#nombreVendedor').val(busqueda.NOMBRE)
        var siguienteItem = $('#tablaFacturas tbody tr').length + 1;
        $('#itemTabla_421').val(siguienteItem)
        validarItem_421('1')
    } else {
        plantillaToast('99', '01', null, 'warning');
        validarVendedor_421('01')
    }
}

function on_datosTabla_421(data) {

    var placa = $('#placa_421').val().toUpperCase(),
        busqueda = buscarPlaca_421(placa);

    if (busqueda) {
        $('#nitCliente_421').val(busqueda["COD-TER"])
        $('#nombreCliente_421').val(busqueda.NOMBRE)
        $('#vendedor_421').val(busqueda.VEND)
    }else{
        var tercero = buscarTerceros_421(data.TOTALES[5])
        if (tercero){
            $('#nitCliente_421').val(tercero.COD)
            $('#nombreCliente_421').val(tercero.NOMBRE.trim())
        }
    }

    $_DATOS_TABLA_421 = data["TABLA-IVA"];
    $_DATOS_TABLA_421.pop();
    $_TOTALES_421 = data.TOTALES;
    _crearJsonGrupos_421()
}

function _crearJsonGrupos_421() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/INV804.DLL"))
        .then(data => {
            loader('hide')
            var nit = $_USUA_GLOBAL[0].NIT,
              filter_grp = [02, 03, 04, 05, 06, 07, 08];

            if (nit == 30273) {
              $_GRUPOS_421 = data.GRUPOS.filter((e) => {
                var consulta = filter_grp.find((f) => e.GRUPO == f);
                if (!consulta) return e;
              });
            } else {
              $_GRUPOS_421 = data.GRUPOS;
            }

            if (llenarTabla_421()) {
                var nitTercero = $('#nitCliente_421').val().trim(),
                    busquedaTercero = buscarTerceros_421(nitTercero);

                if (busquedaTercero) {
                    if (
                        parseFloat(nitTercero) > 1000 &&
                        (busquedaTercero.DIRREC.trim().length < 1 || busquedaTercero.TELEF.trim().length < 1)
                    ) {
                        // abrirTerceroPower()
                        validarVendedor_421('1');
                    } else {
                        validarVendedor_421('1');
                    }
                } else {
                    var busquedaTercero = buscarTerceros_421(cerosIzq('1', 10));
                    $('#nitCliente_421').val(busquedaTercero.COD.trim())
                    $('#nombreCliente_421').val(busquedaTercero.NOMBRE.trim())
                    validarVendedor_421('1');
                }
            }
        }).catch(err => {
            loader('hide')
            validarPlacas_421('1')
        })
}

function validarItem_421(orden) {
    validarInputs(
        {
            form: '#validarItemTabla_421',
            orden: orden,
            event_f1: ()=>{
                $_MODO_GRABAR = "F1";
                _bajarDatos_421();
            },
            event_f3: ()=>{
                $_MODO_GRABAR = 'F3';
                _validarDescuento_421(); 
            },
            event_f4: ()=>{
                var index = parseInt($("#itemTabla_421").val().trim()) - 1,
                  item = $_DATOS_TABLA_421[index] || false;
                _eliminarItemTabla(item, index);
            },
            event_f5: ()=>{
                initDatos_421();
                validarPlacas_421('1');
            }
        },
        function () { validarVendedor_421('01') },
        on_validarItem_421
    )
}

function _eliminarItemTabla(item, index){
    if (item) {
      CON850_P(
        function (e) {
          if (e.id == "S") {
            var data = $_DATOS_TABLA_421.filter(
              (e) => e.COD.trim() != item.COD.trim()
            );
            $_DATOS_TABLA_421 = JSON.parse(JSON.stringify(data));
            
            limpiarItem();
            llenarTabla_421();
            _eliminarItemTabla();
          } else {
            setTimeout(validarItem_421, 200);
          }
        },
        { msj: "Desea eliminar item?" }
      );
    } else {
      validarItem_421();
    }
}

function on_validarItem_421() {
    var item = parseInt($('#itemTabla_421').val().trim()),
        itemsTabla = $('#tablaFacturas tbody tr').length + 1,
        index = '';

    if (item > itemsTabla || item < 1) {
        validarItem_421('1')
        $('#itemTabla_421').val(itemsTabla)
    } else {
        if ($_DATOS_TABLA_421) index = $_DATOS_TABLA_421.findIndex(el => el.itemTabla == item);
        if (index > -1) {
            montarItemTabla({ ...$_DATOS_TABLA_421[index] });
        }
        validarGrupo_421();
    }
}

function montarItemTabla(data) {
    document.getElementById('grupoArticulo_421').value = data.COD.substr(1, 2);
    document.getElementById('articulo_421').value = data.COD.substr(3).trim();
    document.getElementById('descripcionArticulo_421').value = data.DESCRIP;
    document.getElementById('almacen_421').value = data.ALM.trim();
    document.getElementById('cantidadItem').value = data.CANTIDAD.trim();
    document.getElementById('totalitem').value = data.VALOR.trim();
}

function validarGrupo_421() {
    validarInputs(
        {
            form: '#validarGrupo_421',
            orden: '1',
            event_f1: ()=>{
                $_MODO_GRABAR = "F1";
                _bajarDatos_421();
            },
            event_f3: ()=>{
                $_MODO_GRABAR = 'F3';
                _validarDescuento_421(); 
            },
            event_f4: ()=>{
                var index = parseInt($("#itemTabla_421").val().trim()) - 1,
                  item = $_DATOS_TABLA_421[index] || false;
                _eliminarItemTabla(item, index);
            },
            event_f5: ()=>{
                initDatos_421();
                validarPlacas_421('1');
            }
        },
        function () { validarItem_421('01') },
        on_validarGrupo_421
    )
}

function on_validarGrupo_421() {
    var grupo = $('#grupoArticulo_421').val(),
        busqueda = buscarGrupo_421(grupo);

    if (busqueda) {
        $('#descripcionArticulo_421').val(busqueda.DESCRIP)
        validarArticulo_421()
    } else {
        plantillaToast('99', '01', null, 'warning');
        validarGrupo_421()
    }
}

function validarArticulo_421() {
    validarInputs(
        {
            form: '#validarArticulo_421',
            orden: '1'
        },
        function () { validarGrupo_421() },
        on_validarArticulo_421
    )
}

function on_validarArticulo_421() {
    var grupo = $('#grupoArticulo_421').val(),
        articulo = $('#articulo_421').val(),
        busqueda = buscarArticulo_421(grupo + articulo);

    if (busqueda) {

        var datos_envio = datosEnvio() + grupo + "|" + articulo + "|";
        postData({ datosh: datos_envio }, get_url("app/bombas/INV421_1.DLL"))
          .then((data) => {

            var vlr_sobretasa = data.VLR_SOBRE.trim() || 0,
              vlr_global = data.VLR_GLB.trim() || 0,
              vlr_art = busqueda.VALOR.replace(/\,/g, "").trim(),
              total =
                parseFloat(vlr_art) +
                parseFloat(vlr_sobretasa) +
                parseFloat(vlr_global);

                $_DATA_SOBRETASA = {
                  vlr_sobretasa,
                  vlr_global,
                  vlr_art,
                };

              $("#descripcionArticulo_421").val(busqueda.DESCRIP);
              totalItemMask.unmaskedValue = total.toString();
              document.getElementById("almacen_421").value = "ALM01";
              validarAlmacen_421();

          })
          .catch((err) => {
            validarArticulo_421();
          });
    } else {
        plantillaToast('99', '01', null, 'warning');
        validarArticulo_421()
    }
}

function validarAlmacen_421() {
    validarInputs(
        {
            form: '#validarAlmacen_421',
            orden: '1'
        },
        validarArticulo_421,
        on_validarAlmacen_421
    )
}

function on_validarAlmacen_421() {
    var almacen = $('#almacen_421').val().trim().toUpperCase(),
        busqueda = buscarAlmacenes_421(almacen);

    if (busqueda) {
        $('#almacen_421').val(busqueda.COD)
        crearJsonSaldos_421();
        // validarCantidad_421()
    } else {
        plantillaToast('99', '01', null, 'warning');
        validarAlmacen_421()
    }
}

function crearJsonSaldos_421() {
    var almacen = $('#almacen_421').val(),
        grupo = "0" + $('#grupoArticulo_421').val(),
        codArticulo = $('#articulo_421').val(),
        articulo = grupo + codArticulo;
    postData({ datosh: datosEnvio() + almacen + articulo }, get_url("app/bombas/INV808.DLL"))
        .then(data => {
            $_SALDOS_421 = data.SALDOS;
            ventana_INV808($_SALDOS_421);
        }).catch(err => {
            validarAlmacen_421();
        })
}

function validarCantidad_421() {
    validarInputs(
        {
            form: '#validarCantidad_421',
            orden: '1'
        },
        validarAlmacen_421,
        function () {
            var cantidad = parseFloat(cantidadItemMask.unmaskedValue) || 0;
            if (cantidad < 1) {
                cantidadItemMask.unmaskedValue = '1'
                validarCantidad_421()
            } else {
                validarTotal_421();
            }
        }
    )
}

function validarTotal_421() {
    validarInputs(
        {
            form: '#validarTotal_421',
            orden: '1'
        },
        validarAlmacen_421,
        function () {
            var itemTabla = parseInt($('#itemTabla_421').val()),
                grupoArticulo = $('#grupoArticulo_421').val(),
                codArticulo = $('#articulo_421').val(),
                COD = "0" + grupoArticulo + codArticulo,
                DESCRIP = $('#descripcionArticulo_421').val(),
                ALM = $('#almacen_421').val(),
                CANTIDAD = parseFloat(cantidadItemMask.unmaskedValue) || 0,
                valorInd = parseFloat(totalItemMask.unmaskedValue) || 0,
                subTotal = parseFloat(CANTIDAD) * parseFloat(valorInd),
                VALOR = subTotal.toString(),
                datosArticulo = buscarArticulo_421(grupoArticulo + codArticulo);


            if (grupoArticulo == 01 && $_USUA_GLOBAL[0].NIT == 30273) {
              var valor_unidad =
                parseFloat($_DATA_SOBRETASA.vlr_art) +
                parseFloat($_DATA_SOBRETASA.vlr_sobretasa) +
                parseFloat($_DATA_SOBRETASA.vlr_global);

              CANTIDAD = valorInd / valor_unidad;
              subTotal = valorInd;
              VALOR = subTotal.toString();
              CANTIDAD = CANTIDAD.toFixed(2);
            }

            
            var index = $_DATOS_TABLA_421.findIndex(el => el.itemTabla == itemTabla),
                element = {
                    itemTabla,
                    COD,
                    DESCRIP,
                    ALM,
                    CANTIDAD,
                    VALOR,
                    VLR_ART_W: valorInd
                }

            if (index > -1) {
                $_DATOS_TABLA_421[index] = element;
            } else {
                $_DATOS_TABLA_421.push(element)
            }

            if (llenarTabla_421()) {
                limpiarItem();
                var siguienteItem = $('#tablaFacturas tbody tr').length + 1;
                $('#itemTabla_421').val(siguienteItem);
                validarItem_421('1')
            }
        }
    )
}

function _validarDescuento_421() {
    validarInputs(
        {
            form: '#validarDescuento_421',
            orden: '1'
        },
        function () { validarItem_421('1') },
        function () {
            var valor_des_pla = parseFloat(descuentosMask.unmaskedValue) || 0,
                valor_bruto = parseFloat(subtotalMask.unmaskedValue) || 0,
                factor_descto = 0;

            if (valor_des_pla > valor_bruto) {
                descuentosMask.unmaskedValue = ''
                _validarDescuento_421()
            } else {
                var $_VALOR_BASE_IVA_tmp = { VALOR_BASE_IVA1: 0, VALOR_BASE_IVA2: 0, VALOR_BASE_IVA3: 0 },
                    $_VALOR_IVA_tmp = { VALOR_IVA1: 0, VALOR_IVA2: 0, VALOR_IVA3: 0 },
                    totalIva = valorTotal = 0,
                    valor_bruto = parseFloat(subtotalMask.unmaskedValue) || 0;

                if (valor_des_pla > 0) {
                    factor_descto = 1 - (parseFloat(valor_des_pla) / parseFloat(valor_bruto))
                } else {
                    factor_descto = 1;
                }

                for (let i = 1; i < 4; i++) {
                    $_VALOR_BASE_IVA_tmp[`VALOR_BASE_IVA${i}`] = $_VALOR_BASE_IVA[`VALOR_BASE_IVA${i}`] * factor_descto;
                    $_VALOR_IVA_tmp[`VALOR_IVA${i}`] = $_VALOR_BASE_IVA_tmp[`VALOR_BASE_IVA${i}`] * $_IVA_USU[`IVA_USU_${i}`] / 100;
                }


                totalIva = parseFloat($_VALOR_IVA_tmp[`VALOR_IVA1`])
                    + parseFloat($_VALOR_IVA_tmp[`VALOR_IVA2`])
                    + parseFloat($_VALOR_IVA_tmp[`VALOR_IVA3`]);

                valorTotal = parseFloat(valor_bruto) - parseFloat(valor_des_pla) + parseFloat(totalIva)
                ivatotalMask.unmaskedValue = totalIva.toString();
                totalfacturaMask.unmaskedValue = valorTotal.toString();

                validarRetefuente_421();
            }
        }
    )
}


function validarRetefuente_421() {
    validarInputs(
        {
            form: '#validarRtefuente',
            orden: '1'
        },
        function () {
            descuentosMask.unmaskedValue = '';
            retefuenteMask.unmaskedValue = '';
            valorRetefuenteMask.unmaskedValue = '';
            if (llenarTabla_421()) _validarDescuento_421();
        },
        function () {
            var temp = retefuenteMask.unmaskedValue ? retefuenteMask.unmaskedValue.slice(0, -1) : '0',
                porcent_ret = parseFloat(temp) || 0,
                valor_ret = 0,
                valor_total = parseFloat(totalfacturaMask.unmaskedValue) || 0,
                valor_iva = parseFloat(ivatotalMask.unmaskedValue) || 0;

            if (porcent_ret == 8) {
                retefuenteMask.unmaskedValue = '';
                validarValorRetfuente_421();
            } else {
                valor_ret = (valor_total - valor_iva) * porcent_ret / 100
                calcularRetencion(parseFloat(valor_ret));
            }

        }
    )
}

function validarValorRetfuente_421() {
    validarInputs(
        {
            form: '#validarValorRtefuente',
            orden: '1'
        },
        function () {
            descuentosMask.unmaskedValue = '';
            retefuenteMask.unmaskedValue = '';
            valorRetefuenteMask.unmaskedValue = '';
            if (llenarTabla_421()) _validarDescuento_421();
        },
        function () {
            var valorRetencion = parseFloat(valorRetefuenteMask.unmaskedValue) || 0;
            calcularRetencion(valorRetencion);
        }
    )
}

function calcularRetencion(valorRetencion) {
    var temp = 0,
        valor_iva = parseFloat(ivatotalMask.unmaskedValue) || 0,
        valor_bruto = parseFloat(subtotalMask.unmaskedValue) || 0,
        valor_des = parseFloat(descuentosMask.unmaskedValue) || 0;

    temp = valor_bruto - valor_des + valor_iva - valorRetencion;
    totalfacturaMask.unmaskedValue = temp.toString();
    valorRetefuenteMask.unmaskedValue = valorRetencion.toString();
    validarFormaPago();
}

function validarFormaPago() {
    validarInputs(
        {
            form: '#validarFormapago_421',
            orden: '1'
        },
        function () {
            descuentosMask.unmaskedValue = '';
            retefuenteMask.unmaskedValue = '';
            valorRetefuenteMask.unmaskedValue = '';
            if (llenarTabla_421()) _validarDescuento_421();
        },
        function () {
            var formaPago = $('#formapago_421').val().trim();

            if (formaPago == '2' || formaPago == '3') {
                validarDiasPago();
            } else {
                let año = $('#añoInicial').val(),
                    mes = cerosIzq($('#mesInicial').val(), 2),
                    dia = cerosIzq($('#diaInicial').val(), 2);

                $('#fechaVencimiento').val(año + mes + dia);
                validarDetallePago();
            }
        }
    )
}

function validarDiasPago() {
    validarInputs(
        {
            form: '#validarDias_421',
            orden: '1'
        },
        function () {
            $('#diasPago_421,#fechaVencimiento').val('');
            validarFormaPago()
        },
        function () {
            var diasPago = parseFloat($('#diasPago_421').val().trim()) || 0;

            if (diasPago < 1 || diasPago > 200) validarDiasPago()
            else {
                // Calcular fecha
                var fechaVence = datoFechaVence(diasPago);
                $('#fechaVencimiento').val(fechaVence);
                validarDetallePago();
            }
        }
    )
}

function validarDetallePago() {
    validarInputs(
        {
            form: '#validarDetalle_421',
            orden: '1'
        },
        function () {
            $('#diasPago_421,#fechaVencimiento').val('');
            validarFormaPago()
        },
        validacionFinal
    )
}

function validacionFinal() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            _bajarDatos_421();
        } else {
            setTimeout(validarDetallePago, 200)
        }
    }, {}
    )
}

function _bajarDatos_421() {
    if ($_DATOS_TABLA_421.length < 1) $_DATOS_TABLA_421 = false;
    else {
        $_DATOS_TABLA_421.map(e => {
            var cantidadEdit = parseFloat(e.CANTIDAD) || 0,
                cantidadEdit = cantidadEdit.toFixed(2),
                valorEdit = parseFloat(e.VALOR.replace(/\,/g, '')) || 0,
                valorEdit = valorEdit.toFixed(2);
        })
    }

    var data = {}, posicion = 0;
    for (var i in $_DATOS_TABLA_421) {
        let linea = $_DATOS_TABLA_421[i].ALM + "|"
            + $_DATOS_TABLA_421[i].COD + "|"
            + $_DATOS_TABLA_421[i].CANTIDAD.toString().trim() + "|"
            + $_DATOS_TABLA_421[i].VALOR.trim() + "|";
        posicion++;
        data['LIN-' + posicion.toString().padStart(3, '0')] = linea;
    }

    let año = $('#añoInicial').val(),
        mes = cerosIzq($('#mesInicial').val(), 2),
        dia = cerosIzq($('#diaInicial').val(), 2),
        placa = $('#placa_421').val(),
        tercero = cerosIzq($('#nitCliente_421').val(), 10),
        vendedor = $('#vendedor_421').val(),
        valorDescuento = parseFloat(descuentosMask.unmaskedValue) || 0,
        valorIva = parseFloat(ivatotalMask.unmaskedValue) || 0,
        valorRetencion = parseFloat(valorRetefuenteMask.unmaskedValue) || 0,
        formaPago = $('#formapago_421').val(),
        detalle = $('#detalle_421').val().trim(),
        vl1_iva_1 = parseFloat($_VALOR_IVA.VALOR_IVA1) || 0,
        vl1_iva_2 = parseFloat($_VALOR_IVA.VALOR_IVA2) || 0,
        vl1_iva_3 = parseFloat($_VALOR_IVA.VALOR_IVA3) || 0,
        item = $('#tablaFacturas tbody tr').length,
        fechaVencimiento = $('#fechaVencimiento').val();

    valorDescuento = valorDescuento.toFixed(2).replace(/\./g, '');
    valorIva = valorIva.toFixed(2).replace(/\./g, '');
    valorRetencion = valorRetencion.toFixed(2).replace(/\./g, '');

    vl1_iva_1 = vl1_iva_1.toFixed(2).replace(/\./g, '')
    vl1_iva_2 = vl1_iva_2.toFixed(2).replace(/\./g, '')
    vl1_iva_3 = vl1_iva_3.toFixed(2).replace(/\./g, '')
    $_BASE_ICA_421 = parseFloat($_BASE_ICA_421).toFixed(0).replace(/\./g, '');

    var tipo_guardado = '';
    if ($_MODO_GRABAR == 'F1') tipo_guardado = 'S';
    else tipo_guardado = 'N';

    data.datosh = datosEnvio()
        + localStorage.Usuario
        + '|' + $_PREFIJO
        + '|' + año + mes + dia
        + '|' + placa.toString().toUpperCase()
        + '|' + tercero
        + '|' + vendedor
        + '|' + cerosIzq(valorDescuento, 14)
        + '|' + cerosIzq(valorIva, 14)
        + '|' + cerosIzq(valorRetencion, 14)
        + '|' + cerosIzq(formaPago, 2)
        + '|' + espaciosDer(detalle, 95)
        + '|' + cerosIzq(item, 2)
        + '|' + cerosIzq($_BASE_ICA_421, 12)
        + '|' + cerosIzq(vl1_iva_1, 14)
        + '|' + cerosIzq(vl1_iva_2, 14)
        + '|' + cerosIzq(vl1_iva_3, 14)
        + '|' + cerosIzq(item, 2)
        + '|' + fechaVencimiento
        + '|' + tipo_guardado
        + '|';

        postData(data, get_url("app/bombas/INV421_R.DLL"))
        .then(nro_factura => {
            jAlert({ titulo: 'Correcto ', mensaje: `Factura guardada correctamente` }, function () {
                initDatos_421()
                setTimeout(function () {
                    if ($_MODO_GRABAR == 'F3'){
                        $_DATA_IMPRE_421.nro_factura = nro_factura;
                        _consultarDepende();
                    }else crearJsonPlacas_421();
                }, 500)
            });
        }).catch(err => {
            if ($_MODO_GRABAR == "F1") {
              validarItem_421("01");
            } else {
              validarDetallePago();
            }
        })
}

function _consultarDepende() {
    var datos = datosEnvio() + localStorage.Usuario + "|";
    postData({ datosh: datos }, get_url("app/CONTAB/CON892.DLL"))
        .then(data => {
            $_DATA_IMPRE_421.RUTA = data.RUTA.trim();
            _factura421();
        }).catch(err => {
            console.log(err);
            crearJsonPlacas_421();
        })
}

function _factura421(){
    var parametros = {
        Id: " G1",
        Descripcion: "Impresion factura",
        Tipo: "POWER",
        Params: [
            {
                dll: $_DATA_IMPRE_421.RUTA, 
                formulario: "INV411",
                NomFact: "FACT",
                Sucursal: $_PREFIJO,
                nro_fact: $_DATA_IMPRE_421.nro_factura,
            }
        ],
    };

    _validarVentanaMain(parametros, () => {
        crearJsonPlacas_421();
    });
}

function llenarTabla_421() {
    var cantidadMask = IMask.createMask({ mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }),
        valorMask = IMask.createMask({ mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }),
        subTotal = totalIva = totalFactura = 0,
        id = $_BASE_ICA_421 = 0;


    $_VALOR_BASE_IVA = { VALOR_BASE_IVA1: 0, VALOR_BASE_IVA2: 0, VALOR_BASE_IVA3: 0 };
    $_VALOR_IVA = { VALOR_IVA1: 0, VALOR_IVA2: 0, VALOR_IVA3: 0 };

    $('#tablaFacturas tbody').html('')

    if ($_DATOS_TABLA_421) {
        $_DATOS_TABLA_421.map((el, idx) => {
            var datosArticulo = buscarArticulo_421(el.COD.substring(1)),
              ASUME_IVA_USU = $_USUA_GLOBAL[0].ASUME_IVA.trim(),
              nit = $_USUA_GLOBAL[0].NIT;

            if (datosArticulo || nit == 30273) {
                var iva = parseFloat(datosArticulo["VLR-IVA"]) || 0,
                    IVA_ART_W = parseInt(datosArticulo["ITEM-IVA"]) || 0,
                    ivaPorcentaje = parseFloat(iva) / 100,
                    valorIva = (parseFloat(iva) + 100) / 100,
                    valor = parseFloat(el.VALOR.replace(/\,/g, '')) || 0,
                    valorNeto = parseFloat(valor) / valorIva,
                    valorIva = parseFloat(valorNeto) * parseFloat(ivaPorcentaje),
                    grp = datosArticulo.GRP,
                    autoret = parseFloat(datosArticulo.AUTORE) || 0,
                    VLR_ART_W = parseFloat(el.VLR_ART_W) || 0,
                    base_icav = 0;

                var cantidad = parseFloat(el.CANTIDAD) || "0",
                    valor = el.VALOR.replace(/\,/g, '');

                if (ASUME_IVA_USU != 'S') valorNeto = valor;

                id = id + 1;
                cantidadMask.resolve(cantidad.toString())
                valorMask.resolve(valor)

                if (IVA_ART_W == 1 || IVA_ART_W == 2 || IVA_ART_W == 3)
                    $_VALOR_BASE_IVA[`VALOR_BASE_IVA${IVA_ART_W}`] += parseFloat(valorNeto);


                $('#tablaFacturas tbody').append(''
                    + '<tr>'
                    + ` <td>${id}</td>`
                    + ` <td>${el.COD}</td>`
                    + ` <td>${el.DESCRIP}</td>`
                    + ` <td>${el.ALM}</td>`
                    + ` <td>${cantidadMask.value}</td>`
                    + ` <td>${valorMask.value}</td>`
                    + '</tr>'
                )

                el.itemTabla = id;
                subTotal = parseFloat(subTotal) + parseFloat(valorNeto);
                // totalIva = parseFloat(totalIva) + parseFloat(valorIva);

                if (grp == '01' && autoret > 0) base_icav = (VLR_ART_W * autoret) / 100
                else base_icav = 0

                if (valorNeto > 0) $_BASE_ICA_421 = parseFloat($_BASE_ICA_421) + base_icav;
            }

            return el;
        });


        for (let i = 1; i < 4; i++)
            $_VALOR_IVA[`VALOR_IVA${i}`] = $_VALOR_BASE_IVA[`VALOR_BASE_IVA${i}`] * $_IVA_USU[`IVA_USU_${i}`] / 100;

        totalIva = parseFloat($_VALOR_IVA[`VALOR_IVA1`])
            + parseFloat($_VALOR_IVA[`VALOR_IVA2`])
            + parseFloat($_VALOR_IVA[`VALOR_IVA3`]);

        totalFactura = subTotal + totalIva;
        subtotalMask.unmaskedValue = subTotal.toString();
        ivatotalMask.unmaskedValue = totalIva.toString();
        totalfacturaMask.unmaskedValue = totalFactura.toString();
    }

    return true;
}

function ventana_INV808(saldos) {
    var NIT_USU = parseFloat($_USUA_GLOBAL[0].NIT),
        tabla_parent = $('<table />', { class: "table table-light table-atriped" }).css({ margin: '0' }),
        SALDO_TOTAL = 0,
        grupoArticulo = $('#grupoArticulo_421').val(),
        codArticulo = $('#articulo_421').val(),
        articulo = grupoArticulo + codArticulo,
        ALM = $('#almacen_421').val();

    saldos.forEach(datos => {
        let row_obj = $('<tr />'),
            SDO_ANT_CANT = parseFloat(datos["SDO-ANT-CANT"]) || 0,
            ACUM_ENT_CANT = parseFloat(datos["ACUM-ENT-CANT"]) || 0,
            ACUM_SAL_CANT = parseFloat(datos["ACUM-SAL-CANT"]) || 0,
            SDO_ACT_CANT = parseFloat(datos["SDO-ACT-CANT"]) || 0,
            VLR_UNIT = parseFloat(datos["VLR-UNIT"]) || 0,
            ASUME_IVA_USU = $_USUA_GLOBAL[0].ASUME_IVA.trim(),
            VLR_REF_ART = parseFloat(datos["VLR-REF-ART"]) || 0,
            COD_LOTE_SAL = datos["COD-LOTE-SAL"] || "",
            COD_ALM_SAL = datos["COD-ALM-SAL"] || "";


        if (NIT_USU == 822002983 || NIT_USU == 809012776 || NIT_USU == 19845216) {

        } else {
            row_obj.append($('<td />', { text: SDO_ANT_CANT }))
            row_obj.append($('<td />', { text: ACUM_ENT_CANT }))
            row_obj.append($('<td />', { text: ACUM_SAL_CANT }))
        }

        row_obj.append($('<td />', { text: SDO_ACT_CANT }))

        SALDO_TOTAL += SDO_ACT_CANT;

        if (
            (NIT_USU == 822002983 || NIT_USU == 809012776 || NIT_USU == 19845216 || NIT_USU == 800202522)
            || ((ASUME_IVA_USU == "S" || $_USUA_GLOBAL[0].CUOTAS == '3') && NIT_USU != 40391944)
        ) {
            row_obj.append($('<td />', { text: `Vr. REF: ${VLR_REF_ART}` }))
        } else {
            row_obj.append($('<td />', { text: `C.unit: ${VLR_UNIT}` }))
        }

        row_obj.append($('<td />', { text: COD_LOTE_SAL }))
        row_obj.append($('<td />', { text: COD_ALM_SAL }))

        tabla_parent.append(row_obj)
    })

    var foot_obj = $('<tfoot />');
    foot_obj.append(''
        + '<tr>'
        + '   <td></td>'
        + '   <td></td>'
        + '   <td></td>'
        + '   <td></td>'
        + '   <td></td>'
        + '   <td>TOTAL ACUMULADO: </td>'
        + `   <td>${SALDO_TOTAL}</td>`
        + '</tr>'
    )

    tabla_parent.append(foot_obj)

    var popup_saldo = bootbox.dialog({
      title: `Consulta de saldo actual: <b>${articulo}</b> - ALM: <b>${ALM}</b>`,
      message: tabla_parent,
      closeButton: false,
      buttons: {
        main: {
          label: "Aceptar",
          className: "blue",
          callback: function () {
            validarCantidad_421();
          },
        },
      },
    });

    popup_saldo.init(() => {
      setTimeout(() => {
        $(".bootbox .btn.blue").focus();
      }, 500);
    });
}

function datoFechaVence(dias_w) {
    var dias_temp = 0,
        año_vence_w = parseFloat($('#añoInicial').val()),
        mes_vence_w = parseFloat($('#mesInicial').val()),
        dia_vence_w = parseFloat($('#diaInicial').val());

    dia_vence_w = parseFloat(dia_vence_w) + parseFloat(dias_w)

    if (dia_vence_w > 30) {
        let dias_temp = parseFloat(dia_vence_w) / 30,
            ent_temp = Math.trunc(dias_temp);

        dia_vence_w = dia_vence_w - (ent_temp * 30);
        mes_vence_w = mes_vence_w + ent_temp;
        if (dia_vence_w == 0) dia_vence_w = 1;
    }

    if (mes_vence_w > 12) {
        let dias_temp = parseFloat(mes_vence_w) / 12,
            ent_temp = Math.trunc(dias_temp);

        mes_vence_w = mes_vence_w - (ent_temp * 12);
        año_vence_w = año_vence_w + ent_temp;
    }

    return año_vence_w.toString() + cerosIzq(mes_vence_w.toString(), 2) + cerosIzq(dia_vence_w.toString(), 2);
}

function limpiarItem() {
    $('#grupoArticulo_421,#articulo_421,#descripcionArticulo_421,#almacen_421').val('')
    cantidadItemMask.unmaskedValue = ''
    totalItemMask.unmaskedValue = ''
}

function buscarPlaca_421(placa) {
    var busqueda = $_PLACAS_421.find(el => el.PLACA == placa.trim())

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function buscarVendedor_421(vendedor) {
    var busqueda = $_VENDEDORES_421.find(el => el.COD.trim() == vendedor.trim())

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function buscarTerceros_421(tercero) {
    var busqueda = $_TERCEROS_421.find(el => parseFloat(el.COD.trim()) == parseFloat(tercero.trim()))

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function buscarGrupo_421(grupo) {
    var busqueda = $_GRUPOS_421.find(el => el.GRUPO.substring(1).trim() == grupo.trim())

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function buscarArticulo_421(articulo) {
    var busqueda = $_ARTICULOS_421.find(el => el.GRP.trim() + el.NUMERO.trim() + el.CLASE.trim() == articulo.trim())

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function buscarAlmacenes_421(almacen) {
    var busqueda = $_ALMACENES_421.find(el => el.COD.trim() == almacen.trim())

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function initDatos_421() {
    _inputControl('reset');
    _inputControl('disabled');
    $('#tablaFacturas tbody').html('')
    $('#itemTabla_421,#vendedor_421,#nombreVendedor,#formapago_421,#diasPago_421,#fechaVencimiento,#detalle_421').val('')
    limpiarItem()
    subtotalMask.unmaskedValue = "";
    ivatotalMask.unmaskedValue = "";
    totalfacturaMask.unmaskedValue = "";
    descuentosMask.unmaskedValue = "";
    retefuenteMask.unmaskedValue = "";
    valorRetefuenteMask.unmaskedValue = "";
    $_DATOS_TABLA_421 = [];
    $_TOTALES_421;
    $_SALDOS_421;
    $_BASE_ICA_421
    $_VALOR_BASE_IVA = {
        VALOR_BASE_IVA1: 0,
        VALOR_BASE_IVA2: 0,
        VALOR_BASE_IVA3: 0,
    };

    $_DATA_IMPRE_421 = {};
    $_DATA_SOBRETASA = {};

    $_VALOR_IVA = {
        VALOR_IVA1: 0,
        VALOR_IVA2: 0,
        VALOR_IVA3: 0,
    };
    var d = new Date(),
        año = d.getFullYear(),
        mes = d.getMonth() + 1,
        dia = d.getDate();

    $("#añoInicial").val(año);
    $("#mesInicial").val(mes);
    $("#diaInicial").val(dia);
}

function abrirTerceroPower() {
    var parametros = {
        Id: " 0131",
        Descripcion: "Actualizacion de terceros",
        Tipo: "POWER",
        Params: [
            {
                dll: "CONTAB\\CON110C.dll",
                formulario: "CON110C",
                Novedad: "8",
                Codigo: $('#nitCliente_421').val(),
            }
        ],
    };

    _validarVentanaMain(parametros, () => {
        validarVendedor_421('1');
    });
}