import frappe

def inspect():
    tables_to_check = [
        "Company", "Department", "Designation", "Branch", "Employee", "Employee Group",
        "Role Profile", "Letter Head", "Print Heading", "Terms and Conditions",
        "Item Group", "Customer Group", "Supplier Group", "Territory",
        "Holiday List", "Notification", "Email Template",
        "Cost Center", "Warehouse"
    ]
    results = {}
    for dt in tables_to_check:
        try:
            records = frappe.get_all(dt, pluck="name")
            results[dt] = records
        except Exception as e:
            results[dt] = f"Error: {e}"
    
    print("\n================== SITUAÇÃO ATUAL DO SISTEMA ==================")
    for dt, val in results.items():
        if isinstance(val, list):
            count = len(val)
            items_str = ", ".join(val[:5]) if count > 0 else "NENHUM (100% ZERADO)"
            print(f"• {dt:20}: {count} registro(s) -> {items_str}")
        else:
            print(f"• {dt:20}: {val}")
    print("===============================================================\n")

def wipe():
    print("Iniciando limpeza total de cargos, departamentos, funções e layouts...")
    frappe.db.begin()

    # 1. Cargos (Designation) - 100% zerado
    try:
        frappe.db.sql("DELETE FROM `tabDesignation`")
        print("[✓] Cargos (Designation): 100% DELETADOS.")
    except Exception as e:
        print(f"[!] Designation: {e}")

    # 2. Departamentos (Department) - 100% zerado
    try:
        frappe.db.sql("DELETE FROM `tabDepartment` WHERE is_group = 0")
        frappe.db.sql("DELETE FROM `tabDepartment` WHERE parent_department IS NOT NULL AND parent_department != ''")
        print("[✓] Departamentos: 100% DELETADOS.")
    except Exception as e:
        print(f"[!] Department: {e}")

    # 3. Funções / Perfis de Papel (Role Profile)
    try:
        frappe.db.sql("DELETE FROM `tabRole Profile`")
        print("[✓] Funções / Perfis (Role Profile): 100% DELETADOS.")
    except Exception as e:
        print(f"[!] Role Profile: {e}")

    # 4. Filiais e Funcionarios
    for dt in ["Branch", "Employee", "Employee Group"]:
        try:
            frappe.db.sql(f"DELETE FROM `tab{dt}`")
            print(f"[✓] {dt}: 100% DELETADOS.")
        except Exception as e:
            print(f"[!] {dt}: {e}")

    # 5. Layouts de Email, Templates de Email e Timbrados
    for dt in ["Email Template", "Letter Head", "Print Heading", "Terms and Conditions", "Notification"]:
        try:
            frappe.db.sql(f"DELETE FROM `tab{dt}`")
            print(f"[✓] {dt}: 100% DELETADOS.")
        except Exception as e:
            print(f"[!] {dt}: {e}")

    # 6. Grupos de Itens, Clientes, Fornecedores e Territorios padrao
    for dt in ["Item Group", "Customer Group", "Supplier Group", "Territory"]:
        try:
            frappe.db.sql(f"DELETE FROM `tab{dt}` WHERE is_group = 0")
            print(f"[✓] {dt} demo: DELETADOS.")
        except Exception as e:
            print(f"[!] {dt}: {e}")

    # 7. Armazéns e Centros de Custo não-raiz
    try:
        frappe.db.sql("DELETE FROM `tabWarehouse` WHERE is_group = 0")
        print("[✓] Armazéns demo deletados.")
    except Exception as e:
        print(f"[!] Warehouse: {e}")

    try:
        frappe.db.sql("DELETE FROM `tabCost Center` WHERE is_group = 0")
        print("[✓] Centros de custo demo deletados.")
    except Exception as e:
        print(f"[!] Cost Center: {e}")

    # 8. Tours, Tutoriais e Onboarding
    for dt in ["Onboarding Step", "Onboarding Step Map", "Module Onboarding", "Form Tour", "Form Tour Step"]:
        try:
            frappe.db.sql(f"DELETE FROM `tab{dt}`")
            print(f"[✓] {dt} removido.")
        except Exception as e:
            print(f"[!] {dt}: {e}")

    try:
        frappe.db.sql("UPDATE `tabUser` SET onboarding_status = '{}'")
    except Exception as e:
        pass

    frappe.db.commit()
    print("[✓✓✓] LIMPEZA PROFUNDA CONCLUIDA COM SUCESSO!")
