📊 Consulta automática de rutas por servidor (Playwright)

Este proyecto automatiza consultas internas usando Playwright, recorriendo múltiples servidores y rutas, y genera un CSV final con el total acumulado por ruta, sin importar el servidor en el que se encuentre la información.

Está pensado para:

Auditorías

Validaciones internas

Cruces de información entre servidores

Generación de reportes rápidos

🧠 ¿Qué hace el script?

Lee un listado de rutas desde un archivo rutas.txt

Recorre cada ruta por todos los servidores disponibles

Ejecuta la consulta en la web interna

Obtiene el valor de #totalRegistros

Suma los resultados por ruta

Genera un archivo resultados.csv con el total final por cada ruta

📌 No se guarda información por servidor, solo el total acumulado por ruta.

📁 Estructura del proyecto
📦 proyecto
 ┣ 📜 index.js          # Script principal
 ┣ 📜 rutas.txt         # Listado de rutas a consultar
 ┣ 📜 resultados.csv    # Resultado final (se genera automáticamente)
 ┣ 📜 package.json
 ┗ 📜 README.md

📝 Ejemplo de rutas.txt
EvalProm/007/CopiarLogros.aspx
EvalProm/007/Indicadores.aspx
EvalProm/007/NotasEstudiante.aspx
EvalProm/008/Recuperaciones.aspx


Cada línea representa una ruta que será buscada en todos los servidores.

📊 Resultado final (resultados.csv)
Ruta,Total
EvalProm/007/CopiarLogros.aspx,135
EvalProm/007/Indicadores.aspx,143
EvalProm/007/NotasEstudiante.aspx,11
EvalProm/008/Recuperaciones.aspx,2

🚀 Inicialización del proyecto
1️⃣ Requisitos

Node.js v18 o superior

npm o yarn

2️⃣ Instalar dependencias
npm install playwright


Si es la primera vez que usas Playwright:

npx playwright install

3️⃣ Ejecutar el script
node index.js


El navegador se abrirá automáticamente (modo no headless) y comenzará el proceso.

⚙️ Funcionamiento interno (resumen técnico)

Se usa Chromium vía Playwright

Se interactúa con un iframe

Se selecciona cada servidor desde un <select>

Se envía la ruta al buscador

Se espera un cambio real en el DOM (#totalRegistros)

Se acumulan los totales en memoria

El CSV se genera una sola vez al final

🛠️ Configuración editable

Dentro del script puedes modificar fácilmente:

🗂️ Lista de servidores (opciones)

📄 Archivo de rutas (rutas.txt)

🌐 URL del sistema

🤖 Modo headless (true / false)

⚠️ Notas importantes

El script asume que el iframe es único en la página

Si la estructura HTML cambia, puede ser necesario ajustar selectores

Uso recomendado en entornos internos o controlados


🧑‍💻 Autor

Desarrollado para automatización interna y análisis de datos.
