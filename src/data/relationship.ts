/**
 * PERSONALIZA ESTE ARCHIVO. Toda la historia visible del sitio vive aquí.
 * Coloca fotos y videos en /public/images y usa rutas como /images/mi-foto.jpg.
 */
export const RELATIONSHIP_START_DATE = 'AAAA-MM-DD';

export type Memory = {
  id: string;
  title: string;
  date: string;
  place: string;
  image: string;
  video?: string;
  description: string;
  quote: string;
};

export type Constellation = {
  id: string;
  number: string;
  name: string;
  year: string;
  shortPhrase: string;
  intro: string;
  song?: string;
  spotifyUrl?: string;
  accent: string;
  memories: Memory[];
};

export const relationship = {
  girlfriendName: '[NOMBRE_DE_MI_NOVIA]',
  myName: '[MI_NOMBRE]',
  startDate: RELATIONSHIP_START_DATE,
  anniversaryNumber: 5,
  mainPhrase: 'Hace cinco años comenzó nuestro universo.',
  favoriteSong: '[NOMBRE DE NUESTRA CANCIÓN]',
  spotifyUrl: '',
  finalDate: '[FECHA DE LA SORPRESA]',
  finalPlace: '[LUGAR DE LA SORPRESA]',
  finalInvitation: '[ESCRIBE AQUÍ EL PLAN O INVITACIÓN ESPECIAL]',
  introText: 'Desde aquel día, cada momento contigo se convirtió en parte de mi lugar favorito.',
  secretLetter: `Hay algo que he aprendido en estos años: el amor también vive en las cosas pequeñas. En esa forma tuya de mirar cuando estás pensando, en nuestros silencios cómodos y en cada vez que elegimos quedarnos. Gracias por construir conmigo este lugar que solo nosotros conocemos.`,
  futureLetter: `Quiero que el próximo capítulo tenga más mañanas lentas, nuevas calles por caminar y la misma certeza de que estamos en el mismo equipo.`,
  promise: '[ESCRIBE AQUÍ UNA PROMESA CONCRETA Y PERSONAL]',
  constellations: [
    {
      id: 'el-comienzo', number: '01', name: 'El comienzo', year: 'Año uno', accent: '#d9bd82',
      shortPhrase: 'El instante en que todo cambió de dirección.',
      intro: 'Antes de llamarlo historia, fueron miradas, conversaciones largas y esa sensación de querer quedarnos un poco más.',
      memories: [
        { id: 'inicio-1', title: '[REEMPLAZAR] La primera vez que entendí que eras especial', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-01.jpg', description: '[REEMPLAZAR] Aquí va la historia real de ese primer momento.', quote: 'Contigo, hasta lo cotidiano se siente extraordinario.' },
        { id: 'inicio-2', title: '[REEMPLAZAR] Nuestra primera fotografía', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-02.jpg', description: '[REEMPLAZAR] Cuenta qué estaba pasando justo antes y después de esta foto.', quote: '[REEMPLAZAR] Una frase que solo ustedes entiendan.' },
        { id: 'inicio-3', title: '[REEMPLAZAR] El día que empezó el nosotros', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-03.jpg', description: '[REEMPLAZAR] Describe ese detalle pequeño que todavía recuerdas.', quote: 'Sin saberlo, ya estábamos dibujando nuestra primera constelación.' },
      ],
    },
    {
      id: 'descubrimientos', number: '02', name: 'Los descubrimientos', year: 'Año dos', accent: '#b9a1c9',
      shortPhrase: 'El mundo se hizo más grande al recorrerlo juntos.',
      intro: 'Nuevos lugares, primeras veces y planes improvisados que terminaron convirtiéndose en nuestros recuerdos favoritos.',
      memories: [
        { id: 'desc-1', title: '[REEMPLAZAR] Nuestra primera aventura', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-04.jpg', description: '[REEMPLAZAR] Escribe el imprevisto que ahora siempre recuerdan.', quote: 'Perdernos también fue una forma de encontrarnos.' },
        { id: 'desc-2', title: '[REEMPLAZAR] Esa comida que salió distinta', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-05.jpg', description: '[REEMPLAZAR] Cuenta una anécdota cotidiana y concreta.', quote: '[REEMPLAZAR] Su frase interna de aquel día.' },
        { id: 'desc-3', title: '[REEMPLAZAR] Una canción en el camino', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-06.jpg', description: '[REEMPLAZAR] Explica por qué esa canción quedó ligada a ustedes.', quote: 'Todavía vuelvo a ese momento cada vez que suena.' },
      ],
    },
    {
      id: 'lugar-seguro', number: '03', name: 'Nuestro lugar seguro', year: 'Año tres', accent: '#c8a3aa',
      shortPhrase: 'Aprendimos que hogar también puede ser una persona.',
      intro: 'Aquí viven las costumbres que nadie más ve: los rituales pequeños, las palabras precisas y la calma de sentirnos en casa.',
      memories: [
        { id: 'seguro-1', title: '[REEMPLAZAR] Nuestro ritual favorito', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-07.jpg', description: '[REEMPLAZAR] Puede ser un desayuno, una caminata o una llamada.', quote: 'Lo pequeño, contigo, nunca ha sido poco.' },
        { id: 'seguro-2', title: '[REEMPLAZAR] Cuando supiste acompañarme', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-08.jpg', description: '[REEMPLAZAR] Cuenta cómo estuvo presente sin exagerar el momento.', quote: '[REEMPLAZAR] Algo verdadero que quieras agradecer.' },
        { id: 'seguro-3', title: '[REEMPLAZAR] Un domingo cualquiera', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-09.jpg', description: '[REEMPLAZAR] Describe por qué un día normal terminó siendo memorable.', quote: 'Mi lugar favorito empezó a parecerse a nosotros.' },
      ],
    },
    {
      id: 'contra-todo', number: '04', name: 'Contra todo pronóstico', year: 'Año cuatro', accent: '#91a8c5',
      shortPhrase: 'No fue perfecto. Fue valiente, honesto y nuestro.',
      intro: 'También hubo días difíciles. Elegirnos en ellos hizo que nuestra historia tuviera raíces, no solo alas.',
      memories: [
        { id: 'contra-1', title: '[REEMPLAZAR] Lo que aprendimos juntos', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-10.jpg', description: '[REEMPLAZAR] Habla de lo que cambió en ustedes después de un reto.', quote: 'No teníamos todas las respuestas, pero seguimos hablando.' },
        { id: 'contra-2', title: '[REEMPLAZAR] El abrazo después de la tormenta', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-11.jpg', description: '[REEMPLAZAR] Cuenta el gesto concreto que marcó la diferencia.', quote: '[REEMPLAZAR] La frase que les ayudó a seguir.' },
        { id: 'contra-3', title: '[REEMPLAZAR] Volver a elegirnos', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-12.jpg', description: '[REEMPLAZAR] Describe una decisión o conversación importante.', quote: 'Cuidarnos también fue aprender a volver.' },
      ],
    },
    {
      id: 'hogar-elegimos', number: '05', name: 'El hogar que elegimos', year: 'Año cinco', accent: '#dfc4a6',
      shortPhrase: 'Todo lo vivido cabe en la forma en que hoy nos miramos.',
      intro: 'Somos las bromas que repetimos, las decisiones que tomamos y todo lo que todavía nos emociona imaginar.',
      memories: [
        { id: 'hogar-1', title: '[REEMPLAZAR] La foto que mejor nos explica', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-13.jpg', description: '[REEMPLAZAR] Cuenta qué detalle de esta imagen los representa.', quote: 'Aquí estamos: distintos, cómplices y del mismo lado.' },
        { id: 'hogar-2', title: '[REEMPLAZAR] Una costumbre solo nuestra', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-14.jpg', description: '[REEMPLAZAR] Escribe sobre ese código privado que construyeron.', quote: '[REEMPLAZAR] Su frase o broma favorita.' },
        { id: 'hogar-3', title: '[REEMPLAZAR] Cinco años después', date: '[FECHA]', place: '[LUGAR]', image: '/images/recuerdo-15.jpg', description: '[REEMPLAZAR] Dile qué admiras de la persona en que se ha convertido.', quote: 'Todavía me emociona todo lo que no hemos visto.' },
      ],
    },
  ] satisfies Constellation[],
};

export type Relationship = typeof relationship;
