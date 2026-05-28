import type { CategoryCardData } from '@/components/category/category-card.types';
import type { ProductCardData } from '@/components/product/product-card.types';
import type { WhyBcsHeroCardData } from '@/components/why-bcs/why-bcs-hero-card.types';
import type { WhyBcsStatCardData } from '@/components/why-bcs/why-bcs-stat-card.types';

export interface HeroSlideData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaLabel: string;
}

export interface HomepageCategoryTabData {
  value: string;
  label: string;
  badge?: string;
  separatorBefore?: boolean;
}

export interface ManufacturerData {
  id: number;
  name: string;
  label: string;
  color?: string;
}

export interface PromoCardData {
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  image: string;
}

export const heroSlides: HeroSlideData[] = [
  {
    id: 1,
    title: 'Everything you need for vehicle service',
    subtitle: 'From maintenance to repair - all in one place',
    image: '/images/slide-1.webp',
    ctaLabel: 'Shop Now',
  },
  {
    id: 2,
    title: 'Premium Brake Rotors & Pads',
    subtitle: 'Ensure your safety with top-rated braking systems',
    image: '/images/slide-1.webp',
    ctaLabel: 'Shop Now',
  },
  {
    id: 3,
    title: 'High-Performance Engine Oils',
    subtitle: 'Maximize engine lifetime and fuel efficiency',
    image: '/images/slide-1.webp',
    ctaLabel: 'Shop Now',
  },
  {
    id: 4,
    title: 'Reliable Batteries for Every Season',
    subtitle: 'Start confidently with tested electrical parts',
    image: '/images/slide-1.webp',
    ctaLabel: 'Shop Now',
  },
];

export const newArrivalProducts: ProductCardData[] = [
  {
    id: 1,
    brand: 'AMIO',
    sku: '734703',
    title: 'D2R 4300K BASIC DKK 12V 35W Lamp',
    specs: [
      { label: 'API classification:', value: 'SL' },
      { label: 'ACEA classification:', value: 'A3/B4' },
    ],
    price: '$0.91',
    oldPrice: '$1.20',
    image: '/images/cards/item-1.webp',
    tags: [{ label: 'New' }, { label: '-20%', discount: true }],
  },
  {
    id: 2,
    brand: 'AMIO',
    sku: '780021',
    title: 'H7 AMIO Halogen Bulb and Fuse Set 8 pcs (01499)',
    specs: [
      { label: 'API classification:', value: 'SL' },
      { label: 'ACEA classification:', value: 'A3/B4' },
    ],
    price: '$3.87',
    image: '/images/cards/item-1.webp',
    tags: [{ label: 'New' }],
  },
  {
    id: 3,
    brand: 'Goodyear',
    sku: '850020',
    title: 'UltraGrip Cargo Tire 215/65R15 104T',
    specs: [
      { label: 'Season:', value: 'Winter' },
      { label: 'Tyre size:', value: '215/65R15C' },
    ],
    price: '$138.64',
    image: '/images/cards/item-1.webp',
    tags: [{ label: 'New' }],
  },
  {
    id: 4,
    brand: 'Bosch',
    sku: '339025',
    title: 'S4 005 6CT 60Ah Car Battery A+ (0092S40050)',
    specs: [
      { label: 'Positive terminal:', value: 'Right' },
      { label: 'Starting current, A:', value: '540' },
    ],
    price: '$92.01',
    oldPrice: '$110.00',
    image: '/images/cards/item-1.webp',
    tags: [{ label: 'New' }, { label: '-20%', discount: true }],
  },
  {
    id: 5,
    brand: 'Mercedes-Benz',
    sku: '1065831',
    title: 'Genuine Engine Oil MB 229.5 5W-40 4L (A0009898202...)',
    specs: [
      { label: 'Viscosity:', value: '5W-40' },
      { label: 'Engine:', value: 'Gasoline / Diesel' },
    ],
    price: '$58.02',
    image: '/images/cards/item-1.webp',
    tags: [{ label: 'New' }],
  },
];

export const newArrivalCategoryTabs: HomepageCategoryTabData[] = [
  { value: 'arrivals', label: 'Arrivals', badge: 'Top' },
  { value: 'fluids', label: 'Technical Fluids' },
  { value: 'wheels', label: 'Everything for Wheels', separatorBefore: true },
  { value: 'oil', label: 'Everything for Oil Changes', separatorBefore: true },
  {
    value: 'washes',
    label: 'Everything for Car Washes',
    separatorBefore: true,
  },
  { value: 'exterior', label: 'Exterior Care', separatorBefore: true },
  { value: 'interior', label: 'Interior Care', separatorBefore: true },
  { value: 'electronics', label: 'Electronics', separatorBefore: true },
  { value: 'brakes', label: 'Brakes & Suspension', separatorBefore: true },
  { value: 'engine', label: 'Engine Parts', separatorBefore: true },
  { value: 'filters', label: 'Filters', separatorBefore: true },
  { value: 'lighting', label: 'Lighting', separatorBefore: true },
  { value: 'batteries', label: 'Batteries', separatorBefore: true },
  { value: 'tyres', label: 'Tyres', separatorBefore: true },
  { value: 'tools', label: 'Tools & Equipment', separatorBefore: true },
  { value: 'accessories', label: 'Accessories', separatorBefore: true },
  { value: 'oem', label: 'OEM Parts', separatorBefore: true },
  { value: 'aftermarket', label: 'Aftermarket', separatorBefore: true },
  { value: 'truck', label: 'Truck & Commercial', separatorBefore: true },
  { value: 'seasonal', label: 'Seasonal Offers', separatorBefore: true },
];

export const popularCategories: CategoryCardData[] = [
  { id: 1, title: 'Brake Pads', href: '/catalog/brake-pads' },
  { id: 2, title: 'Filters', href: '/catalog/filters' },
  { id: 3, title: 'Tires', href: '/catalog/tires' },
  { id: 4, title: 'Motor Oil', href: '/catalog/motor-oil' },
  { id: 5, title: 'Batteries', href: '/catalog/batteries' },
  { id: 6, title: 'Brake Discs', href: '/catalog/brake-discs' },
  { id: 7, title: 'Shock Absorbers', href: '/catalog/shock-absorbers' },
  { id: 8, title: 'Bearings', href: '/catalog/bearings' },
];

export const popularManufacturers: ManufacturerData[] = [
  { id: 1, name: 'Brexol', label: 'BREXOL', color: '#29669D' },
  { id: 2, name: 'TRW', label: 'TRW', color: '#FF0000' },
  { id: 3, name: 'Motive', label: 'MOTIVE', color: '#29669D' },
  { id: 4, name: 'Bosch', label: 'BOSCH', color: '#ED0007' },
  { id: 5, name: 'Mann Filter', label: 'MANN' },
  { id: 6, name: 'Delphi', label: 'DELPHI', color: '#231F20' },
  { id: 7, name: 'Magneti Marelli', label: 'MARELLI', color: '#0D3270' },
  { id: 8, name: 'Maxgear', label: 'MAXGEAR', color: '#29669D' },
  { id: 9, name: 'Kamoka', label: 'KAMOKA', color: '#224D7F' },
  { id: 10, name: 'Valeo', label: 'VALEO', color: '#4E6B7C' },
  { id: 11, name: 'Meyle', label: 'MEYLE', color: '#224D7F' },
  { id: 12, name: 'FAG', label: 'FAG', color: '#E41839' },
];

export const oilPromo: PromoCardData = {
  badge: 'Up to 20% off',
  title: "It's time to buy motor oil",
  subtitle: 'Affordable and reliable',
  ctaLabel: 'Shop Now',
  image: '/images/shell-oil.webp',
};

export const whyBcsHeroCard: WhyBcsHeroCardData = {
  metric: '> 6',
  subtitle: 'Million customers',
  description: 'Have already chosen our service',
};

export const whyBcsStats: WhyBcsStatCardData[] = [
  {
    id: 1,
    metric: '50k+',
    title: 'Items in stock',
    description: 'European and Asian brands. Continuous stock replenishment.',
  },
  {
    id: 2,
    metric: '24h',
    title: 'Delivery across Belgium',
    description:
      'Fast logistics from LKQ, Intercars, and other trusted suppliers.',
  },
  {
    id: 3,
    metric: 'B2B',
    title: 'For auto repair shops',
    description:
      'Partnership terms for garages and service centers in Belgium.',
  },
  {
    id: 4,
    metric: 'OEM',
    title: 'Original and alternatives',
    description:
      'Selection by part number. Compatibility guarantee with your vehicle.',
  },
];
