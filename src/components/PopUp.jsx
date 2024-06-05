const PopUp = ({
  name,
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
  closePopUP,
}) => {
  return (
    <div className="popUp">
      <div className="popUp-container">
        <p>Name :{name}</p>
        {species && <p>Species :{species}</p>}
        {family && <p>Family :{family}</p>}
        {habitat && <p>Habitat :{habitat}</p>}
        {place_of_found && <p>Place_of_found :{place_of_found}</p>}
        {wingspan_cm && <p>Wingspan_cm :{wingspan_cm}</p>}
        {weight_kg && <p>Weight_kg :{weight_kg}</p>}
        {breed_group && <p>Breed_group :{breed_group}</p>}
        {size && <p>Size :{size}</p>}
        {lifespan && <p>Lifespan :{lifespan}</p>}
        {origin && <p>Origin :{origin}</p>}
        {temperament && <p>Temperament :{temperament}</p>}
        {colors && <p>Colors :{colors}</p>}
        {description && <p>Description :{description}</p>}
        <button className="close-popUp-btn" onClick={closePopUP}>
          Close
        </button>
      </div>
    </div>
  );
};
export default PopUp;
