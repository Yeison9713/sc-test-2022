new Vue({
    el:'#SER-A05',
    data:{
        SERA05:[],
        form:{
            reporte_SERA05: "",
            detalle_SERA02: "",
            condicion_SERA02: "",
            oper_SERA02: "",
            fecha_SERA02: "",
        }
    },
    created(){
        _toggleNav();
        _inputControl("disabled");
        nombreOpcion("9,7,A,2 - Estadistica de glosas x entidad");
        setTimeout(this._evaluarreportebasado_SERA05, 300);
    },
    methods: {
        _evaluarreportebasado_SERA05(){
            POPUP({
                array: [
                    {COD: '1', DESCRIPCION:'Fecha contabilización'},
                    {COD: '2', DESCRIPCION:'Fecha radicacion'},
                    {COD: '3', DESCRIPCION:'Fecha de factura'},
                ],
                titulo: 'REPORTE BASADO EN',
                indices: [
                    {label: 'DESCRIPCION'}
                ],
                callback_f: _toggleNav
            },
            this._validarreportebasado_SERA05
            )
        },
        _validarreportebasado_SERA05(data) {
            this.form.reporte_SERA05 = data.COD;
            if (this.form.reporte_SERA05 == "F") {
              _toggleNav();
            } else {
              let informe = {"1": "Basado en fecha contabilización", "2": "Basado en fecha radicación", "3": "Basado en fecha de factura"};
              this.form.reporte_SERA05 = this.form.reporte_SERA05 + " - " + informe[this.form.reporte_SERA05];
              this._evaluarentidad_SERA05();
            }
        },
        _evaluarentidad_SERA05(){
            validarInputs({
                form: "#VALIDAR1_SERA05",
                orden: '1'
            },
                () => { setTimeout(this._evaluarreportebasado_SERA05, 300) },
                this._evaluarfechainicial_SERA05
            )
        },
        _evaluarfechainicial_SERA05(){
            validarInputs({
                form: "#VALIDAR2_SERA05",
                orden: '1'
            },
                this._evaluarentidad_SERA05,
                this._evaluarfechafinal_SERA05
            )
        },
        _evaluarfechafinal_SERA05(){
            validarInputs({
                form: "#VALIDAR3_SERA05",
                orden: '1'
            },
                this._evaluarfechainicial_SERA05,
                () => {
                    loader('show');
                    postData({
                        datosh: `${datosEnvio()}${this.form.reporte_SERA05.substring(0,1)}|${entidadMask_SERA05.value.trim()}|${fechainicialMask_SERA05.value.trim().replace(/-/g,'')}|${fechafinalMask_SERA05.value.trim().replace(/-/g,'')}|`
                    }, get_url("APP/SALUD/SER-A05.DLL"))
                    .then(data => {
                        data.GLOSAS.sort(function(a,b){
                            if (a.NIT > b.NIT){
                                return 1
                            } if (a.NIT < b.NIT){
                                return -1
                            }
                            return 0;
                        })
                        let glosas = [];
                        console.debug(data.GLOSAS)
                        if (entidadMask_SERA05.value.trim() == 'S'){
                            let valorglosa = 0; let valorrespu = 0; let valoracept = 0; let valorpendi = 0;
                            for (var i in data.GLOSAS){
                                let numer = parseInt(i) + 1;
                                let glosa = parseFloat(data.GLOSAS[i].GLOSA.replace('.',','));
                                if (isNaN(glosa)) glosa = 0;
                                let respu = parseFloat(data.GLOSAS[i].RESPU.replace('.',','));
                                if (isNaN(respu)) respu = 0;
                                let acept = parseFloat(data.GLOSAS[i].ACEPT.replace('.',','));
                                if (isNaN(acept)) acept = 0;
                                let pendi = parseFloat(data.GLOSAS[i].PENDI.replace('.',','));
                                if (isNaN(pendi)) pendi = 0;
                                if (numer == data.GLOSAS.length){
                                    valorglosa = valorglosa + glosa;
                                    valorrespu = valorrespu + respu;
                                    valoracept = valoracept + acept;
                                    valorpendi = valorpendi + pendi;
                                    glosas.push(data.GLOSAS[i]);
                                    glosas.push({ NIT:'', MOTIVO: 'TOTAL ENTIDAD', GLOSA:valorglosa, RESPU:valorrespu, ACEPT: valoracept, PENDI:valorpendi});
                                } else if (data.GLOSAS[i].NIT != data.GLOSAS[numer].NIT){
                                    valorglosa = valorglosa + glosa;
                                    valorrespu = valorrespu + respu;
                                    valoracept = valoracept + acept;
                                    valorpendi = valorpendi + pendi;
                                    glosas.push(data.GLOSAS[i]);
                                    glosas.push({ NIT:'', MOTIVO: 'TOTAL ENTIDAD', GLOSA:valorglosa, RESPU:valorrespu, ACEPT: valoracept, PENDI:valorpendi});
                                    valorglosa = 0; valoracept = 0; valorrespu = 0; valorpendi = 0;
                                } else {
                                    valorglosa = valorglosa + glosa;
                                    valorrespu = valorrespu + respu;
                                    valoracept = valoracept + acept;
                                    valorpendi = valorpendi + pendi;
                                    glosas.push(data.GLOSAS[i]);
                                }
                            }
                        }
                        loader('hide');
                        var columnas = [
                            {
                                title: "NIT",
                                value: "NIT",
                                filterButton: true
                            },
                            {
                                title: "MOTIVO",
                                value: "MOTIVO",
                                filterButton: true
                            },
                            {
                                title: "VLR GLOSA",
                                value: "GLOSA",
                            },
                            {
                                title: "VLR RESPU",
                                value: "RESPU",
                            },
                            {
                                title: "VLR ACEPT",
                                value: "ACEPT",
                            },
                            {
                                title: "VLR PENDI",
                                value: "PENDI",
                            },
                        ]
        
                        var header_format = [
                            { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
                            `INFORME ESTADISTICO     NIT: ${$_USUA_GLOBAL[0].NIT}`,
                            `Periodo desde: ${fechainicialMask_SERA05.value}  Hasta: ${fechafinalMask_SERA05.value}`,
                        ]
        
                        _impresion2({
                            tipo: 'excel',
                            header: header_format,
                            logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                            tabla: {
                                columnas,
                                data: glosas,
                            },
                            archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
                            scale: 65,
                            orientation: 'landscape'
                        })
                            .then(() => {
                                CON851('','Proceso terminado',_toggleNav(),'success','Exito');
                            })
                            .catch(() => {
                                CON851('','Ocurrio un error con la impresión',this._evaluarfechafinal_SERA05(),'error','Error');
                            })
                    })
                    .catch(error => {
                        loader('hide');
                        console.error(error);
                        CON851('','Ocurrio un error con los datos de la impresion',this._evaluarfechafinal_SERA05(),'error','Error');
                    });
                }
            )
        }
    }
})

var entidadMask_SERA05 = IMask($("#entidad_SERA05")[0], {
    mask: "a",
    definitions: {
      a: /[SN]/,
    },
    prepare: function (str) {
      return str.toUpperCase();
    },
    commit: function (value, masked) {
      masked._value = value.toLowerCase();
    },
  });
var fechainicialMask_SERA05 = IMask($("#fechainicial_SERA05")[0], {
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
var fechafinalMask_SERA05 = IMask($("#fechafinal_SERA05")[0], {
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