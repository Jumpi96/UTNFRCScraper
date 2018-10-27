const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const Materia = require('./model/materias');
const funciones = require('./funciones');
const JsonDB = require('node-json-db');

var db = new JsonDB("DB", true, true);
const TIMEOUT = 5000;

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser'
  });
  const page = await browser.newPage();
  
  // 1-Login
  await page.goto('https://www.frc.utn.edu.ar/logon.frc',
    {
        timeout:0
    });
  await page.click('#txtUsuario');
  await page.keyboard.type(CREDS.usuario);
  await page.click('#pwdClave');
  await page.keyboard.type(CREDS.password);
  await page.click('#txtDominios');
  await page.keyboard.type(CREDS.dominio);
  await page.click('#chk2');
  await page.click('#btnEnviar');
  await page.waitFor(TIMEOUT);
  console.log("---Logueado.---");
  
  await page.click("#cmb1");
  await page.keyboard.type("2018");
  await page.keyboard.press('Enter');
  await page.waitFor(TIMEOUT);
  console.log("---Año seleccionado.---");

  var enlace, materia, selector, nota;
  var mas_materias = true;
  var lista_materias = [];
  var i = 1;
  // 2-Ciclo sobre cada materia.
  const enlace_materia = "#iz > table > tbody > tr > td.tTit";
  while (mas_materias){
    enlace = "#table-1 > tbody > tr:nth-child(" + i + ") > td:nth-child(9) > a";
    page.evaluate((enlace) => {
      document.querySelector(enlace).click();},enlace)
        .then((res) => {}).catch((error) => {
      console.log("---Fin de materias.---");
      mas_materias = false;
    });
    await page.waitFor(TIMEOUT);
    if (mas_materias){
      materia = await page.evaluate((enlace_materia) =>
          document.querySelector(enlace_materia).innerText, enlace_materia);

          materia = funciones.get_nombre_materia(materia);
      var nueva_materia = new Materia(materia);
      console.log(nueva_materia.nombre);

      //3-ciclo sobre cada nota.
      for (j=2; j <= 12; j++) {
        selector = "#ps > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(" + j + ") > p";
        nota = await page.evaluate((selector) => 
          document.querySelector(selector).innerText, selector);
        if (!isNaN(nota))
          nueva_materia.notas.push(nota);
      }
      lista_materias.push(nueva_materia);
      i += 2;
      await page.goBack();
    }
    else
      break;
  }
  browser.close();
  var novedades = funciones.obtener_novedades(db, lista_materias);
  if (novedades.length > 0)
  {
    funciones.guardar_notas(db, lista_materias);
    funciones.avisar_novedades(novedades); 
  }
}

try{
  run();
}
catch(error)
{
  console.log("No se pudo ejecutar.")
}

