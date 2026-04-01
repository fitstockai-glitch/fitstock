/**
 * ジュエリー系デモ `/product/:productId` 用メタデータ（タグ・表示名）。
 * ProductGrid / ProductCarousel の id・名前・価格と整合させる。
 */

export type JewelryProductMeta = {
  id: number;
  slug?: string;
  name: string;
  category: string;
  price: string;
  tags: string[];
};

const byIdList: JewelryProductMeta[] = [
  { id: 1, name: "Pantheon", category: "Earrings", price: "€2,850", tags: ["Architectural", "18k gold plated", "Earrings"] },
  { id: 2, name: "Eclipse", category: "Bracelets", price: "€3,200", tags: ["Layered", "Sterling silver", "Bracelets"] },
  { id: 3, name: "Halo", category: "Earrings", price: "€1,950", tags: ["Minimal", "Gold plated", "Earrings"] },
  { id: 4, name: "Oblique", category: "Earrings", price: "€1,650", tags: ["Geometric", "Contemporary", "Earrings"] },
  { id: 5, name: "Lintel", category: "Earrings", price: "€2,250", tags: ["Linear", "Day-to-night", "Earrings"] },
  { id: 6, name: "Shadowline", category: "Bracelets", price: "€3,950", tags: ["Statement", "Polished", "Bracelets"] },
  { id: 7, name: "Meridian", category: "Earrings", price: "€2,450", tags: ["Meridian", "Sculptural", "Earrings"] },
  { id: 8, name: "Vertex", category: "Bracelets", price: "€2,800", tags: ["Vertex", "Chain", "Bracelets"] },
  { id: 9, name: "Apex", category: "Earrings", price: "€1,550", tags: ["Petite", "Everyday", "Earrings"] },
  { id: 10, name: "Zenith", category: "Earrings", price: "€1,850", tags: ["Zenith", "Elevated", "Earrings"] },
  { id: 11, name: "Prism", category: "Earrings", price: "€2,050", tags: ["Faceted", "Light play", "Earrings"] },
  { id: 12, name: "Radiant", category: "Bracelets", price: "€3,650", tags: ["Radiant", "Evening", "Bracelets"] },
  { id: 13, name: "Stellar", category: "Earrings", price: "€2,150", tags: ["Stellar", "Classic", "Earrings"] },
  { id: 14, name: "Cosmos", category: "Bracelets", price: "€2,950", tags: ["Cosmos", "Wide cuff", "Bracelets"] },
  { id: 15, name: "Aurora", category: "Earrings", price: "€1,750", tags: ["Aurora", "Soft curve", "Earrings"] },
  { id: 16, name: "Nebula", category: "Earrings", price: "€1,850", tags: ["Nebula", "Organic", "Earrings"] },
  { id: 17, name: "Orbit", category: "Earrings", price: "€2,350", tags: ["Orbit", "Circular", "Earrings"] },
  { id: 18, name: "Galaxy", category: "Bracelets", price: "€3,450", tags: ["Galaxy", "Linked", "Bracelets"] },
  { id: 19, name: "Lunar", category: "Earrings", price: "€2,050", tags: ["Lunar", "Matte", "Earrings"] },
  { id: 20, name: "Solar", category: "Bracelets", price: "€3,150", tags: ["Solar", "Warm tone", "Bracelets"] },
  { id: 21, name: "Astral", category: "Earrings", price: "€1,650", tags: ["Astral", "Lightweight", "Earrings"] },
  { id: 22, name: "Cosmic", category: "Earrings", price: "€1,950", tags: ["Cosmic", "Stackable", "Earrings"] },
  { id: 23, name: "Celestial", category: "Earrings", price: "€2,250", tags: ["Celestial", "Timeless", "Earrings"] },
  { id: 24, name: "Ethereal", category: "Bracelets", price: "€3,750", tags: ["Ethereal", "Delicate", "Bracelets"] },
];

const bySlug: Record<string, JewelryProductMeta> = {
  "arcus-bracelet": {
    id: 1001,
    slug: "arcus-bracelet",
    name: "Arcus Bracelet",
    category: "Bracelets",
    price: "€2,450",
    tags: ["New in", "Arcus", "Chain", "Bracelets"],
  },
  "span-bracelet": {
    id: 1002,
    slug: "span-bracelet",
    name: "Span Bracelet",
    category: "Bracelets",
    price: "€2,100",
    tags: ["New in", "Span", "Layering", "Bracelets"],
  },
};

const idMap = new Map(byIdList.map((p) => [p.id, p]));

/**
 * ルート param（数値 id または slug）から商品メタを返す。未一致時は null。
 */
export function resolveJewelryProduct(param: string | undefined): JewelryProductMeta | null {
  if (param == null || param === "") return null;
  const slugHit = bySlug[param];
  if (slugHit) return slugHit;
  const n = Number(param);
  if (Number.isFinite(n) && idMap.has(n)) return idMap.get(n)!;
  return null;
}

/** ProductCarousel の exclude 用。スラッグ商品は数値 carousel と id が被らないため undefined。 */
export function carouselExcludeNumericId(param: string | undefined): number | undefined {
  const m = resolveJewelryProduct(param);
  if (!m || m.id >= 1000) return undefined;
  return m.id;
}
