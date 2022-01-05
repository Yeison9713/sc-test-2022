new Vue({
    el:'#SER405C',
    data:{
        form:{
            opcion_SER119D:'',
            folio_SER405C:'',
            atendio_SER405C:'',
            atendiod_SER405C:'',
            observacion_SER109:'',
        },
        SER405C:[],
    },
    created() {
        _toggleNav();
        _inputControl("disabled");
        nombreOpcion('9,4,5,3 - Consulta de notificaciones');
        this._evaluaropcion_SER405C();
    },
    methods: {
        _evaluaropcion_SER405C() {
            validarInputs({
                form: "#VALIDAR1_SER405C",
                orden: '1'
            },
                _toggleNav,
                this._evaluaropcion_SER405C
            )
        },
        _ventanaSER818N() {
            SER818N(this._mostrardatos_SER405C, this._evaluaropcion_SER405C);
        },
        _mostrardatos_SER405C(data){
            console.log(data);
            CON851P('10', this._evaluaropcion_SER405C, () => {
                console.log('guardar');
                _toggleNav()
            })
        }
    }
})