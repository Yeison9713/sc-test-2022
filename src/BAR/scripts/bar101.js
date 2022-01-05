/* global $bd, Handlebars, msjProsoft, moment */
//CARGA DE JSON DE MESAS OCUPADAS O VACIAS, PREPARACION PARA INICIO DE FACTURA
(() => {
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');
})();

function _Vende_bar101(e) {
    //console.log(e.which)
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE VENDEDOR',
            columnas: ["CUENTA", "NOMBRE"],
            data: $_bar101.Vendedores,
            ancho: '60%',
            callback_esc: function () {
                $('#vende_bar101').focus()
            },
            callback: function (data) {
                //console.debug(data);
                $('#vende_bar101').val(data.CUENTA.trim())
                $('#nomvende_bar101').html(data.NOMBRE.trim())
                _enterInput('#vende_bar101');                
            }
        });
    }
}

function _Articulos_bar101(e) {
    //console.log(e.which)
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE ARTICULOS',
            columnas: ["GRPART", "NROART", "CLAART", "DESCRIP", "CODBARR"],
            data: $_bar101.Articulos,
            ancho: '60%',
            callback_esc: function () {
                validarVende(1)
            },
            callback: function (data) {
                //console.debug(data);
                tipo_guardar = 1;
                $('#titulo_modal3').html(data.DESCRIP);
                grupo_art_tmp = data.GRPART;
                cod_art_tmp   = data.NROART;
                cla_art_tmp   = data.CLAART;
                $('#cant_articulo_bar101').val(1);
                $('#obs_articulo_bar101').val('');
                $('#bar101_modal3').click();
                ventanaModificar(1);
            }
        });
    }
}

$(document).ready(inicio);
var ip_servidor = '';
var sesion = '';
var usuario = '';
var actualizar ='';
var tipo_guardar = 0;

var $_bar101 = [];
var $_fac101 = [];
var ren_tem  = [];

var opcionModificar = 0;
var llave_mesa = '';
var mesa_destino = '';
var mesa_origen = '';
var posicion = 0;
var posicion2 = 0;
var cont = '';
var item = '30';
var anoActual = '';
var consulta_usuario = '';
var cantidad = 0;
var grupo_art_tmp = '';
var cod_art_tmp = '';
var cla_art_tmp = '';
var cant_art_tmp = 0;
var obs_art_tmp = '';
var vendedor = '';
var suc_tmp  = '0';
var aprox    = '0';
var total_fac = 0;
var descrip_art_tmp = '';

function inicio(){     
    verificarSesion();
    vendedor_101();
    _toggleF8([
        { input: 'vende', app: 'bar101', funct: _Vende_bar101 },
        { input: 'buscar', app: 'bar101', funct: _Articulos_bar101 },
    ]);    
}

function verificarSesion(){
   actualizar = '';
   localStorage['keyCont'] = 1;
   sesion = localStorage['Sesion'];
   usuario = localStorage['Usuario'];   
   cont = localStorage['keyCont'];
   ip_servidor = localStorage['IP_DATOS'];

   $('#nom_usuario').html(localStorage['Nombre']);
   //item = localStorage['keyItem'];

   //if (localStorage['keyActualizar'] !==''){
   //   actualizar = localStorage['keyActualizar'];
   //   var flocal = localStorage['keyActualizar'].split(' / ');
   //   var fanterior = flocal[0]+" "+flocal[1];
   //   var fechaAnterior = moment(fanterior,"YYYY-DD-MM HH:mm:ss");
   //   var diff = moment().diff(fechaAnterior, 'seconds');
   //   if (diff>10){
   //      setTimeout('dllActualizar(2)',800);
   //   }
   //}                     
}

function vendedor_101(){
    loader("show");
    obtenerDatosCompletos({ nombreFd: 'VENDEDOR' }, recibirVendedor_bar101, 'OFF');
}

function recibirVendedor_bar101(data){
    $_bar101.Vendedores = data.VENDEDOR;
    $_bar101.Vendedores.pop()        
    ambientes_101();
}

function ambientes_101() {
    postData({ datosh: datosEnvio() }, get_url("app/BAR/CAJ002A.DLL"))
        .then(data => {                    
            $_bar101.Ambientes = data.AMBIENTES;
            $_bar101.Ambientes.pop()     
            mesas_101();        
        }).catch(err => {          
            _toggleNav();
        })
             
}

function mesas_101(){
    postData({ datosh: datosEnvio() }, get_url("app/BAR/CAJ002B.DLL"))
        .then(data => {                    
            $_bar101.Mesas = data.MESAS;
            $_bar101.Mesas.pop()     
            cargueAmbientes();       
        }).catch(err => {          
            _toggleNav();
        })
}

function cargueAmbientes(){   
    //console.debug($_bar101); 
    $('#cuerpo_menu').html('');
    var fuente = $('#plantilla_ambientes').html();
    var plantilla = Handlebars.compile(fuente);    
    for ($i=0; $i<$_bar101.Ambientes.length;$i++){
        var c = $_bar101.Ambientes[$i];        
        var valores = {cod_amb: c['ID'].trim(), nom_amb: c['DESCRIP'] };
        var html = plantilla(valores);        
        $('#cuerpo_menu').append(html);        
    };
    cargueMesas();
}

function cargueMesas(){        
    $('#Ambiente_'+vlrAmbiente).html('');
    for (var i=0; i<$_bar101.Ambientes.length;i++){
        var c = $_bar101.Ambientes[i];
        var vlrAmbiente = c['ID'].trim();
        $($_bar101.Mesas).each(function(k,v){
            if (vlrAmbiente === v['AMB']){            
                var fuente = $('#plantilla_mesas').html();
                var plantilla = Handlebars.compile(fuente);
                var valores = {
                    id_num: k,
                    num_amb: v['AMB'],
                    cod_mesa:v['ID']
                };
                var html = plantilla(valores);
                $('#Ambiente_'+vlrAmbiente).append(html);
                if (v['ESTADO'].trim()==='O'){
                    $('#mesa_'+v['ID']).attr('title','Ocupado');
                    $('#mesa_'+v['ID']).removeAttr('style',true);
                    $('#btnmesa_'+v['ID']).addClass('red');
                }
                if (v['ESTADO'].trim()==='R'){
                    $('#mesa_'+v['ID']).attr('title','Reservada');
                    $('#btnmesa_'+v['ID']).addClass('yellow');
                    $('#btnmesa_'+v['ID']).attr('disabled',true);
                }
                if (v['ESTADO'].trim()==='A'){
                    $('#mesa_'+v['ID']).attr('title','Disponible');
                    $('#borrar_'+k+'_'+v['AMB']+'_'+v['ID']).remove('');
                    $('#factura_'+k+'_'+v['AMB']+'_'+v['ID']).remove('');
                    $('#cambiar_'+k+'_'+v['AMB']+'_'+v['ID']).remove('');
                }
                if (v['ESTADO'].trim()==='M'){
                    $('#mesa_'+v['ID']).attr('title','Mantenimiento');                  
                    $('#btnmesa_'+v['ID']).addClass('grey-cascade');
                    $('#btnmesa_'+v['ID']).attr('disabled',true);
                }            
            }
        });
    }
    cargueGrupos();
}
//cargar archivo de grupos
function cargueGrupos() {
    postData({ datosh: datosEnvio() }, get_url("app/BAR/CAJ002C.DLL"))
        .then(data => {                    
            $_bar101.Grupos = data.GRUPOS;
            $_bar101.Grupos.pop()     
            cargueArticulos();        
        }).catch(err => {          
            _toggleNav();
        })
             
}
//cargar archivo de articulos
function cargueArticulos(){
    postData({ datosh: datosEnvio() }, get_url("app/BAR/CAJ002D.DLL"))
        .then(data => {                    
            $_bar101.Articulos = data.ARTIC;
            $_bar101.Articulos.pop()  
            //console.debug($_bar101);   
            inicio2();        
        }).catch(err => {          
            _toggleNav();
        })
    }


function inicio2(){
    loader("hide");       
}

function alistarFacTmp(id){
    var d = id.split('_');
    mesa_origen = d[2]+d[3];
    localStorage['MesaOrigen'] = mesa_origen;
    $('#mesa_sel').html(mesa_origen);
    mostrarFacTmp(1);
}
//borrar contenido mesas
function dllBorrar(id){    
    c = id.split('_');
    llave_mesa = c[2]+c[3];
    CON851P('Seguro que desea eliminar la mesa ' + llave_mesa + '?', inicio2(), verificacionBorrar());    
}

function verificacionBorrar(){
    $('#verificar').unbind('click');  
    var operador = localStorage['Usuario'];
    var dato_envio  = llave_mesa;
        dato_envio += "|";
        dato_envio += operador;
        dato_envio += "|";
        
    postData({ datosh: datosEnvio()+dato_envio}, get_url("app/BAR/caj101B.DLL"))
        .then(data => {                                
            ambientes_101();       
        }).catch(err => {          
            _toggleNav();
        })
    
}
//cambiar de una mesa a otra
function seleccionarMesa(id){
    var d = id.split('_');
    mesa_origen = d[2]+d[3];
    localStorage['MesaOrigen'] = mesa_origen;
    $('#mesa_sel').html(mesa_origen);
    $('#selector').removeClass('hidden',true);
    $('#text').addClass('hidden',true);
    $('#opcion_zonas').html('');
    var fuente2 = '<option id="Ambiente_{{id_zona}}_{{id_mesa}}">{{id_zona}}{{id_mesa}}</option>';
    var plantillaZona = Handlebars.compile(fuente2);
    for (i=0; i<$_bar101.Mesas.length;i++){
        c = $_bar101.Mesas[i];
        var mesas = c['AMP']+c['ID'];
        if (c['ESTADO']!=='M' && localStorage['MesaOrigen']!==mesas){
            var valores = {id_zona: c['AMB'].trim(),id_mesa:c['ID']};
            var html = plantillaZona(valores);
            $('#opcion_zonas').append(html);
        }
    }
    $('#title_modal2').text(' Selecione mesa a cambiar');
    $('#bar101_modal2').click();
    $('#verificar').click(dllCambiarMesa);
}
function dllCambiarMesa(){    
    var operador = localStorage['Usuario'];
    var dato_envio  = mesa_origen;
        dato_envio += "|";
        dato_envio += $('select[id=opcion_zonas]').val()
        dato_envio += "|";
        dato_envio += operador;
        dato_envio += "|";

        postData({ datosh: datosEnvio()+dato_envio}, get_url("app/BAR/caj101C.DLL"))
        .then(data => {                    
            ambientes_101();       
        }).catch(err => {          
            _toggleNav();
        })        
}
//modificar mesa
function dllModificar(id){
    var operador = localStorage['Usuario'];
    var d = id.split('_');
    mesa_origen = d[2]+d[3];
    localStorage['MesaOrigen'] = mesa_origen;
    $('#mesa_sel').html(mesa_origen);
    
    var dato_envio  = mesa_origen;
        dato_envio += "|";
        dato_envio += operador;
        dato_envio += "|";
    //console.debug(dato_envio);
    postData({ datosh: datosEnvio()+dato_envio}, get_url("app/BAR/CAJ101M.DLL"))
        .then(data => { 
            loader("show");  
            console.debug(data); 
            if(data == 'MESA OCUPADA'){                 
                montarTemporal();                 
            }else{
                montarGrupos();
            }
        }).catch(err => { 
            console.debug('error ojo');         
            _toggleNav();
        })   
        verificar_busqueda(1);
}

// monta la factura temporal que ya existe
function montarTemporal(){    
    var dato_envio = localStorage['Usuario']
                   + '|'
                   + localStorage['MesaOrigen'];                   
    //console.debug(dato_envio);    
    postData({datosh: datosEnvio()+dato_envio}, get_url("app/BAR/CAJ101L.DLL"))
      .then(data => {              
        ren_tem = data.RENGL;
        ren_tem.pop();          
        suc_tmp = ren_tem[0]['SUCUR'];         
        for ($i=0; $i<$_bar101.Vendedores.length;$i++){
            if($_bar101.Vendedores[$i]['CUENTA'].trim() === ren_tem[0]['VENDE'].trim()){
                $('#vende_bar101').val($_bar101.Vendedores[$i]['CUENTA'].trim());
                $('#nomvende_bar101').html($_bar101.Vendedores[$i]['NOMBRE'].trim())
            }
        }                  
        for ($i=0; $i<ren_tem.length;$i++){
            let renglon = {};
            renglon['GRU_ART']  = ren_tem[$i]['GRUART'].trim();
            renglon['COD_ART']  = ren_tem[$i]['CODART'].trim();
            renglon['CLA_ART']  = ren_tem[$i]['CLAART'].trim();
            renglon['CANT_ART'] = ren_tem[$i]['CANFAC'];
            renglon['OBS_ART']  = ren_tem[$i]['OBSFAC'];
            $_fac101.push(renglon);
        } 
        //console.debug(ren_tem, suc_tmp);
        //console.debug($_fac101);
        montarGrupos();  
      }).catch(err => {          
         console.debug('Error al cargar temporal');  
        _toggleNav();
    })               
}

// montar grupos en el cuerpo
function montarGrupos(){    
    $('#cuerpo_menu').html('');
    var fuente = $('#plantilla_grupos').html();
    var plantilla = Handlebars.compile(fuente);    
    for ($i=0; $i<$_bar101.Grupos.length;$i++){
        var c = $_bar101.Grupos[$i];        
        var valores = {cod_grp: c['COD'].trim(), nom_grp: c['DESCRIP'] };
        var html = plantilla(valores);        
        $('#cuerpo_menu').append(html);        
    };
    setTimeout('montarArticulos()',1000);
    
}

//montar articulos en cada grupo
function montarArticulos(){
    //$('#grupo_'+vlrgrp).html('');
    //console.debug($_bar101);
    for (var i=0; i<$_bar101.Grupos.length;i++){
        var c = $_bar101.Grupos[i];
        var vlrgrp = c['COD'].trim();
        $($_bar101.Articulos).each(function(k,v){            
            if (vlrgrp === v['GRPART'].trim()){  
                var llave_art = v['GRPART']+v['NROART']+v['CLAART'];
                var fuente = $('#plantilla_articulos').html();
                var plantilla = Handlebars.compile(fuente);
                var valores = {
                    cod_art: llave_art,
                    grp_art: v['GRPART'],
                    nro_art: v['NROART'],
                    cla_art: v['CLAART'],
                    nom_art: v['DESCRIP'],
                    vlr_art: v['VLRART']
                };
                var html = plantilla(valores);
                $('#grupo_'+vlrgrp).append(html);                
            }
        });
    }
    gestionArticulos();
}

function gestionArticulos(){
    loader("hide");
    $('#botones_menu').attr('hidden', false);
    $('#btn_salir').attr('disabled', true);
    $('#titulo_mesa').html('MESA: '+mesa_origen);
    $('button[id^=btnart_]').click(modalArticulo);
    $('#vende_bar101').removeAttr('hidden', true);
    validarVende(1);
    //$('#agregar_modal3').click(elegirArticulo);
    //$('#btn_facturar').click(grabarTemporal(1));
    //$('#btn_volver').click(reiniciarMesa);
}

function validarVende(orden) {
    let vende = localStorage['Vendedor'].trim();
    let idusunet = localStorage['IdUsunet'].trim();

    if(idusunet ==='0901522954'){
        $('#vende_bar101').val(vende);
        _RevisarVende_bar101();
    }else{    
        validarInputs(
            {
                form: '#validar_vendedor',
                orden: orden
            },
            $('#vende_bar101').focus(),
            //_Vende_bar101
            _RevisarVende_bar101
        )
    };
}

function _RevisarVende_bar101(){   
    //console.debug('aca');
    var vende = $('#vende_bar101').val();    
        vende = vende.toUpperCase();
    //console.debug( $_bar101.Vendedores);
    var valida_vende = buscarVendedor(vende);
    //console.debug(valida_vende);
    if (valida_vende) {
        $('#vende_bar101').val(valida_vende.CUENTA)
        $('#nomvende_bar101').html(valida_vende.NOMBRE)
        verificar_busqueda(1);  
    }else{
        $('#vende_bar101').focus();
    }   
}

function buscarVendedor(v){
    var retornar = false;        
    for (var i in $_bar101.Vendedores) {
        let code = $_bar101.Vendedores[i].CUENTA; 
        //console.debug(code, v);       
        if (code == v) {
            retornar = $_bar101.Vendedores[i];
            //console.debug(retornar);
            break;
        };
    };
    return retornar;
}

function verificar_busqueda(orden) {
    validarInputs(
        {
            form: '#botones_menu',
            orden: orden
        },
        function () {
            validarVende(1);
        },
        _RevisarArtic_bar101
    )
}

function _RevisarArtic_bar101(){   
    var artic = $('#buscar_bar101').val();    
        artic = artic.toUpperCase();
        artic = cerosIzq(artic, 15);
    //console.debug( $_bar101.Vendedores);
    var valida_artic = buscarArticulo(artic);
    //console.debug(valida_vende);
    if (valida_artic) {
        tipo_guardar = 1;
        $('#titulo_modal3').html(valida_artic.DESCRIP);
        grupo_art_tmp = valida_artic.GRPART;
        cod_art_tmp   = valida_artic.NROART;
        cla_art_tmp   = valida_artic.CLAART;
        $('#cant_articulo_bar101').val(1);
        $('#obs_articulo_bar101').val('');
        $('#bar101_modal3').click();
        ventanaModificar(1);  
    }else{
        $('#buscar_bar101').focus();
    }   
}

function buscarArticulo(v){
    var retornar = false;        
    for (var i in $_bar101.Articulos) {
        let code = $_bar101.Articulos[i].CODBARR; 
        //console.debug(code, v);       
        if (code == v) {
            retornar = $_bar101.Articulos[i];
            //console.debug(retornar);
            break;
        };
    };
    return retornar;
}

//ventana para agregar el articulo
function modalArticulo(){
    var art = $(this).attr('id').split('_');
    //console.debug(art);
    $('#grupo_'+art[1]).removeClass('in');
    $('#acordeon_'+art[1]).addClass('collapsed');
    for (var i=0; i<$_bar101.Articulos.length;i++){    
        if($_bar101.Articulos[i].GRPART ===art[1] && $_bar101.Articulos[i].NROART===art[2] && $_bar101.Articulos[i].CLAART===art[3]){
            tipo_guardar = 1;
            $('#titulo_modal3').html($_bar101.Articulos[i].DESCRIP);
            grupo_art_tmp = $_bar101.Articulos[i].GRPART;
            cod_art_tmp   = $_bar101.Articulos[i].NROART;
            cla_art_tmp   = $_bar101.Articulos[i].CLAART;
            $('#cant_articulo_bar101').val(1);
            $('#obs_articulo_bar101').val('');
            $('#bar101_modal3').click();
            ventanaModificar(1);
        }
    }                
}

function elegirArticulo(){
    //console.debug(cod_art_tmp,grupo_art_tmp,cla_art_tmp);
    descrip_art_tmp = $('#titulo_modal3').html();
    if($('#cant_articulo_bar101').val()< 1){
        console.debug('error de cantidad');
    }else{
        cant_art_tmp = $('#cant_articulo_bar101').val();
        obs_art_tmp  = $('#obs_articulo_bar101').val();
        if (tipo_guardar === 1){
            agregarArticuloTemporal();
        }else{
            modificarItemTabla();
        }
    }
}

//agregar articulos en un arreglo temporal
function agregarArticuloTemporal(){
    let renglon = {};
    renglon['GRU_ART']  = grupo_art_tmp;
    renglon['COD_ART']  = cod_art_tmp;
    renglon['CLA_ART']  = cla_art_tmp;
    renglon['CANT_ART'] = cant_art_tmp;
    renglon['OBS_ART']  = obs_art_tmp;
    $_fac101.push(renglon);
    CON851("", "Agregado el articulo con exito", "", "success", descrip_art_tmp);
    verificar_busqueda(1);
    //console.debug($_fac101);     
};

//graba el arreglo temporal en el archivo
function grabarTemporal(tipo,paso){    
    var t = tipo;
    var p = paso;
    //console.debug(tipo,paso);
    var data = {},
        linea ='',
        existe = 0,
        vendedor = $('#vende_bar101').val();
    for ($i=0; $i<$_bar101.Vendedores.length;$i++){
        if($_bar101.Vendedores[$i]['CUENTA']===vendedor){
            existe++;
        }
    }            
    if (existe > 0){
        for (var i=0; i<$_fac101.length;i++){
            linea = $_fac101[i].GRU_ART
                + "|" 
                + $_fac101[i].COD_ART 
                + "|" 
                + $_fac101[i].CLA_ART 
                + "|" 
                + $_fac101[i].CANT_ART 
                + "|" 
                + $_fac101[i].OBS_ART 
                + "|"; 
            var num = i + 1;
                num = cerosIzq(num, 3)
            //console.debug(num);
            data['TBL-' + num] = linea;
        }
        
        var dato_envio = datosEnvio()
                    + localStorage['Usuario']
                    + '|'
                    + mesa_origen
                    + '|'
                    + vendedor;
        data.datosh = dato_envio;
        //console.debug(data);
        postData(data, get_url("app/BAR/CAJ101G.DLL"))
        .then(data => {     
            if(p === 2){               
                PrepararGuardarFac();
            }else{
                mostrarFacTmp(t);
            }
            //console.debug('adentro');
        }).catch(err => {          
            console.debug('Error grabar');  
            _toggleNav();
        })  
    }else{
        CON851("", "El Vendedor no es valido!", "", "error", "");
    }
    
}

function mostrarFacTmp(tipo){
    //console.debug('aca' + mesa_origen);   
    //console.debug(tipo);
    if (tipo === 1){ 
        $('#mesa_sel').html(mesa_origen);
        $('#cuerpo_menu').html('');
        $('#botones_menu').attr('hidden',true)
        $('#cuerpo_menu').load('../../BAR/paginas/BAR101F.html');
        carguefacturatmp_101t();    
    }else{
        reiniciarMesa();
    }
};

function carguefacturatmp_101t() {      
    var dato_envio = localStorage['Usuario']
                   + '|'
                   + localStorage['MesaOrigen'];                   
    //console.debug(dato_envio);    
    postData({datosh: datosEnvio()+dato_envio}, get_url("app/BAR/CAJ101L.DLL"))
      .then(data => {      
        $_bar101.Renglon = data.RENGL;
        $_bar101.Renglon.pop();                
        suc_tmp = $_bar101.Renglon[0]['SUCUR'];    
        aprox   = $_bar101.Renglon[0]['APROX'];    
        for ($i=0; $i<$_bar101.Vendedores.length;$i++){            
            if($_bar101.Vendedores[$i]['CUENTA'].trim() === $_bar101.Renglon[0]['VENDE'].trim()){
                $('#vende_bar101').val($_bar101.Vendedores[$i]['CUENTA'].trim());
                $('#nomvende_bar101').html($_bar101.Vendedores[$i]['NOMBRE'].trim())
            }
        }                         
            //console.debug($_bar101);
            mostrarTablaFacTmp(); 
      }).catch(err => {          
         console.debug('Error cargar temporal');  
        _toggleNav();
    })               
};

function mostrarTablaFacTmp(){       
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });   
    $('#cuerpo_tabla').html('');    
    let fuente = $('#plantilla_articulos').html();
    let plantilla = Handlebars.compile(fuente); 
    total_fac = 0;  
    console.debug($_bar101); 
    for ($i=0; $i<$_bar101.Renglon.length;$i++){
        if($_bar101.Renglon[$i]['IVAFAC']=='') {$_bar101.Renglon[$i]['IVAFAC']=0; }
        if($_bar101.Renglon[$i]['CANFAC']=='') {$_bar101.Renglon[$i]['CANFAC']=0; }
        if($_bar101.Renglon[$i]['UNIFAC']=='') {$_bar101.Renglon[$i]['UNIFAC']=0; }
        let c = $_bar101.Renglon[$i];                
        var total = (parseFloat(c['CANFAC']) *  parseFloat(c['UNIFAC'])) + parseFloat(c['IVAFAC']);  
        console.debug(total, aprox)
        switch(aprox) {
            case '2':
              total = Math.round(total / 10) * 10;
              break;
            case '3':
              total = Math.round(total / 100) * 100;
              break;
            case '4':                
              total = Math.round(total / 1000) * 1000;
              break;
            default:
              break;              
        }     
        console.debug(total);
        total_fac = parseFloat(total_fac) + parseFloat(total);         
        var valores = {cod_art: c['GRUART'].trim()+c['CODART'].trim()+c['CLAART'].trim(), 
                       descrip_art: c['DESCRIP'], 
                       cant_art: c['CANFAC'], 
                       vunit_art: c['UNIFAC'],
                       impto_art: c['IVAFAC'],
                       porc_art: c['PORCEN'],
                       vtotal_art:  total,
                       obs_art: c['OBSFAC'],
                       item_art:$i + 1};
        var html = plantilla(valores);        
        $('#cuerpo_tabla').append(html);        
    }; 
    var maskedValue = masked.resolve(total_fac.toString());  
    $('#tot_fact_bar101f').html('$'+masked.value);
    //console.debug(total_fac);   
};

//agregar la tabla en un arreglo temporal para volver a grabar
function agregarTablaRegrabar(paso){        
    $_fac101 = [];
    for ($i=0; $i<$_bar101.Renglon.length;$i++){
        let renglon = {};
        renglon['GRU_ART']  = $_bar101.Renglon[$i]['GRUART'];
        renglon['COD_ART']  = $_bar101.Renglon[$i]['CODART'];
        renglon['CLA_ART']  = $_bar101.Renglon[$i]['CLAART'];
        renglon['CANT_ART'] = $_bar101.Renglon[$i]['CANFAC'];
        renglon['OBS_ART']  = $_bar101.Renglon[$i]['OBSFAC'];
        $_fac101.push(renglon);        
    }        
    //console.debug($_fac101); 
    grabarTemporal(2,paso);    
};

function borrar_item(id){
    let item = id.split('_');
    let i = item[1] - 1
    $_bar101.Renglon.splice(i,1);
    mostrarTablaFacTmp();
    //console.debug($_bar101.Renglon, i);
}

function modificar_item(id){
    let item = id.split('_');
    let i = item[1] - 1    
    $('#titulo_modal3').html($('#descrip_'+item[1]).html());
    grupo_art_tmp = $_bar101.Renglon[i]['GRUART'];
    cod_art_tmp = $_bar101.Renglon[i]['CODART'];
    cla_art_tmp = $_bar101.Renglon[i]['CLAART'];
    $('#cant_articulo_bar101').val($_bar101.Renglon[i]['CANFAC']);
    $('#obs_articulo_bar101').val($_bar101.Renglon[i]['OBSFAC']);
    $('#bar101_modal3').click();
    tipo_guardar = 2;
    ventanaModificar(1);
}

function ventanaModificar(orden) {
    validarInputs(
            {
                form: '#modal3',
                orden: orden
            },
            function () {
                verificar_busqueda(1);
            },            
            elegirArticulo
        )    
}

function modificarItemTabla(){
    let renglon = {};
    renglon['GRU_ART']  = grupo_art_tmp;
    renglon['COD_ART']  = cod_art_tmp;
    renglon['CLA_ART']  = cla_art_tmp;
    renglon['CANT_ART'] = cant_art_tmp;
    renglon['OBS_ART']  = obs_art_tmp;
    //console.debug(renglon);
    for ($i=0; $i<$_bar101.Renglon.length;$i++){
        if ($_bar101.Renglon[$i]['GRUART'].trim() === renglon['GRU_ART'].trim() && $_bar101.Renglon[$i]['CODART'].trim() === renglon['COD_ART'].trim() && $_bar101.Renglon[$i]['CLAART'].trim() === renglon['CLA_ART'].trim() ) {
            $_bar101.Renglon[$i]['CANFAC'] = renglon['CANT_ART'];
            $_bar101.Renglon[$i]['OBSFAC'] = renglon['OBS_ART'];
        }
    }
    mostrarTablaFacTmp();
    //console.debug($_bar101);
}

function PreguntaPropina(){
    //console.debug('ola');
    CON851P("Incluir propina?", this.ComandaSin, this.ComandaCon);
}

function ComandaCon(){
    console.debug('con');
};
function ComandaSin(){
    console.debug('sin');
}

//borra el temporal y vuelve a las mesas
function reiniciarMesa(){
    //console.debug('aca');
    $_fac101 = [];   
    $('#botones_menu').attr('hidden',true); 
    $('#btn_salir').attr('disabled', false);
    ambientes_101();

}

// muestra configuracion para guardar la factura definitiva
function PrepararGuardarFac(){
    $('#mesa_sel').html(mesa_origen);
    let existe = 0;
    vendedor = $('#vende_bar101').val();
    for ($i=0; $i<$_bar101.Vendedores.length;$i++){
        if($_bar101.Vendedores[$i]['CUENTA'].trim()===vendedor){
            existe++;
        }
    }      
     
    if (existe > 0){                
        localStorage['totfac'] = total_fac;
        localStorage['vendedor'] = vendedor;
        localStorage['suc'] = suc_tmp;
        $('#cuerpo_menu').html('');
        $('#cuerpo_menu').load('../../BAR/paginas/BAR101G.html');                       
    }else{
        CON851("", "El Vendedor no es valido!", "", "error", "");
    }
    
}

function cerosIzq(obj, tam) {
    while (obj.toString().length < tam)
        obj = '0' + obj;
    return obj;
}