const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.frc.utn.edu.ar/logon.frc');
  await page.screenshot({ path: 'screenshots/github.png' });
  
  browser.close();
}

run();