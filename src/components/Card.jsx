import { useState } from "react";
import PopUp from "./PopUp";

const Card = ({
  id,
  name,
  image,
  breed_group,
  size,
  lifespan,
  origin,
  temperament,
  colors,
  description,
  species,
  family,
  habitat,
  place_of_found,
  wingspan_cm,
  weight_kg,
}) => {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <>
      <div
        className="card"
        key={id}
        onClick={() => {
          setShowPopUp(true);
        }}
      >
        <img src={image} alt="images" />
        <h4>Name:{name}</h4>
        {origin && <p>Origin:{origin}</p>}
        {place_of_found && <p>Place_of_found:{place_of_found}</p>}
      </div>
      {showPopUp && (
        <PopUp
          name={name}
          species={species}
          family={family}
          habitat={habitat}
          place_of_found={place_of_found}
          wingspan_cm={wingspan_cm}
          weight_kg={weight_kg}
          breed_group={breed_group}
          origin={origin}
          size={size}
          lifespan={lifespan}
          temperament={temperament}
          colors={colors}
          description={description}
          closePopUP={() => setShowPopUp(false)}
        />
      )}
    </>
  );
};
export default Card;
