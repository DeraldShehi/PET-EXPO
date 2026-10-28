import { useState, useEffect, useMemo } from "react";
import Card from "./Card";

const API_URL = "https://freetestapi.com/api/v1";

// type: "dogs" | "cats" | "birds"
const GetAnimals = ({ type, wordsEntered = "" }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/${type}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        setData(await response.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [type]);

  const dataToShow = useMemo(() => {
    const search = wordsEntered.trim().toLowerCase();
    if (!search) return data;
    return data.filter((animal) =>
      animal.name?.toLowerCase().startsWith(search)
    );
  }, [data, wordsEntered]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (dataToShow.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <div className={`${type}-list`}>
      {dataToShow.map((animal) => (
        <Card
          key={animal.id}
          image={animal.image}
          name={animal.name}
          species={animal.species}
          family={animal.family}
          habitat={animal.habitat}
          place_of_found={animal.place_of_found}
          wingspan_cm={animal.wingspan_cm}
          weight_kg={animal.weight_kg}
          breed_group={animal.breed_group}
          origin={animal.origin}
          size={animal.size}
          lifespan={animal.lifespan}
          temperament={animal.temperament}
          colors={animal.colors}
          description={animal.description}
        />
      ))}
    </div>
  );
};

export default GetAnimals;
