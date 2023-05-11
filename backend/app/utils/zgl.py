import zebra
import qrcode
import socket

def print_label(ip_address, data="", kolli=""):
    ip = '192.168.87.197'
    port = 9100

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((ip, port))

    label = f"""
    ^XA

    ^FO140,15
    ^A0,40,40
    ^FD
    ordernummer : {data}
    ^FS

    ^FO140,60
    ^A0,40,40
    ^FD
    kolli: {kolli}
    ^FS

    ^XZ
    """
    s.sendall(label.encode())

    s.close()
