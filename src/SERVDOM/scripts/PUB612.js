new Vue({
    el: "#PUB612",
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
  