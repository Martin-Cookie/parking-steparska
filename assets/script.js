/* ==========================================================================
   Parking Štěpařská — chování stránky
   Bez frameworků a bez závislostí.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var $  = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- 1. JAZYK
     Čeština je v HTML. Při načtení si ji uložíme, takže není nikde duplikovaná.
     Angličtina se bere z assets/i18n.js. Volba jazyka se drží v adrese (?lang=en).
  ------------------------------------------------------------------------- */

  var EN = window.I18N_EN || {};
  var CS_RUNTIME = window.I18N_CS_RUNTIME || {};
  var CS = {};                       // doplní se z HTML
  var lang = "cs";

  var textNodes = $$("[data-i18n]");
  var phNodes   = $$("[data-i18n-placeholder]");

  textNodes.forEach(function (el) { CS[el.dataset.i18n] = el.textContent.trim(); });
  phNodes.forEach(function (el) { CS[el.dataset.i18nPlaceholder] = el.placeholder; });
  Object.keys(CS_RUNTIME).forEach(function (k) { CS[k] = CS_RUNTIME[k]; });

  function t(key) {
    var dict = lang === "en" ? EN : CS;
    return (key in dict) ? dict[key] : (CS[key] || key);
  }

  function setLang(next, pushUrl) {
    lang = (next === "en") ? "en" : "cs";
    var dict = lang === "en" ? EN : CS;

    textNodes.forEach(function (el) {
      var v = dict[el.dataset.i18n];
      if (v) { el.textContent = v; }
    });
    phNodes.forEach(function (el) {
      var v = dict[el.dataset.i18nPlaceholder];
      if (v) { el.placeholder = v; }
    });

    doc.documentElement.lang = lang;
    if (dict["meta.title"]) { doc.title = dict["meta.title"]; }
    var md = $('meta[name="description"]');
    if (md && dict["meta.desc"]) { md.content = dict["meta.desc"]; }

    $$(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });

    applyAvailability();   // musí běžet po překladu, přepisuje některé texty

    if (pushUrl && window.history && history.replaceState) {
      var url = new URL(window.location.href);
      if (lang === "en") { url.searchParams.set("lang", "en"); }
      else { url.searchParams.delete("lang"); }
      history.replaceState(null, "", url.toString());
    }
  }

  /* ------------------------------------------------------- 1b. VOLNÁ MÍSTA
     Počet je uložený jen na jednom místě — v atributu data-volnych
     u odznáčku v index.html. Všechno ostatní se dopočítá tady.
  ------------------------------------------------------------------------- */

  var availEl = $("#dostupnost");
  var free  = availEl ? parseInt(availEl.dataset.volnych, 10) : NaN;
  var total = availEl ? parseInt(availEl.dataset.celkem, 10) : NaN;
  if (isNaN(free))  { free = null; }        // neuvedeno → necháme obecný text
  if (isNaN(total)) { total = 20; }

  var isFull = free === 0;

  // Texty, které se při obsazeném parkovišti nahradí jinými.
  var FULL_SWAPS = {
    "cta.inquiry":   "cta.inquiry.full",
    "contact.title": "contact.title.full",
    "contact.lead":  "contact.lead.full",
    "form.submit":   "form.submit.full"
  };

  function availKey() {
    if (free === 0) { return "avail.0"; }
    if (free === 1) { return "avail.1"; }
    return (free >= 2 && free <= 4) ? "avail.few" : "avail.many";
  }

  function applyAvailability() {
    if (!availEl) { return; }

    if (free !== null) {
      var txt = t(availKey())
        .replace("{free}", String(free))
        .replace("{total}", String(total));
      $(".badge__text", availEl).textContent = txt;
    }
    availEl.classList.toggle("badge--full", isFull);

    // Při obsazeném parkovišti přepneme výzvy na pořadník.
    Object.keys(FULL_SWAPS).forEach(function (key) {
      var el = doc.querySelector('[data-i18n="' + key + '"]');
      if (!el) { return; }
      el.textContent = isFull ? t(FULL_SWAPS[key]) : t(key);
    });
  }

  $$(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang, true); });
  });

  // Jazyk z adresy při načtení
  try {
    if (new URLSearchParams(window.location.search).get("lang") === "en") {
      setLang("en", false);
    }
  } catch (e) { /* starý prohlížeč — zůstane čeština */ }

  // První vykreslení počtu volných míst (setLang se výše nemusel spustit).
  applyAvailability();

  /* ------------------------------------------------------------- 2. HLAVIČKA */

  var header = $("#header");
  var onScroll = function () {
    header.classList.toggle("is-stuck", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var nav = $("#nav");
  var navToggle = $("#navToggle");
  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ------------------------------------------- 3. CHYBĚJÍCÍ FOTKY (placeholder)
     Dokud nejsou fotky nahrané ve složce images/, ukáže se místo nich
     jemný zástupný obrázek, aby se layout nerozsypal.
  ------------------------------------------------------------------------- */

  $$(".frame > img").forEach(function (img) {
    var mark = function () { img.closest(".frame").classList.add("is-missing"); };
    if (img.complete && img.naturalWidth === 0) { mark(); }
    img.addEventListener("error", mark);
  });

  /* --------------------------------------------------------------- 4. LIGHTBOX */

  var lb = $("#lightbox");
  var lbImg = $("#lightboxImg");
  var lastFocus = null;

  function openLb(src, alt) {
    lastFocus = doc.activeElement;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.classList.add("is-open");
    doc.body.style.overflow = "hidden";
    $("#lightboxClose").focus();
  }
  function closeLb() {
    lb.classList.remove("is-open");
    lbImg.src = "";
    doc.body.style.overflow = "";
    if (lastFocus) { lastFocus.focus(); }
  }

  $$("[data-zoom]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var inner = $("img", btn);
      if (inner && inner.naturalWidth === 0) { return; }   // foto ještě není
      openLb(btn.dataset.zoom, inner ? inner.alt : "");
    });
  });
  $("#lightboxClose").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) { closeLb(); } });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lb.classList.contains("is-open")) { closeLb(); }
  });

  /* --------------------------------------------------------------- 5. FORMULÁŘ */

  var form = $("#inquiry");
  var statusBox = $("#formStatus");
  var submitBtn = $("#submitBtn");
  var submitLabel = $("span", submitBtn);
  var submitLabelCsKey = "form.submit";

  var ICON_OK = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.5 2.5L16 9.5"/></svg>';
  var ICON_ERR = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4.5M12 15.6v.4"/></svg>';

  function say(kind, msg) {
    statusBox.dataset.kind = kind;
    statusBox.innerHTML = (kind === "ok" ? ICON_OK : ICON_ERR) + "<span></span>";
    $("span", statusBox).textContent = msg;
    statusBox.classList.add("is-shown");
  }
  function clearSay() { statusBox.classList.remove("is-shown"); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearSay();

    var data = {
      name:    form.name.value.trim(),
      phone:   form.phone.value.trim(),
      email:   form.email.value.trim(),
      plan:    form.plan.value,
      message: form.message.value.trim(),
      lang:    lang,
      _gotcha: form._gotcha.value
    };

    if (!data.name || !data.phone) {
      say("err", t("form.errRequired"));
      (data.name ? form.phone : form.name).focus();
      return;
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
      say("err", t("form.errEmail"));
      form.email.focus();
      return;
    }

    submitBtn.disabled = true;
    submitLabel.textContent = t("form.sending");

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (!res.ok) { throw new Error("HTTP " + res.status); }
        return res.json().catch(function () { return {}; });
      })
      .then(function () {
        form.reset();
        say("ok", t(isFull ? "form.ok.full" : "form.ok"));
      })
      .catch(function () {
        say("err", t("form.errSend"));
      })
      .then(function () {
        submitBtn.disabled = false;
        submitLabel.textContent = t(isFull ? "form.submit.full" : submitLabelCsKey);
      });
  });
})();
