# Consulta automática de rutas por servidor

Este proyecto automatiza consultas internas usando **Playwright**, recorriendo múltiples servidores y rutas, y genera un **CSV final con el total acumulado por ruta**, sin importar el servidor en el que se encuentre la información.

---

## ¿Qué hace el script?

1. Lee un listado de rutas desde el archivo `rutas.txt`
2. Recorre cada ruta por todos los servidores configurados
3. Ejecuta la búsqueda en la web interna
4. Obtiene el valor del campo `#totalRegistros`
5. Suma los resultados por ruta
6. Genera un archivo `resultados.csv` con el total final por cada ruta

> El resultado **no discrimina por servidor**, solo muestra el total acumulado por ruta.

---

## Ejemplo de rutas.txt

- EvalProm/007/CopiarLogros.aspx
- EvalProm/007/Indicadores.aspx
- EvalProm/007/NotasEstudiante.aspx
- EvalProm/008/Recuperaciones.aspx

Cada línea representa una ruta que será consultada en todos los servidores.

---

## Resultado final (resultados.csv)

Ruta,Total

- EvalProm/007/CopiarLogros.aspx,135
- EvalProm/007/Indicadores.aspx,143
- EvalProm/007/NotasEstudiante.aspx,11
- EvalProm/008/Recuperaciones.aspx,2

---

## Requisitos

- Node.js versión 18 o superior
- npm

---

## Instalación

Instalar Playwright:

```bash
npm install playwright
```

Instalar los navegadores de Playwright (solo la primera vez):

```bash
npx playwright install
```

## Ejecución

Ejecutar el script con:

```bash
node index.js
```

El navegador se abrirá automáticamente y el proceso comenzará de forma secuencial.

## Funcionamiento interno

- Usa Chromium mediante Playwright
- Interactúa con un iframe
- Selecciona servidores desde un <selector>
- Ejecuta búsquedas por ruta
- Espera cambios reales en el DOM (#totalRegistros)
- Acumula los resultados en memoria
- Genera el CSV una sola vez al finalizar

## Configuración

Puedes modificar fácilmente en el script:

- La lista de servidores
- El archivo de rutas
- La URL del sistema
- El modo headless del navegador

## Notas

El script asume que el iframe es único

Si la estructura HTML cambia, puede ser necesario ajustar selectores

Uso recomendado en entornos internos

## Autor

Script desarrollado para automatización y análisis de datos internos.

---
