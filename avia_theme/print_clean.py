import frappe

def inspect_print():
    pf_all = frappe.get_all("Print Format", fields=["name", "doc_type", "standard", "disabled"])
    print(f"\nTotal Print Formats: {len(pf_all)}")
    custom = [p for p in pf_all if p.standard != "Yes"]
    std = [p for p in pf_all if p.standard == "Yes"]
    print(f"Custom (standard != Yes): {len(custom)}")
    for p in custom:
        print(f"  - {p.name} (for {p.doc_type}) [disabled={p.disabled}]")
    print(f"Standard (from app code): {len(std)}")
    for p in std[:15]:
        print(f"  - {p.name} (for {p.doc_type}) [disabled={p.disabled}]")
    if len(std) > 15:
        print(f"  ... and {len(std) - 15} more standard formats")

def wipe_print(disable_standard=True):
    print("Iniciando limpeza de Formatos de Impressão...")
    frappe.db.begin()

    # 1. Apagar todos os customizados
    deleted = frappe.db.sql("DELETE FROM `tabPrint Format` WHERE standard != 'Yes'")
    print(f"[✓] Formatos customizados apagados.")

    # 2. Desabilitar ou apagar os padrões se solicitado
    # Se desabilitarmos os standard (disabled = 1), eles param de aparecer na lista do usuário e nas opções de impressão!
    # Ou se o usuário quiser deletar da tabela tabPrint Format:
    # Se deletarmos de tabPrint Format, eles somem completamente da lista de Formatos de Impressão!
    # (Arquivos no disco do app só recarregam se der bench migrate)
    count_deleted_all = frappe.db.sql("DELETE FROM `tabPrint Format`")
    print(f"[✓] Todos os registros de 'tabPrint Format' foram removidos do banco de dados!")

    # 3. Limpar outros itens de impressão:
    for dt in ["Print Heading", "Letter Head", "Cheque Print Template", "Print Format Field Template"]:
        try:
            frappe.db.sql(f"DELETE FROM `tab{dt}`")
            print(f"[✓] {dt} 100% zerado.")
        except Exception as e:
            print(f"[!] {dt}: {e}")

    frappe.db.commit()
    print("[✓✓✓] FORMATOS DE IMPRESSÃO 100% LIMPOS E ZERADOS!")
