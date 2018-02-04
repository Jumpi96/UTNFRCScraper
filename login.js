const puppeteer = require('puppeteer');
const CREDS = require('./creds');

// Elementos del DOM
// 1-Login
const USUARIO_SELECTOR = '#txtUsuario';
const PASSWORD_SELECTOR = '#pwdClave';
const DOMINIO_SELECTOR = '#txtDominios';
const MODO_SELECTOR = '#chk2'; // Autogestión
const BUTTON_SELECTOR = '#btnEnviar';
// 2-Entrada al primero
const PRIMERA_SELECTOR = "#table-1 > tbody > tr:nth-child(1) > td:nth-child(9) > a";
const NOTA_SELECTOR = "#ps > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2) > p";
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
  //await page.waitForNavigation();
  await page.waitFor(TIMEOUT);
  console.log("Logueado.");
  // 2-Entrando al primero
  var enlace;
  var materia;
  var selector;
  var nota;
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
    console.log(materia);
    for (j=2; j <= 12; j++) {
      selector = "#ps > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(" + j + ") > p";
      nota = await page.evaluate((selector) => 
        document.querySelector(selector).innerText, selector);
      
      if (!isNaN(nota))
        console.log(nota);
    }
    await page.goBack();
    //await page.waitFor(TIMEOUT);
  }
  browser.close();
}

run();