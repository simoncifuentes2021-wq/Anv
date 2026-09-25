/**
 * PERSONALIZA ESTE ARCHIVO. Toda la historia visible del sitio vive aquí.
 * Coloca fotos y videos en /public/images y usa rutas como /images/mi-foto.jpg.
 */
export const RELATIONSHIP_START_DATE = '2021-09-25';

export type Memory = {
  id: string;
  title: string;
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
  girlfriendName: 'Monserrat Antonia',
  myName: 'Simón Cifuentes',
  startDate: RELATIONSHIP_START_DATE,
  anniversaryNumber: 5,
  mainPhrase: 'Hace cinco años comenzó nuestro universo.',
  favoriteSong: '[NOMBRE DE NUESTRA CANCIÓN]',
  spotifyUrl: '',
  finalDate: '[FECHA DE LA SORPRESA]',
  finalPlace: '[LUGAR DE LA SORPRESA]',
  finalInvitation: 'Quiero que sigamos cumpliendo cada sueño, cada plan y cada promesa juntos, siempre de la mano y con la ayuda de Dios.',
  introText: 'Desde aquel día, cada momento contigo se convirtió en parte de mi lugar favorito.',
  secretLetter: `Mi querida Monserrat Antonia:

Esta cartita es para ti. ¡Felices cinco años de novios! Aunque han sido mucho más que eso: han sido años de conocernos, hablar, jugar, aprender y descubrirnos tal como somos. Te amo con mi vida, con todo mi ser y con todo mi corazón. Eres la mujer con quien quiero compartir mi vida y cada parte de ella, mi Monserrat Antonia.

Aún recuerdo cómo comenzó todo. Nadie imaginó que aquello terminaría convirtiéndose en lo que tenemos ahora; ni tú ni yo sabíamos que llegaríamos tan lejos. Pero míranos: aquí estamos, después de cinco años y con la ayuda de Dios. Hemos crecido, no solamente en edad y poniéndonos más viejitos, sino haciendo crecer esta relación bonita y sana que hoy tenemos. Podemos reírnos, podemos enojarnos, pero siempre estamos ahí. Mi enojona mía, cómo te adoro.

El tiempo pasó sin que nos diéramos cuenta. Gracias, mi Monsita, por todos los momentos lindos y también por esos momentos simples que disfrutamos porque podemos estar los dos. Me encanta divertirnos juntos y ver tu sonrisa maravillosa, esa sonrisa única que tanto amo. Lo que más me gusta es verte feliz, aunque sea por cosas sencillas. Pero ya iremos por cosas no tan sencillas, ¿eh? Vamos por Nueva York, jejeje; esa te la debo, mi amor. Y si Dios lo permite, conoceremos juntos lugares que todavía ni imaginamos.

Gracias por soportarme… y, OBVIO, yo por soportarla a usted, jajajaja. Bromita, mi bb. Yo la amo tal como es y así seguirá siendo; nunca lo olvide. Ya pronto comenzaremos desde cero, pero en otra etapa, y eso es exactamente lo que quiero vivir contigo.

Te mando besos, abrazos y todo mi amorcito para ute. Vamos por toda una vida juntitos: por más salidas a comer, por más aventuras, por más tardes de pesca —que ya vamos a sacar más pescaditos— y por verte sacar tu primer pez. Te amo, mi amor. ¡Felices cinco años de novios!`,
  futureLetter: `Cuando pienso en todo lo que viene, no imagino planes donde tú no estés. Quiero cumplir contigo cada sueño que tengamos, honrar nuestras promesas y construir paso a paso la vida que imaginamos: una familia, estabilidad, aventuras, atardeceres y muchos logros celebrados juntos. Con la ayuda de Dios, quiero que sigamos siendo el apoyo del otro en cada nueva etapa.`,
  promise: 'Prometo seguir eligiéndote, hacerte parte de cada gran plan de mi vida y trabajar contigo para convertir nuestros sueños en recuerdos reales.',
  constellations: [
    {
      id: 'el-comienzo', number: '01', name: 'El comienzo', year: 'Año uno', accent: '#d9bd82',
      shortPhrase: 'El instante en que todo cambió de dirección.',
      intro: 'Antes de llamarlo historia, fueron miradas, conversaciones largas y esa sensación de querer quedarnos un poco más.',
      memories: [
        { id: 'inicio-1', title: 'La partida que cambió nuestras vidas', place: 'En línea, jugando Ludo', image: '/images/recuerdo-01.jpg', description: 'Te conocí de una manera muy particular: por redes sociales y jugando una partida de Ludo. Lo que comenzó como una amistad y unas simples conversaciones se transformó, sin que lo supiéramos, en el inicio de toda nuestra historia. Me encanta pensar que algo tan inesperado me llevó hasta ti.', quote: 'Todo nuestro universo comenzó con una partida y con las ganas de seguir hablando contigo.' },
        { id: 'inicio-2', title: 'El día en que por fin te vi', place: 'Nuestra primera salida', image: '/images/recuerdo-02.jpg', description: 'Después de tanto tiempo hablando llegó por fin el día de conocerte en persona. Estaba lleno de nervios y emoción mientras esperaba que tu papá te llevara. En plena pandemia, aquella primera salida se sintió como un pequeño milagro: era el momento que había esperado durante tanto tiempo y, cuando te vi, supe que la espera había valido la pena.', quote: 'Te había imaginado tantas veces, pero tenerte frente a mí fue mucho más bonito.' },
        { id: 'inicio-3', title: 'El día en que comenzó nuestro nosotros', place: 'Donde te pedí pololeo', image: '/images/recuerdo-03.jpg', description: 'Ese día te pedí que fueras mi polola y comenzó oficialmente nuestro nosotros. No sabía todo lo que vendría: momentos lindos, únicos e inigualables, aprendizajes y una historia que sigue creciendo. Desde entonces he aprendido a amarte y a quererte tal como eres, con cada parte de ti.', quote: 'El 25 de septiembre no solo comenzó una relación; comenzó la vida que quiero seguir compartiendo contigo.' },
      ],
    },
    {
      id: 'descubrimientos', number: '02', name: 'Los descubrimientos', year: 'Año dos', accent: '#b9a1c9',
      shortPhrase: 'El mundo se hizo más grande al recorrerlo juntos.',
      intro: 'Nuevos lugares, primeras veces y planes improvisados que terminaron convirtiéndose en nuestros recuerdos favoritos.',
      memories: [
        { id: 'desc-1', title: 'El primero de muchos viajes', place: 'Fantasilandia', image: '/images/recuerdo-04.jpg', description: 'Nuestro primer viaje juntitos fue a Fantasilandia. Me encantó poder alejarnos de todo, compartir el día y reírnos sin parar. Pasar tiempo contigo es una de las cosas que más disfruto, y viajar a tu lado lo hace todavía más especial. Ese día entendí que aquella aventura no sería la única, sino el comienzo de muchos lugares por descubrir juntos.', quote: 'No importa el destino si puedo vivir el viaje contigo.' },
        { id: 'desc-2', title: 'La suerte de caminar a tu lado', place: 'Una de nuestras salidas', image: '/images/recuerdo-05.jpg', description: 'Esta no es solamente la foto de una salida; es el recuerdo de lo bien que lo pasamos cada vez que estamos juntos. En cada paseo disfruto el lugar, pero sobre todo disfruto a la persona que tengo a mi lado. Amo quién eres y cómo eres, con tus virtudes, tus detalles y también tus defectos.', quote: 'Cualquier salida se convierte en un buen recuerdo cuando voy de tu mano.' },
        { id: 'desc-3', title: 'Donde podemos ser simplemente nosotros', place: 'Uno de nuestros momentos', image: '/images/recuerdo-06.jpg', description: 'Más que una celebración, esta foto guarda uno de esos momentos en los que podemos ser exactamente quienes somos. Dos personas que se aman, se ríen y disfrutan de estar juntas. Con cada día que pasa siento que mi amor por ti sigue creciendo, y lo que más deseo es continuar teniéndote a mi lado.', quote: 'Mi momento favorito siempre será aquel en el que puedo ser yo mismo contigo.' },
      ],
    },
    {
      id: 'lugar-seguro', number: '03', name: 'Nuestro lugar seguro', year: 'Año tres', accent: '#c8a3aa',
      shortPhrase: 'Aprendimos que hogar también puede ser una persona.',
      intro: 'Aquí viven las costumbres que nadie más ve: los rituales pequeños, las palabras precisas y la calma de sentirnos en casa.',
      memories: [
        { id: 'seguro-1', title: 'Nuestro rincón en el sillón', place: 'Nuestro sillón', image: '/images/recuerdo-07.jpg', description: 'Una de mis costumbres favoritas es poder divertirnos, hacer tonteras, bromearnos y regalonear juntos. Me encanta que contigo podamos ser quienes somos en todo momento. Y está también nuestro clásico: acomodarnos en el sillón para ver una película o una serie y terminar quedándonos dormidos. Casi nunca terminamos las series, pero siempre disfrutamos estar ahí juntitos.', quote: 'Quizás no terminamos la serie, pero nunca me canso de compartir el sillón contigo.' },
        { id: 'seguro-2', title: 'Siempre ahí conmigo', place: 'En cada momento importante', image: '/images/recuerdo-08.jpg', description: 'Tú me apoyas en todo. Estás conmigo en mis cumpleaños, en las fechas importantes y también en cada idea que se me ocurre. Me encanta cuando vas a verme jugar o cuando me acompañas a pescar, incluso si no sacamos ningún pescadito. Lo que realmente importa es que estás ahí, y todo se vuelve mejor porque lo vivo contigo.', quote: 'Gracias por acompañarme incluso en esas aventuras donde no pescamos nada, excepto otro recuerdo juntos.' },
        { id: 'seguro-3', title: 'Nuestros días de sushi', place: 'Nuestro lugar de sushi', image: '/images/recuerdo-09.jpg', description: 'Todos los días contigo tienen algo que recuerdo con cariño, pero nuestras salidas a comer sushi siempre ocupan un lugar especial. Me encanta verte disfrutar algo que te gusta tanto y terminar los dos pochitos de tanto comer. Son momentos sencillos, pero justamente por eso se sienten tan nuestros.', quote: 'Contigo, hasta quedar pochitos después de comer sushi se convierte en un recuerdo bonito.' },
      ],
    },
    {
      id: 'contra-todo', number: '04', name: 'Contra todo pronóstico', year: 'Año cuatro', accent: '#91a8c5',
      shortPhrase: 'No fue perfecto. Fue valiente, honesto y nuestro.',
      intro: 'También hubo días difíciles. Elegirnos en ellos hizo que nuestra historia tuviera raíces, no solo alas.',
      memories: [
        { id: 'contra-1', title: 'Gracias por seguir aquí', place: 'Donde aprendimos a perdonarnos', image: '/images/recuerdo-10.jpg', description: 'Nuestra historia no ha estado hecha solamente de momentos lindos. También hemos tenido dificultades, y sé que muchas veces has tenido que soportarme y perdonarme. Te doy las gracias por haber decidido continuar, porque seguir a tu lado es lo que más quiero. Eres la persona con la que deseo compartir el resto de mis días.', quote: 'Gracias por tu paciencia, por tu perdón y por seguir construyendo este nosotros conmigo.' },
        { id: 'contra-2', title: 'Tu alegría, mi lugar favorito', place: 'A tu lado', image: '/images/recuerdo-11.jpg', description: 'Quiero que nunca olvides lo importante que eres para mí. Eres una persona única, llena de alegría, y me encanta que podamos reírnos y vivir momentos lindos juntos. Amo verte feliz, escuchar tu risa y contemplar esa sonrisa hermosa que tienes. Admiro profundamente la mujer y la persona maravillosa que eres.', quote: 'Tu sonrisa tiene la forma exacta de uno de mis lugares favoritos.' },
        { id: 'contra-3', title: 'Elegirnos una vez más', place: 'Nuestro camino', image: '/images/recuerdo-12.jpg', description: 'A pesar de las dificultades y de los problemas, tú has decidido seguir eligiéndome. Yo también quiero elegirte toda la vida. Eres la persona que quiero a mi lado y te doy las gracias por todo, mi Monsita: por tu amor, por tu paciencia y por continuar creyendo en nosotros.', quote: 'Tú me sigues eligiendo, y yo quiero elegirte en cada uno de los días que nos quedan.' },
      ],
    },
    {
      id: 'hogar-elegimos', number: '05', name: 'El hogar que elegimos', year: 'Año cinco', accent: '#dfc4a6',
      shortPhrase: 'Todo lo vivido cabe en la forma en que hoy nos miramos.',
      intro: 'Somos las bromas que repetimos, las decisiones que tomamos y todo lo que todavía nos emociona imaginar.',
      memories: [
        { id: 'hogar-1', title: 'La confianza de ser nosotros', place: 'Nuestro presente', image: '/images/recuerdo-13.jpg', description: 'Hoy me siento profundamente agradecido por tenerte. Somos dos personas que pueden mostrarse tal como son, sin vergüenza y sin tener que esconder sus personalidades o sus caracteres. La confianza que hemos construido me permite ser yo mismo contigo, y saber que tú también puedes hacerlo conmigo es uno de los regalos más bonitos de nuestra relación.', quote: 'Nuestro amor también es la libertad de ser exactamente quienes somos.' },
        { id: 'hogar-2', title: 'Atardeceres contigo', place: 'Bajo nuestros atardeceres', image: '/images/recuerdo-14.jpg', description: 'Una de nuestras tradiciones es salir juntitos, conocer lugares que nos gustan y detenernos a mirar los atardeceres que tanto te encantan. Me gusta acompañarte mientras buscas esa fotografía bonita y estar ahí para apoyarte en todo. Cada paisaje se vuelve más especial porque lo estoy mirando contigo.', quote: 'He visto atardeceres preciosos, pero ninguno se compara con poder compartirlos contigo.' },
        { id: 'hogar-3', title: 'Cinco años y todo un futuro', place: 'Nuestro quinto aniversario', image: '/images/recuerdo-15.jpg', description: 'Han sido cinco años llenos de aprendizajes, tanto personales como compartidos. Hemos aprendido a conocernos tal como somos, a apoyarnos y a crecer juntos. Te amo y te adoro con todo mi corazón, mi Monsita, porque eres una mujer única que no se compara con nadie. Quiero que estés en cada plan importante de mi vida y deseo cumplir contigo cada sueño y cada promesa que construyamos. Imagino a tu lado una familia, estabilidad, aventuras y muchos logros que podamos celebrar juntos. Con la ayuda de Dios, quiero que estos cinco años sean apenas el comienzo de toda una vida.', quote: 'Mi futuro favorito es aquel en el que seguimos cumpliendo nuestros sueños, de la mano y con Dios acompañándonos.' },
      ],
    },
  ] satisfies Constellation[],
};

export type Relationship = typeof relationship;
