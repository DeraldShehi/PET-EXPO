import { useState, useEffect } from "react";
import Card from "./Card";

const GetDogs = ({ wordsEntered }) => {
  const [data, setData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://freetestapi.com/api/v1/dogs");
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
    if (wordsEntered) {
      setDataToShow(
        data.filter((animal) =>
          animal.name.toLowerCase().startsWith(wordsEntered.toLowerCase())
        )
      );
      console.log(wordsEntered);
    } else {
      return setDataToShow(data);
    }
  }, [wordsEntered]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="dogs-list">
      {dataToShow.map((dog) => {
        return (
          <Card
            key={dog.id}
            image={dog.image}
            name={dog.name}
            breed_group={dog.breed_group}
            origin={dog.origin}
            size={dog.size}
            lifespan={dog.lifespan}
            temperament={dog.temperament}
            colors={dog.colors}
            description={dog.description}
          />
        );
      })}
    </div>
  );
};
export default GetDogs;
