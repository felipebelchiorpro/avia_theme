import frappe

def verify_clean():
    workspaces_with_onboarding = frappe.get_all("Workspace", filters={"module_onboarding": ["is", "set"]}, fields=["name", "module_onboarding"])
    print(f"Workspaces com module_onboarding preenchido: {len(workspaces_with_onboarding)}")
    if workspaces_with_onboarding:
        for w in workspaces_with_onboarding:
            print(f" - {w.name}: {w.module_onboarding}")
    else:
        print("[✓✓✓] PERFEITO! Nenhum Espaço de Trabalho possui mais vínculo com tutoriais/onboarding.")
