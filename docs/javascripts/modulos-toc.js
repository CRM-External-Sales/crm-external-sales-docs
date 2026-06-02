/* En la página índice de Módulos, los ítems del TOC derecho enlazan a cada módulo */

(function () {
  const MODULE_IDS = {
    autenticacion: "autenticacion/",
    usuarios: "usuarios/",
    tours: "tours/",
    transfers: "transfers/",
    proveedores: "proveedores/",
    reservas: "reservas/",
    reportes: "reportes/",
    catalogo: "catalogo/",
  };

  function isModulosIndex() {
    const path = document.location.pathname.replace(/\\/g, "/");
    return (
      path.endsWith("/frontend/modulos/") ||
      path.endsWith("/frontend/modulos/index.html")
    );
  }

  function patchModulosToc() {
    if (!isModulosIndex()) return;

    document
      .querySelectorAll(".md-sidebar--secondary a.md-nav__link[href^='#']")
      .forEach(function (link) {
        const id = link.getAttribute("href").slice(1);
        const target = MODULE_IDS[id];
        if (!target) return;
        link.setAttribute("href", target);
        link.classList.add("modulo-toc-link");
        link.setAttribute("title", "Abrir documentación del módulo");
      });
  }

  document$.subscribe(patchModulosToc);
})();
