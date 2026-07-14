/* =====================================================================
   Sincronizados S.A. — Lógica del sitio (contenido dinámico + admin)
   Sitio estático: los cambios del panel se guardan en el navegador
   (localStorage) y se publican descargando data/site-data.js y subiéndolo
   al repositorio.
   ===================================================================== */
(function () {
  "use strict";

  var DEFAULTS = window.SITE_DATA || { equipo: [], reflexiones: [], modulos: [], documentos: {}, admin: {} };
  var LSKEY = "sincronizados_data_v1";
  var SESSKEY = "sincronizados_admin";

  /* ---------- utilidades ---------- */
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function slug(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || ("id-" + Date.now());
  }
  async function sha256(text) {
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }

  /* ---------- almacén de datos ---------- */
  var Store = {
    get: function () {
      try {
        var raw = localStorage.getItem(LSKEY);
        if (raw) {
          var d = JSON.parse(raw);
          if (!d.admin) d.admin = clone(DEFAULTS.admin);
          return d;
        }
      } catch (e) {}
      return { equipo: clone(DEFAULTS.equipo), reflexiones: clone(DEFAULTS.reflexiones), admin: clone(DEFAULTS.admin) };
    },
    set: function (data) {
      try { localStorage.setItem(LSKEY, JSON.stringify(data)); }
      catch (e) { alert("No se pudo guardar en el navegador (¿espacio lleno?). Reduce el tamaño de las fotos."); }
    },
    reset: function () { localStorage.removeItem(LSKEY); }
  };

  function moduloNombre(id) {
    var m = (DEFAULTS.modulos || []).find(function (x) { return x.id === id; });
    return m ? m.nombre : "";
  }
  function integrante(data, id) {
    return (data.equipo || []).find(function (x) { return x.id === id; });
  }
  function isAdmin() { return sessionStorage.getItem(SESSKEY) === "1"; }

  /* =====================================================================
     RENDER: REFLEXIONES (pestañas por integrante + filtro por módulo)
     ===================================================================== */
  function renderReflexiones() {
    var root = document.getElementById("reflexiones-app");
    if (!root) return;
    var data = Store.get();
    root.innerHTML = "";

    var conReflexion = (data.equipo || []).filter(function (m) {
      return (data.reflexiones || []).some(function (r) { return r.integranteId === m.id; });
    });
    // También permitir integrantes sin reflexión (para que el admin la añada)
    var tabsMembers = data.equipo || [];

    if (!tabsMembers.length) {
      root.appendChild(el("p", "empty-state", "Aún no hay integrantes registrados."));
      return;
    }

    // Pestañas por integrante
    var tabs = el("div", "refl-tabs");
    tabs.setAttribute("role", "tablist");
    var panel = el("div", "refl-panel");
    root.appendChild(tabs);
    root.appendChild(panel);

    var current = tabsMembers[0].id;

    function paint() {
      // pestañas
      tabs.innerHTML = "";
      tabsMembers.forEach(function (m) {
        var b = el("button", "refl-tab" + (m.id === current ? " is-active" : ""), m.nombre);
        b.type = "button";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-selected", m.id === current ? "true" : "false");
        b.addEventListener("click", function () { current = m.id; paint(); });
        tabs.appendChild(b);
      });

      // panel del integrante seleccionado
      panel.innerHTML = "";
      var m = integrante(data, current);
      var refs = (data.reflexiones || []).filter(function (r) {
        return r.integranteId === current;
      });

      var head = el("div", "refl-panel-head");
      var photo;
      if (m && m.foto) { photo = el("img", "refl-avatar"); photo.src = m.foto; photo.alt = m.nombre; }
      else { photo = el("div", "refl-avatar refl-avatar-ph", iniciales(m ? m.nombre : "")); }
      head.appendChild(photo);
      var htext = el("div");
      htext.appendChild(el("h3", null, m ? m.nombre : ""));
      htext.appendChild(el("p", "refl-role", m ? m.rol : ""));
      head.appendChild(htext);
      panel.appendChild(head);

      if (!refs.length) {
        panel.appendChild(el("p", "empty-state", "Este integrante todavía no tiene una reflexión."));
      }
      refs.forEach(function (r) {
        var card = el("article", "refl-entry");
        card.appendChild(el("p", "refl-text", r.texto));
        if (isAdmin()) {
          var actions = el("div", "admin-actions");
          var edit = el("button", "chip-btn", "Editar");
          edit.type = "button";
          edit.addEventListener("click", function () { openReflexionForm(r); });
          var del = el("button", "chip-btn danger", "Eliminar");
          del.type = "button";
          del.addEventListener("click", function () {
            if (confirm("¿Eliminar esta reflexión?")) {
              var d = Store.get();
              d.reflexiones = d.reflexiones.filter(function (x) { return x.id !== r.id; });
              Store.set(d); renderReflexiones();
            }
          });
          actions.appendChild(edit); actions.appendChild(del);
          card.appendChild(actions);
        }
        panel.appendChild(card);
      });

      if (isAdmin()) {
        var add = el("button", "button button-secondary refl-add", "+ Añadir reflexión para " + (m ? m.nombre.split(" ")[0] : ""));
        add.type = "button";
        add.addEventListener("click", function () { openReflexionForm(null, current); });
        panel.appendChild(add);
      }
    }

    paint();
  }

  function iniciales(nombre) {
    return String(nombre).split(/\s+/).filter(Boolean).slice(0, 2).map(function (p) { return p[0]; }).join("").toUpperCase();
  }

  /* =====================================================================
     RENDER: EQUIPO (tarjetas + edición admin)
     ===================================================================== */
  function renderEquipo() {
    var root = document.getElementById("equipo-app");
    if (!root) return;
    var data = Store.get();
    root.innerHTML = "";

    (data.equipo || []).forEach(function (m) {
      var card = el("article", "member-card");
      if (m.foto) { var img = el("img", "member-photo"); img.src = m.foto; img.alt = m.nombre; card.appendChild(img); }
      else { card.appendChild(el("div", "member-placeholder", iniciales(m.nombre))); }
      card.appendChild(el("h2", null, m.nombre));
      card.appendChild(el("p", "member-role", m.rol));
      if (isAdmin()) {
        var actions = el("div", "admin-actions");
        var edit = el("button", "chip-btn", "Editar");
        edit.type = "button";
        edit.addEventListener("click", function () { openMiembroForm(m); });
        var del = el("button", "chip-btn danger", "Eliminar");
        del.type = "button";
        del.addEventListener("click", function () {
          if (confirm("¿Eliminar a " + m.nombre + "?")) {
            var d = Store.get();
            d.equipo = d.equipo.filter(function (x) { return x.id !== m.id; });
            Store.set(d); renderEquipo(); renderReflexiones();
          }
        });
        actions.appendChild(edit); actions.appendChild(del);
        card.appendChild(actions);
      }
      root.appendChild(card);
    });

    if (isAdmin()) {
      var add = el("article", "member-card member-add");
      var b = el("button", "button button-secondary", "+ Añadir integrante");
      b.type = "button";
      b.addEventListener("click", function () { openMiembroForm(null); });
      add.appendChild(b);
      root.appendChild(add);
    }
  }

  /* =====================================================================
     RENDER: DOCUMENTOS (P&ID / financiero)
     ===================================================================== */
  function renderDocs() {
    var docs = DEFAULTS.documentos || {};
    // Contenedores modernos: <div data-docs="categoria">
    document.querySelectorAll("[data-docs]").forEach(function (root) {
      fillDocsInto(root, docs[root.getAttribute("data-docs")] || []);
    });
    // Compatibilidad con ids antiguos (categoria-app)
    ["planeacion", "proceso", "pid", "simulacion", "financiero"].forEach(function (cat) {
      fillDocs(cat + "-app", docs[cat] || []);
    });
  }
  function tipoArchivo(archivo) {
    var url = String(archivo).toLowerCase();
    if (url.indexOf("drive.google") !== -1) return "Drive";
    var m = url.match(/\.([a-z0-9]+)(?:\?|#|$)/);
    var ext = m ? m[1] : "doc";
    if (ext === "xlsx" || ext === "xls") return "XLSX";
    return ext.toUpperCase();
  }
  function fillDocs(id, list) {
    var root = document.getElementById(id);
    if (root) fillDocsInto(root, list);
  }
  function fillDocsInto(root, list) {
    root.innerHTML = "";
    list.forEach(function (d) {
      var a = el("a", "info-card doc-card");
      a.href = d.archivo; a.target = "_blank"; a.rel = "noopener noreferrer";
      a.appendChild(el("span", "card-tag", tipoArchivo(d.archivo)));
      a.appendChild(el("h3", null, d.titulo));
      a.appendChild(el("p", null, d.descripcion));
      a.appendChild(el("span", "doc-open", "Abrir documento →"));
      root.appendChild(a);
    });
    if (!list.length) root.appendChild(el("p", "empty-state", "Sin documentos por ahora."));
  }

  /* =====================================================================
     RENDER: VIDEOS DE MÓDULO (YouTube)
     ===================================================================== */
  function youtubeId(url) {
    if (!url) return null;
    var m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }
  function renderVideos() {
    var data = Store.get();
    var vids = data.videos || DEFAULTS.videos || {};
    document.querySelectorAll("[data-video]").forEach(function (slot) {
      var key = slot.getAttribute("data-video");
      var url = vids[key] || "";
      var id = youtubeId(url);
      slot.innerHTML = "";
      var frame = el("div", "video-frame");
      if (id) {
        var ifr = document.createElement("iframe");
        ifr.src = "https://www.youtube.com/embed/" + id;
        ifr.title = "Video del módulo";
        ifr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        ifr.allowFullscreen = true;
        frame.appendChild(ifr);
      } else {
        var ph = el("div", "video-placeholder");
        var inner = el("div");
        inner.appendChild(el("div", "vp-icon", "🎬"));
        inner.appendChild(el("p", null, "Video del módulo en preparación. Cuando esté en YouTube, añade el enlace desde el panel de administración (⚙ Admin → Videos de módulos) o en data/site-data.js."));
        ph.appendChild(inner);
        frame.appendChild(ph);
      }
      slot.appendChild(frame);
    });
  }

  /* =====================================================================
     FORMULARIOS (modales) — reflexión / integrante
     ===================================================================== */
  function modal(titulo) {
    var overlay = el("div", "modal-overlay");
    var box = el("div", "modal-box");
    var head = el("div", "modal-head");
    head.appendChild(el("h3", null, titulo));
    var close = el("button", "modal-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Cerrar");
    close.addEventListener("click", function () { overlay.remove(); });
    head.appendChild(close);
    box.appendChild(head);
    var body = el("div", "modal-body");
    box.appendChild(body);
    overlay.appendChild(box);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
    return { overlay: overlay, body: body };
  }
  function field(labelText, input) {
    var wrap = el("label", "form-field");
    wrap.appendChild(el("span", null, labelText));
    wrap.appendChild(input);
    return wrap;
  }

  function openReflexionForm(refl, integranteId) {
    var data = Store.get();
    var m = modal(refl ? "Editar reflexión" : "Nueva reflexión");

    var selInt = document.createElement("select");
    (data.equipo || []).forEach(function (x) {
      var o = new Option(x.nombre, x.id);
      if ((refl && refl.integranteId === x.id) || (!refl && integranteId === x.id)) o.selected = true;
      selInt.appendChild(o);
    });
    var txt = document.createElement("textarea");
    txt.rows = 6; txt.value = refl ? refl.texto : "";
    txt.placeholder = "Escribe la reflexión…";

    m.body.appendChild(field("Integrante", selInt));
    m.body.appendChild(field("Reflexión", txt));

    var save = el("button", "button button-primary", "Guardar");
    save.type = "button";
    save.addEventListener("click", function () {
      if (!txt.value.trim()) { alert("Escribe el texto de la reflexión."); return; }
      var d = Store.get();
      if (refl) {
        var r = d.reflexiones.find(function (x) { return x.id === refl.id; });
        r.integranteId = selInt.value; r.texto = txt.value.trim();
      } else {
        d.reflexiones.push({
          id: "r-" + slug(selInt.value) + "-" + Date.now(),
          integranteId: selInt.value, texto: txt.value.trim()
        });
      }
      Store.set(d); m.overlay.remove(); renderReflexiones();
    });
    var foot = el("div", "modal-foot"); foot.appendChild(save);
    m.body.appendChild(foot);
  }

  function openMiembroForm(mi) {
    var m = modal(mi ? "Editar integrante" : "Nuevo integrante");
    var nombre = document.createElement("input"); nombre.type = "text"; nombre.value = mi ? mi.nombre : "";
    var rol = document.createElement("textarea"); rol.rows = 3; rol.value = mi ? mi.rol : "Integrante del equipo de desarrollo del proyecto Sincronizados.";
    var fotoActual = mi ? mi.foto : "";

    var preview = el("div", "foto-preview");
    function paintPreview() {
      preview.innerHTML = "";
      if (fotoActual) { var img = el("img"); img.src = fotoActual; preview.appendChild(img); }
      else { preview.appendChild(el("div", "member-placeholder", iniciales(nombre.value || "?"))); }
    }
    var fileInput = document.createElement("input"); fileInput.type = "file"; fileInput.accept = "image/*";
    fileInput.addEventListener("change", function () {
      var f = fileInput.files[0]; if (!f) return;
      comprimirImagen(f, 400, 0.82, function (dataUrl) { fotoActual = dataUrl; paintPreview(); });
    });
    var quitar = el("button", "chip-btn", "Quitar foto"); quitar.type = "button";
    quitar.addEventListener("click", function () { fotoActual = ""; paintPreview(); });

    m.body.appendChild(field("Nombre", nombre));
    m.body.appendChild(field("Rol / descripción", rol));
    var fotoField = el("div", "form-field");
    fotoField.appendChild(el("span", null, "Foto"));
    fotoField.appendChild(preview);
    var fotoBtns = el("div", "foto-btns");
    fotoBtns.appendChild(fileInput); fotoBtns.appendChild(quitar);
    fotoField.appendChild(fotoBtns);
    m.body.appendChild(fotoField);
    paintPreview();
    nombre.addEventListener("input", function () { if (!fotoActual) paintPreview(); });

    var save = el("button", "button button-primary", "Guardar");
    save.type = "button";
    save.addEventListener("click", function () {
      if (!nombre.value.trim()) { alert("Escribe el nombre."); return; }
      var d = Store.get();
      if (mi) {
        var x = d.equipo.find(function (e) { return e.id === mi.id; });
        x.nombre = nombre.value.trim(); x.rol = rol.value.trim(); x.foto = fotoActual;
      } else {
        d.equipo.push({ id: slug(nombre.value) + "-" + Date.now(), nombre: nombre.value.trim(), rol: rol.value.trim(), foto: fotoActual });
      }
      Store.set(d); m.overlay.remove(); renderEquipo(); renderReflexiones();
    });
    var foot = el("div", "modal-foot"); foot.appendChild(save);
    m.body.appendChild(foot);
  }

  function comprimirImagen(file, maxSize, quality, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var w = img.width, h = img.height, scale = Math.min(1, maxSize / Math.max(w, h));
        var cv = document.createElement("canvas");
        cv.width = Math.round(w * scale); cv.height = Math.round(h * scale);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        cb(cv.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  /* =====================================================================
     PANEL DE ADMINISTRACIÓN
     ===================================================================== */
  function buildAdminUI() {
    // Botón flotante
    var fab = el("button", "admin-fab", isAdmin() ? "⚙ Admin ✓" : "⚙ Admin");
    fab.type = "button";
    fab.title = "Panel de administración";
    fab.addEventListener("click", function () { isAdmin() ? openAdminMenu() : openLogin(); });
    document.body.appendChild(fab);

    if (isAdmin()) document.body.classList.add("is-admin");
  }

  function openLogin() {
    var m = modal("Acceso de administración");
    var info = el("p", "modal-note", "Barrera de acceso del panel. En un sitio estático no es seguridad real: no guardes datos sensibles.");
    m.body.appendChild(info);
    var user = document.createElement("input"); user.type = "text"; user.placeholder = "Usuario"; user.autocomplete = "username";
    var pass = document.createElement("input"); pass.type = "password"; pass.placeholder = "Contraseña"; pass.autocomplete = "current-password";
    m.body.appendChild(field("Usuario", user));
    m.body.appendChild(field("Contraseña", pass));
    var msg = el("p", "form-msg");
    m.body.appendChild(msg);
    var enter = el("button", "button button-primary", "Entrar");
    enter.type = "button";
    async function intento() {
      var data = Store.get();
      var cfg = (data.admin && data.admin.usuario) ? data.admin : DEFAULTS.admin;
      var h = await sha256(pass.value);
      if (user.value.trim() === cfg.usuario && h === cfg.claveHash) {
        sessionStorage.setItem(SESSKEY, "1");
        m.overlay.remove(); refreshAll(); openAdminMenu();
      } else {
        msg.textContent = "Usuario o contraseña incorrectos.";
      }
    }
    enter.addEventListener("click", intento);
    pass.addEventListener("keydown", function (e) { if (e.key === "Enter") intento(); });
    var foot = el("div", "modal-foot"); foot.appendChild(enter);
    m.body.appendChild(foot);
    setTimeout(function () { user.focus(); }, 50);
  }

  function openAdminMenu() {
    var m = modal("Panel de administración");
    m.body.appendChild(el("p", "modal-note",
      "Edita el contenido con los botones que aparecen en las tarjetas de Equipo y Reflexiones. Para publicar los cambios para todos, descarga los datos y súbelos al repositorio."));

    var grid = el("div", "admin-menu");
    grid.appendChild(menuBtn("🎬 Videos de módulos", "Configura el enlace de YouTube de cada módulo.", editarVideos));
    grid.appendChild(menuBtn("⬇ Descargar datos", "Genera data/site-data.js con el contenido actual.", exportarDatos));
    grid.appendChild(menuBtn("⬆ Importar datos", "Carga un archivo site-data.js/.json.", importarDatos));
    grid.appendChild(menuBtn("🔑 Cambiar contraseña", "Obtén la línea claveHash para tu nueva contraseña.", cambiarClave));
    grid.appendChild(menuBtn("↺ Descartar cambios locales", "Vuelve al contenido publicado (borra los cambios de este navegador).", function () {
      if (confirm("¿Descartar los cambios locales de este navegador y volver al contenido publicado?")) {
        Store.reset(); m.overlay.remove(); refreshAll();
      }
    }));
    grid.appendChild(menuBtn("⎋ Cerrar sesión", "Salir del modo administración.", function () {
      sessionStorage.removeItem(SESSKEY); m.overlay.remove(); document.body.classList.remove("is-admin");
      refreshAll(); location.reload();
    }));
    m.body.appendChild(grid);
  }
  function menuBtn(titulo, desc, fn) {
    var b = el("button", "admin-menu-item"); b.type = "button";
    b.appendChild(el("strong", null, titulo));
    b.appendChild(el("span", null, desc));
    b.addEventListener("click", fn);
    return b;
  }

  function editarVideos() {
    var m = modal("Videos de módulos");
    m.body.appendChild(el("p", "modal-note",
      "Pega el enlace de YouTube del video de cada módulo (ej. https://youtu.be/XXXXXXXXXXX). Deja vacío el que aún no exista. Recuerda publicar con 'Descargar datos'."));
    var d = Store.get();
    var vids = d.videos || clone(DEFAULTS.videos || {});
    var nombres = DEFAULTS.videosNombres || {};
    // Orden: el definido en los datos por defecto, más cualquier clave extra.
    var claves = Object.keys(DEFAULTS.videos || {});
    Object.keys(vids).forEach(function (k) { if (claves.indexOf(k) === -1) claves.push(k); });
    var inputs = {};
    claves.forEach(function (k) {
      var inp = document.createElement("input");
      inp.type = "url"; inp.placeholder = "https://youtu.be/…";
      inp.value = vids[k] || "";
      inputs[k] = inp;
      m.body.appendChild(field(nombres[k] || moduloNombre(k) || k, inp));
    });
    var save = el("button", "button button-primary", "Guardar");
    save.type = "button";
    save.addEventListener("click", function () {
      var dd = Store.get();
      dd.videos = {};
      Object.keys(inputs).forEach(function (k) { dd.videos[k] = inputs[k].value.trim(); });
      Store.set(dd); m.overlay.remove(); renderVideos();
    });
    var foot = el("div", "modal-foot"); foot.appendChild(save);
    m.body.appendChild(foot);
  }

  function exportarDatos() {
    var d = Store.get();
    var full = {
      admin: d.admin || DEFAULTS.admin,
      modulos: DEFAULTS.modulos,
      equipo: d.equipo,
      reflexiones: d.reflexiones,
      videos: d.videos || DEFAULTS.videos || {},
      documentos: DEFAULTS.documentos
    };
    var header = "/* Sincronizados S.A. — Datos del sitio (generado desde el panel).\n" +
      "   Reemplaza data/site-data.js con este archivo y súbelo al repositorio\n" +
      "   para publicar los cambios. */\n\n";
    var text = header + "window.SITE_DATA = " + JSON.stringify(full, null, 2) + ";\n";
    var blob = new Blob([text], { type: "application/javascript" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "site-data.js";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(a.href);
  }

  function importarDatos() {
    var input = document.createElement("input"); input.type = "file"; input.accept = ".js,.json,application/json,text/javascript";
    input.addEventListener("change", function () {
      var f = input.files[0]; if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var text = String(reader.result);
          var jsonStart = text.indexOf("{");
          var obj = JSON.parse(text.slice(jsonStart).replace(/;\s*$/, ""));
          var d = Store.get();
          if (obj.equipo) d.equipo = obj.equipo;
          if (obj.reflexiones) d.reflexiones = obj.reflexiones;
          if (obj.admin) d.admin = obj.admin;
          if (obj.videos) d.videos = obj.videos;
          Store.set(d); refreshAll();
          alert("Datos importados en este navegador. Recuerda 'Descargar datos' y subirlos para publicarlos.");
        } catch (e) { alert("No se pudo leer el archivo: " + e.message); }
      };
      reader.readAsText(f);
    });
    input.click();
  }

  function cambiarClave() {
    var m = modal("Cambiar contraseña");
    m.body.appendChild(el("p", "modal-note", "Escribe la nueva contraseña. Se generará una línea que debes pegar en data/site-data.js (campo claveHash) y subir al repositorio."));
    var p = document.createElement("input"); p.type = "text"; p.placeholder = "Nueva contraseña";
    m.body.appendChild(field("Nueva contraseña", p));
    var out = document.createElement("textarea"); out.rows = 3; out.readOnly = true; out.className = "hash-out";
    var gen = el("button", "button button-primary", "Generar");
    gen.type = "button";
    gen.addEventListener("click", async function () {
      if (!p.value) { alert("Escribe una contraseña."); return; }
      var h = await sha256(p.value);
      out.value = '    claveHash: "' + h + '"';
      // aplicar también en este navegador
      var d = Store.get(); d.admin = d.admin || clone(DEFAULTS.admin); d.admin.claveHash = h; Store.set(d);
    });
    var foot = el("div", "modal-foot"); foot.appendChild(gen);
    m.body.appendChild(foot);
    m.body.appendChild(field("Pega esta línea en site-data.js", out));
  }

  function refreshAll() {
    document.body.classList.toggle("is-admin", isAdmin());
    var fab = document.querySelector(".admin-fab");
    if (fab) fab.textContent = isAdmin() ? "⚙ Admin ✓" : "⚙ Admin";
    renderEquipo(); renderReflexiones(); renderDocs(); renderVideos();
  }

  /* ---------- menú móvil ---------- */
  function navToggle() {
    var toggle = document.querySelector(".menu-toggle");
    var navLinks = document.querySelector(".nav-links");
    if (!toggle || !navLinks) return;
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("is-open");
    });
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    navToggle();
    renderEquipo();
    renderReflexiones();
    renderDocs();
    renderVideos();
    buildAdminUI();
  });
})();
