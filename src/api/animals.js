// Data sources for the gallery.
//
// Dogs and cats: TheDogAPI / TheCatAPI give full breed info, but they now
// require a free API key (sign up at thedogapi.com / thecatapi.com) set in
// .env.local as VITE_DOG_API_KEY / VITE_CAT_API_KEY.
// Without a key (or if they fail) we fall back to key-less APIs:
//   dogs -> dog.ceo, cats -> catfact.ninja (breeds) + cataas.com (photos).
// Birds: iNaturalist, key-less.

const DOG_API_KEY = import.meta.env.VITE_DOG_API_KEY;
const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY;

const getJson = async (url, { signal, headers } = {}) => {
  const response = await fetch(url, { signal, headers });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
};

const withUnit = (value, unit) => (value ? `${value} ${unit}` : undefined);

const capitalize = (text = "") =>
  text.replace(/\b\w/g, (letter) => letter.toUpperCase());

const breedImage = (breed, cdn) =>
  breed.image?.url ||
  (breed.reference_image_id
    ? `https://${cdn}/images/${breed.reference_image_id}.jpg`
    : undefined);

// ---------- Dogs ----------

const dogsFromTheDogApi = async (signal) => {
  const breeds = await getJson("https://api.thedogapi.com/v1/breeds", {
    signal,
    headers: { "x-api-key": DOG_API_KEY },
  });
  return breeds.map((breed) => ({
    id: `dog-${breed.id}`,
    name: breed.name,
    image: breedImage(breed, "cdn2.thedogapi.com"),
    breed_group: breed.breed_group,
    origin: breed.origin,
    lifespan: breed.life_span,
    temperament: breed.temperament,
    size: withUnit(breed.height?.metric, "cm tall"),
    weight_kg: breed.weight?.metric,
    description: breed.bred_for ? `Bred for: ${breed.bred_for}` : undefined,
  }));
};

// dog.ceo image URLs look like .../breeds/hound-afghan/n02088094_1003.jpg
const dogsFromDogCeo = async (signal) => {
  const { message: urls } = await getJson(
    "https://dog.ceo/api/breeds/image/random/50",
    { signal }
  );
  const seen = new Set();
  return urls
    .map((url) => {
      const slug = url.split("/breeds/")[1]?.split("/")[0] || "";
      const [breed, subBreed] = slug.split("-");
      return {
        id: `dog-${slug}`,
        name: capitalize([subBreed, breed].filter(Boolean).join(" ")),
        image: url,
        breed_group: subBreed ? capitalize(breed) : undefined,
      };
    })
    .filter((dog) => dog.name && !seen.has(dog.id) && seen.add(dog.id));
};

// ---------- Cats ----------

const catsFromTheCatApi = async (signal) => {
  const breeds = await getJson("https://api.thecatapi.com/v1/breeds", {
    signal,
    headers: { "x-api-key": CAT_API_KEY },
  });
  return breeds.map((breed) => ({
    id: `cat-${breed.id}`,
    name: breed.name,
    image: breedImage(breed, "cdn2.thecatapi.com"),
    origin: breed.origin,
    lifespan: withUnit(breed.life_span, "years"),
    temperament: breed.temperament,
    weight_kg: breed.weight?.metric,
    description: breed.description,
  }));
};

const catsFromCatFact = async (signal) => {
  const { data } = await getJson("https://catfact.ninja/breeds?limit=40", {
    signal,
  });
  return data.map((breed, index) => ({
    id: `cat-${index}`,
    name: breed.breed,
    // cataas returns a random cat photo; the query param keeps each card different
    image: `https://cataas.com/cat?width=400&height=300&n=${index}`,
    origin: breed.origin || breed.country,
    colors: breed.pattern,
    description: [breed.coat && `Coat: ${breed.coat}`]
      .filter(Boolean)
      .join(". "),
  }));
};

// ---------- Birds ----------

const birdsFromINaturalist = async (signal) => {
  const { results = [] } = await getJson(
    "https://api.inaturalist.org/v1/taxa?taxon_id=3&rank=species&order_by=observations_count&per_page=60",
    { signal }
  );
  return results.map((taxon) => ({
    id: `bird-${taxon.id}`,
    name: capitalize(taxon.preferred_common_name || taxon.name),
    image: taxon.default_photo?.medium_url,
    species: taxon.name,
    description: taxon.wikipedia_url
      ? `More info: ${taxon.wikipedia_url}`
      : undefined,
  }));
};

// ---------- Public ----------

// Try each loader in order; use the first one that works.
const firstWorking = async (loaders, signal) => {
  let lastError;
  for (const load of loaders) {
    try {
      return await load(signal);
    } catch (error) {
      if (error.name === "AbortError") throw error;
      lastError = error;
    }
  }
  throw lastError;
};

const SOURCES = {
  dogs: [DOG_API_KEY && dogsFromTheDogApi, dogsFromDogCeo],
  cats: [CAT_API_KEY && catsFromTheCatApi, catsFromCatFact],
  birds: [birdsFromINaturalist],
};

export const fetchAnimals = async (type, signal) => {
  const loaders = (SOURCES[type] || []).filter(Boolean);
  if (loaders.length === 0) throw new Error(`Unknown animal type: ${type}`);

  const animals = await firstWorking(loaders, signal);
  return animals.filter((animal) => animal.name && animal.image);
};
