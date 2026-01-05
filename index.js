const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const rutas = fs
    .readFileSync("rutas.txt", "utf8")
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://n8nsuper.sysadmin.siempre.net.co/webhook/consultas-internas"
  );

  // 1. Obtener el único iframe
  const frame = page.frames()[1]; // [0] es la página principal
  for (const ruta of rutas) {
    // Seleccionar opción y escribir ruta
    await frame.locator("#selServidor").selectOption("SINAI-PRINCIPAL");
    await frame.locator("#txtBuscar").fill(ruta);

    // Click en botón
    await frame.locator("button.btn.btn-primary").click();

    // Espera fija de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Leer el total desde #totalRegistros
    const totalText = await frame.locator("#totalRegistros").innerText();
    const total = parseInt(totalText.replace(/\D/g, ""), 10);

    console.log(`${ruta},${total}`);
  }

  await browser.close();
})();
