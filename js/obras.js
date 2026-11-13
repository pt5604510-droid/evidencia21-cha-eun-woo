/* =====================================================================
   obras.js · Módulo de obras
   - Rellena el modal con los datos de la tarjeta seleccionada
   - Filtra las tarjetas por categoría (todas / serie / música)
   Expone: window.Obras.filtrar(categoria)
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Modal de detalle ---------- */
  const modal = document.getElementById('modalObra');

  // Bootstrap lanza "show.bs.modal" justo antes de abrir; event.relatedTarget
  // es el botón que lo abrió, de donde leemos los atributos data-*.
  modal.addEventListener('show.bs.modal', function (event) {
    const boton = event.relatedTarget;
    document.getElementById('modalTitulo').textContent = boton.dataset.titulo;
    document.getElementById('modalMeta').textContent = boton.dataset.tipo + ' · ' + boton.dataset.anio;
    document.getElementById('modalPapel').textContent = 'Papel: ' + boton.dataset.papel;
    document.getElementById('modalDescripcion').textContent = boton.dataset.descripcion;
  });

  /* ---------- 2. Filtros ---------- */
  const botones = document.querySelectorAll('#filtros .btn-filter');
  const tarjetas = document.querySelectorAll('#listaObras [data-categoria]');
  const contador = document.getElementById('contadorObras');

  /**
   * Muestra solo las tarjetas de una categoría.
   * @param {string} categoria - 'todas', 'serie' o 'musica'
   */
  function filtrar(categoria) {
    let visibles = 0;

    tarjetas.forEach(function (tarjeta) {
      const coincide = categoria === 'todas' || tarjeta.dataset.categoria === categoria;
      tarjeta.classList.toggle('oculta', !coincide);
      if (coincide) visibles++;
    });

    // Actualiza el estado visual y accesible de los botones
    botones.forEach(function (boton) {
      const activo = boton.dataset.filtro === categoria;
      boton.classList.toggle('active', activo);
      boton.setAttribute('aria-pressed', String(activo));
    });

    contador.textContent = 'Mostrando ' + visibles + ' de ' + tarjetas.length + ' obras.';
  }

  botones.forEach(function (boton) {
    boton.addEventListener('click', function () { filtrar(boton.dataset.filtro); });
  });

  window.Obras = { filtrar: filtrar };
})();
