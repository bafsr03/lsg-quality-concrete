import { City } from './schema'

/**
 * Service area, ordered by drive time from the Eagle Mountain base rather than
 * alphabetically — the list should reflect how real the coverage actually is.
 *
 * Each entry powers a city hub (/service-areas/<city>/) that covers every
 * trade we offer there, so `localDetail` is about the place — its housing,
 * yards, water and weather — not about any one trade. Trade-specific local
 * copy (soil, water table, exposure for concrete) lives in combos.ts.
 *
 * Note the old site and the Yelp/Angi listings published two barely-overlapping
 * service areas. This is the canonical list; the citations need to be corrected
 * to match it rather than the other way round.
 */
export const cities = City.array().parse([
  {
    id: 'eagle-mountain',
    slug: { en: 'eagle-mountain', es: 'eagle-mountain' },
    name: 'Eagle Mountain',
    county: 'Utah County',
    driveMinutes: 5,
    localDetail: {
      en: 'Eagle Mountain is home, and it is a young city. Most houses here were built in the last twenty-five years, many on bare lots that came with a dirt yard and an unfinished basement. So the work is usually a first build-out, not a fix: the first patio, the first lawn and sprinklers, the basement turned into bedrooms. Open, windy ground with little shade means yards here do better with water-wise planting than with wall-to-wall grass.',
      es: 'Eagle Mountain es nuestra casa, y es una ciudad joven. La mayoría de las viviendas tiene menos de veinticinco años, muchas entregadas con el patio en tierra y el sótano sin terminar. Por eso aquí el trabajo suele ser terminar lo que falta, no arreglar: el primer patio, el primer césped con riego, el sótano convertido en recámaras. El terreno abierto, con viento y poca sombra, favorece un jardín de bajo consumo de agua más que el césped de pared a pared.',
    },
    seo: {
      en: {
        title: 'General Contractor in Eagle Mountain, UT',
        description:
          'Concrete, landscaping and remodeling in Eagle Mountain, from the contractor based here. Free written estimates and same-week site visits.',
      },
      es: {
        title: 'Contratista General en Eagle Mountain, UT',
        description:
          'Concreto, jardinería y remodelación en Eagle Mountain, con el contratista que vive aquí. Presupuesto gratis por escrito y visita la misma semana.',
      },
    },
    status: 'published',
  },
  {
    id: 'saratoga-springs',
    slug: { en: 'saratoga-springs', es: 'saratoga-springs' },
    name: 'Saratoga Springs',
    county: 'Utah County',
    driveMinutes: 10,
    localDetail: {
      en: 'Saratoga Springs is mostly newer subdivisions, and a lot of them have an HOA. That shapes the job before it starts: fences, pavers, front-yard landscaping and exterior changes often need the association to sign off, so we put the drawings and materials together for that review. Inside, the common project is the same as next door in Eagle Mountain — a builder-grade basement that is ready to be finished once the family needs the room.',
      es: 'Saratoga Springs es en su mayoría fraccionamientos nuevos, y muchos tienen asociación de propietarios (HOA). Eso define el trabajo antes de empezar: cercas, adoquines, el jardín del frente y los cambios exteriores muchas veces necesitan la aprobación de la asociación, así que preparamos los planos y materiales para esa revisión. Adentro, el proyecto típico es el mismo que en Eagle Mountain: un sótano de constructora listo para terminarse cuando la familia necesite el espacio.',
    },
    seo: {
      en: {
        title: 'General Contractor in Saratoga Springs, UT',
        description:
          'Concrete, landscaping and remodeling in Saratoga Springs, with plans ready for HOA review. Ten minutes from our base. Free estimates.',
      },
      es: {
        title: 'Contratista General en Saratoga Springs, UT',
        description:
          'Concreto, jardinería y remodelación en Saratoga Springs, con planos listos para la HOA. A diez minutos de nuestra base. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'lehi',
    slug: { en: 'lehi', es: 'lehi' },
    name: 'Lehi',
    county: 'Utah County',
    driveMinutes: 15,
    localDetail: {
      en: 'Lehi is two towns at once. The old core around Main Street has small older homes where the job is usually a kitchen, a bathroom or a yard that has not been touched in decades. The newer neighbourhoods built for the tech boom have the opposite problem: good bones, bare basements and backyards still waiting on a plan. Many Lehi lots water the yard from a separate pressurized irrigation line, so sprinkler work starts with knowing which water you are on.',
      es: 'Lehi son dos ciudades a la vez. El centro antiguo cerca de Main Street tiene casas pequeñas y viejas donde el trabajo suele ser una cocina, un baño o un jardín que nadie ha tocado en décadas. Los barrios nuevos que trajo el auge tecnológico tienen el problema contrario: buena estructura, sótanos sin terminar y patios traseros esperando un plan. Muchos lotes en Lehi riegan con una línea de riego presurizado aparte, así que el trabajo de aspersores empieza por saber de qué agua se trata.',
    },
    seo: {
      en: {
        title: 'General Contractor in Lehi, UT',
        description:
          'Concrete, landscaping and remodeling in Lehi, from older homes near Main Street to new basements and yards. Free written estimates.',
      },
      es: {
        title: 'Contratista General en Lehi, UT',
        description:
          'Concreto, jardinería y remodelación en Lehi, desde casas antiguas cerca de Main Street hasta sótanos y patios nuevos. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'american-fork',
    slug: { en: 'american-fork', es: 'american-fork' },
    name: 'American Fork',
    county: 'Utah County',
    driveMinutes: 20,
    localDetail: {
      en: 'American Fork has more established homes than most of our area, and established homes mean remodels. Ramblers and split-levels from past decades often have a dated kitchen, one tight bathroom and a basement finished long ago in paneling. Yards are mature, with big trees and sprinkler systems that have been patched for years. When an update needs new circuits or moved plumbing, we coordinate it with Utah-licensed electricians and plumbers who pull those permits.',
      es: 'American Fork tiene más casas establecidas que casi toda nuestra área, y casas establecidas significan remodelaciones. Las casas de un piso y de medio nivel de décadas pasadas suelen tener una cocina anticuada, un baño apretado y un sótano terminado hace mucho con paneles de madera. Los jardines son maduros, con árboles grandes y sistemas de riego parchados por años. Si la obra necesita circuitos nuevos o mover tubería, la coordinamos con electricistas y plomeros con licencia de Utah, que sacan esos permisos.',
    },
    seo: {
      en: {
        title: 'General Contractor in American Fork, UT',
        description:
          'Remodeling, landscaping and concrete for established American Fork homes: kitchens, baths, basements and yards. Free written estimates.',
      },
      es: {
        title: 'Contratista General en American Fork, UT',
        description:
          'Remodelación, jardinería y concreto para casas establecidas de American Fork: cocinas, baños, sótanos y jardines. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'herriman',
    slug: { en: 'herriman', es: 'herriman' },
    name: 'Herriman',
    county: 'Salt Lake County',
    driveMinutes: 25,
    localDetail: {
      en: 'Herriman grew from a farm town into a city of subdivisions in about two decades, so most homes are recent and many sit under an HOA. Lots climb toward the Oquirrh foothills, and a sloped backyard is the usual starting point: it needs terracing, a retaining wall or a level patio before it is usable. Programs such as Utah Water Savers have offered incentives for water-wise yards; check the current terms before you plan around one.',
      es: 'Herriman pasó de pueblo agrícola a ciudad de fraccionamientos en unas dos décadas, así que la mayoría de las casas son recientes y muchas tienen HOA. Los lotes suben hacia las faldas de los Oquirrh, y un patio trasero en pendiente es el punto de partida habitual: necesita terrazas, un muro de contención o un patio nivelado antes de poder usarse. Programas como Utah Water Savers han ofrecido incentivos para jardines de bajo consumo; revise las condiciones vigentes antes de contar con uno.',
    },
    seo: {
      en: {
        title: 'General Contractor in Herriman, UT',
        description:
          'Concrete, landscaping and remodeling in Herriman: retaining walls, level patios, finished basements. Free written estimates.',
      },
      es: {
        title: 'Contratista General en Herriman, UT',
        description:
          'Concreto, jardinería y remodelación en Herriman: muros de contención, patios nivelados y sótanos terminados. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'draper',
    slug: { en: 'draper', es: 'draper' },
    name: 'Draper',
    county: 'Salt Lake County',
    driveMinutes: 30,
    localDetail: {
      en: 'Draper runs from flat subdivisions on the west side up to larger hillside homes near Corner Canyon and SunCrest. The hillside houses tend to be bigger, with walkout basements and outdoor living space built into the slope, and owners here usually want a finished basement or a kitchen remodel done to a higher standard. SunCrest, up on the ridge, gets far more snow and wind than the valley floor, which changes when we can schedule outdoor work.',
      es: 'Draper va desde fraccionamientos planos en el lado oeste hasta casas más grandes en las laderas cerca de Corner Canyon y SunCrest. Las casas de ladera suelen ser más amplias, con sótanos con salida al patio y espacios exteriores construidos en la pendiente, y aquí los dueños suelen pedir un sótano terminado o una cocina remodelada con un nivel de acabado alto. SunCrest, arriba en la cresta, recibe mucha más nieve y viento que el valle, lo que cambia cuándo podemos programar trabajo exterior.',
    },
    seo: {
      en: {
        title: 'General Contractor in Draper, UT',
        description:
          'Remodeling, concrete and landscaping in Draper, from west-side homes to Corner Canyon and SunCrest hillsides. Free written estimates.',
      },
      es: {
        title: 'Contratista General en Draper, UT',
        description:
          'Remodelación, concreto y jardinería en Draper, del lado oeste a las laderas de Corner Canyon y SunCrest. Presupuesto gratis por escrito.',
      },
    },
    status: 'published',
  },
  {
    id: 'west-jordan',
    slug: { en: 'west-jordan', es: 'west-jordan' },
    name: 'West Jordan',
    county: 'Salt Lake County',
    driveMinutes: 30,
    localDetail: {
      en: 'West Jordan has two halves. East of Bangerter are established neighbourhoods from the seventies through the nineties, where homes need updating: original bathrooms, a closed-off kitchen, a yard of thirsty lawn. West of it the subdivisions are much newer and the work looks more like Herriman — basements and backyards to finish. A lawn-to-water-wise conversion is a common request here, and local programs such as Localscapes are worth checking before you start.',
      es: 'West Jordan tiene dos mitades. Al este de Bangerter hay barrios establecidos de los setenta a los noventa, donde las casas piden actualización: baños originales, una cocina cerrada, un jardín de césped que consume mucha agua. Al oeste los fraccionamientos son mucho más nuevos y el trabajo se parece al de Herriman: sótanos y patios por terminar. Cambiar césped por jardín de bajo consumo es un pedido común aquí, y conviene revisar programas locales como Localscapes antes de empezar.',
    },
    seo: {
      en: {
        title: 'General Contractor in West Jordan, UT',
        description:
          'Concrete, landscaping and remodeling in West Jordan, from older-home updates to new basements and water-wise yards. Free estimates.',
      },
      es: {
        title: 'Contratista General en West Jordan, UT',
        description:
          'Concreto, jardinería y remodelación en West Jordan, de casas antiguas a sótanos nuevos y jardines de bajo consumo. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'sandy',
    slug: { en: 'sandy', es: 'sandy' },
    name: 'Sandy',
    county: 'Salt Lake County',
    driveMinutes: 35,
    localDetail: {
      en: 'Sandy is built out, and much of it is split-levels and ramblers from the seventies and eighties. Those floor plans are why most of our Sandy work is inside: opening a kitchen to the family room, redoing a bathroom, or reworking a basement finished a long time ago. Outside, the yards are mature and often overgrown. Homes on the east bench, toward the canyons, see more snow, so we plan exterior work there with the weather in mind.',
      es: 'Sandy ya está construida, y buena parte son casas de medio nivel y de un piso de los setenta y ochenta. Por esas distribuciones casi todo nuestro trabajo en Sandy es interior: abrir la cocina hacia la sala familiar, rehacer un baño o renovar un sótano terminado hace mucho. Afuera, los jardines son maduros y muchas veces están crecidos de más. Las casas en la ladera este, hacia los cañones, reciben más nieve, así que ahí planeamos el trabajo exterior según el clima.',
    },
    seo: {
      en: {
        title: 'General Contractor in Sandy, UT',
        description:
          'Remodeling, concrete and landscaping in Sandy: kitchens, baths and basements in split-levels and ramblers. Free written estimates.',
      },
      es: {
        title: 'Contratista General en Sandy, UT',
        description:
          'Remodelación, concreto y jardinería en Sandy: cocinas, baños y sótanos en casas de medio nivel y de un piso. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'west-valley-city',
    slug: { en: 'west-valley-city', es: 'west-valley-city' },
    name: 'West Valley City',
    county: 'Salt Lake County',
    driveMinutes: 35,
    localDetail: {
      en: 'West Valley City is the second-largest city in Utah, and most of it is modest single-family homes several decades old. That is where a remodel pays off most: a bathroom, a kitchen, a basement turned into a rentable or family space. Many families here speak Spanish at home, and we run the whole job in Spanish when that is easier. Electrical and plumbing changes are done by our Utah-licensed partners under their own permits.',
      es: 'West Valley City es la segunda ciudad más grande de Utah, y en su mayoría son casas unifamiliares modestas con varias décadas encima. Ahí es donde una remodelación rinde más: un baño, una cocina, un sótano convertido en espacio para la familia o para rentar. Muchas familias aquí hablan español en casa, y llevamos toda la obra en español cuando así es más fácil. Los cambios eléctricos y de plomería los hacen nuestros socios con licencia de Utah, bajo sus propios permisos.',
    },
    seo: {
      en: {
        title: 'General Contractor in West Valley City, UT',
        description:
          'Remodeling, concrete and landscaping in West Valley City. Kitchens, baths, basements and yards. Se habla español. Free estimates.',
      },
      es: {
        title: 'Contratista General en West Valley City, UT',
        description:
          'Remodelación, concreto y jardinería en West Valley City. Cocinas, baños, sótanos y jardines. Atendemos en español. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'heber',
    slug: { en: 'heber', es: 'heber' },
    name: 'Heber City',
    county: 'Wasatch County',
    driveMinutes: 55,
    localDetail: {
      en: 'Heber is a mountain valley, about an hour from Eagle Mountain, with cold winters and a short growing season. Lots are often larger than in the valley, and older ranch homes sit next to new builds near Jordanelle. Outdoor work has a tight window, so we book landscaping and concrete for late spring through early fall. Basements and interior remodels are what we schedule for winter, when the weather does not matter.',
      es: 'Heber es un valle de montaña, a cerca de una hora de Eagle Mountain, con inviernos fríos y una temporada de crecimiento corta. Los lotes suelen ser más grandes que en el valle, y casas de rancho antiguas conviven con construcciones nuevas cerca de Jordanelle. El trabajo exterior tiene una ventana estrecha, así que programamos jardinería y concreto de finales de primavera a principios de otoño. Los sótanos y las remodelaciones interiores los dejamos para el invierno, cuando el clima no importa.',
    },
    seo: {
      en: {
        title: 'General Contractor in Heber City, UT',
        description:
          'Concrete, landscaping and remodeling in Heber City and the Heber Valley, scheduled around a short mountain season. Free estimates.',
      },
      es: {
        title: 'Contratista General en Heber City, UT',
        description:
          'Concreto, jardinería y remodelación en Heber City y el Valle de Heber, programados según la temporada de montaña. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
  {
    id: 'park-city',
    slug: { en: 'park-city', es: 'park-city' },
    name: 'Park City',
    county: 'Summit County',
    driveMinutes: 65,
    localDetail: {
      en: 'Park City is our farthest and most demanding area. Heavy snow, steep lots and a short building season shape every project, and many neighbourhoods have HOAs with architectural review; Old Town has its own historic design guidelines. We plan for those approvals up front. Interior remodels run year-round, while landscaping and exterior work wait for the snow to clear, with plants chosen for a mountain climate rather than the valley.',
      es: 'Park City es nuestra área más lejana y más exigente. La nieve abundante, los lotes inclinados y una temporada de obra corta marcan cada proyecto, y muchos barrios tienen HOA con revisión arquitectónica; Old Town tiene sus propias guías de diseño histórico. Planeamos esas aprobaciones desde el principio. Las remodelaciones interiores siguen todo el año, mientras que la jardinería y la obra exterior esperan a que se vaya la nieve, con plantas elegidas para clima de montaña y no de valle.',
    },
    seo: {
      en: {
        title: 'General Contractor in Park City, UT',
        description:
          'Remodeling, concrete and landscaping in Park City, planned for snow, steep lots and HOA review. Free written estimates.',
      },
      es: {
        title: 'Contratista General en Park City, UT',
        description:
          'Remodelación, concreto y jardinería en Park City, planeados para nieve, lotes inclinados y revisión de la HOA. Presupuesto gratis.',
      },
    },
    status: 'published',
  },
])

export const publishedCities = cities.filter((c) => c.status === 'published')
