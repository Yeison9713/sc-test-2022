class popup {
    constructor(params) {
        this.callback = params.callback;
        this.esc_callback = params.esc_callback;

        this.fuente = /*html*/ `
                    <div>
                        <div class="col-md-12 col-sm-12 col-xs-12 form-group no-padding" id="faseClave">
                            <div class="col-md-7 col-sm-7 col-xs-7" 
                                style="display: flex; align-items: center; float: none; margin: 0 auto;">

                                <label class="col-md-3 col-sm-3 col-xs-3">Clave:</label>
                                <div class="input-group col-md-7 col-sm-7 col-xs-9 ">
                                    <input type="password" class="form-control font-xsmall" id="clave"
                                            data-orden="1" maxlength="8" disabled required />
                                </div>

                            </div>
                        </div>
                        <div style="clear: both;"></div>
                    </div>`;

    }
    _init() {
        jAlert({
            titulo: "Clave de bloqueo ",
            mensaje: this.fuente,
            footer: false,
            autoclose: false,
        });

        this._validarClave()
    }

    _validarClave() {
        validarInputs(
            {
                form: "#faseClave",
                orden: "1"
            },
            () => {
                jAlert_close();
                this.esc_callback()
            },
            () => {
                let clave = document.getElementById("clave").value;

                if (clave == this._getClave()) {
                    jAlert_close()
                    this.callback();
                } else {
                    CON851("03", "03", "", "warning", "");
                    document.getElementById("clave").value = "";
                    this._validarClave();
                }
            }
        )
    }
    _getClave() {
        let date = new Date().toLocaleDateString("es-CO").split("/");
        let mes_total = 0;
        date[1].padStart(2, "0").split("").forEach(e => mes_total += parseFloat(e));
        let mes = mes_total.toString().padStart(2, "0")

        let dia_total = 0;
        date[0].padStart(2, "0").split("").forEach(e => dia_total += parseFloat(e));
        let dia = dia_total.toString().padStart(2, "0")

        return `SC${date[2].substring(2, 4)}${mes}${dia}`
    }
}

const ventanaBloqueo = function (params) {
    var new_popup = new popup(params);
    new_popup._init();
};

module.exports = {
    ventanaBloqueo,
};
