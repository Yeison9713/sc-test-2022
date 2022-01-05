new Vue({
    el:'#SER-A06',
    data:{
        SERA06:[],
    },
    created(){
        _toggleNav();
        _inputControl("disabled");
        nombreOpcion("9,7,A,6 - Informe de glosas para contab");
        setTimeout(this._fechas_SERA06, 100);
    },
    methods: {
        _fechas_SERA06(){
            let fechaactual = moment(`20${$_USUA_GLOBAL[0].FECHALNK}`).format('YYYYMMDD');
            fechaexpedicionMask_SERA06.typedValue = '20090101';
            fechainicialMask_SERA06.typedValue = moment(fechaactual).startOf('month').format('YYYYMMDD');
            fechafinalMask_SERA06.typedValue = moment(fechaactual).endOf('month').format('YYYYMMDD');
            postData({
                datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`
            }, get_url("APP/CONTAB/CON007B.DLL"))
            .then(data => {
                console.debug(data);
                data = data.split('|');
                if (data[1].trim() == '0' || data[1].trim() == '3' || data[1].trim() == '5'){
                    setTimeout(() => { CON851P('04', _toggleNav, this.contabilizar_SERA06) })
                } else {
                    CON851('','Mes bloqueado', _toggleNav(),'error','Error');
                }
            })
            .catch(error => {
                console.error(error);
                CON851('','Ocurrio un error con el usuario',null,'error','Error');
                _toggleNav();
            });
        },
        contabilizar_SERA06(){
            loader('show')
            postData({
                datosh: `${datosEnvio()}${fechainicialMask_SERA06.unmaskedValue.trim()}|${fechafinalMask_SERA06.unmaskedValue.trim()}|${$_USUA_GLOBAL[0].FECHALNK}|${localStorage.Usuario}|`
            }, get_url("APP/SALUD/SER-A06.DLL"))
            .then(data => {
                loader('hide');
                console.debug(data);
                data.GLOSAS.pop();
                if (data.GLOSAS.length > 0){
                    this.SERA06.GLOSAS =  data.GLOSAS;
                    this._evaluarimpresion_SERA06()
                } else {
                    CON851('','No tiene glosas en este mes', _toggleNav(),'error','Error');
                }
            })
            .catch(error => {
                loader('hide');
                console.error(error);
                CON851('','Ocurrio un error con los datos de la impresion',null,'error','Error');
                _toggleNav();
            });
        },
        _evaluarimpresion_SERA06(){
            console.log(this.SERA06.GLOSAS);
            this.SERA06.GLOSAS.sort(function(a,b){
                if (a.NIT > b.NIT){
                    return 1
                } if (a.NIT < b.NIT){
                    return -1
                }
                return 0;
            })
            var columnas = [
                {
                    title: "FACTURA",
                    value: "LLAVE",
                },
                {
                    title: "ENTIDAD",
                    value: "NIT",
                    filterButton: true
                },
                {
                    title: "EST",
                    value: "ESTADO",
                },
                {
                    title: "VLR GLOSA",
                    value: "GLOSA",
                },
                {
                    title: "VLR SOPORTADO",
                    value: "RESPU",
                },
                {
                    title: "VLR ACEPTADO",
                    value: "ACEPT",
                },
                {
                    title: "VLR PENDIENTE",
                    value: "PENDI",
                },
            ]

            var header_format = [
                { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
                `INFORME DE GLOSAS PARA CONTAB     NIT: ${$_USUA_GLOBAL[0].NIT}`,
                `Periodo desde: ${fechainicialMask_SERA06.value}  Hasta: ${fechafinalMask_SERA06.value}`,
            ]

            _impresion2({
                tipo: 'excel',
                header: header_format,
                logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                tabla: {
                    columnas,
                    data: this.SERA06.GLOSAS,
                },
                archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
                scale: 65,
                orientation: 'landscape'
            })
                .then(() => {
                    CON851('','Proceso terminado',_toggleNav(),'success','Exito');
                })
                .catch(() => {
                    CON851('','Ocurrio un error con el archivo de impresión',this._fechas_SERA06(),'error','Error');
                })
        }
    }
});

var fechaexpedicionMask_SERA06 = IMask($("#fechaexpedicion_SERA06")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '1900', to: '2100', maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        return str;
    }
});
var fechainicialMask_SERA06 = IMask($("#fechainicial_SERA06")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '1900', to: '2100', maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        return str;
    }
});
var fechafinalMask_SERA06 = IMask($("#fechafinal_SERA06")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: '1900', to: '2100', maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: '01', to: '31', maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        return str;
    }
});