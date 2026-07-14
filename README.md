# Sitio de Joaquín Arhancet Carriquiry

Página de perfil profesional con pestañas: Inicio, Portafolio, CV, Ideas y Contacto.

## Cómo editar el contenido (lo único que vas a tocar)

Todo el texto del sitio vive en **`data/content.json`**. No hace falta tocar HTML, CSS ni JS para actualizar contenido.

Abrí ese archivo con cualquier editor de texto (incluso el Bloc de notas, o directamente en GitHub desde el navegador) y vas a ver estas secciones:

- **`perfil`** → nombre, título, frase corta y presentación de Inicio.
- **`portafolio`** → un array de proyectos. Para agregar uno nuevo, copiá un bloque `{ ... }` completo (incluida la coma antes), pegalo dentro de los corchetes `[ ]`, y cambiá los valores.
- **`cv`** → experiencia laboral, formación, habilidades e idiomas. Misma lógica: copiá un bloque y modificalo.
- **`ideas`** → una reflexión corta por cada proyecto del portafolio.
- **`contacto`** → email, LinkedIn y WhatsApp.

**Reglas para no romper el archivo:**
- Todo texto va entre comillas dobles `" "`.
- Cada línea (excepto la última de una lista) termina en coma `,`.
- Si el sitio deja de mostrar contenido después de editar, seguramente falta o sobra una coma o una comilla — podés pegar el archivo en [jsonlint.com](https://jsonlint.com) para encontrar el error exacto.

### Actualizar el CV descargable
Reemplazá el archivo `assets/CV_Joaquin_Arhancet.pdf` por tu PDF actualizado, manteniendo el mismo nombre de archivo. Si querés usar otro nombre, actualizá también el campo `"cvArchivo"` en `content.json`.

### Agregar fotos a los proyectos del portafolio
1. Guardá la imagen dentro de `assets/proyectos/` (ej: `assets/proyectos/policlinicas.jpg`). Usá fotos apaisadas (horizontales), idealmente 1600×900px o similar, para que se recorten bien.
2. En `content.json`, buscá el proyecto correspondiente y completá su campo `"imagen"`, por ejemplo:
   ```json
   "imagen": "assets/proyectos/policlinicas.jpg",
   ```
3. Si un proyecto no tiene imagen, dejá `"imagen": ""` (comillas vacías) y esa tarjeta simplemente no muestra foto — no rompe nada.

### Agregar tu foto
Actualmente el sitio no incluye foto (solo un monograma "JA"). Para agregarla:
1. Subí la imagen a la carpeta `assets/` (ej: `assets/foto.jpg`).
2. Decime o agregá una etiqueta `<img>` en la sección hero de `index.html` apuntando a `assets/foto.jpg` — puedo hacer este cambio puntual si me lo pedís.

## Cómo publicar en GitHub Pages

1. Creá un repositorio nuevo en GitHub (público) y subí **todo el contenido de esta carpeta** (no la carpeta en sí, sino los archivos y subcarpetas: `index.html`, `css/`, `js/`, `data/`, `assets/`).
2. En el repositorio, andá a **Settings → Pages**.
3. En "Source", elegí la rama `main` y la carpeta `/ (root)`.
4. Guardá. GitHub te va a dar una URL del tipo `https://tu-usuario.github.io/nombre-repo/`.
5. Cada vez que edites `content.json` (o cualquier archivo) y lo subas de nuevo (commit + push), el sitio se actualiza solo en un par de minutos.

## Estructura del proyecto

```
index.html          → estructura de la página (las 5 pestañas)
css/style.css        → estilos y diseño visual
js/script.js          → carga content.json y maneja la navegación por pestañas
data/content.json    → TODO el contenido editable del sitio
assets/               → CV en PDF y futuras imágenes
```
