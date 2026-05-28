const DEFAULT_WHY_BCS_HERO_IMAGE = '/images/car-parts-repair-garage.webp';

interface WhyBcsHeroCardData {
  metric: string;
  subtitle: string;
  description: string;
  buttonLabel?: string;
  image?: string;
}

export type { WhyBcsHeroCardData };
export { DEFAULT_WHY_BCS_HERO_IMAGE };
