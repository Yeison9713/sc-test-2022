new Vue({
    el: "#PUB614",
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
  