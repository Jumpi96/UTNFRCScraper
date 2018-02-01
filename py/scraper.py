from bs4 import BeautifulSoup
from robobrowser import RoboBrowser

browser = RoboBrowser(history=True)
browser.open("https://www.frc.utn.edu.ar/logon.frc")

form = browser.get_form()
form['txtUsuario'].value = '68226'
form['txtDominios'].value = 'sistemas'
form['pwdClave'].value = 'elMago0130396'
browser.submit_form(form, submit='btnEnviar')

p = browser.parsed()
f = open("file.txt","w+",encoding = 'UTF-8')
f.write(str(p))
f.flush()
f.close()