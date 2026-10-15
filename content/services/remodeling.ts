import type { DivisionInput, ServiceInput } from './types'

export const remodelingDivision: DivisionInput = {
  id: 'remodeling',
  slug: { en: 'remodeling', es: 'remodelacion' },
  name: { en: 'Remodeling', es: 'Remodelación' },
  trade: { en: 'Remodeling contractor', es: 'Contratista de remodelación' },
  lede: {
    en: 'Basements, kitchens, bathrooms, framing and drywall, planned around the permit and built in the right order.',
    es: 'Sótanos, cocinas, baños, estructura y drywall, planeados en torno al permiso y construidos en el orden correcto.',
  },
  seo: {
    en: {
      title: 'Remodeling Contractor in Utah County, UT',
      description:
        'Basement finishing, kitchen and bathroom remodels, framing and drywall across Utah County and the south Salt Lake Valley. Permits handled. Free written estimates.',
    },
    es: {
      title: 'Remodelación en el Condado de Utah, UT',
      description:
        'Acabado de sótanos, remodelación de cocinas y baños, estructura y drywall en el Condado de Utah y el sur del Valle de Salt Lake. Presupuesto gratis.',
    },
  },
  body: {
    en: [
      'Most of the remodeling we do starts below grade. A lot of homes in Eagle Mountain, Saratoga Springs and Lehi were sold with an unfinished basement, and turning that space into bedrooms, a family room or a rental is the job we are asked for most. We frame, hang and finish drywall, paint, set cabinets and trim with our own crew, and we schedule the inspections so nothing gets covered up before the city has seen it.',
      'Electrical and plumbing inside a remodel are done by Utah-licensed electricians and plumbers we partner with, under their own licenses and permits. We coordinate them so the rough-in happens after framing and before insulation, and you deal with one schedule and one point of contact instead of three separate trades.',
    ],
    es: [
      'La mayor parte de nuestras remodelaciones empieza bajo el nivel del suelo. Muchas casas en Eagle Mountain, Saratoga Springs y Lehi se vendieron con el sótano sin terminar, y convertir ese espacio en recámaras, una sala familiar o un departamento es el trabajo que más nos piden. Nuestra propia cuadrilla arma la estructura, coloca y termina el drywall, pinta, instala gabinetes y molduras, y programamos las inspecciones para que nada se cubra antes de que la ciudad lo revise.',
      'La parte eléctrica y de plomería dentro de una remodelación la realizan electricistas y plomeros con licencia de Utah con quienes trabajamos, bajo sus propias licencias y permisos. Nosotros los coordinamos para que la instalación se haga después de la estructura y antes del aislamiento, y usted trata con un solo calendario y un solo contacto en lugar de tres oficios por separado.',
    ],
  },
  heroImageId: '22988377-remodeling-1',
  licensedPartner: false,
  faqs: [
    {
      question: { en: 'Do I need a permit to finish my basement?', es: '¿Necesito permiso para terminar mi sótano?' },
      answer: {
        en: 'In the cities we work in, yes. Finishing a basement adds habitable space, so the building department wants to see framing, electrical, plumbing and insulation before drywall goes up. Unpermitted basements also tend to come up when you sell the house.',
        es: 'En las ciudades donde trabajamos, sí. Terminar un sótano agrega espacio habitable, así que el departamento de construcción revisa la estructura, la electricidad, la plomería y el aislamiento antes de colocar el drywall. Un sótano sin permiso también suele causar problemas al vender la casa.',
      },
    },
    {
      question: { en: 'Do you do the electrical and plumbing yourselves?', es: '¿Ustedes hacen la electricidad y la plomería?' },
      answer: {
        en: 'No. That work is done by Utah-licensed electricians and plumbers we partner with, and their permits are pulled under their licenses. We schedule them around our framing and drywall so the job keeps moving.',
        es: 'No. Ese trabajo lo hacen electricistas y plomeros con licencia de Utah con quienes trabajamos, y los permisos se tramitan bajo sus licencias. Nosotros los programamos junto con la estructura y el drywall para que la obra no se detenga.',
      },
    },
    {
      question: { en: 'Can we live in the house during a remodel?', es: '¿Podemos vivir en la casa durante la remodelación?' },
      answer: {
        en: 'Usually, yes. A basement can be closed off with plastic and a separate path in and out. A kitchen remodel is harder; we will tell you up front how long you will be without a sink or a stove so you can plan for it.',
        es: 'Por lo general, sí. Un sótano se puede aislar con plástico y un paso aparte para entrar y salir. Una cocina es más difícil; le decimos desde el principio cuánto tiempo estará sin fregadero o estufa para que pueda organizarse.',
      },
    },
  ],
}

/**
 * The five remodeling services. Electrical and plumbing inside these jobs are
 * performed by Utah-licensed partners; the copy says so wherever it comes up.
 */
export const remodelingServices: ServiceInput[] = [
  {
    id: 'basement-finishing',
    division: 'remodeling',
    slug: { en: 'basement-finishing', es: 'acabado-de-sotanos' },
    name: { en: 'Basement finishing', es: 'Acabado de sótanos' },
    lede: {
      en: 'Permitted basement finishes with code-sized egress windows, framing built for a concrete floor, and inspections scheduled in order.',
      es: 'Sótanos terminados con permiso, ventanas de escape del tamaño que pide el código y estructura pensada para un piso de concreto.',
    },
    seo: {
      en: {
        title: 'Basement Finishing in Utah County, UT',
        description:
          'Permitted basement finishing in Utah County and the south Salt Lake Valley: framing, egress windows, drywall and paint. Inspections scheduled. Free estimates.',
      },
      es: {
        title: 'Acabado de Sótanos en el Condado de Utah',
        description:
          'Terminamos sótanos con permiso en el Condado de Utah: estructura, ventanas de escape, drywall y pintura. Coordinamos las inspecciones. Presupuesto gratis.',
      },
    },
    body: {
      en: [
        'A basement bedroom is only a bedroom if it has a way out. The IRC requires an emergency escape opening in every sleeping room: at least 5.7 square feet of net clear opening, no less than 24 inches high and 20 inches wide, with the sill no more than 44 inches off the floor. Below grade that window needs a well at least 9 square feet in area and 36 inches in each direction, and a well deeper than 44 inches needs a permanent ladder or steps. Where the existing window is too small, we cut the foundation and set a larger one before any framing goes in.',
        'Framing over a concrete slab is where moisture shows up. We use a treated bottom plate on the slab, keep wall framing off the foundation so there is room for insulation, and look for signs of water before we close anything in, because drywall hides a leak until it is mold. Electrical and plumbing rough-in are done by our Utah-licensed partners under their permits, and nothing gets covered until the city has signed off on framing, rough-in and insulation.',
      ],
      es: [
        'Una recámara en el sótano solo cuenta como recámara si tiene por dónde salir. El código IRC exige una abertura de escape en cada cuarto para dormir: al menos 5.7 pies cuadrados (unos 0.53 m²) de abertura libre, con un mínimo de 24 pulgadas de alto y 20 de ancho, y el alféizar a no más de 44 pulgadas (112 cm) del piso. Bajo el nivel del suelo esa ventana necesita un pozo de por lo menos 9 pies cuadrados y 36 pulgadas por lado, y si el pozo mide más de 44 pulgadas de profundidad debe llevar escalera fija. Si la ventana existente es muy pequeña, cortamos el cimiento y colocamos una más grande antes de armar cualquier muro.',
        'Al armar muros sobre una losa de concreto es donde aparece la humedad. Usamos una solera inferior tratada sobre la losa, separamos la estructura del muro de cimentación para dejar espacio al aislamiento y revisamos señales de agua antes de cerrar, porque el drywall esconde una filtración hasta que se convierte en moho. La instalación eléctrica y de plomería la hacen nuestros socios con licencia de Utah bajo sus permisos, y no se cubre nada hasta que la ciudad aprueba la estructura, las instalaciones y el aislamiento.',
      ],
    },
    spec: [
      { label: { en: 'Egress opening', es: 'Abertura de escape' }, value: { en: '5.7 sq ft net clear · min 24" high, 20" wide', es: '5.7 pies² libres · mín. 24" de alto y 20" de ancho' } },
      { label: { en: 'Sill height', es: 'Altura del alféizar' }, value: { en: '44" max above the finished floor', es: 'Máx. 44" (112 cm) sobre el piso terminado' } },
      { label: { en: 'Window well', es: 'Pozo de ventana' }, value: { en: '9 sq ft min, 36" each way · ladder if over 44" deep', es: 'Mín. 9 pies², 36" por lado · escalera si pasa de 44"' } },
      { label: { en: 'Wall on slab', es: 'Muro sobre losa' }, value: { en: 'Treated bottom plate, framed off the foundation', es: 'Solera inferior tratada, separada del cimiento' } },
      { label: { en: 'Inspections', es: 'Inspecciones' }, value: { en: 'Framing, rough-in, insulation, then final', es: 'Estructura, instalaciones, aislamiento y final' } },
    ],
    heroImageId: '22988378-remodeling-2',
    pairsWith: ['remodel-wiring', 'basement'],
    status: 'published',
  },
  {
    id: 'kitchen-remodeling',
    division: 'remodeling',
    slug: { en: 'kitchen-remodeling', es: 'remodelacion-de-cocinas' },
    name: { en: 'Kitchen remodeling', es: 'Remodelación de cocinas' },
    lede: {
      en: 'Cabinets set level, counters templated after install, and the trades sequenced so the kitchen is down for as short a time as possible.',
      es: 'Gabinetes nivelados, cubiertas medidas después de instalar y oficios en orden para que la cocina esté fuera de uso el menor tiempo posible.',
    },
    seo: {
      en: {
        title: 'Kitchen Remodeling in Utah County, UT',
        description:
          'Kitchen remodels across Utah County and the south Salt Lake Valley: layout, cabinets, countertops, floors and paint, with licensed electrical and plumbing partners.',
      },
      es: {
        title: 'Remodelación de Cocinas en el Condado de Utah',
        description:
          'Remodelamos cocinas en el Condado de Utah: distribución, gabinetes, cubiertas, pisos y pintura, con electricistas y plomeros asociados con licencia.',
      },
    },
    body: {
      en: [
        'A kitchen is the room where the order of work matters most. Walls get opened and framed first, then the electrical and plumbing rough-in, done by our Utah-licensed partners under their permits, then drywall, flooring and cabinets. Countertops come last: quartz and granite are templated from the cabinets once they are set, not from the drawings, because a quarter inch out of level at the base shows up as a gap at the backsplash.',
        'Before anything is ordered we walk the layout with you. Swapping cabinets and counters in the same footprint is the fastest and least expensive version of the job. Moving the sink, the range or a wall means new plumbing, venting and circuits, usually a permit, and more time without a working kitchen. We tell you which of those your plan triggers so the choice is yours.',
      ],
      es: [
        'La cocina es el cuarto donde el orden del trabajo más importa. Primero se abren y arman los muros, luego viene la instalación eléctrica y de plomería, que hacen nuestros socios con licencia de Utah bajo sus permisos, y después el drywall, el piso y los gabinetes. Las cubiertas van al final: el cuarzo y el granito se miden sobre los gabinetes ya instalados, no sobre el plano, porque un desnivel pequeño en la base se nota como una abertura en el salpicadero.',
        'Antes de pedir cualquier material revisamos la distribución con usted. Cambiar gabinetes y cubiertas en el mismo lugar es la versión más rápida y económica. Mover el fregadero, la estufa o un muro implica nueva plomería, ventilación y circuitos, normalmente un permiso y más tiempo sin cocina. Le explicamos qué implica su plan para que usted decida.',
      ],
    },
    spec: [
      { label: { en: 'Sequence', es: 'Secuencia' }, value: { en: 'Framing → rough-in → drywall → floor → cabinets → tops', es: 'Estructura → instalaciones → drywall → piso → gabinetes → cubiertas' } },
      { label: { en: 'Countertops', es: 'Cubiertas' }, value: { en: 'Templated after cabinets are set and leveled', es: 'Medidas después de instalar y nivelar gabinetes' } },
      { label: { en: 'Electrical & plumbing', es: 'Electricidad y plomería' }, value: { en: 'Utah-licensed partners, under their permits', es: 'Socios con licencia de Utah, con sus permisos' } },
      { label: { en: 'Permit', es: 'Permiso' }, value: { en: 'Usually needed when walls, plumbing or circuits move', es: 'Normalmente si se mueven muros, plomería o circuitos' } },
    ],
    heroImageId: '22988364-remodeling-15',
    pairsWith: ['remodel-wiring', 'fixtures'],
    status: 'published',
  },
  {
    id: 'bathroom-remodeling',
    division: 'remodeling',
    slug: { en: 'bathroom-remodeling', es: 'remodelacion-de-banos' },
    name: { en: 'Bathroom remodeling', es: 'Remodelación de baños' },
    lede: {
      en: 'Showers waterproofed behind the tile, floors sloped to the drain, and a fan that actually vents outside.',
      es: 'Regaderas impermeabilizadas detrás del azulejo, pisos con pendiente al desagüe y un extractor que sí ventila al exterior.',
    },
    seo: {
      en: {
        title: 'Bathroom Remodeling in Utah County, UT',
        description:
          'Bathroom remodels in Utah County and the south Salt Lake Valley: waterproofed tile showers, vanities, flooring and paint. Licensed plumbing and electrical partners.',
      },
      es: {
        title: 'Remodelación de Baños en el Condado de Utah',
        description:
          'Remodelamos baños en el Condado de Utah: regaderas de azulejo impermeabilizadas, muebles de baño, pisos y pintura, con plomeros y electricistas con licencia.',
      },
    },
    body: {
      en: [
        'Tile is not waterproof, and grout is less so. What keeps a shower from rotting the wall behind it is the layer under the tile: cement board or another rated backer, a waterproofing membrane over it, and a shower floor sloped a quarter inch per foot to the drain so water never sits. We do that layer ourselves and do not skip it to save a day, because a failed shower pan usually means tearing the whole thing out.',
        'A bathroom without an operable window needs an exhaust fan ducted to the outside, not into the attic, and we size it to the room. Valves, drains and supply lines are installed by our Utah-licensed plumbing partner, and lights, fan and GFCI outlets by a licensed electrician, each under their own permit. We handle the demolition, framing, backer, tile, vanity, trim and paint, and keep everyone on one schedule.',
      ],
      es: [
        'El azulejo no es impermeable, y la boquilla todavía menos. Lo que evita que una regadera pudra el muro de atrás es la capa debajo del azulejo: tablero de cemento u otro respaldo aprobado, una membrana impermeable encima y un piso de regadera con pendiente de un cuarto de pulgada por pie hacia el desagüe para que el agua nunca se quede. Esa capa la hacemos nosotros y no la saltamos para ganar un día, porque una base de regadera que falla casi siempre obliga a demoler todo.',
        'Un baño sin ventana que se abra necesita un extractor con ducto hacia el exterior, no hacia el ático, y lo dimensionamos según el cuarto. Las válvulas, desagües y tuberías los instala nuestro plomero asociado con licencia de Utah, y la iluminación, el extractor y los contactos GFCI un electricista con licencia, cada uno con su propio permiso. Nosotros hacemos la demolición, la estructura, el respaldo, el azulejo, el mueble de baño, las molduras y la pintura, y mantenemos a todos en un solo calendario.',
      ],
    },
    spec: [
      { label: { en: 'Shower walls', es: 'Muros de regadera' }, value: { en: 'Cement board or rated backer + waterproof membrane', es: 'Tablero de cemento o respaldo aprobado + membrana impermeable' } },
      { label: { en: 'Shower floor', es: 'Piso de regadera' }, value: { en: 'Sloped 1/4" per foot to the drain', es: 'Pendiente de 1/4" por pie hacia el desagüe' } },
      { label: { en: 'Ventilation', es: 'Ventilación' }, value: { en: 'Exhaust fan ducted outdoors', es: 'Extractor con ducto al exterior' } },
      { label: { en: 'Plumbing & electrical', es: 'Plomería y electricidad' }, value: { en: 'Utah-licensed partners, under their permits', es: 'Socios con licencia de Utah, con sus permisos' } },
    ],
    heroImageId: '22988370-remodeling-22',
    pairsWith: ['fixtures', 'rough-in'],
    status: 'published',
  },
  {
    id: 'framing',
    division: 'remodeling',
    slug: { en: 'framing', es: 'estructuras-de-madera' },
    name: { en: 'Framing', es: 'Estructuras de madera' },
    lede: {
      en: 'Basement walls, partitions and additions framed plumb and square, with structural changes engineered and permitted first.',
      es: 'Muros de sótano, divisiones y ampliaciones armados a plomo y a escuadra, con los cambios estructurales calculados y con permiso.',
    },
    seo: {
      en: {
        title: 'Framing Contractor in Utah County, UT',
        description:
          'Basement framing, interior walls and home additions across Utah County. Non-structural walls framed fast; structural changes engineered and permitted first.',
      },
      es: {
        title: 'Estructuras de Madera en el Condado de Utah',
        description:
          'Armado de muros de sótano, divisiones interiores y ampliaciones en el Condado de Utah. Los cambios estructurales se calculan y se tramitan con permiso.',
      },
    },
    body: {
      en: [
        'Most of our framing is interior: basement walls, new bedrooms, closets and soffits to hide ductwork. Those walls are non-structural, so the work is about accuracy. Studs at 16 inches on center so drywall breaks on a stud, walls plumb and square so cabinets and doors fit later, and fireblocking where the code requires it in soffits and at the top of furred walls. Framing is the first inspection on a basement finish, and a wall that passes clean keeps the rest of the schedule on time.',
        'Structural work is a different job. Removing or opening a load-bearing wall, cutting a new window in an exterior wall or framing an addition changes how the house carries its load, so it needs a beam or header sized by an engineer and a permit before we cut anything. Additions also have to carry the local roof snow load, which in Utah depends on elevation and is set by the building department. We shore the structure while the new beam goes in.',
      ],
      es: [
        'La mayor parte de nuestro armado es interior: muros de sótano, recámaras nuevas, clósets y plafones para ocultar ductos. Esos muros no son estructurales, así que el trabajo se trata de precisión. Montantes a 16 pulgadas de centro a centro para que el drywall una sobre un montante, muros a plomo y a escuadra para que gabinetes y puertas ajusten después, y cortafuegos donde el código los exige en plafones y en la parte alta de los muros. La estructura es la primera inspección de un sótano, y un muro que pasa a la primera mantiene el resto del calendario a tiempo.',
        'El trabajo estructural es otra cosa. Quitar o abrir un muro de carga, abrir una ventana nueva en un muro exterior o armar una ampliación cambia cómo la casa reparte su peso, así que necesita una viga o un dintel calculado por un ingeniero y un permiso antes de cortar nada. Una ampliación además debe soportar la carga de nieve local, que en Utah depende de la altitud y la fija el departamento de construcción. Apuntalamos la estructura mientras se coloca la viga nueva.',
      ],
    },
    spec: [
      { label: { en: 'Stud spacing', es: 'Separación de montantes' }, value: { en: '16" on center, plumb and square', es: '16" de centro a centro, a plomo y a escuadra' } },
      { label: { en: 'Fireblocking', es: 'Cortafuegos' }, value: { en: 'At soffits and furred walls, per IRC', es: 'En plafones y muros forrados, según el IRC' } },
      { label: { en: 'Load-bearing walls', es: 'Muros de carga' }, value: { en: 'Engineered beam or header + permit before cutting', es: 'Viga o dintel calculado + permiso antes de cortar' } },
      { label: { en: 'Additions', es: 'Ampliaciones' }, value: { en: 'Roof framed for the local snow load', es: 'Techo armado para la carga de nieve local' } },
    ],
    pairsWith: ['remodel-wiring', 'rough-in'],
    status: 'published',
  },
  {
    id: 'drywall-painting',
    division: 'remodeling',
    slug: { en: 'drywall-painting', es: 'drywall-y-pintura' },
    name: { en: 'Drywall & painting', es: 'Drywall y pintura' },
    lede: {
      en: 'Hung, taped and finished to the level the paint and the light call for, then primed and painted by the same crew.',
      es: 'Colocado, encintado y terminado al nivel que piden la pintura y la luz, y luego sellado y pintado por la misma cuadrilla.',
    },
    seo: {
      en: {
        title: 'Drywall & Painting in Utah County, UT',
        description:
          'Drywall hanging, taping, finishing and interior painting across Utah County and the south Salt Lake Valley. Basements, remodels and repairs. Free estimates.',
      },
      es: {
        title: 'Drywall y Pintura en el Condado de Utah',
        description:
          'Colocación, encintado y acabado de drywall y pintura interior en el Condado de Utah. Sótanos, remodelaciones y reparaciones. Presupuesto gratis por escrito.',
      },
    },
    body: {
      en: [
        'Drywall is judged under light. Finish is graded in levels, and Level 4, three coats over the tape and screws, is the standard for walls getting a flat or eggshell paint. Where a long wall catches low light from a window, or the paint has any sheen, we go to Level 5 with a skim coat over the whole surface, because that is the only way joints stop showing. We use 5/8 inch board on ceilings where sag is a risk, moisture-resistant board in bathrooms and laundry rooms, and fire-rated Type X where the code calls for it, such as between a garage and living space.',
        'New drywall gets a primer before any color goes on, or the paint flashes where the mud is. In Utah\'s dry air compound dries fast in summer, and in a cold basement in winter it barely dries at all, so we keep the space heated between coats instead of rushing the next one. We also patch and repaint after other trades, closing up the holes left by an electrician or plumber so the wall looks like it was never opened.',
      ],
      es: [
        'El drywall se juzga con la luz. El acabado se clasifica en niveles, y el Nivel 4, tres capas sobre la cinta y los tornillos, es el estándar para muros con pintura mate o satinada. Donde un muro largo recibe luz rasante de una ventana, o la pintura tiene algo de brillo, pasamos al Nivel 5 con una capa delgada sobre toda la superficie, porque es la única forma de que las juntas dejen de notarse. Usamos placa de 5/8 de pulgada en techos donde hay riesgo de que se pandee, placa resistente a la humedad en baños y lavanderías, y placa Tipo X resistente al fuego donde lo exige el código, como entre el garaje y la vivienda.',
        'El drywall nuevo lleva sellador antes de cualquier color, o la pintura se ve dispareja donde está la pasta. Con el aire seco de Utah el compuesto seca rápido en verano, y en un sótano frío en invierno casi no seca, así que mantenemos el espacio con calefacción entre capas en lugar de apurar la siguiente. También resanamos y repintamos después de otros oficios, cerrando los huecos que deja un electricista o un plomero para que el muro parezca que nunca se abrió.',
      ],
    },
    spec: [
      { label: { en: 'Finish level', es: 'Nivel de acabado' }, value: { en: 'Level 4 standard · Level 5 for sheen or raking light', es: 'Nivel 4 estándar · Nivel 5 con brillo o luz rasante' } },
      { label: { en: 'Board', es: 'Placa' }, value: { en: '1/2" walls · 5/8" ceilings · Type X where required', es: '1/2" en muros · 5/8" en techos · Tipo X donde se exige' } },
      { label: { en: 'Wet rooms', es: 'Cuartos húmedos' }, value: { en: 'Moisture-resistant board; cement board in showers', es: 'Placa resistente a la humedad; tablero de cemento en regaderas' } },
      { label: { en: 'Paint', es: 'Pintura' }, value: { en: 'Primer on new drywall, then two finish coats', es: 'Sellador sobre drywall nuevo y dos manos de acabado' } },
    ],
    heroImageId: '22988362-remodeling-13',
    pairsWith: ['remodel-wiring', 'lighting'],
    status: 'published',
  },
]
