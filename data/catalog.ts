import type {
  CatalogCategory,
  CatalogProduct,
} from '@/components/layout/catalog/catalog-menu.types';

const createProducts = (slug: string, names: string[]): CatalogProduct[] =>
  names.map((name) => ({
    id: `${slug}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    href: `/catalog/${slug}/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  }));

const electricalProducts = createProducts('electrical/system', [
  'Battery',
  'Starter drive (Bendix)',
  'Alternator',
  'Alternator pulley',
  'Voltage regulator',
  'Starter repair kit',
  'Starter motor',
  'Starter solenoid',
]);

const defaultSubcategories = (slug: string, productNames: string[]) => [
  {
    id: `${slug}-all`,
    name: 'All parts',
    href: `/catalog/${slug}`,
    products: createProducts(slug, productNames),
  },
  {
    id: `${slug}-popular`,
    name: 'Popular items',
    href: `/catalog/${slug}/popular`,
    products: createProducts(`${slug}/popular`, productNames.slice(0, 4)),
  },
];

const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: 'maintenance',
    name: 'Maintenance & Service Parts',
    href: '/catalog/maintenance',
    subcategories: defaultSubcategories('maintenance', [
      'Oil filter',
      'Air filter',
      'Cabin filter',
      'Spark plug',
      'Wiper blade',
      'Timing belt kit',
    ]),
  },
  {
    id: 'brake',
    name: 'Brake System',
    href: '/catalog/brake',
    subcategories: defaultSubcategories('brake', [
      'Brake pads',
      'Brake discs',
      'Brake caliper',
      'Brake fluid',
      'ABS sensor',
      'Brake hose',
    ]),
  },
  {
    id: 'engine',
    name: 'Engine & Exhaust System',
    href: '/catalog/engine',
    subcategories: defaultSubcategories('engine', [
      'Engine oil',
      'Water pump',
      'Turbocharger',
      'Exhaust gasket',
      'Lambda sensor',
      'EGR valve',
    ]),
  },
  {
    id: 'transmission',
    name: 'Transmission',
    href: '/catalog/transmission',
    subcategories: defaultSubcategories('transmission', [
      'Clutch kit',
      'Flywheel',
      'Gearbox oil',
      'Drive shaft',
      'CV joint',
      'Transmission mount',
    ]),
  },
  {
    id: 'cooling',
    name: 'Cooling & Heating',
    href: '/catalog/cooling',
    subcategories: defaultSubcategories('cooling', [
      'Radiator',
      'Thermostat',
      'Coolant',
      'Heater blower',
      'Expansion tank',
      'Fan clutch',
    ]),
  },
  {
    id: 'suspension',
    name: 'Suspension & Steering',
    href: '/catalog/suspension',
    subcategories: defaultSubcategories('suspension', [
      'Shock absorber',
      'Control arm',
      'Ball joint',
      'Tie rod end',
      'Wheel bearing',
      'Stabilizer link',
    ]),
  },
  {
    id: 'electrical',
    name: 'Electrical & Lighting',
    href: '/catalog/electrical',
    subcategories: [
      {
        id: 'ignition',
        name: 'Ignition System',
        href: '/catalog/electrical/ignition',
        products: createProducts('electrical/ignition', [
          'Ignition coil',
          'Spark plug wire',
          'Glow plug',
          'Distributor cap',
        ]),
      },
      {
        id: 'sensors',
        name: 'Sensors',
        href: '/catalog/electrical/sensors',
        products: createProducts('electrical/sensors', [
          'ABS sensor',
          'Crankshaft sensor',
          'Camshaft sensor',
          'Mass air flow sensor',
        ]),
      },
      {
        id: 'lighting',
        name: 'Lighting',
        href: '/catalog/electrical/lighting',
        products: createProducts('electrical/lighting', [
          'Headlight bulb',
          'Tail light',
          'Fog light',
          'Indicator lamp',
        ]),
      },
      {
        id: 'electrical-system',
        name: 'Electrical System',
        href: '/catalog/electrical/system',
        products: electricalProducts,
      },
    ],
  },
  {
    id: 'body',
    name: 'Body & Components',
    href: '/catalog/body',
    subcategories: defaultSubcategories('body', [
      'Mirror glass',
      'Door handle',
      'Bonnet strut',
      'Bumper bracket',
      'Fender liner',
      'Window regulator',
    ]),
  },
  {
    id: 'car-care',
    name: 'Car Care & Chemicals',
    href: '/catalog/car-care',
    subcategories: defaultSubcategories('car-care', [
      'Car shampoo',
      'Wheel cleaner',
      'Interior cleaner',
      'Polish wax',
      'Microfiber cloth',
      'Screen wash',
    ]),
  },
];

export { CATALOG_CATEGORIES };
