# UTN FRC Scraper
## Busca tus notas, chequea si hay novedades y avisa al alumno.
### Herramientas: 
- Puppeteer: libería para controlar Chrome/Chromium *headless*.
- NodeJS
- MongoDB: base de datos NoSQL.
- VS Code: IDE.
- Mocha: framework de pruebas.
### Funcionalidades
- Toma automáticamente todas las notas del año lectivo.
- Compara con las notas antes guardadas en la base de datos.
- Guarda las nuevas notas si hay novedades.
- Abre el sitio de la Facultad si existen nuevas notas.
### Requerimientos
- Mongo DB (https://www.mongodb.com/es)
- NodeJS v. 9.8.4 (https://nodejs.org/es/)

### Credenciales

Guardar credenciales en un archivo *creds.js* de la forma:

>module.exports = {
>    usuario: 'tuLegajo',
>    dominio: 'tuCarrera',
>    password: 'tuContraseña'
>}

### Calendarización

Se aprovecha calendarizando el proceso en el sistema operativo utilizado, para que haga el ingreso cada determinado tiempo.