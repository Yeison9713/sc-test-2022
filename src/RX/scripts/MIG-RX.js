new Vue({
    el: '#MIG-RX',
    data: {
        añoMig: ''
    },
    created() {
        _toggleNav()
        _inputControl('disabled');
        _inputControl('reset');

        this.validarOperador()
    },
    watch: {

    },
    methods: {
        validarOperador() {
            if (localStorage.Usuario != 'GEBC') {
                CON851('', 'Restriccion de usuario!', null, 'error', 'error')
                this.salir_MIG_RX()
            } else {
                this.aceptarAno()
            }
        },
        aceptarAno() {
            validarInputs(
                {
                    form: "#validarAnoInicial",
                    orden: '1'
                },
                () => this.salir_MIG_RX(),
                () => {
                    console.log(this.añoMig)

                    if (parseInt(this.añoMig) < 2010) {
                        CON851('37', '37', null, 'error', 'error')
                        this.aceptarAno()
                    } else {
                        this.llamadoDll()
                    }
                }
            )
        },
        llamadoDll() {
            loader('show')
            var URL = get_url("APP/RX/MIG-RX.DLL");
            postData({
                datosh: datosEnvio() + this.añoMig + '|'
            }, URL)
                .then((data) => {
                    loader('hide')
                    console.log(data)
                    CON851('', 'Archivo migrado exitosamente!', null, 'Correcto', 'success')
                    this.aceptarAno()
                })
                .catch(error => {
                    loader('hide')
                    console.error(error)
                    this.aceptarAno()
                });
        },
        salir_MIG_RX() {
            this.añoMig = null
            _inputControl('disabled');
            _inputControl('reset');
            setTimeout(() => _toggleNav(), 400)

        }
    }
})