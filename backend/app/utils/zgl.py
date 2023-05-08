import zebra
import qrcode
import socket

def print_label(ip_address, kode=""):
    zpl = f"""
    ^XA
    ^FO50,50
    ^A0N,50,50
    ^FD{kode}^FS
    """

    qr = qrcode.QRCode(version=1, box_size=10, border=1)
    qr.add_data(kode)
    qr.make(fit=True)

    zpl += f"^FO50,100\n^BQN,2,10\n^FDLA,{qr.get_png_as_base64_str(scale=5)}^FS\n"

    zpl += "^XZ\n"

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((ip_address, 9100))

    s.send(zpl.encode('utf-8'))
    s.close()
