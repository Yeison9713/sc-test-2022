new Vue({
  el: "#PUB613",
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
