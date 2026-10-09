export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface PriceChange {
  dir: 'up' | 'down' | 'flat';
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const BASE_URL_1 = process.env.NEXT_PUBLIC_API_BASE_URL_1
const BASE_URL_2 = process.env.NEXT_PUBLIC_API_BASE_URL_2

/**
 * Resilient fetcher that attempts BASE_URL_1 first,
 * and automatically fails over to BASE_URL_2 if BASE_URL_1 is down,
 * returns non-200, or sends invalid JSON.
 */
export async function fetchWithFallback<T>(path: string, init?: RequestInit): Promise<T> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url1 = `${BASE_URL_1}${cleanPath}`;
  const url2 = `${BASE_URL_2}${cleanPath}`;

  // Attempt 1: Primary API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(url1, {
      ...init,
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      return data as T;
    }
  } catch {
    // Silently proceed to fallback API
  }

  // Attempt 2: Fallback / Alternative API
  try {
    const res = await fetch(url2, {
      ...init,
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }
    const data = await res.json();
    return data as T;
  } catch {
    throw new Error(`Failed to fetch from both primary and alternative APIs: ${cleanPath}`);
  }
}

/**
 * Fetch all products or filter by category
 */
export async function getProducts(category?: string): Promise<Product[]> {
  const path = category ? `/products?category=${encodeURIComponent(category)}` : '/products';
  return fetchWithFallback<Product[]>(path);
}

/**
 * Fetch single product by id or slug
 */
export async function getProductByIdOrSlug(idOrSlug: string | number): Promise<Product | null> {
  try {
    return await fetchWithFallback<Product>(`/products/${idOrSlug}`);
  } catch {
    // If not found by slug directly, search in all products
    try {
      const all = await getProducts();
      const found = all.find(
        (p) => p.slug === idOrSlug || p.id.toString() === idOrSlug.toString()
      );
      return found || null;
    } catch {
      return null;
    }
  }
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  return fetchWithFallback<Category[]>('/categories');
}

/**
 * Fetch single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    return await fetchWithFallback<Category>(`/categories/${slug}`);
  } catch {
    try {
      const all = await getCategories();
      const found = all.find((c) => c.slug === slug || c.id === slug);
      return found || null;
    } catch {
      return null;
    }
  }
}
