const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const Materia = require('./entidades');
const Materias = require('./model/modelsmon');

// Elementos del DOM
const USUARIO_SELECTOR = '#txtUsuario';
const PASSWORD_SELECTOR = '#pwdClave';
const DOMINIO_SELECTOR = '#txtDominios';
const MODO_SELECTOR = '#chk2'; // Autogestión
const BUTTON_SELECTOR = '#btnEnviar';
const TIMEOUT=3000;

function getNombreMateria(cadena){
  return cadena.substr(23, cadena.length-23);
}

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // 1-Login
  await page.goto('https://www.frc.utn.edu.ar/logon.frc',
    {
        timeout:0
    });
  await page.click(USUARIO_SELECTOR);
  await page.keyboard.type(CREDS.usuario);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);
  await page.click(DOMINIO_SELECTOR);
  await page.keyboard.type(CREDS.dominio);
  await page.click(MODO_SELECTOR);
  await page.click(BUTTON_SELECTOR);
  await page.waitFor(TIMEOUT);
  console.log("Logueado.");

  var enlace;
  var materia;
  var selector;
  var nota;
  var lista_materias = [];
  const enlace_materia = "#iz > table > tbody > tr > td.tTit";
  for (i=1; i<= 15; i+=2){
    enlace = "#table-1 > tbody > tr:nth-child(" + i + ") > td:nth-child(9) > a";
    await page.evaluate((enlace) => {
      document.querySelector(enlace).click();
    }, enlace);
    await page.waitFor(TIMEOUT);
    //await page.waitForNavigation();
    //await page.screenshot({ path: 'screenshots/primera.png' });
    materia = await page.evaluate((enlace_materia) =>
        document.querySelector(enlace_materia).innerText, enlace_materia);
    materia = getNombreMateria(materia);
    //console.log(materia);
    let objMateria = new Materia(materia);
    for (j=2; j <= 12; j++) {
      selector = "#ps > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(" + j + ") > p";
      nota = await page.evaluate((selector) => 
        document.querySelector(selector).innerText, selector);
      
      if (!isNaN(nota))
        objMateria.notas.push(nota);
    }
    lista_materias.push(objMateria);
    await page.goBack();
  }
  console.log("Materias: " & lista_materias.length & ".");
  browser.close();
  return lista_materias;
}

function obtener_novedades(materias){
  var novedades = [];
  var guardadas = []; //TODO: Traer de MongoDB
  if (materias.length === guardadas.length)
    for(i=0;i<materias.length;i++)
      if(!materias[i].equals(guardadas[i]))
        if(materias[i].nombre === guardadas[i].nombre)
          novedades.push("Hay cambios en " & materias[i].nombre & ".");
        else
          novedades.push("Hay cambios entre materias.");
    else
      novedades.push("Hay cambios entre materias.");
  return novedades;
}

function guardar_notas(materias){
  const DB_URL = '' //TODO: ?
  if (mongoose.connection.readyState == 0) { mongoose.connect(DB_URL); }
  return null; //TODO: limpiar MongoDB e insertar.
}

function avisar_novedades(novedades){
  require("openurl").open("https://www.frc.utn.edu.ar"); //TODO: notificacion en pantalla.
}

var resultado = run();
/*var novedades = hay_novedad(resultado);
if (novedades.length > 0) {
  guardar_notas(resultado);
  avisar_novedades(novedades);
}
*/