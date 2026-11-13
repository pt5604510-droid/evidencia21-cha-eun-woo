/* =====================================================================
   visitas.js · Módulo del libro de visitas
   - Valida el formulario con las clases de Bootstrap
   - Guarda y lee mensajes mediante window.Datos (base de datos)
   - Muestra un toast de confirmación o de error
   ===================================================================== */
(function () {
  'use strict';

  const form = document.getElementById('formVisitas');
  const lista = document.getElementById('listaVisitas');
  const vacio = document.getElementById('visitasVacio');
  const mensaje = document.getElementById('mensaje');
  const contador = document.getElementById('contadorMensaje');
  const toastEl = document.getElementById('toastVisitas');
  const estado = document.getElementById('estadoDatos');
  const btn = document.getElementById('btnPublicar');

  /* ---------- Estado de la conexión ---------- */
  if (window.Datos.remoto) {
    estado.textContent = 'Conectado a la base de datos.';
    estado.className = 'small ok';
  } else {
    estado.textContent = 'Modo local: falta configurar js/config.js.';
    estado.className = 'small local';
  }

  /* ---------- Pintar la lista ---------- */
  // Se usa textContent (no innerHTML) para evitar inyección de código (XSS).
  function pintar(visitas) {
    lista.replaceChildren();
    vacio.hidden = visitas.length > 0;

    visitas.forEach(function (v) {
      const art = document.createElement('article');
      art.className = 'visita';

      const nombre = document.createElement('strong');
      nombre.textContent = v.nombre;

      const meta = document.createElement('div');
      meta.className = 'visita-meta';
      meta.textContent = v.visitante + ' · Obra favorita: ' + v.obra;

      const texto = document.createElement('p');
      texto.textContent = v.mensaje;

      art.append(nombre, meta, texto);
      lista.append(art);
    });
  }

  async function cargar() {
    try {
      pintar(await window.Datos.listar());
    } catch (e) {
      avisar('No se pudieron cargar los mensajes. Revisa js/config.js.');
    }
  }

  function avisar(texto) {
    document.getElementById('toastTexto').textContent = texto;
    bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 4000 }).show();
  }

  /* ---------- Contador de caracteres ---------- */
  mensaje.addEventListener('input', function () {
    contador.textContent = mensaje.value.length;
  });

  /* ---------- Envío del formulario ---------- */
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');        // Bootstrap marca los campos con error
      form.querySelector(':invalid').focus();     // lleva el foco al primer error
      return;
    }

    const datos = new FormData(form);
    const visita = {
      nombre: datos.get('nombre').trim(),
      correo: datos.get('correo').trim(),
      obra: datos.get('obra'),
      visitante: datos.get('visitante'),
      mensaje: datos.get('mensaje').trim()
    };

    btn.disabled = true;
    btn.textContent = 'Publicando…';
    try {
      await window.Datos.crear(visita);
      form.reset();
      form.classList.remove('was-validated');
      contador.textContent = '0';
      avisar('Mensaje publicado. ¡Gracias por visitar!');
      await cargar();
    } catch (e) {
      avisar('No se pudo publicar el mensaje. Inténtalo de nuevo.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Publicar mensaje';
    }
  });

  form.addEventListener('reset', function () {
    form.classList.remove('was-validated');
    contador.textContent = '0';
  });

  cargar();                                       // al abrir la página, muestra los mensajes
})();
