import zebra

# Opret forbindelse til printeren
printer = zebra.Printer('printer_ip_address')

# Definer ZPL-kode for etiketten
zpl = """
^XA
^FO50,50
^A0N,50,50
^FDHello, World!^FS
^XZ
"""

# Udskriv etiketten
printer.send(zpl)

# Luk forbindelsen til printeren
printer.close()