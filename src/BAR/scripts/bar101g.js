const { inv412 } = require("../../BAR/scripts/inv412.js");

var total_fac = 0;
var total_final = 0;
var propina = 0;
var valores = [];
var $_fac101g = [];

var client_bar101gMask = new IMask(
    document.getElementById('client_bar101g'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);
var des_fact_bar101gMask = new IMask(
    document.getElementById('des_fact_bar101g'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);
var prop_fact_bar101gMask = new IMask(
    document.getElementById('prop_fact_bar101g'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);
var efect_fact_bar101gMask = new IMask(
    document.getElementById('efect_fact_bar101g'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);
var debit_fact_bar101gMask = new IMask(
    document.getElementById('debit_fact_bar101g'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);
var tarjetaCred_fact_bar101gMask = new IMask(
    document.getElementById('tarjetaCred_fact_bar101g'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);
var credit_fact_bar101gMask = new IMask(
    document.getElementById('credit_fact_bar101g'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);
var recib_fact_bar101gMask = new IMask(
    document.getElementById('recib_fact_bar101g'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);
(() => {
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');
    _toggleF8([
        { input: 'client', app: 'bar101g', funct: _Terce_bar101g }
    ]);
    
    validarPropina();
})();

function _Terce_bar101g(e) {    
    //console.debug(e, 'evento F8')
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        for (i in $_fac101g.Terceros) {
            $_fac101g.Terceros[i]['IDENTIFICACION'] = $_fac101g.Terceros[i]['COD'];
        };
        _ventanaDatos_lite_v2({
                titulo: 'VENTANA DE TERCEROS',
                data: $_fac101g.Terceros,
                indice: ["NOMBRE", 'IDENTIFICACION', "TELEF", "CIUDAD", "ACT"],
                mascara: [{
                    "NOMBRE": 'NOMBRE',
                    "DIRREC": "DIRECCION",
                    "TELEF": "TELEFONO"
                }],
                minLength: 3,
                callback_esc: function () {
                    $("#client_bar101g").focus();
                }, callback: function (data) {
                    $("#client_bar101g").val(data.IDENTIFICACION.trim());
                    $("#nom_client_bar101g").html(data.NOMBRE);                                      
                }
            });
        }
    }
function terceros_101g() {
    obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, recibirTerceros_bar101g, 'OFF');
}

function recibirTerceros_bar101g(data){
    $_fac101g.Terceros = data.TERCEROS;
    $_fac101g.Terceros.pop();
    //console.debug($_fac101g);
}
function validarPropina(){
    terceros_101g();
    let idusunet = localStorage['IdUsunet'].trim();

    if(idusunet ==='0901522954'){
        iniciarValores('N'); 
    }else{
        CON851P("Incluir propina?", this.PropinaSin, this.PropinaCon);    
    }
}

function PropinaCon(){
    iniciarValores('S');
};
function PropinaSin(){
    iniciarValores('N');
}

function iniciarValores(p){
    total_fac = localStorage['totfac'];
    $('#vende_bar101').val(localStorage['Vendedor']);

    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });   
    var maskedValue = masked.resolve(total_fac.toString());    
    $('#tot_fact_bar101g').html(masked.value);
    
    //console.debug(masked.unmaskedValue);
    

    if (p==='S'){
        propina = parseFloat(total_fac) * 0.10
        var maskedValue = masked.resolve(propina.toString());  
        $('#prop_fact_bar101g').val(masked.value);

    }else{
        $('#prop_fact_bar101g').val(0);
    }

    $('#des_fact_bar101g').val(0);
    $('#efect_fact_bar101g').val(0);
    $('#debit_fact_bar101g').val(0);
    $('#tarjetaCred_fact_bar101g').val(0);
    $('#credit_fact_bar101g').val(0);
    $('#recib_fact_bar101g').val(0);
    $('#camb_fact_bar101g').val(0);
    $('#plazo_fact_bar101g').val(0);
    $('#suc_fact_bar101g').val(localStorage['suc']);


    valores['EFECT'] = 0;
    valores['DEBIT'] = 0;
    valores['TCRED'] = 0;
    valores['CREDI'] = 0;
    valores['DSCTO'] = 0;
    valores['PROP']  = 0;
    valores['RECIB']  = 0;
    valores['CAMBIO']  = 0;
    valores['PLAZO']  = 0;
    valores['SUC']  = localStorage['suc'];
    //console.debug(total_fac);
    validarValores(1);
}

function validarValores(orden) {    
    validarInputs(
        {
            form: '#validar_valores',
            orden: orden
        },
        function () {
            reiniciarMesa;
        },            
        calcularPropina
    )
}

function calcularDcto(){    
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });   
           
    valores['DSCTO'] = parseFloat(des_fact_bar101gMask.unmaskedValue);
    valores['PROP'] = parseFloat(prop_fact_bar101gMask.unmaskedValue);

    total_final = parseFloat(total_fac) + parseFloat(valores['PROP']) - parseFloat(valores['DSCTO']);
    console.debug(total_fac, valores['DSCTO'], valores['PROP']);
    var maskedValue = masked.resolve(total_final.toString());     
    $('#tot_final_bar101g').html(masked.value);      
    $('#efect_fact_bar101g').val(masked.value);
     
    //console.debug(valores);
}

function calcularPropina(){
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });   
    valores['PROP'] = parseFloat(prop_fact_bar101gMask.unmaskedValue);    
    valores['DSCTO'] = parseFloat(des_fact_bar101gMask.unmaskedValue);
    
    total_final = parseFloat(total_fac) + parseFloat(valores['PROP']) - parseFloat(valores['DSCTO']);
    console.debug(total_fac, valores['DSCTO'], valores['PROP']);
    var maskedValue = masked.resolve(total_final.toString());
    $('#tot_final_bar101g').html(masked.value);
    $('#efect_fact_bar101g').val(masked.value);  
    validarPagos(1);
}

function validarPagos(orden) {    
    validarInputs(
        {
            form: '#validar_efectivo',
            orden: orden
        },
        function () {
            validarValores(2);
        },        
        calcularEfectivo
    )
}

function calcularEfectivo(){
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });   
    valores['EFECT'] = parseFloat(efect_fact_bar101gMask.unmaskedValue);             
    if (parseFloat(valores['EFECT'])===parseFloat(total_final)){
        validarCambio(1);
    }else{
        valores['DEBIT'] = parseFloat(total_final) - parseFloat(valores['EFECT']);
        var maskedValue = masked.resolve( valores['DEBIT'].toString());
        $('#debit_fact_bar101g').val(masked.value);
        validarDebito(1);
    }
}

function validarCambio(orden) {    
    validarInputs(
        {
            form: '#validar_cambio',
            orden: orden
        },
        function () {
            validarPagos(1);
        },
        calcularCambio
    )
}

function calcularCambio(){    
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });   
    valores['RECIB'] = parseFloat(recib_fact_bar101gMask.unmaskedValue);
    valores['CAMBIO'] = parseFloat(valores['RECIB']) - parseFloat(total_final);
     
    var maskedValue = masked.resolve( valores['CAMBIO'].toString());
    $('#camb_fact_bar101g').val(masked.value);    
    verificaTercero(1);
}

function validarDebito(orden) {    
    validarInputs(
        {
            form: '#validar_debito',
            orden: orden
        },
        function () {
            valores['DEBIT'] = 0;
            $('#debit_fact_bar101g').val(valores['DEBIT']);
            validarPagos(1);
        },
        calcularDebito
    )
}

function calcularDebito(){
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });   
    valores['DEBIT'] = parseFloat(debit_fact_bar101gMask.unmaskedValue);    
    let suma = valores['DEBIT'] + valores['EFECT'];
    if(parseFloat(suma)===parseFloat(total_final)){
        verificaTercero(1);
    }else{
        valores['TCRED'] = parseFloat(total_final) - parseFloat(valores['DEBIT']) - parseFloat(valores['EFECT']);
        var maskedValue = masked.resolve( valores['TCRED'].toString());
        $('#tarjetaCred_fact_bar101g').val(masked.value);
        validarTCredito(1);
    }
}

function validarTCredito(orden) {    
    validarInputs(
        {
            form: '#validar_tcredito',
            orden: orden
        },
        function () {
            valores['TCRED'] = 0;
            $('#tarjetaCred_fact_bar101g').val(valores['TCRED']);
            validarDebito(1);
        },
        calcularTCredito
    )
}

function calcularTCredito(){    
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });   
    valores['TCRED'] = parseFloat(tarjetaCred_fact_bar101gMask.unmaskedValue);
    let suma = parseFloat(valores['TCRED']) + parseFloat(valores['DEBIT']) + parseFloat(valores['EFECT']);
    if(parseFloat(suma)===parseFloat(total_final)){
        verificaTercero(1);
    }else{
        valores['CREDI'] = parseFloat(total_final) - parseFloat(suma);
        var maskedValue = masked.resolve( valores['CREDI'].toString());
        $('#credit_fact_bar101g').val(masked.value);
        validarCredito(1);
    }
}

function validarCredito(orden) {    
    validarInputs(
        {
            form: '#validar_credito',
            orden: orden
        },
        function () {
            valores['CREDI'] = 0;
            $('#credit_fact_bar101g').val(valores['CREDI']);
            validarTCredito(1);
        },
        calcularCredito
    )
}

function calcularCredito(){    
    valores['CREDI'] = parseFloat(credit_fact_bar101gMask.unmaskedValue);
    let suma = parseFloat(valores['TCRED']) + parseFloat(valores['DEBIT']) + parseFloat(valores['CREDI'] + parseFloat(valores['EFECT']));
    if(parseFloat(suma)===parseFloat(total_final)){
        verificaTercero(1);
    }else{
        validarTCredito(1);
    }
}

function verificaTercero(orden) {
    validarInputs(
            {
                form: '#fase_cliente',
                orden: orden
            },
            function () {
                valores['EFECT'] = total_final;
                valores['DEBIT'] = 0;
                valores['TCRED'] = 0;
                valores['CREDI'] = 0;
                $('#efect_fact_bar101g').val(valores['EFECT']);
                $('#tarjetaCred_fact_bar101g').val(valores['TCRED']);
                $('#credit_fact_bar101g').val(valores['CREDI']);
                validarPagos(1);
            },            
            _validarTercero
        )    
}

function _validarTercero() {    
    var tercero = parseFloat(client_bar101gMask.unmaskedValue);    
    var validacion = buscarTercero(tercero);
    //console.debug(validacion);
    if (validacion) {
        var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });   
        var maskedValue = masked.resolve( validacion.COD.toString());
        $('#client_bar101g').val(masked.value);
        $('#nom_client_bar101g').html(validacion.NOMBRE);
        if(valores['CREDI'] > 0){
           verificaPlazo(1);
        }else{
        verificaObserv(1);
        }

    } else {
        $('#client_bar101g').val('');
        plantillaError('01', '01', 'BAR101G', function () {
            verificaTercero(1);
        });
    }
}

function buscarTercero(codigo) {
    var retornar = false;        
        for (var i in $_fac101g.Terceros) {
        let code = $_fac101g.Terceros[i].COD;        
        if (code == codigo) {
            retornar = $_fac101g.Terceros[i];
            //console.debug(retornar);
            break;
        }
    }

    return retornar;
}
function verificaPlazo(orden) {
    validarInputs(
            {
                form: '#fase_plazo',
                orden: orden
            },
            function () {
                verificaTercero(1);
            },            
            function () {
                verificaObserv(1);
            }
        )    
}

function verificaObserv(orden) {
    if($('#plazo_fact_bar101').val() === ''){
        $('#plazo_fact_bar101').val('0');
    }
    validarInputs(
            {
                form: '#fase_observ',
                orden: orden
            },
            function () {
                verificaTercero(1);
            },            
            function () {
                verificaSucursal(1);
            }
        )    
}

function verificaSucursal(orden) {
    validarInputs(
            {
                form: '#fase_sucursal',
                orden: orden
            },
            function () {
                verificaObserv(1);
            },            
            Confirmar
        )    
}
function Confirmar(){    
    if($('#suc_fact_bar101').val() === ''){
        $('#suc_fact_bar101').val('0');
    }
    CON850_P(function (e) {
        if (e.id == 'S') {
            grabarFactura();
        } else {
            verificaObserv(1);
        }
    }, {})
}

function grabarFactura(){
    valores['PLAZO'] = parseFloat($('#plazo_fact_bar101g').val());
    valores['SUC'] = parseFloat($('#suc_fact_bar101g').val());

    var nit = client_bar101gMask.unmaskedValue;
        nit = cerosIzq(nit, 10);
    var efectivo = valores['EFECT'].toString();
        efectivo = cerosIzq(efectivo,12);
    var debito = valores['DEBIT'].toString();
        debito = cerosIzq(debito,12);
    var tcredito = valores['TCRED'].toString();
        tcredito = cerosIzq(tcredito,12);
    var credito = valores['CREDI'].toString();
        credito = cerosIzq(credito,12);
    var descuento = valores['DSCTO'].toString();
        descuento = cerosIzq(descuento,12);
    var propina = valores['PROP'].toString();
        propina = cerosIzq(propina,12);
    var recibo = valores['RECIB'].toString();
        recibo = cerosIzq(recibo,12);
    var cambio = valores['CAMBIO'].toString();
        cambio = cerosIzq(cambio,12);
    
    var plazo = valores['PLAZO'].toString();
        plazo = cerosIzq(plazo,3);
    var sucursal =valores['SUC'].toString();
        sucursal = cerosIzq(sucursal,2);
    //console.debug(plazo,sucursal);
        var data = {};
    var dato_envio = datosEnvio()
                    + localStorage['Usuario']
                    + '|'
                    + mesa_origen
                    + '|'
                    + vendedor
                    + '|'
                    + nit
                    + '|'
                    + $('#observ_fact_bar101g').val()
                    + '|'
                    + efectivo
                    + '|'
                    + debito
                    + '|'
                    + tcredito
                    + '|'
                    + credito
                    + '|'
                    + descuento
                    + '|'
                    + propina
                    + '|'
                    + recibo
                    + '|'
                    + cambio
                    + '|'
                    + plazo 
                    + '|'
                    + sucursal;

        data.datosh = dato_envio;
        console.debug(data.datosh);
        postData(data, get_url("app/BAR/CAJ101FG.DLL"))
        .then(data => {       
            //console.debug(data);                  
            LlamarImpresion(data);            
        }).catch(err => {          
            console.debug('Error al grabar', data);  
            _toggleNav();
        })  
}

function LlamarImpresion(numero){            
    var nro_factura = numero;
    nro_factura = cerosIzq(nro_factura, 6);
    var sucursal =valores['SUC'].toString();
        sucursal = cerosIzq(sucursal,2);

    //console.debug(nro_factura);
    var data = {};    
    var dato_envio = datosEnvio()
                    + localStorage['Usuario']
                    + '|'
                    + nro_factura
                    + '|'
                    + sucursal;

        data.datosh = dato_envio;
        //console.debug(data);
        postData(data, get_url("app/BAR/INV412.DLL"))
        .then(data => {   
            $_fac101g.Factura = data.FACTURA;             
            console.debug($_fac101g);                                   

            data.FACTURA.CUERPO.pop();
            let formato = inv412(data.FACTURA)
            _imprimir412(formato)

        }).catch(err => {          
            console.debug('Error al imprimir');  
            _toggleNav();
        })  
}


async function _imprimir412(formato) {
    await _impresion2({
        tipo: "pdf",
        archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS-01")}.pdf`,
        content: formato,
    })
        .then((el) => { 
            reiniciarMesa();
        })
        .catch((err) => {
            console.error(err);
            reiniciarMesa();
        });
}
