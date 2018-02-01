const puppeteer = require('puppeteer');
const CREDS = require('./creds');

// Elementos del DOM
const USUARIO_SELECTOR = '#txtUsuario';
const PASSWORD_SELECTOR = '#pwdClave';
const DOMINIO_SELECTOR = '#txtDominios';
const MODO_SELECTOR = '#chk2'; // Autogestión
const BUTTON_SELECTOR = '#btnEnviar';

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Login
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
  await page.waitForNavigation();

  browser.close();
}

run();