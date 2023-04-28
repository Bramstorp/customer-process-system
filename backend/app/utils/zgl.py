import zebra


def print_label(ip_address):
    printer = zebra.Printer(ip_address)

    zpl = """
    ^XA
    ^FO50,50
    ^A0N,50,50
    ^FDHello, World!^FS
    ^XZ
    """

    printer.send(zpl)
    printer.close()