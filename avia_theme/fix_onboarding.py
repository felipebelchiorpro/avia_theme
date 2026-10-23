import frappe

def fix_all_onboarding_links():
    frappe.db.begin()
    print("Limpando referências a Module Onboarding em todas as tabelas...")

    for tbl in ["tabWorkspace", "tabWorkspace Sidebar"]:
        try:
            frappe.db.sql(f"UPDATE `{tbl}` SET module_onboarding = '' WHERE module_onboarding IS NOT NULL AND module_onboarding != ''")
            print(f"[✓] {tbl} limpo com sucesso.")
        except Exception as e:
            print(f"[!] {tbl}: {e}")

    frappe.db.commit()
    print("[✓✓✓] Todas as travas de validação de Onboarding foram removidas com sucesso!")
