/* global $bd, Handlebars, msjProsoft, moment */
//REIMPRESION DE FACTURAS
const { inv412 } = require("../../BAR/scripts/inv412.js");

(() => {
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');
})();


$(document).ready(inicio);
var ip_servidor = '';
var sesion = '';
var usuario = '';
var actualizar ='';

var $_bar102 = [];
let formato = '';

var grupo_art_tmp = '';
var cod_art_tmp = '';
var cla_art_tmp = '';

var aprox    = '0';


function inicio(){     
    verificarSesion();
    verificaFactura(1);  
}

function verificarSesion(){
   actualizar = '';
   localStorage['keyCont'] = 1;
   sesion = localStorage['Sesion'];
   usuario = localStorage['Usuario'];   
   cont = localStorage['keyCont'];
   ip_servidor = localStorage['IP_DATOS'];

   $('#nom_usuario').html(localStorage['Nombre']);                 
}


function verificaFactura(orden) {
    $('#nro_bar102').val('');
    $('#sucur_bar102').val('');

    validarInputs(
            {
                form: '#validar_factura',
                orden: orden
            },
            function () {
                _toggleNav();
            },            
            LlamarImpresion
        )    
}



function LlamarImpresion(){            
    var nro_factura = $('#nro_bar102').val();
    nro_factura = cerosIzq(nro_factura, 6);
    var sucursal =$('#sucur_bar102').val();
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
            $_bar102.Factura = data.FACTURA;             
            //console.debug($_bar102);                                   

            data.FACTURA.CUERPO.pop();
            formato = inv412(data.FACTURA);
            mostrarFactura();

        }).catch(err => {          
            console.debug('Error al cargar la factura');  
            _toggleNav();
        })  
}

function mostrarFactura(){
    //console.debug($_bar102);
    $('#fecha_bar102').val($_bar102.Factura.ENCAFACTURA['FECFAC']);
    $('#fpago_bar102').val($_bar102.Factura.ENCAFACTURA['PAGFAC']);
    $('#plazo_bar102').val($_bar102.Factura.ENCAFACTURA['PLAFAC']);
    $('#nit_bar102').val($_bar102.Factura.ENCAFACTURA['NITFAC']);
    $('#nomid_bar102').html($_bar102.Factura.ENCAFACTURA['NOMFAC']);
    $('#vende_bar102').val($_bar102.Factura.ENCAFACTURA['VENFAC']);
    
    $('#cuerpo_tabla').html('');    
    let fuente = $('#plantilla_articulos').html();
    let plantilla = Handlebars.compile(fuente); 

    for (var i=0; i<$_bar102.Factura.CUERPO.length;i++){        
        let c = $_bar102.Factura.CUERPO[i];                            
        //console.debug(total);                                           
        var valores = {cod_art: c['CODART'].trim(), 
                       descrip_art: c['DESART'], 
                       cant_art: c['CANART'], 
                       vunit_art: c['UNIART'], 
                       impto_art: c['IVAART'],
                       porc_art: c['PORIVA'],
                       vtotal_art: c['TOTART'], 
                       item_art: i + 1
                    };
        var html = plantilla(valores);        
        $('#cuerpo_tabla').append(html);    

    };
    $('#bruto_bar102').val($_bar102.Factura.TOTALES[1]['VLRTOT']);
    $('#iva_bar102').val($_bar102.Factura.TOTALES[4]['VLRTOT']);
    $('#neto_bar102').val($_bar102.Factura.TOTALES[8]['VLRTOT']);
    
    $('#detalle_bar102').val($_bar102.Factura.PIEFACTURA['DETFAC']);
    $('#oper_bar102').val($_bar102.Factura.PIEFACTURA['OPERCRE']);
    $('#fcrea_bar102').val($_bar102.Factura.PIEFACTURA['FECHCRE']);

    Confirmar();
}

function Confirmar(){  
    CON851P('Imprimir ', this.verificaFactura, this.imprimir_bar102);          
}

function imprimir_bar102(){
    $('#div_imprimir_bar102').attr('hidden',true);
    _imprimir412(formato);
}

async function _imprimir412(formato) {
    await _impresion2({
        tipo: "pdf",
        archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS-01")}.pdf`,
        content: formato,
    })
        .then((el) => { 
            verificaFactura(1);
        })
        .catch((err) => {
            console.error(err);
            verificaFactura(1);
        });
}

function cerosIzq(obj, tam) {
    while (obj.toString().length < tam)
        obj = '0' + obj;
    return obj;
}