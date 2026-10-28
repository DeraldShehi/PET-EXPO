import { useEffect } from "react";

const formatValue = (value) =>
  Array.isArray(value) ? value.join(", ") : value;

const PopUp = ({
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

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") closePopUP();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [closePopUP]);

  return (
    <div
      className="popUp"
      onClick={(event) => {
        if (event.target === event.currentTarget) closePopUP();
      }}
    >
      <div className="popUp-container" role="dialog" aria-modal="true" aria-label={name}>
        {image && <img src={image} alt={name} />}
        <h3>{name}</h3>
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
