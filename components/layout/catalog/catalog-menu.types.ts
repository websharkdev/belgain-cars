interface CatalogProduct {
  id: string;
  name: string;
  href: string;
  image?: string;
}

interface CatalogSubcategory {
  id: string;
  name: string;
  href: string;
  products: CatalogProduct[];
}

interface CatalogCategory {
  id: string;
  name: string;
  href: string;
  icon?: string;
  subcategories: CatalogSubcategory[];
}

export type { CatalogCategory, CatalogProduct, CatalogSubcategory };
