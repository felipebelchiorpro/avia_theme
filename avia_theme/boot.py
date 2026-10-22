# Copyright (c) 2026 Grupo Belchior
# License: MIT. See license.txt

import frappe

def boot_session(bootinfo):
	"""
	Sobrescreve informacoes de exibicao dos apps no Boot do Frappe
	para que o ERPNext apareca oficialmente como AVIA, com logo e titulo corretos
	tanto na tela de Apps (/app) quanto no Dock lateral flutuante.
	"""
	if "app_data" in bootinfo and isinstance(bootinfo["app_data"], list):
		for app in bootinfo["app_data"]:
			if app.get("app_name") == "erpnext":
				app["app_title"] = "AVIA"
				app["app_logo_url"] = "/assets/avia_theme/images/avia_app_icon.png"

	# Desativa tutoriais, tours de boas-vindas e modais de onboarding
	bootinfo["onboarding_disabled"] = 1
	if "user" in bootinfo and isinstance(bootinfo["user"], dict):
		bootinfo["user"]["onboarding_status"] = "{}"
