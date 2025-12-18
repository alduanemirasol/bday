import socket
import qrcode
import http.server
import socketserver
import threading

PORT = 8001

ip = socket.gethostbyname(socket.gethostname())
url = f"http://{ip}:{PORT}"

print("Server:", url)

qr = qrcode.QRCode(border=1)
qr.add_data(url)
qr.make(fit=True)
qr.print_ascii(invert=True)

Handler = http.server.SimpleHTTPRequestHandler

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

threading.Thread(target=start_server, daemon=True).start()

input("Server running. Press Enter to stop...\n")
