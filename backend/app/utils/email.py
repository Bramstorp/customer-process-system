# import the necessary components first
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

port = 2525
smtp_server = "sandbox.smtp.mailtrap.io"
login = "fc6c105aa56302"  # paste your login generated by Mailtrap
password = "2ab57da55dad47"  # paste your password generated by Mailtrap


# send your email
def send_email(source, orderid, company_name, customer):
    if not customer.email or not customer:
        return

    sender_email = f"selvbetjening@{company_name}.com"
    receiver_email = customer.email
    message = MIMEMultipart("alternative")
    message["Subject"] = "selvbetjening"
    message["From"] = sender_email
    message["To"] = receiver_email

    html = f"""\
    <html>
    <body>
        <p>Hi, {customer.name}<br>
        Din {source} er registrete med ordernummer: {orderid}</p>
    </body>
    </html>
    """

    text = f"""\
    Hi, {customer.name}
    Din {source} er registrete med ordernummer: {orderid}
    """

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    message.attach(part1)
    message.attach(part2)
    with smtplib.SMTP("smtp.mailtrap.io", 2525) as server:
        server.login(login, password)
        server.sendmail(sender_email, receiver_email, message.as_string())


print("Sent")
