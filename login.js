const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const Materia = require('./model/materias');
const Novedad = require('./model/novedades');
const funciones = require('./funciones');

const TIMEOUT = 5000;

async function run() {
  const browser = await puppeteer.launch();
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
  console.log("Logueado.");

  var enlace;
  var materia;
  var selector;
  var nota;
  var mas_materias=true;
  var lista_materias = [];
  const enlace_materia = "#iz > table > tbody > tr > td.tTit";
  var i = 1;
  // 2-Ciclo sobre cada materia.
  while (mas_materias){
    enlace = "#table-1 > tbody > tr:nth-child(" + i + ") > td:nth-child(9) > a";
    page.evaluate((enlace) => {
      document.querySelector(enlace).click();},enlace)
        .then((res) => {}).catch((error) => {
      console.log("Cacheado.");
      mas_materias = false;
    });
    await page.waitFor(TIMEOUT);
    if (mas_materias){
      materia = await page.evaluate((enlace_materia) =>
          document.querySelector(enlace_materia).innerText, enlace_materia);

          materia = funciones.get_nombre_materia(materia);
      console.log(materia);
      var objMateria = new Materia({nombre: materia, notas: []});
      //3-ciclo sobre cada nota.
      for (j=2; j <= 12; j++) {
        selector = "#ps > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(" + j + ") > p";
        nota = await page.evaluate((selector) => 
          document.querySelector(selector).innerText, selector);
        if (!isNaN(nota))
          objMateria.notas.push(nota);
      }
      lista_materias.push(objMateria);
      i += 2;
      await page.goBack();
    }
    else
      break;
  }
  browser.close();
  resultado = lista_materias;
  funciones.obtener_novedades(resultado);
}

run();
