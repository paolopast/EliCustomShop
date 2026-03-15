import {
  AboutPillar,
  CollectionFilter,
  CollectionModel,
  ContactDetail,
  FaqGroup,
  FaqItem,
  GalleryItem,
  HeroStat,
  NavLink,
  ProcessStep,
  SelectOption,
  Testimonial
} from '../models/site.models';

const unsplash = (id: string, width: number, height: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

export const BRAND_NAME = 'ELI ATELIER';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Collezioni', path: '/collections' },
  { label: 'Come Funziona', path: '/how-it-works' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contatti', path: '/contact' }
];

export const COLLECTION_FILTERS: CollectionFilter[] = [
  { value: 'all', label: 'Tutte le collezioni' },
  { value: 'bespoke-sneakers', label: 'Bespoke sneakers' },
  { value: 'elegant-shoes', label: 'Scarpe eleganti' },
  { value: 'wedding-shoes', label: 'Wedding shoes' },
  { value: 'ceremonial-footwear', label: 'Cerimonia' },
  { value: 'luxury-casual', label: 'Luxury casual' }
];

export const COLLECTION_MODELS: CollectionModel[] = [
  {
    slug: 'lido-bespoke-sneaker',
    name: 'Lido Bespoke Sneaker',
    category: 'bespoke-sneakers',
    styleTag: 'bespoke sneaker',
    description:
      'Sneaker su base premium con toni sabbia, finitura morbida e dettagli discreti pensati per un guardaroba contemporaneo ma misurato.',
    accentNote: 'Pellame pieno fiore e finiture soft taupe',
    startingPrice: 'da 460 EUR',
    leadTime: '12-18 giorni',
    baseModel: 'court leather low',
    palette: 'sabbia, warm ivory, taupe',
    materials: ['pelle pieno fiore', 'fodera soft touch', 'finitura matte'],
    image: unsplash('photo-1600185365926-3a2ce3cdb9eb', 1200, 1450)
  },
  {
    slug: 'palazzo-derby',
    name: 'Palazzo Derby',
    category: 'elegant-shoes',
    styleTag: 'timeless derby',
    description:
      'Derby custom con linee essenziali, tomaia pulita e finitura calda, pensata per occasioni formali e guardaroba curati nel tempo.',
    accentNote: 'Profilo affusolato e sfumatura mocha',
    startingPrice: 'da 620 EUR',
    leadTime: '14-22 giorni',
    baseModel: 'derby leather artisan',
    palette: 'taupe, mocha, brown',
    materials: ['vitello premium', 'fondo cuoio', 'patina a mano'],
    image: unsplash('photo-1491553895911-0055eca6402d', 1200, 1450)
  },
  {
    slug: 'cerimonia-ivory',
    name: 'Cerimonia Ivory',
    category: 'wedding-shoes',
    styleTag: 'wedding edition',
    description:
      'Un progetto pensato per matrimoni e occasioni speciali, con volumi delicati, tonalita avorio e dettagli personali integrati con misura.',
    accentNote: 'Iniziali e data applicate in modo discreto',
    startingPrice: 'da 540 EUR',
    leadTime: '14-20 giorni',
    baseModel: 'ceremony low leather',
    palette: 'warm ivory, pearl, light taupe',
    materials: ['pelle premium', 'fodera chiara', 'finiture satinate'],
    image: unsplash('photo-1511556532299-8f662fc26c06', 1200, 1450)
  },
  {
    slug: 'notte-oxford',
    name: 'Notte Oxford',
    category: 'ceremonial-footwear',
    styleTag: 'ceremonial footwear',
    description:
      'Oxford custom dal carattere sobrio e profondo, pensata per serate, eventi formali e situazioni in cui l eleganza richiede precisione.',
    accentNote: 'Finitura deep brown e cucitura a vista calibrata',
    startingPrice: 'da 670 EUR',
    leadTime: '15-24 giorni',
    baseModel: 'oxford artisan',
    palette: 'deep brown, espresso, camel',
    materials: ['pelle liscia', 'cucitura raffinata', 'sole in cuoio'],
    image: unsplash('photo-1549298916-b41d501d3772', 1200, 1450)
  },
  {
    slug: 'atelier-loafer',
    name: 'Atelier Loafer',
    category: 'luxury-casual',
    styleTag: 'soft casual',
    description:
      'Loafer dal passo rilassato ma impeccabile, costruito in toni neutri e materiali morbidi per un uso quotidiano di alto livello.',
    accentNote: 'Suede caldo e silhouette essenziale',
    startingPrice: 'da 590 EUR',
    leadTime: '12-19 giorni',
    baseModel: 'loafer suede premium',
    palette: 'camel, taupe, deep beige',
    materials: ['suede premium', 'fodera naturale', 'suola light rubber'],
    image: unsplash('photo-1543508282-6319a3e2621f', 1200, 1450)
  },
  {
    slug: 'sabbia-court',
    name: 'Sabbia Court',
    category: 'luxury-casual',
    styleTag: 'quiet luxury',
    description:
      'Sneaker sobria, calda e versatile, dove la personalizzazione si esprime attraverso materia, tono e piccoli dettagli esclusivi.',
    accentNote: 'Monogramma interno e layering tono su tono',
    startingPrice: 'da 490 EUR',
    leadTime: '10-16 giorni',
    baseModel: 'premium court low',
    palette: 'beige, sand, mocha',
    materials: ['pelle morbida', 'nabuk leggero', 'finish hand-brushed'],
    image: unsplash('photo-1460353581641-37baddab0fa2', 1200, 1450)
  }
];

export const FEATURED_MODELS = COLLECTION_MODELS.slice(0, 4);

export const HOME_HERO_STATS: HeroStat[] = [
  { value: 'Milano', label: 'atelier su appuntamento' },
  { value: '10-24 gg', label: 'tempo medio di realizzazione' },
  { value: 'Su misura', label: 'progetto costruito su ogni richiesta' }
];

export const BRAND_POSITIONING_POINTS = [
  'Ogni paio nasce da una conversazione sullo stile di chi lo indossera, sull occasione d uso e sulla durata che si desidera nel tempo.',
  'La personalizzazione e calibrata: pellami, toni, finiture, iniziali e dettagli vengono integrati con misura, mai con eccesso.',
  'Il risultato e un oggetto caldo, raffinato e personale, dove il lavoro artigianale si percepisce tanto da vicino quanto nell insieme.'
];

export const HOME_MARQUEE_ITEMS = [
  'made to order',
  'pelle pieno fiore',
  'artigianalita italiana',
  'wedding shoes',
  'bespoke sneakers',
  'luxury casual',
  'finiture su misura'
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Scegli il modello base',
    description:
      'Individuiamo la forma piu adatta al contesto: sneaker, derby, loafer o modello da cerimonia.',
    detail: 'La scelta della silhouette determina comfort, proporzione e tono dell intero progetto.',
    image: unsplash('photo-1605348532760-6753d2c43329', 960, 1200)
  },
  {
    step: '02',
    title: 'Definiamo materiali, toni e dettagli',
    description:
      'Pellami, suede, palette, iniziali e finiture vengono messi in equilibrio per ottenere un risultato sobrio e distintivo.',
    detail: 'Ogni decisione estetica e legata al modo in cui il paio verra realmente indossato.',
    image: unsplash('photo-1607522370275-f14206abe5d3', 960, 1200)
  },
  {
    step: '03',
    title: 'Approvi il concept',
    description:
      'Ricevi una proposta chiara e ordinata, pensata per confermare la direzione prima dell esecuzione finale.',
    detail: 'La revisione serve a rifinire equilibrio, materiali e dettagli prima della produzione.',
    image: unsplash('photo-1543163521-1bf539c55dd2', 960, 1200)
  },
  {
    step: '04',
    title: 'Produzione e consegna',
    description:
      'Lavoriamo il paio con attenzione artigianale, controllo qualità e una consegna pensata per arrivare con la stessa cura con cui e stato creato.',
    detail: 'Ogni ordine parte solo quando materia, finitura e proporzione raggiungono il livello desiderato.',
    image: unsplash('photo-1582588678413-dbf45f4823e9', 960, 1200)
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Soft taupe leather',
    caption: 'Pelle morbida, luce calda e cucitura misurata su una tomaia essenziale.',
    width: 1200,
    height: 1600,
    image: unsplash('photo-1600185365926-3a2ce3cdb9eb', 1200, 1600),
    thumb: unsplash('photo-1600185365926-3a2ce3cdb9eb', 900, 1200),
    category: 'pelle'
  },
  {
    id: 'g-2',
    title: 'Ceremony ivory',
    caption: 'Volumi puliti e dettagli chiari per progetti dedicati a wedding e momenti speciali.',
    width: 1200,
    height: 1500,
    image: unsplash('photo-1511556532299-8f662fc26c06', 1200, 1500),
    thumb: unsplash('photo-1511556532299-8f662fc26c06', 900, 1125),
    category: 'wedding'
  },
  {
    id: 'g-3',
    title: 'Hand-burnished finish',
    caption: 'Profondita cromatica e rifinitura a mano su pellami dal carattere elegante.',
    width: 1200,
    height: 1700,
    image: unsplash('photo-1491553895911-0055eca6402d', 1200, 1700),
    thumb: unsplash('photo-1491553895911-0055eca6402d', 900, 1275),
    category: 'finitura'
  },
  {
    id: 'g-4',
    title: 'Warm suede',
    caption: 'Toni beige e suede soffice per un lusso quotidiano, discreto ma immediato.',
    width: 1200,
    height: 1450,
    image: unsplash('photo-1543508282-6319a3e2621f', 1200, 1450),
    thumb: unsplash('photo-1543508282-6319a3e2621f', 900, 1088),
    category: 'suede'
  },
  {
    id: 'g-5',
    title: 'Quiet contrast',
    caption: 'Materiali vicini per tono e texture, pensati per un effetto raffinato e mai urlato.',
    width: 1200,
    height: 1600,
    image: unsplash('photo-1460353581641-37baddab0fa2', 1200, 1600),
    thumb: unsplash('photo-1460353581641-37baddab0fa2', 900, 1200),
    category: 'texture'
  },
  {
    id: 'g-6',
    title: 'Formal brown',
    caption: 'Una base profonda e calda, riletta per occasioni serali e cerimoniali.',
    width: 1200,
    height: 1550,
    image: unsplash('photo-1549298916-b41d501d3772', 1200, 1550),
    thumb: unsplash('photo-1549298916-b41d501d3772', 900, 1163),
    category: 'cerimonia'
  },
  {
    id: 'g-7',
    title: 'Studio selection',
    caption: 'Moodboard, riferimento cromatico e scelta del modello prima del concept finale.',
    width: 1200,
    height: 1500,
    image: unsplash('photo-1605348532760-6753d2c43329', 1200, 1500),
    thumb: unsplash('photo-1605348532760-6753d2c43329', 900, 1125),
    category: 'atelier'
  },
  {
    id: 'g-8',
    title: 'Material notes',
    caption: 'Campioni, pelli e dettagli scelti in relazione alla destinazione d uso del paio.',
    width: 1200,
    height: 1550,
    image: unsplash('photo-1607522370275-f14206abe5d3', 1200, 1550),
    thumb: unsplash('photo-1607522370275-f14206abe5d3', 900, 1163),
    category: 'materiali'
  },
  {
    id: 'g-9',
    title: 'Final review',
    caption: 'L ultimo controllo su equilibrio, cucitura, finitura e resa visiva prima della consegna.',
    width: 1200,
    height: 1600,
    image: unsplash('photo-1543163521-1bf539c55dd2', 1200, 1600),
    thumb: unsplash('photo-1543163521-1bf539c55dd2', 900, 1200),
    category: 'controllo'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Cercavo una scarpa da cerimonia che restasse elegante ma personale. Il risultato e stato misurato, raffinato e perfettamente mio.',
    name: 'Camilla R.',
    role: 'Bride',
    city: 'Firenze',
    pair: 'Cerimonia Ivory',
    rating: 5
  },
  {
    quote:
      'La parte piu preziosa e stata la conversazione iniziale. Si percepisce che ogni scelta viene fatta con calma, cultura materiale e gusto.',
    name: 'Luca M.',
    role: 'Private client',
    city: 'Milano',
    pair: 'Palazzo Derby',
    rating: 5
  },
  {
    quote:
      'Volevo una sneaker bespoke che non sembrasse sportiva. Il progetto ha trovato un equilibrio raro tra modernita e discrezione.',
    name: 'Giulia T.',
    role: 'Fashion consultant',
    city: 'Roma',
    pair: 'Lido Bespoke Sneaker',
    rating: 5
  },
  {
    quote:
      'Ottima lettura del brief, tempistiche chiare e una qualita finale che si nota soprattutto da vicino.',
    name: 'Riccardo P.',
    role: 'Art buyer',
    city: 'Bologna',
    pair: 'Atelier Loafer',
    rating: 5
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Tempi e processo',
    question: 'Quanto tempo richiede la realizzazione di un paio su misura?',
    answer:
      'La maggior parte dei progetti richiede tra 10 e 24 giorni lavorativi, in base al modello scelto, ai materiali e al livello di personalizzazione.'
  },
  {
    category: 'Tempi e processo',
    question: 'E possibile richiedere una lavorazione legata a una data precisa?',
    answer:
      'Si. In presenza di matrimoni, cerimonie o appuntamenti importanti valutiamo la fattibilita in base al calendario dell atelier e alla complessita del progetto.'
  },
  {
    category: 'Taglie e materiali',
    question: 'Come viene definita la taglia corretta?',
    answer:
      'Partiamo dal fit del modello base e, se necessario, ti accompagniamo nella scelta con indicazioni su calzata e confronto con le scarpe che indossi abitualmente.'
  },
  {
    category: 'Taglie e materiali',
    question: 'Quali materiali utilizzate?',
    answer:
      'Lavoriamo con pelli, suede, fodere e finiture selezionate in base al progetto, privilegiando materiali dalla resa tattile e visiva elegante nel tempo.'
  },
  {
    category: 'Personalizzazione',
    question: 'Quali aspetti possono essere personalizzati?',
    answer:
      'Toni, materiali, dettagli, iniziali, micro monogrammi, finiture e alcuni elementi di costruzione vengono calibrati in funzione della richiesta.'
  },
  {
    category: 'Budget e revisioni',
    question: 'Da quale cifra partono i progetti?',
    answer:
      'Le richieste partono orientativamente da 460 EUR per le sneakers bespoke e salgono in base a modello, materia, complessita e tempistiche.'
  },
  {
    category: 'Budget e revisioni',
    question: 'Quante revisioni del concept sono incluse?',
    answer:
      'Il processo include una revisione della proposta iniziale. Eventuali modifiche sostanziali dopo approvazione possono richiedere un aggiornamento economico.'
  },
  {
    category: 'Spedizione e resi',
    question: 'Spedite in Italia e all estero?',
    answer:
      'Si, organizziamo spedizioni in Italia e in Europa con tracking, packaging curato e tempi confermati nel preventivo.'
  },
  {
    category: 'Spedizione e resi',
    question: 'Sono previsti resi per prodotti personalizzati?',
    answer:
      'Le creazioni realizzate su richiesta non sono soggette a reso per ripensamento. Restiamo comunque disponibili per assistenza post consegna.'
  },
  {
    category: 'Cura e mantenimento',
    question: 'Come si mantengono nel tempo le scarpe custom?',
    answer:
      'Suggeriamo pulizia delicata, protezione dei materiali e conservazione attenta. Ogni paio viene accompagnato da indicazioni coerenti con la materia scelta.'
  }
];

export const FAQ_GROUPS: FaqGroup[] = Array.from(
  FAQ_ITEMS.reduce((groups, item) => {
    const items = groups.get(item.category) ?? [];
    items.push(item);
    groups.set(item.category, items);
    return groups;
  }, new Map<string, FaqItem[]>())
).map(([category, items]) => ({ category, items }));

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    title: 'Un atelier nato per dare forma a richieste intime e misurate',
    description:
      'Il brand parte dall idea che la personalizzazione piu riuscita non sia quella che grida, ma quella che accompagna con naturalezza la persona che la sceglie.',
    note: 'Eleganza, misura e attenzione al gesto.',
    image: unsplash('photo-1600185365926-3a2ce3cdb9eb', 1000, 1200)
  },
  {
    title: 'Artigianalita italiana e cultura del materiale',
    description:
      'Pellami, suede, cuciture e finiture vengono selezionati con un approccio che unisce gusto editoriale e sensibilita manifatturiera.',
    note: 'Ogni materia deve invecchiare bene e raccontarsi con calma.',
    image: unsplash('photo-1491553895911-0055eca6402d', 1000, 1200)
  },
  {
    title: 'Il bespoke come linguaggio personale e senza eccessi',
    description:
      'Ogni progetto e pensato per restare rilevante nel tempo, con dettagli su misura che aggiungono identita senza rompere l equilibrio complessivo.',
    note: 'Una presenza distinta, mai rumorosa.',
    image: unsplash('photo-1543508282-6319a3e2621f', 1000, 1200)
  }
];

export const BRAND_STATS: HeroStat[] = [
  { value: 'Su appuntamento', label: 'consulenza privata e percorso dedicato' },
  { value: 'Made to order', label: 'produzione avviata solo dopo approvazione' },
  { value: 'Italia e UE', label: 'spedizioni curate con packaging dedicato' }
];

export const CONTACT_DETAILS: ContactDetail[] = [
  { label: 'Email', value: 'atelier@eliatelier.it', href: 'mailto:atelier@eliatelier.it' },
  { label: 'Telefono', value: '+39 02 5555 015', href: 'tel:+39025555015' },
  { label: 'Instagram', value: '@eliatelier', href: 'https://instagram.com' },
  { label: 'Atelier', value: 'Milano, su appuntamento' }
];

export const SHOE_TYPE_OPTIONS: SelectOption[] = [
  { value: 'bespoke-sneakers', label: 'Bespoke sneakers' },
  { value: 'elegant-shoes', label: 'Scarpe eleganti' },
  { value: 'wedding-shoes', label: 'Wedding shoes' },
  { value: 'ceremonial-footwear', label: 'Calzature da cerimonia' },
  { value: 'luxury-casual', label: 'Luxury casual' }
];

export const SIZE_OPTIONS: SelectOption[] = Array.from({ length: 13 }, (_, index) => {
  const size = `${36 + index}`;
  return { value: size, label: `EU ${size}` };
});

export const BUDGET_OPTIONS: SelectOption[] = [
  { value: '460-650', label: '460 - 650 EUR' },
  { value: '650-900', label: '650 - 900 EUR' },
  { value: '900-1300', label: '900 - 1.300 EUR' },
  { value: '1300+', label: 'Oltre 1.300 EUR' }
];

export const URGENCY_OPTIONS: SelectOption[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'event-date', label: 'Legato a una data precisa' },
  { value: 'priority', label: 'Da valutare in priorita' }
];
