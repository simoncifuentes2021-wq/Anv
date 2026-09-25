# Nuestro Universo

Experiencia web interactiva para celebrar cinco años de relación. Incluye entrada cinematográfica, contador dinámico, cinco constelaciones, quince recuerdos, una carta secreta, progreso persistente, paisaje sonoro opcional y un sexto año desbloqueable.

## Personalización rápida

Todo el contenido editable está centralizado en:

`src/data/relationship.ts`

Ahí puedes cambiar:

- `girlfriendName`: nombre de tu novia.
- `myName`: tu nombre.
- `RELATIONSHIP_START_DATE`: fecha real de inicio en formato `AAAA-MM-DD` (por ejemplo, `2021-09-24`). El contador y la frase de días se calcularán automáticamente.
- `anniversaryNumber`: número del aniversario.
- `mainPhrase`: frase alternativa que aparece cuando la fecha todavía no ha sido configurada.
- `favoriteSong` y `spotifyUrl`: nombre y enlace de su canción. El sitio funciona aunque el enlace quede vacío.
- `secretLetter`: carta de la estrella secreta.
- `futureLetter` y `promise`: carta y promesa del sexto año.
- `finalDate`, `finalPlace` y `finalInvitation`: datos de la sorpresa final.
- `constellations`: nombres, años, introducciones, canciones y recuerdos de cada etapa.

Busca `[REEMPLAZAR]`, `[FECHA]` y `[LUGAR]` para localizar todos los textos de ejemplo pendientes.

## Fotos y videos

1. Copia tus archivos a `public/images/`.
2. En `src/data/relationship.ts`, asigna la ruta correspondiente a cada recuerdo:

```ts
image: '/images/nuestra-foto.jpg'
```

Para usar un video, agrega la propiedad opcional `video` al recuerdo:

```ts
image: '/images/portada-del-video.jpg',
video: '/images/nuestro-video.mp4'
```

Si una foto todavía no existe, la interfaz muestra un fondo elegante con la ruta que debes reemplazar; no aparece una imagen rota.

Formatos recomendados:

- Fotos: JPG o WebP, verticales o cuadradas, entre 1200 y 2000 px.
- Videos: MP4 optimizado para web, idealmente menos de 25 MB.
- Usa nombres sin espacios ni tildes, por ejemplo `viaje-sur-2023.jpg`.

## Música

El botón “Activar música” reproduce `public/musicafondo.mp3` en bucle. El botón final “Escuchar mi mensaje” reproduce `public/audio.ogg`; mientras ese mensaje está sonando, la música de fondo baja automáticamente.

Para enlazar una canción real, completa `spotifyUrl` en el archivo de configuración. También puedes añadir `song` y `spotifyUrl` dentro de una constelación para asociar una canción a ese capítulo.

## Ejecutar localmente

Requiere Node.js 22.13 o posterior.

```bash
npm install
npm run dev
```

Luego abre la dirección local que aparece en la terminal.

Para comprobar la versión de producción:

```bash
npm run build
```

## Desplegar en Vercel

1. En Vercel, selecciona **Add New → Project**.
2. Importa el repositorio `simoncifuentes2021-wq/Anv`.
3. Deja **Framework Preset** en `Next.js`.
4. No cambies el comando de compilación ni el directorio de salida.
5. Pulsa **Deploy**.

El proyecto usa Node.js 22, está configurado como Next.js estándar y no necesita variables de entorno.

Los comandos `sites:*` conservan la compatibilidad con la publicación existente en OpenAI Sites.

## Cómo funciona el progreso

El sitio guarda las constelaciones visitadas en el almacenamiento local del navegador. El portal “El sexto año” se abre cuando se han explorado las cinco. Para reiniciar la experiencia durante las pruebas, borra el almacenamiento local del sitio o ejecuta en la consola del navegador:

```js
localStorage.removeItem('nuestro-universo-progress-v1')
```

## Accesibilidad

La experiencia incluye foco visible, navegación por teclado, modales cerrables con `Escape`, textos alternativos y una versión de movimiento reducido que respeta `prefers-reduced-motion`.
