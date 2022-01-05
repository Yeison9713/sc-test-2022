new Vue({
    el: '#PRY001',
    data: {
        ciudades: [],
        municipio: {
            NOVEDAD: '',
            COD_CIU: '',
            NOMBRE: '',
            DIRECC: '',
            TELEFONO: '',
            NIT: '',
            DV: '',
            funcionario: '',
            cargo: ''
        },
        ciud_escogida: {
            nombre: 'fddf'
        }

    },
    created() {
        _toggleNav()
        _inputControl('disabled');
        _inputControl('reset');

        this.traerCiudades()
    },
    watch: {

    },
    methods: {
        traerCiudades() {
            var _this = this

            obtenerDatosCompletos({ nombreFd: 'CIUDADES' }, data => {
                _this.ciudades = data.CIUDAD
                _this.ciudades.pop()
                console.log(_this.ciudades)
                _this.traerDatosMunicipio()
            }, 'ON')
        },
        traerDatosMunicipio() {
            loader('show')
            var _this = this

            postData({ datosh: datosEnvio() }, get_url("APP/PRY/PRY001.DLL"))
                .then(data => {
                    loader('hide')
                    _this.municipio = data.MUNICIPIO[0]
                    console.log(_this.municipio)
                })
                .catch(err => {
                    loader('hide')
                    console.error(err)
                    _this.salir_pry001()
                });
        },
        salir_pry001() {
            _inputControl('disabled');
            _inputControl('reset');
            _toggleNav()

        }

    }
})