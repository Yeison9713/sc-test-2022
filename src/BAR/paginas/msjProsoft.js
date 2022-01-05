/*Metodo chain o cadena var a {return this}*//*IIFE funcion autoejecutable (function(recibe){}(envio);*/
(function(window, document){
    'use strict';
    var initialize = function(){
        var div = document.createElement('div');
        div.setAttribute('id','content');
        document.body.appendChild(div);
        var msjProsoft ={
             initialize: function(){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function(){
                    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                        document.getElementById('content').innerHTML = xmlhttp.responseText;
                    }
                };
                xmlhttp.open("GET","msjProsoft.html",true);
                xmlhttp.send(); 
             },
             cerrar: function(){
                var event = new MouseEvent('click',{
                   view: window,
                   bubbles: true,
                   cancelable: true
                });
                var modal_close;
                var cancelled;
                var boton = document.getElementById("btn_msjProsoft");
                var modals = document.getElementsByClassName("modal");
                var msj_prosoft = document.getElementById("msjProsoft");
                for (var i in modals){
                    if(i >= 0){
                        if (modals[i].style.display == "block"){
                            modal_close = modals[i];
                            break;
                        }
                    }
                }
                if(typeof modal_close != 'undefined'){
                    if (modal_close.style.display == "block" && modal_close.style.display != "none" && modal_close.style.display != ""){
                        if(msj_prosoft.style.display == "" || msj_prosoft.style.display == "none"){
                            var btn_modal_close = modal_close.getElementsByClassName("close")[0];
                            if(typeof btn_modal_close !== 'undefined'){
                                cancelled = !btn_modal_close.dispatchEvent(event);
                                cancelled = !boton.click();
                            }else{
                                var header_modal_close = modal_close.getElementsByClassName("modal-header")[0];
                                var btn_modal_close = header_modal_close.getElementsByTagName("button");
                                for(var i in btn_modal_close){
                                    if(typeof btn_modal_close[i] == 'object'){
                                        var dataset = btn_modal_close[i].dataset.dismiss;
                                        if(dataset == 'modal'){
                                            cancelled = false;
                                        };
                                    };
                                };
                            };
                            setTimeout(true,2000);
                        };
                    }
                }else{
                    cancelled = !boton.click();                  //!boton.dispatchEvent(event);
                };
             },
             mensajes: function(codigo,texto){
                if(typeof codigo !== 'undefine'){
                    //document.querySelector("#msjProsoft_titulo").innerHTML = codigo;
                }else{
                    document.querySelector("#msjProsoft_subtitulo").innerHTML = '';
                };
                
                if (typeof texto === 'undefine' || texto === ''){
                    document.querySelector("#msjProsoft_mensaje").innerHTML = 'No exite error, comuniquese con Prosoft';
                }else{
                    document.querySelector("#msjProsoft_mensaje").innerHTML = texto;
                };
             },
             exito: function(msj_codigo,msj_texto){
                this.cerrar();
                this.mensajes(msj_codigo,msj_texto);
                document.querySelector("#msjProsoft_titulo").innerHTML = "Éxito " + msj_codigo;
                document.querySelector("#msjProsoft_logo").src = "../imagenes/success.png";
                document.querySelector("#msjProsoft_boton").className = "btn btn-block font-medium green-jungle";
             },
             error: function(msj_codigo,msj_texto){
                this.cerrar();
                this.mensajes(msj_codigo,msj_texto);
                document.querySelector("#msjProsoft_titulo").innerHTML = "Error " + msj_codigo;
                document.querySelector("#msjProsoft_logo").src = "../imagenes/error.png";
                document.querySelector("#msjProsoft_boton").className = "btn btn-block font-medium red-thunderbird";
             },
             advertencia: function(msj_codigo,msj_texto){
                this.cerrar();
                this.mensajes(msj_codigo,msj_texto);
                document.querySelector("#msjProsoft_titulo").innerHTML = "Advertencia " + msj_codigo;
                document.querySelector("#msjProsoft_logo").src = "../imagenes/warning.png";
                document.querySelector("#msjProsoft_boton").className = "btn btn-block font-medium yellow-crusta";
             }
        };
      return msjProsoft;
    };
    if(typeof window.msjProsoft === 'undefined'){
        window.msjProsoft = initialize();
    };
})(window, document);