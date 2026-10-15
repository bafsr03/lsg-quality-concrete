import type { DivisionInput, ServiceInput } from './types'

export const landscapingDivision: DivisionInput = {
  id: 'landscaping',
  slug: { en: 'landscaping', es: 'jardineria' },
  name: { en: 'Landscaping', es: 'Jardinería' },
  trade: { en: 'Landscaper', es: 'Contratista de jardinería' },
  lede: {
    en: 'Sod, sprinklers, pavers, retaining walls and water-wise yards, built on graded, drained ground for a Utah summer and a Utah winter.',
    es: 'Césped, riego, adoquines, muros de contención y jardines que ahorran agua, sobre terreno nivelado y drenado para el verano y el invierno de Utah.',
  },
  seo: {
    en: {
      title: 'Landscaping in Utah County, UT',
      description:
        'Sod and sprinkler systems, pavers, retaining walls, xeriscaping, rock and curbing across Utah County and the south Salt Lake Valley. Free written estimates.',
    },
    es: {
      title: 'Jardinería en el Condado de Utah, UT',
      description:
        'Césped y riego, adoquines, muros de contención, jardines de bajo consumo de agua, piedra y bordillos en el Condado de Utah. Presupuesto gratis por escrito.',
    },
  },
  body: {
    en: [
      'Most yards in the new subdivisions around Eagle Mountain, Saratoga Springs and Lehi start as compacted fill with a few inches of topsoil, if that. What goes on top only works if the ground underneath is graded away from the house, the sprinklers are zoned for what they water, and the edges are set so rock, mulch and lawn stay where they were put. That groundwork is the part we spend the most time on.',
      'We also pour the concrete, so a yard can be planned in one pass: the patio, walkway or driveway formed first, then the grading, irrigation, walls and planting around it. One crew, one schedule, and no gap between the slab edge and the sod where two contractors each assumed the other would finish it.',
    ],
    es: [
      'La mayoría de los terrenos en los fraccionamientos nuevos de Eagle Mountain, Saratoga Springs y Lehi empiezan como relleno compactado con unos pocos centímetros de tierra, si acaso. Lo que se pone encima solo funciona si el terreno tiene pendiente que se aleja de la casa, el riego está dividido en zonas según lo que riega y los bordes están fijos para que la piedra, el mantillo y el césped se queden en su lugar. Ese trabajo de base es en lo que más tiempo invertimos.',
      'Como también vertemos el concreto, el jardín se puede planear de una sola vez: primero se cimbra el patio, el andador o la entrada, y después vienen la nivelación, el riego, los muros y las plantas alrededor. Una cuadrilla, un calendario y ningún hueco entre el borde de la losa y el césped porque cada contratista pensó que el otro lo terminaría.',
    ],
  },
  licensedPartner: false,
  faqs: [
    {
      question: { en: 'When is the best time to lay sod in Utah?', es: '¿Cuál es la mejor época para poner césped en Utah?' },
      answer: {
        en: 'Spring and early fall. Sod roots fastest when days are mild and nights are cool. It can go down in summer, but in July heat it needs watering several times a day for the first couple of weeks, and secondary water is usually shut off by mid-October, so late fall installs need another water source.',
        es: 'Primavera e inicio del otoño. El césped enraíza más rápido con días templados y noches frescas. Se puede poner en verano, pero con el calor de julio necesita riego varias veces al día las primeras dos semanas, y el agua secundaria normalmente se corta a mediados de octubre, así que una instalación a finales de otoño necesita otra fuente de agua.',
      },
    },
    {
      question: { en: 'Do I need a permit for a retaining wall?', es: '¿Necesito permiso para un muro de contención?' },
      answer: {
        en: 'Under the building codes most Utah cities adopt, walls over four feet tall measured from the bottom of the footing, or walls holding up a driveway, slope or structure above them, generally need a permit and an engineered design. Lower walls usually do not, but each city sets its own rules, so we confirm with yours before we dig.',
        es: 'Según los códigos de construcción que adoptan la mayoría de las ciudades de Utah, los muros de más de cuatro pies (1.2 m) medidos desde el fondo de la zapata, o los que sostienen una entrada, un talud o una estructura arriba, generalmente requieren permiso y un diseño de ingeniería. Los muros más bajos normalmente no, pero cada ciudad tiene sus propias reglas, así que lo confirmamos con la suya antes de excavar.',
      },
    },
    {
      question: { en: 'Can I get a rebate for replacing my lawn?', es: '¿Puedo recibir un reembolso por quitar mi césped?' },
      answer: {
        en: 'Often, yes. Utah Water Savers runs lawn replacement programs such as Flip Your Strip in many cities, and some water districts run their own. Terms change and most require approval before any grass is removed, so apply and get approved first. We can build the yard to the program requirements once you have it.',
        es: 'Muchas veces sí. Utah Water Savers tiene programas para reemplazar césped, como Flip Your Strip, en muchas ciudades, y algunos distritos de agua tienen los suyos. Las condiciones cambian y la mayoría exige aprobación antes de quitar cualquier pasto, así que primero solicite y obtenga la aprobación. Con eso, construimos el jardín según los requisitos del programa.',
      },
    },
  ],
}

/**
 * The four landscaping services. Written per service: Utah secondary water,
 * freeze-thaw on paver bases and walls, and the water-wise programs that
 * change what a Utah yard is allowed to look like.
 */
export const landscapingServices: ServiceInput[] = [
  {
    id: 'sod-sprinklers',
    division: 'landscaping',
    slug: { en: 'sod-and-sprinklers', es: 'cesped-y-riego' },
    name: { en: 'Sod & sprinkler systems', es: 'Césped y sistemas de riego' },
    lede: {
      en: 'Sprinklers zoned by what they water, drip in the beds, and sod laid on graded, amended soil.',
      es: 'Riego dividido en zonas según lo que riega, goteo en los arriates y césped sobre tierra nivelada y mejorada.',
    },
    seo: {
      en: {
        title: 'Sod & Sprinkler Installation | Utah County, UT',
        description:
          'Sprinkler systems, drip zones, smart controllers and new sod across Utah County. Built for secondary water and Utah winters, with fall blowouts. Free estimates.',
      },
      es: {
        title: 'Instalación de Césped y Riego | Condado de Utah',
        description:
          'Sistemas de riego, goteo, controladores inteligentes y césped nuevo en el Condado de Utah. Hechos para agua secundaria e inviernos de Utah. Presupuesto gratis.',
      },
    },
    body: {
      en: [
        'A sprinkler system is designed before it is dug. We zone by what each area needs: rotors on large lawn areas, sprays on narrow ones, never mixed on the same valve because they put down water at very different rates, and drip on every planting bed. Heads are spaced head to head so each one throws to the next, which is what prevents the dry brown rings that show up by July. A smart, weather-based controller then adjusts run times to the actual weather instead of a schedule set once in May.',
        'Much of Utah County irrigates with secondary, or pressurized irrigation, water rather than culinary water. It is unfiltered and carries sand and silt, so we install a filter ahead of the valves and drip zones. It also usually runs only from spring to around mid-October, which sets the season for new sod. Sod goes down on graded soil with compost tilled in, rolled tight at the seams. Before the first hard freeze every system gets blown out with compressed air, because water left in a lateral line will split it.',
      ],
      es: [
        'Un sistema de riego se diseña antes de excavar. Dividimos las zonas según lo que necesita cada área: rotores en el césped amplio, aspersores fijos en las franjas angostas, nunca mezclados en la misma válvula porque aplican el agua a ritmos muy distintos, y goteo en cada arriate. Los aspersores se colocan de cabeza a cabeza, de modo que cada uno alcanza al siguiente, y eso evita los círculos secos que aparecen en julio. Un controlador inteligente basado en el clima ajusta los tiempos según el tiempo real, no con un horario fijado una vez en mayo.',
        'Gran parte del Condado de Utah riega con agua secundaria, o riego presurizado, en lugar de agua potable. No está filtrada y trae arena y limo, así que instalamos un filtro antes de las válvulas y del goteo. Además, normalmente solo corre de primavera a mediados de octubre, lo que define la temporada para el césped nuevo. El césped se pone sobre tierra nivelada con composta incorporada y bien apretado en las uniones. Antes de la primera helada fuerte, sacamos el agua de cada sistema con aire comprimido, porque el agua que queda en una línea la revienta.',
      ],
    },
    spec: [
      { label: { en: 'Zoning', es: 'Zonas' }, value: { en: 'Rotors, sprays and drip on separate valves', es: 'Rotores, aspersores y goteo en válvulas separadas' } },
      { label: { en: 'Coverage', es: 'Cobertura' }, value: { en: 'Head-to-head spacing', es: 'Aspersores de cabeza a cabeza' } },
      { label: { en: 'Secondary water', es: 'Agua secundaria' }, value: { en: 'Filter ahead of valves and drip', es: 'Filtro antes de válvulas y goteo' } },
      { label: { en: 'Controller', es: 'Controlador' }, value: { en: 'Weather-based smart controller', es: 'Inteligente, basado en el clima' } },
      { label: { en: 'Winterizing', es: 'Invernización' }, value: { en: 'Compressed-air blowout before hard freeze', es: 'Purgado con aire comprimido antes de las heladas' } },
    ],
    pairsWith: ['patios', 'driveways'],
    status: 'published',
  },
  {
    id: 'pavers-walls',
    division: 'landscaping',
    slug: { en: 'pavers-and-retaining-walls', es: 'adoquines-y-muros' },
    name: { en: 'Pavers & retaining walls', es: 'Adoquines y muros de contención' },
    lede: {
      en: 'Paver patios and block walls built on a compacted base deep enough that frost cannot lift them.',
      es: 'Patios de adoquín y muros de bloque sobre una base compactada lo bastante profunda para que la helada no los levante.',
    },
    seo: {
      en: {
        title: 'Pavers & Retaining Walls | Utah County, UT',
        description:
          'Paver patios, walkways and segmental retaining walls across Utah County. Deep compacted base, geogrid and drainage behind every wall. Free written estimates.',
      },
      es: {
        title: 'Adoquines y Muros de Contención | Condado de Utah',
        description:
          'Patios y andadores de adoquín y muros de contención de bloque en el Condado de Utah. Base profunda compactada, geomalla y drenaje. Presupuesto gratis.',
      },
    },
    body: {
      en: [
        'A paver surface is only as good as the base under it. We dig out the topsoil, lay geotextile where the native soil is clay, and build a crushed gravel base in compacted lifts: about four to six inches under a patio or walkway, and eight or more where cars will drive. Then an inch of bedding sand, the pavers, a concrete or spiked edge restraint, and polymeric sand swept into the joints. Done this way, pavers ride out freeze-thaw better than most surfaces, and any that settle can be lifted and reset.',
        'Segmental block walls hold back soil by weight and by geogrid, a mesh laid between courses and run back into the compacted backfill. The bottom course is buried, there is a band of clean drain rock behind the block, and a perforated pipe at the base carries water out, because a wall full of trapped water in January is a wall that bulges. Walls over about four feet, measured from the bottom of the footing, or walls holding a driveway or slope above, generally need a permit and an engineered design; we check with your city first.',
      ],
      es: [
        'Una superficie de adoquín vale lo que vale la base debajo. Retiramos la tierra vegetal, colocamos geotextil donde el suelo es arcilloso y armamos una base de grava triturada compactada por capas: de diez a quince centímetros bajo un patio o andador, y veinte o más donde pasarán coches. Encima va una capa de arena de asiento de unos dos centímetros y medio, los adoquines, un borde de contención de concreto o con clavos, y arena polimérica barrida en las juntas. Así, el adoquín aguanta el hielo y deshielo mejor que casi cualquier superficie, y si alguno se hunde se puede levantar y volver a colocar.',
        'Los muros de bloque segmentado sostienen la tierra por su peso y por la geomalla, una malla que va entre hiladas y se extiende hacia el relleno compactado. La primera hilada va enterrada, detrás del bloque hay una franja de grava limpia de drenaje y un tubo perforado en la base saca el agua, porque un muro lleno de agua atrapada en enero es un muro que se pandea. Los muros de más de cuatro pies (1.2 m) desde el fondo de la zapata, o los que sostienen una entrada o un talud, generalmente requieren permiso y diseño de ingeniería; lo verificamos primero con su ciudad.',
      ],
    },
    spec: [
      { label: { en: 'Paver base', es: 'Base de adoquín' }, value: { en: '4–6" compacted gravel for foot traffic · 8"+ for vehicles', es: '10–15 cm de grava compactada peatonal · 20 cm o más vehicular' } },
      { label: { en: 'Joints and edges', es: 'Juntas y bordes' }, value: { en: 'Polymeric sand, fixed edge restraint', es: 'Arena polimérica, borde de contención fijo' } },
      { label: { en: 'Wall reinforcement', es: 'Refuerzo del muro' }, value: { en: 'Geogrid per the block maker’s design', es: 'Geomalla según el diseño del fabricante del bloque' } },
      { label: { en: 'Wall drainage', es: 'Drenaje del muro' }, value: { en: 'Drain rock behind, perforated pipe at the base', es: 'Grava de drenaje detrás, tubo perforado en la base' } },
      { label: { en: 'Permits', es: 'Permisos' }, value: { en: 'Over ~4 ft or surcharged: permit and engineering, generally', es: 'Más de ~1.2 m o con carga arriba: permiso e ingeniería, por lo general' } },
    ],
    pairsWith: ['patios', 'walkways'],
    status: 'published',
  },
  {
    id: 'xeriscaping',
    division: 'landscaping',
    slug: { en: 'xeriscaping', es: 'jardines-de-bajo-consumo' },
    name: { en: 'Water-wise landscaping', es: 'Jardines de bajo consumo de agua' },
    lede: {
      en: 'Lawn where you actually use it, drip-watered beds everywhere else, laid out the Localscapes way.',
      es: 'Césped solo donde realmente lo usa y arriates con goteo en el resto, con el diseño de Localscapes.',
    },
    seo: {
      en: {
        title: 'Xeriscaping & Water-Wise Yards | Utah County',
        description:
          'Water-wise landscaping and lawn conversions in Utah County, designed around Localscapes and built to Utah Water Savers program requirements. Free estimates.',
      },
      es: {
        title: 'Jardines de Bajo Consumo de Agua | Utah',
        description:
          'Jardines que ahorran agua y conversión de césped en el Condado de Utah, con el diseño de Localscapes y según los programas de Utah Water Savers.',
      },
    },
    body: {
      en: [
        'A water-wise yard is not a yard of gravel. We lay it out on the Localscapes model developed by Utah water districts: start with a central open shape, lawn if you use it or a hardscape or groundcover if you do not, then gathering areas, paths that connect them, and planting beds around the edges. Lawn stays where kids and dogs actually play and comes out of the strips and corners that only ever get mowed. Beds are planted with species suited to Utah and watered by drip, not spray.',
        'Utah Water Savers runs incentive programs for lawn replacement, including Flip Your Strip for park strips, and some cities and water districts run their own. Their terms, eligible cities and funding change from year to year, and most require you to apply and be approved before any grass comes out. Remove it first and you may lose the incentive. Check the current terms, get your approval, and we will build the conversion to what the program asks for.',
      ],
      es: [
        'Un jardín que ahorra agua no es un jardín de pura grava. Lo diseñamos según el modelo Localscapes, creado por los distritos de agua de Utah: primero una forma central abierta, césped si lo usa o una superficie dura o cubresuelos si no, luego áreas de reunión, senderos que las conectan y arriates alrededor. El césped se queda donde los niños y los perros realmente juegan y sale de las franjas y esquinas que solo se podan. Los arriates llevan plantas adecuadas para Utah y se riegan por goteo, no por aspersión.',
        'Utah Water Savers ofrece programas de incentivos para reemplazar césped, entre ellos Flip Your Strip para las franjas junto a la banqueta, y algunas ciudades y distritos de agua tienen los suyos. Las condiciones, las ciudades elegibles y los fondos cambian de un año a otro, y la mayoría exige solicitar y recibir aprobación antes de quitar el pasto. Si lo quita primero, puede perder el incentivo. Revise las condiciones vigentes, obtenga su aprobación y construimos la conversión según lo que pida el programa.',
      ],
    },
    spec: [
      { label: { en: 'Layout', es: 'Diseño' }, value: { en: 'Localscapes: central open shape, gathering areas, paths, beds', es: 'Localscapes: forma central, áreas de reunión, senderos, arriates' } },
      { label: { en: 'Bed irrigation', es: 'Riego de arriates' }, value: { en: 'Drip to each plant, no overhead spray', es: 'Goteo a cada planta, sin aspersión' } },
      { label: { en: 'Plants', es: 'Plantas' }, value: { en: 'Species suited to Utah’s dry climate', es: 'Especies adecuadas al clima seco de Utah' } },
      { label: { en: 'Incentives', es: 'Incentivos' }, value: { en: 'Get program approval before removing lawn', es: 'Obtenga aprobación antes de quitar el césped' } },
    ],
    pairsWith: ['walkways', 'patios'],
    status: 'published',
  },
  {
    id: 'rock-curbing',
    division: 'landscaping',
    slug: { en: 'rock-mulch-and-curbing', es: 'piedra-mantillo-y-bordillos' },
    name: { en: 'Rock, mulch & landscape curbing', es: 'Piedra, mantillo y bordillos' },
    lede: {
      en: 'Clean edges, the right depth of rock or mulch, and a curb that keeps the lawn out of the beds.',
      es: 'Bordes limpios, la profundidad correcta de piedra o mantillo y un bordillo que separa el césped de los arriates.',
    },
    seo: {
      en: {
        title: 'Landscape Rock, Mulch & Curbing | Utah County',
        description:
          'Decorative rock, bark mulch and concrete landscape curbing across Utah County and the south Salt Lake Valley. Graded beds, clean edges, free estimates.',
      },
      es: {
        title: 'Piedra, Mantillo y Bordillos | Condado de Utah',
        description:
          'Piedra decorativa, mantillo de corteza y bordillos de concreto para jardín en el Condado de Utah y el sur del Valle de Salt Lake. Presupuesto gratis.',
      },
    },
    body: {
      en: [
        'Rock and mulch beds are mostly prep. We grade the bed so it still falls away from the foundation, then cover it at a real depth: two to three inches of rock over a woven weed barrier, or two to three inches of bark mulch, which breaks down and feeds the soil so it is better laid straight on soil without fabric. Against the house we usually recommend rock, and we keep both below the siding and the weep screed so water and insects have no bridge into the wall.',
        'Landscape curbing is a continuous concrete border extruded in place by a curbing machine, so it follows any curve with no seams to separate. It is what keeps sod from creeping into the rock and gives the mower a track to run a wheel along. We cut control joints into it every few feet while it is fresh, so the freeze-thaw cracks it will eventually get happen in a straight line at the joint and not across the middle of a run.',
      ],
      es: [
        'Los arriates de piedra y mantillo son sobre todo preparación. Nivelamos el arriate para que siga drenando lejos de los cimientos y luego lo cubrimos a una profundidad real: de cinco a ocho centímetros de piedra sobre malla antihierba tejida, o de cinco a ocho centímetros de mantillo de corteza, que se descompone y alimenta la tierra, por lo que conviene ponerlo directo sobre el suelo sin malla. Junto a la casa normalmente recomendamos piedra, y mantenemos ambos por debajo del revestimiento y del borde de desagüe del estuco, para que el agua y los insectos no tengan paso al muro.',
        'El bordillo de jardín es una orilla continua de concreto que una máquina extruye en el sitio, así que sigue cualquier curva sin uniones que se separen. Es lo que evita que el césped invada la piedra y le da a la podadora una guía para la rueda. Mientras está fresco le cortamos juntas de control cada pocos pies, para que las grietas que el hielo y deshielo tarde o temprano producen queden rectas en la junta y no a la mitad de un tramo.',
      ],
    },
    spec: [
      { label: { en: 'Rock depth', es: 'Profundidad de piedra' }, value: { en: '2–3" over woven weed barrier', es: '5–8 cm sobre malla antihierba tejida' } },
      { label: { en: 'Mulch depth', es: 'Profundidad de mantillo' }, value: { en: '2–3" bark, directly on soil', es: '5–8 cm de corteza, directo sobre la tierra' } },
      { label: { en: 'Grade', es: 'Pendiente' }, value: { en: 'Falls away from the foundation, kept below siding', es: 'Se aleja de los cimientos, por debajo del revestimiento' } },
      { label: { en: 'Curbing', es: 'Bordillo' }, value: { en: 'Extruded concrete, control cuts every few feet', es: 'Concreto extruido, juntas de control cada pocos pies' } },
    ],
    pairsWith: ['driveways', 'walkways'],
    status: 'published',
  },
]
