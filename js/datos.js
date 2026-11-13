/* =====================================================================
   datos.js · Capa de acceso a datos
   Habla con Supabase por su API REST (PostgREST) usando fetch.
   Si no hay configuración, usa localStorage como respaldo.
   Expone: window.Datos = { remoto, listar(), crear(visita) }
   ===================================================================== */
(function () {
  'use strict';

  const cfg = window.APP_CONFIG || {};
  const remoto = Boolean(cfg.SUPABASE_URL && cfg.SUPABASE_KEY);
  const CLAVE_LOCAL = 'evidencia21-visitas';

  // Cabeceras que exige Supabase en cada petición
  function cabeceras(extra) {
    return Object.assign({
      apikey: cfg.SUPABASE_KEY,
      'Content-Type': 'application/json'
    }, extra);
  }

  /* ---------- Modo base de datos ---------- */

  // Lee de la VISTA pública (no incluye el correo) los últimos 20 mensajes.
  async function listarRemoto() {
    const url = cfg.SUPABASE_URL + '/rest/v1/visitas_publicas?select=*&order=creado_en.desc&limit=20';
    const r = await fetch(url, { headers: cabeceras() });
    if (!r.ok) throw new Error('No se pudo leer la base de datos (' + r.status + ')');
    return r.json();
  }

  // Inserta en la TABLA. "return=minimal" evita pedir datos de vuelta.
  async function crearRemoto(visita) {
    const r = await fetch(cfg.SUPABASE_URL + '/rest/v1/visitas', {
      method: 'POST',
      headers: cabeceras({ Prefer: 'return=minimal' }),
      body: JSON.stringify(visita)
    });
    if (!r.ok) throw new Error('No se pudo guardar el mensaje (' + r.status + ')');
  }

  /* ---------- Modo local (respaldo) ---------- */
  function listarLocal() {
    try { return JSON.parse(localStorage.getItem(CLAVE_LOCAL)) || []; }
    catch (e) { return []; }
  }

  function crearLocal(visita) {
    const lista = listarLocal();
    lista.unshift(visita);
    try { localStorage.setItem(CLAVE_LOCAL, JSON.stringify(lista.slice(0, 20))); }
    catch (e) { /* almacenamiento bloqueado: se ignora */ }
  }

  window.Datos = {
    remoto: remoto,
    listar: function () { return remoto ? listarRemoto() : Promise.resolve(listarLocal()); },
    crear: function (visita) {
      if (remoto) return crearRemoto(visita);
      crearLocal(visita);
      return Promise.resolve();
    }
  };
})();
