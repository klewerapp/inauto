import { FormEvent, useEffect, useState } from 'react'
import { Configurator } from '../components/Configurator'
import { Compare, Slider } from '../components/Slider'

const file = (index: number, name: string) =>
  `/site/${String(index).padStart(3, '0')}-${name}`

const STYLE_SLIDER = [
  'photo_5420445497639951338_y.jpg',
  'photo_5420445497639951450_y.jpg',
  'photo_5420445497639951339_y.jpg',
  'photo_5420445497639951452_y.jpg',
  'photo_5420445497639951342_y.jpg',
  'photo_5420445497639951449_y.jpg',
  'photo_5420445497639951347_y.jpg',
  'photo_5420445497639951444_y.jpg',
  'photo_5420445497639951343_y.jpg',
  'photo_5420445497639951447_y.jpg',
  'photo_5420445497639951345_y.jpg',
  'photo_5420445497639951445_y.jpg',
  'photo_5420445497639951350_y.jpg',
  'photo_5420445497639951399_y.jpg',
  'photo_5420445497639951346_y.jpg',
  'photo_5420445497639951446_y.jpg',
  'photo_5420445497639951340_y.jpg',
].map((name, index) => file(index + 11, name))

const QUALITIES = [
  {
    title: 'Technologie en forme de diamant brevetée',
    text: 'ils recueillent la poussière, les petits débris et l’excès d’humidité',
    image: file(3, 'photo1688314496.jpg'),
  },
  {
    title: 'Produit respectueux de l’environnement',
    text: 'du recyclage, sans odeur, non toxique, sans réactions allergiques',
    image: file(4, 'photo1688312853.jpg'),
  },
  {
    title: 'Ni caoutchouc, ni plastique',
    text: 'très léger, 5 fois plus léger que le caoutchouc, n’absorbe pas l’humidité, ne nécessite pas de séchage',
    image: file(5, 'photo1688312853_1.jpg'),
  },
  {
    title: 'A des fixations fiables',
    text: 'les tapis sont fixés avec des attaches d’origine et supplémentaires — ils ne glissent pas, donc ils sont sûrs',
    image: file(6, 'img_7121.png'),
  },
  {
    title: 'Résistant à la température - 80°C à +55°C',
    text: '',
    image: file(7, 'img_7466.jpg'),
  },
  {
    title: 'Fabrication manuelle',
    text: 'les ensembles de tapis sont fabriqués personnellement pour votre voiture (avec une précision maximale). Toutes les nuances possibles sont prises en compte. Ferme la surface au sol maximale pour garder l’intérieur propre pour un nettoyage occasionnel.',
    image: file(8, 'photo1690027824.jpg'),
  },
]

const REASONS = [
  {
    title: 'Fabrication individuelle',
    icon: 'cut',
    text: 'Nous fabriquons des tapis de sol spécialement pour votre voiture en tenant compte de toutes vos préférences. Les tapis s’adapteront avec une précision de 99 % à l’intérieur de votre véhicule.',
  },
  {
    title: 'Facilité de nettoyage',
    icon: 'clean',
    text: 'Le nettoyage est accéléré plus de 4 fois. Il suffit de retirer et de secouer.',
  },
  {
    title: 'Universalité',
    icon: 'sun',
    text: 'Possibilité d’utilisation pendant toutes les 4 saisons. Ne retient pas l’humidité, ne nécessite pas de séchage.',
  },
  {
    title: 'Couleur',
    icon: 'palette',
    text: 'Possibilité de choisir la couleur pour correspondre à l’intérieur et à l’extérieur de votre voiture.',
  },
  {
    title: 'Garantie de 2 ans',
    icon: 'shield',
    text: 'Et nous garantissons que même après 5 ans, les tapis ne perdront pas leurs propriétés d’origine.',
  },
  {
    title: '100 % écologique',
    icon: 'leaf',
    text: 'Fabriqué à partir de matériaux respectueux de l’environnement. Sans odeur. Sûr pour les enfants et les animaux domestiques.',
  },
  {
    title: 'Vitesse de production',
    icon: 'clock',
    text: 'De 5 à 7 jours.',
  },
  {
    title: 'Le seul atelier',
    icon: 'star',
    text: 'C’est un produit exclusif en France.',
  },
]

function ReasonIcon({ name }: { name: string }) {
  const pen = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (name === 'cut') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...pen} d="M4 8h16v11H4zM8 8V5h8v3" />
      </svg>
    )
  }
  if (name === 'clean') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...pen} d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
      </svg>
    )
  }
  if (name === 'sun') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle {...pen} cx="12" cy="12" r="3.5" />
        <path {...pen} d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
      </svg>
    )
  }
  if (name === 'palette') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect {...pen} x="3.5" y="3.5" width="7" height="7" rx="1.6" />
        <rect {...pen} x="13.5" y="3.5" width="7" height="7" rx="1.6" />
        <rect {...pen} x="3.5" y="13.5" width="7" height="7" rx="1.6" />
        <rect {...pen} x="13.5" y="13.5" width="7" height="7" rx="1.6" />
      </svg>
    )
  }
  if (name === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...pen} d="M12 3.5 19 6.2v5.3c0 4.2-2.8 7.2-7 8.5-4.2-1.3-7-4.3-7-8.5V6.2z" />
        <path {...pen} d="m9 12 2 2 4-4.5" />
      </svg>
    )
  }
  if (name === 'leaf') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...pen} d="M5 19c8 0 14-7 14-15-8 0-14 7-14 15z" />
        <path {...pen} d="M9 15c2-3 5-5 8-6" />
      </svg>
    )
  }
  if (name === 'clock') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle {...pen} cx="12" cy="12" r="8" />
        <path {...pen} d="M12 8v4.5l3 2" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path {...pen} d="m12 3.5 2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 15.8 7.2 18.1l.9-5.3L4.3 9.1l5.3-.8z" />
    </svg>
  )
}

const PROCESS = [
  {
    title: '5 ans d’expérience et plus de 3000 modèles dessinés à la main',
    text: 'Nous avons rassemblé notre base de patrons pendant cinq ans en prenant manuellement des mesures de chaque voiture. À ce jour, nous avons plus de 3000 modèles et continuons d’enrichir notre base avec de nouveaux modèles de voitures. Nous sommes tellement confiants dans notre produit que nous vous offrons une garantie de 2 ans en toute confiance.',
  },
  {
    title: 'Nous pouvons fabriquer des ensembles pour 98 % des voitures',
    text: 'Grâce à notre immense base de données de trois mille modèles, nous pouvons fabriquer des ensembles pour 98 % des voitures sans nécessiter de mesures supplémentaires de votre part ou de la nôtre. Si vous possédez une voiture rare ou si vous avez des demandes spéciales, vous pouvez toujours venir dans notre atelier ou nous pouvons également venir chez vous pour prendre des mesures et discuter des détails.',
  },
  {
    title: 'Les modèles qui correspondent à 100 % aux données de votre voiture',
    text: 'Avant de commencer la production, nous discutons généralement de vos souhaits et préférences, et nous nous approchons individuellement de l’exécution de votre commande afin que le résultat final corresponde pleinement à vos attentes. De plus, nous sommes prêts à vous fournir toutes les informations, photos et vidéos de nos travaux et échantillons. Si nécessaire, nous vous fournirons des photos des travaux terminés de votre voiture ainsi que nos modèles qui correspondent à 100 % aux données de votre véhicule.',
  },
  {
    title: 'Si cela ne correspond pas — échange / remboursement',
    text: 'Seulement après avoir obtenu votre accord, nous commençons la production de votre ensemble pour être sûrs que tout correspond et pour éviter les éventuels désaccords. Si pour une raison qui nous incombe, l’ensemble ne vous convient pas, nous rectifierons tout à nos frais dans les 3 jours ou effectuerons un remboursement.',
  },
  {
    title: 'La fabrication ne prend que 5 à 7 jours ouvrables',
    text: 'Nous sommes situés en Suisse et nous nous efforçons de traiter votre commande le plus rapidement possible, en fonction de la charge de notre production. Le délai de fabrication ne prend que 5 à 7 jours ouvrables.',
  },
  {
    title: 'Livraison et paiement',
    text: 'Votre ensemble est fabriqué sur mesure pour votre véhicule en Suisse. La TVA et la livraison à votre adresse en France sont déjà incluses dans le prix. Le paiement s’effectue en ligne lors de votre commande, via notre système de paiement sécurisé. Vous pouvez régler votre commande avec le moyen de paiement qui vous convient : Visa, Mastercard, PayPal, Apple Pay ou Google Pay. Dès confirmation du paiement, nous lançons la préparation de votre commande sur mesure. Le délai de fabrication est de 5 à 7 jours, après quoi votre commande est expédiée directement à votre adresse en France.',
  },
]

const CARE = [
  {
    title: 'Garantie de 2 ans',
    text: 'Nous vous offrons une garantie de 2 ans sur les tapis et nous garantissons qu’après 5 ans, ils ne perdront pas leurs propriétés ni leur apparence. Ils vous raviront pendant tout ce temps. Vous n’aurez pas besoin de les changer chaque année.',
  },
  {
    title: 'Nettoyage facile',
    text: 'Avec les nouveaux tapis, le nettoyage de votre voiture ne sera plus une corvée mais un plaisir. Vous réduirez le temps de nettoyage de plus de 4 fois.',
  },
  {
    title: 'Pas besoin de produits chimiques',
    text: 'Pour nettoyer le tapis, il suffit d’utiliser de l’eau ordinaire. Vous pouvez également le laver à haute pression. Le matériau est résistant à tous les types d’agents chimiques.',
  },
  {
    title: 'Il suffit simplement de secouer',
    text: 'Un seul coup suffit pour enlever l’herbe, l’eau, la terre sèche et les débris.',
  },
  {
    title: 'Matériau léger',
    text: 'Comparés aux tapis en caoutchouc, qui pèsent plus de 6 kilogrammes, nos tapis sont beaucoup plus légers et faciles à retirer de l’intérieur de votre voiture.',
  },
  {
    title: 'Il n’y a pas de moisissure',
    text: 'Nos tapis ne deviennent pas humides comme les tapis d’origine habituels et ne nécessitent pas de séchage.',
  },
  {
    title: 'Pas besoin de soins supplémentaires',
    text: 'Après le lavage, les tapis propres sèchent très rapidement sans aucun produit auxiliaire. Pas besoin d’utiliser un sèche-cheveux ni de mettre l’article dans un séchoir.',
  },
]

const EXAMPLES = [
  {
    title: 'Citroën SpaceTourer 2018',
    images: ['photo1690545369.jpg', 'photo1690545616.jpg', 'photo1690545387.jpg', 'photo1690545467.jpg'].map(
      (name, index) => file(index + 28, name),
    ),
  },
  {
    title: 'Volkswagen Passat TDI 2010',
    images: [
      'photo_5285149616884534944_x.jpg',
      'photo1690544232.jpg',
      'photo1690543978.jpg',
      'photo1690544018.jpg',
    ].map((name, index) => file(index + 32, name)),
  },
  {
    title: 'Dacia Sandero DCI 95 2019',
    images: ['photo1690545103.jpg', 'photo1690545176.jpg', 'photo1690545141.jpg'].map((name, index) =>
      file(index + 36, name),
    ),
  },
  {
    title: 'Fiat 500 Cross 4x4 2017',
    images: [
      'photo_5285149616884534949_y.jpg',
      'photo1690547185.jpg',
      'photo1690547222.jpg',
      'photo1690547185_1.jpg',
    ].map((name, index) => file(index + 39, name)),
  },
  {
    title: 'Volvo XC 60 2012',
    images: ['img_6017.jpg', 'photo1690545920.jpg', 'photo1690545875.jpg', 'photo1690545895.jpg'].map(
      (name, index) => file(index + 43, name),
    ),
  },
  {
    title: 'Lexus LX470 2005',
    images: ['photo1690546262.jpg', 'photo1690546290.jpg', 'photo1690546316.jpg', 'photo1690546768.jpg'].map(
      (name, index) => file(index + 47, name),
    ),
  },
  {
    title: 'Volkswagen Sharan 2014',
    images: [
      'photo_5285149616884534945_x.jpg',
      'photo1690544652.jpg',
      'photo1690544749.jpg',
      'photo1690544777.jpg',
    ].map((name, index) => file(index + 51, name)),
  },
  {
    title: 'Mini Cooper Clubman 2010',
    images: [
      'photo_5285149616884534960_y.jpg',
      'photo1690547404.jpg',
      'photo1690547436.jpg',
      'photo1690547454.jpg',
    ].map((name, index) => file(index + 55, name)),
  },
]

const CLIENTS = [
  {
    title: 'Peugeot 2008 2018',
    images: [
      '/site/129-screenshot_402.png',
      ...['photo1690557305.jpg', 'photo1690719063.jpg', 'photo1690719063_1.jpg', 'photo1690719063_3.jpg'].map(
        (name, index) => file(index + 72, name),
      ),
    ],
  },
  {
    title: 'Volkswagen CC 2012',
    images: [
      '/site/130-screenshot_403.png',
      ...['photo1690717242.jpg', 'photo1690718187_1.jpg', 'photo1690718187.jpg'].map((name, index) =>
        file(index + 76, name),
      ),
    ],
  },
  {
    title: 'Volkswagen Touran 2.0 TDI 2013',
    images: [
      '/site/131-screenshot_404.png',
      ...[
        'photo1690557305.jpg',
        'whatsapp_image_2023_07_30_at_14_17_10_1.jpg',
        'whatsapp_image_2023_07_30_at_14_17_11.jpg',
        'whatsapp_image_2023_07_30_at_14_17_10.jpg',
        'whatsapp_image_2023_07_30_at_14_17_09.jpg',
      ].map((name, index) => file(index + 79, name)),
    ],
  },
  {
    title: 'BMW 730 xDrive 2019',
    images: [
      '/site/132-screenshot_406.png',
      ...[
        'photo1690557306_1.jpg',
        'whatsapp_image_2023_07_30_at_14_40_59.jpg',
        'whatsapp_image_2023_07_30_at_14_40_59_3.jpg',
        'whatsapp_image_2023_07_30_at_14_40_59_1.jpg',
        'whatsapp_image_2023_07_30_at_14_40_59_2.jpg',
      ].map((name, index) => file(index + 84, name)),
    ],
  },
  {
    title: 'Audi A4 Cabrio B6 2002',
    images: [
      '/site/133-screenshot_407.png',
      ...[
        'photo1690557306_2.jpg',
        'photo1690552658_3.jpg',
        'photo1690552658_5.jpg',
        'photo1690552658_7.jpg',
        'photo1690552658_6.jpg',
      ].map((name, index) => file(index + 89, name)),
    ],
  },
  {
    title: 'Fiat Panda TwinAir 4x4 2016',
    images: [
      '/site/134-screenshot_411.png',
      file(94, 'photo1690722826.jpg'),
      '/site/135-screenshot_409.png',
      '/site/136-screenshot_408.png',
      '/site/137-screenshot_410.png',
    ],
  },
]

const PRODUCE = [
  'photo_5436067268653078013_y.jpg',
  'photo_5436067268653078020_y.jpg',
  'photo_5436067268653077972_y.jpg',
  'photo_5436067268653078012_y.jpg',
  'photo_5436067268653077962_y.jpg',
  'photo_5436067268653077959_y.jpg',
].map((name, index) => file(index + 59, name))

const EXPERIENCE = ['photo_5436018288846035977_y.jpg', 'photo_5413699306608775742_y.jpg'].map((name, index) =>
  file(index + 65, name),
)

const COVERAGE = [
  'photo_5436067268653078840_y.jpg',
  'photo_5436067268653078837_y.jpg',
  'photo_5436067268653078811_y_1.jpg',
  'photo_5436067268653078810_y_1.jpg',
  'photo_5436067268653078809_y_1.jpg',
].map((name, index) => file(index + 67, name))

const COLOR_MATCH = [
  'photo1691858902.jpg',
  'photo1691858902_1.jpg',
  'photo1691858902_2.jpg',
  'photo1691858902_3.jpg',
  'photo1691858902_4.jpg',
  'photo1691858902_5.jpg',
  'photo1691858902_6.jpg',
  'photo1691858902_7.jpg',
  'photo1691858902_8.jpg',
  'photo1691858902_9.jpg',
  'photo1691858903.jpg',
  'photo1691865657.jpg',
].map((name, index) => file(index + 95, name))

const AT_HOME = [
  ['photo1689171411.jpg', 'photo1689171411_1.jpg'],
  ['photo1689177080.jpg', 'photo1689177080_1.jpg'],
  ['photo1689177860.jpg', 'photo1689177860_1.jpg'],
  ['photo1689171896.jpg', 'photo1689171896_1.jpg'],
  ['photo1689178426.jpg', 'photo1689178426_1.jpg'],
  ['photo1689178692.jpg', 'photo1689178692_1.jpg'],
].map((pair, index) => pair.map((name, side) => file(107 + index * 2 + side, name)))

const CARE_PHOTOS = [
  file(119, 'photo1709406782.jpg'),
  file(120, 'photo_5389009047157593756_y.jpg'),
  file(121, 'photo_5456542283991210453_y.jpg'),
  file(122, 'ultah3akpvxhwb7kobm.jpg'),
  file(123, 'img_2793.jpg'),
  file(124, 'photo_5370610240485186098_y.jpg'),
  file(125, 'photo_5370610240485186097_y.jpg'),
  file(126, 'photo_5370610240485186099_y.jpg'),
]

const PROCESS_VISUALS = [EXPERIENCE, COVERAGE, PRODUCE.slice(0, 2), PRODUCE.slice(2, 4), [PRODUCE[4]], [PRODUCE[5]]]

const FAQ = [
  {
    q: 'Quel est le processus de mesure et de fabrication de nos tapis de voiture ?',
    a: 'Avec nos cinq ans d’expérience, nous avons constitué une base de plus de 3000 modèles, chacun étant pris manuellement sur des voitures, en tenant compte de leurs caractéristiques et nuances. Grâce à cela, nous pouvons affirmer que nous pouvons fabriquer des ensembles de tapis pour 98 % des voitures sans nécessiter de mesures supplémentaires. Il vous suffit de nous fournir les données de votre véhicule, et nous les comparerons à notre base de données pour vous informer de la faisabilité de votre commande. Si vous avez des demandes ou des exigences particulières, nous sommes toujours prêts à les discuter et à trouver la meilleure solution pour vous. Nous ne commencerons la production qu’une fois que tous les détails auront été convenus avec vous.',
  },
  {
    q: 'Y a-t-il des tapis de sol adaptés à ma voiture ?',
    a: 'Nous pouvons fabriquer des tapis de sol de voiture pour pratiquement toutes les marques et tous les modèles. Pour les voitures plus exclusives et rares, nous pouvons effectuer des mesures manuelles dans notre atelier ou, selon votre accord, organiser une visite chez vous.',
  },
  {
    q: 'Quel est le prix ?',
    a: 'Nous proposons des ensembles pour les voitures de tourisme standards pour avoir une idée plus claire des prix. Si vous avez une grande voiture, nous recalculerons le prix en tenant compte de votre avantage.',
  },
  {
    q: 'Le délai de fabrication ?',
    a: 'Nous nous efforçons de traiter votre commande aussi rapidement que possible. Le délai de fabrication varie de 1 à 7 jours en fonction de la charge de travail de notre production. De plus, pour votre commodité, vous pouvez visiter notre atelier où nous pourrons prendre des mesures immédiates et fabriquer un nouvel ensemble de tapis pour vous le même jour.',
  },
  {
    q: 'La livraison',
    a: 'La livraison est généralement effectuée à domicile par le service postal Colissimo.',
  },
  {
    q: 'Paiement',
    a: 'Lors de votre commande, vous pouvez effectuer votre paiement en ligne avec Visa, Mastercard ou PayPal. Dès confirmation du paiement, nous lançons la fabrication de votre commande sur mesure. Une fois votre ensemble prêt, il est expédié directement à votre adresse en France.',
  },
  {
    q: 'Échange ou retour',
    a: 'Si pour notre raison les tapis ne vous conviennent pas, nous procéderons à un échange ou à un remboursement dans les 3 jours. Avant de passer votre commande, nous vous contacterons pour nous assurer que 100 % des tapis conviennent à votre voiture.',
  },
]

const VIDEO_ID = '6aghzJKpqpo'

export function Home() {
  const [sent, setSent] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    if (!videoOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setVideoOpen(false)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [videoOpen])

  function onQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-banner">
          <div className="hero-copy">
            <h1>
              Tapis de voiture
              <span>nouvelle génération</span>
            </h1>
            <ul className="hero-points">
              <li>Fabriqués individuellement pour votre modèle</li>
              <li>Plus de 3 000 modèles disponibles</li>
              <li>Fabrication en 5 à 7 jours ouvrables</li>
              <li>TVA et livraison en France incluses</li>
            </ul>
            <a className="btn" href="#configurateur">
              Commander
            </a>
          </div>
          <img src={file(2, 'photo_5436067268653078811_y_2.jpg')} alt="Tapis de sol sur mesure dans l’habitacle" />
        </div>
      </section>

      <section className="band" id="savoir">
        <div className="quality-cards">
          {QUALITIES.map((item) => (
            <article key={item.title}>
              <img src={item.image} alt="" />
              <h3>{item.title}</h3>
              {item.text ? <p>{item.text}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="band band-muted">
        <div className="section-head">
          <h2>Pourquoi les passionnés d’automobile choisissent nos tapis de sol ?</h2>
        </div>
        <div className="reason-grid">
          {REASONS.map((item) => (
            <article key={item.title}>
              <span className="reason-icon">
                <ReasonIcon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band" id="personnalisation">
        <div className="section-head">
          <h2>Créez votre propre style en utilisant n’importe quelle couleur de base et de bordure</h2>
          <p>Votre choix vous appartient</p>
          <a className="btn" href="#configurateur">
            Je veux faire un choix
          </a>
        </div>
        <div className="fan-pair">
          <img src={file(10, 'photo_5420445497639951284_x.jpg')} alt="Nuancier des couleurs de tapis" />
          <figure>
            <Slider images={STYLE_SLIDER} label="Solution créative pour nos clients" />
            <figcaption>Solution créative pour nos clients</figcaption>
          </figure>
        </div>
      </section>

      <section className="band band-muted" id="realisations">
        <div className="section-head">
          <h2>Ce que vous recevrez :</h2>
          <p>Les coloris de tapis les plus populaires parmi nos clients.</p>
        </div>
        <div className="example-grid">
          {EXAMPLES.map((item) => (
            <article key={item.title}>
              <Slider images={item.images} label={item.title} />
              <h3>{item.title}</h3>
              <a href="#configurateur">Je veux ceux-ci</a>
            </article>
          ))}
        </div>
      </section>

      <section className="band band-dark">
        <div className="section-head center-head">
          <h2>Regardez ce que vous obtenez avec nos tapis</h2>
          <p>Découvrez à quel point c’est élégant, pratique et confortable</p>
        </div>
        <button type="button" className="video-poster" onClick={() => setVideoOpen(true)}>
          <img className="wide-photo" src={file(9, 'img_7469.jpg')} alt="Tapis posés dans l’habitacle" />
          <span className="play-btn" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
          <span className="sr-only">Lire la vidéo</span>
        </button>
        {videoOpen && (
          <div className="video-modal" role="dialog" aria-modal="true" aria-label="Regardez ce que vous obtenez avec nos tapis">
            <button type="button" className="video-backdrop" aria-label="Fermer" onClick={() => setVideoOpen(false)} />
            <div className="video-dialog">
              <button type="button" className="video-close" aria-label="Fermer la vidéo" onClick={() => setVideoOpen(false)}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title="Regardez ce que vous obtenez avec nos tapis"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </section>

      <section className="band produce" id="processus">
        <div className="section-head">
          <h2>Comment nous produisons des tapis sur mesure individuel:</h2>
        </div>
        <div className="process-list">
          {PROCESS.map((item, index) => (
            <article className="process-row" key={item.title}>
              <Slider images={PROCESS_VISUALS[index]} label={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="band band-muted">
        <div className="section-head">
          <h2>Facilité d’utilisation :</h2>
        </div>
        <div className="use-grid">
          <Slider images={CARE_PHOTOS} label="Facilité d’utilisation" />
          <ul>
            {CARE.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band">
        <div className="cta-band">
          <h2>
            Ne manquez pas l’occasion de fournir à votre voiture la meilleure protection et le plus grand confort ! Commandez nos tapis de voiture uniques dès maintenant !
          </h2>
          <a className="btn" href="#configurateur">
            Commander
          </a>
        </div>
      </section>

      <Configurator />

      <section className="band" id="avis">
        <div className="section-head">
          <h2>Ce que disent nos clients à propos de nos tapis de sol</h2>
        </div>
        <div className="example-grid">
          {CLIENTS.map((item) => (
            <article key={item.title}>
              <Slider images={item.images} label={item.title} />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
        <p className="lead-note">
          Pour obtenir le même résultat, appuyez sur le bouton.
        </p>
        <a className="btn" href="#configurateur">
          Obtenir le même résultat
        </a>
      </section>

      <section className="band promise promise-dark">
        <div>
          <h2>Pourquoi devriez-vous acheter nos tapis de sol ?</h2>
          <ul>
            <li>Matériau écologique, sans toxines et sans odeurs.</li>
            <li>Fabrication individuelle prenant en compte toutes les nuances et particularités de votre voiture.</li>
            <li>Durée de vie prolongée avec une garantie de 3 ans — pas besoin de chercher un remplacement pour les tapis chaque année.</li>
            <li>Confortables et pratiques à utiliser, antidérapants, sécuritaires pendant la conduite.</li>
            <li>La plus vaste gamme de couleurs de base et de bordures vous permettant de créer votre propre ambiance.</li>
            <li>Matériau innovant et polyvalent pour toutes les 4 saisons avec la technologie alvéolaire brevetée : n’absorbe pas l’humidité, ne devient pas humide, peut être lavé avec des nettoyeurs haute pression, ne nécessite pas de séchage, il suffit de secouer et de partir.</li>
            <li>Économie de temps de nettoyage de l’intérieur de la voiture plus de 4 fois.</li>
            <li>Nous sommes le seul atelier en Suisse, ce qui signifie que vous recevrez un produit exclusif.</li>
          </ul>
        </div>
        <div>
          <h2>Pourquoi dans notre entreprise ?</h2>
          <ul>
            <li>Lors de la fabrication de votre commande, nous prenons en compte toutes vos préférences et produisons un ensemble personnalisé pour votre voiture. Nous nous déplaçons pour prendre des mesures si nécessaire.</li>
            <li>Et même après un an, si vous avez des souhaits supplémentaires, nous serons ravis de les satisfaire.</li>
            <li>Nous sommes la seule entreprise en Suisse à proposer ce produit, c’est pourquoi vos tapis de sol sont uniques.</li>
            <li>Vous avez toujours la possibilité de nous contacter 24/7, y compris les week-ends.</li>
            <li>Nous réaliserons votre commande plus rapidement que n’importe où ailleurs, en seulement 5 à 7 jours au lieu de l’attente habituelle de 30 jours.</li>
            <li>Nous proposons une offre spéciale à nos clients : une réduction supplémentaire sur vos prochains achats.</li>
            <li>Nous fabriquons également des tapis de sol pour les fourgonnettes, les camping-cars, les camions, les bateaux, les yachts, les hélicoptères, les planeurs et autres.</li>
          </ul>
        </div>
      </section>

      <section className="band promise promise-dark">
        <div>
          <h2>Pour quoi payez-vous</h2>
          <ul>
            <li>Le cycle de production du matériau se compose de plusieurs étapes — recyclage secondaire, neutralisation des odeurs.</li>
            <li>Lors de la fabrication manuelle, chaque détail est pris en compte. Des mesures individuelles et une couture précise pour votre voiture.</li>
            <li>Possibilité de déplacement à votre demande pour des mesures spéciales, ainsi que pour l’installation après la fabrication.</li>
            <li>Notre coût est lié à la durée de vie : vous réalisez un investissement où vous économisez jusqu’à 30 % de vos fonds à l’avenir.</li>
            <li>Vous économisez plus de 4 fois le temps de nettoyage de votre voiture.</li>
            <li>Nos tapis de sol ont une usure minimale et, même après plusieurs années, ils ont l’aspect du neuf.</li>
          </ul>
        </div>
        <div>
          <h2>Quels sont vos risques ?</h2>
          <ul>
            <li>Nous vous garantissons que vous ne risquez rien.</li>
            <li>Si pour notre raison les tapis ne vous conviennent pas, nous procéderons à un échange ou à un remboursement dans les 3 jours.</li>
            <li>Avant de passer votre commande, nous vous contacterons pour nous assurer que 100 % des tapis conviennent à votre voiture.</li>
            <li>Vous pouvez visiter notre atelier en Suisse pour voir les tapis, faire votre choix et obtenir une consultation.</li>
            <li>Nous restons en contact avec vous à toutes les étapes, de la commande à la pose, puis pendant toute la durée de vie de vos tapis.</li>
            <li>Nous sommes basés en Suisse et assurons la livraison dans tout le pays.</li>
            <li>Nous visons à vous offrir la qualité suisse. Nous n’avons eu aucun cas de défaut, d’échange ou de retour jusqu’à présent.</li>
          </ul>
          <p className="quote">
            « Nous sommes heureux de partager notre bonheur avec les nouveaux clients dans l’utilisation de notre produit ! » — entreprise « Dans in auto ».
          </p>
        </div>
      </section>

      <section className="band">
        <div className="section-head">
          <h2>Comment les tapis de voiture peuvent parfaitement correspondre à la couleur de la voiture</h2>
        </div>
        <div className="photo-grid">
          {COLOR_MATCH.map((src) => (
            <img key={src} src={src} alt="Tapis assorti à la couleur de la voiture" />
          ))}
        </div>
      </section>

      <section className="band band-plain">
        <div className="section-head">
          <h2>Comment cela se passera chez vous :</h2>
        </div>
        <div className="before-grid">
          {AT_HOME.map((pair) => (
            <Compare key={pair[0]} before={pair[0]} after={pair[1]} />
          ))}
        </div>
      </section>

      <section className="band cta-inline">
        <p>Sur Internet, vous voyez des options qui ne conviennent pas ? Pour créer votre propre style, appuyez sur le bouton</p>
        <a className="btn" href="#configurateur">
          Commander
        </a>
      </section>

      <section className="band band-muted" id="faq">
        <div className="section-head">
          <h2>Questions fréquemment posées</h2>
        </div>
        <div className="faq">
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="band contact-split" id="contact">
        <div className="ask-card">
          <h2>Posez votre propre question</h2>
          <img src="/site/128-vadim_bogulov_vq_sqr7d_7k_unsplash.jpg" alt="" />
          {sent ? (
            <p className="form-success" role="status">
              Merci ! Votre question a été envoyée. Nous vous répondrons au plus vite.
            </p>
          ) : (
            <form className="question-form" onSubmit={onQuestion}>
              <label>
                Question
                <textarea name="message" required rows={4} />
              </label>
              <label>
                Nom
                <input name="name" required autoComplete="name" />
              </label>
              <label>
                Numéro de téléphone, WhatsApp ou e-mail
                <input name="phone" required autoComplete="tel" />
              </label>
              <button className="btn" type="submit">
                Envoyer ma question
              </button>
            </form>
          )}
        </div>
        <div className="place-card">
          <h2>Où est notre emplacement ?</h2>
          <p className="address">Adresse: 5 Rue du Mont Blanc, 69960 Corbas, France</p>
          <img
            className="wide-photo"
            src="/site/127-dizayn_bez_nazvaniya_2026_07_14t153610_013.png"
            alt="Carte : Corbas, près de Lyon"
          />
          <div className="socials">
            <a href="https://www.facebook.com/in.auto.dans.la.voiture" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://www.instagram.com/in__auto_/" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-points">
          <p>
            <strong>Garantie de 2 ans</strong>
            Même après 5 ans, les tapis ne perdent pas leurs propriétés d’origine.
          </p>
          <p>
            <strong>Livraison Colissimo</strong>
            La livraison est généralement effectuée à domicile par Colissimo.
          </p>
          <p>
            <strong>Fabrication individuelle</strong>
            Les tapis s’adaptent avec une précision de 99 % à votre véhicule.
          </p>
          <p>
            <strong>5 à 7 jours</strong>
            TVA et livraison en France sont déjà incluses dans le prix.
          </p>
        </div>
        <div className="site-footer-inner">
          <div>
            <img src="/site/001-logo_png_beloe.png" alt="Dans la voiture" />
            <p>5 Rue du Mont Blanc, 69960 Corbas, France</p>
            <p>
              <a href="tel:+33688481601">+33 6 88 48 16 01</a>
            </p>
          </div>
          <p>
            <a href="/confidentialite">Politique de confidentialité</a>
          </p>
        </div>
      </footer>
    </main>
  )
}
