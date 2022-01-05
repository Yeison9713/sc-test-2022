new Vue({
    el: '#CALL_SER810',
    data: {
        mostrar: false
    },
    created() {
        this.mostrar = true
    },
    watch: {

    },
    components: {
        "ser810": require("../../SALUD/scripts/SER810.vue.js"),
    },
    methods: {
        escVentanaPacientes(){
            this.mostrar = false
            RXLAB_busquedaPaciente();
        },
        successVentanaPacientes(data){
            this.mostrar = false
            console.log(data)
            busquedaEstudios_RXLAB("PACIENTE", data.cod, true);
        },
    }
})