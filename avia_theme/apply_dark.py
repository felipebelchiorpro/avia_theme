import frappe

def run():
    frappe.db.begin()
    frappe.db.set_value("User", "Administrator", "desk_theme", "Dark")
    frappe.db.commit()
    print("[✓] Tema do Administrador atualizado para Dark com sucesso!")
