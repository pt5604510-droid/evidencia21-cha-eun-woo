/* =====================================================================
   config.js · Conexión con la base de datos (Supabase)
   ---------------------------------------------------------------------
   1. Crea tu proyecto en https://supabase.com y ejecuta supabase/schema.sql
   2. Copia aquí la "Project URL" y la clave pública ("anon" o "publishable").
   3. Guarda el archivo. Con eso el formulario ya usa la base de datos.

   La clave pública SÍ puede subirse a GitHub: está pensada para el navegador
   y la protegen las reglas de seguridad (RLS) de schema.sql.
   NUNCA pegues aquí la clave "service_role" ni "secret".

   Si dejas los valores vacíos, el sitio funciona en modo local
   (guarda los mensajes solo en el navegador).
   ===================================================================== */
window.APP_CONFIG = {
  SUPABASE_URL: 'https://aiqpnsosndxxzidaubhf.supabase.co',        // ejemplo: 'https://aiqpnsosndxxzidaubhf.supabase.co'
  SUPABASE_KEY: 'sb_publishable_om721oMFoD4HN2SlKoQerg_zOtFRog8'         // ejemplo: 'sb_publishable_om721oMFoD4HN2SlKoQerg_zOtFRog8'
};
