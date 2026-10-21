/* ==========================================================================
   AVIA DESK THEME HELPER - JavaScript Bridge
   Identidade Oficial AVIA: Substitui ícones legados do ERPNext,
   aplica logo preto elegante e monta recursos visuais de apoio.
   ========================================================================== */

(function () {
  "use strict";

  // 1. Intercepta e normaliza boot info e helpers do Frappe
  function patchFrappeAppMeta() {
    if (window.frappe && frappe.boot && Array.isArray(frappe.boot.app_data)) {
      frappe.boot.app_data.forEach(function (app) {
        if (app.app_name === "erpnext" || app.app_title === "ERPNext") {
          app.app_title = "AVIA";
          app.app_logo_url = "/assets/avia_theme/images/avia_app_icon.png";
        }
      });
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
    // Substitui logo do topo (Navbar): troca por logo preto elegante
    document.querySelectorAll(".navbar-brand img, .app-logo, header.navbar img.app-logo").forEach(function (img) {
      if (!img.src.includes("avia_logo_black.png")) {
        img.src = "/assets/avia_theme/images/avia_logo_black.png";
        img.style.maxHeight = "32px";
        img.style.objectFit = "contain";
      }
    });

    // Se o navbar-brand possuir texto/HTML com cor verde legada, ajusta para o tom preto/grafite elegante
    document.querySelectorAll(".navbar-brand span, .navbar-brand a").forEach(function (el) {
      if (el.style && (el.style.color === "rgb(118, 255, 3)" || el.style.color === "#76FF03")) {
        el.style.color = "#181b22";
      }
    });

    // Substitui o ícone do ERPNext (quadrado azul com 'E') no Dock e na tela de Apps
    document.querySelectorAll('img[src*="erpnext-logo"], img[src*="erpnext"]').forEach(function (img) {
      if (!img.src.includes("avia_app_icon")) {
        img.src = "/assets/avia_theme/images/avia_app_icon.png";
        img.alt = "AVIA";
        img.style.borderRadius = "14px";
      }
    });

    // Substitui títulos "ERPNext" nos cards da tela de apps
    document.querySelectorAll(".icons-container .icon-card, .icons-container .icon-box, .app-card").forEach(function (card) {
      const title = card.querySelector(".icon-title, .app-title, span");
      if (title && title.textContent.trim() === "ERPNext") {
        title.textContent = "AVIA";
      }
    });

    // Substitui logo no cabeçalho do Dock nativo do Frappe
    document.querySelectorAll(".dock-logo .header-logo img, .shell-header .header-logo img").forEach(function (img) {
      if (!img.src.includes("avia_app_icon")) {
        img.src = "/assets/avia_theme/images/avia_app_icon.png";
        img.alt = "AVIA";
        img.style.borderRadius = "12px";
      }
    });

    // Atualiza título da aba se contiver ERPNext
    if (document.title.includes("ERPNext")) {
      document.title = document.title.replace("ERPNext", "AVIA");
    }
  }

  function initAviaDock() {
    if (document.getElementById("avia-floating-dock")) return;
    if (!document.body.classList.contains("full-width") && window.location.pathname.startsWith("/app")) {
      const dock = document.createElement("aside");
      dock.id = "avia-floating-dock";
      dock.innerHTML = `
        <div class="avia-dock-top">
          <a href="/app" class="avia-dock-logo-btn" data-tooltip="AVIA Início">
            <img src="/assets/avia_theme/images/avia_app_icon.png" alt="AVIA" style="border-radius:10px; width:32px; height:32px;" />
          </a>
          <nav class="avia-dock-menu">
            <a href="/app/home" class="avia-dock-item active" data-tooltip="Início">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </a>
            <a href="/app/workspaces" class="avia-dock-item" data-tooltip="Áreas de Trabalho">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect width="7" height="7" x="3" y="3" rx="1"/>
                <rect width="7" height="7" x="14" y="3" rx="1"/>
                <rect width="7" height="7" x="14" y="14" rx="1"/>
                <rect width="7" height="7" x="3" y="14" rx="1"/>
              </svg>
            </a>
            <a href="/app/modules" class="avia-dock-item" data-tooltip="Módulos & ERP">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .98 1.72l6.05 3.96a2 2 0 0 0 2.14.02l9.95-6.12a2 2 0 0 0 .98-1.7V8.1a2 2 0 0 0-.88-1.7Z"/>
              </svg>
            </a>
            <a href="/app/workspace/Contabilidade" class="avia-dock-item" data-tooltip="Contabilidade">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                <path d="M12 18V6"/>
              </svg>
            </a>
            <a href="/app/workspace/Vendas" class="avia-dock-item" data-tooltip="Vendas & CRM">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </a>
          </nav>
        </div>
        <div class="avia-dock-bottom">
          <button type="button" class="avia-dock-settings-btn" id="avia-btn-settings" data-tooltip="Configurações">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      `;
      document.body.appendChild(dock);

      document.getElementById("avia-btn-settings")?.addEventListener("click", function () {
        const userDropdown = document.querySelector(".dropdown-navbar-user .dropdown-toggle");
        if (userDropdown) {
          userDropdown.click();
        } else {
          window.location.href = "/app/user-profile";
        }
      });
    }
  }

  function injectUserProfileCard() {
    const sidebar = document.querySelector(".layout-side-section .desk-sidebar, .desk-sidebar");
    if (sidebar && !sidebar.querySelector(".avia-user-profile-card")) {
      const user = (window.frappe && window.frappe.session && window.frappe.session.user) || "admin";
      const fullName = (window.frappe && window.frappe.user && window.frappe.user.full_name()) || (window.frappe && window.frappe.session && window.frappe.session.user_fullname) || "Equipe AVIA";
      const initial = fullName.charAt(0).toUpperCase();

      const profileCard = document.createElement("div");
      profileCard.className = "avia-user-profile-card";
      profileCard.innerHTML = `
        <div class="avia-user-avatar">${initial}</div>
        <div class="avia-user-info">
          <span class="avia-user-name">${fullName} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg></span>
          <span class="avia-user-email">${user}</span>
        </div>
      `;

      profileCard.addEventListener("click", function () {
        const userDropdown = document.querySelector(".dropdown-navbar-user .dropdown-toggle");
        if (userDropdown) userDropdown.click();
      });

      sidebar.prepend(profileCard);
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
    initAviaDock();
    injectUserProfileCard();
    applyPortugueseTranslations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      runLoop();
      setInterval(runLoop, 800);
    });
  } else {
    runLoop();
    setInterval(runLoop, 800);
  }
})();
