# Cults → Pinterest Publisher

MVP local para importar los modelos públicos de un perfil de Cults3D, preparar Pins y publicarlos en Pinterest mediante sus APIs oficiales.

## Alcance del MVP

- Catálogo de modelos con búsqueda y selección múltiple.
- Vista previa de imagen, título, descripción y enlace a Cults3D.
- Generación de textos orientados a descubrimiento.
- Cola de publicación con estado y prevención de duplicados.
- Modo demo incluido; la conexión real se incorpora detrás de los mismos adaptadores.

## Límites importantes

La API de Cults3D entrega metadatos, imágenes, títulos, descripciones, etiquetas y URLs, pero no los archivos 3D. Pinterest requiere una cuenta de desarrollador y un token OAuth con permisos de publicación.

## Arranque

Abre `app.html` en el navegador. El MVP funciona sin instalación ni dependencias y usa datos de demostración hasta configurar los adaptadores.

## Próximo paso técnico

Crear un backend pequeño para OAuth de Pinterest y el proxy GraphQL de Cults3D. Nunca colocar tokens en el navegador ni en el repositorio.
