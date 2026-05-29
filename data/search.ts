export type SearchMatchField =
  | 'VIN'
  | 'Product №'
  | 'EAN'
  | 'OE'
  | 'Tyre size'
  | 'Brand'
  | 'Title';

export type BatteryArtVariant = 'bosch' | 'exide' | 'topla';
export type ProductAvailability = 'order' | 'stock';
export type SearchSuggestionTag = { label: string; tone: 'new' | 'discount' };

export interface SearchSuggestionProduct {
  id: number;
  brand: string;
  sku: string;
  ean: string;
  oe: string[];
  vin: string[];
  tyreSize?: string;
  title: string;
  price: string;
  oldPrice?: string;
  href: string;
  tags?: SearchSuggestionTag[];
  availability: {
    kind: ProductAvailability;
    label: string;
  };
  art: BatteryArtVariant;
}

export const recentSearches = [
  'WVWZZZ1JZXW000001',
  '359526',
  '215/65R15',
] as const;

export const popularSearchCategories = [
  'Electrical & Lighting',
  'Car Care & Chemicals',
  'Body & Components',
] as const;

export const mockSearchProducts: SearchSuggestionProduct[] = [
  {
    id: 1,
    brand: 'BOSCH',
    sku: '359526',
    ean: '4047023479564',
    oe: ['0 092 TE0 770', '0092TE0770', 'TE077'],
    vin: ['WVWZZZ1JZXW000001', 'WAUZZZ8K9DA000001'],
    title:
      'Battery 190Ah-12v BOSCH EFB (TE077) (513x222x223), reverse polarity (3), EN1050',
    price: '$92.01',
    oldPrice: '$110.20',
    href: '/catalog/electrical/system/battery-190ah-12v-bosch-efb',
    tags: [
      { label: 'New', tone: 'new' },
      { label: '-20%', tone: 'discount' },
    ],
    availability: {
      kind: 'order',
      label: 'On order (1-5 days)',
    },
    art: 'bosch',
  },
  {
    id: 2,
    brand: 'Exide',
    sku: '1065831',
    ean: '3661024034532',
    oe: ['EB740', 'EXCELL 74AH', '096 AGM'],
    vin: ['VF1RFB00163600001', 'WBA3A5C50DF000001'],
    title: 'Battery 74Ah-12v Exide EXCELL (278x175x190), R, EN680',
    price: '$56.02',
    href: '/catalog/electrical/system/battery-74ah-12v-exide-excell',
    availability: {
      kind: 'order',
      label: 'On order (1-5 days)',
    },
    art: 'exide',
  },
  {
    id: 3,
    brand: 'Topla',
    sku: '118662',
    ean: '3838947836621',
    oe: ['6 CT-62-R', 'TOP 118662', '56219'],
    vin: ['TMBJC7NE0F0000001', 'YS3FD49Y261000001'],
    title: 'Battery Topla 6 CT-62-R Top 118662',
    price: '$56.02',
    href: '/catalog/electrical/system/battery-topla-6-ct-62-r-top',
    tags: [{ label: 'New', tone: 'new' }],
    availability: {
      kind: 'stock',
      label: '4 in stock',
    },
    art: 'topla',
  },
  {
    id: 4,
    brand: 'Goodyear',
    sku: '850020',
    ean: '5452000812345',
    oe: ['ULTRAGRIP CARGO', 'UGC2156515'],
    vin: ['ZFA25000002A00001', 'WF0XXXTTGXDA00001'],
    tyreSize: '215/65R15C',
    title: 'UltraGrip Cargo Tire 215/65R15 104T winter tyre',
    price: '$138.64',
    href: '/catalog/tyres/goodyear-ultragrip-cargo-215-65-r15',
    availability: {
      kind: 'stock',
      label: '8 in stock',
    },
    art: 'bosch',
  },
  {
    id: 5,
    brand: 'AMIO',
    sku: '734703',
    ean: '5903293014997',
    oe: ['D2R 4300K', '35W', 'PK32D-3'],
    vin: ['JHMCM56557C000001', 'KMHDU41BP8U000001'],
    title: 'D2R 4300K BASIC DKK 12V 35W Lamp',
    price: '$0.91',
    oldPrice: '$1.20',
    href: '/catalog/electrical-lighting/amio-d2r-4300k-basic-lamp',
    tags: [
      { label: 'New', tone: 'new' },
      { label: '-20%', tone: 'discount' },
    ],
    availability: {
      kind: 'stock',
      label: '12 in stock',
    },
    art: 'exide',
  },
];

export function getSearchProductMatches(
  product: SearchSuggestionProduct,
  query: string,
) {
  const normalizedQuery = normalizeSearchValue(query);
  if (!normalizedQuery) return [];

  const fields: Array<{ label: SearchMatchField; value: string }> = [
    { label: 'Product №', value: product.sku },
    { label: 'EAN', value: product.ean },
    ...product.oe.map((value) => ({ label: 'OE' as const, value })),
    ...product.vin.map((value) => ({ label: 'VIN' as const, value })),
    ...(product.tyreSize
      ? [{ label: 'Tyre size' as const, value: product.tyreSize }]
      : []),
    { label: 'Brand', value: product.brand },
    { label: 'Title', value: product.title },
  ];

  return fields.filter(({ value }) =>
    normalizeSearchValue(value).includes(normalizedQuery),
  );
}

export function searchMockProducts(query: string) {
  const normalizedQuery = normalizeSearchValue(query);

  if (normalizedQuery.length < 2) {
    return mockSearchProducts
      .slice(0, 3)
      .map((product) => ({ product, matches: [] }));
  }

  return mockSearchProducts
    .map((product) => ({
      product,
      matches: getSearchProductMatches(product, query),
    }))
    .filter(({ matches }) => matches.length > 0)
    .slice(0, 6);
}

function normalizeSearchValue(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}
