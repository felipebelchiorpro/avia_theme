app_name = "avia_theme"
app_title = "AVIA Theme"
app_publisher = "Grupo Belchior"
app_description = "Tema oficial e mascara visual do ERP AVIA"
app_email = "contato@grupobelchior.com.br"
app_license = "MIT"
app_logo_url = "/assets/avia_theme/images/avia_logo_black.png"

# Includes in Desk (Area administrativa e workspaces)
app_include_css = [
	"/assets/avia_theme/css/avia_desk_theme.css"
]
app_include_js = [
	"/assets/avia_theme/js/avia_desk_theme.js"
]

# Modifica bootinfo para atualizar a identidade dos apps (ERPNext -> AVIA)
extend_bootinfo = "avia_theme.boot.boot_session"

# Website settings / defaults
website_context = {
	"favicon": "/assets/avia_theme/images/avia_favicon.png",
	"splash_image": "/assets/avia_theme/images/avia_app_icon.png"
}
