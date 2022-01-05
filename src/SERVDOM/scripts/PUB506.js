new Vue({
  el: "#PUB506",
  created() {
    jAlert(
      {
        titulo: "ATENCIÓN",
        mensaje: `Opción no disponible`,
      },
      () => {
        setTimeout(() => {
          _toggleNav();
        }, 300);
      }
    );
  },
});
