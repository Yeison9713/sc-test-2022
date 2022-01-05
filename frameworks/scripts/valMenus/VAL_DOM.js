new Vue({
  created() {
    _toggleNav();
    jAlert(
      {
        titulo: "ATENCIÓN",
        mensaje: `Ingresar por módulo de Contablilidad`,
      },
      () => {
        setTimeout(() => {
          _toggleNav();
        }, 300);
      }
    );
  },
});
