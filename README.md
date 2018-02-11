# UTN FRC Scraper
## Busca tus notas, chequea si hay novedades y avisa al alumno.
### Herramientas: 
- Puppeteer: libería para controlar Chrome/Chromium *headless*.
- NodeJS
- node-json-db: base de datos JSON.
- VS Code: IDE.
- Mocha: framework de pruebas.
### Funcionalidades
- Toma automáticamente todas las notas del año lectivo.
- Compara con las notas antes guardadas en la base de datos.
- Guarda las nuevas notas si hay novedades.
- Envía correo con el aviso de las novedades.
### Requerimientos
- NodeJS v. 9.8.4 (https://nodejs.org/es/)

### Credenciales

Guardar credenciales en un archivo *creds.js* de la forma:

>module.exports = {
>    usuario: 'tuLegajo',
>    dominio: 'tuCarrera',
>    password: 'tuContraseña',
>    correo: 'tuMail'
>}

### Calendarización

Se aprovecha calendarizando el proceso en el sistema operativo utilizado, para que haga el ingreso cada determinado tiempo.
