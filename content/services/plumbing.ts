import type { DivisionInput, ServiceInput } from './types'

/**
 * Licensed-partner trade. LSG does not hold a Utah plumbing licence: LSG
 * coordinates and schedules the job, a Utah-licensed plumber performs it, and
 * the permit is pulled under the partner's licence. The concrete work around
 * it (cutting and re-pouring a basement slab) is LSG's own.
 */
export const plumbingDivision: DivisionInput = {
  id: 'plumbing',
  slug: { en: 'plumbing', es: 'plomeria' },
  name: { en: 'Plumbing', es: 'Plomería' },
  trade: { en: 'Plumbing services', es: 'Servicios de plomería' },
  lede: {
    en: 'Fixtures, water heaters and basement rough-in, performed by Utah-licensed plumbers and scheduled by LSG around the rest of your project.',
    es: 'Llaves, sanitarios, calentadores y plomería de obra negra, hechos por plomeros con licencia en Utah y coordinados por LSG con el resto de su obra.',
  },
  seo: {
    en: {
      title: 'Plumbing Services in Utah County, UT',
      description:
        'Fixtures, water heaters and basement rough-in plumbing in Utah County, done by Utah-licensed plumbers and coordinated by LSG with your remodel or slab.',
    },
    es: {
      title: 'Servicios de Plomería en el Condado de Utah',
      description:
        'Llaves, sanitarios, calentadores de agua y plomería de obra negra en el Condado de Utah, por plomeros con licencia y coordinados por LSG.',
    },
  },
  body: {
    en: [
      'LSG does not hold a plumbing license. Plumbing on our projects is performed by Utah-licensed plumbers we work with regularly, and the permit is pulled under their license. Our job is everything around them: scheduling them at the right point, opening and closing walls, and handling the concrete when a drain has to run under a basement slab.',
      'That last part is where coordination pays. A basement bathroom means cutting the slab, trenching, setting drains at the right slope, an inspection with the trench open, then backfilling and pouring the slab back. Done by separate companies, that is a week of phone calls and gaps. Done through us, the plumber and our concrete crew work from one schedule.',
    ],
    es: [
      'LSG no tiene licencia de plomería. La plomería en nuestros proyectos la hacen plomeros con licencia en Utah con quienes trabajamos seguido, y el permiso se tramita bajo la licencia de ellos. Nuestro trabajo es todo lo que la rodea: programarlos en el momento correcto, abrir y cerrar muros, y encargarnos del concreto cuando un drenaje tiene que pasar bajo la losa del sótano.',
      'Esa última parte es donde la coordinación rinde. Un baño en el sótano implica cortar la losa, abrir la zanja, colocar los drenajes con la pendiente correcta, pasar una inspección con la zanja abierta, rellenar y volver a verter la losa. Con empresas separadas, eso es una semana de llamadas y tiempos muertos. A través de nosotros, el plomero y nuestra cuadrilla de concreto trabajan con un solo calendario.',
    ],
  },
  licensedPartner: true,
  faqs: [
    {
      question: { en: 'Who actually does the plumbing?', es: '¿Quién hace realmente la plomería?' },
      answer: {
        en: 'A Utah-licensed plumber. LSG coordinates the work and schedules it with the rest of your project, but the plumbing itself is performed by our licensed partner, and the permit is pulled under their license. Ask us for the license number and check it on the state license lookup.',
        es: 'Un plomero con licencia en Utah. LSG coordina el trabajo y lo programa con el resto de su proyecto, pero la plomería la hace nuestro socio con licencia y el permiso se tramita bajo su licencia. Pídanos el número de licencia y verifíquelo en el registro del estado.',
      },
    },
    {
      question: { en: 'Does replacing a water heater need a permit?', es: '¿Cambiar un calentador de agua requiere permiso?' },
      answer: {
        en: 'In most Utah cities, yes. A water heater involves gas or electrical supply, venting and a relief valve, and the inspection confirms the seismic strapping and the rest are right. The licensed plumber pulls the permit; the exact process depends on your city.',
        es: 'En la mayoría de las ciudades de Utah, sí. Un calentador involucra gas o electricidad, ventilación y una válvula de alivio, y la inspección confirma que las correas sísmicas y lo demás estén bien. El plomero con licencia tramita el permiso; el proceso exacto depende de su ciudad.',
      },
    },
    {
      question: { en: 'Can you add a bathroom to my basement?', es: '¿Pueden agregar un baño en mi sótano?' },
      answer: {
        en: 'Usually. The first thing we check is where your sewer line leaves the house. If it exits below the basement floor, the new drains can flow to it by gravity. If it exits higher, the bathroom needs an ejector pump. Many newer Utah homes already have stubbed-in drains under the slab, which makes the job simpler.',
        es: 'Por lo general, sí. Lo primero que revisamos es por dónde sale el drenaje principal de la casa. Si sale por debajo del piso del sótano, los drenajes nuevos fluyen por gravedad. Si sale más arriba, el baño necesita una bomba eyectora. Muchas casas nuevas en Utah ya tienen drenajes preparados bajo la losa, lo que simplifica el trabajo.',
      },
    },
  ],
}

export const plumbingServices: ServiceInput[] = [
  {
    id: 'fixtures',
    division: 'plumbing',
    slug: { en: 'fixtures', es: 'llaves-y-sanitarios' },
    name: { en: 'Fixture installation', es: 'Instalación de llaves y sanitarios' },
    lede: {
      en: 'Faucets, toilets, sinks and showers set by a licensed plumber as part of your remodel, timed to the tile and cabinets.',
      es: 'Llaves, inodoros, lavabos y regaderas instalados por un plomero con licencia dentro de su remodelación, a tiempo con el azulejo y los gabinetes.',
    },
    seo: {
      en: {
        title: 'Plumbing Fixture Installation | Utah County, UT',
        description:
          'Faucets, toilets, sinks and showers installed in Utah County remodels by Utah-licensed plumbers, scheduled by LSG around tile, cabinets and counters.',
      },
      es: {
        title: 'Instalación de Llaves y Sanitarios | Utah',
        description:
          'Llaves, inodoros, lavabos y regaderas para remodelaciones en el Condado de Utah, por plomeros con licencia y coordinados por LSG con azulejo y gabinetes.',
      },
    },
    body: {
      en: [
        'In a remodel, fixtures happen twice. The shower valve, drain locations and supply stubs go in during rough-in, before the walls close, and the trim, faucets and toilet are set at the very end, after tile and counters. Most bathroom problems trace back to that first visit: a valve set at the wrong depth for the tile, or a drain a couple of inches off from where the vanity ended up. We pin down the fixtures and the layout before the plumber arrives, so the rough-in matches what will actually be installed.',
        'Code sets a few things you will notice. New shower valves must be pressure-balancing or thermostatic, so a flushed toilet does not scald the person in the shower. Every sink and toilet gets its own shutoff valve. Wasatch Front water is hard, so we steer people toward finishes and aerators that are easy to clean of mineral spotting. The installation is done by our Utah-licensed plumbing partner, under a permit pulled on their license when the work requires one.',
      ],
      es: [
        'En una remodelación, los muebles sanitarios se instalan dos veces. La válvula de la regadera, la ubicación de los drenajes y las salidas de agua se colocan en la obra negra, antes de cerrar los muros, y los acabados, las llaves y el inodoro se ponen al final, después del azulejo y las cubiertas. La mayoría de los problemas de un baño vienen de esa primera visita: una válvula a la profundidad equivocada para el azulejo, o un drenaje unos centímetros fuera de donde quedó el mueble del lavabo. Definimos los muebles y la distribución antes de que llegue el plomero, para que la obra negra coincida con lo que realmente se va a instalar.',
        'El código fija algunas cosas que usted notará. Las válvulas de regadera nuevas deben ser de balance de presión o termostáticas, para que jalar el inodoro no queme a quien se está bañando. Cada lavabo e inodoro lleva su propia llave de paso. El agua del Wasatch Front es dura, así que recomendamos acabados y aireadores fáciles de limpiar de manchas de sarro. La instalación la hace nuestro socio plomero con licencia en Utah, con permiso tramitado bajo su licencia cuando el trabajo lo requiere.',
      ],
    },
    spec: [
      { label: { en: 'Performed by', es: 'Realizado por' }, value: { en: 'Utah-licensed plumber, coordinated by LSG', es: 'Plomero con licencia en Utah, coordinado por LSG' } },
      { label: { en: 'Shower valves', es: 'Válvulas de regadera' }, value: { en: 'Pressure-balancing or thermostatic', es: 'De balance de presión o termostáticas' } },
      { label: { en: 'Shutoffs', es: 'Llaves de paso' }, value: { en: 'One at every sink and toilet', es: 'Una en cada lavabo e inodoro' } },
      { label: { en: 'Sequence', es: 'Secuencia' }, value: { en: 'Rough-in before drywall · trim after tile', es: 'Obra negra antes del drywall · acabados después del azulejo' } },
      { label: { en: 'Permit', es: 'Permiso' }, value: { en: 'Pulled under the licensed partner when required', es: 'Tramitado bajo el socio con licencia cuando se requiere' } },
    ],
    pairsWith: ['bathroom-remodeling', 'kitchen-remodeling'],
    status: 'published',
  },
  {
    id: 'water-heaters',
    division: 'plumbing',
    slug: { en: 'water-heaters', es: 'calentadores-de-agua' },
    name: { en: 'Water heaters', es: 'Calentadores de agua' },
    lede: {
      en: 'Tank and tankless units, strapped for seismic code and set up for the hard water this valley runs on.',
      es: 'Calentadores de tanque y de paso, sujetos con correas sísmicas y preparados para el agua dura de este valle.',
    },
    seo: {
      en: {
        title: 'Water Heater Installation | Utah County, UT',
        description:
          'Tank and tankless water heaters in Utah County, installed by Utah-licensed plumbers with seismic strapping and expansion tanks. Coordinated by LSG.',
      },
      es: {
        title: 'Instalación de Calentadores de Agua | Utah',
        description:
          'Calentadores de tanque y de paso en el Condado de Utah, instalados por plomeros con licencia con correas sísmicas y tanque de expansión. Coordinado por LSG.',
      },
    },
    body: {
      en: [
        'The Wasatch Front sits in a high seismic zone, and the code here requires a water heater to be strapped to the wall: two straps, one in the upper third of the tank and one in the lower third, kept clear of the controls. Homes with a pressure-reducing valve, check valve or backflow preventer on the main are closed systems, and they need a thermal expansion tank so heated water has somewhere to go besides the relief valve. That relief valve discharges through a pipe that ends a few inches above the floor or drain, never capped and never pointed at a wall.',
        'Hard water is the other local factor. A tank collects sediment on the bottom that makes it rumble and run less efficiently, so we recommend draining and flushing it about once a year. A tankless unit needs periodic descaling instead, and often a larger gas line and new venting, which is worth pricing before you choose one. Whichever you pick, the installation is done by our Utah-licensed plumbing partner under a permit on their license, and if the space needs a new closet or a raised platform, we build it.',
      ],
      es: [
        'El Wasatch Front está en una zona sísmica alta, y el código aquí exige que el calentador esté sujeto a la pared: dos correas, una en el tercio superior del tanque y otra en el tercio inferior, sin tapar los controles. Las casas con válvula reductora de presión, válvula check o preventor de contraflujo en la toma principal son sistemas cerrados y necesitan un tanque de expansión térmica, para que el agua caliente tenga a dónde ir además de la válvula de alivio. Esa válvula descarga por un tubo que termina a pocos centímetros del piso o del drenaje, nunca tapado y nunca apuntando a la pared.',
        'El agua dura es el otro factor local. Un tanque acumula sedimento en el fondo que lo hace retumbar y trabajar con menos eficiencia, así que recomendamos vaciarlo y enjuagarlo más o menos una vez al año. Un calentador de paso necesita descalcificación periódica y a menudo una línea de gas más grande y ventilación nueva, algo que conviene cotizar antes de elegirlo. Sea cual sea, la instalación la hace nuestro socio plomero con licencia en Utah, con permiso bajo su licencia, y si el espacio necesita un clóset nuevo o una plataforma elevada, nosotros los construimos.',
      ],
    },
    spec: [
      { label: { en: 'Performed by', es: 'Realizado por' }, value: { en: 'Utah-licensed plumber, coordinated by LSG', es: 'Plomero con licencia en Utah, coordinado por LSG' } },
      { label: { en: 'Seismic strapping', es: 'Correas sísmicas' }, value: { en: 'Upper and lower third of the tank', es: 'Tercio superior e inferior del tanque' } },
      { label: { en: 'Expansion tank', es: 'Tanque de expansión' }, value: { en: 'Required on closed systems (PRV, check valve)', es: 'Obligatorio en sistemas cerrados (reductora, check)' } },
      { label: { en: 'Hard water', es: 'Agua dura' }, value: { en: 'Flush tanks yearly · descale tankless units', es: 'Enjuagar tanques cada año · descalcificar los de paso' } },
      { label: { en: 'Permit', es: 'Permiso' }, value: { en: 'Pulled under the licensed partner', es: 'Tramitado bajo la licencia del socio' } },
    ],
    pairsWith: ['basement-finishing'],
    status: 'published',
  },
  {
    id: 'rough-in',
    division: 'plumbing',
    slug: { en: 'rough-in', es: 'plomeria-obra-negra' },
    name: { en: 'Basement and addition rough-in', es: 'Plomería de obra negra para sótanos y ampliaciones' },
    lede: {
      en: 'Drains, vents and supply lines run by a licensed plumber, with the under-slab work cut and re-poured by our own concrete crew.',
      es: 'Drenajes, ventilación y líneas de agua a cargo de un plomero con licencia, con la losa cortada y vuelta a verter por nuestra cuadrilla de concreto.',
    },
    seo: {
      en: {
        title: 'Basement Rough-In Plumbing | Utah County, UT',
        description:
          'Rough-in plumbing for basements and additions in Utah County. Licensed plumbers run drains and vents; our concrete crew handles the slab cut and re-pour.',
      },
      es: {
        title: 'Plomería de Obra Negra para Sótanos | Utah',
        description:
          'Plomería de obra negra para sótanos y ampliaciones en el Condado de Utah. Plomeros con licencia y nuestra cuadrilla de concreto para cortar y verter la losa.',
      },
    },
    body: {
      en: [
        'Rough-in is everything behind the walls and under the floor: drain lines, vents and water supply, set before anything is covered. Drains have to slope toward the sewer, typically a quarter inch per foot on the smaller lines, and every fixture needs venting so the traps hold their water seal and sewer gas stays out of the house. In a basement, the drains usually run under the existing slab, which means cutting a trench through the concrete to reach them.',
        'That is where having one contractor helps most. Our concrete crew saw-cuts and breaks out the trench, our Utah-licensed plumbing partner lays the pipe and pulls the permit under their license, and the system is pressure- or water-tested and inspected with the trench still open. Once it passes, we backfill, compact and pour the slab back flush with the old floor. Above the slab, the supply and vent lines are inspected again at framing rough-in before we close the walls.',
      ],
      es: [
        'La obra negra es todo lo que queda detrás de los muros y bajo el piso: drenajes, ventilación y tuberías de agua, colocados antes de cubrir nada. Los drenajes deben tener pendiente hacia el drenaje principal, normalmente unos 2 centímetros por metro en las líneas pequeñas, y cada mueble necesita ventilación para que las trampas conserven su sello de agua y los gases del drenaje no entren a la casa. En un sótano, los drenajes casi siempre pasan bajo la losa existente, lo que significa cortar una zanja en el concreto para llegar a ellos.',
        'Ahí es donde más ayuda tener un solo contratista. Nuestra cuadrilla de concreto corta con sierra y rompe la zanja, nuestro socio plomero con licencia en Utah coloca la tubería y tramita el permiso bajo su licencia, y el sistema se prueba con presión o agua y se inspecciona con la zanja abierta. Cuando pasa, rellenamos, compactamos y volvemos a verter la losa al ras del piso existente. Arriba de la losa, las líneas de agua y ventilación se inspeccionan de nuevo antes de que cerremos los muros.',
      ],
    },
    spec: [
      { label: { en: 'Performed by', es: 'Realizado por' }, value: { en: 'Utah-licensed plumber, coordinated by LSG', es: 'Plomero con licencia en Utah, coordinado por LSG' } },
      { label: { en: 'Drain slope', es: 'Pendiente de drenaje' }, value: { en: '1/4" per foot on smaller drain lines', es: '2 cm por metro en líneas pequeñas' } },
      { label: { en: 'Slab work', es: 'Trabajo en la losa' }, value: { en: 'Cut, trenched and re-poured by our concrete crew', es: 'Cortada, zanjeada y vuelta a verter por nuestra cuadrilla' } },
      { label: { en: 'Inspections', es: 'Inspecciones' }, value: { en: 'Under-slab with trench open · rough-in before drywall', es: 'Bajo losa con la zanja abierta · obra negra antes del drywall' } },
      { label: { en: 'Permit', es: 'Permiso' }, value: { en: 'Pulled under the licensed partner', es: 'Tramitado bajo la licencia del socio' } },
    ],
    pairsWith: ['basement', 'basement-finishing'],
    status: 'published',
  },
]
