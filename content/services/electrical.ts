import type { DivisionInput, ServiceInput } from './types'

/**
 * Licensed-partner trade. LSG does not hold a Utah electrical licence: LSG
 * coordinates and schedules the job, a Utah-licensed electrician performs it,
 * and the permit is pulled under the partner's licence. Every string in this
 * file has to stay on that side of the line — never "we wire", "we install".
 */
export const electricalDivision: DivisionInput = {
  id: 'electrical',
  slug: { en: 'electrical', es: 'electricidad' },
  name: { en: 'Electrical', es: 'Electricidad' },
  trade: { en: 'Electrical services', es: 'Servicios eléctricos' },
  lede: {
    en: 'Lighting, remodel wiring and EV charger circuits, performed by Utah-licensed electricians and scheduled by LSG as part of your project.',
    es: 'Iluminación, cableado para remodelaciones y circuitos para cargadores, hechos por electricistas con licencia en Utah y coordinados por LSG.',
  },
  seo: {
    en: {
      title: 'Electrical Services in Utah County, UT',
      description:
        'Lighting, remodel wiring and EV charger circuits in Utah County, done by Utah-licensed electricians and coordinated by LSG with the rest of your project.',
    },
    es: {
      title: 'Servicios Eléctricos en el Condado de Utah',
      description:
        'Iluminación, cableado para remodelaciones y cargadores de autos eléctricos, hechos por electricistas con licencia en Utah y coordinados por LSG.',
    },
  },
  body: {
    en: [
      'LSG is not an electrical contractor, and we do not pretend to be one. Electrical work on our projects is performed by Utah-licensed electricians we work with regularly, and the permit is pulled under their license. What we do is run the project around them: we set the schedule, open the walls, have the framing ready for rough-in, and close up only after the inspector has signed off.',
      'That matters most when the wiring is one part of a bigger job. A basement finish or a garage with a new slab and a charger needs the electrician in at the right moment, between framing and drywall or before the pour. You deal with one contractor and one schedule instead of calling three trades and hoping they talk to each other.',
    ],
    es: [
      'LSG no es contratista eléctrico y no fingimos serlo. El trabajo eléctrico en nuestros proyectos lo hacen electricistas con licencia en Utah con quienes trabajamos seguido, y el permiso se tramita bajo la licencia de ellos. Lo que hacemos nosotros es dirigir el proyecto alrededor de ese trabajo: fijamos el calendario, abrimos los muros, dejamos la estructura lista para el cableado y solo cerramos cuando el inspector ya aprobó.',
      'Eso importa más cuando el cableado es una parte de un trabajo más grande. Terminar un sótano o un garaje con losa nueva y cargador requiere que el electricista entre en el momento justo, entre la estructura y el drywall o antes del vertido. Usted trata con un solo contratista y un solo calendario, en lugar de llamar a tres oficios y esperar que se pongan de acuerdo.',
    ],
  },
  licensedPartner: true,
  faqs: [
    {
      question: { en: 'Who actually does the electrical work?', es: '¿Quién hace realmente el trabajo eléctrico?' },
      answer: {
        en: 'A Utah-licensed electrician. LSG coordinates the job and schedules it with the rest of your project, but the wiring itself is performed by our licensed partner, and the permit is pulled under their license. You are welcome to ask for the license number and check it on the state license lookup.',
        es: 'Un electricista con licencia en Utah. LSG coordina el trabajo y lo programa junto con el resto de su proyecto, pero el cableado lo hace nuestro socio con licencia y el permiso se tramita bajo su licencia. Con gusto le damos el número de licencia para que lo verifique en el registro del estado.',
      },
    },
    {
      question: { en: 'Do I need a permit for electrical work?', es: '¿Necesito permiso para el trabajo eléctrico?' },
      answer: {
        en: 'For new circuits, a new subpanel, an EV charger circuit or wiring in a basement or addition, yes. Swapping a fixture on an existing box often does not, but the rules vary by city. The licensed partner pulls the permit and the city inspects the work before the walls are closed.',
        es: 'Para circuitos nuevos, un subpanel, el circuito de un cargador o el cableado de un sótano o una ampliación, sí. Cambiar una lámpara en una caja existente muchas veces no lo requiere, pero depende de cada ciudad. El socio con licencia tramita el permiso y la ciudad inspecciona antes de cerrar los muros.',
      },
    },
    {
      question: { en: 'Can you handle just the electrical, without a bigger project?', es: '¿Pueden encargarse solo de la parte eléctrica, sin un proyecto más grande?' },
      answer: {
        en: 'Yes. A lighting upgrade or a charger circuit on its own is fine. The value of going through us is largest when the electrical sits inside a remodel, a basement or new concrete, because that is where the timing between trades is easiest to get wrong.',
        es: 'Sí. Un cambio de iluminación o un circuito para cargador por sí solo está bien. Donde más vale pasar por nosotros es cuando lo eléctrico forma parte de una remodelación, un sótano o concreto nuevo, porque ahí es donde más fácil se equivoca la coordinación entre oficios.',
      },
    },
  ],
}

export const electricalServices: ServiceInput[] = [
  {
    id: 'lighting',
    division: 'electrical',
    slug: { en: 'lighting', es: 'iluminacion' },
    name: { en: 'Lighting and fixtures', es: 'Iluminación y lámparas' },
    lede: {
      en: 'Recessed lights, fixtures, ceiling fans and exterior lighting, installed by a licensed electrician on a schedule we manage.',
      es: 'Luces empotradas, lámparas, ventiladores de techo e iluminación exterior, instalados por un electricista con licencia y coordinados por nosotros.',
    },
    seo: {
      en: {
        title: 'Lighting & Fixture Installation | Utah County, UT',
        description:
          'Recessed lights, fixtures, ceiling fans and exterior lighting in Utah County, installed by Utah-licensed electricians and coordinated by LSG.',
      },
      es: {
        title: 'Instalación de Iluminación | Condado de Utah',
        description:
          'Luces empotradas, lámparas, ventiladores de techo e iluminación exterior en el Condado de Utah, por electricistas con licencia y coordinados por LSG.',
      },
    },
    body: {
      en: [
        'Most lighting jobs we coordinate are part of a remodel: a kitchen going from one center fixture to a grid of recessed cans, a basement getting light it never had. The details are set by code and by the ceiling. Recessed lights in a ceiling with insulation above must be IC-rated so they can touch the insulation, and airtight so they do not leak warm air into the attic. A ceiling fan needs a box rated for a fan, not just a light, because a spinning fan loads the box in ways a fixture never does.',
        'Outside, fixtures have to be rated for a damp or wet location depending on how exposed they are, and outdoor receptacles need GFCI protection and a cover that stays closed with a cord plugged in. Our licensed electrician partner does the installation and pulls any permit the job needs. We plan the layout with you first, so the lights land where the counters, the furniture and the walkway actually are.',
      ],
      es: [
        'La mayoría de los trabajos de iluminación que coordinamos forman parte de una remodelación: una cocina que pasa de una sola lámpara central a una cuadrícula de luces empotradas, o un sótano que recibe la luz que nunca tuvo. Los detalles los marcan el código y el techo. Las luces empotradas en un techo con aislamiento encima deben tener clasificación IC para poder tocar el aislamiento y ser herméticas para no dejar escapar aire caliente al ático. Un ventilador de techo necesita una caja clasificada para ventilador, no solo para lámpara, porque al girar carga la caja de una forma que una lámpara nunca hace.',
        'Afuera, las lámparas deben estar clasificadas para lugar húmedo o mojado según qué tan expuestas queden, y los contactos exteriores necesitan protección GFCI y una tapa que se mantenga cerrada con un cable conectado. Nuestro socio electricista con licencia hace la instalación y tramita el permiso que haga falta. Antes planeamos la distribución con usted, para que las luces queden donde de verdad están la barra, los muebles y el andador.',
      ],
    },
    spec: [
      { label: { en: 'Performed by', es: 'Realizado por' }, value: { en: 'Utah-licensed electrician, coordinated by LSG', es: 'Electricista con licencia en Utah, coordinado por LSG' } },
      { label: { en: 'Recessed lights', es: 'Luces empotradas' }, value: { en: 'IC-rated and airtight under insulated ceilings', es: 'Clasificación IC y herméticas bajo techos con aislamiento' } },
      { label: { en: 'Ceiling fans', es: 'Ventiladores de techo' }, value: { en: 'Mounted on a fan-rated box', es: 'Montados en caja clasificada para ventilador' } },
      { label: { en: 'Exterior', es: 'Exterior' }, value: { en: 'Damp- or wet-rated fixtures · GFCI receptacles', es: 'Lámparas para lugar húmedo o mojado · contactos GFCI' } },
      { label: { en: 'Permit', es: 'Permiso' }, value: { en: 'Pulled under the licensed partner when required', es: 'Tramitado bajo el socio con licencia cuando se requiere' } },
    ],
    pairsWith: ['kitchen-remodeling', 'basement-finishing'],
    status: 'published',
  },
  {
    id: 'remodel-wiring',
    division: 'electrical',
    slug: { en: 'remodel-wiring', es: 'cableado-para-remodelaciones' },
    name: { en: 'Wiring for basements, remodels and additions', es: 'Cableado para sótanos, remodelaciones y ampliaciones' },
    lede: {
      en: 'New circuits, outlets and alarms wired by a licensed electrician between framing and drywall, inspected before we close the walls.',
      es: 'Circuitos, contactos y alarmas nuevos, cableados por un electricista con licencia entre la estructura y el drywall, e inspeccionados antes de cerrar.',
    },
    seo: {
      en: {
        title: 'Basement & Remodel Wiring | Utah County, UT',
        description:
          'Wiring for basement finishes, remodels and additions in Utah County. AFCI/GFCI to code, permits pulled by our Utah-licensed electrician partner.',
      },
      es: {
        title: 'Cableado para Sótanos y Remodelaciones | Utah',
        description:
          'Cableado para sótanos, remodelaciones y ampliaciones en el Condado de Utah. Protección AFCI y GFCI según código, con permiso de un electricista con licencia.',
      },
    },
    body: {
      en: [
        'A finished basement or an addition is new living space, and the National Electrical Code treats it that way. Bedrooms, family rooms, closets and hallways need AFCI protection on their circuits, which trips on the arcing a damaged cord or loose connection produces. Bathrooms, kitchens, laundry areas, unfinished spaces and anything near a sink need GFCI protection. New bedrooms also bring smoke alarms, typically hardwired with battery backup and interconnected with the rest of the house so one sounds them all.',
        'The order of work decides how smooth this goes. We finish framing, our licensed electrician partner runs the rough wiring and pulls the permit under their license, and the city inspects the rough-in. Only after that inspection passes do we insulate and hang drywall. Before any of it, the electrician checks whether the existing panel has room for the new circuits, because finding out after the walls are framed costs time.',
      ],
      es: [
        'Un sótano terminado o una ampliación es espacio habitable nuevo, y el Código Eléctrico Nacional (NEC) lo trata así. Recámaras, salas familiares, clósets y pasillos necesitan protección AFCI en sus circuitos, que se dispara con los arcos que produce un cable dañado o una conexión floja. Baños, cocinas, lavanderías, áreas sin terminar y todo lo cercano a un fregadero necesitan protección GFCI. Las recámaras nuevas también requieren alarmas de humo, normalmente conectadas a la corriente con batería de respaldo e interconectadas con las del resto de la casa para que suenen todas a la vez.',
        'El orden del trabajo decide qué tan bien sale. Terminamos la estructura, nuestro socio electricista con licencia hace el cableado preliminar y tramita el permiso bajo su licencia, y la ciudad inspecciona. Solo después de aprobar esa inspección aislamos y colocamos el drywall. Antes de todo, el electricista revisa si el tablero actual tiene espacio para los circuitos nuevos, porque descubrirlo con los muros ya armados cuesta tiempo.',
      ],
    },
    spec: [
      { label: { en: 'Performed by', es: 'Realizado por' }, value: { en: 'Utah-licensed electrician, coordinated by LSG', es: 'Electricista con licencia en Utah, coordinado por LSG' } },
      { label: { en: 'AFCI', es: 'AFCI' }, value: { en: 'Bedrooms, living areas, closets, hallways', es: 'Recámaras, áreas de estar, clósets y pasillos' } },
      { label: { en: 'GFCI', es: 'GFCI' }, value: { en: 'Baths, kitchens, laundry, unfinished areas, near sinks', es: 'Baños, cocinas, lavandería, áreas sin terminar, junto a fregaderos' } },
      { label: { en: 'Permit', es: 'Permiso' }, value: { en: 'Pulled under the licensed partner', es: 'Tramitado bajo la licencia del socio' } },
      { label: { en: 'Inspection', es: 'Inspección' }, value: { en: 'Rough-in passed before insulation and drywall', es: 'Preliminar aprobada antes de aislar y poner drywall' } },
    ],
    pairsWith: ['basement-finishing', 'framing'],
    status: 'published',
  },
  {
    id: 'ev-chargers',
    division: 'electrical',
    slug: { en: 'ev-chargers', es: 'cargadores-autos-electricos' },
    name: { en: 'EV charger circuits', es: 'Circuitos para cargadores de autos eléctricos' },
    lede: {
      en: 'A dedicated 240-volt Level 2 circuit, sized to your charger and checked against what your panel can actually carry.',
      es: 'Un circuito dedicado de 240 voltios para carga de nivel 2, dimensionado a su cargador y revisado contra lo que su tablero puede soportar.',
    },
    seo: {
      en: {
        title: 'Level 2 EV Charger Circuits | Utah County, UT',
        description:
          'Dedicated 240V Level 2 EV charger circuits in Utah County, with a panel load check first. Installed by a Utah-licensed electrician, coordinated by LSG.',
      },
      es: {
        title: 'Circuitos para Cargadores Eléctricos | Utah',
        description:
          'Circuitos dedicados de 240 V para cargadores de nivel 2 en el Condado de Utah, con revisión de carga del tablero. Por electricista con licencia en Utah.',
      },
    },
    body: {
      en: [
        'A Level 2 charger runs on a dedicated 240-volt circuit, the same kind of supply as an electric dryer, and it adds roughly as many miles of range per hour as a standard outlet adds overnight. The code treats charging as a continuous load, so the circuit is sized at 125 percent of what the charger draws: a 32-amp charger goes on a 40-amp circuit, a 48-amp charger on a 60-amp one. Hardwiring the charger avoids wear on a plug-in receptacle, and a receptacle used for charging needs GFCI protection under recent code editions.',
        'The first question is not the charger. It is the panel. Before anything is bought, our licensed electrician partner runs a load calculation on your service to see whether it can take a continuous load of that size. If it cannot, the options are a smaller charger setting, a load-management device or a service upgrade, and you hear them before you spend money. If the charger is going into a new garage or onto a new pad, we plan the conduit with our concrete crew so it is placed before the pour instead of trenched after.',
      ],
      es: [
        'Un cargador de nivel 2 funciona con un circuito dedicado de 240 voltios, el mismo tipo de alimentación que una secadora eléctrica, y en una hora agrega más o menos la autonomía que un contacto normal agrega en toda una noche. El código trata la carga del auto como una carga continua, así que el circuito se dimensiona al 125 por ciento de lo que consume el cargador: un cargador de 32 amperios va en un circuito de 40, y uno de 48 amperios en uno de 60. Conectar el cargador directo evita el desgaste de un contacto, y un contacto usado para cargar necesita protección GFCI en las ediciones recientes del código.',
        'La primera pregunta no es el cargador, sino el tablero. Antes de comprar nada, nuestro socio electricista con licencia hace un cálculo de carga de su servicio para ver si aguanta una carga continua de ese tamaño. Si no la aguanta, las opciones son un ajuste menor en el cargador, un dispositivo de gestión de carga o una ampliación del servicio, y usted las conoce antes de gastar. Si el cargador va en un garaje nuevo o sobre una losa nueva, planeamos el tubo con nuestra cuadrilla de concreto para colocarlo antes del vertido y no zanjear después.',
      ],
    },
    spec: [
      { label: { en: 'Performed by', es: 'Realizado por' }, value: { en: 'Utah-licensed electrician, coordinated by LSG', es: 'Electricista con licencia en Utah, coordinado por LSG' } },
      { label: { en: 'Circuit', es: 'Circuito' }, value: { en: 'Dedicated 240V, sized at 125% of charger draw', es: 'Dedicado de 240 V, al 125% del consumo del cargador' } },
      { label: { en: 'Panel check', es: 'Revisión del tablero' }, value: { en: 'Load calculation before the charger is bought', es: 'Cálculo de carga antes de comprar el cargador' } },
      { label: { en: 'Conduit', es: 'Tubería' }, value: { en: 'Placed before the pour on new slabs', es: 'Colocada antes del vertido en losas nuevas' } },
      { label: { en: 'Permit', es: 'Permiso' }, value: { en: 'Pulled under the licensed partner', es: 'Tramitado bajo la licencia del socio' } },
    ],
    pairsWith: ['floors', 'driveways'],
    status: 'published',
  },
]
