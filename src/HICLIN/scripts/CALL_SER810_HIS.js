new Vue({
    el: '#CALL_SER810_HIS',
    data: {
        mostrar: false
    },
    created() {
        this.mostrar = true
        _fin_validar_form();
    },
    watch: {

    },
    components: {
        "ser810": require("../../SALUD/scripts/SER810.vue.js"),
    },
    methods: {
        escVentanaPacientes(){
            this.mostrar = false
            validarPaciente()
        },
        successVentanaPacientes(data){
            this.mostrar = false
            console.log(data)
            document.querySelector("#busqpaci_his").value = data.cod;
            validarPaciente()
            setTimeout(()=> _enterInput("#busqpaci_his"), 100)
        },
    }
})