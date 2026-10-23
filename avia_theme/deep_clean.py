import frappe

def check_workspace_fields():
    meta = frappe.get_meta("Workspace")
    for f in meta.fields:
        if "onboard" in f.fieldname.lower() or "integra" in (f.label or "").lower() or f.options == "Module Onboarding":
            print(f"FOUND: fieldname='{f.fieldname}', label='{f.label}', options='{f.options}', type='{f.fieldtype}'")
    
    # Also list all fields linking to Module Onboarding across all DocTypes
    print("\nScanning all DocTypes for links to Module Onboarding...")
    for dt in frappe.get_all("DocType", pluck="name"):
        try:
            m = frappe.get_meta(dt)
            for f in m.fields:
                if f.options == "Module Onboarding":
                    print(f"DocType '{dt}' -> field '{f.fieldname}' (label: '{f.label}')")
        except Exception:
            pass

def fix_workspace_onboarding():
    print("Corrigindo referencias de onboarding nos Espaços de Trabalho (Workspaces)...")
    frappe.db.begin()
    
    meta = frappe.get_meta("Workspace")
    onboarding_field = None
    for f in meta.fields:
        if f.options == "Module Onboarding" or "onboard" in f.fieldname.lower():
            onboarding_field = f.fieldname
            print(f"Campo identificado em Workspace: '{f.fieldname}'")
            break
            
    if onboarding_field:
        frappe.db.sql(f"UPDATE `tabWorkspace` SET `{onboarding_field}` = '' WHERE `{onboarding_field}` IS NOT NULL AND `{onboarding_field}` != ''")
        print(f"[✓] Campo '{onboarding_field}' zerado em todos os Workspaces!")
    else:
        print("[!] Nenhum campo direto encontrado em Workspace. Verificando children ou tabelas relacionadas...")

    # Se Module Onboarding foi deletado, mas algum Workspace ainda precisa existir ou se recriamos os registros de Module Onboarding vazios:
    # Se criarmos os registros básicos de Module Onboarding (ou dummy) caso o core do ERPNext precise deles:
    # Mas o melhor é zerar o link no Workspace!
    frappe.db.commit()
    print("[✓✓✓] Concluído!")
