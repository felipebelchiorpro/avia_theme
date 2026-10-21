/* ==========================================================================
   AVIA DESK THEME HELPER - JavaScript Bridge
   Monta o Dock Escuro Lateral Flutuante & Tradução Dinâmica PT-BR
   ========================================================================== */

(function () {
  "use strict";

  function initAviaDock() {
    if (document.getElementById("avia-floating-dock")) return;
    if (!document.body.classList.contains("full-width") && window.location.pathname.startsWith("/app")) {
      const dock = document.createElement("aside");
      dock.id = "avia-floating-dock";
      dock.innerHTML = `
        <div class="avia-dock-top">
          <a href="/app" class="avia-dock-logo-btn" data-tooltip="AVIA Home">
            <img src="/files/avia_icon.png" alt="AVIA" />
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

      // Evento de clique para abrir as opções de configurações
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
    // Traduz marcadores e placeholders comuns na interface do Desk
    const searchInput = document.querySelector("#navbar-search");
    if (searchInput && searchInput.placeholder && searchInput.placeholder.includes("Search")) {
      searchInput.placeholder = "Buscar no sistema ou digitar comando...";
    }

    // Tradução de rótulos nos títulos de sidebar
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

  // Observer para reaplicar conforme rotas e views mudam
  function runLoop() {
    initAviaDock();
    injectUserProfileCard();
    applyPortugueseTranslations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      runLoop();
      setInterval(runLoop, 1500);
    });
  } else {
    runLoop();
    setInterval(runLoop, 1500);
  }
})();
