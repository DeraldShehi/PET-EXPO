import { useState, useEffect } from "react";
import Card from "./Card";

const GetCats = (wordsEntered) => {
  const [data, setData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://freetestapi.com/api/v1/cats");
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
    <div className="cats-list">
      {dataToShow.map((cat) => {
        return (
          <Card
            key={cat.id}
            image={cat.image}
            name={cat.name}
            breed_group={cat.breed_group}
            origin={cat.origin}
            size={cat.size}
            lifespan={cat.lifespan}
            temperament={cat.temperament}
            colors={cat.colors}
            description={cat.description}
          />
        );
      })}
    </div>
  );
};
export default GetCats;
