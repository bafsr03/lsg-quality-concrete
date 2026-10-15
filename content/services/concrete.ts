import type { DivisionInput, ServiceInput } from './types'

export const concreteDivision: DivisionInput = {
  id: 'concrete',
  slug: { en: 'concrete', es: 'concreto' },
  name: { en: 'Concrete', es: 'Concreto' },
  trade: { en: 'Concrete contractor', es: 'Contratista de concreto' },
  lede: {
    en: 'Driveways, patios, steps and slabs, formed, poured and finished by our own crew for a Utah freeze-thaw winter.',
    es: 'Entradas, patios, escalones y losas que nuestra propia cuadrilla cimbra, vierte y termina para el invierno de Utah.',
  },
  seo: {
    en: {
      title: 'Concrete Contractor in Utah County, UT',
      description:
        'Concrete driveways, patios, steps, floors and repair across Utah County and the south Salt Lake Valley. Air-entrained mixes, cut joints, free written estimates.',
    },
    es: {
      title: 'Contratista de Concreto en el Condado de Utah',
      description:
        'Entradas, patios, escalones, pisos y reparación de concreto en el Condado de Utah y el sur del Valle de Salt Lake. Presupuesto gratis por escrito.',
    },
  },
  body: {
    en: [
      'Concrete is where LSG started, and it is still the work we do the most of. Every slab is formed, reinforced, poured and finished by our own crew rather than handed to whoever is free that week, which is why the details that decide whether a slab lasts in this valley — compacted base, steel lifted into the slab, joints cut early, an air-entrained mix — are the same on a forty-foot driveway as on a single step.',
      'Along the Wasatch Front a slab goes through well over a hundred freeze-thaw cycles a year and a winter of de-icing salt. That is the test every pour here has to pass, and it is what each service page below spells out in numbers: depths, reinforcement, joint spacing and drainage.',
    ],
    es: [
      'El concreto es donde empezó LSG y sigue siendo el trabajo que más hacemos. Cada losa la cimbra, refuerza, vierte y termina nuestra propia cuadrilla, en lugar de pasarla a quien esté libre esa semana. Por eso los detalles que deciden si una losa dura en este valle —base compactada, acero levantado dentro de la losa, juntas cortadas a tiempo y mezcla con aire incluido— son iguales en una entrada de doce metros que en un solo escalón.',
      'En el Wasatch Front una losa pasa por más de cien ciclos de hielo y deshielo al año y un invierno de sal para derretir hielo. Esa es la prueba que todo vertido debe pasar aquí, y es lo que cada página de servicio detalla en números: espesores, refuerzo, separación de juntas y drenaje.',
    ],
  },
  heroImageId: '22988390-concrete-new-gallery-5',
  faqs: [
    {
      question: { en: 'How soon can I drive on a new driveway?', es: '¿Cuándo puedo manejar sobre una entrada nueva?' },
      answer: {
        en: 'Foot traffic after a day or two, cars after about a week, and heavy trucks or RVs after the slab has had closer to a month to gain strength. We give you the dates for your pour in writing.',
        es: 'Se puede caminar después de uno o dos días, pasar con coches después de una semana y con camionetas pesadas o casas rodantes cuando la losa lleva cerca de un mes ganando resistencia. Le damos las fechas de su vertido por escrito.',
      },
    },
    {
      question: { en: 'Should I salt my new concrete?', es: '¿Puedo echar sal a mi concreto nuevo?' },
      answer: {
        en: 'Not in its first winter. De-icing salts are what flake the surface of young concrete; use sand for grip, and once it has cured, a penetrating sealer helps every winter after.',
        es: 'No durante su primer invierno. La sal para derretir hielo es lo que descascara la superficie del concreto joven; use arena para el agarre y, una vez curado, un sellador penetrante ayuda cada invierno.',
      },
    },
    {
      question: { en: 'Do you repair concrete or only replace it?', es: '¿Reparan concreto o solo lo reemplazan?' },
      answer: {
        en: 'Both. A sunken or cracked section can often be cut out and replaced on its own, and we tell you honestly when a slab is past saving rather than patching something that will fail again next spring.',
        es: 'Ambas cosas. Una sección hundida o agrietada muchas veces se puede cortar y reemplazar sola, y le decimos con honestidad cuando una losa ya no tiene arreglo en lugar de parchar algo que volverá a fallar la próxima primavera.',
      },
    },
  ],
}

/**
 * The nine services. Copy is written per service — the Utah-specific detail
 * (freeze-thaw counts, de-icer damage, slab depths, joint spacing) is the whole
 * point, and it is what the competing sites in this metro do not carry.
 */
export const concreteServices: ServiceInput[] = [
  {
    id: 'driveways',
    division: 'concrete',
    pairsWith: ['pavers-walls', 'rock-curbing'],
    slug: { en: 'driveways', es: 'entradas' },
    name: { en: 'Concrete driveways', es: 'Entradas de concreto' },
    lede: {
      en: 'Four inches minimum, reinforced, jointed to the garage apron, and poured to drain away from the house.',
      es: 'Diez centímetros como mínimo, reforzada, con juntas hasta el acceso del garaje y vertida para drenar lejos de la casa.',
    },
    seo: {
      en: {
        title: 'Concrete Driveway Contractor | Utah County, UT',
        description:
          'New concrete driveways and replacements across Utah County and the south Salt Lake Valley. Reinforced, properly jointed, built for Utah freeze-thaw. Free estimates.',
      },
      es: {
        title: 'Entradas de Concreto | Condado de Utah',
        description:
          'Entradas de concreto nuevas y reemplazos en el Condado de Utah y el Valle de Salt Lake. Reforzadas y con juntas correctas para el hielo y deshielo.',
      },
    },
    body: {
      en: [
        'A driveway is the largest single slab most homes ever get, and it carries the most weight. We pour residential driveways at four inches over a compacted granular base, and go to five or six where a truck, trailer or RV will sit. Reinforcement is wire mesh or #4 rebar on chairs depending on the span and the subgrade, and it is tied and lifted rather than laid flat, because steel pulled to the bottom of a slab does nothing.',
        'The part that decides whether a driveway lasts is jointing. Control joints go in at roughly two and a half times the slab thickness in feet — about ten feet apart on a four inch pour — and they are cut early, before the concrete decides where to crack on its own. Along the Wasatch Front that matters more than it does almost anywhere else: this valley runs through well over a hundred freeze-thaw cycles a year, and water sitting in an uncontrolled crack is what turns a hairline into a trip hazard.',
      ],
      es: [
        'Una entrada es la losa más grande que recibe la mayoría de las casas, y la que más peso soporta. Vertimos entradas residenciales de diez centímetros sobre una base granular compactada, y subimos a trece o quince donde se estacionará una camioneta, un remolque o una casa rodante. El refuerzo es malla o varilla #4 sobre soportes según el claro y la subrasante, amarrado y levantado en lugar de apoyado, porque el acero en el fondo de la losa no aporta nada.',
        'Lo que decide si una entrada dura son las juntas. Las juntas de control van a unas dos veces y media el espesor de la losa en pies —cerca de tres metros en una losa de diez centímetros— y se cortan temprano, antes de que el concreto decida solo dónde agrietarse. En el Wasatch Front eso importa más que en casi cualquier otro lugar: este valle pasa por más de cien ciclos de hielo y deshielo al año, y el agua detenida en una grieta sin control es lo que convierte una fisura en un peligro.',
      ],
    },
    spec: [
      { label: { en: 'Slab depth', es: 'Espesor' }, value: { en: '4" residential · 5–6" for RV and truck loads', es: '10 cm residencial · 13–15 cm para camionetas y casas rodantes' } },
      { label: { en: 'Reinforcement', es: 'Refuerzo' }, value: { en: 'Wire mesh or #4 rebar, tied and chaired', es: 'Malla o varilla #4, amarrada y sobre soportes' } },
      { label: { en: 'Control joints', es: 'Juntas de control' }, value: { en: 'Cut early, ~10 ft on a 4" slab', es: 'Cortadas temprano, ~3 m en losa de 10 cm' } },
      { label: { en: 'Mix', es: 'Mezcla' }, value: { en: 'Air-entrained, 4,000 psi for freeze-thaw', es: 'Con aire incluido, 4,000 psi para hielo y deshielo' } },
    ],
    heroImageId: '22988390-concrete-new-gallery-5',
    status: 'published',
  },
  {
    id: 'patios',
    division: 'concrete',
    pairsWith: ['pavers-walls', 'lighting'],
    slug: { en: 'patios', es: 'patios' },
    name: { en: 'Concrete patios', es: 'Patios de concreto' },
    lede: {
      en: 'Broom, trowel or exposed finish, pitched away from the foundation so meltwater leaves instead of pooling.',
      es: 'Acabado de escoba, llana o árido expuesto, con pendiente que aleja el agua de deshielo de los cimientos.',
    },
    seo: {
      en: {
        title: 'Concrete Patio Contractor | Utah County, UT',
        description:
          'Concrete patios, hot tub pads and backyard flatwork across Utah County. Finished, jointed and pitched to drain. Free written estimates from a local crew.',
      },
      es: {
        title: 'Patios de Concreto | Condado de Utah',
        description:
          'Patios de concreto, bases para jacuzzi y obra plana de jardín en el Condado de Utah. Acabados, con juntas y pendiente para drenar. Presupuesto gratis.',
      },
    },
    body: {
      en: [
        'Patios are where finish matters most, because you look at them from six feet away rather than from a car. A broom finish gives the most grip and hides the least; a hard trowel reads smoother but turns slick under snowmelt, so we rarely recommend it outdoors here. Whatever the finish, the slab gets pitched a quarter inch per foot away from the house — the single most common defect we are called out to fix is a patio poured flat or, worse, back toward the foundation.',
        'Hot tub pads are their own problem. A filled spa with people in it runs well past three thousand pounds concentrated on four small feet, so those pours get thickened and reinforced rather than treated as ordinary patio flatwork. We size the pad to the model before anything is formed.',
      ],
      es: [
        'En los patios el acabado es lo que más importa, porque se ven desde dos metros y no desde el coche. El acabado de escoba da el mejor agarre y disimula menos; la llana dura se ve más lisa pero se vuelve resbalosa con el deshielo, así que rara vez la recomendamos al exterior aquí. Sea cual sea el acabado, la losa lleva una pendiente de medio centímetro por metro alejándose de la casa: el defecto que más nos llaman a reparar es un patio vertido plano o, peor, inclinado hacia los cimientos.',
        'Las bases para jacuzzi son un caso aparte. Un spa lleno y con gente supera con facilidad los mil cuatrocientos kilos concentrados en cuatro apoyos pequeños, así que esas losas se engrosan y se refuerzan en lugar de tratarse como obra plana común. Dimensionamos la base según el modelo antes de armar cualquier cimbra.',
      ],
    },
    spec: [
      { label: { en: 'Drainage', es: 'Drenaje' }, value: { en: '1/4" per foot away from the structure', es: '0.5 cm por metro alejándose de la estructura' } },
      { label: { en: 'Typical finish', es: 'Acabado típico' }, value: { en: 'Broom — grip holds under snowmelt', es: 'Escoba — agarre incluso con deshielo' } },
      { label: { en: 'Hot tub pads', es: 'Bases para jacuzzi' }, value: { en: 'Thickened and reinforced, sized to the model', es: 'Engrosadas y reforzadas, según el modelo' } },
    ],
    heroImageId: '22988264-l-s-g-gallery-19',
    status: 'published',
  },
  {
    id: 'walkways',
    division: 'concrete',
    pairsWith: ['xeriscaping', 'rock-curbing'],
    slug: { en: 'walkways', es: 'andadores' },
    name: { en: 'Walkways and sidewalks', es: 'Andadores y banquetas' },
    lede: {
      en: 'Formed to the curve you actually want, with joints placed where the path changes direction.',
      es: 'Cimbrados a la curva que realmente quiere, con juntas donde el andador cambia de dirección.',
    },
    seo: {
      en: {
        title: 'Concrete Walkway & Sidewalk Contractor | Utah',
        description:
          'Curved and straight concrete walkways, front paths and sidewalks across Utah County and south Salt Lake County. Formed by hand, properly jointed.',
      },
      es: {
        title: 'Andadores y Banquetas de Concreto | Utah',
        description:
          'Andadores curvos y rectos, accesos y banquetas en el Condado de Utah y el sur del Condado de Salt Lake. Cimbrados a mano y con juntas correctas.',
      },
    },
    body: {
      en: [
        'A straight walkway is easy. The ones worth paying for are the curved runs that follow the grade and the planting beds, and those come down to forming — bending and staking flexible form board cleanly so the finished edge reads as a smooth arc instead of a series of flats. We form curves on site rather than approximating them with short straight segments.',
        'Walkways are thinner than driveways and move more, so jointing is tighter: roughly every four to five feet on a four foot wide path, and always at the point where the path changes direction, because that inside corner is where a crack will otherwise start.',
      ],
      es: [
        'Un andador recto es fácil. Los que valen la pena son los tramos curvos que siguen el desnivel y los arriates, y eso depende de la cimbra: doblar y estacar la tabla flexible con limpieza para que el borde terminado se lea como un arco suave y no como una serie de rectas. Formamos las curvas en obra en lugar de aproximarlas con segmentos cortos.',
        'Los andadores son más delgados que las entradas y se mueven más, así que las juntas van más juntas: cada metro y medio aproximadamente en un andador de metro veinte, y siempre en el punto donde cambia de dirección, porque esa esquina interior es donde de otro modo empieza la grieta.',
      ],
    },
    spec: [
      { label: { en: 'Typical width', es: 'Ancho típico' }, value: { en: "3–4 ft front paths, 5 ft public walk", es: '90–120 cm accesos, 150 cm banqueta pública' } },
      { label: { en: 'Joint spacing', es: 'Separación de juntas' }, value: { en: 'Every 4–5 ft and at every direction change', es: 'Cada 1.2–1.5 m y en cada cambio de dirección' } },
      { label: { en: 'Curves', es: 'Curvas' }, value: { en: 'Formed on site, not faceted', es: 'Cimbradas en obra, no facetadas' } },
    ],
    heroImageId: '22988266-l-s-g-gallery-18',
    status: 'published',
  },
  {
    id: 'steps',
    division: 'concrete',
    pairsWith: ['lighting', 'pavers-walls'],
    slug: { en: 'steps', es: 'escalones' },
    name: { en: 'Concrete steps', es: 'Escalones de concreto' },
    lede: {
      en: 'Equal risers, consistent nosing, and a landing that drains — the three things people notice with their feet.',
      es: 'Peraltes iguales, narices consistentes y un descanso que drena: lo que se nota con los pies.',
    },
    seo: {
      en: {
        title: 'Concrete Steps & Stairs Contractor | Utah County',
        description:
          'Poured concrete steps, porches and landings across Utah County. Equal risers, code-compliant rise and run, finished to grip in winter. Free estimates.',
      },
      es: {
        title: 'Escalones de Concreto | Condado de Utah',
        description:
          'Escalones, pórticos y descansos de concreto en el Condado de Utah. Peraltes iguales, huella y contrahuella a norma, con acabado antiderrapante. Presupuesto gratis.',
      },
    },
    body: {
      en: [
        'Steps are the least forgiving concrete on a property. The eye will not catch a quarter inch of variation in a slab, but a foot will catch it instantly on a stair, and an uneven riser in a flight is both a trip hazard and a failed inspection. We set rise and run off the finished grade at both ends before forming, so the top step meets the door threshold and the bottom meets the walk without a made-up last step.',
        'Exterior stairs in this climate also need somewhere for water to go. Treads get a slight forward pitch and a broom finish across the direction of travel, and the landing is tied into the adjoining flatwork so meltwater runs off rather than freezing in the corner where the tread meets the riser.',
      ],
      es: [
        'Los escalones son el concreto menos indulgente de una propiedad. El ojo no detecta medio centímetro de variación en una losa, pero el pie lo detecta de inmediato en una escalera, y un peralte desigual es a la vez un riesgo de tropiezo y una inspección reprobada. Fijamos huella y peralte desde el nivel terminado en ambos extremos antes de cimbrar, para que el escalón superior llegue al umbral y el inferior al andador sin un último escalón improvisado.',
        'Las escaleras exteriores en este clima también necesitan a dónde mandar el agua. Las huellas llevan una ligera pendiente al frente y acabado de escoba transversal al sentido de marcha, y el descanso se liga a la obra plana contigua para que el deshielo escurra en vez de congelarse en la esquina donde la huella encuentra el peralte.',
      ],
    },
    spec: [
      { label: { en: 'Riser consistency', es: 'Consistencia de peralte' }, value: { en: 'Set off finished grade at both ends', es: 'Fijado al nivel terminado en ambos extremos' } },
      { label: { en: 'Tread finish', es: 'Acabado de huella' }, value: { en: 'Broom across the direction of travel', es: 'Escoba transversal al sentido de marcha' } },
      { label: { en: 'Drainage', es: 'Drenaje' }, value: { en: 'Forward pitch, landing tied to adjoining flatwork', es: 'Pendiente al frente, descanso ligado a la obra plana' } },
    ],
    heroImageId: '22988388-concrete-new-gallery-3',
    status: 'published',
  },
  {
    id: 'floors',
    division: 'concrete',
    pairsWith: ['ev-chargers', 'basement-finishing'],
    slug: { en: 'floors', es: 'pisos' },
    name: { en: 'Concrete floors', es: 'Pisos de concreto' },
    lede: {
      en: 'Garage and shop slabs poured flat enough to work on and sloped enough to drain.',
      es: 'Losas de garaje y taller suficientemente planas para trabajar y con la pendiente justa para drenar.',
    },
    seo: {
      en: {
        title: 'Garage & Shop Concrete Floors | Utah County, UT',
        description:
          'Garage slabs, shop floors and outbuilding pads across Utah County. Vapor barrier, reinforced, hard-troweled and saw-cut. Free written estimates.',
      },
      es: {
        title: 'Pisos de Concreto para Garaje y Taller | Utah',
        description:
          'Losas de garaje, pisos de taller y plataformas en el Condado de Utah. Barrera de vapor, reforzados, pulidos y con corte de sierra. Presupuesto gratis.',
      },
    },
    body: {
      en: [
        'Interior slabs are a different job from exterior flatwork. They sit on a vapor barrier over compacted base, they get a hard trowel finish rather than a broom, and they are cut rather than tooled so the joints stay tight and clean under a floor you will actually sweep. For a garage we pour to a shallow slope toward the door so a wet vehicle drains itself.',
        'Flatness is the thing people underestimate. A shop slab that is out by half an inch across a bay is invisible until you set a cabinet run or a lift on it. We screed off established points rather than eyeballing to the forms.',
      ],
      es: [
        'Las losas interiores son un trabajo distinto a la obra plana exterior. Van sobre barrera de vapor encima de base compactada, llevan acabado de llana dura y no de escoba, y se cortan en lugar de ranurarse para que las juntas queden limpias bajo un piso que sí se barre. En un garaje vertimos con una pendiente leve hacia la puerta para que un vehículo mojado drene solo.',
        'La planicidad es lo que más se subestima. Una losa de taller desviada un centímetro a lo ancho es invisible hasta que se instala una línea de gabinetes o un elevador. Nivelamos desde puntos establecidos en vez de guiarnos a ojo por la cimbra.',
      ],
    },
    spec: [
      { label: { en: 'Under slab', es: 'Bajo la losa' }, value: { en: 'Vapor barrier over compacted base', es: 'Barrera de vapor sobre base compactada' } },
      { label: { en: 'Finish', es: 'Acabado' }, value: { en: 'Hard trowel, saw-cut joints', es: 'Llana dura, juntas con sierra' } },
      { label: { en: 'Garage slope', es: 'Pendiente de garaje' }, value: { en: 'Shallow fall to the door', es: 'Caída leve hacia la puerta' } },
    ],
    heroImageId: '22988294-l-s-g-gallery-23',
    status: 'published',
  },
  {
    id: 'repair',
    division: 'concrete',
    pairsWith: ['sod-sprinklers'],
    slug: { en: 'repair', es: 'reparacion' },
    name: { en: 'Concrete repair', es: 'Reparación de concreto' },
    lede: {
      en: 'Honest assessment first: some slabs are worth patching, and some are cheaper to replace than to keep chasing.',
      es: 'Primero una evaluación honesta: algunas losas vale la pena repararlas y otras salen más baratas de reemplazar.',
    },
    seo: {
      en: {
        title: 'Concrete Repair & Replacement | Utah County, UT',
        description:
          'Crack repair, spalling, settled slabs and full replacement across Utah County. Straight assessment of what is worth repairing and what is not.',
      },
      es: {
        title: 'Reparación y Reemplazo de Concreto | Utah',
        description:
          'Reparación de grietas, descascarado, losas hundidas y reemplazo completo en el Condado de Utah. Evaluación honesta de qué conviene reparar.',
      },
    },
    body: {
      en: [
        'Most of the failures we are called to look at in this valley come from the same two causes: water that was never given anywhere to go, and de-icing salt. Salt is the quiet one. It drives freeze-thaw damage into the top layer of a slab and lifts the surface off in sheets, which is why a driveway can look sound at the edges and be flaking down the middle. Surface spalling like that is repairable; a slab that has settled because the base was never compacted is not, and we will say so.',
        'Where repair is the right answer we rout and fill moving cracks with a flexible joint rather than a rigid patch, because a rigid fill in a crack that still moves simply cracks again beside the repair. Where replacement is the right answer we price the removal honestly rather than burying it.',
      ],
      es: [
        'La mayoría de las fallas que revisamos en este valle vienen de dos causas: agua que nunca tuvo a dónde ir y sal para deshielo. La sal es la silenciosa. Empuja el daño por hielo y deshielo a la capa superior de la losa y levanta la superficie en placas, por eso una entrada puede verse sana en las orillas y estar descascarándose al centro. Ese descascarado superficial es reparable; una losa hundida porque nunca se compactó la base no lo es, y se lo diremos.',
        'Cuando la reparación es la respuesta correcta, fresamos y sellamos las grietas activas con una junta flexible en lugar de un parche rígido, porque un relleno rígido en una grieta que sigue moviéndose se vuelve a romper junto a la reparación. Cuando lo correcto es reemplazar, cotizamos la demolición de forma transparente.',
      ],
    },
    spec: [
      { label: { en: 'Moving cracks', es: 'Grietas activas' }, value: { en: 'Routed and filled with a flexible joint', es: 'Fresadas y selladas con junta flexible' } },
      { label: { en: 'Surface spalling', es: 'Descascarado' }, value: { en: 'Usually de-icer damage — repairable', es: 'Casi siempre daño por sal — reparable' } },
      { label: { en: 'Settled slabs', es: 'Losas hundidas' }, value: { en: 'Base failure — replacement, not patching', es: 'Falla de base — reemplazo, no parche' } },
    ],
    heroImageId: '22988287-l-s-g-gallery-21',
    status: 'published',
  },
  {
    id: 'basement',
    division: 'concrete',
    pairsWith: ['basement-finishing', 'rough-in'],
    slug: { en: 'basement-slabs', es: 'losas-de-sotano' },
    name: { en: 'Basement concrete', es: 'Concreto para sótanos' },
    lede: {
      en: 'Basement slabs, stair wells and window well pours, placed where a truck chute will not reach.',
      es: 'Losas de sótano, cubos de escalera y pozos de ventana, colocados donde no llega la canaleta del camión.',
    },
    seo: {
      en: {
        title: 'Basement Concrete & Slabs | Utah County, UT',
        description:
          'Basement floor slabs, stair wells and window well concrete across Utah County. Pumped or barrowed placement where truck access is tight.',
      },
      es: {
        title: 'Concreto para Sótanos | Condado de Utah',
        description:
          'Losas de piso de sótano, cubos de escalera y pozos de ventana en el Condado de Utah. Colocación bombeada o en carretilla donde el acceso es difícil.',
      },
    },
    body: {
      en: [
        'Basement work is mostly an access problem. The pour itself is straightforward — vapor barrier, compacted base, reinforced slab, trowel finish — but getting concrete down there when a truck cannot back to the opening is what separates a clean job from a long day. We plan placement before the order goes in: pump, conveyor or barrow, and how many people it takes to keep the pour moving so there is no cold joint across the middle of a finished floor.',
        'Basement stair wells and window wells are poured with drainage designed in. In this valley a window well without a working drain becomes a bathtub against the foundation the first time a spring storm drops an inch of rain on frozen ground.',
      ],
      es: [
        'El trabajo en sótanos es sobre todo un problema de acceso. El vertido en sí es directo —barrera de vapor, base compactada, losa reforzada, acabado de llana— pero bajar el concreto cuando el camión no puede acercarse a la abertura es lo que separa un trabajo limpio de un día largo. Planeamos la colocación antes de pedir el material: bomba, banda o carretilla, y cuánta gente hace falta para que el vertido no se detenga y no quede una junta fría a media losa.',
        'Los cubos de escalera y pozos de ventana se vierten con el drenaje ya resuelto. En este valle un pozo de ventana sin drenaje funcional se convierte en una tina contra los cimientos la primera vez que una tormenta de primavera deja lluvia sobre suelo congelado.',
      ],
    },
    spec: [
      { label: { en: 'Placement', es: 'Colocación' }, value: { en: 'Pump, conveyor or barrow — planned before the order', es: 'Bomba, banda o carretilla — planeado antes del pedido' } },
      { label: { en: 'Under slab', es: 'Bajo la losa' }, value: { en: 'Vapor barrier over compacted base', es: 'Barrera de vapor sobre base compactada' } },
      { label: { en: 'Window wells', es: 'Pozos de ventana' }, value: { en: 'Drainage designed in, not added later', es: 'Drenaje resuelto desde el diseño' } },
    ],
    heroImageId: '22988278-l-s-g-gallery-39',
    status: 'published',
  },
  {
    id: 'rv-pads',
    division: 'concrete',
    pairsWith: ['rock-curbing'],
    slug: { en: 'rv-pads', es: 'plataformas-para-casas-rodantes' },
    name: { en: 'RV pads', es: 'Plataformas para casas rodantes' },
    lede: {
      en: 'Thicker, wider and reinforced for a loaded axle that sits in the same spot for months.',
      es: 'Más gruesas, más anchas y reforzadas para un eje cargado que permanece meses en el mismo punto.',
    },
    seo: {
      en: {
        title: 'RV Pad & Parking Slab Contractor | Utah County',
        description:
          'Concrete RV pads, trailer and boat parking slabs across Utah County. 5–6 inch reinforced pours sized to the rig. Free written estimates.',
      },
      es: {
        title: 'Plataformas de Concreto para Casas Rodantes | Utah',
        description:
          'Plataformas de concreto para casas rodantes, remolques y botes en el Condado de Utah. Losas reforzadas de 13–15 cm. Presupuesto gratis.',
      },
    },
    body: {
      en: [
        'An RV pad is not a driveway with a different name. A fifth wheel puts far more weight on far less contact area than a car does, and it does it while parked in the same position for months at a time, which is exactly the loading that finds a weak base. These pours go five to six inches with rebar rather than mesh, over a base that gets compacted in lifts instead of dumped and graded.',
        'Sizing is worth getting right at the estimate. We measure the rig rather than assuming, and add working room on the door side so the awning, steps and jacks all land on concrete instead of half on the slab and half in the gravel.',
      ],
      es: [
        'Una plataforma para casa rodante no es una entrada con otro nombre. Un remolque de quinta rueda pone mucho más peso sobre mucha menos superficie de contacto que un coche, y lo hace estacionado en la misma posición durante meses, que es justo la carga que encuentra una base débil. Estas losas van de trece a quince centímetros con varilla en vez de malla, sobre una base compactada por capas y no solo vaciada y nivelada.',
        'Vale la pena acertar las medidas en el presupuesto. Medimos la unidad en lugar de suponer, y agregamos espacio de trabajo del lado de la puerta para que el toldo, los escalones y los gatos queden sobre concreto y no a medias sobre la grava.',
      ],
    },
    spec: [
      { label: { en: 'Slab depth', es: 'Espesor' }, value: { en: '5–6" for loaded axles', es: '13–15 cm para ejes cargados' } },
      { label: { en: 'Reinforcement', es: 'Refuerzo' }, value: { en: '#4 rebar on chairs, not mesh', es: 'Varilla #4 sobre soportes, no malla' } },
      { label: { en: 'Base', es: 'Base' }, value: { en: 'Compacted in lifts', es: 'Compactada por capas' } },
      { label: { en: 'Sizing', es: 'Dimensionamiento' }, value: { en: 'Measured to the rig, plus door-side working room', es: 'Medida a la unidad, más espacio del lado de la puerta' } },
    ],
    heroImageId: '22988273-l-s-g-gallery-8',
    status: 'published',
  },
  {
    id: 'stamped',
    division: 'concrete',
    slug: { en: 'stamped', es: 'estampado' },
    name: { en: 'Stamped concrete', es: 'Concreto estampado' },
    lede: {
      en: 'Colour-hardened and stamped patios and entries, sealed for a Utah winter.',
      es: 'Patios y accesos con endurecedor de color y estampado, sellados para el invierno de Utah.',
    },
    seo: {
      en: {
        title: 'Stamped Concrete Contractor | Utah County, UT',
        description:
          'Stamped and colored concrete patios, walkways and entries across Utah County. Integral color, release, and a sealer that survives de-icing season.',
      },
      es: {
        title: 'Concreto Estampado | Condado de Utah',
        description:
          'Patios, andadores y accesos de concreto estampado y con color en el Condado de Utah. Color integral, desmoldante y sellador para el invierno.',
      },
    },
    body: {
      en: [
        'Stamped work is the highest-value flatwork in this market and the least forgiving to place, because the window between the concrete taking an impression and the concrete refusing one is short, and it moves with the weather. It takes a crew sized to the pour rather than a crew hoping to keep up.',
        'Sealing is not optional here. An unsealed stamped surface loses colour and starts to spall within a few Utah winters, and a resealing schedule should be part of the quote rather than a surprise three years later.',
      ],
      es: [
        'El estampado es la obra plana de mayor valor en este mercado y la menos indulgente al colocar, porque la ventana entre que el concreto acepta la impresión y la rechaza es corta y cambia con el clima. Requiere una cuadrilla dimensionada al vertido, no una que espera alcanzar el ritmo.',
        'Sellar no es opcional aquí. Una superficie estampada sin sellar pierde color y empieza a descascararse en pocos inviernos de Utah, y el calendario de resellado debe ir en la cotización y no ser una sorpresa tres años después.',
      ],
    },
    spec: [
      { label: { en: 'Colour', es: 'Color' }, value: { en: 'Integral or colour hardener with release', es: 'Integral o endurecedor de color con desmoldante' } },
      { label: { en: 'Sealing', es: 'Sellado' }, value: { en: 'Required, with a resealing schedule quoted upfront', es: 'Obligatorio, con calendario de resellado cotizado' } },
    ],
    heroImageId: '22988261-l-s-g-gallery-27',
    // PENDING: the current site never advertised stamped work. It is the
    // highest-value keyword in this metro, but the page stays out of the build
    // until the owner confirms they actually offer it.
    status: 'pending',
  },
]
