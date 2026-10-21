# Copyright (c) 2026 Grupo Belchior
# License: MIT. See license.txt

import frappe
from frappe.www.login import get_context as frappe_get_context

def get_context(context):
	# Obtem todo o contexto padrão do Frappe (tokens CSRF, provedores OAuth, etc.)
	context = frappe_get_context(context)
	context["app_name"] = "AVIA"
	context["title"] = "AVIA - Login"
	return context
