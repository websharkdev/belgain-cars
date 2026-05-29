import { routes } from '@/lib/routes';
import type { ComponentType } from 'react';
import { Mail } from 'lucide-react';
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from '@/components/icons/social-icons';

export interface NavLinkData {
  label: string;
  href?: string;
}

export interface ContactLinkData extends NavLinkData {
  kind: 'phone' | 'email' | 'text';
  value: string;
}

export interface FooterColumnData {
  title: string;
  links: NavLinkData[];
}

export interface SocialLinkData {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

const toCatalogHref = (label: string) =>
  `/catalog/${label.toLowerCase().replaceAll('&', 'and').replaceAll(/\s+/g, '-')}`;

const catalogLabels = [
  'Maintenance & Service Parts',
  'Brake System',
  'Engine & Exhaust System',
  'Suspension & Steering',
  'Transmission',
  'Cooling & Heating',
  'Electrical & Lighting',
  'Body & Components',
  'Car Care & Chemicals',
];

export const topBarLinks: NavLinkData[] = [
  { label: 'Delivery & Payment', href: '/delivery-payment' },
  { label: 'Contacts', href: '/contacts' },
  { label: 'About', href: '/about' },
];

export const topBarPhone: ContactLinkData = {
  kind: 'phone',
  label: '+32 492 66 39 14',
  value: '+32492663914',
  href: 'tel:+32492663914',
};

export const topBarLocales = ['EN'];

export const newsletterCta = {
  icon: Mail,
  label: 'Subscribe',
  title: 'Stay updated on deals & discounts',
  subtitle: 'Sign up for our newsletter',
};

export const footerColumns: FooterColumnData[] = [
  {
    title: 'Catalog',
    links: catalogLabels.map((label) => ({
      label,
      href: toCatalogHref(label),
    })),
  },
  {
    title: 'For Clients',
    links: [
      { label: 'Delivery & Payment', href: '/delivery-payment' },
      { label: 'Warranty and Returns', href: '/warranty-returns' },
      { label: 'Order History', href: routes.orderHistory },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Conditions', href: '/terms' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contacts', href: '/contacts' },
      { label: 'About', href: '/about' },
    ],
  },
];

export const footerContacts: ContactLinkData[] = [
  {
    kind: 'phone',
    label: 'Phone:',
    value: '+32 492 66 39 84',
    href: 'tel:+32492663984',
  },
  {
    kind: 'email',
    label: 'Email:',
    value: 'autoparts.bcs@gmail.com',
    href: 'mailto:autoparts.bcs@gmail.com',
  },
  {
    kind: 'text',
    label: 'Address:',
    value: 'BTW BE 1025.454.504',
  },
];

export const footerSocialLinks: SocialLinkData[] = [
  { label: 'TikTok', href: '#', icon: TikTokIcon },
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'Facebook', href: '#', icon: FacebookIcon },
];
