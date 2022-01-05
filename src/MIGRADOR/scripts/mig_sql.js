$(document).ready(function () {
    console.log('entro a mig sql')
    loader('show')
    llamarMigSql_lotes()
})

function llamarMigSql_lotes() {
    LLAMADO_DLL({
        dato: [],
        callback: _on_llamarMigSql_lotes,
        nombredll: 'SQL-LOTES',
        carpeta: 'MIGRA'
    });
}

function _on_llamarMigSql_lotes(data) {
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        loader('hide');
        console.log('exitoso')
    } else {
        loader('hide');
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}