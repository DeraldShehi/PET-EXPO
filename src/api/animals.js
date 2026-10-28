// Public, key-less APIs used for each gallery category.
// freetestapi.com (the original source) has been shut down.

const DOG_API = "https://api.thedogapi.com/v1/breeds";
const CAT_API = "https://api.thecatapi.com/v1/breeds";
// iNaturalist: the most observed bird species (taxon 3 = Aves).
const BIRD_API =
  "https://api.inaturalist.org/v1/taxa?taxon_id=3&rank=species&order_by=observations_count&per_page=60";

const withUnit = (value, unit) => (value ? `${value} ${unit}` : undefined);

const breedImage = (breed, cdn) =>
  breed.image?.url ||
  (breed.reference_image_id
    ? `https://${cdn}/images/${breed.reference_image_id}.jpg`
    : undefined);

const toDog = (breed) => ({
  id: `dog-${breed.id}`,
  name: breed.name,
  image: breedImage(breed, "cdn2.thedogapi.com"),
  breed_group: breed.breed_group,
  origin: breed.origin,
  lifespan: breed.life_span,
  temperament: breed.temperament,
  size: withUnit(breed.height?.metric, "cm"),
  weight_kg: breed.weight?.metric,
  description: breed.bred_for ? `Bred for: ${breed.bred_for}` : undefined,
});

const toCat = (breed) => ({
  id: `cat-${breed.id}`,
  name: breed.name,
  image: breedImage(breed, "cdn2.thecatapi.com"),
  origin: breed.origin,
  lifespan: withUnit(breed.life_span, "years"),
  temperament: breed.temperament,
  weight_kg: breed.weight?.metric,
  description: breed.description,
});

const capitalize = (text = "") =>
  text.replace(/\b\w/g, (letter) => letter.toUpperCase());

const toBird = (taxon) => ({
  id: `bird-${taxon.id}`,
  name: capitalize(taxon.preferred_common_name || taxon.name),
  image: taxon.default_photo?.medium_url,
  species: taxon.name,
  description: taxon.wikipedia_url
    ? `More info: ${taxon.wikipedia_url}`
    : undefined,
});

export const SOURCES = {
  dogs: { url: DOG_API, map: (json) => json.map(toDog) },
  cats: { url: CAT_API, map: (json) => json.map(toCat) },
  birds: { url: BIRD_API, map: (json) => (json.results || []).map(toBird) },
};

export const fetchAnimals = async (type, signal) => {
  const source = SOURCES[type];
  if (!source) throw new Error(`Unknown animal type: ${type}`);

  const response = await fetch(source.url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const animals = source.map(await response.json());
  return animals.filter((animal) => animal.name && animal.image);
};
