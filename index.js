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

  // 3. Crear CSV vacío con encabezados
  const csvFile = path.join(__dirname, "resultados.csv");
  fs.writeFileSync(csvFile, "Opcion,Ruta,Total\n");

  // 4. Abrir navegador
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://n8nsuper.sysadmin.siempre.net.co/webhook/consultas-internas"
  );

  // 5. Obtener el iframe
  const frame = page.frames()[1]; // iframe único

  // 6. Loop anidado: opciones × rutas
  for (const opcion of opciones) {
    for (const ruta of rutas) {
      await frame.locator("#selServidor").selectOption(opcion);
      await frame.locator("#txtBuscar").fill(ruta);
      await frame.locator("button.btn.btn-primary").click();

      // Espera fija de 2 segundos para que la página actualice
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Leer el total desde #totalRegistros
      const totalText = await frame.locator("#totalRegistros").innerText();
      const total = parseInt(totalText.replace(/\D/g, ""), 10);

      console.log(`Opción: ${opcion} → Ruta: ${ruta} → Total: ${total}`);

      // Guardar en CSV
      fs.appendFileSync(csvFile, `"${opcion}","${ruta}",${total}\n`);
    }
  }

  await browser.close();
  console.log(`\n✅ Resultados guardados en: ${csvFile}`);
})();
