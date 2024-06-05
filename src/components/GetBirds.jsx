import { useState, useEffect } from "react";
import Card from "./Card";

const GetBirds = (wordsEntered) => {
  const [data, setData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://freetestapi.com/api/v1/birds");
        const jsonData = await response.json();
        setData(jsonData);
        setDataToShow(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let trimmedWordsEntered = "";

    if (typeof wordsEntered === "string") {
      trimmedWordsEntered = wordsEntered.trim();
    } else if (typeof wordsEntered === "object" && wordsEntered !== null) {
      trimmedWordsEntered = Object.values(wordsEntered).join(" ").trim();
    }

    if (trimmedWordsEntered.length > 0) {
      setDataToShow(
        data.filter((animal) =>
          animal.name
            .toLowerCase()
            .startsWith(trimmedWordsEntered.toLowerCase())
        )
      );
      console.log(wordsEntered);
    } else {
      setDataToShow(data);
    }
  }, [wordsEntered]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="birds-list">
      {dataToShow.map((bird) => {
        return (
          <Card
            key={bird.id}
            image={bird.image}
            name={bird.name}
            species={bird.species}
            family={bird.family}
            habitat={bird.habitat}
            place_of_found={bird.place_of_found}
            wingspan_cm={bird.wingspan_cm}
            weight_kg={bird.weight_kg}
            breed_group={bird.breed_group}
            origin={bird.origin}
            size={bird.size}
            lifespan={bird.lifespan}
            temperament={bird.temperament}
            colors={bird.colors}
            description={bird.description}
          />
        );
      })}
    </div>
  );
};
export default GetBirds;
