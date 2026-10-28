const formatValue = (value) =>
  Array.isArray(value) ? value.join(", ") : value;

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
  const details = [
    ["Species", species],
    ["Family", family],
    ["Habitat", habitat],
    ["Place found", place_of_found],
    ["Wingspan (cm)", wingspan_cm],
    ["Weight (kg)", weight_kg],
    ["Breed group", breed_group],
    ["Size", size],
    ["Lifespan", lifespan],
    ["Origin", origin],
    ["Temperament", temperament],
    ["Colors", colors],
    ["Description", description],
  ];

  return (
    <div className="popUp">
      <div className="popUp-container">
        <p>Name: {name}</p>
        {details.map(
          ([label, value]) =>
            value != null &&
            value !== "" && (
              <p key={label}>
                {label}: {formatValue(value)}
              </p>
            )
        )}
        <button className="close-popUp-btn" onClick={closePopUP}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;
