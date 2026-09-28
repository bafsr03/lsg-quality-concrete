import { City } from './schema'

/**
 * Service area, ordered by drive time from the Eagle Mountain base rather than
 * alphabetically — the list should reflect how real the coverage actually is.
 *
 * Note the old site and the Yelp/Angi listings published two barely-overlapping
 * service areas. This is the canonical list; the citations need to be corrected
 * to match it rather than the other way round.
 */
export const cities = City.array().parse([
  {
    id: 'eagle-mountain',
    slug: { en: 'concrete-contractor-eagle-mountain', es: 'contratista-de-concreto-eagle-mountain' },
    name: 'Eagle Mountain',
    county: 'Utah County',
    driveMinutes: 5,
    localDetail: {
      en: 'We are based here, so most Eagle Mountain jobs get looked at the same week they are called in. The ground across The Ranches and the newer benches is sandy and gravelly rather than heavy clay, which drains well but moves if it is not compacted in lifts before a slab goes on it. The other local factor is exposure: this is high desert with very little tree cover, so summer pours get scheduled early in the day and finished before the surface skins over faster than a crew can work it.',
      es: 'Estamos basados aquí, así que la mayoría de los trabajos en Eagle Mountain se revisan la misma semana en que se solicitan. El terreno en The Ranches y las laderas nuevas es arenoso y con grava más que arcilla pesada, lo que drena bien pero se mueve si no se compacta por capas antes de colocar una losa. El otro factor local es la exposición: es desierto alto con muy poca sombra, así que los vertidos de verano se programan temprano y se terminan antes de que la superficie cierre más rápido de lo que la cuadrilla puede trabajarla.',
    },
    seo: {
      en: {
        title: 'Concrete Contractor in Eagle Mountain, UT',
        description:
          'Local concrete contractor based in Eagle Mountain. Driveways, patios, steps and flatwork, with free written estimates and same-week site visits.',
      },
      es: {
        title: 'Contratista de Concreto en Eagle Mountain, UT',
        description:
          'Contratista de concreto local en Eagle Mountain. Entradas, patios, escalones y obra plana, con presupuesto gratis y visita la misma semana.',
      },
    },
    status: 'published',
  },
  {
    id: 'saratoga-springs',
    slug: { en: 'concrete-contractor-saratoga-springs', es: 'contratista-de-concreto-saratoga-springs' },
    name: 'Saratoga Springs',
    county: 'Utah County',
    driveMinutes: 10,
    localDetail: {
      en: 'Saratoga Springs sits on the western shore of Utah Lake, and the lots closest to the water sit on a noticeably higher water table than the benches up in Harvest Hills. That changes how we handle base preparation and drainage — a patio or basement slab near the lake gets more attention to where water leaves than the same pour would three miles uphill. Much of the housing stock here is new enough that we are pouring first-time flatwork on bare lots rather than tearing out failed slabs.',
      es: 'Saratoga Springs está en la orilla oeste del Lago Utah, y los lotes más cercanos al agua tienen un nivel freático notablemente más alto que las laderas de Harvest Hills. Eso cambia cómo manejamos la preparación de base y el drenaje: un patio o losa de sótano cerca del lago recibe más atención a por dónde sale el agua que el mismo vertido cinco kilómetros cuesta arriba. Buena parte de la vivienda aquí es lo bastante nueva como para que estemos colocando obra plana por primera vez en lotes limpios en lugar de demoler losas fallidas.',
    },
    seo: {
      en: {
        title: 'Concrete Contractor in Saratoga Springs, UT',
        description:
          'Concrete driveways, patios and flatwork in Saratoga Springs. Ten minutes from our Eagle Mountain base. Free written estimates.',
      },
      es: {
        title: 'Contratista de Concreto en Saratoga Springs, UT',
        description:
          'Entradas, patios y obra plana de concreto en Saratoga Springs. A diez minutos de nuestra base en Eagle Mountain. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'lehi',
    slug: { en: 'concrete-contractor-lehi', es: 'contratista-de-concreto-lehi' },
    name: 'Lehi',
    county: 'Utah County',
    driveMinutes: 15,
    localDetail: {
      en: 'Lehi has grown faster than almost anywhere in the state, and it shows in the two very different kinds of work we do there. Up on Traverse Mountain the grades are steep enough that driveway design becomes a real question — slope, transitions at the garage apron, and where meltwater is going to run once it leaves the slab. Down in the older parts of town near Main Street we are more often replacing forty-year-old flatwork that has finally lost its surface to de-icing salt.',
      es: 'Lehi ha crecido más rápido que casi cualquier otro lugar del estado, y eso se nota en los dos tipos de trabajo muy distintos que hacemos ahí. En Traverse Mountain las pendientes son lo bastante pronunciadas como para que el diseño de la entrada sea una pregunta real: inclinación, transiciones en el acceso del garaje y a dónde correrá el deshielo al salir de la losa. En la zona antigua cerca de Main Street, más bien reemplazamos obra plana de cuarenta años que por fin perdió su superficie por la sal de deshielo.',
    },
    seo: {
      en: {
        title: 'Concrete Contractor in Lehi, UT',
        description:
          'Concrete driveways, patios and replacement flatwork in Lehi, from Traverse Mountain to the older neighbourhoods near Main Street. Free estimates.',
      },
      es: {
        title: 'Contratista de Concreto en Lehi, UT',
        description:
          'Entradas, patios y reemplazo de obra plana en Lehi, desde Traverse Mountain hasta los barrios antiguos cerca de Main Street. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'american-fork',
    slug: { en: 'concrete-contractor-american-fork', es: 'contratista-de-concreto-american-fork' },
    name: 'American Fork',
    county: 'Utah County',
    driveMinutes: 20,
    localDetail: {
      en: 'American Fork is an older town than most of our service area, and a good share of the work here is replacement rather than new construction. The specific local issue is mature trees: streets that were planted sixty years ago now have root systems under walkways and driveway edges, and a slab lifted by a root will not stay repaired unless the root is dealt with at the same time. We look at what is under the slab before quoting a tear-out.',
      es: 'American Fork es una ciudad más antigua que la mayor parte de nuestra área de servicio, y buena parte del trabajo aquí es reemplazo y no obra nueva. El problema local específico son los árboles maduros: calles plantadas hace sesenta años tienen ahora raíces bajo andadores y bordes de entradas, y una losa levantada por una raíz no permanece reparada si no se atiende la raíz al mismo tiempo. Revisamos lo que hay bajo la losa antes de cotizar una demolición.',
    },
    seo: {
      en: {
        title: 'Concrete Contractor in American Fork, UT',
        description:
          'Concrete replacement, driveways and walkways in American Fork. Root-lifted slabs assessed properly before quoting. Free written estimates.',
      },
      es: {
        title: 'Contratista de Concreto en American Fork, UT',
        description:
          'Reemplazo de concreto, entradas y andadores en American Fork. Losas levantadas por raíces evaluadas antes de cotizar. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'herriman',
    slug: { en: 'concrete-contractor-herriman', es: 'contratista-de-concreto-herriman' },
    name: 'Herriman',
    county: 'Salt Lake County',
    driveMinutes: 25,
    localDetail: {
      en: 'Herriman is our closest regular work in Salt Lake County, reached over the Mountain View corridor rather than around the lake. The Rosecrest benches carry some of the steepest residential driveways we pour anywhere — steep enough that the finish matters as much as the structure, because a hard-troweled slope becomes unusable the first morning it ices over. Those driveways get a coarse broom finish run across the slope, not with it.',
      es: 'Herriman es nuestro trabajo habitual más cercano en el Condado de Salt Lake, al que llegamos por el corredor Mountain View y no rodeando el lago. Las laderas de Rosecrest tienen algunas de las entradas residenciales más inclinadas que vertimos: lo bastante como para que el acabado importe tanto como la estructura, porque una pendiente pulida con llana queda inservible la primera mañana que se congela. Esas entradas llevan acabado de escoba grueso, transversal a la pendiente y no a favor.',
    },
    seo: {
      en: {
        title: 'Concrete Contractor in Herriman, UT',
        description:
          'Concrete driveways and flatwork in Herriman, including the steep Rosecrest benches. Finishes chosen for grip on a slope. Free estimates.',
      },
      es: {
        title: 'Contratista de Concreto en Herriman, UT',
        description:
          'Entradas y obra plana de concreto en Herriman, incluidas las laderas inclinadas de Rosecrest. Acabados elegidos para agarre. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'draper',
    slug: { en: 'concrete-contractor-draper', es: 'contratista-de-concreto-draper' },
    name: 'Draper',
    county: 'Salt Lake County',
    driveMinutes: 30,
    localDetail: {
      en: 'Draper splits sharply between the flat west side and the Corner Canyon benches, and the benches are where the interesting concrete is. Steep approaches, retaining against grade, and stairs that have to tie a house sitting well above its street back down to the driveway. Bench lots here also run into more clay than the Utah County side of the point, which means base preparation and drainage get more attention before anything is formed.',
      es: 'Draper se divide claramente entre el lado oeste plano y las laderas de Corner Canyon, y es en las laderas donde está el concreto interesante. Accesos inclinados, contención contra el desnivel y escaleras que deben ligar una casa muy por encima de su calle de vuelta a la entrada. Los lotes de ladera aquí también tienen más arcilla que del lado del Condado de Utah, lo que exige más atención a la base y al drenaje antes de cimbrar.',
    },
    seo: {
      en: {
        title: 'Concrete Contractor in Draper, UT',
        description:
          'Concrete driveways, steps and flatwork in Draper, including the Corner Canyon benches. Base and drainage planned for clay. Free estimates.',
      },
      es: {
        title: 'Contratista de Concreto en Draper, UT',
        description:
          'Entradas, escalones y obra plana en Draper, incluidas las laderas de Corner Canyon. Base y drenaje planeados para arcilla. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'west-jordan',
    slug: { en: 'concrete-contractor-west-jordan', es: 'contratista-de-concreto-west-jordan' },
    name: 'West Jordan',
    county: 'Salt Lake County',
    driveMinutes: 30,
    localDetail: {
      en: 'West Jordan is mostly flat, established subdivisions, which makes it replacement territory. Slabs poured in the seventies and eighties here were often placed thinner than we would pour today and over bases that were never compacted properly, so a surface that looks merely tired is frequently sitting on a problem. We core the question at the estimate rather than after demolition has started.',
      es: 'West Jordan es en su mayoría plano, con fraccionamientos establecidos, lo que lo convierte en territorio de reemplazo. Las losas vertidas aquí en los setenta y ochenta solían colocarse más delgadas de lo que se vierte hoy y sobre bases que nunca se compactaron bien, así que una superficie que solo se ve cansada muchas veces está sobre un problema. Resolvemos esa pregunta en el presupuesto y no después de empezar la demolición.',
    },
    seo: {
      en: {
        title: 'Concrete Contractor in West Jordan, UT',
        description:
          'Concrete replacement, driveways and patios in West Jordan. Older thin slabs assessed before demolition starts. Free written estimates.',
      },
      es: {
        title: 'Contratista de Concreto en West Jordan, UT',
        description:
          'Reemplazo de concreto, entradas y patios en West Jordan. Losas delgadas antiguas evaluadas antes de demoler. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'sandy',
    slug: { en: 'concrete-contractor-sandy', es: 'contratista-de-concreto-sandy' },
    name: 'Sandy',
    county: 'Salt Lake County',
    driveMinutes: 35,
    localDetail: {
      en: 'Sandy is established enough that almost everything we do there is replacement or repair, and the east side runs up against the same bench conditions as Draper. The recurring local problem is de-icing salt on driveways that face north and never fully dry out between storms. Those slabs spall from the middle outward, and once the surface has gone there is no resurfacing product that outlasts a proper replacement.',
      es: 'Sandy está lo bastante consolidada como para que casi todo lo que hacemos ahí sea reemplazo o reparación, y el lado este llega a las mismas condiciones de ladera que Draper. El problema local recurrente es la sal de deshielo en entradas orientadas al norte que nunca se secan del todo entre tormentas. Esas losas se descascaran del centro hacia afuera, y una vez perdida la superficie ningún producto de recubrimiento dura más que un reemplazo bien hecho.',
    },
    seo: {
      en: {
        title: 'Concrete Contractor in Sandy, UT',
        description:
          'Concrete repair and replacement in Sandy, UT. Salt-spalled driveways assessed honestly — repair where it lasts, replacement where it does not.',
      },
      es: {
        title: 'Contratista de Concreto en Sandy, UT',
        description:
          'Reparación y reemplazo de concreto en Sandy, UT. Entradas dañadas por sal evaluadas con honestidad. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'west-valley-city',
    slug: { en: 'concrete-contractor-west-valley-city', es: 'contratista-de-concreto-west-valley-city' },
    name: 'West Valley City',
    county: 'Salt Lake County',
    driveMinutes: 35,
    localDetail: {
      en: 'West Valley City is flat, older, and sits on heavier clay than most of our Utah County work. Clay holds water and moves seasonally, which is exactly the subgrade that punishes an under-compacted base, so slabs here get more preparation below the surface than the finished pour suggests. We work in Spanish and English on every job in this city, which matters when the person who knows what the yard actually does in a spring storm is the homeowner rather than the contractor.',
      es: 'West Valley City es plana, más antigua y está sobre arcilla más pesada que la mayor parte de nuestro trabajo en el Condado de Utah. La arcilla retiene agua y se mueve con las estaciones, que es justo la subrasante que castiga una base mal compactada, así que aquí las losas reciben más preparación bajo la superficie de lo que sugiere el vertido terminado. Trabajamos en español e inglés en cada obra de esta ciudad, algo que importa cuando quien sabe qué hace realmente el patio en una tormenta de primavera es el propietario y no el contratista.',
    },
    seo: {
      en: {
        title: 'Concrete Contractor in West Valley City, UT',
        description:
          'Concrete driveways, patios and replacement in West Valley City. Base built for clay subgrade. Se habla español. Free written estimates.',
      },
      es: {
        title: 'Contratista de Concreto en West Valley City, UT',
        description:
          'Entradas, patios y reemplazo de concreto en West Valley City. Base preparada para subrasante de arcilla. Atendemos en español. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'heber',
    slug: { en: 'concrete-contractor-heber', es: 'contratista-de-concreto-heber' },
    name: 'Heber City',
    county: 'Wasatch County',
    driveMinutes: 55,
    localDetail: {
      en: 'Heber sits around fifty-six hundred feet, high enough that the pouring season is meaningfully shorter than it is down in the valley and the frost goes deeper. That changes scheduling more than technique: late-season pours here need protection and a realistic look at overnight temperatures, and we would rather tell someone in October that their driveway is a spring job than pour it into a forecast that will not let it cure.',
      es: 'Heber está a unos mil setecientos metros, lo bastante alto como para que la temporada de vertido sea notablemente más corta que en el valle y la helada penetre más. Eso cambia la programación más que la técnica: los vertidos de fin de temporada aquí necesitan protección y una lectura realista de las temperaturas nocturnas, y preferimos decirle a alguien en octubre que su entrada es un trabajo de primavera antes que verterla contra un pronóstico que no la dejará fraguar.',
    },
    seo: {
      en: {
        title: 'Concrete Contractor in Heber City, UT',
        description:
          'Concrete driveways, patios and flatwork in Heber City and the Heber Valley. Season and cure planned for elevation. Free written estimates.',
      },
      es: {
        title: 'Contratista de Concreto en Heber City, UT',
        description:
          'Entradas, patios y obra plana en Heber City y el Valle de Heber. Temporada y fraguado planeados para la altitud. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'park-city',
    slug: { en: 'concrete-contractor-park-city', es: 'contratista-de-concreto-park-city' },
    name: 'Park City',
    county: 'Summit County',
    driveMinutes: 65,
    localDetail: {
      en: 'Park City is the hardest environment we pour into. At around seven thousand feet the freeze-thaw cycling is relentless, the season is short, and almost every lot is steep, which means access for a truck is often the first thing we assess rather than the last. Work up here is quoted with protection, cure time and de-icer exposure built into the price, because a slab that would last twenty years in Eagle Mountain will not survive a Park City winter if it is poured to valley standards.',
      es: 'Park City es el entorno más difícil en el que vertimos. A unos dos mil cien metros el ciclo de hielo y deshielo es implacable, la temporada es corta y casi todos los lotes son inclinados, así que el acceso del camión suele ser lo primero que evaluamos y no lo último. El trabajo aquí se cotiza con protección, tiempo de fraguado y exposición a sal incluidos en el precio, porque una losa que duraría veinte años en Eagle Mountain no sobrevive un invierno de Park City si se vierte con estándares de valle.',
    },
    seo: {
      en: {
        title: 'Concrete Contractor in Park City, UT',
        description:
          'Concrete driveways, steps and flatwork in Park City. Poured for severe freeze-thaw, steep access and a short season. Free written estimates.',
      },
      es: {
        title: 'Contratista de Concreto en Park City, UT',
        description:
          'Entradas, escalones y obra plana en Park City. Vertido para hielo y deshielo severo, acceso inclinado y temporada corta. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
])

export const publishedCities = cities.filter((c) => c.status === 'published')
