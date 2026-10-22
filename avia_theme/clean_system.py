import frappe

def execute():
    """
    Limpa o sistema de dados demo e tutoriais padrao:
    - Remove Cargos (Designation)
    - Remove Departamentos (Department)
    - Remove Tipos de Contratacao (Employment Type)
    - Remove Filiais (Branch)
    - Desativa e remove Tutoriais, Tours e Onboardings
    """
    frappe.db.begin()
    print("Iniciando limpeza da base de dados...")

    # 1. Limpar Cargos (Designations)
    deleted_designations = frappe.db.sql("DELETE FROM `tabDesignation`")
    print(f"[*] Cargos removidos com sucesso.")

    # 2. Limpar Departamentos (Departments)
    # Manter ou zerar dependendo da estrutura
    try:
        frappe.db.sql("DELETE FROM `tabDepartment` WHERE is_group = 0")
        frappe.db.sql("DELETE FROM `tabDepartment` WHERE name != 'All Departments'")
        print(f"[*] Departamentos padrao removidos.")
    except Exception as e:
        print(f"[!] Erro ao limpar departamentos: {e}")

    # 3. Limpar Filiais e Tipos de Contratacao
    try:
        frappe.db.sql("DELETE FROM `tabBranch`")
        frappe.db.sql("DELETE FROM `tabEmployment Type`")
        print(f"[*] Filiais e Tipos de Contratacao removidos.")
    except Exception as e:
        print(f"[!] Erro ao limpar filiais: {e}")

    # 4. Desativar Onboarding / Tutoriais / Tours
    try:
        frappe.db.sql("DELETE FROM `tabOnboarding Step`")
        frappe.db.sql("DELETE FROM `tabModule Onboarding`")
        frappe.db.sql("DELETE FROM `tabForm Tour`")
        frappe.db.sql("UPDATE `tabUser` SET onboarding_status = '{}'")
        print(f"[*] Tutoriais e tours desativados.")
    except Exception as e:
        print(f"[!] Erro ao limpar onboarding: {e}")

    frappe.db.commit()
    print("[✓] Sistema 100% zerado e pronto para criacao do zero!")
