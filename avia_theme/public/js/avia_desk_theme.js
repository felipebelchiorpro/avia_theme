/* ==========================================================================
   AVIA DESK THEME HELPER - JavaScript Bridge
   Identidade Oficial AVIA: Substitui ícones legados do ERPNext,
   aplica logo corporativo e garante tema escuro.
   ========================================================================== */

(function () {
  "use strict";

  // 1. Intercepta e normaliza boot info e helpers do Frappe
  function patchFrappeAppMeta() {
    if (window.frappe && frappe.boot) {
      if (Array.isArray(frappe.boot.app_data)) {
        frappe.boot.app_data.forEach(function (app) {
          if (app.app_name === "erpnext" || app.app_title === "ERPNext") {
            app.app_title = "AVIA";
            app.app_logo_url = "/assets/avia_theme/images/avia_app_icon.png";
          }
        });
      }
      if (frappe.boot.user) {
        frappe.boot.user.desk_theme = "Dark";
      }
    }

    if (window.frappe && frappe.utils && !frappe.utils._avia_patched) {
      frappe.utils._avia_patched = true;
      const original_app_logo = frappe.utils.app_logo;
      frappe.utils.app_logo = function (app) {
        if (app && (app.app_name === "erpnext" || app.app_title === "ERPNext" || app.app_title === "AVIA")) {
          return {
            icon: `<img src="/assets/avia_theme/images/avia_app_icon.png" alt="AVIA" style="border-radius:12px; width:100%; height:100%; object-fit:contain;" />`,
            title: "AVIA",
          };
        }
        return original_app_logo ? original_app_logo.apply(this, arguments) : null;
      };
    }
  }

  // 2. Substitui elementos visuais do ERPNext no DOM (cards /app, dock lateral e navbar)
  function applyAviaBranding() {
    // Garante que o documento tenha data-theme="dark"
    if (document.documentElement && document.documentElement.getAttribute("data-theme") !== "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    // Substitui logo do topo (Navbar): troca por logo branco oficial AVIA
    document.querySelectorAll(".navbar-brand img, .app-logo, header.navbar img.app-logo").forEach(function (img) {
      if (!img.src.includes("avia_logo_clean_white.png")) {
        img.src = "/assets/avia_theme/images/avia_logo_clean_white.png";
        img.style.maxHeight = "28px";
        img.style.objectFit = "contain";
      }
    });

    // Substitui o primeiro item do Dock (quadrado azul com 'E' do ERPNext) pelo Squircle Oficial AVIA
    const dockItems = document.querySelectorAll(".dock-item, button.dock-item");
    dockItems.forEach(function (item, idx) {
      const label = item.getAttribute("aria-label") || "";
      if (idx === 0 || label === "ERPNext" || label === "Configuração") {
        const iconContainer = item.querySelector(".dock-item-icon");
        if (iconContainer && !iconContainer.querySelector(".avia-custom-dock-icon")) {
          iconContainer.innerHTML = '<img class="avia-custom-dock-icon" src="/assets/avia_theme/images/avia_app_icon.png" style="width:34px; height:34px; border-radius:10px; object-fit:contain; box-shadow:0 3px 10px rgba(0,0,0,0.3);" alt="AVIA" />';
        }
      }
    });

    // Substitui o ícone do ERPNext em qualquer outra imagem de logo
    document.querySelectorAll('img[src*="erpnext-logo"], img[src*="erpnext"]').forEach(function (img) {
      if (!img.src.includes("avia_app_icon")) {
        img.src = "/assets/avia_theme/images/avia_app_icon.png";
        img.alt = "AVIA";
        img.style.borderRadius = "12px";
      }
    });

    // Substitui títulos "ERPNext" nos cards e textos
    document.querySelectorAll(".icons-container .icon-card, .icons-container .icon-box, .app-card").forEach(function (card) {
      const title = card.querySelector(".icon-title, .app-title, span");
      if (title && title.textContent.trim() === "ERPNext") {
        title.textContent = "AVIA";
      }
    });

    // Atualiza título da aba se contiver ERPNext
    if (document.title.includes("ERPNext")) {
      document.title = document.title.replace("ERPNext", "AVIA");
    }
  }

  function applyPortugueseTranslations() {
    const searchInput = document.querySelector("#navbar-search");
    if (searchInput && searchInput.placeholder && searchInput.placeholder.includes("Search")) {
      searchInput.placeholder = "Buscar no sistema ou digitar comando...";
    }

    document.querySelectorAll(".sidebar-label, .standard-sidebar-label").forEach(function (el) {
      const txt = el.textContent.trim().toLowerCase();
      if (txt === "workspaces" || txt === "workspace") el.textContent = "ÁREAS DE TRABALHO";
      if (txt === "modules") el.textContent = "MÓDULOS";
      if (txt === "projects") el.textContent = "PROJETOS";
      if (txt === "administration") el.textContent = "ADMINISTRAÇÃO";
      if (txt === "history") el.textContent = "HISTÓRICO";
      if (txt === "documents") el.textContent = "DOCUMENTOS";
    });
  }

  function runLoop() {
    patchFrappeAppMeta();
    applyAviaBranding();
    applyPortugueseTranslations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      runLoop();
      setInterval(runLoop, 600);
    });
  } else {
    runLoop();
    setInterval(runLoop, 600);
  }
})();
