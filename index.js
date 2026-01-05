const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  // 1. Leer rutas
  const rutas = fs
    .readFileSync("rutas.txt", "utf8")
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);

  // 2. Valores reales del select
  const opciones = [
    "SINAI-PRINCIPAL",
    "ZAFIRO",
    "CONEXION21",
    "HEMEPA",
    "COLMARIA",
    "INMACULADA-GUAJIRA",
    "MARIAUXILIADORA-CIUDAD-BOLIVAR",
    "MICROSIC",
    "SIEMPRESERVER",
  ];

  // 3. Acumulador por ruta
  const totalesPorRuta = {};

  // 4. Abrir navegador
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://n8nsuper.sysadmin.siempre.net.co/webhook/consultas-internas"
  );

  // 5. Obtener iframe
  const frame = page.frames()[1];

  // 6. Loop opciones × rutas
  for (const ruta of rutas) {
    totalesPorRuta[ruta] = 0;

    for (const opcion of opciones) {
      await frame.locator("#selServidor").selectOption(opcion);
      await frame.locator("#txtBuscar").fill(ruta);
      await frame.locator("button.btn.btn-primary").click();

      // espera simple
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const totalText = await frame.locator("#totalRegistros").innerText();
      const total = parseInt(totalText.replace(/\D/g, ""), 10) || 0;

      totalesPorRuta[ruta] += total;

      console.log(`Ruta: ${ruta} ← ${opcion} → ${total}`);
    }
  }

  // 7. Generar CSV final
  const csvFile = path.join(__dirname, "resultados.csv");
  fs.writeFileSync(csvFile, "Ruta,Total\n");

  for (const [ruta, total] of Object.entries(totalesPorRuta)) {
    fs.appendFileSync(csvFile, `"${ruta}",${total}\n`);
  }

  await browser.close();

  console.log("\n✅ CSV generado por ruta:");
  console.table(totalesPorRuta);
})();
