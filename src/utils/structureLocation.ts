// src/utils/structureLocation.ts

export interface StructuredLocation {
  country: string | null;
  region: string | null;
  city: string | null;
  street: string | null;
}

export async function structureLocation(lat: number, lng: number): Promise<StructuredLocation | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

  try {
    const res = await fetch(url, {
      headers: {
        "Accept-Language": "en", // ensure English results
      }
    });

    if (!res.ok) {
      console.warn("Nominatim error:", res.status);
      return null;
    }

    const data = await res.json();

    const address = data.address || {};

    return {
      country: address.country || null,
      region: address.state || address.region || address.county || null,
      city: address.city || address.town || address.village || address.hamlet || null,
      street: address.road || address.pedestrian || address.footway || null,
    };
  } catch (error) {
    console.error("Failed to structure location:", error);
    return null;
  }
}