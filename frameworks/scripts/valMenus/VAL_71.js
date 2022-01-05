var hcprc = {};
validarMenu_71();

async function validarMenu_71() {
    await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage["Usuario"].trim() + "|1|" }, get_url("APP/HICLIN/HC_PRC.DLL"))
        .then((data) => {
            hcprc = data["HCPAC"];
        })
        .catch((err) => {
            hcprc.novedad = '';
            console.log(err, 'err')
        });

    if (hcprc.novedad != '8') {
        _validarVentanaMain({
            "Id": "071",
            "Descripcion": "Imprime historia clinica",
            "Opc-segu": "ISH42",
            "Tipo": "HTML",
            "Href": "../../HICLIN/paginas/HC701.html"
        })
    } else {
        switch (hcprc.esquema) {
            case 'AI01':
            case '8002':
            case 'AI02':
            case 'HC01':
            case '8001':
            case '8031':
            case '8051':
            case '9012':
                llamarElectron_71();
                break;
            default:
                llamarRm_71();
                break;
        }
    }
}

async function llamarElectron_71() {
    _validarVentanaMain({
        "Id": "071",
        "Descripcion": "Imprime historia clinica",
        "Opc-segu": "ISH42",
        "Tipo": "HTML",
        "Href": "../../HICLIN/paginas/HC701.html"
    })
}

async function llamarRm_71() {
    _validarVentanaMain({
        "Id": "071",
        "Descripcion": "Imprime historia clinica",
        "Opc-segu": "ISH42",
        "Tipo": "RM",
        "Params": [{
            "formulario": "HC701",
            "dll": "HICLIN\\HC701"
        }]
    })
}