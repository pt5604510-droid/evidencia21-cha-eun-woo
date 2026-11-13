/* =====================================================================
   main.js · Comportamiento general de la interfaz
   - Cierra el menú móvil al elegir un enlace
   - Conecta el dropdown "Obras" del navbar con los filtros
   ===================================================================== */
(function () {
  'use strict';

  const menu = document.getElementById('menuPrincipal');

  // En móvil, al tocar un enlace se pliega el menú para no tapar el contenido.
  document.querySelectorAll('#menuPrincipal .nav-link:not(.dropdown-toggle), #menuPrincipal .dropdown-item, #menuPrincipal .nav-cta')
    .forEach(function (enlace) {
      enlace.addEventListener('click', function () {
        if (menu.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });

  // Los ítems del dropdown aplican el filtro correspondiente.
  document.querySelectorAll('[data-filtro-nav]').forEach(function (item) {
    item.addEventListener('click', function () {
      window.Obras.filtrar(item.dataset.filtroNav);
    });
  });
})();
