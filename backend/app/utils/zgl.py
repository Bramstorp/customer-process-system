import zebra
import qrcode
import socket

def print_label(ip_address, data=""):
    ip = '192.168.87.197'
    port = 9100

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((ip, port))

    zpl_code = "^XA^FO100,100^A0N,30^FDHello World!^FS^XZ"

    s.sendall(zpl_code.encode())

    s.close()
